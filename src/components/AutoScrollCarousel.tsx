import { useEffect, useMemo, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "@/lib/utils";

type AutoScrollCarouselProps = {
  children: ReactNode;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  speed?: number;
};

export function AutoScrollCarousel({
  children,
  className,
  viewportClassName,
  trackClassName,
  speed = 0.7,
}: AutoScrollCarouselProps) {
  const plugins = useMemo(
    () => [
      AutoScroll({
        speed,
        startDelay: 400,
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
      containScroll: "trimSnaps",
    },
    plugins,
  );

  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins()?.autoScroll;
    if (!autoScroll) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoScroll.stop();
    }
  }, [emblaApi]);

  return (
    <div className={cn("relative -mx-3 sm:-mx-6 lg:-mx-8", className)}>
      <div
        ref={emblaRef}
        className={cn(
          "overflow-hidden touch-pan-y cursor-grab px-3 active:cursor-grabbing sm:px-6 lg:px-8",
          viewportClassName,
        )}
      >
        <div className={cn("flex", trackClassName)}>{children}</div>
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
    <div className={cn("min-w-0 shrink-0 grow-0 pl-4 sm:pl-5", className)}>{children}</div>
  );
}
