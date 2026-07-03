# CHANGELOG

> Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/) e versionamento [SemVer](https://semver.org/lang/pt-BR/).
> **Cresce**: entradas novas no topo. Registra só o que foi de fato concluído/entregue.

---

## [Não lançado]
*(vazio — todos os itens planejados estão no ROADMAP.md)*

---

## [0.2.0] — 2026-06-30
### Adicionado
- **Simplex Noise 2D** (`snoise`, `snoiseSetSeed`): implementação Gustavson (MIT), ~80 linhas, zero dependências. Noise reproducível: `snoiseSetSeed(seed)` chamado no início de `generateContent()` garante que o mesmo seed produz o mesmo campo de noise. Abre caminho para Flow Fields e qualquer gerador futuro baseado em campo contínuo.
- **Gerador `genPhyllotaxis`**: novo tipo `phyllotaxis` no estilo Organic. Usa o ângulo áureo (φ → 137.507°) para distribuir pontos em espiral, com perturbação radial via Simplex Noise e anéis-guia concêntricos. Complexity → densidade (60–280 pontos); Symmetry → alternância de cor e número de anéis.

### Modificado
- **`genOrganicLeaf`**: noise nos comprimentos e nos dois pontos de controle Bézier de cada pétala → assimetria orgânica natural, elimina aspecto "paramétrico perfeito" do v0.1.0. Nervura central desviada levemente por noise em complexity > 0.4.
- **`genWave`**: noise Simplex sobreposto ao seno base. Proporção noise/seno cresce com complexity (baixo → ondas limpas; alto → ondas com textura orgânica pronunciada). Cada faixa usa coordenada de noise distinta para não replicar padrão.

### Corrigido
- **FIX-001** — Botão "↻ Regenerate" não sorteava seed novo: `doGen()` substituído por novo handler `doGenRandom()` que sorteia `state.seed = Math.ceil(Math.random() * 999)`, sincroniza slider e display, e então chama `doGen()`. Botão deixa de ser idempotente.
- **FIX-002** — Export PNG no modo Pixel Art baixava o SVG anterior: `xPNG()` agora checa `state.mode === 'pixel'` e usa `px-canvas.toBlob()` com `imageSmoothingEnabled = false` (preserva pixel perfeito no upscale). Modo vector mantém fluxo SVG→canvas@2x original.

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
- **Modo Pixel Art** (toggle no topbar): gerador por pixel usando simetria radial e setor angular.
- **Modo Draw freehand**: esboça no canvas com mouse; ao soltar, calcula bounding box e gera ornamento centrado na área desenhada.
- **Controles de canvas**: zoom (−0.25/Fit/+0.25), toggle fundo escuro/claro, grid de referência sobreposição SVG.
- **PRNG seeded** (`mkRand`) para reproducibilidade total: seed + parâmetros = SVG determinístico.
- **UI dark theme** com identidade visual própria: DM Mono (mono), Fraunces (serif display), accent `#c8a96e` (ouro).
- Kit de Contexto Universal preenchido: CONTEXT.md, STATUS.md, DECISIONS.md, CHANGELOG.md, IDEAS.md, ROADMAP.md, GLOSSARY.md, HISTORICO.md, LOG-TEMPLATE.md, logs/2026-06-23.md.
