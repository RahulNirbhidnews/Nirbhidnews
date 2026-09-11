import React, { useState } from 'react';
import { Share2, Check, Copy, Instagram, Youtube, Twitter, Facebook, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface SocialShareBarProps {
  title: string;
  url?: string;
  videoUrl?: string;
  className?: string;
}

export const SocialShareBar: React.FC<SocialShareBarProps> = ({
  title,
  url,
  videoUrl,
  className = '',
}) => {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [instaNotice, setInstaNotice] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleInstagramClick = async () => {
    try {
      await navigator.clipboard.writeText(`${title} - ${shareUrl}`);
      setInstaNotice(true);
      setTimeout(() => setInstaNotice(false), 3500);
    } catch {
      // ignore
    }
  };

  const handleShareClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isPopup: boolean) => {
    const isMobileDevice =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent));

    // On mobile devices, let the browser naturally open target="_blank" or native app without popup blocker issues
    if (isMobileDevice) {
      return;
    }

    if (isPopup && typeof window !== 'undefined') {
      try {
        const width = 640;
        const height = 580;
        const left = Math.max(0, (window.innerWidth - width) / 2 + (window.screenX || 0));
        const top = Math.max(0, (window.innerHeight - height) / 2 + (window.screenY || 0));
        const popup = window.open(
          href,
          'socialShareDialog',
          `toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${width},height=${height},top=${top},left=${left}`
        );
        if (popup && !popup.closed) {
          e.preventDefault();
          popup.focus();
        }
      } catch {
        // Fallback to normal anchor click
      }
    }
  };

  // Determine YouTube target: attached video or channel broadcast
  const targetYouTubeUrl = videoUrl
    ? videoUrl
    : `https://www.youtube.com/results?search_query=Nirbhid+News+${encodedTitle}`;

  const shareLinks = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: '#1877F2',
      bg: '#dbeafe',
      label: 'Facebook',
      icon: <Facebook size={14} />,
      popup: true,
      onClick: undefined,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/',
      color: '#E1306C',
      bg: '#fce7f3',
      label: 'Instagram',
      icon: <Instagram size={14} />,
      popup: false,
      onClick: handleInstagramClick,
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: '#0f172a',
      bg: '#f1f5f9',
      label: 'X',
      icon: <Twitter size={14} />,
      popup: true,
      onClick: undefined,
    },
    {
      name: 'YouTube',
      href: targetYouTubeUrl,
      color: '#dc2626',
      bg: '#fee2e2',
      label: 'YouTube',
      icon: <Youtube size={14} />,
      popup: false,
      onClick: undefined,
    },
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: '#16a34a',
      bg: '#dcfce7',
      label: 'WhatsApp',
      icon: <span>💬</span>,
      popup: false,
      onClick: undefined,
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: '#0284c7',
      bg: '#e0f2fe',
      label: 'Telegram',
      icon: <Send size={13} />,
      popup: false,
      onClick: undefined,
    },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <div
        className={`social-share-bar ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          padding: '0.75rem 0',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: 'var(--color-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginRight: '0.35rem',
          }}
        >
          <Share2 size={16} color="var(--color-primary)" /> {t.share}:
        </span>

        {shareLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (item.onClick) {
                item.onClick();
              }
              handleShareClick(e, item.href, item.popup);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: item.bg,
              color: item.color,
              fontSize: '0.8125rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'transform 0.15s ease, opacity 0.15s ease',
              cursor: 'pointer',
            }}
            className="share-button"
            title={`Share on ${item.name}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}

        <button
          type="button"
          onClick={handleCopyLink}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: copied ? '#dcfce7' : '#f8fafc',
            border: '1px solid #cbd5e1',
            color: copied ? '#15803d' : '#475569',
            fontSize: '0.8125rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title={t.copyLink}
        >
          {copied ? (
            <>
              <Check size={14} color="#15803d" /> {t.linkCopied}
            </>
          ) : (
            <>
              <Copy size={14} /> {t.copyLink}
            </>
          )}
        </button>
      </div>

      {/* Instagram Copy Toast Notice */}
      {instaNotice && (
        <div
          style={{
            position: 'absolute',
            top: '-42px',
            left: '0',
            backgroundColor: '#831843',
            color: '#ffffff',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            zIndex: 10,
            animation: 'slideUpPopup 0.2s ease',
          }}
        >
          <Instagram size={13} color="#f472b6" />
          <span>
            {language === 'mr'
              ? 'बातमीची लिंक कॉपी झाली! Instagram Story किंवा Post मध्ये पेस्ट करा.'
              : language === 'hi'
              ? 'खबर का लिंक कॉपी हो गया! Instagram Story या Post में पेस्ट करें।'
              : 'Article link copied! Paste in your Instagram Story or Post.'}
          </span>
        </div>
      )}
    </div>
  );
};
