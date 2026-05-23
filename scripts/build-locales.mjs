import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const dir = dirname(fileURLToPath(import.meta.url));
const enPath = join(dir, "../src/i18n/locales/en.json");
const en = JSON.parse(readFileSync(enPath, "utf8"));

function deepMerge(base, patch) {
  if (patch === null || typeof patch !== "object" || Array.isArray(patch)) {
    return patch ?? base;
  }
  const out = { ...base };
  for (const key of Object.keys(patch)) {
    out[key] =
      typeof patch[key] === "object" && !Array.isArray(patch[key]) && patch[key] !== null
        ? deepMerge(base[key] ?? {}, patch[key])
        : patch[key];
  }
  return out;
}

const frPatch = {
  brand: {
    name: "VISA Centre Algérie",
    tagline: "Représentants officiels",
    location: "Hydra, Alger",
    guarantee: "Satisfait ou Remboursé",
    cta_consultation: "Réserver un appel de consultation",
  },
  hero: {
    headline: "+200 étudiants accompagnés",
    headlineHighlight: "+200 étudiants accompagnés",
    subheadline:
      "Nous vous guidons de la candidature à l'arrivée — admission, bourses et un parcours clair vers votre université en Chine.",
    video: {
      label: "Présentation du fondateur",
      placeholder:
        "Le fondateur s'adresse directement à la caméra — présentation de l'agence, difficultés des étudiants et opportunité en Chine",
    },
    trust_badges: [
      "Depuis 2017 · Hydra, Alger",
      "Représentants officiels",
      "Satisfait ou Remboursé",
    ],
    stats: [
      { value: "100+", label: "Étudiants placés" },
      { value: "2017", label: "Depuis" },
      { value: "3", label: "Bureaux dans le monde" },
      { value: "A à Z", label: "Accompagnement complet" },
      { value: "0", label: "Étudiants abandonnés" },
    ],
  },
  process: {
    section_title: "Le système complet qui vous mène en Chine",
    video: {
      label: "Explication du système",
      placeholder:
        "Présentation animée des 4 phases — calendriers, tableaux de bord, parcours étudiant",
    },
    phases: [
      {
        title: "Bourses et choix d'université",
        steps: ["Analyse du profil", "Liste d'universités", "Identification des bourses"],
      },
      {
        title: "Préparation des dossiers",
        steps: ["Liste des documents", "Traduction et légalisation", "Soumission des candidatures"],
      },
      {
        title: "Optimisation du visa",
        steps: ["Préparation ambassade", "Relecture du dossier visa", "Coaching entretien"],
      },
      {
        title: "Arrivée et installation",
        steps: ["Accueil à l'aéroport", "Logement", "Suivi continu"],
      },
    ],
  },
  testimonials: {
    section_title: "De vrais étudiants. De vraies histoires.",
    items: [
      {
        role: "Étudiant en médecine",
        quote:
          "J'ai été refusé deux fois avant VISA Centre. Ils ont reconstruit mon dossier et j'ai obtenu mon visa en 3 semaines.",
        video: { label: "Témoignage étudiant", placeholder: "Yassine raconte son parcours du refus à l'approbation" },
      },
      {
        role: "Ingénierie",
        quote:
          "Ils m'ont trouvé une bourse complète dont j'ignorais l'existence. Tout a été géré professionnellement dès le premier jour.",
        video: {
          label: "Témoignage étudiant",
          placeholder: "Amira explique la découverte de la bourse",
        },
      },
      {
        role: "Mère de famille",
        university: "Parente, fille à Chengdu",
        quote:
          "En tant que parent j'étais terrifiée. VISA Centre nous a tenus informés à chaque étape. Ma fille est arrivée en sécurité et s'épanouit.",
        video: {
          label: "Témoignage étudiant",
          placeholder: "Fatima parle de la réassurance pour les parents",
        },
      },
      {
        role: "Commerce",
        quote:
          "Ils m'ont accueilli à l'aéroport, m'ont aidé à m'installer, et je bénéficie encore de leur soutien aujourd'hui.",
        video: {
          label: "Témoignage étudiant",
          placeholder: "Rami parle de l'accueil et du suivi",
        },
      },
      {
        role: "Informatique",
        quote:
          "Il y a 6 mois je ne savais pas par où commencer. Aujourd'hui j'ai ma lettre d'admission, mon visa et mon billet d'avion.",
        video: {
          label: "Témoignage étudiant",
          placeholder: "Sofiane décrit sa transformation complète",
        },
      },
    ],
  },
  gallery: {
    section_title: "Vie sur le campus et étudiante",
    images: [
      { alt: "Étudiants accompagnés par VISA Centre Algérie" },
      { alt: "Parcours d'études en Chine" },
      { alt: "Vie universitaire en Chine" },
      { alt: "Réussite étudiante à l'étranger" },
      { alt: "Arrivée et expérience sur le campus" },
    ],
  },
  faq: {
    section_title: "Tout ce que vous hésitez à demander",
    items: [
      {
        question: "Puis-je étudier en Chine sans parler chinois ?",
        answer:
          "Oui. La plupart des programmes pour étudiants internationaux sont en anglais. Nous vous aidons aussi à trouver les programmes en anglais adaptés à vos objectifs.",
        video: { label: "FAQ vie en Chine", duration: "45s" },
      },
      {
        question: "Quel budget faut-il prévoir ?",
        answer:
          "Avec notre optimisation des bourses, beaucoup d'étudiants réduisent fortement les coûts. Nous détaillons le budget complet — frais de scolarité et vie quotidienne — avant votre engagement.",
        video: { label: "FAQ budget", duration: "45s" },
      },
      {
        question: "Quelles sont mes chances de bourse ?",
        answer:
          "Nous analysons votre profil et vous orientons vers les bourses réellement accessibles — CSC, bourses universitaires et programmes bilatéraux Algérie-Chine.",
        video: { label: "FAQ bourses", duration: "60s" },
      },
      {
        question: "Et si mon visa est refusé ?",
        answer:
          "Nous préparons votre dossier pour limiter les refus. Notre taux d'approbation est élevé car nous ne soumettons pas tant que le dossier n'est pas optimisé.",
        video: { label: "FAQ visa", duration: "30s" },
      },
      {
        question: "Les diplômes chinois sont-ils reconnus en Algérie ?",
        answer:
          "Oui. Les diplômes des universités chinoises accréditées sont reconnus en Algérie et à l'international, surtout en médecine, ingénierie et commerce.",
      },
      {
        question: "Puis-je travailler pendant mes études en Chine ?",
        answer:
          "Les étudiants internationaux ont des possibilités de travail limitées. Nous vous conseillons sur ce qui est autorisé et comment planifier vos finances.",
      },
    ],
  },
  university_partners: {
    label: "Universités partenaires de confiance",
  },
  final_cta: {
    section_title: "Réservez votre consultation gratuite aujourd'hui",
    description: "Sans engagement. Sans pression. Juste des réponses claires sur votre avenir.",
    footer_note: "Représentants officiels depuis 2017 · Hydra, Alger",
  },
  ui: {
    watch: "Regarder",
    more_universities: "+{count} de plus",
    four_phase_alt:
      "Système en quatre phases : bourses et universités, préparation des dossiers, optimisation du visa, arrivée et installation",
    flags_alt: "Algérie, Chine, Pakistan et Royaume-Uni",
  },
};

