import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Megaphone, Phone, MessageSquare, Sparkles, Award } from 'lucide-react';
import { adsApi, Advertisement } from '../../api/ads';
import { useLanguage } from '../../context/LanguageContext';
import { resolveMediaUrl } from '../../utils/mediaUrl';

interface AdBannerProps {
  placement?: 'top_header' | 'sidebar' | 'in_article' | 'footer_banner' | string;
  type?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  placement: propPlacement,
  type,
  className = '',
  style,
}) => {
  const { t } = useLanguage();
  const placement =
    propPlacement ||
    (type === 'leaderboard'
      ? 'top_header'
      : type === 'inline'
      ? 'in_article'
      : type || 'sidebar');

  const { data: ads } = useQuery({
    queryKey: ['public-ads', placement],
    queryFn: () => adsApi.getPublicAds(placement),
    staleTime: 60 * 1000,
  });

  const activeAd = ads && ads.length > 0 ? ads[0] : null;

  const handleAdClick = (ad: Advertisement) => {
    if (ad.id) {
      adsApi.trackAdClick(ad.id).catch(() => {});
    }
  };

  const isSidebar = placement === 'sidebar';

  // If a sponsor image ad is explicitly uploaded, display it with clean text metadata
  if (activeAd && activeAd.image_url) {
    return (
      <div
        className={`ad-banner-container ${className}`}
        style={{
          width: '100%',
          margin: '1.25rem 0',
          position: 'relative',
          borderRadius: 'var(--radius-md, 8px)',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid var(--color-border)',
          backgroundColor: '#0f172a',
          ...style,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '6px',
            right: '8px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: '#cbd5e1',
            fontSize: '0.65rem',
            padding: '2px 6px',
            borderRadius: '4px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            zIndex: 2,
          }}
        >
          Sponsored
        </div>

        <a
          href={activeAd.target_url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleAdClick(activeAd)}
          style={{ display: 'block', width: '100%', textDecoration: 'none' }}
        >
          <img
            src={resolveMediaUrl(activeAd.image_url)}
            alt={activeAd.title}
            style={{
              width: '100%',
              maxHeight:
                placement === 'top_header'
                  ? '130px'
                  : placement === 'sidebar'
                  ? '280px'
                  : '200px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </a>
      </div>
    );
  }

  // Pure High-Impact Text-Driven Ad Space Announcement Banner
  return (
    <div
      className={`ad-banner-text-slot ${className}`}
      style={{
        width: '100%',
        margin: '1.25rem 0',
        padding: isSidebar ? '1.5rem 1.25rem' : '1.25rem 1.75rem',
        borderRadius: 'var(--radius-md, 10px)',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #172554 100%)',
        border: '1.5px solid rgba(234, 179, 8, 0.35)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: isSidebar ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.25rem',
        boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Background Accent Radial Light */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <div
          style={{
            width: isSidebar ? '48px' : '52px',
            height: isSidebar ? '48px' : '52px',
            borderRadius: '12px',
            backgroundColor: 'rgba(220, 38, 38, 0.2)',
            border: '1px solid rgba(220, 38, 38, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 0 15px rgba(220, 38, 38, 0.3)',
          }}
        >
          <Megaphone size={24} color="#f87171" />
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginBottom: '0.25rem',
            }}
          >
            <span
              style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <Sparkles size={11} color="#fef08a" /> {t.adSpaceAvailable}
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                color: '#facc15',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <Award size={12} /> {t.adContactLeader}: {t.editorName}
            </span>
          </div>

          <h3
            style={{
              margin: '0 0 0.25rem 0',
              fontSize: isSidebar ? '1rem' : '1.1rem',
              fontWeight: 800,
              color: '#f8fafc',
              lineHeight: 1.3,
            }}
          >
            {t.adSpaceDesc}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: '0.825rem',
              color: '#94a3b8',
            }}
          >
            {t.editorTitle}: <strong>{t.editorName}</strong> | 📞 {t.editorPhone}
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '0.6rem',
          width: isSidebar ? '100%' : 'auto',
          flexShrink: 0,
          flexWrap: 'wrap',
        }}
      >
        <a
          href="tel:9922299027"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            backgroundColor: '#dc2626',
            color: '#ffffff',
            padding: '0.55rem 1rem',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 800,
            textDecoration: 'none',
            flex: isSidebar ? 1 : 'none',
            boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)',
          }}
        >
          <Phone size={15} /> {t.editorPhone}
        </a>

        <a
          href={`https://wa.me/919922299027?text=नमस्कार%20राहुल%20सर,%20मला%20निर्भीड%20न्यूजवर%20जाहिरात%20द्यायची%20आहे.`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            backgroundColor: '#16a34a',
            color: '#ffffff',
            padding: '0.55rem 1rem',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontWeight: 800,
            textDecoration: 'none',
            flex: isSidebar ? 1 : 'none',
            boxShadow: '0 2px 8px rgba(22, 163, 74, 0.3)',
          }}
        >
          <MessageSquare size={15} /> {t.bookAdWhatsApp}
        </a>
      </div>
    </div>
  );
};
