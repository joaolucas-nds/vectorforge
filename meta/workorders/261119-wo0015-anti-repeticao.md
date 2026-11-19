# WO 0015 — Anti-repetição no R e no Surprise + colunas `caras`/`escolhas` no `npm run seeds` · v0.11.0

> **Tipo:** mista — código (`explore.js` reescrito e `silhouette.js` novo, gravados pelo chat; Edições 1–3 em `utils.js` e `botanical.js`; Edição 4 remove `scripts/silhouette.mjs`) + instrumento (`seeds.mjs` reescrito pelo chat) + versão + registro.
> **Config sugerida:** modelo mais capaz (Opus) · `/effort medium` — muda o comportamento do R/Surprise; nenhum desenho muda (regress com 0 chaves mudadas é a rede).
> **Pré-requisito:** commit `df929da`, `node_modules/` presente.
> **Base:** decisão do dono no chat em 2026-11-19 («Aprovo a opção A como recomendada e concordo com as marcações da §5; escreve a WO») sobre `meta/analises/261119-ANALISE-anti-repeticao.md`; folha de calibragem `../261119-1720-CALIBRA-caras.png` (pasta-pai).
> **Arquivos que o chat gravou no disco e esta WO versiona:**
>   - `src/core/explore.js` — sha1 `baf6e0102d18f2087b3179763f83b6f1c570efa2`
>   - `src/core/silhouette.js` — sha1 `bdfa4fa5ce81a771805b0dc07c86a458ee656334`
>   - `scripts/seeds.mjs` — sha1 `c3b0f2d3ae785763496e9a70c44c4786ba4b98c5`
>   - `meta/analises/261119-ANALISE-anti-repeticao.md` — sha1 `43b48356d5ae8d1177dc007fc16701baca08bc67`
> **`explore.js` e `seeds.mjs` foram reescritos INTEIROS pelo chat; `silhouette.js` é novo (o corpo de `scripts/silhouette.mjs` + `silhouetteIoU`); a análise mudou só o `Status`.** Não edite: confira o hash e versione.
> **Âncora semântica:** trecho que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**. Todas as âncoras são linhas inteiras.
> **Idempotência:** procure o texto NOVO inteiro. Já aplicada = texto novo presente **e** âncora ausente (na Edição 27, que só remove, = âncora ausente) → **PULE** e diga no relatório. Nas edições em que a âncora fica dentro do texto novo, só o texto novo inteiro conta.
> **Âncoras lidas em** commit `df929da`.
> **Próximo comando:** nenhum — esta WO já traz o registro (STATUS, CHANGELOG, DECISIONS, IDEAS, log). **Não rode `/wrap` depois.**

> **Canal dos meta neste ciclo = CODE.** Esta WO É o registro.

---

## 1. Por que

«Em 10 cliques eu vi a mesma coisa umas 2-3 vezes» [relatado pelo dono, 2026-11-18]. R e Surprise sorteavam sem olhar o que já tinha sido mostrado. A análise mediu o custo (0,4 ms por candidato no tipo típico, ~25 ms no pior), simulou o R e o Surprise, e achou que a silhueta 16×16 sozinha não vê o motivo — por isso o critério soma a tupla de escolhas do `pickOne`. O dono aprovou a opção A [relatado pelo dono, 2026-11-19]. O chat prototipou tudo numa cópia de `df929da` e rodou as conferências desta WO a partir do texto dela.

## Inventário — de onde saiu a lista de edições

- **Comportamento:** `src/core/explore.js` (chat): `pickNovel` + `fingerprint` + `noveltyScore`; `surprise()` e `newSeed()` passam a sortear por `draw()` e escolher entre candidatos. Nada mais em `src/core/` muda além de `utils.js` (Edição 1). O `main.js` não muda: `surprise`/`newSeed` já estão no `window` (Armadilha 8).
- **Régua:** `src/core/silhouette.js` (chat, novo); `scripts/silhouette.mjs` sai (Edição 4). Quem importava o caminho antigo: só `scripts/seeds.mjs` (reescrito). `grep -rn "import.*silhouette.mjs" scripts src` depois da Edição 4 → **0** (o caminho antigo só sobra como histórico no cabeçalho de `silhouette.js`).
- **Escolhas:** `pickOne` de `core/utils.js` ganha o registrador (Edição 1); `botanical.js` tinha um `pickOne` local (2 usos: família de Koch e de dragão) e passa a importar o de utils (Edições 2–3). `grep -rn "const pickOne\|function pickOne" src` → só `src/core/utils.js`.
- **Instrumento:** `scripts/seeds.mjs` (chat): colunas `caras` e `escolhas` em 200 seeds, informativas; as 3 colunas de catraca seguem em 40 seeds; a linha de base **não muda**.
- **Versão:** `package.json` (1), `package-lock.json` (2).
- **Registro:** CONTEXT (4), CEREBRO, CLAUDE.md, GLOSSARY (2), STATUS (6), ROADMAP, CHANGELOG, DECISIONS, IDEAS (4), log do dia.
- Total: **28 edições** em **14 arquivos**, mais a remoção (Edição 4), 4 arquivos do chat e o `dist/`.

---

## Edição 0 — preparo (antes de editar)

1. `sha1sum src/core/explore.js src/core/silhouette.js scripts/seeds.mjs meta/analises/261119-ANALISE-anti-repeticao.md` → bate com o cabeçalho. Diferente: **PARE**.
2. `git status --short` → exatamente ` M scripts/seeds.mjs`, ` M src/core/explore.js`, `?? meta/analises/261119-ANALISE-anti-repeticao.md`, `?? meta/workorders/261119-wo0015-anti-repeticao.md`, `?? src/core/silhouette.js`. Outra linha: **PARE**.
3. **Sem prova de vida a rodar aqui:** `explore.js` e `seeds.mjs` importam `recordChoices`, que só existe depois da Edição 1 — o bundle (regress, seeds, build) não compila antes. O «antes» foi medido pelo chat no HEAD `df929da`: regress OK; seeds `formas>1: 41/53 · distintos>1: 44/53 · silhueta>=25%: 22/53`, sonda de UI 18 OK.

