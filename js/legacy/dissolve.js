/* dissolve.js — la figura de La Sala se deshace en polvo (y se vuelve a formar).
 *
 * QUÉ HACE
 *   Un frente de disolución sube por la figura (pedestal + estatua). Delante
 *   del frente la malla está entera; detrás, desaparece. Justo en el frente
 *   la piedra arde en oro (borde emisivo) y de ahí nacen motas de polvo que
 *   se despegan por la normal, suben y se apagan. Al revés (frente bajando)
 *   las motas convergen sobre la superficie y la malla se solidifica detrás:
 *   es la misma animación leída hacia atrás, así que "formarse" no cuesta
 *   código extra.
 *
 * CÓMO SE GARANTIZA QUE MALLA Y POLVO COMPARTEN EL MISMO FRENTE
 *   El umbral `h` de cada punto (0 = se va primero, 1 = se va último) se
 *   calcula UNA vez en JS por vértice —altura normalizada de la figura más
 *   ruido 3D— y viaja a la GPU como atributo de la malla. Cada mota de polvo
 *   nace en un punto de la superficie muestreado por área y hereda `h` por
 *   interpolación baricéntrica de los tres vértices de su triángulo: es
 *   exactamente el valor que interpola el rasterizador para ese píxel de la
 *   malla. Sin ruido en GLSL no hay diferencias de precisión CPU/GPU, los
 *   shaders quedan baratos y, como las motas se ordenan por `h`, cada frame
 *   se dibuja solo el rango vivo (`setDrawRange`): con la figura entera el
 *   polvo cuesta cero.
 *
 * CONTRATO VISUAL (polvo ≠ dato)
 *   El polvo es materia: decenas de miles de puntos, sin clic, sin raycast,
 *   tamaño en pantalla acotado por arriba (`maxPx`) para que nunca se
 *   confunda con una partícula de dato, que es más grande, nítida y responde
 *   al cursor. `raycast` es un no-op a propósito.
 *
 * USO
 *   const fx = createFigureDissolve({ THREE, group, meshes, texture, options });
 *   fx.set(d, time)   // d: 0 = sólida … 1+span+edge = polvo apagado
 *   fx.dispose()
 */

/* ── Ruido 3D de valor (JS puro, determinista) ─────────────────────────── */
function hash3(x, y, z) {
  let n = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(z, 1274126177);
  n = Math.imul(n ^ (n >>> 13), 1103515245);
  n ^= n >>> 16;
  return (n >>> 0) / 4294967296;
}
function vnoise(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const fx = x - xi, fy = y - yi, fz = z - zi;
  const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy), sz = fz * fz * (3 - 2 * fz);
  const c000 = hash3(xi, yi, zi), c100 = hash3(xi + 1, yi, zi);
  const c010 = hash3(xi, yi + 1, zi), c110 = hash3(xi + 1, yi + 1, zi);
  const c001 = hash3(xi, yi, zi + 1), c101 = hash3(xi + 1, yi, zi + 1);
  const c011 = hash3(xi, yi + 1, zi + 1), c111 = hash3(xi + 1, yi + 1, zi + 1);
  const x00 = c000 + (c100 - c000) * sx, x10 = c010 + (c110 - c010) * sx;
  const x01 = c001 + (c101 - c001) * sx, x11 = c011 + (c111 - c011) * sx;
  const y0 = x00 + (x10 - x00) * sy, y1 = x01 + (x11 - x01) * sy;
  return y0 + (y1 - y0) * sz;
}
function fbm(x, y, z) {
  return 0.62 * vnoise(x, y, z) + 0.38 * vnoise(x * 2.13 + 17.3, y * 2.13 + 9.1, z * 2.13 + 4.7);
}

/* RNG sembrado: las capturas de verificación son reproducibles. */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lowerBound(arr, x) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] < x) lo = mid + 1; else hi = mid;
  }
  return lo;
}

