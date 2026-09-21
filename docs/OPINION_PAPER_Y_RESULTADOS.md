# Opinión sobre la pieza + ruta a paper + cómo conectar la sección de Resultados

Lectura hecha el **2026-09-21** sobre el checkout de `arena/01a0c4c6-d3-test`
(commit `1b2213e`), con conteo directo sobre los datos, lectura de los cinco
módulos de `js/sections/`, de `js/main.js` (5.591 líneas), de los scripts de
build y de las capturas reales de `.shots/`.

Este documento **no cambia código**. Es el diagnóstico que pediste antes de
darme reglas: qué me parece, el pseudo-código con el que me lo explico, qué
techo real tiene el modelo TF-IDF de cara a publicar, y el diseño de conexión
para la sección de Resultados que vas a rehacer.

> **Aviso:** `docs/REVISION_2026-09-21.md` (sesión anterior) ya está viejo en un
> punto clave: dice que `score` es maqueta. **Ya no lo es.** `js/data/quotes.js`
> se genera hoy con `scripts/build-particle-quotes.py` desde
> `data/fase-2/candidatos-particulas.csv` + `candidatos-crisis.csv`: las 99
> citas son reales, con fecha, actor y score del clasificador. Ese diagnóstico
> §3.2 hay que releerlo con esto en cuenta.

---

## 0. Resumen en diez líneas

1. La **ingeniería** de esta pieza está por encima de lo que se ve publicado: arnés de verificación, contratos escritos, presupuesto de rendimiento medido.
2. El **3D** (moneda, puerta, estatua) es lo mejor que tienes y ya juega en primera división.
3. Lo **más débil** es justo lo que sostiene el argumento: la zona de resultados. El mapa de intervenciones son 99 puntos en un campo de 1440 px y la línea por año son 11 puntos con 5–15 fragmentos detrás.
4. Tienes **9.725 intervenciones reales, 132 reuniones, 55 actores** en `data/fase-2/` y el navegador no lee ni un byte de ahí.
5. El índice anual se calcula sobre la **muestra editorial (99)** cuando el corpus da **675–1.048 por año**. Eso no es un detalle: con 8 fragmentos, el índice es ruido; con 800, es una medición.
6. La copia del `#stagePipeline` dice **"la guía few-shot"** y **"no entrena un modelo general"**, pero el modelo real es **TF-IDF + clasificador lineal con 5 miembros** (W+C+600). La metodología que cuenta la pieza no es la que usaste.
7. Los contadores siguen diciendo **16 años / 2000–2015 / 182 reuniones / 17 participantes**; los datos dicen **11 años / 2005–2015 / 132 reuniones / 37 voces en la muestra**. Se contradice en la misma pantalla.
8. **El modelo tiene techo de publicación, pero no por TF-IDF.** Lo publicable no es el clasificador: es el objeto de estudio (comunicación privada vs. pública en un banco central emergente) y el corpus etiquetado.
9. Falta **una capa de datos derivados** (`data/web/`) y **un punto de soldadura** para la sección nueva. Existen seis puntos exactos donde enchufar; están abajo con archivo y línea.
10. La sección de Resultados **no hay que "conectarla", hay que darle un contrato**: datos por parámetro, estado en `interaction-state.js`, cámara por `id` de DOM e interacción registrada en `isInteractiveTarget()`. Nada más.

---

## 1. Qué me parece, en general

### 1.1 Lo que está por encima de la media (y no hay que tocar)

