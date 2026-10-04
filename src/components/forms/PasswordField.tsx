"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import styles from "@/app/login/page.module.css";

export function PasswordField() {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.passwordField}>
      <input
        name="password"
        type={visible ? "text" : "password"}
        placeholder="Enter your password"
        autoComplete="current-password"
        required
      />
      <button
        type="button"
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        title={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? <EyeOff aria-hidden size={18} /> : <Eye aria-hidden size={18} />}
      </button>
    </div>
  );
}
