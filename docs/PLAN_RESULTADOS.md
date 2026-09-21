# Plan de Resultados — tres secciones, la primera con scroll horizontal

Documento de trabajo del **2026-09-21**, escrito sobre el checkout de
`arena/01a0c4c6-d3-test` con los agregados de `data/fase-2/` ya medidos. No hay
código nuevo todavía: esto es la decisión previa, para que la construyamos una
vez y no tres.

Lo pedido:

1. **Resultados generales — serie y acta** ← *esta sección es la de este documento*
2. Resultados a nivel actor
3. Buscador con filtros y pestañas sobre las intervenciones por actor

Y una forma: **scroll horizontal por sección**.

---

## 0. Lo que medí antes de proponer (y por qué cambia el diseño)

Todo esto sale de `data/fase-2/resultados/analisis_descriptivo/` y de
`clasificacion_wc600_9725.csv`, contado ahora:

| Medición | Valor | Qué implica para el diseño |
|---|---|---|
| Reuniones | **132**, exactamente **12 por año** los 11 años | El corpus tiene una grilla perfecta: **11 filas (años) × 12 columnas (meses)**. Una matriz calendario dice más que una línea de 132 puntos. |
| Intervenciones por acta | 34 · mediana 72 · 147 | Cada celda de la matriz tiene entre 34 y 147 intervenciones detrás. Nada está vacío. |
| Cobertura direccional por acta | mediana **8,5%** · p90 19,6% · máx 24,5% | **Nueve de cada diez intervenciones de un acta son neutrales.** Un gráfico de "tono por acta" sin mostrar la cobertura es ruido presentado como señal. |
| Actas sin ninguna direccional | **4** (y 14 con exactamente una) | `balance_direccional` queda **vacío** en esas 4: no es 0, es indefinido. El gráfico tiene que saber distinguirlo. |
| `tono_neto_general` y `score_hd_continuo_medio` por acta | mediana ≈ 0,000 · rango ±0,21 | La señal existe pero es pequeña: la escala del gráfico tiene que ser divergente y **centrada**, no porcentual. |
| Direccionales por año | 2005: **113 H / 0 D** · 2012: **0 H / 16 D** · 2014: **1 H / 107 D** | **El hallazgo más delicado de todo el proyecto.** En 8 de 11 años una de las dos clases es 0, 1 o 4. |
| No relevantes por año | 125–214 (18–23%) | Estable: no explica el patrón anterior. |
| Tópicos | **6 ejes × 11 años** = 66 filas, índice base 100 vs corpus, rango **69,9–140,5** | Hay señal suficiente para un panel de evolución temática con línea de referencia. |
| Actas con hawkish **y** dovish a la vez | **28 de 132 (21%)** | En 79% de las reuniones no se detectó disenso de signo contrario. Es un resultado, no un detalle. |
| Acuerdo del ensamble | 9.556/9.725 unánimes (**98,3%**) | Mide estabilidad, **no** certeza (ya está dicho en la pieza). |
| Fechas de la muestra (99 citas) que son reunión del corpus | **67 de 67** | El puente entre el corpus y lo que el lector puede abrir es **1:1**. No hay que inventar una correspondencia. |

### 0.1 El problema que hay que resolver en pantalla (no es de código)

Mira la serie de etiquetas por año:

```
año     n     hawkish  dovish
2005   675      113       0     ← cero dovish en 675 intervenciones
2006   676       74       6
2007   818       70      17
2008   957       73      10
2009  1093        4      91
2010  1149       78       8
2011  1062       59      15
2012   909        0      16     ← cero hawkish en 909 intervenciones
2013   816        1      58     ← un hawkish
2014   748        1     107     ← un hawkish
2015   821       26      32
```

Un lector que vea "2005: 0% dovish" va a concluir **"en 2005 el Consejo estaba
unánimemente hawkish"**. Eso no es lo que dicen los datos: es lo que dice el
**borde de decisión del clasificador**. Dos años con exactamente cero en una
clase de ~900 casos no es un hallazgo sobre el Banco Central; es una propiedad
del modelo (o de cómo se distribuyeron las etiquetas de entrenamiento en el
tiempo), y **hay que decirlo en pantalla antes de que el lector lo lea al
revés** — el mismo error que ya comete la versión actual con 2009.

#### 0.1.1 CERRADO con evidencia (antes era sospecha)

El repo `FASE_2` **es público** y se clona
(`git clone --depth 1 --branch arena/01a0c4da-fase-2`): lo verifiqué y ya no
dependo de la palabra de nadie. Con la tabla maestra (`procedencia_etiqueta` +
las 1.596 de `entrenamiento_wc600.csv`) medí el reparto de la anotación:

| año | % de filas con etiqueta humana | humano H/D | predicho H/D | **entrenamiento H/D** |
|---|---|---|---|---|
| 2005 | **59,9%** (404 filas) | 84 / **0** | 29 / 0 | 74 / **0** |
| 2006 | 19,1% | 30 / 2 | 44 / 4 | 29 / 1 |
| 2007 | 20,2% | 26 / 13 | 44 / 4 | 17 / 13 |
| 2008 | 15,5% | 31 / 1 | 42 / 9 | 25 / **0** |
| 2009 | 13,7% | **0** / 44 | 4 / 47 | **0** / 38 |
| 2010 | 12,7% | 36 / 3 | 42 / 5 | 26 / 3 |
| 2011 | 13,5% | 25 / 3 | 34 / 12 | 20 / 1 |
| 2012 | 18,0% | **0** / 6 | **0** / 10 | **0** / 6 |
| 2013 | 19,2% | 0 / 20 | 1 / 38 | **0** / 18 |
| 2014 | 19,9% | 1 / 55 | 0 / 52 | **0** / 46 |
| 2015 | 17,2% | 14 / 7 | 12 / 25 | 12 / 7 |

