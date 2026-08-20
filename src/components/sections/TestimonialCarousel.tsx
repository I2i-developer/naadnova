"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import styles from "@/app/page.module.css";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
  accent: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const visibleTestimonials = useMemo(
    () => testimonials.map((_, index) => testimonials[(activeIndex + index) % testimonials.length]),
    [activeIndex, testimonials]
  );

  useEffect(() => {
    if (reduceMotion || isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
      );
    }, 3600);

    return () => window.clearInterval(intervalId);
  }, [isPaused, reduceMotion, testimonials.length]);

  const cardStates = [
    { opacity: 0.78, rotateY: 13, scale: 0.94, x: 18, z: -55 },
    { opacity: 1, rotateY: 0, scale: 1.04, x: 0, z: 80 },
    { opacity: 0.78, rotateY: -13, scale: 0.94, x: -18, z: -55 }
  ];

  return (
    <div
      className={styles.testimonialCarouselShell}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <LazyMotion features={domAnimation}>
        <div className={styles.testimonialGrid}>
          {visibleTestimonials.map((testimonial, index) => (
            <m.article
              key={testimonial.name}
              layout
              className={styles.testimonialCard}
              data-position={index === 1 ? "center" : index === 0 ? "left" : "right"}
              data-accent={testimonial.accent}
              initial={false}
              animate={
                reduceMotion
                  ? { opacity: 1, rotateY: 0, scale: 1, x: 0, z: 0 }
                  : cardStates[index]
              }
              transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.stars} aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    aria-hidden
                    size={22}
                    strokeWidth={1.7}
                  />
                ))}
              </div>
              <p>&quot;{testimonial.quote}&quot;</p>
              <div className={styles.author}>
                <span className={styles.avatar}>
                  <Image src={testimonial.image} alt={testimonial.name} width={48} height={48} />
                </span>
                <div>
                  <strong>{testimonial.name}</strong>
                  <small>{testimonial.role}</small>
                </div>
              </div>
            </m.article>
          ))}
        </div>
      </LazyMotion>
    </div>
  );
}
