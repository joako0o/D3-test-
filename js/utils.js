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
