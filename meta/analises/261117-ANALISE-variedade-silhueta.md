# ANALISE — Por que «ainda falta variedade»: o seed troca detalhes, não a silhueta

> **Status:** Em discussao
> **Data:** 2026-11-17

> Nasceu do relato do dono depois do roteiro do lote 3 (1–7 ok): «ainda sinto que faltou mais variedade» [relatado pelo dono, 2026-11-17]. A pergunta (o que fazer com a F5 a partir daqui) é dele.

## Problema

Os lotes 2 e 3 da F5 (DEC-018, DEC-019) fizeram 23 tipos «variarem» pelo instrumento (`npm run seeds`, métrica `formas`), e os roteiros passaram — mas o dono continua achando o resultado parecido demais entre seeds. Se nada mudar, os quatro lotes que faltam (Celta, Islâmico, Minimal, Orgânico) vão repetir a mesma receita e entregar o mesmo «varia, mas parece igual», e a F5 fecha 53/53 no instrumento sem resolver a queixa que a abriu.

## Restricoes / o que foi medido

**Sonda de silhueta** (`../261117-sonda-silhueta/`, fora do repo; relatório `261117-1330-SILHUETA-v0.8.0.txt`): 53 tipos × 12 seeds, sliders fixos (Complexity 0,55 · Symmetry 0,5), canvas 400, rasterizados a 128 px; média de 1 − IoU da máscara de tinta entre todos os pares de seeds. **Silhueta** = a mesma conta numa malha grossa 16×16 (o que se lê na miniatura); **detalhe** = na malha 128×128. Sem veredito — conta.

| Tipo | Silhueta muda | Detalhe muda | Como o seed atua |
|---|---|---|---|
| botanical/koch · tree · dragon | 66 · 61 · 42% | 92 · 88 · 73% | muda o esqueleto (regras de L-System, família de curva) |
| baroque/swag · victorian/divider · flourish | 42 · 41 · 31% | 42 · 41 · 57% | elementos lineares: peças entram e saem do traçado |
| artdeco/corner | 38% | 56% | traçado do canto muda (linhas, arcos, esquadros) |
| baroque/cartouche · victorian/cartouche | 16 · 15% | 55 · 47% | contorno troca, mas centro, tamanho e proporção fixos |
| baroque/medallion · victorian/medallion · frames | 5–15% | 21–37% | detalhes trocam dentro do mesmo contorno |
| artdeco/medallion · pattern · geometric/symbol · mandala | 4 · 4 · 2 · 2% | 31 · 62 · 53 · 23% | **só o miolo muda**: mesmo círculo, mesmo raio, mesmo número de eixos |

Comparação visual: `../261117-variedade-silhueta-vs-detalhe.png` (8 seeds de tree, mandala, medalhão Art Deco e cartela barroca).

**O que os números dizem:**
1. Nos lotes 2 e 3, o seed escolhe entre variantes de **detalhe** pregadas num **esqueleto fixo** — centro em (cx, cy), raio externo `sz·0,48`, contorno circular, quantidade de eixos ditada pelo Symmetry e de anéis pelo Complexity. O dono vê a miniatura; a miniatura é a silhueta; ela quase não mexe.
2. **O instrumento puxou nessa direção.** `formas` conta a sequência de elementos e os comandos de cada path: trocar um octógono por um dodecágono no anel do meio conta como forma nova. Os lotes 2 e 3 otimizaram a métrica — e a métrica não mede o que o dono vê. (O instrumento sempre disse «não olha aparência»; o placar 29/53 foi lido como mais do que é.)
3. O Botânico, que o dono não reclamou, é o único estilo em que o seed mexe no **esqueleto**.

