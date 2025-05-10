import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Check, AlertTriangle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { saveTestResult } from '../utils/storage';
import { TestResult } from '../types/test';
import { useLayout } from '../context/LayoutContext';
import { useTrayStatus } from '../context/TrayStatusContext';
import { useTheme } from '../context/ThemeContext';

type TestingState = 'instructions' | 'testing' | 'success' | 'warning' | 'positive';

const generateTestId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
};

export const Testing: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [state, setState] = useState<TestingState>('instructions');
  const { setTestId } = useLayout();
  const [currentTestId, setCurrentTestId] = useState('');
  const { isTrayOpen } = useTrayStatus();
  const { theme } = useTheme();

  // Redirect to home if tray is open
  useEffect(() => {
    if (isTrayOpen) {
      navigate('/');
    }
  }, [isTrayOpen, navigate]);

  useEffect(() => {
    return () => {
      setTestId('');
    };
  }, [setTestId]);

  const startTesting = async () => {
    setState('testing');
    const newTestId = generateTestId();
    const formattedId = `${newTestId.slice(0, 3)}-${newTestId.slice(3)}`;
    setCurrentTestId(newTestId);
    setTestId(formattedId);

    try {
      // Execute the test script
      const scriptName = 'dependency_scripts/gen_mask_test.sh';
      const result = await window.electron.invoke('execute-script', scriptName);

      // Parse the result to extract test status and pixel count
      const statusMatch = result.match(/TEST_STATUS: (\w+)/);
      const pixelMatch = result.match(/TEST_PIXEL_COUNT: (\d+)/);

      if (statusMatch && statusMatch[1]) {
        const testResult: TestResult = statusMatch[1] as TestResult;

        // Set state based on test result
        setState(
          testResult === 'UREDAN' ? 'success' :
          testResult === 'SUMNJIV' ? 'warning' : 'positive'
        );


        // Save test result to history
        saveTestResult({
          id: newTestId,
          date: new Date().toLocaleString(),
          result: testResult
        });
      } else {
        // Default to warning if parsing fails
        setState('warning');
        saveTestResult({
          id: newTestId,
          date: new Date().toLocaleString(),
          result: 'SUMNJIV'
        });
      }
    } catch (error) {
      console.error('Testing error:', error);
      setState('warning');
      saveTestResult({
        id: newTestId,
        date: new Date().toLocaleString(),
        result: 'SUMNJIV'
      });
    }
  };

  const getResultContent = () => {
    switch (state) {
      case 'success':
        return {
          icon: <Check className="w-20 h-20 text-green-500" />,
          text: t('testing.results.normal')
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-20 h-20 text-yellow-500" />,
          text: t('testing.results.suspicious')
        };
      case 'positive':
        return {
          icon: <X className="w-20 h-20 text-red-500" />,
          text: t('testing.results.positive')
        };
      default:
        return null;
    }
  };

  const handleFinish = () => {
    navigate('/');
  };

  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-4">
        {state === 'instructions' && (
          <>
            <div className="space-y-4 mb-12 w-full">
              <ol className="space-y-4 text-2xl">
                <li>{t('testing.instructions.step1')}</li>
                <li>{t('testing.instructions.step2')}</li>
                <li>{t('testing.instructions.step3')}</li>
              </ol>
            </div>
            <button
              onClick={startTesting}
              className="w-full bg-gray-100 py-6 px-8 text-3xl font-bold rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t('testing.buttons.start')}
            </button>
          </>
        )}

        {state === 'testing' && (
          <div className="text-center">
            <Search className="w-20 h-20 mb-8 animate-pulse mx-auto" style={{color: "#9ca3af"}} />
            <h2 className="text-3xl font-bold mb-4">{t('testing.inProgress.message')}</h2>
            <p className="text-2xl font-medium" style={{
              color: theme === 'dark' ? "#ffffff" : "#4b5563" // Brighter in dark theme
            }}>{t('testing.inProgress.wait')}</p>
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full bg-gray-300 ${
                    i === 2 ? 'bg-gray-500' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {getResultContent() && (
          <div className="text-center">
            <div className="flex justify-center mb-8">
              {getResultContent()?.icon}
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {t('testing.results.title')}
              <br />
              {getResultContent()?.text}
            </h2>

            <div className="flex gap-4 w-full">
              <button
                onClick={startTesting}
                className="flex-1 bg-gray-100 py-6 px-8 text-3xl font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('testing.buttons.retry')}
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 bg-gray-200 py-6 px-8 text-3xl font-bold rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t('testing.buttons.finish')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
