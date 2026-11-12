# WO 0002 — `npm run regress` (instrumento de regressão) + README público + duas correções do STATUS

> **Tipo:** mista — instrumento novo (gravado pelo chat, linha de base gerada aqui) + registro nos meta. **Nenhuma linha de `src/` nem o `dist/` muda.**
> **Config sugerida:** modelo mais leve (Sonnet) · `/effort medium` — edições exatas, simuladas pelo chat a partir do texto desta WO.
> **Pré-requisito:** commit `b977af1`, `node_modules/` presente (se não estiver: `npm ci`).
> **Base:** `specs/261112-readme-regress.md` e o protótipo medido pelo chat em 2026-11-12.
> **Arquivos que o chat gravou no disco e esta WO usa** (a Edição 0 confere):
>   - `README.md` — sha1 `f0d802433dd248acc65b2ab2ef29e7e8f8dde72f` (versionado por esta WO)
>   - `scripts/regress.mjs` — sha1 `67dee129e1c5832b6907b8b86bc79737bc7aba0d` (versionado por esta WO)
>   - `.claude/settings.json` — sha1 `5ad8328c49a833c8c6fb2aea510fa6072f0a09e2` (versionado por esta WO)
>   - `specs/261112-readme-regress.md` — sha1 `1af21fff2e7b698f6fe444f3e90e9c28768db92c` (versionado por esta WO)
>   - `../261112-regress-baseline-chat.json` — sha1 `26cfcfcfe6ba64b3e27e73d0b40b7cc732dafbd5` (pasta-pai; NÃO versionar)
> **`.claude/settings.json` foi regravado INTEIRO pelo chat** (ganhou `npm ci`, `npm run regress` e `node scripts/regress.mjs` no `allow`). Esta WO só o versiona — não edite esse arquivo.
> **Âncora semântica:** trecho-âncora que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**.
> **Idempotência:** antes de cada edição procure o texto NOVO INTEIRO. Nas Edições 1, 7, 8, 12, 14 a âncora fica DENTRO do texto novo (já aplicada = texto novo inteiro presente); nas Edições 2, 3, 4, 5, 6, 9, 10, 11, 13 a âncora some (já aplicada = texto novo presente **e** âncora ausente). Já aplicada: **PULE** e diga no relatório.
> **Âncoras lidas em** (lidas do disco pelo chat neste turno, no commit `b977af1`; trecho = primeira linha da âncora):
>   - Edição 1 · `package.json` — `    "watch": "node scripts/build.js --watch"`
>   - Edição 2 · `CLAUDE.md` — `- Testes/validação: não há suíte automatizada. A validação de mudança de código é a compar`
>   - Edição 3 · `CLAUDE.md` — `- ´npm run build´ já está no ´allow´ de ´.claude/settings.json´.`
>   - Edição 4 · `meta/CEREBRO.md` — `- **Validação de código (não há suíte):** comparação headless (Playwright/Chromium) das co`
>   - Edição 5 · `meta/CONTEXT.md` — `├── scripts/`
>   - Edição 6 · `meta/CONTEXT.md` — `└── README.md`
>   - Edição 7 · `meta/GLOSSARY.md` — `- **´scripts/build.js´** — script Node que roda esbuild (bundle IIFE de ´main.js´) e injet`
>   - Edição 8 · `meta/STATUS.md` — `- **NOVO — Flow Fields (´flow´, estilo Organic)**: partículas num campo de direções do ´sn`
>   - Edição 9 · `meta/STATUS.md` — `- [ ] **Expandir ´README.md´** (hoje é só ´"# vectorforge"´) — ainda adiado; com dois novo`
>   - Edição 10 · `meta/IDEAS.md` — `### 2026-11-11 — Promover a comparação antes/depois a instrumento versionado`
>   - Edição 11 · `meta/IDEAS.md` — `### 2026-07-07 — Verificação por comparação headless em migrações de código (F4+ ou qualqu`
>   - Edição 12 · `meta/IDEAS.md` — `- **Flow Fields (F3)** — implementada em v0.4.0 (DEC-013): tipo ´flow´ no Organic, ´genFlo`
>   - Edição 13 · `meta/CHANGELOG.md` — `## [Não lançado]`
>   - Edição 14 · `meta/DECISIONS.md` — `- Regra que vale para geradores futuros: **gerador não emite ´id´** (o mesmo SVG é renderi`
> **Próximo comando:** `/wrap wo0002-readme-regress`

