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
      className="left-panel"
      style={{
        position: "relative",
        zIndex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "4.5rem 3rem 2rem 2.5rem",
      }}
    >
      {/* blur backdrop behind text */}
      <div
        className="left-panel-blur"
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(72px)",
          WebkitBackdropFilter: "blur(72px)",
          WebkitMaskImage: "linear-gradient(to right, black 85%, transparent 100%)",
          maskImage: "linear-gradient(to right, black 85%, transparent 100%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      {/* photo + name */}
      <div className="left-identity" style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "1.5rem" }}>
        <div
          className="left-photo"
          style={{
            ...fade(0),
            flexShrink: 0,
            width: "140px",
            height: "140px",
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
          className="left-name"
          style={{
            ...fade(80),
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "var(--text)",
          }}
        >
          Madson<br />Aragão
        </h1>
      </div>

      {/* timeline */}
      <div style={{ ...fade(160), marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.575rem", fontFamily: "var(--font-mono)", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          formation
        </span>
        <div style={{ position: "relative", paddingLeft: "1.1rem", marginTop: "0.4rem" }}>
          <div style={{ position: "absolute", left: "4px", top: "6px", bottom: "6px", width: "1px", background: "var(--border)" }} />
          {[
            { year: "2024–Now", degree: "PhD in Bioinformatics", institution: "Federal University of Minas Gerais, Brazil", ongoing: true },
            { year: "2024–Now", degree: "MBA in Software Engineering", institution: "University of São Paulo, Brazil", ongoing: true },
            { year: "2024–2026", degree: "MBA in Data Science & Analytics", institution: "Pontifical Catholic University of Rio de Janeiro, Brazil", ongoing: false },
            { year: "2022–2024", degree: "MSc in Genetics & Molecular Biology", institution: "Federal University of Pernambuco, Brazil", ongoing: false },
            { year: "2014–2022", degree: "BSc in Biomedical Sciences", institution: "Federal University of Pernambuco, Brazil", ongoing: false },
            { year: "2011–2013", degree: "A.S. in Software Development", institution: "State Technical School of Pernambuco, Brazil", ongoing: false },
          ].map((entry, i) => (
            <div key={i} style={{ position: "relative", marginBottom: "0.55rem" }}>
              <div style={{
                position: "absolute",
                left: "-1.1rem",
                top: "5px",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: entry.ongoing ? "var(--accent)" : "var(--border)",
                border: "1px solid var(--border-hover)",
              }} />
              <span style={{ display: "block", fontSize: "0.575rem", fontFamily: "var(--font-mono)", color: entry.ongoing ? "var(--accent)" : "var(--muted)", letterSpacing: "0.06em", marginBottom: "1px" }}>
                {entry.year}
              </span>
              <span style={{ display: "block", fontSize: "0.72rem", color: "var(--text)", lineHeight: 1.3 }}>
                {entry.degree}
              </span>
              <span style={{ display: "block", fontSize: "0.62rem", color: "var(--muted)", lineHeight: 1.3 }}>
                {entry.institution}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* expertise tags */}
      <div style={{ ...fade(220), marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.575rem", fontFamily: "var(--font-mono)", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          expertise
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginTop: "0.35rem" }}>
          {[
            ["Python", "Bash", "API Development", "System Design", "DevOps", "Cloud Computing", "Workflow Automation"],
            ["Machine Learning", "Statistical Modeling", "Data Engineering", "Large Language Models"],
            ["Bioinformatics", "Genomics", "Omics", "Structural Biology", "Protein Design"],
          ].map((row, ri) => (
            <div key={ri} style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
              {row.map(tag => (
                <span key={tag} style={{ fontSize: "0.575rem", fontFamily: "var(--font-mono)", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: "2px", padding: "2px 6px", lineHeight: 1.4 }}>
                  {tag}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* stats */}
      <div style={{ ...fade(260), marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.575rem", fontFamily: "var(--font-mono)", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          contributions
        </span>
      {[
        [
          { label: "Papers",         value: 6  },
          { label: "Conf. Papers",   value: 35 },
          { label: "Conferences",    value: 39 },
          { label: "Awards",         value: 11 },
          { label: "Supervisions",   value: 3  },
          { label: "Chapters/Books", value: 1  },
        ],
        [
          { label: "Talks",            value: 22 },
          { label: "Patents & Software Tools", value: 4  },
          { label: "PyPI Official Packages",   value: 2  },
          { label: "Teaching Exp.",    value: 12 },
          { label: "Journal Reviewer", value: 1  },
        ],
      ].map((row, ri) => (
        <div key={ri} style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: ri === 0 ? "0.35rem" : "0.3rem" }}>
          {row.map(({ label, value }) => (
            <span key={label} style={{ fontSize: "0.575rem", fontFamily: "var(--font-mono)", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: "2px", padding: "2px 6px", lineHeight: 1.4 }}>
              <span style={{ color: "var(--text)", fontWeight: 700 }}>{value}</span> {label}
            </span>
          ))}
        </div>
      ))}
      </div>

      {/* applications tags */}
      <div style={{ ...fade(290), marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.575rem", fontFamily: "var(--font-mono)", color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          developed applications and packages
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.35rem" }}>
          <a href="https://github.com/madsondeluna/AMPidentifier" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.575rem", fontFamily: "var(--font-mono)", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: "2px", padding: "2px 6px", lineHeight: 1.4, textDecoration: "none" }}>
            AMPidentifier
          </a>
          <a href="http://bilbo.delunalab.dev/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.575rem", fontFamily: "var(--font-mono)", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: "2px", padding: "2px 6px", lineHeight: 1.4, textDecoration: "none" }}>
            BILBO
          </a>
          <a href="http://ecampdb.delunalab.dev/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.575rem", fontFamily: "var(--font-mono)", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: "2px", padding: "2px 6px", lineHeight: 1.4, textDecoration: "none" }}>
            ecAMPdb
          </a>
          <a href="https://github.com/madsondeluna/decryptAMP" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.575rem", fontFamily: "var(--font-mono)", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: "2px", padding: "2px 6px", lineHeight: 1.4, textDecoration: "none" }}>
            decryptAMP
          </a>
          <span style={{ fontSize: "0.575rem", fontFamily: "var(--font-mono)", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: "2px", padding: "2px 6px", lineHeight: 1.4 }}>
            AMPcraft
          </span>
          <a href="/apps/pure/preview/index.html" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.575rem", fontFamily: "var(--font-mono)", color: "var(--muted)", border: "1px solid var(--border)", borderRadius: "2px", padding: "2px 6px", lineHeight: 1.4, textDecoration: "none" }}>
            Pure Design (UI Blueprint)
          </a>
        </div>
      </div>

      {/* theme toggle */}
      <div className="left-toggle" style={{ ...fade(420), position: "absolute", top: "1.75rem", left: "2.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <ThemeToggle />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.08em", lineHeight: 1, paddingTop: "2px" }}>
          Light / Dark
        </span>
      </div>


    </div>
  );
}
