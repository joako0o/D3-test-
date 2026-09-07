# Narrativa: qué cuenta hoy la pieza y qué debería contar

Documento de trabajo. Recoge el arco que quieres contar, lo que el DOM cuenta
hoy realmente, y el reordenamiento propuesto. **Nada de esto está ejecutado
todavía**: es la decisión previa.

---

## 1. El arco que quieres

1. La **moneda** atrae.
2. La **puerta**: qué es una RPM, y que de ahí sale un acta.
3. **La Sala**: el acta contiene más de lo que creemos.
4. **Metodología** a grandes rasgos, con la figura de La Sala reapareciendo
   mediante un juego de cámara.
5. **Resultados**, con foco en los actores y un gráfico de puntuación general.

## 2. Lo que el DOM cuenta hoy

Orden real de `index.html`, con el kicker que ve el lector:

| # | Sección | Kicker visible | Beat |
|---|---|---|---|
| 0 | `hero` | — | 1 ✅ |
| 1 | `stageObjective` | LA REUNIÓN | 2 ✅ |
| 2 | `stageRoom` | LA SALA | 3 ✅ |
| 3 | `stageHook` | EL MÉTODO | 4 — método, parte 1 |
| 4 | `stageAxes` | Mapa de intervenciones | 5 — resultado, sin anunciar |
| 5 | `stageWordEvolution` | **Acto 4** · El lenguaje cambia | 5 |
| 6 | `stageVoices` | **Acto 5** · Las voces | 5 ✅ actores |
| 7 | `stageActs` | **Acto 6** · Navegador de actas | 5 |
| 8 | `stageCounters` | Antes de seguir: dos escalas de lectura | 4 — método, parte 2 |
| 9 | `stagePipeline` | Metodología | 4 — método, parte 3 |
| 10 | `stageTimeline` | Índice exploratorio de orientación por año | 5 — el gráfico general |
| 11 | `stageQuotes` | Epílogo · Volver a la evidencia | cierre |
| 12 | `stageClosing` | — | cierre |

Los beats 1, 2 y 3 están perfectos y no hay que tocarlos.

## 3. Los tres defectos

**a) La metodología está partida en TRES, no en dos.**
`stageHook` (#3), `stageCounters` (#8) y `stagePipeline` (#9). Entre la
primera y la segunda hay cuatro secciones de resultados. El lector recibe "el
modelo convierte el acta en señales", ve cuatro visualizaciones, y entonces le
explican cómo funciona el modelo. La explicación llega cuando ya no la
necesita.

**b) `stageCounters` dice "ANTES DE SEGUIR" en la posición 9 de 13.**
Es una advertencia sobre el tamaño de la muestra (16 años declarados, 182
reuniones, 99 fragmentos, 17 participantes). Llega cuando ya has seguido. Ese
mismo bloque, colocado al cerrar la metodología, es exactamente lo que hace
falta antes de enseñar el primer resultado.

**c) La numeración de actos está rota, y se ve.**
"Acto 1", "Acto 2" y "Acto 3" existen **solo como comentarios HTML**. Son
invisibles. El primer número que ve el lector es **"Acto 4"**, en la sexta
sección. Después la numeración se abandona: "Antes de seguir", "Metodología",
"Epílogo". No hay ningún acto 1, 2, 3 ni 7.

**d) Falta la portada de Resultados.** Se pasa de "EL MÉTODO" a un diagrama de
dispersión sin anunciar que empiezan los hallazgos.

## 4. Orden propuesto

