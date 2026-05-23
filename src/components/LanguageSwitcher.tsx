import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { localeLabels, type Locale } from "@/i18n";
import { springSnappy } from "@/lib/motion";

const locales: Locale[] = ["en", "fr", "ar"];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <motion.div
      className="fixed top-3 end-3 z-50 flex items-center gap-0.5 rounded-lg border border-white/15 bg-[#0E2340]/90 p-0.5 shadow-lg backdrop-blur-sm sm:top-4 sm:end-4"
      role="group"
      aria-label="Language"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, ...springSnappy }}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`relative min-h-9 min-w-9 rounded-md px-2.5 text-xs font-bold uppercase tracking-wide touch-manipulation ${
            locale === code ? "text-[#0E2340]" : "text-slate-300 hover:text-white"
          }`}
          aria-pressed={locale === code}
          aria-label={localeLabels[code]}
        >
          {locale === code && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-md bg-[#C8A84B]"
              transition={springSnappy}
            />
          )}
          <span className="relative z-10">{localeLabels[code]}</span>
        </button>
      ))}
    </motion.div>
  );
}
