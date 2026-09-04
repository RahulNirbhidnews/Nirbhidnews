import { apiClient } from './client';
import { Category, PaginatedResponse } from '../types';

export interface CategoryAdminItem extends Category {
  article_count: number;
}

export interface CategoryListParams {
  page?: number;
  limit?: number;
  search?: string;
  is_active?: boolean;
}

export interface CategoryInput {
  name: string;
  slug?: string;
  description?: string;
  is_active?: boolean;
}

export const categoryApi = {
  getPublicCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/categories');
    return response.data;
  },

  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const response = await apiClient.get<Category>(`/categories/${slug}`);
    return response.data;
  },

  getAdminCategories: async (params: CategoryListParams = {}): Promise<PaginatedResponse<CategoryAdminItem>> => {
    const response = await apiClient.get<PaginatedResponse<CategoryAdminItem>>('/admin/categories', {
      params,
    });
    return response.data;
  },

  createCategory: async (data: CategoryInput): Promise<Category> => {
    const response = await apiClient.post<Category>('/admin/categories', data);
    return response.data;
  },

  updateCategory: async (id: string, data: Partial<CategoryInput>): Promise<Category> => {
    const response = await apiClient.put<Category>(`/admin/categories/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/categories/${id}`);
  },
};
