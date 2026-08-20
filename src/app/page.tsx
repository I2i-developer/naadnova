import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CirclePlay,
  Headphones,
  Music, 
  Sparkles
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { MotionArticle } from "@/components/motion/MotionCard";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

import styles from "./page.module.css";

const methodCards = [
  {
    title: "Sonic Visualization",
    description: "See your music as you play with a visual learning path.",
    Icon: Headphones,
    step: "Listen"
  },
  {
    title: "Dynamic Pacing",
    description: "Beginner-friendly lessons that adapt to your energy and goals.",
    Icon: Sparkles,
    step: "Adapt"
  }
];

const learningSteps = [
  {
    title: "Choose Your Hobby Course",
    description: "Hindustani, Bollywood, Kathak, guitar, piano, or vocals.",
    image: "learningInstrument"
  },
  {
    title: "Online/Offline Sessions",
    description: "Learn from local or remote classes, based on availability.",
    image: "classroom"
  },
  {
    title: "Follow Ups & Tests on Video",
    description: "Progress checks and practice tasks for steady improvement.",
    image: "coaching"
  },
  {
    title: "Earn Certificates and Degrees",
    description: "Prepared for recognized exams when the instructor offers them.",
    image: "dashboard"
  }
];

const courses = [
  {
    title: "Indian Classical",
    slug: "indian-classical",
    description: "Master the depth of raagas and taalas through guided riyaaz.",
    tag: "Core Tradition",
    image: "classical",
    featured: true
  },
  {
    title: "Western Contemporary",
    slug: "western-contemporary",
    description: "Learn modern technique, repertoire, and stage confidence.",
    tag: "Popular Music",
    image: "western"
  },
  {
    title: "Vocal Excellence",
    slug: "vocal-excellence",
    description: "Unlock the resonance and control of your unique voice.",
    tag: "Voice Craft",
    image: "vocal"
  },
  {
    title: "Music Production",
    slug: "music-production",
    description: "Learn rhythm, arrangement, and digital composition foundations.",
    tag: "Studio Skills",
    image: "production",
    wide: true
  }
];

const testimonials = [
  {
    quote:
      "Naadnova didn't just teach me the sitar; they taught me how to find my own voice within the Raagas. The blend of tradition and tech is unmatched.",
    name: "Ananya R.",
    role: "Indian Classical Student",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-k-ClLFLSX6_uJd2Vn9aE1k4jh9d9hermdpsvjqtar4_qIU0Xu_1-QCZCzqhXUFK7_SPyTI0yDFDmnXsPGcmJ2qnJk4i1PjIIrFez5Anh_7GwA-GeQXrUXlKONCUkb22245WBHTz6nCmLJBnEqXvEINSd6ArS7plwSqzEkI54sj5H7PVSlDPandbPJXnWi5z4_gx05O1p8PlJ9OpuR0CoVwkwjGQasJg-aDZ6TdMeB8cTaGSaA3Uuug",
    accent: "violet"
  },
  {
    quote:
      "The music production course transformed my messy demos into industry-ready tracks. The mentors here are absolute pros.",
    name: "Marcus T.",
    role: "Electronic Music Producer",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBswNuhzwboREyOmP_QwCauV5MRCg1Nku8aJ6bn7qieYtoaN-17oIxy_mwMoyUfQ_TZmgZLMg8fEudcKcM752o1BPQ74FqntRVh_XpFUU0pAqF9NowEMceuke_5L-54R6IGA3rUZJbkNU6ud3W9OuxiTeIOpfikPsAPAy3_49H9XrunsYKlzYLkQwxO-xqk0p0GhFs3CRx_ZXciJ1fCyAaNNcHf2qlY6wWMAx5DlwwukwakNbYl4m5xkg",
    accent: "red"
  },
  {
    quote:
      "Finally, a school that understands the soul of the instrument. The interactive visualizers make every practice session feel like a performance.",
    name: "Sarah J.",
    role: "Contemporary Violinist",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBi4ck3D8_JtNw0DIwLaGku4B0RVV_nCFqfjmbOibds78ppeJaTP_6fHx-VHRLHGHLZBlJ0JClq6MTDm955jO06exKk91tmvZ6yKC2Oywv2Vk4NaqNw07ogHjF_Zvr7mizyr8h45jF2bD57aw7c7Ah5LYhvZAErlhPbcAxxgeLVVihy0WM0iUQAVdGpvUcD3eH-X40W9bY3u7Nloo6Nsi2e_Gi31fZ_6AZSgTzet96H8bOdzpI8WAFZGw",
    accent: "cyan"
  }
];

