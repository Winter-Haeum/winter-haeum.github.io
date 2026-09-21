/**
 * SearchPage — 전체 문서 검색 페이지
 *
 * URL: /search?q=query
 * 구성: Header + SearchBar + 결과 요약 + ResultList or EmptyState + Footer
 * 사이드바 없음 — 전체 너비 레이아웃
 *
 * debounce 흐름:
 *   typingValue (state) — null이면 urlQuery를 따름, 값이 있으면 input에 즉시 반영
 *   inputValue (derived) — typingValue ?? urlQuery
 *   URL q 파라미터 — 250ms 디바운스 후 업데이트, 완료 시 typingValue를 null로 초기화
 *   검색 결과   — URL q 값 기준으로 계산 (useMemo)
 *   ESC / ×    — typingValue null 초기화 + URL q 즉시 제거 → inputValue = urlQuery = ''
 *
 * 브라우저 뒤로가기/앞으로가기:
 *   typingValue가 null인 상태에서 urlQuery가 변경되면 inputValue가 자동으로 따라감.
 *   useEffect 없이 동기화 — react-hooks/set-state-in-effect 규칙 준수.
 *
 * Props: 없음 (URL 파라미터로 q 수신)
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import SearchBar from '@/components/ui/SearchBar';
import SearchResultCard from '@/components/ui/SearchResultCard';
import SearchEmptyState from '@/components/ui/SearchEmptyState';
import { useSearchIndex } from '@/hooks/use-search-index';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') ?? '';

  // typingValue: 사용자가 입력 중인 값.
  //   null  → inputValue가 urlQuery를 따름 (초기 상태, 디바운스 완료 후, ESC/× 후)
  //   string → inputValue가 typingValue를 따름 (타이핑 중)
  // 브라우저 뒤로가기/앞으로가기 시에도 typingValue가 null이면 urlQuery를 그대로 반영.
  const [typingValue, setTypingValue] = useState(null);
  const inputValue = typingValue ?? urlQuery;

  const debounceRef = useRef(null);
  const { fuse, tagFuse, indexing, indexError } = useSearchIndex();

  // debounce 타이머 — 언마운트 시 정리
  useEffect(() => () => clearTimeout(debounceRef.current), []);

  // 입력 변경: typingValue 즉시 반영 + URL q 파라미터 250ms 후 업데이트
  // 디바운스 완료 시 typingValue를 null로 초기화 → inputValue가 urlQuery를 다시 따름
  const handleInputChange = useCallback((value) => {
    setTypingValue(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchParams(value.trim() ? { q: value.trim() } : {}, { replace: true });
      setTypingValue(null);
    }, 250);
  }, [setSearchParams]);

  // ESC / × : typingValue 초기화 + URL q 파라미터 즉시 제거
  const handleClear = useCallback(() => {
    clearTimeout(debounceRef.current);
    setTypingValue(null);
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // 검색 결과 — URL q 값 기준으로 계산
  const results = useMemo(() => {
    if (!urlQuery.trim()) return null;
    const q = urlQuery.trim();

    if (q.startsWith('#')) {
      if (!tagFuse) return null;
      const tag = q.slice(1).trim();
      if (!tag) return [];
      return tagFuse.search(tag).map((r) => r.item);
    }

    if (!fuse) return null;
    return fuse.search(q).map((r) => r.item);
  }, [urlQuery, fuse, tagFuse]);

  const hasQuery = urlQuery.trim().length > 0;
  const isTagSearch = urlQuery.trim().startsWith('#');
  const hasResults = Array.isArray(results) && results.length > 0;
  const showEmpty = !hasQuery || (!indexing && Array.isArray(results) && !hasResults);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Box component='main' sx={{ flex: 1, py: { xs: 4, md: 8 }, px: { xs: 2, md: 3 } }}>
        <Container maxWidth='md'>

          {/* SearchBar */}
          <Box sx={{ mb: 4 }}>
            <SearchBar
              value={inputValue}
              onChange={handleInputChange}
              onClear={handleClear}
              isLoading={indexing}
              autoFocus
            />
          </Box>

          {/* 태그 검색 모드 안내 칩 */}
          {isTagSearch && hasQuery && (
            <Box
              sx={(theme) => ({
                display: 'inline-flex',
                alignItems: 'center',
                px: 1.5,
                py: 0.5,
                mb: 2.5,
                borderRadius: '6px',
                backgroundColor: theme.palette.mode === 'light' ? '#EDE8FA' : '#2A2544',
                color: theme.palette.primary.main,
                fontSize: '0.8125rem',
                fontWeight: 500,
              })}
            >
              태그 '{urlQuery.trim().slice(1)}' 검색 중
            </Box>
          )}

          {/* 인덱스 빌드 에러 */}
          {indexError && (
            <Typography variant='body2' sx={{ color: 'error.main', mb: 3 }}>
              검색 인덱스를 불러오지 못했습니다. 페이지를 새로고침해주세요.
            </Typography>
          )}

          {/* 결과 수 요약 — aria-live 영역: 결과 변경 시 스크린 리더에 공지 */}
          <Box
            role='status'
            aria-live='polite'
            aria-atomic='true'
            sx={{ mb: hasResults ? 3 : 0 }}
          >
            {!indexing && hasQuery && hasResults && (
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {results.length}개 문서를 찾았습니다
              </Typography>
            )}
          </Box>

          {/* 결과 목록 */}
          {!showEmpty && hasResults && (
            <Box
              component='ul'
              role='list'
              aria-label='검색 결과'
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              {results.map((item) => (
                <Box component='li' key={item.id}>
                  <SearchResultCard item={item} />
                </Box>
              ))}
            </Box>
          )}

          {/* 빈 결과 / 검색 전 안내 */}
          {showEmpty && <SearchEmptyState query={urlQuery} />}

        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default SearchPage;
