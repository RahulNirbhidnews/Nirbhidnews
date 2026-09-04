from pydantic import BaseModel
from typing import List
from app.schemas.article import ArticleResponse


class AdminStatsResponse(BaseModel):
    total_articles: int
    published_articles: int
    draft_articles: int
    archived_articles: int
    featured_articles: int
    breaking_articles: int
    total_categories: int
    active_categories: int
    total_media: int
    total_media_size_bytes: int
    recent_articles: List[ArticleResponse]
