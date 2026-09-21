/**
 * StatusBadge — 문서 학습 상태 배지
 *
 * Props:
 * @param {string} status - 학습 상태 [Required]
 *   'draft' | 'in-progress' | 'review' | 'completed'
 *
 * Example usage:
 * <StatusBadge status="completed" />
 * <StatusBadge status="in-progress" />
 */
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const STATUS_CONFIG = {
  'draft': {
    label: 'DRAFT',
    light: { bg: '#EAE3D8', color: '#7A7490', border: '#DDD5C8' },
    dark:  { bg: '#24203A', color: '#8880A0', border: '#3C3858' },
  },
  'in-progress': {
    label: 'IN PROGRESS',
    light: { bg: '#EDE8FA', color: '#8464C8', border: '#BCA4EC' },
    dark:  { bg: '#2A2544', color: '#B39EDD', border: '#5C5490' },
  },
  'review': {
    label: 'REVIEW',
    light: { bg: '#D4C8F4', color: '#5E3EA8', border: '#A080DC' },
    dark:  { bg: '#2E2A48', color: '#C8B8F0', border: '#6858A8' },
  },
  'completed': {
    label: 'COMPLETED',
    light: { bg: '#EAEef8', color: '#6070C0', border: '#8898D8' },
    dark:  { bg: '#20243C', color: '#A4AADA', border: '#5060A8' },
  },
};

function StatusBadge({ status }) {
  const theme = useTheme();
  const entry = STATUS_CONFIG[status] ?? STATUS_CONFIG['draft'];
  const colors = entry[theme.palette.mode];

  return (
    <Box
      component='span'
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        px: '10px',
        py: '3px',
        borderRadius: '6px',
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.bg,
        color: colors.color,
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        lineHeight: 1,
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      <Box
        component='span'
        aria-hidden='true'
        sx={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: colors.color,
          flexShrink: 0,
        }}
      />
      {entry.label}
    </Box>
  );
}

export default StatusBadge;
