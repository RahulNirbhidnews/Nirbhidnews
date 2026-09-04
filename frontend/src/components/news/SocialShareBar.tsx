import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

interface SocialShareBarProps {
  title: string;
  url?: string;
  className?: string;
}

export const SocialShareBar: React.FC<SocialShareBarProps> = ({
  title,
  url,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: '#25D366',
      bg: '#dcfce7',
      label: 'WhatsApp',
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: '#0f172a',
      bg: '#f1f5f9',
      label: 'X',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: '#1877F2',
      bg: '#dbeafe',
      label: 'Facebook',
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: '#0088cc',
      bg: '#e0f2fe',
      label: 'Telegram',
    },
  ];

  return (
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
          marginRight: '0.5rem',
        }}
      >
        <Share2 size={16} color="var(--color-primary)" /> शेअर करा:
      </span>

      {shareLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.4rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: item.bg,
            color: item.color,
            fontSize: '0.8125rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'transform 0.15s ease, opacity 0.15s ease',
          }}
          className="share-button"
        >
          {item.label}
        </a>
      ))}

      <button
        type="button"
        onClick={handleCopyLink}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.4rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: copied ? '#dcfce7' : '#f8fafc',
          border: '1px solid #cbd5e1',
          color: copied ? '#15803d' : '#475569',
          fontSize: '0.8125rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check size={14} color="#15803d" /> लिंक कॉपी झाली!
          </>
        ) : (
          <>
            <Copy size={14} /> लिंक कॉपी
          </>
        )}
      </button>
    </div>
  );
};
