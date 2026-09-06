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
import { initFigureSystem } from './figures.js?v=4';
import { buildCentralBankDoor } from './build-door.js?v=14';
import { CONFIG, HERO_DOOR_LOCKUP, HERO } from './config.js?v=15';
import { getViewportSize, getViewportSnapshot, isCompactWidth } from './viewport.js?v=2';
import {
  selection, activeQuoteIndex, isPinned, peekQuote, clearPeek, pinQuote, clearSelection,
  voiceFocus, axesState, focusReturn, particleFocus,
} from './interaction-state.js';
import { initWordEvolution } from './sections/word-evolution.js';
import { initVoiceExplorer } from './sections/voice-explorer.js?v=2';
import { initActBrowser } from './sections/act-browser.js';
import { initD3Axes } from './sections/axes-map.js?v=3';
import { initTimeline } from './sections/timeline.js?v=3';
import { particleRandom, getQuoteAxisSentiment } from './utils.js';

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
   Entrar siempre por la portada
────────────────────────────────
   Sin esto el navegador restaura el scroll de la visita anterior y la página
   "nace" a mitad de documento. Eso deja dos cosas mal a la vez: el lector
   aterriza sin contexto y la escena arranca con scatterProgress=1, o sea con
   la moneda invisible y Lenis desincronizado del scroll real; al subir rápido
   al inicio ese estado puede tardar en reconverger. Forzamos el inicio arriba
   antes de que se creen observadores, ScrollTriggers y Lenis, para que todo se
   inicialice contra un scroll 0 coherente. */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
/* La restauración del reload ocurre ANTES de que este módulo corra, así que el
   scrollTo de arriba puede llegar tarde: en `load` el usuario aún no ha podido
   interactuar, de modo que cualquier scroll distinto de 0 es una restauración
   y lo devolvemos a la portada (observadores, ScrollTrigger y Lenis convergen
   con el evento de scroll resultante). */
window.addEventListener('load', () => { if (window.scrollY !== 0) window.scrollTo(0, 0); });
/* bfcache (atrás/adelante) también restaura el scroll: lo mismo. */
window.addEventListener('pageshow', (e) => { if (e.persisted) window.scrollTo(0, 0); });

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
   (WebGL no se sondea aparte: la sonda pedía un contexto en un canvas
   desechable y costaba 1,6 s de arranque en el perfil de CPU —crear un
   contexto es lo caro, no el renderer—. El `new WebGLRenderer` de abajo ya
   va en try/catch y deja `renderer = null` si no hay WebGL.)
──────────────────────────────── */
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

/* CEDER EL HILO
   `setTimeout(0)` y no `requestAnimationFrame`: rAF se sirve al principio del
   frame y encadenarlos mantiene el hilo ocupado; un timer deja que el
   navegador pinte, atienda el scroll y procese los clics entre medio.

   Se define aquí arriba (antes vivía junto al precalentado) porque el propio
   cuerpo del módulo lo necesita para trocearse: ver el bloque de ARRANQUE
   POR TRAMOS más abajo. */
const breathe = () => new Promise((resolve) => setTimeout(resolve, 0));

const scene = new THREE.Scene();
const camBaseY = 0.7;
scene.fog = new THREE.FogExp2(CONFIG.door?.fog ?? 0x0a0e1a, 0);
const initialVp = getViewportSize();
const camera = new THREE.PerspectiveCamera(CONFIG.camera.fov, initialVp.width / initialVp.height, 0.1, 100);
camera.position.set(CONFIG.camera.x, CONFIG.camera.y, CONFIG.camera.z);
camera.lookAt(0, HERO_DOOR_LOCKUP ? 0.95 : 0.7, HERO_DOOR_LOCKUP ? -0.25 : 0);

let renderer = null;
{
  try {
    /* Los ornamentos de la puerta viven en pocos píxeles; con antialias=false
       los filetes y aristas se rompen justo donde necesitamos legibilidad. */
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(initialVp.width, initialVp.height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = CONFIG.exposure;
    renderer.shadowMap.enabled = false;
    /* Three.js pregunta al driver por el log de CADA shader la primera vez que
       usa un programa, para avisar de errores de compilación. En producción eso
       es trabajo tirado: medido con `npm run perf`, getShaderInfoLog +
       getProgramInfoLog eran 13,5 s de los 19,5 s que el hilo principal estuvo
       ocupado en 92 s de scroll (69 %), y la peor tarea larga —11 s de página
       congelada al empezar a bajar— era exactamente eso. Con `?debug` se
       conserva el aviso, que es cuando hace falta. */
    renderer.debug.checkShaderErrors = DEBUG_MODE;
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

/* ═══ ARRANQUE POR TRAMOS ═══
   Este módulo se evaluaba de una sola vez: 6,5 s de CPU seguidos en un equipo
   de gama media (medido con `npm run boot --cpu=4`). Durante ese bloque la
   pestaña no responde a NADA — ni scroll, ni clics — y el navegador puede
   llegar a marcarla como colgada. Era el "se pega al abrirlo".

   No es tiempo que se pueda eliminar: hay que crear el entorno de iluminación,
   construir la fachada y armar las secciones igual. Lo que sí se puede es
   dejar de hacerlo TODO junto. Al ser un módulo ES, aquí se puede usar `await`
   en el nivel superior, y cada `await breathe()` parte la tarea en dos: el
   navegador pinta, atiende el scroll y sigue.

   El trabajo total es el mismo; lo que cambia es que deja de ser un
   congelamiento y pasa a ser una carga progresiva detrás de la cortina.

   OJO: los cortes van entre tramos independientes, nunca en medio de una
   secuencia con dependencias. El orden de ejecución no cambia. */
/* `requestIdleCallback` no existe en Safari < 16.4; el respaldo con
   setTimeout(0) mantiene el mismo efecto —ceder el hilo— sin depender de él. */
const requestIdleCallbackSafe = (fn) => (typeof requestIdleCallback === 'function'
  ? requestIdleCallback(fn, { timeout: 2000 })
  : setTimeout(fn, 0));

await breathe();

if (renderer) {
  /* EL MAPA DE ENTORNO, MÁS TARDE Y MÁS BARATO
     `pmrem.fromScene()` era el bloque único más caro del arranque: 1 884 ms
     medidos con CPU x4, el hilo principal entero, con la cortina puesta y la
     moneda congelada. Genera el mapa de reflejos que da el brillo metálico a
     la moneda y a la puerta de bronce.

     Dos cambios. Primero el tamaño: `fromScene` sin argumento usa 256 px de
     lado por cara del cubo, y en esta escena —fondo casi negro, materiales
     rugosos, ningún espejo— eso es resolución que nadie ve. 64 px da el mismo
     reflejo difuso a la dieciseisava parte del coste.

     Segundo, cuándo. El entorno solo afecta a cómo se ven los metales, no a la
     geometría ni al texto, así que no tiene por qué bloquear la primera pinta:
     se genera tras ceder el hilo. Hasta que llega, la escena se dibuja sin
     reflejos —un poco más mate— y al asignarse three.js recompila los
     materiales afectados por su cuenta. */
  requestIdleCallbackSafe(() => {
    if (!renderer) return;
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04, 0.1, 100, { size: 64 }).texture;
    pmrem.dispose();
  });
}

/* ────────────────────────────────
   Precalentado de la escena
────────────────────────────────
   La primera vez que un material se dibuja pasan dos cosas caras y
   SÍNCRONAS: three.js compila y enlaza su programa, y el navegador sube sus
   texturas a la GPU. Si eso ocurre mientras el lector baja, se ve como un
   tirón — y ocurría: medido con `npm run perf`, el scroll entero se gastaba
   13,5 s en getProgramParameter y hasta 10 s en texSubImage2D, con una tarea
   larga de 11 s justo al empezar a bajar (la página congelada).

   Aquí se paga todo de una vez, con la cortina de carga todavía encima.

   Se compila en los DOS estados de luces del relato —la puerta encendida y
   apagada— porque el número de luces visibles forma parte de la clave con la
   que three.js cachea los programas: si solo se precalienta uno de los dos,
   el otro se compila en mitad del cruce a La Sala, que es justo lo que se
   quiere evitar. Las texturas se suben una sola vez cada una (uuid). */
const TEXTURE_SLOTS = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap',
  'emissiveMap', 'bumpMap', 'alphaMap', 'displacementMap', 'lightMap', 'envMap'];
const warmedTextures = new Set();

let warmUpRuns = 0;
let warmUpChain = null;
let warmUpQueued = false;

/* Ceder el hilo principal entre fases. Antes el precalentado era UNA sola
   tarea: la sonda del arranque midió 2 631 ms de bloqueo continuo con la
   moneda "acuñando" encima, y 15 frames en 6 s no es una animación, es una
   foto. Cada `breathe` deja pintar.

   `setTimeout(0)` y no `requestAnimationFrame`: rAF se sirve al principio del
   siguiente frame, así que encadenar fases con rAF las deja todas dentro del
   mismo presupuesto y no garantiza un paint entre medias. */

function warmUpScene() {
  if (!renderer) return Promise.resolve();
  /* Las figuras y la moneda/puerta avisan por separado y pueden caer a la vez.
     Siendo síncrono el precalentado no se solapaba; ahora sí podría.

     OJO con "optimizar" esto fusionando pases: se probó compartir una sola
     promesa si ya había un pase en vuelo y `npm run perf` lo cazó — los tres
     pases de 659/405/217 ms se volvieron uno de 3 253 ms y aparecieron 5
     createProgram DENTRO del scroll, porque `renderer.compile` recorre con
     traverseVisible y un pase único temprano no ve los materiales que aún no
     son visibles. Cada aviso merece su pase entero; lo único que se evita es
     que dos corran a la vez, y el que llega durante un pase se encola.

     La promesa devuelta se resuelve cuando la cola queda vacía, no al terminar
     el primer pase: quien la espera (la cortina) no debe destaparse con un
     precalentado todavía en marcha. */
  if (warmUpChain) { warmUpQueued = true; return warmUpChain; }
  warmUpChain = drainWarmUps();
  return warmUpChain;
}

async function drainWarmUps() {
  do {
    warmUpQueued = false;
    try { await runWarmUp(); } catch (e) { console.warn('Precalentado de la escena incompleto:', e); }
  } while (warmUpQueued);
  warmUpChain = null;
}

async function runWarmUp() {
  /* User Timing, no console.log: deja el coste del precalentado registrado en
     la línea de tiempo del navegador, que es donde `npm run perf` lo lee. Si
     un precalentado cae en mitad del scroll se ve ahí, no hay que adivinarlo.
     La medida cubre el pase entero, cesiones incluidas: es tiempo de pared,
     que es lo que espera el lector con la cortina delante. */
  const markStart = `warmUpScene ${++warmUpRuns}`;
  try { performance.mark(`${markStart} start`); } catch { /* sin User Timing no pasa nada */ }
  const doorWas = doorLightGroup ? doorLightGroup.visible : null;
  const singlePassDuringWarmUp = [];
  const programs = new Set();
  try {
    /* compile() NO adquiere la variante a doble cara de los materiales
       transparentes: three.js los parte en dos pasadas (FrontSide y BackSide)
       y se deja el material con needsUpdate, así que la variante que de verdad
       se dibujará se compilaría en el primer render real. Con
       forceSinglePass=true durante el calentamiento se adquiere esa variante;
       el flag no forma parte de la clave del programa, así que el programa
       calentado es exactamente el que se usará después. */
    scene.traverse((obj) => {
      const mats = Array.isArray(obj.material) ? obj.material : (obj.material ? [obj.material] : []);
      for (let i = 0; i < mats.length; i++) {
        const m = mats[i];
        if (m && m.transparent && m.side === THREE.DoubleSide && m.forceSinglePass === false) {
          singlePassDuringWarmUp.push(m);
          m.forceSinglePass = true;
        }
      }
    });

    await breathe();

    /* Dos pasadas, una por estado de luces del relato (la puerta encendida y
       apagada): el número de luces visibles forma parte de la clave con la que
       three.js cachea los programas, así que cada estado es un programa
       distinto y los dos se usan al bajar. */
    for (const doorOn of doorWas === null ? [true] : [doorWas, !doorWas]) {
      if (doorLightGroup) doorLightGroup.visible = doorOn;
      renderer.compile(scene, camera);
      /* compile() deja el programa en el material, pero la INTROSPECCIÓN de
         uniforms (getProgramParameter + getActiveUniform, que es lo que
         bloquea el hilo principal) solo la hace la primera pinta. Se provoca
         aquí.

         Pintar una vez NO sirve como atajo: three.js elige otra variante de
         programa cuando el destino no es el canvas —el outputColorSpace cambia
         (js/three.module.js:20753)—, así que una pinta de calentamiento
         calienta programas que después no usa nadie. Medido: 57 programas
         creados, 16 sin usar nunca, y 9 todavía fríos en el scroll. */
      scene.traverse((obj) => {
        const mats = Array.isArray(obj.material) ? obj.material : (obj.material ? [obj.material] : []);
        for (let i = 0; i < mats.length; i++) {
          const m = mats[i];
          if (!m) continue;
          const program = renderer.properties.get(m)?.currentProgram;
          if (program) programs.add(program);
        }
      });
      /* Ceder entre pasadas: cada `renderer.compile` de la escena entera es el
         bloque más largo del pase y dejarlo seguido del siguiente convierte
         dos tareas grandes en una enorme. */
      await breathe();
    }

    /* La introspección de uniforms es lo segundo más caro del arranque
       (1 595 ms medidos dentro de WebGLUniforms) y va programa por programa,
       así que es el sitio natural para ceder: se deja pintar cada pocos. */
    let introspected = 0;
    for (const program of programs) {
      try { program.getUniforms(); } catch { /* un programa roto ya fallará solo */ }
      if (++introspected % 6 === 0) await breathe();
    }

    /* Y las texturas: se suben a la GPU ahora, no en el primer fotograma que
       las necesite. Se recogen primero y se suben después porque dentro de un
       `traverse` no se puede ceder; `texSubImage2D` costó 287 ms en el
       arranque medido y repartido en lotes no bloquea ningún frame entero. */
    const pendingTextures = [];
    scene.traverse((obj) => {
      const mats = Array.isArray(obj.material) ? obj.material : (obj.material ? [obj.material] : []);
      for (let i = 0; i < mats.length; i++) {
        const m = mats[i];
        if (!m) continue;
        for (let s = 0; s < TEXTURE_SLOTS.length; s++) {
          const tex = m[TEXTURE_SLOTS[s]];
          if (!tex || !tex.isTexture || warmedTextures.has(tex.uuid)) continue;
          warmedTextures.add(tex.uuid);
          pendingTextures.push(tex);
        }
      }
    });
    for (let i = 0; i < pendingTextures.length; i++) {
      renderer.initTexture(pendingTextures[i]);
      if (i % 4 === 3) await breathe();
    }
  } catch (e) {
    /* Un precalentado que falla no debe tumbar la página: en el peor de los
       casos se vuelve al comportamiento de antes (compilar al primer dibujo). */
    console.warn('Precalentado de la escena incompleto:', e);
  } finally {
    for (let i = 0; i < singlePassDuringWarmUp.length; i++) singlePassDuringWarmUp[i].forceSinglePass = false;
    if (doorLightGroup) doorLightGroup.visible = doorWas;
    try {
      performance.mark(`${markStart} end`);
      performance.measure('warmUpScene', `${markStart} start`, `${markStart} end`);
    } catch { /* idem */ }
  }
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

/* ────────────────────────────────
   Decodificador Draco (compartido por moneda, puerta y figuras)
──────────────────────────────── */
const dracoLoader = new DRACOLoader();
/* Decodificador Draco LOCAL primero (js/vendor/draco/): el proyecto ya era
   offline-first (three.js, GSAP y D3 se sirven de js/), pero el decoder seguía
   saliendo al CDN de Google — si ese CDN era inalcanzable (red filtrada, sin
   conexión, preview aislada) los GLB no decodificaban y el sitio se quedaba
   sin moneda ni puerta. Cadena: local → gstatic → jsDelivr.

   Un solo decodificador para TODO (moneda, puerta y figuras): antes
   figures.js creaba el suyo, con su propio worker y su propia descarga del
   wasm. */
/* preload(): el decodificador (wrapper 57 KB + wasm 188 KB) se baja AHORA, en
   paralelo con los GLB. Sin esto DRACOLoader lo pide perezosamente al primer
   parse, o sea cuando la moneda ya llegó: medido, el GLB estaba en memoria a
   los 0,2 s y el decoder no se pedía hasta los 6,4 s. La sonda HEAD que había
   aquí sobraba —duplicaba la petición del wrapper y salía abortada en la
   consola de red—; el respaldo al CDN se decide con el resultado real. */
const DRACO_CDN = 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/';
const DRACO_MIRROR = 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/libs/draco/gltf/';
/* preload() devuelve el loader; la promesa de verdad es `decoderPending`.
   Si falla, dispose() la limpia y el siguiente preload() reintenta con otra
   ruta. Las cargas de GLB que ya estaban esperando reciben ese mismo
   decodificador (GLTFLoader llama a _initDecoder de nuevo por parse). */
const preloadDraco = (path) => {
  /* dispose() cierra workers pero no olvida la promesa fallida; sin esto el
     reintento devolvería el mismo rechazo. */
  dracoLoader.dispose();
  dracoLoader.decoderPending = null;
  dracoLoader.setDecoderPath(path);
  return dracoLoader.preload().decoderPending;
};
preloadDraco('js/vendor/draco/').catch(() => {
  console.warn('Draco local no disponible — usando CDN gstatic');
  return preloadDraco(DRACO_CDN);
}).catch(() => {
  console.warn('Draco CDN primario no disponible — usando mirror jsDelivr');
  return preloadDraco(DRACO_MIRROR);
}).catch((e) => console.warn('Ningún decodificador Draco disponible:', e));

/* ═══════════════════════════════════════════════════════════
   FIGURAS DE LA SALA — tu trabajo en Blender, con placeholders.
   Si un .glb de figures/ todavía no existe, se dibuja un
   icosaedro + halo y se marca "por modelar" en el gabinete.
═══════════════════════════════════════════════════════════ */
/* Las figuras no pasan por el LoadingManager de la moneda y la puerta: cargan
   por su cuenta. Precalientan al llegar, o su primer programa se compilaría
   al entrar en La Sala. El `setTimeout` no es decorativo: `onReady` puede
   dispararse de forma síncrona desde dentro de initFigureSystem (las figuras
   que aún no tienen GLB se resuelven como placeholder ahí mismo), y en ese
   instante `doorLightGroup` —que se declara más abajo— todavía está en zona
   muerta temporal. Es el mismo fallo que documenta el README en el Paso 2. */
const figureSystem = initFigureSystem(scene, {
  dracoLoader,
  debug: DEBUG_MODE,
  onReady: () => setTimeout(warmUpScene, 0),
});

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
const doorLightGroup = buildDoorSpots();

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
/* Se precalienta ANTES de levantar la cortina: el trabajo sucio de la primera
   pinta (compilar programas, subir texturas) ocurre tapado, no en el primer
   scroll del lector. */
manager.onLoad = () => {
  /* Se ESPERA al precalentado antes de levantar la cortina: si se levanta
     antes, el trabajo sucio de la primera pinta ocurre a la vista del lector.
     Ahora que el precalentado cede el hilo, esperar no congela nada: la moneda
     sigue girando mientras tanto, que es justo lo contrario de antes.
     `finally` y no `then` para que un fallo no deje la cortina puesta. */
  warmUpScene().finally(() => {
    setTimeout(() => { if (renderer) loadEl.classList.add('hidden'); }, 300);
  });
};
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
/* GLB subido por el usuario en GitHub: será la base visual de la puerta.
   La puerta procedural queda como respaldo y conserva los pivotes de apertura
   hasta que el GLB esté recortado en hojas separadas. */
let bcchDoorModel = null;
let proceduralDoorModel = null;
let bcchPivotL = null;
let bcchPivotR = null;
const bcchDoorMats = [];
const bcchApertureMats = [];
const bcchEdgeMats = [];
const proceduralDoorMats = [];

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
  /* No aplastar en Z el GLB abrible: una escala padre no uniforme deforma
     cualquier hoja que rota dentro de él. La compresión se conserva solo para
     el respaldo procedural/fallback. */
  const isOpenableBcch = !!bcchDoorModel && doorModel === bcchDoorModel;
  const squash = isOpenableBcch ? 1 : THREE.MathUtils.clamp(cfg.doorDepthSquash ?? 1, 0.05, 1);
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

function fitDoorModelToStage(model) {
  model.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(model);
  if (box.isEmpty()) return null;
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);
  model.updateMatrixWorld(true);
  const fittedBox = new THREE.Box3().setFromObject(model);
  const size = fittedBox.getSize(new THREE.Vector3());
  doorFootprint = { width: Math.max(size.x, 1e-3), depth: Math.max(size.z, 1e-3) };
  doorLocalHeight = Math.max(size.y, 1e-3);
  doorBottomOffset = fittedBox.min.y;
  doorTopOffset = fittedBox.max.y;
  doorModel = model;
  applyDoorScale();
  return fittedBox;
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
  /* anisotropy 8 obliga a la GPU a muestrear ocho veces por texel en las
     superficies vistas de canto y multiplica el coste de subir la textura y
     generar sus mipmaps. Estas son texturas de piedra y bronce sobre una
     puerta que se ve casi de frente, donde el filtrado anisotrópico no aporta
     nada visible: 2 basta y deja de bloquear el arranque. */
  tex.anisotropy = 2;
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
function makeBronzePatinaMap() {
  return makeDoorCanvasTexture(512, (ctx, s) => {
    /* Bronce vivo: base irregular con rayas verticales muy suaves. La textura
       se multiplica por la paleta de materiales, por eso se mantiene casi
       neutra y solo entrega variación/relieve. */
    const grd = ctx.createLinearGradient(0, 0, s, s);
    /* El mapa se mantiene claro porque Three multiplica `map × color`.
       Si el mapa ya es café oscuro, la puerta termina roja/negra. */
    grd.addColorStop(0, '#f0c875');
    grd.addColorStop(0.48, '#d8a653');
    grd.addColorStop(1, '#fff0b1');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 4200; i++) {
      const a = 0.025 + Math.random() * 0.10;
      ctx.fillStyle = Math.random() > 0.52
        ? `rgba(255,238,178,${a})`
        : `rgba(72,43,13,${a * 1.20})`;
      const x = Math.random() * s;
      const y = Math.random() * s;
      ctx.fillRect(x, y, 1 + Math.random() * 2.5, 3 + Math.random() * 16);
    }
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = '#211307';
    ctx.lineWidth = 1;
    for (let x = 6; x < s; x += 18 + Math.random() * 8) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + Math.sin(x) * 5, s);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  });
}
function makeDoorAuraMap() {
  return makeDoorCanvasTexture(512, (ctx, s) => {
    /* Luz editorial detrás del pórtico: no representa un objeto físico, sino
       un foco teatral que hace que la puerta sea el centro de la escena. */
    const g = ctx.createRadialGradient(s * 0.5, s * 0.45, 0, s * 0.5, s * 0.48, s * 0.52);
    g.addColorStop(0.00, 'rgba(255, 192, 94, 0.75)');
    g.addColorStop(0.30, 'rgba(255, 150, 46, 0.26)');
    g.addColorStop(0.58, 'rgba(146, 76, 20, 0.08)');
    g.addColorStop(1.00, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
  });
}
/* Las cuatro texturas se dibujan en canvas: dos bucles de 5 200 y 4 200
   iteraciones sobre lienzos de 512², todo síncrono. Se les da su propia tarea
   para no sumarlas al tramo de la puerta. */
await breathe();
const doorStoneMap = makeCarvedStoneMap();
doorStoneMap.repeat.set(2.4, 3.0);
const doorBronzeMap = makeBronzePatinaMap();
doorBronzeMap.repeat.set(1.4, 4.6);
const doorMeanderMap = makeMeanderMap();
doorMeanderMap.repeat.set(6, 8);
const doorAuraMap = makeDoorAuraMap();
doorAuraMap.wrapS = doorAuraMap.wrapT = THREE.ClampToEdgeWrapping;
const doorAuraMat = new THREE.MeshBasicMaterial({
  map: doorAuraMap,
  transparent: true,
  opacity: 0,
  depthWrite: false,
  depthTest: false,
  blending: THREE.AdditiveBlending,
  toneMapped: false,
});
const doorAura = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), doorAuraMat);
doorAura.name = 'doorEditorialAura';
doorAura.renderOrder = -5;
doorAura.visible = false;
doorGroup.add(doorAura);
const doorLeafMats = [];
const doorLeafLineMats = [];
const doorFrameLineMats = [];
const doorFacadeMeshes = [];
const doorInteriorMeshes = [];
const doorLeafMeshes = [];
const doorFrameMats = [];
const doorLeafColorVoid = new THREE.Color('#07090f');
/* Paleta de la puerta: bronce envejecido + sombras incisas + oro solo en los
   relieves. Separar base / sombra / ornamento evita el amarillo plano que
   escondía los detalles de los paneles. */
