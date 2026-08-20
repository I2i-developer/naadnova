import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Clock3,
  Gauge,
  Layers3,
  Radio,
  Sparkles,
  Users
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { MotionArticle } from "@/components/motion/MotionCard";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { featuredCourses, siteConfig } from "@/config/site";

import styles from "./page.module.css";

const courseVisuals = [
  {
    slug: "guitar",
    image: "guitar",
    tag: "Rhythm Lab",
    energy: "Resonant Energy",
    duration: "12-week foundation",
    outcome: "Chords, strumming, fingerstyle, and stage-ready songs"
  },
  {
    slug: "piano",
    image: "piano",
    tag: "Harmony Studio",
    energy: "Harmonic Energy",
    duration: "Flexible modules",
    outcome: "Reading, touch, listening, and expressive repertoire"
  },
  {
    slug: "keyboard",
    image: "keyboard",
    tag: "Modern Keys",
    energy: "Kinetic Energy",
    duration: "Project-led path",
    outcome: "Melody, accompaniment, tone shaping, and performance flow"
  },
  {
    slug: "vocals",
    image: "vocals",
    tag: "Voice Circle",
    energy: "Vocal Energy",
    duration: "Personalized coaching",
    outcome: "Breath, pitch, tone, confidence, and song interpretation"
  }
];

const formats = [
  {
    title: "Studio Sessions",
    description: "Focused offline classes with direct feedback, posture correction, and performance practice.",
    Icon: Users
  },
  {
    title: "Online Coaching",
    description: "Live guided lessons for students who need consistency without travel friction.",
    Icon: Radio
  },
  {
    title: "Practice Loops",
    description: "Clear weekly goals, recordings, and repeatable exercises that keep momentum alive.",
    Icon: Gauge
  }
];

const pathSteps = [
  {
    title: "Foundations",
    detail: "Build your core understanding of rhythm, harmony, posture, and acoustic awareness.",
    Icon: Layers3
  },
  {
    title: "Resonance",
    detail: "Shape your own sound through guided technique, listening, and creative exploration.",
    Icon: Sparkles
  },
  {
    title: "Mastery",
    detail: "Refine confident musical expression through repertoire, recording, and performance.",
    Icon: BadgeCheck
  }
];

