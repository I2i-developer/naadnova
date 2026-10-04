import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

import styles from "./LegalDocumentPage.module.css";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalDocumentPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  highlights: string[];
  sections: LegalSection[];
};

export function LegalDocumentPage({
  eyebrow,
  title,
  description,
  updatedAt,
  highlights,
  sections
}: LegalDocumentPageProps) {
  return (
    <>
      <section className={styles.hero}>
        <Container size="xl" className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className={styles.actions}>
              <Button href="/contact" variant="primary">
                Contact NaadNova
              </Button>
              <Button href="/" variant="ghost">
                Back to Home
              </Button>
            </div>
          </div>

          <aside className={styles.summary} aria-label={`${title} summary`}>
            <span>Last updated</span>
            <strong>{updatedAt}</strong>
            <div>
              {highlights.map((highlight) => (
                <p key={highlight}>{highlight}</p>
              ))}
            </div>
          </aside>
        </Container>
      </section>

      <section className={styles.document}>
        <Container size="lg" className={styles.documentGrid}>
          <nav className={styles.index} aria-label={`${title} sections`}>
            <span>On this page</span>
            {sections.map((section, index) => (
              <Link key={section.title} href={`#section-${index + 1}`}>
                {section.title}
              </Link>
            ))}
          </nav>

          <div className={styles.content}>
            {sections.map((section, index) => (
              <article key={section.title} id={`section-${index + 1}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}

            <div className={styles.notice}>
              <strong>Review note</strong>
              <p>
                This page is drafted for {siteConfig.name}&apos;s website experience and should be
                reviewed before launch to match final business, payment, location, and legal
                requirements.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
