import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  Save,
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
  List,
  Video,
  Sparkles,
  BookOpen,
  Film
} from 'lucide-react';
import { articleApi, ArticleInput } from '../../api/articles';
import { categoryApi } from '../../api/categories';
import { mediaApi } from '../../api/media';
import { useAuth } from '../../hooks/useAuth';
import { MarkdownRenderer } from '../../components/news/MarkdownRenderer';
import { VideoPlayer } from '../../components/news/VideoPlayer';
import { AdminTutorialModal } from '../../components/admin/AdminTutorialModal';

const ARTICLE_TEMPLATES = [
  {
    name: 'Standard News Report',
    icon: '📰',
    template: `# [बातमीचे मुख्य शीर्षक / Main Story Headline]

**मुंबई / विशेष प्रतिनिधी:** येथे बातमीचा मुख्य आणि महत्त्वाचा तपशील लिहा. (Write the primary lead paragraph here with key facts).

> "येथे महत्त्वाचे वक्तव्य किंवा शासकीय/अधिकृत प्रतिक्रिया समाविष्ट करा." — संबंधित अधिकारी / नेते

### महत्त्वाचे मुद्दे (Key Highlights):
- **पहिली महत्त्वाची बाब:** तपशील येथे द्या.
- **दुसरी महत्त्वाची बाब:** पुढील निर्णयांची माहिती.
- **नागरिकांवर परिणाम:** सर्वसामान्य जनतेसाठी माहिती.

अधिक तपास सुरू असून पुढील घडामोडींवर लक्ष ठेवले जात आहे.`,
  },
  {
    name: 'Breaking News Alert',
    icon: '🚨',
    template: `# [तातडीची बातमी / BREAKING NEWS HEADLINE]

**आत्ताची मोठी बातमी:** [घटनेचे ठिकाण] येथून मोठी बातमी समोर येत असून प्राथमिक माहितीनुसार [घटनेचे संक्षिप्त वर्णन].

> तातडीची माहिती: घटनास्थळी मदत व बचाव कार्य युद्धपातळीवर सुरू करण्यात आले आहे.

### प्राथमिक अपडेट्स (Live Updates):
1. **वेळ:** नुकतीच घडलेली घटना.
2. **परिस्थिती:** पोलीस व प्रशासकीय यंत्रणा घटनास्थळी दाखल.
3. **अधिकृत माहिती:** अधिकृत पत्रकाची प्रतीक्षा.

*बातमी अपडेट होत आहे... ताज्या माहितीसाठी जोडलेले रहा.*`,
  },
  {
    name: 'Video News Bulletin',
    icon: '🎥',
    template: `# [व्हिडिओ बातमी / Video Bulletin Headline]

**निर्भीड डिजिटल विशेष:** खालील व्हिडिओ रिपोर्टमध्ये पहा आजच्या सर्वात महत्त्वाच्या घटनेचा सविस्तर ग्राउंड रिपोर्ट.

### व्हिडिओ बातमीतील महत्त्वाचे मुद्दे:
- प्रत्यक्षदर्शींनी सांगितलेला संपूर्ण घटनाक्रम.
- घटनास्थळावरून प्रतिनिधीचा थेट वृत्तांत.
- प्रशासनाची भूमिका आणि पुढील पावले.

खालील संपूर्ण व्हिडिओ पहा आणि आपल्या प्रतिक्रिया नोंदवा.`,
  },
  {
    name: 'Press Release / Interview',
    icon: '🎙️',
    template: `# [मुलाखत / पत्रकार परिषद शीर्षक]

**विशेष मुलाखत:** आज घेतलेल्या विशेष पत्रकार परिषदेमध्ये खालील महत्त्वाच्या मुद्द्यांवर सविस्तर भाष्य करण्यात आले.

### प्रश्नोत्तरांचा मुख्य गोषवारा:
**प्रश्न:** सध्याच्या चालू घडामोडींबद्दल आपली भूमिका काय?  
**उत्तर:** आम्ही जनतेच्या हितासाठी सर्वतोपरी प्रयत्न करत आहोत.

**प्रश्न:** आगामी काळातील नवीन योजनांबद्दल काय सांगाल?  
**उत्तर:** लवकरच सर्वसमावेशक विकास आराखडा जाहीर केला जाईल.`,
  },
];

