# DECISIONS.md — Registro de Decisões

> Arquivo que **cresce devagar**. Guarda o PORQUÊ — o que o código sozinho não conta.
> Duas naturezas: **DEC** (decisões de arquitetura/design) e **FIX** (bugs graves resolvidos, para não repetir).
> Não reescreva entradas antigas; se uma decisão for substituída, marque «SUPERADA por DEC-N» e adicione a nova.
> Quando passar de ~700 linhas, mova as mais antigas para `DECISIONS-archive.md`.

---

## DEC-001 — Arquivo HTML único, sem build e sem framework
**Data:** 2026-06-23 · **Status:** aceita — **ver nota em DEC-010:** o *output* continua sendo um `.html` único; o que DEC-010 muda é só o fluxo de desenvolvimento (agora há um build step opcional entre `src/` e `dist/`).

### Contexto
O projeto precisava ser abrível em qualquer máquina sem instalação de Node, Python ou qualquer runtime. A alternativa seria um projeto Vite/React com bundler, mas isso adicionaria fricção no setup e complicaria a distribuição como arquivo único.

### Decisão
Toda a aplicação (HTML, CSS, JS) vive em um único `vectorforge.html`. Zero dependências de runtime; única dependência externa são as fontes do Google Fonts (removível com fallback).

### Alternativas consideradas
- **React + Vite** — DX melhor, mas exige Node e processo de build; arquivo final ainda seria um bundle, não editável diretamente.
- **Web Components** — mais modular, mas sem ganho real para um app de arquivo único.

### Consequências
- Distribuição trivial: compartilhar o `.html` já é o deploy.
- Edições devem ser cirúrgicas (via ASU) para não perder rastreabilidade.
- Sem tree-shaking: todo o JS está sempre carregado (aceitável no tamanho atual ~80KB).
- Sem testes unitários nativos — testar manualmente no browser.

---

## DEC-002 — Geradores são funções puras que retornam string SVG
**Data:** 2026-06-23 · **Status:** aceita

### Contexto
Precisávamos de uma arquitetura para os geradores que fosse fácil de adicionar, testar e compor. A alternativa era manipular o DOM diretamente dentro de cada gerador.

### Decisão
Cada função geradora (`genADMedallion`, `genBQFrame`, etc.) recebe apenas parâmetros matemáticos e retorna uma string com elementos SVG. Nenhum gerador toca o DOM.

### Alternativas consideradas
- **Geradores que manipulam DOM** — mais fácil de depurar visualmente, mas acopla a lógica ao DOM e dificulta gerar thumbnails (as Variations).
- **Geradores que retornam objetos** — mais tipado, mas adiciona uma etapa de serialização desnecessária.

### Consequências
- Geradores podem ser chamados com dimensões diferentes (canvas principal vs. thumbnails 60×60) sem nenhuma mudança.
- Fácil adicionar novo estilo: criar funções geradoras + registrar em `generators` + registrar em `TYPES_BY_STYLE`.
- String concatenation pode ser lenta para geradores muito complexos (aceitável para SVG de até alguns milhares de elementos).

---

## DEC-003 — PRNG seeded (xorshift multiplicativo) para reproducibilidade
**Data:** 2026-06-23 · **Status:** aceita

### Contexto
O sistema de Variations precisa gerar 4 variações determinísticas a partir do seed atual (+0, +111, +222, +333). Sem PRNG seeded, `Math.random()` tornaria cada chamada não-reproducível.

### Decisão
Usar `mkRand(seed)` que implementa xorshift multiplicativo e retorna um closure. Cada chamada ao gerador recebe sua própria instância de PRNG com o seed correto.

### Alternativas consideradas
- **`Math.random()` puro** — simples, mas não reproducível; Variations não funcionariam.
- **`crypto.getRandomValues()`** — mais seguro, mas sem suporte a seed; inapropriado aqui.

### Consequências
- Seed idêntico + parâmetros idênticos = resultado SVG byte-a-byte idêntico sempre.
- Usuário pode anotar/compartilhar um seed para replicar um resultado específico.
- A qualidade estatística do PRNG não é criptográfica (ok — é arte procedural, não segurança).

---

## DEC-004 — `outerHTML` replacement para atualizar o canvas SVG
**Data:** 2026-06-23 · **Status:** aceita

### Contexto
Ao gerar, o `viewBox` e as dimensões do `<svg>` mudam junto com o conteúdo. Seria possível usar `innerHTML` para trocar só os filhos, mas as dimensões e o `viewBox` do elemento raiz também precisam ser atualizados.

### Decisão
`doGen()` monta a string SVG completa e faz `element.outerHTML = svgMarkup`. Após o replacement, um `setTimeout(callback, 20)` re-queries o DOM antes de chamar `fitToView()` e `generateVariations()`.

### Alternativas consideradas
- **`innerHTML` + setAttribute** — possível, mas mais verboso e propenso a deixar atributos obsoletos no elemento raiz.
- **Criar novo elemento SVG e substituir no DOM** — equivalente ao outerHTML, mas mais código.

