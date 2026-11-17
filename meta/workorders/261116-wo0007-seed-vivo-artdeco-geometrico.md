# WO 0007 — F5 lote 2: seed vivo no Art Deco e no Geométrico (12 tipos) · v0.7.0

> **Tipo:** mista — gerador (dois arquivos inteiros gravados pelo chat + Edições 1–7 em `utils.js`, `generic.js` e `generate.js`) + versão + linhas de base + registro.
> **Config sugerida:** modelo mais capaz (Opus) · `/effort medium` — o diff foi prototipado e medido, mas é mudança INTENCIONAL de saída: a conferência separa as 72 chaves que podem mudar das 246 que não podem.
> **Pré-requisito:** commit `1e644bf`, `node_modules/` presente.
> **Base:** `specs/261116-seed-vivo-artdeco-geometrico.md`; DEC-016, DEC-017; prova visual `../261116-lote2-artdeco-8-seeds.png`, `../261116-lote2-geometrico-8-seeds.png`, `../261116-lote2-geometrico-star-v2.png` (pasta-pai).
> **Arquivos que o chat gravou no disco e esta WO versiona:**
>   - `src/generators/artdeco.js` — sha1 `e31ef91a79cd2678468e9ed5cf6a462367adb88b`
>   - `src/generators/geometric.js` — sha1 `1adfb088550032a75e1a5b5360af4b2aa203c66b`
>   - `specs/261116-seed-vivo-artdeco-geometrico.md` — sha1 `6cdd6368198511003305a3a546898fc78e3f0efa`
> **`artdeco.js` e `geometric.js` foram reescritos INTEIROS pelo chat** (todas as funções dos dois arquivos mudam). Não edite: só confira o hash e versione.
> **Âncora semântica:** trecho que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**.
> **Idempotência:** procure o texto NOVO INTEIRO. Nas Edições 1, 13, 14, 15, 17, 21, 25, 26, 27 a âncora fica dentro do texto novo; nas Edições 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 18, 19, 20, 22, 23, 24 ela some (já aplicada = texto novo presente **e** âncora ausente). Já aplicada: **PULE** e diga no relatório.
> **Âncoras lidas em** (commit `1e644bf`; trecho = primeira linha da âncora):
>   - Edição 1 · `src/core/utils.js` — `  if (closed) d += ' Z';`
>   - Edição 2 · `src/generators/generic.js` — `import { TAU, f, pt, polyPath, starPath, mkRand } from '../core/utils.js';`
>   - Edição 3 · `src/generators/generic.js` — `  if (style === 'artdeco') {`
>   - Edição 4 · `src/generators/generic.js` — `  } else if (style === 'geo' || style === 'geometric') {`
>   - Edição 5 · `src/generators/generic.js` — `  const cell = 40 + Math.round((1 - comp) * 35);`
>   - Edição 6 · `src/core/generate.js` — `      frame:     () => genADFrame(0, 0, state.w, state.h, comp, n, rnd, SO, FG, sw),`
>   - Edição 7 · `src/core/generate.js` — `      mandala:      () => genMandala(cx, cy, sz, n, layers, comp, rnd, SO, FG, FG2, sw),`
>   - Edição 8 · `package.json` — `  "version": "0.6.0",`
>   - Edição 9 · `package-lock.json` — `  "name": "vectorforge",`
>   - Edição 10 · `package-lock.json` — `      "name": "vectorforge",`
>   - Edição 11 · `meta/CONTEXT.md` — `| **artdeco** | ´src/generators/artdeco.js´ | medallion, frame, divider, corner, pattern, `
>   - Edição 12 · `meta/CONTEXT.md` — `| **geometric** | ´src/generators/geometric.js´ | mandala, frame, divider, tessellation, s`
>   - Edição 13 · `meta/CONTEXT.md` — `**Padrão de reuso:** vários estilos reaproveitam geradores de outros (Celtic/Islamic reusa`
>   - Edição 14 · `meta/GLOSSARY.md` — `- **L-System estocástico** — L-System em que uma regra tem várias alternativas e o PRNG so`
>   - Edição 15 · `meta/CEREBRO.md` — `- **Variedade (F5):** ´npm run seeds´ mede, por tipo, quantas formas diferentes o seed pro`
>   - Edição 16 · `meta/STATUS.md` — `**[0.6.0]** — F5, lote 1: o seed passa a mudar a forma da árvore, do Koch e do Dragon (L-S`
>   - Edição 17 · `meta/STATUS.md` — `- **Botânico variado (v0.6.0, DEC-017):** árvore estocástica (40 formas em 40 seeds), Koch`
>   - Edição 18 · `meta/STATUS.md` — `- **F5 — Variedade procedural:** lote 1 (instrumento + Botânico) entregue em v0.6.0 — plac`
>   - Edição 19 · `meta/STATUS.md` — `- **Ordem das próximas frentes — NÃO decidida:** F5 lote 2 (Art Deco + Geométrico, sugerid`
>   - Edição 20 · `meta/STATUS.md` — `- **O seed ainda não muda a forma em 47 dos 53 tipos** (placar ´npm run seeds´ em v0.6.0: `
>   - Edição 21 · `meta/STATUS.md` — `- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (´genADMedallion´, ´genBQFrame´, etc.`
>   - Edição 22 · `meta/STATUS.md` — `**2026-11-15 (2)** - WO 0005 aplicada pelo Code (´c4d5146´, empurrado): v0.6.0, ´npm run s`
>   - Edição 23 · `meta/ROADMAP.md` — `**Critério de conclusão:** instrumento de sensibilidade ao seed com **53/53** tipos produz`
>   - Edição 24 · `meta/ROADMAP.md` — `- [ ] Um lote por estilo: Art Deco, Barroco, Geométrico, Vitoriano, Celta, Islâmico, Minim`
>   - Edição 25 · `meta/CHANGELOG.md` — `## [Não lançado]`
>   - Edição 26 · `meta/DECISIONS.md` — `- **Lição:** regress e seeds testam o ´src/´, não o arquivo distribuído; a sonda de interf`
>   - Edição 27 · `meta/IDEAS.md` — `### 2026-06-30 — Voronoi/Worley (F3 ou F4)`
> **Próximo comando:** `/wrap wo0007-seed-vivo-artdeco-geometrico`

> **Canal dos meta neste ciclo = CODE.** Esta WO É o registro.

---

## 1. Por que

O dono escolheu a F5 lote 2 (Art Deco + Geométrico) como próxima frente [relatado pelo dono, 2026-11-16]. Os 12 tipos desses estilos ignoravam o seed (`npm run seeds`: 1/1 em todos). Esta WO dá a cada tipo escolhas semeadas de estrutura — prototipadas, medidas e conferidas a olho pelo chat nos contact sheets da pasta-pai — sem mexer em Celta, Islâmico e Orgânico, que reusam quatro desses geradores.

