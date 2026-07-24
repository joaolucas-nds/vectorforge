// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.

export let state = {
  style: 'artdeco',
  type: 'medallion',
  comp: 0.55,
  sym: 0.5,
  sw: 1.2,
  fill: 0,
  seed: 42,
  pal: 0,
  w: 400,
  h: 400,
  font: 'serif',
  mode: 'vector',
  darkBg: false,
  grid: false,
  draw: false,
  zoom: 1,
  vars: [null, null, null, null],
  activeVar: 0,
};

export const STYLES = [
  { id: 'artdeco',  name: 'Art Deco',    icon: 'ad'  },
  { id: 'baroque',  name: 'Baroque',     icon: 'bq'  },
  { id: 'geometric',name: 'Geometric',   icon: 'geo' },
  { id: 'victorian',name: 'Victorian',   icon: 'vic' },
  { id: 'celtic',   name: 'Celtic',      icon: 'cel' },
  { id: 'islamic',  name: 'Islamic',     icon: 'isl' },
  { id: 'minimal',  name: 'Minimal',     icon: 'min' },
  { id: 'organic',  name: 'Organic',     icon: 'org' },
];

export const TYPES_BY_STYLE = {
  artdeco:   ['medallion','frame','divider','corner','pattern','ornament'],
  baroque:   ['medallion','frame','divider','cartouche','swag','acanthus'],
  geometric: ['mandala','frame','divider','tessellation','star','symbol'],
  victorian: ['medallion','frame','divider','flourish','wreath','cartouche'],
  celtic:    ['knot','border','medallion','cross','knotwork','spiral'],
  islamic:   ['star','girih','arabesque','border','medallion','pattern'],
  minimal:   ['symbol','line','grid','circle','mark','glyph'],
  organic:   ['leaf','spiral','branch','flower','mandala','wave','phyllotaxis'],
};

export const PALETTES = [
  { name: 'Noir & Gold',   stroke: '#1a1a1a', fill: '#c8a96e', bg: '#ffffff', fill2: '#f0e8d8' },
  { name: 'Midnight',      stroke: '#e8e8e8', fill: '#c8a96e', bg: '#0f0f0f', fill2: '#1e1e1e' },
  { name: 'Sepia',         stroke: '#4a2e0a', fill: '#8b6f3e', bg: '#f5ede0', fill2: '#e8d5ba' },
  { name: 'Cobalt',        stroke: '#1a2a5e', fill: '#4a7ab5', bg: '#f0f4ff', fill2: '#d8e4f0' },
  { name: 'Forest',        stroke: '#1a3a1a', fill: '#4a8a4a', bg: '#f0f5f0', fill2: '#d0e8d0' },
  { name: 'Crimson',       stroke: '#3a0a0a', fill: '#8a1a1a', bg: '#fff0f0', fill2: '#f0d0d0' },
  { name: 'Lilac',         stroke: '#2a1a4a', fill: '#7a4a9a', bg: '#f5f0ff', fill2: '#e8d8f8' },
  { name: 'Copper',        stroke: '#2a1a0a', fill: '#9a5a2a', bg: '#fff8f0', fill2: '#f0e0c8' },
];

export const FONTS = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy'];
