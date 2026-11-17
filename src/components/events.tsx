"use client";

import { SectionDecor } from "@/components/decor";
import { Reveal } from "@/components/reveal";
import { SafeImage } from "@/components/safe-image";
import { courses, events, type PortfolioEvent } from "@/data/events";
import { isLocale, type Locale } from "@/data/types";
import { usePrefersReducedMotion } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, type CSSProperties } from "react";

const minCardsPerLoop = 8;
const secondsPerCard = 6;

export function Events() {
  const t = useTranslations();
  const localeValue = useLocale();
  const locale = isLocale(localeValue) ? localeValue : "en";
  const repeats = Math.max(1, Math.ceil(minCardsPerLoop / Math.max(events.length, 1)));
  const loop = Array.from({ length: repeats }, () => events).flat();
  const marqueeStyle = { "--marquee-duration": `${loop.length * secondsPerCard}s` } as CSSProperties;
  const marqueeRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const resume = () => {
      if (document.visibilityState !== "visible") return;
      const active = document.activeElement;
      if (active instanceof HTMLElement && marqueeRef.current?.contains(active)) active.blur();
    };
    document.addEventListener("visibilitychange", resume);
    return () => document.removeEventListener("visibilitychange", resume);
  }, []);

  return (
    <section id="events" className="relative overflow-x-clip bg-sage pb-16 pt-10 md:pb-24">
      <SectionDecor variant="events" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display text-4xl text-ink md:text-5xl">{t("sections.events")}</h2>
        </Reveal>
        <div
          ref={marqueeRef}
          role="region"
          aria-label={t("events.carousel")}
          className="events-marquee mt-6 md:mt-8"
          style={marqueeStyle}
          onBlur={(event) => {
            if (reduceMotion || event.currentTarget.contains(event.relatedTarget as Node | null)) return;
            event.currentTarget.scrollLeft = 0;
          }}
        >
          <div className="events-track flex w-max">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 gap-5 pr-5 md:gap-6 md:pr-6" aria-hidden={copy === 1 || undefined}>
                {loop.map((event, index) => {
                  const duplicate = copy === 1 || index >= events.length;
                  const title = event.title[locale];
                  return (
                    <li
                      key={`${event.slug}-${index}`}
                      data-duplicate={duplicate || undefined}
                      aria-hidden={duplicate || undefined}
                      className="w-52 shrink-0 md:w-60"
                    >
                      <EventCard
                        event={event}
                        locale={locale}
                        title={title}
                        formatLabel={event.format === "virtual" ? t("events.virtual") : t("events.inPerson")}
                        linkLabel={t("events.linkLabel", { title })}
                        focusable={!duplicate}
                      />
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
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

function EventCard({
  event,
  locale,
  title,
  formatLabel,
  linkLabel,
  focusable,
}: {
  event: PortfolioEvent;
  locale: Locale;
  title: string;
  formatLabel: string;
  linkLabel: string;
  focusable: boolean;
}) {
  return (
    <a
      href={event.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={linkLabel}
      tabIndex={focusable ? undefined : -1}
      onClick={(event) => event.currentTarget.blur()}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) {
          event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      }}
      className="group flex h-full flex-col items-center rounded-[28px] text-center motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1"
    >
      <div className="relative h-52 w-36 overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-2xl group-focus-visible:shadow-2xl md:h-60 md:w-44">
        <SafeImage
          src={event.image}
          alt={event.alt[locale]}
          sizes="(max-width: 768px) 144px, 176px"
          className={`zoom-media ${
            event.imageFit === "contain"
              ? "bg-white object-contain p-6"
              : `object-cover ${event.imagePosition ?? "object-center"}`
          }`}
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <span className="relative z-10 -mt-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink shadow-sm">
        {formatLabel}
      </span>
      <h3 className="mt-2 min-h-[2.5em] w-full font-display text-base leading-tight text-ink md:text-lg">{title}</h3>
    </a>
  );
}
