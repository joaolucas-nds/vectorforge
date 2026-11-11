# WO 0001 — Flow Fields: tipo `flow` no estilo Organic, versão 0.4.0, F3 concluída

> **Tipo:** mista — código (Edições 1–4) + versão (5–7) + registro nos meta (8–19).
> **Config sugerida:** modelo mais leve (Sonnet) · `/effort medium` — o diff é exato e foi validado no protótipo; não há decisão delegada.
> **Pré-requisito:** commit `2104f73` («docs: funde Kit v1.135.0 …»), árvore limpa (`git status --short` vazio).
> **Base:** `specs/261111-flow-fields.md` (o QUÊ e os critérios de aceite) e o protótipo medido pelo chat em 2026-11-11.
> **Arquivos que o chat gravou no disco e esta WO usa:**
>   - `specs/261111-flow-fields.md` — sha1 `dd3c58da76a6f995407c9ebefbed93ab20dd6a32` (versionado por esta WO)
>   - `../261111-sonda-flow.mjs` — sha1 `b471669e9d774375461acba0985cd530bce60329` (pasta-pai; NÃO versionar)
> **Âncora semântica:** se um trecho-âncora não bater EXATAMENTE (1 ocorrência), **PARE e reporte** — nunca chute um lugar próximo.
> **Idempotência:** antes de cada edição, procure o texto NOVO INTEIRO no arquivo; se já estiver lá, **PULE** e diga no relatório. Nas Edições 1, 4, 9, 13, 15 e 19 a âncora fica DENTRO do texto novo (já aplicada = texto novo inteiro presente); nas outras 13 a âncora some (já aplicada = texto novo presente **e** âncora ausente).
> **Âncoras lidas em** (lidas do disco pelo chat neste turno, no commit `2104f73`; trecho = primeira linha da âncora):
>   - Edição 1 · `src/generators/organic.js` — `  parts.push(´<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.013)}" fill="${PALETTES[st`
>   - Edição 2 · `src/core/state.js` — `  organic:   ['leaf','spiral','branch','flower','mandala','wave','phyllotaxis'],`
>   - Edição 3 · `src/core/generate.js` — `import { genOrganicLeaf, genOrganicSpiral, genOrganicBranch, genOrganicFlower, genWave, ge`
>   - Edição 4 · `src/core/generate.js` — `    phyllotaxis:  () => genPhyllotaxis(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw),`
>   - Edição 5 · `package.json` — `  "version": "0.3.0",`
>   - Edição 6 · `package-lock.json` — `  "name": "vectorforge",`
>   - Edição 7 · `package-lock.json` — `      "name": "vectorforge",`
>   - Edição 8 · `meta/CONTEXT.md` — `| **organic** | ´src/generators/organic.js´ | leaf, spiral, branch, flower, mandala, wave,`
>   - Edição 9 · `meta/GLOSSARY.md` — `- **Estilo Botanical** — estilo introduzido em v0.3.0 (F3), com 3 tipos: ´tree´ (árvore re`
>   - Edição 10 · `meta/ROADMAP.md` — `## 🟡 F3 — Motor Estrutural e Geradores de Nova Categoria *(em curso — build step + L-Syste`
>   - Edição 11 · `meta/ROADMAP.md` — `- [ ] Flow Fields como tipo novo em Organic/Minimal, usando o ´snoise´ já disponível em ´s`
>   - Edição 12 · `meta/IDEAS.md` — `### 2026-06-30 — Flow Fields (F3)`
>   - Edição 13 · `meta/IDEAS.md` — `- **Motor L-System + estilo Botanical (F3)** — implementado em 2026-07-24 (DEC-011): ´lsys`
>   - Edição 14 · `meta/STATUS.md` — `**[0.3.0]** — motor L-System entregue com 3 presets (árvore recursiva, Koch snowflake, Dra`
>   - Edição 15 · `meta/STATUS.md` — `- **NOVO — GitHub Pages publicado.** Fonte: branch ´main´, pasta raiz. ´index.html´ na rai`
>   - Edição 16 · `meta/STATUS.md` — `- **F3 quase fechada.** Restou só Flow Fields (campo de direções via ´snoise´, partículas `
>   - Edição 17 · `meta/STATUS.md` — `- [ ] **Flow Fields** (último item de F3): campo de direções via ´snoise´ já disponível em`
>   - Edição 18 · `meta/CHANGELOG.md` — `## [Não lançado]`
>   - Edição 19 · `meta/DECISIONS.md` — `- Carimbos do kit (CEREBRO, 3 skills, modelo de WO) em v1.135.0.`
> **Próximo comando:** `/wrap wo0001-flow-fields`

