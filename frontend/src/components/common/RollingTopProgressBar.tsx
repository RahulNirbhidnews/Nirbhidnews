import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

export const RollingTopProgressBar: React.FC = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const isLoading = isFetching > 0 || isMutating > 0;

  // Trigger on route change
  useEffect(() => {
    setVisible(true);
    setProgress(30);

    const t1 = setTimeout(() => setProgress(75), 150);
    const t2 = setTimeout(() => {
      setProgress(100);
      const t3 = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(t3);
    }, 450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname, location.search]);

  // Trigger when query is actively fetching/mutating
  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setProgress((prev) => (prev < 80 ? prev + 35 : 85));
    } else if (!isLoading && visible) {
      setProgress(100);
      const timer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3.5px',
        zIndex: 999999,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: 'rgba(220, 38, 38, 0.15)',
      }}
    >
      {/* Rolling Animated Bar */}
      <div
        className="rolling-top-bar"
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #dc2626 0%, #f59e0b 50%, #ef4444 100%)',
          backgroundSize: '200% 100%',
          boxShadow: '0 0 12px #ef4444, 0 0 6px #f59e0b',
          transition: 'width 0.25s ease-out, opacity 0.3s ease',
          position: 'relative',
        }}
      >
        {/* Rolling Light Head */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '-2px',
            bottom: '-2px',
            width: '80px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent)',
            boxShadow: '0 0 16px rgba(255, 255, 255, 0.8)',
            filter: 'blur(1px)',
          }}
        />
      </div>
    </div>
  );
};
