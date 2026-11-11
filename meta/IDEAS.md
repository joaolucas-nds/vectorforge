# IDEAS.md — Brainstorm e Visão

> **Segundo cérebro** do projeto. Captura TUDO que for mencionado, mesmo solto ou no meio de outro assunto.
> Nunca perde: ideia implementada vai para «Concluídas»; ideia recusada vai para «Descartadas» com o motivo.
> Separar por autor (você × assistente) ajuda a lembrar de onde veio cada coisa.

---

## 💡 Ideias Ativas — Usuário

### 2026-06 — Geração a partir de ruído
Começar a arte a partir de um ruído base (Perlin, simplex ou similar) em vez de formas geométricas puras. Permitiria estilos mais orgânicos e imprevisíveis como ponto de partida. Mencionado como possibilidade na concepção inicial. **Parcialmente concluída em v0.2.0** (Simplex Noise integrado em Leaf e Wave, e como perturbação no Phyllotaxis) — o modo "geração starting from noise" como estilo inteiro fica para F3/F4.

### 2026-06 — Geração guiada por sequência de Fibonacci / proporção áurea
Usar phi (φ ≈ 1.618) para determinar espaçamentos, raios e proporções internas. Ideia original do usuário. **Parcialmente concluída em v0.2.0** com `genPhyllotaxis` (ângulo áureo como princípio organizador). Proporção áurea como parâmetro explícito em outros geradores (raios, camadas) fica para F3/F4.

### 2026-06 — Export para formatos de ferramentas (AI, EPS, PDF)
Usuário mencionou CorelDraw, Affinity, Figma, Canva como destinos. SVG já é importável em todos; mas `.ai` (Illustrator) e `.eps` abririam mais portas. Requer lib server-side ou WASM; fora do escopo do arquivo único por enquanto.

### 2026-06 — Compatibilidade direta com Canva / Figma via plugin
Em vez de exportar arquivo, ter um plugin nativo que puxa o SVG gerado diretamente para o frame. Elevaria muito o valor de produto mas exigiria APIs de terceiros e processo de aprovação.

---

## 🤖 Ideias Ativas — Assistente

### 2026-06-23 — Undo stack para o modo Draw
Cada `convertDrawToOrnament()` adiciona um `<g>` ao SVG. Manter um array de referências a esses `<g>` permitiria Ctrl+Z para remover o último ornamento adicionado. Baixa complexidade (push/pop de referências DOM), alto valor UX.

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

### 2026-06-30 — Verificar seed de noise em genPixelArt (débito técnico F3)
`genPixelArt()` é pipeline paralelo que não passa por `generateContent()`. Se futuramente um gerador de pixel art baseado em `snoise` for adicionado, precisa chamar `snoiseSetSeed()` explicitamente; do contrário, usará tabela residual da última geração SVG. Baixo risco agora (pixel art atual não usa noise), alto risco se expandido.

### 2026-11-11 — Promover a comparação antes/depois a instrumento versionado
Terceira vez que o projeto compara a saída de todos os geradores antes e depois de uma mudança (DEC-010 com Playwright, DEC-011, e agora a sonda `261111-sonda-flow.mjs`, Node + esbuild, sem browser). Pela regra do kit, sonda rodada uma segunda vez para comparar já é instrumento sem teste. Candidato: `scripts/regress.mjs` versionado + `npm run regress`, saindo com código de erro quando uma chave antiga muda. Decisão do dono.

### 2026-06-30 — Voronoi/Worley (F3 ou F4)
Diagrama de Voronoi para tesselações islâmicas variáveis e padrão celular orgânico. Implementável com Fortune's algorithm em ~100 linhas ou via `d3-delaunay` (2KB). Worley noise (distância ao ponto Voronoi mais próximo) para texturas de pedra/osso.

### 2026-06-23 — Adicionar JSDoc a todas as funções geradoras
As funções `genADMedallion`, `genBQFrame`, etc. ainda sem docstrings completas. Convenção do projeto exige docstring em toda função pública. Baixo esforço (tarefa direta para o Claude Code); melhora manutenibilidade. (Parcialmente feito em v0.2.0 — novos geradores já têm JSDoc; os antigos ficam pendentes.)

