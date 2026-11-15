# STATUS.md — Estado Atual

> Arquivo **rolante**: descreve só o AGORA. O assistente lê no início para saber onde retomar.
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log do dia.
> Médio e longo prazo NÃO ficam aqui — ficam no ROADMAP.

---

## Versão Atual
**[0.6.0]** — F5, lote 1: o seed passa a mudar a forma da árvore, do Koch e do Dragon (L-System estocástico e famílias de curvas), que agora ocupam ~83% do canvas; instrumento `npm run seeds` (DEC-017). Antes, em v0.5.0: ciclo de exploração (DEC-015) e FIX-003. GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.

---

## ✅ Funcionando

- Tudo do v0.2.0: 8 estilos originais, sliders, 8 paletas, canvas customizável, text→form, pixel art, draw mode, 4 variações automáticas, export SVG/PNG/copy.
- **Ciclo de exploração (v0.5.0, DEC-015):** tudo redesenha na hora; 🎲 Surprise (Espaço) sorteia o que não estiver travado e nunca repete; cadeados; ↻ New seed (R); ↶ ↷ desfazer/refazer (60 estados); variações «Like this». FIX-001 segue valendo no New seed.
- **Canvas nunca abre vazio** (FIX-003): enquadramento com piso e re-enquadramento ao redimensionar/voltar a aba.
- **Botânico variado (v0.6.0, DEC-017):** árvore estocástica (40 formas em 40 seeds), Koch em 5 curvas, Dragon em 5 curvas com Symmetry = cópias giradas. Medido por `npm run seeds`.
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

- **F4/B — mockup da nova interface** aguardando o retorno do dono: https://claude.ai/artifact/RVCGHQTZPrHk39ntQ7627f (DEC-016: PT com seletor EN, mockup antes de código).
- **F5 — Variedade procedural:** lote 1 (instrumento + Botânico) entregue em v0.6.0 — placar `formas>1: 6/53`. Próximo: um lote por estilo (Art Deco, Barroco, Geométrico, Vitoriano, Celta, Islâmico, Minimal, Orgânico).

---

## ❌ Quebrado / Com Problema

- **O seed ainda não muda a forma em 47 dos 53 tipos** (placar `npm run seeds` em v0.6.0: formas>1 6/53; antes do lote 1 eram 3/53, e o seed não mexia em número nenhum em 46). Surprise, New seed e «Like this» só variam o que os sliders variam nesses tipos. Tratado pela F5, um lote por estilo.

---

## 📋 Backlog (curto prazo — itens acionáveis)

- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (`genADMedallion`, `genBQFrame`, etc.).
- [ ] Testar `dist/vectorforge.html` em Firefox e Safari.
- [ ] Avaliar fallback de `DM Mono`/`Fraunces` (Google Fonts) offline.
- [ ] Sincronizar `snoiseSetSeed` em `genPixelArt()` caso um gerador de pixel art baseado em noise seja adicionado (Armadilha 7 no CONTEXT.md).
- [ ] **Definir política de CI** (GitHub Actions) para rodar `npm run regress` e garantir que `dist/vectorforge.html` nunca fique dessincronizado de `src/` — o instrumento já existe (DEC-014). Baixa prioridade enquanto for projeto de mantenedor único.
- [ ] **Licença:** o repositório é público e não declara licença (sem licença, ninguém tem permissão legal de reusar o código). Decisão do dono — o README não traz seção de licença até lá.

---

## 💬 Última conversa

**2026-11-11** — Merge do Kit v1.135.0 e troca do método de trabalho: ASU e FlatDrop saem, entra o modo Code (chat com a pasta vinculada + Claude Code no repo). Instalados `CLAUDE.md`, `.claude/` (settings + skills `apply-wo`/`wrap`/`sondar`), `meta/workorders/_TEMPLATE.md` e `meta/SPEC.md`; CEREBRO e Instruções refeitos sobre o pacote com os transplantes deste projeto; docs vivos migrados ao formato novo; artefatos do ASU movidos para `zz_para-excluir\` na pasta-pai. Ver DEC-012. Nenhuma linha de código do produto mudou. Próximo passo: Flow Fields (último item de F3).

**2026-11-11 (2)** — WO 0001 aplicada pelo Code (`a979fa7`, empurrado): tipo `flow` (Flow Fields) no estilo Organic, versão 0.4.0, F3 concluída, DEC-013. Sonda antes/depois: 312 → 318 chaves, 0 antigas diferentes; `npm run build` ok. Visual NÃO verificado (a sonda só conta hashes/bytes). Próximo passo: dono roda o roteiro visual da Flow Fields; depois escolher a próxima frente (F4 ou backlog; ver ideia da sonda versionada em IDEAS).

**2026-11-12** - WO 0002 aplicada pelo Code (`2d3ac8b`, empurrado): `npm run regress` (318 chaves, DEC-014) e README publico; Flow Fields validada pelo dono (8/8) registrada; backlog ganha licenca e CI atualizado. Sem mudanca em `src/`/`dist/`.

**2026-11-12 (2)** - WO 0003 aplicada pelo Code (`5ca526f`, empurrado): v0.5.0, ciclo de exploracao (Surprise, cadeados, New seed, desfazer/refazer, Like this, previa ao vivo; DEC-015) e FIX-003 (canvas vazio). Regress 0 mudancas; sonda jsdom 18/18 OK; prova de vida width=400. Visual NAO verificado (jsdom nao desenha): roteiro do dono pendente. Fases B e C aguardam decisao do dono.

**2026-11-15** - WO 0004 aplicada pelo Code (`ead6ace`, empurrado): so doc. DEC-016 (Fase B em PT com seletor EN, mockup antes de codigo, ROADMAP renumerado: F4 Exploracao e Interface, F5 Variedade procedural, F6/F7 as antigas F4/F5); defeito «seed sem efeito em 46/53 tipos» (medido pelo chat, nao remedido aqui) em Quebrado. Sem build/regress. Proximo passo: retorno do dono sobre o mockup da F4/B; WO do instrumento de sensibilidade ao seed + lote Botanico (F5).
