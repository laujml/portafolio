"use client";

import { Reveal } from "@/components/reveal";
import { Star } from "@/components/decor";
import { projectTitle } from "@/data/projects";
import type { Project } from "@/data/types";
import { isLocale } from "@/data/types";
import { Link } from "@/i18n/navigation";
import { isHttpUrl } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/motion";
import { ArrowLeft, ArrowRight, Download, ExternalLink, Play, X } from "lucide-react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa6";

const techTones = ["bg-sky", "bg-pink", "bg-butter"];

export function ProjectView({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const localeValue = useLocale();
  const locale = isLocale(localeValue) ? localeValue : "en";
  const [openAt, setOpenAt] = useState<number | null>(null);
  const title = projectTitle(project, locale);
  const category = project.category[locale];
  const date = project.date[locale];
  const tech = project.tech.filter(Boolean);
  const about = project.about[locale].filter(Boolean);
  const features = project.features[locale].filter(Boolean);
  const tagline = project.tagline[locale];
  const shots = project.screenshots.filter((shot) => shot.src).slice(0, project.carousel ? undefined : 3);
  const gallery = shots.map((shot) => ({ src: shot.src, alt: shot.alt[locale] }));
  const heroShot = !project.video?.src && gallery.length > 0 ? gallery[0] : null;
  const restOffset = heroShot && !project.carousel && !project.galleryIncludesHero ? 1 : 0;
  const restGallery = gallery.slice(restOffset);
  const showAbout = about.length > 0 || features.length > 0;
  const showVideo = Boolean(project.video?.src);
  const showHeaderLinks = isHttpUrl(project.apk);
  const showGithub = isHttpUrl(project.github);
  const showDemo = isHttpUrl(project.demo);
  const splitMedia = showAbout && (showVideo || Boolean(heroShot));

  return (
    <article className="bg-cream px-5 pb-20 pt-28 sm:px-8 md:pt-32">
      <div className="mx-auto w-full max-w-[1200px]">
        <Reveal>
          <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 font-display text-lg text-ink">
            <ArrowLeft aria-hidden="true" className="h-5 w-5" />
            {t("back")}
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="relative mt-8 pr-16 text-left sm:pr-24">
            <SideStar className="right-10 top-1 text-butter" delay={0.2} />
            <SideStar className="right-0 top-8 text-sky" delay={0.8} />
            <h1 className="font-display text-5xl leading-none text-ink sm:text-7xl">{title}</h1>
            {tagline ? <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft sm:text-xl">{tagline}</p> : null}
          </div>
        </Reveal>
        {category || date || project.year || tech.length > 0 ? (
          <Reveal delay={0.1}>
            <ul className="mt-6 flex flex-wrap items-center justify-start gap-2">
              {category ? <li className="rounded-full bg-pink px-4 py-1.5 text-sm font-semibold">{category}</li> : null}
              <li className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold">{project.year}</li>
              {project.status === "inProgress" ? (
                <li className="rounded-full bg-butter px-4 py-1.5 text-sm font-semibold">{t("inProgress")}</li>
              ) : null}
              {date ? <li className="rounded-full bg-sky px-4 py-1.5 text-sm font-semibold">{date}</li> : null}
              {tech.length > 0 && (category || date) ? (
                <li aria-hidden="true" className="mx-1 h-1.5 w-1.5 rounded-full bg-ink/30" />
              ) : null}
              {tech.map((item, index) => (
                <li
                  key={item}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold ${techTones[index % techTones.length]}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        {showHeaderLinks ? (
          <Reveal>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
              {isHttpUrl(project.apk) ? (
                <a
                  href={project.apk}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sage-deep px-6 py-3 font-display text-lg text-ink"
                >
                  <Download aria-hidden="true" className="h-5 w-5" />
                  {t("apk")}
                </a>
              ) : null}
            </div>
          </Reveal>
        ) : null}

        {showAbout || showVideo || showGithub || showDemo ? (
          <div
            className={`mt-10 ${splitMedia ? "grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10" : ""}`}
          >
            {showAbout || showGithub || showDemo ? (
              <div>
                {showAbout ? (
                  <Reveal>
                    <WavyFrame>
                      <h2 className="text-left font-display text-3xl sm:text-4xl">{t("about")}</h2>
                      {about.length > 0 ? (
                        <div className="mt-4 space-y-4 text-left text-lg leading-relaxed">
                          {about.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      ) : null}
                      {features.length > 0 ? (
                        <ul className="mt-6 list-disc space-y-2 pl-5 text-left text-lg leading-relaxed">
                          {features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      ) : null}
                    </WavyFrame>
                  </Reveal>
                ) : null}
                {showDemo || showGithub ? (
                  <Reveal>
                    <div
                      className={`flex flex-wrap items-center gap-3 ${showAbout ? "ml-[46px] mt-6 lg:ml-[54px]" : ""}`}
                    >
                      {showDemo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-pink px-6 py-3 font-display text-lg text-ink"
                        >
                          <ExternalLink aria-hidden="true" className="h-5 w-5" />
                          {t("demo")}
                        </a>
                      ) : null}
                      {showGithub ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sky px-6 py-3 font-display text-lg text-ink"
                        >
                          <FaGithub aria-hidden="true" className="h-5 w-5" />
                          {t("github")}
                        </a>
                      ) : null}
                    </div>
                  </Reveal>
                ) : null}
              </div>
            ) : null}
            {showVideo && project.video ? (
              <Reveal>
                <VideoPlayer src={project.video.src} poster={project.video.poster} label={title} />
              </Reveal>
            ) : null}
            {heroShot ? (
              <Reveal>
                <HeroShot
                  shot={heroShot}
                  frame={project.frame ?? "phone"}
                  initial={title.trim().charAt(0).toUpperCase()}
                  onOpen={() => setOpenAt(0)}
                />
              </Reveal>
            ) : null}
          </div>
        ) : null}

        {restGallery.length > 0 ? (
          <Reveal>
            <h2 className="sr-only">{t("gallery")}</h2>
            <div className="mt-12">
              {project.carousel ? (
                <CarouselGallery
                  shots={restGallery}
                  labels={{ previous: t("previous"), next: t("next") }}
                  onOpen={(index) => setOpenAt(index + restOffset)}
                />
              ) : project.frame === "browser" ? (
                <BrowserGallery shots={restGallery} onOpen={(index) => setOpenAt(index + restOffset)} />
              ) : project.frame === "portrait" ? (
                <PortraitGallery shots={restGallery} onOpen={(index) => setOpenAt(index + restOffset)} />
              ) : (
                <PhoneGallery
                  shots={restGallery}
                  initial={title.trim().charAt(0).toUpperCase()}
                  onOpen={(index) => setOpenAt(index + restOffset)}
                />
              )}
            </div>
          </Reveal>
        ) : null}
      </div>

      {openAt !== null ? (
        <Lightbox
          shots={gallery}
          frame={project.frame ?? "phone"}
          index={openAt}
          onClose={() => setOpenAt(null)}
          onIndex={setOpenAt}
        />
      ) : null}
    </article>
  );
}

function SideStar({ className, delay }: { className: string; delay: number }) {
  const reduce = usePrefersReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={`motion-fx pointer-events-none absolute h-8 w-8 sm:h-10 sm:w-10 ${className}`}
      animate={reduce ? undefined : { y: [0, -8, 0], rotate: [0, 12, 0] }}
      transition={{ duration: 4.8, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <Star className="h-full w-full" />
    </motion.span>
  );
}

function VideoPlayer({ src, poster, label }: { src: string; poster: string; label: string }) {
  const t = useTranslations("projects");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ratio, setRatio] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const apply = () => {
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        setRatio(`${video.videoWidth} / ${video.videoHeight}`);
      }
    };
    apply();
    video.addEventListener("loadedmetadata", apply);
    return () => video.removeEventListener("loadedmetadata", apply);
  }, [src]);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      setPlaying(false);
      return;
    }
    void video.play().then(() => setPlaying(true)).catch(() => setMissing(true));
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] border-[6px] border-white bg-cream shadow-[0_18px_40px_rgba(43,27,23,0.14)]">
      <video
        ref={videoRef}
        className="block h-auto w-full bg-cream object-contain"
        style={{ aspectRatio: ratio || "16 / 9" }}
        src={src}
        poster={poster || undefined}
        controls={playing}
        playsInline
        preload="metadata"
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            setRatio(`${video.videoWidth} / ${video.videoHeight}`);
          }
        }}
        onError={() => setMissing(true)}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          if (!video.duration) return;
          setProgress(video.currentTime / video.duration);
        }}
        onEnded={() => {
          setPlaying(false);
          setProgress(1);
        }}
        aria-label={label}
      />
      {missing ? (
        <p className="absolute inset-x-4 bottom-10 z-10 rounded-2xl bg-white/95 px-4 py-3 text-center text-sm font-semibold text-ink">
          {t("videoMissing")}
        </p>
      ) : null}
      {!playing && !missing ? (
        <button
          type="button"
          onClick={play}
          className="absolute inset-0 z-10 flex items-center justify-center"
          aria-label={t("play")}
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-800/55 text-white shadow-lg">
            <Play aria-hidden="true" className="ml-1 h-8 w-8" fill="currentColor" />
          </span>
        </button>
      ) : null}
      {!playing ? (
        <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 h-1.5 overflow-hidden rounded-full bg-white/80">
          <div className="h-full rounded-full bg-neutral-800/70" style={{ width: `${progress * 100}%` }} />
        </div>
      ) : null}
    </div>
  );
}

