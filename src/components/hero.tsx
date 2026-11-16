"use client";

import { Heart, SectionDecor, Star } from "@/components/decor";
import { profile } from "@/data/profile";
import { isLocale } from "@/data/types";
import { usePrefersReducedMotion } from "@/lib/motion";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";
import avatar from "../../public/images/avatar.png";

export function Hero() {
  const t = useTranslations("hero");
  const localeValue = useLocale();
  const locale = isLocale(localeValue) ? localeValue : "en";
  const reduce = usePrefersReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.5 } },
  };

  return (
    <section className="relative overflow-x-clip bg-cream pb-16 pt-28 md:pb-24 md:pt-36">
      <SectionDecor variant="hero" />
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <motion.div className="order-2 lg:order-1" initial="hidden" animate="show" variants={container}>
          <motion.h1 variants={item} className="motion-fx font-display text-5xl leading-none text-ink sm:text-6xl lg:text-7xl">
            {profile.greeting[locale]}
          </motion.h1>
          <motion.p variants={item} className="motion-fx mt-5 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {profile.role[locale]}
          </motion.p>
          <motion.p variants={item} className="motion-fx mt-4 max-w-xl text-lg leading-relaxed">
            {t("intro")}
          </motion.p>
          <motion.div variants={item} className="motion-fx mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="inline-flex min-h-12 items-center justify-center rounded-full bg-pink-deep px-6 py-3 text-center font-display text-lg text-ink shadow-sm">
              {t("seeProjects")}
            </a>
            <a
              href={t("cvHref")}
              download={t("cvFileName")}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-sage-deep px-6 py-3 text-center font-display text-lg text-ink shadow-sm"
            >
              {t("downloadCv")}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="motion-fx relative order-1 mx-auto w-full max-w-[460px] lg:order-2"
          initial={{ opacity: 0, y: reduce ? 0 : 28, scale: reduce ? 1 : 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={reduce ? { duration: 0.2 } : { type: "spring", duration: 0.9, bounce: 0.35 }}
        >
          <motion.div
            className="motion-fx relative"
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          >
            <Image
              src={avatar}
              alt={profile.portraitAlt[locale]}
              priority
              sizes="(max-width: 1024px) 90vw, 460px"
              className="h-auto w-full mix-blend-multiply"
            />
            <Twinkle className="-left-1 top-6 h-6 w-6 text-pink" delay={0}>
              <Star className="h-full w-full" />
            </Twinkle>
            <Twinkle className="-right-1 top-2 h-5 w-5 text-butter" delay={0.5}>
              <Star className="h-full w-full" />
            </Twinkle>
            <Twinkle className="bottom-8 -left-1 h-5 w-5 text-lilac" delay={0.9}>
              <Heart className="h-full w-full" />
            </Twinkle>
            <Twinkle className="-right-2 bottom-6 h-6 w-6 text-pink" delay={1.2}>
              <Heart className="h-full w-full" />
            </Twinkle>
            <Twinkle className="left-1/2 -top-2 h-4 w-4 -translate-x-1/2 text-lilac" delay={0.3}>
              <Star className="h-full w-full" />
            </Twinkle>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Twinkle({ className, delay, children }: { className: string; delay: number; children: ReactNode }) {
  const reduce = usePrefersReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={`motion-fx pointer-events-none absolute ${className}`}
      animate={reduce ? undefined : { opacity: [0.4, 1, 0.4], y: [0, -6, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}
