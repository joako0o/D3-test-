# Auditoría — estado y lista de pendientes

Revisión de responsive, accesibilidad, rendimiento, SEO, seguridad y experiencia
móvil. Este documento es la lista viva: lo arreglado queda como registro de por
qué se tocó, y lo pendiente con su razón de no haberse hecho todavía.

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
| 4 | `#voiceProfilePanel` decía `aria-modal="true"` pero el foco se escapaba al mapa D3 | Confinamiento con Tab / Shift+Tab | WCAG 2.4.3 |
| 5 | `.signal-num` (3.18:1) y `.signal-caption` (3.54:1) bajo el mínimo | Alfa 0.35/0.38 → 0.52 | WCAG 1.4.3 |
| 6 | `<h1>` en inglés dentro de un documento `lang="es"` | `lang="en"` en el encabezado | WCAG 3.1.2 |

Cada arreglo tiene su comprobación en `scripts/audit/audit.mjs`, validada en
ambos sentidos: se revirtió el arreglo para confirmar que la auditoría falla con
el mensaje correcto, y se restauró para confirmar que queda limpia.

---

## Pendiente

### 1. Tabulación del mapa sin techo — bloqueante con datos reales

`js/sections/axes-map.js` dibuja **una marca `<g tabindex="0">` por fragmento**,
sin paginación ni virtualización. Con los 99 de la maqueta es cómodo; el corpus
real que la propia página declara son 182 reuniones y sus fragmentos, así que el
número de paradas de tabulación crece linealmente y sin límite. Llegar con el
teclado a lo que hay *después* del mapa exigiría cientos de pulsaciones.

La solución habitual no es quitar el acceso por teclado —esas marcas son el
equivalente deliberado de las partículas 3D, que si no solo responden al
puntero— sino darle **una sola parada al gráfico** y moverse entre puntos con
las flechas (patrón grid/composite de WAI-ARIA), o agrupar por acta.

No se ha tocado porque es una decisión de arquitectura de la versión con datos
reales, no un defecto de la maqueta.

### 2. `d3.min.js`: 90 KB comprimidos para 14 funciones

Medido: 273 KB crudos, **90 KB gzip**. El uso real es `select`, `scaleLinear`,
`scaleTime`, `timeFormat`, `timeYear`, `range`, `max`, `min`, `mean`, `line`,
`curveMonotoneX`, `curveLinear`, `axisBottom`, `axisLeft`.

Sustituir el bundle completo por los submódulos (`d3-selection`, `d3-scale`,
`d3-shape`, `d3-axis`, `d3-array`, `d3-time-format`) baja a unos 25–30 KB gzip.
Es el mejor ratio de ahorro por riesgo de todo el proyecto, pero exige un paso
de build que hoy no existe: el sitio se sirve como estáticos sin bundler.

### 3. Three.js: 162 KB gzip

Recortarlo de verdad requiere tree-shaking con un bundler. Es un cambio
estructural, no una optimización suelta. Va después del punto 2, y solo si se
introduce build.

### 4. `monedav5-draco.glb` apenas se comprime

433 KB crudos → 419 KB gzip: ya está comprimido con Draco, así que gzip no
aporta. Es el archivo más pesado del arranque. Merece revisar si el nivel de
compresión Draco o el recuento de polígonos pueden bajar sin que se note.

### 5. Verificación en navegadores reales

Todo lo automático corre en Chromium con SwiftShader (software, sin GPU).
**Safari/iOS es el hueco de mayor riesgo**: WebGL, `viewport-fit=cover` y las
`.woff2` se comportan distinto. Necesita dispositivo real o servicio de testing.

### 6. Lectores de pantalla reales

Se comprobó el orden de foco, los nombres accesibles y el confinamiento del
diálogo, que es lo verificable por máquina. Cómo suena realmente en NVDA,
VoiceOver o TalkBack no se automatiza.

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
- **Las 99 marcas tabulables**: son el equivalente de teclado deliberado de las
  partículas, con `role="button"`, `aria-label` y `keydown`. Ver punto 1 para el
  problema de escala.
- **`hawkish` / `dovish` sin `lang`**: préstamos asentados en la jerga
  económica en español; marcarlos sería ruido.
