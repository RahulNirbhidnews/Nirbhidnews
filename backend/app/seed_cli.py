import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.db.session import SessionLocal
from app.utils.seed import seed_all


def main():
    print("Seeding database initial categories and admin...")
    db = SessionLocal()
    try:
        seed_all(db)
        print("Seeding completed successfully.")
    except Exception as e:
        print(f"Error seeding database: {e}")
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    main()
