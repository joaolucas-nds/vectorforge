# WO 0011 — F5: régua de silhueta no `npm run seeds` + piloto do esqueleto semeado (4 tipos) · v0.9.0

> **Tipo:** mista — instrumento (`scripts/silhouette.mjs` novo e `scripts/seeds.mjs` reescrito, gravados pelo chat) + gerador (dois arquivos inteiros gravados pelo chat + Edições 1–6 em `utils.js` e `generic.js`) + versão + linhas de base + registro.
> **Config sugerida:** modelo mais capaz (Opus) · `/effort medium` — mudança INTENCIONAL de saída em 4 tipos e de formato da linha de base do `seeds`.
> **Pré-requisito:** commit `9094566`, `node_modules/` presente.
> **Base:** decisão do dono no chat em 2026-11-17 («Vamos de régua de silhueta + piloto de esqueleto semeado nos 4 tipos») sobre `meta/analises/261117-ANALISE-variedade-silhueta.md`; `specs/261117-esqueleto-semeado-piloto.md`; prova visual `../261117-piloto-esqueleto-16-seeds.png` e `../261117-piloto-medalhao-v2.png` (pasta-pai; a primeira tem o losango do medalhão ainda errado — a segunda é a versão final).
> **Arquivos que o chat gravou no disco e esta WO versiona:**
>   - `src/generators/artdeco.js` — sha1 `90c6f283cb123aaa037ce9e3663c523b77376e65`
>   - `src/generators/geometric.js` — sha1 `2336cece6dee7412415f182c9cdef254d12dc8c5`
>   - `scripts/silhouette.mjs` — sha1 `76de620dbaf720c490b7f46de4cd8626d9c021cb`
>   - `scripts/seeds.mjs` — sha1 `dc01ba4e8d6dbd8b8abd13fd0b1d5ee119d6e71b`
>   - `specs/261117-esqueleto-semeado-piloto.md` — sha1 `49a731e4e067511a2f88e449af526a4df0f6341b`
> **`artdeco.js`, `geometric.js` e `seeds.mjs` foram reescritos INTEIROS pelo chat; `silhouette.mjs` é novo.** Não edite: só confira o hash e versione.
> **Âncora semântica:** trecho que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**.
> **Idempotência:** procure o texto NOVO INTEIRO. Nas Edições 1, 5, 10, 14, 15, 18, 24, 25, 26, 28 a âncora fica dentro do texto novo; nas Edições 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 16, 17, 19, 20, 21, 22, 23, 27 ela some (já aplicada = texto novo presente **e** âncora ausente). Já aplicada: **PULE** e diga no relatório.
> **Âncoras lidas em** (commit `9094566`; trecho = primeira linha da âncora):
>   - Edição 1 · `src/core/utils.js` — `  return [outline, ribs.trim()];`
>   - Edição 2 · `src/generators/generic.js` — `import { TAU, f, pt, polyPath, starPath, mkRand, pickOne, steppedDiamondPath, spiralPath, `
>   - Edição 3 · `src/generators/generic.js` — `  const cell = 40 + Math.round((1 - comp) * 35);`
>   - Edição 4 · `src/generators/generic.js` — `  const n = style === 'girih' || style === 'islamic' ? 6 : Math.round(3 + sym * 4);`
>   - Edição 5 · `src/generators/generic.js` — `      if (cx < -cell || cx > w + cell || cy < -cell || cy > h + cell) continue;`
>   - Edição 6 · `src/generators/generic.js` — `        parts.push(´<path d="${polyPath(cx, cy, cell * 0.22, n, Math.PI / n)}" ${FG}/>´);`
>   - Edição 7 · `package.json` — `  "version": "0.8.0",`
>   - Edição 8 · `package-lock.json` — `  "name": "vectorforge",`
>   - Edição 9 · `package-lock.json` — `      "name": "vectorforge",`
>   - Edição 10 · `meta/CONTEXT.md` — `│   ├── seeds.mjs                # instrumento de sensibilidade ao seed (´npm run seeds´, `
>   - Edição 11 · `meta/CONTEXT.md` — `│   └── seeds-baseline.json      # linha de base: distintos/formas por tipo em 40 seeds`
>   - Edição 12 · `meta/CONTEXT.md` — `| **artdeco** | ´src/generators/artdeco.js´ | medallion, frame, divider, corner, pattern, `
>   - Edição 13 · `meta/CONTEXT.md` — `| **geometric** | ´src/generators/geometric.js´ | mandala, frame, divider, tessellation, s`
>   - Edição 14 · `meta/GLOSSARY.md` — `- **Concha em leque** — meia-lua com nervuras saindo do centro (´shellFanPaths´): devolve `
>   - Edição 15 · `meta/CEREBRO.md` — `- **Variedade (F5):** ´npm run seeds´ mede, por tipo, quantas formas diferentes o seed pro`
>   - Edição 16 · `CLAUDE.md` — `- Variedade: ´npm run seeds´ — mede quanto o seed muda cada tipo (catraca: sai 1 se algum `
>   - Edição 17 · `meta/STATUS.md` — `**[0.8.0]** — F5, lote 3: o seed passa a mudar a forma de 11 tipos do Barroco e do Vitoria`
>   - Edição 18 · `meta/STATUS.md` — `- **Barroco e Vitoriano variados (v0.8.0, DEC-019):** 11 tipos sorteiam variante de motivo`
>   - Edição 19 · `meta/STATUS.md` — `- **F5 — Variedade procedural:** lotes 1 (Botânico, v0.6.0), 2 (Art Deco + Geométrico, v0.`
>   - Edição 20 · `meta/STATUS.md` — `- **Ordem das frentes:** o dono escolheu F5 lote 3 (Barroco + Vitoriano) [relatado pelo do`
>   - Edição 21 · `meta/STATUS.md` — `- **O seed ainda não muda a forma em 24 dos 53 tipos** (placar ´npm run seeds´ em v0.8.0: `
>   - Edição 22 · `meta/ROADMAP.md` — `**Critério de conclusão:** instrumento de sensibilidade ao seed com **53/53** tipos produz`
>   - Edição 23 · `meta/ROADMAP.md` — `- [ ] Um lote por estilo: Celta, Islâmico, Minimal, Orgânico (spiral, flower, mandala).`
>   - Edição 24 · `meta/CHANGELOG.md` — `## [Não lançado]`
>   - Edição 25 · `meta/DECISIONS.md` — `- O acanto/flourish continua ocupando ~1/3 da altura do canvas, como desde a v0.1.0 (IDEAS`
>   - Edição 26 · `meta/IDEAS.md` — `### 2026-11-17 — Enquadrar o acanto e o flourish como o Botânico`
>   - Edição 27 · `meta/analises/261117-ANALISE-variedade-silhueta.md` — `> **Status:** Em discussao`
>   - Edição 28 · `logs/2026-11-17.md` — `- Dono decide: D + piloto de A (recomendado) ou B primeiro.`
> **Próximo comando:** `/wrap wo0011-esqueleto-semeado-piloto`

