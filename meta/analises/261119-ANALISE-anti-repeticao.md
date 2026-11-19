# ANALISE — Anti-repetição no sorteio (R e Surprise) e a coluna `caras`

> **Status:** Decidida — opção A aprovada pelo dono em 2026-11-19, com as marcações da §5 («Aprovo a opção A como recomendada e concordo com as marcações da §5»); ver DEC-022 e WO 0015
> **Data:** 2026-11-19

> O QUÊ já foi decidido pelo dono: anti-repetição no sorteio (R e Surprise) + coluna `caras` no `npm run seeds` [relatado pelo dono, 2026-11-19]. O que segue aberto é o COMO — K e N, escopo, teto do seed, limiar de «mesma cara», se `caras` vira meta — e a medição abaixo mudou a resposta de uma dessas perguntas (o limiar), por isso a análise.

## Problema

«Em 10 cliques eu vi a mesma coisa umas 2-3 vezes» [relatado pelo dono, 2026-11-18]. Hoje o R sorteia um seed qualquer entre 1 e 999 (só garante ≠ do atual) e o Surprise sorteia tudo o que não está travado (só garante ≠ do estado atual): nenhum dos dois olha o que já foi mostrado. Se nada mudar, a repetição continua acima de 80% das sessões de 10 cliques em 51 dos 53 tipos (só `botanical/tree`, 4%, e `botanical/dragon`, 65%, escapam), e os lotes da F5 que aumentam as caras só melhoram isso devagar, porque o sorteio continua cego.

## Restricoes / o que foi medido

Tudo medido em 2026-11-19 numa cópia descartável de `df929da` na VM do chat (`git archive HEAD`, `npm ci`), scripts em `~/work/m/` da VM — fora do repo, sem commit. Sliders fixos (Complexity 0,55 · Symmetry 0,5), canvas 400, paleta 0, salvo onde dito. `[medido por instrumento]` em tudo.

### 1. Custo de um candidato (gerar + medir a silhueta)

`timing.mjs`: `generateContent` + `occupancy` (de `scripts/silhouette.mjs`), 30 seeds por tipo, Node 22.

| Cenário | gerar (mediana · p95), média dos 53 tipos | silhueta (mediana · p95) | pior tipo (gerar + silhueta, p95) |
|---|---|---|---|
| canvas 400, sliders padrão | 0,18 · 0,44 ms | 0,23 · 0,46 ms | `organic/flow` 2,2 + 2,3 ms |
| canvas 400, Complexity 0,95 · Symmetry 1 | 0,24 · 0,45 ms | 0,38 · 0,71 ms | `organic/flow` 4,1 + 4,6 ms |
| canvas 1200, Complexity 0,95 · Symmetry 1 | 0,45 · 0,96 ms | 0,85 · 1,50 ms | `geometric/tessellation` 11,6 + 13,7 ms |

Logo: 12 candidatos custam ~5 ms no tipo típico e até ~300 ms no pior caso (padrões em 1200). Hoje cada clique já gera 4 desenhos (o principal + 3 variações «Like this», `generateVariations`). Node não é o browser do dono: o tempo real pode ser 2–3× — **não medido no browser**.

### 2. Quantas caras cada tipo tem (silhueta, IoU ≥ 0,8 na malha 16×16)

`sim.mjs`, seeds 1..999 (o teto atual inteiro): 19 tipos têm **1** cara (os 6 Minimal; Orgânico spiral/flower/mandala/phyllotaxis; Art Deco frame/divider; Barroco medallion; Geométrico frame/divider; Vitoriano medallion/frame/divider/wreath) · 12 têm 2–4 · 9 têm 5–9 · 13 têm 10 ou mais (`botanical/tree` 997, `organic/flow` 174, `botanical/dragon` 55, `koch` 49, `celtic/spiral` 29, `artdeco/pattern` 20, `organic/wave` 20, …).

**O teto 1–999 do seed** só limita os tipos de variação contínua: de 200 para 999 seeds, `tree` vai de 200 para 997 caras, `flow` de 69 para 174, `wave` de 11 para 20, `branch` de 10 para 17; nos tipos de escolhas discretas, as caras já se esgotam antes das 200 seeds.

