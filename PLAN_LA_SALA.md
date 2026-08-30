# Plan — "La Sala" · Explorador interactivo de las actas

> Scrollytelling premium inspirado en *An Interactive Visualization of Every Line in Hamilton* (Pudding, 2017).
> Fase actual: **MAQUETA** — los datos son placeholders; la arquitectura debe soportar el dataset real (182 reuniones, ~1.200 intervenciones) sin rediseño.
> Fecha: 2026-08-30 · Rama: `arena/01a05148-d3-test`

---

## 0. Estado actual (lo que YA existe)

| Pieza | Estado | Dónde |
|---|---|---|
| Enjambre 3D: 1 partícula = 1 intervención | ✅ Funcional | `index.html` ~línea 1905 (`swarm`) |
| Color por tono: oro hawkish / azul dovish / plata neutral | ✅ Funcional | `colorHawkish/Dovish/Neutral` |
| Scatter espacial ligado al scroll (anillo → nube) | ✅ Funcional | `scatterProgress` |
| Picking por raycaster sobre partículas | ✅ Funcional | `pickPoint()` |
| Panel de cita (autor, tag, fecha, párrafo, año) | ✅ Funcional, **se abre al CLIC** | `openQuote()` + `#quotePanel` |
| Hover | ⚠️ Solo cambia cursor | `updateHover()` |
| Puntuación / confianza | ❌ No existe en el dato | — |
| Filtros combinables | ❌ No existen | — |
| Insight de co-ocurrencia ("quién se sienta con quién") | ❌ No existe | — |
| Timeline D3 | ⚠️ Datos dummy anuales | `sampleData` |
| Timing del enjambre | ⚠️ El scatter se dispara durante el **hero** (anillo → nube mientras la moneda se apaga) | `scatterProgress` ← scrollTrigger de `.hero` |

**Conclusión:** la base 3D + interacción ya está. El plan NO es reescribir, es **elevar, reubicar y completar**: mover el momento de la nube a la sala tras la puerta, hover, score, filtros, narración.

---

## 1. Veredicto de la idea original

> "Partículas protagonistas, una por intervención, de color según dovish/hawk, hover → pestaña con párrafo, año, autor y puntuación."

**Se mantiene. Es exactamente el corazón de la pieza de Hamilton** (cada burbuja = líneas del musical, color = quién la canta, hover = la letra). El proyecto ya va por buen camino; lo que falta son las tres capas que dan la magia de Pudding:

1. **Hover** en vez de solo clic (bajo costo, alto impacto).
2. **Filtros combinables** (personaje × tema × era) — aquí es donde el lector "se queda a explorar".
3. **El insight de la desaparición**: al filtrar, lo que no co-ocurre se apaga; la co-ocurrencia se vuelve legible.

---

## 2. Lecciones de Hamilton → traducción 1:1

| Hamilton (Pudding) | Tu "Sala" |
|---|---|
| Personajes (Burr, Eliza, Angelica…) | **18 participantes** |
| Conversaciones (pares de personajes) | **Pares que aparecen en la misma reunión** (misma `date`) |
| Temas = frases recurrentes (Ambition, Death…) | **Tono** (hawkish / dovish / neutral) + **Eras** (5 épocas 2000–2015) |
| Burbuja = conjunto de líneas | **Partícula = 1 intervención** |
| Color = cantante | **Color = tono** (decisión: el tono es el mensaje central del proyecto; el participante se muestra en el panel. Opcional: toggle de codificación en fase P3) |
| Hover → tooltip con letra | **Hover → panel con párrafo, autor, fecha y score** |
| Filtros combinables, reset | **Chips: participante × tono × era + botón reset** |
| Al filtrar, elementos se borran del mapa | **Al filtrar, partículas se apagan (fade + shrink), no se borran** (se ve la "huella" de lo excluido) |

### Eras propuestas (maqueta, ajustables con datos reales)

| Era | Período | Narrativa |
|---|---|---|
| E1 · Despegue | 2000–2003 | Primeros años de metas de inflación; shock 2001–02 |
| E2 · Fiebre | 2004–2007 | Recuperación, sobrecalentamiento, ciclo de alzas |
| E3 · Crisis | 2008–2009 | Crisis financiera global, recortes de emergencia |
| E4 · Normalización | 2010–2014 | "New normal", superciclo de commodities, taper tantrum |
| E5 · Giro | 2015 | Caída de commodities, inicio del giro dovish |

