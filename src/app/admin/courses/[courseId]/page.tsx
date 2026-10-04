import { notFound } from "next/navigation";

import { createChapter, createVideo, deleteContent, toggleVideo, updateChapter, updateCourse, updateVideo } from "@/app/admin/actions";
import { VideoUploadField } from "@/components/dashboard/VideoUploadField";
import { requireAdmin } from "@/lib/auth";
import styles from "@/app/dashboard/dashboard.module.css";

export default async function AdminCoursePage({ params, searchParams }: { params: Promise<{ courseId: string }>; searchParams: Promise<{ error?: string; message?: string }> }) {
  const { courseId } = await params;
  const feedback = await searchParams;
  const { supabase } = await requireAdmin();
  const [{ data: course }, { data: chapters }, { data: videos }] = await Promise.all([
    supabase.from("courses").select("*").eq("id", courseId).single(),
    supabase.from("course_chapters").select("*").eq("course_id", courseId).order("order_index"),
    supabase.from("course_videos").select("*").eq("course_id", courseId).order("order_index")
  ]);
  if (!course) notFound();

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}><div><p className={styles.eyebrow}>Course editor</p><h1>{course.title}</h1><p>Changes to published lessons are visible to approved students.</p></div></div>
      {feedback.error || feedback.message ? <div className={styles.notice}>{feedback.error ?? feedback.message}</div> : null}
      <section className={styles.panel}>
        <h2>Course details</h2>
        <form className={styles.form} action={updateCourse}>
          <input type="hidden" name="id" value={course.id} />
          <div className={styles.formGrid}>
            <label>Title<input name="title" defaultValue={course.title} required /></label><label>Slug<input name="slug" defaultValue={course.slug} required /></label>
            <label>Division<input name="division" defaultValue={course.division ?? ""} /></label><label>Instrument<input name="instrument" defaultValue={course.instrument} required /></label>
            <label>Duration<input name="duration" defaultValue={course.duration ?? ""} /></label><label>Mode<select name="mode" defaultValue={course.mode ?? "both"}><option value="both">Online / Offline</option><option value="online">Online</option><option value="offline">Offline</option></select></label>
          </div>
          <label>Short description<textarea name="short_description" defaultValue={course.short_description ?? ""} /></label><label>Description<textarea name="description" defaultValue={course.description ?? ""} /></label>
          <label><span><input type="checkbox" name="is_published" defaultChecked={course.is_published} /> Published</span></label><button className={styles.primaryButton} type="submit">Save course</button>
        </form>
      </section>
      <section className={styles.panel}>
        <h2>Add chapter</h2><form className={styles.form} action={createChapter}><input type="hidden" name="course_id" value={course.id} /><div className={styles.formGrid}><label>Title<input name="title" required /></label><label>Order<input name="order_index" type="number" defaultValue={(chapters?.length ?? 0) + 1} /></label></div><label>Description<textarea name="description" /></label><button className={styles.primaryButton}>Add chapter</button></form>
      </section>
      <section className={styles.panel}>
        <h2>Add lesson video</h2>
        {chapters?.length ? <form className={styles.form} action={createVideo}><input type="hidden" name="course_id" value={course.id} /><VideoUploadField courseId={course.id} /><div className={styles.formGrid}><label>Chapter<select name="chapter_id">{chapters.map((chapter) => <option key={chapter.id} value={chapter.id}>{chapter.title}</option>)}</select></label><label>Title<input name="title" required /></label><label>External video URL<input name="video_url" type="url" placeholder="Optional fallback" /></label><label>Duration<input name="duration" placeholder="08:30" /></label><label>Order<input name="order_index" type="number" defaultValue={(videos?.length ?? 0) + 1} /></label></div><label>Description<textarea name="description" /></label><label><span><input type="checkbox" name="is_published" /> Publish now</span></label><button className={styles.primaryButton}>Add video</button></form> : <div className={styles.empty}>Create a chapter before adding videos.</div>}
      </section>
      <div className={styles.list}>{chapters?.map((chapter) => <article className={styles.panel} key={chapter.id}>
        <details><summary>{chapter.order_index}. {chapter.title} · Edit chapter</summary><form className={styles.compactForm} action={updateChapter}><input type="hidden" name="id" value={chapter.id} /><input type="hidden" name="course_id" value={course.id} /><input name="title" defaultValue={chapter.title} required /><input name="order_index" type="number" defaultValue={chapter.order_index} /><input name="description" defaultValue={chapter.description ?? ""} placeholder="Description" /><button className={styles.smallButton}>Save</button></form></details>
        <div className={styles.inlineActions}><form action={deleteContent}><input type="hidden" name="kind" value="chapter" /><input type="hidden" name="id" value={chapter.id} /><input type="hidden" name="course_id" value={course.id} /><button className={`${styles.smallButton} ${styles.danger}`}>Delete chapter</button></form></div>
        <div className={styles.list}>{videos?.filter((video) => video.chapter_id === chapter.id).map((video) => <details className={styles.lessonEditor} key={video.id}><summary><span>{video.title}</span><small>{video.is_published ? "Published" : "Draft"} · {video.duration || "No duration"}</small></summary><form className={styles.compactForm} action={updateVideo}><input type="hidden" name="id" value={video.id} /><input type="hidden" name="course_id" value={course.id} /><input name="title" defaultValue={video.title} required /><input name="duration" defaultValue={video.duration ?? ""} placeholder="Duration" /><input name="order_index" type="number" defaultValue={video.order_index} /><input name="storage_path" defaultValue={video.storage_path ?? ""} placeholder="Storage path" /><input name="video_url" defaultValue={video.video_url ?? ""} placeholder="External URL" /><input name="description" defaultValue={video.description ?? ""} placeholder="Description" /><button className={styles.smallButton}>Save lesson</button></form><div className={styles.inlineActions}><form action={toggleVideo}><input type="hidden" name="id" value={video.id} /><input type="hidden" name="course_id" value={course.id} /><input type="hidden" name="published" value={String(video.is_published)} /><button className={styles.smallButton}>{video.is_published ? "Unpublish" : "Publish"}</button></form><form action={deleteContent}><input type="hidden" name="kind" value="video" /><input type="hidden" name="id" value={video.id} /><input type="hidden" name="course_id" value={course.id} /><button className={`${styles.smallButton} ${styles.danger}`}>Delete</button></form></div></details>)}</div>
      </article>)}</div>
    </div>
  );
}
