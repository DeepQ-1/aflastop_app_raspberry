import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const FLAGS: Record<string, string> = {
  hr: '🇭🇷',
  en: '🇬🇧',
  de: '🇩🇪',
  fr: '🇫🇷',
  it: '🇮🇹',
  hu: '🇭🇺',
  es: '🇪🇸',
  zh: '🇨🇳'
};

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { theme } = useTheme();

  // Split languages into rows of 4
  const rows = availableLanguages.reduce<Array<typeof availableLanguages>>((acc, lang, i) => {
    const rowIndex = Math.floor(i / 4);
    acc[rowIndex] = acc[rowIndex] || [];
    acc[rowIndex].push(lang);
    return acc;
  }, []);

  return (
    <div className="space-y-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex-1 p-2 rounded-lg flex items-center justify-center transition-colors relative ${
                currentLanguage === lang.code
                  ? theme === 'green' 
                    ? 'bg-[#EEF7D1]' 
                    : 'bg-gray-200'
                  : theme === 'green'
                    ? 'bg-white border border-[#EEF7D1] hover:bg-[#EEF7D1]'
                    : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span className="text-2xl">{FLAGS[lang.code]}</span>
              {currentLanguage === lang.code && (
                <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                  theme === 'green' ? 'bg-[#547758]' : 'bg-blue-500'
                }`} />
              )}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};