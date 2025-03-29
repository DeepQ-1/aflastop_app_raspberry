import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { getLanguagePreference, saveLanguagePreference } from '../utils/storage';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  availableLanguages: { code: string; name: string; }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  
  // Initialize with saved preference or default to current i18n language
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = getLanguagePreference();
    if (savedLanguage) {
      // Apply saved language immediately
      i18n.changeLanguage(savedLanguage);
      return savedLanguage;
    }
    return i18n.language;
  });

  const availableLanguages = [
    { code: 'hr', name: 'Hrvatski' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' },
    { code: 'hu', name: 'Magyar' },
    { code: 'es', name: 'Español' },
    { code: 'zh', name: '中文' }
  ];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    saveLanguagePreference(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};