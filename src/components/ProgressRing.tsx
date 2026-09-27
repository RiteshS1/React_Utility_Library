import React from 'react';

interface ProgressRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  percent,
  size = 44,
  strokeWidth = 4,
  label,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, percent)) / 100) * circumference;

  return (
    <div className="progress-ring" title={`${percent}% complete`} aria-label={`Learning progress ${percent}%`}>
      <svg width={size} height={size} className="progress-ring-svg">
        <circle
          className="progress-ring-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="progress-ring-fg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          className="progress-ring-text"
        >
          {percent}%
        </text>
      </svg>
      {label && <span className="progress-ring-label">{label}</span>}
    </div>
  );
};

export default ProgressRing;
