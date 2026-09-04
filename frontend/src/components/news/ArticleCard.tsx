import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Newspaper, Flame, Play, Volume2, VolumeX } from 'lucide-react';
import { Article } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

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

  const isDirectVideo =
    article.video_url &&
    (article.video_url.endsWith('.mp4') ||
      article.video_url.endsWith('.webm') ||
      article.video_url.endsWith('.mov') ||
      article.video_url.startsWith('/static/'));

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

  if (variant === 'horizontal') {
    return (
      <article
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'grid',
          gridTemplateColumns: '180px 1fr',
          gap: '1.25rem',
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
        className="article-card-horizontal"
      >
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
          ) : article.featured_image_url ? (
            <img
              src={article.featured_image_url}
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
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                color: '#94a3b8',
              }}
            >
              <Newspaper size={28} />
            </div>
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

          {article.video_url && (
            <span
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(2px)',
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

        <div style={{ padding: '1rem 1rem 1rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {article.category && (
            <Link
              to={`/category/${article.category.slug}`}
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.35rem',
                display: 'inline-block',
                width: 'fit-content',
              }}
            >
              {translateCategory(article.category.slug, article.category.name)}
            </Link>
          )}

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

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.75rem',
              color: 'var(--color-text-light)',
              flexWrap: 'wrap',
            }}
          >
            {article.author_name && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <User size={12} /> {article.author_name}
              </span>
            )}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={12} /> {publishedDate}
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article
        style={{
          display: 'flex',
          gap: '0.75rem',
          padding: '0.75rem 0',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
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
          {article.featured_image_url ? (
            <img
              src={article.featured_image_url}
              alt={article.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#1e293b',
                color: '#64748b',
              }}
            >
              <Newspaper size={18} />
            </div>
          )}
          {article.video_url && (
            <span
              style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                color: '#ef4444',
                padding: '1px 3px',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Play size={8} fill="#ef4444" />
            </span>
          )}
        </Link>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
          <h4
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              lineHeight: 1.3,
              color: 'var(--color-secondary)',
              margin: '0.2rem 0',
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

  // Default: Vertical Card with Hover Auto-Play
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
      }}
      className="article-card-vertical"
    >
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
        ) : article.featured_image_url ? (
          <img
            src={article.featured_image_url}
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
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              color: '#94a3b8',
              gap: '0.5rem',
            }}
          >
            <Newspaper size={36} color="#dc2626" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{t.brandName}</span>
          </div>
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

        {article.video_url && (
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

      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
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

          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={12} /> {readTimeMinutes} {t.minutesRead}
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.15rem',
            fontWeight: 700,
            lineHeight: 1.35,
            color: 'var(--color-secondary)',
            margin: '0.25rem 0 0.5rem 0',
          }}
        >
          <Link to={`/news/${article.slug}`} style={{ color: 'inherit' }} className="article-title-hover">
            {article.title}
          </Link>
        </h3>

        {showExcerpt && article.excerpt && (
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.55,
              margin: '0 0 1rem 0',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1,
            }}
          >
            {article.excerpt}
          </p>
        )}

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
