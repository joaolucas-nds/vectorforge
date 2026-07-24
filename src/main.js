// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.

import { buildStyleGrid, buildTypeChips, buildPalettes, buildFontChips, buildVariations,
         updateDimTag, selectStyle, selectType, selectPal, selectFont, setRatio, setMode } from './core/ui.js';
import { doGen, doGenRandom, applyVar } from './core/generate.js';
import { zoom, toggleBg, toggleGrid, toggleDraw } from './core/view.js';
import { xSVG, xPNG, copySVG } from './core/export.js';

// Os handlers onclick="..." inline no HTML (estático e gerado dinamicamente por
// buildStyleGrid/buildTypeChips/buildPalettes/buildFontChips/buildVariations)
// resolvem no escopo global — precisam estar em window explicitamente porque o
// bundle esbuild (IIFE) não vaza declarações de função para o escopo global.
Object.assign(window, {
  setMode, doGenRandom, selectStyle, selectType, selectPal, selectFont, setRatio,
  doGen, zoom, toggleBg, toggleGrid, toggleDraw, xSVG, xPNG, copySVG, applyVar,
});

// ── Init (idêntico ao final do <script> original) ───────────────────────────
buildStyleGrid();
buildTypeChips();
buildPalettes();
buildFontChips();
buildVariations();
updateDimTag();

// Auto-generate on load
setTimeout(() => doGen(), 200);
