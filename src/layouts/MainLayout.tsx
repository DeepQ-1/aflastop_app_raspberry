import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, ArrowLeft, Power, RotateCcw, ChevronRight, ChevronDown, Monitor, Globe, Settings } from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';
import { ThemeSelector } from '../components/ThemeSelector';
import { NotificationBar } from '../components/NotificationBar';
import { WifiConfig } from '../components/WifiConfig';
import { useCalibration } from '../context/CalibrationContext';
import { useLayout } from '../context/LayoutContext';
import { useTrayStatus } from '../context/TrayStatusContext';

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSetting, setActiveSetting] = useState<string | null>(null);
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
      <header className="h-28 px-4">
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
            <span className="font-mono text-6xl">{testId}</span>
          )}
          {showHamburger && (
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-opacity-10 hover:bg-white rounded-lg transition-colors"
            >
              <Menu className="w-16 h-16" />
            </button>
          )}
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <div className="notification-container">
        <NotificationBar
          isCalibrated={isCalibrated}
          isMenuOpen={isMenuOpen}
          onCalibrate={() => navigate('/calibration')}
          onDismiss={() => setShowNotification(false)}
        />
      </div>

      {isMenuOpen && (
        <div className="absolute inset-0 bg-inherit flex flex-col">
          <header className="h-28 px-4">
            <button
              onClick={() => activeSetting ? setActiveSetting(null) : setIsMenuOpen(false)}
              className="p-2 hover:bg-opacity-10 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-16 h-16" />
            </button>
            {activeSetting && (
              <h2 className="text-3xl font-semibold">
                {activeSetting === 'device' ? t('settings.deviceOptions') : t(`settings.${activeSetting}`)}
              </h2>
            )}
          </header>
          <div className="flex flex-col h-full overflow-hidden settings-container">
            {/* Main Settings Menu - Only show when no submenu is active */}
            {!activeSetting && (
              <div className="settings-page settings-main-page">
                {/* Menu Item: Connectivity */}
                <button 
                  onClick={() => setActiveSetting('connectivity')} 
                  className="settings-menu-item">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-4"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
                    <span className="text-2xl font-medium">{t('settings.connectivity')}</span>
                  </div>
                  <ChevronRight className="w-8 h-8" />
                </button>
                
                {/* Menu Item: Language */}
                <button 
                  onClick={() => setActiveSetting('language')} 
                  className="settings-menu-item">
                  <div className="flex items-center">
                    <Globe className="w-8 h-8 mr-4" />
                    <span className="text-2xl font-medium">{t('settings.language')}</span>
                  </div>
                  <ChevronRight className="w-8 h-8" />
                </button>
                
                {/* Menu Item: Theme */}
                <button 
                  onClick={() => setActiveSetting('theme')} 
                  className="settings-menu-item">
                  <div className="flex items-center">
                    <Monitor className="w-8 h-8 mr-4" />
                    <span className="text-2xl font-medium">{t('settings.theme')}</span>
                  </div>
                  <ChevronRight className="w-8 h-8" />
                </button>
                
                {/* Menu Item: Device Options */}
                <button 
                  onClick={() => setActiveSetting('device')} 
                  className="settings-menu-item">
                  <div className="flex items-center">
                    <Settings className="w-8 h-8 mr-4" />
                    <span className="text-2xl font-medium">{t('settings.deviceOptions')}</span>
                  </div>
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            )}
            
            {/* Language Submenu */}
            {activeSetting === 'language' && (
              <div className="settings-page">
                <div className="settings-page-content">
                  <LanguageSelector />
                </div>
              </div>
            )}
            
            {/* Theme Submenu */}
            {activeSetting === 'theme' && (
              <div className="settings-page">
                <div className="settings-page-content">
                  <ThemeSelector />
                </div>
              </div>
            )}
            
            {/* Device Options Submenu */}
            {activeSetting === 'device' && (
              <div className="settings-page">
                <div className="settings-page-content">
                  <div className="flex gap-3">
                    <button className="flex-1 bg-opacity-20 bg-white py-4 px-3 rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-30 transition-colors">
                      <Power className="w-6 h-6" />
                      <span className="font-medium text-2xl">{t('menu.shutdown')}</span>
                    </button>
                    <button className="flex-1 bg-opacity-20 bg-white py-4 px-3 rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-30 transition-colors">
                      <RotateCcw className="w-6 h-6" />
                      <span className="font-medium text-2xl">{t('menu.reset')}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Connectivity Submenu */}
            {activeSetting === 'connectivity' && (
              <div className="settings-page">
                <div className="settings-page-content">
                  <WifiConfig />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};