"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function LeftPanel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(16px)",
  });

  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "3rem 3rem 3rem 2.5rem",
      }}
    >
      {/* blur backdrop behind text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 40% 50%, black 30%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 60% 50% at 40% 50%, black 30%, transparent 100%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      {/* photo + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "2.5rem" }}>
        <div
          style={{
            ...fade(0),
            flexShrink: 0,
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            overflow: "hidden",
            background: "var(--dim)",
          }}
        >
          <img
            src="/assets/images/profile/me.jpeg"
            alt="Madson Aragão"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 20%",
              transform: "scale(1.2)",
              transformOrigin: "center center",
            }}
          />
        </div>

        <h1
          style={{
            ...fade(80),
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 4vw, 4.5rem)",
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "var(--text)",
          }}
        >
          Madson<br />Aragão
        </h1>
      </div>

      {/* description */}
      <p
        style={{
          ...fade(160),
          fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
          color: "var(--muted)",
          lineHeight: 1.7,
          maxWidth: "400px",
          marginBottom: "2.5rem",
          textAlign: "justify",
        }}
      >
        PhD in Bioinformatics at UFMG. Research focused on deep learning,
        antimicrobial peptides, and structural biology. Nextflow Ambassador at Seqera.
      </p>

      {/* email */}
      <div style={{ ...fade(240), marginBottom: "2rem" }}>
        <span style={{ fontSize: "0.875rem", color: "var(--text)", borderBottom: "1px solid var(--border)", paddingBottom: "2px" }}>
          get in touch <span style={{ fontSize: "0.75rem" }}>&#8594;</span>
        </span>
        <br />
        <a
          href="mailto:madsondeluna@gmail.com"
          className="link-muted"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.04em", marginTop: "0.35rem", display: "inline-block" }}
        >
          madsondeluna@gmail.com
        </a>
      </div>

      {/* social links */}
      <div style={{ ...fade(320), display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        {[
          { label: "GitHub", href: "https://github.com/madsondeluna" },
          { label: "Google Scholar", href: "https://scholar.google.com.br/citations?user=GmHvOYsAAAAJ&hl=en" },
          { label: "ResearchGate", href: "https://www.researchgate.net/profile/Madson-Aragao" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/madsonaragao/" },
          { label: "X", href: "https://twitter.com/madsondeluna" },
        ].map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-secondary"
            style={{ fontSize: "0.875rem" }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* theme toggle */}
      <div style={{ ...fade(380), marginTop: "2rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <ThemeToggle />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.08em", lineHeight: 1, paddingTop: "2px" }}>
          Light / Dark
        </span>
      </div>

      {/* copyright */}
      <div
        style={{
          ...fade(400),
          position: "absolute",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "0.5rem 1.25rem",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            maskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 40%, transparent 100%)",
            borderRadius: "inherit",
          }}
        />
        <span
          style={{
            position: "relative",
            fontFamily: "var(--font-mono)",
            fontSize: "0.5625rem",
            color: "var(--muted)",
            letterSpacing: "0.06em",
            opacity: 0.55,
            whiteSpace: "nowrap",
          }}
        >
          &copy; {new Date().getFullYear()}. GROMADS. All rights reserved.
        </span>
      </div>

    </div>
  );
}
