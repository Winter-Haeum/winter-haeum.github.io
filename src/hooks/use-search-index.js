/**
 * useSearchIndex — Fuse.js 검색 인덱스 빌드 + 캐싱 훅
 *
 * buildSearchIndex()를 1회 호출해 Fuse 인스턴스를 생성하고 state에 저장한다.
 * buildSearchIndex()는 모듈 스코프 캐시를 사용하므로 재마운트 시에도 빠르게 완료된다.
 * React 18 자동 배치로 setFuse, setTagFuse, setIndexing이 한 번의 렌더로 처리된다.
 *
 * @returns {{ fuse: Fuse|null, tagFuse: Fuse|null, indexing: boolean, indexError: boolean }}
 *   fuse       — 일반 퍼지 검색 인스턴스 (title×5, tags×4, description×3, body×1)
 *   tagFuse    — 태그 전용 정밀 검색 인스턴스 (#prefix 전용, threshold: 0.10)
 *   indexing   — 인덱스 빌드 완료 여부
 *   indexError — 인덱스 빌드 실패 여부 (true 시 SearchPage에서 에러 상태 표시)
 */
import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { buildSearchIndex } from '@/utils/markdownLoader';

const FUSE_OPTIONS = {
  keys: [
    { name: 'title', weight: 5 },
    { name: 'tags', weight: 4 },
    { name: 'description', weight: 3 },
    { name: 'body', weight: 1 },
  ],
  threshold: 0.30,
  minMatchCharLength: 2,
  ignoreLocation: true,
  includeScore: true,
  includeMatches: true,
};

const TAG_FUSE_OPTIONS = {
  keys: [{ name: 'tags', weight: 1 }],
  threshold: 0.10,
  minMatchCharLength: 1,
  ignoreLocation: true,
  includeScore: true,
  includeMatches: true,
};

export function useSearchIndex() {
  const [fuse, setFuse] = useState(null);
  const [tagFuse, setTagFuse] = useState(null);
  const [indexing, setIndexing] = useState(true);
  const [indexError, setIndexError] = useState(false);

  useEffect(() => {
    let active = true;
    buildSearchIndex()
      .then((docs) => {
        if (!active) return;
        // React 18 자동 배치 — 세 setState가 단일 렌더로 처리됨
        setFuse(new Fuse(docs, FUSE_OPTIONS));
        setTagFuse(new Fuse(docs, TAG_FUSE_OPTIONS));
        setIndexing(false);
      })
      .catch(() => {
        if (!active) return;
        // 빌드 실패 시 indexing을 false로 전환해 무한 스피너 방지
        setIndexError(true);
        setIndexing(false);
      });
    return () => { active = false; };
  }, []);

  return { fuse, tagFuse, indexing, indexError };
}
