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
import requests
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

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 NirbhidNews/2.0"
)


def clean_text(raw_html: str) -> str:
    """Strip HTML tags, decode entities, and return clean readable text."""
    if not raw_html:
        return ""
    soup = BeautifulSoup(raw_html, "html.parser")
    text = soup.get_text(separator=" ", strip=True)
    text = html.unescape(text)
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


def fetch_article_web_content(link_url: str, timeout: int = 6) -> List[str]:
    """Scrape and extract meaningful clean paragraphs from the actual published news page."""
    if not link_url or not link_url.startswith("http"):
        return []
    
    try:
        headers = {"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"}
        resp = requests.get(link_url, headers=headers, timeout=timeout)
        if resp.status_code != 200 or len(resp.content) < 500:
            return []
        
        soup = BeautifulSoup(resp.content, "html.parser")
        
        # Remove noisy tags
        for tag in soup(["script", "style", "noscript", "header", "footer", "nav", "aside", "form", "iframe", "svg"]):
            tag.decompose()
            
        paragraphs = []
        # Try targeted story body selectors
        target_container = (
            soup.find("article")
            or soup.find(class_=re.compile(r"(story-content|article-body|story_body|content-area|story-details|article-content)", re.I))
            or soup.find(id=re.compile(r"(story-content|article-body|content-body)", re.I))
            or soup.body
        )
        
        if target_container:
            for p in target_container.find_all("p"):
                text = p.get_text(" ", strip=True)
                text = html.unescape(text)
                text = re.sub(r"\s+", " ", text).strip()
                
                # Filter out junk lines like "Also Read", ads, copyright, social buttons
                if len(text) < 30:
                    continue
                if re.search(r"(also read|download app|subscribe|whatsapp channel|follow us|click here|advertisement|newsletter|terms of use)", text, re.I):
                    continue
                if any(text.startswith(prefix) for prefix in ["ADVERTISEMENT", "Photo:", "Image:", "Watch Live:"]):
                    continue
                
                paragraphs.append(text)
                if len(paragraphs) >= 8:  # Maximum 8 clean paragraphs
                    break
                    
        return paragraphs
    except Exception as exc:
        return []


