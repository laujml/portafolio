"use client";

import { profile } from "@/data/profile";
import { socials, type SocialId } from "@/data/socials";
import { isHttpUrl } from "@/lib/site";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const icons: Record<SocialId, typeof FaGithub> = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  x: FaXTwitter,
};

export function ContactLinks({ showSocials = true }: { showSocials?: boolean }) {
  const t = useTranslations("contact");
  const a11y = useTranslations("a11y");

  return (
    <div className="flex flex-col items-center gap-4">
      {showSocials ? (
      <ul className="flex flex-wrap items-center justify-center gap-3" aria-label={a11y("social")}>
        {socials.map((item) => {
          const Icon = icons[item.id];
          const className =
            "inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-sm";
          if (!isHttpUrl(item.href)) return null;
          return (
            <li key={item.id}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className={className}
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </a>
            </li>
          );
        })}
      </ul>
      ) : null}
      <a
        href={`mailto:${profile.email}`}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 py-2 font-display text-lg text-cream"
      >
        <Mail aria-hidden="true" className="h-5 w-5" />
        {t("write")}
      </a>
    </div>
  );
}
