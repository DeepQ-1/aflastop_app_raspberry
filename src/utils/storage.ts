import { TestRecord } from '../types/test';

const STORAGE_KEY = 'test_history';

export const saveTestResult = (record: TestRecord): void => {
  const history = getTestHistory();
  history.unshift(record);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const getTestHistory = (): TestRecord[] => {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
};