> **Canal dos meta neste ciclo = CODE.** Esta WO É o registro: aplique as edições nos `meta/` e não espere doc do chat. O `/wrap` depois acrescenta só o log do dia e a «Última conversa» do STATUS.

---

## 1. Por que

O projeto é público desde v0.3.0 e o README é uma linha com aspas literais (sobra de `echo` do CMD). E a conferência «nenhum gerador mudou» já foi reescrita três vezes como script descartável — vira agora `npm run regress`, versionado, com linha de base no repo e veredito por código de saída (DEC-014). As duas correções do STATUS pendentes desde 2026-11-12 (sai o item «Colar as Instruções», entra o roteiro 8/8 da Flow Fields) vêm junto.

## Inventário — de onde saiu a lista de edições

- **Onde a validação de código está escrita** — `grep -rn "não há suíte\|comparação headless" CLAUDE.md meta/CEREBRO.md meta/CONTEXT.md` devolve **2** lugares que mandam fazer (CLAUDE.md «Testes/validação», CEREBRO «Validação de código») → Edições 2 e 4. As menções em DECISIONS (DEC-010/011) e IDEAS são relato ou ideia (a ideia sai pelo MOVER, Edições 10–12).
- **Onde `scripts/` e o README aparecem como estrutura** — CONTEXT «Estrutura do Projeto» (Edições 5 e 6) e GLOSSARY (Edição 7).
- **STATUS:** Funcionando (Edição 8) e Backlog (Edição 9: saem README e «Colar», o item de CI é atualizado e entra o item de licença).
- Total: **14 edições** em **9 arquivos** (`package.json`, `CLAUDE.md`, `meta/CEREBRO.md`, `meta/CONTEXT.md`, `meta/GLOSSARY.md`, `meta/STATUS.md`, `meta/IDEAS.md`, `meta/CHANGELOG.md`, `meta/DECISIONS.md`), mais 4 arquivos já gravados pelo chat (`README.md`, `scripts/regress.mjs`, `.claude/settings.json`, a spec) e 1 gerado aqui (`scripts/regress-baseline.json`).

---

## Edição 0 — preparo (não edita nada versionado)

1. `sha1sum README.md scripts/regress.mjs .claude/settings.json specs/261112-readme-regress.md ../261112-regress-baseline-chat.json` → tem de bater com o cabeçalho. Diferente: **PARE e reporte**.
2. `git status --short` → exatamente: ` M .claude/settings.json`, ` M README.md`, `?? meta/workorders/261112-wo0002-readme-regress.md`, `?? scripts/regress.mjs`, `?? specs/261112-readme-regress.md`. Qualquer outra linha: **PARE e reporte**. (O git pode avisar «CRLF will be replaced by LF» no `README.md` — o antigo era CRLF; é esperado.)

## Edição 1 — `package.json` · script regress

**Âncora** (bloco `scripts`, entrada `watch`):

```
    "watch": "node scripts/build.js --watch"
```

**Substituir por:**

```
    "watch": "node scripts/build.js --watch",
    "regress": "node scripts/regress.mjs"
```

## Edição 2 — `CLAUDE.md` · validacao vira npm run regress

**Âncora** (item «Testes/validação» em «Build / validação»):

```
- Testes/validação: não há suíte automatizada. A validação de mudança de código é a comparação headless das combinações estilo×tipo contra o build anterior (metodologia em DEC-010, reaproveitada em DEC-011): zero diferença nas combinações que a mudança não devia tocar.
```

**Substituir por:**

```
- Testes/validação: `npm run regress` — compara a saída de todas as combinações estilo×tipo com `scripts/regress-baseline.json` (DEC-014). Sai 1 se algo antigo mudou: PARE e reporte. Mudança **intencional** de gerador ou tipo novo: `npm run regress -- --update` e versione a linha de base no mesmo commit, dizendo no relatório quais chaves mudaram. O instrumento não vê aparência — visual é roteiro do dono.
```

