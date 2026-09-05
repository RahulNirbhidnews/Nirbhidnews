import React from 'react';
import { Phone, MessageSquare, Award, CheckCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ChiefEditorSpotlight: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      aria-label="Chief Editor Leadership Spotlight"
      style={{
        background: 'linear-gradient(135deg, #0b1120 0%, #172554 50%, #0f172a 100%)',
        borderRadius: 'var(--radius-lg, 16px)',
        padding: '2rem 1.75rem',
        color: '#ffffff',
        border: '2px solid rgba(234, 179, 8, 0.4)',
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
        position: 'relative',
        overflow: 'hidden',
        margin: '2rem 0',
      }}
    >
      {/* Decorative Golden Glow Effects */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '-40px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left Side: BIG Leader Photo & Bio Credentials */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem',
            flexWrap: 'wrap',
            flex: '1 1 500px',
          }}
        >
          {/* BIG High-Resolution Leader Photo with Golden Aura */}
          <div style={{ position: 'relative', flexShrink: 0, margin: '0 auto' }}>
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #eab308',
                boxShadow: '0 0 30px rgba(234, 179, 8, 0.5), 0 8px 24px rgba(0, 0, 0, 0.4)',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/assets/editor-rahul-jogdand.png"
                alt={`${t.editorName} - ${t.editorTitle}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  transform: 'scale(1.04)',
                }}
              />
            </div>

            {/* Official Blue Verified Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '6px',
                right: '6px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                borderRadius: '50%',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #0b1120',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
              title="Verified Press Chief Editor"
            >
              <CheckCircle size={18} />
            </div>

            {/* Gold Crown Pin */}
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#eab308',
                color: '#713f12',
                borderRadius: '12px',
                padding: '2px 8px',
                fontSize: '0.65rem',
                fontWeight: 900,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                letterSpacing: '0.5px',
              }}
            >
              <Award size={11} /> CHIEF
            </div>
          </div>

          {/* Leader Title & Official Statements */}
          <div style={{ flex: '1 1 280px', textAlign: 'left' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '0.4rem',
              }}
            >
              <span
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '6px',
                  letterSpacing: '0.4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <ShieldCheck size={14} /> {t.editorTitle}
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(234, 179, 8, 0.15)',
                  border: '1px solid #eab308',
                  color: '#fde047',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '6px',
                }}
              >
                NIRBHID MEDIA NETWORK
              </span>
            </div>

            <h2
              style={{
                fontSize: '1.85rem',
                fontWeight: 900,
                color: '#f8fafc',
                margin: '0.25rem 0 0.4rem 0',
                fontFamily: 'var(--font-brand, sans-serif)',
                letterSpacing: '0.3px',
                lineHeight: 1.2,
              }}
            >
              {t.editorName}
            </h2>

            <p
              style={{
                margin: '0 0 0.5rem 0',
                fontSize: '0.95rem',
                color: '#cbd5e1',
                fontStyle: 'italic',
                lineHeight: 1.5,
              }}
            >
              {t.editorQuote}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.8rem',
                color: '#94a3b8',
              }}
            >
              <span>📍 {t.editorOffice}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Direct Contact CTAs */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            minWidth: '220px',
            margin: '0 auto',
          }}
        >
          <a
            href="tel:9922299027"
            className="btn"
            style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '0.75rem 1.4rem',
              fontWeight: 800,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              borderRadius: 'var(--radius-md, 8px)',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)',
              transition: 'transform 0.15s ease',
            }}
          >
            <Phone size={18} /> {t.editorPhone}
          </a>

          <a
            href="https://wa.me/919922299027?text=नमस्कार%20राहुल%20सर,%20मला%20बातमी/जाहिरात%20संदर्भात%20बोलायचे%20आहे."
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              backgroundColor: '#16a34a',
              color: '#ffffff',
              padding: '0.75rem 1.4rem',
              fontWeight: 800,
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              borderRadius: 'var(--radius-md, 8px)',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)',
              transition: 'transform 0.15s ease',
            }}
          >
            <MessageSquare size={18} /> WhatsApp Contact
          </a>
        </div>
      </div>
    </section>
  );
};
