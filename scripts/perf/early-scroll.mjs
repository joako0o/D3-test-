/* early-scroll.mjs — ¿por qué se arrastra el PRINCIPIO de la página?
 *
 * POR QUÉ EXISTE
 *   `npm run perf` mide el documento ENTERO de ida y vuelta y promedia. El
 *   síntoma reportado por lectores con equipos modestos es otro y más
 *   concreto: "las primeras fases van lentas" — portada, acercamiento a la
 *   puerta y cruce del umbral. Un promedio de 61 s de recorrido esconde
 *   exactamente eso.
 *
 *   Además, una hipótesis hay que poder FALSARLA. Este script no se limita a
 *   medir: corre la MISMA pasada de scroll con variantes que apagan un
 *   sospechoso cada vez, y compara. Si apagar algo no mejora, ese algo no es
 *   el cuello de botella, por muy plausible que suene.
 *
 * VARIANTES (`--only=base,notriggers,…` para elegir)
 *   base         tal cual está la página
 *   notriggers   se desactivan todos los ScrollTrigger (sin desmontar Lenis)
 *   no3d         el canvas WebGL deja de renderizar (render() en blanco)
 *   nolenis      Lenis se detiene: scroll nativo, ScrollTrigger normal
 *   nocss        se apagan TODOS los efectos de pintado de golpe
 *   nonoise      solo el grano (body::after, un SVG de turbulencia tileado)
 *   noambient    solo el halo dorado (body::before, dos gradientes fixed)
 *   nobackdrop   solo los backdrop-filter de los paneles
 *   nobgtween      el fondo html/body deja de animarse por sección
 *   noambienttween la variable --ambient-alpha deja de animarse
 *   norootwrites   los dos anteriores a la vez
 *
 * QUÉ IMPRIME
 *   Por variante: el coste del HILO PRINCIPAL durante la pasada (scripting,
 *   recálculo de estilo, layout — de los contadores de Chrome, no de la
 *   separación entre frames) y, como dato informativo, los frames.
 *
 *   OJO CON LOS FRAMES. La primera versión de esta sonda comparaba las
 *   variantes por p50 de separación entre frames y llegó a conclusiones
 *   CONTRADICTORIAS entre ejecuciones idénticas: dos pasadas `base` seguidas
 *   dieron 96 ms y 164 ms, y una misma variante pasó de "−70 %" a "+4 %".
 *   Aquí se pinta con SwiftShader (rasterizado por software, sin GPU) y ese
 *   ruido se come cualquier diferencia real. Los contadores de CPU sí son
 *   estables, y por eso son los que mandan en el veredicto; los frames se
 *   imprimen en gris, como contexto.
 *
 *   Cada variante se mide REPS veces, intercaladas (A,B,C,A,B,C…), y se
 *   informa la MEDIANA. Intercalar importa: si se midieran seguidas, el
 *   calentamiento del proceso favorecería sistemáticamente a la última.
 *
 * USO
 *   npm start                       # servidor en otra terminal
 *   node scripts/perf/early-scroll.mjs --cpu=4
 *   node scripts/perf/early-scroll.mjs --cpu=6 --only=base,notriggers
 *
 * LÍMITE (el mismo de siempre)
 *   Chromium pinta con SwiftShader: los FPS absolutos no son los de una GPU
 *   real. Lo comparable es la DIFERENCIA entre variantes de la misma pasada.
 */

import { parseArgs, sleep, launchChromium } from '../lib/chromium.mjs';

const args = parseArgs();
const W = Number(args.w || 1440);
const H = Number(args.h || 900);
const ORIGIN = args.origin || 'http://localhost:8000';
const CPU = Number(args.cpu || 4);
const STEP_MS = Number(args.stepMs || 60);
const SETTLE = Number(args.settleMs || 9000);
const REPS = Number(args.reps || 3);
const ALL = [
  'base',
  'notriggers',
  'no3d',
  'nolenis',
  'nocss',
  'nonoise',
  'noambient',
  'nobackdrop',
  /* Sospechosos concretos dentro de ScrollTrigger: ambos escriben en la RAÍZ
     del documento en cada frame (color de fondo de html/body y la variable
     --ambient-alpha), que es la forma más cara de ensuciar el estilo porque
     invalida el árbol entero. */
  'nobgtween',
  'noambienttween',
  'norootwrites',
];
const ONLY = (args.only ? String(args.only).split(',') : ALL).filter((v) => ALL.includes(v));

