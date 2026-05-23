import { AnimatePresence, motion } from "framer-motion";
import { fourPhaseByLocale } from "@/assets/four-phase";
import { useContent, useLanguage } from "@/i18n/LanguageContext";
import { scaleIn, viewportOnce } from "@/lib/motion";

export function FourPhaseDiagram() {
  const c = useContent();
  const { locale } = useLanguage();
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </AnimatePresence>
    </motion.div>
  );
}
