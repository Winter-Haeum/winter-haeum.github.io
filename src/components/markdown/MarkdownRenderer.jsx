/**
 * MarkdownRenderer — Markdown → MUI 컴포넌트 렌더러
 *
 * react-markdown + remark-gfm + rehype-raw + rehype-highlight 조합.
 * 모든 MD 요소를 디자인 시스템 기준의 MUI 컴포넌트로 교체한다.
 * maxWidth: 65ch 로 본문 적정 너비를 제한한다.
 *
 * Props:
 * @param {string} content - frontmatter 제거 후 MD 본문 [Required]
 * @param {string} docId   - localStorage 네임스페이스용 문서 식별자 [Optional]
 *                           형식: "categorySlug/sectionSlug/docSlug"
 *                           제공 시 체크포인트 항목이 인터랙티브하게 동작하며
 *                           클릭 상태가 문서별로 독립 저장된다.
 *
 * Example usage:
 * <MarkdownRenderer content={doc.content} docId="ai-vibe-coding/lesson-1/1-1-web-basics" />
 */
import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import MuiLink from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import { Link as RouterLink } from 'react-router-dom';
import Callout from './Callout';
import CodeBlock from './CodeBlock';
import FlipCard from './FlipCard';

// rehype-raw → rehype-highlight 순서 필수: raw HTML 파싱 후 코드 하이라이트 적용
const rehypePlugins = [rehypeRaw, [rehypeHighlight, { ignoreMissing: true }]];
const remarkPlugins = [remarkGfm];

/**
 * CheckboxItem — 인터랙티브 체크포인트 체크박스
 * localStorage에 문서별 독립 키로 체크 상태를 저장·복원한다.
 *
 * @param {string}  storageKey      - localStorage 키 [Required]
 * @param {boolean} initialChecked  - 마크다운 원문의 초기 체크 상태 [Required]
 */
function CheckboxItem({ storageKey, initialChecked }) {
  const [checked, setChecked] = useState(() => {
    try {
      const v = localStorage.getItem(storageKey);
      return v !== null ? v === 'true' : !!initialChecked;
    } catch {
      return !!initialChecked;
    }
  });

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    try {
      localStorage.setItem(storageKey, String(next));
    } catch {
      // 시크릿 모드 등 저장 실패 시 무시 (화면상 체크 상태는 이미 갱신됨)
    }
  };

  return (
    <Box
      component='input'
      type='checkbox'
      checked={checked}
      onChange={toggle}
      aria-label='체크포인트 항목'
      sx={(theme) => ({
        accentColor: theme.palette.primary.main,
        width: '13px',
        height: '13px',
        cursor: 'pointer',
        flexShrink: 0,
        mt: '2px',
      })}
    />
  );
}

// BASE_URL: dev='/', prod='/winter-dev-archive/'
// processedContent의 text-level 치환은 raw <img src="..."> HTML에만 매치되고, 실제 186개
// 교안이 쓰는 표준 마크다운 ![]() 문법에는 매치되지 않아 GitHub Pages 배포본에서 콘텐츠
// 이미지가 404 나던 원인이었다. ![]()는 react-markdown 파싱 후 img 컴포넌트로 오므로,
// resolveImageSrc를 img 컴포넌트 안에서 적용해 문법과 무관하게 절대경로(/로 시작)에
// BASE를 붙인다.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

function resolveImageSrc(src) {
  if (typeof src !== 'string' || !src || !BASE) return src;
  if (!src.startsWith('/')) return src; // http(s)://, data:, blob:, 상대경로는 그대로
  return src.startsWith(BASE) ? src : `${BASE}${src}`;
}

// 이모지+볼드 단독 문단(본문 중간 미니 소제목) 판별용 — p 컴포넌트에서 children 중
// 이 컴포넌트 하나뿐인지 참조 비교로 확인한다 (node.children/hast 기반 판별은
// 실제 배포 환경에서 매칭되지 않는 문제가 있어 React children 기반으로 교체함).
function StrongText({ children }) {
  return (
    <Box component='strong' sx={{ fontWeight: 700, color: 'text.primary' }}>
      {children}
    </Box>
  );
}

