import type { Locale } from "@/i18n/types";
import fourPhaseAr from "../ar.png";
import fourPhaseEn from "../en.png";
import fourPhaseFr from "../fr.png";

export const fourPhaseByLocale: Record<Locale, string> = {
  en: fourPhaseEn,
  fr: fourPhaseFr,
  ar: fourPhaseAr,
};
