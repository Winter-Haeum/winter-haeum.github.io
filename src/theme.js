import { createTheme } from '@mui/material/styles';

const typography = {
  fontFamily: "'Pretendard Variable', 'Pretendard', 'Inter', system-ui, sans-serif",
  h1: { fontSize: '2.25rem',  fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.02em' },
  h2: { fontSize: '1.875rem', fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.02em' },
  h3: { fontSize: '1.5rem',   fontWeight: 600, lineHeight: 1.4,  letterSpacing: '-0.01em' },
  h4: { fontSize: '1.25rem',  fontWeight: 600, lineHeight: 1.4  },
  h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4  },
  h6: { fontSize: '1rem',     fontWeight: 600, lineHeight: 1.4  },
  body1:   { fontSize: '1rem',      lineHeight: 1.75 },
  body2:   { fontSize: '0.875rem',  lineHeight: 1.6  },
  caption: { fontSize: '0.75rem',   lineHeight: 1.4,  letterSpacing: '0.01em' },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
};

const shape = { borderRadius: 8 };
const spacing = 8;

// ─── Light Mode ───────────────────────────────────────────────────────────────

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FAF8F5',  // cream-50
      paper:   '#F2EDE6',  // cream-100
    },
    primary: {
      main:         '#8464C8',  // violet-500
      light:        '#A080DC',  // violet-400
      dark:         '#5E3EA8',  // violet-700
      contrastText: '#FAF8F5',
    },
    text: {
      primary:   '#2C2840',  // ink-900
      secondary: '#4A4560',  // ink-700
      disabled:  '#B8B2C8',  // ink-300
    },
    divider: '#DDD5C8',       // cream-300
    success: { main: '#6070C0', light: '#EAEef8', contrastText: '#2A3060' },
    warning: { main: '#8464C8', light: '#F0EAF8', contrastText: '#3A2060' },
    error:   { main: '#A85890', light: '#F5E8F0', contrastText: '#4A1840' },
    info:    { main: '#8464C8', light: '#F4F0FC', contrastText: '#2C2840' },
  },
  typography,
  shape,
  spacing,
});

// ─── Dark Mode ────────────────────────────────────────────────────────────────

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1C182C',  // 딥 퍼플 잉크
      paper:   '#24203A',  // dark-surface
    },
    primary: {
      main:         '#B39EDD',  // dark-violet-500
      light:        '#C8B8F0',  // dark-violet-400
      dark:         '#8464C8',  // violet-500
      contrastText: '#1C182C',
    },
    text: {
      primary:   '#F0EBE3',  // 크림 화이트
      secondary: '#C4BCCE',  // dark-text-secondary
      disabled:  '#5C5878',  // dark-text-disabled
    },
    divider: '#3C3858',       // dark-border
    success: { main: '#A4AADA', light: '#20243C', contrastText: '#C4CCEC' },
    warning: { main: '#C8B4F0', light: '#281E3C', contrastText: '#E0D4F8' },
    error:   { main: '#D4A8C4', light: '#2C1A2C', contrastText: '#EED4E8' },
    info:    { main: '#C8B4F0', light: '#221E38', contrastText: '#E0D8F8' },
  },
  typography,
  shape,
  spacing,
});
