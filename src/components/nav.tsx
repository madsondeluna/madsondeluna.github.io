"use client";

import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const TABS = [
  { label: "home", hash: "#home" },
  { label: "about", hash: "#about" },
  { label: "career", hash: "#career" },
  { label: "research", hash: "#research" },
  { label: "teaching", hash: "#teaching" },
  { label: "projects", hash: "#projects" },
  { label: "contact", hash: "#contact" },
];

interface NavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

export function Nav({ activeTab, onTabChange, scrollRef }: NavProps) {
  function handleTab(hash: string) {
    const tab = hash.replace("#", "");
    onTabChange(tab);
    window.history.replaceState(null, "", hash);
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        border: "none",
        background: "transparent",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        padding: "0 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
      }}
    >
      <nav style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
        {TABS.map((tab) => (
          <TabLink
            key={tab.hash}
            label={tab.label}
            active={activeTab === tab.hash.replace("#", "")}
            onClick={() => handleTab(tab.hash)}
          />
        ))}
      </nav>
      <ThemeToggle />
    </div>
  );
}

function TabLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "2px 0",
        fontSize: "0.8125rem",
        color: active || hovered ? "var(--text)" : "var(--muted)",
        borderBottom: active ? "1px solid var(--text)" : "1px solid transparent",
        transition: "color 0.2s ease, border-color 0.2s ease",
        fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );
}
