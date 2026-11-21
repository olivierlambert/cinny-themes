// Registers the extra themes in a Cinny source tree.
// Usage: node patch-cinny.mjs <cinny-src-dir>   (run after copying themes/* into <dir>/src/)
// Fails loudly if upstream code moved, instead of building an image without themes.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
if (!root) throw new Error('usage: node patch-cinny.mjs <cinny-src-dir>');
for (const f of ['extraThemes.css.ts', 'extraThemesData.ts']) {
  if (!existsSync(join(root, 'src', f))) throw new Error(`src/${f} missing: copy themes/ first`);
}

const file = join(root, 'src/app/hooks/useTheme.ts');
let src = readFileSync(file, 'utf8');
if (src.includes('extraThemes')) {
  console.log('useTheme.ts already patched');
  process.exit(0);
}

const edit = (name, re, fn) => {
  if (!re.test(src)) throw new Error(`patch-cinny: anchor not found (${name}); upstream useTheme.ts changed`);
  src = src.replace(re, fn);
};

// 1. import the extra themes next to Cinny's own colour themes
edit('colors import', /^(import .* from '\.\.\/\.\.\/colors\.css';)$/m,
  (line) => `${line}\nimport { extraThemes } from '../../extraThemes.css';`);

// 2. turn them into Theme objects, just before useThemes()
edit('useThemes', /^export const useThemes\b/m, (m) => `export const ExtraThemes: Theme[] = extraThemes.map((t) => ({
  id: t.id,
  kind: t.kind === 'dark' ? ThemeKind.Dark : ThemeKind.Light,
  classNames:
    t.kind === 'dark'
      ? [t.id, t.className, onDarkFontWeight, 'prism-dark', 'dark-theme']
      : [t.id, t.className, onLightFontWeight, 'prism-light'],
}));

${m}`);

// 3. append them to the list shown in settings
edit('themes list', /(const themes: Theme\[\] = useMemo\(\(\) => \[)([^\]]*?)(\])/,
  (_, a, list, b) => `${a}${list.trimEnd()}, ...ExtraThemes${b}`);

// 4. give them their display names
edit('theme names', /(export const useThemeNames[\s\S]*?useMemo\(\s*\(\) => \(\{)/,
  (m) => `${m}\n      ...Object.fromEntries(extraThemes.map((t) => [t.id, t.name])),`);

writeFileSync(file, src);
console.log(`useTheme.ts patched: ${'extra themes registered'}`);
