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

### 2. Verificación en navegadores reales

Todo lo automático corre en Chromium con SwiftShader (software, sin GPU).
**Safari/iOS es el hueco de mayor riesgo**: WebGL, `viewport-fit=cover` y las
`.woff2` se comportan distinto. Necesita dispositivo real o servicio de testing.

### 3. Lectores de pantalla reales

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

---

## Nota sobre cómo se validó lo visual

Comparar capturas del hero con RMSE da un 17% de diferencia entre versiones,
y **ese número no significa nada aquí**: la moneda gira, así que cada captura la
coge en otro ángulo y la métrica mide la fase del giro, no la calidad.

Para el normal map la validación fue contra las texturas extraídas del GLB
(PSNR 44,3 dB, RMSE 0,6% — por encima de 40 dB es indistinguible a la vista) y
contra tres renders en fases distintas del giro, mirando que el relieve, las
letras y el brillo metálico siguieran ahí.
