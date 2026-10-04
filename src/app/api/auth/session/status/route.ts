import { NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/lib/auth";

export async function GET() {
  const auth = await getAuthenticatedUser();
  if (!auth) return NextResponse.json({ authenticated: false });

  return NextResponse.json({
    authenticated: true,
    dashboardHref: auth.profile?.role === "admin" ? "/admin" : "/dashboard",
    lastSeenAt: auth.activeSession.last_seen_at
  });
}
