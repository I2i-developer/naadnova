"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SessionActivity } from "@/components/dashboard/SessionActivity";
import { Button } from "@/components/ui/Button";
import { authItems, navItems, siteConfig } from "@/config/site";

import styles from "./Navbar.module.css";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<{ dashboardHref: string; lastSeenAt: string } | null | undefined>(undefined);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsOpen(false));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    function closeOnOutsidePointer(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("pointerdown", closeOnOutsidePointer);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("pointerdown", closeOnOutsidePointer);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSession() {
      try {
        const response = await fetch("/api/auth/session/status", { cache: "no-store", signal: controller.signal });
        const result = await response.json() as { authenticated?: boolean; dashboardHref?: string; lastSeenAt?: string };
        setSession(result.authenticated && result.dashboardHref && result.lastSeenAt
          ? { dashboardHref: result.dashboardHref, lastSeenAt: result.lastSeenAt }
          : null);
      } catch (error) {
        if ((error as Error).name !== "AbortError") setSession(null);
      }
    }

    void loadSession();
    window.addEventListener("focus", loadSession);
    return () => {
      controller.abort();
      window.removeEventListener("focus", loadSession);
    };
  }, [pathname]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className={styles.header} ref={headerRef}>
      {session ? <SessionActivity initialLastSeenAt={session.lastSeenAt} /> : null}
      <div className={styles.inner}>
        <Link className={styles.logo} href="/" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/logo-new.PNG"
            alt={siteConfig.name}
            width={260}
            height={160}
            priority
            className={styles.logoImage}
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? styles.activeLink : undefined}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.desktopCta}>
          {session === undefined ? <span className={styles.authPlaceholder} aria-hidden /> : session ? (
            <Button href={session.dashboardHref} variant="primary">Dashboard</Button>
          ) : (
            <>
              <Link
                href="/login"
                className={`${styles.loginLink} ${isActive("/login") ? styles.activeLink : ""}`}
                aria-current={isActive("/login") ? "page" : undefined}
              >
                Login
              </Link>
              <Button href="/signup" variant="primary">Sign Up</Button>
            </>
          )}
        </div>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
        </button>
      </div>

      {isOpen ? (
        <div className={styles.mobilePanel}>
          <nav aria-label="Mobile navigation">
            {[...navItems, ...(session ? [{ label: "Dashboard", href: session.dashboardHref }] : session === null ? authItems : [])].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? styles.activeLink : undefined}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href="/contact" variant="primary">
            {siteConfig.primaryCta}
          </Button>
          <p>
            {siteConfig.contact.phone} · {siteConfig.contact.location}
          </p>
        </div>
      ) : null}
    </header>
  );
}
