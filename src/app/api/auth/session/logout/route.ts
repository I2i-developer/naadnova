import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ACTIVE_SESSION_COOKIE } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(ACTIVE_SESSION_COOKIE)?.value;

  if (sessionId) {
    await supabase
      .from("user_sessions")
      .update({ is_active: false, revoked_at: new Date().toISOString() })
      .eq("id", sessionId);
  }

  await supabase.auth.signOut();
  cookieStore.delete(ACTIVE_SESSION_COOKIE);
  return NextResponse.json({ signedOut: true });
}
