# `fonts/` — Fuentes self-hosted

El proyecto usa **Playfair Display** (títulos) e **Inter** (texto), servidas hoy
desde Google Fonts. Para que sea 100% offline y para que el render no
"salte" entre local y GitHub Pages, conviene tenerlas en este repo.

## Cómo hacerlo (tú)

1. Descarga los archivos `.woff2` de Playfair Display (400/500/600/700/italic)
   e Inter (300/400/500/600). Puedes usar google-webfonts-helper.
2. Ponlos en esta carpeta con nombres así:

   - `fonts/playfair-display-400.woff2`, `500`, `600`, `700`, `400-italic`
   - `fonts/inter-300.woff2`, `400`, `500`, `600`

3. En `index.html`, reemplaza el bloque `<link>` de Google Fonts por:

   ```html
   <style>
     @font-face { font-family:'Playfair Display'; font-weight:400; font-style:normal; src:url('fonts/playfair-display-400.woff2') format('woff2'); }
     /* ... resto de pesos ... */
     @font-face { font-family:'Inter'; font-weight:300; src:url('fonts/inter-300.woff2') format('woff2'); }
     /* ... resto de pesos ... */
   </style>
   ```

4. El resto del CSS ya usa `var(--font-display)` y `var(--font-body)`, así que
   no hay que tocar nada más.

> Mientras no subas las fuentes, el proyecto seguirá funcionando con el
> fallback (`Georgia` / sistema). Esto NO es un bug: es un paso de pulido.
