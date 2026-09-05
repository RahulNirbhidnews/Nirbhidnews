import asyncio
from datetime import datetime, timezone
import hashlib
import html
import re
import urllib.request
import uuid
from typing import Dict, List, Optional
from bs4 import BeautifulSoup
import feedparser
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.article import Article
from app.models.category import Category
from app.models.user import User


# Configured Verified Live Feeds with Authentic News Photos
FEED_SOURCES = [
    # 1. State News (Maharashtra - Marathi)
    {
        "name": "Lokmat Maharashtra",
        "category_slug": "maharashtra",
        "url": "https://www.lokmat.com/rss/maharashtra.xml",
        "language": "mr",
    },
    {
        "name": "ABP Majha - Maharashtra",
        "category_slug": "maharashtra",
        "url": "https://marathi.abplive.com/news/maharashtra/feed",
        "language": "mr",
    },
    # 2. Mumbai Local (मुंबई)
    {
        "name": "Lokmat Mumbai",
        "category_slug": "mumbai",
        "url": "https://www.lokmat.com/rss/mumbai.xml",
        "language": "mr",
    },
    {
        "name": "ABP Majha - Mumbai",
        "category_slug": "mumbai",
        "url": "https://marathi.abplive.com/news/mumbai/feed",
        "language": "mr",
    },
    # 3. World News (Global & International)
    {
        "name": "NDTV World",
        "category_slug": "world",
        "url": "https://feeds.feedburner.com/ndtvnews-world-news",
        "language": "en",
    },
    {
        "name": "BBC World News",
        "category_slug": "world",
        "url": "http://feeds.bbci.co.uk/news/world/rss.xml",
        "language": "en",
    },
    # 4. Politics & National (राजकारण)
    {
        "name": "ABP Majha - Politics",
        "category_slug": "politics",
        "url": "https://marathi.abplive.com/news/politics/feed",
        "language": "mr",
    },
    {
        "name": "NDTV National Top Stories",
        "category_slug": "politics",
        "url": "https://feeds.feedburner.com/ndtvnews-top-stories",
        "language": "en",
    },
]

# Global Ingest Engine State
ingest_state = {
    "is_enabled": True,
    "sync_interval_seconds": 60,  # 1 minute default
    "auto_publish": True,
    "last_sync_at": None,
    "last_sync_status": "Idle",
    "total_ingested": 0,
    "recent_logs": [],
}


def clean_text(raw_html: str) -> str:
    """Strip HTML tags, decode entities, and return clean readable text."""
    if not raw_html:
        return ""
    soup = BeautifulSoup(raw_html, "html.parser")
    text = soup.get_text(separator=" ", strip=True)
    text = html.unescape(text)
    # Remove excessive whitespace
    return re.sub(r"\s+", " ", text).strip()


def extract_image_url(entry: dict) -> Optional[str]:
    """Extract real high-res image URL from RSS media/enclosure/HTML tags."""
    # 1. Media content (NDTV, BBC, etc.)
    if "media_content" in entry and isinstance(entry["media_content"], list):
        for item in entry["media_content"]:
            if isinstance(item, dict):
                url = item.get("url") or item.get("href")
                if url and url.startswith("http"):
                    return url

    # 2. Media thumbnail (BBC, Lokmat, etc.)
    if "media_thumbnail" in entry and isinstance(entry["media_thumbnail"], list):
        for item in entry["media_thumbnail"]:
            if isinstance(item, dict):
                url = item.get("url") or item.get("href")
                if url and url.startswith("http"):
                    return url

    # 3. Enclosures (ABP Majha, TOI, etc.)
    if "enclosures" in entry and isinstance(entry["enclosures"], list):
        for enc in entry["enclosures"]:
            if isinstance(enc, dict):
                href = enc.get("href") or enc.get("url") or ""
                enc_type = (enc.get("type") or "").lower()
                if (enc_type.startswith("image") or any(ext in href.lower() for ext in [".jpg", ".jpeg", ".png", ".webp"])) and href.startswith("http"):
                    return href

    # 4. Links
    if "links" in entry and isinstance(entry["links"], list):
        for link in entry["links"]:
            if isinstance(link, dict):
                href = link.get("href", "")
                link_type = (link.get("type") or "").lower()
                if (link_type.startswith("image") or any(ext in href.lower() for ext in [".jpg", ".jpeg", ".png", ".webp"])) and href.startswith("http"):
                    return href

    # 5. Summary / Description HTML parse (Lokmat, etc.)
    raw_desc = entry.get("summary", "") or entry.get("description", "")
    if raw_desc:
        soup = BeautifulSoup(raw_desc, "html.parser")
        img_tag = soup.find("img")
        if img_tag and img_tag.get("src"):
            src = img_tag.get("src")
            if src.startswith("http") and not any(bad in src.lower() for bad in ["favicon", "pixel", "tracking", "1x1"]):
                return src

    return None


