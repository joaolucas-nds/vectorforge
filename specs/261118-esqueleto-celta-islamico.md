# SPEC — F5, lote 4: Celta + Islâmico com esqueleto semeado (12 tipos)

> Primeiro lote depois do piloto (DEC-020). Escolha do dono em 2026-11-18: «Parados primeiro» — Celta e Islâmico, que não mudavam nada com o seed. O COMO está em `meta/workorders/261118-wo0012-esqueleto-celta-islamico.md`.
> Escrita a partir de um protótipo construído e medido fora do repositório (VM do chat, commit `630c2b3`): regress, seeds (com silhueta), pior caso de tamanho, build, três sondas de UI e prova visual de 8 seeds por tipo (`../261118-lote4-celta-8-seeds.png`, `../261118-lote4-islamico-8-seeds.png`, `../261118-lote4-girih-vs-pattern.png`).

## Problema
Os 12 tipos do Celta e do Islâmico marcavam 1 distinto / 1 forma / 0% de silhueta: o seed não mudava nada. E metade deles nem era do estilo: `celtic/border` e `islamic/border` usavam a moldura Art Deco; `celtic/medallion`, a mandala geométrica; `celtic/spiral`, a espiral do Orgânico; `celtic/knotwork` era o próprio `knot` em outra escala; `islamic/medallion`, a mesma estrela do `star`. `islamic/girih` e `islamic/pattern` saíam com a mesma silhueta em 40 de 40 seeds.

## Critérios de aceite (verificáveis)
- [ ] Os 12 tipos com **silhueta ≥ 25%** em `npm run seeds`. Medido no protótipo (distintos / formas / silhueta, 40 seeds): celtic border 34/34/43,3 · cross 22/4/38,0 · knot 22/5/34,4 · knotwork 33/22/30,8 · medallion 37/3/35,9 · spiral 34/10/34,6; islamic arabesque 22/9/54,8 · border 24/24/43,0 · girih 26/26/31,6 · medallion 30/6/27,1 · pattern 26/26/39,6 · star 23/16/32,3.
- [ ] Placar: **formas>1 29/53 → 41/53 · distintos>1 32/53 → 44/53 · silhueta>=25% 10/53 → 22/53**.
- [ ] Geradores próprios do estilo para os seis tipos que emprestavam: `genCelticBorder` (trança entre trilhos), `genCelticMedallion` (anel trançado + tríscele/triquetra/roseta), `genCelticKnotwork` (painel de tranças num campo), `genCelticSpiral` (1–4 espirais, tríscele), `genIslamicBorder` (estrelas de 8, losangos, merlões ou entrelaçado), `genIslamicMedallion` (shamsa com pingentes). `genCelticKnot`, `genCelticCross`, `genIslamicStar` e `genArabesque` mantêm o desenho original como uma das variantes.
- [ ] `girih` e `pattern` ganham motivos próprios (hexagrama, estrela de seis; khatam, octógono 4.8.8) e o campo/escala de célula do Art Deco; o `girih` sorteia de listas em outra ordem — com o mesmo seed, as silhuetas dos dois coincidem em **0 de 40** (antes 40 de 40).
- [ ] `npm run regress` muda **exatamente as 72 chaves** `celtic/*` e `islamic/*`; Art Deco (que usa `genADFrame` e `genPattern`), Orgânico (que usa `genMandala` e `genOrganicSpiral`) e todo o resto, idênticos.
- [ ] Nenhum tipo perde `distintos`, `formas` nem silhueta.
- [ ] Tamanho, pior caso (Complexity e Symmetry no máximo, 80 seeds, canvas 400): maior é `islamic/pattern` 81,6 KB, `islamic/girih` 73,9 KB — ≤ 120 KB. Em 1200, os dois padrões vão a ~600 KB (antes 316), como o Art Deco desde v0.9.0 (IDEAS).
- [ ] `dist/` carrega: `grep -c "//__SCRIPT__"` = 0, sonda de UI 18/18; os 12 tipos renderizam no `dist` real sem erro de JS (sonda descartável: 36 renders, 0 erros).
- [ ] Roteiro visual do dono.

## Decisões de design
- **Celta e Islâmico deixam de reusar geradores de outros estilos** — reuso dava identidade errada (moldura Art Deco no Celta) e, pela regra do `vary`, impedia variar sem mexer no dono. Os geradores emprestados seguem iguais para quem os usa.
- **Ordem diferente nas listas do `girih`**: os dois padrões islâmicos passam pela mesma `genPattern` com a mesma sequência de sorteios; trocar a ordem das opções faz o mesmo valor cair em escolhas diferentes, sem custo.
- **Fita (duas linhas paralelas)** como traço celta: nó, triquetra, corrente e trança. Sobreposição «por cima/por baixo» fica fora (exigiria recortar traço).

## Fora de escopo
Os 19 tipos dos lotes 2 e 3 (esqueleto depois); Minimal e Orgânico (lotes 5–6); entrelaçado com cruzamento por cima/por baixo; padrões girih de verdade (decágonos, pentágonos).

## Passos
1. Conferir os arquivos do chat (sha1).
2. Edições em `generic.js` e `generate.js`; versão 0.10.0.
3. `regress` → só as 72 chaves → `--update`. `seeds --update` → `silhueta>=25%: 22/53`. Build, marcador, sonda.
4. Registro (DEC-021, 0.10.0; roteiro do piloto 1–6 ok) e roteiro do dono.
