from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.core.dependencies import get_current_admin
from app.models.user import User
from app.services.news_ingest_service import (
    ingest_state,
    sync_live_feeds_sync,
    FEED_SOURCES,
)

router = APIRouter(prefix="/admin/feeds", tags=["Admin Feeds Engine"])


class FeedSyncResponse(BaseModel):
    status: str
    added_count: int
    skipped_count: int
    last_sync_at: Optional[str]
    last_sync_status: str
    total_ingested: int
    is_enabled: bool
    sync_interval_seconds: int
    auto_publish: bool


class FeedSettingsUpdate(BaseModel):
    is_enabled: Optional[bool] = None
    sync_interval_seconds: Optional[int] = None
    auto_publish: Optional[bool] = None


@router.get("/status")
def get_feed_engine_status(current_admin: User = Depends(get_current_admin)):
    """Get current status, configuration, and recent sync logs of the News Ingestion Engine."""
    return {
        "status": "active" if ingest_state["is_enabled"] else "paused",
        "is_enabled": ingest_state["is_enabled"],
        "sync_interval_seconds": ingest_state["sync_interval_seconds"],
        "auto_publish": ingest_state["auto_publish"],
        "last_sync_at": ingest_state["last_sync_at"],
        "last_sync_status": ingest_state["last_sync_status"],
        "total_ingested": ingest_state["total_ingested"],
        "sources_count": len(FEED_SOURCES),
        "configured_sources": [
            {
                "name": s["name"],
                "category": s["category_slug"],
                "language": s["language"],
            }
            for s in FEED_SOURCES
        ],
        "recent_logs": ingest_state["recent_logs"],
    }


@router.post("/sync-now")
def trigger_immediate_sync(current_admin: User = Depends(get_current_admin)):
    """Trigger an immediate live sync from World and State News feeds."""
    res = sync_live_feeds_sync()
    if res.get("status") == "error":
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=res.get("error", "Failed to sync feeds"),
        )
    return {
        "status": "success",
        "message": f"Sync completed! Added {res.get('added_count', 0)} new stories.",
        "added_count": res.get("added_count", 0),
        "skipped_count": res.get("skipped_count", 0),
        "last_sync_at": ingest_state["last_sync_at"],
    }


@router.put("/settings")
def update_feed_settings(
    settings: FeedSettingsUpdate,
    current_admin: User = Depends(get_current_admin),
):
    """Update news ingestion interval, auto-publish status, or pause/resume engine."""
    if settings.is_enabled is not None:
        ingest_state["is_enabled"] = settings.is_enabled
    if settings.sync_interval_seconds is not None:
        ingest_state["sync_interval_seconds"] = max(settings.sync_interval_seconds, 30)
    if settings.auto_publish is not None:
        ingest_state["auto_publish"] = settings.auto_publish

    return {
        "status": "success",
        "message": "Feed settings updated successfully.",
        "is_enabled": ingest_state["is_enabled"],
        "sync_interval_seconds": ingest_state["sync_interval_seconds"],
        "auto_publish": ingest_state["auto_publish"],
    }
