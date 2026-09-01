/* act-browser.js — "De la señal a la fuente": navegador por acta.
 *
 * Sección de scrollytelling. Vive fuera de main.js porque su única relación
 * con la escena 3D pasa por `js/interaction-state.js` (qué cita está
 * señalada) y por las dos funciones del panel de cita, que llegan inyectadas.
 * No importa Three.js ni conoce la cámara.
 *
 * Las dependencias se declaran en la firma de init: quien la llame tiene que
 * dárselas. Nada de leer variables de otro archivo por la puerta de atrás.
 */
import { pinQuote } from '../interaction-state.js';
import { normalizeTopicText } from '../topics.js';

export function initActBrowser({ quotes, openQuote }) {
  const list = document.getElementById('actsList');
  const meta = document.getElementById('actsIndexMeta');
  const yearFilter = document.getElementById('actYearFilter');
  const dateEl = document.getElementById('actDate');
  const dateSubEl = document.getElementById('actDateSub');
  const eraEl = document.getElementById('actEra');
  const signalNameEl = document.getElementById('actSignalName');
  const signalCountEl = document.getElementById('actSignalCount');
  const signalExplanationEl = document.getElementById('actSignalExplanation');
  const participantsEl = document.getElementById('actParticipants');
  const termNetwork = document.getElementById('actTermNetwork');
  const termList = document.getElementById('actTermList');
  const evidenceList = document.getElementById('actEvidenceList');
  const evidenceMeta = document.getElementById('actEvidenceMeta');
  const evidenceQuote = document.getElementById('actEvidenceQuote');
  const evidenceCitation = document.getElementById('actEvidenceCitation');
  const openEvidence = document.getElementById('actOpenEvidence');
  const browser = document.getElementById('actsBrowser');
  const intro = document.querySelector('.acts-intro');
  if (!list || !meta || !yearFilter || !dateEl || !dateSubEl || !eraEl || !signalNameEl || !signalCountEl || !signalExplanationEl || !participantsEl || !termNetwork || !termList || !evidenceList || !evidenceMeta || !evidenceQuote || !evidenceCitation || !openEvidence || !browser || !intro || !quotes.length) return;

  const termDictionary = [
    { key: 'inflacion', label: 'inflación' },
    { key: 'precios', label: 'precios' },
    { key: 'expectativas', label: 'expectativas' },
    { key: 'tasa', label: 'tasa' },
    { key: 'tasas', label: 'tasas' },
    { key: 'aumento', label: 'aumento' },
    { key: 'alza', label: 'alza' },
    { key: 'subir', label: 'subir' },
    { key: 'mantener', label: 'mantener' },
    { key: 'bajar', label: 'bajar' },
    { key: 'riesgo', label: 'riesgo' },
    { key: 'crecimiento', label: 'crecimiento' },
    { key: 'actividad', label: 'actividad' },
    { key: 'demanda', label: 'demanda' },
    { key: 'producto', label: 'producto' },
    { key: 'contexto', label: 'contexto' },
    { key: 'escenario', label: 'escenario' },
    { key: 'internacional', label: 'internacional' },
    { key: 'mercado', label: 'mercado' },
    { key: 'mercados', label: 'mercados' },
    { key: 'petróleo', label: 'petróleo' },
    { key: 'cobre', label: 'cobre' },
    { key: 'energía', label: 'energía' },
    { key: 'alimentos', label: 'alimentos' },
    { key: 'empleo', label: 'empleo' },
    { key: 'salarios', label: 'salarios' },
    { key: 'gasto', label: 'gasto' },
    { key: 'presupuesto', label: 'presupuesto' },
    { key: 'déficit', label: 'déficit' },
    { key: 'consumo', label: 'consumo' },
    { key: 'inversión', label: 'inversión' },
  ].map((term) => ({ ...term, normalized: normalizeTopicText(term.key) }));

  const eras = [
    { id: 'E1', name: 'Despegue', from: 2000, to: 2003 },
    { id: 'E2', name: 'Fiebre', from: 2004, to: 2007 },
    { id: 'E3', name: 'Crisis', from: 2008, to: 2009 },
    { id: 'E4', name: 'Normalización', from: 2010, to: 2014 },
    { id: 'E5', name: 'Giro', from: 2015, to: 2015 },
  ];
  const svgNS = 'http://www.w3.org/2000/svg';
  const makeSvg = (tag, attrs = {}) => {
    const node = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    return node;
  };
  const sourceYear = (q) => {
    const dateYear = String(q.date || '').match(/^(\d{4})/);
    return dateYear ? Number(dateYear[1]) : Number(q.year);
  };
  const formatDate = (date, year) => {
    const parsed = date && /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? new Date(`${date}T00:00:00Z`)
      : null;
    if (!parsed || Number.isNaN(parsed.getTime())) return year ? `Año ${year}` : 'Fecha no especificada';
    return new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(parsed);
  };
  const compactViewport = () => window.matchMedia && window.matchMedia('(max-width: 430px)').matches;
  const formatReaderDate = (date, year) => {
    if (!compactViewport()) return formatDate(date, year);
    const parsed = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00Z`) : null;
    if (!parsed || Number.isNaN(parsed.getTime())) return formatDate(date, year);
    const parts = new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).formatToParts(parsed);
    const values = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]));
    return `${values.day} ${values.month} ${values.year}`;
  };
  const formatListDate = (date, year) => compactViewport() ? formatReaderDate(date, year) : formatDate(date, year);
  const getEra = (year) => eras.find((era) => year >= era.from && year <= era.to) || { id: '—', name: 'fuera de período' };
  const getTerms = (row) => termDictionary.filter((term) => row.normalizedText.includes(term.normalized));
  const getTone = (q) => ['hawkish', 'dovish', 'neutral'].includes(q.label) ? q.label : 'neutral';
  const toneText = { hawkish: 'Hawkish', dovish: 'Dovish', neutral: 'Neutral', mixed: 'Mixta' };
  const toneDetail = { hawkish: 'restrictiva', dovish: 'expansiva', neutral: 'sin orientación dominante' };

  const grouped = new Map();
  let excludedRows = 0;
  quotes.forEach((q, index) => {
    const year = sourceYear(q);
    /* El navegador respeta el período declarado de la pieza. El registro
       1985 del fixture queda contabilizado como fuera de período, no
       mezclado silenciosamente con las actas 2000–2015. */
    if (!Number.isFinite(year) || year < 2000 || year > 2015) {
      excludedRows += 1;
      return;
    }
    const date = /^\d{4}-\d{2}-\d{2}$/.test(String(q.date || '')) ? q.date : `${year}-01-01`;
    if (!grouped.has(date)) grouped.set(date, []);
    grouped.get(date).push({ q, index, normalizedText: normalizeTopicText(q.text) });
  });

  const acts = [...grouped.entries()].map(([date, rows]) => {
    const year = sourceYear(rows[0].q);
    const toneCounts = { hawkish: 0, dovish: 0, neutral: 0 };
    const participantSet = new Set();
    const termCounts = new Map();
    rows.forEach((row) => {
      const tone = getTone(row.q);
      toneCounts[tone] += 1;
      participantSet.add(row.q.participant || 'Participante anónimo');
      getTerms(row).forEach((term) => termCounts.set(term.normalized, {
        label: term.label,
        count: (termCounts.get(term.normalized)?.count || 0) + 1,
      }));
    });
    const activeTones = Object.entries(toneCounts).filter(([, count]) => count > 0).sort((a, b) => b[1] - a[1]);
    const dominantTone = activeTones.length > 1 && activeTones[0][1] === activeTones[1][1]
      ? 'mixed'
      : (activeTones[0]?.[0] || 'neutral');
    return {
      id: date,
      date,
      year,
      rows,
      count: rows.length,
      participants: [...participantSet],
      toneCounts,
      dominantTone,
      terms: [...termCounts.entries()].map(([key, item]) => ({ key, ...item })).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'es')),
    };
  }).sort((a, b) => a.date.localeCompare(b.date));

  if (!acts.length) return;
  meta.textContent = `Muestra visible: ${acts.length} actas · ${acts.reduce((total, act) => total + act.count, 0)} fragmentos${excludedRows ? ` · ${excludedRows} fuera del período` : ''}`;
  [...new Set(acts.map((act) => act.year))].sort((a, b) => a - b).forEach((year) => {
    const option = document.createElement('option');
    option.value = String(year);
    option.textContent = year;
    yearFilter.appendChild(option);
  });

  let activeAct = null;
  let activeRowIndex = 0;
  let activeTermKey = null;
  const listItems = [];

  const renderNetwork = (row) => {
    termNetwork.innerHTML = '';
    const terms = row ? getTerms(row).slice(0, 4) : [];
    const tone = row ? getTone(row.q) : 'neutral';
    const signalX = 48;
    const signalY = 43;
    const termStart = 125;
    const termEnd = 492;
    const step = terms.length > 1 ? (termEnd - termStart) / (terms.length - 1) : 0;
    termNetwork.appendChild(makeSvg('text', { class: 'act-network-caption', x: signalX, y: 12, 'text-anchor': 'middle' })).textContent = 'SEÑAL';
    termNetwork.appendChild(makeSvg('circle', { class: `act-network-signal ${tone}`, cx: signalX, cy: signalY, r: 22 }));
    const signalText = makeSvg('text', { class: 'act-network-caption', x: signalX, y: signalY + 3, 'text-anchor': 'middle' });
    signalText.textContent = toneText[tone].toUpperCase();
    termNetwork.appendChild(signalText);
    if (!terms.length) {
      const emptyText = makeSvg('text', { class: 'act-network-term', x: 108, y: signalY + 4 });
      emptyText.textContent = 'sin término de la taxonomía visible en este fragmento';
      termNetwork.appendChild(emptyText);
      termNetwork.setAttribute('aria-label', `La etiqueta ${toneText[tone]} no tiene términos de la taxonomía visible en este fragmento`);
      return;
    }
    terms.forEach((term, index) => {
      const x = terms.length === 1 ? 280 : termStart + step * index;
      const y = index % 2 === 0 ? 29 : 65;
      termNetwork.appendChild(makeSvg('line', { class: 'act-network-link', x1: signalX + 22, y1: signalY, x2: x - 8, y2: y - 3 }));
      termNetwork.appendChild(makeSvg('circle', { class: 'act-network-signal', cx: x - 8, cy: y - 3, r: 3.5 }));
      const label = makeSvg('text', { class: 'act-network-term', x, y, 'text-anchor': 'middle' });
      label.textContent = term.label;
      termNetwork.appendChild(label);
    });
    termNetwork.setAttribute('aria-label', `${toneText[tone]} conectada con ${terms.map((term) => term.label).join(', ')}`);
  };

  const renderEvidence = (act, rowIndex, termKey = null) => {
    if (!act?.rows.length) return;
    activeAct = act;
    activeRowIndex = Math.max(0, Math.min(rowIndex, act.rows.length - 1));
    activeTermKey = termKey;
    const row = act.rows[activeRowIndex];
    const terms = getTerms(row);
    const tone = getTone(row.q);
    const termNames = terms.slice(0, compactViewport() ? 3 : 5).map((term) => term.label);
    const termPhrase = termNames.length ? `«${termNames.join('», «')}»` : 'ningún término de la taxonomía visible';
    signalExplanationEl.textContent = compactViewport()
      ? `${termPhrase} acompañan la etiqueta ${toneText[tone]} (${toneDetail[tone]}).`
      : `Este fragmento reúne ${termPhrase}; en esta lectura exploratoria, esa evidencia léxica acompaña la etiqueta ${toneText[tone]} (${toneDetail[tone]}).`;
    renderNetwork(row);
    [...evidenceList.querySelectorAll('.act-evidence-row')].forEach((button) => {
      button.setAttribute('aria-current', String(Number(button.dataset.rowIndex) === activeRowIndex));
    });
    [...termList.querySelectorAll('.act-term-chip')].forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.termKey === activeTermKey));
    });
    evidenceQuote.textContent = `“${row.q.text || 'Sin texto disponible'}”`;
    evidenceCitation.textContent = `— ${row.q.participant || 'Participante anónimo'}, ${row.q.formatted_date || formatDate(act.date, act.year)}`;
    openEvidence.dataset.quoteIndex = String(row.index);
  };

  const renderAct = (act) => {
    if (!act) return;
    activeAct = act;
    activeRowIndex = Math.min(activeRowIndex, act.rows.length - 1);
    activeTermKey = null;
    const era = getEra(act.year);
    dateEl.textContent = formatReaderDate(act.date, act.year);
    dateSubEl.textContent = `${act.count} ${act.count === 1 ? 'fragmento' : 'fragmentos'} · ${act.participants.length} ${act.participants.length === 1 ? 'participante' : 'participantes'}`;
    eraEl.textContent = `${era.id} · ${era.name}`;
    signalNameEl.textContent = toneText[act.dominantTone];
    signalNameEl.className = `act-signal-name ${act.dominantTone}`;
    const dominantCount = act.dominantTone === 'mixed' ? Math.max(...Object.values(act.toneCounts)) : (act.toneCounts[act.dominantTone] || 0);
    signalCountEl.textContent = `${dominantCount}/${act.count} fragmentos`;
    ['hawkish', 'dovish', 'neutral'].forEach((tone) => {
      const bar = document.getElementById(`act${tone.charAt(0).toUpperCase()}${tone.slice(1)}Bar`);
      if (bar) bar.style.width = `${(act.toneCounts[tone] / act.count) * 100}%`;
    });
    participantsEl.innerHTML = '';
    act.participants.forEach((participant) => {
      const pill = document.createElement('span');
      pill.className = 'act-participant';
      pill.textContent = participant;
      participantsEl.appendChild(pill);
    });

    termList.innerHTML = '';
    if (act.terms.length) {
      act.terms.slice(0, 7).forEach((term) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'act-term-chip';
        button.dataset.termKey = term.key;
        button.setAttribute('aria-pressed', 'false');
        button.innerHTML = `<span></span><small></small>`;
        button.querySelector('span').textContent = term.label;
        button.querySelector('small').textContent = term.count;
        button.addEventListener('click', () => {
          const rowIndex = act.rows.findIndex((row) => getTerms(row).some((item) => item.normalized === term.key));
          renderEvidence(act, rowIndex >= 0 ? rowIndex : 0, term.key);
        });
        termList.appendChild(button);
      });
    } else {
      const emptyTerm = document.createElement('span');
      emptyTerm.className = 'acts-index-meta';
      emptyTerm.textContent = 'sin términos directos en la muestra';
      termList.appendChild(emptyTerm);
    }

    evidenceList.innerHTML = '';
    evidenceMeta.textContent = `${act.count} ${act.count === 1 ? 'fragmento' : 'fragmentos'}`;
    act.rows.forEach((row, rowIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'act-evidence-row';
      button.dataset.rowIndex = String(rowIndex);
      button.setAttribute('role', 'listitem');
      button.setAttribute('aria-current', 'false');
      const person = document.createElement('span');
      person.className = 'act-evidence-person';
      person.textContent = row.q.participant || 'Participante anónimo';
      const tone = document.createElement('span');
      tone.className = `act-evidence-tone ${getTone(row.q)}`;
      tone.textContent = toneText[getTone(row.q)];
      button.append(person, tone);
      button.addEventListener('click', () => renderEvidence(act, rowIndex));
      evidenceList.appendChild(button);
    });
    renderEvidence(act, activeRowIndex);
    listItems.forEach(({ button, act: listAct }) => button.setAttribute('aria-current', String(listAct.id === act.id)));
  };

  const selectAct = (act) => {
    if (!act) return;
    activeRowIndex = 0;
    renderAct(act);
    window.dispatchEvent(new CustomEvent('particle-act-focus', { detail: { date: act.date } }));
    const selected = listItems.find(({ act: listAct }) => listAct.id === act.id);
    selected?.button.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  const renderList = (yearValue = yearFilter.value) => {
    const visibleActs = yearValue === 'all' ? acts : acts.filter((act) => String(act.year) === String(yearValue));
    list.innerHTML = '';
    listItems.length = 0;
    if (!visibleActs.length) {
      const emptyState = document.createElement('div');
      emptyState.className = 'acts-empty';
      emptyState.textContent = 'No hay actas disponibles para este año.';
      list.appendChild(emptyState);
      return;
    }
    visibleActs.forEach((act) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'act-list-item';
      button.setAttribute('role', 'listitem');
      button.setAttribute('aria-current', String(activeAct?.id === act.id));
      button.setAttribute('aria-label', `Abrir acta del ${formatDate(act.date, act.year)}, ${act.count} fragmentos`);
      const dot = document.createElement('i');
      dot.className = `act-tone-dot ${act.dominantTone}`;
      dot.setAttribute('aria-hidden', 'true');
      const body = document.createElement('span');
      const date = document.createElement('span');
      date.className = 'act-list-date';
      date.textContent = formatListDate(act.date, act.year);
      const listMeta = document.createElement('span');
      listMeta.className = 'act-list-meta';
      listMeta.textContent = `${act.count} ${act.count === 1 ? 'fragmento' : 'fragmentos'} · ${act.participants.length} ${act.participants.length === 1 ? 'voz' : 'voces'}`;
      body.append(date, listMeta);
      const tone = document.createElement('span');
      tone.className = 'act-list-signal';
      tone.textContent = toneText[act.dominantTone];
      button.append(dot, body, tone);
      button.addEventListener('click', () => selectAct(act));
      list.appendChild(button);
      listItems.push({ button, act });
    });
  };

  openEvidence.addEventListener('click', () => {
    const quoteIndex = Number(openEvidence.dataset.quoteIndex);
    if (!Number.isFinite(quoteIndex) || !quotes[quoteIndex]) return;
    pinQuote(quoteIndex);
    openQuote(quoteIndex, { x: window.innerWidth * 0.62, y: window.innerHeight * 0.62 });
  });
  yearFilter.addEventListener('change', () => {
    renderList(yearFilter.value);
    const firstVisible = acts.find((act) => yearFilter.value === 'all' || String(act.year) === yearFilter.value);
    if (firstVisible) selectAct(firstVisible);
  });

  renderList('all');
  const defaultAct = acts.find((act) => act.date === '2010-05-13') || acts.slice().sort((a, b) => b.count - a.count || a.date.localeCompare(b.date))[0] || acts[0];
  selectAct(defaultAct);

  gsap.timeline({
    scrollTrigger: {
      trigger: '#stageActs',
      start: 'top 85%',
      end: 'bottom bottom',
      scrub: true,
    },
  })
    .fromTo(intro, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.13, ease: 'none' }, 0.04)
    .fromTo(browser, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.16, ease: 'none' }, 0.16)
    .to(intro, { opacity: 0, y: -14, duration: 0.08, ease: 'none' }, 0.90);
}
