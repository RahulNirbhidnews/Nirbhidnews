from datetime import datetime
from typing import Optional
from pydantic import BaseModel, HttpUrl


class AdvertisementBase(BaseModel):
    title: str
    client_name: Optional[str] = None
    image_url: str
    target_url: Optional[str] = None
    placement: str = "top_header"  # top_header, sidebar, in_article, footer_banner
    is_active: bool = True


class AdvertisementCreate(AdvertisementBase):
    pass


class AdvertisementUpdate(BaseModel):
    title: Optional[str] = None
    client_name: Optional[str] = None
    image_url: Optional[str] = None
    target_url: Optional[str] = None
    placement: Optional[str] = None
    is_active: Optional[bool] = None


class AdvertisementResponse(AdvertisementBase):
    id: str
    impressions: int
    clicks: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
