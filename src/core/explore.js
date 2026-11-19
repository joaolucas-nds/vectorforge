// src/core/explore.js
// Ciclo de exploração (Fase A da análise 261112, DEC-015): prévia ao vivo, Surprise (sorteia
// tudo o que não estiver travado e nunca repete o último), cadeados por parâmetro, novo seed,
// desfazer/refazer e variações «Like this». Não toca gerador nenhum: só muda `state`, os
// controles da UI e chama doGen() — por isso o `npm run regress` continua com 0 mudanças.
// Anti-repetição (DEC-022): R e Surprise sorteiam vários candidatos e mostram o que menos repete
// as últimas imagens exibidas — por silhueta e pelas escolhas discretas do gerador.

import { state, STYLES, TYPES_BY_STYLE, PALETTES } from './state.js';
import { mkRand, recordChoices } from './utils.js';
import { buildStyleGrid, buildTypeChips, buildPalettes } from './ui.js';
import { doGen, setStatus, generateContent } from './generate.js';
import { fitToView } from './view.js';
import { occupancy, silhouetteIoU } from './silhouette.js';

/** Parâmetros que o Surprise sorteia e que um cadeado pode travar. */
export const LOCKABLE = ['style', 'type', 'pal', 'comp', 'sym', 'sw', 'fill', 'seed'];
export const locks = {};

const HISTORY_MAX = 60;
const history = [];
let cursor = -1;
let restoring = false;

