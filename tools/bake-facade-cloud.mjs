/* bake-facade-cloud.mjs — hornea la fachada a una nube de puntos compacta.
 *
 * POR QUÉ EXISTE
 *   Puerta_particulas/entrada_v3.glb es un modelo excelente —114 372 triángulos,
 *   50 piezas, faroles, ventanas y la inscripción en relieve— pero pesa 3,5 MB.
 *   Descargarlo en el navegador tiraría por la borda los 328 KB que costó
 *   ahorrar en la auditoría, y encima solo para tirar la malla a la basura:
 *   de todo ese detalle la escena únicamente necesita N puntos.
 *
 *   Así que el muestreo se hace UNA vez, aquí, y al navegador viaja solo el
 *   resultado. El GLB se queda en el repo como fuente (igual que el .blend),
 *   nunca se sirve.
 *
 * QUÉ PRODUCE
 *   Un binario de posiciones cuantizadas a 16 bits: 6 bytes por punto en vez
 *   de los 12 de un Float32Array. La cuantización reparte 65 536 pasos sobre
 *   los 37 m de fachada, o sea 0,6 mm por paso — tres órdenes de magnitud por
 *   debajo de lo que un punto ocupa en pantalla, así que es invisible.
 *
 *   Cabecera de 32 bytes con el número de puntos y la caja contenedora (los
 *   valores originales en metros), de modo que el cliente reconstruye las
 *   coordenadas reales con una multiplicación.
 *
 * EL MUESTREO SESGA A LAS ARISTAS
 *   Repartir los puntos por área uniformemente produce niebla: las superficies
 *   grandes y planas —el muro, la vereda— se llevan casi todos, y lo que hace
 *   reconocible al edificio (jambas, molduras, capiteles, el contorno de las
 *   hojas) se queda sin describir. Lo que dibuja una silueta son sus ARISTAS.
 *
 * USO
 *   node tools/bake-facade-cloud.mjs
 *   node tools/bake-facade-cloud.mjs --n=9000 --out=data/facade-cloud.bin
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(
  process.argv.slice(2).filter((a) => a.startsWith('--')).map((a) => {
    const [k, v = 'true'] = a.replace(/^--/, '').split('=');
    return [k, v];
  })
);

const SRC = path.resolve(ROOT, args.src || 'Puerta_particulas/entrada_v3.glb');
const OUT = path.resolve(ROOT, args.out || 'data/facade-cloud.bin');
const N = Number(args.n || 9000);

/* Proporción de puntos que caen sobre aristas en vez de sobre la superficie.
   Medido a ojo en el render: por debajo de ~0,5 el contorno se difumina y el
   edificio se lee como una mancha; por encima de ~0,85 desaparecen los planos
   y queda un alambrado sin cuerpo. */
const EDGE_RATIO = 0.72;

/* Piezas que NO entran en la nube. La vereda es un plano enorme a los pies del
   edificio: por área se llevaría una porción desproporcionada de los puntos
   para dibujar suelo vacío. */
const SKIP = new Set(['Vereda']);

/* Generador determinista (mulberry32). Con Math.random la fachada cambiaría de
   forma en cada horneado y las capturas de regresión no valdrían nada. */
function makeRandom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── leer el GLB (JSON + búfer binario) ─────────────────────────────────── */
const raw = fs.readFileSync(SRC);
if (raw.readUInt32LE(0) !== 0x46546C67) throw new Error('no es un GLB');
const jsonLen = raw.readUInt32LE(12);
const gltf = JSON.parse(raw.subarray(20, 20 + jsonLen).toString('utf8'));
const binStart = 20 + jsonLen + 8;

const COMP = { 5120: [Int8Array, 1], 5121: [Uint8Array, 1], 5122: [Int16Array, 2],
  5123: [Uint16Array, 2], 5125: [Uint32Array, 4], 5126: [Float32Array, 4] };
const NUM = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };

