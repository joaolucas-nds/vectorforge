// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild). F5 lote 3 (DEC-019): medalhão e
// moldura recebem ESCOLHAS semeadas (o desenho original de cada um continua sendo uma das
// variantes). A coroa (`genVicWreath`) já variava com o seed e não mudou. Flourish e cartouche
// do Vitoriano vêm de `baroque.js`, com `style = 'victorian'`.


import { TAU, f, pt, polyPath, starPath, pickOne } from '../core/utils.js';


/**
 * Arco recortado em gomos ao redor de um círculo, como um path só.
 * @returns {string} atributo d
 */
function scallopRing(cx, cy, r, k) {
  const p = Array.from({ length: k }, (_, i) => pt(cx, cy, r, (i / k) * TAU - Math.PI / 2));
  let d = `M ${f(p[0][0])} ${f(p[0][1])}`;
  for (let i = 1; i <= k; i++) { const q = p[i % k]; const ch = Math.hypot(q[0] - p[i - 1][0], q[1] - p[i - 1][1]); d += ` A ${f(ch * 0.6)} ${f(ch * 0.6)} 0 0 1 ${f(q[0])} ${f(q[1])}`; }
  return d + ' Z';
}

/**
 * Medalhão vitoriano: anéis concêntricos, bordadura e miolo. O seed escolhe o anel (círculo
 * com octógono · círculo recortado · círculo com contas), a bordadura (cachos · laçadas · flor
 * de três pétalas) e o miolo (estrela · roseta · quadrifólio). Symmetry = peças da bordadura;
 * Complexity = quantidade de anéis.
 * @returns {string} elementos SVG
 */
export function genVicMedallion(cx, cy, sz, layers, comp, sym, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const ringKind = pickOne(['octagon', 'scallop', 'beaded'], rnd);
  const borderKind = pickOne(['curls', 'loops', 'fleur'], rnd);
  const centerKind = pickOne(['star', 'rosette', 'quatrefoil'], rnd);
  const n = Math.round(8 + sym * 8);
  const rings = 2 + Math.round(comp * 3);
  for (let i = rings; i >= 1; i--) {
    const r = sz * 0.48 * i / rings;
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" ${SO}/>`);
    if (ringKind === 'scallop') parts.push(`<path d="${scallopRing(cx, cy, r * 0.9, 16)}" ${SO}/>`);
    else if (ringKind === 'beaded') for (let k = 0; k < 24; k++) { const [px, py] = pt(cx, cy, r * 0.9, k * TAU / 24); parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(sz * 0.008)}" ${FG}/>`); }
    else parts.push(`<path d="${polyPath(cx, cy, r * 0.9, 8, Math.PI / 8)}" ${SO}/>`);
  }
  const bR = sz * 0.48;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU - Math.PI / 2;
    if (borderKind === 'loops') {
      // laçada: argola fora do anel com uma conta dentro
      const [lx, ly] = pt(cx, cy, bR * 1.04, a);
      parts.push(`<circle cx="${f(lx)}" cy="${f(ly)}" r="${f(sz * 0.035)}" ${SO}/>`);
      parts.push(`<circle cx="${f(lx)}" cy="${f(ly)}" r="${f(sz * 0.012)}" ${FG}/>`);
      continue;
    }
    if (borderKind === 'fleur') {
      // flor de três pétalas: pétala central cheia apontando para fora e duas laterais em curva
      const [bx, by] = pt(cx, cy, bR * 0.96, a), [tx, ty] = pt(cx, cy, bR * 1.14, a);
      const [l1x, l1y] = pt(cx, cy, bR * 1.05, a - 0.09), [l2x, l2y] = pt(cx, cy, bR * 1.05, a + 0.09);
      const [s1x, s1y] = pt(cx, cy, bR * 1.08, a - 0.16), [s2x, s2y] = pt(cx, cy, bR * 1.08, a + 0.16);
      parts.push(`<path d="M ${f(bx)} ${f(by)} Q ${f(l1x)} ${f(l1y)} ${f(tx)} ${f(ty)} Q ${f(l2x)} ${f(l2y)} ${f(bx)} ${f(by)} Z" ${FG}/>`);
      parts.push(`<path d="M ${f(bx)} ${f(by)} Q ${f(l1x)} ${f(l1y)} ${f(s1x)} ${f(s1y)} M ${f(bx)} ${f(by)} Q ${f(l2x)} ${f(l2y)} ${f(s2x)} ${f(s2y)}" ${SO}/>`);
      continue;
    }
    const [bx2, by2] = pt(cx, cy, bR * 0.88, a);
    const [ex2, ey2] = pt(cx, cy, bR * 1.08, a + TAU / (n * 2));
    const cpx = (bx2 + ex2) / 2 + Math.cos(a + Math.PI / 2) * sz * 0.12;
    const cpy = (by2 + ey2) / 2 + Math.sin(a + Math.PI / 2) * sz * 0.12;
    parts.push(`<path d="M ${f(bx2)} ${f(by2)} Q ${f(cpx)} ${f(cpy)} ${f(ex2)} ${f(ey2)}" ${SO}/>`);
    parts.push(`<circle cx="${f(ex2)}" cy="${f(ey2)}" r="3.5" ${SO}/>`);
    parts.push(`<circle cx="${f(ex2)}" cy="${f(ey2)}" r="1.4" ${FG}/>`);
  }
  if (centerKind === 'rosette') {
    for (let k = 0; k < 8; k++) { const [px, py] = pt(cx, cy, sz * 0.075, k * TAU / 8); parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(sz * 0.03)}" ${SO}/>`); }
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.045)}" ${FG}/>`);
  } else if (centerKind === 'quatrefoil') {
    for (let k = 0; k < 4; k++) { const [px, py] = pt(cx, cy, sz * 0.05, k * TAU / 4); parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(sz * 0.05)}" ${SO}/>`); }
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.025)}" ${FG}/>`);
  } else parts.push(`<path d="${starPath(cx, cy, sz * 0.1, sz * 0.04, 8)}" ${FG}/>`);
  return parts.join('\n');
}

