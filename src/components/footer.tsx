export function Footer() {
  return (
    <footer
      style={{
          border: "none",
        padding: "1.5rem 2rem",
        textAlign: "center",
        background: "transparent",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        maskImage: "linear-gradient(to top, black 60%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, black 60%, transparent 100%)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6875rem",
          color: "var(--muted)",
        }}
      >
        &copy; {new Date().getFullYear()}. GROMADS. All rights reserved.
      </span>
    </footer>
  );
}
