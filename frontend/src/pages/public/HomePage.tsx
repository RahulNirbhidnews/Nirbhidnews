import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  TrendingUp,
  Folder,
  ArrowRight,
  Newspaper,
  Clock
} from 'lucide-react';
import { articleApi } from '../../api/articles';
import { categoryApi } from '../../api/categories';
import { BreakingNewsTicker } from '../../components/news/BreakingNewsTicker';
import { HeroFeatured } from '../../components/news/HeroFeatured';
import { ArticleCard } from '../../components/news/ArticleCard';
import { CategorySection } from '../../components/news/CategorySection';
import { AdBanner } from '../../components/common/AdBanner';
import { ChiefEditorSpotlight } from '../../components/news/ChiefEditorSpotlight';
import { SEOHead } from '../../components/common/SEOHead';
import { SkeletonLoader } from '../../components/common/SkeletonLoader';
import { useLanguage } from '../../context/LanguageContext';

export const HomePage: React.FC = () => {
  const { t, translateCategory } = useLanguage();

  // Fetch Featured Articles for Hero
  const { data: featuredArticles, isLoading: loadingFeatured } = useQuery({
    queryKey: ['featured-articles'],
    queryFn: () => articleApi.getFeaturedArticles(4),
    refetchInterval: 1000 * 5, // Fast 5s live updates
  });

  // Fetch Latest Published Articles for Main Feed
  const { data: latestData, isLoading: loadingLatest } = useQuery({
    queryKey: ['latest-public-articles'],
    queryFn: () => articleApi.getPublicArticles({ limit: 8, page: 1 }),
    refetchInterval: 1000 * 5, // Fast 5s live updates
  });

  // Fetch Categories
  const { data: categories } = useQuery({
    queryKey: ['public-categories'],
    queryFn: categoryApi.getPublicCategories,
  });

  // Fetch Maharashtra Category News
  const { data: maharashtraData } = useQuery({
    queryKey: ['category-news-maharashtra'],
    queryFn: () => articleApi.getPublicArticles({ category: 'maharashtra', limit: 4 }),
    refetchInterval: 1000 * 5,
  });

  // Fetch World Category News
  const { data: worldData } = useQuery({
    queryKey: ['category-news-world'],
    queryFn: () => articleApi.getPublicArticles({ category: 'world', limit: 4 }),
    refetchInterval: 1000 * 5,
  });

  // Fetch Politics Category News
  const { data: politicsData } = useQuery({
    queryKey: ['category-news-politics'],
    queryFn: () => articleApi.getPublicArticles({ category: 'politics', limit: 4 }),
    refetchInterval: 1000 * 5,
  });

  // Fetch Mumbai Category News
  const { data: mumbaiData } = useQuery({
    queryKey: ['category-news-mumbai'],
    queryFn: () => articleApi.getPublicArticles({ category: 'mumbai', limit: 4 }),
    refetchInterval: 1000 * 5,
  });

  const latestArticles = latestData?.items || [];
  const maharashtraArticles = maharashtraData?.items || [];
  const worldArticles = worldData?.items || [];
  const politicsArticles = politicsData?.items || [];
  const mumbaiArticles = mumbaiData?.items || [];

  const maharashtraCategory = categories?.find((c) => c.slug === 'maharashtra') || {
    id: 'maharashtra',
    name: 'Maharashtra',
    slug: 'maharashtra',
  };

  const worldCategory = categories?.find((c) => c.slug === 'world') || {
    id: 'world',
    name: 'World (आंतरराष्ट्रीय)',
    slug: 'world',
  };

  const politicsCategory = categories?.find((c) => c.slug === 'politics') || {
    id: 'politics',
    name: 'Politics',
    slug: 'politics',
  };

  const mumbaiCategory = categories?.find((c) => c.slug === 'mumbai') || {
    id: 'mumbai',
    name: 'Mumbai',
    slug: 'mumbai',
  };

  const isInitialLoading = loadingFeatured && loadingLatest;

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <SEOHead
        title={`${t.brandName} - ${t.brandTagline}`}
        description={t.editorialDisclaimer}
      />

      {/* 1. Breaking News Ticker */}
      <BreakingNewsTicker />

      {/* 2. Top Header Ad Banner */}
      <AdBanner placement="top_header" />

      {/* 3. Hero Featured Stories Section */}
      {isInitialLoading ? (
        <SkeletonLoader variant="hero" />
      ) : (
        <HeroFeatured articles={featuredArticles || []} />
      )}

      {/* 4. Chief Editor & Founder Spotlight (Rahul Baburao Jogdand) */}
      <ChiefEditorSpotlight />

      {/* 4. Main Editorial Layout Grid (70% News Feed / 30% Sidebar) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '7fr 3fr',
          gap: '2.5rem',
          marginTop: '2rem',
        }}
        className="homepage-editorial-grid"
      >
        {/* Left Column: Latest Feed & Categorized Sections */}
        <main>
          {/* Latest Stories Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid var(--color-secondary)',
              paddingBottom: '0.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="var(--color-primary)" />
              <h2
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: 'var(--color-secondary)',
                  margin: 0,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {t.latestNews}
              </h2>
            </div>
            <Link
              to="/search"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
              }}
            >
              {t.viewAll} →
            </Link>
          </div>

          {/* Latest Articles Grid / Loading Skeleton */}
          {loadingLatest ? (
            <SkeletonLoader variant="card-vertical" count={4} />
          ) : latestArticles.length === 0 ? (
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '3rem 1.5rem',
                textAlign: 'center',
                marginBottom: '2rem',
              }}
            >
              <Newspaper size={40} color="#94a3b8" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                {t.noArticlesFound}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                {t.noArticlesDesc}
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem',
              }}
            >
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="vertical" showExcerpt={true} />
              ))}
            </div>
          )}

          {/* In-feed Ad Slot */}
          <AdBanner placement="in_article" />

          {/* Categorized Row 1: Maharashtra */}
          {maharashtraArticles.length > 0 && (
            <CategorySection category={maharashtraCategory as any} articles={maharashtraArticles} />
          )}

          {/* Categorized Row 2: World News */}
          {worldArticles.length > 0 && (
            <CategorySection category={worldCategory as any} articles={worldArticles} />
          )}

          {/* Categorized Row 3: Politics */}
          {politicsArticles.length > 0 && (
            <CategorySection category={politicsCategory as any} articles={politicsArticles} />
          )}

          {/* Categorized Row 4: Mumbai */}
          {mumbaiArticles.length > 0 && (
            <CategorySection category={mumbaiCategory as any} articles={mumbaiArticles} />
          )}
        </main>

        {/* Right Column: Sidebar (Trending, Categories, CMS Box, Ads) */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="homepage-sidebar">
          {/* Trending / Top Stories Widget */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: '2px solid var(--color-primary)',
                paddingBottom: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              <TrendingUp size={18} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-secondary)', margin: 0, textTransform: 'uppercase' }}>
                {t.topStories}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {(featuredArticles || latestArticles.slice(0, 5)).map((item) => (
                <ArticleCard key={item.id} article={item} variant="compact" />
              ))}
            </div>
          </div>

          {/* Sidebar Advertisement */}
          <AdBanner placement="sidebar" />

          {/* Browse Categories Widget */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderBottom: '2px solid var(--color-primary)',
                paddingBottom: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              <Folder size={18} color="var(--color-primary)" />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-secondary)', margin: 0, textTransform: 'uppercase' }}>
                {t.categories}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {categories?.slice(0, 10).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#f8fafc',
                    color: 'var(--color-secondary)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                  }}
                  className="sidebar-category-link"
                >
                  <span>{translateCategory(cat.slug, cat.name)}</span>
                  <ArrowRight size={14} color="#94a3b8" />
                </Link>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
};
