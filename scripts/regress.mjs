// scripts/regress.mjs
// Instrumento de regressão dos geradores (DEC-014). Renderiza TODAS as combinações
// estilo × tipo de TYPES_BY_STYLE em 2 tamanhos × 3 jogos de parâmetros, direto pelo
// generateContent() do src/ atual, e compara o hash de cada saída com a linha de base
// versionada em scripts/regress-baseline.json. Não abre navegador: roda em Node puro.
//
// Uso:
//   npm run regress                      → compara com a linha de base (sai 1 se algo antigo mudou)
//   npm run regress -- --update          → regrava a linha de base (só quando a mudança é INTENCIONAL)
//   npm run regress -- --baseline <arq>  → compara com outro arquivo (usado na prova de vida)
//
// Código de saída: 0 = nenhuma chave antiga mudou, sumiu ou ficou não-determinística;
// 1 = alguma mudou/sumiu/oscilou, ou a linha de base não existe. Chave NOVA não reprova:
// é listada, e entra na linha de base com --update.
// Origem: promovido da sonda descartável da WO 0001 (261111-sonda-flow.mjs).

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import esbuild from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const update = args.includes('--update');
const bi = args.indexOf('--baseline');
const baselinePath = bi >= 0 ? path.resolve(args[bi + 1]) : path.join(ROOT, 'scripts', 'regress-baseline.json');

// Stub mínimo de DOM: view.js registra listeners de mouse no topo do módulo, e genGlyph lê a textarea.
// Precisa existir ANTES de o bundle ser importado.
const el = { value: '', addEventListener() {}, style: {} };
globalThis.document = { addEventListener() {}, getElementById: () => el, querySelector: () => el, querySelectorAll: () => [] };

/**
 * Bundla os dois módulos necessários (o src/ é ESM em arquivos .js, que o Node puro
 * não importa sem "type": "module") e importa o resultado de um arquivo temporário.
 * @returns {Promise<{generateContent: Function, TYPES_BY_STYLE: object, PALETTES: object[], state: object}>}
 */
async function loadGenerators() {
  const tmp = mkdtempSync(path.join(tmpdir(), 'vf-regress-'));
  const out = path.join(tmp, 'gen.mjs');
  try {
    await esbuild.build({
      stdin: {
        contents: "export { generateContent } from './src/core/generate.js';\nexport { TYPES_BY_STYLE, PALETTES, state } from './src/core/state.js';",
        resolveDir: ROOT, loader: 'js',
      },
      bundle: true, platform: 'node', format: 'esm', outfile: out, logLevel: 'warning',
    });
    return await import(pathToFileURL(out));
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

/**
 * Renderiza todas as combinações e devolve { chave: {sha1, bytes, det} }.
 * Chave = estilo/tipo/tamanho/seed. Sem tempo de execução: a linha de base precisa ser
 * determinística para poder ser versionada e comparada por diff.
 */
function renderAll({ generateContent, TYPES_BY_STYLE, PALETTES, state }) {
  const SIZES = [['main', 400, 0.46, 1.2], ['thumb', 60, 0.44, 0.8]]; // canvas e miniatura de variação
  const PARAMS = [[42, 0.55, 0.5], [7, 1, 1], [999, 0, 0]];          // seed, comp, sym
  const res = {};
  for (const [style, types] of Object.entries(TYPES_BY_STYLE)) for (const type of types) {
    for (const [label, W, k, sw] of SIZES) {
      state.w = W; state.h = W; // alguns geradores (frame, pattern, wave) leem o canvas do state
      for (const [seed, comp, sym] of PARAMS) {
        const s = generateContent(style, type, W / 2, W / 2, W * k, comp, sym, seed, PALETTES[0], sw, 0);
        const again = generateContent(style, type, W / 2, W / 2, W * k, comp, sym, seed, PALETTES[0], sw, 0);
        res[`${style}/${type}/${label}/${seed}`] = {
          sha1: createHash('sha1').update(s).digest('hex').slice(0, 12), bytes: s.length, det: s === again,
        };
      }
    }
  }
  return res;
}

const now = renderAll(await loadGenerators());
const keys = Object.keys(now).sort();
const nondet = keys.filter(k => !now[k].det);

if (update) {
  // Grava sem o campo det (sempre true quando a gravação é aceita) e em ordem estável: diff limpo no git.
  if (nondet.length) { console.log(`NAO gravado: ${nondet.length} chave(s) nao-determinística(s):\n  ${nondet.join('\n  ')}`); process.exit(1); }
  const lines = keys.map(k => `  ${JSON.stringify(k)}: ${JSON.stringify({ sha1: now[k].sha1, bytes: now[k].bytes })}`);
  writeFileSync(baselinePath, '{\n' + lines.join(',\n') + '\n}\n'); // uma chave por linha
  console.log(`linha de base gravada: ${keys.length} chaves -> ${path.relative(ROOT, baselinePath)}`);
  process.exit(0);
}

if (!existsSync(baselinePath)) { console.log(`linha de base ausente: ${baselinePath} — rode com --update`); process.exit(1); }
const base = JSON.parse(readFileSync(baselinePath, 'utf8'));
const changed = Object.keys(base).filter(k => now[k] && now[k].sha1 !== base[k].sha1);
const removed = Object.keys(base).filter(k => !now[k]);
const added = keys.filter(k => !base[k]);

console.log(`regress: ${Object.keys(base).length} chaves na linha de base · ${keys.length} agora`);
console.log(`  mudaram: ${changed.length}`); for (const k of changed) console.log(`    MUDOU: ${k} (${base[k].bytes} -> ${now[k].bytes} bytes)`);
console.log(`  sumiram: ${removed.length}`); for (const k of removed) console.log(`    SUMIU: ${k}`);
console.log(`  nao-deterministicas: ${nondet.length}`); for (const k of nondet) console.log(`    OSCILA: ${k}`);
console.log(`  novas: ${added.length}${added.length ? ' (nao reprovam; entram na linha de base com --update)' : ''}`); for (const k of added) console.log(`    NOVA: ${k} (${now[k].bytes} bytes)`);
console.log('  nao olhado: aparencia (nao abre o SVG), pixel art, Text->Form com texto, Draw mode, export.');
const fail = changed.length + removed.length + nondet.length;
console.log(fail ? `REPROVADO (${fail})` : 'OK — nenhuma chave antiga mudou');
process.exit(fail ? 1 : 0);