function HeroShot({
  shot,
  frame,
  initial,
  onOpen,
}: {
  shot: { src: string; alt: string };
  frame: "phone" | "browser" | "portrait";
  initial: string;
  onOpen: () => void;
}) {
  if (frame === "phone") {
    return (
      <button
        type="button"
        onClick={onOpen}
        data-hero-media
        aria-label={shot.alt}
        className="mx-auto block w-full max-w-[196px] rounded-[1.8rem] bg-ink p-2 text-left shadow-xl"
      >
        <span className="relative block aspect-[9/19.5] overflow-hidden rounded-[1.35rem] bg-cream">
          <span className="absolute left-1/2 top-2 z-10 h-3.5 w-12 -translate-x-1/2 rounded-full bg-ink" />
          <PhoneShot src={shot.src} initial={initial} />
        </span>
      </button>
    );
  }

  const portrait = frame === "portrait";

  return (
    <button
      type="button"
      onClick={onOpen}
      data-hero-media
      aria-label={shot.alt}
      className={`relative block w-full overflow-hidden rounded-[28px] border-[6px] border-white bg-cream text-left shadow-[0_18px_40px_rgba(43,27,23,0.14)] ${
        portrait ? "mx-auto max-w-[440px]" : ""
      }`}
    >
      {portrait ? null : (
        <span className="flex h-8 items-center gap-1.5 bg-ink px-3">
          <span className="h-2.5 w-2.5 rounded-full bg-pink" />
          <span className="h-2.5 w-2.5 rounded-full bg-butter" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage" />
        </span>
      )}
      <span className={`relative block bg-cream ${portrait ? "aspect-[4/5]" : "aspect-video"}`}>
        <Image src={shot.src} alt="" fill sizes="(max-width: 1024px) 100vw, 680px" className="object-contain" />
      </span>
    </button>
  );
}

