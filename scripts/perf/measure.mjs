/* measure.mjs — ¿qué cuesta mover esta página?
 *
 * POR QUÉ EXISTE
 *   El repo ya tenía tres redes: `check` (no revienta), `shots` (se ve bien),
 *   `hero:check` (la portada compone). Ninguna decía si la página va fluida, y
 *   "va más suave" sin número es exactamente la clase de afirmación que este
 *   proyecto dejó de aceptar. Esto mide el coste del hilo principal mientras
 *   alguien hace scroll de verdad, y lo deja por escrito.
 *
 * QUÉ MIDE
 *   1. Frames: separación entre `requestAnimationFrame` (p50/p95/máx) y cuántos
 *      pasan de 50 ms, por sección. Un frame de 50 ms es el que el ojo ve como
 *      tirón.
 *   2. Tareas largas: PerformanceObserver('longtask') — cualquier cosa que
 *      bloquee el hilo principal más de 50 ms.
 *   3. Desglose del hilo principal (traza de Chrome): scripting, recálculo de
 *      estilo, layout, paint — y los *reflujos forzados*, que son layouts que
 *      el propio JS provoca leyendo una medida con el estilo sucio. Se listan
 *      con la pila que los causó, o sea con nombre y apellido.
 *   4. Perfil de CPU por muestreo: las funciones que más tiempo propio
 *      consumen. Es lo que dice DÓNDE optimizar en vez de adivinarlo.
 *   5. Draw calls por frame, contando las llamadas reales a WebGL (se parchea
 *      el prototipo del contexto antes de cargar la página: no hace falta que
 *      main.js exponga nada).
 *   6. Coste en reposo: la escena se anima sola, así que también se mide
 *      quieto. Es lo que paga quien deja la pestaña abierta.
 *
 * USO
 *   npm start                                  # el servidor, en otra terminal
 *   npm run perf                               # 1440x900, documento completo
 *   npm run perf -- --w=390 --h=844            # móvil
 *   npm run perf -- --json=.shots/perf.json    # guarda el resultado
 *   npm run perf -- --cpu=4                    # simula un portátil 4x más lento
 *   npm run perf -- --budget=false             # solo informa, no suspende
 *
 * LÍMITES
 *   Chromium pinta con SwiftShader (software): los FPS absolutos NO son los de
 *   una GPU real y no hay que citarlos como si lo fueran. Lo que sí es
 *   comparable entre ejecuciones y entre máquinas es el coste del hilo
 *   principal —scripting, style, layout, reflujos, draw calls—, y por eso los
 *   presupuestos se ponen sobre eso y los frames se imprimen como
 *   informativos.
 */

import fs from 'node:fs';
import path from 'node:path';
import { ROOT, parseArgs, sleep, launchChromium, openSite } from '../lib/chromium.mjs';

const args = parseArgs();
const W = Number(args.w || 1440);
const H = Number(args.h || 900);
const ORIGIN = args.origin || 'http://localhost:8000';
const CPU = Number(args.cpu || 1);
const STEP_MS = Number(args.stepMs || 85);       // cadencia de los impulsos de rueda
const STEP_PX = Number(args.stepPx || 0);        // 0 = medio viewport por impulso
const IDLE_MS = Number(args.idleMs || 3000);
/* `--quick` recorre el documento solo de bajada y acorta el reposo: la mitad
   de tiempo para iterar. El informe definitivo se hace sin él. */
const QUICK = args.quick === 'true';
const JSON_OUT = args.json ? path.resolve(ROOT, args.json) : null;
const CHECK_BUDGET = args.budget !== 'false';

/* Presupuestos sobre el hilo principal. Calibrados con la línea base medida en
   este mismo entorno (1440x900, Chromium + SwiftShader, `npm run perf`); si
   cambia la máquina o el viewport hay que volver a mirarlos, no copiarlos. */