## Edição 3 — `CLAUDE.md` · allow atualizado

**Âncora** (último item de «Build / validação»):

```
- `npm run build` já está no `allow` de `.claude/settings.json`.
```

**Substituir por:**

```
- `npm ci`, `npm run build` e `npm run regress` já estão no `allow` de `.claude/settings.json`.
```

## Edição 4 — `meta/CEREBRO.md` · tecnica de validacao

**Âncora** (item «Validação de código» em «Técnicas específicas deste projeto»):

```
- **Validação de código (não há suíte):** comparação headless (Playwright/Chromium) das combinações estilo×tipo contra o build anterior, mesmo seed, saída byte-a-byte — zero diferença no que a mudança não devia tocar. Ver DEC-010 (metodologia) e DEC-011 (reuso).
```

**Substituir por:**

```
- **Validação de código:** `npm run regress` (instrumento versionado, DEC-014) — todas as combinações estilo×tipo comparadas com `scripts/regress-baseline.json`; sai 1 se uma saída antiga mudou. Mudança intencional = `--update` + linha de base no mesmo commit. Não vê aparência: gerador novo ou ajustado pede roteiro visual do dono. (A comparação headless com Playwright de DEC-010/011 foi a origem.)
```

## Edição 5 — `meta/CONTEXT.md` · scripts na arvore

**Âncora** (bloco `scripts/` + linha `package.json` em «Estrutura do Projeto»):

```
├── scripts/
│   └── build.js                 # esbuild (bundle IIFE) + inlining de CSS/JS no template → dist/
├── package.json                 # devDependency: esbuild. Scripts: build, watch
```

**Substituir por:**

```
├── scripts/
│   ├── build.js                 # esbuild (bundle IIFE) + inlining de CSS/JS no template → dist/
│   ├── regress.mjs              # instrumento de regressão dos geradores (`npm run regress`, DEC-014)
│   └── regress-baseline.json    # linha de base versionada: 1 chave estilo/tipo/tamanho/seed por linha
├── package.json                 # devDependency: esbuild. Scripts: build, watch, regress
```

## Edição 6 — `meta/CONTEXT.md` · README na arvore

**Âncora** (última linha da árvore em «Estrutura do Projeto»):

````
└── README.md
```
````

**Substituir por:**

````
└── README.md                    # apresentação pública: o que é, como abrir (Pages), estilos, dev
```
````

## Edição 7 — `meta/GLOSSARY.md` · termo regress

**Âncora** (item `scripts/build.js`):

```
- **`scripts/build.js`** — script Node que roda esbuild (bundle IIFE de `main.js`) e injeta o resultado + o CSS num template HTML, produzindo `dist/vectorforge.html`.
```

**Substituir por:**

```
- **`scripts/build.js`** — script Node que roda esbuild (bundle IIFE de `main.js`) e injeta o resultado + o CSS num template HTML, produzindo `dist/vectorforge.html`.
- **`npm run regress` / linha de base** — instrumento `scripts/regress.mjs`: renderiza as 318 chaves (estilo/tipo/tamanho/seed) e compara o hash de cada uma com `scripts/regress-baseline.json`. Reprova (sai 1) se uma chave antiga muda, some ou oscila; chave nova não reprova. `--update` regrava a linha de base (DEC-014).
```

## Edição 8 — `meta/STATUS.md` · Flow validada + regress e README

**Âncora** (item Flow Fields em «Funcionando»):

```
- **NOVO — Flow Fields (`flow`, estilo Organic)**: partículas num campo de direções do `snoise`, dentro de um disco; Complexity → densidade, Symmetry → 1–8 cópias rotacionais. Ver DEC-013.
```

**Substituir por:**

```
- **NOVO — Flow Fields (`flow`, estilo Organic)**: partículas num campo de direções do `snoise`, dentro de um disco; Complexity → densidade, Symmetry → 1–8 cópias rotacionais. Ver DEC-013. Validada visualmente pelo dono em 2026-11-12 (roteiro 8/8) [relatado pelo dono].
- **NOVO — `npm run regress`**: instrumento de regressão versionado (`scripts/regress.mjs` + `scripts/regress-baseline.json`, 318 chaves). Ver DEC-014.
- **NOVO — `README.md` público**: o que é, como abrir (Pages), 9 estilos / 53 tipos, desenvolvimento.
```

