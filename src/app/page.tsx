import Link from "next/link";
import {
  ArrowRight,
  Ear,
  Footprints,
  GraduationCap,
  Guitar,
  KeyboardMusic,
  MessageCircle,
  MicVocal,
  CheckCircle2,
  Piano,
  Star,
  Users,
  Music
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { MotionArticle } from "@/components/motion/MotionCard";
import { Reveal } from "@/components/motion/Reveal";
import { AboutGalleryCarousel } from "@/components/sections/AboutGalleryCarousel";
import { Button } from "@/components/ui/Button";
import { gallerySlides } from "@/config/gallery";
import { siteConfig } from "@/config/site";

import styles from "./page.module.css";

const quickHighlights = [
  {
    title: "Structured Curriculum",
    description: "Beginner to stage performance levels.",
    Icon: GraduationCap
  },
  {
    title: "Hybrid Learning",
    description: "Flexible online and offline batches.",
    Icon: KeyboardMusic
  },
  {
    title: "Expert Faculty",
    description: "Dedicated, personalized mentorship.",
    Icon: Users
  },
  {
    title: "Rated",
    description: "Trusted by students and parents across Delhi.",
    Icon: Star
  }
];

const programCards = [
  {
    title: "Guitar",
    description: "Chords, rhythm, finger workouts, ear training, songs, and stage confidence.",
    image: "learningInstrument",
    href: "/courses/guitar",
    Icon: Guitar
  },
  {
    title: "Piano / Keyboard",
    description: "Reading, hand coordination, harmony, repertoire, and expressive performance.",
    image: "dashboard",
    href: "/courses/piano",
    Icon: Piano
  },
  {
    title: "Vocals",
    description: "Breath, pitch, tone, ear training, song interpretation, and stage presence.",
    image: "coaching",
    href: "/courses/vocals",
    Icon: MicVocal
  },
  {
    title: "Dance & Art Craft",
    description: "Creative movement, expression, visual craft, and confidence-building activities.",
    image: "classroom",
    href: "/contact",
    Icon: Footprints
  }
];

const whyReasons = [
  {
    title: "Recital Showcases",
    description: "Regular showcases and student performance battles help learners grow beyond the classroom.",
    tag: "Stage Proof",
    image: "classical",
    featured: true
  },
  {
    title: "Practical Workouts",
    description: "Step-by-step finger workouts, rhythm drills, and ear training build real control.",
    tag: "Skill Building",
    image: "western"
  },
  {
    title: "Small Batch Focus",
    description: "Smaller batches keep feedback personal and ensure every student gets attention.",
    tag: "Mentorship",
    image: "vocal"
  },
  {
    title: "Certificates & Exams",
    description: "Performance certificates and exam guidance help students build recognized milestones.",
    tag: "Recognition",
    image: "production",
    wide: true
  }
];

const storyBeats = [
  {
    title: "Book a Trial",
    description: "Fill out the 1-minute inquiry form and share your preferred program.",
    Icon: CheckCircle2
  },
  {
    title: "Level Assessment",
    description: "Meet your instructor and discover your custom learning path.",
    Icon: Ear
  },
  {
    title: "Start Creating",
    description: "Join your chosen weekly batch and build real creative skills.",
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
            <p className={styles.kicker}>Premier Creative Academy</p>
            <h1>
              <span className={styles.typewriterText}>
                <span className={styles.typewriterLine}>Naadnova</span>
                <span className={`${styles.typewriterLine} ${styles.gradientText}`}>Academy</span>
              </span>
            </h1>
            <p className={styles.tagline}>{siteConfig.tagline}</p>
            <p>
              Premier academy for Guitar, Piano/Keyboard, Vocals, Dance, and Art & Craft.
              Learn online or offline with structured, performance-oriented training.
            </p>
            <div className={styles.heroActions}>
              <Button href={siteConfig.links.googleForm} variant="secondary">
                Book a Free Trial Class
              </Button>
              <Button
                href="#programs"
                variant="ghost"
                icon={<ArrowRight aria-hidden size={18} />}
                iconTrailing={false}
              >
                Explore Programs
              </Button>
            </div>
          </Reveal>

        </Container>
      </section>

      <section className={styles.system}>
        <Container size="xl">
          <Reveal className={styles.centerHeader}>
            <p>Quick Highlights</p>
            <h2>
              Trusted creative training, built for <span>real progress</span>
            </h2>
          </Reveal>

          <div className={styles.highlightGrid}>
            {quickHighlights.map(({ title, description, Icon }, index) => (
              <MotionArticle key={title} className={styles.highlightCard} delay={index * 0.06}>
                <Icon aria-hidden size={22} />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </MotionArticle>
            ))}
          </div>
        </Container>
      </section>

      <section id="programs" className={styles.learning}>
        <Container size="xl">
          <Reveal className={styles.centerHeader}>
            <p>Core Disciplines & Programs</p>
            <h2>
              Programs for every <span>creative rhythm</span>
            </h2>
            <small>Choose a focused path and move from fundamentals to confident expression.</small>
          </Reveal>

          <Reveal className={styles.stepGrid} delay={0.08}>
            {programCards.map(({ title, description, image, href, Icon }, index) => (
              <MotionArticle key={title} className={styles.stepCard} delay={index * 0.06}>
                <div className={styles.stepImage} data-image={image}>
                  <Icon aria-hidden size={21} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link className={styles.programLink} href={href}>
                  View Program
                  <ArrowRight aria-hidden size={14} />
                </Link>
              </MotionArticle>
            ))}
          </Reveal>
        </Container>
      </section>

      <section id="courses" className={styles.courses}>
        <Container size="xl">
          <Reveal className={styles.centerHeader}>
            <p>Why Learn at Naadnova?</p>
            <h2>
              Modern Learning with Real <span>Stage Confidence</span>
            </h2>
            <small>Training that connects daily practice with recital-ready confidence.</small>
          </Reveal>

          <Reveal className={styles.courseMosaic} variant="scale" delay={0.08}>
            {whyReasons.map((reason, index) => (
              <MotionArticle
                key={reason.title}
                className={`${styles.courseTile} ${reason.featured ? styles.featuredCourse : ""} ${
                  reason.wide ? styles.wideCourse : ""
                }`}
                data-image={reason.image}
                delay={index * 0.06}
                hover="none"
              >
                <div>
                  <p>{reason.tag}</p>
                  <h3>{reason.title}</h3>
                  <span>{reason.description}</span>
                </div>
              </MotionArticle>
            ))}
          </Reveal>
        </Container>
      </section>

      <section id="method" className={styles.method}>
        <Container size="xl" className={`${styles.methodGrid} ${styles.studentActionGrid}`}>
          <div className={styles.methodWordmark} aria-hidden>
            Method
          </div>
          <Reveal className={styles.methodCopy}>
            <h2>
              See Our <span>Students</span>
              <br />
              in Action
            </h2>
            <p className={styles.sectionText}>
              From quick trial inquiry to weekly batch practice, every learner gets a clear path
              toward skill, confidence, and creative output.
            </p>

            <div className={styles.methodCards}>
              {storyBeats.map(({ title, description, Icon }, index) => (
                <MotionArticle key={title} delay={index * 0.06}>
                  <Icon aria-hidden size={20} />
                  <div>
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
              <div className={styles.visualizerCard}>
                <video className={styles.spotlightVideo} autoPlay muted loop playsInline preload="metadata">
                  <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className={styles.lessonTag}>
                  <span />
                  Student Proof
                </div>
                <div className={styles.wave} />
                <div className={styles.waveMeta}>
                  <div>
                    <small>Video Spotlight</small>
                    <strong>Structured Practice to Stage Performance</strong>
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
                <p>Performance-oriented training across music, dance, and creative arts.</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className={styles.gallery}>
        <Container size="xl">
          <Reveal className={styles.centerHeader}>
            <p>Student Proof</p>
            <h2>
              Recitals, practice rooms, and <span>creative milestones</span>
            </h2>
            <small>Real moments from lessons, preparation, events, and stage showcases.</small>
          </Reveal>

          <div className={styles.galleryGrid}>
            <Reveal className={styles.galleryFrame} variant="scale">
              <AboutGalleryCarousel slides={gallerySlides} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className={styles.testimonials}>
        <Container size="xl">
          <Reveal className={`${styles.centerHeader} ${styles.finalCta}`}>
            <p>Start Today</p>
            <h2>
              Ready to Start Your <span>Creative Journey?</span>
            </h2>
            <small>Book your free trial or chat with the academy team to find the right batch.</small>
            <div className={styles.finalCtaActions}>
              <Button href={siteConfig.links.googleForm} variant="secondary">
                Book Free Trial
              </Button>
              <Button
                href={siteConfig.links.whatsapp}
                variant="ghost"
                icon={<MessageCircle aria-hidden size={18} />}
                iconTrailing={false}
              >
                Chat on WhatsApp
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

    </>
  );
}
