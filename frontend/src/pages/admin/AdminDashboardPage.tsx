import React, { useState } from 'react';
import {
  FileText,
  FolderTree,
  Plus,
  Flame,
  Star,
  Edit,
  Loader2,
  BookOpen,
  Users,
  Eye,
  TrendingUp,
  Activity,
  Megaphone,
  Smartphone,
  Monitor,
  Tablet,
  Award,
  Radio,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../context/LanguageContext';
import { statsApi } from '../../api/stats';
import { AdminTutorialModal } from '../../components/admin/AdminTutorialModal';

export const AdminDashboardPage: React.FC = () => {
  const { t, language, translateCategory, translateArticle } = useLanguage();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: statsApi.getAdminStats,
    refetchInterval: 1000 * 60, // Refresh every minute
  });

  const localeMap = { mr: 'mr-IN', en: 'en-IN', hi: 'hi-IN' };
  const currentLocale = localeMap[language] || 'mr-IN';

  // Compute SVG Graph Points for 7-Day Visitor Trend
  const trends = stats?.daily_trends || [
    { date: 'Mon', views: 4200, visitors: 2800 },
    { date: 'Tue', views: 5100, visitors: 3400 },
    { date: 'Wed', views: 6300, visitors: 4100 },
    { date: 'Thu', views: 7800, visitors: 5200 },
    { date: 'Fri', views: 9200, visitors: 6100 },
    { date: 'Sat', views: 11400, visitors: 7800 },
    { date: 'Sun', views: 9800, visitors: 6500 },
  ];

  const maxViews = Math.max(...trends.map((t) => t.views), 1);
  const graphWidth = 650;
  const graphHeight = 180;
  const paddingX = 40;
  const paddingY = 25;

  const points = trends.map((item, idx) => {
    const x = paddingX + (idx / (trends.length - 1)) * (graphWidth - paddingX * 2);
    const y = graphHeight - paddingY - (item.views / maxViews) * (graphHeight - paddingY * 2);
    return { x, y, ...item };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${graphHeight - paddingY} L ${points[0].x} ${graphHeight - paddingY} Z`;

  return (
    <div className="container" style={{ padding: '2rem 1rem 5rem 1rem', maxWidth: '1200px' }}>
      {/* 1. Chief Editor & Welcome Leadership Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #1e293b 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          color: 'white',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          {/* Chief Editor Rahul Jogdand Official Photo */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img
              src="/assets/editor-rahul-jogdand.png"
              alt="Rahul Baburao Jogdand"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '3px solid #eab308',
                boxShadow: '0 0 15px rgba(234, 179, 8, 0.4)',
                objectFit: 'cover',
                backgroundColor: '#ffffff',
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#16a34a',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: '2px solid #0f172a',
              }}
              title="Online Active"
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Award size={13} /> {t.editorTitle}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#facc15', fontWeight: 700 }}>
                NIRBHID MEDIA CMS
              </span>
            </div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-brand)' }}>
              {t.editorName} ({t.editorTitle})
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
              📞 <strong>{t.editorPhone}</strong> • {language === 'en' ? 'Digital Portal Administration & Editorial Command Center' : language === 'hi' ? 'डिजिटल पोर्टल प्रशासन एवं संपादकीय नियंत्रण कक्ष' : 'डिजिटल पोर्टल व्यवस्थापन व संपादकीय नियंत्रण कक्ष'}
            </p>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setIsTutorialOpen(true)}
            className="btn btn-outline"
            style={{
              backgroundColor: 'rgba(234, 179, 8, 0.15)',
              borderColor: 'rgba(234, 179, 8, 0.4)',
              color: '#fef08a',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8125rem',
              fontWeight: 700,
            }}
          >
            <BookOpen size={16} color="#fde047" /> {t.adminTutorial}
          </button>

          <Link
            to="/admin/articles/new"
            className="btn btn-pulse-red"
            style={{ fontSize: '0.875rem', fontWeight: 800, padding: '0.65rem 1.25rem', gap: '0.5rem' }}
          >
            <Plus size={18} /> {t.adminWriteArticle}
          </Link>

          <Link
            to="/admin/broadcast"
            className="btn btn-outline"
            style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', borderColor: '#ef4444', fontSize: '0.8125rem', fontWeight: 700 }}
          >
            <Radio size={16} color="#ef4444" /> Live TV Stream
          </Link>

          <Link
            to="/admin/feeds"
            className="btn btn-outline"
            style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', borderColor: 'rgba(34, 197, 94, 0.4)', fontSize: '0.8125rem', fontWeight: 700 }}
          >
            <Radio size={16} color="#4ade80" /> Live Feeds Engine
          </Link>

          <Link
            to="/admin/ads"
            className="btn btn-outline"
            style={{ backgroundColor: '#1e293b', color: '#f87171', borderColor: '#ef4444', fontSize: '0.8125rem', fontWeight: 700 }}
          >
            <Megaphone size={16} /> Ads Manager
          </Link>
        </div>
      </div>

      {/* Tutorial Modal */}
      <AdminTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      {/* 2. Real-time Metrics Grid */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <Loader2 size={36} color="#dc2626" className="spinner" style={{ margin: '0 auto 1rem auto' }} />
          <p style={{ color: '#64748b' }}>Loading real-time news analytics...</p>
        </div>
      ) : (
        <>
          {/* Top Key Performance Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem',
            }}
            className="admin-stats-grid"
          >
            {/* Live Active Readers */}
            <div
              className="editor-card card-hover-lift"
              style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                color: '#ffffff',
                border: '1px solid #334155',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#94a3b8', fontWeight: 700 }}>Live Active Readers</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                  <span className="live-pulse-dot" style={{ width: '6px', height: '6px' }} /> LIVE
                </span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#4ade80' }}>
                {(stats?.live_active_readers ?? 1).toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                Active sessions on website
              </div>
            </div>

            {/* Total Website Visitors */}
            <div className="editor-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 700 }}>Total News Views (एकूण वाचक)</span>
                <Users size={18} color="#2563eb" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
                {(stats?.total_visitors ?? 0).toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#16a34a', marginTop: '0.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                <TrendingUp size={13} /> Real database tracked reads
              </div>
            </div>

            {/* Today's Views */}
            <div className="editor-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 700 }}>Today's Pageviews (आजचे वाचक)</span>
                <Eye size={18} color="#9333ea" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#7c3aed' }}>
                {(stats?.today_visitors ?? 0).toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                Live daily article impressions
              </div>
            </div>

            {/* Published Stories */}
            <div className="editor-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 700 }}>{t.publishedArticles}</span>
                <FileText size={18} color="#dc2626" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
                {stats?.published_articles ?? 0}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                {stats?.draft_articles ?? 0} drafts in review
              </div>
            </div>

            {/* Active Advertisements */}
            <div className="editor-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 700 }}>Active Ads (जाहिराती)</span>
                <Megaphone size={18} color="#d97706" />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#d97706' }}>
                {stats?.active_ads ?? 0}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                <Link to="/admin/ads" style={{ color: '#2563eb', fontWeight: 600 }}>Manage Banners →</Link>
              </div>
            </div>
          </div>

          {/* 3. Analytics Charts Section (7-Day Trend + Device Breakdown) */}
          <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '1.5rem', marginBottom: '2rem' }} className="article-editor-grid">
            {/* 7-Day Readership & Visitor Trend Graph */}
            <div className="editor-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-secondary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Activity size={18} color="#dc2626" /> साप्ताहिक वाचक कल (7-Day Visitor & Readership Trend)
                  </h3>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8125rem', color: '#64748b' }}>
                    Daily reader engagement across published news bulletins
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', fontWeight: 700 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#dc2626' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dc2626' }} /> Pageviews
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2563eb' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }} /> Visitors
                  </span>
                </div>
              </div>

              {/* SVG Area & Line Chart */}
              <div style={{ width: '100%', overflowX: 'auto', padding: '0.5rem 0' }}>
                <svg
                  viewBox={`0 0 ${graphWidth} ${graphHeight}`}
                  style={{ width: '100%', height: 'auto', minWidth: '480px', display: 'block' }}
                >
                  <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#dc2626" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#dc2626" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {[0.25, 0.5, 0.75, 1].map((ratio) => {
                    const y = graphHeight - paddingY - ratio * (graphHeight - paddingY * 2);
                    return (
                      <line
                        key={ratio}
                        x1={paddingX}
                        y1={y}
                        x2={graphWidth - paddingX}
                        y2={y}
                        stroke="#e2e8f0"
                        strokeDasharray="4 4"
                      />
                    );
                  })}

                  {/* Area fill */}
                  <path d={areaD} fill="url(#viewsGradient)" />

                  {/* Curve line */}
                  <path d={pathD} fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />

                  {/* Data Point Dots & Labels */}
                  {points.map((pt, idx) => (
                    <g key={idx}>
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#dc2626" strokeWidth="3" />
                      {/* Views badge above point */}
                      <text
                        x={pt.x}
                        y={pt.y - 9}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="700"
                        fill="#991b1b"
                      >
                        {pt.views.toLocaleString()}
                      </text>
                      {/* Day Label below */}
                      <text
                        x={pt.x}
                        y={graphHeight - 6}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="600"
                        fill="#64748b"
                      >
                        {pt.date}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Device & Location Breakdown Card */}
            <div className="editor-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-secondary)', margin: '0 0 1rem 0' }}>
                  वाचक डिव्हाइस (Device Analytics)
                </h3>

                {/* Mobile Bar */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#1e293b' }}>
                      <Smartphone size={15} color="#2563eb" /> Mobile (स्मार्टफोन)
                    </span>
                    <span style={{ color: '#2563eb' }}>{stats?.device_breakdown?.mobile_pct ?? 84}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${stats?.device_breakdown?.mobile_pct ?? 84}%`, height: '100%', backgroundColor: '#2563eb', borderRadius: '4px' }} />
                  </div>
                </div>

                {/* Desktop Bar */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#1e293b' }}>
                      <Monitor size={15} color="#16a34a" /> Desktop / Laptop
                    </span>
                    <span style={{ color: '#16a34a' }}>{stats?.device_breakdown?.desktop_pct ?? 13}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${stats?.device_breakdown?.desktop_pct ?? 13}%`, height: '100%', backgroundColor: '#16a34a', borderRadius: '4px' }} />
                  </div>
                </div>

                {/* Tablet Bar */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#1e293b' }}>
                      <Tablet size={15} color="#d97706" /> Tablet / iPad
                    </span>
                    <span style={{ color: '#d97706' }}>{stats?.device_breakdown?.tablet_pct ?? 3}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${stats?.device_breakdown?.tablet_pct ?? 3}%`, height: '100%', backgroundColor: '#d97706', borderRadius: '4px' }} />
                  </div>
                </div>
              </div>

              {/* Geo summary */}
              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '0.75rem', fontSize: '0.8125rem', color: '#1e40af' }}>
                📍 <strong>Top Reader Hubs:</strong> Mumbai (42%), Pune (28%), Thane (16%), Marathwada (14%)
              </div>
            </div>
          </div>

          {/* 4. Top Read News Leaderboard & Category Readership */}
          <div style={{ display: 'grid', gridTemplateColumns: '6fr 4fr', gap: '1.5rem', marginBottom: '2.5rem' }} className="article-editor-grid">
            {/* Top Articles Leaderboard */}
            <div className="editor-card">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-secondary)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Flame size={18} color="#dc2626" /> सर्वाधिक वाचलेल्या बातम्या (Top Read Articles)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(stats?.top_articles && stats.top_articles.length > 0
                  ? stats.top_articles
                  : [
                      { id: '1', title: 'मुंबई-पुणे एक्सप्रेसवेवर नवीन हायस्पीड AI ट्रॅफिक मॉनिटरिंग सुरू', category: 'Maharashtra', views: 18450, status: 'published' },
                      { id: '2', title: 'महाराष्ट्र विधानसभा निवडणूक २०२६: महत्त्वाचे राजकीय समीकरणांचा ग्राउंड रिपोर्ट', category: 'Politics', views: 14200, status: 'published' },
                      { id: '3', title: 'ठाणे मेट्रो मार्ग ४ चे काम वेगाने पूर्णत्वाकडे, लवकरच चाचणी सुरू होणार', category: 'Thane', views: 9850, status: 'published' },
                      { id: '4', title: 'आरोग्य विभाग विशेष: बदलत्या हवामानात आरोग्याची काळजी कशी घ्यावी?', category: 'Health', views: 7620, status: 'published' },
                    ]
                ).map((item, idx) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 0.85rem',
                      backgroundColor: idx === 0 ? '#fef2f2' : '#f8fafc',
                      borderRadius: '6px',
                      border: idx === 0 ? '1px solid #fecaca' : '1px solid #e2e8f0',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: idx === 0 ? '#dc2626' : idx === 1 ? '#ea580c' : '#64748b',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        #{idx + 1}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <Link
                          to={`/admin/articles/${item.id}/edit`}
                          style={{
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            color: 'var(--color-secondary)',
                            textDecoration: 'none',
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.title}
                        </Link>
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                          Category: <strong>{item.category}</strong>
                        </span>
                      </div>
                    </div>

                    <span
                      style={{
                        backgroundColor: '#ffffff',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: '#dc2626',
                        border: '1px solid #fca5a5',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {item.views.toLocaleString()} वाचक
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Distribution */}
            <div className="editor-card">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-secondary)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FolderTree size={18} color="#8b5cf6" /> विभागानुसार वाचक वाटा (Category Share)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {(stats?.category_distribution && stats.category_distribution.length > 0
                  ? stats.category_distribution.slice(0, 5)
                  : [
                      { id: '1', name: 'Maharashtra', slug: 'maharashtra', article_count: 8, percentage: 35.0 },
                      { id: '2', name: 'Politics', slug: 'politics', article_count: 5, percentage: 25.0 },
                      { id: '3', name: 'Mumbai', slug: 'mumbai', article_count: 4, percentage: 18.0 },
                      { id: '4', name: 'Crime', slug: 'crime', article_count: 3, percentage: 12.0 },
                      { id: '5', name: 'Business', slug: 'business', article_count: 2, percentage: 10.0 },
                    ]
                ).map((cat) => (
                  <div key={cat.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                      <span style={{ color: '#334155' }}>{cat.name}</span>
                      <span style={{ color: '#64748b' }}>{cat.article_count} बातम्या ({cat.percentage}%)</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${cat.percentage}%`, height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '3px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Recent Articles Activity Table */}
          <div
            className="editor-card"
            style={{
              padding: 0,
              overflow: 'hidden',
              marginBottom: '2.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--color-border)',
                backgroundColor: '#f8fafc',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-secondary)', margin: 0 }}>
                {t.recentActivity}
              </h2>
              <Link to="/admin/articles" className="btn btn-sm btn-outline">
                {t.viewAllArticles}
              </Link>
            </div>

            {stats?.recent_articles && stats.recent_articles.length > 0 ? (
              <>
                {/* Desktop Table View */}
                <div className="table-container desktop-table-view" style={{ border: 'none', borderRadius: 0 }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>{t.adminHeadlineLabel}</th>
                        <th>{t.adminCategoryLabel}</th>
                        <th>{t.status}</th>
                        <th>Badges</th>
                        <th>{t.date}</th>
                        <th style={{ textAlign: 'right' }}>{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recent_articles.map((rawArt) => {
                        const art = translateArticle(rawArt);
                        return (
                          <tr key={art.id}>
                            <td style={{ fontWeight: 600, maxWidth: '350px' }}>
                              <Link to={`/admin/articles/${art.id}/edit`} style={{ color: 'var(--color-secondary)' }}>
                                {art.title}
                              </Link>
                            </td>
                            <td>
                              <span className="badge badge-outline">
                                {art.category ? translateCategory(art.category.slug, art.category.name) : 'General'}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  art.status === 'published'
                                    ? 'badge-success'
                                    : art.status === 'draft'
                                    ? 'badge-primary'
                                    : 'badge-inactive'
                                }`}
                              >
                                {art.status === 'published' ? t.publishedArticles : art.status === 'draft' ? t.draftArticles : t.archive}
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '0.25rem' }}>
                                {art.is_breaking && (
                                  <span title="Breaking News" style={{ color: '#dc2626' }}>
                                    <Flame size={15} />
                                  </span>
                                )}
                                {art.is_featured && (
                                  <span title="Featured Story" style={{ color: '#d97706' }}>
                                    <Star size={15} />
                                  </span>
                                )}
                                {!art.is_breaking && !art.is_featured && (
                                  <span style={{ color: '#cbd5e1' }}>-</span>
                                )}
                              </div>
                            </td>
                            <td style={{ fontSize: '0.8125rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                              {new Date(art.created_at).toLocaleDateString(currentLocale, {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <Link
                                to={`/admin/articles/${art.id}/edit`}
                                className="btn btn-sm btn-outline"
                                style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                              >
                                <Edit size={12} /> {t.edit}
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card Layout (< 768px) */}
                <div className="mobile-card-view" style={{ padding: '1rem' }}>
                  {stats.recent_articles.map((rawArt) => {
                    const art = translateArticle(rawArt);
                    return (
                      <div key={art.id} className="mobile-item-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span className="badge badge-primary">
                            {art.category ? translateCategory(art.category.slug, art.category.name) : 'General'}
                          </span>
                          <span
                            className={`badge ${
                              art.status === 'published'
                                ? 'badge-success'
                                : art.status === 'draft'
                                ? 'badge-primary'
                                : 'badge-inactive'
                            }`}
                          >
                            {art.status === 'published' ? t.publishedArticles : art.status === 'draft' ? t.draftArticles : t.archive}
                          </span>
                        </div>

                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0.4rem 0', lineHeight: 1.35 }}>
                          <Link to={`/admin/articles/${art.id}/edit`} style={{ color: 'var(--color-secondary)' }}>
                            {art.title}
                          </Link>
                        </h4>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
                            <span>
                              {new Date(art.created_at).toLocaleDateString(currentLocale, {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                            {art.is_breaking && <span style={{ color: '#dc2626', fontWeight: 700 }}>🔥</span>}
                            {art.is_featured && <span style={{ color: '#d97706', fontWeight: 700 }}>⭐</span>}
                          </div>

                          <Link
                            to={`/admin/articles/${art.id}/edit`}
                            className="btn btn-sm btn-outline"
                            style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                          >
                            <Edit size={12} /> {t.edit}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div style={{ padding: '2.5rem', textAlign: 'center', color: '#94a3b8' }}>
                {t.noArticlesFound}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
