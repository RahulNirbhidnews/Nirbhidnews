from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.category import CategoryResponse
from app.services import category_service

router = APIRouter()


@router.get("", response_model=List[CategoryResponse], status_code=status.HTTP_200_OK, summary="List Active Categories")
def list_categories(db: Session = Depends(get_db)):
    """Retrieve all active categories for the public reader navigation and categorization."""
    return category_service.get_public_categories(db)


@router.get("/{slug}", response_model=CategoryResponse, status_code=status.HTTP_200_OK, summary="Get Category Details")
def get_category_by_slug(slug: str, db: Session = Depends(get_db)):
    """Retrieve details of an active category by its slug."""
    return category_service.get_category_by_slug(db, slug=slug)
