import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Search } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export const LanguageSelector: React.FC = () => {
  const { currentLang, currentLangInfo, setLanguage, availableLanguages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [customIataInput, setCustomIataInput] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApplyCustomCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (customIataInput.trim()) {
      setLanguage(customIataInput.trim());
      setCustomIataInput('');
      setIsOpen(false);
    }
  };

  const handleSelectLanguage = (code: string) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 transition-colors shadow-2xs"
        title="Canviar idioma (Codi IATA/ISO)"
      >
        <Globe className="w-3.5 h-3.5 text-brand-600 shrink-0" />
        <span className="font-semibold uppercase">{currentLangInfo.code}</span>
        <span className="text-sm leading-none">{currentLangInfo.flag}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-3 text-xs animate-in fade-in zoom-in-95 duration-150">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
            Selector d'Idioma (Mode IATA)
          </div>

          {/* Direct IATA Code Input */}
          <form onSubmit={handleApplyCustomCode} className="mb-3">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Introdueix codi IATA (ex. en, ja, de)..."
                value={customIataInput}
                onChange={(e) => setCustomIataInput(e.target.value)}
                maxLength={5}
                className="w-full pl-8 pr-14 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono uppercase"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <button
                type="submit"
                disabled={!customIataInput.trim()}
                className="absolute right-1 px-2 py-0.5 bg-brand-600 text-white rounded text-[10px] font-semibold hover:bg-brand-700 disabled:opacity-40"
              >
                Aplicar
              </button>
            </div>
          </form>

          {/* Top 10 Most Spoken Languages List */}
          <div className="text-[11px] font-semibold text-slate-500 mb-1.5 px-1">
            Top Idiomes Més Parlats:
          </div>

          <div className="max-h-60 overflow-y-auto space-y-0.5 pr-1">
            {availableLanguages.map((lang) => {
              const isSelected = currentLang.toLowerCase() === lang.code.toLowerCase();
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                    isSelected
                      ? 'bg-brand-50 text-brand-900 font-semibold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-base leading-none shrink-0">{lang.flag}</span>
                    <div className="truncate">
                      <div className="font-medium text-slate-900 truncate">
                        {lang.nativeName}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {lang.name} {lang.speakersRank ? `(Top #${lang.speakersRank})` : ''}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200">
                      {lang.code.toUpperCase()}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-brand-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
