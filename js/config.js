/* config.js — todos los números de la escena en un solo sitio.
 *
 * Cámara, luces, moneda, puerta, enjambre de partículas y La Sala. Si estás
 * ajustando cómo SE VE algo (una intensidad, una distancia, una velocidad),
 * casi seguro el número está aquí y no en main.js.
 *
 * CONFIG se exporta como objeto y main.js le reasigna propiedades en caliente
 * (p. ej. CONFIG.coin.baseY al redimensionar): eso es legal con módulos ES,
 * lo que no se puede es reasignar la variable CONFIG entera.
 */

/* Portada: la puerta GLB (puerta-draco.glb) entra desde el hero, detrás de
   la moneda, y el scroll del acto 2 hace dolly hacia el umbral. */
export const HERO_DOOR_LOCKUP = true;

/* ── Encuadre de la portada ───────────────────────────────────────────
 * CÓMO SE COMPONE EL HERO (léelo antes de tocar un número)
 *
 * La moneda NO se coloca con una fracción fija del viewport. Se coloca
 * dentro de la BANDA LIBRE: el hueco que queda entre la barra de marca de
 * arriba y el borde real del titular, medido del DOM en cada resize.
 *
 *     ┌──────────────────────────────┐  0
 *     │  2000–2015      PROTOTIPO    │
 *     ├──────────────────────────────┤  banda.top    = safeTopRatio · alto
 *     │                              │
 *     │           ( moneda )         │  diámetro     = fillRatio · banda
 *     │                              │  centro       = bandAnchor de la banda
 *     ├──────────────────────────────┤  banda.bottom = titleTop − gapRatio·alto
 *     │  In the room where…          │
 *     └──────────────────────────────┘
 *
 * POR QUÉ ASÍ. Antes había tres mecanismos peleándose: el diámetro salía de
 * una fracción del alto, el centro de OTRA fracción del alto, y una tercera
 * función movía CONFIG.coin.baseY para "esquivar" el título — pero la cámara
 * apunta a coin.baseY, así que se cancelaba sola. Resultado: el aire entre
 * moneda y titular iba de 42 px a 235 px según la pantalla (medido en 280
 * viewports), y en móvil apaisado la moneda pisaba el texto. Con la banda,
 * la proporción es la MISMA en todas partes por construcción.
 *
 * Los valores se pueden probar EN CALIENTE por URL, sin tocar el archivo:
 *     ?coinFill=0.78&coinAnchor=0.44&coinGap=0.05&coinTop=0.12
 *
 * Verificación: `npm run hero:check` mide el render real en 12 viewports.
 */
const heroParam = (key, fallback) => {
  const v = parseFloat(new URLSearchParams(location.search).get(key));
  return Number.isFinite(v) ? v : fallback;
};
export const HERO = {
  /* Alto de la franja intocable de arriba (la barra de marca), como
     fracción del alto del viewport. Se acota luego entre 56 y 112 px. */
  safeTopRatio: heroParam('coinTop', 0.13),

  /* Respiro mínimo entre el borde inferior de la moneda y el titular,
     como fracción del alto. Es lo que separa la banda del texto. */
  gapRatio: heroParam('coinGap', 0.045),

  /* Diámetro de la moneda como fracción de la ALTURA DE LA BANDA.
     Este es el número que de verdad manda en el tamaño percibido:
     0.72 deja un 14% de aire arriba y otro 14% abajo dentro de la banda. */
  fillRatio: heroParam('coinFill', 0.72),

  /* Dónde cae el centro de la moneda dentro de la banda. 0.5 = centrada;
     por debajo de 0.5 sube. Un pelo por encima del centro óptico compensa
     el peso visual del titular. */
  bandAnchor: heroParam('coinAnchor', 0.47),

  /* Topes duros, para que la banda no mande en casos extremos:
     - por ancho, para que en móvil vertical no se salga por los lados;
     - por alto, para que en una banda enorme (tablet vertical) la moneda
       no se convierta en un planeta;
     - mínimo, para que en un viewport bajísimo siga siendo reconocible. */
  coinWidthRatio: heroParam('coinWide', 0.40),
  maxSizeRatio: heroParam('coinSize', 0.42),
  minSizeRatio: heroParam('coinMin', 0.20),

  /* SOLO gobierna a qué altura se planta la PUERTA detrás de la moneda
     (CONFIG.coin.baseY). No mueve la moneda en pantalla: la cámara apunta
     a coin.baseY, así que subir este número sube la cámara con ella.
     Para mover la moneda en pantalla se usa bandAnchor. */
  centerYRatio: heroParam('coinY', 0.31),
};

