# Revisión técnica — `joako0o/D3-test-` (proyecto local)

- **Repositorio:** `joako0o/D3-test-` · rama `arena/01a05542-d3-test`
- **Sitio desplegado:** https://joako0o.github.io/D3-test-/
- **Qué es:** *"In the room where monetary policy happens"* — scrollytelling sobre las actas de política monetaria del Banco Central de Chile (2000–2015).
- **Stack:** HTML + CSS + JavaScript vanilla, Three.js r160, GSAP 3.12.7 + ScrollTrigger + SplitText + CustomEase, D3 v7, Lenis, GLTFLoader + DRACOLoader.
- **Base de comparación que me pediste:** Penderecki’s Garden (`pendereckisgarden.pl`).

> Nota: no pude hacer un render/headless del sitio en esta sesión (no hay Chromium/Playwright en el sandbox y las llamadas al host de GitHub Pages se cortan), así que la revisión visual está hecha **desde el código** + **lo que devuelve la página en vivo**. No estoy afirmando que veas "mal" el render; estoy identificando las causas más probables y verificables en el código.

---

## 0. Correcciones ya aplicadas (no solo recomendadas)

Commit `8148b9d` en la rama `arena/01a05542-d3-test`:

- **Gráfica de evolución ahora se reconstruye al redimensionar.** Antes tomaba `W/H` una sola vez y usaba `preserveAspectRatio="none"`; ahora limpia handlers/animaciones previos, se redibuja en el debounce de resize y usa `xMidYMid meet` como red de seguridad. Esto ataca **directamente** el síntoma de "figuras/fuentes deformadas" entre local y GitHub.
- **Tamaños de texto dentro de los gráficos subidos:** ejes de timeline `13→16px` y etiquetas de evolución `13/14px` en vez de `10-11px`.
- **Contenedor de la gráfica de evolución más alto** (`300–440px`) y `overflow: visible` para que no se corten las etiquetas del borde derecho.
- **Hero y títulos de sección más grandes** en desktop (`--fs-hero` hasta 46px, `--fs-h2` hasta 52px, hero en +1800px hasta 58px).
- **Título corregido:** "Two Decades" → "Sixteen Years" (el corpus es 2000–2015, no dos décadas).

**No** se ha hecho: self-hosting de las fuentes, extracción de `app.js/styles.css`, `og:image`, lazy load de la puerta o minificar Three.js. Esos quedan en P1/P2 porque implican mover estructura y no son lo que causa tu bug visual.

---

## 0.1 Visión honesta (y limitada)

No estoy proponiendo que este proyecto **finja ser un sitio de agencia**. Eso no es realista con un repo de 1 persona, datos propios y $0 de assets/laboratorio. La meta correcta es:

> **Que se sienta como una pieza de datos hecha con cuidado**, no como "el sitio de presupuesto grande que no tengo".

Concretamente, lo que sí es alcanzable y honesto:

1. **Resolver los bugs reales** (figuras deformadas, fuentes chicas, texto cortado) → hecho en P0.
2. **Darle identidad propia** con lo que ya tienes (moneda + puerta + partículas + D3), en vez de imitar el photogrammetry/GLSL de Garden.
3. **Reducir ruido** (menos tarjetas por pantalla, más espacio, una transición por sección).
4. **Mejorar la narrativa** (una sola metáfora visual recorre la pieza: "la palabra se vuelve partícula → partícula se vuelve evidencia").
5. **Medir** en vez de adivinar: Lighthouse + probar en viewport pequeño/grande.

Lo que **no** voy a proponerte: música en streaming, photogrammetry, 55 ilustraciones a mano, animaciones de agencia, o "hacerlo parecer" otro proyecto. Esos son de otro presupuesto y de otra naturaleza.

---

## 1. Veredicto en una frase

El proyecto es **técnicamente muy sólido y con una idea fuerte**: trazabilidad de datos, 3D simbólico (moneda + puerta), partículas vinculadas a 100 fragmentos y una capa de accesibilidad sorprendentemente cuidada. **No está "en otro nivel técnico" frente a Penderecki’s Garden**; está en **otro género y otro presupuesto**. Garden es una pieza inmersiva de agencia (photogrammetry + GLSL + audio + 55 ilustraciones a mano + premios). Tu proyecto es periodismo de datos interactivo. El "gap" que sientes es de **escala creativa y continuidad visual**, no de calidad del código.

