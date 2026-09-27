import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  CheckSquare,
  Square,
  Copy,
  Check,
  Download,
  Layers,
  Settings2,
  Code2,
  Palette,
  Shuffle,
  User,
  MapPin,
  Target,
  FileEdit,
} from 'lucide-react';
import { Modal, Button, Badge, useToast } from './ui';
import { PrototypeDefinition } from '../prototypes/registry';
import {
  useCustomizer,
  COLOR_PALETTES,
  DESIGN_STYLES,
  SectionVisibility,
} from '../context/CustomizerContext';

interface PromptGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  prototype: PrototypeDefinition;
}

export const PSYCHOLOGY_SECTIONS: { key: keyof SectionVisibility; title: string; desc: string }[] = [
  { key: 'topBar', title: 'Barra Superior de Confiança', desc: 'Dades de col·legiació oficial (COPC), ubicació física de la consulta i distintiu de 1a sessió gratuïta.' },
  { key: 'hero', title: 'Hero Principal & Foto', desc: 'Missatge tranquil·litzador enfocat al retrobament personal, fotografia professional i acció directa per demanar cita.' },
  { key: 'values', title: 'Pilars Terapèutics', desc: 'Tres targetes clau: acceptació incondicional sense judicis, eines pràctiques per al dia a dia i enfocament basat en l\'evidència (TCC, ACT, Sistèmica).' },
  { key: 'specialties', title: 'Especialitats Interactives', desc: 'Explorador interactiu dels motius de consulta: Ansietat, Autoestima, Límits, Dols i Teràpia de Parella amb llistat de símptomes.' },
  { key: 'about', title: 'Sobre Mi & Despatx', desc: 'Acreditació acadèmica (UB), trajectòria clínica de +8 anys i fotografia de l\'espai acollidor de consulta.' },
  { key: 'methodology', title: 'Metodologia Pas a Pas', desc: 'Procés terapèutic transparent en 4 etapes: Contacte → Avaluació → Treball i eines → Alta.' },
  { key: 'pricing', title: 'Tarifes i Modalitats', desc: 'Preus clars i desglossats: Individual Online (55€), Individual Presencial (65€) i Parella (80€).' },
  { key: 'testimonials', title: 'Testimonis de Pacients', desc: 'Opinions de pacients respectant la confidencialitat clínica i puntuacions.' },
  { key: 'faq', title: 'Preguntes Freqüents (FAQ)', desc: 'Acordió desplegable amb els dubtes més habituals sobre teràpia, durada i pagament.' },
  { key: 'ctaBanner', title: 'Banner de Contacte Final', desc: 'Crida a l\'acció final per demanar la primera sessió gratuïta.' },
  { key: 'footer', title: 'Peu de Pàgina & PauApps', desc: 'Horaris d\'atenció, adreça, legal, política de privadesa i atribució PauApps.' },
];

