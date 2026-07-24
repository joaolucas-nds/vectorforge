// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.


import { TAU, f, pt, polyPath, starPath } from '../core/utils.js';
import { state, PALETTES } from '../core/state.js';


export function genMandala(cx, cy, sz, n, layers, comp, rnd, SO, FG, FG2, sw) {
  const parts = [];
  for (let l = 0; l < layers; l++) {
    const t = (l + 1) / (layers + 1);
    const r = sz * 0.48 * t;
    const prevR = l === 0 ? sz * 0.015 : sz * 0.48 * l / (layers + 1);

    // Petal ring
    for (let i = 0; i < n; i++) {
      const a1 = (i / n) * TAU - Math.PI / 2;
      const a2 = ((i + 1) / n) * TAU - Math.PI / 2;
      const aM = (a1 + a2) / 2;
      const [tx, ty] = pt(cx, cy, r, aM);
      const [b1x, b1y] = pt(cx, cy, prevR, a1);
      const [b2x, b2y] = pt(cx, cy, prevR, a2);
      const d = l % 2 === 0 ? SO : FG;
      parts.push(`<path d="M ${f(b1x)} ${f(b1y)} Q ${f(tx)} ${f(ty)} ${f(b2x)} ${f(b2y)} Q ${f(cx + (b2x - cx) * 0.1)} ${f(cy + (b2y - cy) * 0.1)} ${f(b1x)} ${f(b1y)}" ${d}/>`);
    }
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" ${SO}/>`);
  }
  const sR = sz * 0.055, sR2 = sz * 0.022;
  parts.push(`<path d="${starPath(cx, cy, sR, sR2, n)}" ${FG}/>`);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.016)}" fill="${PALETTES[state.pal].bg}"/>`);
  return parts.join('\n');
}

export function genGeoFrame(x, y, w, h, comp, sym, rnd, SO, FG, sw) {
  const parts = [];
  const m = 14;
  parts.push(`<rect x="${m}" y="${m}" width="${w - 2 * m}" height="${h - 2 * m}" ${SO}/>`);
  const n = Math.round(4 + sym * 4);
  const cR = Math.min(w, h) * 0.09;
  for (const [bx, by] of [[m, m], [w - m, m], [w - m, h - m], [m, h - m]]) {
    parts.push(`<circle cx="${bx}" cy="${by}" r="${f(cR)}" ${SO}/>`);
    parts.push(`<path d="${starPath(bx, by, cR * 0.72, cR * 0.3, n)}" ${SO}/>`);
    parts.push(`<circle cx="${bx}" cy="${by}" r="${f(cR * 0.16)}" ${FG}/>`);
  }
  const unit = cR * 1.7;
  const useW = w - 2 * m - 2 * cR * 1.2;
  const nP = Math.max(2, Math.floor(useW / unit));
  const pSx = (w - nP * unit) / 2;
  for (let i = 0; i < nP; i++) {
    const px = pSx + (i + 0.5) * unit;
    for (const py of [m, h - m]) parts.push(`<path d="${polyPath(px, py, unit * 0.28, n)}" ${SO}/>`);
  }
  const useH = h - 2 * m - 2 * cR * 1.2;
  const nPH = Math.max(2, Math.floor(useH / unit));
  const pSy = (h - nPH * unit) / 2;
  for (let i = 0; i < nPH; i++) {
    const py2 = pSy + (i + 0.5) * unit;
    for (const px2 of [m, w - m]) parts.push(`<path d="${polyPath(px2, py2, unit * 0.28, n)}" ${SO}/>`);
  }
  return parts.join('\n');
}

export function genGeoStar(cx, cy, sz, n, layers, comp, rnd, SO, FG, FG2, sw) {
  const parts = [];
  for (let l = layers; l >= 0; l--) {
    const r1 = sz * 0.48 * (l + 1) / (layers + 1);
    const r2 = r1 * (0.35 + comp * 0.2);
    const rot = l * Math.PI / (n * 2);
    const d = l % 2 === 0 ? SO : FG;
    parts.push(`<path d="${starPath(cx, cy, r1, r2, n, -Math.PI / 2 + rot)}" ${d}/>`);
  }
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.05)}" ${FG}/>`);
  return parts.join('\n');
}

export function genGeoSymbol(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const n = Math.round(3 + sym * 5);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.48)}" ${SO}/>`);
  parts.push(`<path d="${polyPath(cx, cy, sz * 0.42, n)}" ${SO}/>`);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU - Math.PI / 2;
    const [x1, y1] = pt(cx, cy, sz * 0.42, a);
    parts.push(`<line x1="${f(cx)}" y1="${f(cy)}" x2="${f(x1)}" y2="${f(y1)}" ${SO}/>`);
    parts.push(`<circle cx="${f(x1)}" cy="${f(y1)}" r="${f(sz * 0.04)}" ${FG}/>`);
  }
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.14)}" ${FG}/>`);
  return parts.join('\n');
}
