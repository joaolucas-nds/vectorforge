# WO 0012 — F5 lote 4: Celta + Islâmico com esqueleto semeado e geradores próprios (12 tipos) · v0.10.0

> **Tipo:** mista — gerador (dois arquivos inteiros gravados pelo chat + Edições 1–7 em `generic.js` e `generate.js`) + versão + linhas de base + registro (inclui o roteiro do piloto, 1–6 ok).
> **Config sugerida:** modelo mais capaz (Opus) · `/effort medium` — mudança INTENCIONAL de saída em 12 tipos; a conferência separa as 72 chaves que podem mudar das 246 que não podem.
> **Pré-requisito:** commit `630c2b3`, `node_modules/` presente.
> **Base:** escolha do dono no chat em 2026-11-18 («Parados primeiro»), depois do roteiro do piloto («1–6 ok, a receita convenceu», 2026-11-17); `specs/261118-esqueleto-celta-islamico.md`; DEC-020; prova visual `../261118-lote4-celta-8-seeds.png`, `../261118-lote4-islamico-8-seeds.png`, `../261118-lote4-girih-vs-pattern.png` (a do islâmico tem girih e pattern ainda iguais; a terceira é a versão final).
> **Arquivos que o chat gravou no disco e esta WO versiona:**
>   - `src/generators/celtic.js` — sha1 `a03fde8063773c15f32766d11f65498321e2b662`
>   - `src/generators/islamic.js` — sha1 `2ec25c96fcb2b17e4f4bcd841de1412c4372aaa0`
>   - `specs/261118-esqueleto-celta-islamico.md` — sha1 `d587e0bfa0c454a6b119c4b23a74a65861dab1ff`
>   - `logs/2026-11-18.md` — sha1 `c9e08831cdfa5a789c5049fa80c4558ccd356abb`
> **`celtic.js` e `islamic.js` foram reescritos INTEIROS pelo chat; o log do dia é novo.** Não edite: só confira o hash e versione.
> **Âncora semântica:** trecho que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**.
> **Idempotência:** procure o texto NOVO INTEIRO. Nas Edições 4, 14, 16, 23, 24, 25 a âncora fica dentro do texto novo; nas Edições 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 17, 18, 19, 20, 21, 22 ela some (já aplicada = texto novo presente **e** âncora ausente). Já aplicada: **PULE** e diga no relatório.
> **Âncoras lidas em** (commit `630c2b3`; trecho = primeira linha da âncora):
>   - Edição 1 · `src/generators/generic.js` — `import { TAU, f, pt, polyPath, starPath, mkRand, pickOne, steppedDiamondPath, spiralPath, `
>   - Edição 2 · `src/generators/generic.js` — `    : style === 'geo' ? pickOne(['polygon', 'star', 'truchet', 'rosette'], rnd) : 'polygon`
>   - Edição 3 · `src/generators/generic.js` — `  // Piloto do esqueleto semeado (DEC-020): no Art Deco, o seed escolhe também a ESCALA da`
>   - Edição 4 · `src/generators/generic.js` — `      } else if (motif === 'rosette') {`
>   - Edição 5 · `src/core/generate.js` — `import { genCelticKnot, genCelticCross } from '../generators/celtic.js';`
>   - Edição 6 · `src/core/generate.js` — `      border:   () => genADFrame(0, 0, state.w, state.h, comp, 6, rnd, SO, FG, sw),`
>   - Edição 7 · `src/core/generate.js` — `      border:    () => genADFrame(0, 0, state.w, state.h, comp, 8, rnd, SO, FG, sw),`
>   - Edição 8 · `package.json` — `  "version": "0.9.0",`
>   - Edição 9 · `package-lock.json` — `  "name": "vectorforge",`
>   - Edição 10 · `package-lock.json` — `      "name": "vectorforge",`
>   - Edição 11 · `meta/CONTEXT.md` — `| **celtic** | ´src/generators/celtic.js´ | knot, border, medallion, cross, knotwork, spir`
>   - Edição 12 · `meta/CONTEXT.md` — `| **islamic** | ´src/generators/islamic.js´ | star, girih, arabesque, border, medallion, p`
>   - Edição 13 · `meta/CONTEXT.md` — `**Padrão de reuso:** vários estilos reaproveitam geradores de outros (Celtic/Islamic reusa`
>   - Edição 14 · `meta/GLOSSARY.md` — `- **Esqueleto semeado** — o seed escolhe a COMPOSIÇÃO (contorno, escala, arranjo, desvio d`
>   - Edição 15 · `meta/STATUS.md` — `**[0.9.0]** — F5: régua de silhueta no ´npm run seeds´ e piloto do esqueleto semeado em 4 `
>   - Edição 16 · `meta/STATUS.md` — `- **Esqueleto semeado — piloto (v0.9.0, DEC-020):** nos 4 tipos, o seed escolhe também a c`
>   - Edição 17 · `meta/STATUS.md` — `- **F5 — Variedade procedural:** lotes 1–3 entregues (v0.6.0–v0.8.0) e piloto do esqueleto`
>   - Edição 18 · `meta/STATUS.md` — `- **Ordem das frentes:** o dono decidiu a análise de variedade — régua de silhueta + pilot`
>   - Edição 19 · `meta/STATUS.md` — `- **O seed ainda não muda a forma em 24 dos 53 tipos, e só muda a SILHUETA em 10** (placar`
>   - Edição 20 · `meta/STATUS.md` — `**2026-11-17 (2)** - WO 0011 aplicada pelo Code (´b780556´, empurrado): v0.9.0, regua de s`
>   - Edição 21 · `meta/ROADMAP.md` — `- [ ] Esqueleto nos 19 tipos dos lotes 2 e 3 (depois do roteiro do piloto).`
>   - Edição 22 · `meta/ROADMAP.md` — `- [ ] Um lote por estilo, já com esqueleto: Celta, Islâmico, Minimal, Orgânico (spiral, fl`
>   - Edição 23 · `meta/CHANGELOG.md` — `## [Não lançado]`
>   - Edição 24 · `meta/DECISIONS.md` — `- Se o roteiro do piloto convencer, a receita volta aos 19 tipos dos lotes 2 e 3 e é o pad`
>   - Edição 25 · `meta/IDEAS.md` — `Com a escala da célula semeada (0,8×), o pior caso do ´artdeco/pattern´ em canvas 1200 vai`
> **Próximo comando:** `/wrap wo0012-esqueleto-celta-islamico`

