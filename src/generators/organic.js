// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.


import { TAU, f, pt, snoise } from '../core/utils.js';
import { state, PALETTES } from '../core/state.js';


export function genOrganicLeaf(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  /** Pétalas com Simplex Noise nos comprimentos e pontos de controle Bézier.
   *  Elimina o aspecto "paramétrico perfeito" do v0.1.0 mantendo simetria rotacional. */
  const parts = [];
  const n = Math.round(3 + sym * 4);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU - Math.PI / 2;
    // Comprimento variável por pétala via noise (não via rnd() puro)
    const nLen = snoise(Math.cos(a) * 2.4 + 0.5, Math.sin(a) * 2.4 + 0.5) * 0.5;
    const len  = sz * (0.38 + nLen * 0.11 + rnd() * 0.04);
    const [ex, ey] = pt(cx, cy, len, a);
    // Curvatura assimétrica via noise nos pontos de controle
    const nc1 = snoise(Math.cos(a - 0.5) * 2.1, Math.sin(a - 0.5) * 2.1) * sz * 0.048;
    const nc2 = snoise(Math.cos(a + 0.5) * 2.1, Math.sin(a + 0.5) * 2.1) * sz * 0.048;
    const [c1x, c1y] = pt(cx, cy, len * 0.4 + nc1, a - 0.5);
    const [c2x, c2y] = pt(cx, cy, len * 0.7 + nc2, a + 0.5);
    parts.push(`<path d="M ${f(cx)} ${f(cy)} C ${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(ex)} ${f(ey)} C ${f(c2x)} ${f(c2y)} ${f(c1x)} ${f(c1y)} ${f(cx)} ${f(cy)}" ${SO}/>`);
    if (comp > 0.4) {
      // Nervura central levemente desviada por noise
      const mx = (cx + ex) / 2 + snoise(a * 1.4, len * 0.03) * sz * 0.018;
      const my = (cy + ey) / 2 + snoise(a * 1.4 + 7, len * 0.03) * sz * 0.018;
      parts.push(`<line x1="${f(cx)}" y1="${f(cy)}" x2="${f(mx)}" y2="${f(my)}" ${SO}/>`);
    }
  }
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.05)}" ${FG}/>`);
  return parts.join('\n');
}

export function genOrganicSpiral(cx, cy, sz, comp, rnd, SO, FG, sw) {
  const parts = [];
  const turns = 2 + comp * 4;
  const steps = Math.round(80 + comp * 120);
  let d = `M ${f(cx)} ${f(cy)}`;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const a = t * turns * TAU;
    const r = t * sz * 0.48;
    const [x, y] = pt(cx, cy, r, a);
    d += ` L ${f(x)} ${f(y)}`;
  }
  parts.push(`<path d="${d}" fill="none" stroke="${PALETTES[state.pal].stroke}" stroke-width="${sw}"/>`);
  // Mirror spiral
  if (comp > 0.4) {
    let d2 = `M ${f(cx)} ${f(cy)}`;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const a = t * turns * TAU + Math.PI;
      const r = t * sz * 0.48;
      const [x, y] = pt(cx, cy, r, a);
      d2 += ` L ${f(x)} ${f(y)}`;
    }
    parts.push(`<path d="${d2}" fill="none" stroke="${PALETTES[state.pal].fill}" stroke-width="${sw * 0.6}"/>`);
  }
  return parts.join('\n');
}

export function genOrganicBranch(cx, cy, sz, comp, rnd, SO, FG, sw) {
  const parts = [];
  function branch(bx, by, angle, len, depth) {
    if (depth <= 0 || len < sz * 0.04) return;
    const ex = bx + Math.cos(angle) * len;
    const ey = by + Math.sin(angle) * len;
    parts.push(`<line x1="${f(bx)}" y1="${f(by)}" x2="${f(ex)}" y2="${f(ey)}" stroke="${PALETTES[state.pal].stroke}" stroke-width="${f(sw * (depth / 5))}" fill="none"/>`);
    const spread = 0.4 + comp * 0.5;
    branch(ex, ey, angle - spread, len * (0.6 + rnd() * 0.15), depth - 1);
    branch(ex, ey, angle + spread, len * (0.6 + rnd() * 0.15), depth - 1);
    if (comp > 0.5 && depth < 3 && rnd() > 0.5) branch(ex, ey, angle, len * 0.5, depth - 1);
  }
  const maxDepth = 3 + Math.round(comp * 3);
  branch(cx, cy + sz * 0.4, -Math.PI / 2, sz * 0.4, maxDepth);
  return parts.join('\n');
}

