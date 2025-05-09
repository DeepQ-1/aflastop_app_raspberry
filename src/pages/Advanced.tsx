import React from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getTestHistory } from '../utils/storage';
import { TestResult } from '../types/test';
import { useTheme } from '../context/ThemeContext';

export const Advanced: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const history = getTestHistory();
  
  // Theme-based colors
  const isDarkTheme = theme === 'dark';
  const cardBgColor = isDarkTheme ? 'rgb(51, 55, 65)' : 'white';
  const textColor = isDarkTheme ? 'white' : 'text-gray-600';
  const headingColor = isDarkTheme ? 'white' : 'text-gray-900';
  const progressBgColor = isDarkTheme ? 'rgb(61, 65, 75)' : 'bg-gray-200';
  
  // Calculate statistics
  const totalTests = history.length;
  const results = history.reduce((acc: Record<TestResult, number>, curr) => {
    acc[curr.result] = (acc[curr.result] || 0) + 1;
    return acc;
  }, {} as Record<TestResult, number>);

  // Working hours calculation
  const totalHours = 1600;
  const usedHours = 700;
  const remainingHours = totalHours - usedHours;

  // Prepare data for pie chart
  const pieData = [
    { name: t('advanced.results.normal'), value: results['UREDAN'] || 0, color: '#22c55e' },
    { name: t('advanced.results.suspicious'), value: results['SUMNJIV'] || 0, color: '#eab308' },
    { name: t('advanced.results.positive'), value: results['POZITIVAN'] || 0, color: '#ef4444' }
  ];

  return (
    <div className="grid grid-cols-2 gap-8 h-full p-6">
      <div className="space-y-8">
        <div className="p-6 rounded-lg shadow" style={{ backgroundColor: cardBgColor }}>
          <h3 className="text-3xl font-bold mb-4">{t('advanced.workingHours')}</h3>
          <div className="space-y-4">
            <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor: progressBgColor }}>
              <div 
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${(usedHours / totalHours) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xl" style={{ color: isDarkTheme ? 'white' : '#4b5563' }}>
              <span>{usedHours} {t('advanced.hours')}</span>
              <span>{t('advanced.of')} {totalHours}</span>
            </div>
            {remainingHours <= 200 && (
              <p className="text-xl text-red-500">
                {t('advanced.serviceNeeded')}
              </p>
            )}
          </div>
        </div>

        <div className="p-6 rounded-lg shadow" style={{ backgroundColor: cardBgColor }}>
          <h3 className="text-3xl font-bold mb-4">{t('advanced.totalScans')}</h3>
          <p className="text-4xl font-bold" style={{ color: isDarkTheme ? 'white' : '#111827' }}>{totalTests}</p>
        </div>
      </div>

      <div className="p-6 rounded-lg shadow h-full" style={{ backgroundColor: cardBgColor }}>
        <h3 className="text-3xl font-bold mb-4">{t('advanced.resultDistribution')}</h3>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {pieData.map((entry, index) => (
            <div key={index} className="flex items-center gap-4">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xl" style={{ color: isDarkTheme ? 'white' : '#4b5563' }}>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
