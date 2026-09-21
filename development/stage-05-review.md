# Stage 5 코드 리뷰

> 검토 대상: `markdownLoader.js` · `use-search-index.js` · `SearchBar.jsx` · `SearchResultCard.jsx` · `SearchEmptyState.jsx` · `search-page.jsx` · `App.jsx`  
> 기준: 기능 정확성 · 안정성 · 성능 · 접근성 · 유지보수성

---

## 요약

| 파일 | 평가 | 주요 사항 |
|---|---|---|
| `markdownLoader.js` | 양호 | stripMarkdown 정규식 경계 케이스 존재 |
| `use-search-index.js` | 주의 ⚠️ | 에러 핸들링 없음 — 무한 스피너 가능 |
| `SearchBar.jsx` | 양호 | role="search" 누락 |
| `SearchResultCard.jsx` | 양호 | 구조 적절, 접근성 허용 수준 |
| `SearchEmptyState.jsx` | 양호 | SUGGESTED_SLUGS 하드코딩 |
| `search-page.jsx` | 주의 ⚠️ | 브라우저 뒤로가기 시 inputValue 불일치 |
| `App.jsx` | 양호 | 라우트 선언 순서 관례 차이 |

---

## 1. High Priority

### 1-1. `use-search-index.js` — Promise 에러 핸들링 없음

**위치**: line 46

```js
buildSearchIndex().then((docs) => {
  if (!active) return;
  setFuse(new Fuse(docs, FUSE_OPTIONS));
  setTagFuse(new Fuse(docs, TAG_FUSE_OPTIONS));
  setIndexing(false);
});
// ← .catch() 없음
```

`buildSearchIndex()`가 reject될 경우 (gray-matter 파싱 오류, 예기치 않은 런타임 에러 등) 두 가지 문제가 동시에 발생한다.

1. `indexing` 상태가 영구히 `true`로 남아 SearchBar 스피너가 사라지지 않는다.
2. Unhandled Promise Rejection이 브라우저 콘솔에 전파된다.

사용자는 검색이 불가능하지만 화면에는 로딩 중으로만 표시되어 원인을 알 수 없다.

**수정 방향**:

```js
// error state 추가
const [indexError, setIndexError] = useState(false);

buildSearchIndex()
  .then((docs) => {
    if (!active) return;
    setFuse(new Fuse(docs, FUSE_OPTIONS));
    setTagFuse(new Fuse(docs, TAG_FUSE_OPTIONS));
    setIndexing(false);
  })
  .catch(() => {
    if (!active) return;
    setIndexError(true);
    setIndexing(false);
  });
```

`indexError` 상태를 반환해 SearchPage에서 에러 메시지를 표시한다.

---

### 1-2. `search-page.jsx` — 브라우저 히스토리 네비게이션 시 `inputValue` 불일치

**위치**: line 33

```js
const [inputValue, setInputValue] = useState(urlQuery);
```

`useState`의 초기값은 컴포넌트 마운트 시 1회만 사용된다. 이후 브라우저 뒤로가기/앞으로가기로 `urlQuery`가 변경되어도 `inputValue`는 업데이트되지 않는다.

**재현 시나리오**:

```
1. '/search?q=flex' 입력 → urlQuery: 'flex', inputValue: 'flex'
2. '#setup' 입력 → urlQuery: '#setup', inputValue: '#setup'
3. 브라우저 Back 버튼 클릭
   → URL: '/search?q=flex' (urlQuery: 'flex')
   → inputValue: '#setup' (stale — 업데이트 안 됨)
결과: 검색창에는 '#setup'이 보이지만 결과는 'flex' 기준으로 표시됨
```

**수정 방향**:

```js
// urlQuery 변경 시 inputValue 동기화
// debounce 흐름과 간섭 없음:
//   타이핑 중에는 inputValue → debounce → urlQuery 순이므로
//   urlQuery가 바뀌어도 inputValue는 이미 해당 값이거나 더 최신 값이다.
//   브라우저 히스토리 이동 시에만 inputValue가 stale해지므로 이 effect가 의미를 가진다.
useEffect(() => {
  setInputValue(urlQuery);
}, [urlQuery]);
```

---

## 2. Medium Priority

### 2-1. `use-search-index.js` — `TAG_FUSE_OPTIONS`에 `includeMatches` 누락

**위치**: line 31–37

```js
const TAG_FUSE_OPTIONS = {
  keys: [{ name: 'tags', weight: 1 }],
  threshold: 0.10,
  minMatchCharLength: 1,
  ignoreLocation: true,
  includeScore: true,
  // ← includeMatches: true 없음
};
```

