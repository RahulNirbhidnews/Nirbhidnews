import logging
from sqlalchemy.orm import Session
from sqlalchemy import select, func
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


from app.models.advertisement import Advertisement
from app.utils.seed_articles import seed_articles


def seed_advertisements(db: Session) -> int:
    """Seed initial sample banner advertisements."""
    existing_count = db.scalar(select(func.count()).select_from(Advertisement)) or 0
    if existing_count > 0:
        return 0

    sample_ads = [
        Advertisement(
            title="महाराष्ट्र शासन - मुख्यमंत्री माझी लाडकी बहीण योजना",
            client_name="Government of Maharashtra",
            image_url="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
            target_url="https://maharashtra.gov.in",
            placement="top_header",
            is_active=True,
            impressions=1240,
            clicks=185,
        ),
        Advertisement(
            title="निर्भीड न्यूज विशेष जाहिरात जागा - व्यवसाय वाढवा डिजिटल स्वरूपात",
            client_name="Nirbhid Media House (राहुल बाबुराव जोगदंड)",
            image_url="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            target_url="tel:9922299027",
            placement="sidebar",
            is_active=True,
            impressions=3410,
            clicks=412,
        ),
        Advertisement(
            title="महाराष्ट्र महाकृषी विकास प्रदर्शन २०२६ - विशेष व्यापारी दालन",
            client_name="Maha Krishi Agro Expo",
            image_url="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
            target_url="https://mahaexpo.in",
            placement="in_article",
            is_active=True,
            impressions=920,
            clicks=94,
        ),
    ]

    for ad in sample_ads:
        db.add(ad)
    db.commit()
    logger.info(f"Seeded {len(sample_ads)} sample advertisements.")
    return len(sample_ads)


def seed_all(db: Session):
    """Seed all initial data including categories, admin, realistic sample articles, and ads."""
    seed_categories(db)
    admin = seed_admin_user(db)
    seed_articles(db, admin)
    seed_advertisements(db)


