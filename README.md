# In the Room Where Monetary Policy Happens

Exploración interactiva de 16 años de reuniones de política monetaria en Chile (2000-2015). Un scrollytelling que combina datos textuales con indicadores macroeconómicos tradicionales.

## Stack

- **Three.js** — Renderizado 3D de moneda y puerta del Banco Central
- **GSAP ScrollTrigger** — Animaciones vinculadas al scroll
- **D3.js** — Visualización de datos (timeline, ejes)
- **Lenis** — Scroll suave
- **SplitText** — Animación de texto carácter por carácter

## Cómo ejecutar

```bash
npm start            # servidor estático en http://localhost:8000
npm run check        # arranca el sitio fuera del navegador y avisa si algo revienta
npm run shots        # capturas reales de cada sección (necesita npm start)
npm run hero:check   # mide la portada en 12 viewports y falla si la moneda pisa el título
```

`npm run check` necesita las dependencias de desarrollo una sola vez
(`npm install`). No hay paso de build: lo que hay en el repo es lo que se
publica.

## Estructura del proyecto

Cinco capas. La regla es que cada una solo puede depender de las de arriba.

| Capa | Dónde | Qué es |
|---|---|---|
| **Datos** | `js/quotes.js` | Las 99 citas. Script clásico, publica `window.QUOTES`. |
| **Configuración** | `js/config.js` | Todos los números de la escena. Ni una línea de lógica. |
| **Funciones puras** | `js/topics.js`, `js/utils.js` | Sin DOM, sin Three.js. Testables tal cual. |
| **Entorno** | `js/viewport.js` | El tamaño del lienzo. Lee el DOM, nada más. |
| **Sistemas** | `js/figures.js` | El sistema de figuras 3D: carga, apilado, placeholders. |
| **Secciones** | `js/sections/*.js` | Una sección de scrollytelling cada uno. Reciben sus datos por parámetro. |
| **Aplicación** | `js/main.js` | La escena, el bucle de render y el resto de secciones. |

Una sección solo puede vivir en `js/sections/` si **no toca la escena 3D**. En
cuanto necesita saber qué partícula está señalada, deja de ser autónoma; ver
el Paso 2 del plan más abajo.

```
├── index.html              661 líneas · SOLO marcado: ni un <style>, ni un <script> con cuerpo
├── css/                    22 hojas · 3.970 líneas · el prefijo numérico ES el orden de cascada
│   └── README.md           qué hace cada hoja y por qué está en ese número
├── js/
│   ├── main.js           4.241 líneas · escena 3D + secciones + scrollytelling  ⚠ ver "Deuda"
│   ├── config.js           265 · cámara, luces, moneda, puerta, órbitas, La Sala, HERO
│   ├── viewport.js          28 · getViewportSize() / isCompactWidth(), el tamaño del lienzo
│   ├── figures.js          357 · sistema de figuras (carga GLB, apila sobre pedestal, placeholders)
│   ├── sections/           secciones extraídas: DOM + D3, cero dependencias del 3D
│   │   ├── word-evolution.js  275 · "El lenguaje cambia"
│   │   └── timeline.js        252 · "Índice de orientación por año"
│   ├── quotes.js           893 · las 99 citas (dato, no código)
│   ├── topics.js            21 · taxonomía temática + normalización de texto (puro)
│   ├── utils.js             13 · particleRandom (puro)
│   ├── three.module.js         Three.js r160
│   ├── vendor/                 GSAP, ScrollTrigger, SplitText, CustomEase, D3, Lenis, Draco
│   └── loaders/ utils/ controls/ environments/ objects/    addons de Three.js
├── tools/smoke-test.mjs    204 · `npm run check`
├── scripts/screenshots/
│   ├── capture.mjs         161 · `npm run shots`
│   └── hero-check.mjs      284 · `npm run hero:check`
├── figures/                balanza.glb (177 KB) · soporte.glb (28 KB) · README.md
├── monedav5-draco.glb      434 KB
├── puerta-draco.glb         76 KB
├── NARRATIVA.md            el arco narrativo: qué cuenta hoy y qué debería contar
└── PLAN_NIVEL_PREMIUM.md
```

### Mapa de `js/main.js`

Es el archivo que hay que saber recorrer. Va en este orden:

| Líneas | Región |
|---|---|
| 1–160 | imports, constantes del DOM, escena, cámara, luces, estado de módulo |
| 163–260 | figuras de La Sala + rig de luces de la puerta |
| **276–400** | **composición del hero**: `getHeroBand()` / `getHeroCoinFrame()` |
| 480–795 | la puerta (Acto 2): carga, escalado, texto del vano |
| 799–945 | enjambre de partículas (memoria trazable) |
| 948–1560 | órbitas de La Sala + panel de cita + navegación por teclado |
| **1572** | `refreshRoomAim()` — encuadre de La Sala contra su titular |
| **1629–1760** | **coreografía de cámara** (`cameraChoreographyStops`) |
| 1762–2065 | Las voces — directorio editorial |
| 2071–2435 | Navegador de actas |
| **2441–2925** | **`animate()`** — el bucle de render |
| 2930–3440 | mapa D3 de intervenciones + hook de señales |
| 3443–4035 | todos los `ScrollTrigger` de todas las secciones |
| 4038–4241 | Quotes, Closing y las "técnicas premium" (parallax, velocidad) |

Los números envejecen a cada commit. Para regenerar el mapa:

```bash
grep -n "^   [A-ZÁÉÍÓÚÑa-z].*—\|^function animate" js/main.js
```

### Dónde va cada cosa nueva

- **Un número que cambia cómo se ve algo** → `js/config.js`. Si estás escribiendo
  un literal numérico en `main.js`, casi seguro es un error.
- **Una hoja de estilo nueva** → `css/NN-nombre.css` con el número que le toque
  por cascada, y anótala en `css/README.md`. El prefijo no es decorativo.
- **Marcado** → `index.html`, y nada más que marcado.
- **Una figura 3D** → `figures/` + una entrada en `FIGURE_DEFS` de `figures.js`.
  El sistema dibuja un placeholder si el GLB aún no existe.

### Rutas: la trampa que cuesta una tarde

Se resuelven contra dos bases distintas y no hay forma de saberlo mirando:

- Los `import` de `js/main.js` se resuelven contra **`js/`** (`./config.js`).
- El `importmap`, los GLB y el decodificador Draco se resuelven contra
  **`index.html`**, o sea la raíz (`figures/soporte.glb`, no `../figures/...`).
- El CSS se resuelve contra **la hoja**, por eso `fonts.css` dice `../fonts/`.

### Deuda estructural (medida, no impresiones)

Esto no está bien dividido, y conviene tenerlo escrito:

| Síntoma | Medida |
|---|---|
| `main.js` acapara el código | **4.241 líneas = 82 %** de todo el JS propio sin contar los datos |
| Mitad del archivo no son funciones | **2.005 líneas a nivel de módulo**: es un script, no un módulo |
| Estado global compartido | **48 variables `let` de módulo** que cualquiera de las 52 funciones puede escribir |
| Una función hace demasiado | `animate()` = **485 líneas** (moneda, puerta, partículas, órbitas, cámara, luces) |
| Secciones que no pertenecen ahí | `initActBrowser` 364 · `initVoiceExplorer` 298 · `initD3Axes` 164 = **826 líneas** |
| El archivo base del CSS es el que más pisa | `00-tokens-base.css` tiene **42 `!important`** de los 68 del proyecto |

Consecuencia concreta y ya observada: `openQuote`, `closeQuotePanel` y
`activeParticleFocus` tienen zona muerta temporal (TDZ) y solo se pueden usar
dentro de manejadores de evento. Eso es el estado compartido pasando factura.

**El plan de salida** está en la sección "Lo que aún está pendiente de ordenar".

## Cómo se trabaja en este repo

Esto está escrito porque el proyecto llegó a tener **9.077 líneas en un solo
`index.html`** (3.769 de CSS + 4.713 de JS + 588 de HTML), con 62 `!important`
y sin ninguna comprobación automática. Funcionaba, pero cada cambio era una
apuesta. Las reglas de abajo existen para que no vuelva a pasar.

Que el HTML y el CSS ya estén partidos **no significa que el proyecto esté bien
dividido**: el JS sigue concentrado en un archivo. Lo medido está en "Deuda
estructural" y el plan para salir de ahí, en el punto 5.

### 1. Cada cosa en su archivo

| Si vas a tocar… | El archivo es… |
|---|---|
| Un número de la escena 3D (cámara, luz, velocidad, tamaño) | `js/config.js` |
| Cómo se ve algo | el `css/*.css` de esa sección |
| El marcado de una sección | `index.html` |
| Una figura 3D, su pedestal o su escala | `js/figures.js` |
| Lógica de la escena o del scroll | `js/main.js` |
| Una comprobación automática | `tools/` o `scripts/screenshots/` |

