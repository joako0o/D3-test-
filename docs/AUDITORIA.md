# Auditoría — estado y lista de pendientes

Revisión de responsive, accesibilidad, rendimiento, SEO, seguridad y experiencia
móvil. Este documento es la lista viva: lo arreglado queda como registro de por
qué se tocó, y lo pendiente con su razón de no haberse hecho todavía.

Listas de referencia del sector (front-end y trabajo con IA): `docs/CHECKLISTS.md`.

Ejecutar la auditoría automática:

```bash
npm start          # en otra terminal
npm run audit      # 4 anchos, sale con código 1 si hay ERRORes
```

Estado actual: **0 errores, 0 avisos** en 360, 390, 768 y 1440px.

---

## Arreglado

| # | Problema | Arreglo | Norma |
|---|---|---|---|
| 1 | `.act-term-chip` y `.act-open-evidence` medían 22 y 23px de alto | `min-height: 24px` | WCAG 2.5.8 |
| 2 | `<title>` de 108 caracteres, se recortaba antes de decir de qué iba | Acortado a 62, front-loaded | SEO |
| 3 | 3 vulnerabilidades altas (`extract-zip`, path traversal por symlink) | `puppeteer-core` → `^25.10.0`; `npm audit` en 0 | Seguridad |
| 4 | `#voiceProfilePanel` decía `aria-modal="true"` pero el foco se escapaba | Confinamiento con Tab / Shift+Tab | WCAG 2.4.3 |
| 5 | `.signal-num` (3.18:1) y `.signal-caption` (3.54:1) bajo el mínimo | Alfa 0.35/0.38 → 0.52 | WCAG 1.4.3 |
| 6 | `<h1>` en inglés dentro de un documento `lang="es"` | `lang="en"` en el encabezado | WCAG 3.1.2 |
| 7 | El mapa tenía una parada de tabulador por punto (99, sin techo) | Roving tabindex: 1 parada + flechas | WCAG 2.4.3 |
| 8 | `d3.min.js`: 90 KB gzip para 14 funciones | Subconjunto a medida → 19 KB gzip | Rendimiento |
| 9 | `monedav5-draco.glb`: normal map casi plano guardado sin pérdida | Recomprimido a q90 → 176 KB | Rendimiento |
| 10 | Sin cabeceras de seguridad | CSP estricta + `referrer` como `<meta>` | OWASP |

Cada arreglo tiene su comprobación en `scripts/audit/audit.mjs`, validada en
ambos sentidos: se revirtió el arreglo para confirmar que la auditoría falla con
el mensaje correcto, y se restauró para confirmar que queda limpia.

### Ahorro de peso acumulado

Medido en gzip, que es lo que viaja por la red:

| Recurso | Antes | Después | |
|---|---|---|---|
| `d3.min.js` | 90 KB | 19 KB | −79% |
| `monedav5-draco.glb` | 419 KB | 162 KB | −61% |
| **Total** | **509 KB** | **181 KB** | **−65%** |

**328 KB menos en cada carga en frío.**

### Herramientas de mantenimiento añadidas

Ninguna cambia cómo se sirve el sitio: sigue siendo estáticos, se abre
`index.html` y funciona. Se ejecutan a mano y dejan su resultado versionado.

- `npm run audit` — auditoría en Chromium real, 4 anchos.
- `npm run build:d3` — regenera el subconjunto de D3. Ejecutar al usar una
  función de D3 nueva; el script avisa si falta alguna.
- `npm run opt:glb` — recomprime las texturas de un GLB.

---

## Pendiente

### 1. Three.js: 162 KB gzip

Es ya el recurso más pesado del arranque. Recortarlo exige tree-shaking con un
bundler, y eso convertiría el proyecto en uno con paso de build obligatorio —
hoy se abre `index.html` y funciona. Es un cambio de naturaleza distinta a los
dos anteriores (que dejan artefactos prebuilt y versionados), y merece decidirse
a propósito, no colarse en una tanda de optimizaciones.

### 2. Core Web Vitals de campo

`npm run audit` los mide **en laboratorio** (LCP 1064 ms, CLS 0,007 — ambos
dentro de umbral). Pero Google puntúa con datos de **usuarios reales** (CrUX,
percentil 75): la puntuación de laboratorio no es la evaluación real. Con el
sitio publicado, mirar PageSpeed Insights / Search Console.

