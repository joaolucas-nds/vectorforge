# WO 0013 — registra o roteiro do lote 4, a pergunta sobre repetição e o kit pendente

> **Tipo:** WO de DOC (registro). Não toca `src/` nem `dist/`: sem build, sem regress.
> **Config sugerida:** modelo mais leve (Sonnet) · `/effort low`.
> **Pré-requisito:** commit `97fe682`, árvore limpa.
> **Base:** relato do dono no chat em 2026-11-18 («Roteiro do lote 4: 1–7 ok» e a pergunta sobre repetição); sonda `../261117-sonda-silhueta/looks.mjs`.
> **Âncora semântica:** trecho que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**.
> **Idempotência:** procure o texto NOVO INTEIRO. Nas Edições 2, 3, 5, 6 a âncora fica dentro do texto novo; nas Edições 1, 4 ela some. Já aplicada: **PULE** e diga no relatório.
> **Âncoras lidas em** (commit `97fe682`; trecho = início da âncora):
>   - Edição 1 · `meta/STATUS.md` — `- **F5 — Variedade procedural:** lotes 1–3 (v0.6.0–v0.8.0), piloto do esqueleto `
>   - Edição 2 · `meta/STATUS.md` — `- **Celta e Islâmico variados (v0.10.0, DEC-021):** os 12 tipos nascem com esque`
>   - Edição 3 · `meta/STATUS.md` — `- **Ordem das frentes:** depois do piloto, o dono escolheu «parados primeiro» — `
>   - Edição 4 · `meta/STATUS.md` — `**2026-11-18** - WO 0012 aplicada pelo Code (´95f5034´, empurrado): v0.10.0, F5 `
>   - Edição 5 · `meta/IDEAS.md` — `### 2026-11-17 — Padrão Art Deco pesado em canvas grande`
>   - Edição 6 · `logs/2026-11-18.md` — `v0.10.0 no ar; roteiro visual do lote 4 pendente com o dono.`
> **NÃO rode `/wrap` depois desta WO:** a seção do chat no log do dia vem pela Edição 6, e o «Última conversa» é corrigido pela Edição 4.

---

## Edição 0 — preparo

1. `git status --short` → exatamente `?? meta/workorders/261118-wo0013-roteiro-lote4-repeticao.md`. Outra linha: **PARE**.

## Edição 1 — `meta/STATUS.md` · Em Progresso: roteiro do lote 4 e repeticao

**Âncora:**

```
- **F5 — Variedade procedural:** lotes 1–3 (v0.6.0–v0.8.0), piloto do esqueleto (v0.9.0, roteiro 1–6 ok [relatado pelo dono, 2026-11-17]) e lote 4 Celta + Islâmico (v0.10.0) entregues — placar `formas>1: 41/53`, **`silhueta>=25%: 22/53`**. Roteiro do lote 4 pendente. Próximo: Minimal + Orgânico (parados) e o esqueleto nos 19 tipos dos lotes 2 e 3.
```

**Substituir por:**

```
- **F5 — Variedade procedural:** lotes 1–3 (v0.6.0–v0.8.0), piloto do esqueleto (v0.9.0, roteiro 1–6 ok [relatado pelo dono, 2026-11-17]) e lote 4 Celta + Islâmico (v0.10.0) entregues — placar `formas>1: 41/53`, **`silhueta>=25%: 22/53`**. Roteiro do lote 4 1–7 ok [relatado pelo dono, 2026-11-18]. **O dono ainda vê repetição:** «em 10 cliques eu vi a mesma coisa umas 2-3 vezes» [relatado pelo dono, 2026-11-18] — medido: a maioria dos tipos tem 1–17 «caras» de silhueta em 200 seeds, e rever uma cara em 10 cliques acontece em ~100% das sessões (só `botanical/tree` escapa: 200 caras, 20%). Opções no IDEAS («Repetição em 10 cliques»). Próximo: Minimal + Orgânico (parados) e o esqueleto nos 19 tipos dos lotes 2 e 3.
```

## Edição 2 — `meta/STATUS.md` · Funcionando: lote 4 validado

**Âncora:**

```
- **Celta e Islâmico variados (v0.10.0, DEC-021):** os 12 tipos nascem com esqueleto semeado; borda e medalhão celtas, painel de tranças, espiral (tríscele), borda islâmica e shamsa com pingentes têm gerador próprio (antes emprestavam a moldura Art Deco, a mandala, a espiral do Orgânico). `islamic/girih` e `islamic/pattern` deixam de sair iguais.
```

