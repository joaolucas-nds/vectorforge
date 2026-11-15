# SPEC — F5, lote 1: instrumento de sensibilidade ao seed + lote Botânico (tree, koch, dragon)

> Primeiro lote da F5 — Variedade procedural (DEC-016). O COMO está em `meta/workorders/261115-wo0005-seed-vivo-botanico.md`.
> Escrita em 2026-11-15 a partir de um protótipo construído e medido fora do repositório (VM do chat, commit `ccf8839`): instrumento rodado, regress, build e prova visual de 8 seeds por tipo (`261115-lote-botanico-8-seeds.png`).

## Problema
O dono notou que «botanical tree é sempre praticamente o mesmo desenho, a mesma silhueta». Medido: o seed não muda nada em 46 dos 53 tipos e muda a **estrutura** do desenho em só **3** (branch, flow, wreath). Os 3 tipos do Botânico: a árvore ignora o seed; o Koch usa o seed só para ±2° de ângulo (o floco é sempre o mesmo); o Dragon ignora seed e Symmetry, embora a documentação prometa um papel para o Symmetry. E os três ocupam só ~40% do canvas.

## Critérios de aceite (verificáveis)
- [ ] **`npm run seeds`** existe e mede, por tipo, em 40 seeds com os mesmos sliders: **distintos** (SVGs diferentes) e **formas** (estruturas diferentes: elementos + quantidade de comandos de cada path). Modo catraca: sai 1 se algum tipo **perder** variedade em relação a `scripts/seeds-baseline.json`; ganhar não reprova; `--update` regrava.
- [ ] Antes do lote, o instrumento mostra **formas>1: 3/53 · distintos>1: 7/53** (prova de vida — medido no protótipo).
- [ ] Depois do lote: **formas>1: 6/53 · distintos>1: 9/53**; `botanical/tree` 40 distintos / 40 formas, `botanical/koch` 40 / 4, `botanical/dragon` 30 / 3 (medido no protótipo; a métrica «formas» subconta curvas de mesmo número de segmentos — o Dragon tem 5 famílias, e a imagem mostra as 5).
- [ ] **Árvore:** L-System estocástico — o seed escolhe a regra de cada galho (5), se o tronco dobra, e perturba ângulo (±4° base, ±5° por giro), comprimento (±20%) e inclinação (±8°). Symmetry continua sendo o ângulo de ramificação.
- [ ] **Koch:** o seed escolhe a curva (floco, anti-floco, ilha quadrática, Minkowski, Koch sobre hexágono) e a orientação (passos de 15°); Symmetry continua sendo o jitter de ±2°.
- [ ] **Dragon:** o seed escolhe a curva (Heighway, twindragon, Lévy C, terdragon, Sierpiński), a orientação e o espelhamento; **Symmetry passa a ser o número de cópias giradas (1–4)**, com orçamento de dobras para o SVG não multiplicar.
- [ ] Os três ocupam **~83%** do canvas (`FIT = 1.8`, antes 0.86).
- [ ] Tamanho: pior caso medido em 80 seeds × 4 combinações de sliders — tree 54 KB, koch 43 KB, dragon 111 KB (antes: tree até 166 KB). Tempo ≤ 32 ms por chamada no protótipo.
- [ ] `npm run regress` muda **exatamente as 18 chaves `botanical/*`** e nenhuma outra; a linha de base é regravada de propósito.
- [ ] Roteiro visual do dono: as três variam de verdade a cada seed.

## Decisões de design
- **`lsystemExpand` e `turtleToPath` continuam com o mesmo comportamento por padrão.** A versão estocástica é uma função nova (`lsystemExpandStochastic`), e o jitter da turtle é um parâmetro opcional: quem não o passa não chama `rnd()`.
- **Instrumento em catraca, não em meta fixa:** a F5 vai em lotes; reprovar enquanto não chega a 53/53 tornaria o instrumento inútil até o fim. A catraca impede regressão de variedade e o relatório mostra o placar.
- **«Formas» mede estrutura, não aparência:** é a pergunta «o seed mudou o desenho ou só arredondou números?». O instrumento diz na própria saída que não olha aparência.
- **Loader duplicado** de `scripts/regress.mjs` (≈20 linhas) em vez de refatorar o regress neste lote — unificar fica no IDEAS.

## Fora de escopo
Os outros 47 tipos (um lote por estilo, próximas WOs); modificadores universais; qualquer mudança de UI.

## Passos
1. Rodar `seeds` sem linha de base (prova de vida: 3/53) e o regress (0 mudanças).
2. Aplicar as 7 edições do `botanical.js`; registrar o script `seeds`.
3. `regress` → 18 `botanical/*` mudam e nada mais → `--update`. `seeds --update` → 6/53. Build.
4. Registro (DEC-017, 0.6.0) e roteiro do dono.