// 이모지+볼드 단독 문단(미니 소제목)의 margin을 강제로 0으로 고정하는 클래스.
// 문서 내 <style> 블록에 남아있는 구버전 `p:has(> strong:only-child){margin-top:2.2rem
// !important}` 규칙(특이도 0,1,2)을 확실히 이기기 위해 이중 클래스 셀렉터(특이도 0,2,1)로
// GlobalStyles에 주입한다.
const WDA_MINIHEAD_CLASS = 'wda-minihead';
// 코드블록/일반 박스 뒤 후속 설명 간격 규칙(아래 wdaMinheadGlobalStyles)의 적용 대상.
// 문서 <style> 블록에서 흔히 쓰이는 박스 클래스만 포함한다(표는 클래스명이 없어 제외).
const WDA_BOX_SELECTORS = ['.wda-codeblock', '.wda-callout', '.wda-fgrid', '.wda-steps', '.wda-compare', '.wda-flow'];
// 미니 소제목과 "직접 인접"할 때만 적용하는 간격 규칙(아래 두 방향)의 적용 대상.
// WDA_BOX_SELECTORS에 핵심 요약 전용 복습 UI 3종을 더한 것 — 이 3종은 box↔box(0.75rem)/
// box↔일반텍스트 규칙까지 확장할 필요가 없어(항상 사이에 minihead가 끼어 나오므로) 별도
// 배열로 분리한다(2026-07 개편 — JavaScript 1-1/1-2/1-3 재검토로 전역 승격).
const WDA_MINIHEAD_BOX_SELECTORS = [...WDA_BOX_SELECTORS, '.wda-check-note', '.wda-mistake-notes', '.wda-formula-board'];
// 실제 `h3` 제목 바로 다음에 도입 문장 없이 곧장 오는 코드블록/박스류 전용 규칙(아래
// `h3 + ...`)의 적용 대상. WDA_MINIHEAD_BOX_SELECTORS(미니 소제목 전용)과 달리 카드형
// 하위 요소(`wda-fcard`/`wda-compare-card`)와 핵심 요약 노트(`wda-summary-note`)까지
// 포함한다 — JS 1-1/1-2 기준 문서에는 실제 `h3`가 아예 없어(전부 미니 소제목 방식) 이
// 인접 패턴 자체가 등장하지 않았고, 다른 문서(react/1-1-node-npm.md 등)에서 실제 h3를
// 쓸 때만 발생해 지금까지 정책/코드 양쪽에 규정이 없었다(2026-07 40차 개편 — 정밀
// 수치 분석으로 발견, 정책 문서 "간격 — 4단계 여백 위계" 참고).
const WDA_HEADING_BOX_SELECTORS = [
  '.wda-codeblock',
  '.wda-callout',
  '.wda-fgrid',
  '.wda-fcard',
  '.wda-steps',
  '.wda-compare',
  '.wda-compare-card',
  '.wda-flow',
  '.wda-summary-note',
  '.wda-check-note',
  '.wda-mistake-notes',
  '.wda-formula-board',
];
// callout/카드/단계형 등 "박스류" 내부에서는 이모지+볼드 단독 문단(예: 박스 안
// 한 줄짜리 강조 라벨 `<p><strong>...</strong></p>`)을 본문 레벨 미니 소제목으로
// 오인식하면 안 된다 — p 컴포넌트의 isLoneStrong 판별은 문단 자신의 모양만 보고
// 조상 요소를 전혀 확인하지 않아서, 지금까지 박스 안의 강조 라벨도 페이지 레벨
// 미니 소제목과 동일하게 padding-top(1.2rem=19.2px)을 그대로 받고 있었다(2026-07
// 개편 — React hooks 3-3/3-2 등 재검토로 발견, 콜아웃 내부 위쪽 여백이 JS 1-1/1-2
// 기준보다 넓어 보이는 원인). WDA_HEADING_BOX_SELECTORS(박스류 전체 목록)를 그대로
// 재사용해 "박스 안에 있는지" 여부를 React Context로 전달하고, p 컴포넌트가 이
// 컨텍스트를 확인해 박스 내부에서는 isLoneStrong 처리를 끈다. 이 판별은 순수
// React 트리 기반이라, 박스 안에 몇 단계가 중첩되어 있어도(예: `.wda-callout` 안의
// `<div>` 안의 `<p>`) 정확히 전파된다. h2/h3 뒤에 곧장 오는 실제(본문 레벨)
// 미니 소제목이나 박스↔박스/박스↔텍스트 인접 간격 규칙(WDA_MINIHEAD_BOX_SELECTORS
// 등, 형제 관계 기반)에는 영향을 주지 않는다 — 이번 처리는 "박스 내부 자손"
// 관계만 다루고, "박스 다음에 오는 형제" 관계는 기존 로직 그대로 유지된다.
const WDA_BOX_CONTEXT_CLASSES = new Set(WDA_HEADING_BOX_SELECTORS.map((s) => s.slice(1)));
const WdaBoxContext = React.createContext(false);
// 미니 소제목과 인접한 콘텐츠 블록(이전 요소든 다음 요소든)은 미니 소제목 자신의
// padding-top(1.2rem, 진입 시 새 시작 간격)/padding-bottom(0, 2026-07 개편으로 제거)
// 두 값만으로 위계를 표현하고, 인접한 콘텐츠 블록 쪽 margin은 항상 제거하거나 0.5rem
// 하나로 통일한다 — "이전 콘텐츠 margin-bottom 제거 + 미니 소제목 padding-top 유지"
// "미니 소제목 padding-bottom 미사용 + 다음 콘텐츠 margin-top 0.5rem" 두 원칙을
// 모든 콘텐츠 타입(p/ul/ol/codeblock/box류/table wrapper)에 동일하게 적용한다.
const wdaMinheadGlobalStyles = {
  [`p.${WDA_MINIHEAD_CLASS}.${WDA_MINIHEAD_CLASS}`]: {
    marginTop: '0 !important',
    marginBottom: '0 !important',
  },
  // 이전 콘텐츠 → 미니 소제목: 이전 요소의 margin-bottom을 0으로 제거해, 미니 소제목
  // 자신의 padding-top(1.2rem)만으로 진입 간격이 결정되게 한다. 과거 p/ul/ol만
  // 0.5rem으로 "살짝" 줄였으나, 아래 콘텐츠 → 미니 소제목(margin-top 0.5rem)과의
  // 대칭을 맞추기 위해 0으로 통일했다(2026-07 개편).
  [`p:has(+ p.${WDA_MINIHEAD_CLASS}.${WDA_MINIHEAD_CLASS}), ul:has(+ p.${WDA_MINIHEAD_CLASS}.${WDA_MINIHEAD_CLASS}), ol:has(+ p.${WDA_MINIHEAD_CLASS}.${WDA_MINIHEAD_CLASS})`]: {
    marginBottom: '0 !important',
  },
  // 코드블록/일반 박스(callout·카드 그리드·단계형·비교·흐름·핵심요약 노트) 바로 다음이
  // 미니 소제목인 경우도 같은 원칙 — 박스 자신의 margin-bottom(코드블록 0.9rem, 나머지
  // 1.1~1.6rem)을 0으로 제거한다(2026-07 개편 — JavaScript 1-1/1-2/1-3 로컬 override로
  // 검증 후 전역 승격).
  [`.wda-codeblock:has(+ p.${WDA_MINIHEAD_CLASS}.${WDA_MINIHEAD_CLASS}), ${WDA_MINIHEAD_BOX_SELECTORS.map((s) => `${s}:has(+ p.${WDA_MINIHEAD_CLASS}.${WDA_MINIHEAD_CLASS})`).join(', ')}`]: {
    marginBottom: '0 !important',
  },
  // 표(table) wrapper → 미니 소제목: table 컴포넌트는 margin-bottom(1.2rem)을 <table>
  // 자신이 아니라 감싸는 바깥 wrapper(Box, 고유 class 없음)에 두므로, ":has(> table)"로
  // "직계 자식이 table인 요소"를 구조적으로 찾아 그 wrapper의 margin-bottom을 제거한다
  // (2026-07 개편 — JavaScript 1-1 로컬 override로 검증 후 전역 승격).
  [`:has(> table):has(+ p.${WDA_MINIHEAD_CLASS}.${WDA_MINIHEAD_CLASS})`]: {
    marginBottom: '0 !important',
  },
  // 미니 소제목 바로 다음에 오는 일반 문단/목록(코드블록·callout 같은 "박스"가
  // 아닌 p·ul·ol)은 그 소제목이 여는 설명이므로 한 묶음처럼 붙어야 한다(2026-07
  // 21차 개편 — JavaScript 1-2 재검토로 발견). 뒤따르는 요소가 "박스"일 때는 이미
  // 위 박스 규칙(10·20차 개편)이 margin-top을 0.5rem으로 강제하지만, 뒤따르는
  // 요소가 박스가 아닌 일반 p/ul/ol일 때는 그 어떤 규칙도 margin-top을 지정하지
  // 않아 브라우저 기본값(약 0.93~0.95rem, p의 font-size 기준 1em)이 그대로
  // 노출되고 있었다 — 미니 소제목 자신의 margin-bottom은 이미 0으로 강제돼 있어
  // 병합할 상대가 없으므로 이 기본값이 그대로 화면에 남았다(예: "📌 1단계: 선언"
  // 바로 아래 bullet 문단, "⚙️ 2단계: 초기화" 바로 아래 bullet 문단).
  [`.${WDA_MINIHEAD_CLASS} + p:not(.${WDA_MINIHEAD_CLASS}), .${WDA_MINIHEAD_CLASS} + ul, .${WDA_MINIHEAD_CLASS} + ol`]: {
    marginTop: '0.5rem !important',
  },
  // 미니 소제목 → 표(table) wrapper: 위와 같은 구조적 이유로 ":has(> table)"을 사용한다
  // (2026-07 개편 — JavaScript 1-1 재검토로 발견, minihead padding-bottom 제거에 따른 보정).
  [`.${WDA_MINIHEAD_CLASS} + :has(> table)`]: {
    marginTop: '0.5rem !important',
  },
  // 미니 소제목 → 핵심 요약 노트(check-note/mistake-notes/formula-board): 이 3종은
  // WDA_BOX_SELECTORS 기반 "미니 소제목 + 박스" 규칙(아래) 대상이 아니므로 별도로
  // margin-top 0.5rem을 부여한다 — 그렇지 않으면 각 class 자체 margin-top(0.8rem)이
  // 그대로 남아 다른 박스(0.5rem)와 간격이 달라진다(2026-07 개편 — 신규, "📌 먼저
  // 외울 것 → check-note", "🧠 헷갈리기 쉬운 것 → mistake-notes", "🎯 최종 암기 공식
  // → formula-board" 전환에서 발견).
  [`.${WDA_MINIHEAD_CLASS} + .wda-check-note, .${WDA_MINIHEAD_CLASS} + .wda-mistake-notes, .${WDA_MINIHEAD_CLASS} + .wda-formula-board`]: {
    marginTop: '0.5rem !important',
  },
  // 코드블록(CodeBlock.jsx)/일반 박스(callout·카드 그리드·단계형·비교·흐름) 바로 뒤에
  // 오는 설명 문단/목록은 그 박스의 해석·결론이므로 한 묶음처럼 붙어 보여야 한다.
  // 대상: .wda-codeblock(CodeBlock.jsx wrapper) / .wda-callout / .wda-fgrid(카드 그리드)
  // / .wda-steps(단계형) / .wda-compare(비교 박스) / .wda-flow(흐름 박스) — 모두 문서
  // <style> 블록 또는 컴포넌트 sx에 자체 margin-bottom(코드블록 0.9rem, 나머지는 문서별
  // .8~1.6rem)을 갖고 있다.
  // 버그(2026-07 8차 개편에서 발견): 다음 요소의 margin-top만 0으로 강제하면 두 마진이
  // "병합(collapse)"될 기회 자체가 사라져 박스 자신의 margin-bottom이 그대로 다 보이고,
  // 그 위에 다음 요소의 padding-top(0.5rem)이 추가로 더해져 오히려 이전(병합 시 최대값
  // 하나만 적용되던 상태)보다 더 넓어 보였다 — 코드블록 기준 실측 0.9rem + 0.5rem = 1.4rem.
  // 해결: 박스 쪽 margin-bottom도 함께 0으로 강제해, 다음 요소의 padding-top(0.5rem)
  // 하나만으로 간격이 정확히 결정되게 한다.
  // 다음 요소가 미니 소제목(.wda-minihead)이거나 새 실제 헤딩(h2/h3/h4)이면 이 규칙들을
  // 적용하지 않아 — 특이도 계산에 기대지 않고 명시적으로 — 그 소제목/헤딩 자신의 넓은
  // 섹션 전환 여백이 항상 그대로 유지되도록 한다.
  [WDA_BOX_SELECTORS.map((s) => `${s}:has(+ p:not(.${WDA_MINIHEAD_CLASS})), ${s}:has(+ ul), ${s}:has(+ ol)`).join(', ')]: {
    marginBottom: '0 !important',
  },
  [WDA_BOX_SELECTORS.map((s) => `${s} + p:not(.${WDA_MINIHEAD_CLASS}), ${s} + ul, ${s} + ol`).join(', ')]: {
    marginTop: '0 !important',
    paddingTop: '0.5rem',
  },
  // 미니 소제목/설명 문장(일반 p·ul·ol) 바로 다음에 오는 코드블록/일반 박스는 그
  // 소제목·문장이 소개하는 예제이므로 한 묶음처럼 붙어 보여야 한다(2026-07 10차 개편
  // — JavaScript 1-1 재검토로 발견).
  // 문제: 코드블록/박스는 자기 자신의 margin-top(코드블록 1.5rem, 나머지는 문서별
  // .8rem)을 갖는데, 직전 문단의 margin-bottom(일반 문단 0.9rem, 미니 소제목은 이미
  // 0으로 강제됨)과 병합(collapse)돼도 항상 박스 자신의 더 큰 margin-top이 그대로
  // 남아, "같은 세트"인 미니 소제목/설명 문장 뒤에서도 "새 섹션 시작"과 똑같이 넓게
  // 보였다. 반대로 실제 h2/h3/h4 제목 뒤에 오는 코드블록/박스는 이 규칙 대상이 아니므로
  // (아래 선택자에 h2/h3/h4는 포함하지 않음) margin-top 1.5rem이 그대로 유지된다 —
  // 큰 섹션 전환과 같은 세트 내부를 역할로 구분한다.
  // 해결: 직전 문단(미니 소제목이 아닌 일반 p) 쪽 margin-bottom을 0으로 강제해 병합
  // 경쟁을 없애고, 코드블록/박스 자신의 margin-top을 0.5rem으로 강제해 그 값 하나로만
  // 간격이 결정되게 한다. 미니 소제목은 이미 자체 margin-bottom이 0으로 강제되어 있어
  // 별도 처리가 필요 없다.
  // 박스가 박스를 바로 뒤따르는 경우(예: callout 설명 → 코드블록 예시, 코드블록 →
  // 두 번째 코드블록)도 같은 세트다(2026-07 20차 개편 — JavaScript 1-2 재검토로 발견).
  // 기존 규칙은 "선행 요소가 미니 소제목/일반 p/ul/ol일 때"만 다음 박스의 margin-top을
  // 좁혔는데, 선행 요소가 박스 자신인 경우는 대상에서 빠져 있어 두 박스 자신의 기본
  // margin(코드블록 1.5rem, callout 1.1rem 등)이 그대로 병합돼 넓게 보였다.
  // 값 재조정(2026-07 22차 개편 — JavaScript 1-2 재검토로 발견): "텍스트(미니 소제목/
  // 일반 p·ul·ol) → 박스"와 "박스 → 박스"는 같은 세트라도 밀도를 다르게 둔다. 텍스트는
  // 배경/border가 없어 0.5rem만으로도 자연스럽게 붙어 보이지만, callout/카드/코드블록처럼
  // 배경·border가 있는 "박스형 UI"끼리 연속되면 0.5rem(8px)은 숨 쉴 공간 없이 붙어
  // 보인다 — 그래서 박스 → 박스는 0.75rem(12px)으로 살짝 더 띄운다. 아래 두 쌍 중 첫
  // 번째는 "텍스트 → 박스"(0.5rem 유지), 두 번째는 "박스 → 박스"(0.75rem로 조정)를
  // 각각 별도 규칙으로 분리해 서로 다른 값을 적용한다.
  [WDA_BOX_SELECTORS.map((s) => `p:not(.${WDA_MINIHEAD_CLASS}):has(+ ${s}), ul:has(+ ${s}), ol:has(+ ${s})`).join(', ')]: {
    marginBottom: '0 !important',
  },
  [WDA_BOX_SELECTORS.map((s) => `.${WDA_MINIHEAD_CLASS} + ${s}, p:not(.${WDA_MINIHEAD_CLASS}) + ${s}, ul + ${s}, ol + ${s}`).join(', ')]: {
    marginTop: '0.5rem !important',
  },
  [WDA_BOX_SELECTORS.map((s) => WDA_BOX_SELECTORS.map((b) => `${b}:has(+ ${s})`).join(', ')).join(', ')]: {
    marginBottom: '0 !important',
  },
  [WDA_BOX_SELECTORS.map((s) => WDA_BOX_SELECTORS.map((b) => `${b} + ${s}`).join(', ')).join(', ')]: {
    marginTop: '0.75rem !important',
  },
  // h2/h3 섹션 제목 바로 다음에 오는 첫 문단(그 섹션을 여는 도입 문장)은 p 컴포넌트가
  // margin-top을 지정하지 않아 브라우저 기본값(약 0.93~0.95rem, p의 font-size 기준
  // 1em)이 그대로 적용되고, h2/h3 자신의 margin-bottom(h2: 0.6rem, h3: 0.35rem)과
  // 병합(collapse)되어도 더 큰 브라우저 기본값이 남아 다소 넓어 보였다. h2의
  // 구분선(border-bottom)은 유지한 채, 그 바로 다음 문단만 margin-top을 줄여
  // "같은 섹션의 시작 문장"답게 붙어 보이게 한다.
  // 값 재조정(2026-07 23차 개편 — 사용자 피드백): 기존에는 margin-top만 0.5rem으로
  // 줄이고 !important를 쓰지 않아, h2 자신의 margin-bottom(0.6rem=9.6px)이 병합 시
  // 더 커서 실제로는 9.6px가 그대로 남았다(h3는 margin-bottom이 0.35rem=5.6px로 더
  // 작아 0.5rem이 이겨 8px이 됐음 — 같은 규칙인데 h2/h3에서 결과가 달랐다). 또한
  // "숫자 h2 섹션 제목 바로 다음에 도입 문장 없이 곧장 미니 소제목이 오는 경우"는 이
  // 규칙 대상이 아니었다 — 미니 소제목 자신의 margin-top은 이미 항상 0으로
  // 강제되므로 h2/h3의 margin-bottom(collapse 상대 없음)과 미니 소제목 자신의
  // padding-top(1.2rem=19.2px)이 그대로 더해져 "문장이 오면 8px, 미니 소제목이
  // 오면 그보다 훨씬 넓게" 보이는 불일치가 있었다. 아래에서 h2/h3의 margin-bottom을
  // 두 경우 모두 0으로 강제하고, 문장은 margin-top 0.5rem, 미니 소제목은 자신의
  // padding-top을 0.5rem으로 강제해 "숫자 h2/h3 제목 → 문장이든 미니 소제목이든
  // 항상 8px"로 통일한다. h4에는 영향을 주지 않는다.
  // ul/ol 확장(2026-07 배포 화면 QA 개편): 위와 같은 이유로 h2/h3 바로 다음에 목록이
  // 곧장 오는 경우도 p와 동일하게 취급한다 — 기존에는 p만 대상이라 ul/ol은 브라우저
  // 기본 margin-top(약 1em)이 그대로 남아 간격이 불규칙했다.
  'h2:has(+ p:not(.wda-minihead)), h3:has(+ p:not(.wda-minihead)), h2:has(+ p.wda-minihead.wda-minihead), h3:has(+ p.wda-minihead.wda-minihead), h2:has(+ ul), h3:has(+ ul), h2:has(+ ol), h3:has(+ ol)': {
    marginBottom: '0 !important',
  },
  'h2 + p:not(.wda-minihead), h3 + p:not(.wda-minihead), h2 + ul, h3 + ul, h2 + ol, h3 + ol': {
    marginTop: '0.5rem !important',
  },
  'h2 + p.wda-minihead.wda-minihead, h3 + p.wda-minihead.wda-minihead': {
    paddingTop: '0.5rem !important',
  },
  // `h2` 바로 다음에 도입 문장/미니 소제목 없이 곧장 하위 `h3`가 오는 경우(2026-07 40차
  // 개편 — 신설, 정밀 수치 분석으로 발견). JS 1-1/1-2 기준 문서에는 실제 `h3`가 없어
  // 이 인접 패턴 자체가 검증된 적이 없었고, 다른 문서(react/1-1-node-npm.md,
  // javascript/5-1-async-programming-basics.md, ai-vibe-coding/step-01-dev-environment.md
  // 등)에서만 실제로 쓰이는데, 그동안 아무 규칙도 없어 h3 자신의 기본 margin-top
  // (2.6rem=41.6px)이 그대로 노출되어 "섹션 전환"과 똑같이 과하게 넓어 보였다. h3 자신의
  // 기본 margin-top(2.6rem)은 그대로 유지하고, h2 바로 다음에 h3가 곧장 오는 이 경우에만
  // 1.1rem(17.6px)으로 좁힌다 — h2의 margin-bottom(0.6rem=9.6px)보다 커서 병합 후에도
  // 이 값이 그대로 유지된다.
  'h2 + h3': {
    marginTop: '1.1rem !important',
  },
  // 실제 `h2`/`h3` 제목 바로 다음에 도입 문장 없이 곧장 오는 코드블록/박스류(2026-07 40차
  // 개편 — 신설, 정밀 수치 분석으로 발견; 41차 개편 — h2 확장, JavaScript basics 화면 QA로
  // 발견). 위 h2+h3와 같은 이유로 지금까지 규정이 없어 코드블록(1.5rem=24px)/박스류
  // (문서별 로컬 margin-top, 대략 0.8rem=12.8px대)가 그대로 노출됐다 — 특히 숫자 매기기
  // h2 섹션 제목 바로 다음에 도입 문장 없이 코드블록/박스가 오는 구성(JS 1-3~1-5, 부록)에서
  // 표가 오는 경우(margin-top 0 기본값)보다 훨씬 넓어 보이는 불일치가 있었다. 코드블록/박스
  // 자신의 기본 margin-top은 그대로 유지하고, h2 또는 h3 바로 다음에 곧장 오는 이 경우에만
  // 0.75rem(12px)으로 고정한다 — h2의 margin-bottom(0.6rem=9.6px)/h3의 margin-bottom
  // (0.35rem=5.6px) 모두보다 커서 병합 후에도 이 값이 그대로 유지된다. 도입 문장이 하나라도
  // h2/h3와 박스 사이에 있으면 이 규칙 대상이 아니며, 그 경우 [19-4-B]의 "텍스트 → 박스"
  // 규칙(0.5rem)이 대신 적용된다.
  [WDA_HEADING_BOX_SELECTORS.map((s) => `h2 + ${s}, h3 + ${s}`).join(', ')]: {
    marginTop: '0.75rem !important',
  },
  // 일반 콘텐츠(p/코드블록/표/박스류) 바로 다음에 도입 문장 없이 곧장 h3가 오는 가장 흔한
  // 패턴(2026-08 개편 — spacing 실측 분석으로 발견). 위 h2+h3/h2·h3+box 규칙은 "헤딩이나
  // 박스가 곧장 이어질 때"만 다루고, 정작 가장 많이 쓰이는 "일반 문단/코드블록/표/박스
  // 뒤에 다음 소단원 h3가 시작되는" 패턴은 지금까지 규칙이 없어 h3 자신의 기본
  // margin-top(2.6rem=41.6px)이 그대로 노출되고 있었다. 같은 위치에 미니 소제목이 오면
  // padding-top 1.2rem(19.2px)만 적용돼 두 방식의 체감 간격이 2.17배까지 벌어져 있었다
  // (실측: 실제 h3를 쓰는 문서는 CSS/HTML/Git 소수에 불과하고 나머지 카테고리는 대부분
  // 미니 소제목이라, h3를 쓰는 문서만 유독 넓어 보이는 원인이었다). 기존 `h2 + h3` 특수
  // 규칙과 같은 값(1.1rem=17.6px)으로 맞춰 미니 소제목과의 체감 차이를 줄이되, h3 고유의
  // 더 큰 폰트·line-height는 그대로 유지해 "새 소단원 시작" 위계 자체는 지우지 않는다.
  // h2는 대상에서 제외한다 — h2는 여전히 "큰 섹션 전환"으로 기존 2.2rem 간격을 유지해야
  // 하므로 이번 조정 대상이 아니다. h4/h5는 문서 전체에 실사용 사례가 없어 이번에는 h3만
  // 다룬다. 박스류는 h2/h3+box 규칙과 동일하게 WDA_HEADING_BOX_SELECTORS를 재사용하고,
  // 여기에 학습 목표 박스(`.wda-goal`)만 추가한다 — 다른 박스류와 달리 문서 도입부에서만
  // 쓰여 지금까지 이 상수에 포함될 필요가 없었지만, 이번 방향(콘텐츠 → h3)에서는 학습
  // 목표 박스 바로 뒤에 h3급 소제목이 오는 경우도 동일하게 다뤄야 한다.
  [`p:not(.${WDA_MINIHEAD_CLASS}):has(+ h3), :has(> table):has(+ h3), ${[...WDA_HEADING_BOX_SELECTORS, '.wda-goal'].map((s) => `${s}:has(+ h3)`).join(', ')}`]: {
    marginBottom: '0 !important',
  },
  [`p:not(.${WDA_MINIHEAD_CLASS}) + h3, :has(> table) + h3, ${[...WDA_HEADING_BOX_SELECTORS, '.wda-goal'].map((s) => `${s} + h3`).join(', ')}`]: {
    marginTop: '1.1rem !important',
  },
  // 박스류(callout/카드/단계형 등) 내부 상단 여백 방어 규칙 3종(2026-07 개편 —
  // 신설, React hooks/3-3-useref.md 재검토로 근본 원인 확정). WdaBoxContext(위 p
  // 컴포넌트 수정)만으로는 실제 화면에서 충분히 해결되지 않았는데, 원인은 따로
  // 있었다: 거의 모든 문서의 로컬 `<style>` 블록에 구버전 규칙
  // `p:has(> strong:only-child){margin-top:2.2rem !important}`(특이도 0,1,2)이
  // 여전히 남아 있고, 지금까지는 `p.wda-minihead.wda-minihead{marginTop:0
  // !important}`(특이도 0,2,1)가 이 구버전 규칙을 항상 이겨서 억눌러 왔다. 그런데
  // WdaBoxContext가 박스 내부 강조 라벨 문단에서 `wda-minihead` 클래스 자체를
  // 떼어내 버리면, 그 문단은 더 이상 저 이중 클래스 규칙과 매치하지 않게 되어
  // "억누르던 규칙"이 사라지고, 특이도는 낮지만 `!important`가 붙은 구버전 규칙이
  // 그대로 다시 이겨버린다(`!important` 선언끼리는 특이도 비교, `!important` 대
  // 비-`!important`는 항상 `!important`가 이김) — 결과적으로 이전보다 더 넓은
  // margin-top:2.2rem(35.2px)이 노출되는 역효과가 났다. 아래 세 규칙은 박스 내부
  // 요소 자체를 대상으로 명시적 `!important`를 걸어, 문서별 구버전 잔재나
  // `wda-minihead` 클래스 부착 여부와 무관하게 항상 박스 내부 상단 여백이
  // 0이 되도록 강제한다(특이도 0,2,1 이상 + `!important`로 구버전 규칙의 0,1,2를
  // 항상 이긴다). React 문서 뿐 아니라 이 GlobalStyles는 전체 사이트에 적용되므로
  // JS/ai-vibe-coding/coding-test 문서의 동일 패턴도 함께 방어된다.
  [WDA_HEADING_BOX_SELECTORS.map((s) => `${s} > p:first-child`).join(', ')]: {
    marginTop: '0 !important',
    paddingTop: '0 !important',
  },
  [WDA_HEADING_BOX_SELECTORS.map((s) => `${s} > ul:first-child, ${s} > ol:first-child`).join(', ')]: {
    marginTop: '0 !important',
  },
  // WdaBoxContext가 어떤 이유로든(예: 박스 클래스가 다른 wrapper 뒤에 한 단계 더
  // 감싸여 있는 경우) 박스 내부 강조 라벨의 `wda-minihead` 클래스 부착을 막지
  // 못했을 때를 대비한 방어선 — 박스 내부에 `wda-minihead`가 존재하면 그 자체의
  // margin-top/padding-top을 무조건 0으로 고정한다. 페이지 본문 레벨(박스 밖)
  // minihead는 이 선택자에 매치하지 않으므로 전혀 영향받지 않는다.
  [WDA_HEADING_BOX_SELECTORS.map((s) => `${s} .${WDA_MINIHEAD_CLASS}`).join(', ')]: {
    marginTop: '0 !important',
    paddingTop: '0 !important',
  },
};

