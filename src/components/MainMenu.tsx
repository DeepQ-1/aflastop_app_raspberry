import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCalibration } from '../context/CalibrationContext';
import { useTrayStatus } from '../context/TrayStatusContext';

import CalibrationIcon from '../assets/calibration-menu.png';
import TestingIcon from '../assets/testing-menu.png';
import HistoryIcon from '../assets/history-menu.png';
import AdvancedIcon from '../assets/advanced-menu.png';

interface MainMenuProps {
  onCalibrate?: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onCalibrate }) => {
  const navigate = useNavigate();
  const { isCalibrated } = useCalibration();
  const { isTrayOpen } = useTrayStatus();
  const { t } = useTranslation();

  const menuItems = [
    { 
      icon: CalibrationIcon, 
      label: t('menu.calibration'), 
      disabled: isTrayOpen,
      onClick: () => !isTrayOpen && navigate('/calibration')
    },
    { 
      icon: TestingIcon, 
      label: t('menu.testing'),
      disabled: !isCalibrated || isTrayOpen,
      onClick: () => isCalibrated && !isTrayOpen && navigate('/testing')
    },
    { 
      icon: HistoryIcon, 
      label: t('menu.history'),
      onClick: () => navigate('/history')
    },
    { 
      icon: AdvancedIcon, 
      label: t('menu.advanced'),
      onClick: () => navigate('/advanced')
    }
  ];

  return (
    <div className="main-menu">
      {menuItems.map(({ icon, label, onClick, disabled }) => (
        <button
          key={label}
          onClick={onClick}
          disabled={disabled}
          className="menu-item"
        >
          <div className="menu-icon-container">
            <img src={icon} alt={label} />
          </div>
          <span className="menu-label">{label}</span>
        </button>
      ))}
    </div>
  );
};
