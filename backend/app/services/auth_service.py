from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.user import User
from app.core.security import verify_password, create_access_token


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Verify email and password credentials, returning the User if valid."""
    user = db.scalar(select(User).where(User.email == email.lower().strip()))
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user


def generate_auth_token_for_user(user: User) -> str:
    """Generate a JWT bearer token for the specified user."""
    return create_access_token(subject=str(user.id))
