import React from 'react';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { ChiefEditorSpotlight } from '../../components/news/ChiefEditorSpotlight';
import { useLanguage } from '../../context/LanguageContext';

export const ContactPage: React.FC = () => {
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
          {t.contactUs}
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
            ? 'Contact Nirbhid News Media Desk'
            : language === 'hi'
            ? 'निर्भीड न्यूज़ से संपर्क करें'
            : 'संपर्क साधा • निर्भीड न्यूज'}
        </h1>
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '700px', margin: '0 auto' }}>
          {language === 'en'
            ? 'For breaking news alerts, editorial inquiries, press releases, or advertisement bookings, contact our Chief Editor directly.'
            : language === 'hi'
            ? 'ताज़ा समाचार, प्रेस विज्ञप्ति, संपादकीय सुझाव अथवा विज्ञापन बुकिंग के लिए सीधे संपर्क करें।'
            : 'बातम्यांचे अपडेट्स, प्रेस रिलीज, जाहिरात बुकिंग अथवा संपादकीय मार्गदर्शनासाठी आमच्याशी थेट संपर्क साधा.'}
        </p>
      </div>

      {/* Chief Editor Leadership Spotlight */}
      <ChiefEditorSpotlight />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginTop: '2rem',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md, 10px)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <Phone color="#dc2626" size={24} style={{ marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--color-secondary)' }}>
            {t.callDirect}
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
            {t.editorTitle}: {t.editorName}
          </p>
          <a
            href="tel:9922299027"
            style={{ fontSize: '1.05rem', fontWeight: 800, color: '#dc2626', textDecoration: 'none' }}
          >
            📞 {t.editorPhone}
          </a>
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md, 10px)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <MessageSquare color="#16a34a" size={24} style={{ marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--color-secondary)' }}>
            WhatsApp Chat
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
            {language === 'en'
              ? 'Send instant news tip or ad request'
              : language === 'hi'
              ? 'समाचार टिप या विज्ञापन संदेश भेजें'
              : 'तातडीची बातमी किंवा जाहिरात पाठवा'}
          </p>
          <a
            href="https://wa.me/919922299027?text=नमस्कार%20राहुल%20सर,%20मला%20बातमी/जाहिरात%20संदर्भात%20बोलायचे%20आहे."
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.95rem', fontWeight: 800, color: '#16a34a', textDecoration: 'none' }}
          >
            💬 WhatsApp Now
          </a>
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md, 10px)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <Mail color="#2563eb" size={24} style={{ marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--color-secondary)' }}>
            {language === 'en' ? 'Editorial Email' : language === 'hi' ? 'संपादकीय ई-मेल' : 'संपादकीय ई-मेल'}
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
            {language === 'en' ? 'Press releases & official letters' : language === 'hi' ? 'प्रेस विज्ञप्ति एवं पत्र' : 'प्रेस नोट व अधिकृत पत्रव्यवहार'}
          </p>
          <a
            href={`mailto:${t.editorEmail}`}
            style={{ fontSize: '0.95rem', fontWeight: 700, color: '#2563eb', textDecoration: 'none' }}
          >
            {t.editorEmail}
          </a>
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md, 10px)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <MapPin color="#7c3aed" size={24} style={{ marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--color-secondary)' }}>
            {language === 'en' ? 'Bureau Office' : language === 'hi' ? 'ब्यूरो कार्यालय' : 'मुख्य ब्युरो कार्यालय'}
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>
            {t.editorOffice}
          </p>
        </div>
      </div>
    </div>
  );
};