const BUDGET = {
  /* Calibrados con la medición del 2026-09-02 en este mismo entorno
     (1440x900, Chromium + SwiftShader, recorrido completo de ida y vuelta).
     Si cambia la máquina o el viewport hay que volver a mirarlos, no
     copiarlos: son el suelo medido, no un deseo. */
  scriptMsPerSec: Number(args.maxScriptMsPerSec || 120),  // medido: 63 ms/s
  styleMsPerSec: Number(args.maxStyleMsPerSec || 60),     // medido: 22 ms/s
  layoutMsPerSec: Number(args.maxLayoutMsPerSec || 45),   // medido: 1,3 ms/s
  /* Medido: 2.584. No son de nuestro código (el perfil no encuentra ni una
     lectura de layout propia): vienen del window.scrollTo de Lenis en cada
     frame y del style+layout que Blink fuerza al componer. Es el suelo de
     una página que anima el DOM; bajar de ahí es trabajo pendiente, no un
     presupuesto que se pueda exigir hoy. */
  forcedReflows: Number(args.maxForcedReflows || 3200),
  /* La peor tarea larga con el código optimizado oscila entre 150 y 400 ms en
     esta máquina; antes del arreglo era de 2 a 11 SEGUNDOS. El presupuesto se
     pone en 1 s: tolera la varianza del entorno y sigue cazando cualquier
     regresión de compilación-en-el-scroll. */
  longTaskMs: Number(args.maxLongTaskMs || 1000),
  curtainMs: Number(args.maxCurtainMs || 15000),          // medido: 7.328 ms
};

const { browser, page, errors } = await launchChromium({ width: W, height: H });
const cdp = await page.createCDPSession();

/* ── Instrumentación instalada ANTES de cargar la página ─────────────────
   evaluateOnNewDocument corre antes que cualquier script del sitio, así que
   el parche de WebGL cuenta las llamadas desde el primer draw. */
await page.evaluateOnNewDocument(() => {
  window.__perf = { frames: [], tasks: [], t0: 0 };
  /* `links` y `creates` cuentan COMPILACIONES de programa: después del
     arranque deberían ser 0. Un programa recompilado en caliente bloquea el
     hilo principal decenas de milisegundos, que es justo el tirón que se ve. */
  window.__gl = { draws: 0, links: 0, creates: 0, deletes: 0, infoLogs: 0, patched: false };

  /* Dos trampas de Chromium que costaron mediciones enteras:
     1. Los métodos del prototipo WebGL NO son escribibles: `proto.drawArrays = …`
        falla en silencio. Hay que `Object.defineProperty`.
     2. Chromium instala los miembros de WebGLRenderingContext DE FORMA
        PEREZOSA: en `document-start` el prototipo viene vacío, así que no se
        puede parchear una sola vez al principio. Se reintenta cada frame hasta
        que están, que es antes de que el sitio cree su contexto.
     Y solo se parchean las propiedades PROPIAS: las que WebGL2RenderingContext
     hereda ya quedan cubiertas por el parche del padre. */
  const COUNTED = {
    drawArrays: () => { window.__gl.draws++; },
    drawElements: () => { window.__gl.draws++; },
    drawArraysInstanced: () => { window.__gl.draws++; },
    drawElementsInstanced: () => { window.__gl.draws++; },
    drawRangeElements: () => { window.__gl.draws++; },
    linkProgram: () => { window.__gl.links++; },
    createProgram: () => { window.__gl.creates++; },
    deleteProgram: () => { window.__gl.deletes++; },
    getShaderInfoLog: () => { window.__gl.infoLogs++; },
    getProgramInfoLog: () => { window.__gl.infoLogs++; },
  };
  function tryPatchGL() {
    if (window.__gl.patched) return true;
    const protos = [window.WebGLRenderingContext, window.WebGL2RenderingContext].filter(Boolean);
    if (!protos.length) return false;
    let done = 0;
    for (const proto of protos.map((P) => P.prototype)) {
      for (const m of Object.keys(COUNTED)) {
        if (!Object.prototype.hasOwnProperty.call(proto, m)) continue;
        const d = Object.getOwnPropertyDescriptor(proto, m);
        const orig = d.value;
        if (typeof orig !== 'function' || orig.__counted) continue;
        const wrapped = function (...a) { COUNTED[m](); return orig.apply(this, a); };
        wrapped.__counted = true;
        Object.defineProperty(proto, m, { value: wrapped, writable: true, configurable: true, enumerable: d.enumerable });
        done++;
      }
    }
    /* Solo se da por parcheado cuando el contador de draws está dentro:
       sin eso, un 0 en el informe no se distinguiría de un parche fallido. */
    if (window.WebGLRenderingContext && Object.prototype.hasOwnProperty.call(window.WebGLRenderingContext.prototype, 'drawArrays')
      && window.WebGLRenderingContext.prototype.drawArrays.__counted) {
      window.__gl.patched = true;
      window.__gl.wrapped = done;
      return true;
    }
    return false;
  }

  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) window.__perf.tasks.push([e.startTime, e.duration, (e.attribution || [])[0]?.name || '']);
    }).observe({ entryTypes: ['longtask'] });
  } catch { /* longtask no está en todos los navegadores */ }

  let last = performance.now();
  (function loop() {
    tryPatchGL();
    const now = performance.now();
    const d = now - last;
    last = now;
    /* [instante, ms desde el frame anterior, scrollY, draw calls del frame, compilaciones del frame] */
    window.__perf.frames.push([now, d, window.scrollY, window.__gl.draws, window.__gl.links]);
    window.__gl.draws = 0;
    window.__gl.links = 0;
    requestAnimationFrame(loop);
  })();

  window.__perf.reset = () => {
    window.__perf.frames.length = 0;
    window.__perf.tasks.length = 0;
    window.__perf.t0 = performance.now();
    window.__gl.links = 0;
    window.__gl.creates = 0;
    window.__gl.deletes = 0;
    window.__gl.infoLogs = 0;
  };
  window.__perf.glTotals = () => ({ ...window.__gl });
});