def build_rich_news_story(
    headline: str,
    summary: str,
    source_name: str,
    language: str,
    category_slug: str,
    web_paragraphs: Optional[List[str]] = None,
) -> str:
    """
    Construct a full-length, professional, multi-paragraph journalistic report
    with key highlights, ground report details, official statements, and analysis.
    """
    is_marathi = language == "mr" or any('\u0900' <= char <= '\u097F' for char in headline)

    # If real web paragraphs were extracted from the publisher's page
    if web_paragraphs and len(web_paragraphs) >= 2:
        lead = web_paragraphs[0]
        body_p = "\n\n".join(web_paragraphs[1:])

        if is_marathi:
            return (
                f"**{headline}**\n\n"
                f"**मुंबई / विशेष प्रतिनिधी:** {lead}\n\n"
                f"### 📌 महत्त्वाचे मुद्दे आणि ठळक घडामोडी (Key Highlights):\n"
                f"- **ताज्या घडामोडी:** {summary[:150]}...\n"
                f"- **प्रशासकीय व स्थानिक आढावा:** संबंधित यंत्रणांकडून या प्रकरणातील प्रत्येक घडामोडीवर बारकाईने लक्ष ठेवले जात आहे.\n"
                f"- **पुढील निर्णय:** लवकरच या संदर्भातील अधिकृत माहिती व पुढील कृती आराखडा समोर येणार आहे.\n\n"
                f"### 🔍 घटनेचा सविस्तर ग्राउंड रिपोर्ट:\n"
                f"{body_p}\n\n"
                f"> \"नागरिकांपर्यंत अचूक, सत्य आणि निष्पक्ष बातमी पोहोचवणे हेच निर्भीड न्यूजचे ध्येय आहे. या संदर्भातील सर्व ताज्या अपडेट्स आपल्यापर्यंत पोहोचवले जातील.\"\n\n"
                f"---  \n"
                f"**निर्भीड न्यूज नेटवर्क (Nirbhid News)** • २४ तास ताज्या आणि वेगवान बातम्यांसाठी जोडलेले रहा.  \n"
                f"*स्रोत (Source): {source_name}*"
            )
        else:
            return (
                f"**{headline}**\n\n"
                f"**Special Correspondent | Nirbhid News Bureau:** {lead}\n\n"
                f"### 📌 Key Highlights & Major Developments:\n"
                f"- **Core News Update:** {summary[:160]}...\n"
                f"- **Ongoing Investigation & Review:** Authorities and field teams are actively monitoring the ground situation.\n"
                f"- **Next Steps & Public Advisory:** Official statements and further executive directives are anticipated shortly.\n\n"
                f"### 🔍 In-Depth Ground Report & Full Story:\n"
                f"{body_p}\n\n"
                f"> \"Nirbhid News is dedicated to providing real-time, balanced, and verified journalism across national and regional spheres.\"\n\n"
                f"---  \n"
                f"**Nirbhid News Digital Network** • Real-time 24/7 authentic journalism.  \n"
                f"*Source: {source_name}*"
            )

    # If web paragraphs were short or unavailable, synthesize a full, comprehensive journalistic news story
    clean_lead = summary if (summary and len(summary) > 20 and summary != headline) else headline

    if is_marathi:
        return (
            f"**{headline}**\n\n"
            f"**मुंबई / विशेष प्रतिनिधी:** {clean_lead}\n\n"
            f"या प्रकरणासंदर्भात सविस्तर माहिती समोर येत असून स्थानिक प्रशासन आणि संबंधित यंत्रणा सतर्क झाली आहे. घटनेची माहिती मिळताच वरिष्ठ अधिकारी घटनास्थळी पोहोचले असून परिस्थितीचा सविस्तर आढावा घेतला जात आहे.\n\n"
            f"### 📌 महत्त्वाचे मुद्दे आणि ठळक घडामोडी (Key Highlights):\n"
            f"- **प्राथमिक माहिती:** {clean_lead[:140]}...\n"
            f"- **प्रशासकीय पावले:** स्थानिक पातळीवर आवश्यक त्या सर्व उपाययोजना युद्धपातळीवर सुरू करण्यात आल्या आहेत.\n"
            f"- **नागरिकांवर होणारा परिणाम:** सर्वसामान्य नागरिकांना कोणत्याही प्रकारचा त्रास होऊ नये यासाठी खबरदारी घेतली जात आहे.\n"
            f"- **पुढील दिशा:** संबंधित विभागाकडून लवकरच या संपूर्ण प्रकरणावर अधिकृत अहवाल प्रसिद्ध केला जाणार आहे.\n\n"
            f"### 🔍 प्रकरणाची पार्श्वभूमी आणि सविस्तर विश्लेषण:\n"
            f"गेल्या काही दिवसांपासून या संदर्भातील घडामोडी वेगाने घडत असून या निर्णयामुळे/घटनेमुळे संबंधित क्षेत्रात मोठे बदल होण्याची शक्यता वर्तवली जात आहे. तज्ज्ञांच्या मते, या प्रकरणाचा दूरगामी परिणाम होणार असून सर्व स्तरातून यावर प्रतिक्रिया उमटत आहेत.\n\n"
            f"> \"प्रशासनाकडून परिस्थितीवर पूर्ण नियंत्रण ठेवण्यात आले असून नागरिकांनी अफवांवर विश्वास ठेवू नये आणि अधिकृत माहितीवरच लक्ष ठेवावे.\" — **संबंधित विभाग / प्रशासन**\n\n"
            f"या प्रकरणातील पुढील घडामोडी, अधिकृत निर्णय आणि ताज्या माहितीसाठी निर्भीड न्यूजच्या डिजिटल पोर्टलशी जोडलेले रहा.\n\n"
            f"---  \n"
            f"**निर्भीड न्यूज (Nirbhid News)** • निर्भीड, निष्पक्ष आणि वेगवान पत्रकारितेचा विश्वास.  \n"
            f"*स्रोत (Source): {source_name} • निर्भीड ब्युरो रिपोर्ट*"
        )
    else:
        return (
            f"**{headline}**\n\n"
            f"**Special Correspondent | Nirbhid News Bureau:** {clean_lead}\n\n"
            f"According to primary reports received by the news desk, relevant administrative departments and field observers have initiated full active monitoring over the unfolding situation. Senior officials and sectoral experts are reviewing the latest developments to evaluate the overall ground impact.\n\n"
            f"### 📌 Key Highlights & Ground Takeaways:\n"
            f"- **Primary Report:** {clean_lead[:150]}...\n"
            f"- **Immediate Administrative Response:** Dedicated teams have been deployed on ground to ensure seamless coordination.\n"
            f"- **Public & Regional Impact:** Authorities are maintaining strict vigil to safeguard public interest and ensure smooth standard operations.\n"
            f"- **Upcoming Briefing:** A formal press communique and comprehensive action plan is expected from the governing authority.\n\n"
            f"### 🔍 Context, Background & Analytical Review:\n"
            f"This development comes amidst significant ongoing developments in the region. Analysts point out that the recent steps taken by the involved stakeholders could set a new benchmark for policy enforcement and strategic execution moving forward.\n\n"
            f"> \"Oversight committees are closely coordinating with ground officials to address all critical facets of this matter with maximum transparency and speed.\" — **Official Spokesperson**\n\n"
            f"Nirbhid News continues to track this story round-the-clock and will bring you live updates as more verified facts emerge.\n\n"
            f"---  \n"
            f"**Nirbhid News Network** • Trusted 24x7 Digital Media Platform.  \n"
            f"*Source: {source_name} • Nirbhid Bureau Report*"
        )


from app.utils.slug import generate_clean_slug

def make_unique_slug(title: str, category_slug: str) -> str:
    """Generate a clean, short, URL-safe ASCII slug (never Unicode percent-encoded)."""
    return generate_clean_slug(title, category_slug=category_slug)


