import Link from "next/link";
import { ArrowRight, Headphones, Music2, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { MotionArticle } from "@/components/motion/MotionCard";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { featuredCourses } from "@/config/site";

import styles from "./page.module.css";

const instrumentDetails = [
  {
    slug: "guitar",
    category: "String",
    focus: "Rhythm, chords, fingerstyle, stage confidence",
    summary: "Versatile, rhythmic, and deeply expressive. A natural starting point for songs, groove, and stage confidence.",
    metricLabel: "Energy",
    metricValue: "Expressive",
    image: "guitar",
    tone: "gold"
  },
  {
    slug: "piano",
    category: "Harmony",
    focus: "Reading, touch, harmony, expressive playing",
    summary: "The architect of harmony, ideal for learners who want melody, chords, and musical structure together.",
    metricLabel: "Resonance",
    metricValue: "Deep",
    image: "piano",
    tone: "blue"
  },
  {
    slug: "keyboard",
    category: "Modern",
    focus: "Melody, accompaniment, tone shaping, performance",
    summary: "A flexible creative station for tones, arrangements, accompaniment, and performance-ready playing.",
    metricLabel: "Flow",
    metricValue: "Adaptive",
    image: "keyboard",
    tone: "teal"
  },
  {
    slug: "vocals",
    category: "Voice",
    focus: "Breath, pitch, tone, resonance, stage presence",
    summary: "The ultimate organic instrument. Build breath, pitch, tone, and expressive presence.",
    metricLabel: "Timbre",
    metricValue: "Personal",
    image: "vocals",
    tone: "rose"
  }
];

const learningModes = [
  {
    title: "Personal Sound Mapping",
    description: "We begin by understanding your listening habits, comfort range, rhythm sense, and musical goals.",
    Icon: Headphones
  },
  {
    title: "Technique With Flow",
    description: "Every class blends fundamentals with creative exercises so practice feels structured and alive.",
    Icon: Music2
  },
  {
    title: "Performance Readiness",
    description: "Students build confidence through songs, recordings, feedback, and small performance milestones.",
    Icon: Sparkles
  }
];

const visualizerBars = [34, 58, 44, 76, 52, 88, 61, 42, 70, 95, 64, 48, 83, 57, 37, 72, 54, 91, 68, 46, 78, 59, 40, 66];

export default function InstrumentsPage() {
  return (
    <>
      <section className={styles.hero}>
        <Container size="xl" className={styles.heroGrid}>
          <Reveal className={styles.heroCopy}>
            <p className={styles.eyebrow}>Instruments</p>
            <h1>
              Find Your <br />
              <span>Rhythm</span>
            </h1>
            <p>
              Explore our curated collection of instruments, each with its own sonic fingerprint.
              Dive into the resonance and discover where your practice begins.
            </p>
            <div className={styles.heroActions}>
              <Button href="#instrument-list" variant="primary">
                Explore Gallery
              </Button>
              <Button href="/contact" variant="ghost">
                Take the Quiz
              </Button>
            </div>
          </Reveal>

          <Reveal className={styles.heroPanel} variant="scale" delay={0.1}>
            <div className={styles.visualizerShell}>
              <span className={styles.livePill}>
                <span aria-hidden />
                Interactive
              </span>
              <h2>Visualizer</h2>
              <p>A live frequency profile that turns rhythm, tone, and resonance into motion.</p>

              <div className={styles.waveform} aria-hidden>
                {visualizerBars.map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    style={{
                      height: `${height}%`,
                      animationDelay: `${-(index * 137) % 1700}ms`,
                      animationDuration: `${1.05 + (index % 5) * 0.18}s`,
                      animationDirection: index % 3 === 0 ? "alternate-reverse" : "alternate"
                    }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="instrument-list" className={styles.instruments}>
        <Container size="xl">
          <Reveal className={styles.sectionHeader}>
            <p>Choose Your Sound</p>
            <h2>
              Instruments for every <span>learning rhythm</span>
            </h2>
          </Reveal>

          <div className={styles.instrumentGrid}>
            {featuredCourses.map((course, index) => {
              const detail = instrumentDetails.find((item) => item.slug === course.slug);
              const Icon = course.Icon;
              const cardClassName = [
                styles.instrumentCard,
                index === 0 ? styles.instrumentFeatured : "",
                index === 3 ? styles.instrumentWide : ""
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <MotionArticle
                  key={course.slug}
                  className={cardClassName}
                  data-image={detail?.image}
                  data-tone={detail?.tone}
                  delay={index * 0.06}
                  hover="none"
                >
                  <div className={styles.instrumentMedia} aria-hidden />
                  <div className={styles.instrumentOverlay} aria-hidden />

                  <div className={styles.instrumentIcon}>
                    <Icon aria-hidden size={index === 0 ? 28 : 22} />
                  </div>

                  <div className={styles.instrumentBody}>
                    <p>{detail?.category ?? course.level}</p>
                    <h3>{course.title}</h3>
                    <span>{index === 0 ? detail?.summary : detail?.focus}</span>
                    <div className={styles.instrumentMeta}>
                      <div>
                        <small>{detail?.metricLabel ?? "Level"}</small>
                        <strong>{detail?.metricValue ?? course.level}</strong>
                      </div>
                      <div>
                        <small>Path</small>
                        <strong>{course.level}</strong>
                      </div>
                    </div>
                    <Link href={`/courses/${course.slug}`}>
                      Explore Profile
                      <ArrowRight aria-hidden size={15} />
                    </Link>
                  </div>
                </MotionArticle>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={styles.learningPath}>
        <Container size="xl" className={styles.pathGrid}>
          <Reveal>
            <p className={styles.eyebrow}>How We Guide</p>
            <h2>
              Technique, creativity, and confidence in one <span>practice loop.</span>
            </h2>
          </Reveal>

          <div className={styles.modeGrid}>
            {learningModes.map(({ title, description, Icon }, index) => (
              <MotionArticle key={title} className={styles.modeCard} delay={index * 0.06}>
                <Icon aria-hidden size={21} />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </MotionArticle>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.cta}>
        <Container size="xl" className={styles.ctaInner}>
          <Reveal>
            <p className={styles.eyebrow}>Start With Clarity</p>
            <h2>Not sure which instrument to begin with?</h2>
            <p>
              Book a trial and we&apos;ll help match your goals, age, schedule, and musical taste
              with the right learning path.
            </p>
          </Reveal>
          <Button href="/contact" variant="primary">
            Contact NaadNova
          </Button>
        </Container>
      </section>
    </>
  );
}