---

## 3. Concepto narrativo (dónde vive "La Sala" en el scroll)

**La Sala se ubica justo después de la puerta del Banco Central** (stage "La Reunión"). La puerta es la metáfora de *a puerta cerrada*: hoy el lector la mira aparecer y desaparecer sin que jamás se abra. El title del proyecto promete *"In the **room** where monetary policy happens"* — la habitación debe mostrarse cuando se abre esa puerta, no después de 8 etapas.

### Flujo propuesto

```
1. HERO — moneda + título ("In the room where…")
2. LA REUNIÓN — la puerta del BC, "a puerta cerrada", las actas
3. ═══ LA SALA (nuevo, pinned ~300vh) ═══ — la puerta se abre: 182 voces
4. EL MÉTODO — cómo se leyó cada voz (hawkish/dovish = la leyenda de los colores)
5. CONTADORES — 16 años · 182 reuniones · N voces
6. PIPELINE — del texto crudo al dato
7. TIMELINE — orientación en el tiempo
8. CIERRE — CTA "Volver a la sala ↺" (scroll suave → La Sala)
   · el equivalente al "Explore their stories" final de Hamilton
```

Cambios vs. el estado actual:
- **`#stageAxes` se elimina**: su caption *"Cada punto es una intervención…"* pasa a un beat de La Sala; el `#d3-canvas` (2D, ya vestigial) se retira.
- **El Método se desplaza un stage hacia atrás** (quedando tras La Sala): pasa a ser *"cómo leer lo que acabas de ver"*. Su copy actual (*"El modelo no lee el acta como un documento. La convierte en señales."*) funciona igual en esa posición.
- **La sección de 2 citas se absorbe** por La Sala (decisión confirmada).
- El scrubber global (array `sections`) se actualiza: `sala` entre `door` y `hook`.

### Beats de La Sala (copy de maqueta)

1. **Umbral** (0–20%): la puerta se abre / la cámara la atraviesa → aparece la sala.
   > *"Detrás de esa puerta se dijo todo esto. 182 reuniones. Cada punto, una voz."*
2. **La sala** (20–45%): la nube respira e interactúa (hover → cita con autor, fecha, tono y score).
   > *"Pasa el cursor por una voz. Escucha lo que se dijo a puerta cerrada."*
3. **Liberación** (45–100%): aparecen los filtros (stagger GSAP): voz × convicción × época.
   > *"Filtra. Y observa quién desaparece: eso también es una historia."*
4. **Salida**: la nube se atenúa suavemente → El Método.

### Opción (b) — elegida · Factibilidad (corrección del autor del modelo)

Estructura real del GLB (confirmada por Joako, autor de los modelos en Blender):

| Objeto | Nodos | Contenido | Material |
|---|---|---|---|
| Gris | `Cubo.015` / malla `Cubo.064` (1.104 verts) | **Pared + marco + escaleras** | Textura gris |
| Dorado | `Toroide.001` (5.616 verts) | **La puerta + los círculos decorativos de la pared** (fusionados) | Oro |

⚠️ **Implicación**: la puerta y los círculos son **un solo objeto** → si se rota en la bisagra, los círculos de la pared giran con la puerta (se ve roto). Un *swing* físico puro exige separar los círculos (ver Variantes).

#### Variantes de la apertura

| | **(b1) Velo** — sin Blender, factible HOY | **(b2) Swing real** — requiere 15 min en Blender |
|---|---|---|
| Qué pasa | La cámara avanza hacia la puerta; la hoja dorada (con sus círculos) **se disuelve en la luz cálida** justo antes del cruce; velo de fog; la cámara pasa y aparece La Sala | La puerta **gira en la bisagra** (0° → −100°), marco gris y círculos quietos, la cámara cruza el vano |
| GLB | El actual | Re-export con los círculos separados (pasos abajo) |
| Riesgo | Cero | El swing se ve roto si los círculos no se separaron |
| Feeling | "Cruzar la puerta" (cinemático, disolución) | "Abre la puerta" (físico, más literal) |
| Estado | **Se implementa primero** | Upgrade si (b1) se ve plano O si Joako separa los círculos |