> **Canal dos meta neste ciclo = CODE.** Esta WO É o registro.

---

## 1. Por que

Depois do lote 3, o dono ainda sentia pouca variedade; a análise mediu que o seed trocava detalhe dentro do mesmo contorno e que a métrica `formas` premiava isso. O dono decidiu: régua de silhueta + piloto do esqueleto semeado nos 4 tipos de silhueta mais parada [relatado pelo dono, 2026-11-17]. Tudo prototipado, calibrado, medido e conferido a olho pelo chat.

## Inventário — de onde saiu a lista de edições

- **Instrumento:** `scripts/seeds.mjs` (reescrito: coluna, catraca, resumo) e `scripts/silhouette.mjs` (novo), ambos do chat. O `package.json` não muda de script: `npm run seeds` já chama o `seeds.mjs`.
- **Geradores:** `grep -n "^export function" src/generators/artdeco.js src/generators/geometric.js` devolve 8 funções no commit `9094566`; mudam 3 (`genADMedallion`, `genMandala`, `genGeoSymbol`) — os arquivos vêm inteiros do chat para não fatiar funções de 100 linhas. O padrão Art Deco mora em `genPattern` (`generic.js`, Edições 2–6). Primitivas em `utils.js` (Edição 1). O dispatcher não muda: `geometric/mandala` já passa `vary = true`.
- **Versão:** `package.json` (1), `package-lock.json` (2).
- **Registro:** CONTEXT (4), GLOSSARY, CEREBRO, CLAUDE.md, STATUS (5), ROADMAP (2), CHANGELOG, DECISIONS, IDEAS, a análise (status) e o log do dia.
- Total: **28 edições** em **15 arquivos**, mais 5 arquivos do chat, as duas linhas de base regravadas e o `dist/`.

---

## Edição 0 — preparo (antes de editar)

1. `sha1sum src/generators/artdeco.js src/generators/geometric.js scripts/silhouette.mjs scripts/seeds.mjs specs/261117-esqueleto-semeado-piloto.md` → bate com o cabeçalho. Diferente: **PARE**.
2. `git status --short` → exatamente ` M scripts/seeds.mjs`, ` M src/generators/artdeco.js`, ` M src/generators/geometric.js`, `?? meta/workorders/261117-wo0011-esqueleto-semeado-piloto.md`, `?? scripts/silhouette.mjs`, `?? specs/261117-esqueleto-semeado-piloto.md`. Outra linha: **PARE**.
3. **Sem prova de vida a rodar aqui:** os geradores do chat importam `contourRadius`/`contourPath`, que só existem depois da Edição 1 — o bundle (e com ele regress, seeds e build) não compila antes. O «antes» foi medido pelo chat no HEAD `9094566`: regress OK; seeds `formas>1 29/53 · distintos>1 32/53` e, com a régua nova sobre o HEAD, `silhueta>=25%: 6/53`.

## Edição 1 — `src/core/utils.js` · primitivas contourRadius e contourPath

**Âncora** (fim de `shellFanPaths`, ultima funcao do arquivo):

```
  return [outline, ribs.trim()];
}
```

**Substituir por:**

```
  return [outline, ribs.trim()];
}

// ── Esqueleto semeado (F5, DEC-020) ──────────────────────────────────────────

/**
 * Contorno de um desenho radial: devolve r(a), o raio do contorno no ângulo a (y para baixo).
 * É o que deixa a silhueta sair do círculo — anéis, pontas e nós passam a seguir r(a).
 * Tipos: 'circle' · 'ellipse' (opt.sx, opt.sy) · 'polygon' (opt.k lados; vértices em R; opt.rot = direção de um VÉRTICE)
 * · 'star' (opt.k ondas, opt.amp) · 'lozenge' (opt.sx, opt.sy) · 'arch' (topo em semicírculo,
 * base reta a opt.base·R abaixo do centro).
 * @param {string} kind
 * @param {number} R - raio de referência
 * @param {object} [opt]
 * @returns {(a: number) => number}
 */
export function contourRadius(kind, R, opt = {}) {
  if (kind === 'ellipse') { const ax = R * (opt.sx || 1), ay = R * (opt.sy || 1); return a => 1 / Math.hypot(Math.cos(a) / ax, Math.sin(a) / ay); }
  if (kind === 'polygon') { const k = opt.k || 6, rot = opt.rot || 0, seg = TAU / k; return a => { const m = ((((a - rot) % seg) + seg) % seg) - seg / 2; return R * Math.cos(Math.PI / k) / Math.cos(m); }; }
  if (kind === 'star') { const k = opt.k || 6, amp = opt.amp || 0.2, rot = opt.rot || 0; return a => R * (1 - amp * (1 - Math.cos(k * (a - rot))) / 2); }
  if (kind === 'lozenge') { const w = R * (opt.sx || 0.7), h = R * (opt.sy || 1.05); return a => 1 / (Math.abs(Math.cos(a)) / w + Math.abs(Math.sin(a)) / h); }
  if (kind === 'arch') { const b = R * (opt.base || 0.8); return a => { const s = Math.sin(a); if (s <= 0) return R; return Math.min(R / Math.max(1e-9, Math.abs(Math.cos(a))), b / s); }; }
  return () => R;
}

/**
 * Path fechado que segue um contorno r(a), escalado por k (anéis internos = contorno × t).
 * @param {number} cx
 * @param {number} cy
 * @param {(a: number) => number} rFn - de contourRadius
 * @param {number} [k=1] - escala
 * @param {number} [N=72] - amostras
 * @param {number} [a0=-Math.PI/2] - ângulo inicial (o topo)
 * @returns {string} atributo d
 */
export function contourPath(cx, cy, rFn, k = 1, N = 72, a0 = -Math.PI / 2) {
  const pts = Array.from({ length: N }, (_, i) => { const a = a0 + i * TAU / N; return pt(cx, cy, rFn(a) * k, a); });
  return 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + ' Z';
}
```