> **Canal dos meta neste ciclo = CODE.** Esta WO É o registro.

---

## 1. Por que

O piloto do esqueleto convenceu (roteiro 1–6 ok) e o dono escolheu atacar primeiro os tipos que não variavam nada. Celta e Islâmico marcavam 1/1/0% nos 12 tipos, metade deles emprestando geradores de outros estilos, e dois tipos islâmicos eram indistinguíveis. Tudo prototipado, medido e conferido a olho pelo chat.

## Inventário — de onde saiu a lista de edições

- **Geradores:** `grep -n "^export function" src/generators/celtic.js src/generators/islamic.js` devolve **4** funções no commit `630c2b3` (2 + 2); depois, **10** (6 + 4) — por isso os arquivos vêm inteiros do chat. Em `generic.js`, só `genPattern` muda (Edições 1–4: import, motivos, campo, desenho). No dispatcher, os imports e as 7 entradas que trocam de gerador (Edições 5–7).
- **Versão:** `package.json` (1), `package-lock.json` (2).
- **Registro:** CONTEXT (3), GLOSSARY, STATUS (6), ROADMAP (2), CHANGELOG, DECISIONS, IDEAS; o log do dia vem inteiro do chat.
- Total: **25 edições** em **11 arquivos**, mais 4 arquivos do chat, as duas linhas de base regravadas e o `dist/`.

---

## Edição 0 — preparo (antes de editar)

1. `sha1sum src/generators/celtic.js src/generators/islamic.js specs/261118-esqueleto-celta-islamico.md logs/2026-11-18.md` → bate com o cabeçalho. Diferente: **PARE**.
2. `git status --short` → exatamente ` M src/generators/celtic.js`, ` M src/generators/islamic.js`, `?? logs/2026-11-18.md`, `?? meta/workorders/261118-wo0012-esqueleto-celta-islamico.md`, `?? specs/261118-esqueleto-celta-islamico.md`. Outra linha: **PARE**.
3. **Sem prova de vida a rodar aqui:** o dispatcher ainda não importa os geradores novos (Edição 5) e o `islamic.js` do chat usa primitivas que já existem — o bundle até compila, mas só a Edição 7 liga tudo. O «antes» foi medido pelo chat no HEAD `630c2b3`: regress OK; seeds `formas>1 29/53 · distintos>1 32/53 · silhueta>=25%: 10/53`.

## Edição 1 — `src/generators/generic.js` · import de polygramPath

**Âncora** (linha de import de `core/utils.js`):

```
import { TAU, f, pt, polyPath, starPath, mkRand, pickOne, steppedDiamondPath, spiralPath, shellFanPaths, contourRadius, contourPath } from '../core/utils.js';
```

**Substituir por:**

```
import { TAU, f, pt, polyPath, starPath, mkRand, pickOne, steppedDiamondPath, spiralPath, shellFanPaths, contourRadius, contourPath, polygramPath } from '../core/utils.js';
```

## Edição 2 — `src/generators/generic.js` · genPattern: motivos do girih e do islamic

**Âncora** (fim da escolha de motivo):

```
    : style === 'geo' ? pickOne(['polygon', 'star', 'truchet', 'rosette'], rnd) : 'polygon';
```

**Substituir por:**

```
    : style === 'geo' ? pickOne(['polygon', 'star', 'truchet', 'rosette'], rnd)
    // F5 lote 4 (DEC-021): girih e islamic ganham motivos próprios (o hexágono original fica entre eles);
    // as listas do girih vêm em outra ordem para o mesmo seed não dar o mesmo desenho nos dois tipos
    : style === 'girih' ? pickOne(['hexagram', 'polygon', 'sixstar'], rnd)
    : style === 'islamic' ? pickOne(['polygon', 'khatam', 'octagon'], rnd) : 'polygon';
```

## Edição 3 — `src/generators/generic.js` · genPattern: campo e escala tambem no girih e no islamic

**Âncora** (bloco do campo semeado (DEC-020)):

```
  // Piloto do esqueleto semeado (DEC-020): no Art Deco, o seed escolhe também a ESCALA da célula
  // e o CAMPO que o padrão ocupa — página inteira · medalhão · losango · faixa · moldura · arco;
  // fora da página inteira, o campo ganha um contorno. Os outros estilos não consomem o seed aqui.
  const field = style === 'artdeco' ? pickOne(['full', 'circle', 'diamond', 'band', 'frame', 'arch'], rnd) : 'full';
  if (style === 'artdeco') cell = Math.round(cell * pickOne([0.8, 1, 1.35], rnd));
```

