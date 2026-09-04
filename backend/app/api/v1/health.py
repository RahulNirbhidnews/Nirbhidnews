from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.health import HealthCheck
from app.core.config import settings

router = APIRouter()


@router.get("/health", response_model=HealthCheck, status_code=status.HTTP_200_OK, tags=["System"])
def health_check(db: Session = Depends(get_db)):
    """Check service health and database connectivity."""
    db_status = "connected"
    try:
        db.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"unreachable: {str(e)}"
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={"status": "error", "database": db_status},
        )

    return HealthCheck(
        status="ok",
        app=settings.PROJECT_NAME,
        environment=settings.APP_ENV,
        database=db_status,
    )