## Edição 2 — `src/generators/generic.js` · import das primitivas

**Âncora** (linha de import de `core/utils.js`):

```
import { TAU, f, pt, polyPath, starPath, mkRand, pickOne, steppedDiamondPath, spiralPath, shellFanPaths } from '../core/utils.js';
```

**Substituir por:**

```
import { TAU, f, pt, polyPath, starPath, mkRand, pickOne, steppedDiamondPath, spiralPath, shellFanPaths, contourRadius, contourPath } from '../core/utils.js';
```

## Edição 3 — `src/generators/generic.js` · genPattern: cell vira let

**Âncora** (primeira linha de `genPattern` depois de `parts`):

```
  const cell = 40 + Math.round((1 - comp) * 35);
  // F5 lote 2 (DEC-018): Art Deco e Geométrico sorteiam o motivo e a malha; girih e islamic
```

**Substituir por:**

```
  let cell = 40 + Math.round((1 - comp) * 35);
  // F5 lote 2 (DEC-018): Art Deco e Geométrico sorteiam o motivo e a malha; girih e islamic
```

## Edição 4 — `src/generators/generic.js` · genPattern: campo e escala semeados (artdeco)

**Âncora** (linha do `n` e abertura do laco de linhas):

```
  const n = style === 'girih' || style === 'islamic' ? 6 : Math.round(3 + sym * 4);
  for (let row = -1; row <= Math.ceil(h / cell) + 1; row++) {
```

**Substituir por:**

```
  const n = style === 'girih' || style === 'islamic' ? 6 : Math.round(3 + sym * 4);
  // Piloto do esqueleto semeado (DEC-020): no Art Deco, o seed escolhe também a ESCALA da célula
  // e o CAMPO que o padrão ocupa — página inteira · medalhão · losango · faixa · moldura · arco;
  // fora da página inteira, o campo ganha um contorno. Os outros estilos não consomem o seed aqui.
  const field = style === 'artdeco' ? pickOne(['full', 'circle', 'diamond', 'band', 'frame', 'arch'], rnd) : 'full';
  if (style === 'artdeco') cell = Math.round(cell * pickOne([0.8, 1, 1.35], rnd));
  const mx = w / 2, my = h / 2, Rf = Math.min(w, h) * 0.42, pad = cell * 0.55;
  const archFn = contourRadius('arch', Rf, { base: 0.85 });
  /** O centro da célula (px, py) está dentro do campo? */
  const inField = (px, py) => {
    const dx = px - mx, dy = py - my;
    if (field === 'circle') return Math.hypot(dx, dy) <= Rf;
    if (field === 'diamond') return Math.abs(dx) / Rf + Math.abs(dy) / (Rf * 1.15) <= 1;
    if (field === 'band') return Math.abs(dy) <= h * 0.2;
    if (field === 'frame') return Math.min(px, w - px, py, h - py) <= Math.min(w, h) * 0.2;
    if (field === 'arch') return Math.hypot(dx, dy) <= archFn(Math.atan2(dy, dx));
    return true;
  };
  for (let row = -1; row <= Math.ceil(h / cell) + 1; row++) {
```

## Edição 5 — `src/generators/generic.js` · genPattern: pula celula fora do campo

**Âncora** (teste de limites da celula):

```
      if (cx < -cell || cx > w + cell || cy < -cell || cy > h + cell) continue;
```

**Substituir por:**

```
      if (cx < -cell || cx > w + cell || cy < -cell || cy > h + cell) continue;
      if (!inField(cx, cy)) continue;
```

## Edição 6 — `src/generators/generic.js` · genPattern: contorno do campo

**Âncora** (fim do laco e `return` de `genPattern`):

```
        parts.push(`<path d="${polyPath(cx, cy, cell * 0.22, n, Math.PI / n)}" ${FG}/>`);
      }
    }
  }
  return parts.join('\n');
}
```

**Substituir por:**

```
        parts.push(`<path d="${polyPath(cx, cy, cell * 0.22, n, Math.PI / n)}" ${FG}/>`);
      }
    }
  }
  // contorno do campo, um pouco por fora das células da borda
  if (field === 'circle') parts.push(`<circle cx="${f(mx)}" cy="${f(my)}" r="${f(Rf + pad)}" ${SO}/>`);
  else if (field === 'diamond') parts.push(`<path d="M ${f(mx)} ${f(my - Rf * 1.15 - pad)} L ${f(mx + Rf + pad)} ${f(my)} L ${f(mx)} ${f(my + Rf * 1.15 + pad)} L ${f(mx - Rf - pad)} ${f(my)} Z" ${SO}/>`);
  else if (field === 'band') for (const s of [-1, 1]) parts.push(`<line x1="0" y1="${f(my + s * (h * 0.2 + pad))}" x2="${w}" y2="${f(my + s * (h * 0.2 + pad))}" ${SO}/>`);
  else if (field === 'frame') { const d = Math.min(w, h) * 0.2 + pad; parts.push(`<rect x="${f(d)}" y="${f(d)}" width="${f(w - 2 * d)}" height="${f(h - 2 * d)}" ${SO}/>`); }
  else if (field === 'arch') parts.push(`<path d="${contourPath(mx, my, a => archFn(a) + pad)}" ${SO}/>`);
  return parts.join('\n');
}
```

## Edição 7 — `package.json` · versao 0.9.0

**Âncora** (campo version):

```
  "version": "0.8.0",
```

**Substituir por:**

```
  "version": "0.9.0",
```

## Edição 8 — `package-lock.json` · versao 0.9.0 (raiz)

**Âncora** (topo do arquivo):

```
  "name": "vectorforge",
  "version": "0.8.0",
```

**Substituir por:**

```
  "name": "vectorforge",
  "version": "0.9.0",
```

## Edição 9 — `package-lock.json` · versao 0.9.0 (pacote raiz)

**Âncora** (entrada `packages[""]`):

```
      "name": "vectorforge",
      "version": "0.8.0",
```