const doorLeafBaseBronze = new THREE.Color('#6b4f28');
const doorLeafBaseGold = new THREE.Color('#d9a94f');
const doorLeafDarkBronze = new THREE.Color('#201307');
const doorLeafDarkGold = new THREE.Color('#2d1b08');
const doorLeafOrnBronze = new THREE.Color('#c9973f');
const doorLeafOrnGold = new THREE.Color('#ffd76a');
const doorFrameToneColors = {
  stone: {
    hero: new THREE.Color('#6e7d92'),
    meet: new THREE.Color('#3a4048'),
  },
  dark: {
    hero: new THREE.Color('#4c5666'),
    meet: new THREE.Color('#252b33'),
  },
  granite: {
    hero: new THREE.Color('#2a2724'),
    meet: new THREE.Color('#22201e'),
  },
  medal: {
    hero: new THREE.Color('#c9973f'),
    meet: new THREE.Color('#c9973f'),
  },
};
const doorSpotKeyHero = new THREE.Color(0xd4e0f2);
const doorSpotKeyMeet = new THREE.Color(0xe8eef6);
const doorSpotRimHero = new THREE.Color(0x6e819c);
const doorSpotRimMeet = new THREE.Color(0x8a93a3);
function doorFrameTone(matName) {
  if (matName === 'stone_dark') return 'dark';
  if (matName === 'granite') return 'granite';
  return 'stone';
}

/* Pivotes y glow del generador procedural (js/build-door.js). */
let doorPivotL = null, doorPivotR = null, doorGlowMat = null;
/* Base real de la puerta relativa al pivote, en unidades del modelo. Se usa
   para apoyar la puerta en CONFIG.door.groundY y para la sombra de contacto.
   Se recalcula al cargar el modelo; -1.15 es solo el valor de reserva. */
let doorBottomOffset = -1.15;
/* Techo (pórtico) relativo al pivote, mismas unidades. Junto con
   doorBottomOffset da el centro VISUAL de la figura completa, que es el punto
   de mira durante el dolly de cruce (ver animate — rama 'doorway'). */
let doorTopOffset = 1.15;
/* Alto TOTAL del modelo en sus unidades (sin escala): con él animate limita
   el tamaño en pantalla del lockup para que el pórtico quepa en el viewport. */
let doorLocalHeight = 0;
/* Corte antes del tramo más caro del arranque: construir la fachada
   (buildCentralBankDoor + fusión de geometrías + recorrido de materiales)
   costaba 2 083 ms de una pieza. */
await breathe();
{
  /* La puerta ya no es un GLB estático: la genera js/build-door.js (port del
     Blender tools/build_door.py) con pivotes reales para abrir las hojas. */
  const built = buildCentralBankDoor();
  const model = built.group;
  proceduralDoorModel = model;
  /* El generador (port del Blender) construye con la fachada mirando a -Y;
     la cámara de la pieza mira hacia -Z: se rota -90° en X para encararla
     (el interior queda a -Z, detrás, y las bisagras verticales siguen
     siendo verticales). */
  model.rotation.x = -Math.PI / 2;
  doorPivotL = built.pivotL; doorPivotR = built.pivotR; doorGlowMat = built.glowMat;
  model.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(model);
  if (!box.isEmpty()) {
    /* Pivote = centro de las HOJAS (rol 'leaf'), igual que antes con 'toroide'. */
    const leafBox = new THREE.Box3();
    model.traverse((o) => { if (o.userData.role === 'leaf') leafBox.expandByObject(o); });
    const pivotBox = leafBox.isEmpty() ? box : leafBox;
    const center = pivotBox.getCenter(new THREE.Vector3());
    model.position.sub(center);
    model.updateMatrixWorld(true);
    /* La huella de escala es el ANCHO TOTAL del conjunto, fachada incluida,
       igual que con el GLB anterior: la fachada se dibuja aunque no cuente
       para el pivote, y si se excluye de la huella la puerta entera se
       renderiza ~1,5× más grande de lo prometido (el fallo que se veía:
       pórtico gigante recortado en el Acto 2). */
    const wholeSize = box.getSize(new THREE.Vector3());
    doorFootprint = { width: Math.max(wholeSize.x, 1e-3), depth: Math.max(wholeSize.z, 1e-3) };
    doorLocalHeight = Math.max(wholeSize.y, 1e-3);
    doorBottomOffset = box.min.y - center.y;
    doorTopOffset = box.max.y - center.y;
    doorModel = model;
    applyDoorScale();
  }

  /* El recorrido de materiales es la otra mitad cara de este tramo (744 ms
     medidos): toca cada malla de la fachada y le ajusta metalness, mapas y
     tono. Va en su propia tarea. */
  await breathe();

  model.traverse((object) => {
    if (!object.isMesh || !object.material) return;
    const m = object.material;
    if (!('metalness' in m)) return;
    const role = object.userData.role;
    const isDoorLeaf = role === 'leaf';
    const isGlow = role === 'glow';
    const isFacade = role === 'facade';
    const isMedal = role === 'medal';
    const isFrame = role === 'frame';
    /* La fachada (muros, pilastras, cornisa) vive en portada Y en el Acto 2:
       la puerta de la portada debe ser la MISMA figura completa que la del
       Acto 2 (antes le "faltaba parte del marco" respecto de La Reunión;
       en la versión de GitHub el pórtico entero estaba en el still). */
    if (isFacade) doorFacadeMeshes.push(object);
    if (object.userData.role === 'interior' || object.userData.role === 'glow') {
      doorInteriorMeshes.push(object);
    }
    if (isDoorLeaf) {
      if (!doorLeafMeshes.includes(object)) doorLeafMeshes.push(object);
      const matName = object.userData.matName || '';
      if (matName !== 'bronze_dark') {
        m.map = null;
        m.bumpMap = null;
        m.bumpScale = 0;
      }
      /* Contorno técnico sutil: se dibuja una malla de aristas encima de las
         hojas para que los paneles sigan leyéndose cuando la puerta se achica.
         No se aplica a las perlas instanciadas ni a las ranuras negras. */
      if (!object.isInstancedMesh && matName !== 'bronze_dark' && object.geometry && !object.userData.edgeLinesAdded) {
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x160b03,
          transparent: true,
          opacity: 0.42,
          depthTest: true,
          depthWrite: false,
        });
        const lines = new THREE.LineSegments(new THREE.EdgesGeometry(object.geometry, 38), lineMat);
        lines.name = `${object.name}_edgeLines`;
        lines.renderOrder = 3;
        object.add(lines);
        doorLeafLineMats.push(lineMat);
        object.userData.edgeLinesAdded = true;
      }
      /* La hoja cerrada SÍ se ve en portada (bronce casi noche): el nuevo
         modelo luce su relieve; el oro llega con leafT en el acto 2. */
    }
    if ((isFacade || isFrame) && object.geometry && !object.userData.edgeLinesAdded) {
      const tone = doorFrameTone(object.userData.matName || 'stone');
      const opacity = tone === 'dark' ? 0.22 : (tone === 'granite' ? 0.28 : 0.12);
      const lineMat = new THREE.LineBasicMaterial({
        color: tone === 'stone' ? 0x3c3327 : 0x110d09,
        transparent: true,
        opacity,
        depthTest: true,
        depthWrite: false,
      });
      const lines = new THREE.LineSegments(new THREE.EdgesGeometry(object.geometry, 36), lineMat);
      lines.name = `${object.name}_stoneEdges`;
      lines.renderOrder = 2;
      object.add(lines);
      doorFrameLineMats.push({ m: lineMat, baseOpacity: opacity });
      object.userData.edgeLinesAdded = true;
    }
    if (isGlow) {
      /* El glow es solo atmósfera del umbral. Si escribe profundidad u opacidad
         alta, se ve como una placa color piel justo cuando la cámara entra y
         oculta la estatua de La Sala. */
      m.transparent = true;
      m.opacity = 0;
      m.depthWrite = false;
      m.depthTest = true;
      m.side = THREE.DoubleSide;
      m.blending = THREE.AdditiveBlending;
      m.needsUpdate = true;
      return;
    }   // el glow lo gobierna el scroll
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
        if (!doorLeafMats.some((r) => r.m === m)) {
          /* Tono por material horneado:
             - bronze_matte = paño base / paneles, bronce medio
             - bronze_dark  = ranuras y sombras, casi negro
             - bronze       = molduras, rosetas, perlas y herrajes, oro viejo */
          const matName = object.userData.matName || '';
          const tone = matName === 'bronze_dark' ? 'dark' : (matName === 'bronze_matte' ? 'base' : 'orn');
          doorLeafMats.push({ m, tone });
        }
      } else {
        m.color.set('#ffd76a');
        m.metalness = 1.0;
        m.roughness = 0.22;
        m.envMapIntensity = 1.3;
        if (!m.emissive) m.emissive = new THREE.Color();
        m.emissive.set('#3d2508');
        m.emissiveIntensity = 0.05;
      }
    } else if (isMedal) {
      /* Medallas de la pared (placa y medallón): siempre doradas; NO se
         repintan a piedra con el marco como antes. */
      m.color.set('#c9973f');
      m.metalness = 1.0;
      m.roughness = 0.35;
      m.envMapIntensity = 0.9;
      if (!m.emissive) m.emissive = new THREE.Color();
      m.emissive.set('#000000');
      m.emissiveIntensity = 0;
    } else if (HERO_DOOR_LOCKUP) {
      const tone = doorFrameTone(object.userData.matName || 'stone');
      const toneColors = doorFrameToneColors[tone] || doorFrameToneColors.stone;
      m.color.copy(toneColors.hero);
      m.metalness = tone === 'granite' ? 0.10 : 0.04;
      m.roughness = tone === 'granite' ? 0.68 : 0.86;
      m.map = doorStoneMap;
      m.bumpMap = doorStoneMap;
      m.bumpScale = tone === 'dark' ? 0.020 : 0.040;
      m.envMapIntensity = tone === 'granite' ? 0.20 : 0.26;
      if (!m.emissive) m.emissive = new THREE.Color();
      m.emissive.set('#000000');
      m.emissiveIntensity = 0;
      if (!doorFrameMats.some((r) => r.m === m)) doorFrameMats.push({ m, tone });
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
    if (!doorMats.includes(m)) doorMats.push(m);
    if (!proceduralDoorMats.includes(m)) proceduralDoorMats.push(m);
  });
  doorModelGroup.add(model);
}

