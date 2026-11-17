// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild). F5 lote 2 (DEC-018): cada gerador
// recebe ESCOLHAS semeadas (variante de motivo, arranjo, acabamento) — o desenho original de
// cada um continua sendo uma das variantes. Complexity segue sendo densidade; Symmetry, eixos.


import { TAU, f, pt, polyPath, starPath, pickOne, polygramPath } from '../core/utils.js';
import { state, PALETTES } from '../core/state.js';


/**
 * Mandala de anéis de pétalas. Reusada por Celta (medallion), Orgânico (mandala), pelo fallback
 * do dispatcher e pelo Text→Form SEM variação: só quem passa `vary = true` (o Geométrico) recebe
 * as escolhas semeadas — a pétala de CADA anel (gota · triângulo · concha · pipa), anéis
 * escalonados ou não, o anel-guia (círculo · polígono) e o miolo (estrela · polígono · anéis).
 * Symmetry = pétalas por anel (n); Complexity = quantidade de anéis (layers).
 * @param {boolean} [vary=false] - liga as escolhas semeadas (só o Geométrico liga)
 * @returns {string} elementos SVG
 */
export function genMandala(cx, cy, sz, n, layers, comp, rnd, SO, FG, FG2, sw, vary = false) {
  const parts = [];
  const stagger = vary && rnd() < 0.5;
  const ringKind = vary ? pickOne(['circle', 'polygon'], rnd) : 'circle';
  const coreKind = vary ? pickOne(['star', 'poly', 'rings'], rnd) : 'star';
  for (let l = 0; l < layers; l++) {
    const t = (l + 1) / (layers + 1);
    const r = sz * 0.48 * t;
    const prevR = l === 0 ? sz * 0.015 : sz * 0.48 * l / (layers + 1);
    const petal = vary ? pickOne(['drop', 'pointed', 'shell', 'kite'], rnd) : 'drop';
    const off = stagger && l % 2 === 1 ? Math.PI / n : 0; // anéis ímpares meio passo girados

    // Petal ring
    for (let i = 0; i < n; i++) {
      const a1 = (i / n) * TAU - Math.PI / 2 + off;
      const a2 = ((i + 1) / n) * TAU - Math.PI / 2 + off;
      const aM = (a1 + a2) / 2;
      const [tx, ty] = pt(cx, cy, r, aM);
      const [b1x, b1y] = pt(cx, cy, prevR, a1);
      const [b2x, b2y] = pt(cx, cy, prevR, a2);
      const d = l % 2 === 0 ? SO : FG;
      if (petal === 'pointed') {
        parts.push(`<path d="M ${f(b1x)} ${f(b1y)} L ${f(tx)} ${f(ty)} L ${f(b2x)} ${f(b2y)} Z" ${d}/>`);
      } else if (petal === 'shell') {
        parts.push(`<path d="M ${f(b1x)} ${f(b1y)} Q ${f(tx)} ${f(ty)} ${f(b2x)} ${f(b2y)}" ${SO}/>`);
      } else if (petal === 'kite') {
        const mr = (prevR + r) / 2;
        const [k1x, k1y] = pt(cx, cy, mr, a1 + (a2 - a1) * 0.2);
        const [k2x, k2y] = pt(cx, cy, mr, a2 - (a2 - a1) * 0.2);
        const [bx, by] = pt(cx, cy, prevR, aM);
        parts.push(`<path d="M ${f(bx)} ${f(by)} L ${f(k1x)} ${f(k1y)} L ${f(tx)} ${f(ty)} L ${f(k2x)} ${f(k2y)} Z" ${d}/>`);
      } else {
        parts.push(`<path d="M ${f(b1x)} ${f(b1y)} Q ${f(tx)} ${f(ty)} ${f(b2x)} ${f(b2y)} Q ${f(cx + (b2x - cx) * 0.1)} ${f(cy + (b2y - cy) * 0.1)} ${f(b1x)} ${f(b1y)}" ${d}/>`);
      }
    }
    if (ringKind === 'polygon') parts.push(`<path d="${polyPath(cx, cy, r, n, -Math.PI / 2 + off)}" ${SO}/>`);
    else parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" ${SO}/>`);
  }
  const sR = sz * 0.055, sR2 = sz * 0.022;
  if (coreKind === 'poly') parts.push(`<path d="${polyPath(cx, cy, sR, n)}" ${FG}/>`);
  else if (coreKind === 'rings') {
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sR * 1.4)}" ${SO}/>`);
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sR)}" ${FG}/>`);
  } else parts.push(`<path d="${starPath(cx, cy, sR, sR2, n)}" ${FG}/>`);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.016)}" fill="${PALETTES[state.pal].bg}"/>`);
  return parts.join('\n');
}

/**
 * Moldura geométrica. O seed escolhe o canto (roseta · quadrados girados · anéis · polígono
 * estrelado), o motivo das bordas (polígonos · estrelas · círculos · ziguezague) e o filete
 * (simples · duplo). Symmetry = lados/pontas dos motivos.
 * @returns {string} elementos SVG
 */
