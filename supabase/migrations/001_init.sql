-- 001_init.sql
-- Creates the core tables for the portfolio project.

/* ── Services ─────────────────────────────────────────────────────── */
create table if not exists public.servicios (
  id          text primary key,
  name_es     text not null,
  name_en     text not null,
  description_es text not null,
  description_en text not null,
  "order"     integer not null default 0,
  created_at  timestamptz not null default now()
);

/* ── Projects ─────────────────────────────────────────────────────── */
create table if not exists public.proyectos (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  category    text not null check (category in ('cliente', 'demo')),
  service_id  text not null references public.servicios(id),
  featured    boolean not null default false,
  business_es text not null,
  business_en text not null,
  problem_es  text not null,
  problem_en  text not null,
  solution_es text not null,
  solution_en text not null,
  technologies text[] not null default '{}',
  live_url    text,
  created_at  timestamptz not null default now()
);

create index if not exists idx_proyectos_slug on public.proyectos(slug);
create index if not exists idx_proyectos_service on public.proyectos(service_id);
create index if not exists idx_proyectos_category on public.proyectos(category);
create index if not exists idx_proyectos_featured on public.proyectos(featured);

/* ── Contact messages ──────────────────────────────────────────────── */
create table if not exists public.mensajes_contacto (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  service_id  text not null references public.servicios(id),
  timeline    text not null check (timeline in ('urgent', 'month', 'no_rush', 'exploring')),
  message     text not null,
  status      text not null default 'pendiente' check (status in ('pendiente', 'respondido')),
  created_at  timestamptz not null default now()
);

create index if not exists idx_mensajes_status on public.mensajes_contacto(status);

/* ── Storage buckets ───────────────────────────────────────────────── */
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('service-references', 'service-references', true)
on conflict (id) do nothing;

/* ── RLS (disabled by default; enabled when Auth is configured) ──── */
alter table public.servicios enable row level security;
alter table public.proyectos enable row level security;
alter table public.mensajes_contacto enable row level security;

-- Public read access for servicios and proyectos
create policy "Public read: servicios"
  on public.servicios for select using (true);

create policy "Public read: proyectos"
  on public.proyectos for select using (true);

-- Only authenticated admin can write
create policy "Admin write: servicios"
  on public.servicios for all using (auth.role() = 'authenticated');

create policy "Admin write: proyectos"
  on public.proyectos for all using (auth.role() = 'authenticated');

create policy "Admin write: mensajes_contacto"
  on public.mensajes_contacto for all using (auth.role() = 'authenticated');

-- Anyone can insert into mensajes_contacto (contact form)
create policy "Public insert: mensajes_contacto"
  on public.mensajes_contacto for insert with check (true);