export default function CoursesPage() {
  return (
    <>
      <section className={styles.hero}>
        <Container size="xl" className={styles.heroGrid}>
          <Reveal className={styles.heroCopy}>
            <p className={styles.eyebrow}>Courses</p>
            <h1>
              Learn in a <span>rhythm</span> that stays with you.
            </h1>
            <p>
              Pick guitar, piano, keyboard, or vocals. Each path blends technique, creativity, and
              {` ${siteConfig.tagline}`}.
            </p>
            <div className={styles.heroActions}>
              <Button href="#course-catalogue" variant="primary">
                Explore Courses
              </Button>
              <Button href="/contact" variant="ghost">
                Book a Trial
              </Button>
            </div>
          </Reveal>

          <Reveal className={styles.heroBoard} variant="scale" delay={0.1}>
            <div className={styles.boardGlow} aria-hidden />
            <div className={styles.signalCard}>
              <span>Live Match</span>
              <strong>92%</strong>
            </div>
            <div className={styles.orbit} aria-hidden>
              {featuredCourses.map((course, index) => {
                const Icon = course.Icon;

                return (
                  <span key={course.slug} data-index={index}>
                    <Icon aria-hidden size={22} />
                  </span>
                );
              })}
            </div>
            <div className={styles.boardCenter}>
              <BookOpenCheck aria-hidden size={30} />
              <strong>Course Finder</strong>
              <p>Structured foundations, creative projects, and performance milestones.</p>
              <div className={styles.centerWave} aria-hidden>
                {[42, 68, 54, 82, 47, 76, 60, 90, 52].map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    style={{
                      height: `${height}%`,
                      animationDelay: `${index * -110}ms`
                    }}
                  />
                ))}
              </div>
            </div>
            <div className={styles.pathBadge}>
              <span>{featuredCourses.length} guided paths</span>
              <strong>{siteConfig.tagline}</strong>
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="course-catalogue" className={styles.catalogue}>
        <Container size="xl">
          <Reveal className={styles.sectionHeader}>
            <p>Course Catalogue</p>
            <h2>
              Pick the path that matches your <span>sound.</span>
            </h2>
          </Reveal>

          <div className={styles.courseGrid}>
            {featuredCourses.map((course, index) => {
              const visual = courseVisuals.find((item) => item.slug === course.slug);
              const Icon = course.Icon;

              return (
                <MotionArticle
                  key={course.slug}
                  className={styles.courseCard}
                  data-image={visual?.image}
                  data-accent={course.accent}
                  delay={index * 0.06}
                  hover="none"
                >
                  <Link href={`/courses/${course.slug}`} aria-label={`View ${course.title} course`}>
                    <div className={styles.cardMedia}>
                      <div className={styles.energyPill}>
                        <i aria-hidden />
                        <span>{visual?.energy}</span>
                      </div>
                      <div className={styles.courseIcon}>
                        <Icon aria-hidden size={24} />
                      </div>
                      <small>{visual?.tag}</small>
                    </div>
                    <div className={styles.cardBody}>
                      <div>
                        <p>{course.level}</p>
                        <h3>{course.title}</h3>
                        <span>{visual?.outcome ?? course.description}</span>
                      </div>
                      <div className={styles.cardFooter}>
                        <small>
                          <Clock3 aria-hidden size={15} />
                          {visual?.duration}
                        </small>
                        <strong>
                          View Curriculum
                          <ArrowRight aria-hidden size={16} />
                        </strong>
                      </div>
                    </div>
                  </Link>
                </MotionArticle>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={styles.formats}>
        <Container size="xl" className={styles.formatGrid}>
          <Reveal>
            <p className={styles.eyebrow}>Learning Modes</p>
            <h2>
              Designed for practice that feels <span>alive.</span>
            </h2>
          </Reveal>

          <div className={styles.formatCards}>
            {formats.map(({ title, description, Icon }, index) => (
              <MotionArticle key={title} className={styles.formatCard} delay={index * 0.06}>
                <Icon aria-hidden size={22} />
                <h3>{title}</h3>
                <p>{description}</p>
              </MotionArticle>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.path}>
        <Container size="xl">
          <Reveal className={styles.sectionHeader}>
            <p>Sonic Journey</p>
            <h2>
              From first vibration to creative <span>mastery.</span>
            </h2>
          </Reveal>

          <div className={styles.journeyWrap}>
            <svg
              className={styles.journeyLine}
              preserveAspectRatio="none"
              viewBox="0 0 800 400"
              aria-hidden
            >
              <defs>
                <linearGradient id="sonicJourneyGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#00f2ff" />
                  <stop offset="50%" stopColor="#8a2be2" />
                  <stop offset="100%" stopColor="#ff1e4d" />
                </linearGradient>
              </defs>
              <path
                className={styles.lineBase}
                d="M 116,78 C 272,78 252,182 400,182 C 548,182 528,286 684,286"
                fill="none"
                stroke="url(#sonicJourneyGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                className={styles.lineGlow}
                d="M 116,78 C 272,78 252,182 400,182 C 548,182 528,286 684,286"
                fill="none"
                stroke="url(#sonicJourneyGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

            <div className={styles.pathGrid}>
            {pathSteps.map(({ title, detail, Icon }, index) => (
              <MotionArticle key={title} className={styles.pathCard} delay={index * 0.06}>
                <div>
                  <Icon aria-hidden size={22} />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>
                  {index + 1}. {title}
                </h3>
                <p>{detail}</p>
              </MotionArticle>
            ))}
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.cta}>
        <Container size="md">
          <Reveal className={styles.ctaInner}>
            <h2>Ready to start your resonance?</h2>
            <p>
              Join a visionary musical ecosystem. Limited trial spots available for our upcoming
              masterclasses.
            </p>
            <div className={styles.ctaButtonWrap}>
              <Button href="/contact" variant="primary">
                Start Your Journey
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
