# WO 0009 — F5 lote 3: seed vivo no Barroco e no Vitoriano (11 tipos) · v0.8.0

> **Tipo:** mista — gerador (dois arquivos inteiros gravados pelo chat + Edições 1–6 em `utils.js`, `generic.js` e `generate.js`) + versão + linhas de base + registro.
> **Config sugerida:** modelo mais capaz (Opus) · `/effort medium` — mudança INTENCIONAL de saída: a conferência separa as 66 chaves que podem mudar das 252 que não podem.
> **Pré-requisito:** commit `e2629f1`, `node_modules/` presente.
> **Base:** `specs/261117-seed-vivo-barroco-vitoriano.md`; DEC-016, DEC-017, DEC-018; escolha do dono no chat em 2026-11-17 («Vamos de F5 lote 3 (Barroco + Vitoriano)»); prova visual `../261117-lote3-barroco-8-seeds.png`, `../261117-lote3-vitoriano-8-seeds.png`, `../261117-lote3-acanto-v2.png` (pasta-pai).
> **Arquivos que o chat gravou no disco e esta WO versiona:**
>   - `src/generators/baroque.js` — sha1 `6fe7f273cb29a41569e4ed7102eb5deed603896b`
>   - `src/generators/victorian.js` — sha1 `8df7f89ed7722646cbf06bc5d6693438339e485e`
>   - `specs/261117-seed-vivo-barroco-vitoriano.md` — sha1 `d11da137551e095cb50fedb695808b70b3bf4af3`
> **`baroque.js` e `victorian.js` foram reescritos INTEIROS pelo chat** (em `victorian.js`, `genVicWreath` ficou byte a byte igual). Não edite: só confira o hash e versione.
> **Âncora semântica:** trecho que não bater EXATAMENTE (1 ocorrência) → **PARE e reporte**.
> **Idempotência:** procure o texto NOVO INTEIRO. Nas Edições 1, 12, 13, 14, 16, 22, 23, 24 a âncora fica dentro do texto novo; nas Edições 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 17, 18, 19, 20, 21 ela some (já aplicada = texto novo presente **e** âncora ausente). Já aplicada: **PULE** e diga no relatório.
> **Âncoras lidas em** (commit `e2629f1`; trecho = primeira linha da âncora):
>   - Edição 1 · `src/core/utils.js` — `    d += (d ? ' ' : '') + 'M ' + pts.map(p => ´${f(p[0])} ${f(p[1])}´).join(' L ') + ' Z';`
>   - Edição 2 · `src/generators/generic.js` — `import { TAU, f, pt, polyPath, starPath, mkRand, pickOne, steppedDiamondPath } from '../co`
>   - Edição 3 · `src/generators/generic.js` — `  } else if (style === 'baroque') {`
>   - Edição 4 · `src/generators/generic.js` — `  } else if (style === 'victorian') {`
>   - Edição 5 · `src/core/generate.js` — `      flourish:  () => genBQAcanthus(cx, cy, sz, comp, sym, rnd, SO, FG, sw),`
>   - Edição 6 · `src/core/generate.js` — `      wreath:    () => genVicWreath(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw),`
>   - Edição 7 · `package.json` — `  "version": "0.7.0",`
>   - Edição 8 · `package-lock.json` — `  "name": "vectorforge",`
>   - Edição 9 · `package-lock.json` — `      "name": "vectorforge",`
>   - Edição 10 · `meta/CONTEXT.md` — `| **baroque** | ´src/generators/baroque.js´ | medallion, frame, divider, cartouche, swag, `
>   - Edição 11 · `meta/CONTEXT.md` — `| **victorian** | ´src/generators/victorian.js´ | medallion, frame, divider, flourish, wre`
>   - Edição 12 · `meta/CONTEXT.md` — `**Padrão de reuso:** vários estilos reaproveitam geradores de outros (Celtic/Islamic reusa`
>   - Edição 13 · `meta/GLOSSARY.md` — `- **Truchet** — ladrilho com dois quartos de círculo em cantos opostos, girado ao acaso em`
>   - Edição 14 · `meta/CEREBRO.md` — `- **Variedade (F5):** ´npm run seeds´ mede, por tipo, quantas formas diferentes o seed pro`
>   - Edição 15 · `meta/STATUS.md` — `**[0.7.0]** — F5, lote 2: o seed passa a mudar a forma dos 12 tipos do Art Deco e do Geomé`
>   - Edição 16 · `meta/STATUS.md` — `- **Art Deco e Geométrico variados (v0.7.0, DEC-018):** os 12 tipos sorteiam variante de m`
>   - Edição 17 · `meta/STATUS.md` — `- **F5 — Variedade procedural:** lote 1 (instrumento + Botânico, v0.6.0) e lote 2 (Art Dec`
>   - Edição 18 · `meta/STATUS.md` — `- **Ordem das frentes:** o dono escolheu F5 lote 2 primeiro [relatado pelo dono, 2026-11-1`
>   - Edição 19 · `meta/STATUS.md` — `- **O seed ainda não muda a forma em 35 dos 53 tipos** (placar ´npm run seeds´ em v0.7.0: `
>   - Edição 20 · `meta/STATUS.md` — `- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (´genADMedallion´, ´genBQFrame´, etc.`
>   - Edição 21 · `meta/ROADMAP.md` — `- [ ] Um lote por estilo: Barroco, Vitoriano, Celta, Islâmico, Minimal, Orgânico (spiral, `
>   - Edição 22 · `meta/CHANGELOG.md` — `## [Não lançado]`
>   - Edição 23 · `meta/DECISIONS.md` — `- O Botânico mantém o ´pickOne´ local (IDEAS: unificar).`
>   - Edição 24 · `meta/IDEAS.md` — `### 2026-11-16 — Um ´pickOne´ só`
> **Próximo comando:** `/wrap wo0009-seed-vivo-barroco-vitoriano`

> **Canal dos meta neste ciclo = CODE.** Esta WO É o registro.

---

## 1. Por que

O dono escolheu a F5 lote 3 [relatado pelo dono, 2026-11-17]. Onze tipos do Barroco e do Vitoriano ignoravam o seed, e dois deles (`victorian/flourish`, `victorian/cartouche`) eram cópias byte a byte dos barrocos. Esta WO dá escolhas semeadas aos 11 e repertório próprio ao Vitoriano — prototipado, medido e conferido a olho pelo chat nos contact sheets da pasta-pai.

## Inventário — de onde saiu a lista de edições

- **Geradores:** `grep -n "^export function" src/generators/baroque.js src/generators/victorian.js` devolve **8** funções no commit `e2629f1` (5 + 3); mudam 7 — `genVicWreath` fica igual —, por isso os dois arquivos vêm inteiros do chat. Em `generic.js`, `grep -n "style === .baroque.\|style === .victorian." src/generators/generic.js` devolve **2** linhas (os ramos de `genDivider`, Edições 3 e 4); a Edição 2 é o import. No dispatcher, só as 2 entradas que reusam geradores barrocos no Vitoriano mudam (Edições 5, 6).
- **Primitivas:** `core/utils.js` ganha 2 funções no fim (Edição 1).
- **Versão:** `package.json` (1), `package-lock.json` (2).
- **Registro:** CONTEXT (3), GLOSSARY, CEREBRO, STATUS (6), ROADMAP, CHANGELOG, DECISIONS, IDEAS.
- Total: **24 edições** em **13 arquivos**, mais 3 arquivos do chat, as duas linhas de base regravadas e o `dist/`.

---

## Edição 0 — preparo (antes de editar)

1. `sha1sum src/generators/baroque.js src/generators/victorian.js specs/261117-seed-vivo-barroco-vitoriano.md` → bate com o cabeçalho. Diferente: **PARE**.
2. `git status --short` → exatamente ` M src/generators/baroque.js`, ` M src/generators/victorian.js`, `?? meta/workorders/261117-wo0009-seed-vivo-barroco-vitoriano.md`, `?? specs/261117-seed-vivo-barroco-vitoriano.md`. Outra linha: **PARE**.
3. **Sem prova de vida a rodar aqui:** com os dois arquivos do chat já no disco, o bundle não compila até a Edição 1 (eles importam `spiralPath` e `shellFanPaths`, que ela cria). O «antes» foi medido pelo chat no HEAD `e2629f1`: `npm run regress` OK (0 mudanças) e `formas>1 18/53 · distintos>1 21/53`.

## Edição 1 — `src/core/utils.js` · primitivas spiralPath e shellFanPaths

**Âncora** (fim de `polygramPath`, ultima funcao do arquivo):

```
    d += (d ? ' ' : '') + 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + ' Z';
  }
  return d;
}
```

**Substituir por:**

```
    d += (d ? ' ' : '') + 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + ' Z';
  }
  return d;
}

/**
 * Espiral de Arquimedes (voluta): parte do raio r e enrola até o centro em `turns` voltas.
 * Número de pontos fixo por volta — o seed muda posição e sentido, não a estrutura do path.
 * @param {number} cx - centro x
 * @param {number} cy - centro y
 * @param {number} r - raio inicial (externo)
 * @param {number} turns - voltas (ex.: 1.5)
 * @param {number} [dir=1] - 1 = sentido horário na tela, −1 = anti-horário
 * @param {number} [a0=0] - ângulo inicial
 * @returns {string} atributo d (aberto)
 */
export function spiralPath(cx, cy, r, turns, dir = 1, a0 = 0) {
  const N = Math.max(8, Math.round(24 * turns));
  const pts = Array.from({ length: N + 1 }, (_, i) => { const t = i / N; return pt(cx, cy, r * (1 - t * 0.92), a0 + dir * t * turns * TAU); });
  return 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ');
}

/**
 * Concha em leque: meia-lua voltada para o ângulo `a` e as nervuras saindo do centro.
 * Devolve DOIS atributos d — o contorno (fechado) e as nervuras (um path só, M…L por nervura).
 * @param {number} cx
 * @param {number} cy - centro da base da concha
 * @param {number} R - raio
 * @param {number} a - direção para onde a concha abre (−π/2 = para cima)
 * @param {number} k - quantidade de gomos (nervuras = k − 1)
 * @returns {[string, string]} [contorno, nervuras]
 */
export function shellFanPaths(cx, cy, R, a, k) {
  const [x1, y1] = pt(cx, cy, R, a - Math.PI / 2), [x2, y2] = pt(cx, cy, R, a + Math.PI / 2);
  const outline = `M ${f(x1)} ${f(y1)} A ${f(R)} ${f(R)} 0 0 1 ${f(x2)} ${f(y2)} Z`;
  let ribs = '';
  for (let j = 1; j < k; j++) { const [ex, ey] = pt(cx, cy, R * 0.95, a - Math.PI / 2 + j * Math.PI / k); ribs += `M ${f(cx)} ${f(cy)} L ${f(ex)} ${f(ey)} `; }
  return [outline, ribs.trim()];
}
```

## Edição 2 — `src/generators/generic.js` · import das primitivas

**Âncora** (linha de import de `core/utils.js`):

```
import { TAU, f, pt, polyPath, starPath, mkRand, pickOne, steppedDiamondPath } from '../core/utils.js';
```

**Substituir por:**

```
import { TAU, f, pt, polyPath, starPath, mkRand, pickOne, steppedDiamondPath, spiralPath, shellFanPaths } from '../core/utils.js';
```

