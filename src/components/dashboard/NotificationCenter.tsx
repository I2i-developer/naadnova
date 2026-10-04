"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, BellRing, BookOpen, CheckCheck, CreditCard, ShieldCheck, UserPlus, X } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

import styles from "./NotificationCenter.module.css";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

type NotificationCenterProps = {
  userId: string;
};

function relativeTime(value: string) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 45) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(new Date(value));
}

function NotificationIcon({ type }: { type: string }) {
  if (type === "lesson") return <BookOpen size={17} aria-hidden />;
  if (type === "payment") return <CreditCard size={17} aria-hidden />;
  if (type === "access") return <ShieldCheck size={17} aria-hidden />;
  if (type === "new_student") return <UserPlus size={17} aria-hidden />;
  return <BellRing size={17} aria-hidden />;
}

export function NotificationCenter({ userId }: NotificationCenterProps) {
  const supabase = useMemo(() => createClient(), []);
  const centerRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<Notification | null>(null);

  const unreadCount = notifications.reduce((count, notification) => count + (notification.read_at ? 0 : 1), 0);

  useEffect(() => {
    let mounted = true;

    async function loadNotifications() {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(30);

      if (mounted) {
        setNotifications(data ?? []);
        setLoading(false);
      }
    }

    void loadNotifications();

    const channel = supabase
      .channel(`dashboard-notifications:${userId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` },
        (payload) => {
          const incoming = payload.new as Notification;
          setNotifications((current) => [incoming, ...current.filter((item) => item.id !== incoming.id)].slice(0, 30));
          setToast(incoming);
          if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
          toastTimerRef.current = setTimeout(() => setToast(null), 4500);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "notifications", filter: `user_id=eq.${userId}` },
        (payload) => {
          const updated = payload.new as Notification;
          setNotifications((current) => current.map((item) => item.id === updated.id ? updated : item));
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      void supabase.removeChannel(channel);
    };
  }, [supabase, userId]);

  useEffect(() => {
    if (!open) return;

    function closeOnOutsidePointer(event: PointerEvent) {
      if (!centerRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("pointerdown", closeOnOutsidePointer);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("pointerdown", closeOnOutsidePointer);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  async function markRead(notification: Notification) {
    if (notification.read_at) return;
    const readAt = new Date().toISOString();
    setNotifications((current) => current.map((item) => item.id === notification.id ? { ...item, read_at: readAt } : item));
    await supabase.from("notifications").update({ read_at: readAt }).eq("id", notification.id).eq("user_id", userId);
  }

  async function markAllRead() {
    if (!unreadCount) return;
    const readAt = new Date().toISOString();
    setNotifications((current) => current.map((item) => item.read_at ? item : { ...item, read_at: readAt }));
    await supabase.from("notifications").update({ read_at: readAt }).eq("user_id", userId).is("read_at", null);
  }

  return (
    <div className={styles.center} ref={centerRef}>
      <button
        className={styles.trigger}
        type="button"
        aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : "Notifications"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {unreadCount ? <BellRing size={19} aria-hidden /> : <Bell size={19} aria-hidden />}
        {unreadCount ? <span className={styles.badge}>{unreadCount > 9 ? "9+" : unreadCount}</span> : null}
      </button>

      {open ? (
        <section className={styles.panel} aria-label="Notifications">
          <div className={styles.panelHeader}>
            <div>
              <span>Activity feed</span>
              <h2>Notifications</h2>
            </div>
            {unreadCount ? (
              <button type="button" onClick={() => void markAllRead()}><CheckCheck size={15} aria-hidden /> Mark all read</button>
            ) : null}
          </div>

          <div className={styles.list}>
            {loading ? <p className={styles.state}>Tuning your updates...</p> : null}
            {!loading && notifications.length === 0 ? (
              <div className={styles.empty}><Bell size={22} aria-hidden /><strong>You are all caught up</strong><span>New academy activity will appear here in real time.</span></div>
            ) : null}
            {notifications.map((notification) => {
              const content = (
                <>
                  <span className={styles.itemIcon} data-type={notification.type}><NotificationIcon type={notification.type} /></span>
                  <span className={styles.itemCopy}>
                    <span className={styles.itemTopline}><strong>{notification.title}</strong><time dateTime={notification.created_at}>{relativeTime(notification.created_at)}</time></span>
                    <span>{notification.message}</span>
                  </span>
                  {!notification.read_at ? <i className={styles.unreadDot} aria-label="Unread" /> : null}
                </>
              );

              return notification.href ? (
                <Link key={notification.id} className={styles.item} data-unread={!notification.read_at} href={notification.href} onClick={() => void markRead(notification)}>{content}</Link>
              ) : (
                <button key={notification.id} className={styles.item} data-unread={!notification.read_at} type="button" onClick={() => void markRead(notification)}>{content}</button>
              );
            })}
          </div>
        </section>
      ) : null}

      {toast ? (
        <div className={styles.toast} role="status">
          <span className={styles.itemIcon} data-type={toast.type}><NotificationIcon type={toast.type} /></span>
          <span><strong>{toast.title}</strong><small>{toast.message}</small></span>
          <button type="button" onClick={() => setToast(null)} aria-label="Dismiss notification"><X size={15} aria-hidden /></button>
        </div>
      ) : null}
    </div>
  );
}
