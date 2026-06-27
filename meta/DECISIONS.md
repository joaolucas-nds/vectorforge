# DECISIONS.md — Registro de Decisões

> Arquivo que **cresce devagar**. Guarda o PORQUÊ — o que o código sozinho não conta.
> Duas naturezas: **DEC** (decisões de arquitetura/design) e **FIX** (bugs graves resolvidos, para não repetir).
> Não reescreva entradas antigas; se uma decisão for substituída, marque «SUPERADA por DEC-N» e adicione a nova.
> Quando passar de ~700 linhas, mova as mais antigas para `DECISIONS-archive.md`.

---

## DEC-001 — Arquivo HTML único, sem build e sem framework
**Data:** 2026-06-23 · **Status:** aceita

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
