/* web-data.js — los agregados del corpus para el navegador (`data/web/*.json`).
 *
 * POR QUÉ EXISTE
 *   Hasta hoy el cliente tenía una sola fuente de datos: `js/data/quotes.js`,
 *   la muestra editorial de 99 fragmentos. Todo lo que la pieza decía del
 *   corpus (9.725 intervenciones, 132 reuniones, 11 años) estaba escrito a mano
 *   en `index.html`, y por eso se quedó viejo: el HTML sigue diciendo 16 años,
 *   182 reuniones y 17 participantes, y el dataset dice otra cosa.
 *
 *   Este módulo es el único sitio del cliente que sabe pedir los agregados.
 *   `scripts/build-web-data.py` los genera desde `data/fase-2/` y deja la
 *   procedencia en `data/web/manifest.json` (sha256 de cada fuente y de cada
 *   salida).
 *
 * REGLAS
 *   · Una sola promesa por archivo. Sin caché, dos consumidores harían dos
 *     `fetch` del mismo JSON, y en una sección con `pin` eso se nota.
 *   · Nunca rechaza: si no hay red, si el archivo no existe o si el entorno no
 *     trae `fetch` (jsdom sin puente, un navegador muy viejo), devuelve `null`.
 *     Quien consume decide qué hacer sin el dato: el HTML trae el valor
 *     correcto escrito, así que la página sigue diciendo la verdad.
 *   · Nada de efectos de nivel de módulo: importar esto no pide nada.
 *
 * USO
 *   import { loadWebData } from './core/web-data.js?v=1';
 *   loadWebData('resumen').then((data) => { … data.meta.n_reuniones … });
 *
 *   La versión `?v=` va en la URL del import y debe coincidir en todos los
 *   sitios que lo importen (igual que viewport.js): dos URLs del mismo módulo
 *   son dos instancias, y con dos instancias habría dos cachés y dos fetch.
 */

const CACHE = new Map();

/**
 * Los agregados generados por `scripts/build-web-data.py`.
 * @param {string} name — nombre del archivo sin extensión (p. ej. 'resumen').
 * @returns {Promise<object|null>} el JSON, o null si no se pudo cargar.
 */
export function loadWebData(name) {
  if (CACHE.has(name)) return CACHE.get(name);

  const promise = (() => {
    if (typeof fetch !== 'function') return Promise.resolve(null);
    /* `no-cache` y no `no-store`: en desarrollo (scripts/serve.py) el servidor ya
       manda no-store; en producción (GitHub Pages) el archivo es inmutable
       dentro de una versión del sitio, pero su nombre no lleva hash, así que
       conviene revalidar en vez de confiar en la caché heurística. */
    return fetch(`data/web/${name}.json`, { cache: 'no-cache' })
      .then((response) => (response.ok ? response.json() : null))
      .catch(() => null)
      .then((data) => (data && typeof data === 'object' ? data : null));
  })();

  CACHE.set(name, promise);
  return promise;
}
