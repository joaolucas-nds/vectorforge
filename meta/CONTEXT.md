# CONTEXT.md — VectorForge

> Arquivo **estável**. O assistente lê no início de cada sessão para se ambientar.
> Muda pouco: só em alteração estrutural (stack, arquitetura, escopo, nova armadilha descoberta).
> Mantenha enxuto — descreve o que o projeto É, não o que está acontecendo agora (isso é o STATUS).

---

## Mudanças nesta revisão (2026-07-07)

F3 abriu pelo build step (esbuild) — ver DEC-010 para o ADR completo. Esta revisão do CONTEXT.md reflete:
- **Estrutura do Projeto** reescrita: `vectorforge.html` deixou de ser o único artefato editável. Agora há `src/` (16 módulos ES) + `scripts/build.js` + `dist/vectorforge.html` (gerado, mas versionado). O `vectorforge.html` na raiz **não existe mais** — foi substituído por essa árvore.
- **Stack Tecnológica**: Node.js + esbuild entram como dependência de **desenvolvimento** (build time). O *runtime* do app entregue ao usuário final continua zero-dependência — isso não é uma reversão do DEC-001, é uma camada nova por cima dele.
- **Nova Armadilha 8**: funções chamadas via `onclick=""` inline no HTML precisam ser expostas explicitamente em `window` a partir de `main.js`.
- **Inventário de Geradores**: cada linha agora também aponta o arquivo `.js` onde a função mora.

---

## Visão Geral

VectorForge é um gerador procedural de arte vetorial que roda inteiramente no browser, sem servidor e sem instalação (para o usuário final). O usuário escolhe um estilo artístico, um tipo de saída e ajusta parâmetros matemáticos; a ferramenta gera SVG limpo exportável diretamente para Figma, Inkscape, CorelDraw, Affinity Designer e Canva. Resolve a escassez de ornamentos, frames, divisores e símbolos procedurais de alta qualidade disponíveis livremente e customizáveis, que profissionais de design precisam com frequência.

---

## Stack Tecnológica

- **Runtime (o que o usuário final abre):** JavaScript (ES2020, bundlado num único IIFE) + HTML5 + CSS3, tudo inline em `dist/vectorforge.html`. Zero dependências de runtime — igual a sempre.
- **Desenvolvimento (só para quem edita o código-fonte):** Node.js + esbuild (`^0.24`) como devDependency, via `npm run build` / `npm run watch`. Ver DEC-010.
- **Fontes:** Google Fonts (DM Mono + Fraunces) via `@import` — única dependência externa do runtime, removível.
- **Persistência:** nenhuma — tudo em memória/estado JS local.
- **Deploy:** `dist/vectorforge.html`, abrível diretamente no browser (`file://`) ou via qualquer servidor estático. **Não** é o `src/index.html` — esse é só o template com placeholders, não abrível sozinho.
- **Build / tooling:** esbuild bundla `src/main.js` (formato IIFE) → um script Node (`scripts/build.js`) injeta esse JS + o CSS de `src/styles/main.css` no template `src/index.html` → `dist/vectorforge.html`. ASU continua sendo o mecanismo de patch cirúrgico, agora mirando arquivos de `src/` em vez de um monólito.

---

## Estrutura do Projeto

