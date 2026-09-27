import React, { useState, useEffect } from 'react';
import {
  Layers,
  Maximize2,
  Minimize2,
  HelpCircle,
  Share2,
  FileText,
  Sparkles,
} from 'lucide-react';
import { PROTOTYPES } from './prototypes/registry';
import { ToastProvider, Modal, Button } from './components/ui';
import { I18nProvider } from './i18n/I18nContext';
import { LanguageSelector } from './components/LanguageSelector';
import { PdfExportModal } from './components/PdfExportModal';
import { ShareModal } from './components/ShareModal';
import { PromptGeneratorModal } from './components/PromptGeneratorModal';

const AppContent: React.FC = () => {
  // Check URL query parameters
  const [isUrlPure, setIsUrlPure] = useState(false);

  const [activePrototypeId, setActivePrototypeId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const mockParam = urlParams.get('mock');
      if (mockParam && PROTOTYPES.some((p) => p.id === mockParam)) {
        return mockParam;
      }
      return localStorage.getItem('active_prototype_id') || 'web-psicologa';
    }
    return 'web-psicologa';
  });

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const pureParam =
        urlParams.get('pure') === 'true' ||
        urlParams.get('mode') === 'pure' ||
        urlParams.get('standalone') === 'true';
      if (pureParam) {
        setIsUrlPure(true);
      }
    }
  }, []);

  const handleSelectPrototype = (id: string) => {
    setActivePrototypeId(id);
    try {
      localStorage.setItem('active_prototype_id', id);
    } catch {
      // Ignore
    }
  };

  const activePrototype = PROTOTYPES.find((p) => p.id === activePrototypeId) || PROTOTYPES[0];
  const ActiveComponent = activePrototype?.component || (() => <div>Prototip no trobat</div>);

  // If opened via shared clean link (?pure=true), show ONLY the mock without any testing interface
  if (isUrlPure) {
    return (
      <main className="min-h-screen bg-stone-50 w-full animate-in fade-in duration-200">
        <ActiveComponent />
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* Top Hub Bar (Hideable in Fullscreen) */}
      {!isFullScreen && (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-3 sm:px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            {/* Brand & Project Info */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand-600 text-white font-bold text-base shadow-xs shadow-brand-500/20">
                🧪
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-900">
                    Proves SPA Hub
                  </span>
                  <span className="text-[10px] font-semibold bg-brand-50 text-brand-700 px-1.5 py-0.5 rounded-full border border-brand-200">
                    v1.1
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 hidden md:block">
                  Ecosistema ràpid de prototipatge
                </p>
              </div>
            </div>

            {/* Prototype Selector */}
            <div className="flex items-center gap-2 flex-1 max-w-xs sm:max-w-sm md:max-w-md justify-center">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-slate-400">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <select
                  value={activePrototypeId}
                  onChange={(e) => handleSelectPrototype(e.target.value)}
                  className="w-full pl-8 pr-7 py-1 text-xs sm:text-sm font-medium bg-slate-50 hover:bg-slate-100/80 border border-slate-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors truncate"
                >
                  {PROTOTYPES.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.category}] {p.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Tools */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* 1. IATA Language Selector */}
              <LanguageSelector />

              {/* 2. Visió General & PDF */}
              <button
                onClick={() => setIsPdfOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 transition-colors shadow-2xs cursor-pointer"
                title="Visió General del Mock i Exportació a PDF"
              >
                <FileText className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span className="hidden sm:inline">Visió General</span>
              </button>

              {/* 3. Generar Prompt IA */}
              <button
                onClick={() => setIsPromptOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-300 text-purple-800 transition-colors shadow-2xs cursor-pointer"
                title="Generar Prompt per a IA triant quines seccions implementar"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="hidden md:inline">Generar Prompt</span>
              </button>

              {/* 4. Share Pure Link */}
              <button
                onClick={() => setIsShareOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 transition-colors shadow-2xs cursor-pointer"
                title="Compartir Mock (Mode Net)"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="hidden sm:inline">Compartir</span>
              </button>

              {/* 4. Fullscreen / Pure Toggle */}
              <button
                onClick={() => setIsFullScreen(true)}
                title="Mode Mock Pur (Amagar Barra Hub)"
                className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 transition-colors shadow-2xs"
              >
                <Maximize2 className="w-3.5 h-3.5 mr-0.5" />
                <span>Mode Pur</span>
              </button>

              {/* Help Guide */}
              <button
                onClick={() => setIsHelpOpen(true)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                title="Com crear un nou mock"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Floating Restore Button when in FullScreen */}
      {isFullScreen && (
        <button
          onClick={() => setIsFullScreen(false)}
          className="fixed top-4 right-4 z-50 bg-slate-900/85 hover:bg-slate-900 text-white px-3 py-2 rounded-xl shadow-xl backdrop-blur-xs transition-transform hover:scale-105 flex items-center gap-1.5 text-xs font-medium"
          title="Restaurar Barra Hub"
        >
          <Minimize2 className="w-3.5 h-3.5" />
          <span>Restaurar Barra</span>
        </button>
      )}

      {/* Main Prototype Viewport */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-150">
        <ActiveComponent />
      </main>

      {/* Modals */}
      <PdfExportModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        prototype={activePrototype}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        prototype={activePrototype}
      />

      <PromptGeneratorModal
        isOpen={isPromptOpen}
        onClose={() => setIsPromptOpen(false)}
        prototype={activePrototype}
      />

      {/* Help Modal */}
      <Modal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="Com utilitzar l'ecosistema i crear nous mocks"
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-600">
          <p>
            Aquest ecosistema està dissenyat per provar ràpidament idees de múltiples projectes amb eines avançades:
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">⚡ Generador automàtic per terminal</span>
              <p className="text-xs text-slate-600">
                Executa <code className="text-brand-600 font-mono">npm run new</code> o <code className="text-brand-600 font-mono">npm run new -- "Nom" "Categoria" "crud"</code> per crear i registrar automàticament qualsevol mock.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">🌐 Selector d'idioma en format IATA</span>
              <p className="text-xs text-slate-600">
                Canvia l'idioma al vol triant entre els 10 idiomes més parlats o escrivint qualsevol codi IATA/ISO (ex. <code>en</code>, <code>zh</code>, <code>ar</code>, <code>fr</code>, <code>es</code>).
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">📄 Exportació a PDF amb Prompts per a IA</span>
              <p className="text-xs text-slate-600">
                Fes clic a <strong>"PDF"</strong> per descarregar un dossier tècnic complet de qualsevol mock amb el resum executiu, les seccions i el prompt llest per a ChatGPT, Claude o Gemini.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">🔗 Compartir enllaç net (Sense interfície de proves)</span>
              <p className="text-xs text-slate-600">
                Fes clic a <strong>"Compartir"</strong> per obtenir un link directe que obre exclusivament la pàgina web del mock, com si fos l'aplicació final lliurada a un client.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button onClick={() => setIsHelpOpen(false)}>Entès!</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </ToastProvider>
  );
};
