-- Gilgit Portal admin dashboard schema
-- Run this file in Supabase SQL Editor before using /admin.
-- Tables are protected with RLS; only users whose user_profiles.role = 'admin' can manage portal content.

create table if not exists public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'viewer' check (role in ('viewer', 'editor', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.portal_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) between 2 and 180),
  category text not null default 'Development',
  district text,
  status text not null default 'Planned' check (status in ('Planned', 'In Progress', 'Completed', 'On Hold')),
  budget numeric(14,2) check (budget is null or budget >= 0),
  description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portal_notices (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) between 2 and 180),
  category text not null default 'General',
  body text not null default '',
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists portal_projects_set_updated_at on public.portal_projects;
create trigger portal_projects_set_updated_at
before update on public.portal_projects
for each row execute function public.set_updated_at();

drop trigger if exists portal_notices_set_updated_at on public.portal_notices;
create trigger portal_notices_set_updated_at
before update on public.portal_notices
for each row execute function public.set_updated_at();

alter table public.user_profiles enable row level security;
alter table public.portal_projects enable row level security;
alter table public.portal_notices enable row level security;

revoke all on table public.user_profiles from anon, authenticated;
revoke all on table public.portal_projects from anon, authenticated;
revoke all on table public.portal_notices from anon, authenticated;

grant select on table public.user_profiles to authenticated;
grant select on table public.portal_projects to anon, authenticated;
grant insert, update, delete on table public.portal_projects to authenticated;
grant select on table public.portal_notices to anon, authenticated;
grant insert, update, delete on table public.portal_notices to authenticated;

drop policy if exists "Users can read their own profile" on public.user_profiles;
create policy "Users can read their own profile"
on public.user_profiles for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Public can read published projects" on public.portal_projects;
create policy "Public can read published projects"
on public.portal_projects for select to anon, authenticated
using (true);

drop policy if exists "Admins can insert projects" on public.portal_projects;
create policy "Admins can insert projects"
on public.portal_projects for insert to authenticated
with check (exists (
  select 1 from public.user_profiles p
  where p.user_id = (select auth.uid()) and p.role = 'admin'
));

drop policy if exists "Admins can update projects" on public.portal_projects;
create policy "Admins can update projects"
on public.portal_projects for update to authenticated
using (exists (
  select 1 from public.user_profiles p
  where p.user_id = (select auth.uid()) and p.role = 'admin'
))
with check (exists (
  select 1 from public.user_profiles p
  where p.user_id = (select auth.uid()) and p.role = 'admin'
));

drop policy if exists "Admins can delete projects" on public.portal_projects;
create policy "Admins can delete projects"
on public.portal_projects for delete to authenticated
using (exists (
  select 1 from public.user_profiles p
  where p.user_id = (select auth.uid()) and p.role = 'admin'
));

drop policy if exists "Public can read published notices" on public.portal_notices;
create policy "Public can read published notices"
on public.portal_notices for select to anon, authenticated
using (is_published = true or exists (
  select 1 from public.user_profiles p
  where p.user_id = (select auth.uid()) and p.role = 'admin'
));

drop policy if exists "Admins can insert notices" on public.portal_notices;
create policy "Admins can insert notices"
on public.portal_notices for insert to authenticated
with check (exists (
  select 1 from public.user_profiles p
  where p.user_id = (select auth.uid()) and p.role = 'admin'
));

drop policy if exists "Admins can update notices" on public.portal_notices;
create policy "Admins can update notices"
on public.portal_notices for update to authenticated
using (exists (
  select 1 from public.user_profiles p
  where p.user_id = (select auth.uid()) and p.role = 'admin'
))
with check (exists (
  select 1 from public.user_profiles p
  where p.user_id = (select auth.uid()) and p.role = 'admin'
));

drop policy if exists "Admins can delete notices" on public.portal_notices;
create policy "Admins can delete notices"
on public.portal_notices for delete to authenticated
using (exists (
  select 1 from public.user_profiles p
  where p.user_id = (select auth.uid()) and p.role = 'admin'
));

-- ADMIN SETUP (run only after creating the admin user in Supabase Auth):
-- Replace admin@example.com with the email used to sign up in Authentication > Users.
-- insert into public.user_profiles (user_id, display_name, role)
-- select id, 'Portal Administrator', 'admin'
-- from auth.users where email = 'admin@example.com'
-- on conflict (user_id) do update set role = 'admin', display_name = excluded.display_name;

