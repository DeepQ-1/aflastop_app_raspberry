import React from 'react';
import { Check, AlertTriangle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getTestHistory } from '../utils/storage';
import { TestResult } from '../types/test';

export const History: React.FC = () => {
  const { t } = useTranslation();
  const history = getTestHistory();

  const getResultIcon = (result: TestResult) => {
    switch (result) {
      case 'UREDAN':
        return <Check className="w-12 h-12 text-green-500" />;
      case 'SUMNJIV':
        return <AlertTriangle className="w-12 h-12 text-yellow-500" />;
      case 'POZITIVAN':
        return <X className="w-12 h-12 text-red-500" />;
    }
  };

  const formatTestId = (id: string) => {
    return `${id.slice(0, 3)}-${id.slice(3)}`;
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex-1 overflow-y-auto pr-8 -mt-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-6 text-2xl font-bold text-gray-900 w-[40%]">
                {t('history.headers.date')}
              </th>
              <th className="text-center py-6 text-2xl font-bold text-gray-900 w-[30%]">
                {t('history.headers.id')}
              </th>
              <th className="text-right py-6 text-2xl font-bold text-gray-900 w-[30%]">
                {t('history.headers.result')}
              </th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-500 text-2xl">
                  {t('history.noData')}
                </td>
              </tr>
            ) : (
              history.map((record, index) => (
                <tr key={index} className="border-b">
                  <td className="py-6 text-gray-900 text-2xl">{record.date}</td>
                  <td className="py-6 text-center font-mono text-gray-600 text-3xl">
                    {formatTestId(record.id)}
                  </td>
                  <td className="py-6">
                    <div className="flex justify-end">
                      {getResultIcon(record.result)}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