## Inventário — de onde saiu a lista de edições

- **Geradores:** `grep -n "^export function" src/generators/artdeco.js src/generators/geometric.js` devolve **8** funções no commit `1e644bf` (4 + 4) — as 8 mudam, por isso os dois arquivos vêm inteiros do chat. `grep -n "style === .artdeco.\|style === .geo." src/generators/generic.js` devolve **4** linhas no HEAD: a abertura dos ramos `artdeco` e `geo` de `genDivider` (Edições 3 e 4) e as duas linhas de malha de `genPattern` (Edição 5, que reescreve o laço inteiro); a Edição 2 é o import. No dispatcher, só as 2 entradas que chamam geradores compartilhados mudam (Edições 6, 7): as outras 10 do lote já passam `rnd`.
- **Primitivas:** `core/utils.js` ganha 3 funções no fim (Edição 1).
- **Versão:** `package.json` (1), `package-lock.json` (2).
- **Registro:** CONTEXT (3), GLOSSARY, CEREBRO, STATUS (7), ROADMAP (2), CHANGELOG, DECISIONS, IDEAS.
- Total: **27 edições** em **13 arquivos**, mais 3 arquivos do chat, as duas linhas de base regravadas e o `dist/`.

---

## Edição 0 — preparo e prova de vida (antes de editar)

1. `sha1sum src/generators/artdeco.js src/generators/geometric.js specs/261116-seed-vivo-artdeco-geometrico.md` → bate com o cabeçalho. Diferente: **PARE**.
2. `git status --short` → exatamente ` M src/generators/artdeco.js`, ` M src/generators/geometric.js`, `?? meta/workorders/261116-wo0007-seed-vivo-artdeco-geometrico.md`, `?? specs/261116-seed-vivo-artdeco-geometrico.md`. Outra linha: **PARE**.
3. **Sem prova de vida a rodar aqui:** com os dois arquivos do chat já no disco, o bundle não compila até a Edição 1 (eles importam `pickOne`, `steppedDiamondPath` e `polygramPath`, que ela cria). O «antes» foi medido pelo chat no HEAD `1e644bf`: `npm run regress` OK (0 mudanças) e `formas>1 6/53 · distintos>1 9/53`.

## Edição 1 — `src/core/utils.js` · primitivas pickOne, steppedDiamondPath, polygramPath

**Âncora** (fim de `curvePath`, ultima funcao do arquivo):

```
  if (closed) d += ' Z';
  return d;
}
```

**Substituir por:**

```
  if (closed) d += ' Z';
  return d;
}
// ── Primitivas da F5 (variedade semeada, DEC-018) ────────────────────────────

/**
 * Sorteia um item da lista com o PRNG semeado. É a «escolha semeada» da F5: o seed decide
 * QUAL variante de motivo, arranjo ou acabamento entra, não só um número.
 * @template T
 * @param {T[]} list - alternativas (a ordem importa: mesmo seed, mesma escolha)
 * @param {() => number} rnd - PRNG semeado (mkRand)
 * @returns {T}
 */
export function pickOne(list, rnd) { return list[Math.floor(rnd() * list.length)]; }

/**
 * Losango em degraus («zigurate» Art Deco): sobe em `levels` degraus até o topo e espelha
 * para baixo. Com levels = 1 vira um retângulo; quanto mais degraus, mais escalonado.
 * @param {number} cx - centro x
 * @param {number} cy - centro y (linha de base do espelho)
 * @param {number} levels - quantidade de degraus por metade (>= 1)
 * @param {number} w0 - meia-largura da base
 * @param {number} h0 - altura de cada metade
 * @returns {string} atributo d de um path fechado
 */
export function steppedDiamondPath(cx, cy, levels, w0, h0) {
  const L = Math.max(1, Math.round(levels)), hs = h0 / L;
  const half = [];
  for (let k = 0; k < L; k++) { const wk = w0 * (1 - k / L); half.push([-wk, k * hs], [-wk, (k + 1) * hs]); }
  // metade de cima: sobe pela esquerda, desce pela direita; a de baixo é o espelho vertical
  const up = [...half.map(([x, y]) => [x, -y]), ...half.slice().reverse().map(([x, y]) => [-x, -y])];
  const down = up.map(([x, y]) => [-x, -y]);
  const pts = [...up, ...down].filter((p, i, a) => i === 0 || p[0] !== a[i - 1][0] || p[1] !== a[i - 1][1]);
  return 'M ' + pts.map(([x, y]) => `${f(cx + x)} ${f(cy + y)}`).join(' L ') + ' Z';
}

/**
 * Polígono estrelado {n/k}: liga cada vértice ao k-ésimo seguinte. Quando n e k têm divisor
 * comum, a figura se parte em mdc(n, k) laços (ex.: {6/2} = dois triângulos), cada um com seu M…Z.
 * @param {number} cx
 * @param {number} cy
 * @param {number} r - raio dos vértices
 * @param {number} n - número de vértices (>= 5 para haver estrela)
 * @param {number} k - salto (1 = polígono comum)
 * @param {number} [rot] - rotação inicial
 * @returns {string} atributo d
 */
export function polygramPath(cx, cy, r, n, k, rot = -Math.PI / 2) {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const g = gcd(n, k), len = n / g;
  let d = '';
  for (let s = 0; s < g; s++) {
    const pts = Array.from({ length: len }, (_, i) => pt(cx, cy, r, rot + ((s + i * k) % n) * TAU / n));
    d += (d ? ' ' : '') + 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + ' Z';
  }
  return d;
}
```

## Edição 2 — `src/generators/generic.js` · import das primitivas

**Âncora** (linha de import de `core/utils.js`):

```
import { TAU, f, pt, polyPath, starPath, mkRand } from '../core/utils.js';
```

**Substituir por:**

```
import { TAU, f, pt, polyPath, starPath, mkRand, pickOne, steppedDiamondPath } from '../core/utils.js';
```

## Edição 3 — `src/generators/generic.js` · genDivider: ramo artdeco com escolhas

**Âncora** (ramo `artdeco` de `genDivider`, ate a abertura do ramo `baroque`):

```
  if (style === 'artdeco') {
    parts.push(`<path d="M ${cx} ${f(cy - 12 - comp * 10)} L ${f(cx + 8 + comp * 6)} ${f(cy)} L ${cx} ${f(cy + 12 + comp * 10)} L ${f(cx - 8 - comp * 6)} ${f(cy)} Z" ${FG}/>`);
    const ns = 2 + Math.round(comp * 3);
    for (let i = 1; i <= ns; i++) {
      const off = 20 + i * 18;
      for (const dir of [-1, 1]) parts.push(`<rect x="${f(cx + dir * off - 5)}" y="${f(cy - 8 - comp * 4)}" width="10" height="${f(16 + comp * 8)}" ${SO}/>`);
    }
  } else if (style === 'baroque') {
```

**Substituir por:**

