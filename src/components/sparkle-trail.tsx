"use client";

import { useEffect, useRef } from "react";

const colors = ["#FFE6B5", "#F4B8C6", "#C9DFF6", "#C5D5B8", "#E6D4F5"];

export function SparkleTrail() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const hover = window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine || !hover || reduce.matches || !layer.current) return;

    let last = 0;
    const root = layer.current;

    const onMove = (event: MouseEvent) => {
      if (reduce.matches) return;
      const now = performance.now();
      if (now - last < 70) return;
      last = now;

      const spark = document.createElement("span");
      spark.className = "spark";
      spark.style.left = `${event.clientX}px`;
      spark.style.top = `${event.clientY}px`;
      spark.style.setProperty(
        "--spark",
        colors[Math.floor(Math.random() * colors.length)],
      );
      root.appendChild(spark);
      window.setTimeout(() => spark.remove(), 700);
      while (root.childElementCount > 16) {
        root.firstElementChild?.remove();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={layer} className="pointer-events-none fixed inset-0 z-30" aria-hidden="true" />;
}
