"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { authItems, navItems, siteConfig } from "@/config/site";

import styles from "./Navbar.module.css";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/logo.PNG"
            alt={siteConfig.name}
            width={260}
            height={140}
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
          <Link
            href="/login"
            className={isActive("/login") ? styles.activeLink : undefined}
            aria-current={isActive("/login") ? "page" : undefined}
          >
            Login
          </Link>
          <Button href="/signup" variant="primary">
            Sign Up
          </Button>
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
            {[...navItems, ...authItems].map((item) => (
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
