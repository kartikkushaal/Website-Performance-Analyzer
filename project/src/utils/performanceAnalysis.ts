import { MetricInfo } from '../types/performance';

export const getScoreColor = (score: number): string => {
  if (score >= 90) return '#10b981';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
};

export const getMetricScore = (value: number, thresholds: { good: number; poor: number }, isLower: boolean = true): 'good' | 'needs-improvement' | 'poor' => {
  if (isLower) {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.poor) return 'needs-improvement';
    return 'poor';
  } else {
    if (value >= thresholds.good) return 'good';
    if (value >= thresholds.poor) return 'needs-improvement';
    return 'poor';
  }
};

export const analyzeLCP = (lcp: number): MetricInfo => {
  const score = getMetricScore(lcp, { good: 2.5, poor: 4.0 });
  return {
    name: 'Largest Contentful Paint (LCP)',
    value: `${lcp.toFixed(1)}s`,
    score,
    description: 'Measures loading performance. LCP marks the time at which the largest text or image is painted.',
    recommendations: [
      'Optimize and compress images (use WebP format)',
      'Implement lazy loading for images',
      'Remove render-blocking JavaScript and CSS',
      'Use a Content Delivery Network (CDN)',
      'Implement server-side rendering or static site generation',
      'Minimize CSS and JavaScript file sizes',
      'Preload critical resources'
    ]
  };
};

export const analyzeINP = (inp: number): MetricInfo => {
  const score = getMetricScore(inp, { good: 200, poor: 500 });
  return {
    name: 'Interaction to Next Paint (INP)',
    value: `${inp}ms`,
    score,
    description: 'Measures responsiveness. INP assesses how quickly a page responds to user interactions.',
    recommendations: [
      'Optimize JavaScript execution time',
      'Break up long tasks into smaller chunks',
      'Use web workers for heavy computations',
      'Implement code splitting',
      'Minimize main thread work',
      'Defer non-critical JavaScript'
    ]
  };
};

export const analyzeCLS = (cls: number): MetricInfo => {
  const score = getMetricScore(cls, { good: 0.1, poor: 0.25 });
  return {
    name: 'Cumulative Layout Shift (CLS)',
    value: cls.toFixed(2),
    score,
    description: 'Measures visual stability. CLS quantifies unexpected layout shifts during page load.',
    recommendations: [
      'Always include size attributes on images and videos',
      'Reserve space for ad slots and embeds',
      'Avoid inserting content above existing content',
      'Use CSS aspect-ratio for responsive images',
      'Preload fonts and use font-display: swap',
      'Ensure buttons and UI elements have fixed dimensions'
    ]
  };
};

export const analyzeFCP = (fcp: number): MetricInfo => {
  const score = getMetricScore(fcp, { good: 1.8, poor: 3.0 });
  return {
    name: 'First Contentful Paint (FCP)',
    value: `${fcp.toFixed(1)}s`,
    score,
    description: 'Measures when the first content appears on screen.',
    recommendations: [
      'Eliminate render-blocking resources',
      'Minify CSS and JavaScript',
      'Remove unused CSS',
      'Implement efficient cache policies',
      'Reduce server response times'
    ]
  };
};

export const analyzeTTFB = (ttfb: number): MetricInfo => {
  const score = getMetricScore(ttfb, { good: 0.8, poor: 1.8 });
  return {
    name: 'Time to First Byte (TTFB)',
    value: `${ttfb.toFixed(1)}s`,
    score,
    description: 'Measures server response time and network latency.',
    recommendations: [
      'Use a faster web host or upgrade hosting plan',
      'Implement server-side caching',
      'Use a CDN to serve static assets',
      'Optimize database queries',
      'Enable HTTP/2 or HTTP/3',
      'Minimize server-side processing time'
    ]
  };
};

export const getGeneralRecommendations = () => {
  return {
    images: [
      'Convert images to modern formats (WebP, AVIF)',
      'Implement responsive images with srcset',
      'Use appropriate image dimensions',
      'Compress images without losing quality',
      'Lazy load offscreen images',
      'Consider using image CDN services'
    ],
    performance: [
      'Minimize HTTP requests',
      'Enable Gzip/Brotli compression',
      'Implement browser caching',
      'Use async/defer for JavaScript files',
      'Reduce third-party script usage',
      'Optimize web fonts loading'
    ],
    accessibility: [
      'Add proper alt text to images',
      'Ensure sufficient color contrast',
      'Use semantic HTML elements',
      'Make all interactive elements keyboard accessible',
      'Add ARIA labels where needed',
      'Ensure form labels are properly associated'
    ],
    seo: [
      'Add meta descriptions to all pages',
      'Use proper heading hierarchy (H1-H6)',
      'Implement structured data markup',
      'Ensure mobile-friendly design',
      'Create descriptive, keyword-rich URLs',
      'Add canonical tags to prevent duplicate content'
    ]
  };
};
