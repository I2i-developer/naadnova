"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth";

function field(formData: FormData, key: string) { return String(formData.get(key) ?? "").trim(); }
function nullable(formData: FormData, key: string) { return field(formData, key) || null; }

export async function updateEnrollment(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = field(formData, "id");
  const intent = field(formData, "intent");
  const updates = intent === "paid"
    ? { payment_status: "paid" as const }
    : intent === "approve"
      ? { status: "approved" as const, payment_status: "paid" as const, approved_at: new Date().toISOString() }
      : intent === "reject"
        ? { status: "rejected" as const }
        : { admin_notes: nullable(formData, "admin_notes") };
  const { error } = await supabase.from("course_enrollments").update(updates).eq("id", id);
  if (error) redirect(`/admin/enrollments?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/admin", "layout");
}

export async function createCourse(formData: FormData) {
  const { supabase } = await requireAdmin();
  const title = field(formData, "title");
  const { data, error } = await supabase.from("courses").insert({
    title,
    course_code: field(formData, "course_code").toUpperCase(),
    slug: field(formData, "slug"),
    division: nullable(formData, "division"),
    instrument: field(formData, "instrument"),
    short_description: nullable(formData, "short_description"),
    description: nullable(formData, "description"),
    duration: nullable(formData, "duration"),
    mode: (field(formData, "mode") || "both") as "online" | "offline" | "both",
    status: "draft",
    is_published: false
  }).select("id").single();
  if (error || !data) redirect(`/admin/courses?error=${encodeURIComponent(error?.message ?? "Unable to create course")}`);
  redirect(`/admin/courses/${data.id}`);
}

export async function updateCourse(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = field(formData, "id");
  const published = formData.get("is_published") === "on";
  const { error } = await supabase.from("courses").update({
    title: field(formData, "title"), slug: field(formData, "slug"), division: nullable(formData, "division"),
    instrument: field(formData, "instrument"), short_description: nullable(formData, "short_description"),
    description: nullable(formData, "description"), duration: nullable(formData, "duration"),
    mode: field(formData, "mode") as "online" | "offline" | "both", is_published: published,
    status: published ? "published" : "draft"
  }).eq("id", id);
  if (error) redirect(`/admin/courses/${id}?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/admin/courses", "layout");
  redirect(`/admin/courses/${id}?message=Course%20saved`);
}

export async function createChapter(formData: FormData) {
  const { supabase } = await requireAdmin();
  const courseId = field(formData, "course_id");
  const { error } = await supabase.from("course_chapters").insert({ course_id: courseId, title: field(formData, "title"), description: nullable(formData, "description"), order_index: Number(field(formData, "order_index") || 0) });
  if (error) redirect(`/admin/courses/${courseId}?error=${encodeURIComponent(error.message)}`);
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function createVideo(formData: FormData) {
  const { supabase } = await requireAdmin();
  const courseId = field(formData, "course_id");
  const { error } = await supabase.from("course_videos").insert({
    course_id: courseId, chapter_id: field(formData, "chapter_id"), title: field(formData, "title"),
    description: nullable(formData, "description"), storage_path: nullable(formData, "storage_path"),
    video_url: nullable(formData, "video_url"), duration: nullable(formData, "duration"),
    order_index: Number(field(formData, "order_index") || 0), is_published: formData.get("is_published") === "on"
  });
  if (error) redirect(`/admin/courses/${courseId}?error=${encodeURIComponent(error.message)}`);
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function updateChapter(formData: FormData) {
  const { supabase } = await requireAdmin();
  const courseId = field(formData, "course_id");
  const { error } = await supabase.from("course_chapters").update({
    title: field(formData, "title"), description: nullable(formData, "description"),
    order_index: Number(field(formData, "order_index") || 0)
  }).eq("id", field(formData, "id"));
  if (error) redirect(`/admin/courses/${courseId}?error=${encodeURIComponent(error.message)}`);
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function updateVideo(formData: FormData) {
  const { supabase } = await requireAdmin();
  const courseId = field(formData, "course_id");
  const { error } = await supabase.from("course_videos").update({
    title: field(formData, "title"), description: nullable(formData, "description"),
    duration: nullable(formData, "duration"), order_index: Number(field(formData, "order_index") || 0),
    storage_path: nullable(formData, "storage_path"), video_url: nullable(formData, "video_url")
  }).eq("id", field(formData, "id"));
  if (error) redirect(`/admin/courses/${courseId}?error=${encodeURIComponent(error.message)}`);
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function toggleVideo(formData: FormData) {
  const { supabase } = await requireAdmin();
  const courseId = field(formData, "course_id");
  await supabase.from("course_videos").update({ is_published: field(formData, "published") !== "true" }).eq("id", field(formData, "id"));
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function deleteContent(formData: FormData) {
  const { supabase } = await requireAdmin();
  const courseId = field(formData, "course_id");
  const kind = field(formData, "kind");
  const id = field(formData, "id");
  if (kind === "video") await supabase.from("course_videos").delete().eq("id", id);
  if (kind === "chapter") await supabase.from("course_chapters").delete().eq("id", id);
  if (kind === "course") {
    await supabase.from("courses").delete().eq("id", id);
    redirect("/admin/courses");
  }
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function setUserAccess(formData: FormData) {
  const { supabase } = await requireAdmin();
  const userId = field(formData, "user_id");
  const courseId = field(formData, "course_id");
  const grant = field(formData, "intent") === "grant";
  if (grant) {
    await supabase.from("course_enrollments").upsert({ user_id: userId, course_id: courseId, status: "approved", payment_status: "paid", approved_at: new Date().toISOString() }, { onConflict: "user_id,course_id" });
  } else {
    await supabase.from("course_enrollments").update({ status: "rejected" }).eq("user_id", userId).eq("course_id", courseId);
  }
  revalidatePath("/admin/users");
}

export async function updateAdminProfile(formData: FormData) {
  const { user, supabase } = await requireAdmin();
  const fullName = field(formData, "full_name");
  const phone = field(formData, "phone");

  if (!fullName) redirect("/admin/profile?error=Please%20enter%20your%20full%20name");

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, phone: phone || null })
    .eq("id", user.id);

  if (error) redirect(`/admin/profile?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/admin", "layout");
  redirect("/admin/profile?message=Admin%20profile%20updated");
}