## Edição 1 — `src/core/utils.js` · registrador de escolhas no `pickOne`

**Âncora**:

```
export function pickOne(list, rnd) { return list[Math.floor(rnd() * list.length)]; }
```

**Substituir por:**

```
export function pickOne(list, rnd) {
  const i = Math.floor(rnd() * list.length);
  if (choiceLog) choiceLog.push(i);
  return list[i];
}

// Registrador das escolhas discretas (anti-repetição, DEC-022): enquanto `choiceLog` não é null,
// cada pickOne anota o ÍNDICE sorteado. Não consome número do PRNG nem muda a escolha — a saída
// dos geradores fica byte a byte igual (o `npm run regress` confere).
let choiceLog = null;

/**
 * Roda fn() anotando as escolhas feitas por pickOne durante ela. A tupla é a declaração do gerador
 * sobre «qual variante» saiu: mesma tupla no mesmo tipo = mesmas decisões de motivo, arranjo e
 * esqueleto. Aninhável (restaura o registrador de fora ao terminar).
 * @template T
 * @param {() => T} fn
 * @returns {[T, number[]]} o resultado de fn e os índices sorteados, em ordem
 */
export function recordChoices(fn) {
  const outer = choiceLog;
  choiceLog = [];
  try {
    const out = fn();
    return [out, choiceLog];
  } finally {
    choiceLog = outer;
  }
}
```

## Edição 2 — `src/generators/botanical.js` · import do `pickOne` de utils

**Âncora**:

```
import { f } from '../core/utils.js';
```

**Substituir por:**

```
import { f, pickOne } from '../core/utils.js';
```

## Edição 3 — `src/generators/botanical.js` · sai o `pickOne` local

**Âncora**:

```
/** Sorteia um item de uma lista com `rnd` (os presets por seed). */
const pickOne = (list, rnd) => list[Math.floor(rnd() * list.length)];

```

**Substituir por:**

```
// O pickOne local saiu (IDEAS «Um pickOne só», DEC-022): o de core/utils.js faz a mesma conta e
// é o que o registrador de escolhas da anti-repetição enxerga.

```

## Edição 4 — remover `scripts/silhouette.mjs`

`git rm scripts/silhouette.mjs` → `rm 'scripts/silhouette.mjs'`. A régua mora em `src/core/silhouette.js` (chat). Já removido (`git ls-files scripts/silhouette.mjs` vazio): **PULE**.

## Edição 5 — `package.json` · versão 0.11.0

**Âncora**:

```
  "version": "0.10.0",
```

**Substituir por:**

```
  "version": "0.11.0",
```

## Edição 6 — `package-lock.json` · versão 0.11.0 (raiz)

**Âncora**:

```
  "name": "vectorforge",
  "version": "0.10.0",
```

**Substituir por:**

```
  "name": "vectorforge",
  "version": "0.11.0",
```

## Edição 7 — `package-lock.json` · versão 0.11.0 (pacote raiz)

**Âncora**:

```
      "name": "vectorforge",
      "version": "0.10.0",
```

**Substituir por:**

```
      "name": "vectorforge",
      "version": "0.11.0",
```

## Edição 8 — `meta/CONTEXT.md` · estrutura: utils.js com recordChoices

**Âncora**:

```
│   │   ├── utils.js            # TAU, f, mkRand, snoise/snoiseSetSeed, pt/polyPath/starPath/curvePath
```

**Substituir por:**

```
│   │   ├── utils.js            # TAU, f, mkRand, snoise/snoiseSetSeed, pt/polyPath/starPath/curvePath,
│   │   │                        #   pickOne + recordChoices (registrador das escolhas, DEC-022)
```

## Edição 9 — `meta/CONTEXT.md` · estrutura: explore.js e silhouette.js

**Âncora**:

```
│   │   └── explore.js           # ciclo de exploração: surprise/newSeed/locks/undo/redo/«Like this»/prévia ao vivo (DEC-015)
```

**Substituir por:**

```
│   │   ├── explore.js           # ciclo de exploração: surprise/newSeed/locks/undo/redo/«Like this»/prévia ao vivo (DEC-015)
│   │   │                        #   + anti-repetição do R/Surprise: pickNovel, melhor de até 12 candidatos (DEC-022)
│   │   └── silhouette.js        # silhueta por geometria do SVG (malha 16×16, IoU) — anti-repetição e `npm run seeds` (DEC-020, DEC-022)
```

## Edição 10 — `meta/CONTEXT.md` · estrutura: scripts sem silhouette.mjs

**Âncora**:

```
│   ├── seeds.mjs                # instrumento de sensibilidade ao seed (`npm run seeds`, catraca, DEC-017)
│   ├── silhouette.mjs           # silhueta por geometria do SVG (malha 16×16, 1 − IoU), usada pelo seeds (DEC-020)
```

**Substituir por:**

```
│   ├── seeds.mjs                # instrumento de sensibilidade ao seed (`npm run seeds`, catraca, DEC-017);
│   │                            #   colunas informativas caras/escolhas em 200 seeds (DEC-022); silhueta vem de src/core/
```

## Edição 11 — `meta/CONTEXT.md` · arquivos críticos: contagem de módulos

**Âncora**:

```
- **`src/` (17 módulos ES)** — o código-fonte real. Antes de editar: ler CONTEXT.md (seção "Como o pipeline funciona" + "Inventário de Geradores" + Armadilha 8) + DEC-001 a DEC-011 no DECISIONS.md. Depois de editar, **sempre rodar `npm run build`** antes de testar.
```

