# WO 0005 — F5 lote 1: `npm run seeds` (sensibilidade ao seed) + lote Botânico (árvore estocástica, famílias de Koch e dragão) · v0.6.0

> **Tipo:** mista — gerador (Edições 1–7, só `src/generators/botanical.js`) + script + versão + registro.
> **Config sugerida:** modelo mais capaz (Opus) · `/effort medium` — o diff foi testado no protótipo, mas é mudança INTENCIONAL de saída: a conferência separa o que pode mudar do que não pode.
> **Pré-requisito:** commit `ccf8839`, `node_modules/` presente.
> **Base:** `specs/261115-seed-vivo-botanico.md`; DEC-016; prova visual `../261115-lote-botanico-8-seeds.png`.
> **Arquivos que o chat gravou no disco e esta WO versiona:**
>   - `scripts/seeds.mjs` — sha1 `52e955cd868cffee172887c33f4b6e8cae6c7208`
>   - `.claude/settings.json` — sha1 `e70ec889c355df8256b1716127018f07e0899b63`
>   - `specs/261115-seed-vivo-botanico.md` — sha1 `836d5f4dfba6c0eaf37d24123e7eab0779bd2f98`
> **`.claude/settings.json` foi regravado pelo chat** (ganhou `npm run seeds` e `node scripts/seeds.mjs` no `allow`). Só versione.
> **Âncora semântica:** trecho que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**.
> **Idempotência:** procure o texto NOVO INTEIRO. Nas Edições 4, 9, 15, 16, 17, 19, 20, 22, 27, 28, 29 a âncora fica dentro do texto novo; nas Edições 1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 18, 21, 23, 24, 25, 26 ela some (já aplicada = texto novo presente **e** âncora ausente). Já aplicada: **PULE** e diga no relatório.
> **Âncoras lidas em** (commit `ccf8839`; trecho = primeira linha da âncora):
>   - Edição 1 · `src/generators/botanical.js` — `export function turtleToPath(str, angleDeg, stepLen, startAngleDeg = -90) {`
>   - Edição 2 · `src/generators/botanical.js` — `    if (ch === 'F' || ch === 'G') {`
>   - Edição 3 · `src/generators/botanical.js` — `/**`
>   - Edição 4 · `src/generators/botanical.js` — `    for (const ch of str) next += (rules[ch] !== undefined) ? rules[ch] : ch;`
>   - Edição 5 · `src/generators/botanical.js` — `export function genLSysTree(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {`
>   - Edição 6 · `src/generators/botanical.js` — `/**`
>   - Edição 7 · `src/generators/botanical.js` — `/**`
>   - Edição 8 · `scripts/build.js` — `  html = html.replace('/*__STYLES__*/', css);`
>   - Edição 9 · `package.json` — `    "regress": "node scripts/regress.mjs"`
>   - Edição 10 · `package.json` — `  "version": "0.5.0",`
>   - Edição 11 · `package-lock.json` — `  "name": "vectorforge",`
>   - Edição 12 · `package-lock.json` — `      "name": "vectorforge",`
>   - Edição 13 · `meta/CONTEXT.md` — `│   └── regress-baseline.json    # linha de base versionada: 1 chave estilo/tipo/tamanho/s`
>   - Edição 14 · `meta/CONTEXT.md` — `| **botanical** | ´src/generators/botanical.js´ | tree, koch, dragon | ´genLSysTree´, ´gen`
>   - Edição 15 · `meta/CONTEXT.md` — `8. **Adicionar um novo handler ´onclick=""´ no HTML sem expor a função em ´window´** *(nov`
>   - Edição 16 · `meta/GLOSSARY.md` — `- **´npm run regress´ / linha de base** — instrumento ´scripts/regress.mjs´: renderiza as `
>   - Edição 17 · `CLAUDE.md` — `- Testes/validação: ´npm run regress´ — compara a saída de todas as combinações estilo×tip`
>   - Edição 18 · `CLAUDE.md` — `- ´npm ci´, ´npm run build´ e ´npm run regress´ já estão no ´allow´ de ´.claude/settings.j`
>   - Edição 19 · `meta/CEREBRO.md` — `- **Validação de código:** ´npm run regress´ (instrumento versionado, DEC-014) — todas as `
>   - Edição 20 · `README.md` — `npm run regress     # confere que nenhum gerador mudou de saída sem querer`
>   - Edição 21 · `meta/STATUS.md` — `**[0.5.0]** — Ciclo de exploração (Fase A da análise 261112): prévia ao vivo, Surprise, ca`
>   - Edição 22 · `meta/STATUS.md` — `- **Canvas nunca abre vazio** (FIX-003): enquadramento com piso e re-enquadramento ao redi`
>   - Edição 23 · `meta/STATUS.md` — `- **F5 — Variedade procedural** aberta em paralelo: próximo passo é o instrumento de sensi`
>   - Edição 24 · `meta/STATUS.md` — `- **O seed não muda o desenho em 46 dos 53 tipos** (medido em 2026-11-15, DEC-016): os ger`
>   - Edição 25 · `meta/ROADMAP.md` — `- [ ] Instrumento de sensibilidade ao seed (versionado, como o ´npm run regress´).`
>   - Edição 26 · `meta/ROADMAP.md` — `- [ ] Lote Botânico: árvore como L-System estocástico (prova de conceito pronta), dragon c`
>   - Edição 27 · `meta/CHANGELOG.md` — `## [Não lançado]`
>   - Edição 28 · `meta/DECISIONS.md` — `- O STATUS passa a listar o «seed morto» em «Quebrado / Com Problema» até a F5 fechar.`
>   - Edição 29 · `meta/IDEAS.md` — `### 2026-06-30 — Voronoi/Worley (F3 ou F4)`
> **Próximo comando:** `/wrap wo0005-seed-vivo-botanico`

> **Canal dos meta neste ciclo = CODE.** Esta WO É o registro.

---

## 1. Por que

O dono apontou que a árvore é sempre a mesma silhueta. Medido: o seed muda a estrutura em só 3 de 53 tipos. Esta WO cria o instrumento que mede isso (`npm run seeds`, catraca) e faz o primeiro lote da F5 no Botânico, onde o problema foi visto — com o resultado já prototipado e conferido a olho pelo chat (`../261115-lote-botanico-8-seeds.png`). De quebra, corrige o FIX-004: um defeito do build, existente desde julho, que a simulação desta WO revelou.

## Inventário — de onde saiu a lista de edições

