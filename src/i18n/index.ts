import type { Locale, SiteContent } from "./types";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";

const locales: Record<Locale, SiteContent> = { en, fr, ar };

export function getContent(locale: Locale): SiteContent {
  return locales[locale];
}

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "AR",
};

export type { Locale, SiteContent };
