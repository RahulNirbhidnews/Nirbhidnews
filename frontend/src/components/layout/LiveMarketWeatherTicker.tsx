import React from 'react';
import { CloudSun, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LiveMarketWeatherTicker: React.FC = () => {
  const { language, t } = useLanguage();

  const cities = [
    { name: language === 'mr' ? 'मुंबई' : language === 'hi' ? 'मुंबई' : 'Mumbai', temp: '29°C', condition: 'Sunny' },
    { name: language === 'mr' ? 'ठाणे' : language === 'hi' ? 'ठाणे' : 'Thane', temp: '28°C', condition: 'Partly Cloudy' },
    { name: language === 'mr' ? 'पुणे' : language === 'hi' ? 'पुणे' : 'Pune', temp: '26°C', condition: 'Clear' },
    { name: language === 'mr' ? 'नागपूर' : language === 'hi' ? 'नागपुर' : 'Nagpur', temp: '31°C', condition: 'Sunny' },
  ];

  const marketData = [
    { name: 'SENSEX', val: '81,950.40', change: '+320.15', isUp: true },
    { name: 'NIFTY 50', val: '25,120.85', change: '+95.40', isUp: true },
    { name: 'GOLD (24K)', val: '₹73,850/10g', change: '-120.00', isUp: false },
    { name: 'USD/INR', val: '₹83.94', change: '-0.02', isUp: false },
  ];

  return (
    <div
      style={{
        backgroundColor: '#090d16',
        color: '#94a3b8',
        fontSize: '0.725rem',
        borderBottom: '1px solid #1e293b',
        padding: '0.35rem 0',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        {/* Weather Segment */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#e2e8f0', fontWeight: 600 }}>
            <CloudSun size={13} color="#f59e0b" />
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.weather}:</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {cities.map((c) => (
              <span key={c.name} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                <strong style={{ color: '#cbd5e1' }}>{c.name}</strong> {c.temp}
              </span>
            ))}
          </div>
        </div>

        {/* Financial Market Segment */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#e2e8f0', fontWeight: 600 }}>
            <TrendingUp size={13} color="#22c55e" />
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.marketPulse}:</span>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            {marketData.map((m) => (
              <span key={m.name} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{m.name}:</span> {m.val}
                <span style={{ color: m.isUp ? '#4ade80' : '#f87171', fontWeight: 700, fontSize: '0.7rem' }}>
                  {m.change}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
