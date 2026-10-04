"use client";

import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { GalleryLightbox } from "./GalleryLightbox";

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
  const [expandedSlide, setExpandedSlide] = useState<GallerySlide | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const closeViewer = useCallback(() => setExpandedSlide(null), []);

  const goToPreviousSlide = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
  };

  useEffect(() => {
    if (reduceMotion || isPaused || expandedSlide) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 3400);

    return () => window.clearInterval(intervalId);
  }, [expandedSlide, isPaused, reduceMotion, slides.length]);

  const handleSlideKeyDown = (event: ReactKeyboardEvent<HTMLElement>, slide: GallerySlide) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setExpandedSlide(slide);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    pointerStartX.current = event.clientX;
    didSwipe.current = false;
    setIsPaused(true);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    didSwipe.current = Math.abs(distance) >= 42;
    if (didSwipe.current) {
      if (distance < 0) goToNextSlide();
      else goToPreviousSlide();
    }
    window.setTimeout(() => {
      didSwipe.current = false;
      setIsPaused(false);
    }, 120);
  };

  const getSlidePosition = (index: number) => {
    let offset = index - activeIndex;

    if (offset > slides.length / 2) {
      offset -= slides.length;
    }

    if (offset < -slides.length / 2) {
      offset += slides.length;
    }

    if (offset === 0) return "active";
    if (offset === -1) return "previous";
    if (offset === 1) return "next";
    if (offset === -2) return "far-previous";
    if (offset === 2) return "far-next";
    return "hidden";
  };

  return (
    <div
      className={styles.galleryCarousel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStartX.current = null;
        setIsPaused(false);
      }}
    >
      <LazyMotion features={domAnimation}>
        <div className={styles.galleryViewport}>
          {slides.map((slide, index) => {
            const position = getSlidePosition(index);
            const isVisible = position !== "hidden";
            return (
              <m.figure
                key={slide.title}
                className={styles.gallerySlide}
                data-position={position}
                role="button"
                tabIndex={isVisible ? 0 : -1}
                aria-hidden={!isVisible}
                initial={false}
                animate={reduceMotion ? { opacity: isVisible ? 1 : 0 } : undefined}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => (isVisible && !didSwipe.current ? setExpandedSlide(slide) : undefined)}
                onKeyDown={(event) => (isVisible ? handleSlideKeyDown(event, slide) : undefined)}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 780px) 86vw, (max-width: 1080px) 56vw, 48rem"
                />
                <figcaption>
                  <Camera aria-hidden size={22} />
                  <strong>{slide.title}</strong>
                  <span>{slide.caption}</span>
                </figcaption>
              </m.figure>
            );
          })}
        </div>

        <div className={styles.galleryControls}>
          <button type="button" aria-label="Previous gallery image" onClick={goToPreviousSlide}>
            <ChevronLeft aria-hidden size={20} />
          </button>
          <button type="button" aria-label="Next gallery image" onClick={goToNextSlide}>
            <ChevronRight aria-hidden size={20} />
          </button>
        </div>

        <div className={styles.galleryDots} aria-label="Gallery slides">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Show ${slide.title}`}
              aria-current={index === activeIndex}
              data-active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {expandedSlide ? <GalleryLightbox slide={expandedSlide} onClose={closeViewer} /> : null}
      </LazyMotion>
    </div>
  );
}