def make_unique_slug(title: str, category_slug: str) -> str:
    """Generate a clean URL-friendly unique slug with a short deterministic hash."""
    clean_title = re.sub(r"[^\w\s-]", "", title.lower())
    clean_title = re.sub(r"[\s_-]+", "-", clean_title).strip("-")
    if not clean_title:
        clean_title = f"{category_slug}-update"
    # Take first 50 chars + 6 char hash
    title_hash = hashlib.md5(title.encode("utf-8")).hexdigest()[:6]
    return f"{clean_title[:60]}-{title_hash}"


def sync_live_feeds_sync() -> Dict:
    """Synchronous core worker that fetches feeds and saves new stories to DB."""
    db: Session = SessionLocal()
    added_count = 0
    skipped_count = 0
    sources_summary = []

    try:
        # Find Chief Editor or Admin user
        admin_user = db.scalar(
            select(User).where(User.role == "admin").order_by(User.created_at.asc()).limit(1)
        )
        admin_id = admin_user.id if admin_user else None
        author_name = "Rahul Baburao Jogdand (मुख्य संपादक)"

        # Load categories lookup in one query
        categories = db.scalars(select(Category)).all()
        cat_map = {c.slug: c.id for c in categories}
        world_cat_id = cat_map.get("world") or cat_map.get("maharashtra") or (categories[0].id if categories else None)
        maha_cat_id = cat_map.get("maharashtra") or world_cat_id

        # Load all existing titles and slugs into memory set for instant O(1) deduplication
        existing_titles = set(db.scalars(select(Article.title)).all())
        existing_slugs = set(db.scalars(select(Article.slug)).all())

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 NirbhidNews/2.0"
        }

        import requests

        new_articles_to_add = []

        for source in FEED_SOURCES:
            source_added = 0
            cat_id = cat_map.get(source["category_slug"], world_cat_id if source["category_slug"] == "world" else maha_cat_id)
            if not cat_id:
                continue

            try:
                resp = requests.get(source["url"], headers=headers, timeout=5)
                if resp.status_code != 200:
                    continue

                feed = feedparser.parse(resp.content)
                for entry in feed.entries[:6]:  # Top 6 latest per source
                    title = clean_text(entry.get("title", ""))
                    if not title or len(title) < 8:
                        continue

                    # Clean headline - strip source affix like " - Times of India" or " | Hindustan Times"
                    clean_headline = re.split(r"(\s+-\s+[A-Za-z0-9\.\s\-]+$|\s+\|\s+[A-Za-z0-9\.\s\-]+$)", title)[0].strip()

                    # O(1) in-memory check
                    if clean_headline in existing_titles:
                        skipped_count += 1
                        continue

                    # Extract summary and clean text
                    summary_raw = entry.get("summary", "") or entry.get("description", "")
                    clean_summary = clean_text(summary_raw)
                    clean_summary = re.split(r"(\s+-\s+[A-Za-z0-9\.\s\-]+$|\s+\|\s+[A-Za-z0-9\.\s\-]+$)", clean_summary)[0].strip()

                    if not clean_summary or clean_summary == clean_headline or len(clean_summary) < 15:
                        if source.get("language") == "mr":
                            summary_paragraph = f"{clean_headline}. निर्भीड न्यूज नेटवर्कच्या वृत्तानुसार या प्रकरणाशी संबंधित ताज्या घडामोडींवर प्रशासकीय व स्थानिक पातळीवर लक्ष ठेवले जात आहे."
                        else:
                            summary_paragraph = f"{clean_headline}. Full ongoing developments and detailed updates from Nirbhid News Network bureau."
                    else:
                        summary_paragraph = clean_summary

                    # Extract real image or None (Never use repetitive fake stock photos)
                    image_url = extract_image_url(entry)
                    article_slug = make_unique_slug(clean_headline, source["category_slug"])
                    if article_slug in existing_slugs:
                        article_slug = f"{article_slug}-{uuid.uuid4().hex[:4]}"

                    # Build clean Markdown content without raw HTML tags
                    detailed_content = (
                        f"**{clean_headline}**\n\n"
                        f"{summary_paragraph}\n\n"
                        f"निर्भीड न्यूज (Nirbhid News) २४ तास ताज्या घडामोडी आणि अचूक बातम्या आपल्यापर्यंत पोहोचवत आहे. या घटनेचे अधिक तपशील आणि विश्‍लेषण लवकरच अपडेट केले जातील.\n\n"
                        f"> **स्रोत (Source):** {source['name']} • निर्भीड न्यूज नेटवर्क"
                    )

                    new_art = Article(
                        id=uuid.uuid4(),
                        title=clean_headline,
                        slug=article_slug,
                        excerpt=summary_paragraph[:240],
                        content=detailed_content,
                        featured_image_url=image_url,
                        category_id=cat_id,
                        author_id=admin_id,
                        author_name=author_name,
                        status="published" if ingest_state["auto_publish"] else "draft",
                        is_featured=False,
                        is_breaking=(source_added == 0 and "world" in source["category_slug"]),
                        view_count=0,
                        published_at=datetime.now(timezone.utc),
                    )

                    new_articles_to_add.append(new_art)
                    existing_titles.add(clean_headline)
                    existing_slugs.add(article_slug)
                    source_added += 1
                    added_count += 1

            except Exception as src_err:
                print(f"[News Ingest] Source '{source['name']}' error: {src_err}")

            sources_summary.append({
                "source": source["name"],
                "category": source["category_slug"],
                "added": source_added,
            })

        # Fast bulk add and single commit
        if new_articles_to_add:
            db.add_all(new_articles_to_add)
            db.commit()

        # Update global state
        ingest_state["last_sync_at"] = datetime.now(timezone.utc).isoformat()
        ingest_state["last_sync_status"] = f"Success: {added_count} new articles added"
        ingest_state["total_ingested"] += added_count
        
        log_entry = {
            "timestamp": datetime.now(timezone.utc).strftime("%H:%M:%S (%d %b)"),
            "added": added_count,
            "skipped": skipped_count,
            "status": "Success",
        }
        ingest_state["recent_logs"] = [log_entry] + ingest_state["recent_logs"][:9]

        return {
            "status": "success",
            "added_count": added_count,
            "skipped_count": skipped_count,
            "sources": sources_summary,
            "last_sync_at": ingest_state["last_sync_at"],
        }

    except Exception as e:
        ingest_state["last_sync_status"] = f"Error: {str(e)}"
        return {"status": "error", "error": str(e)}
    finally:
        db.close()


import threading
import time

def _scheduler_loop():
    print("[News Ingest] Daemon background thread started.")
    time.sleep(5)
    while True:
        try:
            if ingest_state["is_enabled"]:
                print("[News Ingest] Starting scheduled news sync...")
                sync_live_feeds_sync()
            interval = max(ingest_state["sync_interval_seconds"], 30)
            time.sleep(interval)
        except Exception as err:
            print(f"[News Ingest] Scheduler loop exception: {err}")
            time.sleep(30)


def start_background_news_scheduler():
    """Start independent background daemon thread for news syncing."""
    worker = threading.Thread(target=_scheduler_loop, daemon=True, name="NewsIngestWorker")
    worker.start()
    return worker
