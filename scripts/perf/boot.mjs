/* boot.mjs — ¿cuánto tarda esta página en RESPONDER?
 *
 * POR QUÉ EXISTE
 *   El repo ya medía el scroll (`npm run perf`), pero nadie medía el ARRANQUE,
 *   y ahí estaba el peor problema de la página: un bloque de 6,3 s de CPU en
 *   el que el navegador no atiende clics ni scroll. `perf` no podía verlo
 *   porque empieza a medir cuando la página ya cargó — justo después del
 *   congelamiento.
 *
 *   El síntoma que lo destapó: "se pega en mi otro PC al abrirlo". No era la
 *   red. En la máquina del desarrollador el bloque dura ~1,5 s y se disimula
 *   detrás de la cortina de carga; en un equipo 4x más lento son 6 s de
 *   pestaña muerta.
 *
 * QUÉ MIDE
 *   1. Hitos de navegación: primer pixel (FCP), domInteractive, DCL, load.
 *   2. Tareas largas (PerformanceObserver 'longtask'): todo lo que bloquea el
 *      hilo principal más de 50 ms, con su instante de inicio. La suma es el
 *      TBT — el tiempo real en que la página está congelada.
 *   3. Atribución por línea: un perfil por muestreo que remonta cada muestra
 *      hasta el fotograma de main.js más cercano en la pila. Esto es lo que
 *      responde "QUÉ línea cuesta 4 segundos" en vez de "el script es lento".
 *   4. Recursos más lentos, para descartar (o confirmar) que sea la red.
 *
 * POR QUÉ CON LA CPU FRENADA
 *   Medir en la máquina de desarrollo miente: el arranque cabe en el tiempo
 *   que tarda el ojo en acomodarse y el problema pasa desapercibido. El
 *   frenado por defecto (4x) aproxima un portátil de gama media, que es donde
 *   el lector real abre esto.
 *
 * USO
 *   npm start                          # el servidor, en otra terminal
 *   npm run boot                       # 1440x900, CPU 4x más lenta
 *   npm run boot -- --cpu=1            # sin frenar (máquina de desarrollo)
 *   npm run boot -- --w=390 --h=844    # móvil
 *   npm run boot -- --json=.shots/boot.json
 *   npm run boot -- --budget=false     # informa pero no suspende
 *
 * LÍMITES
 *   Chromium pinta por software (SwiftShader): el coste de GPU no es el de una
 *   máquina real. Lo que sí es fiable y comparable entre ejecuciones es el
 *   bloqueo del HILO PRINCIPAL, que es de lo que trata este script.
 */

import fs from 'node:fs';
import path from 'node:path';
import { ROOT, parseArgs, launchChromium } from '../lib/chromium.mjs';

const args = parseArgs();
const W = Number(args.w || 1440);
const H = Number(args.h || 900);
const CPU = Number(args.cpu || 4);
const ORIGIN = args.origin || 'http://localhost:8000';
const SETTLE = Number(args.settle || 6000);
const JSON_OUT = args.json ? path.resolve(ROOT, args.json) : null;
const ENFORCE = args.budget !== 'false';

/* PRESUPUESTOS (a CPU 4x)
   No son aspiracionales: son la frontera entre "arranca" y "se pegó". Una
   tarea de más de 1 s es un congelamiento que el lector nota como fallo, no
   como lentitud. Se fijan sobre el bloqueo del hilo, no sobre los FPS, porque
   el bloqueo es lo que se mide igual en cualquier máquina. */
const BUDGET = {
  tbt: 2500,        // suma de tareas largas
  longestTask: 1200, // la peor tarea, de una sola vez
};

const { browser, page } = await launchChromium({ width: W, height: H });
const client = await page.createCDPSession();

await client.send('Emulation.setCPUThrottlingRate', { rate: CPU });
await client.send('Profiler.enable');
await client.send('Profiler.setSamplingInterval', { interval: 200 });

/* El observador se instala ANTES de que exista el documento: las tareas largas
   más caras ocurren durante la evaluación de los módulos, así que registrarlas
   después de `load` sería llegar tarde a lo único que importa. */
await page.evaluateOnNewDocument(() => {
  window.__longTasks = [];
  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        window.__longTasks.push({ start: Math.round(e.startTime), dur: Math.round(e.duration) });
      }
    }).observe({ entryTypes: ['longtask'] });
  } catch { /* sin longtask API no se mide, pero no se rompe */ }
});

console.log(`Midiendo el arranque de ${ORIGIN} a ${W}x${H}, CPU x${CPU}…`);

await client.send('Profiler.start');
const wallStart = Date.now();
await page.goto(ORIGIN, { waitUntil: 'load', timeout: 180000 });
const wallLoad = Date.now() - wallStart;
await new Promise((r) => setTimeout(r, SETTLE));
const { profile } = await client.send('Profiler.stop');

const m = await page.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0] || {};
  const paints = {};
  for (const p of performance.getEntriesByType('paint')) paints[p.name] = Math.round(p.startTime);
  const res = performance.getEntriesByType('resource')
    .map((r) => ({
      name: r.name.split('/').pop().split('?')[0],
      dur: Math.round(r.duration),
      start: Math.round(r.startTime),
      kb: Math.round((r.decodedBodySize || 0) / 1024),
    }))
    .sort((a, b) => b.dur - a.dur);
  return {
    domInteractive: Math.round(nav.domInteractive || 0),
    dcl: Math.round(nav.domContentLoadedEventEnd || 0),
    load: Math.round(nav.loadEventEnd || 0),
    paints,
    resources: res,
    resourceCount: res.length,
    longTasks: window.__longTasks || [],
  };
});