**`index.html` es solo marcado.** Nada de `<style>`, nada de `<script>` con
código dentro, nada de `style="..."` nuevo. Si te descubres añadiendo CSS o JS
ahí, es la señal de que estás repitiendo el problema.

**`js/config.js` antes que un número mágico.** Un valor que ajusta cómo se ve
la escena va con nombre en CONFIG, no incrustado a 3.000 líneas de distancia.

### 2. Ejecuta `npm run check` antes de dar algo por bueno

Levanta el sitio entero en jsdom, importa `js/main.js` y falla si hay un error
de sintaxis, un import roto, una variable que no existe, un `id` del DOM que
desapareció o una excepción al arrancar. Tarda unos 15 segundos.

Lo que **no** cubre: no hay WebGL (no valida shaders ni cómo se ve nada) ni
`Worker` (los GLB con Draco no llegan a decodificarse — los dos mensajes
`Worker is not defined` son esperados y no cuentan como error). No sustituye
abrir la página; sustituye descubrir en producción que un `const` mal escrito
dejó la pantalla en negro.

### 3. La portada se compone contra el título, no con números mágicos

La moneda la dibuja WebGL sobre un `<canvas>` a pantalla completa; el titular
lo maqueta el CSS. Son dos sistemas que no se ven el uno al otro, así que nada
impide que se solapen — y durante un tiempo se solapaban en móvil apaisado.

La regla, implementada en `getHeroBand()` / `getHeroCoinFrame()` de
`js/main.js` y documentada con diagrama en `js/config.js` → `HERO`:

> La moneda vive dentro de la **banda libre**: el hueco entre la barra de
> marca y el borde real del titular, medido del DOM (`offsetTop`) en cada
> resize. Su diámetro es una fracción de esa banda, no del viewport.

Dos trampas que cuestan tiempo si no se saben:

1. **`CONFIG.coin.baseY` no mueve la moneda en pantalla.** La cámara del hero
   apunta a `coin.baseY`, así que subirlo sube la cámara con él y la moneda se
   queda donde estaba. Lo que sí mueve la moneda es la **mira** de la cámara,
   en el bloque `lockupCamMix` de `animate()`. `coin.baseY` solo decide a qué
   altura queda la puerta detrás.
2. **`getHeroCoinFrame()` lee `offsetTop`, o sea que fuerza un reflow.** No se
   puede llamar por frame: `applyCoinScale()` la cachea en `heroCoinFrame` y
   `animate()` lee la copia.

Al tocar cualquier número del hero, o el CSS del titular, pasa
`npm run hero:check`. Prueba valores en caliente sin editar nada:
`localhost:8000/?coinFill=0.78&coinAnchor=0.44&coinGap=0.05`.

### 4. Accesibilidad: lo que hay que mantener

No es un extra, y ya está construido. Al añadir cosas:

- **Todo lo interactivo tiene que funcionar con teclado.** Si algo solo
  responde al ratón —sobre todo dentro del `<canvas>`— necesita un equivalente
  real en el DOM. Hay dos patrones ya hechos para copiar: `#roomVoiceNav`
  (botones para las voces en órbita) y `.axes-data-mark` con `tabindex="0"`
  en el gráfico D3.
- **Contraste mínimo 4,5:1** sobre `--color-bg`. Cuidado con apilar `opacity`
  sobre un color ya tenue: `opacity: 0.62` es el suelo con
  `--color-text-primary`.
- **Si nace oculto para animarse, tiene que estar cubierto por
  `css/noscript.css`.** El relato empieza en `opacity: 0` y lo enciende GSAP;
  sin ese fallback, quien tenga el JS bloqueado ve una pantalla negra.
- **Respeta `prefers-reduced-motion`**, en CSS y en JS (la constante
  `reduceMotion` de `js/main.js`).
- **Un panel que se oculta se oculta de verdad**: `hidden` o `display: none`,
  no solo `opacity: 0`, o sus botones siguen siendo alcanzables con Tab.

### 5. Lo que aún está pendiente de ordenar

El plan de salida de la deuda medida más arriba, **en este orden**, porque cada
paso hace más seguro el siguiente:

