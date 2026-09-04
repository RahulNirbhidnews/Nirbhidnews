import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { articleApi } from '../../api/articles';
import { useLanguage } from '../../context/LanguageContext';

export const BreakingNewsTicker: React.FC = () => {
  const { t, translateCategory } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data: breakingArticles, isLoading } = useQuery({
    queryKey: ['breaking-articles'],
    queryFn: () => articleApi.getBreakingArticles(8),
    refetchInterval: 1000 * 60 * 2, // Auto refresh every 2 mins
  });

  const articles = breakingArticles || [];

  useEffect(() => {
    if (articles.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [articles.length, isPaused]);

  if (isLoading) {
    return (
      <div className="breaking-ticker">
        <div className="breaking-badge">
          <Flame size={15} className="ticker-flame-icon" />
          <span>{t.breakingNews}</span>
        </div>
        <div className="breaking-text" style={{ color: '#64748b' }}>
          {t.latestNews}...
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="breaking-ticker">
        <div className="breaking-badge">
          <Flame size={15} className="ticker-flame-icon" />
          <span>{t.breakingNews}</span>
        </div>
        <div className="breaking-text">
          <span style={{ fontWeight: 700 }}>{t.brandName}:</span> {t.brandTagline}
        </div>
      </div>
    );
  }

  const currentArticle = articles[currentIndex];

  return (
    <div
      className="breaking-ticker"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="breaking-badge">
        <Flame size={15} className="ticker-flame-icon" />
        <span>{t.breakingNews}</span>
      </div>

      <div className="breaking-text-container" style={{ flex: 1, overflow: 'hidden', padding: '0 1rem' }}>
        <Link
          to={`/news/${currentArticle.slug}`}
          className="breaking-text-link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#9f1239',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.9rem',
            transition: 'color 0.2s ease',
          }}
        >
          {currentArticle.category && (
            <span
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '0.15rem 0.45rem',
                borderRadius: '3px',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '0.5px',
              }}
            >
              {translateCategory(currentArticle.category.slug, currentArticle.category.name)}
            </span>
          )}
          <span className="ticker-title-animated">{currentArticle.title}</span>
        </Link>
      </div>

      {articles.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', paddingRight: '0.75rem' }}>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9f1239',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center',
            }}
            title={isPaused ? 'Resume auto-scroll' : 'Pause ticker'}
            aria-label={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>

          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9f1239',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Previous breaking headline"
          >
            <ChevronLeft size={16} />
          </button>

          <span style={{ fontSize: '0.75rem', color: '#9f1239', fontWeight: 700, minWidth: '32px', textAlign: 'center' }}>
            {currentIndex + 1}/{articles.length}
          </span>

          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % articles.length)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9f1239',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Next breaking headline"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