> **Canal dos meta neste ciclo = CODE.** Esta WO É o registro: aplique as edições nos `meta/` e não espere doc do chat. O `/wrap` depois acrescenta só o log do dia e a «Última conversa» do STATUS.

---

## 1. Por que

O critério de conclusão de F3 pede Flow Fields como tipo novo. A spec fixa o comportamento; esta WO aplica o código que o chat prototipou e mediu (52 tipos antigos com saída idêntica, Flow ≤ 45 KB e ≤ 12 ms por chamada no protótipo) e registra a entrega como 0.4.0.

## Inventário — de onde saiu a lista de edições

- **Código:** os lugares que registram um tipo novo saíram do próprio repo — `grep -rn "phyllotaxis" src` devolve **2** pontos (`state.js` na `TYPES_BY_STYLE`, `generate.js` no dispatcher), mais o `import` do `generate.js` e o arquivo do gerador. Ícone e chip de tipo NÃO precisam de edição: `buildTypeChips()` em `ui.js` monta os chips a partir de `TYPES_BY_STYLE`, e o ícone é por estilo, não por tipo. **4 edições de código.**
- **Versão:** `package.json` (1) e `package-lock.json` (2 — o lock estava em 0.2.0 e nunca foi sincronizado com o 0.3.0). **3 edições.**
- **Registro:** CONTEXT (Inventário), GLOSSARY, ROADMAP (2), IDEAS (MOVER em 2 metades), STATUS (4), CHANGELOG, DECISIONS. **12 edições.** STATUS «Última conversa» e o log do dia ficam para o `/wrap`.
- Total: **19 edições** em **12 arquivos**, mais o `dist/vectorforge.html` regenerado pelo build. Se você achar outro lugar que registra tipos, PARE e reporte antes de editar.

---

## Edição 0 — preparo e linha de base (não edita nada versionado)

1. `sha1sum specs/261111-flow-fields.md ../261111-sonda-flow.mjs` → tem de bater com o cabeçalho. Hash diferente: **PARE e reporte**.
2. `git status --short` → só três linhas: ` M logs/2026-11-11.md` (o chat atualizou «Onde parei»), `?? meta/workorders/261111-wo0001-flow-fields.md` e `?? specs/`. Qualquer outra: **PARE e reporte**.
3. Se `node_modules/` não existir: `npm ci` (não `npm install` — o `ci` não reescreve o lock).
4. Linha de base da sonda, ANTES de qualquer edição:
   - `npx esbuild ../261111-sonda-flow.mjs --bundle --platform=node --format=esm --outfile=../261111-sonda-flow.bundle.mjs`
   - `node ../261111-sonda-flow.bundle.mjs > ../261111-sonda-antes.json`
   - `grep -c '"sha1"' ../261111-sonda-antes.json` → **312** (medido no protótipo; é contagem de linha, uma por chave). Número diferente: **PARE e reporte** — a linha de base não é a que esta WO assume.

## Edição 1 — `src/generators/organic.js` · acrescenta genFlowField no fim

**Âncora** (as três últimas linhas do arquivo — o fim de `genPhyllotaxis`):

```
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.013)}" fill="${PALETTES[state.pal].bg}"/>`);
  return parts.join('\n');
}
```

**Substituir por:**

```
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.013)}" fill="${PALETTES[state.pal].bg}"/>`);
  return parts.join('\n');
}

