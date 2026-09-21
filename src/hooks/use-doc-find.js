/**
 * useDocFind — 문서 내부 찾기(워드 찾기 스타일)
 *
 * containerRef가 가리키는 DOM 안의 텍스트 노드를 순회해 query와 일치하는 구간을
 * CSS Custom Highlight API(Range + CSS.highlights)로 하이라이트한다. React가
 * 렌더링한 DOM 트리(요소·속성)를 전혀 변경하지 않으므로 리렌더링과 충돌하지 않는다
 * — 브라우저가 CSS Custom Highlight API를 지원하지 않으면 하이라이트만 생략되고
 * 개수 세기·스크롤 이동은 그대로 동작한다(supported=false로 알 수 있음).
 *
 * 원문 텍스트는 절대 수정하지 않는다 — Range만 만들고 스타일만 씌운다.
 *
 * @param {React.RefObject<HTMLElement>} containerRef - 찾기 대상 컨테이너
 * @param {string} initialQuery - 초기 검색어
 * @returns {{
 *   query: string, setQuery: (q: string) => void,
 *   total: number, activeIndex: number,
 *   next: () => void, prev: () => void, close: () => void,
 *   supported: boolean,
 * }}
 */
import { useCallback, useEffect, useState } from 'react';

const MATCH_NAME = 'wda-find-match';
const CURRENT_NAME = 'wda-find-current';

const supportsHighlightApi =
  typeof window !== 'undefined' && typeof CSS !== 'undefined' && typeof CSS.highlights !== 'undefined';

function collectRanges(container, query) {
  if (!container || !query) return [];
  const lowerQuery = query.toLowerCase();
  const ranges = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const tag = node.parentElement?.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let node = walker.nextNode();
  while (node) {
    const text = node.nodeValue;
    const lowerText = text.toLowerCase();
    let from = 0;
    let idx = lowerText.indexOf(lowerQuery, from);
    while (idx !== -1) {
      const range = new Range();
      range.setStart(node, idx);
      range.setEnd(node, idx + query.length);
      ranges.push(range);
      from = idx + query.length;
      idx = lowerText.indexOf(lowerQuery, from);
    }
    node = walker.nextNode();
  }
  return ranges;
}

export function useDocFind(containerRef, initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);
  const [ranges, setRanges] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const recompute = useCallback(() => {
    const trimmed = query.trim();
    const found = collectRanges(containerRef.current, trimmed);
    setRanges(found);
    setActiveIndex(0);
  }, [containerRef, query]);

  // 검색어가 바뀌거나(즉시) 문서 본문이 비동기로 늦게 렌더될 때(MutationObserver)
  // 모두 재계산한다 — DOM 텍스트 노드를 읽어야 하므로 렌더 중 계산은 불가능하다.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    recompute();
    const observer = new MutationObserver(() => recompute());
    observer.observe(container, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, query]);

  // CSS Custom Highlight 등록/정리
  useEffect(() => {
    if (!supportsHighlightApi) return undefined;
    if (ranges.length === 0) {
      CSS.highlights.delete(MATCH_NAME);
      CSS.highlights.delete(CURRENT_NAME);
      return undefined;
    }
    CSS.highlights.set(MATCH_NAME, new Highlight(...ranges));
    const current = ranges[activeIndex];
    CSS.highlights.set(CURRENT_NAME, new Highlight(...(current ? [current] : [])));
    return () => {
      CSS.highlights.delete(MATCH_NAME);
      CSS.highlights.delete(CURRENT_NAME);
    };
  }, [ranges, activeIndex]);

  // 현재 위치로 스크롤
  useEffect(() => {
    const current = ranges[activeIndex];
    if (!current) return;
    const rect = current.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;
    window.scrollTo({
      top: window.scrollY + rect.top - window.innerHeight / 3,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, [ranges, activeIndex]);

  const next = useCallback(() => {
    setActiveIndex((i) => (ranges.length ? (i + 1) % ranges.length : 0));
  }, [ranges.length]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (ranges.length ? (i - 1 + ranges.length) % ranges.length : 0));
  }, [ranges.length]);

  const close = useCallback(() => {
    if (supportsHighlightApi) {
      CSS.highlights.delete(MATCH_NAME);
      CSS.highlights.delete(CURRENT_NAME);
    }
  }, []);

  return {
    query,
    setQuery,
    total: ranges.length,
    activeIndex,
    next,
    prev,
    close,
    supported: supportsHighlightApi,
  };
}

export const DOC_FIND_MATCH_HIGHLIGHT = MATCH_NAME;
export const DOC_FIND_CURRENT_HIGHLIGHT = CURRENT_NAME;
