import { FadeIn } from "../fade-in";
import { SectionHeader } from "../section-header";

const experience = [
  {
    role: "Scientific Researcher — PhD Student",
    org: "Institute of Biosciences (ICB) — Federal University of Minas Gerais (UFMG)",
    period: "Aug 2024 — Present",
    description:
      "PhD in Bioinformatics at UFMG, focused on deep learning, genomics, and structural biology, specifically in the characterization and design of antimicrobial peptides. Research involves developing computational models for membrane interactions and conducting molecular dynamics simulations to enhance peptide stability and functionality.",
  },
  {
    role: "Nextflow Ambassador",
    org: "Seqera",
    period: "Jan 2026 — Present",
    description:
      "Selected as a Nextflow Ambassador to advocate for scalable and reproducible data analysis workflows within the scientific community. Role involves disseminating best practices in pipeline orchestration, engaging with the open-source ecosystem, and facilitating the adoption of Nextflow for high-performance and cloud computing in bioinformatics.",
  },
  {
    role: "Scientific Researcher — Master's Student",
    org: "Department of Genetics (dGEN) — Federal University of Pernambuco (UFPE)",
    period: "Jun 2022 — Jul 2024",
    description:
      "Developed AMP-Identifier, a machine learning-based tool to identify antimicrobial peptides (AMPs) in genomic sequences. The project involved applying computational techniques to analyze large datasets, enabling the discovery of new molecules and molecular signatures, contributing to advancements in bioinformatics and potential therapeutic applications.",
  },
  {
    role: "Research & Development Analyst",
    org: "PickCells",
    period: "Oct 2020 — Aug 2023",
    description:
      "Worked on the development of applications for IoT solutions that use computer vision for pattern recognition in clinically relevant images. Responsibilities included prototyping, developing, and validating systems.",
  },
  {
    role: "Undergraduate Researcher Fellow",
    org: "Laboratory of Genetics and Vegetal Biotechnology (LGBV) — Federal University of Pernambuco (UFPE)",
    period: "Jan 2020 — May 2022",
    description:
      "Conducted research in Bioinformatics aimed at the characterization and optimization of bio-inspired antimicrobial peptides. Additionally, worked on the investigation of eIF4E sequences in Vigna species, focusing on their potential roles in plant defense mechanisms against pathogens.",
  },
  {
    role: "Clinical Pathology Intern",
    org: "Brazilian Hospital Services Company (EBSERH) — Clinical Hospital of UFPE (HC/PE)",
    period: "Oct 2021 — Mar 2022",
    description:
      "Engaged in activities related to Clinical Pathology within the Clinical Analysis Laboratory at HC/UFPE, specifically in Sample Screening, Hematology, Biochemistry, Urinalysis, Microbiology, Hormone Testing and Serology.",
  },
  {
    role: "Research, Technological Development and Innovation Intern",
    org: "PickCells",
    period: "Apr 2020 — Aug 2020",
    description: "Contributed to the development of solutions for the molecular diagnosis of SARS-CoV-2.",
  },
  {
    role: "Undergraduate Researcher Fellow",
    org: "Oswaldo Cruz Foundation (FIOCRUZ)",
    period: "Nov 2016 — Dec 2019",
    description:
      "Engaged in activities in Structural Biology and Theoretical/Computational Chemistry, focusing on Molecular Modeling and Protein Engineering for diagnostic and vaccine purposes in the Department of Virology and Experimental Therapy.",
  },
  {
    role: "Undergraduate Researcher Fellow",
    org: "Keizo Asami Institute (iLIKA)",
    period: "May 2015 — Dec 2016",
    description:
      "Developed scientific activities in the Molecular Biology sector in the areas of Human Genetics and Bioinformatics, with an emphasis on Forensic Genetics, Ancestry Markers and Phenotype Prediction.",
  },
];

const education = [
  {
    degree: "PhD in Bioinformatics (Ongoing)",
    institution: "Federal University of Minas Gerais (UFMG), Belo Horizonte, MG, Brazil",
    description:
      "Focusing on machine learning for the identification and design of antimicrobial peptides and the analysis of immune-related biological compounds encoded in multi-omic data. Currently developing scalable in silico methods for the generation of antimicrobial compounds using Transformer-based models.",
  },
  {
    degree: "MBA in Software Engineering (Ongoing)",
    institution: "University of São Paulo (USP), São Paulo, Brazil",
    description:
      "Curriculum encompasses full-stack development using Python and JavaScript, microservices architecture, DevOps methodologies, cloud computing with Docker and Kubernetes, information security, and data engineering.",
  },
  {
    degree: "Specialization in Data Science and Analytics (2026)",
    institution: "Pontifical Catholic University of Rio de Janeiro (PUC-Rio), Rio de Janeiro, Brazil",
    description:
      "Advanced training in data-driven decision-making through data analysis, statistics and machine learning. Emphasis on Python, data visualization and exploratory analysis.",
  },
  {
    degree: "MSc in Genetics and Molecular Biology — Emphasis in Bioinformatics (2024)",
    institution: "Federal University of Pernambuco (UFPE), Recife, PE, Brazil",
    description:
      "Developed AMP-Identifier, a machine learning-based tool for genome mining focused on the discovery of bioactive molecules. Conducted the first comprehensive characterization of defensins in R. communis, integrating genomic, transcriptomic and structural biology analyses.",
  },
  {
    degree: "BSc in Biomedical Sciences — Emphasis in Clinical Pathology and Bioinformatics (2022)",
    institution: "Federal University of Pernambuco (UFPE), Recife, PE, Brazil",
    description:
      "Gained practical experience in hospital laboratories and molecular biology research environments. Undergraduate thesis focused on the eIF4E gene family and the impact of mutations on protein synthesis and susceptibility to viruses that hijack the host translation machinery.",
  },
];

