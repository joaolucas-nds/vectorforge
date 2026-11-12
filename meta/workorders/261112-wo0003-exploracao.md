# WO 0003 — Ciclo de exploração (Fase A): Surprise, cadeados, desfazer, «Like this», prévia ao vivo + FIX-003 · v0.5.0

> **Tipo:** mista — código de UI (Edições 1–17, nenhum gerador tocado) + versão + registro nos meta.
> **Config sugerida:** modelo mais capaz (Opus) · `/effort medium` — o diff é exato e foi testado no protótipo, mas toca 6 arquivos de `src/` e a conferência tem mais passos.
> **Pré-requisito:** commit `cf769d7`, `node_modules/` presente.
> **Base:** `specs/261112-exploracao.md` (critérios de aceite) e `meta/analises/261112-ANALISE-exploracao-e-ux.md` (Fase A).
> **Arquivos que o chat gravou no disco e esta WO usa** (a Edição 0 confere):
>   - `src/core/explore.js` — sha1 `57f04da9a0000c078a7def5b292df3a747e691aa` (versionado por esta WO)
>   - `specs/261112-exploracao.md` — sha1 `a8b3390b16ad80b3d1cfc3a69db7ca8c4404a6e1` (versionado por esta WO)
>   - `meta/analises/261112-ANALISE-exploracao-e-ux.md` — sha1 `6320ba76647b72887411815b9bd254e9052e0998` (versionado por esta WO)
>   - `meta/analises/_TEMPLATE.md` — sha1 `34bf231057d93f82c024cb073b16958de276788c` (versionado por esta WO)
>   - `../261112-sonda-ui/behave.cjs` — sha1 `1985f6a86b85257f3b740c6e1cf90c5b7916877f` (pasta-pai; NÃO versionar)
>   - `../261112-sonda-ui/package.json` — sha1 `138da1918af8cc6105400f83aaa020422b9c043d` (pasta-pai; NÃO versionar)
> **Âncora semântica:** trecho-âncora que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**.
> **Idempotência:** procure o texto NOVO INTEIRO antes de cada edição. Nas Edições 1, 4, 6, 11, 12, 13, 14, 15, 17, 28, 29, 31 a âncora fica DENTRO do texto novo; nas Edições 2, 3, 5, 7, 8, 9, 10, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 30, 32, 33, 34 a âncora some (já aplicada = texto novo presente **e** âncora ausente). Já aplicada: **PULE** e diga no relatório.
> **Âncoras lidas em** (lidas do disco pelo chat neste turno, no commit `cf769d7`; trecho = primeira linha da âncora):
>   - Edição 1 · `src/core/generate.js` — `import { genLSysTree, genLSysKoch, genLSysDragon } from '../generators/botanical.js';`
>   - Edição 2 · `src/core/generate.js` — `export function generateVariations() {`
>   - Edição 3 · `src/core/view.js` — `export function fitToView() {`
>   - Edição 4 · `src/main.js` — `import { xSVG, xPNG, copySVG } from './core/export.js';`
>   - Edição 5 · `src/main.js` — `Object.assign(window, {`
>   - Edição 6 · `src/main.js` — `updateDimTag();`
>   - Edição 7 · `src/index.html` — `    <button class="tb-btn" onclick="doGenRandom()">↻ Regenerate</button>`
>   - Edição 8 · `src/index.html` — `<div class="sec-label">Art Style</div>`
>   - Edição 9 · `src/index.html` — `<div class="sec-label">Output Type</div>`
>   - Edição 10 · `src/index.html` — `<div class="sec-label">Color Theme</div>`
>   - Edição 11 · `src/index.html` — `<span class="sv" id="sv-comp">`
>   - Edição 12 · `src/index.html` — `<span class="sv" id="sv-sym">`
>   - Edição 13 · `src/index.html` — `<span class="sv" id="sv-sw">`
>   - Edição 14 · `src/index.html` — `<span class="sv" id="sv-fill">`
>   - Edição 15 · `src/index.html` — `<span class="sv" id="sv-seed">`
>   - Edição 16 · `src/index.html` — `<button class="gen-btn" id="gen-btn" onclick="doGen()">Generate</button>`
>   - Edição 17 · `src/styles/main.css` — `  .tag { font-size: 8px; padding: 1px 5px; border-radius: 3px; background: var(--bg4); bor`
>   - Edição 18 · `meta/CONTEXT.md` — `│   │   └── export.js            # getSVGString/xSVG/xPNG/copySVG`
>   - Edição 19 · `meta/CONTEXT.md` — `**PRNG seeded (´mkRand´):** usa xorshift multiplicativo. Seed idêntico + parâmetros idênti`
>   - Edição 20 · `meta/CONTEXT.md` — `8. **Adicionar um novo handler ´onclick=""´ no HTML sem expor a função em ´window´** *(nov`
>   - Edição 21 · `meta/CONTEXT.md` — `- **O que é sucesso:** usuário clica "Generate", ajusta parâmetros, exporta SVG e usa dire`
>   - Edição 22 · `meta/GLOSSARY.md` — `- **Variation** — uma das 4 miniaturas geradas automaticamente com seeds offset (+0, +111,`
>   - Edição 23 · `meta/GLOSSARY.md` — `- **´doGenRandom()´** — handler do botão "↻ Regenerate" desde v0.2.0 (FIX-001): sorteia ´s`
>   - Edição 24 · `README.md` — `- **4 variações automáticas** a partir do seed atual — clique numa para adotá-la.`
>   - Edição 25 · `meta/STATUS.md` — `**[0.4.0]** — Flow Fields entregue (tipo ´flow´ no estilo Organic, DEC-013) e **F3 concluí`
>   - Edição 26 · `meta/STATUS.md` — `- **´↻ Regenerate´** sorteia seed novo a cada click (FIX-001).`
>   - Edição 27 · `meta/STATUS.md` — `- Nada em curso. F3 concluída em v0.4.0; F4 ainda não aberta — próxima frente a escolher c`
>   - Edição 28 · `meta/IDEAS.md` — `Em vez de exportar arquivo, ter um plugin nativo que puxa o SVG gerado diretamente para o `
>   - Edição 29 · `meta/CHANGELOG.md` — `- **´README.md´** de verdade (antes, uma linha com aspas literais): o que é o projeto, com`
>   - Edição 30 · `meta/CHANGELOG.md` — `## [Não lançado]`
>   - Edição 31 · `meta/DECISIONS.md` — `- Fica de fora o que não passa por ´generateContent´ (pixel art, Text→Form com texto, Draw`
>   - Edição 32 · `package.json` — `  "version": "0.4.0",`
>   - Edição 33 · `package-lock.json` — `  "name": "vectorforge",`
>   - Edição 34 · `package-lock.json` — `      "name": "vectorforge",`
> **Próximo comando:** `/wrap wo0003-exploracao`