/** Fotografia dos parâmetros que definem a arte (o que vai para o histórico e para as variações). */
export function snapshot() {
  return { style: state.style, type: state.type, comp: state.comp, sym: state.sym,
           sw: state.sw, fill: state.fill, pal: state.pal, seed: state.seed };
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function setSlider(id, value, label) {
  document.getElementById(id).value = value;
  document.getElementById(id.replace('s-', 'sv-')).textContent = label;
}

/**
 * Escreve um snapshot no `state` e em todos os controles. Os sliders recebem valores em
 * unidades do próprio slider (inteiros), porque doGen() relê os sliders para o `state`.
 */
export function applySnapshot(s) {
  Object.assign(state, s);
  setSlider('s-comp', Math.round(s.comp * 100), Math.round(s.comp * 100));
  setSlider('s-sym', Math.round(s.sym * 100), Math.round(s.sym * 100));
  setSlider('s-sw', Math.round(s.sw * 10), (Math.round(s.sw * 10) / 10).toFixed(1));
  setSlider('s-fill', Math.round(s.fill * 100), Math.round(s.fill * 100) + '%');
  setSlider('s-seed', s.seed, s.seed);
  buildStyleGrid(); buildTypeChips(); buildPalettes();
}

/** Registra o estado atual no histórico (ignora repetição; descarta o «futuro» depois de um undo). */
export function recordHistory() {
  if (restoring) return;
  const s = snapshot();
  if (cursor >= 0 && same(history[cursor], s)) return;
  history.splice(cursor + 1);
  history.push(s);
  if (history.length > HISTORY_MAX) history.shift();
  cursor = history.length - 1;
  updateHistoryButtons();
}

function commit(s) { applySnapshot(s); doGen(); recordHistory(); }

// ── Anti-repetição no sorteio (DEC-022, análise 261119) ─────────────────────
// R e Surprise geram até `max` candidatos e mostram o que menos repete as `recent` últimas imagens
// do histórico. «Repete» = mesma silhueta (IoU ≥ `sameIoU` na malha 16×16) OU mesmas escolhas do
// pickOne no mesmo tipo; as duas juntas pesam o dobro. Empate: o mais distante (fração de escolhas
// diferentes + 1 − IoU). Medido na análise: com 12 candidatos e janela 10, o R chega a 0,2 do piso
// teórico de repetição; janela curta (4) quase não ajuda; o Mitchell puro (só a distância) piora
// com poucas caras. O orçamento protege os tipos pesados (padrão em canvas 1200 ≈ 25 ms por candidato).
export const NOVELTY = { max: 12, min: 2, budgetMs: 30, recent: 10, sameIoU: 0.8 };

const fpCache = new Map();
const FP_CACHE_MAX = 300;

/**
 * Dá para prever o que o doGen vai desenhar? Não no Pixel Art (não é SVG) nem com texto no
 * Text→Form (o doGen desenha com genTextShape, não com generateContent): aí o sorteio é o de antes.
 */
function canPreview() {
  if (state.mode === 'pixel') return false;
  const ta = document.getElementById('tv-ta');
  return !(ta && ta.value.trim());
}

/**
 * «Impressão digital» de um snapshot no canvas atual: silhueta + escolhas do pickOne. Gera o desenho
 * como o doGen geraria (mesmo centro, tamanho e parâmetros), sem tocar o DOM. Guardada em cache.
 * @param {object} s - snapshot
 * @returns {{kind: string, occ: Set<number>, ch: number[]}}
 */
function fingerprint(s) {
  const key = [s.style, s.type, s.comp, s.sym, s.sw, s.fill, s.seed, state.w, state.h].join('|');
  let fp = fpCache.get(key);
  if (!fp) {
    const cx = state.w / 2, cy = state.h / 2, sz = Math.min(state.w, state.h) * 0.46;
    const [svg, ch] = recordChoices(() =>
      generateContent(s.style, s.type, cx, cy, sz, s.comp, s.sym, s.seed, PALETTES[s.pal], s.sw, s.fill));
    fp = { kind: s.style + '/' + s.type, occ: occupancy(svg, state.w, state.h), ch };
    if (fpCache.size >= FP_CACHE_MAX) fpCache.clear();
    fpCache.set(key, fp);
  }
  return fp;
}

/** Fração de posições diferentes entre duas tuplas de escolhas (0 = iguais; vazias = iguais). */
function choiceDistance(a, b) {
  const n = Math.max(a.length, b.length);
  if (!n) return 0;
  let d = 0;
  for (let i = 0; i < n; i++) if (a[i] !== b[i]) d++;
  return d / n;
}

/** Nota de novidade de um candidato contra as imagens recentes (maior = repete menos). */
function noveltyScore(fp, recent) {
  let same = 0, nearest = Infinity;
  for (const r of recent) {
    const v = silhouetteIoU(fp.occ, r.occ);
    const sameKind = r.kind === fp.kind;
    const dc = sameKind ? choiceDistance(fp.ch, r.ch) : 1;
    const sameChoices = sameKind && dc === 0, sameShape = v >= NOVELTY.sameIoU;
    if (sameChoices && sameShape) same += 2; else if (sameChoices || sameShape) same++;
    nearest = Math.min(nearest, dc + (1 - v));
  }
  return -10 * same + (recent.length ? nearest : 0);
}

/**
 * Melhor de vários sorteios: chama draw() até NOVELTY.max vezes (pelo menos NOVELTY.min, e para
 * quando o orçamento de tempo estoura) e devolve o snapshot que menos repete as últimas imagens.
 * Sem previsão possível (canPreview), devolve o primeiro sorteio — o comportamento de antes.
 * @param {() => (object|null)} draw - um sorteio já respeitando cadeados; null = nada a sortear
 * @returns {object|null}
 */
function pickNovel(draw) {
  const first = draw();
  if (!first || !canPreview()) return first;
  const t0 = performance.now();
  const recent = history.slice(Math.max(0, cursor - NOVELTY.recent + 1), cursor + 1).map(fingerprint);
  let best = first, bestScore = noveltyScore(fingerprint(first), recent);
  for (let k = 1; k < NOVELTY.max; k++) {
    if (k >= NOVELTY.min && performance.now() - t0 >= NOVELTY.budgetMs) break;
    const s = draw();
    if (!s) break;
    const sc = noveltyScore(fingerprint(s), recent);
    if (sc > bestScore) { best = s; bestScore = sc; }
  }
  return best;
}

/**
 * Surprise: sorteia cada parâmetro não travado, sempre em unidades que os sliders representam.
 * Travar o tipo também segura o estilo (os tipos pertencem a um estilo). Cada sorteio tenta até
 * 8 vezes produzir algo diferente do estado atual; entre os candidatos, fica o que menos repete
 * as últimas imagens (pickNovel). Se tudo estiver travado, avisa e não muda nada.
 * @param {() => number} [rand] - fonte de acaso (Math.random por padrão; injetável em teste)
 * @returns {boolean} true se gerou algo novo
 */
export function surprise(rand = Math.random) {
  const prev = snapshot();
  const pick = n => Math.floor(rand() * n);
  const int = (a, b) => a + pick(b - a + 1);
  const draw = () => {
    for (let attempt = 0; attempt < 8; attempt++) {
      const s = { ...prev };
      if (!locks.style && !locks.type) s.style = STYLES[pick(STYLES.length)].id;
      const types = TYPES_BY_STYLE[s.style];
      if (!locks.type || !types.includes(s.type)) s.type = types[pick(types.length)];
      if (!locks.pal) s.pal = pick(PALETTES.length);
      if (!locks.comp) s.comp = int(15, 95) / 100;
      if (!locks.sym) s.sym = int(0, 100) / 100;
      if (!locks.sw) s.sw = int(6, 24) / 10;
      if (!locks.fill) s.fill = rand() < 0.5 ? 0 : int(10, 60) / 100;
      if (!locks.seed) s.seed = int(1, 999);
      if (!same(s, prev)) return s;
    }
    return null;
  };
  const s = pickNovel(draw);
  if (s) { commit(s); return true; }
  setStatus('Everything is locked — unlock something to surprise');
  return false;
}

/**
 * Novo seed (tecla R): ação explícita, por isso ignora o cadeado do seed. Nunca repete o atual;
 * entre os candidatos, fica o que menos repete as últimas imagens (pickNovel).
 * @param {() => number} [rand] - fonte de acaso (Math.random por padrão; injetável em teste)
 */
export function newSeed(rand = Math.random) {
  const base = snapshot();
  const draw = () => {
    let seed = base.seed;
    while (seed === base.seed) seed = 1 + Math.floor(rand() * 999);
    return { ...base, seed };
  };
  commit(pickNovel(draw));
}

export function undo() {
  if (cursor <= 0) return false;
  cursor--; restore(); return true;
}
export function redo() {
  if (cursor >= history.length - 1) return false;
  cursor++; restore(); return true;
}
function restore() {
  restoring = true;
  applySnapshot(history[cursor]); doGen();
  restoring = false;
  updateHistoryButtons();
}
function updateHistoryButtons() {
  const u = document.getElementById('btn-undo'), r = document.getElementById('btn-redo');
  if (u) u.disabled = cursor <= 0;
  if (r) r.disabled = cursor >= history.length - 1;
}

/**
 * Variações «Like this»: a 0 é o próprio estado; as outras 3 mexem ±20 pontos em Complexity e
 * Symmetry e trocam o seed — respeitando os cadeados. Determinístico pelo estado atual, para as
 * miniaturas não mudarem sozinhas a cada redesenho.
 * @returns {object[]} 4 snapshots
 */
export function variationSnapshots() {
  const base = snapshot();
  const r = mkRand(base.seed * 7919 + Math.round(base.comp * 100) * 31 + Math.round(base.sym * 100));
  const nudge = v => Math.max(0, Math.min(100, Math.round(v * 100 + (r() * 40 - 20)))) / 100;
  return [0, 1, 2, 3].map(i => i === 0 ? base : {
    ...base,
    comp: locks.comp ? base.comp : nudge(base.comp),
    sym:  locks.sym  ? base.sym  : nudge(base.sym),
    seed: locks.seed ? base.seed : 1 + Math.floor(r() * 999),
  });
}

/** Liga/desliga o cadeado de um parâmetro e atualiza o ícone. */
export function toggleLock(key) {
  locks[key] = !locks[key];
  paintLocks();
}
function paintLocks() {
  document.querySelectorAll('[data-lock]').forEach(b => {
    const on = !!locks[b.dataset.lock];
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.title = (on ? 'Locked — Surprise keeps ' : 'Unlocked — Surprise may change ') + b.dataset.label;
  });
}

/**
 * Embrulha uma ação de UI (escolher estilo, tipo, paleta, proporção, modo) para que ela já
 * redesenhe e entre no histórico — a prévia ao vivo dos controles discretos.
 */
export function live(fn) {
  return (...args) => { fn(...args); doGen(); recordHistory(); };
}

let timer = null;
function schedule(ms) { clearTimeout(timer); timer = setTimeout(doGen, ms); }

const TEXT_TARGET = /^(text|number|search|email|url)$/;
function typingInField(t) {
  return !!t && (t.tagName === 'TEXTAREA' || t.isContentEditable || (t.tagName === 'INPUT' && TEXT_TARGET.test(t.type)));
}

/** Liga a prévia ao vivo dos sliders/campos, os atalhos de teclado e o re-enquadramento (FIX-003). */
export function initExplore() {
  ['s-comp', 's-sym', 's-sw', 's-fill', 's-seed'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => schedule(120));   // arrastando: redesenha com debounce
    el.addEventListener('change', recordHistory);        // soltou: entra no histórico
  });
  ['cw', 'ch'].forEach(id => document.getElementById(id).addEventListener('change', () => { doGen(); recordHistory(); }));
  document.getElementById('tv-ta').addEventListener('input', () => schedule(300));

  document.addEventListener('keydown', e => {
    if (typingInField(e.target)) return;
    const mod = e.ctrlKey || e.metaKey;
    const k = e.key.toLowerCase();
    if (e.code === 'Space' && !mod) { e.preventDefault(); surprise(); }
    else if (k === 'r' && !mod && !e.altKey) { e.preventDefault(); newSeed(); }
    else if (mod && k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
    else if (mod && (k === 'y' || (k === 'z' && e.shiftKey))) { e.preventDefault(); redo(); }
  });

  // FIX-003: re-enquadra quando a janela muda de tamanho ou a aba volta a ficar visível.
  let rt = null;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(fitToView, 150); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) fitToView(); });

  paintLocks();
  recordHistory(); // estado inicial = primeira entrada do histórico
}
