import { motion } from "framer-motion";
import {
  Play,
  ShieldCheck,
  PlayCircle,
  MapPin,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AutoScrollCarousel, CarouselSlide } from "@/components/AutoScrollCarousel";
import visaContent from "../../visa_centre_content.json";
import fourPhaseSystemImage from "@/assets/four-phase-system.png";

const c = visaContent;

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
  const variantClass =
    variant === "onDark"
      ? "border border-[#0E2340]/15 bg-[#C8A84B] text-[#0E2340] hover:bg-[#b0933f]"
      : "bg-[#2B7EC1] hover:bg-[#1a5d91] text-white";

  return (
    <Button
      size="lg"
      className={`w-full sm:w-auto min-h-12 touch-manipulation font-bold text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 rounded-lg shadow-none ${variantClass} ${className}`}
      data-testid={testId}
      asChild
    >
      <a href={c.brand.consultationLink}>{c.brand.cta_consultation}</a>
    </Button>
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
    <div className={`flex justify-center ${className}`}>
      <ConsultationButton variant={variant} testId={testId} />
    </div>
  );
}

function HeroTitle({ headline, highlight }: { headline: string; highlight: string }) {
  const idx = headline.indexOf(highlight);
  if (idx === -1) return <>{headline}</>;
  return (
    <>
      {headline.slice(0, idx)}
      <span className="text-emerald-400">{highlight}</span>
      {headline.slice(idx + highlight.length)}
    </>
  );
}

