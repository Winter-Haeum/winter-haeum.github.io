# Stage 4 코드 리뷰

> 검토 대상: `markdownLoader.js` · `MarkdownRenderer.jsx` · `Callout.jsx` · `CodeBlock.jsx` · `StatusBadge.jsx` · `doc-page.jsx` · `section-page.jsx`  
> 기준: 기능 정확성 · 성능 · 접근성 · 유지보수성 · 디자인 시스템 일관성

---

## 수정 이력

| 날짜 | 수정 항목 | 상태 |
|---|---|---|
| 2026-06-03 | `markdownLoader.getAllDocs` 직렬 → 병렬 로딩 전환 | ✅ 완료 |
| 2026-06-03 | `CodeBlock` setTimeout cleanup 추가 | ✅ 완료 |
| 2026-06-03 | 카테고리 뱃지 링크 → `CategoryBadgeLink.jsx` 추출 | ✅ 완료 |

---

## 요약

| 파일 | 평가 | 주요 사항 |
|---|---|---|
| `markdownLoader.js` | 양호 ⚠️ | 직렬 로딩 성능 이슈 있음 |
| `MarkdownRenderer.jsx` | 양호 | 구조 안정적, 다크모드 대비 필요 |
| `Callout.jsx` | 양호 | 이모지 판별 로직 정확, 다크모드 대비 필요 |
| `CodeBlock.jsx` | 양호 ⚠️ | setTimeout 메모리 누수 가능성 |
| `StatusBadge.jsx` | 양호 | 코드 품질 우수 |
| `doc-page.jsx` | 양호 | loadedKey 패턴 적절 |
| `section-page.jsx` | 양호 ⚠️ | 성능 이슈 + 코드 중복 |

---

## 1. markdownLoader.js

### 잘된 점

- Vite 8 glob 문법(`{ query: '?raw', import: 'default' }`) 정확하게 사용
- `_templates` 제외 패턴이 glob 배열 레벨에서 처리됨 — 런타임 필터보다 안전
- `getDoc` · `getSectionIndex`는 단일 파일만 로드해 효율적
- JSDoc 타입 주석이 명확

### 수정 권장

**[성능] `getAllDocs`의 직렬 로딩 — Stage 5 전 수정 권장**

```js
// 현재: for...of + await 로 파일을 하나씩 순차 로드
for (const [path, load] of Object.entries(_modules)) {
  const raw = await load();  // ← 직렬
  ...
}

// 개선 방향: Promise.all로 병렬 로드
const entries = Object.entries(_modules);
const results = await Promise.all(
  entries.map(async ([path, load]) => {
    const parsed = _parsePath(path);
    if (!parsed) return null;
    const raw = await load();
    const { frontmatter } = _parseRaw(raw);
    return { ...parsed, path, frontmatter };
  })
);
return results.filter(Boolean);
```

콘텐츠가 50개만 돼도 직렬 로딩은 체감 지연을 만든다. 검색 기능(Stage 5)이 `getAllDocs`를 호출하는 시점에 이 문제가 더 커진다.

**[성능] `getSectionDocs`가 `getAllDocs` 전체를 호출**

```js
// 현재: 전체 문서를 로드 후 필터
export async function getSectionDocs(category, section) {
  const all = await getAllDocs();  // ← 모든 파일 로드
  return all.filter(...);
}
```

SectionPage가 로드될 때마다 전체 `content/` 를 스캔한다. 문서 수가 늘어날수록 SectionPage 초기 로딩이 느려진다. `getSectionDocs`도 `getSectionIndex`처럼 경로를 직접 구성해 해당 섹션 파일만 로드하는 방향을 검토한다.

### 참고 사항

**`_parsePath`의 3-depth 고정**  
현재 구조(`category/section/slug`)에서는 문제 없음. 향후 `coding-test/`처럼 섹션이 없는 2-depth 파일을 추가할 경우 `null`을 반환해 조용히 건너뜀. 콘텐츠 확장 시 이 점 인식 필요.

---

## 2. MarkdownRenderer.jsx

### 잘된 점

- `markdownComponents` · `rehypePlugins` · `remarkPlugins`를 컴포넌트 바깥 모듈 스코프에 선언 — 렌더링마다 객체 재생성 없음
- `ignoreMissing: true`로 알 수 없는 언어의 코드 블록을 조용히 처리
- 인라인 코드 vs 블록 코드 분기 로직이 명확
- `maxWidth: '65ch'` 본문 너비 제한 올바르게 적용

