import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Search, Calendar, MapPin, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '../../api/categories';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../utils/translations';

const FALLBACK_CATEGORIES = [
  { id: '1', name: 'Maharashtra', slug: 'maharashtra' },
  { id: '2', name: 'Mumbai', slug: 'mumbai' },
  { id: '3', name: 'Thane', slug: 'thane' },
  { id: '4', name: 'Politics', slug: 'politics' },
  { id: '5', name: 'Crime', slug: 'crime' },
  { id: '6', name: 'Business', slug: 'business' },
  { id: '7', name: 'Sports', slug: 'sports' },
  { id: '8', name: 'Entertainment', slug: 'entertainment' },
  { id: '9', name: 'Technology', slug: 'technology' },
  { id: '10', name: 'World', slug: 'world' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage, t, translateCategory } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const getLocaleDate = () => {
    const localeMap = { mr: 'mr-IN', en: 'en-IN', hi: 'hi-IN' };
    return new Date().toLocaleDateString(localeMap[language] || 'mr-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const { data: dynamicCategories } = useQuery({
    queryKey: ['public-categories'],
    queryFn: categoryApi.getPublicCategories,
    staleTime: 1000 * 60 * 10,
  });

  const categories = dynamicCategories && dynamicCategories.length > 0
    ? dynamicCategories
    : FALLBACK_CATEGORIES;

  const languages: { code: Language; label: string; nativeName: string }[] = [
    { code: 'mr', label: 'मराठी', nativeName: 'मराठी' },
    { code: 'en', label: 'English', nativeName: 'English' },
    { code: 'hi', label: 'हिंदी', nativeName: 'हिंदी' },
  ];

  return (
    <header style={{ position: 'relative', zIndex: 100 }}>
      {/* 1. Top Utility Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={13} color="#fca5a5" /> {getLocaleDate()}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }} className="hide-mobile">
              <MapPin size={13} color="#fca5a5" /> {language === 'en' ? 'Maharashtra, India' : 'महाराष्ट्र, भारत'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Language Switcher Dropdown (Desktop) */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.2rem 0.65rem',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                aria-label="Select website language"
              >
                <Globe size={13} color="#38bdf8" />
                <span>{languages.find((l) => l.code === language)?.label || 'मराठी'}</span>
                <ChevronDown size={12} />
              </button>

              {langMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--color-border)',
                    padding: '0.35rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    minWidth: '120px',
                    zIndex: 150,
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      style={{
                        padding: '0.4rem 0.75rem',
                        fontSize: '0.8125rem',
                        fontWeight: language === lang.code ? 700 : 500,
                        backgroundColor: language === lang.code ? 'var(--color-primary-light)' : 'transparent',
                        color: language === lang.code ? 'var(--color-primary-dark)' : '#1e293b',
                        borderRadius: '4px',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>{lang.nativeName}</span>
                      {language === lang.code && <span style={{ color: 'var(--color-primary)' }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" style={{ color: '#cbd5e1' }} className="hide-mobile">
              {t.aboutUs}
            </Link>
            <Link to="/contact" style={{ color: '#cbd5e1' }} className="hide-mobile">
              {t.contactUs}
            </Link>
            <Link
              to="/admin/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: '#fca5a5',
                fontWeight: 600,
              }}
            >
              <Shield size={13} /> {t.adminLogin}
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Brand Header */}
      <div className="brand-header">
        <div className="container brand-header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                padding: '0.5rem',
                color: 'var(--color-secondary)',
                cursor: 'pointer',
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link to="/" style={{ textDecoration: 'none' }}>
              <div className="brand-logo-text">
                NIRBHID <span>NEWS</span>
              </div>
              <div className="brand-tagline">
                {t.brandTagline}
              </div>
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/search" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
              <Search size={16} /> <span className="hide-mobile">{t.searchNews}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Main Horizontal Navigation Bar (Desktop & Tablet) */}
      <nav className="main-nav">
        <div className="container">
          <ul className="nav-links">
            <li>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                {t.home}
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/category/${cat.slug}`}
                  className={`nav-link ${location.pathname === `/category/${cat.slug}` ? 'active' : ''}`}
                >
                  {translateCategory(cat.slug, cat.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            zIndex: 200,
            display: 'flex',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '85%',
              maxWidth: '320px',
              backgroundColor: '#ffffff',
              height: '100%',
              padding: '1.5rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-lg)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div className="brand-logo-text" style={{ fontSize: '1.5rem' }}>
                NIRBHID <span>NEWS</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Language Switcher */}
            <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                {t.selectLanguage}
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    style={{
                      flex: 1,
                      padding: '0.4rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: language === lang.code ? 'var(--color-primary)' : '#f8fafc',
                      color: language === lang.code ? 'white' : 'var(--color-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <Link
                to="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                <Search size={16} /> {t.searchNews}
              </Link>
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {t.categories}
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              <li>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.6rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 600,
                    color: location.pathname === '/' ? 'var(--color-primary)' : 'var(--color-secondary)',
                    backgroundColor: location.pathname === '/' ? 'var(--color-primary-light)' : 'transparent',
                  }}
                >
                  {t.home}
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 600,
                      color: location.pathname === `/category/${cat.slug}` ? 'var(--color-primary)' : 'var(--color-secondary)',
                      backgroundColor: location.pathname === `/category/${cat.slug}` ? 'var(--color-primary-light)' : 'transparent',
                    }}
                  >
                    {translateCategory(cat.slug, cat.name)}
                  </Link>
                </li>
              ))}
            </ul>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#64748b' }}>{t.aboutUs}</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ color: '#64748b' }}>{t.contactUs}</Link>
                <Link to="/privacy-policy" onClick={() => setMobileMenuOpen(false)} style={{ color: '#64748b' }}>{t.privacyPolicy}</Link>
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: 'var(--color-primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem' }}
                >
                  <Shield size={14} /> {t.editorialPortal}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