**Substituir por:**

```
      "name": "vectorforge",
      "version": "0.9.0",
```

## Edição 10 — `meta/CONTEXT.md` · estrutura: silhouette.mjs

**Âncora**:

```
│   ├── seeds.mjs                # instrumento de sensibilidade ao seed (`npm run seeds`, catraca, DEC-017)
```

**Substituir por:**

```
│   ├── seeds.mjs                # instrumento de sensibilidade ao seed (`npm run seeds`, catraca, DEC-017)
│   ├── silhouette.mjs           # silhueta por geometria do SVG (malha 16×16, 1 − IoU), usada pelo seeds (DEC-020)
```

## Edição 11 — `meta/CONTEXT.md` · estrutura: baseline com silhueta

**Âncora**:

```
│   └── seeds-baseline.json      # linha de base: distintos/formas por tipo em 40 seeds
```

**Substituir por:**

```
│   └── seeds-baseline.json      # linha de base: distintos/formas/silhueta por tipo em 40 seeds
```

## Edição 12 — `meta/CONTEXT.md` · Inventario: Art Deco com esqueleto

**Âncora**:

```
| **artdeco** | `src/generators/artdeco.js` | medallion, frame, divider, corner, pattern, ornament | `genADMedallion`, `genADFrame`, `genDivider('artdeco')`†, `genADCorner`, `genPattern('artdeco')`†, `genADOrn` — o seed escolhe variante de motivo, arranjo e acabamento em todos os tipos (DEC-018); `genADFrame` só varia com `vary = true`, que só o Art Deco passa |
```

**Substituir por:**

```
| **artdeco** | `src/generators/artdeco.js` | medallion, frame, divider, corner, pattern, ornament | `genADMedallion`, `genADFrame`, `genDivider('artdeco')`†, `genADCorner`, `genPattern('artdeco')`†, `genADOrn` — o seed escolhe variante de motivo, arranjo e acabamento em todos os tipos (DEC-018); `genADFrame` só varia com `vary = true`, que só o Art Deco passa; medalhão e padrão também sorteiam o ESQUELETO — contorno/escala e campo/escala da célula (piloto, DEC-020) |
```

## Edição 13 — `meta/CONTEXT.md` · Inventario: Geometrico com esqueleto

**Âncora**:

```
| **geometric** | `src/generators/geometric.js` | mandala, frame, divider, tessellation, star, symbol | `genMandala`, `genGeoFrame`, `genDivider('geo')`†, `genPattern('geo')`†, `genGeoStar`, `genGeoSymbol` — o seed escolhe variante de motivo, arranjo e acabamento em todos os tipos (DEC-018); `genMandala` só varia com `vary = true`, que só o Geométrico passa |
```

**Substituir por:**

```
| **geometric** | `src/generators/geometric.js` | mandala, frame, divider, tessellation, star, symbol | `genMandala`, `genGeoFrame`, `genDivider('geo')`†, `genPattern('geo')`†, `genGeoStar`, `genGeoSymbol` — o seed escolhe variante de motivo, arranjo e acabamento em todos os tipos (DEC-018); `genMandala` só varia com `vary = true`, que só o Geométrico passa; mandala e símbolo também sorteiam o ESQUELETO — contorno, escala, espaçamento/órbita (piloto, DEC-020) |
```

## Edição 14 — `meta/GLOSSARY.md` · termos silhueta e esqueleto

**Âncora**:

```
- **Concha em leque** — meia-lua com nervuras saindo do centro (`shellFanPaths`): devolve contorno e nervuras como dois paths. Crista, canto e ornamento lateral do Barroco.
```

**Substituir por:**

```
- **Concha em leque** — meia-lua com nervuras saindo do centro (`shellFanPaths`): devolve contorno e nervuras como dois paths. Crista, canto e ornamento lateral do Barroco.
- **Silhueta (régua)** — coluna `silhueta%` do `npm run seeds`: quanto o seed muda o que se lê na MINIATURA — média de 1 − IoU da ocupação de uma malha 16×16 entre pares de seeds, calculada da geometria do SVG (`scripts/silhouette.mjs`). Meta da F5 a partir do piloto: ≥ 25% (DEC-020).
- **Esqueleto semeado** — o seed escolhe a COMPOSIÇÃO (contorno, escala, arranjo, desvio de contagem), não só o detalhe; contorno como função r(a) (`contourRadius`/`contourPath`). Piloto em 4 tipos (DEC-020).
```

## Edição 15 — `meta/CEREBRO.md` · tecnicas: silhueta e sonda na VM

**Âncora**:

```
- **Variedade (F5):** `npm run seeds` mede, por tipo, quantas formas diferentes o seed produz (catraca, DEC-017). Gerador novo ou ajustado: o seed tem de mudar a ESTRUTURA (`formas>1`), não só os números; e o tamanho do pior caso (Complexity e Symmetry no máximo) cabe em ~120 KB. Gerador **compartilhado** entre estilos (`genADFrame`, `genMandala`, `genPattern`, `genDivider`): a variação entra só para o estilo do lote (`vary = true` ou o ramo do estilo), senão o regress muda tipos de outros estilos (DEC-018). Gerador compartilhado entre DOIS estilos do mesmo lote (`genBQAcanthus`, `genBQCartouche`): parâmetro `style` com repertório próprio de cada um, senão os dois tipos saem idênticos (DEC-019).
```

**Substituir por:**

```
- **Variedade (F5):** `npm run seeds` mede, por tipo, quantas formas diferentes o seed produz (catraca, DEC-017). Gerador novo ou ajustado: o seed tem de mudar a ESTRUTURA (`formas>1`), não só os números; e o tamanho do pior caso (Complexity e Symmetry no máximo) cabe em ~120 KB. Gerador **compartilhado** entre estilos (`genADFrame`, `genMandala`, `genPattern`, `genDivider`): a variação entra só para o estilo do lote (`vary = true` ou o ramo do estilo), senão o regress muda tipos de outros estilos (DEC-018). Gerador compartilhado entre DOIS estilos do mesmo lote (`genBQAcanthus`, `genBQCartouche`): parâmetro `style` com repertório próprio de cada um, senão os dois tipos saem idênticos (DEC-019). **A meta de variedade é a SILHUETA** (`silhueta%` ≥ 25 no `npm run seeds`, DEC-020): `formas` sobe trocando detalhe dentro do mesmo contorno, e o dono não vê isso na miniatura.
- **Sonda de UI na VM do chat:** carregar o `jsdom` direto de `../261112-sonda-ui/node_modules` pela pasta montada pode travar (o `require` lê centenas de arquivos pela ponte; medido em 2026-11-17: três execuções presas até o teto de 3 min). Copie o `node_modules` da sonda para a área local da VM uma vez (`cp -r`, ~16 MB) e rode de lá. Não é defeito do produto: o mesmo `dist` passa nas sondas carregadas localmente.
```

