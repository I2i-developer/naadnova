"use client";

import type { ReactNode } from "react";
import type { HTMLMotionProps } from "framer-motion";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

type SharedMotionProps = {
  children: ReactNode;
  delay?: number;
  hover?: "lift" | "none";
};

type ArticleMotionProps = SharedMotionProps &
  Omit<
    HTMLMotionProps<"article">,
    | "initial"
    | "whileInView"
    | "whileHover"
    | "whileTap"
    | "viewport"
    | "variants"
    | "transition"
  >;

type DetailsMotionProps = SharedMotionProps &
  Omit<
    HTMLMotionProps<"details">,
    "initial" | "whileInView" | "whileHover" | "viewport" | "variants" | "transition"
  >;

const cardMotion = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

const transition = {
  duration: 0.62,
  ease: [0.22, 1, 0.36, 1]
} as const;

export function MotionArticle({
  children,
  delay = 0,
  hover = "lift",
  ...props
}: ArticleMotionProps) {
  const reduceMotion = useReducedMotion();
  const shouldLift = !reduceMotion && hover === "lift";

  return (
    <LazyMotion features={domAnimation}>
      <m.article
        {...props}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        whileHover={shouldLift ? { y: -7, scale: 1.015 } : undefined}
        whileTap={shouldLift ? { scale: 0.99 } : undefined}
        viewport={{ once: true, amount: 0.28 }}
        variants={reduceMotion ? undefined : cardMotion}
        transition={reduceMotion ? undefined : { ...transition, delay }}
      >
        {children}
      </m.article>
    </LazyMotion>
  );
}

export function MotionDetails({
  children,
  delay = 0,
  ...props
}: DetailsMotionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <m.details
        {...props}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        whileHover={reduceMotion ? undefined : { y: -5 }}
        viewport={{ once: true, amount: 0.3 }}
        variants={reduceMotion ? undefined : cardMotion}
        transition={reduceMotion ? undefined : { ...transition, delay }}
      >
        {children}
      </m.details>
    </LazyMotion>
  );
}