**Auto-adaptación del código (cubre ambos casos de la pared gris):** al cargar, el código raycastea desde la cámara a través del centro de la puerta (bounding box del objeto dorado):
- Si el **rayo atraviesa** (hay hueco de vano en la pared gris) → la pared gris se mantiene visible; solo se disuelve lo dorado; la cámara cruza el hueco.
- Si el **rayo choca** (pared sólida, sin hueco) → se disuelve toda la composición (gris + dorado) con el velo; la cámara "cruza" en el pico del fog.

Ambos ramos comparten la misma coreografía (dolly + fog + luz cálida interior); cambia solo qué se desvanece.

#### Pasos en Blender para la variante (b2) — si se decide

1. Abrir el archivo de la puerta.
2. Edit mode sobre el objeto dorado → seleccionar las caras de los **círculos** de la pared (box-select alrededor de cada uno; los de la puerta NO).
3. `P` → **Separate by Selection** (quedarán 2 objetos: puerta y círculos).
4. Renombrar: la puerta → `HojaPuerta`, los círculos → `CirculosPared`.
5. En la puerta: 3D cursor al borde de la bisagra → `Object` → **Set Origin → Origin to 3D Cursor**.
6. Exportar **glTF 2.0 (.glb)** con las mismas opciones de compresión Draco que el actual (p. ej. `puerta-v2-draco.glb`). Sin animación: la rotación la hace GSAP (scrub, reversa gratis).
7. En Three.js el código detecta los nodos por nombre: `HojaPuerta` rota, `CirculosPared` + gris se quedan estáticos. (Flag en CONFIG para alternar b1/b2.)

#### El "interior" — NO requiere crear mesa ni sala en Blender

La sala **es el enjambre**: 182 voces = la habitación (el concepto del proyecto). Para vender el "interior" alcanza con arquitectura mínima **en código** (~20 líneas de Three.js):

- Fondo oscuro detrás del vano (se lee como interior, no como pared).
- **Luz cálida puntual** justo adentro del vano (contraste con la escena fría exterior — el momento "entra a la sala" se siente solo con esto).
- Fog en el umbral que sube y baja con el cruce.

Una sala literal (mesa del consejo, sillas) sería un proyecto Blender aparte y **se opone al concepto**: competiría con la nube de partículas, que es la protagonista. Descartada para la maqueta.

> Nota de timing actual: hoy el scatter del enjambre se dispara durante el HERO (el anillo se dispersa mientras la moneda se apaga; `scatterProgress` ← scroll del hero, `coinFade` a partir de 45%). En (a) el driver pasa al stage de La Sala: en el hero el anillo permanece alrededor de la moneda.

---

## 4. Diseño visual e interacción

### 4.1 Codificación

| Canal visual | Significado | Notas |
|---|---|---|
| Color | Tono (oro/azul/plata) | Ya existe. Glow sutil del mismo tono |
| Tamaño | **Score** (0–1 de referencia) | `size = 0.09 + 0.09 * score`. El score = puntuación de orientación hawkish/dovish del clasificador. En maqueta: valor de referencia determinístico (ver §5); cuando existan los valores reales se reemplaza el array y, si no vienen normalizados, se normaliza a 0–1 en la ingesta. |
| Posición X (zonal) | **Año** (2000 → 2015, izquierda → derecha) | *Decisione pendiente*: hoy el scatter es orgánico. Opción premium: mantener orgánico en la nube y agregar una **brújula temporal** (arcs/curvas sobre el scatter, como las "curves above lines" de Hamilton) solo al filtrar por era. |
| Brillo | Hover / selección | Sprite escala 2.2× + halo |

### 4.2 Hover (lo que pediste)

- **Escritorio:** al pasar el cursor sobre una partícula (con debounce de 32ms que ya existe):
  - La partícula **crece y brilla** (lerp, 180ms, `ease: power3.out`).
  - El `#quotePanel` se abre **junto al cursor** (offset 16px, clamping a viewport) con:
    - **Autor** (Playfair, 600)
    - **Tag de tono** (pill existente)
    - **Fecha de la sesión** (`formatted_date`)
    - **Párrafo** (máx. ~320 chars en maqueta; scroll interno si excede — como los tooltips largos de Hamilton)
    - **Score**: mini-barra `■■■■□ 0.87` + etiqueta `confianza`
  - Al salir, panel cierra con fade 150ms.
- **Móvil/touch:** tap = abre panel anclado abajo (patrón sheet); tap fuera = cierra. (Hoy el click ya abre el panel; solo cambia anclaje y se agrega score.)
- **Foco teclado (a11y):** las partículas son 3D; se mantiene el `aria` del canvas y el panel con `aria-live` (ya está). No hacer tabbiable cada partícula.

