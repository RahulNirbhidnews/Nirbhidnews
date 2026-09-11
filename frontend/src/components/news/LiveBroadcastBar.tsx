import React, { useState } from 'react';
import { Tv, X, Minimize2, Radio, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { broadcastApi } from '../../api/broadcast';
import { useLanguage } from '../../context/LanguageContext';
import { getYouTubeEmbedUrl } from '../../utils/youtube';

export const LiveBroadcastBar: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const { data: broadcast } = useQuery({
    queryKey: ['public-live-broadcast'],
    queryFn: broadcastApi.getPublicBroadcast,
    refetchInterval: 1000 * 60 * 2, // Refresh every 2 mins for live state changes
  });

  // If live broadcast is turned off by admin, hide the floating pill
  if (broadcast && !broadcast.is_active) {
    return null;
  }

  const embedUrl = getYouTubeEmbedUrl(broadcast?.youtube_url);
  const broadcastTitle = broadcast?.title || t.liveBroadcast || 'Nirbhid Live 24x7';
  const channelName = broadcast?.channel_name || 'Nirbhid Digital Live';

  return (
    <div className="live-broadcast-floating-container">
      {/* Floating Trigger Pill when closed or minimized */}
      {!isOpen || isMinimized ? (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '0.6rem 1.1rem',
            borderRadius: '9999px',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 10px 15px -3px rgba(220, 38, 38, 0.4), 0 4px 6px -4px rgba(220, 38, 38, 0.2)',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          className="live-tv-pill btn-pulse-red"
          title="Watch Nirbhid Live Broadcast"
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              display: 'inline-block',
              animation: 'pulse 1.5s infinite',
            }}
          />
          <Tv size={16} />
          <span>{t.liveTv}</span>
        </button>
      ) : (
        /* Expanded Live Stream Mini-Player */
        <div className="live-broadcast-player-box">
          {/* Top Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '0.5rem 0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
              <Radio size={14} className="ticker-flame-icon" />
              <span>{broadcastTitle}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {broadcast?.youtube_url && (
                <a
                  href={broadcast.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'white', display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '4px' }}
                  title="Open on YouTube"
                >
                  <ExternalLink size={14} />
                </a>
              )}
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}
                title="Minimize"
              >
                <Minimize2 size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Embedded Broadcast Stream Video */}
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', backgroundColor: '#000000' }}>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title="Nirbhid Live Broadcast"
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
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                Live broadcast stream offline
              </div>
            )}
          </div>

          <div style={{ padding: '0.5rem 0.75rem', backgroundColor: '#1e293b', color: '#cbd5e1', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, color: '#f8fafc' }}>{channelName}</span>
            <span style={{ color: '#4ade80', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'inline-block' }} />
              LIVE 24x7
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
