// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.


import { TAU, f, pt, polyPath, starPath } from '../core/utils.js';


export function genIslamicStar(cx, cy, sz, n, comp, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const layers = 2 + Math.round(comp * 3);
  for (let l = layers; l >= 0; l--) {
    const r1 = sz * 0.48 * (l + 1) / (layers + 1);
    const r2 = r1 * (0.28 + comp * 0.15);
    parts.push(`<path d="${starPath(cx, cy, r1, r2, n)}" ${l % 2 === 0 ? SO : FG}/>`);
    // Inner polygon
    parts.push(`<path d="${polyPath(cx, cy, r2 * 0.9, n)}" ${SO}/>`);
  }
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.04)}" ${FG}/>`);
  return parts.join('\n');
}

export function genArabesque(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const parts = [];
  const n = Math.round(4 + sym * 4);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU;
    const [bx, by] = pt(cx, cy, sz * 0.1, a);
    const [ex, ey] = pt(cx, cy, sz * 0.45, a);
    const [c1x, c1y] = pt(cx, cy, sz * 0.25, a + Math.PI / (n * 0.8));
    const [c2x, c2y] = pt(cx, cy, sz * 0.35, a - Math.PI / (n * 0.8));
    parts.push(`<path d="M ${f(bx)} ${f(by)} C ${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(ex)} ${f(ey)}" ${SO}/>`);
    parts.push(`<circle cx="${f(ex)}" cy="${f(ey)}" r="${f(sz * 0.03)}" ${FG}/>`);
    if (comp > 0.5) {
      const [m1x, m1y] = pt(cx, cy, sz * 0.3, a);
      const [sm1x, sm1y] = pt(m1x, m1y, sz * 0.1, a + Math.PI / 2);
      const [sm2x, sm2y] = pt(m1x, m1y, sz * 0.1, a - Math.PI / 2);
      parts.push(`<path d="M ${f(sm1x)} ${f(sm1y)} Q ${f(m1x + Math.cos(a) * sz * 0.06)} ${f(m1y + Math.sin(a) * sz * 0.06)} ${f(sm2x)} ${f(sm2y)}" ${SO}/>`);
    }
  }
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.08)}" ${SO}/>`);
  return parts.join('\n');
}
