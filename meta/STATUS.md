# STATUS.md — Estado Atual

> Arquivo **rolante**: descreve só o AGORA. O assistente lê no início para saber onde retomar.
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log da sessão.
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
- [ ] **Expandir `README.md`** (hoje é só `"# vectorforge"`) — ainda adiado; com dois novos estilos entregues (build modular + botanical), talvez valha antecipar isso na próxima sessão em vez de esperar Flow Fields também, já que o projeto está publicamente visível agora (GitHub Pages).
- [ ] **Definir política de CI** para garantir que `dist/vectorforge.html` nunca fique dessincronizado de `src/`. Baixa prioridade enquanto for projeto de mantenedor único.

---

## 📁 Arquivos Críticos (não mexer sem contexto)

- **`src/` (17 módulos ES)** — o código-fonte real. Antes de editar: ler CONTEXT.md (seção "Como o pipeline funciona" + "Inventário de Geradores" + Armadilha 8) + DEC-001 a DEC-011 no DECISIONS.md. Depois de editar, **sempre rodar `npm run build`** antes de testar.
- **`dist/vectorforge.html`** — o arquivo que o usuário efetivamente abre (e que o GitHub Pages serve). Versionado no Git — ver DEC-010. Nunca editar à mão.
- **`index.html`** (raiz) — redirect para `dist/vectorforge.html`, existe só por causa do GitHub Pages. Não confundir com `src/index.html` (o template do build).
- **`scripts/build.js`** — lógica de bundling + inlining. Mudar com cuidado.
- **`CEREBRO.md` e `INSTRUCOES-PROJETO.md`** — comportamento do assistente. Convenção de nome de instrução ASU mudou nesta sessão (`AAMMDD-asuNNNN.yaml`, era `AAAA-MM-DD-asuNNNN.yaml`) — ver nota em IDEAS.md → Feedback para o Kit.

---

## 💬 Última Sessão

**2026-07-24** — Motor L-System + estilo Botanical (F3), com um reset de sandbox no meio que exigiu reconstruir `src/` a partir do mount (sem perda: o mount já refletia o estado pós-F3-esbuild). Trabalho: (1) implementei `lsystemExpand`/`turtleToPath` + 3 presets (árvore/Koch/Dragon) em `src/generators/botanical.js`, com regras clássicas de Lindenmayer/Prusinkiewicz; (2) registrei o estilo em `state.js`/`generate.js`/`ui.js` (ícone novo); (3) reduzi o teto de iterações do Dragon curve de 14→12 depois de medir path de 256KB sem ganho visual proporcional; (4) testei: zero regressão nos 49 combos antigos (comparação headless byte-a-byte), reprodutibilidade por seed, e verificação estrutural de cada curva (contagem de subpaths/pontos); (5) ativei o GitHub Pages do usuário — funcionou, mas a raiz sozinha caía no fallback do README; criei `index.html` de redirect para corrigir; (6) documentei em DEC-011, entregue como instrução ASU (anexo isolado em DECISIONS.md + nova linha em CONTEXT.md) em vez de arquivo completo, já validando localmente que as âncoras casam; (7) bump de versão para 0.3.0. Usuário trouxe ajustes de convenção nesta sessão (protocolo de releitura do mount, escopo ASU, nome `AAMMDD-asuNNNN.yaml`, formato de recomendação de config) — aplicados a partir de agora. Próximo passo: Flow Fields (último item de F3).