- **Gerador:** `grep -n "^export function\|^function" src/generators/botanical.js` devolve **6** funções no commit `ccf8839`: `lsystemExpand` (ganha uma irmã estocástica logo depois — Edição 4), `turtleToPath` (jitter opcional — Edições 1 e 2), `fitToBox` (FIT — Edição 3), `genLSysTree`, `genLSysKoch`, `genLSysDragon` (Edições 5, 6, 7, com as docstrings). Nenhum outro arquivo de `src/` muda: o dispatcher (`generate.js`) já chama as três com `rnd`.
- **Script e versão:** `package.json` (script `seeds` + versão), `package-lock.json` (2).
- **Build (FIX-004):** `scripts/build.js`, 1 edição (Edição 8). Achado pela simulação desta WO: com o lote, o `dist/` saía com o JS quebrado porque o `String.replace` do build interpretava `$&` no bundle minificado. Ver FIX-004 (Edição 28) e Armadilha 9 (Edição 15).
- **Registro:** CONTEXT (árvore + Inventário), GLOSSARY, CLAUDE.md (2), CEREBRO, README, STATUS (4), ROADMAP (2), CHANGELOG, DECISIONS, IDEAS.
- Total: **29 edições** em **14 arquivos**, mais 3 arquivos do chat, 1 linha de base nova (`scripts/seeds-baseline.json`), a linha de base do regress regravada e o `dist/`.

---

## Edição 0 — preparo e prova de vida (antes de editar)

1. `sha1sum scripts/seeds.mjs .claude/settings.json specs/261115-seed-vivo-botanico.md` → bate com o cabeçalho. Diferente: **PARE**.
2. `git status --short` → exatamente ` M .claude/settings.json`, `?? meta/workorders/261115-wo0005-seed-vivo-botanico.md`, `?? scripts/seeds.mjs`, `?? specs/261115-seed-vivo-botanico.md`. Outra linha: **PARE**.
3. `npm run regress; echo "rc=$?"` → `OK — nenhuma chave antiga mudou`, `rc=0`.
4. **Prova de vida do instrumento:** `node scripts/seeds.mjs | grep "formas>1"; echo "rc=${PIPESTATUS[0]}"` → `formas>1 (o seed muda a estrutura): 3/53 · distintos>1 (o seed muda algum número): 7/53 · meta da F5: 53/53` e `rc=1` (sem linha de base ainda — esperado). Medido no protótipo; número diferente: relate o cru e **PARE**.

## Edição 1 — `src/generators/botanical.js` · turtleToPath com jitter opcional

**Âncora** (assinatura de `turtleToPath` e a primeira linha do corpo):

```
export function turtleToPath(str, angleDeg, stepLen, startAngleDeg = -90) {
  const angleRad = angleDeg * Math.PI / 180;
```

**Substituir por:**

```
export function turtleToPath(str, angleDeg, stepLen, startAngleDeg = -90, jitter = null) {
  // jitter (opcional, F5/DEC-017): { rnd, angleDeg, len } — cada giro ganha ±angleDeg/2 e cada passo
  // ±len/2 de variação, sorteados por `rnd`. Sem jitter o comportamento é o de sempre (nenhum rnd()).
  const angleRad = angleDeg * Math.PI / 180;
  const jA = jitter ? jitter.angleDeg * Math.PI / 180 : 0, jL = jitter ? jitter.len : 0;
  const turn = () => jitter ? angleRad + (jitter.rnd() - 0.5) * jA : angleRad;
  const step = () => jitter ? stepLen * (1 + (jitter.rnd() - 0.5) * jL) : stepLen;
```

## Edição 2 — `src/generators/botanical.js` · passos e giros usam o jitter

**Âncora** (ramos F/G/f/+/- do laço de `turtleToPath`):

```
    if (ch === 'F' || ch === 'G') {
      x += stepLen * Math.cos(angle); y += stepLen * Math.sin(angle);
      d += ` L ${f(x)} ${f(y)}`; track(x, y);
    } else if (ch === 'f') {
      x += stepLen * Math.cos(angle); y += stepLen * Math.sin(angle);
      d += ` M ${f(x)} ${f(y)}`; track(x, y);
    } else if (ch === '+') {
      angle += angleRad;
    } else if (ch === '-') {
      angle -= angleRad;
```

**Substituir por:**

```
    if (ch === 'F' || ch === 'G') {
      const L = step();
      x += L * Math.cos(angle); y += L * Math.sin(angle);
      d += ` L ${f(x)} ${f(y)}`; track(x, y);
    } else if (ch === 'f') {
      const L = step();
      x += L * Math.cos(angle); y += L * Math.sin(angle);
      d += ` M ${f(x)} ${f(y)}`; track(x, y);
    } else if (ch === '+') {
      angle += turn();
    } else if (ch === '-') {
      angle -= turn();
```

## Edição 3 — `src/generators/botanical.js` · enquadramento maior

**Âncora** (docstring de `fitToBox`, cabeçalho e cálculo da escala):

```
/**
 * Envolve o path bruto (coordenadas locais) num `<g transform>` que centraliza
 * e escala o desenho para caber no quadrado [cx±sz/2, cy±sz/2] — equivalente ao
 * que os outros geradores fazem manualmente ponto a ponto, mas aqui é mais
 * simples aplicar como uma única transformação de grupo.
 */
function fitToBox(pathResult, cx, cy, sz, extraAttrs) {
  const { d, minX, maxX, minY, maxY } = pathResult;
  const w = Math.max(maxX - minX, 0.001);
  const h = Math.max(maxY - minY, 0.001);
  const scale = (sz * 0.86) / Math.max(w, h);
```

**Substituir por:**

```
// Fração de `sz` que a maior dimensão do desenho ocupa. Era 0.86 (≈40% do canvas, porque sz é
// 0.46 do lado menor); 1.8 leva a ≈83%, como os geradores centrados (F5/DEC-017).
const FIT = 1.8;
/**
 * Envolve o path bruto (coordenadas locais) num `<g transform>` que centraliza
 * e escala o desenho para caber num quadrado de lado sz × FIT centrado em (cx, cy) — equivalente ao
 * que os outros geradores fazem manualmente ponto a ponto, mas aqui é mais
 * simples aplicar como uma única transformação de grupo.
 */
function fitToBox(pathResult, cx, cy, sz, extraAttrs) {
  const { d, minX, maxX, minY, maxY } = pathResult;
  const w = Math.max(maxX - minX, 0.001);
  const h = Math.max(maxY - minY, 0.001);
  const scale = (sz * FIT) / Math.max(w, h);
```

## Edição 4 — `src/generators/botanical.js` · L-System estocastico

**Âncora** (fim de `lsystemExpand`):

```
    for (const ch of str) next += (rules[ch] !== undefined) ? rules[ch] : ch;
    str = next;
  }
  return str;
}
```

**Substituir por:**

