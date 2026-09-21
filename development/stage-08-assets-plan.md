# Stage 8-A — 캐릭터 이미지 준비

> Stage 8-B(코드 구현) 착수 전 반드시 완료해야 하는 이미지 준비 단계.  
> 이 문서의 모든 항목이 충족되기 전까지 Stage 8-B를 시작하지 않는다.

---

## 1. 필요한 캐릭터 이미지 목록

| 파일명 | 저장 경로 | 우선순위 |
|---|---|---|
| `winter-wave.png` | `src/assets/characters/winter-wave.png` | 필수 |
| `winter-study.png` | `src/assets/characters/winter-study.png` | 필수 |
| `winter-thinking.png` | `src/assets/characters/winter-thinking.png` | 필수 |
| `winter-error.png` | `src/assets/characters/winter-error.png` | 필수 |

4개 모두 필수. 하나라도 누락되면 빌드가 실패한다.

---

## 2. 각 이미지 사용 위치

| 파일명 | 사용 페이지 | 컴포넌트 파일 |
|---|---|---|
| `winter-wave.png` | Home (`/`) — Hero 섹션 우측 | `src/pages/home-page.jsx` |
| `winter-study.png` | About (`/about`) — 메인 비주얼 | `src/pages/about-page.jsx` (신규) |
| `winter-thinking.png` | Search (`/search`) — Empty State | `src/components/ui/SearchEmptyState.jsx` |
| `winter-error.png` | 404 (`*`) — 오류 안내 | `src/pages/not-found-page.jsx` |

---

## 3. 각 이미지 컨셉

### `winter-wave.png` — Home Hero
- **상황**: 방문자를 처음 맞이하는 첫인상 장면
- **포즈**: 손을 흔들며 인사하는 모습 (wave / 환영)
- **분위기**: 밝고 친근함, 기대감
- **배치 맥락**: Hero 텍스트("Winter Dev Archive") 우측에 나란히 표시

### `winter-study.png` — About 페이지
- **상황**: 자기 소개 페이지의 주인공
- **포즈**: 앉아서 공부하거나 책을 읽는 모습
- **분위기**: 집중, 성실, 학습
- **배치 맥락**: 소개 텍스트 위 중앙에 크게 표시 (가장 큰 사이즈 사용)

### `winter-thinking.png` — SearchEmptyState
- **상황**: 아직 검색어를 입력하지 않았거나 결과가 없는 상태
- **포즈**: 턱을 괴거나 고민하는 모습 (thinking / wondering)
- **분위기**: 가볍고 유머러스, 부담 없음
- **배치 맥락**: "검색어를 입력해..." 텍스트 위, 작은 사이즈로 표시

### `winter-error.png` — 404 페이지
- **상황**: 잘못된 경로에 도달한 오류 상황
- **포즈**: 당황하거나 헤매는 모습 (confused / lost)
- **분위기**: 유머러스, 귀여운 당황함, 친근한 오류 안내
- **배치 맥락**: "404" 숫자 텍스트 위에 표시

---

## 4. 이미지 규격

### 포맷

| 항목 | 기준 |
|---|---|
| 파일 포맷 | **PNG** (PNG-24, 알파채널 포함) |
| 배경 | **완전 투명** (alpha = 0) — 라이트/다크 모드 모두 자연스럽게 합성 |
| 색상 모드 | RGB |

### 권장 크기 (원본 제작 기준)

| 파일명 | CSS 최대 표시 크기 | 원본 권장 해상도 | 비율 |
|---|---|---|---|
| `winter-wave.png` | 160px | **400×500px** 이상 | 세로형 |
| `winter-study.png` | 200px | **400×500px** 이상 | 세로형 |
| `winter-thinking.png` | 80px | **200×250px** 이상 | 세로형 |
| `winter-error.png` | 120px | **300×375px** 이상 | 세로형 |

> Retina(2x) 대응 원칙: 원본을 CSS 표시 크기의 **2배 이상** 해상도로 제작하면  
> 별도 `@2x` 파일 없이 단일 파일로 고해상도 디스플레이까지 대응된다.

### 최소 크기

원본 이미지가 최소 크기 미만이면 확대 시 픽셀이 깨진다.

| 파일명 | 최소 원본 해상도 |
|---|---|
| `winter-wave.png` | 320×400px |
| `winter-study.png` | 400×500px |
| `winter-thinking.png` | 160×200px |
| `winter-error.png` | 240×300px |

### 파일 용량 권장

