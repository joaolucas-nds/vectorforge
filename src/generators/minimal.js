// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.


import { TAU, f, pt } from '../core/utils.js';
import { state, PALETTES } from '../core/state.js';


export function genMinimalSymbol(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const parts = [];
  const n = Math.round(3 + sym * 3);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.46)}" ${SO}/>`);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU - Math.PI / 2;
    const [x1, y1] = pt(cx, cy, sz * 0.18, a);
    const [x2, y2] = pt(cx, cy, sz * 0.42, a);
    parts.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" ${SO}/>`);
  }
  if (comp > 0.3) parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.15)}" ${FG}/>`);
  return parts.join('\n');
}

export function genMinGrid(x, y, w, h, comp, rnd, SO, FG, sw) {
  const parts = [];
  const n = Math.round(3 + comp * 8);
  const sw2 = SO;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    parts.push(`<line x1="${f(w * t)}" y1="0" x2="${f(w * t)}" y2="${h}" ${sw2}/>`);
    parts.push(`<line x1="0" y1="${f(h * t)}" x2="${w}" y2="${f(h * t)}" ${sw2}/>`);
  }
  if (comp > 0.5) {
    const cx = w / 2, cy = h / 2;
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(Math.min(w, h) * 0.38)}" ${FG}/>`);
  }
  return parts.join('\n');
}

export function genMinCircles(cx, cy, sz, comp, rnd, SO, FG, sw) {
  const parts = [];
  const n = 2 + Math.round(comp * 6);
  for (let i = n; i >= 1; i--) {
    const r = sz * 0.48 * i / n;
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" ${i % 2 === 0 ? SO : FG}/>`);
  }
  return parts.join('\n');
}

export function genGlyph(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const text = document.getElementById('tv-ta').value.trim() || '✦';
  const font = state.font;
  const fsize = sz * 0.9;
  return `<text x="${f(cx)}" y="${f(cy)}" text-anchor="middle" dominant-baseline="middle" font-family="${font}" font-size="${f(fsize)}" fill="none" stroke="${PALETTES[state.pal].stroke}" stroke-width="${sw * 0.5}">${text}</text>`;
}
