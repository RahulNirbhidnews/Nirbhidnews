import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Sparkles, ArrowRight } from 'lucide-react';
import { Article } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { resolveMediaUrl } from '../../utils/mediaUrl';

interface HeroFeaturedProps {
  articles: Article[];
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({ articles }) => {
  const { language, t, translateCategory, translateArticle } = useLanguage();

  if (!articles || articles.length === 0) {
    return null;
  }

  // Display only the primary featured website launch story
  const primaryArticle = translateArticle(articles[0]);

  const formatPublishDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const localeMap = { mr: 'mr-IN', en: 'en-IN', hi: 'hi-IN' };
    return new Date(dateStr).toLocaleDateString(localeMap[language] || 'mr-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section className="hero-featured-section" style={{ margin: '1.5rem 0 2.5rem 0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}
      >
        <Sparkles size={18} color="var(--color-primary)" />
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--color-secondary)',
          }}
        >
          {t.featuredStories}
        </span>
      </div>

      <div style={{ width: '100%' }}>
        {/* Full-Width Hero Featured Spotlight Card */}
        <article
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg, 12px)',
            overflow: 'hidden',
            backgroundColor: '#0f172a',
            minHeight: '420px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease',
            border: '1.5px solid rgba(239, 68, 68, 0.3)',
          }}
          className="hero-primary-card"
        >
          {primaryArticle.featured_image_url ? (
            <>
              <img
                src={resolveMediaUrl(primaryArticle.featured_image_url)}
                alt={primaryArticle.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.85,
                  transition: 'transform 0.4s ease',
                }}
                className="hero-img-zoom"
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.65) 45%, rgba(15, 23, 42, 0.98) 100%)',
                }}
              />
            </>
          ) : (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: 'linear-gradient(90deg, #dc2626 0%, #ea580c 100%)',
              }}
            />
          )}

          {/* Content inside Primary Card */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '2.25rem 2rem',
              color: 'white',
            }}
            className="hero-card-content"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
              {primaryArticle.category && (
                <Link
                  to={`/category/${primaryArticle.category.slug}`}
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-sm, 4px)',
                    letterSpacing: '0.5px',
                    textDecoration: 'none',
                  }}
                >
                  {translateCategory(primaryArticle.category.slug, primaryArticle.category.name)}
                </Link>
              )}

              <span
                style={{
                  backgroundColor: 'rgba(234, 179, 8, 0.25)',
                  color: '#fef08a',
                  border: '1px solid rgba(234, 179, 8, 0.5)',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-sm, 4px)',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Sparkles size={12} color="#facc15" /> {t.featuredStories}
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                fontWeight: 800,
                lineHeight: 1.3,
                marginBottom: '0.85rem',
                maxWidth: '900px',
              }}
              className="hero-headline-text"
            >
              <Link to={`/news/${primaryArticle.slug}`} style={{ color: 'white', textDecoration: 'none' }}>
                {primaryArticle.title}
              </Link>
            </h2>

            {primaryArticle.excerpt && (
              <p
                style={{
                  fontSize: '1rem',
                  color: '#e2e8f0',
                  lineHeight: 1.6,
                  marginBottom: '1.25rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  maxWidth: '850px',
                }}
              >
                {primaryArticle.excerpt}
              </p>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  fontSize: '0.8125rem',
                  color: '#cbd5e1',
                  flexWrap: 'wrap',
                }}
              >
                {primaryArticle.author_name && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: '#f8fafc' }}>
                    <User size={14} color="#f87171" /> {primaryArticle.author_name}
                  </span>
                )}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={14} /> {formatPublishDate(primaryArticle.published_at || primaryArticle.created_at)}
                </span>
              </div>

              <Link
                to={`/news/${primaryArticle.slug}`}
                className="btn btn-primary"
                style={{
                  fontSize: '0.8125rem',
                  padding: '0.45rem 1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: 700,
                }}
              >
                <span>{t.readMore}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
