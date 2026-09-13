/* ambient-shot.mjs — una foto del halo en el hero, para mirarlo con los ojos.
 *
 * La paridad numérica ya la comprueba ambient-parity.mjs. Esto es el control
 * cualitativo: que nadie tenga que fiarse solo de una tabla para saber que la
 * portada sigue teniendo su luz. Guarda .shots/ambient/hero.png.
 */

import fs from 'node:fs';
import path from 'node:path';
import { ROOT, parseArgs, sleep, launchChromium } from '../lib/chromium.mjs';

const args = parseArgs();
const ORIGIN = args.origin || 'http://localhost:8000';
const OUT = path.join(ROOT, '.shots', 'ambient');
fs.mkdirSync(OUT, { recursive: true });

const { browser, page } = await launchChromium({ width: 1200, height: 800 });
await page.goto(`${ORIGIN}/index.html`, { waitUntil: 'networkidle0', timeout: 90000 });
await page.evaluate(() => window.scrollTo(0, 0));
await sleep(9000);

const glow = await page.evaluate(() => {
  const el = document.getElementById('ambientGlow');
  if (!el) return null;
  const cs = getComputedStyle(el);
  return { opacity: cs.opacity, zIndex: cs.zIndex, position: cs.position, bg: cs.backgroundImage.slice(0, 70) };
});
console.log('  #ambientGlow →', glow);

await page.screenshot({ path: path.join(OUT, 'hero.png') });
console.log(`  guardado en ${path.relative(ROOT, path.join(OUT, 'hero.png'))}`);
await browser.close();