> **Canal dos meta neste ciclo = CODE.** Esta WO É o registro: aplique as edições nos `meta/`. O `/wrap` depois acrescenta só o log do dia e a «Última conversa» do STATUS.

---

## 1. Por que

O dono pediu (2026-11-12) um botão que gere algo diferente do último, aleatório para tudo e mais variações. A análise mostrou que nada redesenhava sem o botão Generate, que o único acaso era o seed e que não havia desfazer — e achou o FIX-003 (canvas vazio). Esta WO aplica a Fase A, que o chat prototipou e testou: build real, regress com 0 mudanças e 18 checagens de comportamento em jsdom.

## Inventário — de onde saiu a lista de edições

- **Código** — os pontos que o ciclo precisa tocar saíram do próprio `src/`: o dispatcher de variações (`generateVariations`/`applyVar`, 1 lugar), o enquadramento (`fitToView`, 1), a exposição em `window` e o init (`src/main.js`, 3), os controles no HTML (botão do topo, 3 rótulos de seção, 5 sliders, botão do rodapé = 10) e o CSS (1). **17 edições** em 5 arquivos + 1 arquivo novo (`src/core/explore.js`). Os geradores (`src/generators/*`) e `generateContent` NÃO mudam — se o regress acusar mudança, a lista está errada: **PARE**.
- **Onde o fluxo antigo está descrito** — `grep -n "Generate\|doGenRandom\|Regenerate\|Variation\|Lista atual exposta" meta/CONTEXT.md meta/GLOSSARY.md README.md meta/STATUS.md` devolve **10** linhas no commit `cf769d7` (CONTEXT 7, GLOSSARY 2, STATUS 1). **6** viram edição: CONTEXT «PRNG seeded», Armadilha 8 e «O que é sucesso»; GLOSSARY «Variation» e «`doGenRandom()`»; STATUS «`↻ Regenerate`». As outras **4** (CONTEXT: linhas `ui.js` e `generate.js` da árvore, e o passo `setTimeout(20ms) … generateVariations()` do pipeline) continuam verdadeiras — as funções seguem existindo — e ficam. Fora desse grep, mais 2 edições: a linha `export.js` da árvore (para incluir `explore.js`) e o README («variações», minúsculo, que o grep não pega).
- **Registro e versão:** STATUS (versão, Em Progresso), IDEAS, CHANGELOG (2), DECISIONS, `package.json`, `package-lock.json` (2).
- Total: **34 edições** em **14 arquivos**, mais o arquivo novo e o `dist/` regenerado.

---

## Edição 0 — preparo e linha de base

1. `sha1sum src/core/explore.js specs/261112-exploracao.md meta/analises/261112-ANALISE-exploracao-e-ux.md meta/analises/_TEMPLATE.md ../261112-sonda-ui/behave.cjs ../261112-sonda-ui/package.json` → bate com o cabeçalho. Diferente: **PARE e reporte**.
2. `git status --short` → exatamente `?? meta/analises/`, `?? meta/workorders/261112-wo0003-exploracao.md`, `?? specs/261112-exploracao.md`, `?? src/core/explore.js`. Outra linha: **PARE e reporte**.
3. `npm run regress; echo "rc=$?"` → `OK — nenhuma chave antiga mudou`, `rc=0` (linha de base atual, antes de editar).

## Edição 1 — `src/core/generate.js` · importa o ciclo de exploracao

**Âncora** (import de `../generators/botanical.js`, último import do topo):

```
import { genLSysTree, genLSysKoch, genLSysDragon } from '../generators/botanical.js';
```

**Substituir por:**

```
import { genLSysTree, genLSysKoch, genLSysDragon } from '../generators/botanical.js';
import { variationSnapshots, applySnapshot, recordHistory } from './explore.js';
```

## Edição 2 — `src/core/generate.js` · variacoes Like this

**Âncora** (`generateVariations` e `applyVar` inteiras):

```
export function generateVariations() {
  const seeds = [state.seed, state.seed + 111, state.seed + 222, state.seed + 333];
  const pal = PALETTES[state.pal];
  const sw = state.sw;
  const thumbSz = 50;
  const tw = 60, th = 60;
  const cx = tw / 2, cy = th / 2, sz = Math.min(tw, th) * 0.44;

  for (let i = 0; i < 4; i++) {
    const c = generateContent(state.style, state.type, cx, cy, sz, state.comp, state.sym, seeds[i], pal, 0.8, 0);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${tw} ${th}"><rect width="${tw}" height="${th}" fill="#fff"/>${c}</svg>`;
    state.vars[i] = svg;
    state.vars[i + '_seed'] = seeds[i];
    document.getElementById('vt' + i).innerHTML = svg;
    document.getElementById('vt' + i).className = 'vthumb' + (i === state.activeVar ? ' active' : '');
  }
}

