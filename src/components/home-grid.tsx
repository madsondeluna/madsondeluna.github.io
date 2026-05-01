import { FadeIn } from "./fade-in";

function PhageIcon() {
  return (
    <svg
      viewBox="0 0 100 130"
      width="80"
      height="104"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.8 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="phage-float">
        {/* cabeça icosaédrica */}
        <polygon points="50,4 70,20 70,42 50,54 30,42 30,20" strokeWidth="1.8" />
        {/* linha equatorial (cromossomo) */}
        <line x1="30" y1="29" x2="70" y2="29" strokeWidth="1" opacity="0.45" />

        {/* collar */}
        <rect x="43" y="54" width="14" height="5" strokeWidth="1.5" />

        {/* cauda (tail tube) */}
        <rect x="47" y="59" width="6" height="22" strokeWidth="1.5" />

        {/* placa basal */}
        <rect x="37" y="81" width="26" height="6" strokeWidth="1.5" />
        <line x1="37" y1="84" x2="63" y2="84" strokeWidth="1" />

        {/* fibras da cauda - lado esquerdo */}
        <polyline points="39,87 14,73 4,103"  strokeWidth="1.5" />
        <polyline points="41,87 22,80 13,108" strokeWidth="1.5" />
        <polyline points="43,87 34,90 27,112" strokeWidth="1.5" />

        {/* fibras da cauda - lado direito */}
        <polyline points="61,87 86,73 96,103"  strokeWidth="1.5" />
        <polyline points="59,87 78,80 87,108" strokeWidth="1.5" />
        <polyline points="57,87 66,90 73,112" strokeWidth="1.5" />

        {/* pontas das fibras */}
        <circle cx="4"  cy="103" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="13" cy="108" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="27" cy="112" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="96" cy="103" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="87" cy="108" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="73" cy="112" r="2.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

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
    label: "cv-en",
    title: "CV (English)",
    description: "Full curriculum vitae in English.",
    href: "/cv/en_cv_madson_professional.pdf",
  },
  {
    number: "17",
    label: "cv-pt",
    title: "CV (Portuguese)",
    description: "Full curriculum vitae in Brazilian Portuguese.",
    href: "/cv/pt_cv_madson_professional.pdf",
  },
];

interface HomeGridProps {
  onNavigate: (tab: string) => void;
}

export function HomeGrid({ onNavigate }: HomeGridProps) {
  return (
    <div style={{ padding: "1.75rem 2rem 3rem" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1px",
        background: "var(--border)",
      }}>
        {SECTIONS.map((section, i) => (
          <FadeIn key={section.label} delay={i * 40} className="grid-card-wrap">
            <button
              onClick={() => "href" in section && section.href
                ? window.open(section.href, "_blank", "noopener,noreferrer")
                : onNavigate(section.label)
              }
              className="hover-surface"
              style={{
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
              }}
            >
              {"iconOnly" in section && section.iconOnly ? (
                <div style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--muted)",
                  minHeight: "120px",
                }}>
                  <PhageIcon />
                </div>
              ) : (
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
                    fontStyle: "italic" in section && section.italic ? "italic" : "normal",
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
                    {"description" in section ? section.description : ""}
                  </span>
                  <span className="card-cta">
                    &#8594;
                  </span>
                </>
              )}
            </button>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
