import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Activity, Server, Database, ArrowRight, Newspaper } from 'lucide-react';
import { systemApi } from '../../api/client';
import { HealthCheckResponse } from '../../types';

export const HomePage: React.FC = () => {
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        setLoading(true);
        const data = await systemApi.checkHealth();
        setHealth(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Unable to connect to backend server');
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return (
    <div className="container" style={{ paddingBottom: '3rem' }}>
      {/* Breaking News Ticker */}
      <div className="breaking-ticker">
        <div className="breaking-badge">
          <Flame size={15} /> Breaking News
        </div>
        <div className="breaking-text">
          Nirbhid News MVP Core Platform successfully initialized with React 18, Vite, FastAPI & Supabase PostgreSQL backend.
        </div>
      </div>

      {/* System Health / Foundation Status Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem 2rem',
        color: 'white',
        margin: '1.5rem 0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Activity size={18} color="#38bdf8" />
            <span style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', fontWeight: 700 }}>
              Phase 0 & 1 Verification
            </span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-brand)' }}>
            Nirbhid News Engine Active
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.875rem', marginTop: '0.25rem', maxWidth: '600px' }}>
            Foundation architecture configured according to full-stack specification. Full database models for users, categories, articles, and media are ready.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <Server size={20} color="#38bdf8" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>FastAPI Backend</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: loading ? '#facc15' : error ? '#f87171' : '#4ade80' }}>
                {loading ? 'Checking...' : error ? 'Offline' : 'Online (v1.0.0)'}
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <Database size={20} color="#a855f7" />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Database Status</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: health?.database === 'connected' ? '#4ade80' : '#facc15' }}>
                {health?.database || 'Standby'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editorial Layout */}
      <div className="editorial-grid">
        {/* Left Primary Story */}
        <div>
          <article className="news-card-lead">
            <div style={{
              height: '320px',
              backgroundColor: '#0f172a',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
              textAlign: 'center',
              background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)'
            }}>
              <Newspaper size={48} color="#dc2626" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, maxWidth: '600px', margin: 0 }}>
                Digital News Platform Architecture Initialized
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Next Phase: Authentication & Admin Article CMS
              </p>
            </div>

            <div className="news-card-content">
              <span className="badge badge-primary">Maharashtra Lead</span>
              <h1 className="news-title-lead">
                Nirbhid News Platform Sets Standard for Unbiased Digital Journalism in Maharashtra
              </h1>
              <p className="news-excerpt">
                Comprehensive reporting covering Mumbai, Thane, state politics, crime investigations, business markets, and world affairs. Powered by an enterprise-grade REST architecture and private CMS.
              </p>
              <div className="news-meta">
                <span>By Editorial Bureau</span>
                <span>•</span>
                <span>Just Now</span>
                <span>•</span>
                <span>Verified Foundation</span>
              </div>
            </div>
          </article>
        </div>

        {/* Right Sidebar Sections */}
        <div className="sidebar-section">
          <div className="section-heading">Top Categories</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { name: 'Maharashtra', count: '13 Articles', slug: 'maharashtra' },
              { name: 'Mumbai Metro', count: '24 Articles', slug: 'mumbai' },
              { name: 'Politics & Governance', count: '18 Articles', slug: 'politics' },
              { name: 'Crime & Investigation', count: '9 Articles', slug: 'crime' },
              { name: 'World News', count: '15 Articles', slug: 'world' },
            ].map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="sidebar-news-item"
                style={{ justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <div className="sidebar-news-title">{cat.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {cat.count}
                  </div>
                </div>
                <ArrowRight size={16} color="#94a3b8" />
              </Link>
            ))}
          </div>

          <div style={{
            marginTop: '1rem',
            padding: '1.25rem',
            backgroundColor: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
              Admin Control Center
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              Access article publishing, category management, media uploads, and editorial review.
            </p>
            <Link to="/admin/login" className="btn btn-secondary" style={{ width: '100%' }}>
              Launch Admin CMS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
