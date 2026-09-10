import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Video as VideoIcon,
  Sparkles,
  Send,
  Radio,
  Flame,
  Star,
  ChevronRight,
  ChevronLeft,
  Tv
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [stepProgress, setStepProgress] = useState(0); // 0 to 100%
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const STEP_DURATION_SEC = 9; // Seconds per chapter

  const steps = [
    {
      id: 'create',
      title: '1. Create & Format Headlines',
      marathiTitle: '१. मुख्य बातमी शीर्षक व श्रेणी',
      duration: '0:45',
      icon: <FileText size={18} color="#ef4444" />,
      videoTimestamp: '00:00',
      description: 'Write catchy headlines, auto-generate clean ASCII slugs, and choose beats (Maharashtra, Mumbai, Politics, Crime).',
      marathiDesc: 'आकर्षक मथळे लिहा, स्वच्छ वेब लिंक (Auto-Slug) तयार करा आणि बातमीचा योग्य विभाग निवडा.',
      interactiveScene: (
        <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e293b', color: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
              Live CMS Editor Simulation
            </span>
            <span style={{ fontSize: '0.75rem', backgroundColor: '#ef4444', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
              AUTO-SLUG ACTIVE
            </span>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '0.75rem', color: '#cbd5e1', display: 'block', marginBottom: '0.25rem' }}>Headline (मथळा):</label>
            <div style={{ backgroundColor: '#1e293b', padding: '0.6rem 0.85rem', borderRadius: '6px', fontSize: '0.9rem', color: '#facc15', fontFamily: 'monospace', border: '1px solid #334155' }}>
              मुंबई-पुणे एक्सप्रेसवेवर नवीन AI-आधारित इंटेलिजेंट ट्रॅफिक सिस्टीम सुरू
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Clean Slug (वेब लिंक):</label>
              <div style={{ backgroundColor: '#1e293b', padding: '0.45rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: '#38bdf8', fontFamily: 'monospace' }}>
                mumbai-pune-expressway-ai-dc5716
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>Category (विभाग):</label>
              <div style={{ backgroundColor: '#1e293b', padding: '0.45rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: '#4ade80' }}>
                📁 Maharashtra (महाराष्ट्र)
              </div>
            </div>
          </div>
        </div>
      ),
      bulletPoints: [
        'Type your headline in Marathi, Hindi, or English — a clean, short English slug is auto-generated.',
        'Choose from 12+ editorial beats (Maharashtra, Mumbai Metro, Thane, Politics, Sports, Crime, Tech).',
        'Add an engaging 1–2 sentence summary for Google Search and WhatsApp preview.',
      ],
    },
    {
      id: 'media',
      title: '2. High-Res Photos & 16:9 Cover',
      marathiTitle: '२. उच्च दर्जाचे फोटो व कव्हर इमेज',
      duration: '0:45',
      icon: <ImageIcon size={18} color="#38bdf8" />,
      videoTimestamp: '00:45',
      description: 'Upload high-resolution 16:9 landscape photographs or paste public media URLs with instant preview.',
      marathiDesc: '१६:९ लँडस्केप आकारातील स्पष्ट फोटो थेट अपलोड करा किंवा वेब लिंक पेस्ट करून इन्स्टंट प्रिव्ह्यू पाहा.',
      interactiveScene: (
        <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e293b', color: '#f8fafc' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div
              style={{
                width: '50%',
                height: '110px',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                border: '2px dashed #0284c7',
                backgroundColor: 'rgba(2, 132, 199, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80"
                alt="Demo Cover"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', bottom: '4px', right: '4px', backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px' }}>
                16:9 Aspect Ratio
              </span>
            </div>
            <div style={{ width: '50%' }}>
              <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, marginBottom: '0.35rem' }}>
                ✓ Upload Media / Drag & Drop
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                Supports JPG, PNG, WebP up to 10MB. Images are automatically optimized and served via cloud CDN for blazing fast speed.
              </p>
            </div>
          </div>
        </div>
      ),
      bulletPoints: [
        'Click "Upload Image" to upload photos from phone or computer directly.',
        'Supports external image URLs (e.g. Unsplash, PTI, Reuters, Government portals).',
        'Featured images display in high definition on both the homepage Hero slider and inside the reader.',
      ],
    },
    {
      id: 'video',
      title: '3. Video Bulletins & Broadcasts',
      marathiTitle: '३. व्हिडिओ बातम्या व डिजिटल बुलेटिन',
      duration: '0:45',
      icon: <VideoIcon size={18} color="#a855f7" />,
      videoTimestamp: '01:30',
      description: 'Attach MP4 video clips or embed YouTube broadcast bulletins with native mobile playback.',
      marathiDesc: 'थेट MP4 व्हिडिओ अपलोड करा किंवा YouTube व्हिडिओ लिंक जोडून डिजिटल बुलेटिन तयार करा.',
      interactiveScene: (
        <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e293b', color: '#f8fafc' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#000',
              height: '110px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #334155',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, opacity: 0.4, backgroundImage: 'linear-gradient(45deg, #1e1b4b, #311042)' }} />
            <div style={{ zIndex: 1, textAlign: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(239, 68, 68, 0.6)' }}>
                <Play size={18} color="#fff" style={{ marginLeft: '2px' }} />
              </div>
              <div style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 700, marginTop: '0.25rem' }}>
                YouTube / MP4 Video News Bulletin
              </div>
            </div>
            <span style={{ position: 'absolute', top: '6px', left: '8px', backgroundColor: '#dc2626', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '3px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Radio size={10} /> VIDEO BULLETIN
            </span>
          </div>
        </div>
      ),
      bulletPoints: [
        'Paste any YouTube URL (e.g. https://youtu.be/...) or upload MP4 video directly.',
        'Articles with video display a bold red Video Bulletin badge on all news feeds.',
        'Mobile readers can watch full-screen video directly inside the article without leaving the site.',
      ],
    },
    {
      id: 'templates',
      title: '4. 1-Click AI Formatting & Translations',
      marathiTitle: '४. १-क्लिक AI फॉरमॅटिंग व ऑटो-ट्रान्सलेट',
      duration: '0:45',
      icon: <Sparkles size={18} color="#eab308" />,
      videoTimestamp: '02:15',
      description: 'Apply instant layouts (Breaking Alert, Ground Report, Interview) and 1-Click AI Translation.',
      marathiDesc: 'एका क्लिकवर ब्रेकिंग अलर्ट, ग्राउंड रिपोर्ट व मुलाखत साचे निवडा आणि AI भाषांतर वापरा.',
      interactiveScene: (
        <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e293b', color: '#f8fafc' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: '#1e293b', borderRadius: '6px', border: '1px solid #dc2626', textAlign: 'center', fontSize: '0.7rem', color: '#f87171', fontWeight: 700 }}>
              🚨 Breaking Alert
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1e293b', borderRadius: '6px', border: '1px solid #0284c7', textAlign: 'center', fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700 }}>
              📰 Ground Report
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: '#1e293b', borderRadius: '6px', border: '1px solid #a855f7', textAlign: 'center', fontSize: '0.7rem', color: '#c084fc', fontWeight: 700 }}>
              🎙️ Press Interview
            </div>
          </div>
          <div style={{ backgroundColor: '#1e1b4b', border: '1px solid #6366f1', borderRadius: '6px', padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: '#c7d2fe', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={14} color="#facc15" /> 1-Click AI Multilingual Auto-Translate
            </span>
            <span style={{ fontSize: '0.7rem', backgroundColor: '#4f46e5', color: '#fff', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700 }}>
              EN / HI / MR
            </span>
          </div>
        </div>
      ),
      bulletPoints: [
        'Click the Quick Template buttons to automatically insert formatted journalistic structures.',
        'Use the built-in AI Auto-Translate tool to instantly localize stories for Marathi, English, and Hindi readers.',
        'Toggle between "Edit" and "Preview" at any moment to see live Markdown formatting before publishing.',
      ],
    },
    {
      id: 'publish',
      title: '5. Breaking News Flash & Live Publishing',
      marathiTitle: '५. ब्रेकिंग न्यूज अलर्ट व थेट प्रकाशन',
      duration: '0:45',
      icon: <Send size={18} color="#22c55e" />,
      videoTimestamp: '03:00',
      description: 'Trigger instant breaking news ticker alerts, pin to Hero banner, and publish live to millions of readers.',
      marathiDesc: 'ब्रेकिंग न्यूज टिकर फ्लॅश करा, हिरो विभागात पिन करा आणि तात्काळ थेट प्रकाशित करा.',
      interactiveScene: (
        <div style={{ backgroundColor: '#0f172a', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e293b', color: '#f8fafc' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ backgroundColor: '#450a0a', border: '1px solid #ef4444', borderRadius: '6px', padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#fca5a5', fontWeight: 700 }}>
                <Flame size={14} color="#ef4444" /> Breaking Alert
              </div>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block', boxShadow: '0 0 8px #ef4444' }} />
            </div>

            <div style={{ backgroundColor: '#172554', border: '1px solid #3b82f6', borderRadius: '6px', padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#93c5fd', fontWeight: 700 }}>
                <Star size={14} color="#eab308" /> Pin in Hero
              </div>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308', display: 'inline-block', boxShadow: '0 0 8px #eab308' }} />
            </div>
          </div>

          <button
            type="button"
            style={{
              width: '100%',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '0.6rem',
              fontSize: '0.85rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.4)',
            }}
          >
            <Send size={16} /> PUBLISH STORY LIVE TO PUBLIC FEED
          </button>
        </div>
      ),
      bulletPoints: [
        'Toggle "Breaking News" to flash on top scrolling ticker and trigger popup notification.',
        'Toggle "Featured Story" to position as the lead top visual banner on homepage.',
        'Publishing immediately clears cache and updates the public website in real time.',
      ],
    },
  ];

  const currentStepData = steps[currentStep];

  // Video playback scrubber simulation
  useEffect(() => {
    if (!isOpen) return;

    if (isPlaying) {
      const intervalMs = 100 / playbackSpeed;
      const progressDelta = 100 / (STEP_DURATION_SEC * 10 * playbackSpeed);

      timerRef.current = setInterval(() => {
        setStepProgress((prev) => {
          if (prev >= 100) {
            // Auto advance to next step
            setCurrentStep((curr) => (curr < steps.length - 1 ? curr + 1 : 0));
            return 0;
          }
          return prev + progressDelta;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, playbackSpeed, currentStep]);

  // Audio Speech Narration
  const speakCurrentStep = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak =
        language === 'mr'
          ? `${currentStepData.marathiTitle}. ${currentStepData.marathiDesc}`
          : `${currentStepData.title}. ${currentStepData.description}`;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (isOpen && !isMuted) {
      speakCurrentStep();
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  }, [currentStep, isOpen, isMuted]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#0b1120',
          borderRadius: '16px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          maxWidth: '960px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#f8fafc',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Player Top Bar */}
        <div
          style={{
            padding: '1rem 1.5rem',
            backgroundColor: '#030712',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #1f2937',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(239, 68, 68, 0.4)',
              }}
            >
              <Tv size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.01em' }}>
                  Nirbhid News CMS — Editorial Video Masterclass
                </h3>
                <span style={{ fontSize: '0.65rem', backgroundColor: '#dc2626', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  HD 1080p
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                Interactive Video Walkthrough for Editors, Reporters & Bureau Chiefs
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Audio narration mute toggle */}
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              style={{
                background: isMuted ? '#1e293b' : 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: isMuted ? '#94a3b8' : '#60a5fa',
                cursor: 'pointer',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
              title={isMuted ? 'Unmute Audio Narration' : 'Mute Audio Narration'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span className="hidden-mobile">{isMuted ? 'Voice Off' : 'Audio Guide'}</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#1f2937',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close video tutorial"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Video Scrubber & Chapter Timeline */}
        <div style={{ backgroundColor: '#111827', borderBottom: '1px solid #1f2937' }}>
          {/* Progress bar across current step */}
          <div style={{ width: '100%', height: '4px', backgroundColor: '#1f2937', position: 'relative' }}>
            <div
              style={{
                width: `${((currentStep + stepProgress / 100) / steps.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #ef4444, #f59e0b, #22c55e)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>

          {/* Chapter selector pills */}
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              padding: '0.5rem 1rem',
              gap: '0.5rem',
            }}
          >
            {steps.map((step, idx) => {
              const isActive = idx === currentStep;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    setCurrentStep(idx);
                    setStepProgress(0);
                  }}
                  style={{
                    backgroundColor: isActive ? '#dc2626' : '#1f2937',
                    color: isActive ? '#ffffff' : '#9ca3af',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 800 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {step.icon}
                  <span>{step.title}</span>
                  <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>({step.videoTimestamp})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Video Viewport & Lesson Breakdown Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            gap: '1.5rem',
          }}
          className="admin-tutorial-layout"
        >
          {/* Left Column: Simulated Video Screen Display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Cinematic Screen Window */}
            <div
              style={{
                backgroundColor: '#030712',
                borderRadius: '12px',
                border: '1px solid #1f2937',
                padding: '1rem',
                position: 'relative',
                boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.8)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Radio size={14} /> CHAPTER {currentStep + 1} OF {steps.length} • {currentStepData.videoTimestamp}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
                    style={{ background: '#1f2937', border: 'none', color: '#cbd5e1', fontSize: '0.7rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    {playbackSpeed}x Speed
                  </button>
                </div>
              </div>

              {/* Dynamic Interactive Step Demo */}
              {currentStepData.interactiveScene}
            </div>

            {/* Video Controls Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#111827',
                borderRadius: '8px',
                padding: '0.6rem 1rem',
                border: '1px solid #1f2937',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  title={isPlaying ? 'Pause Auto Tour' : 'Play Auto Tour'}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(0);
                    setStepProgress(0);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.75rem',
                  }}
                  title="Restart Tutorial"
                >
                  <RotateCcw size={14} /> Restart
                </button>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'monospace' }}>
                ⏱ {currentStepData.videoTimestamp} / 03:45
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Instructions & Key Takeaways */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 0.5rem 0' }}>
                {language === 'mr' ? currentStepData.marathiTitle : currentStepData.title}
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>
                {language === 'mr' ? currentStepData.marathiDesc : currentStepData.description}
              </p>

              <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
                <h5 style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 700, margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Key Editorial Guidelines:
                </h5>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem', color: '#cbd5e1', lineHeight: 1.7 }}>
                  {currentStepData.bulletPoints.map((pt, pidx) => (
                    <li key={pidx}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderLeft: '4px solid #3b82f6', borderRadius: '6px', fontSize: '0.8rem', color: '#93c5fd' }}>
                💡 <strong>Editorial Pro-Tip:</strong> High-impact journalism paired with 16:9 cover images and video bulletins drives 4x higher reader engagement.
              </div>
            </div>

            {/* Step Navigation Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #1f2937' }}>
              <button
                type="button"
                disabled={currentStep === 0}
                onClick={() => {
                  setCurrentStep((prev) => Math.max(0, prev - 1));
                  setStepProgress(0);
                }}
                style={{
                  backgroundColor: '#1f2937',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5rem 0.85rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  visibility: currentStep === 0 ? 'hidden' : 'visible',
                }}
              >
                <ChevronLeft size={16} /> Prev Chapter
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
                    setStepProgress(0);
                  }}
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 1.1rem',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  Next Chapter <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.5rem 1.1rem',
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <CheckCircle2 size={16} /> Start Writing News
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
