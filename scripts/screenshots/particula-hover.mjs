/* partícula-hover.mjs — ¿el panel de cita se abre solo, o solo cuando se pide?
 *
 * POR QUÉ EXISTE
 *   En la nube, pasar el cursor por encima de una partícula abría el panel de
 *   cita a los 90 ms, y lo cerraba al alejarse. La nube ocupa toda la pantalla
 *   durante varias secciones, así que cualquier movimiento de cursor que la
 *   cruzara abría un panel sin que nadie lo pidiera. Este script mide eso: es
 *   la prueba de que el gesto es el que queremos, y quedó como arnés para que
 *   no vuelva a cambiar sin que alguien lo vea.
 *
 * CÓMO ENCUENTRA LAS PARTÍCULAS
 *   No puede preguntarle a la escena dónde están (viven en WebGL), pero la
 *   propia página delata el impacto: cuando el cursor está sobre una partícula,
 *   `document.body.style.cursor` pasa a 'pointer'. Así que barre una grilla
 *   DENTRO de la página (pointermove sintéticos, milisegundos) y se queda con
 *   los puntos donde aparece el cursor de puntero.
 *
 * QUÉ COMPRUEBA
 *   · pasear el cursor por la nube NO abre el panel (debe dar 0 aperturas)
 *   · el clic en una partícula SÍ lo abre, y queda FIJADO al alejar el cursor
 *
 * USO
 *   npm start                 # en otra terminal
 *   npm run particle:hover
 *   npm run particle:hover -- --seccion=stageRoom
 */

import { parseArgs, launchChromium, openSite, sleep } from '../lib/chromium.mjs';

const args = parseArgs();
const ORIGIN = args.origin || 'http://localhost:8000';
const SECCION = args.seccion || 'stageAxes';
const W = Number(args.w) || 1440;
const H = Number(args.h) || 900;

const { browser, page, errors } = await launchChromium({ width: W, height: H });
await openSite(page, ORIGIN, { settleMs: 8000 });

await page.evaluate((id) => {
  const el = document.getElementById(id);
  window.scrollTo(0, el.offsetTop + el.offsetHeight * 0.45);
}, SECCION);
await sleep(2600);

const panel = () =>
  page.evaluate(() => {
    const p = document.getElementById('quotePanel');
    return {
      abierto: !!(p && !p.hidden && getComputedStyle(p).opacity !== '0'),
      quien: (document.getElementById('qpWho')?.textContent || '').trim(),
      cursor: document.body.style.cursor,
    };
  });

/* Barrido de la nube dentro de la página. Desde afuera cada punto costaba un
   round-trip (~100 ms) y el barrido tardaba un minuto: para cuando terminaba,
   la nube ya se había movido. El paso es de 36 ms porque el propio manejador
   se auto-limita a una lectura cada 32 ms. */
const barrer = () =>
  page.evaluate(
    async ({ W, H }) => {
      const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
      const hits = [];
      for (let gy = 0.1; gy <= 0.9; gy += 0.045) {
        for (let gx = 0.1; gx <= 0.9; gx += 0.045) {
          const x = Math.round(W * gx);
          const y = Math.round(H * gy);
          window.dispatchEvent(
            new PointerEvent('pointermove', { clientX: x, clientY: y, pointerType: 'mouse', bubbles: true })
          );
          await esperar(36);
          if (document.body.style.cursor === 'pointer') hits.push([x, y]);
        }
      }
      return hits;
    },
    { W, H }
  );

console.log(`── ${SECCION} @ ${W}x${H}`);
const zonas = await barrer();
await page.mouse.move(4, 4);
await sleep(300);
console.log(`  zonas de impacto encontradas: ${zonas.length} puntos de la grilla`);

if (!zonas.length) {
  console.log('  (no hay partículas en pantalla en esta sección: nada que medir)');
  if (errors.length) console.log(`  errores de página: ${errors.slice(0, 2).join(' | ')}`);
  await browser.close();
  process.exit(0);
}

// ── 1. Pasear el cursor NO debe abrir el panel ───────────────────────────
let aperturas = 0;
let muestrasAbierto = 0;
const quienes = new Set();
let previo = await panel();

for (let i = 0; i < zonas.length; i++) {
  const [x, y] = zonas[i];
  await page.mouse.move(x, y);
  /* CONFIG.interaction.hoverDelayMs = 90: por debajo de eso nada se dispara.
     La primera versión de esta herramienta esperaba 60 ms y midió cero
     aperturas — un falso negativo perfecto: parecía que el hover no abría y
     era que no lo dejábamos. */
  await sleep(150);
  const s = await panel();
  if (s.abierto && !previo.abierto) aperturas++;
  if (s.abierto) {
    muestrasAbierto++;
    if (s.quien) quienes.add(s.quien);
  }
  previo = s;
  if (i % 3 === 2) {
    await page.mouse.move(4, 4);
    await sleep(200);
    previo = await panel();
  }
}

console.log(
  `  aperturas del panel SIN ningún clic: ${aperturas}${muestrasAbierto ? '' : ' (correcto: el cursor solo resalta)'}`
);
if (quienes.size)
  console.log(`  voces que llegaron a mostrarse: ${quienes.size} → ${[...quienes].slice(0, 3).join(', ')}`);

// ── 2. El clic SÍ debe abrir, y quedar fijado ────────────────────────────
// La zona se revalida antes de cada clic: la nube se mueve, y un punto
// encontrado hace un minuto puede estar vacío.
const viva = await page.evaluate(
  async ({ puntos }) => {
    const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
    for (const [x, y] of puntos) {
      window.dispatchEvent(
        new PointerEvent('pointermove', { clientX: x, clientY: y, pointerType: 'mouse', bubbles: true })
      );
      await esperar(40);
      if (document.body.style.cursor === 'pointer') return [x, y];
    }
    return null;
  },
  { puntos: zonas }
);

if (!viva) {
  console.log('  no quedó ninguna zona viva: no se pudo probar el clic');
} else {
  const [cx, cy] = viva;
  await page.mouse.click(cx, cy);
  await sleep(800);
  const trasClic = await panel();
  await page.mouse.move(4, 4);
  await sleep(900);
  const trasAlejar = await panel();
  console.log(
    `  clic en (${cx},${cy}) → panel abierto: ${trasClic.abierto}${trasClic.quien ? ` · ${trasClic.quien}` : ''}`
  );
  console.log(`  tras alejar el cursor SIGUE abierto (quedó fijado): ${trasAlejar.abierto}`);
}

if (errors.length) console.log(`  errores de página: ${errors.slice(0, 2).join(' | ')}`);
await browser.close();