function readAccessor(i) {
  const acc = gltf.accessors[i];
  const view = gltf.bufferViews[acc.bufferView];
  const [Ctor, size] = COMP[acc.componentType];
  const n = NUM[acc.type];
  const offset = (view.byteOffset || 0) + (acc.byteOffset || 0);
  const stride = view.byteStride;
  if (stride && stride !== size * n) {
    /* Entrelazado: hay que saltar de vértice en vértice. */
    const out = new Ctor(acc.count * n);
    for (let v = 0; v < acc.count; v++) {
      const base = binStart + offset + v * stride;
      for (let c = 0; c < n; c++) out[v * n + c] = new Ctor(raw.buffer, base + c * size, 1)[0];
    }
    return out;
  }
  return new Ctor(raw.buffer.slice(binStart + offset, binStart + offset + acc.count * n * size));
}

/* Los nodos del GLB pueden traer traslación propia (las hojas tienen el origen
   en la bisagra), así que hay que llevar cada vértice a coordenadas de mundo. */
const nodeOf = new Map();
(gltf.nodes || []).forEach((nd, i) => { if (nd.mesh !== undefined) nodeOf.set(nd.mesh, { nd, i }); });

const tris = [];
let skipped = 0;
gltf.meshes.forEach((mesh, mi) => {
  const info = nodeOf.get(mi);
  const name = info?.nd?.name || mesh.name || '?';
  if (SKIP.has(name)) { skipped++; return; }
  const t = info?.nd?.translation || [0, 0, 0];
  for (const prim of mesh.primitives) {
    const pos = readAccessor(prim.attributes.POSITION);
    const idx = prim.indices !== undefined ? readAccessor(prim.indices) : null;
    const count = idx ? idx.length : pos.length / 3;
    for (let i = 0; i < count; i += 3) {
      const a = (idx ? idx[i] : i) * 3, b = (idx ? idx[i + 1] : i + 1) * 3, c = (idx ? idx[i + 2] : i + 2) * 3;
      const ax = pos[a] + t[0], ay = pos[a + 1] + t[1], az = pos[a + 2] + t[2];
      const bx = pos[b] + t[0], by = pos[b + 1] + t[1], bz = pos[b + 2] + t[2];
      const cx = pos[c] + t[0], cy = pos[c + 1] + t[1], cz = pos[c + 2] + t[2];
      const ux = bx - ax, uy = by - ay, uz = bz - az;
      const vx = cx - ax, vy = cy - ay, vz = cz - az;
      const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      const nl = Math.hypot(nx, ny, nz);
      if (nl <= 1e-12) continue;
      /* CULLING POR ORIENTACIÓN
         La cámara mira la fachada desde +Z. Las caras que miran hacia atrás
         nunca se ven en un render sólido, pero una nube de puntos no oculta
         nada: sus puntos se superpondrían a los del frente y emborronarían el
         relieve. El umbral es tolerante para conservar cantos y caras muy
         oblicuas, que sí aportan contorno. */
      if (nz / nl < -0.35) continue;
      tris.push({ ax, ay, az, bx, by, bz, cx, cy, cz, area: 0.5 * nl });
    }
  }
});

if (!tris.length) throw new Error('no se recogió ningún triángulo');

/* Suma acumulada de áreas + búsqueda binaria: un triángulo grande recibe
   proporcionalmente más puntos, que es lo que hace que la densidad se vea
   pareja en pantalla. */
const cum = new Float64Array(tris.length);
let acc = 0;
for (let i = 0; i < tris.length; i++) { acc += tris[i].area; cum[i] = acc; }

const rand = makeRandom(0x5EED);
const pick = (r) => {
  let lo = 0, hi = cum.length - 1;
  const target = r * cum[hi];
  while (lo < hi) { const mid = (lo + hi) >> 1; if (cum[mid] < target) lo = mid + 1; else hi = mid; }
  return lo;
};