## Edição 9 — `meta/STATUS.md` · backlog: sai README e Colar, CI atualizado

**Âncora** (três últimos itens do «Backlog» (README, Colar as Instruções, política de CI)):

```
- [ ] **Expandir `README.md`** (hoje é só `"# vectorforge"`) — ainda adiado; com dois novos estilos entregues (build modular + botanical), talvez valha antecipar isso na próxima conversa em vez de esperar Flow Fields também, já que o projeto está publicamente visível agora (GitHub Pages).
- [ ] **Colar as Instruções novas no painel do Projeto** (claude.ai) — a fonte é `INSTRUCOES-PROJETO.md` no repo (5.515 caracteres em 2026-11-11).
- [ ] **Definir política de CI** para garantir que `dist/vectorforge.html` nunca fique dessincronizado de `src/`. Baixa prioridade enquanto for projeto de mantenedor único.
```

**Substituir por:**

```
- [ ] **Definir política de CI** (GitHub Actions) para rodar `npm run regress` e garantir que `dist/vectorforge.html` nunca fique dessincronizado de `src/` — o instrumento já existe (DEC-014). Baixa prioridade enquanto for projeto de mantenedor único.
- [ ] **Licença:** o repositório é público e não declara licença (sem licença, ninguém tem permissão legal de reusar o código). Decisão do dono — o README não traz seção de licença até lá.
```

## Edição 10 — `meta/IDEAS.md` · sai a ideia Promover (MOVER 1/3)

**Âncora** (entrada «2026-11-11 — Promover a comparação…» em «Ideias Ativas — Assistente», título + parágrafo + a linha em branco depois):

```
### 2026-11-11 — Promover a comparação antes/depois a instrumento versionado
Terceira vez que o projeto compara a saída de todos os geradores antes e depois de uma mudança (DEC-010 com Playwright, DEC-011, e agora a sonda `261111-sonda-flow.mjs`, Node + esbuild, sem browser). Pela regra do kit, sonda rodada uma segunda vez para comparar já é instrumento sem teste. Candidato: `scripts/regress.mjs` versionado + `npm run regress`, saindo com código de erro quando uma chave antiga muda. Decisão do dono.

### 2026-06-30 — Voronoi/Worley (F3 ou F4)
```

**Substituir por:**

```
### 2026-06-30 — Voronoi/Worley (F3 ou F4)
```

## Edição 11 — `meta/IDEAS.md` · sai a ideia headless (MOVER 2/3)

**Âncora** (entrada «2026-07-07 — Verificação por comparação headless…», última de «Ideias Ativas — Assistente» — troca título + parágrafo + linha em branco pelo separador que vinha depois):

```
### 2026-07-07 — Verificação por comparação headless em migrações de código (F4+ ou qualquer refactor grande)
Durante a divisão de `vectorforge.html` em módulos (DEC-010), a técnica que pegou os 4 bugs reais antes da entrega foi: renderizar TODAS as combinações relevantes (aqui, as 49 de `TYPES_BY_STYLE`) em Chromium headless (Playwright) tanto na versão antiga quanto na nova, com o mesmo seed, e comparar a saída byte-a-byte. Vale generalizar como prática padrão para qualquer refactor grande futuro (ex.: quando o motor L-System for integrado, comparar saída antes/depois nos estilos que não deveriam ter mudado). Custo: ~alguns minutos de execução; benefício: pega regressões silenciosas que smoke-test manual não pegaria (ex.: `onclick` que não faz nada, sem erro no console).

---

## 🛌 Adiadas
```

**Substituir por:**

```
---

## 🛌 Adiadas
```

## Edição 12 — `meta/IDEAS.md` · entram em Concluidas (MOVER 3/3)

**Âncora** (último item de «Concluídas»):

```
- **Flow Fields (F3)** — implementada em v0.4.0 (DEC-013): tipo `flow` no Organic, `genFlowField`. Ideia original (2026-06-30) previa ~120 linhas e 500 partículas × 200 passos; a versão entregue usa 30–120 partículas × 40–120 passos num disco, porque o tamanho do SVG (não o tempo) era o gargalo.
```

