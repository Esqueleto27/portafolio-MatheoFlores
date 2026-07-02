-- 004_project_mobile_image.sql
-- Replaces the old before/after/device screenshots gallery with a single
-- mobile screenshot shown inside a phone frame on the project detail page.
-- The old `screenshots` jsonb column is no longer read by the app but is
-- left in place to avoid destroying any existing data.

alter table public.proyectos add column if not exists mobile_image_url text;
