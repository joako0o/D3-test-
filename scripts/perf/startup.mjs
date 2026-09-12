/* startup.mjs — ¿qué bloquea el hilo principal mientras la página ARRANCA?
 *
 * POR QUÉ EXISTE
 *   `perf/measure.mjs` mide el scroll y `perf/lighthouse.mjs` da el puntaje,
 *   pero ninguna dice QUÉ función está detrás de las tareas largas del
 *   arranque. Lighthouse las lista con el archivo y el milisegundo
 *   (`viewport.js?v=2 · 3,278 ms · 363 ms`) y eso alcanza para saber DÓNDE
 *   mirar, no para saber POR QUÉ: la atribución apunta al script activo, no a
 *   la pila que lo causó. Este script captura la pila real.
 *
 * QUÉ MIDE
 *   1. Las tareas largas (>50 ms) desde la navegación hasta que la escena se
 *      asienta, con su instante y duración.
 *   2. Para cada una, la pila de funciones con tiempo propio, sacada de un
 *      perfil de CPU por muestreo (Profiler de CDP), no de una heurística.
 *   3. Los reflujos forzados del arranque: cuántos, cuántos milisegundos, y
 *      qué lectura de layout los provocó. Es el mecanismo por el que un
 *      archivo de 3 KB aparece costando medio segundo.
 *
 * USO
 *   npm start
 *   npm run startup
 *   npm run startup -- --wait=12000        # cuántos segundos de arranque mirar
 *   npm run startup -- --w=1350 --h=940    # viewport de escritorio
 */

import { parseArgs, launchChromium } from '../lib/chromium.mjs';

const args = parseArgs();
const W = Number(args.w || 1350);
const H = Number(args.h || 940);
const ORIGIN = args.origin || 'http://localhost:8000';
const WAIT_MS = Number(args.wait || 12000);

const { browser, page, errors } = await launchChromium({ width: W, height: H, headless: true });
const cdp = await page.createCDPSession();

/* Contadores instalados ANTES de cargar: así se ve el arranque entero y no
   solo lo que queda después de conectar. El parche de layout sigue la misma
   técnica que measure.mjs: envolver las lecturas que invalidan/forzan. */
await page.evaluateOnNewDocument(() => {
  window.__start = { t0: 0, tasks: [], reads: 0 };
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries())
        window.__start.tasks.push([e.startTime, e.duration, (e.attribution || [])[0]?.name || '']);
    }).observe({ entryTypes: ['longtask'] });
  } catch {
    /* longtask no existe en todos los navegadores */
  }
  /* Cada lectura de geometría con el estilo sucio fuerza un reflujo. Contarlas
     es lo que permite afirmar "este archivo cuesta medio segundo" en vez de
     sospecharlo: 13 lecturas × 40 ms de style+layout = 520 ms. */
  for (const prop of ['clientWidth', 'clientHeight', 'offsetWidth', 'offsetHeight', 'scrollHeight']) {
    const d =
      Object.getOwnPropertyDescriptor(Element.prototype, prop) ||
      Object.getOwnPropertyDescriptor(HTMLElement.prototype, prop);
    if (!d || !d.get) continue;
    const proto = Object.getOwnPropertyDescriptor(Element.prototype, prop) ? Element.prototype : HTMLElement.prototype;
    Object.defineProperty(proto, prop, {
      ...d,
      get() {
        window.__start.reads++;
        return d.get.call(this);
      },
    });
  }
});

await cdp.send('Profiler.enable');
await cdp.send('Profiler.setSamplingInterval', { interval: 100 }); // 100 µs: resolución alta
await cdp.send('Profiler.start');

await page.goto(`${ORIGIN}/index.html`, { waitUntil: 'load', timeout: 90000 });
await new Promise((r) => setTimeout(r, WAIT_MS));

const { profile } = await cdp.send('Profiler.stop');
const measured = await page.evaluate(() => ({
  tasks: window.__start.tasks,
  reads: window.__start.reads,
  navMs: performance.timing ? performance.now() : 0,
}));

await browser.close();

/* ── del perfil: tiempo propio por función y a quién llama ───────────────── */
const byId = new Map(profile.nodes.map((n) => [n.id, n]));
const parentOf = new Map();
for (const n of profile.nodes) for (const c of n.children || []) parentOf.set(c, n.id);

const self = new Map();
const totalDelta = profile.samples.length ? (profile.timeDeltas || []).reduce((a, b) => a + Math.max(b, 0), 0) : 0;
(profile.samples || []).forEach((id, i) => {
  const dt = Math.max((profile.timeDeltas || [])[i] || 0, 0);
  self.set(id, (self.get(id) || 0) + dt);
});

