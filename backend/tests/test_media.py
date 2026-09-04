import io
from app.models.user import User
from app.core.security import get_password_hash


def get_admin_auth_header(client, db_session):
    admin = User(
        email="media_admin@nirbhidnews.com",
        password_hash=get_password_hash("Password123!"),
        full_name="Media Admin",
        role="admin",
        is_active=True,
    )
    db_session.add(admin)
    db_session.commit()

    res = client.post(
        "/api/v1/auth/login",
        json={"email": "media_admin@nirbhidnews.com", "password": "Password123!"},
    )
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_media_upload_and_list_flow(client, db_session):
    headers = get_admin_auth_header(client, db_session)

    # 1. Upload valid PNG image
    png_bytes = (
        b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
        b"\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\rIDATx\x9cc`\x00\x00\x00"
        b"\x02\x00\x01H\xaf\xa4q\x00\x00\x00\x00IEND\xaeB`\x82"
    )
    file_payload = {"file": ("news_photo.png", io.BytesIO(png_bytes), "image/png")}

    upload_res = client.post(
        "/api/v1/admin/media/upload",
        headers=headers,
        files=file_payload,
    )
    assert upload_res.status_code == 201
    media_data = upload_res.json()
    assert media_data["mime_type"] == "image/png"
    assert "public_url" in media_data
    media_id = media_data["id"]

    # 2. List media in admin
    list_res = client.get("/api/v1/admin/media", headers=headers)
    assert list_res.status_code == 200
    assert list_res.json()["total"] >= 1
    assert any(m["id"] == media_id for m in list_res.json()["items"])

    # 3. Delete media
    del_res = client.delete(f"/api/v1/admin/media/{media_id}", headers=headers)
    assert del_res.status_code == 204


def test_media_upload_invalid_mime_rejected(client, db_session):
    headers = get_admin_auth_header(client, db_session)

    file_payload = {"file": ("script.sh", io.BytesIO(b"echo 'malicious'"), "text/plain")}
    res = client.post(
        "/api/v1/admin/media/upload",
        headers=headers,
        files=file_payload,
    )
    assert res.status_code == 400
    assert "Unsupported media type" in res.json()["detail"]


def test_media_upload_oversized_rejected(client, db_session):
    headers = get_admin_auth_header(client, db_session)

    # 6 MB dummy payload
    oversized_bytes = b"0" * (6 * 1024 * 1024)
    file_payload = {"file": ("large_image.jpg", io.BytesIO(oversized_bytes), "image/jpeg")}

    res = client.post(
        "/api/v1/admin/media/upload",
        headers=headers,
        files=file_payload,
    )
    assert res.status_code == 400
    assert "exceeds 5 MB limit" in res.json()["detail"]


def test_media_upload_unauthorized(client):
    file_payload = {"file": ("photo.jpg", io.BytesIO(b"dummy"), "image/jpeg")}
    res = client.post("/api/v1/admin/media/upload", files=file_payload)
    assert res.status_code == 401
