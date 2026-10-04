import Link from "next/link";

import { createCourse } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import styles from "@/app/dashboard/dashboard.module.css";

export default async function AdminCoursesPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { supabase } = await requireAdmin();
  const { error } = await searchParams;
  const { data: courses } = await supabase.from("courses").select("*").order("sort_order");
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}><div><h1>Course <span>studio</span></h1><p>Build the curriculum, sequence chapters, and publish lessons.</p></div></div>
      {error ? <div className={styles.notice}>{error}</div> : null}
      <section className={styles.panel}><h2>Create a course</h2><form className={styles.form} action={createCourse}><div className={styles.formGrid}><label>Title<input name="title" required /></label><label>Course code<input name="course_code" placeholder="GTR" minLength={2} maxLength={6} required /></label><label>Slug<input name="slug" placeholder="guitar-studies" required /></label><label>Division<input name="division" placeholder="Instrumental Division" /></label><label>Instrument<input name="instrument" required /></label><label>Duration<input name="duration" placeholder="3 to 6 months" /></label><label>Mode<select name="mode" defaultValue="both"><option value="both">Online / Offline</option><option value="online">Online</option><option value="offline">Offline</option></select></label></div><label>Short description<textarea name="short_description" /></label><button className={styles.primaryButton} type="submit">Create draft course</button></form></section>
      <div className={styles.list}>{courses?.map((course) => <article className={styles.listItem} key={course.id}><div><strong>{course.title}</strong><small>{course.course_code} / {course.division} / {course.instrument}</small></div><div><strong>{course.is_published ? "Published" : "Draft"}</strong><small>{course.slug}</small></div><div><small>{course.duration ?? "No duration"}</small></div><Link className={styles.smallButton} href={`/admin/courses/${course.id}`}>Manage</Link></article>)}</div>
    </div>
  );
}
