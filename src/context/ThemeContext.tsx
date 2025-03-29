import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getThemePreference, saveThemePreference } from '../utils/storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with saved preference or dark theme as default
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = getThemePreference();
    // Handle legacy theme names (default -> light, green -> dark)
    if (savedTheme === 'default') return 'light';
    if (savedTheme === 'green') return 'dark';
    return (savedTheme as Theme) || 'dark';
  });

  // Custom setter that also saves to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    saveThemePreference(newTheme);
  };

  // Map the new theme names to the existing CSS class names for backwards compatibility
  const cssThemeClass = theme === 'light' ? 'theme-default' : 'theme-green';

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={cssThemeClass}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};