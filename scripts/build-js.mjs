/* build-js.mjs — bundlea el JS propio + three.js con tree-shaking, y minifica.
 *
 * POR QUÉ EXISTE
 *   El JS de primera parte se servía sin minificar (lo arregló la versión
 *   anterior de este script) y three.js viajaba como MONOLÍTICO
 *   (`js/lib/three/three.module.min.js`, 654 KiB) más 4 addons servidos SIN
 *   minificar (GLTFLoader 105 KiB, BufferGeometryUtils 31, DRACOLoader 13,
 *   RoomEnvironment 3). El informe de Lighthouse lo marcaba en "Reducir
 *   JavaScript sin usar" (~76 KiB de three y ~70 de d3, comprimidos).
 *
 * QUÉ HACE
 *   Un solo bundle ES2018+: `js/app.js` contiene main.js, su grafo estático
 *   (core/, scene/), three.js TREE-SHAKEADO desde su fuente modular y los
 *   addons que se usan, todo minificado. Es la suma de lo que antes eran
 *   ~15 peticiones de módulos (three + 4 addons + ~10 módulos propios) en
 *   UNA: sobre HTTP/1.1 (seis conexiones por origen) esa cola era el grueso
 *   del arranque. Se elimina el <script type=importmap> de index.html: el
 *   bundle no tiene especificadores desnudos.
 *   Los import() dinámicos de las cinco secciones se INLINAN en el bundle
 *   (sin code-splitting): pierden la carga perezosa por red (~12 KiB
 *   comprimidos en total) pero conservan el DIFERIDO de hilo principal, que
 *   es lo que importa para el TBT — el orden y el "cuándo" de cada init()
 *   lo sigue mandando js/core/deferred-boot.js.
 *
 * QUÉ NO HACE
 *   · `js/vendor/` (GSAP, ScrollTrigger, SplitText, CustomEase, Lenis) sigue
 *     como <script defer>: son globales clásicos, no módulos, y no se
 *     importan desde los fuentes. Igual d3, que lo inyecta loadD3() a pedido.
 *   · `js/data/quotes.js` es un <script> clásico (window.QUOTES): no entra al
 *     bundle. Se minifica aparte en js/data/quotes.min.js.
 *   · three.js se RESUELVE desde node_modules (`three@0.160.0`, dependencia de
 *     desarrollo): el specifier exacto 'three' se re-apunta al fuente modular
 *     `three/src/Three.js` para que el tree-shaking funcione (el monolítico
 *     build/three.module.js no se puede podar). 'three/addons/*' lo resuelve
 *     el export map del paquete (examples/jsm/*), byte-idéntico a los addons
 *     vendidos en js/lib/three/addons/ (verificado).
 *
 * CACHÉ Y `?v=`
 *   `js/app.js` es un nombre estable con `?v=` (igual que css/bundle.css): el
 *   número se sube a mano en index.html. Al ser UN solo archivo no hay el
 *   problema de los chunks con hash (un app.js viejo en caché apuntando a
 *   chunks borrados): solo hay que subir el `?v=` del propio app.js. El
 *   bundle es un DERIVADO que se regenera; no se edita.
 *
 * USO
 *   npm run build:js                      # regenera js/app.js + quotes.min.js
 *   node scripts/build-js.mjs --check     # sale con 1 si quedaron viejos
 *
 *   `npm start` lo corre solo (prestart). Y `npm run check` avisa si quedó
 *   desactualizado respecto a los fuentes.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { build, transform } from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ENTRY = path.join(ROOT, 'js', 'main.js');
const OUT = path.join(ROOT, 'js', 'app.js');
const QUOTES_SRC = path.join(ROOT, 'js', 'data', 'quotes.js');
const QUOTES_OUT = path.join(ROOT, 'js', 'data', 'quotes.min.js');

const APP_HEADER =
  '/* app.js — GENERADO por scripts/build-js.mjs. No editar: se pisa al correr\n' +
  '   `npm run build:js` (que `npm start` ejecuta solo).\n' +
  '   Fuentes: js/*.js (ver js/README.md) + three@0.160.0 (tree-shaken).\n' +
  '   Edítalas y corre `npm run build:js`. */\n';

