import Link from "next/link";
import { ArrowRight, AudioLines, LockKeyhole, Mail, Music2, Phone, UserRound } from "lucide-react";

import { featuredCourses } from "@/config/site";

import styles from "./page.module.css";

export default function SignupPage() {
  return (
    <section className={styles.signupPage}>
      <div className={styles.signupCard}>
        <div className={styles.formHeader}>
          <h1>Join the Resonance</h1>
          <span>Create your NaadNova account and begin your learning flow.</span>
        </div>

        <form className={styles.form} action="/signup" aria-label="Student signup">
          <div className={styles.fieldGrid}>
            <label>
              <span>
                <UserRound aria-hidden size={15} />
                Learner Name
              </span>
              <input name="name" type="text" placeholder="Your name" autoComplete="name" />
            </label>

            <label>
              <span>
                <Phone aria-hidden size={15} />
                Contact
              </span>
              <input name="phone" type="tel" placeholder="Phone number" autoComplete="tel" />
            </label>
          </div>

          <label>
            <span>
              <Mail aria-hidden size={15} />
              Email
            </span>
            <input name="email" type="email" placeholder="user@frequency.com" autoComplete="email" />
          </label>

          <div className={styles.fieldGrid}>
            <label>
              <span>
                <Music2 aria-hidden size={15} />
                Instrument
              </span>
              <select name="instrument" defaultValue="">
                <option value="" disabled>
                  Choose instrument
                </option>
                {featuredCourses.map((course) => (
                  <option key={course.slug} value={course.title}>
                    {course.title}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>
                <AudioLines aria-hidden size={15} />
                Learning Mode
              </span>
              <select name="mode" defaultValue="">
                <option value="" disabled>
                  Choose mode
                </option>
                <option>Online</option>
                <option>Offline</option>
                <option>Hybrid</option>
              </select>
            </label>
          </div>

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
            />
          </label>

          <label className={styles.agreement}>
            <input type="checkbox" name="updates" />
            <span>Send me course updates and trial class guidance.</span>
          </label>

          <button className={styles.submitButton} type="submit">
            <span>Create Your Flow</span>
            <ArrowRight aria-hidden size={18} />
          </button>
        </form>

        <p className={styles.loginLine}>
          Already in the network? <Link href="/login">Enter the Flow</Link>
        </p>
      </div>
    </section>
  );
}