| Área | Por qué destaca |
|---|---|
| **Arnés de verificación** | `check` (jsdom, imports, ids), `shots` (13 capturas con WebGL real), `hero:check` (12 viewports), `perf`, `startup`, `perf:mint`, `lh`. Casi ningún proyecto individual tiene esto; casi ningún equipo lo mantiene. |
| **Contratos escritos y respetados** | Una sección no importa `main.js`; el único puente 3D↔DOM es `interaction-state.js`; `css/` ordena la cascada por prefijo numérico; `js/*.js` es fuente y `js/app.js` derivado. Se cumple, no es retórica. |
| **Procedencia de datos** | `data/fase-2/manifest.json` con `sha256` por archivo y commit de origen. Eso es práctica de paper, no de web. Ya lo tienes hecho. |
| **3D** | La composición del hero contra el titular, la puerta reconstruida (vano, jambas, bisagras, medallas), la estatua con pedestal y órbitas. Es lo que sostiene la pieza visualmente. |
| **Local-first** | three, GSAP, D3, Lenis, SplitText y el decodificador Draco servidos del repo. Cero dependencia de CDN para que la pieza funcione. |
| **Documentación** | `README.md` (1.063 líneas), `js/README.md`, `css/README.md`, `docs/NARRATIVA.md`, `docs/PLAN_NIVEL_PREMIUM.md`. El problema no es que falte memoria: es que la memoria ya cuenta otra cosa (ver 1.2). |

### 1.2 Los tres problemas que más me molestan hoy

**(a) La pieza mide el corpus con una regla de 10 cm.**
`js/sections/timeline.js` agrega el índice anual desde `quotes.js`: 99 fragmentos,
5–15 por año. El corpus real (`indices_por_anio.csv`) tiene 675–1.048
intervenciones por año, con `tono_neto_general` y `score_hd_continuo_medio` ya
calculados. Con 8 fragmentos por año, el índice de un año es
aproximadamente un lanzamiento de moneda (con n=8, el intervalo de confianza al
95 % de una proporción de 0,25 es ±0,30). El gráfico **y** el argumento mejoran
si la línea se dibuja con el corpus y los 99 se muestran como lo que son: la
muestra que el lector puede **tocar** y verificar.

**(b) La metodología que se cuenta no es la metodología que hay.**
`index.html:645` — *"Los 99 registros visibles ya llevan una etiqueta observable…
La guía few-shot usa ejemplos para la consulta; no entrena un modelo general."*
Eso describe el prototipo viejo. Los datos que trajiste son de
`W+C+600` (TF-IDF palabra + carácter, 5 miembros, `usado_en_entrenamiento=True`
en 1.596 filas). Es el punto que un jurado, un tribunal o un referee lee
primero, y hoy la pieza se equivoca sobre sí misma.

**(c) El "antes de seguir" llega después, y con los números mal.**
`#stageCounters` está en la posición 9 de 13 y dice: 16 años (son 11), 2000–2015
(la ventana es 2005–2015), 182 reuniones (el corpus tiene **132**), 17
participantes (la muestra tiene **37**). `docs/NARRATIVA.md` ya diagnostica lo
del orden; lo de los números se arregla solo si se calculan del dataset en vez
de escribirse en el HTML.

### 1.3 Declarado vs. real (medido en este checkout)

| Dato | Declarado en la pieza | Real (contado) | Dónde |
|---|---|---|---|
| Ventana | 2000–2015 · "16 años" | **2005–2015 · 11 años** | `index.html:585`, `:8`, `:12`; `quotes.js` |
| Reuniones | 182 | **132** | `index.html:590` vs `clasificacion_wc600_9725.csv` (`meeting_id` únicos) |
| Fragmentos | 99 | **99** ✅ | `quotes.js` |
| Participantes | 17 | **37** (muestra) · **55** (corpus) | `index.html:600/604` vs `quotes.js` y `indices_por_actor.csv` |
| Reparto H/D/N | 35/35/29 | **33/33/33 (exacto)** | `quotes.js` (por construcción: `TARGET_PER_LABEL = 33`) |
| Score | (era maqueta) | **real**, `score_hd_continuo` | `build-particle-quotes.py` |
| Corpus total | — (no se usa) | **9.725 intervenciones · 2,1 M palabras** | `corpus_bcch_2005_2015.csv` |

Los tres primeros son los que un lector atento detecta hoy, porque la pieza los
pone **a la vista y en grande**, no en un pie de página.

---

## 2. Pseudo-código: cómo funciona esto hoy (mi mapa mental)

