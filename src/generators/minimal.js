// src/generators/minimal.js — estilo Minimal.
// F5, lote 5 (DEC-023): o seed escolhe o ESQUELETO (contorno, arranjo, campo, comprimento,
// posição) e o motivo de cada tipo; os sliders seguem mandando na densidade (Complexity) e na
// contagem radial (Symmetry). Identidade do estilo: poucos traços de uma espessura só, muito
// vazio, geometria exata, no máximo um ponto cheio de acento. Até v0.11.0, os 6 tipos saíam
// iguais para qualquer seed.

import { TAU, f, pt, polyPath, pickOne } from '../core/utils.js';
import { state, PALETTES } from '../core/state.js';

/** Contorno fechado de um símbolo: círculo, quadrado, triângulo ou hexágono de raio r. */
function outlinePath(kind, cx, cy, r) {
  if (kind === 'square') return `<rect x="${f(cx - r * 0.82)}" y="${f(cy - r * 0.82)}" width="${f(r * 1.64)}" height="${f(r * 1.64)}"`;
  if (kind === 'triangle') return `<path d="${polyPath(cx, cy + r * 0.12, r, 3)}"`;
  if (kind === 'hexagon') return `<path d="${polyPath(cx, cy, r, 6, 0)}"`;
  return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}"`;
}

/**
 * Símbolo e marca do Minimal. `kind` separa os dois repertórios (o dispatcher chama este gerador
 * para `symbol` e, menor, para `mark`): sem ele, os dois tipos sairiam iguais (lição do DEC-019).
 * symbol — contorno (círculo · quadrado · triângulo · hexágono · arco aberto · sem contorno) ×
 *          miolo (raios · cruz · anel · ponto deslocado · meia-lua · barra) × escala × posição;
 *          o desenho original (círculo, raios, ponto) é uma das combinações.
 * mark   — composições de marca: círculos sobrepostos · círculo no quadrado · quartos de círculo
 *          · barras escalonadas · chevrons · meio cheio · arco sobre ponto; giro de 0° ou 90°.
 */
export function genMinimalSymbol(cx, cy, sz, comp, sym, rnd, SO, FG, sw, kind = 'symbol') {
  const parts = [];
  if (kind === 'mark') return genMinMark(cx, cy, sz, comp, rnd, SO, FG, parts);
  const outline = pickOne(['circle', 'circle', 'square', 'triangle', 'hexagon', 'arc', 'none'], rnd);
  let inner = pickOne(['ticks', 'cross', 'ring', 'dot', 'crescent', 'bar'], rnd);
  if (outline === 'none' && inner === 'dot') inner = 'cross'; // ponto solto, sem contorno, some no quadro
  const R = sz * pickOne([0.46, 0.36, 0.28], rnd);
  const oy = pickOne([0, 0, -0.32, 0.32], rnd) * sz; // a maior parte no centro; às vezes no alto ou embaixo
  const y = cy + oy;
  if (outline === 'arc') {
    const gap = pickOne([Math.PI / 2, Math.PI / 3], rnd), a0 = Math.PI / 2 + gap / 2, a1 = Math.PI / 2 - gap / 2 + TAU;
    const [x0, y0] = pt(cx, y, R, a0), [x1, y1] = pt(cx, y, R, a1);
    parts.push(`<path d="M ${f(x0)} ${f(y0)} A ${f(R)} ${f(R)} 0 1 1 ${f(x1)} ${f(y1)}" ${SO}/>`);
  } else if (outline !== 'none') parts.push(`${outlinePath(outline, cx, y, R)} ${SO}/>`);
  const n = Math.round(3 + sym * 3);
  if (inner === 'ticks') {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU - Math.PI / 2;
      const [x1, y1] = pt(cx, y, R * 0.39, a), [x2, y2] = pt(cx, y, R * 0.91, a);
      parts.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" ${SO}/>`);
    }
  } else if (inner === 'cross') {
    const a0 = rnd() < 0.5 ? 0 : Math.PI / 4;
    for (const a of [a0, a0 + Math.PI / 2]) {
      const [x1, y1] = pt(cx, y, R * 0.7, a), [x2, y2] = pt(cx, y, R * 0.7, a + Math.PI);
      parts.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" ${SO}/>`);
    }
  } else if (inner === 'ring') {
    parts.push(`<circle cx="${f(cx)}" cy="${f(y)}" r="${f(R * 0.5)}" ${SO}/>`);
  } else if (inner === 'dot') {
    const [dx, dy] = pt(cx, y, R * 0.45, rnd() * TAU);
    parts.push(`<circle cx="${f(dx)}" cy="${f(dy)}" r="${f(R * 0.16)}" ${FG}/>`);
  } else if (inner === 'crescent') {
    const r = R * 0.55;
    parts.push(`<path d="M ${f(cx)} ${f(y - r)} A ${f(r)} ${f(r)} 0 1 0 ${f(cx)} ${f(y + r)} A ${f(r * 0.7)} ${f(r)} 0 1 1 ${f(cx)} ${f(y - r)} Z" ${FG}/>`);
  } else {
    const L = R * pickOne([1.4, 2.2], rnd);
    parts.push(`<line x1="${f(cx - L / 2)}" y1="${f(y)}" x2="${f(cx + L / 2)}" y2="${f(y)}" ${SO}/>`);
  }
  if (comp > 0.3 && inner !== 'dot' && inner !== 'crescent') parts.push(`<circle cx="${f(cx)}" cy="${f(y)}" r="${f(R * 0.33)}" ${FG}/>`);
  return parts.join('\n');
}

