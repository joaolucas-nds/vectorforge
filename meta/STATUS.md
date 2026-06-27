# STATUS.md — Estado Atual

> Arquivo **rolante**: descreve só o AGORA. O assistente lê no início para saber onde retomar.
> Item resolvido SAI daqui — vai para o CHANGELOG (se foi entrega) e/ou para o log da sessão.
> Médio e longo prazo NÃO ficam aqui — ficam no ROADMAP.

---

## Versão Atual
**[0.1.0]** — 2026-06-23 — Primeira entrega funcional: gerador procedural completo com 8 estilos, export SVG/PNG e modo pixel art.

---

## ✅ Funcionando

- **8 estilos de arte** com geradores procedurais próprios: Art Deco, Baroque, Geometric, Victorian, Celtic, Islamic, Minimal, Organic.
- **6 tipos de saída por estilo** (medallion, frame, divider, ornament, pattern, corner/knot/star/etc.).
- **5 sliders de parâmetro**: Complexity, Symmetry, Stroke width, Fill opacity, Seed.
- **Canvas size** customizável (50–3000px) com presets: 1:1, 4:3, 16:9, 3:4, A4.
- **8 paletas de cor**: Noir & Gold, Midnight, Sepia, Cobalt, Forest, Crimson, Lilac, Copper.
- **Text → Form**: caixa de texto com tipografia selecionável (5 famílias) que gera glyph decorado.
- **4 variações automáticas** geradas com seeds offset (+0/+111/+222/+333), clicáveis.
- **Export SVG** (download limpo com `<?xml ...>`), **PNG @2x** (via Canvas API) e **Copy SVG code**.
- **Modo Pixel Art**: gerador por pixel com simetria radial e paleta aplicada.
- **Modo Draw (freehand)**: esboço livre no canvas → converte bounding box em ornamento.
- **Controles de canvas**: zoom (−/Fit/+), toggle background escuro/claro, grid de referência.
- **UI dark theme** com identidade visual própria (DM Mono + Fraunces, accent dourado).
- **Regenerate** no topbar: regera com seed aleatório novo (na verdade roda `doGen()` com parâmetros atuais — nota: não randomiza seed automaticamente; ver Backlog).

---

## 🔧 Em Progresso

- Nada em andamento no momento — sessão inaugural encerrou com entrega completa.

---

## ❌ Quebrado / Com Problema

- **Export PNG no modo Pixel Art** — `xPNG()` lê `#main-svg` (SVG); o pixel art está num `<canvas>` separado (`#px-canvas`). Exportar PNG no modo pixel art baixa o SVG anterior, não o pixel art visível. Suspeita: função de export não distingue o modo atual. (Ver armadilha no CONTEXT.md.)
- **Botão "↻ Regenerate" no topbar não randomiza o seed** — chama `doGen()` com o seed atual; só regenera com parâmetros iguais, o que é idempotente. Para variação real, o usuário precisa mover o slider de Seed manualmente.

---

## 📋 Backlog (curto prazo — itens acionáveis)

- [ ] Corrigir export PNG no modo Pixel Art (`px-canvas.toBlob()` direto).
- [ ] Fazer botão "↻ Regenerate" sortear um seed aleatório antes de chamar `doGen()`.
- [ ] Adicionar comentários JSDoc às funções geradoras principais (CONTEXT.md já lista a convenção).
- [ ] Testar abertura do arquivo em Firefox (comportamento de `outerHTML` replacement pode diferir).
- [ ] Avaliar se `DM Mono` e `Fraunces` do Google Fonts falham graciosamente offline (fallback `monospace`/`serif` já existe no CSS).

---

## 📁 Arquivos Críticos (não mexer sem contexto)

- `vectorforge.html` — O aplicativo inteiro. Antes de editar: ler CONTEXT.md (seção "Como o pipeline funciona") + DEC-001 a DEC-005 no DECISIONS.md. Usar instrução ASU para patches; nunca editar a mão sem backup.

---

## 💬 Última Sessão

**2026-06-23** — Sessão inaugural. Concebido e entregue o `vectorforge.html` v0.1.0 completo: 8 estilos procedurais, 48 combinações estilo×tipo, export SVG/PNG, pixel art, draw mode, variações, paletas e controles de canvas. Documentação de contexto gerada e preenchida. Dois bugs identificados (export PNG no pixel art, seed do Regenerate). Próximo passo óbvio: corrigir os dois bugs do backlog via instrução ASU.
