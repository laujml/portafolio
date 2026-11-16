import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified,
      alternates: {
        languages: {
          en: `${siteUrl}/en`,
          es: `${siteUrl}/es`,
        },
      },
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/${locale}/projects/${project.slug}`,
      lastModified,
      alternates: {
        languages: {
          en: `${siteUrl}/en/projects/${project.slug}`,
          es: `${siteUrl}/es/projects/${project.slug}`,
        },
      },
    })),
  ]);
}
