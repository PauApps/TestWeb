import React from 'react';
import {
  X,
  Shuffle,
  Palette,
  User,
  MapPin,
  Target,
  Layers,
  Sparkles,
  RotateCcw,
  Check,
  CheckSquare,
  Square,
} from 'lucide-react';
import {
  useCustomizer,
  COLOR_PALETTES,
  DESIGN_STYLES,
  SectionVisibility,
} from '../context/CustomizerContext';
import { useToast } from './ui';

interface LiveCustomizerDrawerProps {
  onOpenPromptModal: () => void;
}

const SECTION_LABELS: { key: keyof SectionVisibility; label: string; desc: string }[] = [
  { key: 'topBar', label: 'Barra Superior de Confiança', desc: 'Dades oficials de col·legiació (COPC) i 1a sessió gratuïta' },
  { key: 'hero', label: 'Hero Principal & Foto', desc: 'Encapçalament de benvinguda, imatge i botó de reserva' },
  { key: 'values', label: 'Pilars Terapèutics', desc: '3 targetes de principis: acceptació, eines i rigor' },
  { key: 'specialties', label: 'Especialitats Interactivas', desc: 'Selector de motius de consulta (ansietat, autoestima, parella...)' },
  { key: 'about', label: 'Sobre Mi & Despatx', desc: 'Trajectòria clínica, formació i fotografia de la consulta' },
  { key: 'methodology', label: 'Metodologia Pas a Pas', desc: 'Les 4 fases del procés terapèutic transparent' },
  { key: 'pricing', label: 'Tarifes i Modalitats', desc: 'Taula de preus clara (Online, Presencial, Parella)' },
  { key: 'testimonials', label: 'Testimonis de Pacients', desc: 'Ressenyes i experiències clíniques' },
  { key: 'faq', label: 'Preguntes Freqüents (FAQ)', desc: 'Acordió desplegable amb els dubtes més habituals' },
  { key: 'ctaBanner', label: 'Banner de Contacte Final', desc: 'Crida a l\'acció final per demanar la 1a sessió' },
  { key: 'footer', label: 'Peu de Pàgina & PauApps', desc: 'Horaris, adreça, legal i referència PauApps' },
];

export const LiveCustomizerDrawer: React.FC<LiveCustomizerDrawerProps> = ({
  onOpenPromptModal,
}) => {
  const {
    customTitle,
    setCustomTitle,
    customProfessional,
    setCustomProfessional,
    customLocation,
    setCustomLocation,
    customNiche,
    setCustomNiche,
    paletteId,
    setPaletteId,
    styleId,
    setStyleId,
    sections,
    toggleSection,
    setAllSections,
    randomizeVariation,
    resetDefaults,
    isDrawerOpen,
    setIsDrawerOpen,
  } = useCustomizer();

  const { toast } = useToast();

  if (!isDrawerOpen) return null;

  const handleRandomize = () => {
    randomizeVariation();
    toast('✨ S\'ha aplicat una nova variació a la web en viu!', 'info');
  };

  const handleReset = () => {
    resetDefaults();
    toast('Valors restablerts per defecte.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-sm">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-sm text-white">Personalitzador en Viu</h2>
                <p className="text-[11px] text-purple-200">Edita i veuràs els canvis al mock a temps real</p>
              </div>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick 1-Click Action Bar */}
          <div className="p-3 bg-purple-50/80 border-b border-purple-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleRandomize}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-all hover:scale-[1.01] cursor-pointer"
              title="Aplica una nova combinació de nom, ciutat, colors i estil a l'instant"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>🎲 Variació Ràpida (1 Clic)</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-2 text-xs font-medium rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 transition-colors shadow-2xs cursor-pointer flex items-center gap-1"
              title="Restablir configuració original"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Restablir</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-slate-700">
            {/* 1. Dades de Marca */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs tracking-wide uppercase">
                <User className="w-3.5 h-3.5 text-purple-600" />
                <span>1. Nom & Identitat de Marca</span>
              </div>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Títol del lloc web
                  </label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Ex. Neus Solé Psicologia"
                    className="w-full text-xs font-medium px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Nom de la Professional o Equip
                  </label>
                  <input
                    type="text"
                    value={customProfessional}
                    onChange={(e) => setCustomProfessional(e.target.value)}
                    placeholder="Ex. Neus Solé"
                    className="w-full text-xs font-medium px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>Ubicació i Modalitat</span>
                  </label>
                  <input
                    type="text"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    placeholder="Ex. Barcelona (Eixample) & Online"
                    className="w-full text-xs font-medium px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Target className="w-3 h-3 text-slate-400" />
                    <span>Nínxol / Especialitat Clau</span>
                  </label>
                  <input
                    type="text"
                    value={customNiche}
                    onChange={(e) => setCustomNiche(e.target.value)}
                    placeholder="Ex. Adults, parelles i ansietat laboral"
                    className="w-full text-xs font-medium px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* 2. Colors Base */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs tracking-wide uppercase">
                  <Palette className="w-3.5 h-3.5 text-indigo-600" />
                  <span>2. Colors Base del Lloc Web</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {COLOR_PALETTES.map((pal) => {
                  const isSelected = paletteId === pal.id;
                  return (
                    <div
                      key={pal.id}
                      onClick={() => setPaletteId(pal.id)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-purple-50/70 border-purple-500 ring-2 ring-purple-500/20 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-[11px] text-slate-900 truncate">
                          {pal.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />}
                      </div>

                      {/* Swatches */}
                      <div className="flex items-center gap-1 mb-1.5">
                        {pal.previewColors.map((col, idx) => (
                          <div
                            key={idx}
                            className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                            style={{ backgroundColor: col }}
                          />
                        ))}
                      </div>

                      <p className="text-[10px] text-slate-500 line-clamp-1">
                        {pal.badge}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Estil Visual */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>3. Estil Visual (Look & Feel)</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {DESIGN_STYLES.map((st) => {
                  const isSelected = styleId === st.id;
                  return (
                    <div
                      key={st.id}
                      onClick={() => setStyleId(st.id)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-purple-50/70 border-purple-500 text-slate-900 ring-2 ring-purple-500/20 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-900">{st.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                        {st.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Seccions Visibles */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs tracking-wide uppercase">
                  <Layers className="w-3.5 h-3.5 text-purple-600" />
                  <span>4. Seccions Visibles al Mock</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setAllSections(true)}
                    className="text-purple-700 font-semibold hover:underline cursor-pointer"
                  >
                    Totes
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => setAllSections(false)}
                    className="text-slate-500 font-semibold hover:underline cursor-pointer"
                  >
                    Cap
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                {SECTION_LABELS.map((sec) => {
                  const isVisible = sections[sec.key];
                  return (
                    <div
                      key={sec.key}
                      onClick={() => toggleSection(sec.key)}
                      className={`p-2 rounded-xl border cursor-pointer transition-all flex items-start gap-2 ${
                        isVisible
                          ? 'bg-purple-50/50 border-purple-200 text-slate-900'
                          : 'bg-white border-slate-200 text-slate-400 opacity-60'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0 text-purple-600">
                        {isVisible ? (
                          <CheckSquare className="w-4 h-4 text-purple-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[11px] text-slate-900">{sec.label}</div>
                        <div className="text-[10px] text-slate-500 truncate">{sec.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <button
              type="button"
              onClick={() => {
                setIsDrawerOpen(false);
                onOpenPromptModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-all cursor-pointer hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>Generar Prompt amb aquests Canvis</span>
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Tots els canvis es mostren immediatament a la pantalla sense recarregar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
