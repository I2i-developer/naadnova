import Link from "next/link";

import { requireAdmin } from "@/lib/auth";
import styles from "@/app/dashboard/dashboard.module.css";

export default async function AdminOverviewPage() {
  const { supabase } = await requireAdmin();
  const [users, enrollments, pending, approved, courses] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "user"),
    supabase.from("course_enrollments").select("id", { count: "exact", head: true }),
    supabase.from("course_enrollments").select("id", { count: "exact", head: true }).neq("payment_status", "paid"),
    supabase.from("course_enrollments").select("id", { count: "exact", head: true }).eq("status", "approved"),
    supabase.from("courses").select("id", { count: "exact", head: true })
  ]);
  const stats = [["Total students", users.count], ["Enrollments", enrollments.count], ["Pending payments", pending.count], ["Active students", approved.count], ["Courses", courses.count]];
  return <div className={styles.page}><div className={styles.pageHeader}><div><h1>Academy <span>control room</span></h1><p>Approve access, manage lessons, and keep every student moving.</p></div></div><div className={styles.statsGrid}>{stats.map(([label, count]) => <article className={styles.stat} key={String(label)}><span>{label}</span><strong>{count ?? 0}</strong></article>)}</div><section className={styles.heroPanel}><div><p className={styles.eyebrow}>Today’s priority</p><h2>{pending.count ? `${pending.count} payment ${pending.count === 1 ? "confirmation needs" : "confirmations need"} attention.` : "All payment confirmations are clear."}</h2><p>Review student details, record payment, and grant access from one queue.</p><Link className={styles.primaryButton} href="/admin/enrollments">Open approval queue</Link></div><div className={styles.pulse} aria-hidden>{Array.from({ length: 18 }, (_, i) => <i key={i} />)}</div></section></div>;
}
