"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type DashboardTheme = "dark" | "light";

type DashboardThemeValue = {
  theme: DashboardTheme;
  setTheme: (theme: DashboardTheme) => void;
};

const DashboardThemeContext = createContext<DashboardThemeValue | null>(null);

export function DashboardThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<DashboardTheme>("dark");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedTheme = window.localStorage.getItem("naadnova-dashboard-theme");
      if (savedTheme === "light" || savedTheme === "dark") setThemeState(savedTheme);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function setTheme(nextTheme: DashboardTheme) {
    window.localStorage.setItem("naadnova-dashboard-theme", nextTheme);
    setThemeState(nextTheme);
  }

  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <DashboardThemeContext.Provider value={value}>{children}</DashboardThemeContext.Provider>;
}

export function useDashboardTheme() {
  const value = useContext(DashboardThemeContext);
  if (!value) throw new Error("useDashboardTheme must be used inside DashboardThemeProvider");
  return value;
}
