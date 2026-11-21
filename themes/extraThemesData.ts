/*
 * Extra Cinny themes: palettes of well-known colour schemes, expanded into the
 * full set of `folds` colour tokens that Cinny's own themes define.
 *
 * To add a theme: append a Palette to `palettes` below. Everything else
 * (hover/active/line shades, containers, text-on-colour) is derived.
 * Run `node check-themes.mjs` afterwards to check the contrast.
 *
 * This file has no imports so it can be loaded by plain Node for checks.
 */

export type Kind = 'light' | 'dark';

export type Palette = {
  id: string; // CSS class + settings id, must end in -theme
  name: string; // shown in Settings > General > Appearance
  kind: Kind;
  background: string; // outer chrome (sidebars); the darker of the two in both kinds
  surface: string; // main content
  surfaceVariant: string; // inputs, cards
  text: string;
  primary: string; // accent: buttons, selection, mentions
  success: string;
  warning: string;
  critical: string;
  link: string;
  /** Force the text colour on filled buttons/badges of a colour (default: best contrast). */
  onColor?: Partial<Record<'primary' | 'success' | 'warning' | 'critical', string>>;
};

export const palettes: Palette[] = [
  // Vates — same colours as the "vates" preset in CalRS (src/web/branding.rs)
  {
    id: 'vates-light-theme',
    name: 'Vates Light',
    kind: 'light',
    background: '#F5F4F0',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F4F0',
    text: '#1A1B38',
    primary: '#BE1621',
    success: '#2CA878',
    warning: '#B45309',
    critical: '#BE1621',
    link: '#BE1621',
  },
  {
    id: 'vates-dark-theme',
    name: 'Vates Dark',
    kind: 'dark',
    background: '#1A1B38',
    surface: '#262748',
    surfaceVariant: '#32335A',
    text: '#F0EFE8',
    primary: '#E0424C',
    success: '#2CA878',
    warning: '#EF7F18',
    critical: '#E0424C',
    link: '#E0424C',
    // CalRS puts white on its red buttons (4.2:1, fine for bold labels); best-contrast would pick black.
    onColor: { primary: '#FFFFFF', critical: '#FFFFFF' },
  },
  // OLED: pure black where it covers large areas (pixels off), near-black
  // bubbles/inputs so they stay visible, off-white text to avoid glare.
  {
    id: 'oled-black-theme',
    name: 'OLED Black',
    kind: 'dark',
    background: '#000000',
    surface: '#000000',
    surfaceVariant: '#141414',
    text: '#E6E6E6',
    primary: '#BDB6EC', // Cinny's own dark accent
    success: '#85E0BA',
    warning: '#E3BA91',
    critical: '#E69D9D',
    link: '#99C2FF',
  },
  {
    id: 'vates-oled-theme',
    name: 'Vates OLED',
    kind: 'dark',
    background: '#000000',
    surface: '#000000',
    surfaceVariant: '#13132A', // a hint of Vates navy
    text: '#F0EFE8',
    primary: '#E0424C',
    success: '#2CA878',
    warning: '#EF7F18',
    critical: '#E0424C',
    link: '#FF8A8F',
    onColor: { primary: '#FFFFFF', critical: '#FFFFFF' },
  },
  // Catppuccin — https://catppuccin.com/palette
  {
    id: 'catppuccin-latte-theme',
    name: 'Catppuccin Latte',
    kind: 'light',
    background: '#E6E9EF',
    surface: '#EFF1F5',
    surfaceVariant: '#DCE0E8',
    text: '#4C4F69',
    primary: '#8839EF',
    success: '#40A02B',
    warning: '#C2812C', // yellow #DF8E1D darkened 20% for contrast
    critical: '#D20F39',
    link: '#1E66F5',
  },
  {
    id: 'catppuccin-frappe-theme',
    name: 'Catppuccin Frappé',
    kind: 'dark',
    background: '#292C3C',
    surface: '#303446',
    surfaceVariant: '#414559',
    text: '#C6D0F5',
    primary: '#CA9EE6',
    success: '#A6D189',
    warning: '#EF9F76',
    critical: '#E78284',
    link: '#8CAAEE',
  },
  {
    id: 'catppuccin-macchiato-theme',
    name: 'Catppuccin Macchiato',
    kind: 'dark',
    background: '#1E2030',
    surface: '#24273A',
    surfaceVariant: '#363A4F',
    text: '#CAD3F5',
    primary: '#C6A0F6',
    success: '#A6DA95',
    warning: '#F5A97F',
    critical: '#ED8796',
    link: '#8AADF4',
  },
  {
    id: 'catppuccin-mocha-theme',
    name: 'Catppuccin Mocha',
    kind: 'dark',
    background: '#181825',
    surface: '#1E1E2E',
    surfaceVariant: '#313244',
    text: '#CDD6F4',
    primary: '#CBA6F7',
    success: '#A6E3A1',
    warning: '#FAB387',
    critical: '#F38BA8',
    link: '#89B4FA',
  },
  // Dracula — https://draculatheme.com/contribute
  {
    id: 'dracula-theme',
    name: 'Dracula',
    kind: 'dark',
    background: '#21222C',
    surface: '#282A36',
    surfaceVariant: '#343746',
    text: '#F8F8F2',
    primary: '#BD93F9',
    success: '#50FA7B',
    warning: '#FFB86C',
    critical: '#FF5555',
    link: '#8BE9FD',
  },
  // Nord — https://www.nordtheme.com/docs/colors-and-palettes
  {
    id: 'nord-theme',
    name: 'Nord',
    kind: 'dark',
    background: '#2E3440',
    surface: '#3B4252',
    surfaceVariant: '#434C5E',
    text: '#ECEFF4',
    primary: '#88C0D0',
    success: '#A3BE8C',
    warning: '#EBCB8B',
    critical: '#D08770',
    link: '#81A1C1',
  },
  // Gruvbox — https://github.com/morhetz/gruvbox
  {
    id: 'gruvbox-light-theme',
    name: 'Gruvbox Light',
    kind: 'light',
    background: '#F2E5BC',
    surface: '#FBF1C7',
    surfaceVariant: '#EBDBB2',
    text: '#3C3836',
    primary: '#AF3A03',
    success: '#79740E',
    warning: '#B57614',
    critical: '#9D0006',
    link: '#076678',
  },
  {
    id: 'gruvbox-dark-theme',
    name: 'Gruvbox Dark',
    kind: 'dark',
    background: '#1D2021',
    surface: '#282828',
    surfaceVariant: '#3C3836',
    text: '#EBDBB2',
    primary: '#FE8019',
    success: '#B8BB26',
    warning: '#FABD2F',
    critical: '#FB4934',
    link: '#83A598',
  },
  // Solarized — https://ethanschoonover.com/solarized/
  {
    id: 'solarized-light-theme',
    name: 'Solarized Light',
    kind: 'light',
    background: '#EEE8D5',
    surface: '#FDF6E3',
    surfaceVariant: '#EEE8D5',
    text: '#465A61', // base01 #586E75, slightly darker for contrast
    primary: '#268BD2',
    success: '#859900',
    warning: '#B58900',
    critical: '#DC322F',
    link: '#268BD2',
  },
  {
    id: 'solarized-dark-theme',
    name: 'Solarized Dark',
    kind: 'dark',
    background: '#00212B',
    surface: '#002B36',
    surfaceVariant: '#073642',
    text: '#93A1A1',
    primary: '#268BD2',
    success: '#859900',
    warning: '#B58900',
    critical: '#DC322F',
    link: '#2AA198',
  },
  // Tokyo Night — https://github.com/folke/tokyonight.nvim
  {
    id: 'tokyo-night-theme',
    name: 'Tokyo Night',
    kind: 'dark',
    background: '#16161E',
    surface: '#1A1B26',
    surfaceVariant: '#292E42',
    text: '#C0CAF5',
    primary: '#7AA2F7',
    success: '#9ECE6A',
    warning: '#E0AF68',
    critical: '#F7768E',
    link: '#7DCFFF',
  },
  // Rosé Pine — https://rosepinetheme.com/palette
  {
    id: 'rose-pine-dawn-theme',
    name: 'Rosé Pine Dawn',
    kind: 'light',
    background: '#F2E9E1',
    surface: '#FAF4ED',
    surfaceVariant: '#F2E9E1',
    text: '#575279',
    primary: '#907AA9',
    success: '#286983',
    warning: '#C58A45', // gold #EA9D34 darkened 25% for contrast
    critical: '#B4637A',
    link: '#56949F',
  },
  {
    id: 'rose-pine-theme',
    name: 'Rosé Pine',
    kind: 'dark',
    background: '#191724',
    surface: '#1F1D2E',
    surfaceVariant: '#26233A',
    text: '#E0DEF4',
    primary: '#C4A7E7',
    success: '#9CCFD8',
    warning: '#F6C177',
    critical: '#EB6F92',
    link: '#9CCFD8',
  },
];