```
  ACTO I    hero                  la moneda
  ACTO II   stageObjective        LA REUNIÓN — qué es una RPM, de ahí sale un acta
  ACTO III  stageRoom             LA SALA — el acta contiene más de lo que creemos

  ACTO IV   stageHook             EL MÉTODO — el acta se convierte en señales
            stagePipeline         cómo, en cuatro pasos            ← sube del #9
            stageCounters         qué tamaño tiene la muestra      ← sube del #8
                                  (aquí "antes de seguir" por fin significa algo)

  ACTO V    [NUEVO]               portada de RESULTADOS            ← no existe
            stageTimeline         índice general por año           ← sube del #10
            stageAxes             mapa de intervenciones
            stageWordEvolution    el lenguaje cambia
            stageVoices           las voces — los actores
            stageActs             de la señal a la fuente (cierra devolviendo evidencia)

  CIERRE    stageQuotes           volver a la evidencia
            stageClosing
```

Cuatro movimientos y una sección nueva. El resto se queda donde está.

**Por qué `stageTimeline` abre Resultados y no cierra:** es el único plano
general que tienes (una línea por año, 2000–2015). Es el "esto es lo que
encontramos" que justifica las cuatro secciones de detalle que vienen detrás.
Hoy está enterrado entre la metodología y el epílogo, donde no lo lee nadie.

**Por qué `stageActs` cierra Resultados:** es el navegador que te lleva del
dato a la frase original. Terminar los hallazgos con "y puedes verificarlo tú"
es el final natural, y encadena con el epílogo.

## 5. La figura de La Sala reapareciendo en la metodología

Es factible y sale barato. `cameraChoreographyStops` se deriva de la posición
en el DOM de cada sección por `id`, y hoy `#stageRoom` **está excluido a
propósito** (el cruce del umbral lo gobierna su propio dolly). La estatua no se
destruye al salir de La Sala: `figureSystem.group` sigue en la escena con
`visible = figureReveal > 0.01`.

O sea que el retablo sigue ahí, apagado. Volver a encenderlo desde la
metodología es subir `figureReveal` y añadir una parada de cámara que orbite
hacia `z = -4.8`, en vez de modelar nada nuevo.

**Cuidado con una cosa:** el encuadre de La Sala ahora se resuelve contra el
titular `#roomTitle` (`refreshRoomAim()`). Si la figura reaparece en la
metodología, el copy de esa sección es otro y hay que decidir contra qué se
encuadra allí.

## 6. Qué cuesta ejecutarlo

| Tarea | Coste | Riesgo |
|---|---|---|
| Mover 4 `<section>` en `index.html` | bajo | bajo |
| Reordenar el array `cameraChoreographyStops` | bajo | **medio** — el orden del array fuerza la monotonía |
| Retocar `pos`/`look` de las paradas movidas | medio | medio — hay que volver a mirarlo |
| Renumerar los kickers a actos I–V | bajo | bajo |
| Escribir la portada de Resultados | — | **necesita tu voz** |
| `npm run shots` + revisión visual | 2 min | — |

No hay riesgo de romper ScrollTrigger: cada `pin`/`scrub` cuelga de su propia
sección y viaja con ella.

## 7. Lo que necesito de ti antes de tocar nada

1. **¿Apruebas el orden de §4?** En concreto, subir `stageTimeline` a abrir
   Resultados es el movimiento con más consecuencias narrativas.
2. **La portada de Resultados**: ¿escribo yo un borrador y lo corriges, o
   prefieres darme tú el titular?
3. **Numeración**: ¿actos I–V con números romanos visibles en los cinco
   kickers, o quitamos los números y dejamos solo los nombres? Hoy hay medio
   sistema, que es peor que ninguno.
4. **El gráfico de puntuación general por acta** que mencionaste: `stageTimeline`
   agrega **por año**, no por acta. ¿Quieres que además exista el desglose por
   acta, o el anual te vale como plano general?

---

### Nota sobre los datos (afecta a lo que se puede prometer en Resultados)

`js/data/quotes.js`: 99 citas, 17 participantes, 2001–2015 (faltan 2000, 2002, 2003
y 2004), 35 hawkish / 35 dovish / 29 neutral, **0 citas con campo `source`** y
el `score` es maqueta. Cualquier titular de Resultados tiene que sostenerse
sobre eso, o el badge de "PROTOTIPO · DATOS DE PRUEBA" deja de ser suficiente.
