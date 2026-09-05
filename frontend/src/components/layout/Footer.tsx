import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Mail, Phone, MapPin } from 'lucide-react';
import { categoryApi } from '../../api/categories';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, translateCategory } = useLanguage();

  const { data: categories } = useQuery({
    queryKey: ['public-categories'],
    queryFn: categoryApi.getPublicCategories,
  });

  const displayCategories = categories && categories.length > 0
    ? categories.slice(0, 6)
    : [
        { name: 'Maharashtra', slug: 'maharashtra' },
        { name: 'Mumbai', slug: 'mumbai' },
        { name: 'Politics', slug: 'politics' },
        { name: 'Crime', slug: 'crime' },
        { name: 'Business', slug: 'business' },
        { name: 'Sports', slug: 'sports' },
      ];

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <div className="footer-brand">
              NIRBHID <span>NEWS</span>
            </div>
            <div style={{ color: '#fca5a5', fontSize: '0.8125rem', fontWeight: 600, marginTop: '0.25rem' }}>
              {t.brandTagline}
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', lineHeight: 1.6, color: '#94a3b8' }}>
              {t.editorialDisclaimer}
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8125rem', color: '#cbd5e1' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#facc15', fontWeight: 700 }}>
                {t.editorTitle}: {t.editorName}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={13} color="#fca5a5" /> {t.editorOffice}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={13} color="#fca5a5" /> {t.editorEmail}
              </span>
              <a href="tel:9922299027" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#f87171', fontWeight: 700, textDecoration: 'none' }}>
                <Phone size={13} color="#fca5a5" /> 📞 {t.editorPhone}
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="footer-title">{t.categories}</div>
            <ul className="footer-links">
              {displayCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`}>
                    {translateCategory(cat.slug, cat.name)}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/search" style={{ color: '#fca5a5', fontWeight: 600 }}>{t.viewAll} →</Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <div className="footer-title">{t.aboutUs} & {t.disclaimer}</div>
            <ul className="footer-links">
              <li><Link to="/about">{t.aboutUs}</Link></li>
              <li><Link to="/contact">{t.contactUs}</Link></li>
              <li><Link to="/privacy-policy">{t.privacyPolicy}</Link></li>
              <li><Link to="/terms">{t.terms}</Link></li>
              <li><Link to="/disclaimer">{t.disclaimer}</Link></li>
            </ul>
          </div>

          {/* Editorial Office & Inquiries */}
          <div>
            <div className="footer-title">वृत्तसंपादक व कार्यालय</div>
            <p style={{ fontSize: '0.875rem', marginBottom: '1rem', color: '#94a3b8', lineHeight: 1.5 }}>
              बातम्या, प्रेस रिलीज किंवा जाहिरातीसाठी निर्भीड न्यूज मुख्य कार्यालयाशी थेट संपर्क साधा.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem' }}>
              <a
                href="tel:9922299027"
                className="btn btn-primary"
                style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontWeight: 700 }}
              >
                <Phone size={14} /> 9922299027 वर कॉल करा
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} {t.brandName}. {t.allRightsReserved}
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/privacy-policy">{t.privacyPolicy}</Link>
            <Link to="/terms">{t.terms}</Link>
            <Link to="/disclaimer">{t.disclaimer}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
