// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild). F5 lote 3 (DEC-019): cada gerador
// recebe ESCOLHAS semeadas (variante de motivo, arranjo, acabamento) — o desenho original de
// cada um continua sendo uma das variantes. Complexity segue sendo densidade.
// `genBQCartouche` e `genBQAcanthus` também servem o Vitoriano (cartouche, flourish): o parâmetro
// `style` troca o repertório, para os dois estilos não desenharem a mesma coisa.


import { TAU, f, pt, polyPath, pickOne, spiralPath, shellFanPaths } from '../core/utils.js';


/** Contorno + nervuras de uma concha, como dois elementos SVG. */
function shell(cx, cy, R, a, k, SO) {
  const [o, r] = shellFanPaths(cx, cy, R, a, k);
  return `<path d="${o}" ${SO}/>\n<path d="${r}" ${SO}/>`;
}

/**
 * Pontos de uma elipse, para contas e recortes ao redor dela.
 * @returns {number[][]} k pontos, começando no topo
 */
function ellipsePts(cx, cy, rx, ry, k) {
  return Array.from({ length: k }, (_, i) => { const a = (i / k) * TAU - Math.PI / 2; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
}

/**
 * Medalhão barroco: moldura oval, volutas empilhadas, coroa e base. O seed escolhe a moldura
 * (oval dupla · oval com contas · oval recortada), a voluta (C · S · folha), a coroa (três
 * esferas · concha · remate · nenhuma) e a base (laço · laço duplo · nenhuma).
 * Complexity = quantidade de volutas (e volutas menores a partir de 0,5).
 * @returns {string} elementos SVG
 */
export function genBQMedallion(cx, cy, sz, layers, comp, sym, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const frameKind = pickOne(['double', 'beaded', 'scalloped'], rnd);
  const scrollKind = pickOne(['c', 's', 'leaf'], rnd);
  const crownKind = pickOne(['balls', 'shell', 'finial', 'none'], rnd);
  const baseKind = pickOne(['swag', 'double', 'none'], rnd);
  const rx = sz * 0.48, ry = sz * 0.44;
  if (frameKind === 'scalloped') {
    // oval recortada: um arco por gomo, todos num path
    const p = ellipsePts(cx, cy, rx, ry, 18);
    let d = `M ${f(p[0][0])} ${f(p[0][1])}`;
    for (let i = 1; i <= p.length; i++) { const q = p[i % p.length]; const ch = Math.hypot(q[0] - p[i - 1][0], q[1] - p[i - 1][1]); d += ` A ${f(ch * 0.6)} ${f(ch * 0.6)} 0 0 1 ${f(q[0])} ${f(q[1])}`; }
    parts.push(`<path d="${d} Z" ${SO}/>`);
  } else parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" ${SO}/>`);
  parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx * 0.82)}" ry="${f(ry * 0.82)}" ${SO}/>`);
  if (frameKind === 'beaded') for (const [bx, by] of ellipsePts(cx, cy, rx * 0.91, ry * 0.91, 24 + Math.round(comp * 16))) parts.push(`<circle cx="${f(bx)}" cy="${f(by)}" r="${f(sz * 0.011)}" ${FG}/>`);

  // Scrollwork
  function scroll(bx, by, s, dir) {
    const ex = bx + dir * s * 0.7, ey = by + s * 0.55;
    if (scrollKind === 's') {
      parts.push(`<path d="M ${f(bx)} ${f(by)} C ${f(bx + dir * s * 0.6)} ${f(by - s * 0.3)} ${f(bx + dir * s * 0.2)} ${f(by + s * 0.6)} ${f(bx + dir * s * 0.8)} ${f(by + s * 0.5)}" ${SO}/>`);
      parts.push(`<circle cx="${f(bx + dir * s * 0.86)}" cy="${f(by + s * 0.5)}" r="${f(s * 0.08)}" ${FG}/>`);
      return;
    }
    if (scrollKind === 'leaf') {
      parts.push(`<path d="M ${f(bx)} ${f(by)} Q ${f(bx + dir * s * 0.9)} ${f(by - s * 0.3)} ${f(ex)} ${f(ey)} Q ${f(bx + dir * s * 0.3)} ${f(by + s * 0.5)} ${f(bx)} ${f(by)} Z" ${FG}/>`);
      return;
    }
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
  const top = cy - ry;
  if (crownKind === 'balls') {
    for (const [ox, oy, r] of [[0, -sz * 0.5 - 10, 9], [10, -sz * 0.5 - 5, 6], [-10, -sz * 0.5 - 5, 6]]) {
      parts.push(`<circle cx="${f(cx + ox)}" cy="${f(cy + oy)}" r="${r}" ${SO}/>`);
      parts.push(`<circle cx="${f(cx + ox)}" cy="${f(cy + oy)}" r="${f(r * 0.38)}" ${FG}/>`);
    }
  } else if (crownKind === 'shell') parts.push(shell(cx, top - 2, sz * 0.1, -Math.PI / 2, 7, SO));
  else if (crownKind === 'finial') {
    parts.push(`<path d="${polyPath(cx, top - sz * 0.05, sz * 0.04, 4)}" ${FG}/>`);
    parts.push(`<circle cx="${f(cx)}" cy="${f(top - sz * 0.12)}" r="${f(sz * 0.022)}" ${SO}/>`);
  }

  const br = sz * 0.1;
  if (baseKind !== 'none') parts.push(`<path d="M ${f(cx - br * 2.5)} ${f(cy + ry)} Q ${f(cx)} ${f(cy + ry + br)} ${f(cx + br * 2.5)} ${f(cy + ry)}" ${SO}/>`);
  if (baseKind === 'double') parts.push(`<path d="M ${f(cx - br * 1.6)} ${f(cy + ry + br * 0.5)} Q ${f(cx)} ${f(cy + ry + br * 1.4)} ${f(cx + br * 1.6)} ${f(cy + ry + br * 0.5)}" ${SO}/>`);

  return parts.join('\n');
}

/**
 * Moldura barroca de cantos arredondados. O seed escolhe o canto (voluta · concha em quarto
 * de leque · roseta), o ornamento lateral (folhagem · oval · concha) e o filete (duplo ·
 * com contas · triplo). Complexity = quantidade de ornamentos laterais e o tamanho deles.
 * @returns {string} elementos SVG
 */
export function genBQFrame(x, y, w, h, comp, rnd, SO, FG, sw) {
  const parts = [];
  const cornerKind = pickOne(['scroll', 'shell', 'rosette'], rnd);
  const sideKind = pickOne(['foliage', 'oval', 'shell'], rnd);
  const borderKind = pickOne(['double', 'beaded', 'triple'], rnd);
  const m = 12;
  const rx = Math.min(w, h) * 0.08;
  function rRect(x2, y2, ww, hh, r) {
    return `M ${f(x2 + r)} ${y2} L ${f(x2 + ww - r)} ${y2} Q ${x2 + ww} ${y2} ${x2 + ww} ${f(y2 + r)} L ${x2 + ww} ${f(y2 + hh - r)} Q ${x2 + ww} ${y2 + hh} ${f(x2 + ww - r)} ${y2 + hh} L ${f(x2 + r)} ${y2 + hh} Q ${x2} ${y2 + hh} ${x2} ${f(y2 + hh - r)} L ${x2} ${f(y2 + r)} Q ${x2} ${y2} ${f(x2 + r)} ${y2} Z`;
  }
  parts.push(`<path d="${rRect(m, m, w - 2 * m, h - 2 * m, rx)}" ${SO}/>`);
  if (borderKind === 'triple') parts.push(`<path d="${rRect(m + 4, m + 4, w - 2 * (m + 4), h - 2 * (m + 4), rx * 0.85)}" ${SO}/>`);
  parts.push(`<path d="${rRect(m + 9, m + 9, w - 2 * (m + 9), h - 2 * (m + 9), rx * 0.65)}" ${SO}/>`);
  if (borderKind === 'beaded') {
    // contas entre os dois filetes, só nos trechos retos
    const b = m + 4.5;
    for (let px = m + rx + 6; px <= w - m - rx - 6; px += 14) for (const py of [b, h - b]) parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="1.6" ${FG}/>`);
    for (let py = m + rx + 6; py <= h - m - rx - 6; py += 14) for (const px of [b, w - b]) parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="1.6" ${FG}/>`);
  }

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
  if (cornerKind === 'scroll') {
    cs(m + rx + 8, m + 8, 1, 1, csz); cs(w - m - rx - 8, m + 8, -1, 1, csz);
    cs(w - m - rx - 8, h - m - 8, -1, -1, csz); cs(m + rx + 8, h - m - 8, 1, -1, csz);
  } else {
    for (const [dx, dy] of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) {
      const bx = dx > 0 ? m + 9 : w - m - 9, by = dy > 0 ? m + 9 : h - m - 9;
      if (cornerKind === 'shell') {
        // quarto de leque abrindo para dentro da moldura, na diagonal do canto
        parts.push(shell(bx + dx * csz * 0.15, by + dy * csz * 0.15, csz * 0.6, Math.atan2(dy, dx), 6, SO));
      } else {
        const rcx = bx + dx * csz * 0.45, rcy = by + dy * csz * 0.45, rr = csz * 0.16;
        for (let k = 0; k < 6; k++) { const [px, py] = pt(rcx, rcy, rr * 1.5, k * TAU / 6); parts.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(rr * 0.75)}" ${SO}/>`); }
        parts.push(`<circle cx="${f(rcx)}" cy="${f(rcy)}" r="${f(rr * 0.7)}" ${FG}/>`);
      }
    }
  }

  // Side foliage
  const nl = 1 + Math.round(comp * 2);
  for (let i = 0; i < nl; i++) {
    const t = (i + 0.5) / nl;
    const ly = m + (h - 2 * m) * t;
    const ls = 14 + comp * 12;
    for (const [lx, dir] of [[m + 3, 1], [w - m - 3, -1]]) {
      if (sideKind === 'oval') {
        parts.push(`<ellipse cx="${f(lx + dir * 9)}" cy="${f(ly)}" rx="${f(5 + comp * 3)}" ry="${f(ls * 0.8)}" ${SO}/>`);
        parts.push(`<ellipse cx="${f(lx + dir * 9)}" cy="${f(ly)}" rx="${f(2 + comp)}" ry="${f(ls * 0.4)}" ${FG}/>`);
        continue;
      }
      if (sideKind === 'shell') { parts.push(shell(lx + dir * 6, ly, ls * 0.7, dir > 0 ? 0 : Math.PI, 7, SO)); continue; }
      parts.push(`<path d="M ${lx} ${f(ly)} C ${f(lx + dir * ls * 0.6)} ${f(ly - ls * 0.5)} ${f(lx + dir * ls * 0.9)} ${f(ly - ls * 0.9)} ${f(lx + dir * ls * 0.65)} ${f(ly - ls * 1.1)}" ${SO}/>`);
      parts.push(`<path d="M ${lx} ${f(ly)} C ${f(lx + dir * ls * 0.6)} ${f(ly + ls * 0.5)} ${f(lx + dir * ls * 0.9)} ${f(ly + ls * 0.9)} ${f(lx + dir * ls * 0.65)} ${f(ly + ls * 1.1)}" ${SO}/>`);
      parts.push(`<circle cx="${lx}" cy="${f(ly)}" r="3" ${FG}/>`);
    }
  }
  return parts.join('\n');
}