### 3. Simulação do R: sorteio cego (hoje) contra «melhor de K candidatos»

`sim.mjs`: 2.000 sessões de 10 imagens por tipo, candidatos sorteados das 999 seeds. Repetição = algum par da sessão com IoU ≥ 0,8. Três critérios para escolher entre os K candidatos, olhando as N últimas imagens exibidas:
- **a** — Mitchell puro: maior distância mínima (1 − IoU) às N últimas;
- **b** — menor soma de IoU às N últimas;
- **c** — menos «mesmas caras» (IoU ≥ 0,8) entre as N últimas; empate, maior distância mínima.

| Configuração | tipos com repetição < 50% em 10 cliques | média de pares repetidos por sessão |
|---|---|---|
| hoje (K=1) | 1/53 | 24,9 |
| K=8, N=4, a | 2/53 | 21,1 |
| K=8, N=9, a | 8/53 | 21,4 |
| K=8, N=9, b | 4/53 | 21,1 |
| K=8, N=9, c | 8/53 | 19,5 |
| K=4, N=9, c | 5/53 | 20,3 |
| K=8, N=4, c | 2/53 | 20,2 |
| **K=12, N=9, c** | **9/53** | **19,2** |

**Piso teórico** (as caras de cada tipo distribuídas por igual em 10 imagens): 19,0 pares. O critério c com K=12 chega a 0,2 do piso — **o sorteio já faz quase tudo o que dá para fazer; o resto é falta de caras.** Exemplos: `artdeco/pattern` 99% → 1%; `celtic/spiral` 100% → 1%; `baroque/swag` 100% → 9%; `geometric/symbol` 100% → 25%; `celtic/knot` 100% → 52%; tipos com 1 cara: 100% → 100%.

Achados de método: (i) **N curto não serve** — N=4 quase não melhora, porque a imagem repetida volta depois da quarta; (ii) **o Mitchell puro piora com poucas caras** — com 2 caras (`geometric/tessellation`), o critério a fica em 29,5 pares (hoje: 29,4), enquanto o c chega a 20,1 (piso 20): o puro passa a caçar a seed mais «estranha» dentro da mesma cara em vez de alternar as caras.

### 4. Simulação do Surprise

`surp.mjs`, geração ao vivo com sliders e seed sorteados como no `surprise()`, 600 sessões; com K=12, N=10, critério c. Aproximação declarada: o tipo é sorteado uniforme entre os 53 (o `surprise()` sorteia estilo e depois tipo).

| Modo | hoje | K=12, N=10 |
|---|---|---|
| nada travado | 81% das sessões repetem (1,98 pares) | **0%** (0,00) |
| tipo travado — `geometric/symbol` | 100% (6,2 pares) | 2% |
| tipo travado — `celtic/knot` | 100% (7,1) | 8% |
| tipo travado — `artdeco/medallion` | 100% (11,1) | 86% (1,5) |
| tipo travado — `minimal/symbol` | 100% (34,1) | 100% (17,9) |
| tipo travado — `artdeco/frame` | 100% (45) | 100% (45) |

No Surprise com tipo travado, os sliders sorteados somam caras (o `minimal/symbol`, de 1 cara com sliders fixos, cai de 34 para 18 pares), mas um tipo de cara única continua de cara única.

### 5. O achado que muda a recomendação: a silhueta 16×16 não vê o motivo

Folha de calibragem: `../261119-1720-CALIBRA-caras.png` (lista dos pares em `../261119-1720-CALIBRA-caras-lista.txt`). São 8 tipos; em cada linha, à esquerda um par que a régua conta como **mesma cara** (IoU 0,80–0,89) e à direita um par que ela conta como **diferente** (IoU 0,70–0,79). No **meu** olho — provisório, o seu decide: dos 8 pares «mesma cara», 4 são claramente diferentes (`celtic/knot`: anel oval de laços × estrela de pontas; `geometric/symbol`: estrela no círculo × hexagrama florido; `celtic/spiral`: tríscele fechada × três espirais soltas; `islamic/pattern`: octógonos × quadrados com estrelas). E 5 dos 8 pares «diferente» parecem a mesma coisa. **A régua concorda com o meu olho em 7 dos 16 pares — nível de acaso.**

