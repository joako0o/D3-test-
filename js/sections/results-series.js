/* results-series.js — "La tasa y la sala", en un solo gráfico.
 *
 * QUÉ MUESTRA
 *   Las 132 reuniones de 2005 a 2015, en un solo plano con dos capas:
 *     · el TERRENO: la Tasa de Política Monetaria como escalón, de 0,50% a
 *       8,25%, dibujada de fondo con su propia escala a la derecha;
 *     · el TONO de cada deliberación: un punto por reunión, ubicado por el
 *       promedio de los puntajes de sus intervenciones, con la escala a la
 *       izquierda.
 *   Las dos series comparten el eje del tiempo, que es lo que permite leer la
 *   historia en un solo golpe: cuando la tasa cae 675 puntos base en 2009, el
 *   tono se derrumba con ella.
 *
 * POR QUÉ DOS ESCALAS Y NO DOS CARRILES
 *   Dos carriles apilados serían más fáciles de dibujar y más honestos con las
 *   unidades (porcentaje y puntaje no son lo mismo), pero obligan a comparar
 *   mirando arriba y abajo. Acá la decisión de tasa es el SUELO sobre el que se
 *   lee la deliberación: el terreno va detrás, más apagado, y los puntos
 *   delante. Cada eje está rotulado y las dos series tienen color propio, que es
 *   lo que evita el malentendido clásico del doble eje.
 *
 * CÓMO SE REVELA
 *   En dos tiempos, siguiendo lo que la investigación de scrollytelling repite
 *   (un mismo gráfico que se actualiza con el scroll, no una sucesión de
 *   gráficos): primero aparece el tono, y cuando el lector ya lo tiene, entra el
 *   terreno de la tasa por detrás. Así el segundo dato explica al primero en vez
 *   de competir con él.
 *
 * DE DÓNDE SALEN LOS DATOS
 *   `data/web/resultados.json`: `actas[].score_hd` (tono por reunión) y
 *   `actas[].decision.tpm` (tasa objetivo). La serie de tasa está completa: las
 *   132 reuniones tienen su TPM registrada.
 */
import { pinQuote, focusReturn } from '../core/interaction-state.js';
import { getViewportSize } from '../core/viewport.js?v=2';

const MES_CORTO = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fmtFecha = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  return `${d} ${MES_CORTO[m - 1]} ${a}`;
};
const fmtTono = (v) => `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(2).replace('.', ',')}`;
const fmtTasa = (v) => `${v.toFixed(2).replace('.', ',')}%`;

