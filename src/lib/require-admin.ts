import { auth } from "@/auth";
import { isAdminEmail } from "./admin-email";

// Being signed in is not enough — only the configured ADMIN_EMAIL may
// call admin Server Actions or view the admin panel. Re-checked here
// (not just in the proxy) since Proxy alone is not a security boundary.
export async function requireAdmin() {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) throw new Error("No autorizado");
  return session!.user!;
}