**Substituir por:**

```
- **`src/` (19 módulos ES)** — o código-fonte real. Antes de editar: ler CONTEXT.md (seção "Como o pipeline funciona" + "Inventário de Geradores" + Armadilha 8) + DEC-001 a DEC-011 no DECISIONS.md. Depois de editar, **sempre rodar `npm run build`** antes de testar.
```

## Edição 12 — `meta/CEREBRO.md` · técnicas: caras/escolhas informativas e pickOne

**Âncora**:

```
- **Variedade (F5):** `npm run seeds` mede, por tipo, quantas formas diferentes o seed produz (catraca, DEC-017). Gerador novo ou ajustado: o seed tem de mudar a ESTRUTURA (`formas>1`), não só os números; e o tamanho do pior caso (Complexity e Symmetry no máximo) cabe em ~120 KB. Gerador **compartilhado** entre estilos (`genADFrame`, `genMandala`, `genPattern`, `genDivider`): a variação entra só para o estilo do lote (`vary = true` ou o ramo do estilo), senão o regress muda tipos de outros estilos (DEC-018). Gerador compartilhado entre DOIS estilos do mesmo lote (`genBQAcanthus`, `genBQCartouche`): parâmetro `style` com repertório próprio de cada um, senão os dois tipos saem idênticos (DEC-019). **A meta de variedade é a SILHUETA** (`silhueta%` ≥ 25 no `npm run seeds`, DEC-020): `formas` sobe trocando detalhe dentro do mesmo contorno, e o dono não vê isso na miniatura.
```

**Substituir por:**

```
- **Variedade (F5):** `npm run seeds` mede, por tipo, quantas formas diferentes o seed produz (catraca, DEC-017). Gerador novo ou ajustado: o seed tem de mudar a ESTRUTURA (`formas>1`), não só os números; e o tamanho do pior caso (Complexity e Symmetry no máximo) cabe em ~120 KB. Gerador **compartilhado** entre estilos (`genADFrame`, `genMandala`, `genPattern`, `genDivider`): a variação entra só para o estilo do lote (`vary = true` ou o ramo do estilo), senão o regress muda tipos de outros estilos (DEC-018). Gerador compartilhado entre DOIS estilos do mesmo lote (`genBQAcanthus`, `genBQCartouche`): parâmetro `style` com repertório próprio de cada um, senão os dois tipos saem idênticos (DEC-019). **A meta de variedade é a SILHUETA** (`silhueta%` ≥ 25 no `npm run seeds`, DEC-020): `formas` sobe trocando detalhe dentro do mesmo contorno, e o dono não vê isso na miniatura. As colunas `caras` e `escolhas` (200 seeds) são **informativas, sem catraca**: nenhuma reproduz o olho (DEC-022, análise 261119 §5). Escolha discreta nova em gerador passa pelo `pickOne` de `core/utils.js` — é o que a anti-repetição do R/Surprise enxerga; `Math.floor(rnd() * n)` solto fica invisível para ela.
```

## Edição 13 — `CLAUDE.md` · validação: colunas informativas

**Âncora**:

```
- Variedade: `npm run seeds` — mede quanto o seed muda cada tipo (catraca: sai 1 se algum tipo PERDER variedade). Lote da F5 que aumenta variedade: `npm run seeds -- --update` e versione `scripts/seeds-baseline.json` no mesmo commit, citando no relatório o placar `formas>1: N/53` e `silhueta>=25%: N/53` (a silhueta é a meta, DEC-020).
```

**Substituir por:**

```
- Variedade: `npm run seeds` — mede quanto o seed muda cada tipo (catraca: sai 1 se algum tipo PERDER variedade). Lote da F5 que aumenta variedade: `npm run seeds -- --update` e versione `scripts/seeds-baseline.json` no mesmo commit, citando no relatório o placar `formas>1: N/53` e `silhueta>=25%: N/53` (a silhueta é a meta, DEC-020). As colunas `caras` e `escolhas` são informativas (DEC-022): não reprovam e não entram na linha de base.
```

## Edição 14 — `meta/GLOSSARY.md` · silhueta: novo endereço

**Âncora**:

```
- **Silhueta (régua)** — coluna `silhueta%` do `npm run seeds`: quanto o seed muda o que se lê na MINIATURA — média de 1 − IoU da ocupação de uma malha 16×16 entre pares de seeds, calculada da geometria do SVG (`scripts/silhouette.mjs`). Meta da F5 a partir do piloto: ≥ 25% (DEC-020).
```

**Substituir por:**

```
- **Silhueta (régua)** — coluna `silhueta%` do `npm run seeds`: quanto o seed muda o que se lê na MINIATURA — média de 1 − IoU da ocupação de uma malha 16×16 entre pares de seeds, calculada da geometria do SVG (`src/core/silhouette.js`; até v0.10.0 em `scripts/silhouette.mjs`). Meta da F5 a partir do piloto: ≥ 25% (DEC-020).
```

## Edição 15 — `meta/GLOSSARY.md` · caras, escolhas e anti-repetição

**Âncora**:

```
Medida pela sonda `../261117-sonda-silhueta/looks.mjs` (ainda fora do repo); candidata a coluna do `npm run seeds`. «Varia» (silhueta média alta) não é «não repete» (poucas caras).
```

**Substituir por:**

```
Coluna informativa do `npm run seeds` desde v0.11.0 (200 seeds, DEC-022). «Varia» (silhueta média alta) não é «não repete» (poucas caras). Não reproduz o olho: a malha vê ONDE há tinta, não QUE forma — dois motivos no mesmo contorno contam como uma cara (análise 261119, §5).
- **Escolhas (tupla)** — os índices que os `pickOne` de um desenho sortearam, anotados por `recordChoices` (`core/utils.js`). Mesma tupla no mesmo tipo = o gerador tomou as mesmas decisões de motivo, arranjo e esqueleto. Coluna informativa `escolhas` do `npm run seeds` e um dos dois sinais da anti-repetição (DEC-022).
- **Anti-repetição** — R e Surprise geram até 12 candidatos (orçamento ~30 ms) e mostram o que menos repete as últimas 10 imagens do histórico — mesma silhueta OU mesmas escolhas (`pickNovel`, `explore.js`, DEC-022).
```

