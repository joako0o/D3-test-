/* build-d3-subset.mjs — reconstruir js/vendor/d3.min.js con solo lo que se usa.
 *
 * POR QUÉ EXISTE
 *   El bundle completo de D3 v7 pesa 273 KB (90 KB gzip) y la pieza usa
 *   catorce funciones. Ese es el mayor desperdicio de bytes del arranque:
 *   más que Three.js una vez comprimido, para una fracción del trabajo.
 *
 * POR QUÉ ASÍ Y NO CON UN BUNDLER EN EL SITIO
 *   El sitio se sirve como estáticos, sin paso de build: se abre index.html y
 *   funciona. Meter un bundler para una dependencia cambiaría esa propiedad
 *   para todo el proyecto. Aquí el build es una herramienta de mantenimiento
 *   que se ejecuta A MANO y deja su resultado versionado en js/vendor/, igual
 *   que estaba el bundle original. Nada cambia en cómo se sirve el sitio.
 *
 * CUÁNDO VOLVER A EJECUTARLO
 *   Al usar una función de D3 que no esté en la lista de abajo. Si falta, el
 *   síntoma es claro: `d3.loQueSea is not a function` en consola. Añádela a
 *   EXPORTS y vuelve a correr:
 *
 *     npm run build:d3
 *
 * QUÉ GARANTIZA
 *   El archivo generado expone `window.d3` con exactamente estos nombres, que
 *   es la misma superficie que el código ya usaba: no hay que tocar las
 *   secciones. La lista se verifica contra el código fuente al final.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'js', 'vendor', 'd3.min.js');

/* Lo que el sitio usa de verdad. Sale de:
     grep -rho 'd3\.[a-zA-Z]*' js/*.js js/sections/*.js | sort -u          */
const EXPORTS = {
  'd3-selection': ['select'],
  'd3-scale': ['scaleLinear', 'scaleTime'],
  'd3-shape': ['line', 'curveMonotoneX', 'curveLinear'],
  'd3-axis': ['axisBottom', 'axisLeft'],
  'd3-array': ['range', 'max', 'min', 'mean'],
  'd3-time': ['timeYear'],
  'd3-time-format': ['timeFormat'],
};

const lines = Object.entries(EXPORTS).map(([pkg, names]) => `export { ${names.join(', ')} } from '${pkg}';`);
const entry = path.join(ROOT, '.d3-entry.mjs');
fs.writeFileSync(entry, lines.join('\n') + '\n');

const header = `/* D3 v7 — subconjunto a medida de esta pieza, NO el bundle completo.
   Generado por tools/build-d3-subset.mjs; no editar a mano.
   Exporta solo: ${Object.values(EXPORTS).flat().sort().join(', ')}.
   Si hace falta otra función de D3, añádela allí y ejecuta: npm run build:d3
   D3 es Copyright Mike Bostock, licencia ISC. */`;

try {
  execFileSync(
    path.join(ROOT, 'node_modules', '.bin', 'esbuild'),
    [
      entry,
      '--bundle',
      '--minify',
      '--format=iife',
      /* `window.d3` global, igual que el bundle oficial: el sitio carga esto
         con un <script defer> normal, sin módulos ni importmap. */
      '--global-name=d3',
      '--legal-comments=none',
      '--target=es2019',
      `--banner:js=${header}`,
      `--outfile=${OUT}`,
    ],
    { stdio: 'inherit', cwd: ROOT }
  );
} finally {
  fs.unlinkSync(entry);
}

/* Red de seguridad: si el código usa un d3.algo que no se empaquetó, el fallo
   sería en tiempo de ejecución y solo al entrar en esa sección. Mejor aquí. */
const used = new Set();
const scan = (dir) => {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (['vendor', 'loaders', 'environments', 'utils'].includes(f.name)) continue;
      scan(p);
    } else if (f.name.endsWith('.js')) {
      for (const m of fs.readFileSync(p, 'utf8').matchAll(/\bd3\.([a-zA-Z][a-zA-Z0-9]*)/g)) used.add(m[1]);
    }
  }
};
scan(path.join(ROOT, 'js'));

const packed = new Set(Object.values(EXPORTS).flat());
const missing = [...used].filter((n) => !packed.has(n));
const unused = [...packed].filter((n) => !used.has(n));

const size = fs.statSync(OUT).size;
console.log(`\n  js/vendor/d3.min.js → ${(size / 1024).toFixed(0)} KB (antes 273 KB)`);
if (unused.length) console.log(`  empaquetado sin usarse: ${unused.join(', ')}`);
if (missing.length) {
  console.error(`\n  ERROR: el código usa d3.${missing.join(', d3.')} y no está empaquetado.`);
  console.error('  Añádelo a EXPORTS en tools/build-d3-subset.mjs y repite.');
  process.exit(1);
}
console.log('  todas las funciones de D3 que usa el sitio están incluidas.\n');
