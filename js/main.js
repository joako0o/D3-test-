/* main.js — punto de entrada de la escena y del scrollytelling.
 *
 * Vivia como <script type="module"> dentro de index.html (4.713 lineas).
 * Al moverlo aqui, OJO con las rutas:
 *   - los import relativos se resuelven contra ESTE archivo (js/),
 *   - fetch(), los GLB y el importmap se resuelven contra index.html (raiz).
 * Por eso './js/figures.js' paso a ser './figures.js' y fetch('js/vendor/...')
 * se queda como estaba.
 *
 * Ver README.md > "Como se trabaja en este repo" antes de anadir codigo.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { initFigureSystem } from './figures.js';
import { CONFIG, HERO_DOOR_LOCKUP, HERO } from './config.js';
import { TOPIC_DEFINITIONS, normalizeTopicText, topicHasTerm } from './topics.js';
import { particleRandom } from './utils.js';

/* Los timelines de la escena se crean durante la inicialización de los
   gráficos. Registrar los plugins antes de construir cualquiera de ellos
   evita que el primer scroll-trigger nazca como una propiedad ignorada. */
gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
CustomEase.create("cinematicIn", "0.22,1,0.36,1");
CustomEase.create("cinematicOut", "0.61,1,0.88,1");
CustomEase.create("cinematicInOut", "0.65,0,0.35,1");
CustomEase.create("cinematicSilk", "0.45,0.05,0.55,0.95");
CustomEase.create("cinematicSnap", "0.16,1,0.3,1");

/* ────────────────────────────────
   Modo debug: solo con ?debug en la URL se muestran los HUDs
   (panel de debug, scrubber lateral, indicador de sección).
──────────────────────────────── */
const DEBUG_MODE = /[?&]debug\b/.test(location.search);
if (!DEBUG_MODE) {
  ['debugPanel', 'timelineScrubber', 'figureCabinet'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
} else {
  const cabinet = document.getElementById('figureCabinet');
  if (cabinet) cabinet.style.display = 'block';
}

/* ────────────────────────────────
   Detección de capacidades del dispositivo
──────────────────────────────── */
const supportsWebGL = (() => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
})();
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function isCompactWidth() {
  return getViewportSize().width <= 767;
}
const animMul = reduceMotion ? 0 : 1;


const canvas = document.getElementById('canvas');
const loadEl = document.getElementById('load');
const haloWrap = document.getElementById('haloWrap');
const objectReflection = document.getElementById('objectReflection');
const scrollHint = document.getElementById('scrollHint');
const heroEl = document.getElementById('hero');
const heroTitle = document.querySelector('.hero-title');

let currentStage = 1;
function setStage(stage) {
  if (stage === currentStage) return;
  currentStage = stage;
  if (stage === 1) {
    haloWrap.classList.remove('hidden-stage');
    scrollHint.classList.remove('hidden');
  } else {
    haloWrap.classList.add('hidden-stage');
    scrollHint.classList.add('hidden');
  }
  if (coin.children.length > 0) coin.visible = (stage === 1) && coinFade > 0.01;
  document.body.style.cursor = stage === 1 ? 'grab' : '';
}

const stageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    if (entry.target === heroEl) {
      setStage(1);
    } else {
      setStage(2);
      /* Las partículas se interactúan desde listeners globales (window),
         no desde el canvas fijo: así se pueden presionar aunque un marco o
         una sección esté visualmente por encima, sin bloquear el scroll. */
    }
  });
}, { threshold: 0.45 });
stageObserver.observe(heroEl);
document.querySelectorAll('.stage-hook, .stage-voices, .stage-acts, .stage-counters, .stage-pipeline, .stage-timeline, .stage-quotes, .stage-closing, #stageObjective, #stageHook, #stageAxes, #stageRoomContainer')
  .forEach(el => stageObserver.observe(el));

const scene = new THREE.Scene();
const camBaseY = 0.7;
scene.fog = new THREE.FogExp2(CONFIG.door?.fog ?? 0x0a0e1a, 0);
const initialVp = getViewportSize();
const camera = new THREE.PerspectiveCamera(CONFIG.camera.fov, initialVp.width / initialVp.height, 0.1, 100);
camera.position.set(CONFIG.camera.x, CONFIG.camera.y, CONFIG.camera.z);
camera.lookAt(0, HERO_DOOR_LOCKUP ? 0.95 : 0.7, HERO_DOOR_LOCKUP ? -0.25 : 0);

let renderer = null;
if (supportsWebGL) {
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(initialVp.width, initialVp.height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = CONFIG.exposure;
    renderer.shadowMap.enabled = false;
  } catch (e) {
    renderer = null;
  }
}

if (!renderer) {
  loadEl.innerHTML = '<span style="opacity:.9">Tu dispositivo no soporta WebGL. Se muestra una versi&oacute;n simplificada.</span>';
}

// WebGL context loss handler
if (renderer) {
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    loadEl.innerHTML = '<span style="opacity:.9">Conexi&oacute;n WebGL perdida. Recargue la p&aacute;gina.</span>';
    loadEl.style.display = 'flex';
  }, false);

  canvas.addEventListener('webglcontextrestored', () => {
    window.location.reload();
  }, false);
}

if (renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
}

const L = CONFIG.lights;
const ambient = new THREE.AmbientLight(L.ambient.color, L.ambient.intensity);
scene.add(ambient);
const key = new THREE.DirectionalLight(L.key.color, L.key.intensity); key.position.set(L.key.x, L.key.y, L.key.z);
const fill = new THREE.DirectionalLight(L.fill.color, L.fill.intensity); fill.position.set(L.fill.x, L.fill.y, L.fill.z);
const rim = new THREE.DirectionalLight(L.rim.color, L.rim.intensity); rim.position.set(L.rim.x, L.rim.y, L.rim.z);
const front = new THREE.DirectionalLight(L.front.color, L.front.intensity); front.position.set(L.front.x, L.front.y, L.front.z);
scene.add(key, fill, rim, front);
const mouseLight = new THREE.PointLight(0xfff1c8, 0.4, 8);
scene.add(mouseLight);

/* ═══════════════════════════════════════════════════════════
   FIGURAS DE LA SALA — tu trabajo en Blender, con placeholders.
   Si un .glb de figures/ todavía no existe, se dibuja un
   icosaedro + halo y se marca "por modelar" en el gabinete.
═══════════════════════════════════════════════════════════ */
let figureSystem = initFigureSystem(scene, { debug: DEBUG_MODE });

/* ────────────────────────────────
   Luz de acento tipo museo para las figuras centrales de la sala.
   Se enciende al cruzar el umbral (figureReveal→1) y apunta al centro
   visual de la estatua: la piedra mate destaca sobre el navy sin volver
   a competir con la nube de partículas (que además se despeja al frente).
──────────────────────────────── */
const figureAccent = new THREE.SpotLight(0xffd9a8, 0, 9, 0.55, 0.62, 1.4);
figureAccent.position.set(0, 2.8, -3.0);
const figureAccentTarget = new THREE.Object3D();
figureAccentTarget.position.set(0, 0.6, -4.8);
figureAccent.target = figureAccentTarget;
scene.add(figureAccent);
scene.add(figureAccentTarget);
/* Relleno frío desde la izquierda para no dejar la piedra plana. */
const figureFill = new THREE.PointLight(0x9fb4d8, 0, 8, 1.8);
figureFill.position.set(-2.4, 1.4, -2.4);
scene.add(figureFill);

/* ────────────────────────────────
   Door light rig — spotlights dedicados (no reutiliza los de la moneda)
──────────────────────────────── */
const doorSpots = [];
function buildDoorSpots() {
  const S = CONFIG.door.spots;
  const doorLights = new THREE.Group();
  doorLights.name = 'doorLights';
  const make = (cfg) => {
    const sp = new THREE.SpotLight(cfg.color, cfg.intensity, cfg.distance, cfg.angle, cfg.penumbra, cfg.decay);
    sp.position.set(cfg.x, cfg.y, cfg.z);
    const t = new THREE.Object3D();
    t.position.set(cfg.tx, cfg.ty, cfg.tz);
    sp.target = t;
    doorLights.add(sp);
    doorLights.add(t);
    doorSpots.push(sp);
    return sp;
  };
  make(S.key);
  make(S.rim);
  make(S.under);
  scene.add(doorLights);
  doorLights.visible = false;
  return doorLights;
}
let doorLightGroup = buildDoorSpots();

/* Sombra de contacto suave (radial gradient) para la base de la puerta */
const shadowCanvas = document.createElement('canvas');
shadowCanvas.width = 256;
shadowCanvas.height = 256;
const sCtx = shadowCanvas.getContext('2d');
const grad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
grad.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.5)');
grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
sCtx.fillStyle = grad;
sCtx.fillRect(0, 0, 256, 256);
const shadowTex = new THREE.CanvasTexture(shadowCanvas);

/* Geometría 1×1 a propósito: applyDoorScale() la escala al tamaño real de la
   puerta, así que scale == tamaño en unidades de mundo (antes era un cuadrado
   fijo de 2.8 unidades que no seguía ni al modelo ni al viewport). */
const doorFloor = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.MultiplyBlending
  })
);
doorFloor.rotation.x = -Math.PI / 2;
doorFloor.position.set(0, 0, 0);
scene.add(doorFloor);

const coin = new THREE.Group();
scene.add(coin);

/* Cache de materiales: recorrer el grafo con traverse() y aplanar arrays en
   cada frame generaba ~120 arrays/seg para el GC. Se resuelve una sola vez. */
const coinMats = [];
let coinModel = null;
let coinScaleBase = 0;
let coinTargetPx = 0;
/* Caja de la moneda en pantalla, cacheada. getHeroCoinFrame() lee offsetTop
   del titular, o sea que fuerza layout: NO se puede llamar por frame. Se
   recalcula en applyCoinScale(), que ya corre en cada resize y en
   fonts.ready, y animate() lee esta copia. */
let heroCoinFrame = { diameter: 0, centerY: 0, band: null };

/* Basis de tamaño del layout: window.innerWidth/Height, como antes de la
   corrección de resize. visualViewport se usa SOLO como disparador de
   resize (barra URL/orientación), no como base de dimensiones: si se usara
   como base, la moneda y la puerta pasaban a renderizarse contra un
   viewport potencialmente más chico y quedaban mucho más pequeñas. */
function getViewportSize() {
  /* En emulación móvil, innerWidth/innerHeight pueden incluir el viewport
     visual grande del navegador (p. ej. 332×590 para un lienzo CSS de
     320×568). El DOM y visualViewport son la referencia que realmente ve
     el lector; usarla evita que renderer.setSize() cree 12px de overflow. */
  const root = document.documentElement;
  const visual = window.visualViewport;
  return {
    width: Math.max(root?.clientWidth || visual?.width || window.innerWidth, 1),
    height: Math.max(root?.clientHeight || visual?.height || window.innerHeight, 1),
  };
}

function getHeroTitleTop() {
  if (!heroTitle) return NaN;
  /* offsetTop ignora el y temporal que GSAP aplica al hacer scroll, por lo
     que el cálculo sigue apuntando al layout del hero aunque se redimensione
     la ventana desde otra sección. */
  return Number.isFinite(heroTitle.offsetTop)
    ? heroTitle.offsetTop
    : heroTitle.getBoundingClientRect().top + (window.scrollY || 0);
}

/* ── Composición del hero: la BANDA LIBRE ────────────────────────────
   El hueco real que queda entre la barra de marca y el titular. Todo lo
   demás del hero (diámetro de la moneda y su altura en pantalla) se deriva
   de aquí, así que la proporción es la misma en cualquier viewport.
   Ver el diagrama y el porqué en js/config.js → HERO. */
function getHeroBand() {
  const { width: w, height: h } = getViewportSize();
  const top = THREE.MathUtils.clamp(h * HERO.safeTopRatio, 56, 112);
  const titleTop = getHeroTitleTop();
  /* Si el título aún no ha maquetado (primer frame, fuentes sin cargar) se
     usa una estimación; refreshLayout() vuelve a llamar en fonts.ready. */
  const anchor = (Number.isFinite(titleTop) && titleTop > 0 && titleTop < h * 1.5)
    ? titleTop
    : h * 0.78;
  const bottom = anchor - Math.max(18, h * HERO.gapRatio);
  return { w, h, top, bottom, height: Math.max(0, bottom - top) };
}

/* Diámetro y centro de la moneda EN PÍXELES DE PANTALLA. Una sola función,
   una sola verdad: quien quiera saber dónde está la moneda pregunta aquí. */
function getHeroCoinFrame() {
  const band = getHeroBand();
  const { w, h } = band;

  if (!HERO_DOOR_LOCKUP) {
    /* Portada sin puerta: se conserva el encuadre histórico. */
    const fontPx = THREE.MathUtils.clamp(0.028 * w, 16, 34);
    const legacy = Math.min(
      Math.max(fontPx * 9, Math.min(w, h) * (isCompactWidth() ? 0.46 : 0.40)),
      Math.min(w * 0.5, 680),
      band.height > 0 ? band.height * 0.82 : Infinity
    );
    return { diameter: legacy, centerY: h * 0.41, band };
  }

  const diameter = Math.max(
    Math.min(w, h) * HERO.minSizeRatio,
    Math.min(
      band.height * HERO.fillRatio,
      w * HERO.coinWidthRatio,
      h * HERO.maxSizeRatio
    )
  );

  /* El centro va dentro de la banda; si la moneda no cabe (viewport
     bajísimo) se centra en la banda y el respiro se reparte solo. */
  const half = diameter / 2;
  const lo = band.top + half;
  const hi = band.bottom - half;
  const wanted = band.top + band.height * HERO.bandAnchor;
  const centerY = hi >= lo
    ? THREE.MathUtils.clamp(wanted, lo, hi)
    : (band.top + band.bottom) / 2;

  return { diameter, centerY, band };
}

function getResponsiveCoinTargetPx() {
  return getHeroCoinFrame().diameter;
}

function getResponsiveCoinScale() {
  const { height: h } = getViewportSize();
  const tanHalf = Math.tan((CONFIG.camera.fov * Math.PI) / 360);
  const dist = CONFIG.camera.z;
  const worldPxPerUnit = h / (2 * tanHalf * dist);
  return THREE.MathUtils.clamp(
    getResponsiveCoinTargetPx() / (CONFIG.coin.scale * worldPxPerUnit),
    0.25,
    HERO_DOOR_LOCKUP ? 3.4 : 1.8
  );
}

/* Altura de la moneda EN EL MUNDO 3D.
 *
 * OJO, ESTO NO MUEVE LA MONEDA EN PANTALLA. La cámara del hero apunta a
 * CONFIG.coin.baseY (ver el bloque `lockupCamMix` en animate()), así que
 * subir baseY sube la cámara con ella y la moneda se queda donde estaba.
 * Lo que sí cambia es la posición RELATIVA de todo lo demás que vive en
 * coordenadas de mundo: sobre todo la puerta, que se planta y luego se
 * interpola hacia coin.baseY.
 *
 * Quien quiera mover la moneda en pantalla tiene que ir a getHeroCoinFrame()
 * / HERO.bandAnchor. Este número decide a qué altura queda el vano de la
 * puerta detrás de ella.
 */
function getResponsiveCoinBaseY() {
  const { height: h } = getViewportSize();
  const centerY = h * (HERO_DOOR_LOCKUP ? HERO.centerYRatio : 0.41);
  const tanHalf = Math.tan((CONFIG.camera.fov * Math.PI) / 360);
  const worldPxPerUnit = h / (2 * tanHalf * CONFIG.camera.z);
  return THREE.MathUtils.clamp(
    camBaseY + (h * 0.5 - centerY) / worldPxPerUnit,
    0.15,
    2.5
  );
}

function applyCoinScale() {
  heroCoinFrame = getHeroCoinFrame();
  coinTargetPx = heroCoinFrame.diameter;
  if (coinModel && coinScaleBase) {
    coinModel.scale.setScalar(coinScaleBase * getResponsiveCoinScale());
  }
  CONFIG.coin.baseY = getResponsiveCoinBaseY();
}
/* Tamaño REAL de la moneda en unidades de mundo (su diámetro visible, ya con el
   factor responsive aplicado). Es la referencia con la que se dimensiona la
   puerta: comparar las dos figuras en el MISMO espacio es lo que las mantiene
   coherentes entre sí y entre viewports. */
function getCoinWorldSize() {
  return CONFIG.coin.scale * getResponsiveCoinScale();
}

/* Primer valor de la caja del hero, antes de que corra applyCoinScale(): sin
   esto la mira de la cámara arrancaría apuntando a centerY = 0 (el borde
   superior de la pantalla) durante los primeros frames. */
heroCoinFrame = getHeroCoinFrame();
coinTargetPx = heroCoinFrame.diameter;

/* Primera posición antes de que cargue el GLB; applyCoinScale() la recalcula
   al cargar fuentes, cambiar orientación o cambiar el viewport. */
CONFIG.coin.baseY = getResponsiveCoinBaseY();

const manager = new THREE.LoadingManager();
manager.onLoad = () => setTimeout(() => { if (renderer) loadEl.classList.add('hidden'); }, 300);
manager.onError = (url) => console.warn('Error cargando recurso:', url);

// Loading timeout - show helpful message if loading takes too long
setTimeout(() => {
  if (loadEl && !loadEl.classList.contains('hidden')) {
    loadEl.innerHTML = '<span style="opacity:.9">La carga est&aacute; tomando m&aacute;s tiempo del esperado. Verifique su conexi&oacute;n a internet.</span>';
  }
}, 15000);
/* Red de seguridad: si a los 30s nada terminó de cargar, liberar la página igual.
   (Antes el overlay bloqueaba la página para siempre si un GLB fallaba.) */
setTimeout(() => {
  if (loadEl && !loadEl.classList.contains('hidden')) loadEl.classList.add('hidden');
}, 30000);

const dracoLoader = new DRACOLoader();
/* Decodificador Draco LOCAL primero (js/vendor/draco/): el proyecto ya era
   offline-first (three.js, GSAP y D3 se sirven de js/), pero el decoder seguía
   saliendo al CDN de Google — si ese CDN era inalcanzable (red filtrada, sin
   conexión, preview aislada) los GLB no decodificaban y el sitio se quedaba
   sin moneda ni puerta. Cadena: local → gstatic → jsDelivr. */
dracoLoader.setDecoderPath('js/vendor/draco/');
try {
  fetch('js/vendor/draco/draco_wasm_wrapper.js', { method: 'HEAD' }).then((r) => {
    if (!r.ok) throw new Error('decoder local ausente');
  }).catch(() => {
    console.warn('Draco local no disponible — usando CDN gstatic');
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    /* Segundo respaldo: si el CDN primario no responde, mirror de jsDelivr
       (mismos decodificadores, versión three r160). */
    fetch('https://www.gstatic.com/draco/versioned/decoders/1.5.6/draco_wasm_wrapper.js', {
      method: 'HEAD', mode: 'no-cors', signal: AbortSignal.timeout ? AbortSignal.timeout(3500) : undefined,
    }).catch(() => {
      console.warn('Draco CDN primario no disponible — usando mirror jsDelivr');
      dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/');
    });
  });
} catch (e) { /* navegador sin fetch moderno: intenta con el decoder local igualmente */ }

const loader = new GLTFLoader(manager);
loader.setDRACOLoader(dracoLoader);
loader.load('monedav5-draco.glb', (gltf) => {
  const model = gltf.scene;
  /* El GLB se exportó con el disco en el plano Y-Z (su nodo raíz trae una
     rotación de +90° en X): sin corrección, el eje fino de la moneda queda
     en X y la cámara (en +Z) la ve DE CANTO en reposo, descuadrándose
     respecto a la aureola. Rotar el modelo -90° en Y lleva el eje fino a Z,
     es decir, la cara de la moneda mira a la cámara. El pivote es el centro
     geométrico (la traslación de centrado va en model.position, no en el
     giro), así que la proyección del halo no se altera. */
  model.rotation.y = -Math.PI / 2;
  const box = new THREE.Box3().setFromObject(model);
  if (!box.isEmpty()) {
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    const size = box.getSize(new THREE.Vector3());
    coinScaleBase = CONFIG.coin.scale / Math.max(size.x, size.y, size.z);
    coinModel = model;
    applyCoinScale();
  }
  model.traverse((object) => {
    if (!object.isMesh || !object.material) return;
    [object.material].flat().forEach((m) => {
      if (!m || !('metalness' in m)) return;
      m.side = THREE.FrontSide;
      m.metalness = CONFIG.coin.metalness;
      m.roughness = CONFIG.coin.roughness;
      m.envMapIntensity = CONFIG.coin.envMapIntensity;
      if (HERO_DOOR_LOCKUP) {
        m.emissiveIntensity = 0.14;
        m.envMapIntensity = 1.25;
      }
      m.needsUpdate = true;
      coinMats.push(m);
    });
  });
  coin.add(model);
}, undefined, (err) => {
  console.error('Error cargando GLB:', err);
  loadEl.innerHTML = '<span style="opacity:.9">No se pudo cargar la moneda</span>';
  setTimeout(() => loadEl.classList.add('hidden'), 1200);
});

/* ────────────────────────────────
   Door — Acto 2 (#stageObjective)
──────────────────────────────── */
const doorGroup = new THREE.Group();
scene.add(doorGroup);
doorGroup.visible = false;

/* La Sala (b1): luz cálida del INTERIOR de la sala. Vive siempre en la escena
   (intensity 0 hasta el cruce, así que en modo 'classic' no interviene).
   Se enciende cuando la cámara cruza el umbral y "ilumina" las voces. */
const roomLight = new THREE.PointLight(
  CONFIG.door?.roomLight?.color ?? 0xffbe73,
  0,
  16,
  1.8
);
roomLight.position.set(
  CONFIG.door?.roomLight?.x ?? 0,
  CONFIG.door?.roomLight?.y ?? 0.9,
  CONFIG.door?.roomLight?.z ?? -0.45
);
scene.add(roomLight);

/* Grupo intermedio dedicado a la escala de la puerta. Es imprescindible que
   la escala NO se aplique sobre el mismo Object3D al que se le hizo
   `position.sub(center)`: three.js compone `translate(position) × scale`,
   por lo que escalar el modelo desplazaría su centro a `(scale-1)·center`.
   Escalando un grupo padre en su lugar, la escala pivota alrededor del
   origen ya centrado (igual que la moneda, cuyo centro ≈ origen). */
const doorModelGroup = new THREE.Group();
doorGroup.add(doorModelGroup);

let doorModel = null;
const doorMats = [];
/* Huella del modelo en sus unidades originales (medida al cargar). Toda la
   escala de la puerta sale de applyDoorScale(), que es la ÚNICA fuente de
   tamaño: ancho objetivo = diámetro de la moneda × CONFIG.door.widthVsCoin. */
let doorFootprint = null;  // { width, depth } en unidades del modelo

function applyDoorScale() {
  if (!doorModel || !doorFootprint) return;
  const cfg = CONFIG.door;
  /* En ventanas muy anchas y bajas la moneda de referencia conserva un
     tamaño tipográfico que haría crecer demasiado la puerta en vertical.
     El límite solo actúa por encima de ~19:10; 16:9 y móvil no cambian. */
  const vp = getViewportSize();
  const aspect = vp.width / Math.max(vp.height, 1);
  const aspectFit = THREE.MathUtils.clamp(1.9 / aspect, 0.78, 1);
  const widthWorld = getCoinWorldSize() * (cfg.widthVsCoin ?? 1.4) * aspectFit;
  const s = widthWorld / Math.max(doorFootprint.width, 1e-3);
  /* Squash de profundidad calculado sobre la escala FINAL. Antes se medía con
     una escala intermedia que nunca se llegaba a usar, así que el valor de Z
     salía prácticamente al azar según el viewport. */
  const squash = THREE.MathUtils.clamp(cfg.doorDepthSquash ?? 1, 0.05, 1);
  const depthWorld = doorFootprint.depth * s * squash;
  const depthFix = Math.min(1, (cfg.maxDepthWorld ?? Infinity) / Math.max(depthWorld, 1e-6));
  doorModelGroup.scale.set(s, s, s * squash * depthFix);
  /* La sombra de contacto sigue a la puerta (en X y en Z), no es un cuadrado fijo. */
  doorFloor.scale.set(
    widthWorld * (cfg.shadowWidthMul ?? 1.3),
    depthWorld * depthFix * (cfg.shadowDepthMul ?? 2.2),
    1
  );
}

function applyDoorTextStyle() {
  const cfg = CONFIG.doorText;
  if (!cfg) return;
  const container = document.getElementById('stageObjectiveContainer');
  const title = document.getElementById('stageObjectiveTitle');
  const p = document.getElementById('stageObjectiveParagraph');
  if (container) {
    if (cfg.bottomOffset) container.style.paddingBottom = cfg.bottomOffset;
    if (cfg.horizontalOffset) container.style.transform = `translateX(${cfg.horizontalOffset})`;
  }
  if (title) {
    if (cfg.titleSize) title.style.fontSize = cfg.titleSize;
    if (cfg.gap) title.style.marginBottom = cfg.gap;
    title.style.color = 'var(--color-gold)';
    title.style.letterSpacing = '0.34em';
  }
  if (p) {
    if (cfg.textSize) p.style.fontSize = cfg.textSize;
    if (cfg.maxWidth) p.style.maxWidth = cfg.maxWidth;
    p.style.lineHeight = '1.38';
    p.style.fontWeight = '500';
  }
}
applyDoorTextStyle();

function makeDoorCanvasTexture(size, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}
function makeCarvedStoneMap() {
  return makeDoorCanvasTexture(512, (ctx, s) => {
    ctx.fillStyle = '#243044';
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 5200; i++) {
      const a = 0.04 + Math.random() * 0.16;
      ctx.fillStyle = Math.random() > 0.45
        ? `rgba(210,224,240,${a})`
        : `rgba(4,8,14,${a * 1.5})`;
      ctx.fillRect(Math.random() * s, Math.random() * s, 1 + Math.random() * 4, 1 + Math.random() * 3);
    }
    ctx.globalAlpha = 0.22;
    for (let y = 0; y < s; y += 28) {
      ctx.fillStyle = y % 56 === 0 ? '#121820' : '#3a4c62';
      ctx.fillRect(0, y, s, 2);
    }
    ctx.globalAlpha = 1;
  });
}
function makeMeanderMap() {
  return makeDoorCanvasTexture(256, (ctx, s) => {
    ctx.fillStyle = '#1a222e';
    ctx.fillRect(0, 0, s, s);
    ctx.strokeStyle = '#c5b48a';
    ctx.lineWidth = 9;
    ctx.lineJoin = 'miter';
    ctx.lineCap = 'square';
    const cell = 64;
    for (let y = 0; y < s; y += cell) {
      for (let x = 0; x < s; x += cell) {
        ctx.beginPath();
        ctx.moveTo(x + 8, y + 18);
        ctx.lineTo(x + 46, y + 18);
        ctx.lineTo(x + 46, y + 50);
        ctx.lineTo(x + 22, y + 50);
        ctx.lineTo(x + 22, y + 34);
        ctx.lineTo(x + 8, y + 34);
        ctx.closePath();
        ctx.stroke();
      }
    }
  });
}
const doorStoneMap = makeCarvedStoneMap();
doorStoneMap.repeat.set(2.4, 3.0);
const doorMeanderMap = makeMeanderMap();
doorMeanderMap.repeat.set(6, 8);
const doorLeafMats = [];
const doorLeafMeshes = [];
const doorFrameMats = [];
const doorLeafColorVoid = new THREE.Color('#07090f');
const doorLeafColorGold = new THREE.Color('#ffd76a');
const doorFrameColorHero = new THREE.Color('#6e7d92');
const doorFrameColorMeet = new THREE.Color('#3a4048');
const doorSpotKeyHero = new THREE.Color(0xd4e0f2);
const doorSpotKeyMeet = new THREE.Color(0xe8eef6);
const doorSpotRimHero = new THREE.Color(0x6e819c);
const doorSpotRimMeet = new THREE.Color(0x8a93a3);

