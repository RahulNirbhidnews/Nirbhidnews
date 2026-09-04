from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, ConfigDict


class MediaBase(BaseModel):
    file_name: str
    storage_path: str
    public_url: str
    mime_type: str
    file_size: int


class MediaCreate(MediaBase):
    uploaded_by: Optional[UUID] = None


class MediaResponse(MediaBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    uploaded_by: Optional[UUID] = None
    created_at: datetime
