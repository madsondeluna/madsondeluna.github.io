import { FadeIn } from "../fade-in";
import { SectionHeader } from "../section-header";

const skills = [
  {
    category: "Bioinformatics",
    items: [
      "Genomics & Transcriptomics",
      "Genome Assembly",
      "Genome Mining and Annotation",
      "Molecular & Structural Biology",
      "Protein & Membrane Modeling",
      "Protein Design",
      "Molecular Dynamics Simulations",
      "Pipeline Development",
    ],
  },
  {
    category: "AI, Data & Scripting",
    items: [
      "Machine Learning",
      "Data Analysis & Visualization",
      "Data Engineering & Governance",
      "Git & Version Control",
      "Python, Bash & Java",
      "MySQL & PostgreSQL",
      "Linux/Unix Systems",
      "Docker & Containerization",
      "Snakemake & Nextflow",
      "HPC Workload Management",
    ],
  },
  {
    category: "Product / Project Management",
    items: [
      "Product Lifecycle Management",
      "Agile Methodologies (Scrum, Kanban)",
      "User-Centered Design (UCD)",
      "Roadmap Development",
      "Key Performance Indicators (KPIs)",
      "Market & User Research",
      "Lean Product Development",
      "Design Thinking",
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      "Figma, Miro, Jira, Trello & Azure",
      "Prototyping & Wireframing",
      "Customer Journey Mapping",
      "Version Control & Release Management",
      "Google Workspace & Notion",
      "Tableau & PowerBI",
    ],
  },
  {
    category: "Collaboration & Communication",
    items: [
      "Cross-Functional Team Leadership",
      "Stakeholder Management",
      "Technical & Business Communication",
      "Complex Problem-Solving",
      "Data Storytelling",
    ],
  },
  {
    category: "Key Soft Skills",
    items: [
      "Active Listening",
      "Critical Thinking",
      "Creativity & Innovation",
      "Adaptability",
      "Teamwork",
    ],
  },
];

export function AboutSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader number="01" title="About" />
        <FadeIn>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
              color: "var(--text)",
              lineHeight: 1.7,
              maxWidth: "760px",
            }}
          >
            <p>
              Currently, as a PhD student in Bioinformatics, I am deepening my expertise in
              Software Engineering, Machine Learning, Omics, Structural Biology, and
              Chemoinformatics. My research applies deep learning algorithms, focusing on
              generative models to extract biological insights from complex datasets, with the
              specific objective of developing an antimicrobial language to generate synthetic
              compounds inspired by the immune systems of diverse organisms. My ultimate goal is
              to provide actionable insights for the development of new therapeutics against
              antimicrobial resistance using scalable <em>in silico</em> methods.
            </p>
            <p>
              Complementing my experience, I am a Nextflow Ambassador, a Specialist in Data
              Science & Analytics, and currently an MBA student in Software Engineering. This
              multidimensional focus expands my technical proficiency in strategic data analysis,
              reproducible workflows, advanced machine learning, and data governance, while
              simultaneously grounding my work in software architecture and engineering
              principles.
            </p>
            <p>
              I hold a Master&apos;s degree in Genetics and Molecular Biology, during which I
              developed the AMPidentifier, an automated machine learning-based tool designed to
              identify antimicrobial sequences in genomic and proteomic data. This tool has
              demonstrated promising potential in uncovering bioactive compounds, contributing to
              drug discovery and bioproduct development. Additionally, I hold a Bachelor&apos;s
              degree in Biomedical Sciences, with a concentration in Bioinformatics and Clinical
              Pathology.
            </p>
            <p>
              In the private sector, I worked as a Research and Development Analyst, focusing on
              the end-to-end development of IoT and AI products. My responsibilities included
              building roadmaps, defining KPIs, developing MVPs, and leading user feedback
              collection to guide product upgrades. Using Agile, Lean, and Scrum methodologies,
              I optimized team performance and ensured high-quality project delivery.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader number="02" title="Skills" />
        <FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1px",
              background: "var(--border)",
            }}
          >
            {skills.map((group) => (
              <div
                key={group.category}
                className="hover-surface"
                style={{
                  background: "var(--surface)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {group.category}
                </span>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.4rem", listStyle: "none", padding: 0, margin: 0 }}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontSize: "0.8375rem",
                        color: "var(--text)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
