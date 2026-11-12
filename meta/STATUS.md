# STATUS.md — Estado Atual

> Arquivo **rolante**: descreve só o AGORA. O assistente lê no início para saber onde retomar.
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log do dia.
> Médio e longo prazo NÃO ficam aqui — ficam no ROADMAP.

---

## Versão Atual
**[0.4.0]** — Flow Fields entregue (tipo `flow` no estilo Organic, DEC-013) e **F3 concluída**. Zero regressão nos 52 tipos anteriores (sonda antes/depois, hashes idênticos). GitHub Pages publicado (`https://joaolucas-nds.github.io/vectorforge/`, redirect de raiz para `dist/vectorforge.html`).

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
- **NOVO — Flow Fields (`flow`, estilo Organic)**: partículas num campo de direções do `snoise`, dentro de um disco; Complexity → densidade, Symmetry → 1–8 cópias rotacionais. Ver DEC-013. Validada visualmente pelo dono em 2026-11-12 (roteiro 8/8) [relatado pelo dono].
- **NOVO — `npm run regress`**: instrumento de regressão versionado (`scripts/regress.mjs` + `scripts/regress-baseline.json`, 318 chaves). Ver DEC-014.
- **NOVO — `README.md` público**: o que é, como abrir (Pages), 9 estilos / 53 tipos, desenvolvimento.

---

## 🔧 Em Progresso

- Nada em curso. F3 concluída em v0.4.0; F4 ainda não aberta — próxima frente a escolher com o dono (ROADMAP F4 ou backlog abaixo).

---

## ❌ Quebrado / Com Problema

- Nenhum bug conhecido no momento.

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
