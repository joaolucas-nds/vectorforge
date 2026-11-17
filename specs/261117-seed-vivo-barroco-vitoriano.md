# SPEC — F5, lote 3: seed vivo no Barroco e no Vitoriano (11 tipos)

> Terceiro lote da F5 — Variedade procedural (DEC-016, DEC-017, DEC-018). O COMO está em `meta/workorders/261117-wo0009-seed-vivo-barroco-vitoriano.md`.
> Escrita em 2026-11-17 a partir de um protótipo construído e medido fora do repositório (VM do chat, commit `e2629f1`): regress, seeds, pior caso de tamanho, build, sondas de UI e prova visual de 8 seeds por tipo (`../261117-lote3-barroco-8-seeds.png`, `../261117-lote3-vitoriano-8-seeds.png`, `../261117-lote3-acanto-v2.png`).

## Problema
Os 6 tipos do Barroco e 5 dos 6 do Vitoriano ignoravam o seed (`npm run seeds`: 1/1); a coroa (`victorian/wreath`) já variava (40/40) e fica como está. Medido também: `victorian/flourish` e `victorian/cartouche` chamavam `genBQAcanthus` e `genBQCartouche` com os mesmos parâmetros dos tipos barrocos — **iguais byte a byte em 40 de 40 seeds**. Dois dos 53 tipos eram cópias de outros dois.

## Critérios de aceite (verificáveis)
- [ ] Os 11 tipos passam a ter **formas>1**. Medido no protótipo (distintos / formas em 40 seeds): baroque acanthus 30/30, cartouche 22/22, divider 17/17, frame 22/22, medallion 35/31, swag 22/22; victorian cartouche 22/22, divider 9/9, flourish 30/29, frame 22/22, medallion 22/22. `victorian/wreath` segue 40/40.
- [ ] Placar: **formas>1 18/53 → 29/53 · distintos>1 21/53 → 32/53**.
- [ ] `npm run regress` muda **exatamente as 66 chaves** desses 11 tipos (11 × 6) e nenhuma outra — `victorian/wreath` incluído entre as que NÃO mudam.
- [ ] Vitoriano deixa de copiar o Barroco: com o mesmo seed, `victorian/flourish` ≠ `baroque/acanthus` e `victorian/cartouche` ≠ `baroque/cartouche` em **40 de 40 seeds** (antes: iguais em 40 de 40).
- [ ] O desenho original de cada tipo continua sendo uma das variantes do Barroco; Complexity continua sendo densidade e Symmetry, as peças da bordadura do medalhão vitoriano.
- [ ] Tamanho no pior caso (Complexity e Symmetry no máximo, 80 seeds): maior é `baroque/frame` em canvas 1200, 34,1 KB; em 400, `victorian/medallion` 19,0 KB.
- [ ] `dist/` carrega: `grep -c "//__SCRIPT__"` = 0, sonda de UI 18/18, e os 12 tipos dos dois estilos renderizam no `dist` real sem erro de JS (sonda descartável do protótipo: 36 renders, 0 erros).
- [ ] Roteiro visual do dono.

## Decisões de design
- **`genBQCartouche` e `genBQAcanthus` ganham `style` (padrão `'baroque'`)** e o dispatcher passa `'victorian'` para flourish e cartouche: cada estilo sorteia de um repertório próprio (Barroco: volutas, acanto lobado, pena, conchas; Vitoriano: cachos em espiral, gavinhas, remates, laços, cartela chanfrada ou arqueada). Como os dois tipos estão no mesmo lote, não há vazamento para fora dele.
- **Duas primitivas novas em `core/utils.js`:** `spiralPath` (voluta, número fixo de pontos por volta) e `shellFanPaths` (concha em leque: contorno + nervuras num path só).
- **Folha de acanto mais larga** que no primeiro rascunho: no contact sheet ela sumia (vista fina demais); a versão final usa lóbulos ~2× mais fundos (`../261117-lote3-acanto-v2.png`).

## Fora de escopo
Os outros 24 tipos (Celta, Islâmico, Minimal, Orgânico: um lote por estilo); o tamanho relativo do acanto/flourish no canvas (IDEAS); qualquer mudança de UI.

## Passos
1. Conferir os arquivos do chat (sha1); o «antes» foi medido pelo chat no HEAD.
2. Aplicar as edições em `utils.js`, `generic.js` e `generate.js`; versão 0.8.0.
3. `regress` → só as 66 chaves do lote mudam → `--update`. `seeds --update` → 29/53. Build, marcador, sonda.
4. Registro (DEC-019, 0.8.0) e roteiro do dono.
