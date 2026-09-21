# Ejecutado el 2026-09-21 — coherencia y método (hasta la stage de método)

Qué se hizo sobre el checkout de `arena/01a0c4c6-d3-test`, en respuesta a
`docs/REVISION_2026-09-21.md` y `docs/OPINION_PAPER_Y_RESULTADOS.md`. Este
documento cierra los puntos de esos dos diagnósticos que ya están resueltos en
código, y deja escrito qué queda para la sección de Resultados.

**No se tocó** la narrativa ni el orden de las secciones (`docs/NARRATIVA.md`):
eso espera tu decisión sobre el titular y el esquema de actos.

---

## 1. Lo que cambió, punto por punto

### 1.1 Los contadores ya no se contradicen (era el hallazgo más visible)

`#stageCounters` decía, en la misma pantalla, **16 años · 2000–2015 · 182
reuniones · 17 participantes**, mientras el número grande de al lado se
calculaba del dataset y decía 37. Ahora:

| Dato | Antes | Ahora | De dónde sale |
|---|---|---|---|
| Años | 16 declarados · 2000–2015 | **11 · 2005–2015** | `data/web/resumen.json` |
| Reuniones | 182 | **132** | idem |
| Fragmentos | 99 | 99 ✅ | `quotes.js` |
| Participantes | 17 | **37** | `quotes.js` |

Los dos del corpus se hidratan desde el agregado y tienen respaldo escrito en
el HTML (funciona sin red). Los dos de la muestra se calculan como siempre.

### 1.2 La nota de la sección dice lo que de verdad importa

La nota ahora separa las dos escalas y nombra el dato que explica todo el
patrón de la pieza: en el corpus **solo 893 de 9.725 intervenciones (9,2%) son
direccionales**; en la muestra visible son **66 de 99 (dos de cada tres)**. La
muestra está balanceada a propósito —33/33/33— para que se puedan tocar las
tres orientaciones, y por eso su proporción no estima la del corpus. Eso estaba
implícito y no escrito; sin escribirlo, cualquier lector atento de 2009 saca la
conclusión falsa ("el Banco estaba dovish") que ya señalaba la revisión.

### 1.3 La metodología dejó de describir otro modelo

`index.html` decía *"La guía few-shot usa ejemplos para la consulta; no entrena
un modelo general"*. Los datos que trae el repo son de **`W+C+600`**: ensamble
de cinco clasificadores lineales sobre TF-IDF de palabra y carácter, 1.596
intervenciones en entrenamiento y 300 reservadas como evaluación ciega
(`data/fase-2/manifest.json`). Ahora la stage de método cuenta eso, en tres
sitios: `#stageHook` (una línea), el pipeline (panel 03 completo) y el panel 02,
que ahora dice con precisión que la etiqueta viene del clasificador y que la
selección es editorial y balanceada, no un muestreo.

También: `"confianza del ejemplo"` → **`"score del ejemplo"`**, y una frase que
faltaba: *la coincidencia entre los cinco miembros mide estabilidad del
ensamble, no certeza*. Con 98,3% de unanimidad, mostrarlo como "acuerdo" es
leerlo al revés.

### 1.4 Un solo período en toda la pieza: el real

Cuatro secciones dibujaban su eje sobre `2000–2015` escrito a mano:

| Sitio | Síntoma | Ahora |
|---|---|---|
| Mapa de intervenciones (`axes-map.js`) | 99 puntos apiñados en la derecha: un cuarto del eje sin datos | ventana derivada de la muestra |
| El lenguaje cambia (`word-evolution.js`) | 5 columnas/años vacíos a la izquierda | 2005–2015 |
| Índice por año (`timeline.js`) | anotaba *"sin muestra: 2000–2004"* sobre años que nunca existieron | 2005–2015 |
| Pipeline, panel 04 | grilla de 16 columnas, 5 vacías | 11 columnas |
| Banda temporal de las partículas (`main.js`) | 11 años sobre el 71% del ancho, extremo izquierdo vacío justo donde mira la cámara | 2005–2015 |

La ventana sale de `sampleYearWindow()` (`js/core/utils.js`), derivada de las
fechas de `quotes.js`, no de una constante.

### 1.5 Capa de datos nueva: `data/web/`

No existía ninguna forma de que el navegador supiera el tamaño del corpus. Ahora:

```bash
npm run build:data     # → data/web/resumen.json (18 KB) + manifest.json
```

- `scripts/build-web-data.py` agrega desde `data/fase-2/` y guarda el `sha256`
  de cada archivo de entrada y de salida, más el commit de origen declarado.
- `js/core/web-data.js` es el único consumidor: una promesa por archivo,
  cacheada, y **nunca rechaza** (devuelve `null` y el HTML mantiene su
  respaldo).
