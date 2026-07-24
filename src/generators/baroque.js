// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.


import { f, pt } from '../core/utils.js';


export function genBQMedallion(cx, cy, sz, layers, comp, sym, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const rx = sz * 0.48, ry = sz * 0.44;
  parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" ${SO}/>`);
  parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx * 0.82)}" ry="${f(ry * 0.82)}" ${SO}/>`);

  // Scrollwork
  function scroll(bx, by, s, dir) {
    const ex = bx + dir * s * 0.7, ey = by + s * 0.55;
    const c1x = bx + dir * s * 0.9, c1y = by - s * 0.05;
    const c2x = bx + dir * s * 1.1, c2y = by + s * 0.35;
    parts.push(`<path d="M ${f(bx)} ${f(by)} C ${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(ex)} ${f(ey)}" ${SO}/>`);
    parts.push(`<circle cx="${f(ex + dir * s * 0.1)}" cy="${f(ey)}" r="${f(s * 0.12)}" ${SO}/>`);
  }

  const ls = 2 + Math.round(comp * 4);
  for (let i = 0; i < ls; i++) {
    const t = i / (ls - 1 || 1);
    const by = cy + (t - 0.5) * sz * 0.75;
    const bsz = sz * 0.18 * (1.1 - t * 0.4);
    scroll(cx, by, bsz, 1); scroll(cx, by, bsz, -1);
    if (comp > 0.5) { scroll(cx + bsz * 0.4, by - bsz * 0.15, bsz * 0.42, 1); scroll(cx - bsz * 0.4, by - bsz * 0.15, bsz * 0.42, -1); }
  }

  // Crown
  for (const [ox, oy, r] of [[0, -sz * 0.5 - 10, 9], [10, -sz * 0.5 - 5, 6], [-10, -sz * 0.5 - 5, 6]]) {
    parts.push(`<circle cx="${f(cx + ox)}" cy="${f(cy + oy)}" r="${r}" ${SO}/>`);
    parts.push(`<circle cx="${f(cx + ox)}" cy="${f(cy + oy)}" r="${f(r * 0.38)}" ${FG}/>`);
  }

  const br = sz * 0.1;
  parts.push(`<path d="M ${f(cx - br * 2.5)} ${f(cy + ry)} Q ${f(cx)} ${f(cy + ry + br)} ${f(cx + br * 2.5)} ${f(cy + ry)}" ${SO}/>`);

  return parts.join('\n');
}

export function genBQFrame(x, y, w, h, comp, rnd, SO, FG, sw) {
  const parts = [];
  const m = 12;
  const rx = Math.min(w, h) * 0.08;
  function rRect(x2, y2, ww, hh, r) {
    return `M ${f(x2 + r)} ${y2} L ${f(x2 + ww - r)} ${y2} Q ${x2 + ww} ${y2} ${x2 + ww} ${f(y2 + r)} L ${x2 + ww} ${f(y2 + hh - r)} Q ${x2 + ww} ${y2 + hh} ${f(x2 + ww - r)} ${y2 + hh} L ${f(x2 + r)} ${y2 + hh} Q ${x2} ${y2 + hh} ${x2} ${f(y2 + hh - r)} L ${x2} ${f(y2 + r)} Q ${x2} ${y2} ${f(x2 + r)} ${y2} Z`;
  }
  parts.push(`<path d="${rRect(m, m, w - 2 * m, h - 2 * m, rx)}" ${SO}/>`);
  parts.push(`<path d="${rRect(m + 9, m + 9, w - 2 * (m + 9), h - 2 * (m + 9), rx * 0.65)}" ${SO}/>`);

  // Corner scrolls
  function cs(bx, by, dx, dy, s) {
    const ex = bx + dx * s, ey = by + dy * s;
    const c1x = bx + dx * s * 0.3, c1y = by + dy * s * 0.9;
    const c2x = bx + dx * s * 0.7, c2y = by + dy * s * 0.1;
    parts.push(`<path d="M ${f(bx)} ${f(by)} C ${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(ex)} ${f(ey)}" ${SO}/>`);
    parts.push(`<circle cx="${f(bx)}" cy="${f(by)}" r="5" ${SO}/>`);
    parts.push(`<circle cx="${f(ex)}" cy="${f(ey)}" r="5" ${SO}/>`);
    parts.push(`<circle cx="${f(bx)}" cy="${f(by)}" r="2" ${FG}/>`);
    parts.push(`<circle cx="${f(ex)}" cy="${f(ey)}" r="2" ${FG}/>`);
  }
  const csz = Math.min(w, h) * 0.14;
  cs(m + rx + 8, m + 8, 1, 1, csz); cs(w - m - rx - 8, m + 8, -1, 1, csz);
  cs(w - m - rx - 8, h - m - 8, -1, -1, csz); cs(m + rx + 8, h - m - 8, 1, -1, csz);

  // Side foliage
  const nl = 1 + Math.round(comp * 2);
  for (let i = 0; i < nl; i++) {
    const t = (i + 0.5) / nl;
    const ly = m + (h - 2 * m) * t;
    const ls = 14 + comp * 12;
    for (const [lx, dir] of [[m + 3, 1], [w - m - 3, -1]]) {
      parts.push(`<path d="M ${lx} ${f(ly)} C ${f(lx + dir * ls * 0.6)} ${f(ly - ls * 0.5)} ${f(lx + dir * ls * 0.9)} ${f(ly - ls * 0.9)} ${f(lx + dir * ls * 0.65)} ${f(ly - ls * 1.1)}" ${SO}/>`);
      parts.push(`<path d="M ${lx} ${f(ly)} C ${f(lx + dir * ls * 0.6)} ${f(ly + ls * 0.5)} ${f(lx + dir * ls * 0.9)} ${f(ly + ls * 0.9)} ${f(lx + dir * ls * 0.65)} ${f(ly + ls * 1.1)}" ${SO}/>`);
      parts.push(`<circle cx="${lx}" cy="${f(ly)}" r="3" ${FG}/>`);
    }
  }
  return parts.join('\n');
}

