import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme('default')}
        className={`flex-1 p-2 rounded-lg ${
          theme === 'default'
            ? 'bg-gray-200'
            : 'bg-gray-100 hover:bg-gray-200'
        } transition-colors relative`}
      >
        <div className="w-6 h-6 mx-auto bg-white border border-gray-300 rounded-full" />
        {theme === 'default' && (
          <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#547758] left-1/2 -translate-x-1/2" />
        )}
      </button>
      <button
        onClick={() => setTheme('green')}
        className={`flex-1 p-2 rounded-lg ${
          theme === 'green'
            ? 'bg-[#ACB983]'
            : 'bg-[#EEF7D1] hover:bg-[#ACB983]'
        } transition-colors relative`}
      >
        <div className="w-6 h-6 mx-auto bg-[#547758] border border-[#ACB983] rounded-full" />
        {theme === 'green' && (
          <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#547758] left-1/2 -translate-x-1/2" />
        )}
      </button>
    </div>
  );
};