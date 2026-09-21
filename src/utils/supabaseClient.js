/**
 * Supabase 클라이언트 — 방문자 카운터 등 Supabase 연동 기능이 공용으로 사용
 *
 * VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY가 설정되지 않은 환경(로컬 미설정,
 * 배포 시크릿 누락 등)에서는 supabase가 null이 되며, 사용하는 쪽에서
 * isSupabaseConfigured로 먼저 확인해야 한다.
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
