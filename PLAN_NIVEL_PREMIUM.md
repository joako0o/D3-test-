# Plan "Nivel pagado" (realista para 1 persona + Blender)

> Objetivo: que `D3-test-` se sienta como una pieza de datos **hecha con oficio**, no como una plantilla, y sin pretender el presupuesto de Huncwot.
> Benchmark de calidad a aspirar: "editorial de datos + 3D atmosférico" → *Awwwards Honorable Mention* o mejor, **no** *Site of the Day de agencia multimillonaria*.

---

## 0. La idea central

Garden gana porque es **UN solo mundo visual continuo**. Tu proyecto hoy es:
- hero con moneda → puerta → ~12 tarjetas/paneles D3.

Para subir de nivel NO necesitas más contenido; necesitas que **todo ocurra en un mismo mundo**:

> **La Sala de Deliberaciones**: el usuario entra por la puerta, y la cámara nunca se apaga. Cada capítulo es una **zona/objeto** de esa sala, no una página nueva. Cada dato se convierte en un **objeto** que el usuario puede tocar.

---

## 1. Qué es lo que realmente falta (prioridad)

### A. Dirección de arte (El 60% del salto)
- **Un solo lenguaje visual**: moneda, puerta, partículas y gráficos comparten material y luz.
- **Paleta cerrada**: 2 tonos base (oro hawkish + azul dovish) + neutros. No más.
- **Tipografía grande y jerarquizada**: hero 50–64px en desktop, títulos de sección 44–56px, cuerpo 18–20px. Menos texto por pantalla.
- **Una sola transición de scroll** (no 10 fades distintos): la cámara siempre "viaja" a la siguiente zona.

### B. Continuidad 3D (El 25% del salto)
- Mantener el **conjunto de partículas visible en TODOS los capítulos** (atenuado). Hoy se apaga en varias secciones.
- Cada capítulo = **una nueva posición de cámara + una figura** que se materializa.
- El mapa/timeline D3 **vive en el mismo espacio** (ya lo logras en `#stageAxes`); extender ese concepto al resto.

### C. Blender: figura → "familia de objetos" (El 15% del salto)
Tu moneda y tu puerta son **dos figuras**, no un universo. La estrategia es crear una **familia de dioramas** pequeños y coherentes, cada uno asociado a un dato:

| Objeto | Idea narrativa | Dato |
|---|---|---|
| **Moneda** (ya tienes) | La decisión monetaria como objeto físico | 1 acta = 1 decisión |
| **Puerta** (ya tienes) | El umbral hacia la deliberación | Entrada a la sala |
| **Balanza** | Equilibrio hawkish/dovish | Índice por año |
| **Termómetro / Vela de precio** | Presión inflacionaria | Menciones de inflación |
| **Árbol / brote** | Crecimiento, holgura, "crecer con la historia" | Crecimiento económico |
| **Manuscrito / volumen** | El acta, la pieza de archivo | Fuente trazable |
| **Biblioteca de libros** | Corpus de 182 reuniones | Corpus total |
| **Campana** | Inicio/fin de reunión | Reunión |

Cada figura **no tiene que ser ultra-realista**: bajo luces de neblina y un material consistente (oro, obsidiana, azul), una silueta low-poly se ve premium.

### D. Audio: **no viene música clásica por defecto** (si quieres nivel premium)
El tema es **política monetaria**, no un compositor. Meter música de Penderecki **no corresponde**. Lo correcto es una de dos:

1. **Sonido interactivo (recomendado):**
   - Al pasar cursor/seleccionar una partícula → **tono** cuya altura depende del `score`.
   - Hawkish = tono grave; Dovish = tono agudo; Neutral = tono medio.
   - Al avanzar la timeline → un "blip" suave por año.
   - Esto **sonifica el dato**, es coherente y no depende de música con derechos.
2. **Solo si quieres música:** 1 pieza **generada** (o CC0) de **ambiente tibio y mínimo**, con volumen bajo, y **siempre pausable**. Nada de "clásica épica".

> Regla: el audio debe estar **justificado por el dato**, no añadido porque "los sitios premium tienen música".

---

## 2. Roadmap (con tiempo realista, 1 persona)

> ✅ = implementado en `index.html` / `js/figures.js`
> 🫵 = TAREA TUYA (modelar Blender, subir fuentes, etc.)

### Fase 0 — Estabilidad (ya hecha)
- [x] Gráfica responsive (redibujo en resize).
- [x] Tipos de gráfico legibles (13–16px).
- [x] `og:image` + twitter card (imagen generada en `og-image.jpg`).
- [x] Self-host fonts (Playfair/Inter en `fonts/` con `@font-face` en `index.html`; ver `fonts/README.md`).