**Substituir por:**

```
- **Flow Fields (F3)** — implementada em v0.4.0 (DEC-013): tipo `flow` no Organic, `genFlowField`. Ideia original (2026-06-30) previa ~120 linhas e 500 partículas × 200 passos; a versão entregue usa 30–120 partículas × 40–120 passos num disco, porque o tamanho do SVG (não o tempo) era o gargalo.
- **Comparação antes/depois como prática padrão → instrumento `npm run regress`** — ideias de 2026-07-07 (generalizar a comparação headless) e 2026-11-11 (promover a sonda) implementadas juntas em 2026-11-12 (DEC-014): `scripts/regress.mjs` + linha de base versionada, sai 1 quando uma saída antiga muda.
```

## Edição 13 — `meta/CHANGELOG.md` · Nao lancado: README e regress

**Âncora** (linha `*(vazio)*` logo abaixo de `## [Não lançado]`):

```
## [Não lançado]
*(vazio)*
```

**Substituir por:**

```
## [Não lançado]
### Adicionado
- **`npm run regress`** — instrumento de regressão dos geradores (`scripts/regress.mjs`): compara a saída das 318 combinações estilo × tipo × tamanho × parâmetros com a linha de base versionada `scripts/regress-baseline.json` e sai com erro se alguma saída antiga mudou. `--update` regrava a linha de base. Ver DEC-014.
- **`README.md`** de verdade (antes, uma linha com aspas literais): o que é o projeto, como abrir (GitHub Pages ou arquivo local), os 9 estilos e 53 tipos, recursos, desenvolvimento e estrutura.
```

## Edição 14 — `meta/DECISIONS.md` · DEC-014 no fim

**Âncora** (última linha do arquivo (fim da DEC-013)):

```
- Regra que vale para geradores futuros: **gerador não emite `id`** (o mesmo SVG é renderizado várias vezes no mesmo DOM).
```

**Substituir por:**

```
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

```

## Edição 15 — gerar a linha de base (comando, não texto)

`npm run regress -- --update` → imprime `linha de base gravada: 318 chaves -> scripts/regress-baseline.json`. Número diferente de 318: **PARE e reporte** (a spec conta 53 tipos × 6 = 318; medido no protótipo).

---

## Fora de escopo

CI/GitHub Actions; licença (entra só como item de backlog, Edição 9); prints no README; qualquer mudança em `src/`, `dist/` ou no texto de `README.md`/`scripts/regress.mjs` (se achar erro neles, relate — não conserte); qualquer item de F4.

## Armadilhas desta WO

- **`npm run regress -- --update`**: o `--` é obrigatório para o npm repassar o argumento ao script. Sem ele, o npm engole o `--update` e o instrumento roda em modo comparação, saindo 1 por falta de linha de base.
- **O instrumento escreve num diretório temporário do sistema** (`vf-regress-*` em `os.tmpdir()`) e o apaga no `finally`. Se uma execução for interrompida no meio, pode sobrar um — cite no relatório se vir.
- **Edições 10 e 11 são duas metades de remoção na mesma seção do IDEAS** e a 12 é a inserção: aplique na ordem. A 11 depende de a entrada de 2026-07-07 ser a ÚLTIMA de «Ideias Ativas — Assistente» (conferido pelo chat no commit `b977af1`).

