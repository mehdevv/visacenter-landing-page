import { motion, useReducedMotion } from "framer-motion";
import { sectionTitle, staggerContainer, underlineGrow, viewportOnce } from "@/lib/motion";

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
  const Tag = as;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
      className={`text-center ${className}`}
    >
      <motion.div variants={reduced ? undefined : sectionTitle}>
        <Tag
          className={
            as === "h3"
              ? "text-lg sm:text-xl md:text-2xl font-bold text-balance px-1"
              : "text-2xl leading-tight sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance max-w-[22rem] sm:max-w-none mx-auto px-1"
          }
        >
          {title}
        </Tag>
      </motion.div>
      <motion.div
        variants={reduced ? undefined : underlineGrow}
        className={`${as === "h3" ? "w-16 sm:w-20 h-1 mt-3" : "w-20 sm:w-24 h-1.5 mb-0"} ${accentClass} mx-auto rounded-full origin-center`}
      />
    </motion.div>
  );
}