const pts = new Float32Array(N * 3);
for (let i = 0; i < N; i++) {
  const t = tris[pick(rand())];
  let x, y, z;
  if (rand() < EDGE_RATIO) {
    const side = (rand() * 3) | 0;
    let x0, y0, z0, x1, y1, z1;
    if (side === 0) { x0 = t.ax; y0 = t.ay; z0 = t.az; x1 = t.bx; y1 = t.by; z1 = t.bz; }
    else if (side === 1) { x0 = t.bx; y0 = t.by; z0 = t.bz; x1 = t.cx; y1 = t.cy; z1 = t.cz; }
    else { x0 = t.cx; y0 = t.cy; z0 = t.cz; x1 = t.ax; y1 = t.ay; z1 = t.az; }
    const u = rand();
    x = x0 + (x1 - x0) * u; y = y0 + (y1 - y0) * u; z = z0 + (z1 - z0) * u;
  } else {
    /* Baricéntricas con raíz: reparto uniforme por área dentro del triángulo. */
    const su = Math.sqrt(rand()), v = rand();
    const b0 = 1 - su, b1 = su * (1 - v), b2 = su * v;
    x = t.ax * b0 + t.bx * b1 + t.cx * b2;
    y = t.ay * b0 + t.by * b1 + t.cy * b2;
    z = t.az * b0 + t.bz * b1 + t.cz * b2;
  }
  pts[i * 3] = x; pts[i * 3 + 1] = y; pts[i * 3 + 2] = z;
}

const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
for (let i = 0; i < pts.length; i += 3) {
  for (let c = 0; c < 3; c++) {
    if (pts[i + c] < mn[c]) mn[c] = pts[i + c];
    if (pts[i + c] > mx[c]) mx[c] = pts[i + c];
  }
}

/* CABECERA DE 44 BYTES
   magia (4) + versión (4) + nº de puntos (4) + mínimo xyz (12) + tamaño xyz
   (12) = 36, redondeado a 44 para que el bloque de posiciones quede alineado.
   Con el mínimo y el tamaño el cliente reconstruye los metros originales con
   una multiplicación. */
const HEAD = 44;
const head = Buffer.alloc(HEAD);
head.write('FCLD', 0, 'ascii');
head.writeUInt32LE(1, 4);
head.writeUInt32LE(N, 8);
for (let c = 0; c < 3; c++) {
  head.writeFloatLE(mn[c], 12 + c * 4);
  head.writeFloatLE((mx[c] - mn[c]) || 1e-6, 24 + c * 4);
}

const quant = new Uint16Array(N * 3);
for (let i = 0; i < N; i++) {
  for (let c = 0; c < 3; c++) {
    const span = (mx[c] - mn[c]) || 1e-6;
    quant[i * 3 + c] = Math.round(((pts[i * 3 + c] - mn[c]) / span) * 65535);
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, Buffer.concat([head, Buffer.from(quant.buffer)]));

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const gz = (await import('node:zlib')).gzipSync(fs.readFileSync(OUT)).length;
console.log(`Fuente     ${path.relative(ROOT, SRC)}  (${kb(fs.statSync(SRC).size)})`);
console.log(`Triángulos ${tris.length.toLocaleString('es')} usables · ${skipped} pieza(s) descartada(s)`);
console.log(`Caja       X ${mn[0].toFixed(2)}..${mx[0].toFixed(2)} · Y ${mn[1].toFixed(2)}..${mx[1].toFixed(2)} · Z ${mn[2].toFixed(2)}..${mx[2].toFixed(2)} (m)`);
console.log(`Salida     ${path.relative(ROOT, OUT)}  ${N.toLocaleString('es')} puntos · ${kb(fs.statSync(OUT).size)} · ${kb(gz)} con gzip`);
const paso = ((mx[0] - mn[0]) / 65535 * 1000).toFixed(2);
console.log(`Precisión  ${paso} mm por paso de cuantización`);
