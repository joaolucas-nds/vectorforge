// src/core/silhouette.js
// Silhueta de um SVG gerado, por GEOMETRIA (sem rasterizar, sem dependência): percorre paths,
// círculos, elipses, retângulos, linhas e polylines, amostra o traçado e marca as células de uma
// malha grossa G×G que ele toca. É «o que se lê na miniatura» (F5, DEC-020).
// Uma fonte só para o produto e para os instrumentos (DEC-022): a anti-repetição do R e do Surprise
// (`explore.js`) e o `npm run seeds` usam estas mesmas funções. Até a v0.10.0 morava em
// `scripts/silhouette.mjs`.
// Aproximações declaradas: o traço não tem espessura; preenchimento não conta (só o traçado marca
// célula); de `transform`, só `translate` e `scale` em `<g>` (o Botânico usa).
// Calibrada em 2026-11-17 contra a sonda rasterizada `../261117-sonda-silhueta/` (ver DEC-020).
// Limite medido em 2026-11-19 (análise 261119): ela vê ONDE há tinta, não QUE forma ela tem — dois
// motivos diferentes dentro do mesmo contorno podem dar IoU ≥ 0,8. Por isso a anti-repetição não
// usa só ela: soma as escolhas do `pickOne` (`recordChoices`, em utils.js).

const NUM = /-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi;

/**
 * Células da malha G×G tocadas pelo traçado do SVG.
 * @param {string} svg - elementos SVG (saída de generateContent)
 * @param {number} W - largura do canvas
 * @param {number} H - altura do canvas
 * @param {number} [G=16] - lado da malha
 * @returns {Set<number>} índices das células (y*G + x)
 */
export function occupancy(svg, W, H, G = 16) {
  const cells = new Set(), cw = W / G, ch = H / G, step = Math.min(cw, ch) / 2;
  const tf = [[0, 0, 1]]; // pilha de transformações dos <g>: [tx, ty, escala] acumulados
  const mark = (x0, y0) => { const [tx, ty, k] = tf[tf.length - 1], x = tx + k * x0, y = ty + k * y0; if (x >= 0 && y >= 0 && x < W && y < H) cells.add(Math.floor(y / ch) * G + Math.floor(x / cw)); };
  const seg = (x1, y1, x2, y2) => { const n = Math.max(1, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / step)); for (let i = 0; i <= n; i++) mark(x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n); };
  const ring = (cx, cy, rx, ry) => { const n = Math.max(8, Math.ceil(2 * Math.PI * Math.max(rx, ry) / step)); let px = cx + rx, py = cy; for (let i = 1; i <= n; i++) { const a = 2 * Math.PI * i / n, x = cx + rx * Math.cos(a), y = cy + ry * Math.sin(a); seg(px, py, x, y); px = x; py = y; } };
  const attr = (tag, k) => { const m = tag.match(new RegExp(`\\s${k}="([^"]*)"`)); return m ? m[1] : null; };
  const num = (tag, k) => +(attr(tag, k) || 0);
  for (const tag of svg.match(/<\/?\w+[^>]*>/g) || []) {
    if (tag.startsWith('</')) { if (tag === '</g>' && tf.length > 1) tf.pop(); continue; }
    const name = tag.match(/<(\w+)/)[1];
    if (name === 'g') {
      // translate(a b) e scale(s), nessa ordem, como o Botânico escreve; o resto da string é ignorado
      const tr = attr(tag, 'transform') || '', mt = tr.match(/translate\(\s*([-\d.e]+)[\s,]+([-\d.e]+)\s*\)/), ms = tr.match(/scale\(\s*([-\d.e]+)/);
      const [px, py, pk] = tf[tf.length - 1], a = mt ? +mt[1] : 0, b = mt ? +mt[2] : 0, s = ms ? +ms[1] : 1;
      if (!tag.endsWith('/>')) tf.push([px + pk * a, py + pk * b, pk * s]);
      continue;
    }
    if (name === 'circle') ring(num(tag, 'cx'), num(tag, 'cy'), num(tag, 'r'), num(tag, 'r'));
    else if (name === 'ellipse') ring(num(tag, 'cx'), num(tag, 'cy'), num(tag, 'rx'), num(tag, 'ry'));
    else if (name === 'line') seg(num(tag, 'x1'), num(tag, 'y1'), num(tag, 'x2'), num(tag, 'y2'));
    else if (name === 'rect') { const x = num(tag, 'x'), y = num(tag, 'y'), w = num(tag, 'width'), h = num(tag, 'height'); seg(x, y, x + w, y); seg(x + w, y, x + w, y + h); seg(x + w, y + h, x, y + h); seg(x, y + h, x, y); }
    else if (name === 'polyline' || name === 'polygon') { const p = (attr(tag, 'points') || '').match(NUM).map(Number); for (let i = 2; i + 1 < p.length; i += 2) seg(p[i - 2], p[i - 1], p[i], p[i + 1]); }
    else if (name === 'path') walkPath(attr(tag, 'd') || '', seg);
  }
  return cells;
}

/** Percorre um atributo d (M L H V Q C A Z, absolutos) chamando seg() em cada trecho amostrado. */
function walkPath(d, seg) {
  const toks = d.match(/[MLHVQCAZ]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi) || [];
  let i = 0, cmd = '', x = 0, y = 0, sx = 0, sy = 0;
  const n = () => +toks[i++];
  const curve = (pts) => { let px = x, py = y; for (let k = 1; k <= 8; k++) { const t = k / 8; const [qx, qy] = bez(pts, t); seg(px, py, qx, qy); px = qx; py = qy; } };
  while (i < toks.length) {
    if (/[A-Z]/i.test(toks[i])) cmd = toks[i++].toUpperCase();
    if (cmd === 'Z') { seg(x, y, sx, sy); x = sx; y = sy; continue; }
    if (cmd === 'M') { x = sx = n(); y = sy = n(); cmd = 'L'; continue; }
    if (cmd === 'L') { const nx = n(), ny = n(); seg(x, y, nx, ny); x = nx; y = ny; }
    else if (cmd === 'H') { const nx = n(); seg(x, y, nx, y); x = nx; }
    else if (cmd === 'V') { const ny = n(); seg(x, y, x, ny); y = ny; }
    else if (cmd === 'Q') { const c = [x, y, n(), n(), n(), n()]; curve(c); x = c[4]; y = c[5]; }
    else if (cmd === 'C') { const c = [x, y, n(), n(), n(), n(), n(), n()]; curve(c); x = c[6]; y = c[7]; }
    else if (cmd === 'A') { const rx = n(), ry = n(), rot = n(), la = n(), sw = n(), nx = n(), ny = n(); arc(x, y, rx, ry, rot, la, sw, nx, ny, seg); x = nx; y = ny; }
    else i++; // comando não suportado: pula o número
  }
}

/** Ponto t de uma Bézier quadrática ([x0,y0,x1,y1,x2,y2]) ou cúbica (8 números). */
function bez(p, t) {
  const u = 1 - t;
  if (p.length === 6) return [u * u * p[0] + 2 * u * t * p[2] + t * t * p[4], u * u * p[1] + 2 * u * t * p[3] + t * t * p[5]];
  return [u * u * u * p[0] + 3 * u * u * t * p[2] + 3 * u * t * t * p[4] + t * t * t * p[6], u * u * u * p[1] + 3 * u * u * t * p[3] + 3 * u * t * t * p[5] + t * t * t * p[7]];
}

/** Arco SVG (forma de extremidades) convertido para centro + ângulos e amostrado (SVG 1.1, F.6.5). */
function arc(x1, y1, rx, ry, rotDeg, la, sw, x2, y2, seg) {
  if (!rx || !ry) { seg(x1, y1, x2, y2); return; }
  const phi = rotDeg * Math.PI / 180, c = Math.cos(phi), s = Math.sin(phi);
  const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2, xp = c * dx + s * dy, yp = -s * dx + c * dy;
  rx = Math.abs(rx); ry = Math.abs(ry);
  const lam = xp * xp / (rx * rx) + yp * yp / (ry * ry); if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam); }
  const num = rx * rx * ry * ry - rx * rx * yp * yp - ry * ry * xp * xp, den = rx * rx * yp * yp + ry * ry * xp * xp;
  const co = (la === sw ? -1 : 1) * Math.sqrt(Math.max(0, num / den));
  const cxp = co * rx * yp / ry, cyp = -co * ry * xp / rx;
  const cx = c * cxp - s * cyp + (x1 + x2) / 2, cy = s * cxp + c * cyp + (y1 + y2) / 2;
  const ang = (ux, uy, vx, vy) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
  const t1 = ang(1, 0, (xp - cxp) / rx, (yp - cyp) / ry);
  let dt = ang((xp - cxp) / rx, (yp - cyp) / ry, (-xp - cxp) / rx, (-yp - cyp) / ry);
  if (!sw && dt > 0) dt -= 2 * Math.PI; else if (sw && dt < 0) dt += 2 * Math.PI;
  const k = Math.max(4, Math.ceil(Math.abs(dt) * Math.max(rx, ry) / 6));
  let px = x1, py = y1;
  for (let i = 1; i <= k; i++) { const t = t1 + dt * i / k, ex = rx * Math.cos(t), ey = ry * Math.sin(t); const qx = c * ex - s * ey + cx, qy = s * ex + c * ey + cy; seg(px, py, qx, qy); px = qx; py = qy; }
}

/**
 * Semelhança entre duas ocupações: IoU (interseção ÷ união das células), 1 = mesma silhueta.
 * Duas ocupações vazias contam como iguais.
 * @param {Set<number>} a
 * @param {Set<number>} b
 * @returns {number} 0–1
 */
export function silhouetteIoU(a, b) {
  let inter = 0; for (const c of a) if (b.has(c)) inter++;
  const uni = a.size + b.size - inter;
  return uni ? inter / uni : 1;
}

/**
 * Quanto a silhueta muda entre as amostras: média de 1 − IoU sobre todos os pares, em %.
 * @param {Set<number>[]} sets - ocupações (uma por seed)
 * @returns {number} 0–100, com 1 casa decimal
 */
export function silhouetteChange(sets) {
  let sum = 0, n = 0;
  for (let i = 0; i < sets.length; i++) for (let j = i + 1; j < sets.length; j++) { sum += 1 - silhouetteIoU(sets[i], sets[j]); n++; }
  return n ? Math.round(sum / n * 1000) / 10 : 0;
}
