// Pure helper — no Next.js-specific imports, safe to use anywhere.
export function isAdminEmail(
  email: string | null | undefined,
  adminEmail: string | null | undefined
): boolean {
  return !!adminEmail && !!email && email.toLowerCase() === adminEmail.toLowerCase();
}