const DEFAULTS = {
  span: 0.30,      // vida de una mota, en unidades del frente (0..1 = toda la figura)
  edge: 0.03,      // grosor del borde que arde
  noise: 0.34,     // cuánto desordena el ruido al frente (0 = corte plano)
  freq: 6.0,       // frecuencia del ruido, por unidad de mundo
  count: 22000,    // motas en total (se reparten por área entre las mallas)
  /* Tamaño en px CSS (× pixelRatio dentro). El dato mide 10–30 px en la
     sala; el polvo se queda en ≤ 4,5 px: distinguible, pero visible. Con
     2,6 px (el primer intento) la mota se perdía en cuanto la cámara
     retrocedía —a 7,6 m salía a 2,6 px con alfa 0,3: nada. */
  maxPx: 4.0,
  baseSize: 0.07,  // tamaño base en unidades de mundo (rige a distancia)
  rise: 1.1,       // cuánto sube una mota en su vida (unidades de mundo)
  alpha: 0.5,      // alfa pico de una mota (aditivo: se suman entre ellas)
  edgeColor: 0xffd76a,
  seed: 1337,
};

export function createFigureDissolve({ THREE, group, meshes, texture, options = {} }) {
  const opt = { ...DEFAULTS, ...options };
  /* Cada entrada puede ser una malla o `{ mesh, range: [a, b], direction }`:
     `range` es el tramo del frente (0..1) que le toca a esa malla y
     `direction` si se deshace de abajo arriba ('up', por defecto) o al revés.
     Así la estatua puede irse primero (pies → cabeza) y el pedestal después
     (de arriba abajo, continuando la ola), sin que la figura flote. */
  const entries = meshes
    .map((e) => (e && e.isMesh ? { mesh: e } : e))
    .filter((e) => e && e.mesh && e.mesh.isMesh && e.mesh.geometry?.attributes?.position)
    .map((e) => ({ mesh: e.mesh, range: e.range || [0, 1], direction: e.direction || 'up' }));
  const live = entries.map((e) => e.mesh);
  if (!live.length) return null;

  group.updateMatrixWorld(true);
  const groupInv = new THREE.Matrix4().copy(group.matrixWorld).invert();

  /* 1) Cada malla al espacio LOCAL DEL GRUPO (independiente de la escala que
        animate() le esté aplicando al grupo en este instante). Un solo campo
        para pedestal + estatua: el frente sube de forma continua. */
  const rels = live.map((m) => new THREE.Matrix4().multiplyMatrices(groupInv, m.matrixWorld));
  const v = new THREE.Vector3();
  let minY = Infinity, maxY = -Infinity;
  const bounds = live.map((m, k) => {
    const pos = m.geometry.attributes.position;
    let lo = Infinity, hi = -Infinity;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(rels[k]);
      if (v.y < lo) lo = v.y;
      if (v.y > hi) hi = v.y;
    }
    if (lo < minY) minY = lo;
    if (hi > maxY) maxY = hi;
    return { lo, hi, span: Math.max(1e-6, hi - lo) };
  });
  const spanY = Math.max(1e-6, maxY - minY);
  /* h ∈ [a, b] de la malla k: altura normalizada de ESA malla (invertida si
     baja) mezclada con ruido, y el ruido escalado al ancho del tramo para
     que un tramo corto no quede dominado por él. */
  const field = (k, x, y, z) => {
    const { lo, span } = bounds[k];
    const [a, b] = entries[k].range;
    let yn = (y - lo) / span;
    if (entries[k].direction === 'down') yn = 1 - yn;
    const n = fbm(x * opt.freq, y * opt.freq, z * opt.freq);
    const t = yn * (1 - opt.noise) + n * opt.noise;
    const h = a + (b - a) * (t < 0 ? 0 : (t > 1 ? 1 : t));
    return h < 0 ? 0 : (h > 1 ? 1 : h);
  };

  /* 2) Umbral por vértice → atributo de la malla + parche del material. */
  const uniforms = {
    uDissolve: { value: 0 },
    uEdge: { value: opt.edge },
    uEdgeColor: { value: new THREE.Color(opt.edgeColor) },
  };
  const hPerMesh = [];
  live.forEach((m, k) => {
    const pos = m.geometry.attributes.position;
    const h = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(rels[k]);
      h[i] = field(k, v.x, v.y, v.z);
    }
    hPerMesh.push(h);
    m.geometry.setAttribute('aDissolve', new THREE.BufferAttribute(h, 1));
    const mats = Array.isArray(m.material) ? m.material : [m.material];
    mats.forEach((mat) => patchMaterial(mat, uniforms));
  });

  /* 3) Polvo: muestreo por área, `h` heredado por baricéntricas. */
  const rng = mulberry32(opt.seed);
  const areas = live.map((m, k) => triangleCdf(THREE, m.geometry, rels[k]));
  const totalArea = areas.reduce((s, a) => s + a.total, 0) || 1;
  const N = Math.max(0, opt.count | 0);
  const P = new Float32Array(N * 3), Nn = new Float32Array(N * 3), H = new Float32Array(N), S = new Float32Array(N);
  let written = 0;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const na = new THREE.Vector3(), nb = new THREE.Vector3(), nc = new THREE.Vector3();
  const nm = new THREE.Matrix3();
  live.forEach((m, k) => {
    const geo = m.geometry, pos = geo.attributes.position, nor = geo.attributes.normal, idx = geo.index;
    const { cdf, total } = areas[k];
    const h = hPerMesh[k];
    nm.getNormalMatrix(rels[k]);
    const want = k === live.length - 1 ? N - written : Math.round(N * total / totalArea);
    for (let s = 0; s < want && written < N; s++) {
      const t = lowerBound(cdf, rng() * total);
      const i0 = idx ? idx.getX(t * 3) : t * 3, i1 = idx ? idx.getX(t * 3 + 1) : t * 3 + 1, i2 = idx ? idx.getX(t * 3 + 2) : t * 3 + 2;
      let u = rng(), w = rng();
      if (u + w > 1) { u = 1 - u; w = 1 - w; }
      const q = 1 - u - w;
      a.fromBufferAttribute(pos, i0).applyMatrix4(rels[k]);
      b.fromBufferAttribute(pos, i1).applyMatrix4(rels[k]);
      c.fromBufferAttribute(pos, i2).applyMatrix4(rels[k]);
      v.set(a.x * q + b.x * u + c.x * w, a.y * q + b.y * u + c.y * w, a.z * q + b.z * u + c.z * w);
      const o = written * 3;
      P[o] = v.x; P[o + 1] = v.y; P[o + 2] = v.z;
      if (nor) {
        na.fromBufferAttribute(nor, i0); nb.fromBufferAttribute(nor, i1); nc.fromBufferAttribute(nor, i2);
        v.set(na.x * q + nb.x * u + nc.x * w, na.y * q + nb.y * u + nc.y * w, na.z * q + nb.z * u + nc.z * w).applyMatrix3(nm).normalize();
      } else {
        v.set(0, 1, 0);
      }
      Nn[o] = v.x; Nn[o + 1] = v.y; Nn[o + 2] = v.z;
      H[written] = h[i0] * q + h[i1] * u + h[i2] * w;
      S[written] = rng();
      written++;
    }
  });

  /* Orden por `h`: el conjunto vivo es siempre un rango contiguo. */
  const order = new Uint32Array(written);
  for (let i = 0; i < written; i++) order[i] = i;
  order.sort((i, j) => H[i] - H[j]);
  const sP = new Float32Array(written * 3), sN = new Float32Array(written * 3), sH = new Float32Array(written), sS = new Float32Array(written);
  for (let k = 0; k < written; k++) {
    const i = order[k];
    sP[k * 3] = P[i * 3]; sP[k * 3 + 1] = P[i * 3 + 1]; sP[k * 3 + 2] = P[i * 3 + 2];
    sN[k * 3] = Nn[i * 3]; sN[k * 3 + 1] = Nn[i * 3 + 1]; sN[k * 3 + 2] = Nn[i * 3 + 2];
    sH[k] = H[i]; sS[k] = S[i];
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(sP, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(sN, 3));
  geo.setAttribute('aH', new THREE.BufferAttribute(sH, 1));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(sS, 1));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, (minY + maxY) / 2, 0), spanY * 2 + opt.rise);
  geo.setDrawRange(0, 0);

  const dustUniforms = {
    uDissolve: uniforms.uDissolve,
    uSpan: { value: opt.span },
    uTime: { value: 0 },
    uScale: { value: 450 },
    uMaxPx: { value: opt.maxPx },
    uBase: { value: opt.baseSize },
    uRise: { value: opt.rise },
    uAlpha: { value: opt.alpha },
    uMap: { value: texture },
    uEdgeColor: uniforms.uEdgeColor,
  };
  const dustMat = new THREE.ShaderMaterial({
    uniforms: dustUniforms,
    vertexShader: /* glsl */`
      attribute float aH;
      attribute float aSeed;
      uniform float uDissolve, uSpan, uTime, uScale, uMaxPx, uBase, uRise, uAlpha;
      uniform vec3 uEdgeColor;
      varying float vAlpha;
      varying vec3 vColor;
      void main() {
        float life = clamp((uDissolve - aH) / uSpan, 0.0, 1.0);
        float ease = 1.0 - (1.0 - life) * (1.0 - life);
        /* Nace en la superficie, se despega por la normal y SUBE: ascenso
           lineal desde el primer instante (para que el rastro quede por
           encima del corte, no colgando debajo) más una aceleración suave. */
        vec3 p = position + normal * (0.01 + 0.09 * ease);
        float ang = aSeed * 6.2831853 + life * 2.4 + uTime * 0.5;
        p.xz += vec2(sin(ang), cos(ang)) * (0.03 * ease + 0.07 * life * life);
        p.y += uRise * (0.45 * life + 0.55 * life * life) + 0.02;
        p += 0.008 * ease * vec3(sin(uTime * 2.3 + aSeed * 61.0), sin(uTime * 1.7 + aSeed * 37.0), cos(uTime * 2.1 + aSeed * 53.0));
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float sz = uBase * mix(1.0, 0.55, life) * (uScale / max(-mv.z, 0.001));
        gl_PointSize = clamp(sz, 1.5, uMaxPx);
        /* Brilla casi toda su vida y se apaga al final: con el apagado desde
           el 22 % la mayoría de las motas vivas estaban ya medio muertas. */
        float a = smoothstep(0.0, 0.04, life) * (1.0 - smoothstep(0.55, 1.0, life));
        vAlpha = a * uAlpha * (0.6 + 0.4 * fract(aSeed * 7.31));
        /* De brasa a oro viejo (no a piedra gris): el polvo muere cálido y
           enlaza con las órbitas doradas que siguen girando alrededor. */
        vec3 spark = uEdgeColor * 1.15;
        vec3 ember = vec3(0.80, 0.62, 0.36);
        vColor = mix(spark, ember, smoothstep(0.0, 0.35, life));
      }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D uMap;
      varying float vAlpha;
      varying vec3 vColor;
      void main() {
        float a = texture2D(uMap, gl_PointCoord).a * vAlpha;
        if (a < 0.01) discard;
        /* Aditivo con color premultiplicado por el alfa: nunca oscurece lo
           que hay detrás (un sprite casi transparente sobre la piedra clara
           se veía como un punto sucio). */
        gl_FragColor = vec4(vColor * a, a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    blending: THREE.CustomBlending,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneFactor,
    blendEquation: THREE.AddEquation,
    fog: false,
  });
  const dust = new THREE.Points(geo, dustMat);
  dust.name = 'figure-dust';
  dust.frustumCulled = false;
  dust.raycast = () => {};       // polvo: nunca es un objetivo de interacción
  dust.visible = false;
  group.add(dust);

  const span = opt.span;
  const maxD = 1 + span + opt.edge;
  let lastLo = -1, lastHi = -1;

  function set(d, time = 0) {
    d = Math.max(0, Math.min(maxD, d));
    uniforms.uDissolve.value = d;
    dustUniforms.uTime.value = time;
    const lo = lowerBound(sH, d - span);
    const hi = lowerBound(sH, d);
    if (lo !== lastLo || hi !== lastHi) {
      geo.setDrawRange(lo, Math.max(0, hi - lo));
      lastLo = lo; lastHi = hi;
    }
    dust.visible = hi > lo;
    /* Con el frente por encima del último vértice la malla ya no pinta nada:
       fuera de la lista de dibujo en vez de 38 k triángulos descartados. */
    const meshOn = d < 1.0 + opt.edge;
    for (let i = 0; i < live.length; i++) live[i].visible = meshOn;
  }

  function setPixelScale(heightPx, pixelRatio) {
    dustUniforms.uScale.value = heightPx * pixelRatio * 0.5;
    dustUniforms.uMaxPx.value = opt.maxPx * pixelRatio;
  }

  function dispose() {
    group.remove(dust);
    geo.dispose();
    dustMat.dispose();
  }

  return { dust, uniforms, set, setPixelScale, dispose, maxD, count: written, bounds: { minY, maxY } };
}

function triangleCdf(THREE, geo, rel) {
  const pos = geo.attributes.position, idx = geo.index;
  const triCount = idx ? idx.count / 3 : Math.floor(pos.count / 3);
  const cdf = new Float64Array(triCount);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  let acc = 0;
  for (let t = 0; t < triCount; t++) {
    const i0 = idx ? idx.getX(t * 3) : t * 3, i1 = idx ? idx.getX(t * 3 + 1) : t * 3 + 1, i2 = idx ? idx.getX(t * 3 + 2) : t * 3 + 2;
    a.fromBufferAttribute(pos, i0).applyMatrix4(rel);
    b.fromBufferAttribute(pos, i1).applyMatrix4(rel);
    c.fromBufferAttribute(pos, i2).applyMatrix4(rel);
    b.sub(a); c.sub(a);
    acc += 0.5 * b.cross(c).length();
    cdf[t] = acc;
  }
  return { cdf, total: acc };
}

/* Parche del MeshStandardMaterial: descarte detrás del frente + borde emisivo.
   Se inyecta antes de la primera compilación (la figura carga con la cortina
   puesta) y comparte los objetos uniform con el polvo: un solo `set()`. */
function patchMaterial(mat, uniforms) {
  if (!mat || mat.userData.__dissolvePatched) return;
  mat.userData.__dissolvePatched = true;
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uDissolve = uniforms.uDissolve;
    shader.uniforms.uEdge = uniforms.uEdge;
    shader.uniforms.uEdgeColor = uniforms.uEdgeColor;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aDissolve;\nvarying float vDissolve;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvDissolve = aDissolve;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uDissolve;\nuniform float uEdge;\nuniform vec3 uEdgeColor;\nvarying float vDissolve;')
      .replace('#include <clipping_planes_fragment>', '#include <clipping_planes_fragment>\nif (vDissolve < uDissolve) discard;')
      /* Interior (caras traseras): piedra oscura casi sin luz. Si recibiera
         la luz de la sala se leería como un molde blanco, no como el hueco. */
      .replace('vec3 totalEmissiveRadiance = emissive;', 'vec3 totalEmissiveRadiance = emissive;\nif (!gl_FrontFacing) diffuseColor.rgb *= 0.08;')
      /* El borde se aplica DESPUÉS de la niebla, sobre el color final: la
         salida de La Sala ocurre con niebla densa (0,16) y una emisión
         normal quedaría atenuada hasta desaparecer justo cuando hace falta.
         Se mezcla en lugar de sumar para que el oro no se lave sobre la
         piedra clara bajo el foco de museo. */
      .replace('#include <fog_fragment>', `#include <fog_fragment>
{
  float on = smoothstep(0.0, 0.02, uDissolve);
  /* Perfil de brasa: núcleo blanco-cálido pegado al corte, oro un poco más
     adentro, y un halo tenue. Ancho total ≈ 2,2 × uEdge: lo justo para leer
     "se está deshaciendo" sin teñir la piedra de amarillo. */
  float x = (vDissolve - uDissolve) / uEdge;
  float core = 1.0 - smoothstep(0.0, 0.35, x);
  float gold = 1.0 - smoothstep(0.2, 1.0, x);
  float halo = 1.0 - smoothstep(0.8, 2.2, x);
  vec3 emberGold = uEdgeColor;
  vec3 emberCore = vec3(1.0, 0.96, 0.86);
  float back = gl_FrontFacing ? 1.0 : 0.8;
  vec3 ember = mix(emberGold, emberCore, core);
  float w = on * back * clamp(gold * 0.9 + core * 0.4, 0.0, 1.0);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, ember, w);
  gl_FragColor.rgb += emberGold * on * back * halo * 0.12;
}`);
  };
  /* Doble cara: al cortar la malla se ve el interior; con FrontSide sería
     una cáscara hueca con el fondo detrás. Las caras traseras se pintan como
     piedra oscura que arde cerca del frente. */
  mat.side = 2; // THREE.DoubleSide
  mat.customProgramCacheKey = () => 'bcch-figure-dissolve-4';
  mat.needsUpdate = true;
}
