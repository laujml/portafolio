"use client";

import { usePrefersReducedMotion } from "@/lib/motion";
import { motion } from "motion/react";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      key={`${locale}${pathname}`}
      className="motion-fx"
      initial={{ opacity: 0, y: reduce ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
