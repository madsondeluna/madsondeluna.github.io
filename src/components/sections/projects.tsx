"use client";

import { useState, useEffect, useRef } from "react";
import { FadeIn } from "../fade-in";
import { SectionHeader } from "../section-header";

const repos = [
  { title: "AMPidentifier", url: "https://github.com/madsondeluna/AMPidentifier", img: "https://opengraph.githubassets.com/1/madsondeluna/AMPidentifier" },
  { title: "Unix Commands for Friends", url: "https://github.com/madsondeluna/unix-commands-for-friends", img: "https://opengraph.githubassets.com/1/madsondeluna/unix-commands-for-friends" },
  { title: "How to Git", url: "https://github.com/madsondeluna/howtogit", img: "https://opengraph.githubassets.com/1/madsondeluna/howtogit" },
  { title: "GetVar MVP", url: "https://github.com/madsondeluna/getvar_mvp", img: "https://opengraph.githubassets.com/1/madsondeluna/getvar_mvp" },
  { title: "BioHub", url: "https://github.com/madsondeluna/biohub", img: "https://opengraph.githubassets.com/1/madsondeluna/biohub" },
  { title: "MVP PUC-Rio — Data Analytics & Machine Learning", url: "https://github.com/madsondeluna/mvp_pucrio_data_analytics_and_machine_learning", img: "https://opengraph.githubassets.com/1/madsondeluna/mvp_pucrio_data_analytics_and_machine_learning" },
];

const gallery = [
  { src: "/assets/images/gallery/umap.png", alt: "UMAP representation of protein features", caption: "ESP from eIF4Es and ESP" },
  { src: "/assets/images/gallery/memb.png", alt: "Membrane structure", caption: "DPOC membrane" },
  { src: "/assets/images/gallery/ala.png", alt: "Protein structure visualization", caption: "Data Visualization" },
  { src: "/assets/images/gallery/eifs.png", alt: "eIF4E selection", caption: "Genomic Analysis" },
  { src: "/assets/images/gallery/pacman.png", alt: "AMP plasticity", caption: "Machine Learning Model" },
  { src: "/assets/images/gallery/chikv.png", alt: "Chikungunya virus proteins", caption: "Structural Biology" },
];

// WebP sem perdas ao lado de cada PNG; o <img> original permanece como fallback.
function webp(src: string, suffix = "") {
  return src.replace(/\.png$/, `${suffix}.webp`);
}

const videos = [
  {
    id: "d95J8yzvjbQ",
    title: "The Thinking Game — DeepMind Documentary",
    description:
      "Takes you on a journey into the heart of DeepMind, capturing a team striving to unravel the mysteries of intelligence and life itself. Filmed over five years by the award-winning team behind AlphaGo.",
  },
  {
    id: "dbOKB3VRpuE",
    title: "Hello Nextflow — Training Course Part 1",
    description:
      "First part of the Hello Nextflow training course: a very basic domain-agnostic Hello World example, progressively built up to demonstrate the usage of foundational Nextflow logic and components.",
    link: { text: "official Hello Nextflow website", url: "https://training.nextflow.io/2.1.1/hello_nextflow/" },
  },
  {
    id: "GfH4QL4VqJ0",
    title: "Python: The Documentary — An Origin Story",
    description:
      "The story of the world's most beloved programming language. What began as a side project in Amsterdam during the 1990s became the software powering artificial intelligence, data science and some of the world's biggest companies.",
  },
  {
    id: "k-9sQXhHHmk",
    title: "Why Building New Proteins from Scratch Is Our New Superpower — David Baker | TED",
    description:
      "Biochemist David Baker explores his team's Nobel Prize-winning work using AI to design new proteins with functions never before seen in nature.",
  },
  {
    id: "aIDgF6BomlE",
    title: "BindCraft — One-Shot Design of Functional Binders",
    description:
      "Overview of current binder design tools and conceptual explanation of BindCraft's central hallucination process that engages loss and confidence metrics to predict sequence from structure.",
  },
  {
    id: "P_fHJIYENdI",
    title: "AI and Drug Discovery",
    description: "The biggest problems in the world might be solved by tiny molecules unlocked using AI.",
  },
  {
    id: "cx7l9ZGFZkw",
    title: "The 2024 Nobel Prize in Chemistry — Protein Design and Structure Prediction",
    description:
      "Inside story of how David Baker, Demis Hassabis and John Jumper won the 2024 Nobel Prize in Chemistry for advances in computer-assisted protein design and structure prediction.",
  },
  {
    id: "4GLSzuYXh6w",
    title: "Satya Nadella on AGI, Topological Qubits and Microsoft",
    description:
      "Satya Nadella on why he does not believe in AGI but does believe in 10% economic growth, Microsoft's new topological qubit breakthrough and gaming world models.",
  },
  {
    id: "Bj9BD2D3DzA",
    title: "Tracing the Thoughts of a Large Language Model — Anthropic",
    description:
      "AI models are trained and not directly programmed, so we do not understand how they do most of the things they do. Anthropic's researchers have taken significant steps towards understanding the circuits that underlie an AI model's thoughts.",
    link: { text: "Tracing the thoughts of a large language model", url: "https://www.anthropic.com/research/tracing-thoughts-language-model" },
  },
  {
    id: "BNmOI826-_4",
    title: "ESM3 — Simulating 500 Million Years of Evolution with a Language Model",
    description:
      "ESM3 is a generative language model for programming biology. Researchers found ESM3 can simulate 500M years of evolution to generate new fluorescent proteins.",
    link: { text: "ESM3 release blog", url: "https://www.evolutionaryscale.ai/blog/esm3-release" },
  },
  {
    id: "tAP1eZYEuKA",
    title: "Finding Answers, Building Hope — Alexander Disease and AI",
    description:
      "When Thomas Wagner's son received a diagnosis of Alexander disease, a rare genetic disorder, he set out to learn everything he could. Through these conversations, Thomas has helped jumpstart new research into potential treatments.",
    link: { text: "Finding answers, building hope", url: "https://blog.google/technology/ai/thomas-story-alexander-disease/" },
  },
];

