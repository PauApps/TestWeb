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
import { PrototypeDefinition, MockSection } from '../prototypes/registry';

interface PromptGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  prototype: PrototypeDefinition;
}

// Preset color palettes
interface ColorPalettePreset {
  id: string;
  name: string;
  badge: string;
  primary: string;
  accent: string;
  background: string;
  previewColors: string[];
  description: string;
}

const COLOR_PALETTES: ColorPalettePreset[] = [
  {
    id: 'calm-warm',
    name: 'Calidesa & Benestar',
    badge: 'Càlid & Acollidor',
    primary: 'Terracota suau (#c86b4f)',
    accent: 'Sorra / Beix càlid (#f7f4ee)',
    background: 'Blanc lli i pedra natural',
    previewColors: ['#c86b4f', '#e6a18d', '#f7f4ee', '#5f6f52'],
    description: 'Tons naturals càlids, que transmeten hospitalitat, seguretat i confort humà.',
  },
  {
    id: 'serene-blue',
    name: 'Serè & Blau Clínic',
    badge: 'Mèdic & Rigorós',
    primary: 'Blau marí profund (#1e3a5f)',
    accent: 'Cian / Turquesa suau (#0284c7)',
    background: 'Blanc òptic i gris perla subtil',
    previewColors: ['#1e3a5f', '#0284c7', '#e0f2fe', '#64748b'],
    description: 'Serenor, confiança sanitària, netedat impecable i alta autoritat mèdica.',
  },
  {
    id: 'natural-eco',
    name: 'Natural & Botànic',
    badge: 'Orgànic & Zen',
    primary: 'Verd bosc / Sàlvia (#2d5a3f)',
    accent: 'Verd molsa suau (#84a98c)',
    background: 'Crema càlid (#faf8f5)',
    previewColors: ['#2d5a3f', '#84a98c', '#cad2c5', '#f4f1de'],
    description: 'Connexió amb la natura, equilibri vital, serenor i enfocament holístic.',
  },
  {
    id: 'soft-blush',
    name: 'Suau & Cura Personal',
    badge: 'Empatia & Cura',
    primary: 'Rosa empolsat elegant (#b76e79)',
    accent: 'Lavanda suau (#9b8bb4)',
    background: 'Rosa cremós ultra suau (#fff8f6)',
    previewColors: ['#b76e79', '#9b8bb4', '#fceade', '#e5b3bb'],
    description: 'Delicadesa, comprensió profunda, tacte sensible i absència total de judici.',
  },
  {
    id: 'modern-tech',
    name: 'Vibrant & Modern',
    badge: 'Dynamic / Neo',
    primary: 'Violeta / Indi elèctric (#6366f1)',
    accent: 'Fúcsia suau / Cian (#ec4899)',
    background: 'Pissarra clara o fosc modern',
    previewColors: ['#4f46e5', '#6366f1', '#ec4899', '#f8fafc'],
    description: 'Energètic, avantguardista, per a públic jove, emprenedors o enfocament digital.',
  },
  {
    id: 'luxury-minimal',
    name: 'Minimalista & Sobri',
    badge: 'Luxe & Editorial',
    primary: 'Negre carbó suau (#18181b)',
    accent: 'Or vell / Bronze (#b45309)',
    background: 'Blanc pur amb contrastos nets',
    previewColors: ['#18181b', '#b45309', '#f59e0b', '#f4f4f5'],
    description: 'Màxima sobrietat, elegància editorial, tipografia protagonista i molt d\'espai lliure.',
  },
];

// Design Style options
const DESIGN_STYLES = [
  {
    id: 'editorial',
    label: 'Càlid & Editorial',
    desc: 'Bordes arrodonits suaus, targetes flotants, textures acollidores i tipografia humana.',
  },
  {
    id: 'minimalist',
    label: 'Minimalista & Zen',
    desc: 'Línies rectes i netes, molt d\'espai en blanc, sense ornaments superflus, màxima claredat.',
  },
  {
    id: 'modern-saas',
    label: 'Modern & Tecnològic',
    desc: 'Gradients subtils, microinteraccions visuals, iconografia moderna i components interactius destacats.',
  },
  {
    id: 'corporate',
    label: 'Institucional & Seriós',
    desc: 'Estructura ferma, colors compactes, gran pes a les credencials i certificacions.',
  },
];

