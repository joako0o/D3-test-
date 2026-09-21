# Criterio de etiquetado v3 — documento del autor

**Estado:** documento de trabajo del autor, provisto el **2026-09-21**. **No está
publicado en `joako0o/FASE_2`**, así que no tiene `sha256` ni commit que lo
respalde (a diferencia de todo lo que vive en `data/fase-2/fuente/`, que sí los
tiene — ver `PINS.json`).

**Por qué está acá:** el criterio de anotación es lo que la pieza describe cuando
explica el método, y hasta hoy vivía solo en una máquina local. Sin un archivo en
el repo, ni la pieza ni el paper pueden citar de dónde sale una etiqueta. Este
documento no reemplaza al `CODEBOOK.md` formal —que sí está importado y
pinneado—: lo acompaña, y su propósito inmediato es dejar registrado qué se dijo
y cuándo.

**Pendiente (decisión del autor):** publicarlo en `FASE_2` como
`docs/CODEBOOK_ETIQUETADO.md` y reimportarlo con `python3 scripts/import-fase2.py`,
o fusionarlo con `CODEBOOK.md`. Nota: `docs/METODOLOGIA_Y_BENCHMARK.md` **ya cita
un `CODEBOOK_ETIQUETADO.md` que no existe en el repo de la fuente**; este
documento es, por contenido, ese archivo faltante.

---

## 1. Principio fundamental: separación diagnóstico / postura

- **Diagnóstico macroeconómico puro:** describir la realidad económica (*«la
  inflación subió a 4%»*, *«el desempleo aumentó»*) **no** determina por sí solo
  la etiqueta; describe el entorno.
- **Postura de política (*policy stance*):** lo que determina la etiqueta es la
  **prescripción o preferencia de acción monetaria** (qué hacer con la TPM o con
  la liquidez).

## 2. Reglas por etiqueta

### Hawkish (H) — sesgo restrictivo / endurecimiento

1. **Acción inmediata:** proponer o votar por subir la TPM o retirar liquidez.
2. **Orientación futura:** proponer un sesgo explícito al alza; señalar que el
   inicio o la continuidad de la normalización/retiro del estímulo está cercano.
3. **Justificación de fondo:** afirmar que el nivel actual de tasa es
   excesivamente expansivo, o que los riesgos inflacionarios y el recalentamiento
   de la demanda obligan a restringir las condiciones financieras.
4. **Oposición:** rechazar sustantivamente una rebaja de tasa o descartar mayor
   relajamiento.

> *Ejemplo:* «Estima que es indispensable dar una señal clara de retiro del
> impulso monetario en los próximos meses.»

### Dovish (D) — sesgo expansivo / relajamiento

1. **Acción inmediata:** proponer o votar por rebajar la TPM o implementar
   medidas de inyección de liquidez (p. ej. FLI).
2. **Orientación futura:** proponer un sesgo explícito a la baja; sostener que se
   debe postergar la normalización o prolongar el estímulo por más tiempo.
3. **Justificación de fondo:** enfatizar holguras de capacidad, debilidad de la
   demanda o riesgos deflacionarios que ameritan mayor apoyo.
4. **Oposición:** argumentar en contra de subir tasas, o considerar prematuro
   cualquier retiro de estímulo.

> *Ejemplo:* «Plantea que la debilidad del escenario externo aconseja ampliar el
> impulso monetario recortando la TPM.»

### Neutral (N) — mantención o ausencia de sesgo direccional

1. **Mantención pura:** votar o proponer mantener la TPM sin sesgo futuro.
2. **Diagnóstico macroeconómico puro:** estadísticas (PIB, IPC, Imacec, tipo de
   cambio, empleo) sin ligarlas a una recomendación de tasa.
3. **Contexto externo:** discutir EE.UU., Europa o China, o decisiones de la
   Fed/BCE, sin prescribir acción para la economía chilena.
4. **Opciones balanceadas sin resolución:** discutir subir y bajar de manera
   simétrica sin inclinar la balanza.
5. **Comentarios metodológicos o preguntas:** dudas sobre modelos, aclaraciones,
   o menciones a lo que proyecta la encuesta de mercado.

