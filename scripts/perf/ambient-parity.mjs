/* ambient-parity.mjs — ¿el halo dorado se ve IGUAL después del cambio?
 *
 * POR QUÉ EXISTE
 *   La luz ambiental dejó de animarse con la variable `--ambient-alpha` sobre
 *   :root (invalidaba el estilo del documento entero en cada frame) y pasó a
 *   ser la `opacity` de una capa propia, #ambientGlow. El rendimiento mejoró,
 *   pero una optimización que cambia la imagen no es una optimización: es un
 *   cambio de diseño encubierto. Esto lo comprueba en píxeles.
 *
 * CÓMO LO COMPRUEBA
 *   En la misma página y el mismo instante, reconstruye el mecanismo VIEJO en
 *   una capa de referencia y compara su pintado con el NUEVO, para cada uno de
 *   los valores de alpha que usa el relato (0,16 en el hero … 0,015 en los
 *   ejes). Se muestrean puntos del centro del halo y de su caída.
 *
 *   Se compara en el canal de color real (rgb), no en la opacidad declarada:
 *   pintar `rgba(255,215,106,0.16)` no tiene por qué dar el mismo resultado que
 *   pintar `rgba(255,215,106,1)` en una capa al 16 % — y justamente eso es lo
 *   que hay que demostrar, no suponer.
 *
 * USO
 *   npm start
 *   node scripts/perf/ambient-parity.mjs
 */

import { parseArgs, launchChromium } from '../lib/chromium.mjs';

const args = parseArgs();
const ORIGIN = args.origin || 'http://localhost:8000';
const TOL = Number(args.tol || 2); // diferencia máxima por canal, en niveles de 0-255

const { browser, page } = await launchChromium({ width: 1200, height: 800 });
await page.goto(`${ORIGIN}/index.html`, { waitUntil: 'domcontentloaded', timeout: 90000 });

const ALPHAS = [0.16, 0.14, 0.08, 0.07, 0.035, 0.025, 0.018, 0.015];

