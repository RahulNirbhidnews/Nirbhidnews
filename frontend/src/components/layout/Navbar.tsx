import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Search, Calendar, MapPin, Menu, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '../../api/categories';

const FALLBACK_CATEGORIES = [
  { id: '1', name: 'महाराष्ट्र', slug: 'maharashtra' },
  { id: '2', name: 'मुंबई', slug: 'mumbai' },
  { id: '3', name: 'ठाणे', slug: 'thane' },
  { id: '4', name: 'राजकारण', slug: 'politics' },
  { id: '5', name: 'गुन्हेगारी', slug: 'crime' },
  { id: '6', name: 'व्यापार', slug: 'business' },
  { id: '7', name: 'क्रीडा', slug: 'sports' },
  { id: '8', name: 'मनोरंजन', slug: 'entertainment' },
  { id: '9', name: 'तंत्रज्ञान', slug: 'technology' },
  { id: '10', name: 'देश-विदेश', slug: 'world' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentDate = new Date().toLocaleDateString('mr-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const { data: dynamicCategories } = useQuery({
    queryKey: ['public-categories'],
    queryFn: categoryApi.getPublicCategories,
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  const categories = dynamicCategories && dynamicCategories.length > 0
    ? dynamicCategories
    : FALLBACK_CATEGORIES;

  return (
    <header style={{ position: 'relative', zIndex: 100 }}>
      {/* 1. Top Utility Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={13} color="#fca5a5" /> {currentDate}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }} className="hide-mobile">
              <MapPin size={13} color="#fca5a5" /> महाराष्ट्र, भारत
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Link to="/about" style={{ color: '#cbd5e1' }} className="hide-mobile">About</Link>
            <Link to="/contact" style={{ color: '#cbd5e1' }} className="hide-mobile">Contact</Link>
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
              <Shield size={13} /> CMS Portal
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
                Truth Unfiltered • निष्पक्ष आणि निर्भीड पत्रकारिता
              </div>
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/search" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
              <Search size={16} /> <span className="hide-mobile">बातम्या शोधा</span>
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
                मुख्य पृष्ठ
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/category/${cat.slug}`}
                  className={`nav-link ${location.pathname === `/category/${cat.slug}` ? 'active' : ''}`}
                >
                  {cat.name}
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
              width: '80%',
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

            <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <Link
                to="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                <Search size={16} /> बातम्या शोधा
              </Link>
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              बातम्या विभाग
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
                  मुख्य पृष्ठ
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
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#64748b' }}>About Us</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ color: '#64748b' }}>Contact</Link>
                <Link to="/privacy-policy" onClick={() => setMobileMenuOpen(false)} style={{ color: '#64748b' }}>Privacy Policy</Link>
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: 'var(--color-primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.5rem' }}
                >
                  <Shield size={14} /> Admin CMS Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