O motivo: a malha 16×16 registra ONDE há tinta, não QUE forma ela tem; dois motivos compactos dentro do mesmo círculo ocupam as mesmas células. Testei quatro alternativas, todas sem custo de dependência, nos mesmos 16 pares (`grid.mjs`, `struct.mjs`, `choice.mjs`, `dil.mjs`):

| Régua de «mesma cara» | acordo com o meu olho |
|---|---|
| silhueta 16×16, IoU ≥ 0,8 (a do `looks.mjs`) | 7/16 |
| malha 24, 32 ou 48 (IoU puro) | sobreposição total entre pares «iguais» e «diferentes»; nenhum limiar separa |
| malha 24/48 com folga de 1 célula | 10/16 no melhor limiar, **ajustado na própria amostra** (otimista) |
| silhueta + mesma estrutura de elementos (`structure()` do `seeds.mjs`) | 8/16 — divide demais: `victorian/wreath` vira 999 «caras» |
| mesma tupla de escolhas do `pickOne` | 9/16 — também divide demais (conta escolhas pequenas que não se veem) |

**Nenhuma régua automática barata reproduz o olho nesta amostra.** É a lição do DEC-020 de novo, um degrau acima: a silhueta corrigiu o `formas`, mas não basta para dizer «é a mesma coisa». E a amostra é pequena (16 pares) e o olho é o meu — por isso o ponto de decisão pede o seu.

### 6. Usar dois sinais em vez de um limiar

A tupla de escolhas do `pickOne` não serve de régua de igualdade, mas tem uma propriedade que a silhueta não tem: **tupla idêntica = o gerador tomou exatamente as mesmas decisões de motivo, arranjo e esqueleto** — é a declaração do autor do gerador sobre o que é uma variante. Registrá-la custa um `push` dentro do `pickOne`, ligado só durante o sorteio; conferido: com o registrador ligado, **0 saídas mudam** em 106 amostras (53 tipos × 2 seeds; a WO confere com o `npm run regress`, as 318 chaves).

`sim2.mjs` (R, K=12, N=10, 1.500 sessões por tipo) compara o critério c (só silhueta) com um **critério e**: conta como repetição a seed com a mesma tupla de escolhas OU com IoU ≥ 0,8 (vale o dobro quando as duas batem); empate, maior distância mínima, com distância = fração de escolhas diferentes + (1 − IoU).

| Critério | tipos com repetição de silhueta < 50% | tipos com repetição de escolhas < 50% |
|---|---|---|
| hoje | 1/53 | 11/53 |
| c (só silhueta) | 9/53 | 17/53 |
| **e (escolhas + silhueta)** | **9/53** | **31/53** |

O e mantém todo o ganho de silhueta do c e quase triplica os tipos em que a mesma combinação de escolhas não volta em 10 cliques. Os 22 tipos que ficam fora são os 18 sem `pickOne` (Minimal, Orgânico, Botânico, `victorian/wreath` — ali só a silhueta atua) e 4 com poucas combinações. **Nota:** o Botânico tem um `pickOne` local (`botanical.js:49`, IDEAS «Um `pickOne` só») que o registrador não vê; trocar pelo de `core/utils.js` dá ao `koch` e ao `dragon` as 5 famílias de curva como escolha — mudança de uma linha, sem efeito na saída.

### 7. Custo da coluna `caras` no instrumento

`npm run seeds` hoje (40 seeds): 1,3 s. Com 200 seeds: 6,6 s (sem o agrupamento, que custa menos de 1 s com as ocupações já calculadas). Com 40 seeds, a coluna satura em 40 (`tree`, `koch`, `dragon`, `flow` batem no teto), por isso 200.

## Opcoes consideradas

