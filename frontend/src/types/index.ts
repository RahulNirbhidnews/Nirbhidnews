export interface HealthCheckResponse {
  status: string;
  app: string;
  environment: string;
  database: string;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featured_image_url?: string | null;
  featured_image_path?: string | null;
  category_id: string;
  author_id?: string | null;
  author_name?: string | null;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  is_breaking: boolean;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Media {
  id: string;
  file_name: string;
  storage_path: string;
  public_url: string;
  mime_type: string;
  file_size: number;
  uploaded_by?: string | null;
  created_at: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}
