import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AudioLines, LockKeyhole, Radio } from "lucide-react";

import styles from "./page.module.css";

export default function LoginPage() {
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

          <form className={styles.form} action="/login" aria-label="Student login">
            <label>
              <span>
                <Radio aria-hidden size={15} />
                Transmission (Alias)
              </span>
              <input name="email" type="email" placeholder="user@frequency.com" autoComplete="email" />
            </label>

            <label>
              <span>
                <AudioLines aria-hidden size={15} />
                Frequency (Key)
              </span>
              <input
                name="password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
              />
            </label>

            <div className={styles.formLinks}>
              <label>
                <input type="checkbox" name="remember" />
                <span>Stay tuned</span>
              </label>
              <Link href="/contact">Forgot Signal?</Link>
            </div>

            <button className={styles.submitButton} type="submit">
              <LockKeyhole aria-hidden size={16} />
              <span>Establish Connection</span>
              <ArrowRight aria-hidden size={18} />
            </button>
          </form>

          <p className={styles.signupLine}>
            New to the network? <Link href="/signup">Join the Resonance</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