/** Repertório da marca (logotipo geométrico), chamado por genMinimalSymbol(kind = 'mark'). */
function genMinMark(cx, cy, sz, comp, rnd, SO, FG, parts) {
  const motif = pickOne(['overlap', 'circleSquare', 'quarters', 'bars', 'chevrons', 'half', 'arch'], rnd);
  const turn = rnd() < 0.5; // giro de 90°: horizontal ↔ vertical
  // escala e deslocamento do conjunto: a marca nem sempre ocupa o centro do quadro
  const k0 = pickOne([1, 1, 0.7], rnd), [ox, oy] = pickOne([[0, 0], [0, 0], [0, -0.35], [0, 0.35], [-0.35, 0], [0.35, 0]], rnd);
  cx += ox * sz; cy += oy * sz;
  const P = (x, y) => (turn ? [cx - (y - cy), cy + (x - cx)] : [x, y]);
  const r = sz * 0.42 * k0;
  if (motif === 'overlap') {
    const d = r * pickOne([0.5, 0.8], rnd);
    for (const s of [-1, 1]) { const [x, y] = P(cx + s * d / 2, cy); parts.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 0.7)}" ${SO}/>`); }
  } else if (motif === 'circleSquare') {
    parts.push(`<rect x="${f(cx - r)}" y="${f(cy - r)}" width="${f(2 * r)}" height="${f(2 * r)}" ${SO}/>`);
    const [x, y] = P(cx + r * 0.3, cy - r * 0.3);
    parts.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 0.6)}" ${comp > 0.25 ? FG : SO}/>`);
  } else if (motif === 'quarters') {
    // 2×2 de quartos de círculo, cada um virado para um canto (Bauhaus)
    const h = r;
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy], i) => {
      const ox = cx + (sx < 0 ? -h : 0), oy = cy + (sy < 0 ? -h : 0);
      const corner = [ox + (i % 2 ? h : 0), oy + (i < 2 ? h : 0)];
      const a = [corner[0] + (i % 2 ? -h : h), corner[1]], b = [corner[0], corner[1] + (i < 2 ? -h : h)];
      parts.push(`<path d="M ${f(corner[0])} ${f(corner[1])} L ${f(a[0])} ${f(a[1])} A ${f(h)} ${f(h)} 0 0 ${i === 1 || i === 2 ? 1 : 0} ${f(b[0])} ${f(b[1])} Z" ${i === 3 && comp > 0.2 ? FG : SO}/>`);
    });
  } else if (motif === 'bars') {
    const k = 3 + Math.round(comp * 2), gap = (2 * r) / (k * 2 - 1);
    for (let i = 0; i < k; i++) {
      const len = 2 * r * (1 - i / (k + 1)), y = cy - r + i * gap * 2;
      const [x1, y1] = P(cx - r, y), [x2, y2] = P(cx - r + len, y);
      parts.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" ${SO}/>`);
    }
  } else if (motif === 'chevrons') {
    for (const k of [1, 0.6]) {
      const pts = [P(cx - r * k, cy - r * k * 0.6), P(cx, cy + r * k * 0.6), P(cx + r * k, cy - r * k * 0.6)];
      parts.push(`<polyline points="${pts.map(q => f(q[0]) + ',' + f(q[1])).join(' ')}" ${SO}/>`);
    }
  } else if (motif === 'half') {
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" ${SO}/>`);
    const [x0, y0] = P(cx, cy - r), [x1, y1] = P(cx, cy + r);
    parts.push(`<path d="M ${f(x0)} ${f(y0)} A ${f(r)} ${f(r)} 0 0 1 ${f(x1)} ${f(y1)} Z" ${FG}/>`);
  } else {
    const [x0, y0] = P(cx - r, cy + r * 0.4), [x1, y1] = P(cx + r, cy + r * 0.4);
    parts.push(`<path d="M ${f(x0)} ${f(y0)} A ${f(r)} ${f(r)} 0 0 1 ${f(x1)} ${f(y1)}" ${SO}/>`);
    const [dx, dy] = P(cx, cy + r * 0.15);
    parts.push(`<circle cx="${f(dx)}" cy="${f(dy)}" r="${f(r * 0.18)}" ${FG}/>`);
  }
  return parts.join('\n');
}

