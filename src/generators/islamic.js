// Estilo Islâmico. F5 lote 4 (DEC-021): os tipos nascem com ESQUELETO semeado (contorno,
// escala, arranjo) e escolhas de detalhe por cima. Até v0.9.0, border emprestava a moldura Art
// Deco e medallion era a mesma estrela do tipo star; agora têm gerador islâmico (faixa com
// estrelas, merlões ou entrelaçado; shamsa com pingentes). girih e pattern vêm de `genPattern`.
// `genIslamicStar` e `genArabesque` mantêm o desenho original como uma das variantes.


import { TAU, f, pt, polyPath, starPath, pickOne, polygramPath, contourRadius, contourPath } from '../core/utils.js';


/** Path de uma lista de pontos (fechado ou não). */
const pathOf = (pts, close) => 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + (close ? ' Z' : '');

/** Contorno recortado em gomos (arcos) ao redor de r(a), como um path só. */
function scallop(cx, cy, rFn, k) {
  const p = Array.from({ length: k }, (_, i) => { const a = (i / k) * TAU - Math.PI / 2; return pt(cx, cy, rFn(a), a); });
  let d = `M ${f(p[0][0])} ${f(p[0][1])}`;
  for (let i = 1; i <= k; i++) { const q = p[i % k]; const ch = Math.hypot(q[0] - p[i - 1][0], q[1] - p[i - 1][1]); d += ` A ${f(ch * 0.6)} ${f(ch * 0.6)} 0 0 1 ${f(q[0])} ${f(q[1])}`; }
  return d + ' Z';
}

/**
 * Estrela islâmica. ESQUELETO (DEC-021): escala e moldura (nenhuma · círculo · octógono ·
 * quadrado em pé); DETALHE: rosácea em camadas (o original) · fita entrelaçada {n/k} · estrela
 * enquadrada com raios até os vértices · khatam ({n/2} com polígono). Symmetry = pontas (n);
 * Complexity = camadas e profundidade.
 * @returns {string} elementos SVG
 */
export function genIslamicStar(cx, cy, sz, n, comp, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const kind = pickOne(['rosette', 'strap', 'framed', 'khatam'], rnd);
  const frame = pickOne(['none', 'circle', 'octagon', 'square'], rnd);
  const S = sz * pickOne([0.82, 1, 1.12], rnd);
  const R = S * 0.48, k = n >= 7 ? pickOne([2, 3], rnd) : 2;
  if (kind === 'strap' && n >= 5) {
    for (const s of [1, 0.88]) parts.push(`<path d="${polygramPath(cx, cy, R * s, n, k)}" ${SO}/>`);
    parts.push(`<path d="${polyPath(cx, cy, R * 0.35, n)}" ${FG}/>`);
  } else if (kind === 'framed') {
    parts.push(`<path d="${polyPath(cx, cy, R, n)}" ${SO}/>`);
    parts.push(`<path d="${starPath(cx, cy, R * 0.7, R * 0.32, n)}" ${SO}/>`);
    let d = ''; for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i * TAU / n, [x1, y1] = pt(cx, cy, R * 0.7, a), [x2, y2] = pt(cx, cy, R, a); d += `M ${f(x1)} ${f(y1)} L ${f(x2)} ${f(y2)} `; }
    parts.push(`<path d="${d.trim()}" ${SO}/>`, `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R * 0.12)}" ${FG}/>`);
  } else if (kind === 'khatam' && n >= 5) {
    parts.push(`<path d="${polygramPath(cx, cy, R, n, 2)}" ${SO}/>`);
    parts.push(`<path d="${polyPath(cx, cy, R * Math.cos(TAU / n), n, -Math.PI / 2 + Math.PI / n)}" ${SO}/>`);
    parts.push(`<path d="${starPath(cx, cy, R * 0.4, R * 0.2, n)}" ${FG}/>`);
  } else {
    // rosácea em camadas — o desenho original, na escala sorteada
    const layers = 2 + Math.round(comp * 3);
    for (let l = layers; l >= 0; l--) {
      const r1 = R * (l + 1) / (layers + 1);
      const r2 = r1 * (0.28 + comp * 0.15);
      parts.push(`<path d="${starPath(cx, cy, r1, r2, n)}" ${l % 2 === 0 ? SO : FG}/>`);
      parts.push(`<path d="${polyPath(cx, cy, r2 * 0.9, n)}" ${SO}/>`);
    }
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(S * 0.04)}" ${FG}/>`);
  }
  if (frame === 'circle') parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R * 1.08)}" ${SO}/>`);
  else if (frame === 'octagon') parts.push(`<path d="${polyPath(cx, cy, R * 1.12, 8, Math.PI / 8)}" ${SO}/>`);
  else if (frame === 'square') parts.push(`<path d="${polyPath(cx, cy, R * 1.25, 4, -Math.PI / 2)}" ${SO}/>`);
  return parts.join('\n');
}

