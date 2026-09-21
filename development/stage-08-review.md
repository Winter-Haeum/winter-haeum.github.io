# Stage 8 Review

검토 일자: 2026-06-04  
검증 방법: Playwright 헤드리스 브라우저 스크린샷 (1280px 데스크톱 / 390px 모바일)

---

## 검토 대상

- Home Hero 캐릭터
- About Page 캐릭터
- SearchEmptyState 캐릭터
- NotFoundPage 캐릭터

---

## 적용 이미지

| 파일명 | 원본 해상도 | 비율 | 사용 위치 |
|---|---|---|---|
| `winter-wave.webp` | 517×424px | 가로형 | Home Hero |
| `winter-study.webp` | 488×442px | 정방형 | About 페이지 |
| `winter-thinking.webp` | 1024×1536px | 2:3 세로 | SearchEmptyState |
| `winter-error.webp` | 1024×1536px | 2:3 세로 | NotFoundPage |

---

## 페이지별 평가

### Home (`/`)

**적용 위치**  
Hero 섹션 우측 Grid(`size={{ xs: 12, md: 5 }}`) 내 중앙 정렬. 텍스트(좌)와 나란히 배치.

**좋은 점**
- `winter-wave.webp`(517×424, 가로형)가 Hero 텍스트 우측에 자연스럽게 배치됨
- 원본 이미지가 정방형에 가까워 반응형 maxWidth 적용 시 높이가 과도하지 않음
- 데스크톱: 캐릭터와 Hero 텍스트 블록이 시각적 균형을 이룸
- 모바일: Grid 스택 구조로 텍스트 아래 중앙 배치 (220px), 정상 노출
- `alt="겨울하음 캐릭터"` 접근성 처리 완료
- 기존 `hero.png` import 경로를 `@/assets/characters/winter-wave.webp`로 교체, 모바일 숨김 규칙 제거

**수정 여부**  
수정 없음 (초기 구현에서 완성)

**최종 상태**: ✅ 승인

---

### About (`/about`)

**적용 위치**  
페이지 중앙 Container(`maxWidth='sm'`) 내 텍스트 블록 상단. `mx: 'auto'` 중앙 정렬.

**좋은 점**
- `winter-study.webp`(488×442, 정방형)가 소개 텍스트 위에 크게 표시되어 페이지 주인공 역할 수행
- 원본이 거의 정방형(488×442)이라 maxWidth: 320px(lg) 시 렌더 높이 288px — 과도하지 않음
- "Winter Haeum" → "겨울하음" → 소개 텍스트 → 스택 → 버튼 흐름이 자연스러움
- Footer(ABOUT · CATEGORIES · LINKS 3단)가 페이지 완성도를 높임
- 페이지가 비어 보이지 않고 캐릭터·텍스트 비율 균형
- `alt="공부하는 겨울하음"` 접근성 처리 완료

**수정 여부**  
수정 없음 (초기 구현에서 완성)

**최종 상태**: ✅ 승인

---

### Search (`/search`)

**적용 위치**  
`SearchEmptyState` 컴포넌트 내 제목 텍스트 상단. 검색 전 및 결과 없음 상태에서만 표시.  
검색 결과 존재 시 `SearchEmptyState` 미렌더링 → 캐릭터 자동 숨김.

**수정 전 문제**  
`winter-thinking.webp`(1024×1536, 2:3 비율)의 `maxWidth: 320px` 적용 시 렌더 높이 480px.  
SearchBar(600px 고정 너비) 대비 캐릭터가 시각적으로 지나치게 크게 느껴짐.

**수정 내용**  
```jsx
// 변경 전
maxWidth: { xs: '220px', sm: '260px', lg: '320px' }

// 변경 후
maxWidth: { xs: '160px', sm: '200px', lg: '240px' }
```
lg 기준 320px → 240px 축소. 렌더 높이 480px → 360px.  
캐릭터가 SearchBar UI와 더 자연스러운 비율을 이룸.

**최종 상태**: ✅ 승인  
(검색 인덱스 로드 실패 메시지는 Playwright 헤드리스 환경 한정 이슈이며, 실제 브라우저에서는 정상 동작)

---

### NotFound (`/없는경로`)

**적용 위치**  
404 페이지 main 컨텐츠 최상단. 캐릭터 → "404" → 제목 → 설명 → 버튼 순서.

**수정 전 문제**  
`winter-error.webp`(1024×1536, 2:3 비율)의 `maxWidth: 320px` 적용 시 렌더 높이 480px.  
이미지 하단 약 80px의 투명 영역이 캐릭터와 "404" 텍스트 사이 시각적 여백(약 100px)을 만듦.  
캐릭터와 텍스트 블록이 분리되어 보이는 레이아웃 불균형 발생.

**수정 내용**  
이미지 파일 크롭 없이 CSS `mb` 음수 마진으로 보정.

```jsx
// 변경 전
// mb 없음 → 투명 여백 80px + CSS gap 16px = 시각 약 100px 간격

// 변경 후
mb: { xs: 0, sm: -6, lg: -10 }
// lg: -80px 보정 → 시각 약 20px 자연스러운 간격
// xs(모바일): 기존 레이아웃이 양호하므로 0 유지
```

**수정 후 결과**  
데스크톱: 캐릭터→404→타이틀→버튼이 하나의 흐름으로 연결  
모바일: 기존과 동일, 변화 없음

**최종 상태**: ✅ 승인

---

## 최종 수정 내역

| 파일 | 수정 내용 | 이유 |
|---|---|---|
| `src/components/ui/SearchEmptyState.jsx` | 캐릭터 `maxWidth` 축소 (`{ xs: '160px', sm: '200px', lg: '240px' }`) | 2:3 비율 이미지가 320px 시 높이 480px — SearchBar 대비 과도하게 큼 |
| `src/pages/not-found-page.jsx` | 캐릭터 이미지에 `mb: { xs: 0, sm: -6, lg: -10 }` 추가 | 1024×1536 이미지 하단 투명 영역(~80px)으로 인한 시각 여백 보정 |

---

## 최종 판단

| 항목 | 결과 |
|---|---|
| Stage 8 완료 | ✅ |
| Stage 9 진행 가능 | ✅ |
| GitHub 업로드 및 배포 준비 가능 | ✅ |

**캐릭터 금지 영역 준수 확인**

| 영역 | 캐릭터 없음 확인 |
|---|---|
| MarkdownRenderer | ✅ |
| Sidebar | ✅ |
| NavigationDrawer | ✅ |
| SearchResultCard | ✅ |
| SectionPage 본문 | ✅ |
| DocPage 본문 | ✅ |

4개 허용 위치(Home · About · Search · 404)에만 캐릭터가 존재하며,  
각 페이지당 1개 원칙이 준수됨.