> *Ejemplo:* «El Imacec creció 3,2% en línea con lo previsto por el staff; se vota
> por mantener la TPM en 5,0%.»

## 3. Regla de prioridad institucional (resolución de conflictos)

| Situación textual | Criterio | Etiqueta |
|---|---|---|
| Vota **mantener**, pero exige sesgo al alza / normalización inminente | El *forward guidance* activo prima sobre la inercia de la tasa puntual | **H** |
| Vota **mantener**, pero advierte riesgos a la baja y pide disposición a recortar | El sesgo condicional a la baja prima sobre la mantención | **D** |
| Advierte **alta inflación** o **bajo crecimiento**, pero no propone acción de tasa | Es diagnóstico descriptivo; no hay prescripción monetaria | **N** |

## 4. Filtro de relevancia (`es_relevante_v3`)

- **`1`:** la intervención contiene análisis macroeconómico, discusión de tasas o
  deliberación sustantiva (aplica a H, D y a la mayoría de los N).
- **`0`:** exclusivo para formalidades procedimentales: apertura o cierre de la
  sesión, aprobación del acta anterior, agradecimientos de cortesía al staff sin
  aporte conceptual, suspensiones temporales de la reunión, y fragmentos
  truncados o rotos sin cotexto mínimo evaluable.

## 5. Criterio de evidencia: cita literal (`cita_literal`)

- Subcadena **continua y exacta** de máximo 300 caracteres del texto.
- **Prohibido** inventar elipsis `[...]` para unir trozos no contiguos.
- Si `es_relevante_v3 = 0`, la cita queda obligatoriamente vacía.

---

## Verificación contra los datos (hecha en este repo, 2026-09-21)

Estas reglas explican dos cosas que se habían medido por separado sin saber por qué:

**1. Las 1.919 filas no relevantes son formalismos, como dice §4.** Clasificadas
por su texto (sobre `corpus_bcch_2005_2015.csv`):

```
agradecimientos explícitos         601  (31%)
apertura/cierre de sesión           92  ( 5%)
suspensiones y recesos              46  ( 2%)
fragmentos de una línea             20  ( 1%)
resto (procedimental, a ojo)      1.160  (60%)
```

Los ejemplos del resto lo confirman: *«En Santiago de Chile, a 11 de enero de
2005, siendo las 11:30 horas, se reúne el Consejo…»*, *«El Presidente fija la
sesión de política monetaria del mes de julio…»*, *«El Presidente ofrece la
palabra para comentarios»*.

**2. Por eso el filtro de relevancia nunca elimina una fila direccional.** Medido:
las 513 hawkish y las 380 dovish tienen `pred_relevancia_v3 = 1` **al 100%**. Es
una consecuencia directa de la definición: si `0` es exclusivo para formalidades,
ninguna prescripción de política puede caer ahí.

**3. El desbalance 90,8% neutral deja de ser un misterio.** Con §1 y §2.2–2.3,
buena parte de la masa neutral es *diagnóstico y contexto sin prescripción*, que
es exactamente lo que una reunión de política monetaria hace la mayor parte del
tiempo.

---

## Qué usa la pieza de este documento

| Dónde | Qué dice | Regla |
|---|---|---|
| `#stageHook` (franja de método) | «Cuenta la **postura**, no el diagnóstico: describir la inflación no es señal; proponer qué hacer con la tasa, sí.» | §1, §2 Neutral.2 |
| `#stageHook` (tarjetas) | «pedir subirla, ahora o **después**» / «pedir bajarla o dar estímulo» | §2 H.2 y D.2 (orientación futura) |
| `#stageHook` (advertencia) | «Mantener la tasa tampoco es neutral por defecto: con un sesgo al alza pedido, es hawkish.» | §3, fila 1 |
| `#stageCounters` (nota) | «1.919 intervenciones no son sobre política monetaria: son formalismos» | §4 |

Las mismas afirmaciones están en el `CODEBOOK.md` importado (§4.8, §4.4, §4.5 y
§6), que sí tiene `sha256` en `PINS.json`. Este documento agrega la versión
extendida del criterio y la verificación contra los datos.