/**
 * Arabesco. ESQUELETO (DEC-021): arranjo (radial, o original · palmeta espelhada no eixo
 * vertical · faixa horizontal de volutas) e escala; DETALHE: folha no fim de cada voluta (conta
 * · folha · nenhuma). Symmetry = braços; Complexity = ramos secundários.
 * @returns {string} elementos SVG
 */
export function genArabesque(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const parts = [];
  const layout = pickOne(['radial', 'palmette', 'band'], rnd);
  const tipKind = pickOne(['dot', 'leaf', 'none'], rnd);
  const S = sz * pickOne([0.85, 1, 1.1], rnd);
  const n = Math.round(4 + sym * 4);
  /** Remate de voluta em (x, y), apontando para o ângulo a. */
  const tip = (x, y, a) => {
    if (tipKind === 'dot') return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(S * 0.03)}" ${FG}/>`;
    if (tipKind === 'leaf') { const [tx, ty] = pt(x, y, S * 0.09, a), [l1x, l1y] = pt(x, y, S * 0.05, a - 0.6), [l2x, l2y] = pt(x, y, S * 0.05, a + 0.6); return `<path d="M ${f(x)} ${f(y)} Q ${f(l1x)} ${f(l1y)} ${f(tx)} ${f(ty)} Q ${f(l2x)} ${f(l2y)} ${f(x)} ${f(y)} Z" ${FG}/>`; }
    return '';
  };
  if (layout === 'palmette') {
    // palmeta: haste vertical; pares de volutas espelhados; leque de folhas no topo
    const y0 = cy + S * 0.45, y1 = cy - S * 0.3, k = 2 + Math.round(comp * 3);
    parts.push(`<line x1="${f(cx)}" y1="${f(y0)}" x2="${f(cx)}" y2="${f(y1)}" ${SO}/>`);
    for (let i = 0; i < k; i++) {
      const by = y0 - (y0 - y1) * (i + 0.5) / k, L = S * (0.36 - i * 0.05);
      for (const dir of [-1, 1]) {
        const ex = cx + dir * L, ey = by - L * 0.35;
        parts.push(`<path d="M ${f(cx)} ${f(by)} C ${f(cx + dir * L * 0.4)} ${f(by + L * 0.3)} ${f(cx + dir * L * 0.9)} ${f(by + L * 0.1)} ${f(ex)} ${f(ey)}" ${SO}/>`);
        const t = tip(ex, ey, dir > 0 ? -0.6 : Math.PI + 0.6); if (t) parts.push(t);
      }
    }
    for (let j = 0; j < n; j++) { const a = -Math.PI / 2 + (j - (n - 1) / 2) * 0.32, [ex, ey] = pt(cx, y1, S * 0.2, a); parts.push(`<path d="M ${f(cx)} ${f(y1)} Q ${f((cx + ex) / 2 + Math.cos(a + 1) * 6)} ${f((y1 + ey) / 2 + Math.sin(a + 1) * 6)} ${f(ex)} ${f(ey)}" ${SO}/>`); }
    return parts.join('\n');
  }
  if (layout === 'band') {
    // faixa: volutas alternadas (para cima, para baixo) ao longo de uma onda horizontal
    const L = S * 1.05, k = n + 1, amp = S * 0.12;
    parts.push(`<path d="${pathOf(Array.from({ length: 81 }, (_, i) => { const u = -L + i * 2 * L / 80; return [cx + u, cy + amp * Math.sin(Math.PI * k * (u + L) / (2 * L))]; }), false)}" ${SO}/>`);
    for (let i = 0; i < k; i++) {
      const u = -L + (i + 0.5) * 2 * L / k, dir = i % 2 ? 1 : -1, bx = cx + u, by = cy + dir * amp, ex = bx + S * 0.12, ey = by + dir * S * 0.2;
      parts.push(`<path d="M ${f(bx)} ${f(by)} C ${f(bx - S * 0.1)} ${f(by + dir * S * 0.12)} ${f(bx + S * 0.18)} ${f(by + dir * S * 0.24)} ${f(ex)} ${f(ey)}" ${SO}/>`);
      const t = tip(ex, ey, dir > 0 ? Math.PI / 2 : -Math.PI / 2); if (t) parts.push(t);
    }
    return parts.join('\n');
  }
  // radial — o desenho original, na escala sorteada
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU;
    const [bx, by] = pt(cx, cy, S * 0.1, a);
    const [ex, ey] = pt(cx, cy, S * 0.45, a);
    const [c1x, c1y] = pt(cx, cy, S * 0.25, a + Math.PI / (n * 0.8));
    const [c2x, c2y] = pt(cx, cy, S * 0.35, a - Math.PI / (n * 0.8));
    parts.push(`<path d="M ${f(bx)} ${f(by)} C ${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(ex)} ${f(ey)}" ${SO}/>`);
    const t = tip(ex, ey, a); if (t) parts.push(t);
    if (comp > 0.5) {
      const [m1x, m1y] = pt(cx, cy, S * 0.3, a);
      const [sm1x, sm1y] = pt(m1x, m1y, S * 0.1, a + Math.PI / 2);
      const [sm2x, sm2y] = pt(m1x, m1y, S * 0.1, a - Math.PI / 2);
      parts.push(`<path d="M ${f(sm1x)} ${f(sm1y)} Q ${f(m1x + Math.cos(a) * S * 0.06)} ${f(m1y + Math.sin(a) * S * 0.06)} ${f(sm2x)} ${f(sm2y)}" ${SO}/>`);
    }
  }
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(S * 0.08)}" ${SO}/>`);
  return parts.join('\n');
}