const pct = (arr, p) => {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))];
};
const f1 = (n) => n.toFixed(1).padStart(6);

const { browser, page } = await launchChromium({ width: W, height: H });
const cdp = await page.createCDPSession();

await page.evaluateOnNewDocument(() => {
  window.__early = { frames: [] };
  let last = performance.now();
  (function loop() {
    const now = performance.now();
    window.__early.frames.push([now - last, window.scrollY]);
    last = now;
    requestAnimationFrame(loop);
  })();
  window.__early.reset = () => {
    window.__early.frames.length = 0;
  };
});

console.log(`Abriendo ${ORIGIN} a ${W}x${H} · CPU x${CPU}…`);
await page.goto(`${ORIGIN}/index.html`, { waitUntil: 'networkidle0', timeout: 90000 });
await page.evaluate(() => window.scrollTo(0, 0));
await sleep(SETTLE);

/* Los tramos se leen del documento real: si mañana cambian las alturas, la
   sonda sigue midiendo las mismas SECCIONES y no unos píxeles fijos. */
const zones = await page.evaluate(() => {
  const ids = ['hero', 'stageObjective', 'stageRoom'];
  return ids
    .map((id) => document.getElementById(id) || document.querySelector('.hero'))
    .filter(Boolean)
    .map((el) => {
      const r = el.getBoundingClientRect();
      return { id: el.id || 'hero', top: Math.round(r.top + window.scrollY), h: Math.round(r.height) };
    });
});
const endY = zones[zones.length - 1].top + zones[zones.length - 1].h;
console.log(`Tramos: ${zones.map((z) => `${z.id} @${z.top}+${z.h}`).join(' · ')} → hasta ${endY} px\n`);

await cdp.send('Performance.enable');
if (CPU > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: CPU });