**Paso 1 — sacar las secciones que no tocan la escena 3D. ✅ HECHO.**
`initWordEvolution()` y `buildTimeline()` no referenciaban ni una sola
variable del 3D: eran DOM + D3 + `quotes`. Están en
`js/sections/word-evolution.js` y `js/sections/timeline.js`, reciben `quotes`
por parámetro y no hacen nada por el mero hecho de importarse. `getViewportSize()`
e `isCompactWidth()` salieron con ellas a `js/viewport.js`.
**main.js: 4.742 → 4.241 líneas.**

> **La lección del Paso 1, que vale para los demás.** Al mover la llamada a
> `initTimeline()` unas líneas más arriba, la sección dejó de fijarse y el
> gráfico no se dibujaba. Los `ScrollTrigger` con `pin` cambian la altura del
> documento, así que el ORDEN DE EJECUCIÓN es parte del contrato. Extraer
> código a un módulo es seguro; cambiar cuándo se ejecuta, no. Lo cazó
> `npm run shots` comparando píxeles, no la lectura del diff.

**Paso 2 — sacar las tres que tocan el 3D por una rendija.**
`initActBrowser()` (364), `initVoiceExplorer()` (298) e `initD3Axes()` (164)
solo dependen del 3D a través de `hoverIndex` y `pinnedIndex` (qué partícula
está señalada o fijada). Eso es una *selección*, no la escena: sale a un módulo
pequeño con `get/set` y suscripción, y las tres secciones se van detrás.
Otras 826 líneas fuera. `main.js` bajaría de 4.241 a ≈3.400.

**Paso 3 — partir `animate()`.**
485 líneas que actualizan seis sistemas distintos por frame. Cada uno tiene su
propio estado y se puede extraer a `update<Sistema>(t, dt)`. Este es el que más
cuidado pide: el orden de las actualizaciones importa y no está documentado.

**Paso 4 — el estado global.**
52 `let` de módulo. Después de los pasos 1–3 quedarán muchos menos, y los que
sobrevivan se agrupan por sistema en vez de vivir sueltos.

**Cómo se valida un paso de estos.** Antes no había forma de verificar un
refactor de este tamaño; ahora hay tres redes:

```bash
npm run check                       # arranca sin navegador: imports, ids, excepciones
npm run shots -- --w=1440 --h=900   # las 13 secciones con WebGL real, sale 1 si hay errores
npm run hero:check                  # la portada en 12 viewports
```

El criterio del Paso 1 fue **equivalencia de píxeles**: capturar antes,
refactorizar, capturar después y comparar. Quedó en 0,2 % de píxeles distintos
en las dos secciones tocadas, que es exactamente el ruido de las partículas
animadas del fondo 3D. Menos del 0,5 % = no ha cambiado nada.

**Lo que NO conviene tocar todavía:** los `style="..."` inline que quedan en
`index.html` son de la maqueta original y varios los pisa GSAP en caliente;
moverlos a CSS sin comprobarlo uno a uno rompe animaciones.

## Secciones del scrollytelling

1. **Hero** — Título con moneda 3D flotante
2. **Puerta** — Transición hacia el interior del Banco Central
3. **Hook** — "¿Qué dice el acta?"
4. **Ejes + Contadores** — Sentimiento hawkish/dovish y estadísticas
5. **Metodología** — Pipeline de procesamiento de texto a datos
6. **Timeline** — Orientación de política monetaria en el tiempo
7. **Citas** — Frases destacadas de los participantes
8. **Cierre** — Conclusión del proyecto

## Datos

Los datos son preliminares (maquetación). El dataset real proviene de transcripciones de reuniones de política monetaria del Banco Central de Chile.

## Licencia

ISC

## Nivel premium (en progreso)

Con el plan de `PLAN_NIVEL_PREMIUM.md`, el proyecto avanza hacia una pieza
"de oficio" en un solo mundo visual. Estado real verificado en la revisión
2026-08-30:

