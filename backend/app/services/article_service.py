import math
from datetime import datetime, timezone
from typing import Optional, Tuple, List
from uuid import UUID
from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select, func, or_
from app.models.article import Article
from app.models.category import Category
from app.models.user import User
from app.schemas.article import ArticleCreate, ArticleUpdate, ArticleResponse
from app.utils.slug import generate_slug


def get_public_articles(
    db: Session,
    page: int = 1,
    limit: int = 12,
    category_slug: Optional[str] = None,
    search: Optional[str] = None,
    featured: Optional[bool] = None,
    breaking: Optional[bool] = None,
) -> Tuple[List[Article], int, int]:
    """Retrieve published articles for public readers with filtering and pagination."""
    page = max(1, page)
    limit = max(1, min(100, limit))
    offset = (page - 1) * limit

    base_query = (
        select(Article)
        .join(Category, Category.id == Article.category_id)
        .options(joinedload(Article.category), joinedload(Article.author))
        .where(Article.status == "published", Category.is_active == True)
    )
    count_query = (
        select(func.count(Article.id))
        .join(Category, Category.id == Article.category_id)
        .where(Article.status == "published", Category.is_active == True)
    )

    if category_slug:
        base_query = base_query.where(Category.slug == category_slug.lower().strip())
        count_query = count_query.where(Category.slug == category_slug.lower().strip())

    if search:
        search_term = f"%{search.strip()}%"
        filter_expr = or_(
            Article.title.ilike(search_term),
            Article.excerpt.ilike(search_term),
            Article.content.ilike(search_term),
        )
        base_query = base_query.where(filter_expr)
        count_query = count_query.where(filter_expr)

    if featured is not None:
        base_query = base_query.where(Article.is_featured == featured)
        count_query = count_query.where(Article.is_featured == featured)

    if breaking is not None:
        base_query = base_query.where(Article.is_breaking == breaking)
        count_query = count_query.where(Article.is_breaking == breaking)

    total = db.scalar(count_query) or 0
    total_pages = math.ceil(total / limit) if total > 0 else 1

    articles = list(
        db.scalars(
            base_query.order_by(Article.published_at.desc(), Article.created_at.desc())
            .offset(offset)
            .limit(limit)
        ).all()
    )

    return articles, total, total_pages


def get_public_article_by_slug(db: Session, slug: str) -> Article:
    """Retrieve a single published article by slug."""
    stmt = (
        select(Article)
        .join(Category, Category.id == Article.category_id)
        .options(joinedload(Article.category), joinedload(Article.author))
        .where(
            Article.slug == slug.lower().strip(),
            Article.status == "published",
            Category.is_active == True,
        )
    )
    article = db.scalar(stmt)
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Article '{slug}' not found or is not currently published.",
        )
    return article


