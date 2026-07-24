# STATUS.md — Estado Atual

> Arquivo **rolante**: descreve só o AGORA. O assistente lê no início para saber onde retomar.
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log da sessão.
> Médio e longo prazo NÃO ficam aqui — ficam no ROADMAP.

---

## Versão Atual
**[0.2.0]** — comportamento do app inalterado nesta sessão (verificado byte-a-byte). O que mudou foi a **estrutura do código-fonte**, não o produto entregue — por isso não há bump de versão ainda. F3 (build step) está em andamento; versão sobe quando F3 fechar com algo novo visível ao usuário (L-System / estilo Botanical).

---

## ✅ Funcionando

- Tudo do v0.2.0: 8 estilos, 6-7 tipos por estilo (Organic tem 7, os demais têm 6), sliders, 8 paletas, canvas customizável, text→form, pixel art, draw mode, 4 variações automáticas, export SVG/PNG/copy.
- **`↻ Regenerate`** sorteia seed novo a cada click (FIX-001).
- **Export PNG no modo Pixel Art** exporta o `px-canvas` corretamente (FIX-002).
- **Simplex Noise 2D** (`snoise`, `snoiseSetSeed`) integrado e reproducível por seed.
- **`genPhyllotaxis`** — tipo no estilo Organic, ângulo áureo + noise + anéis-guia.
- **`genOrganicLeaf`** e **`genWave`** — noise orgânico integrado.
- **Kit de Contexto Universal** — 11 arquivos + CEREBRO.md + INSTRUCOES-PROJETO.md, íntegros e versionados.
- **NOVO — Build step com esbuild (F3):** `vectorforge.html` foi dividido em 16 módulos ES em `src/` (`core/` + `generators/`); `npm run build` (ou `npm run watch`) gera `dist/vectorforge.html` — o mesmo arquivo único distribuível de sempre. Verificado byte-a-byte idêntico ao comportamento anterior em todas as 49 combinações estilo×tipo + Text→Form + Draw mode + Pixel Art + Export + Variations + zoom/canvas presets, via Chromium headless (Playwright). Ver DEC-010.

---

## 🔧 Em Progresso

- **F3 aberta, build step concluído.** Faltam os outros dois itens de F3: motor L-System (~150 linhas, novo estilo Botanical) e Flow Fields. Nenhum dos dois foi iniciado ainda.

---

## ❌ Quebrado / Com Problema

- Nenhum bug conhecido no momento. (4 bugs de import foram introduzidos durante a modularização desta sessão e corrigidos antes da entrega — ver DEC-010, não chegaram a ficar "quebrados" em nenhum momento entregue ao usuário.)

---

## 📋 Backlog (curto prazo — itens acionáveis)

- [ ] **Motor L-System** (próximo item de F3): reescrita de string + turtle graphics, ~150 linhas, novo arquivo `src/generators/botanical.js`. Presets: árvore recursiva, Koch snowflake, Dragon curve. Ver ROADMAP.md → F3.
- [ ] **Flow Fields** (F3): campo de direções via `snoise` já disponível em `src/core/utils.js` — partículas traçando caminhos curvos, tipo novo em Organic/Minimal.
- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (`genADMedallion`, `genBQFrame`, etc. — os novos geradores de v0.2.0 já têm). Agora que cada uma vive num arquivo pequeno em `src/generators/`, é mais barato fazer isso incrementalmente.
- [ ] Testar `dist/vectorforge.html` em Firefox e Safari; documentar comportamentos divergentes do `outerHTML` replacement.
- [ ] Avaliar fallback de `DM Mono`/`Fraunces` (Google Fonts) offline.
- [ ] Sincronizar `snoiseSetSeed` em `genPixelArt()` (em `src/generators/generic.js`) caso um gerador de pixel art baseado em noise seja adicionado (Armadilha 7 no CONTEXT.md).
- [ ] **Expandir `README.md`** (hoje é só `"# vectorforge"`) — ainda adiado: com `src/` recém-criado, faz sentido esperar o motor L-System estabilizar antes de documentar a estrutura publicamente, para não nascer desatualizado de novo.
- [ ] **Definir política de CI** para garantir que `dist/vectorforge.html` nunca fique dessincronizado de `src/` (hoje depende de lembrar manualmente — ver trade-off registrado em DEC-010 e no `.gitignore`). Baixa prioridade enquanto for projeto de mantenedor único.

---

## 📁 Arquivos Críticos (não mexer sem contexto)

- **`src/` (16 módulos ES)** — o código-fonte real agora vive aqui, não mais num único `vectorforge.html`. Antes de editar: ler CONTEXT.md (seção "Como o pipeline funciona" + "Inventário de Geradores" + Armadilha 8) + DEC-001 a DEC-010 no DECISIONS.md. Depois de editar, **sempre rodar `npm run build`** antes de testar — `dist/vectorforge.html` é gerado, editá-lo direto é descartado no próximo build.
- **`dist/vectorforge.html`** — o arquivo que o usuário efetivamente abre. Versionado no Git (não é `.gitignore`d) por decisão deliberada — ver DEC-010. Nunca editar à mão.
- **`scripts/build.js`** — a lógica de bundling + inlining. Mudar com cuidado: qualquer alteração aqui afeta como TODO o `src/` vira `dist/`.
- **`CEREBRO.md` e `INSTRUCOES-PROJETO.md`** — definem o comportamento do assistente neste projeto. Qualquer atualização futura do Kit deve ser comparada contra estes dois antes de aplicar (ver seção "Canal de atualização do kit" no CEREBRO.md).

---

## 💬 Última Sessão

**2026-07-07** — Sessão de estruturação: F3 abriu pela decisão pendente (L-System vs. esbuild), usuário escolheu esbuild. Trabalho: (1) pesquisei práticas de bundling para o caso específico de single-file HTML inline (rejeitei plugins prontos tipo `esbuild-plugin-html`, feitos para outdir multi-arquivo); (2) propus o recorte de 16 módulos (`src/core/*` + `src/generators/*` + `src/main.js`) organizados por estilo, confirmado com o usuário antes de executar; (3) extraí o `vectorforge.html` original (1554 linhas de `<script>`) por parser Python de contagem de chaves — não retype manual — garantindo cópia byte-exata das ~73 funções; (4) montei os 16 módulos + `scripts/build.js` (esbuild IIFE + inlining custom) + `package.json` + `.gitignore`; (5) build rodou e gerou `dist/vectorforge.html` (53.8KB minificado vs. 86KB original não-minificado); (6) testei com Chromium headless via Playwright: TODAS as 49 combinações estilo×tipo comparadas byte-a-byte contra o original, mais Text→Form, Draw mode, Pixel Art (hash de pixels), Export SVG/PNG, Regenerate, Variations, zoom, presets de canvas — encontrei e corrigi 4 bugs reais de import faltante (`TAU` em 7 arquivos, `starPath`/`polyPath` em islamic.js, `setStatus` em export.js e view.js, `genMandala` em generic.js) antes de considerar a entrega pronta; (7) documentei tudo em DEC-010; (8) regenerei CONTEXT.md, STATUS.md, ROADMAP.md, CHANGELOG.md, IDEAS.md, GLOSSARY.md e o log da sessão. Próximo passo: motor L-System (próximo item de F3, ver Backlog acima).