const bcchStoneLow = new THREE.Color('#2e3741');
const bcchStoneHigh = new THREE.Color('#5c6874');
const bcchStep = new THREE.Color('#232a32');
const bcchBronzeLow = new THREE.Color('#9f6118');
const bcchBronzeHigh = new THREE.Color('#d9a23a');
const bcchGold = new THREE.Color('#f2d16a');
const bcchDoorLight = new THREE.Color('#d6a030');
const bcchLineDark = new THREE.Color('#090502');
const bcchHeroTint = new THREE.Color('#24251e');
const bcchMeetTint = new THREE.Color('#f1f0e7');
const bcchLeafGlow = new THREE.Color('#211706');
const bcchFrameGlow = new THREE.Color('#05070a');
const bcchObsidianLeaf = new THREE.Color('#39434e');
function bcchSmooth(edge0, edge1, x) {
  const t = THREE.MathUtils.clamp((x - edge0) / Math.max(edge1 - edge0, 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
}
function bcchDoorMaskAt(x, y, isGoldMesh = false, z = 0) {
  /* La puerta v3 trae las hojas ya separadas: la máscara dorada cubre TODA la
     hoja (solo se atenúa en los cantos superior e inferior). Ya no se recorta
     por x como con el GLB anterior (que traía el dorado fundido en una sola
     lámina continua bajo los pilares). */
  if (!isGoldMesh) return 0;
  /* z: la hoja vive en [0.02,0.17]; las medallas, ya pegadas a la piedra,
     en [-0.14,-0.04]. Ambas son bronce. */
  if (y < -0.86 || y > 0.84 || z < -0.15 || z > 0.24) return 0;
  const doorY = bcchSmooth(-0.86, -0.72, y) * (1 - bcchSmooth(0.74, 0.86, y));
  return THREE.MathUtils.clamp(0.86 + 0.14 * doorY, 0, 1);
}
function bcchColorAt(point, isGoldMesh = false, target = new THREE.Color()) {
  const x = point.x;
  const y = point.y;
  const z = point.z;
  const ax = Math.abs(x);
  const isStep = y < -0.62 || (y < -0.48 && ax > 0.42);
  const isCornice = y > 0.82;
  const isSidePillar = ax > 0.47 && ax < 0.86 && y > -0.64 && y < 0.84;
  const doorMask = bcchDoorMaskAt(x, y, isGoldMesh, z);

  /* Dos capas reales del GLB, sin sobreinterpretar piezas:
     1) Material.023 / Cubo.064 = cuerpo completo: gris obsidiana/piedra.
     2) Material.002 / Toroide.001 = capa dorada actual. */
  if (isGoldMesh) {
    const goldLift = THREE.MathUtils.clamp(0.42 + 0.34 * (y + 0.85) / 1.7 + (x > 0 ? 0.03 : 0.0), 0, 0.86);
    target.copy(bcchBronzeLow).lerp(bcchBronzeHigh, goldLift);
    target.lerp(bcchDoorLight, 0.16);
    target.lerp(bcchGold, 0.16 + 0.10 * doorMask);
    const groove = (1 - bcchSmooth(0.00, 0.035, ax))
      * bcchSmooth(-0.70, -0.54, y) * (1 - bcchSmooth(0.64, 0.82, y));
    target.lerp(bcchLineDark, groove * 0.18);
    return 0.94;
  }

  const stoneLift = THREE.MathUtils.clamp(0.24 + 0.18 * (y + 0.9) / 1.8 + 0.05 * (1 - Math.min(ax, 1)), 0, 0.46);
  target.copy(bcchStoneLow).lerp(bcchStoneHigh, stoneLift);
  if (doorMask > 0.01) {
    /* La hoja-base también es de la capa obsidiana; las molduras/aros dorados
       vienen encima en Toroide. */
    target.lerp(bcchObsidianLeaf, 0.62);
  }
  if (isSidePillar) target.lerp(bcchStoneLow, 0.38);
  if (isCornice) target.lerp(bcchLineDark, 0.30);
  if (isStep) target.lerp(bcchStep, 0.78);
  return doorMask > 0.01 ? 0.16 : 0.08;
}
function makeBcchDoorMaterial(kind = 'frame') {
  const mat = new THREE.MeshStandardMaterial({
    color: bcchHeroTint.clone(),
    vertexColors: true,
    metalness: 0.1,
    roughness: 0.82,
    envMapIntensity: 0.72,
    emissive: 0x000000,
    emissiveIntensity: 0,
    transparent: true,
    opacity: 0,
    depthWrite: true,
    side: THREE.DoubleSide,
  });
  mat.userData.bcchKind = kind;
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float bcchDoorMask;\nvarying float vBcchDoorMask;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvBcchDoorMask = bcchDoorMask;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vBcchDoorMask;')
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(0.92, 0.38, vBcchDoorMask);')
      .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\nmetalnessFactor = mix(0.035, 0.82, vBcchDoorMask);');
  };
  mat.customProgramCacheKey = () => 'bcch-door-openable-recolor-v13';
  return mat;
}
function buildGeometryFromTriangles(tris, pivotX = 0, pivotZ = 0) {
  if (!tris.length) return null;
  const positions = new Float32Array(tris.length * 9);
  const normals = new Float32Array(tris.length * 9);
  const colors = new Float32Array(tris.length * 9);
  const masks = new Float32Array(tris.length * 3);
  let pi = 0, ni = 0, ci = 0, mi = 0;
  for (const tri of tris) {
    for (const v of tri) {
      positions[pi++] = v.p.x - pivotX;
      positions[pi++] = v.p.y;
      positions[pi++] = v.p.z - pivotZ;
      normals[ni++] = v.n.x;
      normals[ni++] = v.n.y;
      normals[ni++] = v.n.z;
      colors[ci++] = v.c.r;
      colors[ci++] = v.c.g;
      colors[ci++] = v.c.b;
      masks[mi++] = v.mask;
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('bcchDoorMask', new THREE.BufferAttribute(masks, 1));
  geo.computeBoundingSphere();
  return geo;
}
function makeBcchMesh(geometry, name, kind = 'frame') {
  if (!geometry) return null;
  const mat = makeBcchDoorMaterial(kind);
  const mesh = new THREE.Mesh(geometry, mat);
  mesh.name = name;
  mesh.renderOrder = 5;
  mesh.userData.role = 'bcchDoor';
  if (geometry.attributes.position?.count > 0) {
    const bronzeEdges = kind === 'leaf' || kind === 'medal';
    const edgeMat = new THREE.LineBasicMaterial({
      color: bronzeEdges ? 0x120803 : 0x050403,
      transparent: true,
      opacity: 0,
      depthTest: true,
      depthWrite: false,
    });
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, bronzeEdges ? 26 : 34), edgeMat);
    edges.name = `${name}_edgeLines`;
    edges.renderOrder = 6;
    mesh.add(edges);
    bcchEdgeMats.push({ m: edgeMat, baseOpacity: bronzeEdges ? 0.22 : 0.15, kind });
  }
  doorMats.push(mat);
  bcchDoorMats.push(mat);
  if (kind === 'aperture') bcchApertureMats.push(mat);
  return mesh;
}
/* ── Geometría de referencia de Puerta_bcch_v3.glb ────────────────────
   Medida sobre el archivo (unidades del modelo, relativas al centro de su
   caja). Lo que el GLB trae mal y aquí se corrige, en orden de lo que se ve:

   (a) El MURO trasero es una losa maciza x[-1,1] × y[-0.93,0.83] × z[-0.34,-0.14]
       SIN vano, triangulada con triángulos larguísimos (de x=-1 a x=0.23).
       El recorte anterior descartaba triángulos por su CENTROIDE (|cx|<0.6):
       de esos triángulos unos se iban y otros se quedaban, y lo que quedaba
       eran cuñas diagonales entre las pilastras y las hojas (la "pajarita"
       negra a cada lado en el hero) y alas cortadas en diagonal. Al abrir,
       las cuñas aparecían como alas doradas flotando junto a las hojas.
       → La losa (y la tabla interior fantasma que flota detrás de las hojas)
         se descartan enteras y el muro se reconstruye limpio: dos alas con
         el vano exacto de las hojas y jambas con derrame hacia la sala. No
         lleva dintel: las hojas llegan a 0.822 y la losa termina en 0.833;
         el dintel visual es la cornisa, que ya está en el modelo.

   (b) El pórtico NO está centrado en la caja del modelo (la caja la domina
       la losa, simétrica): pilastras -0.015, hojas -0.023, cornisa -0.011,
       escalinata -0.017, capiteles -0.006. La ranura junto a la hoja
       izquierda medía 0.108 y la derecha 0.123 (28 vs 33 px en el hero).
       → Todo se centra en el eje real de las pilastras; cada pieza suelta
         (hojas, cornisa, escalinata, capiteles) se recentra por separado.

   (c) Las bisagras del GLB (empties Bisagra_*) están en la ESQUINA de la
       caja de cada hoja: x en el extremo exterior de la bola decorativa
       (0.098 fuera del canto real) y z a media profundidad. Al girar, la
       hoja orbitaba ese eje en vez de girar sobre su canto: pasados ~60° la
       esquina trasera barría 0.1 hacia la pilastra, atravesando la jamba.
       → Pivote en el canto exterior-TRASERO de cada hoja (lado de la sala,
         hacia donde abre), como una bisagra real: ningún punto de la hoja
         cruza jamás el plano de su bisagra hacia la jamba.

   (d) Las MEDALLAS de bronce (los discos a la altura de las manillas) vienen
       fusionadas en la malla de cada hoja, así que giraban con la puerta y
       flotaban 0.21 por delante del muro. En el edificio real están fijas en
       la piedra, a cada lado del vano.
       → Se separan de las hojas (todo triángulo con vértices más allá del
         canto) y se montan en el muro estático, en el paño entre la jamba y
         la pilastra, apoyadas en la cara vista de la piedra. */
const BCCH_V3 = {
  axisX: -0.0153,           // eje de simetría de las pilastras (x rel. a la caja)
  slabZ: [-0.34, -0.14],    // profundidad de la losa original (se conserva)
  slabY: [-0.9267, 0.8333], // base y coronación de la losa
  slabX: 1.0,               // media anchura del bloque
  ballY: 0.0986,            // altura de la medalla (misma que las manillas); se excluye al medir el canto
  pilasterInnerX: 0.5053,   // cara interior de las pilastras (|x|, tras centrar): límite del paño de la medalla
  gap: 0.02,                // holgura hoja ↔ jamba
  splay: 0.06,              // derrame de las jambas hacia la sala
};

function buildOpenableBcchDoor(sourceModel, rawCenter) {
  const group = new THREE.Group();
  group.name = 'Puerta_bcch_Openable';

  /* (b) Centro visual real del pórtico: el eje de las pilastras. */
  const center = rawCenter.clone();
  center.x += BCCH_V3.axisX;

  const staticTris = [];
  const leftTris = [];
  const rightTris = [];
  const mkVert = (p, n) => ({ p, n, c: new THREE.Color(), mask: 0 });
  const isSlabZ = (z) => Math.abs(z - BCCH_V3.slabZ[0]) < 3e-3 || Math.abs(z - BCCH_V3.slabZ[1]) < 3e-3;

  sourceModel.updateMatrixWorld(true);
  sourceModel.traverse((object) => {
    if (!object.isMesh || !object.geometry) return;
    const geo = object.geometry;
    const pos = geo.attributes.position;
    const normal = geo.attributes.normal;
    if (!pos || !normal) return;
    const normalMatrix = new THREE.Matrix3().getNormalMatrix(object.matrixWorld);
    const isLeftLeaf = /Puerta_Izquierda/i.test(object.name);
    const isRightLeaf = /Puerta_Derecha/i.test(object.name);
    const index = geo.index;
    const triCount = index ? index.count / 3 : pos.count / 3;
    for (let t = 0; t < triCount; t++) {
      const ids = index
        ? [index.getX(t * 3), index.getX(t * 3 + 1), index.getX(t * 3 + 2)]
        : [t * 3, t * 3 + 1, t * 3 + 2];
      const tri = ids.map((id) => mkVert(
        new THREE.Vector3().fromBufferAttribute(pos, id).applyMatrix4(object.matrixWorld).sub(center),
        new THREE.Vector3().fromBufferAttribute(normal, id).applyMatrix3(normalMatrix).normalize()
      ));
      if (isLeftLeaf) { leftTris.push(tri); continue; }
      if (isRightLeaf) { rightTris.push(tri); continue; }
      /* (a) Losa y tabla interior: son las ÚNICAS piezas cuyos vértices viven
         todos en los planos z=-0.34 / z=-0.14. Se van enteras. */
      if (tri.every((v) => isSlabZ(v.p.z))) continue;
      staticTris.push(tri);
    }
  });

  /* (b) Recentrado pieza a pieza. Cada pieza se identifica por su banda
     vertical (y sus extensiones, para no confundirla con las pilastras). */
  const extentOf = (tri, axis) => {
    const vals = tri.map((v) => v.p[axis]);
    return Math.max(...vals) - Math.min(...vals);
  };
  const recenterPiece = (tris, pred) => {
    let min = Infinity, max = -Infinity;
    const picked = [];
    for (const tri of tris) {
      if (!pred(tri)) continue;
      picked.push(tri);
      for (const v of tri) { min = Math.min(min, v.p.x); max = Math.max(max, v.p.x); }
    }
    if (!picked.length) return 0;
    const dx = -(min + max) * 0.5;
    if (Math.abs(dx) > 1e-4) for (const tri of picked) for (const v of tri) v.p.x += dx;
    return dx;
  };
  const shifts = {
    cornice: recenterPiece(staticTris, (tri) =>
      tri.every((v) => v.p.y >= BCCH_V3.slabY[1] + 2e-3) && (extentOf(tri, 'x') > 0.5 || extentOf(tri, 'z') > 0.5)),
    capitals: recenterPiece(staticTris, (tri) =>
      tri.every((v) => v.p.y >= 0.63 - 1e-3 && v.p.y <= 0.845 && Math.abs(v.p.x) < 0.53)),
    steps: recenterPiece(staticTris, (tri) =>
      tri.every((v) => v.p.y <= -0.7038 + 1e-3 && v.p.z >= -0.27)),
  };
  /* Hojas: se recentran como PAR por sus cantos reales (sin la bola), para
     conservar la ranura central original entre ambas. */
  const leafEdge = (tris, sign) => {
    let edge = sign < 0 ? Infinity : -Infinity;
    for (const tri of tris) for (const v of tri) {
      if (Math.abs(v.p.y - BCCH_V3.ballY) < 0.07) continue;
      edge = sign < 0 ? Math.min(edge, v.p.x) : Math.max(edge, v.p.x);
    }
    return edge;
  };
  let edgeL = leafEdge(leftTris, -1);
  let edgeR = leafEdge(rightTris, +1);

  /* (d) MEDALLAS. En el edificio real son dos discos de bronce FIJOS en la
     piedra, a la altura de las manillas, uno a cada lado del vano. En el GLB
     vienen fusionados dentro de la malla de cada hoja (un disco de r≈0.05 y
     0.10 de grosor que sobresale del canto exterior), así que giraban con la
     puerta y además flotaban 0.21 por delante de la pared. Se separan aquí:
     todo triángulo de la hoja con algún vértice más allá del canto es
     medalla (los 14–18 triángulos "puente" que la unían al canto también,
     para que no quede una oreja en la hoja). */
  const splitMedal = (tris, edge, sign) => {
    const keep = [], medal = [];
    for (const tri of tris) {
      const beyond = tri.some((v) => (sign < 0 ? v.p.x < edge - 1e-4 : v.p.x > edge + 1e-4));
      (beyond ? medal : keep).push(tri);
    }
    return { keep, medal };
  };
  const splitL = splitMedal(leftTris, edgeL, -1);
  const splitR = splitMedal(rightTris, edgeR, +1);
  leftTris.length = 0; leftTris.push(...splitL.keep);
  rightTris.length = 0; rightTris.push(...splitR.keep);
  const medalTris = [];
  /* La geometría del GLB para el disco es de muy baja resolución y trae los
     triángulos "puente" con el canto (una cara diagonal en el frente). En
     lugar de recolocarla, se genera un disco limpio con SUS medidas (radio y
     grosor medidos de la pieza original) y se monta en el paño de pared
     entre la jamba y la pilastra, con la trasera apoyada en la cara vista
     de la piedra (z = slabZ[1]) y a la altura original (la de las manillas). */
  const medalBox = new THREE.Box3();
  const placeMedal = (tris, side) => {
    medalBox.makeEmpty();
    for (const tri of tris) for (const v of tri) medalBox.expandByPoint(v.p);
    if (medalBox.isEmpty()) return;
    const size = medalBox.getSize(new THREE.Vector3());
    const radius = Math.min(size.x, size.y) * 0.5;
    const depth = Math.max(size.z, 0.02);
    const cy = (medalBox.min.y + medalBox.max.y) * 0.5;
    const paneInner = side < 0 ? (edgeL + shifts.leaves) - BCCH_V3.gap : (edgeR + shifts.leaves) + BCCH_V3.gap;
    const paneOuter = side * BCCH_V3.pilasterInnerX;
    const cx = (paneInner + paneOuter) * 0.5;
    const zBack = BCCH_V3.slabZ[1];
    const zFront = zBack + depth;
    const N = 28;
    const ring = (z) => Array.from({ length: N }, (_, i) => {
      const a = (i / N) * Math.PI * 2;
      return new THREE.Vector3(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius, z);
    });
    const front = ring(zFront), back = ring(zBack);
    const cF = new THREE.Vector3(cx, cy, zFront), cB = new THREE.Vector3(cx, cy, zBack);
    const nF = new THREE.Vector3(0, 0, 1), nB = new THREE.Vector3(0, 0, -1);
    for (let i = 0; i < N; i++) {
      const j = (i + 1) % N;
      /* tapa frontal (mira a la cámara, +z) */
      medalTris.push([mkVert(cF.clone(), nF.clone()), mkVert(front[i].clone(), nF.clone()), mkVert(front[j].clone(), nF.clone())]);
      /* trasera (contra la piedra) */
      medalTris.push([mkVert(cB.clone(), nB.clone()), mkVert(back[j].clone(), nB.clone()), mkVert(back[i].clone(), nB.clone())]);
      /* canto */
      const ni = new THREE.Vector3(front[i].x - cx, front[i].y - cy, 0).normalize();
      const nj = new THREE.Vector3(front[j].x - cx, front[j].y - cy, 0).normalize();
      medalTris.push([mkVert(back[i].clone(), ni.clone()), mkVert(front[j].clone(), nj.clone()), mkVert(front[i].clone(), ni.clone())]);
      medalTris.push([mkVert(back[i].clone(), ni.clone()), mkVert(back[j].clone(), nj.clone()), mkVert(front[j].clone(), nj.clone())]);
    }
    /* Botón central en relieve (como la roseta de la referencia): un
       disco menor sobre la tapa, para que el bronce lea volumen y no un
       círculo plano. */
    const z2 = zFront + depth * 0.35;
    const front2 = ring(z2).map((v) => v.sub(new THREE.Vector3(cx, cy, 0)).multiplyScalar(0.55).add(new THREE.Vector3(cx, cy, 0)));
    const c2 = new THREE.Vector3(cx, cy, z2);
    for (let i = 0; i < N; i++) {
      const j = (i + 1) % N;
      medalTris.push([mkVert(c2.clone(), nF.clone()), mkVert(front2[i].clone(), nF.clone()), mkVert(front2[j].clone(), nF.clone())]);
      const ni = new THREE.Vector3(front2[i].x - cx, front2[i].y - cy, 0).normalize();
      const nj = new THREE.Vector3(front2[j].x - cx, front2[j].y - cy, 0).normalize();
      const bi = new THREE.Vector3(front2[i].x, front2[i].y, zFront), bj = new THREE.Vector3(front2[j].x, front2[j].y, zFront);
      medalTris.push([mkVert(bi, ni.clone()), mkVert(front2[j].clone(), nj.clone()), mkVert(front2[i].clone(), ni.clone())]);
      medalTris.push([mkVert(bi.clone(), ni.clone()), mkVert(bj, nj.clone()), mkVert(front2[j].clone(), nj.clone())]);
    }
  };
  shifts.leaves = -(edgeL + edgeR) * 0.5;
  placeMedal(splitL.medal, -1);
  placeMedal(splitR.medal, +1);
  for (const tris of [leftTris, rightTris]) for (const tri of tris) for (const v of tri) v.p.x += shifts.leaves;
  edgeL += shifts.leaves;
  edgeR += shifts.leaves;
  /* Plano posterior de las hojas (el que mira a la sala; la cámara está en +z). */
  let leafBackZ = Infinity;
  let leafTop = -Infinity;
  for (const tris of [leftTris, rightTris]) for (const tri of tris) for (const v of tri) {
    leafBackZ = Math.min(leafBackZ, v.p.z);
    leafTop = Math.max(leafTop, v.p.y);
  }

  /* (c) Bisagras en el canto exterior-trasero. */
  const hingeZ = leafBackZ;
  const hingeL = edgeL;
  const hingeR = edgeR;
  const pivotL = new THREE.Object3D();
  const pivotR = new THREE.Object3D();
  pivotL.name = 'Puerta_bcch_LeftPivot';
  pivotR.name = 'Puerta_bcch_RightPivot';
  pivotL.position.set(hingeL, 0, hingeZ);
  pivotR.position.set(hingeR, 0, hingeZ);
  pivotL.userData.openSign = 1;
  pivotR.userData.openSign = -1;

  /* (a) Muro reconstruido. Dos alas prismáticas (planta en trapecio: el
     vano se ensancha hacia la sala = derrame) a toda la altura de la losa,
     más el umbral que cierra el suelo del vano. Sin dintel (ver arriba). */
  const G = BCCH_V3.gap;
  const S = BCCH_V3.splay;
  const openL = edgeL - G;
  const openR = edgeR + G;
  const [zB, zF] = BCCH_V3.slabZ;     // zB = cara hacia la sala · zF = cara vista
  const [yB, yT] = BCCH_V3.slabY;
  const X = BCCH_V3.slabX;
  const quad = (a, b, c, d) => {        // antihorario visto desde fuera del sólido
    const P = [a, b, c, d].map((p) => new THREE.Vector3(...p));
    const n = new THREE.Vector3().crossVectors(
      new THREE.Vector3().subVectors(P[1], P[0]),
      new THREE.Vector3().subVectors(P[2], P[0])
    ).normalize();
    staticTris.push(
      [mkVert(P[0].clone(), n.clone()), mkVert(P[1].clone(), n.clone()), mkVert(P[2].clone(), n.clone())],
      [mkVert(P[0].clone(), n.clone()), mkVert(P[2].clone(), n.clone()), mkVert(P[3].clone(), n.clone())]
    );
  };
  /* Ala: planta A(front-ext) B(front-int) C(back-int) D(back-ext). */
  const wing = (side) => {
    const xo = side * X;                                  // extremo exterior
    const xf = side < 0 ? openL : openR;                  // canto del vano en la cara vista
    const xb = xf + side * S;                             // canto del vano en la cara de la sala (derrame)
    const A = [xo, zF], B = [xf, zF], C = [xb, zB], D = [xo, zB];
    const face = (p, q) => (side < 0
      ? quad([p[0], yB, p[1]], [q[0], yB, q[1]], [q[0], yT, q[1]], [p[0], yT, p[1]])
      : quad([q[0], yB, q[1]], [p[0], yB, p[1]], [p[0], yT, p[1]], [q[0], yT, q[1]]));
    face(A, B);   // cara vista
    face(B, C);   // jamba con derrame
    face(C, D);   // cara hacia la sala
    face(D, A);   // testero exterior
    /* Tapa (se ve desde arriba con la inclinación del hero) y base. */
    if (side < 0) {
      quad([A[0], yT, A[1]], [B[0], yT, B[1]], [C[0], yT, C[1]], [D[0], yT, D[1]]);
      quad([D[0], yB, D[1]], [C[0], yB, C[1]], [B[0], yB, B[1]], [A[0], yB, A[1]]);
    } else {
      quad([B[0], yT, B[1]], [A[0], yT, A[1]], [D[0], yT, D[1]], [C[0], yT, C[1]]);
      quad([C[0], yB, C[1]], [D[0], yB, D[1]], [A[0], yB, A[1]], [B[0], yB, B[1]]);
    }
  };
  wing(-1);
  wing(+1);
  /* Umbral: suelo del vano, entre las jambas. */
  quad([openL - S, yB, zB], [openR + S, yB, zB], [openR, yB, zF], [openL, yB, zF]);

  /* Color y máscara por vértice, ya en coordenadas definitivas. */
  for (const tri of staticTris) for (const v of tri) v.mask = bcchColorAt(v.p, false, v.c);
  for (const tris of [leftTris, rightTris]) for (const tri of tris) for (const v of tri) v.mask = bcchColorAt(v.p, true, v.c);

  for (const tri of medalTris) for (const v of tri) v.mask = bcchColorAt(v.p, true, v.c);

  const staticMesh = makeBcchMesh(buildGeometryFromTriangles(staticTris), 'Puerta_bcch_frame', 'frame');
  const leftMesh = makeBcchMesh(buildGeometryFromTriangles(leftTris, hingeL, hingeZ), 'Puerta_bcch_left_leaf', 'leaf');
  const rightMesh = makeBcchMesh(buildGeometryFromTriangles(rightTris, hingeR, hingeZ), 'Puerta_bcch_right_leaf', 'leaf');
  /* Medallas: malla propia, estática (no gira con las hojas) y con el
     acabado de bronce de las hojas ('medal' hereda el material de 'leaf'
     salvo el fundido: se quedan en la pared cuando las hojas se disuelven). */
  const medalMesh = makeBcchMesh(buildGeometryFromTriangles(medalTris), 'Puerta_bcch_medals', 'medal');
  if (staticMesh) group.add(staticMesh);
  if (medalMesh) group.add(medalMesh);
  if (leftMesh) pivotL.add(leftMesh);
  if (rightMesh) pivotR.add(rightMesh);
  group.add(pivotL, pivotR);
  bcchPivotL = pivotL;
  bcchPivotR = pivotR;
  group.userData.bcchDoor = { hingeL, hingeR, hingeZ, edgeL, edgeR, leafTop, openL, openR, shifts };
  return group;
}

loader.load('Puerta_bcch_v3.glb?v=16', (gltf) => {
  const rawBox = new THREE.Box3().setFromObject(gltf.scene);
  const rawCenter = rawBox.getCenter(new THREE.Vector3());
  const model = buildOpenableBcchDoor(gltf.scene, rawCenter);
  model.visible = false;
  bcchDoorModel = model;
  fitDoorModelToStage(model);
  doorModelGroup.add(model);
}, undefined, (err) => {
  console.warn('No se pudo cargar Puerta_bcch_v3.glb; se usa la puerta procedural:', err);
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
/* Táctil: `pointerdown` llega en cuanto el dedo toca la pantalla, antes de
   saber si va a desplazar la página o a tocar una partícula. Elegir la cita
   ahí abría (y fijaba) el panel cada vez que un desplazamiento arrancaba
   sobre la nube, y cerraba el panel fijado al empezar a leerlo. La decisión
   se toma en `pointerup`: si el navegador convirtió el gesto en scroll llega
   `pointercancel` y no pasa nada; si el dedo soltó cerca de donde tocó
   (< 10 px) y rápido, es un toque. El ratón conserva el comportamiento
   inmediato de siempre. */
let pendingTap = null;
window.addEventListener('pointerdown', (e) => {
  /* No robar el click de tarjetas, botones, links ni del panel abierto. */
  if (isInteractiveTarget(e)) return;
  if (e.pointerType === 'touch') {
    pendingTap = { id: e.pointerId, x: e.clientX, y: e.clientY, at: performance.now() };
    return;
  }
  onPointerDown(e.clientX, e.clientY, e);
});
window.addEventListener('pointerup', (e) => {
  if (pendingTap && e.pointerType === 'touch' && e.pointerId === pendingTap.id) {
    const dx = e.clientX - pendingTap.x, dy = e.clientY - pendingTap.y;
    const isTap = (dx * dx + dy * dy) < 100 && (performance.now() - pendingTap.at) < 600;
    pendingTap = null;
    if (isTap && !isInteractiveTarget(e)) onPointerDown(e.clientX, e.clientY, e);
  }
  onPointerUp();
});
window.addEventListener('pointercancel', () => { pendingTap = null; onPointerUp(); });
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

/* CUÁNTAS PARTÍCULAS
   Hasta el cierre, una por cita (el 1:1 que sostiene la pieza: cada punto es
   un fragmento). Pero con 99 puntos no se dibuja una fachada — se ve ruido.
   El cierre necesita densidad, así que la nube se REPITE: cada partícula
   sigue apuntando a una cita real vía `quotes[i % QUOTES_N]`, de modo que
   ninguna es decorativa; hay 99 fragmentos representados varias veces.

   Se escala con el ancho: 7000 puntos sobre 390px es más densidad por píxel
   de la que el ojo distingue, y el coste no se regala. Medido: el bucle de
   animate() cuesta 0,25 ms/frame a 7000 (1,5% del presupuesto de 60fps). */
const FACADE_TARGET = (() => {
  const w = getViewportSize().width;
  /* Subido respecto de los 2 600/4 200/7 000 iniciales: aquellos se calcularon
     para la puerta procedural, que era casi cuadrada. La fachada real mide
     37 x 22 m —cuatro veces más superficie— y con 7 000 puntos se veía como
     una gasa, no como un edificio. Esto ya no encarece las demás escenas:
     dibujan 99 vía setDrawRange.

     El tramo intermedio (700–1200 px) bajaba a 10 000 y era justo el ancho de
     un portátil normal: la fachada llegaba deshilachada al tamaño de pantalla
     más común, con las pilastras convertidas en polvo suelto. Los 6 000 puntos
     que faltaban no compraban rendimiento —el coste real del arranque estaba
     en otra parte, ver el commit de optimización— y sí costaban el edificio.
     Ahora todo lo que no sea móvil dibuja la nube completa.

     Subido de nuevo a 60 000 al acercar el encuadre: con la cámara encima del
     edificio los puntos se reparten sobre mucha más pantalla, y con 16 000 la
     arquitectura se deshacía en polvo. La nube horneada trae exactamente esa
     cantidad, ya recortada a la zona visible. */
  if (w < 700) return 26000;
  return 60000;
})();
const PCOUNT = Math.max(QUOTES_N, FACADE_TARGET) || 1;
/* Índice de la cita que representa cada partícula. Con repetición, la
   partícula 3500 es el mismo fragmento que la 3500 % 99. Todo lo que
   resuelva "qué cita es esta partícula" DEBE pasar por aquí. */
const quoteOf = (i) => quotes[QUOTES_N ? i % QUOTES_N : 0];
const pPos = new Float32Array(PCOUNT * 3);
/* Corte antes del sistema de partículas: reservar los ocho Float32Array,
   muestrear la nube de la fachada y calcular los targets narrativos es el
   siguiente bloque grande. */
await breathe();
const pOriginalPos = new Float32Array(PCOUNT * 3);
const pScatterPos = new Float32Array(PCOUNT * 3);
/* Targets narrativos: una misma partícula puede pasar de memoria a plano,
   voz, acta o timeline sin crear otra geometría. Todos se rellenan después
   de construir las escalas D3. */
const pAxisPos = new Float32Array(PCOUNT * 3);
const pVoiceFocusPos = new Float32Array(PCOUNT * 3);
const pActFocusPos = new Float32Array(PCOUNT * 3);
const pTimelinePos = new Float32Array(PCOUNT * 3);
const pFacadePos = new Float32Array(PCOUNT * 3);
/* NUBE DE LA FACHADA (cierre)
   Se muestrea el modelo YA construido, centrado y escalado: el muestreo
   trabaja en coordenadas de mundo, y hacerlo antes daría una nube desplazada
   respecto a lo que se ve. Va aquí y no junto a la construcción de la puerta
   porque pFacadePos se declara en este bloque; allí arriba estaría en zona
   muerta temporal.

   El generador es determinista (particleRandom con semilla fija) para que la
   fachada sea idéntica en cada carga: con Math.random el edificio cambiaría
   de forma entre recargas y las capturas de regresión no valdrían nada. */
let facadeCloudReady = false;
/* Rango de profundidad de la nube, para el sombreado aéreo del cierre. */
let facadeZMin = 0, facadeZMax = 1;
/* Material del edificio que le toca a cada partícula en el cierre. */
const pFacadeMat = new Uint8Array(PCOUNT);

/* LA FACHADA DEL CIERRE SE CARGA HORNEADA
   La fuente es Puerta_particulas/entrada_v3.glb: la entrada de Agustinas 1180
   como geometría paramétrica en metros reales —37 m de ancho por 22 m de alto,
   114 372 triángulos, con faroles, ventanas, capiteles y la inscripción en
   relieve—. Ese GLB pesa 3,5 MB y NO se sirve nunca: de todo ese detalle la
   escena solo necesita unos miles de puntos.

   El muestreo se hace una vez, fuera de línea (tools/bake-facade-cloud.mjs), y
   aquí solo llega el resultado: 9 000 posiciones cuantizadas a 16 bits, 53 KB.
   Antes esto se muestreaba en el navegador desde la puerta procedural, que era
   gratis en bytes pero solo tenía el portal —ni fachada completa, ni faroles.

   La carga es asíncrona y no bloquea nada: hasta que llega, `facadeCloudReady`
   es false y el cierre simplemente no arma el edificio. Como está al final del
   documento, hay minutos de margen. */
fetch('data/facade-cloud.bin?v=2')
  .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(`HTTP ${r.status}`))))
  .then((buf) => {
    const head = new DataView(buf, 0, 44);
    if (String.fromCharCode(head.getUint8(0), head.getUint8(1), head.getUint8(2), head.getUint8(3)) !== 'FCLD') {
      throw new Error('cabecera desconocida');
    }
    const n = head.getUint32(8, true);
    const origin = [head.getFloat32(12, true), head.getFloat32(16, true), head.getFloat32(20, true)];
    const span = [head.getFloat32(24, true), head.getFloat32(28, true), head.getFloat32(32, true)];
    const q = new Uint16Array(buf, 44, n * 3);
    /* Un byte por punto con el material de la pieza de la que salió (ver
       "MATERIAL POR PIEZA" en tools/bake-facade-cloud.mjs). Es lo que permite
       que el edificio no sea todo del mismo gris. */
    const srcMats = new Uint8Array(buf, 44 + n * 6, n);

    /* Descuantizar a metros y, de paso, medir la caja real. */
    const pts = new Float32Array(n * 3);
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (let i = 0; i < n * 3; i += 3) {
      const x = origin[0] + (q[i] / 65535) * span[0];
      const y = origin[1] + (q[i + 1] / 65535) * span[1];
      const z = origin[2] + (q[i + 2] / 65535) * span[2];
      pts[i] = x; pts[i + 1] = y; pts[i + 2] = z;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
      if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
    }

    /* ENCUADRE
       Los puntos vienen en metros del edificio real. La cámara del cierre está
       a ~6,9 unidades, así que volcarlos tal cual esparce la nube muy por fuera
       del viewport y lo que se ve es ruido. Se ajusta a una caja conocida.

       Se escala por el ANCHO y no por el alto: esta fachada mide 37 x 22 m, o
       sea que es mucho más ancha que alta, y ajustando por el alto se saldría
       de cuadro por los lados. (La puerta procedural anterior era casi
       cuadrada y por eso allí mandaba el alto.) */
    /* ENCUADRE DERIVADO DE LA CÁMARA, NO A OJO
       Antes esto eran números tanteados por rango de viewport y cada cambio de
       cámara los invalidaba: en vertical la fachada se salía por los lados
       porque 37 m de ancho no caben en una pantalla estrecha con la misma
       distancia que en un monitor.

       Se calcula cuánto mundo abarca la cámara a la distancia de la nube y se
       ocupa una fracción de eso. Así el encuadre se adapta solo a cualquier
       proporción de pantalla. */
    /* Distancia REAL de la cámara a la nube. Aquí había un 9,40 copiado de la
       parada `stageFacade`, pero esa parada nunca se aplica: `storyProgress`
       es constante 0 y la cámara se queda en la pose del hero, a z = 7,70. El
       encuadre se calculaba para una distancia inexistente. */
    const camZ = 7.70;
    const tanHalf = Math.tan((CONFIG.camera.fov * Math.PI) / 360);
    const worldH = 2 * tanHalf * camZ;
    const worldW = worldH * (window.innerWidth / window.innerHeight);
    /* Fracción del ancho visible que ocupa el edificio: "casi toda la
       pantalla" pero con aire a los lados. Sin ese margen la fachada llega a
       los bordes, se pierde la silueta y deja de leerse como un edificio
       recortado contra el cielo — se vuelve una textura que cubre el marco. */
    /* ESTAR DELANTE DEL EDIFICIO, NO MIRAR SU FOTO
       Antes ocupaba el 62 % del ancho: cabía entero, con aire a los lados, y
       por eso se leía como una maqueta sobre fondo negro. Un edificio de 37 m
       no se ve así desde la vereda: desborda el campo visual. Ahora ocupa algo
       más que la pantalla y se recorta a propósito. Lo que se pierde son los
       extremos del muro —repetición—; lo que se gana es la escala. */
    /* SILUETA CONTRA EL CIELO
       Al 102 % el edificio se salía por arriba y el muro se desvanecía en
       polvo sin rematar: la imagen no tenía contorno y el ojo no encontraba
       dónde terminaba el objeto. Un edificio nocturno se reconoce por su
       recorte contra el vacío antes que por su detalle.

       Se retrocede hasta que entra la cornisa. Se pierde algo de escala
       —seguimos por encima del 80 %, así que sigue imponiendo— y se gana el
       remate, que es lo que hace que esto se lea como arquitectura y no como
       una textura que cubre el marco. */
    const FACADE_FIT_W = worldW * (window.innerWidth < 700 ? 0.98 : 0.86);
    /* Se sube sobre el centro porque el scroll se detiene con la sección
       asomando por abajo (el pie ocupa la franja inferior) y porque el botón
       vive abajo. Proporcional al alto visible, por lo mismo que el ancho: un
       número fijo se rompe en cuanto cambia la cámara. */
    /* LA PUERTA A LA ALTURA DE LOS OJOS
       La nube se centra en el vano (ver `doorY`), así que basta con subirla al
       plano al que mira la cámara —camBaseY— para que la entrada quede en el
       eje óptico y las verticales salgan rectas en vez de en picado. El margen
       extra levanta el vano por encima del botón "volver al comienzo", que
       vive en la franja central-baja. */
    /* Con la cornisa dentro del cuadro, la nube baja: el aire va ARRIBA, sobre
       el remate, que es donde dibuja la silueta. */
    /* El edificio entra entero, así que la referencia deja de ser la puerta y
       pasa a ser el centro del volumen: lo que importa ahora es que la masa
       quede equilibrada en el cuadro, con aire arriba para la silueta. */
    const FACADE_FIT_Y = camBaseY + worldH * 0.20;
    /* AJUSTE POR ANCHO **Y** POR ALTO
       Escalar solo por el ancho venía de la fachada de 37 x 22 m, que era
       mucho más ancha que alta. Pero el recorte lateral la dejó casi cuadrada
       (23,5 x 22,15), así que el mismo cálculo la desbordaba por arriba y el
       remate quedaba fuera de cuadro: sin cornisa no hay silueta.

       Se toma el menor de los dos ajustes, que es lo que garantiza que el
       edificio entero quepa. FACADE_FIT_H deja algo de aire sobre la cornisa
       para que el contorno se recorte contra el negro en vez de tocar el
       borde. */
    const FACADE_FIT_H = worldH * (window.innerWidth < 700 ? 0.86 : 0.92);
    const fitScale = Math.min(
      FACADE_FIT_W / Math.max(0.001, maxX - minX),
      FACADE_FIT_H / Math.max(0.001, maxY - minY)
    );
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, cz = (minZ + maxZ) / 2;
    /* Las repeticiones: hay PCOUNT partículas y n puntos horneados, y no tienen
       por qué coincidir. `i % n` reparte de forma cíclica sin dejar huecos. */
    for (let i = 0; i < PCOUNT; i++) {
      const src = (i % n) * 3;
      const idx = i * 3;
      pFacadePos[idx]     = (pts[src] - cx) * fitScale;
      /* La Y se mide desde la PUERTA, no desde el centro del edificio. El
         centro geométrico cae a Y=10,9 m —media altura del muro, entre las
         ventanas del segundo piso— y encuadrar por ahí hundía la entrada en el
         borde inferior. La puerta está a Y=3,9 m. */
      pFacadePos[idx + 1] = (pts[src + 1] - cy) * fitScale + FACADE_FIT_Y;
      /* La Z se conserva a escala: la escalinata avanza hacia la cámara, las
         jambas se hunden y las pilastras despegan del muro. Es lo que hace que
         esto se lea como un edificio y no como un cartel. */
      pFacadePos[idx + 2] = (pts[src + 2] - cz) * fitScale;
    }
    /* El material se copia a un array por PARTÍCULA (no por punto horneado)
       para que el bucle de color no tenga que hacer el módulo en cada frame. */
    for (let i = 0; i < PCOUNT; i++) pFacadeMat[i] = srcMats[i % n];
    facadeZMin = (minZ - cz) * fitScale;
    facadeZMax = (maxZ - cz) * fitScale;
    facadeCloudReady = true;
  })
  .catch((err) => {
    /* Si falla, el cierre se queda sin edificio pero la pieza sigue entera: la
       nube mantiene su última formación y el texto y el botón no dependen de
       esto. Mejor eso que una pantalla rota. */
    console.warn('No se pudo cargar la nube de la fachada:', err.message);
  });

