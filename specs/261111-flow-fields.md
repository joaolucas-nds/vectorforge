# SPEC — Flow Fields (tipo `flow` no estilo Organic)

> Spec de feature (o QUÊ e quando está pronto). O COMO está em `meta/workorders/261111-wo0001-flow-fields.md`.
> Escrita em 2026-11-11 a partir de um protótipo medido fora do repositório (sandbox do chat, Node 22): código, tamanhos e tempos abaixo saíram dele, não de estimativa.

## Problema
F3 (ROADMAP) só fecha com «Flow Fields como tipo novo». Hoje o Simplex Noise (`snoise`) só perturba geradores que já existem (Leaf, Wave, Phyllotaxis); falta um gerador cujo princípio organizador SEJA o campo de ruído — linhas de corrente com aspecto de fluxo/cabelo/marmorizado, uma categoria visual que nenhum dos 52 tipos atuais produz.

## Critérios de aceite (verificáveis)
- [ ] O estilo **Organic** ganha um 8º tipo, `flow`, depois de `phyllotaxis` nos chips de tipo.
- [ ] Sonda de regressão (`../261111-sonda-flow.mjs`): as **312 chaves antigas** (52 combinações × 2 tamanhos × 3 jogos de parâmetros) saem com hash **idêntico** ao de antes; entram **6 chaves novas** (`organic/flow/*`); **0** chaves não-determinísticas.
- [ ] Cada chave `organic/flow/*` sai com **1** `<path>` e **≤ 80.000 bytes** de conteúdo (protótipo: 8.755–45.432).
- [ ] Mesmo seed + mesmos parâmetros = SVG idêntico; seeds 42, 7 e 999 dão SVGs diferentes entre si.
- [ ] `npm run build` termina sem erro e `dist/vectorforge.html` contém o tipo novo (`"phyllotaxis","flow"` no bundle).
- [ ] Olho humano (roteiro do dono): o canvas mostra linhas curvas contínuas dentro de um disco, sem nós/quinas; Symmetry alto dá simetria rotacional visível; as 4 miniaturas de variação mostram o mesmo tipo em escala; export SVG abre fora do app.

## Decisões de design
- **Só no Organic, um tipo só.** O ROADMAP dizia «Organic/Minimal»; Organic é onde o `snoise` já mora e é a menor mudança que fecha o critério. Variante Minimal fica fora (ver abaixo).
- **Domínio = disco de raio `sz` centrado em `(cx, cy)`.** Consistente com os geradores centrados (medallion, mandala, phyllotaxis) e funciona na miniatura de variação, que chama o gerador com `cx/cy/sz` próprios. **Não usa `state.w`/`state.h`** (o `genWave` usa, e por isso sai desenquadrado nas miniaturas).
- **Mapeamento dos sliders** (mesmo papel que no resto do projeto): **Complexity** → densidade: 30–120 partículas no total e 40–120 passos por partícula. **Symmetry** → simetria rotacional: `folds = 1 + round(sym × 7)`, de 1 (campo livre) a 8 cópias; as partículas são divididas entre as cópias, então a densidade total não explode com a simetria.
- **Campo:** `θ = snoise(x/sz × 0.9, y/sz × 0.9) × π`, passo `sz × 0.015`. **Medido no protótipo:** a primeira versão (`× 2π`, frequência 1,6) dava novelo com nós e quinas; `× π` em frequência 0,9 dá linhas de corrente que convergem como pena/cabelo. A partícula morre ao sair do disco; traço com menos de 3 pontos é descartado.
- **Saída enxuta e «achatada»:** todas as linhas num único `<path>` (subpaths via `M`), cópias rotacionais giradas ponto a ponto — **sem `<g transform>` e sem `<use>`**. `<use>` exigiria `id`, e o mesmo SVG aparece no canvas e nas 4 miniaturas ao mesmo tempo: ids colidiriam. Emite 1 de cada 2 pontos (passo curto o bastante para a curva não facetar). Um ponto de origem em `FG` a cada 4 partículas dá o acento de cor da paleta.
- **Reprodutibilidade:** usa só `rnd` (origens) e `snoise` (campo), ambos semeados por `generateContent()` — sem `Math.random`.

## Fora de escopo
- Variante em Minimal ou em outro estilo; controle de frequência/ângulo exposto na UI.
- Animação, export especial, pixel art (o pipeline de pixel art não passa por `generateContent`).
- Promover a sonda a instrumento versionado em `scripts/` — vira candidato no IDEAS (gatilho de promoção já batido: é a terceira comparação antes/depois do projeto), decisão do dono.
- Marching Squares / isocurvas (F4).

## Passos
1. Rodar a sonda no estado atual (linha de base).
2. Acrescentar `genFlowField` ao fim de `src/generators/organic.js`; registrar `flow` em `TYPES_BY_STYLE` e no dispatcher de `generate.js`.
3. `npm run build`; rodar a sonda em modo `--compare` e conferir os números acima.
4. Registro: versão 0.4.0, CHANGELOG, DEC-013, STATUS, ROADMAP (F3 concluída), IDEAS, CONTEXT, GLOSSARY.
5. Roteiro visual do dono.
