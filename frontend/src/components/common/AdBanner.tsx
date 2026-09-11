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
      className={`ad-banner-text-slot ${isSidebar ? 'is-sidebar' : ''} ${className}`}
      style={style}
    >
      {/* Background Accent Radial Light */}
      <div className="ad-banner-radial-light" />

      <div className="ad-banner-content-wrap">
        <div className="ad-banner-icon-box">
          <Megaphone size={24} color="#f87171" />
        </div>

        <div className="ad-banner-text-info">
          <div className="ad-banner-tags-row">
            <span className="ad-banner-tag-badge">
              <Sparkles size={11} color="#fef08a" /> {t.adSpaceAvailable}
            </span>
            <span className="ad-banner-leader-badge">
              <Award size={12} /> {t.adContactLeader}: {t.editorName}
            </span>
          </div>

          <h3 className="ad-banner-title">
            {t.adSpaceDesc}
          </h3>
          <p className="ad-banner-subtitle">
            {t.editorTitle}: <strong>{t.editorName}</strong> | 📞 {t.editorPhone}
          </p>
        </div>
      </div>

      <div className="ad-banner-actions-wrap">
        <a
          href="tel:9922299027"
          className="ad-banner-btn-phone"
        >
          <Phone size={15} /> {t.editorPhone}
        </a>

        <a
          href={`https://wa.me/919922299027?text=नमस्कार%20राहुल%20सर,%20मला%20निर्भीड%20न्यूजवर%20जाहिरात%20द्यायची%20आहे.`}
          target="_blank"
          rel="noopener noreferrer"
          className="ad-banner-btn-whatsapp"
        >
          <MessageSquare size={15} /> {t.bookAdWhatsApp}
        </a>
      </div>
    </div>
  );
};
