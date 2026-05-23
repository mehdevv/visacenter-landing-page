import { useContent } from "@/i18n/LanguageContext";

export function MobileStickyCta() {
  const c = useContent();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0E2340]/95 p-3 backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
      <a
        href={c.brand.consultationLink}
        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#C8A84B] px-4 text-center text-sm font-bold leading-snug text-[#0E2340] touch-manipulation active:bg-[#b0933f]"
        data-testid="btn-sticky-consultation"
      >
        {c.brand.cta_consultation}
      </a>
    </div>
  );
}
