import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  TrendingUp,
  Folder,
  ArrowRight,
  Shield,
  Newspaper,
  Loader2,
  Clock
} from 'lucide-react';
import { articleApi } from '../../api/articles';
import { categoryApi } from '../../api/categories';
import { BreakingNewsTicker } from '../../components/news/BreakingNewsTicker';
import { HeroFeatured } from '../../components/news/HeroFeatured';
import { ArticleCard } from '../../components/news/ArticleCard';
import { CategorySection } from '../../components/news/CategorySection';
import { AdBanner } from '../../components/common/AdBanner';
import { SEOHead } from '../../components/common/SEOHead';

export const HomePage: React.FC = () => {
  // Fetch Featured Articles for Hero
  const { data: featuredArticles, isLoading: loadingFeatured } = useQuery({
    queryKey: ['featured-articles'],
    queryFn: () => articleApi.getFeaturedArticles(4),
  });

  // Fetch Latest Published Articles for Main Feed
  const { data: latestData, isLoading: loadingLatest } = useQuery({
    queryKey: ['latest-public-articles'],
    queryFn: () => articleApi.getPublicArticles({ limit: 8, page: 1 }),
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
  });

  // Fetch Politics Category News
  const { data: politicsData } = useQuery({
    queryKey: ['category-news-politics'],
    queryFn: () => articleApi.getPublicArticles({ category: 'politics', limit: 4 }),
  });

  // Fetch Mumbai Category News
  const { data: mumbaiData } = useQuery({
    queryKey: ['category-news-mumbai'],
    queryFn: () => articleApi.getPublicArticles({ category: 'mumbai', limit: 4 }),
  });

  const latestArticles = latestData?.items || [];
  const maharashtraArticles = maharashtraData?.items || [];
  const politicsArticles = politicsData?.items || [];
  const mumbaiArticles = mumbaiData?.items || [];

  const maharashtraCategory = categories?.find((c) => c.slug === 'maharashtra') || {
    id: 'maharashtra',
    name: 'महाराष्ट्र',
    slug: 'maharashtra',
  };

  const politicsCategory = categories?.find((c) => c.slug === 'politics') || {
    id: 'politics',
    name: 'राजकारण',
    slug: 'politics',
  };

  const mumbaiCategory = categories?.find((c) => c.slug === 'mumbai') || {
    id: 'mumbai',
    name: 'मुंबई मेट्रो',
    slug: 'mumbai',
  };

  const isInitialLoading = loadingFeatured && loadingLatest;

  return (
    <div className="container" style={{ paddingBottom: '4rem' }}>
      <SEOHead
        title="निर्भीड न्यूज - Truth Unfiltered"
        description="महाराष्ट्र, मुंबई, ठाणे आणि देशातील ताज्या घडामोडी, राजकारण आणि निर्भीड पत्रकारितेचे डिजिटल केंद्र."
      />
      {/* 1. Breaking News Ticker */}
      <BreakingNewsTicker />

      {/* 2. Hero Featured Stories Section */}
      {isInitialLoading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <Loader2 size={36} color="#dc2626" className="animate-spin" style={{ margin: '0 auto 1rem auto' }} />
          <p style={{ color: '#64748b' }}>ताज्या महत्त्वाच्या बातम्या लोड होत आहेत...</p>
        </div>
      ) : (
        <HeroFeatured articles={featuredArticles || []} />
      )}

      {/* 3. Top Leaderboard Advertisement Banner */}
      <AdBanner type="leaderboard" />

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
                ताज्या घडामोडी • Latest News
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
              सर्व बातम्या →
            </Link>
          </div>

          {/* Latest Articles Grid */}
          {latestArticles.length === 0 ? (
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
                अद्याप कोणतीही बातमी प्रकाशित झालेली नाही
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                नवीन बातम्या प्रकाशित करण्यासाठी Admin CMS चा वापर करा.
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
          <AdBanner type="inline" />

          {/* Categorized Row 1: Maharashtra */}
          {maharashtraArticles.length > 0 && (
            <CategorySection category={maharashtraCategory as any} articles={maharashtraArticles} />
          )}

          {/* Categorized Row 2: Politics */}
          {politicsArticles.length > 0 && (
            <CategorySection category={politicsCategory as any} articles={politicsArticles} />
          )}

          {/* Categorized Row 3: Mumbai */}
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
                महत्त्वाच्या बातम्या
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {(featuredArticles || latestArticles.slice(0, 5)).map((item) => (
                <ArticleCard key={item.id} article={item} variant="compact" />
              ))}
            </div>
          </div>

          {/* Sidebar Advertisement */}
          <AdBanner type="sidebar" />

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
                विभाग • Categories
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
                  <span>{cat.name}</span>
                  <ArrowRight size={14} color="#94a3b8" />
                </Link>
              ))}
            </div>
          </div>

          {/* Admin CMS Access Widget */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fca5a5', marginBottom: '0.5rem' }}>
              <Shield size={18} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                पत्रकार व संपादक पोर्टल
              </span>
            </div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
              Nirbhid Editorial CMS
            </h4>
            <p style={{ fontSize: '0.8125rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              बातम्या प्रकाशित करण्यासाठी, फोटो अपलोड करण्यासाठी आणि श्रेण्या व्यवस्थापित करण्यासाठी लॉगिन करा.
            </p>
            <Link
              to="/admin/login"
              className="btn btn-primary"
              style={{ width: '100%', fontSize: '0.875rem' }}
            >
              CMS मध्ये लॉगिन करा
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};