// Random variation profiles for instant 1-click variety
const VARIATION_PROFILES = [
  {
    title: 'Consulta de Psicologia - Dr. Joan Maristany',
    professional: 'Dr. Joan Maristany',
    location: 'Girona (Barri Vell) & Sessions Online',
    niche: 'Teràpia d\'ansietat, estrès laboral, burnout i lideratge conscient',
    paletteId: 'serene-blue',
    styleId: 'minimalist',
  },
  {
    title: 'Clara Roura | Psicologia & Benestar Integral',
    professional: 'Clara Roura',
    location: 'Palma de Mallorca (Centre) & Consulta Virtual',
    niche: 'Autoestima, gestió de límits personals i teràpia de parella',
    paletteId: 'calm-warm',
    styleId: 'editorial',
  },
  {
    title: 'Arrel Psicologia Natural - Laia Fonts',
    professional: 'Laia Fonts',
    location: 'Vic & Manresa (i acompanyament online)',
    niche: 'Gestió del dol, teràpia d\'acceptació i compromís (ACT) i mindfulness',
    paletteId: 'natural-eco',
    styleId: 'editorial',
  },
  {
    title: 'Espai Ànima - Psicologia & Emocions',
    professional: 'Marc Valls i Associats',
    location: 'Barcelona (Gràcia) & Sessions per Videotrucada',
    niche: 'Adolescents, joves adults i transicions personals o professionals',
    paletteId: 'modern-tech',
    styleId: 'modern-saas',
  },
  {
    title: 'Mireia Puig - Psicologia Sanitària & Trauma',
    professional: 'Mireia Puig',
    location: 'Tarragona & Atenció Internacional a Expatriats',
    niche: 'Teràpia EMDR, resolució de trauma, apego i diversitat LGBTIQ+',
    paletteId: 'soft-blush',
    styleId: 'editorial',
  },
  {
    title: 'Institut Psicològic Balmes',
    professional: 'Equip Clínic Dirigit per Dra. Helena Bosch',
    location: 'Barcelona (Eixample Esquerre)',
    niche: 'Clínica d\'adults, teràpia cognitiu-conductual d\'alta precisió i suport familiar',
    paletteId: 'luxury-minimal',
    styleId: 'corporate',
  },
];