## Edição 16 — `CLAUDE.md` · validacao: placar de silhueta

**Âncora**:

```
- Variedade: `npm run seeds` — mede quanto o seed muda cada tipo (catraca: sai 1 se algum tipo PERDER variedade). Lote da F5 que aumenta variedade: `npm run seeds -- --update` e versione `scripts/seeds-baseline.json` no mesmo commit, citando o placar `formas>1: N/53` no relatório.
```

**Substituir por:**

```
- Variedade: `npm run seeds` — mede quanto o seed muda cada tipo (catraca: sai 1 se algum tipo PERDER variedade). Lote da F5 que aumenta variedade: `npm run seeds -- --update` e versione `scripts/seeds-baseline.json` no mesmo commit, citando no relatório o placar `formas>1: N/53` e `silhueta>=25%: N/53` (a silhueta é a meta, DEC-020).
```

## Edição 17 — `meta/STATUS.md` · versao 0.9.0

**Âncora**:

```
**[0.8.0]** — F5, lote 3: o seed passa a mudar a forma de 11 tipos do Barroco e do Vitoriano, e `victorian/flourish` e `victorian/cartouche` deixam de ser cópias dos barrocos (DEC-019) — placar `formas>1` 29/53. Antes: v0.7.0 Art Deco + Geométrico (DEC-018), v0.6.0 Botânico e `npm run seeds` (DEC-017). GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.
```

**Substituir por:**

```
**[0.9.0]** — F5: régua de silhueta no `npm run seeds` e piloto do esqueleto semeado em 4 tipos (medalhão e padrão Art Deco, mandala e símbolo geométricos), que passam de 2–9% para 26–42% de silhueta (DEC-020) — `silhueta>=25%` 10/53. Antes: v0.8.0 Barroco + Vitoriano (DEC-019), v0.7.0 Art Deco + Geométrico (DEC-018), v0.6.0 Botânico (DEC-017). GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.
```

## Edição 18 — `meta/STATUS.md` · Funcionando: piloto

**Âncora**:

```
- **Barroco e Vitoriano variados (v0.8.0, DEC-019):** 11 tipos sorteiam variante de motivo, arranjo e acabamento pelo seed (ex.: cartela oval, escudo ou lobada no Barroco; chanfrada ou arqueada no Vitoriano; volutas em espiral, conchas em leque, contas). Flourish e cartela do Vitoriano têm repertório próprio — antes eram iguais aos barrocos em 40 de 40 seeds. Medido por `npm run seeds` e `npm run regress`. Roteiro visual 1–7 ok [relatado pelo dono, 2026-11-17].
```

**Substituir por:**

```
- **Barroco e Vitoriano variados (v0.8.0, DEC-019):** 11 tipos sorteiam variante de motivo, arranjo e acabamento pelo seed (ex.: cartela oval, escudo ou lobada no Barroco; chanfrada ou arqueada no Vitoriano; volutas em espiral, conchas em leque, contas). Flourish e cartela do Vitoriano têm repertório próprio — antes eram iguais aos barrocos em 40 de 40 seeds. Medido por `npm run seeds` e `npm run regress`. Roteiro visual 1–7 ok [relatado pelo dono, 2026-11-17].
- **Esqueleto semeado — piloto (v0.9.0, DEC-020):** nos 4 tipos, o seed escolhe também a composição — medalhão em círculo, octógono, losango, quadrado, oval, arco ou sol nascente; padrão num campo (página, medalhão, losango, faixa, moldura, arco); mandala e símbolo com contorno, escala e arranjo próprios. Medido pela coluna `silhueta%` do `npm run seeds` (régua nova, `scripts/silhouette.mjs`).
```

## Edição 19 — `meta/STATUS.md` · Em Progresso: piloto

**Âncora**:

```
- **F5 — Variedade procedural:** lotes 1 (Botânico, v0.6.0), 2 (Art Deco + Geométrico, v0.7.0) e 3 (Barroco + Vitoriano, v0.8.0) entregues — placar `formas>1: 29/53`. Próximo: Celta, Islâmico, Minimal, Orgânico. Roteiros: Botânico 1–6 ok [relatado pelo dono, 2026-11-15]; lote 2 1–8 ok [relatado pelo dono, 2026-11-17]; lote 3 1–7 ok [relatado pelo dono, 2026-11-17]. **Mas o dono ainda sente falta de variedade** [relatado pelo dono, 2026-11-17]: a sonda de silhueta mostrou que nos lotes 2 e 3 o seed troca detalhes dentro do mesmo contorno (silhueta muda 2–15% contra 42–66% no Botânico). Análise `meta/analises/261117-ANALISE-variedade-silhueta.md` em discussão; os lotes 4–7 esperam a decisão.
```

**Substituir por:**

```
- **F5 — Variedade procedural:** lotes 1–3 entregues (v0.6.0–v0.8.0) e piloto do esqueleto semeado em 4 tipos (v0.9.0) — placar `formas>1: 29/53`, **`silhueta>=25%: 10/53`** (a meta agora é a silhueta, DEC-020). Roteiros: Botânico 1–6, lote 2 1–8 e lote 3 1–7 ok [relatado pelo dono]; roteiro do piloto pendente. Se o piloto convencer: a receita volta aos 19 tipos dos lotes 2 e 3 e os lotes 4–7 (Celta, Islâmico, Minimal, Orgânico) já nascem com esqueleto.
```

## Edição 20 — `meta/STATUS.md` · ordem das frentes: piloto

**Âncora**:

```
- **Ordem das frentes:** o dono escolheu F5 lote 3 (Barroco + Vitoriano) [relatado pelo dono, 2026-11-17]; a F4/B (implementação da nova interface) segue aguardando a vez.
```

**Substituir por:**

