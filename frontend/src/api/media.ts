import { apiClient } from './client';
import { Media, PaginatedResponse } from '../types';

export const mediaApi = {
  uploadMedia: async (file: File): Promise<Media> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<Media>('/admin/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getAdminMedia: async (page: number = 1, limit: number = 24): Promise<PaginatedResponse<Media>> => {
    const response = await apiClient.get<PaginatedResponse<Media>>('/admin/media', {
      params: { page, limit },
    });
    return response.data;
  },

  deleteMedia: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/media/${id}`);
  },
};
