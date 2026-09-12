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

/* frameDampT — factor de amortiguación exponencial INDEPENDIENTE DEL
   REFRESCO, para reemplazar el lerp por frame clásico.
 *
 * `x = lerp(x, target, coef)` en cada frame converge 2,4× más rápido en un
 * monitor de 144 Hz que en uno de 60 Hz: coef es una fracción POR FRAME,
 * no por tiempo (gamedev.net, "frame rate independent friction"). Aquí se
 * interpreta coef como "fracción cubierta en 16,67 ms (60 fps)" y se
 * re-deriva para el dt real:
 *     t = 1 − (1 − coef)^(dt/16,67)
 * Así la misma animación corre al mismo ritmo en 60/120/144 Hz… y en una
 * máquina que solo llega a 30 fps da pasos más grandes para ALCANZAR el
 * objetivo (se mantiene fluida al 50% de los fps) en vez de arrastrarse.
 * dt se limita a 100 ms: tras un stall (cambio de pestaña) se recupera a
 * ~6 frames por frame, sin teletransportarse. coef=1 salta directo
 * (reduced motion); coef=0 no mueve nada. */
export const frameDampT = (coef, dtMs) => {
  if (coef >= 1) return 1;
  if (coef <= 0) return 0;
  const dt = Math.min(dtMs, 100) / (1000 / 60);
  return 1 - Math.pow(1 - coef, dt);
};

/* frameDamp — lerp amortiguado con el dt real del frame (ver frameDampT). */
export const frameDamp = (current, target, coef, dtMs) =>
  current + (target - current) * frameDampT(coef, dtMs);
