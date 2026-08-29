# Apuntes Técnicos — Técnicas Premium para el Proyecto D3.js

Referencia técnica recopilada de investigaciones sobre sitios premium (jerrythewebdev, sandylabs.ai, Codrops, etc.).

---

## 1. GSAP ScrollTrigger + Three.js — Cinematic Scroll

**Fuente principal**: Codrops tutorials (Joseph Santamaria, 2025-2026)

### Core Pattern
```javascript
// 1. Mutable refs para cámara y targets
const cameraAnim = { x: 0, y: 0, z: 8 }
const targetAnim = { x: 0, y: 15, z: 0 }

// 2. Timeline scrubbed por scroll
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
})

// 3. Definir "shots" de cámara como secciones
tl.to(cameraAnim, { x: 0, y: 0, z: 8, duration: 1, ease: "cinematicSilk" })
  .to(cameraAnim, { x: 0, y: 5, z: 5, duration: 1, ease: "cinematicFlow" })
  .to(cameraAnim, { x: 1.5, y: 2, z: 2, duration: 2, ease: "cinematicLinear" })
```

### Custom Eases para Cinematic
```javascript
CustomEase.create("cinematicSilk",   "0.45,0.05,0.55,0.95")
CustomEase.create("cinematicSmooth", "0.25,0.1,0.25,1")
CustomEase.create("cinematicFlow",   "0.33,0,0.2,1")
CustomEase.create("cinematicLinear", "0.4,0,0.6,1")
```

### Texto Cinemático con SplitText
```javascript
const titleSplit = new SplitText(titleEl, { type: "chars" })
const textTl = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: `${p.scrollProgress.start}% top`,
    end: `${p.scrollProgress.end}% top`,
    scrub: 0.5,
  }
})

// Entrada: chars aparecen desde la izquierda
textTl.fromTo([titleSplit.chars], { x: -100, opacity: 0 }, {
  x: 0, opacity: 1,
  duration: 0.25,
  stagger: 0.02,
  ease: "power2.out"
})
// Salida: chars se van a la derecha
.to([titleSplit.chars], {
  x: 100, opacity: 0,
  duration: 0.25,
  ease: "power2.in"
})
```

---

## 2. Blender → Three.js Pipeline

**Fuente**: Codrops (Gaspard Hedde, 2026) + MasterAllArts + intelligentgraphicandcode.com

### Flujo completo
```
Blender (modelar) → Exportar GLB → gltf-transform (optimize) → Three.js (render)
```

### Exportación desde Blender
- **Formato**: glTF Binary (.glb) — single file, sin overhead base64
- **Apply Modifiers**: ON — bake subdivision, mirror, array
- **Compression**: OFF en export (ejecutar después con gltf-transform)
- **Textures**: JPEG (0.85) para color maps, PNG para normal maps
- **Custom Properties**: ON para runtime identification

### Optimización con gltf-transform
```bash
# 1. Deduplicar accessors y textures
gltf-transform dedup input.glb deduped.glb

# 2. Draco compression (80-90% reducción geometría)
gltf-transform draco deduped.glb compressed.glb

# 3. Resize textures (max 1024px web)
gltf-transform resize compressed.glb resized.glb --width 1024 --height 1024

# 4. Convertir a WebP (25-35% menor que JPEG)
gltf-transform webp resized.glb final.glb --quality 80

# 5. KTX2 (UASTC para detail-critical maps)
gltf-transform uastc resized.glb final-ktx2.glb
```

### Resultados típicos
| Stage | Tamaño | % del raw |
|-------|--------|-----------|
| Raw Blender export | 24.3 MB | 100% |
| Después de dedup | 18.1 MB | 74% |
| Después de Draco | 4.2 MB | 17% |
| Después de texture resize | 1.8 MB | 7% |
| Después de WebP | 1.1 MB | 4.5% |

### Compresión Draco
- **Reducción geometría**: 80-90%
- **Decompress time**: 200-500ms en mobile (aceptable)
- **Parámetros**: quantize_position=12 bits, quantize_normal=8 bits, quantize_texcoord=10 bits

### KTX2 Textures
- Texturas stay compressed en GPU (4-8x menor VRAM)
- 2048×2048 PBR set: ~48MB como PNG → ~6MB como KTX2
- Transcodes a formato nativo del device (ASTC, BC7, ETC2)

### Texture Budgets
| Propósito | Max resolución | Formato |
|-----------|---------------|---------|
| Hero product (llena viewport) | 2048×2048 | WebP o KTX2 |
| Modelo estándar | 1024×1024 | WebP |
| Environment/background | 1024×1024 | WebP o HDR |
| Normal maps | 1024×1024 | PNG o KTX2 |
| Thumbnails/objetos distantes | 512×512 | WebP |