```
    for (const ch of str) next += (rules[ch] !== undefined) ? rules[ch] : ch;
    str = next;
  }
  return str;
}

/**
 * L-System ESTOCÁSTICO (F5/DEC-017): como `lsystemExpand`, mas uma regra pode trazer uma lista
 * de alternativas — a cada ocorrência do símbolo, `rnd` sorteia uma. É o que faz o seed mudar a
 * ESTRUTURA (quais galhos nascem onde), não só os números.
 * @param {string} axiom
 * @param {Object<string, string|string[]>} rules - símbolo → substituição ou lista de alternativas
 * @param {number} iterations
 * @param {() => number} rnd - PRNG semeado (mkRand)
 * @returns {string}
 */
export function lsystemExpandStochastic(axiom, rules, iterations, rnd) {
  let str = axiom;
  for (let i = 0; i < iterations; i++) {
    let next = '';
    for (const ch of str) {
      const r = rules[ch];
      next += r === undefined ? ch : Array.isArray(r) ? r[Math.floor(rnd() * r.length)] : r;
    }
    str = next;
  }
  return str;
}

/** Sorteia um item de uma lista com `rnd` (os presets por seed). */
const pickOne = (list, rnd) => list[Math.floor(rnd() * list.length)];
```

## Edição 5 — `src/generators/botanical.js` · arvore estocastica

**Âncora** (`genLSysTree` inteira):

```
export function genLSysTree(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const iterations = 3 + Math.round(comp * 3); // 3–6 iterações
  const angleDeg = 15 + sym * 20; // 15°–35°
  const rules = { F: 'FF', X: 'F-[[X]+X]+F[+FX]-X' };
  const expanded = lsystemExpand('X', rules, iterations);
  // stepLen decresce com a profundidade para não estourar o bounding box em iterações altas
  const stepLen = 8 / Math.pow(1.55, iterations - 3);
  const pathResult = turtleToPath(expanded, angleDeg, stepLen, -90);
  const g = fitToBox(pathResult, cx, cy, sz, SO);
  // Pontinhos nas pontas dos galhos teria custo de re-percorrer a string; mantido simples por ora.
  return g;
}
```

**Substituir por:**

```
export function genLSysTree(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  // F5/DEC-017: L-System estocástico — o seed escolhe, a cada galho, uma de 5 regras de
  // ramificação, decide se o tronco dobra, e perturba ângulo, comprimento e inclinação.
  // Antes o seed não mudava nada: a árvore tinha sempre a mesma silhueta.
  const iterations = 3 + Math.round(comp * 2); // 3–5 (a regra estocástica cresce mais rápido que a fixa)
  const angleDeg = 15 + sym * 20 + (rnd() - 0.5) * 8; // 15°–35° pelo Symmetry, ±4° pelo seed
  const lean = -90 + (rnd() - 0.5) * 16;             // inclinação do tronco: ±8°
  const rules = {
    X: ['F-[[X]+X]+F[+FX]-X', 'F+[[X]-X]-F[-FX]+X', 'F[+X]F[-X]+X', 'F[-X][+X]FX', 'FF-[-X+X+X]+[+X-X-X]'],
    F: ['FF', 'FF', 'FF', 'FF', 'F'],                 // o tronco às vezes não dobra: copas irregulares
  };
  const expanded = lsystemExpandStochastic('X', rules, iterations, rnd);
  const pathResult = turtleToPath(expanded, angleDeg, 8, lean, { rnd, angleDeg: 10, len: 0.4 });
  return fitToBox(pathResult, cx, cy, sz, SO);
}
```

## Edição 6 — `src/generators/botanical.js` · familia de Koch

**Âncora** (docstring + `genLSysKoch` inteira):

```
/**
 * Floco de neve de Koch (fechado, 3 lados). axioma "F--F--F" já desenha o
 * triângulo base fechando sozinho; regra F→F+F--F+F, ângulo fixo 60° (é o que
 * define a curva de Koch — mudar o ângulo produz outra curva, não uma
 * variação da mesma). `comp` controla iterações (detalhe da borda);
 * `sym` adiciona um jitter leve no ângulo via `rnd()` para variar sem
 * descaracterizar a curva.
 */
export function genLSysKoch(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const iterations = 1 + Math.round(comp * 3); // 1–4 iterações (5+ já é custoso e visualmente denso demais)
  const jitter = (rnd() - 0.5) * sym * 4; // até ±2° de variação
  const angleDeg = 60 + jitter;
  const rules = { F: 'F+F--F+F' };
  const expanded = lsystemExpand('F--F--F', rules, iterations);
  const stepLen = 60 / Math.pow(3, iterations);
  const pathResult = turtleToPath(expanded, angleDeg, stepLen, 0);
  const g = fitToBox(pathResult, cx, cy, sz, SO);
  return g;
}
```

**Substituir por:**

```
// Família de curvas de Koch (F5/DEC-017): o seed escolhe qual. `max` limita as iterações pelo
// fator de crescimento da regra (o SVG cresce `growth`^n vezes).
const KOCH_FAMILY = [
  { axiom: 'F--F--F',     rule: 'F+F--F+F',        angle: 60, max: 4 }, // floco de neve
  { axiom: 'F++F++F',     rule: 'F+F--F+F',        angle: 60, max: 4 }, // anti-floco (pontas para dentro)
  { axiom: 'F+F+F+F',     rule: 'F+F-F-F+F',       angle: 90, max: 4 }, // ilha quadrática de Koch
  { axiom: 'F+F+F+F',     rule: 'F-F+F+FF-F-F+F',  angle: 90, max: 3 }, // ilha de Minkowski
  { axiom: 'F+F+F+F+F+F', rule: 'F-F++F-F',        angle: 60, max: 4 }, // Koch sobre hexágono
];
/**
 * Família de Koch (F5/DEC-017). O seed escolhe uma de 5 curvas (floco de neve, anti-floco, ilha
 * quadrática, ilha de Minkowski, Koch sobre hexágono) e a orientação; dentro de cada uma o ângulo
 * continua fixo, porque é o que a define. `comp` controla as iterações (detalhe da borda, até o
 * teto da curva); `sym` adiciona um jitter leve no ângulo, como antes.
 */
export function genLSysKoch(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const k = pickOne(KOCH_FAMILY, rnd);
  const iterations = 1 + Math.round(comp * (k.max - 1));
  const jitter = (rnd() - 0.5) * sym * 4; // até ±2° de variação (papel do Symmetry, como antes)
  const rotate = Math.floor(rnd() * 12) * 15; // orientação sorteada em passos de 15°
  const expanded = lsystemExpand(k.axiom, { F: k.rule }, iterations);
  const pathResult = turtleToPath(expanded, k.angle + jitter, 10, rotate);
  return fitToBox(pathResult, cx, cy, sz, SO);
}
```

