import React from 'react';
import { LayoutDashboard, FileText, FolderTree, Image, CheckCircle, ShieldCheck, Plus, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { articleApi } from '../../api/articles';
import { categoryApi } from '../../api/categories';
import { mediaApi } from '../../api/media';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();

  const { data: articlesData } = useQuery({
    queryKey: ['admin-dashboard-articles'],
    queryFn: () => articleApi.getAdminArticles({ limit: 1 }),
  });

  const { data: publishedData } = useQuery({
    queryKey: ['admin-dashboard-published'],
    queryFn: () => articleApi.getAdminArticles({ status: 'published', limit: 1 }),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['admin-dashboard-categories'],
    queryFn: () => categoryApi.getAdminCategories({ limit: 1 }),
  });

  const { data: mediaData } = useQuery({
    queryKey: ['admin-dashboard-media'],
    queryFn: () => mediaApi.getAdminMedia(1, 1),
  });

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        color: 'white',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        boxShadow: 'var(--shadow-md)',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <ShieldCheck size={18} color="#4ade80" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#4ade80' }}>
              Authenticated Session
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-brand)' }}>
            Welcome, {user?.full_name || user?.email}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.35rem' }}>
            Role: <strong style={{ color: '#f87171', textTransform: 'capitalize' }}>{user?.role}</strong> • Email: {user?.email}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/admin/articles/new" className="btn btn-primary">
            <Plus size={16} /> Write Article
          </Link>
          <Link to="/admin/media" className="btn btn-outline" style={{ backgroundColor: 'transparent', color: '#e2e8f0', borderColor: '#475569' }}>
            <UploadCloud size={16} /> Media Library
          </Link>
          <Link to="/" target="_blank" className="btn btn-outline" style={{ backgroundColor: 'transparent', color: '#e2e8f0', borderColor: '#475569' }}>
            Preview Public Site
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        {[
          { label: 'Total Articles', value: articlesData?.total ?? '...', icon: FileText, color: '#3b82f6' },
          { label: 'Published News', value: publishedData?.total ?? '...', icon: LayoutDashboard, color: '#22c55e' },
          { label: 'Configured Categories', value: categoriesData?.total ?? '13', icon: FolderTree, color: '#eab308' },
          { label: 'Media Assets', value: mediaData?.total ?? '...', icon: Image, color: '#a855f7' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} style={{
              background: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>{item.label}</span>
                <Icon size={18} color={item.color} />
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
                {item.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Navigation Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
            Article CMS
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Create drafts, schedule releases, mark breaking headlines, and manage verified news publications.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontSize: '0.8125rem', fontWeight: 600 }}>
              <CheckCircle size={16} /> Ready & Operational
            </div>
            <Link to="/admin/articles" className="btn btn-sm btn-primary">
              Manage Articles
            </Link>
          </div>
        </div>

        <div style={{
          backgroundColor: '#fff',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
            Media Library (Phase 5 Active)
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Upload, browse, and organize photographs, graphics, and infographics for news stories.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontSize: '0.8125rem', fontWeight: 600 }}>
              <CheckCircle size={16} /> Storage Integrated
            </div>
            <Link to="/admin/media" className="btn btn-sm btn-outline">
              Open Media Library
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