**O que a prática diz** (Tyler Hobbs, sobre algoritmos de saída longa): as boas *features* são **ortogonais** (independentes e distintas) e de preferência **contínuas**, e cada uma acrescenta uma dimensão ao espaço de saída; mas variedade sem contrapeso vira «cinco ideias diferentes enfiadas num saco» — um motivo forte e constante mantém o conjunto coeso, e valores extremos podem apagar a identidade da obra (https://tylerxhobbs.com/words/the-design-philosophy-of-the-qql-algorithm). No mesmo autor: resolver primeiro as **formas grandes**, legíveis numa miniatura, e só depois os detalhes (https://tylerxhobbs.com/essays/2018/tips-to-improve-your-generative-artwork).

**Limites da medição:** um só ponto de sliders; não mede cor nem traço; a malha 16×16 é uma escolha (8 px de bloco num raster de 128). Mede «quanto muda», não «quanto agrada».

## Opcoes consideradas

**A — Esqueleto semeado por tipo.** O seed passa a escolher também a COMPOSIÇÃO: contorno (círculo · oval · losango · quadrado girado · arco · escudo, conforme o estilo), proporção (largura × altura, raio interno × externo), arranjo (concêntrico · empilhado · radial com eixo vertical · deslocado), e um desvio de ±1–2 na contagem que o slider dá (anéis, eixos), sem tirar do slider o controle da tendência. Mantém as escolhas de detalhe dos lotes 2/3 por cima. *Pró:* é o que funcionou no Botânico (silhueta 42–66%). *Contra:* reabre 23 tipos já entregues (regress de novo nesses tipos) e aumenta a chance de saída ruim — exige contact sheet maior (16+ seeds) por tipo.

**B — Modificadores universais** (já no ROADMAP da F5): uma camada aplicada DEPOIS de qualquer gerador — repetição em 2/4/6 cópias (caleidoscópio, faixa), espelho, deformação leve por ruído, traço duplo/tracejado/pontilhado, sobreposição de dois seeds. *Pró:* uma implementação muda a silhueta dos 53 tipos de uma vez, inclusive os 24 parados. *Contra:* é genérico — a mesma deformação no Barroco e no Minimal apaga a diferença entre estilos (o «saco de ideias» do Hobbs); e o desenho-base continua o mesmo, só embrulhado.

**C — Seed também nos números contínuos** (raios, espaçamentos, rotação ±20%). *Pró:* barato, um helper. *Contra:* sem mexer no contorno, a silhueta continua o mesmo círculo — ganho pequeno na métrica que importa. Entra como parte de A, não como frente própria.

**D — Trocar o alvo do instrumento.** Acrescentar ao `npm run seeds` uma medida de **silhueta** sem dependência nova: ocupação de uma malha grossa calculada da GEOMETRIA do SVG (pontos de paths, centros e raios de círculos/elipses), em Node puro, com catraca igual à de `formas`. *Pró:* os próximos lotes passam a mirar o que o dono vê; sem isso, A e B continuam medidos pela régua errada. *Contra:* a silhueta por geometria é aproximada (traço não tem espessura, arcos viram pontos); precisa de calibragem contra esta sonda rasterizada.

**E — Seguir os lotes 4–7 como estão.** Descartada: repete o que a medição mostrou não resolver a queixa.

## Recomendacao

**D, depois A em lote-piloto, depois decidir B.** Em ordem:
1. **D** — `silhueta` vira coluna do `npm run seeds`, com catraca; calibrar contra a tabela acima (a ordem dos tipos tem de bater: Botânico no topo, mandala/símbolo embaixo).
2. **A, piloto nos 4 piores** — `geometric/mandala`, `geometric/symbol`, `artdeco/medallion`, `artdeco/pattern` (2–4% hoje). Meta concreta: silhueta ≥ 25% sem sair do estilo, conferida em contact sheet de 16 seeds. Se o piloto convencer no roteiro, a receita (contorno + proporção + arranjo + desvio de contagem) vira o padrão dos lotes 4–7 e volta, em lotes, aos 19 tipos dos lotes 2 e 3.
3. **B** só depois, e **fora do seed** — como opção que o usuário liga (ex.: «espelhar», «repetir ×4»), porque é ali que ela não dilui o estilo.

O porquê: o problema medido é de esqueleto, e A ataca o esqueleto preservando a identidade de cada estilo (o motivo forte do Hobbs); D garante que a próxima rodada mire a coisa certa; B resolve outra coisa (composição de cena) e, no seed, custaria identidade.

**Melhor argumento contra:** A é caro — piloto + revisitar 19 tipos + 24 novos com a receita nova —, enquanto B daria silhueta variada em todos os 53 numa WO só. Se o que o dono quer é «surpresa visual» acima de «coerência de estilo», B primeiro é a escolha mais rápida.

## Riscos

- **Saída ruim mais frequente** (contorno que não combina com o miolo, proporção extrema). Sinal cedo: no contact sheet de 16 seeds, mais de 2 ruins por tipo. Contramedida: faixas limitadas, como o QQL limitou o tamanho dos anéis.
- **Retrabalho no regress** dos 19 tipos dos lotes 2/3 — esperado e intencional, mas é churn na linha de base.
- **Silhueta por geometria descalibrada** (D): se a ordem dos tipos não bater com a sonda rasterizada, a régua nova engana tanto quanto a antiga. Conferência: as duas tabelas lado a lado antes de ligar a catraca.

## Ponto de decisao

Você quer que a F5 siga por **D + piloto de A nos 4 tipos de silhueta mais parada** (recomendado), ou prefere **B primeiro** (modificadores universais, mais rápido e mais genérico)? Junto: a imagem `261117-variedade-silhueta-vs-detalhe.png` mostra o que você sente — a linha de cima (árvore) é o tipo de variedade que você quer em todos?
