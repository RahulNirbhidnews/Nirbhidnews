from typing import Optional
from uuid import UUID
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.core.dependencies import get_current_admin
from app.schemas.category import (
    CategoryCreate,
    CategoryUpdate,
    CategoryResponse,
    CategoryAdminResponse,
    CategoryListResponse,
)
from app.services import category_service

router = APIRouter()


@router.get("", response_model=CategoryListResponse, status_code=status.HTTP_200_OK, summary="Admin List Categories")
def get_categories(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    search: Optional[str] = Query(None, description="Search term for name or slug"),
    is_active: Optional[bool] = Query(None, description="Filter by active status"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    """Retrieve paginated category list with article counts for administrative management."""
    items, total, total_pages = category_service.get_admin_categories(
        db, page=page, limit=limit, search=search, is_active=is_active
    )
    return CategoryListResponse(
        items=items,
        page=page,
        limit=limit,
        total=total,
        total_pages=total_pages,
    )


@router.post("", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED, summary="Create Category")
def create_category(
    category_in: CategoryCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    """Create a new news category."""
    category = category_service.create_category(db, category_in=category_in)
    return category


@router.put("/{category_id}", response_model=CategoryResponse, status_code=status.HTTP_200_OK, summary="Update Category")
def update_category(
    category_id: UUID,
    category_in: CategoryUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    """Update category properties (name, slug, description, active status)."""
    return category_service.update_category(
        db, category_id=category_id, category_in=category_in
    )


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete Category")
def delete_category(
    category_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    """Delete a category if it has no associated articles."""
    category_service.delete_category(db, category_id=category_id)
    return None
