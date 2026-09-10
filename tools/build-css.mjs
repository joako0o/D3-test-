/* build-css.mjs — concatena los CSS de css/ en css/bundle.css.
 *
 * POR QUÉ EXISTE
 *   index.html cargaba 21 hojas con <link rel="stylesheet">, una por una,
 *   todas bloqueando el primer pintado. En GitHub Pages (sin bundler, sin
 *   HTTP/2 push, sin control de cabeceras) eso son 21 idas y vueltas antes
 *   de pintar nada. El bundle deja UNA sola petición; la cascada no cambia
 *   porque el orden de concatenación es el mismo orden que tenían los <link>.
 *
 * CÓMO SE USA
 *   npm run build:css        # regenera css/bundle.css
 *   npm run check            # falla si el bundle quedó desactualizado
 *
 * REGLAS
 *   - Los fuentes se editan en css/*.css, NUNCA en bundle.css (se genera).
 *   - El orden vive en BUNDLE_FILES: es la cascada. No reordenar sin mirar
 *     css/README.md ("La regla de oro").
 *   - css/noscript.css NO entra: solo se carga dentro de <noscript>.
 *   - css/bundle.css SÍ se commitea: Pages publica el repo tal cual, sin
 *     paso de build, así que el generado tiene que viajar en git.
 *   - La versión del <link> (bundle.css?v=N) se sube a mano cuando el
 *     contenido visible cambia, igual que se hacía con cada hoja.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* El orden ES la cascada: el mismo que tenían los <link> en index.html. */
export const BUNDLE_FILES = [
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
  'css/29-low-power.css',
];

export const BUNDLE_PATH = 'css/bundle.css';

export function buildCssBundle() {
  const parts = [
    '/* bundle.css — GENERADO por `npm run build:css`. No editar a mano:\n' +
      '   se sobrescribe. Fuentes en css/*.css, orden en tools/build-css.mjs. */\n',
  ];
  for (const rel of BUNDLE_FILES) {
    const body = fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\s+$/, '');
    parts.push(`\n/* ═══ ${rel} ═══ */\n${body}\n`);
  }
  return parts.join('');
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
  const out = path.join(ROOT, BUNDLE_PATH);
  fs.writeFileSync(out, buildCssBundle());
  const kb = (fs.statSync(out).size / 1024).toFixed(1);
  console.log(`css/bundle.css ← ${BUNDLE_FILES.length} hojas (${kb} KB)`);
}