function CarouselGallery({
  shots,
  labels,
  onOpen,
}: {
  shots: { src: string; alt: string }[];
  labels: { previous: string; next: string };
  onOpen: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const count = shots.length;
  const shot = shots[index];
  const go = (step: number) => setIndex((index + step + count) % count);
  const arrow = "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink shadow-sm";

  return (
    <div className="mx-auto flex max-w-[560px] flex-col items-center gap-4">
      <div className="flex w-full items-center gap-3">
        <button type="button" onClick={() => go(-1)} aria-label={labels.previous} className={arrow}>
          <ArrowLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => onOpen(index)}
          aria-label={shot.alt}
          className="min-w-0 flex-1 overflow-hidden rounded-2xl bg-white text-left shadow-xl"
        >
          <span className="relative block aspect-[4/5] bg-cream">
            <Image src={shot.src} alt="" fill sizes="(max-width: 768px) 100vw, 460px" className="object-contain" />
          </span>
        </button>
        <button type="button" onClick={() => go(1)} aria-label={labels.next} className={arrow}>
          <ArrowRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {shots.map((item, dot) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setIndex(dot)}
            aria-label={`${dot + 1} / ${count}`}
            aria-current={dot === index}
            className={`h-2.5 rounded-full transition-all ${dot === index ? "w-6 bg-ink" : "w-2.5 bg-ink/25"}`}
          />
        ))}
      </div>
    </div>
  );
}

