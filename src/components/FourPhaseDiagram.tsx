import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { fourPhaseByLocale } from "@/assets/four-phase";
import { useContent, useLanguage } from "@/i18n/LanguageContext";
import { useLocaleMotion } from "@/lib/useLocaleMotion";
import { scaleIn, viewportOnce } from "@/lib/motion";

export function FourPhaseDiagram() {
  const c = useContent();
  const { locale } = useLanguage();
  const { localeSwap } = useLocaleMotion();
  const reducedMotion = useReducedMotion();
  const src = fourPhaseByLocale[locale];

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="select-none"
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={locale}
          src={src}
          alt={c.ui.four_phase_alt}
          className="w-full h-auto pointer-events-none"
          loading="lazy"
          decoding="async"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          initial={reducedMotion ? { opacity: 1 } : localeSwap.initial}
          animate={localeSwap.animate}
          exit={reducedMotion ? undefined : localeSwap.exit}
          transition={localeSwap.transition}
        />
      </AnimatePresence>
    </motion.div>
  );
}