export function applyVar(i) {
  state.activeVar = i;
  if (state.vars[i + '_seed'] !== undefined) {
    state.seed = state.vars[i + '_seed'];
    document.getElementById('s-seed').value = state.seed;
    document.getElementById('sv-seed').textContent = state.seed;
  }
  for (let j = 0; j < 4; j++) document.getElementById('vt' + j).className = 'vthumb' + (j === i ? ' active' : '');
  doGen();
}
```

**Substituir por:**

```
export function generateVariations() {
  // Variações «Like this» (DEC-015): a 0 é o estado atual; as outras 3 mexem Complexity/Symmetry
  // ±20 pontos e trocam o seed (respeitando os cadeados). Antes eram só seed +111/+222/+333.
  const snaps = variationSnapshots();
  const tw = 60, th = 60;
  const cx = tw / 2, cy = th / 2, sz = Math.min(tw, th) * 0.44;

  for (let i = 0; i < 4; i++) {
    const v = snaps[i];
    const c = generateContent(v.style, v.type, cx, cy, sz, v.comp, v.sym, v.seed, PALETTES[v.pal], 0.8, 0);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${tw} ${th}"><rect width="${tw}" height="${th}" fill="#fff"/>${c}</svg>`;
    state.vars[i] = svg;
    state.vars[i + '_snap'] = v;
    const el = document.getElementById('vt' + i);
    el.innerHTML = svg;
    el.className = 'vthumb' + (i === state.activeVar ? ' active' : '');
    el.title = i === 0 ? 'Current' : `Like this — complexity ${Math.round(v.comp * 100)} · symmetry ${Math.round(v.sym * 100)} · seed ${v.seed}`;
  }
}

export function applyVar(i) {
  const v = state.vars[i + '_snap'];
  if (!v) return;
  // A escolhida vira a nova base: as variações se recalculam em volta dela, então o destaque volta à 0.
  state.activeVar = 0;
  applySnapshot(v);
  doGen();
  recordHistory();
}
```

## Edição 3 — `src/core/view.js` · FIX-003 enquadramento

**Âncora** (`fitToView` inteira):

```
export function fitToView() {
  const area = document.getElementById('canvas-area');
  const aw = area.clientWidth - 48, ah = area.clientHeight - 80;
  state.zoom = Math.min(aw / state.w, ah / state.h, 2);
  applyZoom();
}
```

**Substituir por:**

```
let fitRetries = 0;
export function fitToView() {
  const area = document.getElementById('canvas-area');
  const aw = area.clientWidth - 48, ah = area.clientHeight - 80;
  // FIX-003: sem área útil (aba em segundo plano, painel oculto) o zoom ia a 0 ou negativo e
  // nada o recalculava — o canvas ficava 0×0. Agora mantém o zoom atual e tenta de novo no
  // próximo quadro (até ~2 s); depois disso, o resize/visibilitychange de initExplore() refaz.
  if (aw <= 0 || ah <= 0) {
    if (fitRetries++ < 120 && typeof requestAnimationFrame === 'function') requestAnimationFrame(fitToView);
    return;
  }
  fitRetries = 0;
  state.zoom = Math.max(0.1, Math.min(aw / state.w, ah / state.h, 2));
  applyZoom();
}
```

## Edição 4 — `src/main.js` · importa explore

**Âncora** (import de `./core/export.js`):

```
import { xSVG, xPNG, copySVG } from './core/export.js';
```

**Substituir por:**

```
import { xSVG, xPNG, copySVG } from './core/export.js';
import { surprise, newSeed, undo, redo, toggleLock, live, initExplore } from './core/explore.js';
```

## Edição 5 — `src/main.js` · window com live e explore

**Âncora** (`Object.assign(window, …)` inteiro):

```
Object.assign(window, {
  setMode, doGenRandom, selectStyle, selectType, selectPal, selectFont, setRatio,
  doGen, zoom, toggleBg, toggleGrid, toggleDraw, xSVG, xPNG, copySVG, applyVar,
});
```

**Substituir por:**

```
// As escolhas discretas passam por live(): redesenham na hora e entram no histórico (DEC-015).
Object.assign(window, {
  setMode: live(setMode), doGenRandom, selectStyle: live(selectStyle), selectType: live(selectType),
  selectPal: live(selectPal), selectFont: live(selectFont), setRatio: live(setRatio),
  doGen, zoom, toggleBg, toggleGrid, toggleDraw, xSVG, xPNG, copySVG, applyVar,
  surprise: () => surprise(), newSeed: () => newSeed(), undo, redo, toggleLock,
});
```

## Edição 6 — `src/main.js` · inicia o ciclo

**Âncora** (linha `updateDimTag();` do init):

```
updateDimTag();
```

**Substituir por:**

```
updateDimTag();
initExplore();
```

## Edição 7 — `src/index.html` · barra do topo

**Âncora** (botão «↻ Regenerate» do topo):

```
    <button class="tb-btn" onclick="doGenRandom()">↻ Regenerate</button>
```

**Substituir por:**

```
    <button class="tb-btn" id="btn-undo" onclick="undo()" title="Undo (Ctrl+Z)" disabled>↶</button>
    <button class="tb-btn" id="btn-redo" onclick="redo()" title="Redo (Ctrl+Shift+Z)" disabled>↷</button>
    <button class="tb-btn" onclick="newSeed()" title="Same settings, new seed (R)">↻ New seed</button>
    <button class="tb-btn tb-btn-p" onclick="surprise()" title="Randomize everything that is not locked (Space)">🎲 Surprise</button>
