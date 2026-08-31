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

    /* ── Materiales e Iluminación ── */
    color: '#ffd76a', metalness: 1.0, roughness: 0.22,
    envMapIntensity: 1.3,
    emissive: '#3d2508', emissiveIntensity: 0.05,
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
  CONFIG.door.widthVsCoin = 2.15;
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
  CONFIG.door.spots.key = { color: 0xd4e0f2, intensity: 12, angle: 0.72, penumbra: 0.62, decay: 1.35, distance: 0, x: -3.8, y: 3.5, z: 4.4, tx: 0, ty: 0.2, tz: 0 };
  CONFIG.door.spots.rim = { color: 0x6e819c, intensity: 6, angle: 0.8, penumbra: 0.75, decay: 1.35, distance: 0, x: 3.5, y: 1.6, z: 2.0, tx: 0, ty: 0.1, tz: -0.35 };
  CONFIG.door.spots.under = { color: 0xffd76a, intensity: 3.2, angle: 0.7, penumbra: 0.85, decay: 1.6, distance: 0, x: 0, y: 0.5, z: 2.9, tx: 0, ty: 0.25, tz: 0 };
}
