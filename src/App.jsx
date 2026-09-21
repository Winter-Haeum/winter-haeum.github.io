import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '@/pages/home-page';
import AboutPage from '@/pages/about-page';
import CategoryPage from '@/pages/category-page';
import SectionPage from '@/pages/section-page';
import DocPage from '@/pages/doc-page';
import SearchPage from '@/pages/search-page';
import NotFoundPage from '@/pages/not-found-page';

// 라우트 변경 시 본문 스크롤을 최상단으로 초기화
// 앵커(#) 이동은 pathname이 바뀌지 않으므로 자연스럽게 제외됨
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// import.meta.env.BASE_URL:
//   dev   → '/'
//   build → '/winter-dev-archive/'  (vite.config.js 기준)
function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/:category' element={<CategoryPage />} />
        <Route path='/:category/:section' element={<SectionPage />} />
        <Route path='/:category/:section/:doc' element={<DocPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
