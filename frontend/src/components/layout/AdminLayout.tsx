import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../utils/translations';
import {
  Shield,
  LayoutDashboard,
  FileText,
  FolderTree,
  Image,
  LogOut,
  Globe,
  BookOpen,
  Languages,
  Menu,
  X,
  Megaphone,
  Radio,
  Tv,
} from 'lucide-react';
import { AdminTutorialModal } from '../admin/AdminTutorialModal';
import { RollingTopProgressBar } from '../common/RollingTopProgressBar';
import { ScrollToTop } from '../common/ScrollToTop';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: t.adminDashboard, path: '/admin', icon: LayoutDashboard },
    { label: t.adminArticles, path: '/admin/articles', icon: FileText },
    { label: t.adminCategories, path: '/admin/categories', icon: FolderTree },
    { label: 'Live TV Stream', path: '/admin/broadcast', icon: Tv },
    { label: 'Live RSS Feeds', path: '/admin/feeds', icon: Radio },
    { label: t.adminMedia, path: '/admin/media', icon: Image },
    { label: 'Ads Manager', path: '/admin/ads', icon: Megaphone },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <ScrollToTop />
      <RollingTopProgressBar />
      {/* Top Admin Bar */}
      <header style={{
        backgroundColor: '#0f172a',
        color: 'white',
        borderBottom: '3px solid #dc2626',
        padding: '0.75rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo & Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={22} color="#dc2626" />
              <span style={{ fontFamily: 'var(--font-brand)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                NIRBHID <span style={{ color: '#dc2626' }}>CMS</span>
              </span>
            </Link>

            <nav style={{ display: 'flex', gap: '0.35rem' }} className="hide-mobile">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.4rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      backgroundColor: isActive ? '#1e293b' : 'transparent',
                      color: isActive ? '#f87171' : '#cbd5e1',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Right Controls & Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Multilingual CMS Language Selector (Desktop) */}
            <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#1e293b', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #334155' }}>
              <Languages size={14} color="#38bdf8" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#f1f5f9',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  outline: 'none',
                }}
                aria-label="CMS Language"
              >
                <option value="mr" style={{ color: '#000' }}>मराठी</option>
                <option value="en" style={{ color: '#000' }}>English</option>
                <option value="hi" style={{ color: '#000' }}>हिंदी</option>
              </select>
            </div>

            {/* Tutorial & Guide Trigger Button (Desktop) */}
            <button
              type="button"
              onClick={() => setIsTutorialOpen(true)}
              className="hide-mobile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'rgba(234, 179, 8, 0.15)',
                border: '1px solid rgba(234, 179, 8, 0.4)',
                color: '#fde047',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title="Open CMS Tutorial & Editorial Guide"
            >
              <BookOpen size={15} color="#facc15" /> {t.adminTutorial}
            </button>

            <Link
              to="/"
              target="_blank"
              className="hide-mobile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.8125rem',
                color: '#94a3b8',
              }}
            >
              <Globe size={15} /> {t.adminLiveSite}
            </Link>

            <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', borderLeft: '1px solid #334155', paddingLeft: '0.75rem' }}>
              <img
                src="/assets/editor-rahul-jogdand.png"
                alt="Rahul Jogdand"
                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid #eab308', objectFit: 'cover' }}
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.1 }}>
                  {t.editorName}
                </div>
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  padding: '0.05rem 0.3rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontWeight: 800,
                }}>
                  {t.editorTitle}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-outline"
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.75rem',
                  gap: '0.35rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                }}
                title={t.adminLogout}
              >
                <LogOut size={14} />
              </button>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '0.3rem',
              }}
              className="mobile-menu-btn"
              aria-label="Toggle Admin Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer for Admin */}
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
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '80%',
              maxWidth: '300px',
              height: '100%',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              padding: '1.5rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-lg)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={20} color="#dc2626" />
                <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                  NIRBHID <span style={{ color: '#dc2626' }}>CMS</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile Language Selector */}
            <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid #1e293b' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                {t.selectLanguage}
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {(['mr', 'en', 'hi'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setLanguage(lang);
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      flex: 1,
                      padding: '0.4rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid #334155',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: language === lang ? 'var(--color-primary)' : '#1e293b',
                      color: '#ffffff',
                      cursor: 'pointer',
                    }}
                  >
                    {lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'English'}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin Nav Items */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: isActive ? '#ffffff' : '#cbd5e1',
                        backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                      }}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Bottom Actions */}
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTutorialOpen(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(234, 179, 8, 0.15)',
                  border: '1px solid rgba(234, 179, 8, 0.4)',
                  color: '#fde047',
                  padding: '0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <BookOpen size={16} /> {t.adminTutorial}
              </button>

              <Link
                to="/"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#94a3b8',
                  fontSize: '0.85rem',
                  padding: '0.5rem',
                }}
              >
                <Globe size={16} /> {t.adminLiveSite}
              </Link>

              {user && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-outline"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: '#f87171',
                    borderColor: '#f87171',
                    width: '100%',
                    padding: '0.6rem',
                  }}
                >
                  <LogOut size={16} /> {t.adminLogout}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Admin Content Body */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Editorial Onboarding Tutorial Modal */}
      <AdminTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
};
