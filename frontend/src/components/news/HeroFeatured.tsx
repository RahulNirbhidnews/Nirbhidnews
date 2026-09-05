import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Sparkles } from 'lucide-react';
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

  const primaryArticle = translateArticle(articles[0]);
  const secondaryArticles = articles.slice(1, 4).map(translateArticle);

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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: secondaryArticles.length > 0 ? '7fr 5fr' : '1fr',
          gap: '1.5rem',
        }}
        className="hero-grid"
      >
        {/* Primary Large Lead Card */}
        <article
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            backgroundColor: '#0f172a',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            boxShadow: 'var(--shadow-md)',
            transition: 'box-shadow 0.3s ease',
            border: !primaryArticle.featured_image_url ? '1px solid #334155' : 'none',
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
                  background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.05) 0%, rgba(15, 23, 42, 0.6) 45%, rgba(15, 23, 42, 0.95) 100%)',
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
              padding: '2rem',
              color: 'white',
            }}
          >
            {primaryArticle.category && (
              <Link
                to={`/category/${primaryArticle.category.slug}`}
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.5px',
                }}
              >
                {translateCategory(primaryArticle.category.slug, primaryArticle.category.name)}
              </Link>
            )}

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                fontWeight: 800,
                lineHeight: 1.25,
                marginBottom: '0.75rem',
              }}
            >
              <Link to={`/news/${primaryArticle.slug}`} style={{ color: 'white', textDecoration: 'none' }}>
                {primaryArticle.title}
              </Link>
            </h2>

            {primaryArticle.excerpt && (
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: '#e2e8f0',
                  lineHeight: 1.5,
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  maxWidth: '750px',
                }}
              >
                {primaryArticle.excerpt}
              </p>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                fontSize: '0.8125rem',
                color: '#cbd5e1',
                flexWrap: 'wrap',
              }}
            >
              {primaryArticle.author_name && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <User size={13} /> {primaryArticle.author_name}
                </span>
              )}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={13} /> {formatPublishDate(primaryArticle.published_at || primaryArticle.created_at)}
              </span>
            </div>
          </div>
        </article>

        {/* Secondary Featured Stack */}
        {secondaryArticles.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'space-between',
            }}
          >
            {secondaryArticles.map((article) => {
              const hasImg = Boolean(article.featured_image_url && article.featured_image_url.trim() !== '');
              return (
                <article
                  key={article.id}
                  style={{
                    display: hasImg ? 'grid' : 'block',
                    gridTemplateColumns: hasImg ? '130px 1fr' : '1fr',
                    gap: '1rem',
                    backgroundColor: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    borderLeft: !hasImg ? '4px solid var(--color-primary)' : '1px solid var(--color-border)',
                    overflow: 'hidden',
                    padding: '0.85rem',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  className="hero-secondary-card"
                >
                  {hasImg && (
                    <Link
                      to={`/news/${article.slug}`}
                      style={{
                        backgroundColor: '#0f172a',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        display: 'block',
                        height: '100px',
                      }}
                    >
                      <img
                        src={resolveMediaUrl(article.featured_image_url!)}
                        alt={article.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        loading="lazy"
                      />
                    </Link>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {article.category && (
                      <Link
                        to={`/category/${article.category.slug}`}
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          color: 'var(--color-primary)',
                          textTransform: 'uppercase',
                          marginBottom: '0.25rem',
                          display: 'inline-block',
                        }}
                      >
                        {translateCategory(article.category.slug, article.category.name)}
                      </Link>
                    )}

                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '0.9375rem',
                        fontWeight: 700,
                        lineHeight: 1.35,
                        color: 'var(--color-secondary)',
                        margin: '0 0 0.35rem 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      <Link to={`/news/${article.slug}`} style={{ color: 'inherit' }} className="article-title-hover">
                        {article.title}
                      </Link>
                    </h3>

                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                      {formatPublishDate(article.published_at || article.created_at)}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
