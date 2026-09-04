import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-brand)', color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>
        Terms of Service
      </h1>
      <div style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.8 }}>
        <p style={{ marginBottom: '1.25rem' }}>
          Welcome to Nirbhid News. By accessing or using our website and editorial content, you agree to comply with and be bound by the following terms and conditions.
        </p>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--color-secondary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
          1. Intellectual Property
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          All original articles, reporting, photographs, graphics, and trademarks published on Nirbhid News are the property of Nirbhid News or its credited contributors.
        </p>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--color-secondary)', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
          2. Permitted Use
        </h2>
        <p style={{ marginBottom: '1rem' }}>
          Content may be shared for non-commercial personal awareness using the integrated social sharing features with appropriate attribution.
        </p>
      </div>
    </div>
  );
};