## Edição 7 — `src/generators/botanical.js` · familia dragao

**Âncora** (docstring + `genLSysDragon` inteira):

```
/**
 * Dragon curve (curva do dragão). axioma "FX", regras X→X+YF+, Y→-FX-Y,
 * ângulo fixo 90°. Só F desenha; X/Y são símbolos de controle da reescrita
 * (não aparecem no desenho). `comp` controla iterações — a curva cresce em
 * complexidade rapidamente (2^n segmentos), por isso o teto é mais baixo que
 * os outros dois presets. `sym` aqui não tem papel geométrico natural (a
 * curva é rígida por definição a 90°), então é usado para alternar entre FG/SO
 * a cada N segmentos, dando uma variação visual sem tocar na geometria.
 */
export function genLSysDragon(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const iterations = 8 + Math.round(comp * 4); // 8–12 iterações (14+ gera paths enormes sem ganho visual proporcional)
  const rules = { X: 'X+YF+', Y: '-FX-Y' };
  const expanded = lsystemExpand('FX', rules, iterations);
  const stepLen = 400 / Math.pow(1.41421356, iterations); // compensa o crescimento ~√2^n do diâmetro
  const pathResult = turtleToPath(expanded, 90, stepLen, 0);
  const g = fitToBox(pathResult, cx, cy, sz, SO);
  return g;
}
```

**Substituir por:**

```
// Família das curvas «dragão» (F5/DEC-017): o seed escolhe qual; `it` = iterações mínima e máxima
// (dobras), escolhidas para o SVG não passar de ~120 KB.
const DRAGON_FAMILY = [
  { axiom: 'FX',     rules: { X: 'X+YF+', Y: '-FX-Y' },   angle: 90,  it: [8, 12] }, // Heighway
  { axiom: 'FX+FX+', rules: { X: 'X+YF', Y: 'FX-Y' },     angle: 90,  it: [7, 11] }, // twindragon
  { axiom: 'F',      rules: { F: '+F--F+' },              angle: 45,  it: [8, 12] }, // curva C de Lévy
  { axiom: 'F',      rules: { F: 'F+F-F' },               angle: 120, it: [5, 8] },  // terdragon
  { axiom: 'F',      rules: { F: 'G-F-G', G: 'F+G+F' },   angle: 60,  it: [4, 7] },  // ponta de seta de Sierpiński
];
/**
 * Família das curvas «dragão» (F5/DEC-017). O seed escolhe uma de 5 (Heighway, twindragon, curva C
 * de Lévy, terdragon, ponta de seta de Sierpiński), a orientação e o sentido das dobras. Só F/G
 * desenham; X/Y são símbolos de reescrita. `comp` controla as dobras; `sym`, quantas cópias giradas
 * em volta do ponto de partida (1–4). Cada cópia a mais tira dobras, para o SVG não multiplicar.
 */
export function genLSysDragon(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const k = pickOne(DRAGON_FAMILY, rnd);
  // Symmetry = cópias giradas em volta do ponto de partida (1 a 4), como o Symmetry dos outros
  // estilos; antes a documentação prometia um papel para ele que o código não tinha.
  const copies = 1 + Math.round(sym * 3);
  // Orçamento de tamanho: cada cópia a mais tira dobras, para o SVG não multiplicar por 4.
  const budget = copies > 2 ? 2 : copies - 1;
  const iterations = Math.max(k.it[0] - budget, k.it[0] + Math.round(comp * (k.it[1] - k.it[0])) - budget);
  const expanded = lsystemExpand(k.axiom, k.rules, iterations);
  const start = Math.floor(rnd() * 8) * 45;
  const mirror = rnd() < 0.5 ? -1 : 1; // espelhado ou não: o seed também decide o sentido das dobras
  let d = '', minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let c = 0; c < copies; c++) {
    const r = turtleToPath(expanded, mirror * k.angle, 10, start + c * 360 / copies);
    d += (c ? ' ' : '') + r.d;
    minX = Math.min(minX, r.minX); maxX = Math.max(maxX, r.maxX); minY = Math.min(minY, r.minY); maxY = Math.max(maxY, r.maxY);
  }
  return fitToBox({ d, minX, maxX, minY, maxY }, cx, cy, sz, SO);
}
```

## Edição 8 — `scripts/build.js` · FIX-004 inlining por funcao

**Âncora** (passo 3 de `build()` (as duas substituições no template)):

```
  html = html.replace('/*__STYLES__*/', css);
  html = html.replace('//__SCRIPT__', js);
```

**Substituir por:**

```
  // FIX-004: substituição por FUNÇÃO. Com string, o String.replace interpreta `$&`, `$'`, `$\``, `$$`
  // no texto inserido — e o minificador pode gerar `$&&` (variável `$` seguida de `&&`): o `$&`
  // reinjetava o marcador `//__SCRIPT__` no meio do JS e comentava o resto da linha.
  html = html.replace('/*__STYLES__*/', () => css);
  html = html.replace('//__SCRIPT__', () => js);
  // Rede: o bundle e o CSS têm de entrar byte a byte; se não entraram, o arquivo distribuído quebrou.
  if (!html.includes(js) || !html.includes(css)) throw new Error('inlining falhou: o dist não contém o bundle inteiro');
```

## Edição 9 — `package.json` · script seeds

**Âncora** (entrada `regress` do bloco `scripts`):

```
    "regress": "node scripts/regress.mjs"
```

**Substituir por:**

```
    "regress": "node scripts/regress.mjs",
    "seeds": "node scripts/seeds.mjs"
```

## Edição 10 — `package.json` · versao 0.6.0

**Âncora** (campo `version`):

```
  "version": "0.5.0",
```

**Substituir por:**

```
  "version": "0.6.0",
```

## Edição 11 — `package-lock.json` · lock 1 de 2

**Âncora** (topo do arquivo):

```
  "name": "vectorforge",
  "version": "0.5.0",
```

**Substituir por:**

```
  "name": "vectorforge",
  "version": "0.6.0",
```

## Edição 12 — `package-lock.json` · lock 2 de 2

**Âncora** (entrada `packages[""]`):

```
      "name": "vectorforge",
      "version": "0.5.0",
```

**Substituir por:**

```
      "name": "vectorforge",
      "version": "0.6.0",
