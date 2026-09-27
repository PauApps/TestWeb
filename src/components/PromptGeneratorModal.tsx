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
} from 'lucide-react';
import { Modal, Button, Badge, useToast } from './ui';
import { PrototypeDefinition, MockSection } from '../prototypes/registry';

interface PromptGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  prototype: PrototypeDefinition;
}

export const PromptGeneratorModal: React.FC<PromptGeneratorModalProps> = ({
  isOpen,
  onClose,
  prototype,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Track which sections are selected by title
  const [selectedSectionTitles, setSelectedSectionTitles] = useState<string[]>(() => {
    return prototype.sections ? prototype.sections.map((s) => s.title) : [];
  });

  // Re-sync when prototype changes
  React.useEffect(() => {
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

    const sectionsList = selectedSections.length > 0
      ? selectedSections
          .map((s, idx) => `### ${idx + 1}. ${s.title}\n- **Objectiu i contingut**: ${s.description}`)
          .join('\n\n')
      : '(No s\'ha seleccionat cap secció específica. Implementa una estructura completa basada en la visió general.)';

    return `# PROMPT PER A LA CREACIÓ DEL LLOC WEB: ${prototype.title.toUpperCase()}

Actua com un enginyer de programari sènior i dissenyador UI/UX d'alt nivell especialitzat en desenvolupament web modern.
Crea el codi complet, funcional, elegant i llest per a producció d'aquesta pàgina web seguint estrictament les especificacions següents:

---

## 1. VISIÓ GENERAL DEL PROJECTE
- **Nom del Projecte**: ${prototype.title}
- **Categoria**: ${prototype.category}
- **Descripció**: ${prototype.description}
- **Visió Global i Propòsit**:
${prototype.overview || prototype.description}

---

## 2. STACK TECNOLÒGIC I ARQUITECTURA
- **Stack escollit**: ${frameworkDesc[framework]}
- **Idioma del contingut**: ${langNames[language]}
- **Disseny visual**: Modern, professional, responsive (mòbil, tauleta i escriptori), accessible (WCAG AA), amb espaiat generós, transicions suaus i paleta de colors coherent amb la temàtica.
${includeMockData ? '- **Dades simulades**: Inclou estats i dades realistes directament al codi (no facis servir "Lorem ipsum" genèric; utilitza contingut professional i creïble).' : ''}

---

## 3. SECCIONS SELECCIONADES PER IMPLEMENTAR
Implementa amb detall cadascuna de les ${selectedSections.length} seccions seleccionades a continuació:

${sectionsList}

---

## 4. REQUISITS FUNCIONALS I DE DISSENY
1. **Responsivitat Total**: La interfície s'ha d'adaptar perfectament des de pantalles mòbils petites fins a monitors amples (mobile-first).
2. **Interactivitat**:
   - Tots els botons, selectors, formularis i modals han de tenir estats interactius actius (hover, focus, disabled, active).
   - Validació de camps requerits als formularis amb missatges de confirmació amigables.
   - Microinteraccions suaus amb Tailwind CSS (\`transition-all\`, \`duration-200\`, \`shadow-sm\` / \`shadow-md\`).
3. **Credibilitat i Detall**:
   - Si és una web professional, inclou elements de confiança (número de col·legiació si aplica, ubicació, política de privadesa, modalitats clares de preus).
   - Al peu de pàgina (footer), inclou una referència professional indicant que la web ha estat dissenyada per PauApps.
4. **Qualitat del Codi**:
   - Codi net, modular, ben estructurat i amb comentaris explicatius dels blocs principals.
   - Lliura el codi complet sense ometre cap apartat amb "TODO" o comentaris que tallin la implementació.
`;
  }, [prototype, selectedSectionTitles, framework, language, includeMockData, allSections]);

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
      title="Generador de Prompt per a IA"
      maxWidth="xl"
    >
      <div className="space-y-5 text-slate-800 text-xs sm:text-sm max-h-[78vh] overflow-y-auto pr-1">
        {/* Header Banner */}
        <div className="p-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-300 shrink-0" />
              <h3 className="font-bold text-base text-white">Generar Prompt del Mock</h3>
              <Badge variant="info">{prototype.category}</Badge>
            </div>
            <p className="text-purple-200 text-xs mt-1">
              Tria quines seccions vols incloure i obtindràs un prompt d'alta qualitat per generar aquesta web amb qualsevol IA.
            </p>
          </div>
          <Button
            size="sm"
            onClick={handleCopy}
            className="bg-purple-600 hover:bg-purple-500 text-white shrink-0 shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-1.5 text-emerald-300" />
                Copiat!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-1.5" />
                Copiar Prompt
              </>
            )}
          </Button>
        </div>

        {/* 1. Selector de Seccions */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>1. Tria quines seccions vols implementar</span>
              <span className="text-xs font-normal text-slate-500">
                ({selectedSectionTitles.length} de {allSections.length} seleccionades)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[11px] font-semibold text-purple-700 hover:text-purple-900 hover:underline"
              >
                Seleccionar totes
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={handleDeselectAll}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 hover:underline"
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

        {/* 2. Preferències del Prompt */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Settings2 className="w-4 h-4 text-indigo-600" />
            <span>2. Preferències de generació</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Stack / Framework
              </label>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value as any)}
                className="w-full text-xs font-medium px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="w-full text-xs font-medium px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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

        {/* 3. Previsualització del Prompt Generat */}
        <div className="space-y-2 bg-slate-900 text-slate-100 p-4 rounded-2xl border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-purple-300 text-sm">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>3. Prompt Resultant (Llest per a ChatGPT, Claude, Gemini, v0)</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              {generatedPrompt.length} caràcters • {generatedPrompt.split(/\s+/).length} paraules
            </div>
          </div>

          <div className="relative mt-2">
            <pre className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-200 overflow-x-auto max-h-60 whitespace-pre-wrap select-all">
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
