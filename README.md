# VectorForge

Gerador procedural de arte vetorial no navegador: ornamentos, molduras, divisores, padrões e símbolos em SVG, prontos para usar no Figma, Canva, Inkscape, Illustrator ou Affinity. Um único arquivo HTML, sem instalação, sem conta e sem dependências em tempo de execução.

**Abrir:** <https://joaolucas-nds.github.io/vectorforge/> — ou baixe [`dist/vectorforge.html`](dist/vectorforge.html) e abra direto no navegador (funciona offline, por `file://`).

## O que ele faz

- **9 estilos, 53 tipos de saída** (tabela abaixo), cada um gerado por algoritmo — nada de imagem pronta.
- **Sliders de parâmetro:** Complexity (densidade), Symmetry (eixos/cópias), espessura do traço, opacidade do preenchimento e Seed (1–999).
- **Reprodutível:** mesmo seed + mesmos parâmetros = o mesmo SVG, byte a byte.
- **8 paletas** coordenadas (traço, acento, fundo) e canvas de 50 a 3000 px com proporções prontas (1:1, 4:3, 16:9, 3:4, A4).
- **4 variações automáticas** a partir do seed atual — clique numa para adotá-la.
- **Text → Form:** transforma um texto curto num glifo decorado, com 5 famílias tipográficas.
- **Modo Draw:** esboce com o mouse e o app gera um ornamento na área desenhada.
- **Modo Pixel Art:** a mesma lógica de simetria, em pixels.
- **Export:** SVG, PNG @2x e cópia do código SVG.

| Estilo | Tipos |
|---|---|
| Art Deco | medallion, frame, divider, corner, pattern, ornament |
| Baroque | medallion, frame, divider, cartouche, swag, acanthus |
| Geometric | mandala, frame, divider, tessellation, star, symbol |
| Victorian | medallion, frame, divider, flourish, wreath, cartouche |
| Celtic | knot, border, medallion, cross, knotwork, spiral |
| Islamic | star, girih, arabesque, border, medallion, pattern |
| Minimal | symbol, line, grid, circle, mark, glyph |
| Organic | leaf, spiral, branch, flower, mandala, wave, phyllotaxis, flow |
| Botanical | tree, koch, dragon |

Por baixo: PRNG com seed, Simplex Noise 2D (Leaf, Wave, Phyllotaxis, Flow Fields), ângulo áureo (Phyllotaxis) e um motor L-System com turtle graphics (Botanical).

## Desenvolvimento

O código-fonte fica em `src/` (módulos ES); o arquivo distribuído, `dist/vectorforge.html`, é gerado a partir dele e **é versionado de propósito** — é o que o GitHub Pages serve.

Requer Node.js (18 ou mais recente).

```
npm ci              # instala o esbuild (única dependência, só de desenvolvimento)
npm run build       # gera dist/vectorforge.html a partir de src/
npm run watch       # rebuild automático a cada mudança em src/
npm run regress     # confere que nenhum gerador mudou de saída sem querer
```

`npm run regress` renderiza todas as combinações estilo × tipo pelo código atual e compara com a linha de base em `scripts/regress-baseline.json`: sai com erro se alguma saída antiga mudou. Quando a mudança é **intencional** (um gerador foi ajustado ou um tipo novo entrou), regrave a linha de base com `npm run regress -- --update` e versione o arquivo junto. O instrumento não olha a aparência — depois de mexer num gerador, abra o app e confira com os próprios olhos.

Depois de editar `src/`, rode `npm run build` e inclua `dist/vectorforge.html` no mesmo commit.

## Estrutura

```
src/
  core/          estado, UI, visualização, dispatcher dos geradores, export
  generators/    um arquivo por estilo (+ generic.js para os geradores compartilhados)
  main.js        ponto de entrada do bundle
  index.html     template; não abre sozinho
scripts/
  build.js       esbuild + inlining de CSS/JS no template -> dist/
  regress.mjs    instrumento de regressão dos geradores
dist/
  vectorforge.html   o app (gerado)
meta/            documentação de contexto do projeto (decisões, estado, roadmap)
```

As decisões de arquitetura e o porquê de cada uma estão em [`meta/DECISIONS.md`](meta/DECISIONS.md); o plano de evolução, em [`meta/ROADMAP.md`](meta/ROADMAP.md).
