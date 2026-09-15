/* mint-curtain.mjs — ¿GIRA la acuñación mientras la cortina está arriba?
 *
 * POR QUÉ EXISTE
 *   Síntoma reportado en GitHub Pages: la pantalla de carga se ve "congelada"
 *   — las dos señales de la órbita y el aro no giran. startup.mjs dice QUÉ
 *   tareas largas hay en el arranque; este script dice QUÉ VE EL LECTOR:
 *   1. captura la pantalla varias veces por segundo (las capturas salen del
 *    COMPOSITOR, no del hilo principal) y compara los píxeles de la banda
 *    central: 0 píxeles distintos entre dos capturas = congelado a la vista;
 *   2. muestrea el transform calculado de cada capa de .mint, junto con las
 *    tareas largas y el instante en que se levanta la cortina.
 *
 * USO
 *   npm start
 *   npm run perf:mint                        # arranque normal
 *   npm run perf:mint -- --throttle=3g       # red lenta (como Pages en frío)
 *   npm run perf:mint -- --cpu=6             # CPU 6× más lenta (gama media)
 *   npm run perf:mint -- --wait=20000        # cuántos segundos mirar
 */

import fs from 'node:fs';
import path from 'node:path';
import { parseArgs, launchChromium, ROOT } from '../lib/chromium.mjs';

const args = parseArgs();
const W = Number(args.w || 1280);
const H = Number(args.h || 800);
const ORIGIN = args.origin || 'http://localhost:8000';
const WAIT_MS = Number(args.wait || 16000);
const SAMPLE_MS = Number(args.sample || 500);
const SHOT_MS = Number(args.shot || 700);
const CPU = Number(args.cpu || 1);
const THROTTLE = String(args.throttle || '');
const OUT = args.out || path.join(ROOT, '.cache', 'mint-curtain');
const LABEL = [THROTTLE && `net-${THROTTLE}`, CPU > 1 && `cpu-${CPU}x`].filter(Boolean).join('_') || 'normal';

const PROFILES = {
  '3g': { offline: false, latency: 400, downloadThroughput: (400 * 1024) / 8, uploadThroughput: (400 * 1024) / 8 },
  slow3g: { offline: false, latency: 2000, downloadThroughput: (500 * 1024) / 8, uploadThroughput: (500 * 1024) / 8 },
  '4g': {
    offline: false,
    latency: 60,
    downloadThroughput: (4 * 1024 * 1024) / 8,
    uploadThroughput: (3 * 1024 * 1024) / 8,
  },
};

fs.mkdirSync(OUT, { recursive: true });

const { browser, page, errors } = await launchChromium({ width: W, height: H, headless: 'shell' });
const cdp = await page.createCDPSession();

/* El muestreador vive EN LA PÁGINA y corre por setTimeout: si el hilo
   principal se bloquea, el temporizador no corre y el hueco queda registrado
   (rafGaps). Ese hueco es la mitad del síntoma; la otra mitad la dicen las
   capturas, que no dependen del hilo principal. */
await page.evaluateOnNewDocument((sampleMs) => {
  window.__mint = { samples: [], longTasks: [], curtainUpAt: null, gaps: [] };
  const read = () => {
    const out = {};
    for (const cls of ['mint-ring', 'mint-orbit', 'mint-reed', 'mint-halo', 'mint-mono']) {
      const el = document.querySelector('.' + cls);
      if (!el) continue;
      const cs = getComputedStyle(el);
      out[cls] = {
        tf: cs.transform,
        op: cs.opacity,
        anim: `${cs.animationName} ${cs.animationPlayState}`,
        wc: cs.willChange,
      };
    }
    const load = document.getElementById('load');
    out.__load = load ? (load.classList.contains('hidden') ? 'hidden' : 'visible') : 'missing';
    out.__text = load ? load.textContent.replace(/\s+/g, ' ').trim().slice(0, 80) : '';
    return out;
  };
  const collect = () => {
    const t = performance.now();
    let entry;
    try {
      entry = read();
    } catch (e) {
      entry = { err: String(e) };
    }
    entry.__t = t;
    window.__mint.samples.push(entry);
    if (entry.__load === 'hidden' && window.__mint.curtainUpAt === null) window.__mint.curtainUpAt = t;
    if (window.__mint.lastSample && t - window.__mint.lastSample > sampleMs * 3) {
      window.__mint.gaps.push([Math.round(window.__mint.lastSample), Math.round(t - window.__mint.lastSample)]);
    }
    window.__mint.lastSample = t;
    window.__mint.timer = setTimeout(collect, sampleMs);
  };
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        window.__mint.longTasks.push([Math.round(e.startTime), Math.round(e.duration)]);
    }).observe({ entryTypes: ['longtask'] });
  } catch {
    /* longtask no existe en todos los navegadores */
  }
  collect();
}, SAMPLE_MS);

