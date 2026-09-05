import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FolderTree,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  X,
  FileText,
  Filter
} from 'lucide-react';
import { categoryApi, CategoryAdminItem, CategoryInput } from '../../api/categories';
import { useLanguage } from '../../context/LanguageContext';

export const AdminCategoriesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { t, language, translateCategory } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [page, setPage] = useState(1);

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryAdminItem | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<CategoryAdminItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<CategoryInput>({
    name: '',
    slug: '',
    description: '',
    is_active: true,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Fetch Categories Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-categories', page, searchTerm, statusFilter],
    queryFn: () =>
      categoryApi.getAdminCategories({
        page,
        limit: 20,
        search: searchTerm || undefined,
        is_active: statusFilter === 'all' ? undefined : statusFilter === 'active',
      }),
  });

  // Helper slug generator for UI preview
  const handleNameChange = (nameVal: string) => {
    const slugVal = nameVal
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setFormData((prev) => ({
      ...prev,
      name: nameVal,
      slug: prev.slug === '' || prev.slug === formData.slug ? slugVal : prev.slug,
    }));
  };

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: (newCat: CategoryInput) => categoryApi.createCategory(newCat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      setIsCreateOpen(false);
      setFormData({ name: '', slug: '', description: '', is_active: true });
      setToastMessage({ text: 'Category created successfully!', type: 'success' });
    },
    onError: (err: any) => {
      setFormError(err.response?.data?.detail || 'Failed to create category');
    },
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CategoryInput> }) =>
      categoryApi.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      setEditingCategory(null);
      setToastMessage({ text: 'Category updated successfully!', type: 'success' });
    },
    onError: (err: any) => {
      setFormError(err.response?.data?.detail || 'Failed to update category');
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      setDeletingCategory(null);
      setToastMessage({ text: 'Category deleted successfully!', type: 'success' });
    },
    onError: (err: any) => {
      const detail = err.response?.data?.detail || 'Failed to delete category';
      setToastMessage({ text: detail, type: 'error' });
      setDeletingCategory(null);
    },
  });

  const handleOpenCreate = () => {
    setFormData({ name: '', slug: '', description: '', is_active: true });
    setFormError(null);
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (cat: CategoryAdminItem) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      is_active: cat.is_active,
    });
    setFormError(null);
  };

  const handleToggleStatus = (cat: CategoryAdminItem) => {
    updateMutation.mutate({
      id: cat.id,
      data: { is_active: !cat.is_active },
    });
  };

  const handleSaveCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    createMutation.mutate(formData);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setFormError(null);
    updateMutation.mutate({
      id: editingCategory.id,
      data: formData,
    });
  };

  return (
    <div className="container" style={{ padding: '2rem 1.25rem' }}>
      {/* Toast Alert */}
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

      {/* Page Title & Action Bar */}
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
            <FolderTree size={24} color="#dc2626" />
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
              {t.adminCategories}
            </h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {language === 'mr'
              ? 'बातम्यांचे विभाग (Categories) तयार करा, संपादित करा आणि चालू/बंद करा.'
              : language === 'hi'
              ? 'समाचार श्रेणियां बनाएं, संपादित करें और सक्रिय/निष्क्रिय करें।'
              : 'Create, organize, and manage editorial news sections'}
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary">
          <Plus size={16} /> {t.createCategory}
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div style={{
        background: '#fff',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        marginBottom: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '180px', maxWidth: '420px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search category name or slug..."
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
          <span style={{ fontSize: '0.8125rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Filter size={14} /> Filter:
          </span>
          {(['all', 'active', 'inactive'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setStatusFilter(filter);
                setPage(1);
              }}
              className={`btn btn-sm ${statusFilter === filter ? 'btn-secondary' : 'btn-outline'}`}
              style={{ textTransform: 'capitalize' }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Loading & Error States */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <Loader2 size={36} color="#dc2626" className="animate-spin" style={{ margin: '0 auto 1rem auto' }} />
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Loading categories...</p>
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
          <p>Failed to load categories. Please check database connectivity.</p>
        </div>
      )}

      {/* Desktop Table View */}
      {!isLoading && !error && data && data.items.length > 0 && (
        <div className="table-container desktop-table-view">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t.adminCategoryLabel}</th>
                <th>{t.adminSlugLabel}</th>
                <th>Description</th>
                <th>{t.totalArticles}</th>
                <th>{t.status}</th>
                <th style={{ textAlign: 'right' }}>{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((cat) => (
                <tr key={cat.id}>
                  <td style={{ fontWeight: 600 }}>
                    {translateCategory(cat.slug, cat.name)}
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>({cat.name})</span>
                  </td>
                  <td>
                    <code style={{ fontSize: '0.8125rem', background: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                      {cat.slug}
                    </code>
                  </td>
                  <td style={{ color: '#64748b', maxWidth: '300px' }}>
                    {cat.description || '—'}
                  </td>
                  <td>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8125rem',
                      color: '#475569',
                      fontWeight: 600,
                    }}>
                      <FileText size={14} color="#94a3b8" /> {cat.article_count}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleStatus(cat)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                      title="Click to toggle status"
                    >
                      {cat.is_active ? (
                        <span className="badge badge-success">
                          <CheckCircle size={10} style={{ display: 'inline', marginRight: '3px' }} /> Active
                        </span>
                      ) : (
                        <span className="badge badge-inactive">
                          <XCircle size={10} style={{ display: 'inline', marginRight: '3px' }} /> Inactive
                        </span>
                      )}
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEdit(cat)}
                        className="btn btn-sm btn-outline"
                        title={t.edit}
                      >
                        <Edit2 size={13} /> {t.edit}
                      </button>
                      <button
                        onClick={() => setDeletingCategory(cat)}
                        className="btn btn-sm btn-danger-outline"
                        title={t.delete}
                      >
                        <Trash2 size={13} /> {t.delete}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile / Tablet Card View */}
      {!isLoading && !error && data && data.items.length > 0 && (
        <div className="mobile-card-view">
          {data.items.map((cat) => (
            <div key={cat.id} className="mobile-item-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                    {translateCategory(cat.slug, cat.name)}
                  </h3>
                  <code style={{ fontSize: '0.75rem', color: '#64748b' }}>/{cat.slug}</code>
                </div>
                <button
                  onClick={() => handleToggleStatus(cat)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {cat.is_active ? (
                    <span className="badge badge-success">Active</span>
                  ) : (
                    <span className="badge badge-inactive">Inactive</span>
                  )}
                </button>
              </div>

              {cat.description && (
                <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '0.75rem' }}>
                  {cat.description}
                </p>
              )}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '0.75rem',
                marginTop: '0.5rem',
              }}>
                <span style={{ fontSize: '0.8125rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <FileText size={14} color="#94a3b8" /> {cat.article_count} {t.totalArticles}
                </span>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleOpenEdit(cat)} className="btn btn-sm btn-outline">
                    <Edit2 size={13} /> {t.edit}
                  </button>
                  <button onClick={() => setDeletingCategory(cat)} className="btn btn-sm btn-danger-outline">
                    <Trash2 size={13} /> {t.delete}
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
          padding: '3rem 1.5rem',
          textAlign: 'center',
        }}>
          <FolderTree size={40} color="#94a3b8" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.35rem' }}>
            No categories found
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
            {searchTerm ? `No category matching "${searchTerm}"` : 'No categories exist in this view.'}
          </p>
          <button onClick={handleOpenCreate} className="btn btn-primary">
            <Plus size={16} /> Create Category
          </button>
        </div>
      )}

      {/* Pagination Bar */}
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
            Showing page {data.page} of {data.total_pages} ({data.total} total categories)
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

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <div className="modal-overlay" onClick={() => setIsCreateOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                Add New Category
              </h2>
              <button onClick={() => setIsCreateOpen(false)} style={{ background: 'none', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCreate}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {formError && (
                  <div style={{
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    padding: '0.65rem 0.875rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8125rem',
                  }}>
                    {formError}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Economy, Science"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.875rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. pune, economy"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.875rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of coverage for this category"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.875rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="is_active_create"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#dc2626' }}
                  />
                  <label htmlFor="is_active_create" style={{ fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                    Active (visible on reader menus and article assignments)
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="btn btn-primary"
                  style={{ opacity: createMutation.isPending ? 0.7 : 1 }}
                >
                  {createMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingCategory && (
        <div className="modal-overlay" onClick={() => setEditingCategory(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                Edit Category: {editingCategory.name}
              </h2>
              <button onClick={() => setEditingCategory(null)} style={{ background: 'none', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {formError && (
                  <div style={{
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    padding: '0.65rem 0.875rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8125rem',
                  }}>
                    {formError}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.875rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.875rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.875rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="is_active_edit"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#dc2626' }}
                  />
                  <label htmlFor="is_active_edit" style={{ fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                    Active (visible on reader menus and article assignments)
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setEditingCategory(null)} className="btn btn-outline">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="btn btn-primary"
                  style={{ opacity: updateMutation.isPending ? 0.7 : 1 }}
                >
                  {updateMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : 'Update Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingCategory && (
        <div className="modal-overlay" onClick={() => setDeletingCategory(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={20} /> Delete Category
              </h2>
              <button onClick={() => setDeletingCategory(null)} style={{ background: 'none', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ color: '#334155', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                Are you sure you want to delete the category <strong>"{deletingCategory.name}"</strong>?
              </p>
              {deletingCategory.article_count > 0 ? (
                <div style={{
                  backgroundColor: '#fee2e2',
                  border: '1px solid #fecdd3',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  marginTop: '0.75rem',
                  color: '#991b1b',
                  fontSize: '0.8125rem',
                }}>
                  <strong>Notice:</strong> This category has <strong>{deletingCategory.article_count}</strong> attached article(s).
                  To protect relational integrity, deletion is prevented while articles exist. You may deactivate it instead.
                </div>
              ) : (
                <p style={{ color: '#64748b', fontSize: '0.8125rem', marginTop: '0.5rem' }}>
                  This action cannot be undone.
                </p>
              )}
            </div>

            <div className="modal-footer">
              <button type="button" onClick={() => setDeletingCategory(null)} className="btn btn-outline">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => deleteMutation.mutate(deletingCategory.id)}
                disabled={deleteMutation.isPending || deletingCategory.article_count > 0}
                className="btn btn-primary"
                style={{
                  backgroundColor: deletingCategory.article_count > 0 ? '#94a3b8' : '#dc2626',
                  cursor: deletingCategory.article_count > 0 ? 'not-allowed' : 'pointer',
                }}
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