### 2026-07-07 — Verificação por comparação headless em migrações de código (F4+ ou qualquer refactor grande)
Durante a divisão de `vectorforge.html` em módulos (DEC-010), a técnica que pegou os 4 bugs reais antes da entrega foi: renderizar TODAS as combinações relevantes (aqui, as 49 de `TYPES_BY_STYLE`) em Chromium headless (Playwright) tanto na versão antiga quanto na nova, com o mesmo seed, e comparar a saída byte-a-byte. Vale generalizar como prática padrão para qualquer refactor grande futuro (ex.: quando o motor L-System for integrado, comparar saída antes/depois nos estilos que não deveriam ter mudado). Custo: ~alguns minutos de execução; benefício: pega regressões silenciosas que smoke-test manual não pegaria (ex.: `onclick` que não faz nada, sem erro no console).

---

## 🛌 Adiadas
> Decisão consciente de não fazer agora. Cada item com **o gatilho que a traz de volta**.
- **Reaction-Diffusion (F4 ou além)** — adiada porque grids de simulação 200×200 com 500 timesteps em JS puro têm perf questionável sem WebGL/Web Worker — **volta quando** Flow Fields e Voronoi estiverem entregues e estáveis. *(Movida de «Descartadas», onde estava marcada «adiada, não descartada», em 2026-11-11.)*

---

## ✅ Concluídas

- **Gerador procedural completo com 8 estilos** — implementado em v0.1.0.
- **Text → Form (glyph com tipografia)** — implementado em v0.1.0 com 5 famílias de fonte.
- **Modo Pixel Art** — implementado em v0.1.0 com simetria radial e paleta.
- **Modo Draw freehand** — implementado em v0.1.0 com conversão bounding-box → ornamento.
- **4 variações automáticas por seed** — implementado em v0.1.0.
- **Export SVG + PNG @2x + Copy SVG** — implementado em v0.1.0.
- **PRNG seeded para reproducibilidade** — implementado em v0.1.0 (DEC-003).
- **FIX-001: Regenerate sorteia seed** — implementado em v0.2.0 (FIX-001).
- **FIX-002: Export PNG pixel art corrigido** — implementado em v0.2.0 (FIX-002).
- **Simplex Noise 2D (snoise)** — implementado em v0.2.0 (DEC-006).
- **genPhyllotaxis (ângulo áureo)** — implementado em v0.2.0.
- **genOrganicLeaf com noise orgânico** — implementado em v0.2.0.
- **genWave com noise orgânico** — implementado em v0.2.0.
- **Build step com esbuild (F3)** — implementado em 2026-07-07 (DEC-010): `vectorforge.html` dividido em 16 módulos ES sob `src/`, `npm run build` gera `dist/vectorforge.html`. Zero mudança de comportamento, verificada byte-a-byte.
- **Motor L-System + estilo Botanical (F3)** — implementado em 2026-07-24 (DEC-011): `lsystemExpand`/`turtleToPath` + 3 presets (tree/koch/dragon) em `src/generators/botanical.js`. Zero regressão nos 8 estilos anteriores, verificada byte-a-byte.
- **Flow Fields (F3)** — implementada em v0.4.0 (DEC-013): tipo `flow` no Organic, `genFlowField`. Ideia original (2026-06-30) previa ~120 linhas e 500 partículas × 200 passos; a versão entregue usa 30–120 partículas × 40–120 passos num disco, porque o tamanho do SVG (não o tempo) era o gargalo.

---

## 🚫 Descartadas

- **Usar IA (API Anthropic) para gerar os ornamentos** — descartada porque latência + custo quebrariam a proposta de zero-dependência e uso offline. O procedural puro é mais rápido e determinístico.
- **Usar Inkscape/server-side para conversão** — descartada; SVG direto do browser é suficiente para todas as ferramentas destino.
- **Python como backend gerador** — descartada (análise sessão 2026-06-30): quebraria a proposta de `file://` / zero setup. JS vanilla cobre tudo que Python oferece matematicamente para este caso (Simplex, L-systems, Voronoi), sem a latência de rede e sem exigir servidor.