---

## 2. Qué está realmente bien (sí está a la altura)

1. **Trazabilidad de datos.** Cada fragmento vuelve a fecha, participante y acta. La nota al pie (100 fragmentos / 18 voces / 182 reuniones de referencia) es honesta: no promete lo que no muestra. Muy buen patrón para piezas de datos.
2. **Accesibilidad seria.** Skip link, `aria-label` descriptivos en SVGs, foco visible, `prefers-reduced-motion`, modales con retorno de foco y `Escape`, teclado para puntos del mapa y tarjetas. Esto es mejor que el 80% de los proyectos D3 del mismo nivel.
3. **3D con intención.** La moneda como "prueba monetaria" y la puerta como "umbral" son símbolos correctos. El código está lleno de decisiones conscientes: escala de la puerta derivada del tamaño de la moneda, centrado contra el borde real del título, `visualViewport` solo como disparador de resize.
4. **Responsive muy razonado.** Breakpoints por altura (`max-height: 620px`) y por ancho, no solo por ancho; hay variantes para landscape de teléfono y monitores anchos.
5. **Modo offline-first.** Three.js, GSAP, D3 y el decoder Draco están vendored en `js/`. El render no depende del CDN de Three.

---

## 3. Tu problema de "tamaños de figura" → causas probables (y arreglos)

### 3.1 La gráfica de evolución de vocabulario NO se reconstruye al redimensionar

- `initWordEvolution()` calcula `W` y `H` una sola vez con `chartWrap.getBoundingClientRect()` (líneas ≈ `6045–6047`) y dibuja el SVG con:
  ```js
  .attr('viewBox', `0 0 ${W} ${H}`)
  .attr('preserveAspectRatio', 'none')
  ```
- En cambio, `initD3Axes()` y `buildTimeline()` **sí se reconstruyen** con `window.resize` (líneas ≈ `6860` y `7765`).
- Con `preserveAspectRatio='none'`, si el contenedor cambia de tamaño después del init (barra de navegador, iframe, GitHub Pages, maximizar ventana, rotación), el SVG **estira el dibujo y el texto**. Ese es el efecto "figura deformada / texto aplastado" que probablemente viste al pasar de local a GH Pages.
- Imagen es peor si la página se carga dentro de una preview/iframe cuyo tamaño inicial es distinto al viewport final.

**Arreglo rápido (CÓDIGO):**
- Opción A: reconstruir también en resize con debounce, igual que `initD3Axes()` (borrar el contenido del SVG antes de volver a dibujar).
- Opción B (más simple y robusta): cambiar el SVG a una **caja de aspecto fija**:
  ```js
  const W = 1000, H = 420;
  .attr('viewBox', `0 0 ${W} ${H}`)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  ```
  y dejar que el CSS controle solo el ANCHO (`width:100%; height:auto`). Así el texto nunca se deforma, aunque cambie el viewport.
- Si prefieres mantener el tamaño fluido, añade `resize` → `initWordEvolution()` + `container` limpio.

### 3.2 Las figuras usan alturas fijas/pequeñas en desktop

| Figura | CSS/JS | Tamaño desktop | Percepción |
|---|---|---|---|
| Timeline | `height = 320px` (buildTimeline) | fijo 320 px | chica para un `100vh` de sección |
| Evolución vocab. | `.word-evolution-chart-wrap { height: clamp(270px, 39vh, 410px) }` | 270–410 px | correcta, pero discreta |
| Mapa D3 | viewport completo | full-screen | buena |
| Radar de voz | `150/128/82` coords + CSS width `min(300px)` | ~300 px | pequeña |

**Recomendación:** para que las "figuras" tengan más impacto, dimensiona **todas** con la misma regla basada en el **menor** de viewport, p. ej. `min(60vh, 52vw)`, y que el título/leyenda repartan el 40% restante. El objetivo es que los gráficos respiren, no que sean widgets.

