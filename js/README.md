# JS — estructura del proyecto

El JavaScript de esta pieza está separado por responsabilidad. `main.js`
sigue siendo la entrada: lo único que hace es construir la escena y conectar
los módulos. **No crees un archivo nuevo en la raíz de `js/` sin antes leer
esta tabla.**

| Carpeta / archivo | Qué contiene |
|---|---|
| `main.js` | Punto de entrada: escena, cámara, coreografía, bucle `animate()` e inicialización de los módulos de sección. |
| `core/` | Lógica pura y de control sin Three.js visual: `config.js` (números), `viewport.js` (tamaño del lienzo), `interaction-state.js` (estado compartido), `utils.js` (helpers puros). |
| `scene/` | Objetos 3D propios: `figures.js` (figuras/dioramas de La Sala) y `build-door.js` (puerta BCCh procedural). |
| `data/` | Datos: `quotes.js` (script clásico, publica `window.QUOTES`) y `topics.js` (taxonomía temática, módulo ES). |
| `lib/three/` | Three.js y sus addons (glTF, Draco, RoomEnvironment). **No se edita.** |
| `vendor/` | GSAP, ScrollTrigger, SplitText, CustomEase, Lenis y d3. **No se edita.** |
| `sections/` | Un módulo por gráfico/sección (evolución del lenguaje, voces, actas, ejes, timeline). |
| `legacy/` | Código que por ahora no se importa desde `main.js` (p. ej. `dissolve.js`). Se conserva para retomar, no entra al bundle. |

## Convenciones

- **Los imports dentro de `js/` son relativos al archivo.** Si mueves un
  módulo, actualiza las rutas de quien lo importa.
- **Los `js/*.js` son la única verdad que se edita; `js/app.js` es DERIVADO.**
  `npm run build:js` (esbuild) bundlea `main.js` + su grafo estático
  (core/, scene/) + three.js tree-shakeado + los addons + las cinco secciones
  en **un solo `js/app.js`** minificado, y minifica `quotes.js` en
  `js/data/quotes.min.js`. No edites `app.js` ni `quotes.min.js` a mano: se
  pisan. En el bundle no hay `importmap` ni `modulepreload` de three/addons:
  el especificador desnudo `'three'` lo resuelve esbuild desde
  `node_modules/three@0.160.0` (fuente modular, para poder podar). Si cambias
  un módulo, sube el `?v=` de `js/app.js` en `index.html` y corre
  `npm run build:js`; `npm run check` avisa si el bundle quedó viejo.
- **`three` se importa SIEMPRE como `import * as THREE from 'three'`** (o
  `'three/addons/...'`). Nada de rutas relativas a `js/lib/three/`: es el
  mismo archivo que antes, pero el build lo resuelve por specifier para que el
  tree-shaking funcione.
- **Datos**: `quotes.js` se carga como `<script defer>` (script clásico) porque
  las secciones D3 y la escena leen `window.QUOTES`. Todo lo demás es un módulo.
- **No muevas `vmo` de `vendor/` ni de `lib/three/`**: son dependencias.
- **No agregues lógica 3D pesada a `core/config.js`**: es configuración, no render.
- **Código sin usar**: va a `legacy/`, no a la basura sin aviso; puede servir
  para retomar una feature.

## Ruta de carga principal

```
index.html
  ├─ js/app.js (bundle GENERADO por scripts/build-js.mjs)
  │    └─ js/main.js ─┬─ js/core/{config,viewport,utils,interaction-state,deferred-boot}.js
  │                   ├─ js/scene/{build-door,figures}.js ─ three + addons
  │                   ├─ js/sections/*.js (inlinados)
  │                   └─ three@0.160.0 (tree-shaken)
  ├─ js/data/quotes.min.js (derivado de quotes.js, <script defer>)
  └─ js/vendor/*.js (GSAP, ScrollTrigger, SplitText, CustomEase, Lenis · <script defer>)
```
