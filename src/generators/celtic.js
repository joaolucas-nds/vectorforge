// Estilo Celta. F5 lote 4 (DEC-021): os seis tipos nascem com ESQUELETO semeado (contorno,
// escala, arranjo) e escolhas de detalhe por cima. Até v0.9.0, border, medallion, knotwork e
// spiral emprestavam a moldura Art Deco, a mandala geométrica, o próprio nó e a espiral do
// Orgânico; agora cada um tem gerador celta (trança, tríscele, triquetra, nó de corrente).
// `genCelticKnot` e `genCelticCross` mantêm o desenho original como uma das variantes.


import { TAU, f, pt, polyPath, pickOne, contourRadius, contourPath, spiralPath } from '../core/utils.js';


/** Path de uma lista de pontos (fechado ou não). */
const pathOf = (pts, close) => 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + (close ? ' Z' : '');

/**
 * Nó em roseta entrelaçada: r(θ) = R·(0,55 + 0,45·cos(p/q·θ)), θ em q voltas — com p/q não
 * inteiro o laço cruza a si mesmo, como uma fita celta. Desenhado em FITA (duas linhas).
 * @returns {string} elementos SVG
 */
function roseKnot(cx, cy, R, p, q, SO, rFn = null) {
  const N = 180 * q, line = k => pathOf(Array.from({ length: N }, (_, i) => {
    const th = i * TAU * q / N, a = th - Math.PI / 2, base = rFn ? rFn(a) / R : 1;
    return pt(cx, cy, R * k * base * (0.55 + 0.45 * Math.cos(p / q * th)), a);
  }), true);
  return `<path d="${line(1)}" ${SO}/>\n<path d="${line(0.9)}" ${SO}/>`;
}

/** Triquetra: três pétalas (elipses giradas) e um anel atravessando, em fita. */
function triquetra(cx, cy, R, SO, ring = true) {
  const out = [];
  const petal = (a, k) => pathOf(Array.from({ length: 48 }, (_, i) => {
    const t = i * TAU / 48, ex = R * 0.5 * k * Math.cos(t), ey = R * 0.24 * k * Math.sin(t);
    const [ox, oy] = pt(cx, cy, R * 0.42, a);
    return [ox + ex * Math.cos(a) - ey * Math.sin(a), oy + ex * Math.sin(a) + ey * Math.cos(a)];
  }), true);
  for (let j = 0; j < 3; j++) { const a = -Math.PI / 2 + j * TAU / 3; out.push(`<path d="${petal(a, 1)}" ${SO}/>`, `<path d="${petal(a, 0.8)}" ${SO}/>`); }
  if (ring) for (const k of [0.5, 0.42]) out.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R * k)}" ${SO}/>`);
  return out.join('\n');
}

/** Tríscele (ou 1, 2, 4 braços): de cada braço sai uma haste que termina numa espiral. */
function triskele(cx, cy, R, arms, turns, rot, SO, FG) {
  const out = [];
  for (let j = 0; j < arms; j++) {
    const a = rot + j * TAU / arms, [sx, sy] = pt(cx, cy, R * 0.55, a), r = R * 0.42;
    const a0 = a + Math.PI; // a espiral começa do lado voltado para o centro
    const [qx, qy] = pt(sx, sy, r, a0);
    const [mx, my] = pt(cx, cy, R * 0.3, a - 0.6);
    out.push(`<path d="M ${f(cx)} ${f(cy)} Q ${f(mx)} ${f(my)} ${f(qx)} ${f(qy)}" ${SO}/>`);
    out.push(`<path d="${spiralPath(sx, sy, r, turns, 1, a0)}" ${SO}/>`);
    out.push(`<circle cx="${f(sx)}" cy="${f(sy)}" r="${f(R * 0.035)}" ${FG}/>`);
  }
  return out.join('\n');
}

/**
 * Nó celta. ESQUELETO (DEC-021): escala e o tipo de nó — estrela de laços (o original) · roseta
 * entrelaçada p/q · triquetra · corrente de anéis ao redor de um contorno. Symmetry = laços (n);
 * Complexity = profundidade dos laços.
 * @returns {string} elementos SVG
 */
