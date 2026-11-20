# SPEC — F5, lote 5a: Minimal com esqueleto semeado

> **Status:** Implementada na WO 0017 (v0.12.0) · **Data:** 2026-11-20
> **Origem:** escolha do dono depois da anti-repetição — «próxima frente: A (Minimal + Orgânico com esqueleto)» [relatado pelo dono, 2026-11-20]. O chat dividiu o lote A em duas WOs (5a Minimal, 5b Orgânico) pela natureza diferente dos dois estilos; o QUÊ não mudou.

## Problema
Os 6 tipos do Minimal saíam iguais para qualquer seed (distintos 1, formas 1, silhueta 0%, 1 cara). Com a anti-repetição (DEC-022), o R não tinha o que alternar nesses tipos.

## Critérios de aceite
- [x] Os 6 tipos com `silhueta%` ≥ 25 no `npm run seeds` (medido: circle 57,1 · glyph 77,8 · grid 64,1 · line 61,7 · mark 75,9 · symbol 73,2).
- [x] `npm run regress`: mudam só as 36 chaves `minimal/*`.
- [x] Identidade do Minimal: poucos traços de uma espessura, muito vazio, geometria exata, no máximo um acento cheio — conferido em folha de contato (`../261120-lote5-minimal-10-seeds.png`).
- [x] Pior caso (Complexity 0,95 · Symmetry 1, canvas 400) ≤ 120 KB: 41,4 KB (`grid`).
- [x] `symbol` e `mark` com repertórios próprios (o mesmo gerador servia aos dois; parâmetro `kind`, como o `style` do DEC-019).
- [x] `line` com gerador próprio (`genMinLine`); o `genDivider` não muda para os outros estilos.
- [x] `glyph` com texto no Text→Form desenha o texto como antes; sem texto, sinal assêmico desenhado com traços (a régua vê; o `<text>` ✦ não via).
- [ ] Roteiro visual do dono.

## Decisões
- **Esqueleto por tipo:** symbol — contorno × miolo × escala × posição; mark — 7 composições × giro × escala × deslocamento; line — comprimento × 1–3 linhas × espaçamento × alinhamento × acento; grid — campo × tipo de grade; circle — 6 arranjos × direção × escala; glyph — 1–3 «letras» de traços.
- **Sliders mantêm o papel:** Complexity = densidade/divisões, Symmetry = contagem radial do symbol.
- **Desenho de antes como variante** onde cabe (symbol: círculo + raios + ponto; circle: concêntricos).

## Fora de escopo
Orgânico (lote 5b); vocabulário do sinal assêmico além de 7 traços; Text→Form com texto.
