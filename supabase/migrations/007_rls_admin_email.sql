-- 007_rls_admin_email.sql
-- Tightens write access from "any authenticated user" to "the admin only".
-- Without this, anyone who signs up in this Supabase project (public
-- signups are enabled by default) could write directly to these tables
-- via the REST API using the anon key, bypassing the Next.js app entirely.

drop policy if exists "Admin write: servicios" on public.servicios;
create policy "Admin write: servicios"
  on public.servicios for all
  using ((auth.jwt() ->> 'email') = 'matheofloresloor@gmail.com');

drop policy if exists "Admin write: proyectos" on public.proyectos;
create policy "Admin write: proyectos"
  on public.proyectos for all
  using ((auth.jwt() ->> 'email') = 'matheofloresloor@gmail.com');

drop policy if exists "Admin write: mensajes_contacto" on public.mensajes_contacto;
create policy "Admin write: mensajes_contacto"
  on public.mensajes_contacto for all
  using ((auth.jwt() ->> 'email') = 'matheofloresloor@gmail.com');

-- Public insert into mensajes_contacto (contact form) stays unchanged —
-- it's a separate, additive policy defined in 001_init.sql.
