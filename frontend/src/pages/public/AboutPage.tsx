import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-brand)', color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>
        About Nirbhid News
      </h1>
      <div style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.8 }}>
        <p style={{ marginBottom: '1.25rem' }}>
          <strong>Nirbhid News (निर्भीड न्यूज)</strong> is an independent digital news platform founded on the principles
          of integrity, fearless reporting, and uncompromising truth.
        </p>
        <p style={{ marginBottom: '1.25rem' }}>
          Our mission is to bring verified, timely, and unbiased news to citizens across Maharashtra, India, and the world.
          From grassroots regional developments to international geopolitics, our editorial desk upholds the highest standards
          of journalistic ethics.
        </p>
        <h2 style={{ fontSize: '1.35rem', color: 'var(--color-secondary)', marginTop: '2rem', marginBottom: '1rem' }}>
          Our Editorial Pillars
        </h2>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Accuracy First:</strong> Thorough verification prior to publication.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Fearless & Independent:</strong> Free from partisan and commercial biases.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Regional & Global:</strong> Deep coverage of Maharashtra alongside international perspective.</li>
        </ul>
      </div>
    </div>
  );
};