**Substituir por:**

```
- **Celta e Islâmico variados (v0.10.0, DEC-021):** os 12 tipos nascem com esqueleto semeado; borda e medalhão celtas, painel de tranças, espiral (tríscele), borda islâmica e shamsa com pingentes têm gerador próprio (antes emprestavam a moldura Art Deco, a mandala, a espiral do Orgânico). `islamic/girih` e `islamic/pattern` deixam de sair iguais. Roteiro visual 1–7 ok [relatado pelo dono, 2026-11-18].
```

## Edição 3 — `meta/STATUS.md` · ordem das frentes: kit pendente

**Âncora:**

```
- **Ordem das frentes:** depois do piloto, o dono escolheu «parados primeiro» — Celta + Islâmico [relatado pelo dono, 2026-11-18]; a F4/B (implementação da nova interface) segue aguardando a vez.
```

**Substituir por:**

```
- **Ordem das frentes:** depois do piloto, o dono escolheu «parados primeiro» — Celta + Islâmico [relatado pelo dono, 2026-11-18]; a F4/B (implementação da nova interface) segue aguardando a vez. **Pendente também:** atualização do Kit v1.151.0 na pasta-pai (`../261118-kcm-update-v1.151.0/`, chegou em 2026-11-18; o projeto está na v1.135.0) — merge é frente própria (fusão do CEREBRO e das Instruções).
```

## Edição 4 — `meta/STATUS.md` · Ultima conversa: roteiro do lote 4 ok

**Âncora:**

```
**2026-11-18** - WO 0012 aplicada pelo Code (`95f5034`, empurrado): v0.10.0, F5 lote 4 — Celta + Islamico com esqueleto semeado nos 12 tipos e geradores proprios para os 6 que emprestavam (borda, medalhao, knotwork, espiral celtas; borda, medalhao islamicos); girih e pattern com motivos proprios; DEC-021. Regress: 72 chaves mudaram, 0 fora de celtic/islamic; seeds formas>1 29/53 -> 41/53, `silhueta>=25%` 10/53 -> 22/53; sonda de UI 18 OK (medido no relatorio do apply). Visual: roteiro do lote 4 pendente com o dono. Proximo passo: dono faz o roteiro; depois Minimal + Organico (parados) ou esqueleto nos 19 tipos dos lotes 2 e 3.
```

**Substituir por:**

```
**2026-11-18** - WO 0012 aplicada pelo Code (`95f5034`, empurrado): v0.10.0, F5 lote 4 — Celta + Islamico com esqueleto semeado nos 12 tipos e geradores proprios para os 6 que emprestavam (borda, medalhao, knotwork, espiral celtas; borda, medalhao islamicos); girih e pattern com motivos proprios; DEC-021. Regress: 72 chaves mudaram, 0 fora de celtic/islamic; seeds formas>1 29/53 -> 41/53, `silhueta>=25%` 10/53 -> 22/53; sonda de UI 18 OK (medido no relatorio do apply). Visual: roteiro do dono 1-7 ok depois [relatado pelo dono, 2026-11-18, registrado pela WO 0013]. Proximo passo: dono faz o roteiro; depois Minimal + Organico (parados) ou esqueleto nos 19 tipos dos lotes 2 e 3.
```

## Edição 5 — `meta/IDEAS.md` · ideia: repeticao em 10 cliques

**Âncora:**

```
### 2026-11-17 — Padrão Art Deco pesado em canvas grande
```

**Substituir por:**

```
### 2026-11-18 — Repetição em 10 cliques: anti-repetição no sorteio + mais «caras» por tipo
Pergunta do dono depois do lote 4 [relatado pelo dono, 2026-11-18]: «não é possível aumentar as possibilidades de geração? em 10 cliques eu vi a mesma coisa umas 2-3 vezes». Medido pela sonda `../261117-sonda-silhueta/looks.mjs` (relatório `261118-1510-CARAS-v0.10.0.txt`): 200 seeds por tipo agrupadas por silhueta (IoU ≥ 0,8 na malha 16×16) — a maioria dos tipos tem 1–17 caras e a mais comum cobre 20–65% das seeds; a chance de rever uma cara em 10 cliques é ~100% em 51 dos 53 tipos (`botanical/tree`: 200 caras, 20%; `botanical/dragon` 75%). Não é o PRNG: é o espaço de saída — escolhas discretas de 3–7 opções, com a silhueta decidida por um ou dois eixos. Pelo «problema do aniversário», ficar abaixo de 50% de repetição em 10 cliques pede ~65 caras igualmente prováveis por tipo. Caminhos: (a) **anti-repetição no sorteio** — R/Surprise geram alguns candidatos e mostram o de silhueta mais distante das últimas exibidas (amostragem do «melhor candidato», de Mitchell; mesma família da busca por novidade); vale para os 53 tipos de uma vez; (b) **valores contínuos** no esqueleto (escala, proporção, giro) em vez de 3 valores fixos; (c) **composição recursiva** (cada anel/camada sorteia o próprio motivo e contorno, como as regras do L-System na árvore); (d) **equilibrar as probabilidades** para nenhuma cara dominar; (e) nova coluna `caras` no `npm run seeds` para medir. Decisão do dono.

### 2026-11-17 — Padrão Art Deco pesado em canvas grande
```