Tres conclusiones, todas medidas:

1. **El reparto humano no es parejo** —2005 tiene 59,9% de filas anotadas por
   personas, el resto 12,6–20,2%— así que la sospecha estructural era razonable.
2. **Los ceros no son artefacto de eso.** 2005 tiene **0 dovish en las tres
   capas**: 0 entre las 404 filas humanas, 0 en la predicción cruda y **0 en las
   filas que el modelo usó para entrenar** (74 H / 0 D). Igual en 2009, 2012,
   2013 y 2014 con hawkish. No es un hueco de cobertura: humanos y modelo
   coinciden.
3. **Las 1.596 de entrenamiento cubren los 11 años** (103–383 por año, sin año
   vacío), así que la versión fuerte de la sospecha —años que el modelo no vio—
   no aplica. Pero **2005 pesa el 24% del set de entrenamiento** (383 de 1.596)
   y su composición es de un solo lado.

**Lo que esto significa para el copy, y es más interesante que la nota
prudente**: el codebook (que ahora sí tengo) define D como *adoptar o respaldar*
una dirección expansiva, y aclara que **"no basta postergar un alza por razones
tácticas u operativas"**. Un año de sesgo restrictivo sostenido puede
perfectamente no contener ninguna intervención que *defienda* bajar la tasa. Es
decir: **el cero de 2005 es un resultado plausible, no un fallo**, y la nota
honesta ya no tiene que ser defensiva:

> En 2005 no hay ninguna intervención dovish: no la encontraron los anotadores
> humanos (404 de las 675 filas del año están etiquetadas así) ni el
> clasificador. Según el codebook, dovish exige *defender* una dirección
> expansiva, no simplemente descartar un alza; un año de sesgo restrictivo
> sostenido puede no contener ninguna.

Y la advertencia que sigue haciendo falta es la otra: **el índice no mide
unanimidad**. 2005 con `balance = +1,00` significa "no se encontró nada dovish",
no "los cinco consejeros coincidieron".

#### 0.1.2 Dos consecuencias de diseño (las de antes)

- El panel de puntuación general **no puede** ser "porcentaje hawkish vs
  dovish por año". Tiene que usar el **score continuo** (`score_hd_continuo_medio`,
  que no se satura) y mostrar la cobertura al lado.
- Hay un panel obligatorio que **no** estaba en tu lista: *cuánta señal hay*.
  Sin él, los otros tres se leen mal.

*(Y para el paper: esta serie es la razón número uno para pedir
`data/evaluacion_ciega_gold.csv` y `entrenamiento_wc600.csv` al repo `FASE_2` —
si el desbalance por año viene de las etiquetas de entrenamiento, se ve ahí.)*

---

### 0.2 La columna de relevancia: existe, y decide dos cosas del panel 01

`clasificacion_wc600_9725.csv` trae **tres** columnas de relevancia:

| Columna | Qué es | Valor medido |
|---|---|---|
| `pred_relevancia_v3` | binaria 1/0 | **7.806 relevantes · 1.919 no** (80,3% / 19,7%) |
| `prob_relevancia_no_calibrada` | probabilidad continua | **sin calibrar** (lo dice su propio nombre) |
| `acuerdo_relevancia_miembros` | acuerdo del ensamble | 9.538 unánimes · 187 con desacuerdo |

**El filtro no toca las direccionales.** Cruzado con la etiqueta:

```
etiqueta     relevante   no_relevante   %relevante
hawkish        513           0           100,0%
dovish         380           0           100,0%
neutral       6913        1919            78,3%
```

Las 893 direccionales se quedan todas: la relevancia solo decide qué **neutrales**
valen la pena. Es una columna de "este neutral no dice nada", no un filtro de
calidad general.

**Lo que eso le hace al índice publicado.** `tono_neto_general` divide por el
total de intervenciones, incluidas las 1.919 que el propio modelo marca como no
relevantes. Como el numerador (H−D) no cambia nunca, limpiar el denominador sube
el índice ~20% en magnitud en **todos** los años:

```
año    (H−D)/9.725   (H−D)/7.806
2005     +0,1674       +0,2055
2009     −0,0796       −0,0949
2014     −0,1417       −0,2058
```

Son dos series defendibles del mismo dato y la pieza **no dice cuál usa**. Hay
que decidirlo antes de dibujar el panel 01 (ver §5, punto 6). Además la
relevancia varía por año —73,4% en 2014 → 85,8% en 2009—, así que no es un
descuento constante que se cancele solo.

Dos advertencias de uso:

- **Es una predicción del modelo, no una anotación humana.** "Relevante" quiere
  decir "el modelo cree que acá hay contenido de postura", y la probabilidad está
  declarada como no calibrada. No se puede presentar como verdad terreno.
- `flag_texto_danado` marca **51 filas** (0,5%).

### 0.3 Descuadre registrado: 1 fila de 9.725

