import React, { createContext, useContext, useState } from 'react';

export interface ColorPalette {
  id: string;
  name: string;
  badge: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  accent: string;
  accentLight: string;
  bg: string;
  surface: string;
  border: string;
  previewColors: string[];
  description: string;
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'calm-warm',
    name: 'Calidesa & Benestar',
    badge: 'Càlid & Acollidor',
    primary: '#c86b4f',
    primaryHover: '#b3583d',
    primaryLight: '#fdf2ee',
    accent: '#4d6046',
    accentLight: '#f0f4ee',
    bg: '#faf7f2',
    surface: '#ffffff',
    border: '#ebe3d9',
    previewColors: ['#c86b4f', '#e6a18d', '#fdf2ee', '#4d6046'],
    description: 'Tons terracota i sorra càlida, que transmeten hospitalitat, seguretat i confort humà.',
  },
  {
    id: 'serene-blue',
    name: 'Serè & Blau Clínic',
    badge: 'Mèdic & Rigorós',
    primary: '#1e3a5f',
    primaryHover: '#152943',
    primaryLight: '#e0f2fe',
    accent: '#0284c7',
    accentLight: '#f0f9ff',
    bg: '#f8fafc',
    surface: '#ffffff',
    border: '#e2e8f0',
    previewColors: ['#1e3a5f', '#0284c7', '#e0f2fe', '#64748b'],
    description: 'Serenor, netedat impecable, màxima autoritat sanitària i rigor mèdic.',
  },
  {
    id: 'natural-eco',
    name: 'Natural & Botànic',
    badge: 'Orgànic & Zen',
    primary: '#2d5a3f',
    primaryHover: '#20412e',
    primaryLight: '#ecfdf5',
    accent: '#658b6f',
    accentLight: '#f2f7f3',
    bg: '#faf8f5',
    surface: '#ffffff',
    border: '#e2ded7',
    previewColors: ['#2d5a3f', '#658b6f', '#cad2c5', '#f4f1de'],
    description: 'Connexió amb la natura, calma profunda, equilibri vital i enfocament holístic.',
  },
  {
    id: 'soft-blush',
    name: 'Suau & Cura Personal',
    badge: 'Empatia & Cura',
    primary: '#a85d68',
    primaryHover: '#8f4a54',
    primaryLight: '#fff1f3',
    accent: '#8b7ca2',
    accentLight: '#f5f3f8',
    bg: '#fffaf9',
    surface: '#ffffff',
    border: '#fae3e6',
    previewColors: ['#a85d68', '#8b7ca2', '#fceade', '#e5b3bb'],
    description: 'Delicadesa, comprensió profunda, tacte sensible i absència total de judici.',
  },
  {
    id: 'modern-tech',
    name: 'Vibrant & Modern',
    badge: 'Dynamic / Neo',
    primary: '#5b21b6',
    primaryHover: '#4c1d95',
    primaryLight: '#f5f3ff',
    accent: '#db2777',
    accentLight: '#fdf2f8',
    bg: '#f8fafc',
    surface: '#ffffff',
    border: '#e2e8f0',
    previewColors: ['#5b21b6', '#7c3aed', '#db2777', '#f8fafc'],
    description: 'Energètic, avantguardista, enfocat a joves professionals o consultoria moderna.',
  },
  {
    id: 'luxury-minimal',
    name: 'Minimalista & Sobri',
    badge: 'Luxe & Editorial',
    primary: '#18181b',
    primaryHover: '#27272a',
    primaryLight: '#f4f4f5',
    accent: '#b45309',
    accentLight: '#fef3c7',
    bg: '#fcfcfc',
    surface: '#ffffff',
    border: '#e4e4e7',
    previewColors: ['#18181b', '#b45309', '#f59e0b', '#f4f4f5'],
    description: 'Màxima sobrietat, elegància editorial, tipografia protagonista i molt d\'espai lliure.',
  },
];

export interface DesignStyle {
  id: string;
  label: string;
  desc: string;
  fontHeading: 'font-serif' | 'font-sans';
  cardRadius: string;
  buttonRadius: string;
}