**A — Melhor de K candidatos, critério e (escolhas + silhueta), janela das N últimas exibidas.** R e Surprise geram até K candidatos (respeitando os cadeados, como hoje) e mostram o que menos repete as últimas N. *Pró:* chega a 0,2 do piso teórico na silhueta e corta a repetição de escolhas em 31/53 tipos; não toca gerador nenhum (só o registrador no `pickOne`); vale para os 53 tipos de uma vez, inclusive os que os próximos lotes ganharem. *Contra:* custa K gerações por clique; não cria cara nenhuma — os 19 tipos de cara única continuam repetindo.

**B — O mesmo com o critério c (só silhueta).** Mais simples (não precisa do registrador). *Descartada:* mesmo ganho de silhueta e metade do ganho em escolhas (17 contra 31 tipos), e a silhueta sozinha confunde motivos diferentes (§5).

**C — Mitchell puro (critério a).** É o «melhor candidato» clássico. *Descartada:* piora com poucas caras (§3, ii) e perde do c em todos os pontos medidos.

**D — «Saco embaralhado» (shuffle bag), sorteio sem reposição das combinações, como o 7-bag do Tetris.** Garante zero repetição até esgotar as combinações. *Descartada agora:* as escolhas saem do PRNG dentro de cada gerador; para «dar as cartas», cada gerador teria de aceitar a combinação de fora — mexe nos geradores dos 35 tipos que usam `pickOne` e no regress inteiro. A aproxima isso sem tocar gerador.

**E — Tirar o seed do teto 1–999.** *Descartada agora:* só ajuda os tipos contínuos, que já são os que menos repetem (`tree`, `flow`); e o slider do Seed (`s-seed`, `max="999"`) é interface — a F4/B (interface nova) é o lugar natural para trocar o seed por um campo numérico, se for o caso.

**F — Anti-repetição também nas variações «Like this».** *Descartada agora:* «Like this» quer dizer «parecido com este» — ali, repetir a silhueta é em parte o objetivo; e as 3 variações são determinísticas pelo estado (`variationSnapshots`), para as miniaturas não mudarem a cada redesenho. Afastar uma variação da outra (as 4 miniaturas sem duas iguais) é uma ideia legítima, mas é outra frente; vai ao IDEAS.

## Recomendacao

**A, com estes valores — uma resposta por pergunta em aberto:**

1. **K e N:** K = 12 candidatos, **com orçamento de tempo** — para de gerar quando os candidatos já somam ~30 ms (sempre pelo menos 2) —; N = 10 últimas imagens exibidas. *Por quê:* K=12 é o melhor ponto medido (K=4 e K=8 perdem tipos); N precisa cobrir a sessão inteira de 10 cliques (N=4 quase não ajuda); o orçamento protege os padrões em 1200 (até ~25 ms por candidato) sem cortar os tipos leves, que cabem nos 12 em ~5 ms.
2. **Escopo:** R e Surprise. **Não** «Like this» (opção F). **Não** quando há texto no Text→Form (`doGen` desenha com `genTextShape`, e o candidato por `generateContent` não representa o que aparece) nem no modo Pixel Art (não é SVG): nesses casos, K = 1, que é o comportamento de hoje. Desfazer/refazer e histórico não mudam: o candidato escolhido entra no histórico como hoje.
3. **Seed:** continua 1–999 (opção E).
4. **«Mesma cara»:** dois sinais em vez de um limiar — mesma tupla de `pickOne` OU IoU ≥ 0,8 na malha 16×16 (critério e). Mantém-se o 0,8 do `looks.mjs` por continuidade, sem pretender que ele represente o olho (§5); a sua marcação da folha de calibragem é o que diz se vale procurar uma régua melhor.
5. **Coluna `caras` no `npm run seeds`:** entra **informativa**, em 200 seeds, em duas colunas — `caras` (agrupamento por silhueta IoU ≥ 0,8) e `escolhas` (tuplas distintas do `pickOne`) —, **sem catraca e sem meta**. *Por quê:* nenhuma das duas reproduz o olho (§5); catraca em régua descalibrada faria o próximo lote otimizar o número errado — exatamente o que aconteceu com `formas`. Quando uma régua concordar com a sua marcação, aí sim ela pode virar meta.
6. **Onde mora a silhueta:** `occupancy` e `silhouetteChange` saem de `scripts/silhouette.mjs` para `src/core/silhouette.js` (o código é JS puro, sem API do Node) e os scripts importam de lá — uma fonte só, a mesma que o browser usa. Duplicar a função deixaria o instrumento medindo uma régua e o produto usando outra.
7. **Botânico:** o `pickOne` local de `botanical.js` passa a ser o de `core/utils.js` na mesma WO (IDEAS «Um `pickOne` só»), para o registrador ver as famílias de curva.