const arPatch = {
  brand: {
    name: "فيزا سنتر الجزائر",
    tagline: "ممثلون رسميون",
    location: "حيدرة، الجزائر",
    guarantee: "راضٍ أو مسترد",
    cta_consultation: "احجز مكالمة استشارة",
  },
  hero: {
    headline: "+200 طالب تمت مرافقتهم",
    headlineHighlight: "+200 طالب",
    subheadline:
      "نرافقك من التقديم حتى الوصول — القبول، المنح الدراسية، ومسار واضح نحو جامعتك في الصين.",
    video: {
      label: "تعريف بالمؤسس",
      placeholder:
        "المؤسس يتحدث مباشرة إلى الكاميرا — تعريف بالوكالة، تحديات الطلاب، وفرصة الصين",
    },
    trust_badges: ["منذ 2017 · حيدرة، الجزائر", "ممثلون رسميون", "راضٍ أو مسترد"],
    stats: [
      { value: "100+", label: "طلاب تم إلحاقهم" },
      { value: "2017", label: "منذ" },
      { value: "3", label: "مكاتب عالمية" },
      { value: "أ إلى ي", label: "متابعة شاملة" },
      { value: "0", label: "طلاب تُركوا دون دعم" },
    ],
  },
  process: {
    section_title: "النظام الكامل الذي يوصلك إلى الصين",
    video: {
      label: "شرح النظام",
      placeholder: "عرض متحرك للمراحل الأربع — الجداول الزمنية ومسار الطالب",
    },
    phases: [
      {
        title: "المنح ومطابقة الجامعة",
        steps: ["تحليل الملف", "قائمة الجامعات", "تحديد المنح"],
      },
      {
        title: "إعداد الوثائق",
        steps: ["قائمة المستندات", "الترجمة والتصديق", "تقديم الطلبات"],
      },
      {
        title: "تحسين التأشيرة",
        steps: ["التحضير للسفارة", "مراجعة ملف التأشيرة", "تدريب المقابلة"],
      },
      {
        title: "الوصول والاستقرار",
        steps: ["استقبال المطار", "السكن", "دعم مستمر"],
      },
    ],
  },
  testimonials: {
    section_title: "طلاب حقيقيون. قصص حقيقية.",
    items: [
      {
        role: "طالب طب",
        quote:
          "رُفض طلبي مرتين قبل فيزا سنتر. أعادوا بناء ملفي وحصلت على تأشيرتي خلال 3 أسابيع.",
        video: { label: "قصة طالب", placeholder: "ياسين يشارك رحلة الرفض إلى القبول" },
      },
      {
        role: "هندسة",
        quote:
          "وجدوا لي منحة كاملة لم أكن أعرف بها. تم التعامل مع كل شيء باحتراف من اليوم الأول.",
        video: { label: "قصة طالب", placeholder: "أميرة تشرح اكتشاف المنحة" },
      },
      {
        role: "أم",
        university: "وليّة أمر، ابنتها في تشنغدو",
        quote:
          "كنتُ خائفة كأم. أبقانا فيزا سنتر على اطلاع في كل خطوة. وصلت ابنتي بسلام وهي تتقدّم بشكل ممتاز.",
        video: { label: "قصة طالب", placeholder: "فاطمة تتحدث عن طمأنة الأهل" },
      },
      {
        role: "تجارة",
        quote: "استقبلوني في المطار، ساعدوني على الاستقرار، وما زال دعمهم معي حتى اليوم.",
        video: { label: "قصة طالب", placeholder: "رامي يتحدث عن الدعم عند الوصول" },
      },
      {
        role: "علوم الحاسوب",
        quote:
          "قبل 6 أشهر لم أكن أعرف من أين أبدأ. اليوم لدي خطاب القبول والتأشيرة وتذكرة الطيران.",
        video: { label: "قصة طالب", placeholder: "سفيان يصف رحلة التحول الكاملة" },
      },
    ],
  },
  gallery: {
    section_title: "الحياة الجامعية والطلابية",
    images: [
      { alt: "طلاب مدعومون من فيزا سنتر الجزائر" },
      { alt: "رحلة الدراسة في الصين" },
      { alt: "الحياة الجامعية في الصين" },
      { alt: "نجاح الطلاب في الخارج" },
      { alt: "الوصول وتجربة الحرم الجامعي" },
    ],
  },
  faq: {
    section_title: "كل ما تتردد في سؤاله",
    items: [
      {
        question: "هل يمكنني الدراسة في الصين دون التحدث بالصينية؟",
        answer:
          "نعم. معظم البرامج للطلاب الدوليين باللغة الإنجليزية. نساعدك أيضاً في إيجاد البرامج المناسبة لأهدافك.",
        video: { label: "أسئلة الحياة في الصين", duration: "45 ث" },
      },
      {
        question: "ما الميزانية التي أحتاجها؟",
        answer:
          "مع تحسين المنح، يقلّل كثير من الطلاب التكاليف بشكل كبير. نوضح الميزانية الكاملة قبل الالتزام.",
        video: { label: "أسئلة الميزانية", duration: "45 ث" },
      },
      {
        question: "ما فرصي في الحصول على منحة؟",
        answer:
          "نحلل ملفك ونطابقك مع المنح التي تستحقها فعلاً — بما فيها CSC والمنح الجامعية والبرامج الثنائية الجزائر-الصين.",
        video: { label: "أسئلة المنح", duration: "60 ث" },
      },
      {
        question: "ماذا لو رُفضت تأشيرتي؟",
        answer:
          "نجهّز ملفك لتقليل مخاطر الرفض. معدل قبولنا مرتفع لأننا لا نقدّم حتى يصبح الملف محسّناً.",
        video: { label: "أسئلة التأشيرة", duration: "30 ث" },
      },
      {
        question: "هل الشهادات الصينية معترف بها في الجزائر؟",
        answer:
          "نعم. شهادات الجامعات الصينية المعتمدة معترف بها في الجزائر ودولياً، خاصة في الطب والهندسة والتجارة.",
      },
      {
        question: "هل يمكنني العمل أثناء الدراسة في الصين؟",
        answer:
          "للطلاب الدوليين خيارات عمل محدودة. ننصحك بما هو مسموح وكيفية التخطيط المالي.",
      },
    ],
  },
  university_partners: {
    label: "جامعات شريكة موثوقة",
  },
  final_cta: {
    section_title: "احجز استشارتك المجانية اليوم",
    description: "بدون التزام. بدون ضغط. إجابات واضحة عن مستقبلك فقط.",
    footer_note: "ممثلون رسميون منذ 2017 · حيدرة، الجزائر",
  },
  ui: {
    watch: "شاهد",
    more_universities: "+{count} أخرى",
    four_phase_alt:
      "نظام من أربع مراحل: المنح ومطابقة الجامعة، إعداد الوثائق، تحسين التأشيرة، الوصول والاستقرار",
    flags_alt: "الجزائر، الصين، باكستان، والمملكة المتحدة",
  },
};

