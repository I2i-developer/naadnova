"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import styles from "@/app/about/page.module.css";

type GallerySlide = {
  title: string;
  caption: string;
  image: string;
};

type AboutGalleryCarouselProps = {
  slides: GallerySlide[];
};

export function AboutGalleryCarousel({ slides }: AboutGalleryCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 3400);

    return () => window.clearInterval(intervalId);
  }, [isPaused, reduceMotion, slides.length]);

  const visibleSlides = useMemo(
    () => [0, 1, 2].map((offset) => slides[(activeIndex + offset) % slides.length]),
    [activeIndex, slides]
  );

  return (
    <div
      className={styles.galleryCarousel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <LazyMotion features={domAnimation}>
        {visibleSlides.map((slide, index) => (
          <m.figure
            key={slide.title}
            layout
            className={styles.gallerySlide}
            data-position={index === 0 ? "active" : index === 1 ? "next" : "last"}
            initial={false}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: index === 0 ? 1 : 0.985 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="(max-width: 780px) 50vw, (max-width: 1080px) 100vw, 64vw"
            />
            <figcaption>
              <Camera aria-hidden size={22} />
              <strong>{slide.title}</strong>
              <span>{slide.caption}</span>
            </figcaption>
          </m.figure>
        ))}

        <div className={styles.galleryDots} aria-hidden>
          {slides.map((slide, index) => (
            <span key={slide.title} data-active={index === activeIndex} />
          ))}
        </div>
      </LazyMotion>
    </div>
  );
}