const storyBeats = [
  {
    title: "Come",
    description: "A welcoming studio space for first notes, returning practice, and curious minds.",
    Icon: Headphones
  },
  {
    title: "Learn",
    description: "Structured foundations meet attentive mentorship across classical and modern music.",
    Icon: BookOpen
  },
  {
    title: "Create",
    description: "Students grow into confident performers with a sound, rhythm, and voice of their own.",
    Icon: Music
  }
];

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicSchool",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    address: siteConfig.contact.location
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <Container size="xl" className={styles.heroInner}>
          <Reveal className={styles.heroCopy}>
            <p className={styles.kicker}>Redefining</p>
            <h1>
              <span className={styles.typewriterText}>
                <span className={styles.typewriterLine}>Music</span>
                <span className={`${styles.typewriterLine} ${styles.gradientText}`}>Education</span>
              </span>
            </h1>
            <p className={styles.tagline}>{siteConfig.tagline}</p>
            <p>
              Learn music with contemporary precision, Indian depth, and personal mentorship.
            </p>
            <div className={styles.heroActions}>
              <Button href="/contact" variant="secondary">
                Start Your Journey
              </Button>
              <Button
                href="#method"
                variant="ghost"
                icon={<CirclePlay aria-hidden size={18} />}
                iconTrailing={false}
              >
                Watch the Method
              </Button>
            </div>
          </Reveal>

        </Container>
      </section>

      <section className={styles.system}>
        <Container size="xl" className={styles.systemGrid}>
          <Reveal className={styles.storyIntro}>
            <p className={styles.micro}>Our Story</p>
            <h2>
              The Soul of <span>Naadnova</span>
            </h2>
            <p className={styles.sectionText}>
              Naadnova began with a simple belief: music learning should feel disciplined,
              expressive, and alive. It brings together traditional depth, modern creativity, and a
              welcoming space for every learner to come, learn, and create.
            </p>
          </Reveal>

          <div className={styles.storyBoard}>
            <div className={styles.storyLine} aria-hidden />
            {storyBeats.map(({ title, description, Icon }, index) => (
              <MotionArticle key={title} className={styles.storyBeat} delay={index * 0.07}>
                <span className={styles.storyNumber}>0{index + 1}</span>
                <Icon aria-hidden size={19} />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </MotionArticle>
            ))}
          </div>

          <Reveal className={styles.storySignal} variant="scale" delay={0.1}>
            <div aria-label="Naadnova sonic flow visual">
              <div className={styles.signalStage}>
                <span />
                <span />
                <span />
                <strong>{siteConfig.tagline}</strong>
              </div>
              <div className={styles.signalCaption}>
                <CheckCircle2 aria-hidden size={18} />
                <span>Tradition, technique, and expression moving in one rhythm.</span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className={styles.learning}>
        <Container size="xl">
          <Reveal className={styles.centerHeader}>
            <p>Features</p>
            <h2>
              How learning <span>works</span>
            </h2>
            <small>A clear path from picking a hobby to earning recognition, online or offline.</small>
          </Reveal>

          <Reveal className={styles.stepGrid} delay={0.08}>
            {learningSteps.map((step, index) => (
              <MotionArticle key={step.title} className={styles.stepCard} delay={index * 0.06}>
                <div className={styles.stepImage} data-image={step.image} />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </MotionArticle>
            ))}
          </Reveal>
        </Container>
      </section>

      <section id="courses" className={styles.courses}>
        <Container size="xl">
          <Reveal className={styles.centerHeader}>
            <p>Courses</p>
            <h2>
              Explore Our <span>Courses</span>
            </h2>
            <small>Dive into a world of sonic exploration with our curated curriculum.</small>
          </Reveal>

          <Reveal className={styles.courseMosaic} variant="scale" delay={0.08}>
            {courses.map((course, index) => (
              <MotionArticle
                key={course.title}
                className={`${styles.courseTile} ${course.featured ? styles.featuredCourse : ""} ${
                  course.wide ? styles.wideCourse : ""
                }`}
                data-image={course.image}
                delay={index * 0.06}
                hover="none"
              >
                <div>
                  <p>{course.tag}</p>
                  <h3>{course.title}</h3>
                  <span>{course.description}</span>
                </div>
                <Link href="/courses">
                  View Curriculum
                  <ArrowRight aria-hidden size={14} />
                </Link>
              </MotionArticle>
            ))}
          </Reveal>
        </Container>
      </section>

      <section id="method" className={styles.method}>
        <Container size="xl" className={styles.methodGrid}>
          <div className={styles.methodWordmark} aria-hidden>
            Method
          </div>
          <Reveal className={styles.methodCopy}>
            <h2>
              The <span>Naadnova</span>
              <br />
              Method
            </h2>
            <p className={styles.sectionText}>
              We blend rigorous technical foundation with immersive, flow-state creativity. Our
              platform isn&apos;t just about learning notes; it&apos;s about feeling the resonance and
              visualizing your sound.
            </p>

            <div className={styles.methodCards}>
              {methodCards.map(({ title, description, Icon, step }, index) => (
                <MotionArticle key={title} delay={index * 0.06}>
                  <Icon aria-hidden size={20} />
                  <div>
                    <span>{step}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </MotionArticle>
              ))}
            </div>
          </Reveal>

          <Reveal
            className={styles.lessonPreview}
            variant="scale"
            delay={0.12}
          >
            <div aria-label="Naadnova learning interface preview">
              {/* <div className={styles.analysisPill}>
                <span />
                Real-time Analysis
              </div> */}
              <div className={styles.visualizerCard}>
                <div className={styles.lessonTag}>
                  <span />
                  Live Riyaaz
                </div>
                <div className={styles.wave} />
                <div className={styles.waveMeta}>
                  <div>
                    <small>Currently Flowing</small>
                    <strong>Advanced Harmonic Structure</strong>
                  </div>
                  <span aria-hidden className={styles.equalizerOrb}>
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              </div>
              <div className={styles.resonanceNote}>
                <div>
                  <span />
                  <span />
                </div>
                <p>Visualizing the resonance of a C-Major arpeggio.</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className={styles.testimonials}>
        <Container size="xl">
          <Reveal className={styles.centerHeader}>
            <p>Testimonials</p>
            <h2>
              Echoes of <span>Mastery</span>
            </h2>
            <small>Voices from the Naadnova community, where passion meets growth.</small>
          </Reveal>

          <Reveal delay={0.08}>
            <TestimonialCarousel testimonials={testimonials} />
          </Reveal>
        </Container>
      </section>

    </>
  );
}
