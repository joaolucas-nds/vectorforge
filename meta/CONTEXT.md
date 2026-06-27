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
    ├── CONTEXT.md
    ├── STATUS.md
    ├── DECISIONS.md
    ├── CHANGELOG.md
    ├── IDEAS.md
    ├── ROADMAP.md
    ├── GLOSSARY.md
    ├── HISTORICO.md
    ├── LOG-TEMPLATE.md
    └── logs/
        └── 2026-06-23.md
```

O `vectorforge.html` é **autocontido**: tudo que o usuário precisa está nele. Os docs vivem separados e não são empacotados no app.

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

**Gerador de pixel art:** usa Canvas 2D API num `<canvas id="px-canvas">` oculto em modo vector. Não compartilha estado com o SVG — é um pipeline paralelo ativado por `setMode('pixel')`.

---

## Arquitetura — pontos-chave

- **Arquivo único autocontido** — sem build, sem node_modules, máxima portabilidade. Ver DEC-001.
- **Geradores são funções puras** — recebem parâmetros, retornam string SVG; não tocam o DOM. Ver DEC-002.
- **Seed para reproducibilidade** — `mkRand(seed)` retorna closure PRNG; seed igual = arte igual. Ver DEC-003.
- **`outerHTML` replacement para atualizar o canvas** — necessário para trocar `viewBox`; requer re-query pós-replace. Ver DEC-004.
- **Modo draw (freehand) acumula `<g>` no SVG existente** — não regera; é aditivo por design. Ver DEC-005.

---

## Armadilhas Conhecidas (o que NÃO fazer)

1. **Acessar `#main-svg` por referência cacheada após `doGen()`** — o `outerHTML` replacement invalida a referência; o elemento no DOM é um *novo* nó. → Sempre re-query com `document.querySelector('#svg-holder svg')` ou `document.getElementById('main-svg')` após qualquer geração.

2. **Chamar `fitToView()` antes do browser terminar o replace** — as dimensões retornadas por `getBoundingClientRect()` ainda são do SVG antigo. → Nunca chamar `fitToView()` fora do `setTimeout` pós-replace.

3. **Exportar PNG no modo Pixel Art** — `xPNG()` lê `#main-svg` (SVG); no modo pixel o canvas visível é o `#px-canvas` (Canvas 2D). A função `xPNG()` atual não exporta o pixel art. → Para exportar pixel art, é preciso `px-canvas.toBlob()` direto, não a função atual.

4. **Adicionar novo estilo sem registrar em `TYPES_BY_STYLE`** — `buildTypeChips()` consulta essa tabela; estilo sem entrada fica sem chips de tipo e quebra silenciosamente. → Sempre adicionar entrada em `TYPES_BY_STYLE` junto com o novo gerador.

5. **Alterar `state.w`/`state.h` sem chamar `updateDimTag()`** — o badge no topbar fica defasado. → Toda mudança de dimensão passa por `setRatio()` ou atualiza a tag explicitamente.

6. **Iterar sobre `generators[style]` esperando ordem** — é um objeto literal; a ordem das chaves não é garantida. → Nunca depender de ordem; use arrays se precisar de sequência.

---

## Contexto de Produto

- **Usuário-alvo:** designers gráficos, illustradores e criadores de conteúdo que precisam de ornamentos, frames e símbolos vetoriais customizáveis sem depender de assets pagos ou ferramentas pesadas.
- **Dor que resolve:** gerar decorações procedurais de qualidade (Art Deco, Baroque, Victorian, etc.) normalmente exige Illustrator com scripts ou comprar packs; o VectorForge faz isso no browser em segundos.
- **O que é sucesso:** usuário clica "Generate", ajusta parâmetros, exporta SVG e usa direto no Figma/Canva/Inkscape sem retoques manuais.
- **O que o projeto deliberadamente NÃO é:** editor vetorial (não substitui Inkscape/Illustrator), gerador de imagens rasterizadas por IA, ferramenta colaborativa, SaaS com conta/login.