export function CodeSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader
          number="11"
          title="Code / Scripts"
          description="Open-source code, pipelines and experiments available for public access."
        />
        <FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1px",
              background: "var(--border)",
            }}
          >
            {repos.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-surface"
                style={{
                  background: "var(--surface)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div style={{ background: "var(--dim)", flexShrink: 0 }}>
                  <img
                    src={repo.img}
                    alt={repo.title}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
                <div style={{
                  padding: "0.65rem 1.1rem",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  background: "rgba(var(--surface-rgb, 235,238,243), 0.7)",
                  borderTop: "1px solid var(--border)",
                }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text)" }}>{repo.title}</span>
                </div>
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div style={{ marginTop: "3rem" }}>
            <a
              href="https://github.com/madsondeluna"
              target="_blank"
              rel="noopener noreferrer"
              className="link-cta"
            >
              view all on github <span style={{ fontSize: "0.75rem" }}>&#8594;</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function BioHubSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader
          number="12"
          title="BioHub"
          description="A collection of bioinformatics tools for structural biology analyses."
        />
        <FadeIn>
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: "640px", marginBottom: "2rem" }}>
            The BioHub / Signal Hub is also available as a Python CLI providing a hub of tools for
            structural bioinformatics analyses. The website offers additional features including
            automated graph generation and 3D protein visualization. Both tools are currently
            under active development.
          </p>
          <a href="/apps/biohub/index.html" target="_blank" rel="noopener noreferrer" className="link-cta">
            open BioHub / Signal Hub <span style={{ fontSize: "0.75rem" }}>&#8594;</span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

export function GallerySection() {
  const [active, setActive] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  setActive(i => (i - 1 + gallery.length) % gallery.length);
      if (e.key === "ArrowRight") setActive(i => (i + 1) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = thumbsRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  const item = gallery[active];

  const NAV_W = "3rem";
  const NAV_GAP = "0.75rem";

  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader
          number="13"
          title="Gallery"
          description="Visual collection of work, projects, and scientific renderings."
        />
        <FadeIn>
          <div className="gallery-wrapper">
            {/* slide row */}
            <div style={{ display: "flex", alignItems: "center", gap: NAV_GAP }}>
              <button
                className="home-blob gallery-nav"
                onClick={() => setActive(i => (i - 1 + gallery.length) % gallery.length)}
                aria-label="Previous"
            >&#8592;</button>

              <div style={{ flex: 1, position: "relative", background: "#fff", height: "520px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <picture key={active} style={{ display: "contents" }}>
                  <source srcSet={webp(item.src)} type="image/webp" />
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="gallery-slide-img"
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block", userSelect: "none" }}
                  />
                </picture>
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "2rem 1.5rem 1.25rem",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
                  pointerEvents: "none",
                }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 0.25rem" }}>
                    {item.caption}
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#fff", margin: 0, lineHeight: 1.5 }}>
                    {item.alt}
                  </p>
                </div>
                <div style={{ position: "absolute", top: "1rem", right: "1rem", fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", pointerEvents: "none" }}>
                  {String(active + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
                </div>
              </div>

              <button
                className="home-blob gallery-nav"
                onClick={() => setActive(i => (i + 1) % gallery.length)}
                aria-label="Next"
            >&#8594;</button>
            </div>

            {/* thumbnail row — indented to align with slide */}
            <div
              ref={thumbsRef}
              style={{
                display: "flex",
                gap: "3px",
                marginTop: "3px",
                marginLeft: `calc(${NAV_W} + ${NAV_GAP})`,
                marginRight: `calc(${NAV_W} + ${NAV_GAP})`,
                overflowX: "auto",
                scrollbarWidth: "none",
              }}
            >
              {gallery.map((t, i) => (
                <button
                  key={t.src}
                  onClick={() => setActive(i)}
                  className={`gallery-thumb${i === active ? " gallery-thumb-active" : ""}`}
                  style={{ flexShrink: 0, width: "90px", height: "90px", padding: 0, border: "none", cursor: "pointer", overflow: "hidden", background: "var(--dim)" }}
                >
                  <picture style={{ display: "contents" }}>
                    <source srcSet={webp(t.src, "_thumb")} type="image/webp" />
                    <img
                      src={t.src}
                      alt={t.alt}
                      loading="lazy"
                      decoding="async"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </picture>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function B101NF0Section() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader
          number="14"
          title="Opinion"
          description="A personal curation of videos on structural biology, data science, and AI."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {videos.map((video, i) => (
            <FadeIn key={video.id} delay={i * 50}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: "760px" }}>
                  {video.description}
                  {video.link && (
                    <>
                      {" "}Read more:{" "}
                      <a href={video.link.url} target="_blank" rel="noopener noreferrer" className="link-cta" style={{ fontSize: "inherit" }}>
                        {video.link.text}
                      </a>
                    </>
                  )}
                </p>
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "2px" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--muted)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {video.title}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
