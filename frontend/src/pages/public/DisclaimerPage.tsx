import React from 'react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-brand)', color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>
        Disclaimer
      </h1>
      <div style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.8 }}>
        <p style={{ marginBottom: '1.25rem' }}>
          The information provided on Nirbhid News is published in good faith and for general journalistic reporting and public awareness purposes only.
        </p>
        <p style={{ marginBottom: '1.25rem' }}>
          While our editorial team makes every effort to verify facts and present objective information, Nirbhid News makes no warranties about the completeness, reliability, or absolute accuracy of third-party statements or opinions expressed by columnists.
        </p>
      </div>
    </div>
  );
};
