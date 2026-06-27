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

## 🟡 F2 — Estabilização e Polimento *(próxima)*
**Objetivo:** Corrigir os bugs conhecidos, adicionar JSDoc, e melhorar a UX dos dois pontos mais fracos (Regenerate e export pixel art).
**Critério de conclusão:** zero bugs conhecidos no STATUS, todas as funções geradoras com docstring, testes manuais em Chrome e Firefox documentados.
- [ ] Corrigir export PNG no modo Pixel Art (`px-canvas.toBlob()`).
- [ ] Fazer "↻ Regenerate" sortear seed aleatório.
- [ ] Adicionar JSDoc a todas as funções geradoras públicas.
- [ ] Testar em Firefox e Safari; documentar comportamentos divergentes.
- [ ] Validar fallback de fontes offline (sem Google Fonts).

---

## 🔵 F3 — Persistência e Biblioteca Pessoal *(futuro)*
**Objetivo:** Permitir que o usuário salve e recupere configurações favoritas entre sessões.
**Critério de conclusão:** usuário consegue salvar um preset, fechar o browser, reabrir e carregar o preset.
- Preset gallery via `localStorage` (serializa `state` completo como JSON).
- Import/export de presets como arquivo `.json` para compartilhamento.
- UI de galeria no right panel (substituir ou expandir o painel de Variations).

---

## 🔵 F4 — Geração Avançada *(futuro)*
**Objetivo:** Ampliar o espaço criativo com modos de geração que vão além das formas geométricas puras.
- Geração baseada em ruído (Perlin/simplex) como ponto de partida orgânico.
- Proporção áurea / Fibonacci como modo explícito de espaciamento.
- Blending de dois estilos (ex.: 70% Art Deco + 30% Celtic).
- Parâmetro de hotspot: ponto de peso que concentra complexidade localmente.

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