Ojo con el sentido de la comparación: aquí el WebGL va por software, así que el
LCP sale PEOR que en una máquina real. Si pasa aquí, pasa fuera; al revés no.

### 3. Verificación en navegadores reales

Todo lo automático corre en Chromium con SwiftShader (software, sin GPU).
**Safari/iOS es el hueco de mayor riesgo**: WebGL, `viewport-fit=cover` y las
`.woff2` se comportan distinto. Necesita dispositivo real o servicio de testing.

### 4. Lectores de pantalla reales

Se comprobó el orden de foco, los nombres accesibles, el confinamiento del
diálogo y la navegación por flechas del mapa, que es lo verificable por máquina.
Cómo suena realmente en NVDA, VoiceOver o TalkBack no se automatiza.

---

## Revisado y correcto (no se tocó)

- **Responsive**: sin desbordamiento horizontal en 360/390/768/1440, arriba y a
  media página.
- **`prefers-reduced-motion`**: respetado en 6 hojas de estilo y en `main.js`.
- **Estados vacíos**: cubiertos en el navegador de actas, el explorador de voces
  y la evolución de palabras.
- **Estados de error**: sin WebGL, pérdida de contexto WebGL y fallo de carga de
  recursos tienen mensaje visible.
- **`<noscript>`**: explica la degradación y carga una hoja alternativa.
- **Open Graph / SEO**: completos, incluido `og:image:alt` y JSON-LD con
  `Dataset`.
- **Enlaces**: sin anclas rotas; no hay `target="_blank"`, así que no hay riesgo
  de `window.opener`.
- **Formularios**: no hay ninguno. El único control de entrada es el `<select>`
  de filtro por año, con `aria-label` y estado vacío correcto.
- **`quotePanel`**: es `aria-modal="false"` (no modal) — correctamente sin
  confinamiento de foco.
- **`Puerta_bcch_v3.glb`**: 282 KB crudos pero 54 KB gzip, y sin texturas
  incrustadas. No hay nada que recuperar ahí.
- **La textura baseColor de la moneda**: ya estaba en WebP con pérdida;
  recomprimirla no ahorraba. El script la deja intacta a propósito.
- **`hawkish` / `dovish` sin `lang`**: préstamos asentados en la jerga
  económica en español; marcarlos sería ruido.
- **Landmarks**: un solo `<main>`, `<nav>` etiquetado, `<header>`/`<footer>`
  correctos. Sin `autofocus` (que la A11Y Project desaconseja), sin listas mal
  formadas y sin enlaces de mismo texto y distinto destino.
- **Foco fantasma en `#quotePanel`**: parecía tener controles enfocables dentro
  de `aria-hidden="true"`, pero el panel usa además el atributo `hidden`, que
  lo saca del árbol; al abrirse pone `aria-hidden="false"`. Comprobado en
  ejecución: cerrado no es alcanzable, abierto sí.
- **Encabezados vacíos** (`#voiceProfileTitle`, `#voiceDetailName`): los rellena
  el JS al seleccionar una voz. Falso positivo de un análisis estático.
- **Zoom al 200% y 250%**: sin desbordamiento horizontal. Los ~79 elementos
  detectados fuera del viewport son las secciones de scrollytelling, colocadas
  con `transform` a propósito.
- **Orientación horizontal en móvil** (844×390): sin desbordamiento.

---

## Nota sobre cómo se validó lo visual

Comparar capturas del hero con RMSE da un 17% de diferencia entre versiones,
y **ese número no significa nada aquí**: la moneda gira, así que cada captura la
coge en otro ángulo y la métrica mide la fase del giro, no la calidad.

Para el normal map la validación fue contra las texturas extraídas del GLB
(PSNR 44,3 dB, RMSE 0,6% — por encima de 40 dB es indistinguible a la vista) y
contra tres renders en fases distintas del giro, mirando que el relieve, las
letras y el brillo metálico siguieran ahí.

---

# Arranque: el congelamiento de 6,3 segundos

## El síntoma

> "siento que se pega en mi otro PC al abrirlo"

Reportado sobre GitHub Pages. La sospecha inicial —la red, o el peso de los
GLB— resultó equivocada.

## El diagnóstico

