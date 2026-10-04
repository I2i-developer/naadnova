"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AlertTriangle, BookOpen, CircleUserRound, LayoutDashboard, LogOut, Menu, Music2, PanelLeftClose, PanelLeftOpen, ShieldCheck, UsersRound, X } from "lucide-react";

import { signOut } from "@/app/auth/actions";

import { DashboardThemeProvider, useDashboardTheme } from "./DashboardTheme";
import { NotificationCenter } from "./NotificationCenter";
import { SessionActivity } from "./SessionActivity";
import styles from "./DashboardShell.module.css";

type DashboardShellProps = {
  role: "user" | "admin";
  name: string;
  accountId: string;
  userId: string;
  initialLastSeenAt: string;
  children: React.ReactNode;
};

const studentLinks = [
  { href: "/dashboard", label: "Overview", Icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "My learning", Icon: BookOpen },
  { href: "/dashboard/profile", label: "Profile", Icon: CircleUserRound }
];

const adminLinks = [
  { href: "/admin", label: "Overview", Icon: LayoutDashboard },
  { href: "/admin/enrollments", label: "Enrollments", Icon: ShieldCheck },
  { href: "/admin/courses", label: "Course studio", Icon: BookOpen },
  { href: "/admin/users", label: "Students", Icon: UsersRound },
  { href: "/admin/profile", label: "Profile", Icon: CircleUserRound }
];

export function DashboardShell({ role, name, accountId, userId, initialLastSeenAt, children }: DashboardShellProps) {
  return <DashboardThemeProvider><DashboardShellContent role={role} name={name} accountId={accountId} userId={userId} initialLastSeenAt={initialLastSeenAt}>{children}</DashboardShellContent></DashboardThemeProvider>;
}

function DashboardShellContent({ role, name, accountId, userId, initialLastSeenAt, children }: DashboardShellProps) {
  const links = role === "admin" ? adminLinks : studentLinks;
  const { theme } = useDashboardTheme();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCollapsed(window.localStorage.getItem("naadnova-sidebar-collapsed") === "true");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!showSignOutDialog) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setShowSignOutDialog(false);
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showSignOutDialog]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMobileMenuOpen(false));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    function closeOnOutsidePointer(event: PointerEvent) {
      if (!mobileMenuRef.current?.contains(event.target as Node)) setMobileMenuOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileMenuOpen(false);
    }
    window.addEventListener("pointerdown", closeOnOutsidePointer);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("pointerdown", closeOnOutsidePointer);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileMenuOpen]);

  function toggleSidebar() {
    setCollapsed((current) => {
      window.localStorage.setItem("naadnova-sidebar-collapsed", String(!current));
      return !current;
    });
  }

  return (
    <div className={`${styles.shell} ${collapsed ? styles.collapsed : ""}`} data-theme={theme}>
      <SessionActivity initialLastSeenAt={initialLastSeenAt} />
      <aside className={styles.sidebar}>
        <button className={styles.collapseButton} type="button" onClick={toggleSidebar} title={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? <PanelLeftOpen size={18} aria-hidden /> : <PanelLeftClose size={18} aria-hidden />}
        </button>
        <Link href="/" className={styles.brand} aria-label="Naadnova Academy home">
          <Image src="/logo-new.PNG" alt="Naadnova Academy" width={260} height={160} priority />
          <span className={styles.brandMark}><Music2 size={21} aria-hidden /></span>
        </Link>
        <nav aria-label={`${role} dashboard navigation`}>
          {links.map(({ href, label, Icon }) => (
            <Link key={href} href={href} title={collapsed ? label : undefined}><Icon size={18} aria-hidden /><span>{label}</span></Link>
          ))}
        </nav>
        <div className={styles.account}>
          <div><span>{name}</span><small>{role === "admin" ? "Academy admin" : userId}</small></div>
          <button type="button" title="Sign out" aria-label="Sign out" onClick={() => setShowSignOutDialog(true)}><LogOut size={18} aria-hidden /></button>
        </div>
      </aside>

      <div className={styles.workspace}>
        <header className={styles.mobileHeader}>
          <Image src="/logo-new.PNG" alt="Naadnova Academy" width={180} height={90} />
          <div className={styles.headerActions}>
            <NotificationCenter key={pathname} userId={accountId} />
            <div className={styles.mobileMenu} ref={mobileMenuRef}>
              <button className={styles.mobileMenuButton} type="button" aria-label={mobileMenuOpen ? "Close dashboard menu" : "Open dashboard menu"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((current) => !current)}>
                {mobileMenuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
              </button>
              {mobileMenuOpen ? (
                <nav>
                  {links.map(({ href, label }) => <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}>{label}</Link>)}
                  <button className={styles.mobileSignOut} type="button" onClick={() => { setMobileMenuOpen(false); setShowSignOutDialog(true); }}><LogOut size={16} aria-hidden /> Sign out</button>
                </nav>
              ) : null}
            </div>
          </div>
        </header>
        <main className={styles.content}>{children}</main>
      </div>

      {showSignOutDialog ? (
        <div className={styles.dialogBackdrop} role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowSignOutDialog(false);
        }}>
          <section className={styles.signOutDialog} role="dialog" aria-modal="true" aria-labelledby="signout-title" aria-describedby="signout-description">
            <button className={styles.dialogClose} type="button" onClick={() => setShowSignOutDialog(false)} aria-label="Close sign out confirmation"><X size={18} aria-hidden /></button>
            <span className={styles.dialogIcon}><AlertTriangle size={24} aria-hidden /></span>
            <p>End session</p>
            <h2 id="signout-title">Sign out of Naadnova?</h2>
            <span id="signout-description">Your current learning session will close on this device.</span>
            <div className={styles.dialogActions}>
              <button type="button" onClick={() => setShowSignOutDialog(false)}>Stay signed in</button>
              <form action={signOut}><button type="submit"><LogOut size={16} aria-hidden /> Sign out</button></form>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
