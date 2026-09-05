import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Radio, Tv, Save, CheckCircle2, AlertCircle, ExternalLink, Eye, Sparkles } from 'lucide-react';
import { broadcastApi, BroadcastSettingUpdate } from '../../api/broadcast';
import { getYouTubeEmbedUrl } from '../../utils/youtube';

export const AdminBroadcastPage: React.FC = () => {
  const queryClient = useQueryClient();

  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [title, setTitle] = useState('');
  const [channelName, setChannelName] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { data: broadcast } = useQuery({
    queryKey: ['admin-live-broadcast'],
    queryFn: broadcastApi.getAdminBroadcast,
  });

  useEffect(() => {
    if (broadcast) {
      setYoutubeUrl(broadcast.youtube_url || '');
      setIsActive(broadcast.is_active);
      setTitle(broadcast.title || 'Nirbhid Live 24x7');
      setChannelName(broadcast.channel_name || 'Nirbhid News Digital');
    }
  }, [broadcast]);

  const mutation = useMutation({
    mutationFn: (data: BroadcastSettingUpdate) => broadcastApi.updateAdminBroadcast(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-live-broadcast'] });
      queryClient.invalidateQueries({ queryKey: ['public-live-broadcast'] });
      setFeedbackMsg({ type: 'success', text: 'Live broadcast settings saved and updated for all viewers successfully!' });
      setTimeout(() => setFeedbackMsg(null), 4000);
    },
    onError: () => {
      setFeedbackMsg({ type: 'error', text: 'Failed to update broadcast settings. Please verify the URL and try again.' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      youtube_url: youtubeUrl.trim(),
      is_active: isActive,
      title: title.trim(),
      channel_name: channelName.trim(),
    });
  };

  const previewEmbedUrl = getYouTubeEmbedUrl(youtubeUrl, false, true);

  return (
    <div className="container" style={{ padding: '2rem 1.25rem 4rem 1.25rem' }}>
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: '#ffffff',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(220, 38, 38, 0.2)',
            }}
          >
            <Radio size={28} className="ticker-flame-icon" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-secondary)', margin: '0 0 0.25rem 0' }}>
              Live TV & YouTube Broadcast Manager
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>
              Set your live YouTube stream link or channel broadcast to stream live news to all website visitors.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 800,
              backgroundColor: isActive ? '#dcfce7' : '#f1f5f9',
              color: isActive ? '#166534' : '#64748b',
              border: `1px solid ${isActive ? '#bbf7d0' : '#cbd5e1'}`,
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#22c55e' : '#94a3b8',
                display: 'inline-block',
              }}
            />
            {isActive ? 'BROADCAST ACTIVE' : 'STREAM DISABLED'}
          </span>
        </div>
      </div>

      {feedbackMsg && (
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: feedbackMsg.type === 'success' ? '#dcfce7' : '#fee2e2',
            color: feedbackMsg.type === 'success' ? '#166534' : '#991b1b',
            border: `1px solid ${feedbackMsg.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {feedbackMsg.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{feedbackMsg.text}</span>
        </div>
      )}

      {/* Main Grid: Settings Form & Live Preview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
        className="broadcast-grid"
      >
        {/* Left Column: Form Settings */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #e2e8f0',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Tv size={18} color="var(--color-primary)" /> Stream Configuration
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Toggle Status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #e2e8f0',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-secondary)' }}>
                  Enable Live TV Floating Bar
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  When enabled, the floating "Live TV" badge appears on all public pages.
                </div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '26px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: isActive ? '#dc2626' : '#cbd5e1',
                    borderRadius: '34px',
                    transition: '0.3s',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      height: '20px',
                      width: '20px',
                      left: isActive ? '24px' : '3px',
                      bottom: '3px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      transition: '0.3s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </span>
              </label>
            </div>

            {/* YouTube Stream URL */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-secondary)', marginBottom: '0.4rem' }}>
                YouTube Live Stream URL / Video Link <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="e.g. https://www.youtube.com/watch?v=... or https://youtu.be/... or https://www.youtube.com/live/..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  outline: 'none',
                }}
                required
              />
              <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginTop: '0.35rem' }}>
                Tip: Accepts standard YouTube links (<code>youtube.com/watch?v=ID</code>), short links (<code>youtu.be/ID</code>), or live links (<code>youtube.com/live/ID</code>).
              </span>
            </div>

            {/* Broadcast Title */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-secondary)', marginBottom: '0.4rem' }}>
                Broadcast Headline / Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Nirbhid Live 24x7: Maharashtra Breaking Bulletin"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Channel Display Name */}
            <div>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-secondary)', marginBottom: '0.4rem' }}>
                Channel / Studio Label
              </label>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="e.g. Nirbhid Digital Live Studio"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="btn btn-primary btn-pulse-red"
                style={{
                  flex: 1,
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <Save size={16} />
                {mutation.isPending ? 'Saving & Publishing...' : 'Save & Publish Live Stream'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Stream Preview */}
        <div
          style={{
            backgroundColor: '#0f172a',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid #334155',
            padding: '1.5rem',
            color: '#ffffff',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 800, color: '#f87171' }}>
              <Eye size={16} /> Reader Preview
            </div>
            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#38bdf8',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  textDecoration: 'none',
                }}
              >
                Open Source <ExternalLink size={12} />
              </a>
            )}
          </div>

          {/* Mini Player Frame */}
          <div
            style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid #334155',
              backgroundColor: '#000000',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Header Strip */}
            <div
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '0.4rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 800,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Radio size={12} /> {title || 'Nirbhid Live Broadcast'}
              </span>
              <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(0,0,0,0.3)', padding: '1px 5px', borderRadius: '3px' }}>
                PREVIEW
              </span>
            </div>

            {/* Video Box */}
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              {previewEmbedUrl ? (
                <iframe
                  src={previewEmbedUrl}
                  title="Live Stream Preview"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: '#64748b',
                    padding: '1rem',
                    textAlign: 'center',
                  }}
                >
                  <Tv size={32} />
                  <span style={{ fontSize: '0.8125rem' }}>Enter a valid YouTube stream link to preview video</span>
                </div>
              )}
            </div>

            {/* Bottom Bar */}
            <div
              style={{
                backgroundColor: '#1e293b',
                padding: '0.6rem 0.75rem',
                fontSize: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#cbd5e1',
              }}
            >
              <span style={{ fontWeight: 600, color: '#f8fafc' }}>{channelName || 'Nirbhid Digital'}</span>
              <span style={{ color: '#4ade80', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'inline-block' }} />
                HD LIVE
              </span>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem', backgroundColor: '#1e293b', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: '#94a3b8', lineHeight: 1.5 }}>
            <div style={{ fontWeight: 700, color: '#facc15', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={14} /> Broadcaster Guide
            </div>
            When you start a Live Stream on your YouTube Channel (or stream software like OBS / StreamYard), paste your stream link here and click <strong>"Save & Publish"</strong>. All visitors on your news site will instantly be able to watch your live broadcast!
          </div>
        </div>
      </div>
    </div>
  );
};
