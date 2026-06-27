# HISTORICO.md — Conhecimento Consolidado

> **Opcional.** Arquivo-baú para conhecimento denso que já foi aprendido e não muda mais — guias técnicos, análises de viabilidade, notas de migração — que tornariam o CONTEXT pesado demais.
> Não é lido no início da sessão; o assistente consulta sob demanda quando o assunto aparece.

---

## 1. Análise de viabilidade: geração procedural de SVG no browser (2026-06-23)

Esta análise foi feita antes da implementação do v0.1.0 para confirmar que o escopo era realizável sem server-side.

**Pergunta central:** é possível gerar ornamentos Art Deco, Baroque, Victorian, Celtic, Islamic, etc. proceduralmente em qualidade suficiente para uso profissional, usando só JS no browser?

**Resposta:** Sim, com as seguintes premissas:

- **SVG é matemática**: toda forma vetorial é descrita por coordenadas e curvas. Com trigonometria básica (`Math.sin`, `Math.cos`, `Math.PI`) e Bézier cúbicas/quadráticas, é possível reproduzir fielmente os padrões geométricos de todos os estilos mencionados.
- **Art Deco**: raios, polígonos regulares, concentricidade → `polyPath()`, `starPath()`, circles + linhas radiais. Padrão matemático simples.
- **Baroque**: scrollwork = curvas Bézier cúbicas com pontos de controle deslocados para fora; foliage = variações asimétricas. Reproduzível sem aleatoriedade, mas seed adiciona variação.
- **Celtic knot**: entrelaçamento real exige grafos de região e algoritmos de planaridade (complexo). A abordagem adotada usa caminhos curvos alternados em raios variáveis — não é um nó celta matematicamente correto, mas visualmente evocativo e suficiente para uso decorativo.
- **Islamic geometry**: estrelas (starPath com n=6,8,10,12) + polígonos nested + tesselações hexagonais. Matematicamente limpo.
- **Organic**: Bézier com pontos de controle deslocados + recursão (branch) + espiral paramétrica.

**Qualidade para uso profissional:** SVG gerado é matematicamente limpo (sem artefatos raster), escalável infinitamente, editável em qualquer editor vetorial. Limite: não é "desenhado à mão" — traços têm aparência paramétrica. Para alguns usos (livros, luxury branding), um artista humano ainda é preferível. Para design digital, social media, templates, é plenamente suficiente.

**Alternativas avaliadas e descartadas:**
- **Potrace / autotrace**: converte raster → vetor; não é procedural, exige imagem de entrada.
- **p5.js / Paper.js**: libs de canvas; adicionariam dependências e não exportam SVG limpo nativamente.
- **D3.js**: excelente para dados, mas overhead desnecessário para formas geométricas puras.
- **Geração via difusão (Stable Diffusion, etc.)**: produz raster, não vetor; incompatível com o requisito de "SVG limpo para Figma/Inkscape".

---

## 2. Guia técnico: como adicionar um novo estilo de arte (referência estável)

Este guia é válido para a arquitetura do v0.1.0. Se a arquitetura mudar significativamente, atualizar aqui.

**Passo a passo para adicionar, ex., o estilo "Bauhaus":**

1. **Adicionar ao array `STYLES`** em `vectorforge.html`:
   ```js
   { id: 'bauhaus', name: 'Bauhaus', icon: 'bhs' }
   ```

2. **Adicionar o ícone SVG** no objeto `icons` dentro de `buildStyleGrid()` — chave `'bhs'`, valor string de elementos SVG no viewBox 40×40.

3. **Registrar os tipos** em `TYPES_BY_STYLE`:
   ```js
   bauhaus: ['composition', 'frame', 'divider', 'circle', 'grid', 'symbol']
   ```

4. **Implementar os geradores** — funções `genBHScomposition(cx, cy, sz, ...)`, etc. Assinatura padrão:
   ```js
   function genBHScomposition(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw) {
     // retorna string com elementos SVG
     return parts.join('\n');
   }
   ```

5. **Registrar no objeto `generators`** dentro de `generateContent()`:
   ```js
   bauhaus: {
     composition: () => genBHScomposition(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw),
     // ...
   }
   ```

6. **Testar**: selecionar o novo estilo na UI, variar todos os parâmetros, testar em canvas 400×400 e 16:9, exportar SVG e abrir no Figma.

**Dica de performance:** se o gerador criar muitos elementos (> 2000 paths), testar em máquinas lentas. SVG com 5000+ elementos pode ter scroll/zoom lento no browser.

---

## 3. Notas sobre compatibilidade de export (2026-06-23)

**SVG exportado pelo VectorForge:**
- Declaração XML: `<?xml version="1.0" encoding="UTF-8"?>`
- Namespace: `xmlns="http://www.w3.org/2000/svg"` no elemento raiz.
- Nenhuma folha de estilo CSS embutida — estilos são inline via atributos (`fill=`, `stroke=`, `stroke-width=`).
- Sem `<defs>`, sem `<use>`, sem `<symbol>` — tudo flat, máxima compatibilidade.

**Compatibilidade testada/esperada:**
- **Figma**: importa SVG diretamente; atributos inline são preservados. ✅
- **Inkscape**: suporte SVG nativo completo. ✅
- **Adobe Illustrator**: importa SVG; atributos inline funcionam. ✅
- **Affinity Designer**: importa SVG; suporte a atributos inline. ✅
- **CorelDraw**: importa SVG via "Importar → SVG"; atributos inline funcionam. ✅ (versões recentes)
- **Canva**: aceita SVG no upload; renderiza via browser engine. ✅ (com limitações de edição)

**PNG @2x**: gerado via `canvas.toBlob()` com escala 2×. 96 DPI × 2 = 192 DPI efetivos, suficiente para print até ~A5 em 150 DPI.

**Pixel Art export**: BUG CONHECIDO — ver STATUS.md. A função `xPNG()` atual não distingue o modo; usa sempre `#main-svg`. Fix planejado para F2.