export function genFlowField(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  /** Flow Field: partículas seguem um campo de direções derivado do Simplex Noise
   *  e traçam linhas curvas (aspecto de fluxo/marmorizado), contidas num disco de raio sz.
   *  Complexity → densidade (nº de partículas e de passos);
   *  Symmetry  → simetria rotacional: 1 (campo livre) a 8 cópias girando em torno do centro.
   *  Todas as cópias saem num único <path> (subpaths via M) para manter o SVG enxuto. Ver DEC-013. */
  const folds   = 1 + Math.round(sym * 7);              // 1–8 cópias rotacionais
  const total   = Math.round(30 + comp * 90);           // 30–120 partículas somando todas as cópias
  const perFold = Math.max(4, Math.round(total / folds));
  const steps   = Math.round(40 + comp * 80);           // 40–120 passos por partícula
  const stepLen = sz * 0.015;
  const scale   = 0.9;                                  // frequência do campo, em unidades de sz (baixa = curvas largas)
  const R2      = sz * sz;
  const lines = [], seeds = [];

  for (let p = 0; p < perFold; p++) {
    // Origem uniforme no disco (sqrt evita concentrar partículas no centro)
    const r0 = sz * 0.95 * Math.sqrt(rnd()), a0 = rnd() * TAU;
    let x = r0 * Math.cos(a0), y = r0 * Math.sin(a0);   // coordenadas locais, centro em (0,0)
    const pts = [[x, y]];
    for (let s = 0; s < steps; s++) {
      const theta = snoise(x / sz * scale, y / sz * scale) * Math.PI; // ±π: vira sem dar nó
      x += Math.cos(theta) * stepLen;
      y += Math.sin(theta) * stepLen;
      if (x * x + y * y > R2) break;                    // partícula morre ao sair do disco
      pts.push([x, y]);
    }
    if (pts.length < 3) continue;                       // traço curto demais vira ruído visual
    lines.push(pts);
    if (p % 4 === 0) seeds.push(pts[0]);
  }

  // Emite as cópias girando cada ponto — sem <g transform>, para o SVG continuar
  // "achatado" ao importar em Figma/Canva; pula 1 de cada 2 pontos (o passo é curto
  // o bastante para a curva não perder forma) e fecha sempre no último ponto.
  let d = '';
  const dots = [];
  for (let k = 0; k < folds; k++) {
    const rot = k * TAU / folds, c = Math.cos(rot), s = Math.sin(rot);
    const tx = (q) => f(cx + q[0] * c - q[1] * s), ty = (q) => f(cy + q[0] * s + q[1] * c);
    for (const pts of lines) {
      d += `M ${tx(pts[0])} ${ty(pts[0])}`;
      for (let i = 2; i < pts.length; i += 2) d += ` L ${tx(pts[i])} ${ty(pts[i])}`;
      if ((pts.length - 1) % 2 === 1) { const q = pts[pts.length - 1]; d += ` L ${tx(q)} ${ty(q)}`; }
      d += ' ';
    }
    for (const q of seeds) dots.push(`<circle cx="${tx(q)}" cy="${ty(q)}" r="${f(sz * 0.012)}" ${FG}/>`);
  }
  return [`<path d="${d.trim()}" ${SO} stroke-linecap="round" stroke-linejoin="round"/>`, ...dots].join('\n');
}
```

## Edição 2 — `src/core/state.js` · registra flow em TYPES_BY_STYLE

**Âncora** (linha `organic` de `TYPES_BY_STYLE`):

```
  organic:   ['leaf','spiral','branch','flower','mandala','wave','phyllotaxis'],
```

**Substituir por:**

```
  organic:   ['leaf','spiral','branch','flower','mandala','wave','phyllotaxis','flow'],
```

## Edição 3 — `src/core/generate.js` · importa genFlowField

**Âncora** (import dos geradores Organic, no topo):

```
import { genOrganicLeaf, genOrganicSpiral, genOrganicBranch, genOrganicFlower, genWave, genPhyllotaxis } from '../generators/organic.js';
```

**Substituir por:**

```
import { genOrganicLeaf, genOrganicSpiral, genOrganicBranch, genOrganicFlower, genWave, genPhyllotaxis, genFlowField } from '../generators/organic.js';
```

## Edição 4 — `src/core/generate.js` · despacha o tipo flow

**Âncora** (entrada `phyllotaxis` do bloco `organic` em `generators` (dentro de `generateContent`)):

```
    phyllotaxis:  () => genPhyllotaxis(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw),
