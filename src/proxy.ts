import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { ACTIVE_SESSION_COOKIE } from "@/lib/auth";
import { env } from "@/lib/env";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = env.supabaseUrl;
  const key = env.supabaseAnonKey;
  if (!url || !key) return NextResponse.redirect(new URL("/login?error=auth_unavailable", request.url));

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookies) {
        cookies.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookies.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });

  const { data: { user } } = await supabase.auth.getUser();
  const sessionId = request.cookies.get(ACTIVE_SESSION_COOKIE)?.value;
  const isProtected = request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/admin");
  if (isProtected && (!user || !sessionId)) {
    return NextResponse.redirect(new URL("/login?error=Please%20sign%20in%20to%20continue", request.url));
  }

  if (user && sessionId && isProtected) {
    const { data: session } = await supabase
      .from("user_sessions")
      .select("id")
      .eq("id", sessionId)
      .eq("user_id", user.id)
      .eq("is_active", true)
      .maybeSingle();
    if (!session) {
      const redirectResponse = NextResponse.redirect(new URL("/login?error=session_expired", request.url));
      redirectResponse.cookies.delete(ACTIVE_SESSION_COOKIE);
      return redirectResponse;
    }
  }

  return response;
}

export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };
