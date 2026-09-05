from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class BroadcastSettingBase(BaseModel):
    youtube_url: str = "https://www.youtube.com/watch?v=live_stream"
    is_active: bool = True
    title: str = "Nirbhid Live 24x7"
    channel_name: str = "Nirbhid News Digital"


class BroadcastSettingUpdate(BaseModel):
    youtube_url: Optional[str] = None
    is_active: Optional[bool] = None
    title: Optional[str] = None
    channel_name: Optional[str] = None


class BroadcastSettingResponse(BroadcastSettingBase):
    id: str
    updated_at: datetime

    class Config:
        from_attributes = True
