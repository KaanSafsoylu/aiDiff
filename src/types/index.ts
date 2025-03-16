export interface ReportDifference {
  id: string;
  type: 'visual' | 'content' | 'performance' | 'dom';
  element: string;
  selector: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  referenceScreenshot?: string;
  testScreenshot?: string;
  referenceValue?: string;
  testValue?: string;
  performanceData?: {
    referenceTime?: number;
    testTime?: number;
    difference?: number;
    percentageDifference?: number;
  };
}

export interface Report {
  id: string;
  createdAt: string;
  referenceUrl: string;
  testUrl: string;
  status: 'completed' | 'failed' | 'running';
  runtime: number; // in seconds
  totalDifferences: number;
  visualDifferences: number;
  contentDifferences: number;
  performanceDifferences: number;
  domDifferences: number;
  differences: ReportDifference[];
  // Genel özet puanlamaları
  scoreSummary?: {
    visualScore: number; // 100 üzerinden
    contentScore: number; // 100 üzerinden
    performanceScore: number; // 100 üzerinden
    domScore: number; // 100 üzerinden
    overallScore: number; // 100 üzerinden
  };
}

export type ReportSummary = Omit<Report, 'differences'>;
