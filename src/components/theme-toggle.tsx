"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  const color = hovered ? "var(--text)" : "var(--muted)";

  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={dark ? "switch to light" : "switch to dark"}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        transition: "color 0.2s ease",
      }}
    >
      <span style={{
        fontSize: "1.5rem",
        color,
        lineHeight: 1,
        transition: "color 0.2s ease",
        fontFamily: "var(--font-mono)",
      }}>
        ◐
      </span>
    </button>
  );
}