- `data/web/resumen.json` trae `meta` (corpus completo), `anual` (11 filas) y
  `actores` (55 filas, con cargos y mandato desde `actores_metadata.csv`).
  **Eso es la materia prima de la sección de Resultados**: `anual` y `actores`
  ya están resueltos, con la métrica tal como la calculó la fuente
  (`tono_neto_general`), para no tener dos definiciones del mismo índice.

### 1.6 El arnés ahora lo vigila

Tres comprobaciones nuevas en `tools/smoke-test.mjs` (y `data/web` añadido a
`npm run check`):

1. Cada `<span data-corpus-stat="…">` del HTML coincide con el agregado.
2. Los `data-target` de los contadores coinciden con `n_anios` / `n_reuniones`.
3. No reaparece ninguna cifra de la maqueta vieja (`182 reuniones`, `16 años`,
   `2000–2015`, `17 participantes`, `few-shot`, `modelo de lenguaje`), y el
   loader hidrata de verdad los huecos del DOM.

### 1.7 Restos menores

- Kickers `Acto 4/5/6` → sin número. No existían los actos 1, 2 ni 3 visibles,
  así que el primer número que veía el lector era "Acto 4". Los kickers vuelven
  cuando el esquema esté cerrado.
- Eras del navegador de actas: empezaban en 2000 y las dos primeras eran
  inalcanzables. Quedan cuatro, con los mismos episodios recortados a
  2005–2015.
- Meta/OG/JSON-LD, epílogo, `README.md` y `package.json`: "16 años / 2000-2015 /
  182 / 17" → ventana y corpus reales; "modelo de lenguaje" → TF-IDF.
- `docs/NARRATIVA.md` §2 y §5 citan "16 años declarados, 182 reuniones": son
  citas de lo que decía la pieza, se conservan como registro.
- `npm run format:check` volvió a pasar (se excluyeron de Prettier el agregado
  generado y el manifest de la fuente externa).

---

## 2. Verificación

```bash
npm run check     # 0 errores · 13 comprobaciones ok (3 nuevas de coherencia)
npm run lint      # 0 errores, 1 warning preexistente (main.js:4002 stairT)
npm run format:check  # limpio
npm run shots -- --only=stageCounters,stagePipeline,stageAxes,stageWordEvolution
```

Capturas revisadas a 1440×900 y 1600×900: contadores y nota cerrando con la
gráfica de la timeline, grilla del pipeline en 2005–2015, eje del mapa,
evolución del lenguaje y directorio de voces ("37 voces · 99 fragmentos").

---

## 3. Lo que queda (y por qué no lo hice)

| Pendiente | Por qué espera |
|---|---|
| **Sección de Resultados** | Necesita tu decisión: ¿un índice anual del **corpus** (n=9.725) con la muestra (99) encima como puntos, o el índice de la muestra con contexto? La primera es más honesta; la segunda es más táctil. `data/web/resumen.json` ya sirve para las dos. |
| **Reordenar actos** (`docs/NARRATIVA.md` §4) | Propuesta concreta y barata (`cameraChoreographyStops` se ancla a ids del DOM y se recalcula sola), pero mueve el arco entero: es tu decisión. |
| **Contrato de interacción 3D↔DOM** (`REVISION` §3.4) | Las dos listas (`isInteractiveTarget()` y `pointer-events:auto`) siguen desincronizables. Es media tarde y conviene hacerlo **antes** de la sección nueva, porque trae controles nuevos. |
| **Partir `animate()`** (`README` Paso 3) | Delicado; después de la sección nueva. |
| **Cruce con TPM / comunicado** | Dato externo que no está en el repo. Es lo que convierte esto en el paper de mayor techo. |
| **`data/fase-2/eval/`** | El benchmark contra encoders (BETO / MrBERT) **no está en este repo**, aunque el manifest declare su `sha256`. Mientras no esté, cualquier cifra de esa comparación no es verificable desde el artefacto. |

---

## 4. Nota sobre los dos documentos de diagnóstico

- `REVISION_2026-09-21.md` §3.2 dice que `score` es maqueta: **ya no lo es**
  desde que `quotes.js` se genera con `build-particle-quotes.py`. Lo que sí
  sigue vigente de ese punto es la asimetría real: la muestra es muy hawkish en
  2005–2011 y muy dovish en 2012–2014, y el corpus no (en 2009 hay 113
  hawkish y **0 dovish** de 675 intervenciones). Eso ahora está dicho en
  pantalla al separar las dos escalas, pero merece una nota de método propia
  cuando se escriba la sección de Resultados.
- `OPINION_PAPER_Y_RESULTADOS.md` §4.1 proponía `css/29-stage-results.css` y
  `js/sections/results-*.js`: sigue siendo el camino, y los seis puntos de
  soldadura que enumera son correctos. Lo único que cambia es que el punto 5
  (capa de datos) **ya está construido**: no hace falta un `data/web/` nuevo,
  hay que extender el generador que existe.
