/* viewport.js — el tamaño del lienzo, en un solo sitio.
 *
 * Lo consultan la escena 3D, la composición del hero, La Sala y las secciones
 * de D3. Vivía en main.js, pero no depende de nada de la escena y al menos
 * dos módulos de sección lo necesitan: es lo primero que había que separar.
 */

/* Basis de tamaño del layout: window.innerWidth/Height, como antes de la
   corrección de resize. visualViewport se usa SOLO como disparador de
   resize (barra URL/orientación), no como base de dimensiones: si se usara
   como base, la moneda y la puerta pasaban a renderizarse contra un
   viewport potencialmente más chico y quedaban mucho más pequeñas. */
export function getViewportSize() {
  /* En emulación móvil, innerWidth/innerHeight pueden incluir el viewport
     visual grande del navegador (p. ej. 332×590 para un lienzo CSS de
     320×568). El DOM y visualViewport son la referencia que realmente ve
     el lector; usarla evita que renderer.setSize() cree 12px de overflow. */
  const root = document.documentElement;
  const visual = window.visualViewport;
  return {
    width: Math.max(root?.clientWidth || visual?.width || window.innerWidth, 1),
    height: Math.max(root?.clientHeight || visual?.height || window.innerHeight, 1),
  };
}

export function isCompactWidth() {
  return getViewportSize().width <= 767;
}

/* ── La copia para el bucle de render ────────────────────────────────────
 *
 * `getViewportSize()` lee `clientWidth`/`clientHeight`, y eso es una lectura
 * de layout: si el estilo está sucio, el navegador recalcula estilo y layout
 * ANTES de responder. Dentro de `animate()` el estilo siempre está sucio
 * (se acaba de escribir el `transform` del halo), así que llamarla por frame
 * provocaba un reflujo forzado en cada frame.
 *
 * Medido con `npm run perf` (1440x900, recorrido completo de ida y vuelta):
 *   · 4.410 reflujos forzados y 2.074 ms de style+layout extra por pasada.
 *   · 1.886 ms de tiempo propio en esta función: el 10 % de todo el tiempo
 *     que el hilo principal estuvo ocupado, para leer dos números que solo
 *     cambian cuando el lector redimensiona la ventana.
 *
 * El tamaño del viewport no cambia solo: cambia con `resize`, con la
 * orientación y con la barra de URL en móvil. Esos tres eventos invalidan la
 * copia. El manejador de resize de `main.js` se registra DESPUÉS de que este
 * módulo se evalúe, así que cuando él lee el tamaño ya está refrescado.
 *
 * Quien necesite el valor vivo —el propio resize, los gráficos de D3 al
 * montarse— sigue llamando a `getViewportSize()`, que no ha cambiado.
 */
let snapshot = null;

export function getViewportSnapshot() {
  if (snapshot === null) snapshot = Object.freeze(getViewportSize());
  return snapshot;
}

export function invalidateViewportSnapshot() {
  snapshot = null;
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', invalidateViewportSnapshot);
  window.addEventListener('orientationchange', invalidateViewportSnapshot);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', invalidateViewportSnapshot);
}
