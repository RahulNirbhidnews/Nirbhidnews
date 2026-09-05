import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from app.core.config import settings
from app.api.v1 import api_router
from app.db.session import engine

logger = logging.getLogger(__name__)


from app.db.base import Base
import app.models  # noqa: F401


import asyncio
from app.db.session import SessionLocal
from app.models.user import User
from app.models.category import Category
from app.models.broadcast import BroadcastSetting
from app.core.security import get_password_hash

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure all DB tables including advertisements are created
    try:
        Base.metadata.create_all(bind=engine)
        with engine.begin() as conn:
            conn.execute(text("ALTER TABLE articles ADD COLUMN IF NOT EXISTS video_url TEXT;"))
            conn.execute(text("ALTER TABLE articles ADD COLUMN IF NOT EXISTS view_count INTEGER NOT NULL DEFAULT 0;"))
            logger.info("Database initialization and migration check completed.")
    except Exception as e:
        logger.warning(f"Database migration check notice: {e}")

    # Auto-seed initial Admin User, Categories, and Broadcast settings in new database
    try:
        with SessionLocal() as db:
            admin_email = (settings.ADMIN_EMAIL or "nirbhidnews.admin@gmail.com").strip().lower()
            admin_pwd = settings.ADMIN_PASSWORD or "admin12345"
            
            existing_admin = db.query(User).filter(User.email == admin_email).first()
            if not existing_admin:
                new_admin = User(
                    email=admin_email,
                    password_hash=get_password_hash(admin_pwd),
                    full_name="Nirbhid Chief Editor",
                    role="admin",
                    is_active=True,
                )
                db.add(new_admin)
                logger.info(f"Created primary admin user: {admin_email}")
            else:
                # Update password to ensure it matches current config
                existing_admin.password_hash = get_password_hash(admin_pwd)
                existing_admin.is_active = True

            # Seed default categories if empty
            default_categories = [
                ("ताज्या घडामोडी", "latest", "Breaking & latest headlines"),
                ("महाराष्ट्र", "maharashtra", "Maharashtra State news"),
                ("राजकारण", "politics", "Political news & analysis"),
                ("देश-विदेश", "national", "National and world news"),
                ("मनोरंजन", "entertainment", "Cinema, arts & entertainment"),
                ("क्रीडा", "sports", "Sports, cricket & tournament coverage"),
                ("तंत्रज्ञान", "technology", "Tech, innovation & cyber"),
                ("उद्योग-व्यापार", "business", "Finance, economy & markets"),
            ]
            for cat_name, cat_slug, cat_desc in default_categories:
                if not db.query(Category).filter(Category.slug == cat_slug).first():
                    db.add(Category(name=cat_name, slug=cat_slug, description=cat_desc, is_active=True))

            # Seed default broadcast setting if empty
            if not db.query(BroadcastSetting).filter(BroadcastSetting.id == "default").first():
                db.add(BroadcastSetting(
                    id="default",
                    youtube_url="https://www.youtube.com/watch?v=live_stream",
                    is_active=True,
                    title="Nirbhid Live 24x7",
                    channel_name="Nirbhid News Digital"
                ))

            db.commit()
            logger.info("Database bootstrap seeding completed successfully.")
    except Exception as e:
        logger.error(f"Error during bootstrap seeding: {e}")

    # Start automated Live News Ingest Background Task (World & State news minute-by-minute)
    if settings.APP_ENV != "testing" and not os.environ.get("PYTEST_CURRENT_TEST"):
        start_background_news_scheduler()
    yield



app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
    description="Nirbhid News MVP API — Public News & Private Admin CMS",
    lifespan=lifespan,
)

# Ensure static directories exist
static_media_dir = os.path.abspath(os.path.join(os.getcwd(), "static", "media"))
os.makedirs(static_media_dir, exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# CORS middleware configuration
origins = settings.CORS_ORIGINS if isinstance(settings.CORS_ORIGINS, list) else [settings.CORS_ORIGINS]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import time
from collections import defaultdict
from fastapi import Request
from fastapi.responses import JSONResponse

# Rate Limiting State (In-memory sliding window per IP)
_rate_limit_records = defaultdict(list)
RATE_LIMIT_GENERAL = 300    # Max 300 requests per minute for general endpoints
RATE_LIMIT_AUTH = 30        # Max 30 login attempts per minute for production IPs
WINDOW_SECONDS = 60
LOCALHOST_IPS = {"127.0.0.1", "::1", "localhost", "testclient"}


# Rate Limiting Middleware (Layer-7 DoS / Brute-Force Shield)
@app.middleware("http")
async def rate_limiting_middleware(request: Request, call_next):
    # Retrieve client IP
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    path = request.url.path

    # Whitelist localhost/development loopback so local development and testing is seamless
    if client_ip in LOCALHOST_IPS or settings.APP_ENV == "development":
        return await call_next(request)

    # Choose threshold based on endpoint sensitivity
    limit = RATE_LIMIT_AUTH if "/auth/login" in path else RATE_LIMIT_GENERAL

    # Clean timestamps older than the sliding window
    request_times = [t for t in _rate_limit_records[client_ip] if now - t < WINDOW_SECONDS]
    
    if len(request_times) >= limit:
        return JSONResponse(
            status_code=429,
            content={
                "detail": "Too many requests. Please slow down and try again later.",
                "retry_after_seconds": int(WINDOW_SECONDS - (now - request_times[0])),
            },
            headers={"Retry-After": str(WINDOW_SECONDS)},
        )

    request_times.append(now)
    _rate_limit_records[client_ip] = request_times

    response = await call_next(request)
    return response


# Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response


# Include API v1 router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to Nirbhid News API",
        "docs": "/docs",
        "health": f"{settings.API_V1_STR}/health",
    }
