# CHANGELOG

> Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/) e versionamento [SemVer](https://semver.org/lang/pt-BR/).
> **Cresce**: entradas novas no topo. Registra só o que foi de fato concluído/entregue.

---

## [Não lançado]
*(vazio)*

---

## [0.5.0] — 2026-11-12
### Adicionado
- **Ciclo de exploração** (`src/core/explore.js`, DEC-015): prévia ao vivo em todos os controles (sem botão de gerar); **🎲 Surprise** (Espaço) sorteia estilo, tipo, paleta e parâmetros sem nunca repetir o anterior; **cadeados** por parâmetro; **↻ New seed** (R); **desfazer/refazer** (Ctrl+Z / Ctrl+Shift+Z, 60 estados); variações **«Like this»** (±20 em Complexity/Symmetry + seed novo).
- **`npm run regress`** — instrumento de regressão dos geradores (`scripts/regress.mjs`): compara a saída das 318 combinações estilo × tipo × tamanho × parâmetros com a linha de base versionada `scripts/regress-baseline.json` e sai com erro se alguma saída antiga mudou. `--update` regrava a linha de base. Ver DEC-014.
- **`README.md`** de verdade (antes, uma linha com aspas literais): o que é o projeto, como abrir (GitHub Pages ou arquivo local), os 9 estilos e 53 tipos, recursos, desenvolvimento e estrutura.

### Corrigido
- **FIX-003** — canvas podia abrir vazio (0×0 ou tamanho negativo) quando a página carregava sem área visível; `fitToView()` agora tem piso, tenta de novo no próximo quadro e re-enquadra ao redimensionar a janela ou voltar a aba.

---

## [0.4.0] — 2026-11-11
### Adicionado
- **Flow Fields (F3)** — novo tipo `flow` no estilo Organic (`genFlowField` em `src/generators/organic.js`): partículas seguem um campo de direções do Simplex Noise dentro de um disco de raio `sz`; Complexity → densidade (30–120 partículas, 40–120 passos), Symmetry → 1 a 8 cópias rotacionais. Um único `<path>` por desenho. Fecha o critério de conclusão de F3. Ver DEC-013.

### Alterado
- **Método de trabalho (só tooling/docs, sem mudança no produto):** ASU e FlatDrop descontinuados; modo Code instalado (`CLAUDE.md`, `.claude/` com skills `apply-wo`/`wrap`/`sondar`, `meta/workorders/`, `meta/SPEC.md`). CEREBRO, Instruções e docs vivos migrados ao Kit v1.135.0. Ver DEC-012.

---

## [0.3.0] — 2026-07-24
### Adicionado
- **Motor L-System + novo estilo Botanical (F3)**: `lsystemExpand` (reescrita de string) e `turtleToPath` (interpretação turtle graphics) em `src/generators/botanical.js`, reaproveitáveis para futuras formas L-System. 3 presets novos: `tree` (árvore recursiva, regra clássica de Lindenmayer), `koch` (floco de neve de Koch), `dragon` (Dragon curve). `comp` controla iterações/profundidade em todos; `sym` controla o ângulo de ramificação na árvore e jitter/alternância decorativa nos outros dois (o ângulo de Koch/Dragon é fixo por definição da curva). Ver DEC-011.
- **`index.html` de redirect na raiz do repo** — GitHub Pages a partir da raiz caía no fallback do `README.md`; agora redireciona para `dist/vectorforge.html`.

### Alterado
- **Reestruturação interna (F3): `vectorforge.html` dividido em 16 módulos ES** sob `src/` (`core/{utils,state,ui,view,generate,export}.js` + `generators/{artdeco,baroque,geometric,victorian,celtic,islamic,minimal,organic,generic}.js` + `main.js`). Build via `npm run build` (esbuild, bundle IIFE + inlining de CSS/JS num template HTML) gera `dist/vectorforge.html` — o mesmo arquivo único distribuível de sempre. Verificado byte-a-byte idêntico ao `vectorforge.html` anterior em todas as 49 combinações estilo×tipo pré-existentes, mais Text→Form, Draw mode, Pixel Art, Export e controles de canvas. Ver DEC-010.

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
