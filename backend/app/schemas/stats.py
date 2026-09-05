from pydantic import BaseModel
from typing import List, Optional
from app.schemas.article import ArticleResponse


class DailyTrend(BaseModel):
    date: str
    views: int
    visitors: int


class TopArticleStat(BaseModel):
    id: str
    title: str
    category: str
    views: int
    status: str


class CategoryStat(BaseModel):
    id: str
    name: str
    slug: str
    article_count: int
    percentage: float


class DeviceStat(BaseModel):
    mobile_pct: int
    desktop_pct: int
    tablet_pct: int


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
    total_ads: int
    active_ads: int
    total_visitors: int
    today_visitors: int
    live_active_readers: int
    daily_trends: List[DailyTrend]
    top_articles: List[TopArticleStat]
    category_distribution: List[CategoryStat]
    device_breakdown: DeviceStat
    recent_articles: List[ArticleResponse]
