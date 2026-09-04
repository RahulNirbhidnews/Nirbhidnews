import React, { useState } from 'react';
import {
  BookOpen,
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  FileText,
  Image,
  Video,
  Sparkles,
  Send,
  PlayCircle
} from 'lucide-react';

interface AdminTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminTutorialModal: React.FC<AdminTutorialModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      id: 'create',
      title: '1. Create & Format News',
      subtitle: 'Headlines, Auto-Slug & Language',
      icon: <FileText size={24} color="#dc2626" />,
      content: (
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.75rem' }}>
            ✍️ Writing Headlines and Categorizing
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
            Nirbhid News is built for rapid editorial publishing. You can write in <strong>Marathi (मराठी)</strong>, <strong>English</strong>, or <strong>Hindi (हिंदी)</strong>.
          </p>

          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#334155', lineHeight: 1.8 }}>
              <li><strong>Auto Slug Generator:</strong> As you type the headline, a clean URL slug is generated automatically. You can also customize it manually.</li>
              <li><strong>Category Selection:</strong> Assign your story to relevant beats (Maharashtra, Mumbai Metro, Thane, Politics, Crime, Business, Entertainment, etc.).</li>
              <li><strong>Short Excerpt:</strong> Add a 1–2 sentence summary that appears on news cards and search engines.</li>
            </ul>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: '#eff6ff', borderRadius: '6px', borderLeft: '4px solid #3b82f6', fontSize: '0.825rem', color: '#1e40af' }}>
            💡 <strong>Pro Tip:</strong> Keep headlines catchy, factual, and concise for maximum reader engagement across desktop and mobile.
          </div>
        </div>
      ),
    },
    {
      id: 'media',
      title: '2. Upload Photos & Images',
      subtitle: 'Featured Hero Banners & Inline Images',
      icon: <Image size={24} color="#0284c7" />,
      content: (
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.75rem' }}>
            📸 Managing High-Quality Photos
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
            Articles with compelling visual images receive 4x more reader views.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem' }}>
              <strong style={{ color: '#166534', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Option A: Direct Upload
              </strong>
              <p style={{ fontSize: '0.825rem', color: '#15803d', margin: 0, lineHeight: 1.5 }}>
                Click <strong>"Upload Image"</strong> to upload JPEG, PNG, or WebP files (up to 5 MB) directly to cloud storage.
              </p>
            </div>

            <div style={{ backgroundColor: '#fdf4ff', border: '1px solid #f5d0fe', borderRadius: '8px', padding: '1rem' }}>
              <strong style={{ color: '#86198f', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Option B: Image URL
              </strong>
              <p style={{ fontSize: '0.825rem', color: '#a21caf', margin: 0, lineHeight: 1.5 }}>
                Paste any external public photo URL (e.g. Unsplash, Reuters, or Press Release image link) for instant preview.
              </p>
            </div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: '#fefce8', borderRadius: '6px', borderLeft: '4px solid #eab308', fontSize: '0.825rem', color: '#854d0e' }}>
            💡 <strong>Pro Tip:</strong> Use 16:9 landscape aspect ratio photos (e.g., 1200x675 px) for ideal layout appearance across the hero and card grid.
          </div>
        </div>
      ),
    },
    {
      id: 'video',
      title: '3. Video News & Bulletins',
      subtitle: 'MP4 Uploads & YouTube Video News',
      icon: <Video size={24} color="#7c3aed" />,
      content: (
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.75rem' }}>
            🎥 Uploading & Embedding Video Bulletins
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
            Video news brings digital broadcast reporting directly to your readers with native playback and YouTube embedding.
          </p>

          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#334155', lineHeight: 1.8 }}>
              <li><strong>Direct Video Upload:</strong> Upload MP4, WebM, or MOV video clips (up to 50 MB) directly from your device.</li>
              <li><strong>YouTube / Vimeo Embed:</strong> Simply paste any YouTube link (e.g. <code>https://youtube.com/watch?v=...</code> or <code>https://youtu.be/...</code>) into the Video URL field.</li>
              <li><strong>Video Badge on News Cards:</strong> Articles with video automatically display a sleek red <PlayCircle size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> video badge for readers.</li>
            </ul>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: '#fdf2f8', borderRadius: '6px', borderLeft: '4px solid #ec4899', fontSize: '0.825rem', color: '#9d174d' }}>
            💡 <strong>Pro Tip:</strong> You can attach both a featured cover photo AND a video bulletin; the video will play prominently inside the article reader!
          </div>
        </div>
      ),
    },
    {
      id: 'templates',
      title: '4. 1-Click News Templates',
      subtitle: 'Rapid Layout Drafting in Seconds',
      icon: <Sparkles size={24} color="#eab308" />,
      content: (
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.75rem' }}>
            ⚡ Fast Drafting with Built-in Templates
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
            Save time formatting articles with 1-click editorial layout templates in the editor toolbar:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#dc2626' }}>🚨 Breaking News Alert</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Urgent bulletin layout with prominent alert box & key facts.</div>
            </div>
            <div style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0284c7' }}>📰 Standard News Report</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Full story with headline, blockquote, and bullet points.</div>
            </div>
            <div style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#7c3aed' }}>🎙️ Press / Interview</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Question & Answer layout with highlighted speaker quotes.</div>
            </div>
            <div style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#059669' }}>🎥 Video News Bulletin</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Broadcast summary layout with video highlights.</div>
            </div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '6px', borderLeft: '4px solid #22c55e', fontSize: '0.825rem', color: '#15803d' }}>
            💡 <strong>Pro Tip:</strong> Click the <strong>"Preview"</strong> tab at any time to verify how your markdown text, quotes, and images will look before publishing.
          </div>
        </div>
      ),
    },
    {
      id: 'publish',
      title: '5. Publishing & Breaking News',
      subtitle: 'Live Control, Tickers & Featured Hero',
      icon: <Send size={24} color="#16a34a" />,
      content: (
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-secondary)', marginBottom: '0.75rem' }}>
            🚀 Going Live & Setting Flags
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
            Control exactly where and how your story appears across the Nirbhid News platform.
          </p>

          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <strong style={{ color: '#dc2626' }}>🔥 Breaking News Toggle:</strong>
              <div style={{ fontSize: '0.825rem', color: '#475569' }}>
                Immediately flashes the headline on the top ticker and triggers the real-time breaking news alert popup for active readers.
              </div>
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <strong style={{ color: '#2563eb' }}>⭐ Featured Story Toggle:</strong>
              <div style={{ fontSize: '0.825rem', color: '#475569' }}>
                Positions the story as the prominent lead banner in the Hero section at the very top of the homepage.
              </div>
            </div>

            <div>
              <strong style={{ color: '#16a34a' }}>🟢 Status Control (Draft vs Published):</strong>
              <div style={{ fontSize: '0.825rem', color: '#475569' }}>
                Keep articles in <em>Draft</em> mode while researching, and switch to <em>Published</em> to make them publicly visible immediately.
              </div>
            </div>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '6px', borderLeft: '4px solid #16a34a', fontSize: '0.825rem', color: '#14532d', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} color="#16a34a" />
            <span>You are now ready to publish fearless, unfiltered journalism!</span>
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
          maxWidth: '720px',
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
            padding: '1.25rem 1.5rem',
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
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(220, 38, 38, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BookOpen size={20} color="#ef4444" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'white' }}>
                Nirbhid News CMS — Editorial Guide & Tutorial
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                Learn how to create, format, upload videos & publish news stories effortlessly
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '4px',
            }}
            aria-label="Close tutorial"
          >
            <X size={20} />
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
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStep(index)}
                style={{
                  flex: 1,
                  minWidth: '120px',
                  padding: '0.75rem 0.5rem',
                  border: 'none',
                  borderBottom: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : '#64748b',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content Body */}
        <div style={{ padding: '1.75rem 1.5rem', overflowY: 'auto', flex: 1 }}>
          {currentStepData.content}
        </div>

        {/* Modal Footer Controls */}
        <div
          style={{
            padding: '1rem 1.5rem',
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
            }}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>
            Step {currentStep + 1} of {steps.length}
          </div>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              Next Step <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#16a34a' }}
            >
              <CheckCircle2 size={16} /> Start Creating News
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
