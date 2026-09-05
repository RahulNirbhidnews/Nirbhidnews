import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Search, Calendar, MapPin, Menu, X, Globe, ChevronDown, MoreHorizontal, FolderTree } from 'lucide-react';
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
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLLIElement>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLangMenuOpen(false);
    setMoreMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close three-dots dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Show top 7 categories in horizontal bar
  const visibleCategories = categories.slice(0, 7);

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
            {/* Chief Editor Leadership Strip (Desktop) */}
            <div
              className="hide-mobile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <img
                src="/assets/editor-rahul-jogdand.png"
                alt={`${t.editorName} - ${t.editorTitle}`}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '2px solid #eab308',
                  objectFit: 'cover',
                  boxShadow: '0 0 8px rgba(234, 179, 8, 0.4)',
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--color-secondary)', lineHeight: 1.1 }}>
                  {t.editorName}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: 800, marginTop: '2px' }}>
                  {t.editorTitle} • 📞 {t.editorPhone}
                </div>
              </div>
            </div>

            <Link to="/search" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
              <Search size={16} /> <span className="hide-mobile">{t.searchNews}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Main Horizontal Navigation Bar (Desktop & Tablet) */}
      <nav className="main-nav">
        <div className="container" style={{ position: 'relative' }}>
          <ul className="nav-links" style={{ alignItems: 'center' }}>
            <li>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                {t.home}
              </Link>
            </li>
            {visibleCategories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/category/${cat.slug}`}
                  className={`nav-link ${location.pathname === `/category/${cat.slug}` ? 'active' : ''}`}
                >
                  {translateCategory(cat.slug, cat.name)}
                </Link>
              </li>
            ))}

            {/* Three Dots (••• More Categories) Button with Dropdown */}
            <li style={{ position: 'relative' }} ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: moreMenuOpen ? 'var(--color-primary-light)' : 'transparent',
                  color: moreMenuOpen ? 'var(--color-primary-dark)' : 'var(--color-secondary)',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                aria-label="More categories menu"
                title="View all news categories"
              >
                <MoreHorizontal size={18} />
                <span>{language === 'mr' ? 'अधिक' : language === 'hi' ? 'अन्य' : 'More'}</span>
                <ChevronDown size={14} style={{ transform: moreMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>

              {/* Three Dots Categories Dropdown Menu */}
              {moreMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: 0,
                    width: '320px',
                    backgroundColor: '#ffffff',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    border: '1.5px solid #e2e8f0',
                    padding: '1rem',
                    zIndex: 200,
                    animation: 'fadeIn 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <FolderTree size={14} /> {t.categories}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{categories.length} विभाग</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                    {categories.map((cat) => {
                      const isActive = location.pathname === `/category/${cat.slug}`;
                      return (
                        <Link
                          key={cat.slug}
                          to={`/category/${cat.slug}`}
                          onClick={() => setMoreMenuOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.5rem 0.65rem',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.8125rem',
                            fontWeight: isActive ? 800 : 600,
                            color: isActive ? '#dc2626' : '#1e293b',
                            backgroundColor: isActive ? '#fee2e2' : '#f8fafc',
                            border: `1px solid ${isActive ? '#fca5a5' : '#e2e8f0'}`,
                            textDecoration: 'none',
                            transition: 'all 0.15s ease',
                          }}
                          className="category-dropdown-item"
                        >
                          <span style={{ color: '#dc2626', fontSize: '0.75rem' }}>•</span>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {translateCategory(cat.slug, cat.name)}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </li>
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
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 200,
            display: 'flex',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '84%',
              maxWidth: '340px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              height: '100%',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-lg)',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div className="brand-logo-text" style={{ fontSize: '1.35rem', color: '#ffffff' }}>
                NIRBHID <span style={{ color: '#dc2626' }}>NEWS</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Chief Editor Spotlight Card */}
            <div
              style={{
                backgroundColor: '#1e293b',
                border: '1.5px solid rgba(234, 179, 8, 0.4)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <img
                src="/assets/editor-rahul-jogdand.png"
                alt="Rahul Jogdand"
                style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid #eab308', objectFit: 'cover' }}
              />
              <div>
                <span style={{ fontSize: '0.65rem', color: '#facc15', fontWeight: 800, textTransform: 'uppercase' }}>
                  {t.editorTitle}
                </span>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f8fafc' }}>
                  {t.editorName}
                </div>
                <a href="tel:9922299027" style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 700, textDecoration: 'none' }}>
                  📞 {t.editorPhone}
                </a>
              </div>
            </div>

            {/* Mobile Language Switcher */}
            <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid #334155' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
                {t.selectLanguage}
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      flex: 1,
                      padding: '0.45rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid',
                      borderColor: language === lang.code ? '#dc2626' : '#334155',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      backgroundColor: language === lang.code ? '#dc2626' : '#1e293b',
                      color: '#ffffff',
                      cursor: 'pointer',
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Quick Action */}
            <div style={{ marginBottom: '1.25rem' }}>
              <Link
                to="/search"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #334155',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <Search size={16} color="#f87171" />
                <span>{t.searchNews}</span>
              </Link>
            </div>

            {/* Categories Heading */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.5px' }}>
              <FolderTree size={14} /> {t.categories}
            </div>

            {/* Category Links List with High Contrast White & Red Text */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, padding: 0, margin: 0 }}>
              <li>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: location.pathname === '/' ? '#ffffff' : '#f1f5f9',
                    backgroundColor: location.pathname === '/' ? '#dc2626' : '#1e293b',
                    border: '1px solid',
                    borderColor: location.pathname === '/' ? '#dc2626' : '#334155',
                    textDecoration: 'none',
                  }}
                >
                  <span>{t.home}</span>
                  {location.pathname === '/' && <span>●</span>}
                </Link>
              </li>
              {categories.map((cat) => {
                const isActive = location.pathname === `/category/${cat.slug}`;
                return (
                  <li key={cat.slug}>
                    <Link
                      to={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: isActive ? '#ffffff' : '#f8fafc',
                        backgroundColor: isActive ? '#dc2626' : '#1e293b',
                        border: '1px solid',
                        borderColor: isActive ? '#dc2626' : '#334155',
                        textDecoration: 'none',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <span>{translateCategory(cat.slug, cat.name)}</span>
                      {isActive && <span>●</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Bottom Footer Links in Drawer */}
            <div style={{ borderTop: '1px solid #334155', paddingTop: '1.25rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.aboutUs}</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.contactUs}</Link>
                <Link to="/privacy-policy" onClick={() => setMobileMenuOpen(false)} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.privacyPolicy}</Link>
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: '#f87171',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    textDecoration: 'none',
                  }}
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