/**
 * Linha divisória do Minimal (até v0.11.0 era o genDivider('min'), uma linha cheia fixa).
 * O seed escolhe o comprimento (cheia · média · curta), quantas linhas (1–3) e o espaçamento,
 * o alinhamento (centro · esquerda) e o acento (nenhum · ponto · vão com ponto · losango ·
 * remates · anel). Complexity engrossa o acento; o traço é sempre um só.
 */
export function genMinLine(x, cy, w, h, comp, sym, rnd, SO, FG, sw) {
  const parts = [];
  const full = w - 32, L = full * pickOne([1, 0.6, 0.34], rnd);
  const lines = pickOne([1, 1, 2, 3], rnd), gap = h * pickOne([0.025, 0.07], rnd);
  const align = pickOne(['center', 'center', 'left'], rnd);
  const accent = pickOne(['none', 'dot', 'gapDot', 'diamond', 'caps', 'ring'], rnd);
  const x0 = align === 'left' ? x + 16 : x + (w - L) / 2, x1 = x0 + L, mx = align === 'left' ? x0 + L * 0.15 : (x0 + x1) / 2;
  const a = 3 + comp * 4;
  for (let i = 0; i < lines; i++) {
    const y = cy + (i - (lines - 1) / 2) * gap;
    if (accent === 'gapDot' && i === Math.floor(lines / 2)) {
      parts.push(`<line x1="${f(x0)}" y1="${f(y)}" x2="${f(mx - a * 3)}" y2="${f(y)}" ${SO}/>`, `<line x1="${f(mx + a * 3)}" y1="${f(y)}" x2="${f(x1)}" y2="${f(y)}" ${SO}/>`);
    } else parts.push(`<line x1="${f(x0)}" y1="${f(y)}" x2="${f(x1)}" y2="${f(y)}" ${SO}/>`);
  }
  if (accent === 'dot' || accent === 'gapDot') parts.push(`<circle cx="${f(mx)}" cy="${f(cy)}" r="${f(a)}" ${FG}/>`);
  else if (accent === 'diamond') parts.push(`<path d="M ${f(mx)} ${f(cy - a * 2)} L ${f(mx + a * 1.3)} ${f(cy)} L ${f(mx)} ${f(cy + a * 2)} L ${f(mx - a * 1.3)} ${f(cy)} Z" ${FG}/>`);
  else if (accent === 'ring') parts.push(`<circle cx="${f(mx)}" cy="${f(cy)}" r="${f(a * 2.2)}" ${SO}/>`);
  else if (accent === 'caps') {
    const hh = a * 2 + (lines - 1) * gap / 2;
    for (const px of [x0, x1]) parts.push(`<line x1="${f(px)}" y1="${f(cy - hh)}" x2="${f(px)}" y2="${f(cy + hh)}" ${SO}/>`);
  }
  return parts.join('\n');
}

