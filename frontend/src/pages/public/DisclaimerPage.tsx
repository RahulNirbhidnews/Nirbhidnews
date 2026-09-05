import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
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
          {t.disclaimer}
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
            ? 'Journalistic Disclaimer & Corrections'
            : language === 'hi'
            ? 'संपादकीय डिस्क्लेमर (Disclaimer)'
            : 'संपादकीय डिस्क्लेमर (Disclaimer)'}
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          {language === 'en'
            ? 'Editorial transparency and fact-verification statement by Nirbhid News Media Network.'
            : language === 'hi'
            ? 'निर्भीड न्यूज़ मीडिया नेटवर्क की संपादकीय पारदर्शिता एवं तथ्य सत्यापन नीति।'
            : 'निर्भीड न्यूज मीडिया नेटवर्कचे संपादकीय पारदर्शकता व सत्यता धोरण.'}
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
            <CheckCircle2 color="#16a34a" size={20} />
            {language === 'en'
              ? '1. Good Faith Reporting'
              : language === 'hi'
              ? '१. निष्पक्ष एवं प्रामाणिक रिपोर्टिंग'
              : '१. निष्पक्ष व प्रामाणिक वृत्तांकन'}
          </h2>
          <p>
            {language === 'en'
              ? 'All reports, news articles, analysis, and broadcasts published on Nirbhid News are reported in good faith for public interest, transparency, and awareness. While our editorial desk applies rigorous journalistic standards to verify facts, Nirbhid News disclaims liability for inadvertent clerical inaccuracies or evolving official statements.'
              : language === 'hi'
              ? 'निर्भीड न्यूज़ पर प्रकाशित समस्त समाचार, विश्लेषण एवं बुलेटिन जनहित एवं सामाजिक जागरूकता के उद्देश्य से प्रकाशित किए जाते हैं। हमारे संवाददाता तथ्यों की पूरी पुष्टि करते हैं, तथापि किसी अनजाने मुद्रण दोष या बदलती आधिकारिक सूचना के लिए संपादक जिम्मेदार नहीं होंगे।'
              : 'निर्भीड न्यूजवर प्रसिद्ध होणाऱ्या सर्व बातम्या, राजकीय विश्लेषण व बुलेटिन हे जनहित आणि जनजागृतीसाठी निष्पक्षपणे प्रसिद्ध केले जातात. आमचे प्रतिनिधी माहितीची योग्य खातरजमा करतात, तरीही अनपेक्षित प्रशासकीय बदलांसाठी संपादक जबाबदार राहणार नाहीत.'}
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
            <ShieldAlert color="#dc2626" size={20} />
            {language === 'en'
              ? '2. Columnist Opinions & Press Releases'
              : language === 'hi'
              ? '२. लेखकों के विचार एवं प्रेस विज्ञप्तियां'
              : '२. लेखकांची वैयक्तिक मते व प्रेस नोट'}
          </h2>
          <p>
            {language === 'en'
              ? 'Opinions expressed in guest op-eds, citizen letters, and political press releases are solely those of the respective authors or organizations and do not necessarily reflect the official editorial stance of Nirbhid News or its Chief Editor.'
              : language === 'hi'
              ? 'अतिथि स्तंभकारों, विचारकों और प्रेस नोट में व्यक्त किए गए विचार संबंधित व्यक्तियों के अपने हैं, उनसे निर्भीड न्यूज़ अथवा मुख्य संपादक का सहमत होना अनिवार्य नहीं है।'
              : 'विशेष लेख, पत्रव्यवहार व राजकीय प्रसिद्धीपत्रकांमधील मते ही संबंधित लेखक किंवा पक्षाची स्वतःची असतात, त्या मतांशी निर्भीड न्यूजचे संपादक सहमत असतीलच असे नाही.'}
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
            <AlertCircle color="#2563eb" size={20} />
            {language === 'en'
              ? '3. Corrections Policy'
              : language === 'hi'
              ? '३. सुधार नीति (Corrections)'
              : '३. दुरुस्ती व स्पष्टीकरण धोरण'}
          </h2>
          <p>
            {language === 'en'
              ? 'If you find any factual discrepancy in any published story, please contact our Editorial Grievance desk immediately. We take legitimate corrections seriously and update stories promptly.'
              : language === 'hi'
              ? 'यदि किसी समाचार में तथ्यात्मक त्रुटि पाई जाती है, तो कृपया हमारे संपादकीय डेस्क से संपर्क करें। हम तत्काल सत्यापन कर सुधार करने के लिए तत्पर हैं।'
              : 'कोणत्याही बातमीबाबत वस्तुनिष्ठ दुरुस्ती किंवा स्पष्टीकरण असल्यास आमच्या संपादकीय कार्यालयाशी संपर्क साधावा. आम्ही सत्यता तपासून त्वरित दुरुस्ती करतो.'}
          </p>
        </section>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', marginTop: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          <strong>{t.editorTitle}:</strong> {t.editorName} | 📞 {t.editorPhone} | 📧 {t.editorEmail}
        </div>
      </div>
    </div>
  );
};
