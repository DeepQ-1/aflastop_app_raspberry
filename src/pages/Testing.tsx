import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Check, AlertTriangle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { saveTestResult } from '../utils/storage';
import { TestResult } from '../types/test';
import { useLayout } from '../context/LayoutContext';

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

  useEffect(() => {
    return () => {
      setTestId('');
    };
  }, [setTestId]);

  const startTesting = () => {
    setState('testing');
    const newTestId = generateTestId();
    const formattedId = `${newTestId.slice(0, 3)}-${newTestId.slice(3)}`;
    setCurrentTestId(newTestId);
    setTestId(formattedId);
    
    setTimeout(() => {
      const results: TestingState[] = ['success', 'warning', 'positive'];
      const result = results[Math.floor(Math.random() * results.length)];
      setState(result);
      
      const testResult: TestResult = 
        result === 'success' ? 'UREDAN' :
        result === 'warning' ? 'SUMNJIV' : 'POZITIVAN';
        
      saveTestResult({
        id: newTestId,
        date: new Date().toLocaleString(),
        result: testResult
      });
    }, 2000);
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
            <Search className="w-20 h-20 text-gray-400 mb-8 animate-pulse mx-auto" />
            <h2 className="text-3xl font-bold mb-4">{t('testing.inProgress.message')}</h2>
            <p className="text-gray-600 text-2xl">{t('testing.inProgress.wait')}</p>
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
            <h2 className="text-3xl font-bold mb-8">
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