/* ATRIBUCIÓN POR LÍNEA
   Un perfil plano dice "three.js es lento", que no sirve de nada. Lo útil es
   saber qué línea NUESTRA provocó ese trabajo, así que por cada muestra se
   remonta la pila hasta el primer fotograma de nuestro código. El coste queda
   atribuido a quien lo causó, no a la biblioteca que lo ejecuta. */
const byId = new Map(profile.nodes.map((n) => [n.id, n]));
const parentOf = new Map();
for (const n of profile.nodes) for (const ch of n.children || []) parentOf.set(ch, n.id);

const OWN_CODE = /\/js\/(main|build-door|figures|facade-cloud|dissolve|config)\.js|\/js\/sections\//;
const attributed = new Map();
const selfTime = new Map();
const totalSamples = profile.samples.length || 1;
const msPerSample = (profile.endTime - profile.startTime) / 1000 / totalSamples;

for (const sampleId of profile.samples) {
  const node = byId.get(sampleId);
  if (node) {
    const f = node.callFrame;
    const key = `${f.functionName || '(anónima)'} — ${(f.url || '').split('/').pop()}:${f.lineNumber + 1}`;
    selfTime.set(key, (selfTime.get(key) || 0) + 1);
  }
  let id = sampleId;
  let hops = 0;
  while (id && hops++ < 80) {
    const n = byId.get(id);
    if (!n) break;
    const f = n.callFrame;
    if (OWN_CODE.test(f.url || '')) {
      const file = (f.url || '').split('/').pop().split('?')[0];
      const key = `${file}:${f.lineNumber + 1} ${f.functionName || '(nivel superior)'}`;
      attributed.set(key, (attributed.get(key) || 0) + 1);
      break;
    }
    id = parentOf.get(id);
  }
}

const longTasks = m.longTasks.slice().sort((a, b) => b.dur - a.dur);
const tbt = m.longTasks.reduce((a, b) => a + b.dur, 0);
const longest = longTasks[0]?.dur || 0;

const line = (s) => console.log(s);
line('');
line('═══ ARRANQUE ═══');
line(`  Primer pixel (FCP)   ${m.paints['first-contentful-paint'] ?? '—'} ms`);
line(`  domInteractive       ${m.domInteractive} ms`);
line(`  DOMContentLoaded     ${m.dcl} ms`);
line(`  load                 ${m.load} ms   (reloj: ${wallLoad} ms)`);
line('');
line('═══ BLOQUEO DEL HILO PRINCIPAL ═══');
line(`  Tareas largas        ${m.longTasks.length}`);
line(`  Total bloqueado      ${tbt} ms          (presupuesto ${BUDGET.tbt} ms)`);
line(`  Peor tarea           ${longest} ms          (presupuesto ${BUDGET.longestTask} ms)`);
if (longTasks.length) {
  line('  Las peores:');
  for (const t of longTasks.slice(0, 8)) line(`    ${String(t.dur).padStart(6)} ms  empieza en +${t.start} ms`);
}
line('');
line('═══ COSTE ATRIBUIDO A NUESTRO CÓDIGO ═══');
line('  (incluye el tiempo de las bibliotecas que cada línea llama)');
for (const [k, v] of [...attributed].sort((a, b) => b[1] - a[1]).slice(0, 18)) {
  line(`  ${String(Math.round(v * msPerSample)).padStart(6)} ms  ${k}`);
}
line('');
line('═══ TIEMPO PROPIO, TODAS LAS FUENTES ═══');
for (const [k, v] of [...selfTime].sort((a, b) => b[1] - a[1]).slice(0, 10)) {
  line(`  ${String(Math.round(v * msPerSample)).padStart(6)} ms  ${k}`);
}
line('');
line('═══ RED ═══');
line(`  ${m.resourceCount} recursos`);
for (const r of m.resources.slice(0, 8)) {
  line(`  ${String(r.dur).padStart(6)} ms  ${String(r.kb).padStart(5)} KB  +${r.start} ms  ${r.name}`);
}

if (JSON_OUT) {
  fs.mkdirSync(path.dirname(JSON_OUT), { recursive: true });
  fs.writeFileSync(JSON_OUT, JSON.stringify({
    cpu: CPU, width: W, height: H, wallLoad,
    fcp: m.paints['first-contentful-paint'] ?? null,
    domInteractive: m.domInteractive, dcl: m.dcl, load: m.load,
    tbt, longest, longTasks: m.longTasks,
    attributed: Object.fromEntries([...attributed].map(([k, v]) => [k, Math.round(v * msPerSample)])),
  }, null, 2));
  line(`\nGuardado en ${path.relative(ROOT, JSON_OUT)}`);
}

await browser.close();

const failures = [];
if (tbt > BUDGET.tbt) failures.push(`bloqueo total ${tbt} ms > ${BUDGET.tbt} ms`);
if (longest > BUDGET.longestTask) failures.push(`peor tarea ${longest} ms > ${BUDGET.longestTask} ms`);

line('');
if (failures.length) {
  line('PRESUPUESTO EXCEDIDO:');
  for (const f of failures) line(`  ✗ ${f}`);
  if (ENFORCE) process.exit(1);
} else {
  line('✓ Arranque dentro de presupuesto.');
}