`indices_por_anio.csv` cuenta **1.149** intervenciones en 2010; el corpus y la
clasificación cuentan **1.150** (las 9.725 filas existen, no hay `score_hd_continuo`
vacío ni `intervencion_id` duplicado). La suma de la serie publicada es 9.724.
Nace en `scripts/analisis_resultados.py`, que el manifest declara pero **no está
en este checkout**. No cambia ninguna conclusión, pero un lector que sume la
serie obtiene 9.724 mientras la portada dice 9.725: o se explica o se arregla.

---

### 0.4 La métrica de la serie: la fórmula que solo usa H y D

Existe, está en el repo y no hay que recordarla: **`balance_direccional` =
(H − D) / (H + D)**, ya calculada en `indices_por_anio.csv`. Equivale a
`2·p − 1`, con `p = H/(H+D)` la cuota hawkish **dentro de lo direccional**: los
neutrales no entran ni en el numerador ni en el denominador. Verificado: coincide
al noveno decimal en las 11 filas.

Es conceptualmente la medida correcta para "¿hacia dónde apunta la
deliberación?", porque saca del medio a la masa neutral (que en parte es
artefacto del clasificador). Pero **tiene el mismo problema que ya
identificamos, y más grande**: con una clase en cero satura exacto en ±1.

Las cuatro candidatas, medidas sobre los 11 años:

| año | A `tono_neto` (H−D)/N | B `balance` (H−D)/(H+D) | C balance Jeffreys (H−D)/(H+D+1) | D media del score **solo H/D** | IC95 de B | n direccional |
|---|---|---|---|---|---|---|
| 2005 | +0,1674 | **+1,000** | +0,991 | +0,7957 | ±0,066 | 113 |
| 2006 | +0,1006 | +0,850 | +0,840 | +0,6066 | ±0,239 | 80 |
| 2007 | +0,0648 | +0,609 | +0,602 | +0,3155 | ±0,330 | 87 |
| 2008 | +0,0658 | +0,759 | +0,750 | +0,4358 | ±0,282 | 83 |
| 2009 | −0,0796 | −0,916 | −0,906 | −0,5247 | ±0,174 | 95 |
| 2010 | +0,0609 | +0,814 | +0,805 | +0,4531 | ±0,250 | 86 |
| 2011 | +0,0414 | +0,595 | +0,587 | +0,3996 | ±0,362 | 74 |
| 2012 | −0,0176 | **−1,000** | −0,941 | −0,4730 | **±0,387** | **16** |
| 2013 | −0,0699 | −0,966 | −0,950 | −0,5596 | ±0,174 | 59 |
| 2014 | −0,1417 | −0,981 | −0,972 | −0,6269 | ±0,098 | 108 |
| 2015 | −0,0073 | −0,103 | −0,102 | −0,0719 | ±0,496 | 58 |

**Lo que hay que leer de esta tabla:**

- A y B **no difieren en un detalle cosmético**: en 2005 el mismo año es +0,17 o
  +1,00 según el denominador. Los dos son defendibles; el lector no puede
  adivinar cuál se usó si no se declara.
- **B y D cuentan la misma historia**: correlación **r = +0,99**. D es la misma
  señal, sin saturar.
- **D usa más información que B.** La etiqueta es *el signo* del score (es lo que
  dice la copia del pipeline), así que contar H y D **tira la magnitud**. D
  conserva el score de esas mismas filas: es "solo H y D", como pedías, sin
  perder el dato.
- En 2012 el intervalo de B es **±0,387 con 16 direccionales**: cualquier lector
  que vea un −1,000 sin la banda está leyendo ruido como certeza.

**Recomendación** (confirmada por la prueba de §0.5): la serie anual dibuja **las
dos, en carriles separados** — **B** como conteo (el número que cualquiera puede
replicar a mano, con su **banda de Wilson**) y **D** como intensidad (la que no
satura) — y el **n direccional codificado en el tamaño de la marca**. La prueba
mostró que no hay una métrica dominante: cada una gana donde la otra se rompe, y
la brecha entre ambas es información. La variante log-odds `log(H/D)` queda
descartada de entrada: es infinita cuando D = 0, y 2005, 2012 y 2014 tienen ceros
exactos.

Ojo con una cosa al comparar: D y A viven en escalas distintas (D está
condicionada a ser direccional y por eso da valores más grandes). No se pueden
superponer en el mismo eje sin decirlo.

Cualquiera que se elija, el generador tiene que **emitirla con su `n` y, si es
por conteo, con su intervalo**: la métrica y su incertidumbre son el mismo dato.

---

### 0.5 La prueba de la métrica, corrida (y una corrección mía)

`scripts/analysis/metrica_serie.py` calcula las cinco candidatas, su intervalo
con **bootstrap agrupado por reunión** (las intervenciones de un acta no son
independientes: remuestrear filas estrecharía los intervalos de mentira) y su
sensibilidad al umbral. La figura está en `docs/figura-metrica-prueba.svg`.
Resultados:

**(a) Corrección de un número mío (dos veces).** Dije primero **18 de 132 actas
(14%)**; el criterio correcto no era "una sola direccional". Dije después **106
(80%)** contando "alguna de las dos clases vacía", pero eso tampoco es "balance =
±1": las 4 actas sin *ninguna* de las dos clases tienen balance **indefinido**, no
±1. El número que queda, sobre la tabla maestra:

```
balance = ±1,000 exacto    102 actas (77%)   ← 50 positivas + 52 negativas
balance indefinido           4 actas ( 3%)   ← ninguna clase presente
valor interior              26 actas (20%)
```

