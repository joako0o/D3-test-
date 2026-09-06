/* audit.mjs — auditoría automática del sitio en Chromium real.
 *
 * POR QUÉ EXISTE
 *   `npm run check` valida en jsdom (sin píxeles) y `npm run shots` saca fotos
 *   que hay que mirar a ojo. Falta lo intermedio: un chequeo que FALLE solo
 *   cuando algo está mal, en varios anchos, sin que nadie compare PNGs.
 *
 * QUÉ REVISA (y por qué eso y no otra cosa)
 *   · desbordamiento horizontal — el fallo nº1 en móvil: una barra lateral que
 *     no debería existir. Se reporta el elemento culpable, no solo el síntoma.
 *   · área táctil — botones/enlaces por debajo de 24x24 CSS px (mínimo WCAG
 *     2.2 AA, criterio 2.5.8) son difíciles de acertar con el pulgar.
 *   · errores de consola y `pageerror` — pantalla en negro silenciosa.
 *   · enlaces rotos: `href="#algo"` sin destino en el documento.
 *   · `target="_blank"` sin `rel="noopener"` (fuga de `window.opener`).
 *   · imágenes sin `alt`, sin `width`/`height` (saltos de layout) o servidas
 *     mucho más grandes que su caja (bytes tirados).
 *   · controles sin nombre accesible: un `<button>` que el lector de pantalla
 *     anuncia como "botón" y nada más.
 *   · jerarquía de encabezados: saltos de nivel (h2 → h4) y nº de <h1>.
 *   · metadatos SEO/Open Graph mínimos.
 *
 * USO
 *   npm start           # en otra terminal
 *   npm run audit
 *   npm run audit -- --origin=http://localhost:8000
 *
 * SALIDA
 *   Lista legible + código de salida 1 si hay ERRORes (los WARN no rompen).
 */

import { parseArgs, launchChromium, openSite, sleep } from '../lib/chromium.mjs';

const args = parseArgs();
const ORIGIN = args.origin || 'http://localhost:8000';

/* Anchos elegidos por lo que rompen, no por marketing:
   360 = Android pequeño real, 390 = iPhone moderno, 768 = tablet vertical
   (donde suelen morir los grid de 2 columnas), 1440 = escritorio típico. */
const VIEWPORTS = [
  { name: 'móvil 360', width: 360, height: 740 },
  { name: 'móvil 390', width: 390, height: 844 },
  { name: 'tablet 768', width: 768, height: 1024 },
  { name: 'escritorio 1440', width: 1440, height: 900 },
];

const findings = [];
const add = (level, area, viewport, message) => findings.push({ level, area, viewport, message });

