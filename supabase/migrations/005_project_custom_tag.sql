-- 005_project_custom_tag.sql
-- Lets admins override the service pill shown on a project with free text
-- (e.g. "Bootcamp") instead of being forced to pick from the public
-- "servicios" list, which also feeds the contact form's service dropdown.
-- Falls back to the linked service_id when left empty.

alter table public.proyectos add column if not exists custom_tag_es text;
alter table public.proyectos add column if not exists custom_tag_en text;
