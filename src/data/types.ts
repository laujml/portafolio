export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export type Localized = Record<Locale, string>;

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "es";
}

export type ProjectScreenshot = {
  src: string;
  alt: Localized;
};

export type ProjectVideo = {
  src: string;
  poster: string;
};

export type ProjectCategoryId =
  | "backend"
  | "frontend"
  | "fullstack"
  | "mobile"
  | "cybersecurity"
  | "hackathon"
  | "unconfirmed";

export type Project = {
  slug: string;
  title: string;
  heading?: Localized;
  tagline: Localized;
  categoryId: ProjectCategoryId;
  category: Localized;
  year: number;
  status?: "inProgress";
  date: Localized;
  tech: string[];
  thumbnail: string;
  thumbnailAlt: Localized;
  video?: ProjectVideo;
  screenshots: ProjectScreenshot[];
  frame?: "phone" | "browser" | "portrait";
  carousel?: boolean;
  galleryIncludesHero?: boolean;
  demo?: string;
  github?: string;
  apk?: string;
  about: Record<Locale, string[]>;
  features: Record<Locale, string[]>;
};
