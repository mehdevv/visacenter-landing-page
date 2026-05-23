import type { Transition, Variants } from "framer-motion";

export const viewportOnce = { once: true, margin: "-60px" as const };

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 28,
};

export const easeSmooth: Transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: easeSmooth },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: easeSmooth },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: easeSmooth },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: easeSmooth },
};

export const sectionTitle: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: easeSmooth },
};

export const underlineGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Instant variants when user prefers reduced motion */
export function withReducedMotion(variants: Variants, reduced: boolean | null): Variants {
  if (!reduced) return variants;
  const instant = { opacity: 1, x: 0, y: 0, scale: 1 };
  return {
    hidden: instant,
    visible: { ...instant, transition: { duration: 0 } },
  };
}
