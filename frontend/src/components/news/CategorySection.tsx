import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Article, Category } from '../../types';
import { ArticleCard } from './ArticleCard';
import { useLanguage } from '../../context/LanguageContext';

interface CategorySectionProps {
  category: Category;
  articles: Article[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, articles }) => {
  const { t, translateCategory } = useLanguage();

  if (!articles || articles.length === 0) {
    return null;
  }

  const [leadArticle, ...otherArticles] = articles;
  const translatedName = translateCategory(category.slug, category.name);

  return (
    <section className="category-news-section" style={{ margin: '3rem 0' }}>
      {/* Category Section Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderBottom: '2px solid var(--color-primary)',
          paddingBottom: '0.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              width: '4px',
              height: '24px',
              borderRadius: '2px',
            }}
          />
          <h2
            style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: 'var(--color-secondary)',
              margin: 0,
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.2px',
            }}
          >
            {translatedName}
            {category.slug && (
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  marginLeft: '0.5rem',
                  textTransform: 'uppercase',
                }}
              >
                • {category.slug}
              </span>
            )}
          </h2>
        </div>

        <Link
          to={`/category/${category.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
          className="hover-underline"
        >
          {t.viewAll} <ChevronRight size={14} />
        </Link>
      </div>

      {/* Content Layout for Category: Lead + Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: otherArticles.length > 0 ? '1fr 1fr' : '1fr',
          gap: '1.5rem',
        }}
        className="category-section-grid"
      >
        {/* Left Column: Larger Lead Card */}
        {leadArticle && <ArticleCard article={leadArticle} variant="vertical" showExcerpt={true} />}

        {/* Right Column: Stack of up to 3 articles */}
        {otherArticles.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {otherArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" showExcerpt={false} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
