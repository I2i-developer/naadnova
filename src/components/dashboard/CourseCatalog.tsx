import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Guitar, KeyboardMusic, LockKeyhole, MicVocal } from "lucide-react";

import type { Database } from "@/types/database";

import styles from "@/app/dashboard/dashboard.module.css";

type Course = Database["public"]["Tables"]["courses"]["Row"];
type Enrollment = Database["public"]["Tables"]["course_enrollments"]["Row"];

const icons = { Guitar, "Piano / Keyboard": KeyboardMusic, Vocals: MicVocal };

export function CourseCatalog({ courses, enrollments }: { courses: Course[]; enrollments: Enrollment[] }) {
  return (
    <div className={styles.courseGrid}>
      {courses.map((course, index) => {
        const enrollment = enrollments.find((item) => item.course_id === course.id);
        const Icon = icons[course.instrument as keyof typeof icons] ?? Guitar;
        const approved = enrollment?.status === "approved" && enrollment.payment_status === "paid";
        const label = approved ? "Continue course" : enrollment ? "View status" : "Enroll now";
        const href = approved ? `/dashboard/courses/${course.slug}` : enrollment ? "/dashboard" : `/dashboard/enroll/${course.id}`;
        const publicSlugs: Record<string, string> = { GTR: "guitar", KEY: "piano", VOC: "vocals" };
        const infoHref = `/courses/${publicSlugs[course.course_code] ?? course.slug}`;
        return (
          <article className={styles.courseCard} key={course.id} style={{ "--course-index": index } as React.CSSProperties}>
            <div className={styles.courseTop}>
              <span className={styles.courseIcon}><Icon size={23} aria-hidden /></span>
              <span className={`${styles.status} ${approved ? styles.approved : enrollment ? styles.pending : ""}`}>
                {approved ? <CheckCircle2 size={14} /> : enrollment ? <Clock3 size={14} /> : <LockKeyhole size={14} />}
                {approved ? "Access approved" : enrollment?.status === "rejected" ? "Needs attention" : enrollment ? "Payment pending" : "Not enrolled"}
              </span>
            </div>
            <p className={styles.eyebrow}>{course.division}</p>
            <h3>{course.title}</h3>
            <p>{course.short_description}</p>
            <div className={styles.courseMeta}><span>{course.duration ?? "Flexible path"}</span><span>{course.mode === "both" ? "Online / Offline" : course.mode}</span>{enrollment?.enrollment_code ? <span className={styles.learnerCode}>{enrollment.enrollment_code}</span> : null}</div>
            <div className={styles.courseActions}>
              <Link className={styles.infoAction} href={infoHref}>More info</Link>
              <Link className={styles.cardAction} href={href}>{label}<ArrowRight size={17} aria-hidden /></Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
