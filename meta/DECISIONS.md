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
**Data:** 2026-06-30 · **Status:** SUPERADA parcialmente por DEC-009 (2026-07-03) — o corpo abaixo é o registro histórico original; DEC-009 é a regra vigente para o escopo do ASU em docs.

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
**Data:** 2026-06-30 · **Status:** aceita — desvio registrado

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
**Data:** 2026-07-03 · **Status:** aceita — supera DEC-007 neste ponto específico

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