Ninguna herramienta del repo medía el arranque: `npm run perf` empieza cuando
la página ya cargó, o sea justo *después* del problema. Se escribió
`npm run boot` para cubrir ese hueco. Con la CPU frenada 4x (un portátil de
gama media, no la máquina de desarrollo):

| Métrica | Antes |
|---|---|
| Primer pixel (FCP) | 1 348 ms |
| DOMContentLoaded | 7 085 ms |
| Hilo bloqueado (TBT) | 16 030 ms |
| **Peor tarea, de una vez** | **8 049 ms** |

El recurso de red más lento tardaba 357 ms. **No era la red.**

La traza de Chrome señaló un `v8.evaluateModule` de 5,7 s y el perfil por
muestreo lo confirmó: **4 367 ms eran el cuerpo de `main.js` ejecutándose de
arriba abajo en una sola tarea**. Instrumentando el nivel superior con marcas
se localizó el reparto:

| Tramo | Coste |
|---|---|
| Inicialización del renderer | 1 691 ms |
| Entorno de iluminación (PMREM) | 655 ms |
| Texturas de canvas | 178 ms |
| **Construcción de la fachada** | **2 083 ms** |
| Secciones + cierre | 303 ms |

Una tarea de 8 s no es lentitud: es una pestaña que no responde a nada, ni a
scroll ni a clics, y que el navegador puede llegar a marcar como colgada.

Lo irónico: el precalentado (`warmUpScene`) ya estaba bien resuelto, cediendo
el hilo con `breathe()`. Pero **no llegaba a correr** — se dispara desde
`manager.onLoad`, y para entonces el módulo ya se había comido los segundos.

## El arreglo

`main.js` es un módulo ES, así que admite `await` en el nivel superior. Se
insertaron seis cortes `await breathe()` entre tramos independientes:

1. antes del entorno de iluminación (PMREM),
2. antes de las texturas de canvas (dos bucles de 5 200 y 4 200 iteraciones),
3. antes de construir la fachada,
4. entre la construcción y el recorrido de materiales,
5. antes del sistema de partículas,
6. antes de partir el texto del cierre con SplitText.

**El trabajo total es idéntico.** Lo que cambia es que deja de ser un bloque
único y pasa a ser una carga progresiva, con el navegador pintando y
atendiendo eventos entre tramo y tramo. El orden de ejecución no se alteró: los
cortes van entre bloques sin dependencias, nunca dentro de una secuencia.

## El resultado

| Métrica | Antes | Después | |
|---|---|---|---|
| Primer pixel (FCP) | 1 348 ms | **452–600 ms** | −59% |
| domInteractive | 548 ms | **471 ms** | |
| DOMContentLoaded | 7 085 ms | **4 645 ms** | −34% |
| Peor tarea | 8 049 ms | **3 798 ms** | −53% |

Y lo más relevante, que no se ve en la tabla: la peor tarea que queda **ya no
ocurre durante el arranque**, sino pasados los 12 s, dentro del precalentado y
detrás de la cortina de carga. El lector ya no la sufre.

En móvil (390×844) el bloqueo total bajó de 16 030 a 10 235 ms.

## Lo que queda pendiente

El TBT sigue muy por encima del presupuesto (15 700 ms contra 2 500). El resto
es **compilación de programas de WebGL**: `il` y `St` en `three.module.min.js`
suman ~4 600 ms de tiempo propio. Eso no se trocea con `await` — cada
`compileShader` es atómico. Las salidas reales serían reducir el número de
variantes de material, o `KHR_parallel_shader_compile`. Es un trabajo mayor,
con su propia medición, y no se abordó aquí.

Nota sobre el presupuesto de `npm run boot`: está fijado en la frontera entre
"arranca" y "se pegó", no en lo que hoy se cumple. Falla a propósito.

## Pendiente de verificar en GitHub Pages

No se pudo comprobar desde el entorno de trabajo (sin salida a internet):

- **Compresión**: si Pages sirve `three.module.min.js` (655 KB) con gzip/brotli.
  Se comprueba con
  `curl -sI -H "Accept-Encoding: br" <url>/js/three.module.min.js | grep -i content-encoding`.
- **`Cache-Control`**: Pages suele mandar `max-age=600`, lo que significa que
  una segunda visita al cabo de diez minutos vuelve a descargarlo todo.

Ambas cosas afectan solo a la **primera** carga en red, no al congelamiento de
CPU que documenta esta sección.
