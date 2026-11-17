// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild). F5 lote 2 (DEC-018): cada gerador
// recebe ESCOLHAS semeadas (variante de motivo, arranjo, acabamento) — o desenho original de
// cada um continua sendo uma das variantes. Complexity segue sendo densidade; Symmetry, eixos.
// Piloto do esqueleto semeado (DEC-020): no medalhão, o seed escolhe também o CONTORNO.


import { TAU, f, pt, polyPath, starPath, pickOne, steppedDiamondPath, contourRadius, contourPath } from '../core/utils.js';
import { state, PALETTES } from '../core/state.js';


/**
 * Medalhão Art Deco: anel externo, raios, anéis concêntricos e miolo.
 * O ESQUELETO é semeado (DEC-020): contorno (círculo · octógono · losango · quadrado · oval alto · arco ·
 * sol nascente, que é meio medalhão sobre uma base), escala (0,84 · 1 · 1,1), ±1 anel e ±2 raios em
 * torno do que o Complexity dá.
 * Por cima, as escolhas de detalhe do lote 2 (DEC-018): forma dos raios (cunha · degraus ·
 * leque · alternados), desenho dos anéis (círculo · octógono · dodecágono — só no contorno
 * circular; nos outros, os anéis seguem o contorno), miolo (octógono · quadrados girados · sol)
 * e acabamento externo (4 arcos · 8 arcos · pontos). Complexity = quantidade de raios e anéis.
 * @returns {string} elementos SVG
 */
