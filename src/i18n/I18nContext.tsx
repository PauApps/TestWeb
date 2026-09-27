import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TOP_LANGUAGES, TRANSLATIONS, LanguageInfo } from './languages';

interface I18nContextType {
  currentLang: string;
  currentLangInfo: LanguageInfo;
  setLanguage: (code: string) => void;
  t: (key: string, fallback?: string) => string;
  availableLanguages: LanguageInfo[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLangState] = useState<string>(() => {
    // Check URL param ?lang= first
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const paramLang = urlParams.get('lang')?.toLowerCase().trim();
      if (paramLang) return paramLang;

      const saved = localStorage.getItem('hub_language');
      if (saved) return saved.toLowerCase().trim();
    }
    return 'ca';
  });

  const setLanguage = useCallback((inputCode: string) => {
    const cleanCode = inputCode.toLowerCase().trim();
    setCurrentLangState(cleanCode);
    try {
      localStorage.setItem('hub_language', cleanCode);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const currentLangInfo: LanguageInfo = TOP_LANGUAGES.find(
    (l) => l.code.toLowerCase() === currentLang.toLowerCase()
  ) || {
    code: currentLang.toLowerCase(),
    name: currentLang.toUpperCase(),
    nativeName: currentLang.toUpperCase(),
    flag: '🌐',
    dir: ['ar', 'ur', 'he', 'fa'].includes(currentLang.toLowerCase()) ? 'rtl' : 'ltr',
  };

  // Sync RTL / LTR document direction
  useEffect(() => {
    document.documentElement.dir = currentLangInfo.dir || 'ltr';
    document.documentElement.lang = currentLangInfo.code;
  }, [currentLangInfo]);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS['ca'] || TRANSLATIONS['en'];
      if (langDict && langDict[key]) {
        return langDict[key];
      }
      if (TRANSLATIONS['ca'] && TRANSLATIONS['ca'][key]) {
        return TRANSLATIONS['ca'][key];
      }
      if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) {
        return TRANSLATIONS['en'][key];
      }
      return fallback || key;
    },
    [currentLang]
  );

  return (
    <I18nContext.Provider
      value={{
        currentLang,
        currentLangInfo,
        setLanguage,
        t,
        availableLanguages: TOP_LANGUAGES,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
