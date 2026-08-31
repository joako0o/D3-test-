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
| `figures/soporte.glb` | Pedestal | Base de la pieza central | ✅ listo |
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

**Figuras ya incluidas:**

- ✅ **`figures/soporte.glb`** — Pedestal escalonado (3 discos) sobre el que se
  apoya la estatua. Origen: `Soporte.glb` subido a la raíz del repo (1.04 MB,
  Meshy, solo POSITION, 57.6 k triángulos). Pipeline de compresión:
  `weld` → `simplify --ratio 0.12 --error 0.002` (57,622 → **6,914**
  triángulos) → normales generadas con **crease de 38°** (el GLB no traía
  NORMAL: sin esto three.js lo renderiza en flat shading y el disco se ve
  facetado) → **Draco** (posición 14, normal 10). Resultado: **28 KB**
  (−97.3 %), `validate` sin errores ni warnings. El GLB original ya no vive en
  el repo (misma convención que la puerta/moneda: solo se versiona el
  comprimido); si hace falta se recupera con
  `git show 2119432:Soporte.glb > Soporte.glb`.
  En `js/figures.js` es `scale: 0.82` (el `scale` normaliza la dimensión mayor
  → aquí es el DIÁMETRO; el alto sale 0.186) y acabado piedra oscura azulada.
- ✅ **`figures/balanza.glb`** — La Justicia ciega (Lady Justice con la balanza),
  el símbolo del equilibrio. Origen: `Meshy_AI_Blind_Justice_Statue_0831090221_generate.glb`.
  Se normalizó a la convención del proyecto: **Draco**, **38.5 k triángulos**,
  **177 KB** (<300 KB), **acabado PIEDRA mate** (limestone, metallic 0, rough 0.82,
  color `#c7b9a4`), normales recalculadas y **base apoyada en `y=0`**.
  `available: true` en `js/figures.js` con `finish` propio en el def.
  Va **apoyada sobre el pedestal** vía `standsOn: 'soporte'`: el sistema mide el
  alto real del pedestal al cargarlo y recoloca la estatua (`restack()`), así el
  alto no queda escrito a mano en dos sitios.

---

### TODO — TU TAREA (figuras Blender)
1. ✅ **Balanza** y ✅ **pedestal** ya están (ver arriba).
2. Exporta `figures/inflacion.glb` y `figures/brote.glb` con Draco y <300 KB.
3. Repite con `acta.glb`, `corpus.glb` y `campana.glb`.
4. Cuando tengas las demás, edita `js/figures.js` para ajustar posición/escala
   (si una figura va sobre otra, usa `standsOn: 'idDeLaBase'`).