export function genADMedallion(cx, cy, sz, n, layers, comp, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const rayKind = pickOne(['wedge', 'stepped', 'fan', 'alternate'], rnd);
  const ringKind = pickOne(['circle', 'octagon', 'dodecagon'], rnd);
  const coreKind = pickOne(['octagon', 'squares', 'sun'], rnd);
  const rimKind = pickOne(['arcs4', 'arcs8', 'dots'], rnd);
  const contour = pickOne(['circle', 'octagon', 'diamond', 'square', 'tall', 'arch', 'sunrise'], rnd);
  const ringShift = pickOne([-1, 0, 1], rnd);
  const scale = pickOne([0.84, 1, 1.1], rnd);
  const rays = Math.max(4, Math.round(6 + comp * 14) + pickOne([-2, 0, 2], rnd));
  const outerR = sz * 0.48 * scale;
  const innerR = sz * (0.10 + 0.08 * comp) * scale;
  const sunrise = contour === 'sunrise';
  if (sunrise) cy += outerR * 0.3; // meio medalhão: o centro desce para a composição ficar no meio do canvas
  const rFn = contour === 'octagon' ? contourRadius('polygon', outerR, { k: 8 })
    : contour === 'diamond' ? contourRadius('polygon', outerR * 1.12, { k: 4, rot: -Math.PI / 2 })
    : contour === 'square' ? contourRadius('polygon', outerR * 1.12, { k: 4, rot: -Math.PI / 4 })
    : contour === 'tall' ? contourRadius('ellipse', outerR, { sx: 0.74, sy: 1.08 })
    : contour === 'arch' ? contourRadius('arch', outerR, { base: 0.82 })
    : contourRadius('circle', outerR);
  const round = contour === 'circle' || sunrise;
  /** Meio anel (sol nascente): arco de cima, da esquerda para a direita. */
  const halfArc = r => `M ${f(cx - r)} ${f(cy)} A ${f(r)} ${f(r)} 0 0 1 ${f(cx + r)} ${f(cy)}`;

  // Outer ring
  if (sunrise) {
    parts.push(`<path d="${halfArc(outerR)} Z" ${SO}/>`);
    for (const dy of [0, 6]) parts.push(`<line x1="${f(cx - outerR * 1.12)}" y1="${f(cy + dy)}" x2="${f(cx + outerR * 1.12)}" y2="${f(cy + dy)}" ${SO}/>`);
  } else if (round) parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(outerR)}" ${SO}/>`);
  else parts.push(`<path d="${contourPath(cx, cy, rFn)}" ${SO}/>`);

  // Rays — no sol nascente, só a metade de cima
  for (let i = 0; i < rays; i++) {
    const a = sunrise ? Math.PI + (i + 0.5) / rays * Math.PI : (i / rays) * TAU - Math.PI / 2;
    const ha = (Math.PI / rays) * (sunrise ? 0.21 : 0.42);
    const ro = rFn(a);
    if (rayKind === 'stepped') {
      // raio em degraus: três patamares que estreitam até a ponta
      const side = [];
      for (let s = 0; s < 3; s++) {
        const r0 = innerR + (ro * 0.92 - innerR) * s / 3, r1 = innerR + (ro * 0.92 - innerR) * (s + 1) / 3;
        const w = ha * (1 - s / 3);
        side.push([r0, w], [r1, w]);
      }
      const left = side.map(([r, w]) => pt(cx, cy, r, a - w));
      const right = side.slice().reverse().map(([r, w]) => pt(cx, cy, r, a + w));
      parts.push(`<path d="M ${[...left, ...right].map(p => `${f(p[0])} ${f(p[1])}`).join(' L ')} Z" ${FG}/>`);
    } else if (rayKind === 'fan') {
      // lâmina de leque: laterais retas e ponta em arco
      const tipR = ro * 0.88;
      const [x1, y1] = pt(cx, cy, innerR, a - ha);
      const [x2, y2] = pt(cx, cy, tipR, a - ha);
      const [x3, y3] = pt(cx, cy, tipR, a + ha);
      const [x4, y4] = pt(cx, cy, innerR, a + ha);
      parts.push(`<path d="M ${f(x1)} ${f(y1)} L ${f(x2)} ${f(y2)} A ${f(tipR)} ${f(tipR)} 0 0 1 ${f(x3)} ${f(y3)} L ${f(x4)} ${f(y4)} Z" ${FG}/>`);
    } else {
      // cunha (original); em «alternate», um raio sim, um não, fica curto e vazado
      const short = rayKind === 'alternate' && i % 2 === 1;
      const [x1, y1] = pt(cx, cy, innerR, a - ha);
      const [xt, yt] = pt(cx, cy, ro * (short ? 0.68 : 0.92), a);
      const [x2, y2] = pt(cx, cy, innerR, a + ha);
      parts.push(`<path d="M ${f(x1)} ${f(y1)} L ${f(xt)} ${f(yt)} L ${f(x2)} ${f(y2)} Z" ${short ? SO : FG}/>`);
    }
  }

  // Concentric rings — seguem o contorno
  const ringCount = Math.max(1, 2 + Math.round(comp * 4) + ringShift);
  for (let i = 1; i <= ringCount; i++) {
    const r = innerR + (outerR * 0.6 - innerR) * i / ringCount;
    if (sunrise) parts.push(`<path d="${halfArc(r)}" ${SO}/>`);
    else if (!round) parts.push(`<path d="${contourPath(cx, cy, rFn, r / outerR)}" ${SO}/>`);
    else if (ringKind === 'circle') parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" ${SO}/>`);
    else { const k = ringKind === 'octagon' ? 8 : 12; parts.push(`<path d="${polyPath(cx, cy, r, k, Math.PI / k)}" ${SO}/>`); }
  }

  // Inner core
  if (coreKind === 'octagon') {
    parts.push(`<path d="${polyPath(cx, cy, innerR * 0.85, 8, Math.PI / 8)}" ${SO}/>`);
    parts.push(`<path d="${polyPath(cx, cy, innerR * 0.52, 4, Math.PI / 4)}" ${FG}/>`);
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(innerR * 0.22)}" ${SO}/>`);
  } else if (coreKind === 'squares') {
    parts.push(`<path d="${polyPath(cx, cy, innerR * 0.9, 4, 0)}" ${SO}/>`);
    parts.push(`<path d="${polyPath(cx, cy, innerR * 0.9, 4, Math.PI / 4)}" ${SO}/>`);
    parts.push(`<path d="${polyPath(cx, cy, innerR * 0.42, 4, Math.PI / 4)}" ${FG}/>`);
  } else {
    parts.push(`<path d="${starPath(cx, cy, innerR * 0.9, innerR * 0.5, 8)}" ${SO}/>`);
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(innerR * 0.4)}" ${FG}/>`);
  }

  // Outer stepped detail — no círculo, os arcos/pontos do lote 2; nos outros contornos, pontos que o acompanham
  if (comp > 0.4) {
    const steps = 2 + Math.round(comp * 3);
    for (let i = 0; i < steps; i++) {
      if (contour !== 'circle' || rimKind === 'dots') {
        const k = 12 + i * 4;
        for (let s = 0; s < k; s++) {
          const a = sunrise ? Math.PI + (s + 0.5) / k * Math.PI : s * TAU / k;
          const [dx, dy] = pt(cx, cy, rFn(a) + 4 + i * 5, a);
          parts.push(`<circle cx="${f(dx)}" cy="${f(dy)}" r="${f(1.2 + comp)}" ${FG}/>`);
        }
        continue;
      }
      const r2 = outerR + 4 + i * 5;
      const k = rimKind === 'arcs8' ? 8 : 4;
      const arc = Math.PI * (k === 8 ? 0.15 : 0.3);
      for (let s = 0; s < k; s++) {
        const a = s * TAU / k;
        const [ax, ay] = pt(cx, cy, r2, a - arc / 2);
        const [bx, by] = pt(cx, cy, r2, a + arc / 2);
        parts.push(`<path d="M ${f(ax)} ${f(ay)} A ${r2} ${r2} 0 0 1 ${f(bx)} ${f(by)}" ${SO}/>`);
      }
    }
  }

  return parts.join('\n');
}