## Edição 3 — `src/generators/generic.js` · genDivider: ramo baroque com escolhas

**Âncora** (ramo `baroque` de `genDivider`, ate a abertura do ramo `geo`):

```
  } else if (style === 'baroque') {
    const ow = 40 + comp * 25, oh = 16 + comp * 8;
    parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(ow)}" ry="${f(oh)}" ${SO}/>`);
    parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(ow * 0.8)}" ry="${f(oh * 0.65)}" ${SO}/>`);
    for (const dir of [-1, 1]) {
      const bx = cx + dir * ow;
      parts.push(`<path d="M ${f(bx)} ${f(cy)} C ${f(bx + dir * 16)} ${f(cy - oh * 1.1)} ${f(bx + dir * 28)} ${f(cy - oh * 0.3)} ${f(bx + dir * 28)} ${f(cy + oh * 0.3)} C ${f(bx + dir * 28)} ${f(cy + oh * 1.1)} ${f(bx + dir * 16)} ${f(cy + oh * 0.8)} ${f(bx + dir * 6)} ${f(cy + oh * 0.3)}" ${SO}/>`);
    }
  } else if (style === 'geo' || style === 'geometric') {
```

**Substituir por:**

```
  } else if (style === 'baroque') {
    // F5 lote 3 (DEC-019): o seed escolhe o miolo (oval dupla · concha · roseta), o remate das
    // pontas (voluta em C · espiral · folha) e se há contas ao longo da linha
    const centerKind = pickOne(['oval', 'shell', 'rosette'], rnd);
    const endKind = pickOne(['scroll', 'volute', 'leaf'], rnd);
    const beads = rnd() < 0.5;
    const ow = 40 + comp * 25, oh = 16 + comp * 8;
    if (centerKind === 'shell') {
      for (const a of [-Math.PI / 2, Math.PI / 2]) { const [o, r] = shellFanPaths(cx, cy, oh * 1.3, a, 7); parts.push(`<path d="${o}" ${SO}/>`, `<path d="${r}" ${SO}/>`); }
      parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(3 + comp * 2)}" ${FG}/>`);
    } else if (centerKind === 'rosette') {
      for (let k = 0; k < 8; k++) { const [px, py] = pt(cx, cy, oh * 0.9, k * TAU / 8); parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(oh * 0.4)}" ${SO}/>`); }
      parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(oh * 0.45)}" ${FG}/>`);
    } else {
      parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(ow)}" ry="${f(oh)}" ${SO}/>`);
      parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(ow * 0.8)}" ry="${f(oh * 0.65)}" ${SO}/>`);
    }
    for (const dir of [-1, 1]) {
      const bx = cx + dir * ow;
      if (endKind === 'volute') parts.push(`<path d="${spiralPath(bx + dir * (10 + comp * 4), cy, 10 + comp * 4, 1.5, dir, dir > 0 ? Math.PI : 0)}" ${SO}/>`);
      else if (endKind === 'leaf') parts.push(`<path d="M ${f(bx)} ${f(cy)} Q ${f(bx + dir * 14)} ${f(cy - 10)} ${f(bx + dir * 30)} ${f(cy)} Q ${f(bx + dir * 14)} ${f(cy + 10)} ${f(bx)} ${f(cy)} Z" ${FG}/>`);
      else parts.push(`<path d="M ${f(bx)} ${f(cy)} C ${f(bx + dir * 16)} ${f(cy - oh * 1.1)} ${f(bx + dir * 28)} ${f(cy - oh * 0.3)} ${f(bx + dir * 28)} ${f(cy + oh * 0.3)} C ${f(bx + dir * 28)} ${f(cy + oh * 1.1)} ${f(bx + dir * 16)} ${f(cy + oh * 0.8)} ${f(bx + dir * 6)} ${f(cy + oh * 0.3)}" ${SO}/>`);
      if (beads) for (let px = bx + dir * 42; dir > 0 ? px < w - 20 : px > x + 20; px += dir * 12) parts.push(`<circle cx="${f(px)}" cy="${f(cy)}" r="1.8" ${FG}/>`);
    }
  } else if (style === 'geo' || style === 'geometric') {
```

## Edição 4 — `src/generators/generic.js` · genDivider: ramo victorian com escolhas

**Âncora** (ramo `victorian` de `genDivider`, ate a abertura do `else` final):

```
  } else if (style === 'victorian') {
    parts.push(`<path d="${starPath(cx, cy, 14 + comp * 10, 6 + comp * 4, 8)}" ${SO}/>`);
    const ns2 = 2 + Math.round(comp * 3);
    for (let i = 1; i <= ns2; i++) {
      const off2 = 22 + i * 14;
      for (const dir of [-1, 1]) {
        parts.push(`<path d="M ${f(cx + dir * off2)} ${f(cy - 5)} L ${f(cx + dir * off2 + dir * 4)} ${f(cy)} L ${f(cx + dir * off2)} ${f(cy + 5)} L ${f(cx + dir * off2 - dir * 4)} ${f(cy)} Z" ${FG}/>`);
      }
    }
  } else {
```

**Substituir por:**

```
  } else if (style === 'victorian') {
    // F5 lote 3 (DEC-019): o seed escolhe o miolo (estrela · flor de três pétalas espelhada ·
    // quadrifólio) e as peças laterais (losangos · contas que diminuem · espirais)
    const centerKind = pickOne(['star', 'fleur', 'quatrefoil'], rnd);
    const sideKind = pickOne(['diamonds', 'dots', 'curls'], rnd);
    const R = 14 + comp * 10;
    if (centerKind === 'fleur') {
      for (const s of [-1, 1]) {
        parts.push(`<path d="M ${f(cx)} ${f(cy)} Q ${f(cx + R * 0.45)} ${f(cy + s * R * 0.5)} ${f(cx)} ${f(cy + s * R * 1.1)} Q ${f(cx - R * 0.45)} ${f(cy + s * R * 0.5)} ${f(cx)} ${f(cy)} Z" ${FG}/>`);
        parts.push(`<path d="M ${f(cx)} ${f(cy)} Q ${f(cx + R * 0.9)} ${f(cy + s * R * 0.1)} ${f(cx + R * 0.8)} ${f(cy + s * R * 0.7)} M ${f(cx)} ${f(cy)} Q ${f(cx - R * 0.9)} ${f(cy + s * R * 0.1)} ${f(cx - R * 0.8)} ${f(cy + s * R * 0.7)}" ${SO}/>`);
      }
    } else if (centerKind === 'quatrefoil') {
      for (let k = 0; k < 4; k++) { const [px, py] = pt(cx, cy, R * 0.45, k * TAU / 4 + Math.PI / 4); parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(R * 0.45)}" ${SO}/>`); }
      parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R * 0.2)}" ${FG}/>`);
    } else {
      parts.push(`<path d="${starPath(cx, cy, 14 + comp * 10, 6 + comp * 4, 8)}" ${SO}/>`);
    }
    const ns2 = 2 + Math.round(comp * 3);
    for (let i = 1; i <= ns2; i++) {
      const off2 = 22 + i * 14;
      for (const dir of [-1, 1]) {
        const px = cx + dir * off2;
        if (sideKind === 'dots') parts.push(`<circle cx="${f(px)}" cy="${f(cy)}" r="${f(Math.max(1.2, 3.2 - i * 0.4))}" ${FG}/>`);
        else if (sideKind === 'curls') parts.push(`<path d="${spiralPath(px, cy, 5, 1.25, dir, dir > 0 ? Math.PI : 0)}" ${SO}/>`);
        else parts.push(`<path d="M ${f(px)} ${f(cy - 5)} L ${f(px + dir * 4)} ${f(cy)} L ${f(px)} ${f(cy + 5)} L ${f(px - dir * 4)} ${f(cy)} Z" ${FG}/>`);
      }
    }
  } else {
```

## Edição 5 — `src/core/generate.js` · dispatcher: victorian/flourish com style

**Âncora** (entrada `flourish` do bloco `victorian`):

```
      flourish:  () => genBQAcanthus(cx, cy, sz, comp, sym, rnd, SO, FG, sw),
```

**Substituir por:**

```
      flourish:  () => genBQAcanthus(cx, cy, sz, comp, sym, rnd, SO, FG, sw, 'victorian'),
```

## Edição 6 — `src/core/generate.js` · dispatcher: victorian/cartouche com style

**Âncora** (entradas `wreath` e `cartouche` do bloco `victorian` (a linha do cartouche sozinha existe tambem no Barroco)):

```
      wreath:    () => genVicWreath(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw),
      cartouche: () => genBQCartouche(cx, cy, sz, comp, rnd, SO, FG, FG2, sw),
```

**Substituir por:**

```
      wreath:    () => genVicWreath(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw),
      cartouche: () => genBQCartouche(cx, cy, sz, comp, rnd, SO, FG, FG2, sw, 'victorian'),
```

## Edição 7 — `package.json` · versao 0.8.0

**Âncora** (campo version):

```
  "version": "0.7.0",
```

**Substituir por:**

```
  "version": "0.8.0",
```

## Edição 8 — `package-lock.json` · versao 0.8.0 (raiz)

**Âncora** (topo do arquivo):

```
  "name": "vectorforge",
  "version": "0.7.0",
```

**Substituir por:**

```
  "name": "vectorforge",
  "version": "0.8.0",
```

## Edição 9 — `package-lock.json` · versao 0.8.0 (pacote raiz)

**Âncora** (entrada `packages[""]`):

```
      "name": "vectorforge",
      "version": "0.7.0",
```

**Substituir por:**

```
      "name": "vectorforge",
      "version": "0.8.0",
```

## Edição 10 — `meta/CONTEXT.md` · Inventario: Barroco com escolhas semeadas

**Âncora**:

```
| **baroque** | `src/generators/baroque.js` | medallion, frame, divider, cartouche, swag, acanthus | `genBQMedallion`, `genBQFrame`, `genDivider('baroque')`†, `genBQCartouche`, `genBQSwag`, `genBQAcanthus` |
```

**Substituir por:**

```
| **baroque** | `src/generators/baroque.js` | medallion, frame, divider, cartouche, swag, acanthus | `genBQMedallion`, `genBQFrame`, `genDivider('baroque')`†, `genBQCartouche`, `genBQSwag`, `genBQAcanthus` — o seed escolhe variante de motivo, arranjo e acabamento em todos os tipos (DEC-019) |
```

## Edição 11 — `meta/CONTEXT.md` · Inventario: Vitoriano com style proprio

**Âncora**:

```
| **victorian** | `src/generators/victorian.js` | medallion, frame, divider, flourish, wreath, cartouche | `genVicMedallion`, `genVicFrame`, `genDivider('victorian')`†, `genBQAcanthus`‡ (reuso), `genVicWreath`, `genBQCartouche`‡ (reuso) |
```

**Substituir por:**

```
| **victorian** | `src/generators/victorian.js` | medallion, frame, divider, flourish, wreath, cartouche | `genVicMedallion`, `genVicFrame`, `genDivider('victorian')`†, `genBQAcanthus`‡ (reuso, `style = 'victorian'`), `genVicWreath`, `genBQCartouche`‡ (reuso, `style = 'victorian'`) — medalhão, moldura, divisor, flourish e cartela com escolhas semeadas; a coroa já variava (DEC-019) |
```

## Edição 12 — `meta/CONTEXT.md` · Padrao de reuso: style

**Âncora**:

```
**Padrão de reuso:** vários estilos reaproveitam geradores de outros (Celtic/Islamic reusam `genADFrame`/`genMandala` com parâmetros diferentes; Victorian reusa `genBQAcanthus`/`genBQCartouche`). Isso é intencional — reduz duplicação — mas significa que uma mudança em `genADFrame`, por exemplo, afeta visualmente Art Deco **e** Celtic **e** Islamic ao mesmo tempo. Conferir todos os estilos que reusam antes de alterar um gerador compartilhado. Como o reuso é sempre wireado em `generate.js` (nunca dentro do arquivo do estilo em si), basta grepar `generate.js` por `genXxx` para ver todos os pontos de reuso de um gerador. **Desde a F5 (DEC-018), gerador compartilhado só varia com o seed quando o estilo dono pede:** `genADFrame` e `genMandala` recebem `vary` (padrão `false`) no fim da assinatura, e em `genDivider`/`genPattern` só os ramos do estilo do lote sorteiam — quem reusa continua recebendo o desenho de sempre, e o `npm run regress` não vaza para fora do lote.
```

**Substituir por:**

```
**Padrão de reuso:** vários estilos reaproveitam geradores de outros (Celtic/Islamic reusam `genADFrame`/`genMandala` com parâmetros diferentes; Victorian reusa `genBQAcanthus`/`genBQCartouche`). Isso é intencional — reduz duplicação — mas significa que uma mudança em `genADFrame`, por exemplo, afeta visualmente Art Deco **e** Celtic **e** Islamic ao mesmo tempo. Conferir todos os estilos que reusam antes de alterar um gerador compartilhado. Como o reuso é sempre wireado em `generate.js` (nunca dentro do arquivo do estilo em si), basta grepar `generate.js` por `genXxx` para ver todos os pontos de reuso de um gerador. **Desde a F5 (DEC-018), gerador compartilhado só varia com o seed quando o estilo dono pede:** `genADFrame` e `genMandala` recebem `vary` (padrão `false`) no fim da assinatura, e em `genDivider`/`genPattern` só os ramos do estilo do lote sorteiam — quem reusa continua recebendo o desenho de sempre, e o `npm run regress` não vaza para fora do lote. **Reuso dentro do mesmo lote (DEC-019):** `genBQAcanthus` e `genBQCartouche` recebem `style` (`'baroque'` · `'victorian'`) e cada estilo sorteia de um repertório próprio — até v0.7.0, `victorian/flourish` e `victorian/cartouche` eram cópias byte a byte de `baroque/acanthus` e `baroque/cartouche`.
```

## Edição 13 — `meta/GLOSSARY.md` · termos voluta e concha

**Âncora**:

```
- **Truchet** — ladrilho com dois quartos de círculo em cantos opostos, girado ao acaso em cada célula; a malha forma caminhos contínuos. Variante da tesselação geométrica.
```

**Substituir por:**

```
- **Truchet** — ladrilho com dois quartos de círculo em cantos opostos, girado ao acaso em cada célula; a malha forma caminhos contínuos. Variante da tesselação geométrica.
- **Voluta** — espiral de remate (`spiralPath` em `core/utils.js`, Arquimedes, pontos fixos por volta). Usada no Barroco e no Vitoriano.
- **Concha em leque** — meia-lua com nervuras saindo do centro (`shellFanPaths`): devolve contorno e nervuras como dois paths. Crista, canto e ornamento lateral do Barroco.
```

## Edição 14 — `meta/CEREBRO.md` · tecnica: style no reuso

**Âncora**:

```
- **Variedade (F5):** `npm run seeds` mede, por tipo, quantas formas diferentes o seed produz (catraca, DEC-017). Gerador novo ou ajustado: o seed tem de mudar a ESTRUTURA (`formas>1`), não só os números; e o tamanho do pior caso (Complexity e Symmetry no máximo) cabe em ~120 KB. Gerador **compartilhado** entre estilos (`genADFrame`, `genMandala`, `genPattern`, `genDivider`): a variação entra só para o estilo do lote (`vary = true` ou o ramo do estilo), senão o regress muda tipos de outros estilos (DEC-018).
```

**Substituir por:**

```
- **Variedade (F5):** `npm run seeds` mede, por tipo, quantas formas diferentes o seed produz (catraca, DEC-017). Gerador novo ou ajustado: o seed tem de mudar a ESTRUTURA (`formas>1`), não só os números; e o tamanho do pior caso (Complexity e Symmetry no máximo) cabe em ~120 KB. Gerador **compartilhado** entre estilos (`genADFrame`, `genMandala`, `genPattern`, `genDivider`): a variação entra só para o estilo do lote (`vary = true` ou o ramo do estilo), senão o regress muda tipos de outros estilos (DEC-018). Gerador compartilhado entre DOIS estilos do mesmo lote (`genBQAcanthus`, `genBQCartouche`): parâmetro `style` com repertório próprio de cada um, senão os dois tipos saem idênticos (DEC-019).
```

## Edição 15 — `meta/STATUS.md` · versao 0.8.0

**Âncora**:

```
**[0.7.0]** — F5, lote 2: o seed passa a mudar a forma dos 12 tipos do Art Deco e do Geométrico (escolhas semeadas de motivo, arranjo e acabamento; DEC-018) — placar `formas>1` 18/53. Antes, em v0.6.0: lote Botânico e `npm run seeds` (DEC-017). GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.
```

**Substituir por:**

```
**[0.8.0]** — F5, lote 3: o seed passa a mudar a forma de 11 tipos do Barroco e do Vitoriano, e `victorian/flourish` e `victorian/cartouche` deixam de ser cópias dos barrocos (DEC-019) — placar `formas>1` 29/53. Antes: v0.7.0 Art Deco + Geométrico (DEC-018), v0.6.0 Botânico e `npm run seeds` (DEC-017). GitHub Pages: `https://joaolucas-nds.github.io/vectorforge/`.
```

## Edição 16 — `meta/STATUS.md` · Funcionando: lote 3

**Âncora**:

```
- **Art Deco e Geométrico variados (v0.7.0, DEC-018):** os 12 tipos sorteiam variante de motivo, arranjo e acabamento pelo seed (ex.: medalhão com raios em cunha, degraus, leque ou alternados; tesselação com polígonos, estrelas, Truchet ou rosetas). Celta, Islâmico e Orgânico, que reusam esses geradores, não mudaram. Medido por `npm run seeds` e `npm run regress`. Roteiro visual 1–8 ok [relatado pelo dono, 2026-11-17].
```

**Substituir por:**

```
- **Art Deco e Geométrico variados (v0.7.0, DEC-018):** os 12 tipos sorteiam variante de motivo, arranjo e acabamento pelo seed (ex.: medalhão com raios em cunha, degraus, leque ou alternados; tesselação com polígonos, estrelas, Truchet ou rosetas). Celta, Islâmico e Orgânico, que reusam esses geradores, não mudaram. Medido por `npm run seeds` e `npm run regress`. Roteiro visual 1–8 ok [relatado pelo dono, 2026-11-17].
- **Barroco e Vitoriano variados (v0.8.0, DEC-019):** 11 tipos sorteiam variante de motivo, arranjo e acabamento pelo seed (ex.: cartela oval, escudo ou lobada no Barroco; chanfrada ou arqueada no Vitoriano; volutas em espiral, conchas em leque, contas). Flourish e cartela do Vitoriano têm repertório próprio — antes eram iguais aos barrocos em 40 de 40 seeds. Medido por `npm run seeds` e `npm run regress`.
```

## Edição 17 — `meta/STATUS.md` · Em Progresso: F5 lote 3 feito

**Âncora**:

```
- **F5 — Variedade procedural:** lote 1 (instrumento + Botânico, v0.6.0) e lote 2 (Art Deco + Geométrico, v0.7.0) entregues — placar `formas>1: 18/53`. Próximo: um lote por estilo (Barroco, Vitoriano, Celta, Islâmico, Minimal, Orgânico). Roteiro do Botânico 1–6 ok [relatado pelo dono, 2026-11-15]; roteiro do lote 2 (Art Deco + Geométrico) 1–8 ok [relatado pelo dono, 2026-11-17].
```

**Substituir por:**

```
- **F5 — Variedade procedural:** lotes 1 (Botânico, v0.6.0), 2 (Art Deco + Geométrico, v0.7.0) e 3 (Barroco + Vitoriano, v0.8.0) entregues — placar `formas>1: 29/53`. Próximo: Celta, Islâmico, Minimal, Orgânico. Roteiros: Botânico 1–6 ok [relatado pelo dono, 2026-11-15]; lote 2 1–8 ok [relatado pelo dono, 2026-11-17]; lote 3 pendente.
```

## Edição 18 — `meta/STATUS.md` · ordem das frentes: lote 3

**Âncora**:

```
- **Ordem das frentes:** o dono escolheu F5 lote 2 primeiro [relatado pelo dono, 2026-11-16]; a F4/B (implementação da nova interface) segue aguardando a vez.
```

**Substituir por:**

```
- **Ordem das frentes:** o dono escolheu F5 lote 3 (Barroco + Vitoriano) [relatado pelo dono, 2026-11-17]; a F4/B (implementação da nova interface) segue aguardando a vez.
```

## Edição 19 — `meta/STATUS.md` · Quebrado: placar atualizado

**Âncora**:

```
- **O seed ainda não muda a forma em 35 dos 53 tipos** (placar `npm run seeds` em v0.7.0: formas>1 18/53; 6/53 em v0.6.0, 3/53 antes da F5). Surprise, New seed e «Like this» só variam o que os sliders variam nesses tipos. Tratado pela F5, um lote por estilo.
```

**Substituir por:**

```
- **O seed ainda não muda a forma em 24 dos 53 tipos** (placar `npm run seeds` em v0.8.0: formas>1 29/53; 18/53 em v0.7.0, 6/53 em v0.6.0, 3/53 antes da F5). Surprise, New seed e «Like this» só variam o que os sliders variam nesses tipos. Tratado pela F5, um lote por estilo.
```

## Edição 20 — `meta/STATUS.md` · backlog: JSDoc parcial

**Âncora**:

```
- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (`genADMedallion`, `genBQFrame`, etc.). Art Deco e Geométrico já têm (v0.7.0).
```

**Substituir por:**

```
- [ ] Adicionar JSDoc às funções geradoras do v0.1.0 (`genADMedallion`, `genBQFrame`, etc.). Art Deco e Geométrico já têm (v0.7.0); Barroco e Vitoriano também (v0.8.0), exceto `genVicWreath`.
```

## Edição 21 — `meta/ROADMAP.md` · lote 3 feito

**Âncora**:

```
- [ ] Um lote por estilo: Barroco, Vitoriano, Celta, Islâmico, Minimal, Orgânico (spiral, flower, mandala).
```

**Substituir por:**

```
- [x] Lote Barroco + Vitoriano — 11 tipos com escolhas semeadas; flourish e cartela do Vitoriano com repertório próprio (`style`). v0.8.0, DEC-019, `specs/261117-seed-vivo-barroco-vitoriano.md`. Placar: formas>1 18/53 → 29/53.
- [ ] Um lote por estilo: Celta, Islâmico, Minimal, Orgânico (spiral, flower, mandala).
```

## Edição 22 — `meta/CHANGELOG.md` · entrada 0.8.0

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

## [0.8.0] — {DATA}
### Alterado
- **Barroco e Vitoriano com variedade de verdade** (F5, lote 3): 11 tipos passam a sortear pelo seed a variante de motivo, arranjo e acabamento — medalhão barroco (moldura oval, com contas ou recortada; volutas em C, em S ou folhas; coroa de esferas, concha ou remate), moldura barroca (cantos em voluta, concha ou roseta; ornamento lateral; filete duplo, triplo ou com contas), divisor, cartela, festão (gomo simples, duplo ou em arco; borla, roseta ou pérola), acanto (voluta, acanto lobado, pena; folhas aos pares ou alternadas), medalhão vitoriano (anel com octógono, recortado ou com contas; bordadura de cachos, laçadas ou flores), moldura vitoriana, divisor vitoriano, flourish e cartela vitorianos. O desenho de antes de cada tipo barroco continua sendo uma das variantes. Placar `npm run seeds`: formas>1 18/53 → 29/53.
- `victorian/flourish` e `victorian/cartouche` deixam de ser cópias de `baroque/acanthus` e `baroque/cartouche` (eram iguais byte a byte em 40 de 40 seeds): `genBQAcanthus` e `genBQCartouche` ganham `style`, com repertório próprio do Vitoriano.
- `victorian/wreath` não muda (já variava).
- Linha de base do `npm run regress` regravada para as 66 chaves dos 11 tipos (mudança intencional).
```

> Troque `{DATA}` pela saída de `date +%F`, rodado na hora.

## Edição 23 — `meta/DECISIONS.md` · DEC-019 no fim

**Âncora**:

```
- O Botânico mantém o `pickOne` local (IDEAS: unificar).
```

**Substituir por:**

```
- O Botânico mantém o `pickOne` local (IDEAS: unificar).

---

## DEC-019 — Lote 3 da F5: Barroco e Vitoriano, com repertório próprio onde o Vitoriano reusava o Barroco
**Data:** 2026-11-17 · **Status:** aceita

### Contexto
Placar depois do lote 2 (DEC-018): formas>1 18/53. Os 6 tipos do Barroco e 5 dos 6 do Vitoriano marcavam 1/1 (`victorian/wreath` já variava, 40/40). Medido no protótipo: `victorian/flourish` e `victorian/cartouche` chamavam `genBQAcanthus` e `genBQCartouche` com os mesmos parâmetros de `baroque/acanthus` e `baroque/cartouche` — iguais byte a byte em 40 de 40 seeds.

### Decisão
1. **Escolhas semeadas por tipo** (`pickOne`), 3 ou 4 eixos por gerador; no Barroco, o desenho original é uma das combinações.
2. **`style` em `genBQCartouche` e `genBQAcanthus`** (padrão `'baroque'`); o dispatcher passa `'victorian'` em flourish e cartouche. Cada estilo sorteia de listas próprias de variantes, então os dois tipos deixam de coincidir (0 de 40 seeds iguais).
3. **Primitivas novas:** `spiralPath` (voluta) e `shellFanPaths` (concha em leque).
4. **Ajuste visto no contact sheet:** a folha de acanto lobado sumia de tão fina; os lóbulos ficaram ~2× mais fundos.

### Alternativas consideradas
- **`vary` como no lote 2** — rejeitada aqui: os dois estilos que reusam estão no MESMO lote, então ligar a variação para os dois é seguro; o problema era outro (cópia), e o que o resolve é repertório por estilo.
- **Funções vitorianas separadas (`genVicFlourish`, `genVicCartouche`)** — rejeitada: duplicaria a estrutura (caule e folhas; escudo, remates e crista); o `style` troca só as listas.

### Consequências
- Placar: formas>1 18/53 → 29/53, distintos>1 21/53 → 32/53. Regress: exatamente 66 chaves mudaram (11 tipos × 6), 0 fora do lote.
- Pior caso: maior é `baroque/frame` em canvas 1200, 34,1 KB.
- O acanto/flourish continua ocupando ~1/3 da altura do canvas, como desde a v0.1.0 (IDEAS).
```

## Edição 24 — `meta/IDEAS.md` · ideia: enquadrar acanto e flourish

**Âncora**:

```
### 2026-11-16 — Um `pickOne` só
```

**Substituir por:**

```
### 2026-11-17 — Enquadrar o acanto e o flourish como o Botânico
`baroque/acanthus` e `victorian/flourish` ocupam ~1/3 da altura do canvas desde a v0.1.0 (folhas de `sz * 0.2`; o caule vai de `cy − 0,48·sz` a `cy + 0,48·sz`, mas as folhas ficam estreitas). O Botânico resolveu isso com `fitToBox` (`FIT = 1.8`, DEC-017). Medir a caixa do desenho e escalar — muda a saída dos dois tipos, então vai num lote que já os toque.

### 2026-11-16 — Um `pickOne` só
```

## Edição 25 — linhas de base e build (comandos, na ordem)

1. `npm run regress | grep -c "MUDOU:"` → **66**; `npm run regress | grep "MUDOU:" | grep -vc "MUDOU: baroque/\|MUDOU: victorian/"` → **0**; `npm run regress | grep -c "MUDOU: victorian/wreath"` → **0**. Qualquer outra chave mudou: **PARE e reporte** — o lote vazou.
2. `npm run regress -- --update` → `linha de base gravada: 318 chaves -> scripts/regress-baseline.json`; `npm run regress; echo "rc=$?"` → `OK`, `rc=0`.
3. `npm run seeds -- --update` → `linha de base gravada: 53 tipos · formas>1: 29/53 · distintos>1: 32/53` (medido no protótipo). Menos que 29: **PARE**.
4. `npm run seeds | grep -E "^baroque|^victorian" | awk '$3 > 1' | wc -l` → **12** (os 11 do lote + a coroa); `npm run seeds; echo "rc=$?"` → `OK`, `rc=0`.
5. `npm run build` → `✓ dist/vectorforge.html gerado` (protótipo: 87.4 KB).

---

## Fora de escopo

Os outros 24 tipos; enquadrar acanto/flourish (IDEAS); ajustar as listas de variantes — se algo parecer estranho no olho, relate com print.

## Armadilhas desta WO

- **Não rode build, regress nem seeds entre a Edição 0 e a Edição 1:** com só os dois arquivos do chat, o bundle falha (imports que a Edição 1 cria).
- **Edição 6 tem âncora de DUAS linhas de propósito:** a linha do `cartouche` sozinha aparece duas vezes em `generate.js` (Barroco e Vitoriano); com a linha do `wreath` antes, só casa no Vitoriano.
- **A ordem da Edição final importa:** o regress só pode ser regravado DEPOIS do passo 1 provar que só os 11 tipos mudaram.
- **`grep -c` conta LINHAS.** As contagens abaixo foram escritas para isso.

---

## Depois de aplicar — conferência antes do commit

- [ ] `git status --short` → ` M` em `dist/vectorforge.html`, `meta/CEREBRO.md`, `meta/CHANGELOG.md`, `meta/CONTEXT.md`, `meta/DECISIONS.md`, `meta/GLOSSARY.md`, `meta/IDEAS.md`, `meta/ROADMAP.md`, `meta/STATUS.md`, `package-lock.json`, `package.json`, `scripts/regress-baseline.json`, `scripts/seeds-baseline.json`, `src/core/generate.js`, `src/core/utils.js`, `src/generators/baroque.js`, `src/generators/generic.js`, `src/generators/victorian.js` (**18 `M`**) e `??` em `meta/workorders/261117-wo0009-seed-vivo-barroco-vitoriano.md`, `specs/261117-seed-vivo-barroco-vitoriano.md` (**2 `??`**). Em `src/`, só os 5 arquivos listados.
- [ ] `git diff --stat -- scripts/regress-baseline.json` → `66 insertions(+), 66 deletions(-)`. Mais: **PARE**. `git diff --stat -- scripts/seeds-baseline.json` → `11 insertions(+), 11 deletions(-)`.
- [ ] `grep -c "^export function spiralPath\|^export function shellFanPaths" src/core/utils.js` → **2**; `grep -c "genBQ.*sw, 'victorian')," src/core/generate.js` → **2** (a linha do divisor também termina em `sw, 'victorian'),` e fica de fora de propósito).
- [ ] `grep -c "style = 'baroque'" src/generators/baroque.js` → **2**.
- [ ] `grep -c '"version": "0.8.0",' package.json package-lock.json` → `package.json:1`, `package-lock.json:2`.
- [ ] `grep -c "^## \[0.8.0\] — 20" meta/CHANGELOG.md` → **1**; `grep -c "{DATA}" meta/CHANGELOG.md` → **0**; `grep -c "^## DEC-019 " meta/DECISIONS.md` → **1**.
- [ ] `grep -c "^\*\*\[0.8.0\]\*\* —" meta/STATUS.md` → **1**; `grep -c "^- \*\*O seed ainda não muda a forma em 24 dos 53 tipos\*\*" meta/STATUS.md` → **1**; `grep -c "^- \[x\] Lote Barroco + Vitoriano" meta/ROADMAP.md` → **1**.
- [ ] **dist:** `grep -c "//__SCRIPT__" dist/vectorforge.html` → **0** (Armadilha 9).
- [ ] Sonda de UI segue verde: `cd ../261112-sonda-ui && node behave.cjs ../vectorforge/dist/vectorforge.html | grep -c "^OK"; cd ../vectorforge` → **18**.
  - **Quem roda:** quem aplica. **Chega no ramo?** No carregamento do bundle e na seleção de estilos ao acaso — não percorre os 11 tipos. **Pergunta que NÃO responde:** a aparência — é o roteiro do dono (o chat rodou no protótipo uma sonda descartável que renderiza os 12 tipos dos dois estilos × 3 seeds no `dist`: 36 renders, 0 erros de JS).

## Relatório de aplicação *(quem aplica preenche ao terminar)*

O que foi feito · desvios · saída CRUA: as contagens do regress (passo 1), `seeds --update` e as linhas `^baroque|^victorian` do `npm run seeds` · arquivos tocados · build · commit e push.

## Commit — blocos separados, mensagem SEM acento

```
git add dist/vectorforge.html meta/CEREBRO.md meta/CHANGELOG.md meta/CONTEXT.md meta/DECISIONS.md meta/GLOSSARY.md meta/IDEAS.md meta/ROADMAP.md meta/STATUS.md package-lock.json package.json scripts/regress-baseline.json scripts/seeds-baseline.json src/core/generate.js src/core/utils.js src/generators/baroque.js src/generators/generic.js src/generators/victorian.js meta/workorders/261117-wo0009-seed-vivo-barroco-vitoriano.md specs/261117-seed-vivo-barroco-vitoriano.md
```

```
git commit -m "feat(baroque,victorian): seed passa a mudar a forma de 11 tipos" -m "Cada gerador sorteia variante de motivo, arranjo e acabamento; genBQAcanthus e genBQCartouche ganham style, e flourish e cartouche do Vitoriano deixam de ser copias dos barrocos. Primitivas spiralPath e shellFanPaths em core/utils. seeds formas>1 de 18/53 para 29/53; regress regravado para as 66 chaves do lote. Versao 0.8.0. Ver DEC-019 e WO 0009."
```

```
git push
```

*Gerado pelo Kit de Contexto Universal v1.135.0 — 2026-11-11 — esta linha e do KIT: nao funda, substitua pela do pacote mais recente.*
