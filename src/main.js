// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.

import { buildStyleGrid, buildTypeChips, buildPalettes, buildFontChips, buildVariations,
         updateDimTag, selectStyle, selectType, selectPal, selectFont, setRatio, setMode } from './core/ui.js';
import { doGen, doGenRandom, applyVar } from './core/generate.js';
import { zoom, toggleBg, toggleGrid, toggleDraw } from './core/view.js';
import { xSVG, xPNG, copySVG } from './core/export.js';
import { surprise, newSeed, undo, redo, toggleLock, live, initExplore } from './core/explore.js';

// Os handlers onclick="..." inline no HTML (estático e gerado dinamicamente por
// buildStyleGrid/buildTypeChips/buildPalettes/buildFontChips/buildVariations)
// resolvem no escopo global — precisam estar em window explicitamente porque o
// bundle esbuild (IIFE) não vaza declarações de função para o escopo global.
// As escolhas discretas passam por live(): redesenham na hora e entram no histórico (DEC-015).
Object.assign(window, {
  setMode: live(setMode), doGenRandom, selectStyle: live(selectStyle), selectType: live(selectType),
  selectPal: live(selectPal), selectFont: live(selectFont), setRatio: live(setRatio),
  doGen, zoom, toggleBg, toggleGrid, toggleDraw, xSVG, xPNG, copySVG, applyVar,
  surprise: () => surprise(), newSeed: () => newSeed(), undo, redo, toggleLock,
});

// ── Init (idêntico ao final do <script> original) ───────────────────────────
buildStyleGrid();
buildTypeChips();
buildPalettes();
buildFontChips();
buildVariations();
updateDimTag();
initExplore();

// Auto-generate on load
setTimeout(() => doGen(), 200);
