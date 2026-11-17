// scripts/seeds.mjs
// Instrumento de sensibilidade ao seed (F5, DEC-017). Para cada tipo de TYPES_BY_STYLE,
// renderiza 40 seeds com os MESMOS sliders (Complexity 0,55 · Symmetry 0,5 · canvas 400) e conta:
//   - distintos: quantos SVGs diferentes saíram (o seed muda ALGUM número?);
//   - formas:    quantas ESTRUTURAS diferentes saíram — sequência de elementos + quantidade de
//                comandos de cada path. Um ajuste fino de ângulo muda os números mas não a estrutura;
//                uma árvore com outro arranjo de galhos muda as duas.
//   - silhueta:  quanto muda o que se lê na MINIATURA — média de 1 − IoU da ocupação de uma malha
//                16×16 entre todos os pares de seeds, em % (scripts/silhouette.mjs, DEC-020). «formas»
//                conta estrutura de elementos e premiava trocar um detalhe dentro do mesmo contorno;
//                a silhueta é a régua que mira o que o dono vê.
// Compara com scripts/seeds-baseline.json em modo catraca: reprova (sai 1) se algum tipo PERDER
// variedade (distintos, formas ou silhueta) em relação à linha de base. Ganhar não reprova;
// `--update` regrava a linha de base.
//
// Uso:
//   npm run seeds                 → compara com a linha de base
//   npm run seeds -- --update     → regrava a linha de base (depois de um lote da F5)
// O loader é o mesmo do scripts/regress.mjs (bundle temporário com esbuild + stub de document).

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import esbuild from 'esbuild';
import { occupancy, silhouetteChange } from './silhouette.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = path.join(ROOT, 'scripts', 'seeds-baseline.json');
const SEEDS = 40;
const update = process.argv.includes('--update');

const el = { value: '', addEventListener() {}, style: {} };
globalThis.document = { addEventListener() {}, getElementById: () => el, querySelector: () => el, querySelectorAll: () => [] };

async function loadGenerators() {
  const tmp = mkdtempSync(path.join(tmpdir(), 'vf-seeds-'));
  const out = path.join(tmp, 'gen.mjs');
  try {
    await esbuild.build({
      stdin: { contents: "export { generateContent } from './src/core/generate.js';\nexport { TYPES_BY_STYLE, PALETTES, state } from './src/core/state.js';", resolveDir: ROOT, loader: 'js' },
      bundle: true, platform: 'node', format: 'esm', outfile: out, logLevel: 'warning',
    });
    return await import(pathToFileURL(out));
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

/** Estrutura de um SVG: elementos em ordem e, em cada path, quantos comandos de cada letra. */
function structure(svg) {
  return (svg.match(/<\w+[^>]*>/g) || []).map(tag => {
    const name = tag.match(/<(\w+)/)[1];
    if (name !== 'path') return name;
    const d = (tag.match(/ d="([^"]*)"/) || [, ''])[1];
    const counts = {};
    for (const c of d.match(/[MLQCAZ]/g) || []) counts[c] = (counts[c] || 0) + 1;
    return 'path' + JSON.stringify(counts);
  }).join('|');
}

const { generateContent, TYPES_BY_STYLE, PALETTES, state } = await loadGenerators();
state.w = state.h = 400;
const h = s => createHash('sha1').update(s).digest('hex');
const now = {};
for (const [style, types] of Object.entries(TYPES_BY_STYLE)) for (const type of types) {
  const svgs = new Set(), forms = new Set(), occ = [];
  for (let seed = 1; seed <= SEEDS; seed++) {
    const s = generateContent(style, type, 200, 200, 184, 0.55, 0.5, seed, PALETTES[0], 1.2, 0);
    svgs.add(h(s)); forms.add(h(structure(s))); occ.push(occupancy(s, 400, 400));
  }
  now[`${style}/${type}`] = { distinct: svgs.size, forms: forms.size, silhouette: silhouetteChange(occ) };
}
const keys = Object.keys(now).sort();
const alive = keys.filter(k => now[k].forms > 1).length;
const moving = keys.filter(k => now[k].distinct > 1).length;
const SIL = 25; // silhueta a partir da qual o seed muda o que se vê na miniatura (meta do piloto, DEC-020)
const shaped = keys.filter(k => now[k].silhouette >= SIL).length;

if (update) {
  writeFileSync(BASELINE, '{\n' + keys.map(k => `  ${JSON.stringify(k)}: ${JSON.stringify(now[k])}`).join(',\n') + '\n}\n');
  console.log(`linha de base gravada: ${keys.length} tipos · formas>1: ${alive}/${keys.length} · distintos>1: ${moving}/${keys.length} · silhueta>=${SIL}%: ${shaped}/${keys.length}`);
  process.exit(0);
}

console.log(`seeds: ${SEEDS} seeds por tipo, Complexity 0.55, Symmetry 0.5`);
console.log('tipo'.padEnd(26) + 'distintos'.padStart(10) + 'formas'.padStart(8) + 'silhueta%'.padStart(11));
for (const k of keys) console.log(k.padEnd(26) + String(now[k].distinct).padStart(10) + String(now[k].forms).padStart(8) + now[k].silhouette.toFixed(1).padStart(11));
console.log(`\nformas>1 (o seed muda a estrutura): ${alive}/${keys.length} · distintos>1 (o seed muda algum número): ${moving}/${keys.length} · silhueta>=${SIL}% (o seed muda a miniatura): ${shaped}/${keys.length}`);
if (!existsSync(BASELINE)) { console.log('linha de base ausente — rode com --update'); process.exit(1); }
const base = JSON.parse(readFileSync(BASELINE, 'utf8'));
// linha de base antiga, sem silhueta: a coluna não é cobrada até o próximo --update
const sil = k => base[k].silhouette === undefined ? -1 : base[k].silhouette;
const fmt = o => `${o.distinct}/${o.forms}/${o.silhouette === undefined ? '-' : o.silhouette}`;
const lost = Object.keys(base).filter(k => !now[k] || now[k].forms < base[k].forms || now[k].distinct < base[k].distinct || now[k].silhouette < sil(k));
const gained = keys.filter(k => base[k] && (now[k].forms > base[k].forms || now[k].distinct > base[k].distinct || (sil(k) >= 0 && now[k].silhouette > sil(k))));
for (const k of lost) console.log(`  PERDEU: ${k} (${base[k] ? fmt(base[k]) : 'novo'} -> ${now[k] ? fmt(now[k]) : 'sumiu'})`);
for (const k of gained) console.log(`  GANHOU: ${k} (${fmt(base[k])} -> ${fmt(now[k])}) — rode --update para registrar`);
console.log('  nao olhado: aparencia fina — a silhueta por geometria nao ve espessura de traco nem preenchimento; o roteiro visual decide.');
console.log(lost.length ? `REPROVADO (${lost.length} tipo(s) perderam variedade)` : 'OK — nenhum tipo perdeu variedade');
process.exit(lost.length ? 1 : 0);
