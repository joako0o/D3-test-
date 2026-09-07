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
npm run perf         # mide la fluidez del hilo principal haciendo scroll (ver § Fluidez)
npm run lint         # ESLint sobre el código propio: variables sin definir, imports sin usar…
npm run format:check # Prettier sobre scripts/, tools/ y los JSON (format → los reescribe)
```

`npm run check` necesita las dependencias de desarrollo una sola vez
(`npm install`). No hay paso de build: lo que hay en el repo es lo que se
publica.

### Calidad de código y SEO

- **ESLint** (`eslint.config.mjs`): solo reglas que cazan errores reales; las
  bibliotecas copiadas (three.js, loaders, `js/vendor/`) quedan fuera. Debe
  terminar en `0 problems` antes de subir.
- **Prettier** (`.prettierrc.json`, `.prettierignore`): formatea `scripts/`,
  `tools/` y los JSON. Los fuentes de `js/` y `css/` están excluidos a
  propósito: tienen comentarios alineados a mano y un reformateo masivo solo
  ensuciaría el historial. `.editorconfig` fija sangría/EOL para cualquier editor.
- **Lighthouse** (Chrome → F12 → pestaña *Lighthouse*): la referencia es
  accesibilidad 100 · buenas prácticas 100 · SEO 100. El puntaje de
  rendimiento solo vale medido en un navegador real (no en el sandbox por
  software).
- **SEO**: `robots.txt`, `sitemap.xml`, `<link rel=canonical>`, Open Graph +
  Twitter Card con `og-image.jpg` (1200×630) y datos estructurados JSON-LD
  (`WebPage` + `Dataset`) en `index.html`. Tras publicar, verificar la
  propiedad en Google Search Console y enviar `sitemap.xml` una vez.

### Móvil

- Las reglas de teléfono viven en `css/20-breakpoints.css` (`≤768`, `≤600`,
  `≤430`, y `≤430 × alto ≤620`). Contrato que hay que conservar:
  - Los contenedores fijados con `overflow-y:auto` (`.word-evolution-pin-wrapper`,
    `.voices-pin-wrapper`, `.acts-pin-wrapper`) llevan `overscroll-behavior:
    auto` en móvil. Con `contain` el dedo desplaza el interior hasta el tope
    y la página deja de avanzar (trampa de scroll); en escritorio la rueda
    encadena igual, por eso no se notaba.
  - Pipeline horizontal: cada panel mide `84vw` y el relleno lateral es
    `8vw`, así que a 0, ⅓, ⅔ y 1 del recorrido hay exactamente un panel
    centrado; `.pipe-viewport` reserva bandas para la cabecera y el riel.
  - Objetivos táctiles ≥ 32 px (chips, selector de año, filas de evidencia)
    y texto de contenido ≥ 11 px; los kickers decorativos no cuentan.
  - Táctil en el lienzo: el toque se decide en `pointerup` (un deslizamiento
    que arranca sobre la nube no abre el panel) y el radio de acierto es
    `CONFIG.interaction.touchRadiusMul` veces el del ratón. Los puntos del
    mapa de intervenciones llevan un círculo de toque invisible de 28 px.
- Para comprobarlo sin teléfono: Chrome → F12 → icono de dispositivo
  (Ctrl+Shift+M), elegir *iPhone 12/13* o *Pixel 7* y recorrer la pieza con
  el ratón como si fuera un dedo. Los puntajes reales de PageSpeed Insights
  solo valen sobre la URL publicada.

## Estructura del proyecto

Cinco capas. La regla es que cada una solo puede depender de las de arriba.

| Capa | Dónde | Qué es |
|---|---|---|
| **Datos** | `js/data/quotes.js` | Las 99 citas. Script clásico, publica `window.QUOTES`. |
| **Configuración** | `js/core/config.js` | Todos los números de la escena. Ni una línea de lógica. |
| **Funciones puras** | `js/data/topics.js`, `js/core/utils.js` | Sin DOM, sin Three.js. Testables tal cual. |
| **Entorno** | `js/core/viewport.js` | El tamaño del lienzo. Lee el DOM, nada más. |
| **Estado compartido** | `js/core/interaction-state.js` | Lo único que las secciones y la escena 3D se dicen entre sí. |
| **Sistemas** | `js/scene/figures.js`, `js/scene/build-door.js` | Figuras 3D (carga, apilado, placeholders) y la puerta BCCh procedural con pivotes. |
| **Secciones** | `js/sections/*.js` | Una sección de scrollytelling cada uno. Reciben sus datos por parámetro. |
| **Aplicación** | `js/main.js` | La escena, el bucle de render y el scrollytelling. |

**Las dos reglas que hacen que esto se sostenga:**

1. **Una sección no importa `main.js`.** Nunca. Lo que necesita de la
   aplicación —`quotes`, `openQuote`, `closeQuotePanel`— lo recibe en la firma
   de su `init`. Si mañana hay que probar una sección aislada, se le pasan
   datos falsos y funciona.
2. **El único puente con el 3D es `js/core/interaction-state.js`.** Nada más.
   Una sección puede querer saber qué cita está señalada; no puede tocar la
   cámara, ni las partículas, ni el renderer.

```
├── index.html              723 líneas · SOLO marcado: ni un <style>, ni un <script> con cuerpo
├── css/                    22 hojas · 4.149 líneas · el prefijo numérico ES el orden de cascada
│   └── README.md           qué hace cada hoja y por qué está en ese número
├── js/
│   ├── main.js               · escena 3D + bucle de render + scrollytelling (entrada)
│   ├── core/
│   │   ├── config.js         · cámara, luces, moneda, puerta, órbitas, La Sala, HERO
│   │   ├── interaction-state.js · el ÚNICO puente entre las secciones DOM y la escena 3D
│   │   ├── viewport.js       · getViewportSize() / isCompactWidth(), el tamaño del lienzo
│   │   └── utils.js          · particleRandom, clamp, getQuoteAxisSentiment (puros)
│   ├── scene/
│   │   ├── figures.js        · sistema de figuras (carga GLB, apila sobre pedestal, placeholders)
│   │   └── build-door.js     · puerta BCCh procedural: respaldo si el GLB no carga (port del .py de Blender)
│   ├── data/
│   │   ├── quotes.js         · las 99 citas (dato, no código; <script> clásico)
│   │   └── topics.js         · taxonomía temática + normalización de texto (puro)
│   ├── sections/             · una sección de scrollytelling por archivo
│   │   ├── act-browser.js      · "Navegador de actas"
│   │   ├── voice-explorer.js   · "Las voces" — directorio editorial
│   │   ├── word-evolution.js   · "El lenguaje cambia"
│   │   ├── timeline.js         · "Índice de orientación por año"
│   │   └── axes-map.js         · "Mapa de intervenciones" (D3)
│   ├── lib/three/            · Three.js r160 + addons (GLTF+Draco, BufferGeometryUtils, RoomEnvironment)
│   ├── vendor/               · GSAP, ScrollTrigger, SplitText, CustomEase, D3, Lenis, Draco
│   └── legacy/               · código no importado hoy (p. ej. dissolve.js), se conserva para retomar
└── js/README.md              · mapa y convenciones del código
├── tools/
│   ├── smoke-test.mjs     204 · `npm run check`
│   └── build_door.py         generador paramétrico de la puerta BCCh (Blender, Cycles/EEVEE)
├── scripts/
│   ├── lib/chromium.mjs    el Chromium con SwiftShader, compartido por las tres herramientas de abajo
│   ├── perf/measure.mjs    `npm run perf` — mide el coste del hilo principal en scroll y reposo
│   └── screenshots/
│       ├── capture.mjs     `npm run shots`
│       └── hero-check.mjs  `npm run hero:check`
├── figures/                balanza.glb (177 KB) · soporte.glb (28 KB) · README.md
├── monedav5-draco.glb      434 KB · la moneda (se carga en el hero)
├── Puerta_bcch_v3.glb      282 KB · la puerta BCCh que se carga hoy: hojas separadas
│                           (Puerta_Izquierda/Derecha). OJO: main.js NO usa el GLB tal
│                           cual — buildOpenableBcchDoor() descarta el muro (una losa
│                           maciza sin vano), lo reconstruye con vano y jambas, centra
│                           el pórtico, pone las bisagras en el canto de cada hoja
│                           (las del GLB están en la esquina de la caja) y separa las
│                           medallas de bronce de las hojas para fijarlas en la pared,
│                           como en el edificio real. El porqué, medido, está en el
│                           comentario BCCH_V3 de main.js.
├── tools/door-diag.html      visor de diagnóstico de la puerta BCCh: silueta con luz
│                           plana, apertura por URL, corte en planta (ver cabecera)
├── og-image.jpg             imagen para las tarjetas de redes (meta og:image)
├── servidor.bat             doble clic para `python -m http.server` en Windows
└── docs/
    ├── NARRATIVA.md          el arco narrativo: qué cuenta hoy y qué debería contar
    └── PLAN_NIVEL_PREMIUM.md hoja de ruta "nivel pagado" (fases hechas y pendientes)
```

> **Lo que ya no está (limpieza 2026-09-05).** Se retiraron del árbol las
> puertas que no se cargaban —`Puerta_bcch (1).glb` (1,1 MB, export anterior),
> `puerta-draco.glb` (76 KB, su versión Draco) y `puerta-nueva-draco.glb`
> (650 KB, prueba de Meshy)—, su visor `preview-puerta.html` y los addons
> que solo ese visor usaba (`OrbitControls.js`, `Reflector.js`). Todo sigue en
> el historial de git si algún día hace falta (`git log --all -- puerta-draco.glb`).

### Mapa de `js/main.js`

Es el archivo que hay que saber recorrer. Va en este orden:

| Líneas | Región |
|---|---|
| 1–385 | imports, constantes del DOM, escena, cámara, luces, estado de módulo, warmup |
| 386–467 | figuras de La Sala + rig de luces de la puerta |
| 468–716 | moneda, composición del hero |
| 717–1716 | la puerta (Acto 2): respaldo procedural, GLB `Puerta_bcch_v3`, `BCCH_V3` + `buildOpenableBcchDoor()` (1388–1660) |
| 1717–1903 | enjambre de partículas (memoria trazable) |
| 1904–2544 | órbitas de La Sala + `openQuote()` + navegación por teclado |
| 2545–2672 | coreografía de cámara (`cameraChoreographyStops`) |
| **2673–3341** | **`animate()`** — el bucle de render |
| 3342–3532 | panel de cita, layout/resize, objetivos de partículas |
| 3533–3750 | hook de señales, scrubber, hooks `?debug`, Lenis |
| 3751–4398 | todos los `ScrollTrigger`, sección por sección |
| 4399–4545 | "técnicas premium": color de fondo, parallax, velocidad de scroll |

Los números envejecen a cada commit. Para regenerar el mapa:

```bash
grep -n "^   [A-ZÁÉÍÓÚÑa-z].*—\|^function animate" js/main.js
```

### Dónde va cada cosa nueva

- **Un número que cambia cómo se ve algo** → `js/core/config.js`. Si estás escribiendo
  un literal numérico en `main.js`, casi seguro es un error.
- **Una hoja de estilo nueva** → `css/NN-nombre.css` con el número que le toque
  por cascada, y anótala en `css/README.md`. El prefijo no es decorativo.
- **Marcado** → `index.html`, y nada más que marcado.
- **Una figura 3D** → `figures/` + una entrada en `FIGURE_DEFS` de `js/scene/figures.js`.
  El sistema dibuja un placeholder si el GLB aún no existe.

### Rutas: la trampa que cuesta una tarde

Se resuelven contra dos bases distintas y no hay forma de saberlo mirando:

- Los `import` de `js/main.js` se resuelven contra **`js/`**, y dentro de cada
  carpeta contra el archivo (`./core/config.js`, `./scene/figures.js`, …).
- El `importmap` apunta a **`js/lib/three/`**; los GLB, el decodificador Draco y
  las figuras se resuelven contra **`index.html`** (raíz: `figures/soporte.glb`).
- El CSS se resuelve contra **la hoja**, por eso `fonts.css` dice `../fonts/`.

### Deuda estructural (medida, no impresiones)

Dónde estaba el proyecto y dónde está ahora:

| Síntoma | Al empezar | Ahora |
|---|---|---|
| `main.js` acapara el código | 4.742 líneas = **88 %** del JS propio | 4.285 = **55 %** (de 7.803 líneas propias, sin three.js ni vendor) |
| Estado global suelto | **52 `let` de módulo** | **51**, y el estado compartido agrupado en objetos de `js/core/interaction-state.js` |
| Una función hace demasiado | `animate()` = 485 líneas | `animate()` = **~640 líneas** — sin tocar, es el Paso 3 |
| Secciones que no pertenecen ahí | 5 secciones dentro de `main.js` = **1.392 líneas** | **0** |
| El archivo base del CSS es el que más pisa | `00-tokens-base.css`: **42 `!important`** de los 68 | igual, sin tocar |

> Desde el paso 2, `main.js` volvió a crecer (3.395 → 4.285) con la puerta BCCh
> (`Puerta_bcch_v3.glb`, con hojas y bisagras propias, + la hoja procedural de
> `js/scene/build-door.js`), su rig de luces y el precalentado de shaders. Las
> secciones siguen fuera: el crecimiento es de la escena, no del scrollytelling.

Lo que queda es `animate()`, y es lo más delicado del archivo: ~640 líneas que
actualizan seis sistemas por frame en un orden que importa y que nadie ha
escrito. **El plan de salida** está en "Lo que aún está pendiente de ordenar".

## Cómo se trabaja en este repo

Esto está escrito porque el proyecto llegó a tener **9.077 líneas en un solo
`index.html`** (3.769 de CSS + 4.713 de JS + 588 de HTML), con 62 `!important`
y sin ninguna comprobación automática. Funcionaba, pero cada cambio era una
apuesta. Las reglas de abajo existen para que no vuelva a pasar.

El JS estaba igual de concentrado y ya no lo está: las cinco secciones de
scrollytelling viven en `js/sections/`, y `main.js` bajó de 4.742 a 3.395
líneas (hoy ha vuelto a 4.285 con la puerta BCCh y su rig de luces, pero solo
código de escena, no de secciones). Lo medido está en "Deuda estructural"; lo
que queda por hacer, en el punto 5.

### 1. Cada cosa en su archivo

| Si vas a tocar… | El archivo es… |
|---|---|
| Un número de la escena 3D (cámara, luz, velocidad, tamaño) | `js/core/config.js` |
| Cómo se ve algo | el `css/*.css` de esa sección |
| El marcado de una sección | `index.html` |
| Una figura 3D, su pedestal o su escala | `js/scene/figures.js` |
| Una sección de scrollytelling (DOM, D3, listas, filtros) | `js/sections/<sección>.js` |
| Qué cita está señalada o fijada | `js/core/interaction-state.js` |
| Una función pura sin DOM ni Three.js | `js/core/utils.js` o `js/data/topics.js` |
| La escena 3D, el bucle de render o los `ScrollTrigger` | `js/main.js` |
| Una comprobación automática | `tools/` o `scripts/screenshots/` |

**`index.html` es solo marcado.** Nada de `<style>`, nada de `<script>` con
código dentro, nada de `style="..."` nuevo. Si te descubres añadiendo CSS o JS
ahí, es la señal de que estás repitiendo el problema.

**`js/core/config.js` antes que un número mágico.** Un valor que ajusta cómo se ve
la escena va con nombre en CONFIG, no incrustado a 3.000 líneas de distancia.

**Una sección nueva se escribe así**, y en este orden:

```js
// js/sections/mi-seccion.js
import { pinQuote } from '../core/interaction-state.js';   // si necesita la selección
export function initMiSeccion({ quotes, openQuote }) { // TODO lo demás, por parámetro
  const root = document.getElementById('mi-seccion');
  if (!root) return;                                   // sin su DOM, no hace nada
  …
}
```

Y en `main.js`, **la llamada va exactamente donde estaba el código**. No unas
líneas más arriba porque quede más ordenado: los `ScrollTrigger` con `pin`
cambian la altura del documento y el orden de ejecución es parte del contrato.
Esto ya rompió una sección una vez (ver el Paso 1 del punto 5).

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
`js/main.js` y documentada con diagrama en `js/core/config.js` → `HERO`:

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
e `isCompactWidth()` salieron con ellas a `js/core/viewport.js`.
**main.js: 4.742 → 4.241 líneas.**

> **La lección del Paso 1, que vale para los demás.** Al mover la llamada a
> `initTimeline()` unas líneas más arriba, la sección dejó de fijarse y el
> gráfico no se dibujaba. Los `ScrollTrigger` con `pin` cambian la altura del
> documento, así que el ORDEN DE EJECUCIÓN es parte del contrato. Extraer
> código a un módulo es seguro; cambiar cuándo se ejecuta, no. Lo cazó
> `npm run shots` comparando píxeles, no la lectura del diff.

**Pasos 2 y 4 — las tres secciones que tocaban el 3D, y el estado global. ✅ HECHO.**
Se hicieron juntos porque son el mismo problema. `initActBrowser()`,
`initVoiceExplorer()` e `initD3Axes()` no dependían de la escena: dependían de
saber *qué cita está señalada*. Eso es una selección, no un renderer.

Primero salió `js/core/interaction-state.js`, que agrupa los ocho `let` sueltos que
cruzaban la frontera —`hoverIndex`, `pinnedIndex`, `voiceFocusParticipant`,
`d3Scales`, `focusReturnCard`…— en cuatro objetos con nombre (`selection`,
`voiceFocus`, `axesState`, `particleFocus`) más los verbos que se hacían con
ellos: `pinQuote()`, `peekQuote()`, `clearSelection()`, `isPinned()`. Leer
`pinQuote(i)` dice qué pasa; `pinnedIndex = i` no decía nada.

Con la frontera hecha explícita, las tres secciones se fueron detrás sin
resistencia. **main.js: 4.241 → 3.395 líneas.**

> **Las dos lecciones del Paso 2.**
> **(a) Analizar dependencias buscando solo `let`/`const` no sirve.** Las
> declaraciones `function` de nivel de módulo no aparecen en esa búsqueda, así
> que un módulo se extrae "limpio" y revienta en tiempo de ejecución llamando a
> algo que se quedó atrás (`normalizeTopicText`, `getQuoteAxisSentiment`).
> Lo cazó `npm run check`, no la lectura.
> **(b) Pasar una función como argumento fuerza a evaluarla ya.**
> `closeQuotePanel` era un `const` con flecha declarado 500 líneas después de
> donde ahora se inyecta: funcionaba solo porque hasta entonces únicamente se
> leía dentro de manejadores de evento. Pasó a ser una declaración `function`,
> que sí se iza. La TDZ estaba ahí desde siempre; la inyección la destapó.

Efecto lateral que merece la pena: `getQuoteAxisSentiment()` —dónde cae una
cita en el eje hawkish/dovish— la usaban el mapa SVG y la nube de partículas
por separado. Ahora vive una sola vez en `js/core/utils.js`. Antes podían
desincronizarse y nadie se habría enterado.

**Paso 3 — partir `animate()`. ⬅ SIGUIENTE.**
~640 líneas que actualizan seis sistemas distintos por frame. Cada uno tiene su
propio estado y se puede extraer a `update<Sistema>(t, dt)`. Este es el que más
cuidado pide: el orden de las actualizaciones importa y no está documentado.

**Cómo se valida un paso de estos.** Antes no había forma de verificar un
refactor de este tamaño; ahora hay tres redes:

```bash
npm run check                       # arranca sin navegador: imports, ids, excepciones
npm run shots -- --w=1440 --h=900   # las 13 secciones con WebGL real, sale 1 si hay errores
npm run hero:check                  # la portada en 12 viewports
npm run perf                        # coste del hilo principal en scroll y reposo (ver § Fluidez)
```

El criterio es **equivalencia de píxeles**: capturar antes, refactorizar,
capturar después y comparar. Menos del 0,5 % de píxeles distintos = no ha
cambiado nada; ese es el ruido de las partículas animadas del fondo 3D.

Con una excepción que hay que saber leer: **el hero y La Sala tienen animación
continua** (la moneda gira, las partículas orbitan). Ahí el diff numérico sale
alto —10 % en el hero— sin que haya cambiado nada, porque las dos capturas
pillan la moneda en distinta fase de giro. En esas dos secciones el diff no
decide: hay que mirar las dos imágenes. Las once restantes sí son deterministas
y en el Paso 2 quedaron todas por debajo del 0,4 %.

**Lo que NO conviene tocar todavía:** los `style="..."` inline que quedan en
`index.html` son de la maqueta original y varios los pisa GSAP en caliente;
moverlos a CSS sin comprobarlo uno a uno rompe animaciones.

## Fluidez (medida, no impresiones)

"Va más suave" sin número era justo la clase de afirmación que este proyecto
dejó de aceptar, así que la fluidez tiene su propia red: `npm run perf`.
Abre Chromium con WebGL por software, hace scroll de verdad (rueda, no
`scrollTo`) de ida y vuelta por todo el documento, y mide el coste del hilo
principal con una traza de Chrome y un perfil de CPU por muestreo. Los FPS
absolutos NO son comparables con una GPU real (rasteriza SwiftShader); lo
comparable es el trabajo del hilo principal —scripting, style, layout,
reflujos, compilación de shaders, draw calls— y por eso los presupuestos van
sobre eso.

Medido en 1440×900, recorrido completo, antes y después del trabajo del
2026-09-02:

| Métrica durante el scroll | Antes | Después | |
|---|---|---|---|
| Hilo principal ocupado | 19.540 ms | 5.300 ms | −73 % |
| scripting (por segundo) | 356 ms/s | 63 ms/s | −82 % |
| bucle rAF (Lenis+GSAP+animate) | 175 ms/s | 29 ms/s | −83 % |
| peor tarea larga | 11.047 ms | 156 ms | −98,6 % |
| programas compilados en pleno scroll | 5 | 0 | |
| cortina de carga | — | ≈7,3 s | el coste se paga aquí |

Lo que se hizo (todo en `js/main.js` y `js/core/viewport.js`):

1. **Precalentado de la escena tras la cortina** (`warmUpScene()`). La primera
   pinta de un material compila su programa y sube sus texturas de forma
   síncrona, y eso caía en mitad del scroll (el congelamiento de 11 s). Ahora
   se compilan los dos estados de luces y se provoca la introspección de
   uniforms sin pintar nada, antes de levantar la cortina.
2. **`renderer.debug.checkShaderErrors = DEBUG_MODE`.** En producción
   preguntar al driver por el log de cada shader es trabajo tirado (llegó a
   ser el 69 % del hilo principal); con `?debug` se conserva el aviso.
3. **Snapshot de viewport en el bucle de render.** `getViewportSize()` lee
   `clientWidth/clientHeight` y con el estilo sucio fuerza un reflujo; se
   llamaba dos veces por frame en `animate()` (1.900 ms y 4.410 reflujos).
   `getViewportSnapshot()` lo cachea e invalida con resize/orientación/
   visualViewport.
4. **`updateScrubber()` sin lecturas por evento.** El alto del documento se
   cachea y se invalida en `resize` y `ScrollTrigger.refresh`, y sin `?debug`
   no se escribe en el HUD oculto.
5. **Entrar siempre por la portada.** El navegador restauraba el scroll de la
   visita anterior y la página "nacía" a mitad de documento: `scatterProgress`
   arrancaba en 1 (moneda invisible) y Lenis quedaba desincronizado, así que al
   subir rápido al inicio la moneda podía no reconverger hasta pasar por otra
   etapa. Ahora `main.js` fija `history.scrollRestoration = 'manual'` y
   devuelve el scroll a 0 en el arranque, en `load` y en `pageshow` (bfcache),
   antes de que se creen observadores, ScrollTriggers y Lenis.

### Tres trampas que costaron mediciones enteras

- **Los métodos del prototipo WebGL se instalan perezosos**: en
  `document-start` el prototipo viene vacío y sus métodos no son escribibles;
  hay que `Object.defineProperty` y reintentar por frame. Sin esto, los
  contadores del arnés fallan en silencio.
- **Pintar en un render target calienta otros programas**: three.js cambia el
  `outputColorSpace` según el destino (`js/lib/three/three.module.js:20753`), así que
  una pinta de calentamiento calentaba variantes que nadie usaba (57 programas
  creados, 16 sin usar y 9 fríos). Hay que provocar `program.getUniforms()`
  sobre el programa que `compile()` deja en el material.
- **`compile()` no adquiere la variante DoubleSide de los materiales
  transparentes** (`prepareMaterial` los parte en dos pasadas y deja
  `needsUpdate`): con `forceSinglePass = true` temporal se adquiere la
  variante que de verdad se dibuja.

### Lo que queda (medido, no adivinado)

- **~2.584 reflujos forzados por pasada**: no son de este código (el perfil no
  encuentra ni una lectura de layout propia); vienen del `window.scrollTo` de
  Lenis por frame y del style+layout que Blink fuerza al componer. Es el
  suelo de una página que anima el DOM; bajar de ahí es trabajo futuro, no un
  presupuesto que se pueda exigir hoy.
- **Los frames >50 ms** en este entorno los domina el raster por software; se
  informan pero no suspenden la ejecución.

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

Con el plan de `docs/PLAN_NIVEL_PREMIUM.md`, el proyecto avanza hacia una pieza
"de oficio" en un solo mundo visual. Estado real verificado en la revisión
2026-08-30:

- **Gabinete de figuras** (`#figureCabinet`): lista las figuras 3D y su estado. ✅ en el sitio.
- **Sistema de figuras** (`js/scene/figures.js`): intenta cargar cada `figures/*.glb`; si no existe aún, dibuja un placeholder. ✅ en el sitio.
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
- **Compresión de GLBs (2026-08-31):** moneda 4.38 MB → **434 KB** con el mismo
  criterio que la balanza: re-encode Draco + texturas re-optimizadas (WebP 4:4:4;
  el mapa normal en near-lossless). Fidelidad verificada por métricas (p95 del
  error angular 0°, PSNR ≥ 40 dB en píxeles visibles) y estructura intacta
  (mismos triángulos/bbox). El alfa no usado del color se aplanó con *bleed*:
  además mejora los mipmaps del borde de la moneda.
  La puerta que se carga hoy es `Puerta_bcch_v3.glb` (282 KB, ya con Draco);
  las puertas anteriores y la prueba de Meshy se retiraron del repo el
  2026-09-05 (ver la nota bajo el árbol de archivos). Receta usada para la
  Meshy, por si se repite: `@gltf-transform/cli` `weld` + `simplify` (341k →
  44k triángulos, error p95 ≈ 1% del bbox) + texturas 1024 WebP + Draco
  (posición 14, normal 10, uv 12).
- **Fuentes self-hosted** (`fonts/*.woff2` + `@font-face`): ✅ completado el 2026-08-30 (ver `fonts/README.md`).
- **HUD "La Sala de Deliberaciones"** (`#chapterHud`): pendiente (no implementado).
- **Descubrimiento** (`Evidencia n/100` en localStorage): pendiente (no implementado).
- **Recorrido guiado** (`#guidedTour`): pendiente (no implementado).
- **Audio**: desactivado por decisión del autor (no se pondrá música por ahora). El mecanismo queda documentado en `docs/PLAN_NIVEL_PREMIUM.md` por si se retoma.

### Tu lista de tareas (las que dependen de ti)

1. **Modelar figuras Blender** → `figures/README.md`. ✅ Balanza lista; quedan
   `inflacion.glb`, `brote.glb`, `acta.glb`, `corpus.glb`, `campana.glb`.
2. **Ajustar `js/scene/figures.js`** si cambian posiciones/escalas de las figuras.
3. **Definir moodboard** (el audio quedó desactivado; ver `docs/PLAN_NIVEL_PREMIUM.md`).
