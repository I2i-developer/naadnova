import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "link";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  iconTrailing?: boolean;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export function Button({
  children,
  variant = "primary",
  icon,
  iconTrailing = true,
  className,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const content = (
    <>
      {!iconTrailing && icon}
      <span>{children}</span>
      {iconTrailing && (icon ?? <ArrowRight aria-hidden size={18} strokeWidth={2.2} />)}
    </>
  );

  const classes = clsx(styles.button, styles[variant], className);

  if ("href" in props && typeof props.href === "string") {
    const { href, ...linkProps } = props;

    return (
      <Link className={classes} href={href} {...linkProps}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
