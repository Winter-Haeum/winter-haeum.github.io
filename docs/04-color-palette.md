# 04. Color Palette

## 브랜드 컨셉

> **"크림 노트에 보라 잉크로 필기한 디지털 참고서"**

오래 곁에 두고 싶은 책처럼, 눈이 피로하지 않고 장시간 읽어도 포근한 색감.  
다꾸(다이어리 꾸미기)의 따뜻하고 개인적인 감성을 디지털 레이아웃에 담는다.

**설계 방향**

- 배경은 순백이 아닌 **따뜻한 크림화이트** — 종이 질감을 연상시키는 온기
- 포인트는 **더스티 바이올렛** — 형광이 아닌 잉크처럼 스며드는 차분한 보라
- 텍스트는 순검정이 아닌 **퍼플 언더톤 다크** — 눈의 피로를 줄이고 통일감을 더함
- 상태 색상도 **보라/라벤더/모브** 계열로 통일 — 팔레트 전체가 하나의 톤으로 읽힘
- 다크 모드는 **딥 퍼플 잉크** — 밤에 필기한 노트처럼 깊고 조용한 배경

---

## 핵심 컬러 시스템

### Light Mode

#### Base — 배경 · 표면

| 토큰 | HEX | 용도 |
|---|---|---|
| `cream-50` | `#FAF8F5` | 페이지 전체 배경 |
| `cream-100` | `#F2EDE6` | 카드, 사이드바 배경 |
| `cream-200` | `#EAE3D8` | 호버, 중첩 카드 |
| `cream-300` | `#DDD5C8` | 구분선, 테두리 |

#### Ink — 텍스트 (퍼플 언더톤)

| 토큰 | HEX | 용도 |
|---|---|---|
| `ink-900` | `#2C2840` | 본문, 제목 (주요 텍스트) |
| `ink-700` | `#4A4560` | 부제목, 설명 |
| `ink-500` | `#7A7490` | 캡션, 날짜 |
| `ink-300` | `#B8B2C8` | Placeholder, 비활성 |

#### Violet — 포인트 컬러 ★

| 토큰 | HEX | 용도 |
|---|---|---|
| `violet-700` | `#5E3EA8` | 버튼 active, 강한 강조 |
| `violet-500` | `#8464C8` | **기본 포인트 컬러** (링크, 버튼, 활성 상태) |
| `violet-400` | `#A080DC` | 호버 |
| `violet-300` | `#BCA4EC` | 라벤더 장식 |
| `violet-200` | `#D4C8F4` | 연한 라벤더 |
| `violet-100` | `#EDE8FA` | 태그 배경, 미묘한 강조 |
| `violet-50`  | `#F6F3FE` | 섹션 하이라이트 배경 |

---

### Dark Mode

#### Base — 배경 · 표면

| 토큰 | HEX | 용도 |
|---|---|---|
| `dark-bg` | `#1C182C` | 페이지 전체 배경 (딥 퍼플 잉크) |
| `dark-surface` | `#24203A` | 카드, 사이드바 배경 |
| `dark-elevated` | `#2E2A48` | 호버, 중첩 카드 |
| `dark-border` | `#3C3858` | 구분선, 테두리 |

#### Text — 텍스트

| 토큰 | HEX | 용도 |
|---|---|---|
| `dark-text-primary` | `#F0EBE3` | 본문, 제목 (따뜻한 크림화이트) |
| `dark-text-secondary` | `#C4BCCE` | 부제목, 설명 |
| `dark-text-muted` | `#8880A0` | 캡션, 날짜 |
| `dark-text-disabled` | `#5C5878` | 비활성, Placeholder |

#### Violet — 포인트 컬러 (다크 모드 전용)

| 토큰 | HEX | 용도 |
|---|---|---|
| `dark-violet-500` | `#B39EDD` | 기본 포인트 컬러 |
| `dark-violet-400` | `#C8B8F0` | 호버 |
| `dark-violet-100` | `#2A2544` | 태그 배경 |

---

## 색상 구조 시각화