```

**Substituir por:**

```
    phyllotaxis:  () => genPhyllotaxis(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw),
    flow:         () => genFlowField(cx, cy, sz, comp, sym, rnd, SO, FG, sw),
```

## Edição 5 — `package.json` · versao 0.4.0

**Âncora** (campo `version`):

```
  "version": "0.3.0",
```

**Substituir por:**

```
  "version": "0.4.0",
```

## Edição 6 — `package-lock.json` · versao do lock 1 de 2

**Âncora** (topo do arquivo (estava em 0.2.0, nunca sincronizado com o 0.3.0)):

```
  "name": "vectorforge",
  "version": "0.2.0",
```

**Substituir por:**

```
  "name": "vectorforge",
  "version": "0.4.0",
```

## Edição 7 — `package-lock.json` · versao do lock 2 de 2

**Âncora** (entrada `packages[""]`):

```
      "name": "vectorforge",
      "version": "0.2.0",
```

**Substituir por:**

```
      "name": "vectorforge",
      "version": "0.4.0",
```

## Edição 8 — `meta/CONTEXT.md` · linha organic no Inventario

**Âncora** (linha `organic` da tabela «Inventário de Geradores»):

```
| **organic** | `src/generators/organic.js` | leaf, spiral, branch, flower, mandala, wave, phyllotaxis | `genOrganicLeaf` (usa `snoise`), `genOrganicSpiral`, `genOrganicBranch`, `genOrganicFlower`, `genMandala`‡ (reuso, n=8), `genWave` (usa `snoise`), `genPhyllotaxis` (usa `snoise`) |
```

**Substituir por:**

```
| **organic** | `src/generators/organic.js` | leaf, spiral, branch, flower, mandala, wave, phyllotaxis, flow | `genOrganicLeaf` (usa `snoise`), `genOrganicSpiral`, `genOrganicBranch`, `genOrganicFlower`, `genMandala`‡ (reuso, n=8), `genWave` (usa `snoise`), `genPhyllotaxis` (usa `snoise`), `genFlowField` (usa `snoise`; disco de raio `sz`, ver DEC-013) |
```

## Edição 9 — `meta/GLOSSARY.md` · termo Flow Field

**Âncora** (item «Estilo Botanical» em «Conceitos do projeto»):

```
- **Estilo Botanical** — estilo introduzido em v0.3.0 (F3), com 3 tipos: `tree` (árvore recursiva), `koch` (floco de neve de Koch) e `dragon` (Dragon curve) — todos gerados pelo motor L-System, ver DEC-011.
```

**Substituir por:**

```
- **Estilo Botanical** — estilo introduzido em v0.3.0 (F3), com 3 tipos: `tree` (árvore recursiva), `koch` (floco de neve de Koch) e `dragon` (Dragon curve) — todos gerados pelo motor L-System, ver DEC-011.
- **Flow Field (campo de fluxo)** — campo de direções derivado do Simplex Noise; partículas soltas nele andam passo a passo na direção local e traçam linhas de corrente. Tipo `flow` no estilo Organic desde v0.4.0 (`genFlowField`, DEC-013). **Folds** = número de cópias rotacionais (1–8), controlado por Symmetry.
```

## Edição 10 — `meta/ROADMAP.md` · F3 concluida

**Âncora** (título da fase F3):

```
## 🟡 F3 — Motor Estrutural e Geradores de Nova Categoria *(em curso — build step + L-System concluídos, falta só Flow Fields)*
```

**Substituir por:**

```
## 🟢 F3 — Motor Estrutural e Geradores de Nova Categoria *(concluída em v0.4.0 — critério atendido; os débitos herdados marcados `[ ]` abaixo seguem abertos e não bloqueiam F4)*
```

## Edição 11 — `meta/ROADMAP.md` · item Flow Fields marcado

**Âncora** (item Flow Fields da F3):

```
- [ ] Flow Fields como tipo novo em Organic/Minimal, usando o `snoise` já disponível em `src/core/utils.js`.
```

**Substituir por:**

```
- [x] **Flow Fields** — tipo `flow` no estilo Organic (`genFlowField` em `src/generators/organic.js`), sobre o `snoise` de `src/core/utils.js`. Variante Minimal ficou fora de escopo. Ver DEC-013 e `specs/261111-flow-fields.md`.
```

## Edição 12 — `meta/IDEAS.md` · Flow Fields sai das ativas

**Âncora** (entrada «2026-06-30 — Flow Fields (F3)» em «Ideias Ativas — Assistente» (título + parágrafo) — metade 1 do MOVER; a metade 2 é a próxima edição):

```
### 2026-06-30 — Flow Fields (F3)
Campo de direções derivado de Simplex Noise → partículas traçam caminhos curvos. Cria ornamentos tipo "fluxo de cabelo"/marmorizado. ~120 linhas JS, usa o `snoise` já integrado em v0.2.0. Perf: 500 partículas × 200 passos ≈ 50ms em V8 moderno; usar requestAnimationFrame ou Web Worker para não bloquear UI durante variações.
```

**Substituir por:**

```
### 2026-11-11 — Promover a comparação antes/depois a instrumento versionado
Terceira vez que o projeto compara a saída de todos os geradores antes e depois de uma mudança (DEC-010 com Playwright, DEC-011, e agora a sonda `261111-sonda-flow.mjs`, Node + esbuild, sem browser). Pela regra do kit, sonda rodada uma segunda vez para comparar já é instrumento sem teste. Candidato: `scripts/regress.mjs` versionado + `npm run regress`, saindo com código de erro quando uma chave antiga muda. Decisão do dono.
```

## Edição 13 — `meta/IDEAS.md` · Flow Fields entra em Concluidas

**Âncora** (último item de «Concluídas» — metade 2 do MOVER):

```
- **Motor L-System + estilo Botanical (F3)** — implementado em 2026-07-24 (DEC-011): `lsystemExpand`/`turtleToPath` + 3 presets (tree/koch/dragon) em `src/generators/botanical.js`. Zero regressão nos 8 estilos anteriores, verificada byte-a-byte.
```

**Substituir por:**

```
- **Motor L-System + estilo Botanical (F3)** — implementado em 2026-07-24 (DEC-011): `lsystemExpand`/`turtleToPath` + 3 presets (tree/koch/dragon) em `src/generators/botanical.js`. Zero regressão nos 8 estilos anteriores, verificada byte-a-byte.
- **Flow Fields (F3)** — implementada em v0.4.0 (DEC-013): tipo `flow` no Organic, `genFlowField`. Ideia original (2026-06-30) previa ~120 linhas e 500 partículas × 200 passos; a versão entregue usa 30–120 partículas × 40–120 passos num disco, porque o tamanho do SVG (não o tempo) era o gargalo.
```

## Edição 14 — `meta/STATUS.md` · versao atual 0.4.0

**Âncora** (parágrafo de «Versão Atual»):

```
**[0.3.0]** — motor L-System entregue com 3 presets (árvore recursiva, Koch snowflake, Dragon curve), novo estilo **Botanical**. Zero regressão nos 8 estilos anteriores (as 49 combinações antigas continuam byte-a-byte idênticas). GitHub Pages ativado e publicado (`https://joaolucas-nds.github.io/vectorforge/`, com redirect de raiz para `dist/vectorforge.html`). F3 segue aberta: falta Flow Fields.
```

**Substituir por:**

```
**[0.4.0]** — Flow Fields entregue (tipo `flow` no estilo Organic, DEC-013) e **F3 concluída**. Zero regressão nos 52 tipos anteriores (sonda antes/depois, hashes idênticos). GitHub Pages publicado (`https://joaolucas-nds.github.io/vectorforge/`, redirect de raiz para `dist/vectorforge.html`).
```

## Edição 15 — `meta/STATUS.md` · Flow Fields em Funcionando

**Âncora** (último item de «Funcionando»):

```
- **NOVO — GitHub Pages publicado.** Fonte: branch `main`, pasta raiz. `index.html` na raiz redireciona para `dist/vectorforge.html` (a raiz sozinha cairia no fallback do `README.md`, que é só um placeholder de uma linha).
```

**Substituir por:**

```
- **NOVO — GitHub Pages publicado.** Fonte: branch `main`, pasta raiz. `index.html` na raiz redireciona para `dist/vectorforge.html` (a raiz sozinha cairia no fallback do `README.md`, que é só um placeholder de uma linha).
- **NOVO — Flow Fields (`flow`, estilo Organic)**: partículas num campo de direções do `snoise`, dentro de um disco; Complexity → densidade, Symmetry → 1–8 cópias rotacionais. Ver DEC-013.
```

## Edição 16 — `meta/STATUS.md` · Em Progresso esvaziado

**Âncora** (único item de «Em Progresso»):

```
- **F3 quase fechada.** Restou só Flow Fields (campo de direções via `snoise`, partículas traçando caminhos curvos) para o critério de conclusão de F3 valer por completo.
```

**Substituir por:**

```
- Nada em curso. F3 concluída em v0.4.0; F4 ainda não aberta — próxima frente a escolher com o dono (ROADMAP F4 ou backlog abaixo).
```

## Edição 17 — `meta/STATUS.md` · Flow Fields sai do backlog

**Âncora** (primeiro item do «Backlog» — trocado pela linha que vinha logo abaixo dele, para remover sem deixar linha vazia):

```
- [ ] **Flow Fields** (último item de F3): campo de direções via `snoise` já disponível em `src/core/utils.js` — partículas traçando caminhos curvos, tipo novo em Organic/Minimal.
- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (`genADMedallion`, `genBQFrame`, etc.).
```

**Substituir por:**

```
- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (`genADMedallion`, `genBQFrame`, etc.).
```

## Edição 18 — `meta/CHANGELOG.md` · entrada 0.4.0

**Âncora** (bloco «[Não lançado]» inteiro, do título até a linha «Próxima entrega…»):

```
## [Não lançado]
### Alterado
- **Método de trabalho (só tooling/docs, sem mudança no produto):** ASU e FlatDrop descontinuados; modo Code instalado (`CLAUDE.md`, `.claude/` com skills `apply-wo`/`wrap`/`sondar`, `meta/workorders/`, `meta/SPEC.md`). CEREBRO, Instruções e docs vivos migrados ao Kit v1.135.0. Ver DEC-012.

