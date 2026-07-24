// scripts/build.js
// Bundla src/main.js (e tudo que ele importa) num único IIFE via esbuild,
// injeta esse JS + o CSS de src/styles/main.css no template src/index.html,
// e escreve dist/vectorforge.html — o mesmo arquivo único distribuível de sempre
// (DEC-001 continua valendo: o *output* nunca deixou de ser um .html sem
// dependências de runtime; o que mudou foi só o fluxo de desenvolvimento).
//
// Uso:
//   node scripts/build.js          → build de produção (minificado)
//   node scripts/build.js --watch  → rebuild automático a cada mudança em src/

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

const watch = process.argv.includes('--watch');

async function build() {
  // 1) Bundla o JS: main.js + tudo que ele importa (core/, generators/) → um único IIFE.
  //    IIFE (não 'esm') para que o comportamento seja idêntico ao <script> inline
  //    original: roda assim que o parser chega nesse ponto do <body>, sem defer.
  const jsResult = await esbuild.build({
    entryPoints: [path.join(SRC, 'main.js')],
    bundle: true,
    format: 'iife',
    target: 'es2020',
    minify: !watch, // build de produção minifica; watch mode fica legível para debug
    write: false,
    logLevel: 'warning',
  });
  const js = jsResult.outputFiles[0].text;

  // 2) CSS é um arquivo único sem @import de outros módulos — só lê direto.
  //    (Se no futuro o CSS for dividido em vários arquivos, trocar para
  //    esbuild.build({ entryPoints: [...], bundle: true }) igual ao JS.)
  const css = fs.readFileSync(path.join(SRC, 'styles', 'main.css'), 'utf-8');

  // 3) Injeta no template.
  let html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf-8');
  html = html.replace('/*__STYLES__*/', css);
  html = html.replace('//__SCRIPT__', js);

  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(path.join(DIST, 'vectorforge.html'), html, 'utf-8');

  const kb = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);
  console.log(`✓ dist/vectorforge.html gerado (${kb} KB)`);
}

async function main() {
  if (!watch) {
    await build();
    return;
  }
  // Watch mode: rebuild a cada mudança em src/ (debounce simples).
  console.log('👀 Watch mode — observando src/ ...');
  await build();
  let pending = false;
  const trigger = () => {
    if (pending) return;
    pending = true;
    setTimeout(async () => {
      pending = false;
      try { await build(); } catch (e) { console.error('✗ Build falhou:', e.message); }
    }, 100);
  };
  fs.watch(SRC, { recursive: true }, trigger);
}

main().catch(e => { console.error(e); process.exit(1); });
