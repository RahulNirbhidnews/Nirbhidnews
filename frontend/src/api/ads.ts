import { apiClient } from './client';

export interface Advertisement {
  id: string;
  title: string;
  client_name?: string;
  image_url: string;
  target_url?: string;
  placement: 'top_header' | 'sidebar' | 'in_article' | 'footer_banner' | string;
  is_active: boolean;
  impressions: number;
  clicks: number;
  created_at: string;
  updated_at: string;
}

export interface AdvertisementInput {
  title: string;
  client_name?: string;
  image_url: string;
  target_url?: string;
  placement: string;
  is_active: boolean;
}

export const adsApi = {
  // Public Ads
  getPublicAds: async (placement?: string): Promise<Advertisement[]> => {
    const params = placement ? { placement } : {};
    const res = await apiClient.get<Advertisement[]>('/ads', { params });
    return res.data;
  },

  trackAdClick: async (id: string): Promise<void> => {
    await apiClient.post(`/ads/${id}/click`);
  },

  // Admin Ads CRUD
  getAdminAds: async (): Promise<Advertisement[]> => {
    const res = await apiClient.get<Advertisement[]>('/admin/ads');
    return res.data;
  },

  createAd: async (data: AdvertisementInput): Promise<Advertisement> => {
    const res = await apiClient.post<Advertisement>('/admin/ads', data);
    return res.data;
  },

  updateAd: async (id: string, data: Partial<AdvertisementInput>): Promise<Advertisement> => {
    const res = await apiClient.put<Advertisement>(`/admin/ads/${id}`, data);
    return res.data;
  },

  deleteAd: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/ads/${id}`);
  },
};