**Substituir por:**

```
  // Esqueleto semeado (DEC-020; girih e islamic desde o lote 4, DEC-021): o seed escolhe também a
  // ESCALA da célula e o CAMPO que o padrão ocupa — página inteira · medalhão · losango · faixa ·
  // moldura · arco; fora da página inteira, o campo ganha um contorno. O Geométrico não consome o seed aqui.
  const skeleton = style === 'artdeco' || style === 'girih' || style === 'islamic';
  const field = !skeleton ? 'full' : pickOne(style === 'girih' ? ['circle', 'full', 'band', 'arch', 'diamond', 'frame'] : ['full', 'circle', 'diamond', 'band', 'frame', 'arch'], rnd);
  if (skeleton) cell = Math.round(cell * pickOne([0.8, 1, 1.35], rnd));
```

## Edição 4 — `src/generators/generic.js` · genPattern: desenho dos motivos novos

**Âncora** (abertura do ramo `rosette`):

```
      } else if (motif === 'rosette') {
```

**Substituir por:**

```
      } else if (motif === 'hexagram') {
        parts.push(`<path d="${polygramPath(cx, cy, cell * 0.5, 6, 2)}" ${SO}/>`);
        parts.push(`<path d="${polyPath(cx, cy, cell * 0.2, 6)}" ${FG}/>`);
      } else if (motif === 'sixstar') {
        parts.push(`<path d="${starPath(cx, cy, cell * 0.5, cell * 0.29, 6)}" ${SO}/>`);
        parts.push(`<path d="${polyPath(cx, cy, cell * 0.25, 6, Math.PI / 6 - Math.PI / 2)}" ${SO}/>`);
      } else if (motif === 'khatam') {
        // khatam: estrela de 8 pontas de dois quadrados; em malha quadrada, os vãos viram cruzes
        parts.push(`<path d="${polygramPath(cx, cy, cell * 0.5, 8, 2)}" ${SO}/>`);
        parts.push(`<path d="${polyPath(cx, cy, cell * 0.16, 8, Math.PI / 8)}" ${FG}/>`);
      } else if (motif === 'octagon') {
        // octógonos que se tocam pelos lados; o quadrado no vão completa a malha 4.8.8
        parts.push(`<path d="${polyPath(cx, cy, cell * 0.54, 8, Math.PI / 8)}" ${SO}/>`);
        parts.push(`<path d="${polyPath(cx + cell / 2, cy + cell / 2, cell * 0.15, 4, 0)}" ${FG}/>`);
      } else if (motif === 'rosette') {
```

## Edição 5 — `src/core/generate.js` · imports dos geradores celtas e islamicos

**Âncora** (imports de `celtic.js` e `islamic.js`):

```
import { genCelticKnot, genCelticCross } from '../generators/celtic.js';
import { genIslamicStar, genArabesque } from '../generators/islamic.js';
```

**Substituir por:**

```
import { genCelticKnot, genCelticCross, genCelticKnotwork, genCelticBorder, genCelticMedallion, genCelticSpiral } from '../generators/celtic.js';
import { genIslamicStar, genArabesque, genIslamicBorder, genIslamicMedallion } from '../generators/islamic.js';
```

## Edição 6 — `src/core/generate.js` · dispatcher celtic: geradores proprios

**Âncora** (entradas `border` a `spiral` do bloco `celtic`):

```
      border:   () => genADFrame(0, 0, state.w, state.h, comp, 6, rnd, SO, FG, sw),
      medallion:() => genMandala(cx, cy, sz, 6, layers, comp, rnd, SO, FG, FG2, sw),
      cross:    () => genCelticCross(cx, cy, sz, comp, rnd, SO, FG, FG2, sw),
      knotwork: () => genCelticKnot(cx, cy, sz * 1.2, 8, comp, rnd, SO, FG, sw),
      spiral:   () => genOrganicSpiral(cx, cy, sz, comp, rnd, SO, FG, sw),
```

**Substituir por:**

```
      border:   () => genCelticBorder(0, 0, state.w, state.h, comp, sym, rnd, SO, FG, sw),
      medallion:() => genCelticMedallion(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw),
      cross:    () => genCelticCross(cx, cy, sz, comp, rnd, SO, FG, FG2, sw),
      knotwork: () => genCelticKnotwork(cx, cy, sz, comp, sym, rnd, SO, FG, sw),
      spiral:   () => genCelticSpiral(cx, cy, sz, comp, sym, rnd, SO, FG, sw),
```

## Edição 7 — `src/core/generate.js` · dispatcher islamic: geradores proprios

**Âncora** (entradas `border` e `medallion` do bloco `islamic`):

```
      border:    () => genADFrame(0, 0, state.w, state.h, comp, 8, rnd, SO, FG, sw),
      medallion: () => genIslamicStar(cx, cy, sz, 12, comp, rnd, SO, FG, FG2, sw),
```

**Substituir por:**

```
      border:    () => genIslamicBorder(0, 0, state.w, state.h, comp, sym, rnd, SO, FG, sw),
      medallion: () => genIslamicMedallion(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw),
```

## Edição 8 — `package.json` · versao 0.10.0

**Âncora** (campo version):

```
  "version": "0.9.0",
```

**Substituir por:**

```
  "version": "0.10.0",
```

## Edição 9 — `package-lock.json` · versao 0.10.0 (raiz)