/**
 * Borda islâmica: faixa entre dois trilhos com um motivo repetido. ESQUELETO (DEC-021): margem e
 * largura da faixa; DETALHE: motivo (estrelas de 8 pontas · corrente de losangos · merlões ·
 * entrelaçado em ziguezague) e estrela octogonal nos cantos. Complexity = largura da faixa.
 * @returns {string} elementos SVG
 */
export function genIslamicBorder(x, y, w, h, comp, sym, rnd, SO, FG, sw) {
  const parts = [];
  const m = pickOne([8, 18, 32], rnd);
  const band = pickOne([12, 18, 26], rnd) + comp * 6;
  const motif = pickOne(['star8', 'lozenge', 'merlon', 'interlace'], rnd);
  const rect = d => `<rect x="${f(d)}" y="${f(d)}" width="${f(w - 2 * d)}" height="${f(h - 2 * d)}" ${SO}/>`;
  parts.push(rect(m), rect(m + band));
  const mid = m + band / 2, step = band * 1.3, hb = band * 0.42;
  const sides = [[mid + band, mid, w - mid - band, mid, 1], [mid + band, h - mid, w - mid - band, h - mid, -1], [mid, mid + band, mid, h - mid - band, -1], [w - mid, mid + band, w - mid, h - mid - band, 1]];
  for (const [x1, y1, x2, y2, inw] of sides) {
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, vx = -uy * inw, vy = ux * inw, k = Math.max(2, Math.floor(L / step));
    const P = (t, o) => [x1 + ux * t + vx * o, y1 + uy * t + vy * o];
    if (motif === 'interlace') {
      // duas linhas em ziguezague, em contrafase, cruzando no meio da faixa
      for (const s of [1, -1]) parts.push(`<path d="${pathOf(Array.from({ length: 2 * k + 1 }, (_, i) => P(i * L / (2 * k), (i % 2 ? s : -s) * hb)), false)}" ${SO}/>`);
      continue;
    }
    if (motif === 'merlon') {
      // ameias: degrau sobe e desce ao longo do trilho interno
      const pts = []; for (let i = 0; i < k; i++) { const t0 = i * L / k, t1 = t0 + L / k * 0.25, t2 = t0 + L / k * 0.75; pts.push(P(t0, -hb), P(t1, -hb), P(t1, hb * 0.6), P(t2, hb * 0.6), P(t2, -hb)); }
      pts.push(P(L, -hb)); parts.push(`<path d="${pathOf(pts, false)}" ${SO}/>`);
      continue;
    }
    for (let i = 0; i < k; i++) {
      const [px, py] = P((i + 0.5) * L / k, 0);
      if (motif === 'lozenge') parts.push(`<path d="${pathOf([P((i) * L / k, 0), P((i + 0.5) * L / k, -hb), P((i + 1) * L / k, 0), P((i + 0.5) * L / k, hb)], true)}" ${SO}/>`, `<circle cx="${f(px)}" cy="${f(py)}" r="${f(hb * 0.25)}" ${FG}/>`);
      else parts.push(`<path d="${polygramPath(px, py, hb, 8, 3)}" ${SO}/>`);
    }
  }
  for (const [px, py] of [[mid, mid], [w - mid, mid], [w - mid, h - mid], [mid, h - mid]]) {
    parts.push(`<path d="${polygramPath(px, py, band * 0.75, 8, 2)}" ${SO}/>`, `<circle cx="${f(px)}" cy="${f(py)}" r="${f(band * 0.18)}" ${FG}/>`);
  }
  return parts.join('\n');
}

