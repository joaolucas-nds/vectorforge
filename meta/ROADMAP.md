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

## 🟡 F3 — Motor Estrutural e Geradores de Nova Categoria *(em curso — build step concluído em 2026-07-07)*
**Objetivo:** Sair do repertório trigonometria+noise e abrir categorias de ornamento estruturalmente novas (recursão, campo de fluxo, tesselação por proximidade), com uma base de módulos que sustente esse crescimento sem o arquivo virar ingerenciável.
**Critério de conclusão:** motor L-System funcional com ao menos 3 presets (árvore, Koch, dragon curve), Flow Fields como tipo novo, setup de build modular rodando.
- [x] **Build step com esbuild** — `vectorforge.html` dividido em 16 módulos ES (`src/core/*`, `src/generators/*`, `src/main.js`); `scripts/build.js` bundla + injeta em `dist/vectorforge.html`. Verificado byte-a-byte idêntico ao comportamento anterior. Ver DEC-010, log de 2026-07-07.
- [ ] Motor L-System (reescrita de string + turtle graphics), ~150 linhas, novo `src/generators/botanical.js`.
- [ ] Novo estilo `botanical` com presets: árvore recursiva, Koch snowflake, Dragon curve.
- [ ] Flow Fields como tipo novo em Organic/Minimal, usando o `snoise` já disponível em `src/core/utils.js`.
- [ ] Fechar débito técnico: sincronizar `snoiseSetSeed` em `genPixelArt` (agora em `src/generators/generic.js`) se algum gerador de pixel art vier a usar noise.
- [ ] JSDoc pendente do F2 (funções geradoras do v0.1.0).
- [ ] Teste cross-browser (Firefox, Safari) pendente do F2.

---

## 🔵 F4 — Geometria Avançada e Persistência *(futuro)*
**Objetivo:** Ampliar com técnicas de maior custo computacional/estrutural e permitir que o usuário salve trabalho entre sessões.
- Voronoi/Worley noise — tesselações islâmicas variáveis, padrão celular orgânico.
- Preset gallery via `localStorage` (serializa `state` completo como JSON); import/export de presets `.json`.
- Blending de dois estilos (ex.: 70% Art Deco + 30% Celtic).
- Parâmetro de hotspot: ponto de peso que concentra complexidade localmente.
- Reaction-Diffusion (avaliar perf com Web Worker antes de comprometer).
- Marching Squares como auxiliar de Flow Fields/Noise para extração de isocurvas.

---

## 🔵 F5 — Export Avançado e Integrações *(futuro, sem data)*
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