export function initResultsSeries({ data, openQuote }) {
  const cont = document.getElementById('resultsSeriesChart');
  const lectura = document.getElementById('resultsSeriesReadout');
  if (!cont || !lectura || !data?.actas?.length || !window.d3) return;

  const d3 = window.d3;
  const vp = getViewportSize();
  const compacto = vp.width < 700;

  /* Las reuniones con tono y con tasa. Las cuatro actas sin ninguna intervención
     direccional tienen tono igual (su promedio es 0): se dibujan, porque su
     decisión de tasa es un dato real, y se distinguen con el punto hueco. */
  const actas = data.actas
    .filter((a) => typeof a.score_hd === 'number' && a.decision && typeof a.decision.tpm === 'number')
    .map((a) => ({ ...a, t: new Date(`${a.fecha}T00:00:00Z`), sinSenal: a.h + a.d === 0 }));

  const puente = data.puente_muestra?.por_acta || {};
  const abrible = (a) => Array.isArray(puente[a.id]?.indices) && puente[a.id].indices.length > 0;

  const COLOR = { subir: 'var(--color-gold)', mantener: 'rgba(223,229,240,0.92)', bajar: 'var(--color-dovish)' };
  const TINTA = { subir: '#ffd76a', mantener: '#cfd6e4', bajar: '#8ab4f8' };

  // ── Geometría ──────────────────────────────────────────────────────────
  const ancho = Math.max(320, cont.clientWidth || 900);
  const alto = compacto ? 300 : 400;
  const margen = {
    top: compacto ? 28 : 34,
    right: compacto ? 40 : 56,
    bottom: compacto ? 34 : 42,
    left: compacto ? 40 : 56,
  };
  const innerH = alto - margen.top - margen.bottom;

  const x = d3.scaleTime()
    .domain(d3.extent(actas, (a) => a.t))
    .range([margen.left, ancho - margen.right]);

  const tonos = actas.map((a) => a.score_hd);
  const tonoMax = Math.max(0.25, Math.ceil(Math.max(...tonos.map(Math.abs)) * 20) / 20);
  /* El tono ocupa la parte de arriba y la tasa la de abajo: así el terreno no
     tapa los puntos ni al revés. Cada capa tiene su banda. */
  const techoTono = margen.top + innerH * 0.58;
  const yTono = d3.scaleLinear().domain([-tonoMax, tonoMax]).range([techoTono, margen.top]);
  /* El techo del terreno (8,25%) queda por debajo de los puntos más hawkish,
     así que las dos capas no se pisan. Antes la escala llegaba hasta el borde
     superior y el escalón de 8,25% cruzaba por encima del carril del tono. */
  const yTasa = d3.scaleLinear().domain([0, 10.5]).range([margen.top + innerH, margen.top + innerH * 0.42]);

  const svg = d3.select(cont).append('svg')
    .attr('viewBox', `0 0 ${ancho} ${alto}`)
    .attr('role', 'img')
    .attr('aria-label',
      `La tasa de política monetaria y el tono de la deliberación en las ${actas.length} reuniones de 2005 a 2015. `
      + 'La tasa sube hasta 8,25% en 2008 y cae a 0,50% en 2009; el tono de las actas sigue el mismo movimiento.')
    .style('width', '100%')
    .style('height', 'auto');

  const capaTasa = svg.append('g').attr('class', 'series-rate');
  const capaTono = svg.append('g').attr('class', 'series-tone');

  // ── CAPA 1: el terreno de la tasa ──────────────────────────────────────
  const paso = d3.line()
    .x((a) => x(a.t))
    .y((a) => yTasa(a.decision.tpm))
    .curve(d3.curveStepAfter);
  const area = d3.area()
    .x((a) => x(a.t))
    .y0(margen.top + innerH)
    .y1((a) => yTasa(a.decision.tpm))
    .curve(d3.curveStepAfter);

  capaTasa.append('path')
    .datum(actas)
    .attr('class', 'series-rate-fill')
    .attr('d', area);
  capaTasa.append('path')
    .datum(actas)
    .attr('class', 'series-rate-line')
    .attr('d', paso);

  // Rótulos de la tasa: solo los cuatro que importan para leer la escala.
  /* Los rótulos van FUERA del área de datos. Dentro se pisaban con los puntos
     del tono (medido en la captura: el 8%, el 6% y el 4% quedaban detrás de
     nubes de puntos) y el lector no distinguía si eran valores del terreno o
     parte del dato. */
  [2, 4, 6, 8].forEach((v) => {
    capaTasa.append('text')
      .attr('class', 'series-rate-tick')
      .attr('x', ancho - margen.right + 7)
      .attr('y', yTasa(v) + 4)
      .text(`${v}%`);
  });
  const pico = actas.reduce((m, a) => (a.decision.tpm > m.decision.tpm ? a : m), actas[0]);
  const piso = actas.reduce((m, a) => (a.decision.tpm < m.decision.tpm ? a : m), actas[0]);
  capaTasa.append('text')
    .attr('class', 'series-rate-mark')
    .attr('x', x(pico.t))
    .attr('y', yTasa(pico.decision.tpm) - 10)
    .attr('text-anchor', 'middle')
    .text(`el techo: ${fmtTasa(pico.decision.tpm)}`);
  capaTasa.append('text')
    .attr('class', 'series-rate-mark')
    .attr('x', x(piso.t))
    .attr('y', yTasa(piso.decision.tpm) + 16)
    .attr('text-anchor', 'start')
    .text(`el piso: ${fmtTasa(piso.decision.tpm)}`);

  // ── CAPA 2: el tono ────────────────────────────────────────────────────
  capaTono.append('line')
    .attr('class', 'series-zero')
    .attr('x1', margen.left).attr('x2', ancho - margen.right)
    .attr('y1', yTono(0)).attr('y2', yTono(0));

  capaTono.append('text')
    .attr('class', 'series-zero-label')
    .attr('x', margen.left - 6).attr('y', yTono(0) + 4)
    .attr('text-anchor', 'end')
    .text('0');

  const puntos = [];
  actas.forEach((a) => {
    const g = capaTono.append('g')
      .attr('class', `series-dot${abrible(a) ? ' series-dot--leible' : ''}`)
      .attr('data-acta', a.id)
      .attr('transform', `translate(${x(a.t)}, ${yTono(a.score_hd)})`);
    g.append('circle').attr('class', 'series-dot-hit').attr('r', 10).attr('fill', 'transparent').attr('pointer-events', 'all');
    g.append('circle')
      .attr('class', 'series-dot-mark')
      .attr('r', compacto ? 2.8 : 3.2)
      .attr('fill', a.sinSenal ? 'none' : COLOR[a.decision.accion])
      .attr('stroke', a.sinSenal ? 'rgba(255,255,255,0.35)' : (abrible(a) ? 'rgba(255,255,255,0.5)' : 'none'))
      .attr('stroke-width', a.sinSenal ? 1 : abrible(a) ? 1 : 0);
    puntos.push({ grupo: g, acta: a });
  });

  // ── Ejes ───────────────────────────────────────────────────────────────
  const yEje = margen.top + innerH;
  const anios = d3.timeYear.range(new Date(Date.UTC(2005, 0, 1)), new Date(Date.UTC(2016, 0, 1)));
  svg.append('g').attr('class', 'series-axis')
    .selectAll('text')
    .data(anios)
    .join('text')
    .attr('x', (d) => x(d))
    .attr('y', yEje + 20)
    .attr('text-anchor', 'middle')
    .text((d) => (compacto ? String(d.getUTCFullYear()).slice(2) : String(d.getUTCFullYear())));

  svg.append('text')
    .attr('class', 'series-axis-title')
    .attr('x', margen.left - 6).attr('y', margen.top - 12)
    .attr('text-anchor', 'end')
    .text('tono');
  svg.append('text')
    .attr('class', 'series-axis-title')
    .attr('x', ancho - margen.right + 8).attr('y', margen.top - 12)
    .text('tasa');

  // ── Lectura ────────────────────────────────────────────────────────────
  let seleccionada = null;
  const mostrar = (a) => {
    seleccionada = a.id;
    const tiene = abrible(a);
    const indice = tiene ? puente[a.id].indices[0] : -1;
    lectura.innerHTML = '';
    const f = document.createElement('span');
    f.className = 'results-readout-fecha';
    f.textContent = fmtFecha(a.fecha);
    const d = document.createElement('span');
    d.className = 'results-readout-decision';
    d.style.color = TINTA[a.decision.accion];
    d.textContent = `${a.decision.accion === 'subir' ? 'subió' : a.decision.accion === 'bajar' ? 'bajó' : 'mantuvo'} la tasa en ${fmtTasa(a.decision.tpm)} · tono ${fmtTono(a.score_hd)}`;
    lectura.append(f, d);
    if (tiene) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'results-readout-open';
      b.textContent = 'Leer una intervención de esa reunión ↗';
      b.addEventListener('click', () => {
        focusReturn.card = b;
        pinQuote(indice);
        openQuote(indice, { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 });
      });
      lectura.appendChild(b);
    }
    puntos.forEach(({ grupo, acta }) => grupo.classed('is-active', acta.id === seleccionada));
  };

  puntos.forEach(({ grupo, acta }) => {
    grupo.on('click', () => mostrar(acta));
  });
  // Estado inicial: la reunión del piso de tasa, que es el momento que el
  // gráfico cuenta (el tono más dovish del corpus).
  const inicial = piso && abrible(piso) ? piso : actas.find(abrible) || actas[0];
  mostrar(inicial);

  // ── Revelado en dos tiempos ────────────────────────────────────────────
  /* Primero el tono (los puntos), después el terreno de la tasa. Si el lector
     prefiere no ver animaciones, `prefers-reduced-motion` deja las dos capas
     puestas desde el arranque (el CSS las neutraliza). */
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  if (!reduce) {
    gsap.set(capaTasa.node(), { opacity: 0 });
    gsap.set(puntos.map((p) => p.grupo.node()), { opacity: 0, scale: 0.4, transformOrigin: 'center' });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '#stageResultsSeries', start: 'top 62%', end: 'top 8%', scrub: 0.6 },
    });
    tl.to(puntos.map((p) => p.grupo.node()), { opacity: 1, scale: 1, duration: 1, stagger: 0.05, ease: 'none' })
      .to(capaTasa.node(), { opacity: 1, duration: 1.4, ease: 'none' }, '-=0.35');
  }
}