**102 de 132 actas (77%)** caen en el borde, y todas tienen **34 o más**
intervenciones detrás (la más chica, 34). Contar votos no se rompe solo con las
actas chicas: se rompe en casi todas. Con la predicción cruda dan 101, así que la
conclusión no depende de la fuente.

**(b) La buena noticia: no es frágil al umbral.** La media del score filtrando
por `|score| ≥ t` mantiene el ranking de años con t de 0 a 0,30
(Spearman 0,91–0,96). Una métrica sensible al umbral sería una métrica
inventada; esta no lo es.

**(c) La mala noticia: "solo H y D" no es "solo la señal".** El filtro de la
etiqueta tira 392 filas neutrales con `|score| > 0,10` y 125 con `|score| > 0,20`
— más señal descartada que la que queda (893 direccionales). Si el objetivo es
"quedarse con lo que tiene señal", el umbral sobre el score es más directo que el
filtro por etiqueta, y no depende de la etiqueta. Limitación honesta: con umbral
alto la métrica se vuelve *endógena* (promedio de valores grandes), así que
"sube con t" es esperable y no es un hallazgo.

**(d) El veredicto entre las dos finalistas es mixto, y hay que decirlo.**

| | B contar votos | D promediar puntajes |
|---|---|---|
| 2005 (0 dovish) | +1,000 (techo falso) | +0,796 |
| 2012 (0 hawkish, 16 casos) | −1,000, IC ±0,352 | −0,473, IC **±0,287** |
| 2014 (1 hawkish de 113) | −0,981 | −0,627 |
| 2007 | +0,609 (maestra; "claramente hawkish") | +0,315 ("apenas") |
| A nivel acta | 102 de 132 en el borde | reparte las 132 en el rango (máx 0,21) |
| Significado | "qué proporción de lo direccional fue hawkish" | "qué intensidad promedio tuvo esa postura" |

D gana donde B se rompe **y pierde en 2007**, donde D suaviza un 2:1 real. No
hay una métrica dominante: son dos preguntas distintas. Por eso la recomendación
es **las dos, con carriles separados** —B como conteo (lo que se puede replicar a
mano), D como intensidad (lo que no satura)— y la brecha 2007 visible, porque que
cuenta y magnitud discrepen **es el hallazgo**, no el ruido.

**(e) Y una cosa que no usa ninguna de las dos: la volatilidad.** Normalizando
cada serie por su propio rango, A salta 0,234 y E 0,203; B 0,332, C 0,328 y D
0,293. Las que descartan los neutrales (B, D) son **~40% más volátiles** que las
que los incluyen: buena parte de la masa neutral es ruido que amortigua el
gráfico. No lo dice el gusto: lo dice el número.

---

### 0.6 RETRACTADO: el "desajuste entre runs" era procedencia de etiqueta

> **Verificado de primera mano el 2026-09-21.** El repo `FASE_2` es público:
> `git clone --depth 1 --branch arena/01a0c4da-fase-2 https://github.com/joako0o/FASE_2.git`
> (rama en `7485d1d`). Corrí `python3 scripts/verificar_procedencia.py` → **exit 0,
> las 8 igualdades pasan**, incluida `prediccion_v3 == voto mayoritario de los 5
> miembros en 9725/9725` — que es la misma comprobación independiente que ya
> había hecho yo desde el otro lado. La reconciliación queda probada por dos
> caminos, no afirmada.

**Me equivoqué y lo dejo escrito**, porque una pieza de datos no puede permitirse
un diagnóstico equivocado en su propia bitácora.

Lo que medí (correcto): `indices_por_anio.csv` y `clasificacion_wc600_9725.csv` no
cuadran — 499 vs 513 hawkish, 360 vs 380 dovish, 10 de 11 años distintos, 24 de
132 actas con otro `n_hawkish`. Lo que **inferí** (falso): que eran dos corridas
del modelo.

**Son el mismo run, con dos fontanerías de etiqueta distintas y deliberadas.**
`clasificacion_wc600_9725.csv` guarda la **predicción cruda** en las 9.725 filas.
Los agregados de `analisis_descriptivo/` son la **tabla maestra**, que por fila
usa la mejor evidencia disponible: etiqueta humana validada (1.596) y gold ciega
(299 de 300; una es una abstención) donde existe, y la predicción del modelo solo
en las **7.829 restantes** — que es exactamente `rol=inferencia_no_etiquetada`,
un valor que ya estaba en el archivo y que yo miré sin ver.

Verificado en este checkout, sin necesidad del repo del otro agente:

```
Δ totales entre archivos:  −14 hawkish · −20 dovish · +33 neutral · −1 fila
1.596 validada + 300 ciegas = 1.896  (menos la abstención = 1.895 humanas)
9.725 − 1.896 = 7.829  ← el propio archivo las etiqueta así
```

Y la consecuencia: **la procedencia mueve el balance como máximo 0,049** (medio:
0,014) en los 11 años. No cambia el relato; mezclarla dentro de una misma tabla,
sí. El script ahora calcula con las dos y **declara cuál usa cada número**.

**La regla que reemplaza a mi "todo desde la clasificación":**

| Pregunta | Fuente |
|---|---|
| Describir el **corpus** (series anuales, composición, actas) | **maestra** / `indices_*` |
| Describir el **modelo** (score, probabilidades, acuerdo del ensamble) | **clasificación** (cruda) |
| Cruzar ambas | comparten `intervencion_id` y `meeting_id`; la maestra trae `procedencia_etiqueta` para filtrar |