```

## Edição 8 — `src/index.html` · cadeado style

**Âncora** (rótulo da seção «Art Style»):

```
<div class="sec-label">Art Style</div>
```

**Substituir por:**

```
<div class="sec-label">Art Style <button class="lock" data-lock="style" data-label="the style" onclick="toggleLock('style')"><svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2.5" y="5.5" width="7" height="5" rx="1"/><path d="M4 5.5V4a2 2 0 0 1 4 0v1.5"/></svg></button></div>
```

## Edição 9 — `src/index.html` · cadeado type

**Âncora** (rótulo da seção «Output Type»):

```
<div class="sec-label">Output Type</div>
```

**Substituir por:**

```
<div class="sec-label">Output Type <button class="lock" data-lock="type" data-label="the type" onclick="toggleLock('type')"><svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2.5" y="5.5" width="7" height="5" rx="1"/><path d="M4 5.5V4a2 2 0 0 1 4 0v1.5"/></svg></button></div>
```

## Edição 10 — `src/index.html` · cadeado pal

**Âncora** (rótulo da seção «Color Theme»):

```
<div class="sec-label">Color Theme</div>
```

**Substituir por:**

```
<div class="sec-label">Color Theme <button class="lock" data-lock="pal" data-label="the palette" onclick="toggleLock('pal')"><svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2.5" y="5.5" width="7" height="5" rx="1"/><path d="M4 5.5V4a2 2 0 0 1 4 0v1.5"/></svg></button></div>
```

## Edição 11 — `src/index.html` · cadeado comp

**Âncora** (fim da linha do slider `s-comp`):

```
<span class="sv" id="sv-comp">
```

**Substituir por:**

```
<button class="lock" data-lock="comp" data-label="Complexity" onclick="toggleLock('comp')"><svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2.5" y="5.5" width="7" height="5" rx="1"/><path d="M4 5.5V4a2 2 0 0 1 4 0v1.5"/></svg></button><span class="sv" id="sv-comp">
```

## Edição 12 — `src/index.html` · cadeado sym

**Âncora** (fim da linha do slider `s-sym`):

```
<span class="sv" id="sv-sym">
```

**Substituir por:**

```
<button class="lock" data-lock="sym" data-label="Symmetry" onclick="toggleLock('sym')"><svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2.5" y="5.5" width="7" height="5" rx="1"/><path d="M4 5.5V4a2 2 0 0 1 4 0v1.5"/></svg></button><span class="sv" id="sv-sym">
```

## Edição 13 — `src/index.html` · cadeado sw

**Âncora** (fim da linha do slider `s-sw`):

```
<span class="sv" id="sv-sw">
```

**Substituir por:**

```
<button class="lock" data-lock="sw" data-label="Stroke width" onclick="toggleLock('sw')"><svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2.5" y="5.5" width="7" height="5" rx="1"/><path d="M4 5.5V4a2 2 0 0 1 4 0v1.5"/></svg></button><span class="sv" id="sv-sw">
```

## Edição 14 — `src/index.html` · cadeado fill

**Âncora** (fim da linha do slider `s-fill`):

```
<span class="sv" id="sv-fill">
```

**Substituir por:**

```
<button class="lock" data-lock="fill" data-label="Fill opacity" onclick="toggleLock('fill')"><svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2.5" y="5.5" width="7" height="5" rx="1"/><path d="M4 5.5V4a2 2 0 0 1 4 0v1.5"/></svg></button><span class="sv" id="sv-fill">
```

## Edição 15 — `src/index.html` · cadeado seed

**Âncora** (fim da linha do slider `s-seed`):

```
<span class="sv" id="sv-seed">
```

**Substituir por:**

```
<button class="lock" data-lock="seed" data-label="Seed" onclick="toggleLock('seed')"><svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2.5" y="5.5" width="7" height="5" rx="1"/><path d="M4 5.5V4a2 2 0 0 1 4 0v1.5"/></svg></button><span class="sv" id="sv-seed">
```

## Edição 16 — `src/index.html` · botao do rodape vira Surprise

**Âncora** (botão «Generate» do rodapé do painel esquerdo):

```
<button class="gen-btn" id="gen-btn" onclick="doGen()">Generate</button>
```

**Substituir por:**

```
<button class="gen-btn" id="gen-btn" onclick="surprise()" title="Randomize everything that is not locked">🎲 Surprise me</button>
      <div class="kbd-hint">Space surprise · R new seed · Ctrl+Z undo · 🔒 keeps a setting</div>
```

## Edição 17 — `src/styles/main.css` · estilos do ciclo

**Âncora** (última regra do arquivo (`.tag`)):

```
  .tag { font-size: 8px; padding: 1px 5px; border-radius: 3px; background: var(--bg4); border: 1px solid var(--border); color: var(--txt3); }
