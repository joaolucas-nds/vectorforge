# GLOSSARY.md — Termos do Projeto

> **Opcional.** Use quando o projeto tem vocabulário próprio (nomes de módulos, conceitos, identificadores) que o assistente reexplicaria a cada sessão sem isto.
> Mantenha curto: só o que não é óbvio para alguém de fora.

---

## Conceitos do projeto

- **Estilo (style)** — categoria artística que determina o conjunto de algoritmos disponíveis (ex.: `'artdeco'`, `'baroque'`). Cada estilo tem seus próprios geradores e lista de tipos válidos em `TYPES_BY_STYLE`.
- **Tipo (type)** — subcategoria de saída dentro de um estilo (ex.: `'medallion'`, `'frame'`, `'divider'`). Determina qual função geradora é chamada.
- **Complexity (comp)** — parâmetro float 0–1 que controla densidade, número de elementos, camadas e detalhes nos geradores. Alto = mais denso.
- **Symmetry (sym)** — parâmetro float 0–1 que controla o número de eixos/pontos de simetria. Alto = mais pontos/faces no polígono ou pétala.
- **Seed** — inteiro 1–999 passado ao PRNG (`mkRand`) para tornar a geração determinística. Mesmo seed + mesmos parâmetros = SVG idêntico.
- **Variation** — uma das 4 miniaturas geradas automaticamente com seeds offset (+0, +111, +222, +333) do seed atual. Clicar aplica o seed da variation ao estado principal.
- **Palette (pal)** — índice 0–7 que seleciona um dos 8 objetos `PALETTES`, cada um com `stroke`, `fill`, `bg` e `fill2`.
- **SO / FG / FG2** — strings de atributos SVG geradas por `generateContent()` e passadas aos geradores: `SO` = stroke only (sem fill), `FG` = fill com a cor de acento, `FG2` = fill2 com opacidade aumentada.
- **Draw mode** — modo freehand onde o usuário esboça com o mouse; ao soltar, `convertDrawToOrnament()` calcula o bounding box do traço e gera um ornamento centrado nessa área.
- **Text → Form** — feature que usa o conteúdo da textarea como base para um glyph SVG decorado com anéis radiais e linhas radiais (tipo `'glyph'` no estilo Minimal, ou tipos `'symbol'`/`'mark'` com texto).
- **Pixel Art mode** — modo alternativo ao SVG: usa Canvas 2D API para gerar arte pixel-by-pixel com simetria radial. Não exporta via `xSVG()`/`xPNG()` da mesma forma (bug conhecido).

## Arquiteturas / módulos

- **`generateContent(style, type, cx, cy, sz, ...)`** — função central de despacho: consulta `generators[style][type]` e chama o gerador correto.
- **`generators`** — objeto de dois níveis `{style: {type: () => string}}` que mapeia cada combinação para sua função geradora.
- **`TYPES_BY_STYLE`** — objeto `{style: string[]}` que lista os tipos válidos por estilo; usado por `buildTypeChips()` para construir a UI.
- **`PALETTES`** — array de 8 objetos de paleta; índice `state.pal` seleciona o ativo.
- **`mkRand(seed)`** — factory de PRNG seeded; retorna closure `() => float [0,1)`.
- **`doGen()`** — orquestra leitura de controles, chamada a `generateContent()`, montagem do SVG e atualização do DOM.
- **`state`** — objeto global único com todo o estado da aplicação (estilo, tipo, parâmetros, modo, zoom, vars, etc.).

## Comandos / artefatos

- **`vectorforge.html`** — o aplicativo completo; único arquivo distribuível.
- **ASU** — Atualizador Automático de Scripts; ferramenta usada para aplicar patches cirúrgicos ao `vectorforge.html` via instruções YAML. Ver `INSTRUCTION_GUIDE.md` e `PROMPT_IA.md`.
- **`instrucao.yaml`** — arquivo de instrução ASU gerado pelo assistente para aplicar mudanças no código.

## Identificadores

- **`#main-svg`** — o elemento `<svg>` principal do canvas; referência invalidada após cada `doGen()` (armadilha DEC-004).
- **`#px-canvas`** — o `<canvas>` do modo Pixel Art; visível apenas quando `state.mode === 'pixel'`.
- **`#svg-holder`** — container `<div>` que envolve tanto `#main-svg` quanto `#px-canvas`; usado para posicionamento e sombra.
- **`SO` / `FG` / `FG2`** — variáveis locais em `generateContent()` com strings de atributos SVG reutilizadas pelos geradores.
- **DEC-00N** — prefixo de entrada no DECISIONS.md para decisão de arquitetura.
- **FIX-00N** — prefixo de entrada no DECISIONS.md para bug grave resolvido.