// ---------------------------------------------------------------------------
// Colour helpers

type RGB = [number, number, number];

const toRgb = (hex: string): RGB => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
};

const toHex = (rgb: RGB): string =>
  `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('').toUpperCase()}`;

/** Move `t` (0..1) of the way from colour a to colour b. */
export const mix = (a: string, b: string, t: number): string => {
  const x = toRgb(a);
  const y = toRgb(b);
  return toHex([0, 1, 2].map((i) => x[i] + (y[i] - x[i]) * t) as RGB);
};

const luminance = (hex: string): number => {
  const [r, g, b] = toRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** WCAG contrast ratio, 1..21. */
export const contrast = (a: string, b: string): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
};

/** Best readable colour on `bg`: the palette's own colours first, black/white as a last resort. */
const onColor = (bg: string, own: string[]): string => {
  const best = (list: string[]) =>
    list.reduce((p, q) => (contrast(bg, q) > contrast(bg, p) ? q : p));
  const fromPalette = best(own);
  if (contrast(bg, fromPalette) >= 4.5) return fromPalette;
  return best([fromPalette, '#FFFFFF', '#000000']);
};

// ---------------------------------------------------------------------------
// Palette -> folds colour tokens (same shape as Cinny's src/colors.css.ts)

const containerGroup = (c: string, p: Palette) => ({
  Container: c,
  ContainerHover: mix(c, p.text, 0.055),
  ContainerActive: mix(c, p.text, 0.11),
  ContainerLine: mix(c, p.text, 0.165),
  OnContainer: p.text,
});

