-- 002_project_detail_fields.sql
-- Adds fields for the expanded project detail page, and fixes the
-- pre-existing gap where image_url was used in code but never migrated.

alter table public.proyectos add column if not exists image_url text;
alter table public.proyectos add column if not exists description_es text;
alter table public.proyectos add column if not exists description_en text;
alter table public.proyectos add column if not exists objective_es text;
alter table public.proyectos add column if not exists objective_en text;
alter table public.proyectos add column if not exists challenges_es text;
alter table public.proyectos add column if not exists challenges_en text;
alter table public.proyectos add column if not exists results_es text;
alter table public.proyectos add column if not exists results_en text;
alter table public.proyectos add column if not exists features jsonb not null default '[]'::jsonb;
alter table public.proyectos add column if not exists screenshots jsonb not null default '[]'::jsonb;
alter table public.proyectos add column if not exists github_url text;
alter table public.proyectos add column if not exists video_url text;
