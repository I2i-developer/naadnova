import clsx from "clsx";

import type { Course } from "@/config/site";
import { MotionArticle } from "@/components/motion/MotionCard";
import { Button } from "@/components/ui/Button";

import styles from "./CourseCard.module.css";

type CourseCardProps = {
  course: Course;
  delay?: number;
};

export function CourseCard({ course, delay = 0 }: CourseCardProps) {
  const { Icon } = course;

  return (
    <MotionArticle className={clsx(styles.card, styles[course.accent])} delay={delay}>
      <div className={styles.iconWrap}>
        <Icon aria-hidden size={30} strokeWidth={1.8} />
      </div>
      <div>
        <p className={styles.kicker}>{course.level}</p>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
      </div>
      <div className={styles.footer}>
        <span>{course.age}</span>
        <Button href={`/courses/${course.slug}`} variant="link">
          Learn More
        </Button>
      </div>
    </MotionArticle>
  );
}