export function genCelticKnot(cx, cy, sz, n, comp, rnd, SO, FG, sw) {
  const kind = pickOne(['star', 'rose', 'triquetra', 'chain'], rnd);
  const scale = pickOne([0.8, 1, 1.12], rnd);
  const [p, q] = pickOne([[3, 2], [5, 2], [5, 3], [7, 3], [4, 3]], rnd);
  const contour = pickOne(['circle', 'wide', 'tall', 'polygon'], rnd);
  const R = sz * 0.42 * scale;
  const rFn = contour === 'wide' ? contourRadius('ellipse', R, { sx: 1.12, sy: 0.8 }) : contour === 'tall' ? contourRadius('ellipse', R, { sx: 0.8, sy: 1.12 })
    : contour === 'polygon' ? contourRadius('polygon', R, { k: Math.max(3, Math.round(n / 2)), rot: -Math.PI / 2 }) : contourRadius('circle', R);
  if (kind === 'rose') return roseKnot(cx, cy, R, p, q, SO, contour === 'circle' ? null : rFn) + `\n<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.05)}" ${FG}/>`;
  if (kind === 'triquetra') return triquetra(cx, cy, R * 1.05, SO);
  if (kind === 'chain') {
    // corrente: k anéis em fita, entrelaçados ao longo do contorno, mais os dois trilhos
    const parts = [], k = Math.max(6, Math.round(n * 0.75 + comp * 6));
    for (let i = 0; i < k; i++) { const a = -Math.PI / 2 + i * TAU / k, [px, py] = pt(cx, cy, rFn(a) * 0.72, a), rr = rFn(a) * 0.72 * Math.sin(Math.PI / k) * 1.25; parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(rr)}" ${SO}/>`, `<circle cx="${f(px)}" cy="${f(py)}" r="${f(rr * 0.78)}" ${SO}/>`); }
    for (const s of [1.02, 0.42]) parts.push(`<path d="${contourPath(cx, cy, rFn, s)}" ${SO}/>`);
    return parts.join('\n');
  }
  // estrela de laços — o desenho original, agora na escala sorteada
  const parts = [];
  const r = R;
  const n2 = Math.round(n * 0.5 + comp * 6) * 2;
  const pts = Array.from({ length: n2 }, (_, i) => {
    const a = (i / n2) * TAU;
    const rr = i % 2 === 0 ? r : r * (0.6 + comp * 0.2);
    return pt(cx, cy, rr, a);
  });
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) {
    const curr = pts[i];
    const cpx = cx + (curr[0] - cx) * 0.5, cpy = cy + (curr[1] - cy) * 0.5;
    d += ` Q ${f(cpx)} ${f(cpy)} ${f(curr[0])} ${f(curr[1])}`;
  }
  parts.push(`<path d="${d} Z" ${SO}/>`);
  parts.push(`<path d="${pathOf(pts.map(([x, y]) => [cx + (x - cx) * 0.55, cy + (y - cy) * 0.55]), true)}" ${SO}/>`);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.06)}" ${FG}/>`);
  return parts.join('\n');
}

/**
 * Painel de trança (knotwork): duas famílias de fitas onduladas em contrafase, formando tranças,
 * recortadas por um CAMPO semeado (quadrado · círculo · losango · faixa · cruz) com contorno.
 * Complexity = quantidade de tranças.
 * @returns {string} elementos SVG
 */
