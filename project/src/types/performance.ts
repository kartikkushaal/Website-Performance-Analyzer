export interface PerformanceMetrics {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  lcp: number;
  inp: number;
  cls: number;
  fcp: number;
  ttfb: number;
}

export interface MetricInfo {
  name: string;
  value: string;
  score: 'good' | 'needs-improvement' | 'poor';
  description: string;
  recommendations: string[];
}

export interface CategoryScore {
  name: string;
  score: number;
  color: string;
}
