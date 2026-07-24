// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.


import { TAU, f, pt, polyPath, starPath } from '../core/utils.js';


export function genVicMedallion(cx, cy, sz, layers, comp, sym, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const n = Math.round(8 + sym * 8);
  const rings = 2 + Math.round(comp * 3);
  for (let i = rings; i >= 1; i--) {
    const r = sz * 0.48 * i / rings;
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" ${SO}/>`);
    parts.push(`<path d="${polyPath(cx, cy, r * 0.9, 8, Math.PI / 8)}" ${SO}/>`);
  }
  const bR = sz * 0.48;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU - Math.PI / 2;
    const [bx2, by2] = pt(cx, cy, bR * 0.88, a);
    const [ex2, ey2] = pt(cx, cy, bR * 1.08, a + TAU / (n * 2));
    const cpx = (bx2 + ex2) / 2 + Math.cos(a + Math.PI / 2) * sz * 0.12;
    const cpy = (by2 + ey2) / 2 + Math.sin(a + Math.PI / 2) * sz * 0.12;
    parts.push(`<path d="M ${f(bx2)} ${f(by2)} Q ${f(cpx)} ${f(cpy)} ${f(ex2)} ${f(ey2)}" ${SO}/>`);
    parts.push(`<circle cx="${f(ex2)}" cy="${f(ey2)}" r="3.5" ${SO}/>`);
    parts.push(`<circle cx="${f(ex2)}" cy="${f(ey2)}" r="1.4" ${FG}/>`);
  }
  parts.push(`<path d="${starPath(cx, cy, sz * 0.1, sz * 0.04, 8)}" ${FG}/>`);
  return parts.join('\n');
}

export function genVicFrame(x, y, w, h, comp, rnd, SO, FG, sw) {
  const parts = [];
  const m = 12;
  for (const d of [m, m + 4, m + 10]) {
    parts.push(`<rect x="${d}" y="${d}" width="${w - 2 * d}" height="${h - 2 * d}" ${SO}/>`);
  }
  const cR = Math.min(w, h) * 0.08;
  for (const [bx, by] of [[m, m], [w - m, m], [w - m, h - m], [m, h - m]]) {
    parts.push(`<circle cx="${bx}" cy="${by}" r="${f(cR)}" ${SO}/>`);
    parts.push(`<path d="${polyPath(bx, by, cR * 0.72, 8, Math.PI / 8)}" ${SO}/>`);
    parts.push(`<path d="${starPath(bx, by, cR * 0.52, cR * 0.2, 8)}" ${SO}/>`);
    parts.push(`<circle cx="${bx}" cy="${by}" r="${f(cR * 0.14)}" ${FG}/>`);
  }
  // Flourishes on edges
  const fw = 24 + comp * 12, fh = 15 + comp * 7;
  const nF = Math.max(2, Math.floor((w - 2 * (m + cR * 2 + 10)) / (fw + 12)));
  const fsx = (w - nF * (fw + 12) + 12) / 2;
  for (let i = 0; i < nF; i++) {
    const fcx = fsx + i * (fw + 12) + fw / 2;
    for (const [fy, fdir] of [[m + 3, -1], [h - m - 3, 1]]) {
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
