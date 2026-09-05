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
from app.services.news_ingest_service import start_background_news_scheduler

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
