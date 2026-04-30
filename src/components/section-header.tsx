import { FadeIn } from "./fade-in";

interface SectionHeaderProps {
  number: string;
  title: React.ReactNode;
  description?: string;
}

export function SectionHeader({ number, title, description }: SectionHeaderProps) {
  return (
    <FadeIn>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          paddingBottom: "3rem",
          borderBottom: "1px solid var(--border)",
          marginBottom: "3.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            color: "var(--muted)",
            letterSpacing: "0.12em",
          }}
        >
          {number}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
            fontWeight: 300,
            lineHeight: 1,
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--muted)",
              maxWidth: "480px",
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
