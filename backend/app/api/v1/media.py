from uuid import UUID
from fastapi import APIRouter, Depends, UploadFile, File, Query, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User
from app.core.dependencies import get_current_admin
from app.schemas.media import MediaResponse, MediaListResponse
from app.services import media_service

router = APIRouter()


@router.post("/upload", response_model=MediaResponse, status_code=status.HTTP_201_CREATED, summary="Upload Media File")
def upload_media(
    file: UploadFile = File(..., description="Image file (JPEG, PNG, WebP up to 5 MB)"),
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin),
):
    """Upload media image to storage and save metadata record."""
    return media_service.process_media_upload(db, file=file, uploader=current_admin)


@router.get("", response_model=MediaListResponse, status_code=status.HTTP_200_OK, summary="List Media Library")
def list_media(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(24, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    """Retrieve paginated media assets from the media library."""
    items, total, total_pages = media_service.get_admin_media(db, page=page, limit=limit)
    return MediaListResponse(
        items=items,
        page=page,
        limit=limit,
        total=total,
        total_pages=total_pages,
    )


@router.delete("/{media_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete Media File")
def delete_media(
    media_id: UUID,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    """Delete a media asset."""
    media_service.delete_media(db, media_id=media_id)
    return None
