import { motion } from "framer-motion";
import {
  Play,
  CheckCircle,
  ShieldCheck,
  PlayCircle,
  MapPin,
  GraduationCap,
  Phone,
  ShieldX,
  FileX,
  MapPinOff,
  BanknoteX,
  Compass,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import visaContent from "../../visa_centre_content.json";

const c = visaContent;

const ADVANTAGE_ACCENT: Record<string, string> = {
  blue: "border-t-[#2B7EC1]",
  gold: "border-t-[#C8A84B]",
  red: "border-t-[#C0392B]",
};

const PHASE_BORDER = ["border-t-[#0E2340]", "border-t-[#2B7EC1]", "border-t-[#C8A84B]", "border-t-[#1A6B8A]"] as const;

function videoCaption(label: string, duration?: string) {
  return duration ? `${label} · ${duration}` : label;
}

function HeroTitle({ headline, highlight }: { headline: string; highlight: string }) {
  const idx = headline.indexOf(highlight);
  if (idx === -1) return <>{headline}</>;
  return (
    <>
      {headline.slice(0, idx)}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">{highlight}</span>
      {headline.slice(idx + highlight.length)}
    </>
  );
}

function problemIcon(icon: string) {
  const cls = "w-8 h-8 text-red-600";
  switch (icon) {
    case "shield-x":
      return <ShieldX className={cls} />;
    case "file-x":
      return <FileX className={cls} />;
    case "map-x":
      return <MapPinOff className={cls} />;
    case "money-x":
      return <BanknoteX className={cls} />;
    case "graduation-x":
      return <GraduationCap className={cls} />;
    case "compass-x":
      return <Compass className={cls} />;
    default:
      return <ShieldX className={cls} />;
  }
}

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
  const waDigits = c.brand.whatsapp.replace(/\D/g, "");
  const authorityTitleParts = c.authority.section_title.split(" — ");
  const faqVideoPills = c.faq.items.filter((item) => item.video != null);

  return (
    <div className="min-h-[100dvh] min-h-screen overflow-x-hidden bg-[#0E2340] text-white antialiased selection:bg-[#C8A84B] selection:text-[#0E2340]">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-10 sm:pt-10 sm:pb-16 md:pb-20 px-3 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[min(500px,120vw)] sm:h-[500px] bg-[#2B7EC1]/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center mt-4 sm:mt-8">
          <motion.img 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src={heroLogoUrl}
            alt={c.brand.name}
            className="h-auto w-auto max-h-[min(9.5rem,28vh)] sm:max-h-36 md:max-h-44 max-w-[min(100%,18rem)] sm:max-w-[min(100%,20rem)] object-contain mb-6 sm:mb-10 drop-shadow-2xl"
          />
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-[clamp(1.375rem,4.2vw+0.65rem,2.25rem)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.12] sm:leading-tight mb-4 sm:mb-6 px-0.5 text-balance max-w-[22rem] sm:max-w-none mx-auto"
          >
            <HeroTitle headline={c.hero.headline} highlight={c.hero.headlineHighlight} />
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base leading-relaxed sm:text-lg md:text-xl text-slate-300 max-w-3xl mb-5 sm:mb-8 md:mb-10 px-1"
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
            className="flex w-full max-w-md flex-col gap-3 sm:gap-4 mx-auto"
          >
            <Button 
              size="lg" 
              className="w-full min-h-12 touch-manipulation border border-[#0E2340]/15 bg-[#C8A84B] text-[#0E2340] shadow-none transition-colors hover:bg-[#b0933f] hover:shadow-none active:shadow-none font-bold text-base sm:text-lg h-12 sm:h-14 rounded-lg"
              data-testid="btn-hero-eligibility"
            >
              {c.hero.cta_primary}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full min-h-12 touch-manipulation border-white/20 text-white hover:bg-white/10 font-semibold text-base sm:text-lg h-12 sm:h-14 rounded-lg"
              data-testid="btn-hero-how-it-works"
              asChild
            >
              <a href={c.brand.consultationLink}>{c.hero.cta_secondary}</a>
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex w-full max-w-lg flex-col items-center gap-y-3.5 text-xs leading-snug sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-3 sm:text-sm sm:leading-normal text-slate-400 font-medium mx-auto text-center sm:text-left"
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
          </div>
        </div>
      </section>

      {/* 2. UNIVERSITY LOGOS (below hero) */}
      <section className="bg-white border-y border-slate-200 py-3 sm:py-4 md:py-5">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
          <UniversityPartnerLogos />
        </div>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#F7F8FA] text-[#0E2340]">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl leading-tight sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance max-w-[20rem] sm:max-w-none mx-auto px-1">{c.problems.section_title}</h2>
            <div className="w-20 sm:w-24 h-1.5 bg-red-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {c.problems.items.map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-md border-l-4 border-l-red-600 hover:shadow-lg transition-shadow"
              >
                <div className="mb-3 sm:mb-4 bg-red-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center [&>svg]:w-7 [&>svg]:h-7 sm:[&>svg]:w-8 sm:[&>svg]:h-8">
                  {problemIcon(item.icon)}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 leading-snug">{item.title}</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AUTHORITY SECTION */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#0E2340] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <VideoEmbed label={videoCaption(c.authority.video.label, c.authority.video.duration)} />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl leading-tight sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance">
                {authorityTitleParts[0]}
                {authorityTitleParts.length > 1 ? (
                  <>
                    {" — "}
                    <span className="text-[#C8A84B]">{authorityTitleParts[1]}</span>
                  </>
                ) : null}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed sm:text-lg mb-6 sm:mb-8">
                {c.authority.description}
              </p>
              
              <div className="space-y-3 sm:space-y-4">
                {c.authority.bullets.map((text, i) => (
                  <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A6B8A] shrink-0 mt-0.5" />
                    <span className="text-white font-medium text-[15px] sm:text-base md:text-lg leading-snug">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#F7F8FA] text-[#0E2340]">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance px-1">{c.advantages.section_title}</h2>
            <div className="w-20 sm:w-24 h-1.5 bg-[#2B7EC1] mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {c.advantages.items.map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white p-5 sm:p-8 rounded-xl shadow-md border-t-4 ${ADVANTAGE_ACCENT[item.accent] ?? "border-t-[#2B7EC1]"} hover:-translate-y-1 transition-transform`}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 leading-snug">{item.title}</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THE 4-PHASE SYSTEM */}
      <section className="py-14 sm:py-20 md:py-24 bg-white text-[#0E2340]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl leading-tight sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance max-w-[22rem] sm:max-w-none mx-auto px-1">{c.process.section_title}</h2>
            <div className="w-20 sm:w-24 h-1.5 bg-[#C8A84B] mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16">
            {c.process.phases.map((phase, i) => (
              <motion.div 
                key={phase.number}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-[#F7F8FA] p-4 sm:p-6 rounded-xl border-t-4 ${PHASE_BORDER[i % PHASE_BORDER.length]} relative overflow-hidden`}
              >
                <div className="text-4xl sm:text-5xl font-black text-slate-200 absolute -top-1 -right-1 sm:-top-2 sm:-right-2 pointer-events-none select-none">{phase.number}</div>
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 pr-10 sm:pr-8 relative z-10 leading-snug">Phase {phase.number}: {phase.title}</h3>
                <ul className="space-y-2">
                  {phase.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C8A84B] mt-1.5 shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <VideoEmbed label={videoCaption(c.process.video.label, c.process.video.duration)} />
          </div>
        </div>
      </section>

      {/* 7. STUDENT RESULTS */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#F7F8FA] text-[#0E2340] overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance px-1">{c.testimonials.section_title}</h2>
            <div className="w-20 sm:w-24 h-1.5 bg-[#1A6B8A] mx-auto rounded-full" />
          </div>
          
          <div className="flex overflow-x-auto pb-6 sm:pb-8 -mx-3 px-3 sm:-mx-4 sm:px-4 snap-x snap-mandatory hide-scrollbar gap-4 sm:gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-wrap xl:justify-center scroll-pl-3">
            {c.testimonials.items.map((testimonial) => (
              <Card key={testimonial.name} className="min-w-[min(100vw-2.5rem,18.75rem)] max-w-[min(100vw-2.5rem,21.875rem)] sm:min-w-[300px] sm:max-w-[350px] snap-center shrink-0 border-none shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="w-full mb-4">
                    <VideoEmbed label={testimonial.video.label} aspect="aspect-[9/16]" />
                  </div>
                  <div className="flex text-[#C8A84B] mb-3">
                    {[...Array(testimonial.stars)].map((_, j) => <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <p className="text-slate-700 italic mb-4 font-medium text-sm sm:text-base leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="font-bold text-[#0E2340] text-base sm:text-lg">{testimonial.name}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-snug">{testimonial.role}, {testimonial.university}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOR PARENTS */}
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
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-14 sm:py-20 md:py-24 bg-white text-[#0E2340]">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance px-1">{c.faq.section_title}</h2>
            <div className="w-20 sm:w-24 h-1.5 bg-[#2B7EC1] mx-auto rounded-full" />
          </div>
          
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
        </div>
      </section>

      {/* 10. PARTNERS */}
      <section className="py-8 sm:py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 overflow-hidden md:overflow-visible">
          <p className="text-center text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 sm:mb-6">{c.university_partners.label}</p>
          <UniversityPartnerLogos />
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section id="book" className="py-20 sm:py-28 md:py-32 bg-[#0E2340] text-center px-3 sm:px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl leading-tight sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 text-balance">{c.final_cta.section_title}</h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 leading-relaxed px-1">{c.final_cta.description}</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-lg sm:max-w-none mx-auto">
            <Button 
              size="lg" 
              className="w-full sm:w-auto min-h-14 touch-manipulation bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-base sm:text-lg h-14 sm:h-16 px-6 sm:px-8 rounded-xl shadow-lg flex items-center justify-center gap-3"
              onClick={() => window.open(`https://wa.me/${waDigits}`, '_blank')}
              data-testid="btn-final-whatsapp"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              {c.final_cta.cta_whatsapp}
            </Button>
            <Button 
              size="lg" 
              className="w-full sm:w-auto min-h-14 touch-manipulation bg-[#2B7EC1] hover:bg-[#1a5d91] text-white font-bold text-base sm:text-lg h-14 sm:h-16 px-6 sm:px-8 rounded-xl shadow-lg"
              data-testid="btn-final-consultation"
              asChild
            >
              <a href={c.brand.consultationLink}>{c.final_cta.cta_call}</a>
            </Button>
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
