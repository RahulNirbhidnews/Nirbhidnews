import React, { useState, useEffect } from 'react';
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
  Play,
  Copy,
  Layers,
  Flame,
  MousePointerClick,
  CheckCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../utils/translations';

interface AdminTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminTutorialModal: React.FC<AdminTutorialModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language: globalLang, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [modalLang, setModalLang] = useState<Language>(globalLang);

  // Interactive step simulators state
  const [demoHeadline, setDemoHeadline] = useState('मुंबई-पुणे एक्सप्रेसवेवर नवीन AI ट्रॅफिक सिस्टीम सुरू');
  const [demoAspect, setDemoAspect] = useState<'16:9' | '4:3' | '1:1'>('16:9');
  const [demoVideoPlaying, setDemoVideoPlaying] = useState(false);
  const [demoTemplate, setDemoTemplate] = useState<'breaking' | 'report' | 'interview'>('breaking');
  const [demoBreakingToggle, setDemoBreakingToggle] = useState(true);
  const [demoHeroToggle, setDemoHeroToggle] = useState(true);
  const [copiedSlug, setCopiedSlug] = useState(false);

  // Sync language with global if changed
  useEffect(() => {
    setModalLang(globalLang);
  }, [globalLang]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && activeTab < 4) setActiveTab((prev) => prev + 1);
      if (e.key === 'ArrowLeft' && activeTab > 0) setActiveTab((prev) => prev - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeTab, onClose]);

  if (!isOpen) return null;

  // Calculate clean slug for interactive demo 1
  const generatedDemoSlug = demoHeadline
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'mumbai-pune-ai-traffic-dc5716';

  const stepsData = [
    {
      id: 'step-1',
      number: '01',
      title: modalLang === 'mr' ? 'मथळे व ऑटो-स्लग' : modalLang === 'hi' ? 'शीर्षक एवं ऑटो-स्लग' : 'Headlines & Auto-Slug',
      category: modalLang === 'mr' ? 'लेखन व SEO' : modalLang === 'hi' ? 'लेखन एवं SEO' : 'Writing & SEO Beat',
      icon: <FileText size={18} color="#ef4444" />,
      tagColor: '#ef4444',
      headline: modalLang === 'mr' ? 'आकर्षक मथळे, ऑटो-स्लग व बातमी विभाग' : modalLang === 'hi' ? 'आकर्षक शीर्षक, ऑटो-स्लग एवं श्रेणी' : 'Dynamic Headlines, Auto-Slug & Beats',
      summary: modalLang === 'mr'
        ? 'मथळा टाईप करताच WhatsApp व सोशल मीडियासाठी स्वच्छ आणि सुरक्षित ASCII इंग्रजी वेब लिंक आपोआप तयार होते.'
        : modalLang === 'hi'
        ? 'शीर्षक टाइप करते ही WhatsApp और सोशल मीडिया के लिए स्वच्छ और सुरक्षित ASCII अंग्रेजी वेब लिंक स्वतः बन जाता है।'
        : 'Typing any headline instantly generates a short, clean ASCII slug so shared links on WhatsApp are short, fast and never hex-encoded.',
      features: [
        { label: 'Auto-Slug Engine', desc: 'Converts Marathi/Hindi to clean URL slugs (e.g. news-mumbai-dc5716)' },
        { label: '12+ Editorial Beats', desc: 'Assign to Maharashtra, Mumbai Metro, Thane, Politics, Crime, Sports, Tech' },
        { label: 'SEO Excerpt', desc: 'Add 1-2 sentence lead summary for Google ranking & WhatsApp preview cards' },
      ],
      interactiveDemo: (
        <div style={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
              Live Interactive Slug Simulator
            </span>
            <span style={{ fontSize: '0.7rem', color: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.2)', fontWeight: 700 }}>
              Try Typing Below ↓
            </span>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '0.75rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
              Headline Input (मथळा):
            </label>
            <input
              type="text"
              value={demoHeadline}
              onChange={(e) => setDemoHeadline(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#111827',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '0.65rem 0.85rem',
                color: '#facc15',
                fontSize: '0.875rem',
                fontWeight: 600,
                outline: 'none',
              }}
              placeholder="Type headline here..."
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setDemoHeadline('मुंबई-पुणे एक्सप्रेसवेवर नवीन AI ट्रॅफिक सिस्टीम सुरू')}
              style={{ background: '#1e293b', border: '1px solid #334155', color: '#cbd5e1', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Preset 1: Expressway AI
            </button>
            <button
              type="button"
              onClick={() => setDemoHeadline('ठाणे महानगरपालिका नवीन अर्थसंकल्प २०२६ सादर')}
              style={{ background: '#1e293b', border: '1px solid #334155', color: '#cbd5e1', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Preset 2: Thane Budget
            </button>
            <button
              type="button"
              onClick={() => setDemoHeadline('Maharashtra Cabinet Approves Major Infrastructure Project')}
              style={{ background: '#1e293b', border: '1px solid #334155', color: '#cbd5e1', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Preset 3: Cabinet News
            </button>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
                Generated Clean Slug URL:
              </span>
              <span style={{ fontSize: '0.8125rem', color: '#4ade80', fontFamily: 'monospace', fontWeight: 700 }}>
                https://nirbhidnews.com/news/{generatedDemoSlug}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(`https://nirbhidnews.com/news/${generatedDemoSlug}`);
                setCopiedSlug(true);
                setTimeout(() => setCopiedSlug(false), 1500);
              }}
              style={{
                backgroundColor: copiedSlug ? '#16a34a' : '#1e293b',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.35rem 0.65rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'all 0.2s ease',
              }}
            >
              {copiedSlug ? <Check size={14} /> : <Copy size={14} />}
              {copiedSlug ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'step-2',
      number: '02',
      title: modalLang === 'mr' ? 'फोटो व कव्हर इमेज' : modalLang === 'hi' ? 'फोटो एवं कवर' : 'Photos & 16:9 Cover',
      category: modalLang === 'mr' ? 'मीडिया व्यवस्थापन' : modalLang === 'hi' ? 'मीडिया प्रबंधन' : 'Media Engine',
      icon: <ImageIcon size={18} color="#0284c7" />,
      tagColor: '#0284c7',
      headline: modalLang === 'mr' ? 'उच्च दर्जाचे १६:९ कव्हर फोटो व मीडिया अपलोड' : modalLang === 'hi' ? 'उच्च गुणवत्ता वाले १६:९ कवर फोटो एवं मीडिया' : 'High-Res 16:9 Cover Photos & Media',
      summary: modalLang === 'mr'
        ? 'कव्हर फोटो अपलोड करा किंवा कोणत्याही अधिकृत प्रेस रिलीजची वेब लिंक थेट पेस्ट करा.'
        : modalLang === 'hi'
        ? 'कवर फोटो सीधे अपलोड करें या किसी प्रेस विज्ञप्ति की वेब लिंक पेस्ट करें।'
        : 'Upload high-resolution landscape images (16:9 aspect ratio) or paste public media URLs for instantaneous CDN-optimized delivery.',
      features: [
        { label: 'Direct Cloud Upload', desc: 'Upload JPG, PNG, or WebP up to 10MB directly to server storage' },
        { label: '16:9 Aspect Ratio Guide', desc: 'Standard 1200x675px delivers pixel-perfect display across Hero and cards' },
        { label: 'External URL Support', desc: 'Paste press release or news agency photo URLs with live instant preview' },
      ],
      interactiveDemo: (
        <div style={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
              <Layers size={14} color="#0284c7" /> Live Aspect-Ratio Viewport
            </span>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {(['16:9', '4:3', '1:1'] as const).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => setDemoAspect(ratio)}
                  style={{
                    backgroundColor: demoAspect === ratio ? '#0284c7' : '#1e293b',
                    color: demoAspect === ratio ? '#ffffff' : '#94a3b8',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              width: '100%',
              height: demoAspect === '16:9' ? '150px' : demoAspect === '4:3' ? '180px' : '180px',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative',
              border: '2px solid rgba(2, 132, 199, 0.4)',
              boxShadow: '0 0 20px rgba(2, 132, 199, 0.15)',
              transition: 'all 0.3s ease',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80"
              alt="Demo Visual"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '8px', left: '8px', backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, backdropFilter: 'blur(4px)' }}>
              Selected Aspect: {demoAspect} • High Definition 1080p
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'step-3',
      number: '03',
      title: modalLang === 'mr' ? 'व्हिडिओ बुलेटिन' : modalLang === 'hi' ? 'वीडियो बुलेटिन' : 'Video Bulletins',
      category: modalLang === 'mr' ? 'डिजिटल ब्रॉडकास्ट' : modalLang === 'hi' ? 'डिजिटल प्रसारण' : 'Broadcast Video',
      icon: <VideoIcon size={18} color="#a855f7" />,
      tagColor: '#a855f7',
      headline: modalLang === 'mr' ? 'YouTube किंवा थेट MP4 व्हिडिओ बातमी जोडा' : modalLang === 'hi' ? 'YouTube या सीधा MP4 वीडियो समाचार जोड़ें' : 'Embed YouTube or Native MP4 Bulletins',
      summary: modalLang === 'mr'
        ? 'व्हिडिओ बातम्या वाचकांना थेट पोर्टलवर पूर्ण-स्क्रीन डिजिटल बुलेटिन अनुभव देतात.'
        : modalLang === 'hi'
        ? 'वीडियो समाचार पाठकों को सीधे पोर्टल पर पूर्ण-स्क्रीन डिजिटल बुलेटिन अनुभव प्रदान करते हैं।'
        : 'Embed YouTube reports or upload recorded MP4 videos to deliver broadcast digital journalism directly inside the reader view.',
      features: [
        { label: 'YouTube & Vimeo Embed', desc: 'Paste standard watch URLs or youtu.be shortlinks with 1-click parsing' },
        { label: 'Direct MP4 Upload', desc: 'Upload recorded mobile phone footage or broadcast studio MP4 clips' },
        { label: 'Red Video Badge', desc: 'Automatically flashes animated red VIDEO BULLETIN badge across all feeds' },
      ],
      interactiveDemo: (
        <div style={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
              <Radio size={14} color="#dc2626" /> Native Video Player Simulator
            </span>
            <span style={{ fontSize: '0.7rem', color: '#c084fc', backgroundColor: 'rgba(168, 85, 247, 0.1)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(168, 85, 247, 0.2)', fontWeight: 700 }}>
              Click Play to Test ↓
            </span>
          </div>

          <div
            onClick={() => setDemoVideoPlaying(!demoVideoPlaying)}
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              height: '140px',
              backgroundColor: '#000',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #334155',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, opacity: demoVideoPlaying ? 0.9 : 0.4, backgroundImage: 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)', transition: 'all 0.3s ease' }} />

            <div style={{ zIndex: 2, textAlign: 'center' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: demoVideoPlaying ? '#22c55e' : '#ef4444',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: demoVideoPlaying ? '0 0 16px rgba(34, 197, 94, 0.6)' : '0 0 16px rgba(239, 68, 68, 0.6)',
                  transition: 'all 0.2s ease',
                }}
              >
                <Play size={20} color="#fff" style={{ marginLeft: '3px' }} />
              </div>
              <div style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 800, marginTop: '0.4rem' }}>
                {demoVideoPlaying ? '▶ Playing Video Bulletin (Simulated)' : 'Click to Play Broadcast Demo'}
              </div>
            </div>

            <div style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: '#dc2626', color: '#fff', fontSize: '0.65rem', fontWeight: 900, padding: '3px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Radio size={11} /> VIDEO BULLETIN
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'step-4',
      number: '04',
      title: modalLang === 'mr' ? '१-क्लिक फॉरमॅटिंग व AI' : modalLang === 'hi' ? '१-क्लिक प्रारूप एवं AI' : '1-Click AI Formatting',
      category: modalLang === 'mr' ? 'संपादकीय साधने' : modalLang === 'hi' ? 'संपादकीय उपकरण' : 'Editorial AI',
      icon: <Sparkles size={18} color="#eab308" />,
      tagColor: '#eab308',
      headline: modalLang === 'mr' ? 'एका क्लिकवर रिपोर्ट फॉरमॅटिंग व AI भाषांतर' : modalLang === 'hi' ? 'एक क्लिक में रिपोर्ट प्रारूप एवं AI अनुवाद' : 'Instant 1-Click Layouts & AI Auto-Translate',
      summary: modalLang === 'mr'
        ? 'ब्रेकिंग अलर्ट, ग्राउंड रिपोर्ट आणि मुलाखतीचे रेडीमेड साचे वापरून बातम्या अवघ्या काही सेकंदात तयार करा.'
        : modalLang === 'hi'
        ? 'ब्रेकिंग अलर्ट, ग्राउंड रिपोर्ट और साक्षात्कार के सांचे चुनकर खबरें तेजी से तैयार करें।'
        : 'Select pre-structured editorial templates (Breaking News Alert, Ground Report, Interview) and apply 1-Click AI Auto-Translation in 1 tap.',
      features: [
        { label: 'Breaking Alert Layout', desc: 'Urgent red alert callout box with bulleted immediate facts' },
        { label: 'Ground Report Layout', desc: 'Multi-paragraph journalistic structure with on-ground investigative depth' },
        { label: 'AI Auto-Translate', desc: 'Instantly localizes titles & excerpts between Marathi, English, and Hindi' },
      ],
      interactiveDemo: (
        <div style={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.85rem' }}>
            <button
              type="button"
              onClick={() => setDemoTemplate('breaking')}
              style={{
                flex: 1,
                padding: '0.4rem 0.5rem',
                backgroundColor: demoTemplate === 'breaking' ? '#dc2626' : '#1e293b',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.725rem',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              🚨 Breaking Alert
            </button>
            <button
              type="button"
              onClick={() => setDemoTemplate('report')}
              style={{
                flex: 1,
                padding: '0.4rem 0.5rem',
                backgroundColor: demoTemplate === 'report' ? '#0284c7' : '#1e293b',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.725rem',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              📰 Ground Report
            </button>
            <button
              type="button"
              onClick={() => setDemoTemplate('interview')}
              style={{
                flex: 1,
                padding: '0.4rem 0.5rem',
                backgroundColor: demoTemplate === 'interview' ? '#7c3aed' : '#1e293b',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.725rem',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              🎙️ Press Interview
            </button>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '8px', padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.5, maxHeight: '110px', overflowY: 'auto' }}>
            {demoTemplate === 'breaking' && (
              <>
                <span style={{ color: '#ef4444', fontWeight: 800 }}># 🚨 ब्रेकिंग अलर्ट: तात्काळ घडामोड</span><br />
                <span style={{ color: '#facc15' }}>&gt; "घटनेचे प्राथमिक वृत्त हाती आले असून बचाव कार्य सुरू आहे."</span><br />
                <span style={{ color: '#38bdf8' }}>### ठळक घडामोडी:</span><br />
                - पहिली महत्त्वाची बाब...
              </>
            )}
            {demoTemplate === 'report' && (
              <>
                <span style={{ color: '#38bdf8', fontWeight: 800 }}># 📰 विशेष ग्राउंड रिपोर्ट व सविस्तर वृत्त</span><br />
                <span style={{ color: '#cbd5e1' }}>मुंबई ब्युरो / विशेष प्रतिनिधी: सविस्तर पार्श्वभूमी...</span><br />
                <span style={{ color: '#4ade80' }}>🔍 घटनेचे विश्लेषण व पुढील पावले...</span>
              </>
            )}
            {demoTemplate === 'interview' && (
              <>
                <span style={{ color: '#c084fc', fontWeight: 800 }}># 🎙️ विशेष मुलाखत: प्रमुख वक्तव्ये</span><br />
                <span style={{ color: '#facc15' }}>**प्रश्न:** आगामी धोरणाबाबत आपली भूमिका काय?</span><br />
                <span style={{ color: '#38bdf8' }}>**उत्तर:** जनहिताचे निर्णय प्राधान्याने...</span>
              </>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 'step-5',
      number: '05',
      title: modalLang === 'mr' ? 'ब्रेकिंग अलर्ट व प्रकाशन' : modalLang === 'hi' ? 'ब्रेकिंग अलर्ट एवं प्रकाशन' : 'Breaking Alert & Publish',
      category: modalLang === 'mr' ? 'थेट प्रसारण' : modalLang === 'hi' ? 'लाइव प्रसारण' : 'Live Publishing',
      icon: <Send size={18} color="#22c55e" />,
      tagColor: '#22c55e',
      headline: modalLang === 'mr' ? 'ब्रेकिंग टिकर अलर्ट, हिरो पिन व थेट प्रकाशन' : modalLang === 'hi' ? 'ब्रेकिंग टिकर अलर्ट, हीरो पिन एवं सीधा प्रकाशन' : 'Breaking Ticker Alert, Hero Pinned & Live Push',
      summary: modalLang === 'mr'
        ? 'बातमी तात्काळ मुख्य टिकरवर फ्लॅश करा आणि वाचकांसाठी त्वरित लाईव्ह प्रकाशित करा.'
        : modalLang === 'hi'
        ? 'समाचार को शीर्ष टिकर पर फ्लैश करें और पाठकों के लिए तुरंत लाइव प्रकाशित करें।'
        : 'Flash urgent news on the top breaking ticker, pin lead stories to the Hero showcase, and publish live to update feeds instantly across all devices.',
      features: [
        { label: 'Breaking News Ticker', desc: 'Immediately flashes red scrolling ticker alert across the public site' },
        { label: 'Featured Hero Pin', desc: 'Promotes article into the top hero visual billboard' },
        { label: 'Instant Cache Invalidation', desc: 'Clears reader cache instantly so new edits appear in real-time' },
      ],
      interactiveDemo: (
        <div style={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.85rem' }}>
            <div
              onClick={() => setDemoBreakingToggle(!demoBreakingToggle)}
              style={{
                backgroundColor: demoBreakingToggle ? '#450a0a' : '#1e293b',
                border: `1px solid ${demoBreakingToggle ? '#ef4444' : '#334155'}`,
                borderRadius: '8px',
                padding: '0.6rem 0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: demoBreakingToggle ? '#fca5a5' : '#94a3b8', fontWeight: 700 }}>
                <Flame size={14} color={demoBreakingToggle ? '#ef4444' : '#64748b'} /> Breaking Alert
              </div>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: demoBreakingToggle ? '#ef4444' : '#475569', display: 'inline-block', boxShadow: demoBreakingToggle ? '0 0 8px #ef4444' : 'none' }} />
            </div>

            <div
              onClick={() => setDemoHeroToggle(!demoHeroToggle)}
              style={{
                backgroundColor: demoHeroToggle ? '#172554' : '#1e293b',
                border: `1px solid ${demoHeroToggle ? '#3b82f6' : '#334155'}`,
                borderRadius: '8px',
                padding: '0.6rem 0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: demoHeroToggle ? '#93c5fd' : '#94a3b8', fontWeight: 700 }}>
                <Star size={14} color={demoHeroToggle ? '#eab308' : '#64748b'} /> Pin in Hero
              </div>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: demoHeroToggle ? '#eab308' : '#475569', display: 'inline-block', boxShadow: demoHeroToggle ? '0 0 8px #eab308' : 'none' }} />
            </div>
          </div>

          <div style={{ backgroundColor: '#16a34a', color: '#fff', padding: '0.65rem', borderRadius: '8px', textAlign: 'center', fontWeight: 800, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)' }}>
            <CheckCircle2 size={16} /> Ready to Publish Live to News Feed
          </div>
        </div>
      ),
    },
  ];

  const currentStep = stepsData[activeTab];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(3, 7, 18, 0.88)',
        backdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#0c1322',
          borderRadius: '20px',
          boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          maxWidth: '1060px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#f8fafc',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow Ambient Accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '20%',
            right: '20%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #ef4444, #f59e0b, #3b82f6, transparent)',
            filter: 'blur(1px)',
          }}
        />

        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 2rem',
            backgroundColor: '#070b14',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(239, 68, 68, 0.45)',
              }}
            >
              <Sparkles size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  Nirbhid News CMS — Editorial Master Guide
                </h3>
                <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '2px 8px', borderRadius: '9999px', fontWeight: 800, textTransform: 'uppercase' }}>
                  PRO EDITION
                </span>
              </div>
              <p style={{ fontSize: '0.78125rem', color: '#94a3b8', margin: 0 }}>
                Interactive editorial workflow for reporters, editors & bureau journalists
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Language Switcher inside Guide */}
            <div style={{ display: 'flex', backgroundColor: '#111827', borderRadius: '8px', border: '1px solid #1f2937', padding: '2px' }}>
              {(['mr', 'en', 'hi'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setModalLang(lang);
                    setLanguage(lang);
                  }}
                  style={{
                    backgroundColor: modalLang === lang ? '#dc2626' : 'transparent',
                    color: modalLang === lang ? '#ffffff' : '#9ca3af',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'EN'}
                </button>
              ))}
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#111827',
                border: '1px solid #1f2937',
                color: '#9ca3af',
                cursor: 'pointer',
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              aria-label="Close guide"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Step Navigation Bar */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: '#070b14',
            overflowX: 'auto',
            padding: '0 1rem',
          }}
        >
          {stepsData.map((step, idx) => {
            const isActive = idx === activeTab;
            const isDone = idx < activeTab;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                style={{
                  flex: 1,
                  minWidth: '150px',
                  padding: '1rem 0.75rem',
                  border: 'none',
                  borderBottom: isActive ? `3px solid ${step.tagColor}` : '3px solid transparent',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  fontWeight: isActive ? 800 : 500,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '8px',
                    backgroundColor: isActive ? step.tagColor : isDone ? '#16a34a' : '#1f2937',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                  }}
                >
                  {isDone ? <Check size={14} /> : step.number}
                </div>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Main Content: Split Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            flex: 1,
            overflowY: 'auto',
            padding: '2rem',
            gap: '2rem',
          }}
          className="admin-tutorial-layout"
        >
          {/* Left Column: Explanations & High-Impact Guidelines */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    backgroundColor: `${currentStep.tagColor}20`,
                    color: currentStep.tagColor,
                    border: `1px solid ${currentStep.tagColor}40`,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                  }}
                >
                  {currentStep.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                  Chapter {currentStep.number} of 05
                </span>
              </div>

              <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.75rem 0', letterSpacing: '-0.01em' }}>
                {currentStep.headline}
              </h4>

              <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
                {currentStep.summary}
              </p>

              {/* Feature Highlights Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {currentStep.features.map((feat, fidx) => (
                  <div
                    key={fidx}
                    style={{
                      backgroundColor: '#111827',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '10px',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <CheckCheck size={13} color="#22c55e" />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#f1f5f9', display: 'block', marginBottom: '0.15rem' }}>
                        {feat.label}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.4 }}>
                        {feat.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '3px solid #ef4444', borderRadius: '8px', fontSize: '0.8rem', color: '#fca5a5' }}>
              💡 <strong>Journalist Rule:</strong> Fast factual reporting with compelling 16:9 visual covers increases WhatsApp viral reach by over 300%.
            </div>
          </div>

          {/* Right Column: Interactive Sandbox Simulator */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '0.75rem' }}>
              <MousePointerClick size={16} color="#38bdf8" /> Interactive Sandbox Experience
            </div>
            {currentStep.interactiveDemo}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div
          style={{
            padding: '1.25rem 2rem',
            backgroundColor: '#070b14',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            type="button"
            disabled={activeTab === 0}
            onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
            style={{
              backgroundColor: activeTab === 0 ? 'transparent' : '#111827',
              color: activeTab === 0 ? '#475569' : '#cbd5e1',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '0.55rem 1.1rem',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: activeTab === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              visibility: activeTab === 0 ? 'hidden' : 'visible',
            }}
          >
            <ChevronLeft size={16} /> Previous Chapter
          </button>

          {/* Chapter step indicator dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {stepsData.map((_, dotIdx) => (
              <span
                key={dotIdx}
                onClick={() => setActiveTab(dotIdx)}
                style={{
                  width: dotIdx === activeTab ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: dotIdx === activeTab ? '#ef4444' : '#1e293b',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>

          {activeTab < stepsData.length - 1 ? (
            <button
              type="button"
              onClick={() => setActiveTab((prev) => Math.min(stepsData.length - 1, prev + 1))}
              style={{
                backgroundColor: '#ef4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.6rem 1.35rem',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
                transition: 'all 0.2s ease',
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
                borderRadius: '8px',
                padding: '0.6rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 16px rgba(22, 163, 74, 0.45)',
                transition: 'all 0.2s ease',
              }}
            >
              <CheckCircle2 size={18} /> Start Writing News
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
