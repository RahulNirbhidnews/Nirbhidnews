import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  Copy,
  CheckCircle,
  AlertTriangle,
  Loader2,
  X
} from 'lucide-react';
import { mediaApi } from '../../api/media';
import { Media } from '../../types';

export const AdminMediaPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [deletingMedia, setDeletingMedia] = useState<Media | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Query Media Library
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-media', page],
    queryFn: () => mediaApi.getAdminMedia(page, 24),
  });

  // Handle File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    // Check client-side validation
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setToastMessage({ text: 'Only JPEG, PNG, and WebP images are allowed.', type: 'error' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setToastMessage({ text: 'File size exceeds maximum 5 MB limit.', type: 'error' });
      return;
    }

    setIsUploading(true);
    try {
      await mediaApi.uploadMedia(file);
      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
      setToastMessage({ text: 'Image uploaded successfully to storage!', type: 'success' });
    } catch (err: any) {
      setToastMessage({
        text: err.response?.data?.detail || 'Failed to upload image.',
        type: 'error',
      });
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => mediaApi.deleteMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-media'] });
      setDeletingMedia(null);
      if (selectedMedia?.id === deletingMedia?.id) {
        setSelectedMedia(null);
      }
      setToastMessage({ text: 'Media asset deleted.', type: 'success' });
    },
    onError: (err: any) => {
      setToastMessage({ text: err.response?.data?.detail || 'Failed to delete media', type: 'error' });
    },
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setToastMessage({ text: 'Public URL copied to clipboard!', type: 'success' });
    setTimeout(() => setCopiedId(null), 2500);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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
            <ImageIcon size={24} color="#dc2626" />
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
              Media Assets Library
            </h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Upload, organize, and attach news images to editorial articles
          </p>
        </div>
      </div>

      {/* Upload Dropzone Area */}
      <div style={{
        background: '#fff',
        border: '2px dashed #cbd5e1',
        borderRadius: 'var(--radius-lg)',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        marginBottom: '2rem',
        position: 'relative',
      }}>
        <input
          type="file"
          id="media-upload-input"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileUpload}
          disabled={isUploading}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: isUploading ? 'not-allowed' : 'pointer',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          {isUploading ? (
            <>
              <Loader2 size={44} color="#dc2626" className="animate-spin" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                Uploading image to storage...
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                Validating MIME and creating storage record
              </p>
            </>
          ) : (
            <>
              <UploadCloud size={44} color="#dc2626" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                Click or Drag & Drop Image Here to Upload
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.8125rem', marginTop: '0.25rem' }}>
                Supports JPEG, PNG, WebP (Max size: 5 MB)
              </p>
            </>
          )}
        </div>
      </div>

      {/* Loading & Error States */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <Loader2 size={36} color="#dc2626" className="animate-spin" style={{ margin: '0 auto 1rem auto' }} />
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Loading media library...</p>
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
          <p>Failed to load media assets.</p>
        </div>
      )}

      {/* Responsive Media Gallery Grid */}
      {!isLoading && !error && data && data.items.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}>
          {data.items.map((media) => (
            <div
              key={media.id}
              onClick={() => setSelectedMedia(media)}
              style={{
                background: '#fff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ width: '100%', height: '140px', backgroundColor: '#e2e8f0', position: 'relative' }}>
                <img
                  src={media.public_url}
                  alt={media.file_name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '0.75rem' }}>
                <div style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--color-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {media.file_name}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                }}>
                  <span>{formatFileSize(media.file_size)}</span>
                  <span style={{ textTransform: 'uppercase' }}>{media.mime_type.split('/')[1]}</span>
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
          <ImageIcon size={44} color="#94a3b8" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.35rem' }}>
            No media assets found
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Upload photographs and infographics above to use across news articles.
          </p>
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
            Showing page {data.page} of {data.total_pages} ({data.total} total assets)
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

      {/* MEDIA DETAIL MODAL */}
      {selectedMedia && (
        <div className="modal-overlay" onClick={() => setSelectedMedia(null)}>
          <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                Media Asset Details
              </h2>
              <button onClick={() => setSelectedMedia(null)} style={{ background: 'none', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{
                maxHeight: '300px',
                backgroundColor: '#0f172a',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <img
                  src={selectedMedia.public_url}
                  alt={selectedMedia.file_name}
                  style={{ maxHeight: '300px', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <div>
                  <label style={{ fontWeight: 600, color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    File Name
                  </label>
                  <div style={{ fontWeight: 600, color: 'var(--color-secondary)' }}>{selectedMedia.file_name}</div>
                </div>

                <div>
                  <label style={{ fontWeight: 600, color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    Public URL
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <input
                      type="text"
                      readOnly
                      value={selectedMedia.public_url}
                      style={{
                        flex: 1,
                        padding: '0.45rem 0.65rem',
                        fontSize: '0.8125rem',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: '#f8fafc',
                        outline: 'none',
                      }}
                    />
                    <button
                      onClick={() => handleCopyUrl(selectedMedia.public_url, selectedMedia.id)}
                      className="btn btn-sm btn-outline"
                    >
                      {copiedId === selectedMedia.id ? <CheckCircle size={14} color="#16a34a" /> : <Copy size={14} />} Copy
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Size:</span>
                    <div style={{ fontWeight: 600 }}>{formatFileSize(selectedMedia.file_size)}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '0.75rem' }}>Uploaded:</span>
                    <div style={{ fontWeight: 600 }}>{new Date(selectedMedia.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button
                onClick={() => setDeletingMedia(selectedMedia)}
                className="btn btn-sm btn-danger-outline"
              >
                <Trash2 size={14} /> Delete Asset
              </button>

              <button onClick={() => setSelectedMedia(null)} className="btn btn-sm btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingMedia && (
        <div className="modal-overlay" onClick={() => setDeletingMedia(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={20} /> Delete Media
              </h2>
            </div>
            <div className="modal-body">
              <p style={{ color: '#334155', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                Are you sure you want to delete <strong>"{deletingMedia.file_name}"</strong>?
              </p>
              <p style={{ color: '#64748b', fontSize: '0.8125rem', marginTop: '0.5rem' }}>
                Any articles referencing this image URL will no longer be able to load the image.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => setDeletingMedia(null)} className="btn btn-outline">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => deleteMutation.mutate(deletingMedia.id)}
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