```
─── Light Mode ────────────────────────────────────
배경 레이어 (바닥 → 위)
  #FAF8F5  cream-50    ← 페이지 배경
  #F2EDE6  cream-100   ← 카드 / 사이드바
  #EAE3D8  cream-200   ← 호버 / 중첩 카드
  #DDD5C8  cream-300   ← 구분선

포인트 컬러 (연함 → 진함)
  #F6F3FE  violet-50   ← 섹션 배경 tint
  #EDE8FA  violet-100  ← 태그 배경
  #D4C8F4  violet-200  ← 라벤더 장식
  #BCA4EC  violet-300  ← 연한 강조
  #A080DC  violet-400  ← 호버
  #8464C8  violet-500  ← 기본 포인트 ★
  #5E3EA8  violet-700  ← 진한 강조

텍스트 (연함 → 진함)
  #B8B2C8  ink-300  ← 비활성
  #7A7490  ink-500  ← 캡션
  #4A4560  ink-700  ← 서브
  #2C2840  ink-900  ← 본문

─── Dark Mode ────────────────────────────────────
배경 레이어
  #1C182C  dark-bg        ← 딥 퍼플 잉크
  #24203A  dark-surface   ← 카드
  #2E2A48  dark-elevated  ← 호버
  #3C3858  dark-border    ← 구분선

텍스트 (연함 → 진함)
  #5C5878  dark-text-disabled
  #8880A0  dark-text-muted
  #C4BCCE  dark-text-secondary
  #F0EBE3  dark-text-primary ← 크림 화이트
```

---

## 사용 위치

### 레이아웃 공통

| 요소 | Light Mode | Dark Mode |
|---|---|---|
| 페이지 배경 | `#FAF8F5` | `#1C182C` |
| 사이드바 배경 | `#F2EDE6` | `#24203A` |
| 상단 네비게이션 | `#FAF8F5` + border `#DDD5C8` | `#1C182C` + border `#3C3858` |
| 구분선 | `#DDD5C8` | `#3C3858` |
| 스크롤바 트랙 | `#EAE3D8` | `#2E2A48` |
| 스크롤바 thumb | `#A080DC` | `#B39EDD` |

### 타이포그래피

| 요소 | Light Mode | Dark Mode |
|---|---|---|
| H1 / H2 제목 | `#2C2840` | `#F0EBE3` |
| H3 / H4 소제목 | `#2C2840` | `#F0EBE3` |
| 본문 | `#2C2840` | `#F0EBE3` |
| 설명 / 부연 | `#4A4560` | `#C4BCCE` |
| 캡션 / 날짜 | `#7A7490` | `#8880A0` |
| 링크 (기본) | `#8464C8` | `#B39EDD` |
| 링크 (호버) | `#5E3EA8` | `#C8B8F0` |

### 네비게이션

| 요소 | Light Mode | Dark Mode |
|---|---|---|
| 사이드바 항목 | `#4A4560` | `#C4BCCE` |
| 현재 항목 텍스트 | `#8464C8` | `#B39EDD` |
| 현재 항목 배경 | `#EDE8FA` | `#2A2544` |
| 현재 항목 좌측 바 | `#8464C8` | `#B39EDD` |
| 호버 배경 | `#F6F3FE` | `#24203A` |

### 버튼

| 상태 | 배경 | 텍스트 |
|---|---|---|
| Primary 기본 | `#8464C8` | `#FAF8F5` |
| Primary 호버 | `#5E3EA8` | `#FAF8F5` |
| Secondary 기본 | `#EDE8FA` | `#8464C8` |
| Secondary 호버 | `#D4C8F4` | `#5E3EA8` |
| Ghost 기본 | transparent | `#8464C8` |
| Ghost 호버 | `#F6F3FE` | `#5E3EA8` |

### 태그 / 배지

모든 태그는 바이올렛 계열 단일 팔레트를 사용한다.  
카테고리 구분은 색상이 아닌 라벨 텍스트로 한다.

