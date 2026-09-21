/**
 * markdownLoader — Markdown 파일 로더
 *
 * content/ 디렉토리의 MD 파일을 Vite glob import로 빌드 타임에 수집한다.
 * _templates 디렉토리는 제외한다.
 *
 * 경로 구조: /content/{category}/{section}/{slug}.md
 *
 * 반환 타입:
 *   DocMeta:         { slug, path, category, section, frontmatter }
 *   Doc:             { ...DocMeta, content }
 *   SearchIndexItem: { id, slug, category, section, title, description,
 *                      tags, status, date, body, url, isIndex }
 */
import yaml from 'js-yaml';

// _templates 제외 — 템플릿 파일이 실 문서로 수집되지 않도록 한다
// Vite 8(rolldown)에서 { as: 'raw' }가 제거됨 → { query: '?raw', import: 'default' } 사용
//
// VITE_PUBLIC_BUILD=true(공개 배포 빌드)에서는 ai-vibe-coding(비공개 AI 교안)도 함께
// 제외한다. import.meta.glob은 정적 분석 대상이므로 두 glob 호출을 각각 리터럴 배열로
// 작성한다(동적으로 조합한 변수 배열을 넘기면 Vite가 인식하지 못한다).
// 이렇게 제외된 파일은 이 모듈 스코프 밖(빌드 산출물 JS 청크·검색 인덱스)에 전혀
// 포함되지 않는다 — 화면에서만 숨기는 것이 아니라 번들 자체에서 빠진다.
const _modules = import.meta.env.VITE_PUBLIC_BUILD === 'true'
  ? import.meta.glob(
      ['/content/**/*.md', '!/content/_templates/**', '!/content/ai-vibe-coding/**'],
      { query: '?raw', import: 'default' }
    )
  : import.meta.glob(
      ['/content/**/*.md', '!/content/_templates/**'],
      { query: '?raw', import: 'default' }
    );

/** 경로에서 { category, section, slug } 추출 */
function _parsePath(path) {
  const relative = path.replace('/content/', '').replace(/\.md$/, '');
  const parts = relative.split('/');
  if (parts.length < 3) return null;
  return { category: parts[0], section: parts[1], slug: parts[2] };
}

/**
 * raw string → { frontmatter, content }
 * gray-matter 대신 js-yaml 직접 사용.
 * gray-matter의 to-file.js가 Buffer.from()을 호출하여
 * 브라우저 환경에서 ReferenceError: Buffer is not defined 발생.
 */
function _parseRaw(raw) {
  if (typeof raw !== 'string') return { frontmatter: {}, content: '' };

  // YAML frontmatter 구분자 추출
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content: raw.trim() };

  let frontmatter = {};
  try {
    frontmatter = yaml.safeLoad(match[1]) || {};
  } catch {
    // YAML 파싱 실패 시 빈 frontmatter 반환
  }

  return { frontmatter, content: match[2].trim() };
}

/**
 * 전체 문서 메타 배열 반환 (content 미포함)
 * Promise.all로 병렬 로딩 — Stage 5 검색 기능 성능을 위해 직렬에서 전환
 * @returns {Promise<DocMeta[]>}
 */
export async function getAllDocs() {
  const entries = Object.entries(_modules);
  const results = await Promise.all(
    entries.map(async ([path, load]) => {
      const parsed = _parsePath(path);
      if (!parsed) return null;
      try {
        const raw = await load();
        const { frontmatter } = _parseRaw(raw);
        return { ...parsed, path, frontmatter };
      } catch (err) {
        console.warn('[markdownLoader] 파일 로딩 실패:', path, err);
        return null;
      }
    })
  );
  return results.filter(Boolean);
}

/**
 * 섹션 내 index.md를 제외한 문서 목록 반환
 * @param {string} category
 * @param {string} section
 * @returns {Promise<DocMeta[]>}
 */
export async function getSectionDocs(category, section) {
  const all = await getAllDocs();
  return all.filter(
    (d) => d.category === category && d.section === section && d.slug !== 'index'
  );
}

/**
 * 섹션 index.md 반환
 * @param {string} category
 * @param {string} section
 * @returns {Promise<Doc|null>}
 */
export async function getSectionIndex(category, section) {
  const path = `/content/${category}/${section}/index.md`;
  const load = _modules[path];
  if (!load) return null;
  const raw = await load();
  const { frontmatter, content } = _parseRaw(raw);
  return { slug: 'index', path, category, section, frontmatter, content };
}

/**
 * category + section + slug로 단일 문서 반환
 * @param {string} category
 * @param {string} section
 * @param {string} slug
 * @returns {Promise<Doc|null>}
 */
export async function getDoc(category, section, slug) {
  const path = `/content/${category}/${section}/${slug}.md`;
  const load = _modules[path];
  if (!load) return null;
  const raw = await load();
  const { frontmatter, content } = _parseRaw(raw);
  return { slug, path, category, section, frontmatter, content };
}

// ─── 검색 인덱스 ─────────────────────────────────────────────────────────────

/** 마크다운 기호 제거 → 순수 텍스트 추출 (검색 인덱스 body 생성용) */
function _stripMarkdown(content) {
  return content
    .replace(/```[\s\S]*?```/g, ' ')             // 코드 블록 전체 제거
    .replace(/`[^`\n]+`/g, ' ')                  // 인라인 코드 제거
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')       // 이미지 제거
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')     // 링크 → 텍스트만
    .replace(/^#{1,6}\s+/gm, '')                 // 헤딩 기호 제거
    .replace(/\*{1,3}([^*\n]+)\*{1,3}/g, '$1')  // 굵게/이탤릭 제거
    .replace(/_{1,3}([^_\n]+)_{1,3}/g, '$1')    // 밑줄 이탤릭 제거
    .replace(/^>\s*/gm, '')                      // blockquote 마커 제거
    .replace(/^[-*+]\s+/gm, '')                  // 순서 없는 리스트 마커
    .replace(/^\d+\.\s+/gm, '')                  // 순서 있는 리스트 마커
    .replace(/^[-*_]{3,}\s*$/gm, '')             // 수평선 제거
    .replace(/\n+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// 세션 동안 1회만 빌드하는 모듈 스코프 캐시
let _searchIndexCache = null;

/**
 * 전체 문서 검색 인덱스 빌드 (첫 호출 이후 캐시 반환)
 * @returns {Promise<SearchIndexItem[]>}
 */
export async function buildSearchIndex() {
  if (_searchIndexCache) return _searchIndexCache;

  const entries = Object.entries(_modules);
  const results = await Promise.all(
    entries.map(async ([path, load]) => {
      const parsed = _parsePath(path);
      if (!parsed) return null;
      const raw = await load();
      const { frontmatter, content } = _parseRaw(raw);
      return {
        id: `${parsed.category}/${parsed.section}/${parsed.slug}`,
        slug: parsed.slug,
        category: parsed.category,
        section: parsed.section,
        title: frontmatter.title ?? '',
        description: frontmatter.description ?? '',
        tags: frontmatter.tags ?? [],
        status: frontmatter.status ?? 'draft',
        date: frontmatter.date ?? '',
        body: _stripMarkdown(content),
        url: parsed.slug === 'index'
          ? `/${parsed.category}/${parsed.section}`
          : `/${parsed.category}/${parsed.section}/${parsed.slug}`,
        isIndex: parsed.slug === 'index',
      };
    })
  );

  _searchIndexCache = results.filter(Boolean);
  return _searchIndexCache;
}
