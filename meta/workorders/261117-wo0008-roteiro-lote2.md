# WO 0008 — registra o roteiro visual do lote 2 da F5 (1–8 ok)

> **Tipo:** WO de DOC (registro). Não toca `src/` nem `dist/`: sem build, sem regress.
> **Config sugerida:** modelo mais leve (Sonnet) · `/effort low`.
> **Pré-requisito:** commit `c7b3a3e`, árvore limpa.
> **Base:** relato do dono no chat em 2026-11-17: «Roteiro do lote 2: 1–8 ok» (roteiro escrito pelo chat no turno da WO 0007).
> **Arquivos que o chat gravou no disco e esta WO versiona:**
>   - `logs/2026-11-17.md` — sha1 `72c4db97fc456a1e11bf4e14c3ae74f895161072`
> **Âncora semântica:** trecho que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**.
> **Idempotência:** procure o texto NOVO INTEIRO; em todas as edições a âncora some (já aplicada = texto novo presente **e** âncora ausente). Já aplicada: **PULE** e diga no relatório.
> **Âncoras lidas em** (commit `c7b3a3e`; trecho = início da âncora):
>   - Edição 1 · `meta/STATUS.md` — `- **F5 — Variedade procedural:** lote 1 (instrumento + Botânico, v0.6.0) e lote `
>   - Edição 2 · `meta/STATUS.md` — `- **Art Deco e Geométrico variados (v0.7.0, DEC-018):** os 12 tipos sorteiam var`
>   - Edição 3 · `meta/STATUS.md` — `**2026-11-16** - WO 0007 aplicada pelo Code (´b7d997a´, empurrado): v0.7.0, F5 l`
>   - Edição 4 · `meta/IDEAS.md` — `´artdeco/pattern´ tem só 8 combinações (4 motivos × 2 malhas; ´formas´ = 4). Can`
> **NÃO rode `/wrap` depois desta WO:** o log do dia já vem pronto do chat, e o «Última conversa» é corrigido aqui.

---

## Edição 0 — preparo

1. `sha1sum logs/2026-11-17.md` → bate com o cabeçalho. Diferente: **PARE**.
2. `git status --short` → exatamente `?? logs/2026-11-17.md` e `?? meta/workorders/261117-wo0008-roteiro-lote2.md`. Outra linha: **PARE**.

## Edição 1 — `meta/STATUS.md` · Em Progresso: roteiro do lote 2 ok

**Âncora:**

```
- **F5 — Variedade procedural:** lote 1 (instrumento + Botânico, v0.6.0) e lote 2 (Art Deco + Geométrico, v0.7.0) entregues — placar `formas>1: 18/53`. Próximo: um lote por estilo (Barroco, Vitoriano, Celta, Islâmico, Minimal, Orgânico). Roteiro do Botânico 1–6 ok [relatado pelo dono, 2026-11-15]; roteiro do lote 2 pendente.
```

**Substituir por:**

```
- **F5 — Variedade procedural:** lote 1 (instrumento + Botânico, v0.6.0) e lote 2 (Art Deco + Geométrico, v0.7.0) entregues — placar `formas>1: 18/53`. Próximo: um lote por estilo (Barroco, Vitoriano, Celta, Islâmico, Minimal, Orgânico). Roteiro do Botânico 1–6 ok [relatado pelo dono, 2026-11-15]; roteiro do lote 2 (Art Deco + Geométrico) 1–8 ok [relatado pelo dono, 2026-11-17].
```

## Edição 2 — `meta/STATUS.md` · Funcionando: lote 2 validado

**Âncora:**

```
- **Art Deco e Geométrico variados (v0.7.0, DEC-018):** os 12 tipos sorteiam variante de motivo, arranjo e acabamento pelo seed (ex.: medalhão com raios em cunha, degraus, leque ou alternados; tesselação com polígonos, estrelas, Truchet ou rosetas). Celta, Islâmico e Orgânico, que reusam esses geradores, não mudaram. Medido por `npm run seeds` e `npm run regress`.
```

**Substituir por:**

