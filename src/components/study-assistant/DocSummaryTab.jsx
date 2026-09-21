/**
 * DocSummaryTab — 현재 문서 핵심 정리 탭
 *
 * doc.content(현재 페이지가 이미 로딩해 둔 원문)에서 학습 목적 · 주요 개념 ·
 * 핵심 정리 · 코드 예제 위치를 그대로 추출해 보여준다. 새 문장을 생성하지 않고
 * 해당 섹션이 없으면 "없다"고 표시한다.
 *
 * Props:
 * @param {object} doc     - 현재 문서 { frontmatter, content } [Required]
 * @param {object} docMeta - { category, section, slug, url } [Required]
 *
 * Example usage:
 * <DocSummaryTab doc={doc} docMeta={{ category, section, slug, url }} />
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { categories } from '@/data/navigation';
import {
  extractLearningGoals,
  extractKeySummary,
  extractConceptSections,
  extractCodeExamples,
} from '@/utils/docStructure';

const SECTION_SX = { mb: 2.5, '&:last-of-type': { mb: 0 } };
const LABEL_SX = {
  fontSize: '0.72rem',
  fontWeight: 800,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: 'text.disabled',
  mb: 1,
  display: 'block',
};

function BulletList({ items }) {
  return (
    <Box component='ul' sx={{ m: 0, pl: 2.5, display: 'flex', flexDirection: 'column', gap: 0.6 }}>
      {items.map((text, i) => (
        <Typography key={i} component='li' variant='body2' sx={{ lineHeight: 1.65 }}>
          {text}
        </Typography>
      ))}
    </Box>
  );
}

function EmptyNote({ children }) {
  return (
    <Typography variant='body2' sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
      {children}
    </Typography>
  );
}

function DocSummaryTab({ doc, docMeta }) {
  if (!doc) {
    return <EmptyNote>문서를 불러오는 중입니다.</EmptyNote>;
  }

  const category = categories.find((c) => c.slug === docMeta?.category);
  const goals = extractLearningGoals(doc.content);
  const summary = extractKeySummary(doc.content);
  const concepts = extractConceptSections(doc.content);
  const codeExamples = extractCodeExamples(doc.content);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          mb: 2.5,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
          {category && (
            <Box component='span' aria-hidden='true' sx={{ fontSize: '0.9rem', flexShrink: 0 }}>
              {category.emoji}
            </Box>
          )}
          <Typography
            variant='body2'
            sx={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {doc.frontmatter?.title}
          </Typography>
        </Box>
        {/* 이 탭은 "현재 보고 있는 문서"의 정리이므로 docMeta.url은 항상 지금 페이지 자신이다.
            같은 경로로의 Link는 클릭해도 아무 반응이 없어(실사용 중 확인된 문제) "원문 보기"
            링크 대신, 실제로 의미 있는 동작인 "문서 처음으로 스크롤"을 제공한다. */}
        {doc.content && (
          <Box
            component='button'
            type='button'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={(theme) => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.4,
              fontSize: '0.78rem',
              color: theme.palette.primary.main,
              textDecoration: 'none',
              flexShrink: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              p: 0,
              fontFamily: 'inherit',
              '&:hover': { textDecoration: 'underline' },
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '2px',
              },
            })}
          >
            <KeyboardArrowUpIcon sx={{ fontSize: '0.9rem' }} /> 문서 처음으로
          </Box>
        )}
      </Box>

      {doc.frontmatter?.description && (
        <Box sx={SECTION_SX}>
          <Typography component='span' sx={LABEL_SX}>문서 설명</Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary', lineHeight: 1.65 }}>
            {doc.frontmatter.description}
          </Typography>
        </Box>
      )}

      <Box sx={SECTION_SX}>
        <Typography component='span' sx={LABEL_SX}>학습 목적</Typography>
        {goals ? <BulletList items={goals} /> : <EmptyNote>이 문서에는 별도의 학습 목표 섹션이 없습니다.</EmptyNote>}
      </Box>

      <Box sx={SECTION_SX}>
        <Typography component='span' sx={LABEL_SX}>주요 개념</Typography>
        {concepts.length ? (
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
            {concepts.map((c, i) => (
              <Chip key={i} label={c} size='small' variant='outlined' sx={{ fontSize: '0.75rem' }} />
            ))}
          </Box>
        ) : (
          <EmptyNote>이 문서에서 별도로 구분된 개념 섹션을 찾지 못했습니다.</EmptyNote>
        )}
      </Box>

      <Box sx={SECTION_SX}>
        <Typography component='span' sx={LABEL_SX}>핵심 정리</Typography>
        {summary ? <BulletList items={summary} /> : <EmptyNote>이 문서에는 별도의 핵심 요약 섹션이 없습니다.</EmptyNote>}
      </Box>

      <Box sx={SECTION_SX}>
        <Typography component='span' sx={LABEL_SX}>관련 코드 예제 위치</Typography>
        {codeExamples.length ? (
          <Box component='ul' sx={{ m: 0, pl: 2.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {codeExamples.map((ex, i) => (
              <Typography key={i} component='li' variant='body2' sx={{ color: 'text.secondary' }}>
                예제 {i + 1} ({ex.lang}) — {ex.heading ? `'${ex.heading}' 섹션` : '섹션 제목 없음'}
              </Typography>
            ))}
          </Box>
        ) : (
          <EmptyNote>이 문서에는 코드 예제가 없습니다.</EmptyNote>
        )}
      </Box>
    </Box>
  );
}

export default DocSummaryTab;