```
  if (style === 'artdeco') {
    // F5 lote 2 (DEC-018): o seed escolhe o miolo (losango · leque · zigurate), as peças
    // laterais (retângulos · chevrons · barras que afinam) e se há filetes extras
    const centerKind = pickOne(['diamond', 'fan', 'ziggurat'], rnd);
    const sideKind = pickOne(['rects', 'chevrons', 'bars'], rnd);
    if (rnd() < 0.5) for (const dy of [-4, 4]) parts.push(`<line x1="${x + 40}" y1="${f(cy + dy)}" x2="${w - 40}" y2="${f(cy + dy)}" ${SO}/>`);
    if (centerKind === 'fan') {
      // leque espelhado: meia-lua para cima e para baixo, com raios
      const R = 14 + comp * 12, k = 5 + Math.round(comp * 6);
      for (const up of [true, false]) {
        parts.push(`<path d="M ${f(cx - R)} ${f(cy)} A ${f(R)} ${f(R)} 0 0 ${up ? 1 : 0} ${f(cx + R)} ${f(cy)} Z" ${SO}/>`);
        for (let j = 1; j < k; j++) {
          const [ex, ey] = pt(cx, cy, R * 0.92, (up ? Math.PI : 0) + j * Math.PI / k);
          parts.push(`<line x1="${f(cx)}" y1="${f(cy)}" x2="${f(ex)}" y2="${f(ey)}" ${SO}/>`);
        }
      }
      parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(3 + comp * 2)}" ${FG}/>`);
    } else if (centerKind === 'ziggurat') {
      parts.push(`<path d="${steppedDiamondPath(cx, cy, 2 + Math.round(comp * 2), 10 + comp * 8, 12 + comp * 10)}" ${FG}/>`);
    } else {
      parts.push(`<path d="M ${cx} ${f(cy - 12 - comp * 10)} L ${f(cx + 8 + comp * 6)} ${f(cy)} L ${cx} ${f(cy + 12 + comp * 10)} L ${f(cx - 8 - comp * 6)} ${f(cy)} Z" ${FG}/>`);
    }
    const ns = 2 + Math.round(comp * 3);
    for (let i = 1; i <= ns; i++) {
      const off = 20 + i * 18;
      for (const dir of [-1, 1]) {
        const px = cx + dir * off;
        if (sideKind === 'chevrons') parts.push(`<polyline points="${f(px - dir * 4)},${f(cy - 6 - comp * 4)} ${f(px + dir * 4)},${f(cy)} ${f(px - dir * 4)},${f(cy + 6 + comp * 4)}" ${SO}/>`);
        else if (sideKind === 'bars') { const hh = (10 + comp * 6) * (1 - (i - 1) / (ns + 1)); parts.push(`<line x1="${f(px)}" y1="${f(cy - hh)}" x2="${f(px)}" y2="${f(cy + hh)}" ${SO}/>`); }
        else parts.push(`<rect x="${f(px - 5)}" y="${f(cy - 8 - comp * 4)}" width="10" height="${f(16 + comp * 8)}" ${SO}/>`);
      }
    }
  } else if (style === 'baroque') {
```

## Edição 4 — `src/generators/generic.js` · genDivider: ramo geo com escolhas

**Âncora** (ramo `geo` de `genDivider`, ate a abertura do ramo `victorian`):

```
  } else if (style === 'geo' || style === 'geometric') {
    const n2 = Math.round(4 + sym * 6);
    parts.push(`<path d="${starPath(cx, cy, 16 + comp * 12, 7 + comp * 5, n2)}" ${SO}/>`);
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(4 + comp * 3)}" ${FG}/>`);
    const ns = 2 + Math.round(comp * 3);
    for (let i = 1; i <= ns; i++) {
      const off = 28 + i * 14;
      for (const dir of [-1, 1]) parts.push(`<circle cx="${f(cx + dir * off)}" cy="${f(cy)}" r="${f(3 + comp * 2)}" ${SO}/>`);
    }
  } else if (style === 'victorian') {
```

**Substituir por:**

```
  } else if (style === 'geo' || style === 'geometric') {
    // F5 lote 2 (DEC-018): o seed escolhe o miolo (estrela · polígonos encaixados · anéis ·
    // losango) e as peças laterais (círculos · polígonos · losangos · traços que encurtam)
    const centerKind = pickOne(['star', 'nested', 'rings', 'rhombus'], rnd);
    const sideKind = pickOne(['circles', 'polys', 'diamonds', 'ticks'], rnd);
    const n2 = Math.round(4 + sym * 6);
    const R = 16 + comp * 12;
    if (centerKind === 'nested') {
      parts.push(`<path d="${polyPath(cx, cy, R, n2)}" ${SO}/>`);
      parts.push(`<path d="${polyPath(cx, cy, R * 0.6, n2, -Math.PI / 2 + Math.PI / n2)}" ${SO}/>`);
    } else if (centerKind === 'rings') {
      parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R)}" ${SO}/>`);
      parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R * 0.65)}" ${SO}/>`);
    } else if (centerKind === 'rhombus') {
      parts.push(`<path d="M ${f(cx)} ${f(cy - R)} L ${f(cx + R * 0.6)} ${f(cy)} L ${f(cx)} ${f(cy + R)} L ${f(cx - R * 0.6)} ${f(cy)} Z" ${SO}/>`);
    } else {
      parts.push(`<path d="${starPath(cx, cy, R, 7 + comp * 5, n2)}" ${SO}/>`);
    }
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(4 + comp * 3)}" ${FG}/>`);
    const ns = 2 + Math.round(comp * 3);
    for (let i = 1; i <= ns; i++) {
      const off = 28 + i * 14;
      for (const dir of [-1, 1]) {
        const px = cx + dir * off, r = 3 + comp * 2;
        if (sideKind === 'polys') parts.push(`<path d="${polyPath(px, cy, r * 1.2, Math.max(3, Math.round(n2 / 2)))}" ${SO}/>`);
        else if (sideKind === 'diamonds') parts.push(`<path d="M ${f(px)} ${f(cy - r)} L ${f(px + r)} ${f(cy)} L ${f(px)} ${f(cy + r)} L ${f(px - r)} ${f(cy)} Z" ${FG}/>`);
        else if (sideKind === 'ticks') { const hh = r * 2 * (1 - (i - 1) / (ns + 1)); parts.push(`<line x1="${f(px)}" y1="${f(cy - hh)}" x2="${f(px)}" y2="${f(cy + hh)}" ${SO}/>`); }
        else parts.push(`<circle cx="${f(px)}" cy="${f(cy)}" r="${f(r)}" ${SO}/>`);
      }
    }
  } else if (style === 'victorian') {
```

## Edição 5 — `src/generators/generic.js` · genPattern: motivo e malha semeados (artdeco/geo)

**Âncora** (laco de celulas de `genPattern`, da linha `const cell` ao fim do laco):

```
  const cell = 40 + Math.round((1 - comp) * 35);
  for (let row = -1; row <= Math.ceil(h / cell) + 1; row++) {
    for (let col = -1; col <= Math.ceil(w / cell) + 1; col++) {
      const offset = (style === 'geo' || style === 'girih') ? (row % 2 === 0 ? 0 : cell / 2) : 0;
      const cx = col * cell + cell / 2 + offset;
      const cy = row * (style === 'geo' ? cell * 0.866 : cell) + cell / 2;
      if (cx < -cell || cx > w + cell || cy < -cell || cy > h + cell) continue;
      const n = style === 'girih' || style === 'islamic' ? 6 : Math.round(3 + sym * 4);
      parts.push(`<path d="${polyPath(cx, cy, cell * 0.47, n)}" ${SO}/>`);
      parts.push(`<path d="${polyPath(cx, cy, cell * 0.22, n, Math.PI / n)}" ${FG}/>`);
    }
  }
```

**Substituir por:**

```
  const cell = 40 + Math.round((1 - comp) * 35);
  // F5 lote 2 (DEC-018): Art Deco e Geométrico sorteiam o motivo e a malha; girih e islamic
  // seguem fixos (não consomem o seed). O motivo original de cada um é uma das opções.
  const motif = style === 'artdeco' ? pickOne(['polygon', 'scallop', 'fan', 'chevron'], rnd)
    : style === 'geo' ? pickOne(['polygon', 'star', 'truchet', 'rosette'], rnd) : 'polygon';
  let grid = style === 'artdeco' ? pickOne(['square', 'brick'], rnd)
    : style === 'geo' ? pickOne(['tri', 'square'], rnd) : (style === 'girih' ? 'brick' : 'square');
  if (motif === 'truchet') grid = 'square'; // o Truchet só fecha os arcos em malha quadrada
  const n = style === 'girih' || style === 'islamic' ? 6 : Math.round(3 + sym * 4);
  for (let row = -1; row <= Math.ceil(h / cell) + 1; row++) {
    for (let col = -1; col <= Math.ceil(w / cell) + 1; col++) {
      const offset = grid !== 'square' ? (row % 2 === 0 ? 0 : cell / 2) : 0;
      const cx = col * cell + cell / 2 + offset;
      const cy = row * (grid === 'tri' ? cell * 0.866 : cell) + cell / 2;
      if (cx < -cell || cx > w + cell || cy < -cell || cy > h + cell) continue;
      const c2 = cell / 2;
      if (motif === 'scallop') {
        // escama: arco grande vazado com meia-lua cheia dentro
        parts.push(`<path d="M ${f(cx - c2)} ${f(cy)} A ${f(c2)} ${f(c2)} 0 0 1 ${f(cx + c2)} ${f(cy)}" ${SO}/>`);
        parts.push(`<path d="M ${f(cx - c2 / 2)} ${f(cy)} A ${f(c2 / 2)} ${f(c2 / 2)} 0 0 1 ${f(cx + c2 / 2)} ${f(cy)} Z" ${FG}/>`);
      } else if (motif === 'fan') {
        const R = cell * 0.45;
        parts.push(`<path d="M ${f(cx - R)} ${f(cy)} A ${f(R)} ${f(R)} 0 0 1 ${f(cx + R)} ${f(cy)} Z" ${SO}/>`);
        // raios num só path (M…L por raio): um elemento por célula em vez de n, o padrão cobre o canvas inteiro
        let d = '';
        for (let j = 1; j <= n; j++) {
          const [ex, ey] = pt(cx, cy, R, Math.PI + j * Math.PI / (n + 1));
          d += `M ${f(cx)} ${f(cy)} L ${f(ex)} ${f(ey)} `;
        }
        parts.push(`<path d="${d.trim()}" ${SO}/>`);
      } else if (motif === 'chevron') {
        for (const dy of [-cell * 0.15, cell * 0.15]) parts.push(`<polyline points="${f(cx - c2)},${f(cy + dy - cell * 0.15)} ${f(cx)},${f(cy + dy + cell * 0.15)} ${f(cx + c2)},${f(cy + dy - cell * 0.15)}" ${SO}/>`);
      } else if (motif === 'star') {
        parts.push(`<path d="${starPath(cx, cy, cell * 0.47, cell * 0.2, n)}" ${SO}/>`);
        parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(cell * 0.08)}" ${FG}/>`);
      } else if (motif === 'truchet') {
        // ladrilho de Truchet: dois quartos de círculo em cantos opostos; o seed gira cada ladrilho
        const x0 = cx - c2, y0 = cy - c2, x1 = cx + c2, y1 = cy + c2;
        if (rnd() < 0.5) {
          parts.push(`<path d="M ${f(x0 + c2)} ${f(y0)} A ${f(c2)} ${f(c2)} 0 0 1 ${f(x0)} ${f(y0 + c2)}" ${SO}/>`);
          parts.push(`<path d="M ${f(x1 - c2)} ${f(y1)} A ${f(c2)} ${f(c2)} 0 0 1 ${f(x1)} ${f(y1 - c2)}" ${SO}/>`);
        } else {
          parts.push(`<path d="M ${f(x1 - c2)} ${f(y0)} A ${f(c2)} ${f(c2)} 0 0 0 ${f(x1)} ${f(y0 + c2)}" ${SO}/>`);
          parts.push(`<path d="M ${f(x0 + c2)} ${f(y1)} A ${f(c2)} ${f(c2)} 0 0 0 ${f(x0)} ${f(y1 - c2)}" ${SO}/>`);
        }
      } else if (motif === 'rosette') {
        parts.push(`<path d="${polyPath(cx, cy, cell * 0.47, n)}" ${SO}/>`);
        parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(cell * 0.47 * Math.cos(Math.PI / n))}" ${SO}/>`);
        parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(cell * 0.1)}" ${FG}/>`);
      } else {
        parts.push(`<path d="${polyPath(cx, cy, cell * 0.47, n)}" ${SO}/>`);
        parts.push(`<path d="${polyPath(cx, cy, cell * 0.22, n, Math.PI / n)}" ${FG}/>`);
      }
    }
  }