const doorLoader = new GLTFLoader(manager);
doorLoader.setDRACOLoader(dracoLoader);
/* Base real de la puerta relativa al pivote, en unidades del modelo. Se usa
   para apoyar la puerta en CONFIG.door.groundY y para la sombra de contacto.
   Se recalcula al cargar el modelo; -1.15 es solo el valor de reserva. */
let doorBottomOffset = -1.15;
/* Techo (pórtico) relativo al pivote, mismas unidades. Junto con
   doorBottomOffset da el centro VISUAL de la figura completa, que es el punto
   de mira durante el dolly de cruce (ver animate — rama 'doorway'). */
let doorTopOffset = 1.15;
doorLoader.load('puerta-draco.glb', (gltf) => {
  const model = gltf.scene;
  /* Asegura que las transformaciones del GLB ya estén aplicadas al medirlo;
     de lo contrario el pivote puede quedar corrido según el navegador. */
  model.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(model);
  if (!box.isEmpty()) {
    /* Pivote = centro de las HOJAS de la puerta (mallas 'toroide'), no el
       centro del bounding box completo: el pórtico es asimétrico y corrida
       el centro geométrico, así que la puerta giraba/escalaba alrededor de
       un punto que no era su centro visual. */
    const leafBox = new THREE.Box3();
    model.traverse((o) => {
      if (o.isMesh && (o.name || '').toLowerCase().includes('toroide')) leafBox.expandByObject(o);
    });
    const pivotBox = leafBox.isEmpty() ? box : leafBox;
    const center = pivotBox.getCenter(new THREE.Vector3());
    /* El desplazamiento se calcula con el centro de las hojas y no con el
       centro del marco: así la rotación/parallax de doorGroup queda centrada
       en la parte visual que el usuario reconoce como la puerta. */
    model.position.sub(center);
    model.updateMatrixWorld(true);
    /* La huella que se dimensiona es el ANCHO TOTAL del conjunto (pórtico +
       escalones), que es lo que el ojo lee como "la puerta". Gobernar solo las
       hojas (como hacía la versión anterior) hacía que el pórtico midiera ~2×
       más de lo que el knob prometía. */
    const wholeSize = box.getSize(new THREE.Vector3());
    doorFootprint = { width: Math.max(wholeSize.x, 1e-3), depth: Math.max(wholeSize.z, 1e-3) };
    /* Base del modelo (escalones) relativa al pivote: sirve para apoyar la
       puerta en CONFIG.door.groundY y para pegar ahí la sombra de contacto. */
    doorBottomOffset = box.min.y - center.y;
    doorTopOffset = box.max.y - center.y;
    doorModel = model;
    applyDoorScale();
  }
  model.traverse((object) => {
    if (!object.isMesh || !object.material) return;
    const name = (object.name || '').toLowerCase();
    // Toroide.001 son las hojas de la puerta; Cubo es el marco/pórtico exterior
    const isDoorLeaf = name.includes('toroide');
    if (isDoorLeaf) {
      doorLeafMeshes.push(object);
      if (HERO_DOOR_LOCKUP) object.visible = false;
    }
    [object.material].flat().forEach((m) => {
      if (!m || !('metalness' in m)) return;
      m.side = THREE.FrontSide;
      if (isDoorLeaf) {
        if (HERO_DOOR_LOCKUP) {
          /* Vano del still: las hojas se apagan a noche. El oro vuelve en el acto 2. */
          m.color.copy(doorLeafColorVoid);
          m.metalness = 0.12;
          m.roughness = 0.92;
          m.envMapIntensity = 0.12;
          if (!m.emissive) m.emissive = new THREE.Color();
          m.emissive.set('#000000');
          m.emissiveIntensity = 0;
          doorLeafMats.push(m);
        } else {
          m.color.set('#ffd76a');
          m.metalness = 1.0;
          m.roughness = 0.22;
          m.envMapIntensity = 1.3;
          if (!m.emissive) m.emissive = new THREE.Color();
          m.emissive.set('#3d2508');
          m.emissiveIntensity = 0.05;
        }
      } else if (HERO_DOOR_LOCKUP) {
        m.color.copy(doorFrameColorHero);
        m.metalness = 0.08;
        m.roughness = 0.88;
        m.map = doorStoneMap;
        m.bumpMap = doorStoneMap;
        m.bumpScale = 0.045;
        m.envMapIntensity = 0.28;
        if (!m.emissive) m.emissive = new THREE.Color();
        m.emissive.set('#000000');
        m.emissiveIntensity = 0;
        doorFrameMats.push(m);
      } else {
        m.color.set('#0d0f16');
        m.metalness = 0.15;
        m.roughness = 0.75;
        m.envMapIntensity = 0.3;
        if (!m.emissive) m.emissive = new THREE.Color();
        m.emissive.set('#000000');
        m.emissiveIntensity = 0;
      }
      m.needsUpdate = true;
      doorMats.push(m);
    });
  });
  doorModelGroup.add(model);
  if (HERO_DOOR_LOCKUP) {
    const voidMat = new THREE.MeshBasicMaterial({ color: 0x05070c, side: THREE.DoubleSide });
    const voidPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 2.05), voidMat);
    voidPlane.position.set(0, 0.02, -0.22);
    doorModelGroup.add(voidPlane);
    doorMats.push(voidMat);
    /* Sin polvo dorado en el vano: en el still de portada era ruido
       extra sobre la moneda y la piedra. */
  }
}, undefined, (err) => {
  console.error('Error cargando GLB:', err);
  loadEl.innerHTML = '<span style="opacity:.9">No se pudo cargar la puerta</span>';
  setTimeout(() => loadEl.classList.add('hidden'), 1200);
});

const clock = new THREE.Clock();
const C = CONFIG.coin;
let coinBirth = -1;
let mouseX = 0, mouseY = 0, smoothMouseX = 0, smoothMouseY = 0;
let lastPointerX = 0, lastPointerY = 0;
let isDragging = false, dragStartX = 0, dragStartY = 0, dragRotY = 0, dragRotX = 0;

function onPointerMove(cx, cy) {
  const vp = getViewportSize();
  mouseX = (cx / vp.width) * 2 - 1;
  mouseY = (cy / vp.height) * 2 - 1;
  if (isDragging) { dragRotY += (cx - dragStartX) * 0.005; dragRotX += (cy - dragStartY) * 0.005; dragStartX = cx; dragStartY = cy; }
}
function onPointerDown(cx, cy) { isDragging = true; dragStartX = cx; dragStartY = cy; }
function onPointerUp() { isDragging = false; }

/* Interacción global (no sobre el canvas, que está con pointer-events:none):
   así las partículas de fondo se pueden presionar en cualquier sección sin
   bloquear el contenido ni el scroll. En touch sólo se usa pointerdown para
   fijar el panel; el hover queda reservado al mouse. */
const isInteractiveTarget = (e) => !!(e.target && e.target.closest &&
  e.target.closest('a, button, .quote-card, .signal-card, [data-quote], #quotePanel, #timelineContainer, .closing-cta, .jargon-term, .axes-data-mark, .voice-explorer, .voice-card, .voice-detail, .voice-profile-panel, .acts-browser, .act-list-item, .act-term-chip, .act-evidence-row, .act-open-evidence'));
window.addEventListener('pointermove', (e) => {
  if (e.pointerType === 'touch' || isInteractiveTarget(e)) return;
  lastPointerX = e.clientX;
  lastPointerY = e.clientY;
  onPointerMove(e.clientX, e.clientY);
});
window.addEventListener('pointerdown', (e) => {
  /* No robar el click de tarjetas, botones, links ni del panel abierto. */
  if (isInteractiveTarget(e)) return;
  onPointerDown(e.clientX, e.clientY, e);
});
window.addEventListener('pointerup', onPointerUp);
window.addEventListener('pointercancel', onPointerUp);
window.addEventListener('blur', onPointerUp);
document.addEventListener('visibilitychange', onPointerUp);

const projectedPos = new THREE.Vector3();

/* ────────────────────────────────
   Enjambre de partículas — memoria trazable
   La misma geometría acompaña los estados narrativos; al llegar al plano,
   los puntos conservan color y separación en vez de quemarse en un disco de
   luz aditivo.
──────────────────────────────── */
const quotes = (window.QUOTES || []).slice();
const swarm = new THREE.Group();
scene.add(swarm);
const QUOTES_N = Math.max(quotes.length, 0);

const PCOUNT = QUOTES_N || 1;
const pPos = new Float32Array(PCOUNT * 3);
const pOriginalPos = new Float32Array(PCOUNT * 3);
const pScatterPos = new Float32Array(PCOUNT * 3);
/* Targets narrativos: una misma partícula puede pasar de memoria a plano,
   voz, acta o timeline sin crear otra geometría. Todos se rellenan después
   de construir las escalas D3. */
const pAxisPos = new Float32Array(PCOUNT * 3);
const pVoiceFocusPos = new Float32Array(PCOUNT * 3);
const pActFocusPos = new Float32Array(PCOUNT * 3);
const pTimelinePos = new Float32Array(PCOUNT * 3);
const pColors = new Float32Array(PCOUNT * 3);
const pParticipantRank = new Int16Array(PCOUNT);
const pParticipantCount = new Int16Array(PCOUNT);
const pActRank = new Int16Array(PCOUNT);
const pActCount = new Int16Array(PCOUNT);
const pActKeys = quotes.map((q) => {
  const yearMatch = String(q?.date || '').match(/^(\d{4})/);
  const year = yearMatch ? Number(yearMatch[1]) : Number(q?.year);
  return /^\d{4}-\d{2}-\d{2}$/.test(String(q?.date || ''))
    ? q.date
    : `${Number.isFinite(year) ? year : 0}-01-01`;
});

const colorHawkish = new THREE.Color(0xffd76a); // Oro / Hawkish
const colorDovish  = new THREE.Color(0x8ab4f8); // Azul suave / Dovish
const colorNeutral = new THREE.Color(0xcfd6e4); // Plata / Neutral

for (let i = 0; i < PCOUNT; i++) {
  const q = quotes[i];
  const label = q ? q.label : 'neutral';
  let c = colorNeutral;
  if (label === 'hawkish') c = colorHawkish;
  else if (label === 'dovish') c = colorDovish;

  pColors[i * 3 + 0] = c.r;
  pColors[i * 3 + 1] = c.g;
  pColors[i * 3 + 2] = c.b;

  const ang = (i / PCOUNT) * Math.PI * 2 + (particleRandom(i, 1) - 0.5) * 0.5;
  const radius = 2.1 + particleRandom(i, 2) * 1.5;
  const yOff = (particleRandom(i, 3) - 0.5) * 1.6;
  
  const ox = Math.cos(ang) * radius;
  const oy = yOff;
  const oz = Math.sin(ang) * radius;

  pOriginalPos[i * 3 + 0] = ox;
  pOriginalPos[i * 3 + 1] = oy;
  pOriginalPos[i * 3 + 2] = oz;

  pPos[i * 3 + 0] = ox;
  pPos[i * 3 + 1] = oy;
  pPos[i * 3 + 2] = oz;

  const scatterAng = particleRandom(i, 4) * Math.PI * 2;
  const scatterRad = 3.8 + particleRandom(i, 5) * 5.5;
  pScatterPos[i * 3 + 0] = Math.cos(scatterAng) * scatterRad;
  pScatterPos[i * 3 + 1] = (particleRandom(i, 6) - 0.5) * 6.5;
  pScatterPos[i * 3 + 2] = (particleRandom(i, 7) - 0.5) * 4.5 - 1.0;
}



const totalQuotes = quotes.length;
const uniqueParticipants = new Set(quotes.map(q => q.participant)).size;
/* Reparto por tono. La leyenda de La Sala (35 hawkish / 35 dovish / …) se
   quitó para dejar la sección más limpia; el reparto se conserva porque lo
   usan otras lecturas del proyecto. */
const particleToneCounts = quotes.reduce((counts, q) => {
  const tone = ['hawkish', 'dovish', 'neutral'].includes(q?.label) ? q.label : 'neutral';
  counts[tone] += 1;
  return counts;
}, { hawkish: 0, dovish: 0, neutral: 0 });
const counterItems = document.querySelectorAll('[data-counter]');
if (counterItems.length >= 4) {
  counterItems[2].querySelector('.counter-number').dataset.target = totalQuotes.toString();
  counterItems[3].querySelector('.counter-number').dataset.target = uniqueParticipants.toString();
}

function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  grad.addColorStop(0.7, 'rgba(255,255,255,0.2)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  /* Canvas 2D deja RGB negro en los píxeles transparentes. Con
     NormalBlending eso puede producir pequeños halos negros sobre el fondo
     oscuro aunque la partícula sea dorada o azul. Conservamos RGB blanco
     en el borde y dejamos que el alfa controle únicamente la intensidad. */
  const pixels = ctx.getImageData(0, 0, 64, 64);
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = 255;
    pixels.data[i + 1] = 255;
    pixels.data[i + 2] = 255;
  }
  ctx.putImageData(pixels, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

let sharedTexture = null;
function getParticleTexture() {
  if (!sharedTexture) sharedTexture = createParticleTexture();
  return sharedTexture;
}

const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
/* El enjambre cambia de radio al dispersarse. Un bounding sphere estable
   evita que el raycaster conserve la caja pequeña del estado inicial y deje
   fuera los puntos lejanos del estado de memoria. */
pGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);

const pMat = new THREE.PointsMaterial({
  size: 0.14,
  sizeAttenuation: true,
  vertexColors: true,
  map: getParticleTexture(),
  transparent: true,
  alphaTest: 0.06,
  opacity: 0.82,
  blending: THREE.NormalBlending,
  depthTest: false,
  depthWrite: false,
  fog: false,
});
const points = new THREE.Points(pGeo, pMat);
swarm.add(points);

/* ═══════════════════════════════════════════════════════════
   ÓRBITAS DE LA SALA — fragmentos que giran sobre el eje de la figura
   y dejan estela.

   Qué es: unos pocos fragmentos REALES (no decoración: cada uno es una
   cita del corpus, con su tono) girando alrededor del eje vertical de la
   estatua en planos inclinados distintos. Cada uno arrastra una cola que
   se apaga hacia atrás, así el ojo lee el RECORRIDO y no solo el punto.

   Cómo: la posición es analítica —función del tiempo—, así que la estela
   se calcula muestreando el pasado (t − k·trailStep) en vez de guardar un
   historial. Ventajas: la cola mide siempre el mismo arco (no depende de
   los FPS), no hay saltos al cambiar de pestaña y el coste es trivial
   (12 × 58 puntos por frame, un solo draw call).

   Todo vive en un único THREE.Points con atributos por vértice
   (color, tamaño y opacidad), con blending aditivo: el oro y el azul
   "encienden" el navy sin halos negros.
═══════════════════════════════════════════════════════════ */
const ORB = CONFIG.room?.orbit ?? {};
const ORB_N = Math.max(0, ORB.count ?? 12);
const ORB_T = Math.max(2, ORB.trail ?? 58);
const ORB_TOTAL = ORB_N * ORB_T;

/* Los fragmentos en órbita se reparten por tono (hawkish / dovish /
   neutral) y se toman espaciados dentro de cada grupo, para que no salgan
   cuatro citas seguidas del mismo año. */
const orbitQuoteIndex = [];
{
  const pools = { hawkish: [], dovish: [], neutral: [] };
  quotes.forEach((q, i) => {
    const tone = ['hawkish', 'dovish', 'neutral'].includes(q?.label) ? q.label : 'neutral';
    pools[tone].push(i);
  });
  const tones = ['hawkish', 'dovish', 'neutral'];
  for (let k = 0; orbitQuoteIndex.length < ORB_N && k < ORB_N * 3; k++) {
    const pool = pools[tones[k % 3]];
    if (!pool.length) continue;
    const step = Math.floor(k / 3);
    const pick = pool[Math.round((step + 0.5) * (pool.length / Math.max(1, Math.ceil(ORB_N / 3)))) % pool.length];
    if (pick != null) orbitQuoteIndex.push(pick);
  }
}

const orbitGroup = new THREE.Group();
orbitGroup.name = 'roomOrbitals';
orbitGroup.position.set(CONFIG.room?.figure?.x ?? 0, 0, CONFIG.room?.figure?.z ?? -4.8);
orbitGroup.visible = false;
scene.add(orbitGroup);

/* Parámetros de cada órbita: deterministas (mismo hash que la nube), así
   la coreografía es idéntica en cada carga y se puede afinar a ojo. */
const orbitParams = orbitQuoteIndex.map((qIndex, i) => {
  const rMin = ORB.minRadius ?? 0.46;
  const r = rMin + particleRandom(i, 11) * ((ORB.maxRadius ?? 0.95) - rMin);
  const tilt = THREE.MathUtils.degToRad((particleRandom(i, 12) - 0.5) * 2 * (ORB.tilt ?? 34));
  return {
    quoteIndex: qIndex,
    radius: r,
    ecc: 0.86 + particleRandom(i, 13) * 0.26,          // órbitas levemente elípticas
    y: (ORB.minY ?? 0.26) + particleRandom(i, 14) * ((ORB.maxY ?? 1.14) - (ORB.minY ?? 0.26)),
    tilt,
    node: particleRandom(i, 15) * Math.PI * 2,          // rotación del plano orbital
    phase: particleRandom(i, 16) * Math.PI * 2,
    /* Kepler de mentira: las órbitas cercanas giran más rápido. Da la
       sensación de sistema y evita que los 12 puntos vayan sincronizados. */
    speed: (ORB.speed ?? 0.24) / Math.pow(r / 0.6, 1.15) * (particleRandom(i, 17) > 0.5 ? 1 : -1),
    bob: 0.05 + particleRandom(i, 18) * 0.07,
  };
});

const orbitPos = new Float32Array(ORB_TOTAL * 3);
const orbitColor = new Float32Array(ORB_TOTAL * 3);
const orbitSize = new Float32Array(ORB_TOTAL);
const orbitFade = new Float32Array(ORB_TOTAL);
const orbitOwner = new Float32Array(ORB_TOTAL);

orbitParams.forEach((p, i) => {
  const q = quotes[p.quoteIndex];
  const tone = ['hawkish', 'dovish', 'neutral'].includes(q?.label) ? q.label : 'neutral';
  const c = tone === 'hawkish' ? colorHawkish : tone === 'dovish' ? colorDovish : colorNeutral;
  /* El plata neutral, sumado en aditivo sobre el navy, se va a blanco puro
     y se come al oro y al azul. Se atenúa solo en las órbitas: la nube y la
     leyenda conservan su color. */
  const dim = tone === 'neutral' ? (ORB.neutralDim ?? 0.78) : 1;
  for (let k = 0; k < ORB_T; k++) {
    const n = i * ORB_T + k;
    orbitColor[n * 3 + 0] = c.r * dim;
    orbitColor[n * 3 + 1] = c.g * dim;
    orbitColor[n * 3 + 2] = c.b * dim;
    orbitOwner[n] = i;
    if (k === 0) {
      orbitSize[n] = ORB.headSize ?? 0.175;
      orbitFade[n] = 1.0;
    } else {
      const t = 1 - (k - 1) / Math.max(1, ORB_T - 2);   // 1 = cerca de la cabeza
      orbitSize[n] = (ORB.tailSize ?? 0.095) * (0.34 + 0.66 * t);
      orbitFade[n] = Math.pow(t, 1.65) * 0.72;
    }
  }
});

const orbitGeo = new THREE.BufferGeometry();
orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPos, 3));
orbitGeo.setAttribute('aColor', new THREE.BufferAttribute(orbitColor, 3));
orbitGeo.setAttribute('aSize', new THREE.BufferAttribute(orbitSize, 1));
orbitGeo.setAttribute('aFade', new THREE.BufferAttribute(orbitFade, 1));
orbitGeo.setAttribute('aOwner', new THREE.BufferAttribute(orbitOwner, 1));
orbitGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0.7, 0), 2.4);

