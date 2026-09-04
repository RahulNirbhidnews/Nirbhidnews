import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  Archive,
  Globe,
  Flame,
  Star,
  AlertTriangle,
  Loader2,
  Filter,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';
import { articleApi, ArticleListParams } from '../../api/articles';
import { categoryApi } from '../../api/categories';
import { Article } from '../../types';

export const AdminArticlesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState(1);
  const [deletingArticle, setDeletingArticle] = useState<Article | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Fetch Categories for Filter Dropdown
  const { data: categories } = useQuery({
    queryKey: ['public-categories'],
    queryFn: categoryApi.getPublicCategories,
  });

  // Fetch Articles Query
  const queryParams: ArticleListParams = {
    page,
    limit: 15,
    search: searchTerm || undefined,
    status: statusFilter === 'all' ? undefined : statusFilter,
    category_id: selectedCategory || undefined,
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-articles', page, searchTerm, statusFilter, selectedCategory],
    queryFn: () => articleApi.getAdminArticles(queryParams),
  });

  // Publish Mutation
  const publishMutation = useMutation({
    mutationFn: (id: string) => articleApi.publishArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      setToastMessage({ text: 'Article published live!', type: 'success' });
    },
    onError: (err: any) => {
      setToastMessage({ text: err.response?.data?.detail || 'Failed to publish article', type: 'error' });
    },
  });

  // Archive Mutation
  const archiveMutation = useMutation({
    mutationFn: (id: string) => articleApi.archiveArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      setToastMessage({ text: 'Article archived from public feeds', type: 'success' });
    },
    onError: (err: any) => {
      setToastMessage({ text: err.response?.data?.detail || 'Failed to archive article', type: 'error' });
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => articleApi.deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      setDeletingArticle(null);
      setToastMessage({ text: 'Article deleted permanently', type: 'success' });
    },
    onError: (err: any) => {
      setToastMessage({ text: err.response?.data?.detail || 'Failed to delete article', type: 'error' });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <CheckCircle size={11} /> Published
          </span>
        );
      case 'draft':
        return (
          <span className="badge badge-inactive" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <FileText size={11} /> Draft
          </span>
        );
      case 'archived':
        return (
          <span className="badge" style={{ backgroundColor: '#fed7aa', color: '#9a3412', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <Archive size={11} /> Archived
          </span>
        );
      default:
        return <span className="badge badge-outline">{status}</span>;
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1.25rem' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 150,
          backgroundColor: toastMessage.type === 'success' ? '#0f172a' : '#991b1b',
          color: '#fff',
          padding: '0.875rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}>
          {toastMessage.type === 'success' ? <CheckCircle size={18} color="#4ade80" /> : <AlertTriangle size={18} color="#fca5a5" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.75rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={24} color="#dc2626" />
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
              News Articles CMS
            </h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Create, review, publish, and manage editorial news articles
          </p>
        </div>

        <Link to="/admin/articles/new" className="btn btn-primary">
          <Plus size={16} /> New Article
        </Link>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div style={{
        background: '#fff',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        {/* Status Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
          {(['all', 'published', 'draft', 'archived'] as const).map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setPage(1);
              }}
              className={`btn btn-sm ${statusFilter === st ? 'btn-secondary' : 'btn-outline'}`}
              style={{ textTransform: 'capitalize' }}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search & Category Filter Row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '420px' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search headline, excerpt, or reporter..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              style={{
                width: '100%',
                padding: '0.55rem 0.875rem 0.55rem 2.4rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Filter size={14} color="#64748b" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              style={{
                padding: '0.55rem 0.875rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                outline: 'none',
                backgroundColor: '#fff',
                color: 'var(--color-secondary)',
              }}
            >
              <option value="">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading & Error States */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <Loader2 size={36} color="#dc2626" className="animate-spin" style={{ margin: '0 auto 1rem auto' }} />
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Loading news articles...</p>
        </div>
      )}

      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fecdd3',
          padding: '1.5rem',
          borderRadius: 'var(--radius-md)',
          color: '#991b1b',
          textAlign: 'center',
        }}>
          <AlertTriangle size={24} style={{ margin: '0 auto 0.5rem auto' }} />
          <p>Failed to load articles. Please check database connectivity.</p>
        </div>
      )}

      {/* Desktop Table View */}
      {!isLoading && !error && data && data.items.length > 0 && (
        <div className="table-container desktop-table-view">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '45%' }}>Headline & Category</th>
                <th>Status</th>
                <th>Author</th>
                <th>Published Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((art) => (
                <tr key={art.id}>
                  <td>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      {art.featured_image_url ? (
                        <img
                          src={art.featured_image_url}
                          alt={art.title}
                          style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#e2e8f0', flexShrink: 0 }}
                        />
                      ) : (
                        <div style={{ width: '64px', height: '48px', backgroundColor: '#e2e8f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <ImageIcon size={20} color="#94a3b8" />
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--color-secondary)', fontSize: '0.9375rem', lineHeight: 1.3 }}>
                          {art.title}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                          <span className="badge badge-primary" style={{ fontSize: '0.6875rem' }}>
                            {art.category?.name || 'Uncategorized'}
                          </span>
                          {art.is_breaking && (
                            <span style={{ fontSize: '0.6875rem', color: '#dc2626', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                              <Flame size={12} /> Breaking
                            </span>
                          )}
                          {art.is_featured && (
                            <span style={{ fontSize: '0.6875rem', color: '#d97706', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                              <Star size={12} /> Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{getStatusBadge(art.status)}</td>
                  <td style={{ fontSize: '0.8125rem', color: '#475569' }}>
                    {art.author_name || 'Editorial Staff'}
                  </td>
                  <td style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                    {art.published_at ? new Date(art.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      {art.status === 'draft' && (
                        <button
                          onClick={() => publishMutation.mutate(art.id)}
                          className="btn btn-sm"
                          style={{ backgroundColor: '#16a34a', color: 'white' }}
                          title="Publish Live"
                        >
                          <Globe size={13} /> Publish
                        </button>
                      )}
                      {art.status === 'published' && (
                        <button
                          onClick={() => archiveMutation.mutate(art.id)}
                          className="btn btn-sm btn-outline"
                          title="Archive"
                        >
                          <Archive size={13} /> Archive
                        </button>
                      )}
                      <Link to={`/admin/articles/${art.id}/edit`} className="btn btn-sm btn-outline" title="Edit Article">
                        <Edit2 size={13} /> Edit
                      </Link>
                      <button
                        onClick={() => setDeletingArticle(art)}
                        className="btn btn-sm btn-danger-outline"
                        title="Delete Article"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card Layout (< 768px) */}
      {!isLoading && !error && data && data.items.length > 0 && (
        <div className="mobile-card-view">
          {data.items.map((art) => (
            <div key={art.id} className="mobile-item-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-primary">{art.category?.name}</span>
                {getStatusBadge(art.status)}
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                {art.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem' }}>
                <span>By {art.author_name || 'Staff'}</span>
                {art.published_at && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Calendar size={12} /> {new Date(art.published_at).toLocaleDateString()}
                  </span>
                )}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '0.75rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {art.is_breaking && <span style={{ color: '#dc2626', fontSize: '0.75rem', fontWeight: 700 }}>🔥 Breaking</span>}
                  {art.is_featured && <span style={{ color: '#d97706', fontSize: '0.75rem', fontWeight: 700 }}>⭐ Featured</span>}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {art.status === 'draft' && (
                    <button onClick={() => publishMutation.mutate(art.id)} className="btn btn-sm btn-primary">
                      Publish
                    </button>
                  )}
                  <Link to={`/admin/articles/${art.id}/edit`} className="btn btn-sm btn-outline">
                    Edit
                  </Link>
                  <button onClick={() => setDeletingArticle(art)} className="btn btn-sm btn-danger-outline">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && data && data.items.length === 0 && (
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '3.5rem 1.5rem',
          textAlign: 'center',
        }}>
          <FileText size={44} color="#94a3b8" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.35rem' }}>
            No articles found
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            {searchTerm ? `No articles matching "${searchTerm}"` : 'Get started by creating your first news publication.'}
          </p>
          <Link to="/admin/articles/new" className="btn btn-primary">
            <Plus size={16} /> Write First Article
          </Link>
        </div>
      )}

      {/* Pagination Controls */}
      {!isLoading && data && data.total_pages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
            Showing page {data.page} of {data.total_pages} ({data.total} total articles)
          </span>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn btn-sm btn-outline"
              style={{ opacity: page === 1 ? 0.5 : 1 }}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(data.total_pages, p + 1))}
              disabled={page === data.total_pages}
              className="btn btn-sm btn-outline"
              style={{ opacity: page === data.total_pages ? 0.5 : 1 }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingArticle && (
        <div className="modal-overlay" onClick={() => setDeletingArticle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={20} /> Delete Article
              </h2>
            </div>
            <div className="modal-body">
              <p style={{ color: '#334155', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                Are you sure you want to permanently delete <strong>"{deletingArticle.title}"</strong>?
              </p>
              <p style={{ color: '#64748b', fontSize: '0.8125rem', marginTop: '0.5rem' }}>
                This action is permanent and cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => setDeletingArticle(null)} className="btn btn-outline">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => deleteMutation.mutate(deletingArticle.id)}
                disabled={deleteMutation.isPending}
                className="btn btn-primary"
                style={{ backgroundColor: '#dc2626' }}
              >
                {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
