# STATUS.md — Estado Atual

> Arquivo **rolante**: descreve só o AGORA. O assistente lê no início para saber onde retomar.
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log do dia.
> Médio e longo prazo NÃO ficam aqui — ficam no ROADMAP.

---

## Versão Atual
**[0.11.0]** — Anti-repetição no sorteio: R e Surprise escolhem, entre até 12 candidatos, o que menos repete as últimas 10 imagens — silhueta + escolhas do gerador (DEC-022); colunas informativas `caras` e `escolhas` no `npm run seeds`. Nenhum desenho muda. Antes: v0.10.0 Celta + Islâmico com esqueleto (DEC-021), v0.9.0 régua de silhueta + piloto (DEC-020), v0.8.0 Barroco + Vitoriano, v0.7.0 Art Deco + Geométrico, v0.6.0 Botânico. GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.

---

## ✅ Funcionando

- Tudo do v0.2.0: 8 estilos originais, sliders, 8 paletas, canvas customizável, text→form, pixel art, draw mode, 4 variações automáticas, export SVG/PNG/copy.
- **Ciclo de exploração (v0.5.0, DEC-015):** tudo redesenha na hora; 🎲 Surprise (Espaço) sorteia o que não estiver travado e nunca repete; cadeados; ↻ New seed (R); ↶ ↷ desfazer/refazer (60 estados); variações «Like this». FIX-001 segue valendo no New seed.
- **Canvas nunca abre vazio** (FIX-003): enquadramento com piso e re-enquadramento ao redimensionar/voltar a aba.
- **Botânico variado (v0.6.0, DEC-017):** árvore estocástica (40 formas em 40 seeds), Koch em 5 curvas, Dragon em 5 curvas com Symmetry = cópias giradas. Medido por `npm run seeds`.
- **Art Deco e Geométrico variados (v0.7.0, DEC-018):** os 12 tipos sorteiam variante de motivo, arranjo e acabamento pelo seed (ex.: medalhão com raios em cunha, degraus, leque ou alternados; tesselação com polígonos, estrelas, Truchet ou rosetas). Celta, Islâmico e Orgânico, que reusam esses geradores, não mudaram. Medido por `npm run seeds` e `npm run regress`. Roteiro visual 1–8 ok [relatado pelo dono, 2026-11-17].
- **Barroco e Vitoriano variados (v0.8.0, DEC-019):** 11 tipos sorteiam variante de motivo, arranjo e acabamento pelo seed (ex.: cartela oval, escudo ou lobada no Barroco; chanfrada ou arqueada no Vitoriano; volutas em espiral, conchas em leque, contas). Flourish e cartela do Vitoriano têm repertório próprio — antes eram iguais aos barrocos em 40 de 40 seeds. Medido por `npm run seeds` e `npm run regress`. Roteiro visual 1–7 ok [relatado pelo dono, 2026-11-17].
- **Esqueleto semeado — piloto (v0.9.0, DEC-020):** nos 4 tipos, o seed escolhe também a composição — medalhão em círculo, octógono, losango, quadrado, oval, arco ou sol nascente; padrão num campo (página, medalhão, losango, faixa, moldura, arco); mandala e símbolo com contorno, escala e arranjo próprios. Medido pela coluna `silhueta%` do `npm run seeds` (régua nova; desde v0.11.0 em `src/core/silhouette.js`). Roteiro visual 1–6 ok, «a receita convenceu» [relatado pelo dono, 2026-11-17].
- **Celta e Islâmico variados (v0.10.0, DEC-021):** os 12 tipos nascem com esqueleto semeado; borda e medalhão celtas, painel de tranças, espiral (tríscele), borda islâmica e shamsa com pingentes têm gerador próprio (antes emprestavam a moldura Art Deco, a mandala, a espiral do Orgânico). `islamic/girih` e `islamic/pattern` deixam de sair iguais. Roteiro visual 1–7 ok [relatado pelo dono, 2026-11-18].
- **Anti-repetição no R e no Surprise (v0.11.0, DEC-022):** cada clique sorteia até 12 candidatos (orçamento ~30 ms) e mostra o que menos repete as últimas 10 imagens — mesma silhueta ou mesmas escolhas do gerador. Medido pelo chat no `dist` (jsdom, 25 sessões de 10 R): `artdeco/pattern` e `celtic/spiral` de 100% para 8% das sessões com repetição; `geometric/symbol` e `celtic/knot` para 64%; tipos de cara única continuam em 100%. Sem texto no Text→Form e fora do Pixel Art (nesses dois, sorteio de antes). Roteiro do dono pendente.
- **Export PNG no modo Pixel Art** exporta o `px-canvas` corretamente (FIX-002).
- **Simplex Noise 2D** (`snoise`, `snoiseSetSeed`) integrado e reproducível por seed.
- **`genPhyllotaxis`** — tipo no estilo Organic, ângulo áureo + noise + anéis-guia.
- **Build step com esbuild (F3)**: `src/` modular (16 arquivos) → `npm run build` gera `dist/vectorforge.html`. Ver DEC-010.
- **NOVO — Motor L-System + estilo Botanical (F3)**: `src/generators/botanical.js` — `lsystemExpand`/`turtleToPath` (motor genérico) + 3 presets: `tree`, `koch`, `dragon`. Testado com verificação estrutural (contagem de subpaths/pontos condizente com cada curva) além de reprodutibilidade por seed. Ver DEC-011.
- **NOVO — GitHub Pages publicado.** Fonte: branch `main`, pasta raiz. `index.html` na raiz redireciona para `dist/vectorforge.html` (a raiz sozinha cairia no fallback do `README.md`, que é só um placeholder de uma linha).
- **NOVO — Flow Fields (`flow`, estilo Organic)**: partículas num campo de direções do `snoise`, dentro de um disco; Complexity → densidade, Symmetry → 1–8 cópias rotacionais. Ver DEC-013. Validada visualmente pelo dono em 2026-11-12 (roteiro 8/8) [relatado pelo dono].
- **NOVO — `npm run regress`**: instrumento de regressão versionado (`scripts/regress.mjs` + `scripts/regress-baseline.json`, 318 chaves). Ver DEC-014.
- **NOVO — `README.md` público**: o que é, como abrir (Pages), 9 estilos / 53 tipos, desenvolvimento.