export function genCelticKnotwork(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const parts = [];
  const field = pickOne(['square', 'circle', 'diamond', 'band', 'cross'], rnd);
  const R = sz * 0.5 * pickOne([0.85, 1, 1.1], rnd);
  const rows = 3 + Math.round(comp * 4) + pickOne([-1, 0, 1], rnd);
  const tilt = pickOne([0, Math.PI / 4], rnd); // tranças na horizontal ou na diagonal
  const inside = (x, y) => {
    const dx = Math.abs(x - cx), dy = Math.abs(y - cy);
    if (field === 'circle') return Math.hypot(dx, dy) <= R;
    if (field === 'diamond') return dx + dy <= R * 1.15;
    if (field === 'band') return dy <= R * 0.42 && dx <= R * 1.05;
    if (field === 'cross') return (dx <= R * 0.34 || dy <= R * 0.34) && Math.max(dx, dy) <= R;
    return dx <= R * 0.9 && dy <= R * 0.9;
  };
  const g = 2 * R / rows, A = g * 0.32, lam = g * 1.6, c = Math.cos(tilt), s = Math.sin(tilt);
  for (let k = 0; k < rows; k++) for (const ph of [0, Math.PI]) for (const off of [-0.07, 0.07]) {
    // fita = duas linhas paralelas; cada trança = duas fitas em contrafase
    const v0 = -R + g * (k + 0.5);
    let d = '', pen = false;
    for (let i = 0; i <= 80; i++) {
      const u = -R * 1.2 + i * 2.4 * R / 80, v = v0 + A * Math.sin(TAU * u / lam + ph) + off * g;
      const x = cx + u * c - v * s, y = cy + u * s + v * c;
      if (inside(x, y)) { d += `${pen ? ' L' : (d ? ' M' : 'M')} ${f(x)} ${f(y)}`; pen = true; } else pen = false;
    }
    if (d) parts.push(`<path d="${d}" ${SO}/>`);
  }
  // contorno do campo
  const P = (x, y) => `${f(cx + x)} ${f(cy + y)}`, m = g * 0.3;
  if (field === 'circle') parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R + m)}" ${SO}/>`);
  else if (field === 'diamond') { const r = R * 1.15 + m; parts.push(`<path d="M ${P(0, -r)} L ${P(r, 0)} L ${P(0, r)} L ${P(-r, 0)} Z" ${SO}/>`); }
  else if (field === 'band') parts.push(`<rect x="${f(cx - R * 1.05 - m)}" y="${f(cy - R * 0.42 - m)}" width="${f(2 * (R * 1.05 + m))}" height="${f(2 * (R * 0.42 + m))}" ${SO}/>`);
  else if (field === 'cross') { const a = R * 0.34 + m, b = R + m; parts.push(`<path d="M ${P(-a, -b)} L ${P(a, -b)} L ${P(a, -a)} L ${P(b, -a)} L ${P(b, a)} L ${P(a, a)} L ${P(a, b)} L ${P(-a, b)} L ${P(-a, a)} L ${P(-b, a)} L ${P(-b, -a)} L ${P(-a, -a)} Z" ${SO}/>`); }
  else parts.push(`<rect x="${f(cx - R * 0.9 - m)}" y="${f(cy - R * 0.9 - m)}" width="${f(2 * (R * 0.9 + m))}" height="${f(2 * (R * 0.9 + m))}" ${SO}/>`);
  return parts.join('\n');
}

/**
 * Borda celta: faixa com trança correndo entre dois trilhos. ESQUELETO (DEC-021): margem e
 * largura da faixa; DETALHE: trilhos simples ou duplos, 2 ou 3 fios na trança, canto em laço,
 * nó quadrado ou espiral. Complexity = largura da faixa.
 * @returns {string} elementos SVG
 */