**Segunda corrección al copy.** Yo escribí en el pipeline que "la etiqueta de tres
clases sale del máximo de las tres probabilidades". Verificado acá: **el argmax
falla en 19 de 9.725**, y la regla real es **voto mayoritario de los cinco
miembros con desempate fijo H → D → N**, que reproduce `prediccion_v3` en
**9.725 de 9.725** (9556 unánimes, 1 empate). Ya está corregido en `index.html`.

**Nota al pie para la pieza** (la que dejó el otro agente, y es exacta): *"Los
agregados priorizan etiqueta humana donde existe (1.895 de 9.725 filas); por eso
difieren levemente de los totales de predicción cruda del modelo. Ambos son
correctos y la procedencia está registrada fila por fila."*

---

#### Importado: `data/fase-2/fuente/` (2026-09-21)

El repo `FASE_2` es público y está importado en la pieza: **42 archivos, 865 KB**,
con `PINS.json` (repo, rama, commit `7485d1d9`) y `sha256` por archivo — 19
verificados además contra el manifest de la fuente. `npm run check` falla si
alguno cambia. Trae el codebook, la metodología, las limitaciones, el benchmark,
la evaluación ciega, las curvas de aprendizaje, los agregados que alimentan esta
sección y los scripts que producen esos números.

**No** viajan los datasets grandes (corpus con texto, `tabla_maestra.csv`,
`entrenamiento_wc600.csv`, gold ciega, los cinco `.joblib`): los lee el
entrenamiento, no la pieza. `PINS.json` dice de qué commit salir a buscarlos.

De ahí que a partir de acá este documento **ya no cite de oído**: los números de
§0.7 y la reconciliación de §0.6 salen de archivos que están en el repo.

#### Lo que sigue pendiente y sí depende de la fuente

**Para §0.1 (los ceros de 2005 y 2012) sigue faltando la evidencia humana**: si
las etiquetas humanas no se reparten parejo en el tiempo, la clase cero de un año
puede ser efecto de la anotación y no del clasificador. Eso no se resuelve con la
procedencia: se resuelve con `entrenamiento_wc600.csv` y `docs/CODEBOOK.md` del
repo `FASE_2`, que **no están en este checkout**.

#### Estado de lo que este documento afirmó sobre la fuente

| Sección | Estado |
|---|---|
| §0.1 ceros por año | **cerrado** (§0.1.1): los ceros están en las tres capas, humanos incluidos |
| §0.2 relevancia y denominador | válido |
| §0.3 fila 9.724/9.725 | **retractado**: es la abstención de la gold, no una fila perdida |
| §0.4 la fórmula `balance_direccional` | válido |
| §0.5 prueba de la métrica | válido, con la corrección del conteo (102, no 106) |
| §0.6 | **retractado** y reemplazado por esta sección |
| §0.8 | el cruce tono↔decisión, con prueba de circularidad: **verificado** |

### 0.7 Los números del paper, verificados contra la fuente

Con el repo clonado dejé de citar de oído. Todo esto sale de
`data/benchmark_modelos.csv`, `data/resultados_evaluacion_ciega.json` y
`data/benchmark_modelos.json`:

**La comparación lineal vs encoder (los números que citaba el primer informe del
otro agente, y que no podía verificar: son correctos al dígito).**

| grupo | modelo | macro-F1 | F1-HD |
|---|---|---|---|
| `legado_v2_793` | TF-IDF legado | **0,820** | **0,744** |
| | BETO | 0,743 | 0,631 |
| `v3_desarrollo_793` | **W+C+600** | **0,825** | **0,753** |
| | MrBERT-es+600 | 0,771 | 0,671 |

**La evaluación ciega, que es el número que un referee mira primero.** Y acá
está la parte que ninguna de las dos conversaciones había dicho:

| modelo | macro-F1 | F1-HD | precisión dovish | soporte dovish |
|---|---|---|---|---|
| `W+C+600` (ciega, 299) | 0,746 | 0,663 | **0,286** | 21 |
| `C+89` ancla (ciega, 299) | 0,630 | 0,514 | 0,286 | 21 |

- **La brecha desarrollo→ciega es de ~8 puntos de macro-F1** (0,825 → 0,746).
  Es la señal de generalización que hay que declarar, no esconder.
- **La precisión dovish en la ciega es 0,286**: de cada 100 intervenciones que el
  modelo marca dovish, ~29 lo son. Con 21 casos de soporte, el intervalo es
  enorme. *Cualquier* figura de la pieza que muestre un fragmento como "dovish"
  con seguridad está sobrevendiendo esa clase.
- El ancla `C+89` da **exactamente la misma precisión dovish** (0,286): la
  arquitectura grande no mejoró ahí.

**Parámetros reales del modelo** (de `docs/METODOLOGIA_Y_BENCHMARK.md`, para que
la ficha técnica de la pieza deje de ser aproximada): dos etapas —relevancia y
luego postura—; palabras 1–1 en la etapa A y 1–4 en la B; `char_wb` 3–5 con
`max_features=120000`; regresión logística `class_weight=balanced`, `C=2.0`,
semilla 20260915; cinco miembros con peso de caracteres `1.0, 0.5, 1.0, 1.0, 1.0`;
voto mayoritario con desempate H, D, N. Y `score_hd_continuo = P(H) − P(D)` sobre
**probabilidades no calibradas** — la metodología dice explícitamente que sirven
para agregación descriptiva y **no deben presentarse como calibradas**.

