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
  módulo, actualiza las rutas de quien lo importa y el `modulepreload` de
  `index.html`.
- **El `importmap` vive en `index.html` y apunta a `js/lib/three/`.** No
  referencies `three` desde una ruta absoluta: usa `import * as THREE from 'three'`
  o el specifier `'three/addons/...'`.
- **Datos**: `quotes.js` se carga como `<script defer>` (script clásico) porque
  las secciones D3 y la escena leen `window.QUOTES`. Todo lo demás es un módulo.
- **No muevas `vmo` de `vendor/` ni de `lib/three/`**: son dependencias.
- **No agregues lógica 3D pesada a `core/config.js`**: es configuración, no render.
- **Código sin usar**: va a `legacy/`, no a la basura sin aviso; puede servir
  para retomar una feature.

## Ruta de carga principal

```
index.html
  └─ js/main.js
       ├─ js/core/config.js
       ├─ js/core/viewport.js
       ├─ js/core/utils.js
       ├─ js/core/interaction-state.js
       ├─ js/scene/build-door.js
       │    └─ js/lib/three/addons/utils/BufferGeometryUtils.js
       ├─ js/scene/figures.js
       │    └─ js/lib/three/addons/loaders/{GLTFLoader,DRACOLoader}.js
       ├─ js/sections/*.js
       └─ js/vendor/*.js (cargados antes por <script defer>)
```
