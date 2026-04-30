"use client";

import { useEffect, useState } from "react";
import { HeroCanvas } from "./hero-canvas";

export function Hero() {
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
    <section
      style={{
        minHeight: "100svh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        className="hero-canvas-wrap"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "70%",
          zIndex: 0,
        }}
      >
        <HeroCanvas />
      </div>

      <div
        style={{
          maxWidth: "860px",
          margin: "0",
          padding: "120px 2.5rem 80px 2.5rem",
          width: "100%",
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: "0",
        }}
      >
        {/* text content */}
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          {/* name + photo side by side */}
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", marginBottom: "3rem" }}>
            <div
              className="hero-photo-block"
              style={{
                ...fade(0),
                flexShrink: 0,
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "none",
                background: "var(--dim)",
              }}
            >
              <img
                src="/assets/images/profile/me.jpeg"
                alt="Madson Aragão"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", transform: "scale(1.2)", transformOrigin: "center center" }}
              />
            </div>

            <h1
              style={{
                ...fade(80),
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.5rem, 8.5vw, 8rem)",
                fontWeight: 300,
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                color: "var(--text)",
              }}
            >
              Madson<br />Aragão
            </h1>
          </div>

          <p
            style={{
              ...fade(160),
              fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: "580px",
              marginBottom: "3.5rem",
              textAlign: "justify",
            }}
          >
            PhD in Bioinformatics at UFMG. Research focused on deep learning,
            antimicrobial peptides, and structural biology. Nextflow Ambassador at Seqera.
          </p>

          <div
            style={{
              ...fade(240),
              display: "flex",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              <span style={{ fontSize: "1rem", color: "var(--text)", borderBottom: "1px solid var(--border)", paddingBottom: "2px" }}>
                get in touch <span style={{ fontSize: "0.85rem" }}>&#8594;</span>
              </span>
              <a href="mailto:madsondeluna@gmail.com" className="link-muted" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.04em" }}>
                madsondeluna@gmail.com
              </a>
            </span>
            <a href="https://github.com/madsondeluna" target="_blank" rel="noopener noreferrer" className="link-secondary" style={{ fontSize: "1rem" }}>
              GitHub
            </a>
            <a href="https://scholar.google.com.br/citations?user=GmHvOYsAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="link-secondary" style={{ fontSize: "1rem" }}>
              Google Scholar
            </a>
            <a href="https://www.linkedin.com/in/madsonaragao/" target="_blank" rel="noopener noreferrer" className="link-secondary" style={{ fontSize: "1rem" }}>
              LinkedIn
            </a>
            <a href="https://twitter.com/madsondeluna" target="_blank" rel="noopener noreferrer" className="link-secondary" style={{ fontSize: "1rem" }}>
              X
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          ...fade(400),
          position: "absolute",
          bottom: "2.5rem",
          right: "2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            color: "var(--muted)",
            letterSpacing: "0.08em",
            writingMode: "vertical-rl",
          }}
        >
          scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, var(--muted), transparent)",
          }}
        />
      </div>
    </section>
  );
}
