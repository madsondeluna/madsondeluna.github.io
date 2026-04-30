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
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div style={{ display: "flex", height: "100svh", overflow: "hidden", position: "relative" }}>

      {/* left panel — fixed identity */}
      <div
        className="left-col"
        style={{
          width: "42%",
          flexShrink: 0,
          height: "100svh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <HeroCanvas />
        </div>

        {/* blur divider at right edge */}
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "48px",
          height: "100%",
          zIndex: 2,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage: "linear-gradient(to right, transparent 0%, black 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 100%)",
          pointerEvents: "none",
        }} />
        <LeftPanel />
      </div>

      {/* right panel — scrollable content */}
      <div
        ref={rightPanelRef}
        className="right-col"
        style={{
          flex: 1,
          height: "100svh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* top bar: back button + theme toggle */}
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
              >
                &#8592;
              </button>
            )}
          </div>
        </div>

        <main style={{ flex: 1, marginTop: "-3.5rem" }}>
          {activeTab === "home" ? (
            <HomeGrid onNavigate={handleTabChange} />
          ) : (
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
          )}
        </main>

        <footer style={{ padding: "0.75rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            maskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 50% 50%, black 40%, transparent 100%)",
          }} />
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