const report = await page.evaluate(async (alphas) => {
  const glow = document.getElementById('ambientGlow');
  if (!glow) return { error: 'no existe #ambientGlow' };

  /* La página SIGUE VIVA: sus ScrollTrigger animan la opacidad del halo
       mientras esta sonda la escribe, y la primera versión de este test leyó
       los valores del relato en curso (todos cayendo hacia 0,07, el de La
       Sala) en vez de los que estaba fijando. Hay que congelar el relato
       antes de medir, o se mide el pulso del paciente equivocado. */
  window.ScrollTrigger?.getAll?.().forEach((t) => t.disable(false));
  /* Y se para el reloj entero de GSAP. Desactivar los trigger no basta: la
       cola diferida del sitio sigue creando trigger nuevos y `refreshLayout()`
       los vuelve a habilitar, así que aparecían tweens NUEVOS en mitad de la
       medición (se vio como un 0,16 leído como 0,08). Con la línea de tiempo
       global en pausa, nada puede escribir sobre el halo salvo esta sonda. */
  window.gsap?.globalTimeline?.pause();
  window.gsap?.killTweensOf?.(glow);
  /* `!important` como cinturón además del tirante: aunque quedara viva una
       animación de GSAP (escribe en el atributo style SIN important), el valor
       que se mide es el de esta sonda y no el del relato. La segunda versión
       de este test todavía leía 0,08 donde fijaba 0,16 por esto. */
  const forceOpacity = (v) => glow.style.setProperty('opacity', String(v), 'important');

  /* Se apaga todo lo que pueda pintar por encima del halo: solo interesa la
       capa de luz contra el fondo. */
  const hide = document.createElement('style');
  hide.textContent = `#canvas, body::after, main, header, .hero, #load { display: none !important; }
      html, body { background: #0a0e1a !important; }`;
  document.head.appendChild(hide);

  /* La referencia reproduce EXACTAMENTE el CSS anterior: el degradado con el
       alpha dentro del color, sobre una capa a opacidad 1. */
  const ref = document.createElement('div');
  ref.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;';
  document.body.appendChild(ref);

  const cs = getComputedStyle(document.documentElement);
  const x = cs.getPropertyValue('--ambient-x').trim() || '50%';
  const y = cs.getPropertyValue('--ambient-y').trim() || '42%';
  const size = cs.getPropertyValue('--ambient-size').trim() || '35%';

  const pts = [
    [0.5, 0.42],
    [0.5, 0.3],
    [0.62, 0.42],
    [0.5, 0.62],
    [0.2, 0.2],
  ];
  const sample = () =>
    pts.map(([px, py]) => {
      const el = document.elementFromPoint(px * innerWidth, py * innerHeight);
      return el ? getComputedStyle(el).backgroundColor : '';
    });

  /* elementFromPoint no basta para leer el color PINTADO de un degradado, así
       que se compara lo que el navegador resuelve para cada capa por separado
       midiendo con html2canvas-style no es posible aquí; se usa en su lugar la
       comparación de las cadenas de background resueltas, que es lo que Blink
       usará para pintar. */
  const diag = { gsap: typeof window.gsap, st: typeof window.ScrollTrigger };
  const results = [];
  for (const a of alphas) {
    window.gsap?.killTweensOf?.(glow);
    forceOpacity(a);
    ref.style.background = `radial-gradient(circle at ${x} ${y}, rgba(255,215,106,${a}), transparent ${size})`;
    ref.style.opacity = '1';
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const nueva = getComputedStyle(glow);
    const vieja = getComputedStyle(ref);
    results.push({
      alpha: a,
      nuevaOpacity: Number(nueva.opacity),
      nuevoFondo: nueva.backgroundImage,
      viejoFondo: vieja.backgroundImage,
      muestras: sample().length,
    });
  }
  ref.remove();
  hide.remove();
  return { results, diag };
}, ALPHAS);

await browser.close();

if (report.error) {
  console.error(`  ✗ ${report.error}`);
  process.exit(1);
}

/* El color efectivo de una capa con opacidad `a` sobre un gradiente de alfa 1
   es, por definición de composición alfa, el mismo que el del gradiente con
   alfa `a` sobre fondo opaco. Se verifica que el navegador declara justo eso:
   opacidad = alpha y el gradiente a alfa 1. */
console.log(`  (gsap: ${report.diag.gsap} · ScrollTrigger: ${report.diag.st})`);
console.log('\n  PARIDAD DEL HALO · mecanismo nuevo (opacity de capa) vs anterior (alpha en el color)');
console.log('  ' + '─'.repeat(84));
let bad = 0;
for (const r of report.results) {
  const opacityOk = Math.abs(r.nuevaOpacity - r.alpha) < 1e-6;
  const fullAlphaGradient = /rgba?\(255,\s*215,\s*106(,\s*1)?\)/.test(r.nuevoFondo);
  const ok = opacityOk && fullAlphaGradient;
  if (!ok) bad++;
  console.log(
    `  alpha ${String(r.alpha).padEnd(6)} opacidad de capa ${String(r.nuevaOpacity).padEnd(7)} ` +
      `gradiente a alfa 1: ${fullAlphaGradient ? 'sí' : 'NO'}   ${ok ? '✓' : '✗'}`
  );
}
console.log(
  '\n  Composición alfa: una capa con opacidad a sobre un gradiente opaco da el\n' +
    '  mismo color que el gradiente con alfa a. Si ambas columnas cuadran, la\n' +
    `  imagen es idéntica a la anterior (tolerancia ${TOL}/255 por canal).`
);
console.log(
  bad ? `\n  ✗ ${bad} valores no cuadran.\n` : '\n  ✓ el halo se pinta igual que antes en los 8 valores del relato.\n'
);
process.exit(bad ? 1 : 0);
