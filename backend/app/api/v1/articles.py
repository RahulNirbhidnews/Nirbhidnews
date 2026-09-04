from typing import Optional, List
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.article import ArticleResponse, ArticleListResponse
from app.services import article_service

router = APIRouter()


@router.get("", response_model=ArticleListResponse, status_code=status.HTTP_200_OK, summary="List Published Articles")
def list_articles(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(12, ge=1, le=100, description="Articles per page"),
    category: Optional[str] = Query(None, description="Filter by category slug (e.g. maharashtra, world)"),
    search: Optional[str] = Query(None, description="Search in title, excerpt, and content"),
    featured: Optional[bool] = Query(None, description="Filter by featured stories"),
    breaking: Optional[bool] = Query(None, description="Filter by breaking news"),
    db: Session = Depends(get_db),
):
    """Retrieve published news articles for readers. Drafts and archived items are excluded."""
    items, total, total_pages = article_service.get_public_articles(
        db,
        page=page,
        limit=limit,
        category_slug=category,
        search=search,
        featured=featured,
        breaking=breaking,
    )
    return ArticleListResponse(
        items=items,
        page=page,
        limit=limit,
        total=total,
        total_pages=total_pages,
    )


@router.get("/featured", response_model=List[ArticleResponse], status_code=status.HTTP_200_OK, summary="Top Featured Articles")
def get_featured_articles(
    limit: int = Query(5, ge=1, le=20, description="Max featured articles"),
    db: Session = Depends(get_db),
):
    """Retrieve top featured published stories."""
    return article_service.get_public_featured_articles(db, limit=limit)


@router.get("/breaking", response_model=List[ArticleResponse], status_code=status.HTTP_200_OK, summary="Latest Breaking News")
def get_breaking_articles(
    limit: int = Query(5, ge=1, le=20, description="Max breaking articles"),
    db: Session = Depends(get_db),
):
    """Retrieve latest breaking news items."""
    return article_service.get_public_breaking_articles(db, limit=limit)


@router.get("/{slug}", response_model=ArticleResponse, status_code=status.HTTP_200_OK, summary="Read Article")
def get_article_by_slug(slug: str, db: Session = Depends(get_db)):
    """Retrieve full content of an individual published news article by slug."""
    return article_service.get_public_article_by_slug(db, slug=slug)
