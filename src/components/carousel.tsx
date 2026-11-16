"use client";

import { Reveal } from "@/components/reveal";
import { usePrefersReducedMotion } from "@/lib/motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export const carouselCardClass =
  "w-full shrink-0 snap-start md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]";

export function Carousel({
  title,
  label,
  previousLabel,
  nextLabel,
  count,
  children,
}: {
  title: ReactNode;
  label: string;
  previousLabel: string;
  nextLabel: string;
  count: number;
  children: ReactNode;
}) {
  const reduce = usePrefersReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollerId = useId();
  const [edges, setEdges] = useState({ start: true, end: false });
  const showArrows = count > 4;

  const syncEdges = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  };

  const move = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;
    const gap = Number.parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const step = card.getBoundingClientRect().width + gap;
    el.scrollBy({ left: direction * step, behavior: reduce ? "auto" : "smooth" });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  };

  return (
    <div onKeyDown={onKeyDown}>
      <Reveal>
        <div className="flex items-center justify-between gap-4">
          {title}
          {showArrows ? (
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm disabled:opacity-40"
                aria-label={previousLabel}
                aria-controls={scrollerId}
                disabled={edges.start}
                onClick={() => move(-1)}
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm disabled:opacity-40"
                aria-label={nextLabel}
                aria-controls={scrollerId}
                disabled={edges.end}
                onClick={() => move(1)}
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </Reveal>
      <div
        id={scrollerId}
        ref={scrollerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onScroll={syncEdges}
        className={`mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-3 py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          reduce ? "scroll-auto" : "scroll-smooth"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
