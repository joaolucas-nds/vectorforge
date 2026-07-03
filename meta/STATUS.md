# STATUS.md — Estado Atual

> Arquivo **rolante**: descreve só o AGORA. O assistente lê no início para saber onde retomar.
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log da sessão.
> Médio e longo prazo NÃO ficam aqui — ficam no ROADMAP.

---

## Versão Atual
**[0.2.0]** — 2026-06-30 — F2 completa: dois bugs corrigidos, Simplex Noise 2D, gerador Phyllotaxis/Fibonacci, noise orgânico em Leaf e Wave.

---

## ✅ Funcionando

- Tudo do v0.1.0 (8 estilos, 6+ tipos, sliders, paletas, canvas, text→form, pixel art, draw mode, variações, export).
- **`↻ Regenerate`** agora sorteia seed novo a cada click — via `doGenRandom()` (FIX-001).
- **Export PNG no modo Pixel Art** agora exporta o `px-canvas` corretamente via `toBlob()` (FIX-002).
- **Simplex Noise 2D** (`snoise`, `snoiseSetSeed`) — implementação Gustavson, zero deps, reproducível com o seed atual.
- **`genOrganicLeaf`** — pétalas assimétricas naturais via noise nos comprimentos e curvaturas Bézier.
- **`genWave`** — ondas com perturbação noise proporcional à complexity (baixo comp → limpo; alto → orgânico).
- **`genPhyllotaxis`** — novo tipo `phyllotaxis` no estilo Organic: ângulo áureo + noise radial + anéis-guia concêntricos.

---

## 🔧 Em Progresso

- Nada em andamento no momento — F2 encerrou com entrega completa.

---

## ❌ Quebrado / Com Problema

- Nenhum bug conhecido no momento.

---

## 📋 Backlog (curto prazo — itens acionáveis)

- [ ] Adicionar JSDoc às funções geradoras principais (`genADMedallion`, `genBQFrame`, etc.) — F2 não concluiu este item, fica para F3.
- [ ] Testar em Firefox e Safari; documentar comportamentos divergentes do `outerHTML` replacement.
- [ ] Avaliar se `DM Mono` e `Fraunces` do Google Fonts falham graciosamente offline.
- [ ] Revisar `snoiseSetSeed` em `genPixelArt`: pipeline paralelo não passa por `generateContent()`, então não garante seed do noise sincronizado (ver DEC-006 → Consequências).

---

## 📁 Arquivos Críticos (não mexer sem contexto)

- `vectorforge.html` — O aplicativo inteiro. Antes de editar: ler CONTEXT.md (seção "Como o pipeline funciona") + DEC-001 a DEC-008 no DECISIONS.md. Usar instrução ASU datada (`AAAA-MM-DD-asuNNNN.yaml`) para patches; entregar como arquivo para download, nunca como bloco inline.

---

## 💬 Última Sessão

**2026-06-30** — F2 completa: corrigidos FIX-001 (seed do Regenerate) e FIX-002 (export PNG pixel art). Adicionados Simplex Noise 2D, `genPhyllotaxis` (ângulo áureo + noise), noise em `genOrganicLeaf` e `genWave`. Instrução ASU passou por dois ciclos de correção: primeiro o símbolo `↻` no pattern causou falha de match (possível divergência de encoding no copy/paste), depois a segunda execução falhou corretamente porque o patch já estava aplicado. DEC-006 a DEC-008 registradas. Próximo passo: F3 — motor L-System + esbuild para separar módulos.
