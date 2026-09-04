import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../utils/translations';
import { Shield, LayoutDashboard, FileText, FolderTree, Image, LogOut, Globe, BookOpen, Languages } from 'lucide-react';
import { AdminTutorialModal } from '../admin/AdminTutorialModal';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: t.adminDashboard, path: '/admin', icon: LayoutDashboard },
    { label: t.adminArticles, path: '/admin/articles', icon: FileText },
    { label: t.adminCategories, path: '/admin/categories', icon: FolderTree },
    { label: t.adminMedia, path: '/admin/media', icon: Image },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Top Admin Bar */}
      <header style={{
        backgroundColor: '#0f172a',
        color: 'white',
        borderBottom: '3px solid #dc2626',
        padding: '0.75rem 0',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={22} color="#dc2626" />
              <span style={{ fontFamily: 'var(--font-brand)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                NIRBHID <span style={{ color: '#dc2626' }}>CMS</span>
              </span>
            </Link>

            <nav style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Multilingual CMS Language Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#1e293b', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #334155' }}>
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

            {/* Tutorial & Guide Trigger Button */}
            <button
              type="button"
              onClick={() => setIsTutorialOpen(true)}
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

            {user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid #334155', paddingLeft: '0.75rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#f1f5f9' }}>
                    {user.full_name || user.email}
                  </div>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '0.6875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    padding: '0.1rem 0.4rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#374151',
                    color: '#fca5a5',
                    fontWeight: 700,
                  }}>
                    {user.role}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="btn btn-outline"
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    gap: '0.35rem',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                  }}
                  title={t.adminLogout}
                >
                  <LogOut size={14} /> {t.adminLogout}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

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