/* ── Comprobaciones que dependen del ancho ─────────────────────────────── */
async function perViewport(page, vpName) {
  const res = await page.evaluate(() => {
    const out = { overflow: [], smallTargets: [], docWidth: 0, winWidth: 0 };
    out.docWidth = document.documentElement.scrollWidth;
    out.winWidth = window.innerWidth;

    const visible = (el) => {
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    };
    const describe = (el) => {
      const id = el.id ? `#${el.id}` : '';
      const cls =
        typeof el.className === 'string' && el.className
          ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}`
          : '';
      return `${el.tagName.toLowerCase()}${id}${cls}`;
    };

    /* Desbordamiento: solo se acusa al elemento cuyo PADRE no desborda, para
       no listar veinte descendientes arrastrados por un único culpable. */
    if (out.docWidth > out.winWidth + 1) {
      for (const el of document.querySelectorAll('body *')) {
        if (!visible(el)) continue;
        const s = getComputedStyle(el);
        // Lo fijo/absoluto fuera de pantalla es una técnica legítima
        // (menús deslizantes, texto solo para lectores) y no crea barra.
        if (s.position === 'fixed') continue;
        const r = el.getBoundingClientRect();
        if (r.right <= window.innerWidth + 1) continue;
        const p = el.parentElement;
        if (p && p !== document.body) {
          const pr = p.getBoundingClientRect();
          if (pr.right > window.innerWidth + 1) continue; // el padre ya carga la culpa
        }
        out.overflow.push({ el: describe(el), right: Math.round(r.right) });
        if (out.overflow.length >= 8) break;
      }
    }

    /* Área táctil (WCAG 2.2 AA 2.5.8: 24x24 CSS px). Se ignora lo que está
       dentro de un párrafo: los enlaces en línea están exentos por norma. */
    const seen = new Set();
    for (const el of document.querySelectorAll('a[href], button, [role="button"], select, input, summary')) {
      if (!visible(el)) continue;
      if (el.closest('p')) continue;
      const r = el.getBoundingClientRect();
      if (r.width >= 24 && r.height >= 24) continue;
      /* Lo sacado de pantalla a propósito (patrón "skip link", texto solo para
         lectores) mide 1x1 por diseño y crece al recibir foco: no es un
         objetivo táctil, es contenido oculto. */
      if (r.right < 0 || r.bottom < 0 || r.left > window.innerWidth) continue;
      const key = describe(el);
      if (seen.has(key)) continue;
      seen.add(key);
      out.smallTargets.push({ el: key, w: Math.round(r.width), h: Math.round(r.height) });
      if (out.smallTargets.length >= 10) break;
    }
    return out;
  });

  if (res.docWidth > res.winWidth + 1) {
    add(
      'ERROR',
      'responsive',
      vpName,
      `desbordamiento horizontal: el documento mide ${res.docWidth}px en una ventana de ${res.winWidth}px`
    );
    for (const o of res.overflow)
      add('ERROR', 'responsive', vpName, `  └ desborda ${o.el} (borde derecho en ${o.right}px)`);
  }
  for (const t of res.smallTargets) {
    add('WARN', 'área táctil', vpName, `${t.el} mide ${t.w}x${t.h}px (mínimo recomendado 24x24)`);
  }
}

/* ── Comprobaciones independientes del ancho ───────────────────────────── */
async function documentChecks(page) {
  const res = await page.evaluate(() => {
    const out = {
      badAnchors: [],
      blankNoOpener: [],
      images: [],
      namelessControls: [],
      headings: [],
      h1: 0,
      meta: {},
      langMissing: !document.documentElement.lang,
      duplicateIds: [],
    };

    for (const a of document.querySelectorAll('a[href^="#"]')) {
      const id = decodeURIComponent(a.getAttribute('href').slice(1));
      if (!id) continue;
      if (!document.getElementById(id)) out.badAnchors.push(a.getAttribute('href'));
    }
    for (const a of document.querySelectorAll('a[target="_blank"]')) {
      const rel = (a.getAttribute('rel') || '').toLowerCase();
      if (!rel.includes('noopener')) out.blankNoOpener.push(a.getAttribute('href') || '(sin href)');
    }
    for (const img of document.querySelectorAll('img')) {
      out.images.push({
        src: (img.currentSrc || img.src || '').split('/').pop(),
        alt: img.hasAttribute('alt'),
        dims: img.hasAttribute('width') && img.hasAttribute('height'),
        loading: img.getAttribute('loading'),
        natural: [img.naturalWidth, img.naturalHeight],
        box: [Math.round(img.clientWidth), Math.round(img.clientHeight)],
      });
    }
    /* Nombre accesible aproximado: texto, aria-label, aria-labelledby o title.
       No es el algoritmo completo, pero atrapa el caso real (icono solo). */
    for (const el of document.querySelectorAll('a[href], button, [role="button"], select')) {
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden') continue;
      const labelled = el.getAttribute('aria-labelledby');
      const byId = labelled && labelled.split(/\s+/).some((i) => document.getElementById(i));
      const name =
        (el.textContent || '').trim() || el.getAttribute('aria-label') || el.getAttribute('title') || (byId ? 'x' : '');
      if (!name) {
        const id = el.id ? `#${el.id}` : '';
        out.namelessControls.push(`${el.tagName.toLowerCase()}${id}`);
      }
    }
    for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
      const s = getComputedStyle(h);
      if (s.display === 'none') continue;
      out.headings.push(Number(h.tagName[1]));
    }
    out.h1 = document.querySelectorAll('h1').length;

    const ids = new Set();
    for (const el of document.querySelectorAll('[id]')) {
      if (ids.has(el.id)) out.duplicateIds.push(el.id);
      ids.add(el.id);
    }

    const m = (sel, attr = 'content') => document.querySelector(sel)?.getAttribute(attr) || '';
    out.meta = {
      title: document.title,
      description: m('meta[name="description"]'),
      canonical: m('link[rel="canonical"]', 'href'),
      ogTitle: m('meta[property="og:title"]'),
      ogDescription: m('meta[property="og:description"]'),
      ogImage: m('meta[property="og:image"]'),
      ogImageAlt: m('meta[property="og:image:alt"]'),
      ogUrl: m('meta[property="og:url"]'),
      ogType: m('meta[property="og:type"]'),
      twitterCard: m('meta[name="twitter:card"]'),
      themeColor: m('meta[name="theme-color"]'),
      viewport: m('meta[name="viewport"]'),
      jsonLd: !!document.querySelector('script[type="application/ld+json"]'),
    };
    return out;
  });

  const V = 'todos';
  if (res.langMissing) add('ERROR', 'accesibilidad', V, '<html> sin atributo lang');
  for (const a of res.badAnchors) add('ERROR', 'enlaces', V, `enlace interno sin destino: ${a}`);
  for (const h of res.blankNoOpener) add('ERROR', 'seguridad', V, `target="_blank" sin rel="noopener": ${h}`);
  for (const c of res.namelessControls) add('ERROR', 'accesibilidad', V, `control sin nombre accesible: ${c}`);
  for (const d of new Set(res.duplicateIds)) add('ERROR', 'html', V, `id duplicado: ${d}`);

  for (const img of res.images) {
    if (!img.alt) add('ERROR', 'accesibilidad', V, `<img ${img.src}> sin atributo alt`);
    if (!img.dims) add('WARN', 'rendimiento', V, `<img ${img.src}> sin width/height (provoca saltos de layout)`);
    if (img.box[0] && img.natural[0] > img.box[0] * 2.2) {
      add('WARN', 'imágenes', V, `<img ${img.src}> se descarga a ${img.natural[0]}px y se muestra a ${img.box[0]}px`);
    }
  }

  /* Jerarquía: un salto h2 → h4 deja huecos en el índice del lector. */
  if (res.h1 === 0) add('ERROR', 'seo', V, 'la página no tiene <h1>');
  if (res.h1 > 1) add('WARN', 'seo', V, `hay ${res.h1} <h1>; lo esperable es uno`);
  for (let i = 1; i < res.headings.length; i++) {
    if (res.headings[i] - res.headings[i - 1] > 1) {
      add('WARN', 'jerarquía', V, `salto de encabezado h${res.headings[i - 1]} → h${res.headings[i]}`);
    }
  }

  const m = res.meta;
  const need = {
    title: 'title',
    description: 'meta description',
    canonical: 'link canonical',
    ogTitle: 'og:title',
    ogDescription: 'og:description',
    ogImage: 'og:image',
    ogImageAlt: 'og:image:alt',
    ogUrl: 'og:url',
    ogType: 'og:type',
    twitterCard: 'twitter:card',
    themeColor: 'theme-color',
    viewport: 'meta viewport',
  };
  for (const [k, label] of Object.entries(need)) if (!m[k]) add('ERROR', 'seo', V, `falta ${label}`);
  if (m.title && (m.title.length < 15 || m.title.length > 65)) {
    add('WARN', 'seo', V, `<title> tiene ${m.title.length} caracteres (rango cómodo 15–65; se recorta en resultados)`);
  }
  if (m.description && (m.description.length < 50 || m.description.length > 165)) {
    add('WARN', 'seo', V, `meta description tiene ${m.description.length} caracteres (rango cómodo 50–165)`);
  }
  if (!m.jsonLd) add('WARN', 'seo', V, 'sin datos estructurados JSON-LD');
  if (m.viewport && !/width=device-width/.test(m.viewport))
    add('ERROR', 'responsive', V, 'meta viewport sin width=device-width');
  if (m.viewport && /user-scalable\s*=\s*no|maximum-scale\s*=\s*1/.test(m.viewport)) {
    add('ERROR', 'accesibilidad', V, 'meta viewport bloquea el zoom (WCAG 1.4.4)');
  }
}

