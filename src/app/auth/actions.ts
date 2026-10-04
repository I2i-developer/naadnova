"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ACTIVE_SESSION_COOKIE, getAuthenticatedUser, getDeviceLabel } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { hasPublicSupabaseEnv } from "@/lib/env";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function authErrorMessage(error: { code?: string; message: string }, flow: "login" | "signup") {
  const code = error.code ?? "";
  const message = error.message.toLowerCase();

  if (code === "over_email_send_rate_limit" || message.includes("email rate limit")) {
    return "Supabase's confirmation email limit has been reached. Use an already confirmed account, or wait before requesting another signup email.";
  }
  if (code === "over_request_rate_limit" || message.includes("too many requests")) {
    return "Too many authentication attempts were made. Wait a few minutes, then try once more.";
  }
  if (code === "email_not_confirmed" || message.includes("email not confirmed")) {
    return "This account exists but its email has not been confirmed. Open the latest Supabase confirmation email before signing in.";
  }
  if (code === "invalid_credentials" || message.includes("invalid login credentials")) {
    return "The email or password is incorrect. Sample placeholder text is not a login account.";
  }
  if (code === "user_already_exists" || message.includes("already registered")) {
    return "An account already exists for this email. Sign in instead of creating it again.";
  }
  return flow === "login" ? "Unable to sign in. Check your details and try again." : "Unable to create the account. Please try again shortly.";
}

export async function signIn(formData: FormData) {
  if (!hasPublicSupabaseEnv()) redirect("/login?error=auth_unavailable");
  const existingSession = await getAuthenticatedUser();
  if (existingSession) redirect(existingSession.profile?.role === "admin" ? "/admin" : "/dashboard");

  const email = value(formData, "email");
  const password = value(formData, "password");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) redirect(`/login?error=${encodeURIComponent(error ? authErrorMessage(error, "login") : "Unable to sign in")}`);

  await supabase
    .from("user_sessions")
    .update({ is_active: false, revoked_at: new Date().toISOString() })
    .eq("user_id", data.user.id)
    .eq("is_active", true);

  const { data: activeSession, error: sessionError } = await supabase
    .from("user_sessions")
    .insert({ user_id: data.user.id, device_label: await getDeviceLabel() })
    .select("id")
    .single();

  if (sessionError || !activeSession) {
    await supabase.auth.signOut();
    redirect("/login?error=Unable%20to%20start%20a%20secure%20session");
  }

  const cookieStore = await cookies();
  cookieStore.set(ACTIVE_SESSION_COOKIE, activeSession.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single();
  redirect(profile?.role === "admin" ? "/admin" : "/dashboard");
}

export async function signUp(formData: FormData) {
  if (!hasPublicSupabaseEnv()) redirect("/signup?error=auth_unavailable");
  const existingSession = await getAuthenticatedUser();
  if (existingSession) redirect(existingSession.profile?.role === "admin" ? "/admin" : "/dashboard");

  const fullName = value(formData, "name");
  const phone = value(formData, "phone");
  const email = value(formData, "email");
  const password = value(formData, "password");

  if (!fullName || !phone || !email || password.length < 8) {
    redirect("/signup?error=Please%20complete%20all%20fields%20and%20use%20an%208-character%20password");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, phone } }
  });

  if (error) redirect(`/signup?error=${encodeURIComponent(authErrorMessage(error, "signup"))}`);
  redirect("/login?message=Account%20created.%20Confirm%20your%20email%20before%20signing%20in.");
}

export async function signOut() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(ACTIVE_SESSION_COOKIE)?.value;
  if (sessionId) {
    await supabase.from("user_sessions").update({ is_active: false, revoked_at: new Date().toISOString() }).eq("id", sessionId);
  }
  cookieStore.delete(ACTIVE_SESSION_COOKIE);
  await supabase.auth.signOut();
  redirect("/login?message=You%20have%20been%20signed%20out.");
}
