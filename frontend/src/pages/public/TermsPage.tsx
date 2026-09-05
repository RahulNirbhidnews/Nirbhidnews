import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, AlertTriangle, Share2 } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem 1rem', maxWidth: '880px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <span
          style={{
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            color: '#dc2626',
            fontWeight: 800,
            fontSize: '0.75rem',
            padding: '4px 12px',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {t.terms}
        </span>
        <h1
          style={{
            fontSize: '2.25rem',
            fontFamily: 'var(--font-brand, sans-serif)',
            color: 'var(--color-secondary)',
            marginTop: '0.5rem',
            marginBottom: '0.5rem',
          }}
        >
          {language === 'en'
            ? 'Terms of Service & Editorial Code'
            : language === 'hi'
            ? 'नियम एवं शर्तें (Terms of Service)'
            : 'नियम व अटी (Terms of Service)'}
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          {language === 'en'
            ? 'Welcome to Nirbhid News. By accessing or using our editorial content, bulletins, and media services, you agree to the following terms.'
            : language === 'hi'
            ? 'निर्भीड न्यूज़ पोर्टल पर आपका स्वागत है। हमारी वेबसाइट का उपयोग करने पर आप निम्न शर्तों से बाध्य होंगे।'
            : 'निर्भीड न्यूज पोर्टलवर आपले स्वागत आहे. आमचे वृत्तपत्र व डिजिटल सेवा वापरताना खालील अटी व शर्ती लागू राहतील.'}
        </p>
      </div>

      <div
        style={{
          fontSize: '1rem',
          color: '#334155',
          lineHeight: 1.8,
          backgroundColor: '#ffffff',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg, 12px)',
          padding: '2.25rem 2rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <section style={{ marginBottom: '1.75rem' }}>
          <h2
            style={{
              fontSize: '1.25rem',
              color: 'var(--color-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            <ShieldCheck color="#dc2626" size={20} />
            {language === 'en'
              ? '1. Intellectual Property & Copyright'
              : language === 'hi'
              ? '१. बौद्धिक संपदा एवं कॉपीराइट'
              : '१. बौद्धिक संपदा व कॉपीराइट'}
          </h2>
          <p>
            {language === 'en'
              ? 'All articles, investigative reports, photographs, video broadcasts, and brand logos on Nirbhid News are protected under copyright laws. Unauthorized reproduction, web scraping, or republishing for commercial purposes without prior written consent from Chief Editor Rahul Baburao Jogdand is strictly prohibited.'
              : language === 'hi'
              ? 'निर्भीड न्यूज़ पर प्रकाशित सभी समाचार, खोजी रिपोर्ट, चित्र, वीडियो और लोगो कॉपीराइट अधिनियम द्वारा संरक्षित हैं। मुख्य संपादक राहुल बाबूराव जोगदंड की लिखित अनुमति के बिना किसी भी व्यावसायिक उपयोग के लिए सामग्री की नकल करना वर्जित है।'
              : 'निर्भीड न्यूजवरील सर्व बातम्या, शोध पत्रकारिता अहवाल, छायाचित्रे, व्हिडिओ बुलेटिन व लोगो कॉपीराइट कायद्यानुसार संरक्षित आहेत. मुख्य संपादक राहुल बाबुराव जोगदंड यांच्या लेखी परवानगीशिवाय सामग्रीची व्यावसायिक नक्कल करणे बेकायदेशीर आहे.'}
          </p>
        </section>

        <section style={{ marginBottom: '1.75rem' }}>
          <h2
            style={{
              fontSize: '1.25rem',
              color: 'var(--color-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            <Share2 color="#16a34a" size={20} />
            {language === 'en'
              ? '2. Permitted Sharing & Fair Attribution'
              : language === 'hi'
              ? '२. समाचार साझाकरण एवं श्रेय'
              : '२. बातम्या शेअर करण्याचे नियम'}
          </h2>
          <p>
            {language === 'en'
              ? 'Readers are welcome and encouraged to share official article links on social media platforms (WhatsApp, Facebook, X, Telegram) for public awareness, provided proper accreditation to Nirbhid News is maintained.'
              : language === 'hi'
              ? 'पाठक जनहित एवं जागरूकता हेतु सोशल मीडिया (WhatsApp, Facebook, X) पर निर्भीड न्यूज़ के मूल लिंक साझा कर सकते हैं।'
              : 'जनजागृतीसाठी सोशल मीडियावर (WhatsApp, Facebook, X) निर्भीड न्यूजच्या अधिकृत लिंक शेअर करण्यास वाचकांना पूर्ण मुभा आहे.'}
          </p>
        </section>

        <section style={{ marginBottom: '1.75rem' }}>
          <h2
            style={{
              fontSize: '1.25rem',
              color: 'var(--color-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            <AlertTriangle color="#eab308" size={20} />
            {language === 'en'
              ? '3. Editorial Jurisdiction'
              : language === 'hi'
              ? '३. कानूनी क्षेत्राधिकार'
              : '३. कायदेशीर कार्यक्षेत्र'}
          </h2>
          <p>
            {language === 'en'
              ? 'All legal matters, disputes, and editorial arbitration relating to Nirbhid News are subject to the exclusive jurisdiction of the competent courts in Mumbai & Thane, Maharashtra.'
              : language === 'hi'
              ? 'निर्भीड न्यूज़ से संबंधित समस्त कानूनी मामले एवं विवाद केवल मुंबई एवं ठाणे (महाराष्ट्र) स्थित न्यायालयों के क्षेत्राधिकार के अधीन होंगे।'
              : 'निर्भीड न्यूजशी संबंधित सर्व कायदेशीर बाबी व तक्रारी केवळ मुंबई व ठाणे न्यायालयाच्या अधिकारक्षेत्रात येतील.'}
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', marginTop: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          <strong>{t.editorTitle}:</strong> {t.editorName} | 📞 {t.editorPhone} | 📧 {t.editorEmail}
        </div>
      </div>
    </div>
  );
};
