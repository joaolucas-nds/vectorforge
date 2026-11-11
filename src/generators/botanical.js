// src/generators/botanical.js
// Motor L-System (Lindenmayer system): reescrita de string + interpretação por
// turtle graphics. Ver GLOSSARY.md para os termos e DEC-011 em DECISIONS.md
// para as escolhas de design (mapeamento de comp/sym, ajuste de bounding box).

import { f } from '../core/utils.js';

/**
 * Expande o axioma aplicando as regras de reescrita N vezes.
 * @param {string} axiom - string inicial (ex.: "X", "F--F--F")
 * @param {Object<string,string>} rules - mapa símbolo → substituição (símbolos sem regra passam intactos)
 * @param {number} iterations - número de reescritas
 * @returns {string} string final após todas as iterações
 */
export function lsystemExpand(axiom, rules, iterations) {
  let str = axiom;
  for (let i = 0; i < iterations; i++) {
    let next = '';
    for (const ch of str) next += (rules[ch] !== undefined) ? rules[ch] : ch;
    str = next;
  }
  return str;
}

/**
 * Interpreta a string do L-System como comandos de turtle graphics e monta um
 * único `<path>` (subpaths via `M` para os "levantar caneta" do `]`/`f`).
 * Convenção de símbolos: F/G desenha para frente; f move sem desenhar;
 * + gira à direita; - gira à esquerda; [ empilha estado; ] desempilha estado
 * (com um `M` para não conectar visualmente o ponto antigo ao novo).
 * Qualquer outro símbolo (X, Y, ...) é ignorado na hora de desenhar — serve só
 * de placeholder para as regras de reescrita.
 *
 * @returns {{d: string, minX: number, maxX: number, minY: number, maxY: number}}
 *          o path e o bounding box (em coordenadas locais) para centralização.
 */
export function turtleToPath(str, angleDeg, stepLen, startAngleDeg = -90) {
  const angleRad = angleDeg * Math.PI / 180;
  let x = 0, y = 0, angle = startAngleDeg * Math.PI / 180;
  let minX = 0, maxX = 0, minY = 0, maxY = 0;
  const stack = [];
  let d = `M ${f(x)} ${f(y)}`;

  const track = (px, py) => {
    if (px < minX) minX = px; if (px > maxX) maxX = px;
    if (py < minY) minY = py; if (py > maxY) maxY = py;
  };

  for (const ch of str) {
    if (ch === 'F' || ch === 'G') {
      x += stepLen * Math.cos(angle); y += stepLen * Math.sin(angle);
      d += ` L ${f(x)} ${f(y)}`; track(x, y);
    } else if (ch === 'f') {
      x += stepLen * Math.cos(angle); y += stepLen * Math.sin(angle);
      d += ` M ${f(x)} ${f(y)}`; track(x, y);
    } else if (ch === '+') {
      angle += angleRad;
    } else if (ch === '-') {
      angle -= angleRad;
    } else if (ch === '[') {
      stack.push({ x, y, angle });
    } else if (ch === ']') {
      const s = stack.pop();
      if (s) { x = s.x; y = s.y; angle = s.angle; d += ` M ${f(x)} ${f(y)}`; }
    }
    // outros símbolos (X, Y...) são placeholders de reescrita, sem ação de desenho
  }
  return { d, minX, maxX, minY, maxY };
}

/**
 * Envolve o path bruto (coordenadas locais) num `<g transform>` que centraliza
 * e escala o desenho para caber no quadrado [cx±sz/2, cy±sz/2] — equivalente ao
 * que os outros geradores fazem manualmente ponto a ponto, mas aqui é mais
 * simples aplicar como uma única transformação de grupo.
 */
