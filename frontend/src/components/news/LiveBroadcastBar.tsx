import React, { useState } from 'react';
import { Tv, X, Minimize2, Radio } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LiveBroadcastBar: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 990,
      }}
    >
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
            padding: '0.6rem 1rem',
            borderRadius: '9999px',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 10px 15px -3px rgba(220, 38, 38, 0.4)',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            transition: 'transform 0.2s ease',
          }}
          className="live-tv-pill"
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
          <Tv size={15} />
          <span>{t.liveTv}</span>
        </button>
      ) : (
        /* Expanded Live Stream Mini-Player */
        <div
          style={{
            width: '320px',
            backgroundColor: '#0f172a',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
            border: '2px solid #334155',
            animation: 'slideUpPopup 0.3s ease',
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '0.4rem 0.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800 }}>
              <Radio size={14} />
              <span>{t.liveBroadcast}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '2px' }}
                title="Minimize"
              >
                <Minimize2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '2px' }}
                title="Close"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Embedded Broadcast Stream Video */}
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=1"
              title="Nirbhid News Live Broadcast"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>

          <div style={{ padding: '0.5rem 0.75rem', backgroundColor: '#1e293b', color: '#cbd5e1', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600 }}>Nirbhid Digital 24x7</span>
            <span style={{ color: '#4ade80', fontWeight: 700 }}>● HD LIVE</span>
          </div>
        </div>
      )}
    </div>
  );
};
