/* capture.mjs — galería de capturas reales del sitio, con WebGL.
 *
 * POR QUÉ EXISTE
 *   `npm run check` (tools/smoke-test.mjs) arranca el sitio en jsdom: detecta
 *   que el código no revienta, pero NO ve nada — jsdom no tiene WebGL ni pinta
 *   píxeles. Esto es lo otro: un Chromium de verdad, renderizando la escena 3D
 *   por software (SwiftShader), que guarda un PNG de cada sección.
 *
 * CÓMO FUNCIONA SIN GPU NI ROOT
 *   @sparticuz/chromium trae el binario de Chromium y sus librerías DENTRO del
 *   paquete npm (nada que descargar de Google, nada que instalar con apt).
 *   Este script las descomprime a .cache/chromium-libs/ la primera vez y se las
 *   pasa al proceso hijo por LD_LIBRARY_PATH.
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
import zlib from 'node:zlib';
import tar from 'node:stream/consumers';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT = path.join(ROOT, '.shots');
const LIBS = path.join(ROOT, '.cache', 'chromium-libs');

const args = Object.fromEntries(process.argv.slice(2)
  .filter((a) => a.startsWith('--'))
  .map((a) => { const [k, v = 'true'] = a.slice(2).split('='); return [k, v]; }));
const W = Number(args.w || 1600);
const H = Number(args.h || 900);
const ORIGIN = args.origin || 'http://localhost:8000';
const ONLY = args.only ? args.only.split(',').map((s) => s.trim()) : null;
const SETTLE = Number(args.settle || 2200);

let chromium, puppeteer;
try {
  chromium = (await import('@sparticuz/chromium')).default;
  puppeteer = (await import('puppeteer-core')).default;
} catch {
  console.error('Faltan dependencias. Instálalas con:\n  npm install --save-dev puppeteer-core @sparticuz/chromium');
  process.exit(2);
}

/* ── Librerías del sistema que Chromium necesita (libnspr4, libnss3…) ─────
   Vienen comprimidas en el paquete; se extraen una vez y se cachean. */
async function ensureLibs() {
  if (fs.existsSync(path.join(LIBS, 'lib', 'libnspr4.so'))) return;
  console.log('Extrayendo las librerías de Chromium (solo la primera vez)…');
  fs.mkdirSync(LIBS, { recursive: true });
  const pkgDir = path.dirname(fileURLToPath(import.meta.resolve('@sparticuz/chromium/package.json')));
  for (const name of ['al2023', 'swiftshader', 'fonts']) {
    const file = path.join(pkgDir, 'bin', `${name}.tar.br`);
    if (!fs.existsSync(file)) continue;
    const buf = zlib.brotliDecompressSync(fs.readFileSync(file));
    /* tar mínimo: cabeceras de 512 bytes, suficiente para estos archivos. */
    let off = 0;
    while (off + 512 <= buf.length) {
      const header = buf.subarray(off, off + 512);
      const name0 = header.subarray(0, 100).toString('utf8').replace(/\0.*$/, '');
      if (!name0) break;
      const size = parseInt(header.subarray(124, 136).toString('utf8').replace(/\0.*$/, '').trim() || '0', 8);
      const type = String.fromCharCode(header[156]);
      off += 512;
      if (type === '0' || type === '\0') {
        const dest = path.join(LIBS, name0);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, buf.subarray(off, off + size));
        fs.chmodSync(dest, 0o755);
      } else if (type === '5') {
        fs.mkdirSync(path.join(LIBS, name0), { recursive: true });
      }
      off += Math.ceil(size / 512) * 512;
    }
  }
}

await ensureLibs();
fs.mkdirSync(OUT, { recursive: true });

const executablePath = await chromium.executablePath();
const browser = await puppeteer.launch({
  executablePath,
  headless: 'shell',
  args: [...chromium.args,
    '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
    '--force-device-scale-factor=1', '--hide-scrollbars'],
  env: {
    ...process.env,
    LD_LIBRARY_PATH: [path.join(LIBS, 'lib'), LIBS, path.dirname(executablePath), process.env.LD_LIBRARY_PATH]
      .filter(Boolean).join(':'),
  },
});

const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 200)); });
/* Sin esto el navegador restaura el scroll anterior y la primera foto sale
   de una sección cualquiera en vez del hero. */
await page.evaluateOnNewDocument(() => { history.scrollRestoration = 'manual'; });

console.log(`Abriendo ${ORIGIN} a ${W}x${H}…`);
try {
  await page.goto(`${ORIGIN}/index.html`, { waitUntil: 'networkidle0', timeout: 90000 });
} catch {
  console.error(`No respondió ${ORIGIN}. ¿Está corriendo "npm start"?`);
  await browser.close();
  process.exit(2);
}
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 7000));   // GLB + convergencia de los lerps

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
    if (ONLY && !ONLY.includes(s.id)) { i++; continue; }
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
