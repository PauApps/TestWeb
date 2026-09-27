import React, { useState } from 'react';
import {
  Heart,
  Calendar,
  MapPin,
  Video,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Send,
  Star,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { Button, Card, Badge, Modal, Input, useToast, PauAppsFooter } from '../../components/ui';
import { useI18n } from '../../i18n/I18nContext';
import { getPsychologyContent } from './translations';

export const WebPsicologaPrototype: React.FC = () => {
  const { toast } = useToast();
  const { currentLang, currentLangInfo } = useI18n();
  const content = getPsychologyContent(currentLang);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'individual-online' | 'individual-presencial' | 'parella'>('individual-online');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientPrefTime, setClientPrefTime] = useState('tardes');
  const [clientMessage, setClientMessage] = useState('');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Active Specialty Filter
  const [activeSpecialty, setActiveSpecialty] = useState<number>(0);

  const specialties = content.specialties.items;
  const currentSpecialty = specialties[activeSpecialty] || specialties[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      toast(content.modal.errorToast, 'error');
      return;
    }

    toast(content.modal.successToast(clientName), 'success');
    setIsBookingOpen(false);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setClientMessage('');
  };

  const isRtl = currentLangInfo.dir === 'rtl';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="bg-stone-50/60 -m-4 sm:-m-6 lg:-m-8 font-sans text-slate-800 transition-colors"
    >
      {/* Top Professional Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {content.topBar.copc}
            </span>
            <span className="hidden md:inline text-stone-500">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" /> {content.topBar.location}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-medium">{content.topBar.freeDiscovery}</span>
          </div>
        </div>
      </div>

      {/* Website Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-serif font-bold text-lg">
              NS
            </div>
            <div>
              <div className="font-serif font-bold text-slate-900 text-base sm:text-lg leading-tight">
                {content.header.name}
              </div>
              <div className="text-[11px] text-stone-500 tracking-wider uppercase font-medium">
                {content.header.role}
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm text-stone-600 font-medium">
            <a href="#sobre-mi" className="hover:text-emerald-800 transition-colors">{content.header.navAbout}</a>
            <a href="#terapies" className="hover:text-emerald-800 transition-colors">{content.header.navSpecialties}</a>
            <a href="#metodologia" className="hover:text-emerald-800 transition-colors">{content.header.navMethodology}</a>
            <a href="#tarifes" className="hover:text-emerald-800 transition-colors">{content.header.navPricing}</a>
            <a href="#faq" className="hover:text-emerald-800 transition-colors">{content.header.navFaq}</a>
          </nav>

          <Button
            size="sm"
            onClick={() => setIsBookingOpen(true)}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium shadow-xs"
          >
            <Calendar className="w-4 h-4 mr-1.5" /> {content.header.bookCta}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:py-20 px-4 sm:px-6 bg-linear-to-b from-stone-100/70 via-emerald-50/20 to-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-semibold border border-emerald-200/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              {content.hero.badge}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
              {content.hero.headline}{' '}
              <span className="text-emerald-800 italic underline decoration-emerald-300 decoration-wavy decoration-1 underline-offset-4">
                {content.hero.headlineHighlight}
              </span>
              .
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {content.hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Button
                size="lg"
                onClick={() => setIsBookingOpen(true)}
                className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white shadow-md text-sm px-6 py-3"
              >
                {content.hero.primaryCta}
                <ArrowRight className="w-4 h-4 ml-2 rtl:rotate-180" />
              </Button>
              <a
                href="#terapies"
                className="w-full sm:w-auto inline-flex items-center justify-center text-sm font-medium text-stone-700 hover:text-emerald-800 px-5 py-3 rounded-lg border border-stone-300 hover:border-stone-400 bg-white shadow-xs transition-colors"
              >
                {content.hero.secondaryCta}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-stone-200/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-lg sm:text-xl font-bold text-slate-900">{content.hero.metricOnline}</div>
                <div className="text-xs text-stone-500">{content.hero.metricOnlineSub}</div>
              </div>
              <div className="border-l border-stone-200 pl-3 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-3">
                <div className="text-lg sm:text-xl font-bold text-slate-900">{content.hero.metricInPerson}</div>
                <div className="text-xs text-stone-500">{content.hero.metricInPersonSub}</div>
              </div>
              <div className="border-l border-stone-200 pl-3 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-3">
                <div className="text-lg sm:text-xl font-bold text-slate-900">{content.hero.metricExp}</div>
                <div className="text-xs text-stone-500">{content.hero.metricExpSub}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-60 h-60 bg-amber-100/60 rounded-full blur-2xl -z-10"></div>

              <div className="bg-white p-3 rounded-3xl shadow-xl border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                  alt="Neus Solé"
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="p-4 bg-stone-50 rounded-xl mt-3 border border-stone-200/60 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">{content.hero.openSpots}</div>
                    <div className="text-[11px] text-stone-500">{content.hero.openSpotsSub}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Pillars */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {content.values.heading}
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            {content.values.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-stone-200 hover:border-emerald-300 transition-all p-6 bg-white">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{content.values.card1Title}</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {content.values.card1Desc}
            </p>
          </Card>

          <Card className="border-stone-200 hover:border-emerald-300 transition-all p-6 bg-white">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{content.values.card2Title}</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {content.values.card2Desc}
            </p>
          </Card>

          <Card className="border-stone-200 hover:border-emerald-300 transition-all p-6 bg-white">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{content.values.card3Title}</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {content.values.card3Desc}
            </p>
          </Card>
        </div>
      </section>

      {/* Specialties / Areas of Work */}
      <section id="terapies" className="py-16 px-4 sm:px-6 bg-stone-100/60 border-y border-stone-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="info" className="mb-2">{content.specialties.badge}</Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {content.specialties.heading}
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              {content.specialties.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left selector */}
            <div className="lg:col-span-5 space-y-2">
              {specialties.map((spec, index) => (
                <button
                  key={spec.title}
                  onClick={() => setActiveSpecialty(index)}
                  className={`w-full text-left rtl:text-right p-4 rounded-xl border transition-all flex items-center justify-between ${
                    activeSpecialty === index
                      ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-600/10'
                      : 'bg-stone-50 border-stone-200/80 hover:bg-white text-stone-700'
                  }`}
                >
                  <div>
                    <span className="font-serif font-bold text-slate-900 block text-sm sm:text-base">
                      {spec.title}
                    </span>
                    <span className="text-xs text-stone-500">{spec.badge}</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform rtl:rotate-180 ${activeSpecialty === index ? 'text-emerald-700 translate-x-1' : 'text-stone-300'}`} />
                </button>
              ))}
            </div>

            {/* Right details card */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8 bg-white border-stone-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="success">{currentSpecialty.badge}</Badge>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                  {currentSpecialty.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                  {currentSpecialty.desc}
                </p>

                <div className="space-y-3 pt-4 border-t border-stone-100">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-stone-500">
                    {content.specialties.symptomsTitle}
                  </h4>
                  <ul className="space-y-2">
                    {currentSpecialty.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-stone-500">
                    {content.specialties.ctaPrompt}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => {
                      setClientMessage(`${currentSpecialty.title}`);
                      setIsBookingOpen(true);
                    }}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white"
                  >
                    {content.specialties.ctaButton}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="sobre-mi" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&auto=format&fit=crop&q=80"
                alt="Consulta"
                className="w-full h-80 sm:h-96 object-cover rounded-2xl shadow-md border border-stone-200"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-stone-200 text-xs text-stone-700 max-w-xs hidden sm:block">
                <p className="font-semibold text-slate-900">{content.about.locationTitle}</p>
                <p className="text-stone-500 mt-0.5">{content.about.locationDesc}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            <Badge variant="default">{content.about.badge}</Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {content.about.quote}
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              {content.about.bioP1}
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              {content.about.bioP2}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{content.about.cert1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{content.about.cert2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{content.about.cert3}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{content.about.cert4}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Methodology */}
      <section id="metodologia" className="py-16 px-4 sm:px-6 bg-stone-900 text-stone-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-emerald-400 text-xs uppercase font-bold tracking-wider">{content.methodology.tag}</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              {content.methodology.heading}
            </h2>
            <p className="text-sm text-stone-400 mt-2">
              {content.methodology.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-3">
              <div className="text-2xl font-bold text-emerald-400 font-serif">01</div>
              <h3 className="font-serif text-base font-bold text-white">{content.methodology.step1Title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {content.methodology.step1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-3">
              <div className="text-2xl font-bold text-emerald-400 font-serif">02</div>
              <h3 className="font-serif text-base font-bold text-white">{content.methodology.step2Title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {content.methodology.step2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-3">
              <div className="text-2xl font-bold text-emerald-400 font-serif">03</div>
              <h3 className="font-serif text-base font-bold text-white">{content.methodology.step3Title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {content.methodology.step3Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-3">
              <div className="text-2xl font-bold text-emerald-400 font-serif">04</div>
              <h3 className="font-serif text-base font-bold text-white">{content.methodology.step4Title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                {content.methodology.step4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Modalitats */}
      <section id="tarifes" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="default" className="mb-2">{content.pricing.badge}</Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {content.pricing.heading}
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            {content.pricing.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {content.pricing.cards.map((card, idx) => (
            <Card
              key={card.title}
              className={`p-6 bg-white flex flex-col justify-between transition-all ${
                idx === 1
                  ? 'border-2 border-emerald-700 relative shadow-md'
                  : 'border-stone-200 hover:border-emerald-500'
              }`}
            >
              {idx === 1 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  ★
                </div>
              )}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">{card.tag}</span>
                  {idx === 0 && <Video className="w-5 h-5 text-emerald-700" />}
                  {idx === 1 && <MapPin className="w-5 h-5 text-emerald-700" />}
                  {idx === 2 && <Heart className="w-5 h-5 text-emerald-700" />}
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="text-xs text-stone-500 mt-1">{card.subtitle}</p>

                <div className="my-6">
                  <span className="text-3xl font-bold text-slate-900">{card.price}</span>
                  <span className="text-xs text-stone-500"> {card.period}</span>
                </div>

                <ul className="space-y-2.5 text-xs text-stone-600 mb-6">
                  {card.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant={idx === 1 ? 'primary' : 'outline'}
                onClick={() => {
                  if (idx === 0) setBookingType('individual-online');
                  else if (idx === 1) setBookingType('individual-presencial');
                  else setBookingType('parella');
                  setIsBookingOpen(true);
                }}
                className={idx === 1 ? 'w-full bg-emerald-800 hover:bg-emerald-900 text-white' : 'w-full'}
              >
                {card.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 bg-stone-100/50 border-t border-stone-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {content.testimonials.heading}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {content.testimonials.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.testimonials.items.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                  {item.quote}
                </p>
                <div className="pt-2 border-t border-stone-100">
                  <span className="font-bold text-xs text-slate-900">{item.author}</span>
                  <span className="text-[11px] text-stone-400 block">{item.details}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="default" className="mb-2">{content.faq.badge}</Badge>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {content.faq.heading}
          </h2>
        </div>

        <div className="space-y-3">
          {content.faq.items.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left rtl:text-right flex items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
                >
                  <span className="font-serif font-bold text-slate-900 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-emerald-800 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section className="py-16 px-4 sm:px-6 bg-emerald-900 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            {content.ctaBanner.heading}
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            {content.ctaBanner.subheading}
          </p>
          <div className="pt-2">
            <Button
              size="lg"
              onClick={() => setIsBookingOpen(true)}
              className="bg-white text-emerald-950 hover:bg-emerald-50 font-bold px-8 py-3 shadow-lg"
            >
              {content.ctaBanner.button}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 text-xs py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-stone-800">
          <div className="space-y-3">
            <div className="font-serif text-white font-bold text-base">{content.header.name}</div>
            <p className="text-stone-400 leading-relaxed whitespace-pre-line">
              {content.footer.bio}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-white font-semibold">{content.footer.locationTitle}</div>
            <p className="flex items-start gap-2 text-stone-400 whitespace-pre-line">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{content.footer.address}</span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-white font-semibold">{content.footer.contactTitle}</div>
            <p className="flex items-center gap-2 text-stone-400">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>hola@neussolepsicologia.cat</span>
            </p>
            <p className="flex items-center gap-2 text-stone-400">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+34 612 34 56 78</span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-white font-semibold">{content.footer.hoursTitle}</div>
            <p className="text-stone-400">{content.footer.hours1}</p>
            <p className="text-stone-400">{content.footer.hours2}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-stone-500 pb-4">
          <p>© {new Date().getFullYear()} {content.footer.rights}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-300 transition-colors">{content.footer.legal}</a>
            <a href="#" className="hover:text-stone-300 transition-colors">{content.footer.privacy}</a>
            <a href="#" className="hover:text-stone-300 transition-colors">{content.footer.deontology}</a>
          </div>
        </div>

        {/* Referència PauApps */}
        <div className="max-w-6xl mx-auto">
          <PauAppsFooter
            projectName="Neus Solé Psicologia"
            theme="dark"
            customText="Neus Solé Psicologia és un projecte independent creat per PauApps."
          />
        </div>
      </footer>

      {/* Booking / Contact Modal */}
      <Modal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        title={content.modal.title}
        maxWidth="lg"
      >
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-emerald-700" />
            <span>{content.modal.banner}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label={content.modal.labelName}
              placeholder="Laia Soler"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
            <Input
              label={content.modal.labelEmail}
              type="email"
              placeholder="laia@example.cat"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label={content.modal.labelPhone}
              type="tel"
              placeholder="+34 600 00 00 00"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              required
            />
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">{content.modal.labelType}</label>
              <select
                value={bookingType}
                onChange={(e) => setBookingType(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                <option value="individual-online">{content.modal.optOnline}</option>
                <option value="individual-presencial">{content.modal.optInPerson}</option>
                <option value="parella">{content.modal.optCouples}</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">{content.modal.labelTime}</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'mati', label: content.modal.timeMornings },
                { id: 'tardes', label: content.modal.timeAfternoons },
                { id: 'vespre', label: content.modal.timeEvenings },
              ].map((time) => (
                <button
                  type="button"
                  key={time.id}
                  onClick={() => setClientPrefTime(time.id)}
                  className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all ${
                    clientPrefTime === time.id
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {time.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">{content.modal.labelReason}</label>
            <textarea
              rows={3}
              value={clientMessage}
              onChange={(e) => setClientMessage(e.target.value)}
              placeholder={content.modal.placeholderReason}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsBookingOpen(false)}>
              {content.modal.closeBtn}
            </Button>
            <Button type="submit" className="bg-emerald-800 hover:bg-emerald-900 text-white">
              <Send className="w-4 h-4 mr-1.5" /> {content.modal.submitBtn}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
