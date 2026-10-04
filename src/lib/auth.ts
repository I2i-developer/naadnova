import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { hasSessionExpired } from "@/lib/session";

export const ACTIVE_SESSION_COOKIE = "naadnova-session";

export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const cookieStore = await cookies();
  const sessionId = cookieStore.get(ACTIVE_SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const { data: activeSession } = await supabase
    .from("user_sessions")
    .select("id, last_seen_at")
    .eq("id", sessionId)
    .eq("user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (!activeSession) return null;

  if (hasSessionExpired(activeSession.last_seen_at)) {
    await supabase
      .from("user_sessions")
      .update({ is_active: false, revoked_at: new Date().toISOString() })
      .eq("id", activeSession.id);
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, email, phone, role, student_code")
    .eq("id", user.id)
    .single();

  return { user, profile, supabase, sessionId, activeSession };
}

export async function requireUser() {
  const auth = await getAuthenticatedUser();
  if (!auth) redirect("/login?error=session_expired");
  return auth;
}

export async function requireAdmin() {
  const auth = await requireUser();
  if (auth.profile?.role !== "admin") redirect("/dashboard?error=admin_only");
  return auth;
}

export async function getDeviceLabel() {
  const headerStore = await headers();
  const userAgent = headerStore.get("user-agent") ?? "Unknown browser";
  if (/mobile/i.test(userAgent)) return "Mobile device";
  if (/mac/i.test(userAgent)) return "Mac browser";
  if (/windows/i.test(userAgent)) return "Windows browser";
  return "Web browser";
}