---

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` lista **exatamente**: ` M` em `.claude/settings.json`, `CLAUDE.md`, `README.md`, `package.json`, `meta/CEREBRO.md`, `meta/CHANGELOG.md`, `meta/CONTEXT.md`, `meta/DECISIONS.md`, `meta/GLOSSARY.md`, `meta/IDEAS.md`, `meta/STATUS.md` (**11 `M`**) e `??` em `meta/workorders/261112-wo0002-readme-regress.md`, `scripts/regress-baseline.json`, `scripts/regress.mjs`, `specs/261112-readme-regress.md` (**4 `??`**). Nada em `src/` nem `dist/`.
- [ ] `npm run regress; echo "rc=$?"` → última linha `OK — nenhuma chave antiga mudou` e `rc=0`.
  - **Quem roda:** quem aplica. **Chega no ramo?** Sim: `scripts/regress.mjs` → `loadGenerators()` → `generateContent` de `src/core/generate.js` para cada chave. **Pergunta que NÃO responde:** «presta?» (aparência) — e isso aparece na própria saída (`nao olhado: …`).
- [ ] **Prova de vida** (o instrumento reprova quando deve):
  `node -e "const f=require('fs');const b=JSON.parse(f.readFileSync('scripts/regress-baseline.json','utf8'));b['artdeco/corner/main/42'].sha1='000000000000';f.writeFileSync('../261112-regress-bad.json',JSON.stringify(b))" && node scripts/regress.mjs --baseline ../261112-regress-bad.json; echo "rc=$?"`
  → `mudaram: 1`, a linha `MUDOU: artdeco/corner/main/42`, `REPROVADO (1)` e `rc=1`. Se der `rc=0`, o instrumento não reprova: **PARE e reporte**.
- [ ] **Conferência cruzada** com a linha de base do chat: `node scripts/regress.mjs --baseline ../261112-regress-baseline-chat.json; echo "rc=$?"` → `mudaram: 0`, `novas: 0`, `rc=0`. **Deduzido — relate o cru, não pare**: diferença aqui indicaria arredondamento diferente entre as máquinas (na WO 0001 não houve).
- [ ] `wc -l scripts/regress-baseline.json` → **320** (318 chaves + `{` + `}`; medido no protótipo).
- [ ] `grep -c '"regress": "node scripts/regress.mjs"' package.json` → **1**.
- [ ] `grep -c "^- Testes/validação: \`npm run regress\`" CLAUDE.md` → **1**; `grep -c "não há suíte" CLAUDE.md meta/CEREBRO.md` → `CLAUDE.md:0` e `meta/CEREBRO.md:0`.
- [ ] `grep -c "^- \[ \] \*\*Colar as Instruções" meta/STATUS.md` → **0**; `grep -c "^- \[ \] \*\*Expandir \`README.md\`" meta/STATUS.md` → **0**; `grep -c "^- \[ \] \*\*Licença:" meta/STATUS.md` → **1**; `grep -c "roteiro 8/8" meta/STATUS.md` → **1**.
- [ ] `grep -c "^### 2026-11-11 — Promover\|^### 2026-07-07 — Verificação por comparação headless" meta/IDEAS.md` → **0**; `grep -c "^- \*\*Comparação antes/depois como prática padrão" meta/IDEAS.md` → **1**; `grep -c "^## 🛌 Adiadas" meta/IDEAS.md` → **1**.
- [ ] `grep -c "^## DEC-014 " meta/DECISIONS.md` → **1**; `grep -c "^- \*\*\`npm run regress\`\*\* — instrumento" meta/CHANGELOG.md` → **1**.
- [ ] `git diff --stat -- src dist` → vazio.
- [ ] Fora do repo: `../261112-regress-bad.json` (prova de vida) e `../261112-regress-baseline-chat.json` ficam na pasta-pai — cite-os no relatório; nenhum `vf-regress-*` sobrando no temporário.

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · o que fugiu do texto literal · a saída CRUA das três execuções do `regress` (normal, prova de vida, cruzada) · arquivos tocados · commit e push. Escreva DEPOIS de resolver o push.

## Commit — blocos separados, mensagem SEM acento

```
git add package.json CLAUDE.md README.md .claude/settings.json scripts/regress.mjs scripts/regress-baseline.json meta/CEREBRO.md meta/CONTEXT.md meta/GLOSSARY.md meta/STATUS.md meta/IDEAS.md meta/CHANGELOG.md meta/DECISIONS.md specs/261112-readme-regress.md meta/workorders/261112-wo0002-readme-regress.md
```

```
git commit -m "feat(scripts): adiciona npm run regress e README publico" -m "scripts/regress.mjs compara as 318 combinacoes estilo x tipo com scripts/regress-baseline.json e sai 1 se algo antigo mudar (DEC-014). README descreve o projeto, os 9 estilos e o fluxo de dev. STATUS: sai o item de colar Instrucoes, entra o roteiro 8/8 da Flow Fields e o item de licenca. Ver WO 0002."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
