from typing import Optional
from uuid import UUID
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.core.dependencies import get_current_admin
from app.schemas.article import (
    ArticleCreate,
    ArticleUpdate,
    ArticleResponse,
    ArticleListResponse,
)
from app.services import article_service

router = APIRouter()


@router.get("", response_model=ArticleListResponse, status_code=status.HTTP_200_OK, summary="Admin List Articles")
def get_admin_articles(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    status: Optional[str] = Query(None, description="Filter by status ('draft', 'published', 'archived', 'all')"),
    category_id: Optional[UUID] = Query(None, description="Filter by category UUID"),
    search: Optional[str] = Query(None, description="Search in title, content, or author"),
    is_featured: Optional[bool] = Query(None, description="Filter by featured flag"),
    is_breaking: Optional[bool] = Query(None, description="Filter by breaking flag"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    """Retrieve paginated articles for administrative management across all statuses."""
    items, total, total_pages = article_service.get_admin_articles(
        db,
        page=page,
        limit=limit,
        status_filter=status,
        category_id=category_id,
        search=search,
        is_featured=is_featured,
        is_breaking=is_breaking,
    )
    return ArticleListResponse(
        items=items,
        page=page,
        limit=limit,
        total=total,
        total_pages=total_pages,
    )


@router.post("", response_model=ArticleResponse, status_code=status.HTTP_201_CREATED, summary="Create Article")
def create_article(
    article_in: ArticleCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """Create a new news article (as draft or published)."""
    return article_service.create_article(db, article_in=article_in, author=current_admin)


@router.get("/{article_id}", response_model=ArticleResponse, status_code=status.HTTP_200_OK, summary="Get Article by ID")
def get_article(
    article_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    """Retrieve article details for editing."""
    return article_service.get_admin_article_by_id(db, article_id=article_id)


@router.put("/{article_id}", response_model=ArticleResponse, status_code=status.HTTP_200_OK, summary="Update Article")
def update_article(
    article_id: UUID,
    article_in: ArticleUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    """Update an existing article."""
    return article_service.update_article(db, article_id=article_id, article_in=article_in)


@router.patch("/{article_id}/publish", response_model=ArticleResponse, status_code=status.HTTP_200_OK, summary="Publish Article")
def publish_article(
    article_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    """Transition article status to published and set published timestamp."""
    return article_service.publish_article(db, article_id=article_id)


@router.patch("/{article_id}/archive", response_model=ArticleResponse, status_code=status.HTTP_200_OK, summary="Archive Article")
def archive_article(
    article_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    """Transition article status to archived."""
    return article_service.archive_article(db, article_id=article_id)


@router.delete("/{article_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete Article")
def delete_article(
    article_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    """Permanently delete an article."""
    article_service.delete_article(db, article_id=article_id)
    return None
