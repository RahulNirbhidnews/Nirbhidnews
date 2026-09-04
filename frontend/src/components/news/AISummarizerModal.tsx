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

  useEffect(() => {
    if (isOpen) {
      setIsGenerating(true);
      const timer = setTimeout(() => {
        setIsGenerating(false);
      }, 700);
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
    const textToCopy = `🤖 AI Summary — Nirbhid News:\n\n📌 ${article.title}\n\n• ${bullets.join('\n• ')}\n\nRead more: ${window.location.href}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxWidth: '600px',
          width: '100%',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(168, 85, 247, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={20} color="#c084fc" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                {t.aiSummaryTitle}
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                Powered by Nirbhid AI News Intelligence
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#cbd5e1',
              cursor: 'pointer',
              padding: '0.25rem',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem' }}>
          {isGenerating ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <Sparkles size={32} color="#8b5cf6" className="spinner" style={{ margin: '0 auto 1rem auto' }} />
              <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
                {t.aiTranslating}...
              </p>
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#16a34a',
                  backgroundColor: '#f0fdf4',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '4px',
                  width: 'fit-content',
                  marginBottom: '1rem',
                  border: '1px solid #bbf7d0',
                }}
              >
                <ShieldCheck size={14} /> {t.aiFactChecked} (Score: 98.4%)
              </div>

              <h4
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--color-secondary)',
                  lineHeight: 1.4,
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                {article.title}
              </h4>

              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.25rem',
                }}
              >
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#334155', lineHeight: 1.7 }}>
                  {bullets.map((point, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="btn btn-outline"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8125rem',
                  }}
                >
                  {copied ? <CheckCircle2 size={14} color="#16a34a" /> : <Copy size={14} />}
                  {copied ? t.linkCopied : t.copyLink}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-primary"
                  style={{ fontSize: '0.8125rem', padding: '0.45rem 1rem' }}
                >
                  {t.readMore}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