export const DESIGN_STYLES: DesignStyle[] = [
  {
    id: 'editorial',
    label: 'Càlid & Editorial',
    desc: 'Bordes arrodonits suaus, targetes flotants, textures càlides i tipografia humana.',
    fontHeading: 'font-serif',
    cardRadius: 'rounded-2xl',
    buttonRadius: 'rounded-xl',
  },
  {
    id: 'minimalist',
    label: 'Minimalista & Zen',
    desc: 'Línies rectes i netes, molt d\'espai en blanc, sense ornaments superflus, màxima claredat.',
    fontHeading: 'font-sans',
    cardRadius: 'rounded-lg',
    buttonRadius: 'rounded-lg',
  },
  {
    id: 'modern-saas',
    label: 'Modern & Tecnològic',
    desc: 'Gradients subtils, microinteraccions visuals, iconografia moderna i components destacats.',
    fontHeading: 'font-sans',
    cardRadius: 'rounded-3xl',
    buttonRadius: 'rounded-full',
  },
  {
    id: 'corporate',
    label: 'Institucional & Seriós',
    desc: 'Estructura ferma, colors compactes, gran pes a les credencials i certificacions.',
    fontHeading: 'font-sans',
    cardRadius: 'rounded-xl',
    buttonRadius: 'rounded-md',
  },
];

export interface SectionVisibility {
  topBar: boolean;
  hero: boolean;
  values: boolean;
  specialties: boolean;
  about: boolean;
  methodology: boolean;
  pricing: boolean;
  testimonials: boolean;
  faq: boolean;
  ctaBanner: boolean;
  footer: boolean;
}

export const DEFAULT_SECTIONS: SectionVisibility = {
  topBar: true,
  hero: true,
  values: true,
  specialties: true,
  about: true,
  methodology: true,
  pricing: true,
  testimonials: true,
  faq: true,
  ctaBanner: true,
  footer: true,
};

export const VARIATION_PRESETS = [
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
    niche: 'Teràpia EMDR, resolució de trauma, vincle afectiu i diversitat LGBTIQ+',
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

interface CustomizerContextType {
  customTitle: string;
  setCustomTitle: (val: string) => void;
  customProfessional: string;
  setCustomProfessional: (val: string) => void;
  customLocation: string;
  setCustomLocation: (val: string) => void;
  customNiche: string;
  setCustomNiche: (val: string) => void;
  customNotes: string;
  setCustomNotes: (val: string) => void;
  
  paletteId: string;
  setPaletteId: (id: string) => void;
  currentPalette: ColorPalette;
  
  styleId: string;
  setStyleId: (id: string) => void;
  currentStyle: DesignStyle;
  
  sections: SectionVisibility;
  toggleSection: (key: keyof SectionVisibility) => void;
  setAllSections: (visible: boolean) => void;
  
  randomizeVariation: () => void;
  resetDefaults: () => void;
  
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

export const CustomizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customTitle, setCustomTitle] = useState('Neus Solé Psicologia');
  const [customProfessional, setCustomProfessional] = useState('Neus Solé');
  const [customLocation, setCustomLocation] = useState('Barcelona (Eixample) & Online');
  const [customNiche, setCustomNiche] = useState('Adults i parelles que busquen pau mental, eines contra l\'ansietat i creixement personal');
  const [customNotes, setCustomNotes] = useState('');
  
  const [paletteId, setPaletteId] = useState<string>('calm-warm');
  const [styleId, setStyleId] = useState<string>('editorial');
  const [sections, setSections] = useState<SectionVisibility>(DEFAULT_SECTIONS);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentPalette = COLOR_PALETTES.find((p) => p.id === paletteId) || COLOR_PALETTES[0];
  const currentStyle = DESIGN_STYLES.find((s) => s.id === styleId) || DESIGN_STYLES[0];

  const toggleSection = (key: keyof SectionVisibility) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setAllSections = (visible: boolean) => {
    setSections({
      topBar: visible,
      hero: visible,
      values: visible,
      specialties: visible,
      about: visible,
      methodology: visible,
      pricing: visible,
      testimonials: visible,
      faq: visible,
      ctaBanner: visible,
      footer: visible,
    });
  };

  const randomizeVariation = () => {
    const nextPreset = VARIATION_PRESETS[Math.floor(Math.random() * VARIATION_PRESETS.length)];
    setCustomTitle(nextPreset.title);
    setCustomProfessional(nextPreset.professional);
    setCustomLocation(nextPreset.location);
    setCustomNiche(nextPreset.niche);
    setPaletteId(nextPreset.paletteId);
    setStyleId(nextPreset.styleId);
  };

  const resetDefaults = () => {
    setCustomTitle('Neus Solé Psicologia');
    setCustomProfessional('Neus Solé');
    setCustomLocation('Barcelona (Eixample) & Online');
    setCustomNiche('Adults i parelles que busquen pau mental, eines contra l\'ansietat i creixement personal');
    setCustomNotes('');
    setPaletteId('calm-warm');
    setStyleId('editorial');
    setSections(DEFAULT_SECTIONS);
  };

  return (
    <CustomizerContext.Provider
      value={{
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
        resetDefaults,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
};

export const useCustomizer = () => {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
};
