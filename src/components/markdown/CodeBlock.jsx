/**
 * CodeBlock — 언어 라벨 + 복사 버튼이 있는 코드 블록
 *
 * rehype-highlight가 생성한 hljs 클래스에 code-theme-tokens.js 기준 토큰 색상을 적용한다.
 * 콘텐츠가 400px를 초과하면 내부 스크롤이 활성화된다.
 *
 * Props:
 * @param {string}          language - 코드 언어 라벨 [Required] 예: 'js', 'bash', 'text'
 * @param {React.ReactNode} children - rehype-highlight가 처리한 <code> 요소 [Required]
 *
 * Example usage:
 * (react-markdown의 pre 컴포넌트로 자동 호출됨)
 */
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { CODE_THEME } from './code-theme-tokens';

function CodeBlock({ language, children }) {
  const codeRef = useRef(null);
  const timerRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCopy = async () => {
    const text = codeRef.current?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard API 미지원 환경에서는 무시
    }
  };

  return (
    <Box
      // MarkdownRenderer.jsx의 GlobalStyles가 "코드블록 바로 뒤 후속 설명" 간격을
      // 조정할 때 이 wrapper(실제 DOM에서 margin을 갖는 최상위 요소)를 식별하는 데
      // 쓰는 마커 클래스. 내부 <pre>는 margin:0이라 직접 타깃이 될 수 없다.
      className='wda-codeblock'
      sx={(theme) => {
        const t = CODE_THEME[theme.palette.mode];
        return {
          // 같은 섹션 내부 전환(다음 콘텐츠가 callout/문단 등)은 좁게, 다음 소제목과의
          // 구분은 소제목 자체의 넉넉한 margin-top(MarkdownRenderer.jsx)이 담당하도록
          // mb를 mt보다 작게 둔다 (2026-07 개편, 여백 정책 참고).
          mt: '1.5rem',
          mb: '0.9rem',
          borderRadius: '8px',
          border: `1px solid ${t.blockBorder}`,
          overflow: 'hidden',
        };
      }}
    >
      {/* 헤더: 언어 라벨 + 복사 버튼 */}
      <Box
        sx={(theme) => {
          const t = CODE_THEME[theme.palette.mode];
          return {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 0.75,
            backgroundColor: t.headerBg,
            borderBottom: `1px solid ${t.headerBorder}`,
          };
        }}
      >
        <Typography
          variant='caption'
          sx={(theme) => ({
            fontFamily: "'JetBrains Mono', monospace",
            color: CODE_THEME[theme.palette.mode].langLabel,
            fontSize: '0.75rem',
            letterSpacing: '0.02em',
            userSelect: 'none',
          })}
        >
          {language}
        </Typography>

        <IconButton
          onClick={handleCopy}
          size='small'
          aria-label='코드 복사'
          sx={(theme) => {
            const t = CODE_THEME[theme.palette.mode];
            return {
              color: copied ? t.copyDone : t.copyIdle,
              opacity: copied ? 1 : 0.4,
              p: '4px',
              borderRadius: '4px',
              transition: 'opacity 0.15s ease, color 0.15s ease',
              '&:hover': {
                opacity: 1,
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.mode === 'light'
                  ? 'rgba(132, 100, 200, 0.08)'
                  : 'rgba(179, 158, 221, 0.12)',
              },
              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
            };
          }}
        >
          {copied
            ? <CheckIcon sx={{ fontSize: '0.9rem' }} />
            : <ContentCopyIcon sx={{ fontSize: '0.9rem' }} />
          }
        </IconButton>
      </Box>

      {/* 코드 본문 */}
      <Box
        ref={codeRef}
        component='pre'
        sx={(theme) => {
          const t = CODE_THEME[theme.palette.mode];
          return {
            m: 0,
            px: '1rem',
            py: '0.9rem',
            backgroundColor: t.blockBg,
            overflowX: 'auto',
            maxHeight: '400px',
            overflowY: 'auto',
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: '0.75rem',
            lineHeight: 1.5,
            color: t.baseText,

            // code 요소 내부 스타일 초기화
            '& code': {
              fontFamily: 'inherit',
              fontSize: 'inherit',
              backgroundColor: 'transparent',
              padding: 0,
              borderRadius: 0,
            },

            // hljs 토큰 색상
            '& .hljs-keyword':        { color: t.keyword },
            '& .hljs-built_in':       { color: t.builtIn },
            '& .hljs-type':           { color: t.type },
            '& .hljs-literal':        { color: t.literal },
            '& .hljs-number':         { color: t.number },
            '& .hljs-operator':       { color: t.operator },
            '& .hljs-punctuation':    { color: t.punctuation },
            '& .hljs-property':       { color: t.property },
            '& .hljs-string':         { color: t.string },
            '& .hljs-comment':        { color: t.comment, fontStyle: 'italic' },
            '& .hljs-doctag':         { color: t.doctag, fontStyle: 'italic' },
            '& .hljs-meta':           { color: t.meta },
            '& .hljs-tag':            { color: t.tag },
            '& .hljs-name':           { color: t.name },
            '& .hljs-attr':           { color: t.attr },
            '& .hljs-attribute':      { color: t.attribute },
            '& .hljs-variable':       { color: t.variable },
            '& .hljs-params':         { color: t.params },
            '& .hljs-function':       { color: t.func },
            '& .hljs-title':          { color: t.title, fontWeight: 500 },
            '& .hljs-title.class_':   { color: t.titleClass },
            '& .hljs-section':        { color: t.section, fontWeight: 700 },
            '& .hljs-selector-tag':   { color: t.selectorTag },
            '& .hljs-selector-class': { color: t.selectorCls },
            '& .hljs-selector-id':    { color: t.selectorId },
            '& .hljs-addition':       { color: t.additionFg, backgroundColor: t.additionBg },
            '& .hljs-deletion':       { color: t.deletionFg, backgroundColor: t.deletionBg },
            '& .hljs-emphasis':       { fontStyle: 'italic' },
            '& .hljs-strong':         { fontWeight: 700 },
          };
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default CodeBlock;
