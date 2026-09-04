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


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure DB table schema migrations are up to date
    try:
        with engine.begin() as conn:
            conn.execute(text("ALTER TABLE articles ADD COLUMN IF NOT EXISTS video_url TEXT;"))
            logger.info("Database migration check completed: video_url column verified.")
    except Exception as e:
        logger.warning(f"Database migration check notice: {e}")
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
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to Nirbhid News API",
        "docs": "/docs",
        "health": f"{settings.API_V1_STR}/health",
    }