```
vectorforge/
├── src/
│   ├── index.html              # Template HTML: placeholders /*__STYLES__*/ e //__SCRIPT__
│   ├── styles/
│   │   └── main.css            # CSS extraído do vectorforge.html original, sem mudanças
│   ├── core/
│   │   ├── utils.js            # TAU, f, mkRand, snoise/snoiseSetSeed, pt/polyPath/starPath/curvePath
│   │   ├── state.js            # state (mutável), STYLES, TYPES_BY_STYLE, PALETTES, FONTS
│   │   ├── ui.js                # buildStyleGrid/buildTypeChips/buildPalettes/buildFontChips/buildVariations
│   │   │                        #   + selectStyle/selectType/selectPal/selectFont/setRatio/setMode + sliders
│   │   ├── view.js              # zoom/fitToView/applyZoom/toggleBg/toggleGrid/updateGrid + modo Draw
│   │   ├── generate.js          # generateContent() (dispatcher central) + doGen/doGenRandom/
│   │   │                        #   generateVariations/applyVar/updateInfo/setStatus
│   │   └── export.js            # getSVGString/xSVG/xPNG/copySVG
│   ├── generators/
│   │   ├── artdeco.js · baroque.js · geometric.js · victorian.js
│   │   ├── celtic.js · islamic.js · minimal.js · organic.js
│   │   └── generic.js           # genDivider, genPattern, genPixelArt, genTextShape
│   └── main.js                  # Entry point: importa tudo, expõe funções em window, roda o init
├── scripts/
│   └── build.js                 # esbuild (bundle IIFE) + inlining de CSS/JS no template → dist/
├── package.json                 # devDependency: esbuild. Scripts: build, watch
├── .gitignore                   # node_modules/ ignorado; dist/vectorforge.html NÃO (ver DEC-010)
├── dist/
│   └── vectorforge.html         # O ARQUIVO QUE O USUÁRIO ABRE. Gerado por `npm run build`, mas versionado.
├── meta/                        # Kit de Contexto (este conjunto de arquivos .md)
│   ├── CEREBRO.md
│   ├── CONTEXT.md
│   ├── STATUS.md
│   ├── DECISIONS.md
│   ├── CHANGELOG.md
│   ├── IDEAS.md
│   ├── ROADMAP.md
│   ├── GLOSSARY.md
│   ├── HISTORICO.md
│   ├── LOG-TEMPLATE.md
│   ├── INSTRUCOES-PROJETO.md
│   ├── INSTRUCTION_GUIDE.md
│   ├── PROMPT_IA.md
│   └── demo.yaml
├── logs/                        # Logs de sessão — pasta irmã de meta/, não aninhada (convenção já em uso)
│   ├── 2026-06-23.md
│   ├── 2026-06-30.md
│   ├── 2026-07-03.md
│   └── 2026-07-07.md
└── README.md
```

**Fluxo de trabalho a partir de agora:** editar arquivos em `src/` (nunca `dist/vectorforge.html` diretamente — seria sobrescrito no próximo build), rodar `npm run build` (ou deixar `npm run watch` rodando), testar `dist/vectorforge.html` no browser. ASU mira os arquivos de `src/` individualmente (cada um é pequeno o bastante para patch cirúrgico ou até reescrita completa sem custo alto).

---

## Como o pipeline de geração funciona (CRÍTICO)

O fluxo central é: **parâmetros → `generateContent()` → SVG string → `outerHTML` replacement → DOM**. Isso não mudou com a modularização — só onde o código mora.

```
doGen()                                    [src/core/generate.js]
  ├── lê controles do DOM (comp, sym, sw, fill, seed, w, h, pal)
  ├── chama generateContent(style, type, cx, cy, sz, ...)
  │     └── despacha para o gerador correto via tabela `generators[style][type]`
  │           └── gerador retorna string com elementos SVG (paths, circles, lines...)  [src/generators/*.js]
  ├── monta svgMarkup (string completa com <rect bg> + content)
  ├── faz outerHTML replacement no #main-svg
  └── setTimeout(20ms) → re-query do DOM → fitToView() + generateVariations()
```

**Por que `outerHTML` replacement e não `innerHTML`:** o `#main-svg` em si precisa trocar de `viewBox` e dimensões quando o canvas muda de tamanho. Trocar só o conteúdo interno não funcionaria para mudanças de proporção.

**Por que `setTimeout` após replacement:** o `outerHTML` remove o elemento do DOM e insere um novo; referências antigas ficam inválidas. O timeout garante que o browser termine o parse antes de re-querying com `document.querySelector('#svg-holder svg')`.