export function genGeoFrame(x, y, w, h, comp, sym, rnd, SO, FG, sw) {
  const parts = [];
  const cornerKind = pickOne(['rosette', 'squares', 'rings', 'polygram'], rnd);
  const edgeKind = pickOne(['polys', 'stars', 'circles', 'zigzag'], rnd);
  const lineKind = pickOne(['single', 'double'], rnd);
  const m = 14;
  parts.push(`<rect x="${m}" y="${m}" width="${w - 2 * m}" height="${h - 2 * m}" ${SO}/>`);
  if (lineKind === 'double') parts.push(`<rect x="${m + 6}" y="${m + 6}" width="${w - 2 * (m + 6)}" height="${h - 2 * (m + 6)}" ${SO}/>`);
  const n = Math.round(4 + sym * 4);
  const cR = Math.min(w, h) * 0.09;
  for (const [bx, by] of [[m, m], [w - m, m], [w - m, h - m], [m, h - m]]) {
    if (cornerKind === 'squares') {
      parts.push(`<path d="${polyPath(bx, by, cR, 4, 0)}" ${SO}/>`);
      parts.push(`<path d="${polyPath(bx, by, cR, 4, Math.PI / 4)}" ${SO}/>`);
      parts.push(`<path d="${polyPath(bx, by, cR * 0.4, 4, Math.PI / 4)}" ${FG}/>`);
    } else if (cornerKind === 'rings') {
      for (const k of [1, 0.7, 0.4]) parts.push(`<circle cx="${bx}" cy="${by}" r="${f(cR * k)}" ${SO}/>`);
      parts.push(`<circle cx="${bx}" cy="${by}" r="${f(cR * 0.16)}" ${FG}/>`);
    } else if (cornerKind === 'polygram') {
      parts.push(`<path d="${polyPath(bx, by, cR, n)}" ${SO}/>`);
      parts.push(`<path d="${polygramPath(bx, by, cR, Math.max(5, n), 2)}" ${SO}/>`);
    } else {
      parts.push(`<circle cx="${bx}" cy="${by}" r="${f(cR)}" ${SO}/>`);
      parts.push(`<path d="${starPath(bx, by, cR * 0.72, cR * 0.3, n)}" ${SO}/>`);
      parts.push(`<circle cx="${bx}" cy="${by}" r="${f(cR * 0.16)}" ${FG}/>`);
    }
  }
  const unit = cR * 1.7;
  /** Um motivo da borda centrado em (px, py). */
  const motif = (px, py) => {
    if (edgeKind === 'stars') return `<path d="${starPath(px, py, unit * 0.3, unit * 0.13, n)}" ${SO}/>`;
    if (edgeKind === 'circles') return `<circle cx="${f(px)}" cy="${f(py)}" r="${f(unit * 0.22)}" ${SO}/>`;
    return `<path d="${polyPath(px, py, unit * 0.28, n)}" ${SO}/>`;
  };
  const useW = w - 2 * m - 2 * cR * 1.2;
  const nP = Math.max(2, Math.floor(useW / unit));
  const pSx = (w - nP * unit) / 2;
  const useH = h - 2 * m - 2 * cR * 1.2;
  const nPH = Math.max(2, Math.floor(useH / unit));
  const pSy = (h - nPH * unit) / 2;
  if (edgeKind === 'zigzag') {
    // um ziguezague contínuo por lado, um dente por unidade
    const amp = unit * 0.22;
    for (const py of [m, h - m]) {
      const pts = Array.from({ length: nP * 2 + 1 }, (_, i) => `${f(pSx + i * unit / 2)},${f(py + (i % 2 ? amp : -amp))}`);
      parts.push(`<polyline points="${pts.join(' ')}" ${SO}/>`);
    }
    for (const px of [m, w - m]) {
      const pts = Array.from({ length: nPH * 2 + 1 }, (_, i) => `${f(px + (i % 2 ? amp : -amp))},${f(pSy + i * unit / 2)}`);
      parts.push(`<polyline points="${pts.join(' ')}" ${SO}/>`);
    }
    return parts.join('\n');
  }
  for (let i = 0; i < nP; i++) {
    const px = pSx + (i + 0.5) * unit;
    for (const py of [m, h - m]) parts.push(motif(px, py));
  }
  for (let i = 0; i < nPH; i++) {
    const py2 = pSy + (i + 0.5) * unit;
    for (const px2 of [m, w - m]) parts.push(motif(px2, py2));
  }
  return parts.join('\n');
}

/**
 * Estrela em camadas. O seed escolhe o desenho de cada camada (estrela comum · polígono
 * estrelado {n/k} · estrela e polígono alternados), o giro entre camadas (progressivo · nenhum ·
 * meio passo alternado) e o miolo (disco · polígono · anel). Symmetry = pontas (n);
 * Complexity = camadas e profundidade das pontas.
 * @returns {string} elementos SVG
 */
