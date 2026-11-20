# ROADMAP.md — Plano Intencional de Evolução

> **Opcional.** Use quando o projeto tem um plano em fases — não para tarefas soltas (isso é o Backlog do STATUS) nem para brainstorm (isso é o IDEAS).
> Cada fase tem um objetivo e um critério de conclusão. Marque o estado: 🟢 concluída · 🟡 em curso/próxima · 🔵 futura · 🚫 descartada.
> Médio e longo prazo vivem AQUI, não no STATUS.

---

## 🟢 F1 — Gerador Procedural Funcional *(concluída — 2026-06-23)*
**Objetivo:** Entregar uma ferramenta usável que gera ornamentos vetoriais procedurais e exporta SVG limpo.
**Critério de conclusão:** 8 estilos × 6 tipos funcionando, export SVG/PNG, UI completa em arquivo único.
- Arquivo único `vectorforge.html`, zero dependências de runtime.
- 8 estilos: Art Deco, Baroque, Geometric, Victorian, Celtic, Islamic, Minimal, Organic.
- 5 parâmetros (complexity, symmetry, stroke, fill, seed), 8 paletas, canvas size, text→form.
- Export SVG, PNG @2x, copy SVG code.
- Variações automáticas (4 seeds), modo Pixel Art, modo Draw freehand.

---

## 🟢 F2 — Estabilização e Fundação Matemática *(concluída — 2026-06-30)*
**Objetivo:** Corrigir os bugs conhecidos e estabelecer a base matemática (noise coerente) que sustenta os geradores mais avançados de F3.
**Critério de conclusão:** zero bugs conhecidos no STATUS, Simplex Noise integrado e reproducível, primeiro gerador baseado em ângulo áureo entregue.
- [x] Corrigir export PNG no modo Pixel Art (FIX-002).
- [x] Fazer "↻ Regenerate" sortear seed aleatório (FIX-001).
- [x] Implementar Simplex Noise 2D seeded (DEC-006).
- [x] `genPhyllotaxis` — ângulo áureo + noise + anéis-guia.
- [x] Noise orgânico em `genOrganicLeaf` e `genWave`.
- [ ] JSDoc nas funções geradoras do v0.1.0 — não concluído, adiado para F3 (backlog).
- [ ] Testar em Firefox e Safari — não concluído, adiado para F3 (backlog).

---

## 🟢 F3 — Motor Estrutural e Geradores de Nova Categoria *(concluída em v0.4.0 — critério atendido; os débitos herdados marcados `[ ]` abaixo seguem abertos e não bloqueiam F4)*
**Objetivo:** Sair do repertório trigonometria+noise e abrir categorias de ornamento estruturalmente novas (recursão, campo de fluxo, tesselação por proximidade), com uma base de módulos que sustente esse crescimento sem o arquivo virar ingerenciável.
**Critério de conclusão:** motor L-System funcional com ao menos 3 presets (árvore, Koch, dragon curve), Flow Fields como tipo novo, setup de build modular rodando.
- [x] **Build step com esbuild** — `vectorforge.html` dividido em 16 módulos ES (`src/core/*`, `src/generators/*`, `src/main.js`); `scripts/build.js` bundla + injeta em `dist/vectorforge.html`. Verificado byte-a-byte idêntico ao comportamento anterior. Ver DEC-010, log de 2026-07-07.
- [x] **Motor L-System** (reescrita de string + turtle graphics) — `src/generators/botanical.js`, `lsystemExpand`/`turtleToPath`. Ver DEC-011, log de 2026-07-24.
- [x] **Novo estilo `botanical`** com presets: árvore recursiva, Koch snowflake, Dragon curve. Ver DEC-011.
- [x] **Flow Fields** — tipo `flow` no estilo Organic (`genFlowField` em `src/generators/organic.js`), sobre o `snoise` de `src/core/utils.js`. Variante Minimal ficou fora de escopo. Ver DEC-013 e `specs/261111-flow-fields.md`.
- [ ] Fechar débito técnico: sincronizar `snoiseSetSeed` em `genPixelArt` (agora em `src/generators/generic.js`) se algum gerador de pixel art vier a usar noise.
- [ ] JSDoc pendente do F2 (funções geradoras do v0.1.0).
- [ ] Teste cross-browser (Firefox, Safari) pendente do F2.

---

## 🟡 F4 — Exploração e Interface *(em curso — Fase A entregue em v0.5.0; mockup da Fase B aprovado; implementação da B pendente)*
**Objetivo:** Tornar a ferramenta rápida de explorar e fácil de entender: cada ajuste responde na hora, o acaso é controlável e a interface explica a si mesma. Origem: análise `meta/analises/261112-ANALISE-exploracao-e-ux.md`.
**Critério de conclusão:** ciclo de exploração no ar (A) e interface nova aprovada pelo dono no roteiro visual (B), em português com seletor EN.
- [x] **A — Ciclo de exploração**: prévia ao vivo, Surprise, cadeados, New seed, desfazer/refazer, variações «Like this», FIX-003. v0.5.0, DEC-015.
- [x] **B — mockup** aprovado pelo dono como está em 2026-11-15 [relatado pelo dono]: https://claude.ai/artifact/RVCGHQTZPrHk39ntQ7627f
- [ ] **B — implementação**: PT com seletor EN; seções recolhíveis com resumo; rótulos completos com dica e atalho; seed digitável; controle sem efeito no tipo atual desabilitado com o motivo; Text→Form avisa quando o tipo ignora o texto; estado na URL (link reproduz o desenho); favoritos (`localStorage`, absorve a «Preset gallery» da F6); paleta harmônica aleatória; contraste AA nos rótulos; responsivo.