// 일반 본문 문단 첫 줄 들여쓰기(2026-08 개편 — 사용자 요청). `.wda-doc-body`(아래
// MarkdownRenderer 최상위 wrapper)의 "직계 자식" p만 골라 적용한다 — react-markdown은
// className을 받지 않는 한 자체 wrapper 없이 최상위 블록 요소를 그대로 부모의 직계
// 자식으로 렌더링하므로(react-markdown lib/index.js `post()` 참고), 박스/콜아웃/리스트/
// 표/인용 내부에 중첩된 p는 전부 한 단계 이상 깊이 들어가 있어 `>` 결합자만으로 자동
// 제외된다 — 별도의 박스 클래스 예외 목록이 필요 없다. 이모지+볼드 단독 문단(미니
// 소제목, `wda-minihead`)은 본문 문장이 아니므로 `:not()`으로 별도 제외한다.
const wdaBodyIndentStyles = {
  '.wda-doc-body > p:not(.wda-minihead)': {
    textIndent: '0.85em',
  },
};

// react-markdown의 `p` 컴포넌트 본체 — 함수 이름이 대문자로 시작해야
// react-hooks/rules-of-hooks가 이 안의 React.useContext 호출을 정상적인
// 컴포넌트로 인식한다(이전에는 markdownComponents.p 자리에 소문자 이름의
// 화살표 함수로 바로 정의되어 있어 규칙 위반이었다). markdownComponents 맵의
// key는 react-markdown이 그대로 HTML 태그명으로 사용하므로 'p'를 유지하고,
// 값만 이 컴포넌트를 참조한다.
function ParagraphRenderer({ children }) {
  // "이모지+볼드 단독 문단"(본문 중간 미니 소제목)인지 React children으로 직접 판별.
  const kids = React.Children.toArray(children).filter(
    (c) => typeof c !== 'string' || c.trim() !== ''
  );
  // callout/카드 등 박스류 내부(WdaBoxContext)에서는 강조 라벨 한 줄짜리 문단이
  // 있어도 미니 소제목으로 처리하지 않는다 — 박스 안 라벨과 본문 레벨 미니
  // 소제목을 구분하기 위함(위 WDA_BOX_CONTEXT_CLASSES 주석 참고).
  const insideBox = React.useContext(WdaBoxContext);
  const isLoneStrong =
    !insideBox &&
    kids.length === 1 && React.isValidElement(kids[0]) && kids[0].type === StrongText;
  return (
    <Box
      component='p'
      // margin은 인접 요소와 병합(collapse)되어 실제 화면 간격이 의도보다 줄어들 수
      // 있으므로 padding으로 간격을 강제한다. 문서 내 <style> 블록에 남아있는 구버전
      // `p:has(> strong:only-child){margin-top:2.2rem !important}` 규칙은 :has()
      // 특이도가 단일 클래스보다 높아 sx의 !important만으로는 이기지 못했다 — 아래
      // WDA_MINIHEAD_CLASS의 이중 클래스 셀렉터(GlobalStyles)로 특이도를 그 이상으로
      // 올려 확실히 덮어쓴다 (2026-07 5차 개편).
      className={isLoneStrong ? WDA_MINIHEAD_CLASS : undefined}
      sx={{
        pt: isLoneStrong ? '1.2rem' : undefined,
        // 미니 소제목 아래 간격은 이 padding-bottom이 아니라 아래 콘텐츠 쪽의
        // margin-top(0.5rem, wdaMinheadGlobalStyles)이 전담한다. 과거 pb:'0.2rem'이
        // 남아있어 실제 간격이 0.2rem+0.5rem=0.7rem(11.2px)으로, 정책이 명시한
        // 0.5rem(8px)보다 넓게 렌더링되고 있었다(2026-07 개편 — JavaScript 1-1/1-2/1-3
        // 재검토로 발견). 아래 콘텐츠가 margin-top 규칙의 적용 대상이 아닌 경우(예: 표)는
        // wdaMinheadGlobalStyles에 별도 보정 규칙을 둔다.
        pb: isLoneStrong ? 0 : undefined,
        mb: isLoneStrong ? undefined : '0.9rem',
        color: 'text.primary',
        fontSize: { xs: '0.93rem', md: '0.95rem' },
        lineHeight: 1.75,
        fontFamily: 'inherit',
      }}
    >
      {children}
    </Box>
  );
}

