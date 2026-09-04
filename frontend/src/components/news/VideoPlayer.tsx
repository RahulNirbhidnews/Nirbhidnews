import React from 'react';
import { Film } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  title?: string;
  poster?: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  title,
  poster,
  className = '',
}) => {
  if (!url) return null;

  const trimmedUrl = url.trim();

  // Helper to extract YouTube embed URL
  const getYouTubeEmbedUrl = (rawUrl: string): string | null => {
    // Check youtube.com/watch?v=ID or youtube.com/embed/ID or youtu.be/ID
    const ytMatch = rawUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`;
    }
    return null;
  };

  // Helper to extract Vimeo embed URL
  const getVimeoEmbedUrl = (rawUrl: string): string | null => {
    const vimeoMatch = rawUrl.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/i);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    return null;
  };

  const youtubeEmbed = getYouTubeEmbedUrl(trimmedUrl);
  const vimeoEmbed = getVimeoEmbedUrl(trimmedUrl);

  // If it's a YouTube video
  if (youtubeEmbed) {
    return (
      <div
        className={`video-player-wrapper ${className}`}
        style={{
          position: 'relative',
          paddingBottom: '56.25%', // 16:9 Aspect Ratio
          height: 0,
          overflow: 'hidden',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#000',
          boxShadow: 'var(--shadow-md)',
          margin: '1.5rem 0',
        }}
      >
        <iframe
          src={youtubeEmbed}
          title={title || 'Video Report'}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  // If it's a Vimeo video
  if (vimeoEmbed) {
    return (
      <div
        className={`video-player-wrapper ${className}`}
        style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          overflow: 'hidden',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#000',
          boxShadow: 'var(--shadow-md)',
          margin: '1.5rem 0',
        }}
      >
        <iframe
          src={vimeoEmbed}
          title={title || 'Video Report'}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Otherwise, standard HTML5 video tag (for uploaded MP4, WebM, storage URLs)
  const isBackendRelative = trimmedUrl.startsWith('/static/');
  const fullVideoSrc = isBackendRelative
    ? `${import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8000'}${trimmedUrl}`
    : trimmedUrl;

  return (
    <div
      className={`video-player-wrapper ${className}`}
      style={{
        margin: '1.5rem 0',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        backgroundColor: '#0f172a',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 1rem',
          backgroundColor: '#1e293b',
          color: '#e2e8f0',
          fontSize: '0.8125rem',
          fontWeight: 600,
        }}
      >
        <Film size={16} color="var(--color-primary)" />
        <span>{title || 'Video Bulletin / बातमी व्हिडिओ'}</span>
      </div>

      <video
        src={fullVideoSrc}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        style={{
          width: '100%',
          maxHeight: '520px',
          display: 'block',
          backgroundColor: '#000',
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