**Âncora** (topo do arquivo):

```
  "name": "vectorforge",
  "version": "0.9.0",
```

**Substituir por:**

```
  "name": "vectorforge",
  "version": "0.10.0",
```

## Edição 10 — `package-lock.json` · versao 0.10.0 (pacote raiz)

**Âncora** (entrada `packages[""]`):

```
      "name": "vectorforge",
      "version": "0.9.0",
```

**Substituir por:**

```
      "name": "vectorforge",
      "version": "0.10.0",
```

## Edição 11 — `meta/CONTEXT.md` · Inventario: Celta com geradores proprios

**Âncora**:

```
| **celtic** | `src/generators/celtic.js` | knot, border, medallion, cross, knotwork, spiral | `genCelticKnot`, `genADFrame`‡ (reuso, n=6), `genMandala`‡ (reuso, n=6), `genCelticCross`, `genCelticKnot` (reuso, sz×1.2/n=8), `genOrganicSpiral`‡ (reuso) |
```

**Substituir por:**

```
| **celtic** | `src/generators/celtic.js` | knot, border, medallion, cross, knotwork, spiral | `genCelticKnot`, `genCelticBorder`, `genCelticMedallion`, `genCelticCross`, `genCelticKnotwork`, `genCelticSpiral` — todos do próprio estilo e com esqueleto semeado desde v0.10.0 (DEC-021); até v0.9.0, border/medallion/knotwork/spiral emprestavam `genADFrame`, `genMandala`, o `genCelticKnot` e `genOrganicSpiral` |
```

## Edição 12 — `meta/CONTEXT.md` · Inventario: Islamico com geradores proprios

**Âncora**:

```
| **islamic** | `src/generators/islamic.js` | star, girih, arabesque, border, medallion, pattern | `genIslamicStar`, `genPattern('girih')`†, `genArabesque`, `genADFrame`‡ (reuso, n=8), `genIslamicStar` (reuso, n=12), `genPattern('islamic')`† |
```

**Substituir por:**

```
| **islamic** | `src/generators/islamic.js` | star, girih, arabesque, border, medallion, pattern | `genIslamicStar`, `genPattern('girih')`†, `genArabesque`, `genIslamicBorder`, `genIslamicMedallion`, `genPattern('islamic')`† — com esqueleto semeado desde v0.10.0 (DEC-021); até v0.9.0, border emprestava `genADFrame` e medallion era o `genIslamicStar` com n=12 |
```

## Edição 13 — `meta/CONTEXT.md` · Padrao de reuso: Celta e Islamico proprios

**Âncora**:

```
**Padrão de reuso:** vários estilos reaproveitam geradores de outros (Celtic/Islamic reusam `genADFrame`/`genMandala` com parâmetros diferentes; Victorian reusa `genBQAcanthus`/`genBQCartouche`). Isso é intencional — reduz duplicação — mas significa que uma mudança em `genADFrame`, por exemplo, afeta visualmente Art Deco **e** Celtic **e** Islamic ao mesmo tempo. Conferir todos os estilos que reusam antes de alterar um gerador compartilhado. Como o reuso é sempre wireado em `generate.js` (nunca dentro do arquivo do estilo em si), basta grepar `generate.js` por `genXxx` para ver todos os pontos de reuso de um gerador. **Desde a F5 (DEC-018), gerador compartilhado só varia com o seed quando o estilo dono pede:** `genADFrame` e `genMandala` recebem `vary` (padrão `false`) no fim da assinatura, e em `genDivider`/`genPattern` só os ramos do estilo do lote sorteiam — quem reusa continua recebendo o desenho de sempre, e o `npm run regress` não vaza para fora do lote. **Reuso dentro do mesmo lote (DEC-019):** `genBQAcanthus` e `genBQCartouche` recebem `style` (`'baroque'` · `'victorian'`) e cada estilo sorteia de um repertório próprio — até v0.7.0, `victorian/flourish` e `victorian/cartouche` eram cópias byte a byte de `baroque/acanthus` e `baroque/cartouche`.
```

**Substituir por:**

```
**Padrão de reuso:** vários estilos reaproveitam geradores de outros (Organic reusa `genMandala`; Victorian reusa `genBQAcanthus`/`genBQCartouche`; até v0.9.0, Celtic/Islamic reusavam `genADFrame`/`genMandala`/`genOrganicSpiral`, DEC-021). Isso é intencional — reduz duplicação — mas significa que uma mudança em `genADFrame`, por exemplo, afeta visualmente todos os estilos que a chamam. Conferir todos os estilos que reusam antes de alterar um gerador compartilhado. Como o reuso é sempre wireado em `generate.js` (nunca dentro do arquivo do estilo em si), basta grepar `generate.js` por `genXxx` para ver todos os pontos de reuso de um gerador. **Desde a F5 (DEC-018), gerador compartilhado só varia com o seed quando o estilo dono pede:** `genADFrame` e `genMandala` recebem `vary` (padrão `false`) no fim da assinatura, e em `genDivider`/`genPattern` só os ramos do estilo do lote sorteiam — quem reusa continua recebendo o desenho de sempre, e o `npm run regress` não vaza para fora do lote. **Reuso dentro do mesmo lote (DEC-019):** `genBQAcanthus` e `genBQCartouche` recebem `style` (`'baroque'` · `'victorian'`) e cada estilo sorteia de um repertório próprio — até v0.7.0, `victorian/flourish` e `victorian/cartouche` eram cópias byte a byte de `baroque/acanthus` e `baroque/cartouche`.
```

