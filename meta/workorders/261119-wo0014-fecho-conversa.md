# WO 0014 — fecho da conversa de 2026-11-16 a 2026-11-19

> **Tipo:** WO de DOC (registro). Não toca `src/` nem `dist/`: sem build, sem regress.
> **Config sugerida:** modelo mais leve (Sonnet) · `/effort low`.
> **Pré-requisito:** commit `10178d6`, árvore limpa.
> **Base:** pedido do dono no chat em 2026-11-19 (preparar a transferência para uma conversa nova; anti-repetição fica para a próxima conversa).
> **Arquivos que o chat gravou no disco e esta WO versiona:**
>   - `logs/2026-11-19.md` — sha1 `7977d5a02fff6a0994e14c6bd2dd7b2051c7c155`
> **Fora do repo (não versionar):** `../261119-HANDOFF-BRIEF.md` (pasta-pai).
> **Âncora semântica:** trecho que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**.
> **Idempotência:** procure o texto NOVO INTEIRO. Nas Edições 1, 3, 4, 5, 6 a âncora fica dentro do texto novo; nas Edições 2 ela some. Já aplicada: **PULE** e diga no relatório.
> **Âncoras lidas em** (commit `10178d6`; trecho = início da âncora):
>   - Edição 1 · `meta/STATUS.md` — `- **Ordem das frentes:** depois do piloto, o dono escolheu «parados primeiro» — `
>   - Edição 2 · `meta/STATUS.md` — `> Rolante: só as entradas mais recentes. As anteriores (2026-11-11 a 2026-11-15)`
>   - Edição 3 · `meta/STATUS.md` — `**2026-11-18** - WO 0012 aplicada pelo Code (´95f5034´, empurrado): v0.10.0, F5 `
>   - Edição 4 · `meta/ROADMAP.md` — `- [ ] Esqueleto nos 19 tipos dos lotes 2 e 3 (o piloto convenceu: roteiro 1–6 ok`
>   - Edição 5 · `meta/GLOSSARY.md` — `- **Khatam** — estrela de 8 pontas feita de dois quadrados ({8/2}); em malha qua`
>   - Edição 6 · `meta/IDEAS.md` — `## 📮 Feedback para o Kit`
> **NÃO rode `/wrap` depois desta WO:** o log do dia vem pronto do chat e o «Última conversa» é enxugado aqui (o `/wrap` o faria crescer de novo — IDEAS, feedback de 2026-11-15).

---

## Edição 0 — preparo

1. `sha1sum logs/2026-11-19.md` → bate com o cabeçalho. Diferente: **PARE**.
2. `git status --short` → exatamente `?? logs/2026-11-19.md` e `?? meta/workorders/261119-wo0014-fecho-conversa.md`. Outra linha: **PARE**.
3. **Higiene (encolhe o STATUS):** a Edição 2 tira do «Última conversa» quatro entradas (2026-11-15 (2), 2026-11-16, 2026-11-17, 2026-11-17 (2)). Antes de aplicar, confira que cada uma tem seu registro no log do dia: `grep -c "WO 0005\|WO 0007\|WO 0009\|WO 0011" logs/2026-11-15.md logs/2026-11-16.md logs/2026-11-17.md` → cada arquivo ≥ **1**. Algum 0: **PARE e reporte**.

## Edição 1 — `meta/STATUS.md` · ordem das frentes: anti-repeticao na proxima conversa

**Âncora:**

```
- **Ordem das frentes:** depois do piloto, o dono escolheu «parados primeiro» — Celta + Islâmico [relatado pelo dono, 2026-11-18]; a F4/B (implementação da nova interface) segue aguardando a vez. **Pendente também:** atualização do Kit v1.151.0 na pasta-pai (`../261118-kcm-update-v1.151.0/`, chegou em 2026-11-18; o projeto está na v1.135.0) — merge é frente própria (fusão do CEREBRO e das Instruções).
```