```
- **Ordem das frentes:** o dono decidiu a análise de variedade — régua de silhueta + piloto do esqueleto semeado [relatado pelo dono, 2026-11-17]; a F4/B (implementação da nova interface) segue aguardando a vez.
```

## Edição 21 — `meta/STATUS.md` · Quebrado: placar com silhueta

**Âncora**:

```
- **O seed ainda não muda a forma em 24 dos 53 tipos** (placar `npm run seeds` em v0.8.0: formas>1 29/53; 18/53 em v0.7.0, 6/53 em v0.6.0, 3/53 antes da F5). Surprise, New seed e «Like this» só variam o que os sliders variam nesses tipos. Tratado pela F5, um lote por estilo.
```

**Substituir por:**

```
- **O seed ainda não muda a forma em 24 dos 53 tipos, e só muda a SILHUETA em 10** (placar `npm run seeds` em v0.9.0: formas>1 29/53, silhueta>=25% 10/53). Nos outros, Surprise, New seed e «Like this» variam detalhe dentro do mesmo contorno ou só o que os sliders variam. Tratado pela F5.
```

## Edição 22 — `meta/ROADMAP.md` · criterio: silhueta

**Âncora**:

```
**Critério de conclusão:** instrumento de sensibilidade ao seed com **53/53** tipos produzindo desenhos distintos em 40 seeds (placar atual: rode `npm run seeds`), linha de base do regress regravada de propósito, e roteiro visual do dono por lote.
```

**Substituir por:**

```
**Critério de conclusão:** `npm run seeds` com **53/53** tipos com `silhueta%` ≥ 25 (o seed muda o que se lê na miniatura; DEC-020 — antes a meta era `formas`, que contava detalhe), linha de base do regress regravada de propósito, e roteiro visual do dono por lote. Placar atual: rode `npm run seeds`.
```

## Edição 23 — `meta/ROADMAP.md` · piloto feito

**Âncora**:

```
- [ ] Um lote por estilo: Celta, Islâmico, Minimal, Orgânico (spiral, flower, mandala).
```

**Substituir por:**

```
- [x] Régua de silhueta — coluna `silhueta%` no `npm run seeds` (`scripts/silhouette.mjs`), catraca. v0.9.0, DEC-020, análise `261117-ANALISE-variedade-silhueta.md`.
- [x] Piloto do esqueleto semeado — medalhão e padrão Art Deco, mandala e símbolo geométricos: silhueta 2–9% → 26–42%. v0.9.0, DEC-020, `specs/261117-esqueleto-semeado-piloto.md`.
- [ ] Esqueleto nos 19 tipos dos lotes 2 e 3 (depois do roteiro do piloto).
- [ ] Um lote por estilo, já com esqueleto: Celta, Islâmico, Minimal, Orgânico (spiral, flower, mandala).
```

## Edição 24 — `meta/CHANGELOG.md` · entrada 0.9.0

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

## [0.9.0] — {DATA}
### Adicionado
- **Régua de silhueta no `npm run seeds`** (`scripts/silhouette.mjs`): coluna `silhueta%` — quanto o seed muda o que se lê na miniatura (1 − IoU de uma malha 16×16, calculada da geometria do SVG, sem dependência nova). Entra na catraca e no resumo (`silhueta>=25%: N/53`). Calibrada contra uma sonda rasterizada (Spearman 0,771). Ver DEC-020.
- Primitivas `contourRadius` e `contourPath` (`core/utils.js`): contorno de um desenho radial como função r(a).

### Alterado
- **Piloto do esqueleto semeado** (F5): o seed passa a escolher também a COMPOSIÇÃO em 4 tipos — medalhão Art Deco (círculo, octógono, losango, quadrado, oval alto, arco ou sol nascente; escala; ±1 anel; ±2 raios), padrão Art Deco (campo: página, medalhão, losango, faixa, moldura ou arco; escala da célula), mandala geométrica (contorno, escala, espaçamento dos anéis, ±2 anéis) e símbolo geométrico (contorno, órbita dos nós, escala). Silhueta: medallion 7,0 → 25,8%, pattern 8,8 → 41,9%, mandala 3,0 → 29,7%, symbol 7,5 → 33,2%.
- Celta, Orgânico, fallback e Text→Form, que reusam a mandala sem `vary`, não mudam.
- Linha de base do `npm run regress` regravada para as 24 chaves dos 4 tipos; a do `npm run seeds` ganha a silhueta de todos os tipos.
```

> Troque `{DATA}` pela saída de `date +%F`, rodado na hora.

## Edição 25 — `meta/DECISIONS.md` · DEC-020 no fim

**Âncora**:

```
- O acanto/flourish continua ocupando ~1/3 da altura do canvas, como desde a v0.1.0 (IDEAS).
```

**Substituir por:**

```
- O acanto/flourish continua ocupando ~1/3 da altura do canvas, como desde a v0.1.0 (IDEAS).

---

## DEC-020 — A meta de variedade passa a ser a silhueta; piloto do esqueleto semeado em 4 tipos
**Data:** 2026-11-17 · **Status:** aceita

### Contexto
Depois do lote 3 (DEC-019), o dono ainda sentia pouca variedade [relatado pelo dono, 2026-11-17]. A análise `meta/analises/261117-ANALISE-variedade-silhueta.md` mediu, com uma sonda rasterizada fora do repo, que fora do Botânico o seed trocava detalhes dentro do mesmo contorno (silhueta 2–16% contra 42–66%) — e que a métrica `formas` do `npm run seeds` premiava essa troca. O dono escolheu: régua de silhueta + piloto do esqueleto semeado nos 4 tipos de silhueta mais parada.

### Decisão
1. **`scripts/silhouette.mjs`**: ocupação de uma malha 16×16 a partir da geometria do SVG (paths com M L H V Q C A Z, círculos, elipses, retângulos, linhas, polylines; `translate`/`scale` em `<g>`); `silhouetteChange` = média de 1 − IoU entre todos os pares. O `npm run seeds` ganha a coluna `silhueta%`, a catraca passa a cobrar também a silhueta, e o resumo conta `silhueta>=25%`.
2. **Meta de 25%** (`SIL` no `seeds.mjs`): o limiar que separa, na tabela medida, os tipos que o dono via variar dos que ele achava parados. O critério de conclusão da F5 passa a ser 53/53 com silhueta ≥ 25%.
3. **Esqueleto semeado** — o seed escolhe a COMPOSIÇÃO (contorno, escala, arranjo, desvio de contagem); contorno como r(a) (`contourRadius`/`contourPath`), seguido por anéis, pontas e nós. Piloto: `artdeco/medallion`, `artdeco/pattern` (campo + escala da célula), `geometric/mandala` (com `vary`), `geometric/symbol`.
4. **A mandala sem `vary` faz as mesmas contas na mesma ordem** — Celta/Orgânico/Text→Form ficam byte a byte iguais (o regress confere).

