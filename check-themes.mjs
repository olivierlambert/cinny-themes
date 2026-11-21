// Contrast check of the generated tokens (WCAG: 4.5 = AA for normal text).
// Usage: node check-themes.mjs     (Node >= 22.18, which loads .ts files natively)
import { palettes, tokens, contrast } from './themes/extraThemesData.ts';

let fails = 0;
const ids = new Set();
for (const p of palettes) {
  if (!p.id.endsWith('-theme') || ids.has(p.id)) throw new Error(`bad or duplicate id ${p.id}`);
  ids.add(p.id);
  const t = tokens(p);
  const pairs = [
    ['text on Background', t.Background.OnContainer, t.Background.Container, 4.5],
    ['text on Surface', t.Surface.OnContainer, t.Surface.Container, 4.5],
    ['text on SurfaceVariant', t.SurfaceVariant.OnContainer, t.SurfaceVariant.Container, 4.5],
    ['link on Surface', p.link, t.Surface.Container, 3],
  ];
  for (const g of ['Primary', 'Secondary', 'Success', 'Warning', 'Critical']) {
    pairs.push([`${g} OnMain`, t[g].OnMain, t[g].Main, 3]);
    pairs.push([`${g} OnContainer`, t[g].OnContainer, t[g].Container, 4.5]);
    pairs.push([`${g} Main on Surface`, t[g].Main, t.Surface.Container, 2.5]);
  }
  const bad = pairs
    .map(([what, fg, bg, min]) => ({ what, ratio: contrast(fg, bg), min }))
    .filter((r) => r.ratio < r.min);
  const worst = Math.min(...pairs.map(([, fg, bg]) => contrast(fg, bg)));
  console.log(`${bad.length ? 'WARN' : 'ok  '} ${p.name.padEnd(22)} ${p.kind.padEnd(5)} lowest ${worst.toFixed(2)}`);
  for (const b of bad) console.log(`       ${b.what}: ${b.ratio.toFixed(2)} < ${b.min}`);
  fails += bad.length;
}
console.log(`${palettes.length} themes, ${fails} contrast warnings`);
