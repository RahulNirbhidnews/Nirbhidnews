from app.models.category import Category
from app.models.user import User
from app.core.security import get_password_hash


def get_admin_auth_header(client, db_session):
    admin = User(
        email="article_admin@nirbhidnews.com",
        password_hash=get_password_hash("Password123!"),
        full_name="Article Admin",
        role="admin",
        is_active=True,
    )
    db_session.add(admin)
    db_session.commit()

    res = client.post(
        "/api/v1/auth/login",
        json={"email": "article_admin@nirbhidnews.com", "password": "Password123!"},
    )
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_article_crud_and_draft_privacy(client, db_session):
    headers = get_admin_auth_header(client, db_session)

    # 1. Create a category
    cat = Category(name="State Affairs", slug="state-affairs", is_active=True)
    db_session.add(cat)
    db_session.commit()
    db_session.refresh(cat)

    # 2. Create a DRAFT article
    draft_res = client.post(
        "/api/v1/admin/articles",
        headers=headers,
        json={
            "title": "Secret Investigation Underway",
            "excerpt": "Confidential draft scoop on local governance.",
            "content": "Full investigative text content still in review by editor.",
            "category_id": str(cat.id),
            "status": "draft",
            "is_featured": False,
            "is_breaking": False,
        },
    )
    assert draft_res.status_code == 201
    draft_data = draft_res.json()
    assert draft_data["status"] == "draft"
    assert draft_data["slug"] == "secret-investigation-underway"
    article_id = draft_data["id"]

    # 3. VERIFY DRAFT PRIVACY: Must NOT appear in public APIs
    pub_list_res = client.get("/api/v1/articles")
    assert pub_list_res.status_code == 200
    assert not any(a["id"] == article_id for a in pub_list_res.json()["items"])

    pub_slug_res = client.get("/api/v1/articles/secret-investigation-underway")
    assert pub_slug_res.status_code == 404

    # 4. Admin CAN see the draft
    admin_list_res = client.get("/api/v1/admin/articles?status=draft", headers=headers)
    assert admin_list_res.status_code == 200
    assert any(a["id"] == article_id for a in admin_list_res.json()["items"])

    # 5. Publish the article via PATCH
    publish_res = client.patch(f"/api/v1/admin/articles/{article_id}/publish", headers=headers)
    assert publish_res.status_code == 200
    assert publish_res.json()["status"] == "published"
    assert publish_res.json()["published_at"] is not None

    # 6. Now public readers CAN see the article
    pub_read_res = client.get("/api/v1/articles/secret-investigation-underway")
    assert pub_read_res.status_code == 200
    assert pub_read_res.json()["title"] == "Secret Investigation Underway"
    assert pub_read_res.json()["category"]["name"] == "State Affairs"

    # 7. Archive the article
    archive_res = client.patch(f"/api/v1/admin/articles/{article_id}/archive", headers=headers)
    assert archive_res.status_code == 200
    assert archive_res.json()["status"] == "archived"

    # 8. Verify archived article is hidden from public readers
    assert client.get("/api/v1/articles/secret-investigation-underway").status_code == 404

    # 9. Delete article
    del_res = client.delete(f"/api/v1/admin/articles/{article_id}", headers=headers)
    assert del_res.status_code == 204


def test_public_search_and_featured_breaking(client, db_session):
    headers = get_admin_auth_header(client, db_session)

    cat = Category(name="Technology & AI", slug="technology-ai", is_active=True)
    db_session.add(cat)
    db_session.commit()
    db_session.refresh(cat)

    # Create published breaking & featured article
    client.post(
        "/api/v1/admin/articles",
        headers=headers,
        json={
            "title": "Supercomputer Infrastructure Live in Mumbai",
            "slug": "supercomputer-mumbai-live",
            "excerpt": "Breakthrough tech milestone announced.",
            "content": "Deep details regarding the high performance computing center in Maharashtra.",
            "category_id": str(cat.id),
            "status": "published",
            "is_featured": True,
            "is_breaking": True,
        },
    )

    # Search
    search_res = client.get("/api/v1/articles?search=supercomputer")
    assert search_res.status_code == 200
    assert search_res.json()["total"] >= 1
    assert "Supercomputer" in search_res.json()["items"][0]["title"]

    # Category filter
    cat_res = client.get("/api/v1/articles?category=technology-ai")
    assert cat_res.status_code == 200
    assert cat_res.json()["total"] >= 1

    # Featured endpoint
    feat_res = client.get("/api/v1/articles/featured")
    assert feat_res.status_code == 200
    assert any("Supercomputer" in a["title"] for a in feat_res.json())

    # Breaking endpoint
    break_res = client.get("/api/v1/articles/breaking")
    assert break_res.status_code == 200
    assert any("Supercomputer" in a["title"] for a in break_res.json())
