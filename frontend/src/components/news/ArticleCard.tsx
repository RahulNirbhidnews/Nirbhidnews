import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Flame, Play, Volume2, VolumeX } from 'lucide-react';
import { Article } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { resolveMediaUrl } from '../../utils/mediaUrl';

interface ArticleCardProps {
  article: Article;
  variant?: 'vertical' | 'horizontal' | 'compact' | 'lead';
  showExcerpt?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article: rawArticle,
  variant = 'vertical',
  showExcerpt = true,
}) => {
  const { language, t, translateCategory, translateArticle } = useLanguage();
  const article = translateArticle(rawArticle);

  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [imageError, setImageError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const localeMap = { mr: 'mr-IN', en: 'en-IN', hi: 'hi-IN' };
  const currentLocale = localeMap[language] || 'mr-IN';

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString(currentLocale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : new Date(article.created_at).toLocaleDateString(currentLocale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

  // Calculate estimated reading time
  const wordCount = article.content ? article.content.split(/\s+/).length : 0;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const hasVideo = Boolean(article.video_url && article.video_url.trim() !== '');
  const rawImageUrl = article.featured_image_url ? article.featured_image_url.trim() : '';
  const hasImage = Boolean(rawImageUrl && !imageError);

  const isDirectVideo =
    hasVideo &&
    (article.video_url!.endsWith('.mp4') ||
      article.video_url!.endsWith('.webm') ||
      article.video_url!.endsWith('.mov') ||
      article.video_url!.startsWith('/static/'));

  const fullVideoSrc =
    isDirectVideo && article.video_url?.startsWith('/static/')
      ? `${import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8000'}${article.video_url}`
      : article.video_url || '';

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && isDirectVideo) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && isDirectVideo) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // ==========================================
  // VARIANT 1: COMPACT (SIDEBAR / QUICK FEED)
  // ==========================================
  if (variant === 'compact') {
    return (
      <article
        style={{
          display: 'flex',
          gap: hasImage ? '0.75rem' : '0.5rem',
          padding: '0.85rem 0',
          borderBottom: '1px solid var(--color-border)',
          alignItems: 'center',
        }}
        className="article-card-compact"
      >
        {/* If Image exists, show thumbnail; if no image, skip and show clean headline-only */}
        {hasImage && (
          <Link
            to={`/news/${article.slug}`}
            style={{
              position: 'relative',
              width: '80px',
              height: '65px',
              flexShrink: 0,
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              backgroundColor: '#0f172a',
            }}
          >
            <img
              src={resolveMediaUrl(rawImageUrl)}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
              onError={() => setImageError(true)}
            />
            {hasVideo && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  color: '#ef4444',
                  padding: '1px 4px',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Play size={8} fill="#ef4444" />
              </span>
            )}
          </Link>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            {article.category && (
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  textTransform: 'uppercase',
                }}
              >
                {translateCategory(article.category.slug, article.category.name)}
              </span>
            )}
            {hasVideo && !hasImage && (
              <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#ef4444', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                <Play size={8} fill="#ef4444" /> VIDEO
              </span>
            )}
          </div>

          <h4
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              lineHeight: 1.35,
              color: 'var(--color-secondary)',
              margin: '0 0 0.25rem 0',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            <Link to={`/news/${article.slug}`} style={{ color: 'inherit' }} className="article-title-hover">
              {article.title}
            </Link>
          </h4>

          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-light)' }}>
            {publishedDate}
          </span>
        </div>
      </article>
    );
  }

  // ==========================================
  // VARIANT 2: HORIZONTAL ROW CARD
  // ==========================================
  if (variant === 'horizontal') {
    return (
      <article
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          display: hasImage ? 'grid' : 'block',
          gridTemplateColumns: hasImage ? '180px 1fr' : '1fr',
          gap: '1.25rem',
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          borderLeft: !hasImage ? '4px solid var(--color-primary)' : '1px solid var(--color-border)',
          overflow: 'hidden',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          padding: !hasImage ? '1.25rem' : '0',
        }}
        className="article-card-horizontal"
      >
        {/* If Image exists, show left column image/video */}
        {hasImage && (
          <Link
            to={`/news/${article.slug}`}
            style={{
              position: 'relative',
              backgroundColor: '#0f172a',
              overflow: 'hidden',
              display: 'block',
              height: '100%',
              minHeight: '130px',
            }}
          >
            {isDirectVideo && isHovered ? (
              <video
                ref={videoRef}
                src={fullVideoSrc}
                muted={isMuted}
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img
                src={resolveMediaUrl(rawImageUrl)}
                alt={article.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.35s ease',
                }}
                className="article-img-hover"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            )}

            {article.is_breaking && (
              <span
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.4rem',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  zIndex: 2,
                }}
              >
                <Flame size={10} /> {t.breakingNews}
              </span>
            )}

            {hasVideo && (
              <span
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  color: '#ffffff',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.4rem',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  zIndex: 2,
                }}
              >
                <Play size={10} fill="#ef4444" color="#ef4444" /> VIDEO
              </span>
            )}

            {isDirectVideo && isHovered && (
              <button
                type="button"
                onClick={toggleMute}
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 5,
                }}
              >
                {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              </button>
            )}
          </Link>
        )}

        <div style={{ padding: hasImage ? '1rem 1rem 1rem 0' : '0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            {article.category && (
              <Link
                to={`/category/${article.category.slug}`}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'inline-block',
                }}
              >
                {translateCategory(article.category.slug, article.category.name)}
              </Link>
            )}

            {hasVideo && !hasImage && (
              <span
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#dc2626',
                  padding: '1px 6px',
                  borderRadius: '3px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Play size={10} fill="#dc2626" /> VIDEO
              </span>
            )}
          </div>

          <h3
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              lineHeight: 1.35,
              color: 'var(--color-secondary)',
              margin: '0 0 0.5rem 0',
              fontFamily: 'var(--font-serif)',
            }}
          >
            <Link to={`/news/${article.slug}`} style={{ color: 'inherit' }} className="article-title-hover">
              {article.title}
            </Link>
          </h3>

          {showExcerpt && article.excerpt && (
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.5,
                margin: '0 0 0.5rem 0',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {article.excerpt}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <User size={12} /> {article.author_name || t.by}
            </span>
            <span>•</span>
            <span>{publishedDate}</span>
          </div>
        </div>
      </article>
    );
  }

  // =========================================================================
  // VARIANT 3: DEFAULT VERTICAL CARD (SMART MEDIA: IMAGE / VIDEO / TEXT-FIRST)
  // ==========================================================
  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: '#fff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="article-card-vertical"
    >
      {/* Top Accent Gradient Bar for No-Image Headline Cards */}
      {!hasImage && (
        <div
          style={{
            height: '4px',
            background: 'linear-gradient(90deg, #dc2626 0%, #ea580c 50%, #f59e0b 100%)',
            width: '100%',
          }}
        />
      )}

      {/* 1. MEDIA CONTAINER (RENDER ONLY IF ARTICLE HAS VALID IMAGE OR VIDEO) */}
      {hasImage && (
        <Link
          to={`/news/${article.slug}`}
          style={{
            position: 'relative',
            width: '100%',
            height: '200px',
            backgroundColor: '#0f172a',
            overflow: 'hidden',
            display: 'block',
          }}
        >
          {isDirectVideo && isHovered ? (
            <video
              ref={videoRef}
              src={fullVideoSrc}
              muted={isMuted}
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <img
              src={resolveMediaUrl(rawImageUrl)}
              alt={article.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.35s ease',
              }}
              className="article-img-hover"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}

          {article.is_breaking && (
            <span
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: '#dc2626',
                color: 'white',
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '0.2rem 0.5rem',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                zIndex: 2,
              }}
            >
              <Flame size={12} /> {t.breakingNews}
            </span>
          )}

          {article.is_featured && !article.is_breaking && (
            <span
              style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                backgroundColor: 'var(--color-secondary)',
                color: 'white',
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '0.2rem 0.5rem',
                borderRadius: '3px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                zIndex: 2,
              }}
            >
              {t.featuredStories}
            </span>
          )}

          {hasVideo && (
            <span
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(3px)',
                color: '#ffffff',
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '0.2rem 0.5rem',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                border: '1px solid rgba(220, 38, 38, 0.5)',
                zIndex: 2,
              }}
            >
              <Play size={10} fill="#ef4444" color="#ef4444" /> VIDEO
            </span>
          )}

          {isDirectVideo && isHovered && (
            <button
              type="button"
              onClick={toggleMute}
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 5,
              }}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          )}
        </Link>
      )}

      {/* 2. TEXT CONTENT & BYLINE */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Header Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {article.category ? (
              <Link
                to={`/category/${article.category.slug}`}
                className="badge badge-primary"
                style={{ textDecoration: 'none' }}
              >
                {translateCategory(article.category.slug, article.category.name)}
              </Link>
            ) : (
              <span className="badge badge-outline">General</span>
            )}

            {/* Video Badge on Text-Only Cards */}
            {hasVideo && !hasImage && (
              <span
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#dc2626',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Play size={10} fill="#dc2626" /> VIDEO
              </span>
            )}

            {/* Breaking Badge on Text-Only Cards */}
            {article.is_breaking && !hasImage && (
              <span
                style={{
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Flame size={10} /> BREAKING
              </span>
            )}
          </div>

          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={12} /> {readTimeMinutes} {t.minutesRead}
          </span>
        </div>

        {/* Headline */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: !hasImage ? '1.25rem' : '1.15rem',
            fontWeight: 800,
            lineHeight: 1.35,
            color: 'var(--color-secondary)',
            margin: '0.25rem 0 0.5rem 0',
          }}
        >
          <Link to={`/news/${article.slug}`} style={{ color: 'inherit' }} className="article-title-hover">
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {showExcerpt && article.excerpt && (
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.55,
              margin: '0 0 1rem 0',
              display: '-webkit-box',
              WebkitLineClamp: !hasImage ? 4 : 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1,
              borderLeft: !hasImage ? '2px solid #e2e8f0' : 'none',
              paddingLeft: !hasImage ? '0.65rem' : '0',
            }}
          >
            {article.excerpt}
          </p>
        )}

        {/* Card Footer Byline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--color-text-light)',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '0.75rem',
            marginTop: 'auto',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500 }}>
            <User size={12} /> {article.author_name || t.by}
          </span>
          <span>{publishedDate}</span>
        </div>
      </div>
    </article>
  );
};
