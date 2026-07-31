// Pure helper — no Next.js-specific imports, safe to use in both
// proxy (middleware) and server components/actions.
export function isAdminEmail(email: string | null | undefined): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  return !!adminEmail && !!email && email.toLowerCase() === adminEmail.toLowerCase();
}