*(Próxima entrega de produto prevista: Flow Fields, item restante de F3.)*
```

**Substituir por:**

```
## [Não lançado]
*(vazio)*

---

## [0.4.0] — {DATA}
### Adicionado
- **Flow Fields (F3)** — novo tipo `flow` no estilo Organic (`genFlowField` em `src/generators/organic.js`): partículas seguem um campo de direções do Simplex Noise dentro de um disco de raio `sz`; Complexity → densidade (30–120 partículas, 40–120 passos), Symmetry → 1 a 8 cópias rotacionais. Um único `<path>` por desenho. Fecha o critério de conclusão de F3. Ver DEC-013.

### Alterado
- **Método de trabalho (só tooling/docs, sem mudança no produto):** ASU e FlatDrop descontinuados; modo Code instalado (`CLAUDE.md`, `.claude/` com skills `apply-wo`/`wrap`/`sondar`, `meta/workorders/`, `meta/SPEC.md`). CEREBRO, Instruções e docs vivos migrados ao Kit v1.135.0. Ver DEC-012.
```

> Troque `{DATA}` pela saída de `date +%F`, rodado na hora.

## Edição 19 — `meta/DECISIONS.md` · DEC-013 no fim

**Âncora** (última linha do arquivo (fim da DEC-012)):

```
- Carimbos do kit (CEREBRO, 3 skills, modelo de WO) em v1.135.0.
```

**Substituir por:**

```
- Carimbos do kit (CEREBRO, 3 skills, modelo de WO) em v1.135.0.