// 컴포넌트 맵 — 모듈 로드 시 한 번만 생성
const markdownComponents = {
  // ── 제목 (본문 영역에만 적용, 전역 레이아웃 영향 없음) ──────────────
  h1: ({ children }) => (
    <Box
      component='h1'
      sx={{
        mt: 0,
        mb: '0.75rem',
        fontSize: { xs: '1.45rem', md: '1.65rem' },
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
        color: 'text.primary',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </Box>
  ),
  h2: ({ children }) => (
    <Box
      component='h2'
      sx={(theme) => ({
        // mt는 코드블록(1.5rem)/표(1.2rem)/wda-fgrid·wda-steps(1.6rem) 등 콘텐츠 요소의
        // margin-bottom보다 항상 커야 마진 병합(collapse) 후에도 "새 섹션" 느낌을 주는
        // 넉넉한 간격이 보장된다 (2026-07 개편, 여백 정책 참고).
        // 값 재조정(2026-07 25차 개편 — 사용자 피드백): 3rem(48px)은 학습 목표 박스(.wda-goal,
        // mb 1.6rem) 등 박스 콘텐츠 바로 다음에 h2가 이어질 때 흐름이 끊겨 보일 만큼 과했다.
        // 2.2rem(35.2px)으로 줄여도 여전히 박스 콘텐츠의 margin-bottom(1.1~1.6rem대)보다
        // 커서 병합 후에도 "새 섹션" 여백은 그대로 보장된다.
        mt: '2.2rem',
        mb: '0.6rem',
        fontSize: { xs: '1.18rem', md: '1.28rem' },
        fontWeight: 700,
        lineHeight: 1.35,
        letterSpacing: '-0.005em',
        color: 'text.primary',
        fontFamily: 'inherit',
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'rgba(43,37,32,0.14)' : 'rgba(240,235,227,0.10)'}`,
        paddingBottom: '0.45rem',
      })}
    >
      {children}
    </Box>
  ),
  h3: ({ children }) => (
    <Box
      component='h3'
      sx={(theme) => ({
        mt: '2.6rem',
        mb: '0.35rem',
        fontSize: { xs: '1.02rem', md: '1.08rem' },
        fontWeight: 600,
        lineHeight: 1.4,
        fontFamily: 'inherit',
        color: theme.palette.mode === 'light' ? 'rgba(28,24,40,0.86)' : 'rgba(240,235,227,0.86)',
      })}
    >
      {children}
    </Box>
  ),
  h4: ({ children }) => (
    <Box
      component='h4'
      sx={(theme) => ({
        mt: '2.1rem',
        mb: '0.3rem',
        fontSize: { xs: '0.94rem', md: '0.97rem' },
        fontWeight: 600,
        lineHeight: 1.4,
        fontFamily: 'inherit',
        color: theme.palette.mode === 'light' ? 'rgba(28,24,40,0.78)' : 'rgba(240,235,227,0.75)',
      })}
    >
      {children}
    </Box>
  ),

  // ── 본문 ────────────────────────────────────────────────────────────
  p: ParagraphRenderer,
  strong: StrongText,
  em: ({ children }) => (
    <Box component='em' sx={{ fontStyle: 'italic' }}>
      {children}
    </Box>
  ),

  // ── 링크 ────────────────────────────────────────────────────────────
  // 외부 링크: MuiLink + target="_blank"
  // 내부 링크: React Router Link — 상대 경로(./slug)를 SPA 라우팅으로 올바르게 해석
  a: ({ href, children }) => {
    const linkSx = {
      color: 'primary.main',
      textDecorationColor: 'primary.light',
      '&:hover': { color: 'primary.dark' },
      '&:focus-visible': {
        outline: '2px solid',
        outlineColor: 'primary.main',
        outlineOffset: '2px',
        borderRadius: '2px',
      },
    };
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <MuiLink href={href} target='_blank' rel='noopener noreferrer' sx={linkSx}>
          {children}
        </MuiLink>
      );
    }
    return (
      <MuiLink component={RouterLink} to={href ?? ''} sx={linkSx}>
        {children}
      </MuiLink>
    );
  },

  // ── 리스트 ──────────────────────────────────────────────────────────
  // className을 읽어 isTaskList만 판별하고 실제 렌더링된 Box에는 전달하지 않던
  // 버그가 있었다(2026-07 13차 개편 — 발견). rehype-raw로 들어온 raw HTML
  // `<ul class="wda-fcard-list">` 같은 커스텀 클래스가 렌더링 결과에서 통째로
  // 사라져, 문서 <style> 블록의 `.wda-fcard-list{...}` 같은 규칙이 실제 DOM의
  // 어떤 요소와도 매칭되지 않았다 — 그 결과 자식 li가 문서 최상위 기본값(16px)을
  // 그대로 상속해 카드 본문 폰트 위계가 깨졌다. className을 그대로 전달해 해결한다.
  ul: ({ children, className }) => {
    const isTaskList = className === 'contains-task-list';
    return (
      <Box
        component='ul'
        className={className}
        sx={{
          mb: isTaskList ? 2 : 3,
          pl: isTaskList ? 0 : 3,
          color: 'text.primary',
          '& li': { mb: isTaskList ? 0.3 : 0.5 },
          ...(isTaskList && { listStyle: 'none' }),
        }}
      >
        {children}
      </Box>
    );
  },
  ol: ({ children }) => (
    <Box
      component='ol'
      sx={{ mb: 3, pl: 3, color: 'text.primary', '& li': { mb: 0.5 } }}
    >
      {children}
    </Box>
  ),
  li: ({ children, className }) => {
    const isTask = className === 'task-list-item';
    return (
      <Box
        component='li'
        className={className}
        sx={{
          lineHeight: isTask ? 1.6 : 1.75,
          ...(isTask && {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.45rem',
            listStyleType: 'none',
            fontSize: '0.9rem',
          }),
        }}
      >
        {children}
      </Box>
    );
  },

  // ── 콘텐츠 이미지 (다이어그램/스크린샷) ───────────────────────────────
  // /images/content/ 경로의 학습 도식 이미지에만 카드형 프레임(border·shadow·배경)을 적용한다.
  // /images/decoration/, /images/character/ 등 스티커·캐릭터 오버레이 이미지는 그대로 통과시킨다.
  img: ({ src, alt, style, ...rest }) => {
    const resolvedSrc = resolveImageSrc(src);
    const isContentImage = typeof resolvedSrc === 'string' && resolvedSrc.includes('/images/content/');
    if (!isContentImage) {
      return <img src={resolvedSrc} alt={alt} style={style} {...rest} />;
    }
    return (
      <Box
        component='img'
        src={resolvedSrc}
        alt={alt}
        sx={(theme) => {
          const isLight = theme.palette.mode === 'light';
          return {
            ...style,
            boxSizing: 'border-box',
            padding: '10px',
            borderRadius: '14px',
            // 라이트: 문서 배경(default)과 이어지는 톤 + 아주 옅은 border/shadow → "깔끔한 삽입" 느낌
            // 다크: paper 톤 카드 + 뚜렷한 shadow → 흰 이미지가 자연스럽게 뜬 카드 느낌
            border: `1px solid ${isLight ? 'rgba(43,37,32,0.08)' : theme.palette.divider}`,
            backgroundColor: isLight ? theme.palette.background.default : theme.palette.background.paper,
            boxShadow: isLight
              ? '0 1px 2px rgba(43,37,32,0.05)'
              : '0 6px 22px rgba(0,0,0,0.42)',
          };
        }}
        {...rest}
      />
    );
  },

  // ── 구분선 (큰 섹션 전환 전용) ──────────────────────────────────────
  // mt/mb를 비대칭으로 둔다: 구분선은 "이전 섹션의 끝"을 표시하는 역할이므로
  // 직전 내용과는 가깝게(mt), 다음 h2/h3 제목과는 섹션 전환이 느껴질 만큼
  // 여유 있게(mb) 붙인다. mt(1rem)는 직전 요소의 margin-bottom(문단 0.9rem 등)과
  // 병합(collapse)되어 실제로는 약 1rem 안팎이 되고, mb(2rem)는 다음에 오는 h2의
  // margin-top(3rem)이 항상 더 크므로 병합 후 시각적으로는 h2 쪽 여백이 그대로
  // 유지된다(2026-07 9차 개편 — 이전 마지막 문장과 구분선 사이가 넓어 보이는 문제 수정).
  hr: () => (
    <Divider
      sx={(theme) => ({
        mt: '1rem',
        mb: '2rem',
        borderColor: theme.palette.mode === 'light' ? 'rgba(43,37,32,0.12)' : 'rgba(240,235,227,0.10)',
      })}
    />
  ),

  // ── Callout (blockquote) ────────────────────────────────────────────
  blockquote: ({ children }) => <Callout>{children}</Callout>,

  // ── 코드 블록 (pre > code) ──────────────────────────────────────────
  pre: ({ children }) => {
    const childArray = React.Children.toArray(children);
    const codeEl = childArray[0];
    const className = codeEl?.props?.className ?? '';
    const langMatch = className.match(/language-(\w+)/);
    const language = langMatch ? langMatch[1] : 'text';
    return <CodeBlock language={language}>{children}</CodeBlock>;
  },

  // ── 코드 인라인 vs 블록 분기 ────────────────────────────────────────
  // sx 콜백: ThemeContext에서 테마를 읽어 다크 모드 자동 대응
  code: ({ className, children }) => {
    // 블록 코드: pre 안의 code → className에 'language-' 포함
    if (/\blanguage-/.test(className ?? '')) {
      return <code className={className}>{children}</code>;
    }
    // 인라인 코드
    return (
      <Box
        component='code'
        sx={(theme) => ({
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: '0.875em',
          backgroundColor: theme.palette.mode === 'light' ? '#EAE3D8' : '#2E2A48',
          color: theme.palette.mode === 'light' ? '#5E3EA8' : '#C8B8F0',
          borderRadius: '4px',
          px: '6px',
          py: '2px',
          lineHeight: 1,
        })}
      >
        {children}
      </Box>
    );
  },

  // ── 표 (remark-gfm) ─────────────────────────────────────────────────
  // sx 콜백: ThemeContext에서 테마를 읽어 다크 모드 자동 대응
  table: ({ children }) => (
    <Box sx={{ mb: '1.2rem', width: '100%', overflowX: 'auto' }}>
      <Box
        component='table'
        sx={{
          borderCollapse: 'collapse',
          width: '100%',
          fontSize: '0.92rem',
          lineHeight: 1.6,
        }}
      >
        {children}
      </Box>
    </Box>
  ),
  thead: ({ children }) => (
    <Box
      component='thead'
      sx={(theme) => ({
        backgroundColor: theme.palette.mode === 'light' ? '#F2EDE6' : '#24203A',
      })}
    >
      {children}
    </Box>
  ),
  tbody: ({ children }) => (
    <Box component='tbody'>{children}</Box>
  ),
  tr: ({ children }) => (
    <Box
      component='tr'
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.palette.mode === 'light' ? '#DDD5C8' : '#3C3858'}`,
      })}
    >
      {children}
    </Box>
  ),
  th: ({ children }) => (
    <Box
      component='th'
      sx={(theme) => ({
        p: '5px 10px',
        fontWeight: 600,
        textAlign: 'left',
        color: theme.palette.mode === 'light' ? '#2C2840' : '#F0EBE3',
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#DDD5C8' : '#3C3858'}`,
        '&:last-child': { borderRight: 0 },
        wordBreak: 'keep-all',
        overflowWrap: 'break-word',
      })}
    >
      {children}
    </Box>
  ),
  td: ({ children }) => (
    <Box
      component='td'
      sx={(theme) => ({
        p: '5px 10px',
        color: theme.palette.mode === 'light' ? '#2C2840' : '#F0EBE3',
        borderRight: `1px solid ${theme.palette.mode === 'light' ? '#DDD5C8' : '#3C3858'}`,
        '&:last-child': { borderRight: 0 },
        wordBreak: 'keep-all',
        overflowWrap: 'break-word',
      })}
    >
      {children}
    </Box>
  ),

  // ── raw HTML <div> 패스스루 + FlipCard 감지 ──────────────────────────
  // 문서 전역에 style="..."만 있고 class가 없는 데코 div가 많으므로, node를 제외한
  // 모든 props를 그대로 전달해 기존 동작(기본 div 렌더링)을 절대 바꾸지 않는다.
  // class에 'wda-flip-card'가 있을 때만 FlipCard로 가로챈다.
  // eslint-disable-next-line no-unused-vars -- node는 DOM에 전달하지 않기 위해 rest에서 분리만 함
  div: ({ node, className, children, ...rest }) => {
    const classes = (className || '').split(' ');
    if (classes.includes('wda-flip-card')) {
      return <FlipCard>{children}</FlipCard>;
    }
    // 박스류(callout/카드/단계형 등) div면 WdaBoxContext를 켜서, 그 안의 p
    // 컴포넌트가 강조 라벨 단독 문단을 미니 소제목으로 오인식하지 않게 한다
    // (위 WDA_BOX_CONTEXT_CLASSES 주석 참고). 박스가 아닌 일반 div(데코 등)는
    // 기존 그대로 패스스루한다.
    const isBoxContainer = classes.some((c) => WDA_BOX_CONTEXT_CLASSES.has(c));
    return (
      <div className={className} {...rest}>
        {isBoxContainer ? (
          <WdaBoxContext.Provider value={true}>{children}</WdaBoxContext.Provider>
        ) : (
          children
        )}
      </div>
    );
  },
};

function MarkdownRenderer({ content, docId = '' }) {
  // GitHub Pages sub-path 대응: /images/ → /winter-dev-archive/images/
  // BASE='' (dev) 이면 치환 불필요
  const processedContent = useMemo(
    () => (BASE ? content.replace(/src="\/images\//g, `src="${BASE}/images/`) : content),
    [content],
  );

  // input 핸들러만 docId에 의존 — docId 변경 시에만 재생성
  const components = useMemo(() => ({
    ...markdownComponents,
    input: ({ type, checked, className, node, ...rest }) => {
      // rehype-raw 경유 데모 HTML 요소 (class 있음) — 그대로 통과
      if (className) {
        if (type === 'checkbox' || type === 'radio') {
          return <input type={type} className={className} defaultChecked={!!checked} {...rest} />;
        }
        return <input type={type} className={className} {...rest} />;
      }

      // remark-gfm task list 체크박스 (class 없음, type=checkbox)
      if (type === 'checkbox') {
        if (!docId) {
          return (
            <input
              type='checkbox'
              disabled
              defaultChecked={!!checked}
              style={{ accentColor: '#8B5CF6', width: '13px', height: '13px', marginTop: '2px' }}
            />
          );
        }
        const lineNum = node?.position?.start?.line ?? 0;
        const cleanDocId = docId.replace(/\//g, '-');
        const storageKey = `wda-cp-${cleanDocId}-L${lineNum}`;
        return (
          <CheckboxItem
            key={storageKey}
            storageKey={storageKey}
            initialChecked={!!checked}
          />
        );
      }

      return <input type={type} {...rest} />;
    },
  }), [docId]);

  return (
    <Box
      className='wda-doc-body'
      sx={{ width: '100%', minWidth: 0, wordBreak: 'keep-all', overflowWrap: 'break-word' }}
    >
      <GlobalStyles styles={wdaMinheadGlobalStyles} />
      <GlobalStyles styles={wdaBodyIndentStyles} />
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </Box>
  );
}

export default MarkdownRenderer;
