# SPEC — F5, lote 2: seed vivo no Art Deco e no Geométrico (12 tipos)

> Segundo lote da F5 — Variedade procedural (DEC-016, DEC-017). O COMO está em `meta/workorders/261116-wo0007-seed-vivo-artdeco-geometrico.md`.
> Escrita em 2026-11-16 a partir de um protótipo construído e medido fora do repositório (VM do chat, commit `1e644bf`): regress, seeds, pior caso de tamanho, build, sonda de UI e prova visual de 8 seeds por tipo (`../261116-lote2-artdeco-8-seeds.png`, `../261116-lote2-geometrico-8-seeds.png`, `../261116-lote2-geometrico-star-v2.png`).

## Problema
Art Deco e Geométrico são os estilos mais usados e os 12 tipos deles ignoravam o seed por completo: `npm run seeds` marcava **1 distinto / 1 forma** em todos. Surprise, New seed e «Like this» só mexiam no que os sliders mexem — o mesmo medalhão, a mesma moldura, a mesma estrela.

## Critérios de aceite (verificáveis)
- [ ] Os 12 tipos passam a ter **formas>1** em `npm run seeds`. Medido no protótipo (distintos / formas em 40 seeds): artdeco corner 22/15, divider 17/17, frame 22/22, medallion 33/31, ornament 23/23, pattern 8/4; geometric divider 15/12, frame 22/22, mandala 40/40, star 23/10, symbol 37/35, tessellation 18/7.
- [ ] Placar: **formas>1 6/53 → 18/53 · distintos>1 9/53 → 21/53**.
- [ ] `npm run regress` muda **exatamente as 72 chaves** `artdeco/*` e `geometric/*` (12 tipos × 6) e **nenhuma** de outro estilo — inclusive Celta, Islâmico e Orgânico, que reusam `genADFrame`, `genMandala` e `genPattern`.
- [ ] O seed escolhe **estrutura**, não só número: variante de motivo, arranjo e acabamento por tipo (lista na DEC-018). O desenho original de cada tipo continua sendo uma das variantes.
- [ ] Complexity continua sendo densidade (raios, anéis, degraus, células) e Symmetry continua sendo eixos/lados/pontas.
- [ ] Tamanho no pior caso (Complexity e Symmetry no máximo, 80 seeds, canvas 400): todos ≤ 120 KB — maior é `artdeco/pattern` com 49,6 KB, igual ao original. Canvas 1200: os padrões crescem com a área como antes (art deco 362 KB = original; tesselação 395 KB, antes 373 KB).
- [ ] `dist/` carrega: `grep -c "//__SCRIPT__"` = 0, sonda de UI 18/18, e os 12 tipos renderizam no `dist` real sem erro de JS (sonda descartável do protótipo: 36 renders, 0 erros).
- [ ] Roteiro visual do dono: cada tipo muda de cara a cada New seed.

## Decisões de design
- **Gerador compartilhado só varia quando o estilo dono pede.** `genADFrame` e `genMandala` ganham `vary = false` no fim da assinatura; só `artdeco/frame` e `geometric/mandala` passam `true`. Em `genDivider`/`genPattern`, só os ramos `artdeco` e `geo` sorteiam; `girih`, `islamic` e os outros ramos não consomem o seed. É o que mantém o regress limpo fora do lote.
- **Três primitivas novas em `core/utils.js`:** `pickOne` (escolha semeada), `steppedDiamondPath` (zigurate) e `polygramPath` ({n/k}). O Botânico mantém o `pickOne` local dele (unificar fica no IDEAS).
- **{n/k} não usa giro progressivo entre camadas:** no contact sheet virou emaranhado; ele usa meio passo.
- **Raios do leque do padrão Art Deco num `path` só por célula:** com um `<line>` por raio, o pior caso dobrava (108 KB); num path, volta ao tamanho do original.

## Fora de escopo
Os outros 35 tipos (Barroco, Vitoriano, Celta, Islâmico, Minimal, Orgânico: um lote por estilo); modificadores universais; qualquer mudança de UI.

## Passos
1. Conferir os arquivos do chat (sha1) e rodar regress (0 mudanças) e seeds (6/53) antes de editar.
2. Aplicar as edições em `utils.js`, `generic.js` e `generate.js`; versão 0.7.0.
3. `regress` → só as 72 chaves do lote mudam → `--update`. `seeds --update` → 18/53. Build, marcador, sonda.
4. Registro (DEC-018, 0.7.0) e roteiro do dono.
