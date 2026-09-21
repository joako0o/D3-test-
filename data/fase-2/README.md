# Datos fuente FASE_2

Datos reales incorporados desde [`joako0o/FASE_2`](https://github.com/joako0o/FASE_2),
para reemplazar progresivamente la maqueta de `js/data/quotes.js` en el
scrollytelling.

## Procedencia

- Repositorio: `https://github.com/joako0o/FASE_2`
- Commit incorporado: `92986f008f8337a407b9d527c473a26747c0654a`
- Periodo: 2005–2015
- Corpus: 9.725 intervenciones
- Modelo: W+C+600

El archivo `manifest.json` conserva el manifiesto de la fuente original.

## Archivos incorporados

### Fuente y clasificación

- `corpus_bcch_2005_2015.csv`: corpus textual de las intervenciones.
- `actores_metadata.csv`: metadatos disponibles de actores.
- `resultados/clasificacion_wc600_9725.csv`: clasificación completa, voto
  final, probabilidades, score continuo y señales de acuerdo.

### Agregados para visualización

- `resultados/analisis_descriptivo/indices_por_anio.csv`
- `resultados/analisis_descriptivo/indices_por_reunion.csv`
- `resultados/analisis_descriptivo/indices_por_actor.csv`
- `resultados/analisis_descriptivo/indices_actor_por_anio.csv`
- `resultados/analisis_descriptivo/radar_tematico_actores.csv`
- `resultados/analisis_descriptivo/evolucion_topicos_modelo_anual.csv`
- `resultados/analisis_descriptivo/evolucion_topicos_modelo_por_reunion.csv`
- `resultados/analisis_descriptivo/topicos_modelo_por_actor.csv`
- `resultados/analisis_descriptivo/vocabulario_distintivo_por_actor.csv`

## Selección editorial en curso

`candidatos-particulas.csv` contiene 180 fragmentos candidatos para reemplazar
las partículas actuales: 60 `hawkish`, 60 `dovish` y 60 `neutral`. Se generó
uniendo clasificación y texto por `intervencion_id`, filtrando texto dañado y
filas no relevantes, priorizando acuerdo entre miembros, señal de postura,
riqueza temática, extensión legible y diversidad de actores/años.

El proceso es reproducible con:

```bash
python3 scripts/select-particle-candidates.py
```

Esta salida es una bandeja de revisión, no una selección editorial definitiva.
Los fragmentos deben revisarse antes de reemplazar `js/data/quotes.js`.

`candidatos-crisis.csv` contiene además 20 fragmentos de 2008–2009, eligiendo
pasajes que mencionan explícitamente la crisis financiera internacional,
recesión, iliquidez o turbulencias. Es una selección temática separada para
poder contar ese episodio sin forzar el balance H/D/N de la muestra general.
Se regenera con:

```bash
python3 scripts/select-crisis-particles.py
```

## Regla de uso

Esta carpeta contiene la copia fuente y los agregados originales. No editar
manualmente estos CSV. Las transformaciones para navegador deben generarse en
una carpeta separada (`data/web/`) y documentar qué columnas y filas conservan.
