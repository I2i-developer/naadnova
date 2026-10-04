import Image from "next/image";
import Link from "next/link";
import { AudioLines, Radio } from "lucide-react";

import { signIn } from "@/app/auth/actions";
import { AuthSubmitButton } from "@/components/forms/AuthSubmitButton";
import { PasswordField } from "@/components/forms/PasswordField";
import { getAuthenticatedUser } from "@/lib/auth";
import { hasPublicSupabaseEnv } from "@/lib/env";
import { redirect } from "next/navigation";

import styles from "./page.module.css";

// Session redirects depend on the current request, not the build environment.
export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const authConfigured = hasPublicSupabaseEnv();
  const auth = authConfigured ? await getAuthenticatedUser() : null;
  if (auth) redirect(auth.profile?.role === "admin" ? "/admin" : "/dashboard");

  const params = await searchParams;
  const feedback = !authConfigured || params.error === "auth_unavailable"
    ? "Sign-in is temporarily unavailable. Please try again later or contact the academy."
    : params.error === "idle_timeout"
    ? "You were signed out after 30 minutes without activity. Sign in to continue."
    : params.error === "session_expired"
      ? "Your session is no longer active. Please sign in again."
      : params.error ?? params.message;
  return (
    <section className={styles.loginPage}>
      <div className={styles.brandStage} aria-hidden>
        <video className={styles.stageVideo} autoPlay muted loop playsInline poster="/logo.PNG">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className={styles.stageShade} />
        <div className={styles.stageGrid} />
        <div className={styles.signalLine} />

        <div className={styles.logoFrame}>
          <Image src="/logo.PNG" alt="" width={1717} height={916} priority />
        </div>
      </div>

      <div className={styles.formSide}>
        <div className={styles.formWrap}>
          <div className={styles.formHeader}>
            <h1>Enter the Flow</h1>
            <p>Initialize your connection to the resonance.</p>
          </div>

          {feedback ? <p role="status" className={!authConfigured || params.error ? styles.error : styles.success}>{feedback}</p> : null}

          <form className={styles.form} action={signIn} aria-label="Student login">
            <label>
              <span>
                <Radio aria-hidden size={15} />
                Transmission (Alias)
              </span>
              <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
            </label>

            <label>
              <span>
                <AudioLines aria-hidden size={15} />
                Frequency (Key)
              </span>
              <PasswordField />
            </label>

            <div className={styles.formLinks}>
              <label>
                <input type="checkbox" name="remember" />
                <span>Stay tuned</span>
              </label>
              <Link href="/contact">Forgot Signal?</Link>
            </div>

            <AuthSubmitButton className={styles.submitButton} label="Establish Connection" pendingLabel="Connecting..." disabled={!authConfigured} />
          </form>

          <p className={styles.signupLine}>
            New to the network? <Link href="/signup">Join the Resonance</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