**PRNG seeded (`mkRand`):** usa xorshift multiplicativo. Seed idêntico + parâmetros idênticos = resultado idêntico sempre. Isso é central para as Variations (seeds seed, seed+111, seed+222, seed+333).

**Simplex Noise (`snoise`, desde v0.2.0):** ruído gradiente com coerência espacial — ao contrário do `mkRand()` (ruído branco), pontos vizinhos no espaço produzem valores parecidos, permitindo transições suaves (curvatura orgânica, densidade crescente, perturbação de ondas). `snoiseSetSeed(seed)` reembaralha a tabela de permutação deterministicamente e é chamada automaticamente no início de `generateContent()` — todo gerador SVG tem noise reproducível sem esforço extra. Ver DEC-006.

**Gerador de pixel art:** usa Canvas 2D API num `<canvas id="px-canvas">` oculto em modo vector. Não compartilha estado com o SVG — é um pipeline paralelo ativado por `setMode('pixel')`. **Importante:** por não passar por `generateContent()`, este pipeline não chama `snoiseSetSeed()` — se um gerador de pixel art baseado em noise for adicionado no futuro, a chamada precisa ser feita explicitamente (ver Armadilha 7).

---

## Arquitetura — pontos-chave

- **Runtime final é um arquivo único autocontido** (`dist/vectorforge.html`) — sem build no lado do usuário, máxima portabilidade. O *código-fonte* agora é modular; o *artefato distribuído* não mudou. Ver DEC-001 + DEC-010.
- **Geradores são funções puras** — recebem parâmetros, retornam string SVG; não tocam o DOM. Ver DEC-002.
- **Seed para reproducibilidade** — `mkRand(seed)` retorna closure PRNG; seed igual = arte igual. Ver DEC-003.
- **`outerHTML` replacement para atualizar o canvas** — necessário para trocar `viewBox`; requer re-query pós-replace. Ver DEC-004.
- **Modo draw (freehand) acumula `<g>` no SVG existente** — não regera; é aditivo por design. Ver DEC-005.
- **ASU cobre código + anexos isolados em DECISIONS.md/CONTEXT.md** (DEC-009); docs rolantes (STATUS/CHANGELOG/IDEAS/GLOSSARY/ROADMAP/HISTORICO) são sempre arquivo completo. Ver DEC-007/008/009.
- **Bundle IIFE + `window` explícito para handlers `onclick=""`** — o bundler não vaza funções para o escopo global como um `<script>` clássico fazia; `main.js` expõe a lista fixa de funções que o HTML referencia inline. Ver DEC-010 e Armadilha 8.

---

## Inventário de Geradores (referência rápida — evita abrir os módulos para orientação)

Todo gerador segue a assinatura `gen*(cx, cy, sz, comp, sym, rnd, SO, FG, [FG2], sw)` e retorna string SVG. `SO`/`FG`/`FG2` são strings de atributos (ver GLOSSARY.md). Despacho central em `generateContent()` (`src/core/generate.js`) → `generators[style][type]`.