const pColors = new Float32Array(PCOUNT * 3);
const pParticipantRank = new Int16Array(PCOUNT);
const pParticipantCount = new Int16Array(PCOUNT);
const pActRank = new Int16Array(PCOUNT);
const pActCount = new Int16Array(PCOUNT);
/* Una entrada por PARTÍCULA, no por cita: con repetición el índice llega a
   PCOUNT y `pActKeys[3500]` sería undefined, rompiendo el resalte por acta. */
const pActKeys = Array.from({ length: PCOUNT }, (_, i) => {
  const q = QUOTES_N ? quotes[i % QUOTES_N] : null;
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
  const q = quoteOf(i);
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
  /* Canvas 2D deja RGB negro en los píxeles transparentes. Con
     NormalBlending eso puede producir pequeños halos negros sobre el fondo
     oscuro aunque la partícula sea dorada o azul. Hay que conservar RGB
     blanco en el borde y dejar que el alfa controle únicamente la intensidad.

     Cómo se hacía antes: fillRect(grad) → getImageData → un bucle sobre los
     16 384 píxeles poniendo RGB a 255 → putImageData. El getImageData fuerza
     una lectura SÍNCRONA del rasterizador, y medido con la sonda del arranque
     esta función sola se comía 2 037 ms — el 25,6 % del CPU de la carga, con
     la cortina todavía encima, o sea con la moneda congelada.

     El mismo resultado sin leer un solo píxel: se pinta blanco opaco y el
     degradado se aplica en `destination-in`, que conserva el color del
     destino y toma el alfa del origen. Mismos píxeles, cero readback.
     (Se descartó un DataTexture: en este three.js nace con NearestFilter y
     generateMipmaps=false —js/three.module.js:32315— y las partículas se
     verían dentadas.) */
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, 64, 64);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
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

/* CUÁNTAS PARTÍCULAS SE DIBUJAN
   La nube tiene PCOUNT (hasta 7 000) porque la fachada del cierre necesita esa
   densidad para dibujar molduras y contorno. Pero el RESTO de la pieza se
   diseñó con una partícula por fragmento —99— y ahí la relación 1:1 es el
   fondo del asunto: cada punto es una cita que se puede señalar y abrir.
   Dibujar 7 000 en todas las escenas convertía esa nube legible en niebla.

   La geometría se queda intacta y solo se recorta el RANGO que se dibuja: los
   índices [0, QUOTES_N) son exactamente las 99 citas reales (quoteOf(i) es la
   identidad en ese tramo), y las repeticiones viven de QUOTES_N en adelante.
   Así el cierre gana densidad sin que las demás escenas la paguen, y no hace
   falta ninguna geometría aparte. */
const BASE_DRAW = Math.max(QUOTES_N, 1);
pGeo.setDrawRange(0, BASE_DRAW);
let drawRangeNow = BASE_DRAW;

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
      peekQuote(p.quoteIndex);
      syncQuotePanel();
    });
    /* Activar = "fijar": abre la cita y lleva el foco al panel para leerla;
       al cerrarlo (✕ o Escape) el foco vuelve a este botón. */
    btn.addEventListener('click', () => {
      pinQuote(p.quoteIndex);
      focusReturn.card = btn;
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
    if (isPinned()) return;
    clearPeek();
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
  if (typeof particleFocus.index !== 'number' || particleFocus.index < 0) return -1;
  for (let i = 0; i < orbitParams.length; i++) {
    if (orbitParams[i].quoteIndex === particleFocus.index) return i;
  }
  return -1;
}

/* La fachada domina la escena: por encima de este mix el edificio ya está
   armado y las partículas se leen como arquitectura, no como fragmentos. Por
   debajo todavía se está formando y conviene que el hover siga vivo, porque la
   nube aún es la nube del relato. */
const facadeInteractionMuted = () => particleStoryMix.facade > 0.5;

const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
const _pickProjected = new THREE.Vector3();

/* El threshold de THREE.Points se interpreta en unidades de mundo y no se
   ajusta solo al tamaño de la partícula. Se fija aquí en cada consulta,
   escalado con swarm.scale (igual que el tamaño visual del enjambre).
   Ver https://github.com/mrdoob/three.js/issues/26235 y
   https://discourse.threejs.org/t/hover-functionality-with-three-points-and-raycaster/53978 */
function setPickThreshold(radiusMul = 1) {
  const base = CONFIG.interaction?.hoverRadius ?? 0.075;
  const s = swarm.scale?.x || 1;
  raycaster.params.Points.threshold = base * s * radiusMul;
}

/* `radiusMul` ensancha el área de acierto: un dedo cubre bastante más que
   los ~15 px del cursor, así que el toque usa un radio mayor y la partícula
   más cercana al punto de contacto se lleva el acierto. */
function pickPoint(cx, cy, radiusMul = 1) {
  if (!QUOTES_N) return -1;
  const vp = getViewportSize();
  setPickThreshold(radiusMul);
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
   Se quitó el motor de tonos y el botón de sonido. Si más adelante se
   quiere retomar, `docs/PLAN_NIVEL_PREMIUM.md` (§1.D) documenta cómo
   hacerlo sin música clásica.
═══════════════════════════════════════════════════════════ */

function openQuote(i, anchor) {
  /* `i` puede venir del raycast sobre la nube, que con repetición llega hasta
     PCOUNT (miles) y no hasta QUOTES_N. Sin quoteOf, la fachada abriría
     `quotes[3500]` === undefined y el panel saldría vacío. */
  const q = quoteOf(i);
  if (!q) return;
  particleFocus.index = i;
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
  if (focusReturn.card && document.activeElement === focusReturn.card) {
    document.getElementById('quotePanelClose').focus({ preventScroll: true });
  }
}

let hoveredPoint = false;
let lastHoverAt = 0;
let hoverTimer = null;

function syncQuotePanel() {
  const idx = activeQuoteIndex();
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
  /* EN LA FACHADA NO HAY HOVER
     Durante todo el relato una partícula ES una cita, y pasar el cursor por
     encima para asomarla es el gesto central de la pieza. En la escena final
     esa lectura ya no se sostiene: las partículas dejan de representar
     fragmentos y pasan a ser el material con el que está dibujado el edificio.
     Con 16 000 puntos apretados, mover el ratón abría citas sin relación con
     nada —el lector no está señalando una intervención, está mirando una
     puerta— y el panel tapaba la escena que la sección existe para mostrar.

     El clic se conserva: quien quiera sacar una cita del edificio puede, pero
     es una decisión suya y no un accidente del cursor. */
  if (facadeInteractionMuted()) {
    if (hoveredPoint) { hoveredPoint = false; document.body.style.cursor = ''; }
    return;
  }
  const hitIdx = pickPoint(cx, cy);
  const hasHit = hitIdx >= 0;
  if (hasHit !== hoveredPoint) {
    hoveredPoint = hasHit;
    document.body.style.cursor = hasHit ? 'pointer' : (currentStage === 1 ? 'grab' : '');
  }
  if (isPinned()) return;                     // panel fijado: el hover no lo toca
  if (hasHit) {
    if (pointerOverPanel(cx, cy)) return; // leyendo el panel: no lo cerremos
    if (hitIdx === selection.hover && selection.hover >= 0) return;
    if (hoverTimer) clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      peekQuote(hitIdx);
      syncQuotePanel();
    }, CONFIG.interaction?.hoverDelayMs ?? 90);
  } else if (selection.hover >= 0) {
    clearPeek();
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
onPointerDown = function(cx, cy, e) {
  const hit = pickPoint(cx, cy, e?.pointerType === 'touch' ? (CONFIG.interaction?.touchRadiusMul ?? 2.2) : 1);
  if (hit >= 0) {
    pinQuote(hit);            // click sobre una partícula fija el panel (✕/Escape lo cierra)
    openQuote(hit);
    return;
  }
  /* click en el fondo cierra el panel fijado (mismo gesto que en tarjetas) */
  if (isPinned()) closeQuotePanel();
  origOnPointerDown(cx, cy);
};

let scatterProgress = 0;
const storyProgress = 0;   // 0→1 a lo largo de todo el documento (para la coreografía)
let coinFade = 1;
let doorFade = HERO_DOOR_LOCKUP ? 1 : 0;
let doorTarget = HERO_DOOR_LOCKUP ? 1 : 0;

/* Máquina de estados visual: ScrollTrigger escribe los objetivos y el loop
   único de GSAP interpola. Así la nube puede volver atrás sin saltos y una
   sola geometría representa memoria, plano, voz, acta y timeline. */
const particleStoryKeys = ['axes', 'voices', 'acts', 'timeline', 'quotes', 'facade'];
const particleStoryTarget = { axes: 0, voices: 0, acts: 0, timeline: 0, quotes: 0, facade: 0 };
const particleStoryMix = { axes: 0, voices: 0, acts: 0, timeline: 0, quotes: 0, facade: 0 };
let selectedActDate = null;
let actFocusMix = 0;
/* Huella del último estado de color: ver "SALTAR EL BUCLE DE COLOR" en animate(). */
let lastColorState = '';
/* La nube dejó de moverse de forma apreciable: ver "¿SE PUEDE DEJAR DE MOVER
   LA NUBE?" en animate(). */
let particlesSettled = false;
/* Sección de la FACHADA (no la del texto), cacheada: el edificio se gobierna
   leyendo su posición en pantalla desde animate(). Ver "LA FACHADA". */
const closingSectionEl = document.querySelector('#stageFacade');
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
/* Salida de La Sala hacia El Método. Importante: NO invierte `crossT` ni
   reabre la puerta en sentido contrario; solo disuelve sala/puerta y devuelve
   la cámara a la coreografía general para que los overlays posteriores queden
   alineados. */
let exitT = 0;
/* Foco editorial de Las voces: la selección atenúa las intervenciones de
   otras voces sin borrar su huella. Así el directorio conecta la lectura
   nominal con la misma nube que el lector acaba de explorar. */
let voiceFocusMix = 0;
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
  { id: 'stageClosing',       pos: [0.00, 0.30, 9.40], look: [0.00, 0.30, 0.00] },   // el texto del cierre: la nube queda de fondo, dispersa
  { id: 'stageFacade',        pos: [0.00, 0.30, 9.40], look: [0.00, 0.30, 0.00] },
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
/* Reutilizado por el tope de tamaño del lockup (proyección del centro de la
   puerta a píxeles); evitar allocations por frame. */
const _doorFitV = new THREE.Vector3();

/* "Las voces" vive en js/sections/voice-explorer.js.
   La llamada se queda AQUÍ, en el mismo punto de la ejecución que antes: el
   orden en que se crean los ScrollTrigger es parte del contrato. */
initVoiceExplorer({ quotes, openQuote, closeQuotePanel });


function animate() {
  const time = clock.getElapsedTime();
  /* crossT es SOLO la entrada por la puerta. `exitT` ya no invierte esa
     animación: al pasar de La Sala a El Método la sala se disuelve y la cámara
     vuelve a la coreografía general sin mostrar un regreso por el umbral. */
  const roomExitT = THREE.MathUtils.smoothstep(exitT, 0, 1);
  const crossEff = crossT;
  const roomPresence = crossT * (1 - roomExitT);
  /* Apertura física de las hojas (pivotes en las bisagras, como el Blender):
     cerrada en portada, abre al cruzar el umbral y vuelve a cerrar al volver. */
  /* La fachada ya no se gobierna aquí: su fundido de entrada (Acto 2) vive
     junto al fade de la puerta, donde ya está calculado doorVisOpacity. */
  if (doorInteriorMeshes.length) {
    /* El vestíbulo enmarca el umbral mientras se abre; una vez que la cámara
       lo cruza se retira para no interponerse entre ella y La Sala. */
    const interiorOn = crossT < 0.55;
    for (let i = 0; i < doorInteriorMeshes.length; i++) doorInteriorMeshes[i].visible = interiorOn;
  }
  if (doorPivotL && doorPivotR) {
    /* Respaldo procedural: queda oculto cuando el GLB BCCH está disponible. */
    const openT = THREE.MathUtils.smoothstep(crossT, 0.14, 0.72);
    const openRad = THREE.MathUtils.degToRad(85) * openT;
    doorPivotL.rotation.z = openRad * (doorPivotL.userData.openSign || 1);
    doorPivotR.rotation.z = openRad * (doorPivotR.userData.openSign || -1);
  }
  if (bcchPivotL && bcchPivotR) {
    /* El GLB subido por el usuario no traía pivotes, así que lo partimos en
       marco + hoja izquierda + hoja derecha y abrimos SUS propias hojas.
       La apertura arranca ANTES y termina ANTES que el dolly: si abría
       lento (0.10→0.66) la puerta seguía casi cerrada al inicio y tapaba a
       La Sala justo cuando el lector esperaba verla. */
    const openT = THREE.MathUtils.smoothstep(crossT, 0.04, 0.42);
    const openRad = THREE.MathUtils.degToRad(78) * openT;
    bcchPivotL.rotation.y = openRad;
    bcchPivotR.rotation.y = -openRad;
  }
  if (doorGlowMat) {
    /* Destello breve de umbral, no pared. El plano cálido se enciende apenas
       se abre la puerta y se apaga antes de que la estatua quede encuadrada;
       así no aparece la “figura” color piel que tapaba la entrada. */
    const glowIn = THREE.MathUtils.smoothstep(crossT, 0.02, 0.22);
    const glowOut = 1 - THREE.MathUtils.smoothstep(crossT, 0.32, 0.52);
    const glowT = glowIn * glowOut;
    doorGlowMat.opacity = 0.10 * glowT;
    doorGlowMat.emissiveIntensity = 0.03 + 0.42 * glowT;
  }
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
    /* Snapshot, no lectura viva: leer clientWidth aquí dentro fuerza un
       reflujo cada frame (ver js/viewport.js). */
    const vp = getViewportSnapshot();
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
    /* La puerta procedural YA no se disuelve al cruzar: las hojas se abren
       (ver apertura por pivotes más abajo) y el interior cálido asoma. */
    const dissolve = 0;
    /* Al salir hacia El Método, ocultar el pórtico inmediatamente: la cámara
       puede reencuadrar la escena, pero el lector no ve una vuelta por la
       misma puerta que acaba de cruzar. */
    const postRoomDoorHide = DOOR_MODE === 'doorway'
      ? THREE.MathUtils.smoothstep(exitT, 0.00, 0.18)
      : 0;
    doorVisOpacity = doorFade * (1 - dissolve) * (1 - postRoomDoorHide);
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
    /* TOPE DE PORTADA: el pórtico completo (≈9,75 m de alto) no cabe en un
       viewport bajo con el factor del lockup, y se recortaba arriba mientras
       la escalinata caía sobre el titular. Se proyecta la figura y se encoge
       SOLO durante el lockup (lockupMix) para que quepa entre el borde
       superior y el tope del titular (band.bottom, en px, cacheado). */
    if (HERO_DOOR_LOCKUP && lockupMix > 0.001 && doorModel && doorLocalHeight > 0) {
      const vpFit = getViewportSnapshot();
      const worldH = doorLocalHeight * doorModelGroup.scale.y * doorGroup.scale.y;
      const dist = Math.max(camera.position.distanceTo(doorGroup.position), 0.1);
      const screenH = (worldH * vpFit.height) /
        (2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)));
      _doorFitV.copy(doorGroup.position).project(camera);
      const cyPx = (-_doorFitV.y * 0.5 + 0.5) * vpFit.height;
      const maxScreenH = 2 * Math.max(80, Math.min(
        cyPx - vpFit.height * 0.02,
        (heroCoinFrame?.band?.bottom ?? vpFit.height * 0.72) - cyPx
      ));
      if (screenH > maxScreenH) {
        doorGroup.scale.multiplyScalar(1 - lockupMix * (1 - maxScreenH / screenH));
      }
    }
    /* La puerta se APOYA, no flota: el pivote (centro de las hojas) se pone
       donde haga falta para que la base de los escalones quede en groundY.
       Anclar el pivote (el `baseY` anterior) hacía que al cambiar el tamaño la
       puerta subiera o bajara sola y se despegara de su propia sombra. */
    const doorBottomWorld = doorModel ? doorBottomOffset * doorModelGroup.scale.y * doorGroup.scale.x : 0;
    const plantedY = (CONFIG.door.groundY ?? 0) - doorBottomWorld;
    doorGroup.rotation.x = -0.12 * lockupMix + smoothMouseY * -0.03 * doorEase * doorMouse;
    doorGroup.position.y = THREE.MathUtils.lerp(plantedY, CONFIG.coin.baseY, lockupMix) + smoothMouseY * -0.06 * doorEase * doorMouse;
    const bcchVisualT = bcchDoorModel ? 1 : 0;
    const proceduralVisualT = bcchDoorModel ? 0 : 1;
    const bcchColorT = THREE.MathUtils.smoothstep(scatterProgress, 0.18, 0.88);
    if (bcchDoorModel) bcchDoorModel.visible = doorVisOpacity > 0.001;
    if (proceduralDoorModel) proceduralDoorModel.visible = doorVisOpacity > 0.001 && proceduralVisualT > 0.001;
    /* Las piezas 'aperture' son las JAMBAS del marco (|x|≈0.40–0.48, z 0.0–0.2),
       NO un tapón central: desvanecerlas "deformaba" el marco al abrir la
       puerta (perdía el canto interior). Se mantienen sólidas; La Sala se
       despeja con la apertura + el fundido de las hojas (leafHold, abajo). */
    const apertureHold = 1;
    /* Al terminar el dolly la cámara queda DE PIE sobre el peldaño superior
       (roomCamZ −0.5 está ~0,5 delante del muro, que cae en z≈−1.0): la cara
       alta de ese peldaño, encendida por la luz cálida de la sala, asomaba
       como una franja beige al pie del cuadro durante toda La Sala. Desde
       crossT≈0.86 (cámara en el plano del umbral) jambas, medallas y cornisa
       ya están fuera de cuadro, así que el pórtico entero —marco, escalones,
       medallas y aristas— se disuelve ahí, mientras la cámara todavía avanza
       (el movimiento tapa el fundido). Simétrico al volver atrás. */
    const porticoHold = 1 - THREE.MathUtils.smoothstep(crossT, 0.86, 0.96);
    for (let i = 0; i < bcchDoorMats.length; i++) {
      const m = bcchDoorMats[i];
      const kind = m.userData?.bcchKind || 'frame';
      const isLeaf = kind === 'leaf';
      /* 'medal' = discos de bronce fijos en la piedra: acabado de hoja
         (bronce), fundido de marco (se quedan en la pared al cruzar). */
      const isBronze = isLeaf || kind === 'medal';
      const isAperture = kind === 'aperture';
      const lightT = THREE.MathUtils.smoothstep(bcchColorT, 0.10, 1.0);
      /* Las hojas abren hacia DENTRO (z→−): al terminar quedan dentro de la
         sala, frente a la cámara que ya entró. Se funden justo después de
         abrir para que no se vean al final del cruce. */
      const leafHold = isLeaf ? 1 - THREE.MathUtils.smoothstep(crossT, 0.55, 0.75) : 1;
      const hold = isLeaf ? leafHold : (isAperture ? apertureHold : 1) * porticoHold;
      m.transparent = true;
      m.opacity = doorVisOpacity * bcchVisualT * hold;
      m.color.copy(bcchHeroTint).lerp(bcchMeetTint, bcchColorT);
      m.envMapIntensity = isBronze
        ? THREE.MathUtils.lerp(0.22, 0.58, lightT)
        : THREE.MathUtils.lerp(0.10, 0.24, lightT);
      if (m.emissive) {
        m.emissive.copy(isBronze ? bcchLeafGlow : bcchFrameGlow);
        m.emissiveIntensity = (isBronze ? 0.006 : 0.0015) * lightT;
      }
    }
    for (let i = 0; i < bcchEdgeMats.length; i++) {
      const rec = bcchEdgeMats[i];
      const edgeHold = rec.kind === 'leaf'
        ? (1 - THREE.MathUtils.smoothstep(crossT, 0.55, 0.75))
        : (rec.kind === 'aperture' ? apertureHold : 1) * porticoHold;
      rec.m.opacity = rec.baseOpacity * doorVisOpacity * bcchVisualT * edgeHold * (0.55 + 0.45 * bcchColorT);
    }
    for (let i = 0; i < proceduralDoorMats.length; i++) {
      proceduralDoorMats[i].transparent = true;
      proceduralDoorMats[i].opacity = doorVisOpacity * proceduralVisualT;
    }
    for (let i = 0; i < doorLeafLineMats.length; i++) {
      doorLeafLineMats[i].opacity = 0.42 * doorVisOpacity * proceduralVisualT;
    }
    for (let i = 0; i < doorFrameLineMats.length; i++) {
      doorFrameLineMats[i].m.opacity = doorFrameLineMats[i].baseOpacity * doorVisOpacity * proceduralVisualT;
    }
    /* La fachada ya no se funde aparte: es parte de la figura en portada y
       en el Acto 2, y su opacidad la lleva doorMats como el resto. */
    if (HERO_DOOR_LOCKUP && doorLeafMats.length) {
      const leafT = THREE.MathUtils.smoothstep(scatterProgress, 0.28, 0.9);
      /* El oro espejado llega con el CRUCE, como en la versión anterior del
         sitio: durante el Acto 2 las hojas son bronce oscuro (el acabado del
         generador / del GLB de referencia), no un dorado plano a full. */
      const crossGold = THREE.MathUtils.smoothstep(crossT, 0.10, 0.60);
      for (let i = 0; i < doorLeafMats.length; i++) {
        const rec = doorLeafMats[i];
        const m = rec.m;
        const LF = CONFIG.door.leaf;
        /* Fondo, ranuras y ornamentos por SEPARADO: si todo comparte dorado,
           los relieves desaparecen. Base = bronce viejo, dark = incisiones,
           orn = oro usado solo en molduras/rosetas/perlas. */
        const isOrn = rec.tone === 'orn';
        const isDark = rec.tone === 'dark';
        const meet = isOrn ? LF.meetOrn : (isDark ? (LF.meetDark || LF.meet) : LF.meet);
        const cross = isOrn ? LF.crossOrn : (isDark ? (LF.crossDark || LF.cross) : LF.cross);
        const meetColor = isOrn ? doorLeafOrnBronze : (isDark ? doorLeafDarkBronze : doorLeafBaseBronze);
        const crossColor = isOrn ? doorLeafOrnGold : (isDark ? doorLeafDarkGold : doorLeafBaseGold);
        m.color.copy(doorLeafColorVoid)
          .lerp(meetColor, leafT)
          .lerp(crossColor, crossGold);
        m.metalness = THREE.MathUtils.lerp(
          THREE.MathUtils.lerp(LF.hero.metalness, meet.metalness, leafT), cross.metalness, crossGold);
        m.roughness = THREE.MathUtils.lerp(
          THREE.MathUtils.lerp(LF.hero.roughness, meet.roughness, leafT), cross.roughness, crossGold);
        m.envMapIntensity = THREE.MathUtils.lerp(
          THREE.MathUtils.lerp(LF.hero.envMapIntensity, meet.envMapIntensity, leafT), cross.envMapIntensity, crossGold);
      }
      /* Las hojas del modelo procedural permanecen visibles (cierran el
         vano en portada); el fundido noche→oro lo da el color, no el visible. */
      /* Piedra del pórtico por tonos: el muro se aclara hacia la referencia,
         pero las juntas, acanaladuras y escalones conservan sombra propia. */
      for (let i = 0; i < doorFrameMats.length; i++) {
        const rec = doorFrameMats[i];
        const m = rec.m;
        const colors = doorFrameToneColors[rec.tone] || doorFrameToneColors.stone;
        m.color.copy(colors.hero).lerp(colors.meet, leafT);
        const FR = CONFIG.door.frameAnim;
        const darkMul = rec.tone === 'dark' ? 0.72 : (rec.tone === 'granite' ? 0.82 : 1);
        m.metalness = THREE.MathUtils.lerp(FR.hero.metalness, FR.meet.metalness, leafT) * darkMul;
        m.roughness = THREE.MathUtils.lerp(FR.hero.roughness, FR.meet.roughness, leafT);
        m.envMapIntensity = THREE.MathUtils.lerp(FR.hero.envMapIntensity, FR.meet.envMapIntensity, leafT) * darkMul;
        if (m.bumpScale != null) {
          const toneBump = rec.tone === 'dark' ? 0.55 : 1;
          m.bumpScale = THREE.MathUtils.lerp(FR.hero.bumpScale, FR.meet.bumpScale, leafT) * toneBump;
        }
        if (m.emissive) {
          m.emissive.setRGB(0, 0, 0);
          m.emissiveIntensity = 0;
        }
      }
      if (doorSpots[0]) {
        doorSpots[0].color.copy(doorSpotKeyHero).lerp(doorSpotKeyMeet, leafT);
        doorSpots[0].intensity = THREE.MathUtils.lerp(8.5, 13.5, leafT);
      }
      if (doorSpots[1]) {
        doorSpots[1].color.copy(doorSpotRimHero).lerp(doorSpotRimMeet, leafT);
        doorSpots[1].intensity = THREE.MathUtils.lerp(4.8, 7.5, leafT);
      }
      if (doorSpots[2]) {
        doorSpots[2].intensity = THREE.MathUtils.lerp(2.4, 4.2, leafT);
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
    if (doorAura && doorModel && doorFootprint) {
      const localCenterY = (doorBottomOffset + doorTopOffset) * 0.5 * doorModelGroup.scale.y;
      doorAura.position.set(0, localCenterY + 0.08, -0.34);
      doorAura.scale.set(
        doorFootprint.width * doorModelGroup.scale.x * 1.78,
        Math.max(doorLocalHeight * doorModelGroup.scale.y * 1.08, 1),
        1
      );
      const entryAuraOut = 1 - THREE.MathUtils.smoothstep(crossT, 0.12, 0.36);
      const stageAura = THREE.MathUtils.smoothstep(scatterProgress, 0.48, 0.92) * entryAuraOut;
      doorAuraMat.opacity = doorActive ? 0.18 * doorEase * stageAura : 0;
      doorAura.visible = doorAuraMat.opacity > 0.002;
    }
    if (doorActive) {
      _spotTarget.set(doorGroup.position.x, doorGroup.position.y, doorGroup.position.z);
      doorSpots.forEach((sp) => {
        sp.target.position.copy(_spotTarget);
        sp.target.updateMatrixWorld();
      });
    }
  }

  /* ── LA FACHADA ──────────────────────────────────────────────
     Esto NO usa un ScrollTrigger, y es a propósito. Se intentó con uno y
     falló de forma difícil de ver: el trigger se crea antes de que existan
     las secciones que se construyen por JS, así que memoriza los píxeles de
     un documento provisional —creía que el cierre empezaba en 16 803 cuando
     está en 21 132, más de 4 000 px de desfase—. El resultado era que la
     fachada se montaba encima del timeline y de las citas, llenándolas con
     7 000 partículas. Ni `invalidateOnRefresh`, ni un rango en funciones, ni
     llamar a `.refresh()` a mano lo arreglaron: medido, onUpdate llegó a
     dispararse UNA sola vez en todo el recorrido.

     Aquí se lee la posición real de la sección en cada frame. No hay nada
     memorizado que pueda quedar desfasado, y animate() corre siempre —también
     cuando el scroll está detenido al final del documento, que es justo donde
     el trigger dejaba de avisar. */
  if (closingSectionEl) {
    const r = closingSectionEl.getBoundingClientRect();
    /* 0 cuando el borde superior del cierre toca el borde inferior de la
       pantalla; 1 cuando llega arriba del todo. */
    const visible = THREE.MathUtils.clamp(1 - r.top / window.innerHeight, 0, 1);
    /* La rampa va de 0,25 a 0,85. Los dos extremos están medidos:
         · por debajo de 0,25 el cierre asoma apenas y el lector sigue en las
           citas; montar el edificio ahí le roba la escena a esa sección;
         · el techo es 0,85 y no 1 porque el cierre es la ÚLTIMA sección: su
           borde superior nunca llega arriba del todo y al final del documento
           `visible` vale 0,911. Con una rampa que exigiera 1, la fachada no
           terminaba de armarse nunca. */
    setParticleStoryTarget('facade', THREE.MathUtils.smoothstep((visible - 0.25) / 0.6, 0, 1));
  }

  /* enjambre: orbita y se dispersa por la pantalla al hacer scroll.
     En La Sala la nube se recoloca delante de la cámara y se comprime;
     de lo contrario el giro continuo la pasa detrás de la cámara en
     ciertos ángulos y la sección queda sin partículas. */
  const roomSwarmCfg = CONFIG.door?.roomSwarm ?? { x: 0, y: 0.55, z: -2.5, scale: 0.35 };
  const roomSwarmT = (DOOR_MODE === 'doorway' && roomPresence > 0)
    ? THREE.MathUtils.smoothstep((roomPresence - 0.25) / 0.5, 0, 1)
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
    particleStoryMix.acts * actFocusMix,
    /* La fachada tiene que quedarse QUIETA y de frente: el giro residual del
       enjambre la mostraba en escorzo, como un tablero inclinado, y las
       molduras dejaban de leerse. */
    particleStoryMix.facade
  );
  /* ÁNGULO FIJO DE LA FACHADA
     Escorzo de 14,9°. Se probaron seis ángulos con la nube ya centrada
     en el vano (-0,06 / +0,06 / +0,16 / -0,16 rad). Los positivos giran el
     edificio al lado contrario y aplastan la pilastra izquierda contra el
     muro; -0,06 deja la fachada casi plana y las columnas se confunden con el
     fondo. -0,16 despegaba los intercolumnios pero dejaba el edificio
     demasiado plano; -0,36 ya gira tanto que la fachada se lee de tres
     cuartos, el muro derecho se va en fuga y la puerta sale del eje. -0,26 es
     el punto donde el costado izquierdo da volumen, las jambas y las pilastras
     tienen relieve, y el vano sigue centrado. Con la
     nube centrada en el vano y la cámara a la altura de la puerta, aquel
     escorzo sacaba la entrada del eje y el edificio se leía torcido.

     Pero 0° exactos tampoco sirve —probado—: sin nada de ángulo las pilastras
     se proyectan sobre el muro y sobre las columnas de detrás, todo se solapa
     y la nube se lee como niebla. Este giro corto basta para despegar los
     planos conservando la puerta de cara, centrada y con los dos faroles
     simétricos. Es una pose fija, no una animación: no gira. */
  const FACADE_YAW = -0.26;
  swarm.rotation.y = THREE.MathUtils.lerp(
    baseSwirl * (1 - roomSwarmT) * (1 - storyLock) + roomSway,
    FACADE_YAW,
    particleStoryMix.facade
  );

  /* La Sala (b1): dentro de la sala la nube se tiñe de cálido (la "luz del
     interior"). Las partículas son unlit (PointsMaterial), así que la luz
     cálida se expresa teñiendo color; al salir, vuelve al tono base. */
  const roomWarm = (DOOR_MODE === 'doorway')
    ? THREE.MathUtils.smoothstep((roomPresence - 0.3) / 0.5, 0, 1)
    : 0;

  /* Al elegir una voz, el resto no desaparece: baja de intensidad para que
     la selección se pueda leer dentro del enjambre y la huella colectiva
     siga visible. El mismo tratamiento se usa para acta y cita, sin perder
     jamás las filas vecinas. */
  const focusName = voiceFocus.participant || voiceFocus.rendered;
  voiceFocusMix = THREE.MathUtils.lerp(voiceFocusMix, voiceFocus.participant ? 1 : 0, reduceMotion ? 1 : 0.08);
  actFocusMix = THREE.MathUtils.lerp(actFocusMix, selectedActDate ? 1 : 0, reduceMotion ? 1 : 0.08);
  if (!voiceFocus.participant && voiceFocusMix < 0.005) voiceFocus.rendered = null;
  const activeQuoteIndex = particleFocus.index >= 0 ? particleFocus.index : -1;
  const voiceStageMix = particleStoryMix.voices * voiceFocusMix;
  const actStageMix = particleStoryMix.acts * actFocusMix;
  const quoteStageMix = particleStoryMix.quotes;
  const cols = pGeo.attributes.color.array;
  const facadeShade = facadeCloudReady ? particleStoryMix.facade : 0;
  /* El punto se afina en el cierre: 0,14 está calibrado para 99 partículas
     sueltas, y con 16 000 formando un edificio los discos se solapan y tapan
     el texto. Se encoge a la mitad justo cuando la fachada aparece. */
  /* El punto se afina en el cierre, pero menos que antes: con el encuadre
     encima del edificio cada punto cubre menos superficie en metros, y
     afinarlo tanto dejaba ver el fondo entre medio hasta evaporar el muro. */
  pMat.size = THREE.MathUtils.lerp(0.14, 0.115, facadeShade);
  /* PROFUNDIDAD REAL SOLO EN LA FACHADA
     El resto de la pieza dibuja con `depthTest: false` a propósito: la nube
     narrativa es translúcida y se quiere ver entera, sin que unos fragmentos
     tapen a otros. Pero un EDIFICIO no funciona así — con el test apagado se
     veía el muro del fondo a través de las pilastras, y la escena se leía
     como una gasa en vez de como algo sólido.
     Se enciende cuando la fachada domina: entonces los puntos de delante
     ocultan a los de atrás y aparece el volumen. */
  const facadeSolid = facadeShade > 0.5;
  if (pMat.depthTest !== facadeSolid) {
    pMat.depthTest = facadeSolid;
    pMat.depthWrite = facadeSolid;
    pMat.needsUpdate = true;
  }

  /* SALTAR EL BUCLE DE COLOR CUANDO NADA CAMBIÓ
     Este bucle recorre las 7 000 partículas y hace ~15 operaciones por cada
     una, pero —a diferencia del bucle de posición— NO depende del tiempo: su
     resultado sale por entero de la selección activa (voz, acta, cita) y de
     los mixes narrativos. Mientras el lector no toca nada, calcula 7 000 veces
     exactamente los mismos colores que ya están en el buffer y los vuelve a
     subir a la GPU.

     Los mixes se interpolan, así que cambian durante unos frames tras cada
     interacción y luego se quedan quietos: comparar contra el estado anterior
     deja pasar la transición entera y corta solo cuando de verdad se estabilizó.

     Se comparan con `!==` sobre números y cadenas ya calculados; no se
     reconstruye ningún objeto por frame. */
  const colorState = `${focusName}|${selectedActDate}|${activeQuoteIndex}|${roomWarm.toFixed(4)}|${voiceStageMix.toFixed(4)}|${actStageMix.toFixed(4)}|${quoteStageMix.toFixed(4)}|${facadeShade.toFixed(4)}`;
  const colorsDirty = colorState !== lastColorState;
  lastColorState = colorState;

  for (let i = 0; colorsDirty && i < drawRangeNow; i++) {
    const idx = i * 3;
    const q = quoteOf(i);
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
    let outR = THREE.MathUtils.lerp(safeR, litR, visibleMix) * strength;
    let outG = THREE.MathUtils.lerp(safeG, litG, visibleMix) * strength;
    let outB = THREE.MathUtils.lerp(safeB, litB, visibleMix) * strength;
    /* PERSPECTIVA AÉREA (solo en el cierre)
       Una nube de puntos no tiene sombras ni oclusión: todos los puntos se
       dibujan con la misma intensidad y el ojo no tiene con qué ordenar lo
       que está delante de lo que está detrás — por eso la fachada se leía
       plana aunque la geometría sí tuviera volumen. Se atenúa por
       profundidad, que es lo que hace la atmósfera con un edificio real:
       la escalinata y las pilastras que avanzan quedan nítidas, el fondo del
       vano se apaga. Es lo que convierte el alzado en relieve. */
    if (facadeShade > 0) {
      const depth = THREE.MathUtils.clamp(
        (pFacadePos[idx + 2] - facadeZMin) / Math.max(0.001, facadeZMax - facadeZMin), 0, 1);
      /* La fachada nueva tiene cuatro veces más puntos que la puerta anterior
         y con el brillo de antes se convertía en una mancha blanca que se
         comía el texto del cierre. Se atenúa bastante más (hasta 0,80) y con
         raíz, que comprime la parte baja: los planos siguen ordenándose por
         profundidad pero el conjunto vuelve a ser un fondo, no el asunto. */
      /* Rango ampliado de 0,80..1,40 (1,75x) a 0,32..1,30 (4,1x). Aquel margen
         estrecho hacía que las columnas del fondo pesaran igual que las del
         frente y la escena se aplanaba pese al escorzo. En un edificio real de
         noche la caída entre el primer término y el fondo es de 4x o más: es
         la atmósfera lo que separa los planos, y es lo que distingue una foto
         de un render. */
      const dim = THREE.MathUtils.lerp(1, 0.32 + 0.98 * Math.sqrt(depth), facadeShade);
      outR *= dim; outG *= dim; outB *= dim;

      /* EL COLOR DEL EDIFICIO, NO EL DE LA CITA
         Fuera del cierre el color de una partícula dice si la intervención fue
         hawkish o dovish, y eso es el corazón de la pieza. Pero en la fachada
         las partículas ya no representan intervenciones: son el material con
         el que está dibujada una puerta. Mantener ahí la escala hawkish/dovish
         pintaba el edificio de un gris azulado uniforme y sin lectura.

         Se mezcla hacia el color de la PIEZA. La transición usa el mismo
         facadeShade que todo lo demás, así que el enjambre llega con sus
         colores del relato y el edificio se tiñe a medida que se arma. */
      /* VARIACIÓN POR PUNTO
         En Penderecki's Garden ninguna zona es de un color plano: el follaje
         tiene verdes, rosas y ocres mezclados punto a punto, y eso es lo que
         hace que la nube parezca materia y no un degradado. Un color por
         material lo dejaba todo demasiado limpio, con aspecto de render.

         `particleRandom(i, 7)` es determinista por índice, así que el grano no
         parpadea entre frames ni cambia entre recargas: es una propiedad de
         cada partícula, como su posición. */
      const grain = particleRandom(i, 7);
      const mat = pFacadeMat[i];
      /* La piedra estaba casi blanca (0,92/0,95/1,05) y competía con los
         acentos: muro, columnas y suelo pesaban lo mismo y no había jerarquía.
         Bajarla deja los medios abajo y reserva la luz para el bronce y el
         oro, que es de donde viene la sensación de material caro. */
      let mr = 0.56, mg = 0.59, mb = 0.68;          // 0 piedra: la masa, en penumbra
      if (mat === 1) { mr = 1.25; mg = 0.72; mb = 0.30; }   // 1 bronce, las hojas
      else if (mat === 2) { mr = 1.45; mg = 1.15; mb = 0.50; } // 2 oro, inscripción y faroles
      else if (mat === 3) { mr = 0.09; mg = 0.11; mb = 0.17; } // 3 vanos: muy oscuros o no leen como huecos
      else if (mat === 4) { mr = 0.40; mg = 0.44; mb = 0.55; } // 4 suelo: más frío y apagado; no debe anclar la vista abajo
      /* Los acentos y los vanos se aplican casi puros. Con una mezcla suave el
         bronce se perdía en la piedra y las ventanas dejaban de ser agujeros:
         el contraste entre lleno y hueco es lo que dibuja el edificio. */
      /* El grano hace dos cosas a la vez: cambia el brillo de cada punto
         (±22%) y lo desplaza un poco hacia el cálido o hacia el frío. Sin ese
         segundo desplazamiento la nube se ve gris sucia; con él aparecen los
         reflejos de bronce sobre la piedra que tiene un edificio de verdad. */
      const shade = 0.78 + grain * 0.44;
      const tint = (grain - 0.5) * 0.16;
      const matMix = facadeShade * (mat === 0 ? 0.85 : 1.0);
      outR = THREE.MathUtils.lerp(outR, mr * dim * shade * (1 + tint), matMix);
      outG = THREE.MathUtils.lerp(outG, mg * dim * shade, matMix);
      outB = THREE.MathUtils.lerp(outB, mb * dim * shade * (1 - tint), matMix);
    }
    cols[idx] = outR;
    cols[idx + 1] = outG;
    cols[idx + 2] = outB;
  }
  /* Solo se sube el buffer si algo cambió: marcar needsUpdate obliga a
     retransmitir 84 KB de colores a la GPU aunque sean idénticos. */
  if (colorsDirty) pGeo.attributes.color.needsUpdate = true;

  /* La misma nube cambia de gramática por acto. El plano y el timeline se
     alinean sin jitter; voz y acta solo convergen con la selección activa. */
  const positions = pGeo.attributes.position.array;
  const swarmScatter = THREE.MathUtils.lerp(scatterProgress, 0.06, roomSwarmT);
  const axesMix = particleTargetsReady ? particleStoryMix.axes : 0;
  const timelineMix = particleTargetsReady ? particleStoryMix.timeline : 0;
  const facadeMix = facadeCloudReady ? particleStoryMix.facade : 0;
  const particleEase = reduceMotion ? 1 : 0.16;
  const ambientLock = Math.max(axesMix, timelineMix, voiceStageMix, actStageMix, facadeMix);
  /* Si la nube quedó asentada en el frame anterior y el bloqueo sigue puesto,
     no hay nada que recalcular: el destino no cambió y las partículas ya están
     en él. Cualquier movimiento de scroll altera los mixes y esto vuelve a
     false solo. */
  const skipParticleLoop = particlesSettled && ambientLock > 0.999;
  let maxDelta2 = 0;

  /* RANGO DE DIBUJO SEGÚN LA ESCENA
     Solo el cierre necesita las 7 000: son las que dibujan la fachada. En el
     resto de la pieza se dibujan las 99 citas reales y nada más (ver
     "CUÁNTAS PARTÍCULAS SE DIBUJAN").

     El umbral es bajo (0,02) y no 0,5 a propósito: las repeticiones tienen que
     estar ya dibujándose ANTES de empezar a viajar hacia la fachada, o
     aparecerían de golpe a mitad de la transición. Entran cuando aún están
     confundidas con el enjambre y se separan de él a la vista. */
  const wantDraw = particleStoryMix.facade > 0.02 ? PCOUNT : BASE_DRAW;
  if (wantDraw !== drawRangeNow) {
    drawRangeNow = wantDraw;
    pGeo.setDrawRange(0, wantDraw);
    /* Al ampliar el rango, las partículas que entran arrastran la posición y
       el color del último frame en que se dibujaron. Se fuerza el recálculo de
       ambos buffers para que no aparezcan con un estado viejo. */
    particlesSettled = false;
    lastColorState = '';
  }
  for (let i = 0; !skipParticleLoop && i < drawRangeNow; i++) {
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
    const q = quoteOf(i);

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
    /* La fachada va la ÚLTIMA y por eso gana a las demás formaciones: en el
       cierre el edificio debe imponerse sobre plano, voz, acta y timeline. */
    if (facadeMix > 0) {
      targetX = THREE.MathUtils.lerp(targetX, pFacadePos[idx], facadeMix);
      targetY = THREE.MathUtils.lerp(targetY, pFacadePos[idx + 1], facadeMix);
      targetZ = THREE.MathUtils.lerp(targetZ, pFacadePos[idx + 2], facadeMix);
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

    const nx = THREE.MathUtils.lerp(positions[idx], targetX, particleEase);
    const ny = THREE.MathUtils.lerp(positions[idx + 1], targetY, particleEase);
    const nz = THREE.MathUtils.lerp(positions[idx + 2], targetZ, particleEase);
    /* Cuánto se movió la partícula que MÁS se movió en este frame. Sirve para
       saber si la nube ya llegó a su sitio (ver más abajo). */
    const dx = nx - positions[idx], dy = ny - positions[idx + 1], dz = nz - positions[idx + 2];
    const d2 = dx * dx + dy * dy + dz * dz;
    if (d2 > maxDelta2) maxDelta2 = d2;
    positions[idx] = nx;
    positions[idx + 1] = ny;
    positions[idx + 2] = nz;
  }
  if (!skipParticleLoop) pGeo.attributes.position.needsUpdate = true;

  /* ¿SE PUEDE DEJAR DE MOVER LA NUBE?
     El lerp es asintótico: nunca llega del todo al destino, así que sin un
     corte explícito la nube sigue recalculando 7 000 posiciones por frame para
     desplazarlas milésimas de milímetro que nadie ve.

     Solo se considera asentada si además `ambientLock` está al máximo. Ese
     valor anula la oscilación (`wave`), que es lo único del bucle que depende
     del tiempo: con una formación bloqueada —plano, timeline, fachada— el
     destino es fijo y la convergencia es real. Sin bloqueo la nube respira, y
     ahí congelarla se vería como un fallo.

     El umbral (1e-8 sobre la distancia al cuadrado, o sea 0,1 mm) está por
     debajo de lo que ocupa un píxel a esta escala. Cualquier cambio de estado
     vuelve a poner en marcha el bucle, porque `ambientLock` o los targets
     cambian y la distancia deja de ser cero. */
  particlesSettled = maxDelta2 < 1e-8 && ambientLock > 0.999;

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
    const vpH = getViewportSnapshot().height;
    const coinDist = Math.max(CONFIG.camera.z - 0.55, 1e-3);
    const pxPerUnit = vpH / (2 * Math.tan((CONFIG.camera.fov * Math.PI) / 360) * coinDist);
    const aimY = CONFIG.coin.baseY
      + (heroCoinFrame.centerY - vpH / 2) / Math.max(pxPerUnit, 1e-6);
    choreo.look.set(0, THREE.MathUtils.lerp(approachY, aimY, lockupCamMix), 0);
  }

  /* La Sala (b1): dolly de entrada por el umbral. La salida hacia El Método
     ya NO invierte este plano: se mezcla hacia la coreografía general con el
     pórtico oculto, para que no parezca que volvemos por la misma puerta. */
  if (DOOR_MODE === 'doorway' && crossEff > 0.001) {
    const enterY = CONFIG.door.approachCamY ?? 0.62;
    const enterZ = CONFIG.door.approachCamZ ?? CONFIG.camera.z;
    const crossEase = THREE.MathUtils.smoothstep(crossEff, 0, 1);
    camera.position.set(
      THREE.MathUtils.lerp(0, CONFIG.camera.x, crossEase),
      THREE.MathUtils.lerp(enterY, CONFIG.door.roomCamY ?? 0.62, crossEase),
      THREE.MathUtils.lerp(enterZ, CONFIG.door.roomCamZ ?? -0.5, crossEase)
    );
    if (roomExitT > 0.001) camera.position.lerp(choreo.pos, roomExitT);
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
    if (roomExitT > 0.001) _roomLook.lerp(choreo.look, roomExitT);
    camera.lookAt(_roomLook);
  } else {
    /* Coreografía: la cámara viaja por los capítulos en vez de quedarse
       clavada. La rama del dolly (crossEff>0) sigue mandando durante el
       cruce; aquí se aplica el plano-secuencia del resto de la pieza. */
    camera.position.copy(choreo.pos);
    camera.lookAt(choreo.look);
  }

  /* La Sala (b1): la luz del interior sube AL ABRIR la puerta (0.10→0.45) y
     se apaga al disolver hacia El Método, sin reactivar el pórtico. Antes
     esperaba hasta 0.56 y, con el interior a oscuras, la estatua no se veía
     cuando la puerta se abría: solo asomaba al estar entrando. */
  if (roomLight) {
    const lightT = DOOR_MODE === 'doorway'
      ? THREE.MathUtils.smoothstep(roomPresence, 0.10, 0.45)
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
  /* Salida hacia El Método: la sala no se apaga, se hunde. Una campana de
     niebla (0 → pico en mitad del retroceso → 0) hace que la estatua se
     desvanezca en profundidad mientras la cámara se aleja, en vez de
     encogerse hasta desaparecer en 200 px como antes. Termina en 0 para
     entregar El Método con la escena limpia. */
  /* Forma asimétrica en dos tramos, medida contra la distancia real de la
     cámara a la estatua (5 m al empezar → 10,7 m al final):
       1) sube a `exitFog` en la primera mitad (a 7,6 m deja ver un 23 %);
       2) `exitSink` la espesa otro `exitFogSink` entre 0,55 y 0,90: a 9,4 m
          la estatua queda al 2 % y a 10 m por debajo del 0,1 %, es decir,
          se hunde del todo ANTES de que `exitHide` la apague (0,85→0,95);
       3) recién con la figura ya oculta (0,95→1,0) la niebla se despeja.
     Antes la niebla empezaba a limpiarse en 0,90 con la estatua aún
     encendida hasta 0,94: en ese hueco (≈65 px de scroll con la salida
     larga) la figura volvía a verse nítida y luego desaparecía de golpe.
     Solo afecta a las mallas: partículas y órbitas tienen fog:false. */
  const exitClear = 1 - THREE.MathUtils.smoothstep(roomExitT, 0.95, 1.0);
  const exitFogShape = DOOR_MODE === 'doorway'
    ? THREE.MathUtils.smoothstep(roomExitT, 0.0, 0.5) * exitClear
    : 0;
  const exitSink = DOOR_MODE === 'doorway'
    ? THREE.MathUtils.smoothstep(roomExitT, 0.55, 0.90) * exitClear
    : 0;
  if (scene.fog) {
    const veil = veilShape * (CONFIG.door?.veilFog ?? 0);
    const exitVeil = exitFogShape * (CONFIG.door?.exitFog ?? 0.16)
      + exitSink * (CONFIG.door?.exitFogSink ?? 0.14);
    scene.fog.density = Math.max(scene.fog.density, veil, exitVeil);
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
     Al rampar reveal entran suavemente y el script los sigue animando.

     Ventana atada a `roomPresence` (crossT durante la entrada, y cae con
     exitT al salir): así la estatua se revela EN PARALELO con la apertura de
     las hojas (que abre en crossT 0.04→0.42) en vez de esperar al final del
     dolly — antes recién asomaba ~0.29 y el lector veía el vano vacío. */
  /* Entrada: ligada a crossT (la apertura de hojas). Salida: NO se deshace
     el reveal —eso encogía y hundía la estatua mientras la cámara retrocedía,
     dos movimientos contrarios a la vez—; la figura se queda entera, quieta
     y a escala 1, y es la niebla de salida + la distancia lo que la disuelve.
     `exitHide` solo decide cuándo dejar de dibujarla (0,85→0,95), cuando la
     niebla ya la tapó por completo (ver exitSink). Antes este factor se
     multiplicaba dentro de figureReveal y volvía a encoger/levantar la
     estatua en el último tramo: dos movimientos que el lector alcanzaba a
     ver si la niebla no la cubría. */
  const figureReveal = DOOR_MODE === 'doorway'
    ? THREE.MathUtils.smoothstep((crossT - 0.04) / 0.30, 0, 1)
    : (currentStage !== 1 ? 1 : 0);
  const exitHide = DOOR_MODE === 'doorway'
    ? THREE.MathUtils.smoothstep(roomExitT, 0.85, 0.95)
    : 0;
  /* Luces de museo y órbitas durante la salida: se apagan con la niebla
     (0,25→0,85), no de golpe con el reveal. Las órbitas no reciben niebla,
     así que sin esto seguirían girando alrededor de una estatua ya oculta. */
  const exitFade = 1 - THREE.MathUtils.smoothstep(roomExitT, 0.25, 0.85);
  if (figureSystem) {
    /* El bbox solo es válido cuando los GLB han cargado; por eso se resuelve
       aquí (una vez por resize) y no en syncViewportAndObjects(). */
    if (roomAimDirty) refreshRoomAim();
    figureSystem.group.visible = figureReveal > 0.01 && exitHide < 0.99;
    figureSystem.group.scale.setScalar(0.86 + 0.14 * figureReveal);
    figureSystem.group.position.y = (1 - figureReveal) * 0.5;
    /* Sigue la iluminación de las figuras (placeholder no enciende nada):
       la estatua se enciende como pieza de museo al cruzar y el relleno
       frío por la izquierda le da volumen a la piedra. */
    let statueReady = false;
    /* Los placeholders de las figuras aún sin modelar (inflación, brote…)
       viven a ±4,8 de la estatua: fuera del encuadre mientras la cámara
       está DENTRO, pero con la cámara afuera (acercamiento por el umbral) o
       retrocediendo hacia El Método entraban en el FOV y se veían dos
       icosaedros grises flotando a los lados del pórtico, justo en el plano
       más cuidado de la pieza. Solo existen mientras la cámara ha cruzado
       (crossT > 0,6 ≈ z < 1,5) y todavía no ha empezado a salir. */
    const placeholdersOn = crossT > 0.6 && roomExitT < 0.001;
    figureSystem.figures.forEach((record) => {
      if (record.placeholder) {
        record.placeholder.visible = placeholdersOn;
        record.placeholder.rotation.y = time * 0.18 * figureReveal;
        record.placeholder.position.y = Math.sin(time * 0.6 + record.def.x) * 0.04 * figureReveal;
      }
      if (record.model) statueReady = true;
    });
    const statueT = statueReady ? figureReveal * exitFade * (1 - exitHide) : 0;
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
let quotePanelHideTimer = null;
/* DECLARACIÓN DE FUNCIÓN, NO `const` CON FLECHA, A PROPÓSITO.
   Se pasa como dependencia a initVoiceExplorer(), que se llama unas 500
   líneas más arriba. Con `const closeQuotePanel = () => {...}` eso es zona
   muerta temporal y revienta al arrancar. Una declaración se iza, y su
   cuerpo no se ejecuta hasta que alguien la llama, que siempre es después
   de que el módulo termine de cargar. */
function closeQuotePanel() {
  quotePanelEl.classList.remove('visible');
  quotePanelEl.setAttribute('aria-hidden', 'true');
  clearTimeout(quotePanelHideTimer);
  quotePanelHideTimer = setTimeout(() => {
    if (!quotePanelEl.classList.contains('visible')) quotePanelEl.hidden = true;
  }, 360);
  clearSelection();
  particleFocus.index = -1;
  syncAxesMarkFocus(-1);
  if (focusReturn.card) { focusReturn.card.focus({ preventScroll: true }); focusReturn.card = null; }
}
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
/* 0→1 mientras #stageAxes es protagonista: el enjambre ambiental cede
   protagonismo (opacidad) para que la capa factual SVG y sus destinos
   proyectados manden. */
let axesFocusT = 0;

/* La altura de cada punto usa la puntuación de orientación disponible en la
   muestra. Así el plano comunica algo más que color: la distancia al eje
   central conserva la diferencia entre señales fuertes y suaves, siempre de
   forma determinística para que la composición no cambie al recargar. */


/* Cámara de "layout" para proyectar el scatter de intervenciones SIEMPRE
   con el encuadre base (hero), no con la cámara animada del momento. Si se
   redimensiona durante La Sala, el dolly deja la cámara en otro lugar y el
   scatter quedaría proyectado con coordenadas incorrectas para los ejes. */
const _layoutCamera = new THREE.PerspectiveCamera();
/* La cámara de layout no depende de la partícula: reconstruirla entera —con
   lookAt, updateProjectionMatrix y updateMatrixWorld, que son las operaciones
   caras— 16 000 veces seguidas devolvía siempre exactamente lo mismo. Se
   recalcula solo cuando cambia el viewport o la altura base de la cámara. */
let _layoutCamKey = '';
function getLayoutCamera() {
  const { width, height } = getViewportSnapshot();
  const key = `${width}x${height}|${camBaseY}`;
  if (key === _layoutCamKey) return _layoutCamera;
  _layoutCamKey = key;
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
  const { xScale, yScale } = axesState.scales;
  if (!xScale || !yScale) return new THREE.Vector3(0, 0, 0);

  const px = xScale(date);
  const py = yScale(sentiment);
  /* CUIDADO: esta función se llama UNA VEZ POR PARTÍCULA (16 000 en el
     escritorio) desde buildParticleStoryTargets. Todo lo que no dependa de
     `date`/`sentiment` tiene que quedar fuera del bucle o se paga 16 000
     veces.

     `getViewportSize()` lee clientWidth, o sea que fuerza recálculo de estilo
     y layout si el estilo está sucio —y durante el arranque siempre lo está—.
     Medido: 32 000 llamadas en los primeros 14 s, dos por partícula (una aquí
     y otra dentro de getLayoutCamera), 1 136 ms de tiempo propio solo en leer
     dos números que no cambian. Ahora se toma el snapshot cacheado, que se
     invalida solo con resize/orientación. */
  const vp = getViewportSnapshot();
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
  if (!quotes.length || !axesState.scales.xScale || !axesState.scales.yScale) return;

  const participantGroups = new Map();
  const actGroups = new Map();
  /* Se recorren las PARTÍCULAS (PCOUNT), no las citas: con repetición hay
     miles de puntos y cada uno necesita su destino en el plano, la voz, el
     acta y la línea de tiempo. Recorriendo solo `quotes` las repetidas se
     quedaban en el origen (0,0,0) y colapsaban al centro de la escena. */
  for (let index = 0; index < PCOUNT; index++) {
    const q = quoteOf(index);
    const participant = q?.participant || 'Participante anónimo';
    const actKey = pActKeys[index];
    if (!participantGroups.has(participant)) participantGroups.set(participant, []);
    if (!actGroups.has(actKey)) actGroups.set(actKey, []);
    participantGroups.get(participant).push(index);
    actGroups.get(actKey).push(index);
  }

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

  for (let index = 0; index < PCOUNT; index++) {
    const q = quoteOf(index);
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
  }
  particleTargetsReady = true;
}

/* "Mapa de intervenciones" vive en js/sections/axes-map.js. */
initD3Axes({ quotes, openQuote });
buildParticleStoryTargets();
/* Debounce: en mobile el resize dispara varias veces (barra de URL) y
   reconstruir el SVG entero en cada evento era innecesario */
let d3ResizeT;
function onViewportResizeDebounced() {
  clearTimeout(d3ResizeT);
  d3ResizeT = setTimeout(() => {
    initD3Axes({ quotes, openQuote });
    buildParticleStoryTargets();
    initWordEvolution(quotes);
    if (particleFocus.index >= 0) syncAxesMarkFocus(particleFocus.index);
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
      /* Entrar cuando el contenido ya puede verse en pantalla. Arrancar antes
         hacía avanzar la línea de tiempo fuera del viewport y dejaba un tramo
         vacío poco premium entre La Sala y El Método. */
      start: 'top 45%',
      end: 'bottom bottom',
      scrub: 1
    }
  })
    /* Con la salida de La Sala alargada a 50vh (top 80% → 30% de este
       stage), el título entraba con la estatua todavía disolviéndose en la
       niebla: dos protagonistas a la vez. Se retrasa el arranque de la
       secuencia (0 → 0,08 ≈ 12vh) para que el título aparezca cuando la
       sala ya se apagó (exitT ≈ 0,95) y el ritmo interno se conserva. */
    .fromTo('#stageHook h2[data-hook]',
      { opacity: 0, y: 16, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.10, ease: 'none' }, 0.08)
    .fromTo('.hook-lead',
      { opacity: 0, y: 18, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.14, ease: 'none' }, 0.14)
    .fromTo('.hook-caption',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.12, ease: 'none' }, 0.26)
    .fromTo(dividerSpan,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.14, ease: 'none' }, 0.38)
    .fromTo(rows,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.16, ease: 'none', stagger: 0.08 }, 0.46)
    .fromTo(footnote,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.14, ease: 'none' }, 0.70)
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

  /* El cierre NO se gobierna con un ScrollTrigger propio: ver
     "LA FACHADA DEL CIERRE" en animate(). */
}