### Consequências
- **Armadilha documentada:** qualquer referência cacheada a `#main-svg` fica inválida após `doGen()`. Sempre re-query.
- O `setTimeout(20ms)` é um timing empírico; pode falhar em máquinas muito lentas. Se o bug aparecer, aumentar ou usar `requestAnimationFrame`.

---

## DEC-005 — Modo Draw é aditivo: coloca `<g>` no SVG existente
**Data:** 2026-06-23 · **Status:** aceita

### Contexto
O modo freehand draw converte o traço do usuário em um ornamento. A decisão era se ele deveria substituir o conteúdo do canvas ou adicionar ao conteúdo existente.

### Decisão
`convertDrawToOrnament()` cria um `<g>` com o conteúdo gerado e dá `appendChild` no SVG atual — sem limpar o fundo. O resultado é composição aditiva.

### Alternativas consideradas
- **Substituir o canvas inteiro** — mais previsível, mas destrói composições anteriores; o usuário perderia o trabalho acumulado.
- **Undo stack** — ideal a longo prazo, mas complexidade não justificada na v0.1.

### Consequências
- O usuário pode compor múltiplos ornamentos desenhando várias vezes — comportamento desejável.
- O SVG exportado contém todos os elementos acumulados — também desejável.
- Não há "desfazer" — uma vez adicionado, só regerar do zero remove. (Ver IDEAS.md para undo stack futuro.)
- O export SVG exporta a composição completa, incluindo os `<g>` adicionados pelo draw mode.

---

## FIX-001 — Botão "↻ Regenerate" não sorteava seed novo
**Data:** 2026-06-30

- **Sintoma:** clicar em "↻ Regenerate" no topbar não produzia nenhuma variação visual; o resultado era idêntico ao anterior.
- **Causa raiz:** o `onclick` do botão chamava `doGen()` diretamente, que lê `state.seed` do slider atual sem alterá-lo. Sem mudança de seed, o PRNG determinístico (`mkRand`) sempre retorna a mesma sequência — o botão era, na prática, idempotente.
- **Solução:** novo handler `doGenRandom()` sorteia `state.seed = Math.ceil(Math.random() * 999)`, sincroniza o slider e o display (`#s-seed`, `#sv-seed`), e só então chama `doGen()`. O `onclick` do botão passou a apontar para `doGenRandom()`.
- **Lição:** qualquer botão de "atalho" que pareça repetir uma ação precisa ser conferido quanto a side-effects esperados (aqui, randomização) — não basta repetir a função de geração; o estado que a alimenta precisa mudar primeiro.

---

## FIX-002 — Export PNG no modo Pixel Art baixava o SVG anterior
**Data:** 2026-06-30

- **Sintoma:** no modo Pixel Art, clicar em "↓ PNG" baixava uma imagem do último SVG vetorial gerado, não do pixel art visível no canvas.
- **Causa raiz:** `xPNG()` sempre lia `#main-svg` via `getSVGString()`, sem checar `state.mode`. O Pixel Art vive num elemento `<canvas id="px-canvas">` totalmente separado (pipeline paralelo, ver Armadilha 3 no CONTEXT.md) — a função de export nunca olhava para ele.
- **Solução:** `xPNG()` agora checa `state.mode === 'pixel'` primeiro; se verdadeiro, cria um canvas intermediário, desenha `px-canvas` nele com `imageSmoothingEnabled = false` (preserva o aspecto pixelado no upscale) e exporta via `toBlob()`. Caso contrário, mantém o fluxo SVG→canvas@2x original.
- **Lição:** features que compartilham um botão de UI mas usam pipelines de dados diferentes (SVG vs Canvas 2D) precisam de despacho explícito por modo dentro da função compartilhada — confirma a Armadilha 3 já documentada no CONTEXT.md.

---

## DEC-006 — Simplex Noise seeded via `mkRand`, inicializado por geração
**Data:** 2026-06-30 · **Status:** aceita

### Contexto
O ruído branco do `mkRand()` original não tem coerência espacial: pontos vizinhos não têm valores parecidos, então não dá para gerar transições suaves (densidade crescente do centro pra borda, ondas com textura orgânica, pétalas com curvatura assimétrica natural). Era preciso um ruído gradiente.

### Decisão
Implementar Simplex Noise 2D (algoritmo de Stefan Gustavson, domínio público/MIT, ~80 linhas, zero dependências) como `snoise(x, y)`. A tabela de permutação não é fixa — `snoiseSetSeed(seed)` a reembaralha deterministicamente via `mkRand(seed)`, e é chamada no início de `generateContent()`, antes de qualquer gerador rodar.

