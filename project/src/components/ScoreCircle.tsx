import { getScoreColor } from '../utils/performanceAnalysis';

interface ScoreCircleProps {
  score: number;
  label: string;
  size?: 'small' | 'large';
}

export default function ScoreCircle({ score, label, size = 'small' }: ScoreCircleProps) {
  const color = getScoreColor(score);
  const radius = size === 'large' ? 70 : 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const svgSize = size === 'large' ? 160 : 110;
  const strokeWidth = size === 'large' ? 8 : 6;
  const fontSize = size === 'large' ? 'text-4xl' : 'text-2xl';

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={svgSize} height={svgSize} className="transform -rotate-90">
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center ${fontSize} font-bold`} style={{ color }}>
          {score}
        </div>
      </div>
      <p className={`mt-2 ${size === 'large' ? 'text-lg' : 'text-sm'} font-medium text-gray-700`}>{label}</p>
    </div>
  );
}
