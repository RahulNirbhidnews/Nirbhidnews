import React from 'react';
import {
  FileText,
  FolderTree,
  Image as ImageIcon,
  ShieldCheck,
  Plus,
  UploadCloud,
  CheckCircle,
  Clock,
  Flame,
  Star,
  Edit,
  ExternalLink,
  Loader2,
  HardDrive
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { statsApi } from '../../api/stats';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: statsApi.getAdminStats,
    refetchInterval: 1000 * 60, // Refresh every minute
  });

  const formatStorageSize = (bytes: number) => {
    if (bytes === 0) return '0 KB';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem 4rem 1.25rem' }}>
      {/* 1. Welcome Header Banner */}
      <div
        style={{
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
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <ShieldCheck size={18} color="#4ade80" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#4ade80' }}>
              Nirbhid News CMS Admin Portal
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
            <Plus size={16} /> नवीन बातमी लिहा
          </Link>
          <Link
            to="/admin/media"
            className="btn btn-outline"
            style={{ backgroundColor: 'transparent', color: '#e2e8f0', borderColor: '#475569' }}
          >
            <UploadCloud size={16} /> फोटो लायब्ररी
          </Link>
          <Link
            to="/"
            target="_blank"
            className="btn btn-outline"
            style={{ backgroundColor: 'transparent', color: '#e2e8f0', borderColor: '#475569' }}
          >
            वेबसाइट पाहा <ExternalLink size={14} />
          </Link>
        </div>
      </div>

      {/* 2. Real-time Metrics Grid */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <Loader2 size={32} color="#dc2626" className="animate-spin" style={{ margin: '0 auto 1rem auto' }} />
          <p style={{ color: '#64748b' }}>डॅशबोर्ड आकडेवारी लोड होत आहे...</p>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2.5rem',
            }}
          >
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>एकूण बातम्या</span>
                <FileText size={18} color="#3b82f6" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
                {stats?.total_articles ?? 0}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                सर्व प्रकाशित व मसुदा बातम्या
              </div>
            </div>

            <div
              style={{
                background: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>प्रकाशित (Live)</span>
                <CheckCircle size={18} color="#16a34a" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16a34a' }}>
                {stats?.published_articles ?? 0}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                वाचकांसाठी थेट उपलब्ध
              </div>
            </div>

            <div
              style={{
                background: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>मसुदा (Drafts)</span>
                <Clock size={18} color="#f59e0b" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b' }}>
                {stats?.draft_articles ?? 0}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                संपादकीय पुनरावलोकन बाकी
              </div>
            </div>

            <div
              style={{
                background: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>बातम्या विभाग</span>
                <FolderTree size={18} color="#8b5cf6" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
                {stats?.active_categories ?? 0}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                सक्रिय श्रेण्या
              </div>
            </div>

            <div
              style={{
                background: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>मीडिया / फोटो</span>
                <ImageIcon size={18} color="#ec4899" />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
                {stats?.total_media ?? 0}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <HardDrive size={11} /> {formatStorageSize(stats?.total_media_size_bytes ?? 0)}
              </div>
            </div>
          </div>

          {/* 3. Recent Articles Activity Table */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '2.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--color-border)',
                backgroundColor: '#f8fafc',
              }}
            >
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-secondary)', margin: 0 }}>
                अलीकडील बातम्या • Recent Editorial Activity
              </h2>
              <Link to="/admin/articles" className="btn btn-sm btn-outline">
                सर्व बातम्या व्यवस्थापित करा →
              </Link>
            </div>

            {stats?.recent_articles && stats.recent_articles.length > 0 ? (
              <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>बातमी शीर्षक (Headline)</th>
                      <th>विभाग</th>
                      <th>स्थिती</th>
                      <th>वैशिष्ट्ये</th>
                      <th>तारीख</th>
                      <th style={{ textAlign: 'right' }}>कृती</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recent_articles.map((art) => (
                      <tr key={art.id}>
                        <td style={{ fontWeight: 600, maxWidth: '350px' }}>
                          <Link to={`/admin/articles/${art.id}/edit`} style={{ color: 'var(--color-secondary)' }}>
                            {art.title}
                          </Link>
                        </td>
                        <td>
                          <span className="badge badge-outline">
                            {art.category?.name || 'General'}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              art.status === 'published'
                                ? 'badge-success'
                                : art.status === 'draft'
                                ? 'badge-primary'
                                : 'badge-inactive'
                            }`}
                          >
                            {art.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.25rem' }}>
                            {art.is_breaking && (
                              <span title="Breaking News" style={{ color: '#dc2626' }}>
                                <Flame size={15} />
                              </span>
                            )}
                            {art.is_featured && (
                              <span title="Featured Story" style={{ color: '#d97706' }}>
                                <Star size={15} />
                              </span>
                            )}
                            {!art.is_breaking && !art.is_featured && (
                              <span style={{ color: '#cbd5e1' }}>-</span>
                            )}
                          </div>
                        </td>
                        <td style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                          {new Date(art.created_at).toLocaleDateString('mr-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <Link
                            to={`/admin/articles/${art.id}/edit`}
                            className="btn btn-sm btn-outline"
                            style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                          >
                            <Edit size={12} /> Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '2.5rem', textAlign: 'center', color: '#94a3b8' }}>
                अद्याप कोणतीही बातमी तयार केलेली नाही. 'नवीन बातमी लिहा' बटण दाबून सुरुवात करा.
              </div>
            )}
          </div>

          {/* 4. Quick Actions Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div
              style={{
                backgroundColor: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
                  बातम्या व्यवस्थापन (Article CMS)
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  मसुदे तयार करा, मुख्य बातम्या प्रसिद्ध करा, फोटो जोडा आणि बातमीदार बायलाईन व्यवस्थापित करा.
                </p>
              </div>
              <Link to="/admin/articles" className="btn btn-primary" style={{ width: 'fit-content' }}>
                बातम्यांची यादी पाहा
              </Link>
            </div>

            <div
              style={{
                backgroundColor: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
                  बातम्या विभाग व्यवस्थापन (Categories)
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  नवीन विभाग (उदा. मुंबई, ठाणे, राजकारण, व्यापार) तयार करा, संपादित करा आणि चालू/बंद करा.
                </p>
              </div>
              <Link to="/admin/categories" className="btn btn-outline" style={{ width: 'fit-content' }}>
                विभाग व्यवस्थापित करा
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
