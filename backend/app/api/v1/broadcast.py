from datetime import datetime
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.db.session import get_db
from app.models.user import User
from app.models.broadcast import BroadcastSetting
from app.schemas.broadcast import (
    BroadcastSettingResponse,
    BroadcastSettingUpdate,
)
from app.core.dependencies import get_current_admin

router = APIRouter(tags=["Live Broadcast"])


def _get_or_create_setting(db: Session) -> BroadcastSetting:
    setting = db.scalar(select(BroadcastSetting).where(BroadcastSetting.id == "default"))
    if not setting:
        setting = BroadcastSetting(
            id="default",
            youtube_url="https://www.youtube.com/watch?v=live_stream",
            is_active=True,
            title="Nirbhid Live 24x7",
            channel_name="Nirbhid News Digital",
            updated_at=datetime.utcnow(),
        )
        db.add(setting)
        db.commit()
        db.refresh(setting)
    return setting


@router.get("/broadcast", response_model=BroadcastSettingResponse)
def get_public_broadcast_setting(db: Session = Depends(get_db)):
    """
    Get the active Live Broadcast stream settings for public reader display.
    """
    return _get_or_create_setting(db)


@router.get("/admin/broadcast", response_model=BroadcastSettingResponse)
def get_admin_broadcast_setting(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Get Live Broadcast stream settings for Admin CMS.
    """
    return _get_or_create_setting(db)


@router.put("/admin/broadcast", response_model=BroadcastSettingResponse)
def update_admin_broadcast_setting(
    setting_in: BroadcastSettingUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Update Live Broadcast YouTube URL, active status, and title.
    """
    setting = _get_or_create_setting(db)

    if setting_in.youtube_url is not None:
        setting.youtube_url = setting_in.youtube_url.strip()
    if setting_in.is_active is not None:
        setting.is_active = setting_in.is_active
    if setting_in.title is not None:
        setting.title = setting_in.title.strip()
    if setting_in.channel_name is not None:
        setting.channel_name = setting_in.channel_name.strip()

    setting.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(setting)
    return setting
