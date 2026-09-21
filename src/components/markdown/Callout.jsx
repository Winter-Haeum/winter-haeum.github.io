/**
 * Callout — 학습용 Callout 컴포넌트
 *
 * blockquote의 첫 이모지를 분석해 6가지 유형 + fallback(note)으로 렌더링한다.
 * 유형: concept | caution | best-practice | practice | official-docs | remember | note
 *
 * Props:
 * @param {React.ReactNode} children - blockquote 내부 React 노드 [Required]
 *
 * Example usage:
 * (react-markdown의 blockquote 컴포넌트로 자동 호출됨)
 * > 💡 **Concept**: 설명 텍스트
 */
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const CALLOUT_CONFIG = {
  'concept': {
    light: { bar: '#BCA4EC', bg: '#F4F0FC' },
    dark:  { bar: '#6858A8', bg: '#221E38' },
  },
  'caution': {
    light: { bar: '#8464C8', bg: '#F0EAF8' },
    dark:  { bar: '#7050A0', bg: '#281E3C' },
  },
  'best-practice': {
    light: { bar: '#6070C0', bg: '#EAEef8' },
    dark:  { bar: '#5060A8', bg: '#20243C' },
  },
  'practice': {
    light: { bar: '#A080DC', bg: '#EDE8FA' },
    dark:  { bar: '#9070C8', bg: '#2A2544' },
  },
  'official-docs': {
    light: { bar: '#7080C8', bg: '#E8EDF8' },
    dark:  { bar: '#5870A8', bg: '#1E2238' },
  },
  'remember': {
    light: { bar: '#C890C8', bg: '#F5E8F4' },
    dark:  { bar: '#9060A8', bg: '#2C1A30' },
  },
  'note': {
    light: { bar: '#BCA4EC', bg: '#F4F0FC' },
    dark:  { bar: '#6858A8', bg: '#221E38' },
  },
};

// '⚠️'는 U+26A0 + U+FE0F(variation selector).
// Array.from()[0]으로 첫 코드포인트만 추출하면 '⚠'가 반환되어 정상 매칭된다.
const EMOJI_TYPE_MAP = {
  '💡': 'concept',
  '⚠': 'caution',
  '✅': 'best-practice',
  '🧪': 'practice',
  '🔗': 'official-docs',
  '📌': 'remember',
};

/** React 노드 트리에서 텍스트 추출 */
function getPlainText(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getPlainText).join('');
  if (node.props?.children !== undefined) return getPlainText(node.props.children);
  return '';
}

function detectType(children) {
  const text = getPlainText(children).trimStart();
  const firstCodePoint = Array.from(text)[0] ?? '';
  return EMOJI_TYPE_MAP[firstCodePoint] ?? 'note';
}

function Callout({ children }) {
  const theme = useTheme();
  const type = detectType(children);
  const config = CALLOUT_CONFIG[type][theme.palette.mode];

  // caution은 주의 경고 성격이므로 role="alert", 나머지는 role="note"
  const role = type === 'caution' ? 'alert' : 'note';

  return (
    <Box
      role={role}
      sx={{
        borderLeft: `4px solid ${config.bar}`,
        backgroundColor: config.bg,
        borderRadius: '8px',
        px: '20px',
        py: '16px',
        my: 3,
        overflowWrap: 'anywhere',
        '& p': { mb: 0 },
        '& p:not(:last-child)': { mb: 1.5 },
      }}
    >
      {children}
    </Box>
  );
}

export default Callout;