console.log(`Abriendo ${ORIGIN} a ${W}x${H}…`);
await openSite(page, ORIGIN, { settleMs: 0 });

/* ¿Cuándo se levanta la cortina de carga? Mover trabajo del scroll al
   arranque solo es un trato honesto si se enseña lo que cuesta el arranque. */
const curtainMs = await page.evaluate(() => new Promise((resolve) => {
  const el = document.getElementById('load');
  if (!el || el.classList.contains('hidden')) return resolve(Math.round(performance.now()));
  const iv = setInterval(() => {
    if (el.classList.contains('hidden')) { clearInterval(iv); resolve(Math.round(performance.now())); }
  }, 50);
  setTimeout(() => { clearInterval(iv); resolve(-1); }, 120000);
}));
const nav = await page.evaluate(() => {
  const n = performance.getEntriesByType('navigation')[0] || {};
  return { domReady: Math.round(n.domContentLoadedEventEnd || 0), load: Math.round(n.loadEventEnd || 0) };
});
console.log(`Arranque: DOM en ${nav.domReady} ms · load en ${nav.load} ms · cortina arriba a los ${curtainMs < 0 ? '—(no llegó)' : curtainMs + ' ms'}.`);
await sleep(3000);

const glDiag = await page.evaluate(() => window.__perf.glTotals());
if (!glDiag.patched) console.log('  ⚠ el contador de WebGL no se instaló: los draw calls saldrán a 0 y no significan nada.');
const doc = await page.evaluate(() => ({
  max: document.documentElement.scrollHeight - window.innerHeight,
  sections: [...document.querySelectorAll('.hero, main#mainContent section[id]')].map((el) => {
    const r = el.getBoundingClientRect();
    return { id: el.id || 'hero', top: Math.round(r.top + window.scrollY), h: Math.round(r.height) };
  }),
}));
console.log(`Documento: ${Math.round(doc.max + H)} px · ${doc.sections.length} secciones.`);

/* Se mueve con la rueda de verdad (Input.dispatchMouseEvent), no con
   scrollTo: así el camino medido es el que recorre un lector — Lenis
   interpola, ScrollTrigger se entera y la escena responde. */
const STEP = STEP_PX || Math.round(H * 0.42);
await page.mouse.move(Math.round(W / 2), Math.round(H / 2));
await page.evaluate(() => window.scrollTo(0, 0));
await sleep(1200);

async function scrollPass(direction) {
  let y = await page.evaluate(() => window.scrollY);
  while (direction > 0 ? y < doc.max - 4 : y > 4) {
    await page.mouse.wheel({ deltaY: direction * STEP });
    await sleep(STEP_MS);
    y = await page.evaluate(() => window.scrollY);
  }
}

async function measuredPhase(name, fn) {
  await page.evaluate(() => window.__perf.reset());
  /* Marca de reloj DE LA PÁGINA: sirve para saber si algo (un precalentado,
     una carga tardía) cayó dentro de la fase que se está midiendo. */
  const pageStart = await page.evaluate(() => performance.now());
  const traceFile = path.join(ROOT, '.cache', `perf-trace-${name}.json`);
  fs.mkdirSync(path.dirname(traceFile), { recursive: true });
  await cdp.send('Profiler.enable');
  await cdp.send('Profiler.setSamplingInterval', { interval: 250 });
  /* Ojo con los nombres: `dev.timeline` no existe, la categoría buena es
     `devtools.timeline`, y Layout/UpdateLayoutTree viven en `blink`. Con los
     nombres mal puestos la traza sale vacía y el informe dice 0 ms de todo. */
  await page.tracing.start({ path: traceFile, categories: [
    'blink', 'devtools.timeline', 'disabled-by-default-devtools.timeline', 'v8.execute',
  ] });
  await cdp.send('Profiler.start');
  const startedAt = Date.now();
  await fn();
  const wallMs = Date.now() - startedAt;
  const { profile } = await cdp.send('Profiler.stop');
  await page.tracing.stop();
  await sleep(300);
  const perf = await page.evaluate(() => ({ frames: window.__perf.frames, tasks: window.__perf.tasks, gl: window.__perf.glTotals() }));
  return { name, wallMs, pageStart, pageEnd: await page.evaluate(() => performance.now()), perf, profile, trace: readTrace(traceFile) };
}