```

## Edição 6 — `src/core/generate.js` · dispatcher: artdeco/frame liga vary

**Âncora** (entrada `frame` do bloco `artdeco`):

```
      frame:     () => genADFrame(0, 0, state.w, state.h, comp, n, rnd, SO, FG, sw),
```

**Substituir por:**

```
      frame:     () => genADFrame(0, 0, state.w, state.h, comp, n, rnd, SO, FG, sw, true),
```

## Edição 7 — `src/core/generate.js` · dispatcher: geometric/mandala liga vary

**Âncora** (entrada `mandala` do bloco `geometric`):

```
      mandala:      () => genMandala(cx, cy, sz, n, layers, comp, rnd, SO, FG, FG2, sw),
```

**Substituir por:**

```
      mandala:      () => genMandala(cx, cy, sz, n, layers, comp, rnd, SO, FG, FG2, sw, true),
```

## Edição 8 — `package.json` · versao 0.7.0

**Âncora** (campo version):

```
  "version": "0.6.0",
```

**Substituir por:**

```
  "version": "0.7.0",
```

## Edição 9 — `package-lock.json` · versao 0.7.0 (raiz)

**Âncora** (topo do arquivo):

```
  "name": "vectorforge",
  "version": "0.6.0",
```

**Substituir por:**

```
  "name": "vectorforge",
  "version": "0.7.0",
