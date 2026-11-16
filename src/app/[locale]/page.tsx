import { About } from "@/components/about";
import { Events } from "@/components/events";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/tech-stack";
import { Writing } from "@/components/writing";
import { WaveDivider } from "@/components/wave-divider";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/en",
      },
    },
    openGraph: {
      url: `/${locale}`,
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function HomePage({ params }: HomeProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <main id="content">
      <Hero />
      <WaveDivider from="cream" to="pink" />
      <About />
      <WaveDivider from="pink" to="sky" />
      <TechStack />
      <WaveDivider from="sky" to="cream" />
      <Projects />
      <WaveDivider from="cream" to="sage" />
      <Events />
      <WaveDivider from="sage" to="blush" />
      <Writing />
    </main>
  );
}
