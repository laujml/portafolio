"use client";

import { SectionDecor } from "@/components/decor";
import { Reveal } from "@/components/reveal";
import { TagList } from "@/components/tag";
import { techStack } from "@/data/techStack";
import { isLocale } from "@/data/types";
import { useLocale, useTranslations } from "next-intl";

export function TechStack() {
  const t = useTranslations("sections");
  const localeValue = useLocale();
  const locale = isLocale(localeValue) ? localeValue : "en";

  return (
    <section id="stack" className="relative overflow-x-clip bg-sky py-16 md:pt-12 md:pb-24">
      <SectionDecor variant="stack" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-ink md:text-5xl">{t("stack")}</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:mt-7 md:grid-cols-2 md:gap-y-4">
          {techStack.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.05}>
              <article className="rounded-[28px] bg-white/80 p-5 shadow-[0_10px_30px_rgba(43,27,23,0.06)] sm:p-6 md:p-5">
                <h3 className="font-display text-2xl">{group.title[locale]}</h3>
                <div className="mt-4">
                  <TagList labels={group.items} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