```

**Substituir por:**

```
  .tag { font-size: 8px; padding: 1px 5px; border-radius: 3px; background: var(--bg4); border: 1px solid var(--border); color: var(--txt3); }

  /* Ciclo de exploração (DEC-015): cadeados, botões do topo, atalhos */
  .lock { background: none; border: none; padding: 0 2px; margin-left: 4px; cursor: pointer; color: var(--txt3); vertical-align: middle; line-height: 0; }
  .lock svg { width: 10px; height: 10px; fill: none; stroke: currentColor; stroke-width: 1.2; }
  .lock:hover { color: var(--txt2); }
  .lock.on { color: var(--accent); }
  .lock.on svg { fill: #c8a96e33; }
  .tb-btn:disabled { opacity: .35; cursor: default; border-color: var(--border); color: var(--txt3); }
  .tb-btn-p { border-color: var(--accent2); color: var(--accent); }
  .kbd-hint { margin-top: 8px; font-size: 8px; color: var(--txt3); text-align: center; letter-spacing: 0.06em; }
```

## Edição 18 — `meta/CONTEXT.md` · explore.js na arvore

**Âncora** (linha `export.js` da árvore de `src/core/`):

```
│   │   └── export.js            # getSVGString/xSVG/xPNG/copySVG
```

**Substituir por:**

```
│   │   ├── export.js            # getSVGString/xSVG/xPNG/copySVG
│   │   └── explore.js           # ciclo de exploração: surprise/newSeed/locks/undo/redo/«Like this»/prévia ao vivo (DEC-015)
```

## Edição 19 — `meta/CONTEXT.md` · PRNG e variacoes

**Âncora** (parágrafo «PRNG seeded»):

```
**PRNG seeded (`mkRand`):** usa xorshift multiplicativo. Seed idêntico + parâmetros idênticos = resultado idêntico sempre. Isso é central para as Variations (seeds seed, seed+111, seed+222, seed+333).
```

**Substituir por:**

```
**PRNG seeded (`mkRand`):** usa xorshift multiplicativo. Seed idêntico + parâmetros idênticos = resultado idêntico sempre. É o que torna o histórico (desfazer/refazer) e as variações «Like this» reproduzíveis: cada um guarda só o snapshot dos parâmetros, não o SVG (DEC-015).
```

## Edição 20 — `meta/CONTEXT.md` · Armadilha 8 lista atualizada

**Âncora** (Armadilha 8 (linha inteira)):

```
8. **Adicionar um novo handler `onclick=""` no HTML sem expor a função em `window`** *(nova — desde a modularização de 2026-07-07)* — `src/main.js` bundla tudo num IIFE; diferente do `<script>` clássico original, declarações de função dentro do bundle **não** vazam para o escopo global automaticamente. Qualquer função nova referenciada via `onclick="minhaFuncao()"` no `src/index.html` (estático) ou dentro de um template string em `buildStyleGrid`/`buildTypeChips`/`buildPalettes`/`buildFontChips`/`buildVariations` precisa ser adicionada ao `Object.assign(window, {...})` em `src/main.js` — senão o clique não faz nada, **sem erro no console**, o que torna esse bug fácil de não notar. Lista atual exposta: `setMode, doGenRandom, selectStyle, selectType, selectPal, selectFont, setRatio, doGen, zoom, toggleBg, toggleGrid, toggleDraw, xSVG, xPNG, copySVG, applyVar`. Ver DEC-010.
```

**Substituir por:**

```
8. **Adicionar um novo handler `onclick=""` no HTML sem expor a função em `window`** *(nova — desde a modularização de 2026-07-07)* — `src/main.js` bundla tudo num IIFE; diferente do `<script>` clássico original, declarações de função dentro do bundle **não** vazam para o escopo global automaticamente. Qualquer função nova referenciada via `onclick="minhaFuncao()"` no `src/index.html` (estático) ou dentro de um template string em `buildStyleGrid`/`buildTypeChips`/`buildPalettes`/`buildFontChips`/`buildVariations` precisa ser adicionada ao `Object.assign(window, {...})` em `src/main.js` — senão o clique não faz nada, **sem erro no console**, o que torna esse bug fácil de não notar. Lista atual exposta: `setMode, doGenRandom, selectStyle, selectType, selectPal, selectFont, setRatio, doGen, zoom, toggleBg, toggleGrid, toggleDraw, xSVG, xPNG, copySVG, applyVar, surprise, newSeed, undo, redo, toggleLock` — as escolhas discretas (`setMode`, `select*`, `setRatio`) entram embrulhadas por `live()` (DEC-015). Ver DEC-010.
```

## Edição 21 — `meta/CONTEXT.md` · sucesso sem Generate

**Âncora** (item «O que é sucesso» em «Contexto de Produto»):

```
- **O que é sucesso:** usuário clica "Generate", ajusta parâmetros, exporta SVG e usa direto no Figma/Canva/Inkscape sem retoques manuais.
```

**Substituir por:**

```
- **O que é sucesso:** usuário aperta Surprise (ou Espaço) até algo chamar atenção, trava o que gostou, refina nos sliders e nas variações «Like this», exporta SVG e usa direto no Figma/Canva/Inkscape sem retoques manuais.
```

## Edição 22 — `meta/GLOSSARY.md` · Variation + termos do ciclo

**Âncora** (item «Variation» em «Conceitos do projeto»):

```
- **Variation** — uma das 4 miniaturas geradas automaticamente com seeds offset (+0, +111, +222, +333) do seed atual. Clicar aplica o seed da variation ao estado principal.
```

**Substituir por:**

```
- **Variation («Like this»)** — uma das 4 miniaturas: a 0 é o estado atual; 1–3 mexem Complexity e Symmetry ±20 pontos e trocam o seed, respeitando os cadeados. Clicar adota os valores, e a escolhida vira a nova base. Até v0.4.0 eram só seeds +0/+111/+222/+333 (DEC-015).
- **Surprise** — sorteio de todos os parâmetros não travados (botão 🎲 e tecla Espaço); nunca repete o estado anterior (DEC-015).
- **Cadeado (lock)** — trava um parâmetro contra o Surprise (estilo, tipo, paleta, cada slider). Travar o tipo segura o estilo. New seed (R) ignora o cadeado do seed.
- **Histórico** — até 60 snapshots de parâmetros para desfazer/refazer (Ctrl+Z / Ctrl+Shift+Z); entra por ação, não por quadro de arraste.
```

## Edição 23 — `meta/GLOSSARY.md` · doGenRandom aposentado do botao

**Âncora** (item `doGenRandom()`):

```
- **`doGenRandom()`** — handler do botão "↻ Regenerate" desde v0.2.0 (FIX-001): sorteia `state.seed`, sincroniza slider/display, então chama `doGen()`. Torna o botão não-idempotente.
```

**Substituir por:**

```
- **`doGenRandom()`** — handler do antigo botão "↻ Regenerate" (v0.2.0, FIX-001): sorteia `state.seed` e chama `doGen()`. Desde v0.5.0 o botão do topo chama `newSeed()` (`src/core/explore.js`), que garante seed diferente e registra no histórico; `doGenRandom` segue exportado só por compatibilidade.
```

## Edição 24 — `README.md` · recursos do ciclo

**Âncora** (item «4 variações automáticas» em «O que ele faz»):

```
- **4 variações automáticas** a partir do seed atual — clique numa para adotá-la.
```

**Substituir por:**

```
- **🎲 Surprise** (tecla Espaço): sorteia estilo, tipo, paleta e parâmetros — nunca repete o anterior. **Cadeados** seguram o que você gostou.
- **4 variações «Like this»** em volta do resultado atual — clique numa para adotá-la.
- **Desfazer/refazer** (Ctrl+Z / Ctrl+Shift+Z) e **New seed** (R). Tudo redesenha na hora, sem botão de gerar.
```

## Edição 25 — `meta/STATUS.md` · versao 0.5.0

**Âncora** (parágrafo «Versão Atual»):

```
**[0.4.0]** — Flow Fields entregue (tipo `flow` no estilo Organic, DEC-013) e **F3 concluída**. Zero regressão nos 52 tipos anteriores (sonda antes/depois, hashes idênticos). GitHub Pages publicado (`https://joaolucas-nds.github.io/vectorforge/`, redirect de raiz para `dist/vectorforge.html`).
```

**Substituir por:**

```
**[0.5.0]** — Ciclo de exploração (Fase A da análise 261112): prévia ao vivo, Surprise, cadeados, New seed, desfazer/refazer e variações «Like this» (DEC-015); canvas vazio corrigido (FIX-003). F3 concluída em v0.4.0. GitHub Pages publicado (`https://joaolucas-nds.github.io/vectorforge/`).
```

## Edição 26 — `meta/STATUS.md` · Regenerate vira o ciclo

**Âncora** (item «↻ Regenerate» em «Funcionando»):

```
- **`↻ Regenerate`** sorteia seed novo a cada click (FIX-001).
```

**Substituir por:**

```
- **Ciclo de exploração (v0.5.0, DEC-015):** tudo redesenha na hora; 🎲 Surprise (Espaço) sorteia o que não estiver travado e nunca repete; cadeados; ↻ New seed (R); ↶ ↷ desfazer/refazer (60 estados); variações «Like this». FIX-001 segue valendo no New seed.
- **Canvas nunca abre vazio** (FIX-003): enquadramento com piso e re-enquadramento ao redimensionar/voltar a aba.
```

## Edição 27 — `meta/STATUS.md` · em progresso: B e C aguardam

**Âncora** (único item de «Em Progresso»):

```
- Nada em curso. F3 concluída em v0.4.0; F4 ainda não aberta — próxima frente a escolher com o dono (ROADMAP F4 ou backlog abaixo).
```

**Substituir por:**

```
- **Análise `meta/analises/261112-ANALISE-exploracao-e-ux.md`:** Fase A entregue em v0.5.0; Fases B (redesenho da UI) e C (variedade dentro do tipo) aguardam o Ponto de decisão do dono — idioma da UI, mockup antes de código, renumeração do ROADMAP.
```

## Edição 28 — `meta/IDEAS.md` · pedido do dono 2026-11-12

**Âncora** (último item de «Ideias Ativas — Usuário» (parágrafo do plugin Canva/Figma)):

```
Em vez de exportar arquivo, ter um plugin nativo que puxa o SVG gerado diretamente para o frame. Elevaria muito o valor de produto mas exigiria APIs de terceiros e processo de aprovação.
```

**Substituir por:**

```
Em vez de exportar arquivo, ter um plugin nativo que puxa o SVG gerado diretamente para o frame. Elevaria muito o valor de produto mas exigiria APIs de terceiros e processo de aprovação.

### 2026-11 — Mais variedade, aleatório para tudo e uma UI mais prática
Pedido de 2026-11-12: mais opções e variações; «apertar um botão e gerar um diferente do último»; configuração aleatória para tudo; mais possibilidades dentro de um mesmo tipo; UX/UI mais intuitiva, prática, profissional e completa, com pesquisa. Desdobrado em três fases na análise `meta/analises/261112-ANALISE-exploracao-e-ux.md`: **A** (ciclo de exploração) — entregue em v0.5.0, DEC-015; **B** (redesenho da UI: layout, seções recolhíveis, rótulos completos, seed digitável, estado na URL, favoritos, paleta aleatória harmônica) e **C** (modificadores universais de traço/camadas/espelho/deformação e sub-estilos por tipo) — aguardam decisão.
```

## Edição 29 — `meta/CHANGELOG.md` · FIX-003 em Corrigido

**Âncora** (último item do bloco [Não lançado] (README)):

```
- **`README.md`** de verdade (antes, uma linha com aspas literais): o que é o projeto, como abrir (GitHub Pages ou arquivo local), os 9 estilos e 53 tipos, recursos, desenvolvimento e estrutura.
```

**Substituir por:**

```
- **`README.md`** de verdade (antes, uma linha com aspas literais): o que é o projeto, como abrir (GitHub Pages ou arquivo local), os 9 estilos e 53 tipos, recursos, desenvolvimento e estrutura.

### Corrigido
- **FIX-003** — canvas podia abrir vazio (0×0 ou tamanho negativo) quando a página carregava sem área visível; `fitToView()` agora tem piso, tenta de novo no próximo quadro e re-enquadra ao redimensionar a janela ou voltar a aba.
```

## Edição 30 — `meta/CHANGELOG.md` · Nao lancado vira 0.5.0

**Âncora** (título `[Não lançado]` e o `### Adicionado` logo abaixo):

```
## [Não lançado]
### Adicionado
```

**Substituir por:**

```
## [Não lançado]
*(vazio)*

---

## [0.5.0] — {DATA}
### Adicionado
- **Ciclo de exploração** (`src/core/explore.js`, DEC-015): prévia ao vivo em todos os controles (sem botão de gerar); **🎲 Surprise** (Espaço) sorteia estilo, tipo, paleta e parâmetros sem nunca repetir o anterior; **cadeados** por parâmetro; **↻ New seed** (R); **desfazer/refazer** (Ctrl+Z / Ctrl+Shift+Z, 60 estados); variações **«Like this»** (±20 em Complexity/Symmetry + seed novo).
```

> Troque `{DATA}` pela saída de `date +%F`, rodado na hora.

## Edição 31 — `meta/DECISIONS.md` · DEC-015 e FIX-003 no fim

**Âncora** (última linha do arquivo (fim da DEC-014)):

```
- Fica de fora o que não passa por `generateContent` (pixel art, Text→Form com texto, Draw, export) — dito na própria saída do instrumento.
```

**Substituir por:**

```
- Fica de fora o que não passa por `generateContent` (pixel art, Text→Form com texto, Draw, export) — dito na própria saída do instrumento.


---

## DEC-015 — Ciclo de exploração: prévia ao vivo, Surprise com cadeados, histórico e «Like this», num módulo que não toca gerador
**Data:** 2026-11-12 · **Status:** aceita

### Contexto
Pedido do dono (2026-11-12): gerar «um diferente do último» com um botão, aleatório para tudo, mais variações. Diagnóstico na análise `meta/analises/261112-ANALISE-exploracao-e-ux.md`: nada redesenhava sem o botão Generate, o único acaso era o seed, as variações só trocavam o seed e não havia desfazer. Referências: o ciclo «espaço gera, cadeado trava, gera de novo» do Coolors; Randomize × «Like this» (±20%) do Generative Design da Autodesk; feedback imediato e ações reversíveis (Nielsen/NN/g).

### Decisão
1. **`src/core/explore.js`** concentra o ciclo e não toca gerador: muda `state`, os controles e chama `doGen()`. `generateContent` fica igual, e o `npm run regress` prova isso (0 mudanças).
2. **Prévia ao vivo:** escolhas discretas passam por `live()` (redesenha + histórico); sliders com debounce de 120 ms e histórico ao soltar.
3. **Surprise** sorteia em unidades de slider o que não estiver travado e repete até 8 vezes para nunca devolver o estado atual; travar o tipo segura o estilo. **New seed** ignora o cadeado do seed (ação explícita).
4. **Histórico** de snapshots de parâmetros (até 60), entrando por ação — não por quadro de arraste.
5. **«Like this»:** miniatura 0 = atual; 1–3 = ±20 pontos em Complexity/Symmetry + seed novo, determinístico pelo estado.
6. **Atalhos** Espaço, R, Ctrl+Z, Ctrl+Shift+Z/Ctrl+Y — ignorados enquanto se digita.

### Alternativas consideradas
- **Manter o botão Generate e só acrescentar Surprise** — rejeitada: mantém o atrito principal (controle que não responde).
- **Guardar o SVG no histórico** — rejeitada: o snapshot de parâmetros é reproduzível (DEC-003) e ocupa bytes, não dezenas de KB por estado.
- **Variações aleatórias a cada redesenho** — rejeitada: miniaturas que mudam sozinhas atrapalham a comparação.

### Consequências
- Rótulos novos em inglês, como o resto da UI; idioma é decisão da Fase B.
- Testado no protótipo (VM do chat): 18 checagens de comportamento em jsdom sobre o `dist` real, zero erros de JS, regress 0 mudanças.

---

## FIX-003 — Canvas abria vazio quando a página carregava sem área visível
**Data:** 2026-11-12 · **Status:** resolvida

- **Sintoma:** o SVG principal aparecia com 0×0 px (medido no painel do navegador do app desktop em 2026-11-12) ou com −80 px (jsdom, sem layout); as miniaturas apareciam normalmente; clicar em Fit resolvia.
- **Causa raiz:** `fitToView()` (`src/core/view.js`) calcula o zoom por `clientWidth/clientHeight` do `#canvas-area` sem piso; com a área ainda sem tamanho (aba em segundo plano, painel oculto), o zoom ia a 0 ou negativo, e nada recalculava depois — não havia listener de `resize`.
- **Solução:** sem área útil, `fitToView()` mantém o zoom e tenta de novo no próximo quadro (até ~2 s); zoom com piso de 0,1; `initExplore()` re-enquadra em `resize` e `visibilitychange`.
- **Lição:** cálculo de layout no carregamento precisa de piso e de gatilho para recalcular; o jsdom (área 0) reproduz o caso e serve de prova de vida.

```

## Edição 32 — `package.json` · versao 0.5.0

**Âncora** (campo `version`):

```
  "version": "0.4.0",
```

**Substituir por:**

```
  "version": "0.5.0",
```

## Edição 33 — `package-lock.json` · lock 1 de 2

**Âncora** (topo do arquivo):

```
  "name": "vectorforge",
  "version": "0.4.0",
```

**Substituir por:**

```
  "name": "vectorforge",
  "version": "0.5.0",
```

## Edição 34 — `package-lock.json` · lock 2 de 2

**Âncora** (entrada `packages[""]`):

```
      "name": "vectorforge",
      "version": "0.4.0",
```

**Substituir por:**

```
      "name": "vectorforge",
      "version": "0.5.0",
```

## Edição 35 — build

`npm run build` → `✓ dist/vectorforge.html gerado` (protótipo: 63.1 KB; antes: 56.6 KB). Erro: **PARE e reporte**.

---

## Fora de escopo

Fases B e C da análise; tradução da UI; qualquer gerador; renumerar o ROADMAP (é Ponto de decisão do dono); ajustar faixas de sorteio ou o ±20 do «Like this» — se algo parecer estranho, relate com print.

## Armadilhas desta WO

- **Edições 7–16 (`src/index.html`) e a 5 (`src/main.js`) contêm `onclick` com aspas simples dentro de aspas duplas** e um SVG inline do cadeado: copie o miolo exato do bloco, sem reformatar.
- **As Edições 29 e 30 tocam o mesmo bloco do CHANGELOG** em pontos diferentes: a 29 acrescenta `### Corrigido` depois do item do README e a 30 troca o título `[Não lançado]` por `[0.5.0]`; aplique na ordem.
- **`src/core/explore.js` importa `generate.js`, que passa a importar `explore.js`** (ciclo de import, como o `view.js` ↔ `generate.js` que já existe). O esbuild resolve; nenhuma função é chamada durante a avaliação dos módulos. Se o build ou o regress falharem com erro de inicialização, **PARE e reporte** — não reordene imports.

---

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` → ` M` em `README.md`, `meta/CHANGELOG.md`, `meta/CONTEXT.md`, `meta/DECISIONS.md`, `meta/GLOSSARY.md`, `meta/IDEAS.md`, `meta/STATUS.md`, `package-lock.json`, `package.json`, `src/core/generate.js`, `src/core/view.js`, `src/index.html`, `src/main.js`, `src/styles/main.css`, `dist/vectorforge.html` (**15 `M`**) e `??` em `meta/analises/`, `meta/workorders/261112-wo0003-exploracao.md`, `specs/261112-exploracao.md`, `src/core/explore.js` (**4 `??`**). Nada em `src/generators/` nem em `scripts/`.
- [ ] `npm run regress; echo "rc=$?"` → `mudaram: 0`, `OK — nenhuma chave antiga mudou`, `rc=0`. **Qualquer mudança: PARE** — a UI vazou para um gerador.
  - **Quem roda:** quem aplica. **Chega no ramo?** Não: o regress chama `generateContent`, que esta WO não muda — ele prova que nada mudou ali, **não** que o ciclo funciona. Quem testa o ciclo é o passo seguinte e o roteiro do dono.
- [ ] **Sonda de comportamento** (fora do repo, precisa de rede para instalar o jsdom): `cd ../261112-sonda-ui && npm install --no-audit --no-fund && node behave.cjs ../vectorforge/dist/vectorforge.html; cd ../vectorforge` → **18 linhas `OK`**, 0 `XX`, última `OK  zero erros de JS: []` (medido no protótipo). Linhas `Error: Not implemented: …` do jsdom (canvas, navegação) são do ambiente, não do app. **Sem rede para o `npm install`: diga isso no relatório e siga** — o roteiro do dono cobre o mesmo.
  - **Chega no ramo?** Sim: abre o `dist` gerado, dispara teclas e cliques reais (`keydown` Espaço/R/Ctrl+Z, `.click()` nos cadeados e miniaturas) e lê os sliders/chips. **Pergunta que NÃO responde:** «presta?» visual — o jsdom não desenha.
  - **Prova de vida do FIX-003** (mesma pasta): `node -e "const {JSDOM}=require('jsdom');const d=new JSDOM(require('fs').readFileSync('../vectorforge/dist/vectorforge.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true});setTimeout(()=>{console.log('width=',d.window.document.getElementById('main-svg').getAttribute('width'));process.exit(0)},700)"` → `width= 400` (no build ANTERIOR desta WO, o mesmo comando dá `width= -80` — medido pelo chat).
- [ ] `grep -c "^import { variationSnapshots, applySnapshot, recordHistory } from './explore.js';$" src/core/generate.js` → **1**; `grep -c "_seed" src/core/generate.js` → **0**.
- [ ] `grep -c 'data-lock="' src/index.html` → **8**; `grep -c 'onclick="doGenRandom()"\|onclick="doGen()"' src/index.html` → **0**.
- [ ] `grep -c "^initExplore();$" src/main.js` → **1**; `grep -c "FIX-003" src/core/view.js` → **1**.
- [ ] `grep -c '^  "version": "0.5.0",$' package.json` → **1**; `grep -c '"version": "0.5.0",' package-lock.json` → **2**.
- [ ] `grep -c "^## \[0.5.0\] — 20" meta/CHANGELOG.md` → **1**; `grep -c "{DATA}" meta/CHANGELOG.md` → **0**; `grep -c "^### Corrigido$" meta/CHANGELOG.md` → **2** (o novo do FIX-003 e o do 0.2.0).
- [ ] `grep -c "^## DEC-015 \|^## FIX-003 " meta/DECISIONS.md` → **2**.
- [ ] `grep -c "^\*\*\[0.5.0\]\*\* —" meta/STATUS.md` → **1**; `grep -c "^- \*\*\`↻ Regenerate\`\*\*" meta/STATUS.md` → **0**.
- [ ] `grep -c "^### 2026-11 — Mais variedade" meta/IDEAS.md` → **1**; `grep -c "^- \*\*Surprise\*\* —" meta/GLOSSARY.md` → **1**; `grep -c "🎲 Surprise" README.md` → **1**.
- [ ] Fora do repo: `../261112-sonda-ui/` (com `node_modules/` se o install rodou) — cite no relatório; nada mais aberto.

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · o que fugiu do texto literal · saída CRUA do regress (antes e depois), da sonda de comportamento e da prova de vida do FIX-003 · arquivos tocados · build · commit e push. Escreva DEPOIS de resolver o push.

## Commit — blocos separados, mensagem SEM acento

```
git add README.md meta/CHANGELOG.md meta/CONTEXT.md meta/DECISIONS.md meta/GLOSSARY.md meta/IDEAS.md meta/STATUS.md package-lock.json package.json src/core/generate.js src/core/view.js src/index.html src/main.js src/styles/main.css dist/vectorforge.html src/core/explore.js specs/261112-exploracao.md meta/analises/261112-ANALISE-exploracao-e-ux.md meta/analises/_TEMPLATE.md meta/workorders/261112-wo0003-exploracao.md
```

```
git commit -m "feat(ui): adiciona ciclo de exploracao (Surprise, cadeados, desfazer, Like this) e corrige canvas vazio" -m "src/core/explore.js: previa ao vivo, Surprise (Espaco) sem repetir o anterior, cadeados por parametro, New seed (R), desfazer/refazer (60 estados), variacoes Like this. FIX-003: fitToView com piso e re-enquadramento em resize/visibilitychange. Nenhum gerador tocado (regress 0 mudancas). Versao 0.5.0. Ver DEC-015, FIX-003 e WO 0003."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