```

## Edição 10 — `package-lock.json` · versao 0.7.0 (pacote raiz)

**Âncora** (entrada `packages[""]`):

```
      "name": "vectorforge",
      "version": "0.6.0",
```

**Substituir por:**

```
      "name": "vectorforge",
      "version": "0.7.0",
```

## Edição 11 — `meta/CONTEXT.md` · Inventario: Art Deco com escolhas semeadas

**Âncora**:

```
| **artdeco** | `src/generators/artdeco.js` | medallion, frame, divider, corner, pattern, ornament | `genADMedallion`, `genADFrame`, `genDivider('artdeco')`†, `genADCorner`, `genPattern('artdeco')`†, `genADOrn` |
```

**Substituir por:**

```
| **artdeco** | `src/generators/artdeco.js` | medallion, frame, divider, corner, pattern, ornament | `genADMedallion`, `genADFrame`, `genDivider('artdeco')`†, `genADCorner`, `genPattern('artdeco')`†, `genADOrn` — o seed escolhe variante de motivo, arranjo e acabamento em todos os tipos (DEC-018); `genADFrame` só varia com `vary = true`, que só o Art Deco passa |
```

## Edição 12 — `meta/CONTEXT.md` · Inventario: Geometrico com escolhas semeadas

**Âncora**:

```
| **geometric** | `src/generators/geometric.js` | mandala, frame, divider, tessellation, star, symbol | `genMandala`, `genGeoFrame`, `genDivider('geo')`†, `genPattern('geo')`†, `genGeoStar`, `genGeoSymbol` |
```

**Substituir por:**

```
| **geometric** | `src/generators/geometric.js` | mandala, frame, divider, tessellation, star, symbol | `genMandala`, `genGeoFrame`, `genDivider('geo')`†, `genPattern('geo')`†, `genGeoStar`, `genGeoSymbol` — o seed escolhe variante de motivo, arranjo e acabamento em todos os tipos (DEC-018); `genMandala` só varia com `vary = true`, que só o Geométrico passa |
```

## Edição 13 — `meta/CONTEXT.md` · Padrao de reuso: vary

**Âncora**:

```
**Padrão de reuso:** vários estilos reaproveitam geradores de outros (Celtic/Islamic reusam `genADFrame`/`genMandala` com parâmetros diferentes; Victorian reusa `genBQAcanthus`/`genBQCartouche`). Isso é intencional — reduz duplicação — mas significa que uma mudança em `genADFrame`, por exemplo, afeta visualmente Art Deco **e** Celtic **e** Islamic ao mesmo tempo. Conferir todos os estilos que reusam antes de alterar um gerador compartilhado. Como o reuso é sempre wireado em `generate.js` (nunca dentro do arquivo do estilo em si), basta grepar `generate.js` por `genXxx` para ver todos os pontos de reuso de um gerador.
```

**Substituir por:**

```
**Padrão de reuso:** vários estilos reaproveitam geradores de outros (Celtic/Islamic reusam `genADFrame`/`genMandala` com parâmetros diferentes; Victorian reusa `genBQAcanthus`/`genBQCartouche`). Isso é intencional — reduz duplicação — mas significa que uma mudança em `genADFrame`, por exemplo, afeta visualmente Art Deco **e** Celtic **e** Islamic ao mesmo tempo. Conferir todos os estilos que reusam antes de alterar um gerador compartilhado. Como o reuso é sempre wireado em `generate.js` (nunca dentro do arquivo do estilo em si), basta grepar `generate.js` por `genXxx` para ver todos os pontos de reuso de um gerador. **Desde a F5 (DEC-018), gerador compartilhado só varia com o seed quando o estilo dono pede:** `genADFrame` e `genMandala` recebem `vary` (padrão `false`) no fim da assinatura, e em `genDivider`/`genPattern` só os ramos do estilo do lote sorteiam — quem reusa continua recebendo o desenho de sempre, e o `npm run regress` não vaza para fora do lote.
```

## Edição 14 — `meta/GLOSSARY.md` · termos escolha semeada, {n/k}, Truchet

**Âncora**:

```
- **L-System estocástico** — L-System em que uma regra tem várias alternativas e o PRNG sorteia uma a cada ocorrência (`lsystemExpandStochastic`); é o que faz o seed mudar a estrutura da árvore.
```

**Substituir por:**

```
- **L-System estocástico** — L-System em que uma regra tem várias alternativas e o PRNG sorteia uma a cada ocorrência (`lsystemExpandStochastic`); é o que faz o seed mudar a estrutura da árvore.
- **Escolha semeada** — decisão de estrutura tomada pelo PRNG do seed (`pickOne` em `core/utils.js`): qual variante de motivo, arranjo ou acabamento entra no desenho. É o que a F5 dá a cada tipo para a métrica «formas» subir (DEC-018).
- **Polígono estrelado {n/k}** — `polygramPath`: liga cada um dos n vértices ao k-ésimo seguinte; com divisor comum vira laços separados ({6/2} = dois triângulos). Usado no Geométrico.
- **Truchet** — ladrilho com dois quartos de círculo em cantos opostos, girado ao acaso em cada célula; a malha forma caminhos contínuos. Variante da tesselação geométrica.
```

## Edição 15 — `meta/CEREBRO.md` · tecnica: gerador compartilhado

**Âncora**:

```
- **Variedade (F5):** `npm run seeds` mede, por tipo, quantas formas diferentes o seed produz (catraca, DEC-017). Gerador novo ou ajustado: o seed tem de mudar a ESTRUTURA (`formas>1`), não só os números; e o tamanho do pior caso (Complexity e Symmetry no máximo) cabe em ~120 KB.
```

**Substituir por:**

```
- **Variedade (F5):** `npm run seeds` mede, por tipo, quantas formas diferentes o seed produz (catraca, DEC-017). Gerador novo ou ajustado: o seed tem de mudar a ESTRUTURA (`formas>1`), não só os números; e o tamanho do pior caso (Complexity e Symmetry no máximo) cabe em ~120 KB. Gerador **compartilhado** entre estilos (`genADFrame`, `genMandala`, `genPattern`, `genDivider`): a variação entra só para o estilo do lote (`vary = true` ou o ramo do estilo), senão o regress muda tipos de outros estilos (DEC-018).
```

## Edição 16 — `meta/STATUS.md` · versao 0.7.0

**Âncora**:

```
**[0.6.0]** — F5, lote 1: o seed passa a mudar a forma da árvore, do Koch e do Dragon (L-System estocástico e famílias de curvas), que agora ocupam ~83% do canvas; instrumento `npm run seeds` (DEC-017). Antes, em v0.5.0: ciclo de exploração (DEC-015) e FIX-003. GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.
```

**Substituir por:**

```
**[0.7.0]** — F5, lote 2: o seed passa a mudar a forma dos 12 tipos do Art Deco e do Geométrico (escolhas semeadas de motivo, arranjo e acabamento; DEC-018) — placar `formas>1` 18/53. Antes, em v0.6.0: lote Botânico e `npm run seeds` (DEC-017). GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.
```

## Edição 17 — `meta/STATUS.md` · Funcionando: lote 2

**Âncora**:

```
- **Botânico variado (v0.6.0, DEC-017):** árvore estocástica (40 formas em 40 seeds), Koch em 5 curvas, Dragon em 5 curvas com Symmetry = cópias giradas. Medido por `npm run seeds`.
```

**Substituir por:**

```
- **Botânico variado (v0.6.0, DEC-017):** árvore estocástica (40 formas em 40 seeds), Koch em 5 curvas, Dragon em 5 curvas com Symmetry = cópias giradas. Medido por `npm run seeds`.
- **Art Deco e Geométrico variados (v0.7.0, DEC-018):** os 12 tipos sorteiam variante de motivo, arranjo e acabamento pelo seed (ex.: medalhão com raios em cunha, degraus, leque ou alternados; tesselação com polígonos, estrelas, Truchet ou rosetas). Celta, Islâmico e Orgânico, que reusam esses geradores, não mudaram. Medido por `npm run seeds` e `npm run regress`.
```

## Edição 18 — `meta/STATUS.md` · Em Progresso: F5 lote 2 feito

**Âncora**:

```
- **F5 — Variedade procedural:** lote 1 (instrumento + Botânico) entregue em v0.6.0 — placar `formas>1: 6/53`. Próximo: um lote por estilo (Art Deco, Barroco, Geométrico, Vitoriano, Celta, Islâmico, Minimal, Orgânico). Roteiro visual do lote 1 (Botânico): **1–6 ok** [relatado pelo dono, 2026-11-15].
```

**Substituir por:**

```
- **F5 — Variedade procedural:** lote 1 (instrumento + Botânico, v0.6.0) e lote 2 (Art Deco + Geométrico, v0.7.0) entregues — placar `formas>1: 18/53`. Próximo: um lote por estilo (Barroco, Vitoriano, Celta, Islâmico, Minimal, Orgânico). Roteiro do Botânico 1–6 ok [relatado pelo dono, 2026-11-15]; roteiro do lote 2 pendente.
```

## Edição 19 — `meta/STATUS.md` · ordem das frentes decidida

**Âncora**:

```
- **Ordem das próximas frentes — NÃO decidida:** F5 lote 2 (Art Deco + Geométrico, sugerido no fecho de 2026-11-15) ou F4/B implementação. O dono pausou para a troca de conversa antes de escolher.
```

**Substituir por:**

```
- **Ordem das frentes:** o dono escolheu F5 lote 2 primeiro [relatado pelo dono, 2026-11-16]; a F4/B (implementação da nova interface) segue aguardando a vez.
```

## Edição 20 — `meta/STATUS.md` · Quebrado: placar atualizado

**Âncora**:

```
- **O seed ainda não muda a forma em 47 dos 53 tipos** (placar `npm run seeds` em v0.6.0: formas>1 6/53; antes do lote 1 eram 3/53, e o seed não mexia em número nenhum em 46). Surprise, New seed e «Like this» só variam o que os sliders variam nesses tipos. Tratado pela F5, um lote por estilo.
```

**Substituir por:**

```
- **O seed ainda não muda a forma em 35 dos 53 tipos** (placar `npm run seeds` em v0.7.0: formas>1 18/53; 6/53 em v0.6.0, 3/53 antes da F5). Surprise, New seed e «Like this» só variam o que os sliders variam nesses tipos. Tratado pela F5, um lote por estilo.
```

## Edição 21 — `meta/STATUS.md` · backlog: JSDoc parcial

**Âncora**:

```
- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (`genADMedallion`, `genBQFrame`, etc.).
```

**Substituir por:**

```
- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (`genADMedallion`, `genBQFrame`, etc.). Art Deco e Geométrico já têm (v0.7.0).
```

## Edição 22 — `meta/STATUS.md` · Ultima conversa: roteiro do botanico ja ok

**Âncora**:

```
**2026-11-15 (2)** - WO 0005 aplicada pelo Code (`c4d5146`, empurrado): v0.6.0, `npm run seeds` (catraca) e lote Botanico (tree estocastica, Koch e Dragon em 5 curvas, Symmetry = copias no Dragon, enquadramento ~83%); DEC-017 e FIX-004 (build injetava o bundle com `String.replace` e quebrava com `$&`). Regress: 18 chaves `botanical/*` mudaram, 0 fora; seeds formas>1 3/53 -> 6/53; sonda jsdom 18/18. Visual NAO verificado: roteiro do dono pendente. Proximo passo: dono ve as curvas novas; depois um lote F5 por estilo; mockup da F4/B segue aguardando.
```

**Substituir por:**

```
**2026-11-15 (2)** - WO 0005 aplicada pelo Code (`c4d5146`, empurrado): v0.6.0, `npm run seeds` (catraca) e lote Botanico (tree estocastica, Koch e Dragon em 5 curvas, Symmetry = copias no Dragon, enquadramento ~83%); DEC-017 e FIX-004 (build injetava o bundle com `String.replace` e quebrava com `$&`). Regress: 18 chaves `botanical/*` mudaram, 0 fora; seeds formas>1 3/53 -> 6/53; sonda jsdom 18/18. Visual: roteiro do dono 1-6 ok depois [relatado pelo dono, registrado pela WO 0006]. Proximo passo: dono ve as curvas novas; depois um lote F5 por estilo; mockup da F4/B segue aguardando.
```

## Edição 23 — `meta/ROADMAP.md` · criterio sem numero congelado

**Âncora**:

```
**Critério de conclusão:** instrumento de sensibilidade ao seed com **53/53** tipos produzindo desenhos distintos em 40 seeds (hoje 7/53), linha de base do regress regravada de propósito, e roteiro visual do dono por lote.
```

**Substituir por:**

```
**Critério de conclusão:** instrumento de sensibilidade ao seed com **53/53** tipos produzindo desenhos distintos em 40 seeds (placar atual: rode `npm run seeds`), linha de base do regress regravada de propósito, e roteiro visual do dono por lote.
```

## Edição 24 — `meta/ROADMAP.md` · lote 2 feito

**Âncora**:

```
- [ ] Um lote por estilo: Art Deco, Barroco, Geométrico, Vitoriano, Celta, Islâmico, Minimal, Orgânico (spiral, flower, mandala).
```

**Substituir por:**

```
- [x] Lote Art Deco + Geométrico — 12 tipos com escolhas semeadas; geradores compartilhados variam só para o estilo dono (`vary`). v0.7.0, DEC-018, `specs/261116-seed-vivo-artdeco-geometrico.md`. Placar: formas>1 6/53 → 18/53.
- [ ] Um lote por estilo: Barroco, Vitoriano, Celta, Islâmico, Minimal, Orgânico (spiral, flower, mandala).
```

## Edição 25 — `meta/CHANGELOG.md` · entrada 0.7.0

**Âncora**:

```
## [Não lançado]
*(vazio)*
```

**Substituir por:**

```
## [Não lançado]
*(vazio)*

