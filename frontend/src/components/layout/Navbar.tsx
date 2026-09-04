import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Search, Calendar, MapPin } from 'lucide-react';

const CATEGORIES = [
  { name: 'Maharashtra', slug: 'maharashtra' },
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Thane', slug: 'thane' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Crime', slug: 'crime' },
  { name: 'Business', slug: 'business' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Technology', slug: 'technology' },
  { name: 'World', slug: 'world' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header>
      {/* Top Utility Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar size={13} /> {currentDate}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <MapPin size={13} /> Maharashtra, India
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/about" style={{ color: '#94a3b8' }}>About</Link>
            <Link to="/contact" style={{ color: '#94a3b8' }}>Contact</Link>
            <Link to="/admin/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#fca5a5', fontWeight: 600 }}>
              <Shield size={13} /> CMS Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Brand Header */}
      <div className="brand-header">
        <div className="container brand-header-inner">
          <div>
            <Link to="/">
              <div className="brand-logo-text">
                NIRBHID <span>NEWS</span>
              </div>
              <div className="brand-tagline">
                Truth Unfiltered • निष्पक्ष आणि निर्भीड पत्रकारिता
              </div>
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/search" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
              <Search size={16} /> Search News
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky Main Navigation */}
      <nav className="main-nav">
        <div className="container">
          <ul className="nav-links">
            <li>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            {CATEGORIES.map((cat) => (
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
    </header>
  );
};
