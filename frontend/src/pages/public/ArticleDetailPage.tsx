import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Clock, User, Calendar, ChevronRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { articleApi } from '../../api/articles';
import { MarkdownRenderer } from '../../components/news/MarkdownRenderer';
import { SocialShareBar } from '../../components/news/SocialShareBar';
import { ArticleCard } from '../../components/news/ArticleCard';
import { AdBanner } from '../../components/common/AdBanner';
import { SEOHead } from '../../components/common/SEOHead';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { useLanguage } from '../../context/LanguageContext';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t, translateCategory, translateArticle } = useLanguage();

  const {
    data: rawArticle,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['public-article', slug],
    queryFn: () => (slug ? articleApi.getArticleBySlug(slug) : null),
    enabled: Boolean(slug),
  });

  const article = rawArticle ? translateArticle(rawArticle) : null;

  // Fetch related articles from same category
  const { data: relatedData } = useQuery({
    queryKey: ['related-articles', article?.category_id],
    queryFn: () =>
      article?.category_id
        ? articleApi.getPublicArticles({ category_id: article.category_id, limit: 4 })
        : null,
    enabled: Boolean(article?.category_id),
  });

  const relatedArticles = (relatedData?.items || []).filter((item) => item.id !== article?.id);

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '2rem 1.25rem' }}>
        <SkeletonLoader variant="article-detail" />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="container" style={{ padding: '5rem 1rem', textAlign: 'center', maxWidth: '600px' }}>
        <div
          style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
          }}
        >
          <AlertCircle size={32} />
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: '0.75rem' }}>
          {t.noArticlesFound}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
          {t.noArticlesDesc}
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} /> {t.home}
        </Link>
      </div>
    );
  }

  const localeMap = { mr: 'mr-IN', en: 'en-IN', hi: 'hi-IN' };
  const currentLocale = localeMap[language] || 'mr-IN';

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString(currentLocale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : new Date(article.created_at).toLocaleDateString(currentLocale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

  const wordCount = article.content ? article.content.split(/\s+/).length : 0;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="container" style={{ padding: '1.5rem 1.25rem 4rem 1.25rem' }}>
      <SEOHead
        title={article.title}
        description={article.excerpt || article.title}
        image={article.featured_image_url || undefined}
        type="article"
        author={article.author_name || 'Nirbhid Bureau'}
        publishedTime={article.published_at || article.created_at}
        category={article.category?.name}
      />

      {/* Breadcrumb Navigation */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8125rem',
          color: 'var(--color-text-light)',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
        }}
        aria-label="Breadcrumbs"
      >
        <Link to="/" style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>
          {t.home}
        </Link>
        <ChevronRight size={14} />
        {article.category && (
          <>
            <Link
              to={`/category/${article.category.slug}`}
              style={{ color: 'var(--color-primary)', fontWeight: 600 }}
            >
              {translateCategory(article.category.slug, article.category.name)}
            </Link>
            <ChevronRight size={14} />
          </>
        )}
        <span style={{ color: 'var(--color-text-main)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {article.title}
        </span>
      </nav>

      {/* Main Grid: Article Column (Left) & Sidebar (Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '7fr 3fr',
          gap: '2.5rem',
        }}
        className="article-page-layout"
      >
        {/* Left Column: Full News Content */}
        <main>
          {/* Category Tag */}
          {article.category && (
            <Link
              to={`/category/${article.category.slug}`}
              className="badge badge-primary"
              style={{ marginBottom: '1rem', textDecoration: 'none' }}
            >
              {translateCategory(article.category.slug, article.category.name)}
            </Link>
          )}

          {/* Main Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.25rem',
              fontWeight: 800,
              lineHeight: 1.25,
              color: 'var(--color-secondary)',
              margin: '0.5rem 0 1rem 0',
            }}
            className="article-detail-headline"
          >
            {article.title}
          </h1>

          {/* Excerpt / Lead */}
          {article.excerpt && (
            <p
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                fontWeight: 500,
                marginBottom: '1.25rem',
                borderLeft: '3px solid var(--color-primary)',
                paddingLeft: '1rem',
              }}
            >
              {article.excerpt}
            </p>
          )}

          {/* Byline & Metadata */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              borderTop: '1px solid var(--color-border)',
              borderBottom: '1px solid var(--color-border)',
              padding: '0.75rem 0',
              margin: '1.25rem 0',
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: 'var(--color-secondary)' }}>
                <User size={14} color="var(--color-primary)" /> {article.author_name || t.specialCorrespondent}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} /> {publishedDate}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={14} /> {readTimeMinutes} {t.minutesRead}
              </span>
            </div>
          </div>

          {/* Social Share Bar Top */}
          <SocialShareBar title={article.title} />

          {/* Featured Image */}
          {article.featured_image_url && (
            <figure style={{ margin: '1.5rem 0 2rem 0' }}>
              <img
                src={article.featured_image_url}
                alt={article.title}
                style={{
                  width: '100%',
                  maxHeight: '480px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              />
              <figcaption
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-light)',
                  marginTop: '0.5rem',
                  fontStyle: 'italic',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{article.title}</span>
                <span>Photo: Nirbhid Bureau</span>
              </figcaption>
            </figure>
          )}

          {/* Render Full Article Content */}
          <article style={{ margin: '2rem 0' }}>
            <MarkdownRenderer content={article.content} />
          </article>

          {/* In-article Ad Banner */}
          <AdBanner type="inline" label="Sponsored Story / प्रायोजित बातमी" />

          {/* Bottom Social Share Bar */}
          <div style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '1rem 0', margin: '2rem 0' }}>
            <SocialShareBar title={article.title} />
          </div>

          {/* Editorial Disclaimer */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.5,
              marginBottom: '3rem',
            }}
          >
            {t.editorialDisclaimer}
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <section style={{ marginTop: '3rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderBottom: '2px solid var(--color-primary)',
                  paddingBottom: '0.5rem',
                  marginBottom: '1.5rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--color-secondary)',
                    margin: 0,
                  }}
                >
                  {t.relatedNews}
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1.25rem',
                }}
              >
                {relatedArticles.map((item) => (
                  <ArticleCard key={item.id} article={item} variant="vertical" showExcerpt={false} />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Right Sidebar: Categories, Trending, Ads */}
        <aside className="article-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Ad Slot */}
          <AdBanner type="sidebar" />

          {/* About Channel Box */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-secondary)', margin: '0 0 0.5rem 0' }}>
              {t.brandName}
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
              {t.editorialDisclaimer}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