---

## [0.7.0] — {DATA}
### Alterado
- **Art Deco e Geométrico com variedade de verdade** (F5, lote 2): os 12 tipos passam a sortear pelo seed a variante de motivo, arranjo e acabamento — medalhão (raios em cunha, degraus, leque ou alternados; anéis em círculo, octógono ou dodecágono; três miolos; três acabamentos), moldura (cantos em colchete, leque ou zigurate; quatro motivos de borda; filete simples, duplo ou triplo), divisor, canto, padrão (polígono, escama, leque, chevron; malha reta ou em tijolo), ornamento (quatro células × quatro contornos × três miolos), mandala (pétala por anel, anéis escalonados), moldura geométrica, divisor geométrico, tesselação (polígono, estrela, Truchet, roseta), estrela ({n/k}, alternada, três giros) e símbolo. O desenho de antes de cada tipo continua sendo uma das variantes. Placar `npm run seeds`: formas>1 6/53 → 18/53.
- Celta, Islâmico e Orgânico, que reusam `genADFrame`, `genMandala` e `genPattern`, não mudam: a variação só liga para o estilo dono.
- Linha de base do `npm run regress` regravada para as 72 chaves `artdeco/*` e `geometric/*` (mudança intencional).
```

> Troque `{DATA}` pela saída de `date +%F`, rodado na hora.

## Edição 26 — `meta/DECISIONS.md` · DEC-018 no fim

**Âncora**:

```
- **Lição:** regress e seeds testam o `src/`, não o arquivo distribuído; a sonda de interface (jsdom sobre o `dist`) foi a única rede que pegou. Virou a Armadilha 9 do CONTEXT, e a conferência das WOs que mexem em `src/` passa a incluir `grep -c "//__SCRIPT__" dist/vectorforge.html` = 0.
```

**Substituir por:**

```
- **Lição:** regress e seeds testam o `src/`, não o arquivo distribuído; a sonda de interface (jsdom sobre o `dist`) foi a única rede que pegou. Virou a Armadilha 9 do CONTEXT, e a conferência das WOs que mexem em `src/` passa a incluir `grep -c "//__SCRIPT__" dist/vectorforge.html` = 0.