---

## 📮 Feedback para o Kit

### 2026-06-23 — Sessão inaugural de projeto novo sem histórico
Nesta primeira sessão, todos os templates do kit estavam vazios. O assistente precisou inferir a realidade do projeto inteiramente a partir do `vectorforge.html` e da conversa. Sugestão para o Kit: adicionar instrução explícita sobre como proceder quando o projeto é recém-criado e não há CONTEXT/STATUS preenchidos — o assistente deve fazer a leitura do código-fonte antes de gerar a documentação.

### 2026-06-30 — Modelo híbrido ASU/arquivo completo para docs (DEC-007)
O Kit prescreve o mesmo mecanismo de entrega (bloco YAML inline) para código e docs. Na prática, documentação rolante (STATUS, CHANGELOG, IDEAS) não mapeia bem para patch cirúrgico: edições são holísticas, o ganho de token em arquivos de 4–8KB não compensa perder a garantia de integridade. Sugestão para o Kit: adicionar diretriz sobre quando preferir arquivo completo vs. ASU — código grande (>20KB) → ASU; docs → arquivo completo por padrão, ASU só para seções isoladas e estáveis (ex.: nova DEC-N no DECISIONS.md com heading único).

### 2026-06-30 — Entrega de instrução ASU como arquivo para download (DEC-008)
O padrão atual prescreve bloco YAML inline. Copiar/colar blocos com caracteres Unicode (setas, box-drawing dashes) em âncoras de patch tem risco real de divergência de encoding (confirmado em sessão 2026-06-30: `↻` em pattern falhou). Sugestão para o Kit: mudar o padrão para entrega como arquivo `.yaml` datado/numerado (`AAAA-MM-DD-asuNNNN.yaml`) — elimina step manual de copiar/colar, resolve por construção o problema de "rodar mesma instrução duas vezes por engano", e resolve o risco de encoding.

### 2026-07-03 — Convergência confirmada: Kit validou DEC-007/DEC-008 de forma independente
A atualização do Kit trazida pelo usuário nesta data (`instrucoes-dev__template-update.txt`) formalizou, sem que tivéssemos avisado ninguém do time do Kit, exatamente os dois pontos que tínhamos especulado como "candidatos a reavaliar no futuro" em DEC-007: (a) ASU pode tocar docs de heading estável (DECISIONS/CONTEXT), não só código; (b) entrega de instrução ASU sempre como arquivo para download é o novo padrão, não só bloco inline. Isso não gerou um feedback novo para o Kit — é uma confirmação de que o Kit chegou à mesma conclusão pelo próprio caminho. Registrado aqui só para fechar o loop e não reabrir a discussão. Ver DEC-009 em DECISIONS.md para a integração formal deste projeto.

### 2026-07-24 — Convenção de nome de instrução ASU mudou: `AAAA-MM-DD-asuNNNN.yaml` → `AAMMDD-asuNNNN.yaml`
O usuário trouxe, como adendo direto nas instruções (não como atualização formal de arquivo do Kit), uma convenção de nome mais compacta para a instrução ASU — ano com 2 dígitos, sem hífens entre ano/mês/dia (`260724-asu0001.yaml` em vez de `2026-07-24-asu0001.yaml`). Isso substitui o formato específico fixado em DEC-008 (o *princípio* de DEC-008 — sempre entregar como arquivo para download — continua valendo; só o *formato do nome* mudou). Aplicado a partir desta sessão. Não abri uma DEC nova para isso por ser um detalhe de nomenclatura, não uma decisão de arquitetura — mas fica registrado aqui para não reabrir dúvida se `AAAA-MM-DD` reaparecer em alguma instrução antiga como referência.