/* ────────────────────────────────
   Three.js — Coin & Setup
──────────────────────────────── */
export const CONFIG = {
  camera: { fov: 38, x: 0, y: 0.6, z: 5.8 },
  lights: {
    ambient: { color: 0xfff4df, intensity: 0.25 },
    key:     { color: 0xffe8b0, intensity: 2.2,  x: 3.5, y: 4.5, z: 4.5 },
    fill:    { color: 0xa8c0e8, intensity: 0.5,  x: -4,  y: 1.5, z: 3 },
    rim:     { color: 0xffd76a, intensity: 1.5,  x: -2.5, y: 3.5, z: -4 },
    front:   { color: 0xfff1c8, intensity: 1.0,  x: 0,   y: 0.8, z: 5.5 },
  },
  exposure: 1.08,
  coin: {
    scale: 2.15, swaySpeedY: 0.45, tiltBase: -0.05,
    tiltOscillation: 0.025, tiltSpeed: 0.5,
    floatAmount: 0.04, floatSpeed: 0.7, baseY: 1.05,
    /* baseY se recalcula en getResponsiveCoinBaseY(): la moneda se ancla
       al espacio disponible justo encima del título, en vez de usar una
       coordenada fija que cambia de composición entre viewports. */
    color: '#ffd76a', metalness: 1.0, roughness: 0.22,
    envMapIntensity: 1.05, emissive: '#3d2508', emissiveIntensity: 0.05,
  },
  door: {
    /* ══════════════════════════════════════════════════════════════════════
       AJUSTES FÁCILES DE LA PUERTA 3D (ACTO 2):
       El tamaño de la puerta NO se fija "a ciegas": se DERIVA del tamaño real
       de la moneda del Acto 1 (ver getCoinWorldSize). Las dos figuras salen de
       la misma fórmula, así que la proporción entre ellas es idéntica en
       cualquier viewport. Antes cada una tenía su propia regla de px y la
       puerta terminaba ocupando ~90% del alto de la ventana (cortada arriba y
       encima del texto de "La Reunión").
    ══════════════════════════════════════════════════════════════════════ */
    /* Ancho TOTAL de la puerta (pórtico + escalones) como múltiplo del
       diámetro de la moneda. MÁS GRANDE: 1.6, 1.8 | MÁS CHICA: 1.1, 1.25.
       Con 1.25 la puerta mide ~36% del alto del viewport en 16:9.
       1.1 dejaba las dos figuras más chicas que el tamaño de referencia. */
    widthVsCoin: 2.75,
    /* Línea de suelo: el pie de los escalones se apoya acá (unidades de mundo).
       En 0.15 queda por encima del bloque de texto de La Reunión, incluso
       en ventanas bajas y anchas. SUBIR: valores mayores | BAJAR: menores. */
    groundY: 0.15,
    baseX: 0.0,             // Horizontal: DERECHA (> 0) | IZQUIERDA (< 0)
    baseZ: 0.0,             // Profundidad del Acto 2: MÁS CERCA (> 0) | MÁS LEJOS (< 0)
    heroBaseZ: -0.85,         // El lockup inicial queda detrás de la moneda para separar siluetas
    /* Aplastamiento de profundidad (1 = sin aplastar): la escultura es muy
       "gruesa" para una lectura frontal y se comprime en Z a propósito.
       0.55 reproduce el grosor que la puerta ya tenía en pantalla. */
    doorDepthSquash: 0.55,
    /* Red de seguridad: si aun aplastada la puerta sobresaliera más de esto
       hacia la cámara (p. ej. subiendo mucho widthVsCoin), se recalcula el
       squash en Z para respetarlo. */
    maxDepthWorld: 3.0,
    /* Sombra de contacto, en múltiplos de la huella de la puerta: se dimensiona
       con el modelo (antes era un cuadrado fijo que no seguía ni al modelo ni
       al viewport). */
    shadowWidthMul: 1.3,
    shadowDepthMul: 2.2,

    /* ── Materiales e Iluminación ──────────────────────────────────────
       OJO: estos cuatro valores son los de la rama HERO_DOOR_LOCKUP = false,
       que hoy NO se ejecuta. El acabado que se ve en pantalla es el de
       `leaf` / `frameAnim`, más abajo. */
    color: '#ffd76a', metalness: 1.0, roughness: 0.22,
    envMapIntensity: 1.3,
    emissive: '#3d2508', emissiveIntensity: 0.05,

    /* ── Acabado de la puerta a lo largo del scroll ──────────────────────
       'hero' = still de portada (hojas apagadas, detrás de la moneda).
       'meet' = Acto 2, La Reunión (hojas de oro, la puerta protagoniza).
       animate() interpola entre ambos con leafT. Estos ocho números estaban
       escritos a mano DENTRO de animate(), así que tocar el config no hacía
       absolutamente nada: son la única palanca real del acabado.

       LOS VALORES SON LOS MISMOS QUE HABÍA. Se movieron aquí sin cambiarlos
       (equivalencia de píxeles verificada), para que se puedan ajustar.

       Aviso para quien venga a subir el relieve por aquí: NO se puede.
       El normal map de las hojas (textura_puerta_bcch, 2048x2048 dentro de
       puerta-draco.glb) es un color liso RGB(128,127,255) = relieve CERO, un
       bake que salió vacío. Medido: mover el foco key no cambia un píxel, y
       bajar la metalicidad tampoco saca los paneles. Los cuadrados que se ven
       en Blender no están en el archivo exportado, ni en malla ni en textura.
       Hay que rehacer el export, no la iluminación. */
    leaf: {
      hero: { metalness: 0.12, roughness: 0.92, envMapIntensity: 0.12 },
      /* Acto 2: bronce envejecido, como el generador y el GLB de referencia.
         El dorado espejado de antes quemaba las hojas a un oro plano. */
      meet: { metalness: 0.88, roughness: 0.50, envMapIntensity: 0.54 },
      /* Cruce del umbral: sube el brillo, pero conserva bronce viejo; evitar
         el amarillo plano que quema los paneles. */
      cross: { metalness: 0.95, roughness: 0.38, envMapIntensity: 0.72 },
      /* Ornamentos (molduras, rosetas, perlado, herrajes): siempre un punto
         más pulidos y claros que el fondo, para que el relieve se lea. */
      meetOrn: { metalness: 0.95, roughness: 0.28, envMapIntensity: 0.88 },
      crossOrn: { metalness: 1.00, roughness: 0.23, envMapIntensity: 1.05 },
      /* Ranuras/sombras: menos reflectantes para que los filetes negros no
         se laven con las luces de la puerta. */
      meetDark: { metalness: 0.55, roughness: 0.72, envMapIntensity: 0.18 },
      crossDark: { metalness: 0.65, roughness: 0.64, envMapIntensity: 0.24 },
    },
    frameAnim: {
      hero: { metalness: 0.06, roughness: 0.90, envMapIntensity: 0.24, bumpScale: 0.045 },
      /* Acto 2: pórtico más sobrio que la piedra clara original, pero aún con
         lectura de material y volumen. */
      meet: { metalness: 0.04, roughness: 0.88, envMapIntensity: 0.22, bumpScale: 0.030 },
    },
    spots: {
      key:  { color: 0xffe3b5, intensity: 120, angle: 0.45, penumbra: 0.5, decay: 1.2, distance: 0, x: 1.2, y: 5.5, z: 2.5, tx: 0, ty: 0.2, tz: 0 },
      rim:  { color: 0x90b9ff, intensity: 45, angle: 0.6, penumbra: 0.7, decay: 1.2, distance: 0, x: -4.5, y: 4.0, z: -4.5, tx: 0, ty: -0.2, tz: 0 },
      under: { color: 0xffba80, intensity: 12, angle: 0.9, penumbra: 0.8, decay: 1.6, distance: 0, x: 0, y: -2.0, z: 2.2, tx: 0, ty: -0.3, tz: 0 },
    },
    fog: 0x0b101d,
    fogDensity: 0.08,

    /* ── LA SALA (b1) — cruce del umbral ────────────────────────────────
       transition: 'doorway' → coreografía nueva: la puerta se disuelve en
                        luz cálida, la cámara hace dolly a través del umbral
                        y un velo de fog revela la sala de las voces.
                  'classic' → comportamiento ANTERIOR (fade-out simple).
                        ← cambiar a 'classic' para volver a la versión previa */
    transition: 'doorway',
    roomCamZ: -0.5,    // z al terminar el dolly: la cámara queda dentro (0 = umbral)
    roomCamY: 0.62,    // altura que limpia los escalones al cruzar
    roomLook: { x: 0, y: 0.55, z: -2.0 },  // punto de mira ya dentro de la sala (sube el encuadre: la estatua queda arriba y el copy abajo)
    roomLight: { color: 0xffbe73, intensity: 11, x: 0, y: 0.9, z: -0.45 },
    veilFog: 0.06,     // pico del velo de niebla durante el cruce
    fovKick: 4,        // grados extra de FOV durante el dolly (0 → 1 → 0)
    /* Nube de voces dentro de la sala: centro y escala con los que se
       recoloca el enjambre al cruzar el umbral. La nube queda DELANTE de
       la cámara (z < roomCamZ) y se comprime, así el giro alrededor del
       eje Y nunca la barre hacia atrás y la sala no queda sin partículas. */
    roomSwarm: { x: 0, y: 0.55, z: -2.5, scale: 0.35 },
    /* Encuadre del acercamiento (ventanas de crossT en las que la mira viaja):
       aimDoorT: mira neutra de "La Reunión" → centro VISUAL de la puerta.
                 Que termine a ~0.45 hace que "un instante antes de entrar" la
                 puerta ya vaya perfectamente centrada (antes iba cortada arriba).
       aimRoomT: puerta (ya disuelta) → interior de la sala (roomLook). */
    aimDoorT: [0.0, 0.45],
    aimRoomT: [0.55, 0.95],
  },
  doorText: {
    /* ══════════════════════════════════════════════════════════════════════
       AJUSTES FÁCILES DEL TEXTO (ACTO 2 - "LA REUNIÓN"):
       Cambia estos valores para mover y personalizar el texto:
    ══════════════════════════════════════════════════════════════════════ */
    bottomOffset: '9vh',       // Distancia desde abajo (SUBIR: '10vh', '14vh' | BAJAR: '4vh', '2vh')
    horizontalOffset: '0px',   // Horizontal (DERECHA: '30px' | IZQUIERDA: '-30px' | '0px' = centrado)
    maxWidth: 'min(47rem, 90vw)',         // Ancho del párrafo (Más ancho: '750px' | Más angosto: '550px')
    titleSize: 'var(--fs-kicker)',
    textSize: 'var(--fs-display)',
    gap: '1.4rem',             // Espacio entre título y párrafo
  },
  interaction: {
    /* ── Hover sobre partículas ──────────────────────────────────────────
       hoverRadius: radio de detección en unidades de mundo para el
                raycaster de THREE.Points. Tres.js usa un "threshold" en
                unidades de mundo (por defecto 1), así que un valor grande
                hace que se dispare cerca del puntero aunque no esté sobre
                la partícula. 0.075 ≈ un área de ~15px por partícula; bajarlo
                a 0.04-0.05 lo hace más quirúrgico.
       El radio se escala con el tamaño del enjambre (swarm.scale), igual
       que el aspecto visual de la partícula, así en La Sala (escala 0.35)
       el área también se achica.
       hoverDelayMs: espera antes de abrir el panel para no disparar al
                cruzar la nube con el mouse. */
    hoverRadius: 0.075,
    hoverDelayMs: 90,
  },
  /* ── LA SALA — retablo central (pedestal + estatua + órbitas) ─────────
     La pieza central de la sala es un RETABLO: la estatua de la Justicia
     apoyada en su pedestal, ocupando la mitad superior del encuadre, con
     el copy en la franja inferior. Alrededor del eje de la figura giran
     unos pocos fragmentos (uno por tono) que dejan una estela: son citas
     reales, se pueden pasar con el cursor igual que la nube.
     Las posiciones/escalas de las figuras viven en `js/figures.js`; aquí
     solo se configura la órbita. */
  room: {
    figure: { x: 0, z: -4.8 },     // debe coincidir con `figures.js` (soporte/balanza)
    orbit: {
      count: 12,                    // fragmentos en órbita (4 por tono)
      trail: 58,                    // muestras de estela por fragmento
      trailStep: 0.085,             // segundos entre muestras (58 × 0.085 ≈ 5 s de cola)
      headSize: 0.15,               // tamaño del punto vivo (unidades de mundo)
      tailSize: 0.08,               // tamaño de la muestra más nueva de la cola
      minRadius: 0.46,              // radio menor de la órbita
      maxRadius: 0.95,              // radio mayor
      minY: 0.44,                   // altura mínima del centro orbital (por encima del pedestal)
      maxY: 1.12,                   // altura máxima (por debajo de la cabeza: no cruzan la balanza)
      tilt: 34,                     // grados máximos de inclinación del plano orbital
      speed: 0.24,                  // rad/s de referencia (≈26 s por vuelta en r medio)
      precession: 0.028,            // rad/s de giro del plano (las estelas nunca se repiten)
      opacity: 0.82,
      neutralDim: 0.78,             // el plata en aditivo se va a blanco puro; se baja solo aquí
    },
    /* Luces de la pieza central. OJO: el renderer usa unidades físicas
       (useLegacyLights = false, three r160), así que estos valores son
       pequeños; el antiguo 210 del foco no quemaba la escena solo porque
       el target estaba mal y la estatua quedaba FUERA del cono. */
    accentIntensity: 12,
    fillIntensity: 4,
  },
};

