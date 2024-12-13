import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, ArrowLeft, Power, RotateCcw } from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';
import { ThemeSelector } from '../components/ThemeSelector';
import { NotificationBar } from '../components/NotificationBar';
import { useCalibration } from '../context/CalibrationContext';
import { useLayout } from '../context/LayoutContext';

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const { isCalibrated } = useCalibration();
  const { testId } = useLayout();

  const isMainPage = location.pathname === '/';
  const showBackButton = !isMainPage;
  const showHamburger = isMainPage || location.pathname === '/advanced' || location.pathname === '/calibration';
  const showTestId = location.pathname === '/testing' && testId;

  const handleBack = () => {
    navigate('/');
  };

  const getTitle = () => {
    switch (location.pathname) {
      case '/calibration':
        return t('menu.calibration');
      case '/testing':
        return t('menu.testing');
      case '/history':
        return t('menu.history');
      case '/advanced':
        return t('menu.advanced');
      default:
        return '';
    }
  };

  return (
    <div className="app-container">
      <header className="h-28 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton ? (
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-16 h-16" />
            </button>
          ) : (
            <Logo />
          )}
          {getTitle() && (
            <h1 className="text-5xl font-semibold">{getTitle()}</h1>
          )}
        </div>
        <div className="flex items-center gap-4">
          {showTestId && (
            <span className="font-mono text-6xl text-gray-600">{testId}</span>
          )}
          {showHamburger && (
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-16 h-16" />
            </button>
          )}
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      {isMainPage && !isCalibrated && showNotification && (
        <NotificationBar
          isCalibrated={isCalibrated}
          onCalibrate={() => navigate('/calibration')}
          onDismiss={() => setShowNotification(false)}
        />
      )}

      {isMenuOpen && (
        <div className="absolute inset-0 bg-white flex flex-col">
          <header className="h-28 px-4 flex items-center justify-between">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-16 h-16" />
            </button>
          </header>
          <div className="flex-1 flex flex-col gap-6 p-8 -mt-5">
            <div className="space-y-2">
              <p className="text-2xl text-gray-600 font-medium">{t('settings.language')}</p>
              <LanguageSelector />
            </div>
            <div className="space-y-2">
              <p className="text-2xl text-gray-600 font-medium">{t('settings.theme')}</p>
              <ThemeSelector />
            </div>
            <div className="space-y-2">
              <p className="text-2xl text-gray-600 font-medium">{t('settings.deviceOptions')}</p>
              <div className="flex gap-4">
                <button className="flex-1 bg-gray-100 py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors">
                  <Power className="w-5 h-5" />
                  <span className="font-medium text-3xl">{t('menu.shutdown')}</span>
                </button>
                <button className="flex-1 bg-gray-100 py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors">
                  <RotateCcw className="w-5 h-5" />
                  <span className="font-medium text-3xl">{t('menu.reset')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};