### 4.3 Filtros (el alma Hamilton)

Chips en 3 filas, bajo el título del stage, estilo premium (pill, borde 1px, hover gold, activo = relleno tono):

- **Voz** (18 participantes): chips aparecen solo de participantes presentes en la selección actual (regla Hamilton: los que no co-ocurren **desaparecen del filtro**, no quedan grises).
- **Convicción** (3): Hawkish · Dovish · Neutral.
- **Época** (5): E1…E5 con tooltip del rango de años.

Semántica:
- **Multi-selección dentro de una dimensión = OR** (hawkish + dovish).
- **Entre dimensiones = AND** (Voz × Convicción × Época).
- Partículas que no cumplen: **fade a 12% opacidad + shrink 0.5×** (no se borran: la "huella" de lo excluido es el insight).
- **Contador vivo**: `« 137 de 182 intervenciones · 9 voces · 2 épocas »` (animado con GSAP text).
- **Reset** (píldora "↺ Restablecer") — obligatorio en Hamilton; aquí también.
- Estados de borde: si el filtro deja 0 partículas → microcopy elegante: *«Nadie dijo esto en esta sala. Prueba otra combinación.»*

### 4.4 Insight de co-ocurrencia (fase P2, opcional en maqueta)

- Al tener ≥1 voz seleccionada: mostrar **líneas tenues** (líneas de D3 sobre el canvas 3D proyectado, o arcos sobre una banda 2D) entre las partículas de esa voz y las de sus co-presentes en la misma sesión.
- Microcopy: *«Corbo y Claro hablaron juntos en 14 de las 182 reuniones.»*
- Alternativa más barata (recomendada para maqueta): al seleccionar 2 voces, el contador muestra su **intersección**: *«8 intervenciones donde ambos hablaron.»*

### 4.5 Detalles premium (checklist de acabado)

- [ ] Eases propios (`cinematicSilk/Smooth/Flow/Linear` ya definidos en APUNTES) en hover, filtros y scatter.
- [ ] Stagger 0.02s en chips al aparecer (SplitText no hace falta; es una fila corta).
- [ ] Panel con blur backdrop (`backdrop-filter: blur(14px)`, borde 1px gold-dim).
- [ ] Cursor: `pointer` + halo que sigue al mouse en zona de partículas (ya hay `particle-hover`).
- [ ] Sonido: **no** (restringir; rompería el tono institucional).
- [ ] Reduced motion: `prefers-reduced-motion` → sin scatter, panel instantáneo.
- [ ] Debug: el panel de debug existente registra `factive filter state` (participantes/tono/era activos).

---

## 5. Modelo de datos de la maqueta

### Schema (extensión de `js/quotes.js`)

```js
{
  "id": "int-2007-09-13-004",
  "text": "…",
  "participant": "Vittorio Corbo",          // 1 de 18
  "year": 2007,
  "date": "2007-09-13",
  "formatted_date": "13 de Septiembre, 2007",
  "label": "hawkish",                        // hawkish | dovish | neutral
  "score": 0.87,                             // 0–1 de referencia · puntuación hawk/dov del clasificador
  "era": "E3"                                // derivado de year (helper, no se hardcodea)
}
```

### Plan de placeholders (maqueta)

1. `js/quotes.js`: agregar `score` como **valor de referencia 0–1** (puntuación hawk/dov, determinístico: semilla por `date+participant`, NO `Math.random()` para que sea estable entre recargas). Queda documentado en el código como placeholder: cuando el pipeline defina el score real (y si no viene normalizado), solo se reemplaza el array y se normaliza en la ingesta.
2. Generador `js/mock-data.js` (solo maqueta, borrarse con los datos reales):
   - 182 fechas (una reunión/mes, 2000–01 → 2015-12).
   - ~5–8 intervenciones por reunión → ~1.100 partículas.
   - Participantes: 18 nombres ya en el repo; rotación realista por era (ej. Raddatz solo 2013+, Claro 2009–2013, etc. — **por confirmar con el dataset real**; en maqueta se usa la rotación de las 100 citas existentes extrapolada).
   - `label`: proporción por era (E3 crisis = skew dovish, E2 = skew hawkish).
   - `score`: correlacionado levemente con |extremidad del tono|.