## Edição 16 — `meta/STATUS.md` · versão atual 0.11.0

**Âncora**:

```
**[0.10.0]** — F5, lote 4: Celta e Islâmico com esqueleto semeado e geradores próprios do estilo nos seis tipos que emprestavam de outros (DEC-021) — `silhueta>=25%` 22/53. Antes: v0.9.0 régua de silhueta + piloto (DEC-020), v0.8.0 Barroco + Vitoriano, v0.7.0 Art Deco + Geométrico, v0.6.0 Botânico. GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.
```

**Substituir por:**

```
**[0.11.0]** — Anti-repetição no sorteio: R e Surprise escolhem, entre até 12 candidatos, o que menos repete as últimas 10 imagens — silhueta + escolhas do gerador (DEC-022); colunas informativas `caras` e `escolhas` no `npm run seeds`. Nenhum desenho muda. Antes: v0.10.0 Celta + Islâmico com esqueleto (DEC-021), v0.9.0 régua de silhueta + piloto (DEC-020), v0.8.0 Barroco + Vitoriano, v0.7.0 Art Deco + Geométrico, v0.6.0 Botânico. GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.
```

## Edição 17 — `meta/STATUS.md` · funcionando: silhueta com novo endereço

**Âncora**:

```
- **Esqueleto semeado — piloto (v0.9.0, DEC-020):** nos 4 tipos, o seed escolhe também a composição — medalhão em círculo, octógono, losango, quadrado, oval, arco ou sol nascente; padrão num campo (página, medalhão, losango, faixa, moldura, arco); mandala e símbolo com contorno, escala e arranjo próprios. Medido pela coluna `silhueta%` do `npm run seeds` (régua nova, `scripts/silhouette.mjs`). Roteiro visual 1–6 ok, «a receita convenceu» [relatado pelo dono, 2026-11-17].
```

**Substituir por:**

```
- **Esqueleto semeado — piloto (v0.9.0, DEC-020):** nos 4 tipos, o seed escolhe também a composição — medalhão em círculo, octógono, losango, quadrado, oval, arco ou sol nascente; padrão num campo (página, medalhão, losango, faixa, moldura, arco); mandala e símbolo com contorno, escala e arranjo próprios. Medido pela coluna `silhueta%` do `npm run seeds` (régua nova; desde v0.11.0 em `src/core/silhouette.js`). Roteiro visual 1–6 ok, «a receita convenceu» [relatado pelo dono, 2026-11-17].
```

## Edição 18 — `meta/STATUS.md` · funcionando: anti-repetição

**Âncora**:

```
`islamic/girih` e `islamic/pattern` deixam de sair iguais. Roteiro visual 1–7 ok [relatado pelo dono, 2026-11-18].
```

**Substituir por:**

```
`islamic/girih` e `islamic/pattern` deixam de sair iguais. Roteiro visual 1–7 ok [relatado pelo dono, 2026-11-18].
- **Anti-repetição no R e no Surprise (v0.11.0, DEC-022):** cada clique sorteia até 12 candidatos (orçamento ~30 ms) e mostra o que menos repete as últimas 10 imagens — mesma silhueta ou mesmas escolhas do gerador. Medido pelo chat no `dist` (jsdom, 25 sessões de 10 R): `artdeco/pattern` e `celtic/spiral` de 100% para 8% das sessões com repetição; `geometric/symbol` e `celtic/knot` para 64%; tipos de cara única continuam em 100%. Sem texto no Text→Form e fora do Pixel Art (nesses dois, sorteio de antes). Roteiro do dono pendente.
```

## Edição 19 — `meta/STATUS.md` · em progresso: F5 depois da anti-repetição

**Âncora**:

```
- **F5 — Variedade procedural:** lotes 1–3 (v0.6.0–v0.8.0), piloto do esqueleto (v0.9.0, roteiro 1–6 ok [relatado pelo dono, 2026-11-17]) e lote 4 Celta + Islâmico (v0.10.0) entregues — placar `formas>1: 41/53`, **`silhueta>=25%: 22/53`**. Roteiro do lote 4 1–7 ok [relatado pelo dono, 2026-11-18]. **O dono ainda vê repetição:** «em 10 cliques eu vi a mesma coisa umas 2-3 vezes» [relatado pelo dono, 2026-11-18] — medido: a maioria dos tipos tem 1–17 «caras» de silhueta em 200 seeds, e rever uma cara em 10 cliques acontece em ~100% das sessões (só `botanical/tree` escapa: 200 caras, 20%). Opções no IDEAS («Repetição em 10 cliques»). Próximo: Minimal + Orgânico (parados) e o esqueleto nos 19 tipos dos lotes 2 e 3.
```

**Substituir por:**

```
- **F5 — Variedade procedural:** lotes 1–3 (v0.6.0–v0.8.0), piloto do esqueleto (v0.9.0, roteiro 1–6 ok [relatado pelo dono, 2026-11-17]) e lote 4 Celta + Islâmico (v0.10.0) entregues — placar `formas>1: 41/53`, **`silhueta>=25%: 22/53`**. Roteiro do lote 4 1–7 ok [relatado pelo dono, 2026-11-18]. **O dono ainda vê repetição:** «em 10 cliques eu vi a mesma coisa umas 2-3 vezes» [relatado pelo dono, 2026-11-18] — medido: a maioria dos tipos tem 1–17 «caras» de silhueta em 200 seeds, e rever uma cara em 10 cliques acontece em ~100% das sessões (só `botanical/tree` escapa: 200 caras, 20%). Desde v0.11.0, R e Surprise evitam repetir as últimas 10 imagens (DEC-022); o que sobra de repetição é falta de caras — 19 tipos têm uma só (análise 261119). Próximo: roteiro do dono da anti-repetição; depois Minimal + Orgânico (parados) e o esqueleto nos 19 tipos dos lotes 2 e 3.
```

