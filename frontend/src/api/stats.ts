import { apiClient } from './client';
import { Article } from '../types';

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
  recent_articles: Article[];
}

export const statsApi = {
  getAdminStats: async (): Promise<AdminStats> => {
    const response = await apiClient.get<AdminStats>('/admin/stats');
    return response.data;
  },
};