const orbitMat = new THREE.ShaderMaterial({
  uniforms: {
    uMap: { value: getParticleTexture() },
    uOpacity: { value: 0 },
    /* `uScale` replica el factor de THREE.PointsMaterial (alto del buffer
       de dibujo / 2): sin él los puntos cambiarían de tamaño al
       redimensionar o al cambiar el devicePixelRatio. */
    uScale: { value: 450 },
    uFocus: { value: -1 },
  },
  vertexShader: `
    attribute float aSize;
    attribute float aFade;
    attribute float aOwner;
    attribute vec3 aColor;
    uniform float uScale;
    uniform float uFocus;
    varying vec3 vColor;
    varying float vFade;
    void main() {
      /* 1.0 solo en el fragmento con la cita activa (hover / fijada) */
      float focus = 1.0 - step(0.5, abs(aOwner - uFocus));
      vColor = mix(aColor, min(aColor * 1.55 + 0.16, vec3(1.0)), focus);
      vFade = aFade * (1.0 + 0.45 * focus);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * (1.0 + 0.35 * focus) * (uScale / max(-mv.z, 0.001));
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform sampler2D uMap;
    uniform float uOpacity;
    varying vec3 vColor;
    varying float vFade;
    void main() {
      float a = texture2D(uMap, gl_PointCoord).a * vFade * uOpacity;
      if (a < 0.004) discard;
      gl_FragColor = vec4(vColor, a);
      /* Un ShaderMaterial no aplica solo el tone mapping ni la conversión
         de espacio de color: sin estas dos líneas el oro y el azul de las
         estelas no coincidirían con los de la nube de partículas. */
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
  transparent: true,
  /* depthTest SÍ (a diferencia de la nube): cuando un fragmento pasa por
     DETRÁS de la estatua queda oculto, y eso es justo lo que vende el giro
     alrededor del eje. depthWrite no, para que las estelas se sumen entre
     ellas sin recortarse. */
  depthTest: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const orbitPoints = new THREE.Points(orbitGeo, orbitMat);
orbitPoints.frustumCulled = false;
orbitGroup.add(orbitPoints);

function syncOrbitPointScale() {
  if (!renderer) return;
  const size = renderer.getSize(new THREE.Vector2());
  orbitMat.uniforms.uScale.value = (size.y * renderer.getPixelRatio()) * 0.5;
}
syncOrbitPointScale();

const _orbV = new THREE.Vector3();
function orbitSample(p, t, out) {
  const th = p.phase + p.speed * t;
  const node = p.node + (ORB.precession ?? 0.028) * t;
  const lx = Math.cos(th) * p.radius;
  const lz = Math.sin(th) * p.radius * p.ecc;
  /* inclinación del plano (giro en X) y luego orientación del plano (giro en Y) */
  const ct = Math.cos(p.tilt), st = Math.sin(p.tilt);
  const y2 = -lz * st;
  const z2 = lz * ct;
  const cn = Math.cos(node), sn = Math.sin(node);
  out.set(
    lx * cn + z2 * sn,
    p.y + y2 + Math.sin(t * 0.5 + p.phase) * p.bob,
    -lx * sn + z2 * cn
  );
  return out;
}

/* mix: 0 = fuera de la sala (apagadas) · 1 = sala revelada */
let orbitMix = 0;
function updateOrbitals(t, mix) {
  orbitMix = mix;
  orbitMat.uniforms.uOpacity.value = mix * (ORB.opacity ?? 0.95);
  /* El mismo umbral que usa `pickPoint` para aceptar hits en las órbitas:
     la lista de teclado aparece exactamente cuando las voces son
     alcanzables con el puntero. */
  setRoomVoiceNavActive(mix > 0.35 && ORB_N > 0);
  if (mix < 0.004 || ORB_N === 0) {
    orbitGroup.visible = false;
    return;
  }
  orbitGroup.visible = true;
  const step = ORB.trailStep ?? 0.07;
  for (let i = 0; i < ORB_N; i++) {
    const p = orbitParams[i];
    for (let k = 0; k < ORB_T; k++) {
      orbitSample(p, t - k * step, _orbV);
      const n = (i * ORB_T + k) * 3;
      orbitPos[n] = _orbV.x;
      orbitPos[n + 1] = _orbV.y;
      orbitPos[n + 2] = _orbV.z;
    }
  }
  orbitGeo.attributes.position.needsUpdate = true;
}

/* ─── Equivalente de teclado de las órbitas ───────────────────
   Las partículas solo se pueden "tocar" con un raycast desde el puntero.
   Esta lista de botones (ver #roomVoiceNav en el HTML) da a cada orbitador
   una representación real en el DOM: enfocable, anunciable y con el mismo
   efecto que el hover. Es el mismo patrón que ya usan las marcas del
   gráfico D3 (`.axes-data-mark` con tabindex="0"). */
const roomVoiceNav = document.getElementById('roomVoiceNav');
const roomVoiceNavList = document.getElementById('roomVoiceNavList');
let roomVoiceNavOn = null;

function initRoomVoiceNav() {
  if (!roomVoiceNav || !roomVoiceNavList || orbitParams.length === 0) return;
  const frag = document.createDocumentFragment();
  orbitParams.forEach((p, i) => {
    const q = quotes[p.quoteIndex];
    if (!q) return;
    const li = document.createElement('li');
    li.className = 'room-voice-nav-item';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'room-voice-btn';
    btn.dataset.quoteIndex = String(p.quoteIndex);
    btn.dataset.tone = q.label || 'neutral';
    const who = q.participant || 'Participante anónimo';
    const when = q.formatted_date || q.date || (q.year ? 'Año ' + q.year : 'fecha no especificada');
    const tone = q.label || 'neutral';
    btn.appendChild(document.createTextNode(who));
    const meta = document.createElement('span');
    meta.className = 'room-voice-meta';
    meta.textContent = `${when} · ${tone}`;
    btn.appendChild(meta);
    /* Sin aria-label el nombre accesible sale pegado ("Céspedes13 de
       Mayo"): el <span> es de bloque a la vista, pero se concatena sin
       separador en el árbol de accesibilidad. */
    btn.setAttribute('aria-label', `${who}, ${when}, tono ${tone}. Abrir la cita.`);
    /* Enfocar = "pasar el cursor": abre la cita sin robar el foco, para que
       se pueda recorrer la lista entera con el tabulador. */
    btn.addEventListener('focus', () => {
      hoverIndex = p.quoteIndex;
      syncQuotePanel();
    });
    /* Activar = "fijar": abre la cita y lleva el foco al panel para leerla;
       al cerrarlo (✕ o Escape) el foco vuelve a este botón. */
    btn.addEventListener('click', () => {
      pinnedIndex = p.quoteIndex;
      lastFocusedCard = btn;
      openQuote(p.quoteIndex, btn.getBoundingClientRect());
      const closeBtn = document.getElementById('quotePanelClose');
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    });
    li.appendChild(btn);
    frag.appendChild(li);
  });
  roomVoiceNavList.appendChild(frag);
  /* Al salir de la lista con el tabulador, el "peek" se retira igual que
     cuando el cursor abandona la nube. */
  roomVoiceNav.addEventListener('focusout', (e) => {
    if (roomVoiceNav.contains(e.relatedTarget)) return;
    if (pinnedIndex >= 0) return;
    hoverIndex = -1;
    syncQuotePanel();
  });
}

/* La lista solo debe existir en el orden de tabulación mientras La Sala
   está en pantalla: fuera de ella serían 12 paradas sin contexto. */
function setRoomVoiceNavActive(on) {
  if (!roomVoiceNav || on === roomVoiceNavOn) return;
  roomVoiceNavOn = on;
  if (!on && roomVoiceNav.contains(document.activeElement)) {
    document.activeElement.blur();
  }
  roomVoiceNav.hidden = !on;
}

initRoomVoiceNav();

/* Devuelve el índice del orbitador cuya cita está activa (hover o fijada),
   para que el shader la resalte. -1 = ninguno. */
function orbitFocusOwner() {
  if (typeof activeParticleFocus !== 'number' || activeParticleFocus < 0) return -1;
  for (let i = 0; i < orbitParams.length; i++) {
    if (orbitParams[i].quoteIndex === activeParticleFocus) return i;
  }
  return -1;
}

const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
const _pickProjected = new THREE.Vector3();

/* El threshold de THREE.Points se interpreta en unidades de mundo y no se
   ajusta solo al tamaño de la partícula. Se fija aquí en cada consulta,
   escalado con swarm.scale (igual que el tamaño visual del enjambre).
   Ver https://github.com/mrdoob/three.js/issues/26235 y
   https://discourse.threejs.org/t/hover-functionality-with-three-points-and-raycaster/53978 */
function setPickThreshold() {
  const base = CONFIG.interaction?.hoverRadius ?? 0.075;
  const s = swarm.scale?.x || 1;
  raycaster.params.Points.threshold = base * s;
}

function pickPoint(cx, cy) {
  if (!QUOTES_N) return -1;
  const vp = getViewportSize();
  setPickThreshold();
  ndc.x = (cx / vp.width) * 2 - 1;
  ndc.y = -(cy / vp.height) * 2 + 1;
  raycaster.setFromCamera(ndc, camera);
  const hits = raycaster.intersectObject(points, false);
  /* Los fragmentos en órbita alrededor de la estatua también son citas:
     se pueden pasar con el cursor igual que la nube. Se consultan con el
     mismo threshold y compiten por cercanía en pantalla; solo cuando las
     órbitas están encendidas. */
  const orbitHits = (orbitMix > 0.35 && orbitGroup.visible)
    ? raycaster.intersectObject(orbitPoints, false)
    : [];
  if (hits.length === 0 && orbitHits.length === 0) return -1;
  /* Entre varios aciertos, elegir el más cercano al puntero en pantalla:
     si el threshold es amplio, el primer hit suele ser el más cercano a la
     cámara, no necesariamente el que está bajo el cursor. */
  let best = -1, bestDist = Infinity;
  const consider = (hit, index) => {
    _pickProjected.copy(hit.point).project(camera);
    const sx = (_pickProjected.x * 0.5 + 0.5) * vp.width;
    const sy = (-_pickProjected.y * 0.5 + 0.5) * vp.height;
    const dx = sx - cx, dy = sy - cy;
    const d = dx * dx + dy * dy;
    if (d < bestDist) { bestDist = d; best = index; }
  };
  for (let h = 0; h < hits.length; h++) consider(hits[h], hits[h].index);
  for (let h = 0; h < orbitHits.length; h++) {
    const owner = Math.floor(orbitHits[h].index / ORB_T);
    const qIndex = orbitParams[owner]?.quoteIndex;
    if (qIndex == null) continue;
    consider(orbitHits[h], qIndex);
  }
  return best;
}

/* Posicionamiento del panel: en desktop sigue al punto donde se abrió
   (cursor o tarjeta) en lugar de quedar siempre pegado a la derecha, y se
   corrige para no salirse del viewport. En móvil se usa el layout inferior
   de la media query. */
function positionQuotePanel(anchor) {
  const panelEl = document.getElementById('quotePanel');
  if (!panelEl) return;
  if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
    panelEl.style.left = '';
    panelEl.style.top = '';
    panelEl.style.right = '';
    return;
  }
  const vp = getViewportSize();
  const w = panelEl.offsetWidth || 380;
  const h = panelEl.offsetHeight || 220;
  const margin = 16;
  const ax = anchor && typeof anchor.x === 'number' ? anchor.x : lastPointerX;
  const ay = anchor && typeof anchor.y === 'number' ? anchor.y : lastPointerY;
  let left = ax + 22;
  let top = ay - h / 2;
  if (left + w > vp.width - margin) left = ax - w - 22;
  if (left < margin) left = margin;
  top = THREE.MathUtils.clamp(top, margin, Math.max(margin, vp.height - h - margin));
  panelEl.style.left = left + 'px';
  panelEl.style.top = top + 'px';
  panelEl.style.right = 'auto';
}

function syncAxesMarkFocus(index) {
  document.querySelectorAll('.axes-data-mark.is-focus').forEach((mark) => mark.classList.remove('is-focus'));
  if (index < 0) return;
  const mark = document.querySelector(`#d3-canvas .axes-data-mark[data-quote-index="${index}"]`);
  if (mark) mark.classList.add('is-focus');
}

/* ═══════════════════════════════════════════════════════════
   AUDIO / MÚSICA: DESACTIVADO POR DECISIÓN DEL AUTOR (por ahora).
   Se quita el motor de tonos y el botón de sonido. Si más adelante se
   quiere retomar, la carpeta `js/audio/` y `PLAN_NIVEL_PREMIUM.md`
   documentan cómo hacerlo sin música clásica.
═══════════════════════════════════════════════════════════ */

function openQuote(i, anchor) {
  const q = quotes[i];
  if (!q) return;
  activeParticleFocus = i;
  syncAxesMarkFocus(i);
  document.getElementById('qpWho').textContent = q.participant || 'Participante anónimo';
  const tag = document.getElementById('qpTag');
  tag.textContent = (q.label || 'neutral').charAt(0).toUpperCase() + (q.label || 'neutral').slice(1);
  tag.className = 'tag ' + (q.label || 'neutral');
  document.getElementById('qpWhen').textContent = q.formatted_date || q.date || 'Fecha no especificada';
  document.getElementById('qpText').textContent = '\u201C' + (q.text || 'Sin texto disponible') + '\u201D';
  const sourceLink = document.getElementById('qpSource');
  if (sourceLink) {
    const sourceDate = q.formatted_date || q.date || q.year || 'fecha no especificada';
    sourceLink.textContent = q.source ? `Fuente: ${q.source}` : `Contexto de maqueta · ${sourceDate}`;
    sourceLink.href = q.source_url || '#stageActs';
    if (q.source_url) {
      sourceLink.target = '_blank';
      sourceLink.rel = 'noreferrer';
    } else {
      sourceLink.removeAttribute('target');
      sourceLink.removeAttribute('rel');
    }
  }
  document.getElementById('qpYear').textContent = q.year ? 'Año ' + q.year : 'Año no especificado';
  /* Puntuación hawk/dov del clasificador. En maqueta: valor de referencia 0–1
     determinístico (ver js/quotes.js); el dato real la reemplaza al llegar. */
  const scoreRow = document.getElementById('qpScore');
  if (scoreRow) {
    const sc = (typeof q.score === 'number') ? q.score : null;
    if (sc == null) {
      scoreRow.style.display = 'none';
    } else {
      scoreRow.style.display = 'flex';
      document.getElementById('qpScoreBar').style.width = (THREE.MathUtils.clamp(sc, 0, 1) * 100).toFixed(0) + '%';
      document.getElementById('qpScoreVal').textContent = sc.toFixed(2);
    }
  }
  const quotePanel = document.getElementById('quotePanel');
  quotePanel.hidden = false;
  quotePanel.setAttribute('aria-hidden', 'false');
  quotePanel.classList.add('visible');
  positionQuotePanel(anchor);
  if (lastFocusedCard && document.activeElement === lastFocusedCard) {
    document.getElementById('quotePanelClose').focus({ preventScroll: true });
  }
}

let hoveredPoint = false;
let lastHoverAt = 0;
/* Partículas: HOVER → panel "peek" (se cierra al salir); CLICK → panel
   fijado (pin, se cierra con ✕/Escape). */
let hoverIndex = -1;
let pinnedIndex = -1;
let hoverTimer = null;
let activeParticleFocus = -1;

function syncQuotePanel() {
  const idx = pinnedIndex >= 0 ? pinnedIndex : hoverIndex;
  if (idx >= 0) openQuote(idx);
  else closeQuotePanel();
}

function pointerOverPanel(cx, cy) {
  if (!quotePanelEl.classList.contains('visible')) return false;
  const r = quotePanelEl.getBoundingClientRect();
  return cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
}

function updateHover(cx, cy) {
  const now = performance.now();
  if (now - lastHoverAt < 32) return;
  lastHoverAt = now;
  const hitIdx = pickPoint(cx, cy);
  const hasHit = hitIdx >= 0;
  if (hasHit !== hoveredPoint) {
    hoveredPoint = hasHit;
    document.body.style.cursor = hasHit ? 'pointer' : (currentStage === 1 ? 'grab' : '');
  }
  if (pinnedIndex >= 0) return;          // panel fijado: el hover no lo toca
  if (hasHit) {
    if (pointerOverPanel(cx, cy)) return; // leyendo el panel: no lo cerremos
    if (hitIdx === hoverIndex && hoverIndex >= 0) return;
    if (hoverTimer) clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      hoverIndex = hitIdx;
      syncQuotePanel();
    }, CONFIG.interaction?.hoverDelayMs ?? 90);
  } else if (hoverIndex >= 0) {
    hoverIndex = -1;
    syncQuotePanel();
  } else if (quotePanelEl.classList.contains('visible')) {
    /* Al alejar el cursor sin que haya click fijado, el panel se cierra. */
    closeQuotePanel();
  }
}

const origOnPointerMove = onPointerMove;
onPointerMove = function(cx, cy) {
  origOnPointerMove(cx, cy);
  updateHover(cx, cy);
};

const origOnPointerDown = onPointerDown;
onPointerDown = function(cx, cy) {
  const hit = pickPoint(cx, cy);
  if (hit >= 0) {
    pinnedIndex = hit;   // click sobre una partícula fija el panel (✕/Escape lo cierra)
    hoverIndex = -1;
    openQuote(hit);
    return;
  }
  /* click en el fondo cierra el panel fijado (mismo gesto que en tarjetas) */
  if (pinnedIndex >= 0) closeQuotePanel();
  origOnPointerDown(cx, cy);
};

let scatterProgress = 0;
let storyProgress = 0;   // 0→1 a lo largo de todo el documento (para la coreografía)
let coinFade = 1;
let doorFade = HERO_DOOR_LOCKUP ? 1 : 0;
let doorTarget = HERO_DOOR_LOCKUP ? 1 : 0;

/* Máquina de estados visual: ScrollTrigger escribe los objetivos y el loop
   único de GSAP interpola. Así la nube puede volver atrás sin saltos y una
   sola geometría representa memoria, plano, voz, acta y timeline. */
const particleStoryKeys = ['axes', 'voices', 'acts', 'timeline', 'quotes'];
const particleStoryTarget = { axes: 0, voices: 0, acts: 0, timeline: 0, quotes: 0 };
const particleStoryMix = { axes: 0, voices: 0, acts: 0, timeline: 0, quotes: 0 };
let selectedActDate = null;
let actFocusMix = 0;
let particleTargetsReady = false;

const setParticleStoryTarget = (key, value) => {
  if (!(key in particleStoryTarget)) return;
  particleStoryTarget[key] = THREE.MathUtils.clamp(Number(value) || 0, 0, 1);
};

/* La selección del navegador de actas vive dentro de su propio módulo. Un
   evento pequeño evita acoplar el lector documental con la escena 3D. */
window.addEventListener('particle-act-focus', (event) => {
  selectedActDate = event.detail?.date || null;
});

/* La Sala (b1) — estado del cruce del umbral.
   DOOR_MODE = 'doorway' activa la coreografía nueva; 'classic' restaura
   EXACTAMENTE el comportamiento previo (todo lo nuevo queda inactivo). */
const DOOR_MODE = (CONFIG.door && CONFIG.door.transition === 'doorway') ? 'doorway' : 'classic';
if (DOOR_MODE === 'classic') document.body.classList.add('mode-classic');
let crossT = 0;      // 0 = afuera de la puerta · 1 = dentro de la sala
/* Al terminar el dwell de La Sala la cámara deshace el cruce (exitT 0→1).
   Sin esta salida crossT quedaba en 1 PARA SIEMPRE: la cámara seguía dentro
   de la sala en todas las secciones posteriores y los overlays 3D calculados
   para la cámara base (p. ej. el plano de #stageAxes) quedaban detrás del
   plano de visión — invisibles. */
let exitT = 0;
let inRoom = false;  // estamos en el stage #stageRoom (habilita el hover→cita)
/* Foco editorial de Las voces: la selección atenúa las intervenciones de
   otras voces sin borrar su huella. Así el directorio conecta la lectura
   nominal con la misma nube que el lector acaba de explorar. */
let voiceFocusParticipant = null;
let voiceFocusRenderedParticipant = null;
let voiceFocusMix = 0;
let selectedVoiceQuoteIndex = -1;
const _roomLook = new THREE.Vector3(0, 0.7, 0);
const _roomLookTarget = new THREE.Vector3(
  CONFIG.door?.roomLook?.x ?? 0,
  CONFIG.door?.roomLook?.y ?? 0.45,
  CONFIG.door?.roomLook?.z ?? -2.0
);

/* ── La Sala: encuadre contra el copy, igual que la portada ────────────
 * El retablo (pedestal + estatua) lo coloca la cámara; el bloque de texto lo
 * maqueta el CSS al fondo del contenedor sticky. Dos sistemas que no se ven
 * entre sí, otra vez. Con la mira fija en `roomLook.y = 0.55` la base del
 * pedestal caía siempre al ~65% del alto, pero el titular "LA SALA" sube al
 * 65% en portátiles bajos: medido, a 1440x764 y 1366x768 quedaban a 2 y 3 px.
 *
 * Aquí NO se estima nada: se proyecta la caja real del grupo de figuras con
 * una cámara de prueba en la pose exacta de la sala, y se resuelve qué mira
 * deja la base del retablo a `gapRatio` del alto por encima del titular.
 * Como la proyección es casi lineal en `lookY`, basta una secante de dos
 * evaluaciones. Si el GLB cambia de tamaño, esto se recalibra solo.
 *
 * Signo: SUBIR la mira BAJA la figura en pantalla.
 */
const roomTitleEl = document.getElementById('roomTitle');
const _roomProbeCam = new THREE.PerspectiveCamera();
const _roomProbeBox = new THREE.Box3();
const _roomProbePoint = new THREE.Vector3();
const ROOM_LOOK_Y_BASE = CONFIG.door?.roomLook?.y ?? 0.45;
let roomAimDirty = true;

/* Y en píxeles de pantalla del punto más bajo del retablo, si la cámara de
   sala mirase a `lookY`. */
function projectRoomFootY(lookY) {
  const { width: w, height: h } = getViewportSize();
  const cam = _roomProbeCam;
  cam.fov = CONFIG.camera.fov;
  cam.aspect = w / h;
  cam.near = 0.1;
  cam.far = 100;
  cam.position.set(
    CONFIG.camera.x,
    CONFIG.door?.roomCamY ?? 0.62,
    CONFIG.door?.roomCamZ ?? -0.5
  );
  cam.up.set(0, 1, 0);
  cam.lookAt(CONFIG.door?.roomLook?.x ?? 0, lookY, CONFIG.door?.roomLook?.z ?? -2.0);
  cam.updateMatrixWorld(true);
  cam.updateProjectionMatrix();
  _roomProbePoint.set(
    CONFIG.room?.figure?.x ?? 0,
    _roomProbeBox.min.y,
    CONFIG.room?.figure?.z ?? -4.8
  ).project(cam);
  return (1 - _roomProbePoint.y) * 0.5 * h;
}

function refreshRoomAim() {
  roomAimDirty = false;
  if (!figureSystem || !roomTitleEl) return;
  /* Solo el PEDESTAL, no `figureSystem.group`: el grupo también contiene los
     placeholders de las figuras aún sin modelar (inflación, brote…), que
     viven a los lados y hundirían el mínimo en Y. */
  const plinthRoot = figureSystem.figures.get('soporte')?.root;
  if (!plinthRoot) return;

  /* El grupo se escala y se desplaza cada frame según `figureReveal`. La caja
     hay que medirla en el estado ASENTADO (escala 1, y 0) o el encuadre
     dependería de por dónde iba el scroll cuando se redimensionó. */
  const g = figureSystem.group;
  const prevScale = g.scale.x;
  const prevY = g.position.y;
  g.scale.setScalar(1);
  g.position.y = 0;
  g.updateMatrixWorld(true);
  _roomProbeBox.setFromObject(plinthRoot);
  g.scale.setScalar(prevScale);
  g.position.y = prevY;
  g.updateMatrixWorld(true);
  if (_roomProbeBox.isEmpty() || !Number.isFinite(_roomProbeBox.min.y)) return;

  const { height: h } = getViewportSize();
  /* offsetTop del titular DENTRO del contenedor sticky = su posición en
     pantalla mientras la sección está fijada, y no depende del scroll. */
  const titleTop = roomTitleEl.offsetTop;
  if (!Number.isFinite(titleTop) || titleTop <= 0) return;
  const target = titleTop - Math.max(24, h * (HERO.gapRatio ?? 0.045));

  const y0 = ROOM_LOOK_Y_BASE;
  const y1 = ROOM_LOOK_Y_BASE + 0.15;
  const s0 = projectRoomFootY(y0);
  const s1 = projectRoomFootY(y1);
  const slope = (s1 - s0) / (y1 - y0);          // px por unidad de mundo
  if (!Number.isFinite(slope) || Math.abs(slope) < 1) return;

  _roomLookTarget.y = THREE.MathUtils.clamp(
    y0 + (target - s0) / slope,
    ROOM_LOOK_Y_BASE - 0.7,
    ROOM_LOOK_Y_BASE + 0.35
  );
}
/* Mira durante el cruce del umbral:
   _lookBase  = mira neutra de "La Reunión" (idéntica a la rama sin cruce,
                así el primer frame del cruce es continuo con el último sin él).
   _doorLook  = centro VISUAL de la figura completa (pórtico + hojas + escalones);
                el dolly mira AHÍ para que la puerta crezca hacia el centro del
                frame en vez de escaparse hacia el borde superior (bug reportado:
                "un segundo antes de entrar", la puerta ya iba cortada arriba
                porque la mira interpolaba directo al interior de la sala — un
                punto bajo y detrás de la puerta). */
const _lookBase = new THREE.Vector3(0, camBaseY, 0);
const _doorLook = new THREE.Vector3();

/* ═══════════════════════════════════════════════════════════
   COREOGRAFÍA DE CÁMARA — plano-secuencia sobre el scroll.
   Después del cruce puerta→sala (que mantiene su dolly propio),
   la cámara ya no se queda clavada en el punto base: viaja con
   deriva suave por cada capítulo. El DOM sigue por encima, así el
   movimiento se siente como "el mundo acompaña", no como un
   desplazamiento brusco.
   Los desplazamientos son deliberadamente pequeños en #stageAxes
   para no desalinear la proyección de las partículas con el SVG.
═══════════════════════════════════════════════════════════ */
/* Los stops ya no usan proporciones arbitrarias del progreso total: se
   anclan a los CENTROS reales de cada sección en el DOM. Así la cámara
   llega al capítulo cuando de verdad está en pantalla, y la coreografía
   se mantiene alineada al cambiar las alturas o el breakpoint. */
const cameraChoreographyStops = [
  { id: 'hero',               pos: [0.00, 0.72, 7.15], look: [0.00, 0.95, -0.25] },  // lockup: moneda en el vano
  { id: 'stageObjective',     pos: [0.00, 0.70, 4.45], look: [0.00, 0.78, -0.55] },  // dolly hacia el umbral
  /* #stageRoom se omite a propósito: el cruce puerta→sala lo gobierna el
     dolly propio (crossEff), así no lo pisamos con una deriva extra. */
  { id: 'stageHook',          pos: [0.00, 0.60, 5.80], look: [0.00, 0.70, 0.00] },
  { id: 'stageAxes',          pos: [0.00, 0.60, 5.80], look: [0.00, 0.70, 0.00] },   // base, para alinear el SVG
  { id: 'stageWordEvolution', pos: [1.30, 0.74, 5.10], look: [0.00, 0.68, 0.00] },
  { id: 'stageVoices',        pos: [1.10, 0.74, 5.20], look: [0.00, 0.68, 0.00] },
  { id: 'stageActs',          pos: [-1.10, 0.74, 5.20], look: [0.00, 0.68, 0.00] },
  { id: 'stageCounters',      pos: [0.00, 0.68, 5.50], look: [0.00, 0.70, 0.00] },
  { id: 'stagePipeline',      pos: [1.50, 0.80, 4.90], look: [0.00, 0.66, 0.00] },
  { id: 'stageTimeline',      pos: [-1.50, 0.80, 4.90], look: [0.00, 0.66, 0.00] },
  { id: 'stageQuotes',        pos: [0.00, 0.72, 5.40], look: [0.00, 0.70, 0.00] },
  { id: 'stageClosing',       pos: [0.00, 0.60, 5.80], look: [0.00, 0.70, 0.00] },   // base
];

let cameraStops = [];
function rebuildCameraChoreography() {
  if (HERO_DOOR_LOCKUP) {
    const y = CONFIG.coin.baseY;
    CONFIG.camera.y = y + 0.38;
    cameraChoreographyStops[0].pos = [0, CONFIG.camera.y, CONFIG.camera.z];
    cameraChoreographyStops[0].look = [0, y, 0];
    const ay = CONFIG.door.approachCamY ?? 0.62;
    const az = CONFIG.door.approachCamZ ?? CONFIG.camera.z;
    cameraChoreographyStops[1].pos = [0, ay, az];
    cameraChoreographyStops[1].look = [0, ay, 0.00];
  }
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const stops = [];
  const n = cameraChoreographyStops.length;
  for (let i = 0; i < n; i++) {
    const def = cameraChoreographyStops[i];
    const el = document.getElementById(def.id);
    let p;
    if (el && docHeight > 0) {
      const r = el.getBoundingClientRect();
      const center = (r.top + window.scrollY) + r.height / 2;
      /* Fracción del documento recorrida cuando la sección queda centrada
         en el viewport (miniaturas/overlays pueden desviar un centro, por
         eso después se fuerza monotonía). */
      p = THREE.MathUtils.clamp((center - window.innerHeight * 0.5) / docHeight, 0, 1);
    } else {
      p = n > 1 ? i / (n - 1) : 0;
    }
    /* Lockup: el encuadre de La Reunión se alcanza al TERMINAR la 1→2
       (scatter=1, bottom del hero = top del viewport), no en el centro
       de #stageObjective — si no, el aterrizaje 1→2 y el primer frame
       del cruce tienen tamaños distintos. */
    if (HERO_DOOR_LOCKUP && def.id === 'stageObjective') {
      const hero = document.getElementById('hero');
      const heroH = hero ? hero.offsetHeight : window.innerHeight;
      p = THREE.MathUtils.clamp(heroH / Math.max(docHeight, 1e-4), 0, 1);
    }
    stops.push({ id: def.id, p, pos: def.pos, look: def.look });
  }
  if (HERO_DOOR_LOCKUP && docHeight > 0) {
    const obj = stops.find((s) => s.id === 'stageObjective');
    const room = document.getElementById('stageRoom');
    if (obj && room) {
      const enterY = (room.getBoundingClientRect().top + window.scrollY) - window.innerHeight * 0.85;
      const pHold = THREE.MathUtils.clamp(enterY / docHeight, 0, 1);
      const idx = stops.indexOf(obj);
      stops.splice(idx + 1, 0, {
        id: 'doorwayHold',
        p: Math.max(pHold, obj.p + 0.001),
        pos: obj.pos,
        look: obj.look,
      });
    }
  }
  for (let i = 1; i < stops.length; i++) {
    if (stops[i].p < stops[i - 1].p) stops[i].p = stops[i - 1].p + 0.001;
  }
  cameraStops = stops;
}

const _camPos = new THREE.Vector3();
const _camLook = new THREE.Vector3();
function cameraChoreography(progress) {
  if (reduceMotion) {
    _camPos.set(CONFIG.camera.x, camBaseY, CONFIG.camera.z);
    _camLook.set(0, camBaseY, 0);
    return { pos: _camPos, look: _camLook };
  }
  const p = THREE.MathUtils.clamp(progress, 0, 1);
  if (!cameraStops.length) {
    _camPos.set(CONFIG.camera.x, camBaseY, CONFIG.camera.z);
    _camLook.set(0, camBaseY, 0);
    return { pos: _camPos, look: _camLook };
  }
  let a = cameraStops[0];
  let b = cameraStops[cameraStops.length - 1];
  for (let i = 0; i < cameraStops.length - 1; i++) {
    if (p >= cameraStops[i].p && p <= cameraStops[i + 1].p) {
      a = cameraStops[i];
      b = cameraStops[i + 1];
      break;
    }
  }
  const span = Math.max(b.p - a.p, 1e-4);
  const t = THREE.MathUtils.smoothstep((p - a.p) / span, 0, 1);
  _camPos.set(
    THREE.MathUtils.lerp(a.pos[0], b.pos[0], t),
    THREE.MathUtils.lerp(a.pos[1], b.pos[1], t),
    THREE.MathUtils.lerp(a.pos[2], b.pos[2], t)
  );
  _camLook.set(
    THREE.MathUtils.lerp(a.look[0], b.look[0], t),
    THREE.MathUtils.lerp(a.look[1], b.look[1], t),
    THREE.MathUtils.lerp(a.look[2], b.look[2], t)
  );
  return { pos: _camPos, look: _camLook };
}
/* Vector reutilizado para apuntar los spotlights de la puerta (antes se
   alocaba uno nuevo en CADA frame → ~60 objetos/seg de basura para el GC). */
const _spotTarget = new THREE.Vector3();

/* ────────────────────────────────
   Las voces — directorio editorial derivado del dataset
   Una voz no hereda una etiqueta: el color resume la orientación detectada
   en cada fragmento. El directorio hace visible quién aparece, durante qué
   años y con qué frecuencia, y ofrece una muestra atribuida antes de abrir
   el panel documental completo.
──────────────────────────────── */

