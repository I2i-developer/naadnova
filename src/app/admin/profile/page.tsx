import { Clock3, Fingerprint, Laptop, Mail, Phone, ShieldCheck } from "lucide-react";

import { updateAdminProfile } from "@/app/admin/actions";
import { ThemeSelector } from "@/components/dashboard/ThemeSelector";
import { requireAdmin } from "@/lib/auth";

import styles from "./profile.module.css";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "NA";
}

function formatDate(value: string | undefined) {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

export default async function AdminProfilePage({ searchParams }: { searchParams: Promise<{ message?: string; error?: string }> }) {
  const { user, profile, supabase, sessionId, activeSession } = await requireAdmin();
  const params = await searchParams;
  const { data: session } = await supabase
    .from("user_sessions")
    .select("device_label, created_at")
    .eq("id", sessionId)
    .maybeSingle();

  const displayName = profile?.full_name ?? user.email?.split("@")[0] ?? "Academy Admin";
  const joinedAt = user.created_at;

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p>Account settings</p>
          <h1>Admin <span>profile</span></h1>
          <small>Manage your academy identity, contact details, and dashboard preferences.</small>
        </div>
      </header>

      {params.message || params.error ? (
        <div className={`${styles.notice} ${params.error ? styles.error : ""}`} role="status">
          {params.message ?? params.error}
        </div>
      ) : null}

      <section className={styles.identity}>
        <div className={styles.avatar} aria-hidden>{initials(displayName)}</div>
        <div className={styles.identityCopy}>
          <div className={styles.role}><ShieldCheck size={14} aria-hidden /> Academy administrator</div>
          <h2>{displayName}</h2>
          <p>{profile?.email ?? user.email}</p>
        </div>
        <dl className={styles.identityMeta}>
          <div><dt>Account created</dt><dd>{formatDate(joinedAt)}</dd></div>
          <div><dt>Access level</dt><dd>Full academy access</dd></div>
        </dl>
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.detailsPanel}>
          <div className={styles.sectionHeading}>
            <div><p>Personal details</p><h2>Profile information</h2></div>
            <span>Used for academy administration</span>
          </div>
          <form className={styles.form} action={updateAdminProfile}>
            <div className={styles.fieldGrid}>
              <label>
                <span>Full name</span>
                <div><Fingerprint size={17} aria-hidden /><input name="full_name" defaultValue={profile?.full_name ?? ""} autoComplete="name" required /></div>
              </label>
              <label>
                <span>Phone number</span>
                <div><Phone size={17} aria-hidden /><input name="phone" type="tel" defaultValue={profile?.phone ?? ""} autoComplete="tel" placeholder="Add contact number" /></div>
              </label>
            </div>
            <label>
              <span>Email address</span>
              <div><Mail size={17} aria-hidden /><input value={profile?.email ?? user.email ?? ""} disabled /></div>
              <small>Email changes are managed through Supabase Authentication.</small>
            </label>
            <button type="submit">Save profile</button>
          </form>
        </section>

        <aside className={styles.securityPanel}>
          <div className={styles.sectionHeading}><div><p>Security</p><h2>Current session</h2></div></div>
          <div className={styles.sessionStatus}><i /><span><strong>Active and protected</strong><small>Only this approved session can access the dashboard.</small></span></div>
          <dl className={styles.sessionList}>
            <div><dt><Laptop size={16} aria-hidden /> Device</dt><dd>{session?.device_label ?? "Current browser"}</dd></div>
            <div><dt><Clock3 size={16} aria-hidden /> Signed in</dt><dd>{formatDate(session?.created_at)}</dd></div>
            <div><dt><ShieldCheck size={16} aria-hidden /> Last activity</dt><dd>{formatDate(activeSession.last_seen_at)}</dd></div>
          </dl>
          <div className={styles.adminId}><span>Admin account ID</span><code>{user.id}</code></div>
        </aside>
      </div>

      <ThemeSelector description="Choose a dashboard palette for focused academy management." />
    </div>
  );
}
