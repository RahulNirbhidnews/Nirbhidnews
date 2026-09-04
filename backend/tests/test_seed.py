from sqlalchemy import select
from app.models.category import Category
from app.models.user import User
from app.utils.seed import seed_categories, seed_admin_user, seed_all


def test_seed_categories_idempotent(db_session):
    count1 = seed_categories(db_session)
    assert count1 == 13

    # Running seed again should not duplicate categories
    count2 = seed_categories(db_session)
    assert count2 == 0

    all_categories = db_session.scalars(select(Category)).all()
    assert len(all_categories) == 13
    slugs = [c.slug for c in all_categories]
    assert "maharashtra" in slugs
    assert "world" in slugs
    assert "mumbai" in slugs


def test_seed_admin_user_idempotent(db_session):
    admin1 = seed_admin_user(db_session)
    assert admin1.id is not None
    assert admin1.role == "admin"

    # Running seed again returns the existing admin
    admin2 = seed_admin_user(db_session)
    assert admin1.id == admin2.id
