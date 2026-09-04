import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Shield, LayoutDashboard, FileText, FolderTree, Image, LogOut, Globe, BookOpen } from 'lucide-react';
import { AdminTutorialModal } from '../admin/AdminTutorialModal';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Articles', path: '/admin/articles', icon: FileText },
    { label: 'Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Media Library', path: '/admin/media', icon: Image },
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
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={22} color="#dc2626" />
              <span style={{ fontFamily: 'var(--font-brand)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.5px' }}>
                NIRBHID <span style={{ color: '#dc2626' }}>CMS</span>
              </span>
            </Link>

            <nav style={{ display: 'flex', gap: '0.5rem' }}>
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
                    }}
                  >
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
              <BookOpen size={15} color="#facc15" /> Tutorial & Guide
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
              <Globe size={15} /> Live Site
            </Link>

            {user && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid #334155', paddingLeft: '1rem' }}>
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
                  title="Sign Out"
                >
                  <LogOut size={14} /> Logout
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

