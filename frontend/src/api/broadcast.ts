import { apiClient } from './client';

export interface BroadcastSetting {
  id: string;
  youtube_url: string;
  is_active: boolean;
  title: string;
  channel_name: string;
  updated_at: string;
}

export interface BroadcastSettingUpdate {
  youtube_url?: string;
  is_active?: boolean;
  title?: string;
  channel_name?: string;
}

export const broadcastApi = {
  // Public Reader endpoint
  getPublicBroadcast: async (): Promise<BroadcastSetting> => {
    const res = await apiClient.get<BroadcastSetting>('/broadcast');
    return res.data;
  },

  // Admin CMS endpoint
  getAdminBroadcast: async (): Promise<BroadcastSetting> => {
    const res = await apiClient.get<BroadcastSetting>('/admin/broadcast');
    return res.data;
  },

  // Admin CMS update endpoint
  updateAdminBroadcast: async (data: BroadcastSettingUpdate): Promise<BroadcastSetting> => {
    const res = await apiClient.put<BroadcastSetting>('/admin/broadcast', data);
    return res.data;
  },
};
