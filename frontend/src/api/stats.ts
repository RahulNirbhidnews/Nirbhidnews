import { apiClient } from './client';
import { Article } from '../types';

export interface DailyTrend {
  date: string;
  views: number;
  visitors: number;
}

export interface TopArticleStat {
  id: string;
  title: string;
  category: string;
  views: number;
  status: string;
}

export interface CategoryStat {
  id: string;
  name: string;
  slug: string;
  article_count: number;
  percentage: number;
}

export interface DeviceStat {
  mobile_pct: number;
  desktop_pct: number;
  tablet_pct: number;
}

export interface AdminStats {
  total_articles: number;
  published_articles: number;
  draft_articles: number;
  archived_articles: number;
  featured_articles: number;
  breaking_articles: number;
  total_categories: number;
  active_categories: number;
  total_media: number;
  total_media_size_bytes: number;
  total_ads?: number;
  active_ads?: number;
  total_visitors?: number;
  today_visitors?: number;
  live_active_readers?: number;
  daily_trends?: DailyTrend[];
  top_articles?: TopArticleStat[];
  category_distribution?: CategoryStat[];
  device_breakdown?: DeviceStat;
  recent_articles: Article[];
}

export const statsApi = {
  getAdminStats: async (): Promise<AdminStats> => {
    const response = await apiClient.get<AdminStats>('/admin/stats');
    return response.data;
  },
};
