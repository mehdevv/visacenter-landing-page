import { motion, useReducedMotion } from "framer-motion";
import { chineseSchoolImages, flyingSchoolPlacements } from "@/assets/chinese-schools";

export function HeroFlyingSchools() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] hidden sm:block"
      aria-hidden
    >
      {flyingSchoolPlacements.map((item, index) => (
        <motion.img
          key={index}
          src={item.src}
          alt=""
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className={`absolute rounded-xl object-cover shadow-lg ring-1 ring-white/15 ${item.sizeClass}`}
          style={{
            top: item.top,
            ...(item.side === "left" ? { left: item.inset } : { right: item.inset }),
            rotate: `${item.rotate}deg`,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            reducedMotion
              ? { opacity: 0.85, scale: 1 }
              : {
                  opacity: [0.75, 0.95, 0.75],
                  scale: [1, 1.04, 1],
                  y: [0, -item.yDrift, 0],
                  x: [0, item.xDrift, 0],
                }
          }
          transition={
            reducedMotion
              ? { duration: 0.4, delay: item.delay }
              : {
                  duration: item.duration,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}

/** Compact row under hero CTA on small screens. */
export function HeroFlyingSchoolsStrip() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none mt-8 flex w-full items-center justify-between gap-2 px-1 sm:hidden"
      aria-hidden
    >
      {chineseSchoolImages.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          alt=""
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className="h-24 w-[22%] max-w-[7.5rem] shrink-0 rounded-xl object-cover shadow-md ring-1 ring-white/15"
          initial={{ opacity: 0, y: 10 }}
          animate={
            reducedMotion
              ? { opacity: 0.9, y: 0 }
              : { opacity: [0.8, 1, 0.8], y: [0, -6, 0] }
          }
          transition={
            reducedMotion
              ? { duration: 0.3, delay: index * 0.05 }
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
