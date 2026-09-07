/* voice-explorer.js — "Las voces": directorio editorial de participantes.
 *
 * Sección de scrollytelling. Vive fuera de main.js porque su única relación
 * con la escena 3D pasa por `js/core/interaction-state.js` (qué cita está
 * señalada) y por las dos funciones del panel de cita, que llegan inyectadas.
 * No importa Three.js ni conoce la cámara.
 *
 * Las dependencias se declaran en la firma de init: quien la llame tiene que
 * dárselas. Nada de leer variables de otro archivo por la puerta de atrás.
 */
import { voiceFocus, pinQuote } from '../core/interaction-state.js';
import { TOPIC_DEFINITIONS, normalizeTopicText, topicHasTerm } from '../data/topics.js';


export function initVoiceExplorer({ quotes, openQuote, closeQuotePanel }) {
  const rail = document.getElementById('voiceRail');
  const meta = document.getElementById('voiceDirectoryMeta');
  const empty = document.getElementById('voiceDetailEmpty');
  const content = document.getElementById('voiceDetailContent');
  const detailName = document.getElementById('voiceDetailName');
  const detailMeta = document.getElementById('voiceDetailMeta');
  const detailSummary = document.getElementById('voiceDetailSummary');
  const detailQuote = document.getElementById('voiceDetailQuote');
  const detailCitation = document.getElementById('voiceDetailCitation');
  const detailOpen = document.getElementById('voiceDetailOpen');
  const profileOpen = document.getElementById('voiceProfileOpen');
  const profilePanel = document.getElementById('voiceProfilePanel');
  const profileClose = document.getElementById('voiceProfileClose');
  const profileTitle = document.getElementById('voiceProfileTitle');
  const profileSubtitle = document.getElementById('voiceProfileSubtitle');
  const radar = document.getElementById('voiceRadar');
  const topicList = document.getElementById('voiceTopicList');
  const evidenceQuote = document.getElementById('voiceProfileEvidenceQuote');
  const evidenceCitation = document.getElementById('voiceProfileEvidenceCitation');
  if (!rail || !meta || !empty || !content || !detailOpen || !profileOpen || !profilePanel || !profileClose || !radar || !topicList || !evidenceQuote || !evidenceCitation || !quotes.length) return;

  const getSourceYear = (q) => {
    const dateYear = String(q.date || '').match(/^(\d{4})/);
    return dateYear ? Number(dateYear[1]) : Number(q.year);
  };
  const grouped = new Map();
  let excludedVoiceRows = 0;
  quotes.forEach((q, index) => {
    /* Mismo criterio que el navegador de actas: el registro 1985 del
       fixture no se mezcla con el período declarado 2000–2015. Se
       contabiliza aparte y se informa en el meta del directorio. */
    const year = getSourceYear(q);
    if (!Number.isFinite(year) || year < 2000 || year > 2015) {
      excludedVoiceRows += 1;
      return;
    }
    const name = q.participant || 'Participante anónimo';
    if (!grouped.has(name)) grouped.set(name, []);
    grouped.get(name).push({ q, index, normalizedText: normalizeTopicText(q.text) });
  });

  const voices = Array.from(grouped, ([name, rows]) => {
    const toneCounts = { hawkish: 0, dovish: 0, neutral: 0 };
    /* La fecha documental es la referencia temporal primaria; q.year queda
       como fallback para registros que todavía no traen date. */
    const years = rows.map(({ q }) => getSourceYear(q)).filter(Number.isFinite);
    rows.forEach(({ q }) => {
      const tone = q.label in toneCounts ? q.label : 'neutral';
      toneCounts[tone] += 1;
    });
    return {
      name,
      rows,
      count: rows.length,
      toneCounts,
      minYear: years.length ? Math.min(...years) : '—',
      maxYear: years.length ? Math.max(...years) : '—',
    };
  }).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'es'));

  meta.textContent = `Muestra visual · ${voices.length} voces · ${quotes.length - excludedVoiceRows} fragmentos${excludedVoiceRows ? ` · ${excludedVoiceRows} fuera del período` : ''}`;
  rail.innerHTML = '';
  const cards = [];
  let activeName = null;

  const toneLabels = {
    hawkish: 'hawkish (restrictiva)',
    dovish: 'dovish (expansiva)',
    neutral: 'neutral',
  };
  const svgNS = 'http://www.w3.org/2000/svg';
  const createSvgElement = (tag, attrs = {}) => {
    const node = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    return node;
  };
  const getVoiceSample = (rows) => {
    if (!rows || !rows.length) return null;
    const chronological = rows.slice().sort((a, b) => {
      const da = String(a.q.date || a.q.year || '');
      const db = String(b.q.date || b.q.year || '');
      return da.localeCompare(db) || a.index - b.index;
    });
    return chronological[Math.floor((chronological.length - 1) / 2)];
  };
  const getTopicProfile = (voice) => TOPIC_DEFINITIONS.map((definition) => {
    const matchedRows = voice.rows.filter((row) => definition.terms.some((term) => topicHasTerm(row.normalizedText, term)));
    const termCounts = definition.terms.map((term) => ({
      term,
      count: voice.rows.filter((row) => topicHasTerm(row.normalizedText, term)).length,
    })).filter((item) => item.count > 0).sort((a, b) => b.count - a.count || a.term.localeCompare(b.term, 'es'));
    return {
      definition,
      rows: matchedRows,
      value: voice.count ? (matchedRows.length / voice.count) * 100 : 0,
      termCounts,
    };
  });

  function drawVoiceRadar(profiles, voiceName) {
    radar.innerHTML = '';
    const cx = 150;
    const cy = 128;
    const radius = 82;
    const count = profiles.length;
    const angleFor = (index) => (-Math.PI / 2) + (index / count) * Math.PI * 2;
    const pointFor = (index, value, distance = radius * (value / 100)) => {
      const angle = angleFor(index);
      return [cx + Math.cos(angle) * distance, cy + Math.sin(angle) * distance];
    };
    const polygonPoints = (distance) => profiles.map((_, index) => pointFor(index, 100, distance).join(',')).join(' ');

    [0.25, 0.5, 0.75, 1].forEach((level) => {
      radar.appendChild(createSvgElement('polygon', { class: 'radar-ring', points: polygonPoints(radius * level) }));
    });
    profiles.forEach((profile, index) => {
      const [x, y] = pointFor(index, 100);
      radar.appendChild(createSvgElement('line', { class: 'radar-axis', x1: cx, y1: cy, x2: x, y2: y }));
    });
    const shape = createSvgElement('polygon', {
      class: 'radar-shape',
      points: profiles.map((profile, index) => pointFor(index, profile.value).join(',')).join(' '),
    });
    radar.appendChild(shape);
    profiles.forEach((profile, index) => {
      const [x, y] = pointFor(index, profile.value);
      radar.appendChild(createSvgElement('circle', { class: 'radar-point', cx: x, cy: y, r: 3.5 }));
      const [lx, ly] = pointFor(index, 100, radius + 23);
      const label = createSvgElement('text', {
        class: 'radar-label',
        x: lx,
        y: ly + (ly < cy ? -2 : 4),
        'text-anchor': lx < cx - 8 ? 'end' : lx > cx + 8 ? 'start' : 'middle',
      });
      label.textContent = profile.definition.short;
      radar.appendChild(label);
    });
    radar.appendChild(createSvgElement('circle', { cx, cy, r: 2, fill: 'rgba(255,255,255,0.65)' }));
    radar.setAttribute('aria-label', `Perfil temático de ${voiceName}. Cada eje muestra el porcentaje de sus fragmentos con una mención directa.`);
    gsap.fromTo(shape, { opacity: 0, scale: 0.92, transformOrigin: `${cx}px ${cy}px` }, { opacity: 1, scale: 1, duration: 0.55, ease: 'cinematicOut' });
  }

  let profileCloseTimer = null;
  let profileReturnFocus = null;
  function setProfileEvidence(voice, rows) {
    const sample = getVoiceSample(rows) || getVoiceSample(voice.rows);
    if (!sample) return;
    evidenceQuote.textContent = `“${sample.q.text || 'Sin texto disponible'}”`;
    evidenceCitation.textContent = `— ${sample.q.participant || voice.name}, ${sample.q.formatted_date || sample.q.date || sample.q.year || 'fecha no especificada'}`;
  }

  function renderVoiceProfile(voice, activeTopicId = null) {
    if (!voice) return;
    const profiles = getTopicProfile(voice);
    profileTitle.textContent = voice.name;
    profileSubtitle.textContent = `${voice.count} ${voice.count === 1 ? 'intervención' : 'intervenciones'} · ${voice.minYear}–${voice.maxYear} · cada eje = proporción de fragmentos con mención directa`;
    drawVoiceRadar(profiles, voice.name);
    topicList.innerHTML = '';
    profiles.forEach((profile) => {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'voice-topic-row' + (profile.definition.id === activeTopicId ? ' is-active' : '');
      row.setAttribute('aria-pressed', String(profile.definition.id === activeTopicId));
      row.setAttribute('aria-label', `${profile.definition.label}: ${Math.round(profile.value)} por ciento de los fragmentos`);
      row.innerHTML = `
        <span class="voice-topic-row-top"><span></span><strong></strong></span>
        <span class="voice-topic-meter"><i></i></span>
        <span class="voice-topic-terms"></span>`;
      row.querySelector('.voice-topic-row-top span').textContent = profile.definition.label;
      row.querySelector('.voice-topic-row-top strong').textContent = `${Math.round(profile.value)}%`;
      row.querySelector('.voice-topic-meter i').style.width = `${profile.value}%`;
      row.querySelector('.voice-topic-terms').textContent = profile.termCounts.length
        ? profile.termCounts.slice(0, 3).map((item) => item.term).join(' · ')
        : 'sin coincidencia directa en la muestra';
      row.addEventListener('click', () => renderVoiceProfile(voice, profile.definition.id));
      topicList.appendChild(row);
    });
    const activeProfile = profiles.find((profile) => profile.definition.id === activeTopicId);
    setProfileEvidence(voice, activeProfile?.rows || voice.rows);
  }

  function openVoiceProfile(voice) {
    if (!voice) return;
    renderVoiceProfile(voice);
    profileReturnFocus = document.activeElement;
    profilePanel.hidden = false;
    profilePanel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('voice-profile-modal-open');
    requestAnimationFrame(() => profilePanel.classList.add('is-open'));
    profileClose.focus({ preventScroll: true });
  }

  function closeVoiceProfile() {
    if (profilePanel.hidden) return;
    profilePanel.classList.remove('is-open');
    profilePanel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('voice-profile-modal-open');
    clearTimeout(profileCloseTimer);
    profileCloseTimer = setTimeout(() => {
      profilePanel.hidden = true;
      if (profileReturnFocus && typeof profileReturnFocus.focus === 'function') {
        profileReturnFocus.focus({ preventScroll: true });
      }
      profileReturnFocus = null;
    }, 340);
  }
  profileClose.addEventListener('click', closeVoiceProfile);
  profilePanel.querySelectorAll('[data-voice-profile-close]').forEach((element) => element.addEventListener('click', closeVoiceProfile));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !profilePanel.hidden) {
      event.preventDefault();
      closeVoiceProfile();
    }
  });

  function updateDetail(voice) {
    if (!voice) {
      empty.hidden = false;
      content.hidden = true;
      voiceFocus.quoteIndex = -1;
      return;
    }

    /* La muestra se toma del centro cronológico para no convertir la tarjeta
       en un ranking ni privilegiar automáticamente la primera/última cita. */
    const sample = getVoiceSample(voice.rows);
    const toneSummary = [
      `${voice.toneCounts.hawkish} ${toneLabels.hawkish}`,
      `${voice.toneCounts.dovish} ${toneLabels.dovish}`,
      `${voice.toneCounts.neutral} neutral${voice.toneCounts.neutral === 1 ? '' : 'es'}`,
    ].join(' · ');

    empty.hidden = true;
    content.hidden = false;
    detailName.textContent = voice.name;
    detailMeta.textContent = `${voice.count} ${voice.count === 1 ? 'intervención' : 'intervenciones'} en la muestra · ${voice.minYear}–${voice.maxYear}`;
    detailSummary.textContent = `Señales detectadas en sus fragmentos: ${toneSummary}.`;
    detailQuote.textContent = `“${sample.q.text || 'Sin texto disponible'}”`;
    detailCitation.textContent = `— ${sample.q.participant || voice.name}, ${sample.q.formatted_date || sample.q.date || sample.q.year || 'fecha no especificada'}`;
    voiceFocus.quoteIndex = sample.index;
  }

  function selectVoice(name) {
    activeName = activeName === name ? null : name;
    voiceFocus.participant = activeName;
    if (activeName) voiceFocus.rendered = activeName;
    cards.forEach(({ card, voice }) => {
      const selected = voice.name === activeName;
      card.setAttribute('aria-pressed', String(selected));
    });
    updateDetail(activeName ? voices.find((voice) => voice.name === activeName) : null);
    /* Si el lector estaba leyendo una cita del enjambre, una nueva selección
       no debe dejar un panel perteneciente a otra voz flotando sobre el rail. */
    if (typeof closeQuotePanel === 'function') closeQuotePanel();
  }

  profileOpen.addEventListener('click', () => {
    const voice = activeName ? voices.find((item) => item.name === activeName) : null;
    openVoiceProfile(voice);
  });

  voices.forEach((voice, index) => {
    /* El rol `listitem` va en un envoltorio, no en el botón: un <button>
       con role="listitem" pierde su semántica de botón y `aria-pressed` deja
       de ser válido ahí (Lighthouse: aria-allowed-attr). Así la lista sigue
       siendo lista y la tarjeta sigue siendo un botón conmutable. */
    const item = document.createElement('div');
    item.setAttribute('role', 'listitem');
    item.className = 'voice-card-item';
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'voice-card';
    card.setAttribute('aria-pressed', 'false');
    card.setAttribute('aria-label', `Seleccionar ${voice.name}: ${voice.count} ${voice.count === 1 ? 'intervención' : 'intervenciones'} entre ${voice.minYear} y ${voice.maxYear}.`);
    card.innerHTML = `
      <span class="voice-card-index"></span>
      <span class="voice-card-name"></span>
      <span class="voice-card-meta"></span>
      <span class="voice-card-years"></span>
      <span class="voice-signal-bar" aria-hidden="true">
        <i class="hawkish"></i><i class="dovish"></i><i class="neutral"></i>
      </span>`;
    card.querySelector('.voice-card-index').textContent = String(index + 1).padStart(2, '0');
    card.querySelector('.voice-card-name').textContent = voice.name;
    card.querySelector('.voice-card-meta').textContent = `${voice.count} ${voice.count === 1 ? 'intervención' : 'intervenciones'}`;
    card.querySelector('.voice-card-years').textContent = `${voice.minYear}–${voice.maxYear}`;
    ['hawkish', 'dovish', 'neutral'].forEach((tone) => {
      card.querySelector(`.voice-signal-bar .${tone}`).style.width = `${(voice.toneCounts[tone] / voice.count) * 100}%`;
    });
    card.addEventListener('click', () => selectVoice(voice.name));
    item.appendChild(card);
    rail.appendChild(item);
    cards.push({ card, voice });
  });

  detailOpen.addEventListener('click', () => {
    if (voiceFocus.quoteIndex < 0) return;
    pinQuote(voiceFocus.quoteIndex);
    openQuote(voiceFocus.quoteIndex, { x: window.innerWidth * 0.54, y: window.innerHeight * 0.62 });
  });
}
