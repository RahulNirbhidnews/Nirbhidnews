import uuid
from app.models.category import Category
from app.models.article import Article
from app.models.user import User
from app.core.security import get_password_hash


def get_admin_auth_header(client, db_session):
    admin = User(
        email="cat_admin@nirbhidnews.com",
        password_hash=get_password_hash("Password123!"),
        full_name="Category Admin",
        role="admin",
        is_active=True,
    )
    db_session.add(admin)
    db_session.commit()

    res = client.post(
        "/api/v1/auth/login",
        json={"email": "cat_admin@nirbhidnews.com", "password": "Password123!"},
    )
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_public_categories_only_active(client, db_session):
    cat_active = Category(
        name="Active Category",
        slug="active-category",
        is_active=True,
    )
    cat_inactive = Category(
        name="Inactive Category",
        slug="inactive-category",
        is_active=False,
    )
    db_session.add_all([cat_active, cat_inactive])
    db_session.commit()

    response = client.get("/api/v1/categories")
    assert response.status_code == 200
    data = response.json()
    slugs = [c["slug"] for c in data]
    assert "active-category" in slugs
    assert "inactive-category" not in slugs


def test_admin_category_crud_flow(client, db_session):
    headers = get_admin_auth_header(client, db_session)

    # 1. Create Category
    create_res = client.post(
        "/api/v1/admin/categories",
        headers=headers,
        json={
            "name": "Special Investigation",
            "description": "In-depth investigative journalism reports",
            "is_active": True,
        },
    )
    assert create_res.status_code == 201
    created_data = create_res.json()
    assert created_data["name"] == "Special Investigation"
    assert created_data["slug"] == "special-investigation"
    cat_id = created_data["id"]

    # 2. Duplicate Name Rejection
    dup_res = client.post(
        "/api/v1/admin/categories",
        headers=headers,
        json={"name": "Special Investigation"},
    )
    assert dup_res.status_code == 400
    assert "already exists" in dup_res.json()["detail"]

    # 3. List Categories
    list_res = client.get("/api/v1/admin/categories?search=Investigation", headers=headers)
    assert list_res.status_code == 200
    list_data = list_res.json()
    assert list_data["total"] >= 1
    assert any(c["id"] == cat_id for c in list_data["items"])

    # 4. Update Category
    update_res = client.put(
        f"/api/v1/admin/categories/{cat_id}",
        headers=headers,
        json={"description": "Updated description", "is_active": False},
    )
    assert update_res.status_code == 200
    assert update_res.json()["description"] == "Updated description"
    assert update_res.json()["is_active"] is False

    # 5. Delete Category without articles
    del_res = client.delete(f"/api/v1/admin/categories/{cat_id}", headers=headers)
    assert del_res.status_code == 204

    # Verify deleted
    get_res = client.get(f"/api/v1/categories/special-investigation")
    assert get_res.status_code == 404


def test_category_deletion_blocked_with_articles(client, db_session):
    headers = get_admin_auth_header(client, db_session)

    # Create category
    cat = Category(name="Politics 2026", slug="politics-2026", is_active=True)
    db_session.add(cat)
    db_session.commit()
    db_session.refresh(cat)

    # Attach article
    article = Article(
        title="State Budget 2026 Presented",
        slug="state-budget-2026-presented",
        content="Full content details about state budget.",
        category_id=cat.id,
        status="published",
    )
    db_session.add(article)
    db_session.commit()

    # Attempt deletion
    del_res = client.delete(f"/api/v1/admin/categories/{cat.id}", headers=headers)
    assert del_res.status_code == 409
    assert "Cannot delete category" in del_res.json()["detail"]


def test_admin_category_unauthorized(client):
    res = client.post("/api/v1/admin/categories", json={"name": "No Auth Cat"})
    assert res.status_code == 401