export const PromptGeneratorModal: React.FC<PromptGeneratorModalProps> = ({
  isOpen,
  onClose,
  prototype,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Consume Shared Customizer Context (shared with Live Mock visualization)
  const {
    customTitle,
    setCustomTitle,
    customProfessional,
    setCustomProfessional,
    customLocation,
    setCustomLocation,
    customNiche,
    setCustomNiche,
    customNotes,
    setCustomNotes,
    paletteId,
    setPaletteId,
    currentPalette,
    styleId,
    setStyleId,
    currentStyle,
    sections,
    toggleSection,
    setAllSections,
    randomizeVariation,
  } = useCustomizer();

  const [customPaletteNotes, setCustomPaletteNotes] = useState('');

  // Options
  const [framework, setFramework] = useState<'react-tailwind' | 'html-tailwind' | 'nextjs'>('react-tailwind');
  const [language, setLanguage] = useState<'ca' | 'es' | 'en'>('ca');
  const [includeMockData, setIncludeMockData] = useState(true);

  // Magic 1-click Random Variation Generator
  const handleRandomVariation = () => {
    randomizeVariation();
    toast('✨ S\'ha aplicat una nova combinació de marca, colors i estil al mock i al prompt!', 'info');
  };

  // Generate the comprehensive prompt
  const generatedPrompt = useMemo(() => {
    const selectedSections = PSYCHOLOGY_SECTIONS.filter((s) => sections[s.key]);

    const langNames = {
      ca: 'Català',
      es: 'Castellà (Español)',
      en: 'Anglès (English)',
    };

    const frameworkDesc = {
      'react-tailwind': 'React 18 amb TypeScript i Tailwind CSS (components modulars, hooks per a estats interactius)',
      'html-tailwind': 'HTML5 semàntic amb Tailwind CSS (via CDN o build) i JavaScript modern natiu',
      'nextjs': 'Next.js 14+ (App Router) amb TypeScript, Tailwind CSS i Server/Client Components',
    };

    const sectionsList = selectedSections.length > 0
      ? selectedSections
          .map((s, idx) => `### ${idx + 1}. ${s.title}\n- **Objectiu i contingut**: ${s.desc}`)
          .join('\n\n')
      : '(No s\'ha seleccionat cap secció específica. Implementa una estructura completa basada en la visió general.)';

    return `# PROMPT PER A LA CREACIÓ DEL LLOC WEB: ${(customTitle || prototype.title).toUpperCase()}

Actua com un enginyer de programari sènior i dissenyador UI/UX d'alt nivell especialitzat en desenvolupament web modern.
Crea el codi complet, funcional, elegant, accessible i llest per a producció d'aquesta pàgina web seguint estrictament les especificacions següents:

---

## 1. IDENTITAT DE LA MARCA I VISIÓ GENERAL
- **Títol del lloc web / Marca**: ${customTitle || prototype.title}
- **Professional o Responsable**: ${customProfessional || 'No especificat'}
- **Ubicació i Àmbit de Servei**: ${customLocation || 'Presencial i Online'}
- **Públic Objectiu i Nínxol Específic**: ${customNiche || prototype.category}
- **Propòsit General del Projecte**:
${prototype.overview || prototype.description}
${customNotes.trim() ? `- **Instruccions / Requisits especials del client**:\n  ${customNotes.trim()}` : ''}

---

## 2. PALETA CROMÀTICA I DIRECCIÓ D'ESTIL VISUAL
Aquesta web ha de tenir una identitat visual pròpia i distingible, evitant semblar una plantilla genèrica o idèntica a altres del mateix sector:
- **Nom de la Paleta**: ${currentPalette.name} (${currentPalette.badge})
- **Colors principals**:
  * Color Primari: ${currentPalette.primary}
  * Color d'Accent / Detalls: ${currentPalette.accent}
  * Fons i Superfícies: ${currentPalette.bg} / ${currentPalette.surface}
${customPaletteNotes.trim() ? `- **Ajustos cromàtics addicionals sol·licitats**: ${customPaletteNotes.trim()}` : ''}
- **Estil Visual & Look & Feel**: ${currentStyle.label}
  * Característiques de disseny: ${currentStyle.desc}
- **Tipografia i Maquetació**:
  * Utilitza tipografia ${currentStyle.fontHeading === 'font-serif' ? 'editorial serif per als titulars' : 'moderna sans-serif'}.
  * Distribueix generosament els espais en blanc (\`py-16\`, \`gap-8\`, \`max-w-6xl\`) per oferir una experiència de lectura relaxada i no aclaparadora.

---

## 3. STACK TECNOLÒGIC I ARQUITECTURA
- **Stack escollit**: ${frameworkDesc[framework]}
- **Idioma del contingut**: ${langNames[language]}
${includeMockData ? '- **Dades simulades realistes**: Inclou textos complets i versemblants redactats en ' + langNames[language] + ' adaptats expressament al professional (' + customProfessional + ') i al nínxol (' + customNiche + '). No utilitzis "Lorem ipsum" genèric.' : '- **Dades**: Estructura de codi preparada per connectar dades.'}

---

## 4. SECCIONS SELECCIONADES PER IMPLEMENTAR (${selectedSections.length} de ${PSYCHOLOGY_SECTIONS.length} seccions)
Implementa amb detall cadascuna de les ${selectedSections.length} seccions seleccionades a continuació, assegurant que flueixin amb coherència:

${sectionsList}

---

## 5. REQUISITS FUNCIONALS I DETALLS DE PRODUCCIÓ
1. **Responsivitat Total**: La interfície s'ha d'adaptar perfectament des de pantalles mòbils petites fins a monitors amples (mobile-first).
2. **Interactivitat**:
   - Tots els botons, selectors, formularis i modals han de tenir estats interactius vius (hover, focus-visible, disabled, active).
   - Validació de camps requerits als formularis amb missatges de confirmació amigables.
   - Microinteraccions suaus amb Tailwind CSS (\`transition-all\`, \`duration-200\`, \`shadow-xs\` / \`shadow-md\`).
3. **Credibilitat i Detall**:
   - Si és una web professional, inclou elements de confiança (número de col·legiació si aplica, ubicació a ${customLocation}, política de privadesa, modalitats clares de preus).
   - Al peu de pàgina (footer), inclou una referència professional indicant que la web ha estat creada per PauApps.
4. **Qualitat del Codi**:
   - Codi net, modular, ben estructurat i amb comentaris explicatius dels blocs principals.
   - Lliura el codi complet sense ometre cap apartat amb "TODO" o comentaris que tallin la implementació.
`;
  }, [
    prototype,
    customTitle,
    customProfessional,
    customLocation,
    customNiche,
    customNotes,
    paletteId,
    currentPalette,
    customPaletteNotes,
    styleId,
    currentStyle,
    sections,
    framework,
    language,
    includeMockData,
  ]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      toast('Prompt copiat al porta-retalls amb èxit!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast('No s\'ha pogut copiar automàticament. Selecciona el text manualment.', 'error');
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prompt-${prototype.id}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast(`Fitxer "prompt-${prototype.id}.md" descarregat!`, 'info');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generador de Prompt per a IA (Personalització de Mock)"
      maxWidth="xl"
    >
      <div className="space-y-5 text-slate-800 text-xs sm:text-sm max-h-[78vh] overflow-y-auto pr-1">
        {/* Header Banner amb botó de variació ràpida */}
        <div className="p-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-300 shrink-0" />
              <h3 className="font-bold text-base text-white">Generar Variació del Mock</h3>
              <Badge variant="info">{prototype.category}</Badge>
            </div>
            <p className="text-purple-200 text-xs mt-1">
              Personalitza títol, professional, colors i seccions per generar webs úniques i diferenciades amb IA.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleRandomVariation}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-purple-500/30 hover:bg-purple-500/50 border border-purple-400/40 text-purple-100 transition-all cursor-pointer shadow-xs"
              title="Genera a l'atzar un nom, ciutat, colors i estil diferents en 1 sol clic"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>🎲 Variació Ràpida</span>
            </button>
            <Button
              size="sm"
              onClick={handleCopy}
              className="bg-purple-600 hover:bg-purple-500 text-white shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1 text-emerald-300" />
                  Copiat!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copiar Prompt
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 1. Identitat de la Marca & Dades Clau */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <User className="w-4 h-4 text-purple-600" />
            <span>1. Dades del Lloc Web & Professional</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Títol Web */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Títol del Lloc Web / Projecte *
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Ex. Neus Solé Psicologia"
                className="w-full text-xs font-medium px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
              />
            </div>

            {/* Nom Professional */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Nom del Professional o Marca *
              </label>
              <input
                type="text"
                value={customProfessional}
                onChange={(e) => setCustomProfessional(e.target.value)}
                placeholder="Ex. Neus Solé / Dr. Joan Maristany"
                className="w-full text-xs font-medium px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
              />
            </div>

            {/* Ubicació */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>Ubicació / Ciutat & Modalitat</span>
              </label>
              <input
                type="text"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                placeholder="Ex. Barcelona (Eixample) & Online"
                className="w-full text-xs font-medium px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
              />
            </div>

            {/* Nínxol */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Target className="w-3 h-3 text-slate-400" />
                <span>Nínxol / Públic Objectiu</span>
              </label>
              <input
                type="text"
                value={customNiche}
                onChange={(e) => setCustomNiche(e.target.value)}
                placeholder="Ex. Adults amb ansietat i teràpia de parella"
                className="w-full text-xs font-medium px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
              />
            </div>

            {/* Requisits Especials */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <FileEdit className="w-3 h-3 text-slate-400" />
                <span>Instruccions / Requisits concrets adicionals (Opcional)</span>
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Ex. Enfocar el to a joves professionals, destacar convenis amb mútues, etc."
                className="w-full text-xs font-medium px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* 2. Paleta de Colors Base & Estil Visual */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Palette className="w-4 h-4 text-indigo-600" />
              <span>2. Colors Base & Estil Visual (Diferenciació cromàtica)</span>
            </div>
          </div>

          {/* Color Palettes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
            {COLOR_PALETTES.map((pal) => {
              const isSelected = paletteId === pal.id;
              return (
                <div
                  key={pal.id}
                  onClick={() => setPaletteId(pal.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-purple-500 ring-2 ring-purple-500/20 shadow-sm'
                      : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-xs text-slate-900">{pal.name}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {pal.badge}
                    </span>
                  </div>

                  {/* Color Swatch Circles */}
                  <div className="flex items-center gap-1.5 mb-2">
                    {pal.previewColors.map((color, cIdx) => (
                      <div
                        key={cIdx}
                        className="w-5 h-5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-500 leading-tight">
                    {pal.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Visual Style Selector */}
          <div className="pt-2 border-t border-slate-200/80">
            <label className="block text-[11px] font-semibold text-slate-700 mb-2">
              Direcció d'Estil Visual (Look & Feel)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {DESIGN_STYLES.map((style) => {
                const isSelected = styleId === style.id;
                return (
                  <div
                    key={style.id}
                    onClick={() => setStyleId(style.id)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-50/70 border-purple-400 text-slate-900 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-xs text-slate-900">{style.label}</div>
                    <div className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                      {style.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes de color addicionals */}
          <div className="pt-2 border-t border-slate-200/80">
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Notes o ajustos de color concrets (Opcional)
            </label>
            <input
              type="text"
              value={customPaletteNotes}
              onChange={(e) => setCustomPaletteNotes(e.target.value)}
              placeholder="Ex. Vull accents en verd maragda, o tons més pastel..."
              className="w-full text-xs font-medium px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
            />
          </div>
        </div>

        {/* 3. Selector de Seccions */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>3. Tria quines seccions vols implementar</span>
              <span className="text-xs font-normal text-slate-500">
                ({PSYCHOLOGY_SECTIONS.filter((s) => sections[s.key]).length} de {PSYCHOLOGY_SECTIONS.length} seleccionades)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAllSections(true)}
                className="text-[11px] font-semibold text-purple-700 hover:text-purple-900 hover:underline cursor-pointer"
              >
                Seleccionar totes
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => setAllSections(false)}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
              >
                Desmarcar totes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {PSYCHOLOGY_SECTIONS.map((sec, idx) => {
              const isSelected = sections[sec.key];
              return (
                <div
                  key={sec.key}
                  onClick={() => toggleSection(sec.key)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-purple-50/70 border-purple-300 shadow-2xs text-slate-900'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 opacity-70'
                  }`}
                >
                  <div className="mt-0.5 shrink-0 text-purple-600">
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-purple-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
                      {idx + 1}. {sec.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                      {sec.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Preferències de Codi */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Settings2 className="w-4 h-4 text-indigo-600" />
            <span>4. Stack & Idioma del Codi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Stack / Framework
              </label>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value as any)}
                className="w-full text-xs font-medium px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              >
                <option value="react-tailwind">React + Tailwind CSS</option>
                <option value="html-tailwind">HTML5 + Tailwind CSS</option>
                <option value="nextjs">Next.js (App Router)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Idioma del contingut
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full text-xs font-medium px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              >
                <option value="ca">Català</option>
                <option value="es">Castellà (Español)</option>
                <option value="en">Anglès (English)</option>
              </select>
            </div>

            <div className="flex items-center sm:items-end pb-1.5">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={includeMockData}
                  onChange={(e) => setIncludeMockData(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500 w-3.5 h-3.5"
                />
                <span>Incloure dades realistes simulades</span>
              </label>
            </div>
          </div>
        </div>

        {/* 5. Previsualització del Prompt Resultant */}
        <div className="space-y-2 bg-slate-900 text-slate-100 p-4 rounded-2xl border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 font-bold text-purple-300 text-sm">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>5. Prompt Resultant (Personalitzat & Únic)</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              {generatedPrompt.length} caràcters • {generatedPrompt.split(/\s+/).length} paraules
            </div>
          </div>

          <div className="relative mt-2">
            <pre className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-200 overflow-x-auto max-h-64 whitespace-pre-wrap select-all">
              {generatedPrompt}
            </pre>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-2 flex justify-between items-center border-t border-slate-200">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Tancar
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleDownloadTxt}>
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Descarregar .md
            </Button>
            <Button size="sm" onClick={handleCopy} className="bg-purple-600 hover:bg-purple-700 text-white">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-300" />
                  Copiat!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  Copiar Prompt
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
