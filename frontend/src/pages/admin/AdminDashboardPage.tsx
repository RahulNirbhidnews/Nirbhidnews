import React from 'react';
import { LayoutDashboard, FileText, FolderTree, Image } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
            Editorial CMS Dashboard
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Nirbhid News MVP — Foundation & Database Architecture Ready
          </p>
        </div>
        <Link to="/" className="btn btn-outline">
          View Live Website
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        {[
          { label: 'Total Articles', value: '0', icon: FileText, color: '#3b82f6' },
          { label: 'Published News', value: '0', icon: LayoutDashboard, color: '#22c55e' },
          { label: 'Configured Categories', value: '13', icon: FolderTree, color: '#eab308' },
          { label: 'Media Assets', value: '0', icon: Image, color: '#a855f7' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} style={{
              background: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 600 }}>{item.label}</span>
                <Icon size={18} color={item.color} />
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
