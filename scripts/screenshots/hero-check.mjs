/* hero-check.mjs — ¿aguanta la portada en pantallas que no son la tuya?
 *
 * POR QUÉ EXISTE
 *   La moneda la dibuja WebGL y el titular lo maqueta el CSS. Son dos
 *   sistemas independientes: nada garantiza que no se pisen, y con un solo
 *   navegador abierto en un solo tamaño no hay forma de saberlo. Esto abre
 *   Chromium una vez, recorre una lista de viewports reales, mide EN
 *   PÍXELES dónde acaba la moneda y dónde empieza el título, y falla si se
 *   acercan demasiado.
 *
 * USO
 *   npm start            # en otra terminal
 *   npm run hero:check
 *   npm run hero:check -- --save     # además guarda los PNG en .shots/hero/
 *   npm run hero:check -- --vps=1440x900,390x844
 *
 * QUÉ CONSIDERA UN FALLO
 *   · hueco moneda→titular por debajo de MIN_GAP px  → se pisan o rozan
 *   · borde superior de la moneda dentro de la barra de marca
 *   · un error de JavaScript en la página
 *
 * LÍMITES
 *   La moneda gira sobre su eje Y. Su ANCHO en pantalla depende del instante
 *   de la captura, su ALTO no — por eso todo se mide en vertical. Aun así,
 *   casi de canto queda tan mal iluminada que el borde no pasa el umbral de
 *   color y el diámetro sale corto; de ahí que se tomen SAMPLES instantáneas
 *   separadas y se quede con la mayor extensión vista. SwiftShader tampoco
 *   ilumina igual que una GPU: el umbral es deliberadamente estricto.
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { ROOT, parseArgs, launchChromium, openSite } from '../lib/chromium.mjs';

const args = parseArgs();

const ORIGIN = args.origin || 'http://localhost:8000';
const MIN_GAP = Number(args.gap || 20);
const SAVE = args.save === 'true';
/* Cuántas fotos por viewport y cuánto se espera entre ellas. La moneda gira a
   0,45 rad/s: 1,2 s ≈ 31° de giro, así que 3 tomas barren ~62° y al menos una
   pilla la cara bien iluminada. */
const SAMPLES = Number(args.samples || 3);
const SAMPLE_MS = Number(args.sampleMs || 1200);
const SAVE_DIR = path.join(ROOT, '.shots', 'hero');

/* Viewports reales, no redondos: portátiles con barra del navegador,
   monitores, tablets, teléfonos y —el caso que siempre se olvida— un
   teléfono en horizontal, que es el más apretado de todos. */
const DEFAULT_VPS = [
  '1920x1080', // monitor 1080p
  '1600x900',
  '1512x945', // MacBook Pro 14"
  '1440x764', // MacBook Air con barra + dock
  '1366x768', // el portátil más común del mundo
  '1280x720',
  '1084x684', // ventana no maximizada
  '1024x768',
  '834x1112', // iPad vertical
  '768x1024',
  '390x844', // iPhone vertical
  '844x390', // iPhone HORIZONTAL
];
const VPS = (args.vps ? args.vps.split(',') : DEFAULT_VPS).map((s) => s.trim());

/* ── PNG → píxeles, sin dependencias ──────────────────────────────────
   Chrome entrega PNG de 8 bits sin entrelazar, RGB (tipo 2) cuando la
   captura es opaca y RGBA (tipo 6) cuando lleva transparencia. */
function decodePNG(buf) {
  let off = 8,
    width = 0,
    height = 0,
    channels = 4;
  const idat = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString('ascii', off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      if (data[8] !== 8 || (data[9] !== 2 && data[9] !== 6) || data[12] !== 0) {
        throw new Error(`PNG no soportado (bits=${data[8]} color=${data[9]} interlace=${data[12]})`);
      }
      channels = data[9] === 2 ? 3 : 4;
    } else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    off += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = channels,
    stride = width * bpp;
  const out = Buffer.alloc(height * stride);
  let p = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[p++];
    const row = y * stride,
      prev = row - stride;
    for (let x = 0; x < stride; x++) {
      const rawv = raw[p + x];
      const a = x >= bpp ? out[row + x - bpp] : 0;
      const b = y > 0 ? out[prev + x] : 0;
      const c = x >= bpp && y > 0 ? out[prev + x - bpp] : 0;
      let v;
      if (filter === 0) v = rawv;
      else if (filter === 1) v = rawv + a;
      else if (filter === 2) v = rawv + b;
      else if (filter === 3) v = rawv + ((a + b) >> 1);
      else {
        const pa = Math.abs(b - c),
          pb = Math.abs(a - c),
          pc = Math.abs(a + b - 2 * c);
        v = rawv + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
      }
      out[row + x] = v & 0xff;
    }
    p += stride;
  }
  return { width, height, channels, data: out };
}

/* Extensión vertical del oro "de moneda" en una franja de la imagen.
   Umbral estricto a propósito: el bloom, las partículas y las estrellas son
   mucho más tenues, y el texto dorado queda fuera por el recorte. */