**Procedencia de las etiquetas** (`origen` en `entrenamiento_wc600.csv`):
1.092 `base_v3` · 437 de las dos tandas post-cuarentena (asistidas por IA y
validadas por personas) · 67 `ia89`. Eso responde tu recuerdo de "~1.000 + 600":
la partición real es 1.092 / 437 / 67, y conviene describirla así en el paper.

### 0.8 El cruce que faltaba: tono de la deliberación ↔ decisión de tasa

`data/fase-2/fuente/resultados/analisis_descriptivo/acuerdo_consejo_por_reunion.csv`
trae, por reunión, **si el Consejo subió, mantuvo o bajó la tasa**, con su magnitud
en puntos base y la TPM resultante. No hacía falta traer la serie de TPM del banco
desde afuera: la decisión está registrada en el acta, y la fuente ya la extrajo.
Con eso el índice textual tiene contra qué compararse, que es lo que le faltaba
para dejar de ser un número sin referencia.

| decisión | n | tono medio | mediana | signo coherente |
|---|---|---|---|---|
| subir | 35 | **+0,0948** | +0,0707 | **35/35** |
| mantener | 80 | −0,0046 | −0,0206 | 50/80 con tono < 0 |
| bajar | 17 | **−0,1023** | −0,0940 | **17/17** |

`subir − bajar = +0,1971` · **IC95 [+0,1705, +0,2255]** · P(dif > 0) = 1,000.
**Las 52 reuniones con decisión direccional coinciden en signo con el tono: 52 de 52.**

#### La prueba de circularidad (esto es lo importante)

El acta **contiene la frase de la decisión** —*"se acuerda aumentar la tasa de
interés de política monetaria a 2,5% anual"*—. Si el tono de la reunión refleja esa
frase, la correlación es tautológica y no dice nada sobre la deliberación. Así que
se midió otra vez **excluyendo la intervención del acuerdo**:

```
subir     +0,0746   35/35
bajar     −0,0850   17/17
subir − bajar = +0,1776   (vs +0,1971 con la frase)
```

**El signo se sostiene sin la frase.** La señal no es solo el anuncio de la decisión.

#### El límite, que va junto al hallazgo

| | valor |
|---|---|
| Las 132 intervenciones del acuerdo son | **1,4%** de las filas |
| … y concentran | **11,3%** de las direccionales y **10,2%** de la masa de \|score\| |
| \|tono\| medio de la intervención del acuerdo | **0,535** |
| \|tono\| medio del resto de la reunión | **0,065** (8× menos) |

O sea: **el modelo acierta mucho más donde el acta anuncia la decisión que donde se
delibera.** Cualquier lectura que presente el índice como "el ánimo de la sala" tiene
que decir esto. Y para la muestra editorial: **7 de los 99 fragmentos** son el párrafo
del acuerdo; los otros 92 son deliberación de verdad, así que la selección está bien
sesgada hacia el debate.

#### Qué habilita en la pieza

Un panel de Resultados que **no existía y ahora se puede dibujar**: el tono de cada
acta contra la decisión que tomó, con las 132 reuniones. Es el gráfico que convierte
un índice exploratorio en una validación, y es la figura que un paper de este tema
pondría primero.

Todo esto vive ya en `data/web/resultados.json` (`cruce_decision`, `senal`,
`actas[].decision`), generado por `scripts/build-resultados.py` con su IC y su
prueba de circularidad incluidas, y verificado en `npm run check`.

---

## 1. Arquitectura: cómo se hace el scroll horizontal

En este repo **solo el pipeline tiene `pin`** (`js/main.js:5359`). Las otras
secciones usan `position: sticky` dentro de un contenedor alto. Dos caminos:

| | Cómo | Coste |
|---|---|---|
| **A · Reusar el pin del pipeline** | `.results-pin-wrapper` con `pin: true`, `end: '+=' + (track.scrollWidth - viewport.clientWidth)`, `scrub`, rail de progreso | Consistencia con lo que ya funciona; añade `pin-spacer` y obliga a `refreshLayout()` después (ya existe el hook `onDeferredBootDone`) |
| **B · Sticky puro** | Sección de altura `100vh + recorrido`; un ScrollTrigger `scrub` sin `pin` que traduce el progreso a `x` | No toca la altura del documento; es el patrón del resto de la página; hay que calcular el recorrido a mano |

**Recomiendo A**, por una razón concreta: `initPipeline()` ya resolvió los tres
problemas difíciles —el guard contra `0/0` cuando la pista mide 0, los `bounds`
cacheados en `onRefresh` y el rail que refleja el panel activo— y copiarlo es
más barato que volver a resolverlos. En cuanto a la mecánica repetida: el
lector verá scroll horizontal dos veces (metodología y resultados); eso es
aceptable porque en la metodología avanza *el proceso* y en resultados avanza
*la evidencia*, pero es razón para **no poner una tercera sección horizontal
seguida**: la 3 (buscador) debería ser vertical o de panel fijo.

### Piezas a crear