### 3.3 Contenedores de gráficos con `overflow:hidden` y etiquetas fuera del área

- `#wordEvolutionSvg { overflow: visible }` pero `.word-evolution-chart-wrap { overflow: hidden }` (líneas ≈ 991–997). Las etiquetas del final del gráfico (`.word-end-label`) se dibujan a `x(last.year) + 8`, que puede **quedar cortada** en el borde derecho del container por el `overflow:hidden`. Ese corte no se ve en local si hay margen extra, pero se nota en viewports distintos. Recomiendo usar `margin-right` interno o reservar `padding-right` dentro del `chart-wrap`.

### 3.4 Los gráficos no están en un `figure` semántico

No hay ningún `<figure>` en el HTML: todo el contenido visual son `section` + `div` + `svg`. Esto no rompe visualmente, pero dificulta controlar tamaños uniformes y da peor metadata a lectores de pantalla. Recomiendo envolver cada visual en `<figure>` + `<figcaption>`.

---

## 4. Tu problema de "fuentes" → causas probables (y arreglos)

### 4.1 Tamaño de fuente muy conservador para una pieza "inmersiva"

La escala tipográfica está bien pensada para **legibilidad**, pero es demasiado "editorial" vs Garden:

```css
--fs-hero: clamp(18px, 2.6vw, 34px);   /* hero h1 */
--fs-h2:   clamp(22px, 3.2vw, 40px);   /* títulos de sección */
--fs-body: clamp(16px, 1.9vw, 19px);
```

En un monitor 1920px → `--fs-hero = 34px`. Un hero de 34px en un título de dos líneas se ve sobrio; Garden maneja títulos/espacios mucho más escénicos. Solo en `min-width:1800px` el hero sube a 46px.

**Arreglo:** subir el tope del hero a `clamp(40px, 4.6vw, 64px)` en desktop y mantener el cuerpo en 18–20px. El mismo criterio para los títulos de sección (a `52–64px`).

### 4.2 Texto de los SVG es demasiado chico

- Ejes del timeline: `clamp(12px, 1.05vw, 13px)`.
- Etiquetas de la evolución: `font: 11px` (eje) y `12px` (final).
- Labels de radar y directorio en varios lugares de 9–11px.
- Escapa si el usuario usa pantallas 2.5K/4K o hace zoom-out.

**Arreglo:** mínimo **14px** para texto funcional de gráficos, y que suba con el gráfico (`font-size: clamp(13px, 1.1vw, 16px)`). En ancho 1920 eso ya se ve mejor.

### 4.3 Fuentes externas sin fallback robusto

- Playfair Display + Inter se cargan desde Google Fonts (`<link>`), no están en el repo.
- Usa `display=swap`, así que el texto aparece con fallback (Georgia / sistema) y "salta" cuando carga la webfont.
- El código resincroniza la posición de la moneda con `document.fonts.ready` (línea 8005), pero **no** re-renderiza los gráficos D3. Si la fuente cambia métricas, los títulos dentro de un SVG no se ajustan.
- En una red restringida (o si GitHub Pages / tu entorno bloquea `fonts.gstatic.com`), la pieza usa la fuente de respaldo y puede verse "diferente" entre local y online.

**Arreglo:**
- Descargar y servir las fuentes **localmente** (`fonts/`) para que sea realmente offline-first (igual que hiciste con three/d3).
- O al menos añadir `font-display: optional` + una clase `.fonts-loaded` en `<html>` para no tener doble paint.
- Añadir `document.fonts.ready` → re-ejecutar `initWordEvolution()` (y `buildTimeline()` si no lo hace) para que los gráficos se dimensionen con la fuente final.

---

## 5. Por qué Garden se siente "en otro mundo" (mi opinión honesta)

Son **dos productos distintos**, no dos niveles de calidad:

