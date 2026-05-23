import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocaleMotion } from "@/lib/useLocaleMotion";

export function LocaleAnimatedPage({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();
  const { localePage } = useLocaleMotion();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={locale}
        initial={reducedMotion ? false : localePage.initial}
        animate={localePage.animate}
        exit={reducedMotion ? undefined : localePage.exit}
        transition={localePage.transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