| 유형 | 배경 (Light) | 텍스트 (Light) | 배경 (Dark) | 텍스트 (Dark) |
|---|---|---|---|---|
| 기본 태그 | `#EDE8FA` | `#8464C8` | `#2A2544` | `#B39EDD` |
| 진한 태그 | `#D4C8F4` | `#5E3EA8` | `#3C3858` | `#C8B8F0` |
| 비활성 태그 | `#F2EDE6` | `#7A7490` | `#24203A` | `#8880A0` |

---

## 카드 색상

| 카드 유형 | 배경 (Light) | 테두리 (Light) |
|---|---|---|
| 기본 카드 | `#F2EDE6` | `#DDD5C8` |
| 하이라이트 카드 | `#F6F3FE` | `#BCA4EC` |
| 호버 상태 | `#EAE3D8` | `#BCA4EC` |
| 비활성 카드 | `#FAF8F5` | `#DDD5C8` |

| 카드 유형 | 배경 (Dark) | 테두리 (Dark) |
|---|---|---|
| 기본 카드 | `#24203A` | `#3C3858` |
| 하이라이트 카드 | `#2A2544` | `#5C5490` |
| 호버 상태 | `#2E2A48` | `#5C5490` |
| 비활성 카드 | `#1C182C` | `#3C3858` |

```css
/* Light Mode 기본 카드 */
.card {
  background: #F2EDE6;
  border: 1px solid #DDD5C8;
  border-radius: 12px;
  transition: background 0.2s, border-color 0.2s;
}
.card--highlight {
  background: #F6F3FE;
  border-color: #BCA4EC;
}
.card:hover {
  background: #EAE3D8;
  border-color: #BCA4EC;
}

/* Dark Mode */
[data-theme='dark'] .card {
  background: #24203A;
  border-color: #3C3858;
}
[data-theme='dark'] .card--highlight {
  background: #2A2544;
  border-color: #5C5490;
}
[data-theme='dark'] .card:hover {
  background: #2E2A48;
  border-color: #5C5490;
}
```

---

## 코드 블록 색상

크림 배경에 보라/라벤더 계열 신택스 하이라이팅.  
형광빛 다크 테마가 아닌, 참고서에 잉크로 밑줄 긋는 느낌.

### Light Mode 코드 블록

| 요소 | HEX | 설명 |
|---|---|---|
| 블록 배경 | `#EAE3D8` | cream-200 보다 살짝 따뜻하게 |
| 블록 테두리 | `#CEC8BC` | |
| 언어 라벨 배경 | `#DDD5C8` | |
| 언어 라벨 텍스트 | `#7A7490` | |

| 토큰 | HEX | 예시 |
|---|---|---|
| 기본 텍스트 | `#2C2840` | 일반 코드 |
| 주석 | `#B8B2C8` + italic | `// comment` |
| 키워드 | `#8464C8` | `const`, `return`, `if` |
| 문자열 | `#7A96C0` | `'hello'`, `"world"` |
| 숫자 | `#A87EB0` | `42`, `true`, `null` |
| 함수명 | `#9060B8` | `useState()`, `map()` |
| JSX / HTML 태그 | `#7080C8` | `<div>`, `<Button>` |
| 속성명 | `#A880C0` | `className=`, `onClick=` |
| 연산자 | `#4A4560` | `=`, `=>`, `&&` |

### Dark Mode 코드 블록

| 요소 | HEX | 설명 |
|---|---|---|
| 블록 배경 | `#16142A` | 페이지 배경보다 더 어둡게 |
| 블록 테두리 | `#3C3858` | |
| 언어 라벨 배경 | `#24203A` | |
| 언어 라벨 텍스트 | `#8880A0` | |

| 토큰 | HEX | 예시 |
|---|---|---|
| 기본 텍스트 | `#E8E4EE` | 일반 코드 |
| 주석 | `#6C6880` + italic | `// comment` |
| 키워드 | `#C8B4F0` | `const`, `return`, `if` |
| 문자열 | `#A8C4D8` | `'hello'`, `"world"` |
| 숫자 | `#D4A8CC` | `42`, `true`, `null` |
| 함수명 | `#B090D4` | `useState()`, `map()` |
| JSX / HTML 태그 | `#A4AADA` | `<div>`, `<Button>` |
| 속성명 | `#C8A4C4` | `className=`, `onClick=` |
| 연산자 | `#C4BCCE` | `=`, `=>`, `&&` |

