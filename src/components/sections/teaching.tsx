import { FadeIn } from "../fade-in";
import { SectionHeader } from "../section-header";

const classes = [
  { id: 8, role: "Invited Teacher", title: "Molecular Docking & Dynamics: Breathing Motion into Life's Building Blocks — 2nd Edition", year: 2025 },
  { id: 7, role: "Invited Teacher", title: "Molecular Modeling with Machine Learning Techniques — 2nd Edition", year: 2025 },
  { id: 6, role: "Invited Teacher", title: "Molecular Docking & Dynamics: Breathing Motion into Life's Building Blocks — 1st Edition", year: 2025 },
  { id: 5, role: "Invited Teacher", title: "Molecular Modeling with Machine Learning Techniques — 1st Edition", year: 2025 },
  { id: 4, role: "Invited Teacher", title: "Bioinformatics: A Theoretical-Practical Approach", year: 2024 },
  { id: 3, role: "Invited Teacher", title: "Introduction to Bioinformatics: From DNA to Proteins: Databases, Annotation and Protein Modeling Techniques", org: "Catholic University of Pernambuco", year: 2022 },
  { id: 2, role: "Teaching Assistant", title: "Human Genetics", org: "Federal University of Pernambuco", year: "2017–2018" },
  { id: 1, role: "Teaching Assistant", title: "Molecular Tools Applied to Clinical Diagnosis", org: "Federal University of Pernambuco", year: "2017–2018" },
];

const materials = [
  { title: "PyMOL for Structural Modeling", url: "/apps/pymol-guide/", img: "/apps/pymol-guide/assets/img/card.png" },
  { title: "AMPidentifier", url: "https://github.com/madsondeluna/AMPidentifier", img: "https://opengraph.githubassets.com/1/madsondeluna/AMPidentifier" },
  { title: "Molecular Docking Class Materials", url: "https://github.com/madsondeluna/aula_docking_molecular", img: "https://opengraph.githubassets.com/1/madsondeluna/aula_docking_molecular" },
  { title: "Translation Class", url: "https://github.com/madsondeluna/translation_class", img: "https://opengraph.githubassets.com/1/madsondeluna/translation_class" },
  { title: "Bits, Bytes and Biomolecules", url: "https://github.com/madsondeluna/bits_bytes_biomolecules", img: "https://opengraph.githubassets.com/1/madsondeluna/bits_bytes_biomolecules" },
  { title: "Molecular Dynamics Class", url: "https://github.com/madsondeluna/aula_dinamica_molecular", img: "https://opengraph.githubassets.com/1/madsondeluna/aula_dinamica_molecular" },
  { title: "scikit-learn", url: "https://github.com/scikit-learn/scikit-learn", img: "https://opengraph.githubassets.com/1/scikit-learn/scikit-learn" },
  { title: "PyTorch Examples", url: "https://github.com/pytorch/examples", img: "https://opengraph.githubassets.com/1/pytorch/examples" },
  { title: "AI For Beginners (Microsoft)", url: "https://github.com/microsoft/AI-For-Beginners", img: "https://opengraph.githubassets.com/1/microsoft/AI-For-Beginners" },
  { title: "CS249r Book (Harvard Edge)", url: "https://github.com/harvard-edge/cs249r_book", img: "https://opengraph.githubassets.com/1/harvard-edge/cs249r_book" },
];

const roleColors: Record<string, string> = {
  "Invited Teacher": "#2d5a7a",
  "Teaching Assistant": "#4a3f6b",
};

export function TeachingExperienceSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader number="09" title="Teaching Experience" />
        <FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
            {classes.map((item) => (
              <div
                key={item.id}
                className="hover-surface"
                style={{
                  background: "var(--surface)",
                  padding: "1.5rem 2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        color: "#fff",
                        background: roleColors[item.role] || "var(--muted)",
                        padding: "2px 8px",
                        borderRadius: "2px",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {item.role}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.8375rem", color: "var(--text)", lineHeight: 1.5 }}>
                    {item.title}
                  </span>
                  {item.org && (
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)" }}>
                      {item.org}
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)" }}>
                    {item.year}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)" }}>
                    [{item.id.toString().padStart(2, "0")}]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function MaterialsSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader
          number="10"
          title="Materials"
          description="If you have attended one of my courses or lectures, find the materials here. Includes presentations, examples, and recommended articles."
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
            {materials.map((item) => (
              <a
                key={item.url}
                href={item.url}
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
                <div style={{ background: "var(--dim)" }}>
                  <img
                    src={item.img}
                    alt={item.title}
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
                  <span style={{ fontSize: "0.8rem", color: "var(--text)" }}>{item.title}</span>
                </div>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