export function genCelticBorder(x, y, w, h, comp, sym, rnd, SO, FG, sw) {
  const parts = [];
  const m = pickOne([8, 18, 32], rnd);
  const band = pickOne([10, 16, 24], rnd) + comp * 6;
  const rails = pickOne(['double', 'single'], rnd);
  const strands = pickOne([2, 3], rnd);
  const corner = pickOne(['loop', 'square', 'spiral'], rnd);
  const rect = (d) => `<rect x="${f(d)}" y="${f(d)}" width="${f(w - 2 * d)}" height="${f(h - 2 * d)}" ${SO}/>`;
  parts.push(rect(m), rect(m + band));
  if (rails === 'double') parts.push(rect(m + 2.5), rect(m + band - 2.5));
  const mid = m + band / 2, amp = band * 0.3, lam = band * 2.4;
  // trança: em cada lado, `strands` senoides defasadas entre os trilhos (cantos ficam para o remate)
  const sides = [[mid + band, mid, w - mid - band, mid], [mid + band, h - mid, w - mid - band, h - mid], [mid, mid + band, mid, h - mid - band], [w - mid, mid + band, w - mid, h - mid - band]];
  for (const [x1, y1, x2, y2] of sides) {
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, N = Math.max(8, Math.round(L / 4));
    for (let s = 0; s < strands; s++) {
      const ph = s * TAU / strands;
      parts.push(`<path d="${pathOf(Array.from({ length: N + 1 }, (_, i) => { const t = i * L / N, o = amp * Math.sin(TAU * t / lam + ph); return [x1 + ux * t - uy * o, y1 + uy * t + ux * o]; }), false)}" ${SO}/>`);
    }
  }
  for (const [px, py] of [[mid, mid], [w - mid, mid], [w - mid, h - mid], [mid, h - mid]]) {
    if (corner === 'square') { parts.push(`<path d="${polyPath(px, py, band * 0.7, 4, Math.PI / 4)}" ${SO}/>`, `<path d="${polyPath(px, py, band * 0.7, 4, 0)}" ${SO}/>`); }
    else if (corner === 'spiral') parts.push(`<path d="${spiralPath(px, py, band * 0.75, 2, 1, 0)}" ${SO}/>`);
    else parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(band * 0.8)}" ${SO}/>`, `<circle cx="${f(px)}" cy="${f(py)}" r="${f(band * 0.55)}" ${SO}/>`);
    parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(band * 0.15)}" ${FG}/>`);
  }
  return parts.join('\n');
}

/**
 * Medalhão celta: contorno em fita, anel trançado e miolo. ESQUELETO (DEC-021): contorno
 * (círculo · lobado · polígono · oval alto · oval largo), escala e largura do anel; DETALHE: miolo (tríscele ·
 * triquetra · roseta entrelaçada). Symmetry = ondas da trança; Complexity = densidade.
 * @returns {string} elementos SVG
 */
export function genCelticMedallion(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const contour = pickOne(['circle', 'lobed', 'polygon', 'tall', 'wide'], rnd);
  const center = pickOne(['triskele', 'triquetra', 'rose'], rnd);
  const R = sz * 0.48 * pickOne([0.75, 0.9, 1.05, 1.15], rnd);
  const ringIn = pickOne([0.55, 0.65, 0.75], rnd);
  const lobes = pickOne([4, 6, 8], rnd);
  const rFn = contour === 'lobed' ? contourRadius('star', R, { k: lobes, amp: 0.18, rot: -Math.PI / 2 }) : contour === 'polygon' ? contourRadius('polygon', R, { k: lobes, rot: -Math.PI / 2 })
    : contour === 'tall' ? contourRadius('ellipse', R, { sx: 0.78, sy: 1.1 }) : contour === 'wide' ? contourRadius('ellipse', R, { sx: 1.1, sy: 0.74 }) : contourRadius('circle', R);
  for (const k of [1, 0.95]) parts.push(`<path d="${contourPath(cx, cy, rFn, k, 96)}" ${SO}/>`);
  // anel trançado: duas fitas senoidais em contrafase entre ringIn e 0,9 do contorno
  const kw = Math.round(6 + sym * 8), mid = (ringIn + 0.9) / 2, amp = (0.9 - ringIn) / 2 * 0.8;
  for (const ph of [0, Math.PI]) parts.push(`<path d="${pathOf(Array.from({ length: 180 }, (_, i) => { const a = -Math.PI / 2 + i * TAU / 180; return pt(cx, cy, rFn(a) * (mid + amp * Math.sin(kw * a + ph)), a); }), true)}" ${SO}/>`);
  parts.push(`<path d="${contourPath(cx, cy, rFn, ringIn, 96)}" ${SO}/>`);
  const r0 = R * ringIn * 0.92;
  if (center === 'triskele') parts.push(triskele(cx, cy, r0, 3, 1.5 + comp, -Math.PI / 2, SO, FG));
  else if (center === 'triquetra') parts.push(triquetra(cx, cy, r0, SO, false));
  else parts.push(roseKnot(cx, cy, r0 * 0.95, 5, 2, SO));
  return parts.join('\n');
}

/**
 * Cruz celta. ESQUELETO (DEC-021): proporção (braços iguais · cruz alta com base · latina),
 * remate dos braços (reto · alargado · bola) e tamanho do anel; DETALHE: nós no anel (o
 * original). Complexity = nós no anel.
 * @returns {string} elementos SVG
 */
