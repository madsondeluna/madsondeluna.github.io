import { FadeIn } from "../fade-in";
import { SectionHeader } from "../section-header";

const links = [
  { label: "Email", value: "madsondeluna@gmail.com", href: "mailto:madsondeluna@gmail.com" },
  { label: "LinkedIn", value: "madsonaragao", href: "https://www.linkedin.com/in/madsonaragao/" },
  { label: "GitHub", value: "madsondeluna", href: "https://github.com/madsondeluna" },
  { label: "X / Twitter", value: "@madsondeluna", href: "https://twitter.com/madsondeluna" },
  { label: "ResearchGate", value: "Madson-Aragao", href: "https://www.researchgate.net/profile/Madson-Aragao" },
  { label: "Google Scholar", value: "GmHvOYsAAAAJ", href: "https://scholar.google.com.br/citations?user=GmHvOYsAAAAJ&hl=en" },
];

export function ContactSection() {
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem" }}>
        <SectionHeader number="15" title="Contact" />
        <FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)", maxWidth: "560px" }}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
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
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)", letterSpacing: "0.08em" }}>
                  {link.label}
                </span>
                <span style={{ fontSize: "0.8375rem", color: "var(--text)" }}>
                  {link.value}
                </span>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