/* ── Ejecución ─────────────────────────────────────────────────────────── */
const { browser, page, errors } = await launchChromium({ width: VIEWPORTS[0].width, height: VIEWPORTS[0].height });

console.log(`Auditando ${ORIGIN}…\n`);
await openSite(page, ORIGIN);
await documentChecks(page);

for (const vp of VIEWPORTS) {
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
  /* Reflow + reasentado: la escena 3D y ScrollTrigger recalculan al cambiar
     el ancho, y medir antes daría posiciones del ancho anterior. */
  await page.evaluate(() => window.dispatchEvent(new Event('resize')));
  await sleep(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(600);
  await perViewport(page, vp.name);

  /* Media página abajo: muchas secciones solo se construyen al entrar en
     viewport, y su desbordamiento no existe hasta ese momento. */
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
  await sleep(2000);
  await perViewport(page, `${vp.name} (a media página)`);
}

for (const e of new Set(errors)) add('ERROR', 'consola', 'runtime', e);

await browser.close();

/* ── Informe ───────────────────────────────────────────────────────────── */
const errs = findings.filter((f) => f.level === 'ERROR');
const warns = findings.filter((f) => f.level === 'WARN');

const print = (list, title) => {
  if (!list.length) return;
  console.log(`\n${title}`);
  const byArea = {};
  for (const f of list) (byArea[f.area] ||= []).push(f);
  for (const [area, items] of Object.entries(byArea)) {
    console.log(`\n  [${area}]`);
    for (const f of items) console.log(`    · (${f.viewport}) ${f.message}`);
  }
};

print(errs, `ERRORES (${errs.length})`);
print(warns, `AVISOS (${warns.length})`);

console.log(`\n${errs.length === 0 ? '✓ sin errores' : `✗ ${errs.length} errores`} · ${warns.length} avisos\n`);
process.exit(errs.length ? 1 : 0);