---

## DEC-018 — Lote 2 da F5: escolhas semeadas no Art Deco e no Geométrico, sem vazar para quem reusa
**Data:** 2026-11-16 · **Status:** aceita

### Contexto
Depois do lote 1 (DEC-017), o placar era formas>1 6/53; os 12 tipos do Art Deco e do Geométrico — os estilos mais usados — marcavam 1/1. Quatro dos geradores são compartilhados: `genADFrame` (Celta e Islâmico usam como borda), `genMandala` (Celta, Orgânico, fallback e Text→Form), `genPattern` e `genDivider` (todos os estilos, por ramo).

### Decisão
1. **Escolhas semeadas por tipo**, com `pickOne` (primitiva nova em `core/utils.js`): cada gerador sorteia de 2 a 5 eixos independentes (forma do motivo, arranjo, acabamento, miolo); o desenho original é uma das combinações. Complexity segue = densidade; Symmetry segue = eixos/lados.
2. **Gerador compartilhado só varia para o estilo dono:** `genADFrame(…, vary = false)` e `genMandala(…, vary = false)`; o dispatcher passa `true` só em `artdeco/frame` e `geometric/mandala`. Em `genDivider`/`genPattern`, só os ramos `artdeco` e `geo` chamam o PRNG; `girih` e `islamic` seguem idênticos.
3. **Primitivas novas:** `steppedDiamondPath` (zigurate) e `polygramPath` ({n/k}, com laços separados quando há divisor comum).
4. **Dois ajustes vistos no contact sheet:** o {n/k} não usa giro progressivo entre camadas (vira emaranhado; usa meio passo); os raios do leque do padrão Art Deco vão num `path` por célula (com um `<line>` por raio o pior caso dobrava, 50 → 108 KB).

### Alternativas consideradas
- **Variar os geradores compartilhados para todos** — rejeitada neste lote: mudaria Celta, Islâmico e Orgânico sem roteiro visual deles, e o regress deixaria de separar o lote do resto. Cada um ganha variedade no próprio lote.
- **Funções novas para Art Deco/Geométrico, deixando as antigas intactas** — rejeitada: duplicaria `genADFrame`/`genMandala` quase inteiros; o parâmetro opcional mantém um corpo só, e o padrão `false` garante a saída antiga.
- **Ruído nos números (raio, ângulo) em vez de escolhas** — rejeitada (como em DEC-017): muda o hash, não o desenho; a métrica «formas» e o dono pedem estrutura diferente.

### Consequências
- Placar: formas>1 6/53 → 18/53, distintos>1 9/53 → 21/53. Regress: exatamente 72 chaves mudaram (12 tipos × 6), 0 fora do lote.
- Pior caso (Complexity e Symmetry no máximo, 80 seeds, canvas 400): maior é `artdeco/pattern`, 49,6 KB (igual ao original). Em 1200, os padrões crescem com a área como antes.
- `formas` baixo em `artdeco/pattern` (4) e `geometric/tessellation` (7): a malha muda posição, não sequência de elementos — o instrumento subconta; o roteiro decide se basta (IDEAS).
- O Botânico mantém o `pickOne` local (IDEAS: unificar).
```

## Edição 27 — `meta/IDEAS.md` · ideias do lote 2

**Âncora**:

```
### 2026-06-30 — Voronoi/Worley (F3 ou F4)
```

**Substituir por:**

```
### 2026-11-16 — Um `pickOne` só
O Botânico tem `pickOne` local (lote 1); o lote 2 pôs um em `core/utils.js`. Trocar o local pelo de `utils` quando o `botanical.js` for tocado de novo — mudança de uma linha, sem efeito na saída.

