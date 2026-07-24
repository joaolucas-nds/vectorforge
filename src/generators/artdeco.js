// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.


import { TAU, f, pt, polyPath } from '../core/utils.js';
import { state, PALETTES } from '../core/state.js';


export function genADMedallion(cx, cy, sz, n, layers, comp, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const rays = Math.round(6 + comp * 14);
  const outerR = sz * 0.48;
  const innerR = sz * (0.10 + 0.08 * comp);

  // Outer ring
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(outerR)}" ${SO}/>`);

  // Rays
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * TAU - Math.PI / 2;
    const ha = (Math.PI / rays) * 0.42;
    const [x1, y1] = pt(cx, cy, innerR, a - ha);
    const [xt, yt] = pt(cx, cy, outerR * 0.92, a);
    const [x2, y2] = pt(cx, cy, innerR, a + ha);
    parts.push(`<path d="M ${f(x1)} ${f(y1)} L ${f(xt)} ${f(yt)} L ${f(x2)} ${f(y2)} Z" ${FG}/>`);
  }

  // Concentric rings
  const ringCount = 2 + Math.round(comp * 4);
  for (let i = 1; i <= ringCount; i++) {
    const r = innerR + (outerR * 0.6 - innerR) * i / ringCount;
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" ${SO}/>`);
  }

  // Inner polygon
  parts.push(`<path d="${polyPath(cx, cy, innerR * 0.85, 8, Math.PI / 8)}" ${SO}/>`);
  parts.push(`<path d="${polyPath(cx, cy, innerR * 0.52, 4, Math.PI / 4)}" ${FG}/>`);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(innerR * 0.22)}" ${SO}/>`);

  // Outer stepped detail
  if (comp > 0.4) {
    const steps = 2 + Math.round(comp * 3);
    for (let i = 0; i < steps; i++) {
      const r2 = outerR + 4 + i * 5;
      const arc = Math.PI * 0.3;
      for (let s = 0; s < 4; s++) {
        const a = s * Math.PI / 2;
        const [ax, ay] = pt(cx, cy, r2, a - arc / 2);
        const [bx, by] = pt(cx, cy, r2, a + arc / 2);
        parts.push(`<path d="M ${f(ax)} ${f(ay)} A ${r2} ${r2} 0 0 1 ${f(bx)} ${f(by)}" ${SO}/>`);
      }
    }
  }

  return parts.join('\n');
}

export function genADFrame(x, y, w, h, comp, n, rnd, SO, FG, sw) {
  const parts = [];
  const m = 14;
  parts.push(`<rect x="${m}" y="${m}" width="${w - 2 * m}" height="${h - 2 * m}" ${SO}/>`);
  parts.push(`<rect x="${m + 8}" y="${m + 8}" width="${w - 2 * (m + 8)}" height="${h - 2 * (m + 8)}" ${SO}/>`);

  // Corner stepped brackets
  const cs = Math.min(w, h) * 0.12;
  const steps = 3 + Math.round(comp * 5);
  const corners = [[m, m, 1, 1], [w - m, m, -1, 1], [w - m, h - m, -1, -1], [m, h - m, 1, -1]];
  for (const [bx, by, dx, dy] of corners) {
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const d = cs * t, d2 = cs * (1 - t);
      parts.push(`<line x1="${f(bx)}" y1="${f(by + dy * d)}" x2="${f(bx + dx * d2)}" y2="${f(by + dy * d)}" ${SO}/>`);
      parts.push(`<line x1="${f(bx + dx * d)}" y1="${f(by)}" x2="${f(bx + dx * d)}" y2="${f(by + dy * d2)}" ${SO}/>`);
    }
    parts.push(`<circle cx="${f(bx)}" cy="${f(by)}" r="${f(cs * 0.08)}" ${FG}/>`);
  }

  // Top/bottom repeating motif
  const cw = 18;
  const iM = m + 8 + 5;
  const nT = Math.max(2, Math.floor((w - 2 * (m + cs + 12)) / (cw + 6)));
  const sx = (w - nT * (cw + 6) + 6) / 2;
  for (let i = 0; i < nT; i++) {
    const fx = sx + i * (cw + 6);
    for (const [yo, dir] of [[iM, -1], [h - iM, 1]]) {
      parts.push(`<polyline points="${f(fx)},${yo} ${f(fx + cw / 2)},${f(yo + dir * 8)} ${f(fx + cw)},${yo}" ${SO}/>`);
    }
  }

  // Side repeating motif
  const nS = Math.max(2, Math.floor((h - 2 * (m + cs + 12)) / (cw + 6)));
  const sy2 = (h - nS * (cw + 6) + 6) / 2;
  for (let i = 0; i < nS; i++) {
    const fy = sy2 + i * (cw + 6);
    for (const [xo, dir] of [[iM, 1], [w - iM, -1]]) {
      parts.push(`<polyline points="${xo},${f(fy)} ${f(xo + dir * 8)},${f(fy + cw / 2)} ${xo},${f(fy + cw)}" ${SO}/>`);
    }
  }
  return parts.join('\n');
}

export function genADCorner(ox, oy, sz, comp, rnd, SO, FG, sw) {
  const parts = [];
  const steps = 4 + Math.round(comp * 8);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const d = sz * t;
    parts.push(`<line x1="${f(ox)}" y1="${f(oy + d)}" x2="${f(ox + sz - d)}" y2="${f(oy + d)}" ${SO}/>`);
    parts.push(`<line x1="${f(ox + d)}" y1="${f(oy)}" x2="${f(ox + d)}" y2="${f(oy + sz - d)}" ${SO}/>`);
  }
  const diags = 2 + Math.round(comp * 4);
  for (let i = 0; i <= diags; i++) {
    const a = (i / diags) * Math.PI / 2;
    const [ex, ey] = pt(ox, oy, sz, a);
    parts.push(`<line x1="${f(ox)}" y1="${f(oy)}" x2="${f(ex)}" y2="${f(ey)}" ${SO}/>`);
  }
  parts.push(`<circle cx="${f(ox)}" cy="${f(oy)}" r="${f(sz * 0.07)}" ${FG}/>`);
  return parts.join('\n');
}

export function genADOrn(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const n = Math.round(3 + comp * 5);
  for (let i = -n; i <= n; i++) {
    for (let j = -n; j <= n; j++) {
      if (Math.abs(i) + Math.abs(j) <= n) {
        const px = cx + i * sz * 0.4 / n;
        const py = cy + j * sz * 0.4 / n;
        const r = sz * 0.4 / n * 0.42;
        parts.push(`<path d="M ${f(px)} ${f(py - r)} L ${f(px + r)} ${f(py)} L ${f(px)} ${f(py + r)} L ${f(px - r)} ${f(py)} Z" ${SO}/>`);
      }
    }
  }
  parts.push(`<path d="${polyPath(cx, cy, sz * 0.09, 8, Math.PI / 8)}" ${FG}/>`);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.035)}" fill="${PALETTES[state.pal].bg}"/>`);
  return parts.join('\n');
}