| Pieza | Archivo | Nota |
|---|---|---|
| Marcado | `index.html` | `<section id="stageResults" aria-labelledby="resultsTitle">` con `.results-pin-wrapper` > `.results-viewport` > `.results-track` (un `<article class="results-panel">` por panel) + `.results-rail` |
| CSS | `css/29-stage-results.css` | Prefijo numérico = orden de cascada; `build-css.mjs` lo recoge solo |
| Módulo | `js/sections/results-overview.js` | `initResultsOverview({ quotes, openQuote, closeQuotePanel, data, d3 })` |
| Datos | `data/web/resultados.json` | Ver §3: lo que falta generar |
| Enchufe | `js/main.js` (junto a los otros `deferBoot`) | **Después** del pipeline/counters y **antes** de los cierres |
| Cámara | `cameraChoreographyStops` (`js/main.js:3041`) | Una línea: `{ id: 'stageResults', pos: [...], look: [...] }` — se recalcula solo desde el DOM |
| Interacción | `isInteractiveTarget()` (`js/main.js:1992`) + `pointer-events: auto` (`css/00-tokens-base.css:158`) | **Los dos**: si un control nuevo no entra en las dos listas, el clic se lo come el hit-test de partículas |
| Estado | `js/core/interaction-state.js` | Solo si la sección le manda algo al 3D (acta o año elegido) |

---

## 2. Los paneles de Resultados generales

Cuatro paneles, en este orden. El 1 y el 4 son los que cuentan; el 2 es el que
protege al 1; el 3 es el que ya tenías pensado.

### Panel 01 · Puntuación general — "hacia dónde apunta cada acta"

**Dato**: `indices_por_reunion.csv` (132 filas) + `indices_por_anio.csv` (11).
**Forma**: **matriz calendario 11 × 12**, una celda por acta.
- Color: `score_hd_continuo_medio`, escala divergente centrada en 0 (dovish ↔ hawkish).
- Peso visual de la celda (opacidad o borde): `cobertura_direccional`.
- Las **4 actas sin ninguna direccional** se pintan como hueco explícito, no como 0.
- **Las 67 fechas de la muestra se marcan** (borde dorado) y se abren con
  `openQuote(indice)` → el mismo panel de cita de siempre. Es el puente
  corpus↔muestra y es 1:1: 67 de 67 fechas de la muestra son reuniones del corpus.
- Debajo o al lado: la **serie anual** como resumen de la matriz.

**Por qué matriz y no línea**: con 132 puntos y una cobertura mediana de 8,5%,
la línea parece ruido; la matriz deja ver la estructura de un vistazo (12 por
año, siempre), que es justamente la estructura real del calendario de RPM.

**Advertencia obligatoria en el panel** (en el copy, no en un pie): *una celda
sin dovish no significa una sala unánime; significa que el clasificador no
encontró ninguna intervención dovish en esa acta*. Y la nota de las clases
casi degeneradas por año (§0.1).

### Panel 02 · Cuánta señal hay — el panel que hace honesto al anterior

**Dato**: `pred_relevancia_v3`, `cobertura_direccional` y `proporcion_neutral`
por año.
**Forma**: barras apiladas por año con **tres** tramos —direccional / neutral
relevante / **no relevante**—, y la cobertura direccional rotulada encima.
**Lo que dice**: de **9.725** intervenciones, **893 (9,2%)** son direccionales,
**6.913** son neutrales que el modelo considera relevantes y **1.919** son
neutrales que el modelo descarta (§0.2). La cobertura por año va de **1,8%
(2012)** a **16,7% (2005)**.
**Por qué va aquí y no al final**: es lo que evita que el lector tome el panel
01 por una medición de la sala, y es el sitio donde el panel de puntuación
**declara su denominador** (§0.2). Es el mismo movimiento que ya hicimos en
`#stageCounters` con las dos escalas.

### Panel 03 · Evolución de tópicos — el que ya tenías pensado

**Dato**: `evolucion_topicos_modelo_anual.csv` — 6 ejes × 11 años, con
`proporcion_seis_ejes`, `proporcion_corpus` e **`indice_vs_corpus_base100`**
(rango real 69,9–140,5) + `cambio_anual`.
**Forma**: 6 mini-gráficos en grilla 3×2, línea del índice con **referencia 100**
(el propio corpus), y el eje activo resaltado al pasar el ratón / al enfocar con
teclado.
**Ojo con las etiquetas**: los identificadores son `entorno_externo_commodities_economias`,
`tipo_cambio_real_nominal`… Hay que escribir el nombre humano de los 6 ejes
(«Entorno externo y commodities», «Tipo de cambio») y una línea de una frase
explicando qué significa "100 = como el corpus".

### Panel 04 · El disenso — "¿se discutió o se confirmó?"

**Dato**: `clasificacion_wc600_9725.csv` (columna `acuerdo_miembros`) + etiquetas por acta.
**Forma**: un gráfico de dos lecturas sobre las 132 actas: (a) **28 de 132
(21%)** tienen a la vez una intervención hawkish y una dovish; (b) el ensamble
fue unánime en **9.556 de 9.725 (98,3%)** intervenciones.
**Por qué lo propongo como "algo más"**: es el panel con más tesis de los
cuatro —"la sala que decide por consenso aparente"— y es el que conecta con el
paper (privado vs. público). Además es barato: los datos ya están.
**Cuidado con el copy**: la unanimidad de los cinco miembros **no** es
confianza (los cinco son el mismo modelo). Si el panel la muestra como
"acuerdo", un lector técnico la lee al revés.

**Si hay que cortar uno**: el 3 (tópicos) es el más prescindible *de esta
sección*, porque su historia natural es "de qué se habla", que es otra pregunta.
Los otros tres responden "cuánto, hacia dónde y con qué acuerdo".