/**
 * Grade do Minimal. O seed escolhe o CAMPO (página · quadrado central · círculo · faixa ·
 * coluna) e o tipo de grade (linhas · pontos nos cruzamentos · células esparsas · tijolos);
 * Complexity define quantas divisões. O círculo cheio de acento (desde v0.1.0, comp > 0,5) virou
 * uma célula cheia escolhida pelo seed.
 */
export function genMinGrid(x, y, w, h, comp, rnd, SO, FG, sw) {
  const parts = [];
  const field = pickOne(['full', 'square', 'circle', 'band', 'column'], rnd);
  const kind = pickOne(['lines', 'dots', 'cells', 'bricks'], rnd);
  const m = Math.min(w, h), cx = x + w / 2, cy = y + h / 2;
  // caixa do campo
  let bx = x, by = y, bw = w, bh = h;
  if (field === 'square' || field === 'circle') { bw = bh = m * 0.76; bx = cx - bw / 2; by = cy - bh / 2; }
  else if (field === 'band') { bh = h * 0.36; by = cy - bh / 2; }
  else if (field === 'column') { bw = w * 0.36; bx = cx - bw / 2; }
  const R = bw / 2;
  /** Trecho [a, b] da reta horizontal (ou vertical) em t que fica dentro do campo. */
  const span = (t, vertical) => {
    if (field !== 'circle') return vertical ? [by, by + bh] : [bx, bx + bw];
    const d = (vertical ? t - cx : t - cy), s = R * R - d * d;
    if (s <= 0) return null;
    const c = vertical ? cy : cx; return [c - Math.sqrt(s), c + Math.sqrt(s)];
  };
  const inside = (px, py) => field !== 'circle' || Math.hypot(px - cx, py - cy) <= R + 0.01;
  const n = Math.round(3 + comp * 8);
  const sx = bw / n, sy = field === 'band' ? bh / Math.max(2, Math.round(n * bh / bw)) : field === 'column' ? sx : bh / n;
  const rows = Math.round(bh / sy);
  if (kind === 'lines' || kind === 'bricks') {
    for (let j = 0; j <= rows; j++) { const py = by + j * sy, s = span(py, false); if (s) parts.push(`<line x1="${f(s[0])}" y1="${f(py)}" x2="${f(s[1])}" y2="${f(py)}" ${SO}/>`); }
    if (kind === 'lines') for (let i = 0; i <= n; i++) { const px = bx + i * sx, s = span(px, true); if (s) parts.push(`<line x1="${f(px)}" y1="${f(s[0])}" x2="${f(px)}" y2="${f(s[1])}" ${SO}/>`); }
    else for (let j = 0; j < rows; j++) for (let i = 0; i <= n; i++) {
      const px = bx + (i + (j % 2) * 0.5) * sx, py = by + j * sy;
      if (px > bx + bw + 0.01 || !inside(px, py) || !inside(px, py + sy)) continue;
      parts.push(`<line x1="${f(px)}" y1="${f(py)}" x2="${f(px)}" y2="${f(py + sy)}" ${SO}/>`);
    }
  } else if (kind === 'dots') {
    for (let j = 0; j <= rows; j++) for (let i = 0; i <= n; i++) { const px = bx + i * sx, py = by + j * sy; if (inside(px, py)) parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(Math.max(1.2, sx * 0.06))}" ${FG}/>`); }
  } else {
    for (let j = 0; j < rows; j++) for (let i = 0; i < n; i++) {
      const px = bx + i * sx, py = by + j * sy;
      if (rnd() < 0.62 || !inside(px + sx / 2, py + sy / 2)) continue;
      parts.push(`<rect x="${f(px + sx * 0.12)}" y="${f(py + sy * 0.12)}" width="${f(sx * 0.76)}" height="${f(sy * 0.76)}" ${SO}/>`);
    }
  }
  if (field !== 'full') parts.push(field === 'circle' ? `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R)}" ${SO}/>` : `<rect x="${f(bx)}" y="${f(by)}" width="${f(bw)}" height="${f(bh)}" ${SO}/>`);
  if (comp > 0.5) {
    // célula de acento cheia, dentro do campo
    for (let t = 0; t < 12; t++) {
      const i = Math.floor(rnd() * n), j = Math.floor(rnd() * rows), px = bx + i * sx, py = by + j * sy;
      if (!inside(px + sx / 2, py + sy / 2)) continue;
      parts.push(`<rect x="${f(px + sx * 0.12)}" y="${f(py + sy * 0.12)}" width="${f(sx * 0.76)}" height="${f(sy * 0.76)}" ${FG}/>`);
      break;
    }
  }
  return parts.join('\n');
}