await cdp.send('Emulation.setCPUThrottlingRate', { rate: CPU });
if (THROTTLE && PROFILES[THROTTLE]) await cdp.send('Network.emulateNetworkConditions', PROFILES[THROTTLE]);

/* 'domcontentloaded', no 'load': interesa capturar MIENTRAS la cortina está
   arriba, y 'load' llega recién cuando terminan los GLB. */
const navError = await page.goto(`${ORIGIN}/index.html`, { waitUntil: 'domcontentloaded', timeout: 120000 }).then(
  () => null,
  (e) => String(e)
);
if (navError) errors.push('navegación: ' + navError.slice(0, 200));

const shots = [];
const t0 = Date.now();
let i = 0;
while (Date.now() - t0 < WAIT_MS) {
  const at = Date.now() - t0;
  try {
    const { data: b64 } = await cdp.send('Page.captureScreenshot', { format: 'png' });
    const file = path.join(OUT, `${LABEL}-${String(i).padStart(2, '0')}-${at}ms.png`);
    fs.writeFileSync(file, Buffer.from(b64, 'base64'));
    shots.push({ i, at, file });
  } catch (e) {
    shots.push({ i, at, file: null, err: String(e).slice(0, 120) });
  }
  i++;
  await new Promise((r) => setTimeout(r, SHOT_MS));
}

const empty = { samples: [], longTasks: [], curtainUpAt: null, gaps: [] };
let data = empty;
try {
  data = (await page.evaluate(() => window.__mint)) || empty;
} catch (e) {
  errors.push('sin muestras: ' + String(e).slice(0, 120));
}
try {
  await page.evaluate(() => window.__mint && clearTimeout(window.__mint.timer));
} catch {
  /* la página pudo navegar */
}

/* ── Diferencia de píxeles en la banda central (donde vive .mint) ─────────
   PNG sin dependencias: se decodifica con el propio Chromium (un <img> en
   about:blank y los píxeles a un canvas). Basta con contar cuántos píxeles
   cambian entre dos capturas consecutivas dentro del recorte central. */
const diffPage = await browser.newPage();
await diffPage.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
const px = async (file) => {
  const b64 = fs.readFileSync(file).toString('base64');
  return diffPage.evaluate(async (src) => {
    const img = new Image();
    img.src = src;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    /* Banda central: .mint ocupa 116 px en el medio de la pantalla. */
    const x0 = Math.round(img.width / 2 - 90),
      y0 = Math.round(img.height / 2 - 90);
    const d = ctx.getImageData(x0, y0, 180, 180).data;
    return { w: img.width, h: img.height, band: Array.from(d) };
  }, `data:image/png;base64,${b64}`);
};

const bandDiffs = [];
let prev = null;
for (const s of shots) {
  if (!s.file) continue;
  const cur = await px(s.file);
  if (prev) {
    let changed = 0;
    for (let k = 0; k < cur.band.length; k += 4) {
      if (
        Math.abs(cur.band[k] - prev.band[k]) +
          Math.abs(cur.band[k + 1] - prev.band[k + 1]) +
          Math.abs(cur.band[k + 2] - prev.band[k + 2]) >
        12
      )
        changed++;
    }
    bandDiffs.push({ a: prev.at, b: s.at, changed, total: cur.band.length / 4 });
  }
  prev = { at: s.at, band: cur.band };
}
await diffPage.close();

