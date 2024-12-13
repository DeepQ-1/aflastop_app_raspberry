import React from 'react';
import { MainMenu } from '../components/MainMenu';

export const Home: React.FC = () => {
  const handleCalibrate = () => {
    // Handle calibration
  };

  return <MainMenu onCalibrate={handleCalibrate} />;
};