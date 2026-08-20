import type { ReactNode } from "react";
import clsx from "clsx";

import styles from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

export function Container({ children, size = "lg", className }: ContainerProps) {
  return <div className={clsx(styles.container, styles[size], className)}>{children}</div>;
}