### Alternativas consideradas
- **Perlin noise clássico** — mais conhecido, mas tem artefatos de grade quadrada visíveis em baixa frequência; Simplex é isotrópico e mais limpo para ornamentos.
- **Ruído de valor (value noise) simples** — mais barato computacionalmente, mas produz gradientes com "facetas" visíveis; pior para curvas orgânicas.
- **Biblioteca externa (ex. `simplex-noise` via npm)** — quebraria DEC-001 (zero dependências de runtime / arquivo único).

### Consequências
- **Nova armadilha:** `snoise()` só é reprodutível se `snoiseSetSeed()` rodou antes com o seed correto. Isso é garantido automaticamente dentro de `generateContent()` — mas `genPixelArt()` é um pipeline paralelo que **não** passa por `generateContent()` (ver Armadilha 3). Se um gerador de pixel art baseado em noise for adicionado no futuro, ele precisa chamar `snoiseSetSeed()` explicitamente, ou vai usar uma tabela de permutação desatualizada/imprevisível.
- Seed idêntico + parâmetros idênticos continuam produzindo SVG byte-a-byte idêntico (a garantia do DEC-003 se estende ao noise).
- Abre caminho para Flow Fields e qualquer gerador futuro que precise de campo de ruído coerente (ver IDEAS.md, F3).

---

## DEC-007 — Modelo híbrido: ASU para código, arquivo completo para documentação rolante
**Data:** 2026-06-30 · **Status:** substituída por DEC-012 (2026-11-11; antes, parcialmente por DEC-009) — o corpo abaixo é registro histórico.

### Contexto
Após o ASU funcionar bem no `vectorforge.html` (86KB, patch cirúrgico evita reenviar o arquivo inteiro), surgiu a pergunta de usar o mesmo mecanismo nos arquivos de documentação (STATUS, CHANGELOG, IDEAS, DECISIONS, CONTEXT, GLOSSARY).

### Decisão
ASU fica reservado para código (`vectorforge.html` e futuros módulos `.js`). Documentação continua sendo entregue como arquivo completo regenerado, especialmente STATUS.md, CHANGELOG.md e IDEAS.md — arquivos "rolantes" cuja edição é inerentemente holística (mover item resolvido de seção, checar que nada foi perdido ao reclassificar uma ideia) e não mapeia bem para um patch cirúrgico de uma seção isolada.

### Alternativas consideradas
- **ASU em tudo, incluindo docs** — tecnicamente viável via `type: markdown` + `replace_section` (headings de DECISIONS.md e IDEAS.md já são únicos o suficiente). Rejeitada como padrão porque o ganho de token é proporcional ao tamanho do arquivo: docs típicos têm 4–8KB, regenerar inteiro já é barato; o patch cirúrgico perderia a garantia holística (princípio 12 do CEREBRO — "nada único se perdeu") sem ganho real que compense.
- **Nunca usar ASU, nem em código** — rejeitada; já provou valor real no `vectorforge.html`, reduzindo o volume de texto reenviado a cada sessão.

### Consequências
- CONTEXT.md e GLOSSARY.md (estáveis, crescem devagar) são candidatos a reavaliar para ASU pontual no futuro, se uma edição for genuinamente isolada — mas o padrão por ora é arquivo completo para todo o conjunto de docs, sem exceção automática.
- Quando DECISIONS.md se aproximar das ~700 linhas que o próprio arquivo já prevê como gatilho de arquivamento, reavaliar: nesse porte, o cálculo de custo/benefício do ASU muda.

---

## DEC-008 — Instruções ASU entregues como arquivo para download (desvio do padrão do Kit)
**Data:** 2026-06-30 · **Status:** substituída por DEC-012 (2026-11-11) — ASU descontinuado; corpo mantido como registro histórico.

### Contexto
O CEREBRO.md (ambas as versões, original e atualizada) prescreve por padrão entregar instrução ASU como bloco `yaml` inline no chat ("Nunca arquivos soltos"). Na prática, isso expôs um ponto de fricção: copiar/colar um bloco com caracteres Unicode não-ASCII (↻, ──) em âncoras de patch tem risco real de divergência de encoding entre o que foi gerado e o que chega no disco do usuário, gerando falhas de match difíceis de diagnosticar (ver sessão de 2026-06-30, FIX da âncora do botão Regenerate).

### Decisão
Para este projeto, instruções ASU passam a ser entregues como arquivo `.yaml` para download, nomeado `AAAA-MM-DD-asuNNNN.yaml` (convenção já trazida pela atualização do Kit). Isso elimina a etapa de copiar/colar manual e também resolve, por construção, a ambiguidade de "já rodei essa instrução?" — cada tentativa vira um arquivo com nome único.

### Alternativas consideradas
- **Manter bloco inline, só evitar Unicode literal em âncoras** — parcialmente adotado de qualquer forma (boa prática permanente daqui pra frente, independente do canal de entrega), mas não resolve sozinho o problema de reaplicar a mesma instrução duas vezes por engano.
- **Manter o padrão do Kit sem desvio** — rejeitada a pedido explícito do usuário, com motivo concreto documentado acima.