### Progressive Loading
```javascript
// 1. Skeleton (rápido)
loader.loadAsync('/models/skeleton.glb').then(g => scene.add(g.scene));

// 2. Base model (async)
const base = await loader.loadAsync('/models/base.glb');
scene.remove(skeleton.scene);
scene.add(base.scene);

// 3. High-res textures (background)
const textures = await Promise.all([
  textureLoader.loadAsync('/textures/product-2k.webp'),
  textureLoader.loadAsync('/textures/product-normal-2k.webp')
]);
```

### Carga en Three.js
```javascript
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load('/assets/coin.glb', (gltf) => {
  scene.add(gltf.scene);
});
```

---

## 3. Blender Camera Path → Three.js Scroll

**Fuente**: Codrops (Gaspard Hedde, 2026)

### Concepto
Crear路径 de cámara en Blender → exportar JSON → reconstruir en Three.js con `THREE.CatmullRomCurve3`

```javascript
// En Blender: crear bezier curve, exportar como JSON
// En Three.js:
const curve = new THREE.CatmullRomCurve3(exportedPoints);

// Mover cámara por el path con scroll
const camProxy = { t: 0 }
const setCamT = gsap.quickTo(camProxy, 't', { duration: 1, ease: 'power3.out' })

let targetT = 0
const SENSITIVITY = 1 / (window.innerHeight * 4)

Observer.create({
  target: window,
  type: 'wheel,touch,pointer',
  onChange: (self) => {
    targetT += self.deltaY * SENSITIVITY
    setCamT(targetT)
  },
})

// En animate()
function animate() {
  const t = ((1 - camProxy.t) % 1 + 1) % 1
  const pathPos = curve.getPoint(t)
  camera.position.set(pathPos.x, pathPos.y, pathPos.z + CAM_Z)
}
```

### Scale into Focus
```javascript
for (const plane of planes) {
  const dist = camera.position.distanceTo(plane.position)
  const targetScale = dist < FOCUS_DIST
    ? computeFocusScale(dist, FOCUS_DIST, MAX_SCALE)
    : 1
  plane.userData.setScale(targetScale) // gsap.quickTo
}
```

---

## 4. Snap-Scroll con GSAP Observer

**Fuente**: Codrops (Joseph Santamaria, 2026)

### Problema
El sitio navega por escenas completas (no scroll libre). Cada sección debe bloquearse en su resting point.

### Solución
```javascript
// Observer unifica mouse/touch/trackpad
Observer.create({
  target: window,
  type: 'wheel,touch,pointer',
  onChange: (self) => {
    targetT += self.deltaY * SENSITIVITY
    setCamT(targetT)
  },
})

// Mode-switching state machine based on scene
// Swap scroll modes dynamically based on which scene the user is in
```

### Claves de implementación
- Usar `Observer` en vez de raw scroll events
- Modo snap para ciertas secciones, free scroll para otras
- Tuning de thresholds, velocities, easing curves
- "Nobody notices when it works, everybody feels when it does not"

---

## 5. Shader-Based Effects (GLSL)

**Fuente**: Codrops (varios autores)

### Scroll-Driven Vertex Displacement
```glsl
// Vertex shader
vec3 deformationCurve(vec3 position, vec2 uv) {
  position.y = position.y - (sin(uv.x * PI) * min(abs(uScrollVelocity), 5.0) * sign(uScrollVelocity) * -0.01);
  return position;
}
```

### Fragment Shader — Noise + Cursor Circle
```glsl
// Crear círculo que sigue el mouse
float circle = 1.0 - distance(
  vec2(uMouseOverPos.x, (1.0 - uMouseOverPos.y) * aspectRatio),
  vec2(vUv.x, vUv.y * aspectRatio)
) * 15.0;

// Noise
float noise = snoise(gl_FragCoord.xy);

// Modificar UVs solo al scroll o hover
texCoords.x += mix(0.0, circle * noise * 0.01, uMouseEnter + uScrollVelocity * 0.1);
```

### Object-Fit Cover en Shader
```glsl
vec2 coverUv(vec2 uv, vec2 resolution, vec2 imageResolution) {
  vec2 ratio = vec2(
    min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
    min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
  );
  return vec2(
    uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    uv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
}
```

### Parallax en WebGL (GPU)
```glsl
// En fragment shader
uv.x += uParallax * 1.0; // uParallax calculado en JS por posición en viewport
uv -= 0.5;
uv *= 0.85; // Scale down 85%, buffer para movimiento
uv += 0.5;
```

