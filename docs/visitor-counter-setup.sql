-- Winter Dev Archive 방문자 카운터 — Supabase SQL Editor에서 실행
-- (docs/wda-document-policy.md > 부가 기능(방문자 수 / 댓글) 정책 참고)

create table if not exists public.visit_counters (
  id int primary key default 1,
  visit_date date not null default (now() at time zone 'Asia/Seoul')::date,
  today_count int not null default 0,
  total_count int not null default 0,
  constraint single_row check (id = 1)
);

insert into public.visit_counters (id, visit_date, today_count, total_count)
values (1, (now() at time zone 'Asia/Seoul')::date, 0, 0)
on conflict (id) do nothing;

alter table public.visit_counters enable row level security;

create policy "Allow anonymous read" on public.visit_counters
  for select using (true);

-- RLS 정책만으로는 부족하다. anon 롤에 테이블 자체의 SELECT 권한도 별도로 있어야 한다.
grant select on public.visit_counters to anon;

create or replace function public.increment_visit_count()
returns table (today_count int, total_count int)
language plpgsql
security definer
set search_path = public
as $$
declare
  today_kst date := (now() at time zone 'Asia/Seoul')::date;
begin
  -- RETURNS TABLE의 컬럼명(today_count/total_count)이 plpgsql 변수로도 취급되어
  -- 별칭(v) 없이 쓰면 "column reference is ambiguous"(42702) 에러가 발생한다.
  update public.visit_counters as v
  set
    today_count = case when v.visit_date = today_kst then v.today_count + 1 else 1 end,
    visit_date = today_kst,
    total_count = v.total_count + 1
  where v.id = 1;

  return query
    select v.today_count, v.total_count from public.visit_counters v where v.id = 1;
end;
$$;

grant execute on function public.increment_visit_count() to anon;
