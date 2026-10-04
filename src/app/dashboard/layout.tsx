import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, activeSession } = await requireUser();
  if (profile?.role === "admin") {
    // Admins may still inspect the student experience without losing admin navigation elsewhere.
  }
  return <DashboardShell role="user" name={profile?.full_name ?? user.email ?? "Student"} accountId={user.id} userId={profile?.student_code ?? "Student ID pending"} initialLastSeenAt={activeSession.last_seen_at}>{children}</DashboardShell>;
}
