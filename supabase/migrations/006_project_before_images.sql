-- 006_project_before_images.sql
-- Adds optional "before" screenshots for desktop and mobile so project
-- detail pages can render an interactive before/after drag-comparison
-- slider. Nullable — existing projects without a before-image keep
-- rendering the plain single-image preview.

alter table public.proyectos add column if not exists before_image_url text;
alter table public.proyectos add column if not exists before_mobile_image_url text;
