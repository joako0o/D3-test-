# `data/web/` — los agregados que el navegador sí lee

Esta carpeta la genera **`scripts/build-web-data.py`**. No se edita a mano: se
regenera.

```bash
python3 scripts/build-web-data.py            # reescribe data/web/
python3 scripts/build-web-data.py --check    # sale con 1 si quedó viejo
npm run build:data                           # alias del primero
```

`npm run check` incluye el `--check`, así que un cambio en los CSV de origen
sin regenerar esto hace fallar el arnés.

## Por qué existe

`data/fase-2/` pesa 18 MB (14 de ellos el corpus con texto) y el navegador no
lee ni un byte: la página carga `js/data/quotes.min.js` y nada más. Eso dejó un
hueco visible durante meses — la pieza hablaba de un corpus de 9.725
intervenciones y 132 reuniones, y los únicos números que existían en el cliente
eran los 99 de la muestra editorial. El resto estaba **escrito a mano** en
`index.html`, que es como se llega a que la misma pantalla diga 37 voces y 17
participantes a tres líneas de distancia.

Son dos capas, y no se mezclan:

| | Qué es | Quién la produce | Dónde vive |
|---|---|---|---|
| **Muestra editorial** | 99 fragmentos que el lector puede abrir uno por uno, balanceados 33/33/33 | `scripts/build-particle-quotes.py` | `js/data/quotes.js` → `window.QUOTES` |
| **Agregados del corpus** | 9.725 intervenciones · 132 reuniones · 55 actores, agregados por año y por actor | `scripts/build-web-data.py` | `data/web/resumen.json` |

## Qué hay dentro de `resumen.json`

| Bloque | Contenido |
|---|---|
| `meta` | Procedencia y cifras del corpus: `fuente`, `fuente_commit`, `modelo` (`W+C+600`), `periodo`, `n_intervenciones`, `n_reuniones`, `n_actores`, `n_direccionales`, `n_entrenamiento`, `n_evaluacion_ciega`, `acuerdo_unanime_pct`, `sha256_fuentes`. |
| `anual` | Una fila por año: `n`, `h`, `d`, `neu`, `indice` (tono neto, tal como lo calculó la fuente), `cobertura_direccional`, `score_medio`. |
| `actores` | Una fila por actor: `n`, `h`, `d`, `indice`, `cargos`, `mandato`, `verificado`. |

Dos reglas que valen para lo que se construya encima:

1. **Ninguna sección lee CSV.** El agregado se calcula en Python y llega al
   cliente ya resuelto.
2. **No se publica texto.** Las 9.725 intervenciones con su cadena completa se
   quedan en `data/fase-2/`: al navegador va el agregado, y el texto a
   fragmentos por demanda (que es lo que ya hace el panel de cita).

## Cómo se consume

`js/core/web-data.js` es el único sitio del cliente que sabe pedir estos
archivos:

```js
import { loadWebData } from './core/web-data.js?v=1';

loadWebData('resumen').then((data) => {
  if (!data) return;            // sin red no hay dato: el HTML trae el respaldo escrito
  console.log(data.meta.n_reuniones);
});
```

`loadWebData()` cachea la promesa por archivo y **nunca rechaza**: devuelve
`null` si no hay red, si el archivo no existe o si el entorno no trae `fetch`.
Por eso el valor correcto también está escrito en el HTML
(`<span data-corpus-stat="reuniones">132</span>`), y `tools/smoke-test.mjs`
compara las dos cosas: si divergen, el arnés falla.

## Procedencia

`manifest.json` guarda el `sha256` de cada archivo de entrada, el de la salida,
el commit del sitio que la generó y el commit declarado de `joako0o/FASE_2`. Es
lo que permite escribir en un paper "el artefacto se generó desde estos bytes
exactos" y lo que hace que un cambio silencioso de dato no pase inadvertido.

`data/fase-2/` sigue siendo la copia fuente: esta carpeta es derivada y se
puede borrar y regenerar entera.

---

## `resultados.json` — los agregados analíticos de Resultados

Lo genera **`scripts/build-resultados.py`** (el hermano de `build-web-data.py`, que
emite el tamaño del corpus). Este emite lo que dibujan las tres secciones de
Resultados, más una cosa que hasta hoy no estaba en ningún sitio:

| Bloque | Qué trae |
|---|---|
| `anual` | 11 años con las **dos** métricas (contar votos y promediar puntajes), el IC de Wilson del balance, la cobertura direccional y el % de relevancia |
| `actas` | las 132 reuniones con n/H/D, balance, cobertura, score y **la decisión del Consejo** (subir/mantener/bajar, magnitud en pb, TPM resultante) |
| `cruce_decision` | el tono medio por tipo de decisión, con y sin la frase del acuerdo, y la diferencia subir−bajar con su IC95 |
| `senal` | cuánta señal direccional vive en las 132 intervenciones del acuerdo |
| `topicos` | 6 ejes × 11 años con el índice base 100 contra el corpus |
| `disenso` | actas con hawkish y dovish a la vez, acuerdo del ensamble y reparto de decisiones |
| `puente_muestra` | qué fragmentos de los 99 caen en qué acta (las 67 fechas, todas dentro del corpus) |

**El cruce tono ↔ decisión es la validación que le faltaba al índice textual**, y
viene con su prueba de circularidad: el acta *contiene* la frase de la decisión, así
que el script calcula el cruce con la frase incluida y excluida. Medido:

```
decisión      n    tono medio   signo coherente
subir        35     +0,0948       35/35
mantener     80     -0,0046       50/80 (tono < 0)
bajar        17     -0,1023       17/17
subir − bajar = +0,1971 · IC95 [+0,1705, +0,2255] · P(>0) = 1,000
                 sin la frase del acuerdo: +0,1776
```

Y el límite, que se publica junto al hallazgo: las 132 intervenciones del acuerdo
son el **1,4%** de las filas pero el **11,3%** de las direccionales y el **10,2%**
de la masa de |score|; su |tono| medio es **0,535** contra **0,065** del resto de la
reunión. El modelo dice la orientación con mucha más fuerza donde el acta anuncia
la decisión que donde se delibera.

**Regla:** ninguna sección lee CSV. El cliente lee este JSON.
