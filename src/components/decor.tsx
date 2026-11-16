"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

export function Flower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="7" fill="#FFE6B5" />
      <ellipse cx="32" cy="14" rx="8" ry="12" fill="#F4B8C6" />
      <ellipse cx="32" cy="50" rx="8" ry="12" fill="#F4B8C6" />
      <ellipse cx="14" cy="32" rx="12" ry="8" fill="#E38AA0" />
      <ellipse cx="50" cy="32" rx="12" ry="8" fill="#E38AA0" />
      <ellipse cx="18" cy="18" rx="7" ry="11" transform="rotate(-40 18 18)" fill="#FFD5C2" />
      <ellipse cx="46" cy="18" rx="7" ry="11" transform="rotate(40 46 18)" fill="#FFD5C2" />
      <ellipse cx="18" cy="46" rx="7" ry="11" transform="rotate(40 18 46)" fill="#E6D4F5" />
      <ellipse cx="46" cy="46" rx="7" ry="11" transform="rotate(-40 46 46)" fill="#E6D4F5" />
    </svg>
  );
}

export function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 20.4s-6.8-4.2-6.8-8.8A3.9 3.9 0 0 1 12 8.4a3.9 3.9 0 0 1 6.8 3.2c0 4.6-6.8 8.8-6.8 8.8Z"
      />
    </svg>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 1.4 14.7 8.1 21.8 8.7 16.4 13.5 18.2 20.5 12 16.7 5.8 20.5 7.6 13.5 2.2 8.7 9.3 8.1Z"
      />
    </svg>
  );
}

export function Float({
  className,
  children,
  delay = 0,
  distance = 22,
}: {
  className?: string;
  children: ReactNode;
  delay?: number;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`motion-fx pointer-events-none absolute ${className ?? ""}`}
      style={reduce ? undefined : { y }}
      animate={reduce ? undefined : { rotate: [0, 8, -6, 0] }}
      transition={
        reduce
          ? undefined
          : { duration: 14, repeat: Infinity, ease: "easeInOut", delay }
      }
    >
      {children}
    </motion.div>
  );
}

export function SectionDecor({
  variant,
}: {
  variant: "hero" | "about" | "stack" | "projects" | "events" | "writing" | "detail";
}) {
  if (variant === "hero") {
    return (
      <>
        <Float className="left-[6%] top-24 h-14 w-14 text-butter" delay={0.2}>
          <Star className="h-full w-full text-butter" />
        </Float>
        <Float className="right-[8%] top-28 h-10 w-10" delay={1.1} distance={16}>
          <Flower className="h-full w-full" />
        </Float>
        <Float className="bottom-10 left-[18%] h-16 w-16" delay={0.6}>
          <Flower className="h-full w-full" />
        </Float>
      </>
    );
  }

  const pieces = {
    about: [
      "left-6 top-8 h-12 w-12",
      "right-10 bottom-8 h-16 w-16",
    ],
    stack: [
      "left-8 bottom-10 h-14 w-14",
      "right-12 top-10 h-10 w-10",
    ],
    projects: [
      "left-3 top-2 h-8 w-8",
      "right-28 top-2 h-8 w-8",
    ],
    events: [
      "left-8 top-10 h-12 w-12",
      "right-8 bottom-12 h-16 w-16",
    ],
    writing: [
      "right-10 top-8 h-14 w-14",
      "left-6 bottom-8 h-10 w-10",
    ],
    detail: [
      "left-4 top-24 hidden h-14 w-14 md:block",
      "right-6 top-32 hidden h-12 w-12 md:block",
    ],
  }[variant];

  return (
    <>
      <Float className={pieces[0]} delay={0.3}>
        <Flower className="h-full w-full" />
      </Float>
      <Float className={pieces[1]} delay={1.4} distance={14}>
        <Star className="h-full w-full text-butter" />
      </Float>
    </>
  );
}