---

## 🔧 Em Progresso

- **F4/B — mockup da nova interface APROVADO como está** [relatado pelo dono, 2026-11-15]: https://claude.ai/artifact/RVCGHQTZPrHk39ntQ7627f (DEC-016: PT com seletor EN). Próximo passo da F4/B: spec + WO de implementação, em lotes (layout e seções; rótulos PT/EN; estados e mensagens; celular).
- **F5 — Variedade procedural:** lotes 1–3 (v0.6.0–v0.8.0), piloto do esqueleto (v0.9.0, roteiro 1–6 ok [relatado pelo dono, 2026-11-17]) e lote 4 Celta + Islâmico (v0.10.0) entregues — placar `formas>1: 41/53`, **`silhueta>=25%: 22/53`**. Roteiro do lote 4 1–7 ok [relatado pelo dono, 2026-11-18]. **O dono ainda vê repetição:** «em 10 cliques eu vi a mesma coisa umas 2-3 vezes» [relatado pelo dono, 2026-11-18] — medido: a maioria dos tipos tem 1–17 «caras» de silhueta em 200 seeds, e rever uma cara em 10 cliques acontece em ~100% das sessões (só `botanical/tree` escapa: 200 caras, 20%). Desde v0.11.0, R e Surprise evitam repetir as últimas 10 imagens (DEC-022); o que sobra de repetição é falta de caras — 19 tipos têm uma só (análise 261119). Próximo: roteiro do dono da anti-repetição; depois Minimal + Orgânico (parados) e o esqueleto nos 19 tipos dos lotes 2 e 3.
- **Ordem das frentes:** depois do piloto, o dono escolheu «parados primeiro» — Celta + Islâmico [relatado pelo dono, 2026-11-18]; a F4/B (implementação da nova interface) segue aguardando a vez. **Pendente também:** atualização do Kit v1.151.0 na pasta-pai (`../261118-kcm-update-v1.151.0/`, chegou em 2026-11-18; o projeto está na v1.135.0) — merge é frente própria (fusão do CEREBRO e das Instruções). A anti-repetição no sorteio entrou em v0.11.0: opção A da análise `meta/analises/261119-ANALISE-anti-repeticao.md`, aprovada pelo dono com as marcações da §5 [relatado pelo dono, 2026-11-19].

---

