import { updateProfile } from "@/app/dashboard/actions";
import { ThemeSelector } from "@/components/dashboard/ThemeSelector";
import { requireUser } from "@/lib/auth";
import styles from "../dashboard.module.css";

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ message?: string; error?: string }> }) {
  const { user, profile } = await requireUser();
  const params = await searchParams;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}><div><h1>Your <span>profile</span></h1><p>Keep your contact details current for batch and payment updates.</p></div></div>
      <ThemeSelector />
      <section className={styles.panel}>
        {params.message || params.error ? <div className={styles.notice}>{params.message ?? params.error}</div> : null}
        <form className={styles.form} action={updateProfile}>
          <div className={styles.formGrid}><label>Full name<input name="full_name" defaultValue={profile?.full_name ?? ""} required /></label><label>Phone<input name="phone" defaultValue={profile?.phone ?? ""} required /></label></div>
          <label>Email<input value={profile?.email ?? user.email ?? ""} disabled /></label>
          <label>Student ID<input value={profile?.student_code ?? "Student ID pending"} disabled /></label>
          <button className={styles.primaryButton} type="submit">Save profile</button>
        </form>
      </section>
    </div>
  );
}