### Fase 1.5 — Ya implementado (Núcleo "una sola sala")
- [ ] **HUD de La Sala de Deliberaciones** (`#chapterHud`): "La Sala de Deliberaciones · 16 años · un mismo espacio". — ⚠️ *Corregido en revisión 2026-08-30: NO existe en el código. Estaba marcado como hecho por error.*
- [x] **Gabinete de figuras** (`#figureCabinet`): lista las 6 figuras planeadas y su estado `buscando / por modelar / listo`.
- [x] **Sistema de figuras con placeholder** (`js/figures.js`): si el `.glb` no existe, dibuja un icosaedro + halo; si existe, lo carga y normaliza.
- [x] **Nube de partículas nunca se apaga**: mínimo de atmósfera en todos los capítulos (antes caía a casi cero en algunos stages).
- [ ] **Audio interactivo** — DESACTIVADO POR AHORA (decisión del autor). El diseño sigue documentado aquí por si se retoma.
- [ ] **Contador de descubrimiento** (`Evidencia n/100`) con `localStorage`. — ⚠️ *Corregido en revisión 2026-08-30: NO existe en el código. Estaba marcado como hecho por error.*
- [ ] **Recorrido guiado 5 min** (`#guidedTour`): avanza por las secciones clave. — ⚠️ *Corregido en revisión 2026-08-30: NO existe en el código. Estaba marcado como hecho por error.*
- [x] **Coreografía de cámara** (`cameraChoreography` + `cameraStops`): después del cruce puerta→sala, la cámara viaja con deriva suave por voces/actas/timeline/etc. El cruce sigue gobernado por el dolly de `#stageRoom` para no desalinear las partículas. Los keyframes de los ejes quedan en la posición base a propósito.

### Lo que sigue (fases 2–6)

### Fase 1 — Dirección (1 semana)
- [x] Elegir la **metáfora rectora** (La Sala de Deliberaciones) → HUD + figuras.
- [ ] 🫵 Definir **moodboard personal** + confirmar paleta con tus figuras.
- [ ] Hacer la **1 transición de referencia** (puerta → sala como "viaje").

### Fase 2 — Continuidad 3D (2–3 semanas)
- [ ] Mantener partículas visibles en todos los stages (atenuación, no apagado).
- [ ] Coreografía de cámara: hero → puerta → sala → eje de datos → voces → actas → timeline → cierre. **Un solo path.**
- [ ] Unificar materiales/iluminación de moneda, puerta, partículas, D3.

### Fase 3 — FIGURAS BLENDER (el corazón — lo que haces tú)
- [ ] Crear **1 diorama modelo** (p. ej. balanza) y definir convención: tamaño, material, export GLB (Draco), presupuesto <300KB por figura.
- [ ] Repetir con 3–4 figuras (balanza, vela/térmómetro, brote, libro).
- [ ] Colocarlas en la escena como destinos de cámara. Cada figura = botón → abre evidencia.
- [ ] Interacción: hover = luz; click = panel (igual que partículas).

### Fase 4 — Sonido (1 semana)
- [ ] Web Audio API con `AudioContext` en el primer click.
- [ ] Sonido de hover/selección por score.
- [ ] Blips por año en timeline.
- [ ] Botón de **silenciar** persistente.

### Fase 5 — Recompensa y guía (1 semana)
- [ ] Contador de **hallazgos** ("X/100 fragmentos descubiertos").
- [ ] Progress global + "ruta recomendada de 5 min".

### Fase 6 — Rendimiento y acabado (2–3 semanas)
- [ ] `three.module.min.js`.
- [ ] Lazy load puerta/D3 por stage.
- [ ] `app.js` + `styles.css` separados y minificados.
- [ ] Reducir `index.html` (hoy 341 KB inline).
- [ ] Lighthouse móvil/desktop; test en viewports chicos/grandes.
- [ ] Accesibilidad final (ya buena).

---

## 3. Qué NO hacer (para no parecer "presupuesto falso")
- ❌ No intentar fotogrametría/drone/punto de nube (no es viable).
- ❌ No comprar/forzar 55 ilustraciones a mano.
- ❌ No meter música clásica épica sin justificación.
- ❌ No llenar la pantalla de tarjetas (es lo que más "template" se ve).
- ❌ No modelar figuras muy realistas sin cohesión de materiales.

---

## 4. Cómo se verá el "nivel pagado" alcanzable

En 2–3 meses (trabajando a ratos) esto es **realista**:

- Un solo mundo: moneda → puerta → sala → datos, con la cámara siempre en movimiento.
- 4–6 figuras Blender coherentes, cada una como "nodo de evidencia".
- (Opcional, desactivado por ahora) Audio interactivo que sonifique la orientación hawkish/dovish.
- Gráficos D3 grandes, tipografía grande, menos texto.
- Contador de descubrimiento + recorrido guiado.
- Carga optimizada y accesibilidad WCAG.

Ese es el "país de destino". No es Garden, pero **es una pieza donde se nota que hubo oficio, tiempo y una idea**.