/**
 * Círculos do Minimal. O seed escolhe o arranjo: concêntricos (o desenho de antes) · tangentes
 * no ponto de baixo · fileira · sobrepostos (2–3, «Venn») · órbita (anel + ponto) · pilha
 * vertical. Complexity define quantos; os cheios alternam com os vazados.
 */
export function genMinCircles(cx, cy, sz, comp, rnd, SO, FG, sw) {
  const parts = [];
  const n = 2 + Math.round(comp * 6);
  const arr = pickOne(['concentric', 'tangent', 'row', 'venn', 'orbit', 'stack'], rnd);
  // direção do arranjo (para onde os círculos «caem» ou se alinham) e escala do conjunto
  const dir = pickOne([Math.PI / 2, -Math.PI / 2, 0, Math.PI], rnd), k0 = pickOne([1, 0.7], rnd);
  const C = (x, y, r, fill) => parts.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" ${fill ? FG : SO}/>`);
  if (arr === 'concentric') {
    const [ox, oy] = k0 < 1 ? pt(cx, cy, sz * 0.18, dir) : [cx, cy];
    for (let i = n; i >= 1; i--) C(ox, oy, sz * 0.48 * k0 * i / n, i % 2 !== 0);
  } else if (arr === 'tangent') {
    // todos tocam o mesmo ponto da borda, na direção sorteada
    const [bx, by] = pt(cx, cy, sz * 0.46 * k0, dir);
    for (let i = n; i >= 1; i--) { const r = sz * 0.46 * k0 * i / n, [x, y] = pt(bx, by, r, dir + Math.PI); C(x, y, r, i === 1); }
  } else if (arr === 'row') {
    const k = Math.min(n, 6), r = sz * 0.9 / k, dec = rnd() < 0.5; // k diâmetros cobrem 2 × 0,9 sz
    for (let i = 0; i < k; i++) { const rr = dec ? r * (1 - i / (k + 1)) : r; C(cx - sz * 0.9 + r + i * 2 * r, cy, rr * 0.9, i === 0); }
  } else if (arr === 'venn') {
    const k = rnd() < 0.5 ? 2 : 3, r = sz * 0.3;
    for (let i = 0; i < k; i++) { const [x, y] = pt(cx, cy, r * 0.6, -Math.PI / 2 + i * TAU / k + (k === 2 ? Math.PI / 2 : 0)); C(x, y, r, false); }
    if (comp > 0.4) C(cx, cy, r * 0.15, true);
  } else if (arr === 'orbit') {
    const R = sz * pickOne([0.46, 0.34], rnd);
    C(cx, cy, R, false);
    if (n > 4) C(cx, cy, R * 0.55, false);
    const [x, y] = pt(cx, cy, R, rnd() * TAU);
    C(x, y, sz * 0.07, true);
    C(cx, cy, sz * 0.03, true);
  } else {
    // pilha: do maior ao menor, subindo a partir da borda na direção sorteada
    // os diâmetros somam 1,8 sz (× escala), do maior ao menor
    const k = Math.min(n, 5), wts = Array.from({ length: k }, (_, i) => 1.25 - i * 0.18), sum = wts.reduce((a, b) => a + b, 0);
    let d = sz * 0.9 * k0;
    for (let i = 0; i < k; i++) { const r = sz * 0.9 * k0 * wts[i] / sum, [x, y] = pt(cx, cy, d - r, dir); C(x, y, r, i === k - 1); d -= 2 * r; }
  }
  return parts.join('\n');
}

