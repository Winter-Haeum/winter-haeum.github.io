/**
 * StudyAssistantPanel — 학습 도우미 (기본 접힘형 패널)
 *
 * DocPage 하단에 배치되는 무료 학습 도우미. 별도 AI API·서버 없이 기존
 * Fuse.js 검색과 Markdown 원문 구조 분석만으로 동작한다.
 * ChapterComments와 동일하게 기본 접힘 상태로 라벨 버튼만 노출하고,
 * 클릭 시에만 탭(질문 검색 / 이 문서 정리 / 두 교안 비교)을 마운트한다.
 *
 * Props:
 * @param {object} currentDoc     - 현재 문서 { frontmatter, content } [Required]
 * @param {object} currentDocMeta - { category, section, slug, url } [Required]
 *
 * Example usage:
 * <StudyAssistantPanel currentDoc={doc} currentDocMeta={{ category, section, slug, url }} />
 */
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuestionSearchTab from './QuestionSearchTab';
import DocSummaryTab from './DocSummaryTab';
import CompareDocsTab from './CompareDocsTab';

const TABS = [
  { value: 'search', label: '질문 검색' },
  { value: 'summary', label: '이 문서 정리' },
  { value: 'compare', label: '두 교안 비교' },
];

function StudyAssistantPanel({ currentDoc, currentDocMeta }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('search');

  return (
    <Box component='section' aria-label='학습 도우미' sx={{ mt: 6 }}>
      <Divider sx={{ mb: 2.5 }} />

      <Button
        onClick={() => setOpen((prev) => !prev)}
        disableRipple
        aria-expanded={open}
        startIcon={<MenuBookIcon sx={{ fontSize: '1.1rem' }} />}
        sx={(theme) => ({
          textTransform: 'none',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: theme.palette.text.secondary,
          backgroundColor: 'transparent',
          border: '1px solid',
          borderColor: theme.palette.divider,
          borderRadius: '8px',
          px: 1.75,
          py: 0.75,
          minWidth: 0,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            borderColor: theme.palette.divider,
          },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: '2px',
          },
        })}
      >
        학습 도우미 — 질문 검색 · 문서 정리 · 교안 비교
      </Button>

      {open && (
        <Box
          sx={(theme) => ({
            mt: 3,
            border: '1px solid',
            borderColor: theme.palette.divider,
            borderRadius: '12px',
            backgroundColor: theme.palette.background.paper,
            overflow: 'hidden',
          })}
        >
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
            aria-label='학습 도우미 기능 선택'
            sx={(theme) => ({
              minHeight: '44px',
              borderBottom: '1px solid',
              borderColor: theme.palette.divider,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                minHeight: '44px',
                py: 1,
              },
            })}
          >
            {TABS.map((t) => (
              <Tab
                key={t.value}
                value={t.value}
                label={t.label}
                id={`study-assistant-tab-${t.value}`}
                aria-controls={`study-assistant-panel-${t.value}`}
              />
            ))}
          </Tabs>

          <Box sx={{ p: { xs: 2, md: 2.5 } }}>
            {tab === 'search' && (
              <Box role='tabpanel' id='study-assistant-panel-search' aria-labelledby='study-assistant-tab-search'>
                <QuestionSearchTab currentDocMeta={currentDocMeta} />
              </Box>
            )}
            {tab === 'summary' && (
              <Box role='tabpanel' id='study-assistant-panel-summary' aria-labelledby='study-assistant-tab-summary'>
                <DocSummaryTab doc={currentDoc} docMeta={currentDocMeta} />
              </Box>
            )}
            {tab === 'compare' && (
              <Box role='tabpanel' id='study-assistant-panel-compare' aria-labelledby='study-assistant-tab-compare'>
                <CompareDocsTab defaultDocMeta={currentDocMeta} />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default StudyAssistantPanel;
