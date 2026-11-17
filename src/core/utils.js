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

/**
 * Espiral de Arquimedes (voluta): parte do raio r e enrola até o centro em `turns` voltas.
 * Número de pontos fixo por volta — o seed muda posição e sentido, não a estrutura do path.
 * @param {number} cx - centro x
 * @param {number} cy - centro y
 * @param {number} r - raio inicial (externo)
 * @param {number} turns - voltas (ex.: 1.5)
 * @param {number} [dir=1] - 1 = sentido horário na tela, −1 = anti-horário
 * @param {number} [a0=0] - ângulo inicial
 * @returns {string} atributo d (aberto)
 */
export function spiralPath(cx, cy, r, turns, dir = 1, a0 = 0) {
  const N = Math.max(8, Math.round(24 * turns));
  const pts = Array.from({ length: N + 1 }, (_, i) => { const t = i / N; return pt(cx, cy, r * (1 - t * 0.92), a0 + dir * t * turns * TAU); });
  return 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ');
}

/**
 * Concha em leque: meia-lua voltada para o ângulo `a` e as nervuras saindo do centro.
 * Devolve DOIS atributos d — o contorno (fechado) e as nervuras (um path só, M…L por nervura).
 * @param {number} cx
 * @param {number} cy - centro da base da concha
 * @param {number} R - raio
 * @param {number} a - direção para onde a concha abre (−π/2 = para cima)
 * @param {number} k - quantidade de gomos (nervuras = k − 1)
 * @returns {[string, string]} [contorno, nervuras]
 */
export function shellFanPaths(cx, cy, R, a, k) {
  const [x1, y1] = pt(cx, cy, R, a - Math.PI / 2), [x2, y2] = pt(cx, cy, R, a + Math.PI / 2);
  const outline = `M ${f(x1)} ${f(y1)} A ${f(R)} ${f(R)} 0 0 1 ${f(x2)} ${f(y2)} Z`;
  let ribs = '';
  for (let j = 1; j < k; j++) { const [ex, ey] = pt(cx, cy, R * 0.95, a - Math.PI / 2 + j * Math.PI / k); ribs += `M ${f(cx)} ${f(cy)} L ${f(ex)} ${f(ey)} `; }
  return [outline, ribs.trim()];
}

// ── Esqueleto semeado (F5, DEC-020) ──────────────────────────────────────────

/**
 * Contorno de um desenho radial: devolve r(a), o raio do contorno no ângulo a (y para baixo).
 * É o que deixa a silhueta sair do círculo — anéis, pontas e nós passam a seguir r(a).
 * Tipos: 'circle' · 'ellipse' (opt.sx, opt.sy) · 'polygon' (opt.k lados; vértices em R; opt.rot = direção de um VÉRTICE)
 * · 'star' (opt.k ondas, opt.amp) · 'lozenge' (opt.sx, opt.sy) · 'arch' (topo em semicírculo,
 * base reta a opt.base·R abaixo do centro).
 * @param {string} kind
 * @param {number} R - raio de referência
 * @param {object} [opt]
 * @returns {(a: number) => number}
 */
export function contourRadius(kind, R, opt = {}) {
  if (kind === 'ellipse') { const ax = R * (opt.sx || 1), ay = R * (opt.sy || 1); return a => 1 / Math.hypot(Math.cos(a) / ax, Math.sin(a) / ay); }
  if (kind === 'polygon') { const k = opt.k || 6, rot = opt.rot || 0, seg = TAU / k; return a => { const m = ((((a - rot) % seg) + seg) % seg) - seg / 2; return R * Math.cos(Math.PI / k) / Math.cos(m); }; }
  if (kind === 'star') { const k = opt.k || 6, amp = opt.amp || 0.2, rot = opt.rot || 0; return a => R * (1 - amp * (1 - Math.cos(k * (a - rot))) / 2); }
  if (kind === 'lozenge') { const w = R * (opt.sx || 0.7), h = R * (opt.sy || 1.05); return a => 1 / (Math.abs(Math.cos(a)) / w + Math.abs(Math.sin(a)) / h); }
  if (kind === 'arch') { const b = R * (opt.base || 0.8); return a => { const s = Math.sin(a); if (s <= 0) return R; return Math.min(R / Math.max(1e-9, Math.abs(Math.cos(a))), b / s); }; }
  return () => R;
}

/**
 * Path fechado que segue um contorno r(a), escalado por k (anéis internos = contorno × t).
 * @param {number} cx
 * @param {number} cy
 * @param {(a: number) => number} rFn - de contourRadius
 * @param {number} [k=1] - escala
 * @param {number} [N=72] - amostras
 * @param {number} [a0=-Math.PI/2] - ângulo inicial (o topo)
 * @returns {string} atributo d
 */
export function contourPath(cx, cy, rFn, k = 1, N = 72, a0 = -Math.PI / 2) {
  const pts = Array.from({ length: N }, (_, i) => { const a = a0 + i * TAU / N; return pt(cx, cy, rFn(a) * k, a); });
  return 'M ' + pts.map(p => `${f(p[0])} ${f(p[1])}`).join(' L ') + ' Z';
}
