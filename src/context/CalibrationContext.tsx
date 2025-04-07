import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CalibrationContextType {
  isCalibrated: boolean;
  setIsCalibrated: (value: boolean) => void;
}

const CalibrationContext = createContext<CalibrationContextType | undefined>(undefined);

export const CalibrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from localStorage
  const [isCalibrated, setIsCalibrated] = useState(() => {
    try {
      // Import dynamically to avoid circular dependencies
      const { getCalibrationStatus } = require('../utils/storage');
      return getCalibrationStatus();
    } catch (error) {
      console.error('Failed to get calibration status from storage:', error);
      return false;
    }
  });

  // Save to localStorage when changed
  const handleSetIsCalibrated = (value: boolean) => {
    try {
      const { saveCalibrationStatus } = require('../utils/storage');
      saveCalibrationStatus(value);
      setIsCalibrated(value);
    } catch (error) {
      console.error('Failed to save calibration status:', error);
      setIsCalibrated(value);
    }
  };

  // Control UART based on calibration status
  useEffect(() => {
    const controlUart = async () => {
      try {
        // Turn UART off if not calibrated, on if calibrated
        const script = isCalibrated ? 'dependency_scripts/relay_on.sh' : 'dependency_scripts/relay_off.sh';
        console.log(`Setting UART state based on calibration: ${isCalibrated ? 'ON' : 'OFF'}`);
        await window.electron.invoke('execute-script', script);
      } catch (error) {
        console.error('Failed to control UART:', error);
      }
    };

    controlUart();
  }, [isCalibrated]);

  return (
    <CalibrationContext.Provider value={{ isCalibrated, setIsCalibrated: handleSetIsCalibrated }}>
      {children}
    </CalibrationContext.Provider>
  );
};

export const useCalibration = () => {
  const context = useContext(CalibrationContext);
  if (context === undefined) {
    throw new Error('useCalibration must be used within a CalibrationProvider');
  }
  return context;
};