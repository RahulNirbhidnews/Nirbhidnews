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
  Check,
  Play,
  Copy,
  CheckCheck,
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
  const [activeStep, setActiveStep] = useState<number>(0);
  const [modalLang, setModalLang] = useState<Language>(globalLang);
  const [copiedSlug, setCopiedSlug] = useState(false);

  // Sync language with global
  useEffect(() => {
    setModalLang(globalLang);
  }, [globalLang]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && activeStep < 4) setActiveStep((prev) => prev + 1);
      if (e.key === 'ArrowLeft' && activeStep > 0) setActiveStep((prev) => prev - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeStep, onClose]);

  if (!isOpen) return null;

  const stepsData = [
    {
      id: 'step-1',
      number: '01',
      title: modalLang === 'mr' ? 'मथळे व ऑटो-स्लग' : modalLang === 'hi' ? 'शीर्षक एवं ऑटो-स्लग' : 'Headlines & Auto-Slug',
      badge: modalLang === 'mr' ? 'पायरी १: मथळा व SEO' : modalLang === 'hi' ? 'चरण १: शीर्षक एवं SEO' : 'Step 1: Writing & SEO',
      icon: <FileText size={20} color="#dc2626" />,
      color: '#dc2626',
      headline: modalLang === 'mr' ? 'आकर्षक मथळा व ऑटो-स्लग' : modalLang === 'hi' ? 'आकर्षक शीर्षक एवं ऑटो-स्लग' : 'Catchy Headline & Auto-Slug',
      description: modalLang === 'mr'
        ? 'मथळा लिहिताच WhatsApp व सोशल मीडियासाठी स्वच्छ इंग्रजी वेब लिंक आपोआप तयार होते.'
        : modalLang === 'hi'
        ? 'शीर्षक लिखते ही WhatsApp एवं सोशल मीडिया के लिए स्वच्छ अंग्रेजी वेब लिंक अपने-आप बन जाती है।'
        : 'Typing any headline instantly creates a clean, short ASCII slug so shared links on WhatsApp are short and fast.',
      points: [
        modalLang === 'mr' ? 'मराठी मथळ्याचे स्वच्छ इंग्रजी URL मध्ये रूपांतर' : modalLang === 'hi' ? 'शीर्षक का स्वच्छ अंग्रेजी URL में स्वतः रूपांतरण' : 'Auto-converts regional headlines into clean ASCII URLs',
        modalLang === 'mr' ? '१२+ संपादकीय विभाग (महाराष्ट्र, मुंबई, राजकारण, गुन्हे...)' : modalLang === 'hi' ? '१२+ संपादकीय श्रेणियां (महाराष्ट्र, मुंबई, राजनीति...)' : '12+ Editorial beats (Maharashtra, Mumbai, Politics, Crime...)',
        modalLang === 'mr' ? 'गुगल व व्हॉट्सॲप प्रिव्ह्यूसाठी १-२ ओळींचा सारांश' : modalLang === 'hi' ? 'Google और WhatsApp पूर्वावलोकन हेतु १-२ पंक्तियों का सारांश' : '1-2 sentence lead excerpt for Google Search & WhatsApp cards',
      ],
      preview: (
        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.75rem 0.85rem' }}>
          <div style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            ✓ Generated Clean WhatsApp Link:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#15803d', fontFamily: 'monospace', fontWeight: 700, wordBreak: 'break-all' }}>
              https://nirbhidnews.com/news/mumbai-expressway-dc5716
            </span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText('https://nirbhidnews.com/news/mumbai-expressway-dc5716');
                setCopiedSlug(true);
                setTimeout(() => setCopiedSlug(false), 1500);
              }}
              style={{
                backgroundColor: copiedSlug ? '#16a34a' : '#ffffff',
                color: copiedSlug ? '#ffffff' : '#0f172a',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                padding: '3px 8px',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                flexShrink: 0,
              }}
            >
              {copiedSlug ? <Check size={12} /> : <Copy size={12} />}
              {copiedSlug ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      ),
      tip: modalLang === 'mr' ? 'टीप: मथळा ६० ते ८० अक्षरांमध्ये ठेवल्यास जास्त वाचक मिळतात.' : modalLang === 'hi' ? 'सुझाव: ६०-८० अक्षरों का शीर्षक अधिक पाठकों को आकर्षित करता है।' : 'Tip: Headlines between 60-80 characters get maximum clicks on WhatsApp.',
    },
    {
      id: 'step-2',
      number: '02',
      title: modalLang === 'mr' ? '१६:९ कव्हर फोटो' : modalLang === 'hi' ? '१६:९ कवर फोटो' : '16:9 Cover Photos',
      badge: modalLang === 'mr' ? 'पायरी २: मीडिया व फोटो' : modalLang === 'hi' ? 'चरण २: मीडिया एवं फोटो' : 'Step 2: Media Engine',
      icon: <ImageIcon size={20} color="#0284c7" />,
      color: '#0284c7',
      headline: modalLang === 'mr' ? 'उत्कृष्ट दर्जाचे १६:९ कव्हर फोटो' : modalLang === 'hi' ? 'उच्च गुणवत्ता वाले १६:९ कवर फोटो' : 'HD 16:9 Landscape Photos',
      description: modalLang === 'mr'
        ? 'कव्हर फोटो थेट अपलोड करा किंवा कोणत्याही अधिकृत प्रेस रिलीजची वेब लिंक थेट पेस्ट करा.'
        : modalLang === 'hi'
        ? 'कवर फोटो सीधे अपलोड करें या किसी प्रेस विज्ञप्ति की वेब लिंक पेस्ट करें।'
        : 'Upload high-resolution landscape images or paste public image URLs for instant CDN delivery.',
      points: [
        modalLang === 'mr' ? 'JPG, PNG, WebP १० MB पर्यंत थेट अपलोड' : modalLang === 'hi' ? 'JPG, PNG, WebP १० MB तक सीधा अपलोड' : 'Direct upload for JPG, PNG, and WebP up to 10MB',
        modalLang === 'mr' ? '१६:९ (Landscape) आकाराचा फोटो सर्व स्क्रीनवर परिपूर्ण दिसतो' : modalLang === 'hi' ? '१६:९ (Landscape) अनुपात सभी स्क्रीन पर शानदार दिखता है' : 'Standard 16:9 aspect ratio fits perfectly on mobile and desktop',
        modalLang === 'mr' ? 'प्रेस रिलीज फोटो वेब लिंक पेस्ट करताच लाईव्ह प्रिव्ह्यू' : modalLang === 'hi' ? 'प्रेस विज्ञप्ति फोटो लिंक पेस्ट करते ही तुरंत पूर्वावलोकन' : 'Live preview when pasting external press release URLs',
      ],
      preview: (
        <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '110px', border: '1.5px solid #0284c7' }}>
          <img
            src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80"
            alt="Demo"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <span style={{ position: 'absolute', bottom: '6px', left: '6px', backgroundColor: 'rgba(15,23,42,0.85)', color: '#fff', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
            16:9 HD Cover • Standard Size
          </span>
        </div>
      ),
      tip: modalLang === 'mr' ? 'टीप: उभे (Portrait) ऐवजी आडवे (Landscape) फोटो वापरा.' : modalLang === 'hi' ? 'सुझाव: पोर्ट्रेट के बजाय लैंडस्केप फोटो का उपयोग करें।' : 'Tip: Always use landscape photos for the cleanest mobile news cards.',
    },
    {
      id: 'step-3',
      number: '03',
      title: modalLang === 'mr' ? 'व्हिडिओ बुलेटिन' : modalLang === 'hi' ? 'वीडियो बुलेटिन' : 'Video Bulletins',
      badge: modalLang === 'mr' ? 'पायरी ३: व्हिडिओ बातमी' : modalLang === 'hi' ? 'चरण ३: वीडियो समाचार' : 'Step 3: Broadcast Video',
      icon: <VideoIcon size={20} color="#7c3aed" />,
      color: '#7c3aed',
      headline: modalLang === 'mr' ? 'YouTube किंवा थेट MP4 व्हिडिओ जोडा' : modalLang === 'hi' ? 'YouTube या सीधा MP4 वीडियो जोड़ें' : 'Embed YouTube or Upload MP4',
      description: modalLang === 'mr'
        ? 'व्हिडिओ बातम्या वाचकांना थेट पोर्टलवर डिजिटल बुलेटिन अनुभव देतात.'
        : modalLang === 'hi'
        ? 'वीडियो समाचार पाठकों को सीधे पोर्टल पर डिजिटल बुलेटिन अनुभव प्रदान करते हैं।'
        : 'Embed YouTube reports or upload mobile MP4 videos to deliver broadcast digital journalism.',
      points: [
        modalLang === 'mr' ? 'YouTube लिंक पेस्ट करताच १-क्लिक व्हिडिओ प्लेअर तयार' : modalLang === 'hi' ? 'YouTube लिंक पेस्ट करते ही १-क्लिक वीडियो प्लेयर तैयार' : 'Paste any YouTube or Vimeo watch link with instant parsing',
        modalLang === 'mr' ? 'मोबाईलवरील रेकॉर्ड केलेले MP4 व्हिडिओ थेट अपलोड' : modalLang === 'hi' ? 'मोबाइल से रिकॉर्ड किया MP4 वीडियो सीधा अपलोड करें' : 'Upload recorded mobile phone footage or broadcast studio clips',
        modalLang === 'mr' ? 'बातमीवर आपोआप लाल रंगाचा VIDEO BULLETIN बॅज झळकतो' : modalLang === 'hi' ? 'समाचार पर स्वतः लाल रंग का VIDEO BULLETIN बैज दिखाई देगा' : 'Automatically flashes animated red VIDEO BULLETIN badge',
      ],
      preview: (
        <div style={{ backgroundColor: '#0f172a', borderRadius: '8px', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Play size={14} color="#fff" style={{ marginLeft: '2px' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800 }}>Digital Video Bulletin</div>
              <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>YouTube / Direct MP4 Player</div>
            </div>
          </div>
          <span style={{ fontSize: '0.6rem', backgroundColor: '#dc2626', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
            LIVE
          </span>
        </div>
      ),
      tip: modalLang === 'mr' ? 'टीप: ३० ते ९० सेकंदांचे छोटे व्हिडिओ बुलेटिन सर्वाधिक व्हायरल होतात.' : modalLang === 'hi' ? 'सुझाव: ३० से ९० सेकंड के छोटे वीडियो अधिक वायरल होते हैं।' : 'Tip: Short 30-90 second video bulletins generate highest mobile engagement.',
    },
    {
      id: 'step-4',
      number: '04',
      title: modalLang === 'mr' ? '१-क्लिक फॉरमॅटिंग व AI' : modalLang === 'hi' ? '१-क्लिक प्रारूप एवं AI' : '1-Click AI Formatting',
      badge: modalLang === 'mr' ? 'पायरी ४: संपादकीय साचे' : modalLang === 'hi' ? 'चरण ४: संपादकीय सांचे' : 'Step 4: Editorial Templates',
      icon: <Sparkles size={20} color="#d97706" />,
      color: '#d97706',
      headline: modalLang === 'mr' ? '१-क्लिक फॉरमॅटिंग व AI भाषांतर' : modalLang === 'hi' ? '१-क्लिक प्रारूप एवं AI अनुवाद' : 'Instant Templates & AI Translate',
      description: modalLang === 'mr'
        ? 'ब्रेकिंग अलर्ट, ग्राउंड रिपोर्ट आणि मुलाखतीचे रेडीमेड साचे वापरून बातम्या अवघ्या काही सेकंदात तयार करा.'
        : modalLang === 'hi'
        ? 'ब्रेकिंग अलर्ट, ग्राउंड रिपोर्ट और साक्षात्कार के सांचे चुनकर खबरें तेजी से तैयार करें।'
        : 'Select pre-structured editorial templates and translate headlines into Marathi, Hindi, and English with 1 tap.',
      points: [
        modalLang === 'mr' ? '🚨 ब्रेकिंग अलर्ट, 📰 ग्राउंड रिपोर्ट आणि 🎙️ मुलाखत रेडीमेड साचे' : modalLang === 'hi' ? '🚨 ब्रेकिंग अलर्ट, 📰 ग्राउंड रिपोर्ट और 🎙️ साक्षात्कार के तैयार सांचे' : 'Ready templates for Breaking Alerts, Ground Reports, and Interviews',
        modalLang === 'mr' ? 'AI भाषांतर बटणाने एका क्लिकवर मथळा व मजकूर भाषांतरित करा' : modalLang === 'hi' ? 'AI अनुवाद बटन से एक क्लिक में शीर्षक एवं विवरण का अनुवाद करें' : '1-Click AI Translation between Marathi, Hindi, and English',
        modalLang === 'mr' ? 'ठळक मुद्दे, कोट्स आणि मथळे सहज फॉरमॅट करा' : modalLang === 'hi' ? 'मुख्य बिंदु, कोट्स और उप-शीर्षक आसानी से सजाएं' : 'Rich formatting with bullet points, quotes, and bold highlights',
      ],
      preview: (
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <span style={{ flex: 1, backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', padding: '0.4rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, textAlign: 'center' }}>
            🚨 Breaking Alert
          </span>
          <span style={{ flex: 1, backgroundColor: '#e0f2fe', color: '#0284c7', border: '1px solid #bae6fd', padding: '0.4rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, textAlign: 'center' }}>
            📰 Ground Report
          </span>
          <span style={{ flex: 1, backgroundColor: '#f3e8ff', color: '#7c3aed', border: '1px solid #e9d5ff', padding: '0.4rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, textAlign: 'center' }}>
            ✨ AI Translate
          </span>
        </div>
      ),
      tip: modalLang === 'mr' ? 'टीप: बातमीचे मुख्य ३ मुद्दे बुलेट पॉईंट्समध्ये दिल्यास वाचक सहज वाचतात.' : modalLang === 'hi' ? 'सुझाव: मुख्य ३ बातों को बुलेट पॉइंट्स में लिखें।' : 'Tip: Breaking down stories into 3 bullet points increases readability by 2x.',
    },
    {
      id: 'step-5',
      number: '05',
      title: modalLang === 'mr' ? 'थेट प्रकाशन व टिकर अलर्ट' : modalLang === 'hi' ? 'लाइव प्रकाशन एवं टिकर' : 'Publish Live & Alerts',
      badge: modalLang === 'mr' ? 'पायरी ५: थेट प्रकाशन' : modalLang === 'hi' ? 'चरण ५: सीधा प्रकाशन' : 'Step 5: Live Push',
      icon: <Send size={20} color="#16a34a" />,
      color: '#16a34a',
      headline: modalLang === 'mr' ? 'ब्रेकिंग टिकर अलर्ट व थेट प्रकाशन' : modalLang === 'hi' ? 'ब्रेकिंग टिकर अलर्ट एवं सीधा प्रकाशन' : 'Breaking Ticker Alert & Live Publish',
      description: modalLang === 'mr'
        ? 'बातमी तात्काळ मुख्य टिकरवर फ्लॅश करा आणि वाचकांसाठी त्वरित लाईव्ह प्रकाशित करा.'
        : modalLang === 'hi'
        ? 'समाचार को शीर्ष टिकर पर फ्लैश करें और पाठकों के लिए तुरंत लाइव प्रकाशित करें।'
        : 'Flash urgent news on the top breaking ticker, pin lead stories to the Hero showcase, and publish live.',
      points: [
        modalLang === 'mr' ? '🔥 ब्रेकिंग टिकर: मुख्य पानावर लाल रंगात तात्काळ फ्लॅश होते' : modalLang === 'hi' ? '🔥 ब्रेकिंग टिकर: मुख्य पृष्ठ पर लाल रंग में तुरंत फ्लैश होती है' : 'Flash red scrolling ticker alert across the public site',
        modalLang === 'mr' ? '⭐ हिरो पिन: बातमी मुख्य बॅनरवर सर्वात वर ठळकपणे दिसते' : modalLang === 'hi' ? '⭐ हीरो पिन: खबर मुख्य बैनर पर सबसे ऊपर प्रमुखता से दिखती है' : 'Pin lead stories into the top hero billboard banner',
        modalLang === 'mr' ? '✓ त्वरित लाईव्ह: एका सेकंदात सर्व मोबाईल व वेबसाईटवर प्रकाशित' : modalLang === 'hi' ? '✓ तुरंत लाइव: एक सेकंड में सभी मोबाइल व वेबसाइट पर लाइव' : 'Instant real-time reader delivery across all devices',
      ],
      preview: (
        <div style={{ backgroundColor: '#16a34a', color: '#ffffff', borderRadius: '8px', padding: '0.65rem 0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 800 }}>
            <CheckCircle2 size={16} /> Live on Nirbhid News
          </div>
          <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(255,255,255,0.25)', padding: '2px 8px', borderRadius: '9999px', fontWeight: 800 }}>
            Instant Push
          </span>
        </div>
      ),
      tip: modalLang === 'mr' ? 'टीप: बातमी प्रकाशित झाल्यावर WhatsApp वर शेअर करण्यासाठी लिंक लगेच उपलब्ध होते.' : modalLang === 'hi' ? 'सुझाव: प्रकाशन के तुरंत बाद WhatsApp शेयर लिंक तैयार मिलती है।' : 'Tip: Clean WhatsApp sharing links are available immediately upon publish.',
    },
  ];

  const current = stepsData[activeStep];

  return (
    <div className="admin-guide-overlay" onClick={onClose}>
      <div className="admin-guide-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Accent Line */}
        <div
          style={{
            height: '4px',
            width: '100%',
            background: 'linear-gradient(90deg, #dc2626, #f59e0b, #0284c7, #16a34a)',
            flexShrink: 0,
          }}
        />

        {/* 1. Header */}
        <div className="admin-guide-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: current.color,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '0.85rem',
                flexShrink: 0,
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              }}
            >
              {current.number}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Nirbhid Guide
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>
                Step {activeStep + 1} of {stepsData.length}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            {/* Language Switcher */}
            <div style={{ display: 'flex', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #cbd5e1', padding: '1px' }}>
              {(['mr', 'en', 'hi'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setModalLang(lang);
                    setLanguage(lang);
                  }}
                  style={{
                    backgroundColor: modalLang === lang ? current.color : 'transparent',
                    color: modalLang === lang ? '#ffffff' : '#475569',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '3px 7px',
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
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#64748b',
                cursor: 'pointer',
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 2. Step Progress Bar */}
        <div style={{ display: 'flex', backgroundColor: '#e2e8f0', height: '3px', flexShrink: 0 }}>
          {stepsData.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              style={{
                flex: 1,
                backgroundColor: idx <= activeStep ? current.color : '#e2e8f0',
                transition: 'background-color 0.25s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* 3. Main Step Content (Clean, Lightweight & Mobile-Optimized) */}
        <div className="admin-guide-body">
          {/* Badge & Headline */}
          <div>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.65rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: current.color,
                backgroundColor: `${current.color}15`,
                border: `1px solid ${current.color}30`,
                padding: '2px 8px',
                borderRadius: '9999px',
                marginBottom: '0.4rem',
              }}
            >
              {current.badge}
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.35rem 0', lineHeight: 1.25 }}>
              {current.headline}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: '#475569', margin: 0, lineHeight: 1.45 }}>
              {current.description}
            </p>
          </div>

          {/* Live Mini Preview Box */}
          <div>
            {current.preview}
          </div>

          {/* Key Checklist Points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {current.points.map((pt, pidx) => (
              <div
                key={pidx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '0.5rem 0.65rem',
                  fontSize: '0.78125rem',
                  color: '#1e293b',
                  lineHeight: 1.35,
                }}
              >
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                  <CheckCheck size={11} color="#16a34a" />
                </div>
                <span>{pt}</span>
              </div>
            ))}
          </div>

          {/* Pro Tip Box */}
          <div
            style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '6px',
              padding: '0.55rem 0.75rem',
              fontSize: '0.75rem',
              color: '#92400e',
              lineHeight: 1.35,
            }}
          >
            💡 <strong>Pro Tip:</strong> {current.tip}
          </div>
        </div>

        {/* 4. Footer Controls */}
        <div className="admin-guide-footer">
          <button
            type="button"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            className="admin-guide-nav-btn"
            style={{
              backgroundColor: activeStep === 0 ? 'transparent' : '#ffffff',
              color: activeStep === 0 ? '#94a3b8' : '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '0.45rem 0.85rem',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              visibility: activeStep === 0 ? 'hidden' : 'visible',
            }}
          >
            <ChevronLeft size={16} /> Prev
          </button>

          {/* Dot Indicators */}
          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            {stepsData.map((_, dotIdx) => (
              <span
                key={dotIdx}
                onClick={() => setActiveStep(dotIdx)}
                style={{
                  width: dotIdx === activeStep ? '16px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: dotIdx === activeStep ? current.color : '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>

          {activeStep < stepsData.length - 1 ? (
            <button
              type="button"
              onClick={() => setActiveStep((prev) => Math.min(stepsData.length - 1, prev + 1))}
              className="admin-guide-nav-btn"
              style={{
                backgroundColor: current.color,
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.45rem 1.15rem',
                fontSize: '0.8125rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
              }}
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="admin-guide-nav-btn"
              style={{
                backgroundColor: '#16a34a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.45rem 1.15rem',
                fontSize: '0.8125rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                boxShadow: '0 2px 8px rgba(22, 163, 74, 0.35)',
              }}
            >
              <CheckCircle2 size={16} /> Start Writing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
