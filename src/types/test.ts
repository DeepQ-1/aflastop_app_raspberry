export type TestResult = 'UREDAN' | 'SUMNJIV' | 'POZITIVAN';

export interface TestRecord {
  id: string;
  date: string;
  result: TestResult;
}