/**
 * Moldura vitoriana. O seed escolhe o canto (roseta · quadrifólio · leque), o motivo das bordas
 * de cima e de baixo (arabesco · contas · festões) e os filetes (três · dois · um).
 * Complexity = tamanho dos motivos.
 * @returns {string} elementos SVG
 */
export function genVicFrame(x, y, w, h, comp, rnd, SO, FG, sw) {
  const parts = [];
  const cornerKind = pickOne(['rosette', 'quatrefoil', 'fan'], rnd);
  const edgeKind = pickOne(['flourish', 'beads', 'scallops'], rnd);
  const lineKind = pickOne(['triple', 'double', 'single'], rnd);
  const m = 12;
  const lines = lineKind === 'triple' ? [m, m + 4, m + 10] : lineKind === 'double' ? [m, m + 6] : [m];
  for (const d of lines) {
    parts.push(`<rect x="${d}" y="${d}" width="${w - 2 * d}" height="${h - 2 * d}" ${SO}/>`);
  }
  const cR = Math.min(w, h) * 0.08;
  for (const [bx, by] of [[m, m], [w - m, m], [w - m, h - m], [m, h - m]]) {
    if (cornerKind === 'quatrefoil') {
      for (let k = 0; k < 4; k++) { const [px, py] = pt(bx, by, cR * 0.45, k * TAU / 4 + Math.PI / 4); parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(cR * 0.45)}" ${SO}/>`); }
      parts.push(`<circle cx="${bx}" cy="${by}" r="${f(cR * 0.18)}" ${FG}/>`);
    } else if (cornerKind === 'fan') {
      // leque de arcos concêntricos voltado para dentro da moldura
      const dx = bx < w / 2 ? 1 : -1, dy = by < h / 2 ? 1 : -1;
      for (const k of [1, 0.72, 0.44]) parts.push(`<path d="M ${f(bx + dx * cR * k)} ${by} A ${f(cR * k)} ${f(cR * k)} 0 0 ${dx * dy > 0 ? 1 : 0} ${bx} ${f(by + dy * cR * k)}" ${SO}/>`);
      parts.push(`<circle cx="${bx}" cy="${by}" r="${f(cR * 0.16)}" ${FG}/>`);
    } else {
      parts.push(`<circle cx="${bx}" cy="${by}" r="${f(cR)}" ${SO}/>`);
      parts.push(`<path d="${polyPath(bx, by, cR * 0.72, 8, Math.PI / 8)}" ${SO}/>`);
      parts.push(`<path d="${starPath(bx, by, cR * 0.52, cR * 0.2, 8)}" ${SO}/>`);
      parts.push(`<circle cx="${bx}" cy="${by}" r="${f(cR * 0.14)}" ${FG}/>`);
    }
  }
  // Flourishes on edges
  const fw = 24 + comp * 12, fh = 15 + comp * 7;
  const nF = Math.max(2, Math.floor((w - 2 * (m + cR * 2 + 10)) / (fw + 12)));
  const fsx = (w - nF * (fw + 12) + 12) / 2;
  for (let i = 0; i < nF; i++) {
    const fcx = fsx + i * (fw + 12) + fw / 2;
    for (const [fy, fdir] of [[m + 3, -1], [h - m - 3, 1]]) {
      if (edgeKind === 'beads') {
        // contas para dentro da moldura (o arabesco original vai para fora)
        parts.push(`<circle cx="${f(fcx)}" cy="${f(fy - fdir * fh * 0.6)}" r="${f(2.5 + comp)}" ${SO}/>`);
        parts.push(`<circle cx="${f(fcx)}" cy="${f(fy - fdir * fh * 0.6)}" r="${f(1 + comp * 0.5)}" ${FG}/>`);
        continue;
      }
      if (edgeKind === 'scallops') {
        parts.push(`<path d="M ${f(fcx - fw / 2)} ${f(fy - fdir * 4)} A ${f(fw / 2)} ${f(fh * 0.7)} 0 0 ${fdir > 0 ? 1 : 0} ${f(fcx + fw / 2)} ${f(fy - fdir * 4)}" ${SO}/>`);
        continue;
      }
      parts.push(`<path d="M ${f(fcx)} ${fy} C ${f(fcx + fw * 0.14)} ${f(fy + fdir * fh * 0.5)} ${f(fcx + fw * 0.42)} ${f(fy + fdir * fh * 0.28)} ${f(fcx + fw * 0.28)} ${f(fy + fdir * fh)}" ${SO}/>`);
      parts.push(`<path d="M ${f(fcx)} ${fy} C ${f(fcx - fw * 0.14)} ${f(fy + fdir * fh * 0.5)} ${f(fcx - fw * 0.42)} ${f(fy + fdir * fh * 0.28)} ${f(fcx - fw * 0.28)} ${f(fy + fdir * fh)}" ${SO}/>`);
      parts.push(`<circle cx="${f(fcx)}" cy="${fy}" r="2" ${FG}/>`);
    }
  }
  return parts.join('\n');
}

export function genVicWreath(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const n = Math.round(12 + comp * 16);
  const r = sz * 0.42;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU - Math.PI / 2;
    const [lx, ly] = pt(cx, cy, r, a);
    const rot = a + Math.PI / 4;
    const llen = sz * 0.1 + rnd() * sz * 0.05;
    const [ex, ey] = [lx + Math.cos(rot) * llen, ly + Math.sin(rot) * llen];
    const cp1x = lx + Math.cos(rot - 0.4) * llen * 0.5;
    const cp1y = ly + Math.sin(rot - 0.4) * llen * 0.5;
    parts.push(`<path d="M ${f(lx)} ${f(ly)} Q ${f(cp1x)} ${f(cp1y)} ${f(ex)} ${f(ey)}" ${SO}/>`);
    if (rnd() > 0.55) parts.push(`<circle cx="${f(ex)}" cy="${f(ey)}" r="${f(sz * 0.018)}" ${FG}/>`);
  }
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r * 0.85)}" ${SO}/>`);
  parts.push(`<path d="${starPath(cx, cy, sz * 0.12, sz * 0.05, 8)}" ${FG}/>`);
  return parts.join('\n');
}
