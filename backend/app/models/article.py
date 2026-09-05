import uuid
from datetime import datetime
from typing import Optional, TYPE_CHECKING
from sqlalchemy import String, Text, Boolean, DateTime, Integer, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, GUID, TimestampMixin

if TYPE_CHECKING:
    from app.models.category import Category
    from app.models.user import User


class Article(Base, TimestampMixin):
    __tablename__ = "articles"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID,
        primary_key=True,
        default=uuid.uuid4,
    )
    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    slug: Mapped[str] = mapped_column(
        String(300),
        unique=True,
        index=True,
        nullable=False,
    )
    excerpt: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )
    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
    featured_image_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )
    featured_image_path: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )
    video_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )
    category_id: Mapped[uuid.UUID] = mapped_column(
        GUID,
        ForeignKey("categories.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )
    author_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        GUID,
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    author_name: Mapped[Optional[str]] = mapped_column(
        String(255),
        nullable=True,
    )
    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="draft",
        index=True,
    )
    is_featured: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        index=True,
    )
    is_breaking: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        index=True,
    )
    view_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
        index=True,
    )
    published_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
        index=True,
    )

    # Relationships
    category: Mapped["Category"] = relationship(
        "Category",
        back_populates="articles",
    )
    author: Mapped[Optional["User"]] = relationship(
        "User",
        back_populates="articles",
    )

    __table_args__ = (
        Index("ix_articles_status_published_at", "status", "published_at"),
        Index("ix_articles_category_status", "category_id", "status"),
    )

    def __repr__(self) -> str:
        return f"<Article id={self.id} title={self.title[:30]} status={self.status}>"