## Edição 20 — `meta/STATUS.md` · ordem das frentes: anti-repetição entregue

**Âncora**:

```
- **Ordem das frentes:** depois do piloto, o dono escolheu «parados primeiro» — Celta + Islâmico [relatado pelo dono, 2026-11-18]; a F4/B (implementação da nova interface) segue aguardando a vez. **Pendente também:** atualização do Kit v1.151.0 na pasta-pai (`../261118-kcm-update-v1.151.0/`, chegou em 2026-11-18; o projeto está na v1.135.0) — merge é frente própria (fusão do CEREBRO e das Instruções). **Na troca de conversa de 2026-11-19, o dono deixou para a PRÓXIMA conversa a anti-repetição no sorteio (R e Surprise) com a coluna `caras` no `npm run seeds`** [relatado pelo dono, 2026-11-19] — ver IDEAS «Repetição em 10 cliques».
```

**Substituir por:**

```
- **Ordem das frentes:** depois do piloto, o dono escolheu «parados primeiro» — Celta + Islâmico [relatado pelo dono, 2026-11-18]; a F4/B (implementação da nova interface) segue aguardando a vez. **Pendente também:** atualização do Kit v1.151.0 na pasta-pai (`../261118-kcm-update-v1.151.0/`, chegou em 2026-11-18; o projeto está na v1.135.0) — merge é frente própria (fusão do CEREBRO e das Instruções). A anti-repetição no sorteio entrou em v0.11.0: opção A da análise `meta/analises/261119-ANALISE-anti-repeticao.md`, aprovada pelo dono com as marcações da §5 [relatado pelo dono, 2026-11-19].
```

## Edição 21 — `meta/STATUS.md` · última conversa: conversa 2 de 2026-11-19

**Âncora**:

```
Proximo passo [relatado pelo dono]: anti-repeticao no sorteio (R/Surprise) + coluna `caras` no `npm run seeds`; depois merge do kit v1.151.0.
```

**Substituir por:**

```
Proximo passo [relatado pelo dono]: anti-repeticao no sorteio (R/Surprise) + coluna `caras` no `npm run seeds`; depois merge do kit v1.151.0.

**2026-11-19 (conversa 2)** - Analise `meta/analises/261119-ANALISE-anti-repeticao.md` (custo medido, simulacao do R e do Surprise; achado: a silhueta 16x16 nao ve o motivo, 7/16 contra o olho) e WO 0015: v0.11.0, anti-repeticao no R/Surprise (DEC-022), colunas informativas `caras`/`escolhas`, silhueta em `src/core/`, `pickOne` unico. Proximo: roteiro do dono da anti-repeticao; depois Minimal + Organico ou merge do kit v1.151.0.
```

## Edição 22 — `meta/ROADMAP.md` · F5: anti-repetição entregue

**Âncora**:

```
- [ ] Anti-repetição no sorteio (R/Surprise mostram o candidato de silhueta mais distante das últimas exibidas) + coluna `caras` no `npm run seeds` — próxima conversa, por decisão do dono (IDEAS «Repetição em 10 cliques»).
```

**Substituir por:**

```
- [x] Anti-repetição no sorteio — R e Surprise escolhem, entre até 12 candidatos, o que menos repete as últimas 10 imagens (silhueta + escolhas do `pickOne`); colunas informativas `caras` e `escolhas` no `npm run seeds`. v0.11.0, DEC-022, análise `261119-ANALISE-anti-repeticao.md`. O sorteio chega a 0,2 do piso teórico; o resto é falta de caras.
```

## Edição 23 — `meta/CHANGELOG.md` · entrada 0.11.0

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

## [0.11.0] — {DATA}
### Adicionado
- **Anti-repetição no R (New seed) e no Surprise:** cada clique sorteia até 12 candidatos (para antes se passar de ~30 ms, sempre pelo menos 2) e mostra o que menos repete as últimas 10 imagens do histórico — mesma silhueta (malha 16×16) ou mesmas escolhas de motivo/arranjo/esqueleto do gerador. Cadeados, histórico e desfazer funcionam como antes. Com texto no Text→Form e no Pixel Art, o sorteio é o de antes. Ver DEC-022.
- **`npm run seeds` com duas colunas informativas, em 200 seeds:** `caras` (grupos de mesma silhueta) e `escolhas` (combinações distintas do `pickOne`). Sem catraca e fora da linha de base: nenhuma das duas reproduz o olho (análise 261119, §5).
### Alterado
- A régua de silhueta sai de `scripts/silhouette.mjs` para `src/core/silhouette.js` — a mesma função no app e no instrumento; ganha `silhouetteIoU`.
- `pickOne` (`core/utils.js`) anota as escolhas quando o registrador `recordChoices` está ligado; o Botânico deixa o `pickOne` local e usa este. Nenhum desenho muda: `npm run regress` com 0 chaves mudadas.
```

## Edição 24 — `meta/DECISIONS.md` · DEC-022 no fim

**Âncora**:

```
- Restam parados Minimal e Orgânico (12 tipos sem formas>1); os 19 tipos dos lotes 2 e 3 ainda variam só no detalhe.
```

**Substituir por:**

```
- Restam parados Minimal e Orgânico (12 tipos sem formas>1); os 19 tipos dos lotes 2 e 3 ainda variam só no detalhe.

---