export function genBQCartouche(cx, cy, sz, comp, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const rx = sz * 0.45, ry = sz * 0.35;
  parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" ${SO}/>`);
  parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx * 0.85)}" ry="${f(ry * 0.8)}" ${SO}/>`);
  // Scrolled ends
  for (const dir of [-1, 1]) {
    const bx = cx + dir * rx;
    parts.push(`<path d="M ${f(bx)} ${f(cy - ry * 0.3)} C ${f(bx + dir * sz * 0.1)} ${f(cy - ry * 0.5)} ${f(bx + dir * sz * 0.18)} ${f(cy)} ${f(bx + dir * sz * 0.1)} ${f(cy + ry * 0.5)} L ${f(bx)} ${f(cy + ry * 0.3)}" ${SO}/>`);
  }
  return parts.join('\n');
}

export function genBQSwag(x, cy, w, comp, rnd, SO, FG, sw) {
  const parts = [];
  const segs = 2 + Math.round(comp * 4);
  const segW = w / segs;
  for (let i = 0; i < segs; i++) {
    const sx = x + i * segW, ex = sx + segW;
    const drop = 20 + comp * 30;
    parts.push(`<path d="M ${f(sx)} ${f(cy)} Q ${f(sx + segW / 2)} ${f(cy + drop)} ${f(ex)} ${f(cy)}" ${SO}/>`);
    // Tassels
    const tc = cx => {
      parts.push(`<line x1="${f(cx)}" y1="${f(cy + drop)}" x2="${f(cx)}" y2="${f(cy + drop + 15 + comp * 10)}" ${SO}/>`);
      parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy + drop + 20 + comp * 10)}" rx="5" ry="7" ${FG}/>`);
    };
    if (i === 0) tc(sx);
    tc(ex);
  }
  parts.push(`<line x1="${x}" y1="${f(cy)}" x2="${w}" y2="${f(cy)}" ${SO}/>`);
  return parts.join('\n');
}

export function genBQAcanthus(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const parts = [];
  parts.push(`<line x1="${f(cx)}" y1="${f(cy - sz * 0.48)}" x2="${f(cx)}" y2="${f(cy + sz * 0.48)}" ${SO}/>`);
  function leaf(bx, by, size, dir) {
    const ex = bx + dir * size * 0.72, ey = by + size * 0.52;
    const c1x = bx + dir * size * 0.85, c1y = by - size * 0.08;
    const c2x = bx + dir * size * 1.05, c2y = by + size * 0.32;
    parts.push(`<path d="M ${f(bx)} ${f(by)} C ${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(ex)} ${f(ey)}" ${SO}/>`);
    const lr = size * 0.13;
    parts.push(`<circle cx="${f(ex + dir * lr * 0.28)}" cy="${f(ey)}" r="${f(lr)}" ${SO}/>`);
    if (comp > 0.4) {
      parts.push(`<path d="M ${f(bx + dir * size * 0.3)} ${f(by + size * 0.08)} C ${f(bx + dir * size * 0.5)} ${f(by - size * 0.15)} ${f(bx + dir * size * 0.7)} ${f(by + size * 0.02)} ${f(bx + dir * size * 0.55)} ${f(by + size * 0.25)}" ${SO}/>`);
    }
  }
  const ls = 2 + Math.round(comp * 4);
  for (let i = 0; i < ls; i++) {
    const t = i / (ls - 1 || 1);
    const by = cy + (t - 0.5) * sz * 0.8;
    const bs = sz * 0.2 * (1.2 - t * 0.5);
    leaf(cx, by, bs, 1); leaf(cx, by, bs, -1);
  }
  return parts.join('\n');
}
