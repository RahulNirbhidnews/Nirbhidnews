from app.models.user import User
from app.core.security import get_password_hash


def test_login_success(client, db_session):
    # Setup test user
    password = "StrongPassword123!"
    user = User(
        email="admin_test@nirbhidnews.com",
        password_hash=get_password_hash(password),
        full_name="Nirbhid Test Admin",
        role="admin",
        is_active=True,
    )
    db_session.add(user)
    db_session.commit()

    # Attempt login
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "admin_test@nirbhidnews.com", "password": password},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == "admin_test@nirbhidnews.com"
    assert data["user"]["role"] == "admin"
    assert "password_hash" not in data["user"]


def test_login_invalid_password(client, db_session):
    user = User(
        email="editor_test@nirbhidnews.com",
        password_hash=get_password_hash("CorrectPassword123!"),
        full_name="Editor Test",
        role="editor",
        is_active=True,
    )
    db_session.add(user)
    db_session.commit()

    response = client.post(
        "/api/v1/auth/login",
        json={"email": "editor_test@nirbhidnews.com", "password": "WrongPassword!"},
    )
    assert response.status_code == 401
    assert "Incorrect email or password" in response.json()["detail"]


def test_login_nonexistent_email(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "nonexistent@nirbhidnews.com", "password": "AnyPassword!"},
    )
    assert response.status_code == 401
    assert "Incorrect email or password" in response.json()["detail"]


def test_login_inactive_user(client, db_session):
    user = User(
        email="inactive@nirbhidnews.com",
        password_hash=get_password_hash("ValidPassword123!"),
        full_name="Inactive User",
        role="admin",
        is_active=False,
    )
    db_session.add(user)
    db_session.commit()

    response = client.post(
        "/api/v1/auth/login",
        json={"email": "inactive@nirbhidnews.com", "password": "ValidPassword123!"},
    )
    assert response.status_code == 403
    assert "Account is deactivated" in response.json()["detail"]


def test_get_me_authenticated(client, db_session):
    password = "SecurePassword123!"
    user = User(
        email="current_user@nirbhidnews.com",
        password_hash=get_password_hash(password),
        full_name="Current User",
        role="admin",
        is_active=True,
    )
    db_session.add(user)
    db_session.commit()

    # Login to get token
    login_res = client.post(
        "/api/v1/auth/login",
        json={"email": "current_user@nirbhidnews.com", "password": password},
    )
    token = login_res.json()["access_token"]

    # Call /auth/me with Bearer token
    me_res = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert me_res.status_code == 200
    user_data = me_res.json()
    assert user_data["email"] == "current_user@nirbhidnews.com"
    assert user_data["full_name"] == "Current User"


def test_get_me_unauthenticated(client):
    # No auth header
    res1 = client.get("/api/v1/auth/me")
    assert res1.status_code == 401

    # Invalid token
    res2 = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": "Bearer invalid_fake_token_jwt"},
    )
    assert res2.status_code == 401
