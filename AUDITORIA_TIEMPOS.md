# Auditoría de tiempos / ritmo del scroll

> **Estado de aplicación:** los ajustes de la §4 ya están aplicados en `index.html` (alturas de stages, hero fade `55% top`, timeline `+=120%` y coreografía de cámara anclada a centros reales del DOM). Quedan como trabajo pendiente: confirmar el ritmo objetivo (16–18s), compactar/decidir contenido de Actas y Voces, y unificar las transiciones de entrada (§5).

> Nota metodológica: no pude levantar un navegador headless (no hay Chromium y la descarga de Playwright falló), así que esta auditoría usa **los valores reales de CSS y de los ScrollTriggers del código** (heights en `vh`, `start/end`, `duration` de Lenis, etc.), calculados para viewport 1920×1080 y para el rapport típico 16:9. No está medida en runtime, pero los números son los declarados en el código.

---

## 1. Tabla real de alturas y duraciones (desktop base)

| # | Stage | Height CSS | Scroll viajado ≈ | Trigger(s) | Observación |
|---|---|---|---|---|---|
| 0 | Hero | `100vh` (=1080px) | ~432px | `.hero top top → 40% top` | fade del título en 40% del viewport (~432px). Muy corto. |
| 1 | La Reunión (`#stageObjective`) | `200vh` | **100vh (1080px)** de scroll | `.hero top→bottom` + anticipado puerta `top 70%→top 15%` | puerta emerge en ~594px de scroll (55%). |
| 2 | La Sala (`#stageRoom`) | `200vh` | **100vh (1080px)** de scroll | cruce `top 85% → +80%` + salida `bottom 125%→bottom` | el dolly dura ~70vh (~756px), el dwell ~30vh. |
| 3 | Hook (`#stageHook`) | `200vh` (inline) | **100vh (1080px)** | `top 85%→bottom bottom` | contenido en bloque sticky de 100vh. |
| 4 | Axes (`#stageAxes`) | `200vh` (inline) | **200vh (2160px)** | `top 60%→bottom top` | entra en cuanto el top cruza 60% y sale cuando el bottom llega arriba. |
| 5 | Evolución (`#stageWordEvolution`) | `230vh` | **230vh (2484px)** | `top 85%→bottom bottom` | el más largo en datos. |
| 6 | Voces (`#stageVoices`) | `240vh` | **240vh (2592px)** | `top 85%→bottom bottom` | muy largo; el pin es 100vh. |
| 7 | Actas (`#stageActs`) | `280vh` | **280vh (3024px)** | `top 85%→bottom bottom` | el más largo, 3.9 sec a 775px/s. |
| 8 | Counters (`#stageCounters`) | `min 70vh` | ~100vh | no tiene scrub propio | contenido se muestra con `.active`. |
| 9 | Pipeline (`#stagePipeline`) | `100vh` (pin wrapper) | `track.scrollWidth - viewport` | `top top → +=...` | horizontal, duración variable según ancho. |
| 10 | Timeline (`#stageTimeline`) | `100vh` + pin `+=150%` | **150vh (1620px)** | `top 80%` + `top top → +=150%` | pin largo. |
| 11 | Quotes (`#stageQuotes`) | `min 72vh` | ~100vh | intro `top 80%` y cards `top 85%` | sin scrub, revela corto. |
| 12 | Closing (`#stageClosing`) | `min 80vh` | ~100vh | `top 85%` | cierre corto. |

> Escala de scroll: a velocidad de rueda "media" (~775px/s en desktop), dividir los px entre 775 → segundos.

---

## 2. Velocidad / ritmo aproximado (desktop 16:9)

- **Hero → La Reunión:** ~0.55s (rápido, bien).
- **La Reunión:** ~1.4s (bueno).
- **La Sala (cruce):** ~1.0s (bien; el dwell interactivo es corto).
- **Hook:** ~1.4s (bien).
- **Axes:** ~2.8s (largo para una simple leyenda + scatter; se siente lento porque la mayoría es "hold" sin dato nuevo).
- **Evolución:** ~3.2s (largo pero es gráfico; aceptable).
- **Voces:** ~3.3s (largo y hay poca acción en la primera parte).
- **Actas:** ~3.9s (el más largo; el pin de 100vh espera mucho).
- **Timeline:** ~2.1s (bien con el escrub).
- **Quotes:** ~1.3s (corto, mejor si se da más aire).
- **Closing:** ~1.3s.

**Total documento estimado:** ~22–23s de scroll continuo (a ~775px/s, sin contar pausas de lectura).

---

## 3. Diagnóstico — problemas de ritmo

### 🔴 Problema 1 — Actas demasiado largo (3.9s) y con "vacío"
- `height: 280vh` + pin 100vh → 180vh de scroll útil.
- En la primera parte hay una lista larga (`act-list`) y luego "Sigue la señal": es mucha tela para poca acción.
- **Fix:** bajar a `200vh` (o `220vh` si conservas la segunda parte). Menos tasa de abandono.

