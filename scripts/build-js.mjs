/* build-js.mjs — minifica el JS propio y deja los fuentes como única verdad.
 *
 * POR QUÉ EXISTE
 *   El JS de primera parte (js/main.js, core/, scene/, sections/, data/) se
 *   servía SIN minificar: Lighthouse lo marcaba en "Minificar JavaScript" con
 *   un ahorro de ~66,7 KiB solo en archivos propios (42,2 de main.js), más el
 *   tiempo de parseo/compilación de ese peso — que es justo lo que alimenta el
 *   TBT. Los vendor y three.js ya viajan minificados; los que no lo estaban
 *   eran los nuestros.
 *
 * QUÉ HACE (y qué NO)
 *   · Por cada fuente de TARGETS escribe un `<fuente>.min.js` AL LADO, con el
 *     mismo nombre y un `.min` antes de `.js`. Los `import`/`import()` relativos
 *     se reescriben para apuntar al `.min.js` del módulo importado (conservando
 *     el `?v=` de caché), así que el grafo minificado es completo y autónomo.
 *   · `js/lib/three/` y `js/vendor/` NO se tocan: ya están minificados y son
 *     bibliotecas copiadas (ver js/README.md). Sus specifiers desnudos
 *     ('three', 'three/addons/…') pasan intactos; los resuelve el importmap.
 *   · NO edita los fuentes: el `?v=` y el código legible viven en js/*.js.
 *     Las `.min.js` son DERIVADOS que se regeneran, como css/bundle.css.
 *
 * POR QUÉ ESBUILD (y no Node puro como build-css.mjs)
 *   El minificador de CSS puede ser conservador con un escáner de cadenas;
 *   en JS eso no alcanza: hay que distinguir un `//` de comentario de uno
 *   dentro de un string, una `/regex/` de una división, template literals y
 *   top-level await. Un minificador a mano es justo el sitio donde una
 *   página se rompe "solo en producción". esbuild es la herramienta estándar
 *   para esto y solo se usa en build (dependencia de desarrollo, como
 *   lighthouse o jsdom): el sitio publicado sigue siendo archivos estáticos.
 *
 * CACHÉ Y `?v=`
 *   GitHub Pages manda `Cache-Control: max-age=600`, así que la URL lleva
 *   `?v=` (igual que css/bundle.css). El `?v=` de CADA módulo vive en el
 *   FUENTE que lo importa y aquí se copia tal cual al `.min.js`: si cambias
 *   js/core/config.js, sube el `?v=` de `./core/config.js?v=…` en quienes lo
 *   importen Y el del `<link rel=modulepreload>` + `<script type=module>` de
 *   index.html, y corre `npm run build:js`. `npm run check` (§ 5a de
 *   tools/smoke-test.mjs) caza los `?v=` divergentes entre módulos.
 *
 * USO
 *   npm run build:js                      # regenera los *.min.js
 *   node scripts/build-js.mjs --check     # sale con 1 si algún .min.js está viejo
 *
 *   `npm start` lo corre solo (prestart). Y `npm run check` avisa si quedó
 *   desactualizado respecto a los fuentes.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* Fuentes que se minifican. Lista explícita y no un glob: un archivo nuevo que
   no esté aquí no se publica minificado, y eso es una decisión visible, no un
   accidente. Todas viven bajo js/ (los vendor y three NO entran). */
const TARGETS = [
  'js/main.js',
  'js/core/config.js',
  'js/core/deferred-boot.js',
  'js/core/interaction-state.js',
  'js/core/utils.js',
  'js/core/viewport.js',
  'js/scene/build-door.js',
  'js/scene/figures.js',
  'js/data/topics.js',
  'js/data/quotes.js',
  'js/sections/act-browser.js',
  'js/sections/axes-map.js',
  'js/sections/timeline.js',
  'js/sections/voice-explorer.js',
  'js/sections/word-evolution.js',
];

const outPath = (src) => src.replace(/\.js$/, '.min.js');

/* Reescribe los specifiers RELATIVOS ('./x.js', '../x.js', con o sin ?v=) para
   que apunten al `.min.js` del módulo importado, PERO SOLO si el destino es un
   módulo de primera parte (está en TARGETS). Los specifiers desnudos
   ('three', 'three/addons/…') los resuelve el <script type=importmap>, y
   scene/*.js importan three y sus addons por ruta RELATIVA
   ('../lib/three/addons/…'): esos NO se minifican ni se renombran (js/lib/
   no se edita), así que se dejan tal cual. */