const shortUrl = (u) => (u || '(nativo)').split('/').slice(-1)[0] || '(nativo)';
const rows = [...self.entries()]
  .map(([id, us]) => {
    const cf = byId.get(id)?.callFrame || {};
    return {
      us,
      fn: cf.functionName || '(anónimo)',
      file: shortUrl(cf.url),
      line: cf.lineNumber ?? -1,
      own: /\/js\/(?!lib|vendor)/.test(cf.url || ''),
    };
  })
  .filter((r) => r.fn !== '(idle)' && r.fn !== '(program)' && r.fn !== '(garbage collector)')
  .sort((a, b) => b.us - a.us);

const busy = [...self.entries()]
  .filter(([id]) => {
    const f = byId.get(id)?.callFrame?.functionName || '';
    return f !== '(idle)';
  })
  .reduce((a, [, us]) => a + us, 0);

function stackOf(id, depth = 6) {
  const out = [];
  let cur = id;
  while (cur != null && out.length < depth) {
    const cf = byId.get(cur)?.callFrame || {};
    out.push(`${cf.functionName || '(anónimo)'} @ ${shortUrl(cf.url)}:${(cf.lineNumber ?? -1) + 1}`);
    cur = parentOf.get(cur);
  }
  return out;
}

/* ────────────────────────────── informe ────────────────────────────── */
console.log('');
console.log(
  `  ARRANQUE · ${W}x${H} · ${WAIT_MS / 1000} s observados · hilo principal ocupado ${(busy / 1000).toFixed(0)} ms de ${(totalDelta / 1000).toFixed(0)} ms`
);
console.log('  ' + '─'.repeat(76));

const tasks = measured.tasks.sort((a, b) => b[1] - a[1]);
console.log(`  TAREAS LARGAS (>50 ms): ${tasks.length}`);
for (const [at, dur] of tasks.slice(0, 10)) {
  console.log(`  ${String(Math.round(dur)).padStart(6)} ms  a los ${String(Math.round(at)).padStart(6)} ms`);
}
/* TBT = el exceso sobre 50 ms de cada tarea larga. Es exactamente lo que
   puntúa Lighthouse, así que se imprime con la misma definición. */
const tbt = tasks.reduce((a, [, d]) => a + Math.max(d - 50, 0), 0);
console.log(`  TBT del arranque: ${Math.round(tbt)} ms  (suma de lo que excede 50 ms en cada tarea)`);

console.log('');
console.log(`  LECTURAS DE GEOMETRÍA (clientWidth/Height, offset*, scrollHeight): ${measured.reads}`);
console.log('  cada una puede forzar un reflujo si el estilo quedó sucio.');

console.log('');
console.log('  FUNCIONES MÁS CARAS DEL ARRANQUE (tiempo propio)');
console.log('  ' + '─'.repeat(76));
for (const r of rows.slice(0, 18)) {
  const share = busy ? ((r.us / busy) * 100).toFixed(1) : '0.0';
  console.log(
    `  ${(r.us / 1000).toFixed(1).padStart(8)} ms ${share.padStart(5)}%  ${r.fn.padEnd(28).slice(0, 28)} ${r.file}:${r.line + 1}${r.own ? '  ← nuestro' : ''}`
  );
}

/* Las pilas de las tres funciones propias más caras: es lo que dice a qué
   línea de main.js hay que ir, que es la pregunta que este script existe
   para responder. */
const ownTop = rows.filter((r) => r.own).slice(0, 3);
if (ownTop.length) {
  console.log('');
  console.log('  CÓMO SE LLEGA A NUESTRO CÓDIGO MÁS CARO');
  console.log('  ' + '─'.repeat(76));
  for (const r of ownTop) {
    const nodeId = [...self.keys()].find((k) => {
      const cf = byId.get(k)?.callFrame || {};
      return cf.functionName === r.fn && shortUrl(cf.url) === r.file && (self.get(k) || 0) === r.us;
    });
    console.log(`  ${r.fn} (${(r.us / 1000).toFixed(1)} ms) en ${r.file}:${r.line + 1}`);
    if (nodeId != null) for (const line of stackOf(nodeId)) console.log(`      ${line}`);
  }
}

if (errors.length) {
  console.log('\n  ERRORES DE PÁGINA:');
  [...new Set(errors)].slice(0, 8).forEach((e) => console.log('   ', e));
}
console.log('');
process.exit(errors.length ? 1 : 0);
