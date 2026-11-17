# WO 0010 — registra o roteiro do lote 3 e versiona a análise de variedade (silhueta)

> **Tipo:** WO de DOC (registro). Não toca `src/` nem `dist/`: sem build, sem regress.
> **Config sugerida:** modelo mais leve (Sonnet) · `/effort low`.
> **Pré-requisito:** commit `51017ec`, árvore limpa.
> **Base:** relato do dono no chat em 2026-11-17: «Roteiro do lote 3: 1–7 ok. Mas ainda sinto que faltou mais variedade»; sonda de silhueta do chat (`../261117-sonda-silhueta/`).
> **Arquivos que o chat gravou no disco e esta WO versiona:**
>   - `meta/analises/261117-ANALISE-variedade-silhueta.md` — sha1 `ad3a2e11ef325cd3ce5413402e46b3971062368d`
> **Âncora semântica:** trecho que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**.
> **Idempotência:** procure o texto NOVO INTEIRO. Nas Edições 2, 4, 5 a âncora fica dentro do texto novo; nas Edições 1, 3 ela some. Já aplicada: **PULE** e diga no relatório.
> **Âncoras lidas em** (commit `51017ec`; trecho = início da âncora):
>   - Edição 1 · `meta/STATUS.md` — `- **F5 — Variedade procedural:** lotes 1 (Botânico, v0.6.0), 2 (Art Deco + Geomé`
>   - Edição 2 · `meta/STATUS.md` — `- **Barroco e Vitoriano variados (v0.8.0, DEC-019):** 11 tipos sorteiam variante`
>   - Edição 3 · `meta/STATUS.md` — `**2026-11-17** - WO 0009 aplicada pelo Code (´d701f0b´, empurrado): v0.8.0, F5 l`
>   - Edição 4 · `meta/IDEAS.md` — `Pedido de 2026-11-12: mais opções e variações; «apertar um botão e gerar um dife`
>   - Edição 5 · `logs/2026-11-17.md` — `- Dono confere o lote 3 no olho; depois proximo lote F5 (Celta, Islamico, Minima`
> **NÃO rode `/wrap` depois desta WO:** a seção do chat no log do dia vem pela Edição 5, e o «Última conversa» é corrigido pela Edição 3.

---

## Edição 0 — preparo

1. `sha1sum meta/analises/261117-ANALISE-variedade-silhueta.md` → bate com o cabeçalho. Diferente: **PARE**.
2. `git status --short` → exatamente `?? meta/analises/261117-ANALISE-variedade-silhueta.md` e `?? meta/workorders/261117-wo0010-roteiro-lote3-analise-variedade.md`. Outra linha: **PARE**.

## Edição 1 — `meta/STATUS.md` · Em Progresso: roteiro do lote 3 ok e analise

**Âncora:**

```
- **F5 — Variedade procedural:** lotes 1 (Botânico, v0.6.0), 2 (Art Deco + Geométrico, v0.7.0) e 3 (Barroco + Vitoriano, v0.8.0) entregues — placar `formas>1: 29/53`. Próximo: Celta, Islâmico, Minimal, Orgânico. Roteiros: Botânico 1–6 ok [relatado pelo dono, 2026-11-15]; lote 2 1–8 ok [relatado pelo dono, 2026-11-17]; lote 3 pendente.
```

**Substituir por:**

```
- **F5 — Variedade procedural:** lotes 1 (Botânico, v0.6.0), 2 (Art Deco + Geométrico, v0.7.0) e 3 (Barroco + Vitoriano, v0.8.0) entregues — placar `formas>1: 29/53`. Próximo: Celta, Islâmico, Minimal, Orgânico. Roteiros: Botânico 1–6 ok [relatado pelo dono, 2026-11-15]; lote 2 1–8 ok [relatado pelo dono, 2026-11-17]; lote 3 1–7 ok [relatado pelo dono, 2026-11-17]. **Mas o dono ainda sente falta de variedade** [relatado pelo dono, 2026-11-17]: a sonda de silhueta mostrou que nos lotes 2 e 3 o seed troca detalhes dentro do mesmo contorno (silhueta muda 2–15% contra 42–66% no Botânico). Análise `meta/analises/261117-ANALISE-variedade-silhueta.md` em discussão; os lotes 4–7 esperam a decisão.
```

## Edição 2 — `meta/STATUS.md` · Funcionando: lote 3 validado

**Âncora:**

```
- **Barroco e Vitoriano variados (v0.8.0, DEC-019):** 11 tipos sorteiam variante de motivo, arranjo e acabamento pelo seed (ex.: cartela oval, escudo ou lobada no Barroco; chanfrada ou arqueada no Vitoriano; volutas em espiral, conchas em leque, contas). Flourish e cartela do Vitoriano têm repertório próprio — antes eram iguais aos barrocos em 40 de 40 seeds. Medido por `npm run seeds` e `npm run regress`.
```