| Estilo | Arquivo | Tipos (`TYPES_BY_STYLE`) | Funções geradoras |
|---|---|---|---|
| **artdeco** | `src/generators/artdeco.js` | medallion, frame, divider, corner, pattern, ornament | `genADMedallion`, `genADFrame`, `genDivider('artdeco')`†, `genADCorner`, `genPattern('artdeco')`†, `genADOrn` |
| **baroque** | `src/generators/baroque.js` | medallion, frame, divider, cartouche, swag, acanthus | `genBQMedallion`, `genBQFrame`, `genDivider('baroque')`†, `genBQCartouche`, `genBQSwag`, `genBQAcanthus` |
| **geometric** | `src/generators/geometric.js` | mandala, frame, divider, tessellation, star, symbol | `genMandala`, `genGeoFrame`, `genDivider('geo')`†, `genPattern('geo')`†, `genGeoStar`, `genGeoSymbol` |
| **victorian** | `src/generators/victorian.js` | medallion, frame, divider, flourish, wreath, cartouche | `genVicMedallion`, `genVicFrame`, `genDivider('victorian')`†, `genBQAcanthus`‡ (reuso), `genVicWreath`, `genBQCartouche`‡ (reuso) |
| **celtic** | `src/generators/celtic.js` | knot, border, medallion, cross, knotwork, spiral | `genCelticKnot`, `genADFrame`‡ (reuso, n=6), `genMandala`‡ (reuso, n=6), `genCelticCross`, `genCelticKnot` (reuso, sz×1.2/n=8), `genOrganicSpiral`‡ (reuso) |
| **islamic** | `src/generators/islamic.js` | star, girih, arabesque, border, medallion, pattern | `genIslamicStar`, `genPattern('girih')`†, `genArabesque`, `genADFrame`‡ (reuso, n=8), `genIslamicStar` (reuso, n=12), `genPattern('islamic')`† |
| **minimal** | `src/generators/minimal.js` | symbol, line, grid, circle, mark, glyph | `genMinimalSymbol`, `genDivider('min', comp×0.3)`†, `genMinGrid`, `genMinCircles`, `genMinimalSymbol` (reuso menor), `genGlyph` |
| **organic** | `src/generators/organic.js` | leaf, spiral, branch, flower, mandala, wave, phyllotaxis | `genOrganicLeaf` (usa `snoise`), `genOrganicSpiral`, `genOrganicBranch`, `genOrganicFlower`, `genMandala`‡ (reuso, n=8), `genWave` (usa `snoise`), `genPhyllotaxis` (usa `snoise`) |

† = gerador genérico, vive em `src/generators/generic.js`, despachado por parâmetro `style`.
‡ = reuso de gerador definido em OUTRO arquivo de estilo — a chamada cruzada é feita pelo dispatcher em `generate.js`, não dentro do próprio arquivo do estilo. Isto é intencional: `generate.js` é o único módulo que importa de todos os `generators/*.js` ao mesmo tempo; cada arquivo de estilo importa só de `core/utils.js` e `core/state.js` (nunca de outro `generators/*.js`).

**Padrão de reuso:** vários estilos reaproveitam geradores de outros (Celtic/Islamic reusam `genADFrame`/`genMandala` com parâmetros diferentes; Victorian reusa `genBQAcanthus`/`genBQCartouche`). Isso é intencional — reduz duplicação — mas significa que uma mudança em `genADFrame`, por exemplo, afeta visualmente Art Deco **e** Celtic **e** Islamic ao mesmo tempo. Conferir todos os estilos que reusam antes de alterar um gerador compartilhado. Como o reuso é sempre wireado em `generate.js` (nunca dentro do arquivo do estilo em si), basta grepar `generate.js` por `genXxx` para ver todos os pontos de reuso de um gerador.

**Geradores genéricos** (não amarrados a um estilo, despachados por parâmetro `style`, em `src/generators/generic.js`): `genDivider(x, cy, w, comp, sym, rnd, SO, FG, sw, style)`, `genPattern(x, y, w, h, comp, sym, rnd, SO, FG, sw, style)`.

**Só no modo Pixel Art** (pipeline paralelo, não usa `generateContent()`): `genPixelArt()` — `src/generators/generic.js`.

**Só na feature Text→Form**: `genTextShape()` (chamado por `doGen()` quando `type` é `glyph`/`symbol`/`mark` e há texto na textarea; fallback para `genMandala` quando o texto está vazio) e `genGlyph()` (gerador nativo do tipo `glyph` no estilo Minimal) — ambos em `src/generators/generic.js` e `src/generators/minimal.js` respectivamente.

---

## Armadilhas Conhecidas (o que NÃO fazer)