```css
/* Light Mode */
.code-block {
  background: #EAE3D8;
  border: 1px solid #CEC8BC;
  border-radius: 8px;
  padding: 1.25rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
.token.keyword    { color: #8464C8; }
.token.string     { color: #7A96C0; }
.token.number     { color: #A87EB0; }
.token.function   { color: #9060B8; }
.token.comment    { color: #B8B2C8; font-style: italic; }
.token.tag        { color: #7080C8; }
.token.attr-name  { color: #A880C0; }
.token.operator   { color: #4A4560; }

/* Dark Mode */
[data-theme='dark'] .code-block {
  background: #16142A;
  border-color: #3C3858;
}
[data-theme='dark'] .token.keyword    { color: #C8B4F0; }
[data-theme='dark'] .token.string     { color: #A8C4D8; }
[data-theme='dark'] .token.number     { color: #D4A8CC; }
[data-theme='dark'] .token.function   { color: #B090D4; }
[data-theme='dark'] .token.comment    { color: #6C6880; font-style: italic; }
[data-theme='dark'] .token.tag        { color: #A4AADA; }
[data-theme='dark'] .token.attr-name  { color: #C8A4C4; }
```

---

## 상태 색상 (성공 / 경고 / 정보)

모든 상태 색상을 **보라/라벤더/모브/퍼플-블루** 계열로 통일한다.  
팔레트 전체가 하나의 톤으로 읽힌다.

### Tip (성공 / 도움말)

노트에 형광펜을 살짝 친 느낌. 차분한 라벤더-블루.

```
Light  배경: #EAEef8   테두리: #8898D8   아이콘: #6070C0   텍스트: #2A3060
Dark   배경: #20243C   테두리: #5060A8   아이콘: #A4AADA   텍스트: #C4CCEC
```

```md
> ✅ **Tip**: Flexbox는 1차원, Grid는 2차원 레이아웃에 사용한다.
```

### Caution (주의 / 경고)

중요 포인트를 표시하는 모브-라벤더.

```
Light  배경: #F0EAF8   테두리: #B090D4   아이콘: #8464C8   텍스트: #3A2060
Dark   배경: #281E3C   테두리: #7050A0   아이콘: #C8B4F0   텍스트: #E0D4F8
```

```md
> ⚠️ **주의**: `useEffect` 의존성 배열을 빠뜨리면 무한 루프가 발생한다.
```

### Danger (금지 / 오류)

부드러운 더스티 로즈 — 보라 팔레트 안에서 "위험"을 표현.

```
Light  배경: #F5E8F0   테두리: #C890B8   아이콘: #A85890   텍스트: #4A1840
Dark   배경: #2C1A2C   테두리: #8C5080   아이콘: #D4A8C4   텍스트: #EED4E8
```

```md
> 🚫 **금지**: 함수 컴포넌트 내부에서 훅을 조건문 안에 선언하지 않는다.
```

### Note (정보 / 참고)

차분한 라벤더 — 단순 참고 정보에 사용.

```
Light  배경: #F4F0FC   테두리: #BCA4EC   아이콘: #8464C8   텍스트: #2C2840
Dark   배경: #221E38   테두리: #6858A8   아이콘: #C8B4F0   텍스트: #E0D8F8
```

```md
> 💡 **Note**: 이 문법은 ES2020부터 지원된다.
```

### CSS 구현

```css
/* 공통 */
.callout {
  border-left: 4px solid;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
}

/* Light Mode */
.callout--tip {
  background: #EAEef8;
  border-color: #6070C0;
  color: #2A3060;
}
.callout--caution {
  background: #F0EAF8;
  border-color: #8464C8;
  color: #3A2060;
}
.callout--danger {
  background: #F5E8F0;
  border-color: #A85890;
  color: #4A1840;
}
.callout--note {
  background: #F4F0FC;
  border-color: #8464C8;
  color: #2C2840;
}

/* Dark Mode */
[data-theme='dark'] .callout--tip {
  background: #20243C;
  border-color: #5060A8;
  color: #C4CCEC;
}
[data-theme='dark'] .callout--caution {
  background: #281E3C;
  border-color: #7050A0;
  color: #E0D4F8;
}
[data-theme='dark'] .callout--danger {
  background: #2C1A2C;
  border-color: #8C5080;
  color: #EED4E8;
}
[data-theme='dark'] .callout--note {
  background: #221E38;
  border-color: #6858A8;
  color: #E0D8F8;
}
```

