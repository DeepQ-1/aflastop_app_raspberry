import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCalibration } from '../context/CalibrationContext';
import { useTrayStatus } from '../context/TrayStatusContext';
import { useTheme } from '../context/ThemeContext';

type CalibrationState = 'instructions' | 'calibrating' | 'success' | 'failure';
// Scripts are referenced relative to electron/main.js

export const Calibration: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setIsCalibrated } = useCalibration();
  const { isTrayOpen } = useTrayStatus();
  const { theme } = useTheme();
  
  // Redirect to home if tray is open
  useEffect(() => {
    if (isTrayOpen) {
      navigate('/');
    }
  }, [isTrayOpen, navigate]);
  const [state, setState] = useState<CalibrationState>('instructions');
  const [error, setError] = useState<string | null>(null);

  const checkTrayStatus = async () => {
    try {
      // Call main process to check tray status
      const scriptName = 'dependency_scripts/check_tray_status.sh';
      const trayStatus = await window.electron.invoke('execute-script', scriptName);
      return trayStatus === 'open';
    } catch (err) {
      console.error('Error checking tray status:', err);
      setError(t('calibration.errors.trayCheck'));
      return true; // Assume tray is open on error
    }
  };

  const controlRelay = async (action: 'on' | 'off') => {
    try {
      const scriptName = action === 'on' 
        ? 'dependency_scripts/relay_on.sh' 
        : 'dependency_scripts/relay_off.sh';
      await window.electron.invoke('execute-script', scriptName);
    } catch (err) {
      console.error(`Error turning relay ${action}:`, err);
      setError(t(`calibration.errors.relay.${action}`));
    }
  };

  const startCalibration = async () => {
    setState('calibrating');
    setError(null);

    try {
      // Control relay (off, then on)
      console.log("HEYYY")
      await controlRelay('off');
      await controlRelay('on');

      // Check tray status
      if (await checkTrayStatus()) {
        console.log("HEYYY222")
        setState('failure');
        return;
      }

      // Simulate calibration process
      setTimeout(() => {
        // Randomly choose success or failure
        setState(Math.random() > 0.5 ? 'success' : 'failure');
      }, 2000);
    } catch (err) {
      console.error('Calibration error:', err);
      setState('failure');
    }
  };

  const handleFinish = () => {
    if (state === 'success') {
      setIsCalibrated(true);
    }
    navigate('/');
  };

  const handleRetry = () => {
    setState('instructions');
    setError(null);
  };

  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-4">
        {state === 'instructions' && (
          <>
            <div className="space-y-4 mb-12 w-full">
              <ol className="space-y-4 text-2xl">
                <li>{t('calibration.instructions.step1')}</li>
                <li>{t('calibration.instructions.step2')}</li>
                <li>{t('calibration.instructions.step3')}</li>
              </ol>
            </div>
            <button
              onClick={startCalibration}
              className="w-full bg-gray-100 py-6 px-8 text-3xl font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t('calibration.buttons.start')}
            </button>
          </>
        )}

        {state === 'calibrating' && (
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Target className="w-20 h-20 animate-pulse" style={{color: "#9ca3af"}} />
            </div>
            <h2 className="text-3xl font-bold mb-4">{t('calibration.inProgress.message')}</h2>
            <p className="text-2xl font-medium" style={{
              color: theme === 'dark' ? "#ffffff" : "#4b5563" // Brighter in dark theme
            }}>{t('calibration.inProgress.wait')}</p>
          </div>
        )}

        {state === 'success' && (
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Check className="w-20 h-20" style={{color: "#4ade80"}} />
            </div>
            <h2 className="text-3xl font-bold mb-8" style={{color: "#16a34a"}}>{t('calibration.success.message')}</h2>
            <button
              onClick={handleFinish}
              className="w-full bg-gray-100 py-6 px-8 text-3xl font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t('calibration.buttons.finish')}
            </button>
          </div>
        )}

        {state === 'failure' && (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <X className="w-16 h-16" style={{color: "#9ca3af"}} />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{color: "#ef4444"}}>{t('calibration.failure.message')}</h2>
            <p className="mb-3 text-lg max-h-20 overflow-hidden font-medium" style={{
              color: theme === 'dark' ? "#ffffff" : "#4b5563" // Brighter in dark theme
            }}>
              {t('calibration.failure.instructions')}
            </p>
            {error && <p className="text-red-500 text-lg mb-2">{error}</p>}
            <div className="flex gap-3 w-full">
              <button
                onClick={handleRetry}
                className="flex-1 bg-gray-100 py-4 px-4 text-2xl font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('calibration.buttons.retry')}
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 bg-gray-100 py-4 px-4 text-2xl font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('calibration.buttons.finish')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
