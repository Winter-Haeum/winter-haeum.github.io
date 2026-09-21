/**
 * Breadcrumb 컴포넌트 — 페이지 탐색 경로 표시
 *
 * Props:
 * @param {Object} category            - 현재 카테고리 객체 [Required]
 * @param {string} category.name       - 카테고리 이름
 * @param {string} category.slug       - 카테고리 슬러그
 * @param {string} [section]           - 섹션 이름 [Optional] — 제공 시 3단계 이상
 * @param {string} [sectionSlug]       - 섹션 슬러그 [Optional] — doc 제공 시 섹션 링크 URL
 * @param {string} [doc]               - 문서 제목 [Optional] — 제공 시 4단계 breadcrumb
 *
 * Example usage:
 * <Breadcrumb category={category} />
 * <Breadcrumb category={category} section='HTML' />
 * <Breadcrumb category={category} section='Setup' sectionSlug='setup' doc='Step 1' />
 */
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { stripSectionNumber } from '@/utils/slugify';

const linkSx = (theme) => ({
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
});

const currentSx = {
  color: 'text.primary',
  fontWeight: 500,
  wordBreak: 'break-word',
};

function Breadcrumb({ category, section, sectionSlug, doc }) {
  return (
    <MuiBreadcrumbs
      aria-label='breadcrumb'
      sx={{ mb: 4, '& .MuiBreadcrumbs-ol': { flexWrap: 'wrap' } }}
    >

      {/* Home — 항상 링크 */}
      <Typography component={Link} to='/' variant='body2' sx={linkSx}>
        Home
      </Typography>

      {/* Category — section 있으면 링크, 없으면 현재 위치 */}
      {section ? (
        <Typography component={Link} to={`/${category.slug}`} variant='body2' sx={linkSx}>
          {category.name}
        </Typography>
      ) : (
        <Typography variant='body2' sx={currentSx} aria-current='page'>
          {category.name}
        </Typography>
      )}

      {/* Section — doc 있으면 링크, 없으면 현재 위치 */}
      {section && (
        doc ? (
          <Typography
            component={Link}
            to={`/${category.slug}/${sectionSlug}`}
            variant='body2'
            sx={linkSx}
          >
            {stripSectionNumber(section)}
          </Typography>
        ) : (
          <Typography variant='body2' sx={currentSx} aria-current='page'>
            {stripSectionNumber(section)}
          </Typography>
        )
      )}

      {/* Document — 제공 시 현재 위치 */}
      {doc && (
        <Typography variant='body2' sx={currentSx} aria-current='page'>
          {doc}
        </Typography>
      )}

    </MuiBreadcrumbs>
  );
}

export default Breadcrumb;
