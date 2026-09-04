import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-brand)', color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>
        Privacy Policy
      </h1>
      <div style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.8 }}>
        <p style={{ marginBottom: '1.25rem' }}>
          At Nirbhid News, we are committed to safeguarding the privacy and digital rights of our readers.
          This Privacy Policy outlines the types of information we collect, how it is used, and the steps we take to protect your data.
        </p>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--color-secondary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
          1. Information We Collect
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          We do not require personal identification details to access public news articles. Basic analytics (page views, browser type) may be recorded to optimize website performance.
        </p>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--color-secondary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
          2. Cookies and Storage
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          We use minimal local storage and session tokens strictly necessary for administrative functionality and reader preferences.
        </p>
      </div>
    </div>
  );
};
