# SPEC — README público e `npm run regress`

> Spec de duas entregas de infraestrutura que andam juntas: o README passa a documentar o `regress`, e o `regress` só existe porque a comparação antes/depois já rodou três vezes. O COMO está em `meta/workorders/261112-wo0002-readme-regress.md`.
> Escrita em 2026-11-12 a partir de um protótipo medido fora do repositório (VM do chat, Node 22, `npm ci`).

## Problema
1. **README.** O projeto está público no GitHub Pages desde v0.3.0 e o `README.md` é uma linha só — com aspas literais e CRLF (`"# vectorforge" `, sobra de um `echo` do CMD). Quem chega pelo GitHub não sabe o que o projeto é nem como abrir.
2. **Regressão.** A conferência «nenhum gerador antigo mudou» já foi feita três vezes, cada vez com um script descartável diferente (Playwright em DEC-010/011, sonda Node na WO 0001). Pela regra do kit, sonda rodada uma segunda vez para comparar já é instrumento sem teste. Sem instrumento versionado, a próxima mudança de gerador depende de alguém lembrar de reescrever a sonda.

## Critérios de aceite (verificáveis)
- [ ] `npm run regress` existe (`package.json`) e roda só com Node + o esbuild já instalado, sem navegador. Protótipo: 0,9 s.
- [ ] Sem linha de base → sai **1** e diz «rode com --update».
- [ ] `npm run regress -- --update` grava `scripts/regress-baseline.json` com **318** chaves (53 tipos × 2 tamanhos × 3 jogos de parâmetros), **uma por linha**, e não grava se alguma chave for não-determinística.
- [ ] Com a linha de base recém-gravada → sai **0** e imprime `OK — nenhuma chave antiga mudou`.
- [ ] **Prova de vida:** contra uma cópia da linha de base com 1 hash trocado → sai **1** e lista exatamente aquela chave como `MUDOU`.
- [ ] **Conferência cruzada:** a linha de base gravada na máquina do dono, comparada à do chat (`../261112-regress-baseline-chat.json`), dá `mudaram: 0` — o mesmo resultado que a sonda já deu na WO 0001 (deduzido: relate o cru).
- [ ] Nenhum arquivo de `src/` nem o `dist/` muda (o instrumento só lê).
- [ ] `README.md` em LF, sem as aspas; cada caminho relativo citado nele existe no repositório; a contagem «9 estilos, 53 tipos» e a tabela batem com `TYPES_BY_STYLE`.
- [ ] Olho humano (roteiro do dono): o README renderiza no GitHub com a tabela e os blocos de código, e o link do Pages abre o app.

## Decisões de design
- **Linha de base versionada** em `scripts/regress-baseline.json`, sem tempo de execução (só `sha1` de 12 hex + `bytes`), em ordem estável e uma chave por linha: o diff do git mostra exatamente quais saídas mudaram.
- **Chave nova não reprova; mudou, sumiu ou oscilou reprova.** Tipo novo é o caso normal de crescimento; a linha de base o absorve com `--update`, que é um gesto explícito e fica visível no commit.
- **Sem dependência nova.** Usa o esbuild que já é devDependency para bundlar `generate.js` + `state.js` num arquivo temporário e importá-lo — o `src/` é ESM em `.js`, que o Node puro não importa sem `"type": "module"` (mudar isso afetaria o `build.js`, que é CommonJS).
- **Stub mínimo de `document`** (o `view.js` registra listeners no topo do módulo; o `genGlyph` lê a textarea) — o mesmo que a sonda da WO 0001 usou.
- **Não dá veredito sobre aparência** e diz isso na própria saída (`nao olhado: …`).
- **README em PT-BR**, sem prints por enquanto (sugestões no chat) e **sem seção de licença**: o projeto não declara licença e o assistente não inventa uma.

## Fora de escopo
- CI (GitHub Actions rodando `regress` + checagem de `dist/` sincronizado) — o `regress` é o pré-requisito; fica no backlog.
- Licença, prints/GIFs no README, versão em inglês.
- Pixel art, Text→Form com texto, Draw mode e export no instrumento.

## Passos
1. Gravar a linha de base na máquina do dono e provar que o instrumento reprova quando deve.
2. Registrar: `package.json`, `CLAUDE.md`, CEREBRO (técnica de validação), CONTEXT, GLOSSARY, STATUS (com as duas correções pendentes), IDEAS, CHANGELOG, DEC-014.
3. Roteiro do dono: README no GitHub.
