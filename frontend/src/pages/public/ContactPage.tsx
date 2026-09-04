import React from 'react';
import { Mail, MapPin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-brand)', color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>
        Contact Nirbhid News
      </h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Reach out to our newsroom, editorial desk, or administrative bureau for press releases, news tips, and inquiries.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
          <Mail color="#dc2626" size={24} style={{ marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Newsroom Email</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>editorial@nirbhidnews.com</p>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
          <MapPin color="#dc2626" size={24} style={{ marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Bureau Location</h3>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Mumbai / Thane, Maharashtra, India</p>
        </div>
      </div>
    </div>
  );
};
