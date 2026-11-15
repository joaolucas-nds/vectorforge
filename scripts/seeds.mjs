// scripts/seeds.mjs
// Instrumento de sensibilidade ao seed (F5, DEC-017). Para cada tipo de TYPES_BY_STYLE,
// renderiza 40 seeds com os MESMOS sliders (Complexity 0,55 · Symmetry 0,5 · canvas 400) e conta:
//   - distintos: quantos SVGs diferentes saíram (o seed muda ALGUM número?);
//   - formas:    quantas ESTRUTURAS diferentes saíram — sequência de elementos + quantidade de
//                comandos de cada path. Um ajuste fino de ângulo muda os números mas não a estrutura;
//                uma árvore com outro arranjo de galhos muda as duas. É a métrica de «desenhos
//                elaboradamente diferentes».
// Compara com scripts/seeds-baseline.json em modo catraca: reprova (sai 1) se algum tipo PERDER
// variedade em relação à linha de base. Ganhar não reprova; `--update` regrava a linha de base.
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
  const svgs = new Set(), forms = new Set();
  for (let seed = 1; seed <= SEEDS; seed++) {
    const s = generateContent(style, type, 200, 200, 184, 0.55, 0.5, seed, PALETTES[0], 1.2, 0);
    svgs.add(h(s)); forms.add(h(structure(s)));
  }
  now[`${style}/${type}`] = { distinct: svgs.size, forms: forms.size };
}
const keys = Object.keys(now).sort();
const alive = keys.filter(k => now[k].forms > 1).length;
const moving = keys.filter(k => now[k].distinct > 1).length;

if (update) {
  writeFileSync(BASELINE, '{\n' + keys.map(k => `  ${JSON.stringify(k)}: ${JSON.stringify(now[k])}`).join(',\n') + '\n}\n');
  console.log(`linha de base gravada: ${keys.length} tipos · formas>1: ${alive}/${keys.length} · distintos>1: ${moving}/${keys.length}`);
  process.exit(0);
}

console.log(`seeds: ${SEEDS} seeds por tipo, Complexity 0.55, Symmetry 0.5`);
console.log('tipo'.padEnd(26) + 'distintos'.padStart(10) + 'formas'.padStart(8));
for (const k of keys) console.log(k.padEnd(26) + String(now[k].distinct).padStart(10) + String(now[k].forms).padStart(8));
console.log(`\nformas>1 (o seed muda a estrutura): ${alive}/${keys.length} · distintos>1 (o seed muda algum número): ${moving}/${keys.length} · meta da F5: ${keys.length}/${keys.length}`);
if (!existsSync(BASELINE)) { console.log('linha de base ausente — rode com --update'); process.exit(1); }
const base = JSON.parse(readFileSync(BASELINE, 'utf8'));
const lost = Object.keys(base).filter(k => !now[k] || now[k].forms < base[k].forms || now[k].distinct < base[k].distinct);
const gained = keys.filter(k => base[k] && (now[k].forms > base[k].forms || now[k].distinct > base[k].distinct));
for (const k of lost) console.log(`  PERDEU: ${k} (${base[k] ? `${base[k].distinct}/${base[k].forms}` : 'novo'} -> ${now[k] ? `${now[k].distinct}/${now[k].forms}` : 'sumiu'})`);
for (const k of gained) console.log(`  GANHOU: ${k} (${base[k].distinct}/${base[k].forms} -> ${now[k].distinct}/${now[k].forms}) — rode --update para registrar`);
console.log('  nao olhado: aparencia — duas estruturas diferentes ainda podem PARECER iguais; o roteiro visual decide.');
console.log(lost.length ? `REPROVADO (${lost.length} tipo(s) perderam variedade)` : 'OK — nenhum tipo perdeu variedade');
process.exit(lost.length ? 1 : 0);
