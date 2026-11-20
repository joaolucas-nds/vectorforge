# WO 0016 — registro do roteiro da anti-repetição (1–9 ok) · só doc

> **Tipo:** só doc — STATUS (3), DECISIONS (1), log do dia (3). Não toca `src/`, `dist/` nem `scripts/`: sem build; a rede é o `git diff`.
> **Config sugerida:** Sonnet · `/effort low`.
> **Pré-requisito:** commit `56bd8c8`.
> **Base:** relato do dono no chat em 2026-11-19: «Roteiro da anti-repetição 1–9 ok» (roteiro de 9 itens entregue junto da WO 0015).
> **Âncora semântica:** linha inteira; trecho que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**.
> **Idempotência:** texto novo inteiro presente → **PULE** e diga no relatório.
> **Âncoras lidas em** commit `56bd8c8`.
> **Próximo comando:** nenhum — **não rode `/wrap` depois.**

---

## Edição 0 — preparo

`git status --short` → exatamente `?? meta/workorders/261119-wo0016-roteiro-anti-repeticao.md`. Outra linha: **PARE**.

## Edição 1 — `meta/STATUS.md` · funcionando: roteiro da anti-repetição

**Âncora**:

```
- **Anti-repetição no R e no Surprise (v0.11.0, DEC-022):** cada clique sorteia até 12 candidatos (orçamento ~30 ms) e mostra o que menos repete as últimas 10 imagens — mesma silhueta ou mesmas escolhas do gerador. Medido pelo chat no `dist` (jsdom, 25 sessões de 10 R): `artdeco/pattern` e `celtic/spiral` de 100% para 8% das sessões com repetição; `geometric/symbol` e `celtic/knot` para 64%; tipos de cara única continuam em 100%. Sem texto no Text→Form e fora do Pixel Art (nesses dois, sorteio de antes). Roteiro do dono pendente.
```

**Substituir por:**

```
- **Anti-repetição no R e no Surprise (v0.11.0, DEC-022):** cada clique sorteia até 12 candidatos (orçamento ~30 ms) e mostra o que menos repete as últimas 10 imagens — mesma silhueta ou mesmas escolhas do gerador. Medido pelo chat no `dist` (jsdom, 25 sessões de 10 R): `artdeco/pattern` e `celtic/spiral` de 100% para 8% das sessões com repetição; `geometric/symbol` e `celtic/knot` para 64%; tipos de cara única continuam em 100%. Sem texto no Text→Form e fora do Pixel Art (nesses dois, sorteio de antes). Roteiro visual 1–9 ok, incluindo o tempo do clique em canvas 1200 [relatado pelo dono, 2026-11-19].
```

## Edição 2 — `meta/STATUS.md` · em progresso: próximo passo da F5

**Âncora**:

```
- **F5 — Variedade procedural:** lotes 1–3 (v0.6.0–v0.8.0), piloto do esqueleto (v0.9.0, roteiro 1–6 ok [relatado pelo dono, 2026-11-17]) e lote 4 Celta + Islâmico (v0.10.0) entregues — placar `formas>1: 41/53`, **`silhueta>=25%: 22/53`**. Roteiro do lote 4 1–7 ok [relatado pelo dono, 2026-11-18]. **O dono ainda vê repetição:** «em 10 cliques eu vi a mesma coisa umas 2-3 vezes» [relatado pelo dono, 2026-11-18] — medido: a maioria dos tipos tem 1–17 «caras» de silhueta em 200 seeds, e rever uma cara em 10 cliques acontece em ~100% das sessões (só `botanical/tree` escapa: 200 caras, 20%). Desde v0.11.0, R e Surprise evitam repetir as últimas 10 imagens (DEC-022); o que sobra de repetição é falta de caras — 19 tipos têm uma só (análise 261119). Próximo: roteiro do dono da anti-repetição; depois Minimal + Orgânico (parados) e o esqueleto nos 19 tipos dos lotes 2 e 3.
```

**Substituir por:**

```
- **F5 — Variedade procedural:** lotes 1–3 (v0.6.0–v0.8.0), piloto do esqueleto (v0.9.0, roteiro 1–6 ok [relatado pelo dono, 2026-11-17]) e lote 4 Celta + Islâmico (v0.10.0) entregues — placar `formas>1: 41/53`, **`silhueta>=25%: 22/53`**. Roteiro do lote 4 1–7 ok [relatado pelo dono, 2026-11-18]. **O dono ainda vê repetição:** «em 10 cliques eu vi a mesma coisa umas 2-3 vezes» [relatado pelo dono, 2026-11-18] — medido: a maioria dos tipos tem 1–17 «caras» de silhueta em 200 seeds, e rever uma cara em 10 cliques acontece em ~100% das sessões (só `botanical/tree` escapa: 200 caras, 20%). Desde v0.11.0, R e Surprise evitam repetir as últimas 10 imagens (DEC-022); o que sobra de repetição é falta de caras — 19 tipos têm uma só (análise 261119). Roteiro da anti-repetição 1–9 ok [relatado pelo dono, 2026-11-19]. Próximo: Minimal + Orgânico (parados) e o esqueleto nos 19 tipos dos lotes 2 e 3.
```