function PhoneGallery({
  shots,
  initial,
  onOpen,
}: {
  shots: { src: string; alt: string }[];
  initial: string;
  onOpen: (index: number) => void;
}) {
  return (
    <ul className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
      {shots.map((shot, index) => (
        <li key={`${shot.src}-${index}`} className="w-full max-w-[200px]">
          <button
            type="button"
            onClick={() => onOpen(index)}
            className="w-full rounded-[1.8rem] bg-ink p-2 text-left shadow-xl"
            aria-label={shot.alt}
          >
            <span className="relative block aspect-[9/19.5] overflow-hidden rounded-[1.35rem] bg-cream">
              <span className="absolute left-1/2 top-2 z-10 h-3.5 w-12 -translate-x-1/2 rounded-full bg-ink" />
              <PhoneShot src={shot.src} initial={initial} />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function BrowserGallery({
  shots,
  onOpen,
}: {
  shots: { src: string; alt: string }[];
  onOpen: (index: number) => void;
}) {
  const columns = shots.length >= 3 ? "md:grid-cols-3" : shots.length === 2 ? "md:grid-cols-2" : "";

  return (
    <ul className={`grid grid-cols-1 gap-5 ${columns}`}>
      {shots.map((shot, index) => (
        <li key={`${shot.src}-${index}`} className="min-w-0">
          <button
            type="button"
            onClick={() => onOpen(index)}
            className="w-full overflow-hidden rounded-2xl bg-white text-left shadow-xl"
            aria-label={shot.alt}
          >
            <span className="flex h-8 items-center gap-1.5 bg-ink px-3">
              <span className="h-2.5 w-2.5 rounded-full bg-pink" />
              <span className="h-2.5 w-2.5 rounded-full bg-butter" />
              <span className="h-2.5 w-2.5 rounded-full bg-sage" />
            </span>
            <span className="relative block aspect-video bg-cream">
              <Image src={shot.src} alt="" fill sizes="(max-width: 768px) 100vw, 400px" className="object-contain" />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function PortraitGallery({
  shots,
  onOpen,
}: {
  shots: { src: string; alt: string }[];
  onOpen: (index: number) => void;
}) {
  return (
    <ul className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
      {shots.map((shot, index) => (
        <li key={`${shot.src}-${index}`} className="w-full max-w-[360px] md:max-w-none">
          <button
            type="button"
            onClick={() => onOpen(index)}
            className="w-full overflow-hidden rounded-2xl bg-white text-left shadow-xl"
            aria-label={shot.alt}
          >
            <span className="relative block aspect-[4/5] bg-cream">
              <Image src={shot.src} alt="" fill sizes="(max-width: 768px) 100vw, 400px" className="object-contain" />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function PhoneShot({ src, initial }: { src: string; initial: string }) {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return (
      <span className="absolute inset-0 flex items-center justify-center font-display text-6xl text-ink/25">
        {initial}
      </span>
    );
  }
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="160px"
      className="object-contain object-top"
      onError={() => setFailed(true)}
    />
  );
}

function Lightbox({
  shots,
  frame,
  index,
  onClose,
  onIndex,
}: {
  shots: { src: string; alt: string }[];
  frame: "phone" | "browser" | "portrait";
  index: number;
  onClose: () => void;
  onIndex: (index: number) => void;
}) {
  const t = useTranslations("projects");
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const shot = shots[index];

  const previous = useCallback(() => {
    onIndex((index - 1 + shots.length) % shots.length);
  }, [index, onIndex, shots.length]);

  const next = useCallback(() => {
    onIndex((index + 1) % shots.length);
  }, [index, onIndex, shots.length]);

  const previousRef = useRef(previous);
  const nextRef = useRef(next);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    previousRef.current = previous;
    nextRef.current = next;
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key === "ArrowLeft") previousRef.current();
      if (event.key === "ArrowRight") nextRef.current();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])"),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, []);

  if (!shot) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/75 p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <h2 id={titleId} className="sr-only">
          {t("dialog")}
        </h2>
        <p className="mb-3 text-center font-display text-cream" aria-live="polite">
          {index + 1} / {shots.length}
        </p>
        <div
          className={`relative mx-auto overflow-hidden rounded-[28px] bg-cream ${
            frame === "browser"
              ? "aspect-video w-full"
              : frame === "portrait"
                ? "aspect-[4/5] max-h-[85vh] w-full max-w-xl"
                : "aspect-[9/16] max-h-[85vh] w-full max-w-md"
          }`}
        >
          <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 768px) 90vw, 800px" className="object-contain" />
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute -top-2 right-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink"
          aria-label={t("close")}
        >
          <X aria-hidden="true" />
        </button>
        {shots.length > 1 ? (
          <>
            <button
              type="button"
              onClick={previous}
              className="absolute left-0 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink"
              aria-label={t("previous")}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-0 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink"
              aria-label={t("next")}
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

function wavyFramePath(width: number, height: number) {
  const amp = 11;
  const waves = Math.max(3, Math.round(width / 96));
  const verticalWaves = Math.max(2, Math.round(height / 88));
  const points: string[] = [];
  const add = (command: string, x: number, y: number) => {
    points.push(`${command}${x.toFixed(1)} ${y.toFixed(1)}`);
  };

  const topSteps = waves * 2;
  for (let index = 0; index <= topSteps; index += 1) {
    const t = index / topSteps;
    add(index === 0 ? "M" : "L", amp + (width - amp * 2) * t, amp + Math.sin(t * Math.PI * waves) * amp);
  }

  const sideSteps = verticalWaves * 2;
  for (let index = 1; index <= sideSteps; index += 1) {
    const t = index / sideSteps;
    add("L", width - amp - Math.sin(t * Math.PI * verticalWaves) * amp, amp + (height - amp * 2) * t);
  }

  for (let index = 1; index <= topSteps; index += 1) {
    const t = index / topSteps;
    add("L", width - amp - (width - amp * 2) * t, height - amp - Math.sin(t * Math.PI * waves) * amp);
  }

  for (let index = 1; index < sideSteps; index += 1) {
    const t = index / sideSteps;
    add("L", amp + Math.sin(t * Math.PI * verticalWaves) * amp, height - amp - (height - amp * 2) * t);
  }

  points.push("Z");
  return points.join(" ");
}

function WavyFrame({ children }: { children: React.ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const next = {
        w: Math.round(entry.contentRect.width),
        h: Math.round(entry.contentRect.height),
      };
      setBox((current) => (current.w === next.w && current.h === next.h ? current : next));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="relative">
      {box.w > 0 && box.h > 0 ? (
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <path
            d={wavyFramePath(box.w, box.h)}
            fill="#FFF9F0"
            stroke="#E38AA0"
            strokeWidth="2"
            strokeDasharray="7 5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : null}
      <div className="relative px-[46px] py-[46px] lg:px-[54px] lg:py-[54px]">{children}</div>
    </div>
  );
}
