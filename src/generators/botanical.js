// src/generators/botanical.js
// Motor L-System (Lindenmayer system): reescrita de string + interpretação por
// turtle graphics. Ver GLOSSARY.md para os termos e DEC-011 em DECISIONS.md
// para as escolhas de design (mapeamento de comp/sym, ajuste de bounding box).

import { f, pickOne } from '../core/utils.js';

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
 * L-System ESTOCÁSTICO (F5/DEC-017): como `lsystemExpand`, mas uma regra pode trazer uma lista
 * de alternativas — a cada ocorrência do símbolo, `rnd` sorteia uma. É o que faz o seed mudar a
 * ESTRUTURA (quais galhos nascem onde), não só os números.
 * @param {string} axiom
 * @param {Object<string, string|string[]>} rules - símbolo → substituição ou lista de alternativas
 * @param {number} iterations
 * @param {() => number} rnd - PRNG semeado (mkRand)
 * @returns {string}
 */
export function lsystemExpandStochastic(axiom, rules, iterations, rnd) {
  let str = axiom;
  for (let i = 0; i < iterations; i++) {
    let next = '';
    for (const ch of str) {
      const r = rules[ch];
      next += r === undefined ? ch : Array.isArray(r) ? r[Math.floor(rnd() * r.length)] : r;
    }
    str = next;
  }
  return str;
}

