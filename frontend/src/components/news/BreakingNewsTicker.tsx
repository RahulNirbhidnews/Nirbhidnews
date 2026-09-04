import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { articleApi } from '../../api/articles';

export const BreakingNewsTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: breakingArticles, isLoading } = useQuery({
    queryKey: ['breaking-articles'],
    queryFn: () => articleApi.getBreakingArticles(8),
    refetchInterval: 1000 * 60 * 2, // Auto refresh every 2 mins
  });

  const articles = breakingArticles || [];

  useEffect(() => {
    if (articles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [articles.length]);

  if (isLoading) {
    return (
      <div className="breaking-ticker">
        <div className="breaking-badge">
          <Flame size={15} /> ब्रेकिंग न्यूज
        </div>
        <div className="breaking-text" style={{ color: '#64748b' }}>
          ताज्या घडामोडी लोड होत आहेत...
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="breaking-ticker">
        <div className="breaking-badge">
          <Flame size={15} /> ब्रेकिंग न्यूज
        </div>
        <div className="breaking-text">
          <span style={{ fontWeight: 600 }}>निर्भीड न्यूज:</span> महाराष्ट्रातील अग्रगण्य, विश्वासार्ह आणि निर्भीड डिजिटल वृत्तवाहिनी.
        </div>
      </div>
    );
  }

  const currentArticle = articles[currentIndex];

  return (
    <div className="breaking-ticker">
      <div className="breaking-badge">
        <Flame size={15} className="ticker-flame-icon" />
        <span>ब्रेकिंग न्यूज</span>
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
                padding: '0.15rem 0.4rem',
                borderRadius: '3px',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              {currentArticle.category.name}
            </span>
          )}
          <span>{currentArticle.title}</span>
        </Link>
      </div>

      {articles.length > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', paddingRight: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9f1239',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Previous breaking news"
          >
            <ChevronLeft size={16} />
          </button>
          <span style={{ fontSize: '0.75rem', color: '#9f1239', fontWeight: 600 }}>
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
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Next breaking news"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