function initVoiceExplorer() {
  const rail = document.getElementById('voiceRail');
  const meta = document.getElementById('voiceDirectoryMeta');
  const empty = document.getElementById('voiceDetailEmpty');
  const content = document.getElementById('voiceDetailContent');
  const detailName = document.getElementById('voiceDetailName');
  const detailMeta = document.getElementById('voiceDetailMeta');
  const detailSummary = document.getElementById('voiceDetailSummary');
  const detailQuote = document.getElementById('voiceDetailQuote');
  const detailCitation = document.getElementById('voiceDetailCitation');
  const detailOpen = document.getElementById('voiceDetailOpen');
  const profileOpen = document.getElementById('voiceProfileOpen');
  const profilePanel = document.getElementById('voiceProfilePanel');
  const profileClose = document.getElementById('voiceProfileClose');
  const profileTitle = document.getElementById('voiceProfileTitle');
  const profileSubtitle = document.getElementById('voiceProfileSubtitle');
  const radar = document.getElementById('voiceRadar');
  const topicList = document.getElementById('voiceTopicList');
  const evidenceQuote = document.getElementById('voiceProfileEvidenceQuote');
  const evidenceCitation = document.getElementById('voiceProfileEvidenceCitation');
  if (!rail || !meta || !empty || !content || !detailOpen || !profileOpen || !profilePanel || !profileClose || !radar || !topicList || !evidenceQuote || !evidenceCitation || !quotes.length) return;

  const getSourceYear = (q) => {
    const dateYear = String(q.date || '').match(/^(\d{4})/);
    return dateYear ? Number(dateYear[1]) : Number(q.year);
  };
  const grouped = new Map();
  let excludedVoiceRows = 0;
  quotes.forEach((q, index) => {
    /* Mismo criterio que el navegador de actas: el registro 1985 del
       fixture no se mezcla con el período declarado 2000–2015. Se
       contabiliza aparte y se informa en el meta del directorio. */
    const year = getSourceYear(q);
    if (!Number.isFinite(year) || year < 2000 || year > 2015) {
      excludedVoiceRows += 1;
      return;
    }
    const name = q.participant || 'Participante anónimo';
    if (!grouped.has(name)) grouped.set(name, []);
    grouped.get(name).push({ q, index, normalizedText: normalizeTopicText(q.text) });
  });

  const voices = Array.from(grouped, ([name, rows]) => {
    const toneCounts = { hawkish: 0, dovish: 0, neutral: 0 };
    /* La fecha documental es la referencia temporal primaria; q.year queda
       como fallback para registros que todavía no traen date. */
    const years = rows.map(({ q }) => getSourceYear(q)).filter(Number.isFinite);
    rows.forEach(({ q }) => {
      const tone = q.label in toneCounts ? q.label : 'neutral';
      toneCounts[tone] += 1;
    });
    return {
      name,
      rows,
      count: rows.length,
      toneCounts,
      minYear: years.length ? Math.min(...years) : '—',
      maxYear: years.length ? Math.max(...years) : '—',
    };
  }).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'es'));

  meta.textContent = `Muestra visual · ${voices.length} voces · ${quotes.length - excludedVoiceRows} fragmentos${excludedVoiceRows ? ` · ${excludedVoiceRows} fuera del período` : ''}`;
  rail.innerHTML = '';
  const cards = [];
  let activeName = null;

  const toneLabels = {
    hawkish: 'hawkish (restrictiva)',
    dovish: 'dovish (expansiva)',
    neutral: 'neutral',
  };
  const svgNS = 'http://www.w3.org/2000/svg';
  const createSvgElement = (tag, attrs = {}) => {
    const node = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    return node;
  };
  const getVoiceSample = (rows) => {
    if (!rows || !rows.length) return null;
    const chronological = rows.slice().sort((a, b) => {
      const da = String(a.q.date || a.q.year || '');
      const db = String(b.q.date || b.q.year || '');
      return da.localeCompare(db) || a.index - b.index;
    });
    return chronological[Math.floor((chronological.length - 1) / 2)];
  };
  const getTopicProfile = (voice) => TOPIC_DEFINITIONS.map((definition) => {
    const matchedRows = voice.rows.filter((row) => definition.terms.some((term) => topicHasTerm(row.normalizedText, term)));
    const termCounts = definition.terms.map((term) => ({
      term,
      count: voice.rows.filter((row) => topicHasTerm(row.normalizedText, term)).length,
    })).filter((item) => item.count > 0).sort((a, b) => b.count - a.count || a.term.localeCompare(b.term, 'es'));
    return {
      definition,
      rows: matchedRows,
      value: voice.count ? (matchedRows.length / voice.count) * 100 : 0,
      termCounts,
    };
  });

  function drawVoiceRadar(profiles, voiceName) {
    radar.innerHTML = '';
    const cx = 150;
    const cy = 128;
    const radius = 82;
    const count = profiles.length;
    const angleFor = (index) => (-Math.PI / 2) + (index / count) * Math.PI * 2;
    const pointFor = (index, value, distance = radius * (value / 100)) => {
      const angle = angleFor(index);
      return [cx + Math.cos(angle) * distance, cy + Math.sin(angle) * distance];
    };
    const polygonPoints = (distance) => profiles.map((_, index) => pointFor(index, 100, distance).join(',')).join(' ');

    [0.25, 0.5, 0.75, 1].forEach((level) => {
      radar.appendChild(createSvgElement('polygon', { class: 'radar-ring', points: polygonPoints(radius * level) }));
    });
    profiles.forEach((profile, index) => {
      const [x, y] = pointFor(index, 100);
      radar.appendChild(createSvgElement('line', { class: 'radar-axis', x1: cx, y1: cy, x2: x, y2: y }));
    });
    const shape = createSvgElement('polygon', {
      class: 'radar-shape',
      points: profiles.map((profile, index) => pointFor(index, profile.value).join(',')).join(' '),
    });
    radar.appendChild(shape);
    profiles.forEach((profile, index) => {
      const [x, y] = pointFor(index, profile.value);
      radar.appendChild(createSvgElement('circle', { class: 'radar-point', cx: x, cy: y, r: 3.5 }));
      const [lx, ly] = pointFor(index, 100, radius + 23);
      const label = createSvgElement('text', {
        class: 'radar-label',
        x: lx,
        y: ly + (ly < cy ? -2 : 4),
        'text-anchor': lx < cx - 8 ? 'end' : lx > cx + 8 ? 'start' : 'middle',
      });
      label.textContent = profile.definition.short;
      radar.appendChild(label);
    });
    radar.appendChild(createSvgElement('circle', { cx, cy, r: 2, fill: 'rgba(255,255,255,0.65)' }));
    radar.setAttribute('aria-label', `Perfil temático de ${voiceName}. Cada eje muestra el porcentaje de sus fragmentos con una mención directa.`);
    gsap.fromTo(shape, { opacity: 0, scale: 0.92, transformOrigin: `${cx}px ${cy}px` }, { opacity: 1, scale: 1, duration: 0.55, ease: 'cinematicOut' });
  }

  let profileVoice = null;
  let profileCloseTimer = null;
  let profileReturnFocus = null;
  function setProfileEvidence(voice, rows) {
    const sample = getVoiceSample(rows) || getVoiceSample(voice.rows);
    if (!sample) return;
    evidenceQuote.textContent = `“${sample.q.text || 'Sin texto disponible'}”`;
    evidenceCitation.textContent = `— ${sample.q.participant || voice.name}, ${sample.q.formatted_date || sample.q.date || sample.q.year || 'fecha no especificada'}`;
  }

  function renderVoiceProfile(voice, activeTopicId = null) {
    if (!voice) return;
    profileVoice = voice;
    const profiles = getTopicProfile(voice);
    profileTitle.textContent = voice.name;
    profileSubtitle.textContent = `${voice.count} ${voice.count === 1 ? 'intervención' : 'intervenciones'} · ${voice.minYear}–${voice.maxYear} · cada eje = proporción de fragmentos con mención directa`;
    drawVoiceRadar(profiles, voice.name);
    topicList.innerHTML = '';
    profiles.forEach((profile) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'voice-topic-row' + (profile.definition.id === activeTopicId ? ' is-active' : '');
      row.setAttribute('aria-pressed', String(profile.definition.id === activeTopicId));
      row.setAttribute('aria-label', `${profile.definition.label}: ${Math.round(profile.value)} por ciento de los fragmentos`);
      row.innerHTML = `
        <span class="voice-topic-row-top"><span></span><strong></strong></span>
        <span class="voice-topic-meter"><i></i></span>
        <span class="voice-topic-terms"></span>`;
      row.querySelector('.voice-topic-row-top span').textContent = profile.definition.label;
      row.querySelector('.voice-topic-row-top strong').textContent = `${Math.round(profile.value)}%`;
      row.querySelector('.voice-topic-meter i').style.width = `${profile.value}%`;
      row.querySelector('.voice-topic-terms').textContent = profile.termCounts.length
        ? profile.termCounts.slice(0, 3).map((item) => item.term).join(' · ')
        : 'sin coincidencia directa en la muestra';
      row.addEventListener('click', () => renderVoiceProfile(voice, profile.definition.id));
      topicList.appendChild(row);
    });
    const activeProfile = profiles.find((profile) => profile.definition.id === activeTopicId);
    setProfileEvidence(voice, activeProfile?.rows || voice.rows);
  }

  function openVoiceProfile(voice) {
    if (!voice) return;
    renderVoiceProfile(voice);
    profileReturnFocus = document.activeElement;
    profilePanel.hidden = false;
    profilePanel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('voice-profile-modal-open');
    requestAnimationFrame(() => profilePanel.classList.add('is-open'));
    profileClose.focus({ preventScroll: true });
  }

  function closeVoiceProfile() {
    if (profilePanel.hidden) return;
    profilePanel.classList.remove('is-open');
    profilePanel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('voice-profile-modal-open');
    clearTimeout(profileCloseTimer);
    profileCloseTimer = setTimeout(() => {
      profilePanel.hidden = true;
      if (profileReturnFocus && typeof profileReturnFocus.focus === 'function') {
        profileReturnFocus.focus({ preventScroll: true });
      }
      profileReturnFocus = null;
    }, 340);
  }
  profileClose.addEventListener('click', closeVoiceProfile);
  profilePanel.querySelectorAll('[data-voice-profile-close]').forEach((element) => element.addEventListener('click', closeVoiceProfile));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !profilePanel.hidden) {
      event.preventDefault();
      closeVoiceProfile();
    }
  });

  function updateDetail(voice) {
    if (!voice) {
      empty.hidden = false;
      content.hidden = true;
      selectedVoiceQuoteIndex = -1;
      return;
    }

    /* La muestra se toma del centro cronológico para no convertir la tarjeta
       en un ranking ni privilegiar automáticamente la primera/última cita. */
    const sample = getVoiceSample(voice.rows);
    const toneSummary = [
      `${voice.toneCounts.hawkish} ${toneLabels.hawkish}`,
      `${voice.toneCounts.dovish} ${toneLabels.dovish}`,
      `${voice.toneCounts.neutral} neutral${voice.toneCounts.neutral === 1 ? '' : 'es'}`,
    ].join(' · ');

    empty.hidden = true;
    content.hidden = false;
    detailName.textContent = voice.name;
    detailMeta.textContent = `${voice.count} ${voice.count === 1 ? 'intervención' : 'intervenciones'} en la muestra · ${voice.minYear}–${voice.maxYear}`;
    detailSummary.textContent = `Señales detectadas en sus fragmentos: ${toneSummary}.`;
    detailQuote.textContent = `“${sample.q.text || 'Sin texto disponible'}”`;
    detailCitation.textContent = `— ${sample.q.participant || voice.name}, ${sample.q.formatted_date || sample.q.date || sample.q.year || 'fecha no especificada'}`;
    selectedVoiceQuoteIndex = sample.index;
  }

  function selectVoice(name) {
    activeName = activeName === name ? null : name;
    voiceFocusParticipant = activeName;
    if (activeName) voiceFocusRenderedParticipant = activeName;
    cards.forEach(({ card, voice }) => {
      const selected = voice.name === activeName;
      card.setAttribute('aria-pressed', String(selected));
    });
    updateDetail(activeName ? voices.find((voice) => voice.name === activeName) : null);
    /* Si el lector estaba leyendo una cita del enjambre, una nueva selección
       no debe dejar un panel perteneciente a otra voz flotando sobre el rail. */
    if (typeof closeQuotePanel === 'function') closeQuotePanel();
  }

  profileOpen.addEventListener('click', () => {
    const voice = activeName ? voices.find((item) => item.name === activeName) : null;
    openVoiceProfile(voice);
  });

  voices.forEach((voice, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'voice-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-pressed', 'false');
    card.setAttribute('aria-label', `Seleccionar ${voice.name}: ${voice.count} ${voice.count === 1 ? 'intervención' : 'intervenciones'} entre ${voice.minYear} y ${voice.maxYear}.`);
    card.innerHTML = `
      <span class="voice-card-index"></span>
      <span class="voice-card-name"></span>
      <span class="voice-card-meta"></span>
      <span class="voice-card-years"></span>
      <span class="voice-signal-bar" aria-hidden="true">
        <i class="hawkish"></i><i class="dovish"></i><i class="neutral"></i>
      </span>`;
    card.querySelector('.voice-card-index').textContent = String(index + 1).padStart(2, '0');
    card.querySelector('.voice-card-name').textContent = voice.name;
    card.querySelector('.voice-card-meta').textContent = `${voice.count} ${voice.count === 1 ? 'intervención' : 'intervenciones'}`;
    card.querySelector('.voice-card-years').textContent = `${voice.minYear}–${voice.maxYear}`;
    ['hawkish', 'dovish', 'neutral'].forEach((tone) => {
      card.querySelector(`.voice-signal-bar .${tone}`).style.width = `${(voice.toneCounts[tone] / voice.count) * 100}%`;
    });
    card.addEventListener('click', () => selectVoice(voice.name));
    rail.appendChild(card);
    cards.push({ card, voice });
  });

  detailOpen.addEventListener('click', () => {
    if (selectedVoiceQuoteIndex < 0) return;
    pinnedIndex = selectedVoiceQuoteIndex;
    hoverIndex = -1;
    openQuote(selectedVoiceQuoteIndex, { x: window.innerWidth * 0.54, y: window.innerHeight * 0.62 });
  });
}

initVoiceExplorer();

