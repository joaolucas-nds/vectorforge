// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.


import { genMandala } from './geometric.js'; // fallback de genTextShape quando a textarea está vazia


import { TAU, f, pt, polyPath, starPath, mkRand, pickOne, steppedDiamondPath, spiralPath, shellFanPaths } from '../core/utils.js';
import { state, PALETTES } from '../core/state.js';


export function genDivider(x, cy, w, comp, sym, rnd, SO, FG, sw, style) {
  const parts = [];
  parts.push(`<line x1="${x + 16}" y1="${f(cy)}" x2="${w - 16}" y2="${f(cy)}" ${SO}/>`);
  const cx = w / 2;

  if (style === 'artdeco') {
    // F5 lote 2 (DEC-018): o seed escolhe o miolo (losango · leque · zigurate), as peças
    // laterais (retângulos · chevrons · barras que afinam) e se há filetes extras
    const centerKind = pickOne(['diamond', 'fan', 'ziggurat'], rnd);
    const sideKind = pickOne(['rects', 'chevrons', 'bars'], rnd);
    if (rnd() < 0.5) for (const dy of [-4, 4]) parts.push(`<line x1="${x + 40}" y1="${f(cy + dy)}" x2="${w - 40}" y2="${f(cy + dy)}" ${SO}/>`);
    if (centerKind === 'fan') {
      // leque espelhado: meia-lua para cima e para baixo, com raios
      const R = 14 + comp * 12, k = 5 + Math.round(comp * 6);
      for (const up of [true, false]) {
        parts.push(`<path d="M ${f(cx - R)} ${f(cy)} A ${f(R)} ${f(R)} 0 0 ${up ? 1 : 0} ${f(cx + R)} ${f(cy)} Z" ${SO}/>`);
        for (let j = 1; j < k; j++) {
          const [ex, ey] = pt(cx, cy, R * 0.92, (up ? Math.PI : 0) + j * Math.PI / k);
          parts.push(`<line x1="${f(cx)}" y1="${f(cy)}" x2="${f(ex)}" y2="${f(ey)}" ${SO}/>`);
        }
      }
      parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(3 + comp * 2)}" ${FG}/>`);
    } else if (centerKind === 'ziggurat') {
      parts.push(`<path d="${steppedDiamondPath(cx, cy, 2 + Math.round(comp * 2), 10 + comp * 8, 12 + comp * 10)}" ${FG}/>`);
    } else {
      parts.push(`<path d="M ${cx} ${f(cy - 12 - comp * 10)} L ${f(cx + 8 + comp * 6)} ${f(cy)} L ${cx} ${f(cy + 12 + comp * 10)} L ${f(cx - 8 - comp * 6)} ${f(cy)} Z" ${FG}/>`);
    }
    const ns = 2 + Math.round(comp * 3);
    for (let i = 1; i <= ns; i++) {
      const off = 20 + i * 18;
      for (const dir of [-1, 1]) {
        const px = cx + dir * off;
        if (sideKind === 'chevrons') parts.push(`<polyline points="${f(px - dir * 4)},${f(cy - 6 - comp * 4)} ${f(px + dir * 4)},${f(cy)} ${f(px - dir * 4)},${f(cy + 6 + comp * 4)}" ${SO}/>`);
        else if (sideKind === 'bars') { const hh = (10 + comp * 6) * (1 - (i - 1) / (ns + 1)); parts.push(`<line x1="${f(px)}" y1="${f(cy - hh)}" x2="${f(px)}" y2="${f(cy + hh)}" ${SO}/>`); }
        else parts.push(`<rect x="${f(px - 5)}" y="${f(cy - 8 - comp * 4)}" width="10" height="${f(16 + comp * 8)}" ${SO}/>`);
      }
    }
  } else if (style === 'baroque') {
    // F5 lote 3 (DEC-019): o seed escolhe o miolo (oval dupla · concha · roseta), o remate das
    // pontas (voluta em C · espiral · folha) e se há contas ao longo da linha
    const centerKind = pickOne(['oval', 'shell', 'rosette'], rnd);
    const endKind = pickOne(['scroll', 'volute', 'leaf'], rnd);
    const beads = rnd() < 0.5;
    const ow = 40 + comp * 25, oh = 16 + comp * 8;
    if (centerKind === 'shell') {
      for (const a of [-Math.PI / 2, Math.PI / 2]) { const [o, r] = shellFanPaths(cx, cy, oh * 1.3, a, 7); parts.push(`<path d="${o}" ${SO}/>`, `<path d="${r}" ${SO}/>`); }
      parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(3 + comp * 2)}" ${FG}/>`);
    } else if (centerKind === 'rosette') {
      for (let k = 0; k < 8; k++) { const [px, py] = pt(cx, cy, oh * 0.9, k * TAU / 8); parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(oh * 0.4)}" ${SO}/>`); }
      parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(oh * 0.45)}" ${FG}/>`);
    } else {
      parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(ow)}" ry="${f(oh)}" ${SO}/>`);
      parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(ow * 0.8)}" ry="${f(oh * 0.65)}" ${SO}/>`);
    }
    for (const dir of [-1, 1]) {
      const bx = cx + dir * ow;
      if (endKind === 'volute') parts.push(`<path d="${spiralPath(bx + dir * (10 + comp * 4), cy, 10 + comp * 4, 1.5, dir, dir > 0 ? Math.PI : 0)}" ${SO}/>`);
      else if (endKind === 'leaf') parts.push(`<path d="M ${f(bx)} ${f(cy)} Q ${f(bx + dir * 14)} ${f(cy - 10)} ${f(bx + dir * 30)} ${f(cy)} Q ${f(bx + dir * 14)} ${f(cy + 10)} ${f(bx)} ${f(cy)} Z" ${FG}/>`);
      else parts.push(`<path d="M ${f(bx)} ${f(cy)} C ${f(bx + dir * 16)} ${f(cy - oh * 1.1)} ${f(bx + dir * 28)} ${f(cy - oh * 0.3)} ${f(bx + dir * 28)} ${f(cy + oh * 0.3)} C ${f(bx + dir * 28)} ${f(cy + oh * 1.1)} ${f(bx + dir * 16)} ${f(cy + oh * 0.8)} ${f(bx + dir * 6)} ${f(cy + oh * 0.3)}" ${SO}/>`);
      if (beads) for (let px = bx + dir * 42; dir > 0 ? px < w - 20 : px > x + 20; px += dir * 12) parts.push(`<circle cx="${f(px)}" cy="${f(cy)}" r="1.8" ${FG}/>`);
    }
  } else if (style === 'geo' || style === 'geometric') {
    // F5 lote 2 (DEC-018): o seed escolhe o miolo (estrela · polígonos encaixados · anéis ·
    // losango) e as peças laterais (círculos · polígonos · losangos · traços que encurtam)
    const centerKind = pickOne(['star', 'nested', 'rings', 'rhombus'], rnd);
    const sideKind = pickOne(['circles', 'polys', 'diamonds', 'ticks'], rnd);
    const n2 = Math.round(4 + sym * 6);
    const R = 16 + comp * 12;
    if (centerKind === 'nested') {
      parts.push(`<path d="${polyPath(cx, cy, R, n2)}" ${SO}/>`);
      parts.push(`<path d="${polyPath(cx, cy, R * 0.6, n2, -Math.PI / 2 + Math.PI / n2)}" ${SO}/>`);
    } else if (centerKind === 'rings') {
      parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R)}" ${SO}/>`);
      parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R * 0.65)}" ${SO}/>`);
    } else if (centerKind === 'rhombus') {
      parts.push(`<path d="M ${f(cx)} ${f(cy - R)} L ${f(cx + R * 0.6)} ${f(cy)} L ${f(cx)} ${f(cy + R)} L ${f(cx - R * 0.6)} ${f(cy)} Z" ${SO}/>`);
    } else {
      parts.push(`<path d="${starPath(cx, cy, R, 7 + comp * 5, n2)}" ${SO}/>`);
    }
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(4 + comp * 3)}" ${FG}/>`);
    const ns = 2 + Math.round(comp * 3);
    for (let i = 1; i <= ns; i++) {
      const off = 28 + i * 14;
      for (const dir of [-1, 1]) {
        const px = cx + dir * off, r = 3 + comp * 2;
        if (sideKind === 'polys') parts.push(`<path d="${polyPath(px, cy, r * 1.2, Math.max(3, Math.round(n2 / 2)))}" ${SO}/>`);
        else if (sideKind === 'diamonds') parts.push(`<path d="M ${f(px)} ${f(cy - r)} L ${f(px + r)} ${f(cy)} L ${f(px)} ${f(cy + r)} L ${f(px - r)} ${f(cy)} Z" ${FG}/>`);
        else if (sideKind === 'ticks') { const hh = r * 2 * (1 - (i - 1) / (ns + 1)); parts.push(`<line x1="${f(px)}" y1="${f(cy - hh)}" x2="${f(px)}" y2="${f(cy + hh)}" ${SO}/>`); }
        else parts.push(`<circle cx="${f(px)}" cy="${f(cy)}" r="${f(r)}" ${SO}/>`);
      }
    }
  } else if (style === 'victorian') {
    // F5 lote 3 (DEC-019): o seed escolhe o miolo (estrela · flor de três pétalas espelhada ·
    // quadrifólio) e as peças laterais (losangos · contas que diminuem · espirais)
    const centerKind = pickOne(['star', 'fleur', 'quatrefoil'], rnd);
    const sideKind = pickOne(['diamonds', 'dots', 'curls'], rnd);
    const R = 14 + comp * 10;
    if (centerKind === 'fleur') {
      for (const s of [-1, 1]) {
        parts.push(`<path d="M ${f(cx)} ${f(cy)} Q ${f(cx + R * 0.45)} ${f(cy + s * R * 0.5)} ${f(cx)} ${f(cy + s * R * 1.1)} Q ${f(cx - R * 0.45)} ${f(cy + s * R * 0.5)} ${f(cx)} ${f(cy)} Z" ${FG}/>`);
        parts.push(`<path d="M ${f(cx)} ${f(cy)} Q ${f(cx + R * 0.9)} ${f(cy + s * R * 0.1)} ${f(cx + R * 0.8)} ${f(cy + s * R * 0.7)} M ${f(cx)} ${f(cy)} Q ${f(cx - R * 0.9)} ${f(cy + s * R * 0.1)} ${f(cx - R * 0.8)} ${f(cy + s * R * 0.7)}" ${SO}/>`);
      }
    } else if (centerKind === 'quatrefoil') {
      for (let k = 0; k < 4; k++) { const [px, py] = pt(cx, cy, R * 0.45, k * TAU / 4 + Math.PI / 4); parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(R * 0.45)}" ${SO}/>`); }
      parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R * 0.2)}" ${FG}/>`);
    } else {
      parts.push(`<path d="${starPath(cx, cy, 14 + comp * 10, 6 + comp * 4, 8)}" ${SO}/>`);
    }
    const ns2 = 2 + Math.round(comp * 3);
    for (let i = 1; i <= ns2; i++) {
      const off2 = 22 + i * 14;
      for (const dir of [-1, 1]) {
        const px = cx + dir * off2;
        if (sideKind === 'dots') parts.push(`<circle cx="${f(px)}" cy="${f(cy)}" r="${f(Math.max(1.2, 3.2 - i * 0.4))}" ${FG}/>`);
        else if (sideKind === 'curls') parts.push(`<path d="${spiralPath(px, cy, 5, 1.25, dir, dir > 0 ? Math.PI : 0)}" ${SO}/>`);
        else parts.push(`<path d="M ${f(px)} ${f(cy - 5)} L ${f(px + dir * 4)} ${f(cy)} L ${f(px)} ${f(cy + 5)} L ${f(px - dir * 4)} ${f(cy)} Z" ${FG}/>`);
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
  // F5 lote 2 (DEC-018): Art Deco e Geométrico sorteiam o motivo e a malha; girih e islamic
  // seguem fixos (não consomem o seed). O motivo original de cada um é uma das opções.
  const motif = style === 'artdeco' ? pickOne(['polygon', 'scallop', 'fan', 'chevron'], rnd)
    : style === 'geo' ? pickOne(['polygon', 'star', 'truchet', 'rosette'], rnd) : 'polygon';
  let grid = style === 'artdeco' ? pickOne(['square', 'brick'], rnd)
    : style === 'geo' ? pickOne(['tri', 'square'], rnd) : (style === 'girih' ? 'brick' : 'square');
  if (motif === 'truchet') grid = 'square'; // o Truchet só fecha os arcos em malha quadrada
  const n = style === 'girih' || style === 'islamic' ? 6 : Math.round(3 + sym * 4);
  for (let row = -1; row <= Math.ceil(h / cell) + 1; row++) {
    for (let col = -1; col <= Math.ceil(w / cell) + 1; col++) {
      const offset = grid !== 'square' ? (row % 2 === 0 ? 0 : cell / 2) : 0;
      const cx = col * cell + cell / 2 + offset;
      const cy = row * (grid === 'tri' ? cell * 0.866 : cell) + cell / 2;
      if (cx < -cell || cx > w + cell || cy < -cell || cy > h + cell) continue;
      const c2 = cell / 2;
      if (motif === 'scallop') {
        // escama: arco grande vazado com meia-lua cheia dentro
        parts.push(`<path d="M ${f(cx - c2)} ${f(cy)} A ${f(c2)} ${f(c2)} 0 0 1 ${f(cx + c2)} ${f(cy)}" ${SO}/>`);
        parts.push(`<path d="M ${f(cx - c2 / 2)} ${f(cy)} A ${f(c2 / 2)} ${f(c2 / 2)} 0 0 1 ${f(cx + c2 / 2)} ${f(cy)} Z" ${FG}/>`);
      } else if (motif === 'fan') {
        const R = cell * 0.45;
        parts.push(`<path d="M ${f(cx - R)} ${f(cy)} A ${f(R)} ${f(R)} 0 0 1 ${f(cx + R)} ${f(cy)} Z" ${SO}/>`);
        // raios num só path (M…L por raio): um elemento por célula em vez de n, o padrão cobre o canvas inteiro
        let d = '';
        for (let j = 1; j <= n; j++) {
          const [ex, ey] = pt(cx, cy, R, Math.PI + j * Math.PI / (n + 1));
          d += `M ${f(cx)} ${f(cy)} L ${f(ex)} ${f(ey)} `;
        }
        parts.push(`<path d="${d.trim()}" ${SO}/>`);
      } else if (motif === 'chevron') {
        for (const dy of [-cell * 0.15, cell * 0.15]) parts.push(`<polyline points="${f(cx - c2)},${f(cy + dy - cell * 0.15)} ${f(cx)},${f(cy + dy + cell * 0.15)} ${f(cx + c2)},${f(cy + dy - cell * 0.15)}" ${SO}/>`);
      } else if (motif === 'star') {
        parts.push(`<path d="${starPath(cx, cy, cell * 0.47, cell * 0.2, n)}" ${SO}/>`);
        parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(cell * 0.08)}" ${FG}/>`);
      } else if (motif === 'truchet') {
        // ladrilho de Truchet: dois quartos de círculo em cantos opostos; o seed gira cada ladrilho
        const x0 = cx - c2, y0 = cy - c2, x1 = cx + c2, y1 = cy + c2;
        if (rnd() < 0.5) {
          parts.push(`<path d="M ${f(x0 + c2)} ${f(y0)} A ${f(c2)} ${f(c2)} 0 0 1 ${f(x0)} ${f(y0 + c2)}" ${SO}/>`);
          parts.push(`<path d="M ${f(x1 - c2)} ${f(y1)} A ${f(c2)} ${f(c2)} 0 0 1 ${f(x1)} ${f(y1 - c2)}" ${SO}/>`);
        } else {
          parts.push(`<path d="M ${f(x1 - c2)} ${f(y0)} A ${f(c2)} ${f(c2)} 0 0 0 ${f(x1)} ${f(y0 + c2)}" ${SO}/>`);
          parts.push(`<path d="M ${f(x0 + c2)} ${f(y1)} A ${f(c2)} ${f(c2)} 0 0 0 ${f(x0)} ${f(y1 - c2)}" ${SO}/>`);
        }
      } else if (motif === 'rosette') {
        parts.push(`<path d="${polyPath(cx, cy, cell * 0.47, n)}" ${SO}/>`);
        parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(cell * 0.47 * Math.cos(Math.PI / n))}" ${SO}/>`);
        parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(cell * 0.1)}" ${FG}/>`);
      } else {
        parts.push(`<path d="${polyPath(cx, cy, cell * 0.47, n)}" ${SO}/>`);
        parts.push(`<path d="${polyPath(cx, cy, cell * 0.22, n, Math.PI / n)}" ${FG}/>`);
      }
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
