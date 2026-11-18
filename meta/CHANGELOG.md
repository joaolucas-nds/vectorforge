# CHANGELOG

> Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/) e versionamento [SemVer](https://semver.org/lang/pt-BR/).
> **Cresce**: entradas novas no topo. Registra só o que foi de fato concluído/entregue.

---

## [Não lançado]
*(vazio)*

---

## [0.10.0] — 2026-11-18
### Alterado
- **Celta e Islâmico com variedade de verdade** (F5, lote 4, já com esqueleto semeado): nó (estrela de laços, roseta entrelaçada, triquetra, corrente), cruz (braços iguais, cruz alta com base, latina; remates reto, alargado ou bola), estrela islâmica (rosácea, fita {n/k}, enquadrada, khatam; moldura), arabesco (radial, palmeta, faixa). Placar `npm run seeds`: formas>1 29/53 → 41/53, silhueta>=25% 10/53 → 22/53.
- **Geradores próprios do estilo** para os seis tipos que emprestavam de outros: borda celta (trança entre trilhos), medalhão celta (anel trançado + tríscele, triquetra ou roseta), painel de tranças (quadrado, círculo, losango, faixa ou cruz), espiral celta (1 a 4 espirais), borda islâmica (estrelas de 8, losangos, merlões ou entrelaçado), medalhão islâmico (shamsa com pingentes).
- `islamic/girih` e `islamic/pattern` ganham motivos próprios (hexagrama, estrela de seis; khatam, octógono) e o campo/escala de célula semeados; deixam de sair com a mesma silhueta para o mesmo seed (eram iguais em 40 de 40).
- Art Deco, Orgânico e os demais não mudam (`genADFrame`, `genMandala`, `genOrganicSpiral` e `genPattern` dos outros estilos seguem iguais).
- Linha de base do `npm run regress` regravada para as 72 chaves `celtic/*` e `islamic/*`.

---

## [0.9.0] — 2026-11-17
### Adicionado
- **Régua de silhueta no `npm run seeds`** (`scripts/silhouette.mjs`): coluna `silhueta%` — quanto o seed muda o que se lê na miniatura (1 − IoU de uma malha 16×16, calculada da geometria do SVG, sem dependência nova). Entra na catraca e no resumo (`silhueta>=25%: N/53`). Calibrada contra uma sonda rasterizada (Spearman 0,771). Ver DEC-020.
- Primitivas `contourRadius` e `contourPath` (`core/utils.js`): contorno de um desenho radial como função r(a).

### Alterado
- **Piloto do esqueleto semeado** (F5): o seed passa a escolher também a COMPOSIÇÃO em 4 tipos — medalhão Art Deco (círculo, octógono, losango, quadrado, oval alto, arco ou sol nascente; escala; ±1 anel; ±2 raios), padrão Art Deco (campo: página, medalhão, losango, faixa, moldura ou arco; escala da célula), mandala geométrica (contorno, escala, espaçamento dos anéis, ±2 anéis) e símbolo geométrico (contorno, órbita dos nós, escala). Silhueta: medallion 7,0 → 25,8%, pattern 8,8 → 41,9%, mandala 3,0 → 29,7%, symbol 7,5 → 33,2%.
- Celta, Orgânico, fallback e Text→Form, que reusam a mandala sem `vary`, não mudam.
- Linha de base do `npm run regress` regravada para as 24 chaves dos 4 tipos; a do `npm run seeds` ganha a silhueta de todos os tipos.

---

## [0.8.0] — 2026-11-17
### Alterado
- **Barroco e Vitoriano com variedade de verdade** (F5, lote 3): 11 tipos passam a sortear pelo seed a variante de motivo, arranjo e acabamento — medalhão barroco (moldura oval, com contas ou recortada; volutas em C, em S ou folhas; coroa de esferas, concha ou remate), moldura barroca (cantos em voluta, concha ou roseta; ornamento lateral; filete duplo, triplo ou com contas), divisor, cartela, festão (gomo simples, duplo ou em arco; borla, roseta ou pérola), acanto (voluta, acanto lobado, pena; folhas aos pares ou alternadas), medalhão vitoriano (anel com octógono, recortado ou com contas; bordadura de cachos, laçadas ou flores), moldura vitoriana, divisor vitoriano, flourish e cartela vitorianos. O desenho de antes de cada tipo barroco continua sendo uma das variantes. Placar `npm run seeds`: formas>1 18/53 → 29/53.
- `victorian/flourish` e `victorian/cartouche` deixam de ser cópias de `baroque/acanthus` e `baroque/cartouche` (eram iguais byte a byte em 40 de 40 seeds): `genBQAcanthus` e `genBQCartouche` ganham `style`, com repertório próprio do Vitoriano.
- `victorian/wreath` não muda (já variava).
- Linha de base do `npm run regress` regravada para as 66 chaves dos 11 tipos (mudança intencional).

---

## [0.7.0] — 2026-11-16
### Alterado
- **Art Deco e Geométrico com variedade de verdade** (F5, lote 2): os 12 tipos passam a sortear pelo seed a variante de motivo, arranjo e acabamento — medalhão (raios em cunha, degraus, leque ou alternados; anéis em círculo, octógono ou dodecágono; três miolos; três acabamentos), moldura (cantos em colchete, leque ou zigurate; quatro motivos de borda; filete simples, duplo ou triplo), divisor, canto, padrão (polígono, escama, leque, chevron; malha reta ou em tijolo), ornamento (quatro células × quatro contornos × três miolos), mandala (pétala por anel, anéis escalonados), moldura geométrica, divisor geométrico, tesselação (polígono, estrela, Truchet, roseta), estrela ({n/k}, alternada, três giros) e símbolo. O desenho de antes de cada tipo continua sendo uma das variantes. Placar `npm run seeds`: formas>1 6/53 → 18/53.
- Celta, Islâmico e Orgânico, que reusam `genADFrame`, `genMandala` e `genPattern`, não mudam: a variação só liga para o estilo dono.
- Linha de base do `npm run regress` regravada para as 72 chaves `artdeco/*` e `geometric/*` (mudança intencional).

---

## [0.6.0] — 2026-11-15
### Adicionado
- **`npm run seeds`** (`scripts/seeds.mjs`) — instrumento de sensibilidade ao seed: por tipo, quantos desenhos e quantas estruturas diferentes saem de 40 seeds; catraca contra perda de variedade. Ver DEC-017.

### Alterado
- **Botânico com variedade de verdade** (F5, lote 1): `tree` vira L-System estocástico (o seed escolhe a regra de cada galho e perturba ângulos, comprimentos e inclinação); `koch` sorteia entre 5 curvas (floco, anti-floco, ilha quadrática, Minkowski, hexágono) e a orientação; `dragon` sorteia entre 5 curvas (Heighway, twindragon, Lévy C, terdragon, Sierpiński), orientação e espelhamento, e o Symmetry passa a ser o número de cópias giradas. Os três ocupam ~83% do canvas (antes ~40%). Pior caso: tree 54 KB (antes 166 KB), koch 43 KB, dragon 111 KB.
- Linha de base do `npm run regress` regravada para as 18 chaves `botanical/*` (mudança intencional).

### Corrigido
- **FIX-004** — o build podia gerar um `dist/vectorforge.html` com o JavaScript quebrado: `scripts/build.js` injetava o bundle com `String.replace` e string, que interpreta `$&`; o minificador gerou `$&&` e o marcador voltou para o meio do código. Agora substitui por função e confere que o bundle entrou inteiro.

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
