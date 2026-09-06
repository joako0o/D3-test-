/* axes-map.js — "Mapa de intervenciones": el plano factual en D3.
 *
 * Sección de scrollytelling. Vive fuera de main.js porque su única relación
 * con la escena 3D pasa por `js/interaction-state.js` (qué cita está
 * señalada) y por las dos funciones del panel de cita, que llegan inyectadas.
 * No importa Three.js ni conoce la cámara.
 *
 * Las dependencias se declaran en la firma de init: quien la llame tiene que
 * dárselas. Nada de leer variables de otro archivo por la puerta de atrás.
 */
import { pinQuote, axesState, focusReturn } from '../interaction-state.js';
/* Misma URL (query incluida) que en main.js: con specifiers distintos el
   navegador instancia DOS módulos viewport.js, cada uno con su snapshot. */
import { getViewportSize } from '../viewport.js?v=2';
/* clamp llega de utils.js: se usaba THREE.MathUtils.clamp por costumbre, pero
   una sección de D3 no tiene por qué arrastrar Three.js para acotar un número. */
import { clamp, getQuoteAxisSentiment } from '../utils.js';

export function initD3Axes({ quotes, openQuote }) {
  const container = document.getElementById('d3-canvas');
  if (!container) return;
  container.innerHTML = '';

  const vp = getViewportSize();
  const width = vp.width;
  const height = vp.height;

  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('role', 'img')
    .attr('aria-label', 'Mapa de intervenciones: cada punto conserva su fecha, participante y fragmento')
    .style('position', 'absolute')
    .style('inset', '0');

  /* Más área vertical para que la diferencia entre tonos se lea como un
     mapa y no como una hilera de puntos. El eje cero permanece cerca del
     centro óptico de la pantalla. */
  const margin = {
    top: height * (width < 640 ? 0.34 : 0.28),
    right: width * 0.15,
    bottom: height * 0.18,
    left: width * 0.15,
  };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const xScale = d3.scaleTime()
    .domain([new Date(2000, 0, 1), new Date(2015, 11, 31)])
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([-1, 1])
    .range([margin.top + innerH, margin.top]);

  axesState.scales = { xScale, yScale };

  const axisY = margin.top + innerH / 2;
  const g = svg.append('g');

  /* Campo de lectura: una caja casi invisible, guías verticales y dos
     referencias horizontales. El marco da estructura al mapa sin quitarle
     aire ni hacerlo parecer un dashboard convencional. */
  g.append('rect')
    .attr('class', 'axes-plot-field')
    .attr('x', margin.left)
    .attr('y', margin.top)
    .attr('width', innerW)
    .attr('height', innerH)
    .attr('rx', Math.min(8, width * 0.01));

  const tickCount = width < 500 ? 4 : width < 900 ? 6 : 8;
  const gridLayer = g.append('g').attr('class', 'axes-grid');
  gridLayer.selectAll('.axes-grid-vertical')
    .data(xScale.ticks(tickCount))
    .join('line')
    .attr('class', 'axes-grid-vertical')
    .attr('x1', (date) => xScale(date)).attr('x2', (date) => xScale(date))
    .attr('y1', margin.top).attr('y2', margin.top + innerH);

  [-0.5, 0.5].forEach((value) => {
    g.append('line')
      .attr('class', 'axes-grid-guide')
      .attr('x1', margin.left).attr('x2', width - margin.right)
      .attr('y1', yScale(value)).attr('y2', yScale(value));
  });
  g.append('line')
    .attr('class', 'axes-zero-line')
    .attr('x1', margin.left).attr('x2', width - margin.right)
    .attr('y1', axisY).attr('y2', axisY);

  /* Puntos de dato nítidos en SVG. El enjambre 3D queda como atmósfera; este
     plano es la lectura precisa de las 99 intervenciones dentro del rango
     2000–2015 y el radio recupera el score de orientación. */
  const domainStart = new Date(2000, 0, 1).getTime();
  const domainEnd = new Date(2015, 11, 31).getTime();
  const axisQuotes = quotes
    .map((q, index) => ({ q, index, date: new Date(q.date) }))
    .filter(({ date }) => date.getTime() >= domainStart && date.getTime() <= domainEnd);
  const dataLayer = svg.append('g').attr('class', 'axes-data-layer');
  const dataPoints = dataLayer.selectAll('.axes-data-point')
    .data(axisQuotes, (d) => d.index)
    .join((enter) => {
      const group = enter.append('g').attr('class', 'axes-data-mark');
      /* Zona de toque invisible: el punto visible mide 6–10 px y en un
         teléfono un dedo no acierta. El círculo transparente recibe el
         evento sin cambiar el dibujo (pointer-events: all lo hace sensible
         aunque no tenga relleno). */
      group.append('circle').attr('class', 'axes-data-hit').attr('r', 14).attr('fill', 'transparent').attr('pointer-events', 'all');
      group.append('circle').attr('class', 'axes-data-halo');
      group.append('circle').attr('class', 'axes-data-point');
      return group;
    });

  dataPoints
    .attr('transform', ({ q, date }) => `translate(${xScale(date)}, ${yScale(getQuoteAxisSentiment(q))})`)
    .attr('data-quote-index', ({ index }) => index)
    .attr('class', ({ q }) => `axes-data-mark axes-data-mark--${q.label || 'neutral'}`)
    /* tabindex móvil ("roving"): ver el bloque de navegación por flechas más
       abajo. Solo UNA marca vale 0 en cada momento; el resto es -1, enfocable
       por script pero fuera del recorrido del tabulador. */
    .attr('tabindex', '-1')
    .attr('role', 'gridcell')
    .attr('aria-label', ({ q }) => `Abrir intervención ${q.label || 'neutral'} de ${q.participant || 'participante anónimo'}, ${q.formatted_date || q.date || q.year || 'fecha no especificada'}`)
    .on('keydown', (event, d) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      focusReturn.card = event.currentTarget;
      pinQuote(d.index);
      openQuote(d.index, { x: window.innerWidth * 0.55, y: window.innerHeight * 0.58 });
    })
    .on('click', (event, d) => {
      event.stopPropagation();
      focusReturn.card = event.currentTarget;
      pinQuote(d.index);
      openQuote(d.index, { x: event.clientX, y: event.clientY });
    })
    .each(function ({ q }) {
      const score = clamp(Number(q.score) || 0.7, 0, 1);
      const radius = 2.8 + score * 2.1;
      const mark = d3.select(this);
      mark.select('.axes-data-halo')
        .attr('r', radius * 1.9)
        .attr('class', `axes-data-halo axes-data-halo--${q.label || 'neutral'}`);
      mark.select('.axes-data-point')
        .attr('r', radius)
        .attr('class', `axes-data-point axes-data-point--${q.label || 'neutral'}`);
    });

  /* ── Navegación por teclado: una sola parada de tabulador ──────────────
     ANTES: cada marca llevaba tabindex="0". Con los 99 fragmentos de la
     maqueta ya eran 99 paradas; con el corpus real (182 reuniones y sus
     fragmentos) crece sin techo, y alcanzar lo que hay DESPUÉS del mapa
     costaría cientos de pulsaciones. Quitar el acceso por teclado no era
     opción: estas marcas son el equivalente deliberado de las partículas 3D,
     que si no solo responden al puntero.

     AHORA: el patrón "roving tabindex" de WAI-ARIA (el mismo de un grid o una
     barra de herramientas). El grupo entero es UNA parada; dentro se navega
     con flechas, y Inicio/Fin saltan al primer/último punto. Las marcas se
     ordenan por fecha, así que las flechas recorren el eje temporal en el
     orden en que se leen.

     `role="grid"` con una fila de `gridcell` es lo que le dice al lector de
     pantalla que aquí dentro se navega con flechas y no con tabulador. */
  const marks = () => dataLayer.selectAll('.axes-data-mark').nodes();
  let rovingIndex = 0;

  dataLayer
    .attr('role', 'grid')
    .attr('aria-label', `Puntos del mapa: ${axisQuotes.length} intervenciones ordenadas por fecha. Use las flechas para recorrerlas y Enter para abrir la que esté enfocada.`)
    .attr('aria-rowcount', 1)
    .attr('aria-colcount', axisQuotes.length);

  /* Un grid válido necesita una fila entre el grid y sus celdas. Se usa un <g>
     normal —no `display:contents`, que en SVG no es fiable— porque un grupo
     sin atributos de pintado no altera el dibujo: solo agrupa. */
  const rowGroup = dataLayer.append('g').attr('role', 'row');
  rowGroup.node().append(...marks());

  function setRoving(next, { focus = true } = {}) {
    const list = marks();
    if (!list.length) return;
    rovingIndex = clamp(next, 0, list.length - 1);
    list.forEach((node, i) => node.setAttribute('tabindex', i === rovingIndex ? '0' : '-1'));
    if (focus) list[rovingIndex].focus({ preventScroll: true });
  }
  setRoving(0, { focus: false });

  dataLayer.on('keydown', (event) => {
    const list = marks();
    if (!list.length) return;
    const current = list.indexOf(document.activeElement);
    if (current === -1) return;
    let next = null;
    switch (event.key) {
      case 'ArrowRight': case 'ArrowDown': next = current + 1; break;
      case 'ArrowLeft': case 'ArrowUp': next = current - 1; break;
      case 'Home': next = 0; break;
      case 'End': next = list.length - 1; break;
      /* Salto de 10 en 10: con cientos de puntos, recorrerlos de uno en uno
         para llegar al otro extremo del periodo no es navegación, es castigo. */
      case 'PageDown': next = current + 10; break;
      case 'PageUp': next = current - 10; break;
      default: return;
    }
    event.preventDefault();
    setRoving(next);
  });

  const xAxis = d3.axisBottom(xScale)
    .ticks(tickCount)
    .tickSizeOuter(0)
    .tickFormat(d3.timeFormat('%Y'));
  const xAxisGroup = g.append('g')
    .attr('class', 'axes-x-axis')
    .attr('transform', `translate(0, ${axisY})`)
    .call(xAxis);
  xAxisGroup.selectAll('text')
    .attr('dy', '1.55em')
    .style('fill', 'rgba(255,255,255,0.48)')
    .style('font-family', 'var(--font-body)')
    .style('font-size', width < 500 ? '10px' : '12px')
    .style('letter-spacing', '0.2px');
  xAxisGroup.selectAll('.domain, .tick line')
    .style('stroke', 'rgba(255,255,255,0.13)');

  /* Etiquetas de tono en el eje Y — el copy de la sección lo promete
     ("arriba restrictivo, abajo expansivo") y ahora se apoyan en el marco
     del plano, no flotan separadas del gráfico. */
  const narrowAxes = width < 640;
  const toneX = narrowAxes ? 10 : margin.left - 16;
  const toneAnchor = narrowAxes ? 'start' : 'end';
  svg.append('text')
    .attr('x', toneX).attr('y', margin.top - 12)
    .attr('text-anchor', toneAnchor)
    .style('fill', 'rgba(255,215,106,0.82)').style('font-size', width < 500 ? '11px' : '13px')
    .style('letter-spacing', '2px').style('text-transform', 'uppercase')
    .text('Hawkish ↑');
  svg.append('text')
    .attr('x', toneX).attr('y', margin.top + innerH + 20)
    .attr('text-anchor', toneAnchor)
    .style('fill', 'rgba(138,180,248,0.82)').style('font-size', width < 500 ? '11px' : '13px')
    .style('letter-spacing', '2px').style('text-transform', 'uppercase')
    .text('Dovish ↓');

  return axesState.scales;
}
