import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";

const catalogs = {
  en: () => import("../messages/en.json"),
  es: () => import("../messages/es.json"),
} as const;

async function readRootLocale() {
  try {
    const rootParams = (await import("next/root-params")) as {
      locale?: () => Promise<string | undefined>;
    };
    if (typeof rootParams.locale !== "function") return undefined;
    return await rootParams.locale();
  } catch {
    return undefined;
  }
}

export default getRequestConfig(async ({ locale }) => {
  const candidate = locale ?? (await readRootLocale());

  if (!candidate || !hasLocale(routing.locales, candidate)) {
    notFound();
  }

  return {
    locale: candidate,
    messages: (await catalogs[candidate]()).default,
  };
});