function goldSpan(img, yFrom, yTo) {
  let top = -1,
    bottom = -1;
  for (let y = Math.max(0, yFrom); y < Math.min(img.height, yTo); y++) {
    const row = y * img.width * img.channels;
    let hits = 0;
    for (let x = 0; x < img.width; x++) {
      const i = row + x * img.channels;
      const r = img.data[i],
        g = img.data[i + 1],
        b = img.data[i + 2];
      if (r > 140 && g > 95 && r - b > 75) hits++;
    }
    if (hits >= 6) {
      if (top < 0) top = y;
      bottom = y;
    }
  }
  return { top, bottom };
}

if (SAVE) fs.mkdirSync(SAVE_DIR, { recursive: true });

const { browser, page, errors } = await launchChromium({ width: 1440, height: 900 });

console.log(`Abriendo ${ORIGIN}…`);
await openSite(page, ORIGIN, { settleMs: 8000 });

const rows = [];
for (const vp of VPS) {
  const [w, h] = vp.split('x').map(Number);
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 2300));

  const dom = await page.evaluate(() => {
    const t = document.querySelector('.hero-title');
    const h1 = document.querySelector('.hero-title h1');
    const cs = getComputedStyle(h1);
    return {
      titleTop: Math.round(Number.isFinite(t.offsetTop) ? t.offsetTop : t.getBoundingClientRect().top),
      lines: Math.round(h1.getBoundingClientRect().height / parseFloat(cs.lineHeight)),
    };
  });

  /* La barra de marca de arriba también es dorada: se descarta. Por abajo se
     corta justo antes del titular, que además es dorado. */
  const safeTop = Math.min(112, Math.max(56, Math.round(h * 0.13)));
  const span = { top: -1, bottom: -1 };
  for (let i = 0; i < SAMPLES; i++) {
    if (i) await new Promise((r) => setTimeout(r, SAMPLE_MS));
    const png = await page.screenshot();
    if (SAVE && i === 0) fs.writeFileSync(path.join(SAVE_DIR, `${vp}.png`), png);
    const s0 = goldSpan(decodePNG(png), safeTop - 8, dom.titleTop - 2);
    if (s0.top >= 0 && (span.top < 0 || s0.top < span.top)) span.top = s0.top;
    if (s0.bottom > span.bottom) span.bottom = s0.bottom;
  }
  const gap = span.bottom < 0 ? null : dom.titleTop - span.bottom;
  const intoBar = span.top >= 0 && span.top < safeTop - 6;

  rows.push({ vp, w, h, ...dom, safeTop, ...span, gap, intoBar });
}

await browser.close();

const bad = rows.filter((r) => r.gap === null || r.gap < MIN_GAP || r.intoBar);
const pad = (v, n) => String(v).padStart(n);

console.log('');
console.log('  viewport    líneas  titleTop   moneda↑  moneda↓   Ø    centro   hueco');
console.log('  ' + '─'.repeat(70));
for (const r of rows) {
  const mark = r.gap === null || r.gap < MIN_GAP || r.intoBar ? ' ✗' : ' ·';
  const centre = r.top < 0 ? '  —' : `${pad(Math.round(((r.top + r.bottom) / 2 / r.h) * 100), 4)}%`;
  console.log(
    `${mark} ${r.vp.padEnd(10)} ${pad(r.lines, 4)}   ${pad(r.titleTop, 7)}   ${pad(r.top, 6)}   ${pad(r.bottom, 6)} ${pad(r.bottom - r.top, 5)}  ${centre}  ${pad(r.gap === null ? '—' : r.gap + 'px', 7)}` +
      (r.intoBar ? '   ← invade la barra de marca' : '')
  );
}

const gaps = rows.map((r) => r.gap).filter((g) => g !== null);
if (gaps.length) {
  console.log(`\n  hueco absoluto: mín ${Math.min(...gaps)}px · máx ${Math.max(...gaps)}px`);
  /* El hueco en píxeles varía porque el titular no está a la misma altura en
     todas partes; lo que debe mantenerse estable es la POSICIÓN ÓPTICA de la
     moneda, o sea el centro como fracción del alto. Esa es la métrica de si
     la composición es la misma pieza en todas las pantallas. */
  const centres = rows.filter((r) => r.top >= 0).map((r) => ((r.top + r.bottom) / 2 / r.h) * 100);
  const mean = centres.reduce((a, b) => a + b, 0) / centres.length;
  const sd = Math.sqrt(centres.reduce((a, b) => a + (b - mean) ** 2, 0) / centres.length);
  console.log(
    `  centro óptico: ${Math.min(...centres).toFixed(0)}%–${Math.max(...centres).toFixed(0)}% del alto` +
      ` · media ${mean.toFixed(0)}% · desviación ${sd.toFixed(1)} puntos`
  );
  console.log('  (desviación baja = la portada es la misma composición en todas las pantallas)');
}

if (errors.length) {
  console.log('\n  ERRORES DE PÁGINA:');
  [...new Set(errors)].slice(0, 6).forEach((e) => console.log('   ', e));
}
if (bad.length) {
  console.log(
    `\n  ✗ ${bad.length}/${rows.length} viewports por debajo del mínimo (${MIN_GAP}px): ${bad.map((b) => b.vp).join(', ')}`
  );
  process.exit(1);
}
console.log(`\n  ✓ ${rows.length}/${rows.length} viewports con al menos ${MIN_GAP}px de aire.`);
process.exit(errors.length ? 1 : 0);