### 2026-11-16 — Padrão Art Deco com mais caras
`artdeco/pattern` tem só 8 combinações (4 motivos × 2 malhas; `formas` = 4). Candidatos baratos: acento em xadrez (célula sim, célula não preenchida), malha girada 45°, motivo alternando por linha. Esperar o roteiro do dono dizer se 8 basta.

### 2026-06-30 — Voronoi/Worley (F3 ou F4)
```

## Edição 28 — linhas de base e build (comandos, na ordem)

1. `npm run regress | grep -c "MUDOU:"` → **72**; `npm run regress | grep "MUDOU:" | grep -vc "MUDOU: artdeco/\|MUDOU: geometric/"` → **0**. Qualquer chave fora de `artdeco/*` e `geometric/*` mudou: **PARE e reporte** — o lote vazou (o primeiro suspeito é um reuso de `genADFrame`/`genMandala`/`genPattern`).
2. `npm run regress -- --update` → `linha de base gravada: 318 chaves -> scripts/regress-baseline.json`; `npm run regress; echo "rc=$?"` → `OK`, `rc=0`.
3. `npm run seeds -- --update` → `linha de base gravada: 53 tipos · formas>1: 18/53 · distintos>1: 21/53` (medido no protótipo). Menos que 18: **PARE**.
4. `npm run seeds | grep -E "^artdeco|^geometric" | awk '$3 > 1' | wc -l` → **12** (os 12 tipos com formas>1); `npm run seeds; echo "rc=$?"` → `OK`, `rc=0`.
5. `npm run build` → `✓ dist/vectorforge.html gerado` (protótipo: 75.7 KB).

---

## Fora de escopo

Os outros 35 tipos; trocar o `pickOne` local do Botânico (IDEAS); ajustar as listas de variantes — se algo parecer estranho no olho, relate com print.

## Armadilhas desta WO

- **Não rode build, regress nem seeds entre a Edição 0 e a Edição 1:** com só os dois arquivos do chat, o bundle falha (imports que a Edição 1 cria). Depois da Edição 7 tudo compila.
- **A ordem da Edição final importa:** o regress só pode ser regravado DEPOIS do passo 1 provar que só `artdeco/*` e `geometric/*` mudaram.
- **Edições 3–5 têm âncoras longas (10–20 linhas, LF).** Se o Edit não casar o bloco, confira LF (`git ls-files --eol src/generators/generic.js` → `w/lf`) antes de reportar.
- **`grep -c` conta LINHAS.** As contagens abaixo foram escritas para isso; para ocorrências use `grep -o … | wc -l`.

---

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` → ` M` em `dist/vectorforge.html`, `meta/CEREBRO.md`, `meta/CHANGELOG.md`, `meta/CONTEXT.md`, `meta/DECISIONS.md`, `meta/GLOSSARY.md`, `meta/IDEAS.md`, `meta/ROADMAP.md`, `meta/STATUS.md`, `package-lock.json`, `package.json`, `scripts/regress-baseline.json`, `scripts/seeds-baseline.json`, `src/core/generate.js`, `src/core/utils.js`, `src/generators/artdeco.js`, `src/generators/generic.js`, `src/generators/geometric.js` (**18 `M`**) e `??` em `meta/workorders/261116-wo0007-seed-vivo-artdeco-geometrico.md`, `specs/261116-seed-vivo-artdeco-geometrico.md` (**2 `??`**). Em `src/`, só os 5 arquivos listados.
- [ ] `git diff --stat -- scripts/regress-baseline.json` → `72 insertions(+), 72 deletions(-)` (uma chave por linha). Mais: **PARE**. `git diff --stat -- scripts/seeds-baseline.json` → `12 insertions(+), 12 deletions(-)`.
- [ ] `grep -c "^export function pickOne\|^export function steppedDiamondPath\|^export function polygramPath" src/core/utils.js` → **3**; `grep -c "sw, true)," src/core/generate.js` → **2**.
- [ ] `grep -c "vary = false" src/generators/artdeco.js src/generators/geometric.js` → `artdeco.js:1`, `geometric.js:1`.
- [ ] `grep -c '"version": "0.7.0",' package.json package-lock.json` → `package.json:1`, `package-lock.json:2`.
- [ ] `grep -c "^## \[0.7.0\] — 20" meta/CHANGELOG.md` → **1**; `grep -c "{DATA}" meta/CHANGELOG.md` → **0**; `grep -c "^## DEC-018 " meta/DECISIONS.md` → **1**.
- [ ] `grep -c "^\*\*\[0.7.0\]\*\* —" meta/STATUS.md` → **1**; `grep -c "^- \*\*O seed ainda não muda a forma em 35 dos 53 tipos\*\*" meta/STATUS.md` → **1**; `grep -c "^- \[x\] Lote Art Deco + Geométrico" meta/ROADMAP.md` → **1**; `grep -c "hoje 7/53" meta/ROADMAP.md` → **0**.
- [ ] **dist:** `grep -c "//__SCRIPT__" dist/vectorforge.html` → **0** (Armadilha 9).
- [ ] Sonda de UI segue verde: `cd ../261112-sonda-ui && node behave.cjs ../vectorforge/dist/vectorforge.html | grep -c "^OK"; cd ../vectorforge` → **18**.
  - **Quem roda:** quem aplica. **Chega no ramo?** No carregamento do bundle e na seleção de estilos ao acaso — a sonda não percorre os 12 tipos. **Pergunta que NÃO responde:** a aparência das variantes — é o roteiro do dono (o chat rodou no protótipo uma sonda descartável que renderiza os 12 tipos × 3 seeds no `dist`: 36 renders, 0 erros de JS).

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · desvios · saída CRUA: as contagens do regress (passo 1), `seeds --update` e as linhas `^artdeco|^geometric` do `npm run seeds` · arquivos tocados · build · commit e push.

## Commit — blocos separados, mensagem SEM acento

```
git add dist/vectorforge.html meta/CEREBRO.md meta/CHANGELOG.md meta/CONTEXT.md meta/DECISIONS.md meta/GLOSSARY.md meta/IDEAS.md meta/ROADMAP.md meta/STATUS.md package-lock.json package.json scripts/regress-baseline.json scripts/seeds-baseline.json src/core/generate.js src/core/utils.js src/generators/artdeco.js src/generators/generic.js src/generators/geometric.js meta/workorders/261116-wo0007-seed-vivo-artdeco-geometrico.md specs/261116-seed-vivo-artdeco-geometrico.md
```

```
git commit -m "feat(artdeco,geometric): seed passa a mudar a forma dos 12 tipos" -m "Cada gerador sorteia variante de motivo, arranjo e acabamento (pickOne); genADFrame e genMandala so variam com vary=true, entao Celta, Islamico e Organico nao mudam. Primitivas steppedDiamondPath e polygramPath em core/utils. seeds formas>1 de 6/53 para 18/53; regress regravado para as 72 chaves artdeco/* e geometric/*. Versao 0.7.0. Ver DEC-018 e WO 0007."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