## ❌ Quebrado / Com Problema

- **O seed ainda não muda a forma em 12 dos 53 tipos (Minimal e Orgânico), e só muda a SILHUETA em 22** (placar `npm run seeds` em v0.10.0: formas>1 41/53, silhueta>=25% 22/53). Nos outros, Surprise, New seed e «Like this» variam detalhe dentro do mesmo contorno ou só o que os sliders variam. Tratado pela F5.

---

## 📋 Backlog (curto prazo — itens acionáveis)

- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (`genADMedallion`, `genBQFrame`, etc.). Art Deco e Geométrico já têm (v0.7.0); Barroco e Vitoriano também (v0.8.0), exceto `genVicWreath`.
- [ ] Testar `dist/vectorforge.html` em Firefox e Safari.
- [ ] Avaliar fallback de `DM Mono`/`Fraunces` (Google Fonts) offline.
- [ ] Sincronizar `snoiseSetSeed` em `genPixelArt()` caso um gerador de pixel art baseado em noise seja adicionado (Armadilha 7 no CONTEXT.md).
- [ ] **`.gitattributes` com `* text=auto eol=lf`** — o Git do Windows do dono avisa «LF will be replaced by CRLF» em toda WO (autocrlf), e o relatório da WO 0002 chegou a afirmar CRLF onde o disco tinha LF. Fixar LF no repo encerra a ambiguidade. Pequeno; entra na próxima WO que tocar estrutura.
- [ ] **Definir política de CI** (GitHub Actions) para rodar `npm run regress` e garantir que `dist/vectorforge.html` nunca fique dessincronizado de `src/` — o instrumento já existe (DEC-014). Baixa prioridade enquanto for projeto de mantenedor único.
- [ ] **Licença:** o repositório é público e não declara licença (sem licença, ninguém tem permissão legal de reusar o código). Decisão do dono — o README não traz seção de licença até lá.

---

## 💬 Última conversa

> Rolante: só as entradas mais recentes. As anteriores estão nos logs do dia: 2026-11-11 a 2026-11-15 em `logs/2026-11-11.md`, `logs/2026-11-12.md` e `logs/2026-11-15.md`; WO 0005 (2026-11-15), WO 0007 (2026-11-16), WO 0009 e WO 0011 (2026-11-17) em `logs/2026-11-15.md`, `logs/2026-11-16.md` e `logs/2026-11-17.md` (enxugado pela WO 0014).


**2026-11-18** - WO 0012 aplicada pelo Code (`95f5034`, empurrado): v0.10.0, F5 lote 4 — Celta + Islamico com esqueleto semeado nos 12 tipos e geradores proprios para os 6 que emprestavam (borda, medalhao, knotwork, espiral celtas; borda, medalhao islamicos); girih e pattern com motivos proprios; DEC-021. Regress: 72 chaves mudaram, 0 fora de celtic/islamic; seeds formas>1 29/53 -> 41/53, `silhueta>=25%` 10/53 -> 22/53; sonda de UI 18 OK (medido no relatorio do apply). Visual: roteiro do dono 1-7 ok depois [relatado pelo dono, 2026-11-18, registrado pela WO 0013]. Proximo passo: dono faz o roteiro; depois Minimal + Organico (parados) ou esqueleto nos 19 tipos dos lotes 2 e 3.

**2026-11-19** - Fecho da conversa de 2026-11-16 a 2026-11-19 (WO 0014, so doc): WO 0013 conferida (`10178d6`); roteiro do lote 4 1-7 ok e a queixa de repeticao ja registrados; brief `../261119-HANDOFF-BRIEF.md`. Proximo passo [relatado pelo dono]: anti-repeticao no sorteio (R/Surprise) + coluna `caras` no `npm run seeds`; depois merge do kit v1.151.0.

**2026-11-19 (conversa 2)** - Analise `meta/analises/261119-ANALISE-anti-repeticao.md` (custo medido, simulacao do R e do Surprise; achado: a silhueta 16x16 nao ve o motivo, 7/16 contra o olho) e WO 0015: v0.11.0, anti-repeticao no R/Surprise (DEC-022), colunas informativas `caras`/`escolhas`, silhueta em `src/core/`, `pickOne` unico. Proximo: roteiro do dono da anti-repeticao; depois Minimal + Organico ou merge do kit v1.151.0.
