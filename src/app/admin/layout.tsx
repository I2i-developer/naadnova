import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, activeSession } = await requireAdmin();
  return <DashboardShell role="admin" name={profile?.full_name ?? user.email ?? "Admin"} accountId={user.id} userId={user.id} initialLastSeenAt={activeSession.last_seen_at}>{children}</DashboardShell>;
}
