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
