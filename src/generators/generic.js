// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.


import { genMandala } from './geometric.js'; // fallback de genTextShape quando a textarea está vazia


import { TAU, f, pt, polyPath, starPath, mkRand } from '../core/utils.js';
import { state, PALETTES } from '../core/state.js';


export function genDivider(x, cy, w, comp, sym, rnd, SO, FG, sw, style) {
  const parts = [];
  parts.push(`<line x1="${x + 16}" y1="${f(cy)}" x2="${w - 16}" y2="${f(cy)}" ${SO}/>`);
  const cx = w / 2;

  if (style === 'artdeco') {
    parts.push(`<path d="M ${cx} ${f(cy - 12 - comp * 10)} L ${f(cx + 8 + comp * 6)} ${f(cy)} L ${cx} ${f(cy + 12 + comp * 10)} L ${f(cx - 8 - comp * 6)} ${f(cy)} Z" ${FG}/>`);
    const ns = 2 + Math.round(comp * 3);
    for (let i = 1; i <= ns; i++) {
      const off = 20 + i * 18;
      for (const dir of [-1, 1]) parts.push(`<rect x="${f(cx + dir * off - 5)}" y="${f(cy - 8 - comp * 4)}" width="10" height="${f(16 + comp * 8)}" ${SO}/>`);
    }
  } else if (style === 'baroque') {
    const ow = 40 + comp * 25, oh = 16 + comp * 8;
    parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(ow)}" ry="${f(oh)}" ${SO}/>`);
    parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(ow * 0.8)}" ry="${f(oh * 0.65)}" ${SO}/>`);
    for (const dir of [-1, 1]) {
      const bx = cx + dir * ow;
      parts.push(`<path d="M ${f(bx)} ${f(cy)} C ${f(bx + dir * 16)} ${f(cy - oh * 1.1)} ${f(bx + dir * 28)} ${f(cy - oh * 0.3)} ${f(bx + dir * 28)} ${f(cy + oh * 0.3)} C ${f(bx + dir * 28)} ${f(cy + oh * 1.1)} ${f(bx + dir * 16)} ${f(cy + oh * 0.8)} ${f(bx + dir * 6)} ${f(cy + oh * 0.3)}" ${SO}/>`);
    }
  } else if (style === 'geo' || style === 'geometric') {
    const n2 = Math.round(4 + sym * 6);
    parts.push(`<path d="${starPath(cx, cy, 16 + comp * 12, 7 + comp * 5, n2)}" ${SO}/>`);
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(4 + comp * 3)}" ${FG}/>`);
    const ns = 2 + Math.round(comp * 3);
    for (let i = 1; i <= ns; i++) {
      const off = 28 + i * 14;
      for (const dir of [-1, 1]) parts.push(`<circle cx="${f(cx + dir * off)}" cy="${f(cy)}" r="${f(3 + comp * 2)}" ${SO}/>`);
    }
  } else if (style === 'victorian') {
    parts.push(`<path d="${starPath(cx, cy, 14 + comp * 10, 6 + comp * 4, 8)}" ${SO}/>`);
    const ns2 = 2 + Math.round(comp * 3);
    for (let i = 1; i <= ns2; i++) {
      const off2 = 22 + i * 14;
      for (const dir of [-1, 1]) {
        parts.push(`<path d="M ${f(cx + dir * off2)} ${f(cy - 5)} L ${f(cx + dir * off2 + dir * 4)} ${f(cy)} L ${f(cx + dir * off2)} ${f(cy + 5)} L ${f(cx + dir * off2 - dir * 4)} ${f(cy)} Z" ${FG}/>`);
      }
    }
  } else {
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(5 + comp * 4)}" ${FG}/>`);
    for (const dir of [-1, 1]) {
      parts.push(`<circle cx="${f(cx + dir * 20)}" cy="${f(cy)}" r="3" ${SO}/>`);
      parts.push(`<circle cx="${f(cx + dir * 35)}" cy="${f(cy)}" r="2" ${SO}/>`);
    }
  }
  return parts.join('\n');
}

export function genPattern(x, y, w, h, comp, sym, rnd, SO, FG, sw, style) {
  const parts = [];
  const cell = 40 + Math.round((1 - comp) * 35);
  for (let row = -1; row <= Math.ceil(h / cell) + 1; row++) {
    for (let col = -1; col <= Math.ceil(w / cell) + 1; col++) {
      const offset = (style === 'geo' || style === 'girih') ? (row % 2 === 0 ? 0 : cell / 2) : 0;
      const cx = col * cell + cell / 2 + offset;
      const cy = row * (style === 'geo' ? cell * 0.866 : cell) + cell / 2;
      if (cx < -cell || cx > w + cell || cy < -cell || cy > h + cell) continue;
      const n = style === 'girih' || style === 'islamic' ? 6 : Math.round(3 + sym * 4);
      parts.push(`<path d="${polyPath(cx, cy, cell * 0.47, n)}" ${SO}/>`);
      parts.push(`<path d="${polyPath(cx, cy, cell * 0.22, n, Math.PI / n)}" ${FG}/>`);
    }
  }
  return parts.join('\n');
}

export function genPixelArt() {
  const canvas = document.getElementById('px-canvas');
  const size = 64;
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  const rnd = mkRand(state.seed);
  const pal = PALETTES[state.pal];

  ctx.fillStyle = state.darkBg ? '#111' : '#fff';
  ctx.fillRect(0, 0, size, size);

  const cx = size / 2, cy = size / 2;
  const r = size * 0.45 * state.comp;
  const n = Math.round(4 + state.sym * 8);

  // Draw symmetric pattern pixel by pixel
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const sector = Math.floor((angle + Math.PI) / (TAU / n));
      const fib = (dist * 0.4 + sector * 2.7) % 1;
      if (dist < r && (fib < state.comp * 0.6 || dist < r * 0.1)) {
        ctx.fillStyle = fib < 0.15 ? pal.fill : pal.stroke;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

export function genTextShape(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const text = document.getElementById('tv-ta').value.trim();
  if (!text) return genMandala(cx, cy, sz, 8, 3, comp, rnd, SO, FG, FG, sw);
  const font = state.font;
  const fsize = Math.min(sz * 0.85, sz * 1.8 / text.length);
  const parts = [];
  parts.push(`<text x="${f(cx)}" y="${f(cy)}" text-anchor="middle" dominant-baseline="middle" font-family="${font}" font-size="${f(fsize)}" fill="none" stroke="${PALETTES[state.pal].stroke}" stroke-width="${sw * 0.5}">${text}</text>`);
  // Decorative ring around text
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.47)}" ${SO}/>`);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.38)}" ${SO}/>`);
  // Radial lines at characters
  const n = text.length;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU;
    const [x1, y1] = pt(cx, cy, sz * 0.38, a);
    const [x2, y2] = pt(cx, cy, sz * 0.47, a);
    parts.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" ${SO}/>`);
  }
  return parts.join('\n');
}
