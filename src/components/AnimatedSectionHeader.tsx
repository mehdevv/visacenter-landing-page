import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocaleMotion } from "@/lib/useLocaleMotion";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function AnimatedSectionHeader({
  title,
  accentClass,
  as = "h2",
  className = "",
}: {
  title: string;
  accentClass: string;
  as?: "h2" | "h3";
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { locale } = useLanguage();
  const { fadeUp, underlineOrigin } = useLocaleMotion();
  const Tag = as;

  const underlineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.div
      key={`${locale}-${title}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className={cn("text-center", className)}
    >
      <motion.div variants={reduced ? undefined : fadeUp}>
        <Tag
          className={
            as === "h3"
              ? "text-lg sm:text-xl md:text-2xl font-bold text-balance px-2"
              : "text-[clamp(1.375rem,5.5vw,1.75rem)] leading-tight sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance max-w-[min(100%,20rem)] sm:max-w-none mx-auto px-2"
          }
        >
          {title}
        </Tag>
      </motion.div>
      <motion.div
        variants={reduced ? undefined : underlineVariants}
        className={cn(
          as === "h3" ? "w-16 sm:w-20 h-1 mt-3" : "w-20 sm:w-24 h-1.5 mb-0",
          accentClass,
          "mx-auto rounded-full",
          underlineOrigin,
        )}
      />
    </motion.div>
  );
}
