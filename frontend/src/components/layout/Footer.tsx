import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              NIRBHID <span>NEWS</span>
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Nirbhid News is a dedicated digital journalism platform committed to fearless, objective,
              and truthful reporting across Maharashtra, India, and around the globe.
            </p>
          </div>

          <div>
            <div className="footer-title">Categories</div>
            <ul className="footer-links">
              <li><Link to="/category/maharashtra">Maharashtra</Link></li>
              <li><Link to="/category/mumbai">Mumbai</Link></li>
              <li><Link to="/category/crime">Crime</Link></li>
              <li><Link to="/category/politics">Politics</Link></li>
              <li><Link to="/category/world">World News</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-title">Company</div>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-title">Editorial CMS</div>
            <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
              Authorized journalists and editors can manage publications via the administrative portal.
            </p>
            <Link to="/admin/login" className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
              Admin Login
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Nirbhid News. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