### Consequências
- Esta é uma adaptação **específica deste projeto** ao padrão do Kit — registrada aqui e em IDEAS.md → Feedback para o Kit, e incorporada ao CEREBRO.md deste projeto (seção "Saída de código via ASU").
- Convenção de nome datado/numerado passa a ser obrigatória para toda instrução ASU gerada a partir de agora.

---

## DEC-009 — Escopo do ASU ampliado para docs de heading estável (DECISIONS, CONTEXT); rolantes continuam full-file
**Data:** 2026-07-03 · **Status:** substituída por DEC-012 (2026-11-11) — ASU descontinuado; corpo mantido como registro histórico.

### Contexto
A atualização do Kit trazida pelo usuário nesta data (`instrucoes-dev__template-update.txt`) formaliza uma regra que o DEC-007 original já cogitava como possibilidade futura: "ASU: editar código, doc de heading estável (DECISIONS/CONTEXT) ou trecho localizado de capítulo → instrução yaml para baixar. Escrita nova, reescrita profunda e docs rolantes (STATUS/CHANGELOG/IDEAS/HISTORY...) → arquivo inteiro." Isso amplia o escopo do ASU além do que DEC-007 permitia ("ASU é usado somente para código").

Não é um conflito acidental — é o Kit convergindo exatamente para o cenário que DEC-007 já apontava como candidato a reavaliação ("CONTEXT.md e GLOSSARY.md são candidatos a reavaliar para ASU pontual no futuro, se uma edição for genuinamente isolada").

### Decisão
Ampliar o escopo do ASU neste projeto para cobrir, além de código:
- **DECISIONS.md** — via `replace_section`/`insert_after_pattern`, exclusivamente para ANEXAR uma nova entrada `## DEC-N` ou `## FIX-N` ao final do arquivo (heading novo, não precisa reordenar nem revisar o resto). Nunca para editar uma entrada existente — isso continua exigindo arquivo completo (regra de não reescrever entradas antigas já é do próprio DECISIONS.md).
- **CONTEXT.md** — via `replace_section`/`insert_after_pattern`, exclusivamente para edições genuinamente ISOLADAS e ADITIVAS: uma nova Armadilha numerada ao final da lista, uma linha nova na Stack, uma entrada nova na tabela de Estrutura. Qualquer edição que exija reler o arquivo inteiro para garantir coerência (reordenar, resolver duplicidade, decidir o que sai) continua sendo arquivo completo.
- **STATUS.md, CHANGELOG.md, IDEAS.md, GLOSSARY.md, ROADMAP.md, HISTORICO.md** — sem mudança: continuam SEMPRE arquivo completo, por serem holísticos/rolantes (mover item entre seções, checar duplicidade, resolver o que sai). O Kit novo concorda com isso ("docs rolantes... → arquivo inteiro").

### Alternativas consideradas
- **Manter DEC-007 inalterado, ignorar a ampliação do Kit** — rejeitada; o ganho é real (DECISIONS.md deste projeto só cresce, nunca é reescrito por completo — patch cirúrgico elimina reenviar 13KB+ a cada FIX/DEC novo) e o Kit já validou a ideia com uma regra formal, não uma sugestão frágil.
- **Ampliar para TODOS os docs, incluindo rolantes** — rejeitada; STATUS/CHANGELOG/IDEAS são precisamente os casos onde a edição é holística por natureza (o próprio Kit novo os exclui explicitamente).

### Consequências
- DEC-008 (entrega sempre como arquivo `.yaml` para download) permanece válida e agora **convergiu com o padrão do Kit** — deixou de ser um desvio, o Kit adotou o mesmo default. O registro histórico do DEC-008 não é reescrito (é o motivo original, ainda válido), só deixa de ser uma "exceção" para ser a regra.
- Próxima vez que uma DEC-N ou FIX-N nova precisar ser registrada, avaliar se cabe como patch ASU (`insert_after_pattern` no final do arquivo) em vez de arquivo completo — reduz volume de texto reenviado.
- CONTEXT.md ainda é candidato conservador: só usar ASU quando a edição for comprovadamente isolada (uma armadilha nova, uma linha na stack); em caso de dúvida, arquivo completo continua sendo o padrão seguro.
- Ver seção "Saída de código via ASU" no CEREBRO.md — atualizada para refletir este escopo.

---

## DEC-010 — F3 inicia por esbuild: `vectorforge.html` dividido em módulos ES; script custom de inlining em vez de plugin HTML
**Data:** 2026-07-07 · **Status:** aceita

### Contexto
F3 tinha uma decisão pendente desde 2026-06-30: começar pelo motor L-System (ganho visual) ou pelo build step com esbuild (ganho estrutural). O usuário escolheu esbuild nesta sessão. Antes de estruturar, pesquisei as práticas atuais de bundling para o caso específico deste projeto — produzir um `.html` **único** com JS e CSS **inline**, não um `outdir` com arquivos linkados por tag, que é o caso de uso mais comum de bundlers.

