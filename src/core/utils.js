// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.

export const TAU = Math.PI * 2;
export const f = n => Math.round(n * 100) / 100;

export function mkRand(seed) {
  let s = (seed ^ 0xDEADBEEF) >>> 0;
  return () => {
    s = Math.imul(s ^ (s >>> 15), s | 1);
    s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
    return ((s ^ (s >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Simplex Noise 2D ─────────────────────────────────────────────────────────
// Adaptado de Stefan Gustavson (MIT) — pura matemática, zero dependências.
// snoise(x, y) → float em [-1, 1] com coerência espacial (gradiente suave).
export const _snGrad3 = [
  [ 1, 1, 0], [-1, 1, 0], [ 1,-1, 0], [-1,-1, 0],
  [ 1, 0, 1], [-1, 0, 1], [ 1, 0,-1], [-1, 0,-1],
  [ 0, 1, 1], [ 0,-1, 1], [ 0, 1,-1], [ 0,-1,-1],
];
const _snPerm = new Uint8Array(512), _snPMod12 = new Uint8Array(512);

export function snoiseSetSeed(seed) {
  /** Reinicializa a tabela de permutação deterministicamente via mkRand.
   *  Deve ser chamada no início de generateContent() para garantir que
   *  o ruído é reproducível sempre que o mesmo seed é usado. */
  const r = mkRand(seed);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) {
    _snPerm[i] = p[i & 255];
    _snPMod12[i] = _snPerm[i] % 12;
  }
}

export function snoise(xin, yin) {
  /** Simplex Noise 2D: retorna float em [-1, 1].
   *  Isótropo, sem artefatos de grade quadrada — superior ao Perlin para ornamentos. */
  const F2 = 0.5 * (Math.sqrt(3) - 1), G2 = (3 - Math.sqrt(3)) / 6;
  const s  = (xin + yin) * F2;
  const i  = Math.floor(xin + s), j = Math.floor(yin + s);
  const t  = (i + j) * G2;
  const x0 = xin - (i - t), y0 = yin - (j - t);
  const i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1;
  const x1 = x0 - i1 + G2,    y1 = y0 - j1 + G2;
  const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
  const ii = i & 255, jj = j & 255;
  const dot = (g, x, y) => g[0] * x + g[1] * y;
  let n0 = 0, n1 = 0, n2 = 0;
  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * dot(_snGrad3[_snPMod12[ii + _snPerm[jj]]], x0, y0); }
  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * dot(_snGrad3[_snPMod12[ii + i1 + _snPerm[jj + j1]]], x1, y1); }
  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * dot(_snGrad3[_snPMod12[ii + 1 + _snPerm[jj + 1]]], x2, y2); }
  return 70 * (n0 + n1 + n2);
}

export function pt(cx, cy, r, a) { return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
export function polyPath(cx, cy, r, n, rot = -Math.PI / 2) {
  const pts = Array.from({ length: n }, (_, i) => pt(cx, cy, r, rot + i * TAU / n));
  return 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + ' Z';
}
export function starPath(cx, cy, r1, r2, n, rot = -Math.PI / 2) {
  const pts = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? r1 : r2;
    pts.push(pt(cx, cy, r, rot + i * Math.PI / n));
  }
  return 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + ' Z';
}
export function curvePath(pts, closed = false) {
  if (pts.length < 2) return '';
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1], curr = pts[i];
    const mx = (prev[0] + curr[0]) / 2, my = (prev[1] + curr[1]) / 2;
    d += ` Q ${f(prev[0])} ${f(prev[1])} ${f(mx)} ${f(my)}`;
  }
  if (closed) d += ' Z';
  return d;
}
// ── Primitivas da F5 (variedade semeada, DEC-018) ────────────────────────────

/**
 * Sorteia um item da lista com o PRNG semeado. É a «escolha semeada» da F5: o seed decide
 * QUAL variante de motivo, arranjo ou acabamento entra, não só um número.
 * @template T
 * @param {T[]} list - alternativas (a ordem importa: mesmo seed, mesma escolha)
 * @param {() => number} rnd - PRNG semeado (mkRand)
 * @returns {T}
 */
export function pickOne(list, rnd) { return list[Math.floor(rnd() * list.length)]; }

/**
 * Losango em degraus («zigurate» Art Deco): sobe em `levels` degraus até o topo e espelha
 * para baixo. Com levels = 1 vira um retângulo; quanto mais degraus, mais escalonado.
 * @param {number} cx - centro x
 * @param {number} cy - centro y (linha de base do espelho)
 * @param {number} levels - quantidade de degraus por metade (>= 1)
 * @param {number} w0 - meia-largura da base
 * @param {number} h0 - altura de cada metade
 * @returns {string} atributo d de um path fechado
 */
export function steppedDiamondPath(cx, cy, levels, w0, h0) {
  const L = Math.max(1, Math.round(levels)), hs = h0 / L;
  const half = [];
  for (let k = 0; k < L; k++) { const wk = w0 * (1 - k / L); half.push([-wk, k * hs], [-wk, (k + 1) * hs]); }
  // metade de cima: sobe pela esquerda, desce pela direita; a de baixo é o espelho vertical
  const up = [...half.map(([x, y]) => [x, -y]), ...half.slice().reverse().map(([x, y]) => [-x, -y])];
  const down = up.map(([x, y]) => [-x, -y]);
  const pts = [...up, ...down].filter((p, i, a) => i === 0 || p[0] !== a[i - 1][0] || p[1] !== a[i - 1][1]);
  return 'M ' + pts.map(([x, y]) => `${f(cx + x)} ${f(cy + y)}`).join(' L ') + ' Z';
}

/**
 * Polígono estrelado {n/k}: liga cada vértice ao k-ésimo seguinte. Quando n e k têm divisor
 * comum, a figura se parte em mdc(n, k) laços (ex.: {6/2} = dois triângulos), cada um com seu M…Z.
 * @param {number} cx
 * @param {number} cy
 * @param {number} r - raio dos vértices
 * @param {number} n - número de vértices (>= 5 para haver estrela)
 * @param {number} k - salto (1 = polígono comum)
 * @param {number} [rot] - rotação inicial
 * @returns {string} atributo d
 */
export function polygramPath(cx, cy, r, n, k, rot = -Math.PI / 2) {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const g = gcd(n, k), len = n / g;
  let d = '';
  for (let s = 0; s < g; s++) {
    const pts = Array.from({ length: len }, (_, i) => pt(cx, cy, r, rot + ((s + i * k) % n) * TAU / n));
    d += (d ? ' ' : '') + 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + ' Z';
  }
  return d;
}
