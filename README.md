# Winter Dev Archive

학습한 내용을 주제별로 정리하고 다시 참고하기 위해 만든 웹 기반 학습 아카이브입니다.

---

## 🌱 프로젝트 소개

개발, AI 활용, 디지털 도구 등 학습한 내용을 주제별로 정리하고 다시 참고하기 위해 만든 개인 프로젝트입니다.<br>
현재는 JavaScript, React, 코딩 테스트, AI·바이브 코딩을 중심으로 구성하고 있으며, 앞으로 Excel 등 다른 학습 주제도 조금씩 추가할 예정입니다.<br>
문서는 마크다운으로 관리하고 React와 Vite로 사이트를 구현했습니다.

---

## ✨ 주요 기능

- 카테고리 → 섹션 → 문서 3단계 구조로 학습 문서 탐색
- 마크다운 문서 렌더링 (코드 하이라이트, GFM)
- 문서 프론트매터(제목·설명 등) 파싱
- 키워드 검색 (Fuse.js 기반)
- 라이트 / 다크 모드
- 방문자 수 표시
- 문서별 댓글 (giscus)
- 반응형 레이아웃

---

## 🛠 기술 스택

이 프로젝트에서 사용한 주요 기술입니다.

<img src="https://img.shields.io/badge/React-cfe8ff?style=flat-square&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/Vite-e6d6ff?style=flat-square&logo=vite&logoColor=black"/> <img src="https://img.shields.io/badge/MUI-bcd8ff?style=flat-square&logo=mui&logoColor=black"/> <img src="https://img.shields.io/badge/React%20Router-ffd8cc?style=flat-square&logo=reactrouter&logoColor=black"/> <img src="https://img.shields.io/badge/Supabase-cfeccf?style=flat-square&logo=supabase&logoColor=black"/>

- React · Vite · React Router
- MUI · Emotion
- 마크다운: react-markdown · remark-gfm · rehype-highlight
- 검색: Fuse.js / 프론트매터 파싱: gray-matter
- Supabase (방문자 수)
- 댓글: giscus
- 배포: GitHub Actions → GitHub Pages

---

## 🎯 구현 및 경험

- 문서가 늘어나도 원하는 내용을 빠르게 찾을 수 있도록 카테고리·섹션·문서 경로 구조를 먼저 설계
- 마크다운 파일을 불러와 프론트매터를 분리하고 본문을 렌더링하는 로더를 구성
- Fuse.js로 문서 색인을 만들어 제목·본문 기반 검색을 구현
- 라우팅을 `/:category/:section/:doc` 형태로 정리해 URL만으로 위치를 파악할 수 있도록 구성
- 라이트/다크 모드, 방문자 수, 댓글 등 부가 기능을 컨텍스트와 훅으로 분리

---

## 🚀 실행 / 배포

```bash
npm install
npm run dev
npm run build
```

환경 변수는 `.env` 에 설정합니다.

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

`main` 브랜치에 push하면 GitHub Actions가 빌드 후 GitHub Pages로 배포합니다.

---

## 🔗 Links

- GitHub: https://github.com/Winter-Haeum/winter-dev-archive
- Live: https://winter-haeum.github.io/winter-dev-archive/