```
- **Art Deco e Geométrico variados (v0.7.0, DEC-018):** os 12 tipos sorteiam variante de motivo, arranjo e acabamento pelo seed (ex.: medalhão com raios em cunha, degraus, leque ou alternados; tesselação com polígonos, estrelas, Truchet ou rosetas). Celta, Islâmico e Orgânico, que reusam esses geradores, não mudaram. Medido por `npm run seeds` e `npm run regress`. Roteiro visual 1–8 ok [relatado pelo dono, 2026-11-17].
```

## Edição 3 — `meta/STATUS.md` · Ultima conversa: roteiro do lote 2 ok

**Âncora:**

```
**2026-11-16** - WO 0007 aplicada pelo Code (`b7d997a`, empurrado): v0.7.0, F5 lote 2 — 12 tipos de Art Deco e Geometrico com escolhas semeadas; `vary` em `genADFrame`/`genMandala` para nao vazar em Celta, Islamico e Organico; DEC-018. Regress: 72 chaves mudaram, 0 fora do lote; seeds formas>1 6/53 -> 18/53; sonda jsdom 18/18 (medido no relatorio do apply). Visual NAO verificado: roteiro do dono pendente. Proximo passo: dono ve o lote 2; depois proximo lote F5; mockup da F4/B segue aguardando.
```

**Substituir por:**

```
**2026-11-16** - WO 0007 aplicada pelo Code (`b7d997a`, empurrado): v0.7.0, F5 lote 2 — 12 tipos de Art Deco e Geometrico com escolhas semeadas; `vary` em `genADFrame`/`genMandala` para nao vazar em Celta, Islamico e Organico; DEC-018. Regress: 72 chaves mudaram, 0 fora do lote; seeds formas>1 6/53 -> 18/53; sonda jsdom 18/18 (medido no relatorio do apply). Visual: roteiro do dono 1-8 ok depois [relatado pelo dono, 2026-11-17, registrado pela WO 0008]. Proximo passo: dono ve o lote 2; depois proximo lote F5; mockup da F4/B segue aguardando.
```

## Edição 4 — `meta/IDEAS.md` · padrao Art Deco: roteiro ok

**Âncora:**

```
`artdeco/pattern` tem só 8 combinações (4 motivos × 2 malhas; `formas` = 4). Candidatos baratos: acento em xadrez (célula sim, célula não preenchida), malha girada 45°, motivo alternando por linha. Esperar o roteiro do dono dizer se 8 basta.
```

**Substituir por:**

```
`artdeco/pattern` tem só 8 combinações (4 motivos × 2 malhas; `formas` = 4). Candidatos baratos: acento em xadrez (célula sim, célula não preenchida), malha girada 45°, motivo alternando por linha. Roteiro do lote 2, item 4: ok [relatado pelo dono, 2026-11-17] — 8 bastam por ora. Reabrir se o dono pedir mais caras ou quando o lote de modificadores universais (F5) chegar.
```

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` → ` M meta/IDEAS.md`, ` M meta/STATUS.md`, `?? logs/2026-11-17.md`, `?? meta/workorders/261117-wo0008-roteiro-lote2.md` (2 `M`, 2 `??`).
- [ ] `git diff --stat` → `2 files changed, 4 insertions(+), 4 deletions(-)`.
- [ ] `grep -c "pendente" meta/STATUS.md` → **0**; `grep -o "1–8 ok \[relatado pelo dono, 2026-11-17\]" meta/STATUS.md | wc -l` → **2**; `grep -c "1-8 ok depois" meta/STATUS.md` → **1**; `grep -c "Esperar o roteiro do dono" meta/IDEAS.md` → **0**.

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · desvios · saída crua das conferências · commit e push.

## Commit — blocos separados, mensagem SEM acento

```
git add meta/STATUS.md meta/IDEAS.md logs/2026-11-17.md meta/workorders/261117-wo0008-roteiro-lote2.md
```

```
git commit -m "docs: registra o roteiro visual do lote 2 da F5 (WO 0008)" -m "Roteiro do Art Deco + Geometrico 1-8 ok (relatado pelo dono); STATUS sem pendencia de roteiro; ideia do padrao Art Deco adiada; log de 2026-11-17."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
