import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./Section.module.css";

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "surface" | "dark";
  id?: string;
};

export function Section({ children, className, tone = "default", id }: SectionProps) {
  return (
    <section id={id} className={clsx(styles.section, styles[tone], className)}>
      {children}
    </section>
  );
}