/**
 * Moldura Art Deco. Reusada por Celta (border) e Islâmico (border) SEM variação: só quem passa
 * `vary = true` (o Art Deco) recebe as escolhas semeadas — cantos (colchetes em degraus · leque
 * de arcos · zigurate), motivo das bordas (chevron · barras · arcos · losangos) e filetes
 * (duplo · triplo · simples). Complexity = degraus dos cantos.
 * @param {boolean} [vary=false] - liga as escolhas semeadas (só o Art Deco liga)
 * @returns {string} elementos SVG
 */
export function genADFrame(x, y, w, h, comp, n, rnd, SO, FG, sw, vary = false) {
  const parts = [];
  const cornerKind = vary ? pickOne(['brackets', 'fan', 'ziggurat'], rnd) : 'brackets';
  const edgeKind = vary ? pickOne(['chevron', 'bars', 'arcs', 'diamonds'], rnd) : 'chevron';
  const lineKind = vary ? pickOne(['double', 'triple', 'single'], rnd) : 'double';
  const m = 14;
  if (lineKind === 'triple') parts.push(`<rect x="${m - 6}" y="${m - 6}" width="${w - 2 * (m - 6)}" height="${h - 2 * (m - 6)}" ${SO}/>`);
  parts.push(`<rect x="${m}" y="${m}" width="${w - 2 * m}" height="${h - 2 * m}" ${SO}/>`);
  if (lineKind !== 'single') parts.push(`<rect x="${m + 8}" y="${m + 8}" width="${w - 2 * (m + 8)}" height="${h - 2 * (m + 8)}" ${SO}/>`);

  // Corner stepped brackets
  const cs = Math.min(w, h) * 0.12;
  const steps = 3 + Math.round(comp * 5);
  const corners = [[m, m, 1, 1], [w - m, m, -1, 1], [w - m, h - m, -1, -1], [m, h - m, 1, -1]];
  for (const [bx, by, dx, dy] of corners) {
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const d = cs * t, d2 = cs * (1 - t);
      if (cornerKind === 'fan') {
        // arcos concêntricos de um quarto de volta; o sentido depende do canto (y cresce para baixo)
        parts.push(`<path d="M ${f(bx + dx * d)} ${f(by)} A ${f(d)} ${f(d)} 0 0 ${dx * dy > 0 ? 1 : 0} ${f(bx)} ${f(by + dy * d)}" ${SO}/>`);
      } else if (cornerKind === 'ziggurat') {
        // esquadros encaixados, cada um um degrau maior
        parts.push(`<polyline points="${f(bx + dx * d)},${f(by)} ${f(bx + dx * d)},${f(by + dy * d)} ${f(bx)},${f(by + dy * d)}" ${SO}/>`);
      } else {
        parts.push(`<line x1="${f(bx)}" y1="${f(by + dy * d)}" x2="${f(bx + dx * d2)}" y2="${f(by + dy * d)}" ${SO}/>`);
        parts.push(`<line x1="${f(bx + dx * d)}" y1="${f(by)}" x2="${f(bx + dx * d)}" y2="${f(by + dy * d2)}" ${SO}/>`);
      }
    }
    parts.push(`<circle cx="${f(bx)}" cy="${f(by)}" r="${f(cs * 0.08)}" ${FG}/>`);
  }

  // Top/bottom repeating motif
  const cw = 18;
  const iM = m + 8 + 5;
  /** Um motivo da borda horizontal em fx, na linha yo, apontando para dir (−1 = para cima). */
  const hMotif = (fx, yo, dir) => {
    if (edgeKind === 'bars') return `<rect x="${f(fx + cw / 4)}" y="${f(dir < 0 ? yo - 8 : yo)}" width="${f(cw / 2)}" height="8" ${SO}/>`;
    if (edgeKind === 'arcs') return `<path d="M ${f(fx)} ${yo} A ${cw / 2} ${cw / 2} 0 0 ${dir < 0 ? 1 : 0} ${f(fx + cw)} ${yo}" ${SO}/>`;
    if (edgeKind === 'diamonds') { const mx = fx + cw / 2, my = yo + dir * 4; return `<path d="M ${f(mx)} ${f(my - 4)} L ${f(mx + 6)} ${f(my)} L ${f(mx)} ${f(my + 4)} L ${f(mx - 6)} ${f(my)} Z" ${FG}/>`; }
    return `<polyline points="${f(fx)},${yo} ${f(fx + cw / 2)},${f(yo + dir * 8)} ${f(fx + cw)},${yo}" ${SO}/>`;
  };
  /** O mesmo motivo na borda vertical, em fy, na coluna xo (dir 1 = para a direita). */
  const vMotif = (fy, xo, dir) => {
    if (edgeKind === 'bars') return `<rect x="${f(dir > 0 ? xo : xo - 8)}" y="${f(fy + cw / 4)}" width="8" height="${f(cw / 2)}" ${SO}/>`;
    if (edgeKind === 'arcs') return `<path d="M ${xo} ${f(fy)} A ${cw / 2} ${cw / 2} 0 0 ${dir > 0 ? 1 : 0} ${xo} ${f(fy + cw)}" ${SO}/>`;
    if (edgeKind === 'diamonds') { const mx = xo + dir * 4, my = fy + cw / 2; return `<path d="M ${f(mx)} ${f(my - 6)} L ${f(mx + 4)} ${f(my)} L ${f(mx)} ${f(my + 6)} L ${f(mx - 4)} ${f(my)} Z" ${FG}/>`; }
    return `<polyline points="${xo},${f(fy)} ${f(xo + dir * 8)},${f(fy + cw / 2)} ${xo},${f(fy + cw)}" ${SO}/>`;
  };
  const nT = Math.max(2, Math.floor((w - 2 * (m + cs + 12)) / (cw + 6)));
  const sx = (w - nT * (cw + 6) + 6) / 2;
  for (let i = 0; i < nT; i++) {
    const fx = sx + i * (cw + 6);
    for (const [yo, dir] of [[iM, -1], [h - iM, 1]]) parts.push(hMotif(fx, yo, dir));
  }

  // Side repeating motif
  const nS = Math.max(2, Math.floor((h - 2 * (m + cs + 12)) / (cw + 6)));
  const sy2 = (h - nS * (cw + 6) + 6) / 2;
  for (let i = 0; i < nS; i++) {
    const fy = sy2 + i * (cw + 6);
    for (const [xo, dir] of [[iM, 1], [w - iM, -1]]) parts.push(vMotif(fy, xo, dir));
  }
  return parts.join('\n');
}

