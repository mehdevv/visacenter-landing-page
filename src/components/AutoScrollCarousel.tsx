import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocaleMotion } from "@/lib/useLocaleMotion";
import { cn } from "@/lib/utils";

/** Shared gap between carousel slides (reels + gallery). */
export const CAROUSEL_GAP_CLASS = "gap-4 sm:gap-5";

/** Edge-to-edge on the viewport; works in both LTR and RTL pages. */
const FULL_BLEED_CLASS =
  "carousel-full-bleed w-screen max-w-[100vw] [margin-inline:calc(50%-50vw)]";

type AutoScrollCarouselProps = {
  children: ReactNode;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  speed?: number;
  loopCopies?: number;
  /** Force LTR Embla engine (Arabic enables this automatically). */
  forceLtrScroll?: boolean;
  fullBleed?: boolean;
};

function CarouselEdgeInset() {
  return (
    <div
      className="shrink-0 grow-0 basis-4 sm:basis-6 lg:basis-8"
      aria-hidden
    />
  );
}

function duplicateForInfiniteLoop(children: ReactNode, copies: number): ReactNode[] {
  const items = Children.toArray(children);
  if (items.length === 0) return items;

  return Array.from({ length: copies }, (_, copyIndex) =>
    items.map((child, itemIndex) => {
      if (!isValidElement(child)) return child;
      const el = child as ReactElement<{ key?: string | number }>;
      return cloneElement(el, {
        key: `${el.key ?? itemIndex}-loop-${copyIndex}`,
      });
    }),
  ).flat();
}

export function AutoScrollCarousel({
  children,
  className,
  viewportClassName,
  trackClassName,
  speed = 0.7,
  loopCopies = 3,
  forceLtrScroll = false,
  fullBleed = true,
}: AutoScrollCarouselProps) {
  const { locale } = useLanguage();
  const { emblaDirection } = useLocaleMotion();

  const isArabic = locale === "ar";
  const useLtrEngine = forceLtrScroll || isArabic;
  const engineDirection = useLtrEngine ? "ltr" : emblaDirection;
  const effectiveLoopCopies =
    useLtrEngine ? Math.max(loopCopies, 5) : loopCopies;

  const loopedChildren = useMemo(
    () => duplicateForInfiniteLoop(children, effectiveLoopCopies),
    [children, effectiveLoopCopies],
  );

  const plugins = useMemo(
    () => [
      AutoScroll({
        speed,
        startDelay: 300,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ],
    [speed],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: false,
      direction: engineDirection,
    },
    plugins,
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit({ direction: engineDirection, loop: true });
  }, [emblaApi, loopedChildren.length, engineDirection, locale]);

  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins()?.autoScroll;
    if (!autoScroll) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoScroll.stop();
      return;
    }

    autoScroll.play();

    const root = emblaApi.rootNode();
    const resume = () => autoScroll.play();
    root.addEventListener("mouseleave", resume);
    root.addEventListener("pointerup", resume);

    return () => {
      root.removeEventListener("mouseleave", resume);
      root.removeEventListener("pointerup", resume);
    };
  }, [emblaApi, locale, engineDirection, loopedChildren.length]);

  return (
    <div
      className={cn(fullBleed && FULL_BLEED_CLASS, className)}
      dir={useLtrEngine ? "ltr" : undefined}
    >
      <div
        ref={emblaRef}
        className={cn(
          "overflow-hidden touch-pan-x cursor-grab active:cursor-grabbing",
          viewportClassName,
        )}
      >
        <div
          className={cn(
            "flex items-stretch",
            CAROUSEL_GAP_CLASS,
            trackClassName,
          )}
        >
          <CarouselEdgeInset />
          {loopedChildren}
          <CarouselEdgeInset />
        </div>
      </div>
    </div>
  );
}

export function CarouselSlide({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 shrink-0 grow-0", className)}>{children}</div>
  );
}