function readTrace(file) {
  const raw = fs.readFileSync(file, 'utf8');
  let parsed;
  try { parsed = JSON.parse(raw); } catch { parsed = JSON.parse(`{"traceEvents":${raw}`); }
  return Array.isArray(parsed) ? parsed : parsed.traceEvents || [];
}

/* Un portátil de gama media no es esta máquina. El throttling de CPU hace que
   los números del hilo principal se parezcan más a lo que ve un lector. */
if (CPU > 1) {
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: CPU });
  console.log(`Throttling de CPU x${CPU} activado.`);
}

console.log('\n Midiendo el scroll completo (ida y vuelta)…');
const scrollPhase = await measuredPhase('scroll', async () => {
  await scrollPass(1);
  await sleep(600);
  if (!QUICK) { await scrollPass(-1); await sleep(400); }
});

console.log(' Midiendo el coste en reposo (la escena se anima sola)…');
await page.evaluate((m) => window.scrollTo(0, m), Math.round(doc.max * 0.35));
await sleep(2500);
const idlePhase = await measuredPhase('idle', () => sleep(QUICK ? 1500 : IDLE_MS));

/* Con el navegador todavía abierto: después de close() la página está
   desconectada y esto revienta (pasó). */
const warmUps = await page.evaluate(() => performance.getEntriesByType('measure')
  .filter((m) => m.name === 'warmUpScene')
  .map((m) => ({ at: Math.round(m.startTime), ms: Math.round(m.duration) })));

await browser.close();

/* ──────────────────────────── análisis ──────────────────────────── */

const pct = (arr, p) => {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))];
};

/* Qué sección contiene cada scrollY. */
function sectionAt(y) {
  for (const s of doc.sections) if (y >= s.top && y < s.top + s.h) return s.id;
  let best = doc.sections[0];
  for (const s of doc.sections) if (Math.abs(s.top - y) < Math.abs(best.top - y)) best = s;
  return best?.id || '?';
}

function analyzeFrames(frames) {
  const deltas = frames.slice(1).map((f) => f[1]);          // el primer frame no tiene anterior
  const jank = deltas.filter((d) => d > 50).length;
  const bySection = new Map();
  for (const f of frames.slice(1)) {
    const id = sectionAt(f[2]);
    if (!bySection.has(id)) bySection.set(id, []);
    bySection.get(id).push(f[1]);
  }
  const draws = frames.map((f) => f[3]).filter((d) => d > 0);
  return {
    count: deltas.length,
    p50: pct(deltas, 50), p95: pct(deltas, 95), max: deltas.length ? Math.max(...deltas) : 0,
    jank, jankRate: deltas.length ? (jank / deltas.length) * 100 : 0,
    bySection, draws,
  };
}

