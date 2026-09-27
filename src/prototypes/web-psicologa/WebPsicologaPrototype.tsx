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
import { useCustomizer } from '../../context/CustomizerContext';
import { getPsychologyContent } from './translations';

export const WebPsicologaPrototype: React.FC = () => {
  const { toast } = useToast();
  const { currentLang, currentLangInfo } = useI18n();
  const content = getPsychologyContent(currentLang);

  // Consume Live Customizer context
  const {
    customTitle,
    customProfessional,
    customLocation,
    customNiche,
    currentPalette,
    currentStyle,
    sections,
  } = useCustomizer();

  const initials = (customProfessional || 'NS')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || 'NS';

  const headingFont = currentStyle.fontHeading;
  const cardRadius = currentStyle.cardRadius;
  const buttonRadius = currentStyle.buttonRadius;

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
      style={{ backgroundColor: currentPalette.bg }}
      className={`min-h-screen -m-4 sm:-m-6 lg:-m-8 text-slate-800 transition-colors ${headingFont === 'font-serif' ? 'font-serif-theme' : 'font-sans'}`}
    >
      {/* 1. Top Professional Bar */}
      {sections.topBar && (
        <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 transition-all">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: currentPalette.primary }} /> {content.topBar.copc}
              </span>
              <span className="hidden md:inline text-stone-500">•</span>
              <span className="hidden md:flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" /> {customLocation || content.topBar.location}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium" style={{ color: currentPalette.accent }}>
                {content.topBar.freeDiscovery}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Website Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 ${cardRadius} flex items-center justify-center font-bold text-lg shadow-2xs`}
              style={{
                backgroundColor: currentPalette.primaryLight,
                color: currentPalette.primary,
              }}
            >
              {initials}
            </div>
            <div>
              <div className={`${headingFont} font-bold text-slate-900 text-base sm:text-lg leading-tight`}>
                {customTitle || content.header.name}
              </div>
              <div className="text-[11px] text-stone-500 tracking-wider uppercase font-medium">
                {customProfessional ? `${customProfessional} • ${content.header.role}` : content.header.role}
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm text-stone-600 font-medium">
            <a href="#sobre-mi" className="hover:opacity-80 transition-opacity" style={{ color: currentPalette.primary }}>{content.header.navAbout}</a>
            <a href="#terapies" className="hover:opacity-80 transition-opacity">{content.header.navSpecialties}</a>
            <a href="#metodologia" className="hover:opacity-80 transition-opacity">{content.header.navMethodology}</a>
            <a href="#tarifes" className="hover:opacity-80 transition-opacity">{content.header.navPricing}</a>
            <a href="#faq" className="hover:opacity-80 transition-opacity">{content.header.navFaq}</a>
          </nav>

          <Button
            size="sm"
            onClick={() => setIsBookingOpen(true)}
            style={{ backgroundColor: currentPalette.primary }}
            className={`text-white font-medium shadow-xs hover:opacity-95 ${buttonRadius}`}
          >
            <Calendar className="w-4 h-4 mr-1.5" /> {content.header.bookCta}
          </Button>
        </div>
      </header>

      {/* 2. Hero Section */}
      {sections.hero && (
        <section className="relative overflow-hidden pt-12 pb-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-stone-100/70 via-stone-50/40 to-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border shadow-2xs"
                style={{
                  backgroundColor: currentPalette.primaryLight,
                  color: currentPalette.primary,
                  borderColor: currentPalette.border,
                }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: currentPalette.primary }} />
                {content.hero.badge}
              </div>

              <h1 className={`${headingFont} text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]`}>
                {content.hero.headline}{' '}
                <span
                  className="italic underline decoration-wavy decoration-1 underline-offset-4"
                  style={{
                    color: currentPalette.primary,
                    textDecorationColor: currentPalette.accent,
                  }}
                >
                  {content.hero.headlineHighlight}
                </span>
                .
              </h1>

              <div className="space-y-2">
                <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {content.hero.subheadline}
                </p>
                {customNiche && (
                  <div
                    className="p-3 rounded-xl border text-xs max-w-xl mx-auto lg:mx-0 font-medium"
                    style={{
                      backgroundColor: currentPalette.accentLight,
                      borderColor: currentPalette.border,
                      color: currentPalette.primary,
                    }}
                  >
                    🎯 <strong className="text-slate-900">Àrea d'especialització clau:</strong> {customNiche}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <Button
                  size="lg"
                  onClick={() => setIsBookingOpen(true)}
                  style={{ backgroundColor: currentPalette.primary }}
                  className={`w-full sm:w-auto text-white shadow-md text-sm px-6 py-3 hover:opacity-95 ${buttonRadius}`}
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
                  alt={customProfessional || "Neus Solé"}
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
      )}

      {/* 3. Philosophy & Pillars */}
      {sections.values && (
        <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className={`${headingFont} text-2xl sm:text-3xl font-bold text-slate-900`}>
              {content.values.heading}
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              {content.values.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className={`border-stone-200 transition-all p-6 bg-white shadow-2xs hover:shadow-md ${cardRadius}`}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-2xs"
                style={{
                  backgroundColor: currentPalette.primaryLight,
                  color: currentPalette.primary,
                }}
              >
                <Heart className="w-6 h-6" />
              </div>
              <h3 className={`${headingFont} text-lg font-bold text-slate-900 mb-2`}>{content.values.card1Title}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {content.values.card1Desc}
              </p>
            </Card>

            <Card className={`border-stone-200 transition-all p-6 bg-white shadow-2xs hover:shadow-md ${cardRadius}`}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-2xs"
                style={{
                  backgroundColor: currentPalette.accentLight,
                  color: currentPalette.accent,
                }}
              >
                <Compass className="w-6 h-6" />
              </div>
              <h3 className={`${headingFont} text-lg font-bold text-slate-900 mb-2`}>{content.values.card2Title}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {content.values.card2Desc}
              </p>
            </Card>

            <Card className={`border-stone-200 transition-all p-6 bg-white shadow-2xs hover:shadow-md ${cardRadius}`}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-2xs"
                style={{
                  backgroundColor: currentPalette.primaryLight,
                  color: currentPalette.primary,
                }}
              >
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className={`${headingFont} text-lg font-bold text-slate-900 mb-2`}>{content.values.card3Title}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {content.values.card3Desc}
              </p>
            </Card>
          </div>
        </section>
      )}

      {/* 4. Specialties / Areas of Work */}
      {sections.specialties && (
        <section id="terapies" className="py-16 px-4 sm:px-6 bg-stone-100/60 border-y border-stone-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <Badge variant="info" className="mb-2">{content.specialties.badge}</Badge>
              <h2 className={`${headingFont} text-2xl sm:text-3xl font-bold text-slate-900`}>
                {content.specialties.heading}
              </h2>
              <p className="text-sm text-stone-600 mt-2">
                {content.specialties.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left selector */}
              <div className="lg:col-span-5 space-y-2">
                {specialties.map((spec, index) => {
                  const isActive = activeSpecialty === index;
                  return (
                    <button
                      key={spec.title}
                      onClick={() => setActiveSpecialty(index)}
                      style={{
                        borderColor: isActive ? currentPalette.primary : undefined,
                      }}
                      className={`w-full text-left rtl:text-right p-4 ${cardRadius} border transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-white shadow-md ring-2 ring-purple-500/10'
                          : 'bg-stone-50 border-stone-200/80 hover:bg-white text-stone-700'
                      }`}
                    >
                      <div>
                        <span className={`${headingFont} font-bold text-slate-900 block text-sm sm:text-base`}>
                          {spec.title}
                        </span>
                        <span className="text-xs text-stone-500">{spec.badge}</span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform rtl:rotate-180 ${isActive ? 'translate-x-1' : 'text-stone-300'}`}
                        style={{ color: isActive ? currentPalette.primary : undefined }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right details card */}
              <div className="lg:col-span-7">
                <Card className={`p-6 sm:p-8 bg-white border-stone-200 shadow-sm ${cardRadius}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="success">{currentSpecialty.badge}</Badge>
                  </div>
                  <h3 className={`${headingFont} text-xl sm:text-2xl font-bold text-slate-900 mb-3`}>
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
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentPalette.primary }} />
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
                      style={{ backgroundColor: currentPalette.primary }}
                      className={`text-white hover:opacity-95 ${buttonRadius}`}
                    >
                      {content.specialties.ctaButton}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. About Me Section */}
      {sections.about && (
        <section id="sobre-mi" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&auto=format&fit=crop&q=80"
                  alt="Consulta"
                  className={`w-full h-80 sm:h-96 object-cover shadow-md border border-stone-200 ${cardRadius}`}
                />
                <div className={`absolute -bottom-4 -right-4 bg-white p-4 ${cardRadius} shadow-lg border border-stone-200 text-xs text-stone-700 max-w-xs hidden sm:block`}>
                  <p className="font-semibold text-slate-900">{content.about.locationTitle}</p>
                  <p className="text-stone-500 mt-0.5">{customLocation || content.about.locationDesc}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
              <Badge variant="default">{content.about.badge}</Badge>
              <h2 className={`${headingFont} text-2xl sm:text-3xl font-bold text-slate-900`}>
                {content.about.quote}
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                {content.about.bioP1.replace('Neus Solé', customProfessional || 'Neus Solé')}
              </p>
              <p className="text-sm text-stone-600 leading-relaxed">
                {content.about.bioP2}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-3 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentPalette.primary }} />
                  <span>{content.about.cert1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentPalette.primary }} />
                  <span>{content.about.cert2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentPalette.primary }} />
                  <span>{content.about.cert3}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentPalette.primary }} />
                  <span>{content.about.cert4}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Step by Step Methodology */}
      {sections.methodology && (
        <section id="metodologia" className="py-16 px-4 sm:px-6 bg-stone-900 text-stone-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase font-bold tracking-wider" style={{ color: currentPalette.accent }}>
                {content.methodology.tag}
              </span>
              <h2 className={`${headingFont} text-2xl sm:text-3xl font-bold text-white mt-1`}>
                {content.methodology.heading}
              </h2>
              <p className="text-sm text-stone-400 mt-2">
                {content.methodology.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { num: '01', title: content.methodology.step1Title, desc: content.methodology.step1Desc },
                { num: '02', title: content.methodology.step2Title, desc: content.methodology.step2Desc },
                { num: '03', title: content.methodology.step3Title, desc: content.methodology.step3Desc },
                { num: '04', title: content.methodology.step4Title, desc: content.methodology.step4Desc },
              ].map((step, sIdx) => (
                <div
                  key={sIdx}
                  className={`p-6 ${cardRadius} bg-stone-800/80 border border-stone-700/80 space-y-3 shadow-xs`}
                >
                  <div className={`text-2xl font-bold ${headingFont}`} style={{ color: currentPalette.accent }}>
                    {step.num}
                  </div>
                  <h3 className={`${headingFont} text-base font-bold text-white`}>{step.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Pricing / Modalitats */}
      {sections.pricing && (
        <section id="tarifes" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="default" className="mb-2">{content.pricing.badge}</Badge>
            <h2 className={`${headingFont} text-2xl sm:text-3xl font-bold text-slate-900`}>
              {content.pricing.heading}
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              {content.pricing.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {content.pricing.cards.map((card, idx) => {
              const isFeatured = idx === 1;
              return (
                <Card
                  key={card.title}
                  style={{
                    borderColor: isFeatured ? currentPalette.primary : undefined,
                  }}
                  className={`p-6 bg-white flex flex-col justify-between transition-all ${cardRadius} ${
                    isFeatured
                      ? 'border-2 relative shadow-lg ring-2 ring-purple-500/10'
                      : 'border-stone-200 hover:border-stone-300 shadow-2xs'
                  }`}
                >
                  {isFeatured && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs"
                      style={{ backgroundColor: currentPalette.primary }}
                    >
                      ★ Més sol·licitat
                    </div>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: currentPalette.primary }}
                      >
                        {card.tag}
                      </span>
                      {idx === 0 && <Video className="w-5 h-5" style={{ color: currentPalette.primary }} />}
                      {idx === 1 && <MapPin className="w-5 h-5" style={{ color: currentPalette.primary }} />}
                      {idx === 2 && <Heart className="w-5 h-5" style={{ color: currentPalette.primary }} />}
                    </div>
                    <h3 className={`${headingFont} text-lg font-bold text-slate-900`}>{card.title}</h3>
                    <p className="text-xs text-stone-500 mt-1">{card.subtitle}</p>

                    <div className="my-6">
                      <span className="text-3xl font-bold text-slate-900">{card.price}</span>
                      <span className="text-xs text-stone-500"> {card.period}</span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-stone-600 mb-6">
                      {card.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentPalette.primary }} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant={isFeatured ? 'primary' : 'outline'}
                    onClick={() => {
                      if (idx === 0) setBookingType('individual-online');
                      else if (idx === 1) setBookingType('individual-presencial');
                      else setBookingType('parella');
                      setIsBookingOpen(true);
                    }}
                    style={{
                      backgroundColor: isFeatured ? currentPalette.primary : undefined,
                    }}
                    className={`w-full ${buttonRadius} ${isFeatured ? 'text-white hover:opacity-95' : ''}`}
                  >
                    {card.buttonText}
                  </Button>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* 8. Testimonials */}
      {sections.testimonials && (
        <section className="py-16 px-4 sm:px-6 bg-stone-100/50 border-t border-stone-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className={`${headingFont} text-2xl sm:text-3xl font-bold text-slate-900`}>
                {content.testimonials.heading}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                {content.testimonials.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.testimonials.items.map((item, idx) => (
                <div key={idx} className={`p-6 ${cardRadius} bg-white border border-stone-200 shadow-xs space-y-3`}>
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
      )}

      {/* 9. FAQ Section */}
      {sections.faq && (
        <section id="faq" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="default" className="mb-2">{content.faq.badge}</Badge>
            <h2 className={`${headingFont} text-2xl sm:text-3xl font-bold text-slate-900`}>
              {content.faq.heading}
            </h2>
          </div>

          <div className="space-y-3">
            {content.faq.items.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`bg-white ${cardRadius} border border-stone-200 overflow-hidden transition-all shadow-xs`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left rtl:text-right flex items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors cursor-pointer"
                  >
                    <span className={`${headingFont} font-bold text-slate-900 text-sm sm:text-base`}>
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 shrink-0" style={{ color: currentPalette.primary }} />
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
      )}

      {/* 10. Direct Contact Banner */}
      {sections.ctaBanner && (
        <section
          style={{ backgroundColor: currentPalette.primary }}
          className="py-16 px-4 sm:px-6 text-white text-center shadow-inner transition-colors"
        >
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className={`${headingFont} text-3xl sm:text-4xl font-bold`}>
              {content.ctaBanner.heading}
            </h2>
            <p className="opacity-90 text-sm sm:text-base leading-relaxed">
              {content.ctaBanner.subheading}
            </p>
            <div className="pt-2">
              <Button
                size="lg"
                onClick={() => setIsBookingOpen(true)}
                style={{ color: currentPalette.primary }}
                className={`bg-white hover:bg-stone-50 font-bold px-8 py-3 shadow-lg hover:scale-105 transition-transform ${buttonRadius}`}
              >
                {content.ctaBanner.button}
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* 11. Footer */}
      {sections.footer && (
        <footer className="bg-stone-950 text-stone-400 text-xs py-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-stone-800">
            <div className="space-y-3">
              <div className={`${headingFont} text-white font-bold text-base`}>
                {customTitle || content.header.name}
              </div>
              <p className="text-stone-400 leading-relaxed whitespace-pre-line">
                {content.footer.bio}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-white font-semibold">{content.footer.locationTitle}</div>
              <p className="flex items-start gap-2 text-stone-400 whitespace-pre-line">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentPalette.accent }} />
                <span>{customLocation || content.footer.address}</span>
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-white font-semibold">{content.footer.contactTitle}</div>
              <p className="flex items-center gap-2 text-stone-400">
                <Mail className="w-4 h-4" style={{ color: currentPalette.accent }} />
                <span>hola@{(customProfessional || 'psicologia').toLowerCase().replace(/[^a-z0-9]/g, '') || 'psicologia'}.cat</span>
              </p>
              <p className="flex items-center gap-2 text-stone-400">
                <Phone className="w-4 h-4" style={{ color: currentPalette.accent }} />
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
              projectName={customTitle || "Neus Solé Psicologia"}
              theme="dark"
              customText={`${customTitle || "Neus Solé Psicologia"} és un projecte independent creat per PauApps.`}
            />
          </div>
        </footer>
      )}

      {/* Booking / Contact Modal */}
      <Modal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        title={content.modal.title}
        maxWidth="lg"
      >
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div
            className="p-3 rounded-xl border text-xs flex items-center gap-2"
            style={{
              backgroundColor: currentPalette.primaryLight,
              color: currentPalette.primary,
              borderColor: currentPalette.border,
            }}
          >
            <Sparkles className="w-4 h-4 shrink-0" style={{ color: currentPalette.primary }} />
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
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
              ].map((time) => {
                const isSelected = clientPrefTime === time.id;
                return (
                  <button
                    type="button"
                    key={time.id}
                    onClick={() => setClientPrefTime(time.id)}
                    style={{
                      backgroundColor: isSelected ? currentPalette.primary : undefined,
                      borderColor: isSelected ? currentPalette.primary : undefined,
                    }}
                    className={`py-2 px-3 text-xs ${buttonRadius} border font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {time.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">{content.modal.labelReason}</label>
            <textarea
              rows={3}
              value={clientMessage}
              onChange={(e) => setClientMessage(e.target.value)}
              placeholder={content.modal.placeholderReason}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-slate-400"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsBookingOpen(false)}>
              {content.modal.closeBtn}
            </Button>
            <Button
              type="submit"
              style={{ backgroundColor: currentPalette.primary }}
              className={`text-white hover:opacity-95 ${buttonRadius}`}
            >
              <Send className="w-4 h-4 mr-1.5" /> {content.modal.submitBtn}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
