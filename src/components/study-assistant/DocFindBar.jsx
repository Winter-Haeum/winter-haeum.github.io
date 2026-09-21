/**
 * DocFindBar — 문서 내부 찾기 바 (워드의 단어 찾기와 비슷한 기능)
 *
 * 학습 도우미의 질문 검색 결과에서 "교안 바로가기"를 누르면 이동한 문서에서
 * 검색어를 자동으로 찾아 하이라이트하고, 이전/다음으로 이동할 수 있게 한다.
 * useDocFind가 CSS Custom Highlight API로 하이라이트를 적용하므로 이 컴포넌트는
 * React가 렌더링한 문서 DOM을 전혀 건드리지 않는다.
 *
 * 키보드: Enter=다음, Shift+Enter=이전, Esc=닫기
 *
 * Props:
 * @param {React.RefObject<HTMLElement>} targetRef - 찾기 대상 컨테이너 [Required]
 * @param {string} initialQuery - 초기 검색어 [Required]
 * @param {function} onClose - 닫기 핸들러 [Required]
 *
 * Example usage:
 * <DocFindBar targetRef={contentRef} initialQuery="클로저" onClose={() => setFind(null)} />
 */
import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDocFind, DOC_FIND_MATCH_HIGHLIGHT, DOC_FIND_CURRENT_HIGHLIGHT } from '@/hooks/use-doc-find';

function DocFindBar({ targetRef, initialQuery, onClose }) {
  const { query, setQuery, total, activeIndex, next, prev, supported } = useDocFind(targetRef, initialQuery);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) prev();
      else next();
    }
  };

  const countLabel = !query.trim() ? '' : total === 0 ? '결과 없음' : `${activeIndex + 1} / ${total}`;

  return (
    <>
      {/* CSS Custom Highlight — React가 렌더링한 DOM 요소·텍스트를 변경하지 않고
          Range 구간에만 배경색을 씌우는 방식(비지원 브라우저는 이 스타일이 그냥 무시됨) */}
      <GlobalStyles
        styles={{
          [`::highlight(${DOC_FIND_MATCH_HIGHLIGHT})`]: {
            backgroundColor: 'rgba(250, 204, 21, 0.55)',
            color: 'inherit',
          },
          [`::highlight(${DOC_FIND_CURRENT_HIGHLIGHT})`]: {
            backgroundColor: '#F4845F',
            color: '#1A1A1A',
          },
        }}
      />
      <Box
        role='search'
        aria-label='문서 내부 찾기'
        onKeyDown={handleKeyDown}
        sx={(theme) => ({
          position: 'fixed',
          top: { xs: 72, md: 76 },
          right: { xs: 8, md: 24 },
          left: { xs: 8, md: 'auto' },
          zIndex: theme.zIndex.appBar + 1,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          p: '6px',
          borderRadius: '10px',
          border: '1px solid',
          borderColor: theme.palette.divider,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.palette.mode === 'light'
            ? '0 4px 16px rgba(0,0,0,0.14)'
            : '0 4px 20px rgba(0,0,0,0.5)',
        })}
      >
        <TextField
          inputRef={inputRef}
          size='small'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='문서에서 찾기'
          variant='outlined'
          sx={{
            minWidth: 0,
            flex: { xs: 1, sm: 'initial' },
            width: { sm: '200px' },
            '& .MuiOutlinedInput-root': { fontSize: '0.85rem' },
          }}
          slotProps={{ htmlInput: { 'aria-label': '문서 내부 검색어' } }}
        />
        <Typography
          variant='caption'
          sx={{ color: 'text.disabled', minWidth: '64px', textAlign: 'center', whiteSpace: 'nowrap' }}
        >
          {countLabel}
        </Typography>
        <IconButton size='small' onClick={prev} disabled={total === 0} aria-label='이전 검색 결과 (Shift+Enter)'>
          <KeyboardArrowUpIcon fontSize='small' />
        </IconButton>
        <IconButton size='small' onClick={next} disabled={total === 0} aria-label='다음 검색 결과 (Enter)'>
          <KeyboardArrowDownIcon fontSize='small' />
        </IconButton>
        <IconButton size='small' onClick={onClose} aria-label='찾기 닫기 (Esc)'>
          <CloseIcon fontSize='small' />
        </IconButton>
      </Box>
      {!supported && query.trim() && total > 0 && (
        <Box
          sx={(theme) => ({
            position: 'fixed',
            top: { xs: 122, md: 126 },
            right: { xs: 8, md: 24 },
            left: { xs: 8, md: 'auto' },
            zIndex: theme.zIndex.appBar + 1,
            px: 1.25,
            py: 0.5,
            borderRadius: '8px',
            border: '1px solid',
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.background.paper,
          })}
        >
          <Typography variant='caption' sx={{ color: 'text.disabled' }}>
            이 브라우저는 하이라이트를 지원하지 않아 개수·이동만 제공됩니다.
          </Typography>
        </Box>
      )}
    </>
  );
}

export default DocFindBar;
