import {
  CalendarCheck,
  Clock3,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Send,
  Sparkles
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { MotionArticle } from "@/components/motion/MotionCard";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { featuredCourses, siteConfig } from "@/config/site";

import styles from "./page.module.css";

const contactCards = [
  {
    label: "Call",
    value: siteConfig.contact.phone,
    helper: "Speak with the studio team",
    cue: "Best for quick guidance",
    Icon: Phone
  },
  {
    label: "WhatsApp",
    value: siteConfig.contact.whatsapp,
    helper: "Fastest for trial coordination",
    cue: "Fastest response path",
    Icon: MessageCircle
  },
  {
    label: "Email",
    value: siteConfig.contact.email,
    helper: "For course and schedule queries",
    cue: "Share detailed questions",
    Icon: Mail
  },
  {
    label: "Studio",
    value: siteConfig.contact.location,
    helper: "Offline lessons and trial visits",
    cue: "Plan your visit",
    Icon: MapPin
  }
];

const bookingSteps = [
  {
    title: "Share your sound",
    description: "Tell us the instrument, age group, and learning goal you have in mind.",
    Icon: Music2
  },
  {
    title: "Match the right path",
    description: "We help choose a course format that fits your schedule and current level.",
    Icon: Headphones
  },
  {
    title: "Confirm the trial",
    description: "The studio follows up with availability and the next best class slot.",
    Icon: CalendarCheck
  }
];

const mapQuery = encodeURIComponent(siteConfig.contact.location);

export default function ContactPage() {
  return (
    <>
      <section className={styles.hero}>
        <Container size="xl" className={styles.heroGrid}>
          <Reveal className={styles.heroCopy}>
            <p className={styles.eyebrow}>Contact</p>
            <h1>
              Get in <span>Tune</span>
            </h1>
            <p>
              Start with a <span className={styles.trial}>trial class</span> that feels personal. Tell us where you are in your musical
              journey and we will help you choose the right course, schedule, and first step with
              NaadNova.
            </p>

            <div className={styles.heroBadges} aria-label="Contact highlights">
              <span>
                <Sparkles aria-hidden size={16} />
                {siteConfig.tagline}
              </span>
              <span>
                <Clock3 aria-hidden size={16} />
                {siteConfig.contact.hours}
              </span>
            </div>
          </Reveal>

          <Reveal className={styles.formPanel} variant="scale" delay={0.1}>
            <div className={styles.formHeader}>
              <span>Trial Request</span>
              <h2>Book your first session</h2>
              <p>Share a few details and we will guide you to the right starting point.</p>
            </div>

            <form className={styles.form} action="/contact" aria-label="Trial class request">
              <div className={styles.fieldGrid}>
                <label>
                  <span>Student name</span>
                  <input name="name" placeholder="Student name" autoComplete="name" />
                </label>

                <label>
                  <span>Phone number</span>
                  <input name="phone" placeholder="Phone number" autoComplete="tel" />
                </label>
              </div>

              <div className={styles.fieldGrid}>
                <label>
                  <span>Instrument</span>
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
                  <span>Learning mode</span>
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
                <span>What would you like to learn?</span>
                <textarea name="message" placeholder="Tell us about your goals, age group, or preferred timing." />
              </label>

              <Button type="submit" variant="primary" icon={<Send aria-hidden size={17} />}>
                Send Trial Request
              </Button>
            </form>
          </Reveal>
        </Container>
      </section>

      <section className={styles.contactMethods}>
        <Container size="xl">
          <Reveal className={styles.sectionHeader}>
            <p>Reach The Studio</p>
            <h2>
              Choose the easiest way to <span>connect.</span>
            </h2>
          </Reveal>

          <div className={styles.cardGrid}>
            {contactCards.map(({ label, value, helper, cue, Icon }, index) => (
              <MotionArticle key={label} className={styles.contactCard} delay={index * 0.06}>
                <div className={styles.cardTop}>
                  <span className={styles.iconWrap}>
                    <Icon aria-hidden size={20} />
                  </span>
                  <h3>{label}</h3>
                </div>

                <div className={styles.cardBody}>
                  <strong>{value}</strong>
                  <p>{helper}</p>
                </div>

                <div className={styles.cardFoot}>
                  <span>{cue}</span>
                  <div className={styles.miniWave} aria-hidden>
                    {[38, 68, 46, 78, 54, 64].map((height, barIndex) => (
                      <i
                        key={`${label}-${barIndex}`}
                        style={{
                          height: `${height}%`,
                          animationDelay: `${barIndex * 110}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </MotionArticle>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.mapSection}>
        <Container size="xl" className={styles.mapGrid}>
          <Reveal className={styles.mapCopy}>
            <p className={styles.eyebrow}>Studio Location</p>
            <h2>
              Find your way to the <span>NaadNova studio.</span>
            </h2>
            <p>
              Visit for offline lessons, trial classes, and in-person guidance. Update the studio
              address in the site settings when the final location is confirmed.
            </p>

            <div className={styles.locationCard}>
              <MapPin aria-hidden size={22} />
              <div>
                <strong>{siteConfig.contact.location}</strong>
                <span>{siteConfig.contact.hours}</span>
              </div>
            </div>

            <Button
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              variant="primary"
              target="_blank"
              rel="noreferrer"
            >
              Open in Maps
            </Button>
          </Reveal>

          <Reveal className={styles.mapPanel} variant="scale" delay={0.1}>
            <iframe
              title="NaadNova studio location map"
              src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </Container>
      </section>

      <section className={styles.booking}>
        <Container size="xl" className={styles.bookingGrid}>
          <Reveal>
            <p className={styles.eyebrow}>How It Works</p>
            <h2>
              A calm path from enquiry to <span>first note.</span>
            </h2>
          </Reveal>

          <div className={styles.stepGrid}>
            {bookingSteps.map(({ title, description, Icon }, index) => (
              <MotionArticle key={title} className={styles.stepCard} delay={index * 0.06}>
                <div>
                  <Icon aria-hidden size={22} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </MotionArticle>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
