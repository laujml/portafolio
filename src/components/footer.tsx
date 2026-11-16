import { Flower } from "@/components/decor";
import { FooterWave } from "@/components/wave-divider";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative z-10 bg-sage text-ink">
      <FooterWave />
      <div className="flex flex-col items-center px-6 py-8">
        <p className="flex items-center justify-center gap-3 text-center font-display text-2xl">
          <Flower className="h-8 w-8" />
          {t("credit")}
        </p>
      </div>
    </footer>
  );
}
