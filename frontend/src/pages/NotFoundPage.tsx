import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '5rem 1.25rem' }}>
      <AlertCircle size={56} color="#dc2626" style={{ marginBottom: '1rem' }} />
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>
        404 — Page Not Found
      </h1>
      <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
        The news article or page you are looking for does not exist or has been relocated.
      </p>
      <Link to="/" className="btn btn-primary">
        Return to Homepage
      </Link>
    </div>
  );
};
