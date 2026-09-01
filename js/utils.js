/* utils.js — funciones puras compartidas.
 *
 * Sin DOM, sin THREE, sin estado global: lo que entra determina lo que sale.
 */


/* Layout reproducible: una nube de memoria no debería cambiar de forma en
   cada recarga. El pequeño jitter sigue siendo orgánico, pero está atado al
   índice del fragmento y no a Math.random(). */
export const particleRandom = (index, salt = 0) => {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/* Posición de una cita en el eje hawkish(+1)/dovish(−1).
 *
 * La comparten el mapa SVG de intervenciones y la nube de partículas: si
 * cada uno la calculase por su cuenta, el mismo acta acabaría en dos alturas
 * distintas según qué sección la dibuje. El jitter de las neutrales se
 * siembra con el contenido de la cita, no con Math.random(), para que una
 * recarga no mueva los puntos. */
export const getQuoteAxisSentiment = (q) => {
  const label = q?.label || 'neutral';
  const score = clamp(Number(q?.score) || 0.7, 0, 1);
  const seed = String(q?.date || '').length + String(q?.text || '').length;
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  const seeded = x - Math.floor(x);
  if (label === 'hawkish') return 0.30 + score * 0.40;
  if (label === 'dovish') return -(0.30 + score * 0.40);
  return (seeded - 0.5) * 0.18;
};