**Substituir por:**

```
- **Ordem das frentes:** depois do piloto, o dono escolheu «parados primeiro» — Celta + Islâmico [relatado pelo dono, 2026-11-18]; a F4/B (implementação da nova interface) segue aguardando a vez. **Pendente também:** atualização do Kit v1.151.0 na pasta-pai (`../261118-kcm-update-v1.151.0/`, chegou em 2026-11-18; o projeto está na v1.135.0) — merge é frente própria (fusão do CEREBRO e das Instruções). **Na troca de conversa de 2026-11-19, o dono deixou para a PRÓXIMA conversa a anti-repetição no sorteio (R e Surprise) com a coluna `caras` no `npm run seeds`** [relatado pelo dono, 2026-11-19] — ver IDEAS «Repetição em 10 cliques».
```

## Edição 2 — `meta/STATUS.md` · Ultima conversa: enxuga as entradas antigas

**Âncora:**

```
> Rolante: só as entradas mais recentes. As anteriores (2026-11-11 a 2026-11-15) estão em `logs/2026-11-11.md`, `logs/2026-11-12.md` e `logs/2026-11-15.md` (enxugado pela WO 0006).

**2026-11-15 (2)** - WO 0005 aplicada pelo Code (`c4d5146`, empurrado): v0.6.0, `npm run seeds` (catraca) e lote Botanico (tree estocastica, Koch e Dragon em 5 curvas, Symmetry = copias no Dragon, enquadramento ~83%); DEC-017 e FIX-004 (build injetava o bundle com `String.replace` e quebrava com `$&`). Regress: 18 chaves `botanical/*` mudaram, 0 fora; seeds formas>1 3/53 -> 6/53; sonda jsdom 18/18. Visual: roteiro do dono 1-6 ok depois [relatado pelo dono, registrado pela WO 0006]. Proximo passo: dono ve as curvas novas; depois um lote F5 por estilo; mockup da F4/B segue aguardando.

**2026-11-16** - WO 0007 aplicada pelo Code (`b7d997a`, empurrado): v0.7.0, F5 lote 2 — 12 tipos de Art Deco e Geometrico com escolhas semeadas; `vary` em `genADFrame`/`genMandala` para nao vazar em Celta, Islamico e Organico; DEC-018. Regress: 72 chaves mudaram, 0 fora do lote; seeds formas>1 6/53 -> 18/53; sonda jsdom 18/18 (medido no relatorio do apply). Visual: roteiro do dono 1-8 ok depois [relatado pelo dono, 2026-11-17, registrado pela WO 0008]. Proximo passo: dono ve o lote 2; depois proximo lote F5; mockup da F4/B segue aguardando.

**2026-11-17** - WO 0009 aplicada pelo Code (`d701f0b`, empurrado): v0.8.0, F5 lote 3 — 11 tipos do Barroco e do Vitoriano com escolhas semeadas; `victorian/flourish` e `victorian/cartouche` deixam de ser copias dos barrocos (`style`); DEC-019. Regress: 66 chaves mudaram, 0 fora do lote; seeds formas>1 18/53 -> 29/53; sonda de UI 18 OK (medido no relatorio do apply). Visual: roteiro do dono 1-7 ok depois [relatado pelo dono, 2026-11-17, registrado pela WO 0010]. Proximo passo: dono ve o lote 3; depois proximo lote F5; mockup da F4/B segue aguardando.

**2026-11-17 (2)** - WO 0011 aplicada pelo Code (`b780556`, empurrado): v0.9.0, regua de silhueta no `npm run seeds` (`scripts/silhouette.mjs`) e piloto do esqueleto semeado em 4 tipos (medalhao e padrao Art Deco, mandala e simbolo geometricos); DEC-020. Regress: 24 chaves mudaram, 0 fora dos 4 tipos; seeds `silhueta>=25%` 6/53 -> 10/53, formas>1 29/53; sonda de UI 18 OK (medido no relatorio do apply). Visual: roteiro do piloto 1-6 ok depois [relatado pelo dono, 2026-11-17, registrado pela WO 0012]. Proximo passo: dono faz o roteiro; se convencer, esqueleto nos 19 tipos dos lotes 2 e 3.
```

**Substituir por:**

```
> Rolante: só as entradas mais recentes. As anteriores estão nos logs do dia: 2026-11-11 a 2026-11-15 em `logs/2026-11-11.md`, `logs/2026-11-12.md` e `logs/2026-11-15.md`; WO 0005 (2026-11-15), WO 0007 (2026-11-16), WO 0009 e WO 0011 (2026-11-17) em `logs/2026-11-15.md`, `logs/2026-11-16.md` e `logs/2026-11-17.md` (enxugado pela WO 0014).
```

## Edição 3 — `meta/STATUS.md` · Ultima conversa: entrada de 2026-11-19

**Âncora:**

```
**2026-11-18** - WO 0012 aplicada pelo Code (`95f5034`, empurrado): v0.10.0, F5 lote 4 — Celta + Islamico com esqueleto semeado nos 12 tipos e geradores proprios para os 6 que emprestavam (borda, medalhao, knotwork, espiral celtas; borda, medalhao islamicos); girih e pattern com motivos proprios; DEC-021. Regress: 72 chaves mudaram, 0 fora de celtic/islamic; seeds formas>1 29/53 -> 41/53, `silhueta>=25%` 10/53 -> 22/53; sonda de UI 18 OK (medido no relatorio do apply). Visual: roteiro do dono 1-7 ok depois [relatado pelo dono, 2026-11-18, registrado pela WO 0013]. Proximo passo: dono faz o roteiro; depois Minimal + Organico (parados) ou esqueleto nos 19 tipos dos lotes 2 e 3.
```

**Substituir por:**

```
**2026-11-18** - WO 0012 aplicada pelo Code (`95f5034`, empurrado): v0.10.0, F5 lote 4 — Celta + Islamico com esqueleto semeado nos 12 tipos e geradores proprios para os 6 que emprestavam (borda, medalhao, knotwork, espiral celtas; borda, medalhao islamicos); girih e pattern com motivos proprios; DEC-021. Regress: 72 chaves mudaram, 0 fora de celtic/islamic; seeds formas>1 29/53 -> 41/53, `silhueta>=25%` 10/53 -> 22/53; sonda de UI 18 OK (medido no relatorio do apply). Visual: roteiro do dono 1-7 ok depois [relatado pelo dono, 2026-11-18, registrado pela WO 0013]. Proximo passo: dono faz o roteiro; depois Minimal + Organico (parados) ou esqueleto nos 19 tipos dos lotes 2 e 3.

**2026-11-19** - Fecho da conversa de 2026-11-16 a 2026-11-19 (WO 0014, so doc): WO 0013 conferida (`10178d6`); roteiro do lote 4 1-7 ok e a queixa de repeticao ja registrados; brief `../261119-HANDOFF-BRIEF.md`. Proximo passo [relatado pelo dono]: anti-repeticao no sorteio (R/Surprise) + coluna `caras` no `npm run seeds`; depois merge do kit v1.151.0.
```

## Edição 4 — `meta/ROADMAP.md` · roadmap: anti-repeticao

**Âncora:**

```
- [ ] Esqueleto nos 19 tipos dos lotes 2 e 3 (o piloto convenceu: roteiro 1–6 ok em 2026-11-17).
```

**Substituir por:**

```
- [ ] Anti-repetição no sorteio (R/Surprise mostram o candidato de silhueta mais distante das últimas exibidas) + coluna `caras` no `npm run seeds` — próxima conversa, por decisão do dono (IDEAS «Repetição em 10 cliques»).
- [ ] Esqueleto nos 19 tipos dos lotes 2 e 3 (o piloto convenceu: roteiro 1–6 ok em 2026-11-17).
```

## Edição 5 — `meta/GLOSSARY.md` · termo caras

**Âncora:**

```
- **Khatam** — estrela de 8 pontas feita de dois quadrados ({8/2}); em malha quadrada, os vãos formam cruzes. Motivo do `islamic/pattern`.
```

**Substituir por:**

```
- **Khatam** — estrela de 8 pontas feita de dois quadrados ({8/2}); em malha quadrada, os vãos formam cruzes. Motivo do `islamic/pattern`.
- **Caras** — quantas silhuetas distintas um tipo produz: seeds agrupadas por IoU ≥ 0,8 na malha 16×16 da régua de silhueta. Medida pela sonda `../261117-sonda-silhueta/looks.mjs` (ainda fora do repo); candidata a coluna do `npm run seeds`. «Varia» (silhueta média alta) não é «não repete» (poucas caras).
```

## Edição 6 — `meta/IDEAS.md` · feedback para o kit: metrica proxy

**Âncora:**

```
## 📮 Feedback para o Kit
```

**Substituir por:**

```
## 📮 Feedback para o Kit

### 2026-11-19 — Instrumento que não vê o que o dono vê vira meta errada
Caso deste projeto (DEC-020): o `npm run seeds` contava «formas» (estrutura de elementos), os lotes 2 e 3 da F5 subiram o placar trocando detalhe dentro do mesmo contorno, os roteiros passaram — e o dono continuou dizendo «falta variedade». Só uma segunda régua, a silhueta, mostrou o problema; e depois uma terceira, as «caras», mostrou que mesmo com silhueta variando o dono revê a mesma cara em 10 cliques. Regra candidata para o kit: **antes de um instrumento virar meta de um lote, confira que a métrica dele reproduz a queixa do dono** (o tipo que ele reclama tem de aparecer mal na régua); placar que sobe enquanto a queixa continua é sinal de régua errada, não de dono exigente. Complementa a regra «existência não é aptidão» do kit: aqui era «estrutura não é aparência».
```

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` → ` M meta/GLOSSARY.md`, ` M meta/IDEAS.md`, ` M meta/ROADMAP.md`, ` M meta/STATUS.md`, `?? logs/2026-11-19.md`, `?? meta/workorders/261119-wo0014-fecho-conversa.md` (4 `M`, 2 `??`).
- [ ] `grep -c "^\*\*2026-11-1" meta/STATUS.md` → **2** (2026-11-18 e 2026-11-19); `grep -c "PRÓXIMA conversa a anti-repetição" meta/STATUS.md` → **1**.
- [ ] `grep -c "^- \[ \] Anti-repetição no sorteio" meta/ROADMAP.md` → **1**; `grep -c "^- \*\*Caras\*\*" meta/GLOSSARY.md` → **1**; `grep -c "^### 2026-11-19 — Instrumento que não vê" meta/IDEAS.md` → **1**.
- [ ] Nenhum arquivo fora dessa lista; nada em `src/`, `dist/` ou `scripts/`. Nenhum `.txt` nem o brief dentro do repo.

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · desvios · saída crua das conferências (inclui a Edição 0.3) · commit e push.

## Commit — blocos separados, mensagem SEM acento

```
git add meta/STATUS.md meta/ROADMAP.md meta/GLOSSARY.md meta/IDEAS.md logs/2026-11-19.md meta/workorders/261119-wo0014-fecho-conversa.md
```

```
git commit -m "docs: registra o fecho da conversa de 2026-11-16 a 2026-11-19 (WO 0014)" -m "Anti-repeticao no sorteio fica para a proxima conversa (relatado pelo dono); Ultima conversa do STATUS enxugada; termo caras no GLOSSARY; item no ROADMAP; feedback para o kit sobre metrica proxy; log de 2026-11-19."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