## DEC-022 — Anti-repetição no sorteio: melhor de K candidatos por silhueta + escolhas do gerador
**Data:** 2026-11-19 · **Status:** aceita

### Contexto
«Em 10 cliques eu vi a mesma coisa umas 2-3 vezes» [relatado pelo dono, 2026-11-18]. O R e o Surprise sorteavam sem olhar o que já tinha sido mostrado; em 51 dos 53 tipos, mais de 80% das sessões de 10 cliques repetiam uma silhueta. O dono decidiu fazer a anti-repetição com uma coluna `caras` no instrumento [relatado pelo dono, 2026-11-19]; a análise `meta/analises/261119-ANALISE-anti-repeticao.md` mediu o custo, simulou o R e o Surprise e achou que a silhueta 16×16 não vê o motivo (concordou com o olho em 7 de 16 pares). O dono aprovou a opção A e as marcações da §5 [relatado pelo dono, 2026-11-19].

### Decisão
1. **R e Surprise escolhem entre até 12 candidatos** (`pickNovel` em `explore.js`), sorteados como antes (mesmos cadeados), com orçamento de ~30 ms (sempre pelo menos 2). Fica o que menos repete as **últimas 10 imagens do histórico**.
2. **«Repete» = dois sinais, não um limiar:** mesma silhueta (IoU ≥ 0,8 na malha 16×16) OU mesma tupla de escolhas do `pickOne` no mesmo tipo; as duas juntas pesam o dobro. Empate: o mais distante (fração de escolhas diferentes + 1 − IoU).
3. **Registrador de escolhas** em `pickOne` (`recordChoices`): anota índices sem consumir número do PRNG — saída idêntica. O Botânico passa a usar o `pickOne` de `core/utils.js`.
4. **Uma régua só:** `occupancy`/`silhouetteChange` saem de `scripts/` para `src/core/silhouette.js`; o `npm run seeds` importa de lá pelo bundle.
5. **Fora:** «Like this» (é «parecido com este» por definição), Text→Form com texto e Pixel Art (o candidato não representa o que o `doGen` desenha) — nesses, o sorteio de antes. Seed continua 1–999.
6. **`caras` e `escolhas` no `npm run seeds`: informativas**, em 200 seeds, sem catraca, sem meta, fora da linha de base.

### Alternativas consideradas
- **Só silhueta (critério c)** — rejeitada: mesmo ganho de silhueta e metade do ganho em escolhas (17 contra 31 tipos sem repetir a combinação em 10 cliques), e confunde motivos diferentes no mesmo contorno.
- **Mitchell puro (maior distância mínima)** — rejeitada: piora com poucas caras (2 caras: 29,5 pares contra 20,1 do critério escolhido).
- **«Saco embaralhado» das combinações** — adiada: zero repetição até esgotar, mas exige que cada gerador aceite a combinação de fora.
- **Régua de igualdade melhor** (malha fina, folga de célula, estrutura de elementos) — nenhuma passou de 10/16 contra o olho; fica no IDEAS.
- **Catraca em `caras`** — rejeitada por ora: régua que não reproduz o olho vira meta errada (a lição do `formas`, DEC-020).

### Consequências
- Simulado (R, 999 seeds, 2.000 sessões): repetição de silhueta < 50% em 9/53 tipos (antes 1/53) e de escolhas em 31/53 (antes 11/53), a 0,2 pares do piso teórico; Surprise sem nada travado: 81% → 0%. Medido no `dist` (jsdom): `artdeco/pattern` e `celtic/spiral` 100% → 8%; `geometric/symbol` e `celtic/knot` → 64%.
- **Não cria caras:** os 19 tipos de silhueta única continuam repetindo; quem resolve são os lotes da F5. A anti-repetição faz cada cara nova aparecer na hora.
- Custo: +30 ms no clique típico e +60 ms no pior (padrão em canvas 1200), medidos em jsdom; no browser, conferir no roteiro.
- Escolha discreta nova em gerador precisa passar pelo `pickOne`, ou fica invisível para a anti-repetição.
```

## Edição 25 — `meta/IDEAS.md` · ideias novas: régua que veja o motivo; «Like this» sem miniaturas iguais

**Âncora**:

```
### 2026-11-18 — Repetição em 10 cliques: anti-repetição no sorteio + mais «caras» por tipo
```

**Substituir por:**

```
### 2026-11-19 — Régua de «mesma cara» que veja o motivo
A silhueta 16×16 junta motivos diferentes no mesmo contorno (concordou com o olho em 7/16 pares; análise 261119, §5, folha `../261119-1720-CALIBRA-caras.png`). Malha fina, folga de uma célula e estrutura de elementos não passaram de 10/16. Candidatos: descritor de forma por anéis/setores (histograma radial da tinta), comparação depois de alinhar giro e escala, ou uma folha maior marcada pelo dono para escolher o limiar. Gatilho: o roteiro da anti-repetição mostrar repetição que os números não contam, ou `caras` ser cogitada como meta.

### 2026-11-19 — «Like this» sem miniaturas iguais
As 3 variações «Like this» trocam o seed e mexem ±20 em Complexity/Symmetry, sem olhar se saíram iguais entre si ou à atual. Aplicar o `pickNovel` às variações (determinístico pelo estado, para as miniaturas não mudarem a cada redesenho) daria 4 miniaturas sem duas iguais. Fora da v0.11.0 de propósito: «parecido com este» é o objetivo ali (DEC-022). Gatilho: o dono reclamar de miniaturas repetidas, ou a F4/B redesenhar o painel.