const certifications = [
  { id: 13, title: "Generative AI", issuer: "Massachusetts Institute of Technology (MIT) — Professional Education", year: 2025, url: "https://www.linkedin.com/in/madsonaragao/details/certifications/" },
  { id: 12, title: "Agile Project Management Professional Certificate", issuer: "Atlassian", year: 2025, url: "https://www.linkedin.com/learning/certificates/e4cfed7c56b77bdf153983332bb767951a2178cb1a5db860050ebef0ff663daa" },
  { id: 11, title: "Career Essentials in Project Management", issuer: "Microsoft", year: 2025, url: "https://www.linkedin.com/learning/certificates/85ca53ce10941490f76e60c7526d1983e7f0ea34cdd409866eb4a03fbf5046b6" },
  { id: 10, title: "Data-Driven Product Management", issuer: "NASBA", year: 2025, url: "https://www.linkedin.com/learning/certificates/5ee63bee2bb7701f59d3bda6539a9836e3ae9482fd9b910587a39f7e32367bf5" },
  { id: 9, title: "Microsoft Azure AI Essentials: Workloads and Machine Learning", issuer: "Microsoft", year: 2025, url: "https://www.linkedin.com/learning/certificates/59e64cb65fc85f7da9046e276e17e959bc3e7f38c31d785d79edecd2586d3f0d" },
  { id: 8, title: "Requirements Engineering and Agile Product Management", issuer: "PUC-Rio", year: 2025, url: "https://pucrio.grupoa.education/academic-services/documents/validate/ed46e6c8" },
  { id: 7, title: "The Data Science of Healthcare, Medicine, and Public Health", issuer: "LinkedIn Learning", year: 2025, url: "https://www.linkedin.com/learning/certificates/3f2693067d4bd7737ffc58f7b959ac4881263213bd29ee5acaa6b50cf51bfb26" },
  { id: 6, title: "Advanced Gemini for Developers", issuer: "DeepMind / Google", year: 2024, url: "https://www.linkedin.com/learning/certificates/a259a7058366463ad138f0b25cf6827a0fd9da88cdf261ef2db475730b7c6109" },
  { id: 5, title: "Career Essentials in GitHub Professional Certificate", issuer: "GitHub", year: 2024, url: "https://www.linkedin.com/learning/certificates/4ae0dc753b7d03700014756e5fde701df9f2a5a9f4be14b6a5a6ba81a389e542" },
  { id: 4, title: "Project Management", issuer: "Project Management Institute (PMI)", year: 2024, url: "https://www.linkedin.com/learning/certificates/d6a8df258a0947294e9597e7b8f10b6d844779e96e6d70842795ae4e3332bb22" },
  { id: 3, title: "Python Programming from Basic to Advanced", issuer: "Udemy", year: 2022, url: "https://www.udemy.com/certificate/UC-4942cbb7-1414-4344-bf7e-a8fde1001d5a/" },
  { id: 2, title: "Bioinformatics with Python", issuer: "Udemy", year: 2022, url: "https://www.udemy.com/certificate/UC-33fd2573-d0f8-4be7-b075-8e86a079cd95/" },
  { id: 1, title: "More Achievements", issuer: "See all certifications on LinkedIn", year: null, url: "https://www.linkedin.com/in/madsonaragao/details/certifications/" },
];

function ListRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="hover-surface"
      style={{
        background: "var(--surface)",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {children}
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader number="03" title="Experience" />
        <FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
            {experience.map((item) => (
              <ListRow key={item.role + item.period}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 500, color: "var(--text)" }}>
                    {item.role}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                    {item.period}
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)", letterSpacing: "0.04em" }}>
                  {item.org}
                </span>
                <p style={{ fontSize: "0.8375rem", color: "var(--muted)", lineHeight: 1.65, marginTop: "0.25rem" }}>
                  {item.description}
                </p>
              </ListRow>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function EducationSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader number="04" title="Education" />
        <FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
            {education.map((item) => (
              <ListRow key={item.degree}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 500, color: "var(--text)" }}>
                  {item.degree}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)", letterSpacing: "0.04em" }}>
                  {item.institution}
                </span>
                <p style={{ fontSize: "0.8375rem", color: "var(--muted)", lineHeight: 1.65, marginTop: "0.25rem" }}>
                  {item.description}
                </p>
              </ListRow>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function CertificationsSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader number="05" title="Certifications" />
        <FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
            {certifications.map((cert) => (
              <a
                key={cert.id}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
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
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <span style={{ fontSize: "0.8375rem", color: "var(--text)" }}>{cert.title}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)", letterSpacing: "0.04em" }}>
                    {cert.issuer}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {cert.year && (
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)" }}>
                      {cert.year}
                    </span>
                  )}
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)", letterSpacing: "0.04em" }}>
                    [{cert.id.toString().padStart(2, "0")}]
                  </span>
                </div>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