const QUOTES_HEADER =
  '/* quotes.min.js — GENERADO por scripts/build-js.mjs. No editar: se pisa al\n' +
  '   correr `npm run build:js`. Fuente: js/data/quotes.js. */\n';

/* El especifier EXACTO 'three' se re-apunta al fuente modular. 'three/addons/*'
   NO se toca: lo resuelve el export map de npm (examples/jsm/*), idéntico a lo
   vendido. Sin esto esbuild resolvería 'three' al build/three.module.js
   monolítico y no habría nada que podar. */
const threeModular = {
  name: 'three-modular',
  setup(b) {
    b.onResolve({ filter: /^three$/ }, (args) =>
      b.resolve('three/src/Three.js', { resolveDir: args.resolveDir, kind: args.kind })
    );
  },
};

async function bundleApp() {
  const result = await build({
    entryPoints: [ENTRY],
    bundle: true,
    write: false,
    format: 'esm',
    target: 'es2022',
    minify: true,
    treeShaking: true,
    plugins: [threeModular],
    logLevel: 'silent',
  });
  if (result.outputFiles.length !== 1) {
    throw new Error('Se esperaba un solo archivo de salida (sin code-splitting).');
  }
  return APP_HEADER + result.outputFiles[0].text;
}

async function minifyQuotes() {
  const src = fs.readFileSync(QUOTES_SRC, 'utf8');
  const { code } = await transform(src, { loader: 'js', format: 'esm', target: 'es2022', minify: true });
  return QUOTES_HEADER + code;
}

/* index.html debe servir js/app.js (no js/main.js ni js/main.min.js) y el
   importmap ya no debe existir (el bundle es autónomo). */
function wiringCheck() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const problems = [];
  if (!html.includes('src="js/app.js')) problems.push('index.html no referencia src="js/app.js"');
  for (const stale of ['src="js/main.js', 'src="js/main.min.js', 'type="importmap"', 'href="js/main.min.js']) {
    if (html.includes(stale)) problems.push(`index.html aún referencia ${stale}`);
  }
  return problems;
}

const CHECK = process.argv.includes('--check');
const [app, quotes] = await Promise.all([bundleApp(), minifyQuotes()]);

if (CHECK) {
  const stale = [];
  if (!fs.existsSync(OUT) || fs.readFileSync(OUT, 'utf8') !== app) stale.push(path.relative(ROOT, OUT));
  if (!fs.existsSync(QUOTES_OUT) || fs.readFileSync(QUOTES_OUT, 'utf8') !== quotes)
    stale.push(path.relative(ROOT, QUOTES_OUT));
  const wiring = wiringCheck();
  if (!stale.length && !wiring.length) {
    console.log('  ok   js/app.js y quotes.min.js al día · index.html apunta al bundle');
    process.exit(0);
  }
  if (stale.length) {
    console.error(
      '  FALLA estos derivados están desactualizados respecto a sus fuentes:\n' +
        stale.map((f) => `        · ${f}`).join('\n') +
        '\n      Corre `npm run build:js` y sube el resultado con el commit.'
    );
  }
  if (wiring.length) console.error('  FALLA ' + wiring.join('; '));
  process.exit(1);
}

fs.writeFileSync(OUT, app);
fs.writeFileSync(QUOTES_OUT, quotes);
console.log(
  `  js/app.js + quotes.min.js · ${((app.length + quotes.length) / 1024).toFixed(1)} KiB` +
    ` (app.js ${(app.length / 1024).toFixed(1)} KiB → gzip ${(gzipSync(app).length / 1024).toFixed(1)} KiB` +
    ` · quotes.min.js ${(quotes.length / 1024).toFixed(1)} KiB)`
);
