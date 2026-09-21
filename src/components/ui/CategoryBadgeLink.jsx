/**
 * CategoryBadgeLink — 카테고리 이모지 + 이름 링크
 *
 * DocPage · SectionPage 공통 사용.
 * 카테고리 페이지(/:category)로 이동하는 뱃지형 인라인 링크.
 *
 * Props:
 * @param {Object} category       - 카테고리 객체 [Required]
 * @param {string} category.slug  - 카테고리 슬러그 (링크 경로에 사용)
 * @param {string} category.name  - 카테고리 이름 (표시 텍스트)
 * @param {string} category.emoji - 카테고리 이모지 (장식용)
 *
 * Example usage:
 * <CategoryBadgeLink category={category} />
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function CategoryBadgeLink({ category }) {
  return (
    <Typography
      component={Link}
      to={`/${category.slug}`}
      variant='body2'
      sx={(theme) => ({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        mb: 2,
        color: theme.palette.text.secondary,
        textDecoration: 'none',
        transition: 'color 0.15s ease',
        '&:hover': { color: theme.palette.primary.main },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
          borderRadius: '2px',
        },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      })}
    >
      <Box component='span' aria-hidden='true'>{category.emoji}</Box>
      {category.name}
    </Typography>
  );
}

export default CategoryBadgeLink;
