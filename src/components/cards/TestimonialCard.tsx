import { Star } from "lucide-react";

import { MotionArticle } from "@/components/motion/MotionCard";

import styles from "./TestimonialCard.module.css";

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  rating: number;
  delay?: number;
};

export function TestimonialCard({ quote, name, role, rating, delay = 0 }: TestimonialCardProps) {
  return (
    <MotionArticle className={styles.card} delay={delay}>
      <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, index) => (
          <Star key={index} aria-hidden size={16} fill="currentColor" />
        ))}
      </div>
      <blockquote>{quote}</blockquote>
      <footer>
        <strong>{name}</strong>
        <span>{role}</span>
      </footer>
    </MotionArticle>
  );
}
