"use client";

import { useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%@&*!?[]{}|;:<>+-=~^/\\";
const CELL = 18;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) return [116, 140, 171];
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface Cell {
  char: string;
  opacity: number;
  target: number;
  timer: number;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d")!;

    let cells: Cell[] = [];
    let cols = 0;
    let rows = 0;

    function init() {
      const w = wrapper!.clientWidth;
      const h = wrapper!.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx.scale(dpr, dpr);
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      cells = Array.from({ length: cols * rows }, () => ({
        char: randomChar(),
        opacity: Math.random() * 0.4 + 0.05,
        target: Math.random() * 0.4 + 0.05,
        timer: Math.floor(Math.random() * 120),
      }));
    }

    function draw() {
      const w = wrapper!.clientWidth;
      const h = wrapper!.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const colorHex = getComputedStyle(document.documentElement).getPropertyValue("--text").trim();
      const [r, g, b] = hexToRgb(colorHex);

      ctx.font = `${CELL * 0.7}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * CELL + CELL / 2;
        const y = row * CELL + CELL / 2;

        const dx = x - mouse.current.x;
        const dy = y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const boost = dist < 150 ? (1 - dist / 150) * 0.6 : 0;

        cell.timer--;
        if (cell.timer <= 0) {
          cell.target = Math.random() * 0.4 + 0.05;
          cell.timer = 30 + Math.floor(Math.random() * 100);
          if (Math.random() > 0.72) cell.char = randomChar();
        }
        cell.opacity += (cell.target - cell.opacity) * 0.04;

        const alpha = Math.min(1, cell.opacity + boost);
        if (alpha < 0.01) continue;
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fillText(cell.char, x, y);
      }

      raf.current = requestAnimationFrame(draw);
    }

    const onMouse = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const obs = new ResizeObserver(init);
    obs.observe(wrapper);
    init();
    draw();

    document.addEventListener("mousemove", onMouse);

    return () => {
      cancelAnimationFrame(raf.current);
      obs.disconnect();
      document.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: [
            "linear-gradient(to right, var(--bg) 0%, transparent 8%)",
            "linear-gradient(to left, var(--bg) 0%, transparent 8%)",
            "linear-gradient(to bottom, var(--bg) 0%, transparent 10%)",
            "linear-gradient(to top, var(--bg) 0%, transparent 10%)",
          ].join(", "),
        }}
      />
    </div>
  );
}
