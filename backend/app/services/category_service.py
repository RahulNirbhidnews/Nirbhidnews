import math
from typing import Optional, Tuple, List
from uuid import UUID
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select, func, or_
from app.models.category import Category
from app.models.article import Article
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryAdminResponse
from app.utils.slug import generate_slug


def get_public_categories(db: Session) -> List[Category]:
    """Retrieve all active categories for public readers ordered by name."""
    stmt = select(Category).where(Category.is_active == True).order_by(Category.name.asc())
    return list(db.scalars(stmt).all())


def get_category_by_slug(db: Session, slug: str) -> Category:
    """Retrieve an active category by its slug or raise 404."""
    stmt = select(Category).where(Category.slug == slug.lower().strip(), Category.is_active == True)
    category = db.scalar(stmt)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with slug '{slug}' not found",
        )
    return category


def get_admin_categories(
    db: Session,
    page: int = 1,
    limit: int = 20,
    search: Optional[str] = None,
    is_active: Optional[bool] = None,
) -> Tuple[List[CategoryAdminResponse], int, int]:
    """Retrieve paginated categories with article counts for administrative management."""
    page = max(1, page)
    limit = max(1, min(100, limit))
    offset = (page - 1) * limit

    # Base query for counting articles per category
    base_query = (
        select(Category, func.count(Article.id).label("article_count"))
        .outerjoin(Article, Article.category_id == Category.id)
        .group_by(Category.id)
    )

    count_query = select(func.count(Category.id))

    # Apply search filter
    if search:
        search_term = f"%{search.strip()}%"
        filter_expr = or_(
            Category.name.ilike(search_term),
            Category.slug.ilike(search_term),
            Category.description.ilike(search_term),
        )
        base_query = base_query.where(filter_expr)
        count_query = count_query.where(filter_expr)

    # Apply active status filter
    if is_active is not None:
        base_query = base_query.where(Category.is_active == is_active)
        count_query = count_query.where(Category.is_active == is_active)

    total = db.scalar(count_query) or 0
    total_pages = math.ceil(total / limit) if total > 0 else 1

    results = db.execute(
        base_query.order_by(Category.name.asc()).offset(offset).limit(limit)
    ).all()

    items: List[CategoryAdminResponse] = []
    for cat, count in results:
        items.append(
            CategoryAdminResponse(
                id=cat.id,
                name=cat.name,
                slug=cat.slug,
                description=cat.description,
                is_active=cat.is_active,
                created_at=cat.created_at,
                updated_at=cat.updated_at,
                article_count=count,
            )
        )

    return items, total, total_pages


def create_category(db: Session, category_in: CategoryCreate) -> Category:
    """Create a new category with slug generation and uniqueness validation."""
    name = category_in.name.strip()
    slug = (
        category_in.slug.strip()
        if category_in.slug and category_in.slug.strip()
        else generate_slug(name)
    )

    # Validate name uniqueness
    existing_name = db.scalar(
        select(Category).where(func.lower(Category.name) == name.lower())
    )
    if existing_name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Category with name '{name}' already exists",
        )

    # Validate slug uniqueness
    existing_slug = db.scalar(select(Category).where(Category.slug == slug))
    if existing_slug:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Category with slug '{slug}' already exists",
        )

    category = Category(
        name=name,
        slug=slug,
        description=category_in.description.strip() if category_in.description else None,
        is_active=category_in.is_active,
    )
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


def update_category(
    db: Session, category_id: UUID, category_in: CategoryUpdate
) -> Category:
    """Update an existing category with uniqueness checks."""
    category = db.scalar(select(Category).where(Category.id == category_id))
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with ID '{category_id}' not found",
        )

    # Check name uniqueness if updated
    if category_in.name is not None:
        new_name = category_in.name.strip()
        if new_name.lower() != category.name.lower():
            existing = db.scalar(
                select(Category).where(
                    func.lower(Category.name) == new_name.lower(),
                    Category.id != category_id,
                )
            )
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Category with name '{new_name}' already exists",
                )
            category.name = new_name
            # If slug was not explicitly provided in update, update slug automatically
            if category_in.slug is None:
                category.slug = generate_slug(new_name)

    # Check slug uniqueness if updated
    if category_in.slug is not None:
        new_slug = category_in.slug.strip()
        if new_slug != category.slug:
            existing_slug = db.scalar(
                select(Category).where(
                    Category.slug == new_slug, Category.id != category_id
                )
            )
            if existing_slug:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Category with slug '{new_slug}' already exists",
                )
            category.slug = new_slug

    if category_in.description is not None:
        category.description = (
            category_in.description.strip() if category_in.description else None
        )

    if category_in.is_active is not None:
        category.is_active = category_in.is_active

    db.commit()
    db.refresh(category)
    return category


def delete_category(db: Session, category_id: UUID) -> None:
    """Safely delete a category or reject if articles are attached."""
    category = db.scalar(select(Category).where(Category.id == category_id))
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with ID '{category_id}' not found",
        )

    # Count linked articles
    article_count = db.scalar(
        select(func.count(Article.id)).where(Article.category_id == category_id)
    ) or 0

    if article_count > 0:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                f"Cannot delete category '{category.name}' because {article_count} "
                "article(s) are attached to it. Please reassign or delete the articles first, "
                "or deactivate this category instead."
            ),
        )

    db.delete(category)
    db.commit()