`FUSE_OPTIONS`에는 `includeMatches: true`가 있어 향후 하이라이팅에 match 위치 정보를 제공한다. `TAG_FUSE_OPTIONS`에는 없으므로 태그 검색 결과에는 하이라이팅 데이터가 없다. Stage 5에서는 하이라이팅을 구현하지 않으므로 즉각적 영향은 없지만, Phase 2에서 하이라이팅 추가 시 이 불일치가 버그로 표면화된다.

---

### 2-2. `SearchBar.jsx` — `role="search"` 미지정

**위치**: 최상위 Box 컴포넌트

```jsx
<Box sx={{ ... }}>
  <SearchIcon />
  <InputBase ... />
  {value && <IconButton ... />}
</Box>
```

ARIA 명세는 검색 기능에 `role="search"` 랜드마크 사용을 권장한다. 스크린 리더 사용자는 랜드마크 단축키로 페이지를 탐색하는데, `role="search"` 없이는 검색 영역을 바로 찾을 수 없다.

**수정 방향**: 최상위 Box에 `role='search'` 추가.

---

### 2-3. `search-page.jsx` — 검색 결과 변경 시 `aria-live` 공지 없음

**위치**: line 116–124, 결과 요약 Typography

```jsx
{!indexing && hasQuery && hasResults && (
  <Typography variant='body2' sx={{ color: 'text.secondary', mb: 3 }}>
    {results.length}개 문서를 찾았습니다
  </Typography>
)}
```

결과 수 문구가 DOM에 조건부 렌더링되지만 `aria-live` 속성이 없어 스크린 리더에 자동으로 공지되지 않는다. 타이핑이 끝난 후 결과가 업데이트되었음을 시각 장애 사용자가 알 방법이 없다.

**수정 방향**:

```jsx
// 항상 DOM에 존재하는 aria-live 영역으로 교체
// (aria-live는 DOM에 처음 추가되는 요소의 텍스트는 읽지 않음)
<Box
  role='status'
  aria-live='polite'
  aria-atomic='true'
  sx={{ mb: 3 }}
>
  {!indexing && hasQuery && hasResults && (
    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
      {results.length}개 문서를 찾았습니다
    </Typography>
  )}
</Box>
```

---

## 3. Low Priority

### 3-1. `SearchEmptyState.jsx` — `SUGGESTED_SLUGS` 하드코딩

**위치**: line 11

```js
const SUGGESTED_SLUGS = ['frontend', 'javascript', 'react', 'ai-vibe-coding'];
```

`navigation.js`의 카테고리 슬러그가 변경되면 이 목록이 obsolete가 된다. `categories` 배열의 첫 4개를 동적으로 사용하는 방식이 더 안전하다.

```js
const suggestedCats = categories.slice(0, 4);
```

현재는 슬러그가 안정적이므로 즉각적 영향은 없다.

---

### 3-2. `markdownLoader.js` — `_stripMarkdown` 비대칭 마커 미처리

**위치**: line 111

```js
.replace(/\*{1,3}([^*\n]+)\*{1,3}/g, '$1')
```

`\*{1,3}` 패턴은 양쪽의 애스터리스크 수가 달라도 매칭한다. `**text*` 같은 비대칭 마커는 제거되지 않고 `body`에 그대로 남는다. 이 마커 문자가 검색 body에 노이즈로 포함되지만 가중치가 1로 가장 낮아 검색 품질에 미치는 영향은 경미하다.

---

### 3-3. `App.jsx` — `/search` 라우트 선언 순서

**위치**: line 20

```jsx
<Route path='/:category/:section/:doc' element={<DocPage />} />
<Route path='/search' element={<SearchPage />} />  {/* ← 동적 라우트 이후 */}
```

React Router v6는 정적 경로(`/search`)가 동적 경로(`/:category`)보다 자동으로 우선 매칭되므로 동작은 올바르다. 그러나 관례적으로 정적 경로를 동적 라우트보다 위에 선언하면 코드 독자가 의도를 쉽게 파악할 수 있다.

```jsx
<Route path='/search' element={<SearchPage />} />   {/* 정적 경로 먼저 */}
<Route path='/:category' element={<CategoryPage />} />
...
```

---

### 3-4. `search-page.jsx` — EmptyState 메시지와 inputValue 사이의 250ms 불일치

**위치**: line 150

```jsx
{showEmpty && <SearchEmptyState query={urlQuery} />}
```

사용자가 "zzzz"를 지워 빈 값을 만들 때:
- `inputValue`는 즉시 `""`가 되어 SearchBar는 비어 보임
- `urlQuery`는 250ms 뒤에 `""`가 되어 그 사이 EmptyState는 `"'zzzz'에 대한 결과가 없습니다"`를 표시

