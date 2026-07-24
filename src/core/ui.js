// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.

import { state, STYLES, TYPES_BY_STYLE, PALETTES, FONTS } from './state.js';

export function buildStyleGrid() {
  const grid = document.getElementById('style-grid');
  const icons = {
    ad:  '<polygon points="20,4 36,12 36,28 20,36 4,28 4,12" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="20" r="5" fill="currentColor" opacity=".4"/><line x1="20" y1="4" x2="20" y2="8" stroke="currentColor"/><line x1="20" y1="32" x2="20" y2="36" stroke="currentColor"/>',
    bq:  '<path d="M20 4 C10 4 4 10 4 20 S10 36 20 36 36 30 36 20 30 4 20 4Z" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M20 10 C13 14 13 26 20 30 C27 26 27 14 20 10Z" fill="currentColor" opacity=".25"/>',
    geo: '<polygon points="20,4 36,14 36,26 20,36 4,26 4,14" fill="none" stroke="currentColor" stroke-width="1.2"/><polygon points="20,9 31,16 31,24 20,31 9,24 9,16" fill="none" stroke="currentColor" stroke-width="0.8"/>',
    vic: '<circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" stroke-width="0.8"/><path d="M20 6 L20 34 M6 20 L34 20" stroke="currentColor" stroke-width="0.6"/>',
    cel: '<path d="M20 8 C24 8 28 12 28 20 C28 28 24 32 20 32 C16 32 12 28 12 20 C12 12 16 8 20 8Z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M14 14 C20 18 26 14 26 20 C26 26 20 22 14 26" fill="none" stroke="currentColor" stroke-width="0.8"/>',
    isl: '<path d="M20 4 L23.5 13 L33 13 L25 19 L28.5 29 L20 23 L11.5 29 L15 19 L7 13 L16.5 13 Z" fill="none" stroke="currentColor" stroke-width="1.2"/>',
    min: '<line x1="8" y1="20" x2="32" y2="20" stroke="currentColor" stroke-width="1.5"/><circle cx="20" cy="20" r="4" fill="currentColor"/>',
    org: '<path d="M20 34 C20 34 8 26 8 16 C8 10 14 6 20 12 C26 6 32 10 32 16 C32 26 20 34 20 34Z" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M20 34 L20 18" stroke="currentColor" stroke-width="0.8"/>',
  };
  grid.innerHTML = STYLES.map(s => `
    <div class="stile ${s.id === state.style ? 'active' : ''}" onclick="selectStyle('${s.id}')">
      <svg class="stile-ico" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">${icons[s.icon]}</svg>
      <div class="stile-name">${s.name}</div>
    </div>`).join('');
}

export function buildTypeChips() {
  const wrap = document.getElementById('type-wrap');
  const types = TYPES_BY_STYLE[state.style] || [];
  if (!types.includes(state.type)) state.type = types[0];
  wrap.innerHTML = types.map(t => `
    <button class="tchip ${t === state.type ? 'active' : ''}" onclick="selectType('${t}')">${t}</button>`).join('');
}

export function buildPalettes() {
  const row = document.getElementById('pal-row');
  const cols = ['#1a1a1a','#0f0f0f','#4a2e0a','#1a2a5e','#1a3a1a','#3a0a0a','#2a1a4a','#2a1a0a'];
  row.innerHTML = PALETTES.map((p, i) => `
    <div class="pal-swatch ${i === state.pal ? 'active' : ''}" style="background:${cols[i]}" title="${p.name}" onclick="selectPal(${i})"></div>`).join('');
}

export function buildFontChips() {
  const wrap = document.getElementById('font-chips');
  const labels = ['Serif','Sans','Mono','Cursive','Fantasy'];
  wrap.innerHTML = FONTS.map((f2, i) => `
    <button class="font-chip ${f2 === state.font ? 'active' : ''}" onclick="selectFont('${f2}')" style="font-family:${f2}">${labels[i]}</button>`).join('');
}

export function buildVariations() {
  for (let i = 0; i < 4; i++) {
    const el = document.getElementById('vt' + i);
    el.className = 'vthumb' + (i === state.activeVar ? ' active' : '');
    if (state.vars[i]) el.innerHTML = state.vars[i];
    else el.innerHTML = '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#f5f5f5"/><line x1="15" y1="30" x2="45" y2="30" stroke="#ddd" stroke-width="0.8"/><circle cx="30" cy="30" r="8" fill="none" stroke="#ddd" stroke-width="0.8"/></svg>';
  }
}

export function selectStyle(id) {
  state.style = id;
  buildStyleGrid();
  buildTypeChips();
}
export function selectType(t) {
  state.type = t;
  buildTypeChips();
}
export function selectPal(i) {
  state.pal = i;
  buildPalettes();
}
export function selectFont(f2) {
  state.font = f2;
  buildFontChips();
}
export function setRatio(w, h) {
  const base = 400;
  const ratio = w / h;
  if (ratio >= 1) { state.w = base; state.h = Math.round(base / ratio); }
  else { state.h = base; state.w = Math.round(base * ratio); }
  document.getElementById('cw').value = state.w;
  document.getElementById('ch').value = state.h;
  updateDimTag();
}
export function updateDimTag() {
  document.getElementById('dim-tag').textContent = `${state.w} × ${state.h}`;
}
export function setMode(m) {
  state.mode = m;
  document.getElementById('mb-vec').className = 'mode-btn' + (m === 'vector' ? ' active' : '');
  document.getElementById('mb-px').className = 'mode-btn' + (m === 'pixel' ? ' active' : '');
  document.getElementById('main-svg').style.display = m === 'vector' ? 'block' : 'none';
  document.getElementById('px-canvas').style.display = m === 'pixel' ? 'block' : 'none';
}

// Sliders — listeners de parâmetro (Complexity/Symmetry/Stroke/Fill/Seed)
[['s-comp','sv-comp', v => { state.comp = v/100; return v; }],
 ['s-sym', 'sv-sym',  v => { state.sym  = v/100; return v; }],
 ['s-sw',  'sv-sw',   v => { state.sw   = v/10;  return (v/10).toFixed(1); }],
 ['s-fill','sv-fill', v => { state.fill  = v/100; return v+'%'; }],
 ['s-seed','sv-seed', v => { state.seed  = v;     return v; }],
].forEach(([id, sv, fn]) => {
  document.getElementById(id).addEventListener('input', e => {
    document.getElementById(sv).textContent = fn(+e.target.value);
  });
});

document.getElementById('cw').addEventListener('change', e => { state.w = +e.target.value; updateDimTag(); });
document.getElementById('ch').addEventListener('change', e => { state.h = +e.target.value; updateDimTag(); });