## Edição 3 — `meta/STATUS.md` · última conversa: roteiro registrado

**Âncora**:

```
**2026-11-19 (conversa 2)** - Analise `meta/analises/261119-ANALISE-anti-repeticao.md` (custo medido, simulacao do R e do Surprise; achado: a silhueta 16x16 nao ve o motivo, 7/16 contra o olho) e WO 0015: v0.11.0, anti-repeticao no R/Surprise (DEC-022), colunas informativas `caras`/`escolhas`, silhueta em `src/core/`, `pickOne` unico. Proximo: roteiro do dono da anti-repeticao; depois Minimal + Organico ou merge do kit v1.151.0.
```

**Substituir por:**

```
**2026-11-19 (conversa 2)** - Analise `meta/analises/261119-ANALISE-anti-repeticao.md` (custo medido, simulacao do R e do Surprise; achado: a silhueta 16x16 nao ve o motivo, 7/16 contra o olho) e WO 0015: v0.11.0, anti-repeticao no R/Surprise (DEC-022), colunas informativas `caras`/`escolhas`, silhueta em `src/core/`, `pickOne` unico. WO 0015 aplicada (`56bd8c8`, empurrado); roteiro do dono 1-9 ok [relatado pelo dono, 2026-11-19, registrado pela WO 0016]. Proximo: Minimal + Organico, esqueleto nos 19 tipos dos lotes 2 e 3, merge do kit v1.151.0 ou F4/B — escolha do dono.
```

## Edição 4 — `meta/DECISIONS.md` · DEC-022: custo conferido no roteiro

**Âncora**:

```
- Custo: +30 ms no clique típico e +60 ms no pior (padrão em canvas 1200), medidos em jsdom; no browser, conferir no roteiro.
```

**Substituir por:**

```
- Custo: +30 ms no clique típico e +60 ms no pior (padrão em canvas 1200), medidos em jsdom; no browser, o roteiro do dono (1–9 ok, item 7 = tempo do R em canvas 1200) não notou atraso [relatado pelo dono, 2026-11-19].
```

## Edição 5 — `logs/2026-11-19.md` · conversa 2: apply e roteiro no Feito

**Âncora**:

```
- WO 0015 (v0.11.0): `pickNovel` no R/Surprise, `recordChoices` no `pickOne`, silhueta em `src/core/silhouette.js`, colunas `caras`/`escolhas` no seeds, `pickOne` unico no Botanico.
```

**Substituir por:**

```
- WO 0015 (v0.11.0): `pickNovel` no R/Surprise, `recordChoices` no `pickOne`, silhueta em `src/core/silhouette.js`, colunas `caras`/`escolhas` no seeds, `pickOne` unico no Botanico.
- Relatorio `261119-1808-code-vectorforge-apply-wo0015.txt` lido inteiro e conferido contra o commit `56bd8c8` (sha1 dos 4 arquivos do chat iguais aos da WO, LF no repo, uma entrada 0.11.0 no CHANGELOG); arquivado. Roteiro do dono 1-9 ok [relatado pelo dono, 2026-11-19].
```

## Edição 6 — `logs/2026-11-19.md` · conversa 2: onde parei

**Âncora**:

```
WO 0015 entregue para aplicar; roteiro do dono no fim da WO.
```

**Substituir por:**

```
v0.11.0 no ar: WO 0015 aplicada (`56bd8c8`, empurrado; relatorio conferido contra o commit e arquivado) e roteiro do dono 1-9 ok [relatado pelo dono, 2026-11-19]. Folha de calibragem arquivada.
```

## Edição 7 — `logs/2026-11-19.md` · conversa 2: próximos passos

**Âncora**:

```
- Dono: roteiro da anti-repeticao.
```

**Substituir por:**

```
- Dono escolhe a proxima frente.
```

---

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` → ` M logs/2026-11-19.md`, ` M meta/DECISIONS.md`, ` M meta/STATUS.md`, `?? meta/workorders/261119-wo0016-roteiro-anti-repeticao.md`. Nada mais.
- [ ] `git diff --stat` → 3 arquivos; `grep -c "Roteiro do dono pendente" meta/STATUS.md` → **0**; `grep -c "1–9 ok" meta/STATUS.md` → **2**; `grep -c "1-9 ok" meta/STATUS.md` → **1**; `grep -c "Dono: roteiro da anti-repeticao" logs/2026-11-19.md` → **0**.

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · desvios · saída crua das conferências · commit e push.

## Commit — blocos separados, mensagem SEM acento

```
git add logs/2026-11-19.md meta/DECISIONS.md meta/STATUS.md meta/workorders/261119-wo0016-roteiro-anti-repeticao.md
```

```
git commit -m "docs: registra o roteiro da anti-repeticao 1-9 ok (WO 0016)" -m "Roteiro do dono da v0.11.0 (anti-repeticao no R e no Surprise) 1-9 ok, inclusive o tempo do clique em canvas 1200. STATUS, DEC-022 e log do dia atualizados."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