### 수정 권장

**[유지보수] 표 컴포넌트 색상 하드코딩**

```jsx
// 현재: 모든 표 관련 색상이 raw HEX
thead: ({ children }) => (
  <Box component='thead' sx={{ backgroundColor: '#F2EDE6' }}>  // ← 하드코딩
```

`th`, `td`, `tr`, `thead` 4개 컴포넌트 모두 `#F2EDE6`, `#2C2840`, `#DDD5C8`이 직접 기입되어 있다. 다크모드(Stage 6) 추가 시 이 위치들을 모두 수정해야 한다. Callout, CodeBlock도 동일한 이슈를 가진다. Stage 6에서 일괄 대응하더라도 미리 인식해두어야 한다.

### 참고 사항

**`React.Children.toArray` 사용 위치 (pre 컴포넌트)**  
`React.Children.toArray`는 children에 key를 재할당한다. 현재 사용처(`pre` 컴포넌트에서 `codeEl` 추출)에서는 key가 문제가 되지 않지만, `Array.isArray(children) ? children[0] : children` 패턴이 더 가볍다. 동작상 차이는 없다.

**`img` 컴포넌트 미구현**  
이미지를 포함한 문서 추가 시 기본 브라우저 `<img>` 스타일이 적용된다. Stage 4 콘텐츠에는 이미지가 없으므로 문제없으나, 콘텐츠 작성 시 인식 필요.

**`a` 링크 - 내부 링크 처리**  
현재 `<MuiLink href={href}>` 는 내부 링크(`./step-2-settings`)도 `<a href>` 방식으로 처리한다. SPA에서 full page reload가 발생한다. 콘텐츠량이 늘어나면 react-router의 `Link`로 교체를 검토한다.

---

## 3. Callout.jsx

### 잘된 점

- `Array.from(text)[0]`으로 첫 코드포인트를 추출 — `⚠️`(U+26A0 + variation selector) 처리가 정확
- 주석으로 인코딩 이유를 설명 — 유지보수 시 혼란 방지
- `getPlainText` 재귀 함수가 React 노드 트리를 안전하게 순회
- `role='note'` 접근성 속성 포함

### 수정 권장

**[접근성] 모든 유형에 `role='note'` 고정**

설계 문서(`05-design-system.md`)는 "유형에 따라 `role='note'` 또는 `role='alert'` 사용"을 명시한다.

```jsx
// 현재: 모든 유형에 동일 role
<Box role='note' ...>

// 개선 방향: caution 유형에 role='alert' 적용
const role = (type === 'caution') ? 'alert' : 'note';
<Box role={role} ...>
```

`caution`은 주의 경고 성격이므로 스크린 리더에서 `role='alert'`가 더 적합하다.

### 참고 사항

**`note`와 `concept`이 동일한 색상**  
`CALLOUT_CONFIG`에서 `note`와 `concept`는 `bar: '#BCA4EC'`, `bg: '#F4F0FC'`로 동일하다. 이모지 없는 일반 blockquote와 `💡 Concept` callout이 시각적으로 구분되지 않는다. 의도적 설계라면 현상 유지하되, 향후 `note` 색상을 별도로 정의하는 것을 검토할 수 있다.

**`'& p': { mb: 0 }` CSS 선택자**  
Callout 내부 `<p>` 태그의 하단 여백을 제거하는 용도인데, MUI의 emotion이 생성하는 클래스 명세에 의존한다. CSS 명시도 충돌이 발생할 경우 `'& .MuiTypography-root': { mb: 0 }`가 더 안전하다.

---

## 4. CodeBlock.jsx

### 잘된 점

- `codeRef.current.textContent`로 복사 — DOM에서 직접 추출해 hljs 마크업 없이 순수 코드 텍스트만 복사됨
- `maxHeight: '400px', overflowY: 'auto'` 조합이 짧은 블록에서는 스크롤 없이, 긴 블록에서는 자동 스크롤로 동작
- `prefers-reduced-motion` 처리 포함
- hljs 토큰 커버리지가 충분 (20개 이상)

### 수정 권장

