import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, X, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { articleApi } from '../../api/articles';
import { useLanguage } from '../../context/LanguageContext';

export const BreakingPopupModal: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissedId, setDismissedId] = useState<string | null>(null);

  const { data: breakingArticles } = useQuery({
    queryKey: ['breaking-popup-article'],
    queryFn: () => articleApi.getBreakingArticles(1),
    staleTime: 1000 * 60 * 2,
  });

  const topBreaking = breakingArticles && breakingArticles.length > 0 ? breakingArticles[0] : null;

  useEffect(() => {
    if (!topBreaking) return;

    // Check if user already dismissed this article in current browser session
    const dismissed = sessionStorage.getItem(`nirbhid_dismiss_popup_${topBreaking.id}`);
    if (dismissed) return;

    // Show popup after 3 seconds delay for delightful non-intrusive appearance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [topBreaking]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (topBreaking) {
      sessionStorage.setItem(`nirbhid_dismiss_popup_${topBreaking.id}`, 'true');
      setDismissedId(topBreaking.id);
    }
  };

  if (!isVisible || !topBreaking || topBreaking.id === dismissedId) {
    return null;
  }

  return (
    <div
      className="breaking-popup-container"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999,
        maxWidth: '380px',
        width: 'calc(100% - 48px)',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        border: '2px solid #fee2e2',
        overflow: 'hidden',
        animation: 'slideUpPopup 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      role="alert"
    >
      {/* Header Bar */}
      <div
        style={{
          backgroundColor: '#dc2626',
          color: 'white',
          padding: '0.5rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          <Flame size={14} className="ticker-flame-icon" />
          <span>{t.breakingNews}</span>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            opacity: 0.85,
          }}
          aria-label={t.close}
        >
          <X size={16} />
        </button>
      </div>

      {/* Popup Body */}
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          {topBreaking.featured_image_url && (
            <img
              src={topBreaking.featured_image_url}
              alt=""
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-sm)',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
          )}

          <div style={{ flex: 1 }}>
            <h4
              style={{
                fontSize: '0.9375rem',
                fontWeight: 700,
                color: 'var(--color-secondary)',
                lineHeight: 1.35,
                margin: '0 0 0.5rem 0',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontFamily: 'var(--font-serif)',
              }}
            >
              {topBreaking.title}
            </h4>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <Link
                to={`/news/${topBreaking.slug}`}
                onClick={() => setIsVisible(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  textDecoration: 'none',
                }}
              >
                {t.readMore} <ChevronRight size={14} />
              </Link>

              <button
                type="button"
                onClick={handleDismiss}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  cursor: 'pointer',
                }}
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