단순히 `handleClear`(×, ESC)가 아닌 키보드로 직접 지우는 경우에만 발생하는 250ms 범위의 시각적 불일치다. 기능적 영향은 없다.

---

## 4. 성능 관점

### 잘된 점

| 항목 | 평가 |
|---|---|
| `buildSearchIndex()` `Promise.all` 병렬 로딩 | ✅ 파일 수에 선형으로 확장 |
| 모듈 스코프 `_searchIndexCache` | ✅ 페이지 재진입 시 재파싱 없음 |
| Vite 동적 import 브라우저 캐시 | ✅ `getAllDocs`와 `buildSearchIndex` 중복 I/O 없음 |
| `useMemo` for results | ✅ `urlQuery` · `fuse` 변경 시만 Fuse 검색 재실행 |
| `useCallback` for handlers | ✅ `setSearchParams` 의존성 최소화 |
| React 18 자동 배치 | ✅ `setFuse`, `setTagFuse`, `setIndexing` 단일 렌더 처리 |

### 향후 고려사항

**Fuse.js 번들 분리 (문서 50개 이상 시 검토)**

현재 Fuse.js가 메인 번들에 포함되어 gzip 304KB 청크가 모든 페이지에서 로드된다. SearchPage는 대부분의 사용자가 홈에서 들어오는 시작점이 아니므로, React `lazy()` + `Suspense`로 동적 import하면 초기 로드 번들에서 Fuse.js를 분리할 수 있다.

```jsx
// App.jsx
const SearchPage = lazy(() => import('@/pages/search-page'));
```

현재 문서 수에서는 선택적이지만, 콘텐츠 확충 후 번들 최적화 시 우선 대상이다.

**`ignoreLocation: true`의 트레이드오프**

`ignoreLocation: true`는 문자열 위치와 무관하게 매칭을 허용해 본문(body) 검색의 재현율을 높인다. 반면 성능은 위치 기반 매칭보다 낮다. 현재 문서 수에서는 체감 차이 없지만, body 필드가 긴 문서(2000자 이상)가 100개 이상 누적되면 체감 지연이 생길 수 있다.

---

## 5. 접근성 관점

### 잘된 점

| 항목 | 평가 |
|---|---|
| SearchBar `aria-label="문서 검색"` (input에 직접 적용) | ✅ |
| × 버튼 `aria-label="검색어 초기화"` | ✅ |
| SearchBar ESC 키 핸들링 | ✅ |
| 카테고리 이모지 `aria-hidden="true"` | ✅ |
| 결과 목록 `<ul role="list" aria-label="검색 결과">` | ✅ |
| 결과 카드 `focus-visible` outline | ✅ |
| `autoFocus` 페이지 진입 시 즉각 검색 가능 | ✅ |

### 보완 필요 항목

| 항목 | 우선순위 |
|---|---|
| `SearchBar` 컨테이너 `role="search"` 누락 | Medium |
| 검색 결과 변경 `aria-live="polite"` 공지 없음 | Medium |
| `SearchResultCard` 링크 텍스트 장황 (StatusBadge + 섹션 레이블 포함) | Low |

---

## 6. Stage 6 진입 전 수정 권장 사항 — 모두 완료 ✅

| 우선순위 | 파일 | 항목 | 상태 |
|---|---|---|---|
| ★★★ | `use-search-index.js` | `.catch()` 에러 핸들링 + `indexError` 상태 반환 | ✅ 완료 |
| ★★★ | `search-page.jsx` | `typingValue` 파생 상태 패턴으로 히스토리 동기화 (effect 없음) | ✅ 완료 |
| ★★☆ | `SearchBar.jsx` | 최상위 Box에 `role='search'` 추가 | ✅ 완료 |
| ★★☆ | `search-page.jsx` | 결과 요약 영역 `role='status' aria-live='polite' aria-atomic='true'` 추가 | ✅ 완료 |
| ★☆☆ | `use-search-index.js` | `TAG_FUSE_OPTIONS`에 `includeMatches: true` 추가 | ✅ 완료 |

---

## 수정 이력

| 날짜 | 수정 항목 | 상태 |
|---|---|---|
| 2026-06-04 | `use-search-index.js` `.catch()` + `indexError` + `TAG_FUSE_OPTIONS includeMatches` | ✅ 완료 |
| 2026-06-04 | `search-page.jsx` `typingValue` 파생 상태 패턴 (히스토리 동기화) | ✅ 완료 |
| 2026-06-04 | `search-page.jsx` `aria-live` 결과 공지 영역 + `indexError` UI | ✅ 완료 |
| 2026-06-04 | `SearchBar.jsx` `role="search"` 추가 | ✅ 완료 |