export const PromptGeneratorModal: React.FC<PromptGeneratorModalProps> = ({
  isOpen,
  onClose,
  prototype,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // 1. Dynamic Identity Customizations
  const [customTitle, setCustomTitle] = useState(prototype.title);
  const [customProfessional, setCustomProfessional] = useState(
    prototype.id === 'web-psicologa' ? 'Neus Solé' : 'Equip del Projecte'
  );
  const [customLocation, setCustomLocation] = useState(
    prototype.id === 'web-psicologa' ? 'Barcelona (Eixample) & Online' : 'Barcelona & En Línia'
  );
  const [customNiche, setCustomNiche] = useState(
    prototype.id === 'web-psicologa'
      ? 'Adults i parelles que busquen pau mental, eines contra l\'ansietat i creixement personal'
      : 'Clients particulars i professionals que busquen servei de màxima qualitat'
  );
  const [customNotes, setCustomNotes] = useState('');

  // 2. Palette & Visual Style
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('calm-warm');
  const [customPaletteNotes, setCustomPaletteNotes] = useState('');
  const [selectedStyleId, setSelectedStyleId] = useState<string>('editorial');

  // 3. Sections to Implement
  const [selectedSectionTitles, setSelectedSectionTitles] = useState<string[]>(() => {
    return prototype.sections ? prototype.sections.map((s) => s.title) : [];
  });

  // Re-sync when prototype changes
  React.useEffect(() => {
    setCustomTitle(prototype.title);
    if (prototype.id === 'web-psicologa') {
      setCustomProfessional('Neus Solé');
      setCustomLocation('Barcelona (Eixample) & Online');
      setCustomNiche('Adults i parelles que busquen pau mental, eines contra l\'ansietat i creixement personal');
    } else {
      setCustomProfessional('Equip del Projecte');
      setCustomLocation('Barcelona & En Línia');
      setCustomNiche('Clients particulars i professionals');
    }
    if (prototype.sections) {
      setSelectedSectionTitles(prototype.sections.map((s) => s.title));
    } else {
      setSelectedSectionTitles([]);
    }
  }, [prototype.id]);

  // Options
  const [framework, setFramework] = useState<'react-tailwind' | 'html-tailwind' | 'nextjs'>('react-tailwind');
  const [language, setLanguage] = useState<'ca' | 'es' | 'en'>('ca');
  const [includeMockData, setIncludeMockData] = useState(true);

  const allSections: MockSection[] = prototype.sections || [];

  const handleToggleSection = (title: string) => {
    setSelectedSectionTitles((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleSelectAll = () => {
    setSelectedSectionTitles(allSections.map((s) => s.title));
  };

  const handleDeselectAll = () => {
    setSelectedSectionTitles([]);
  };

  // Magic 1-click Random Variation Generator
  const handleRandomVariation = () => {
    const randomProfile =
      VARIATION_PROFILES[Math.floor(Math.random() * VARIATION_PROFILES.length)];
    setCustomTitle(randomProfile.title);
    setCustomProfessional(randomProfile.professional);
    setCustomLocation(randomProfile.location);
    setCustomNiche(randomProfile.niche);
    setSelectedPaletteId(randomProfile.paletteId);
    setSelectedStyleId(randomProfile.styleId);
    toast('✨ S\'ha generat una nova combinació de marca, colors i estil!', 'info');
  };

  // Generate the comprehensive prompt
  const generatedPrompt = useMemo(() => {
    const selectedSections = allSections.filter((s) =>
      selectedSectionTitles.includes(s.title)
    );

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

    const activePalette = COLOR_PALETTES.find((p) => p.id === selectedPaletteId) || COLOR_PALETTES[0];
    const activeStyle = DESIGN_STYLES.find((s) => s.id === selectedStyleId) || DESIGN_STYLES[0];

    const sectionsList = selectedSections.length > 0
      ? selectedSections
          .map((s, idx) => `### ${idx + 1}. ${s.title}\n- **Objectiu i contingut**: ${s.description}`)
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
- **Nom de la Paleta**: ${activePalette.name} (${activePalette.badge})
- **Colors principals**:
  * Color Primari: ${activePalette.primary}
  * Color d'Accent / Detalls: ${activePalette.accent}
  * Fons i Superfícies: ${activePalette.background}
${customPaletteNotes.trim() ? `- **Ajustos cromàtics addicionals sol·licitats**: ${customPaletteNotes.trim()}` : ''}
- **Estil Visual & Look & Feel**: ${activeStyle.label}
  * Característiques de disseny: ${activeStyle.desc}
- **Tipografia i Maquetació**:
  * Utilitza una tipografia moderna i llegible (sans-serif neta com Inter o serif editorial per a encapçalaments si escau).
  * Distribueix generosament els espais en blanc (\`py-16\`, \`gap-8\`, \`max-w-6xl\`) per oferir una experiència de lectura relaxada i no aclaparadora.

---

## 3. STACK TECNOLÒGIC I ARQUITECTURA
- **Stack escollit**: ${frameworkDesc[framework]}
- **Idioma del contingut**: ${langNames[language]}
${includeMockData ? '- **Dades simulades realistes**: Inclou textos complets i versemblants redactats en ' + langNames[language] + ' adaptats expressament al professional (' + customProfessional + ') i al nínxol (' + customNiche + '). No utilitzis "Lorem ipsum" genèric.' : '- **Dades**: Estructura de codi preparada per connectar dades.'}

---

## 4. SECCIONS SELECCIONADES PER IMPLEMENTAR (${selectedSections.length} seccions)
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
    selectedPaletteId,
    customPaletteNotes,
    selectedStyleId,
    selectedSectionTitles,
    framework,
    language,
    includeMockData,
    allSections,
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
              const isSelected = selectedPaletteId === pal.id;
              return (
                <div
                  key={pal.id}
                  onClick={() => setSelectedPaletteId(pal.id)}
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
                const isSelected = selectedStyleId === style.id;
                return (
                  <div
                    key={style.id}
                    onClick={() => setSelectedStyleId(style.id)}
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
                ({selectedSectionTitles.length} de {allSections.length} seleccionades)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[11px] font-semibold text-purple-700 hover:text-purple-900 hover:underline cursor-pointer"
              >
                Seleccionar totes
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={handleDeselectAll}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
              >
                Desmarcar totes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {allSections.map((sec, idx) => {
              const isSelected = selectedSectionTitles.includes(sec.title);
              return (
                <div
                  key={idx}
                  onClick={() => handleToggleSection(sec.title)}
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
                      {sec.description}
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
