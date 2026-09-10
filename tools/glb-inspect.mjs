/* tools/glb-inspect.mjs — inventario de un GLB: chunks, atributos, texturas.
 * Uso: node tools/glb-inspect.mjs <archivo.glb>
 */
import fs from 'node:fs';

const file = process.argv[2];
if (!file) {
  console.error('Uso: node tools/glb-inspect.mjs <archivo.glb>');
  process.exit(1);
}
const b = fs.readFileSync(file);
const chunks = [];
let off = 12;
while (off < b.length) {
  const clen = b.readUInt32LE(off);
  const ctype = b.readUInt32LE(off + 4);
  chunks.push({ type: ctype.toString(16), len: clen, start: off + 8 });
  off += 8 + clen;
}
console.log(file, `(${(b.length / 1024).toFixed(1)} KB)`);
const jsonChunk = chunks.find((c) => c.type === '4e4f534a');
const json = JSON.parse(b.subarray(jsonChunk.start, jsonChunk.start + jsonChunk.len).toString());
console.log('chunks:', chunks.map((c) => `${c.type}:${(c.len / 1024).toFixed(1)}KB`).join(' '));
console.log('extensiones:', (json.extensionsUsed || []).join(', '));

for (const [i, im] of (json.images || []).entries()) {
  const bv = json.bufferViews[im.bufferView];
  const buf = b.subarray(
    jsonChunk.start + jsonChunk.len + 8 + bv.byteOffset,
    jsonChunk.start + jsonChunk.len + 8 + bv.byteOffset + bv.byteLength
  );
  let info = `${im.mimeType} ${(bv.byteLength / 1024).toFixed(1)}KB`;
  if (im.mimeType === 'image/webp') {
    const riff = buf.toString('ascii', 0, 4);
    if (riff === 'RIFF') {
      // buscar 'VP8X' (extended) o 'VP8 ' (lossy) o 'VP8L' (lossless) y leer dimensiones
      const vp8x = buf.indexOf('VP8X');
      const vp8l = buf.indexOf('VP8L');
      const vp8s = buf.indexOf('VP8 ');
      if (vp8x >= 0) {
        info += ` VP8X ${buf.readUIntLE(vp8x + 4, 3) + 1}x${buf.readUIntLE(vp8x + 7, 3) + 1}`;
      } else if (vp8l >= 0) {
        const bits = buf.readUInt32LE(vp8l + 4);
        const w = (bits & 0x3fff) + 1;
        const h = ((bits >> 14) & 0x3fff) + 1;
        info += ` VP8L ${w}x${h}${(bits >> 28) & 1 ? ' alpha' : ''}`;
      } else if (vp8s >= 0) {
        const w = buf.readUInt16LE(vp8s + 6) & 0x3fff;
        const h = buf.readUInt16LE(vp8s + 8) & 0x3fff;
        info += ` VP8 ${w}x${h}`;
      }
    }
  } else if (im.mimeType === 'image/png') {
    info += ` PNG ${buf.readUInt32BE(16)}x${buf.readUInt32BE(20)}`;
  } else if (im.mimeType === 'image/jpeg') {
    let p = 2;
    while (p < buf.length) {
      if (buf[p] !== 0xff) {
        p++;
        continue;
      }
      const marker = buf[p + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        info += ` JPEG ${buf.readUInt16BE(p + 7)}x${buf.readUInt16BE(p + 5)}`;
        break;
      }
      p += 2 + buf.readUInt16BE(p + 2);
    }
  }
  console.log(`imagen ${i}:`, im.name || '(sin nombre)', '→', info);
}

let tris = 0;
let verts = 0;
for (const [mi, m] of (json.meshes || []).entries()) {
  for (const [pi, p] of m.primitives.entries()) {
    const attrs = p.extensions?.KHR_draco_mesh_compression?.attributes || p.attributes;
    const attNames = Object.keys(attrs).join(',');
    const accessors = p.extensions?.KHR_draco_mesh_compression ? null : Object.values(p.attributes);
    const posAcc = accessors && p.attributes.POSITION != null ? json.accessors[p.attributes.POSITION] : null;
    const vertCount = posAcc?.count ?? '?';
    tris += posAcc ? posAcc.count / 3 : 0;
    verts += posAcc?.count || 0;
    console.log(`mesh ${mi} prim ${pi}: ${attNames} | vértices ${vertCount} | modo ${p.mode}`);
  }
}
console.log('total triángulos ≈', Math.round(tris), '| vértices ≈', verts);
for (const [bi, bv] of (json.bufferViews || []).entries()) {
  if (!json.accessors.some((a) => a.bufferView === bi)) {
    const used = (json.images || []).some((im) => im.bufferView === bi);
    if (used) continue;
    console.log(`bufferView ${bi}: ${(bv.byteLength / 1024).toFixed(1)}KB (solo imágenes)`);
  }
}