/* La traza de Chrome: qué hizo el hilo principal y durante cuánto. */
function analyzeTrace(events) {
  /* En un Chromium normal el hilo se llama CrRendererMain; en headless shell
     el renderer vive dentro del proceso del navegador y se llama
     Chrome_InProcRendererThread. Si ninguno aparece, se toma el hilo con más
     eventos completos, que es el principal por definición. */
  const MAIN_NAMES = new Set(['CrRendererMain', 'Chrome_InProcRendererThread']);
  const mainThreads = new Set();
  const byThread = new Map();
  for (const e of events) {
    if (e.ph === 'M' && e.name === 'thread_name' && MAIN_NAMES.has(e.args?.name)) {
      mainThreads.add(`${e.pid}:${e.tid}`);
    } else if (e.ph === 'X') {
      const k = `${e.pid}:${e.tid}`;
      byThread.set(k, (byThread.get(k) || 0) + 1);
    }
  }
  if (!mainThreads.size && byThread.size) {
    mainThreads.add([...byThread.entries()].sort((a, b) => b[1] - a[1])[0][0]);
  }
  const isMain = (e) => mainThreads.has(`${e.pid}:${e.tid}`);

  /* Estos eventos se ANIDAN (un UpdateStyleAndLayout contiene updateStyle y
     Layout), así que no se pueden sumar entre sí: cada fila del informe es una
     medida independiente de un tipo de trabajo. */
  const BUCKETS = {
    script: new Set(['FunctionCall', 'EvaluateScript', 'v8.run', 'TimerFire', 'EventDispatch',
      'FireAnimationFrame', 'MicrotaskRun', 'v8.compile']),
    raf: new Set(['FrameRequestCallbackCollection::ExecuteFrameCallbacks']),
    style: new Set(['UpdateLayoutTree']),
    layout: new Set(['Layout']),
    forced: new Set(['Blink.ForcedStyleAndLayout.UpdateTime']),
    paint: new Set(['LocalFrameView::RunPaintLifecyclePhase', 'Paint', 'PaintImage']),
  };
  const totals = { script: 0, raf: 0, style: 0, layout: 0, forced: 0, paint: 0, other: 0 };
  const counts = { script: 0, raf: 0, style: 0, layout: 0, forced: 0, paint: 0, other: 0 };
  let forced = 0;
  const forcedStacks = new Map();
  let span = 0;
  let first = Infinity, last = 0;

  for (const e of events) {
    if (e.ph !== 'X' || !isMain(e) || !e.dur) continue;
    if (e.ts < first) first = e.ts;
    if (e.ts + e.dur > last) last = e.ts + e.dur;
    let bucket = 'other';
    for (const [name, set] of Object.entries(BUCKETS)) if (set.has(e.name)) { bucket = name; break; }
    totals[bucket] += e.dur / 1000;
    counts[bucket]++;
    const trace0 = e.args?.beginData?.stackTrace;
    if (e.name === 'Layout' && trace0?.length) {
      forced++;
      const top = trace0[0];
      const key = `${top?.functionName || '(anónimo)'} @ ${(top?.url || '').split('/').pop() || '?'}:${top?.lineNumber ?? '?'}`;
      forcedStacks.set(key, (forcedStacks.get(key) || 0) + 1);
    }
  }
  span = first === Infinity ? 0 : (last - first) / 1000;
  return { totals, counts, forced, forcedStacks: [...forcedStacks.entries()].sort((a, b) => b[1] - a[1]), spanMs: span };
}

/* Perfil de CPU: tiempo propio por función (no tiempo total, que contabiliza
   varias veces las llamadas anidadas). */
function analyzeProfile(profile) {
  if (!profile?.nodes?.length) return { rows: [], totalUs: 0, ownUs: 0, parentOf: new Map(), byId: new Map() };
  const byId = new Map(profile.nodes.map((n) => [n.id, n]));
  const parentOf = new Map();
  for (const n of profile.nodes) for (const c of n.children || []) parentOf.set(c, n.id);
  const self = new Map();
  let total = 0;
  for (let i = 0; i < profile.samples.length; i++) {
    const dt = profile.timeDeltas[i] || 0;
    if (dt <= 0 || dt > 50000) continue;          // el primer delta y las pausas no son trabajo
    total += dt;
    self.set(profile.samples[i], (self.get(profile.samples[i]) || 0) + dt);
  }
  const grouped = new Map();
  let own = 0;
  for (const [id, us] of self) {
    const cf = byId.get(id)?.callFrame || {};
    const url = cf.url || '';
    const isOwn = /\/(js|css)\//.test(url) && !/vendor|three\.module/.test(url);
    if (isOwn) own += us;
    const key = `${cf.functionName || '(anónimo)'}|${(url.split('/').pop() || '(nativo)')}|${cf.lineNumber ?? -1}`;
    const rec = grouped.get(key) || { us: 0, fn: cf.functionName || '(anónimo)', file: url.split('/').pop() || '(nativo)', line: cf.lineNumber ?? -1, own: isOwn };
    rec.us += us;
    grouped.set(key, rec);
  }
  return {
    rows: [...grouped.values()].sort((a, b) => b.us - a.us),
    totalUs: total,
    ownUs: own,
    byId, parentOf, selfById: self,
  };
}

/* De quién viene el tiempo: sube por el árbol del perfil hasta la raíz. Sin
   esto sabemos que `getShaderInfoLog` es caro, pero no quién lo pide. */
function stackOf(prof, fnName) {
  const node = [...prof.byId.values()].find((n) => (n.callFrame?.functionName || '(anónimo)') === fnName
    && (prof.selfById.get(n.id) || 0) > 0);
  if (!node) return [];
  const out = [];
  let id = node.id;
  while (id != null && out.length < 8) {
    const n = prof.byId.get(id);
    const cf = n?.callFrame || {};
    out.push(`${cf.functionName || '(anónimo)'} @ ${(cf.url || '').split('/').pop() || 'nativo'}:${(cf.lineNumber ?? -1) + 1}`);
    id = prof.parentOf.get(id);
  }
  return out;
}

