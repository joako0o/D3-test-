/* build-css.mjs — junta los 21 archivos de css/ en uno solo y lo minifica.
 *
 * POR QUÉ EXISTE
 *   `index.html` cargaba 21 hojas de estilo con `<link rel="stylesheet">`.
 *   Cada una es una petición de bloqueo de render: el navegador no pinta
 *   NADA hasta que han llegado todas, y sobre HTTP/1.1 (seis conexiones por
 *   origen) se encolan en tandas de seis. Medido en producción con
 *   Lighthouse: 58,6 KiB en bloqueo de render, 850 ms de ahorro estimado y
 *   una cadena crítica de 3.656 ms en la que las fuentes del hero —las que
 *   pintan el <h1>, que es el LCP— entraban a 3,1–3,6 s porque iban detrás
 *   de todo eso.
 *
 *   Un solo archivo resuelve las tres cosas: una petición en vez de 21, un
 *   gzip más pequeño y sin cola de conexiones.
 *
 *   LOS FUENTES SIGUEN SIENDO LA VERDAD. css/*.css se sigue editando a mano,
 *   con sus comentarios y su orden por prefijo numérico (ver css/README.md).
 *   `css/bundle.css` es un DERIVADO: se regenera, no se edita.
 *
 * CÓMO SE MINIFICA (y por qué con esta prudencia)
 *   Sin dependencias: Node puro, para que el repo no gane un gestor de
 *   paquetes por 20 KB. Y el minificador es conservador a propósito: este CSS
 *   tiene `content: "…"`, un `url("data:image/svg+xml,…")` con punto y coma,
 *   comillas y comas dentro, y `calc(100% - 2rem)`, donde quitar un espacio
 *   alrededor del `-` rompe la expresión. Así que:
 *     · un escáner saca primero las cadenas y las url() a marcadores, y las
 *       repone al final (proteger con una sola expresión regular no alcanza:
 *       un data: URI con comillas la descuadra);
 *     · se borran los comentarios;
 *     · cada racha de espacios se colapsa a UN espacio (nunca se borra del
 *       todo: así `calc()` sigue siendo válido);
 *     · se quitan los espacios pegados a `{}` `;` `,` y los del borde;
 *     · se quita el último `;` antes de `}`.
 *   No se tocan los dos puntos: `p :hover` y `p:hover` no significan lo
 *   mismo, y el ahorro no paga ese riesgo.
 *
 * USO
 *   npm run build:css                    # regenera css/bundle.css
 *   node scripts/build-css.mjs --check   # sale con 1 si el bundle está viejo
 *
 *   `npm start` lo corre solo (prestart), así que en el día a día no hay que
 *   acordarse. Y `npm run check` avisa si el bundle quedó desactualizado
 *   respecto a los fuentes —que es el único modo de romper esto.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CSS_DIR = path.join(ROOT, 'css');
const OUT = path.join(CSS_DIR, 'bundle.css');

/* Orden de la cascada: el que marcaba index.html. `fonts.css` primero (declara
   las @font-face) y luego el prefijo numérico. `noscript.css` queda FUERA: se
   carga dentro de <noscript>, solo sin JavaScript; meterlo aquí lo aplicaría
   siempre (deja el relato visible sin animar: el efecto contrario). */
const ORDER = ['fonts.css'];
const SKIP = new Set(['bundle.css', 'noscript.css']);

function sourceFiles() {
  const all = fs.readdirSync(CSS_DIR).filter((f) => f.endsWith('.css') && !SKIP.has(f));
  const named = ORDER.filter((f) => all.includes(f));
  const numbered = all.filter((f) => !ORDER.includes(f) && /^\d\d-/.test(f)).sort();
  /* Un .css que no siga la convención numérica se avisa: en la cascada su
     sitio importa y aquí nadie puede adivinar cuál es. */
  const stray = all.filter((f) => !ORDER.includes(f) && !/^\d\d-/.test(f));
  return { files: [...named, ...numbered], stray };
}

/* ── Protección de cadenas y url() ────────────────────────────────────── */

const NUL = '\u0000';

/* Escanea carácter a carácter: una expresión regular sola se equivoca con un
   `url("data:…")` que lleva comillas, comas y punto y coma por dentro. */
