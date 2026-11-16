"use client";

import { ContactLinks } from "@/components/contact-links";
import { SectionDecor } from "@/components/decor";
import { Reveal } from "@/components/reveal";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("sections");
  const tAbout = useTranslations("about");
  const paragraphs = tAbout.raw("paragraphs") as string[];

  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100dvh-4rem-1px)] scroll-mt-[calc(4rem+1px)]! flex-col justify-center overflow-x-clip bg-pink py-16 md:min-h-[calc(100dvh-4.5rem-1px)] md:scroll-mt-[calc(4.5rem+1px)]! md:py-20"
    >
      <SectionDecor variant="about" />
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-4xl text-ink md:text-5xl">{t("about")}</h2>
        </Reveal>
        <div className="mt-6 space-y-4 text-lg leading-relaxed">
          {paragraphs.map((sentence) => (
            <Reveal key={sentence}>
              <p>{sentence}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8">
            <ContactLinks />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