initParticleStoryScroll();
initWordEvolution(quotes);
/* "De la señal a la fuente" vive en js/sections/act-browser.js. */
initActBrowser({ quotes, openQuote });

/* Gancho de diagnóstico solo con ?debug: deja leer el estado de la escena
   (etapa, dispersión, visibilidad de la moneda, scroll) desde herramientas
   externas sin tocar el render. Sirvió para cazar el bug de "la moneda no
   aparece al volver arriba tras cargar a mitad de página". */
if (DEBUG_MODE) {
  window.__diag = {
    get state() {
      return {
        stage: currentStage,
        scatter: Number(scatterProgress.toFixed(3)),
        coinVisible: coin.visible,
        coinChildren: coin.children.length,
        coinFade: Number(coinFade.toFixed(3)),
        crossT: Number(crossT.toFixed(3)),
        exitT: Number(exitT.toFixed(3)),
        y: Math.round(window.scrollY),
      };
    },
  };
  /* Bisectación visual de artefactos de render: permite ocultar objetos
     concretos desde herramientas externas (solo con ?debug). */
  window.__objs = { doorGroup, doorFloor, swarm, orbitGroup, figureGroup: figureSystem ? figureSystem.group : null, scene, camera };
}

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
  /* El cruce: dolly + apertura de hojas + disolución del pórtico + velo.
     PRESUPUESTO DE SCROLL (la sección mide 320vh; el sticky fija 220vh):
       −85vh … +100vh  cruce (185vh). Antes eran 80vh: el viaje entero cabía
                       en ~7 muescas de rueda y la disolución del pórtico
                       (crossT 0,86→0,96) ocurría en 72 px, una sola muesca.
                       Es el plano más importante de la pieza y se lo pasaba
                       de largo. Con 185vh todas las fases se estiran ×2,3 sin
                       cambiar la coreografía (crossT sigue siendo 0→1).
       +100 … +115vh   silencio: la estatua encuadrada, sin texto (que la
                       imagen aterrice antes de leer).
       +115 … +220vh   beats de texto (línea de tiempo de más abajo).
       +220 … +320vh   el sticky se suelta; la estatua sigue sola e
                       interactiva hasta la salida (trigger de #stageHook). */
  ScrollTrigger.create({
    trigger: '#stageRoom',
    start: 'top 85%',
    end: '+=250%',
    scrub: true,
    onUpdate: (self) => { crossT = self.progress; },
  });

  /* SALIDA DE LA SALA: transición directa hacia El Método, sin volver por
     la puerta. Se dispara con #stageHook, no con #stageRoom: así la estatua
     permanece hasta que el siguiente acto ya está entrando. Dura 50vh (antes
     22vh: la cámara retrocedía 6,6 unidades en 198 px y la estatua se
     apagaba de golpe). El título de El Método entra en 'top 45%', o sea en
     el último tercio de esta salida, igual que antes. La estatua no se
     apaga: se hunde en la niebla (ver exitFog en animate). */
  ScrollTrigger.create({
    trigger: '#stageHook',
    start: 'top 80%',
    end: 'top 30%',
    scrub: true,
    onUpdate: (self) => { exitT = self.progress; },
    onLeave: () => { exitT = 1; },
    onLeaveBack: () => { exitT = 0; },
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

  /* Al salir de la sala (en cualquier sentido) se limpia la selección y el panel de cita. */
  ScrollTrigger.create({
    trigger: '#stageRoom',
    start: 'top 100%',
    end: 'bottom 0%',
    onLeave: () => {
      clearSelection();
      syncQuotePanel();
    },
    onLeaveBack: () => {
      clearSelection();
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
    /* En táctil el primer toque ya fija el panel (no hay hover previo);
       lo que hay que explicar es cómo se cierra. */
    roomHint.textContent = 'Toca una voz para leer lo que dijo · toca el fondo para cerrar';
    /* La leyenda del mapa de intervenciones habla de "clic". */
    const axesTrace = document.querySelector('.axes-reading-trace');
    if (axesTrace) axesTrace.textContent = 'toca un punto → fecha · voz · fragmento';
  }
  const roomContainer = document.getElementById('stageRoomContainer');
  if (roomTitle && roomLead && roomSub && roomHint) {
    /* La banda de sombra tras el copy (#stageRoomContainer::before) vive en
       la MISMA línea de tiempo que el texto: aparece con el título y se
       apaga con el hint, que es el último en irse. Así, cuando el sticky se
       suelta al final de la sección y el contenedor sube con el scroll, ya
       no hay sombra que arrastrar por encima de la estatua. Un ::before no
       se puede animar directo desde JS: se anima la variable --room-scrim. */
    const scrim = { v: 0 };
    const applyScrim = () => { if (roomContainer) roomContainer.style.setProperty('--room-scrim', scrim.v.toFixed(3)); };
    /* 1vh de scroll en unidades de la línea de tiempo. Debe coincidir con
       el alto del sticky: sección de 385vh − contenedor de 100vh = 285vh. */
    const V = 1 / 285;
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
           sobre el tramo en que el sticky está fijo (220vh), que es justo
           cuando el texto se ve. No confundir con el trigger del cruce del
           umbral, que unas líneas más arriba usa `top 85%` a propósito: el
           dolly arranca antes de fijarse y termina en +100vh, y los beats
           de abajo empiezan después de eso. */
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
      /* Posiciones y duraciones en vh DE SCROLL (V = 1vh): el sticky mide
         285vh, así que la línea de tiempo 0→1 son 285vh. El cruce (`+=250%`
         desde `top 85%`) termina en +165vh; se dejan 15vh de silencio y
         recién entra el título. Cada entrada dura 16vh (≈145 px): antes eran
         0,06 de un sticky de 100vh, o sea 54 px, medio golpe de rueda — un
         pop, no un fundido. El bloque completo queda compuesto 30vh
         (225→255) y después se retira en el mismo orden en que entró; el
         hint es el último en irse (279→285), junto con la sombra, justo
         antes de soltar el sticky. Si se vuelve a cambiar `+=250%` o el
         alto de la sección, hay que mover TODOS estos offsets a la vez. */
      .fromTo(scrim, { v: 0 }, { v: 1, duration: 16 * V, ease: 'none', onUpdate: applyScrim }, 180 * V)
      .fromTo(roomTitle, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 16 * V, ease: 'none' }, 183 * V)
      .fromTo(roomLead,  { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 16 * V, ease: 'none' }, 193 * V)
      .fromTo(roomSub,   { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 14 * V, ease: 'none' }, 203 * V)
      .fromTo(roomHint,  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 12 * V, ease: 'none' }, 213 * V)
      .to(roomTitle, { opacity: 0, y: -14, duration: 10 * V, ease: 'none' }, 255 * V)
      .to(roomLead,  { opacity: 0, y: -14, duration: 10 * V, ease: 'none' }, 259 * V)
      .to(roomSub,   { opacity: 0, y: -12, duration: 10 * V, ease: 'none' }, 263 * V)
      /* La sombra baja a la mitad cuando ya solo queda el hint (menos texto,
         menos base) y se apaga del todo con él, antes de que la sección
         suelte el sticky (285vh = 1.0). */
      .to(scrim, { v: 0.5, duration: 10 * V, ease: 'none', onUpdate: applyScrim }, 263 * V)
      .to(roomHint,  { opacity: 0, y: -10, duration: 6 * V, ease: 'none' }, 279 * V)
      .to(scrim, { v: 0, duration: 6 * V, ease: 'none', onUpdate: applyScrim }, 279 * V);
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
/* Línea de tiempo = los 100vh del sticky. Antes el texto entraba en
   0,05→0,29 y se iba en 0,60→0,85: quedaba compuesto solo 31vh (≈280 px,
   tres muescas de rueda) y se apagaba con la puerta todavía cerrada y
   quieta, 15vh antes de que empiece el cruce. Ahora entra igual de pronto,
   se sostiene 45vh y sale en los últimos 20vh, o sea mientras el cruce ya
   está arrancando (el trigger de crossT parte en −85vh de #stageRoom =
   0,15 de este sticky): el lector ve el copy irse y la puerta abrirse como
   un mismo gesto, no como dos escenas con un hueco en medio. */
objTimeline
  .fromTo('[data-objective]', 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 0.22, ease: 'cinematicOut', stagger: 0.05 }, 
    0.06
  )
  .to('[data-objective]', 
    { opacity: 0, y: -25, duration: 0.20, ease: 'cinematicIn' }, 
    0.80
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
  gsap.to(track, {
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


/* OJO CON EL ORDEN. initTimeline() crea un ScrollTrigger con `pin`, y los
   pins alteran la altura del documento: si se instancian en otro punto de la
   ejecución, las posiciones de arranque del resto se calculan contra un
   documento distinto. Esta llamada va EXACTAMENTE donde vivía el bloque antes
   de extraerlo a js/sections/timeline.js. Moverla arriba dejó la sección sin
   fijar y el gráfico sin dibujar (comprobado con npm run shots). */
initTimeline(quotes);

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
      focusReturn.card = el;
      pinQuote(idx);
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
/* Corte antes de partir el texto del cierre: SplitText recorre carácter a
   carácter y fuerza layout, y es de lo último que necesita el lector (está al
   final del documento). */
await breathe();
document.querySelectorAll('[data-closing]').forEach((el) => {
  /* SplitText (aria:'auto') resume el texto en un aria-label sobre el propio
     elemento; en un <p> ese atributo está prohibido (Lighthouse:
     aria-prohibited-attr) y los lectores de pantalla lo ignoran. Aquí se
     hace a mano: los fragmentos animados quedan aria-hidden y una copia
     íntegra, solo para tecnología asistiva, conserva la lectura corrida. */
  const plainText = el.textContent.replace(/\s+/g, ' ').trim();
  const split = new SplitText(el, { type: 'chars,words', charsClass: 'char-reveal', wordsClass: 'word-reveal', aria: 'none' });
  split.words.forEach((w) => w.setAttribute('aria-hidden', 'true'));
  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = plainText;
  el.appendChild(sr);
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
  { trigger: '#stageFacade',  color: '#0a0e1a' },
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
  { trigger: '#stageObjective', alpha: 0.14 },
  { trigger: '#stageRoom',     alpha: 0.07 },
  { trigger: '#stageHook',     alpha: 0.025 },
  { trigger: '#stageAxes',     alpha: 0.015 },
  { trigger: '#stageVoices',   alpha: 0.035 },
  { trigger: '#stageCounters', alpha: 0.025 },
  { trigger: '#stagePipeline', alpha: 0.018 },
  { trigger: '#stageTimeline', alpha: 0.035 },
  { trigger: '#stageQuotes',   alpha: 0.018 },
  { trigger: '#stageClosing',  alpha: 0.08 },
  { trigger: '#stageFacade',   alpha: 0.08 },
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
