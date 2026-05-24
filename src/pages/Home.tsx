import { motion, useReducedMotion } from "framer-motion";
import {
  Play,
  ShieldCheck,
  PlayCircle,
} from "lucide-react";
import { AnimatedSectionHeader } from "@/components/AnimatedSectionHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AutoScrollCarousel, CarouselSlide } from "@/components/AutoScrollCarousel";
import { FourPhaseDiagram } from "@/components/FourPhaseDiagram";
import { HeroFlyingSchools, HeroFlyingSchoolsStrip } from "@/components/HeroFlyingSchools";
import { useContent, useLanguage } from "@/i18n/LanguageContext";
import {
  fadeUp,
  springSnappy,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";
import { useLocaleMotion } from "@/lib/useLocaleMotion";
import { galleryPhotos } from "@/assets/gallery";
function videoCaption(label: string, duration?: string) {
  return duration ? `${label} · ${duration}` : label;
}

function ConsultationButton({
  variant = "onDark",
  className = "",
  testId = "btn-consultation",
}: {
  variant?: "onDark" | "onLight";
  className?: string;
  testId?: string;
}) {
  const c = useContent();
  const variantClass =
    variant === "onDark"
      ? "border border-[#0E2340]/15 bg-[#C8A84B] text-[#0E2340] hover:bg-[#b0933f]"
      : "bg-[#2B7EC1] hover:bg-[#1a5d91] text-white";

  return (
    <motion.div
      className="w-full sm:w-auto"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={springSnappy}
    >
      <Button
        size="lg"
        className={`w-full sm:w-auto min-h-12 touch-manipulation font-bold text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 rounded-lg shadow-none ${variantClass} ${className}`}
        data-testid={testId}
        asChild
      >
        <a href={c.brand.consultationLink}>{c.brand.cta_consultation}</a>
      </Button>
    </motion.div>
  );
}

function SectionConsultationCta({
  variant,
  className = "",
  testId,
}: {
  variant: "onDark" | "onLight";
  className?: string;
  testId?: string;
}) {
  return (
    <motion.div
      className={`flex justify-center ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <ConsultationButton variant={variant} testId={testId} />
    </motion.div>
  );
}

function HeroTitle({ headline, highlight }: { headline: string; highlight: string }) {
  if (!highlight) {
    return <span className="whitespace-pre-line">{headline}</span>;
  }
  const idx = headline.indexOf(highlight);
  if (idx === -1) return <span className="whitespace-pre-line">{headline}</span>;
  return (
    <span className="whitespace-pre-line">
      {headline.slice(0, idx)}
      <span className="text-emerald-400">{highlight}</span>
      {headline.slice(idx + highlight.length)}
    </span>
  );
}

const VideoEmbed = ({
  label,
  watchLabel,
  aspect = "aspect-video",
}: {
  label: string;
  watchLabel: string;
  aspect?: string;
}) => (
  <motion.div
    className={`relative w-full max-w-full bg-slate-900 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-slate-800 ${aspect} group cursor-pointer flex items-center justify-center touch-manipulation`}
    whileHover={{ scale: 1.015, y: -4 }}
    whileTap={{ scale: 0.99 }}
    transition={springSnappy}
  >
    <motion.div
      className="absolute top-2 end-2 z-10 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:top-4 sm:end-4 rounded-full uppercase tracking-wider"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, ...springSnappy }}
    >
      {watchLabel}
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0" />

    <motion.div
      className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[3px] sm:border-4 border-[#C8A84B] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      whileHover={{ scale: 1.12, backgroundColor: "rgba(200, 168, 75, 0.2)" }}
      whileTap={{ scale: 1.05 }}
      transition={springSnappy}
    >
      <Play
        className="size-6 sm:size-8 shrink-0 text-[#C8A84B] translate-x-[1px] sm:translate-x-[2px]"
        fill="currentColor"
        aria-hidden
      />
    </motion.div>

    <div className="absolute bottom-3 inset-x-3 z-10 sm:bottom-4 sm:inset-x-4">
      <p className="text-white font-medium text-xs leading-snug sm:text-sm md:text-base line-clamp-2 text-center sm:text-start [overflow-wrap:anywhere]">
        {label}
      </p>
    </div>
  </motion.div>
);

const heroLogoUrl = `${import.meta.env.BASE_URL}LOGO.png`;
const flagsUrl = `${import.meta.env.BASE_URL}FLAGS.png`;

const UNIVERSITY_LOGO_FILE = {
  "Beijing University": "Peking_University_seal.svg.png",
  "Shanghai Jiao Tong": "Sjtu-logo-standard-red.png",
  "Zhejiang University": "Zhejiang_University_Logo.svg.png",
  "Wuhan University": "Wuhan_University_Logo.png",
  "Fudan University": "Fudan_University_Logo.svg.png",
} as const satisfies Record<string, string>;

function UniversityPartnerLogos() {
  const c = useContent();
  const base = import.meta.env.BASE_URL;
  const entries = c.university_partners.universities.map((name) => ({
    name,
    src: `${base}${UNIVERSITY_LOGO_FILE[name as keyof typeof UNIVERSITY_LOGO_FILE]}`,
  }));

  const imgClass =
    "max-h-[3rem] w-auto max-w-[min(7.5rem,30vw)] object-contain opacity-80 grayscale transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-[3.5rem] md:max-w-[9rem]";

  const logoCardClass =
    "group flex h-[3.25rem] min-w-[5.5rem] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-none md:h-16 md:min-w-[6.5rem] md:px-3 md:py-2";

  const extraBadge = (
    <div className="flex h-[3.25rem] shrink-0 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 shadow-none md:h-16 md:px-4">
      <span className="text-[11px] font-black uppercase tracking-wide text-[#0E2340]/85 md:text-xs">
        {c.ui.more_universities.replace("{count}", String(c.university_partners.extra_count))}
      </span>
    </div>
  );

  const LogoStrip = ({ stripKey }: { stripKey: string }) => (
    <div className="flex shrink-0 items-center gap-6 md:gap-10">
      {entries.map((entry) => (
        <div key={`${stripKey}-${entry.name}`} className={logoCardClass}>
          <img src={entry.src} alt={`${entry.name} logo`} className={imgClass} loading="lazy" decoding="async" />
        </div>
      ))}
      {extraBadge}
    </div>
  );

  return (
    <div className="w-full">
      {/* LTR track so the CSS marquee loops correctly on Arabic (RTL) pages */}
      <div
        className="carousel-full-bleed relative overflow-hidden md:hidden"
        dir="ltr"
      >
        <div className="uni-logo-marquee-track gap-6">
          <LogoStrip stripKey="m1" />
          <LogoStrip stripKey="m2" />
        </div>
      </div>

      <div className="hidden md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-8 md:gap-y-6">
        <LogoStrip stripKey="d" />
      </div>
    </div>
  );
}

export default function Home() {
  const c = useContent();
  const { locale } = useLanguage();
  const { staggerItem, localeSwap } = useLocaleMotion();
  const reducedMotion = useReducedMotion();
  const faqVideoPills = c.faq.items.filter((item) => item.video != null);

  return (
    <div className="min-h-[100dvh] min-h-screen overflow-x-hidden bg-[#0E2340] text-white antialiased selection:bg-[#C8A84B] selection:text-[#0E2340] pb-sticky-cta">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-14 pb-10 sm:pt-3 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <HeroFlyingSchools />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[min(500px,120vw)] sm:h-[500px] bg-[#2B7EC1]/20 blur-[120px] rounded-full pointer-events-none z-0"
          animate={reducedMotion ? undefined : { opacity: [0.35, 0.55, 0.35], scale: [1, 1.06, 1] }}
          transition={reducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.img
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src={heroLogoUrl}
            alt={c.brand.name}
            className="order-1 block h-auto w-auto max-h-[min(7.5rem,20vh)] sm:max-h-32 md:max-h-40 max-w-[min(100%,16rem)] sm:max-w-[min(100%,20rem)] object-contain object-center -my-3 sm:-my-7 mb-2 sm:mb-3 drop-shadow-2xl"
          />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            transition={{ delay: 0.12 }}
            className="order-2 flex w-full max-w-md flex-col items-stretch gap-2 text-sm leading-snug sm:order-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-3 sm:text-sm text-slate-300 font-medium mx-auto mb-3 sm:mb-6"
          >
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-2.5 justify-center rounded-full bg-white/5 px-3.5 py-2.5 text-white sm:bg-transparent sm:px-0 sm:py-0"
            >
              <span className="text-emerald-400 font-bold shrink-0">{c.hero.students_served_highlight}</span>
              <span className="text-center sm:text-start">{c.hero.students_served_rest}</span>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-2.5 justify-center rounded-full bg-white/5 px-3.5 py-2.5 text-white sm:bg-transparent sm:px-0 sm:py-0"
            >
              <span className="text-emerald-400 font-bold shrink-0">{c.hero.experience_highlight}</span>
              <span className="text-center sm:text-start">{c.hero.experience_rest}</span>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-2.5 justify-center rounded-full bg-white/5 px-3.5 py-2.5 sm:bg-transparent sm:px-0 sm:py-0"
            >
              <img
                src={flagsUrl}
                alt={c.ui.flags_alt}
                className="h-6 w-auto max-w-[10rem] shrink-0 object-contain sm:h-8 sm:max-w-[13rem]"
                loading="lazy"
                decoding="async"
              />
              <span className="text-center sm:text-start [overflow-wrap:anywhere]">{c.hero.trust_badges[0]}</span>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-2.5 justify-center rounded-full bg-white/5 px-3.5 py-2.5 text-white sm:bg-transparent sm:px-0 sm:py-0"
            >
              <ShieldCheck className="w-4 h-4 text-[#1A6B8A] shrink-0" />
              <span className="text-center sm:text-start">{c.hero.trust_badges[1]}</span>
            </motion.div>
          </motion.div>

          <motion.h1
            key={`headline-${locale}`}
            initial={reducedMotion ? false : localeSwap.initial}
            animate={localeSwap.animate}
            transition={{ ...localeSwap.transition, delay: 0.12 }}
            className="order-3 text-[clamp(1.125rem,4.5vw+0.5rem,1.625rem)] sm:order-4 sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug sm:leading-tight mb-3 sm:mb-6 px-1 text-balance max-w-[min(100%,26rem)] sm:max-w-2xl mx-auto"
          >
            <HeroTitle headline={c.hero.headline} highlight={c.hero.headlineHighlight} />
          </motion.h1>

          <motion.p
            key={`subheadline-${locale}`}
            initial={reducedMotion ? false : localeSwap.initial}
            animate={localeSwap.animate}
            transition={{ ...localeSwap.transition, delay: 0.18 }}
            className="order-4 text-sm leading-relaxed sm:order-5 sm:text-sm md:text-base text-slate-300 max-w-[min(100%,22rem)] sm:max-w-md md:max-w-lg mx-auto mb-4 sm:mb-8 md:mb-10 px-1 text-balance"
          >
            {c.hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            className="order-5 z-10 flex w-full max-w-md justify-center mx-auto mb-4 sm:order-7 sm:mt-6 sm:mb-0"
          >
            <ConsultationButton
              variant="onDark"
              testId="btn-hero-consultation"
              className="w-full max-w-md min-h-[3.25rem] text-[0.9375rem] sm:min-h-12"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5 }}
            className="order-6 w-full max-w-7xl mb-4 sm:order-2 sm:mb-6"
          >
            <p className="text-center text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">
              {c.university_partners.label}
            </p>
            <UniversityPartnerLogos />
          </motion.div>

          <motion.div
            id="vsl-hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="order-7 mt-5 w-full max-w-3xl scroll-mt-24 sm:order-6 sm:mt-0 sm:mb-0"
          >
            <VideoEmbed
              label={videoCaption(c.hero.video.label, c.hero.video.duration)}
              watchLabel={c.ui.watch}
            />
          </motion.div>

          <HeroFlyingSchoolsStrip />
        </div>
      </section>

      {/* 2. THE 4-PHASE SYSTEM */}
      <section className="py-12 sm:py-20 md:py-24 bg-white text-[#0E2340]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSectionHeader
            title={c.process.section_title}
            accentClass="bg-[#C8A84B]"
            className="mb-10 sm:mb-16"
          />

          <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12 mb-10 sm:mb-16">
            <FourPhaseDiagram />

            <motion.div
              id="vsl-process"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="scroll-mt-24"
            >
              <VideoEmbed
                label={videoCaption(c.process.video.label, c.process.video.duration)}
                watchLabel={c.ui.watch}
              />
            </motion.div>
          </div>
          <SectionConsultationCta variant="onLight" className="mt-10 sm:mt-12" testId="btn-process-consultation" />
        </div>
      </section>

      {/* 3. STUDENT RESULTS */}
      <section
        id="vsl-testimonials"
        className="py-12 sm:py-20 md:py-24 bg-[#F7F8FA] text-[#0E2340] overflow-hidden scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSectionHeader
            title={c.testimonials.section_title}
            accentClass="bg-[#1A6B8A]"
            className="mb-10 sm:mb-16"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12"
        >
          <AutoScrollCarousel speed={0.55}>
            {c.testimonials.items.map((testimonial) => (
              <CarouselSlide
                key={testimonial.name}
                className="flex-[0_0_min(88vw,18.75rem)] sm:flex-[0_0_300px]"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={springSnappy}
                  className="h-full"
                >
                  <Card className="h-full border-none shadow-lg">
                    <CardContent
                      className="p-4 sm:p-6"
                      dir={locale === "ar" ? "rtl" : "ltr"}
                    >
                      <div className="mx-auto mb-4 w-full max-w-[10.5rem] sm:max-w-none">
                        <VideoEmbed
                          label={testimonial.video.label}
                          watchLabel={c.ui.watch}
                          aspect="aspect-[9/16] max-h-[min(48vh,17.5rem)] sm:max-h-none"
                        />
                      </div>
                      <p className="text-slate-700 italic mb-4 font-medium text-[0.9375rem] sm:text-base leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <h4 className="font-bold text-[#0E2340] text-base sm:text-lg">{testimonial.name}</h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-snug">
                          {testimonial.role}, {testimonial.university}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselSlide>
            ))}
          </AutoScrollCarousel>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSectionHeader
            title={c.gallery.section_title}
            accentClass="bg-[#1A6B8A]"
            as="h3"
            className="mb-6 sm:mb-8"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <AutoScrollCarousel speed={0.45}>
            {c.gallery.images.map((image, index) => (
              <CarouselSlide
                key={`${image.alt}-${index}`}
                className="flex-[0_0_min(88vw,18.75rem)] sm:flex-[0_0_300px]"
              >
                <motion.div
                  className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
                  whileHover={{ scale: 1.03 }}
                  transition={springSnappy}
                >
                  <motion.img
                    src={galleryPhotos[index] ?? galleryPhotos[0]}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </CarouselSlide>
            ))}
          </AutoScrollCarousel>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionConsultationCta variant="onLight" className="mt-10 sm:mt-12" testId="btn-testimonials-consultation" />
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-12 sm:py-20 md:py-24 bg-white text-[#0E2340]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSectionHeader
            title={c.faq.section_title}
            accentClass="bg-[#2B7EC1]"
            className="mb-8 sm:mb-10"
          />
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 sm:mb-6">
            {c.university_partners.label}
          </p>
          <UniversityPartnerLogos />
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
          <Accordion type="single" collapsible className="w-full mb-8 sm:mb-12">
            {c.faq.items.map((faq, i) => (
              <motion.div key={faq.question} variants={staggerItem}>
              <AccordionItem value={`item-${i}`} className="border-b border-slate-200">
                <AccordionTrigger className="text-start font-bold text-[0.9375rem] sm:text-lg hover:text-[#2B7EC1] py-4 min-h-[3.25rem] sm:min-h-0 sm:py-4 leading-snug text-balance touch-manipulation [&>svg]:size-5">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-[0.9375rem] sm:text-base leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {faqVideoPills.map((item) => {
              const v = item.video!;
              const pillLabel = v.duration ? `${v.label} · ${v.duration}` : v.label;
              const href = v.anchor ? `#${v.anchor}` : "#";
              return (
              <motion.a
                key={item.question}
                href={href}
                variants={staggerItem}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springSnappy}
                className="bg-slate-900 rounded-xl p-4 sm:p-3 min-h-12 sm:min-h-0 flex items-center justify-between gap-3 text-white text-sm sm:text-xs font-semibold no-underline touch-manipulation active:bg-slate-800 hover:bg-slate-800"
              >
                <span className="leading-snug">{pillLabel}</span>
                <PlayCircle className="w-4 h-4 text-[#C8A84B] shrink-0" />
              </motion.a>
              );
            })}
          </motion.div>
          <SectionConsultationCta variant="onLight" className="mt-10 sm:mt-12" testId="btn-faq-consultation" />
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section id="book" className="py-16 sm:py-28 md:py-32 bg-[#0E2340] text-center px-4 sm:px-4 overflow-hidden scroll-mt-20">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.h2
            variants={staggerItem}
            className="text-[clamp(1.5rem,6vw,1.875rem)] leading-tight sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 text-balance px-1"
          >
            {c.final_cta.section_title}
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-base sm:text-xl text-slate-300 mb-8 sm:mb-12 leading-relaxed px-1 max-w-md mx-auto"
          >
            {c.final_cta.description}
          </motion.p>

          <motion.div variants={staggerItem} className="flex justify-center mb-8 sm:mb-10">
            <ConsultationButton
              variant="onDark"
              testId="btn-final-consultation"
              className="min-h-14 h-14 sm:h-16 rounded-xl w-full sm:w-auto max-w-md"
            />
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide leading-relaxed max-w-md sm:max-w-none mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-2"
          >
            <span>{c.final_cta.footer_note}</span>
            <img
              src={flagsUrl}
              alt=""
              role="presentation"
              className="h-5 w-auto max-w-[10rem] object-contain opacity-90 sm:h-6 sm:max-w-[12rem]"
              loading="lazy"
              decoding="async"
            />
          </motion.p>
        </motion.div>
      </section>
      
    </div>
  );
}
