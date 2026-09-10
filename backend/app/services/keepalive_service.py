import asyncio
import logging
import os
import time
import httpx
from app.core.config import settings

logger = logging.getLogger(__name__)

# Default Render backend URL
DEFAULT_RENDER_URL = os.environ.get("RENDER_EXTERNAL_URL") or os.environ.get("BACKEND_URL") or "https://nirbhid-news-api1.onrender.com"

_keepalive_task: asyncio.Task | None = None
_start_time = time.time()
_last_ping_time: float | None = None
_last_ping_status: str = "initialized"
_ping_count: int = 0


async def _keepalive_loop():
    """Background async worker that pings the Render backend health endpoint every 10 minutes to prevent sleep."""
    global _last_ping_time, _last_ping_status, _ping_count
    
    # Wait 60 seconds after startup before first ping
    await asyncio.sleep(60)
    
    target_base = (
        os.environ.get("RENDER_EXTERNAL_URL") 
        or os.environ.get("BACKEND_URL") 
        or getattr(settings, "RENDER_EXTERNAL_URL", None)
        or "https://nirbhid-news-api1.onrender.com"
    ).rstrip("/")

    health_url = f"{target_base}{settings.API_V1_STR}/health"
    ping_interval = int(os.environ.get("KEEPALIVE_INTERVAL_SECONDS", "600"))  # Default 10 mins (600s)

    logger.info(f"[KeepAlive] Uptime Keep-Alive Worker initialized. Target: {health_url} (Interval: {ping_interval}s)")

    async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
        while True:
            try:
                t0 = time.time()
                response = await client.get(health_url)
                latency_ms = round((time.time() - t0) * 1000, 2)
                _ping_count += 1
                _last_ping_time = time.time()
                _last_ping_status = f"HTTP {response.status_code} ({latency_ms}ms)"
                
                if response.status_code == 200:
                    logger.info(f"[KeepAlive] Ping #{_ping_count} OK to {health_url} - {response.status_code} ({latency_ms}ms)")
                else:
                    logger.warning(f"[KeepAlive] Ping #{_ping_count} returned status {response.status_code}")
            except Exception as exc:
                _last_ping_status = f"Error: {exc}"
                logger.warning(f"[KeepAlive] Ping failed to {health_url}: {exc}")
            
            await asyncio.sleep(ping_interval)


def start_keepalive_service():
    """Start the keepalive worker in the background event loop."""
    global _keepalive_task
    if _keepalive_task is None or _keepalive_task.done():
        try:
            loop = asyncio.get_running_loop()
            _keepalive_task = loop.create_task(_keepalive_loop())
            logger.info("[KeepAlive] Background task registered in active loop.")
        except RuntimeError:
            logger.debug("[KeepAlive] No running loop found to attach keepalive task.")


def get_uptime_stats():
    """Return current server uptime and ping statistics."""
    uptime_sec = int(time.time() - _start_time)
    hours, remainder = divmod(uptime_sec, 3600)
    minutes, seconds = divmod(remainder, 60)
    
    return {
        "uptime_seconds": uptime_sec,
        "uptime_formatted": f"{hours}h {minutes}m {seconds}s",
        "ping_count": _ping_count,
        "last_ping_time": _last_ping_time,
        "last_ping_status": _last_ping_status,
        "target_url": DEFAULT_RENDER_URL,
    }
