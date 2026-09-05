from datetime import datetime
from typing import List, Optional
from uuid import UUID
from pydantic import BaseModel, ConfigDict
from app.schemas.category import CategoryResponse
from app.schemas.user import UserResponse


class ArticleBase(BaseModel):
    title: str
    slug: str
    excerpt: Optional[str] = None
    content: str
    featured_image_url: Optional[str] = None
    featured_image_path: Optional[str] = None
    video_url: Optional[str] = None
    category_id: UUID
    author_name: Optional[str] = None
    status: str = "draft"
    is_featured: bool = False
    is_breaking: bool = False
    view_count: int = 0
    published_at: Optional[datetime] = None


class ArticleCreate(BaseModel):
    title: str
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: str
    featured_image_url: Optional[str] = None
    featured_image_path: Optional[str] = None
    video_url: Optional[str] = None
    category_id: UUID
    author_name: Optional[str] = None
    status: str = "draft"
    is_featured: bool = False
    is_breaking: bool = False
    published_at: Optional[datetime] = None


class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    featured_image_url: Optional[str] = None
    featured_image_path: Optional[str] = None
    video_url: Optional[str] = None
    category_id: Optional[UUID] = None
    author_name: Optional[str] = None
    status: Optional[str] = None
    is_featured: Optional[bool] = None
    is_breaking: Optional[bool] = None
    published_at: Optional[datetime] = None


class ArticleResponse(ArticleBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    author_id: Optional[UUID] = None
    created_at: datetime
    updated_at: datetime
    category: Optional[CategoryResponse] = None
    author: Optional[UserResponse] = None


class ArticleListResponse(BaseModel):
    items: List[ArticleResponse]
    page: int
    limit: int
    total: int
    total_pages: int
