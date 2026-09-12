# CSS

El CSS vivía dentro de un `<style>` de 3.769 líneas en `index.html`. Ahora hay
un archivo por sección.

## Antes de tocar nada: `css/bundle.css` es un derivado

`index.html` carga **una sola hoja**: `css/bundle.css`. Es la unión minificada
de los archivos de este directorio, en el mismo orden de la cascada, y la
genera:

```bash
npm run build:css
```

- **Se edita aquí** (`css/00-tokens-base.css`, `css/16-stage-voices.css`…), con
  sus comentarios y su orden por prefijo numérico. El bundle nunca se edita a
  mano: se pisa al regenerar.
- `npm start` lo regenera solo (hay un `prestart`), así que en el día a día no
  hay que acordarse de nada.
- `npm run check` **falla** si el bundle quedó viejo respecto a los fuentes,
  para que no se publique un CSS a medio cambiar.
- Si agregas un archivo nuevo, respeta el prefijo numérico: el generador avisa
  y lo deja fuera si no lo lleva (`scripts/build-css.mjs`).

Por qué una sola hoja y no 21: cada `<link>` es una petición que **bloquea el
render**, y sobre HTTP/1.1 se encolan de a seis por origen. Medido en
producción con Lighthouse, las 21 hojas eran 58,6 KiB de bloqueo de render y
850 ms de ahorro estimado, con las fuentes de la portada entrando a 3,1–3,6 s
porque iban al final de esa cola. El minificado es conservador a propósito
(protege cadenas, `url(data:…)` y `calc()`): quita comentarios y espacios, no
reescribe valores.

## La regla de oro: el orden es la cascada

Estos archivos se cargan con `<link rel="stylesheet">` en `index.html`, **en el
orden que marca el prefijo numérico**. CSS resuelve los empates de
especificidad por orden de aparición, así que reordenar los `<link>` puede
cambiar cómo se ve el sitio sin tocar una sola regla.

- No los reordenes sin comprobar qué se rompe.
- No los cargues con `@import` (serializa las descargas y es más lento).
- Un archivo nuevo va con el prefijo que le corresponda por posición, no al
  final por costumbre.

## Mapa

| Archivo | Qué hay dentro |
|---|---|
| `fonts.css` | `@font-face` de Playfair Display e Inter. **Las rutas son relativas a `css/`**, por eso apuntan a `../fonts/`. |
| `00-tokens-base.css` | Tokens de color, tipografía y espaciado (`:root`), reset, layout base, hero y `.scroll-hint`. |
| `10-stage-hook.css` | Stage 2 "Hook" y su versión editorial con señales hawkish/dovish. |
| `11-stage-map.css` | Stage 4: mapa de intervenciones (SVG de D3, ejes, marcas, lectura lateral). |
| `12-stage-counters.css` | Stage 6: contadores animados. |
| `13-stage-pipeline.css` | Stage 7: pipeline de scroll horizontal. |
| `14-stage-language.css` | Stage 5: evolución del lenguaje (huella de vocabulario). |
| `15-stage-acts.css` | Stage 6: navegador de actas (índice, lector, evidencias, chips de término). |
| `16-stage-voices.css` | Stage 5: las voces + ficha radial de perfil discursivo. |
| `17-stage-timeline.css` | Stage 8: línea de tiempo. |
| `18-stage-quotes.css` | Stage 9: tarjetas de cita. |
| `19-stage-closing.css` | Stage 10: cierre y llamada final, y la cortina de carga `#load` con la acuñación de la moneda (`.mint-*`) en divs que solo animan `transform`/`opacity` para componerse en la GPU y no congelarse mientras el arranque bloquea el hilo principal. Debe funcionar sin JS. |
| `20-breakpoints.css` | Cortes tablet (768–1024), móvil (≤768) y móvil pequeño (≤430). |
| `21-a11y-focus.css` | `prefers-reduced-motion` y estados de foco visibles. |
| `22-quote-panel.css` | Panel flotante de cita del enjambre de partículas. |
| `23-a11y-jargon.css` | Segundo bloque de reduced-motion, tooltips de jerga y foco por teclado. |
| `24-layout-fluid.css` | Composición responsive del hero y los stages sobre el lienzo 3D. |
| `25-object-layers.css` | Capa de referencias visuales: reflejo del objeto, memoria y evidencia. |
| `26-room-voice-nav.css` | La Sala: navegación por teclado de las voces en órbita. |
| `27-figure-cabinet.css` | Gabinete de figuras 3D (panel de estado). |
| `28-height-fixes.css` | Ajustes por altura útil en portátiles reales (600–940 px). |
| `noscript.css` | **Solo se aplica sin JavaScript.** Va dentro de `<noscript>`. |

## Convenciones

- **Los colores salen de los tokens de `00-tokens-base.css`**, no se escriben a
  mano. Si necesitas un color nuevo, añade el token.
- **Contraste mínimo 4,5:1** sobre `--color-bg` (`#0a0e1a`) para cualquier
  texto. Ojo con `opacity`: se multiplica sobre el color y hunde el contraste.
  Con `--color-text-primary`, `opacity: 0.62` es el suelo; por debajo de 0.58
  ya no cumple.
- **`!important` es deuda.** Quedan 68 heredados (42 solo en
  `00-tokens-base.css`). No añadas más: si necesitas uno, casi siempre
  significa que la regla está en el archivo equivocado (y por tanto en el
  punto equivocado de la cascada).
- **Nada de estilos nuevos en `index.html`.** Ni `<style>` ni `style="..."`.
  Los `style` inline que quedan son de la maqueta original y van saliendo.