---

## MUI Theme 예제

```js
// theme.js
import { createTheme } from '@mui/material/styles';

const lightPalette = {
  mode: 'light',
  background: {
    default: '#FAF8F5',   // cream-50
    paper:   '#F2EDE6',   // cream-100
  },
  primary: {
    main:         '#8464C8',   // violet-500
    light:        '#A080DC',   // violet-400
    dark:         '#5E3EA8',   // violet-700
    contrastText: '#FAF8F5',
  },
  text: {
    primary:   '#2C2840',   // ink-900
    secondary: '#4A4560',   // ink-700
    disabled:  '#B8B2C8',   // ink-300
  },
  divider: '#DDD5C8',        // cream-300
  success: {
    main:  '#6070C0',
    light: '#EAEef8',
    contrastText: '#2A3060',
  },
  warning: {
    main:  '#8464C8',
    light: '#F0EAF8',
    contrastText: '#3A2060',
  },
  error: {
    main:  '#A85890',
    light: '#F5E8F0',
    contrastText: '#4A1840',
  },
  info: {
    main:  '#8464C8',
    light: '#F4F0FC',
    contrastText: '#2C2840',
  },
};

const darkPalette = {
  mode: 'dark',
  background: {
    default: '#1C182C',   // dark-bg
    paper:   '#24203A',   // dark-surface
  },
  primary: {
    main:         '#B39EDD',   // dark-violet-500
    light:        '#C8B8F0',   // dark-violet-400
    dark:         '#8464C8',   // violet-500 (same base)
    contrastText: '#1C182C',
  },
  text: {
    primary:   '#F0EBE3',   // 크림 화이트
    secondary: '#C4BCCE',
    disabled:  '#5C5878',
  },
  divider: '#3C3858',
  success: {
    main:  '#A4AADA',
    light: '#20243C',
    contrastText: '#C4CCEC',
  },
  warning: {
    main:  '#C8B4F0',
    light: '#281E3C',
    contrastText: '#E0D4F8',
  },
  error: {
    main:  '#D4A8C4',
    light: '#2C1A2C',
    contrastText: '#EED4E8',
  },
  info: {
    main:  '#C8B4F0',
    light: '#221E38',
    contrastText: '#E0D8F8',
  },
};

export const lightTheme = createTheme({ palette: lightPalette });
export const darkTheme  = createTheme({ palette: darkPalette });
```

---

## 컴포넌트 컬러 매핑

각 컴포넌트가 사용하는 색상 토큰을 한눈에 정리한 참조 표.  
토큰명은 위 팔레트 정의 기준이며, HEX는 Light Mode / Dark Mode 순으로 표기한다.

---

### Header

| 요소 | 속성 | Light Mode | Dark Mode |
|---|---|---|---|
| 컨테이너 | background | `cream-50` `#FAF8F5` | `dark-bg` `#1C182C` |
| 컨테이너 | border-bottom | `cream-300` `#DDD5C8` | `dark-border` `#3C3858` |
| 로고 텍스트 | color | `ink-900` `#2C2840` | `dark-text-primary` `#F0EBE3` |
| 로고 포인트 | color | `violet-500` `#8464C8` | `dark-violet-500` `#B39EDD` |
| 상단 링크 | color | `ink-700` `#4A4560` | `dark-text-secondary` `#C4BCCE` |
| 상단 링크 호버 | color | `violet-500` `#8464C8` | `dark-violet-500` `#B39EDD` |
| 다크모드 토글 아이콘 | color | `ink-500` `#7A7490` | `dark-text-muted` `#8880A0` |

---

### Sidebar

