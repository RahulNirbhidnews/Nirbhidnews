import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { LiveMarketWeatherTicker } from './LiveMarketWeatherTicker';
import { BreakingPopupModal } from '../news/BreakingPopupModal';
import { LiveBroadcastBar } from '../news/LiveBroadcastBar';
import { NewsAlertsToast } from '../news/NewsAlertsToast';

export const MainLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <LiveMarketWeatherTicker />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <BreakingPopupModal />
      <LiveBroadcastBar />
      <NewsAlertsToast />
    </div>
  );
};