```

## Edição 13 — `meta/CONTEXT.md` · seeds na arvore

**Âncora** (linha `regress-baseline.json` da árvore):

```
│   └── regress-baseline.json    # linha de base versionada: 1 chave estilo/tipo/tamanho/seed por linha
```

**Substituir por:**

```
│   ├── regress-baseline.json    # linha de base versionada: 1 chave estilo/tipo/tamanho/seed por linha
│   ├── seeds.mjs                # instrumento de sensibilidade ao seed (`npm run seeds`, catraca, DEC-017)
│   └── seeds-baseline.json      # linha de base: distintos/formas por tipo em 40 seeds
```

## Edição 14 — `meta/CONTEXT.md` · inventario botanical

**Âncora** (linha `botanical` do Inventário de Geradores):

```
| **botanical** | `src/generators/botanical.js` | tree, koch, dragon | `genLSysTree`, `genLSysKoch`, `genLSysDragon` (motor generico reaproveitavel: `lsystemExpand`, `turtleToPath`) |
```

**Substituir por:**

```
| **botanical** | `src/generators/botanical.js` | tree, koch, dragon | `genLSysTree` (L-System estocástico: o seed escolhe regras e perturba ângulo/comprimento), `genLSysKoch` (família de 5 curvas de Koch, escolhida pelo seed), `genLSysDragon` (família de 5 curvas dragão; Symmetry = cópias giradas) — motor `lsystemExpand`/`lsystemExpandStochastic`/`turtleToPath` (DEC-011, DEC-017) |
```

## Edição 15 — `meta/CONTEXT.md` · Armadilha 9 inlining

**Âncora** (Armadilha 8 (linha inteira)):

```
8. **Adicionar um novo handler `onclick=""` no HTML sem expor a função em `window`** *(nova — desde a modularização de 2026-07-07)* — `src/main.js` bundla tudo num IIFE; diferente do `<script>` clássico original, declarações de função dentro do bundle **não** vazam para o escopo global automaticamente. Qualquer função nova referenciada via `onclick="minhaFuncao()"` no `src/index.html` (estático) ou dentro de um template string em `buildStyleGrid`/`buildTypeChips`/`buildPalettes`/`buildFontChips`/`buildVariations` precisa ser adicionada ao `Object.assign(window, {...})` em `src/main.js` — senão o clique não faz nada, **sem erro no console**, o que torna esse bug fácil de não notar. Lista atual exposta: `setMode, doGenRandom, selectStyle, selectType, selectPal, selectFont, setRatio, doGen, zoom, toggleBg, toggleGrid, toggleDraw, xSVG, xPNG, copySVG, applyVar, surprise, newSeed, undo, redo, toggleLock` — as escolhas discretas (`setMode`, `select*`, `setRatio`) entram embrulhadas por `live()` (DEC-015). Ver DEC-010.
```

**Substituir por:**

```
8. **Adicionar um novo handler `onclick=""` no HTML sem expor a função em `window`** *(nova — desde a modularização de 2026-07-07)* — `src/main.js` bundla tudo num IIFE; diferente do `<script>` clássico original, declarações de função dentro do bundle **não** vazam para o escopo global automaticamente. Qualquer função nova referenciada via `onclick="minhaFuncao()"` no `src/index.html` (estático) ou dentro de um template string em `buildStyleGrid`/`buildTypeChips`/`buildPalettes`/`buildFontChips`/`buildVariations` precisa ser adicionada ao `Object.assign(window, {...})` em `src/main.js` — senão o clique não faz nada, **sem erro no console**, o que torna esse bug fácil de não notar. Lista atual exposta: `setMode, doGenRandom, selectStyle, selectType, selectPal, selectFont, setRatio, doGen, zoom, toggleBg, toggleGrid, toggleDraw, xSVG, xPNG, copySVG, applyVar, surprise, newSeed, undo, redo, toggleLock` — as escolhas discretas (`setMode`, `select*`, `setRatio`) entram embrulhadas por `live()` (DEC-015). Ver DEC-010.

9. **Injetar código num template com `String.replace(marcador, texto)`** *(FIX-004, 2026-11-15)* — com STRING no segundo argumento, o `replace` interpreta `$&`, `$'`, `` $` `` e `$$` dentro do texto inserido; o minificador pode gerar `$&&` (uma variável chamada `$`), e o JS sai quebrado sem erro no build. → Sempre substituir por FUNÇÃO (`html.replace(m, () => js)`) e conferir que o resultado contém o texto inteiro (`scripts/build.js` já faz as duas coisas). O `npm run regress` e o `npm run seeds` NÃO pegam isso: testam o `src/`, não o `dist/` — quem pega é a sonda de interface ou `grep -c "//__SCRIPT__" dist/vectorforge.html` = 0.
```

## Edição 16 — `meta/GLOSSARY.md` · termos seeds e estocastico

**Âncora** (item `npm run regress` / linha de base):

```
- **`npm run regress` / linha de base** — instrumento `scripts/regress.mjs`: renderiza as 318 chaves (estilo/tipo/tamanho/seed) e compara o hash de cada uma com `scripts/regress-baseline.json`. Reprova (sai 1) se uma chave antiga muda, some ou oscila; chave nova não reprova. `--update` regrava a linha de base (DEC-014).
```

**Substituir por:**

```
- **`npm run regress` / linha de base** — instrumento `scripts/regress.mjs`: renderiza as 318 chaves (estilo/tipo/tamanho/seed) e compara o hash de cada uma com `scripts/regress-baseline.json`. Reprova (sai 1) se uma chave antiga muda, some ou oscila; chave nova não reprova. `--update` regrava a linha de base (DEC-014).
- **`npm run seeds` / sensibilidade ao seed** — instrumento `scripts/seeds.mjs`: por tipo, em 40 seeds com os mesmos sliders, conta **distintos** (SVGs diferentes) e **formas** (estruturas diferentes). Catraca: reprova se um tipo perde variedade; meta da F5 = formas>1 em 53/53 (DEC-017).
- **L-System estocástico** — L-System em que uma regra tem várias alternativas e o PRNG sorteia uma a cada ocorrência (`lsystemExpandStochastic`); é o que faz o seed mudar a estrutura da árvore.
```

## Edição 17 — `CLAUDE.md` · validacao inclui seeds

**Âncora** (item «Testes/validação»):

```
- Testes/validação: `npm run regress` — compara a saída de todas as combinações estilo×tipo com `scripts/regress-baseline.json` (DEC-014). Sai 1 se algo antigo mudou: PARE e reporte. Mudança **intencional** de gerador ou tipo novo: `npm run regress -- --update` e versione a linha de base no mesmo commit, dizendo no relatório quais chaves mudaram. O instrumento não vê aparência — visual é roteiro do dono.
```

**Substituir por:**

