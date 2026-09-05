import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Folder, Newspaper, ArrowLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { categoryApi } from '../../api/categories';
import { articleApi } from '../../api/articles';
import { ArticleCard } from '../../components/news/ArticleCard';
import { Pagination } from '../../components/common/Pagination';
import { AdBanner } from '../../components/common/AdBanner';
import { SEOHead } from '../../components/common/SEOHead';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { useLanguage } from '../../context/LanguageContext';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, translateCategory } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState(pageParam);

  // Sync state with search params
  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch Category Info
  const {
    data: category,
    isLoading: loadingCategory,
    isError: categoryError,
  } = useQuery({
    queryKey: ['public-category', slug],
    queryFn: () => (slug ? categoryApi.getCategoryBySlug(slug) : null),
    enabled: Boolean(slug),
  });

  // Fetch Articles for Category
  const {
    data: articleData,
    isLoading: loadingArticles,
  } = useQuery({
    queryKey: ['category-articles', slug, currentPage],
    queryFn: () =>
      slug
        ? articleApi.getPublicArticles({
            category: slug,
            page: currentPage,
            limit: 12,
          })
        : null,
    enabled: Boolean(slug),
    refetchInterval: 1000 * 5, // Live auto-refresh every 5 seconds
  });

  const isLoading = loadingCategory || loadingArticles;
  const articles = articleData?.items || [];
  const totalPages = articleData?.total_pages || 1;
  const totalArticles = articleData?.total || 0;

  const translatedCategoryName = category
    ? translateCategory(category.slug, category.name)
    : (slug || '');

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '2rem 1.25rem' }}>
        <SkeletonLoader variant="card-vertical" count={6} />
      </div>
    );
  }

  if (categoryError || !category) {
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

  return (
    <div className="container" style={{ padding: '1.5rem 1.25rem 4rem 1.25rem' }}>
      <SEOHead
        title={`${translatedCategoryName} - ${t.brandName}`}
        description={category.description || `${translatedCategoryName} ${t.categories}`}
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
        }}
      >
        <Link to="/" style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>
          {t.home}
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{translatedCategoryName}</span>
      </nav>

      {/* Category Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-secondary) 0%, #1e293b 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          color: 'white',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fca5a5', marginBottom: '0.5rem' }}>
          <Folder size={18} />
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            {t.categories}
          </span>
        </div>

        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-brand)' }}>
          {translatedCategoryName}
        </h1>

        {category.description && (
          <p style={{ color: '#cbd5e1', fontSize: '0.9375rem', marginTop: '0.5rem', maxWidth: '700px' }}>
            {category.description}
          </p>
        )}

        <div style={{ fontSize: '0.8125rem', color: '#94a3b8', marginTop: '1rem' }}>
          {totalArticles} {t.resultsFound}
        </div>
      </div>

      {/* Ad Banner Leaderboard */}
      <AdBanner type="leaderboard" />

      {/* Articles Grid / Empty State */}
      {articles.length === 0 ? (
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '4rem 2rem',
            textAlign: 'center',
            margin: '2rem 0',
          }}
        >
          <Newspaper size={48} color="#94a3b8" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
            {t.noArticlesFound}
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            {t.noArticlesDesc}
          </p>
          <Link to="/" className="btn btn-outline">
            {t.showAllNews}
          </Link>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.75rem',
              marginTop: '1.5rem',
            }}
          >
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="vertical" showExcerpt={true} />
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
