"use client";

import { SectionDecor } from "@/components/decor";
import { TagList } from "@/components/tag";
import { projectTitle, projects } from "@/data/projects";
import { isLocale } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { categoryClass } from "@/lib/categories";
import { usePrefersReducedMotion } from "@/lib/motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const coverTones = [
  { bg: "bg-blush", shadow: "shadow-[0_18px_34px_rgba(227,138,160,0.38)]" },
  { bg: "bg-sky", shadow: "shadow-[0_18px_34px_rgba(167,199,238,0.55)]" },
  { bg: "bg-sage", shadow: "shadow-[0_18px_34px_rgba(155,184,146,0.42)]" },
  { bg: "bg-butter", shadow: "shadow-[0_18px_34px_rgba(232,184,92,0.38)]" },
];

export function Projects() {
  const t = useTranslations();
  const localeValue = useLocale();
  const locale = isLocale(localeValue) ? localeValue : "en";
  const reduce = usePrefersReducedMotion();
  const pageSize = 4;
  const pageCount = Math.max(1, Math.ceil(projects.length / pageSize));
  const [page, setPage] = useState(0);
  const current = Math.min(page, pageCount - 1);
  const start = current * pageSize;
  const visible = projects.slice(start, start + pageSize);
  const showArrows = projects.length > 4;

  const go = (direction: 1 | -1) => {
    setPage((value) => {
      const base = Math.min(value, pageCount - 1);
      return Math.min(pageCount - 1, Math.max(0, base + direction));
    });
  };

  return (
    <section
      id="projects"
      className="relative flex min-h-[calc(100dvh-4rem-1px)] flex-col justify-center bg-cream py-12 md:min-h-[calc(100dvh-4.5rem-1px)] md:py-10"
    >
      <SectionDecor variant="projects" />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between gap-6">
          <h2 className="font-display text-4xl leading-none text-ink lg:text-[2.5rem]">{t("sections.projects")}</h2>
          {showArrows ? (
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm disabled:opacity-40"
                aria-label={t("projects.previousProjects")}
                disabled={current === 0}
                onClick={() => go(-1)}
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm disabled:opacity-40"
                aria-label={t("projects.nextProjects")}
                disabled={current >= pageCount - 1}
                onClick={() => go(1)}
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={`${current}-${pageSize}`}
            className="mt-8 grid grid-cols-1 gap-8 py-4 lg:mt-6 lg:grid-cols-2 lg:gap-6 lg:py-2"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -12 }}
            transition={{ duration: reduce ? 0.15 : 0.35, ease: "easeOut" }}
          >
            {visible.map((project, index) => {
              const globalIndex = start + index;
              const tone = coverTones[globalIndex % coverTones.length] ?? coverTones[0];
              const tilt = globalIndex % 2 === 0 ? -1.5 : 1.5;
              const tech = project.tech.filter(Boolean);
              const category = project.category[locale];
              const description = project.tagline[locale];
              const title = projectTitle(project, locale);
              return (
                <motion.li
                  key={project.slug}
                  className={`motion-fx h-full rounded-[28px] ${tone.shadow}`}
                  initial={{ opacity: 0, y: reduce ? 0 : 20, rotate: reduce ? 0 : tilt }}
                  animate={{ opacity: 1, y: 0, rotate: reduce ? 0 : tilt }}
                  whileHover={reduce ? undefined : { rotate: 0, y: -8 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: reduce ? 0 : index * 0.08,
                  }}
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white lg:flex-row">
                    <div className={`relative aspect-[16/10] shrink-0 ${tone.bg} lg:aspect-auto lg:w-[22%]`}>
                      <ProjectCover
                        src={project.thumbnail}
                        alt={project.thumbnailAlt[locale]}
                        initial={title.trim().charAt(0).toUpperCase()}
                      />
                      <div className="absolute left-2 right-2 top-2 z-10 flex flex-wrap gap-1">
                        {category ? (
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold text-ink ${categoryClass[project.categoryId]}`}
                          >
                            {category}
                          </span>
                        ) : null}
                        <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-ink">
                          {project.year}
                        </span>
                        {project.status === "inProgress" ? (
                          <span className="rounded-full bg-butter px-2.5 py-1 text-xs font-semibold text-ink">
                            {t("projects.inProgress")}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-4 lg:p-3.5">
                      <h3 className="font-display text-2xl leading-tight">{title}</h3>
                      {description ? <p className="text-sm leading-snug text-ink-soft">{description}</p> : null}
                      {tech.length > 0 ? <TagList labels={tech} /> : null}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="mt-auto inline-flex min-h-11 w-fit items-center rounded-full bg-ink px-5 py-2 font-display text-lg text-cream"
                      >
                        {t("projects.viewDetails")}
                      </Link>
                    </div>
                  </article>
                </motion.li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCover({ src, alt, initial }: { src: string; alt: string; initial: string }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div role="img" aria-label={alt} className="absolute inset-0 p-2 lg:p-3">
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white/60">
          <span aria-hidden="true" className="font-display text-6xl text-ink/25 lg:text-5xl">
            {initial}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 90vw, 140px"
      className="zoom-media absolute inset-0 h-full w-full object-contain p-2 lg:p-3"
      onError={() => setFailed(true)}
    />
  );
}
