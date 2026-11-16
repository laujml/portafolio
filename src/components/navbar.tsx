"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";

const sections = ["about", "stack", "projects", "events", "writing"] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const a11y = useTranslations("a11y");
  const pathname = usePathname();
  const locale = useLocale();
  const routeKey = `${locale}${pathname}`;
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === routeKey;
  const [active, setActive] = useState<string>("");
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") return;
    const mark = () => {
      const line = Math.min(window.innerHeight * 0.35, 280);
      let current = "";
      for (const id of sections) {
        const node = document.getElementById(id);
        if (!node) continue;
        const rect = node.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) current = id;
      }
      setActive(current);
    };
    mark();
    window.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("hashchange", mark);
    return () => {
      window.removeEventListener("scroll", mark);
      window.removeEventListener("hashchange", mark);
    };
  }, [pathname]);

  const linkClass = (id: string) =>
    `rounded-full px-3 py-2 font-display text-lg transition-colors hover:bg-blush ${
      active === id ? "bg-blush" : ""
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-pink/50 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 md:h-[4.5rem]">
        <div className="justify-self-start">
          <LanguageSwitch />
        </div>

        <nav className="hidden items-center justify-self-center gap-1 md:flex" aria-label={t("primary")}>
          {sections.map((id) =>
            pathname === "/" ? (
              <a key={id} href={`#${id}`} className={linkClass(id)} onClick={() => setActive(id)}>
                {t(id)}
              </a>
            ) : (
              <Link key={id} href={`/#${id}`} className={linkClass(id)}>
                {t(id)}
              </Link>
            ),
          )}
        </nav>

        <div className="justify-self-end">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blush text-ink md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpenOn((value) => (value === routeKey ? null : routeKey))}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">{open ? t("close") : t("open")}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav id={menuId} className="border-t border-pink/40 bg-cream px-5 py-4 md:hidden" aria-label={t("primary")}>
          <ul className="flex flex-col gap-1">
            {sections.map((id) => (
              <li key={id}>
                {pathname === "/" ? (
                  <a href={`#${id}`} className="block rounded-2xl px-3 py-3 font-display text-2xl" onClick={() => setOpenOn(null)}>
                    {t(id)}
                  </a>
                ) : (
                  <Link href={`/#${id}`} className="block rounded-2xl px-3 py-3 font-display text-2xl" onClick={() => setOpenOn(null)}>
                    {t(id)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <p className="sr-only">{a11y("language")}</p>
        </nav>
      ) : null}
    </header>
  );
}

function LanguageSwitch() {
  const t = useTranslations("a11y");
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav aria-label={t("language")} className="font-display text-lg">
      <Link
        href={pathname}
        locale="es"
        hrefLang="es"
        aria-current={locale === "es" ? "page" : undefined}
        className={`rounded-full px-2 py-2 ${locale === "es" ? "font-bold underline decoration-pink-deep decoration-2 underline-offset-4" : ""}`}
      >
        ES
      </Link>
      <span aria-hidden="true" className="px-1 text-ink-soft">
        |
      </span>
      <Link
        href={pathname}
        locale="en"
        hrefLang="en"
        aria-current={locale === "en" ? "page" : undefined}
        className={`rounded-full px-2 py-2 ${locale === "en" ? "font-bold underline decoration-pink-deep decoration-2 underline-offset-4" : ""}`}
      >
        EN
      </Link>
    </nav>
  );
}
