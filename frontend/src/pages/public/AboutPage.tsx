import React from 'react';
import { ChiefEditorSpotlight } from '../../components/news/ChiefEditorSpotlight';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Award, Target, Mail, MapPin } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="container" style={{ padding: '2.5rem 1rem 5rem 1rem', maxWidth: '960px' }}>
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
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
          {t.aboutUs}
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
            ? 'About Nirbhid News Media'
            : language === 'hi'
            ? 'निर्भीड न्यूज़ के बारे में'
            : 'आमच्याबद्दल • निर्भीड न्यूज नेटवर्क'}
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '700px', margin: '0 auto' }}>
          {t.brandTagline}
        </p>
      </div>

      {/* Prominent Chief Editor Leadership Banner */}
      <ChiefEditorSpotlight />

      {/* Editorial Content Card */}
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
        <h2
          style={{
            fontSize: '1.4rem',
            color: 'var(--color-secondary)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <ShieldCheck color="#dc2626" size={24} />
          {language === 'en'
            ? 'Our Mission & Journalistic Integrity'
            : language === 'hi'
            ? 'हमारा मिशन एवं निष्पक्ष पत्रकारिता'
            : 'आमचे ध्येय व संपादकीय तत्त्वे'}
        </h2>

        {language === 'en' ? (
          <>
            <p style={{ marginBottom: '1.25rem' }}>
              <strong>NIRBHID NEWS</strong> is one of Maharashtra's leading digital media networks,
              founded under the leadership of <strong>Chief Editor {t.editorName}</strong>.
              We are dedicated to delivering fearless, unbiased, and authentic news from Mumbai, Thane, Maharashtra, and across India.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              In an era of digital misinformation, Nirbhid News stands as a trusted beacon of integrity,
              highlighting grassroots public issues, governance policies, investigative journalism, and cultural happenings.
            </p>
          </>
        ) : language === 'hi' ? (
          <>
            <p style={{ marginBottom: '1.25rem' }}>
              <strong>निर्भीड न्यूज़</strong> महाराष्ट्र का प्रमुख डिजिटल समाचार नेटवर्क है, जिसकी स्थापना
              <strong> मुख्य संपादक {t.editorName}</strong> के नेतृत्व में हुई है।
              हमारा संकल्प मुंबई, ठाणे, महाराष्ट्र एवं देश भर की सच्ची और निष्पक्ष खबरें पाठकों तक पहुंचाना है।
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              हम जनसामान्य के अधिकारों की आवाज बनकर राजनीतिक विश्लेषण, सामाजिक मुद्दे और विकासकारी योजनाओं की प्रामाणिक जानकारी प्रदान करते हैं।
            </p>
          </>
        ) : (
          <>
            <p style={{ marginBottom: '1.25rem' }}>
              <strong>निर्भीड न्यूज (Nirbhid News)</strong> हे महाराष्ट्रातील अग्रगण्य डिजिटल न्यूज नेटवर्क असून
              <strong> मुख्य संपादक {t.editorName}</strong> यांच्या खंबीर नेतृत्वाखाली सत्य, निष्पक्ष आणि लोकशाहीच्या हक्काचा निर्भीड आवाज म्हणून कार्यरत आहे.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              आमचे ध्येय महाराष्ट्र, मुंबई, ठाणे आणि देशभरातील राजकीय घडामोडी, गुन्हेगारी विश्लेषण, सामाजिक प्रश्न, क्रीडा, मनोरंजन आणि शासकीय योजनांची माहिती थेट जनतेपर्यंत पोहोचवणे हे आहे.
            </p>
          </>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            margin: '2rem 0',
          }}
        >
          <div
            style={{
              padding: '1.25rem',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
            }}
          >
            <Target color="#dc2626" size={22} style={{ marginBottom: '0.5rem' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.35rem 0', color: 'var(--color-secondary)' }}>
              {language === 'en' ? 'Fact Verification' : language === 'hi' ? 'तथ्य सत्यापन' : 'सत्यता व पडताळणी'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              {language === 'en'
                ? 'Every story is thoroughly verified with authentic records before publication.'
                : language === 'hi'
                ? 'प्रत्येक समाचार को प्रामाणिक सूत्रों से जांचने के बाद ही प्रकाशित किया जाता है।'
                : 'प्रत्येक बातमीची सखोल पडताळणी करूनच ती वाचकांसाठी प्रसिद्ध केली जाते.'}
            </p>
          </div>

          <div
            style={{
              padding: '1.25rem',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
            }}
          >
            <Award color="#eab308" size={22} style={{ marginBottom: '0.5rem' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.35rem 0', color: 'var(--color-secondary)' }}>
              {language === 'en' ? 'Fearless Journalism' : language === 'hi' ? 'निर्भीक पत्रकारिता' : 'निर्भीड पत्रकारिता'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              {language === 'en'
                ? 'Committed to reporting without political or commercial prejudice.'
                : language === 'hi'
                ? 'बिना किसी राजनीतिक दबाव के जनता का निष्पक्ष पक्ष रखना।'
                : 'कोणत्याही राजकीय दबावाला बळी न पडता जनसामान्यांची बाजू मांडणे.'}
            </p>
          </div>
        </div>

        {/* Editorial Office & Contact */}
        <div
          style={{
            marginTop: '2rem',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-secondary)' }}>
            {t.adContactLeader}:
          </h3>
          <p style={{ margin: 0 }}>
            <strong>{t.editorTitle}:</strong> {t.editorName} | 📞{' '}
            <a href="tel:9922299027" style={{ color: '#dc2626', fontWeight: 800 }}>
              {t.editorPhone}
            </a>
          </p>
          <p style={{ margin: 0, color: '#64748b' }}>
            <Mail size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />{' '}
            {t.editorEmail} |{' '}
            <MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />{' '}
            {t.editorOffice}
          </p>
        </div>
      </div>
    </div>
  );
};
