from typing import List, Optional
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.db.session import get_db
from app.models.advertisement import Advertisement
from app.schemas.advertisement import AdvertisementResponse

router = APIRouter(prefix="/ads", tags=["Advertisements"])


@router.get("", response_model=List[AdvertisementResponse])
def get_public_ads(
    placement: Optional[str] = Query(None, description="Filter by placement e.g. top_header, sidebar, in_article, footer_banner"),
    db: Session = Depends(get_db),
):
    """
    Get active public advertisements by placement.
    """
    query = select(Advertisement).where(Advertisement.is_active == True)
    if placement:
        query = query.where(Advertisement.placement == placement)
    
    ads = db.scalars(query.order_by(Advertisement.created_at.desc())).all()
    return ads


@router.post("/{ad_id}/click")
def track_ad_click(ad_id: str, db: Session = Depends(get_db)):
    """
    Increment click count for an advertisement.
    """
    ad = db.scalar(select(Advertisement).where(Advertisement.id == ad_id))
    if not ad:
        raise HTTPException(status_code=404, detail="Ad not found")
    ad.clicks += 1
    db.commit()
    return {"status": "ok", "clicks": ad.clicks}
