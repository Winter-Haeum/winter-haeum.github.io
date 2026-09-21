/**
 * SearchBar — 검색 입력 컴포넌트
 *
 * debounce 구조:
 *   - value (inputValue): 즉시 반영 — controlled component
 *   - URL q 파라미터 업데이트: 부모(SearchPage)에서 250ms debounce 처리
 *   - ESC 또는 × 클릭: onClear 호출 → 부모가 inputValue + URL q 즉시 초기화
 *
 * Props:
 * @param {string}   value      - 현재 입력값 (즉시 반영) [Required]
 * @param {function} onChange   - 입력 변경 핸들러 (e.target.value 대신 string 전달) [Required]
 * @param {function} onClear    - ESC · × 버튼 클릭 핸들러 (즉시 초기화) [Required]
 * @param {boolean}  isLoading  - 인덱스 빌드 중 스피너 표시 [Optional, 기본: false]
 * @param {boolean}  autoFocus  - 마운트 시 자동 포커스 [Optional, 기본: true]
 *
 * Example usage:
 * <SearchBar value={inputValue} onChange={setInputValue} onClear={handleClear} />
 */
import { useRef } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SearchBar({ value, onChange, onClear, isLoading = false, autoFocus = true }) {
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClear();
  };

  const handleClearClick = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <Box
      role='search'
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        width: '100%',
        maxWidth: '640px',
        px: 2,
        py: 1.25,
        border: '1.5px solid',
        borderColor: theme.palette.divider,
        borderRadius: '10px',
        backgroundColor: theme.palette.background.paper,
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        '&:focus-within': {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 0 0 3px ${
            theme.palette.mode === 'light' ? '#EDE8FA' : '#2A2544'
          }`,
        },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      })}
    >
      {isLoading ? (
        <CircularProgress
          size={18}
          sx={{ color: 'text.disabled', flexShrink: 0 }}
        />
      ) : (
        <SearchIcon
          sx={{ color: 'text.disabled', fontSize: '1.2rem', flexShrink: 0 }}
          aria-hidden='true'
        />
      )}

      <InputBase
        inputRef={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='문서 제목, 내용 검색...'
        autoFocus={autoFocus}
        inputProps={{
          type: 'search',
          autoComplete: 'off',
          spellCheck: false,
          inputMode: 'search',
          'aria-label': '문서 검색',
          // 브라우저 기본 ✕ 버튼 제거 (커스텀 × 버튼 사용)
          style: { WebkitAppearance: 'none' },
        }}
        sx={{
          flex: 1,
          fontSize: '1rem',
          '& input::-webkit-search-cancel-button': { display: 'none' },
          '& input::-webkit-search-decoration': { display: 'none' },
        }}
      />

      {value && (
        <IconButton
          onClick={handleClearClick}
          size='small'
          aria-label='검색어 초기화'
          sx={{
            color: 'text.disabled',
            p: '4px',
            borderRadius: '4px',
            flexShrink: 0,
            transition: 'color 0.15s ease',
            '&:hover': { color: 'text.primary' },
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          }}
        >
          <CloseIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      )}
    </Box>
  );
}

export default SearchBar;