### Decisão
1. **Divisão de módulos** — `vectorforge.html` (1554 linhas de `<script>`) foi dividido em:
   - `src/core/{utils,state,ui,view,generate,export}.js` — helpers matemáticos/noise, estado global, construção de UI, controles de view/zoom/draw, dispatcher central (`generateContent`) + orquestração (`doGen`), export.
   - `src/generators/{artdeco,baroque,geometric,victorian,celtic,islamic,minimal,organic,generic}.js` — um arquivo por estilo (espelha o Inventário de Geradores do CONTEXT.md), mais `generic.js` para `genDivider`/`genPattern`/`genPixelArt`/`genTextShape`.
   - `src/main.js` — entry point; importa tudo e expõe no `window` as funções referenciadas via `onclick=""` inline no HTML (ver Armadilha 8 no CONTEXT.md).
   - `src/index.html` + `src/styles/main.css` — template e CSS extraídos tal qual.
2. **Extração por parsing, não retype manual** — os corpos de função foram extraídos do `vectorforge.html` original por um parser Python de contagem de chaves/parênteses (respeitando strings, template literals e comentários), garantindo cópia byte-exata. Reescrever ~1500 linhas à mão introduziria risco real de erro de transcrição num arquivo-chave.
3. **Build: esbuild bundla, um script Node de ~60 linhas faz o inlining** — `scripts/build.js` chama `esbuild.build({ entryPoints: ['src/main.js'], bundle: true, format: 'iife' })` para produzir um único JS (mantendo o comportamento de `<script>` clássico: execução síncrona, sem `defer` de módulo), depois lê `src/index.html`, substitui os placeholders `/*__STYLES__*/` e `//__SCRIPT__` pelo CSS e pelo JS bundlado, e escreve `dist/vectorforge.html` — o mesmo arquivo único distribuível de sempre.

### Alternativas consideradas
- **`esbuild-plugin-html` / `@chialab/esbuild-plugin-html`** — plugins prontos para gerar HTML a partir de entry points. Rejeitados: são feitos para o caso comum (múltiplos arquivos de saída referenciados via `<script src>`/`<link>`), não para inlining num único arquivo; adicionariam uma dependência e uma camada de indireção para resolver algo que um script de ~60 linhas resolve de forma mais previsível e auditável.
- **Bundle em formato `esm`** — rejeitado porque um `<script type="module">` tem `defer` implícito e escopo de módulo (não vaza para `window`); trocar todos os `onclick="..."` inline do HTML para `addEventListener` teria um diff muito maior no arquivo-chave sem ganho real aqui. `iife` + `Object.assign(window, {...})` explícito preserva o HTML inalterado.
- **Divisão por camada (`dom.js`, `math.js`, `generators.js` monolítico)** em vez de por estilo — rejeitada; o Inventário de Geradores do CONTEXT.md já documenta por estilo, e a Armadilha 6 (reuso cruzado entre estilos) fica mais visível quando cada arquivo de estilo é pequeno e autocontido.

### Consequências
- **Funções expostas via `onclick=""` inline precisam estar em `Object.assign(window, {...})` em `main.js`.** Lista atual: `setMode, doGenRandom, selectStyle, selectType, selectPal, selectFont, setRatio, doGen, zoom, toggleBg, toggleGrid, toggleDraw, xSVG, xPNG, copySVG, applyVar`. Qualquer novo handler chamado via `onclick=""` no HTML (estático ou gerado em template string por `buildStyleGrid`/`buildTypeChips`/etc.) precisa entrar nesta lista, ou o clique silenciosamente não faz nada (sem erro visível). Ver Armadilha 8 no CONTEXT.md.
- **Fluxo de desenvolvimento mudou:** `npm install && npm run build` (ou `npm run watch`) agora é necessário antes de abrir o app no browser. `src/index.html` sozinho **não** é abrível diretamente (tem placeholders não substituídos) — sempre abrir `dist/vectorforge.html`.
- **`dist/vectorforge.html` continua versionado no Git** (não está no `.gitignore`) — decisão deliberada para preservar o modelo de distribuição do DEC-001 ("compartilhar o `.html` já é o deploy"). Trade-off aceito:é preciso lembrar de rodar `npm run build` e commitar `dist/` junto com mudanças em `src/`; nenhum CI garante isso ainda (projeto de mantenedor único, aceitável por ora — revisitar se o projeto ganhar colaboradores).
- **Metodologia de verificação usada, vale repetir em migrações futuras:** as 49 combinações estilo×tipo (`TYPES_BY_STYLE` inteiro) foram renderizadas via Chromium headless (Playwright) tanto no `vectorforge.html` original quanto no `dist/vectorforge.html` novo, com o mesmo seed, e comparadas byte-a-byte (SVG normalizado sem `id`/`width`/`height`, que variam por zoom). Também testados: Text→Form, Draw mode (traço → ornamento), Pixel Art (hash de pixels via `getImageData`), Export (SVG/PNG download), Regenerate (mudança de seed), Variations (4 thumbnails + `applyVar`), zoom/Fit, presets de canvas, toggle de fundo. **Essa bateria pegou 4 bugs reais antes da entrega** (todos de import faltante — ver abaixo) que um smoke-test visual manual provavelmente deixaria passar.
- **4 bugs reais encontrados e corrigidos durante a extração** (todos "esqueci de importar X no módulo Y" — risco inerente a dividir 1500 linhas em 16 arquivos):
  1. `TAU` não importado em 7 dos 9 módulos de geradores (artdeco, celtic, geometric, islamic, minimal, organic, victorian) — `genADMedallion` e outras usam `TAU` diretamente, não só via parâmetro.
  2. `starPath`/`polyPath` não importados em `islamic.js` (`genIslamicStar` usa ambos).
  3. `setStatus` não importado em `export.js` (`xSVG`/`xPNG`/`copySVG`) nem em `view.js` (`convertDrawToOrnament`) — ambos chamam `setStatus(...)` no fim, mas a função mora em `generate.js`.
  4. `genMandala` não importado em `generic.js` — é o fallback de `genTextShape()` quando a textarea de texto está vazia (`if (!text) return genMandala(...)`).
