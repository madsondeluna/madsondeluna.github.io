"use client";

import { useEffect, useRef, useState } from "react";
import { LeftPanel } from "@/components/left-panel";
import { HeroCanvas } from "@/components/hero-canvas";
import { TabTransition } from "@/components/tab-transition";
import { HomeGrid } from "@/components/home-grid";
import { AboutSection, SkillsSection } from "@/components/sections/about";
import { ExperienceSection, EducationSection, CertificationsSection } from "@/components/sections/career";
import { PublicationsSection, TalksSection, AwardsSection } from "@/components/sections/research";
import { TeachingExperienceSection, MaterialsSection } from "@/components/sections/teaching";
import { CodeSection, BioHubSection, GallerySection, B101NF0Section } from "@/components/sections/projects";
import { ContactSection } from "@/components/sections/contact";

const VALID_TABS = [
  "home",
  "about", "skills",
  "experience", "education", "certifications",
  "publications", "talks", "awards",
  "teaching", "materials",
  "code", "biohub", "gallery", "b101nf0",
  "contact",
];
const DEFAULT_TAB = "home";

function getInitialTab(): string {
  if (typeof window === "undefined") return DEFAULT_TAB;
  const hash = window.location.hash.replace("#", "");
  return VALID_TABS.includes(hash) ? hash : DEFAULT_TAB;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_TAB);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, []);

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    window.history.replaceState(null, "", tab === "home" ? "/" : `#${tab}`);
    // no desktop o painel direito e o container rolavel; no mobile o layout empilha
    // e quem rola e a janela
    rightPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell" style={{ display: "flex", height: "100svh", overflow: "hidden", position: "relative" }}>

      {/* full-viewport background animation */}
      <div className="bg-layer" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <HeroCanvas />
      </div>

      {/* left panel — fixed identity */}
      <div
        className="left-col"
        style={{
          width: "42%",
          flexShrink: 0,
          height: "100svh",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <LeftPanel />
      </div>

      {/* right panel */}
      <div
        className="right-col"
        style={{
          flex: 1,
          height: "100svh",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* scrollable area — stops above footer */}
        <div
          ref={rightPanelRef}
          className="right-scroll"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "48px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* top bar: back button */}
          <div style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 2rem",
            pointerEvents: "none",
          }}>
            <div style={{ pointerEvents: "auto", marginTop: "3rem" }}>
              {activeTab !== "home" && (
                <button
                  onClick={() => handleTabChange("home")}
                  className="home-blob"
                  aria-label="Back to home"
                >
                  <span aria-hidden="true">&#8592;</span>
                </button>
              )}
            </div>
          </div>

          <main style={{ flex: 1, marginTop: "-3.5rem" }}>
            {activeTab === "home" ? (
              <HomeGrid onNavigate={handleTabChange} />
            ) : (
              <div style={{
                background: "var(--bg)",
                minHeight: "100%",
                maskImage: "radial-gradient(ellipse 90% 88% at 50% 50%, black 55%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 90% 88% at 50% 50%, black 55%, transparent 100%)",
              }}>
              <TabTransition tabKey={activeTab}>
                {activeTab === "about" && <AboutSection />}
                {activeTab === "skills" && <SkillsSection />}
                {activeTab === "experience" && <ExperienceSection />}
                {activeTab === "education" && <EducationSection />}
                {activeTab === "certifications" && <CertificationsSection />}
                {activeTab === "publications" && <PublicationsSection />}
                {activeTab === "talks" && <TalksSection />}
                {activeTab === "awards" && <AwardsSection />}
                {activeTab === "teaching" && <TeachingExperienceSection />}
                {activeTab === "materials" && <MaterialsSection />}
                {activeTab === "code" && <CodeSection />}
                {activeTab === "biohub" && <BioHubSection />}
                {activeTab === "gallery" && <GallerySection />}
                {activeTab === "b101nf0" && <B101NF0Section />}
                {activeTab === "contact" && <ContactSection />}
              </TabTransition>
              </div>
            )}
          </main>
        </div>

        {/* footer — always visible at bottom */}
        <footer className="site-footer" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "48px", padding: "0.3rem 2rem 0.4rem", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.3rem", zIndex: 10 }}>
          <div style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            maskImage: "radial-gradient(ellipse 80% 100% at 50% 100%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 100% at 50% 100%, black 40%, transparent 100%)",
          }} />
          <div style={{ position: "relative", display: "flex", gap: "1.1rem", alignItems: "center", justifyContent: "center" }}>
            {([
              { label: "GitHub", href: "https://github.com/madsondeluna", path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
              { label: "Google Scholar", href: "https://scholar.google.com.br/citations?user=GmHvOYsAAAAJ&hl=en", path: "M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/madsonaragao/", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              { label: "X", href: "https://twitter.com/madsondeluna", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
            ] as { label: string; href: string; path: string }[]).map(({ label, href, path }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" title={label} className="link-secondary" style={{ display: "flex", alignItems: "center", opacity: 0.55 }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
          <span style={{
            position: "relative",
            fontFamily: "var(--font-mono)",
            fontSize: "0.5625rem",
            color: "var(--muted)",
            letterSpacing: "0.06em",
            opacity: 0.55,
          }}>
            &copy; {new Date().getFullYear()}. GROMADS. All rights reserved.
          </span>
        </footer>

      </div>

    </div>
  );
}
