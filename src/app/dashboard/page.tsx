import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { CourseCatalog } from "@/components/dashboard/CourseCatalog";
import { requireUser } from "@/lib/auth";

import styles from "./dashboard.module.css";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ message?: string; error?: string }> }) {
  const { user, profile, supabase } = await requireUser();
  const params = await searchParams;
  const [{ data: courses }, { data: enrollments }] = await Promise.all([
    supabase.from("courses").select("*").eq("is_published", true).order("sort_order"),
    supabase.from("course_enrollments").select("*").eq("user_id", user.id)
  ]);
  const approvedCount = enrollments?.filter((item) => item.status === "approved" && item.payment_status === "paid").length ?? 0;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div><h1>Welcome back, <span>{profile?.full_name?.split(" ")[0] ?? "student"}</span></h1><p>Your practice room, course access, and academy updates in one place.</p></div>
        <span className={styles.userId}>STUDENT ID / {profile?.student_code ?? "PENDING"}</span>
      </div>

      {params.message === "registered" ? <div className={styles.notice}><AlertCircle size={18} /><span>Registration received. Complete payment on WhatsApp; access will be provided after admin confirmation. Add your WhatsApp number to the deployment environment to enable the automatic handoff.</span></div> : null}
      {params.error ? <div className={styles.notice}><AlertCircle size={18} /><span>{params.error}</span></div> : null}

      <section className={styles.heroPanel}>
        <div><p className={styles.eyebrow}>Your learning signal</p><h2>{approvedCount ? `${approvedCount} course${approvedCount > 1 ? "s" : ""} ready for practice.` : "Choose your first path and begin creating."}</h2><p>Lessons unlock after registration and payment confirmation by the academy.</p></div>
        <div className={styles.pulse} aria-hidden>{Array.from({ length: 18 }, (_, i) => <i key={i} />)}</div>
      </section>

      <div className={styles.sectionHead}><div><h2>Course paths</h2><p>Structured training from foundations to stage confidence.</p></div><Link href="/dashboard/courses">View learning room</Link></div>
      {courses?.length ? <CourseCatalog courses={courses} enrollments={enrollments ?? []} /> : <div className={styles.empty}>Courses will appear here after the Supabase migration is applied.</div>}
    </div>
  );
}
