/**
 * CategoryCard 컴포넌트 — Home 카테고리 카드
 *
 * Props:
 * @param {Object} category - 카테고리 데이터 객체 [Required]
 * @param {string} category.emoji - 카테고리 이모지
 * @param {string} category.name - 카테고리 이름
 * @param {string} category.slug - URL 슬러그
 * @param {string[]} category.sections - 하위 섹션 이름 목록
 *
 * Example usage:
 * <CategoryCard category={categories[0]} />
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { stripSectionNumber } from '@/utils/slugify';

const MAX_VISIBLE = 3;

function CategoryCard({ category }) {
  const { emoji, name, slug, sections } = category;
  const visible = sections.slice(0, MAX_VISIBLE);
  const remaining = sections.length - MAX_VISIBLE;

  return (
    <Box
      component={Link}
      to={`/${slug}`}
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: '12px',
        padding: '24px',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease, border-color 0.15s ease',

        // Hover
        '&:hover': {
          backgroundColor: theme.palette.mode === 'light' ? '#DDD5C8' : '#3C3858',
          borderColor: theme.palette.mode === 'light' ? '#BCA4EC' : '#5C5490',
          '& .card-arrow': {
            color: theme.palette.primary.main,
          },
        },

        // Focus (키보드 탐색 전용)
        '&:focus-visible': {
          borderColor: theme.palette.mode === 'light' ? '#A080DC' : theme.palette.primary.main,
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '3px',
        },

        // Active (클릭 중)
        '&:active': {
          backgroundColor: theme.palette.mode === 'light' ? '#EDE8FA' : '#2A2544',
          borderColor: theme.palette.primary.main,
          transition: 'none',
          '& .card-arrow': {
            color: theme.palette.primary.dark,
          },
        },

        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
        },
      })}
    >
      {/* 이모지 */}
      <Box
        component='span'
        aria-hidden='true'
        sx={{ fontSize: '1.75rem', lineHeight: 1, mb: 1, display: 'block' }}
      >
        {emoji}
      </Box>

      {/* 카테고리 이름 */}
      <Typography
        variant='h4'
        component='h3'
        sx={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'text.primary',
          lineHeight: 1.4,
          mb: 1.5,
        }}
      >
        {name}
      </Typography>

      {/* 섹션 chip 태그 */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px', mb: 2 }}>
        {visible.map((section) => (
          <Box
            key={section}
            component='span'
            sx={(theme) => ({
              fontSize: '0.72rem',
              px: '8px',
              py: '2px',
              borderRadius: '6px',
              backgroundColor: theme.palette.mode === 'light' ? '#DDD5C8' : '#3C3858',
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
              whiteSpace: 'nowrap',
            })}
          >
            {stripSectionNumber(section)}
          </Box>
        ))}
        {remaining > 0 && (
          <Box
            component='span'
            sx={(theme) => ({
              fontSize: '0.72rem',
              px: '8px',
              py: '2px',
              borderRadius: '6px',
              backgroundColor: theme.palette.mode === 'light' ? '#DDD5C8' : '#3C3858',
              color: theme.palette.text.disabled,
              lineHeight: 1.6,
            })}
          >
            +{remaining} more
          </Box>
        )}
      </Box>

      {/* 구분선 */}
      <Divider sx={{ mt: 'auto', mb: 2 }} />

      {/* 섹션 수 + 화살표 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='caption' sx={{ color: 'text.disabled', lineHeight: 1 }}>
          {sections.length} section{sections.length !== 1 ? 's' : ''}
        </Typography>
        <ArrowForwardIcon
          className='card-arrow'
          sx={(theme) => ({
            fontSize: '1rem',
            color: theme.palette.mode === 'light' ? '#7A7490' : '#8880A0',
            transition: 'color 0.15s ease',
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          })}
        />
      </Box>
    </Box>
  );
}

export default CategoryCard;
