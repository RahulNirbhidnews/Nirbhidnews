import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Pause, RotateCcw, Activity } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AIAudioReaderProps {
  textToRead: string;
  title: string;
}

export const AIAudioReader: React.FC<AIAudioReaderProps> = ({
  textToRead,
  title,
}) => {
  const { language, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const cleanTextForSpeech = (raw: string): string => {
    return `${title}. ${raw.replace(/<\/?[^>]+(>|$)/g, ' ').replace(/[#*`_>\[\]\(\)]/g, ' ').replace(/\s+/g, ' ')}`;
  };

  const handleTogglePlay = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on your browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        window.speechSynthesis.cancel();
        const text = cleanTextForSpeech(textToRead);
        const utterance = new SpeechSynthesisUtterance(text);

        const langMap: Record<string, string> = {
          mr: 'mr-IN',
          hi: 'hi-IN',
          en: 'en-IN',
        };
        utterance.lang = langMap[language] || 'mr-IN';
        utterance.rate = speed;

        utterance.onend = () => {
          setIsPlaying(false);
        };
        utterance.onerror = () => {
          setIsPlaying(false);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (isPlaying && utteranceRef.current) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setTimeout(() => {
        handleTogglePlay();
      }, 100);
    }
  };

  const handleRestart = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setTimeout(() => {
        handleTogglePlay();
      }, 100);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 'var(--radius-md)',
        padding: '0.75rem 1.25rem',
        margin: '1rem 0 1.5rem 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={handleTogglePlay}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: isPlaying ? '#dc2626' : 'var(--color-primary)',
            color: '#ffffff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease',
          }}
          aria-label={isPlaying ? 'Pause Audio' : 'Play Audio'}
        >
          {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" style={{ marginLeft: '2px' }} />}
        </button>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
            <Volume2 size={15} color="var(--color-primary)" />
            <span>{t.aiListenNews}</span>
            {isPlaying && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: '#16a34a', fontSize: '0.75rem' }}>
                <Activity size={14} className="spinner" /> {t.aiAudioPlaying}
              </span>
            )}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            AI Voice Synthesis • {language === 'mr' ? 'मराठी आवाज' : language === 'hi' ? 'हिंदी आवाज़' : 'English Audio'}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          type="button"
          onClick={handleRestart}
          style={{
            background: 'transparent',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            color: '#475569',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
          title="Restart from beginning"
        >
          <RotateCcw size={12} />
        </button>

        {/* Speed Selector */}
        <div style={{ display: 'flex', gap: '2px', backgroundColor: '#e2e8f0', borderRadius: '4px', padding: '2px' }}>
          {[1.0, 1.25, 1.5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleSpeedChange(s)}
              style={{
                border: 'none',
                borderRadius: '3px',
                padding: '0.2rem 0.45rem',
                fontSize: '0.7rem',
                fontWeight: speed === s ? 700 : 500,
                backgroundColor: speed === s ? '#ffffff' : 'transparent',
                color: speed === s ? 'var(--color-secondary)' : '#64748b',
                cursor: 'pointer',
              }}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
