import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  Save,
  Globe,
  Star,
  Flame,
  Image as ImageIcon,
  UploadCloud,
  AlertCircle,
  Loader2,
  Eye,
  Edit3,
  Bold,
  Italic,
  Heading,
  Quote,
  List
} from 'lucide-react';
import { articleApi, ArticleInput } from '../../api/articles';
import { categoryApi } from '../../api/categories';
import { mediaApi } from '../../api/media';
import { useAuth } from '../../hooks/useAuth';

export const ArticleEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentFileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [formData, setFormData] = useState<ArticleInput>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image_url: '',
    category_id: '',
    author_name: '',
    status: 'draft',
    is_featured: false,
    is_breaking: false,
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Fetch Categories for Selection
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['public-categories'],
    queryFn: categoryApi.getPublicCategories,
  });

  // Fetch Existing Article if Editing
  const { data: existingArticle, isLoading: loadingArticle } = useQuery({
    queryKey: ['admin-article', id],
    queryFn: () => (id ? articleApi.getAdminArticleById(id) : null),
    enabled: isEditing,
  });

  // Populate form on load
  useEffect(() => {
    if (existingArticle) {
      setFormData({
        title: existingArticle.title,
        slug: existingArticle.slug,
        excerpt: existingArticle.excerpt || '',
        content: existingArticle.content,
        featured_image_url: existingArticle.featured_image_url || '',
        category_id: existingArticle.category_id,
        author_name: existingArticle.author_name || '',
        status: existingArticle.status,
        is_featured: existingArticle.is_featured,
        is_breaking: existingArticle.is_breaking,
      });
    } else if (!isEditing && user && !formData.author_name) {
      setFormData((prev) => ({
        ...prev,
        author_name: user.full_name || user.email,
      }));
    }
  }, [existingArticle, isEditing, user]);

  // Set default category when categories load
  useEffect(() => {
    if (!formData.category_id && categories && categories.length > 0) {
      setFormData((prev) => ({ ...prev, category_id: categories[0].id }));
    }
  }, [categories, formData.category_id]);

  // Handle Title input with Auto-slug generator
  const handleTitleChange = (newTitle: string) => {
    const generatedSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: prev.slug === '' || prev.slug === formData.slug ? generatedSlug : prev.slug,
    }));
  };

  // Helper formatting insert
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('article-content-area') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = `${prefix}${selected || 'text'}${suffix}`;

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    setFormData((prev) => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected ? selected.length : 4));
    }, 50);
  };

  // Handle Image Upload for Featured Image
  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploadingImage(true);
    try {
      const media = await mediaApi.uploadMedia(file);
      setFormData((prev) => ({ ...prev, featured_image_url: media.public_url }));
      setImagePreviewError(false);
    } catch (err: any) {
      setFormError(err.response?.data?.detail || 'Failed to upload image.');
    } finally {
      setIsUploadingImage(false);
      e.target.value = '';
    }
  };

  // Handle Image Upload directly into content
  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    try {
      const media = await mediaApi.uploadMedia(file);
      const markdownImage = `\n\n![${media.file_name}](${media.public_url})\n\n`;
      setFormData((prev) => ({ ...prev, content: prev.content + markdownImage }));
    } catch (err: any) {
      setFormError(err.response?.data?.detail || 'Failed to upload content image.');
    } finally {
      e.target.value = '';
    }
  };

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: (statusOverride?: string) => {
      const payload = {
        ...formData,
        status: statusOverride || formData.status,
      };
      if (isEditing && id) {
        return articleApi.updateArticle(id, payload);
      }
      return articleApi.createArticle(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      navigate('/admin/articles');
    },
    onError: (err: any) => {
      setFormError(err.response?.data?.detail || 'Failed to save article. Please check all fields.');
    },
  });

  const handleSubmit = (statusOverride?: string) => {
    setFormError(null);
    if (!formData.title.trim()) {
      setFormError('Article headline is required.');
      return;
    }
    if (!formData.content.trim()) {
      setFormError('Article content cannot be empty.');
      return;
    }
    if (!formData.category_id) {
      setFormError('Please select a news category.');
      return;
    }

    saveMutation.mutate(statusOverride);
  };

  if (loadingArticle || loadingCategories) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <Loader2 size={40} color="#dc2626" className="animate-spin" style={{ margin: '0 auto 1rem auto' }} />
        <p style={{ color: '#64748b' }}>Loading editorial workspace...</p>
      </div>
    );
  }

  const wordCount = formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0;
  const charCount = formData.content.length;

  return (
    <div className="container" style={{ padding: '2rem 1.25rem', maxWidth: '1200px' }}>
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={handleFeaturedImageUpload}
      />
      <input
        type="file"
        ref={contentFileInputRef}
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={handleContentImageUpload}
      />

      {/* Top Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/admin/articles" className="btn btn-sm btn-outline">
            <ArrowLeft size={14} /> Back to Articles
          </Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
            {isEditing ? 'Edit Article' : 'Write New Article'}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={saveMutation.isPending}
            className="btn btn-outline"
          >
            <Save size={15} /> Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={saveMutation.isPending}
            className="btn btn-primary"
          >
            <Globe size={15} /> {isEditing ? 'Update & Publish' : 'Publish Article'}
          </button>
        </div>
      </div>

      {formError && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fecdd3',
          color: '#991b1b',
          padding: '0.875rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <AlertCircle size={18} />
          <span>{formError}</span>
        </div>
      )}

      {/* Editor Grid: Main Form (Left) & Sidebar (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }} className="editor-grid">
        {/* Left Column: Headline, Slug, Excerpt, Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Headline */}
          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#475569', marginBottom: '0.5rem' }}>
              Headline / Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Maharashtra Cabinet Approves New Industrial Policy"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1.25rem',
                fontWeight: 700,
                outline: 'none',
                fontFamily: 'var(--font-serif)',
              }}
            />

            {/* Slug row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.8125rem', color: '#64748b', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600 }}>Slug:</span>
              <span style={{ color: '#94a3b8' }}>/news/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="article-url-slug"
                style={{
                  flex: 1,
                  minWidth: '180px',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.8125rem',
                  border: '1px dashed var(--color-border)',
                  borderRadius: '4px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Excerpt */}
          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#475569', marginBottom: '0.5rem' }}>
              Excerpt / Summary
            </label>
            <textarea
              rows={3}
              placeholder="A brief 1-2 sentence lead summary appearing on homepage cards and search snippets."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              style={{
                width: '100%',
                padding: '0.65rem 0.875rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                outline: 'none',
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Content Editor with Formatting Toolbar & Preview */}
          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid var(--color-border)',
              backgroundColor: '#f8fafc',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}>
              <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  className="btn btn-sm btn-outline"
                  title="Bold"
                >
                  <Bold size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  className="btn btn-sm btn-outline"
                  title="Italic"
                >
                  <Italic size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('### ')}
                  className="btn btn-sm btn-outline"
                  title="Heading"
                >
                  <Heading size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('> ')}
                  className="btn btn-sm btn-outline"
                  title="Quote"
                >
                  <Quote size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('- ')}
                  className="btn btn-sm btn-outline"
                  title="Bullet List"
                >
                  <List size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => contentFileInputRef.current?.click()}
                  className="btn btn-sm btn-outline"
                  title="Upload & Insert Photo"
                >
                  <ImageIcon size={13} /> Insert Photo
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`btn btn-sm ${activeTab === 'write' ? 'btn-secondary' : 'btn-outline'}`}
                >
                  <Edit3 size={13} /> Write
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`btn btn-sm ${activeTab === 'preview' ? 'btn-secondary' : 'btn-outline'}`}
                >
                  <Eye size={13} /> Preview
                </button>
              </div>
            </div>

            <div style={{ padding: '1.25rem' }}>
              {activeTab === 'write' ? (
                <textarea
                  id="article-content-area"
                  rows={16}
                  required
                  placeholder="Write full news article content here (Markdown & paragraph formatting supported)..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    fontFamily: 'var(--font-sans)',
                    resize: 'vertical',
                    minHeight: '320px',
                  }}
                />
              ) : (
                <div style={{
                  minHeight: '320px',
                  fontSize: '0.9375rem',
                  lineHeight: 1.8,
                  color: '#334155',
                  whiteSpace: 'pre-wrap',
                }}>
                  {formData.content ? (
                    formData.content
                  ) : (
                    <em style={{ color: '#94a3b8' }}>No content written yet. Switch back to Write tab to begin.</em>
                  )}
                </div>
              )}
            </div>

            <div style={{
              padding: '0.5rem 1.25rem',
              borderTop: '1px solid var(--color-border)',
              backgroundColor: '#f8fafc',
              fontSize: '0.75rem',
              color: '#64748b',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Metadata Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Category & Reporter */}
          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '1rem' }}>
              Editorial Attributes
            </h3>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                News Category *
              </label>
              <select
                required
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.875rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  backgroundColor: '#fff',
                }}
              >
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Reporter / Byline
              </label>
              <input
                type="text"
                placeholder="e.g. Special Correspondent"
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
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
          </div>

          {/* Featured Image */}
          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                Featured Image
              </h3>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingImage}
                className="btn btn-sm btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
              >
                {isUploadingImage ? <Loader2 size={12} className="animate-spin" /> : <UploadCloud size={12} />} Upload
              </button>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Image Public URL
              </label>
              <input
                type="url"
                placeholder="https://... or upload from button"
                value={formData.featured_image_url}
                onChange={(e) => {
                  setFormData({ ...formData, featured_image_url: e.target.value });
                  setImagePreviewError(false);
                }}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.875rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8125rem',
                  outline: 'none',
                }}
              />
            </div>

            {formData.featured_image_url && !imagePreviewError ? (
              <div style={{ marginTop: '0.5rem', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <img
                  src={formData.featured_image_url}
                  alt="Featured preview"
                  onError={() => setImagePreviewError(true)}
                  style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                />
              </div>
            ) : (
              <div style={{
                height: '90px',
                border: '1px dashed var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.25rem',
                color: '#94a3b8',
                fontSize: '0.75rem',
              }}>
                <ImageIcon size={20} />
                <span>Upload an image or paste URL above</span>
              </div>
            )}
          </div>

          {/* Flags & Status */}
          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '1rem' }}>
              Visibility & Flags
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.is_breaking}
                  onChange={(e) => setFormData({ ...formData, is_breaking: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#dc2626' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#dc2626', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Flame size={14} /> Breaking News Ticker
                </span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#d97706' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#d97706', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Star size={14} /> Top Featured Story
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