/**
 * Cartela: escudo central com remates nas pontas e crista. Serve o Barroco e o Vitoriano
 * (`style`), cada um com o seu repertório — Barroco: oval · escudo · lobada; volutas em C ·
 * espirais · sem remate; concha · coroa · sem crista. Vitoriano: chanfrada · arqueada · oval;
 * espirais · gavinhas · volutas em C; remate pontudo · laço · sem crista.
 * @param {'baroque'|'victorian'} [style='baroque']
 * @returns {string} elementos SVG
 */
export function genBQCartouche(cx, cy, sz, comp, rnd, SO, FG, FG2, sw, style = 'baroque') {
  const parts = [];
  const vic = style === 'victorian';
  const shape = pickOne(vic ? ['notched', 'arched', 'oval'] : ['oval', 'shield', 'lobed'], rnd);
  const ends = pickOne(vic ? ['volute', 'tendril', 'scroll'] : ['scroll', 'volute', 'none'], rnd);
  const crest = pickOne(vic ? ['finial', 'bow', 'none'] : ['none', 'shell', 'crown'], rnd);
  const rx = sz * 0.45, ry = sz * 0.35;
  /** Contorno da cartela escalado por k em torno do centro. */
  const outline = k => {
    const X = rx * k, Y = ry * k, P = (px, py) => `${f(cx + px)} ${f(cy + py)}`;
    if (shape === 'shield') return `M ${P(-X, -Y)} L ${P(X, -Y)} L ${P(X, Y * 0.2)} Q ${P(X, Y * 0.8)} ${P(0, Y * 1.1)} Q ${P(-X, Y * 0.8)} ${P(-X, Y * 0.2)} Z`;
    if (shape === 'lobed') return `M ${P(-X, 0)} A ${f(X * 0.75)} ${f(Y * 0.9)} 0 0 1 ${P(0, -Y)} A ${f(X * 0.75)} ${f(Y * 0.9)} 0 0 1 ${P(X, 0)} A ${f(X * 0.75)} ${f(Y * 0.9)} 0 0 1 ${P(0, Y)} A ${f(X * 0.75)} ${f(Y * 0.9)} 0 0 1 ${P(-X, 0)} Z`;
    if (shape === 'notched') { const n = Y * 0.3; return `M ${P(-X + n, -Y)} L ${P(X - n, -Y)} A ${f(n)} ${f(n)} 0 0 0 ${P(X, -Y + n)} L ${P(X, Y - n)} A ${f(n)} ${f(n)} 0 0 0 ${P(X - n, Y)} L ${P(-X + n, Y)} A ${f(n)} ${f(n)} 0 0 0 ${P(-X, Y - n)} L ${P(-X, -Y + n)} A ${f(n)} ${f(n)} 0 0 0 ${P(-X + n, -Y)} Z`; }
    if (shape === 'arched') return `M ${P(-X, Y)} L ${P(-X, -Y * 0.3)} A ${f(X)} ${f(Y * 0.7)} 0 0 1 ${P(X, -Y * 0.3)} L ${P(X, Y)} Z`;
    return null;
  };
  if (shape === 'oval') {
    parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" ${SO}/>`);
    parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx * 0.85)}" ry="${f(ry * 0.8)}" ${SO}/>`);
  } else {
    parts.push(`<path d="${outline(1)}" ${SO}/>`);
    parts.push(`<path d="${outline(0.85)}" ${SO}/>`);
  }
  // Scrolled ends
  for (const dir of [-1, 1]) {
    const bx = cx + dir * rx;
    if (ends === 'volute') parts.push(`<path d="${spiralPath(bx + dir * sz * 0.07, cy, sz * 0.07, 1.5, dir, dir > 0 ? Math.PI : 0)}" ${SO}/>`);
    else if (ends === 'tendril') {
      const s = sz * 0.14;
      parts.push(`<path d="M ${f(bx)} ${f(cy)} C ${f(bx + dir * s * 0.5)} ${f(cy - s * 0.6)} ${f(bx + dir * s * 0.6)} ${f(cy + s * 0.4)} ${f(bx + dir * s)} ${f(cy - s * 0.2)}" ${SO}/>`);
      parts.push(`<circle cx="${f(bx + dir * s)}" cy="${f(cy - s * 0.2)}" r="${f(sz * 0.018)}" ${FG}/>`);
    } else if (ends === 'scroll') {
      parts.push(`<path d="M ${f(bx)} ${f(cy - ry * 0.3)} C ${f(bx + dir * sz * 0.1)} ${f(cy - ry * 0.5)} ${f(bx + dir * sz * 0.18)} ${f(cy)} ${f(bx + dir * sz * 0.1)} ${f(cy + ry * 0.5)} L ${f(bx)} ${f(cy + ry * 0.3)}" ${SO}/>`);
    }
  }
  // Crest
  const top = cy - ry - 2;
  if (crest === 'shell') parts.push(shell(cx, top, sz * 0.09, -Math.PI / 2, 7, SO));
  else if (crest === 'crown') for (const [ox, r] of [[0, sz * 0.03], [-sz * 0.06, sz * 0.02], [sz * 0.06, sz * 0.02]]) parts.push(`<circle cx="${f(cx + ox)}" cy="${f(top - r - (ox ? 0 : sz * 0.02))}" r="${f(r)}" ${SO}/>`);
  else if (crest === 'finial') {
    parts.push(`<path d="${polyPath(cx, top - sz * 0.05, sz * 0.04, 4)}" ${FG}/>`);
    parts.push(`<circle cx="${f(cx)}" cy="${f(top - sz * 0.12)}" r="${f(sz * 0.02)}" ${SO}/>`);
  } else if (crest === 'bow') {
    const s = sz * 0.06, by = top - s * 0.6;
    parts.push(`<path d="M ${f(cx)} ${f(by)} C ${f(cx - s * 1.4)} ${f(by - s)} ${f(cx - s * 1.4)} ${f(by + s)} ${f(cx)} ${f(by)} C ${f(cx + s * 1.4)} ${f(by - s)} ${f(cx + s * 1.4)} ${f(by + s)} ${f(cx)} ${f(by)} Z" ${SO}/>`);
    parts.push(`<circle cx="${f(cx)}" cy="${f(by)}" r="${f(s * 0.25)}" ${FG}/>`);
  }
  return parts.join('\n');
}

