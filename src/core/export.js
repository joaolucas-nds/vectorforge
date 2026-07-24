// Gerado a partir de vectorforge.html v0.2.0 (F3 esbuild) — corpo das funções preservado 1:1.

import { state } from './state.js';
import { setStatus } from './generate.js';

export function getSVGString() {
  const svg = document.getElementById('main-svg');
  if (!svg) return '';
  const clone = svg.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  return '<?xml version="1.0" encoding="UTF-8"?>\n' + clone.outerHTML;
}

export function xSVG() {
  const str = getSVGString();
  if (!str) return;
  const blob = new Blob([str], { type: 'image/svg+xml' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `vectorforge-${state.style}-${state.type}-${state.seed}.svg`;
  a.click();
  setStatus('SVG exported ✓');
}

export function xPNG() {
  // FIX-002: Pixel Art — exporta px-canvas diretamente (não o SVG)
  if (state.mode === 'pixel') {
    const px = document.getElementById('px-canvas');
    if (!px) return;
    const out = document.createElement('canvas');
    out.width = state.w || 400; out.height = state.h || 400;
    const ctx = out.getContext('2d');
    ctx.imageSmoothingEnabled = false; // preserva aspecto pixelado no upscale
    ctx.drawImage(px, 0, 0, out.width, out.height);
    out.toBlob(b => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.download = `vectorforge-pixel-${state.seed}.png`;
      a.click();
      setStatus('Pixel Art PNG exported ✓');
    });
    return;
  }
  // Modo Vector — renderiza SVG em canvas intermediário @2x
  const str = getSVGString();
  if (!str) return;
  const blob = new Blob([str], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = state.w * 2; canvas.height = state.h * 2;
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.drawImage(img, 0, 0);
    canvas.toBlob(b => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.download = `vectorforge-${state.style}-${state.type}-${state.seed}.png`;
      a.click();
      setStatus('PNG exported @2x ✓');
    });
  };
  img.src = url;
}
export function copySVG() {
  const str = getSVGString();
  navigator.clipboard.writeText(str).then(() => setStatus('SVG code copied ✓'));
}
