import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Megaphone,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Eye,
  MousePointerClick,
  UploadCloud,
  CheckCircle2,
  XCircle,
  Loader2,
  Phone
} from 'lucide-react';
import { adsApi, Advertisement, AdvertisementInput } from '../../api/ads';
import { mediaApi } from '../../api/media';
import { resolveMediaUrl } from '../../utils/mediaUrl';

export const AdminAdsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const [formData, setFormData] = useState<AdvertisementInput>({
    title: '',
    client_name: '',
    image_url: '',
    target_url: '',
    placement: 'top_header',
    is_active: true,
  });

  const { data: ads, isLoading } = useQuery({
    queryKey: ['admin-ads'],
    queryFn: adsApi.getAdminAds,
  });

  const createMutation = useMutation({
    mutationFn: adsApi.createAd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-ads'] });
      queryClient.invalidateQueries({ queryKey: ['public-ads'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      closeModal();
    },
    onError: (err: any) => {
      setModalError(err.response?.data?.detail || 'Failed to create advertisement');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AdvertisementInput> }) =>
      adsApi.updateAd(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-ads'] });
      queryClient.invalidateQueries({ queryKey: ['public-ads'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
      closeModal();
    },
    onError: (err: any) => {
      setModalError(err.response?.data?.detail || 'Failed to update advertisement');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adsApi.deleteAd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-ads'] });
      queryClient.invalidateQueries({ queryKey: ['public-ads'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });

  const openCreateModal = () => {
    setEditingAd(null);
    setFormData({
      title: '',
      client_name: '',
      image_url: '',
      target_url: '',
      placement: 'top_header',
      is_active: true,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (ad: Advertisement) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      client_name: ad.client_name || '',
      image_url: ad.image_url,
      target_url: ad.target_url || '',
      placement: ad.placement,
      is_active: ad.is_active,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAd(null);
    setModalError(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setModalError(null);
    try {
      const media = await mediaApi.uploadMedia(file);
      setFormData((prev) => ({ ...prev, image_url: media.public_url }));
    } catch (err: any) {
      setModalError(err.response?.data?.detail || 'Failed to upload ad image.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setModalError('Ad Campaign Title is required.');
      return;
    }
    if (!formData.image_url.trim()) {
      setModalError('Banner creative / Image URL is required.');
      return;
    }

    if (editingAd) {
      updateMutation.mutate({ id: editingAd.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const toggleStatus = (ad: Advertisement) => {
    updateMutation.mutate({
      id: ad.id,
      data: { is_active: !ad.is_active },
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this advertisement?')) {
      deleteMutation.mutate(id);
    }
  };

  const getPlacementLabel = (placement: string) => {
    switch (placement) {
      case 'top_header':
        return '🔝 Top Header Leaderboard';
      case 'sidebar':
        return '📐 Sidebar Banner Box';
      case 'in_article':
        return '📰 In-Article Native Banner';
      case 'footer_banner':
        return '🔻 Bottom Footer Banner';
      default:
        return placement;
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem 5rem 1rem', maxWidth: '1100px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Megaphone size={24} color="#dc2626" />
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-secondary)', margin: 0 }}>
              Advertisement Campaign Manager (जाहिरात दालन)
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
            Manage sponsored client banners, positions, tracking, and ad bookings
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="btn btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.25rem', fontWeight: 700 }}
        >
          <Plus size={18} /> Create New Advertisement
        </button>
      </div>

      {/* Editor Ad Booking Quick Contact Box */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.5rem',
          color: '#ffffff',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          border: '1px solid #334155',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src="/assets/editor-rahul-jogdand.png"
            alt="Rahul Jogdand"
            style={{ width: '54px', height: '54px', borderRadius: '50%', border: '2px solid #eab308', objectFit: 'cover' }}
          />
          <div>
            <span style={{ fontSize: '0.75rem', color: '#facc15', fontWeight: 700, textTransform: 'uppercase' }}>
              मुख्य संपादक व जाहिरात प्रमुख
            </span>
            <h3 style={{ margin: '0.1rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
              राहुल बाबुराव जोगदंड (संपर्क: ९९२२२९९०२७)
            </h3>
            <p style={{ margin: 0, fontSize: '0.8125rem', color: '#cbd5e1' }}>
              सर्व प्रायोजित जाहिराती थेट पोर्टलवर टॉप हेडर, इन-आर्टिकल व साइडबारमध्ये प्रदर्शित होतात.
            </p>
          </div>
        </div>

        <a
          href="tel:9922299027"
          className="btn"
          style={{
            backgroundColor: '#dc2626',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.875rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1rem',
          }}
        >
          <Phone size={15} /> 9922299027
        </a>
      </div>

      {/* Ads List Cards / Table */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <Loader2 className="spinner" size={36} color="var(--color-primary)" style={{ margin: '0 auto' }} />
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Loading advertisements...</p>
        </div>
      ) : !ads || ads.length === 0 ? (
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '3.5rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <Megaphone size={42} color="#94a3b8" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-secondary)' }}>No Advertisements Yet</h3>
          <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto 1.5rem auto', fontSize: '0.875rem' }}>
            Add client sponsor banners to monetize your news portal.
          </p>
          <button type="button" onClick={openCreateModal} className="btn btn-primary">
            <Plus size={16} /> Create First Ad
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="editor-card"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Ad Creative Image Preview */}
              <div
                style={{
                  height: '160px',
                  backgroundColor: '#0f172a',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={resolveMediaUrl(ad.image_url)}
                  alt={ad.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    color: '#f8fafc',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {getPlacementLabel(ad.placement)}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: ad.is_active ? '#16a34a' : '#64748b',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                  }}
                >
                  {ad.is_active ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  {ad.is_active ? 'ACTIVE' : 'PAUSED'}
                </span>
              </div>

              {/* Ad Info */}
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-secondary)', margin: '0 0 0.35rem 0' }}>
                  {ad.title}
                </h3>
                {ad.client_name && (
                  <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: '0 0 0.75rem 0' }}>
                    Client: <strong>{ad.client_name}</strong>
                  </p>
                )}

                {/* Metrics */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    backgroundColor: '#f8fafc',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    margin: 'auto 0 1rem 0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: '#475569' }}>
                    <Eye size={15} color="#0284c7" />
                    <span><strong>{ad.impressions.toLocaleString()}</strong> Views</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', color: '#475569' }}>
                    <MousePointerClick size={15} color="#16a34a" />
                    <span><strong>{ad.clicks.toLocaleString()}</strong> Clicks</span>
                  </div>
                </div>

                {/* Target URL */}
                {ad.target_url && (
                  <a
                    href={ad.target_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-primary)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      marginBottom: '1rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <ExternalLink size={12} /> {ad.target_url}
                  </a>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => toggleStatus(ad)}
                    className="btn btn-outline"
                    style={{ flex: 1, padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                  >
                    {ad.is_active ? 'Pause' : 'Activate'}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditModal(ad)}
                    className="btn btn-outline"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                    title="Edit Ad"
                  >
                    <Edit2 size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(ad.id)}
                    className="btn btn-outline"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', color: '#dc2626', borderColor: '#fca5a5' }}
                    title="Delete Ad"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '540px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
                {editingAd ? 'Edit Advertisement' : 'Create New Advertisement'}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: '#64748b' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {modalError && (
                  <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8125rem', fontWeight: 600 }}>
                    {modalError}
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Campaign Title <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Maharashtra State Agro Expo 2026"
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }} className="editor-two-col">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      Client / Sponsor Name
                    </label>
                    <input
                      type="text"
                      value={formData.client_name || ''}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      placeholder="e.g. Govt of Maharashtra"
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      Placement Position <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <select
                      value={formData.placement}
                      onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', boxSizing: 'border-box', backgroundColor: '#ffffff' }}
                    >
                      <option value="top_header">🔝 Top Header Leaderboard</option>
                      <option value="sidebar">📐 Sidebar Banner Box</option>
                      <option value="in_article">📰 In-Article Native Banner</option>
                      <option value="footer_banner">🔻 Bottom Footer Banner</option>
                    </select>
                  </div>
                </div>

                {/* Banner Image Upload / URL */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Banner Image URL or Upload <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://... or upload PNG/JPG"
                      style={{ flex: 1, padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}
                      required
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="btn btn-outline"
                      style={{ padding: '0.55rem 0.85rem', fontSize: '0.8125rem', flexShrink: 0 }}
                    >
                      {isUploading ? <Loader2 size={14} className="spinner" /> : <UploadCloud size={14} />}
                      Upload
                    </button>
                  </div>

                  {formData.image_url && (
                    <div style={{ marginTop: '0.5rem', maxHeight: '120px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e2e8f0', backgroundColor: '#0f172a' }}>
                      <img
                        src={resolveMediaUrl(formData.image_url)}
                        alt="Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Target Link / Landing Page URL
                  </label>
                  <input
                    type="url"
                    value={formData.target_url || ''}
                    onChange={(e) => setFormData({ ...formData, target_url: e.target.value })}
                    placeholder="https://example.com/offer or tel:9922299027"
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                  />
                  Live & Active (प्रदर्शित करा)
                </label>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={closeModal} className="btn btn-outline">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  {(createMutation.isPending || updateMutation.isPending) && <Loader2 size={14} className="spinner" />}
                  {editingAd ? 'Save Changes' : 'Create Advertisement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