Complementa el §4 de `REVISION_2026-09-21.md` (ese describe el arranque y el
frame). Este describe **el flujo de datos y los puntos de soldadura**, que es lo
que necesitas para enchufar la sección nueva.

```
FUENTES (fuera del navegador, en el repo)
  data/fase-2/corpus_bcch_2005_2015.csv          9.725 intervenciones, 132 reuniones, 2005–2015
  data/fase-2/resultados/clasificacion_wc600...   predicción, 5 miembros, score continuo, relevancia, rol
  data/fase-2/resultados/analisis_descriptivo/*   9 agregados listos (por año / actor / reunión / tema)
  data/fase-2/actores_metadata.csv                55 actores con mandato, cargos, fuente
  data/fase-2/manifest.json                       sha256 + commit de origen   ← sirve para el paper
        │
        │  ÚNICO camino automatizado que existe hoy:
        │  python3 scripts/build-particle-quotes.py
        │     · elige 33 por etiqueta con diversidad de actor/año (anti-clonado)
        │     · mete crisis 2008–2009 (5 H / 10 D)
        │     · intercala etiquetas para que la nube no salga ordenada
        ▼
  js/data/quotes.js  →  window.QUOTES[99]  {text, participant, year, label, score, date, formatted_date}
        │  (quotes.min.js lo deriva build-js.mjs; window.QUOTES es un <script> clásico)
        ▼
  js/main.js
     const quotes = window.QUOTES
     │
     ├─ buildParticleStoryTargets()   ← SÍNCRONO a propósito: el hero lee los buffers en el primer frame
     │     posiciones objetivo de la nube, sembradas con (índice, i) y NO con Math.random()
     │
     └─ deferBoot(tarea) × 5          ← FIFO; el ORDEN es parte del contrato
          1  voice-explorer.js   initVoiceExplorer({quotes, openQuote, closeQuotePanel})
          2  axes-map.js         initD3Axes({quotes, openQuote})            + loadD3()
          3  word-evolution.js   initWordEvolution(quotes)                  + loadD3()
          4  act-browser.js      initActBrowser({quotes, openQuote})
          5  timeline.js         initTimeline(quotes)                       + loadD3()   ← trae un `pin`
          …
          onDeferredBootDone → refreshLayout()  (recalcula TODOS los triggers contra la altura final)

  CADA SECCIÓN (contrato que ya se cumple en las 5)
    · recibe datos por PARÁMETRO (no lee window.QUOTES ni importa main.js)
    · escribe/lee el 3D SOLO por js/core/interaction-state.js
    · crea sus propios ScrollTrigger dentro de su init()
    · devuelve el foco al abrir/cerrar el panel de cita (focusReturn.card)

  EL 3D SE ENTERA DE LA SECCIÓN POR TRES VÍAS (y ni una más)
    a) cameraChoreographyStops[i].id            → posición/look de cámara por id de DOM
       rebuildCameraChoreography() recalcula las fracciones desde el DOM real, así que
       mover o añadir una sección NO desalinea la cámara… pero hay que REGISTRAR el id.
    b) interaction-state.js                     → selection{hover,pinned} · particleFocus.index
                                                  voiceFocus{participant,rendered,quoteIndex}
                                                  axesState.scales (D3 publica, la nube consume)
    c) isInteractiveTarget() (main.js:1991)     → 22 selectores; si un control nuevo no está
       + pointer-events:auto (00-tokens-base)      en la lista, el clic se lo come el hit-test
                                                   de partículas. Son DOS listas en paralelo.
```