export const ArticleEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const contentFileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [formData, setFormData] = useState<ArticleInput>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image_url: '',
    video_url: '',
    category_id: '',
    author_name: '',
    status: 'draft',
    is_featured: false,
    is_breaking: false,
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

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
        video_url: existingArticle.video_url || '',
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

  // Apply quick template
  const applyTemplate = (templateContent: string) => {
    if (formData.content.trim() && !window.confirm('Applying a template will overwrite current article body. Do you wish to continue?')) {
      return;
    }
    setFormData((prev) => ({ ...prev, content: templateContent }));
  };

  // Handle Image Upload for Featured Image
  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploadingImage(true);
    setFormError(null);
    try {
      const media = await mediaApi.uploadMedia(file);
      setFormData((prev) => ({ ...prev, featured_image_url: media.public_url }));
      setImagePreviewError(false);
    } catch (err: any) {
      setFormError(err.response?.data?.detail || 'Failed to upload photo. Please check format and size.');
    } finally {
      setIsUploadingImage(false);
      e.target.value = '';
    }
  };

  // Handle Video Upload (MP4, WebM up to 50MB)
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploadingVideo(true);
    setFormError(null);
    try {
      const media = await mediaApi.uploadMedia(file);
      setFormData((prev) => ({ ...prev, video_url: media.public_url }));
    } catch (err: any) {
      setFormError(err.response?.data?.detail || 'Failed to upload video. Allowed formats: MP4, WebM up to 50 MB.');
    } finally {
      setIsUploadingVideo(false);
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
      setFormError(err.response?.data?.detail || 'Failed to upload inline image.');
    } finally {
      e.target.value = '';
    }
  };

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: (data: ArticleInput) => {
      if (isEditing && id) {
        return articleApi.updateArticle(id, data);
      }
      return articleApi.createArticle(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      queryClient.invalidateQueries({ queryKey: ['public-articles'] });
      queryClient.invalidateQueries({ queryKey: ['featured-articles'] });
      queryClient.invalidateQueries({ queryKey: ['breaking-articles'] });
      navigate('/admin/articles');
    },
    onError: (err: any) => {
      const detail = err.response?.data?.detail || 'Failed to save article. Please verify required fields.';
      setFormError(detail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!formData.title.trim()) {
      setFormError('Article headline is required.');
      return;
    }
    if (!formData.content.trim()) {
      setFormError('Article content body is required.');
      return;
    }
    if (!formData.category_id) {
      setFormError('Please select a news category.');
      return;
    }

    saveMutation.mutate(formData);
  };

  if (isEditing && loadingArticle) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <Loader2 className="spinner" size={36} color="var(--color-primary)" style={{ margin: '0 auto 1rem auto' }} />
        <p style={{ color: '#64748b' }}>Loading article details for editing...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem 5rem 1rem', maxWidth: '1100px' }}>
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            to="/admin/articles"
            className="btn btn-outline"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.875rem' }}
          >
            <ArrowLeft size={16} /> Back to Articles
          </Link>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-secondary)', margin: 0 }}>
              {isEditing ? 'Edit News Story' : 'Create New News Story'}
            </h1>
            <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0 }}>
              {isEditing ? `Updating: ${formData.title || 'Untitled'}` : 'Draft, format, upload media & publish digital news'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={() => setIsTutorialOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#fef3c7',
              border: '1px solid #fde68a',
              color: '#92400e',
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <BookOpen size={16} color="#d97706" /> How to Use Tutorial
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saveMutation.isPending}
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: 700,
            }}
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="spinner" size={16} /> Saving...
              </>
            ) : (
              <>
                <Save size={16} /> {formData.status === 'published' ? 'Publish Story' : 'Save as Draft'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {formError && (
        <div
          style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '1.75rem' }} className="article-editor-grid">
          {/* Main Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* 1. Headline & Slug Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--color-secondary)',
                    marginBottom: '0.4rem',
                  }}
                >
                  News Headline (मुख्य बातमी शीर्षक) <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="उदा: मुंबई-पुणे एक्सप्रेसवेवर नवीन AI ट्रॅफिक सिस्टीम सुरू..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    fontFamily: 'var(--font-serif)',
                  }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                    URL Slug (वेब लिंक नाव)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="mumbai-pune-expressway-ai-traffic"
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#f8fafc',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                    Author / Journalist Bylines (वार्ताहर नाव)
                  </label>
                  <input
                    type="text"
                    value={formData.author_name || ''}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    placeholder="उदा: राजेश सावंत (विशेष प्रतिनिधी)"
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.3rem' }}>
                  Short Summary / Excerpt (थोडक्यात सारांश)
                </label>
                <textarea
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="बातमीचा २-३ ओळींचा सारांश जो सोशल मीडिया व बातमी कार्डांवर दिसेल..."
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    fontSize: '0.875rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>

            {/* 2. Visual Media & Video Bulletin Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-secondary)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Film size={18} color="var(--color-primary)" /> Visual Media & Video Bulletin (फोटो आणि व्हिडिओ बातमी)
              </h3>

              {/* Video News Section */}
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Video size={16} color="#7c3aed" /> Video News / Bulletin URL (व्हिडिओ बातमी)
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>YouTube URL or Direct MP4</span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <input
                    type="url"
                    value={formData.video_url || ''}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=... or MP4 URL"
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                    }}
                  />
                  <input
                    type="file"
                    ref={videoFileInputRef}
                    onChange={handleVideoUpload}
                    accept="video/mp4,video/webm,video/quicktime"
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => videoFileInputRef.current?.click()}
                    disabled={isUploadingVideo}
                    className="btn btn-outline"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 0.85rem',
                      fontSize: '0.8125rem',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    {isUploadingVideo ? <Loader2 size={14} className="spinner" /> : <UploadCloud size={14} color="#7c3aed" />}
                    Upload MP4
                  </button>
                </div>

                {/* Live Video Preview if URL provided */}
                {formData.video_url && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>
                      ▶️ Live Video Player Preview:
                    </span>
                    <VideoPlayer url={formData.video_url} title={formData.title} />
                  </div>
                )}
              </div>

              {/* Featured Cover Image Section */}
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.4rem' }}>
                  Featured Cover Photo (मुख्य फोटो)
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <input
                    type="url"
                    value={formData.featured_image_url || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, featured_image_url: e.target.value });
                      setImagePreviewError(false);
                    }}
                    placeholder="https://images.unsplash.com/... or upload image"
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                    }}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFeaturedImageUpload}
                    accept="image/jpeg,image/png,image/webp"
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="btn btn-outline"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 0.85rem',
                      fontSize: '0.8125rem',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    {isUploadingImage ? <Loader2 size={14} className="spinner" /> : <UploadCloud size={14} color="#0284c7" />}
                    Upload Photo
                  </button>
                </div>

                {/* Featured Photo Preview */}
                {formData.featured_image_url && !imagePreviewError && (
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      maxHeight: '220px',
                      overflow: 'hidden',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <img
                      src={formData.featured_image_url}
                      alt="Cover Preview"
                      onError={() => setImagePreviewError(true)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 3. Article Content & Quick Templates Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-secondary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Edit3 size={18} color="var(--color-primary)" /> News Content (बातमीचा सविस्तर मजकूर) <span style={{ color: '#dc2626' }}>*</span>
                </h3>

                {/* Write / Preview Tab Switcher */}
                <div style={{ display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '6px', padding: '3px' }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('write')}
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: activeTab === 'write' ? '#ffffff' : 'transparent',
                      color: activeTab === 'write' ? 'var(--color-secondary)' : '#64748b',
                      boxShadow: activeTab === 'write' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <Edit3 size={13} /> Write Mode
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: activeTab === 'preview' ? '#ffffff' : 'transparent',
                      color: activeTab === 'preview' ? 'var(--color-secondary)' : '#64748b',
                      boxShadow: activeTab === 'preview' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <Eye size={13} /> Live Reader Preview
                  </button>
                </div>
              </div>

              {/* 1-Click Fast Templates Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 0.75rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  overflowX: 'auto',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 700, color: '#475569', whiteSpace: 'nowrap' }}>
                  <Sparkles size={14} color="#eab308" /> 1-Click Templates:
                </div>
                {ARTICLE_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.name}
                    type="button"
                    onClick={() => applyTemplate(tpl.template)}
                    style={{
                      padding: '0.25rem 0.6rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <span>{tpl.icon}</span> {tpl.name}
                  </button>
                ))}
              </div>

              {activeTab === 'write' ? (
                <div>
                  {/* Markdown Toolbar */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.4rem',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderBottom: 'none',
                      borderTopLeftRadius: 'var(--radius-sm)',
                      borderTopRightRadius: 'var(--radius-sm)',
                      flexWrap: 'wrap',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => insertFormatting('**', '**')}
                      className="btn btn-outline"
                      style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                      title="Bold"
                    >
                      <Bold size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('*', '*')}
                      className="btn btn-outline"
                      style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                      title="Italic"
                    >
                      <Italic size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('### ')}
                      className="btn btn-outline"
                      style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                      title="Heading"
                    >
                      <Heading size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('> ')}
                      className="btn btn-outline"
                      style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                      title="Quote"
                    >
                      <Quote size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting('- ')}
                      className="btn btn-outline"
                      style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                      title="Bullet list"
                    >
                      <List size={14} />
                    </button>

                    <input
                      type="file"
                      ref={contentFileInputRef}
                      onChange={handleContentImageUpload}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      onClick={() => contentFileInputRef.current?.click()}
                      className="btn btn-outline"
                      style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      title="Insert inline image"
                    >
                      <ImageIcon size={14} /> Photo
                    </button>
                  </div>

                  <textarea
                    id="article-content-area"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write article details in Markdown or select a 1-click template above..."
                    rows={16}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      border: '1px solid #e2e8f0',
                      borderBottomLeftRadius: 'var(--radius-sm)',
                      borderBottomRightRadius: 'var(--radius-sm)',
                      fontFamily: 'monospace',
                      resize: 'vertical',
                    }}
                    required
                  />
                </div>
              ) : (
                /* Live Preview Render */
                <div
                  style={{
                    padding: '1.5rem',
                    border: '1px solid #e2e8f0',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: '#ffffff',
                    minHeight: '380px',
                  }}
                >
                  <MarkdownRenderer content={formData.content || '*No content written yet.*'} />
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar: Categories & Publishing Flags */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Publishing Settings Box */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-secondary)', margin: '0 0 1rem 0' }}>
                Publishing Status (प्रकाशन स्थिती)
              </h3>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <option value="draft">📝 Draft (मसुदा - खाजगी)</option>
                  <option value="published">🟢 Published (थेट प्रकाशित)</option>
                  <option value="archived">📦 Archived (दप्तरबंद)</option>
                </select>
              </div>

              {/* Category Dropdown */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Category (बातमीचा विभाग) <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#ffffff',
                  }}
                  required
                >
                  {loadingCategories ? (
                    <option>Loading categories...</option>
                  ) : (
                    categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.slug})
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Flags Toggles */}
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Breaking News Toggle */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: formData.is_breaking ? '#dc2626' : '#334155',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.is_breaking}
                    onChange={(e) => setFormData({ ...formData, is_breaking: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#dc2626' }}
                  />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Flame size={16} color="#dc2626" /> Breaking News Ticker (ब्रेकिंग न्यूज)
                  </span>
                </label>

                {/* Featured Story Toggle */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: formData.is_featured ? '#2563eb' : '#334155',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                  />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Star size={16} color="#eab308" /> Featured Story Hero (मुख्य बातमी)
                  </span>
                </label>
              </div>

              {/* Submit Button in Sidebar */}
              <div style={{ marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={saveMutation.isPending}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {saveMutation.isPending ? (
                    <>
                      <Loader2 className="spinner" size={16} /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} /> {formData.status === 'published' ? 'Publish Story' : 'Save as Draft'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div
              style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
              }}
            >
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e40af', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                💡 Editorial Pro Tips
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: '#1e3a8a', lineHeight: 1.6 }}>
                <li>Attach a <strong>Video Bulletin URL</strong> for multimedia digital reporting.</li>
                <li>Add a short <strong>summary excerpt</strong> for higher Google click-through rates.</li>
                <li>Mark as <strong>Breaking News</strong> to alert readers instantly across the site.</li>
              </ul>
            </div>
          </div>
        </div>
      </form>

      {/* Tutorial Modal */}
      <AdminTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
};
