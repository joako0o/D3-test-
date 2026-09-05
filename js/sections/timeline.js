/* timeline.js — "Índice exploratorio de orientación por año".
 *
 * Sección autocontenida: DOM + D3 + GSAP. No toca la escena 3D. Se construye
 * de forma perezosa (al entrar en la sección) y se reconstruye al
 * redimensionar, porque el SVG se dimensiona a mano.
 *
 * Todo lo que antes eran efectos de nivel de módulo (el tween del título, los
 * tres ScrollTrigger y el listener de resize) vive ahora dentro de
 * initTimeline(): un módulo no debería hacer nada por el mero hecho de
 * importarse.
 */
/* Misma URL (query incluida) que en main.js: con specifiers distintos el
   navegador instancia DOS módulos viewport.js, cada uno con su snapshot. */
import { getViewportSize } from '../viewport.js?v=2';

let quotes = [];

export function initTimeline(quotesData = []) {
  quotes = quotesData;

  /* ────────────────────────────────
     Stage 5 — Timeline (D3, lazy)
  ──────────────────────────────── */
  const timelineTitle = document.querySelector('[data-timeline-title]');
  gsap.fromTo(timelineTitle,
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: 'cinematicOut',
      scrollTrigger: { trigger: timelineTitle, start: 'top 80%', toggleActions: 'play none none reverse' }
    }
  );

  let timelineBuilt = false;
  let timelinePath, timelineTotalLen;

  function buildTimeline() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;

    if (timelineBuilt) {
      d3.select(container).selectAll('*').remove();
    }
    timelineBuilt = true;
    const vp = getViewportSize();
    const shortViewport = vp.height < 620;
    const width = Math.min(1060, vp.width - 40);
    /* El SVG también forma parte del layout: 320px + el título no cabe en
       un móvil en paisaje de 390px de alto y el encabezado quedaba cortado.
       Se dibuja una versión más compacta solo en viewports bajos. */
    const height = shortViewport
      ? Math.max(230, Math.min(300, vp.height - 132))
      : 320;
    const margin = shortViewport
      ? { top: 24, right: 18, bottom: 44, left: 42 }
      : { top: 40, right: 30, bottom: 60, left: 50 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('role', 'img')
      .attr('aria-label', 'Índice exploratorio de orientación por año, agregado desde los fragmentos visibles')
      .attr('aria-describedby', 'timelineNote')
      .style('max-width', '100%')
      .style('height', 'auto');

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    /* El índice se agrega desde los registros visibles de quotes.js.
       Convención explícita: (hawkish − dovish) / total de fragmentos del año;
       neutral no desplaza el índice, pero sí permanece en el denominador. */
    const years = d3.range(2000, 2016);
    const byYear = new Map(years.map((year) => [year, { year, hawkish: 0, dovish: 0, neutral: 0, total: 0 }]));
    const sourceYear = (q) => {
      const match = String(q.date || '').match(/^(\d{4})/);
      return match ? Number(match[1]) : Number(q.year);
    };
    quotes.forEach((q) => {
      const year = sourceYear(q);
      const bucket = byYear.get(year);
      if (!bucket) return;
      const tone = ['hawkish', 'dovish', 'neutral'].includes(q.label) ? q.label : 'neutral';
      bucket[tone] += 1;
      bucket.total += 1;
    });
    const timelineData = years
      .filter((year) => byYear.get(year).total > 0)
      .map((year) => {
        const bucket = byYear.get(year);
        return {
          ...bucket,
          date: new Date(year, 6, 1),
          value: (bucket.hawkish - bucket.dovish) / bucket.total,
          hasSample: true,
        };
      });
    const missingYears = years.filter((year) => byYear.get(year).total === 0);
    const formatYearRanges = (items) => {
      const ranges = [];
      items.forEach((year) => {
        const last = ranges[ranges.length - 1];
        if (last && year === last[1] + 1) last[1] = year;
        else ranges.push([year, year]);
      });
      return ranges.map(([from, to]) => from === to ? String(from) : `${from}–${to}`).join(', ');
    };
    const domainStart = new Date(2000, 0, 1);
    const domainEnd = new Date(2015, 11, 31);
    const x = d3.scaleTime().domain([domainStart, domainEnd]).range([0, innerW]);
    const y = d3.scaleLinear().domain([-1, 1]).range([innerH, 0]);

    g.append('g')
      .attr('transform', `translate(0,${innerH})`)
              .call(d3.axisBottom(x)
        /* Un año cada 2 son 8 rótulos de 4 cifras: en 300 px de eje se
           pisaban ("20002002200420062008…"). En estrecho, cada 4 años. */
        .ticks(d3.timeYear.every(width < 520 ? 4 : 2))
        .tickFormat(d3.timeFormat('%Y')))
      .selectAll('text').style('fill', '#e8ecf5').style('font-size', 'clamp(14px, 1.25vw, 16px)');
    g.selectAll('.domain, .tick line').style('stroke', 'rgba(255,255,255,0.12)');

    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => d > 0 ? `+${d}` : d))
      .selectAll('text').style('fill', '#e8ecf5').style('font-size', 'clamp(14px, 1.25vw, 16px)');
    g.selectAll('.domain').style('stroke', 'none');
    g.selectAll('.tick line').style('stroke', 'rgba(255,255,255,0.06)');

    g.append('line')
      .attr('x1', 0).attr('x2', innerW)
      .attr('y1', y(0)).attr('y2', y(0))
      .style('stroke', 'rgba(255,255,255,0.15)')
      .style('stroke-dasharray', '4,4');

    const gradient = svg.append('defs').append('linearGradient')
      .attr('id', 'lineGrad').attr('x1', '0%').attr('x2', '100%');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#8ab4f8');
    gradient.append('stop').attr('offset', '50%').attr('stop-color', '#ffd76a');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#8ab4f8');

    const fullTimeline = years.map((year) => byYear.get(year).total > 0
      ? timelineData.find((item) => item.year === year)
      : { year, date: new Date(year, 6, 1), value: null, hasSample: false });
    const line = d3.line()
      .defined((d) => d.hasSample)
      .x(d => x(d.date))
      .y(d => y(d.value))
      .curve(d3.curveLinear);

    timelinePath = g.append('path')
      .datum(fullTimeline)
      .attr('fill', 'none')
      .attr('stroke', 'url(#lineGrad)')
      .attr('stroke-width', 2.5)
      .attr('d', line);

    timelineTotalLen = timelinePath.node().getTotalLength();
    timelinePath
      .attr('stroke-dasharray', timelineTotalLen)
      .attr('stroke-dashoffset', timelineTotalLen);

    const toneColor = (d) => d.value > 0 ? '#ffd76a' : d.value < 0 ? '#8ab4f8' : '#cfd6e4';
    const points = g.append('g').attr('class', 'timeline-points')
      .selectAll('circle')
      .data(timelineData)
      .enter()
      .append('circle')
      .attr('class', 'timeline-point')
      .attr('cx', d => x(d.date))
      .attr('cy', d => y(d.value))
      .attr('r', 4)
      .style('fill', toneColor)
      .style('stroke', '#0a0e1a')
      .style('stroke-width', 2)
      .style('opacity', 0.95);
    points.append('title').text((d) => `${d.year}: índice ${d.value >= 0 ? '+' : ''}${d.value.toFixed(2)} · ${d.total} fragmentos (H ${d.hawkish} / D ${d.dovish} / N ${d.neutral})`);

    g.append('text')
      .attr('class', 'timeline-direction timeline-direction--high')
      .attr('x', 0).attr('y', 11)
      .text('hawkish +');
    g.append('text')
      .attr('class', 'timeline-direction timeline-direction--low')
      .attr('x', 0).attr('y', innerH - 8)
      .text('dovish −');

    if (missingYears.length) {
      const absence = g.append('g').attr('class', 'timeline-absence');
      absence.selectAll('line')
        .data(missingYears)
        .enter()
        .append('line')
        .attr('x1', year => x(new Date(year, 6, 1)))
        .attr('x2', year => x(new Date(year, 6, 1)))
        .attr('y1', innerH - 3).attr('y2', innerH + 8);
      absence.append('text')
        .attr('x', d3.mean(missingYears, year => x(new Date(year, 6, 1))))
        .attr('y', innerH + 36)
        .attr('text-anchor', 'middle')
        .text(`sin muestra: ${formatYearRanges(missingYears)}`);
    }

    /* Eventos macro importantes */
    const events = [
      { date: new Date(2008, 8), label: 'Crisis financiera externa' },
    ];
    const evG = g.selectAll('.ev').data(events).enter().append('g').attr('class', 'ev');
    evG.append('line')
      .attr('x1', d => x(d.date)).attr('x2', d => x(d.date))
      .attr('y1', 0).attr('y2', innerH)
      .style('stroke', 'rgba(255,215,106,0.25)')
      .style('stroke-dasharray', '3,3');
    evG.append('text')
      .attr('x', d => x(d.date))
      .attr('y', -8)
      .attr('text-anchor', 'middle')
      .style('font-size', 'clamp(14px, 1.25vw, 16px)')
      .style('fill', '#ffd76a')
      .style('opacity', 0.7)
      .text(d => d.label);

    gsap.to(container, { opacity: 1, duration: 0.3 });
  }

  ScrollTrigger.create({
    trigger: '#stageTimeline',
    start: 'top 80%',
    onEnter: buildTimeline,
    onEnterBack: buildTimeline,
  });

  let timelineResizeT;
  window.addEventListener('resize', () => {
    clearTimeout(timelineResizeT);
    timelineResizeT = setTimeout(() => {
      if (timelineBuilt) buildTimeline();
    }, 200);
  });

  ScrollTrigger.create({
    trigger: '#stageTimeline',
    start: 'top top',
    end: '+=120%',
    pin: '.timeline-pin-wrapper',
    scrub: 1,
    onUpdate: (self) => {
      if (timelinePath) {
        timelinePath.attr('stroke-dashoffset', timelineTotalLen * (1 - self.progress));
      }
    },
  });
}
