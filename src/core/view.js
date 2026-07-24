// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.

import { state, PALETTES } from './state.js';
import { curvePath } from './utils.js';
import { generateContent, setStatus } from './generate.js';

export function zoom(delta) {
  if (delta === 0) { fitToView(); return; }
  state.zoom = Math.max(0.1, Math.min(4, state.zoom + delta));
  applyZoom();
}
export function fitToView() {
  const area = document.getElementById('canvas-area');
  const aw = area.clientWidth - 48, ah = area.clientHeight - 80;
  state.zoom = Math.min(aw / state.w, ah / state.h, 2);
  applyZoom();
}
export function applyZoom() {
  const svg = document.getElementById('main-svg');
  const px  = document.getElementById('px-canvas');
  const w = Math.round(state.w * state.zoom);
  const h = Math.round(state.h * state.zoom);
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  px.style.width = w + 'px';
  px.style.height = h + 'px';
  updateGrid();
}
export function toggleBg() {
  state.darkBg = !state.darkBg;
  const holder = document.getElementById('svg-holder');
  holder.style.background = state.darkBg ? '#111' : '#fff';
  document.getElementById('main-svg').querySelector('rect.bg-rect') &&
    (document.getElementById('main-svg').querySelector('rect.bg-rect').setAttribute('fill', state.darkBg ? '#111' : '#fff'));
  document.getElementById('btn-bg').style.color = state.darkBg ? 'var(--accent)' : '';
}
export function toggleGrid() {
  state.grid = !state.grid;
  document.getElementById('grid-svg').className = 'grid-svg' + (state.grid ? ' visible' : '');
  document.getElementById('btn-grid').style.color = state.grid ? 'var(--accent)' : '';
  updateGrid();
}
export function updateGrid() {
  if (!state.grid) return;
  const svg = document.getElementById('grid-svg');
  const w = Math.round(state.w * state.zoom);
  const h = Math.round(state.h * state.zoom);
  const step = Math.max(20, Math.round(50 * state.zoom));
  let lines = '';
  for (let x = 0; x < w; x += step) lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#888" stroke-width="0.4"/>`;
  for (let y = 0; y < h; y += step) lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#888" stroke-width="0.4"/>`;
  const wr = document.getElementById('cv-wrap');
  const rect = document.getElementById('svg-holder').getBoundingClientRect();
  const parent = wr.getBoundingClientRect();
  svg.style.left = (rect.left - parent.left) + 'px';
  svg.style.top  = (rect.top  - parent.top)  + 'px';
  svg.style.width = w + 'px';
  svg.style.height = h + 'px';
  svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${lines}</svg>`;
}

// Draw mode (freehand sketch on canvas)
let drawing = false, drawPts = [];
export function toggleDraw() {
  state.draw = !state.draw;
  document.getElementById('btn-draw').style.color = state.draw ? 'var(--accent)' : '';
  const holder = document.getElementById('svg-holder');
  holder.style.cursor = state.draw ? 'crosshair' : 'default';
  if (!state.draw) drawPts = [];
}

document.getElementById('svg-holder').addEventListener('mousedown', e => {
  if (!state.draw) return;
  drawing = true;
  drawPts = [[e.offsetX / state.zoom, e.offsetY / state.zoom]];
});
document.addEventListener('mousemove', e => {
  if (!drawing || !state.draw) return;
  const rect = document.getElementById('svg-holder').getBoundingClientRect();
  drawPts.push([(e.clientX - rect.left) / state.zoom, (e.clientY - rect.top) / state.zoom]);
  previewDraw();
});
document.addEventListener('mouseup', () => {
  if (!drawing || !state.draw) return;
  drawing = false;
  if (drawPts.length > 4) convertDrawToOrnament();
});

export function previewDraw() {
  const ol = document.getElementById('draw-overlay');
  if (ol) ol.remove();
  const svg = document.getElementById('main-svg');
  const d = curvePath(drawPts);
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  el.setAttribute('id', 'draw-overlay');
  el.setAttribute('d', d);
  el.setAttribute('fill', 'none');
  el.setAttribute('stroke', '#c8a96e');
  el.setAttribute('stroke-width', '1.5');
  el.setAttribute('opacity', '0.5');
  svg.appendChild(el);
}

export function convertDrawToOrnament() {
  // Analyze drawn stroke and generate ornament that mirrors its bounding shape
  const xs = drawPts.map(p => p[0]), ys = drawPts.map(p => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  const sz = Math.max(maxX - minX, maxY - minY);
  state.seed = Math.floor(Math.random() * 999) + 1;
  document.getElementById('s-seed').value = state.seed;
  document.getElementById('sv-seed').textContent = state.seed;
  // Generate ornament centered on drawn region
  const pal = PALETTES[state.pal];
  const sw = state.sw;
  const content = generateContent(state.style, state.type, cx, cy, sz * 0.5, state.comp, state.sym, state.seed, pal, sw, state.fill);
  const svgEl = document.getElementById('main-svg');
  const ol = document.getElementById('draw-overlay');
  if (ol) ol.remove();
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.innerHTML = content;
  svgEl.appendChild(g);
  setStatus(`Ornament placed from sketch`);
}
