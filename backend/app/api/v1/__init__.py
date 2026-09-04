from fastapi import APIRouter
from app.api.v1.health import router as health_router
from app.api.v1.auth import router as auth_router
from app.api.v1.categories import router as categories_router
from app.api.v1.admin_categories import router as admin_categories_router
from app.api.v1.articles import router as articles_router
from app.api.v1.admin_articles import router as admin_articles_router

api_router = APIRouter()
api_router.include_router(health_router, prefix="", tags=["System"])
api_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_router.include_router(categories_router, prefix="/categories", tags=["Public Categories"])
api_router.include_router(admin_categories_router, prefix="/admin/categories", tags=["Admin Categories"])
api_router.include_router(articles_router, prefix="/articles", tags=["Public Articles"])
api_router.include_router(admin_articles_router, prefix="/admin/articles", tags=["Admin Articles"])