### 🟠 Problema 2 — Axes con "hold" largo (2.8s) antes de dato nuevo
- `height: 200vh` inline; el trigger va `top 60% → bottom top` (2160px).
- Buena parte es la leyenda fija; el scatter aparece temprano y queda quieto.
- **Fix:** bajar a `150vh` o usar `top 65% → bottom 85%` para acortar la cola final.

### 🟠 Problema 3 — Voces con intro larga (3.3s)
- `height: 240vh` + `top 85% → bottom bottom` = 2592px.
- El directorio es interactivo (bien) pero el "pin" no necesita tanto recorrido.
- **Fix:** `180–200vh`.

### 🟡 Problema 4 — Cronología de la coreografía de cámara desalineada con las alturas reales
- `cameraStops` usa proporciones del **progreso total** (`storyProgress`), pero los stages no tienen el mismo peso (Actas = 280vh, Voces = 240vh, Timeline = 150vh).
- Es **oscilante**: en los extremos la cámara viaja a los capítulos largos, pero en el medio el mapeo es aproximado.
- **Fix:** en vez de keyframes arbitrarios, anclar los stops a los **centros reales** de cada stage (usar `ScrollTrigger` + `getBoundingClientRect` para calcular `p`). Ya hay un ejemplo: `ScrollTrigger.update`/`getBoundingClientRect`.

### 🟡 Problema 5 — Fade/parallax del hero muy corto (40% top)
- `end: '40% top'` → se pierde el título demasiado pronto; se siente apurado.
- **Fix:** `end: '55% top'` o incluso `60%`.

### 🟡 Problema 6 — Sin "transición única" entre secciones
- Hay múltiples `fade + y` distintos (hook, voices, acts, word-evolution, quotes, closing).
- Se siente como parches por separado, no como un mundo continuo.
- **Fix:** unificar un pequeño sistema de entrada (mismo easing y duración base) y dejar los fades largos solo para el contenido que sí cambia de "gramática".

### 🟢 Problema 7 — `timeline` y `pipeline` bien, pero no conectados visualmente
- La timeline está `+=150%`, el pipeline por ancho del track. Ambos bien; solo que la cámara no los resalta de forma coordinada.

---

## 4. Recomendación de tiempos "nivel pagado" (desktop)

| Stage | Height nuevo | Scroll útil | Ritmo |
|---|---|---|---|
| Hero | 100vh | 0–55% | 0.9s |
| La Reunión | 200vh | 100vh | 1.4s |
| La Sala | 200vh | 100vh | 1.2s |
| Hook | 180vh | 80vh | 1.1s |
| Axes | **150vh** | 50vh | 1.3s |
| Evolución | **200vh** | 100vh | 1.6s |
| Voces | **190vh** | 90vh | 1.5s |
| Actas | **200vh** | 100vh | 1.6s |
| Counters | 100vh | 100vh | 1.0s |
| Pipeline | variable | variable | ~1.6s |
| Timeline | `+=120%` | 120vh | 1.5s |
| Quotes | 110vh | 110vh | 1.2s |
| Closing | 90vh | 90vh | 1.0s |

**Total objetivo:** ~16–18s (vs actual ~23s). Se siente más denso y premium: cada capítulo tiene una "vuelta" clara, el usuario no hace scroll interminable y la cámara tiene dónde detenerse.

---

## 5. Qué marcar como "tarea tuya" vs "lo hago yo"

### Lo hago yo (código)
1. Ajustar alturas de stages:
   - `#stageAxes` 200vh → 150vh
   - `.stage-word-evolution` 230vh → 200vh
   - `.stage-voices` 240vh → 190vh
   - `.stage-acts` 280vh → 200vh
   - `.stage-timeline` `+=150%` → `+=120%`
   - (en media queries móviles también, manteniendo proporción)
2. Ajustar hero fade `40% → 55% top`.
3. Alinear `cameraStops` a los **centros reales** de los stages (para que la coreografía coincida con el nuevo ritmo).
4. Unificar transiciones de entrada/sección (mismas duraciones/easing).

### Tu tarea (decisión/design)
1. **Confirmar el ritmo objetivo.** ¿16–18s OK, o quieres aún más rápido/lento?
2. **Decidir la jerarquía de contenido.** En Actas y Voces hoy hay mucho contenido; si acorto la altura, hay que recortar/compactar el panel o hacer que sea interactivo (scroll dentro), no solo "más scroll".
3. **Definir si el "dwell" en La Sala debe ser más largo** (es el lugar inmersivo; actualmente ~30vh.
4. **Moodboard / dirección:** confirmar si quieres una transición "única" (plano-secuencia) o mantener las actuales con fades.

---

## 6. Veredicto

El ritmo actual es **correcto pero conservador**: todo funciona, pero Actas (280vh), Voces (240vh) y Axes (200vh) generan "scroll muerto" que se siente lento comparado con una pieza premium. La coreografía de cámara que añadí queda **desalineada** con las alturas reales (por eso puede sentirse espasmódica en los capítulos largos). Ajustar las alturas + anclar los keyframes a posiciones reales es la mejora de mayor impacto y bajo riesgo.
