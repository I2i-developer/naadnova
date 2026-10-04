"use client";

import { useEffect } from "react";

import { SESSION_ACTIVITY_STORAGE_KEY, SESSION_EVENT_STORAGE_KEY, SESSION_IDLE_TIMEOUT_MS } from "@/lib/session";

const HEARTBEAT_INTERVAL_MS = 60_000;
const ACTIVITY_THROTTLE_MS = 2_000;

export function SessionActivity({ initialLastSeenAt }: { initialLastSeenAt: string }) {
  useEffect(() => {
    let lastActivity = Math.max(
      new Date(initialLastSeenAt).getTime(),
      Number(window.localStorage.getItem(SESSION_ACTIVITY_STORAGE_KEY)) || 0
    );
    let lastRecordedActivity = 0;
    let lastHeartbeat = 0;
    let isEndingSession = false;

    async function endSession(reason: "idle_timeout" | "session_expired") {
      if (isEndingSession) return;
      isEndingSession = true;
      window.localStorage.setItem(SESSION_EVENT_STORAGE_KEY, JSON.stringify({ type: "logout", at: Date.now(), reason }));
      await fetch("/api/auth/session/logout", { method: "POST", keepalive: true }).catch(() => undefined);
      window.location.replace(`/login?error=${reason}`);
    }

    function sendHeartbeat(now: number) {
      if (now - lastHeartbeat < HEARTBEAT_INTERVAL_MS) return;
      lastHeartbeat = now;
      void fetch("/api/auth/session/activity", { method: "POST", keepalive: true }).then((response) => {
        if (response.status === 401) void endSession("session_expired");
      }).catch(() => undefined);
    }

    function recordActivity() {
      const now = Date.now();
      if (now - lastActivity >= SESSION_IDLE_TIMEOUT_MS) {
        void endSession("idle_timeout");
        return;
      }
      if (now - lastRecordedActivity < ACTIVITY_THROTTLE_MS) return;
      lastRecordedActivity = now;
      lastActivity = now;
      window.localStorage.setItem(SESSION_ACTIVITY_STORAGE_KEY, String(now));
      sendHeartbeat(now);
    }

    function handleVisibilityChange() {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      const sharedActivity = Number(window.localStorage.getItem(SESSION_ACTIVITY_STORAGE_KEY)) || lastActivity;
      lastActivity = Math.max(lastActivity, sharedActivity);
      if (now - lastActivity >= SESSION_IDLE_TIMEOUT_MS) void endSession("idle_timeout");
      else recordActivity();
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === SESSION_ACTIVITY_STORAGE_KEY && event.newValue) {
        lastActivity = Math.max(lastActivity, Number(event.newValue) || 0);
      }
      if (event.key === SESSION_EVENT_STORAGE_KEY && event.newValue) {
        try {
          const sessionEvent = JSON.parse(event.newValue) as { type?: string; reason?: "idle_timeout" | "session_expired" };
          if (sessionEvent.type === "logout") window.location.replace(`/login?error=${sessionEvent.reason ?? "session_expired"}`);
        } catch {
          // Ignore malformed events from unrelated local storage changes.
        }
      }
    }

    const now = Date.now();
    if (!lastActivity || now - lastActivity >= SESSION_IDLE_TIMEOUT_MS) {
      lastActivity = new Date(initialLastSeenAt).getTime();
    }
    recordActivity();

    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, recordActivity, { passive: true }));
    window.addEventListener("storage", handleStorage);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    const timer = window.setInterval(() => {
      const sharedActivity = Number(window.localStorage.getItem(SESSION_ACTIVITY_STORAGE_KEY)) || lastActivity;
      lastActivity = Math.max(lastActivity, sharedActivity);
      if (Date.now() - lastActivity >= SESSION_IDLE_TIMEOUT_MS) void endSession("idle_timeout");
    }, 1_000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, recordActivity));
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearInterval(timer);
    };
  }, [initialLastSeenAt]);

  return null;
}