```
- Testes/validação: `npm run regress` — compara a saída de todas as combinações estilo×tipo com `scripts/regress-baseline.json` (DEC-014). Sai 1 se algo antigo mudou: PARE e reporte. Mudança **intencional** de gerador ou tipo novo: `npm run regress -- --update` e versione a linha de base no mesmo commit, dizendo no relatório quais chaves mudaram. O instrumento não vê aparência — visual é roteiro do dono.
- Variedade: `npm run seeds` — mede quanto o seed muda cada tipo (catraca: sai 1 se algum tipo PERDER variedade). Lote da F5 que aumenta variedade: `npm run seeds -- --update` e versione `scripts/seeds-baseline.json` no mesmo commit, citando o placar `formas>1: N/53` no relatório.
```

## Edição 18 — `CLAUDE.md` · allow com seeds

**Âncora** (último item de «Build / validação»):

```
- `npm ci`, `npm run build` e `npm run regress` já estão no `allow` de `.claude/settings.json`.
```

**Substituir por:**

```
- `npm ci`, `npm run build`, `npm run regress` e `npm run seeds` já estão no `allow` de `.claude/settings.json`.
```

## Edição 19 — `meta/CEREBRO.md` · tecnica seeds

**Âncora** (item «Validação de código» em «Técnicas específicas»):

```
- **Validação de código:** `npm run regress` (instrumento versionado, DEC-014) — todas as combinações estilo×tipo comparadas com `scripts/regress-baseline.json`; sai 1 se uma saída antiga mudou. Mudança intencional = `--update` + linha de base no mesmo commit. Não vê aparência: gerador novo ou ajustado pede roteiro visual do dono. (A comparação headless com Playwright de DEC-010/011 foi a origem.)
```

**Substituir por:**

```
- **Validação de código:** `npm run regress` (instrumento versionado, DEC-014) — todas as combinações estilo×tipo comparadas com `scripts/regress-baseline.json`; sai 1 se uma saída antiga mudou. Mudança intencional = `--update` + linha de base no mesmo commit. Não vê aparência: gerador novo ou ajustado pede roteiro visual do dono. (A comparação headless com Playwright de DEC-010/011 foi a origem.)
- **Variedade (F5):** `npm run seeds` mede, por tipo, quantas formas diferentes o seed produz (catraca, DEC-017). Gerador novo ou ajustado: o seed tem de mudar a ESTRUTURA (`formas>1`), não só os números; e o tamanho do pior caso (Complexity e Symmetry no máximo) cabe em ~120 KB.
```

## Edição 20 — `README.md` · comando seeds

**Âncora** (linha `npm run regress` do bloco de comandos):

```
npm run regress     # confere que nenhum gerador mudou de saída sem querer
```

**Substituir por:**

```
npm run regress     # confere que nenhum gerador mudou de saída sem querer
npm run seeds       # mede quanto o seed muda cada tipo (variedade)
```

## Edição 21 — `meta/STATUS.md` · versao 0.6.0

**Âncora** (parágrafo «Versão Atual»):

```
**[0.5.0]** — Ciclo de exploração (Fase A da análise 261112): prévia ao vivo, Surprise, cadeados, New seed, desfazer/refazer e variações «Like this» (DEC-015); canvas vazio corrigido (FIX-003). F3 concluída em v0.4.0. GitHub Pages publicado (`https://joaolucas-nds.github.io/vectorforge/`).
```

**Substituir por:**

```
**[0.6.0]** — F5, lote 1: o seed passa a mudar a forma da árvore, do Koch e do Dragon (L-System estocástico e famílias de curvas), que agora ocupam ~83% do canvas; instrumento `npm run seeds` (DEC-017). Antes, em v0.5.0: ciclo de exploração (DEC-015) e FIX-003. GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.
```

## Edição 22 — `meta/STATUS.md` · Funcionando: lote botanico

**Âncora** (item «Canvas nunca abre vazio» em «Funcionando»):

```
- **Canvas nunca abre vazio** (FIX-003): enquadramento com piso e re-enquadramento ao redimensionar/voltar a aba.
```

**Substituir por:**

```
- **Canvas nunca abre vazio** (FIX-003): enquadramento com piso e re-enquadramento ao redimensionar/voltar a aba.
- **Botânico variado (v0.6.0, DEC-017):** árvore estocástica (40 formas em 40 seeds), Koch em 5 curvas, Dragon em 5 curvas com Symmetry = cópias giradas. Medido por `npm run seeds`.
```

## Edição 23 — `meta/STATUS.md` · Em Progresso: F5 lote 1 feito

**Âncora** (item F5 em «Em Progresso»):

```
- **F5 — Variedade procedural** aberta em paralelo: próximo passo é o instrumento de sensibilidade ao seed e o lote Botânico (prova de conceito da árvore estocástica pronta).
```

**Substituir por:**

```
- **F5 — Variedade procedural:** lote 1 (instrumento + Botânico) entregue em v0.6.0 — placar `formas>1: 6/53`. Próximo: um lote por estilo (Art Deco, Barroco, Geométrico, Vitoriano, Celta, Islâmico, Minimal, Orgânico).
```

## Edição 24 — `meta/STATUS.md` · Quebrado: placar atualizado

**Âncora** (item do seed em «Quebrado / Com Problema»):

```
- **O seed não muda o desenho em 46 dos 53 tipos** (medido em 2026-11-15, DEC-016): os geradores originais não usam o `rnd`. Surprise, New seed e «Like this» só variam o que os sliders variam — a árvore, por exemplo, tem sempre a mesma silhueta. Tratado pela F5.
```

**Substituir por:**

```
- **O seed ainda não muda a forma em 47 dos 53 tipos** (placar `npm run seeds` em v0.6.0: formas>1 6/53; antes do lote 1 eram 3/53, e o seed não mexia em número nenhum em 46). Surprise, New seed e «Like this» só variam o que os sliders variam nesses tipos. Tratado pela F5, um lote por estilo.
```

## Edição 25 — `meta/ROADMAP.md` · instrumento feito

**Âncora** (item do instrumento na F5):

```
- [ ] Instrumento de sensibilidade ao seed (versionado, como o `npm run regress`).
```

**Substituir por:**

```
- [x] Instrumento de sensibilidade ao seed — `npm run seeds` (catraca), v0.6.0, DEC-017. Placar: formas>1 3/53 → 6/53.
```

## Edição 26 — `meta/ROADMAP.md` · lote botanico feito

**Âncora** (item do lote Botânico na F5):

```
- [ ] Lote Botânico: árvore como L-System estocástico (prova de conceito pronta), dragon com variação, enquadramento maior.
```

**Substituir por:**

```
- [x] Lote Botânico — árvore estocástica, família de Koch, família dragão (Symmetry = cópias), enquadramento ~83%. v0.6.0, DEC-017, `specs/261115-seed-vivo-botanico.md`.
```

## Edição 27 — `meta/CHANGELOG.md` · entrada 0.6.0

**Âncora** (bloco `[Não lançado]` vazio):

```
## [Não lançado]
*(vazio)*
```

**Substituir por:**

```
## [Não lançado]
*(vazio)*