## Edição 6 — `logs/2026-11-18.md` · Conversa 3 (chat)

**Âncora:**

```
v0.10.0 no ar; roteiro visual do lote 4 pendente com o dono.
```

**Substituir por:**

```
v0.10.0 no ar; roteiro visual do lote 4 pendente com o dono.

## Conversa 3 (chat)

## Objetivo do dia
Conferir a WO 0012, registrar o roteiro do lote 4 e responder: «nao e possivel aumentar as possibilidades de geracao? em 10 cliques eu vi a mesma coisa umas 2-3 vezes».

## Feito
- Relatorios `261118-1454-code-vectorforge-apply-wo0012.txt` e `261118-1459-code-vectorforge-wrap-wo0012.txt` lidos inteiros e conferidos (`95f5034`, `97fe682` empurrados, arvore limpa); arquivados com os contact sheets do lote 4.
- Roteiro do lote 4: 1-7 ok [relatado pelo dono, 2026-11-18].
- Sonda `looks.mjs` (pasta-pai, `261117-sonda-silhueta/`): «caras» de silhueta por tipo em 200 seeds; rever uma cara em 10 cliques ~100% em 51/53 tipos. Opcoes no IDEAS.
- Chegou `../261118-kcm-update-v1.151.0/` (atualizacao do kit); manifesto lido ate a tabela de destinos; merge nao feito (frente propria, registrado no STATUS).

## Decisoes
- Nenhuma: a direcao (anti-repeticao, valores continuos, composicao recursiva) e do dono.

## Bugs
- Nenhum.

## Aprendizados / armadilhas
- «Varia» (formas, silhueta media) nao e «nao repete»: um tipo pode ter silhueta media alta e poucas caras. A experiencia de clicar 10 vezes depende do NUMERO de caras e de como elas se distribuem.

## Onde parei
Aguardando a decisao do dono sobre a repeticao e sobre o merge do kit.

## Próximos passos
- Dono escolhe: anti-repeticao no sorteio (rapido, os 53 tipos) e/ou mais caras por tipo; e quando fazer o merge do kit v1.151.0.
```

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` → ` M logs/2026-11-18.md`, ` M meta/IDEAS.md`, ` M meta/STATUS.md`, `?? meta/workorders/261118-wo0013-roteiro-lote4-repeticao.md` (3 `M`, 1 `??`).
- [ ] `grep -c "pendente com o dono" meta/STATUS.md` → **0**; `grep -c "1–7 ok \[relatado pelo dono, 2026-11-18\]" meta/STATUS.md` → **2**; `grep -c "kcm-update-v1.151.0" meta/STATUS.md` → **1**.
- [ ] `grep -c "^### 2026-11-18 — Repetição em 10 cliques" meta/IDEAS.md` → **1**; `grep -c "^## Conversa 3 (chat)" logs/2026-11-18.md` → **1**.

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · desvios · saída crua das conferências · commit e push.

## Commit — blocos separados, mensagem SEM acento

```
git add meta/STATUS.md meta/IDEAS.md logs/2026-11-18.md meta/workorders/261118-wo0013-roteiro-lote4-repeticao.md
```

```
git commit -m "docs: registra o roteiro do lote 4 e a medicao de repeticao (WO 0013)" -m "Roteiro do Celta + Islamico 1-7 ok (relatado pelo dono); dono ainda ve a mesma cara 2-3 vezes em 10 cliques; medido: 1-17 caras de silhueta por tipo, repeticao em 10 cliques ~100% em 51/53. Opcoes no IDEAS; merge do kit v1.151.0 pendente."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