/**
 * Festão: gomos pendurados num trilho, com pingentes. O seed escolhe o gomo (simples · duplo
 * · arco), o pingente (borla · roseta · pérola · nenhum) e o trilho (linha · com contas ·
 * nenhum). Complexity = quantidade de gomos e o caimento.
 * @returns {string} elementos SVG
 */
export function genBQSwag(x, cy, w, comp, rnd, SO, FG, sw) {
  const parts = [];
  const swagKind = pickOne(['single', 'double', 'arc'], rnd);
  const tasselKind = pickOne(['tassel', 'rosette', 'pearl', 'none'], rnd);
  const railKind = pickOne(['line', 'beaded', 'none'], rnd);
  const segs = 2 + Math.round(comp * 4);
  const segW = w / segs;
  for (let i = 0; i < segs; i++) {
    const sx = x + i * segW, ex = sx + segW;
    const drop = 20 + comp * 30;
    if (swagKind === 'arc') parts.push(`<path d="M ${f(sx)} ${f(cy)} A ${f(segW / 2)} ${f(drop)} 0 0 0 ${f(ex)} ${f(cy)}" ${SO}/>`);
    else parts.push(`<path d="M ${f(sx)} ${f(cy)} Q ${f(sx + segW / 2)} ${f(cy + drop)} ${f(ex)} ${f(cy)}" ${SO}/>`);
    if (swagKind === 'double') parts.push(`<path d="M ${f(sx + segW * 0.12)} ${f(cy)} Q ${f(sx + segW / 2)} ${f(cy + drop * 1.5)} ${f(ex - segW * 0.12)} ${f(cy)}" ${SO}/>`);
    // Tassels
    const tc = cx => {
      if (tasselKind === 'rosette') {
        parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(5 + comp * 2)}" ${SO}/>`);
        parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(2 + comp)}" ${FG}/>`);
      } else if (tasselKind === 'tassel') {
        parts.push(`<line x1="${f(cx)}" y1="${f(cy + drop)}" x2="${f(cx)}" y2="${f(cy + drop + 15 + comp * 10)}" ${SO}/>`);
        parts.push(`<ellipse cx="${f(cx)}" cy="${f(cy + drop + 20 + comp * 10)}" rx="5" ry="7" ${FG}/>`);
      }
    };
    if (i === 0) tc(sx);
    tc(ex);
    if (tasselKind === 'pearl') parts.push(`<ellipse cx="${f(sx + segW / 2)}" cy="${f(cy + drop * (swagKind === 'double' ? 1.25 : 0.5) + 9)}" rx="4" ry="6" ${FG}/>`);
  }
  if (railKind !== 'none') parts.push(`<line x1="${x}" y1="${f(cy)}" x2="${w}" y2="${f(cy)}" ${SO}/>`);
  if (railKind === 'beaded') for (let px = x + 6; px < w; px += 12) parts.push(`<circle cx="${f(px)}" cy="${f(cy - 4)}" r="1.6" ${FG}/>`);
  return parts.join('\n');
}

