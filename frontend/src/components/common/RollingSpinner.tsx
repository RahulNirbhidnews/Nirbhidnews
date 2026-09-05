import React from 'react';

interface RollingSpinnerProps {
  size?: number;
  color?: string;
  secondaryColor?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const RollingSpinner: React.FC<RollingSpinnerProps> = ({
  size = 28,
  color = '#dc2626',
  secondaryColor = 'rgba(220, 38, 38, 0.2)',
  label,
  className = '',
  style,
}) => {
  return (
    <div
      className={`rolling-spinner-container ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.65rem',
        ...style,
      }}
    >
      <div
        className="rolling-spinner-dual"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          position: 'relative',
          borderRadius: '50%',
          border: `2.5px solid ${secondaryColor}`,
          borderTopColor: color,
          borderRightColor: color,
          animation: 'rollingRotate 0.75s linear infinite',
        }}
      >
        {/* Inner subtle glow pulse */}
        <div
          style={{
            position: 'absolute',
            inset: '3px',
            borderRadius: '50%',
            border: `1.5px dashed ${color}`,
            opacity: 0.4,
            animation: 'rollingRotateReverse 1.5s linear infinite',
          }}
        />
      </div>
      {label && (
        <span
          style={{
            fontSize: '0.8125rem',
            color: '#64748b',
            fontWeight: 500,
            letterSpacing: '0.2px',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