---

## DEC-013 — Flow Fields: disco de raio `sz`, Symmetry como cópias rotacionais, um `<path>` só
**Data:** 2026-11-11 · **Status:** aceita

### Contexto
F3 fechava com «Flow Fields como tipo novo». Faltava o como: onde o campo vive (canvas inteiro ou região), o que `comp`/`sym` significam num campo de fluxo, e como manter o SVG pequeno — a Dragon curve já tinha mostrado (DEC-011) que o tamanho da string é o gargalo antes do tempo.

### Decisão
1. **Um tipo, `flow`, só no Organic** — onde o `snoise` já mora; menor mudança que fecha o critério.
2. **Domínio = disco de raio `sz` em `(cx, cy)`**, não o canvas: casa com os geradores centrados e funciona nas miniaturas de variação, que passam `cx/cy/sz` próprios.
3. **`comp` → densidade** (30–120 partículas, 40–120 passos); **`sym` → simetria rotacional** (`folds = 1 + round(sym × 7)`), com as partículas divididas entre as cópias.
4. **Campo `θ = snoise(x/sz × 0.9, y/sz × 0.9) × π`, passo `sz × 0.015`** — escolhido por comparação visual no protótipo: `× 2π` com frequência 1,6 dava nós e quinas.
5. **Saída achatada:** um `<path>` com subpaths, cópias giradas ponto a ponto, 1 de cada 2 pontos emitido; pontos de origem em `FG` (1 a cada 4).