/**
 * Glyph do Minimal. Com texto na caixa do Text→Form, desenha o texto como sempre (as miniaturas
 * «Like this» passam por aqui). Sem texto, o seed monta um sinal assêmico — 1 a 3 «letras» de
 * traços simples (haste, bojo, barra, diagonal, gancho, ponto) numa caixa de proporção fixa;
 * até v0.11.0 era sempre o caractere ✦, que a régua de silhueta nem enxerga (<text>).
 */
export function genGlyph(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const text = document.getElementById('tv-ta').value.trim();
  if (text) {
    const font = state.font;
    const fsize = sz * 0.9;
    return `<text x="${f(cx)}" y="${f(cy)}" text-anchor="middle" dominant-baseline="middle" font-family="${font}" font-size="${f(fsize)}" fill="none" stroke="${PALETTES[state.pal].stroke}" stroke-width="${sw * 0.5}">${text}</text>`;
  }
  const parts = [];
  const count = pickOne([1, 1, 2, 3], rnd);
  const gh = sz * (count === 1 ? 1.1 : count === 2 ? 0.8 : 0.6), gw = gh * 0.62, gap = gw * 0.35;
  const total = count * gw + (count - 1) * gap;
  const strokes = 2 + Math.round(comp * 2);
  for (let g = 0; g < count; g++) {
    const x0 = cx - total / 2 + g * (gw + gap), y0 = cy - gh / 2, X = u => x0 + u * gw, Y = v => y0 + v * gh;
    const used = new Set();
    for (let s = 0; s < strokes; s++) {
      const k = pickOne(['stem', 'half', 'bowl', 'bar', 'diag', 'hook', 'dot'], rnd);
      if (used.has(k)) continue; used.add(k);
      const side = rnd() < 0.5 ? 0 : 1;
      if (k === 'stem') parts.push(`<line x1="${f(X(side ? 0.85 : 0.15))}" y1="${f(Y(0))}" x2="${f(X(side ? 0.85 : 0.15))}" y2="${f(Y(1))}" ${SO}/>`);
      else if (k === 'half') parts.push(`<line x1="${f(X(0.5))}" y1="${f(Y(side ? 0.5 : 0))}" x2="${f(X(0.5))}" y2="${f(Y(side ? 1 : 0.5))}" ${SO}/>`);
      else if (k === 'bowl') { const v0 = side ? 0.5 : 0.1, v1 = v0 + 0.4; parts.push(`<path d="M ${f(X(0.15))} ${f(Y(v0))} A ${f(gw * 0.42)} ${f(gh * 0.2)} 0 1 1 ${f(X(0.15))} ${f(Y(v1))}" ${SO}/>`); }
      else if (k === 'bar') parts.push(`<line x1="${f(X(0))}" y1="${f(Y(side ? 0.55 : 0.08))}" x2="${f(X(1))}" y2="${f(Y(side ? 0.55 : 0.08))}" ${SO}/>`);
      else if (k === 'diag') parts.push(`<line x1="${f(X(side ? 0 : 1))}" y1="${f(Y(0))}" x2="${f(X(side ? 1 : 0))}" y2="${f(Y(1))}" ${SO}/>`);
      else if (k === 'hook') parts.push(`<path d="M ${f(X(0.85))} ${f(Y(0.95))} L ${f(X(0.85))} ${f(Y(0.35))} A ${f(gw * 0.35)} ${f(gw * 0.35)} 0 0 0 ${f(X(0.15))} ${f(Y(0.35))}" ${SO}/>`);
      else parts.push(`<circle cx="${f(X(0.5))}" cy="${f(Y(side ? 1.12 : -0.12))}" r="${f(gw * 0.07)}" ${FG}/>`);
    }
  }
  return parts.join('\n');
}
