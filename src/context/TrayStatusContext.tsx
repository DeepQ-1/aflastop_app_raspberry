import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TrayStatusContextType {
  isTrayOpen: boolean;
  isChecking: boolean;
  error: string | null;
}

export const TrayStatusContext = createContext<TrayStatusContextType | undefined>(undefined);

export const TrayStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkTrayStatus = async () => {
    try {
      setIsChecking(true);
      setError(null);
      const scriptName = 'dependency_scripts/check_tray_status.sh';
      const trayStatus = await window.electron.invoke('execute-script', scriptName);
      console.log('Tray status response:', trayStatus);
      // Check if the output contains "Tray is OPEN"
      setIsTrayOpen(trayStatus.includes('Tray is OPEN'));
    } catch (err) {
      console.error('Error checking tray status:', err);
      setError('Failed to check tray status');
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Check tray status on component mount
    checkTrayStatus();

    // Set up interval to check tray status every 0.5 seconds
    const intervalId = setInterval(checkTrayStatus, 500);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <TrayStatusContext.Provider value={{ isTrayOpen, isChecking, error }}>
      {children}
    </TrayStatusContext.Provider>
  );
};

export const useTrayStatus = () => {
  const context = useContext(TrayStatusContext);
  if (context === undefined) {
    throw new Error('useTrayStatus must be used within a TrayStatusProvider');
  }
  return context;
};