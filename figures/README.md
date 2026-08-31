# `figures/` — Dioramas 3D que modelas tú en Blender

Aquí viven los GLB de las "figuras" del proyecto. La idea es que cada **dato**
tenga un **objeto** propio (como ya tienes moneda y puerta), de modo que el
lector "toque" la evidencia en vez de solo leerla.

## Convención de export (la que usa `js/figures.js`)

- **Formato:** `.glb` + compresión **Draco** (igual que `monedav5-draco.glb`).
- **Nombres:** minúsculas y sin espacios, exactamente estos (o actualiza la
  lista en `js/figures.js`):

| Archivo esperado | Figura | Dato que representa | Prioridad |
|---|---|---|---|
| `figures/balanza.glb` | Balanza | Equilibrio hawkish / dovish por año | Alta |
| `figures/inflacion.glb` | Vela / termómetro | Presión inflacionaria | Alta |
| `figures/brote.glb` | Brote / árbol | Crecimiento, holgura | Media |
| `figures/acta.glb` | Manuscrito / volumen | El acta trazable | Media |
| `figures/corpus.glb` | Biblioteca | 182 reuniones del corpus | Baja |
| `figures/campana.glb` | Campana | Inicio / cierre de reunión | Baja |

## Convención de tamaño y material (para que se vea "una familia")

- **Escala:** exporta pensando en que la figura se inserta en un mundo de
  ~2–6 unidades de alto. En `js/figures.js` cada figura tiene su propio
  `scale`, así que no necesitas calibrarla con precisión.
- **Materiales:** usa un solo lenguaje: **oro** (`#ffd76a`, metal, roughness
  ~0.22), **obsidiana** (`#0d0f16`, mate, roughness ~0.75), **azul dovish**
  (`#8ab4f8`). Si una figura tiene otro color, se ve "de otro proyecto".
- **Presupuesto:** **menos de 300 KB** por GLB (con Draco). Si pesa más,
  decima y comprime.
- **Pivote:** centrado y con la base en `y=0` (el código lo apoya en el suelo).
- **Luces:** el proyecto ilumina las figuras; no exportes luces ni cámaras.

## Estado actual

El sistema intenta cargar cada GLB. **Si el archivo no existe todavía**, dibuja
un **placeholder** (icosaedro + halo) y lo marca como "por modelar" en el
gabinete inferior. Así puedes dejar la escena andando y terminar las figuras
de a poco.

---

### TODO — TU TAREA (figuras Blender)
1. Modela primero **la balanza** (es la más narrativa).
2. Exporta `figures/balanza.glb` con Draco y <300 KB.
3. Súbelo a este repo. El placeholder se reemplaza solo al recargar.
4. Repite con `inflacion.glb` y `brote.glb`.
5. Cuando tengas las demás, edita `js/figures.js` para ajustar posición/escala.