| 요소 | 속성 | Light Mode | Dark Mode |
|---|---|---|---|
| 컨테이너 | background | `cream-100` `#F2EDE6` | `dark-surface` `#24203A` |
| 컨테이너 | border-right | `cream-300` `#DDD5C8` | `dark-border` `#3C3858` |
| 카테고리 레이블 | color | `ink-500` `#7A7490` | `dark-text-muted` `#8880A0` |
| 메뉴 항목 기본 | color | `ink-700` `#4A4560` | `dark-text-secondary` `#C4BCCE` |
| 메뉴 항목 호버 | background | `violet-50` `#F6F3FE` | `dark-elevated` `#2E2A48` |
| 활성 항목 | background | `violet-100` `#EDE8FA` | `dark-violet-100` `#2A2544` |
| 활성 항목 | color | `violet-500` `#8464C8` | `dark-violet-500` `#B39EDD` |
| 활성 항목 좌측 바 | background | `violet-500` `#8464C8` | `dark-violet-500` `#B39EDD` |
| 구분선 | border | `cream-300` `#DDD5C8` | `dark-border` `#3C3858` |

---

### Navigation (Breadcrumb)

| 요소 | 속성 | Light Mode | Dark Mode |
|---|---|---|---|
| 컨테이너 | background | `cream-50` `#FAF8F5` | `dark-bg` `#1C182C` |
| 컨테이너 | border-bottom | `cream-300` `#DDD5C8` | `dark-border` `#3C3858` |
| 이전 경로 링크 | color | `ink-500` `#7A7490` | `dark-text-muted` `#8880A0` |
| 이전 경로 링크 호버 | color | `violet-500` `#8464C8` | `dark-violet-500` `#B39EDD` |
| 구분자 `/` | color | `ink-300` `#B8B2C8` | `dark-text-disabled` `#5C5878` |
| 현재 페이지 | color | `ink-900` `#2C2840` | `dark-text-primary` `#F0EBE3` |
| 이전/다음 버튼 배경 | background | `cream-100` `#F2EDE6` | `dark-surface` `#24203A` |
| 이전/다음 버튼 텍스트 | color | `violet-500` `#8464C8` | `dark-violet-500` `#B39EDD` |

---

### Search

| 요소 | 속성 | Light Mode | Dark Mode |
|---|---|---|---|
| 입력 필드 | background | `cream-100` `#F2EDE6` | `dark-surface` `#24203A` |
| 입력 필드 | border | `cream-300` `#DDD5C8` | `dark-border` `#3C3858` |
| 입력 필드 포커스 | border | `violet-500` `#8464C8` | `dark-violet-500` `#B39EDD` |
| 입력 필드 포커스 | box-shadow | `violet-100` `#EDE8FA` | `dark-violet-100` `#2A2544` |
| Placeholder | color | `ink-300` `#B8B2C8` | `dark-text-disabled` `#5C5878` |
| 입력 텍스트 | color | `ink-900` `#2C2840` | `dark-text-primary` `#F0EBE3` |
| 검색 아이콘 | color | `ink-500` `#7A7490` | `dark-text-muted` `#8880A0` |
| 결과 드롭다운 | background | `cream-50` `#FAF8F5` | `dark-bg` `#1C182C` |
| 결과 드롭다운 | border | `cream-300` `#DDD5C8` | `dark-border` `#3C3858` |
| 결과 항목 호버 | background | `violet-50` `#F6F3FE` | `dark-elevated` `#2E2A48` |
| 검색어 하이라이트 | background | `violet-200` `#D4C8F4` | `dark-violet-100` `#2A2544` |
| 검색어 하이라이트 | color | `violet-700` `#5E3EA8` | `dark-violet-400` `#C8B8F0` |

---

### Card

