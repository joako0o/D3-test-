/* chromium.mjs — arrancar un Chromium con WebGL por software, en un solo sitio.
 *
 * POR QUÉ EXISTE
 *   `capture.mjs`, `hero-check.mjs` y `perf/measure.mjs` necesitaban los
 *   mismos ~50 pasos: descomprimir las librerías del sistema que trae
 *   @sparticuz/chromium, montar LD_LIBRARY_PATH y lanzar con los flags de
 *   SwiftShader. Estaban copiados en los dos primeros; el tercero los habría
 *   copiado otra vez. Vivir aquí es lo que evita que un flag se arregle en un
 *   script y no en los otros.
 *
 * QUÉ RESUELVE (y por qué así)
 *   No hay GPU ni root en el entorno. @sparticuz/chromium trae el binario y
 *   sus .so DENTRO del paquete npm: se descomprimen a .cache/chromium-libs/
 *   la primera vez y se pasan al proceso hijo por LD_LIBRARY_PATH. El
 *   renderizado 3D lo hace SwiftShader (software), así que los tiempos de
 *   dibujo NO son comparables con una GPU real — lo que sí lo es es el coste
 *   del hilo principal (JS, style, layout), que es lo que miden estas
 *   herramientas.
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const LIBS = path.join(ROOT, '.cache', 'chromium-libs');

/* Los tres scripts leen `--w=1440` igual; antes cada uno tenía su copia. */
export function parseArgs(argv = process.argv.slice(2)) {
  return Object.fromEntries(
    argv
      .filter((a) => a.startsWith('--'))
      .map((a) => {
        const [k, v = 'true'] = a.slice(2).split('=');
        return [k, v];
      })
  );
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ── Librerías del sistema (libnspr4, libnss3, SwiftShader…) ─────────────
   Vienen comprimidas en el paquete; se extraen una vez y se cachean.
   tar mínimo: cabeceras de 512 bytes, suficiente para estos archivos. */
export async function ensureChromiumLibs() {
  if (fs.existsSync(path.join(LIBS, 'lib', 'libnspr4.so'))) return;
  console.log('Extrayendo las librerías de Chromium (solo la primera vez)…');
  fs.mkdirSync(LIBS, { recursive: true });
  const pkgDir = path.dirname(fileURLToPath(import.meta.resolve('@sparticuz/chromium/package.json')));
  for (const name of ['al2023', 'swiftshader', 'fonts']) {
    const file = path.join(pkgDir, 'bin', `${name}.tar.br`);
    if (!fs.existsSync(file)) continue;
    const buf = zlib.brotliDecompressSync(fs.readFileSync(file));
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

export async function loadChromium() {
  try {
    return {
      chromium: (await import('@sparticuz/chromium')).default,
      puppeteer: (await import('puppeteer-core')).default,
    };
  } catch {
    console.error('Faltan dependencias. Instálalas con:\n  npm install');
    process.exit(2);
  }
}

/* Abre el navegador y devuelve { browser, page, errors }.
   `errors` recoge pageerror + console.error, que es el fallo que más importa:
   una pantalla en negro por un `const` mal escrito no se ve en una métrica. */
export async function launchChromium({ width = 1440, height = 900, extraArgs = [] } = {}) {
  const { chromium, puppeteer } = await loadChromium();
  await ensureChromiumLibs();

  const executablePath = await chromium.executablePath();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'shell',
    args: [
      ...chromium.args,
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-unsafe-swiftshader',
      '--force-device-scale-factor=1',
      '--hide-scrollbars',
      /* Sin estos, Chromium aparca la pestaña y `requestAnimationFrame` deja
         de correr: se mediría una página congelada. */
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      ...extraArgs,
    ],
    env: {
      ...process.env,
      LD_LIBRARY_PATH: [path.join(LIBS, 'lib'), LIBS, path.dirname(executablePath), process.env.LD_LIBRARY_PATH]
        .filter(Boolean)
        .join(':'),
    },
  });

  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 200));
  });
  /* Sin esto el navegador restaura el scroll anterior y la primera medida es
     de una sección cualquiera en vez del hero. */
  await page.evaluateOnNewDocument(() => {
    history.scrollRestoration = 'manual';
  });
  await page.setViewport({ width, height, deviceScaleFactor: 1 });

  return { browser, page, errors };
}

/* Abre el sitio y espera a que converja: los GLB con Draco y los `lerp` de
   la escena tardan unos segundos en asentarse, y medir antes daría números de
   una página que todavía se está construyendo. */
export async function openSite(page, origin, { settleMs = 7000 } = {}) {
  try {
    await page.goto(`${origin}/index.html`, { waitUntil: 'networkidle0', timeout: 90000 });
  } catch {
    console.error(`No respondió ${origin}. ¿Está corriendo "npm start"?`);
    process.exit(2);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(settleMs);
}
