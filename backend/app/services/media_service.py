import os
import uuid
import math
import logging
from datetime import datetime, timezone
from typing import Optional, Tuple, List
from uuid import UUID
import httpx
from fastapi import UploadFile, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from app.models.media import Media
from app.models.user import User
from app.core.config import settings

logger = logging.getLogger(__name__)

ALLOWED_MIME_TYPES = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
}
MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB


def validate_and_read_media(file: UploadFile) -> Tuple[bytes, str, str]:
    """Validate uploaded file MIME type, extension, and file size."""
    mime_type = file.content_type.lower() if file.content_type else ""
    if mime_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Unsupported media type '{mime_type}'. "
                f"Allowed formats: {', '.join(ALLOWED_MIME_TYPES.keys())}"
            ),
        )

    ext = ALLOWED_MIME_TYPES[mime_type]
    file_bytes = file.file.read()
    file_size = len(file_bytes)

    if file_size > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File size exceeds 5 MB limit (file size: {file_size / (1024 * 1024):.2f} MB).",
        )

    if file_size == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty.",
        )

    return file_bytes, mime_type, ext


def upload_to_storage(
    file_bytes: bytes, storage_path: str, mime_type: str
) -> str:
    """Upload media binary to Supabase Storage, with fallback to local storage."""
    bucket = settings.SUPABASE_STORAGE_BUCKET or "news-media"
    supabase_url = settings.SUPABASE_URL.rstrip("/") if settings.SUPABASE_URL else None
    service_key = settings.SUPABASE_SERVICE_ROLE_KEY

    # 1. Attempt Supabase Storage Upload if configured
    if supabase_url and service_key and "supabase" in supabase_url:
        upload_endpoint = f"{supabase_url}/storage/v1/object/{bucket}/{storage_path}"
        headers = {
            "Authorization": f"Bearer {service_key}",
            "Content-Type": mime_type,
            "x-upsert": "true",
        }
        try:
            with httpx.Client(timeout=15.0) as client:
                res = client.post(upload_endpoint, headers=headers, content=file_bytes)
                if res.status_code in (200, 201):
                    public_url = (
                        f"{supabase_url}/storage/v1/object/public/{bucket}/{storage_path}"
                    )
                    logger.info(f"Uploaded to Supabase Storage: {public_url}")
                    return public_url
                else:
                    logger.warning(
                        f"Supabase Storage returned {res.status_code}: {res.text}. Falling back to local storage."
                    )
        except Exception as e:
            logger.warning(
                f"Supabase Storage upload failed: {e}. Falling back to local storage."
            )

    # 2. Local File System Fallback
    local_dir = os.path.abspath(os.path.join(os.getcwd(), "static", "media"))
    target_filepath = os.path.join(local_dir, storage_path.replace("/", os.sep))
    os.makedirs(os.path.dirname(target_filepath), exist_ok=True)

    with open(target_filepath, "wb") as f:
        f.write(file_bytes)

    public_url = f"/static/media/{storage_path}"
    logger.info(f"Saved locally: {public_url}")
    return public_url


def process_media_upload(
    db: Session, file: UploadFile, uploader: User
) -> Media:
    """Validate, upload, and record media asset."""
    file_bytes, mime_type, ext = validate_and_read_media(file)

    now = datetime.now(timezone.utc)
    unique_name = f"{uuid.uuid4().hex}.{ext}"
    storage_path = f"articles/{now.year}/{now.month:02d}/{unique_name}"

    public_url = upload_to_storage(file_bytes, storage_path, mime_type)

    original_name = file.filename or unique_name
    # Clean original filename
    safe_name = os.path.basename(original_name)

    media = Media(
        file_name=safe_name,
        storage_path=storage_path,
        public_url=public_url,
        mime_type=mime_type,
        file_size=len(file_bytes),
        uploaded_by=uploader.id,
        created_at=now,
    )
    db.add(media)
    db.commit()
    db.refresh(media)
    return media


def get_admin_media(
    db: Session, page: int = 1, limit: int = 24
) -> Tuple[List[Media], int, int]:
    """Retrieve paginated media assets."""
    page = max(1, page)
    limit = max(1, min(100, limit))
    offset = (page - 1) * limit

    base_query = select(Media)
    count_query = select(func.count(Media.id))

    total = db.scalar(count_query) or 0
    total_pages = math.ceil(total / limit) if total > 0 else 1

    items = list(
        db.scalars(
            base_query.order_by(Media.created_at.desc()).offset(offset).limit(limit)
        ).all()
    )

    return items, total, total_pages


def delete_media(db: Session, media_id: UUID) -> None:
    """Delete media asset from database and local storage if present."""
    media = db.scalar(select(Media).where(Media.id == media_id))
    if not media:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Media asset with ID '{media_id}' not found",
        )

    # Attempt local file deletion if stored locally
    local_dir = os.path.abspath(os.path.join(os.getcwd(), "static", "media"))
    target_filepath = os.path.join(local_dir, media.storage_path.replace("/", os.sep))
    if os.path.exists(target_filepath):
        try:
            os.remove(target_filepath)
        except Exception as e:
            logger.warning(f"Error removing local file {target_filepath}: {e}")

    db.delete(media)
    db.commit()
