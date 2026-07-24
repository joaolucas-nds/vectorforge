// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.


import { TAU, f, pt } from '../core/utils.js';


export function genCelticKnot(cx, cy, sz, n, comp, rnd, SO, FG, sw) {
  const parts = [];
  const r = sz * 0.42;
  const n2 = Math.round(n * 0.5 + comp * 6) * 2;
  const pts = Array.from({ length: n2 }, (_, i) => {
    const a = (i / n2) * TAU;
    const rr = i % 2 === 0 ? r : r * (0.6 + comp * 0.2);
    return pt(cx, cy, rr, a);
  });

  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1], curr = pts[i];
    const cpx = cx + (curr[0] - cx) * 0.5, cpy = cy + (curr[1] - cy) * 0.5;
    d += ` Q ${f(cpx)} ${f(cpy)} ${f(curr[0])} ${f(curr[1])}`;
  }
  d += ' Z';
  parts.push(`<path d="${d}" ${SO}/>`);

  // Inner ring
  const innerPts = pts.map(([x, y]) => [cx + (x - cx) * 0.55, cy + (y - cy) * 0.55]);
  let d2 = `M ${f(innerPts[0][0])} ${f(innerPts[0][1])}`;
  for (let i = 1; i < innerPts.length; i++) {
    d2 += ` L ${f(innerPts[i][0])} ${f(innerPts[i][1])}`;
  }
  d2 += ' Z';
  parts.push(`<path d="${d2}" ${SO}/>`);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.06)}" ${FG}/>`);
  return parts.join('\n');
}

export function genCelticCross(cx, cy, sz, comp, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const arm = sz * 0.48, aw = sz * 0.16;
  const rr = sz * 0.22;
  // Cross arms
  parts.push(`<rect x="${f(cx - aw / 2)}" y="${f(cy - arm)}" width="${f(aw)}" height="${f(arm * 2)}" ${SO}/>`);
  parts.push(`<rect x="${f(cx - arm)}" y="${f(cy - aw / 2)}" width="${f(arm * 2)}" height="${f(aw)}" ${SO}/>`);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rr)}" ${SO}/>`);
  // Knotwork on ring
  const kn = 4 + Math.round(comp * 4);
  for (let i = 0; i < kn; i++) {
    const a = (i / kn) * TAU;
    const [kx, ky] = pt(cx, cy, rr, a);
    parts.push(`<circle cx="${f(kx)}" cy="${f(ky)}" r="${f(sz * 0.03)}" ${FG}/>`);
  }
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.07)}" ${FG}/>`);
  return parts.join('\n');
}
