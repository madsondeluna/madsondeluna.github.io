import type { Locale } from "@/lib/cv";
import { CV, LOCALE_TAG, CERTIFICATIONS, PUBLICATIONS, AWARDS, TEACHING, LINKS } from "@/lib/cv";

const PDF: Record<Locale, string> = {
  pt: "/cv/pt_cv_madson_professional.pdf",
  es: "/cv/en_cv_madson_professional.pdf",
};

const OTHER: Record<Locale, { href: string; label: string }[]> = {
  pt: [
    { href: "/", label: "English" },
    { href: "/es", label: "Español" },
  ],
  es: [
    { href: "/", label: "English" },
    { href: "/pt", label: "Português" },
  ],
};

function Heading({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <h2
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "0.75rem",
        margin: "0 0 1.5rem",
        fontSize: "1.125rem",
        fontWeight: 400,
        letterSpacing: "-0.01em",
        color: "var(--text)",
      }}
    >
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)" }}>{n}</span>
      {children}
    </h2>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ background: "var(--surface)", padding: "1.25rem 1.5rem" }}>{children}</div>;
}

function Stack({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)" }}>{children}</div>;
}

const meta = { fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)" } as const;
const body = { fontSize: "0.875rem", lineHeight: 1.65, color: "var(--text)" } as const;

export function CvPage({ locale }: { locale: Locale }) {
  const t = CV[locale];
  return (
    <div lang={LOCALE_TAG[locale]} style={{ background: "var(--bg)", minHeight: "100svh" }}>
      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
        <nav style={{ display: "flex", gap: "1rem", marginBottom: "3rem", ...meta }}>
          {OTHER[locale].map((l) => (
            <a key={l.href} href={l.href} style={{ color: "var(--muted)" }}>
              {l.label}
            </a>
          ))}
        </nav>

        <header style={{ marginBottom: "3.5rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 0.5rem" }}>
            Madson Allan de Luna Aragão
          </h1>
          <p style={{ ...body, color: "var(--muted)", margin: "0 0 1rem" }}>{t.role}</p>
          <a href={PDF[locale]} style={{ ...meta, color: "var(--muted)" }}>
            {t.labels.pdf}
          </a>
        </header>

        <section style={{ marginBottom: "3.5rem" }}>
          <Heading n="01">{t.sections.about}</Heading>
          {t.intro.map((p, i) => (
            <p key={i} style={{ ...body, margin: "0 0 1rem", textAlign: "justify" }}>
              {p}
            </p>
          ))}
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <Heading n="02">{t.sections.experience}</Heading>
          <Stack>
            {t.experience.map((e) => (
              <Row key={`${e.role}-${e.period}`}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 500, margin: 0 }}>{e.role}</h3>
                  <span style={meta}>{e.period}</span>
                </div>
                <p style={{ ...meta, margin: "0.35rem 0 0.6rem" }}>{e.org}</p>
                <p style={{ ...body, margin: 0, textAlign: "justify" }}>{e.description}</p>
              </Row>
            ))}
          </Stack>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <Heading n="03">{t.sections.education}</Heading>
          <Stack>
            {t.education.map((d) => (
              <Row key={d.degree}>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 500, margin: "0 0 0.35rem" }}>{d.degree}</h3>
                <p style={{ ...meta, margin: 0 }}>{d.institution}</p>
              </Row>
            ))}
          </Stack>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <Heading n="04">{t.sections.certifications}</Heading>
          <Stack>
            {CERTIFICATIONS.map((c) => (
              <Row key={c.title}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.875rem" }}>{c.title}</span>
                  <span style={meta}>{c.year}</span>
                </div>
                <p style={{ ...meta, margin: "0.3rem 0 0" }}>{c.issuer}</p>
              </Row>
            ))}
          </Stack>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <Heading n="05">{t.sections.publications}</Heading>
          <Stack>
            {PUBLICATIONS.map((p) => (
              <Row key={p.doi}>
                <a href={`https://doi.org/${p.doi}`} style={{ fontSize: "0.875rem", color: "var(--text)" }}>
                  {p.title}
                </a>
                <p style={{ ...meta, margin: "0.35rem 0 0" }}>
                  {p.journal} &middot; {p.doi}
                </p>
              </Row>
            ))}
          </Stack>
          <p style={{ ...meta, marginTop: "0.75rem" }}>{t.labels.publicationsNote}</p>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <Heading n="06">{t.sections.awards}</Heading>
          <Stack>
            {AWARDS.map((a) => (
              <Row key={a}>
                <span style={{ fontSize: "0.875rem" }}>{a}</span>
              </Row>
            ))}
          </Stack>
          <p style={{ ...meta, marginTop: "0.75rem" }}>{t.labels.awardsNote}</p>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <Heading n="07">{t.sections.teaching}</Heading>
          <Stack>
            {TEACHING.map((c) => (
              <Row key={c.title}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.875rem" }}>{c.title}</span>
                  <span style={meta}>{c.year}</span>
                </div>
              </Row>
            ))}
          </Stack>
          <p style={{ ...meta, marginTop: "0.75rem" }}>{t.labels.talksNote}</p>
        </section>

        <section style={{ marginBottom: "3.5rem" }}>
          <Heading n="08">{t.sections.skills}</Heading>
          <Stack>
            {t.skills.map((g) => (
              <Row key={g.category}>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 500, margin: "0 0 0.5rem" }}>{g.category}</h3>
                <p style={{ ...body, margin: 0 }}>{g.items.join(", ")}</p>
              </Row>
            ))}
          </Stack>
        </section>

        <section>
          <Heading n="09">{t.sections.contact}</Heading>
          <Stack>
            {LINKS.map((l) => (
              <Row key={l.href}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={meta}>{l.label}</span>
                  <a href={l.href} style={{ fontSize: "0.875rem", color: "var(--text)" }}>
                    {l.value}
                  </a>
                </div>
              </Row>
            ))}
          </Stack>
          <p style={{ marginTop: "1.5rem" }}>
            <a href="/" style={{ ...meta, color: "var(--muted)" }}>
              {t.labels.backToPortfolio}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
