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
# Con Python
python -m http.server 8000

# Abrir en el navegador
# http://localhost:8000
```

## Estructura del proyecto

```
├── index.html              ← Archivo principal (CSS + JS + Three.js inline)
├── js/
│   ├── quotes.js           ← 99 citas de reuniones del Banco Central
│   ├── three.module.js     ← Three.js core
│   ├── vendor/             ← GSAP, D3, Lenis, SplitText
│   ├── loaders/            ← GLTFLoader, DRACOLoader
│   ├── utils/              ← BufferGeometryUtils
│   ├── controls/           ← OrbitControls
│   ├── environments/       ← RoomEnvironment
│   └── objects/            ← Reflector
├── figures/
│   ├── balanza.glb         ← Estatua de La Justicia (Draco, 177 KB)
│   └── soporte.glb         ← Pedestal de la estatua (Draco, 28 KB)
├── monedav5-draco.glb      ← Modelo 3D de moneda (Draco + texturas WebP, 434 KB)
├── puerta-draco.glb        ← Modelo 3D de puerta (Draco + texturas WebP, 76 KB)
└── servidor.bat            ← Script para servidor local en Windows
```

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
