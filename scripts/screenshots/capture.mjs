/* capture.mjs — galería de capturas reales del sitio, con WebGL.
 *
 * POR QUÉ EXISTE
 *   `npm run check` (tools/smoke-test.mjs) arranca el sitio en jsdom: detecta
 *   que el código no revienta, pero NO ve nada — jsdom no tiene WebGL ni pinta
 *   píxeles. Esto es lo otro: un Chromium de verdad, renderizando la escena 3D
 *   por software (SwiftShader), que guarda un PNG de cada sección.
 *
 * CÓMO FUNCIONA SIN GPU NI ROOT
 *   Lo resuelve scripts/lib/chromium.mjs (compartido con hero-check.mjs y con
 *   la medición de rendimiento): descomprime las librerías que trae
 *   @sparticuz/chromium y lanza con SwiftShader.
 *
 * USO
 *   npm start                        # el servidor tiene que estar corriendo
 *   npm run shots                    # 1600x900, todas las secciones
 *   npm run shots -- --w=1165 --h=684
 *   npm run shots -- --only=hero,stageRoom
 *   npm run shots -- --scroll=0.42   # un punto exacto del documento (0-1)
 *
 * LÍMITES
 *   Son fotos fijas: validan encuadre, proporciones y que nada se solape.
 *   No validan la suavidad del easing ni el hover — para eso hay que mirar.
 *   SwiftShader es más lento y puede diferir en detalles finos de sombreado.
 */

import fs from 'node:fs';
import path from 'node:path';
import { ROOT, parseArgs, launchChromium, openSite } from '../lib/chromium.mjs';

const OUT = path.join(ROOT, '.shots');

const args = parseArgs();
const W = Number(args.w || 1600);
const H = Number(args.h || 900);
const ORIGIN = args.origin || 'http://localhost:8000';
const ONLY = args.only ? args.only.split(',').map((s) => s.trim()) : null;
const SETTLE = Number(args.settle || 2200);

fs.mkdirSync(OUT, { recursive: true });

const { browser, page, errors } = await launchChromium({ width: W, height: H });

console.log(`Abriendo ${ORIGIN} a ${W}x${H}…`);
await openSite(page, ORIGIN);

async function shot(name, y) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, SETTLE));
  const file = path.join(OUT, `${name}-${W}x${H}.png`);
  await page.screenshot({ path: file });
  console.log('  ✓', path.relative(ROOT, file));
}

if (args.scroll !== undefined) {
  const doc = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  await shot(`scroll-${args.scroll}`, doc * Number(args.scroll));
} else {
  const sections = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('.hero, main#mainContent section[id]').forEach((el) => {
      const r = el.getBoundingClientRect();
      out.push({ id: el.id || 'hero', top: Math.round(r.top + window.scrollY), h: Math.round(r.height) });
    });
    return out;
  });
  let i = 0;
  for (const s of sections) {
    if (ONLY && !ONLY.includes(s.id)) {
      i++;
      continue;
    }
    const y = s.id === 'hero' ? 0 : Math.max(0, s.top + s.h / 2 - H / 2);
    await shot(`${String(i).padStart(2, '0')}-${s.id}`, y);
    i++;
  }
}

if (errors.length) {
  console.log('\nERRORES DE PÁGINA:');
  [...new Set(errors)].slice(0, 8).forEach((e) => console.log('  ', e));
}
await browser.close();
console.log(`\nCapturas en ${path.relative(ROOT, OUT)}/  (no se versionan)`);
process.exit(errors.length ? 1 : 0);
