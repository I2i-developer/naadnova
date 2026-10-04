import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { authItems, navItems, siteConfig } from "@/config/site";

import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link className={styles.logo} href="/">
            <Image
              src="/logo-new.PNG"
              alt={siteConfig.name}
              width={320}
              height={172}
              className={styles.logoImage}
            />
          </Link>
          <p>
            <strong>{siteConfig.tagline}</strong> through premium music learning with a personal,
            structured, and performance-minded approach.
          </p>
          <div className={styles.socials} aria-label="Social media">
            <Link href={siteConfig.social.instagram} aria-label="Instagram">
              <Image
                src="/instagram-1-svgrepo-com.svg"
                alt=""
                width={22}
                height={22}
                aria-hidden
              />
            </Link>
            <Link href={siteConfig.social.youtube} aria-label="YouTube">
              <Image src="/youtube-svgrepo-com.svg" alt="" width={22} height={22} aria-hidden />
            </Link>
            <Link href={siteConfig.social.facebook} aria-label="Facebook">
              <Image
                src="/facebook-1-svgrepo-com.svg"
                alt=""
                width={22}
                height={22}
                aria-hidden
              />
            </Link>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h2>Navigate</h2>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Account navigation">
          <h2>Account</h2>
          {authItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div>
          <h2>Contact</h2>
          <p>{siteConfig.contact.phone}</p>
          <p>{siteConfig.contact.email}</p>
          <p>{siteConfig.contact.location}</p>
          <p>{siteConfig.contact.hours}</p>
          <p>
            <Link href={siteConfig.links.googleBusinessProfile}>Google Business Profile</Link>
          </p>
        </div>

        <div className={styles.join}>
          <h2>Join the Rhythm</h2>
          <p>Get the latest updates on new courses and sonic experiments.</p>
          <form>
            <label className={styles.srOnly} htmlFor="footer-email">
              Email address
            </label>
            <input id="footer-email" type="email" placeholder="Your email address" />
            <Button type="submit" variant="primary" iconTrailing={false}>
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>{"\u00a9"} {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
        <span>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </span>
      </div>
    </footer>
  );
}