| Dimensión | Penderecki’s Garden | Tu proyecto |
|---|---|---|
| Objetivo | Experiencia emocional/inmersiva | Comunicar datos + método |
| Mundo visual | Un solo espacio 3D continuo (jardín) | 3D esporádico + muchas tarjetas/paneles |
| Tecnología | point clouds + GLSL + audio reactivo | Three.js + DOM/D3, más clásico |
| Contenido | 55 ilustraciones a mano + música + relatos | 100 fragmentos + 18 voces + trazabilidad |
| Recompensa | Descubrimiento (0 → 100 %) | Lectura de evidencia |
| Presupuesto | Agencia + fotogrametría con drones | Proyecto de datos personal |

**Dónde sí creo que Garden te gana (y puedes copiar):**
1. **Un solo mundo visual continuo.** Garden nunca "se apaga": las partículas, cámara y música acompañan toda la experiencia. Tú tienes el 3D en hero/La Sala y después te vas a fondos casi planos con tarjetas. Recomiendo **mantener la nube de partículas visible (atenuada) durante TODOS los stages**, y que cada sección sea una "zona" del mismo espacio, no una pantalla nueva.
2. **Transición entre capítulos.** Garden tiene transiciones de página que se sienten coreografiadas. Tú tienes `ScrollTrigger` con fade/translate; está bien, pero la sensación es más "páginas que se apilan". Dale una **transición de scroll única y reconocible** (por ejemplo, la cámara siempre viaja a través de la puerta/umbral hacia cada capítulo).
3. **Recompensa de descubrimiento.** Garden lleva un "descubriste X% del capítulo". Tú tienes la progresión de scroll, pero no un objetivo claro para el usuario. Podrías agregar un **contador de evidencia encontrada** (fragmentos/voces visitados) y una **ruta recomendada de 5 minutos**.
4. **Jerarquía más grande.** Garden usa menos texto y más imagen. Tu pieza es muy densa en texto (correcto para datos), pero para "impacto" necesitas **menos texto por pantalla y más visual**: un título grande, una señal, y el gráfico.
5. **Audio.** No necesitas música libre; incluso un **sound design sutil** (CORS, click/hover, transición) cambiaría completamente la percepción premium.

---

## 6. Auditoría técnica

### 6.1 Datos (sana)
- `quotes.js` es correcto: **100 fragmentos**, **18 voces**, etiquetas **35 hawkish / 35 dovish / 30 neutral**, `score` entre 0.57 y 0.98.
- Hay **1 registro de 1985** (Eduardo García). El código lo trata como fuera de período y lo excluye correctamente, pero en el `total` de la timeline aparece "1 fuera de 2000–2015" (bien). Solo recomiendo **anotarlo explícitamente** en la UI, no solo en una nota pequeña (por ejemplo, "1 fragmento de 1985 excluido de la muestra").

### 6.2 Rendimiento (lo que más te falta para el "impacto")
Peso antes de gzip (aprox.):

```
index.html            341 KB
three.module.js      1.3 MB
d3.min.js             274 KB
draco_decoder.js      501 KB
draco_decoder.wasm    188 KB
monedav5-draco.glb    4.4 MB
puerta-draco.glb      824 KB
GSAP + plugins        120 KB
quotes.js              47 KB
TOTAL ≈ 7.6 MB (antes de compresión)
```

- Es **mucho** para un scrollytelling. Garden también es pesado, pero usa técnicas de optimización (PCD gzip, decimado de nubes, hotspots SVG).
- **Sugerencias:**
  1. Usar `three.module.min.js` o una build tree-shaken (three r160 full es enorme; `three.module.min.js` reduce ~40–50%).
  2. Cargar D3 y GSAP con `defer`/módulos; D3 podría cargarse solo cuando empieza el stage de gráficos.
  3. Aplazar la carga del **puerta-draco.glb** hasta que el usuario llegue al Acto 2 (o pre-cargarlo en idle).
  4. Comprimir los GLB (ya usan Draco, pero revisa si el `.glb` tiene más de lo necesario).
  5. Extraer el JS inline de `index.html` a `app.js` para caché y legibilidad.

### 6.3 SEO / metadatos
- `og:image` **no existe** → al compartir el enlace no hay imagen.
- El `<title>` dice **"Two Decades"**, pero la data es **2000–2015 = 16 años** (README dice 16 años; package.json dice 15 años; inconsistente).
- No hay `canonical`, `robots`, ni `sitemap`. Para GitHub Pages no es crítico, pero para compartir en Linkedin/Reddit sirve un `og:image`.
- `og:description` está bien.