if (HERO_DOOR_LOCKUP) {
  /* Still de referencia: pórtico de piedra, vano oscuro, moneda = única joya.
     Las hojas doradas del GLB se apagan en el hero (el vano es noche) y
     vuelven en el acto 2, cuando la puerta de la reunión se cierra. */
  CONFIG.door.widthVsCoin = 2.42;
  CONFIG.door.fogDensity = 0.026;
  CONFIG.door.doorDepthSquash = 0.72;
  CONFIG.door.maxDepthWorld = 4.8;
  CONFIG.camera.fov = 32;
  CONFIG.camera.y = 1.55;
  CONFIG.camera.z = 7.7;
  /* Encuadre de La Reunión y PRIMER frame del cruce: misma distancia
     que el lockup (sin acercar). La 1→2 aterriza aquí; el 2→3 parte
     de aquí. Achicar la puerta de stage 2, no agrandarla. */
  CONFIG.door.approachCamY = 0.62;
  CONFIG.door.approachCamZ = CONFIG.camera.z;
  CONFIG.exposure = 0.94;
  CONFIG.door.spots.key = { color: 0xffe3b5, intensity: 15, angle: 0.72, penumbra: 0.62, decay: 1.35, distance: 0, x: -3.8, y: 3.5, z: 4.4, tx: 0, ty: 0.2, tz: 0 };
  CONFIG.door.spots.rim = { color: 0x9fb2cb, intensity: 6.5, angle: 0.8, penumbra: 0.75, decay: 1.35, distance: 0, x: 3.5, y: 1.6, z: 2.0, tx: 0, ty: 0.1, tz: -0.35 };
  CONFIG.door.spots.under = { color: 0xffc26f, intensity: 4.4, angle: 0.7, penumbra: 0.85, decay: 1.6, distance: 0, x: 0, y: 0.5, z: 2.9, tx: 0, ty: 0.25, tz: 0 };
}