**[메모리] `setTimeout` 미정리**

```js
// 현재: 타임아웃이 cleanup 없이 실행됨
const handleCopy = async () => {
  await navigator.clipboard.writeText(text);
  setCopied(true);
  setTimeout(() => setCopied(false), 1500);  // ← 정리 없음
};
```

컴포넌트가 언마운트된 뒤 1500ms 이내에 setState를 호출한다. React 18+에서는 경고가 억제됐지만 불필요한 실행이 남는다. `useCallback` + `useRef`로 타임아웃 ID를 저장하고 cleanup에서 `clearTimeout`을 호출하거나, `useEffect` 안에서 관리한다.

```js
// 개선 방향 예시
const timerRef = useRef(null);

const handleCopy = async () => {
  await navigator.clipboard.writeText(text);
  setCopied(true);
  clearTimeout(timerRef.current);
  timerRef.current = setTimeout(() => setCopied(false), 1500);
};

useEffect(() => () => clearTimeout(timerRef.current), []);
```

### 참고 사항

**코드 영역 aria 미지정**  
설계 문서는 `<code role="region" aria-label="코드 예제">`를 명시한다. 현재 구현에서 코드 본문 Box에는 role/label이 없다. 스크린 리더 접근성 개선이 필요한 경우 `role='region' aria-label='코드 예제'`를 pre Box에 추가한다.

**언어 표기 일관성**  
MarkdownRenderer의 `pre` 컴포넌트가 `language-plaintext` 같은 경우에도 그대로 `plaintext`를 표시한다. 설계 문서는 언어 없는 경우 `text`로 표기하도록 정의한다. 현재 구현에서 언어 미지정 시에만 `text`로 처리되고, `plaintext`는 그대로 노출된다. 콘텐츠 작성 시 인식 필요.

---

## 5. StatusBadge.jsx

### 잘된 점

- 컴포넌트가 자기완결적이고 단순함
- `STATUS_CONFIG[status] ?? STATUS_CONFIG['draft']` — 알 수 없는 status 값에 대한 안전한 fallback
- dot을 `aria-hidden='true'`로 처리 — 스크린 리더에서 불필요한 내용 전달 방지
- 설계 시스템의 4가지 상태 색상 토큰을 정확히 반영

### 참고 사항

**다크모드 색상 미지원**  
Stage 6에서 다크모드 추가 시, `STATUS_CONFIG`의 모든 색상에 다크 토큰을 대응시켜야 한다. 설계 문서(`05-design-system.md`)에 다크 색상이 이미 정의되어 있다.

**`py: '3px'` 단위 불일치**  
`py: '3px'`는 MUI spacing 단위가 아닌 CSS 직접 값이다. 프로젝트 내 다른 곳에서 MUI spacing 단위를 사용하는 것과 일관성이 다소 다르지만, 동작 자체는 정확하다. 향후 디자인 토큰을 theme으로 관리할 경우 정리 대상.

---

## 6. doc-page.jsx

### 잘된 점

- `loadedKey` 패턴이 `react-hooks/set-state-in-effect` 규칙을 준수하면서도 로딩 상태를 정확히 표현
- `active` 플래그로 언마운트 후 stale 상태 업데이트 방지
- effect cleanup(`return () => { active = false; }`) 포함
- 4단계 breadcrumb이 올바르게 구성됨

### 수정 권장

**[DX] 카테고리 뱃지 링크 코드 중복**

DocPage와 SectionPage 모두 동일한 카테고리 뱃지 링크(이모지 + 이름 → `/:category`)를 JSX로 직접 작성하고 있다. 두 파일에서 동일한 스타일과 로직이 반복된다.

```jsx
// doc-page.jsx 97–116행, section-page.jsx 76–95행 — 동일 코드
<Typography
  component={Link}
  to={`/${category.slug}`}
  sx={(theme) => ({ display: 'inline-flex', ... })}
>
  <Box component='span' aria-hidden='true'>{category.emoji}</Box>
  {category.name}
</Typography>
```

`components/ui/CategoryBadgeLink.jsx` 같은 작은 컴포넌트로 추출을 권장한다. Stage 5 이전에 정리하면 이후 페이지 추가 시 반복을 막는다.

### 참고 사항

