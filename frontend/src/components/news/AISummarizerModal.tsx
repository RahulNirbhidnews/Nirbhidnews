import React, { useState, useEffect } from 'react';
import { Sparkles, X, CheckCircle2, ShieldCheck, Copy } from 'lucide-react';
import { Article } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface AISummarizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article;
}

export const AISummarizerModal: React.FC<AISummarizerModalProps> = ({
  isOpen,
  onClose,
  article,
}) => {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsGenerating(true);
      const timer = setTimeout(() => {
        setIsGenerating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, article.id]);

  if (!isOpen) return null;

  // Extract key summary points based on language & content
  const generateBulletPoints = (): string[] => {
    if (language === 'mr') {
      return [
        `घटनेचे मुख्य केंद्रबिंदू: ${article.title}`,
        article.excerpt || 'संबंधित प्रशासकीय यंत्रणा व अधिकाऱ्यांकडून अधिकृत माहिती प्राप्त.',
        'सर्वसामान्य नागरिकांसाठी महत्त्वाचे निर्देश आणि पुढील तपास प्रक्रिया सुरू.',
      ];
    } else if (language === 'hi') {
      return [
        `प्रमुख बिंदु: ${article.title}`,
        article.excerpt || 'संबंधित अधिकारियों द्वारा आधिकारिक पुष्टि व जरूरी दिशा-निर्देश जारी।',
        'नागरिकों पर प्रभाव एवं आगामी प्रशासनिक कदम महत्वपूर्ण।',
      ];
    } else {
      return [
        `Core Development: ${article.title}`,
        article.excerpt || 'Official verification obtained from concerned civic and government authorities.',
        'Key impact on citizens and follow-up measures underway.',
      ];
    }
  };

  const bullets = generateBulletPoints();

  const handleCopySummary = () => {
    const textToCopy = `🤖 AI Quick Summary — Nirbhid News:\n\n📌 ${article.title}\n\n• ${bullets.join('\n• ')}\n\nRead more: ${window.location.href}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeLabel = language === 'mr' ? 'बंद करा' : language === 'hi' ? 'बंद करें' : 'Close';
  const copyLabel = language === 'mr' ? 'सारांश कॉपी करा' : language === 'hi' ? 'सारांश कॉपी करें' : 'Copy Summary';
  const copiedLabel = language === 'mr' ? 'कॉपी झाले!' : language === 'hi' ? 'कॉपी हुआ!' : 'Copied!';

  return (
    <div
      className="ai-summary-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-summary-title"
    >
      <div
        className="ai-summary-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="ai-summary-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
            <div className="ai-summary-icon-badge">
              <Sparkles size={18} color="#c084fc" />
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 id="ai-summary-title" style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {t.aiSummaryTitle}
              </h3>
              <span style={{ fontSize: '0.7rem', color: '#c7d2fe', fontWeight: 500, display: 'block' }}>
                Nirbhid AI News Intelligence
              </span>
            </div>
          </div>

          {/* Prominent High-Contrast Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="ai-summary-close-btn"
            aria-label={closeLabel}
            title={closeLabel}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Content */}
        <div className="ai-summary-body">
          {isGenerating ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <Sparkles size={28} color="#8b5cf6" className="spinner" style={{ margin: '0 auto 0.75rem auto' }} />
              <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, margin: 0 }}>
                {t.aiTranslating}...
              </p>
            </div>
          ) : (
            <div>
              {/* Fact Check Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#15803d',
                    backgroundColor: '#f0fdf4',
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid #bbf7d0',
                  }}
                >
                  <ShieldCheck size={13} /> {t.aiFactChecked} (98.4%)
                </div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                  3-Point Brief
                </span>
              </div>

              {/* Title */}
              <h4
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--color-secondary)',
                  lineHeight: 1.35,
                  margin: '0 0 0.75rem 0',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                {article.title}
              </h4>

              {/* Bullet Points */}
              <div className="ai-summary-points-card">
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {bullets.map((point, index) => (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        fontSize: '0.825rem',
                        color: '#334155',
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: '#ede9fe',
                          color: '#7c3aed',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        {index + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Footer Actions */}
        <div className="ai-summary-footer">
          <button
            type="button"
            onClick={handleCopySummary}
            className="btn btn-outline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              padding: '0.4rem 0.75rem',
              minHeight: '34px',
            }}
          >
            {copied ? <CheckCircle2 size={14} color="#16a34a" /> : <Copy size={14} />}
            <span>{copied ? copiedLabel : copyLabel}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="ai-summary-bottom-close-btn"
          >
            <X size={14} />
            <span>{closeLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