// Component for Video Placeholder
const VideoEmbed = ({ label, aspect = "aspect-video" }: { label: string, aspect?: string }) => (
  <div className={`relative w-full max-w-full bg-slate-900 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-slate-800 ${aspect} group cursor-pointer flex items-center justify-center touch-manipulation`}>
    <div className="absolute top-2 right-2 z-10 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:top-4 sm:right-4 rounded-full uppercase tracking-wider">
      Watch
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0" />
    
    <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[3px] sm:border-4 border-[#C8A84B] flex items-center justify-center bg-black/40 backdrop-blur-sm group-active:scale-105 sm:group-hover:scale-110 group-hover:bg-[#C8A84B]/20 transition-all duration-300">
      <Play
        className="size-6 sm:size-8 shrink-0 text-[#C8A84B] translate-x-[1px] sm:translate-x-[2px]"
        fill="currentColor"
        aria-hidden
      />
    </div>
    
    <div className="absolute bottom-3 left-3 right-3 z-10 sm:bottom-4 sm:left-4 sm:right-4">
      <p className="text-white font-medium text-xs leading-snug sm:text-sm md:text-base line-clamp-2 text-center sm:text-left [overflow-wrap:anywhere]">{label}</p>
    </div>
  </div>
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
        +{c.university_partners.extra_count} more
      </span>
    </div>
  );

  const LogoStrip = ({ stripKey }: { stripKey: string }) => (
    <div className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10">
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
      <div className="relative overflow-hidden md:hidden">
        <div className="uni-logo-marquee-track">
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
  const faqVideoPills = c.faq.items.filter((item) => item.video != null);

  return (
    <div className="min-h-[100dvh] min-h-screen overflow-x-hidden bg-[#0E2340] text-white antialiased selection:bg-[#C8A84B] selection:text-[#0E2340]">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-2 pb-8 sm:pt-3 sm:pb-12 md:pb-16 px-3 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[min(500px,120vw)] sm:h-[500px] bg-[#2B7EC1]/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.img 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src={heroLogoUrl}
            alt={c.brand.name}
            className="block h-auto w-auto max-h-[min(8.5rem,24vh)] sm:max-h-32 md:max-h-40 max-w-[min(100%,18rem)] sm:max-w-[min(100%,20rem)] object-contain object-center -my-5 sm:-my-7 mb-1 sm:mb-3 drop-shadow-2xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5 }}
            className="w-full max-w-7xl mb-5 sm:mb-6"
          >
            <p className="text-center text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">
              {c.university_partners.label}
            </p>
            <UniversityPartnerLogos />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="flex w-full max-w-lg flex-col items-center gap-y-3.5 text-xs leading-snug sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-3 sm:text-sm sm:leading-normal text-slate-400 font-medium mx-auto text-center sm:text-left mb-5 sm:mb-6"
          >
            <div className="flex items-start sm:items-center gap-2 justify-center sm:justify-start max-w-[20rem] sm:max-w-none">
              <MapPin className="w-4 h-4 text-[#C8A84B] shrink-0 mt-0.5 sm:mt-0" /> <span>{c.hero.trust_badges[0]}</span>
            </div>
            <div className="flex items-center gap-2.5 justify-center sm:justify-start max-w-[20rem] sm:max-w-none">
              <img
                src={flagsUrl}
                alt="Algeria, China, Pakistan, and United Kingdom"
                className="h-7 w-auto max-w-[min(11rem,55vw)] shrink-0 object-contain object-left sm:h-8 sm:max-w-[13rem]"
                loading="lazy"
                decoding="async"
              />
              <span className="text-left [overflow-wrap:anywhere]">{c.hero.trust_badges[1]}</span>
            </div>
            <div className="flex items-start sm:items-center gap-2 text-white justify-center sm:justify-start">
              <ShieldCheck className="w-4 h-4 text-[#1A6B8A] shrink-0 mt-0.5 sm:mt-0" /> <span>{c.hero.trust_badges[2]}</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-[clamp(1.125rem,2.8vw+0.5rem,1.625rem)] sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug sm:leading-tight mb-4 sm:mb-6 px-1 text-balance max-w-xl mx-auto"
          >
            <HeroTitle headline={c.hero.headline} highlight={c.hero.headlineHighlight} />
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs leading-relaxed sm:text-sm md:text-base text-slate-300 max-w-[16rem] sm:max-w-md md:max-w-lg mx-auto mb-5 sm:mb-8 md:mb-10 px-1 text-balance"
          >
            {c.hero.subheadline}
          </motion.p>
          
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-y-4 sm:gap-y-6 md:gap-y-8 px-0.5">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full"
          >
            <VideoEmbed label={videoCaption(c.hero.video.label, c.hero.video.duration)} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex w-full max-w-md justify-center mx-auto"
          >
            <ConsultationButton variant="onDark" testId="btn-hero-consultation" className="w-full max-w-md" />
          </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE 4-PHASE SYSTEM */}
      <section className="py-14 sm:py-20 md:py-24 bg-white text-[#0E2340]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl leading-tight sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance max-w-[22rem] sm:max-w-none mx-auto px-1">{c.process.section_title}</h2>
            <div className="w-20 sm:w-24 h-1.5 bg-[#C8A84B] mx-auto rounded-full" />
          </div>
          
          <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12 mb-10 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={fourPhaseSystemImage}
                alt="Four-phase system: Scholarship & University Matching, Documentation Preparation, Visa Optimization, and Arrival & Relocation"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            <VideoEmbed label={videoCaption(c.process.video.label, c.process.video.duration)} />
          </div>
          <SectionConsultationCta variant="onLight" className="mt-10 sm:mt-12" testId="btn-process-consultation" />
        </div>
      </section>

      {/* 3. STUDENT RESULTS */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#F7F8FA] text-[#0E2340] overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance px-1">{c.testimonials.section_title}</h2>
            <div className="w-20 sm:w-24 h-1.5 bg-[#1A6B8A] mx-auto rounded-full" />
          </div>
          
          <AutoScrollCarousel speed={0.55} className="mb-10 sm:mb-12">
            {c.testimonials.items.map((testimonial) => (
              <CarouselSlide
                key={testimonial.name}
                className="flex-[0_0_min(82vw,18.75rem)] sm:flex-[0_0_300px]"
              >
                <Card className="h-full border-none shadow-lg">
                  <CardContent className="p-4 sm:p-6">
                    <div className="w-full mb-4">
                      <VideoEmbed label={testimonial.video.label} aspect="aspect-[9/16]" />
                    </div>
                    <p className="text-slate-700 italic mb-4 font-medium text-sm sm:text-base leading-relaxed">
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
              </CarouselSlide>
            ))}
          </AutoScrollCarousel>

          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-balance px-1">{c.gallery.section_title}</h3>
            <div className="w-16 sm:w-20 h-1 bg-[#1A6B8A] mx-auto rounded-full mt-3" />
          </div>

          <AutoScrollCarousel speed={0.45}>
            {c.gallery.images.map((image, index) => (
              <CarouselSlide
                key={`${image.alt}-${index}`}
                className="flex-[0_0_78%] sm:flex-[0_0_48%] md:flex-[0_0_32%]"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
                  <img
                    src={`${import.meta.env.BASE_URL}${image.src.replace(/^\//, "")}`}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
              </CarouselSlide>
            ))}
          </AutoScrollCarousel>

          <SectionConsultationCta variant="onLight" className="mt-10 sm:mt-12" testId="btn-testimonials-consultation" />
        </div>
      </section>

      {/* 4. FOR PARENTS */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#0E2340]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl leading-tight sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance">
                {c.parent_trust.section_title}
                <br />
                <span className="text-[#2B7EC1]">{c.parent_trust.section_highlight}</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed sm:text-lg mb-6 sm:mb-8">
                {c.parent_trust.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                {c.parent_trust.features.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white/5 p-3 sm:p-4 rounded-lg border border-white/10 min-h-[3rem]">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A6B8A] shrink-0" />
                    <span className="font-semibold text-xs sm:text-sm leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <VideoEmbed label={videoCaption(c.parent_trust.video.label, c.parent_trust.video.duration)} />
            </motion.div>
          </div>
          <SectionConsultationCta variant="onDark" className="mt-10 sm:mt-12" testId="btn-parents-consultation" />
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-14 sm:py-20 md:py-24 bg-white text-[#0E2340]">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance px-1">{c.faq.section_title}</h2>
            <div className="w-20 sm:w-24 h-1.5 bg-[#2B7EC1] mx-auto rounded-full" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-10 sm:mb-14">
          <p className="text-center text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 sm:mb-6">
            {c.university_partners.label}
          </p>
          <UniversityPartnerLogos />
        </div>

        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="w-full mb-8 sm:mb-12">
            {c.faq.items.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`} className="border-b border-slate-200">
                <AccordionTrigger className="text-left font-bold text-sm sm:text-lg hover:text-[#2B7EC1] py-3 sm:py-4 leading-snug text-balance touch-manipulation">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-slate-600 text-sm sm:text-base leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {faqVideoPills.map((item) => {
              const v = item.video!;
              const pillLabel = v.duration ? `${v.label} · ${v.duration}` : v.label;
              return (
              <div key={item.question} className="bg-slate-900 rounded-lg p-3.5 sm:p-3 min-h-[3rem] sm:min-h-0 flex items-center justify-between gap-2 text-white text-[11px] sm:text-xs font-semibold cursor-pointer active:bg-slate-800 sm:hover:bg-slate-800 transition-colors touch-manipulation">
                <span className="leading-snug">{pillLabel}</span>
                <PlayCircle className="w-4 h-4 text-[#C8A84B] shrink-0" />
              </div>
              );
            })}
          </div>
          <SectionConsultationCta variant="onLight" className="mt-10 sm:mt-12" testId="btn-faq-consultation" />
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section id="book" className="py-20 sm:py-28 md:py-32 bg-[#0E2340] text-center px-3 sm:px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl leading-tight sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 text-balance">{c.final_cta.section_title}</h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 leading-relaxed px-1">{c.final_cta.description}</p>
          
          <div className="flex justify-center mb-8 sm:mb-10">
            <ConsultationButton
              variant="onDark"
              testId="btn-final-consultation"
              className="min-h-14 h-14 sm:h-16 rounded-xl w-full sm:w-auto max-w-md"
            />
          </div>
          
          <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide leading-relaxed max-w-md sm:max-w-none mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
            <span>{c.final_cta.footer_note}</span>
            <img
              src={flagsUrl}
              alt=""
              role="presentation"
              className="h-5 w-auto max-w-[10rem] object-contain opacity-90 sm:h-6 sm:max-w-[12rem]"
              loading="lazy"
              decoding="async"
            />
          </p>
        </div>
      </section>
      
    </div>
  );
}
