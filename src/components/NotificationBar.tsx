import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useTrayStatus } from '../context/TrayStatusContext';

interface NotificationBarProps {
  isCalibrated: boolean;
  isMenuOpen?: boolean;
  onCalibrate: () => void;
  onDismiss: () => void;
}

export const NotificationBar: React.FC<NotificationBarProps> = ({ 
  isCalibrated,
  isMenuOpen = false,
  onCalibrate,
  onDismiss
}) => {
  const { t } = useTranslation();
  const { isTrayOpen } = useTrayStatus();
  const location = useLocation();
  
  // Check current screen
  const isCalibrationScreen = location.pathname === '/calibration';
  const isHomeScreen = location.pathname === '/';

  // Don't show any notification if everything is fine or if notification criteria aren't met
  console.log('Notification bar - Tray open:', isTrayOpen, 'Calibration needed:', !isCalibrated, 'Home screen:', isHomeScreen, 'Menu open:', isMenuOpen);
  
  // Always hide notifications when everything is fine
  if (isCalibrated && !isTrayOpen) return null;
  
  // For calibration notification: only show on home screen and when menu is closed
  if (!isCalibrated && (!isHomeScreen || isMenuOpen) && !isTrayOpen) return null;

  // Tray open notification has priority over calibration notification (shown on all screens)
  if (isTrayOpen) {
    return (
      <div className="p-4 border-t" style={{ backgroundColor: '#FECACA' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 mr-3" style={{ color: '#DC2626' }} />
            <p className="text-2xl font-medium" style={{ color: '#991B1B' }}>
              {t('notifications.trayOpen')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show simplified calibration notification (no buttons) - only on home screen
  if (!isCalibrated && isHomeScreen) {
    return (
      <div className="p-4 border-t" style={{ backgroundColor: '#FEF3C7' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 mr-3" style={{ color: '#92400E' }} />
            <p className="text-2xl font-medium" style={{ color: '#92400E' }}>
              {t('notifications.calibrationNeeded')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};