---

## [0.6.0] — {DATA}
### Adicionado
- **`npm run seeds`** (`scripts/seeds.mjs`) — instrumento de sensibilidade ao seed: por tipo, quantos desenhos e quantas estruturas diferentes saem de 40 seeds; catraca contra perda de variedade. Ver DEC-017.

### Alterado
- **Botânico com variedade de verdade** (F5, lote 1): `tree` vira L-System estocástico (o seed escolhe a regra de cada galho e perturba ângulos, comprimentos e inclinação); `koch` sorteia entre 5 curvas (floco, anti-floco, ilha quadrática, Minkowski, hexágono) e a orientação; `dragon` sorteia entre 5 curvas (Heighway, twindragon, Lévy C, terdragon, Sierpiński), orientação e espelhamento, e o Symmetry passa a ser o número de cópias giradas. Os três ocupam ~83% do canvas (antes ~40%). Pior caso: tree 54 KB (antes 166 KB), koch 43 KB, dragon 111 KB.
- Linha de base do `npm run regress` regravada para as 18 chaves `botanical/*` (mudança intencional).

### Corrigido
- **FIX-004** — o build podia gerar um `dist/vectorforge.html` com o JavaScript quebrado: `scripts/build.js` injetava o bundle com `String.replace` e string, que interpreta `$&`; o minificador gerou `$&&` e o marcador voltou para o meio do código. Agora substitui por função e confere que o bundle entrou inteiro.
```

> Troque `{DATA}` pela saída de `date +%F`, rodado na hora.

## Edição 28 — `meta/DECISIONS.md` · DEC-017 no fim

**Âncora** (última linha do arquivo (fim da DEC-016)):

```
- O STATUS passa a listar o «seed morto» em «Quebrado / Com Problema» até a F5 fechar.
```

**Substituir por:**

```
- O STATUS passa a listar o «seed morto» em «Quebrado / Com Problema» até a F5 fechar.


---

## DEC-017 — Instrumento de sensibilidade ao seed (catraca) e lote Botânico: L-System estocástico e famílias de curvas
**Data:** 2026-11-15 · **Status:** aceita

### Contexto
F5 (DEC-016) começa pelo que o dono apontou: a árvore tem sempre a mesma silhueta. Medido no lote: o seed muda a estrutura em 3/53 tipos e algum número em 7/53. No Botânico, a árvore ignorava o seed, o Koch usava ±2° de ângulo e o Dragon ignorava seed e Symmetry (a docstring prometia o contrário). Os três ocupavam ~40% do canvas.

### Decisão
1. **`scripts/seeds.mjs` / `npm run seeds`**: por tipo, 40 seeds com sliders fixos; conta **distintos** e **formas** (elementos + contagem de comandos por path). **Catraca** contra `scripts/seeds-baseline.json`: perder variedade reprova; ganhar pede `--update`. Meta da F5: formas>1 em 53/53.
2. **Árvore = L-System estocástico** (`lsystemExpandStochastic`, função nova): 5 regras para X, tronco que às vezes não dobra, jitter de ângulo e comprimento na turtle (parâmetro opcional novo de `turtleToPath`), inclinação ±8°. Symmetry segue = ângulo.
3. **Koch e Dragon = famílias escolhidas pelo seed** (5 curvas cada), cada uma com seu ângulo próprio e teto de iterações pelo crescimento da regra. No Dragon, **Symmetry = cópias giradas (1–4)** com orçamento de dobras; o seed também escolhe orientação e espelhamento.
4. **`FIT = 1.8`** no enquadramento do Botânico (~83% do canvas).
5. **Compatibilidade:** `lsystemExpand` e `turtleToPath` sem o parâmetro novo produzem exatamente o que produziam.

### Alternativas consideradas
- **Meta fixa no instrumento (reprovar abaixo de 53/53)** — rejeitada: reprovaria até o último lote e ninguém leria o vermelho.
- **Métrica só por hash** — rejeitada como critério: o Koch já tinha 40 hashes distintos (jitter de ±2°) com o mesmo floco; hash mede «mudou um número», não «mudou o desenho».
- **Variar o ângulo do Koch/Dragon livremente** — rejeitada (como em DEC-011): o ângulo define a curva; variar a FAMÍLIA dá curvas reconhecíveis e diferentes.

### Consequências
- Placar depois do lote: formas>1 6/53, distintos>1 9/53. Pior caso de tamanho: tree 54 KB, koch 43 KB, dragon 111 KB.
- A métrica «formas» subconta curvas de mesmo número de segmentos (Dragon: 5 famílias, «formas» = 3). O instrumento diz que não olha aparência; o roteiro visual decide.
- Os outros estilos seguem um lote cada, com o mesmo par de redes: regress (só as chaves do lote mudam) + seeds (o lote ganha formas, ninguém perde).

---

## FIX-004 — O build gerava um `dist` com o JavaScript quebrado quando o minificador produzia `$&`
**Data:** 2026-11-15 · **Status:** resolvida

- **Sintoma:** na simulação da WO 0005, o `dist/vectorforge.html` não carregava (jsdom: `SyntaxError: Unexpected token '<'`), embora `npm run build` dissesse «gerado» e o regress e o seeds passassem.
- **Causa raiz:** `scripts/build.js` (DEC-010) fazia `html.replace('//__SCRIPT__', js)`. Com string no segundo argumento, `String.replace` interpreta `$&` como «o texto casado». O código novo do `turtleToPath` levou o esbuild a chamar uma variável de `$`, e o minificado ficou com `b<$&&($=b)`: o `$&` virou `//__SCRIPT__` no meio do JS, comentando o resto da linha. O defeito existia desde julho e dependia só do nome que o minificador escolhesse.
- **Solução:** `html.replace(marcador, () => texto)` para o CSS e o JS, e o build lança erro se o HTML final não contiver o bundle e o CSS inteiros.
- **Lição:** regress e seeds testam o `src/`, não o arquivo distribuído; a sonda de interface (jsdom sobre o `dist`) foi a única rede que pegou. Virou a Armadilha 9 do CONTEXT, e a conferência das WOs que mexem em `src/` passa a incluir `grep -c "//__SCRIPT__" dist/vectorforge.html` = 0.