function mergeTestimonials(baseItems, patchItems) {
  return baseItems.map((item, i) => ({
    ...item,
    ...(patchItems[i] ?? {}),
    video: { ...item.video, ...(patchItems[i]?.video ?? {}) },
  }));
}

function mergeGallery(baseImages, patchImages) {
  return baseImages.map((img, i) => ({ ...img, ...(patchImages[i] ?? {}) }));
}

function mergeFaq(baseItems, patchItems) {
  return baseItems.map((item, i) => ({
    ...item,
    ...(patchItems[i] ?? {}),
    video: item.video
      ? { ...item.video, ...(patchItems[i]?.video ?? {}) }
      : patchItems[i]?.video ?? null,
  }));
}

function mergePhases(basePhases, patchPhases) {
  return basePhases.map((p, i) => ({
    ...p,
    ...(patchPhases[i] ?? {}),
    steps: patchPhases[i]?.steps ?? p.steps,
  }));
}

function buildLocale(patch) {
  const merged = deepMerge(en, patch);
  merged.testimonials.items = mergeTestimonials(
    en.testimonials.items,
    patch.testimonials.items,
  );
  merged.gallery.images = mergeGallery(en.gallery.images, patch.gallery.images);
  merged.faq.items = mergeFaq(en.faq.items, patch.faq.items);
  merged.process.phases = mergePhases(en.process.phases, patch.process.phases);
  return merged;
}

const localesDir = join(dir, "../src/i18n/locales");
writeFileSync(join(localesDir, "fr.json"), JSON.stringify(buildLocale(frPatch), null, 2) + "\n");
writeFileSync(join(localesDir, "ar.json"), JSON.stringify(buildLocale(arPatch), null, 2) + "\n");
console.log("Wrote fr.json and ar.json");
