import Link from "next/link";
import { LockKeyhole, Mail, Phone, UserRound } from "lucide-react";

import { signUp } from "@/app/auth/actions";
import { AuthSubmitButton } from "@/components/forms/AuthSubmitButton";
import { getAuthenticatedUser } from "@/lib/auth";
import { hasPublicSupabaseEnv } from "@/lib/env";
import { redirect } from "next/navigation";

import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const authConfigured = hasPublicSupabaseEnv();
  const auth = authConfigured ? await getAuthenticatedUser() : null;
  if (auth) redirect(auth.profile?.role === "admin" ? "/admin" : "/dashboard");

  const { error } = await searchParams;
  const feedback = !authConfigured || error === "auth_unavailable"
    ? "Account creation is temporarily unavailable. Please try again later or contact the academy."
    : error;
  return (
    <section className={styles.signupPage}>
      <div className={styles.signupCard}>
        <div className={styles.formHeader}>
          <h1>Join the Resonance</h1>
          <span>Create your NaadNova account and begin your learning flow.</span>
        </div>

        {feedback ? <p role="status" className={styles.error}>{feedback}</p> : null}

        <form className={styles.form} action={signUp} aria-label="Student signup">
          <div className={styles.fieldGrid}>
            <label>
              <span>
                <UserRound aria-hidden size={15} />
                Learner Name
              </span>
              <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
            </label>

            <label>
              <span>
                <Phone aria-hidden size={15} />
                Contact
              </span>
              <input name="phone" type="tel" placeholder="Phone number" autoComplete="tel" required />
            </label>
          </div>

          <label>
            <span>
              <Mail aria-hidden size={15} />
              Email
            </span>
            <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          </label>

          <label>
            <span>
              <LockKeyhole aria-hidden size={15} />
              Password
            </span>
            <input
              name="password"
              type="password"
              placeholder="Create password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          <label className={styles.agreement}>
            <input type="checkbox" name="agreement" required />
            <span>I agree to the Terms of Service and Privacy Policy.</span>
          </label>

          <AuthSubmitButton className={styles.submitButton} label="Create Your Flow" pendingLabel="Creating account..." disabled={!authConfigured} />
        </form>

        <p className={styles.loginLine}>
          Already in the network? <Link href="/login">Enter the Flow</Link>
        </p>
      </div>
    </section>
  );
}
