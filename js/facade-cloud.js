/* facade-cloud.js — la fachada del Banco Central como nube de puntos.
 *
 * QUÉ RESUELVE
 *   El cierre de la pieza muestra la entrada de Agustinas 1180 disuelta en
 *   partículas: cada punto es un fragmento de lo que se dijo dentro, y entre
 *   todos dibujan el edificio. Es la tesis de la pieza hecha imagen.
 *
 * DE DÓNDE SALEN LOS PUNTOS
 *   De la geometría que ya construye js/build-door.js. NO de una fotografía:
 *   una imagen daría una nube plana que se delata al mover la cámara, y
 *   además habría que licenciarla. Aquí se muestrea el modelo real, así que
 *   la nube tiene volumen y responde al paralaje.
 *
 * POR QUÉ SESGA HACIA LOS BORDES
 *   Repartir N puntos por área uniformemente produce niebla: las superficies
 *   grandes y planas (el muro) se llevan casi todos los puntos y los detalles
 *   que hacen reconocible el edificio —jambas, molduras, el contorno de las
 *   hojas, los peldaños— quedan sin describir. Lo que hace legible una silueta
 *   son sus ARISTAS. Por eso el muestreo mezcla dos fuentes:
 *
 *     · aristas de la geometría (EDGE_RATIO del total), donde el punto cae
 *       sobre el borde real de cada cara: es lo que dibuja el contorno;
 *     · superficie por área, para que los planos no queden huecos.
 *
 * COSTE
 *   Se generan en cliente al arrancar: 0 KB de descarga. En RAM son 12 bytes
 *   por punto (un Float32Array de 3 componentes).
 */
import * as THREE from 'three';

/* Proporción de puntos que van a aristas en vez de a superficie. Medido a
   ojo sobre el render: por debajo de ~0,5 el contorno se difumina y el
   edificio se lee como una mancha; por encima de ~0,8 desaparecen los planos
   y queda un alambrado sin cuerpo. */
const EDGE_RATIO = 0.78;

/* Aristas más cortas que esto (en unidades del modelo) no aportan contorno y
   sí concentran puntos en esquinas ya densas: se descartan. */
const MIN_EDGE = 0.012;

/** Área de un triángulo por el módulo del producto vectorial. */
function triArea(a, b, c) {
  const abx = b.x - a.x, aby = b.y - a.y, abz = b.z - a.z;
  const acx = c.x - a.x, acy = c.y - a.y, acz = c.z - a.z;
  const cx = aby * acz - abz * acy;
  const cy = abz * acx - abx * acz;
  const cz = abx * acy - aby * acx;
  return 0.5 * Math.sqrt(cx * cx + cy * cy + cz * cz);
}

/* Recorre las mallas visibles y devuelve sus triángulos ya en coordenadas de
   mundo. Se hace una sola vez: es la parte cara. */
/* Roles que NO entran en la nube. El vestíbulo y su luz son geometría INTERIOR:
   en el render normal quedan ocultos tras las hojas, pero un muestreo por área
   no sabe de oclusión y los vuelca encima de la fachada. El resultado era una
   caja rellena de puntos en vez de un edificio. */
const SKIP_ROLES = new Set(['interior', 'glow']);

