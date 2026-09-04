import logging
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.category import Category
from app.models.user import User
from app.core.config import settings
from app.core.security import get_password_hash
from app.utils.slug import generate_slug

logger = logging.getLogger(__name__)

INITIAL_CATEGORIES = [
    {"name": "Maharashtra", "description": "News and updates across Maharashtra state"},
    {"name": "Mumbai", "description": "Latest breaking news, civic updates, and stories from Mumbai"},
    {"name": "Thane", "description": "Local updates, civic news, and developments in Thane"},
    {"name": "Politics", "description": "Political developments, elections, and government policies"},
    {"name": "Crime", "description": "Law enforcement, investigations, and legal reporting"},
    {"name": "Business", "description": "Markets, economy, finance, and enterprise news"},
    {"name": "Sports", "description": "Cricket, football, athletics, and regional sports coverage"},
    {"name": "Entertainment", "description": "Bollywood, regional cinema, arts, and celebrity news"},
    {"name": "Technology", "description": "Tech innovations, gadgets, AI, and digital trends"},
    {"name": "Education", "description": "Academic news, exams, universities, and career guidance"},
    {"name": "Health", "description": "Healthcare, medical research, wellness, and public health"},
    {"name": "World", "description": "Global affairs, international relations, and world news"},
    {"name": "Other", "description": "General interest, opinion pieces, and miscellaneous news"},
]


def seed_categories(db: Session) -> int:
    """Seed initial categories idempotently."""
    created_count = 0
    for cat_data in INITIAL_CATEGORIES:
        slug = generate_slug(cat_data["name"])
        existing = db.scalar(select(Category).where(Category.slug == slug))
        if not existing:
            category = Category(
                name=cat_data["name"],
                slug=slug,
                description=cat_data.get("description"),
                is_active=True,
            )
            db.add(category)
            created_count += 1
    db.commit()
    logger.info(f"Seeded {created_count} categories.")
    return created_count


def seed_admin_user(db: Session) -> User:
    """Seed initial admin user idempotently using configured settings."""
    admin_email = settings.ADMIN_EMAIL
    admin_password = settings.ADMIN_PASSWORD

    existing_admin = db.scalar(select(User).where(User.email == admin_email))
    if not existing_admin:
        admin_user = User(
            email=admin_email,
            password_hash=get_password_hash(admin_password),
            full_name="Nirbhid Admin",
            role="admin",
            is_active=True,
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        logger.info(f"Initial admin user created: {admin_email}")
        return admin_user
    else:
        logger.info(f"Admin user already exists: {admin_email}")
        return existing_admin


from app.utils.seed_articles import seed_articles


def seed_all(db: Session):
    """Seed all initial data including categories, admin, and realistic sample articles."""
    seed_categories(db)
    admin = seed_admin_user(db)
    seed_articles(db, admin)

