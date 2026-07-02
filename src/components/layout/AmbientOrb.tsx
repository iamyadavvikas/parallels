"use client";

import { useEffect, useRef, useState } from "react";

export default function AmbientOrb() {
  const [pos, setPos] = useState({ x: -600, y: -600 });
  const [tradition, setTradition] = useState("default");
  const raf = useRef(0);
  const target = useRef({ x: -600, y: -600 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
    }

    function handleOver(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest("[data-tradition]");
      if (el) {
        setTradition(el.getAttribute("data-tradition") || "default");
      } else {
        setTradition("default");
      }
    }

    let active = true;
    function animate() {
      if (!active) return;
      setPos((prev) => ({
        x: prev.x + (target.current.x - prev.x) * 0.08,
        y: prev.y + (target.current.y - prev.y) * 0.08,
      }));
      raf.current = requestAnimationFrame(animate);
    }

    function handleVisibility() {
      if (document.hidden) {
        active = false;
        cancelAnimationFrame(raf.current);
      } else {
        active = true;
        raf.current = requestAnimationFrame(animate);
      }
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    raf.current = requestAnimationFrame(animate);

    return () => {
      active = false;
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      className={`ambient-orb ${tradition}`}
      style={{ left: pos.x, top: pos.y }}
      aria-hidden="true"
    />
  );
}
