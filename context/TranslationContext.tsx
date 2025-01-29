import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as Localization from 'expo-localization';
import { en } from '@/translations/en';
import { nl } from '@/translations/nl';

type Language = 'en' | 'nl';
type Translations = typeof en;

type TranslationContextType = {
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  en,
  nl,
};

function getDeviceLanguage(): Language {
  // Get the device locale (e.g., 'en-US' or 'nl-NL')
  const locale = Localization.locale;
  // Get the primary language part (e.g., 'en' or 'nl')
  const primaryLanguage = locale.split('-')[0];
  
  // Check if the device language is supported, default to 'en' if not
  return primaryLanguage === 'nl' ? 'nl' : 'en';
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getDeviceLanguage());

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
} 