/**
 * Canto Art Deco a partir de (ox, oy). O seed escolhe o traçado (linhas em degraus · arcos
 * concêntricos · esquadros), os raios (leque de diagonais · nenhum · marcas na borda) e o
 * remate (disco · quarto de disco · losango). Complexity = quantidade de degraus e raios.
 * @returns {string} elementos SVG
 */
export function genADCorner(ox, oy, sz, comp, rnd, SO, FG, sw) {
  const parts = [];
  const lineKind = pickOne(['stepped', 'arcs', 'squares'], rnd);
  const rayKind = pickOne(['fan', 'none', 'ticks'], rnd);
  const endKind = pickOne(['disc', 'quarter', 'diamond'], rnd);
  const steps = 4 + Math.round(comp * 8);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const d = sz * t;
    if (lineKind === 'arcs') {
      if (i > 0) parts.push(`<path d="M ${f(ox + d)} ${f(oy)} A ${f(d)} ${f(d)} 0 0 1 ${f(ox)} ${f(oy + d)}" ${SO}/>`);
    } else if (lineKind === 'squares') {
      if (i > 0) parts.push(`<polyline points="${f(ox + d)},${f(oy)} ${f(ox + d)},${f(oy + d)} ${f(ox)},${f(oy + d)}" ${SO}/>`);
    } else {
      parts.push(`<line x1="${f(ox)}" y1="${f(oy + d)}" x2="${f(ox + sz - d)}" y2="${f(oy + d)}" ${SO}/>`);
      parts.push(`<line x1="${f(ox + d)}" y1="${f(oy)}" x2="${f(ox + d)}" y2="${f(oy + sz - d)}" ${SO}/>`);
    }
  }
  const diags = 2 + Math.round(comp * 4);
  if (rayKind !== 'none') {
    for (let i = 0; i <= diags; i++) {
      const a = (i / diags) * Math.PI / 2;
      const [ex, ey] = pt(ox, oy, sz, a);
      const [sx, sy] = rayKind === 'ticks' ? pt(ox, oy, sz * 1.08, a) : [ox, oy];
      const [tx, ty] = rayKind === 'ticks' ? pt(ox, oy, sz * 1.2, a) : [ex, ey];
      parts.push(`<line x1="${f(sx)}" y1="${f(sy)}" x2="${f(tx)}" y2="${f(ty)}" ${SO}/>`);
    }
  }
  const er = sz * 0.07;
  if (endKind === 'quarter') parts.push(`<path d="M ${f(ox)} ${f(oy)} L ${f(ox + er * 2)} ${f(oy)} A ${f(er * 2)} ${f(er * 2)} 0 0 1 ${f(ox)} ${f(oy + er * 2)} Z" ${FG}/>`);
  else if (endKind === 'diamond') parts.push(`<path d="${polyPath(ox, oy, er * 1.6, 4, 0)}" ${FG}/>`);
  else parts.push(`<circle cx="${f(ox)}" cy="${f(oy)}" r="${f(er)}" ${FG}/>`);
  return parts.join('\n');
}