def get_public_featured_articles(db: Session, limit: int = 5) -> List[Article]:
    """Retrieve top featured published articles."""
    stmt = (
        select(Article)
        .join(Category, Category.id == Article.category_id)
        .options(joinedload(Article.category), joinedload(Article.author))
        .where(
            Article.status == "published",
            Article.is_featured == True,
            Category.is_active == True,
        )
        .order_by(Article.published_at.desc())
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def get_public_breaking_articles(db: Session, limit: int = 5) -> List[Article]:
    """Retrieve latest breaking published articles."""
    stmt = (
        select(Article)
        .join(Category, Category.id == Article.category_id)
        .options(joinedload(Article.category), joinedload(Article.author))
        .where(
            Article.status == "published",
            Article.is_breaking == True,
            Category.is_active == True,
        )
        .order_by(Article.published_at.desc())
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def get_admin_articles(
    db: Session,
    page: int = 1,
    limit: int = 20,
    status_filter: Optional[str] = None,
    category_id: Optional[UUID] = None,
    search: Optional[str] = None,
    is_featured: Optional[bool] = None,
    is_breaking: Optional[bool] = None,
) -> Tuple[List[Article], int, int]:
    """Retrieve paginated articles for admin CMS across all statuses (draft, published, archived)."""
    page = max(1, page)
    limit = max(1, min(100, limit))
    offset = (page - 1) * limit

    base_query = (
        select(Article)
        .options(joinedload(Article.category), joinedload(Article.author))
    )
    count_query = select(func.count(Article.id))

    if status_filter and status_filter.lower() != "all":
        base_query = base_query.where(Article.status == status_filter.lower().strip())
        count_query = count_query.where(Article.status == status_filter.lower().strip())

    if category_id:
        base_query = base_query.where(Article.category_id == category_id)
        count_query = count_query.where(Article.category_id == category_id)

    if search:
        search_term = f"%{search.strip()}%"
        filter_expr = or_(
            Article.title.ilike(search_term),
            Article.slug.ilike(search_term),
            Article.excerpt.ilike(search_term),
            Article.content.ilike(search_term),
            Article.author_name.ilike(search_term),
        )
        base_query = base_query.where(filter_expr)
        count_query = count_query.where(filter_expr)

    if is_featured is not None:
        base_query = base_query.where(Article.is_featured == is_featured)
        count_query = count_query.where(Article.is_featured == is_featured)

    if is_breaking is not None:
        base_query = base_query.where(Article.is_breaking == is_breaking)
        count_query = count_query.where(Article.is_breaking == is_breaking)

    total = db.scalar(count_query) or 0
    total_pages = math.ceil(total / limit) if total > 0 else 1

    articles = list(
        db.scalars(
            base_query.order_by(Article.updated_at.desc(), Article.created_at.desc())
            .offset(offset)
            .limit(limit)
        ).all()
    )

    return articles, total, total_pages


def get_admin_article_by_id(db: Session, article_id: UUID) -> Article:
    """Retrieve an article by UUID for admin editing."""
    stmt = (
        select(Article)
        .options(joinedload(Article.category), joinedload(Article.author))
        .where(Article.id == article_id)
    )
    article = db.scalar(stmt)
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Article with ID '{article_id}' not found",
        )
    return article


def create_article(db: Session, article_in: ArticleCreate, author: User) -> Article:
    """Create a new news article."""
    # Verify category
    category = db.scalar(select(Category).where(Category.id == article_in.category_id))
    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Category with ID '{article_in.category_id}' does not exist.",
        )

    # Generate slug
    slug = (
        article_in.slug.strip()
        if article_in.slug and article_in.slug.strip()
        else generate_slug(article_in.title)
    )

    # Check slug uniqueness
    existing_slug = db.scalar(select(Article).where(Article.slug == slug))
    if existing_slug:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Article slug '{slug}' is already taken. Please customize the slug.",
        )

    # Determine publishing date
    published_at = article_in.published_at
    if article_in.status == "published" and published_at is None:
        published_at = datetime.now(timezone.utc)

    article = Article(
        title=article_in.title.strip(),
        slug=slug,
        excerpt=article_in.excerpt.strip() if article_in.excerpt else None,
        content=article_in.content.strip(),
        featured_image_url=article_in.featured_image_url.strip() if article_in.featured_image_url else None,
        featured_image_path=article_in.featured_image_path.strip() if article_in.featured_image_path else None,
        category_id=category.id,
        author_id=author.id,
        author_name=article_in.author_name.strip() if article_in.author_name else (author.full_name or author.email),
        status=article_in.status.lower().strip(),
        is_featured=article_in.is_featured,
        is_breaking=article_in.is_breaking,
        published_at=published_at,
    )
    db.add(article)
    db.commit()
    db.refresh(article)
    return article


def update_article(
    db: Session, article_id: UUID, article_in: ArticleUpdate
) -> Article:
    """Update an existing article."""
    article = get_admin_article_by_id(db, article_id)

    # Validate category if changed
    if article_in.category_id is not None:
        category = db.scalar(select(Category).where(Category.id == article_in.category_id))
        if not category:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Category with ID '{article_in.category_id}' does not exist.",
            )
        article.category_id = category.id

    # Handle title & slug
    if article_in.title is not None:
        article.title = article_in.title.strip()

    if article_in.slug is not None:
        new_slug = article_in.slug.strip()
        if new_slug != article.slug:
            existing_slug = db.scalar(
                select(Article).where(Article.slug == new_slug, Article.id != article_id)
            )
            if existing_slug:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Article slug '{new_slug}' is already taken.",
                )
            article.slug = new_slug

    if article_in.excerpt is not None:
        article.excerpt = article_in.excerpt.strip() if article_in.excerpt else None

    if article_in.content is not None:
        article.content = article_in.content.strip()

    if article_in.featured_image_url is not None:
        article.featured_image_url = article_in.featured_image_url.strip() if article_in.featured_image_url else None

    if article_in.featured_image_path is not None:
        article.featured_image_path = article_in.featured_image_path.strip() if article_in.featured_image_path else None

    if article_in.author_name is not None:
        article.author_name = article_in.author_name.strip() if article_in.author_name else None

    if article_in.is_featured is not None:
        article.is_featured = article_in.is_featured

    if article_in.is_breaking is not None:
        article.is_breaking = article_in.is_breaking

    # Handle status transition
    if article_in.status is not None:
        new_status = article_in.status.lower().strip()
        if new_status == "published" and article.status != "published" and article.published_at is None:
            article.published_at = datetime.now(timezone.utc)
        article.status = new_status

    if article_in.published_at is not None:
        article.published_at = article_in.published_at

    db.commit()
    db.refresh(article)
    return article


def publish_article(db: Session, article_id: UUID) -> Article:
    """Publish an article immediately."""
    article = get_admin_article_by_id(db, article_id)
    article.status = "published"
    if article.published_at is None:
        article.published_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(article)
    return article


def archive_article(db: Session, article_id: UUID) -> Article:
    """Archive an article, removing it from public feeds."""
    article = get_admin_article_by_id(db, article_id)
    article.status = "archived"
    db.commit()
    db.refresh(article)
    return article


def delete_article(db: Session, article_id: UUID) -> None:
    """Delete an article."""
    article = get_admin_article_by_id(db, article_id)
    db.delete(article)
    db.commit()