const TARGET_SET = new Set(TARGETS.map((t) => t.replace(/\\/g, '/')));
function isFirstParty(fromRel, spec) {
  const q = spec.indexOf('?');
  const clean = q < 0 ? spec : spec.slice(0, q);
  const abs = path.normalize(path.join(path.dirname(fromRel), clean)).replace(/\\/g, '/');
  return TARGET_SET.has(abs);
}

function rewriteSpecifiers(src, fromRel) {
  return src.replace(/(['"])(\.{1,2}\/[^'"]+?)\.js(\?[^'"]*)?(['"])/g, (m, q1, p, query, q2) =>
    isFirstParty(fromRel, p + '.js' + (query || '')) ? `${q1}${p}.min.js${query || ''}${q2}` : m
  );
}

function minifyOne(rel) {
  const abs = path.join(ROOT, rel);
  const src = fs.readFileSync(abs, 'utf8');
  const rewritten = rewriteSpecifiers(src, rel);
  /* quotes.js es un <script> clásico (window.QUOTES = …) sin import/export:
     esbuild con format:'esm' lo deja igual que un script de nivel superior,
     solo que en modo estricto — que no cambia nada para una asignación a
     window. El resto son módulos con top-level await, que solo 'esm' admite. */
  return transform(rewritten, { loader: 'js', format: 'esm', target: 'es2022', minify: true });
}

function header(rel) {
  const out = rel.split('/').pop().replace(/\.js$/, '.min.js');
  return (
    `/* ${out} — GENERADO por scripts/build-js.mjs. No editar: se pisa al\n` +
    `   correr \`npm run build:js\` (que \`npm start\` ejecuta solo).\n` +
    `   Fuente: ${rel}. Edítalo ahí y corre \`npm run build:js\`. */\n`
  );
}

async function buildAll() {
  const results = [];
  for (const rel of TARGETS) {
    const { code } = await minifyOne(rel);
    results.push({ rel, out: outPath(rel), code: header(rel) + code });
  }
  return results;
}

/* ── Caché: el `?v=` del punto de entrada en index.html ───────────────────
   No se sube automático (a diferencia de build-css.mjs): la versión de un
   módulo la fija el FUENTE que lo importa y la del arranque index.html, y
   automatizar la mitad solo daría una falsa sensación de orden. Aquí se
   COMPRUEBA que el HTML apunte a los `.min.js` —si un revert vuelve a
   `js/main.js`, el check avisa aunque los .min.js estén al día. */
function wiringCheck() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const must = ['src="js/main.min.js', 'src="js/data/quotes.min.js'];
  const mustNot = ['src="js/main.js', 'href="js/main.js'];
  const problems = [];
  for (const needle of must) if (!html.includes(needle)) problems.push(`index.html no referencia ${needle}`);
  for (const needle of mustNot) if (html.includes(needle)) problems.push(`index.html aún referencia ${needle}`);
  return problems;
}

const CHECK = process.argv.includes('--check');
const results = await buildAll();

if (CHECK) {
  const stale = [];
  for (const { out, code } of results) {
    const onDisk = fs.existsSync(path.join(ROOT, out)) ? fs.readFileSync(path.join(ROOT, out), 'utf8') : null;
    if (onDisk !== code) stale.push(out);
  }
  const wiring = wiringCheck();
  if (!stale.length && !wiring.length) {
    console.log(`  ok   ${results.length} archivos .min.js al día con sus fuentes · index.html apunta a los .min.js`);
    process.exit(0);
  }
  if (stale.length) {
    console.error(
      '  FALLA estos .min.js están desactualizados respecto a sus fuentes:\n' +
        stale.map((f) => `        · ${f}`).join('\n') +
        '\n      Corre `npm run build:js` y sube el resultado con el commit.'
    );
  }
  if (wiring.length) console.error('  FALLA ' + wiring.join('; '));
  process.exit(1);
}

for (const { out, code } of results) {
  fs.writeFileSync(path.join(ROOT, out), code);
}
const rawTotal = results.reduce((a, { rel }) => a + fs.statSync(path.join(ROOT, rel)).size, 0);
const minTotal = results.reduce((a, { code }) => a + code.length, 0);
const pct = ((1 - minTotal / rawTotal) * 100).toFixed(0);
console.log(
  `  js/**/*.min.js  ${results.length} archivos · ` +
    `${(rawTotal / 1024).toFixed(1)} KiB → ${(minTotal / 1024).toFixed(1)} KiB (−${pct}%)`
);
for (const { rel, out, code } of results) {
  const before = fs.statSync(path.join(ROOT, rel)).size;
  console.log(`    · ${out.padEnd(40)} ${(before / 1024).toFixed(1)} KiB → ${(code.length / 1024).toFixed(1)} KiB`);
}
