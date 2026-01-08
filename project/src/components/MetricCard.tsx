import { MetricInfo } from '../types/performance';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface MetricCardProps {
  metric: MetricInfo;
}

export default function MetricCard({ metric }: MetricCardProps) {
  const getIcon = () => {
    switch (metric.score) {
      case 'good':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'needs-improvement':
        return <AlertTriangle className="w-6 h-6 text-amber-500" />;
      case 'poor':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
    }
  };

  const getBorderColor = () => {
    switch (metric.score) {
      case 'good':
        return 'border-l-green-500';
      case 'needs-improvement':
        return 'border-l-amber-500';
      case 'poor':
        return 'border-l-red-500';
    }
  };

  const getScoreText = () => {
    switch (metric.score) {
      case 'good':
        return 'Good';
      case 'needs-improvement':
        return 'Needs Improvement';
      case 'poor':
        return 'Poor';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${getBorderColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {getIcon()}
            <h3 className="text-lg font-semibold text-gray-800">{metric.name}</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
            <span className={`text-sm font-medium ${
              metric.score === 'good' ? 'text-green-600' :
              metric.score === 'needs-improvement' ? 'text-amber-600' :
              'text-red-600'
            }`}>
              {getScoreText()}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{metric.description}</p>

      <div className="mt-4">
        <h4 className="font-semibold text-gray-800 mb-2 text-sm">Recommendations:</h4>
        <ul className="space-y-1">
          {metric.recommendations.map((rec, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
