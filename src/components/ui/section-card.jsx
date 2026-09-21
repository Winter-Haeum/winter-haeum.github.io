/**
 * SectionCard 컴포넌트 — 카테고리 내 섹션 카드
 *
 * Props:
 * @param {string} section      - 섹션 이름 [Required]
 * @param {string} categorySlug - 상위 카테고리 슬러그 [Required]
 *
 * Example usage:
 * <SectionCard section='HTML' categorySlug='frontend' />
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { slugify, stripSectionNumber } from '@/utils/slugify';

function SectionCard({ section, categorySlug }) {
  const sectionSlug = slugify(section);

  return (
    <Box
      component={Link}
      to={`/${categorySlug}/${sectionSlug}`}
      sx={(theme) => ({
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        textDecoration: 'none',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: '10px',
        px: 3,
        py: 2.5,
        transition: 'background-color 0.15s ease, border-color 0.15s ease',

        '&:hover': {
          backgroundColor: theme.palette.mode === 'light' ? '#EAE3D8' : '#2E2A48',
          borderColor: theme.palette.mode === 'light' ? '#BCA4EC' : '#5C5490',
          '& .section-arrow': {
            color: theme.palette.primary.main,
          },
        },

        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '3px',
          borderRadius: '10px',
        },

        '&:active': {
          backgroundColor: theme.palette.mode === 'light' ? '#EDE8FA' : '#2A2544',
          borderColor: theme.palette.primary.main,
          transition: 'none',
        },

        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
        },
      })}
    >
      <Typography
        variant='body1'
        sx={{
          fontWeight: 500,
          color: 'text.primary',
          fontSize: '0.9375rem',
          lineHeight: 1.5,
        }}
      >
        {stripSectionNumber(section)}
      </Typography>

      <ArrowForwardIcon
        className='section-arrow'
        sx={(theme) => ({
          fontSize: '1rem',
          color: theme.palette.mode === 'light' ? '#7A7490' : '#8880A0',
          flexShrink: 0,
          transition: 'color 0.15s ease',
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        })}
      />
    </Box>
  );
}

export default SectionCard;
