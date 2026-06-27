# CHANGELOG

> Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/) e versionamento [SemVer](https://semver.org/lang/pt-BR/).
> **Cresce**: entradas novas no topo. Registra só o que foi de fato concluído/entregue.

---

## [Não lançado]
### Corrigido
- Export PNG no modo Pixel Art baixa SVG em vez do canvas pixel — pendente.
- Botão "↻ Regenerate" não sorteia seed novo — pendente.

---

## [0.1.0] — 2026-06-23
### Adicionado
- Aplicação completa em arquivo único `vectorforge.html` (zero dependências de runtime).
- **8 estilos de arte procedural**: Art Deco, Baroque, Geometric, Victorian, Celtic, Islamic, Minimal, Organic.
- **6 tipos de saída por estilo** (48 combinações no total): medallion, frame, divider, corner, pattern, ornament/knot/star/arabesque/leaf/glyph e variantes por estilo.
- **5 sliders de parâmetro**: Complexity, Symmetry, Stroke width, Fill opacity, Seed (1–999).
- **Canvas size** customizável (50–3000px) com presets de proporção: 1:1, 4:3, 16:9, 3:4, A4.
- **8 paletas de cor** com stroke/fill/bg coordenados: Noir & Gold, Midnight, Sepia, Cobalt, Forest, Crimson, Lilac, Copper.
- **Text → Form**: textarea com seleção de tipografia (Serif, Sans, Mono, Cursive, Fantasy) que gera glyph SVG decorado com anéis radiais.
- **4 variações automáticas** geradas a partir do seed atual (+0/+111/+222/+333), clicáveis para aplicar.
- **Export SVG** (arquivo com declaração XML), **PNG @2x** (via Canvas API) e **Copy SVG code** (clipboard).
- **Modo Pixel Art** (toggle no topbar): gerador por pixel usando simetria radial e setor angular, exportado separadamente.
- **Modo Draw freehand**: esboça no canvas com mouse; ao soltar, calcula bounding box e gera ornamento centrado na área desenhada.
- **Controles de canvas**: zoom (−0.25/Fit/+0.25), toggle fundo escuro/claro, grid de referência sobreposição SVG.
- **Painel de info** (right panel): exibe estilo, tipo, dimensões, paleta, contagem de elementos SVG e seed atual.
- **PRNG seeded** (`mkRand`) para reproducibilidade total: seed + parâmetros = SVG determinístico.
- **UI dark theme** com identidade visual própria: DM Mono (mono), Fraunces (serif display), accent `#c8a96e` (ouro).
- Kit de Contexto Universal preenchido: CONTEXT.md, STATUS.md, DECISIONS.md, CHANGELOG.md, IDEAS.md, ROADMAP.md, GLOSSARY.md, HISTORICO.md, LOG-TEMPLATE.md, logs/2026-06-23.md.
