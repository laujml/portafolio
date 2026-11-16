import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PageTransition } from "@/components/page-transition";
import { SparkleTrail } from "@/components/sparkle-trail";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Fredoka, Nunito } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import "../globals.css";

const fredoka = Fredoka({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
  display: "swap",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  themeColor: "#FFF9F0",
  colorScheme: "light",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("title"),
      template: "%s | Lau",
    },
    description: t("description"),
    applicationName: "Lau",
    authors: [{ name: "Laura Angel" }],
    openGraph: {
      type: "website",
      siteName: "Lau",
      title: t("title"),
      description: t("description"),
      locale: locale === "es" ? "es_SV" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_SV"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "a11y" });

  return (
    <html lang={locale} className={`${fredoka.variable} ${nunito.variable} h-full`}>
      <body className="min-h-full bg-cream font-sans text-ink antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
          >
            {t("skip")}
          </a>
          <SparkleTrail />
          <Suspense fallback={<div className="h-16 md:h-[4.5rem]" />}>
            <Navbar />
          </Suspense>
          <Suspense fallback={children}>
            <PageTransition>{children}</PageTransition>
          </Suspense>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