1. **Acessar `#main-svg` por referência cacheada após `doGen()`** — o `outerHTML` replacement invalida a referência; o elemento no DOM é um *novo* nó. → Sempre re-query com `document.querySelector('#svg-holder svg')` ou `document.getElementById('main-svg')` após qualquer geração.

2. **Chamar `fitToView()` antes do browser terminar o replace** — as dimensões retornadas por `getBoundingClientRect()` ainda são do SVG antigo. → Nunca chamar `fitToView()` fora do `setTimeout` pós-replace.

3. **Exportar PNG no modo Pixel Art** — `xPNG()` lê `#main-svg` (SVG); no modo pixel o canvas visível é o `#px-canvas` (Canvas 2D). Corrigido em FIX-002 com despacho explícito por `state.mode` dentro de `xPNG()` (`src/core/export.js`).

4. **Adicionar novo estilo sem registrar em `TYPES_BY_STYLE`** — `buildTypeChips()` consulta essa tabela (`src/core/state.js` + `src/core/ui.js`); estilo sem entrada fica sem chips de tipo e quebra silenciosamente. → Sempre adicionar entrada em `TYPES_BY_STYLE` junto com o novo gerador, e registrar a chamada no dispatcher de `generate.js`.

5. **Alterar `state.w`/`state.h` sem chamar `updateDimTag()`** — o badge no topbar fica defasado. → Toda mudança de dimensão passa por `setRatio()` ou atualiza a tag explicitamente.

6. **Iterar sobre `generators[style]` esperando ordem** — é um objeto literal; a ordem das chaves não é garantida. → Nunca depender de ordem; use arrays se precisar de sequência.

7. **Usar `snoise()` em `genPixelArt()` sem chamar `snoiseSetSeed()` antes** — o pipeline de pixel art não passa por `generateContent()` (onde a chamada é automática), então herdaria a tabela de permutação da última geração SVG, não do seed atual do pixel art. → Se `genPixelArt()` vier a usar noise, chamar `snoiseSetSeed(state.seed)` explicitamente no início da função (em `src/generators/generic.js`).

8. **Adicionar um novo handler `onclick=""` no HTML sem expor a função em `window`** *(nova — desde a modularização de 2026-07-07)* — `src/main.js` bundla tudo num IIFE; diferente do `<script>` clássico original, declarações de função dentro do bundle **não** vazam para o escopo global automaticamente. Qualquer função nova referenciada via `onclick="minhaFuncao()"` no `src/index.html` (estático) ou dentro de um template string em `buildStyleGrid`/`buildTypeChips`/`buildPalettes`/`buildFontChips`/`buildVariations` precisa ser adicionada ao `Object.assign(window, {...})` em `src/main.js` — senão o clique não faz nada, **sem erro no console**, o que torna esse bug fácil de não notar. Lista atual exposta: `setMode, doGenRandom, selectStyle, selectType, selectPal, selectFont, setRatio, doGen, zoom, toggleBg, toggleGrid, toggleDraw, xSVG, xPNG, copySVG, applyVar`. Ver DEC-010.

---

## Contexto de Produto

- **Usuário-alvo:** designers gráficos, illustradores e criadores de conteúdo que precisam de ornamentos, frames e símbolos vetoriais customizáveis sem depender de assets pagos ou ferramentas pesadas.
- **Dor que resolve:** gerar decorações procedurais de qualidade (Art Deco, Baroque, Victorian, etc.) normalmente exige Illustrator com scripts ou comprar packs; o VectorForge faz isso no browser em segundos.
- **O que é sucesso:** usuário clica "Generate", ajusta parâmetros, exporta SVG e usa direto no Figma/Canva/Inkscape sem retoques manuais.
- **O que o projeto deliberadamente NÃO é:** editor vetorial (não substitui Inkscape/Illustrator), gerador de imagens rasterizadas por IA, ferramenta colaborativa, SaaS com conta/login.