### 2026-11-11 — Merge v1.135.0 num projeto ~40 versões atrás, com troca ASU→Code
Três observações do merge: (1) o manifesto listava 4 linhas revogadas, mas a varredura pelo fato achou 51 linhas afetadas, quase todas o par «sessão/turno» espalhado em CEREBRO, Instruções, STATUS, CONTEXT, LOG-TEMPLATE e GLOSSARY — o «número é piso» do manifesto se confirmou; (2) a skill `wrap` do pacote cita `INSTRUCOES-DO-PROJETO.md` por nome fixo — projeto com outro nome precisa especializar a skill (feito aqui); seria mais robusto a skill dizer «o arquivo de Instruções do projeto (ver CLAUDE.md)»; (3) migrar de modo deixou artefatos do modo antigo fora do repo (backups do aplicador ASU na pasta-pai) que nenhum template cobre — vale o manifesto lembrar de procurar sobras de ferramenta FORA do repo também. Desvios registrados em DEC-012: nomes `INSTRUCOES-PROJETO.md` e `HISTORICO.md` mantidos; `.flatdropignore` dispensado.

---

## 📮 Feedback para o ASU *(encerrado em 2026-11-11 — ASU descontinuado, DEC-012; mantido como histórico)*

*(Canal separado do Kit — sugestões para o desenvolvedor da ferramenta, não para o Kit de Contexto.)*

### 2026-06-30 — Fuzzy-match de "já aplicado" na mensagem de erro
Quando um `replace_line_pattern` falha com "casou 0 vez(es)", a ferramenta poderia tentar um fuzzy-match: se o `new_content` da instrução está presente no arquivo mas o `pattern` não está, provavelmente a modificação já foi aplicada. Sugestão: detectar esse caso e apresentar "Aviso: pattern não encontrado, mas o new_content esperado já existe na linha X — esta modificação pode já ter sido aplicada" em vez de "Falha" vermelha, que induz a re-executar desnecessariamente.

### 2026-06-30 — Ledger de instruções aplicadas
Um arquivo `.asu-applied.json` na raiz do projeto (ou hash do conteúdo de cada `new_content` já presente no arquivo alvo) permitiria distinguir "pattern não existe porque nunca existiu" de "pattern não existe porque já foi substituído com sucesso". O segundo caso deveria ser aviso informativo, não falha que aborta o resto da instrução.

### 2026-06-30 — Aviso sobre caracteres não-ASCII em âncoras
O guia já é rigoroso sobre indentação exata; vale adicionar nota explícita recomendando evitar caracteres Unicode não-ASCII (setas, box-drawing) como literais em `pattern`/`before`/`after`. Sugestão prática: preferir `.*` para saltar sobre eles e ancorar em texto ASCII estável ao redor — é uma prática que evita um round-trip de debug independente da causa (corrupção de encoding, diferença de plataforma, copy/paste). O guia poderia incluir este caso como exemplo na tabela de "O que NÃO fazer".

### 2026-07-24 — Confirmação prática: acentuação em português também quebra âncora, não só símbolos
Ao gerar a instrução para DEC-011, escrevi uma âncora com "correc" (sem cedilha) esperando que ela fosse prefixo de "correções" — mas "correções" é c-o-r-r-e-**ç**-õ-e-s: o "ç" vem logo depois do "e", não existe um "c" puro ali. A âncora falhou silenciosamente na validação local (0 matches) até eu inspecionar caractere a caractere. Isso é uma instância nova do padrão já registrado em 2026-06-30 (âncoras não-ASCII), mas mostra que o risco não é só de símbolos "exóticos" (setas, box-drawing) — palavras comuns em PT-BR com acento/cedilha têm o mesmo problema, e são muito mais fáceis de "achar que é ASCII" porque visualmente parecem uma palavra normal. Reforça a sugestão: para qualquer projeto com docs em PT-BR, vale o ASU (ou o gerador da instrução) sinalizar quando uma âncora contém um caractere fora do intervalo ASCII básico, independente de "parecer" um símbolo especial ou uma letra acentuada comum.
