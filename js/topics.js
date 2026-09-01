/* topics.js — taxonomía temática del prototipo y normalización de texto.
 *
 * Datos puros y funciones sin estado: no tocan el DOM ni la escena 3D, así que
 * se pueden importar desde cualquier sitio y probar en aislamiento.
 */

/* Taxonomía transparente del prototipo: estas dimensiones son temas
   observables en el lenguaje económico. Con el corpus completo se valida
   y ajusta junto al equipo; no representan habilidades profesionales. */
export const TOPIC_DEFINITIONS = [
  { id: 'inflation', short: 'Inflación', label: 'Inflación y precios', terms: ['inflación', 'inflacionario', 'ipc', 'precios', 'subyacente', 'expectativas', 'meta'] },
  { id: 'activity', short: 'Actividad', label: 'Actividad y crecimiento', terms: ['crecimiento', 'pib', 'actividad', 'demanda', 'consumo', 'inversión', 'producto', 'brecha'] },
  { id: 'monetary', short: 'Tasas', label: 'Política monetaria', terms: ['tasa', 'tpm', 'política monetaria', 'estímulo', 'neutralidad', 'liquidez', 'mantener', 'subir', 'bajar'] },
  { id: 'external', short: 'Externo', label: 'Escenario internacional', terms: ['externo', 'internacional', 'estados unidos', 'ee.uu', 'global', 'mundial', 'china', 'europa', 'mercados externos'] },
  { id: 'financial', short: 'Mercados', label: 'Mercados y tipo de cambio', terms: ['mercados financieros', 'tipo de cambio', 'tasas forward', 'forward', 'activos', 'bonos', 'financiero', 'dólar', 'peso'] },
  { id: 'commodities', short: 'Commodities', label: 'Commodities y energía', terms: ['materias primas', 'petróleo', 'cobre', 'energía', 'alimentos', 'commodities'] },
  { id: 'labor', short: 'Laboral', label: 'Empleo y holguras', terms: ['empleo', 'desempleo', 'salarios', 'salario', 'holgura', 'trabajadores'] },
  { id: 'fiscal', short: 'Fiscal', label: 'Política fiscal', terms: ['fiscal', 'gasto', 'presupuesto', 'presupuestos', 'gobierno', 'impuesto', 'déficit'] },
];
export const normalizeTopicText = (value) => String(value || '').toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
export const topicHasTerm = (normalizedText, term) => normalizedText.includes(normalizeTopicText(term));
