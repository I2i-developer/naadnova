"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { env } from "@/lib/env";
import { requireUser } from "@/lib/auth";

function field(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function enrollInCourse(formData: FormData) {
  const { user, profile, supabase } = await requireUser();
  const courseId = field(formData, "course_id");
  const studentName = field(formData, "student_name");
  const phone = field(formData, "phone");
  const learningMode = field(formData, "learning_mode") as "online" | "offline";
  const age = Number(field(formData, "age"));

  if (!courseId || !studentName || !phone || !["online", "offline"].includes(learningMode)) {
    redirect(`/dashboard/enroll/${courseId}?error=Please%20complete%20all%20required%20fields`);
  }

  const { data: course } = await supabase.from("courses").select("title").eq("id", courseId).single();
  if (!course) redirect("/dashboard/courses?error=Course%20not%20found");

  const { data: enrollment, error: enrollmentError } = await supabase
    .from("course_enrollments")
    .insert({ user_id: user.id, course_id: courseId, status: "payment_pending", payment_status: "pending_confirmation" })
    .select("id, enrollment_code")
    .single();

  if (enrollmentError || !enrollment) {
    redirect(`/dashboard/enroll/${courseId}?error=${encodeURIComponent(enrollmentError?.message ?? "Unable to enroll")}`);
  }

  const { error: detailsError } = await supabase.from("course_registration_details").insert({
    enrollment_id: enrollment.id,
    user_id: user.id,
    course_id: courseId,
    student_name: studentName,
    phone,
    age: Number.isFinite(age) ? age : null,
    preferred_batch: field(formData, "preferred_batch") || null,
    learning_mode: learningMode,
    experience_level: field(formData, "experience_level") || null,
    message: field(formData, "message") || null
  });

  if (detailsError) {
    await supabase.from("course_enrollments").delete().eq("id", enrollment.id);
    redirect(`/dashboard/enroll/${courseId}?error=${encodeURIComponent(detailsError.message)}`);
  }

  const message = `Hello Naadnova Academy, I want to complete payment for ${course.title}. My Student ID is ${profile?.student_code ?? user.id}. My course reference is ${enrollment.enrollment_code}. My name is ${studentName} and phone number is ${phone}. Please share payment details.`;
  const number = (env.whatsappNumber ?? "").replace(/\D/g, "");
  revalidatePath("/dashboard");
  if (number) redirect(`https://wa.me/${number}?text=${encodeURIComponent(message)}`);
  redirect("/dashboard?message=registered");
}

export async function updateProfile(formData: FormData) {
  const { user, supabase } = await requireUser();
  const { error } = await supabase.from("profiles").update({
    full_name: field(formData, "full_name"),
    phone: field(formData, "phone")
  }).eq("id", user.id);
  if (error) redirect(`/dashboard/profile?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard/profile?message=Profile%20updated");
}
