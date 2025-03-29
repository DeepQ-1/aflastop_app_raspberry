import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex gap-3">
      <button
        onClick={() => setTheme('light')}
        className={`flex-1 py-3 px-2 rounded-lg text-xl font-bold ${
          theme === 'light'
            ? 'bg-gray-200 border border-gray-400'
            : 'bg-gray-100 hover:bg-gray-200'
        } transition-colors`}
        style={{ 
          color: theme === 'light' ? '#4b5563' : '#6b7280'
        }}
      >
{t('settings.themes.light')}
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`flex-1 py-3 px-2 rounded-lg text-xl font-bold ${
          theme === 'dark'
            ? 'bg-[#3a3f4b] border border-[#547758]'
            : 'bg-[#292d37] hover:bg-[#3a3f4b]'
        } transition-colors`}
        style={{ 
          color: theme === 'dark' ? '#ffffff' : '#9ca3af'
        }}
      >
{t('settings.themes.dark')}
      </button>
    </div>
  );
};