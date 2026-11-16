"use client";

import { usePrefersReducedMotion } from "@/lib/motion";
import { tagTone } from "@/lib/tags";
import { motion } from "motion/react";

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function Tag({ label }: { label: string }) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.li
      variants={item}
      className="motion-fx"
      whileHover={reduce ? undefined : { y: -4, rotate: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 16 }}
    >
      <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold text-ink ${tagTone(label)}`}>
        {label}
      </span>
    </motion.li>
  );
}

export function TagList({ labels }: { labels: string[] }) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.ul
      className="flex flex-wrap gap-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -20px 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.04 } },
      }}
    >
      {labels.map((label) => (
        <Tag key={label} label={label} />
      ))}
    </motion.ul>
  );
}
