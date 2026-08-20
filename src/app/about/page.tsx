import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Headphones,
  Sparkles,
  Users
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { MotionArticle } from "@/components/motion/MotionCard";
import { Reveal } from "@/components/motion/Reveal";
import { AboutGalleryCarousel } from "@/components/sections/AboutGalleryCarousel";
import { Button } from "@/components/ui/Button";
import { gallerySlides } from "@/config/gallery";
import { siteConfig } from "@/config/site";

import styles from "./page.module.css";

const pillars = [
  {
    title: "Come",
    description: "A welcoming first step for children, parents, hobby learners, and returning musicians.",
    Icon: Users
  },
  {
    title: "Learn",
    description: "Structured lessons build technique, listening, rhythm, confidence, and musical language.",
    Icon: BookOpen
  },
  {
    title: "Create",
    description: "Students turn practice into expression through songs, recordings, showcases, and personal style.",
    Icon: Sparkles
  }
];

const storyBeats = [
  "Begin with comfort, curiosity, and a clear musical goal.",
  "Build foundations through riyaaz, rhythm, ear training, and guided repetition.",
  "Shape confidence through performance-ready pieces and creative exploration."
];

const instructorName = siteConfig.instructorName.startsWith("[")
  ? "Your NaadNova Instructor"
  : siteConfig.instructorName;

const instructorImage =
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=85";

const instructorJourney = [
  {
    marker: "01",
    title: "Roots in Riyaaz",
    description: "A teaching journey shaped by daily discipline, attentive listening, and respect for musical foundations."
  },
  {
    marker: "02",
    title: "From Technique to Feeling",
    description: "Lessons move beyond notes into tone, timing, expression, and the confidence to perform with presence."
  },
  {
    marker: "03",
    title: "A Modern Studio Method",
    description: "Traditional guidance meets creative tools, structured feedback, and a clear path for every learner."
  }
];

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <Container size="xl" className={styles.heroGrid}>
          <Reveal className={styles.heroCopy}>
            <p className={styles.eyebrow}>About NaadNova</p>
            <h1>
              A studio where music becomes <span>personal.</span>
            </h1>
            <p>
              NaadNova brings traditional depth, modern structure, and creative freedom into one
              learning space. Come, Learn & Create is not just a tagline here; it is the rhythm of
              every class.
            </p>
            <div className={styles.heroActions}>
              <Button href="/contact" variant="primary">
                Book a Trial
              </Button>
              <Button href="/courses" variant="ghost" icon={<ArrowRight aria-hidden size={18} />}>
                Explore Courses
              </Button>
            </div>
          </Reveal>

          <Reveal className={styles.heroVisual} variant="scale" delay={0.1}>
            <video autoPlay muted loop playsInline preload="metadata" aria-hidden>
              <source src="/musical-instruments.mp4" type="video/mp4" />
            </video>
            <div className={styles.visualOverlay}>
              <span>
                <Headphones aria-hidden size={16} />
                {siteConfig.tagline}
              </span>
              <strong>Tradition tuned for today</strong>
            </div>
            <div className={styles.waveform} aria-hidden>
              {[42, 74, 50, 86, 58, 70, 46, 80, 54].map((height, index) => (
                <i key={`${height}-${index}`} style={{ height: `${height}%` }} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className={styles.pillars}>
        <Container size="xl">
          <Reveal className={styles.centerHeader}>
            <p>Our Philosophy</p>
            <h2>
              Come, Learn & <span>Create</span>
            </h2>
            <small>Three simple movements that keep every lesson human, focused, and expressive.</small>
          </Reveal>

          <div className={styles.pillarGrid}>
            {pillars.map(({ title, description, Icon }, index) => (
              <MotionArticle key={title} className={styles.pillarCard} delay={index * 0.06}>
                <div className={styles.pillarIcon}>
                  <Icon aria-hidden size={20} />
                </div>
                <div>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </MotionArticle>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.instructor}>
        <Container size="xl" className={styles.instructorGrid}>
          <Reveal className={styles.instructorCopy}>
            <p className={styles.eyebrow}>Instructor Journey</p>
            <h2>
              Guided by a mentor who turns practice into <span>presence.</span>
            </h2>
            <p>
              {instructorName} brings a calm, precise, and deeply musical approach to every class.
              His journey is built around one belief: students learn best when technique, emotion,
              and creativity grow together.
            </p>

            <div className={styles.instructorPath}>
              {instructorJourney.map((step, index) => (
                <MotionArticle key={step.title} className={styles.instructorStep} delay={index * 0.06}>
                  <span>{step.marker}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </MotionArticle>
              ))}
            </div>
          </Reveal>

          <Reveal className={styles.instructorVisual} variant="scale" delay={0.1}>
            <figure className={styles.instructorPhoto}>
              <Image
                src={instructorImage}
                alt={`${instructorName} guiding a music lesson`}
                fill
                sizes="(max-width: 1080px) 100vw, 48vw"
                priority={false}
              />
              <figcaption>
                <strong>{instructorName}</strong>
                <span>Lead Music Mentor</span>
              </figcaption>
            </figure>
            <div className={styles.soundprint} aria-hidden>
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className={styles.instructorBadge}>
              <Headphones aria-hidden size={17} />
              <span>{siteConfig.tagline}</span>
            </div>
            <div className={styles.mentorWave} aria-hidden>
              {[36, 64, 48, 84, 52, 72, 42, 78, 58, 88, 46, 68].map((height, index) => (
                <i key={`${height}-${index}`} style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className={styles.instructorNotes}>
              <span>Personal feedback</span>
              <span>Structured riyaaz</span>
              <span>Creative confidence</span>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className={styles.gallery}>
        <Container size="xl">
          <Reveal className={styles.galleryHeader}>
            <p>Gallery</p>
            <h2>
              Moments from the <span>NaadNova rhythm.</span>
            </h2>
          </Reveal>

          <div className={styles.galleryGrid}>
            <Reveal className={styles.galleryFrame} variant="scale">
              <AboutGalleryCarousel slides={gallerySlides} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className={styles.story}>
        <Container size="xl" className={styles.storyGrid}>
          <Reveal className={styles.storyCopy}>
            <p className={styles.eyebrow}>The Studio Story</p>
            <h2>
              Built for learners who want both discipline and <span>flow.</span>
            </h2>
            <p>
              The NaadNova approach respects the patience of classical learning and the speed of
              modern creativity. Students are guided through clear foundations, then encouraged to
              find the sound that feels like their own.
            </p>
          </Reveal>

          <div className={styles.storyPath}>
            {storyBeats.map((beat, index) => (
              <MotionArticle key={beat} className={styles.storyBeat} delay={index * 0.06}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{beat}</p>
              </MotionArticle>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.cta}>
        <Container size="md" className={styles.ctaShell}>
          <Reveal className={styles.ctaInner} variant="scale">
            <div className={styles.ctaGlowViolet} aria-hidden />
            <div className={styles.ctaGlowCyan} aria-hidden />
            <p className={styles.ctaKicker}>Come, Learn & Create</p>
            <h2>
              Join the <span>Movement</span>
            </h2>
            <p>
              Ready to find your frequency? Step into the studio and start shaping the future of
              sound today.
            </p>
            <div className={styles.ctaActions}>
              <Button href="/contact" variant="primary">
                Begin Your Journey
              </Button>
              <Button href="/courses" variant="ghost">
                Explore Curriculum
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
