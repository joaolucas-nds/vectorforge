// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.

import { state, PALETTES } from './state.js';
import { mkRand, snoiseSetSeed } from './utils.js';
import { fitToView, updateGrid } from './view.js';
import { genADMedallion, genADFrame, genADCorner, genADOrn } from '../generators/artdeco.js';
import { genBQMedallion, genBQFrame, genBQCartouche, genBQSwag, genBQAcanthus } from '../generators/baroque.js';
import { genMandala, genGeoFrame, genGeoStar, genGeoSymbol } from '../generators/geometric.js';
import { genVicMedallion, genVicFrame, genVicWreath } from '../generators/victorian.js';
import { genCelticKnot, genCelticCross } from '../generators/celtic.js';
import { genIslamicStar, genArabesque } from '../generators/islamic.js';
import { genMinimalSymbol, genMinGrid, genMinCircles, genGlyph } from '../generators/minimal.js';
import { genOrganicLeaf, genOrganicSpiral, genOrganicBranch, genOrganicFlower, genWave, genPhyllotaxis } from '../generators/organic.js';
import { genDivider, genPattern, genPixelArt, genTextShape } from '../generators/generic.js';

export function generateContent(style, type, cx, cy, sz, comp, sym, seed, pal, sw, fillOp) {
  snoiseSetSeed(seed); // sincroniza tabela de permutação com o seed atual
  const rnd = mkRand(seed);
  const n = Math.round(4 + sym * 12);
  const layers = 2 + Math.round(comp * 6);
  const color = { stroke: pal.stroke, fill: pal.fill, fill2: pal.fill2 };

  const SO = `fill="none" stroke="${color.stroke}" stroke-width="${sw}"`;
  const FG = `fill="${color.fill}" stroke="${color.fill}" stroke-width="${sw * 0.3}" fill-opacity="${fillOp}"`;
  const FG2 = `fill="${color.fill2}" stroke="${color.stroke}" stroke-width="${sw * 0.5}" fill-opacity="${Math.min(fillOp + 0.3, 1)}"`;

  const generators = {
    artdeco: {
      medallion: () => genADMedallion(cx, cy, sz, n, layers, comp, rnd, SO, FG, FG2, sw),
      frame:     () => genADFrame(0, 0, state.w, state.h, comp, n, rnd, SO, FG, sw),
      divider:   () => genDivider(0, cy, state.w, comp, sym, rnd, SO, FG, sw, 'artdeco'),
      corner:    () => genADCorner(cx - sz * 0.5, cy - sz * 0.5, sz, comp, rnd, SO, FG, sw),
      pattern:   () => genPattern(0, 0, state.w, state.h, comp, sym, rnd, SO, FG, sw, 'artdeco'),
      ornament:  () => genADOrn(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw),
    },
    baroque: {
      medallion: () => genBQMedallion(cx, cy, sz, layers, comp, sym, rnd, SO, FG, FG2, sw),
      frame:     () => genBQFrame(0, 0, state.w, state.h, comp, rnd, SO, FG, sw),
      divider:   () => genDivider(0, cy, state.w, comp, sym, rnd, SO, FG, sw, 'baroque'),
      cartouche: () => genBQCartouche(cx, cy, sz, comp, rnd, SO, FG, FG2, sw),
      swag:      () => genBQSwag(0, cy, state.w, comp, rnd, SO, FG, sw),
      acanthus:  () => genBQAcanthus(cx, cy, sz, comp, sym, rnd, SO, FG, sw),
    },
    geometric: {
      mandala:      () => genMandala(cx, cy, sz, n, layers, comp, rnd, SO, FG, FG2, sw),
      frame:        () => genGeoFrame(0, 0, state.w, state.h, comp, sym, rnd, SO, FG, sw),
      divider:      () => genDivider(0, cy, state.w, comp, sym, rnd, SO, FG, sw, 'geo'),
      tessellation: () => genPattern(0, 0, state.w, state.h, comp, sym, rnd, SO, FG, sw, 'geo'),
      star:         () => genGeoStar(cx, cy, sz, n, layers, comp, rnd, SO, FG, FG2, sw),
      symbol:       () => genGeoSymbol(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw),
    },
    victorian: {
      medallion: () => genVicMedallion(cx, cy, sz, layers, comp, sym, rnd, SO, FG, FG2, sw),
      frame:     () => genVicFrame(0, 0, state.w, state.h, comp, rnd, SO, FG, sw),
      divider:   () => genDivider(0, cy, state.w, comp, sym, rnd, SO, FG, sw, 'victorian'),
      flourish:  () => genBQAcanthus(cx, cy, sz, comp, sym, rnd, SO, FG, sw),
      wreath:    () => genVicWreath(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw),
      cartouche: () => genBQCartouche(cx, cy, sz, comp, rnd, SO, FG, FG2, sw),
    },
    celtic: {
      knot:     () => genCelticKnot(cx, cy, sz, n, comp, rnd, SO, FG, sw),
      border:   () => genADFrame(0, 0, state.w, state.h, comp, 6, rnd, SO, FG, sw),
      medallion:() => genMandala(cx, cy, sz, 6, layers, comp, rnd, SO, FG, FG2, sw),
      cross:    () => genCelticCross(cx, cy, sz, comp, rnd, SO, FG, FG2, sw),
      knotwork: () => genCelticKnot(cx, cy, sz * 1.2, 8, comp, rnd, SO, FG, sw),
      spiral:   () => genOrganicSpiral(cx, cy, sz, comp, rnd, SO, FG, sw),
    },
    islamic: {
      star:      () => genIslamicStar(cx, cy, sz, n, comp, rnd, SO, FG, FG2, sw),
      girih:     () => genPattern(0, 0, state.w, state.h, comp, sym, rnd, SO, FG, sw, 'girih'),
      arabesque: () => genArabesque(cx, cy, sz, comp, sym, rnd, SO, FG, sw),
      border:    () => genADFrame(0, 0, state.w, state.h, comp, 8, rnd, SO, FG, sw),
      medallion: () => genIslamicStar(cx, cy, sz, 12, comp, rnd, SO, FG, FG2, sw),
      pattern:   () => genPattern(0, 0, state.w, state.h, comp, sym, rnd, SO, FG, sw, 'islamic'),
    },
    minimal: {
      symbol:  () => genMinimalSymbol(cx, cy, sz, comp, sym, rnd, SO, FG, sw),
      line:    () => genDivider(0, cy, state.w, comp * 0.3, sym, rnd, SO, FG, sw, 'min'),
      grid:    () => genMinGrid(0, 0, state.w, state.h, comp, rnd, SO, FG, sw),
      circle:  () => genMinCircles(cx, cy, sz, comp, rnd, SO, FG, sw),
      mark:    () => genMinimalSymbol(cx, cy, sz * 0.7, comp * 0.5, sym, rnd, SO, FG, sw),
      glyph:   () => genGlyph(cx, cy, sz, comp, sym, rnd, SO, FG, sw),
    },
    organic: {
    leaf:         () => genOrganicLeaf(cx, cy, sz, comp, sym, rnd, SO, FG, sw),
    spiral:       () => genOrganicSpiral(cx, cy, sz, comp, rnd, SO, FG, sw),
    branch:       () => genOrganicBranch(cx, cy, sz, comp, rnd, SO, FG, sw),
    flower:       () => genOrganicFlower(cx, cy, sz, n, comp, rnd, SO, FG, FG2, sw),
    mandala:      () => genMandala(cx, cy, sz, 8, layers, comp, rnd, SO, FG, FG2, sw),
    phyllotaxis:  () => genPhyllotaxis(cx, cy, sz, comp, sym, rnd, SO, FG, FG2, sw),
      wave:    () => genWave(0, cy, state.w, state.h, comp, rnd, SO, FG, sw),
    },
  };

  const gen = generators[style] && generators[style][type];
  if (gen) return gen();

  // fallback
  return genMandala(cx, cy, sz, n, layers, comp, rnd, SO, FG, FG2, sw);
}