- Depois das correções, todas as 49 combinações + os fluxos extras batem byte-a-byte / hash-a-hash entre original e build, com zero erros de JS em ambos. Nenhuma lógica de gerador mudou — é reposicionamento de código puro.


---

## DEC-011 — Design do motor L-System (F3): regras classicas, mapeamento comp/sym, ajuste por bounding-box
**Data:** 2026-07-24 · **Status:** aceita

### Contexto
O ROADMAP ja fixava o "que" de F3: motor L-System com pelo menos 3 presets (arvore recursiva, Koch snowflake, Dragon curve). Faltava o "como": quais regras de reescrita usar, como mapear `comp`/`sym` (que em todo o resto do projeto tem significado geometrico consistente — densidade/simetria) para os parametros de um L-System, e como encaixar o resultado (que nasce em coordenadas locais arbitrarias da turtle) no sistema `cx,cy,sz` que todo gerador do projeto usa.

### Decisao
1. **Regras classicas de L-System** (Lindenmayer/Prusinkiewicz) em vez de inventar novas: arvore `F->FF, X->F-[[X]+X]+F[+FX]-X` (angulo 15-35 graus); Koch snowflake `F--F--F` com `F->F+F--F+F` (angulo fixo 60 graus, e o que DEFINE a curva); Dragon curve `FX` com `X->X+YF+, Y->-FX-Y` (angulo fixo 90 graus).
2. **Mapeamento de parametros**: `comp` controla iteracoes/profundidade (mais denso = mais iteracoes, mesmo papel que em todo o resto do projeto). `sym` controla o angulo de ramificacao na arvore (onde variar geometricamente faz sentido); nos outros dois presets, onde o angulo e fixo por definicao da curva, `sym` vira jitter leve (Koch) ou alternancia decorativa SO/FG (Dragon) em vez de tocar na geometria.
3. **Ajuste de bounding box via transform de grupo** (`<g transform="translate(...) scale(...)">`) envolvendo o path bruto, em vez de recalcular cada coordenada manualmente centrada em cx/cy como os outros geradores fazem ponto a ponto — mais simples e sem risco de erro de arredondamento acumulado ao longo de milhares de pontos.
4. **Teto de iteracoes do Dragon curve reduzido de 14 para 12** depois de medir que 14 iteracoes geravam um path de 256KB sem ganho visual proporcional (a string do L-System cresce de forma proxima a exponencial por iteracao).

### Alternativas consideradas
- **Angulo variavel para Koch/Dragon** (deixar `sym` controlar o angulo livremente) — rejeitada: o angulo e o que DEFINE essas curvas; varia-lo livremente produziria "outra curva", nao uma variacao da mesma, quebrando a identidade visual esperada de quem escolhe especificamente "Koch" ou "Dragon".
- **Recalcular coordenadas manualmente para centralizar** (como os outros geradores fazem com `pt(cx, cy, r, a)`) — rejeitada para este caso: a turtle graphics ja produz uma string de path completa: interceptar a emissao de cada ponto para centralizar exigiria reescrever o motor da turtle, sem beneficio real sobre um unico transform de grupo no final.

### Consequencias
- Novo estilo `botanical` (`src/generators/botanical.js`) com 3 tipos: `tree`, `koch`, `dragon` — registrado em `STYLES`/`TYPES_BY_STYLE` (`src/core/state.js`), no dispatcher (`src/core/generate.js`) e com icone proprio (`src/core/ui.js`, chave `bot`).
- Zero regressao nos 8 estilos existentes — confirmado via a mesma metodologia de comparacao headless de DEC-010 (as 49 combinacoes antigas continuam byte-a-byte identicas com o novo estilo adicionado).
- `lsystemExpand`/`turtleToPath` em `botanical.js` sao utilitarios genericos (nao amarrados a nenhum preset especifico) — reaproveitaveis se um F4/F5 quiser adicionar mais formas L-System (ex.: Sierpinski, Hilbert curve) sem duplicar o motor.
- ROADMAP F3 segue aberto: falta Flow Fields para fechar a fase.