export function genGeoStar(cx, cy, sz, n, layers, comp, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const kind = n >= 5 ? pickOne(['star', 'polygram', 'alternate'], rnd) : pickOne(['star', 'alternate'], rnd);
  // o {n/k} com giro progressivo vira um emaranhado (visto no contact sheet): ele usa meio passo
  const rotPick = pickOne(['progressive', 'none', 'half'], rnd);
  const rotKind = kind === 'polygram' && rotPick === 'progressive' ? 'half' : rotPick;
  const coreKind = pickOne(['disc', 'poly', 'ring'], rnd);
  // salto do {n/k}: entre 2 e o maior que ainda forma estrela
  const k = 2 + Math.floor(rnd() * Math.max(1, Math.floor((n - 1) / 2) - 1));
  for (let l = layers; l >= 0; l--) {
    const r1 = sz * 0.48 * (l + 1) / (layers + 1);
    const r2 = r1 * (0.35 + comp * 0.2);
    const rot = rotKind === 'progressive' ? l * Math.PI / (n * 2) : rotKind === 'half' ? (l % 2) * Math.PI / n : 0;
    const d = l % 2 === 0 ? SO : FG;
    if (kind === 'polygram') parts.push(`<path d="${polygramPath(cx, cy, r1, n, k, -Math.PI / 2 + rot)}" ${SO}/>`);
    else if (kind === 'alternate' && l % 2 === 1) parts.push(`<path d="${polyPath(cx, cy, r2 * 1.6, n, -Math.PI / 2 + rot)}" ${d}/>`);
    else parts.push(`<path d="${starPath(cx, cy, r1, r2, n, -Math.PI / 2 + rot)}" ${d}/>`);
  }
  if (coreKind === 'poly') parts.push(`<path d="${polyPath(cx, cy, sz * 0.06, n)}" ${FG}/>`);
  else if (coreKind === 'ring') {
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.07)}" ${SO}/>`);
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.035)}" ${FG}/>`);
  } else parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.05)}" ${FG}/>`);
  return parts.join('\n');
}

/**
 * Símbolo geométrico: contorno, figura inscrita, raios e nós. O seed escolhe o contorno
 * (círculo · polígono · círculo duplo), a figura (polígono · estrela · {n/2}), os raios (aos
 * vértices · aos lados · nenhum), os nós (disco · polígono · nenhum) e o miolo (disco · anel ·
 * polígono). Symmetry = lados (n).
 * @returns {string} elementos SVG
 */
export function genGeoSymbol(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const n = Math.round(3 + sym * 5);
  const outerKind = pickOne(['circle', 'polygon', 'double'], rnd);
  const innerKind = n >= 5 ? pickOne(['polygon', 'star', 'polygram'], rnd) : pickOne(['polygon', 'star'], rnd);
  const spokeKind = pickOne(['vertices', 'midpoints', 'none'], rnd);
  const nodeKind = pickOne(['disc', 'poly', 'none'], rnd);
  const coreKind = pickOne(['disc', 'ring', 'poly'], rnd);
  const R = sz * 0.42;
  if (outerKind === 'polygon') parts.push(`<path d="${polyPath(cx, cy, sz * 0.48, n, -Math.PI / 2 + Math.PI / n)}" ${SO}/>`);
  else parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.48)}" ${SO}/>`);
  if (outerKind === 'double') parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.45)}" ${SO}/>`);
  if (innerKind === 'star') parts.push(`<path d="${starPath(cx, cy, R, R * 0.5, n)}" ${SO}/>`);
  else if (innerKind === 'polygram') parts.push(`<path d="${polygramPath(cx, cy, R, n, 2)}" ${SO}/>`);
  else parts.push(`<path d="${polyPath(cx, cy, R, n)}" ${SO}/>`);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU - Math.PI / 2;
    const [x1, y1] = pt(cx, cy, R, a);
    if (spokeKind === 'vertices') parts.push(`<line x1="${f(cx)}" y1="${f(cy)}" x2="${f(x1)}" y2="${f(y1)}" ${SO}/>`);
    else if (spokeKind === 'midpoints') {
      const [mx, my] = pt(cx, cy, R * Math.cos(Math.PI / n), a + Math.PI / n);
      parts.push(`<line x1="${f(cx)}" y1="${f(cy)}" x2="${f(mx)}" y2="${f(my)}" ${SO}/>`);
    }
    if (nodeKind === 'disc') parts.push(`<circle cx="${f(x1)}" cy="${f(y1)}" r="${f(sz * 0.04)}" ${FG}/>`);
    else if (nodeKind === 'poly') parts.push(`<path d="${polyPath(x1, y1, sz * 0.05, n, a)}" ${FG}/>`);
  }
  if (coreKind === 'ring') {
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.14)}" ${SO}/>`);
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.08)}" ${FG}/>`);
  } else if (coreKind === 'poly') parts.push(`<path d="${polyPath(cx, cy, sz * 0.14, n)}" ${FG}/>`);
  else parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.14)}" ${FG}/>`);
  return parts.join('\n');
}
