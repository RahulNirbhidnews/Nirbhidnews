from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, select
from app.db.session import get_db
from app.models.user import User
from app.models.article import Article
from app.models.category import Category
from app.models.media import Media
from app.schemas.stats import AdminStatsResponse
from app.schemas.article import ArticleResponse
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/admin/stats", tags=["Admin Stats"])


@router.get("", response_model=AdminStatsResponse)
def get_admin_dashboard_stats(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Get aggregated dashboard metrics for administrative overview.
    Requires admin privileges.
    """
    # Article counts
    total_articles = db.scalar(select(func.count()).select_from(Article)) or 0
    published_articles = (
        db.scalar(
            select(func.count())
            .select_from(Article)
            .where(Article.status == "published")
        )
        or 0
    )
    draft_articles = (
        db.scalar(
            select(func.count())
            .select_from(Article)
            .where(Article.status == "draft")
        )
        or 0
    )
    archived_articles = (
        db.scalar(
            select(func.count())
            .select_from(Article)
            .where(Article.status == "archived")
        )
        or 0
    )
    featured_articles = (
        db.scalar(
            select(func.count())
            .select_from(Article)
            .where(Article.is_featured == True)  # noqa: E712
        )
        or 0
    )
    breaking_articles = (
        db.scalar(
            select(func.count())
            .select_from(Article)
            .where(Article.is_breaking == True)  # noqa: E712
        )
        or 0
    )

    # Category counts
    total_categories = db.scalar(select(func.count()).select_from(Category)) or 0
    active_categories = (
        db.scalar(
            select(func.count())
            .select_from(Category)
            .where(Category.is_active == True)  # noqa: E712
        )
        or 0
    )

    # Media counts & storage size
    total_media = db.scalar(select(func.count()).select_from(Media)) or 0
    total_media_size = db.scalar(select(func.sum(Media.file_size))) or 0

    # Recent 5 articles
    recent_articles = (
        db.scalars(
            select(Article)
            .order_by(Article.created_at.desc())
            .limit(5)
        )
        .all()
    )

    return AdminStatsResponse(
        total_articles=total_articles,
        published_articles=published_articles,
        draft_articles=draft_articles,
        archived_articles=archived_articles,
        featured_articles=featured_articles,
        breaking_articles=breaking_articles,
        total_categories=total_categories,
        active_categories=active_categories,
        total_media=total_media,
        total_media_size_bytes=int(total_media_size),
        recent_articles=[ArticleResponse.model_validate(a) for a in recent_articles],
    )
