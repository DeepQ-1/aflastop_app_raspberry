import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LayoutContextType {
  testId: string;
  setTestId: (id: string) => void;
}

export const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [testId, setTestId] = useState('');

  return (
    <LayoutContext.Provider value={{ testId, setTestId }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};