"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function TabTransition({ children, tabKey }: { children: ReactNode; tabKey: string }) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(children);
  const prev = useRef(tabKey);

  useEffect(() => {
    if (prev.current === tabKey) {
      setVisible(true);
      return;
    }
    prev.current = tabKey;
    setVisible(false);
    const t = setTimeout(() => {
      setContent(children);
      setVisible(true);
    }, 180);
    return () => clearTimeout(t);
  }, [tabKey, children]);

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