## Edição 14 — `meta/GLOSSARY.md` · termos celtas e islamicos

**Âncora**:

```
- **Esqueleto semeado** — o seed escolhe a COMPOSIÇÃO (contorno, escala, arranjo, desvio de contagem), não só o detalhe; contorno como função r(a) (`contourRadius`/`contourPath`). Piloto em 4 tipos (DEC-020).
```

**Substituir por:**

```
- **Esqueleto semeado** — o seed escolhe a COMPOSIÇÃO (contorno, escala, arranjo, desvio de contagem), não só o detalhe; contorno como função r(a) (`contourRadius`/`contourPath`). Piloto em 4 tipos (DEC-020).
- **Triquetra / tríscele** — motivos celtas: três pétalas entrelaçadas (com anel) e três espirais saindo de um centro. Usados no nó, no medalhão e na espiral celtas (DEC-021).
- **Shamsa** — medalhão islâmico em «sol», com estrela central, anel de pétalas e pingentes nas pontas (`genIslamicMedallion`).
- **Khatam** — estrela de 8 pontas feita de dois quadrados ({8/2}); em malha quadrada, os vãos formam cruzes. Motivo do `islamic/pattern`.
```

## Edição 15 — `meta/STATUS.md` · versao 0.10.0

**Âncora**:

```
**[0.9.0]** — F5: régua de silhueta no `npm run seeds` e piloto do esqueleto semeado em 4 tipos (medalhão e padrão Art Deco, mandala e símbolo geométricos), que passam de 2–9% para 26–42% de silhueta (DEC-020) — `silhueta>=25%` 10/53. Antes: v0.8.0 Barroco + Vitoriano (DEC-019), v0.7.0 Art Deco + Geométrico (DEC-018), v0.6.0 Botânico (DEC-017). GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.
```

**Substituir por:**

```
**[0.10.0]** — F5, lote 4: Celta e Islâmico com esqueleto semeado e geradores próprios do estilo nos seis tipos que emprestavam de outros (DEC-021) — `silhueta>=25%` 22/53. Antes: v0.9.0 régua de silhueta + piloto (DEC-020), v0.8.0 Barroco + Vitoriano, v0.7.0 Art Deco + Geométrico, v0.6.0 Botânico. GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.
```

## Edição 16 — `meta/STATUS.md` · Funcionando: piloto validado e lote 4

**Âncora**:

```
- **Esqueleto semeado — piloto (v0.9.0, DEC-020):** nos 4 tipos, o seed escolhe também a composição — medalhão em círculo, octógono, losango, quadrado, oval, arco ou sol nascente; padrão num campo (página, medalhão, losango, faixa, moldura, arco); mandala e símbolo com contorno, escala e arranjo próprios. Medido pela coluna `silhueta%` do `npm run seeds` (régua nova, `scripts/silhouette.mjs`).
```

**Substituir por:**

```
- **Esqueleto semeado — piloto (v0.9.0, DEC-020):** nos 4 tipos, o seed escolhe também a composição — medalhão em círculo, octógono, losango, quadrado, oval, arco ou sol nascente; padrão num campo (página, medalhão, losango, faixa, moldura, arco); mandala e símbolo com contorno, escala e arranjo próprios. Medido pela coluna `silhueta%` do `npm run seeds` (régua nova, `scripts/silhouette.mjs`). Roteiro visual 1–6 ok, «a receita convenceu» [relatado pelo dono, 2026-11-17].
- **Celta e Islâmico variados (v0.10.0, DEC-021):** os 12 tipos nascem com esqueleto semeado; borda e medalhão celtas, painel de tranças, espiral (tríscele), borda islâmica e shamsa com pingentes têm gerador próprio (antes emprestavam a moldura Art Deco, a mandala, a espiral do Orgânico). `islamic/girih` e `islamic/pattern` deixam de sair iguais.
```

## Edição 17 — `meta/STATUS.md` · Em Progresso: lote 4

**Âncora**:

```
- **F5 — Variedade procedural:** lotes 1–3 entregues (v0.6.0–v0.8.0) e piloto do esqueleto semeado em 4 tipos (v0.9.0) — placar `formas>1: 29/53`, **`silhueta>=25%: 10/53`** (a meta agora é a silhueta, DEC-020). Roteiros: Botânico 1–6, lote 2 1–8 e lote 3 1–7 ok [relatado pelo dono]; roteiro do piloto pendente. Se o piloto convencer: a receita volta aos 19 tipos dos lotes 2 e 3 e os lotes 4–7 (Celta, Islâmico, Minimal, Orgânico) já nascem com esqueleto.
```

**Substituir por:**

```
- **F5 — Variedade procedural:** lotes 1–3 (v0.6.0–v0.8.0), piloto do esqueleto (v0.9.0, roteiro 1–6 ok [relatado pelo dono, 2026-11-17]) e lote 4 Celta + Islâmico (v0.10.0) entregues — placar `formas>1: 41/53`, **`silhueta>=25%: 22/53`**. Roteiro do lote 4 pendente. Próximo: Minimal + Orgânico (parados) e o esqueleto nos 19 tipos dos lotes 2 e 3.
```

## Edição 18 — `meta/STATUS.md` · ordem das frentes: parados primeiro

**Âncora**:

```
- **Ordem das frentes:** o dono decidiu a análise de variedade — régua de silhueta + piloto do esqueleto semeado [relatado pelo dono, 2026-11-17]; a F4/B (implementação da nova interface) segue aguardando a vez.
```

**Substituir por:**

```
- **Ordem das frentes:** depois do piloto, o dono escolheu «parados primeiro» — Celta + Islâmico [relatado pelo dono, 2026-11-18]; a F4/B (implementação da nova interface) segue aguardando a vez.
```

## Edição 19 — `meta/STATUS.md` · Quebrado: placar

**Âncora**:

```
- **O seed ainda não muda a forma em 24 dos 53 tipos, e só muda a SILHUETA em 10** (placar `npm run seeds` em v0.9.0: formas>1 29/53, silhueta>=25% 10/53). Nos outros, Surprise, New seed e «Like this» variam detalhe dentro do mesmo contorno ou só o que os sliders variam. Tratado pela F5.
```

**Substituir por:**

```
- **O seed ainda não muda a forma em 12 dos 53 tipos (Minimal e Orgânico), e só muda a SILHUETA em 22** (placar `npm run seeds` em v0.10.0: formas>1 41/53, silhueta>=25% 22/53). Nos outros, Surprise, New seed e «Like this» variam detalhe dentro do mesmo contorno ou só o que os sliders variam. Tratado pela F5.
```

## Edição 20 — `meta/STATUS.md` · Ultima conversa: roteiro do piloto ok

**Âncora**:

```
**2026-11-17 (2)** - WO 0011 aplicada pelo Code (`b780556`, empurrado): v0.9.0, regua de silhueta no `npm run seeds` (`scripts/silhouette.mjs`) e piloto do esqueleto semeado em 4 tipos (medalhao e padrao Art Deco, mandala e simbolo geometricos); DEC-020. Regress: 24 chaves mudaram, 0 fora dos 4 tipos; seeds `silhueta>=25%` 6/53 -> 10/53, formas>1 29/53; sonda de UI 18 OK (medido no relatorio do apply). Visual: roteiro do piloto pendente com o dono. Proximo passo: dono faz o roteiro; se convencer, esqueleto nos 19 tipos dos lotes 2 e 3.
```

**Substituir por:**

```
**2026-11-17 (2)** - WO 0011 aplicada pelo Code (`b780556`, empurrado): v0.9.0, regua de silhueta no `npm run seeds` (`scripts/silhouette.mjs`) e piloto do esqueleto semeado em 4 tipos (medalhao e padrao Art Deco, mandala e simbolo geometricos); DEC-020. Regress: 24 chaves mudaram, 0 fora dos 4 tipos; seeds `silhueta>=25%` 6/53 -> 10/53, formas>1 29/53; sonda de UI 18 OK (medido no relatorio do apply). Visual: roteiro do piloto 1-6 ok depois [relatado pelo dono, 2026-11-17, registrado pela WO 0012]. Proximo passo: dono faz o roteiro; se convencer, esqueleto nos 19 tipos dos lotes 2 e 3.
```

## Edição 21 — `meta/ROADMAP.md` · lote 4 feito

**Âncora**:

```
- [ ] Esqueleto nos 19 tipos dos lotes 2 e 3 (depois do roteiro do piloto).
```

**Substituir por:**

```
- [x] Lote 4 — Celta + Islâmico com esqueleto e geradores próprios do estilo. v0.10.0, DEC-021, `specs/261118-esqueleto-celta-islamico.md`. Placar: silhueta>=25% 10/53 → 22/53.
- [ ] Esqueleto nos 19 tipos dos lotes 2 e 3 (o piloto convenceu: roteiro 1–6 ok em 2026-11-17).
```

## Edição 22 — `meta/ROADMAP.md` · lotes restantes

**Âncora**:

```
- [ ] Um lote por estilo, já com esqueleto: Celta, Islâmico, Minimal, Orgânico (spiral, flower, mandala).
```

**Substituir por:**

```
- [ ] Um lote por estilo, já com esqueleto: Minimal, Orgânico (spiral, flower, mandala, e o resto do estilo).
```

## Edição 23 — `meta/CHANGELOG.md` · entrada 0.10.0

**Âncora**:

```
## [Não lançado]
*(vazio)*
```

**Substituir por:**