3. **Performance:** con ~1.100–1.500 partículas, `THREE.Points` + raycaster sigue siendo OK (testeo en móvil: target 55fps). Si el dataset real supera ~3.000 intervenciones → fallback a **muestreo** (todas las reuniones, pero máx. 2 partículas por intervención/grupo) o switch a render D3 2D en móvil. Decidir en P3 con datos reales.

### Migración a datos reales (P3)

- Mismo schema. El generador se elimina; `quotes.js` se reemplaza por el dataset real.
- Nada más del pipeline de render toca el origen del dato: el código solo lee `window.QUOTES`.

---

## 6. Fases de implementación

### P0 — Hover + Score (acabado premium) · ~sesión 1
- [ ] `score` en las 100 citas existentes (placeholder determinístico).
- [ ] Hover abre `#quotePanel` anclado al cursor (escritorio); click mantiene panel "fijo" hasta cerrar.
- [ ] Score visible en el panel (barra + número).
- [ ] Glow/scale de la partícula al hover (lerp).
- [ ] Purga: revisar z-index del panel vs. `#d3-canvas` y halos.

### P1 — La Sala como stage de scroll + Filtros · ~sesión 2
- [ ] Reestructurar: el enjambre vive en un stage pinned propio (`#stageRoom`, 300vh) con beats de entrada/expansión/liberación (copy de maqueta).
- [ ] Barra de filtros (Voz × Convicción × Época) + contador + reset + estado vacío.
- [ ] Fade/shrink de partículas excluidas; chips que desaparecen por co-ocurrencia.
- [ ] Absorber/retirar la sección actual de 2 citas.
- [ ] Timeline: conectar su scrub a la nube (opcional, si da tiempo).

### P2 — Co-ocurrencia ligera · ~sesión 3
- [ ] Intersección de 2 voces en el contador (ver §4.4, opción barata).
- [ ] Microcopy de "historias" por combinación destacada (3–4 beats curados, tipo los de Hamilton: "El giro dovish de 2015", "Corbo en la fiebre de 2007").

### P3 — Datos reales
- [ ] Ingesta del dataset real (182 actas), reemplazo de `quotes.js`.
- [ ] Ajuste de eras y rotación de participantes.
- [ ] Testeo de performance con N real; decidir muestreo si procede.

---

## 7. Riesgos y decisiones abiertas

| # | Decisión | Estado |
|---|---|---|
| 1 | Color por tono vs. por participante | ✅ **Tono** (confirmado). Participante en el panel; toggle de codificación solo si se pide en P3. |
| 2 | ¿Qué mide "puntuación"? | ✅ Puntuación de orientación **hawk/dov del clasificador**, escala aún por definir. Maqueta: referencia 0–1; normalización en la ingesta si hace falta. |
| 3 | Posición temporal (X = año) | No forzar geometría en la nube; era = filtro + (P2) arcos. |
| 4 | ¿Se queda la sección de 2 citas? | ✅ Absorbida por La Sala (confirmado). |
| 5 | Nombre del stage | ✅ **"La Sala"** (confirmado). |
| 6 | Mobile: 1.000+ partículas | Ver P3; hoy el maquetado con 100 no lo estresa. |
| 7 | Raycaster con filtros activos | Ignorar partículas en fade (chequeo de opacidad) para no "captar" fantasmas. |
| 8 | Coreografía de la puerta | ✅ **(b) elegida**. Primero **(b1) velo** (sin Blender, hoy); upgrade a **(b2) swing real** si se separan los círculos en Blender (ver §3, pasos incluidos). |

---

## 8. Siguiente paso inmediato

1. ✅ Decisiones 1, 2, 4, 5, 8 confirmadas; ubicación de La Sala corregida (tras la puerta, §3).
2. **P1-a — La puerta (b1 velo)**: dolly de cámara + disolución de lo dorado (puerta + círculos) en luz cálida + fog en el umbral, con auto-adaptación (raycast: ¿hay hueco de vano en la pared gris?). Se valida en vivo (preview) antes de seguir. Si Joako separa los círculos en Blender (§3) → upgrade a (b2) swing con el mismo esqueleto de coreografía.
3. **P0 — Hover + score de referencia** sobre las 100 citas actuales (panel anclado al cursor, score 0–1 determinístico).
4. **P1-b — Filtros** (voz × convicción × época) + contador + reset → próxima sesión.