| 항목 | 기준 |
|---|---|
| 권장 | 이미지당 **150KB 이하** |
| 허용 최대 | 이미지당 **300KB 이하** |
| 최적화 도구 | [TinyPNG](https://tinypng.com), [Squoosh](https://squoosh.app) 등 사용 권장 |

용량이 클수록 GitHub Pages 첫 로드 시 지연이 발생한다.  
PNG 최적화 도구로 압축 후 저장할 것을 권장한다.

### 다크모드 대응을 위한 캐릭터 색상 주의사항

CSS 처리 없이 라이트/다크 모드 양쪽에서 잘 보이려면:

| 항목 | 권장 |
|---|---|
| 캐릭터 외곽선 | 중간~어두운 색상 (흰색/매우 밝은 색 금지) |
| 내부 채색 | 중간 채도 — 라이트 배경(`#FAF8F5`)과 다크 배경(`#1C182C`) 모두에서 선명해야 함 |
| 흰색 요소 | 흰색만 단독으로 사용 시 라이트 배경에서 보이지 않음 → 외곽선 추가 필요 |

---

## 5. 저장 경로

```
프로젝트 루트
└── src/
     └── assets/
          └── characters/          ← 이 디렉토리를 신규 생성
               ├── winter-wave.png
               ├── winter-study.png
               ├── winter-thinking.png
               └── winter-error.png
```

**디렉토리 생성**: `src/assets/characters/` 폴더를 먼저 만들고 이미지를 배치한다.  
(코드에서 `@/assets/characters/winter-wave.png` 형태로 import)

---

## 6. 파일명 규칙

| 규칙 | 예시 |
|---|---|
| 접두사 `winter-` 고정 | `winter-wave.png` ✅ / `wave.png` ❌ |
| 소문자 kebab-case | `winter-wave.png` ✅ / `Winter_Wave.PNG` ❌ |
| 상황을 표현하는 단어 | `winter-wave`, `winter-study`, `winter-thinking`, `winter-error` |
| 확장자 `.png` 고정 | `.png` ✅ / `.webp`, `.jpg` ❌ |

**향후 이미지 추가 시 동일 규칙 적용 예시**:
- `winter-celebration.png` (달성/축하)
- `winter-sleep.png` (준비 중 섹션)

---

## 7. 이미지가 없을 때 코드 구현을 보류해야 하는 이유

Vite는 빌드 시 `import` 문으로 선언된 모든 파일의 존재를 검증한다.

```jsx
// 이 코드가 존재하는데 파일이 없으면 → 빌드 실패
import winterWaveImg from '@/assets/characters/winter-wave.png';
```

**발생하는 오류**:
```
[vite] Cannot find module '@/assets/characters/winter-wave.png'
```

**결과**: `npm run build` 실패 → GitHub Pages 배포 불가.

**개발 서버(`npm run dev`)에서도 동일하게 실패**하므로, 이미지 없이 import 코드를 먼저 작성하면 로컬 개발 환경조차 동작하지 않는다.

---

## 8. 이미지 준비 완료 후 Stage 8-B에서 수정할 파일 목록

이미지 4개가 모두 `src/assets/characters/`에 배치된 이후에만 아래 파일을 수정한다.

### 수정 대상 파일 (4개)

| 파일 | 변경 내용 |
|---|---|
| `src/App.jsx` | `/about` 라우트 1줄 추가 + `AboutPage` import |
| `src/pages/home-page.jsx` | `heroImg` import 경로를 `@/assets/characters/winter-wave.png`로 교체 |
| `src/pages/not-found-page.jsx` | `winter-error.png` import 및 이미지 렌더링 추가 |
| `src/components/ui/SearchEmptyState.jsx` | `winter-thinking.png` import 및 이미지 렌더링 추가 |

### 신규 생성 파일 (1개)

| 파일 | 내용 |
|---|---|
| `src/pages/about-page.jsx` | `/about` 라우트 컴포넌트, `winter-study.png` 메인 비주얼 |

---

## Stage 8-A 완료 체크리스트

Stage 8-B 착수 전 아래 항목을 모두 확인한다.

```
□ src/assets/characters/ 디렉토리 생성 완료
□ winter-wave.png 배치 완료 (투명 배경, 400×500px 이상)
□ winter-study.png 배치 완료 (투명 배경, 400×500px 이상)
□ winter-thinking.png 배치 완료 (투명 배경, 200×250px 이상)
□ winter-error.png 배치 완료 (투명 배경, 300×375px 이상)
□ 각 파일 용량 150KB 이하 확인
□ 파일명 규칙(winter-*.png, 소문자 kebab-case) 확인
```

모든 항목 체크 완료 후 "Stage 8-B 구현 시작" 요청.
