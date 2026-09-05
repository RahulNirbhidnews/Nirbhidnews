import React, { useState, useEffect } from 'react';
import {
  Radio,
  RefreshCw,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  Globe2,
  MapPin,
  Layers,
  AlertCircle,
  FileCheck2,
  Loader2,
} from 'lucide-react';
import { apiClient } from '../../api/client';

interface SourceItem {
  name: string;
  category: string;
  language: string;
}

interface SyncLog {
  timestamp: string;
  added: number;
  skipped: number;
  status: string;
}

interface FeedEngineStatus {
  status: string;
  is_enabled: boolean;
  sync_interval_seconds: number;
  auto_publish: boolean;
  last_sync_at: string | null;
  last_sync_status: string;
  total_ingested: number;
  sources_count: number;
  configured_sources: SourceItem[];
  recent_logs: SyncLog[];
}

export const AdminFeedSyncPage: React.FC = () => {
  const [data, setData] = useState<FeedEngineStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchStatus = async () => {
    try {
      const res = await apiClient.get('/admin/feeds/status');
      setData(res.data);
    } catch (err: any) {
      console.error('Failed to load feed status', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000); // Poll status every 15s
    return () => clearInterval(interval);
  }, []);

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setFeedbackMsg(null);
    try {
      const res = await apiClient.post('/admin/feeds/sync-now');
      setFeedbackMsg({
        type: 'success',
        text: `Sync Successful! Added ${res.data.added_count} new articles (Skipped ${res.data.skipped_count} existing).`,
      });
      await fetchStatus();
    } catch (err: any) {
      setFeedbackMsg({
        type: 'error',
        text: err.response?.data?.detail || 'Failed to trigger feed sync.',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleToggleEnabled = async (enabled: boolean) => {
    try {
      await apiClient.put('/admin/feeds/settings', { is_enabled: enabled });
      setFeedbackMsg({
        type: 'success',
        text: enabled ? 'News Ingestion Engine Activated!' : 'News Ingestion Engine Paused.',
      });
      await fetchStatus();
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: 'Failed to update engine status.' });
    }
  };

  const handleIntervalChange = async (seconds: number) => {
    try {
      await apiClient.put('/admin/feeds/settings', { sync_interval_seconds: seconds });
      setFeedbackMsg({
        type: 'success',
        text: `Sync interval updated to every ${seconds >= 60 ? `${seconds / 60} min` : `${seconds}s`}.`,
      });
      await fetchStatus();
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: 'Failed to update interval.' });
    }
  };

  const handleAutoPublishChange = async (autoPublish: boolean) => {
    try {
      await apiClient.put('/admin/feeds/settings', { auto_publish: autoPublish });
      setFeedbackMsg({
        type: 'success',
        text: autoPublish
          ? 'Mode: Directly Publish Live Articles immediately.'
          : 'Mode: Save new incoming feeds as Drafts for manual review.',
      });
      await fetchStatus();
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: 'Failed to update publish mode.' });
    }
  };

  if (isLoading && !data) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <Loader2 size={36} color="#dc2626" className="spinner" style={{ margin: '0 auto 1rem auto' }} />
        <p style={{ color: '#64748b' }}>Loading Live News Feed Engine...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem 5rem 1rem', maxWidth: '1200px' }}>
      {/* 1. Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #1e293b 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          color: 'white',
          marginBottom: '2rem',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(220, 38, 38, 0.25)', border: '1px solid rgba(220, 38, 38, 0.5)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, color: '#fca5a5', marginBottom: '0.75rem' }}>
            <Radio size={14} className="spinner" /> LIVE AUTO-INGESTION ENGINE
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
            World & State News Automation (२४ तास लाईव्ह बातम्या)
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.5rem', maxWidth: '650px' }}>
            Continuously aggregates breaking news from verified World, Maharashtra, and Mumbai RSS feeds into the Nirbhid News database every minute with deduplication and auto-categorization.
          </p>
        </div>

        {/* Sync Action Button */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleSyncNow}
            disabled={isSyncing}
            className="btn btn-primary"
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '0.9375rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)',
            }}
          >
            <RefreshCw size={18} className={isSyncing ? 'spinner' : ''} />
            {isSyncing ? 'Syncing Feeds...' : 'Sync World & State News Now'}
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            backgroundColor: feedbackMsg.type === 'success' ? '#f0fdf4' : '#fef2f2',
            border: `1px solid ${feedbackMsg.type === 'success' ? '#86efac' : '#fca5a5'}`,
            color: feedbackMsg.type === 'success' ? '#166534' : '#991b1b',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {feedbackMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {feedbackMsg.text}
        </div>
      )}

      {/* 2. Top Metrics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
        className="admin-stats-grid"
      >
        {/* Engine Status */}
        <div className="editor-card" style={{ background: '#0f172a', color: 'white', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: '#94a3b8', fontWeight: 700 }}>Engine Status</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: data?.is_enabled ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: data?.is_enabled ? '#4ade80' : '#f87171',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 800,
              }}
            >
              {data?.is_enabled ? <Play size={12} /> : <Pause size={12} />}
              {data?.is_enabled ? 'ACTIVE (चालू)' : 'PAUSED (बंद)'}
            </span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: data?.is_enabled ? '#4ade80' : '#f87171' }}>
            {data?.is_enabled ? 'Auto-Syncing' : 'Paused'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Every {data?.sync_interval_seconds ? `${data.sync_interval_seconds / 60} minute(s)` : '1 min'}
          </div>
        </div>

        {/* Total Ingested */}
        <div className="editor-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 700 }}>Total Ingested Stories</span>
            <Layers size={18} color="#2563eb" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-secondary)' }}>
            {(data?.total_ingested ?? 0).toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16a34a', marginTop: '0.25rem', fontWeight: 600 }}>
            Live in PostgreSQL database
          </div>
        </div>

        {/* Auto Publish Mode */}
        <div className="editor-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 700 }}>Publishing Pipeline</span>
            <FileCheck2 size={18} color="#eab308" />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: data?.auto_publish ? '#16a34a' : '#ea580c' }}>
            {data?.auto_publish ? 'Direct Live' : 'Review Draft'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            {data?.auto_publish ? 'Auto-published immediately' : 'Saved for editor review'}
          </div>
        </div>

        {/* Last Sync Time */}
        <div className="editor-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 700 }}>Last Sync Activity</span>
            <Clock size={18} color="#0891b2" />
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
            {data?.last_sync_at ? new Date(data.last_sync_at).toLocaleTimeString() : 'Pending'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            {data?.last_sync_status || 'Waiting for cycle'}
          </div>
        </div>
      </div>

      {/* 3. Automation Controls & Sources Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Settings Form */}
        <div className="editor-card">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
            ⚙️ Ingestion Engine Settings
          </h2>

          {/* Master Enable/Disable */}
          <div style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Background Auto-Sync</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Poll configured feeds in background without intervention</div>
            </div>
            <button
              type="button"
              onClick={() => handleToggleEnabled(!data?.is_enabled)}
              className={data?.is_enabled ? 'btn btn-outline' : 'btn btn-primary'}
              style={{ fontSize: '0.8125rem', fontWeight: 700 }}
            >
              {data?.is_enabled ? 'Pause Engine' : 'Activate Engine'}
            </button>
          </div>

          {/* Interval Selector */}
          <div style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.5rem' }}>Sync Frequency (वेळ मध्यांतर)</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Every 1 Min (Recommended)', value: 60 },
                { label: 'Every 2 Min', value: 120 },
                { label: 'Every 5 Min', value: 300 },
                { label: 'Every 15 Min', value: 900 },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleIntervalChange(opt.value)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    border: data?.sync_interval_seconds === opt.value ? '2px solid #dc2626' : '1px solid #cbd5e1',
                    backgroundColor: data?.sync_interval_seconds === opt.value ? '#fef2f2' : '#ffffff',
                    color: data?.sync_interval_seconds === opt.value ? '#dc2626' : '#334155',
                    cursor: 'pointer',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auto Publish Mode */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.5rem' }}>Default Status on Ingestion</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleAutoPublishChange(true)}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  border: data?.auto_publish ? '2px solid #16a34a' : '1px solid #cbd5e1',
                  backgroundColor: data?.auto_publish ? '#f0fdf4' : '#ffffff',
                  color: data?.auto_publish ? '#16a34a' : '#334155',
                  cursor: 'pointer',
                }}
              >
                ✓ Directly Publish (Live On Website)
              </button>
              <button
                type="button"
                onClick={() => handleAutoPublishChange(false)}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  border: !data?.auto_publish ? '2px solid #ea580c' : '1px solid #cbd5e1',
                  backgroundColor: !data?.auto_publish ? '#fff7ed' : '#ffffff',
                  color: !data?.auto_publish ? '#ea580c' : '#334155',
                  cursor: 'pointer',
                }}
              >
                📝 Save as Draft (Review First)
              </button>
            </div>
          </div>
        </div>

        {/* Configured Feed Sources */}
        <div className="editor-card">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
            📡 Configured Live Feed Channels
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(data?.configured_sources ?? [
              { name: 'Google News - World', category: 'world', language: 'en' },
              { name: 'Google News - Maharashtra (मराठी)', category: 'maharashtra', language: 'mr' },
              { name: 'Google News - Maharashtra (English)', category: 'maharashtra', language: 'en' },
              { name: 'Google News - Mumbai (मुंबई)', category: 'mumbai', language: 'en' },
            ]).map((src, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  {src.category === 'world' ? <Globe2 size={18} color="#2563eb" /> : <MapPin size={18} color="#dc2626" />}
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>{src.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Category: <span style={{ fontWeight: 600, color: '#2563eb' }}>{src.category}</span> • Lang: {src.language.toUpperCase()}
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    backgroundColor: '#dcfce7',
                    color: '#15803d',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                  }}
                >
                  LIVE
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Recent Activity Log Table */}
      <div className="editor-card">
        <h2 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
          📋 Recent Sync Activity Logs
        </h2>

        {(!data?.recent_logs || data.recent_logs.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
            No recent sync logs recorded yet. Click <strong>"Sync World & State News Now"</strong> to trigger the first batch!
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 700 }}>Timestamp</th>
                  <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 700 }}>Articles Ingested</th>
                  <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 700 }}>Duplicates Skipped</th>
                  <th style={{ padding: '0.75rem 1rem', color: '#475569', fontWeight: 700 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_logs.map((log, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#1e293b' }}>{log.timestamp}</td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#16a34a' }}>+{log.added} new stories</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>{log.skipped} skipped</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span
                        style={{
                          backgroundColor: log.status === 'Success' ? '#dcfce7' : '#fee2e2',
                          color: log.status === 'Success' ? '#166534' : '#991b1b',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
