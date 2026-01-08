import { AlertTriangle } from 'lucide-react';
import ScoreCircle from './components/ScoreCircle';
import MetricCard from './components/MetricCard';
import RecommendationsSection from './components/RecommendationsSection';
import {
  analyzeLCP,
  analyzeINP,
  analyzeCLS,
  analyzeFCP,
  analyzeTTFB,
  getGeneralRecommendations
} from './utils/performanceAnalysis';

function App() {
  const performanceData = {
    performance: 76,
    accessibility: 69,
    bestPractices: 77,
    seo: 85,
    lcp: 2.8,
    inp: 156,
    cls: 0.36,
    fcp: 2.7,
    ttfb: 1.9
  };

  const coreWebVitalsMetrics = [
    analyzeLCP(performanceData.lcp),
    analyzeINP(performanceData.inp),
    analyzeCLS(performanceData.cls)
  ];

  const otherMetrics = [
    analyzeFCP(performanceData.fcp),
    analyzeTTFB(performanceData.ttfb)
  ];

  const generalRecommendations = getGeneralRecommendations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">PageSpeed Analysis Report</h1>
          <p className="text-gray-600">Website: ecoleglobale.com (Mobile)</p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
            <div>
              <h2 className="font-semibold text-red-800">Core Web Vitals Assessment: Failed</h2>
              <p className="text-sm text-red-700 mt-1">
                The page does not pass the Core Web Vitals assessment. Cumulative Layout Shift needs immediate attention.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Performance Scores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ScoreCircle score={performanceData.performance} label="Performance" />
            <ScoreCircle score={performanceData.accessibility} label="Accessibility" />
            <ScoreCircle score={performanceData.bestPractices} label="Best Practices" />
            <ScoreCircle score={performanceData.seo} label="SEO" />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Core Web Vitals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreWebVitalsMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Other Notable Metrics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {otherMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>
        </div>

        <RecommendationsSection recommendations={generalRecommendations} />

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Technical Summary</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Critical Issues:</strong> The website fails Core Web Vitals primarily due to high Cumulative Layout Shift (0.36).
              This indicates elements are moving around during page load, creating a poor user experience.
            </p>
            <p>
              <strong>Image Optimization:</strong> Images likely need optimization. Convert to modern formats (WebP/AVIF),
              implement lazy loading, and ensure proper dimensions are specified to prevent layout shifts.
            </p>
            <p>
              <strong>Loading Performance:</strong> LCP of 2.8s and FCP of 2.7s indicate the main content takes too long to appear.
              Optimize image delivery, minimize render-blocking resources, and consider implementing a CDN.
            </p>
            <p>
              <strong>Server Response:</strong> TTFB of 1.9s suggests server optimization is needed. Consider upgrading hosting,
              implementing server-side caching, or using a CDN to reduce initial server response time.
            </p>
            <p>
              <strong>Accessibility:</strong> Score of 69 needs improvement. Ensure all images have alt text, improve color contrast,
              and make interactive elements keyboard accessible.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Priority Action Items</h2>
          <ol className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-red-600 mr-3">1.</span>
              <span><strong>Fix Layout Shifts:</strong> Add explicit width and height to all images and reserve space for dynamic content</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-amber-600 mr-3">2.</span>
              <span><strong>Optimize Images:</strong> Compress and convert images to WebP format, implement lazy loading</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-amber-600 mr-3">3.</span>
              <span><strong>Reduce Server Response Time:</strong> Optimize backend, implement caching, consider CDN</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-blue-600 mr-3">4.</span>
              <span><strong>Improve Accessibility:</strong> Add alt text, improve contrast ratios, ensure keyboard navigation</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-green-600 mr-3">5.</span>
              <span><strong>Minimize JavaScript:</strong> Defer non-critical scripts, remove unused code, implement code splitting</span>
            </li>
          </ol>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Analysis based on PageSpeed Insights data for mobile performance</p>
        </div>
      </div>
    </div>
  );
}

export default App;