---

## 🟡 F5 — Variedade procedural *(próxima, em paralelo à F4/B)*
**Objetivo:** O seed passar a decidir a forma em TODOS os tipos, e cada tipo ter mais de uma «cara». Medido em 2026-11-15: o seed não muda nada em 46 dos 53 tipos (DEC-016).
**Critério de conclusão:** `npm run seeds` com **53/53** tipos com `silhueta%` ≥ 25 (o seed muda o que se lê na miniatura; DEC-020 — antes a meta era `formas`, que contava detalhe), linha de base do regress regravada de propósito, e roteiro visual do dono por lote. Placar atual: rode `npm run seeds`.
- [x] Instrumento de sensibilidade ao seed — `npm run seeds` (catraca), v0.6.0, DEC-017. Placar: formas>1 3/53 → 6/53.
- [x] Lote Botânico — árvore estocástica, família de Koch, família dragão (Symmetry = cópias), enquadramento ~83%. v0.6.0, DEC-017, `specs/261115-seed-vivo-botanico.md`.
- [x] Lote Art Deco + Geométrico — 12 tipos com escolhas semeadas; geradores compartilhados variam só para o estilo dono (`vary`). v0.7.0, DEC-018, `specs/261116-seed-vivo-artdeco-geometrico.md`. Placar: formas>1 6/53 → 18/53.
- [x] Lote Barroco + Vitoriano — 11 tipos com escolhas semeadas; flourish e cartela do Vitoriano com repertório próprio (`style`). v0.8.0, DEC-019, `specs/261117-seed-vivo-barroco-vitoriano.md`. Placar: formas>1 18/53 → 29/53.
- [x] Régua de silhueta — coluna `silhueta%` no `npm run seeds` (`scripts/silhouette.mjs`), catraca. v0.9.0, DEC-020, análise `261117-ANALISE-variedade-silhueta.md`.
- [x] Piloto do esqueleto semeado — medalhão e padrão Art Deco, mandala e símbolo geométricos: silhueta 2–9% → 26–42%. v0.9.0, DEC-020, `specs/261117-esqueleto-semeado-piloto.md`.
- [x] Lote 4 — Celta + Islâmico com esqueleto e geradores próprios do estilo. v0.10.0, DEC-021, `specs/261118-esqueleto-celta-islamico.md`. Placar: silhueta>=25% 10/53 → 22/53.
- [x] Anti-repetição no sorteio — R e Surprise escolhem, entre até 12 candidatos, o que menos repete as últimas 10 imagens (silhueta + escolhas do `pickOne`); colunas informativas `caras` e `escolhas` no `npm run seeds`. v0.11.0, DEC-022, análise `261119-ANALISE-anti-repeticao.md`. O sorteio chega a 0,2 do piso teórico; o resto é falta de caras.
- [ ] Esqueleto nos 19 tipos dos lotes 2 e 3 (o piloto convenceu: roteiro 1–6 ok em 2026-11-17).
- [x] Lote 5a — Minimal com esqueleto semeado nos 6 tipos (`symbol`/`mark` com repertórios próprios, `line` com gerador próprio, `glyph` assêmico sem texto). v0.12.0, DEC-023, `specs/261120-esqueleto-minimal.md`. Placar: silhueta>=25% 22/53 → 28/53.
- [ ] Lote 5b — Orgânico com esqueleto: `spiral`, `flower`, `mandala`, `phyllotaxis` parados; `leaf`, `branch`, `wave`, `flow` variam por ruído, sem esqueleto.
- [ ] Modificadores universais: traço tracejado/duplo/pontilhado, camadas, espelho, deformação leve por ruído.

---

## 🔵 F6 — Geometria Avançada e Persistência *(futuro — era a F4 até 2026-11-15)*
**Objetivo:** Ampliar com técnicas de maior custo computacional/estrutural e permitir que o usuário salve trabalho entre sessões.
- Voronoi/Worley noise — tesselações islâmicas variáveis, padrão celular orgânico.
- Preset gallery via `localStorage` (serializa `state` completo como JSON); import/export de presets `.json`.
- Blending de dois estilos (ex.: 70% Art Deco + 30% Celtic).
- Parâmetro de hotspot: ponto de peso que concentra complexidade localmente.
- Reaction-Diffusion (avaliar perf com Web Worker antes de comprometer).
- Marching Squares como auxiliar de Flow Fields/Noise para extração de isocurvas.

---

## 🔵 F7 — Export Avançado e Integrações *(futuro, sem data — era a F5 até 2026-11-15)*
**Objetivo:** Reduzir o atrito entre o VectorForge e as ferramentas de destino do usuário.
- SVG animado (CSS keyframes embutidos no export) para uso em motion design e web.
- Tile seamless (`<pattern>` SVG) para pattern fills.
- Plugin Figma / Canva (requer aprovação de plataforma, escopo maior).
- Export EPS/PDF via WASM (avaliação de viabilidade: Potrace, resvg-wasm).

---

## 🚫 Itens descartados desta visão

- **Backend server-side / SaaS** — fora de escopo; a proposta de valor é zero-setup no browser.
- **Geração via IA/diffusion** — descartada; latência e custo quebram a experiência de "gera em milissegundos". Ver IDEAS.md seção Descartadas.
- **Integração com Adobe Illustrator nativo (.ai)** — formato proprietário sem SDK público gratuito; SVG funciona em todos os destinos mencionados.
- **Python como motor gerador** — descartada (análise 2026-06-30, ver IDEAS.md → Descartadas e DECISIONS.md contexto de DEC-006): quebraria o modelo `file://` sem ganho técnico real sobre JS vanilla para este escopo.
