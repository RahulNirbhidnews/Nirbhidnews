import { apiClient } from './client';
import { Article, PaginatedResponse } from '../types';

export interface ArticleListParams {
  page?: number;
  limit?: number;
  category?: string;
  category_id?: string;
  status?: string;
  search?: string;
  featured?: boolean;
  breaking?: boolean;
  is_featured?: boolean;
  is_breaking?: boolean;
}

export interface ArticleInput {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  featured_image_url?: string;
  featured_image_path?: string;
  category_id: string;
  author_name?: string;
  status?: string;
  is_featured?: boolean;
  is_breaking?: boolean;
  published_at?: string;
}

export const articleApi = {
  getPublicArticles: async (params: ArticleListParams = {}): Promise<PaginatedResponse<Article>> => {
    const response = await apiClient.get<PaginatedResponse<Article>>('/articles', { params });
    return response.data;
  },

  getArticleBySlug: async (slug: string): Promise<Article> => {
    const response = await apiClient.get<Article>(`/articles/${slug}`);
    return response.data;
  },

  getFeaturedArticles: async (limit: number = 5): Promise<Article[]> => {
    const response = await apiClient.get<Article[]>('/articles/featured', { params: { limit } });
    return response.data;
  },

  getBreakingArticles: async (limit: number = 5): Promise<Article[]> => {
    const response = await apiClient.get<Article[]>('/articles/breaking', { params: { limit } });
    return response.data;
  },

  getAdminArticles: async (params: ArticleListParams = {}): Promise<PaginatedResponse<Article>> => {
    const response = await apiClient.get<PaginatedResponse<Article>>('/admin/articles', { params });
    return response.data;
  },

  getAdminArticleById: async (id: string): Promise<Article> => {
    const response = await apiClient.get<Article>(`/admin/articles/${id}`);
    return response.data;
  },

  createArticle: async (data: ArticleInput): Promise<Article> => {
    const response = await apiClient.post<Article>('/admin/articles', data);
    return response.data;
  },

  updateArticle: async (id: string, data: Partial<ArticleInput>): Promise<Article> => {
    const response = await apiClient.put<Article>(`/admin/articles/${id}`, data);
    return response.data;
  },

  publishArticle: async (id: string): Promise<Article> => {
    const response = await apiClient.patch<Article>(`/admin/articles/${id}/publish`);
    return response.data;
  },

  archiveArticle: async (id: string): Promise<Article> => {
    const response = await apiClient.patch<Article>(`/admin/articles/${id}/archive`);
    return response.data;
  },

  deleteArticle: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/articles/${id}`);
  },
};