const scrollFrames = analyzeFrames(scrollPhase.perf.frames);
const idleFrames = analyzeFrames(idlePhase.perf.frames);
const scrollTrace = analyzeTrace(scrollPhase.trace);
const idleTrace = analyzeTrace(idlePhase.trace);
const scrollProfile = analyzeProfile(scrollPhase.profile);
const idleProfile = analyzeProfile(idlePhase.profile);

const scrollSec = scrollPhase.wallMs / 1000;
const rate = (ms) => ms / Math.max(scrollSec, 0.001);

/* Las lecturas de DOM que fuerzan style+layout. No aparecen como "Layout" en
   la traza con su pila (Chrome solo la adjunta con DevTools enganchado), pero
   en el perfil de CPU sí están, con su función llamadora: es la forma de
   saber QUIÉN las hace. */
const LAYOUT_READS = /^(getBoundingClientRect|getComputedStyle|offsetTop|offsetLeft|offsetWidth|offsetHeight|offsetHeight|clientWidth|clientHeight|clientTop|scrollTop|scrollHeight|scrollWidth|scrollTo|scrollBy|scrollY|scrollX|innerWidth|innerHeight|getClientRects|focus|innerText)$/;

function layoutReads(prof) {
  const out = [];
  for (const n of prof.byId.values()) {
    const name = n.callFrame?.functionName || '';
    const us = prof.selfById.get(n.id) || 0;
    if (!us || !LAYOUT_READS.test(name)) continue;
    let id = prof.parentOf.get(n.id);
    const callers = [];
    while (id != null && callers.length < 4) {
      const cf = prof.byId.get(id)?.callFrame || {};
      callers.push(`${cf.functionName || '(anónimo)'} @ ${(cf.url || '').split('/').pop() || 'nativo'}:${(cf.lineNumber ?? -1) + 1}`);
      id = prof.parentOf.get(id);
    }
    out.push({ name, us, callers: callers.join(' ← ') });
  }
  return out.sort((a, b) => b.us - a.us);
}

/* ──────────────────────────── informe ──────────────────────────── */

const ms = (v) => (v >= 100 ? v.toFixed(0) : v.toFixed(1));
console.log('');
console.log(`  SCROLL${QUICK ? ' (solo bajada)' : ' · ida y vuelta'} · ${W}x${H} · ${scrollSec.toFixed(1)} s de recorrido · ${scrollFrames.count} frames`);
console.log('  ' + '─'.repeat(76));
console.log('  sección                     frames   p50ms   p95ms   máxms  >50ms');
for (const s of doc.sections) {
  const d = scrollFrames.bySection.get(s.id);
  if (!d || !d.length) { console.log(`  ${s.id.padEnd(26)} ${'—'.padStart(6)}`); continue; }
  const jank = d.filter((x) => x > 50).length;
  console.log(`  ${s.id.padEnd(26)} ${String(d.length).padStart(6)} ${ms(pct(d, 50)).padStart(7)} ${ms(pct(d, 95)).padStart(7)} ${ms(Math.max(...d)).padStart(7)} ${String(jank).padStart(6)}`);
}
console.log('  ' + '─'.repeat(76));
console.log(`  global: p50 ${ms(scrollFrames.p50)} ms · p95 ${ms(scrollFrames.p95)} ms · máx ${ms(scrollFrames.max)} ms`
  + ` · frames >50 ms: ${scrollFrames.jank} (${scrollFrames.jankRate.toFixed(1)}%)`);
console.log('  (frames en SwiftShader: informativos; una GPU real rinde más. Lo comparable es lo de abajo.)');