/* ────────────────────────────────
   Acto 6 — navegador por acta
   La tarjeta no resume una "personalidad": vuelve de la señal al acta,
   primero por fecha y participantes, después por el fragmento concreto y
   los términos observables que acompañan la etiqueta exploratoria.
──────────────────────────────── */
function initActBrowser() {
  const list = document.getElementById('actsList');
  const meta = document.getElementById('actsIndexMeta');
  const yearFilter = document.getElementById('actYearFilter');
  const dateEl = document.getElementById('actDate');
  const dateSubEl = document.getElementById('actDateSub');
  const eraEl = document.getElementById('actEra');
  const signalNameEl = document.getElementById('actSignalName');
  const signalCountEl = document.getElementById('actSignalCount');
  const signalExplanationEl = document.getElementById('actSignalExplanation');
  const participantsEl = document.getElementById('actParticipants');
  const termNetwork = document.getElementById('actTermNetwork');
  const termList = document.getElementById('actTermList');
  const evidenceList = document.getElementById('actEvidenceList');
  const evidenceMeta = document.getElementById('actEvidenceMeta');
  const evidenceQuote = document.getElementById('actEvidenceQuote');
  const evidenceCitation = document.getElementById('actEvidenceCitation');
  const openEvidence = document.getElementById('actOpenEvidence');
  const browser = document.getElementById('actsBrowser');
  const intro = document.querySelector('.acts-intro');
  if (!list || !meta || !yearFilter || !dateEl || !dateSubEl || !eraEl || !signalNameEl || !signalCountEl || !signalExplanationEl || !participantsEl || !termNetwork || !termList || !evidenceList || !evidenceMeta || !evidenceQuote || !evidenceCitation || !openEvidence || !browser || !intro || !quotes.length) return;

  const termDictionary = [
    { key: 'inflacion', label: 'inflación' },
    { key: 'precios', label: 'precios' },
    { key: 'expectativas', label: 'expectativas' },
    { key: 'tasa', label: 'tasa' },
    { key: 'tasas', label: 'tasas' },
    { key: 'aumento', label: 'aumento' },
    { key: 'alza', label: 'alza' },
    { key: 'subir', label: 'subir' },
    { key: 'mantener', label: 'mantener' },
    { key: 'bajar', label: 'bajar' },
    { key: 'riesgo', label: 'riesgo' },
    { key: 'crecimiento', label: 'crecimiento' },
    { key: 'actividad', label: 'actividad' },
    { key: 'demanda', label: 'demanda' },
    { key: 'producto', label: 'producto' },
    { key: 'contexto', label: 'contexto' },
    { key: 'escenario', label: 'escenario' },
    { key: 'internacional', label: 'internacional' },
    { key: 'mercado', label: 'mercado' },
    { key: 'mercados', label: 'mercados' },
    { key: 'petróleo', label: 'petróleo' },
    { key: 'cobre', label: 'cobre' },
    { key: 'energía', label: 'energía' },
    { key: 'alimentos', label: 'alimentos' },
    { key: 'empleo', label: 'empleo' },
    { key: 'salarios', label: 'salarios' },
    { key: 'gasto', label: 'gasto' },
    { key: 'presupuesto', label: 'presupuesto' },
    { key: 'déficit', label: 'déficit' },
    { key: 'consumo', label: 'consumo' },
    { key: 'inversión', label: 'inversión' },
  ].map((term) => ({ ...term, normalized: normalizeTopicText(term.key) }));

  const eras = [
    { id: 'E1', name: 'Despegue', from: 2000, to: 2003 },
    { id: 'E2', name: 'Fiebre', from: 2004, to: 2007 },
    { id: 'E3', name: 'Crisis', from: 2008, to: 2009 },
    { id: 'E4', name: 'Normalización', from: 2010, to: 2014 },
    { id: 'E5', name: 'Giro', from: 2015, to: 2015 },
  ];
  const svgNS = 'http://www.w3.org/2000/svg';
  const makeSvg = (tag, attrs = {}) => {
    const node = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    return node;
  };
  const sourceYear = (q) => {
    const dateYear = String(q.date || '').match(/^(\d{4})/);
    return dateYear ? Number(dateYear[1]) : Number(q.year);
  };
  const formatDate = (date, year) => {
    const parsed = date && /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? new Date(`${date}T00:00:00Z`)
      : null;
    if (!parsed || Number.isNaN(parsed.getTime())) return year ? `Año ${year}` : 'Fecha no especificada';
    return new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(parsed);
  };
  const compactViewport = () => window.matchMedia && window.matchMedia('(max-width: 430px)').matches;
  const formatReaderDate = (date, year) => {
    if (!compactViewport()) return formatDate(date, year);
    const parsed = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00Z`) : null;
    if (!parsed || Number.isNaN(parsed.getTime())) return formatDate(date, year);
    const parts = new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).formatToParts(parsed);
    const values = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
    return `${values.day} ${values.month} ${values.year}`;
  };
  const formatListDate = (date, year) => compactViewport() ? formatReaderDate(date, year) : formatDate(date, year);
  const getEra = (year) => eras.find((era) => year >= era.from && year <= era.to) || { id: '—', name: 'fuera de período' };
  const getTerms = (row) => termDictionary.filter((term) => row.normalizedText.includes(term.normalized));
  const getTone = (q) => ['hawkish', 'dovish', 'neutral'].includes(q.label) ? q.label : 'neutral';
  const toneText = { hawkish: 'Hawkish', dovish: 'Dovish', neutral: 'Neutral', mixed: 'Mixta' };
  const toneDetail = { hawkish: 'restrictiva', dovish: 'expansiva', neutral: 'sin orientación dominante' };

  const grouped = new Map();
  let excludedRows = 0;
  quotes.forEach((q, index) => {
    const year = sourceYear(q);
    /* El navegador respeta el período declarado de la pieza. El registro
       1985 del fixture queda contabilizado como fuera de período, no
       mezclado silenciosamente con las actas 2000–2015. */
    if (!Number.isFinite(year) || year < 2000 || year > 2015) {
      excludedRows += 1;
      return;
    }
    const date = /^\d{4}-\d{2}-\d{2}$/.test(String(q.date || '')) ? q.date : `${year}-01-01`;
    if (!grouped.has(date)) grouped.set(date, []);
    grouped.get(date).push({ q, index, normalizedText: normalizeTopicText(q.text) });
  });

  const acts = [...grouped.entries()].map(([date, rows]) => {
    const year = sourceYear(rows[0].q);
    const toneCounts = { hawkish: 0, dovish: 0, neutral: 0 };
    const participantSet = new Set();
    const termCounts = new Map();
    rows.forEach((row) => {
      const tone = getTone(row.q);
      toneCounts[tone] += 1;
      participantSet.add(row.q.participant || 'Participante anónimo');
      getTerms(row).forEach((term) => termCounts.set(term.normalized, {
        label: term.label,
        count: (termCounts.get(term.normalized)?.count || 0) + 1,
      }));
    });
    const activeTones = Object.entries(toneCounts).filter(([, count]) => count > 0).sort((a, b) => b[1] - a[1]);
    const dominantTone = activeTones.length > 1 && activeTones[0][1] === activeTones[1][1]
      ? 'mixed'
      : (activeTones[0]?.[0] || 'neutral');
    return {
      id: date,
      date,
      year,
      rows,
      count: rows.length,
      participants: [...participantSet],
      toneCounts,
      dominantTone,
      terms: [...termCounts.entries()].map(([key, item]) => ({ key, ...item })).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'es')),
    };
  }).sort((a, b) => a.date.localeCompare(b.date));

  if (!acts.length) return;
  meta.textContent = `Muestra visible: ${acts.length} actas · ${acts.reduce((total, act) => total + act.count, 0)} fragmentos${excludedRows ? ` · ${excludedRows} fuera del período` : ''}`;
  [...new Set(acts.map((act) => act.year))].sort((a, b) => a - b).forEach((year) => {
    const option = document.createElement('option');
    option.value = String(year);
    option.textContent = year;
    yearFilter.appendChild(option);
  });

  let activeAct = null;
  let activeRowIndex = 0;
  let activeTermKey = null;
  const listItems = [];

  const renderNetwork = (row) => {
    termNetwork.innerHTML = '';
    const terms = row ? getTerms(row).slice(0, 4) : [];
    const tone = row ? getTone(row.q) : 'neutral';
    const signalX = 48;
    const signalY = 43;
    const termStart = 125;
    const termEnd = 492;
    const step = terms.length > 1 ? (termEnd - termStart) / (terms.length - 1) : 0;
    termNetwork.appendChild(makeSvg('text', { class: 'act-network-caption', x: signalX, y: 12, 'text-anchor': 'middle' })).textContent = 'SEÑAL';
    termNetwork.appendChild(makeSvg('circle', { class: `act-network-signal ${tone}`, cx: signalX, cy: signalY, r: 22 }));
    const signalText = makeSvg('text', { class: 'act-network-caption', x: signalX, y: signalY + 3, 'text-anchor': 'middle' });
    signalText.textContent = toneText[tone].toUpperCase();
    termNetwork.appendChild(signalText);
    if (!terms.length) {
      const emptyText = makeSvg('text', { class: 'act-network-term', x: 108, y: signalY + 4 });
      emptyText.textContent = 'sin término de la taxonomía visible en este fragmento';
      termNetwork.appendChild(emptyText);
      termNetwork.setAttribute('aria-label', `La etiqueta ${toneText[tone]} no tiene términos de la taxonomía visible en este fragmento`);
      return;
    }
    terms.forEach((term, index) => {
      const x = terms.length === 1 ? 280 : termStart + step * index;
      const y = index % 2 === 0 ? 29 : 65;
      termNetwork.appendChild(makeSvg('line', { class: 'act-network-link', x1: signalX + 22, y1: signalY, x2: x - 8, y2: y - 3 }));
      termNetwork.appendChild(makeSvg('circle', { class: 'act-network-signal', cx: x - 8, cy: y - 3, r: 3.5 }));
      const label = makeSvg('text', { class: 'act-network-term', x, y, 'text-anchor': 'middle' });
      label.textContent = term.label;
      termNetwork.appendChild(label);
    });
    termNetwork.setAttribute('aria-label', `${toneText[tone]} conectada con ${terms.map((term) => term.label).join(', ')}`);
  };

  const renderEvidence = (act, rowIndex, termKey = null) => {
    if (!act?.rows.length) return;
    activeAct = act;
    activeRowIndex = Math.max(0, Math.min(rowIndex, act.rows.length - 1));
    activeTermKey = termKey;
    const row = act.rows[activeRowIndex];
    const terms = getTerms(row);
    const tone = getTone(row.q);
    const termNames = terms.slice(0, compactViewport() ? 3 : 5).map((term) => term.label);
    const termPhrase = termNames.length ? `«${termNames.join('», «')}»` : 'ningún término de la taxonomía visible';
    signalExplanationEl.textContent = compactViewport()
      ? `${termPhrase} acompañan la etiqueta ${toneText[tone]} (${toneDetail[tone]}).`
      : `Este fragmento reúne ${termPhrase}; en esta lectura exploratoria, esa evidencia léxica acompaña la etiqueta ${toneText[tone]} (${toneDetail[tone]}).`;
    renderNetwork(row);
    [...evidenceList.querySelectorAll('.act-evidence-row')].forEach((button) => {
      button.setAttribute('aria-current', String(Number(button.dataset.rowIndex) === activeRowIndex));
    });
    [...termList.querySelectorAll('.act-term-chip')].forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.termKey === activeTermKey));
    });
    evidenceQuote.textContent = `“${row.q.text || 'Sin texto disponible'}”`;
    evidenceCitation.textContent = `— ${row.q.participant || 'Participante anónimo'}, ${row.q.formatted_date || formatDate(act.date, act.year)}`;
    openEvidence.dataset.quoteIndex = String(row.index);
  };

  const renderAct = (act) => {
    if (!act) return;
    activeAct = act;
    activeRowIndex = Math.min(activeRowIndex, act.rows.length - 1);
    activeTermKey = null;
    const era = getEra(act.year);
    dateEl.textContent = formatReaderDate(act.date, act.year);
    dateSubEl.textContent = `${act.count} ${act.count === 1 ? 'fragmento' : 'fragmentos'} · ${act.participants.length} ${act.participants.length === 1 ? 'participante' : 'participantes'}`;
    eraEl.textContent = `${era.id} · ${era.name}`;
    signalNameEl.textContent = toneText[act.dominantTone];
    signalNameEl.className = `act-signal-name ${act.dominantTone}`;
    const dominantCount = act.dominantTone === 'mixed' ? Math.max(...Object.values(act.toneCounts)) : (act.toneCounts[act.dominantTone] || 0);
    signalCountEl.textContent = `${dominantCount}/${act.count} fragmentos`;
    ['hawkish', 'dovish', 'neutral'].forEach((tone) => {
      const bar = document.getElementById(`act${tone.charAt(0).toUpperCase()}${tone.slice(1)}Bar`);
      if (bar) bar.style.width = `${(act.toneCounts[tone] / act.count) * 100}%`;
    });
    participantsEl.innerHTML = '';
    act.participants.forEach((participant) => {
      const pill = document.createElement('span');
      pill.className = 'act-participant';
      pill.textContent = participant;
      participantsEl.appendChild(pill);
    });

    termList.innerHTML = '';
    if (act.terms.length) {
      act.terms.slice(0, 7).forEach((term) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'act-term-chip';
        button.dataset.termKey = term.key;
        button.setAttribute('aria-pressed', 'false');
        button.innerHTML = `<span></span><small></small>`;
        button.querySelector('span').textContent = term.label;
        button.querySelector('small').textContent = term.count;
        button.addEventListener('click', () => {
          const rowIndex = act.rows.findIndex((row) => getTerms(row).some((item) => item.normalized === term.key));
          renderEvidence(act, rowIndex >= 0 ? rowIndex : 0, term.key);
        });
        termList.appendChild(button);
      });
    } else {
      const emptyTerm = document.createElement('span');
      emptyTerm.className = 'acts-index-meta';
      emptyTerm.textContent = 'sin términos directos en la muestra';
      termList.appendChild(emptyTerm);
    }

    evidenceList.innerHTML = '';
    evidenceMeta.textContent = `${act.count} ${act.count === 1 ? 'fragmento' : 'fragmentos'}`;
    act.rows.forEach((row, rowIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'act-evidence-row';
      button.dataset.rowIndex = String(rowIndex);
      button.setAttribute('role', 'listitem');
      button.setAttribute('aria-current', 'false');
      const person = document.createElement('span');
      person.className = 'act-evidence-person';
      person.textContent = row.q.participant || 'Participante anónimo';
      const tone = document.createElement('span');
      tone.className = `act-evidence-tone ${getTone(row.q)}`;
      tone.textContent = toneText[getTone(row.q)];
      button.append(person, tone);
      button.addEventListener('click', () => renderEvidence(act, rowIndex));
      evidenceList.appendChild(button);
    });
    renderEvidence(act, activeRowIndex);
    listItems.forEach(({ button, act: listAct }) => button.setAttribute('aria-current', String(listAct.id === act.id)));
  };

  const selectAct = (act) => {
    if (!act) return;
    activeRowIndex = 0;
    renderAct(act);
    window.dispatchEvent(new CustomEvent('particle-act-focus', { detail: { date: act.date } }));
    const selected = listItems.find(({ act: listAct }) => listAct.id === act.id);
    selected?.button.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  const renderList = (yearValue = yearFilter.value) => {
    const visibleActs = yearValue === 'all' ? acts : acts.filter((act) => String(act.year) === String(yearValue));
    list.innerHTML = '';
    listItems.length = 0;
    if (!visibleActs.length) {
      const emptyState = document.createElement('div');
      emptyState.className = 'acts-empty';
      emptyState.textContent = 'No hay actas disponibles para este año.';
      list.appendChild(emptyState);
      return;
    }
    visibleActs.forEach((act) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'act-list-item';
      button.setAttribute('role', 'listitem');
      button.setAttribute('aria-current', String(activeAct?.id === act.id));
      button.setAttribute('aria-label', `Abrir acta del ${formatDate(act.date, act.year)}, ${act.count} fragmentos`);
      const dot = document.createElement('i');
      dot.className = `act-tone-dot ${act.dominantTone}`;
      dot.setAttribute('aria-hidden', 'true');
      const body = document.createElement('span');
      const date = document.createElement('span');
      date.className = 'act-list-date';
      date.textContent = formatListDate(act.date, act.year);
      const listMeta = document.createElement('span');
      listMeta.className = 'act-list-meta';
      listMeta.textContent = `${act.count} ${act.count === 1 ? 'fragmento' : 'fragmentos'} · ${act.participants.length} ${act.participants.length === 1 ? 'voz' : 'voces'}`;
      body.append(date, listMeta);
      const tone = document.createElement('span');
      tone.className = 'act-list-signal';
      tone.textContent = toneText[act.dominantTone];
      button.append(dot, body, tone);
      button.addEventListener('click', () => selectAct(act));
      list.appendChild(button);
      listItems.push({ button, act });
    });
  };

  openEvidence.addEventListener('click', () => {
    const quoteIndex = Number(openEvidence.dataset.quoteIndex);
    if (!Number.isFinite(quoteIndex) || !quotes[quoteIndex]) return;
    pinnedIndex = quoteIndex;
    hoverIndex = -1;
    openQuote(quoteIndex, { x: window.innerWidth * 0.62, y: window.innerHeight * 0.62 });
  });
  yearFilter.addEventListener('change', () => {
    renderList(yearFilter.value);
    const firstVisible = acts.find((act) => yearFilter.value === 'all' || String(act.year) === yearFilter.value);
    if (firstVisible) selectAct(firstVisible);
  });

  renderList('all');
  const defaultAct = acts.find((act) => act.date === '2010-05-13') || acts.slice().sort((a, b) => b.count - a.count || a.date.localeCompare(b.date))[0] || acts[0];
  selectAct(defaultAct);

  gsap.timeline({
    scrollTrigger: {
      trigger: '#stageActs',
      start: 'top 85%',
      end: 'bottom bottom',
      scrub: true,
    },
  })
    .fromTo(intro, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.13, ease: 'none' }, 0.04)
    .fromTo(browser, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.16, ease: 'none' }, 0.16)
    .to(intro, { opacity: 0, y: -14, duration: 0.08, ease: 'none' }, 0.90);
}

/* ────────────────────────────────
   Acto 4 — evolución del vocabulario
   La vista cuenta presencia de términos por fragmento y por año; no
   convierte la frecuencia en una medida de importancia política. La
   taxonomía de palabras se mantiene deliberadamente legible para que el
   lector pueda seguir la evidencia hasta el acta.
──────────────────────────────── */
/* Rebuild-safe: al redimensionar la ventana (o cargar fuentes) la gráfica
   de evolución se vuelve a dibujar. Antes tomaba el tamaño UNA sola vez y
   usaba preserveAspectRatio:none, así que al cambiar el viewport el texto
   y el trazo se estiraban (problema típico entre local y GitHub Pages). */
let wordEvolutionDisposers = [];
function disposeWordEvolution() {
  wordEvolutionDisposers.forEach((dispose) => { try { dispose(); } catch (e) { /* noop */ } });
  wordEvolutionDisposers.length = 0;
}
function initWordEvolution() {
  const svg = document.getElementById('wordEvolutionSvg');
  const intro = document.querySelector('.word-evolution-intro');
  const board = document.getElementById('wordEvolutionBoard');
  const yearEl = document.getElementById('wordEvolutionYear');
  const readoutEl = document.getElementById('wordEvolutionReadout');
  if (!svg || !intro || !board || !yearEl || !readoutEl || !quotes.length || !window.d3) return;

  /* Limpiar el dibujo/animaciones previos antes de reconstruir. */
  disposeWordEvolution();
  d3.select(svg).selectAll('*').remove();
  svg.removeAttribute('viewBox');

  const years = d3.range(2000, 2016);
  const labels = ['hawkish', 'dovish'];
  const candidateTerms = [
    'inflación', 'precios', 'expectativas', 'tasa', 'tasas', 'aumento', 'subir', 'mantener', 'bajar', 'alza', 'riesgo',
    'crecimiento', 'actividad', 'demanda', 'producto', 'contexto', 'escenario', 'internacional', 'mercado', 'mercados',
    'empresas', 'hogares', 'endeudamiento', 'petróleo', 'cobre', 'energía', 'alimentos', 'empleo', 'salarios', 'fiscal',
    'gasto', 'presupuesto', 'déficit', 'consumo', 'inversión', 'exportaciones', 'importaciones'
  ].map(normalizeTopicText);
  const candidateSet = new Set(candidateTerms);
  const stopWords = new Set([
    'para', 'como', 'desde', 'entre', 'sobre', 'esta', 'este', 'estas', 'estos', 'también', 'tambien', 'cada', 'cuando',
    'donde', 'señala', 'senala', 'indica', 'señor', 'senor', 'presidente', 'consejero', 'gerente', 'gerencia', 'división',
    'division', 'estudios', 'reunión', 'reunion', 'anterior', 'opción', 'opciones', 'oportunidad', 'respecto', 'puntos',
    'base', 'parte', 'lugar', 'forma', 'manera', 'mayor', 'menor', 'dado', 'considera', 'elementos', 'siguiente',
    'siguientes', 'además', 'ademas', 'aunque', 'ellos', 'ellas', 'ello', 'hasta', 'hace', 'tiene', 'tienen', 'puede',
    'podría', 'podria', 'sería', 'seria', 'chile', 'banco', 'central', 'política', 'politica', 'monetaria', 'fragmento',
    'intervención', 'intervencion', 'acta', 'actas', 'muestra'
  ].map(normalizeTopicText));
  const participantTokens = new Set(quotes.flatMap((q) => normalizeTopicText(q.participant).match(/[a-zñ]{4,}/g) || []));
  const rowCounts = { hawkish: new Map(), dovish: new Map() };
  const termCounts = { hawkish: new Map(), dovish: new Map() };
  const displayTerms = {
    inflacion: 'inflación', precios: 'precios', expectativas: 'expectativas', tasa: 'tasa', tasas: 'tasas', aumento: 'aumento',
    subir: 'subir', mantener: 'mantener', bajar: 'bajar', alza: 'alza', riesgo: 'riesgo', crecimiento: 'crecimiento',
    actividad: 'actividad', demanda: 'demanda', producto: 'producto', contexto: 'contexto', escenario: 'escenario',
    internacional: 'internacional', mercado: 'mercado', mercados: 'mercados', empresas: 'empresas', hogares: 'hogares',
    endeudamiento: 'endeudamiento', petroleo: 'petróleo', cobre: 'cobre', energia: 'energía', alimentos: 'alimentos',
    empleo: 'empleo', salarios: 'salarios', fiscal: 'fiscal', gasto: 'gasto', presupuesto: 'presupuesto', deficit: 'déficit',
    consumo: 'consumo', inversion: 'inversión', exportaciones: 'exportaciones', importaciones: 'importaciones'
  };

  const sourceYear = (q) => {
    const match = String(q.date || '').match(/^(\d{4})/);
    return match ? Number(match[1]) : Number(q.year);
  };
  quotes.forEach((q) => {
    const label = labels.includes(q.label) ? q.label : null;
    const year = sourceYear(q);
    if (!label || !years.includes(year)) return;
    rowCounts[label].set(year, (rowCounts[label].get(year) || 0) + 1);
    const words = new Set((normalizeTopicText(q.text).match(/[a-zñ]{4,}/g) || []).filter((word) => candidateSet.has(word) && !stopWords.has(word) && !participantTokens.has(word)));
    words.forEach((word) => {
      if (!termCounts[label].has(word)) termCounts[label].set(word, new Map());
      const yearly = termCounts[label].get(word);
      yearly.set(year, (yearly.get(year) || 0) + 1);
    });
  });

  const topTerms = {};
  labels.forEach((label) => {
    topTerms[label] = [...termCounts[label].entries()]
      .map(([term, yearly]) => ({
        term,
        total: [...yearly.values()].reduce((sum, value) => sum + value, 0),
        yearly,
      }))
      .sort((a, b) => b.total - a.total || a.term.localeCompare(b.term, 'es'))
      .slice(0, 3);
  });

  /* El SVG usa coordenadas del tamaño visible, no un viewBox fijo de
     1000×450. Así las etiquetas siguen siendo tipográficas en 320px y el
     trazo aprovecha el ancho disponible en desktop. */
  const chartWrap = svg.parentElement;
  const chartRect = chartWrap?.getBoundingClientRect();
  const W = Math.max(280, Math.round(chartRect?.width || svg.clientWidth || 1000));
  const H = Math.max(180, Math.round(chartRect?.height || svg.clientHeight || 450));
  const compactChart = W < 520 || H < 240;
  const margin = compactChart
    ? {
      top: H < 220 ? 31 : 36,
      right: W < 360 ? 74 : 84,
      bottom: H < 220 ? 25 : 30,
      left: W < 360 ? 34 : 48,
    }
    : { top: 42, right: 128, bottom: 42, left: 72 };
  const laneGap = compactChart ? (H < 220 ? 25 : 34) : 42;
  const laneHeight = (H - margin.top - margin.bottom - laneGap) / 2;
  const x = d3.scaleLinear().domain([2000, 2015]).range([margin.left, W - margin.right]);
  const svgEl = d3.select(svg)
    .attr('viewBox', `0 0 ${W} ${H}`)
    /* Si el ratio del contenedor cambia entre el init y el redibujo, 'meet'
       escala el contenido sin estirar el texto ni el trazo. Con 'none' la
       etiquetas se deformaban al cambiar de viewport (local vs GitHub). */
    .attr('preserveAspectRatio', 'xMidYMid meet');
  const chartGroup = svgEl.append('g').attr('class', 'word-chart-group');
  const cursor = svgEl.append('line')
    .attr('class', 'word-cursor')
    .attr('x1', x(2000)).attr('x2', x(2000))
    .attr('y1', margin.top - 4).attr('y2', H - margin.bottom + 3);
  const series = [];

  const formatValue = (label, term, year) => {
    const numerator = term.yearly.get(year) || 0;
    const denominator = rowCounts[label].get(year) || 0;
    return denominator ? (numerator / denominator) * 100 : 0;
  };

  labels.forEach((label, laneIndex) => {
    const laneTop = margin.top + laneIndex * (laneHeight + laneGap);
    const laneBottom = laneTop + laneHeight;
    const laneTerms = topTerms[label];
    const maxValue = Math.max(20, ...laneTerms.flatMap((item) => years.map((year) => formatValue(label, item, year))));
    const y = d3.scaleLinear().domain([0, maxValue]).range([laneBottom, laneTop]);
    const lane = chartGroup.append('g').attr('class', `word-lane word-lane--${label}`);
    lane.append('text').attr('class', `word-lane-label ${label}`).attr('x', margin.left).attr('y', laneTop - 14).text(label === 'hawkish' ? 'Hawkish · restrictiva' : 'Dovish · expansiva');
    [0, maxValue / 2, maxValue].forEach((value) => {
      lane.append('line').attr('class', value === 0 ? 'word-zero-line' : 'word-grid-line')
        .attr('x1', margin.left).attr('x2', W - margin.right).attr('y1', y(value)).attr('y2', y(value));
    });
    lane.append('text').attr('class', 'word-axis-label').attr('x', margin.left - 10).attr('y', laneBottom + 4).attr('text-anchor', 'end').text('0%');
    lane.append('text').attr('class', 'word-axis-label').attr('x', margin.left - 10).attr('y', laneTop + 4).attr('text-anchor', 'end').text(`${Math.round(maxValue)}%`);

    /* En el borde derecho las tres palabras comparten un espacio pequeño.
       Ordenarlas y darles una separación mínima evita que dos términos con
       el mismo valor final se impriman uno encima de otro. */
    const labelGap = compactChart ? 13 : 15;
    const labelMinY = laneTop + (compactChart ? 9 : 11);
    const labelMaxY = laneBottom - (compactChart ? 3 : 4);
    const labelPositions = new Map();
    const labelSpecs = laneTerms.map((item, rank) => {
      const finalValue = formatValue(label, item, 2015);
      return { rank, desired: y(finalValue) + (rank - 1) * labelGap };
    }).sort((a, b) => a.desired - b.desired);
    let nextLabelY = labelMinY;
    labelSpecs.forEach((spec) => {
      const position = Math.max(nextLabelY, Math.min(labelMaxY, spec.desired));
      labelPositions.set(spec.rank, position);
      nextLabelY = position + labelGap;
    });
    const labelOverflow = nextLabelY - labelGap - labelMaxY;
    if (labelOverflow > 0) {
      labelSpecs.forEach((spec) => labelPositions.set(spec.rank, labelPositions.get(spec.rank) - labelOverflow));
    }

    laneTerms.forEach((item, rank) => {
      const values = years.map((year) => ({ year, value: formatValue(label, item, year) }));
      const line = d3.line().x((point) => x(point.year)).y((point) => y(point.value)).curve(d3.curveMonotoneX);
      const path = lane.append('path')
        .attr('class', `word-path ${label}`)
        .attr('d', line(values))
        .attr('stroke-width', rank === 0 ? 2.7 : 1.8)
        .style('opacity', rank === 0 ? 1 : rank === 1 ? 0.68 : 0.42);
      const pathNode = path.node();
      if (pathNode) {
        const length = pathNode.getTotalLength();
        path.attr('stroke-dasharray', length).attr('stroke-dashoffset', length).attr('data-length', length);
      }
      values.forEach((point) => {
        lane.append('circle')
          .attr('class', `word-point ${label}`)
          .attr('cx', x(point.year)).attr('cy', y(point.value)).attr('r', rank === 0 ? 2.8 : 2)
          .style('opacity', rank === 0 ? 0.95 : rank === 1 ? 0.58 : 0.36);
      });
      const last = values[values.length - 1];
      lane.append('text').attr('class', `word-end-label ${label}`).attr('x', x(last.year) + 8).attr('y', labelPositions.get(rank) + 4).text(displayTerms[item.term] || item.term);
      series.push({ label, term: item.term, values, path: pathNode });
    });
  });

  years.forEach((year) => {
    const tick = compactChart
      ? [2000, 2005, 2010, 2015].includes(year)
      : ((year - 2000) % 3 === 0 || year === 2015);
    if (!tick) return;
    svgEl.append('text').attr('class', 'word-axis-label').attr('x', x(year)).attr('y', H - 12).attr('text-anchor', 'middle').text(year);
  });

  const updateYear = (year, reveal = 1) => {
    const safeYear = Math.round(d3.max([2000, Math.min(2015, year)]));
    yearEl.textContent = safeYear;
    cursor.attr('x1', x(safeYear)).attr('x2', x(safeYear));
    series.forEach((item) => {
      if (!item.path) return;
      const length = Number(item.path.getAttribute('data-length') || 0);
      item.path.style.strokeDashoffset = String(length * (1 - reveal));
    });
    const readout = labels.map((label) => {
      const current = series.filter((item) => item.label === label).map((item) => {
        const point = item.values.find((value) => value.year === safeYear);
        return `${displayTerms[item.term] || item.term} ${Math.round(point?.value || 0)}%`;
      }).join(' · ');
      return `${label === 'hawkish' ? 'Hawkish' : 'Dovish'}: ${current || 'sin registros'}`;
    }).join('   /   ');
    readoutEl.textContent = readout || 'No hay términos suficientes en la muestra disponible.';
  };

  updateYear(2000, 0);
  const onPointerMove = (event) => {
    const rect = svg.getBoundingClientRect();
    const localX = ((event.clientX - rect.left) / rect.width) * W;
    updateYear(x.invert(localX), 1);
  };
  const onPointerLeave = () => updateYear(2000 + 15 * 0.5, 1);
  svg.addEventListener('pointermove', onPointerMove);
  chartWrap?.addEventListener('pointerleave', onPointerLeave);
  wordEvolutionDisposers.push(() => {
    svg.removeEventListener('pointermove', onPointerMove);
    chartWrap?.removeEventListener('pointerleave', onPointerLeave);
  });

  const introBoardTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#stageWordEvolution',
      start: 'top 85%',
      end: 'bottom bottom',
      scrub: true,
    },
  })
    .fromTo(intro, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.12, ease: 'none' }, 0.04)
    .fromTo(board, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.15, ease: 'none' }, 0.16)
    .to(intro, { opacity: 0, y: -14, duration: 0.08, ease: 'none' }, 0.90);
  wordEvolutionDisposers.push(() => {
    try { introBoardTl.scrollTrigger?.kill(); } catch (e) { /* noop */ }
    try { introBoardTl.kill(); } catch (e) { /* noop */ }
  });

  const wordEvolutionST = ScrollTrigger.create({
    trigger: '#stageWordEvolution',
    start: 'top 85%',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const reveal = d3.min([1, d3.max([0, (self.progress - 0.08) / 0.52])]);
      updateYear(2000 + self.progress * 15, reveal);
    },
  });
  wordEvolutionDisposers.push(() => wordEvolutionST.kill());
}

function animate() {
  const time = clock.getElapsedTime();
  /* crossT EFECTIVO: entrada y salida son la MISMA curva. Al volver
     (crossT↓ o exitT↑) cámara, mira, FOV, velo y puerta deshacen el cruce. */
  const crossEff = crossT * (1 - exitT);
  particleStoryKeys.forEach((key) => {
    particleStoryMix[key] = THREE.MathUtils.lerp(
      particleStoryMix[key],
      particleStoryTarget[key],
      reduceMotion ? 1 : 0.14
    );
  });
  smoothMouseX = THREE.MathUtils.lerp(smoothMouseX, mouseX, 0.06);
  smoothMouseY = THREE.MathUtils.lerp(smoothMouseY, mouseY, 0.06);
  if (!isDragging) { dragRotY = THREE.MathUtils.lerp(dragRotY, 0, 0.05); dragRotX = THREE.MathUtils.lerp(dragRotX, 0, 0.05); }
  if (coin.children.length > 0) {
    if (coinBirth < 0) coinBirth = time;
    const tElapsed = time - coinBirth;
    const introT = Math.min(tElapsed / (reduceMotion ? 1.2 : 1.8), 1);
    const introEase = 1 - Math.pow(1 - introT, 3);
    const motionScale = reduceMotion ? 0.12 : 1;
    /* Giro sobre su eje Y (como al inicio): la moneda rota completa,
       no un balanceo. swaySpeedY es rad/s (~0.45 → una vuelta cada ~14s). */
    coin.rotation.y = tElapsed * C.swaySpeedY * introEase * motionScale
      + smoothMouseX * (HERO_DOOR_LOCKUP ? 0.08 : 0.22) * motionScale
      + dragRotY;
    coin.rotation.x = (HERO_DOOR_LOCKUP ? -0.11 : C.tiltBase)
      + (HERO_DOOR_LOCKUP ? 0.018 : C.tiltOscillation) * Math.sin(tElapsed * C.tiltSpeed * motionScale)
      + smoothMouseY * -0.12 * motionScale + dragRotX;
    coin.position.y = C.baseY + C.floatAmount * Math.sin(tElapsed * C.floatSpeed * motionScale) * motionScale;
    mouseLight.position.set(smoothMouseX * 2.5, CONFIG.coin.baseY + smoothMouseY * -1.8, 4.0);
    coin.getWorldPosition(projectedPos);
    projectedPos.project(camera);
    const vp = getViewportSize();
    const coinScreenX = (projectedPos.x * 0.5 + 0.5) * vp.width;
    const coinScreenY = (-projectedPos.y * 0.5 + 0.5) * vp.height;
    haloWrap.style.transform = `translate3d(${coinScreenX}px, ${coinScreenY}px, 0)`;

    coinFade = THREE.MathUtils.clamp(1 - (scatterProgress / 0.45), 0, 1);
    if (objectReflection) {
      if (HERO_DOOR_LOCKUP) {
        objectReflection.style.opacity = '0';
      } else {
        const reflectionDistance = Math.max(20, coinTargetPx * 0.48);
        objectReflection.style.transform = `translate3d(${coinScreenX}px, ${coinScreenY + reflectionDistance}px, 0) scale(${0.82 + coinFade * 0.18})`;
        objectReflection.style.opacity = (coinFade * 0.46).toFixed(3);
      }
    }
    coin.visible = (currentStage === 1) && (coinFade > 0.01);
    if (HERO_DOOR_LOCKUP) coin.position.z = 0.55;
    for (let i = 0; i < coinMats.length; i++) {
      coinMats[i].transparent = true;
      coinMats[i].opacity = coinFade;
    }
  }

  /* puerta: acto 2 — fade sutil + parallax de frente (sin giro 360°) */
  let doorVisOpacity = doorFade;
  if (doorGroup.children.length > 0) {
    doorFade = THREE.MathUtils.lerp(doorFade, doorTarget, 0.12);
    if (doorTarget === 0 && doorFade < 0.03) doorFade = 0;
    /* La Sala (b1): la puerta se DISUELVE en la luz cálida al cruzar el umbral
       (en modo 'classic' dissolve=0 → comportamiento previo intacto). */
    /* crossT CRUDO (no crossEff): al salir de la sala hacia El Método
       la puerta NO debe reaparecer. Solo vuelve si el scroll deshace
       el cruce (crossT↓, de vuelta a La Reunión). */
    const dissolve = DOOR_MODE === 'doorway'
      ? THREE.MathUtils.smoothstep((crossT - 0.15) / 0.55, 0, 1)
      : 0;
    doorVisOpacity = doorFade * (1 - dissolve);
    /* doorModel (no solo doorGroup.children) porque el grupo intermedio
       doorModelGroup se añade siempre: si el GLB no cargó, la escena sigue
       "teniendo" la puerta y se encendían niebla y sombra sobre la nada. */
    doorGroup.visible = doorVisOpacity > 0.001 && !!doorModel;
    const doorEase = doorFade * doorFade * (3 - 2 * doorFade);
    const lockupMix = HERO_DOOR_LOCKUP
      ? 1 - THREE.MathUtils.smoothstep(scatterProgress, 0.18, 0.88)
      : 0;
    /* Stage 1: la puerta no sigue el mouse (solo la moneda). El parallax
       vuelve cuando el lockup se suelta hacia La Reunión. */
    const doorMouse = HERO_DOOR_LOCKUP ? (1 - lockupMix) : 1;
    doorGroup.rotation.y = smoothMouseX * 0.05 * doorEase * doorMouse;
    doorGroup.position.x = CONFIG.door.baseX;
    doorGroup.position.z = HERO_DOOR_LOCKUP
      ? (CONFIG.door.heroBaseZ ?? (CONFIG.door.baseZ ?? 0))
      : (CONFIG.door.baseZ ?? 0);
    const heroMul = HERO_DOOR_LOCKUP
      ? THREE.MathUtils.lerp(
          1.25 / Math.max(CONFIG.door.widthVsCoin, 1e-3),
          1,
          1 - THREE.MathUtils.smoothstep(scatterProgress, 0.18, 0.88)
        )
      : 1;
    doorGroup.scale.setScalar((0.94 + 0.06 * doorEase) * heroMul);
    /* La puerta se APOYA, no flota: el pivote (centro de las hojas) se pone
       donde haga falta para que la base de los escalones quede en groundY.
       Anclar el pivote (el `baseY` anterior) hacía que al cambiar el tamaño la
       puerta subiera o bajara sola y se despegara de su propia sombra. */
    const doorBottomWorld = doorModel ? doorBottomOffset * doorModelGroup.scale.y * doorGroup.scale.x : 0;
    const plantedY = (CONFIG.door.groundY ?? 0) - doorBottomWorld;
    doorGroup.rotation.x = -0.12 * lockupMix + smoothMouseY * -0.03 * doorEase * doorMouse;
    doorGroup.position.y = THREE.MathUtils.lerp(plantedY, CONFIG.coin.baseY, lockupMix) + smoothMouseY * -0.06 * doorEase * doorMouse;
    for (let i = 0; i < doorMats.length; i++) {
      doorMats[i].transparent = true;
      doorMats[i].opacity = doorVisOpacity;
    }
    if (HERO_DOOR_LOCKUP && doorLeafMats.length) {
      const leafT = THREE.MathUtils.smoothstep(scatterProgress, 0.28, 0.9);
      for (let i = 0; i < doorLeafMats.length; i++) {
        const m = doorLeafMats[i];
        m.color.copy(doorLeafColorVoid).lerp(doorLeafColorGold, leafT);
        m.metalness = THREE.MathUtils.lerp(0.12, 1.0, leafT);
        m.roughness = THREE.MathUtils.lerp(0.92, 0.22, leafT);
        m.envMapIntensity = THREE.MathUtils.lerp(0.12, 1.3, leafT);
      }
      for (let i = 0; i < doorLeafMeshes.length; i++) {
        doorLeafMeshes[i].visible = leafT > 0.12;
      }
      /* Muros: de piedra de portada a obsidiana gris (el oro es de las hojas). */
      for (let i = 0; i < doorFrameMats.length; i++) {
        const m = doorFrameMats[i];
        m.color.copy(doorFrameColorHero).lerp(doorFrameColorMeet, leafT);
        m.metalness = THREE.MathUtils.lerp(0.08, 0.42, leafT);
        m.roughness = THREE.MathUtils.lerp(0.88, 0.38, leafT);
        m.envMapIntensity = THREE.MathUtils.lerp(0.28, 0.72, leafT);
        if (m.bumpScale != null) m.bumpScale = THREE.MathUtils.lerp(0.045, 0.028, leafT);
        if (m.emissive) {
          m.emissive.setRGB(0, 0, 0);
          m.emissiveIntensity = 0;
        }
      }
      if (doorSpots[0]) {
        doorSpots[0].color.copy(doorSpotKeyHero).lerp(doorSpotKeyMeet, leafT);
        doorSpots[0].intensity = THREE.MathUtils.lerp(12, 18, leafT);
      }
      if (doorSpots[1]) {
        doorSpots[1].color.copy(doorSpotRimHero).lerp(doorSpotRimMeet, leafT);
        doorSpots[1].intensity = THREE.MathUtils.lerp(6, 10, leafT);
      }
      if (doorSpots[2]) {
        doorSpots[2].intensity = THREE.MathUtils.lerp(3.2, 8, leafT);
      }
    }

    /* rig de luces + fog solo mientras la puerta está presente */
    const doorActive = doorVisOpacity > 0.01 && !!doorModel;
    if (doorLightGroup) doorLightGroup.visible = doorActive;
    doorFloor.visible = doorActive && !(HERO_DOOR_LOCKUP && scatterProgress < 0.55);
    doorFloor.material.opacity = 0.8 * doorEase * (1 - dissolve);
    if (scene.fog) scene.fog.density = doorActive ? CONFIG.door.fogDensity * doorEase : 0;
    /* La sombra vive exactamente en la línea de suelo (doorBottomWorld ya se
       usó arriba para apoyar el modelo), y solo existe si la puerta existe. */
    doorFloor.position.set(doorGroup.position.x, doorGroup.position.y + doorBottomWorld, doorGroup.position.z);
    if (doorActive) {
      _spotTarget.set(doorGroup.position.x, doorGroup.position.y, doorGroup.position.z);
      doorSpots.forEach((sp) => {
        sp.target.position.copy(_spotTarget);
        sp.target.updateMatrixWorld();
      });
    }
  }

  /* enjambre: orbita y se dispersa por la pantalla al hacer scroll.
     En La Sala la nube se recoloca delante de la cámara y se comprime;
     de lo contrario el giro continuo la pasa detrás de la cámara en
     ciertos ángulos y la sección queda sin partículas. */
  const roomSwarmCfg = CONFIG.door?.roomSwarm ?? { x: 0, y: 0.55, z: -2.5, scale: 0.35 };
  const roomSwarmT = (DOOR_MODE === 'doorway' && crossEff > 0)
    ? THREE.MathUtils.smoothstep((crossEff - 0.25) / 0.5, 0, 1)
    : 0;
  const roomSwarmScale = THREE.MathUtils.lerp(1, roomSwarmCfg.scale ?? 0.35, roomSwarmT);
  swarm.position.set(
    THREE.MathUtils.lerp(0, roomSwarmCfg.x ?? 0, roomSwarmT),
    THREE.MathUtils.lerp(0, roomSwarmCfg.y ?? 0.55, roomSwarmT),
    THREE.MathUtils.lerp(0, roomSwarmCfg.z ?? -2.5, roomSwarmT)
  );
  swarm.scale.setScalar(roomSwarmScale);
  /* Dentro de la sala se frena el giro completo y queda una oscilación
     suave: movimiento sin barrer la nube fuera del encuadre. */
  const baseSwirl = time * 0.12 + scatterProgress * 0.8;
  const roomSway = roomSwarmT * Math.sin(time * 0.35) * 0.06;
  const storyLock = Math.max(
    particleStoryMix.axes,
    particleStoryMix.timeline,
    particleStoryMix.voices * voiceFocusMix,
    particleStoryMix.acts * actFocusMix
  );
  swarm.rotation.y = baseSwirl * (1 - roomSwarmT) * (1 - storyLock) + roomSway;

  /* La Sala (b1): dentro de la sala la nube se tiñe de cálido (la "luz del
     interior"). Las partículas son unlit (PointsMaterial), así que la luz
     cálida se expresa teñiendo color; al salir, vuelve al tono base. */
  const roomWarm = (DOOR_MODE === 'doorway')
    ? THREE.MathUtils.smoothstep((crossEff - 0.3) / 0.5, 0, 1)
    : 0;

  /* Al elegir una voz, el resto no desaparece: baja de intensidad para que
     la selección se pueda leer dentro del enjambre y la huella colectiva
     siga visible. El mismo tratamiento se usa para acta y cita, sin perder
     jamás las filas vecinas. */
  const focusName = voiceFocusParticipant || voiceFocusRenderedParticipant;
  voiceFocusMix = THREE.MathUtils.lerp(voiceFocusMix, voiceFocusParticipant ? 1 : 0, reduceMotion ? 1 : 0.08);
  actFocusMix = THREE.MathUtils.lerp(actFocusMix, selectedActDate ? 1 : 0, reduceMotion ? 1 : 0.08);
  if (!voiceFocusParticipant && voiceFocusMix < 0.005) voiceFocusRenderedParticipant = null;
  const activeQuoteIndex = activeParticleFocus >= 0 ? activeParticleFocus : -1;
  const voiceStageMix = particleStoryMix.voices * voiceFocusMix;
  const actStageMix = particleStoryMix.acts * actFocusMix;
  const quoteStageMix = particleStoryMix.quotes;
  const cols = pGeo.attributes.color.array;
  for (let i = 0; i < PCOUNT; i++) {
    const idx = i * 3;
    const q = quotes[i];
    const isVoiceFocus = !!(focusName && q && q.participant === focusName);
    const isActFocus = !!(selectedActDate && pActKeys[i] === selectedActDate);
    const isQuoteFocus = i === activeQuoteIndex;
    const voiceVisibility = focusName
      ? THREE.MathUtils.lerp(1, isVoiceFocus ? 1 : 0.10, voiceStageMix)
      : 1;
    const actVisibility = selectedActDate
      ? THREE.MathUtils.lerp(1, isActFocus ? 1 : 0.16, actStageMix)
      : 1;
    const quoteVisibilityMix = activeQuoteIndex >= 0 ? Math.max(0.55, quoteStageMix * 0.82) : 0;
    const quoteVisibility = activeQuoteIndex >= 0
      ? THREE.MathUtils.lerp(1, isQuoteFocus ? 1.15 : 0.28, quoteVisibilityMix)
      : 1;
    const visibility = voiceVisibility * actVisibility * quoteVisibility;
    const warm = roomWarm * 0.22;
    const litR = THREE.MathUtils.lerp(pColors[idx], 1.00, warm);
    const litG = THREE.MathUtils.lerp(pColors[idx + 1], 0.80, warm);
    const litB = THREE.MathUtils.lerp(pColors[idx + 2], 0.52, warm);
    /* La atenuación narrativa no debe convertir el contexto en píxeles
       negros. Se conserva un mínimo cromático y se interpola hacia él,
       en vez de multiplicar el color hasta cero. El foco sigue teniendo
       prioridad y puede superar 1 para ganar un poco de luz. */
    const visibleMix = THREE.MathUtils.clamp(Math.max(visibility, 0.22), 0, 1);
    const strength = Math.max(1, visibility);
    const safeR = Math.max(pColors[idx] * 0.34, 0.14);
    const safeG = Math.max(pColors[idx + 1] * 0.34, 0.16);
    const safeB = Math.max(pColors[idx + 2] * 0.34, 0.20);
    cols[idx] = THREE.MathUtils.lerp(safeR, litR, visibleMix) * strength;
    cols[idx + 1] = THREE.MathUtils.lerp(safeG, litG, visibleMix) * strength;
    cols[idx + 2] = THREE.MathUtils.lerp(safeB, litB, visibleMix) * strength;
  }
  pGeo.attributes.color.needsUpdate = true;

  /* La misma nube cambia de gramática por acto. El plano y el timeline se
     alinean sin jitter; voz y acta solo convergen con la selección activa. */
  const positions = pGeo.attributes.position.array;
  const swarmScatter = THREE.MathUtils.lerp(scatterProgress, 0.06, roomSwarmT);
  const axesMix = particleTargetsReady ? particleStoryMix.axes : 0;
  const timelineMix = particleTargetsReady ? particleStoryMix.timeline : 0;
  const particleEase = reduceMotion ? 1 : 0.16;
  const ambientLock = Math.max(axesMix, timelineMix, voiceStageMix, actStageMix);
  for (let i = 0; i < PCOUNT; i++) {
    const idx = i * 3;
    const ox = pOriginalPos[idx], oy = pOriginalPos[idx+1], oz = pOriginalPos[idx+2];
    const sx = pScatterPos[idx], sy = pScatterPos[idx+1], sz = pScatterPos[idx+2];
    const baseX = THREE.MathUtils.lerp(ox, sx, swarmScatter);
    const baseY = THREE.MathUtils.lerp(oy, sy, swarmScatter);
    const baseZ = THREE.MathUtils.lerp(oz, sz, swarmScatter);
    const wave = Math.sin(time * 0.9 + i * 0.5) * 0.08 * animMul * (1 - ambientLock);
    let targetX = baseX + wave;
    let targetY = baseY + wave;
    let targetZ = baseZ;
    const q = quotes[i];

    if (axesMix > 0) {
      targetX = THREE.MathUtils.lerp(targetX, pAxisPos[idx], axesMix);
      targetY = THREE.MathUtils.lerp(targetY, pAxisPos[idx + 1], axesMix);
      targetZ = THREE.MathUtils.lerp(targetZ, pAxisPos[idx + 2], axesMix);
    }
    if (timelineMix > 0) {
      targetX = THREE.MathUtils.lerp(targetX, pTimelinePos[idx], timelineMix);
      targetY = THREE.MathUtils.lerp(targetY, pTimelinePos[idx + 1], timelineMix);
      targetZ = THREE.MathUtils.lerp(targetZ, pTimelinePos[idx + 2], timelineMix);
    }
    if (voiceStageMix > 0 && focusName && q?.participant === focusName) {
      targetX = THREE.MathUtils.lerp(targetX, pVoiceFocusPos[idx], voiceStageMix);
      targetY = THREE.MathUtils.lerp(targetY, pVoiceFocusPos[idx + 1], voiceStageMix);
      targetZ = THREE.MathUtils.lerp(targetZ, pVoiceFocusPos[idx + 2], voiceStageMix);
    }
    if (actStageMix > 0 && selectedActDate && pActKeys[i] === selectedActDate) {
      targetX = THREE.MathUtils.lerp(targetX, pActFocusPos[idx], actStageMix);
      targetY = THREE.MathUtils.lerp(targetY, pActFocusPos[idx + 1], actStageMix);
      targetZ = THREE.MathUtils.lerp(targetZ, pActFocusPos[idx + 2], actStageMix);
    }

    positions[idx] = THREE.MathUtils.lerp(positions[idx], targetX, particleEase);
    positions[idx + 1] = THREE.MathUtils.lerp(positions[idx + 1], targetY, particleEase);
    positions[idx + 2] = THREE.MathUtils.lerp(positions[idx + 2], targetZ, particleEase);
  }
  pGeo.attributes.position.needsUpdate = true;

  /* atenuar las luces genéricas de la moneda cuando la puerta domina.
     En doorway se usa la opacidad REAL de la puerta: cuando se disuelve en
     el umbral, las luces vuelven a su nivel (la sala no queda a oscuras). */
  const camBlend = doorGroup.children.length > 0 ? doorVisOpacity : 0;
  const dim = 1 - camBlend * 0.85;
  key.intensity = L.key.intensity * dim;
  fill.intensity = L.fill.intensity * dim;
  rim.intensity = L.rim.intensity * dim;
  front.intensity = L.front.intensity * dim;
  ambient.intensity = L.ambient.intensity * dim;
  /* Encuadre vivo (lockup → La Reunión a la misma distancia).
     El cruce 2→3 congela ESTE pose: la puerta no cambia de tamaño
     al arrancar el dolly, solo al cruzar el umbral. */
  const choreo = cameraChoreography(storyProgress);
  const lockupCamMix = HERO_DOOR_LOCKUP
    ? 1 - THREE.MathUtils.smoothstep(scatterProgress, 0.18, 0.88)
    : 0;
  if (lockupCamMix > 0) {
    const approachY = CONFIG.door.approachCamY ?? 0.62;
    const approachZ = CONFIG.door.approachCamZ ?? CONFIG.camera.z;
    choreo.pos.set(
      0,
      THREE.MathUtils.lerp(approachY, CONFIG.camera.y, lockupCamMix),
      THREE.MathUtils.lerp(approachZ, CONFIG.camera.z, lockupCamMix)
    );
    /* AQUÍ se decide dónde cae la moneda en la pantalla.
       La mira NO va a su centro: se desplaza para que la moneda aterrice
       exactamente en getHeroCoinFrame().centerY, que es el centro de la
       banda libre medida contra el titular real. Como la cámara proyecta
       lo que mira en el centro del viewport:
           screenY = vpH/2 + (look.y − coin.baseY) · pxPerUnit
       despejando, look.y = coin.baseY + (centerY − vpH/2) / pxPerUnit.
       pxPerUnit usa el fov real y la distancia real a la moneda (z = 0.55). */
    const vpH = getViewportSize().height;
    const coinDist = Math.max(CONFIG.camera.z - 0.55, 1e-3);
    const pxPerUnit = vpH / (2 * Math.tan((CONFIG.camera.fov * Math.PI) / 360) * coinDist);
    const aimY = CONFIG.coin.baseY
      + (heroCoinFrame.centerY - vpH / 2) / Math.max(pxPerUnit, 1e-6);
    choreo.look.set(0, THREE.MathUtils.lerp(approachY, aimY, lockupCamMix), 0);
  }

  /* La Sala (b1): dolly a través del umbral. Ida y vuelta usan el mismo
     lerp desde el encuadre de La Reunión — volver ES la animación inversa. */
  if (DOOR_MODE === 'doorway' && crossEff > 0.001) {
    const enterY = CONFIG.door.approachCamY ?? 0.62;
    const enterZ = CONFIG.door.approachCamZ ?? CONFIG.camera.z;
    const crossEase = THREE.MathUtils.smoothstep(crossEff, 0, 1);
    camera.position.set(
      THREE.MathUtils.lerp(0, CONFIG.camera.x, crossEase),
      THREE.MathUtils.lerp(enterY, CONFIG.door.roomCamY ?? 0.62, crossEase),
      THREE.MathUtils.lerp(enterZ, CONFIG.door.roomCamZ ?? -0.5, crossEase)
    );
    /* Encuadre del acercamiento (tres fases encadenadas por crossT):
         1) mira neutra → centro de la puerta  [aimDoor: crossT 0 → 0.45]
         2) mira bloqueada en la puerta mientras ésta se disuelve
         3) puerta ya disuelta → mira al interior de la sala  [aimRoom: 0.55 → 0.95]
       La fase 1 usa el centro de la FIGURA COMPLETA (pivot ± offsets reales
       medidos al cargar el GLB), no el pivote de las hojas. Como la mira y el
       dolly comparten easings suaves, la transición no tiene saltos. */
    const [ad0, ad1] = CONFIG.door.aimDoorT ?? [0, 0.45];
    const [ar0, ar1] = CONFIG.door.aimRoomT ?? [0.55, 0.95];
    const aimDoor = THREE.MathUtils.smoothstep((crossEff - ad0) / Math.max(ad1 - ad0, 1e-3), 0, 1);
    const aimRoom = THREE.MathUtils.smoothstep((crossEff - ar0) / Math.max(ar1 - ar0, 1e-3), 0, 1);
    _lookBase.set(0, CONFIG.door.approachCamY ?? 0.62, 0);
    _doorLook.set(
      doorGroup.position.x,
      doorGroup.position.y + (doorBottomOffset + doorTopOffset) * 0.5 * doorModelGroup.scale.y * doorGroup.scale.x,
      doorGroup.position.z
    );
    _roomLook.copy(_lookBase).lerp(_doorLook, aimDoor).lerp(_roomLookTarget, aimRoom);
    camera.lookAt(_roomLook);
  } else {
    /* Coreografía: la cámara viaja por los capítulos en vez de quedarse
       clavada. La rama del dolly (crossEff>0) sigue mandando durante el
       cruce; aquí se aplica el plano-secuencia del resto de la pieza. */
    camera.position.copy(choreo.pos);
    camera.lookAt(choreo.look);
  }

  /* La Sala (b1): la luz del interior sube con el cruce y se mantiene en la sala */
  if (roomLight) {
    const lightT = DOOR_MODE === 'doorway'
      ? THREE.MathUtils.smoothstep((crossEff - 0.2) / 0.5, 0, 1)
      : 0;
    roomLight.intensity = lightT * (CONFIG.door?.roomLight?.intensity ?? 10);
  }

  /* La Sala (b1): la cámara cruza el plano de la puerta. El FOV hace un
     push breve 0 → 1 → 0 para vender la aceleración sin dejar un zoom
     permanente al terminar el dolly. */
  const targetFov = CONFIG.camera.fov + (
    DOOR_MODE === 'doorway'
      ? Math.sin(Math.PI * THREE.MathUtils.clamp(crossEff, 0, 1)) * (CONFIG.door?.fovKick ?? 4)
      : 0
  );
  if (Math.abs(camera.fov - targetFov) > 0.01) {
    camera.fov = targetFov;
    camera.updateProjectionMatrix();
  }

  /* Velo concentrado en el cruce real del plano (crossT ≈ 0.8), no en el
     centro arbitrario del trigger. Termina en 1 para devolver la escena a
     su luminosidad normal una vez dentro. */
  const veilShape = DOOR_MODE === 'doorway'
    ? Math.sin(Math.PI * THREE.MathUtils.clamp((crossEff - 0.6) / 0.4, 0, 1))
    : 0;
  if (scene.fog) {
    const veil = veilShape * (CONFIG.door?.veilFog ?? 0);
    scene.fog.density = Math.max(scene.fog.density, veil);
  }
  /* Opacidad de la nube en tres factores:
     1) scatterProgress: al dispersarse, los 100 sprites se apilan en el
        centro del frame. Bajar la opacidad con la dispersión mantiene el
        polvo sutil y el centro limpio para leer los datos.
     2) veilShape: atenuación puntual al pasar la cámara por el umbral (una
        partícula cercana no debe leerse como un parche).
     3) axesFocusT: cuando la sección de ejes está al frente, la nube cede
        aún más — lo importante es el scatter de intervenciones. */
  /* En el plano los puntos dejan de competir con el polvo ambiental: la
     atm&oacute;sfera queda como profundidad, no como ruido sobre el dato. */
  const stageDensity = Math.max(
    axesFocusT,
    particleStoryMix.voices * 0.72,
    particleStoryMix.acts * 0.64,
    particleStoryMix.timeline * 0.78,
    particleStoryMix.quotes * 0.70
  );
  /* El dato contextual se atenúa, pero nunca se apaga: la Sala es UN solo
     mundo visual, así que la nube permanece como atmósfera de fondo en
     todos los capítulos (solo cede protagonismo al dato activo). */
  const stageAlpha = Math.max(0.36, 1 - 0.60 * stageDensity);
  const ambientMin = Math.max(0.42, 0.82 - 0.30 * scatterProgress);
  /* Cuando la estatua central está al frente (dentro de La Sala), el
     centro se despeja de partículas: la nube queda como polvo de fondo
     (nunca se apaga) pero deja de ocultar a la figura. figureClear es
     1 fuera de la sala, así el resto de la pieza no cambia. */
  const figureClear = (DOOR_MODE === 'doorway')
    ? 1 - 0.55 * THREE.MathUtils.smoothstep((roomSwarmT - 0.1) / 0.5, 0, 1)
    : 1;
  pMat.opacity = ambientMin * (1 - 0.5 * veilShape) * stageAlpha * figureClear;

  /* Figuras de la sala: se muestran recién al cruzar el umbral, nunca en
     el hero (en la captura anterior los placeholders saturaban la portada).
     Al rampar reveal entran suavemente y el script los sigue animando. */
  const figureReveal = DOOR_MODE === 'doorway'
    ? THREE.MathUtils.smoothstep((roomSwarmT - 0.08) / 0.55, 0, 1)
    : (currentStage !== 1 ? 1 : 0);
  if (figureSystem) {
    /* El bbox solo es válido cuando los GLB han cargado; por eso se resuelve
       aquí (una vez por resize) y no en syncViewportAndObjects(). */
    if (roomAimDirty) refreshRoomAim();
    figureSystem.group.visible = figureReveal > 0.01;
    figureSystem.group.scale.setScalar(0.86 + 0.14 * figureReveal);
    figureSystem.group.position.y = (1 - figureReveal) * 0.5;
    /* Sigue la iluminación de las figuras (placeholder no enciende nada):
       la estatua se enciende como pieza de museo al cruzar y el relleno
       frío por la izquierda le da volumen a la piedra. */
    let statueReady = false;
    figureSystem.figures.forEach((record) => {
      if (record.placeholder) {
        record.placeholder.rotation.y = time * 0.18 * figureReveal;
        record.placeholder.position.y = Math.sin(time * 0.6 + record.def.x) * 0.04 * figureReveal;
      }
      if (record.model) statueReady = true;
    });
    const statueT = statueReady ? figureReveal : 0;
    /* El foco apunta a la ESTATUA (0, ~0.9, -4.8), no al origen de la
       escena: antes el target se reescribía con la z del grupo (0) y el
       cono iluminaba el aire delante de la cámara. */
    const statueRecord = figureSystem.figures.get('balanza');
    const statueDef = statueRecord?.def;
    const statueX = (statueDef?.x ?? 0) + figureSystem.group.position.x;
    const statueZ = (statueDef?.z ?? (CONFIG.room?.figure?.z ?? -4.8));
    const statueMidY = figureSystem.group.position.y + 0.55 * (statueDef?.scale ?? 1.15) + (statueRecord?.root?.position.y ?? 0);
    figureAccent.intensity = statueT * (CONFIG.room?.accentIntensity ?? 14);
    figureAccent.position.set(statueX + 0.9, 3.1, statueZ + 2.2);
    figureAccentTarget.position.set(statueX, statueMidY, statueZ);
    figureFill.position.set(statueX - 2.2, 1.5, statueZ + 2.1);
    figureFill.intensity = statueT * (CONFIG.room?.fillIntensity ?? 4);

    /* Órbitas: acompañan el mismo reveal que la figura y se apoyan sobre
       el pedestal (por eso heredan la escala y el desplazamiento del
       grupo de figuras). */
    const plinth = figureSystem.figures.get('soporte');
    orbitGroup.position.set(statueX, figureSystem.group.position.y + (plinth?.height ?? 0) * 0.25, statueZ);
    orbitGroup.scale.setScalar(figureSystem.group.scale.x);
    orbitMat.uniforms.uFocus.value = orbitFocusOwner();
    updateOrbitals(reduceMotion ? 0 : time, statueT);
  }

  if (renderer) renderer.render(scene, camera);
}
/* Un solo loop rAF: el ticker de GSAP (que ya maneja Lenis) maneja la escena.
   Antes había dos loops rAF independientes desincronizados. */
gsap.ticker.add(animate);

const quotePanelEl = document.getElementById('quotePanel');
let lastFocusedCard = null;
let quotePanelHideTimer = null;
const closeQuotePanel = () => {
  quotePanelEl.classList.remove('visible');
  quotePanelEl.setAttribute('aria-hidden', 'true');
  clearTimeout(quotePanelHideTimer);
  quotePanelHideTimer = setTimeout(() => {
    if (!quotePanelEl.classList.contains('visible')) quotePanelEl.hidden = true;
  }, 360);
  pinnedIndex = -1;
  hoverIndex = -1;
  activeParticleFocus = -1;
  syncAxesMarkFocus(-1);
  if (lastFocusedCard) { lastFocusedCard.focus({ preventScroll: true }); lastFocusedCard = null; }
};
document.getElementById('quotePanelClose').addEventListener('click', closeQuotePanel);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && quotePanelEl.classList.contains('visible')) closeQuotePanel();
});

/* Un único handler de tamaño para la cámara, el renderer y los objetos 3D.
   Incluye visualViewport (móvil/orientación) y repite setPixelRatio porque
   al cambiar de display/DPR ese valor puede variar aunque el viewport CSS
   no cambie. */
function syncViewportAndObjects() {
  const { width, height } = getViewportSize();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  if (renderer) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
  }
  syncOrbitPointScale();
  applyCoinScale();
  roomAimDirty = true;   // el retablo se reencuadra contra el titular de La Sala
  applyDoorScale();
  applyDoorTextStyle();
}
window.addEventListener('resize', syncViewportAndObjects);
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', syncViewportAndObjects);
}

/* ────────────────────────────────
   Acto 4: D3.js + WebGL Bridge
──────────────────────────────── */
let d3Scales = {};
/* 0→1 mientras #stageAxes es protagonista: el enjambre ambiental cede
   protagonismo (opacidad) para que la capa factual SVG y sus destinos
   proyectados manden. */
let axesFocusT = 0;

/* La altura de cada punto usa la puntuación de orientación disponible en la
   muestra. Así el plano comunica algo más que color: la distancia al eje
   central conserva la diferencia entre señales fuertes y suaves, siempre de
   forma determinística para que la composición no cambie al recargar. */
function getQuoteAxisSentiment(q) {
  const label = q?.label || 'neutral';
  const score = THREE.MathUtils.clamp(Number(q?.score) || 0.7, 0, 1);
  const seed = String(q?.date || '').length + String(q?.text || '').length;
  let x = Math.sin(seed * 9301 + 49297) * 233280;
  const seeded = x - Math.floor(x);
  if (label === 'hawkish') return 0.30 + score * 0.40;
  if (label === 'dovish') return -(0.30 + score * 0.40);
  return (seeded - 0.5) * 0.18;
}

function initD3Axes() {
  const container = document.getElementById('d3-canvas');
  if (!container) return;
  container.innerHTML = '';

  const vp = getViewportSize();
  const width = vp.width;
  const height = vp.height;

  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('role', 'img')
    .attr('aria-label', 'Mapa de intervenciones: cada punto conserva su fecha, participante y fragmento')
    .style('position', 'absolute')
    .style('inset', '0');

  /* Más área vertical para que la diferencia entre tonos se lea como un
     mapa y no como una hilera de puntos. El eje cero permanece cerca del
     centro óptico de la pantalla. */
  const margin = {
    top: height * (width < 640 ? 0.34 : 0.28),
    right: width * 0.15,
    bottom: height * 0.18,
    left: width * 0.15,
  };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const xScale = d3.scaleTime()
    .domain([new Date(2000, 0, 1), new Date(2015, 11, 31)])
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([-1, 1])
    .range([margin.top + innerH, margin.top]);

  d3Scales = { xScale, yScale };

  const axisY = margin.top + innerH / 2;
  const g = svg.append('g');

  /* Campo de lectura: una caja casi invisible, guías verticales y dos
     referencias horizontales. El marco da estructura al mapa sin quitarle
     aire ni hacerlo parecer un dashboard convencional. */
  g.append('rect')
    .attr('class', 'axes-plot-field')
    .attr('x', margin.left)
    .attr('y', margin.top)
    .attr('width', innerW)
    .attr('height', innerH)
    .attr('rx', Math.min(8, width * 0.01));

  const tickCount = width < 500 ? 4 : width < 900 ? 6 : 8;
  const gridLayer = g.append('g').attr('class', 'axes-grid');
  gridLayer.selectAll('.axes-grid-vertical')
    .data(xScale.ticks(tickCount))
    .join('line')
    .attr('class', 'axes-grid-vertical')
    .attr('x1', (date) => xScale(date)).attr('x2', (date) => xScale(date))
    .attr('y1', margin.top).attr('y2', margin.top + innerH);

  [-0.5, 0.5].forEach((value) => {
    g.append('line')
      .attr('class', 'axes-grid-guide')
      .attr('x1', margin.left).attr('x2', width - margin.right)
      .attr('y1', yScale(value)).attr('y2', yScale(value));
  });
  g.append('line')
    .attr('class', 'axes-zero-line')
    .attr('x1', margin.left).attr('x2', width - margin.right)
    .attr('y1', axisY).attr('y2', axisY);

  /* Puntos de dato nítidos en SVG. El enjambre 3D queda como atmósfera; este
     plano es la lectura precisa de las 99 intervenciones dentro del rango
     2000–2015 y el radio recupera el score de orientación. */
  const domainStart = new Date(2000, 0, 1).getTime();
  const domainEnd = new Date(2015, 11, 31).getTime();
  const axisQuotes = quotes
    .map((q, index) => ({ q, index, date: new Date(q.date) }))
    .filter(({ date }) => date.getTime() >= domainStart && date.getTime() <= domainEnd);
  const dataLayer = svg.append('g').attr('class', 'axes-data-layer');
  const dataPoints = dataLayer.selectAll('.axes-data-point')
    .data(axisQuotes, (d) => d.index)
    .join((enter) => {
      const group = enter.append('g').attr('class', 'axes-data-mark');
      group.append('circle').attr('class', 'axes-data-halo');
      group.append('circle').attr('class', 'axes-data-point');
      return group;
    });

  dataPoints
    .attr('transform', ({ q, date }) => `translate(${xScale(date)}, ${yScale(getQuoteAxisSentiment(q))})`)
    .attr('data-quote-index', ({ index }) => index)
    .attr('class', ({ q }) => `axes-data-mark axes-data-mark--${q.label || 'neutral'}`)
    .attr('tabindex', '0')
    .attr('role', 'button')
    .attr('aria-label', ({ q }) => `Abrir intervención ${q.label || 'neutral'} de ${q.participant || 'participante anónimo'}, ${q.formatted_date || q.date || q.year || 'fecha no especificada'}`)
    .on('keydown', (event, d) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      lastFocusedCard = event.currentTarget;
      pinnedIndex = d.index;
      hoverIndex = -1;
      openQuote(d.index, { x: window.innerWidth * 0.55, y: window.innerHeight * 0.58 });
    })
    .on('click', (event, d) => {
      event.stopPropagation();
      lastFocusedCard = event.currentTarget;
      pinnedIndex = d.index;
      hoverIndex = -1;
      openQuote(d.index, { x: event.clientX, y: event.clientY });
    })
    .each(function ({ q }) {
      const score = THREE.MathUtils.clamp(Number(q.score) || 0.7, 0, 1);
      const radius = 2.8 + score * 2.1;
      const mark = d3.select(this);
      mark.select('.axes-data-halo')
        .attr('r', radius * 1.9)
        .attr('class', `axes-data-halo axes-data-halo--${q.label || 'neutral'}`);
      mark.select('.axes-data-point')
        .attr('r', radius)
        .attr('class', `axes-data-point axes-data-point--${q.label || 'neutral'}`);
    });

  const xAxis = d3.axisBottom(xScale)
    .ticks(tickCount)
    .tickSizeOuter(0)
    .tickFormat(d3.timeFormat('%Y'));
  const xAxisGroup = g.append('g')
    .attr('class', 'axes-x-axis')
    .attr('transform', `translate(0, ${axisY})`)
    .call(xAxis);
  xAxisGroup.selectAll('text')
    .attr('dy', '1.55em')
    .style('fill', 'rgba(255,255,255,0.48)')
    .style('font-family', 'var(--font-body)')
    .style('font-size', width < 500 ? '10px' : '12px')
    .style('letter-spacing', '0.2px');
  xAxisGroup.selectAll('.domain, .tick line')
    .style('stroke', 'rgba(255,255,255,0.13)');

  /* Etiquetas de tono en el eje Y — el copy de la sección lo promete
     ("arriba restrictivo, abajo expansivo") y ahora se apoyan en el marco
     del plano, no flotan separadas del gráfico. */
  const narrowAxes = width < 640;
  const toneX = narrowAxes ? 10 : margin.left - 16;
  const toneAnchor = narrowAxes ? 'start' : 'end';
  svg.append('text')
    .attr('x', toneX).attr('y', margin.top - 12)
    .attr('text-anchor', toneAnchor)
    .style('fill', 'rgba(255,215,106,0.82)').style('font-size', width < 500 ? '11px' : '13px')
    .style('letter-spacing', '2px').style('text-transform', 'uppercase')
    .text('Hawkish ↑');
  svg.append('text')
    .attr('x', toneX).attr('y', margin.top + innerH + 20)
    .attr('text-anchor', toneAnchor)
    .style('fill', 'rgba(138,180,248,0.82)').style('font-size', width < 500 ? '11px' : '13px')
    .style('letter-spacing', '2px').style('text-transform', 'uppercase')
    .text('Dovish ↓');

  return d3Scales;
}

/* Cámara de "layout" para proyectar el scatter de intervenciones SIEMPRE
   con el encuadre base (hero), no con la cámara animada del momento. Si se
   redimensiona durante La Sala, el dolly deja la cámara en otro lugar y el
   scatter quedaría proyectado con coordenadas incorrectas para los ejes. */
const _layoutCamera = new THREE.PerspectiveCamera();
function getLayoutCamera() {
  const { width, height } = getViewportSize();
  _layoutCamera.aspect = width / height;
  _layoutCamera.fov = CONFIG.camera.fov;
  _layoutCamera.near = camera.near;
  _layoutCamera.far = camera.far;
  _layoutCamera.position.set(CONFIG.camera.x, CONFIG.camera.y, CONFIG.camera.z);
  _layoutCamera.up.set(0, 1, 0);
  _layoutCamera.lookAt(0, camBaseY, 0);
  _layoutCamera.updateProjectionMatrix();
  _layoutCamera.updateMatrixWorld(true);
  return _layoutCamera;
}

function get3DPosFromData(date, sentiment) {
  const { xScale, yScale } = d3Scales;
  if (!xScale || !yScale) return new THREE.Vector3(0, 0, 0);

  const px = xScale(date);
  const py = yScale(sentiment);
  const vp = getViewportSize();
  const xNDC = (px / vp.width) * 2 - 1;
  const pyNDC = -(py / vp.height) * 2 + 1;

  const layoutCam = getLayoutCamera();
  const vector = new THREE.Vector3(xNDC, pyNDC, 0.5).unproject(layoutCam);
  const dir = vector.sub(layoutCam.position).normalize();
  const distance = -layoutCam.position.z / dir.z;
  return layoutCam.position.clone().add(dir.multiplyScalar(distance));
}

/* Construye los destinos narrativos a partir de la misma fila que alimenta
   el SVG. No se inventa una segunda muestra: fecha, voz, acta y tono son
   los metadatos que deciden dónde puede ir cada punto. */
function buildParticleStoryTargets() {
  if (!quotes.length || !d3Scales.xScale || !d3Scales.yScale) return;

  const participantGroups = new Map();
  const actGroups = new Map();
  quotes.forEach((q, index) => {
    const participant = q?.participant || 'Participante anónimo';
    const actKey = pActKeys[index];
    if (!participantGroups.has(participant)) participantGroups.set(participant, []);
    if (!actGroups.has(actKey)) actGroups.set(actKey, []);
    participantGroups.get(participant).push(index);
    actGroups.get(actKey).push(index);
  });

  participantGroups.forEach((indices) => {
    indices.forEach((index, rank) => {
      pParticipantRank[index] = rank;
      pParticipantCount[index] = indices.length;
    });
  });
  actGroups.forEach((indices) => {
    indices.forEach((index, rank) => {
      pActRank[index] = rank;
      pActCount[index] = indices.length;
    });
  });

  quotes.forEach((q, index) => {
    const idx = index * 3;
    const date = /^\d{4}-\d{2}-\d{2}$/.test(String(q?.date || ''))
      ? new Date(`${q.date}T00:00:00Z`)
      : new Date(`${Number(q?.year) || 2000}-01-01T00:00:00Z`);
    const sentiment = getQuoteAxisSentiment(q);
    const axis = get3DPosFromData(date, sentiment);
    pAxisPos[idx] = axis.x;
    pAxisPos[idx + 1] = axis.y;
    pAxisPos[idx + 2] = 0.06 + (particleRandom(index, 12) - 0.5) * 0.06;

    const toneLift = q?.label === 'hawkish' ? 0.22 : q?.label === 'dovish' ? -0.22 : 0;
    const participantCount = Math.max(pParticipantCount[index], 1);
    const participantRank = pParticipantRank[index];
    pVoiceFocusPos[idx] = (participantRank - (participantCount - 1) / 2) * 0.18;
    pVoiceFocusPos[idx + 1] = 0.66 + toneLift + (particleRandom(index, 13) - 0.5) * 0.12;
    pVoiceFocusPos[idx + 2] = -1.35 + (particleRandom(index, 14) - 0.5) * 0.28;

    const actCount = Math.max(pActCount[index], 1);
    const actRank = pActRank[index];
    pActFocusPos[idx] = (actRank - (actCount - 1) / 2) * 0.22;
    pActFocusPos[idx + 1] = 0.60 + toneLift * 0.8 + (particleRandom(index, 15) - 0.5) * 0.15;
    pActFocusPos[idx + 2] = -1.05 + (particleRandom(index, 16) - 0.5) * 0.22;

    const yearMatch = String(q?.date || '').match(/^(\d{4})/);
    const year = THREE.MathUtils.clamp(Number(yearMatch ? yearMatch[1] : q?.year) || 2000, 2000, 2015);
    const yearT = (year - 2000) / 15;
    pTimelinePos[idx] = -2.65 + yearT * 5.3 + (particleRandom(index, 17) - 0.5) * 0.11;
    pTimelinePos[idx + 1] = 0.66 + sentiment * 1.05 + (particleRandom(index, 18) - 0.5) * 0.12;
    pTimelinePos[idx + 2] = -0.32 + (particleRandom(index, 19) - 0.5) * 0.18;
  });
  particleTargetsReady = true;
}

initD3Axes();
buildParticleStoryTargets();
/* Debounce: en mobile el resize dispara varias veces (barra de URL) y
   reconstruir el SVG entero en cada evento era innecesario */
let d3ResizeT;
function onViewportResizeDebounced() {
  clearTimeout(d3ResizeT);
  d3ResizeT = setTimeout(() => {
    initD3Axes();
    buildParticleStoryTargets();
    initWordEvolution();
    if (activeParticleFocus >= 0) syncAxesMarkFocus(activeParticleFocus);
    rebuildCameraChoreography();
  }, 150);
}
window.addEventListener('resize', onViewportResizeDebounced);
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', onViewportResizeDebounced);
}

/* ────────────────────────────────
   Hook — señales hawkish/dovish
   Rediseño editorial: el texto ya no se "escanea" con una barra de luz
   ni explota en partículas. La sección ahora cuenta la idea como un
   encabezado serif + dos tarjetas de señal (una hawkish, una dovish).
   La nube de memoria ya está construida antes del hook y reaparece en
   #stageAxes mediante los destinos proyectados del mismo dataset.
──────────────────────────────── */
function initTextToParticlePOC() {
  /* El hook solo coreografía su contenido editorial. La nube de memoria
     ya existe arriba y es la única geometría de partículas de la escena;
     el plano #stageAxes reutiliza sus destinos, no crea un scatter paralelo. */
  const hookContent = document.getElementById('hookContent');
  if (!hookContent) return;
  const rows = gsap.utils.toArray(hookContent.querySelectorAll('.signal-card'));
  const dividerSpan = hookContent.querySelector('.hook-divider > span');
  const footnote = hookContent.querySelector('.hook-footnote');

  gsap.timeline({
    scrollTrigger: {
      trigger: '#stageHook',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    }
  })
    .fromTo('.hook-lead',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.14, ease: 'none' }, 0.02)
    .fromTo('.hook-caption',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.12, ease: 'none' }, 0.18)
    .fromTo(dividerSpan,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.14, ease: 'none' }, 0.32)
    .fromTo(rows,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.16, ease: 'none', stagger: 0.08 }, 0.42)
    .fromTo(footnote,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.14, ease: 'none' }, 0.68)
    .to(['#stageHook h2[data-hook]', hookContent],
      { opacity: 0, y: -18, duration: 0.12, ease: 'none' }, 0.86);
}


initTextToParticlePOC();

/* Los estados posteriores a los ejes reutilizan la misma nube como una
   capa de profundidad. El texto y los gráficos HTML/SVG siguen encima; la
   escena solo cambia de disposición al entrar en cada acto. */
function initParticleStoryScroll() {
  const stageFor = (selector, key) => {
    if (!document.querySelector(selector)) return;
    ScrollTrigger.create({
      trigger: selector,
      start: 'top 82%',
      end: 'bottom 18%',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const enter = THREE.MathUtils.smoothstep(progress / 0.18, 0, 1);
        const leave = THREE.MathUtils.smoothstep((progress - 0.82) / 0.18, 0, 1);
        setParticleStoryTarget(key, Math.min(enter, 1 - leave));
      },
      onLeave: () => setParticleStoryTarget(key, 0),
      onLeaveBack: () => setParticleStoryTarget(key, 0),
    });
  };

  stageFor('#stageVoices', 'voices');
  stageFor('#stageActs', 'acts');
  stageFor('#stageTimeline', 'timeline');
  stageFor('#stageQuotes', 'quotes');
}

// Global scroll scrubber
const tsProgress = document.getElementById('tsProgress');
const tsBar = document.getElementById('tsBar');
const tsMarker = document.getElementById('tsMarker');
const tsSection = document.getElementById('tsSection');

const sections = [
  { label: 'hero', start: 0 },
  { label: 'door', start: 0.08 },
  ...(DOOR_MODE === 'doorway' ? [{ label: 'sala', start: 0.16 }] : []),
  { label: 'hook', start: 0.24 },
  { label: 'axes', start: 0.40 },
  { label: 'voices', start: 0.49 },
  { label: 'acts', start: 0.59 },
  { label: 'counters', start: 0.68 },
  { label: 'pipeline', start: 0.75 },
  { label: 'timeline', start: 0.83 },
  { label: 'quotes', start: 0.91 },
  { label: 'closing', start: 0.98 }
];

const progressBar = document.getElementById('progressBar');
const sectionIndicator = document.getElementById('sectionIndicator');
let indicatorTimeout;

function updateScrubber() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const vp = getViewportSize();
  const docHeight = document.documentElement.scrollHeight - vp.height;
  const p = docHeight > 0 ? scrollTop / docHeight : 0;
  storyProgress = p;

  // Debug scrubber
  tsProgress.textContent = Math.round(p * 100) + '%';
  tsBar.style.height = (p * 100) + '%';
  tsMarker.style.top = (p * 100) + '%';

  // Progress bar
  progressBar.style.width = (p * 100) + '%';
  progressBar.setAttribute('aria-valuenow', String(Math.round(p * 100)));

  // Section indicator
  let sec = 'hero';
  for (let i = sections.length - 1; i >= 0; i--) {
    if (p >= sections[i].start) { sec = sections[i].label; break; }
  }
  if (DEBUG_MODE) {
    tsSection.textContent = sec;
    sectionIndicator.textContent = sec;
    sectionIndicator.style.opacity = '0.6';
    clearTimeout(indicatorTimeout);
    indicatorTimeout = setTimeout(() => { sectionIndicator.style.opacity = '0'; }, 1500);
  }
}
window.addEventListener('scroll', updateScrubber, { passive: true });
updateScrubber();


/* ────────────────────────────────
   Lenis + GSAP ScrollTrigger
──────────────────────────────── */
/* El gráfico de evolución necesita que ScrollTrigger y las curvas estén
   registradas; se inicializa aquí, después de construir el canvas D3. */
initParticleStoryScroll();
initWordEvolution();
initActBrowser();

const lenis = new Lenis({
  duration: reduceMotion ? 0 : 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: !reduceMotion,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

/* CTA de cierre: volver al hero con scroll suave de Lenis
   (el href="#" nativo daba un salto brusco y sin animación) */
document.querySelector('.closing-cta')?.addEventListener('click', (e) => {
  e.preventDefault();
  lenis.scrollTo(0, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 3) });
});

/* ────────────────────────────────
   Hero — coin + title move together on scroll
──────────────────────────────── */
const heroGroup = gsap.timeline({
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: '55% top',
    scrub: true,
  },
});
heroGroup.to('.hero-title', { opacity: 0, y: -60, ease: 'cinematicSilk' }, 0);
heroGroup.to('.scroll-hint', { opacity: 0, ease: 'cinematicSilk' }, 0);
/* #haloWrap no se anima con y aquí: su tranform se fija cada frame desde
   animate() para seguir la proyección de la moneda. Un y de GSAP además
   competía con ese transform y podía descuadrar el halo respecto a la moneda. */
heroGroup.to('#haloWrap', { opacity: 0, ease: 'cinematicSilk' }, 0);

ScrollTrigger.create({
  trigger: '.hero',
  start: 'top top',
  end: 'bottom top',
  scrub: true,
  onUpdate: (self) => {
    scatterProgress = self.progress;
    /* Solo la zona estrictamente del hero resetea la puerta: desde ~25% de
       este trigger la gobierna el fade anticipado de la puerta (ver abajo).
       Antes el reset corría hasta p<0.98 y pisaba ese fade, dejando un
       "pasillo" de ~1/2 viewport SIN nada en pantalla entre actos. */
    if (!HERO_DOOR_LOCKUP && self.progress < 0.25) {
      doorTarget = 0;
      doorFade = 0;
      if (doorGroup) doorGroup.visible = false;
    }
  },
  onLeaveBack: () => {
    if (HERO_DOOR_LOCKUP) {
      doorTarget = 1;
      return;
    }
    doorTarget = 0;
    doorFade = 0;
    if (doorGroup) doorGroup.visible = false;
  }
});

/* ────────────────────────────────
   Stage 2 (Door) ScrollTrigger — control continuo, suave y sin parpadeos
   La puerta desaparece ANTES de llegar al siguiente título para evitar colisiones
──────────────────────────────── */
/* Fade ANTICIPADO de la puerta (solo doorway): empieza a materializarse
   mientras el hero termina de dispersarse — el "corredor" vacío entre actos
   desaparece y la lectura es continua: moneda → polvo → puerta que emerge
   de ese mismo polvo. Termina antes del pin de #stageObjective, donde el
   trigger clásico toma el mando con el mismo valor (1). */
if (DOOR_MODE === 'doorway') {
  ScrollTrigger.create({
    trigger: '#stageObjective',
    start: 'top 70%',
    end: 'top 15%',
    scrub: true,
    onUpdate: (self) => {
      /* Lockup: la puerta YA está en el hero. Si aquí bajamos doorTarget
         al volver, se desvanece en vez de deshacer 1→2 (leafT / lockupMix). */
      if (HERO_DOOR_LOCKUP) { doorTarget = 1; return; }
      doorTarget = THREE.MathUtils.clamp(self.progress, 0, 1);
    },
  });
}

ScrollTrigger.create({
  trigger: '#stageObjective',
  start: 'top top',
  end: 'bottom top',
  scrub: true,
  onUpdate: (self) => {
    const p = self.progress;
    if (DOOR_MODE === 'doorway') {
      /* La Sala (b1): la puerta se mantiene presente hasta el cruce;
         la disolución la gobierna #stageRoom (crossT) y la entrada el
         trigger anticipado — aquí solo se sostiene el 1 (re-fundir la
         entrada causaba un parpadeo al solaparse ambos triggers). */
      doorTarget = 1;
      return;
    }
    if (p <= 0) {
      doorTarget = 0;
    } else if (p < 0.15) {
      // Fade in rápido en los primeros 15%
      doorTarget = p / 0.15;
    } else if (p <= 0.35) {
      // Visible desde 15% hasta 35%
      doorTarget = 1;
    } else if (p < 0.55) {
      // Fade out entre 35% y 55% (desaparece ANTES de llegar al siguiente título)
      doorTarget = Math.max(0, 1 - (p - 0.35) / 0.20);
    } else {
      doorTarget = 0;
    }
  },
  onLeave: () => { if (DOOR_MODE !== 'doorway') doorTarget = 0; },
  onLeaveBack: () => { if (DOOR_MODE !== 'doorway') doorTarget = 0; }
});

/* ────────────────────────────────
   La Sala (b1) — cruce del umbral + beats de texto
   (solo en modo 'doorway'; en 'classic' no se crea nada)
──────────────────────────────── */
if (DOOR_MODE === 'doorway') {
  /* El cruce: dolly + disolución de la puerta + velo. Se completa en los
     primeros ~80vh del stage (el resto del stage es "dwell" interactivo). */
  ScrollTrigger.create({
    trigger: '#stageRoom',
    start: 'top 85%',
    end: '+=80%',
    scrub: true,
    onUpdate: (self) => { crossT = self.progress; },
  });

  /* SALIDA DE LA SALA: cuando el dwell está por terminar, la cámara deshace
     el cruce (exitT 0→1) y recupera la posición base — espejo del cruce de
     entrada (mismo easing, velo y kick de FOV). Se reserva solo el último
     25% del viewport (`bottom 125%` → `bottom bottom`), para que la sala no
     se apague demasiado pronto y "El Método" entre sin una cola vacía.
     Termina justo cuando el sticky se libera, con los overlays 3D de los
     ejes ya alineados con su proyección. */
  ScrollTrigger.create({
    trigger: '#stageRoom',
    start: 'bottom 125%',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => { exitT = self.progress; },
  });
  /* Capítulos posteriores a La Sala: la puerta no debe seguir en escena
     (El Método, ejes, etc.). Al volver atrás, doorTarget=1 y crossT
     gobierna de nuevo la disolución. */
  ScrollTrigger.create({
    trigger: '#stageHook',
    start: 'top 85%',
    end: 'top 20%',
    scrub: true,
    onUpdate: (self) => {
      if (!HERO_DOOR_LOCKUP) return;
      doorTarget = 1 - THREE.MathUtils.clamp(self.progress, 0, 1);
    },
    onLeave: () => { if (HERO_DOOR_LOCKUP) doorTarget = 0; },
    onEnterBack: () => { if (HERO_DOOR_LOCKUP) doorTarget = 1; },
  });

  /* Presencia en la sala: habilita el hover→cita y limpia el panel al salir */
  ScrollTrigger.create({
    trigger: '#stageRoom',
    start: 'top 100%',
    end: 'bottom 0%',
    onEnter: () => { inRoom = true; },
    onEnterBack: () => { inRoom = true; },
    onLeave: () => {
      inRoom = false;
      pinnedIndex = -1; hoverIndex = -1;
      syncQuotePanel();
    },
    onLeaveBack: () => {
      inRoom = false;
      pinnedIndex = -1; hoverIndex = -1;
      syncQuotePanel();
    },
  });

  /* Beats de texto: entran al revelarse la sala; título, titular y bajada se
     van antes del dwell final, pero el HINT persiste todo el dwell (es la
     única señal de que los puntos son explorables) y sale justo al final
     para no colisionar con la entrada de "El Método". */
  const roomTitle = document.getElementById('roomTitle');
  const roomLead = document.getElementById('roomLead');
  const roomSub = document.getElementById('roomSub');
  const roomHint = document.getElementById('roomHint');
  /* En pantallas táctiles no hay "cursor": el hint explica el tap directo. */
  if (roomHint && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
    roomHint.textContent = 'Toca una voz para leer lo que dijo · tócala de nuevo para fijarla';
  }
  if (roomTitle && roomLead && roomSub && roomHint) {
    gsap.timeline({
      scrollTrigger: {
        trigger: '#stageRoom',
        /* OJO CON ESTA VENTANA. Antes era `start: 'top 85%', end: '+=160%'`,
           que arranca 765 px ANTES de que el sticky se fije. El bloque de
           texto vive al final del contenedor (justify-content: flex-end), o
           sea que durante esos 765 px está por debajo del borde inferior de
           la ventana: las cuatro entradas se reproducían enteras fuera de
           pantalla y, cuando La Sala por fin se veía, los cuatro textos ya
           estaban puestos y lo único que quedaba por delante era el fundido
           de salida. La sección no tenía entrada, solo decadencia.
           Medido: en scroll = top del stage, la línea de tiempo ya iba por
           0,53 y las cuatro entradas terminan en 0,51.

           `top top` → `bottom bottom` mapea la línea de tiempo EXACTAMENTE
           sobre el tramo en que el sticky está fijo, que es justo cuando el
           texto se ve. No confundir con el trigger del cruce del umbral, que
           unas líneas más arriba sí usa `top 85%` a propósito: el dolly a
           través de la puerta tiene que haber terminado antes de fijarse. */
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
      .fromTo(roomTitle, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.06, ease: 'none' }, 0.22)
      .fromTo(roomLead,  { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.06, ease: 'none' }, 0.30)
      .fromTo(roomSub,   { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.05, ease: 'none' }, 0.38)
      .fromTo(roomHint,  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.05, ease: 'none' }, 0.46)
      .to(roomTitle, { opacity: 0, y: -14, duration: 0.05, ease: 'none' }, 0.68)
      .to(roomLead,  { opacity: 0, y: -14, duration: 0.05, ease: 'none' }, 0.74)
      .to(roomSub,   { opacity: 0, y: -12, duration: 0.05, ease: 'none' }, 0.80)
      .to(roomHint,  { opacity: 0, y: -10, duration: 0.04, ease: 'none' }, 0.94);
  }
}

/* ────────────────────────────────
   Stage 5 — Las voces
   La entrada conserva una zona de lectura: primero se presenta el marco
   editorial y después aparece el directorio. El rail queda interactivo
   durante el dwell completo del stage.
──────────────────────────────── */
const voicesIntro = document.querySelector('.voices-intro');
const voiceExplorer = document.getElementById('voiceExplorer');
if (voicesIntro && voiceExplorer) {
  gsap.timeline({
    scrollTrigger: {
      trigger: '#stageVoices',
      start: 'top 85%',
      end: 'bottom bottom',
      scrub: true,
    },
  })
    .fromTo(voicesIntro,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.12, ease: 'none' }, 0.04)
    .fromTo(voiceExplorer,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.14, ease: 'none' }, 0.16)
    .to(voicesIntro,
      { opacity: 0, y: -14, duration: 0.08, ease: 'none' }, 0.90);
}

/* Animación del texto de Stage 2 (La Reunión) */
const objTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: '#stageObjective',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
  }
});
objTimeline
  .fromTo('[data-objective]', 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 0.20, ease: 'cinematicOut', stagger: 0.04 }, 
    0.05
  )
  .to('[data-objective]', 
    { opacity: 0, y: -25, duration: 0.25, ease: 'cinematicIn' }, 
    0.60
  );

/* ────────────────────────────────
   Stage 3 — Hook
──────────────────────────────── */
const hookLines = document.querySelectorAll('#stageHook h2[data-hook]');
hookLines.forEach((el, i) => {
  const split = new SplitText(el, { type: 'chars,words', charsClass: 'char-reveal', wordsClass: 'word-reveal' });
  gsap.fromTo(split.chars,
    { opacity: 0, y: 20, rotationX: -40 },
    {
      opacity: 1, y: 0, rotationX: 0,
      duration: 0.6,
      stagger: 0.02,
      ease: 'cinematicOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 70%',
        end: 'top 40%',
        toggleActions: 'play none none reverse',
      }
    }
  );
});

/* ────────────────────────────────
   Stage 3 — Counters
──────────────────────────────── */
const counterEls = document.querySelectorAll('[data-counter]');
counterEls.forEach((el) => {
  const numEl = el.querySelector('.counter-number');
  const rawTarget = numEl.dataset.target;
  const isTodo = rawTarget.startsWith('[TODO');

  gsap.fromTo(el,
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      ease: 'cinematicOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          if (isTodo) return;
          const target = parseInt(rawTarget, 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: 'cinematicSilk',
            onUpdate: () => { numEl.textContent = Math.round(obj.val); },
          });
        },
      }
    }
  );
});

/* ────────────────────────────────
   Stage 4 — Pipeline: línea de transformación horizontal
─────────────────────────────── */
(function initPipeline() {
  const track = document.getElementById('pipeTrack');
  const viewport = track?.closest('.pipe-viewport');
  if (!track || !viewport) return;

  /* — Muestra de referencia (panel 02) — */
  const seedGrid = document.getElementById('seedGrid');
  const seedDots = [];
  const labelledRows = quotes.filter((q) => ['hawkish', 'dovish', 'neutral'].includes(q.label));
  labelledRows.forEach((q, index) => {
    const d = document.createElement('i');
    d.className = `seed-dot ${q.label}`;
    d.dataset.th = (0.04 + (index / Math.max(labelledRows.length, 1)) * 0.76).toFixed(3);
    d.title = `${q.label} · ${q.participant || 'Participante anónimo'} · ${q.date || q.year || 'fecha no especificada'}`;
    seedGrid.appendChild(d);
    seedDots.push(d);
  });
  const seedTotal = labelledRows.length;

  /* — Muestra analítica por año (panel 04) — */
  const corpusGrid = document.getElementById('corpusGrid');
  const corpusHead = document.getElementById('corpusHead');
  const corpusYear = document.getElementById('corpusYear');
  const corpusPct  = document.getElementById('corpusPct');
  const corpusCoverageNote = document.getElementById('corpusCoverageNote');
  const analysisYears = Array.from({ length: 16 }, (_, index) => 2000 + index);
  const sourceYear = (q) => {
    const match = String(q.date || '').match(/^(\d{4})/);
    return match ? Number(match[1]) : Number(q.year);
  };
  const analysisRows = quotes.filter((q) => analysisYears.includes(sourceYear(q)));
  const rowsByYear = new Map(analysisYears.map((year) => [year, []]));
  analysisRows.forEach((q) => rowsByYear.get(sourceYear(q)).push(q));
  const missingYears = analysisYears.filter((year) => rowsByYear.get(year).length === 0);
  const outsidePeriod = quotes.length - analysisRows.length;
  let corpusCols = [], litCols = -1;

  const formatYearRanges = (years) => {
    const ranges = [];
    years.forEach((year) => {
      const last = ranges[ranges.length - 1];
      if (last && year === last[1] + 1) last[1] = year;
      else ranges.push([year, year]);
    });
    return ranges.map(([from, to]) => from === to ? String(from) : `${from}–${to}`).join(', ');
  };

  function buildCorpus() {
    corpusGrid.innerHTML = '';
    corpusGrid.style.setProperty('--cols', analysisYears.length);
    corpusCols = [];
    analysisYears.forEach((year) => {
      const col = document.createElement('span');
      col.className = 'corpus-col';
      col.dataset.year = String(year);
      rowsByYear.get(year).forEach((q) => {
        const dot = document.createElement('i');
        const tone = ['hawkish', 'dovish', 'neutral'].includes(q.label) ? q.label : 'neutral';
        dot.className = `corpus-dot ${tone === 'hawkish' ? 'h' : tone === 'dovish' ? 'd' : 'n'}`;
        col.appendChild(dot);
      });
      if (!rowsByYear.get(year).length) {
        const empty = document.createElement('i');
        empty.className = 'corpus-empty';
        empty.setAttribute('aria-hidden', 'true');
        col.appendChild(empty);
      }
      corpusGrid.appendChild(col);
      corpusCols.push(col);
    });
    litCols = -1;
    if (corpusCoverageNote) {
      const parts = [];
      if (missingYears.length) parts.push(`sin muestra: ${formatYearRanges(missingYears)}`);
      if (outsidePeriod) parts.push(`${outsidePeriod} fuera de 2000–2015`);
      corpusCoverageNote.textContent = parts.length ? ` · ${parts.join(' · ')}` : '';
    }
  }
  buildCorpus();

  /* — Referencias — */
  const wordCount = document.getElementById('wordCount');
  const docLines  = document.querySelectorAll('#stagePipeline .doc-line > span');
  const fragEl    = document.querySelector('#stagePipeline .frag');
  const verdict   = document.getElementById('verdictStamp');
  const confBar   = document.getElementById('confBar');
  const confVal   = document.getElementById('confVal');
  const seedCount = document.getElementById('seedCount');
  const railNodes = document.querySelectorAll('#pipeRail .rail-node');
  const railSegs  = document.querySelectorAll('#pipeRail .rail-seg i');

  const clamp01  = gsap.utils.clamp(0, 1);
  // Segmentos de transición más suaves y con más holgura para apreciar cada panel
  // Cada panel tiene su propia "ventana de animación" más amplia
  const seg = (p, a, b) => {
    const span = b - a;
    if (span <= 1e-6) return p >= b ? 1 : 0;
    return clamp01((p - a) / span);
  };
  const easeOut3 = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const fmt      = (n) => Math.round(n).toLocaleString('es-CL');
  const sampleWordCount = quotes.reduce((total, q) => total + String(q.text || '').trim().split(/\s+/).filter(Boolean).length, 0);
  const pipelineExample = quotes.find((q) => q.label === 'hawkish') || quotes[0];
  const pipelineTone = ['hawkish', 'dovish', 'neutral'].includes(pipelineExample?.label) ? pipelineExample.label : 'neutral';
  const pipelineScore = Number.isFinite(Number(pipelineExample?.score)) ? Number(pipelineExample.score) : 0;
  const pipelineToneText = { hawkish: 'Hawkish', dovish: 'Dovish', neutral: 'Neutral' };
  const pipelineExcerpt = String(pipelineExample?.text || 'Sin texto disponible').replace(/\s+/g, ' ').trim();
  if (fragEl) fragEl.textContent = `«${pipelineExcerpt.length > 150 ? `${pipelineExcerpt.slice(0, 150)}…` : pipelineExcerpt}»`;
  if (verdict) verdict.textContent = pipelineToneText[pipelineTone];

  const panels = track.querySelectorAll('.pipe-panel');
  const getPanelBounds = () => {
    const totalW = track.scrollWidth - viewport.clientWidth;
    const cw = viewport.clientWidth;
    /* La animación de cada panel se ancla a su CENTRO, no a sus bordes.
       Empieza cuando el centro entra por la derecha (línea al 78% del
       ancho) y TERMINA cuando el centro llega al centro real del viewport
       (50%). Antes el final se calculaba con el borde derecho cruzando una
       línea al 28%, así que cada panel seguía animándose después de haber
       pasado el centro y terminaba desplazado a la izquierda. */
    const focusStart = cw * 0.78;
    const focusEnd = cw * 0.5;
    return Array.from(panels).map(panel => {
      const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
      const start = (panelCenter - focusStart) / totalW;
      const end = (panelCenter - focusEnd) / totalW;
      return { start: clamp01(start), end: clamp01(end) };
    });
  };

  /* Bounds cacheados: getPanelBounds() lee offsetLeft/scrollWidth (forced
     reflow). Se recalcula solo en refresh del ScrollTrigger, no por tick. */
  let bounds = getPanelBounds();
  const debugEl = document.getElementById('debugPanel');
  const debugSection = document.getElementById('debugSection');
  const debugProgress = document.getElementById('debugProgress');
  const debugPanelInfo = document.getElementById('debugPanelInfo');
  const debugBar = document.getElementById('debugBar');

  function updatePipe(p) {

    /* Panel 01 — acta revelada línea a línea + contador de palabras */
    // Tiempos más graduales para apreciar mejor la información
    const l1 = seg(p, bounds[0].start, bounds[0].end);
    docLines.forEach((line, i) => {
      // Más tiempo para cada línea: de 0.06 a 0.08 de separación
      const t = easeOut3(seg(l1, 0.04 + i * 0.08, 0.30 + i * 0.08));
      line.style.transform = `translateY(${(1 - t) * 110}%)`;
    });
    // Contador más pausado
    wordCount.textContent = fmt(sampleWordCount * easeOut3(seg(l1, 0.20, 0.90)));

    /* Panel 02 — muestra de referencia encendida + contador */
    const l2 = seg(p, bounds[1].start, bounds[1].end);
    seedDots.forEach((d) => d.classList.toggle('lit', l2 > +d.dataset.th));
    seedCount.textContent = fmt(seedTotal * easeOut3(seg(l2, 0.12, 0.92)));

    /* Panel 03 — fragmento + sello del veredicto + confianza */
    // La etiqueta y el score provienen de un registro visible de quotes.js.
    const l3 = seg(p, bounds[2].start, bounds[2].end);
    fragEl.style.opacity = easeOut3(seg(l3, 0.08, 0.40));
    const stamp = easeOut3(seg(l3, 0.50, 0.75));
    verdict.style.opacity = stamp;
    verdict.style.transform = `scale(${1.9 - 0.9 * stamp}) rotate(${-9 + 6 * stamp}deg)`;
    const conf = easeOut3(seg(l3, 0.55, 0.95));
    confBar.style.width = (conf * pipelineScore * 100) + '%';
    confVal.textContent = (conf * pipelineScore).toFixed(2);

    /* Panel 04 — recorrido de la muestra analítica por año */
    const l4 = seg(p, bounds[3].start, bounds[3].end);
    const sweep = seg(l4, 0.10, 0.95);
    const front = Math.floor(sweep * (analysisYears.length + 1));
    if (front !== litCols) {
      corpusCols.forEach((col, c) => col.classList.toggle('lit', c < front));
      litCols = front;
    }
    corpusHead.style.left = (sweep * 100) + '%';
    corpusHead.style.opacity = (l4 > 0.02 && sweep < 0.999) ? 1 : 0;
    const yearIndex = Math.min(analysisYears.length - 1, Math.round(sweep * (analysisYears.length - 1)));
    corpusYear.textContent = analysisYears[yearIndex];
    const processedRows = analysisYears.slice(0, front).reduce((total, year) => total + rowsByYear.get(year).length, 0);
    corpusPct.textContent = Math.min(100, Math.round((processedRows / Math.max(analysisRows.length, 1)) * 100)) + '%';

    /* Rail de progreso */
    let activeIdx = 0;
    for (let i = bounds.length - 1; i >= 0; i--) {
      if (p >= bounds[i].start) { activeIdx = i; break; }
    }
    railNodes.forEach((n, i) => n.classList.toggle('active', i <= activeIdx));
    railSegs.forEach((s, i) => {
      if (i < activeIdx) s.style.transform = 'scaleX(1)';
      else if (i === activeIdx) s.style.transform = `scaleX(${seg(p, bounds[i].start, bounds[i].end)})`;
      else s.style.transform = 'scaleX(0)';
    });

    /* Debug panel — solo con ?debug (antes aparecía aquí y jamás se ocultaba) */
    if (DEBUG_MODE && debugEl) {
      debugEl.classList.add('visible');
      debugSection.textContent = 'Pipeline';
      debugProgress.textContent = Math.round(p * 100) + '%';
      const panelNames = ['01 · Fuente', '02 · Muestra / criterio', '03 · Clasificación guiada', '04 · Revisión / trazabilidad'];
      debugPanelInfo.textContent = panelNames[activeIdx] || '—';
      debugBar.style.width = (p * 100) + '%';
    }
  }

  /* GSAP Official Pattern: Pin parent, animate child */
  const scrollTween = gsap.to(track, {
    x: () => -(track.scrollWidth - viewport.clientWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: '.pipeline-pin-wrapper',
      start: 'top top',
      end: () => '+=' + (track.scrollWidth - viewport.clientWidth),
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onRefresh: () => { bounds = getPanelBounds(); },
      onUpdate: (self) => updatePipe(self.progress),
    },
  });

  updatePipe(0);

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
})();

/* ────────────────────────────────
   Stage 5 — Timeline (D3, lazy)
──────────────────────────────── */
const timelineTitle = document.querySelector('[data-timeline-title]');
gsap.fromTo(timelineTitle,
  { opacity: 0, y: 20 },
  {
    opacity: 1, y: 0,
    duration: 0.8,
    ease: 'cinematicOut',
    scrollTrigger: { trigger: timelineTitle, start: 'top 80%', toggleActions: 'play none none reverse' }
  }
);

let timelineBuilt = false;
let timelinePath, timelineTotalLen;

function buildTimeline() {
  const container = document.getElementById('timelineContainer');
  if (!container) return;

  if (timelineBuilt) {
    d3.select(container).selectAll('*').remove();
  }
  timelineBuilt = true;
  const vp = getViewportSize();
  const shortViewport = vp.height < 620;
  const width = Math.min(1060, vp.width - 40);
  /* El SVG también forma parte del layout: 320px + el título no cabe en
     un móvil en paisaje de 390px de alto y el encabezado quedaba cortado.
     Se dibuja una versión más compacta solo en viewports bajos. */
  const height = shortViewport
    ? Math.max(230, Math.min(300, vp.height - 132))
    : 320;
  const margin = shortViewport
    ? { top: 24, right: 18, bottom: 44, left: 42 }
    : { top: 40, right: 30, bottom: 60, left: 50 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('role', 'img')
    .attr('aria-label', 'Índice exploratorio de orientación por año, agregado desde los fragmentos visibles')
    .attr('aria-describedby', 'timelineNote')
    .style('max-width', '100%')
    .style('height', 'auto');

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  /* El índice se agrega desde los registros visibles de quotes.js.
     Convención explícita: (hawkish − dovish) / total de fragmentos del año;
     neutral no desplaza el índice, pero sí permanece en el denominador. */
  const years = d3.range(2000, 2016);
  const byYear = new Map(years.map((year) => [year, { year, hawkish: 0, dovish: 0, neutral: 0, total: 0 }]));
  const sourceYear = (q) => {
    const match = String(q.date || '').match(/^(\d{4})/);
    return match ? Number(match[1]) : Number(q.year);
  };
  quotes.forEach((q) => {
    const year = sourceYear(q);
    const bucket = byYear.get(year);
    if (!bucket) return;
    const tone = ['hawkish', 'dovish', 'neutral'].includes(q.label) ? q.label : 'neutral';
    bucket[tone] += 1;
    bucket.total += 1;
  });
  const timelineData = years
    .filter((year) => byYear.get(year).total > 0)
    .map((year) => {
      const bucket = byYear.get(year);
      return {
        ...bucket,
        date: new Date(year, 6, 1),
        value: (bucket.hawkish - bucket.dovish) / bucket.total,
        hasSample: true,
      };
    });
  const missingYears = years.filter((year) => byYear.get(year).total === 0);
  const formatYearRanges = (items) => {
    const ranges = [];
    items.forEach((year) => {
      const last = ranges[ranges.length - 1];
      if (last && year === last[1] + 1) last[1] = year;
      else ranges.push([year, year]);
    });
    return ranges.map(([from, to]) => from === to ? String(from) : `${from}–${to}`).join(', ');
  };
  const domainStart = new Date(2000, 0, 1);
  const domainEnd = new Date(2015, 11, 31);
  const x = d3.scaleTime().domain([domainStart, domainEnd]).range([0, innerW]);
  const y = d3.scaleLinear().domain([-1, 1]).range([innerH, 0]);

  g.append('g')
    .attr('transform', `translate(0,${innerH})`)
            .call(d3.axisBottom(x)
      .ticks(d3.timeYear.every(shortViewport && width < 520 ? 4 : 2))
      .tickFormat(d3.timeFormat('%Y')))
    .selectAll('text').style('fill', '#e8ecf5').style('font-size', 'clamp(14px, 1.25vw, 16px)');
  g.selectAll('.domain, .tick line').style('stroke', 'rgba(255,255,255,0.12)');

  g.append('g')
    .call(d3.axisLeft(y).ticks(5).tickFormat(d => d > 0 ? `+${d}` : d))
    .selectAll('text').style('fill', '#e8ecf5').style('font-size', 'clamp(14px, 1.25vw, 16px)');
  g.selectAll('.domain').style('stroke', 'none');
  g.selectAll('.tick line').style('stroke', 'rgba(255,255,255,0.06)');

  g.append('line')
    .attr('x1', 0).attr('x2', innerW)
    .attr('y1', y(0)).attr('y2', y(0))
    .style('stroke', 'rgba(255,255,255,0.15)')
    .style('stroke-dasharray', '4,4');

  const gradient = svg.append('defs').append('linearGradient')
    .attr('id', 'lineGrad').attr('x1', '0%').attr('x2', '100%');
  gradient.append('stop').attr('offset', '0%').attr('stop-color', '#8ab4f8');
  gradient.append('stop').attr('offset', '50%').attr('stop-color', '#ffd76a');
  gradient.append('stop').attr('offset', '100%').attr('stop-color', '#8ab4f8');

  const fullTimeline = years.map((year) => byYear.get(year).total > 0
    ? timelineData.find((item) => item.year === year)
    : { year, date: new Date(year, 6, 1), value: null, hasSample: false });
  const line = d3.line()
    .defined((d) => d.hasSample)
    .x(d => x(d.date))
    .y(d => y(d.value))
    .curve(d3.curveLinear);

  timelinePath = g.append('path')
    .datum(fullTimeline)
    .attr('fill', 'none')
    .attr('stroke', 'url(#lineGrad)')
    .attr('stroke-width', 2.5)
    .attr('d', line);

  timelineTotalLen = timelinePath.node().getTotalLength();
  timelinePath
    .attr('stroke-dasharray', timelineTotalLen)
    .attr('stroke-dashoffset', timelineTotalLen);

  const toneColor = (d) => d.value > 0 ? '#ffd76a' : d.value < 0 ? '#8ab4f8' : '#cfd6e4';
  const points = g.append('g').attr('class', 'timeline-points')
    .selectAll('circle')
    .data(timelineData)
    .enter()
    .append('circle')
    .attr('class', 'timeline-point')
    .attr('cx', d => x(d.date))
    .attr('cy', d => y(d.value))
    .attr('r', 4)
    .style('fill', toneColor)
    .style('stroke', '#0a0e1a')
    .style('stroke-width', 2)
    .style('opacity', 0.95);
  points.append('title').text((d) => `${d.year}: índice ${d.value >= 0 ? '+' : ''}${d.value.toFixed(2)} · ${d.total} fragmentos (H ${d.hawkish} / D ${d.dovish} / N ${d.neutral})`);

  g.append('text')
    .attr('class', 'timeline-direction timeline-direction--high')
    .attr('x', 0).attr('y', 11)
    .text('hawkish +');
  g.append('text')
    .attr('class', 'timeline-direction timeline-direction--low')
    .attr('x', 0).attr('y', innerH - 8)
    .text('dovish −');

  if (missingYears.length) {
    const absence = g.append('g').attr('class', 'timeline-absence');
    absence.selectAll('line')
      .data(missingYears)
      .enter()
      .append('line')
      .attr('x1', year => x(new Date(year, 6, 1)))
      .attr('x2', year => x(new Date(year, 6, 1)))
      .attr('y1', innerH - 3).attr('y2', innerH + 8);
    absence.append('text')
      .attr('x', d3.mean(missingYears, year => x(new Date(year, 6, 1))))
      .attr('y', innerH + 36)
      .attr('text-anchor', 'middle')
      .text(`sin muestra: ${formatYearRanges(missingYears)}`);
  }

  /* Eventos macro importantes */
  const events = [
    { date: new Date(2008, 8), label: 'Crisis financiera externa' },
  ];
  const evG = g.selectAll('.ev').data(events).enter().append('g').attr('class', 'ev');
  evG.append('line')
    .attr('x1', d => x(d.date)).attr('x2', d => x(d.date))
    .attr('y1', 0).attr('y2', innerH)
    .style('stroke', 'rgba(255,215,106,0.25)')
    .style('stroke-dasharray', '3,3');
  evG.append('text')
    .attr('x', d => x(d.date))
    .attr('y', -8)
    .attr('text-anchor', 'middle')
    .style('font-size', 'clamp(14px, 1.25vw, 16px)')
    .style('fill', '#ffd76a')
    .style('opacity', 0.7)
    .text(d => d.label);

  gsap.to(container, { opacity: 1, duration: 0.3 });
}

ScrollTrigger.create({
  trigger: '#stageTimeline',
  start: 'top 80%',
  onEnter: buildTimeline,
  onEnterBack: buildTimeline,
});

let timelineResizeT;
window.addEventListener('resize', () => {
  clearTimeout(timelineResizeT);
  timelineResizeT = setTimeout(() => {
    if (timelineBuilt) buildTimeline();
  }, 200);
});

ScrollTrigger.create({
  trigger: '#stageTimeline',
  start: 'top top',
  end: '+=120%',
  pin: '.timeline-pin-wrapper',
  scrub: 1,
  onUpdate: (self) => {
    if (timelinePath) {
      timelinePath.attr('stroke-dashoffset', timelineTotalLen * (1 - self.progress));
    }
  },
});

/* ────────────────────────────────
   Acto 4: Sincronización de visibilidad para #d3-canvas
   (un solo timeline: fade-in → hold → fade-out. Antes eran dos tweens
   scrubbed en serie y el segundo partía desde opacity 0 → animaba 0→0,
   así que los ejes desaparecían de golpe sin fade.)
──────────────────────────────── */
gsap.timeline({
  scrollTrigger: { trigger: '#stageAxes', start: 'top 60%', end: 'bottom top', scrub: true }
})
  .fromTo('#d3-canvas', { opacity: 0 }, { opacity: 1, duration: 0.15, ease: 'none' }, 0)
  .to('#d3-canvas', { opacity: 0, duration: 0.15, ease: 'none', immediateRender: false }, 0.85);

/* El plano factual SVG conserva la legibilidad; la nube reutiliza sus
   posiciones proyectadas para que el pasaje sea visible sin duplicar
   geometría ni crear una capa borrosa paralela. */
ScrollTrigger.create({
  trigger: '#stageAxes',
  start: 'top 60%',
  end: 'bottom top',
  scrub: true,
  onUpdate: (self) => {
    const p = self.progress;
    const fadeIn = gsap.utils.clamp(0, 1, p / 0.15);
    const fadeOut = gsap.utils.clamp(0, 1, (1 - p) / 0.15);
    axesFocusT = Math.min(fadeIn, fadeOut);
    setParticleStoryTarget('axes', axesFocusT);
  },
  onLeave: () => { axesFocusT = 0; setParticleStoryTarget('axes', 0); },
  onLeaveBack: () => { axesFocusT = 0; setParticleStoryTarget('axes', 0); },
});

/* ────────────────────────────────
   Stage 6 — Quotes
──────────────────────────────── */
const quoteEls = document.querySelectorAll('[data-quote]');
quoteEls.forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: 'cinematicOut',
      scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' }
    }
  );

  /* Click/teclado → abre el panel con la cita correspondiente del dataset.
     Antes los handlers de click no existían: el panel solo era alcanzable
     clickeando partículas del canvas (que además tapaba las tarjetas). */
  el.addEventListener('click', () => {
    const name = el.dataset.quoteParticipant;
    const year = parseInt(el.dataset.quoteYear, 10);
    let idx = quotes.findIndex(q => q.participant === name && q.year === year);
    if (idx < 0) idx = quotes.findIndex(q => q.participant === name);
    if (idx >= 0) {
      lastFocusedCard = el;
      pinnedIndex = idx;
      hoverIndex = -1;
      const r = el.getBoundingClientRect();
      openQuote(idx, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
  });

  // Keyboard accessibility
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      el.click();
    }
  });
});

/* ────────────────────────────────
   Stage 7 — Closing
──────────────────────────────── */
document.querySelectorAll('[data-closing]').forEach((el) => {
  const split = new SplitText(el, { type: 'chars,words', charsClass: 'char-reveal', wordsClass: 'word-reveal' });
  gsap.fromTo(split.chars,
    { opacity: 0, y: 15, rotationX: -30 },
    {
      opacity: 1, y: 0, rotationX: 0,
      duration: 0.5,
      stagger: 0.015,
      ease: 'cinematicOut',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
    }
  );
});

/* ══════════════════════════════════════════════════════════════════════════
   TÉCNICAS PREMIUM — Background Color Transitions + Parallax + Velocity
══════════════════════════════════════════════════════════════════════════ */

/* 1. BACKGROUND COLOR TRANSITIONS — El fondo cambia suavemente entre secciones */
const bgSections = [
  { trigger: '#stageObjective', color: '#0c1020' },
  { trigger: '#stageRoom', color: '#0b0f1c' },
  { trigger: '#stageHook', color: '#0a0e1a' },
  { trigger: '#stageAxes', color: '#0d1225' },
  { trigger: '#stageVoices', color: '#0b101c' },
  { trigger: '#stageCounters', color: '#0a0e1a' },
  { trigger: '#stagePipeline', color: '#0c1020' },
  { trigger: '#stageTimeline', color: '#0a0e1a' },
  { trigger: '#stageQuotes', color: '#0d1225' },
  { trigger: '#stageClosing', color: '#0a0e1a' },
];

bgSections.forEach(({ trigger, color }) => {
  ScrollTrigger.create({
    trigger,
    start: 'top center',
    end: 'bottom center',
    onToggle: (self) => {
      if (self.isActive) {
        gsap.to('html', { backgroundColor: color, duration: 1.2, ease: 'power2.inOut' });
        gsap.to('body', { backgroundColor: color, duration: 1.2, ease: 'power2.inOut' });
      }
    }
  });
});

/* 1b. LUZ AMBIENTAL — jerarquía narrativa
   El halo fuerte pertenece al hero y al umbral. Una luz fija durante todo
   el documento hacía que los gráficos, las actas y las citas parecieran
   vivir en el mismo plano. Se conserva un resplandor muy tenue en los
   momentos editoriales y se limpia el fondo cuando el dato debe ser el
   protagonista. */
const ambientLayer = document.documentElement;
const ambientStates = [
  { trigger: '#hero',          alpha: 0.16 },
  { trigger: '#stageObjective', alpha: 0.10 },
  { trigger: '#stageRoom',     alpha: 0.07 },
  { trigger: '#stageHook',     alpha: 0.025 },
  { trigger: '#stageAxes',     alpha: 0.015 },
  { trigger: '#stageVoices',   alpha: 0.035 },
  { trigger: '#stageCounters', alpha: 0.025 },
  { trigger: '#stagePipeline', alpha: 0.018 },
  { trigger: '#stageTimeline', alpha: 0.035 },
  { trigger: '#stageQuotes',   alpha: 0.018 },
  { trigger: '#stageClosing',  alpha: 0.08 },
];

function setAmbientAlpha(alpha, immediate = false) {
  if (immediate) {
    ambientLayer.style.setProperty('--ambient-alpha', String(alpha));
    return;
  }
  gsap.to(ambientLayer, {
    '--ambient-alpha': alpha,
    duration: 1.25,
    ease: 'power2.inOut',
    overwrite: 'auto',
  });
}

/* Estado inicial: el primer frame debe conservar la luz del hero incluso
   antes de que ScrollTrigger termine de medir todos los pin-spacers. */
setAmbientAlpha(0.16, true);
ambientStates.forEach(({ trigger, alpha }) => {
  ScrollTrigger.create({
    trigger,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => setAmbientAlpha(alpha),
    onEnterBack: () => setAmbientAlpha(alpha),
  });
});

/* 2. PARALLAX DEPTH — ELIMINADO: duplicaba las propiedades y/opacity que
   heroGroup ya anima sobre #haloWrap (dos tweens scrubbed peleándose por
   los mismos valores = doble entrada visible). El heroGroup original es
   el único driver ahora. */

/* 3. STAGGERED SECTION REVEAL — ELIMINADO: montaba un segundo fade sobre
   secciones cuyos hijos ya tienen reveals propios (doble entrada = "los
   elementos tardan en aparecer"). Peor aún: el y:40 en .stage-pipeline
   ponía un transform en el ancestro del elemento pineado, lo que rompe
   position:fixed del pin (pin inestable). Cada elemento ya revela solo. */

/* 5. SMOOTH COUNTER SCALE — ELIMINADO: era un segundo fromTo sobre los
   mismos [data-counter] que ya tienen fade+rise + contador numérico.
   Dos entradas sobre un mismo elemento = parpadeo/tiempo doble. */

/* 6. QUOTE CARD HOVER GLOW — Efecto de brillo al hover */
document.querySelectorAll('.quote-card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { 
      scale: 1.02, 
      duration: 0.3, 
      ease: 'power2.out',
      boxShadow: card.classList.contains('hawkish') 
        ? '0 0 60px rgba(255,215,106,0.15)' 
        : '0 0 60px rgba(138,180,248,0.15)'
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { 
      scale: 1, 
      duration: 0.3, 
      ease: 'power2.out',
      boxShadow: card.classList.contains('hawkish')
        ? '0 0 40px rgba(255,215,106,0.05)'
        : '0 0 40px rgba(138,180,248,0.05)'
    });
  });
});

/* 7. TIMELINE PATH DRAWING — ELIMINADO: código muerto. timelinePath es
   undefined al evaluarse (el timeline se construye lazy) y el dibujo real
   ya lo hace el onUpdate del pin de #stageTimeline. */

/* ────────────────────────────────
   Refresh de ScrollTrigger tras carga completa
   (fuentes web + GLBs + pin-spacers pueden cambiar la altura
   real del documento después de que los triggers ya se
   calcularon en píxeles — sin este refresh, start/end quedan
   desincronizados del layout final, causando activaciones
   prematuras o tardías como la superposición en el hero).
──────────────────────────────── */
const refreshST = () => ScrollTrigger.refresh();
const refreshLayout = () => {
  syncViewportAndObjects();
  rebuildCameraChoreography();
  refreshST();
};
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => refreshLayout());
}
window.addEventListener('load', () => refreshLayout());
manager.onLoad = (() => {
  const original = manager.onLoad;
  return () => {
    original();
    refreshLayout();
  };
})();