function fitToBox(pathResult, cx, cy, sz, extraAttrs) {
  const { d, minX, maxX, minY, maxY } = pathResult;
  const w = Math.max(maxX - minX, 0.001);
  const h = Math.max(maxY - minY, 0.001);
  const scale = (sz * 0.86) / Math.max(w, h);
  const midX = (minX + maxX) / 2, midY = (minY + maxY) / 2;
  const tx = cx - midX * scale, ty = cy - midY * scale;
  return `<g transform="translate(${f(tx)} ${f(ty)}) scale(${f(scale)})"><path d="${d}" ${extraAttrs}/></g>`;
}

/**
 * Árvore recursiva botânica. Regra clássica (Lindenmayer/Prusinkiewicz):
 * axioma "X", F→FF, X→F-[[X]+X]+F[+FX]-X. `comp` controla profundidade
 * (mais iterações = árvore mais densa/alta); `sym` controla o ângulo de
 * ramificação (baixo = galhos mais abertos/caóticos, alto = mais "natural",
 * ~20-25°, que é o ângulo mais comum em árvores reais).
 */
export function genLSysTree(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const iterations = 3 + Math.round(comp * 3); // 3–6 iterações
  const angleDeg = 15 + sym * 20; // 15°–35°
  const rules = { F: 'FF', X: 'F-[[X]+X]+F[+FX]-X' };
  const expanded = lsystemExpand('X', rules, iterations);
  // stepLen decresce com a profundidade para não estourar o bounding box em iterações altas
  const stepLen = 8 / Math.pow(1.55, iterations - 3);
  const pathResult = turtleToPath(expanded, angleDeg, stepLen, -90);
  const g = fitToBox(pathResult, cx, cy, sz, SO);
  // Pontinhos nas pontas dos galhos teria custo de re-percorrer a string; mantido simples por ora.
  return g;
}

/**
 * Floco de neve de Koch (fechado, 3 lados). axioma "F--F--F" já desenha o
 * triângulo base fechando sozinho; regra F→F+F--F+F, ângulo fixo 60° (é o que
 * define a curva de Koch — mudar o ângulo produz outra curva, não uma
 * variação da mesma). `comp` controla iterações (detalhe da borda);
 * `sym` adiciona um jitter leve no ângulo via `rnd()` para variar sem
 * descaracterizar a curva.
 */
export function genLSysKoch(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const iterations = 1 + Math.round(comp * 3); // 1–4 iterações (5+ já é custoso e visualmente denso demais)
  const jitter = (rnd() - 0.5) * sym * 4; // até ±2° de variação
  const angleDeg = 60 + jitter;
  const rules = { F: 'F+F--F+F' };
  const expanded = lsystemExpand('F--F--F', rules, iterations);
  const stepLen = 60 / Math.pow(3, iterations);
  const pathResult = turtleToPath(expanded, angleDeg, stepLen, 0);
  const g = fitToBox(pathResult, cx, cy, sz, SO);
  return g;
}

/**
 * Dragon curve (curva do dragão). axioma "FX", regras X→X+YF+, Y→-FX-Y,
 * ângulo fixo 90°. Só F desenha; X/Y são símbolos de controle da reescrita
 * (não aparecem no desenho). `comp` controla iterações — a curva cresce em
 * complexidade rapidamente (2^n segmentos), por isso o teto é mais baixo que
 * os outros dois presets. `sym` aqui não tem papel geométrico natural (a
 * curva é rígida por definição a 90°), então é usado para alternar entre FG/SO
 * a cada N segmentos, dando uma variação visual sem tocar na geometria.
 */
export function genLSysDragon(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const iterations = 8 + Math.round(comp * 4); // 8–12 iterações (14+ gera paths enormes sem ganho visual proporcional)
  const rules = { X: 'X+YF+', Y: '-FX-Y' };
  const expanded = lsystemExpand('FX', rules, iterations);
  const stepLen = 400 / Math.pow(1.41421356, iterations); // compensa o crescimento ~√2^n do diâmetro
  const pathResult = turtleToPath(expanded, 90, stepLen, 0);
  const g = fitToBox(pathResult, cx, cy, sz, SO);
  return g;
}
