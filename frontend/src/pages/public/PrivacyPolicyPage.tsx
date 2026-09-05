import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
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
          {t.privacyPolicy}
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
            ? 'Privacy Policy & Data Ethics'
            : language === 'hi'
            ? 'गोपनीयता नीति एवं डेटा सुरक्षा'
            : 'गोपनीयता धोरण (Privacy Policy)'}
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          {language === 'en'
            ? 'Last updated: 2026. Nirbhid News is committed to protecting the privacy of its readers in compliance with Digital Ethics & Indian IT Rules.'
            : language === 'hi'
            ? 'अंतिम अपडेट: 2026. निर्भीड न्यूज़ अपने पाठकों की गोपनीयता एवं डेटा सुरक्षा के प्रति पूर्णतः प्रतिबद्ध है।'
            : 'शेवटचे अद्यतन: २०२६. निर्भीड न्यूज आपल्या वाचकांच्या गोपनीयतेचे व डिजिटल हक्कांचे संपूर्ण रक्षण करण्यास वचनबद्ध आहे.'}
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
            <Eye color="#dc2626" size={20} />
            {language === 'en'
              ? '1. Information We Collect'
              : language === 'hi'
              ? '१. एकत्रित की जाने वाली जानकारी'
              : '१. आम्ही कोणती माहिती गोळा करतो?'}
          </h2>
          <p>
            {language === 'en'
              ? 'Nirbhid News provides free, unhindered access to all public news bulletins. We do not require registration or personal identity documents from readers to browse public news articles. We only collect standard anonymous web traffic analytics (such as page views, device type, and regional distribution) to improve reader experience and optimize server delivery.'
              : language === 'hi'
              ? 'निर्भीड न्यूज़ अपने पाठकों को निःशुल्क समाचार सेवा प्रदान करता है। समाचार पढ़ने के लिए किसी व्यक्तिगत पंजीकरण की आवश्यकता नहीं है। हम वेबसाइट के प्रदर्शन को बेहतर बनाने हेतु केवल सामान्य अनामित एनालिटिक्स (पेज व्यूज, डिवाइस प्रकार) दर्ज करते हैं।'
              : 'निर्भीड न्यूजवर सर्व बातम्या मोफत वाचता येतात. बातम्या वाचण्यासाठी वाचकांना कोणतीही वैयक्तिक नोंदणी करणे आवश्यक नाही. केवळ वेबसाइटचा वेग आणि वाचक अनुभव सुधारण्यासाठी आम्ही सामान्य डिजिटल एनालिटिक्स (उदा. व्ह्यूज, डिव्हाइस प्रकार) नोंदवतो.'}
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
            <Lock color="#16a34a" size={20} />
            {language === 'en'
              ? '2. Cookies & Local Storage'
              : language === 'hi'
              ? '२. कुकीज एवं स्थानीय स्टोरेज'
              : '२. कुकीज आणि स्थानिक स्टोरेज'}
          </h2>
          <p>
            {language === 'en'
              ? 'We use minimal browser cookies strictly for language preferences (Marathi, English, Hindi) and secure administrative authentication. We do not sell or monetize personal browsing history to third-party data brokers.'
              : language === 'hi'
              ? 'हम केवल भाषा प्राथमिकता (मराठी, अंग्रेजी, हिंदी) और सुरक्षित व्यवस्थापकीय सत्र के लिए न्यूनतम कुकीज का उपयोग करते हैं। हम किसी तीसरे पक्ष को डेटा नहीं बेचते हैं।'
              : 'आम्ही केवळ भाषा पसंती (मराठी, इंग्रजी, हिंदी) आणि ॲडमिन सुरक्षिततेसाठी आवश्यक मर्यादित कुकीज वापरतो. आम्ही वाचकांचा वैयक्तिक डेटा कोणत्याही त्रयस्थ संस्थेला विकत नाही.'}
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
            <FileText color="#2563eb" size={20} />
            {language === 'en'
              ? '3. Grievance Redressal & Editorial Officer'
              : language === 'hi'
              ? '३. शिकायत निवारण एवं संपादकीय अधिकारी'
              : '३. तक्रार निवारण व संपादकीय अधिकारी'}
          </h2>
          <p>
            {language === 'en'
              ? 'In accordance with Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, any grievance regarding news content, privacy, or correction can be directly submitted to:'
              : language === 'hi'
              ? 'सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश एवं डिजिटल मीडिया आचार संहिता) के अनुसार किसी भी समाचार या गोपनीयता संबंधी शिकायत के लिए सीधे संपर्क करें:'
              : 'माहिती तंत्रज्ञान व डिजिटल मीडिया आचारसंहितेनुसार कोणत्याही बातमीच्या मजकुराबाबत अथवा गोपनीयतेबाबत तक्रार असल्यास खालील संपादकीय अधिकाऱ्यांशी थेट संपर्क साधावा:'}
          </p>
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '1.25rem',
              marginTop: '0.75rem',
            }}
          >
            <div style={{ fontWeight: 800, color: 'var(--color-secondary)', fontSize: '1.05rem', marginBottom: '0.35rem' }}>
              {t.editorName}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#dc2626', fontWeight: 700, marginBottom: '0.5rem' }}>
              {t.editorTitle} & Grievance Officer, NIRBHID NEWS
            </div>
            <div style={{ fontSize: '0.875rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span>📞 फोन: {t.editorPhone}</span>
              <span>📧 ई-मेल: {t.editorEmail}</span>
              <span>📍 कार्यालय: {t.editorOffice}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
