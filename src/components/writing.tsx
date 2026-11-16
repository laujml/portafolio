"use client";

import { SectionDecor } from "@/components/decor";
import { Reveal } from "@/components/reveal";
import { writing } from "@/data/writing";
import { isLocale } from "@/data/types";
import { isHttpUrl } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/motion";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

export function Writing() {
  const t = useTranslations();
  const localeValue = useLocale();
  const locale = isLocale(localeValue) ? localeValue : "en";
  const reduce = usePrefersReducedMotion();

  return (
    <section id="writing" className="relative overflow-x-clip bg-blush py-16 pb-24 md:py-24 md:pb-32">
      <SectionDecor variant="writing" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-ink md:text-5xl">{t("sections.writing")}</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {writing.map((thread, index) => (
            <Reveal key={thread.slug} delay={index * 0.06}>
              <motion.article
                className={`motion-fx flex h-full flex-col gap-3 rounded-[28px] bg-white/85 p-6 shadow-[0_10px_30px_rgba(43,27,23,0.06)] ${
                  isHttpUrl(thread.href) ? "" : "opacity-60"
                }`}
                whileHover={reduce || !isHttpUrl(thread.href) ? undefined : { y: -8, rotate: 0.6 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
              <h3 className="font-display text-2xl leading-snug">{thread.title[locale]}</h3>
              {thread.description ? (
                <p className="text-base leading-relaxed text-ink-soft">{thread.description[locale]}</p>
              ) : null}
              {isHttpUrl(thread.href) ? (
                  <a
                    href={thread.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex min-h-11 w-fit items-center rounded-full bg-ink px-5 py-2 font-display text-lg text-cream"
                  >
                    {t("writing.read")}
                  </a>
                ) : null}
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
