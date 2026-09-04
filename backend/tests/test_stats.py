from fastapi.testclient import TestClient
from app.models.user import User
from app.core.security import get_password_hash


def get_admin_auth_header(client: TestClient, db_session):
    admin = User(
        email="stats_admin@nirbhidnews.com",
        password_hash=get_password_hash("Password123!"),
        full_name="Stats Admin",
        role="admin",
        is_active=True,
    )
    db_session.add(admin)
    db_session.commit()

    res = client.post(
        "/api/v1/auth/login",
        json={"email": "stats_admin@nirbhidnews.com", "password": "Password123!"},
    )
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_admin_stats_authorized(client: TestClient, db_session):
    headers = get_admin_auth_header(client, db_session)
    response = client.get("/api/v1/admin/stats", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "total_articles" in data
    assert "published_articles" in data
    assert "draft_articles" in data
    assert "total_categories" in data
    assert "total_media" in data
    assert "recent_articles" in data
    assert isinstance(data["recent_articles"], list)


def test_admin_stats_unauthorized(client: TestClient):
    response = client.get("/api/v1/admin/stats")
    assert response.status_code == 401
