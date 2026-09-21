/**
 * FlipCard — 클릭/키보드(Enter·Space)로 앞면(질문)·뒷면(답변)이 뒤집히는 복습 카드
 *
 * 드롭다운(details/summary)과 달리 뒤집혀도 카드 높이가 고정되어 주변 레이아웃이
 * 늘어나거나 밀리지 않는다. 마크다운에서는 raw HTML로 아래처럼 사용한다:
 *
 * Props:
 * @param {node} children - <div class="wda-flip-front">질문</div>과
 *                           <div class="wda-flip-back">답변</div> 두 자식을 기대한다 [Required]
 *
 * Example usage:
 * <div class="wda-flip-card">
 *   <div class="wda-flip-front">TDZ란?</div>
 *   <div class="wda-flip-back">let/const가 선언 전 접근되지 않도록 막는 구간이다.</div>
 * </div>
 */
import React, { useState } from 'react';
import Box from '@mui/material/Box';

function hasClassName(child, className) {
  return (
    React.isValidElement(child) &&
    (child.props.className || '').split(' ').includes(className)
  );
}

function FlipCard({ children }) {
  const [flipped, setFlipped] = useState(false);

  const kids = React.Children.toArray(children).filter(
    (c) => typeof c !== 'string' || c.trim() !== ''
  );
  const front = kids.find((c) => hasClassName(c, 'wda-flip-front'));
  const back = kids.find((c) => hasClassName(c, 'wda-flip-back'));

  return (
    <Box sx={{ perspective: '1200px', flex: '1 1 150px', minWidth: '140px', minHeight: 0 }}>
      <Box
        component='button'
        type='button'
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={
          flipped
            ? '정답 카드가 보입니다. 다시 누르면 질문으로 돌아갑니다.'
            : '질문 카드입니다. 눌러서 정답을 확인하세요.'
        }
        sx={{
          position: 'relative',
          display: 'block',
          width: '100%',
          minHeight: { xs: '104px', md: '124px' },
          border: 'none',
          background: 'transparent',
          padding: 0,
          font: 'inherit',
          color: 'inherit',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
          },
          '&:focus-visible': {
            outline: '2px solid #A48FD8',
            outlineOffset: '3px',
            borderRadius: '12px',
          },
        }}
      >
        <Box
          aria-hidden={flipped}
          sx={(theme) => ({
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: '12px',
            border: '1px solid #CDBFF0',
            background: theme.palette.mode === 'light' ? '#EEE8FA' : 'rgba(164,143,216,.2)',
            color: theme.palette.mode === 'light' ? '#2C2840' : '#EDEAF2',
            boxShadow: '0 1px 3px rgba(0,0,0,.05)',
            px: 2,
            py: 1.5,
            fontSize: { xs: '.85rem', md: '.89rem' },
            fontWeight: 700,
            lineHeight: 1.6,
          })}
        >
          {front}
        </Box>
        <Box
          aria-hidden={!flipped}
          sx={(theme) => ({
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: '12px',
            border: '1px solid #A8E1BC',
            background: theme.palette.mode === 'light' ? '#DDF7E8' : 'rgba(63,164,107,.22)',
            color: theme.palette.mode === 'light' ? '#2C2840' : '#EDEAF2',
            boxShadow: '0 1px 3px rgba(0,0,0,.05)',
            px: 2,
            py: 1.5,
            fontSize: { xs: '.83rem', md: '.87rem' },
            fontWeight: 400,
            lineHeight: 1.65,
          })}
        >
          {back}
        </Box>
      </Box>
    </Box>
  );
}

export default FlipCard;
