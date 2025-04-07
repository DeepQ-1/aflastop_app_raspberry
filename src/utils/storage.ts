import { TestRecord } from '../types/test';

const STORAGE_KEY = 'test_history';
const LANGUAGE_KEY = 'app_language';
const THEME_KEY = 'app_theme';
const CALIBRATION_KEY = 'device_calibrated';

export const saveTestResult = (record: TestRecord): void => {
  const history = getTestHistory();
  history.unshift(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const getTestHistory = (): TestRecord[] => {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
};

// Language preferences
export const saveLanguagePreference = (languageCode: string): void => {
  localStorage.setItem(LANGUAGE_KEY, languageCode);
};

export const getLanguagePreference = (): string | null => {
  return localStorage.getItem(LANGUAGE_KEY);
};

// Theme preferences
export const saveThemePreference = (theme: string): void => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getThemePreference = (): string | null => {
  return localStorage.getItem(THEME_KEY);
};

// Calibration status
export const saveCalibrationStatus = (isCalibrated: boolean): void => {
  localStorage.setItem(CALIBRATION_KEY, isCalibrated.toString());
};

export const getCalibrationStatus = (): boolean => {
  const status = localStorage.getItem(CALIBRATION_KEY);
  return status === 'true';
};