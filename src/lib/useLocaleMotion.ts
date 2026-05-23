import { useMemo } from "react";
import type { Transition, Variants } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { easeSmooth } from "@/lib/motion";

export function useLocaleMotion() {
  const { locale } = useLanguage();
  const isRtl = locale === "ar";

  return useMemo(() => {
    const transition: Transition = {
      ...easeSmooth,
      duration: isRtl ? 0.55 : 0.45,
    };

    const localePage = {
      initial: { opacity: 0, x: isRtl ? 36 : -36, y: 10 },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: isRtl ? -28 : 28, y: -6 },
      transition,
    };

    const localeSwap = {
      initial: { opacity: 0, x: isRtl ? 24 : -24, scale: 0.98 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: isRtl ? -20 : 20, scale: 0.98 },
      transition: { ...transition, duration: isRtl ? 0.5 : 0.35 },
    };

    const fadeUp: Variants = {
      hidden: { opacity: 0, y: 24, x: isRtl ? 14 : -14 },
      visible: { opacity: 1, y: 0, x: 0, transition },
    };

    const staggerItem: Variants = {
      hidden: { opacity: 0, y: 16, x: isRtl ? 10 : -10 },
      visible: { opacity: 1, y: 0, x: 0, transition },
    };

    const underlineOrigin = isRtl ? "origin-right" : "origin-center";

    const mirrorX = (value: number) => (isRtl ? -value : value);

    const horizontalSide = (side: "left" | "right") =>
      isRtl ? (side === "left" ? "right" : "left") : side;

    return {
      locale,
      isRtl,
      transition,
      localePage,
      localeSwap,
      fadeUp,
      staggerItem,
      underlineOrigin,
      mirrorX,
      horizontalSide,
      emblaDirection: (isRtl ? "rtl" : "ltr") as "rtl" | "ltr",
    };
  }, [isRtl, locale]);
}