/**
 * Haste de folhagem: um caule com folhas de cada lado. Serve o Barroco (acanthus) e o
 * Vitoriano (flourish), cada um com o seu repertório — Barroco: voluta · acanto lobado · pena;
 * caule reto · ondulado · sem caule; topo nenhum · botão · concha. Vitoriano: cacho em espiral
 * · gavinha · voluta; caule ondulado · reto · com contas; remate · botão · nenhum. Nos dois, o
 * seed escolhe folhas aos pares ou alternadas. Complexity = quantidade de folhas.
 * @param {'baroque'|'victorian'} [style='baroque']
 * @returns {string} elementos SVG
 */
export function genBQAcanthus(cx, cy, sz, comp, sym, rnd, SO, FG, sw, style = 'baroque') {
  const parts = [];
  const vic = style === 'victorian';
  const leafKind = pickOne(vic ? ['curl', 'tendril', 'scroll'] : ['scroll', 'acanthus', 'feather'], rnd);
  const stemKind = pickOne(vic ? ['wavy', 'line', 'beaded'] : ['line', 'wavy', 'none'], rnd);
  const topKind = pickOne(vic ? ['finial', 'bud', 'none'] : ['none', 'bud', 'shell'], rnd);
  const arrange = pickOne(['paired', 'alternate'], rnd);
  const y0 = cy - sz * 0.48, y1 = cy + sz * 0.48;
  if (stemKind === 'wavy') {
    let d = `M ${f(cx)} ${f(y0)}`; const k = 6;
    for (let i = 1; i <= k; i++) { const ya = y0 + (y1 - y0) * (i - 0.5) / k, yb = y0 + (y1 - y0) * i / k; d += ` Q ${f(cx + (i % 2 ? 1 : -1) * sz * 0.03)} ${f(ya)} ${f(cx)} ${f(yb)}`; }
    parts.push(`<path d="${d}" ${SO}/>`);
  } else if (stemKind !== 'none') parts.push(`<line x1="${f(cx)}" y1="${f(y0)}" x2="${f(cx)}" y2="${f(y1)}" ${SO}/>`);
  function leaf(bx, by, size, dir) {
    const ex = bx + dir * size * 0.72, ey = by + size * 0.52;
    if (leafKind === 'acanthus') {
      // folha lobada: borda de cima em três gomos, volta reta por baixo
      const tx = bx + dir * size * 1.05, ty = by + size * 0.25, nx = -(ty - by), ny = dir * (tx - bx), nl = Math.hypot(nx, ny) || 1;
      let d = `M ${f(bx)} ${f(by)}`;
      for (let s = 1; s <= 3; s++) {
        const ax = bx + (tx - bx) * (s - 0.5) / 3, ay = by + (ty - by) * (s - 0.5) / 3, qx = bx + (tx - bx) * s / 3, qy = by + (ty - by) * s / 3;
        d += ` Q ${f(ax - dir * nx / nl * size * 0.38)} ${f(ay - dir * ny / nl * size * 0.38)} ${f(qx)} ${f(qy)}`;
      }
      d += ` Q ${f((bx + tx) / 2 + dir * nx / nl * size * 0.18)} ${f((by + ty) / 2 + dir * ny / nl * size * 0.18)} ${f(bx)} ${f(by)} Z`;
      parts.push(`<path d="${d}" ${FG}/>`);
      return;
    }
    if (leafKind === 'curl' || leafKind === 'tendril') {
      parts.push(`<path d="M ${f(bx)} ${f(by)} C ${f(bx + dir * size * 0.5)} ${f(by - size * (leafKind === 'curl' ? 0.2 : 0.5))} ${f(bx + dir * size * 0.5)} ${f(by + size * 0.5)} ${f(ex)} ${f(ey)}" ${SO}/>`);
      if (leafKind === 'curl') parts.push(`<path d="${spiralPath(ex + dir * size * 0.12, ey, size * 0.14, 1.25, dir, dir > 0 ? Math.PI : 0)}" ${SO}/>`);
      else parts.push(`<circle cx="${f(ex)}" cy="${f(ey)}" r="${f(size * 0.07)}" ${FG}/>`);
      return;
    }
    const c1x = bx + dir * size * 0.85, c1y = by - size * 0.08;
    const c2x = bx + dir * size * 1.05, c2y = by + size * 0.32;
    parts.push(`<path d="M ${f(bx)} ${f(by)} C ${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(ex)} ${f(ey)}" ${SO}/>`);
    if (leafKind === 'feather') {
      // pena: barbas curtas ao longo da nervura, num path só
      let d = '';
      for (let s = 1; s <= 4; s++) { const t = s / 5, px = bx + (ex - bx) * t, py = by + (ey - by) * t; d += `M ${f(px)} ${f(py)} L ${f(px + dir * size * 0.08)} ${f(py - size * 0.14)} `; }
      parts.push(`<path d="${d.trim()}" ${SO}/>`);
      return;
    }
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
    if (arrange === 'alternate') leaf(cx, by, bs * 1.15, i % 2 ? 1 : -1);
    else { leaf(cx, by, bs, 1); leaf(cx, by, bs, -1); }
    if (stemKind === 'beaded') parts.push(`<circle cx="${f(cx)}" cy="${f(by)}" r="${f(sz * 0.014)}" ${FG}/>`);
  }
  if (topKind === 'bud') parts.push(`<path d="M ${f(cx)} ${f(y0)} Q ${f(cx + sz * 0.035)} ${f(y0 - sz * 0.04)} ${f(cx)} ${f(y0 - sz * 0.1)} Q ${f(cx - sz * 0.035)} ${f(y0 - sz * 0.04)} ${f(cx)} ${f(y0)} Z" ${FG}/>`);
  else if (topKind === 'shell') parts.push(shell(cx, y0, sz * 0.07, -Math.PI / 2, 6, SO));
  else if (topKind === 'finial') {
    parts.push(`<path d="${polyPath(cx, y0 - sz * 0.035, sz * 0.03, 4)}" ${FG}/>`);
    parts.push(`<circle cx="${f(cx)}" cy="${f(y0 - sz * 0.085)}" r="${f(sz * 0.016)}" ${SO}/>`);
  }
  return parts.join('\n');
}
