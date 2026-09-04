import uuid
from datetime import datetime, timezone
import pytest
from sqlalchemy.exc import IntegrityError
from app.models.user import User
from app.models.category import Category
from app.models.article import Article
from app.models.media import Media
from app.core.security import get_password_hash, verify_password


def test_user_creation_and_password_hashing(db_session):
    raw_password = "SecretPassword123!"
    hashed = get_password_hash(raw_password)
    assert verify_password(raw_password, hashed)

    user = User(
        email="reporter@nirbhidnews.com",
        password_hash=hashed,
        full_name="Staff Reporter",
        role="editor",
        is_active=True,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    assert user.id is not None
    assert isinstance(user.id, uuid.UUID)
    assert user.email == "reporter@nirbhidnews.com"
    assert user.role == "editor"
    assert user.is_active is True
    assert user.created_at is not None
    assert user.updated_at is not None


def test_user_unique_email_constraint(db_session):
    user1 = User(
        email="unique@nirbhidnews.com",
        password_hash="hash1",
        full_name="User One",
    )
    db_session.add(user1)
    db_session.commit()

    user2 = User(
        email="unique@nirbhidnews.com",
        password_hash="hash2",
        full_name="User Two",
    )
    db_session.add(user2)
    with pytest.raises(IntegrityError):
        db_session.commit()
    db_session.rollback()


def test_category_and_article_relationship(db_session):
    # Create category
    category = Category(
        name="Maharashtra",
        slug="maharashtra",
        description="Maharashtra state coverage",
        is_active=True,
    )
    db_session.add(category)
    db_session.commit()
    db_session.refresh(category)

    # Create author user
    author = User(
        email="author@nirbhidnews.com",
        password_hash="somehash",
        full_name="Journalist",
        role="admin",
    )
    db_session.add(author)
    db_session.commit()
    db_session.refresh(author)

    # Create article
    article = Article(
        title="Maharashtra Infrastructure Project Announced",
        slug="maharashtra-infrastructure-project-announced",
        excerpt="Key updates on modern transport corridors.",
        content="Full article text content detailing the infrastructure project across the state.",
        category_id=category.id,
        author_id=author.id,
        author_name=author.full_name,
        status="published",
        is_featured=True,
        is_breaking=False,
        published_at=datetime.now(timezone.utc),
    )
    db_session.add(article)
    db_session.commit()
    db_session.refresh(article)

    assert article.id is not None
    assert article.category.name == "Maharashtra"
    assert article.author.email == "author@nirbhidnews.com"
    assert article.status == "published"
    assert article.is_featured is True
    assert len(category.articles) == 1


def test_media_model(db_session):
    user = User(
        email="uploader@nirbhidnews.com",
        password_hash="somehash",
        full_name="Media Manager",
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    media = Media(
        file_name="press_conference.webp",
        storage_path="articles/2026/09/press_conference.webp",
        public_url="https://storage.nirbhidnews.com/articles/2026/09/press_conference.webp",
        mime_type="image/webp",
        file_size=240500,
        uploaded_by=user.id,
    )
    db_session.add(media)
    db_session.commit()
    db_session.refresh(media)

    assert media.id is not None
    assert media.file_name == "press_conference.webp"
    assert media.uploader.email == "uploader@nirbhidnews.com"