### 6.4 Accessibilidad (buena, con detalles)
- Foco visible bien.
- Tabla/navegación con teclado bien.
- Gaps:
  - `#progressBar` no tiene `role="progressbar"` ni `aria-valuenow`.
  - `#sectionIndicator` (solo debug) está bien porque se oculta sin `?debug`.
  - Los `svg` son accesibles por `role="img"` + `aria-label` en algunos, pero la legend del mapa D3 debería tener su propio `aria-label` o `aria-hidden` en líneas decorativas.
  - El `#quotePanel` no captura el foco (es modal-less, aceptable), pero al abrirse el anuncio depende de `aria-live`; conviene también `aria-describedby`.
  - Muy bajas alturas en algunos textos (9–10px) incumplen WCAG para texto pequeño.

### 6.5 Código y mantenimiento
- **`index.html` 341 KB / ~8000 líneas**: demasiado monolítico. El CSS + el JS están en el mismo archivo. Está bien para un prototipo, pero es difícil de mantener.
- Comentarios excelentes (**mejor que la mayoría de proyectos**). Explican por qué, no solo qué.
- Hay `[TODO` en counters — revisar cuando quieras publicar en serio.
- `package.json` es solo para `python -m http.server`; no hay build. Para GH Pages está bien, pero para producción conviene un `npm run build` mínimo (minificar HTML/JS, hash de assets, gzip).

---

## 7. Plan de acción priorizado

### 🔴 P0 — "Arreglos que probablemente resuelven lo que viste en GH Pages"
1. **Word evolution:** quitar `preserveAspectRatio='none'` o reconstruir en `resize` (ver 3.1). Esto es lo más probable que cause figuras estiradas/texto deformado al cambiar ventana.
2. **Fonts self-hosted:** mover Playfair + Inter a `fonts/` y servir local. Elimina la diferencia entre local/GH red.
3. **Redimensionar gráficos en `document.fonts.ready`** y en `resize`, no solo el 3D.
4. **`og:image`** y **corregir título "Two Decades" → "16 años"**.

### 🟠 P1 — "Impacto visual"
5. Hero más grande: `h1` a `clamp(40px, 4.6vw, 64px)` + más aire.
6. Una sola transición-umbral para todos los capítulos (mantener la nube/3D durante toda la pieza).
7. Títulos de sección a 52–64px; menos texto por pantalla.
8. SVG text mínimo 13–14px y escalado con el gráfico.
9. Colocar cada gráfico en `<figure>` + `<figcaption>`.

### 🟡 P2 — "Rendimiento y producción"
10. Minificar `index.html` como `app.js` + `styles.css`.
11. `three.module.min.js`.
12. Lazy load `puerta-draco.glb` y D3 en el stage correspondiente.
13. `role="progressbar"` + mejorar `aria-live` del panel.
14. Anotar el fragmento de 1985.
15. `package.json` con scripts de build/lint.

---

## 8. Conclusión

No estás "muy por debajo" de Penderecki’s Garden en lo técnico: tienes **mejor trazabilidad de datos, mejor accesibilidad que la media y un código más documentado**. Lo que le falta a tu proyecto es **una elección de dirección visual más inmersiva**:

- un solo mundo continuo (no pantallas de dashboard),
- gráficos que ocupen el espacio (no widgets de 320px),
- tipografía más escénica,
- y transiciones/recompensa que conviertan el scroll en un viaje.

Con los arreglos P0 (resize + fuente local + gráfico sin `preserveAspectRatio=none`) vas a resolver el problema concreto de "tamaños de figura y fuentes" en GitHub Pages. Luego, con la lista P1, el salto de "impacto" frente a Garden será mucho más notorio.

---

*Archivos clave:* `index.html` (UI/JS), `js/quotes.js` (datos), `js/three.module.js`, `js/vendor/*` (libs), `monedav5-draco.glb` y `puerta-draco.glb` (modelos).*
