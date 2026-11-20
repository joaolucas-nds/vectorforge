# WO 0017 — F5, lote 5a: Minimal com esqueleto semeado (6 tipos) · v0.12.0

> **Tipo:** mista — gerador (`src/generators/minimal.js` reescrito INTEIRO pelo chat; Edições 1–3 no dispatcher) + versão + linhas de base + registro.
> **Config sugerida:** modelo mais capaz (Opus) · `/effort medium` — mudança INTENCIONAL de saída em 6 tipos.
> **Pré-requisito:** commit `a4ee367`, `node_modules/` presente.
> **Base:** escolha do dono no chat em 2026-11-20 («próxima frente: A (Minimal + Orgânico com esqueleto»); o chat dividiu a frente em 5a (esta) e 5b (Orgânico). `specs/261120-esqueleto-minimal.md`; folhas de contato `../261120-lote5-minimal-10-seeds.png` e `../261120-lote5-circle-symbol-16.png` (pasta-pai; a segunda ainda tem a pilha do `circle` pequena — corrigida depois, conferida em `../261120-lote5-circle-pilha.png`).
> **Arquivos que o chat gravou no disco e esta WO versiona:**
>   - `src/generators/minimal.js` — sha1 `1ecda177e1ba9b6474c0e176d1cbaba94144b22b`
>   - `specs/261120-esqueleto-minimal.md` — sha1 `383ac8217f4d7ad5d97f603d8aa0c4be4eee7d37`
>   - `logs/2026-11-20.md` — sha1 `52d90082adaaa288977e09fe83c00f4635e0a2fe`
> **`minimal.js` foi reescrito INTEIRO pelo chat; a spec e o log do dia são novos.** Não edite: confira o hash e versione.
> **Âncora semântica:** linha inteira; trecho que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**.
> **Idempotência:** texto novo inteiro presente → **PULE** e diga no relatório. CHANGELOG: depois de trocar `{DATA}`, já aplicada = `grep -c "^## \[0.12.0\] — 20" meta/CHANGELOG.md` dá **1**.
> **Âncoras lidas em** commit `a4ee367`.
> **Próximo comando:** nenhum — esta WO já traz o registro. **Não rode `/wrap` depois.**

> **Canal dos meta neste ciclo = CODE.** Esta WO É o registro.

---

## 1. Por que

Os 6 tipos do Minimal saíam iguais para qualquer seed (1/1/0%, 1 cara); com a anti-repetição (DEC-022), o R não tinha o que alternar neles. O dono escolheu a frente A [relatado pelo dono, 2026-11-20]. Tudo prototipado, medido e conferido a olho pelo chat; a WO foi simulada a partir do próprio texto num clone de `a4ee367`.

## Inventário — de onde saiu a lista de edições

- **Gerador:** `grep -n "^export function" src/generators/minimal.js` no commit `a4ee367` devolve 4 funções; no arquivo do chat, 5 (`genMinLine` nova). O arquivo vem inteiro.
- **Dispatcher:** `grep -n "minimal" src/core/generate.js` — import (Edição 1) e as entradas `line` e `mark` (Edições 2–3). As outras quatro entradas não mudam.
- **Versão:** `package.json` (1), `package-lock.json` (2). **Registro:** CONTEXT, STATUS (5), ROADMAP, CHANGELOG, DECISIONS, GLOSSARY.
- Total: **16 edições** em **9 arquivos**, mais 3 arquivos do chat, as duas linhas de base regravadas e o `dist/`.

---

## Edição 0 — preparo (antes de editar)

1. `sha1sum src/generators/minimal.js specs/261120-esqueleto-minimal.md logs/2026-11-20.md` → bate com o cabeçalho. Diferente: **PARE**.
2. `git status --short` → exatamente ` M src/generators/minimal.js`, `?? logs/2026-11-20.md`, `?? meta/workorders/261120-wo0017-esqueleto-minimal.md`, `?? specs/261120-esqueleto-minimal.md`. Outra linha: **PARE**.
3. **Prova de vida:** `npm run regress | grep -c "MUDOU:"` → **30** com o `minimal.js` do chat e o dispatcher ainda velho (o `line` só muda na Edição 2 e o `mark` na 3). Se der outro número, relate antes de seguir.

## Edição 1 — `src/core/generate.js` · import do genMinLine

**Âncora**:

```
import { genMinimalSymbol, genMinGrid, genMinCircles, genGlyph } from '../generators/minimal.js';
```

**Substituir por:**

```
import { genMinimalSymbol, genMinLine, genMinGrid, genMinCircles, genGlyph } from '../generators/minimal.js';
```

## Edição 2 — `src/core/generate.js` · minimal/line com gerador próprio

**Âncora**:

```
      line:    () => genDivider(0, cy, state.w, comp * 0.3, sym, rnd, SO, FG, sw, 'min'),
```

**Substituir por:**

```
      line:    () => genMinLine(0, cy, state.w, state.h, comp, sym, rnd, SO, FG, sw),
```

## Edição 3 — `src/core/generate.js` · minimal/mark com repertório próprio

**Âncora**:

```
      mark:    () => genMinimalSymbol(cx, cy, sz * 0.7, comp * 0.5, sym, rnd, SO, FG, sw),
```

**Substituir por:**

```
      mark:    () => genMinimalSymbol(cx, cy, sz * 0.7, comp * 0.5, sym, rnd, SO, FG, sw, 'mark'),
```

## Edição 4 — `package.json` · versão 0.12.0

**Âncora**:

```
  "version": "0.11.0",
```

**Substituir por:**

```
  "version": "0.12.0",
```

## Edição 5 — `package-lock.json` · versão 0.12.0 (raiz)

**Âncora**:

```
  "name": "vectorforge",
  "version": "0.11.0",
```

**Substituir por:**

```
  "name": "vectorforge",
  "version": "0.12.0",
```

## Edição 6 — `package-lock.json` · versão 0.12.0 (pacote raiz)

**Âncora**:

```
      "name": "vectorforge",
      "version": "0.11.0",
```

**Substituir por:**

```
      "name": "vectorforge",
      "version": "0.12.0",
```

## Edição 7 — `meta/CONTEXT.md` · inventário: Minimal

**Âncora**:

```
| **minimal** | `src/generators/minimal.js` | symbol, line, grid, circle, mark, glyph | `genMinimalSymbol`, `genDivider('min', comp×0.3)`†, `genMinGrid`, `genMinCircles`, `genMinimalSymbol` (reuso menor), `genGlyph` |
```

**Substituir por:**

```
| **minimal** | `src/generators/minimal.js` | symbol, line, grid, circle, mark, glyph | `genMinimalSymbol`, `genMinLine`, `genMinGrid`, `genMinCircles`, `genMinimalSymbol(…, 'mark')` (repertório próprio pelo parâmetro `kind`), `genGlyph` — com esqueleto semeado desde v0.12.0 (DEC-023): contorno/arranjo/campo/comprimento/posição; `glyph` sem texto vira sinal assêmico de traços; até v0.11.0, `line` era o `genDivider('min')` e os 6 tipos não variavam com o seed |
```

## Edição 8 — `meta/STATUS.md` · versão atual 0.12.0

**Âncora**:

```
**[0.11.0]** — Anti-repetição no sorteio: R e Surprise escolhem, entre até 12 candidatos, o que menos repete as últimas 10 imagens — silhueta + escolhas do gerador (DEC-022); colunas informativas `caras` e `escolhas` no `npm run seeds`. Nenhum desenho muda. Antes: v0.10.0 Celta + Islâmico com esqueleto (DEC-021), v0.9.0 régua de silhueta + piloto (DEC-020), v0.8.0 Barroco + Vitoriano, v0.7.0 Art Deco + Geométrico, v0.6.0 Botânico. GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.
```

**Substituir por:**

```
**[0.12.0]** — F5, lote 5a: os 6 tipos do Minimal com esqueleto semeado (DEC-023) — `silhueta>=25%` 28/53. Antes: v0.11.0 anti-repetição no sorteio: R e Surprise escolhem, entre até 12 candidatos, o que menos repete as últimas 10 imagens — silhueta + escolhas do gerador (DEC-022); colunas informativas `caras` e `escolhas` no `npm run seeds`. Nenhum desenho muda. Antes: v0.10.0 Celta + Islâmico com esqueleto (DEC-021), v0.9.0 régua de silhueta + piloto (DEC-020), v0.8.0 Barroco + Vitoriano, v0.7.0 Art Deco + Geométrico, v0.6.0 Botânico. GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.
```

## Edição 9 — `meta/STATUS.md` · funcionando: Minimal variado

**Âncora**:

```
- **Anti-repetição no R e no Surprise (v0.11.0, DEC-022):** cada clique sorteia até 12 candidatos (orçamento ~30 ms) e mostra o que menos repete as últimas 10 imagens — mesma silhueta ou mesmas escolhas do gerador. Medido pelo chat no `dist` (jsdom, 25 sessões de 10 R): `artdeco/pattern` e `celtic/spiral` de 100% para 8% das sessões com repetição; `geometric/symbol` e `celtic/knot` para 64%; tipos de cara única continuam em 100%. Sem texto no Text→Form e fora do Pixel Art (nesses dois, sorteio de antes). Roteiro visual 1–9 ok, incluindo o tempo do clique em canvas 1200 [relatado pelo dono, 2026-11-19].
```

**Substituir por:**

```
- **Anti-repetição no R e no Surprise (v0.11.0, DEC-022):** cada clique sorteia até 12 candidatos (orçamento ~30 ms) e mostra o que menos repete as últimas 10 imagens — mesma silhueta ou mesmas escolhas do gerador. Medido pelo chat no `dist` (jsdom, 25 sessões de 10 R): `artdeco/pattern` e `celtic/spiral` de 100% para 8% das sessões com repetição; `geometric/symbol` e `celtic/knot` para 64%; tipos de cara única continuam em 100%. Sem texto no Text→Form e fora do Pixel Art (nesses dois, sorteio de antes). Roteiro visual 1–9 ok, incluindo o tempo do clique em canvas 1200 [relatado pelo dono, 2026-11-19].
- **Minimal variado (v0.12.0, DEC-023):** os 6 tipos nascem com esqueleto semeado — símbolo (contorno × miolo × escala × posição), marca (7 composições, girada e deslocada), linha (comprimento, 1–3 linhas, acento), grade (campo × tipo), círculos (6 arranjos em 4 direções), glyph assêmico sem texto. Silhueta 0% → 57–78%. Roteiro do dono pendente.
```

## Edição 10 — `meta/STATUS.md` · em progresso: placar e próximo passo da F5

**Âncora**:

```
- **F5 — Variedade procedural:** lotes 1–3 (v0.6.0–v0.8.0), piloto do esqueleto (v0.9.0, roteiro 1–6 ok [relatado pelo dono, 2026-11-17]) e lote 4 Celta + Islâmico (v0.10.0) entregues — placar `formas>1: 41/53`, **`silhueta>=25%: 22/53`**. Roteiro do lote 4 1–7 ok [relatado pelo dono, 2026-11-18]. **O dono ainda vê repetição:** «em 10 cliques eu vi a mesma coisa umas 2-3 vezes» [relatado pelo dono, 2026-11-18] — medido: a maioria dos tipos tem 1–17 «caras» de silhueta em 200 seeds, e rever uma cara em 10 cliques acontece em ~100% das sessões (só `botanical/tree` escapa: 200 caras, 20%). Desde v0.11.0, R e Surprise evitam repetir as últimas 10 imagens (DEC-022); o que sobra de repetição é falta de caras — 19 tipos têm uma só (análise 261119). Roteiro da anti-repetição 1–9 ok [relatado pelo dono, 2026-11-19]. Próximo: Minimal + Orgânico (parados) e o esqueleto nos 19 tipos dos lotes 2 e 3.
```

**Substituir por:**

```
- **F5 — Variedade procedural:** lotes 1–3 (v0.6.0–v0.8.0), piloto do esqueleto (v0.9.0, roteiro 1–6 ok [relatado pelo dono, 2026-11-17]) e lote 4 Celta + Islâmico (v0.10.0) entregues — placar `formas>1: 47/53`, **`silhueta>=25%: 28/53`** (v0.12.0, com o Minimal). Roteiro do lote 4 1–7 ok [relatado pelo dono, 2026-11-18]. **O dono ainda vê repetição:** «em 10 cliques eu vi a mesma coisa umas 2-3 vezes» [relatado pelo dono, 2026-11-18] — medido: a maioria dos tipos tem 1–17 «caras» de silhueta em 200 seeds, e rever uma cara em 10 cliques acontece em ~100% das sessões (só `botanical/tree` escapa: 200 caras, 20%). Desde v0.11.0, R e Surprise evitam repetir as últimas 10 imagens (DEC-022); o que sobra de repetição é falta de caras — 19 tipos têm uma só (análise 261119). Roteiro da anti-repetição 1–9 ok [relatado pelo dono, 2026-11-19]. Minimal com esqueleto em v0.12.0 (DEC-023; frente A escolhida pelo dono [relatado pelo dono, 2026-11-20]). Próximo: Orgânico (lote 5b) e o esqueleto nos 19 tipos dos lotes 2 e 3.
```

## Edição 11 — `meta/STATUS.md` · quebrado: placar de v0.12.0

**Âncora**:

```
- **O seed ainda não muda a forma em 12 dos 53 tipos (Minimal e Orgânico), e só muda a SILHUETA em 22** (placar `npm run seeds` em v0.10.0: formas>1 41/53, silhueta>=25% 22/53). Nos outros, Surprise, New seed e «Like this» variam detalhe dentro do mesmo contorno ou só o que os sliders variam. Tratado pela F5.
```

**Substituir por:**

```
- **O seed ainda não muda a forma em 6 dos 53 tipos (Orgânico), e só muda a SILHUETA em 28** (placar `npm run seeds` em v0.12.0: formas>1 47/53, silhueta>=25% 28/53). Nos outros, Surprise, New seed e «Like this» variam detalhe dentro do mesmo contorno ou só o que os sliders variam. Tratado pela F5.
```

## Edição 12 — `meta/STATUS.md` · última conversa: 2026-11-20

**Âncora**:

```
**2026-11-19 (conversa 2)** - Analise `meta/analises/261119-ANALISE-anti-repeticao.md` (custo medido, simulacao do R e do Surprise; achado: a silhueta 16x16 nao ve o motivo, 7/16 contra o olho) e WO 0015: v0.11.0, anti-repeticao no R/Surprise (DEC-022), colunas informativas `caras`/`escolhas`, silhueta em `src/core/`, `pickOne` unico. WO 0015 aplicada (`56bd8c8`, empurrado); roteiro do dono 1-9 ok [relatado pelo dono, 2026-11-19, registrado pela WO 0016]. Proximo: Minimal + Organico, esqueleto nos 19 tipos dos lotes 2 e 3, merge do kit v1.151.0 ou F4/B — escolha do dono.
```

**Substituir por:**

```
**2026-11-19 (conversa 2)** - Analise `meta/analises/261119-ANALISE-anti-repeticao.md` (custo medido, simulacao do R e do Surprise; achado: a silhueta 16x16 nao ve o motivo, 7/16 contra o olho) e WO 0015: v0.11.0, anti-repeticao no R/Surprise (DEC-022), colunas informativas `caras`/`escolhas`, silhueta em `src/core/`, `pickOne` unico. WO 0015 aplicada (`56bd8c8`, empurrado); roteiro do dono 1-9 ok [relatado pelo dono, 2026-11-19, registrado pela WO 0016]. Proximo: Minimal + Organico, esqueleto nos 19 tipos dos lotes 2 e 3, merge do kit v1.151.0 ou F4/B — escolha do dono.

**2026-11-20** - WO 0016 conferida (`a4ee367`). Frente A escolhida pelo dono [relatado pelo dono, 2026-11-20], dividida em 5a (Minimal) e 5b (Organico). WO 0017: v0.12.0, Minimal com esqueleto (DEC-023), `silhueta>=25%` 28/53. Proximo: roteiro do dono do Minimal; depois lote 5b.
```

## Edição 13 — `meta/ROADMAP.md` · F5: lote 5a feito, 5b aberto

**Âncora**:

```
- [ ] Um lote por estilo, já com esqueleto: Minimal, Orgânico (spiral, flower, mandala, e o resto do estilo).
```

**Substituir por:**

```
- [x] Lote 5a — Minimal com esqueleto semeado nos 6 tipos (`symbol`/`mark` com repertórios próprios, `line` com gerador próprio, `glyph` assêmico sem texto). v0.12.0, DEC-023, `specs/261120-esqueleto-minimal.md`. Placar: silhueta>=25% 22/53 → 28/53.
- [ ] Lote 5b — Orgânico com esqueleto: `spiral`, `flower`, `mandala`, `phyllotaxis` parados; `leaf`, `branch`, `wave`, `flow` variam por ruído, sem esqueleto.
```

## Edição 14 — `meta/CHANGELOG.md` · entrada 0.12.0

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

## [0.12.0] — {DATA}
### Alterado
- **Minimal com variedade de verdade** (F5, lote 5a, com esqueleto semeado): símbolo (contorno círculo, quadrado, triângulo, hexágono, arco aberto ou nenhum × miolo raios, cruz, anel, ponto, meia-lua ou barra × escala × posição), marca (círculos sobrepostos, círculo no quadrado, quartos de círculo, barras escalonadas, chevrons, meio cheio, arco sobre ponto; girada e deslocada), linha (comprimento, 1–3 linhas, alinhamento, acento), grade (página, quadrado, círculo, faixa ou coluna × linhas, pontos, células ou tijolos), círculos (concêntricos, tangentes, fileira, sobrepostos, órbita, pilha, em quatro direções). Até v0.11.0 os 6 tipos saíam iguais para qualquer seed.
- **Glyph sem texto:** o seed desenha um sinal assêmico de 1 a 3 «letras» de traços simples (antes, sempre o caractere ✦). Com texto no Text→Form, nada muda.
- Placar `npm run seeds`: formas>1 41/53 → 47/53, silhueta>=25% 22/53 → 28/53. Linha de base do `npm run regress` regravada para as 36 chaves `minimal/*`; os outros estilos não mudam (o `genDivider` segue igual para eles).
```

## Edição 15 — `meta/DECISIONS.md` · DEC-023 no fim

**Âncora**:

```
- Escolha discreta nova em gerador precisa passar pelo `pickOne`, ou fica invisível para a anti-repetição.
```

**Substituir por:**

```
- Escolha discreta nova em gerador precisa passar pelo `pickOne`, ou fica invisível para a anti-repetição.

---

## DEC-023 — Lote 5a da F5: Minimal com esqueleto semeado
**Data:** 2026-11-20 · **Status:** aceita

### Contexto
O dono escolheu a frente A, Minimal + Orgânico com esqueleto [relatado pelo dono, 2026-11-20]. Os 6 tipos do Minimal marcavam 1/1/0% e 1 cara: com a anti-repetição (DEC-022), o R não tinha o que alternar neles. O chat dividiu a frente em duas WOs (5a Minimal, 5b Orgânico), porque os dois estilos têm natureza diferente. `symbol` e `mark` usavam o mesmo gerador; `line` era o `genDivider('min')`, cuja linha cheia é comum a todos os estilos; `glyph` sem texto era um `<text>` ✦, invisível à régua.

### Decisão
1. **Esqueleto semeado nos 6 tipos** (contorno, arranjo, campo, comprimento, direção, escala, posição), com o desenho de antes como variante onde cabe.
2. **`genMinimalSymbol(…, kind)`**: `symbol` e `mark` com repertórios próprios (como o `style` do DEC-019).
3. **`genMinLine` próprio** para `minimal/line`; o ramo `'min'` do `genDivider` fica sem uso, e o divisor dos outros estilos não muda.
4. **`glyph` sem texto = sinal assêmico** de traços (haste, bojo, barra, diagonal, gancho, ponto); com texto, o desenho de sempre.
5. **Identidade:** poucos traços de uma espessura, muito vazio, no máximo um acento cheio.

### Alternativas consideradas
- **Caracteres ornamentais sorteados no `glyph`** (✧ ❋ ✺…) — rejeitada: dependem da fonte do sistema e a régua não vê `<text>`.
- **Variar o ramo `'min'` do `genDivider`** — rejeitada: a linha cheia do topo da função é de todos os estilos; mexer nela vaza para fora do lote.
- **Um lote só com Minimal + Orgânico** — trocado por duas WOs: o Orgânico pede outro tipo de trabalho (esqueleto por cima de ruído contínuo).

### Consequências
- Placar: formas>1 41/53 → 47/53, silhueta>=25% 22/53 → 28/53; silhueta do Minimal 57–78%. Regress: exatamente 36 chaves mudaram, todas `minimal/*`.
- Caras (200 seeds): circle 18, mark 80, symbol 82, line 19, grid 50, glyph 162 — com a anti-repetição, o R deixa de repetir na maioria.
- Pior caso (canvas 400): `grid` 41,4 KB. `dist` 108,1 → 115,8 KB.
- Resta o Orgânico (lote 5b) e o esqueleto nos 19 tipos dos lotes 2 e 3.
```

## Edição 16 — `meta/GLOSSARY.md` · sinal assêmico

**Âncora**:

```
- **Anti-repetição** — R e Surprise geram até 12 candidatos (orçamento ~30 ms) e mostram o que menos repete as últimas 10 imagens do histórico — mesma silhueta OU mesmas escolhas (`pickNovel`, `explore.js`, DEC-022).
```

**Substituir por:**

```
- **Anti-repetição** — R e Surprise geram até 12 candidatos (orçamento ~30 ms) e mostram o que menos repete as últimas 10 imagens do histórico — mesma silhueta OU mesmas escolhas (`pickNovel`, `explore.js`, DEC-022).
- **Sinal assêmico** — o `glyph` do Minimal sem texto (v0.12.0, DEC-023): 1 a 3 «letras» que parecem escrita mas não são, montadas de traços simples (haste, bojo, barra, diagonal, gancho, ponto) sorteados pelo seed.
```

> Na Edição do CHANGELOG, troque `{DATA}` pela saída de `date +%F`, rodado na hora.

## Edição 17 — linhas de base e build (comandos, na ordem)

1. `npm run regress | grep -c "MUDOU:"` → **36**; `npm run regress | grep "MUDOU:" | grep -vc "MUDOU: minimal/"` → **0**. Chave fora de `minimal/*` mudou: **PARE e reporte**.
2. `npm run regress -- --update` → `linha de base gravada: 318 chaves -> scripts/regress-baseline.json`; `npm run regress; echo "rc=$?"` → `OK`, `rc=0`.
3. `npm run seeds; echo "rc=$?"` ANTES do update → `OK — nenhum tipo perdeu variedade`, `rc=0`, com 6 linhas `GANHOU: minimal/…`. `PERDEU`: **PARE**.
4. `npm run seeds -- --update` → `linha de base gravada: 53 tipos · formas>1: 47/53 · distintos>1: 50/53 · silhueta>=25%: 28/53`. Menos que 28: **PARE**.
5. `npm run seeds | grep "^minimal/" | awk '$4 >= 25' | wc -l` → **6**; `npm run seeds; echo "rc=$?"` → `OK`, `rc=0`.
6. `npm run build` → `✓ dist/vectorforge.html gerado` (protótipo: 115.8 KB); `grep -c "//__SCRIPT__" dist/vectorforge.html` → **0**.
7. Sondas de UI: `cd ../261112-sonda-ui && node behave.cjs ../vectorforge/dist/vectorforge.html | grep -c "^OK" && node minimal.mjs ../vectorforge/dist/vectorforge.html; cd ../vectorforge` → **18** e `renders 48 · vazios 0 · erros de JS 0 []`.
   - **Pergunta que NÃO responde:** a aparência — é o roteiro do dono.

---

## Fora de escopo

Orgânico (lote 5b); o ramo `'min'` do `genDivider` (fica sem uso; não remova nesta WO); o esqueleto nos 19 tipos dos lotes 2 e 3.

## Armadilhas desta WO

- **Gerador compartilhado:** `genMinimalSymbol` serve a `symbol` e `mark`; o parâmetro `kind` (Edição 3) é o que separa os dois. Sem a Edição 3, `mark` sai com o repertório do `symbol` — o passo 1 conta 36 só com as três edições do dispatcher.
- **`genGlyph` lê a textarea:** com texto, desenha o `<text>` de sempre (as miniaturas «Like this» passam por ele). O `regress` roda com a textarea vazia, por isso as chaves `minimal/glyph` mudam.
- **`genDivider` não muda:** os divisores de Art Deco, Barroco, Geométrico e Vitoriano seguem iguais — o passo 1 confere.
- **`grep -c` conta LINHAS.**

---

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` → ` M` em `dist/vectorforge.html`, `meta/CHANGELOG.md`, `meta/CONTEXT.md`, `meta/DECISIONS.md`, `meta/GLOSSARY.md`, `meta/ROADMAP.md`, `meta/STATUS.md`, `package-lock.json`, `package.json`, `scripts/regress-baseline.json`, `scripts/seeds-baseline.json`, `src/core/generate.js`, `src/generators/minimal.js` (**13 `M`**) e `??` em `logs/2026-11-20.md`, `meta/workorders/261120-wo0017-esqueleto-minimal.md`, `specs/261120-esqueleto-minimal.md` (**3 `??`**).
- [ ] `git diff --stat -- scripts/regress-baseline.json` → `36 insertions(+), 36 deletions(-)`; `git diff --stat -- scripts/seeds-baseline.json` → `6 insertions(+), 6 deletions(-)`.
- [ ] `grep -c "^export function" src/generators/minimal.js` → **5**; `grep -c "genDivider(0, cy, state.w, comp \* 0.3" src/core/generate.js` → **0**.
- [ ] `grep -c '"version": "0.12.0",' package.json package-lock.json` → `package.json:1`, `package-lock.json:2`; `grep -c "^## \[0.12.0\] — 20" meta/CHANGELOG.md` → **1**; `grep -c "{DATA}" meta/CHANGELOG.md` → **0**; `grep -c "^## DEC-023 " meta/DECISIONS.md` → **1**; `grep -c "^\*\*\[0.12.0\]\*\* —" meta/STATUS.md` → **1**; `grep -c "^- \[x\] Lote 5a — Minimal" meta/ROADMAP.md` → **1**.

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · desvios · saída CRUA: contagens do regress (Edição 0.3 e passo 1), `seeds --update`, as 6 linhas `^minimal/` do `npm run seeds`, tamanho do build e as duas sondas · arquivos tocados · commit e push.

## Commit — blocos separados, mensagem SEM acento

```
git add dist/vectorforge.html meta/CHANGELOG.md meta/CONTEXT.md meta/DECISIONS.md meta/GLOSSARY.md meta/ROADMAP.md meta/STATUS.md package-lock.json package.json scripts/regress-baseline.json scripts/seeds-baseline.json src/core/generate.js src/generators/minimal.js logs/2026-11-20.md meta/workorders/261120-wo0017-esqueleto-minimal.md specs/261120-esqueleto-minimal.md
```

```
git commit -m "feat(minimal): esqueleto semeado nos 6 tipos" -m "Simbolo e marca com repertorios proprios, linha com gerador proprio, grade com campo, circulos com 6 arranjos e glyph assemico sem texto. silhueta>=25% de 22/53 para 28/53; regress regravado para as 36 chaves minimal/*. Versao 0.12.0. Ver DEC-023 e WO 0017."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