**Lo que no existe y es la causa de que "no sepas cómo conectarlo":** no hay
ninguna capa entre los CSV agregados y el navegador. Las secciones de hoy leen
`quotes.js` (99 ítems); los agregados de `data/fase-2/resultados/` (que son
justo lo que una sección de Resultados necesita: por año, por actor, por
reunión, por tema) **no llegan al sitio por ningún camino**. La carpeta
`data/web/` que anuncia el propio `data/fase-2/README.md` ("las
transformaciones para navegador deben generarse en una carpeta separada") está
sin crear. Ese es el hueco.

---

## 3. El modelo (TF-IDF + lineal): potencial real para publicar

### 3.1 Qué tienes, medido

| Activo | Número | Por qué importa para publicar |
|---|---|---|
| Corpus | **9.725 intervenciones · 132 reuniones · 55 actores · 2005–2015 · 2,1 M palabras** | Es el corpus español más grande de deliberación de un banco central que existe públicamente. En Chile, el único. |
| Etiquetado | **1.596 filas** con `usado_en_entrenamiento=True` (1.238 N / 215 H / 143 D) | Suficiente para un modelo lineal; suficiente para un paper de datos. |
| Evaluación ciega | **300 filas** (`rol=evaluacion_ciega`; 223 N / 46 H / 31 D) | Es el número que un referee mira primero. 77 direccionales ⇒ **intervalos anchos**: hay que reportarlos. |
| Ensamble | **5 miembros**; 9.556/9.725 unánimes (98,3 %) | Útil como *reproducibilidad*, **inútil como medida de confianza** (ver 3.4). |
| Filtro de relevancia | 7.806 relevantes / 1.919 no | Un resultado por sí mismo: no todo lo que se dice en la sala es señal de postura. |
| Temas | NMF + 6 ejes + log-odds por actor (`vocabulario_distintivo_por_actor.csv`, 540 n-gramas) | Ya tienes el análisis "de qué se habla" y "quién lo dice distinto" sin construirlo. |
| Metadata de actores | 55 filas con mandato, cargos, fuente, `verificado` | Habilita efectos fijos por consejero en un paper económico. |
| Pieza interactiva | este repo | El *artifact* / material suplementario que casi ningún paper tiene. |
| Procedencia | `manifest.json` con sha256 + commit | Declaración de disponibilidad de datos ya medio escrita. |

**El desbalance es la noticia, no un defecto:** de 9.725 intervenciones, el
modelo marca **893 direccionales (9,2 %)** y **8.832 neutrales**. La
"orientación" vive en una décima parte del corpus. Cualquier paper honesto
empieza por ahí; cualquier pieza honesta también (y hoy la pieza no lo dice).

### 3.2 Lo que TF-IDF puede y no puede darte

- **Puede**: ser un baseline fuerte en clasificación de postura en textos cortos
  y en español, reproducible en una laptop, con atribuciones por término
  (interpretable: las palabras que empujan a hawkish/dovish se pueden mostrar —
  es exactamente el material de la sección que vas a rehacer).
- **Puede**: sostener el argumento de que **con 1.596 ejemplos etiquetados en un
  dominio especializado, un lineal sobre TF-IDF iguala o supera a un transformer
  grande**. Ese resultado, si lo mides, es publicable en sí mismo (es un
  resultado de *costo/beneficio de anotación*, no de "usamos TF-IDF").
- **No puede**: ser la contribución. "Aplicamos TF-IDF a actas del BCCh" no pasa
  revisión en ningún sitio serio en 2026. La novedad tiene que estar en el
  **objeto** (qué preguntas permite responder) o en los **datos** (corpus
  etiquetado + protocolo), no en la técnica.

### 3.3 Los tres papers posibles (y cuál perseguir)

| | Paper | Contribución | Dónde va | Realismo |
|---|---|---|---|---|
| **A** | **Dataset / benchmark** | Corpus español de deliberación de banca central 2005–2015: 9.725 intervenciones, 1.596 etiquetadas, 300 ciegas, codebook, línea base TF-IDF y transformer. | *Data in Brief*, *Scientific Data* (más exigente), *LREC-COLING*, Zenodo + DOI | **Alto.** Es trabajo de documentación, y la mitad ya está hecha (`manifest.json`). |
| **B** | **Método / NLP aplicado** | Qué hace funcionar la detección de postura en actas en español: palabra vs. carácter, filtro de relevancia, calibración, umbral, y comparación honesta con BETO/XLM-R y con un LLM en zero-shot. | *ECONLP*, *FinNLP*, *Workshop on Financial Narrative Processing* (ACL/EMNLP), *Journal of Central Banking Theory and Practice* | **Medio-alto.** Requiere baselines modernos + ablaciones + calibración. |
| **C** | **Economía / ciencia política** | **Lo privado y lo público**: el tono de la deliberación (a puerta cerrada) frente al tono del comunicado publicado, contra la decisión real de TPM, con efectos fijos por consejero. | *Latin American Journal of Central Banking*, *Economía Chilena* (BCCh), *Estudios Públicos*, *Journal of International Money and Finance*, *Emerging Markets Review* | **Medio**, y es el de **mayor techo**. Es el único que responde "¿y qué?" |

**Mi apuesta: C como norte, A como seguro, B como puente.** El orden natural es
A → B → C: A te da el DOI y la disciplina de documentar; B te da la tabla de
resultados que C necesita en el apéndice; C es el titular.

**El titular que veo en tus datos** (no lo puedo afirmar sin hacer el cruce, pero
está apuntado y es la pregunta que nadie ha hecho para Chile): *las actas
privadas son más restrictivas que el comunicado público*, o su contraria, *el
comunicado anticipa el cambio de tasa y la deliberación lo sigue*. En tus datos
hay `topico_humano = acuerdo_comunicado` (1.761 intervenciones) y
`decision_tpm` (446): la comparación **privado vs. público** es un JOIN, no un
proyecto nuevo.

### 3.4 Lo que hay que añadir sí o sí (checklist de referee)

Ordenado por cuánto daño hace si falta:

1. **Validación externa contra la TPM y las decisiones.** Une por `fecha` /
   `meeting_id` con la serie de tasa de política monetaria del BCCh (pública) y
   con la EOF (expectativas). Sin esto, el índice es un número sin referencia y
   el paper se cae en la revisión. Con esto, hay una figura que nadie más tiene.
2. **Intervalos de confianza con agrupamiento por reunión** (bootstrap de
   bloques: las intervenciones de una misma reunión no son independientes).
   Reportar macro-F1 y por clase sobre las 300 ciegas **con IC**, no un punto.
3. **Calibrar las probabilidades.** El propio nombre de las columnas lo delata:
   `prob_h_no_calibrada`. En un paper eso no se publica sin Platt/isotónica y
   sin una curva de fiabilidad. Bonus: es lo que hace legítimo mostrar una barra
   de "confianza" en la web.
4. **Dejar de usar `acuerdo_miembros` como confianza.** Con 98,3 % de unanimidad
   y cinco miembros que son el mismo modelo, la unanimidad mide estabilidad, no
   certeza. Si la pieza lo muestra como "acuerdo entre miembros", un lector
   técnico lo va a leer al revés.
5. **Acuerdo entre anotadores y codebook.** ¿Quién etiquetó las 1.596? Si hay un
   segundo anotador, κ de Cohen / α de Krippendorff. Si las etiquetas salieron de
   una guía + reglas, decirlo y publicar la guía. Y ojo con la **circularidad**:
   si la guía con la que se etiquetó es la misma lógica que luego se evalúa, hay
   que decirlo explícitamente.
6. **Ablaciones** (barato, y es lo que convierte "usamos TF-IDF" en un
   resultado): palabra sola / carácter solo / ambas; con y sin stopwords; con y
   sin `class_weight='balanced'`; con y sin filtro de relevancia; sensibilidad al
   umbral de decisión direccional. Cada fila es una tarde.
7. **Baselines modernos**: BETO / RoBERTa-BNE / XLM-R fine-tuned sobre las
   mismas 1.596 y evaluados en las mismas 300; y un LLM en zero-shot. Si TF-IDF
   queda cerca, **ese es el resultado** y se defiende solo.
8. **Reproducibilidad**: semillas, versiones, split congelado (ya tienes
   `usado_en_entrenamiento` y `rol`), y el `manifest.json`. Publica el corpus en
   Zenodo con DOI y enlaza la pieza como *artifact*.
9. **Limitaciones escritas** (y leídas en voz alta antes de escribir el
   titular): 90,8 % neutral; una sola institución; 132 reuniones de 11 años;
   51 filas con `flag_texto_danado=True`; fragmentos truncados; el corpus cubre
   la deliberación **publicada** en actas, no toda la sala.

### 3.5 Riesgos concretos que ya se ven en tus datos

- **2009**: el corpus real tiene 113 hawkish y **0 dovish** de 675 intervenciones;
  la selección editorial de candidatos reforzó la asimetría. Un titular de 2009
  ("el Banco estaba dovish") se lee de la muestra y no se sostiene en el corpus.
- **Etiqueta neutral absorbente**: si el 90,8 % es neutral, el modelo puede tener
  un macro-F1 decoroso solo por las direccionales. Hay que reportar por clase.
- **La pieza promete "lo que se dijo a puerta cerrada"** mientras su muestra es
  el 1 % del corpus y su eje temporal tiene 11 puntos. Eso no es un problema de
  código: es el hueco que la sección de Resultados nueva tiene que cerrar.

### 3.6 Veredicto de techo

- **Como paper de datos**: sí, con esfuerzo de documentación (semanas, no meses).
- **Como paper de método**: sí, si añades calibración + ablaciones + un baseline
  moderno. Sin eso, no pasa de un workshop/poster.
- **Como paper económico con hallazgo**: sí, y es el que vale. Depende de
  **una** cosa que no está en el repo: el cruce con las decisiones de tasa.
- **Como pieza que se muestre donde se muestran las buenas** (Information is
  Beautiful Awards, Nightingale/DVS, Awwwards Honorable Mention): el 3D ya
  compite; lo que resta puntos hoy es exactamente la zona de datos (puntos
  dispersos, mucho campo vacío, tipografía pequeña en los gráficos).

---

## 4. Cómo conectar la sección de Resultados nueva

### 4.1 Los seis puntos de soldadura (dónde se engancha, exactamente)

| # | Punto | Archivo | Qué hacer |
|---|---|---|---|
| 1 | **Marcado** | `index.html` | `<section id="stageResults" aria-labelledby="...">` con los `id` que el JS va a buscar. **El `id` es la interfaz**: la cámara y los tests se anclan a él. |
| 2 | **CSS** | `css/29-stage-results.css` | Una hoja nueva. El prefijo numérico ES el orden de cascada y `build-css.mjs` la recoge sola (hoy la última es `28-height-fixes.css`). |
| 3 | **Módulo** | `js/sections/results-*.js` | `export function initResults({ quotes, openQuote, closeQuotePanel, data })`. Cero `import` de `main.js`. Si usa D3, lo recibe (`loadD3()`). |
| 4 | **Enchufe** | `js/main.js` (~`deferBoot`) | Registrarlo en la cola **en el punto del orden que le toque** (después de `timeline` si va debajo: el `pin` de timeline cambia la altura del documento). Y añadir el `id` a `cameraChoreographyStops` con su `pos`/`look`. |
| 5 | **Estado** | `js/core/interaction-state.js` | Si la sección manda algo al 3D (año elegido, actor, tono), se añade **ahí** un objeto (`resultsState = { anio: null, actor: null, tono: null }`). Es el único puente permitido. |
| 6 | **Interacción** | `js/main.js:1991` (`isInteractiveTarget()`) + `css/00-tokens-base.css:158` (`pointer-events:auto`) | Todo control nuevo (botón, chip, punto) tiene que entrar en **las dos** listas o el clic se lo come el hit-test de partículas y "abre otra cosa". |

Después: subir el `?v=` de `js/app.js` en `index.html` (y el `?v=` del propio
`import()` de la sección) y correr `npm run build:js && npm run check`.

### 4.2 La capa que falta: `data/web/` (esto es lo que "conecta" los resultados)

Regla: **ninguna sección lee CSV.** Se lee un JSON derivado, pequeño, versionado
y con procedencia. `quotes.js` sigue siendo la muestra editorial (99) para la
nube y el panel de cita; los agregados van aparte.

```python
# scripts/build-web-data.py   (nuevo; el hermano de build-particle-quotes.py)
leer data/fase-2/resultados/analisis_descriptivo/*.csv
leer data/fase-2/actores_metadata.csv
leer data/fase-2/manifest.json                      # para el bloque meta
unir con la serie de TPM por fecha (CSV que hay que traer del BCCh)   # ← validación externa
emitir:
  data/web/resultados.json     # lo que la sección necesita para dibujar
  data/web/resultados.min.json # versión minificada (o el mismo, gzip lo arregla)
  data/web/manifest.json       # sha256 de cada salida + commit origen + fecha
```

Esquema propuesto (dimensionado: ~25–40 KB sin minificar; la pieza entera pesa
mucho más en fuentes):

```json
{
  "meta": {
    "fuente": "joako0o/FASE_2@92986f0", "modelo": "W+C+600",
    "periodo": [2005, 2015], "n_intervenciones": 9725, "n_reuniones": 132,
    "n_actores": 55, "n_direccionales": 893, "generado": "2026-09-21"
  },
  "anual": [
    { "anio": 2005, "n": 675, "h": 113, "d": 0, "neu": 562,
      "indice_neto": 0.1674, "score_medio": 0.1485,
      "muestra": { "n": 12, "h": 4, "d": 3, "neu": 5 } }
  ],
  "actores": [
    { "actor": "José De Gregorio Rebeco", "n": 1047, "h": 59, "d": 17,
      "indice_neto": 0.0401, "mandato": [2001, 2011], "cargos": ["Presidente", "Vicepresidente"] }
  ],
  "reuniones": [
    { "meeting_id": "RPM-2005-01-11", "fecha": "2005-01-11", "n": 22,
      "h": 3, "d": 0, "indice_neto": 0.136, "tpm": 2.75, "delta_tpm": -0.25 }
  ],
  "topicos": [
    { "anio": 2005, "eje": "inflacion_expectativas_meta",
      "prop_seis_ejes": 0.1316, "indice_vs_corpus": 118.11 }
  ]
}
```

Lo pesado (las 9.725 intervenciones con texto, 14 MB) **no se publica**: se
publica el agregado y, del texto, solo fragmentos que el lector abre a demanda
(que es justo lo que ya hace el panel de cita con las 99).

### 4.3 Contrato del módulo (copia esto tal cual)

```js
/* js/sections/results-overview.js — contrato de una sección de datos.
   Reglas: nada de import de main.js · datos por parámetro · estado por
   interaction-state.js · ScrollTrigger propio dentro de init() · sin efectos
   de nivel de módulo. */
import { getViewportSize } from '../core/viewport.js?v=2';   // misma URL que main.js
import { resultsState } from '../core/interaction-state.js';

export function initResults({ quotes, openQuote, closeQuotePanel, data, d3 }) {
  const root = document.getElementById('stageResults');
  if (!root || !data?.anual?.length) return;   // fallar callado aquí, ruidoso en el check

  // 1. escalas (con el viewport helper, no con window.innerWidth a pelo)
  // 2. capas: serie del CORPUS (n=9.725) + marcas de la MUESTRA (99) encima
  // 3. interacción: al clic en una marca de la muestra →
  //      openQuote(indiceEnQuotes, { x: event.clientX, y: event.clientY })
  //    (el índice se busca una vez: Map de `${date}|${participant}` → índice)
  // 4. estado hacia el 3D (la única frontera):
  //      resultsState.anio = 2009   → main.js lo lee para enfocar partículas/cámara
  // 5. ScrollTrigger propio (evitar `pin`: añadir pins cambia la altura del
  //    documento y obliga a refreshLayout(); la timeline ya tiene el suyo)
}
```

```js
/* js/main.js — el enchufe (y el cargador de datos) */

/* Cargador con caché: una sola promesa por archivo, y SIEMPRE el mismo
   import() con la misma query, o se instancian dos módulos distintos. */
const webData = new Map();
const loadWebData = (name) => webData.get(name) ?? (webData.set(name, fetch(`data/web/${name}.json`).then(r => r.json())), webData.get(name));

/* Va al final de los deferBoot existentes: después de timeline (que trae pin) */
deferBoot(async () => {
  const [{ initResults }, data] = await Promise.all([
    import('./sections/results-overview.js?v=1'),
    loadWebData('resultados'),
  ]);
  initResults({ quotes, openQuote, closeQuotePanel, data, d3: await loadD3() });
});

/* Y en la coreografía, una línea: */
const cameraChoreographyStops = [
  …,
  { id: 'stageResults', pos: [0.00, 0.72, 5.30], look: [0.00, 0.68, 0.00] },
];
```

### 4.4 Qué NO hacer (los errores que rompen esta pieza)

1. **No leer CSV ni parsear texto en el cliente.** 14 MB, y el navegador no es
   el sitio para eso. Agregado en Python → JSON.
2. **No importar `main.js` desde la sección**, ni `window.QUOTES` a pelo: los
   datos entran por parámetro.
3. **No crear una segunda variable global de estado** (`window.resultsYear`):
   va en `interaction-state.js`.
4. **No añadir controles nuevos sin registrar** en `isInteractiveTarget()` y en
   el `pointer-events:auto` del CSS. Es el fallo silencioso más probable.
5. **No poner `pin` si no es imprescindible** (altura del documento, orden de
   construcción, `refreshLayout()`).
6. **No duplicar la verdad**: si la sección nueva dibuja el índice anual del
   corpus, la timeline vieja debe pasar a leer **el mismo** `resultados.json` (o
   cambiar a otra pregunta). Dos series del mismo dato con dos números distintos
   es peor que una serie mala.
7. **No tocar `js/app.js` ni `css/bundle.css` a mano**: son derivados.

### 4.5 Verificación después de enchufar

```bash
npm run build:js && npm run build:css   # regenera derivados
npm run check                           # jsdom: imports, ids, excepciones
npm run lint                            # 0 errores, 0 warnings (hoy hay 1)
npm run shots                           # capturas reales de la sección nueva
npm run perf && npm run startup         # que la sección nueva no rompa el presupuesto
```
Y a mano: subir el `?v=` de `js/app.js` en `index.html`, y comprobar que el
número que muestre la sección coincide con `indices_por_anio.csv` (una fila, dos
sitios, mismo valor).

---

## 5. Lo que necesito de ti (decisiones que son tuyas, no mías)

1. **La sección de Resultados: ¿una sección o cinco?** Mi propuesta es **una
   portada de Resultados** que abra con el índice del corpus + el mapa, y que
   las cuatro secciones de detalle se queden como están (leyendo del mismo
   `resultados.json`). Alternativa: rehacer la zona entera como un solo módulo
   con pestañas.
2. **¿Cambiamos el índice anual a corpus (n=9.725) y dejamos la muestra (99)
   como puntos encima, o mantenemos el índice de la muestra y solo añadimos
   contexto?** La primera es más honesta y se ve mejor; la segunda es más
   "táctil".
3. **¿El titular de Resultados es "privado vs. público" (comunicado vs.
   deliberación) o "quién habla" (actores)?** Eso decide qué datos hay que
   traer primero. El primero necesita la serie de TPM; el segundo no.
4. **¿Arreglamos la copia de metodología (few-shot → TF-IDF + 5 miembros) y los
   contadores (16/2005/182/17) antes o después de la sección nueva?** Si el
   paper va en serio, antes: son las dos cosas que un referee verifica en cinco
   minutos.
5. **¿Traemos ya la serie de política monetaria?** Es el único dato externo que
   falta para el paper de mayor techo, y también es lo que le da una línea base
   a la sección: el índice textual solo significa algo al lado de la tasa.