const longTasks = [...scrollPhase.perf.tasks, ...idlePhase.perf.tasks].sort((a, b) => b[1] - a[1]);
console.log('');
console.log('  HILO PRINCIPAL · durante el scroll');
console.log('  ' + '─'.repeat(76));
console.log(`  scripting      ${ms(scrollTrace.totals.script).padStart(8)} ms   (${ms(rate(scrollTrace.totals.script))} ms por segundo de scroll)`);
console.log(`  estilo         ${ms(scrollTrace.totals.style).padStart(8)} ms   (${ms(rate(scrollTrace.totals.style))} ms/s · ${scrollTrace.counts.style} recálculos)`);
console.log(`  layout         ${ms(scrollTrace.totals.layout).padStart(8)} ms   (${ms(rate(scrollTrace.totals.layout))} ms/s · ${scrollTrace.counts.layout} layouts)`);
console.log(`  paint          ${ms(scrollTrace.totals.paint).padStart(8)} ms   (${scrollTrace.counts.paint} eventos)`);
console.log(`  bucle rAF        ${ms(scrollTrace.totals.raf).padStart(8)} ms   (${ms(rate(scrollTrace.totals.raf))} ms/s · ${scrollTrace.counts.raf} frames: Lenis + GSAP + animate)`);
console.log(`  reflujos forzados        ${String(scrollTrace.forced + scrollTrace.counts.forced).padStart(4)}   (style+layout que el JS provoca leyendo medidas con el estilo sucio)`);
console.log(`      por traza: ${scrollTrace.counts.forced} × Blink.ForcedStyleAndLayout (${ms(scrollTrace.totals.forced)} ms) · con pila: ${scrollTrace.forced}`);
for (const [stack, n] of scrollTrace.forcedStacks.slice(0, 5)) console.log(`      ${String(n).padStart(4)}×  ${stack}`);
console.log(`  tareas largas (>50 ms)   ${String(longTasks.length).padStart(4)}   peor: ${longTasks.length ? ms(longTasks[0][1]) + ' ms' : '—'}`);
for (const t of longTasks.slice(0, 5)) console.log(`      ${ms(t[1]).padStart(7)} ms  en ${sectionAt(scrollPhase.perf.frames.reduce((best, f) => (Math.abs(f[0] - t[0]) < Math.abs(best[0] - t[0]) ? f : best), [Infinity, 0, 0])[2])} · ${t[2] || 'self'}`);
console.log(`  draw calls por frame     ${scrollFrames.draws.length ? (scrollFrames.draws.reduce((a, b) => a + b, 0) / scrollFrames.draws.length).toFixed(1) : '—'}`
  + ` (máx ${scrollFrames.draws.length ? Math.max(...scrollFrames.draws) : 0})`);
const gl = scrollPhase.perf.gl || {};
const linkFrames = scrollPhase.perf.frames.filter((f) => f[4] > 0).length;
console.log(`  programas compilados     ${String(gl.links ?? 0).padStart(4)}   (debería ser 0 tras el arranque; ${linkFrames} frames con compilación)`
  + ` · createProgram ${gl.creates ?? 0} · deleteProgram ${gl.deletes ?? 0} · getShaderInfoLog ${gl.infoLogs ?? 0}`);

console.log('');
console.log('  REPOSO · la escena animada sin tocar nada');
console.log('  ' + '─'.repeat(76));
const idleSec = Math.max(idlePhase.wallMs / 1000, 0.001);
console.log(`  frames ${idleFrames.count} · p50 ${ms(idleFrames.p50)} ms · p95 ${ms(idleFrames.p95)} ms · máx ${ms(idleFrames.max)} ms`
  + ` · scripting ${(idleTrace.totals.script / idleSec).toFixed(1)} ms/s · layout ${(idleTrace.totals.layout / idleSec).toFixed(1)} ms/s`
  + ` · reflujos ${idleTrace.forced}`);

function printProfile(title, prof) {
  if (!prof.rows.length) return;
  console.log('');
  console.log(`  ${title} (perfil de CPU, tiempo propio)`);
  console.log('  ' + '─'.repeat(76));
  for (const r of prof.rows.slice(0, 18)) {
    const share = ((r.us / prof.totalUs) * 100).toFixed(1);
    const where = r.line >= 0 ? `${r.file}:${r.line + 1}` : r.file;
    console.log(`  ${(r.us / 1000).toFixed(1).padStart(8)} ms ${share.padStart(5)}%  ${r.fn.padEnd(28).slice(0, 28)} ${where}${r.own ? '  ← nuestro' : ''}`);
  }
  console.log(`  código propio (js/ y css/ sin vendor): ${((prof.ownUs / prof.totalUs) * 100).toFixed(1)}% del tiempo de JS`
    + ` · hilo principal ocupado ${((prof.totalUs - (prof.rows.find((r) => r.fn === '(idle)')?.us || 0)) / 1000).toFixed(0)} ms`);
  const busy = prof.totalUs - (prof.rows.find((r) => r.fn === '(idle)')?.us || 0);
  const worst = prof.rows.find((r) => r.fn !== '(idle)');
  if (worst && busy > 0) {
    console.log(`  la función más cara se llama desde:`);
    for (const line of stackOf(prof, worst.fn)) console.log(`      ${line}`);
  }
}
printProfile('FUNCIONES MÁS CARAS AL HACER SCROLL', scrollProfile);

