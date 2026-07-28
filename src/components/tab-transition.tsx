"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function TabTransition({ children, tabKey }: { children: ReactNode; tabKey: string }) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(children);
  const prev = useRef(tabKey);
  // children muda de referencia a cada render do pai; guardar num ref evita
  // reexecutar o efeito fora da troca de aba
  const latest = useRef(children);
  latest.current = children;

  useEffect(() => {
    if (prev.current === tabKey) {
      setVisible(true);
      return;
    }
    prev.current = tabKey;
    setVisible(false);
    const t = setTimeout(() => {
      setContent(latest.current);
      setVisible(true);
    }, 180);
    return () => clearTimeout(t);
  }, [tabKey]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(24px)",
        transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {content}
    </div>
  );
}