| 요소 | 속성 | Light Mode | Dark Mode |
|---|---|---|---|
| 기본 | background | `cream-100` `#F2EDE6` | `dark-surface` `#24203A` |
| 기본 | border | `cream-300` `#DDD5C8` | `dark-border` `#3C3858` |
| 하이라이트 | background | `violet-50` `#F6F3FE` | `dark-violet-100` `#2A2544` |
| 하이라이트 | border | `violet-300` `#BCA4EC` | `#5C5490` |
| 호버 | background | `cream-200` `#EAE3D8` | `dark-elevated` `#2E2A48` |
| 호버 | border | `violet-300` `#BCA4EC` | `#5C5490` |
| 카드 제목 | color | `ink-900` `#2C2840` | `dark-text-primary` `#F0EBE3` |
| 카드 설명 | color | `ink-700` `#4A4560` | `dark-text-secondary` `#C4BCCE` |
| 메타 (날짜, 카테고리) | color | `ink-500` `#7A7490` | `dark-text-muted` `#8880A0` |
| 구분선 | border | `cream-300` `#DDD5C8` | `dark-border` `#3C3858` |

---

### Markdown Content

| 요소 | 속성 | Light Mode | Dark Mode |
|---|---|---|---|
| H1 / H2 | color | `ink-900` `#2C2840` | `dark-text-primary` `#F0EBE3` |
| H3 / H4 | color | `ink-700` `#4A4560` | `dark-text-secondary` `#C4BCCE` |
| 본문 | color | `ink-900` `#2C2840` | `dark-text-primary` `#F0EBE3` |
| 링크 기본 | color | `violet-500` `#8464C8` | `dark-violet-500` `#B39EDD` |
| 링크 호버 | color | `violet-700` `#5E3EA8` | `dark-violet-400` `#C8B8F0` |
| 인라인 코드 | background | `cream-200` `#EAE3D8` | `dark-elevated` `#2E2A48` |
| 인라인 코드 | color | `violet-700` `#5E3EA8` | `dark-violet-400` `#C8B8F0` |
| 인용구 (blockquote) | background | `violet-50` `#F6F3FE` | `dark-elevated` `#2E2A48` |
| 인용구 (blockquote) | border-left | `violet-300` `#BCA4EC` | `dark-border` `#3C3858` |
| 인용구 (blockquote) | color | `ink-700` `#4A4560` | `dark-text-secondary` `#C4BCCE` |
| 구분선 `hr` | border | `cream-300` `#DDD5C8` | `dark-border` `#3C3858` |
| 표 헤더 | background | `cream-100` `#F2EDE6` | `dark-surface` `#24203A` |
| 표 헤더 텍스트 | color | `ink-900` `#2C2840` | `dark-text-primary` `#F0EBE3` |
| 표 셀 border | border | `cream-300` `#DDD5C8` | `dark-border` `#3C3858` |
| 표 짝수 행 | background | `cream-50` `#FAF8F5` | `dark-bg` `#1C182C` |
| strong / bold | color | `ink-900` `#2C2840` | `dark-text-primary` `#F0EBE3` |

---

### Code Block

| 요소 | 속성 | Light Mode | Dark Mode |
|---|---|---|---|
| 컨테이너 | background | `#EAE3D8` | `#16142A` |
| 컨테이너 | border | `#CEC8BC` | `dark-border` `#3C3858` |
| 언어 라벨 | background | `cream-300` `#DDD5C8` | `dark-surface` `#24203A` |
| 언어 라벨 | color | `ink-500` `#7A7490` | `dark-text-muted` `#8880A0` |
| 복사 버튼 아이콘 | color | `ink-500` `#7A7490` | `dark-text-muted` `#8880A0` |
| 복사 버튼 호버 | color | `violet-500` `#8464C8` | `dark-violet-500` `#B39EDD` |
| 기본 텍스트 | color | `ink-900` `#2C2840` | `#E8E4EE` |
| 주석 토큰 | color | `ink-300` `#B8B2C8` | `#6C6880` |
| 키워드 토큰 | color | `violet-500` `#8464C8` | `#C8B4F0` |
| 문자열 토큰 | color | `#7A96C0` | `#A8C4D8` |
| 숫자 토큰 | color | `#A87EB0` | `#D4A8CC` |
| 함수명 토큰 | color | `#9060B8` | `#B090D4` |
| 태그명 토큰 | color | `#7080C8` | `#A4AADA` |
| 속성명 토큰 | color | `#A880C0` | `#C8A4C4` |

