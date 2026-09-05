from datetime import datetime
import uuid
from sqlalchemy import Column, String, Boolean, Integer, DateTime, Text
from app.db.base import Base


class Advertisement(Base):
    __tablename__ = "advertisements"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255), nullable=False)
    client_name = Column(String(255), nullable=True)
    image_url = Column(String(1024), nullable=False)
    target_url = Column(String(1024), nullable=True)
    placement = Column(String(50), nullable=False, default="top_header")  # top_header, sidebar, in_article, footer_banner
    is_active = Column(Boolean, default=True, nullable=False)
    impressions = Column(Integer, default=0, nullable=False)
    clicks = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