### 2026-11-18 — Repetição em 10 cliques: anti-repetição no sorteio + mais «caras» por tipo
```

## Edição 26 — `meta/IDEAS.md` · repetição em 10 cliques: andamento

**Âncora**:

```
(e) nova coluna `caras` no `npm run seeds` para medir. Decisão do dono.
```

**Substituir por:**

```
(e) nova coluna `caras` no `npm run seeds` para medir. Decisão do dono.
**Andamento (2026-11-19):** (a) e (e) entregues em v0.11.0 (DEC-022, análise 261119) — com a tupla de escolhas do `pickOne` somada à silhueta, porque a silhueta sozinha não vê o motivo. Medido: o sorteio chega a 0,2 do piso teórico de repetição; o que sobra é falta de caras, então (b), (c) e (d) seguem valendo para os lotes.
```

## Edição 27 — `meta/IDEAS.md` · «Um pickOne só» sai das ativas

**Âncora**:

```
### 2026-11-16 — Um `pickOne` só
O Botânico tem `pickOne` local (lote 1); o lote 2 pôs um em `core/utils.js`. Trocar o local pelo de `utils` quando o `botanical.js` for tocado de novo — mudança de uma linha, sem efeito na saída.

```

**Substituir por:** *(nada — o trecho sai)*

```
```

## Edição 28 — `meta/IDEAS.md` · «Um pickOne só» nas concluídas

**Âncora**:

```
implementadas juntas em 2026-11-12 (DEC-014): `scripts/regress.mjs` + linha de base versionada, sai 1 quando uma saída antiga muda.
```

**Substituir por:**

```
implementadas juntas em 2026-11-12 (DEC-014): `scripts/regress.mjs` + linha de base versionada, sai 1 quando uma saída antiga muda.
- **Um `pickOne` só** (2026-11-16) — implementado em v0.11.0 (DEC-022): o Botânico usa o `pickOne` de `core/utils.js`, que a anti-repetição enxerga. Sem efeito na saída (regress 0).
```

## Edição 29 — `logs/2026-11-19.md` · conversa 2

**Âncora**:

```
- Depois: merge do kit v1.151.0; Minimal + Organico com esqueleto; esqueleto nos 19 tipos dos lotes 2 e 3; F4/B.
```

**Substituir por:**

```
- Depois: merge do kit v1.151.0; Minimal + Organico com esqueleto; esqueleto nos 19 tipos dos lotes 2 e 3; F4/B.

## Conversa 2 (chat, anti-repeticao no sorteio)

## Objetivo
Medir o custo e escrever a analise da anti-repeticao; com a decisao do dono, a WO 0015.

## Feito
- Ritual: brief `261119-HANDOFF-BRIEF.md` e relatorio da WO 0014 lidos inteiros e arquivados (`df929da` empurrado, arvore limpa).
- Medicao (VM do chat, copia descartavel de `df929da`): custo por candidato 0,4 ms tipico, ~25 ms no pior (padrao em 1200); simulacao do R (53 tipos x 999 seeds x 2.000 sessoes) e do Surprise; folha de calibragem `../261119-1720-CALIBRA-caras.png`.
- Analise `meta/analises/261119-ANALISE-anti-repeticao.md`; o dono aprovou a opcao A e as marcacoes da secao 5 [relatado pelo dono, 2026-11-19].
- WO 0015 (v0.11.0): `pickNovel` no R/Surprise, `recordChoices` no `pickOne`, silhueta em `src/core/silhouette.js`, colunas `caras`/`escolhas` no seeds, `pickOne` unico no Botanico.

## Decisoes
- DEC-022 (anti-repeticao: melhor de ate 12 candidatos, janela 10, silhueta + escolhas; `caras` informativa).

## Bugs
- Nenhum.

## Aprendizados / armadilhas
- A silhueta 16x16 ve ONDE ha tinta, nao QUE forma: concordou com o olho em 7/16 pares; nenhuma alternativa barata passou de 10/16. A tupla de escolhas do `pickOne` e um sinal independente.
- Mitchell puro piora com poucas caras; janela curta (N=4) quase nao ajuda.
- O Botanico tinha `pickOne` local, invisivel ao registrador.

## Onde parei
WO 0015 entregue para aplicar; roteiro do dono no fim da WO.