const accentGroup = (main: string, p: Palette, forcedOn?: string) => {
  const dark = p.kind === 'dark';
  // Dark themes: shades move toward the background; light themes: toward black.
  const shade = dark ? p.background : '#000000';
  const steps = dark ? [0.065, 0.1, 0.135] : [0.1, 0.145, 0.2];
  const base = dark ? p.background : p.surface;
  const cSteps = dark ? [0.24, 0.29, 0.335, 0.375] : [0.16, 0.21, 0.26, 0.31];
  const container = mix(base, main, cSteps[0]);
  const onContainerWanted = dark ? mix(p.text, main, 0.3) : mix(main, '#000000', 0.3);
  return {
    Main: main,
    MainHover: mix(main, shade, steps[0]),
    MainActive: mix(main, shade, steps[1]),
    MainLine: mix(main, shade, steps[2]),
    OnMain: forcedOn ?? onColor(main, [p.background, p.surface, p.text]),
    Container: container,
    ContainerHover: mix(base, main, cSteps[1]),
    ContainerActive: mix(base, main, cSteps[2]),
    ContainerLine: mix(base, main, cSteps[3]),
    OnContainer:
      contrast(container, onContainerWanted) >= 4.5
        ? onContainerWanted
        : onColor(container, [p.text, onContainerWanted]),
  };
};

export const tokens = (p: Palette) => ({
  Background: containerGroup(p.background, p),
  Surface: containerGroup(p.surface, p),
  SurfaceVariant: containerGroup(p.surfaceVariant, p),
  Primary: accentGroup(p.primary, p, p.onColor?.primary),
  Secondary: {
    Main: p.text,
    MainHover: mix(p.text, p.background, 0.06),
    MainActive: mix(p.text, p.background, 0.115),
    MainLine: mix(p.text, p.background, 0.175),
    OnMain: p.background,
    Container: mix(p.background, p.text, 0.176),
    ContainerHover: mix(p.background, p.text, 0.235),
    ContainerActive: mix(p.background, p.text, 0.29),
    ContainerLine: mix(p.background, p.text, 0.35),
    OnContainer: p.text,
  },
  Success: accentGroup(p.success, p, p.onColor?.success),
  Warning: accentGroup(p.warning, p, p.onColor?.warning),
  Critical: accentGroup(p.critical, p, p.onColor?.critical),
  Other:
    p.kind === 'dark'
      ? {
          FocusRing: 'rgba(255, 255, 255, 0.5)',
          Shadow: 'rgba(0, 0, 0, 1)',
          Overlay: 'rgba(0, 0, 0, 0.8)',
        }
      : {
          FocusRing: 'rgba(0 0 0 / 50%)',
          Shadow: 'rgba(0 0 0 / 20%)',
          Overlay: 'rgba(0 0 0 / 50%)',
        },
});
