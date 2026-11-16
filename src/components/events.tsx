"use client";

import { carouselCardClass, Carousel } from "@/components/carousel";
import { SectionDecor } from "@/components/decor";
import { Reveal } from "@/components/reveal";
import { SafeImage } from "@/components/safe-image";
import { courses, events } from "@/data/events";
import { isLocale } from "@/data/types";
import { isHttpUrl } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/motion";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

export function Events() {
  const t = useTranslations();
  const localeValue = useLocale();
  const locale = isLocale(localeValue) ? localeValue : "en";
  const reduce = usePrefersReducedMotion();

  return (
    <section id="events" className="relative overflow-x-clip bg-sage py-16 md:py-24">
      <SectionDecor variant="events" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Carousel
          title={<h2 className="font-display text-4xl text-ink md:text-5xl">{t("sections.events")}</h2>}
          label={t("events.carousel")}
          previousLabel={t("events.previous")}
          nextLabel={t("events.next")}
          count={events.length}
        >
          {events.map((event) => (
            <motion.article
              key={event.slug}
              data-card
              className={`motion-fx flex flex-col items-center px-2 text-center ${carouselCardClass}`}
              whileHover={reduce ? undefined : { y: -8, rotate: -1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <div className="flex flex-col items-center">
                <div className="relative h-72 w-48 overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-white shadow-lg">
                  <SafeImage src={event.image} alt={event.alt[locale]} sizes="200px" className="zoom-media object-cover" />
                </div>
                <span className="relative z-10 -mt-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink shadow-sm">
                  {event.format === "virtual" ? t("events.virtual") : t("events.inPerson")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl leading-tight">{event.name}</h3>
              {event.place ? <p className="mt-2 text-ink-soft">{event.place}</p> : null}
              <p className="text-ink-soft">{event.date[locale]}</p>
              {event.organizer ? (
                <p className="mt-2 text-sm leading-relaxed">{t("events.organizedBy", { name: event.organizer })}</p>
              ) : null}
              {event.note ? <p className="mt-1 text-sm leading-relaxed text-ink-soft">{event.note[locale]}</p> : null}
              {isHttpUrl(event.thread) ? (
                <a
                  href={event.thread}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-2 font-display text-lg text-cream"
                >
                  {t("events.readThread")}
                </a>
              ) : null}
            </motion.article>
          ))}
        </Carousel>
        <Reveal>
          <div className="mx-auto mt-14 max-w-4xl rounded-[28px] bg-white/70 px-5 py-6 sm:px-8">
            <h3 className="text-center font-display text-2xl">{t("events.courses")}</h3>
            <ul className="mt-4 flex flex-wrap justify-center gap-3">
              {courses.map((course) => (
                <li key={course.slug} className="rounded-full bg-cream px-4 py-2 text-sm leading-snug text-ink">
                  <span className="font-semibold">{course.name[locale]}</span>
                  {", "}
                  {course.date[locale]}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
