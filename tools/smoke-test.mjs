/* smoke-test.mjs — arranca el sitio entero fuera del navegador y avisa si algo revienta.
 *
 * QUÉ HACE
 *   1. Levanta un servidor estático sobre la raíz del repo en un puerto libre.
 *   2. Carga index.html en jsdom (DOM real, sin pintar), con los scripts vendor.
 *   3. Importa js/main.js y lo deja correr unos segundos.
 *   4. Devuelve código de salida 1 si hubo cualquier error no capturado.
 *
 * QUÉ NO HACE (y no puede)
 *   - No hay WebGL: no compila los shaders ni valida cómo se ve nada.
 *   - No hay Worker: los GLB comprimidos con Draco no llegan a decodificarse.
 *     Los dos "Error cargando GLB: Worker is not defined" son ESPERADOS.
 *   Sirve para lo que sirve: detectar errores de sintaxis, imports rotos,
 *   variables inexistentes, IDs del DOM que ya no existen y excepciones al
 *   arrancar. Es la red de seguridad mínima; no sustituye mirar la página.
 *
 * USO
 *   npm run check
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TMP = path.join(ROOT, '.smoke-tmp');
const SETTLE_MS = Number(process.env.SMOKE_SETTLE_MS || 6000);

let JSDOM;
try {
  ({ JSDOM } = await import('jsdom'));
} catch {
  console.error('Falta jsdom. Instálalo con:  npm install --save-dev jsdom');
  process.exit(2);
}

/* ── 1. Servidor estático ────────────────────────────────────────────── */
const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.glb': 'model/gltf-binary',
  '.woff2': 'font/woff2',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
};
const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/+/, '') || 'index.html';
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const ORIGIN = `http://127.0.0.1:${server.address().port}`;

/* ── 1b. Shim de 'three' para el resolvedor de Node ───────────────────
   js/loaders/*.js importan el especificador desnudo 'three'. En el navegador
   lo resuelve el <script type="importmap"> de index.html; Node no lo lee y
   busca un paquete. Se planta uno mínimo dentro de node_modules (que está
   en .gitignore) que reexporta el three.module.js local. */
const shim = path.join(ROOT, 'node_modules', 'three');
if (!fs.existsSync(path.join(shim, 'index.mjs'))) {
  fs.mkdirSync(shim, { recursive: true });
  fs.writeFileSync(
    path.join(shim, 'package.json'),
    JSON.stringify({ name: 'three', version: '0.0.0-local-shim', type: 'module', main: 'index.mjs' }, null, 2)
  );
  fs.writeFileSync(path.join(shim, 'index.mjs'), "export * from '../../js/three.module.js';\n");
}

/* ── 2. Copia de main.js con los specifiers del importmap resueltos ───
   El navegador resuelve 'three' con el <script type="importmap"> de
   index.html; Node no lo lee, así que aquí se reescriben a rutas relativas. */
fs.mkdirSync(TMP, { recursive: true });
const IMPORTMAP = { 'three/addons/': '../js/', three: '../js/three.module.js' };
let main = fs.readFileSync(path.join(ROOT, 'js/main.js'), 'utf8');
for (const [bare, target] of Object.entries(IMPORTMAP)) {
  main = main.replaceAll(`'${bare}`, `'${target}`).replaceAll(`"${bare}`, `"${target}`);
}
main = main.replaceAll("'./", "'../js/").replaceAll('"./', '"../js/');
/* El bucle de render nunca corre sin rAF real: se fuerza la mezcla de las
   órbitas a 1 para que su código sí se ejecute al menos una vez. */
main = main.replace(/updateOrbitals\(([^;]*?),\s*statueT\)/g, 'updateOrbitals($1, 1)');
const entry = path.join(TMP, 'main.mjs');
fs.writeFileSync(entry, main);

/* ── 3. DOM ──────────────────────────────────────────────────────────── */
const errors = [];
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const dom = new JSDOM(html, {
  url: `${ORIGIN}/index.html`,
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  beforeParse(window) {
    const grad = { addColorStop() {} };
    const ctx2d = new Proxy(
      {
        createRadialGradient: () => grad,
        createLinearGradient: () => grad,
        measureText: () => ({ width: 10 }),
        getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(Math.max(1, w * h * 4)), width: w, height: h }),
      },
      {
        get(t, k) {
          return k in t ? t[k] : typeof k === 'string' ? () => {} : undefined;
        },
        set() {
          return true;
        },
      }
    );
    window.HTMLCanvasElement.prototype.getContext = (type) => (type === '2d' ? ctx2d : null);
    window.scrollTo = () => {};
    class Observer {
      constructor(cb) {
        this.cb = cb;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    if (!window.IntersectionObserver) window.IntersectionObserver = Observer;
    if (!window.ResizeObserver) window.ResizeObserver = Observer;
    if (!window.ProgressEvent) window.ProgressEvent = window.Event;
    window.Element.prototype.scrollIntoView ||= function () {};
    window.URL.createObjectURL ||= () => 'blob:fake';
    window.URL.revokeObjectURL ||= () => {};
    if (window.SVGElement) {
      const p = window.SVGElement.prototype;
      p.getTotalLength ||= () => 100;
      p.getPointAtLength ||= () => ({ x: 0, y: 0 });
      p.getBBox ||= () => ({ x: 0, y: 0, width: 100, height: 100 });
      p.getScreenCTM ||= () => null;
    }
    if (typeof window.matchMedia !== 'function') {
      window.matchMedia = (q) => ({
        matches: false,
        media: q,
        onchange: null,
        addListener() {},
        removeListener() {},
        addEventListener() {},
        removeEventListener() {},
        dispatchEvent() {
          return false;
        },
      });
    }
    window.addEventListener('error', (e) => errors.push('window error: ' + (e.error?.stack || e.message)));
  },
});
const w = dom.window;
await new Promise((r) => setTimeout(r, 3500)); // que carguen los vendor

