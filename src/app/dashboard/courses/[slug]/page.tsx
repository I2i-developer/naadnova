import { notFound } from "next/navigation";
import { LockKeyhole } from "lucide-react";

import { SecureVideo } from "@/components/dashboard/SecureVideo";
import { requireUser } from "@/lib/auth";
import { env } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import styles from "../../dashboard.module.css";

export default async function CoursePlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { user, supabase } = await requireUser();
  const { data: course } = await supabase.from("courses").select("*").eq("slug", slug).single();
  if (!course) notFound();

  const { data: enrollment } = await supabase.from("course_enrollments").select("*").eq("user_id", user.id).eq("course_id", course.id).maybeSingle();
  const hasAccess = enrollment?.status === "approved" && enrollment.payment_status === "paid";
  if (!hasAccess) {
    return <div className={styles.page}><div className={styles.pageHeader}><div><h1>{course.title}</h1><p>Your course registration is visible, but lessons remain private until payment and access are approved.</p></div></div><div className={styles.empty}><LockKeyhole size={34} /><p>Course access is locked</p></div></div>;
  }

  const [{ data: chapters }, { data: videos }] = await Promise.all([
    supabase.from("course_chapters").select("*").eq("course_id", course.id).order("order_index"),
    supabase.from("course_videos").select("*").eq("course_id", course.id).eq("is_published", true).order("order_index")
  ]);

  const signedSources = new Map<string, string>();
  if (env.supabaseServiceRoleKey) {
    const admin = createAdminClient();
    await Promise.all((videos ?? []).filter((video) => video.storage_path).map(async (video) => {
      const { data } = await admin.storage.from("course-videos").createSignedUrl(video.storage_path!, 60 * 15);
      if (data?.signedUrl) signedSources.set(video.id, data.signedUrl);
    }));
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}><div><p className={styles.eyebrow}>{course.division}</p><h1>{course.title}</h1><p>{course.description}</p></div></div>
      {chapters?.length ? chapters.map((chapter, index) => {
        const chapterVideos = (videos ?? []).filter((video) => video.chapter_id === chapter.id);
        return <details className={styles.chapter} key={chapter.id} open={index === 0}><summary>{String(index + 1).padStart(2, "0")} · {chapter.title}</summary><div className={styles.videoGrid}>{chapterVideos.length ? chapterVideos.map((video) => {
          const source = signedSources.get(video.id) ?? video.video_url;
          return <article className={styles.videoCard} key={video.id}>{source ? <SecureVideo src={source} title={video.title} /> : null}<div><h3>{video.title}</h3><p>{video.description ?? video.duration ?? "Lesson video"}</p></div></article>;
        }) : <div className={styles.empty}>Lessons for this chapter are being prepared.</div>}</div></details>;
      }) : <div className={styles.empty}>Your course is approved. Chapters will appear as the academy publishes them.</div>}
      {/* Browser controls reduce casual downloading but cannot guarantee copy protection. Private storage, short-lived signed URLs, and optional per-user watermarking provide stronger protection. */}
    </div>
  );
}
