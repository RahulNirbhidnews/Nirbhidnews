import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { LiveMarketWeatherTicker } from './LiveMarketWeatherTicker';
import { BreakingPopupModal } from '../news/BreakingPopupModal';
import { LiveBroadcastBar } from '../news/LiveBroadcastBar';
import { NewsAlertsToast } from '../news/NewsAlertsToast';
import { RollingTopProgressBar } from '../common/RollingTopProgressBar';
import { ScrollToTop } from '../common/ScrollToTop';

export const MainLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <RollingTopProgressBar />
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

