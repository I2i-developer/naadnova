import { NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/lib/auth";

export async function POST() {
  const auth = await getAuthenticatedUser();
  if (!auth) return NextResponse.json({ authenticated: false }, { status: 401 });

  const now = new Date().toISOString();
  const { error } = await auth.supabase
    .from("user_sessions")
    .update({ last_seen_at: now })
    .eq("id", auth.sessionId)
    .eq("user_id", auth.user.id)
    .eq("is_active", true);

  if (error) return NextResponse.json({ authenticated: false }, { status: 401 });
  return NextResponse.json({ authenticated: true, lastSeenAt: now });
}