export function genOrganicFlower(cx, cy, sz, n, comp, rnd, SO, FG, FG2, sw) {
  const parts = [];
  const petals = Math.round(4 + comp * 8);
  const pLen = sz * 0.42;
  const pW = pLen * (0.25 + comp * 0.2);
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * TAU - Math.PI / 2;
    const [ex, ey] = pt(cx, cy, pLen, a);
    const [c1x, c1y] = pt(cx, cy, pLen * 0.5, a - 0.45);
    const [c2x, c2y] = pt(cx, cy, pLen * 0.5, a + 0.45);
    const d = i % 2 === 0 ? SO : FG;
    parts.push(`<path d="M ${f(cx)} ${f(cy)} C ${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(ex)} ${f(ey)} C ${f(c2x)} ${f(c2y)} ${f(c1x)} ${f(c1y)} ${f(cx)} ${f(cy)}" ${d}/>`);
  }
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.1)}" ${FG}/>`);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.04)}" fill="${PALETTES[state.pal].bg}"/>`);
  return parts.join('\n');
}

export function genWave(x, cy, w, h, comp, rnd, SO, FG, sw) {
  /** Ondas com Simplex Noise sobreposto ao seno base — aspecto orgânico, não mecânico.
   *  A proporção noise/seno escala com complexity: baixo comp → ondas limpas;
   *  alto comp → ondas com distorção pronunciada e textura natural. */
  const parts = [];
  const waves = 2 + Math.round(comp * 5);
  const amp   = h * 0.08 + comp * h * 0.12;
  for (let wv = 0; wv < waves; wv++) {
    const wy   = cy - (waves / 2) * amp * 0.4 + wv * amp * 0.4;
    const freq = 1 + wv * 0.5;
    const steps = 120;
    let d = `M 0 ${f(wy)}`;
    for (let i = 1; i <= steps; i++) {
      const t  = i / steps;
      const px = w * t;
      // Perturbação noise proporcional à amplitude e complexity
      const nd = snoise(t * 3.8, wv * 2.1 + 0.6) * amp * (0.22 + comp * 0.28);
      const py = wy + Math.sin(t * TAU * freq + wv * 0.7) * amp + nd;
      d += ` L ${f(px)} ${f(py)}`;
    }
    parts.push(`<path d="${d}" fill="none" stroke="${PALETTES[state.pal].stroke}" stroke-width="${sw * (1 - wv * 0.15)}"/>`);
  }
  return parts.join('\n');
}

export function genPhyllotaxis(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw) {
  /** Gerador inspirado na disposição espiral da natureza: girassóis, pinhas,
   *  alcachofras. Usa o ângulo áureo (φ → 137.507...°) para distribuir pontos.
   *  Simplex Noise adiciona perturbação radial suave — natural, não mecânico.
   *  Complexity → densidade de pontos;  Symmetry → alternância cor e anéis-guia. */
  const parts = [];
  const count     = Math.round(60 + comp * 220);       // 60–280 pontos
  const golden    = Math.PI * (3 - Math.sqrt(5));      // ângulo áureo ≈ 137.507°
  const spread    = sz * 0.47;
  const dotR      = Math.max(sz * 0.008, sz * (0.018 - 0.007 * comp));
  const altStep   = Math.round(2 + sym * 5);           // período de alternância SO↔FG
  const ringCount = Math.round(1 + sym * 4);           // anéis-guia concêntricos

  for (let i = 0; i < count; i++) {
    const r = spread * Math.sqrt(i / count);
    const a = i * golden;
    // Perturbação radial via noise → rompe perfeição geométrica de forma suave
    const nr = snoise(Math.cos(a) * 1.9 + 0.3, Math.sin(a) * 1.9 + 0.7) * sz * 0.016;
    const x  = cx + (r + nr) * Math.cos(a);
    const y  = cy + (r + nr) * Math.sin(a);
    parts.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(dotR)}" ${i % altStep === 0 ? FG : SO}/>`);
  }

  // Anéis-guia concêntricos que revelam a estrutura espiral subjacente
  for (let ring = 1; ring <= ringCount; ring++) {
    const r = spread * Math.sqrt(ring / ringCount) * 0.97;
    parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="none" stroke="${PALETTES[state.pal].stroke}" stroke-width="${sw * 0.22}" opacity="0.22"/>`);
  }

  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.035)}" ${FG}/>`);
  parts.push(`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(sz * 0.013)}" fill="${PALETTES[state.pal].bg}"/>`);
  return parts.join('\n');
}