def clean_all_article_slugs(db: Session) -> int:
    """Convert any existing Unicode/Devanagari slugs to short, clean ASCII slugs."""
    updated = 0
    try:
        articles = db.scalars(select(Article)).all()
        used_slugs = set()
        for art in articles:
            # Check if slug has non-ascii characters or is too long
            has_non_ascii = any(ord(c) >= 128 for c in (art.slug or ""))
            is_too_long = len(art.slug or "") > 60
            if has_non_ascii or is_too_long or not art.slug:
                cat_slug = art.category.slug if art.category else "news"
                new_slug = generate_clean_slug(art.title, category_slug=cat_slug)
                if new_slug in used_slugs:
                    new_slug = f"{new_slug}-{uuid.uuid4().hex[:4]}"
                art.slug = new_slug
                used_slugs.add(new_slug)
                updated += 1
            else:
                used_slugs.add(art.slug)

        if updated > 0:
            db.commit()
            print(f"[News Ingest] Successfully converted {updated} articles to clean ASCII short slugs.")
    except Exception as exc:
        print(f"[News Ingest] Error cleaning slugs: {exc}")
    return updated


def enrich_existing_short_articles(db: Session) -> int:
    """Upgrade existing articles in DB that only have 1-2 line short snippets into rich full news stories."""
    updated_count = 0
    try:
        articles = db.scalars(select(Article)).all()
        for art in articles:
            # Check if article content is very short (less than 400 chars)
            if not art.content or len(art.content.strip()) < 400:
                rich_story = build_rich_news_story(
                    headline=art.title,
                    summary=art.excerpt or art.title,
                    source_name="निर्भीड न्यूज नेटवर्क",
                    language="mr",
                    category_slug=art.category.slug if art.category else "maharashtra",
                    web_paragraphs=None,
                )
                art.content = rich_story
                if not art.excerpt or len(art.excerpt) < 20:
                    art.excerpt = f"{art.title}. निर्भीड न्यूज २४ तास ताज्या घडामोडी आणि अचूक बातम्या आपल्यापर्यंत पोहोचवत आहे."
                updated_count += 1
                
        if updated_count > 0:
            db.commit()
            print(f"[News Ingest] Successfully enriched {updated_count} short articles into full comprehensive stories.")
    except Exception as exc:
        print(f"[News Ingest] Error enriching existing articles: {exc}")
    return updated_count


def sync_live_feeds_sync() -> Dict:
    """Synchronous core worker that fetches feeds, extracts full stories, and saves to DB."""
    db: Session = SessionLocal()
    added_count = 0
    skipped_count = 0
    sources_summary = []

    try:
        # First clean all slugs and enrich any old short articles in DB
        clean_all_article_slugs(db)
        enrich_existing_short_articles(db)
        enrich_existing_short_articles(db)

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

        headers = {"User-Agent": USER_AGENT}
        new_articles_to_add = []

        for source in FEED_SOURCES:
            source_added = 0
            cat_id = cat_map.get(source["category_slug"], world_cat_id if source["category_slug"] == "world" else maha_cat_id)
            if not cat_id:
                continue

            try:
                resp = requests.get(source["url"], headers=headers, timeout=6)
                if resp.status_code != 200:
                    continue

                feed = feedparser.parse(resp.content)
                for entry in feed.entries[:6]:  # Top 6 latest per source
                    title = clean_text(entry.get("title", ""))
                    if not title or len(title) < 8:
                        continue

                    # Clean headline - strip source affix like " - Times of India"
                    clean_headline = re.split(r"(\s+-\s+[A-Za-z0-9\.\s\-]+$|\s+\|\s+[A-Za-z0-9\.\s\-]+$)", title)[0].strip()

                    # O(1) in-memory check
                    if clean_headline in existing_titles:
                        skipped_count += 1
                        continue

                    # Extract summary
                    summary_raw = entry.get("summary", "") or entry.get("description", "")
                    clean_summary = clean_text(summary_raw)
                    clean_summary = re.split(r"(\s+-\s+[A-Za-z0-9\.\s\-]+$|\s+\|\s+[A-Za-z0-9\.\s\-]+$)", clean_summary)[0].strip()

                    # Extract target article link to scrape full web page paragraphs
                    article_link = entry.get("link", "")
                    web_paragraphs = fetch_article_web_content(article_link, timeout=5) if article_link else []

                    # Build full, comprehensive journalistic story
                    detailed_story = build_rich_news_story(
                        headline=clean_headline,
                        summary=clean_summary,
                        source_name=source["name"],
                        language=source.get("language", "mr"),
                        category_slug=source["category_slug"],
                        web_paragraphs=web_paragraphs,
                    )

                    # Extract image
                    image_url = extract_image_url(entry)
                    article_slug = make_unique_slug(clean_headline, source["category_slug"])
                    if article_slug in existing_slugs:
                        article_slug = f"{article_slug}-{uuid.uuid4().hex[:4]}"

                    new_art = Article(
                        id=uuid.uuid4(),
                        title=clean_headline,
                        slug=article_slug,
                        excerpt=(clean_summary or clean_headline)[:240],
                        content=detailed_story,
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

        # Bulk save
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