**O que você vai ver depois, em números:** no R, a repetição de silhueta cai para menos de 50% em 9 dos 53 tipos (hoje 1), e a mesma combinação de escolhas deixa de voltar em 10 cliques em 31 tipos (hoje 11); no Surprise sem nada travado, de 81% para ~0%. **O que NÃO muda:** os 19 tipos de cara única e os de 2–4 caras continuam repetindo, porque não há o que alternar — isso só os lotes da F5 resolvem (Minimal + Orgânico, esqueleto nos 19 tipos dos lotes 2 e 3, valores contínuos). A anti-repetição faz cada cara nova que os lotes criarem aparecer na hora, em vez de diluída no sorteio.

**Melhor argumento contra:** a anti-repetição otimiza contra uma régua que, pela §5, não vê o motivo — no pior caso, ela evita repetições que você não percebe e deixa passar as que percebe. A resposta é que o critério e usa também as escolhas declaradas pelos geradores, que não dependem da régua; mas a prova final é o seu roteiro, não a simulação. Se a folha de calibragem mostrar que o seu olho discorda muito mais do que o meu, vale considerar B ou adiar e investir primeiro em caras (lotes).

## Riscos

- **Clique lento em máquina fraca** (o Node não é o browser). Sinal: o R «engasgar» em padrões com canvas grande. Contramedida já na recomendação (orçamento de 30 ms). **Comando que audita:** a WO mede, na sonda de UI (jsdom sobre o `dist/`), o tempo de 20 cliques de R em `geometric/tessellation` com canvas 1200 e Complexity/Symmetry no máximo, e o relatório traz o número.
- **O registrador mudar a saída** (um `push` no lugar errado altera o PRNG). **Comando que audita:** `npm run regress` com 0 chaves mudadas — o registrador não consome número do PRNG.
- **Candidato fora do estado real:** o sorteio gera com `generateContent`, mas o `doGen` desenha com `genTextShape` quando há texto, e no Pixel Art nem é SVG. Contramedida: K = 1 nesses casos (recomendação 2). Conferência: item no roteiro do dono.
- **Cadeados:** os candidatos precisam respeitar exatamente as mesmas regras do `surprise()` de hoje (travar o tipo segura o estilo, etc.). Contramedida: gerar os candidatos pela mesma função que já sorteia o snapshot, não por uma cópia dela.
- **Mover `silhouette.mjs`** quebra quem importa do caminho antigo (`seeds.mjs` e a sonda `../261117-sonda-silhueta/looks.mjs`, fora do repo). **Comando que audita:** `grep -rn "silhouette" scripts/ src/` depois da mudança, e o `npm run seeds` sem perda.
- **Repetição relatada que a simulação não prevê** (cor: o Surprise troca a paleta e a régua não vê cor; sliders em outros pontos). Sinal: o seu roteiro contar repetições num tipo que a simulação dá como resolvido.

## Ponto de decisao

**Você aprova a opção A como recomendada** — R e Surprise com melhor de até 12 candidatos (orçamento ~30 ms), janela das 10 últimas, «mesma cara» = mesmas escolhas OU silhueta ≥ 0,8, seed 1–999, `caras` e `escolhas` como colunas informativas sem catraca, silhueta movida para `src/core/` e o `pickOne` do Botânico unificado — **ou quer mudar algum desses itens?**

Junto, para calibrar a régua: abra `../261119-1720-CALIBRA-caras.png` e diga, para cada uma das 8 linhas, se o par da ESQUERDA (a régua diz «mesma cara») e o par da DIREITA (a régua diz «diferente») parecem a mesma coisa para você — ou só «concordo com as marcações da §5». Isso não bloqueia a WO; decide se a régua de silhueta merece ser trocada depois.