// O pickOne local saiu (IDEAS «Um pickOne só», DEC-022): o de core/utils.js faz a mesma conta e
// é o que o registrador de escolhas da anti-repetição enxerga.

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
export function turtleToPath(str, angleDeg, stepLen, startAngleDeg = -90, jitter = null) {
  // jitter (opcional, F5/DEC-017): { rnd, angleDeg, len } — cada giro ganha ±angleDeg/2 e cada passo
  // ±len/2 de variação, sorteados por `rnd`. Sem jitter o comportamento é o de sempre (nenhum rnd()).
  const angleRad = angleDeg * Math.PI / 180;
  const jA = jitter ? jitter.angleDeg * Math.PI / 180 : 0, jL = jitter ? jitter.len : 0;
  const turn = () => jitter ? angleRad + (jitter.rnd() - 0.5) * jA : angleRad;
  const step = () => jitter ? stepLen * (1 + (jitter.rnd() - 0.5) * jL) : stepLen;
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
      const L = step();
      x += L * Math.cos(angle); y += L * Math.sin(angle);
      d += ` L ${f(x)} ${f(y)}`; track(x, y);
    } else if (ch === 'f') {
      const L = step();
      x += L * Math.cos(angle); y += L * Math.sin(angle);
      d += ` M ${f(x)} ${f(y)}`; track(x, y);
    } else if (ch === '+') {
      angle += turn();
    } else if (ch === '-') {
      angle -= turn();
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

// Fração de `sz` que a maior dimensão do desenho ocupa. Era 0.86 (≈40% do canvas, porque sz é
// 0.46 do lado menor); 1.8 leva a ≈83%, como os geradores centrados (F5/DEC-017).
const FIT = 1.8;
/**
 * Envolve o path bruto (coordenadas locais) num `<g transform>` que centraliza
 * e escala o desenho para caber num quadrado de lado sz × FIT centrado em (cx, cy) — equivalente ao
 * que os outros geradores fazem manualmente ponto a ponto, mas aqui é mais
 * simples aplicar como uma única transformação de grupo.
 */
function fitToBox(pathResult, cx, cy, sz, extraAttrs) {
  const { d, minX, maxX, minY, maxY } = pathResult;
  const w = Math.max(maxX - minX, 0.001);
  const h = Math.max(maxY - minY, 0.001);
  const scale = (sz * FIT) / Math.max(w, h);
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
  // F5/DEC-017: L-System estocástico — o seed escolhe, a cada galho, uma de 5 regras de
  // ramificação, decide se o tronco dobra, e perturba ângulo, comprimento e inclinação.
  // Antes o seed não mudava nada: a árvore tinha sempre a mesma silhueta.
  const iterations = 3 + Math.round(comp * 2); // 3–5 (a regra estocástica cresce mais rápido que a fixa)
  const angleDeg = 15 + sym * 20 + (rnd() - 0.5) * 8; // 15°–35° pelo Symmetry, ±4° pelo seed
  const lean = -90 + (rnd() - 0.5) * 16;             // inclinação do tronco: ±8°
  const rules = {
    X: ['F-[[X]+X]+F[+FX]-X', 'F+[[X]-X]-F[-FX]+X', 'F[+X]F[-X]+X', 'F[-X][+X]FX', 'FF-[-X+X+X]+[+X-X-X]'],
    F: ['FF', 'FF', 'FF', 'FF', 'F'],                 // o tronco às vezes não dobra: copas irregulares
  };
  const expanded = lsystemExpandStochastic('X', rules, iterations, rnd);
  const pathResult = turtleToPath(expanded, angleDeg, 8, lean, { rnd, angleDeg: 10, len: 0.4 });
  return fitToBox(pathResult, cx, cy, sz, SO);
}

// Família de curvas de Koch (F5/DEC-017): o seed escolhe qual. `max` limita as iterações pelo
// fator de crescimento da regra (o SVG cresce `growth`^n vezes).
const KOCH_FAMILY = [
  { axiom: 'F--F--F',     rule: 'F+F--F+F',        angle: 60, max: 4 }, // floco de neve
  { axiom: 'F++F++F',     rule: 'F+F--F+F',        angle: 60, max: 4 }, // anti-floco (pontas para dentro)
  { axiom: 'F+F+F+F',     rule: 'F+F-F-F+F',       angle: 90, max: 4 }, // ilha quadrática de Koch
  { axiom: 'F+F+F+F',     rule: 'F-F+F+FF-F-F+F',  angle: 90, max: 3 }, // ilha de Minkowski
  { axiom: 'F+F+F+F+F+F', rule: 'F-F++F-F',        angle: 60, max: 4 }, // Koch sobre hexágono
];
/**
 * Família de Koch (F5/DEC-017). O seed escolhe uma de 5 curvas (floco de neve, anti-floco, ilha
 * quadrática, ilha de Minkowski, Koch sobre hexágono) e a orientação; dentro de cada uma o ângulo
 * continua fixo, porque é o que a define. `comp` controla as iterações (detalhe da borda, até o
 * teto da curva); `sym` adiciona um jitter leve no ângulo, como antes.
 */
export function genLSysKoch(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const k = pickOne(KOCH_FAMILY, rnd);
  const iterations = 1 + Math.round(comp * (k.max - 1));
  const jitter = (rnd() - 0.5) * sym * 4; // até ±2° de variação (papel do Symmetry, como antes)
  const rotate = Math.floor(rnd() * 12) * 15; // orientação sorteada em passos de 15°
  const expanded = lsystemExpand(k.axiom, { F: k.rule }, iterations);
  const pathResult = turtleToPath(expanded, k.angle + jitter, 10, rotate);
  return fitToBox(pathResult, cx, cy, sz, SO);
}

// Família das curvas «dragão» (F5/DEC-017): o seed escolhe qual; `it` = iterações mínima e máxima
// (dobras), escolhidas para o SVG não passar de ~120 KB.
const DRAGON_FAMILY = [
  { axiom: 'FX',     rules: { X: 'X+YF+', Y: '-FX-Y' },   angle: 90,  it: [8, 12] }, // Heighway
  { axiom: 'FX+FX+', rules: { X: 'X+YF', Y: 'FX-Y' },     angle: 90,  it: [7, 11] }, // twindragon
  { axiom: 'F',      rules: { F: '+F--F+' },              angle: 45,  it: [8, 12] }, // curva C de Lévy
  { axiom: 'F',      rules: { F: 'F+F-F' },               angle: 120, it: [5, 8] },  // terdragon
  { axiom: 'F',      rules: { F: 'G-F-G', G: 'F+G+F' },   angle: 60,  it: [4, 7] },  // ponta de seta de Sierpiński
];
/**
 * Família das curvas «dragão» (F5/DEC-017). O seed escolhe uma de 5 (Heighway, twindragon, curva C
 * de Lévy, terdragon, ponta de seta de Sierpiński), a orientação e o sentido das dobras. Só F/G
 * desenham; X/Y são símbolos de reescrita. `comp` controla as dobras; `sym`, quantas cópias giradas
 * em volta do ponto de partida (1–4). Cada cópia a mais tira dobras, para o SVG não multiplicar.
 */
export function genLSysDragon(cx, cy, sz, comp, sym, rnd, SO, FG, sw) {
  const k = pickOne(DRAGON_FAMILY, rnd);
  // Symmetry = cópias giradas em volta do ponto de partida (1 a 4), como o Symmetry dos outros
  // estilos; antes a documentação prometia um papel para ele que o código não tinha.
  const copies = 1 + Math.round(sym * 3);
  // Orçamento de tamanho: cada cópia a mais tira dobras, para o SVG não multiplicar por 4.
  const budget = copies > 2 ? 2 : copies - 1;
  const iterations = Math.max(k.it[0] - budget, k.it[0] + Math.round(comp * (k.it[1] - k.it[0])) - budget);
  const expanded = lsystemExpand(k.axiom, k.rules, iterations);
  const start = Math.floor(rnd() * 8) * 45;
  const mirror = rnd() < 0.5 ? -1 : 1; // espelhado ou não: o seed também decide o sentido das dobras
  let d = '', minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let c = 0; c < copies; c++) {
    const r = turtleToPath(expanded, mirror * k.angle, 10, start + c * 360 / copies);
    d += (c ? ' ' : '') + r.d;
    minX = Math.min(minX, r.minX); maxX = Math.max(maxX, r.maxX); minY = Math.min(minY, r.minY); maxY = Math.max(maxY, r.maxY);
  }
  return fitToBox({ d, minX, maxX, minY, maxY }, cx, cy, sz, SO);
}
