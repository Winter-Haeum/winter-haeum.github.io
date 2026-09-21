/**
 * useVisitorCount — Supabase 기반 오늘/전체 방문자 수 훅
 *
 * @returns {{ status: 'loading' | 'success' | 'error', data: { today: number, total: number } | null }}
 *   status: 요청 진행 상태. Supabase 미설정 · 요청 실패 · 데이터 없음은 모두 'error'로 처리한다
 *   (무한 로딩 상태로 남지 않도록).
 *
 * 세션당 1회만 증가시킨다(sessionStorage 플래그). 같은 세션 내 재방문(다른 챕터 이동 등)은
 * 증가 없이 현재 카운트만 조회한다.
 *
 * Example usage:
 * const { status, data } = useVisitorCount();
 */
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/utils/supabaseClient';

const SESSION_FLAG = 'wda_visit_counted';

export function useVisitorCount() {
  const [state, setState] = useState(() =>
    isSupabaseConfigured ? { status: 'loading', data: null } : { status: 'error', data: null }
  );

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let active = true;
    const alreadyCounted = sessionStorage.getItem(SESSION_FLAG) === '1';

    const request = alreadyCounted
      ? supabase.from('visit_counters').select('today_count, total_count').eq('id', 1).maybeSingle()
      : supabase.rpc('increment_visit_count').maybeSingle();

    request
      .then(({ data, error }) => {
        if (!active) return;
        if (error || !data) {
          setState({ status: 'error', data: null });
          return;
        }
        if (!alreadyCounted) sessionStorage.setItem(SESSION_FLAG, '1');
        setState({ status: 'success', data: { today: data.today_count, total: data.total_count } });
      })
      .catch(() => {
        if (active) setState({ status: 'error', data: null });
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
