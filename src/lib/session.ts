export const SESSION_IDLE_TIMEOUT_MS = 30 * 60 * 1000;
export const SESSION_ACTIVITY_STORAGE_KEY = "naadnova-session-last-activity";
export const SESSION_EVENT_STORAGE_KEY = "naadnova-session-event";

export function hasSessionExpired(lastSeenAt: string | number | Date) {
  const timestamp = new Date(lastSeenAt).getTime();
  return !Number.isFinite(timestamp) || Date.now() - timestamp >= SESSION_IDLE_TIMEOUT_MS;
}
