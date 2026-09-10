/* net-profile.mjs — inventario de la carga de red de la página (auditoría).
 * Lista todas las peticiones que dispara el arranque con su tamaño, tipo y
 * timing, para ver qué se baja en la ruta crítica. Uso:
 *   node tools/net-profile.mjs [--origin=http://localhost:8000] [--throttle=4G]
 */
import { parseArgs, launchChromium, openSite } from '../scripts/lib/chromium.mjs';

const args = parseArgs();
const ORIGIN = args.origin || 'http://localhost:8000';
const THROTTLE = args.throttle || null;

const { browser, page } = await launchChromium({ width: 1440, height: 900 });

if (THROTTLE) {
  const cdp = await page.createCDPSession();
  const profiles = {
    '3G': { download: 1.6 * 1e6, upload: 750 * 1e3, latency: 150 },
    '4G': { download: 9 * 1e6, upload: 3 * 1e6, latency: 60 },
  };
  const p = profiles[THROTTLE];
  if (!p) throw new Error(`throttle ${THROTTLE} no existe; usar 3G o 4G`);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: p.download,
    uploadThroughput: p.upload,
    latency: p.latency,
  });
  console.log(`# Throttling: ${THROTTLE} (${p.download / 1e6} Mb/s, ${p.latency} ms RTT)`);
}

const rows = [];
page.on('response', (res) => {
  const url = res.url();
  if (!url.startsWith(ORIGIN)) return;
  const t = res.timing();
  /* requestTime (s desde navigationStart) + TTFB: instante en que EMPIEZAN
     a llegar bytes de esa respuesta. */
  const ms = t ? (t.requestTime + (t.receiveHeadersEnd - t.startTime) / 1000) * 1000 : 0;
  rows.push({
    url: url.replace(ORIGIN, ''),
    type: res.request().resourceType(),
    status: res.status(),
    size: Number(res.headers()['content-length'] || 0),
    enc: res.headers()['content-encoding'] || 'none',
    cache: res.headers()['cache-control'] || '',
    fromCache: res.fromCache(),
    ms,
  });
});

await openSite(page, ORIGIN, { settleMs: 3500 });
await new Promise((r) => setTimeout(r, 2500));

/* agregar el resto de peticiones que se disparan con el scroll (figuras…) */
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 800) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
});
await new Promise((r) => setTimeout(r, 2500));

const total = rows.reduce((a, r) => a + r.size, 0);
const byType = {};
for (const r of rows) byType[r.type] = (byType[r.type] || 0) + r.size;
console.log(`\n## ${rows.length} requests · ${(total / 1024).toFixed(0)} KB total (content-length, sin compresión)`);
console.log(
  '## por tipo:',
  Object.entries(byType)
    .map(([k, v]) => `${k} ${(v / 1024).toFixed(0)}KB`)
    .join(' · ')
);
console.log('## sin content-length (transfer-encoding chunked / gzip):');
rows.filter((r) => !r.size && r.status === 200).forEach((r) => console.log(`   ${r.url}`));
console.log('\n## waterfall (ms | bytes | tipo | url) — orden de llegada');
rows
  .sort((a, b) => a.ms - b.ms)
  .forEach((r) =>
    console.log(
      `${String(Math.round(r.ms)).padStart(6)} ${String(r.size).padStart(8)} ${r.type.padEnd(9)} ${r.enc} ${r.url}`
    )
  );

/* qué archivos CSS y JS terminaron bloqueando el render */
console.log('\n## cache-control en respuestas (distintos):');
for (const c of [...new Set(rows.map((r) => `${r.cache}`))]) console.log(`   "${c}"`);
console.log('\n## desde caché del navegador:', rows.filter((r) => r.fromCache).length);

await browser.close();
