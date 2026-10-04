import { setUserAccess } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import styles from "@/app/dashboard/dashboard.module.css";

export default async function AdminUsersPage() {
  const { supabase } = await requireAdmin();
  const [{ data: users }, { data: courses }, { data: enrollments }] = await Promise.all([
    supabase.from("profiles").select("*").eq("role", "user").order("created_at", { ascending: false }),
    supabase.from("courses").select("id, title").order("sort_order"),
    supabase.from("course_enrollments").select("*")
  ]);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}><div><h1>Student <span>directory</span></h1><p>See enrollment context and manually grant or revoke access.</p></div></div>
      <div className={styles.list}>{users?.length ? users.map((user) => {
        const studentEnrollments = enrollments?.filter((item) => item.user_id === user.id) ?? [];
        return <article className={styles.panel} key={user.id}>
          <div className={styles.sectionHead}><div><h3>{user.full_name ?? "Student"}</h3><p>{user.student_code} / {user.email} / {user.phone}</p></div></div>
          <div className={styles.list}>{courses?.map((course) => {
            const enrollment = studentEnrollments.find((item) => item.course_id === course.id);
            const approved = enrollment?.status === "approved";
            return <div className={styles.listItem} key={course.id}><div><strong>{course.title}</strong><small>{enrollment ? `${enrollment.enrollment_code} / ${enrollment.status} / ${enrollment.payment_status}` : "Not enrolled"}</small></div><form action={setUserAccess}><input type="hidden" name="user_id" value={user.id} /><input type="hidden" name="course_id" value={course.id} /><button className={`${styles.smallButton} ${approved ? styles.danger : ""}`} name="intent" value={approved ? "revoke" : "grant"}>{approved ? "Revoke access" : "Grant access"}</button></form></div>;
          })}</div>
        </article>;
      }) : <div className={styles.empty}>No students have signed up yet.</div>}</div>
    </div>
  );
}
