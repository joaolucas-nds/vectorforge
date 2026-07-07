# STATUS.md — Estado Atual

> Arquivo **rolante**: descreve só o AGORA. O assistente lê no início para saber onde retomar.
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log da sessão.
> Médio e longo prazo NÃO ficam aqui — ficam no ROADMAP.

---

## Versão Atual
**[0.2.0]** — 2026-06-30 — F2 completa (sem mudança de versão nesta sessão: 2026-07-03 foi sessão de integração de Kit + documentação, zero código tocado).

---

## ✅ Funcionando

- Tudo do v0.2.0: 8 estilos, 6-7 tipos por estilo (Organic tem 7, os demais têm 6), sliders, 8 paletas, canvas customizável, text→form, pixel art, draw mode, 4 variações automáticas, export SVG/PNG/copy.
- **`↻ Regenerate`** sorteia seed novo a cada click (FIX-001).
- **Export PNG no modo Pixel Art** exporta o `px-canvas` corretamente (FIX-002).
- **Simplex Noise 2D** (`snoise`, `snoiseSetSeed`) integrado e reproducível por seed.
- **`genPhyllotaxis`** — novo tipo no estilo Organic, ângulo áureo + noise + anéis-guia.
- **`genOrganicLeaf`** e **`genWave`** — noise orgânico integrado.
- **Kit de Contexto Universal** — 10 arquivos + CEREBRO.md + INSTRUCOES-PROJETO.md, íntegros e versionados desde a sessão de 2026-06-23.

---

## 🔧 Em Progresso

- Nada em código. Esta sessão (2026-07-03) foi 100% documentação: comparação da atualização do Kit trazida pelo usuário (`instrucoes-dev__template-update.txt`) contra o que já tínhamos, resolução do conflito de escopo do ASU (→ DEC-009), regeneração completa dos docs para handoff entre conversas.

---

## ❌ Quebrado / Com Problema

- Nenhum bug conhecido no momento.

---

## 📋 Backlog (curto prazo — itens acionáveis)

- [ ] **Decisão pendente para abrir F3**: motor L-System primeiro (ganho visual imediato, novo estilo Botanical) ou build step com esbuild primeiro (ganho estrutural, facilita tudo depois)? Perguntar ao usuário no início da próxima sessão antes de estruturar qualquer coisa — ver ROADMAP.md → F3.
- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (`genADMedallion`, `genBQFrame`, etc. — os novos geradores de v0.2.0 já têm).
- [ ] Testar `vectorforge.html` em Firefox e Safari; documentar comportamentos divergentes do `outerHTML` replacement.
- [ ] Avaliar fallback de `DM Mono`/`Fraunces` (Google Fonts) offline.
- [ ] Sincronizar `snoiseSetSeed` em `genPixelArt()` caso um gerador de pixel art baseado em noise seja adicionado (Armadilha 7 no CONTEXT.md).
- [ ] **Criar `.gitignore`** adequado ao stack (projeto sem build tem pouco a ignorar, mas convém cobrir editores/OS: `.vscode/`, `.DS_Store`, `Thumbs.db`, backups do ASU). Novo item — identificado nesta sessão ao integrar o Kit atualizado.
- [ ] **Expandir `README.md`** (hoje é só `"# vectorforge"`) — adiado deliberadamente: a estrutura ainda vai mudar em F3 (build step, novo estilo Botanical), expandir agora arriscaria nascer desatualizado. Reavaliar quando F3 estabilizar.

---

## 📁 Arquivos Críticos (não mexer sem contexto)

- `vectorforge.html` — O aplicativo inteiro. Antes de editar: ler CONTEXT.md (seção "Como o pipeline funciona" + "Inventário de Geradores") + DEC-001 a DEC-009 no DECISIONS.md. Usar instrução ASU datada (`AAAA-MM-DD-asuNNNN.yaml`) para patches; entregar como arquivo para download, nunca como bloco inline (DEC-008).
- `CEREBRO.md` e `INSTRUCOES-PROJETO.md` — definem o comportamento do assistente neste projeto. Qualquer atualização futura do Kit deve ser comparada contra estes dois antes de aplicar (ver seção "Canal de atualização do kit" no CEREBRO.md).

---

## 💬 Última Sessão

**2026-07-03** — Sessão de integração de Kit + fechamento para handoff entre conversas (esta conversa ficou pesada; usuário pediu geração de todo o contexto para continuar numa conversa nova sem perder nada). Trabalho: (1) comparei a Instrução do Projeto vigente (curta, sem parágrafos de ASU/config/commit/gitignore/README) contra o `instrucoes-dev__template-update.txt` trazido pelo usuário (versão mais rica); (2) identifiquei que o Kit novo formaliza ASU para `DECISIONS.md`/`CONTEXT.md` (heading estável), o que ia além do DEC-007 original ("ASU só para código") — resolvido com DEC-009, que amplia o escopo exatamente como DEC-007 já previa como possibilidade; (3) DEC-008 (entrega sempre como download) convergiu com o padrão do Kit novo, deixou de ser desvio; (4) regenerei CEREBRO.md (ritual de releitura do mount, seção de `.gitignore`/README, seção ASU atualizada) e criei `INSTRUCOES-PROJETO.md` (a instrução curta atualizada, pronta para colar); (5) regenerei todos os 10 docs + CEREBRO + INSTRUCOES-PROJETO com máximo detalhe para handoff completo, incluindo um Inventário de Geradores novo no CONTEXT.md. Nenhuma linha de `vectorforge.html` foi tocada nesta sessão. Próximo passo: abrir F3, decidindo primeiro L-System vs. esbuild.
