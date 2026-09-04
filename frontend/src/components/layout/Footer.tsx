import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import { categoryApi } from '../../api/categories';

export const Footer: React.FC = () => {
  const { data: categories } = useQuery({
    queryKey: ['public-categories'],
    queryFn: categoryApi.getPublicCategories,
  });

  const displayCategories = categories && categories.length > 0
    ? categories.slice(0, 6)
    : [
        { name: 'महाराष्ट्र', slug: 'maharashtra' },
        { name: 'मुंबई', slug: 'mumbai' },
        { name: 'राजकारण', slug: 'politics' },
        { name: 'गुन्हेगारी', slug: 'crime' },
        { name: 'व्यापार', slug: 'business' },
        { name: 'क्रीडा', slug: 'sports' },
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
              निष्पक्ष आणि निर्भीड पत्रकारिता
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', lineHeight: 1.6, color: '#94a3b8' }}>
              निर्भीड न्यूज हे महाराष्ट्रातील अग्रगण्य डिजिटल वृत्त माध्यम असून सत्य, पारदर्शकता आणि जनहिताच्या पत्रकारितेसाठी कटिबद्ध आहे.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8125rem', color: '#cbd5e1' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={13} color="#fca5a5" /> मुंबई / ठाणे, महाराष्ट्र
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={13} color="#fca5a5" /> editor@nirbhidnews.com
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={13} color="#fca5a5" /> +91 98765 43210 (बातम्या व जाहिरातींसाठी)
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="footer-title">बातम्या विभाग</div>
            <ul className="footer-links">
              {displayCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
                </li>
              ))}
              <li>
                <Link to="/search" style={{ color: '#fca5a5', fontWeight: 600 }}>सर्व विभाग पाहा →</Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <div className="footer-title">माहिती व कायदेशीर</div>
            <ul className="footer-links">
              <li><Link to="/about">आमच्याबद्दल (About Us)</Link></li>
              <li><Link to="/contact">संपर्क (Contact Us)</Link></li>
              <li><Link to="/privacy-policy">गोपनीयता धोरण (Privacy Policy)</Link></li>
              <li><Link to="/terms">नियम व अटी (Terms & Conditions)</Link></li>
              <li><Link to="/disclaimer">संपादकीय डिस्क्लेमर (Disclaimer)</Link></li>
            </ul>
          </div>

          {/* Editorial CMS Portal */}
          <div>
            <div className="footer-title">संपादकीय पोर्टल</div>
            <p style={{ fontSize: '0.875rem', marginBottom: '1rem', color: '#94a3b8' }}>
              अधिकृत बातमीदार आणि उपसंपादकांसाठी बातमी संकलन आणि व्यवस्थापन प्रणाली.
            </p>
            <Link
              to="/admin/login"
              className="btn btn-primary"
              style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Shield size={14} /> Admin Login
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Nirbhid News (निर्भीड न्यूज). All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
