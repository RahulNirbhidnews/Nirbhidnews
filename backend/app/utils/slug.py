import re
import unicodedata


def generate_slug(text: str) -> str:
    """Generate a clean, url-safe slug from a given text string."""
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text.lower())
    slug = re.sub(r"[-\s]+", "-", text).strip("-")
    return slug