```
## [Não lançado]
*(vazio)*

---

## [0.10.0] — {DATA}
### Alterado
- **Celta e Islâmico com variedade de verdade** (F5, lote 4, já com esqueleto semeado): nó (estrela de laços, roseta entrelaçada, triquetra, corrente), cruz (braços iguais, cruz alta com base, latina; remates reto, alargado ou bola), estrela islâmica (rosácea, fita {n/k}, enquadrada, khatam; moldura), arabesco (radial, palmeta, faixa). Placar `npm run seeds`: formas>1 29/53 → 41/53, silhueta>=25% 10/53 → 22/53.
- **Geradores próprios do estilo** para os seis tipos que emprestavam de outros: borda celta (trança entre trilhos), medalhão celta (anel trançado + tríscele, triquetra ou roseta), painel de tranças (quadrado, círculo, losango, faixa ou cruz), espiral celta (1 a 4 espirais), borda islâmica (estrelas de 8, losangos, merlões ou entrelaçado), medalhão islâmico (shamsa com pingentes).
- `islamic/girih` e `islamic/pattern` ganham motivos próprios (hexagrama, estrela de seis; khatam, octógono) e o campo/escala de célula semeados; deixam de sair com a mesma silhueta para o mesmo seed (eram iguais em 40 de 40).
- Art Deco, Orgânico e os demais não mudam (`genADFrame`, `genMandala`, `genOrganicSpiral` e `genPattern` dos outros estilos seguem iguais).
- Linha de base do `npm run regress` regravada para as 72 chaves `celtic/*` e `islamic/*`.
```

> Troque `{DATA}` pela saída de `date +%F`, rodado na hora.

## Edição 24 — `meta/DECISIONS.md` · DEC-021 no fim

**Âncora**:

```
- Se o roteiro do piloto convencer, a receita volta aos 19 tipos dos lotes 2 e 3 e é o padrão dos lotes 4–7.
```

**Substituir por:**

```
- Se o roteiro do piloto convencer, a receita volta aos 19 tipos dos lotes 2 e 3 e é o padrão dos lotes 4–7.

---

## DEC-021 — Lote 4 da F5: Celta e Islâmico com geradores próprios e esqueleto semeado
**Data:** 2026-11-18 · **Status:** aceita

### Contexto
Depois do piloto (DEC-020, roteiro 1–6 ok), o dono escolheu «parados primeiro» [relatado pelo dono, 2026-11-18]. Os 12 tipos do Celta e do Islâmico marcavam 1/1/0%. Seis deles emprestavam geradores de outros estilos — `celtic/border` e `islamic/border` a moldura Art Deco, `celtic/medallion` a mandala, `celtic/spiral` a espiral do Orgânico, `celtic/knotwork` o próprio nó, `islamic/medallion` a mesma estrela do `star` — e `islamic/girih` e `islamic/pattern` tinham a mesma silhueta em 40 de 40 seeds.

### Decisão
1. **Geradores próprios** para os seis tipos emprestados: `genCelticBorder`, `genCelticMedallion`, `genCelticKnotwork`, `genCelticSpiral`, `genIslamicBorder`, `genIslamicMedallion`. Os emprestados seguem iguais para quem os usa.
2. **Esqueleto semeado desde o início** nos 12 (contorno, escala, arranjo, campo, proporção), com escolhas de detalhe por cima; nos quatro que já eram do estilo (`genCelticKnot`, `genCelticCross`, `genIslamicStar`, `genArabesque`), o desenho original é uma das variantes.
3. **`girih` e `islamic` em `genPattern`:** motivos próprios, campo e escala de célula como o Art Deco; as listas do `girih` vêm em outra ordem para o mesmo seed não dar o mesmo desenho nos dois tipos (0 de 40 silhuetas iguais).
4. **Fita** (duas linhas paralelas) como traço celta; cruzamento por cima/por baixo fica fora.

### Alternativas consideradas
- **Variar os geradores emprestados com `vary`** — rejeitada: daria variedade, mas a borda celta continuaria uma moldura Art Deco e o medalhão celta, uma mandala geométrica.
- **Seed separado por tipo** (ex.: misturar o nome do tipo no seed) para descolar girih de pattern — rejeitada: mudaria a regra «mesmo seed + mesmos parâmetros = mesma arte» para todo o app; reordenar as listas resolve localmente.

### Consequências
- Placar: formas>1 29/53 → 41/53, distintos>1 32/53 → 44/53, silhueta>=25% 10/53 → 22/53. Regress: exatamente 72 chaves mudaram, 0 fora do lote.
- Pior caso (canvas 400): `islamic/pattern` 81,6 KB, `islamic/girih` 73,9 KB. Em 1200, ~600 KB (antes 316) — IDEAS.
- Restam parados Minimal e Orgânico (12 tipos sem formas>1); os 19 tipos dos lotes 2 e 3 ainda variam só no detalhe.
```

## Edição 25 — `meta/IDEAS.md` · ideia: padroes islamicos pesados em 1200

**Âncora**:

```
Com a escala da célula semeada (0,8×), o pior caso do `artdeco/pattern` em canvas 1200 vai de 362 a 561 KB (75 KB em 400, dentro do teto). Se export grande virar queixa: limitar a escala mínima pela área do canvas, ou desenhar o motivo uma vez num `<pattern>` SVG (ver «Tile seamless» na F7).
```

**Substituir por:**

```
Com a escala da célula semeada (0,8×), o pior caso do `artdeco/pattern` em canvas 1200 vai de 362 a 561 KB (75 KB em 400, dentro do teto). Se export grande virar queixa: limitar a escala mínima pela área do canvas, ou desenhar o motivo uma vez num `<pattern>` SVG (ver «Tile seamless» na F7). Desde v0.10.0, `islamic/pattern` e `islamic/girih` também (~600 KB em 1200, antes 316; 82 e 74 KB em 400).
```

## Edição 26 — linhas de base e build (comandos, na ordem)

1. `npm run regress | grep -c "MUDOU:"` → **72**; `npm run regress | grep "MUDOU:" | grep -vc "MUDOU: celtic/\|MUDOU: islamic/"` → **0**. Qualquer chave fora de `celtic/*` e `islamic/*` mudou (Art Deco, Orgânico!): **PARE e reporte**.
2. `npm run regress -- --update` → `linha de base gravada: 318 chaves -> scripts/regress-baseline.json`; `npm run regress; echo "rc=$?"` → `OK`, `rc=0`.
3. `npm run seeds; echo "rc=$?"` ANTES do update → `OK — nenhum tipo perdeu variedade`, `rc=0`. `PERDEU`: **PARE e reporte**.
4. `npm run seeds -- --update` → `linha de base gravada: 53 tipos · formas>1: 41/53 · distintos>1: 44/53 · silhueta>=25%: 22/53` (medido no protótipo). Menos que 22: **PARE**.
5. `npm run seeds | grep -E "^celtic|^islamic" | awk '$4 >= 25' | wc -l` → **12**; `npm run seeds; echo "rc=$?"` → `OK`, `rc=0`.
6. `npm run build` → `✓ dist/vectorforge.html gerado` (protótipo: 103.7 KB).

---

## Fora de escopo

Minimal e Orgânico; o esqueleto nos 19 tipos dos lotes 2 e 3; cruzamento por cima/por baixo no entrelaçado; girih com decágonos. Se algo parecer estranho no olho, relate com print.

## Armadilhas desta WO

- **Edição 3 (`genPattern`) toca o ramo do Art Deco:** o Art Deco continua sorteando da MESMA lista na mesma ordem — o passo 1 da edição final confere que nenhuma chave `artdeco/*` mudou.
- **Edições 6 e 7 trocam geradores de 7 entradas do dispatcher;** os geradores antigos (`genADFrame`, `genMandala`, `genOrganicSpiral`) continuam importados e usados por Art Deco e Orgânico — não remova os imports.
- **`grep -c` conta LINHAS.**

---

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` → ` M` em `dist/vectorforge.html`, `meta/CHANGELOG.md`, `meta/CONTEXT.md`, `meta/DECISIONS.md`, `meta/GLOSSARY.md`, `meta/IDEAS.md`, `meta/ROADMAP.md`, `meta/STATUS.md`, `package-lock.json`, `package.json`, `scripts/regress-baseline.json`, `scripts/seeds-baseline.json`, `src/core/generate.js`, `src/generators/celtic.js`, `src/generators/generic.js`, `src/generators/islamic.js` (**16 `M`**) e `??` em `logs/2026-11-18.md`, `meta/workorders/261118-wo0012-esqueleto-celta-islamico.md`, `specs/261118-esqueleto-celta-islamico.md` (**3 `??`**). Em `src/`, só os 4 arquivos listados.
- [ ] `git diff --stat -- scripts/regress-baseline.json` → `72 insertions(+), 72 deletions(-)`. `git diff --stat -- scripts/seeds-baseline.json` → `12 insertions(+), 12 deletions(-)`.
- [ ] `grep -c "^export function" src/generators/celtic.js src/generators/islamic.js` → `celtic.js:6`, `islamic.js:4`; `grep -c "genADFrame(0, 0, state.w, state.h, comp, [68]," src/core/generate.js` → **0**.
- [ ] `grep -c '"version": "0.10.0",' package.json package-lock.json` → `package.json:1`, `package-lock.json:2`.
- [ ] `grep -c "^## \[0.10.0\] — 20" meta/CHANGELOG.md` → **1**; `grep -c "{DATA}" meta/CHANGELOG.md` → **0**; `grep -c "^## DEC-021 " meta/DECISIONS.md` → **1**.
- [ ] `grep -c "^\*\*\[0.10.0\]\*\* —" meta/STATUS.md` → **1**; `grep -c "silhueta>=25%: 22/53" meta/STATUS.md` → **1**; `grep -c "roteiro do piloto pendente" meta/STATUS.md` → **0**; `grep -c "^- \[x\] Lote 4 — Celta + Islâmico" meta/ROADMAP.md` → **1**.
- [ ] **dist:** `grep -c "//__SCRIPT__" dist/vectorforge.html` → **0**.
- [ ] Sonda de UI: `cd ../261112-sonda-ui && node behave.cjs ../vectorforge/dist/vectorforge.html | grep -c "^OK"; cd ../vectorforge` → **18**.
  - **Quem roda:** quem aplica. **Chega no ramo?** No carregamento e na seleção de estilos ao acaso — não percorre os 12 tipos. **Pergunta que NÃO responde:** a aparência — é o roteiro do dono (o chat rodou no protótipo uma sonda descartável com Celta + Islâmico × 3 seeds no `dist`: 36 renders, 0 erros de JS).

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · desvios · saída CRUA: as contagens do regress (passo 1), `seeds --update` e as 12 linhas `^celtic|^islamic` do `npm run seeds` · arquivos tocados · build · commit e push.

## Commit — blocos separados, mensagem SEM acento

```
git add dist/vectorforge.html meta/CHANGELOG.md meta/CONTEXT.md meta/DECISIONS.md meta/GLOSSARY.md meta/IDEAS.md meta/ROADMAP.md meta/STATUS.md package-lock.json package.json scripts/regress-baseline.json scripts/seeds-baseline.json src/core/generate.js src/generators/celtic.js src/generators/generic.js src/generators/islamic.js logs/2026-11-18.md meta/workorders/261118-wo0012-esqueleto-celta-islamico.md specs/261118-esqueleto-celta-islamico.md
```

```
git commit -m "feat(celtic,islamic): esqueleto semeado e geradores proprios nos 12 tipos" -m "Borda, medalhao, painel de trancas e espiral celtas e borda e shamsa islamicas deixam de emprestar geradores de outros estilos; os 12 tipos sorteiam contorno, escala e arranjo. girih e pattern ganham motivos proprios e deixam de sair iguais. silhueta>=25% de 10/53 para 22/53; regress regravado para as 72 chaves celtic/* e islamic/*. Roteiro do piloto 1-6 ok. Versao 0.10.0. Ver DEC-021 e WO 0012."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
