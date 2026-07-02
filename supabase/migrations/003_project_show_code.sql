-- 003_project_show_code.sql
-- Lets admins explicitly control whether the code link is shown on the
-- project detail page, instead of only inferring it from github_url.

alter table public.proyectos add column if not exists show_code boolean not null default true;
