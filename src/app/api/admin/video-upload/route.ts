import { NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const auth = await getAuthenticatedUser();
  if (!auth || auth.profile?.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json() as { courseId?: string; fileName?: string };
  if (!body.courseId || !body.fileName) return NextResponse.json({ error: "Missing upload details" }, { status: 400 });

  const safeName = body.fileName.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  const path = `${body.courseId}/${crypto.randomUUID()}-${safeName || "lesson.mp4"}`;
  const admin = createAdminClient();
  const { data, error } = await admin.storage.from("course-videos").createSignedUploadUrl(path);
  if (error || !data) return NextResponse.json({ error: error?.message ?? "Unable to prepare upload" }, { status: 500 });
  return NextResponse.json({ path: data.path, token: data.token });
}