const VARIANTS = {
  base: { on: () => {}, off: () => {} },
  notriggers: {
    on: () =>
      page.evaluate(() => {
        window.__st = window.ScrollTrigger.getAll();
        window.__st.forEach((t) => t.disable(false));
      }),
    off: () => page.evaluate(() => window.__st.forEach((t) => t.enable(false))),
  },
  no3d: {
    on: () =>
      page.evaluate(() => {
        const c = document.getElementById('canvas');
        if (c) c.style.display = 'none';
        const gl = window.WebGLRenderingContext?.prototype;
        window.__drawOff = ['drawArrays', 'drawElements'].map((m) => {
          const orig = gl[m];
          Object.defineProperty(gl, m, { value: function () {}, writable: true, configurable: true });
          return [m, orig];
        });
      }),
    off: () =>
      page.evaluate(() => {
        const c = document.getElementById('canvas');
        if (c) c.style.display = '';
        const gl = window.WebGLRenderingContext?.prototype;
        window.__drawOff.forEach(([m, orig]) =>
          Object.defineProperty(gl, m, { value: orig, writable: true, configurable: true })
        );
      }),
  },
  /* `stop()` NO sirve aquí: congela el scroll y la pasada no avanza (la
     primera versión de esta sonda se colgó por eso). `destroy()` devuelve el
     scroll nativo del navegador, que es justo la comparación que interesa:
     ScrollTrigger sigue escuchando el evento `scroll` por su cuenta. */
  nolenis: {
    on: () => page.evaluate(() => window.lenis?.destroy?.()),
    off: () => {},
    dirty: true,
  },
  nocss: {
    on: () =>
      page.evaluate(() => {
        const s = document.createElement('style');
        s.id = '__nocss';
        s.textContent = `body::before, body::after { display: none !important; }
          * { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }`;
        document.head.appendChild(s);
      }),
    off: () => page.evaluate(() => document.getElementById('__nocss')?.remove()),
  },
  nonoise: {
    on: () =>
      page.evaluate(() => {
        const s = document.createElement('style');
        s.id = '__v';
        s.textContent = 'body::after { display: none !important; }';
        document.head.appendChild(s);
      }),
    off: () => page.evaluate(() => document.getElementById('__v')?.remove()),
  },
  noambient: {
    on: () =>
      page.evaluate(() => {
        const s = document.createElement('style');
        s.id = '__v';
        s.textContent = 'body::before { display: none !important; }';
        document.head.appendChild(s);
      }),
    off: () => page.evaluate(() => document.getElementById('__v')?.remove()),
  },
  /* Los tres apagan triggers por ID (ver js/main.js), no por selector: así se
     desactiva EXACTAMENTE el grupo sospechoso y todo lo demás sigue vivo. */
  nobgtween: {
    on: () =>
      page.evaluate(() => {
        window.__st = window.ScrollTrigger.getAll().filter((t) => String(t.vars.id || '').startsWith('bg'));
        window.__st.forEach((t) => t.disable(false));
      }),
    off: () => page.evaluate(() => window.__st.forEach((t) => t.enable(false))),
  },
  noambienttween: {
    on: () =>
      page.evaluate(() => {
        window.__st = window.ScrollTrigger.getAll().filter((t) => String(t.vars.id || '').startsWith('ambient'));
        window.__st.forEach((t) => t.disable(false));
      }),
    off: () => page.evaluate(() => window.__st.forEach((t) => t.enable(false))),
  },
  norootwrites: {
    on: () =>
      page.evaluate(() => {
        window.__st = window.ScrollTrigger.getAll().filter((t) => /^(bg|ambient)/.test(String(t.vars.id || '')));
        window.__st.forEach((t) => t.disable(false));
      }),
    off: () => page.evaluate(() => window.__st.forEach((t) => t.enable(false))),
  },
  nobackdrop: {
    on: () =>
      page.evaluate(() => {
        const s = document.createElement('style');
        s.id = '__v';
        s.textContent = '* { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }';
        document.head.appendChild(s);
      }),
    off: () => page.evaluate(() => document.getElementById('__v')?.remove()),
  },
};

async function reload() {
  await page.goto(`${ORIGIN}/index.html`, { waitUntil: 'networkidle0', timeout: 90000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(SETTLE);
  if (CPU > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: CPU });
}

async function pass(name) {
  await VARIANTS[name].on();
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1500);
  await page.mouse.move(Math.round(W / 2), Math.round(H / 2));
  await page.evaluate(() => window.__early.reset());
  const m0 = await metrics();

  /* Tope duro de impulsos y detector de atasco: una variante puede dejar la
     página sin poder desplazarse (pasó con `lenis.stop()`), y sin esto el
     bucle gira para siempre hasta que el navegador se cae. */
  const step = Math.round(H * 0.35);
  const maxSteps = Math.ceil(endY / step) * 3 + 40;
  let y = 0;
  let stalled = 0;
  for (let i = 0; i < maxSteps && y < endY; i++) {
    await page.mouse.wheel({ deltaY: step });
    await sleep(STEP_MS);
    const next = await page.evaluate(() => window.scrollY);
    stalled = next > y + 1 ? 0 : stalled + 1;
    y = next;
    if (stalled >= 12) {
      console.log(`    ⚠ ${name}: el scroll no avanza (y=${y}); se corta la pasada.`);
      break;
    }
  }
  await sleep(400);
  const m1 = await metrics();
  const frames = await page.evaluate(() => window.__early.frames);
  await VARIANTS[name].off();
  await sleep(800);

  const zoneOf = (sy) => {
    for (const z of zones) if (sy >= z.top && sy < z.top + z.h) return z.id;
    return zones[0].id;
  };
  const buckets = new Map(zones.map((z) => [z.id, []]));
  const all = [];
  for (const [d, sy] of frames.slice(1)) {
    all.push(d);
    buckets.get(zoneOf(sy))?.push(d);
  }
  /* Normalizado por segundo de pasada: las variantes no tardan lo mismo en
     recorrer el tramo, así que los totales brutos no son comparables. */
  const secs = Math.max(m1.Timestamp - m0.Timestamp, 0.001);
  const cost = {
    script: ((m1.ScriptDuration - m0.ScriptDuration) / secs) * 1000,
    style: ((m1.RecalcStyleDuration - m0.RecalcStyleDuration) / secs) * 1000,
    layout: ((m1.LayoutDuration - m0.LayoutDuration) / secs) * 1000,
    task: ((m1.TaskDuration - m0.TaskDuration) / secs) * 1000,
    secs,
  };
  return { name, all, buckets, cost };
}

