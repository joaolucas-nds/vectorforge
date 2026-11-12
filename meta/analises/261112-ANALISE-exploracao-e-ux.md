# ANALISE — Exploração aleatória, variedade e UX da interface

> **Status:** Em discussao — a Fase A já virou spec + WO (o dono pediu «prossiga»); as Fases B e C esperam o Ponto de decisão.
> **Data:** 2026-11-12

## Problema

O dono pediu (2026-11-12): mais opções e variações; «apertar um botão e gerar um diferente do último»; configuração aleatória para tudo; mais possibilidades dentro de um mesmo tipo; e uma interface mais intuitiva, prática, profissional e completa. Hoje, usar o VectorForge para **explorar** custa caro:

- **Nada responde de imediato.** Trocar estilo, tipo, paleta, slider ou tamanho de canvas não redesenha: só o botão **Generate**, no rodapé do painel esquerdo, aplica. Medido no código: `selectStyle`/`selectType`/`selectPal` (`src/core/ui.js`) só reconstroem os chips, e os listeners dos sliders só atualizam o número exibido.
- **Dois botões com nomes parecidos e papéis diferentes.** «↻ Regenerate» (topo, direita) só sorteia o seed; «Generate» (rodapé, esquerda) aplica os controles.
- **Não existe aleatório de verdade.** O único acaso é o seed. Estilo, tipo, paleta e sliders nunca são sorteados, e nada impede repetir o último resultado.
- **«Variations» varia pouco.** As 4 miniaturas usam os MESMOS parâmetros com seed +0/+111/+222/+333 (`generateVariations`, `src/core/generate.js`): mesma silhueta, outro sorteio.
- **Sem desfazer.** Uma boa geração perdida não volta, a menos que a pessoa tenha anotado o seed.
- **Bug de canvas vazio (candidato a FIX-003).** Medido no painel do navegador em 2026-11-12: com a página carregada sem área visível, `#main-svg` ficou com **0×0 px**. `fitToView()` calcula o zoom pelo `clientWidth` do `#canvas-area` sem piso e sem listener de `resize`, então o zoom vai a 0 e só volta clicando em Fit.
- **Observado nas capturas do dono (2026-11-12 14:36, `Captura de tela 2026-11-12 143622.png` e `…143629.png`):** (1) `botanical/tree` com Complexity alto ocupa uma faixa estreita do canvas, com bastante espaço vazio; (2) `organic/leaf` com Symmetry baixo vira 3 traços finos — resultado pobre para o tipo; (3) **Fill opac.** em ~80% sem efeito visível na Leaf (o gerador desenha só traço) — controle que não age no tipo atual e não avisa; (4) texto «aura» no Text→Form com o tipo `leaf`, que o ignora sem aviso; (5) as 4 variações saem quase idênticas. Os itens 1–3 vão para a Fase C (qualidade e variedade dentro do tipo); os itens 3–4 também para a Fase B (controle sem efeito tem de ficar desabilitado ou explicado); o item 5 é resolvido pela Fase A.
- **Interface pouco autoexplicativa:** rótulos abreviados («Stroke w.», «Fill opac.»), sem tooltip nem atalho de teclado; seed só por slider (1–999); Text→Form só age em 3 tipos (`glyph`/`symbol`/`mark`) e não avisa; painel esquerdo exige rolagem; o painel Info repete o que já está à vista.

## Restricoes / o que foi medido

- **Arquivo único, zero dependência de runtime** (DEC-001): qualquer UI nova é HTML/CSS/JS dentro do bundle, sem framework.
- **Os geradores são funções puras** (DEC-002) e o `npm run regress` (DEC-014) cobre as 318 saídas de `generateContent`. Mudança de **UI** que não toca gerador tem rede automática: o regress tem de continuar com 0 mudanças.
- **Custo de regerar a cada ajuste:** o tipo mais pesado da linha de base é `botanical/tree` com comp=1 (166.099 bytes, medido na WO 0001). Cada geração também refaz as 4 miniaturas. Prévia ao vivo precisa de **debounce** nos sliders.
- **O que não se mede por comando:** a aparência e a sensação de uso. Cada fase fecha com um roteiro do dono.

## Referências consultadas (2026-11-12)

