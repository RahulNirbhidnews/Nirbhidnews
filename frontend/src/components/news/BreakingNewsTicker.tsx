import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { articleApi } from '../../api/articles';
import { useLanguage } from '../../context/LanguageContext';

export const BreakingNewsTicker: React.FC = () => {
  const { t, translateCategory, translateArticle, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const { data: breakingArticles, isLoading } = useQuery({
    queryKey: ['breaking-articles'],
    queryFn: () => articleApi.getBreakingArticles(10),
    refetchInterval: 1000 * 30, // Auto refresh every 30s for live breaking news
  });

  const articles = (breakingArticles || []).map(translateArticle);

  useEffect(() => {
    if (articles.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [articles.length, isPaused]);

  // Synthetic Audio Chime for Breaking Alert
  const playAlertChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch {
      // Audio context might be restricted
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
    playAlertChime();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
    playAlertChime();
  };

  if (isLoading) {
    return (
      <div className="tv-breaking-strip">
        <div className="tv-breaking-badge">
          <span className="live-radar-pulse" />
          <Flame size={16} color="#ffffff" className="ticker-flame-icon" />
          <span>{t.breakingNews}</span>
        </div>
        <div className="tv-breaking-content" style={{ color: '#cbd5e1' }}>
          {t.latestNews}...
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="tv-breaking-strip">
        <div className="tv-breaking-badge">
          <span className="live-radar-pulse" />
          <Flame size={16} color="#ffffff" className="ticker-flame-icon" />
          <span>{t.breakingNews}</span>
        </div>
        <div className="tv-breaking-content">
          <span style={{ fontWeight: 800, color: '#fef08a' }}>{t.brandName}:</span> {t.brandTagline}
        </div>
      </div>
    );
  }

  const currentArticle = articles[currentIndex];

  return (
    <div
      className="tv-breaking-strip"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* High-Impact TV Live Broadcast Badge */}
      <div className="tv-breaking-badge">
        <div className="live-pulse-container">
          <span className="live-pulse-dot" />
          <span className="live-pulse-ring" />
        </div>
        <Flame size={17} color="#ffffff" className="ticker-flame-icon" />
        <span className="tv-badge-text">{t.breakingNews}</span>
        <span className="tv-live-tag">LIVE</span>
      </div>

      {/* Main Headline Body */}
      <div className="tv-breaking-content">
        <Link
          to={`/news/${currentArticle.slug}`}
          className="tv-breaking-link"
        >
          {currentArticle.category && (
            <span className="tv-category-chip">
              {translateCategory(currentArticle.category.slug, currentArticle.category.name)}
            </span>
          )}
          <span className="tv-headline-text">
            {currentArticle.title}
          </span>
          <span className="tv-read-more">
            {language === 'mr' ? 'वाचा सविस्तर →' : 'Read Full Story →'}
          </span>
        </Link>
      </div>

      {/* Controls & Sound Chime Toggle */}
      <div className="tv-breaking-controls">
        <button
          type="button"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="tv-ctrl-btn"
          title={soundEnabled ? 'Disable Breaking Alert Sound' : 'Enable Breaking Alert Sound'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 size={14} color="#facc15" /> : <VolumeX size={14} color="#94a3b8" />}
        </button>

        {articles.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="tv-ctrl-btn"
              title={isPaused ? 'Resume auto-scroll' : 'Pause ticker'}
              aria-label={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? <Play size={13} color="#ffffff" /> : <Pause size={13} color="#ffffff" />}
            </button>

            <button
              type="button"
              onClick={handlePrev}
              className="tv-ctrl-btn"
              aria-label="Previous breaking headline"
            >
              <ChevronLeft size={16} color="#ffffff" />
            </button>

            <span className="tv-counter-badge">
              {currentIndex + 1}/{articles.length}
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="tv-ctrl-btn"
              aria-label="Next breaking headline"
            >
              <ChevronRight size={16} color="#ffffff" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
