from fastapi import APIRouter
from app.api.v1.health import router as health_router
from app.api.v1.auth import router as auth_router
from app.api.v1.categories import router as categories_router
from app.api.v1.admin_categories import router as admin_categories_router
from app.api.v1.articles import router as articles_router
from app.api.v1.admin_articles import router as admin_articles_router
from app.api.v1.media import router as media_router
from app.api.v1.admin_stats import router as admin_stats_router
from app.api.v1.ads import router as ads_router
from app.api.v1.admin_ads import router as admin_ads_router
from app.api.v1.admin_feeds import router as admin_feeds_router
from app.api.v1.broadcast import router as broadcast_router

api_router = APIRouter()
api_router.include_router(health_router, prefix="", tags=["System"])
api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_router.include_router(categories_router, prefix="/categories", tags=["Public Categories"])
api_router.include_router(admin_categories_router, prefix="/admin/categories", tags=["Admin Categories"])
api_router.include_router(articles_router, prefix="/articles", tags=["Public Articles"])
api_router.include_router(admin_articles_router, prefix="/admin/articles", tags=["Admin Articles"])
api_router.include_router(media_router, prefix="/admin/media", tags=["Admin Media"])
api_router.include_router(admin_stats_router, prefix="", tags=["Admin Stats"])
api_router.include_router(ads_router, prefix="", tags=["Public Advertisements"])
api_router.include_router(admin_ads_router, prefix="", tags=["Admin Advertisements"])
api_router.include_router(admin_feeds_router, prefix="", tags=["Admin Feeds Engine"])
api_router.include_router(broadcast_router, prefix="", tags=["Live Broadcast"])