**Substituir por:**

```
- **Barroco e Vitoriano variados (v0.8.0, DEC-019):** 11 tipos sorteiam variante de motivo, arranjo e acabamento pelo seed (ex.: cartela oval, escudo ou lobada no Barroco; chanfrada ou arqueada no Vitoriano; volutas em espiral, conchas em leque, contas). Flourish e cartela do Vitoriano têm repertório próprio — antes eram iguais aos barrocos em 40 de 40 seeds. Medido por `npm run seeds` e `npm run regress`. Roteiro visual 1–7 ok [relatado pelo dono, 2026-11-17].
```

## Edição 3 — `meta/STATUS.md` · Ultima conversa: roteiro do lote 3 ok

**Âncora:**

```
**2026-11-17** - WO 0009 aplicada pelo Code (`d701f0b`, empurrado): v0.8.0, F5 lote 3 — 11 tipos do Barroco e do Vitoriano com escolhas semeadas; `victorian/flourish` e `victorian/cartouche` deixam de ser copias dos barrocos (`style`); DEC-019. Regress: 66 chaves mudaram, 0 fora do lote; seeds formas>1 18/53 -> 29/53; sonda de UI 18 OK (medido no relatorio do apply). Visual: roteiro do dono pendente. Proximo passo: dono ve o lote 3; depois proximo lote F5; mockup da F4/B segue aguardando.
```

**Substituir por:**

```
**2026-11-17** - WO 0009 aplicada pelo Code (`d701f0b`, empurrado): v0.8.0, F5 lote 3 — 11 tipos do Barroco e do Vitoriano com escolhas semeadas; `victorian/flourish` e `victorian/cartouche` deixam de ser copias dos barrocos (`style`); DEC-019. Regress: 66 chaves mudaram, 0 fora do lote; seeds formas>1 18/53 -> 29/53; sonda de UI 18 OK (medido no relatorio do apply). Visual: roteiro do dono 1-7 ok depois [relatado pelo dono, 2026-11-17, registrado pela WO 0010]. Proximo passo: dono ve o lote 3; depois proximo lote F5; mockup da F4/B segue aguardando.
```

## Edição 4 — `meta/IDEAS.md` · pedido do dono: complemento de 2026-11-17

**Âncora:**

```
Pedido de 2026-11-12: mais opções e variações; «apertar um botão e gerar um diferente do último»; configuração aleatória para tudo; mais possibilidades dentro de um mesmo tipo; UX/UI mais intuitiva, prática, profissional e completa, com pesquisa. Desdobrado em três fases na análise `meta/analises/261112-ANALISE-exploracao-e-ux.md`: **A** (ciclo de exploração) — entregue em v0.5.0, DEC-015; **B** (redesenho da UI: layout, seções recolhíveis, rótulos completos, seed digitável, estado na URL, favoritos, paleta aleatória harmônica) e **C** (modificadores universais de traço/camadas/espelho/deformação e sub-estilos por tipo) — aguardam decisão. **Atualização 2026-11-15:** decisões do dono em DEC-016 (PT com seletor EN; mockup antes de código; ROADMAP renumerado). A Fase B virou a F4/B — mockup em https://claude.ai/artifact/RVCGHQTZPrHk39ntQ7627f. A Fase C virou a **F5 — Variedade procedural**, com prioridade subida: o dono notou que «a árvore é sempre a mesma silhueta», e a medição mostrou o seed sem efeito em 46 de 53 tipos.
```

**Substituir por:**

```
Pedido de 2026-11-12: mais opções e variações; «apertar um botão e gerar um diferente do último»; configuração aleatória para tudo; mais possibilidades dentro de um mesmo tipo; UX/UI mais intuitiva, prática, profissional e completa, com pesquisa. Desdobrado em três fases na análise `meta/analises/261112-ANALISE-exploracao-e-ux.md`: **A** (ciclo de exploração) — entregue em v0.5.0, DEC-015; **B** (redesenho da UI: layout, seções recolhíveis, rótulos completos, seed digitável, estado na URL, favoritos, paleta aleatória harmônica) e **C** (modificadores universais de traço/camadas/espelho/deformação e sub-estilos por tipo) — aguardam decisão. **Atualização 2026-11-15:** decisões do dono em DEC-016 (PT com seletor EN; mockup antes de código; ROADMAP renumerado). A Fase B virou a F4/B — mockup em https://claude.ai/artifact/RVCGHQTZPrHk39ntQ7627f. A Fase C virou a **F5 — Variedade procedural**, com prioridade subida: o dono notou que «a árvore é sempre a mesma silhueta», e a medição mostrou o seed sem efeito em 46 de 53 tipos.
Complemento de 2026-11-17, depois do lote 3 da F5: «ainda sinto que faltou mais variedade» [relatado pelo dono]. Medido: o seed muda o detalhe, não a silhueta, fora do Botânico — ver `meta/analises/261117-ANALISE-variedade-silhueta.md` (status: em discussão).
```