---

## DEC-012 — Método de trabalho migra de ASU (chat + patch YAML) para modo Code (chat com pasta vinculada + Claude Code); merge do Kit v1.135.0
**Data:** 2026-11-11 · **Status:** aceita — substitui DEC-007, DEC-008 e DEC-009

### Contexto
Até aqui o projeto rodava no chat do claude.ai com o repositório chegando por mount achatado (FlatDrop) e as mudanças voltando por instrução ASU (`AAMMDD-asuNNNN.yaml`) ou arquivo inteiro para download — DEC-007/008/009 fixavam o escopo de cada canal. O dono passou a trabalhar direto no PC: o chat lê e grava na pasta do projeto, e o Claude Code roda no repositório. Junto veio o template-update do Kit v1.135.0, gerado com `Code sim · ASU nao`.

### Decisão
1. **Duas raias.** Chat (planejamento): autora inteiros CEREBRO, CONTEXT, Instruções e GLOSSARY, e escreve WOs (`meta/workorders/AAMMDD-woNNNN-desc.md`) para documento grande e vivo. Claude Code (execução): código, `npm run build`, append em STATUS/DECISIONS/CHANGELOG, aplica WOs (`/apply-wo`), fecha com `/wrap`, commita e empurra. IDEAS muda por WO. É a divisão-padrão do kit, adotada sem desvio.
2. **ASU e FlatDrop descontinuados.** Seção ASU sai do CEREBRO (sobra de modo desligado, pelo marcador do manifesto); `meta/ASU/`, `meta/README.md`, `.flatdropignore`, os `.yaml` ASU arquivados e os backups do aplicador (`zz_backups/`) foram MOVIDOS para `zz_para-excluir\` na pasta-pai, para o dono apagar.
3. **CEREBRO e Instruções refeitos sobre o pacote v1.135.0**, não remendados: o vivo era base de junho com ~40 versões de atraso; os 19 princípios eram os mesmos (o pacote só acrescentou frases a 4). Transplantado o específico deste projeto para «Técnicas específicas deste projeto». Os dois blocos «Mudanças nesta revisão» (relato) foram para `HISTORICO.md` §5. Instruções antigas (6.552 caracteres) descartadas a pedido do dono; novas com 5.515.
4. **Desvios registrados (nomes vivos mantidos):** `INSTRUCOES-PROJETO.md` (kit: `INSTRUCOES-DO-PROJETO.md`; skill `wrap` especializada para o nome real) e `meta/HISTORICO.md` (kit: `HISTORY.md`). Renomear arrastaria ponteiros em logs e DECs antigas sem ganho.
5. **Exceção pontual de raia nesta migração:** o próprio merge (STATUS, DECISIONS, CHANGELOG, IDEAS incluídos) foi gravado pelo chat, com aprovação explícita do dono, porque as skills e o `CLAUDE.md` que definem a raia do Code nasceram neste mesmo ciclo. Daqui em diante vale o item 1.

### Alternativas consideradas
- **Manter ASU para código** — rejeitada: com o Code no repositório, o patch YAML vira um intermediário que o executor não precisa; o próprio pacote vem com `ASU nao`.
- **Remendar o CEREBRO vivo seção a seção** — rejeitada: a distância de versões tornava o remendo mais arriscado (linhas revogadas espalhadas) que reconstruir sobre o pacote e transplantar o pouco que era deste projeto.
- **Manter `.flatdropignore` como canal de reserva** — rejeitada pelo dono (sem uso previsto); volta pelo template se fizer falta.

### Consequências
- `CLAUDE.md`, `.claude/settings.json` (com `npm run build`, `git log`, `date` e `../` em `additionalDirectories`), skills `apply-wo`/`wrap`/`sondar`, `meta/workorders/_TEMPLATE.md` e `meta/SPEC.md` passam a existir.
- O chat faz git só leitura (`GIT_OPTIONAL_LOCKS=0`); commit e push são do Code ou do dono.
- As Instruções no painel do Projeto (claude.ai) precisam ser recoladas a partir do arquivo do repo — a fonte é o arquivo.
- Carimbos do kit (CEREBRO, 3 skills, modelo de WO) em v1.135.0.


---

## DEC-013 — Flow Fields: disco de raio `sz`, Symmetry como cópias rotacionais, um `<path>` só
**Data:** 2026-11-11 · **Status:** aceita

### Contexto
F3 fechava com «Flow Fields como tipo novo». Faltava o como: onde o campo vive (canvas inteiro ou região), o que `comp`/`sym` significam num campo de fluxo, e como manter o SVG pequeno — a Dragon curve já tinha mostrado (DEC-011) que o tamanho da string é o gargalo antes do tempo.

### Decisão
1. **Um tipo, `flow`, só no Organic** — onde o `snoise` já mora; menor mudança que fecha o critério.
2. **Domínio = disco de raio `sz` em `(cx, cy)`**, não o canvas: casa com os geradores centrados e funciona nas miniaturas de variação, que passam `cx/cy/sz` próprios.
3. **`comp` → densidade** (30–120 partículas, 40–120 passos); **`sym` → simetria rotacional** (`folds = 1 + round(sym × 7)`), com as partículas divididas entre as cópias.
4. **Campo `θ = snoise(x/sz × 0.9, y/sz × 0.9) × π`, passo `sz × 0.015`** — escolhido por comparação visual no protótipo: `× 2π` com frequência 1,6 dava nós e quinas.
5. **Saída achatada:** um `<path>` com subpaths, cópias giradas ponto a ponto, 1 de cada 2 pontos emitido; pontos de origem em `FG` (1 a cada 4).

### Alternativas consideradas
- **Campo no canvas inteiro (`state.w`/`state.h`)** — rejeitada: desenquadra nas miniaturas, como já acontece com o `genWave`.
- **Cópias via `<g transform="rotate">` ou `<use>`** — rejeitada: `<g>` aninhado complica a importação em Figma/Canva, e `<use>` exige `id`, que colidiria entre o canvas e as 4 miniaturas presentes no mesmo DOM.
- **Variante também no Minimal** — adiada (fora de escopo da spec).

### Consequências
- Medido no protótipo (Node 22, sandbox do chat): 8.755–45.432 bytes e 1–12 ms por chamada; as 312 chaves antigas da sonda ficaram com hash idêntico. A medição na máquina do dono está no relatório de aplicação da WO 0001.
- Regra que vale para geradores futuros: **gerador não emite `id`** (o mesmo SVG é renderizado várias vezes no mesmo DOM).


---

## DEC-014 — `npm run regress`: a comparação antes/depois vira instrumento versionado com linha de base no repo
**Data:** 2026-11-12 · **Status:** aceita

### Contexto
A conferência «nenhum gerador antigo mudou» foi feita três vezes com três scripts descartáveis: Playwright/Chromium em DEC-010 e DEC-011, sonda Node + esbuild na WO 0001 (`261111-sonda-flow.mjs`, fora do repo). A regra do kit diz que sonda rodada uma segunda vez para comparar antes/depois já é instrumento sem teste — e cada nova mudança de gerador dependia de alguém lembrar de reescrevê-la.

### Decisão
1. **`scripts/regress.mjs`, versionado, chamado por `npm run regress`.** Bundla `generate.js` + `state.js` com o esbuild que já é devDependency (arquivo temporário), stub mínimo de `document`, e renderiza 53 tipos × 2 tamanhos (canvas 400, miniatura 60) × 3 jogos de parâmetros = 318 chaves.
2. **Linha de base versionada** em `scripts/regress-baseline.json`: só `sha1` (12 hex) e `bytes`, ordem estável, uma chave por linha — sem tempo de execução, para ser determinística e legível em diff.
3. **Veredito por código de saída** (instrumento dá veredito, sonda não): mudou, sumiu ou oscilou → 1; chave nova → listada, não reprova; sem linha de base → 1. `--update` regrava (e se recusa se houver não-determinismo); `--baseline <arquivo>` compara com outro arquivo (prova de vida).
4. **Mudança intencional de gerador = `--update` no mesmo commit**, com as chaves mudadas citadas no relatório — o diff da linha de base é o registro do que mudou.

### Alternativas consideradas
- **Playwright no navegador, como em DEC-010** — rejeitada como instrumento padrão: dependência pesada (Chromium) para medir o que o Node mede sozinho; os geradores são funções puras que devolvem string. Continua sendo a ferramenta para conferir o que passa pelo DOM (pixel art, Draw, export), se um dia for preciso.
- **`"type": "module"` no `package.json` para importar `src/` direto** — rejeitada: quebraria o `scripts/build.js`, que é CommonJS.
- **Linha de base fora do repo** — rejeitada: instrumento cuja referência não é versionada volta a ser sonda.

### Consequências
- Validação de código no `CLAUDE.md` e no CEREBRO passa a ser `npm run regress`; o `allow` do Code ganha `npm ci` e `npm run regress`.
- Protótipo (VM do chat, Node 22): 0,9 s; linha de base de 318 chaves com hashes idênticos aos da sonda medida na máquina do dono na WO 0001. A medição na máquina do dono está no relatório da WO 0002.
- Abre caminho para CI (backlog): o mesmo comando, num GitHub Action.
- Fica de fora o que não passa por `generateContent` (pixel art, Text→Form com texto, Draw, export) — dito na própria saída do instrumento.

