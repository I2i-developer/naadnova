import { CourseCatalog } from "@/components/dashboard/CourseCatalog";
import { requireUser } from "@/lib/auth";
import styles from "../dashboard.module.css";

export default async function DashboardCoursesPage() {
  const { user, supabase } = await requireUser();
  const [{ data: courses }, { data: enrollments }] = await Promise.all([
    supabase.from("courses").select("*").eq("is_published", true).order("sort_order"),
    supabase.from("course_enrollments").select("*").eq("user_id", user.id)
  ]);
  return <div className={styles.page}><div className={styles.pageHeader}><div><h1>My <span>learning room</span></h1><p>Explore every path and continue the courses available to you.</p></div></div>{courses?.length ? <CourseCatalog courses={courses} enrollments={enrollments ?? []} /> : <div className={styles.empty}>No published courses yet.</div>}</div>;
}
