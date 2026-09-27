export interface SpecialtyItem {
  title: string;
  badge: string;
  desc: string;
  symptoms: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  details: string;
}

export interface PricingCard {
  tag: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
}

export interface PsychologyContent {
  topBar: {
    copc: string;
    location: string;
    freeDiscovery: string;
  };
  header: {
    name: string;
    role: string;
    navAbout: string;
    navSpecialties: string;
    navMethodology: string;
    navPricing: string;
    navFaq: string;
    bookCta: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    metricOnline: string;
    metricOnlineSub: string;
    metricInPerson: string;
    metricInPersonSub: string;
    metricExp: string;
    metricExpSub: string;
    openSpots: string;
    openSpotsSub: string;
  };
  values: {
    heading: string;
    subheading: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
  specialties: {
    badge: string;
    heading: string;
    subheading: string;
    symptomsTitle: string;
    ctaPrompt: string;
    ctaButton: string;
    items: SpecialtyItem[];
  };
  about: {
    badge: string;
    quote: string;
    bioP1: string;
    bioP2: string;
    cert1: string;
    cert2: string;
    cert3: string;
    cert4: string;
    locationTitle: string;
    locationDesc: string;
  };
  methodology: {
    tag: string;
    heading: string;
    subheading: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  pricing: {
    badge: string;
    heading: string;
    subheading: string;
    cards: PricingCard[];
  };
  testimonials: {
    heading: string;
    subheading: string;
    items: TestimonialItem[];
  };
  faq: {
    badge: string;
    heading: string;
    items: FaqItem[];
  };
  ctaBanner: {
    heading: string;
    subheading: string;
    button: string;
  };
  footer: {
    bio: string;
    locationTitle: string;
    address: string;
    contactTitle: string;
    hoursTitle: string;
    hours1: string;
    hours2: string;
    rights: string;
    legal: string;
    privacy: string;
    deontology: string;
  };
  modal: {
    title: string;
    banner: string;
    labelName: string;
    labelEmail: string;
    labelPhone: string;
    labelType: string;
    optOnline: string;
    optInPerson: string;
    optCouples: string;
    labelTime: string;
    timeMornings: string;
    timeAfternoons: string;
    timeEvenings: string;
    labelReason: string;
    placeholderReason: string;
    closeBtn: string;
    submitBtn: string;
    successToast: (name: string) => string;
    errorToast: string;
  };
}
