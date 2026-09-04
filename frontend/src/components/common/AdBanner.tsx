import React from 'react';

interface AdBannerProps {
  type?: 'leaderboard' | 'sidebar' | 'inline' | 'banner';
  label?: string;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  type = 'leaderboard',
  label = 'Advertisement / जाहिरात',
  className = '',
}) => {
  const getDimensions = () => {
    switch (type) {
      case 'leaderboard':
        return { minHeight: '90px', width: '100%' };
      case 'sidebar':
        return { minHeight: '250px', width: '100%' };
      case 'inline':
        return { minHeight: '120px', width: '100%' };
      case 'banner':
      default:
        return { minHeight: '100px', width: '100%' };
    }
  };

  return (
    <div
      className={`ad-container ad-${type} ${className}`}
      style={{
        ...getDimensions(),
        backgroundColor: '#f1f5f9',
        border: '1px dashed #cbd5e1',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        margin: '1.5rem 0',
        textAlign: 'center',
        color: '#64748b',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          fontSize: '0.6875rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontWeight: 700,
          color: '#94a3b8',
          marginBottom: '0.25rem',
        }}
      >
        {label}
      </span>
      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>
        Nirbhid News Digital Network
      </div>
      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
        For advertising inquiries: ads@nirbhidnews.com
      </div>
    </div>
  );
};