---

## 6. Anime.js v4.5 — Three.js Adapter

**Fuente**: animejs.com (2026)

### Nueva feature: Three.js Adapter
```javascript
import 'animejs/adapters/three'; // side-effect import

// Ahora animate() funciona directamente con Three.js objects
anime({
  targets: mesh.position,
  x: 5,
  y: 2,
  duration: 2000,
  ease: 'easeInOutQuad'
});

anime({
  targets: light,
  intensity: 2,
  duration: 1000
});
```

### Stagger 3D Grid
```javascript
anime({
  targets: instancedMesh,
  // Soporta grid 3D con {x, y, z}
  // from: 'random' con seed para reproducibilidad
});
```

### Bundle Size Módulos
| Módulo | Tamaño |
|--------|--------|
| Timer | 5.60 KB |
| Animation | +5.20 KB |
| Timeline | +0.55 KB |
| Scroll | +4.30 KB |
| Draggable | +6.41 KB |

### Scroll Observer API
```javascript
// Trigger animations on scroll
anime({
  targets: '.element',
  translateY: [100, 0],
  scrollObserver: {
    trigger: '.element',
    start: 'top center'
  }
});
```

---

## 7. Spline — 3D para Web

**Fuente**: docs.spline.design

### Export Options
- **Spline Viewer**: `<spline-viewer>` HTML component, más flexible
- **Vanilla JS**: Código exportable,自行 hostear
- **Three.js**: Exportar como Three.js scene
- **React / Next.js / R3F**: Para frameworks React

### Export Flow
1. Click "Export" → Select "Code"
2. Choose: Vanilla JS, Three.js, React, etc.
3. Copy URL or download files
4. Host on your server

### Embedding (Viewer)
```html
<script type="module" src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"></script>
<spline-viewer url="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"></spline-viewer>
```

### Consideraciones
- Spline dibuja en WebGPU por default, fallback automático a WebGL
- Animations y events solo funcionan en Vanilla JS export
- Para Three.js: scene reconstruction limitada, mejor usar export vanilla

---

## 8. Google Antigravity — Workflow AI → 3D Website

**Fuente**: Instagram reel #4 (sandylabs.ai)

### Flujo
```
Google Whisk (generar imágenes) → Google Flow (animar a video) → frames → Google Antigravity (IDE + Gemini 3 Pro) → Website 3D completo
```

### Herramientas
- **Whisk**: Generar imágenes con IA
- **Flow**: Convertir imágenes → video animado
- **Antigravity**: IDE para armar websites con asistencia de Gemini
- **Gemini 3 Pro**: Ensambla componentes, shaders, animaciones

### Resultado
- Website 3D interactivo armado en minutos
- Integración de modelos, texturas, scroll effects
- Sin escribir código manualmente

---

## 9. Lenis — Smooth Scroll

**Fuente**:studio-freight/lenis

### Setup
```javascript
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Con Three.js
import { addEffect } from '@react-three/fiber'
addEffect((t) => lenis.raf(t))
```

---

## 10. Performance Considerations

### Frame Budget
- Target: 60 FPS en mid-range Android
- WebGL: Offload a GPU (evitar DOM manipulation en cada frame)
- Lazy-load anything below the fold
- IntersectionObserver para activar escenas

### Mobile Optimization
- `gsap.matchMedia()` para breakpoints específicos
- Device-tier detection: servir versión más ligera
- Reduced motion: `window.matchMedia("(prefers-reduced-motion: reduce)")`
- Texturas: 2K max en mobile, 4K max en desktop
- Draco/KTX2: 10x size reduction

### Rendering
- Fog para profundidad: `scene.fog = new THREE.Fog(color, near, far)`
- DPR: `[1, 1.5]` — clamp device pixel ratio
- Instancing para geometría repetida
- `gsap.quickTo()` para updates cada frame sin crear tweens nuevos

---

## 11. Quick Reference — Libraries

| Library | Use Case | Bundle |
|---------|----------|--------|
| GSAP + ScrollTrigger | Scroll-driven animation | ~30 KB |
| Three.js | 3D rendering | ~600 KB |
| Anime.js v4.5 | Alternative animation (Three.js adapter) | ~16 KB |
| Lenis | Smooth scroll | ~8 KB |
| Spline | 3D modeling → web | Viewer: ~50 KB |
| gltf-transform | Asset optimization | CLI |
| Draco | Geometry compression | ~150 KB decoder |
| KTX2 | GPU texture compression | ~300 KB |

---

*Última actualización: 2026-08-28*
