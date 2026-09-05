from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.db.session import get_db
from app.models.user import User
from app.models.advertisement import Advertisement
from app.schemas.advertisement import (
    AdvertisementCreate,
    AdvertisementUpdate,
    AdvertisementResponse,
)
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/admin/ads", tags=["Admin Advertisements"])


@router.get("", response_model=List[AdvertisementResponse])
def list_admin_ads(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    List all advertisements (active & inactive) for admin management.
    """
    ads = db.scalars(select(Advertisement).order_by(Advertisement.created_at.desc())).all()
    return ads


@router.post("", response_model=AdvertisementResponse, status_code=status.HTTP_201_CREATED)
def create_advertisement(
    ad_in: AdvertisementCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Create a new advertisement campaign banner.
    """
    ad = Advertisement(
        title=ad_in.title,
        client_name=ad_in.client_name,
        image_url=ad_in.image_url,
        target_url=ad_in.target_url,
        placement=ad_in.placement,
        is_active=ad_in.is_active,
    )
    db.add(ad)
    db.commit()
    db.refresh(ad)
    return ad


@router.get("/{ad_id}", response_model=AdvertisementResponse)
def get_advertisement_by_id(
    ad_id: str,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Get a specific advertisement by ID.
    """
    ad = db.scalar(select(Advertisement).where(Advertisement.id == ad_id))
    if not ad:
        raise HTTPException(status_code=404, detail="Advertisement not found")
    return ad


@router.put("/{ad_id}", response_model=AdvertisementResponse)
def update_advertisement(
    ad_id: str,
    ad_in: AdvertisementUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Update advertisement settings, banner image, link, placement, or status.
    """
    ad = db.scalar(select(Advertisement).where(Advertisement.id == ad_id))
    if not ad:
        raise HTTPException(status_code=404, detail="Advertisement not found")

    update_data = ad_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(ad, field, value)

    db.commit()
    db.refresh(ad)
    return ad


@router.delete("/{ad_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_advertisement(
    ad_id: str,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """
    Delete an advertisement.
    """
    ad = db.scalar(select(Advertisement).where(Advertisement.id == ad_id))
    if not ad:
        raise HTTPException(status_code=404, detail="Advertisement not found")

    db.delete(ad)
    db.commit()
    return None
