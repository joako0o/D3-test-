/* Puerta del Banco Central de Chile (Agustinas 1180) — port a three.js del
   generador paramétrico `build_door (2).py` (Blender) que vive en la raíz del
   repo. Mismas dimensiones reales (metros): bronce de dos hojas de 6,2 × 3,5 m,
   escalinata de 5 peldaños, jambas/pilastras de piedra y vestíbulo interior
   con luz cálida que asoma al abrir.

   A diferencia del GLB estático, aquí las hojas cuelgan de pivotes reales
   (`Door_L_Pivot` / `Door_R_Pivot`, con `userData.openSign`), así la apertura
   se gobierna desde el scroll en main.js.

   Peso: las cajas/cilindros/toros se hornean en pocas geometrías fusionadas
   por (material, rol, pivote) → ~15 draw calls; el perlado de los paneles va
   en InstancedMesh (una llamada por hoja). */
import * as THREE from 'three';
import { mergeGeometries } from './utils/BufferGeometryUtils.js';

const DOOR_W = 3.5;
const DOOR_H = 6.2;
const LEAF_W = DOOR_W / 2;
const LEAF_T = 0.12;
const STILE = 0.20;
const STEP_RISE = 0.16;
const STEP_TREAD = 0.36;
const STEP_COUNT = 5;
const PILASTER_X = 3.35;
const PLAQUE_X = DOOR_W / 2 + 0.06 + 0.26 + 0.14;
const PLAQUE_Z = 2.35;
const LANDING_Z = STEP_RISE * STEP_COUNT;

/* ── materiales base (main.js los repinta según la etapa) ─────────────── */
function std(color, metalness, roughness, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra });
}
const MATS = {
  stone: std(0x66615a, 0.05, 0.9),
  stone_dark: std(0x4a4642, 0.05, 0.92),
  granite: std(0x2a2724, 0.1, 0.6),
  marble: std(0x8c8070, 0.05, 0.3),
  /* Dorado propio de las medallas de pared (placa y medallón): main.js no
     las repinta a piedra con el marco. */
  medal: std(0xc9973f, 1.0, 0.35),
  bronze: std(0x8a6a3c, 1.0, 0.38),
  bronze_dark: std(0x4a3820, 1.0, 0.55),
  bronze_matte: std(0x6a4e2c, 0.9, 0.6),
  glow: new THREE.MeshStandardMaterial({
    /* Ámbar profundo, no crema: con emissiveIntensity alta el naranja se
       lavaba a blanco y el panel se leía como una figura clara detrás de
       las hojas. main.js gobierna la intensidad por scroll. */
    color: 0x241105, emissive: 0xff9440, emissiveIntensity: 0.6, roughness: 1, metalness: 0,
  }),
};
/* Instancias separadas para las hojas: main.js repinta el bronce de las
   hojas (noche→oro) sin tocar el bronce del marco. */
const MATS_LEAF = {
  bronze: std(0x8a6a3c, 1.0, 0.38),
  bronze_dark: std(0x4a3820, 1.0, 0.55),
  bronze_matte: std(0x6a4e2c, 0.9, 0.6),
};

