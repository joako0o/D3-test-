/* ambient-willchange.mjs — ¿la clase `is-fading` se queda pegada?
 *
 * POR QUÉ EXISTE
 *   #ambientGlow solo se promueve a capa de GPU MIENTRAS se está fundiendo
 *   (`.is-fading`). Si esa clase se quedara puesta, el arreglo sería peor que
 *   el problema: una capa del tamaño del viewport retenida toda la sesión, que
 *   es justo lo que css/19-stage-closing.css prohíbe por escrito.
 *
 *   El caso que de verdad rompe esto no es el feliz: es cuando una sección
 *   llega ANTES de que termine el fundido anterior. GSAP mata el tween en
 *   curso (overwrite: 'auto') y `onComplete` NO corre — de ahí que el código
 *   limpie también en `onInterrupt`. Esto lo comprueba.
 *
 * USO
 *   npm start
 *   node scripts/perf/ambient-willchange.mjs
 */

import { parseArgs, sleep, launchChromium } from '../lib/chromium.mjs';

const args = parseArgs();
const ORIGIN = args.origin || 'http://localhost:8000';

const { browser, page } = await launchChromium({ width: 1000, height: 700 });
await page.goto(`${ORIGIN}/index.html`, { waitUntil: 'networkidle0', timeout: 90000 });
await sleep(8000);

const out = await page.evaluate(async () => {
  const glow = document.getElementById('ambientGlow');
  if (!glow) return { error: 'no existe #ambientGlow' };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const willChange = () => getComputedStyle(glow).willChange;

  /* Se recorre el documento a saltos para disparar varias secciones seguidas;
     los saltos son deliberadamente MÁS RÁPIDOS que el fundido de 1,25 s, que
     es la condición en la que un tween interrumpe al anterior. */
  const max = document.documentElement.scrollHeight - innerHeight;
  const pasos = [0.05, 0.12, 0.2, 0.3, 0.45, 0.6, 0.75, 0.9, 0.55, 0.25, 0];
  let vistoActivo = false;
  for (const p of pasos) {
    window.scrollTo(0, max * p);
    await wait(220); // < 1,25 s: el siguiente tween interrumpe al anterior
    if (willChange() === 'opacity') vistoActivo = true;
  }

  /* Y ahora se deja reposar más que la duración del fundido: aquí ya NO puede
     quedar nada promovido. */
  await wait(2500);
  return {
    vistoActivo,
    willChangeFinal: willChange(),
    claseFinal: glow.className,
    opacidadFinal: getComputedStyle(glow).opacity,
  };
});

await browser.close();

if (out.error) {
  console.error(`  ✗ ${out.error}`);
  process.exit(1);
}

console.log('\n  PROMOCIÓN DEL HALO A CAPA DE GPU');
console.log('  ' + '─'.repeat(70));
console.log(`  se promovió durante los fundidos:  ${out.vistoActivo ? 'sí' : 'no'}`);
console.log(`  will-change en reposo:             ${out.willChangeFinal}`);
console.log(`  clases en reposo:                  "${out.claseFinal}"`);
console.log(`  opacidad en reposo:                ${out.opacidadFinal}`);

const limpio = out.willChangeFinal === 'auto' && !out.claseFinal.includes('is-fading');
console.log(
  limpio
    ? '\n  ✓ la capa se libera al terminar: no queda memoria de GPU retenida.\n'
    : '\n  ✗ `is-fading` se quedó pegada: la capa queda promovida para siempre.\n'
);
process.exit(limpio ? 0 : 1);