- **Gabinete de figuras** (`#figureCabinet`): lista las figuras 3D y su estado. ✅ en el sitio.
- **Sistema de figuras** (`js/figures.js`): intenta cargar cada `figures/*.glb`; si no existe aún, dibuja un placeholder. ✅ en el sitio.
- **Balanza** (`figures/balanza.glb`): La Justicia ciega (Lady Justice), símbolo del equilibrio hawkish/dovish. ✅ lista (177 KB, Draco, acabado piedra mate). Ver `figures/README.md`.
- **Retablo de La Sala (2026-08-31)**: la estatua dejó de flotar. Ahora hay
  **pedestal** (`figures/soporte.glb`, 28 KB) + **estatua encima**
  (`standsOn: 'soporte'`, el alto se mide solo) como pieza principal de la
  sección, con el **copy movido a la franja inferior** y un scrim que sube
  desde el borde de abajo (antes el scrim oscurecía el centro y el texto caía
  sobre la estatua). Encuadre: `CONFIG.door.roomLook.y = 0.55`.
  Ajuste 3: se quitó la leyenda inferior (`35 hawkish · 35 dovish · 29 neutral ·
  cada punto ↗ fragmento atribuido`) por pedido del autor: la sección respira
  más y el hint de interacción basta como pie. El reparto por tono se sigue
  calculando (lo usan las órbitas y otras lecturas).
  Ajuste 2 (tras ver la captura real): el pedestal se estiró en Y (`stretchY:
  1.6`) y se afinó de diámetro (0.70) porque plano y ancho se leía como una
  chapa oscura detrás del texto; la estatua bajó a 1.15 para que los pies
  queden por encima del bloque de copy.
- **Órbitas con estela** (`CONFIG.room.orbit`): 12 fragmentos REALES del corpus
  (4 por tono: oro hawkish, azul dovish, plata neutral) giran sobre el eje de
  la figura en planos inclinados y dejan una cola de ~4 s que se apaga hacia
  atrás. Un solo `THREE.Points` con shader propio (tamaño y opacidad por
  vértice, blending aditivo) y posición **analítica** —la estela se calcula
  muestreando el pasado, no guardando historial, así mide siempre el mismo
  arco a cualquier FPS—. Con `depthTest`, cuando un fragmento pasa por detrás
  de la estatua desaparece: eso es lo que vende el giro. Se pueden pasar con el
  cursor igual que la nube (abren su cita) y la activa se resalta.
  `prefers-reduced-motion` congela el sistema (las estelas quedan como arcos).
- **Nube de partículas continua**: ya no se apaga entre capítulos. ✅ en el sitio.
- **Coreografía de cámara** (`cameraChoreography` + `cameraStops`): deriva suave entre etapas después del cruce puerta → sala. ✅ en el sitio.
- **Compresión de GLBs (2026-08-31):** moneda 4.38 MB → **434 KB** y puerta 824 KB → **76 KB**
  con el mismo criterio que la balanza: re-encode Draco + texturas re-optimizadas
  (WebP 4:4:4; el mapa normal de la moneda y la pared en near-lossless). Fidelidad
  verificada por métricas (p95 del error angular 0°, PSNR ≥ 40 dB en píxeles
  visibles) y estructura intacta (mismos triángulos/bbox). El alfa no usado del
  color se aplanó con *bleed*: además mejora los mipmaps del borde de la moneda.
- **Nueva puerta Meshy (`Puerta_nueva.glb` → `puerta-nueva-draco.glb`, 2026-08-31):**
  20.2 MB → **650 KB** (−96.8%). Pipeline `@gltf-transform/cli` 4.4.2: `weld` +
  `simplify` (341,532 → **44,392** triángulos, error p95 ≈ 1% del bbox) + texturas
  2048 JPEG → **1024 WebP** (baseColor 108 KB / normal 33 KB / metalRough 49 KB,
  q85/q90/q80) + Draco (posición 14, normal 10, uv 12). `validate`: 0 errores,
  0 warnings; decode verificada con el SDK (36,768 vértices). Pendiente: adaptar
  el loader de `index.html` (la malla se llama `mesh`, no `toroide`/`cubo`).
- **Fuentes self-hosted** (`fonts/*.woff2` + `@font-face`): ✅ completado el 2026-08-30 (ver `fonts/README.md`).
- **HUD "La Sala de Deliberaciones"** (`#chapterHud`): pendiente (no implementado).
- **Descubrimiento** (`Evidencia n/100` en localStorage): pendiente (no implementado).
- **Recorrido guiado** (`#guidedTour`): pendiente (no implementado).
- **Audio**: desactivado por decisión del autor (no se pondrá música por ahora). El mecanismo queda documentado en `PLAN_NIVEL_PREMIUM.md` por si se retoma.

### Tu lista de tareas (las que dependen de ti)

1. **Modelar figuras Blender** → `figures/README.md`. ✅ Balanza lista; quedan
   `inflacion.glb`, `brote.glb`, `acta.glb`, `corpus.glb`, `campana.glb`.
2. **Ajustar `js/figures.js`** si cambian posiciones/escalas de las figuras.
3. **Definir moodboard** (el audio quedó desactivado; ver `PLAN_NIVEL_PREMIUM.md`).
