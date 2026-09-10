from datetime import datetime, timezone
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field


class HealthCheck(BaseModel):
    status: str = "ok"
    app: str = "Nirbhid News API"
    environment: str = "development"
    database: str = "connected"
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    uptime: Optional[Dict[str, Any]] = None