### Alternativas consideradas
- **Campo no canvas inteiro (`state.w`/`state.h`)** — rejeitada: desenquadra nas miniaturas, como já acontece com o `genWave`.
- **Cópias via `<g transform="rotate">` ou `<use>`** — rejeitada: `<g>` aninhado complica a importação em Figma/Canva, e `<use>` exige `id`, que colidiria entre o canvas e as 4 miniaturas presentes no mesmo DOM.
- **Variante também no Minimal** — adiada (fora de escopo da spec).

### Consequências
- Medido no protótipo (Node 22, sandbox do chat): 8.755–45.432 bytes e 1–12 ms por chamada; as 312 chaves antigas da sonda ficaram com hash idêntico. A medição na máquina do dono está no relatório de aplicação da WO 0001.
- Regra que vale para geradores futuros: **gerador não emite `id`** (o mesmo SVG é renderizado várias vezes no mesmo DOM).

```

## Edição 20 — build

`npm run build` → termina com `✓ dist/vectorforge.html gerado`. Erro: **PARE e reporte**, não commite.

---

## Fora de escopo

Variante Minimal; qualquer ajuste de constante do gerador (frequência, passo, densidade) — se o visual parecer errado, relate com print, não retoque; ícone novo; promover a sonda a instrumento (está no IDEAS como candidato); qualquer outro item do backlog.

## Armadilhas desta WO

- **Bloco de código com crase.** O texto da Edição 1 contém template strings com crase; ele está cercado por quatro crases no lugar de três. Copie o miolo, não as cercas.
- **A sonda importa `./vectorforge/src/…` relativo à pasta-pai** — rode os comandos a partir da raiz do repo, com `../` como está escrito. O bundle é refeito a cada rodada porque o esbuild congela o `src/` do momento dentro dele.
- **Hashes e milissegundos podem variar entre máquinas** (Node/V8 diferentes arredondam seno e cosseno de forma diferente em casos raros). Por isso a conferência compara a máquina com ela mesma (antes × depois), e os números do protótipo vão como referência: **deduzido — relate o cru, não pare**.

---

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` lista **exatamente** estes 13 modificados (`M`) — `dist/vectorforge.html`, `package.json`, `package-lock.json`, `src/core/generate.js`, `src/core/state.js`, `src/generators/organic.js`, `meta/CHANGELOG.md`, `meta/CONTEXT.md`, `meta/DECISIONS.md`, `meta/GLOSSARY.md`, `meta/IDEAS.md`, `meta/ROADMAP.md`, `meta/STATUS.md` — mais `logs/2026-11-11.md` (`M`, do chat) e **2 `??`** (`specs/` e esta WO). Nada da pasta-pai aparece (ela está fora do repo).
- [ ] **Sonda depois** — rebundle (mesmo comando da Edição 0) e `node ../261111-sonda-flow.bundle.mjs --compare ../261111-sonda-antes.json > ../261111-sonda-depois.txt`. Esperado (medido no protótipo): `chaves antes: 312 · chaves depois: 318`, `chaves antigas com saida DIFERENTE: 0`, `chaves novas: 6`, `chaves nao-deterministicas (mesma chamada, saida diferente): 0`. **Qualquer chave antiga DIFERENTE: PARE** — o código novo vazou para um gerador existente. Nas 6 linhas `NOVA:`, `"paths":1` e `bytes` ≤ 80000 (protótipo: 8755–45432; se passar de 80000, PARE).
  - **Quem roda:** quem aplica. **Chega no ramo?** Sim: a sonda chama `generateContent` de `src/core/generate.js`, que despacha `organic/flow` para `genFlowField` em `src/generators/organic.js`. **Pergunta que NÃO responde:** «presta?» — a sonda conta hashes e bytes e não abre o SVG; o visual é o roteiro do dono (no chat).
  - **Prova de vida:** a linha de base tem 312 chaves e a rodada depois tem 318 — se o `--compare` disser 312/312, o bundle não foi refeito e a sonda mediu o código velho.
