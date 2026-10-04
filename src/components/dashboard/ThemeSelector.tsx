"use client";

import { Moon, Sun } from "lucide-react";

import { useDashboardTheme } from "./DashboardTheme";
import styles from "./ThemeSelector.module.css";

export function ThemeSelector({ description = "Choose the palette that feels most comfortable while you learn." }: { description?: string }) {
  const { theme, setTheme } = useDashboardTheme();

  return (
    <section className={styles.panel} aria-labelledby="dashboard-appearance-title">
      <div>
        <p>Appearance</p>
        <h2 id="dashboard-appearance-title">Dashboard mode</h2>
        <span>{description}</span>
      </div>
      <div className={styles.control} role="group" aria-label="Dashboard color mode">
        <button type="button" className={theme === "light" ? styles.active : ""} onClick={() => setTheme("light")} aria-pressed={theme === "light"}>
          <Sun size={17} aria-hidden /> Light
        </button>
        <button type="button" className={theme === "dark" ? styles.active : ""} onClick={() => setTheme("dark")} aria-pressed={theme === "dark"}>
          <Moon size={17} aria-hidden /> Dark
        </button>
      </div>
    </section>
  );
}
