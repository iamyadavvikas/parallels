"use client";

import { useEffect, useRef } from "react";

export default function AmbientOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: -600, y: -600 });
  const currentRef = useRef({ x: -600, y: -600 });
  const traditionRef = useRef("default");
  const rafRef = useRef(0);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    let active = true;

    function handleMove(e: MouseEvent) {
      targetRef.current = { x: e.clientX, y: e.clientY };
    }

    function handleOver(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest("[data-tradition]");
      const trad = el ? el.getAttribute("data-tradition") || "default" : "default";
      if (trad !== traditionRef.current) {
        traditionRef.current = trad;
        orb!.className = `ambient-orb ${trad}`;
      }
    }

    function animate() {
      if (!active) return;
      const cur = currentRef.current;
      const tgt = targetRef.current;
      const dx = tgt.x - cur.x;
      const dy = tgt.y - cur.y;

      // Only update DOM if there's meaningful movement
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        cur.x += dx * 0.08;
        cur.y += dy * 0.08;
        orb!.style.left = `${cur.x}px`;
        orb!.style.top = `${cur.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    function handleVisibility() {
      if (document.hidden) {
        active = false;
        cancelAnimationFrame(rafRef.current);
      } else {
        active = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      active = false;
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      className="ambient-orb default"
      aria-hidden="true"
    />
  );
}