**로딩 스켈레톤 레이아웃 불일치**  
스켈레톤(두 개의 직사각형)과 실제 렌더링(카테고리 뱃지 + H1 + StatusBadge + date)의 구조가 다르다. 빠른 로드 환경에서는 체감하기 어렵지만, 느린 네트워크에서는 레이아웃 시프트가 발생한다. 콘텐츠 배포 환경(GitHub Pages, 정적 번들)에서는 로드가 즉각적이므로 현재 단계에서는 큰 문제가 아니다.

**`if (!category || !sectionName)` 조기 반환 위치**  
현재 `useEffect` 정의 이후에 위치한다. ESLint rules-of-hooks 관점에서 hooks 호출 이후 조기 반환은 허용되지만, 일반적으로 hooks 이전에 조기 반환을 배치하는 패턴이 더 읽기 쉽다. 단, `useEffect`가 먼저 선언되어야 하는 경우 현재 위치가 불가피하다.

---

## 7. section-page.jsx

### 잘된 점

- `Promise.all`로 `getSectionIndex`와 `getSectionDocs`를 병렬 호출
- 문서 카드에 `description` 표시 + ellipsis 처리
- `flex: 1, minWidth: 0` 조합으로 긴 제목의 텍스트 overflow 올바르게 처리
- `getSectionDocs`가 없는 경우(빈 섹션)와 `index.md`만 있는 경우를 각각 다르게 처리

### 수정 권장

**[유지보수] `className='doc-arrow'` CSS 타깃팅**

```jsx
// 현재: className을 CSS 선택자로 사용
<ArrowForwardIcon className='doc-arrow' sx={...} />

// 부모에서: '& .doc-arrow': { color: ... }
```

MUI sx의 `'& .doc-arrow'`가 React className을 선택자로 사용하는 패턴은 MUI의 설계 의도와 다르다. MUI는 sx prop이나 테마를 통한 스타일링을 권장한다. 현재는 동작하지만 MUI 버전 업그레이드나 CSS-in-JS 방식 변경 시 취약하다.

개선 방향: `ArrowForwardIcon`에 직접 `sx` 제공 + 부모 hover 상태를 `group` 패턴 또는 별도 상태로 관리.

### 참고 사항

**aria-label 불일치**  
문서가 없는 경우의 `<Box component='section' aria-label='문서 목록'>` 안에 "문서 준비 중" 텍스트가 들어간다. 실제 내용과 aria-label이 일치하지 않는다. "문서 없음" 또는 aria-label 제거가 더 정확하다.

**문서 카드 정렬 순서**  
`getSectionDocs`가 Vite glob 탐색 순서(알파벳)로 문서를 반환한다. 현재 numbered prefix(`step-1-env`, `step-2-settings`) 파일명 덕분에 의도한 순서와 일치하지만, 숫자 없는 문서를 추가하면 순서가 보장되지 않는다. frontmatter의 `date` 또는 별도 `order` 필드로 정렬하는 것을 향후 검토한다.

---

## 총평

Stage 4의 핵심 파이프라인(`markdownLoader → MarkdownRenderer → DocPage/SectionPage`)은 정확하게 동작하며 설계 의도를 잘 반영하고 있다. 이모지 기반 Callout 판별, rehype-highlight 토큰 CSS 연동, loadedKey 패턴 모두 Stage 4 범위에서 적절한 수준의 구현이다.

**Stage 5 진행 전 수정 권장 항목 — 모두 완료 ✅**

| 우선순위 | 파일 | 항목 | 상태 |
|---|---|---|---|
| 1 | `markdownLoader.js` | `getAllDocs` 병렬 로딩 전환 | ✅ 완료 |
| 2 | `CodeBlock.jsx` | `setTimeout` cleanup 추가 | ✅ 완료 |
| 3 | `CategoryBadgeLink.jsx` 신규 | 카테고리 뱃지 링크 공통 컴포넌트 추출 | ✅ 완료 |

**Stage 6(다크모드) 전 일괄 대응 필요 항목**

- `Callout.jsx` 하드코딩 색상 → 다크 토큰 대응
- `CodeBlock.jsx` hljs 토큰 색상 → 다크 토큰 대응
- `StatusBadge.jsx` 색상 → 다크 토큰 대응
- `MarkdownRenderer.jsx` 표 색상 → 다크 토큰 대응