/* ── acumuladores: geo horneada por (mat|role|pivot) ──────────────────── */
export function buildCentralBankDoor() {
  const buckets = new Map();   // key -> [geometries]
  const beadSets = new Map();  // pivotKey -> [matrices]
  const pivots = {};
  /* Los hijos de un pivote se hornean en coordenadas LOCALES al pivote
     (world − pivotPos), como matrix_parent_inverse en Blender. */
  const localOf = (pivot, m) => {
    if (!pivot) return m;
    const hx = pivot === 'Door_L' ? -DOOR_W / 2 : DOOR_W / 2;
    const t = new THREE.Matrix4().makeTranslation(-hx, 0, -LANDING_Z);
    return t.multiply(m);
  };

  const key = (mat, role, pivot) => `${mat}|${role}|${pivot || ''}`;
  function push(mat, role, pivot, geo, matrix) {
    const g = geo.clone();
    g.applyMatrix4(localOf(pivot, matrix || new THREE.Matrix4()));
    const k = key(mat, role, pivot);
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k).push(g);
  }
  const M = (x, y, z, rx = 0, ry = 0, rz = 0) => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz));
    m.compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(1, 1, 1));
    return m;
  };
  function box(mat, role, pivot, x, y, z, sx, sy, sz, rot) {
    push(mat, role, pivot, new THREE.BoxGeometry(sx, sy, sz), M(x, y, z, ...(rot || [0, 0, 0])));
  }
  function cyl(mat, role, pivot, x, y, z, r, d, axis = 'Z', seg = 20, rot = null) {
    const base = { Z: [0, 0, 0], Y: [Math.PI / 2, 0, 0], X: [0, 0, Math.PI / 2] }[axis];
    push(mat, role, pivot, new THREE.CylinderGeometry(r, r, d, seg), M(x, y, z, ...(rot || base)));
  }
  function torus(mat, role, pivot, x, y, z, r, t, axis = 'Z', seg = 20) {
    const rot = axis === 'Y' ? [Math.PI / 2, 0, 0] : axis === 'X' ? [0, Math.PI / 2, 0] : [0, 0, 0];
    push(mat, role, pivot, new THREE.TorusGeometry(r, t, 10, seg), M(x, y, z, ...rot));
  }
  function sphere(mat, role, pivot, x, y, z, sx, sy, sz, rot, seg = 10, ring = 7) {
    const g = new THREE.SphereGeometry(0.5, seg, ring);
    const m = M(x, y, z, ...(rot || [0, 0, 0]));
    const s = new THREE.Matrix4().makeScale(sx, sy, sz);
    m.multiply(s);
    push(mat, role, pivot, g, m);
  }
  function bead(pivot, x, y, z) {
    if (!beadSets.has(pivot)) beadSets.set(pivot, []);
    beadSets.get(pivot).push(localOf(pivot, M(x, y, z)));
  }

  /* ── hoja con paneles, perlado y herrajes; cuelga de su pivote ───────── */
  function leafPanel(prefix, pivot, x, z, w, h, ornament) {
    const face_y = -LEAF_T / 2;
    box('bronze_matte', 'leaf', pivot, x, face_y - 0.01, z, w, 0.02, h);
    const m = 0.07, d = 0.05;
    box('bronze', 'leaf', pivot, x, face_y - d / 2 + 0.01, z + h / 2 - m / 2, w, d, m);
    box('bronze', 'leaf', pivot, x, face_y - d / 2 + 0.01, z - h / 2 + m / 2, w, d, m);
    box('bronze', 'leaf', pivot, x - w / 2 + m / 2, face_y - d / 2 + 0.01, z, m, d, h - 2 * m);
    box('bronze', 'leaf', pivot, x + w / 2 - m / 2, face_y - d / 2 + 0.01, z, m, d, h - 2 * m);
    /* perlado instanciado en el borde interior de la moldura */
    const bead_r = 0.016;                 // un pelo mayor que en Blender: lee mejor a escala web
    const bead_step = bead_r * 4.2;       // menos cuentas que el original (peso)
    const bx0 = x - w / 2 + m + bead_r, bx1 = x + w / 2 - m - bead_r;
    const bz0 = z - h / 2 + m + bead_r, bz1 = z + h / 2 - m - bead_r;
    const n_x = Math.max(2, Math.round((bx1 - bx0) / bead_step));
    const n_z = Math.max(2, Math.round((bz1 - bz0) / bead_step));
    for (let i = 0; i <= n_x; i++) {
      const bx = bx0 + (bx1 - bx0) * i / n_x;
      bead(pivot, bx, face_y - 0.008, bz0); bead(pivot, bx, face_y - 0.008, bz1);
    }
    for (let j = 1; j < n_z; j++) {
      const bz = bz0 + (bz1 - bz0) * j / n_z;
      bead(pivot, bx0, face_y - 0.008, bz); bead(pivot, bx1, face_y - 0.008, bz);
    }
    const iy = face_y;
    if (ornament === 'rosette') {
      const size = Math.min(w, h) * 0.62;
      box('bronze', 'leaf', pivot, x, iy - 0.02, z, size, 0.04, size);
      box('bronze_dark', 'leaf', pivot, x, iy - 0.045, z, size * 0.78, 0.02, size * 0.78);
      cyl('bronze', 'leaf', pivot, x, iy - 0.075, z, size * 0.16, 0.05, 'Y', 16);
      sphere('bronze', 'leaf', pivot, x, iy - 0.10, z, size * 0.14, size * 0.14, size * 0.14);
      for (let i = 0; i < 8; i++) {
        const a = i * 2 * Math.PI / 8;
        sphere('bronze', 'leaf', pivot, x + Math.cos(a) * size * 0.24, iy - 0.07, z + Math.sin(a) * size * 0.24,
          size * 0.18, 0.04, size * 0.32, [0, -a + Math.PI / 2, 0], 8, 6);
      }
      for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        sphere('bronze', 'leaf', pivot, x + sx * size * 0.33, iy - 0.06, z + sz * size * 0.33,
          size * 0.2, 0.04, size * 0.12, [0, Math.atan2(sz, sx) + Math.PI / 2, 0], 8, 6);
      }
    } else if (ornament === 'knocker') {
      const fy = iy - 0.02, kz = z + 0.10;
      sphere('bronze', 'leaf', pivot, x, fy - 0.02, kz + 0.12, 0.056, 0.04, 0.19, null, 12, 8);
      for (const sx of [-1, 1]) {
        sphere('bronze', 'leaf', pivot, x + sx * 0.05, fy - 0.02, kz + 0.10, 0.044, 0.036, 0.14, [0, sx * -0.52, 0], 12, 8);
        sphere('bronze', 'leaf', pivot, x + sx * 0.078, fy - 0.02, kz + 0.06, 0.044, 0.032, 0.06, [0, sx * -1.3, 0], 8, 6);
        sphere('bronze', 'leaf', pivot, x + sx * 0.035, fy - 0.02, kz - 0.02, 0.032, 0.03, 0.07, [0, sx * 0.52, 0], 8, 6);
      }
      box('bronze', 'leaf', pivot, x, fy - 0.025, kz + 0.02, 0.11, 0.03, 0.03);
      sphere('bronze', 'leaf', pivot, x, fy - 0.02, kz - 0.03, 0.036, 0.03, 0.09, null, 8, 6);
      cyl('bronze_dark', 'leaf', pivot, x, fy - 0.05, kz - 0.06, 0.018, 0.06, 'X', 12);
      torus('bronze', 'leaf', pivot, x, fy - 0.05, kz - 0.19, 0.13, 0.024, 'Y', 20);
      box('bronze', 'leaf', pivot, x, fy - 0.05, kz - 0.32, 0.05, 0.05, 0.05);
    }
  }

  function doorLeaf(prefix, x) {
    const hinge_x = Math.sign(x) * DOOR_W / 2;
    const pivot = new THREE.Object3D();
    pivot.name = `${prefix}_Pivot`;
    pivot.position.set(hinge_x, 0, LANDING_Z);
    pivot.userData.openSign = x < 0 ? 1 : -1;
    const p = prefix;
    const z0 = LANDING_Z, zc = z0 + DOOR_H / 2;
    box('bronze', 'leaf', p, x, 0, zc, LEAF_W, LEAF_T, DOOR_H);
    const face_y = -LEAF_T / 2;
    const panel_w = LEAF_W - 2 * STILE;
    box('bronze', 'leaf', p, x, face_y - 0.015, z0 + 0.32, LEAF_W - 0.04, 0.03, 0.62);
    const bottom_z = z0 + 0.65 + STILE + 1.45 / 2;
    const middle_z = bottom_z + 1.45 / 2 + STILE + 2.05 / 2;
    const top_z = middle_z + 2.05 / 2 + STILE + 1.05 / 2;
    leafPanel(`${p}_Bottom`, p, x, bottom_z, panel_w, 1.45, 'rosette');
    leafPanel(`${p}_Middle`, p, x, middle_z, panel_w, 2.05, 'knocker');
    leafPanel(`${p}_Top`, p, x, top_z, panel_w, 1.05, 'rosette');
    const inner = x - Math.sign(x) * (LEAF_W / 2 - 0.10);
    box('bronze_dark', 'leaf', p, inner, face_y - 0.01, z0 + 2.95, 0.06, 0.02, 0.30);
    const outer = x + Math.sign(x) * (LEAF_W / 2 + 0.02);
    for (const hz of [0.7, 2.4, 4.1, 5.7]) {
      cyl('bronze_dark', 'leaf', p, outer, face_y + 0.02, z0 + hz, 0.035, 0.28, 'Z', 10);
    }
    pivots[prefix] = pivot;
    return pivot;
  }

  /* ── pilastra con capitel corintio simplificado (sin booleans) ───────── */
  function pilaster(prefix, x, base_z, top_z) {
    const FRAME = 'facade';
    const width = 0.95, depth = 0.28;
    const pedestal_h = 1.1;
    box('stone', FRAME, null, x, -depth / 2 - 0.05, base_z + pedestal_h / 2, width + 0.16, depth + 0.1, pedestal_h);
    box('stone', FRAME, null, x, -depth / 2 - 0.08, base_z + pedestal_h + 0.06, width + 0.26, depth + 0.16, 0.12);
    const shaft_z0 = base_z + pedestal_h + 0.12;
    const cap_h = 1.0;
    const shaft_h = top_z - cap_h - shaft_z0;
    box('stone', FRAME, null, x, -depth / 2, shaft_z0 + shaft_h / 2, width, depth, shaft_h);
    /* tres canales someros sugieren el fuste acanalado sin booleans */
    for (const fx of [-width * 0.28, 0, width * 0.28]) {
      box('stone_dark', FRAME, null, x + fx, -depth - 0.005, shaft_z0 + shaft_h / 2, width * 0.12, 0.02, shaft_h - 0.5);
    }
    const cz = shaft_z0 + shaft_h;
    box('stone', FRAME, null, x, -depth / 2 - 0.02, cz + 0.04, width + 0.06, depth + 0.04, 0.08);
    /* Campana del capitel: troncocono que ensancha hacia el ábaco (el eje del
       cilindro va en Z, que es el "arriba" de este espacio antes del giro). */
    push('stone', FRAME, null,
      new THREE.CylinderGeometry(width * 0.56, width * 0.38, 0.60, 14),
      M(x, -depth / 2, cz + 0.36, Math.PI / 2));
    /* Hojas de acanto en RELIEVE: planas, erguidas y pegadas a la campana, en
       dos filas alternadas. La versión anterior era un racimo de esferas
       ovoides muy protruidas que a escala de pantalla leía como huevos. */
    for (const [lz, count, tilt] of [[0.26, 5, -0.20], [0.50, 4, -0.08]]) {
      for (let i = 0; i < count; i++) {
        const lx = x - width / 2 + width * (i + 0.5) / count;
        sphere('stone', FRAME, null, lx, -depth + 0.02, cz + lz, 0.17, 0.10, 0.44, [tilt, 0, 0], 8, 6);
      }
    }
    /* Volutas esquineras: espirales vistas de frente, apoyadas bajo el ábaco
       (antes flotaban despegadas a cz+0.80). */
    for (const sx of [-1, 1]) {
      torus('stone', FRAME, null, x + sx * (width / 2 - 0.06), -depth - 0.10, cz + 0.66, 0.12, 0.05, 'Y', 14);
    }
    box('stone', FRAME, null, x, -depth / 2 - 0.06, cz + cap_h - 0.07, width + 0.36, depth + 0.16, 0.14);
  }

  /* ── fachada compacta: muro con vano, basamento, pilastras y cornisa ── */
  {
    const wall_w = 8.6;
    const top = LANDING_Z + DOOR_H + 1.15;
    const pil_top = top + 1.1;
    const wall_h = pil_top + 0.5;
    const z_top = LANDING_Z + DOOR_H + 0.75;
    const side_w = (wall_w - DOOR_W) / 2;
    for (const sx of [-1, 1]) {
      box('stone', 'facade', null, sx * (DOOR_W / 2 + side_w / 2), 0.5, wall_h / 2, side_w, 1.0, wall_h);
    }
    box('stone', 'facade', null, 0, 0.5, (z_top + wall_h) / 2, DOOR_W + 0.02, 1.0, wall_h - z_top);
    box('granite', 'facade', null, 0, -0.10, LANDING_Z / 2, wall_w, 0.20, LANDING_Z);
    for (const sx of [-1, 1]) pilaster(`Pilaster_${sx}`, sx * PILASTER_X, LANDING_Z, pil_top);
    box('stone', 'facade', null, 0, -0.30, pil_top + 0.25, wall_w, 0.60, 0.5);
  }

  /* ── marco de piedra + bronce alrededor del vano, placa y medallón ──── */
  {
    const z0 = LANDING_Z;
    const jamb_w = 0.55, jamb_d = 0.30, lintel_h = 0.75;
    for (const sx of [-1, 1]) {
      const x = sx * (DOOR_W / 2 + jamb_w / 2);
      box('stone', 'frame', null, x, -jamb_d / 2, z0 + DOOR_H / 2, jamb_w, jamb_d, DOOR_H);
      box('stone', 'frame', null, sx * (DOOR_W / 2 + 0.16), -jamb_d - 0.015, z0 + DOOR_H / 2, 0.20, 0.03, DOOR_H);
    }
    box('stone', 'frame', null, 0, -jamb_d / 2, z0 + DOOR_H + lintel_h / 2, DOOR_W + 2 * jamb_w, jamb_d, lintel_h);
    box('stone', 'frame', null, 0, -jamb_d - 0.015, z0 + DOOR_H + 0.08, DOOR_W + 0.48, 0.03, 0.16);
    box('stone', 'frame', null, 0, -jamb_d - 0.12, z0 + DOOR_H + lintel_h + 0.08, DOOR_W + 2 * jamb_w + 0.4, 0.24 + jamb_d, 0.16);
    const fr = 0.06;
    box('bronze', 'frame', null, 0, -jamb_d / 2 - 0.02, z0 + DOOR_H + fr / 2, DOOR_W + 2 * fr, jamb_d + 0.04, fr);
    for (const sx of [-1, 1]) {
      box('bronze', 'frame', null, sx * (DOOR_W / 2 + fr / 2), -jamb_d / 2 - 0.02, z0 + DOOR_H / 2, fr, jamb_d + 0.04, DOOR_H);
    }
    const jamb_outer = DOOR_W / 2 + jamb_w;
    const pil_inner = PILASTER_X - 0.95 / 2 - 0.08;
    const panel_w = pil_inner - jamb_outer + 0.02;
    const panel_h = DOOR_H + lintel_h + 0.16;
    for (const sx of [-1, 1]) {
      box('stone', 'frame', null, sx * (jamb_outer + panel_w / 2 - 0.01), -jamb_d / 2 + 0.031, z0 + panel_h / 2, panel_w, jamb_d - 0.06, panel_h);
    }
    /* Placa y medallón: DOS MEDALLAS doradas en la pared — disco plano
       encarado a la cámara (eje del cilindro en Y, no de canto como antes)
       más un aro en relieve cerca del borde, especie de medallón.
       Ambas a la MISMA altura (la que tenía la derecha). */
    cyl('medal', 'medal', null, -PLAQUE_X, -jamb_d - 0.02, z0 + PLAQUE_Z + 0.35, 0.10, 0.03, 'Z', 24);
    torus('medal', 'medal', null, -PLAQUE_X, -jamb_d - 0.045, z0 + PLAQUE_Z + 0.35, 0.08, 0.010, 'Y', 24);
    cyl('medal', 'medal', null, PLAQUE_X, -jamb_d - 0.02, z0 + PLAQUE_Z + 0.35, 0.10, 0.03, 'Z', 24);
    torus('medal', 'medal', null, PLAQUE_X, -jamb_d - 0.045, z0 + PLAQUE_Z + 0.35, 0.08, 0.010, 'Y', 24);
  }

  /* ── escalinata de 5 peldaños con nariz y zócalos ────────────────────── */
  {
    const width = DOOR_W + 2 * 0.55 + 0.9;
    const total_depth = STEP_TREAD * STEP_COUNT + 0.6;
    for (let i = 0; i < STEP_COUNT; i++) {
      const depth = STEP_TREAD * (STEP_COUNT - i) + 0.6;
      const z = STEP_RISE * (i + 0.5);
      box('granite', 'frame', null, 0, -depth / 2, z, width, depth, STEP_RISE);
      box('granite', 'frame', null, 0, -depth - 0.015, z + STEP_RISE / 2 - 0.02, width, 0.03, 0.04);
    }
    const cheek_w = 0.45;
    for (const sx of [-1, 1]) {
      const cx = sx * (width / 2 + cheek_w / 2);
      box('stone', 'frame', null, cx, -total_depth / 2, LANDING_Z / 2 + 0.06, cheek_w, total_depth, LANDING_Z + 0.12);
      box('stone', 'frame', null, cx, -total_depth / 2, LANDING_Z + 0.16, cheek_w + 0.08, total_depth + 0.08, 0.08);
    }
    box('bronze_dark', 'frame', null, 0, -0.05, LANDING_Z + 0.01, DOOR_W + 0.1, 0.30, 0.02);
  }

  /* ── vestíbulo interior con panel emisivo cálido ─────────────────────── */
  {
    /* Vestíbulo SOMBRÍO y sin muro posterior: al cruzar el umbral la cámara
       debe ver aparecer la escena de La Sala detrás, no una caja clara. */
    const z0 = LANDING_Z;
    const depth = 5.0, width = 5.0, height = DOOR_H + 1.0;
    box('stone_dark', 'interior', null, 0, depth / 2 + 0.1, z0 - 0.05, width, depth, 0.10);
    box('stone_dark', 'interior', null, 0, depth / 2, z0 + height + 0.05, width, depth, 0.10);
    for (const sx of [-1, 1]) {
      box('stone_dark', 'interior', null, sx * (width / 2 + 0.05), depth / 2, z0 + height / 2, 0.10, depth, height);
    }
    box('stone_dark', 'interior', null, 0, 0.30, z0 + DOOR_H + 0.5, width, 0.40, 1.0);
    for (const sx of [-1, 1]) {
      box('stone_dark', 'interior', null, sx * (DOOR_W / 2 + (width - DOOR_W) / 4), 0.30, z0 + DOOR_H / 2, (width - DOOR_W) / 2, 0.40, DOOR_H);
    }
    /* El panel llena el hueco del vestíbulo de borde a borde (4,7 × 6,7 frente
       al 3,2 × 4,8 anterior): con el tamaño viejo sus cantos quedaban a la
       vista dentro del vano y se leía como una "figura" flotando atrás. Así
       es una pared de luz al fondo del pasillo, del suelo al dintel. */
    box('glow', 'glow', null, 0, depth - 0.15, z0 + 3.25, 4.7, 0.05, 6.7);
  }

  /* ── hojas y pivotes ─────────────────────────────────────────────────── */
  const pivotL = doorLeaf('Door_L', -LEAF_W / 2);
  const pivotR = doorLeaf('Door_R', LEAF_W / 2);

  /* ── materializa buckets: un mesh por (mat, role, pivot) ─────────────── */
  const group = new THREE.Group();
  group.name = 'CentralBankDoor';
  const pivotOf = { Door_L: pivotL, Door_R: pivotR };
  for (const [k, geos] of buckets) {
    const [matName, role, pivotName] = k.split('|');
    const merged = mergeGeometries(geos, false);
    if (!merged) continue;
    const mat = (role === 'leaf' ? MATS_LEAF : MATS)[matName] || MATS[matName];
    const mesh = new THREE.Mesh(merged, mat);
    mesh.name = `${role}_${matName}${pivotName ? '_' + pivotName : ''}`;
    mesh.userData.role = role;
    /* main.js usa el nombre del material para dar a los ornamentos de las
       hojas un dorado distinto del fondo (contraste de relieve). */
    mesh.userData.matName = matName;
    mesh.matrixAutoUpdate = false;
    mesh.matrix.identity();
    const parent = pivotName ? pivotOf[pivotName] : group;
    parent.add(mesh);
  }
  /* perlado instanciado por hoja */
  const beadGeo = new THREE.SphereGeometry(0.012, 6, 4);
  for (const [pivotName, mats4] of beadSets) {
    const inst = new THREE.InstancedMesh(beadGeo, MATS_LEAF.bronze, mats4.length);
    mats4.forEach((m, i) => inst.setMatrixAt(i, m));
    inst.instanceMatrix.needsUpdate = true;
    inst.name = `leaf_beads_${pivotName}`;
    inst.userData.role = 'leaf';
    inst.userData.matName = 'bronze';
    pivotOf[pivotName].add(inst);
  }
  group.add(pivotL, pivotR);
  group.updateMatrixWorld(true);
  return { group, pivotL, pivotR, glowMat: MATS.glow };
}