async function metrics() {
  const { metrics: list } = await cdp.send('Performance.getMetrics');
  return Object.fromEntries(list.map((m) => [m.name, m.value]));
}

const runs = new Map(ONLY.map((n) => [n, []]));
let first = true;
for (let rep = 0; rep < REPS; rep++) {
  for (const name of ONLY) {
    process.stdout.write(`  ${name} · vuelta ${rep + 1}/${REPS}…`);
    /* Cada pasada arranca de una página recién cargada: así una variante no
       hereda el estado que dejó la anterior (triggers desactivados, Lenis
       destruido, caché de shaders ya caliente…). */
    if (!first) await reload();
    first = false;
    runs.get(name).push(await pass(name));
    process.stdout.write(' ok\n');
  }
}
await browser.close();

const median = (a) => {
  const s2 = [...a].sort((x, y) => x - y);
  return s2.length % 2 ? s2[(s2.length - 1) / 2] : (s2[s2.length / 2 - 1] + s2[s2.length / 2]) / 2;
};
const agg = (name) => {
  const rs = runs.get(name);
  return {
    name,
    script: median(rs.map((r) => r.cost.script)),
    style: median(rs.map((r) => r.cost.style)),
    layout: median(rs.map((r) => r.cost.layout)),
    task: median(rs.map((r) => r.cost.task)),
    frameP50: median(rs.map((r) => pct(r.all, 50))),
    /* La dispersión entre repeticiones ES el dato que dice si una diferencia
       significa algo: si el rango de una variante se solapa con el de `base`,
       no hay hallazgo por mucho que las medianas difieran. */
    taskRange: [Math.min(...rs.map((r) => r.cost.task)), Math.max(...rs.map((r) => r.cost.task))],
  };
};
const summary = ONLY.map(agg);

console.log(`\n  PRIMERAS FASES · coste del hilo principal por segundo de scroll (mediana de ${REPS})`);
console.log('  ' + '─'.repeat(88));
console.log(
  `  ${'variante'.padEnd(13)}${'tarea'.padStart(9)}${'script'.padStart(9)}${'estilo'.padStart(9)}${'layout'.padStart(9)}   ${'rango tarea'.padStart(16)}${'frame p50'.padStart(12)}`
);
for (const r of summary) {
  console.log(
    `  ${r.name.padEnd(13)}${f1(r.task)}${f1(r.script)}${f1(r.style)}${f1(r.layout)}   ` +
      `${(r.taskRange[0].toFixed(0) + '–' + r.taskRange[1].toFixed(0) + ' ms').padStart(16)}${f1(r.frameP50)} ms`
  );
}

const base = summary.find((r) => r.name === 'base');
if (base && summary.length > 1) {
  console.log('\n  VEREDICTO · diferencia de coste de hilo principal contra `base`');
  console.log('  (negativo = la variante cuesta MENOS; "solapado" = sin diferencia demostrable)');
  console.log('  ' + '─'.repeat(88));
  const bRange = base.taskRange;
  for (const r of summary) {
    if (r.name === 'base') continue;
    const d = r.task - base.task;
    const overlaps = r.taskRange[0] <= bRange[1] && bRange[0] <= r.taskRange[1];
    console.log(
      `  ${r.name.padEnd(13)} ${((d >= 0 ? '+' : '') + d.toFixed(1) + ' ms/s').padStart(12)}  ` +
        `${((d / base.task) * 100).toFixed(0).padStart(4)}%   ${overlaps ? '· solapado con base: NO concluyente' : '· diferencia consistente'}`
    );
  }
}
console.log('');
