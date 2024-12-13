import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NotificationBarProps {
  isCalibrated: boolean;
  onCalibrate: () => void;
  onDismiss: () => void;
}

export const NotificationBar: React.FC<NotificationBarProps> = ({ 
  isCalibrated,
  onCalibrate,
  onDismiss
}) => {
  const { t } = useTranslation();

  if (isCalibrated) return null;

  return (
    <div className="bg-yellow-100 p-4 border-t">
      <div className="flex items-center justify-between mb-3">
        <p className="text-2xl text-gray-700">
          {t('notifications.calibrationNeeded')}
        </p>
        <button 
          onClick={onDismiss}
          className="p-1 hover:bg-gray-500 rounded-full"
        >
          <X className="w-8 h-8 text-gray-800" />
        </button>
      </div>
      <button 
        onClick={onCalibrate}
        className="w-full bg-white py-2 rounded-md text-2xl font-large hover:bg-gray-100 transition-colors"
      >
        {t('calibration.buttons.start')}
      </button>
    </div>
  );
};