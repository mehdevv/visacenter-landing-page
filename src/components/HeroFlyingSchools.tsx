import { motion, useReducedMotion } from "framer-motion";
import { chineseSchoolImages, flyingSchoolPlacements } from "@/assets/chinese-schools";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocaleMotion } from "@/lib/useLocaleMotion";

export function HeroFlyingSchools() {
  const reducedMotion = useReducedMotion();
  const { locale } = useLanguage();
  const { mirrorX, horizontalSide } = useLocaleMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] hidden sm:block"
      aria-hidden
    >
      {flyingSchoolPlacements.map((item, index) => {
        const side = horizontalSide(item.side);
        return (
          <motion.img
            key={`${locale}-${index}`}
            src={item.src}
            alt=""
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className={`absolute rounded-xl object-cover shadow-lg ring-1 ring-white/15 ${item.sizeClass}`}
            style={{
              top: item.top,
              ...(side === "left" ? { left: item.inset } : { right: item.inset }),
              rotate: `${mirrorX(item.rotate)}deg`,
            }}
            initial={{ opacity: 0, scale: 0.85, x: mirrorX(20) }}
            animate={
              reducedMotion
                ? { opacity: 0.85, scale: 1, x: 0 }
                : {
                    opacity: [0.75, 0.95, 0.75],
                    scale: [1, 1.04, 1],
                    y: [0, -item.yDrift, 0],
                    x: [0, mirrorX(item.xDrift), 0],
                  }
            }
            transition={
              reducedMotion
                ? { duration: 0.45, delay: item.delay }
                : {
                    duration: item.duration,
                    delay: item.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />
        );
      })}
    </div>
  );
}

/** Compact row under hero CTA on small screens. */
export function HeroFlyingSchoolsStrip() {
  const reducedMotion = useReducedMotion();
  const { locale } = useLanguage();

  return (
    <div
      className="pointer-events-none order-9 mt-6 flex w-full items-center justify-between gap-1.5 px-0 sm:hidden"
      aria-hidden
    >
      {chineseSchoolImages.map((src, index) => (
        <motion.img
          key={`${locale}-${index}`}
          src={src}
          alt=""
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className="h-[3.75rem] w-[22%] max-w-[5.5rem] shrink-0 rounded-lg object-cover shadow-md ring-1 ring-white/15"
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={
            reducedMotion
              ? { opacity: 0.9, y: 0, scale: 1 }
              : { opacity: [0.8, 1, 0.8], y: [0, -6, 0], scale: [1, 1.03, 1] }
          }
          transition={
            reducedMotion
              ? { duration: 0.35, delay: index * 0.06 }
              : {
                  duration: 4 + index * 0.4,
                  delay: index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}
