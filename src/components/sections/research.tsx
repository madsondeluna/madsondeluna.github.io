import { FadeIn } from "../fade-in";
import { SectionHeader } from "../section-header";

const publications = [
  {
    id: 1,
    authors: "M. A. Luna-Aragão et al.",
    title: "Unveiling Three Functionally Diverse Isoforms of eIF4E in Cowpea Through a Multi-Omics Approach",
    journal: "Agronomy",
    details: "vol. 16, p. 766, 2026",
    doi: "10.3390/agronomy16070766",
    url: "https://doi.org/10.3390/agronomy16070766",
  },
  {
    id: 2,
    authors: "F. L. B. Medeiros et al.",
    title: "Transposable elements: Functional aspects and applications as drivers of crop innovation",
    journal: "Crop Science",
    details: "vol. 66, p. e70257, 2026",
    doi: "10.1002/csc2.70257",
    url: "https://doi.org/10.1002/csc2.70257",
  },
  {
    id: 3,
    authors: "F. A. de Andrade and M. A. de Luna-Aragão et al.",
    title: "Deciphering Cowpea Resistance to Potyvirus: Assessment of eIF4E Gene Mutations and Their Impact on the eIF4E-VPg Protein Interaction",
    journal: "Viruses",
    details: "2025",
    doi: "10.3390/v17081050",
    url: "https://doi.org/10.3390/v17081050",
  },
  {
    id: 4,
    authors: "R. C. C. da Silva et al.",
    title: "Omics-driven bioinformatics for plant lectins discovery and functional annotation — A comprehensive review",
    journal: "International Journal of Biological Macromolecules",
    details: "p. 135511, 2024",
    doi: "10.1016/j.ijbiomac.2024.135511",
    url: "https://doi.org/10.1016/j.ijbiomac.2024.135511",
  },
  {
    id: 5,
    authors: "M. V. F. Ferraz et al.",
    title: "Association strength of E6 to E6AP/p53 complex correlates with HPV-mediated oncogenesis risk",
    journal: "Biopolymers",
    details: "vol. 113, no. 10, p. e23524, 2022",
    doi: "10.1002/bip.23524",
    url: "https://doi.org/10.1002/bip.23524",
  },
  {
    id: 6,
    authors: "L. M. B. Vilela et al.",
    title: "Approaches for Identification and Validation of Antimicrobial Compounds of Plant Origin: A Long Way from the Field to the Market",
    journal: "Eco-Friendly Biobased Products Used in Microbial Diseases, CRC Press",
    details: "pp. 183–222, 2022",
    doi: "10.1201/9781003243700",
    url: "https://doi.org/10.1201/9781003243700",
  },
];

const talks = [
  { id: 21, title: "Development of a ML-Based Workflow for Identification of Antimicrobial Peptides Sequences in Genomic Data", type: "Congress" },
  { id: 20, title: "Assessment of eIF4E Isoforms in Cowpea (Vigna unguiculata (L.) Walp): From Genome Mining to Structural Profiling", type: "Congress" },
  { id: 19, title: "Development of a Machine Learning Based Workflow for Identification of AMP Sequences in Genomic Data", type: "Congress" },
  { id: 18, title: "Pairing Up for Plant Protection: An In Silico Look at R. communis Defensins Dimerization", type: "Congress" },
  { id: 17, title: "Structural Assessment of Ricinus communis Defensins and Insights into Their Dimerization Dynamics", type: "Conference" },
  { id: 16, title: "Mining AMPs and Insights into Their Dynamics", type: "Congress" },
  { id: 15, title: "AMP-Identifier: A Machine Learning–Based Tool for Identifying Antimicrobial Peptide Sequences in Genomic Data", type: "Congress" },
  { id: 14, title: "Structural Prediction of the eIF4E and eIF4G in the Leish-eIF4F Complex", type: "Conference" },
  { id: 13, title: "Molecular Basis of E6/E6AP/p53 in HPV-Mediated Oncogenesis Provides Insights into Inhibitory Strategies", type: "Congress" },
  { id: 12, title: "Designing Inhibitors for the E6/E6AP/p53 Complex", type: "Conference" },
  { id: 11, title: "Assessing the Conformational Dynamics and Stability of E6/E6AP/p53 in HPV-Mediated Oncogenesis", type: "Conference" },
  { id: 10, title: "Structural Analysis of the E6/E6AP/p53 Ternary Complex Associated with HPV-Mediated Oncogenesis", type: "Conference" },
  { id: 9, title: "Applications of Bioinformatics Tools in Forensic Genetics: Predicting Phenotype and Biogeographic Ancestry in 1000 Genomes Populations", type: "Symposium" },
  { id: 8, title: "Extraction and Characterization of Human mtDNA Haplogroup from Whole Genome Sequencing Data", type: "Symposium" },
  { id: 7, title: "Characterization of Mitochondrial DNA and Inference of Maternal Ancestry in Individuals from Pernambuco", type: "Congress" },
  { id: 6, title: "Genetic Association between IL1B Polymorphism and Lower Susceptibility to Photosensitivity in Systemic Lupus Erythematosus Patients", type: "Congress" },
  { id: 5, title: "Mitochondrial DNA Analysis and Inference of Maternal Ancestry in Admixed Individuals from Pernambuco, Brazil", type: "Congress" },
  { id: 4, title: "Analysis of Mitochondrial Inheritance and Maternal Ancestry in Admixed Individuals from Pernambuco", type: "Conference" },
  { id: 3, title: "Prevalence of the Sickle Cell Disease Allele in 1000 Genomes Populations and Its Relationship with Skin Color and Genetic Ancestry", type: "Symposium" },
  { id: 2, title: "Interactive Seminars in a Biochemistry Course for Undergraduate Biomedicine: Benefits and Problems of Carbohydrates in Modern Life", type: "Congress" },
  { id: 1, title: "Evaluation of the Efficacy of the MiSeq-FGx Forensic System in 1000 Genomes Populations", type: "Symposium" },
];