## Edição 5 — `logs/2026-11-17.md` · Conversa 3 (chat)

**Âncora:**

```
- Dono confere o lote 3 no olho; depois proximo lote F5 (Celta, Islamico, Minimal, Organico) ou F4/B.
```

**Substituir por:**

```
- Dono confere o lote 3 no olho; depois proximo lote F5 (Celta, Islamico, Minimal, Organico) ou F4/B.

## Conversa 3 (chat)

## Objetivo do dia
Conferir a WO 0009 e responder ao relato do dono: «roteiro do lote 3 1-7 ok, mas ainda sinto que faltou mais variedade».

## Feito
- Relatorios `261117-1210-code-vectorforge-apply-wo0009.txt` e `261117-1249-code-vectorforge-wrap-wo0009.txt` lidos inteiros e conferidos contra `git log`/`git status` (`d701f0b`, `51017ec` empurrados, arvore limpa); arquivados com os contact sheets do lote 3.
- Roteiro do lote 3: 1-7 ok [relatado pelo dono, 2026-11-17].
- Sonda de silhueta (`../261117-sonda-silhueta/`, fora do repo): 53 tipos x 12 seeds rasterizados; 1 - IoU da mascara de tinta em malha grossa (silhueta) e fina (detalhe). Botanico 42-66% de silhueta; lotes 2/3 de 2% (geometric/mandala) a 16% (cartelas); 24 tipos ainda 0%.
- Analise `meta/analises/261117-ANALISE-variedade-silhueta.md` (Em discussao): recomenda D (silhueta como coluna do `npm run seeds`, catraca) + piloto de A (esqueleto semeado) nos 4 tipos de silhueta mais parada; B (modificadores universais) depois e fora do seed.
- WO 0010 (so doc): STATUS, IDEAS e este log.

## Decisoes
- Nenhuma tomada: o ponto de decisao da analise e do dono. Lotes 4-7 da F5 suspensos ate la.

## Bugs
- Nenhum de produto. Na medicao: a primeira rodada em 64 px deu 0% falso para tracos finos (divisores, acanto); refeita em 128 px.

## Aprendizados / armadilhas
- A metrica `formas` do `npm run seeds` conta estrutura de elementos, nao o que se ve na miniatura: os lotes 2 e 3 a otimizaram e o dono continuou sentindo pouca variedade. Instrumento que nao olha aparencia precisa de uma segunda regua antes de virar meta.

## Onde parei
v0.8.0 no ar; F5 em 29/53 por `formas`, mas a silhueta so muda de verdade no Botanico. Aguardando a decisao do dono sobre a analise.

## Próximos passos
- Dono decide: D + piloto de A (recomendado) ou B primeiro.
```

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` → ` M logs/2026-11-17.md`, ` M meta/IDEAS.md`, ` M meta/STATUS.md`, `?? meta/analises/261117-ANALISE-variedade-silhueta.md`, `?? meta/workorders/261117-wo0010-roteiro-lote3-analise-variedade.md` (3 `M`, 2 `??`).
- [ ] `grep -c "pendente" meta/STATUS.md` → **0**; `grep -c "1–7 ok \[relatado pelo dono, 2026-11-17\]" meta/STATUS.md` → **2**; `grep -c "1-7 ok depois" meta/STATUS.md` → **1**; `grep -c "261117-ANALISE-variedade-silhueta" meta/STATUS.md meta/IDEAS.md` → `meta/STATUS.md:1`, `meta/IDEAS.md:1`.
- [ ] `grep -c "^## Conversa 3 (chat)" logs/2026-11-17.md` → **1**; `grep -c "^## Conversa" logs/2026-11-17.md` → **3**.

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · desvios · saída crua das conferências · commit e push.

## Commit — blocos separados, mensagem SEM acento

```
git add meta/STATUS.md meta/IDEAS.md logs/2026-11-17.md meta/analises/261117-ANALISE-variedade-silhueta.md meta/workorders/261117-wo0010-roteiro-lote3-analise-variedade.md
```

```
git commit -m "docs: registra o roteiro do lote 3 e a analise de variedade (WO 0010)" -m "Roteiro do Barroco + Vitoriano 1-7 ok (relatado pelo dono); dono ainda sente falta de variedade; sonda de silhueta mostra que o seed troca detalhe, nao contorno, fora do Botanico. Analise 261117 em discussao; lotes 4-7 da F5 esperam a decisao."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