export function genCelticCross(cx, cy, sz, comp, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const shape = pickOne(['equal', 'high', 'latin'], rnd);
  const ends = pickOne(['square', 'flared', 'round'], rnd);
  const ringK = pickOne([0.22, 0.3, 0.16], rnd);
  const arm = sz * 0.48, aw = sz * 0.16;
  const [up, side, down, lift] = shape === 'high' ? [0.7, 0.62, 1.15, 0.2] : shape === 'latin' ? [0.6, 0.55, 1.05, 0.22] : [1, 1, 1, 0];
  cy -= arm * lift; // cruz alta/latina: o centro sobe para a haste caber
  const rr = sz * ringK;
  // um braço como polígono: do centro até a ponta, com remate
  const armPath = (a, L) => {
    const ux = Math.cos(a), uy = Math.sin(a), vx = -uy, vy = ux, hw = aw / 2, tip = L * arm, wt = ends === 'flared' ? hw * 1.7 : hw;
    const P = (u, v) => `${f(cx + ux * u + vx * v)} ${f(cy + uy * u + vy * v)}`;
    return `M ${P(0, -hw)} L ${P(tip, -wt)} L ${P(tip, wt)} L ${P(0, hw)} Z`;
  };
  [[-Math.PI / 2, up], [0, side], [Math.PI / 2, down], [Math.PI, side]].forEach(([a, L]) => {
    parts.push(`<path d="${armPath(a, L)}" ${SO}/>`);
    if (ends === 'round') { const [ex, ey] = pt(cx, cy, L * arm, a); parts.push(`<circle cx="${f(ex)}" cy="${f(ey)}" r="${f(aw * 0.6)}" ${SO}/>`); }
  });
  if (shape === 'high') { const by = cy + down * arm; parts.push(`<rect x="${f(cx - aw * 1.4)}" y="${f(by)}" width="${f(aw * 2.8)}" height="${f(aw * 0.7)}" ${SO}/>`, `<rect x="${f(cx - aw * 2)}" y="${f(by + aw * 0.7)}" width="${f(aw * 4)}" height="${f(aw * 0.6)}" ${SO}/>`); }
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rr)}" ${SO}/>`);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rr * 0.82)}" ${SO}/>`);
  // Knotwork on ring
  const kn = 4 + Math.round(comp * 4);
  for (let i = 0; i < kn; i++) {
    const a = (i / kn) * TAU;
    const [kx, ky] = pt(cx, cy, rr * 0.91, a);
    parts.push(`<circle cx="${f(kx)}" cy="${f(ky)}" r="${f(sz * 0.03)}" ${FG}/>`);
  }
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.07)}" ${FG}/>`);
  return parts.join('\n');
}

/**
 * Espiral celta: uma, duas, três (tríscele) ou quatro espirais saindo do centro. ESQUELETO
 * (DEC-021): quantidade de braços, giro, escala e moldura (nenhuma · círculo · contorno lobado).
 * Complexity = voltas de cada espiral.
 * @returns {string} elementos SVG
 */
export function genCelticSpiral(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const arms = pickOne([1, 2, 3, 3, 4], rnd);
  const rot = pickOne([-Math.PI / 2, 0, Math.PI / 6], rnd);
  const R = sz * 0.48 * pickOne([0.82, 1, 1.12], rnd);
  const frame = pickOne(['none', 'circle', 'lobed'], rnd);
  const turns = 1.5 + comp * 2;
  const parts = [];
  if (arms === 1) parts.push(`<path d="${spiralPath(cx, cy, R * 0.9, turns + 1, 1, rot)}" ${SO}/>`, `<path d="${spiralPath(cx, cy, R * 0.78, turns + 0.8, 1, rot)}" ${SO}/>`);
  else parts.push(triskele(cx, cy, R, arms, turns, rot, SO, FG));
  if (frame === 'circle') parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R * 1.02)}" ${SO}/>`);
  else if (frame === 'lobed' && arms > 1) parts.push(`<path d="${contourPath(cx, cy, contourRadius('star', R * 1.05, { k: arms, amp: 0.3, rot }), 1, 96)}" ${SO}/>`);
  return parts.join('\n');
}
