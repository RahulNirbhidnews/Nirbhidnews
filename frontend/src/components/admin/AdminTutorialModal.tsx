import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Video as VideoIcon,
  Sparkles,
  Send,
  Radio,
  Star,
  Check,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AdminTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminTutorialModal: React.FC<AdminTutorialModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      id: 'create',
      title: '1. Create & Format Headlines',
      marathiTitle: '१. बातमी शीर्षक व विभाग',
      icon: <FileText size={20} color="#ef4444" />,
      badge: 'Writing & SEO',
      headline: 'Catchy Headlines, Auto-Slug & Beats',
      marathiHeadline: 'आकर्षक मथळे, ऑटो-स्लग व बातमी विभाग',
      content: (
        <div>
          <p style={{ fontSize: '0.9375rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
            Nirbhid News CMS allows reporters and editors to publish breaking stories rapidly with built-in SEO and multilingual support.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.875rem', color: '#0f172a', marginBottom: '0.35rem' }}>
                <Zap size={16} color="#ef4444" /> Auto-Slug Generator
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                As you type a Marathi or Hindi headline, a clean, short English web URL slug is automatically created (e.g. <code>maharashtra-news-dc5716</code>) so links are clean on WhatsApp.
              </p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.875rem', color: '#0f172a', marginBottom: '0.35rem' }}>
                📁 Category Beats
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                Assign stories to Maharashtra, Mumbai Metro, Thane, Politics, Crime, Business, Entertainment, Sports, or World news.
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.1rem' }}>💡</span>
            <div style={{ fontSize: '0.8125rem', color: '#1e40af', lineHeight: 1.5 }}>
              <strong>Editor Pro-Tip:</strong> Always add a 1–2 sentence summary in the <strong>Excerpt</strong> box to boost Google search clicks and WhatsApp link previews.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'media',
      title: '2. High-Res Photos & 16:9 Cover',
      marathiTitle: '२. उच्च दर्जाचे फोटो व कव्हर',
      icon: <ImageIcon size={20} color="#0284c7" />,
      badge: 'Media Assets',
      headline: 'Upload High-Quality Cover Images',
      marathiHeadline: '१६:९ कव्हर फोटो व मीडिया अपलोड',
      content: (
        <div>
          <p style={{ fontSize: '0.9375rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
            Articles with visually compelling photos receive significantly higher reader engagement and social shares.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#166534', marginBottom: '0.35rem' }}>
                📁 Direct File Upload
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#15803d', margin: 0, lineHeight: 1.5 }}>
                Click <strong>"Upload Image"</strong> to upload JPG, PNG, or WebP photos from your device directly to the server.
              </p>
            </div>

            <div style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#7e22ce', marginBottom: '0.35rem' }}>
                🔗 External Image URL
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#6b21a8', margin: 0, lineHeight: 1.5 }}>
                Paste any external press release or news image link to display an instant preview in the cover slot.
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: '#fefce8', border: '1px solid #fef08a', borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.1rem' }}>📐</span>
            <div style={{ fontSize: '0.8125rem', color: '#854d0e', lineHeight: 1.5 }}>
              <strong>Best Dimension:</strong> Use standard <strong>16:9 landscape aspect ratio</strong> (e.g. 1200x675 px) for optimal framing across desktop and mobile screens.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'video',
      title: '3. Video Bulletins & Broadcasts',
      marathiTitle: '३. व्हिडिओ बातम्या व बुलेटिन',
      icon: <VideoIcon size={20} color="#7c3aed" />,
      badge: 'Digital Video',
      headline: 'Embed YouTube or Upload MP4 Videos',
      marathiHeadline: 'YouTube किंवा MP4 व्हिडिओ बातमी जोडा',
      content: (
        <div>
          <p style={{ fontSize: '0.9375rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
            Transform written articles into multimedia digital broadcasts with embedded video playback.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#dc2626', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <VideoIcon size={16} /> YouTube / Vimeo Embed
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                Paste any YouTube link (e.g. <code>https://youtube.com/watch?v=...</code> or <code>https://youtu.be/...</code>) into the Video URL field.
              </p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0284c7', marginBottom: '0.35rem' }}>
                📹 MP4 File Upload
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                Upload recorded MP4 video clips directly from your mobile phone or camera for native playback.
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🔴</span>
            <div style={{ fontSize: '0.8125rem', color: '#9d174d', lineHeight: 1.5 }}>
              <strong>Video Badge:</strong> Articles with video automatically show a bold red <strong>VIDEO BULLETIN</strong> tag on news feeds to attract viewers.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'templates',
      title: '4. 1-Click AI Formatting & Templates',
      marathiTitle: '४. १-क्लिक फॉरमॅटिंग व भाषांतर',
      icon: <Sparkles size={20} color="#eab308" />,
      badge: 'Smart Tools',
      headline: 'Speed Up Drafting with 1-Click Layouts',
      marathiHeadline: 'एका क्लिकवर रिपोर्ट फॉरमॅटिंग व AI भाषांतर',
      content: (
        <div>
          <p style={{ fontSize: '0.9375rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
            Draft rich, structured news stories in seconds using built-in editorial templates in the toolbar:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ padding: '0.75rem 1rem', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#dc2626' }}>🚨 Breaking Alert Layout</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Urgent news flash with alert callouts and key developments.</div>
            </div>
            <div style={{ padding: '0.75rem 1rem', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0284c7' }}>📰 Ground Report Layout</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Multi-paragraph story with highlights and on-ground analysis.</div>
            </div>
            <div style={{ padding: '0.75rem 1rem', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#7c3aed' }}>🎙️ Press Interview Layout</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Structured Q&A format with speaker quotes.</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🤖</span>
            <div style={{ fontSize: '0.8125rem', color: '#166534', lineHeight: 1.5 }}>
              <strong>AI Auto-Translate:</strong> Click <strong>"🤖 AI भाषांतर / Auto-Translate"</strong> to translate Marathi, English, and Hindi headlines with 1 click.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'publish',
      title: '5. Breaking News Flash & Publishing',
      marathiTitle: '५. ब्रेकिंग अलर्ट व थेट प्रकाशन',
      icon: <Send size={20} color="#16a34a" />,
      badge: 'Live Publishing',
      headline: 'Control Visibility, Tickers & Hero Pinned',
      marathiHeadline: 'ब्रेकिंग टिकर अलर्ट व थेट लाईव्ह प्रकाशन',
      content: (
        <div>
          <p style={{ fontSize: '0.9375rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
            Control how and where your story reaches readers across the portal:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#dc2626', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Radio size={16} /> Breaking News Toggle
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#991b1b', margin: 0, lineHeight: 1.5 }}>
                Immediately flashes the headline on the top live news ticker and triggers the popup notification for readers.
              </p>
            </div>

            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1d4ed8', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Star size={16} color="#eab308" /> Featured Story Toggle
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#1e40af', margin: 0, lineHeight: 1.5 }}>
                Pins the story as the prominent lead banner in the Hero section at the top of the homepage.
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={24} color="#16a34a" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.875rem', color: '#14532d' }}>
                Instant Live Feed Synchronization
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#15803d' }}>
                Clicking <strong>"Publish Story"</strong> immediately saves to the database, updates the public feed, and clears cache across all reader devices!
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
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
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxWidth: '840px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #1e293b',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HelpCircle size={22} color="#ef4444" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                Nirbhid News CMS — Editorial Guide & Walkthrough
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#94a3b8', margin: 0 }}>
                A quick step-by-step master guide on creating, uploading, and publishing news
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#1e293b',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease',
            }}
            aria-label="Close guide"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Navigation Bar */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            overflowX: 'auto',
          }}
        >
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStep(index)}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  padding: '0.85rem 0.75rem',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #dc2626' : '3px solid transparent',
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#dc2626' : isCompleted ? '#334155' : '#64748b',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: '0.78125rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {isCompleted ? <Check size={16} color="#16a34a" /> : step.icon}
                <span>{step.title.split('. ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content Body */}
        <div style={{ padding: '2rem 1.75rem', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.7rem', backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {currentStepData.badge}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0 0 1rem 0' }}>
            {language === 'mr' ? currentStepData.marathiHeadline : currentStepData.headline}
          </h4>

          {currentStepData.content}
        </div>

        {/* Modal Footer Controls */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            backgroundColor: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            className="btn btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              visibility: currentStep === 0 ? 'hidden' : 'visible',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {steps.map((_, idx) => (
              <span
                key={idx}
                style={{
                  width: idx === currentStep ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: idx === currentStep ? '#dc2626' : '#cbd5e1',
                  transition: 'all 0.2s ease',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
              className="btn btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                padding: '0.6rem 1.25rem',
              }}
            >
              Next Step <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="btn btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#16a34a',
                fontSize: '0.875rem',
                fontWeight: 800,
                padding: '0.6rem 1.25rem',
              }}
            >
              <CheckCircle2 size={18} /> Start Creating News
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
