import createMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
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
  const response = NextResponse.next();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    // No Supabase configured — nothing to authenticate against locally.
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