function collectTriangles(root) {
  const tris = [];
  root.updateMatrixWorld(true);
  root.traverse((obj) => {
    if (!obj.isMesh || !obj.geometry || obj.visible === false) return;
    if (SKIP_ROLES.has(obj.userData?.role)) return;
    /* Las aristas decorativas que build-door.js añade como LineSegments no son
       mallas y no entran aquí: se muestrean sus mallas de origen. */
    const geo = obj.geometry;
    const pos = geo.attributes?.position;
    if (!pos) return;
    const index = geo.index;
    const count = index ? index.count : pos.count;
    const m = obj.matrixWorld;
    const va = new THREE.Vector3(), vb = new THREE.Vector3(), vc = new THREE.Vector3();
    for (let i = 0; i < count; i += 3) {
      const i0 = index ? index.getX(i) : i;
      const i1 = index ? index.getX(i + 1) : i + 1;
      const i2 = index ? index.getX(i + 2) : i + 2;
      va.fromBufferAttribute(pos, i0).applyMatrix4(m);
      vb.fromBufferAttribute(pos, i1).applyMatrix4(m);
      vc.fromBufferAttribute(pos, i2).applyMatrix4(m);
      const area = triArea(va, vb, vc);
      if (area <= 0) continue;
      /* CULLING POR ORIENTACIÓN
         La cámara del cierre mira la fachada de frente (desde +Z). Las caras
         traseras —el reverso del muro, el interior de los peldaños— nunca se
         ven en el render sólido, pero una nube de puntos no oculta nada: sus
         puntos se superponen a los del frente y emborronan el relieve. Se
         descartan solo las que miran de lleno hacia atrás; el umbral tolerante
         (-0,55) conserva los cantos y las caras muy oblicuas, que sí aportan
         contorno. */
      const nx = (vb.y - va.y) * (vc.z - va.z) - (vb.z - va.z) * (vc.y - va.y);
      const ny = (vb.z - va.z) * (vc.x - va.x) - (vb.x - va.x) * (vc.z - va.z);
      const nz = (vb.x - va.x) * (vc.y - va.y) - (vb.y - va.y) * (vc.x - va.x);
      const nlen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      if (nz / nlen < -0.55) continue;
      tris.push({
        ax: va.x, ay: va.y, az: va.z,
        bx: vb.x, by: vb.y, bz: vb.z,
        cx: vc.x, cy: vc.y, cz: vc.z,
        area,
      });
    }
  });
  return tris;
}

/* Búsqueda binaria sobre la suma acumulada de áreas: así un triángulo grande
   recibe proporcionalmente más puntos que uno pequeño, que es lo que hace que
   la densidad se vea pareja en pantalla. */
function pickWeighted(cumulative, r) {
  let lo = 0, hi = cumulative.length - 1;
  const target = r * cumulative[hi];
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cumulative[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/**
 * Muestrea `count` puntos sobre las mallas de `root`.
 *
 * @param {THREE.Object3D} root   Grupo ya construido (la fachada).
 * @param {number} count          Cuántos puntos generar.
 * @param {() => number} rand     Generador determinista [0,1). Se inyecta para
 *                                que la nube sea IDÉNTICA en cada carga: con
 *                                Math.random el edificio cambiaría de forma
 *                                entre recargas y las capturas de regresión
 *                                no valdrían nada.
 * @returns {Float32Array} posiciones xyz intercaladas.
 */
export function sampleFacadeCloud(root, count, rand) {
  const out = new Float32Array(count * 3);
  const tris = collectTriangles(root);
  if (!tris.length) return out;

  const cumulative = new Float64Array(tris.length);
  let acc = 0;
  for (let i = 0; i < tris.length; i++) {
    acc += tris[i].area;
    cumulative[i] = acc;
  }

  for (let i = 0; i < count; i++) {
    const t = tris[pickWeighted(cumulative, rand())];
    let x, y, z;

    if (rand() < EDGE_RATIO) {
      /* Punto SOBRE una arista: se elige un lado y se interpola. Esto es lo
         que dibuja el contorno del edificio. */
      const side = (rand() * 3) | 0;
      let x0, y0, z0, x1, y1, z1;
      if (side === 0) { x0 = t.ax; y0 = t.ay; z0 = t.az; x1 = t.bx; y1 = t.by; z1 = t.bz; }
      else if (side === 1) { x0 = t.bx; y0 = t.by; z0 = t.bz; x1 = t.cx; y1 = t.cy; z1 = t.cz; }
      else { x0 = t.cx; y0 = t.cy; z0 = t.cz; x1 = t.ax; y1 = t.ay; z1 = t.az; }
      const dx = x1 - x0, dy = y1 - y0, dz = z1 - z0;
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < MIN_EDGE) {
        x = x0; y = y0; z = z0;
      } else {
        const u = rand();
        x = x0 + dx * u; y = y0 + dy * u; z = z0 + dz * u;
      }
    } else {
      /* Punto en el INTERIOR del triángulo (coordenadas baricéntricas con la
         raíz cuadrada, que es lo que da reparto uniforme por área). */
      const u = rand(), v = rand();
      const su = Math.sqrt(u);
      const b0 = 1 - su, b1 = su * (1 - v), b2 = su * v;
      x = t.ax * b0 + t.bx * b1 + t.cx * b2;
      y = t.ay * b0 + t.by * b1 + t.cy * b2;
      z = t.az * b0 + t.bz * b1 + t.cz * b2;
    }

    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return out;
}
