# `fonts/` — Fuentes self-hosted

Las fuentes **Playfair Display** (títulos) e **Inter** (texto) están alojadas
en este repo como `.woff2` (subconjunto *latin*, el que cubre el texto del
sitio). `index.html` las carga con `@font-face`, sin depender de Google Fonts.

## Estado

- ✅ **Completado** (2026-08-30): los 9 archivos se descargaron del paquete
  `@fontsource/*` (npm) y se registraron en `index.html`.
- El bloque `@font-face` está al principio de `index.html`, antes del CSS
  principal, para evitar FOUT/CLS en el primer frame.

## Archivos

| Archivo | Peso | Uso |
|---|---|---|
| `playfair-display-400.woff2` | 22 KB | títulos regular |
| `playfair-display-500.woff2` | 23 KB | títulos medium |
| `playfair-display-600.woff2` | 23 KB | títulos semibold |
| `playfair-display-700.woff2` | 23 KB | títulos bold |
| `playfair-display-400-italic.woff2` | 22 KB | itálicas (citas) |
| `inter-300.woff2` | 24 KB | texto light |
| `inter-400.woff2` | 24 KB | texto regular |
| `inter-500.woff2` | 24 KB | texto medium |
| `inter-600.woff2` | 24 KB | texto semibold |

Total ≈ **224 KB** (una sola descarga de las anteriores, y sin round-trips
a `fonts.googleapis.com`).

## Si necesitas actualizar o añadir pesos

1. `npm install @fontsource/playfair-display @fontsource/inter`
   (o el paquete de la familia que toque).
2. Copia el `.woff2` de `node_modules/@fontsource/<familia>/files/`
   a esta carpeta con el nombre `familia-peso(-italic).woff2`.
3. Añade la línea `@font-face` correspondiente en `index.html`.

> Si prefieres solo el alfabeto del sitio (es-latino + signos), puedes usar
> el subset `latin` de fontsource; es el que está en el repo ahora.
