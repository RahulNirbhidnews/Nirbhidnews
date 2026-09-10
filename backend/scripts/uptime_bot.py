#!/usr/bin/env python3
"""
Nirbhid News — 24/7 Render Keep-Alive Uptime Bot
This standalone script continuously pings the backend service on Render
to prevent the free-tier service from sleeping after 15 minutes of inactivity.

Usage:
    python uptime_bot.py
    or set up as a free cron at https://cron-job.org / https://uptimerobot.com
    Target URL: https://nirbhid-news-api1.onrender.com/api/v1/health
"""

import time
import sys
import os
import urllib.request
import urllib.error
from datetime import datetime

TARGET_URL = os.environ.get("BACKEND_URL", "https://nirbhid-news-api1.onrender.com/api/v1/health")
INTERVAL_SECONDS = int(os.environ.get("PING_INTERVAL", 600))  # Default 10 minutes (600s)


def ping_server():
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    req = urllib.request.Request(
        TARGET_URL,
        headers={"User-Agent": "NirbhidNews-UptimeBot/1.0"}
    )
    start_time = time.time()
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            latency = round((time.time() - start_time) * 1000, 2)
            code = response.getcode()
            print(f"[{now_str}] ✅ Keep-Alive Ping Successful -> {TARGET_URL} (Status: {code}, Latency: {latency}ms)")
            return True
    except urllib.error.HTTPError as e:
        latency = round((time.time() - start_time) * 1000, 2)
        print(f"[{now_str}] ⚠️ HTTP Warning {e.code} -> {TARGET_URL} (Latency: {latency}ms)")
        return False
    except Exception as e:
        print(f"[{now_str}] ❌ Connection Failed -> {TARGET_URL}: {e}")
        return False


def main():
    print("=" * 65)
    print("🚀 Nirbhid News Render 24/7 Uptime Keep-Alive Bot Started")
    print(f"📡 Target Endpoint: {TARGET_URL}")
    print(f"⏱️ Interval: Every {INTERVAL_SECONDS} seconds ({INTERVAL_SECONDS // 60} minutes)")
    print("=" * 65)

    # Immediate first ping
    ping_server()

    while True:
        try:
            time.sleep(INTERVAL_SECONDS)
            ping_server()
        except KeyboardInterrupt:
            print("\n🛑 Uptime bot stopped by user.")
            sys.exit(0)


if __name__ == "__main__":
    main()