/**
 * Medalhão islâmico (shamsa): estrela central, anel de pétalas e contorno, com pingentes.
 * ESQUELETO (DEC-021): contorno (círculo · recortado · mandorla · lobado), pingentes (nenhum ·
 * em cima e embaixo · nos quatro lados) e escala; DETALHE: pétalas cheias ou vazadas.
 * Symmetry = pétalas; Complexity = camadas da estrela central.
 * @returns {string} elementos SVG
 */
export function genIslamicMedallion(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const contour = pickOne(['circle', 'scalloped', 'mandorla', 'lobed'], rnd);
  const pendants = pickOne(['none', 'vertical', 'four'], rnd);
  const filled = rnd() < 0.5;
  const S = sz * (pendants === 'none' ? pickOne([0.9, 1, 1.1], rnd) : pickOne([0.72, 0.8], rnd));
  const R = S * 0.48, k = Math.round(12 + sym * 12);
  const rFn = contour === 'mandorla' ? contourRadius('ellipse', R, { sx: 0.72, sy: 1.08 }) : contour === 'lobed' ? contourRadius('star', R, { k: 8, amp: 0.16, rot: -Math.PI / 2 }) : contourRadius('circle', R);
  if (contour === 'scalloped') parts.push(`<path d="${scallop(cx, cy, rFn, 24)}" ${SO}/>`);
  else parts.push(`<path d="${contourPath(cx, cy, rFn, 1, 96)}" ${SO}/>`);
  parts.push(`<path d="${contourPath(cx, cy, rFn, 0.9, 96)}" ${SO}/>`);
  // anel de pétalas entre 0,55 e 0,85 do contorno
  for (let i = 0; i < k; i++) {
    const a = -Math.PI / 2 + i * TAU / k, [bx, by] = pt(cx, cy, rFn(a) * 0.55, a), [tx, ty] = pt(cx, cy, rFn(a) * 0.85, a);
    const [l1x, l1y] = pt(cx, cy, rFn(a) * 0.72, a - Math.PI / k * 0.8), [l2x, l2y] = pt(cx, cy, rFn(a) * 0.72, a + Math.PI / k * 0.8);
    parts.push(`<path d="M ${f(bx)} ${f(by)} Q ${f(l1x)} ${f(l1y)} ${f(tx)} ${f(ty)} Q ${f(l2x)} ${f(l2y)} ${f(bx)} ${f(by)} Z" ${filled ? FG : SO}/>`);
  }
  // estrela central em camadas
  const layers = 1 + Math.round(comp * 2);
  for (let l = layers; l >= 0; l--) { const r1 = R * 0.5 * (l + 1) / (layers + 1); parts.push(`<path d="${starPath(cx, cy, r1, r1 * 0.45, 12)}" ${l % 2 ? FG : SO}/>`); }
  // pingentes (as pontas do shamsa): gota + losango + conta, para fora do contorno
  const dirs = pendants === 'vertical' ? [-Math.PI / 2, Math.PI / 2] : pendants === 'four' ? [-Math.PI / 2, 0, Math.PI / 2, Math.PI] : [];
  for (const a of dirs) {
    const r0 = rFn(a), [bx, by] = pt(cx, cy, r0, a), [tx, ty] = pt(cx, cy, r0 + R * 0.45, a), [mx, my] = pt(cx, cy, r0 + R * 0.22, a);
    const [s1x, s1y] = pt(mx, my, R * 0.12, a + Math.PI / 2), [s2x, s2y] = pt(mx, my, R * 0.12, a - Math.PI / 2);
    parts.push(`<path d="M ${f(bx)} ${f(by)} Q ${f(s1x)} ${f(s1y)} ${f(tx)} ${f(ty)} Q ${f(s2x)} ${f(s2y)} ${f(bx)} ${f(by)} Z" ${SO}/>`);
    const [dx, dy] = pt(cx, cy, r0 + R * 0.55, a); parts.push(`<circle cx="${f(dx)}" cy="${f(dy)}" r="${f(R * 0.05)}" ${FG}/>`);
  }
  return parts.join('\n');
}
