# IDEAS.md — Brainstorm e Visão

> **Segundo cérebro** do projeto. Captura TUDO que for mencionado, mesmo solto ou no meio de outro assunto.
> Nunca perde: ideia implementada vai para «Concluídas»; ideia recusada vai para «Descartadas» com o motivo.
> Separar por autor (você × assistente) ajuda a lembrar de onde veio cada coisa.

---

## 💡 Ideias Ativas — Usuário

### 2026-06 — Geração a partir de ruído
Começar a arte a partir de um ruído base (Perlin, simplex ou similar) em vez de formas geométricas puras. Permitiria estilos mais orgânicos e imprevisíveis como ponto de partida. Mencionado como possibilidade na concepção inicial.

### 2026-06 — Geração guiada por sequência de Fibonacci / proporção áurea
Usar phi (φ ≈ 1.618) para determinar espaçamentos, raios e proporções internas. Ideia original do usuário ("com fibonacci kkkkkk"). Geradores de spirais já fazem algo próximo implicitamente; poderia ser um modo explícito ou um parâmetro dedicado.

### 2026-06 — Export para formatos de ferramentas (AI, EPS, PDF)
Usuário mencionou CorelDraw, Affinity, Figma, Canva como destinos. SVG já é importável em todos; mas `.ai` (Illustrator) e `.eps` abririam mais portas. Requer lib server-side ou WASM; fora do escopo do arquivo único por enquanto.

### 2026-06 — Compatibilidade direta com Canva / Figma via plugin
Em vez de exportar arquivo, ter um plugin nativo que puxa o SVG gerado diretamente para o frame. Elevaria muito o valor de produto mas exigiria APIs de terceiros e processo de aprovação.

---

## 🤖 Ideias Ativas — Assistente

### 2026-06-23 — Undo stack para o modo Draw
Cada `convertDrawToOrnament()` adiciona um `<g>` ao SVG. Manter um array de referências a esses `<g>` permitiria Ctrl+Z para remover o último ornamento adicionado. Baixa complexidade (push/pop de referências DOM), alto valor UX.

### 2026-06-23 — Randomize seed no botão Regenerate
Bug atual: "↻ Regenerate" chama `doGen()` com seed igual → idempotente. Fix simples: antes de chamar `doGen()`, sortear `state.seed = Math.ceil(Math.random() * 999)` e atualizar o slider. Uma linha de código.

### 2026-06-23 — Modo "Combinar estilos" (style blending)
Misturar dois geradores: ex. 70% Art Deco + 30% Celtic. Implementável como interpolação de parâmetros ou como chamada de dois geradores com composição de `<g>`. Complexidade média; resultado potencialmente muito interessante.

### 2026-06-23 — Preset gallery (biblioteca de seeds favoritos)
Um painel lateral que permite salvar/carregar configurações completas (estilo, tipo, parâmetros, seed, paleta) via `localStorage`. O usuário monta sua biblioteca pessoal de ornamentos favoritos. Implementação: serializar `state` como JSON em `localStorage`.

### 2026-06-23 — Gerador de padrão de repetição (pattern fill / seamless tile)
Gerar um tile SVG com `<pattern>` e `patternUnits="userSpaceOnUse"` que pode ser aplicado como preenchimento. Especialmente útil para tessellations e Islamic girih. O SVG `<pattern>` é suportado por todas as ferramentas destino.

### 2026-06-23 — Modo "Animado" (SVG com CSS animation)
Adicionar `<style>` com keyframes ao SVG exportado para criar ornamentos com rotação lenta, pulso ou fade. Útil para motion design e web. Requer flag "include animation" no export para não quebrar uso estático.

### 2026-06-23 — Parâmetro de escala por região (hotspot gravity)
Definir um ponto de "peso" no canvas onde a complexidade se concentra (clique para definir hotspot). Os geradores usariam a distância ao hotspot para variar density/size localmente. Ideia mais avançada; exigiria refatoração nos geradores.

### 2026-06-23 — Export PNG no modo Pixel Art (bug fix prioritário)
`xPNG()` atual usa `#main-svg`; no modo pixel art precisa usar `document.getElementById('px-canvas').toBlob()`. Fix rápido e necessário.

### 2026-06-23 — Adicionar JSDoc a todas as funções geradoras
As funções `genADMedallion`, `genBQFrame`, etc. não têm docstrings. Convenção do projeto exige docstring em toda função pública. Baixo esforço via ASU; melhora manutenibilidade.

---

## ✅ Concluídas

- **Gerador procedural completo com 8 estilos** — implementado em v0.1.0 / ver CHANGELOG [0.1.0].
- **Text → Form (glyph com tipografia)** — implementado em v0.1.0 com 5 famílias de fonte.
- **Modo Pixel Art** — implementado em v0.1.0 com simetria radial e paleta.
- **Modo Draw freehand** — implementado em v0.1.0 com conversão bounding-box → ornamento.
- **4 variações automáticas por seed** — implementado em v0.1.0.
- **Export SVG + PNG @2x + Copy SVG** — implementado em v0.1.0.
- **PRNG seeded para reproducibilidade** — implementado em v0.1.0 (DEC-003).

---

## 🚫 Descartadas

- **Usar IA (API Anthropic) para gerar os ornamentos** — descartada porque latência + custo quebrariam a proposta de zero-dependência e uso offline. O procedural puro é mais rápido e determinístico para este caso.
- **Usar Inkscape/server-side para conversão** — descartada; SVG direto do browser é suficiente para todas as ferramentas destino mencionadas pelo usuário.

---

## 📝 Feedback para o Kit

### 2026-06-23 — Sessão inaugural de projeto novo sem histórico
Nesta primeira sessão, todos os templates do kit estavam vazios. O assistente precisou inferir a realidade do projeto inteiramente a partir do `vectorforge.html` e da conversa. Sugestão para o Kit: adicionar uma instrução explícita sobre como proceder quando o projeto é recém-criado e não há CONTEXT/STATUS preenchidos — o assistente deve fazer a leitura do código-fonte antes de gerar a documentação.