/* ── Informe ─────────────────────────────────────────────────────────── */
const angleOf = (tf) => {
  if (!tf || tf === 'none') return null;
  const m = tf.match(/matrix\(([^)]+)\)/);
  if (!m) return tf;
  const p = m[1].split(',').map(Number);
  return Math.round(((Math.atan2(p[1], p[0]) * 180) / Math.PI) * 10) / 10;
};

const whileVisible = data.samples.filter((s) => s.__load === 'visible');
const r = [];
r.push(`── cortina de carga: ${LABEL} · viewport ${W}×${H} · CPU ×${CPU} ──`);
r.push(`muestras con la cortina arriba: ${whileVisible.length} de ${data.samples.length}`);
r.push(
  `la cortina se levanta a los: ${data.curtainUpAt === null ? `NO en ${WAIT_MS / 1000} s` : (data.curtainUpAt / 1000).toFixed(1) + ' s'}`
);
if (whileVisible.length) r.push(`texto de la cortina: «${whileVisible[whileVisible.length - 1].__text}»`);
r.push('');
r.push('PÍXELES QUE CAMBIAN EN LA BANDA CENTRAL ENTRE CAPTURAS (0 = congelado a la vista):');
for (const d of bandDiffs) {
  const pct = ((d.changed / d.total) * 100).toFixed(1);
  r.push(
    `   ${String(d.a).padStart(6)}→${String(d.b).padStart(6)} ms · ${String(d.changed).padStart(6)} px (${pct.padStart(5)} %)`
  );
}
r.push('');
for (const cls of ['mint-ring', 'mint-orbit', 'mint-reed', 'mint-halo', 'mint-mono']) {
  const series = whileVisible.map((s) => s[cls]).filter(Boolean);
  if (!series.length) {
    r.push(`${cls}: NO EXISTE en el DOM`);
    continue;
  }
  const isOpacity = cls === 'mint-halo' || cls === 'mint-mono';
  const vals = series.map((s) => (isOpacity ? s.op : angleOf(s.tf)));
  const distinct = new Set(vals.map(String)).size;
  let longestRun = 0,
    run = 1;
  for (let k = 1; k < vals.length; k++) {
    run = String(vals[k]) === String(vals[k - 1]) ? run + 1 : 1;
    longestRun = Math.max(longestRun, run);
  }
  r.push(
    `${cls.padEnd(11)} ${isOpacity ? 'opacity' : 'ángulo '} · distintos ${String(distinct).padStart(2)}/${vals.length} · racha quieta máx ${longestRun} muestras (${((longestRun * SAMPLE_MS) / 1000).toFixed(1)} s)`
  );
  r.push(`            anim: ${series[0].anim} · will-change: ${series[0].wc}`);
  r.push(`            valores: ${vals.slice(0, 16).join(' → ')}`);
}
r.push('');
r.push(`tareas largas (>50 ms): ${data.longTasks.length}`);
for (const [t, d] of data.longTasks.slice(0, 30))
  r.push(`   inicio ${String(t).padStart(6)} ms · duración ${String(d).padStart(6)} ms`);
if (data.gaps.length) {
  r.push('');
  r.push('huecos en que el hilo principal no dejó muestrear:');
  for (const [t, g] of data.gaps.slice(0, 15)) r.push(`   desde ${t} ms · ${g} ms`);
}
if (errors.length) {
  r.push('');
  r.push('errores de página:');
  for (const e of errors.slice(0, 10)) r.push('   ' + e);
}

fs.writeFileSync(path.join(OUT, `report-${LABEL}.txt`), r.join('\n') + '\n');
fs.writeFileSync(path.join(OUT, `raw-${LABEL}.json`), JSON.stringify({ data, bandDiffs, errors }, null, 1));
console.log(r.join('\n'));
console.log(`\n(capturas e informe en ${path.relative(ROOT, OUT)}/)`);

await browser.close();