## Proximos passos
- Dono: roteiro da anti-repeticao.
- Depois: Minimal + Organico com esqueleto, esqueleto nos 19 tipos dos lotes 2 e 3, merge do kit v1.151.0, F4/B.
```

> Na Edição do CHANGELOG, troque `{DATA}` pela saída de `date +%F`, rodado na hora. **Idempotência dessa edição:** depois da troca, o texto novo não casa mais literalmente — já aplicada = `grep -c "^## \[0.11.0\] — 20" meta/CHANGELOG.md` dá **1**; aí **PULE**.

## Edição 30 — validação e build (comandos, na ordem)

1. `npm run regress; echo "rc=$?"` → `OK — nenhuma chave antiga mudou`, `rc=0`; `npm run regress | grep -c "MUDOU:"` → **0**. Qualquer chave mudou: o registrador alterou a saída — **PARE e reporte**. **Não** rode `--update`.
2. `npm run seeds; echo "rc=$?"` → `OK — nenhum tipo perdeu variedade`, `rc=0`, e as duas linhas de resumo (medidas no protótipo):
   - `formas>1 (o seed muda a estrutura): 41/53 · distintos>1 (o seed muda algum número): 44/53 · silhueta>=25% (o seed muda a miniatura): 22/53`
   - `informativo, sem catraca (DEC-022) — caras (silhueta, 200 seeds): 1: 19 · 2-9: 21 · 10+: 13 tipos | escolhas (pickOne): 1: 16 · 2-9: 6 · 10+: 31 tipos`
   Outro número: relate a saída crua. **Não** rode `--update`.
3. `npm run seeds | grep -E "^botanical/(koch|dragon)"` → `escolhas` = **5** nas duas (as famílias de curva, vistas desde a Edição 3).
4. `npm run build` → `✓ dist/vectorforge.html gerado` (protótipo: 108.1 KB); `grep -c "//__SCRIPT__" dist/vectorforge.html` → **0**.
5. Sonda de UI: `cd ../261112-sonda-ui && node behave.cjs ../vectorforge/dist/vectorforge.html | grep -c "^OK"; cd ../vectorforge` → **18**.
6. Sonda de repetição e tempo (nova, do chat, fora do repo): `cd ../261112-sonda-ui && node repeticao.mjs ../vectorforge/dist/vectorforge.html 25; cd ../vectorforge` (~2 min). Protótipo: `repeticao R artdeco/pattern` e `celtic/spiral` ≈ 8% das sessões; `geometric/symbol` e `celtic/knot` ≈ 64%; `minimal/symbol` 100% (cara única, esperado); tempo do R em `geometric/tessellation` canvas 1200 mediana ≈ 139 ms (antes 81). Copie as 9 linhas no relatório; números na mesma faixa (±20 pontos, ±50%) bastam — é acaso.
   - **Pergunta que NÃO responde:** se o dono deixa de ver repetição, nem o tempo num browser de verdade — é o roteiro do dono.

---

## Fora de escopo

«Like this» (IDEAS «“Like this” sem miniaturas iguais»); tirar o seed do teto 1–999; régua de «mesma cara» melhor (IDEAS); qualquer gerador além do `pickOne` do Botânico. Se algo parecer estranho no app, relate com print.

## Armadilhas desta WO

- **O registrador não pode consumir número do PRNG.** A Edição 1 faz a MESMA conta (`Math.floor(rnd() * list.length)`) e só anota o índice — o passo 1 da validação confere com as 318 chaves.
- **Import circular `explore.js` ↔ `generate.js`** já existia (`doGen`); o `generateContent` vem pelo mesmo caminho. O bundle resolve; não «conserte».
- **`choiceLog` é declarado depois do `pickOne`** em `utils.js`: é seguro, porque nenhum módulo chama `pickOne` no carregamento (só dentro de geradores). Não mova.
- **A linha de base do `seeds` não muda:** `caras`/`escolhas` não entram nela de propósito (DEC-022). `git diff --stat -- scripts/seeds-baseline.json` vazio.
- **A sonda `../261117-sonda-silhueta/looks.mjs` importa `scripts/silhouette.mjs`** e deixa de rodar depois da Edição 4 — está fora do repo e é do chat; não mexa nela (o `LEIA.md` dela já avisa).
- **`grep -c` conta LINHAS.**

---

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` → ` M` em `CLAUDE.md`, `dist/vectorforge.html`, `logs/2026-11-19.md`, `meta/CEREBRO.md`, `meta/CHANGELOG.md`, `meta/CONTEXT.md`, `meta/DECISIONS.md`, `meta/GLOSSARY.md`, `meta/IDEAS.md`, `meta/ROADMAP.md`, `meta/STATUS.md`, `package-lock.json`, `package.json`, `scripts/seeds.mjs`, `src/core/explore.js`, `src/core/utils.js`, `src/generators/botanical.js` (**17 `M`**), `D  scripts/silhouette.mjs` (staged pelo `git rm`) e `??` em `meta/analises/261119-ANALISE-anti-repeticao.md`, `meta/workorders/261119-wo0015-anti-repeticao.md`, `src/core/silhouette.js` (**3 `??`**). Nada em `scripts/*-baseline.json`.
- [ ] `grep -rn "import.*silhouette.mjs" scripts src` → **0** linhas; `grep -rn "const pickOne\|function pickOne" src` → só `src/core/utils.js`.
- [ ] `grep -c "\"version\": \"0.11.0\"," package.json package-lock.json` → `package.json:1`, `package-lock.json:2`.
- [ ] `grep -c "^## \[0.11.0\] — 20" meta/CHANGELOG.md` → **1**; `grep -c "{DATA}" meta/CHANGELOG.md` → **0**; `grep -c "^## DEC-022 " meta/DECISIONS.md` → **1**.
- [ ] `grep -c "^\*\*\[0.11.0\]\*\* —" meta/STATUS.md` → **1**; `grep -c "^- \[x\] Anti-repetição no sorteio" meta/ROADMAP.md` → **1**; `grep -c "^### 2026-11-16 — Um .pickOne. só" meta/IDEAS.md` → **0**; `grep -c "^## Conversa 2 " logs/2026-11-19.md` → **1**.

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · desvios · saída CRUA: passo 1 (`rc` e contagem de `MUDOU:`), as duas linhas de resumo do `npm run seeds`, as linhas de `koch`/`dragon`, o tamanho do build, a contagem da sonda de UI e as 9 linhas da sonda de repetição · arquivos tocados · commit e push.

## Commit — blocos separados, mensagem SEM acento

```
git add CLAUDE.md dist/vectorforge.html logs/2026-11-19.md meta/CEREBRO.md meta/CHANGELOG.md meta/CONTEXT.md meta/DECISIONS.md meta/GLOSSARY.md meta/IDEAS.md meta/ROADMAP.md meta/STATUS.md package-lock.json package.json scripts/seeds.mjs src/core/explore.js src/core/utils.js src/generators/botanical.js src/core/silhouette.js meta/analises/261119-ANALISE-anti-repeticao.md meta/workorders/261119-wo0015-anti-repeticao.md
```

```
git commit -m "feat(explore): anti-repeticao no R e no Surprise" -m "R e Surprise sorteiam ate 12 candidatos (orcamento ~30 ms) e mostram o que menos repete as ultimas 10 imagens: mesma silhueta ou mesmas escolhas do pickOne. pickOne ganha o registrador recordChoices (saida identica, regress 0); o Botanico usa o pickOne de utils. Silhueta movida para src/core/silhouette.js. npm run seeds ganha as colunas informativas caras e escolhas (200 seeds, sem catraca). Versao 0.11.0. Ver DEC-022, analise 261119 e WO 0015."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
