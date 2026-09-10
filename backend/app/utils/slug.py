import hashlib
import re
import unicodedata
from typing import Optional


# Devanagari to Latin phonetic transliteration map
DEVANAGARI_MAP = {
    'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri',
    'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'अं': 'an', 'अः': 'ah',
    'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
    'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
    'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
    'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
    'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
    'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh',
    'स': 's', 'ह': 'h', 'ळ': 'l', 'क्ष': 'ksh', 'ज्ञ': 'dny',
    'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri',
    'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', '्': '', '़': '',
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
}


def transliterate_devanagari(text: str) -> str:
    """Convert Devanagari text to readable clean Latin characters."""
    result = []
    for char in text:
        if char in DEVANAGARI_MAP:
            result.append(DEVANAGARI_MAP[char])
        elif char.isalnum() or char.isspace() or char in '-_':
            result.append(char)
    return "".join(result)


def generate_clean_slug(text: str, category_slug: Optional[str] = None, max_words: int = 6) -> str:
    """
    Generate a short, 100% clean, URL-safe ASCII slug.
    Prevents ugly %E0%A4%... percent-encoding on WhatsApp and social share links.
    Example output: 'peta-madhuri-elephant-dc5716' or 'maharashtra-budget-update-a8b29c'
    """
    if not text:
        text = "news-update"

    # Deterministic 6-character content hash for uniqueness
    hash_suffix = hashlib.md5(text.encode("utf-8")).hexdigest()[:6]

    # Extract any existing English / Latin words first
    latin_words = re.findall(r"[a-zA-Z0-9]+", text)
    
    # Check if text contains Devanagari
    has_devanagari = any('\u0900' <= c <= '\u097F' for c in text)

    slug_parts = []
    if has_devanagari:
        # Transliterate Devanagari phonetically to Latin
        transliterated = transliterate_devanagari(text)
        trans_words = re.findall(r"[a-zA-Z0-9]+", transliterated)
        
        # Prefer English words if present, otherwise use first 3-5 transliterated words
        if len(latin_words) >= 2:
            slug_parts = latin_words[:4]
        else:
            slug_parts = trans_words[:max_words]
    else:
        slug_parts = latin_words[:max_words]

    # Clean words
    clean_words = [w.lower() for w in slug_parts if len(w) > 1 and w.lower() not in ["the", "in", "and", "of", "to", "a", "an", "is", "for", "on"]]
    
    if not clean_words:
        prefix = (category_slug or "news").lower().replace(" ", "-")
        return f"{prefix}-update-{hash_suffix}"

    slug_body = "-".join(clean_words[:4])
    # Trim to 40 chars max
    slug_body = slug_body[:38].rstrip("-")

    if category_slug and not slug_body.startswith(category_slug.lower()):
        # Prepend short category if helpful
        cat_prefix = category_slug.lower()[:12]
        final_slug = f"{cat_prefix}-{slug_body}-{hash_suffix}"
    else:
        final_slug = f"{slug_body}-{hash_suffix}"

    # Ensure strictly ASCII alphanumeric and hyphens only
    final_slug = re.sub(r"[^a-z0-9-]", "", final_slug.lower())
    final_slug = re.sub(r"-+", "-", final_slug).strip("-")
    
    return final_slug or f"news-{hash_suffix}"


def generate_slug(text: str) -> str:
    """Standard slug generator fallback."""
    return generate_clean_slug(text)
