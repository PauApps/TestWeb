import { PsychologyContent } from './types';
import { ca } from './ca';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { zh } from './zh';
import { hi } from './hi';
import { ar } from './ar';
import { bn } from './bn';
import { pt } from './pt';
import { ru } from './ru';
import { ur } from './ur';
import { de } from './de';
import { it } from './it';
import { ja } from './ja';

export * from './types';

export const PSYCHOLOGY_TRANSLATIONS: Record<string, PsychologyContent> = {
  ca,
  en,
  es,
  fr,
  zh,
  hi,
  ar,
  bn,
  pt,
  ru,
  ur,
  de,
  it,
  ja,
};

export function getPsychologyContent(langCode: string): PsychologyContent {
  const code = (langCode || '').toLowerCase().trim();
  if (PSYCHOLOGY_TRANSLATIONS[code]) {
    return PSYCHOLOGY_TRANSLATIONS[code];
  }
  // If language has regional subcode (e.g. pt-BR -> pt, zh-CN -> zh, en-US -> en)
  const shortCode = code.split('-')[0];
  if (PSYCHOLOGY_TRANSLATIONS[shortCode]) {
    return PSYCHOLOGY_TRANSLATIONS[shortCode];
  }
  // Default fallback to Catalan or English
  return PSYCHOLOGY_TRANSLATIONS['ca'] || PSYCHOLOGY_TRANSLATIONS['en'];
}