const awards = [
  { id: 11, title: "Next Generation Bioinformatician (NGB) — 21st International Conference of the Brazilian Association for Bioinformatics and Computational Biology (X-Meeting 2025)" },
  { id: 10, title: "Travel Grant Award, School on Biological Physics and Biomolecular Simulations in the Machine Learning Era — ICTP-SAIFR" },
  { id: 9, title: "Honorable Mention — Human and Forensic Genetics (CNPq/UFPE)" },
  { id: 8, title: "Young Geneticist Award of the Northeast (XXI Northeast Genetics Meeting — ENGNE)" },
  { id: 7, title: "Honorable Mention — Postgraduate Genetics Journey (UFPE)" },
  { id: 6, title: "Best Poster Award — XIII Journey of the Genetics and Molecular Biology Program" },
  { id: 5, title: "Travel Grant Award, AI for Protein Design (AI4PD) — The Protein Society" },
  { id: 4, title: "Certificate of Excellence in the Peer Reviewing — Elsevier" },
  { id: 3, title: "Highest Admission Score — Ranked first overall among all accepted applicants to the Master's Program in Genetics and Molecular Biology at UFPE" },
  { id: 2, title: "Highest Admission Score — Ranked first overall among all accepted applicants to the PhD Program in Bioinformatics at UFMG" },
  { id: 1, title: "Honorable Mention — Pernambuco Chemistry Olympiad (OPEQ), National Chemistry Olympiad Program & Pernambuco Science Space" },
];

const talkTypeStyle: Record<string, { color: string; background: string; border: string }> = {
  Congress:   { color: "#1a3a52", background: "rgba(45, 90, 122, 0.12)", border: "rgba(45, 90, 122, 0.35)" },
  Conference: { color: "#3b2a5e", background: "rgba(74, 63, 107, 0.12)", border: "rgba(74, 63, 107, 0.35)" },
  Symposium:  { color: "#1e4d3a", background: "rgba(30, 77, 58, 0.12)",  border: "rgba(30, 77, 58, 0.35)"  },
};

export function PublicationsSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader number="06" title="Publications" />
        <FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
            {publications.map((pub) => (
              <a
                key={pub.id}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-surface"
                style={{
                  background: "var(--surface)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                  <span style={{ fontSize: "0.8375rem", color: "var(--text)", lineHeight: 1.5, fontWeight: 500 }}>
                    {pub.title}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)", whiteSpace: "nowrap" }}>
                    [{pub.id.toString().padStart(2, "0")}]
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)", letterSpacing: "0.04em" }}>
                  {pub.authors}
                </span>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)" }}>
                    {pub.journal} · {pub.details}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      color: "var(--muted)",
                      border: "1px solid var(--border)",
                      padding: "2px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    DOI: {pub.doi}
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

export function TalksSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader number="07" title="Conference Presentations & Invited Talks" />
        <FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
            {talks.map((talk) => (
              <div
                key={talk.id}
                className="hover-surface"
                style={{
                  background: "var(--surface)",
                  padding: "1.5rem 2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span style={{ fontSize: "0.8375rem", color: "var(--text)", lineHeight: 1.5 }}>
                  {talk.title}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      color: talkTypeStyle[talk.type]?.color ?? "var(--muted)",
                      background: talkTypeStyle[talk.type]?.background ?? "transparent",
                      border: `1px solid ${talkTypeStyle[talk.type]?.border ?? "var(--border)"}`,
                      padding: "2px 8px",
                      borderRadius: "2px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {talk.type}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)" }}>
                    [{talk.id.toString().padStart(2, "0")}]
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

export function AwardsSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader number="08" title="Awards, Recognitions & Achievements" />
        <FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>
            {awards.map((award) => (
              <div
                key={award.id}
                className="hover-surface"
                style={{
                  background: "var(--surface)",
                  padding: "1.5rem 2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span style={{ fontSize: "0.8375rem", color: "var(--text)", lineHeight: 1.5 }}>
                  {award.title}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--muted)", flexShrink: 0 }}>
                  [{award.id.toString().padStart(2, "0")}]
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
