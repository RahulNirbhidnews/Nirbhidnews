import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationDict, translations } from '../utils/translations';
import { Article } from '../types';
import { getTranslatedArticle, subscribeToTranslations } from '../utils/articleTranslations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDict;
  translateCategory: (slug: string, fallbackName?: string) => string;
  translateArticle: (article: Article) => Article;
  translationVersion: number;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'nirbhid_language_pref';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
    if (saved && (saved === 'mr' || saved === 'en' || saved === 'hi')) {
      return saved;
    }
    return 'mr'; // Marathi by default
  });

  const [translationVersion, setTranslationVersion] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = subscribeToTranslations(() => {
      setTranslationVersion((prev) => prev + 1);
    });
    return unsubscribe;
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const currentTranslations = translations[language] || translations.mr;

  const translateCategory = (slug: string, fallbackName?: string): string => {
    if (!slug) return fallbackName || '';
    const cleanSlug = slug.toLowerCase().trim();
    if (currentTranslations.categoryNames[cleanSlug]) {
      return currentTranslations.categoryNames[cleanSlug];
    }
    return fallbackName || slug;
  };

  const translateArticle = (article: Article): Article => {
    return getTranslatedArticle(article, language);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: currentTranslations,
        translateCategory,
        translateArticle,
        translationVersion,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