```

## Edição 29 — `meta/IDEAS.md` · ideia: loader unico

**Âncora** (título da entrada «Voronoi/Worley» em «Ideias Ativas — Assistente»):

```
### 2026-06-30 — Voronoi/Worley (F3 ou F4)
```

**Substituir por:**

```
### 2026-11-15 — Unificar o loader de `regress.mjs` e `seeds.mjs`
Os dois instrumentos têm o mesmo bundle temporário com esbuild + stub de `document` (≈20 linhas duplicadas, decisão consciente do lote 1 da F5 para não mexer no regress junto). Extrair para `scripts/load-generators.mjs` quando um terceiro instrumento aparecer ou quando o stub precisar mudar.

### 2026-06-30 — Voronoi/Worley (F3 ou F4)
```

## Edição 30 — linhas de base e build (comandos, na ordem)

1. `npm run regress | grep -c "MUDOU: botanical/"` → **18**; `npm run regress | grep "MUDOU:" | grep -vc "MUDOU: botanical/"` → **0**. Qualquer chave fora de `botanical/*` mudou: **PARE e reporte** — o lote vazou.
2. `npm run regress -- --update` → `linha de base gravada: 318 chaves -> scripts/regress-baseline.json`; `npm run regress; echo "rc=$?"` → `OK`, `rc=0`.
3. `npm run seeds -- --update` → `linha de base gravada: 53 tipos · formas>1: 6/53 · distintos>1: 9/53` (medido no protótipo). Menos que 6: **PARE**.
4. `npm run seeds | grep -E "^botanical|formas>1"; echo "rc=${PIPESTATUS[0]}"` → `botanical/dragon 30 3`, `botanical/koch 40 4`, `botanical/tree 40 40` (deduzido para outra máquina: relate o cru, não pare se `tree` e `koch` tiverem formas>1), `rc=0`.
5. `npm run build` → `✓ dist/vectorforge.html gerado` (protótipo: 64.4 KB).

---

## Fora de escopo

Os outros 47 tipos; refatorar o loader comum (IDEAS); ajustar constantes do lote (faixas de jitter, famílias, FIT) — se algo parecer estranho no olho, relate com print.

## Armadilhas desta WO

- **Edições 5–7 contêm a docstring + a função inteira como âncora** (blocos de 10–15 linhas, LF). Se o Edit não casar o bloco inteiro, confira se o arquivo está em LF (`git ls-files --eol src/generators/botanical.js` → `w/lf`) antes de reportar.
- **A ordem do Edição 30 importa:** o regress só pode ser regravado DEPOIS do passo 1 provar que só `botanical/*` mudou.

---

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` → ` M` em `CLAUDE.md`, `README.md`, `meta/CEREBRO.md`, `meta/CHANGELOG.md`, `meta/CONTEXT.md`, `meta/DECISIONS.md`, `meta/GLOSSARY.md`, `meta/IDEAS.md`, `meta/ROADMAP.md`, `meta/STATUS.md`, `package-lock.json`, `package.json`, `scripts/build.js`, `src/generators/botanical.js`, `.claude/settings.json`, `dist/vectorforge.html`, `scripts/regress-baseline.json` (**17 `M`**) e `??` em `meta/workorders/261115-wo0005-seed-vivo-botanico.md`, `scripts/seeds.mjs`, `scripts/seeds-baseline.json`, `specs/261115-seed-vivo-botanico.md` (**4 `??`**). Só `src/generators/botanical.js` em `src/`.
- [ ] `git diff --stat -- scripts/regress-baseline.json` → **18** linhas trocadas (`18 insertions(+), 18 deletions(-)`; uma chave por linha). Mais que isso: **PARE**.
- [ ] `grep -c "^export function lsystemExpandStochastic" src/generators/botanical.js` → **1**; `grep -c "^const FIT = 1.8;$" src/generators/botanical.js` → **1**; `grep -c "^const KOCH_FAMILY\|^const DRAGON_FAMILY" src/generators/botanical.js` → **2**.
- [ ] `grep -c '"seeds": "node scripts/seeds.mjs"' package.json` → **1**; `grep -c '"version": "0.6.0",' package.json package-lock.json` → `package.json:1`, `package-lock.json:2`.
- [ ] `grep -c "^## \[0.6.0\] — 20" meta/CHANGELOG.md` → **1**; `grep -c "{DATA}" meta/CHANGELOG.md` → **0**; `grep -c "^## DEC-017 " meta/DECISIONS.md` → **1**.
- [ ] `grep -c "^- \[x\] Instrumento de sensibilidade\|^- \[x\] Lote Botânico" meta/ROADMAP.md` → **2**; `grep -c "^\*\*\[0.6.0\]\*\* —" meta/STATUS.md` → **1**; `grep -c "^- \*\*O seed ainda não muda a forma em 47 dos 53 tipos\*\*" meta/STATUS.md` → **1**.
- [ ] **FIX-004:** `grep -c "//__SCRIPT__" dist/vectorforge.html` → **0** (no build ANTIGO com este mesmo `src/` dá **1** — medido pelo chat: é o JS quebrado).
- [ ] A sonda de UI segue verde (nada de UI mudou; é a rede de que o bundle carrega — foi ela que pegou o FIX-004): `cd ../261112-sonda-ui && node behave.cjs ../vectorforge/dist/vectorforge.html | grep -c "^OK"; cd ../vectorforge` → **18**.
  - **Quem roda:** quem aplica. **Chega no ramo?** Só no carregamento do bundle — a sonda não seleciona o Botânico. **Pergunta que NÃO responde:** a aparência das curvas novas — é o roteiro do dono.

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · desvios · saída CRUA: prova de vida (Edição 0.4), as 18 chaves do regress, `seeds --update` e a tabela `^botanical` · arquivos tocados · build · commit e push.

## Commit — blocos separados, mensagem SEM acento

```
git add CLAUDE.md README.md meta/CEREBRO.md meta/CHANGELOG.md meta/CONTEXT.md meta/DECISIONS.md meta/GLOSSARY.md meta/IDEAS.md meta/ROADMAP.md meta/STATUS.md package-lock.json package.json scripts/build.js src/generators/botanical.js .claude/settings.json dist/vectorforge.html scripts/regress-baseline.json scripts/seeds.mjs scripts/seeds-baseline.json specs/261115-seed-vivo-botanico.md meta/workorders/261115-wo0005-seed-vivo-botanico.md
```

```
git commit -m "feat(botanical): seed passa a mudar a forma de tree, koch e dragon; adiciona npm run seeds" -m "tree vira L-System estocastico; koch e dragon sorteiam entre 5 curvas cada; dragon usa Symmetry como copias giradas; enquadramento ~83%. scripts/seeds.mjs mede variedade por tipo (catraca): formas>1 de 3/53 para 6/53. Linha de base do regress regravada para as 18 chaves botanical/*. Versao 0.6.0. Ver DEC-017 e WO 0005."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