const reads = layoutReads(scrollProfile);
if (reads.length) {
  console.log('');
  console.log('  LECTURAS DE LAYOUT DURANTE EL SCROLL (cada una puede forzar un reflujo)');
  console.log('  ' + '─'.repeat(76));
  for (const r of reads.slice(0, 8)) console.log(`  ${(r.us / 1000).toFixed(1).padStart(8)} ms  ${r.name.padEnd(22)} ${r.callers}`);
}
printProfile('FUNCIONES MÁS CARAS EN REPOSO', idleProfile);

/* ──────────────────────────── veredicto ──────────────────────────── */

const failures = [];
const check = (label, value, max, unit = 'ms') => {
  const ok = value <= max;
  console.log(`  ${ok ? '✓' : '✗'} ${label.padEnd(34)} ${ms(value).padStart(8)} ${unit}  (máx ${max} ${unit})`);
  if (!ok) failures.push(label);
};
console.log('');
console.log(`  arranque: cortina arriba a los ${curtainMs < 0 ? '—' : curtainMs + ' ms'} (el precalentado paga aquí lo que antes se pagaba en el scroll)`);
console.log('');
console.log('  PRESUPUESTOS');
console.log('  ' + '─'.repeat(76));
check('scripting por segundo', rate(scrollTrace.totals.script), BUDGET.scriptMsPerSec);
check('estilo por segundo', rate(scrollTrace.totals.style), BUDGET.styleMsPerSec);
check('layout por segundo', rate(scrollTrace.totals.layout), BUDGET.layoutMsPerSec);
check('reflujos forzados', scrollTrace.forced, BUDGET.forcedReflows, 'uds');
check('peor tarea larga', longTasks.length ? longTasks[0][1] : 0, BUDGET.longTaskMs);
/* Los frames por encima de 50 ms se INFORMAN pero no suspenden: en este
   entorno el raster es por software y el número lo domina SwiftShader, no el
   código de la página. En una GPU real no significa lo mismo. */
console.log(`  · frames >50 ms por cada 100       ${scrollFrames.jankRate.toFixed(1)}   (informativo: raster por software)`);
check('arranque hasta la cortina', curtainMs < 0 ? 1e9 : curtainMs, BUDGET.curtainMs);

console.log('');
console.log('  PRECALENTADOS DE LA ESCENA');
console.log('  ' + '─'.repeat(76));
if (!warmUps.length) console.log('  ninguno (sin WebGL o la página no llegó a cargar)');
for (const w of warmUps) {
  const inside = w.at >= scrollPhase.pageStart && w.at <= scrollPhase.pageEnd;
  console.log(`  a los ${String(w.at).padStart(6)} ms · duró ${String(w.ms).padStart(6)} ms${inside ? '   ⚠ CAYÓ DENTRO DEL SCROLL: el lector lo paga como tirón' : ''}`);
}

if (errors.length) {
  console.log('\n  ERRORES DE PÁGINA:');
  [...new Set(errors)].slice(0, 8).forEach((e) => console.log('   ', e));
}

const result = {
  viewport: `${W}x${H}`, scrollSeconds: Number(scrollSec.toFixed(2)), curtainMs,
  frames: { p50: scrollFrames.p50, p95: scrollFrames.p95, max: scrollFrames.max, jank: scrollFrames.jank, jankRate: scrollFrames.jankRate },
  mainThreadPerSec: {
    script: Number(rate(scrollTrace.totals.script).toFixed(1)),
    style: Number(rate(scrollTrace.totals.style).toFixed(1)),
    layout: Number(rate(scrollTrace.totals.layout).toFixed(1)),
  },
  forcedReflows: scrollTrace.forced,
  worstLongTaskMs: longTasks.length ? longTasks[0][1] : 0,
  idle: { p50: idleFrames.p50, p95: idleFrames.p95, scriptMsPerSec: Number((idleTrace.totals.script / idleSec).toFixed(1)) },
  topFunctions: scrollProfile.rows.slice(0, 10).map((r) => ({ fn: r.fn, file: r.file, ms: Number((r.us / 1000).toFixed(1)) })),
};
if (JSON_OUT) {
  fs.mkdirSync(path.dirname(JSON_OUT), { recursive: true });
  fs.writeFileSync(JSON_OUT, JSON.stringify(result, null, 2));
  console.log(`\n  resultado en ${path.relative(ROOT, JSON_OUT)}`);
}

if (errors.length) { console.log('\n  ✗ hay errores de página.'); process.exit(1); }
if (CHECK_BUDGET && failures.length) {
  console.log(`\n  ✗ ${failures.length} presupuesto(s) superados: ${failures.join(', ')}`);
  process.exit(1);
}
console.log('\n  ✓ dentro de presupuestos.');
process.exit(0);
