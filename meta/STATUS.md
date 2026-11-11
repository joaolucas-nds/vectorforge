# STATUS.md — Estado Atual

> Arquivo **rolante**: descreve só o AGORA. O assistente lê no início para saber onde retomar.
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log do dia.
> Médio e longo prazo NÃO ficam aqui — ficam no ROADMAP.

---

## Versão Atual
**[0.3.0]** — motor L-System entregue com 3 presets (árvore recursiva, Koch snowflake, Dragon curve), novo estilo **Botanical**. Zero regressão nos 8 estilos anteriores (as 49 combinações antigas continuam byte-a-byte idênticas). GitHub Pages ativado e publicado (`https://joaolucas-nds.github.io/vectorforge/`, com redirect de raiz para `dist/vectorforge.html`). F3 segue aberta: falta Flow Fields.

---

## ✅ Funcionando

- Tudo do v0.2.0: 8 estilos originais, sliders, 8 paletas, canvas customizável, text→form, pixel art, draw mode, 4 variações automáticas, export SVG/PNG/copy.
- **`↻ Regenerate`** sorteia seed novo a cada click (FIX-001).
- **Export PNG no modo Pixel Art** exporta o `px-canvas` corretamente (FIX-002).
- **Simplex Noise 2D** (`snoise`, `snoiseSetSeed`) integrado e reproducível por seed.
- **`genPhyllotaxis`** — tipo no estilo Organic, ângulo áureo + noise + anéis-guia.
- **Build step com esbuild (F3)**: `src/` modular (16 arquivos) → `npm run build` gera `dist/vectorforge.html`. Ver DEC-010.
- **NOVO — Motor L-System + estilo Botanical (F3)**: `src/generators/botanical.js` — `lsystemExpand`/`turtleToPath` (motor genérico) + 3 presets: `tree`, `koch`, `dragon`. Testado com verificação estrutural (contagem de subpaths/pontos condizente com cada curva) além de reprodutibilidade por seed. Ver DEC-011.
- **NOVO — GitHub Pages publicado.** Fonte: branch `main`, pasta raiz. `index.html` na raiz redireciona para `dist/vectorforge.html` (a raiz sozinha cairia no fallback do `README.md`, que é só um placeholder de uma linha).

---

## 🔧 Em Progresso

- **F3 quase fechada.** Restou só Flow Fields (campo de direções via `snoise`, partículas traçando caminhos curvos) para o critério de conclusão de F3 valer por completo.

---

## ❌ Quebrado / Com Problema

- Nenhum bug conhecido no momento.

---

## 📋 Backlog (curto prazo — itens acionáveis)

- [ ] **Flow Fields** (último item de F3): campo de direções via `snoise` já disponível em `src/core/utils.js` — partículas traçando caminhos curvos, tipo novo em Organic/Minimal.
- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (`genADMedallion`, `genBQFrame`, etc.).
- [ ] Testar `dist/vectorforge.html` em Firefox e Safari.
- [ ] Avaliar fallback de `DM Mono`/`Fraunces` (Google Fonts) offline.
- [ ] Sincronizar `snoiseSetSeed` em `genPixelArt()` caso um gerador de pixel art baseado em noise seja adicionado (Armadilha 7 no CONTEXT.md).
- [ ] **Expandir `README.md`** (hoje é só `"# vectorforge"`) — ainda adiado; com dois novos estilos entregues (build modular + botanical), talvez valha antecipar isso na próxima conversa em vez de esperar Flow Fields também, já que o projeto está publicamente visível agora (GitHub Pages).
- [ ] **Colar as Instruções novas no painel do Projeto** (claude.ai) — a fonte é `INSTRUCOES-PROJETO.md` no repo (5.515 caracteres em 2026-11-11).
- [ ] **Definir política de CI** para garantir que `dist/vectorforge.html` nunca fique dessincronizado de `src/`. Baixa prioridade enquanto for projeto de mantenedor único.

---

## 💬 Última conversa

**2026-11-11** — Merge do Kit v1.135.0 e troca do método de trabalho: ASU e FlatDrop saem, entra o modo Code (chat com a pasta vinculada + Claude Code no repo). Instalados `CLAUDE.md`, `.claude/` (settings + skills `apply-wo`/`wrap`/`sondar`), `meta/workorders/_TEMPLATE.md` e `meta/SPEC.md`; CEREBRO e Instruções refeitos sobre o pacote com os transplantes deste projeto; docs vivos migrados ao formato novo; artefatos do ASU movidos para `zz_para-excluir\` na pasta-pai. Ver DEC-012. Nenhuma linha de código do produto mudou. Próximo passo: Flow Fields (último item de F3).