/**
 * Ornamento Art Deco: treliça de células ao redor de um miolo. O seed escolhe a célula
 * (losango · círculo · quadrado · chevron), o contorno da treliça (losango · quadrado · círculo
 * · cruz) e o miolo (octógono · sol · zigurate). Complexity = densidade da treliça.
 * @returns {string} elementos SVG
 */
export function genADOrn(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const cellKind = pickOne(['diamond', 'circle', 'square', 'chevron'], rnd);
  const footKind = pickOne(['diamond', 'square', 'circle', 'cross'], rnd);
  const coreKind = pickOne(['octagon', 'sun', 'step'], rnd);
  const n = Math.round(3 + comp * 5);
  const arm = Math.max(1, Math.round(n / 4));
  /** Contorno da treliça: a célula (i, j) entra no desenho? */
  const inside = (i, j) => {
    if (footKind === 'square') return true;
    if (footKind === 'circle') return i * i + j * j <= n * n;
    if (footKind === 'cross') return Math.min(Math.abs(i), Math.abs(j)) <= arm;
    return Math.abs(i) + Math.abs(j) <= n;
  };
  for (let i = -n; i <= n; i++) {
    for (let j = -n; j <= n; j++) {
      if (!inside(i, j)) continue;
      const px = cx + i * sz * 0.4 / n;
      const py = cy + j * sz * 0.4 / n;
      const r = sz * 0.4 / n * 0.42;
      if (cellKind === 'circle') parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(r * 0.8)}" ${SO}/>`);
      else if (cellKind === 'square') parts.push(`<rect x="${f(px - r * 0.7)}" y="${f(py - r * 0.7)}" width="${f(r * 1.4)}" height="${f(r * 1.4)}" ${SO}/>`);
      else if (cellKind === 'chevron') parts.push(`<polyline points="${f(px - r)},${f(py - r * 0.5)} ${f(px)},${f(py + r * 0.5)} ${f(px + r)},${f(py - r * 0.5)}" ${SO}/>`);
      else parts.push(`<path d="M ${f(px)} ${f(py - r)} L ${f(px + r)} ${f(py)} L ${f(px)} ${f(py + r)} L ${f(px - r)} ${f(py)} Z" ${SO}/>`);
    }
  }
  if (coreKind === 'sun') parts.push(`<path d="${starPath(cx, cy, sz * 0.12, sz * 0.06, 12)}" ${FG}/>`);
  else if (coreKind === 'step') parts.push(`<path d="${steppedDiamondPath(cx, cy, 3, sz * 0.1, sz * 0.1)}" ${FG}/>`);
  else parts.push(`<path d="${polyPath(cx, cy, sz * 0.09, 8, Math.PI / 8)}" ${FG}/>`);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.035)}" fill="${PALETTES[state.pal].bg}"/>`);
  return parts.join('\n');
}
