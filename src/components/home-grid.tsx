import { FadeIn } from "./fade-in";

const SECTIONS = [
  {
    number: "01",
    label: "about",
    title: "About",
    description: "Background, research focus, and academic trajectory.",
  },
  {
    number: "02",
    label: "skills",
    title: "Skills",
    description: "Technical skill set across bioinformatics, AI, and product management.",
  },
  {
    number: "03",
    label: "experience",
    title: "Experience",
    description: "Professional and research positions from academia to industry.",
  },
  {
    number: "04",
    label: "education",
    title: "Education",
    description: "Degrees, institutions, and academic formation.",
  },
  {
    number: "05",
    label: "certifications",
    title: "Certifications",
    description: "Professional certifications and continuing education.",
  },
  {
    number: "06",
    label: "publications",
    title: "Publications",
    description: "Peer-reviewed articles and book chapters.",
  },
  {
    number: "07",
    label: "talks",
    title: "Talks",
    description: "Conference presentations and invited talks.",
  },
  {
    number: "08",
    label: "awards",
    title: "Awards",
    description: "Academic awards, recognitions, and achievements.",
  },
  {
    number: "09",
    label: "teaching",
    title: "Teaching",
    description: "Courses taught and teaching assistantships.",
  },
  {
    number: "10",
    label: "materials",
    title: "Materials",
    description: "Shared learning materials from courses and lectures.",
  },
  {
    number: "11",
    label: "code",
    title: "Code",
    description: "Open-source repositories, pipelines, and experiments.",
  },
  {
    number: "12",
    label: "biohub",
    title: "Bio Signal Hub",
    description: "A collection of bioinformatics tools for structural biology analyses.",
  },
  {
    number: "13",
    label: "gallery",
    title: "Gallery",
    description: "Scientific renderings, visualizations, and project imagery.",
  },
  {
    number: "14",
    label: "b101nf0",
    title: "Opinion",
    description: "Curated videos on structural biology, data science, and AI.",
  },
  {
    number: "15",
    label: "contact",
    title: "Contact",
    description: "Reach out via email or find me on academic and professional networks.",
  },
  {
    number: "16",
    label: "cv",
    title: "CV",
    description: "Short curriculum vitae.",
    links: [
      { label: "English", href: "/cv/en_cv_madson_professional.pdf" },
      { label: "Português", href: "/cv/pt_cv_madson_professional.pdf" },
    ],
  },
];

interface HomeGridProps {
  onNavigate: (tab: string) => void;
}

export function HomeGrid({ onNavigate }: HomeGridProps) {
  return (
    <div className="home-grid-wrap" style={{ padding: "1.75rem 2rem 3rem" }}>
      <div className="home-grid">
        {SECTIONS.map((section, i) => {
          const links = "links" in section ? section.links : undefined;

          const inner = (
            <>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--muted)",
                letterSpacing: "0.12em",
              }}>
                {section.number}
              </span>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                fontWeight: 300,
                lineHeight: 1,
                color: "var(--text)",
                letterSpacing: "-0.02em",
              }}>
                {section.title}
              </span>
              <span style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                lineHeight: 1.6,
                display: "block",
                textAlign: "left",
              }}>
                {section.description}
              </span>
              {links ? (
                <span style={{ display: "flex", gap: "0.4rem", marginTop: "auto" }}>
                  {links.map(({ label, href }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-cta card-cta-link"
                    >
                      {label}
                    </a>
                  ))}
                </span>
              ) : (
                <span className="card-cta" aria-hidden="true">
                  &#8594;
                </span>
              )}
            </>
          );

          const cardStyle: React.CSSProperties = {
            background: "var(--surface)",
            border: "none",
            cursor: "pointer",
            padding: "1.35rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.55rem",
            textAlign: "left",
            width: "100%",
            height: "100%",
          };

          return (
            <FadeIn key={section.label} delay={i * 40} className="grid-card-wrap">
              {links ? (
                // card sem acao propria: quem navega sao os links de idioma dentro dele
                <div style={{ ...cardStyle, cursor: "default" }}>
                  {inner}
                </div>
              ) : (
                <button
                  onClick={() => onNavigate(section.label)}
                  className="hover-surface"
                  style={cardStyle}
                >
                  {inner}
                </button>
              )}
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
