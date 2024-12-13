import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCalibration } from '../context/CalibrationContext';

type CalibrationState = 'instructions' | 'calibrating' | 'success' | 'failure';

export const Calibration: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setIsCalibrated } = useCalibration();
  const [state, setState] = useState<CalibrationState>('instructions');

  const startCalibration = () => {
    setState('calibrating');
    // Simulate calibration process
    setTimeout(() => {
      // Randomly choose success or failure
      setState(Math.random() > 0.5 ? 'success' : 'failure');
    }, 2000);
  };

  const handleFinish = () => {
    if (state === 'success') {
      setIsCalibrated(true);
    }
    navigate('/');
  };

  const handleRetry = () => {
    setState('instructions');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {state === 'instructions' && (
          <>
            <div className="space-y-4 mb-8">
              <ol className="text-left space-y-2 text-2xl">
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
          <>
            <Target className="w-20 h-20 text-gray-400 mb-8 animate-pulse" />
            <h2 className="text-3xl font-bold mb-4">{t('calibration.inProgress.message')}</h2>
            <p className="text-gray-600 text-2xl">{t('calibration.inProgress.wait')}</p>
          </>
        )}

        {state === 'success' && (
          <>
            <Check className="w-20 h-20 text-green-400 mb-8" />
            <h2 className="text-3xl text-green-600 font-bold mb-8">{t('calibration.success.message')}</h2>
            <button
              onClick={handleFinish}
              className="w-full bg-gray-100 py-6 px-8 text-3xl font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t('calibration.buttons.finish')}
            </button>
          </>
        )}

        {state === 'failure' && (
          <>
            {/* <X className="w-20 h-20 text-gray-400 mb-8" /> */}
            <h2 className="text-3xl text-red-600 font-bold mb-4">{t('calibration.failure.message')}</h2>
            <p className="text-gray-600 mb-8 text-xl">
              {t('calibration.failure.instructions')}
            </p>
            <div className="flex gap-4 w-full max-w-xs">
              <button
                onClick={handleRetry}
                className="flex-1 bg-gray-100 py-6 px-8 text-3xl font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('calibration.buttons.retry')}
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 bg-gray-100 py-6 px-8 text-3xl font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('calibration.buttons.finish')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
