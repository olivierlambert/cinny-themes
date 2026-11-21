/*
 * Builds the extra themes at compile time (vanilla-extract), from the palettes
 * in extraThemesData.ts. Copied into cinny/src/ by patch-cinny.mjs.
 */
import { createTheme, globalStyle } from '@vanilla-extract/css';
import { color } from 'folds';
import { palettes, tokens, Kind } from './extraThemesData';

export type ExtraTheme = { id: string; name: string; kind: Kind; className: string };

export const extraThemes: ExtraTheme[] = palettes.map((p) => {
  const className = createTheme(color, tokens(p));
  // Link colour per theme. `html.` beats the `.dark-theme` rule in index.css.
  globalStyle(`html.${p.id}`, { vars: { '--tc-link': p.link } });
  return { id: p.id, name: p.name, kind: p.kind, className };
});