### Alternativas consideradas
- **Modificadores universais primeiro** (análise, opção B) — não escolhida pelo dono: mais rápida, mas genérica; fica para depois e fora do seed.
- **Régua por raster** (ImageMagick/jsdom) — rejeitada como instrumento: dependência nova e lenta; a sonda rasterizada continua fora do repo, só para calibrar.

### Consequências
- Silhueta (régua / raster, 40 / 12 seeds): medallion 25,8 / 29,8 · pattern 41,9 / 43,5 · mandala 29,7 / 30,2 · symbol 33,2 / 33,1. `silhueta>=25%`: 6/53 → 10/53. `formas>1` segue 29/53.
- Calibragem: Spearman 0,771 contra a sonda rasterizada. Divergência conhecida: divisores (0% na régua, 30–40% no raster) — o traço fica numa faixa de duas linhas da malha, e só a espessura rasterizada cruza a fronteira de célula.
- Tamanho (pior caso, canvas 400): pattern 75 KB (antes 50), mandala 33, medallion 26, symbol 6. Em 1200, o padrão vai de 362 a 561 KB (célula 0,8×) — IDEAS.
- Se o roteiro do piloto convencer, a receita volta aos 19 tipos dos lotes 2 e 3 e é o padrão dos lotes 4–7.
```

## Edição 26 — `meta/IDEAS.md` · ideia: padrao grande em 1200

**Âncora**:

```
### 2026-11-17 — Enquadrar o acanto e o flourish como o Botânico
```

**Substituir por:**

```
### 2026-11-17 — Padrão Art Deco pesado em canvas grande
Com a escala da célula semeada (0,8×), o pior caso do `artdeco/pattern` em canvas 1200 vai de 362 a 561 KB (75 KB em 400, dentro do teto). Se export grande virar queixa: limitar a escala mínima pela área do canvas, ou desenhar o motivo uma vez num `<pattern>` SVG (ver «Tile seamless» na F7).

### 2026-11-17 — Enquadrar o acanto e o flourish como o Botânico
```

## Edição 27 — `meta/analises/261117-ANALISE-variedade-silhueta.md` · analise: decidida

**Âncora**:

```
> **Status:** Em discussao
```

**Substituir por:**

```
> **Status:** Decidida — D + piloto de A, escolhido pelo dono em 2026-11-17; ver DEC-020 e `specs/261117-esqueleto-semeado-piloto.md`
```

## Edição 28 — `logs/2026-11-17.md` · Conversa 4 (chat)

**Âncora**:

```
- Dono decide: D + piloto de A (recomendado) ou B primeiro.
```

**Substituir por:**

```
- Dono decide: D + piloto de A (recomendado) ou B primeiro.

## Conversa 4 (chat)

## Objetivo do dia
Executar a decisao do dono sobre a analise de variedade: regua de silhueta + piloto do esqueleto semeado nos 4 tipos.

## Feito
- Relatorio `261117-1318-code-vectorforge-apply-wo0010.txt` lido inteiro e conferido (`9094566` empurrado, arvore limpa); arquivado com a imagem comparativa.
- Prototipo na VM: `scripts/silhouette.mjs` (silhueta por geometria) calibrado contra a sonda rasterizada (Spearman 0,771); coluna `silhueta%` e catraca no `seeds.mjs`; esqueleto semeado em artdeco/medallion, artdeco/pattern, geometric/mandala, geometric/symbol. Silhueta 26-42% nos quatro (antes 3-9); `silhueta>=25%` 6/53 -> 10/53. Regress: so as 24 chaves dos 4 tipos.
- Contact sheet de 16 seeds por tipo olhado; corrigido o contorno poligonal (rot aponta um VERTICE) e acrescentado o quadrado ao medalhao.
- WO 0011 escrita, simulada a partir do proprio texto e entregue com roteiro.

## Decisoes
- DEC-020 (a meta de variedade e a silhueta; piloto do esqueleto semeado).

## Bugs
- Nenhum de produto. Na VM do chat: carregar o jsdom pela pasta montada travou tres vezes; copiado para a area local, as sondas passam (tecnica no CEREBRO).

## Aprendizados / armadilhas
- Metrica que nao ve o que o dono ve vira meta errada: `formas` premiava trocar detalhe dentro do mesmo contorno.

## Onde parei
WO 0011 pronta para aplicar; roteiro do piloto com o dono.