- [ ] `grep -c "^export function genFlowField(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {$" src/generators/organic.js` → **1**.
- [ ] `grep -c "'phyllotaxis','flow'\]" src/core/state.js` → **1**.
- [ ] `grep -c "genFlowField" src/core/generate.js` → **2** (linhas: o import e o dispatcher).
- [ ] `grep -o '"phyllotaxis","flow"' dist/vectorforge.html | wc -l` → **1** (ocorrência; medido no build do protótipo).
- [ ] `grep -c '^  "version": "0.4.0",$' package.json` → **1**; `grep -c '"version": "0.4.0",' package-lock.json` → **2**; `grep -c '"version": "0.2.0",' package-lock.json` → **0** (nenhum pacote do esbuild usa 0.2.0 — conferido no lock atual).
- [ ] `grep -c "^## \[0.4.0\] — 20" meta/CHANGELOG.md` → **1** (a data foi trocada; `grep -c "{DATA}" meta/CHANGELOG.md` → **0**).
- [ ] `grep -c "^## DEC-013 " meta/DECISIONS.md` → **1**.
- [ ] `grep -c "^### 2026-06-30 — Flow Fields (F3)$" meta/IDEAS.md` → **0** e `grep -c "^- \*\*Flow Fields (F3)\*\* — implementada em v0.4.0" meta/IDEAS.md` → **1** (as duas metades do MOVER).
- [ ] `grep -c "^- \[x\] \*\*Flow Fields\*\*" meta/ROADMAP.md` → **1** e `grep -c "^## 🟢 F3 " meta/ROADMAP.md` → **1**.
- [ ] `grep -c "^- \[ \] \*\*Flow Fields\*\*" meta/STATUS.md` → **0** e `grep -c "^\*\*\[0.4.0\]\*\* —" meta/STATUS.md` → **1**.
- [ ] Processo/arquivo criado fora do repo: os três `../261111-sonda-*` (bundle, antes, depois) ficam na pasta-pai de propósito — cite-os no relatório; nada mais aberto.

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · o que fugiu do texto literal da WO · a saída CRUA da sonda depois (cole o `../261111-sonda-depois.txt`) · arquivos tocados · resultado do build · commit e push. Escreva DEPOIS de resolver o push.

## Commit — blocos separados, mensagem SEM acento

```
git add src/generators/organic.js src/core/state.js src/core/generate.js package.json package-lock.json dist/vectorforge.html meta/CONTEXT.md meta/GLOSSARY.md meta/ROADMAP.md meta/IDEAS.md meta/STATUS.md meta/CHANGELOG.md meta/DECISIONS.md specs/261111-flow-fields.md meta/workorders/261111-wo0001-flow-fields.md logs/2026-11-11.md
```

```
git commit -m "feat(organic): adiciona tipo flow (Flow Fields) e fecha F3" -m "genFlowField em organic.js: particulas num campo de direcoes do snoise dentro de um disco; comp -> densidade, sym -> 1 a 8 copias rotacionais. Versao 0.4.0. Zero diferenca nos 52 tipos antigos (sonda antes/depois). Ver DEC-013 e WO 0001."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
