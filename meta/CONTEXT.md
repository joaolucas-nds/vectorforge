# CONTEXT.md — VectorForge

> Arquivo **estável**. O assistente lê no início de cada sessão para se ambientar.
> Muda pouco: só em alteração estrutural (stack, arquitetura, escopo, nova armadilha descoberta).
> Mantenha enxuto — descreve o que o projeto É, não o que está acontecendo agora (isso é o STATUS).

---

## Visão Geral

VectorForge é um gerador procedural de arte vetorial que roda inteiramente no browser, sem servidor e sem instalação. O usuário escolhe um estilo artístico, um tipo de saída e ajusta parâmetros matemáticos; a ferramenta gera SVG limpo exportável diretamente para Figma, Inkscape, CorelDraw, Affinity Designer e Canva. Resolve a escassez de ornamentos, frames, divisores e símbolos procedurais de alta qualidade disponíveis livremente e customizáveis, que profissionais de design precisam com frequência.

---

## Stack Tecnológica

- **Linguagem:** JavaScript (ES2020 vanilla) + HTML5 + CSS3
- **Framework:** nenhum — zero dependências de runtime
- **Fontes:** Google Fonts (DM Mono + Fraunces) via `@import` — única dependência externa, removível
- **Persistência:** nenhuma — tudo em memória/estado JS local
- **Deploy:** arquivo `.html` único, abrível diretamente no browser (file://) ou via qualquer servidor estático
- **Build / tooling:** nenhum — edição direta no arquivo; ASU para patches cirúrgicos

---

## Estrutura do Projeto

```
vectorforge/
├── vectorforge.html        # O aplicativo inteiro — UI + lógica + estilos em um arquivo
└── docs/                   # Kit de Contexto (este conjunto de arquivos .md)
    ├── CEREBRO.md
    ├── CONTEXT.md
    ├── STATUS.md
    ├── DECISIONS.md
    ├── CHANGELOG.md
    ├── IDEAS.md
    ├── ROADMAP.md
    ├── GLOSSARY.md
    ├── HISTORICO.md
    ├── LOG-TEMPLATE.md
    ├── INSTRUCOES-PROJETO.md   # cola nas Instruções personalizadas do Claude Project
    └── logs/
        ├── 2026-06-23.md
        ├── 2026-06-30.md
        └── 2026-07-03.md
```

O `vectorforge.html` é **autocontido**: tudo que o usuário precisa está nele. Os docs vivem separados e não são empacotados no app. **Ainda não existe `.gitignore` nem `README.md` expandido** — ver STATUS.md → backlog.

---

## Como o pipeline de geração funciona (CRÍTICO)

O fluxo central é: **parâmetros → `generateContent()` → SVG string → `outerHTML` replacement → DOM**.

```
doGen()
  ├── lê controles do DOM (comp, sym, sw, fill, seed, w, h, pal)
  ├── chama generateContent(style, type, cx, cy, sz, ...)
  │     └── despacha para o gerador correto via tabela `generators[style][type]`
  │           └── gerador retorna string com elementos SVG (paths, circles, lines...)
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

- **Arquivo único autocontido** — sem build, sem node_modules, máxima portabilidade. Ver DEC-001.
- **Geradores são funções puras** — recebem parâmetros, retornam string SVG; não tocam o DOM. Ver DEC-002.
- **Seed para reproducibilidade** — `mkRand(seed)` retorna closure PRNG; seed igual = arte igual. Ver DEC-003.
- **`outerHTML` replacement para atualizar o canvas** — necessário para trocar `viewBox`; requer re-query pós-replace. Ver DEC-004.
- **Modo draw (freehand) acumula `<g>` no SVG existente** — não regera; é aditivo por design. Ver DEC-005.
- **ASU cobre código + anexos isolados em DECISIONS.md/CONTEXT.md** (DEC-009); docs rolantes (STATUS/CHANGELOG/IDEAS/GLOSSARY/ROADMAP/HISTORICO) são sempre arquivo completo. Ver DEC-007/008/009.

---

## Inventário de Geradores (referência rápida — evita abrir o `.html` para orientação)

Todo gerador segue a assinatura `gen*(cx, cy, sz, comp, sym, rnd, SO, FG, [FG2], sw)` e retorna string SVG. `SO`/`FG`/`FG2` são strings de atributos (ver GLOSSARY.md). Despacho central em `generateContent()` → `generators[style][type]`.

| Estilo | Tipos (`TYPES_BY_STYLE`) | Funções geradoras |
|---|---|---|
| **artdeco** | medallion, frame, divider, corner, pattern, ornament | `genADMedallion`, `genADFrame`, `genDivider('artdeco')`, `genADCorner`, `genPattern('artdeco')`, `genADOrn` |
| **baroque** | medallion, frame, divider, cartouche, swag, acanthus | `genBQMedallion`, `genBQFrame`, `genDivider('baroque')`, `genBQCartouche`, `genBQSwag`, `genBQAcanthus` |
| **geometric** | mandala, frame, divider, tessellation, star, symbol | `genMandala`, `genGeoFrame`, `genDivider('geo')`, `genPattern('geo')`, `genGeoStar`, `genGeoSymbol` |
| **victorian** | medallion, frame, divider, flourish, wreath, cartouche | `genVicMedallion`, `genVicFrame`, `genDivider('victorian')`, `genBQAcanthus` (reuso), `genVicWreath`, `genBQCartouche` (reuso) |
| **celtic** | knot, border, medallion, cross, knotwork, spiral | `genCelticKnot`, `genADFrame` (reuso, n=6), `genMandala` (reuso, n=6), `genCelticCross`, `genCelticKnot` (reuso, sz×1.2/n=8), `genOrganicSpiral` (reuso) |
| **islamic** | star, girih, arabesque, border, medallion, pattern | `genIslamicStar`, `genPattern('girih')`, `genArabesque`, `genADFrame` (reuso, n=8), `genIslamicStar` (reuso, n=12), `genPattern('islamic')` |
| **minimal** | symbol, line, grid, circle, mark, glyph | `genMinimalSymbol`, `genDivider('min', comp×0.3)`, `genMinGrid`, `genMinCircles`, `genMinimalSymbol` (reuso menor), `genGlyph` |
| **organic** | leaf, spiral, branch, flower, mandala, wave, **phyllotaxis** (novo v0.2.0) | `genOrganicLeaf` (usa `snoise`), `genOrganicSpiral`, `genOrganicBranch`, `genOrganicFlower`, `genMandala` (reuso, n=8), `genWave` (usa `snoise`), `genPhyllotaxis` (usa `snoise`) |

**Padrão de reuso:** vários estilos reaproveitam geradores de outros (Celtic/Islamic reusam `genADFrame`/`genMandala` com parâmetros diferentes; Victorian reusa `genBQAcanthus`/`genBQCartouche`). Isso é intencional — reduz duplicação — mas significa que uma mudança em `genADFrame`, por exemplo, afeta visualmente Art Deco **e** Celtic **e** Islamic ao mesmo tempo. Conferir todos os estilos que reusam antes de alterar um gerador compartilhado.

**Geradores genéricos** (não amarrados a um estilo, despachados por parâmetro `style`): `genDivider(x, cy, w, comp, sym, rnd, SO, FG, sw, style)`, `genPattern(x, y, w, h, comp, sym, rnd, SO, FG, sw, style)`.

**Só no modo Pixel Art** (pipeline paralelo, não usa `generateContent()`): `genPixelArt()`.

**Só na feature Text→Form**: `genTextShape()` (chamado por `doGen()` quando `type` é `glyph`/`symbol`/`mark` e há texto na textarea) e `genGlyph()` (gerador nativo do tipo `glyph` no estilo Minimal).

---

## Armadilhas Conhecidas (o que NÃO fazer)

1. **Acessar `#main-svg` por referência cacheada após `doGen()`** — o `outerHTML` replacement invalida a referência; o elemento no DOM é um *novo* nó. → Sempre re-query com `document.querySelector('#svg-holder svg')` ou `document.getElementById('main-svg')` após qualquer geração.

2. **Chamar `fitToView()` antes do browser terminar o replace** — as dimensões retornadas por `getBoundingClientRect()` ainda são do SVG antigo. → Nunca chamar `fitToView()` fora do `setTimeout` pós-replace.

3. **Exportar PNG no modo Pixel Art** — `xPNG()` lê `#main-svg` (SVG); no modo pixel o canvas visível é o `#px-canvas` (Canvas 2D). A função `xPNG()` atual não exporta o pixel art. → Para exportar pixel art, é preciso `px-canvas.toBlob()` direto, não a função atual.

4. **Adicionar novo estilo sem registrar em `TYPES_BY_STYLE`** — `buildTypeChips()` consulta essa tabela; estilo sem entrada fica sem chips de tipo e quebra silenciosamente. → Sempre adicionar entrada em `TYPES_BY_STYLE` junto com o novo gerador.

5. **Alterar `state.w`/`state.h` sem chamar `updateDimTag()`** — o badge no topbar fica defasado. → Toda mudança de dimensão passa por `setRatio()` ou atualiza a tag explicitamente.

6. **Iterar sobre `generators[style]` esperando ordem** — é um objeto literal; a ordem das chaves não é garantida. → Nunca depender de ordem; use arrays se precisar de sequência.

7. **Usar `snoise()` em `genPixelArt()` sem chamar `snoiseSetSeed()` antes** — o pipeline de pixel art não passa por `generateContent()` (onde a chamada é automática), então herdaria a tabela de permutação da última geração SVG, não do seed atual do pixel art. → Se `genPixelArt()` vier a usar noise, chamar `snoiseSetSeed(state.seed)` explicitamente no início da função.

---

## Contexto de Produto

- **Usuário-alvo:** designers gráficos, illustradores e criadores de conteúdo que precisam de ornamentos, frames e símbolos vetoriais customizáveis sem depender de assets pagos ou ferramentas pesadas.
- **Dor que resolve:** gerar decorações procedurais de qualidade (Art Deco, Baroque, Victorian, etc.) normalmente exige Illustrator com scripts ou comprar packs; o VectorForge faz isso no browser em segundos.
- **O que é sucesso:** usuário clica "Generate", ajusta parâmetros, exporta SVG e usa direto no Figma/Canva/Inkscape sem retoques manuais.
- **O que o projeto deliberadamente NÃO é:** editor vetorial (não substitui Inkscape/Illustrator), gerador de imagens rasterizadas por IA, ferramenta colaborativa, SaaS com conta/login.
