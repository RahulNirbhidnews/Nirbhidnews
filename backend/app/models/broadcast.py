from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime
from app.db.base import Base


class BroadcastSetting(Base):
    __tablename__ = "broadcast_settings"

    id = Column(String(36), primary_key=True, default="default")
    youtube_url = Column(String(1024), nullable=False, default="https://www.youtube.com/watch?v=live_stream")
    is_active = Column(Boolean, default=True, nullable=False)
    title = Column(String(255), nullable=False, default="Nirbhid Live 24x7")
    channel_name = Column(String(255), nullable=False, default="Nirbhid News Digital")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
