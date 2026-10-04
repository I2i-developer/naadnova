import { updateEnrollment } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import styles from "@/app/dashboard/dashboard.module.css";

export default async function AdminEnrollmentsPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { supabase } = await requireAdmin();
  const { error } = await searchParams;
  const { data: enrollments } = await supabase.from("course_enrollments").select("*").order("created_at", { ascending: false });
  const userIds = [...new Set((enrollments ?? []).map((item) => item.user_id))];
  const courseIds = [...new Set((enrollments ?? []).map((item) => item.course_id))];
  const [{ data: profiles }, { data: courses }, { data: registrations }] = await Promise.all([
    userIds.length ? supabase.from("profiles").select("id, full_name, email, phone, student_code").in("id", userIds) : Promise.resolve({ data: [] }),
    courseIds.length ? supabase.from("courses").select("id, title").in("id", courseIds) : Promise.resolve({ data: [] }),
    supabase.from("course_registration_details").select("*")
  ]);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}><div><h1>Enrollment <span>approvals</span></h1><p>Payment and access decisions with the student context beside them.</p></div></div>
      {error ? <div className={styles.notice}>{error}</div> : null}
      <div className={styles.list}>
        {enrollments?.length ? enrollments.map((enrollment) => {
          const profile = profiles?.find((item) => item.id === enrollment.user_id);
          const course = courses?.find((item) => item.id === enrollment.course_id);
          const registration = registrations?.find((item) => item.enrollment_id === enrollment.id);
          return (
            <article className={styles.listItem} key={enrollment.id}>
              <div><strong>{profile?.full_name ?? "Student"}</strong><small>Student ID: {profile?.student_code ?? "Pending"}</small><small>{profile?.email} / Course ref: {enrollment.enrollment_code}</small><small>{registration?.phone} / {registration?.learning_mode} / {registration?.preferred_batch || "No batch preference"}</small></div>
              <div><strong>{course?.title ?? "Course"}</strong><small>{enrollment.status}</small></div>
              <div><strong>{enrollment.payment_status.replaceAll("_", " ")}</strong><small>{new Date(enrollment.created_at).toLocaleDateString("en-IN")}</small></div>
              <div className={styles.inlineActions}>
                {["paid", "approve", "reject"].map((intent) => <form action={updateEnrollment} key={intent}><input type="hidden" name="id" value={enrollment.id} /><button className={`${styles.smallButton} ${intent === "reject" ? styles.danger : ""}`} name="intent" value={intent}>{intent === "paid" ? "Mark paid" : intent}</button></form>)}
              </div>
              <form className={styles.noteForm} action={updateEnrollment}><input type="hidden" name="id" value={enrollment.id} /><input type="hidden" name="intent" value="note" /><input name="admin_notes" defaultValue={enrollment.admin_notes ?? ""} placeholder="Private admin note" /><button className={styles.smallButton}>Save note</button></form>
            </article>
          );
        }) : <div className={styles.empty}>No enrollments yet.</div>}
      </div>
    </div>
  );
}