/* Los módulos se importan en el ámbito de Node, no en el de jsdom: hay que
   exponerle las globales del navegador. OJO: no copiar performance, setTimeout
   ni clearTimeout — se recursionan contra los de Node. */
const BRIDGE = [
  'ProgressEvent',
  'SVGElement',
  'window',
  'document',
  'navigator',
  'location',
  'HTMLElement',
  'Element',
  'Node',
  'Image',
  'CustomEvent',
  'Event',
  'getComputedStyle',
  'matchMedia',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'devicePixelRatio',
  'innerWidth',
  'innerHeight',
  'IntersectionObserver',
  'ResizeObserver',
  'MutationObserver',
  'gsap',
  'ScrollTrigger',
  'CustomEase',
  'SplitText',
  'd3',
  'Lenis',
  'history',
  'screen',
  'visualViewport',
  'XMLHttpRequest',
  'fetch',
  'URL',
  'Blob',
  'FileReader',
  'TextDecoder',
  'self',
  'top',
  'DOMParser',
  'addEventListener',
  'removeEventListener',
  'localStorage',
];
const BIND = new Set([
  'addEventListener',
  'removeEventListener',
  'getComputedStyle',
  'matchMedia',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'fetch',
  'scrollTo',
]);
for (const k of BRIDGE) {
  if (w[k] === undefined) continue;
  const value = typeof w[k] === 'function' && BIND.has(k) ? w[k].bind(w) : w[k];
  try {
    Object.defineProperty(globalThis, k, { value, configurable: true, writable: true });
  } catch {}
}
const vendors = ['gsap', 'ScrollTrigger', 'd3', 'Lenis', 'SplitText', 'CustomEase'];
const missing = vendors.filter((k) => !w[k]);
console.log('vendors:', vendors.map((k) => `${k}:${w[k] ? 'ok' : 'FALTA'}`).join(' '));
if (missing.length) errors.push('vendor no cargado: ' + missing.join(', '));

globalThis.URL.createObjectURL ||= () => 'blob:fake';
globalThis.URL.revokeObjectURL ||= () => {};
const NodeRequest = globalThis.Request;
class BaseRequest extends NodeRequest {
  constructor(input, init) {
    super(typeof input === 'string' ? new URL(input, `${ORIGIN}/`) : input, init);
  }
}
Object.defineProperty(globalThis, 'Request', { value: BaseRequest, configurable: true, writable: true });
const nodeFetch = globalThis.fetch;
globalThis.fetch = (u, o) => nodeFetch(typeof u === 'string' ? new URL(u, `${ORIGIN}/`) : u, o);

process.on('uncaughtException', (e) => errors.push('uncaught: ' + (e.stack || e)));
process.on('unhandledRejection', (e) => errors.push('rejection: ' + (e?.stack || e)));

/* ── 4. Arrancar y esperar ───────────────────────────────────────────── */
try {
  await import(pathToFileURL(entry).href);
} catch (e) {
  errors.push('import de js/main.js: ' + (e.stack || e));
}
await new Promise((r) => setTimeout(r, SETTLE_MS));

/* ── 5. Comprobaciones sobre el DOM ya construido ────────────────────── */
const checks = [];
const $ = (sel) => w.document.querySelector(sel);
checks.push(['skip link', !!$('.skip-link')]);
checks.push(['canvas con texto alternativo', !!$('#canvas[aria-label]')]);
/* jsdom, con los scripts activos, deja el contenido de <noscript> como texto
   plano: hay que mirar el texto, no consultarlo con querySelector. */
const noscript = [...w.document.querySelectorAll('noscript')].map((n) => n.textContent).join(' ');
checks.push(['fallback <noscript>', noscript.includes('noscript.css')]);
const navBtns = w.document.querySelectorAll('#roomVoiceNavList button').length;
checks.push([`La Sala: ${navBtns} voces navegables con teclado`, navBtns > 0]);
const orphanIds = [
  ...new Set(
    [...w.document.querySelectorAll('[aria-labelledby],[aria-describedby]')]
      .flatMap((el) =>
        ['aria-labelledby', 'aria-describedby'].flatMap((a) => (el.getAttribute(a) || '').split(/\s+/).filter(Boolean))
      )
      .filter((id) => !w.document.getElementById(id))
  ),
];
checks.push([`aria-labelledby/describedby sin destino: ${orphanIds.join(', ') || 'ninguno'}`, orphanIds.length === 0]);

for (const [label, ok] of checks) {
  console.log(`${ok ? '  ok  ' : ' FALLA'} ${label}`);
  if (!ok) errors.push('comprobación fallida: ' + label);
}

fs.rmSync(TMP, { recursive: true, force: true });
server.close();

console.log(`\n--- errores: ${errors.length}`);
errors.slice(0, 12).forEach((e) => console.log(String(e).slice(0, 1200), '\n'));
process.exit(errors.length ? 1 : 0);