---

### Callout

| 유형 | 요소 | Light Mode | Dark Mode |
|---|---|---|---|
| **Tip** | background | `#EAEef8` | `#20243C` |
| **Tip** | border-left | `#6070C0` | `#5060A8` |
| **Tip** | color | `#2A3060` | `#C4CCEC` |
| **Caution** | background | `#F0EAF8` | `#281E3C` |
| **Caution** | border-left | `violet-500` `#8464C8` | `#7050A0` |
| **Caution** | color | `#3A2060` | `#E0D4F8` |
| **Danger** | background | `#F5E8F0` | `#2C1A2C` |
| **Danger** | border-left | `#A85890` | `#8C5080` |
| **Danger** | color | `#4A1840` | `#EED4E8` |
| **Note** | background | `violet-50` `#F4F0FC` | `#221E38` |
| **Note** | border-left | `violet-300` `#BCA4EC` | `#6858A8` |
| **Note** | color | `ink-900` `#2C2840` | `#E0D8F8` |

---

### Button

| 유형 | 상태 | background | color | border |
|---|---|---|---|---|
| **Primary** | 기본 | `violet-500` `#8464C8` | `cream-50` `#FAF8F5` | — |
| **Primary** | 호버 | `violet-700` `#5E3EA8` | `cream-50` `#FAF8F5` | — |
| **Primary** | 비활성 | `cream-200` `#EAE3D8` | `ink-300` `#B8B2C8` | — |
| **Secondary** | 기본 | `violet-100` `#EDE8FA` | `violet-500` `#8464C8` | — |
| **Secondary** | 호버 | `violet-200` `#D4C8F4` | `violet-700` `#5E3EA8` | — |
| **Ghost** | 기본 | transparent | `violet-500` `#8464C8` | `violet-300` `#BCA4EC` |
| **Ghost** | 호버 | `violet-50` `#F6F3FE` | `violet-700` `#5E3EA8` | `violet-500` `#8464C8` |
| **Dark / Primary** | 기본 | `dark-violet-500` `#B39EDD` | `dark-bg` `#1C182C` | — |
| **Dark / Primary** | 호버 | `dark-violet-400` `#C8B8F0` | `dark-bg` `#1C182C` | — |
| **Dark / Ghost** | 기본 | transparent | `dark-violet-500` `#B39EDD` | `#5C5490` |
| **Dark / Ghost** | 호버 | `dark-elevated` `#2E2A48` | `dark-violet-400` `#C8B8F0` | `dark-violet-500` `#B39EDD` |

---

### Tag

| 유형 | 속성 | Light Mode | Dark Mode |
|---|---|---|---|
| 기본 | background | `violet-100` `#EDE8FA` | `dark-violet-100` `#2A2544` |
| 기본 | color | `violet-500` `#8464C8` | `dark-violet-500` `#B39EDD` |
| 진한 (활성) | background | `violet-200` `#D4C8F4` | `dark-elevated` `#2E2A48` |
| 진한 (활성) | color | `violet-700` `#5E3EA8` | `dark-violet-400` `#C8B8F0` |
| 비활성 | background | `cream-200` `#EAE3D8` | `dark-surface` `#24203A` |
| 비활성 | color | `ink-500` `#7A7490` | `dark-text-muted` `#8880A0` |

---

### Footer

| 요소 | 속성 | Light Mode | Dark Mode |
|---|---|---|---|
| 컨테이너 | background | `cream-100` `#F2EDE6` | `dark-surface` `#24203A` |
| 컨테이너 | border-top | `cream-300` `#DDD5C8` | `dark-border` `#3C3858` |
| 본문 텍스트 | color | `ink-500` `#7A7490` | `dark-text-muted` `#8880A0` |
| 링크 기본 | color | `violet-400` `#A080DC` | `dark-violet-500` `#B39EDD` |
| 링크 호버 | color | `violet-500` `#8464C8` | `dark-violet-400` `#C8B8F0` |
| 구분자 `·` | color | `ink-300` `#B8B2C8` | `dark-text-disabled` `#5C5878` |