export function doGen() {
  const btn = document.getElementById('gen-btn');
  btn.disabled = true;
  setStatus('Generating…');

  const cw = +(document.getElementById('cw').value);
  const ch = +(document.getElementById('ch').value);
  state.w = cw || 400;
  state.h = ch || 400;
  state.comp  = +document.getElementById('s-comp').value / 100;
  state.sym   = +document.getElementById('s-sym').value / 100;
  state.sw    = +document.getElementById('s-sw').value / 10;
  state.fill  = +document.getElementById('s-fill').value / 100;
  state.seed  = +document.getElementById('s-seed').value;

  const pal = PALETTES[state.pal];
  const bgColor = state.darkBg ? '#111' : '#fff';

  if (state.mode === 'pixel') {
    genPixelArt();
    document.getElementById('main-svg').style.display = 'none';
    document.getElementById('px-canvas').style.display = 'block';
    setStatus(`Pixel Art · ${state.w}×${state.h}`);
    btn.disabled = false;
    fitToView();
    return;
  }

  const text = document.getElementById('tv-ta').value.trim();
  const cx = state.w / 2, cy = state.h / 2, sz = Math.min(state.w, state.h) * 0.46;

  let content;
  if (text && (state.type === 'glyph' || state.type === 'symbol' || state.type === 'mark')) {
    content = genTextShape(cx, cy, sz, state.comp, state.sym, mkRand(state.seed), '', '', state.sw);
  } else {
    content = generateContent(state.style, state.type, cx, cy, sz, state.comp, state.sym, state.seed, pal, state.sw, state.fill);
  }

  const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="${state.w}" height="${state.h}" viewBox="0 0 ${state.w} ${state.h}">
  <rect class="bg-rect" width="${state.w}" height="${state.h}" fill="${bgColor}"/>
  ${content}
</svg>`;

  document.getElementById('main-svg').outerHTML = svgMarkup.replace('<svg ', '<svg id="main-svg" ');
  // Re-get after replacing
  setTimeout(() => {
    const newSvg = document.querySelector('#svg-holder svg');
    if (newSvg) newSvg.id = 'main-svg';
    fitToView();
    generateVariations();
    updateInfo();
    setStatus(`Done · ${state.style} / ${state.type}`);
    btn.disabled = false;
  }, 20);
}

export function doGenRandom() {
  // FIX-001: sorteia seed novo a cada click — o botão ↻ deixa de ser idempotente
  state.seed = Math.ceil(Math.random() * 999);
  document.getElementById('s-seed').value = state.seed;
  document.getElementById('sv-seed').textContent = state.seed;
  doGen();
}
export function generateVariations() {
  const seeds = [state.seed, state.seed + 111, state.seed + 222, state.seed + 333];
  const pal = PALETTES[state.pal];
  const sw = state.sw;
  const thumbSz = 50;
  const tw = 60, th = 60;
  const cx = tw / 2, cy = th / 2, sz = Math.min(tw, th) * 0.44;

  for (let i = 0; i < 4; i++) {
    const c = generateContent(state.style, state.type, cx, cy, sz, state.comp, state.sym, seeds[i], pal, 0.8, 0);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${tw} ${th}"><rect width="${tw}" height="${th}" fill="#fff"/>${c}</svg>`;
    state.vars[i] = svg;
    state.vars[i + '_seed'] = seeds[i];
    document.getElementById('vt' + i).innerHTML = svg;
    document.getElementById('vt' + i).className = 'vthumb' + (i === state.activeVar ? ' active' : '');
  }
}

export function applyVar(i) {
  state.activeVar = i;
  if (state.vars[i + '_seed'] !== undefined) {
    state.seed = state.vars[i + '_seed'];
    document.getElementById('s-seed').value = state.seed;
    document.getElementById('sv-seed').textContent = state.seed;
  }
  for (let j = 0; j < 4; j++) document.getElementById('vt' + j).className = 'vthumb' + (j === i ? ' active' : '');
  doGen();
}

export function updateInfo() {
  const el = document.getElementById('info-box');
  const approxPaths = document.querySelectorAll('#main-svg path, #main-svg circle, #main-svg line, #main-svg rect, #main-svg ellipse, #main-svg polygon').length;
  el.innerHTML = `<b>Style</b> ${state.style}<br><b>Type</b> ${state.type}<br><b>Canvas</b> ${state.w}×${state.h}<br><b>Palette</b> ${PALETTES[state.pal].name}<br><b>Elements</b> ~${approxPaths}<br><b>Seed</b> ${state.seed}`;
}

export function setStatus(msg) {
  document.getElementById('tb-status').innerHTML = `<span>${msg}</span>`;
}
