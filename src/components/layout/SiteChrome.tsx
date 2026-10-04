"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWorkspace = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  if (isWorkspace) return <>{children}</>;
  return <><Navbar /><main className="main-shell">{children}</main><Footer /></>;
}
