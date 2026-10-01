import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// /admin lives outside the locale-prefixed routes — it's a Spanish-only,
// single-user area, so it never needs an /es or /en prefix.
const ADMIN_PATH = /^\/admin(\/|$)/;

// Must stay on the default Edge runtime: OpenNext doesn't support Node.js
// middleware. Keep imports minimal too — no jose/DB here; the signature
// check lives in requireAdmin() (admin layout + Server Actions).
export default function middleware(request: NextRequest) {
  if (ADMIN_PATH.test(request.nextUrl.pathname)) {
    // Cloudflare Access adds this header to every request it lets through.
    // Missing means the request didn't come through Access at all.
    if (
      process.env.NODE_ENV !== "development" &&
      !request.headers.get("cf-access-jwt-assertion")
    ) {
      return new NextResponse("No autorizado", { status: 403 });
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|cdn-cgi|.*\\..*).*)"],
};