---

## 3. Datos: qué falta generar

`data/web/resumen.json` ya trae `anual` y `actores`. Para esta sección falta
**`data/web/resultados.json`** (mismo generador, `scripts/build-web-data.py`):

```json
{
  "actas": [
    { "id": "RPM-2005-01-11", "fecha": "2005-01-11", "anio": 2005, "mes": 1,
      "n": 72, "h": 3, "d": 0, "neu": 69,
      "score": 0.083, "cobertura": 0.042, "balance": null,
      "muestra": { "n": 2, "indices": [41, 77] } }
  ],
  "topicos": [
    { "anio": 2005, "eje": "inflacion_expectativas_meta",
      "indice": 118.1, "proporcion": 0.1316, "cambio": -0.02 }
  ],
  "disenso": { "actas_mixtas": 28, "actas_con_direccional": 129, "unanimidad": 9856 }
}
```

Dimensionado: **~35–45 KB** sin minificar (132 actas + 66 topicos + el bloque
de disenso), o sea nada. Se genera de los mismos CSV y entra en el `manifest`
con su `sha256`, igual que el resto.

**Regla que ya rige:** ninguna sección lee CSV. El cliente lee este JSON.

---

## 4. Qué pasa con las cinco secciones que ya existen

Esto es "cómo conectarlo con lo demás", que era tu pregunta del principio. La
trilogía nueva **no se suma** a las cinco actuales: las reemplaza casi todas.

| Sección actual | Qué hace hoy | Destino |
|---|---|---|
| `stageTimeline` | índice anual de la **muestra** (99 fragmentos, 11 puntos) | **Se absorbe** en Resultados · panel 01, con el corpus completo (132 actas) detrás |
| `stageAxes` | mapa fecha × tono de las 99 | **Se absorbe** como la capa de marcas de la muestra sobre la matriz (las 67 fechas) |
| `stageWordEvolution` | vocabulario por año, sobre la muestra | **Se reemplaza** por el panel 03 (tópicos del modelo, corpus completo) |
| `stageVoices` | directorio de 37 voces de la muestra | **Se reemplaza** por Resultados · nivel actor (55 actores del corpus, con cargos y mandato de `actores_metadata.csv`) |
| `stageActs` | navegador de 67 actas por fecha | **Se reemplaza** por Resultados · buscador con filtros y pestañas |
| `stageQuotes` · `stageClosing` | cierre | Se quedan |

Con eso, el orden queda: **… Contadores → Metodología (pipeline) → Resultados
general → Resultados actor → Buscador → Epílogo**. Y el problema de la
numeración de actos (`docs/NARRATIVA.md` §3) se resuelve acá: con una trilogía
de Resultados, los actos pasan a ser cuatro bloques y no siete numerados a
medias.

**No borrar nada hasta que la sección nueva dibuje.** Las viejas se quedan
funcionando mientras la nueva se construye; cuando la nueva esté verificada, se
retiran con sus `init` y sus `id` de `cameraChoreographyStops`.

---

## 5. Lo que necesito decidido antes de escribir código

1. **¿Los 4 paneles o 3?** (mi orden: puntuación → señal → tópicos → disenso; si
   sobra scroll, fuera tópicos).
2. **¿La matriz calendario 11×12 te convence como forma de "serie y acta"?** Es
   la decisión de diseño más importante del documento: define el panel 01 entero.
3. **La nota de las clases casi degeneradas** (§0.1): ¿la escribimos nosotros en
   el copy, o la dejamos para cuando el otro agente confirme el origen de las
   etiquetas de entrenamiento? Mi recomendación: escribirla ya, con la
   formulación prudente ("el clasificador no encontró", no "el Banco fue").
4. **El buscador (sección 3)**: quedó claro que va el **texto completo** y que va
   **al final**. Falta decidir el corte: índice de las 9.725 (74 KB gzip) + texto
   por acta bajo demanda (~35 KB por acta) es mi propuesta; el texto completo de
   las 9.725 son 3,6 MB gzip.
5. **La métrica de la serie y su denominador** (§0.2 y §0.4, son la misma
   decisión): ¿`tono_neto` (÷ todas), `balance_direccional` (÷ solo H+D), la
   variante suavizada, o la media del score sobre H/D? Mi recomendación: **la
   media del score sobre las filas H/D**, con el `n` direccional visible y el
   `balance` por conteo disponible al lado para quien quiera replicarlo a mano.
   Si se elige el balance, va **con su banda de Wilson**: en 2012 el IC es
   ±0,387 con 16 casos. Y `build-web-data.py` tiene que **declarar** cuál emite
   y con qué intervalo.
6. **La procedencia de las etiquetas** — **resuelta**: 1.092 `base_v3` · 437
   post-cuarentena (asistidas por IA, validadas por personas) · 67 `ia89`
   (§0.7). Y los ceros de 2005 y 2012 quedaron cerrados con las tres capas
   coincidiendo (§0.1.1).
7. **La fila 9.724/9.725** (§0.3 y §0.6, son lo mismo): no era una fila perdida
   sino el desajuste entre los agregados y la clasificación. Se resuelve en §0.6.
8. **La fuente de cada serie** (§0.6): hasta que se confirme cuál run del modelo
   es el bueno, `data/web/*.json` se calcula desde `clasificacion_wc600_9725.csv`,
   que es la única verificable fila por fila.
