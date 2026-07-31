import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { auth } from "./auth";
import { isAdminEmail } from "./lib/admin-email";

const intlMiddleware = createMiddleware(routing);

// /admin, /login and /forgot live outside the locale-prefixed routes — it's
// a Spanish-only, single-user area, so it never needs an /es or /en prefix.
const LOCALE_FREE_PATH = /^\/(admin|login|forgot)(\/|$)/;
const ADMIN_PATH = /^\/admin(\/|$)/;

export default async function middleware(request: NextRequest) {
  if (LOCALE_FREE_PATH.test(request.nextUrl.pathname)) {
    if (!ADMIN_PATH.test(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    return checkAdminAuth(request);
  }

  return intlMiddleware(request);
}

async function checkAdminAuth(request: NextRequest) {
  // Optimistic check only — reads the signed JWT session cookie, no
  // database hit. The admin layout re-verifies with the same check as
  // defense in depth (Proxy alone is not a security boundary).
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