## Próximos passos
- Dono aplica a WO 0011 e faz o roteiro do piloto; se convencer, esqueleto nos 19 tipos dos lotes 2 e 3 e lotes 4-7 ja com esqueleto.
```

## Edição 29 — linhas de base e build (comandos, na ordem)

1. `npm run regress | grep -c "MUDOU:"` → **24**; `npm run regress | grep "MUDOU:" | grep -vc "MUDOU: artdeco/medallion/\|MUDOU: artdeco/pattern/\|MUDOU: geometric/mandala/\|MUDOU: geometric/symbol/"` → **0**. Qualquer outra chave (Celta, Orgânico!) mudou: **PARE e reporte**.
2. `npm run regress -- --update` → `linha de base gravada: 318 chaves -> scripts/regress-baseline.json`; `npm run regress; echo "rc=$?"` → `OK`, `rc=0`.
3. `npm run seeds; echo "rc=$?"` ANTES do update → `OK — nenhum tipo perdeu variedade`, `rc=0` (a linha de base antiga não tem silhueta; a coluna só passa a ser cobrada depois do update). Se aparecer `PERDEU`: **PARE e reporte** — o piloto tirou `formas`/`distintos` de algum tipo.
4. `npm run seeds -- --update` → `linha de base gravada: 53 tipos · formas>1: 29/53 · distintos>1: 32/53 · silhueta>=25%: 10/53` (medido no protótipo). Menos que 10: **PARE**.
5. `npm run seeds | grep -E "^artdeco/medallion|^artdeco/pattern|^geometric/mandala|^geometric/symbol"` → silhueta (última coluna) **25.8**, **41.9**, **29.7**, **33.2**; `npm run seeds; echo "rc=$?"` → `OK`, `rc=0`.
6. `npm run build` → `✓ dist/vectorforge.html gerado` (protótipo: 91.4 KB).

---

## Fora de escopo

Os outros 19 tipos dos lotes 2 e 3 e os 24 parados (depois do roteiro do piloto); modificadores universais; a sonda rasterizada (fica na pasta-pai). Se algo parecer estranho no olho, relate com print.

## Armadilhas desta WO

- **Não rode build, regress nem seeds entre a Edição 0 e a Edição 1:** com só os arquivos do chat, o bundle falha (imports que a Edição 1 cria).
- **Celta (`medallion`) e Orgânico (`mandala`) usam `genMandala` sem `vary` e NÃO podem mudar** — o passo 1 da edição final confere. Se mudarem, a nova `genMandala` alterou a ordem das contas no caminho sem `vary`: PARE.
- **O formato de `scripts/seeds-baseline.json` muda** (cada linha ganha `"silhouette"`): o diff dela tem as 53 linhas trocadas. É esperado.
- **Sonda de UI na VM do chat travou ao carregar o jsdom pela pasta montada** (técnica nova no CEREBRO). Na máquina do dono, rodar `node behave.cjs` direto não tem esse problema; se travar, não é o produto.
- **`grep -c` conta LINHAS.**

---

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` → ` M` em `CLAUDE.md`, `dist/vectorforge.html`, `logs/2026-11-17.md`, `meta/analises/261117-ANALISE-variedade-silhueta.md`, `meta/CEREBRO.md`, `meta/CHANGELOG.md`, `meta/CONTEXT.md`, `meta/DECISIONS.md`, `meta/GLOSSARY.md`, `meta/IDEAS.md`, `meta/ROADMAP.md`, `meta/STATUS.md`, `package-lock.json`, `package.json`, `scripts/regress-baseline.json`, `scripts/seeds-baseline.json`, `scripts/seeds.mjs`, `src/core/utils.js`, `src/generators/artdeco.js`, `src/generators/generic.js`, `src/generators/geometric.js` (**21 `M`**) e `??` em `meta/workorders/261117-wo0011-esqueleto-semeado-piloto.md`, `scripts/silhouette.mjs`, `specs/261117-esqueleto-semeado-piloto.md` (**3 `??`**). Em `src/`, só os 4 arquivos listados.
- [ ] `git diff --stat -- scripts/regress-baseline.json` → `24 insertions(+), 24 deletions(-)`. `git diff --stat -- scripts/seeds-baseline.json` → `53 insertions(+), 53 deletions(-)`.
- [ ] `grep -c "^export function contourRadius\|^export function contourPath" src/core/utils.js` → **2**; `grep -c "if (!inField(cx, cy)) continue;" src/generators/generic.js` → **1**.
- [ ] `grep -c '"version": "0.9.0",' package.json package-lock.json` → `package.json:1`, `package-lock.json:2`.
- [ ] `grep -c "^## \[0.9.0\] — 20" meta/CHANGELOG.md` → **1**; `grep -c "{DATA}" meta/CHANGELOG.md` → **0**; `grep -c "^## DEC-020 " meta/DECISIONS.md` → **1**; `grep -c "^> \*\*Status:\*\* Decidida" meta/analises/261117-ANALISE-variedade-silhueta.md` → **1**.
- [ ] `grep -c "^\*\*\[0.9.0\]\*\* —" meta/STATUS.md` → **1**; `grep -c "silhueta>=25%: 10/53" meta/STATUS.md` → **1**; `grep -c "^- \[x\] Piloto do esqueleto semeado" meta/ROADMAP.md` → **1**; `grep -c "^## Conversa 4 (chat)" logs/2026-11-17.md` → **1**.
- [ ] **dist:** `grep -c "//__SCRIPT__" dist/vectorforge.html` → **0**.
- [ ] Sonda de UI: `cd ../261112-sonda-ui && node behave.cjs ../vectorforge/dist/vectorforge.html | grep -c "^OK"; cd ../vectorforge` → **18**.
  - **Quem roda:** quem aplica. **Chega no ramo?** No carregamento e na seleção de estilos ao acaso — não percorre os 4 tipos. **Pergunta que NÃO responde:** a aparência — é o roteiro do dono (o chat rodou no protótipo sondas descartáveis que renderizam Art Deco + Geométrico e Barroco + Vitoriano × 3 seeds no `dist`: 36 + 36 renders, 0 erros de JS).

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · desvios · saída CRUA: as contagens do regress (passo 1), `seeds --update` e as 4 linhas do passo 5 · arquivos tocados · build · commit e push.

## Commit — blocos separados, mensagem SEM acento

```
git add CLAUDE.md dist/vectorforge.html logs/2026-11-17.md meta/analises/261117-ANALISE-variedade-silhueta.md meta/CEREBRO.md meta/CHANGELOG.md meta/CONTEXT.md meta/DECISIONS.md meta/GLOSSARY.md meta/IDEAS.md meta/ROADMAP.md meta/STATUS.md package-lock.json package.json scripts/regress-baseline.json scripts/seeds-baseline.json scripts/seeds.mjs src/core/utils.js src/generators/artdeco.js src/generators/generic.js src/generators/geometric.js meta/workorders/261117-wo0011-esqueleto-semeado-piloto.md scripts/silhouette.mjs specs/261117-esqueleto-semeado-piloto.md
```

```
git commit -m "feat(f5): regua de silhueta no npm run seeds e piloto do esqueleto semeado em 4 tipos" -m "scripts/silhouette.mjs mede quanto o seed muda a miniatura (malha 16x16 por geometria, 1-IoU); seeds ganha a coluna silhueta e a cobra na catraca. Medalhao e padrao Art Deco, mandala e simbolo geometricos sorteiam contorno, escala e arranjo: silhueta de 3-9% para 26-42%; silhueta>=25% de 6/53 para 10/53. Celta e Organico inalterados. Versao 0.9.0. Ver DEC-020 e WO 0011."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
