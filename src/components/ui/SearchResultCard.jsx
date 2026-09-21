/**
 * SearchResultCard — 검색 결과 카드
 *
 * SearchIndexItem 하나를 카드 형태로 표시한다.
 * 클릭 시 item.url (DocPage 또는 SectionPage) 로 이동한다.
 *
 * Props:
 * @param {Object}  item          - SearchIndexItem [Required]
 * @param {string}  item.id       - 고유 ID
 * @param {string}  item.title    - 문서 제목
 * @param {string}  item.description - 문서 한 줄 설명
 * @param {string}  item.category - 카테고리 슬러그
 * @param {string}  item.status   - 학습 상태
 * @param {string}  item.url      - 이동 경로
 * @param {boolean} item.isIndex  - 섹션 index.md 여부
 *
 * Example usage:
 * <SearchResultCard item={searchResult} />
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import StatusBadge from '@/components/ui/StatusBadge';
import { categories } from '@/data/navigation';

function SearchResultCard({ item }) {
  const category = categories.find((c) => c.slug === item.category);

  return (
    <Box
      component={Link}
      to={item.url}
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
        textDecoration: 'none',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: '10px',
        px: 3,
        py: 2,
        transition: 'background-color 0.15s ease, border-color 0.15s ease',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'light' ? '#EAE3D8' : '#2E2A48',
          borderColor: theme.palette.mode === 'light' ? '#BCA4EC' : '#5C5490',
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '3px',
        },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      })}
    >
      {/* 카테고리 레이블 + StatusBadge */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography
          variant='caption'
          sx={{
            color: 'text.disabled',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {category && (
            <Box
              component='span'
              aria-hidden='true'
              sx={{ fontSize: '0.75rem', lineHeight: 1 }}
            >
              {category.emoji}
            </Box>
          )}
          {category?.name ?? item.category}
          {item.isIndex && (
            <Box
              component='span'
              sx={{ color: 'text.disabled', ml: 0.5 }}
            >
              · 섹션
            </Box>
          )}
        </Typography>
        {item.status && <StatusBadge status={item.status} />}
      </Box>

      {/* 문서 제목 */}
      <Typography
        variant='body1'
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          fontSize: '0.9375rem',
          lineHeight: 1.4,
        }}
      >
        {item.title}
      </Typography>

      {/* 설명 */}
      {item.description && (
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.description}
        </Typography>
      )}
    </Box>
  );
}

export default SearchResultCard;
