import React from 'react';

interface SkeletonProps {
  variant?: 'hero' | 'card-vertical' | 'card-horizontal' | 'article-detail' | 'list';
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({ variant = 'card-vertical', count = 1 }) => {
  const items = Array.from({ length: count });

  if (variant === 'hero') {
    return (
      <div className="skeleton-hero-container" style={{ margin: '1.5rem 0 2.5rem 0' }}>
        <div
          className="skeleton-pulse"
          style={{
            height: '420px',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
          }}
        />
      </div>
    );
  }

  if (variant === 'card-horizontal') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((_, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr',
              gap: '1.25rem',
              backgroundColor: '#fff',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              padding: '0.75rem',
              minHeight: '120px',
            }}
          >
            <div className="skeleton-pulse" style={{ borderRadius: 'var(--radius-sm)', height: '100%' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
              <div className="skeleton-pulse" style={{ height: '14px', width: '30%' }} />
              <div className="skeleton-pulse" style={{ height: '18px', width: '90%' }} />
              <div className="skeleton-pulse" style={{ height: '12px', width: '60%' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'article-detail') {
    return (
      <div style={{ maxWidth: '850px', margin: '2rem auto' }}>
        <div className="skeleton-pulse" style={{ height: '20px', width: '20%', marginBottom: '1rem' }} />
        <div className="skeleton-pulse" style={{ height: '36px', width: '95%', marginBottom: '0.5rem' }} />
        <div className="skeleton-pulse" style={{ height: '36px', width: '75%', marginBottom: '1.5rem' }} />
        <div className="skeleton-pulse" style={{ height: '400px', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="skeleton-pulse" style={{ height: '16px', width: '100%' }} />
          <div className="skeleton-pulse" style={{ height: '16px', width: '98%' }} />
          <div className="skeleton-pulse" style={{ height: '16px', width: '95%' }} />
          <div className="skeleton-pulse" style={{ height: '16px', width: '90%' }} />
        </div>
      </div>
    );
  }

  // Default: card-vertical
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}
    >
      {items.map((_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="skeleton-pulse" style={{ height: '200px', width: '100%' }} />
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="skeleton-pulse" style={{ height: '14px', width: '35%' }} />
            <div className="skeleton-pulse" style={{ height: '20px', width: '95%' }} />
            <div className="skeleton-pulse" style={{ height: '14px', width: '80%' }} />
            <div className="skeleton-pulse" style={{ height: '12px', width: '50%', marginTop: '0.5rem' }} />
          </div>
        </div>
      ))}
    </div>
  );
};
