# STATUS.md — Estado Atual

> Arquivo **rolante**: descreve só o AGORA. O assistente lê no início para saber onde retomar.
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log do dia.
> Médio e longo prazo NÃO ficam aqui — ficam no ROADMAP.

---

## Versão Atual
**[0.7.0]** — F5, lote 2: o seed passa a mudar a forma dos 12 tipos do Art Deco e do Geométrico (escolhas semeadas de motivo, arranjo e acabamento; DEC-018) — placar `formas>1` 18/53. Antes, em v0.6.0: lote Botânico e `npm run seeds` (DEC-017). GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.

---

## ✅ Funcionando

- Tudo do v0.2.0: 8 estilos originais, sliders, 8 paletas, canvas customizável, text→form, pixel art, draw mode, 4 variações automáticas, export SVG/PNG/copy.
- **Ciclo de exploração (v0.5.0, DEC-015):** tudo redesenha na hora; 🎲 Surprise (Espaço) sorteia o que não estiver travado e nunca repete; cadeados; ↻ New seed (R); ↶ ↷ desfazer/refazer (60 estados); variações «Like this». FIX-001 segue valendo no New seed.
- **Canvas nunca abre vazio** (FIX-003): enquadramento com piso e re-enquadramento ao redimensionar/voltar a aba.
- **Botânico variado (v0.6.0, DEC-017):** árvore estocástica (40 formas em 40 seeds), Koch em 5 curvas, Dragon em 5 curvas com Symmetry = cópias giradas. Medido por `npm run seeds`.
- **Art Deco e Geométrico variados (v0.7.0, DEC-018):** os 12 tipos sorteiam variante de motivo, arranjo e acabamento pelo seed (ex.: medalhão com raios em cunha, degraus, leque ou alternados; tesselação com polígonos, estrelas, Truchet ou rosetas). Celta, Islâmico e Orgânico, que reusam esses geradores, não mudaram. Medido por `npm run seeds` e `npm run regress`.
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
- **F5 — Variedade procedural:** lote 1 (instrumento + Botânico, v0.6.0) e lote 2 (Art Deco + Geométrico, v0.7.0) entregues — placar `formas>1: 18/53`. Próximo: um lote por estilo (Barroco, Vitoriano, Celta, Islâmico, Minimal, Orgânico). Roteiro do Botânico 1–6 ok [relatado pelo dono, 2026-11-15]; roteiro do lote 2 pendente.
- **Ordem das frentes:** o dono escolheu F5 lote 2 primeiro [relatado pelo dono, 2026-11-16]; a F4/B (implementação da nova interface) segue aguardando a vez.

---

## ❌ Quebrado / Com Problema

- **O seed ainda não muda a forma em 35 dos 53 tipos** (placar `npm run seeds` em v0.7.0: formas>1 18/53; 6/53 em v0.6.0, 3/53 antes da F5). Surprise, New seed e «Like this» só variam o que os sliders variam nesses tipos. Tratado pela F5, um lote por estilo.

---

## 📋 Backlog (curto prazo — itens acionáveis)

- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (`genADMedallion`, `genBQFrame`, etc.). Art Deco e Geométrico já têm (v0.7.0).
- [ ] Testar `dist/vectorforge.html` em Firefox e Safari.
- [ ] Avaliar fallback de `DM Mono`/`Fraunces` (Google Fonts) offline.
- [ ] Sincronizar `snoiseSetSeed` em `genPixelArt()` caso um gerador de pixel art baseado em noise seja adicionado (Armadilha 7 no CONTEXT.md).
- [ ] **`.gitattributes` com `* text=auto eol=lf`** — o Git do Windows do dono avisa «LF will be replaced by CRLF» em toda WO (autocrlf), e o relatório da WO 0002 chegou a afirmar CRLF onde o disco tinha LF. Fixar LF no repo encerra a ambiguidade. Pequeno; entra na próxima WO que tocar estrutura.
- [ ] **Definir política de CI** (GitHub Actions) para rodar `npm run regress` e garantir que `dist/vectorforge.html` nunca fique dessincronizado de `src/` — o instrumento já existe (DEC-014). Baixa prioridade enquanto for projeto de mantenedor único.
- [ ] **Licença:** o repositório é público e não declara licença (sem licença, ninguém tem permissão legal de reusar o código). Decisão do dono — o README não traz seção de licença até lá.

---

## 💬 Última conversa

> Rolante: só as entradas mais recentes. As anteriores (2026-11-11 a 2026-11-15) estão em `logs/2026-11-11.md`, `logs/2026-11-12.md` e `logs/2026-11-15.md` (enxugado pela WO 0006).

**2026-11-15 (2)** - WO 0005 aplicada pelo Code (`c4d5146`, empurrado): v0.6.0, `npm run seeds` (catraca) e lote Botanico (tree estocastica, Koch e Dragon em 5 curvas, Symmetry = copias no Dragon, enquadramento ~83%); DEC-017 e FIX-004 (build injetava o bundle com `String.replace` e quebrava com `$&`). Regress: 18 chaves `botanical/*` mudaram, 0 fora; seeds formas>1 3/53 -> 6/53; sonda jsdom 18/18. Visual: roteiro do dono 1-6 ok depois [relatado pelo dono, registrado pela WO 0006]. Proximo passo: dono ve as curvas novas; depois um lote F5 por estilo; mockup da F4/B segue aguardando.
