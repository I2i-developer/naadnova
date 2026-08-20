import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

import styles from "./PlaceholderPage.module.css";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PlaceholderPage({ eyebrow, title, description, children }: PlaceholderPageProps) {
  return (
    <Section className={styles.shell}>
      <Container size="md">
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {children ? <div className={styles.content}>{children}</div> : null}
        <div className={styles.actions}>
          <Button href="/contact" variant="primary">
            {siteConfig.primaryCta}
          </Button>
          <Button href="/" variant="ghost">
            Back to Home
          </Button>
        </div>
      </Container>
    </Section>
  );
}