function protect(css) {
  const store = [];
  let out = '';
  let i = 0;
  while (i < css.length) {
    const ch = css[i];

    /* Comentario: se descarta aquí, antes de mirar nada de dentro (un `/*`
       dentro de una cadena no es un comentario, y viceversa). */
    if (ch === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end < 0 ? css.length : end + 2;
      out += ' ';
      continue;
    }

    if (ch === '"' || ch === "'") {
      const start = i;
      i++;
      while (i < css.length && css[i] !== ch) i += css[i] === '\\' ? 2 : 1;
      i = Math.min(i + 1, css.length);
      store.push(css.slice(start, i));
      out += NUL + (store.length - 1) + NUL;
      continue;
    }

    /* url( … ): hasta el `)` de cierre, respetando comillas y su contenido. */
    if (/url\(/i.test(css.slice(i, i + 4))) {
      const start = i;
      let depth = 0;
      while (i < css.length) {
        const c = css[i];
        if (c === '(') depth++;
        else if (c === ')') {
          depth--;
          if (depth === 0) {
            i++;
            break;
          }
        } else if (c === '"' || c === "'") {
          const quote = c;
          i++;
          while (i < css.length && css[i] !== quote) i += css[i] === '\\' ? 2 : 1;
        }
        i++;
      }
      store.push(css.slice(start, i));
      out += NUL + (store.length - 1) + NUL;
      continue;
    }

    out += ch;
    i++;
  }
  return { out, store };
}

function restore(css, store) {
  return css.replace(new RegExp(NUL + '(\\d+)' + NUL, 'g'), (m, n) => store[Number(n)] ?? m);
}

function minify(src) {
  const { out: safe, store } = protect(src);
  const css = safe
    .replace(/\s+/g, ' ') // rachas de espacio → uno (calc() lo necesita)
    .replace(/\s*([{};,])\s*/g, '$1') // espacios pegados a delimitadores
    .replace(/;}/g, '}') // último punto y coma del bloque
    .replace(/^\s+|\s+$/g, '');
  return restore(css, store);
}

/* ── Salida ───────────────────────────────────────────────────────────── */

function build() {
  const { files, stray } = sourceFiles();
  if (stray.length) {
    console.warn(
      `  aviso: ${stray.join(', ')} no sigue el prefijo numérico y NO entra en el bundle.\n` +
        `         Añádelo a ORDER en scripts/build-css.mjs en la posición que le toque.`
    );
  }
  const parts = files.map((f) => {
    const raw = fs.readFileSync(path.join(CSS_DIR, f), 'utf8');
    return `/* ${f} */\n${minify(raw)}`;
  });
  const header =
    `/* bundle.css — GENERADO por scripts/build-css.mjs. No editar: se pisa al\n` +
    `   correr \`npm run build:css\` (que \`npm start\` ejecuta solo).\n` +
    `   Fuentes, en el orden de la cascada: ${files.join(' · ')}. */\n`;
  return header + parts.join('\n') + '\n';
}

/* ── Versión de la caché ────────────────────────────────────────────────
   GitHub Pages manda `Cache-Control: max-age=600`, así que un visitante que
   vuelve puede servirse el bundle viejo aunque el servidor ya tenga el nuevo.
   Por eso la URL lleva `?v=` y por eso se sube AUTOMÁTICAMENTE cada vez que el
   contenido cambia: si lo subiera a mano, tarde o temprano se olvida y el
   síntoma es el peor posible —una portada que se ve bien en local y mal en
   producción—. El número solo se incrementa, para que el historial deje ver
   la serie. */
const HTML = path.join(ROOT, 'index.html');
const HREF_RE = /(href="css\/bundle\.css\?v=)(\d+)(")/;

function bumpCacheVersion(htmlChanged) {
  if (!htmlChanged) return null;
  const html = fs.readFileSync(HTML, 'utf8');
  const m = HREF_RE.exec(html);
  if (!m) {
    console.warn('  aviso: no encontré `css/bundle.css?v=` en index.html; no toco la versión.');
    return null;
  }
  const nextVersion = Number(m[2]) + 1;
  fs.writeFileSync(HTML, html.replace(HREF_RE, `$1${nextVersion}$3`));
  return nextVersion;
}

const CHECK = process.argv.includes('--check');
const next = build();
const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null;

if (CHECK) {
  if (current === next) {
    console.log('  ok   css/bundle.css está al día con css/*.css');
    process.exit(0);
  }
  console.error(
    '  FALLA css/bundle.css está desactualizado respecto a css/*.css.\n' +
      '        Corre `npm run build:css` y sube el resultado con el commit.'
  );
  process.exit(1);
}

const { files } = sourceFiles();
const rawTotal = files.reduce((a, f) => a + fs.statSync(path.join(CSS_DIR, f)).size, 0);
const changed = current !== next;
const version = bumpCacheVersion(changed);
fs.writeFileSync(OUT, next);
const pct = ((1 - next.length / rawTotal) * 100).toFixed(0);
console.log(
  `  css/bundle.css  ${files.length} archivos · ` +
    `${(rawTotal / 1024).toFixed(1)} KiB → ${(next.length / 1024).toFixed(1)} KiB (−${pct}%)` +
    (version ? ` · caché ?v=${version}` : ' · sin cambios')
);
