import React, { useState, useEffect } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const NewsAlertsToast: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const pref = localStorage.getItem('nirbhid_push_alerts_pref');
    if (pref) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 6000); // Trigger after 6 seconds of browsing

    return () => clearTimeout(timer);
  }, []);

  const handleEnable = () => {
    setIsSubscribed(true);
    localStorage.setItem('nirbhid_push_alerts_pref', 'enabled');
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('nirbhid_dismiss_alerts_session', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="news-alerts-toast-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontWeight: 700, fontSize: '0.8125rem' }}>
          <Bell size={16} />
          <span>{t.pushAlertsTitle}</span>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
        >
          <X size={15} />
        </button>
      </div>

      <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.45, margin: '0 0 0.75rem 0' }}>
        {t.pushAlertsDesc}
      </p>

      {isSubscribed ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#16a34a', fontSize: '0.8125rem', fontWeight: 600 }}>
          <Check size={16} /> Alerts Enabled!
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleEnable}
            className="btn btn-primary"
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', flex: 1 }}
          >
            {t.enableAlerts}
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            style={{
              background: 'transparent',
              border: '1px solid #cbd5e1',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              color: '#64748b',
              padding: '0.35rem 0.6rem',
              cursor: 'pointer',
            }}
          >
            {t.maybeLater}
          </button>
        </div>
      )}
    </div>
  );
};
