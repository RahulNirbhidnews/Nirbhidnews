import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, ChevronRight, Newspaper, Loader2, X } from 'lucide-react';
import { articleApi } from '../../api/articles';
import { categoryApi } from '../../api/categories';
import { ArticleCard } from '../../components/news/ArticleCard';
import { Pagination } from '../../components/common/Pagination';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get('q') || '';
  const catParam = searchParams.get('category') || '';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [searchTerm, setSearchTerm] = useState(qParam);
  const [selectedCategory, setSelectedCategory] = useState(catParam);
  const [currentPage, setCurrentPage] = useState(pageParam);

  // Sync state with URL params
  useEffect(() => {
    setSearchTerm(qParam);
    setSelectedCategory(catParam);
    setCurrentPage(pageParam);
  }, [qParam, catParam, pageParam]);

  // Fetch Categories for Dropdown
  const { data: categories } = useQuery({
    queryKey: ['public-categories'],
    queryFn: categoryApi.getPublicCategories,
  });

  // Query articles with search & category
  const {
    data: searchData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['search-articles', qParam, catParam, currentPage],
    queryFn: () =>
      articleApi.getPublicArticles({
        search: qParam || undefined,
        category: catParam || undefined,
        page: currentPage,
        limit: 12,
      }),
  });

  const articles = searchData?.items || [];
  const totalArticles = searchData?.total || 0;
  const totalPages = searchData?.total_pages || 1;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams: Record<string, string> = { page: '1' };
    if (searchTerm.trim()) newParams.q = searchTerm.trim();
    if (selectedCategory) newParams.category = selectedCategory;
    setSearchParams(newParams);
  };

  const handleCategoryChange = (catSlug: string) => {
    setSelectedCategory(catSlug);
    const newParams: Record<string, string> = { page: '1' };
    if (searchTerm.trim()) newParams.q = searchTerm.trim();
    if (catSlug) newParams.category = catSlug;
    setSearchParams(newParams);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSearchParams({});
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const newParams: Record<string, string> = { page: newPage.toString() };
    if (qParam) newParams.q = qParam;
    if (catParam) newParams.category = catParam;
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container" style={{ padding: '1.5rem 1.25rem 4rem 1.25rem' }}>
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
          Home
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Search News</span>
      </nav>

      {/* Search Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-secondary) 0%, #1e293b 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          color: 'white',
          marginBottom: '2rem',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 1rem 0', fontFamily: 'var(--font-brand)' }}>
          बातम्या शोधा • Search Articles
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '0.9375rem', marginBottom: '1.5rem', maxWidth: '600px' }}>
          महाराष्ट्रातील ताज्या घडामोडी, राजकारण, गुन्हेगारी, क्रीडा आणि स्थानिक बातम्या शोधा.
        </p>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
            <input
              type="text"
              placeholder="शोध शब्द प्रविष्ट करा (उदा. मुंबई, कायदा, निवडणूक)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 2.5rem 0.875rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                fontSize: '1rem',
                outline: 'none',
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            style={{
              padding: '0.875rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              fontSize: '0.9375rem',
              backgroundColor: '#ffffff',
              color: 'var(--color-secondary)',
              outline: 'none',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            <option value="">सर्व विभाग (All Categories)</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <button type="submit" className="btn btn-primary" style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
            <Search size={18} /> शोधा
          </button>
        </form>
      </div>

      {/* Query Stats & Filters */}
      {(qParam || catParam) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid var(--color-border)',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ fontSize: '0.9375rem', color: 'var(--color-text-main)' }}>
            <strong>{totalArticles}</strong> निकाल सापडले {qParam && <span>'<em>{qParam}</em>' साठी</span>}
            {catParam && <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}> ({catParam})</span>}
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="btn btn-sm btn-outline"
            style={{ fontSize: '0.75rem' }}
          >
            फिल्टर साफ करा
          </button>
        </div>
      )}

      {/* Search Results */}
      {isLoading || isFetching ? (
        <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
          <Loader2 size={36} color="#dc2626" className="animate-spin" style={{ margin: '0 auto 1rem auto' }} />
          <p style={{ color: '#64748b' }}>बातमी निकाल शोधत आहोत...</p>
        </div>
      ) : articles.length === 0 ? (
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
            कोणतीही बातमी सापडली नाही
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
            कृपया वेगळे शब्द वापरून पुन्हा प्रयत्न करा किंवा इतर बातम्या पाहा.
          </p>
          <button type="button" onClick={handleClear} className="btn btn-outline">
            सर्व बातम्या दाखवा
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="vertical" showExcerpt={true} />
            ))}
          </div>

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
