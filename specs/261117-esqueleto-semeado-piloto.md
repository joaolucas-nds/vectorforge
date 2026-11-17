# SPEC — F5: régua de silhueta + piloto do esqueleto semeado (4 tipos)

> Decidido pelo dono em 2026-11-17 a partir da análise `meta/analises/261117-ANALISE-variedade-silhueta.md` («Vamos de régua de silhueta + piloto de esqueleto semeado nos 4 tipos»). O COMO está em `meta/workorders/261117-wo0011-esqueleto-semeado-piloto.md`.
> Escrita a partir de um protótipo construído e medido fora do repositório (VM do chat, commit `9094566`): régua calibrada contra a sonda rasterizada, regress, seeds, pior caso de tamanho, build, três sondas de UI e prova visual de 16 seeds por tipo (`../261117-piloto-esqueleto-16-seeds.png`, `../261117-piloto-medalhao-v2.png`).

## Problema
Depois do lote 3, o dono ainda sentia pouca variedade. Medido: fora do Botânico, o seed trocava detalhes dentro do mesmo contorno — a silhueta (o que se lê na miniatura) mudava 2–16% entre seeds, contra 42–66% no Botânico. E o instrumento `npm run seeds` só contava estrutura de elementos (`formas`), que premiava exatamente essa troca de detalhe.

## Critérios de aceite (verificáveis)
- [ ] **`npm run seeds` ganha a coluna `silhueta%`**: média de 1 − IoU da ocupação de uma malha 16×16, calculada da GEOMETRIA do SVG (`scripts/silhouette.mjs`, Node puro, sem dependência nova), entre todos os pares das 40 seeds. Entra na catraca (perder silhueta reprova) e no resumo (`silhueta>=25%: N/53`).
- [ ] **Calibragem:** contra a sonda rasterizada (53 tipos, 12 seeds), correlação de postos (Spearman) **0,771**, Botânico no topo e mandala no fundo nas duas. Divergência conhecida: divisores (0% na régua, 30–40% no raster), porque o traço fica numa faixa de duas linhas da malha e só a espessura rasterizada «vaza» de célula.
- [ ] **Piloto do esqueleto semeado** nos 4 tipos de silhueta mais parada — o seed passa a escolher também a COMPOSIÇÃO, e as escolhas de detalhe dos lotes 2 continuam por cima:
  - `artdeco/medallion`: contorno (círculo · octógono · losango · quadrado · oval alto · arco · sol nascente = meio medalhão sobre base), escala, ±1 anel, ±2 raios.
  - `geometric/mandala` (só com `vary = true`): contorno (círculo · polígono · estrela ondulada · oval largo · oval alto), escala, espaçamento dos anéis, ±2 anéis.
  - `geometric/symbol`: contorno (círculo · polígono · estrela · losango · oval largo), órbita dos nós (no contorno · satélites com haste · dentro), escala.
  - `artdeco/pattern`: campo (página · medalhão · losango · faixa · moldura · arco, com contorno) e escala da célula.
- [ ] **Silhueta medida no protótipo** (régua / raster): medallion 7,0 → **25,8** / 4,1 → 29,8 · pattern 8,8 → **41,9** / 4,1 → 43,5 · mandala 3,0 → **29,7** / 1,6 → 30,2 · symbol 7,5 → **33,2** / 2,4 → 33,1. Resumo: `silhueta>=25%` 6/53 → **10/53**.
- [ ] `npm run regress` muda **exatamente as 24 chaves** dos 4 tipos; Celta (medallion), Orgânico (mandala) e todo o resto, idênticos — a mandala sem `vary` faz as mesmas contas na mesma ordem.
- [ ] Nenhum tipo perde `distintos`, `formas` nem silhueta (catraca verde).
- [ ] Tamanho, pior caso (Complexity e Symmetry no máximo, 80 seeds, canvas 400): pattern 75,0 KB · mandala 33,0 · medallion 26,3 · symbol 6,0 — todos ≤ 120 KB. Em canvas 1200, o padrão vai de 362 a 561 KB (célula 0,8×) — registrado no IDEAS.
- [ ] `dist/` carrega: `grep -c "//__SCRIPT__"` = 0, sonda de UI 18/18; os 12 tipos de Art Deco + Geométrico e os 12 de Barroco + Vitoriano renderizam no `dist` real sem erro de JS (sondas descartáveis: 36 + 36 renders, 0 erros).
- [ ] Roteiro visual do dono: na miniatura, os 4 tipos mudam de FORMATO a cada New seed.

## Decisões de design
- **Régua por geometria, não por raster:** sem dependência nova e rápida (53 tipos × 40 seeds em ~1,7 s). Não vê espessura de traço nem preenchimento — dito na saída do instrumento.
- **Meta da silhueta = 25%** (`SIL` no `seeds.mjs`): o limiar que separa, na tabela medida, os tipos em que o dono via variedade (Botânico, festão, acanto) dos que ele achava parados.
- **Contorno como função r(a)** (`contourRadius` + `contourPath` em `core/utils.js`): anéis, pontas e nós passam a seguir r(a), e o mesmo mecanismo serve aos lotes seguintes.
- **`vary` continua protegendo quem reusa a mandala:** Celta, Orgânico, fallback e Text→Form não mudam.

## Fora de escopo
Os outros 19 tipos dos lotes 2 e 3 (voltam em lotes, com a receita, se o piloto convencer); os 24 tipos parados (lotes 4–7, agora com esqueleto desde o início); modificadores universais (depois, e fora do seed); a sonda rasterizada (fica fora do repo).

## Passos
1. Conferir os arquivos do chat (sha1). O «antes» foi medido pelo chat no HEAD.
2. Edições em `utils.js` e `generic.js`; versão 0.9.0.
3. `regress` → só as 24 chaves → `--update`. `seeds --update` → `silhueta>=25%: 10/53`. Build, marcador, sonda.
4. Registro (DEC-020, 0.9.0, análise «Decidida») e roteiro do dono.