- **Coolors** — o ciclo «barra de espaço gera, cadeado trava o que você gostou, espaço de novo regera o resto». É o mecanismo mais citado do gênero e o modelo direto para «gerar um diferente do último» com controle.
- **Haikei** (gerador de SVG) — fluxo em 4 passos: escolher o gerador, ajustar, randomizar, baixar. Prévia sempre ao vivo.
- **Autodesk Generative Design (Revit)** — separa *Randomize* (valores aleatórios dentro de faixas) de *Like this* (variações a ±20% de uma solução preferida). É exatamente a diferença entre «surpreenda-me» e «variações desta».
- **Minimal Audio Rift** — randomização por módulo, com parâmetros travados por clique direito.
- **Nielsen / NN/g** — visibilidade do estado do sistema e feedback imediato; desfazer/refazer como saída de emergência; manipulação direta com ações incrementais e reversíveis.

## Opcoes consideradas

1. **Só polir o visual da UI atual** — descartada: o atrito principal é de fluxo (nada responde, nada se desfaz, nada é sorteado), não de aparência.
2. **Redesenho completo de uma vez** (layout, ciclo de exploração e variedade dentro dos geradores) — descartada como passo único: mistura três riscos de natureza diferente (UI, fluxo, geradores) e deixa o regress sem poder separar o que mudou de propósito.
3. **Três fases, cada uma com a sua rede** — *recomendada*:
   - **A — Ciclo de exploração** (sem tocar gerador; rede = regress com 0 mudanças). Prévia ao vivo; **🎲 Surprise** (tecla Espaço) sorteando tudo o que não estiver travado e nunca repetindo o último; **cadeado** por parâmetro; **novo seed** (R); **desfazer/refazer** (Ctrl+Z / Ctrl+Shift+Z) com histórico; variações «Like this» (±20% em Complexity/Symmetry + seed novo, clicáveis); e o FIX-003 do canvas vazio.
   - **B — Redesenho da interface** (layout e leitura). Barra de ações única no topo; painel esquerdo em seções recolhíveis («Estilo e tipo», «Forma», «Cor», «Canvas», «Texto»); rótulos completos com tooltip e atalho; seed digitável; Text→Form avisando quando o tipo atual o ignora; estado na URL (`#style=…&seed=…`) para compartilhar e reproduzir; galeria de favoritos (`localStorage`, já no IDEAS/F4); sorteio de paleta harmônica, além das 8 fixas; responsivo. Feita primeiro como **mockup** para o dono reagir, só depois como WO.
   - **C — Variedade dentro do tipo** (toca geradores; rede = regress com mudança INTENCIONAL e `--update`). Modificadores universais aplicáveis a qualquer tipo: estilo de traço (contínuo, tracejado, duplo, pontilhado), camadas (repetir o desenho em anel ou escala), espelhamento, deformação leve por noise. Depois, «sub-estilos» por tipo onde o gerador tiver espaço (ex.: medallion com 3 arranjos).

## Recomendacao

**Opção 3, na ordem A → B → C.** A entrega o que mais se pediu («botão que gera diferente», «aleatório para tudo», «mais variações») sem risco para os geradores, porque o regress prova que nenhuma saída mudou. B se beneficia de A: o desenho final da interface sai melhor quando o ciclo já existe e pode ser usado. C é a fase de maior custo e a única que muda a arte em si. Por isso vem por último, com a linha de base regravada de propósito e um roteiro visual por modificador.

## Riscos

- **Prévia ao vivo travar em tipo pesado** (árvore com comp alto, 4 miniaturas junto). Sinal: atraso perceptível ao arrastar slider. Mitigação: debounce de 120 ms e miniaturas regeradas só ao soltar o slider.
- **Barra de espaço roubar a digitação** no campo de texto ou nos números do canvas. Mitigação: atalhos ignorados quando o foco está em `input`/`textarea`.
- **Histórico crescer sem limite** ou registrar cada passo de um arraste. Mitigação: teto de 60 estados e agrupamento de mudanças próximas (600 ms).
- **Mistura de idiomas:** a UI é toda em inglês, e acrescentar rótulos em PT agora deixaria metade/metade. A Fase A mantém o inglês; a escolha é do dono, na Fase B.

## Ponto de decisao

Para as Fases B e C (a A já está em execução):
1. **Idioma da interface:** manter inglês, passar a português, ou PT com um seletor EN?
2. **Fase B:** começa por um mockup visual para você reagir antes de qualquer código?
3. **ROADMAP:** aceitar a nova **F4 — Exploração e UX** (A+B), com C como **F5 — Variedade dentro do tipo**, empurrando as fases atuais «Geometria Avançada e Persistência» para F6 e «Export Avançado e Integrações» para F7?
