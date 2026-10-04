import { notFound, redirect } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { enrollInCourse } from "@/app/dashboard/actions";
import { requireUser } from "@/lib/auth";
import styles from "../../dashboard.module.css";

export default async function EnrollPage({ params, searchParams }: { params: Promise<{ courseId: string }>; searchParams: Promise<{ error?: string }> }) {
  const { courseId } = await params;
  const { error } = await searchParams;
  const { user, profile, supabase } = await requireUser();
  const [{ data: course }, { data: existing }] = await Promise.all([
    supabase.from("courses").select("*").eq("id", courseId).single(),
    supabase.from("course_enrollments").select("id").eq("user_id", user.id).eq("course_id", courseId).maybeSingle()
  ]);
  if (!course) notFound();
  if (existing) redirect("/dashboard?message=registered");
  return <div className={styles.page}><div className={styles.pageHeader}><div><p className={styles.eyebrow}>{course.division}</p><h1>Register for <span>{course.title}</span></h1><p>Share a few details, then WhatsApp the academy to complete payment.</p></div></div><section className={`${styles.panel} ${styles.enrollmentPanel}`}>{error ? <div className={styles.notice}>{error}</div> : null}<form action={enrollInCourse} className={styles.form}><input type="hidden" name="course_id" value={course.id} /><div className={styles.formGrid}><label>Student name<input name="student_name" defaultValue={profile?.full_name ?? ""} required /></label><label>Phone<input name="phone" defaultValue={profile?.phone ?? ""} required /></label><label>Age<input name="age" type="number" min="4" max="100" required /></label><label>Preferred batch<input name="preferred_batch" placeholder="Weekday evening, weekend..." /></label><label>Learning mode<span className={styles.selectShell}><select name="learning_mode" defaultValue="online"><option value="online">Online learning</option><option value="offline">Studio learning</option></select><ChevronDown aria-hidden size={17} /></span></label><label>Experience level<span className={styles.selectShell}><select name="experience_level" defaultValue="beginner"><option value="beginner">Beginner - starting fresh</option><option value="intermediate">Intermediate - building fluency</option><option value="advanced">Advanced - refining performance</option></select><ChevronDown aria-hidden size={17} /></span></label></div><label>Anything your instructor should know?<textarea name="message" placeholder="Goals, prior learning, preferred genres..." /></label><button className={styles.primaryButton} type="submit">Register and continue to WhatsApp</button></form></section></div>;
}
