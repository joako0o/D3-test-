/* build-css.mjs — genera css/site.css (bundle minificado) desde css/*.css.
 *
 * POR QUÉ EXISTE
 *   El sitio publicaba 22 hojas de estilo por separado (~141 KB en 22
 *   peticiones render-blocking). En GitHub Pages cada petición suma un
 *   round-trip al camino crítico del primer render. Este script las
 *   concatena EN EL MISMO ORDEN que los <link> históricos de index.html
 *   (la cascada NO cambia) y las minifica de forma conservadora.
 *
 * QUÉ MINIFICA (y qué no)
 *   - Quita comentarios /* *​/ y colapsa espacios en blanco.
 *   - Quita espacios pegados a { } ; : , ( ) — FUERA de cadenas y de
 *     url(...). No toca operadores: `calc(100% - 48px)` y `a + b`
 *     conservan sus espacios.
 *   - No reordena, no mergea selectores, no renombra nada: el resultado es
 *     el mismo CSS, sin comentarios y sin espacios sobrantes.
 *
 * FLUJO
 *   Editar css/00-*.css … css/28-*.css como siempre → correr
 *   `node tools/build-css.mjs` → committear css/site.css.
 *   `npm run check` corre `node tools/build-css.mjs --check` y FALLA si el
 *   bundle committeado no coincide con las fuentes actuales.
 *
 *   css/noscript.css queda fuera a propósito: viaja en <noscript> y solo
 *   existe cuando el JS no corre.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'css', 'site.css');

/* El MISMO orden que traían los <link> de index.html. La cascada depende de
   él: no reordenar sin revisar css/README.md. */
const SOURCES = [
  'css/fonts.css',
  'css/00-tokens-base.css',
  'css/10-stage-hook.css',
  'css/11-stage-map.css',
  'css/12-stage-counters.css',
  'css/13-stage-pipeline.css',
  'css/14-stage-language.css',
  'css/15-stage-acts.css',
  'css/16-stage-voices.css',
  'css/17-stage-timeline.css',
  'css/18-stage-quotes.css',
  'css/19-stage-closing.css',
  'css/20-breakpoints.css',
  'css/21-a11y-focus.css',
  'css/22-quote-panel.css',
  'css/23-a11y-jargon.css',
  'css/24-layout-fluid.css',
  'css/25-object-layers.css',
  'css/26-room-voice-nav.css',
  'css/27-figure-cabinet.css',
  'css/28-height-fixes.css',
];

/* Minificación conservadora: comentarios fuera, espacios colapsados y los
   espacios pegados a la puntuación estructural fuera. Cadenas y url(...) se
   copian byte a byte. */
export function minifyCss(css) {
  let out = '';
  let i = 0;
  const n = css.length;
  while (i < n) {
    const c = css[i];
    /* comentario */
    if (c === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end === -1 ? n : end + 2;
      continue;
    }
    /* cadena '…' o "…" (con escapes) */
    if (c === '"' || c === "'") {
      const q = c;
      out += c;
      i += 1;
      while (i < n) {
        out += css[i];
        if (css[i] === '\\') {
          i += 1;
          if (i < n) out += css[i];
        } else if (css[i] === q) {
          i += 1;
          break;
        }
        i += 1;
      }
      continue;
    }
    /* url(…) se copia verbatim (los data: URI pueden llevar comas/puntos) */
    if (c === 'u' && css.slice(i, i + 4) === 'url(') {
      out += 'url(';
      i += 4;
      let depth = 1;
      while (i < n && depth > 0) {
        const ch = css[i];
        if (ch === '(') depth += 1;
        else if (ch === ')') depth -= 1;
        out += ch;
        i += 1;
      }
      continue;
    }
    /* espacio en blanco: se colapsa y solo sobrevive entre valores */
    if (/\s/.test(c)) {
      i += 1;
      while (i < n && /\s/.test(css[i])) i += 1;
      const next = i < n ? css[i] : '';
      const prev = out.length ? out[out.length - 1] : '';
      if (next && !'{};:,()'.includes(next) && prev && !'{};:,()'.includes(prev)) out += ' ';
      continue;
    }
    if ('{};:,()'.includes(c)) {
      out = out.replace(/ $/, '') + c;
      i += 1;
      while (i < n && /\s/.test(css[i])) i += 1;
      continue;
    }
    out += c;
    i += 1;
  }
  return out.trim();
}

export function buildBundle() {
  const parts = SOURCES.map((rel) => {
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) throw new Error(`Falta ${rel}`);
    return minifyCss(fs.readFileSync(file, 'utf8'));
  });
  const header = [
    '/* css/site.css — GENERADO por tools/build-css.mjs. NO EDITAR A MANO.',
    ' * Fuentes (en este orden, la cascada depende de él):',
    ...SOURCES.map((rel) => ` *   ${rel}`),
    ' * Reconstruir: node tools/build-css.mjs   ·   Verificar: npm run check',
    ' */',
  ].join('\n');
  return header + '\n' + parts.join('\n');
}

const checkOnly = process.argv.includes('--check');
const fresh = buildBundle();
if (checkOnly) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (current !== fresh) {
    console.error('✗ css/site.css está desactualizado respecto a css/*.css.');
    console.error('  Reconstruirlo con:  node tools/build-css.mjs');
    process.exit(1);
  }
  console.log('✓ css/site.css al día con las fuentes.');
} else {
  fs.writeFileSync(OUT, fresh);
  const size = fs.statSync(OUT).size;
  console.log(`css/site.css generado: ${(size / 1024).toFixed(1)} KB (${SOURCES.length} fuentes)`);
}
