# Nirbhid News — Truth Unfiltered (निर्भीड न्यूज)

A modern, production-ready digital news channel platform featuring a Marathi/English reader web portal and a private administrative CMS.

[![Backend Tests](https://img.shields.io/badge/pytest-26%2F26%20passed-brightgreen.svg)](#testing)
[![Frontend Build](https://img.shields.io/badge/vite%20build-passing-brightgreen.svg)](#frontend-setup)
[![TypeScript](https://img.shields.io/badge/typescript-5.2-blue.svg)](#architecture)
[![FastAPI](https://img.shields.io/badge/fastapi-0.110-009688.svg)](#architecture)

---

## 🚀 Architecture & Tech Stack

- **Frontend:** React 18, Vite, TypeScript, React Router v6, TanStack React Query v5, Axios, Lucide Icons.
- **Backend:** Python 3.11+, FastAPI, SQLAlchemy 2.x, Alembic, Pydantic v2, Bcrypt & JWT Security.
- **Database:** Supabase PostgreSQL with UUID keys, foreign key constraints, indexes, and full relational integrity.
- **Media Storage:** Supabase Storage (`news-media` bucket) with local file fallback.
- **Hosting Targets:**
  - **Frontend:** Vercel (Configured with `vercel.json` SPA rewrites).
  - **Backend:** Render / Railway / Fly.io / Docker (Configured with `Dockerfile`, `render.yaml`, and `Procfile`).
- **Repository:** [https://github.com/RahulNirbhidnews/Nirbhidnews](https://github.com/RahulNirbhidnews/Nirbhidnews)

---

## 📁 Directory Structure

```
nirbhid-news/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # REST endpoints (health, auth, articles, categories, media, stats)
│   │   ├── core/            # Config, security, bcrypt/JWT, auth dependencies
│   │   ├── db/              # SQLAlchemy session & Base
│   │   ├── models/          # User, Category, Article, Media database models
│   │   ├── schemas/         # Pydantic validation schemas
│   │   ├── utils/           # Slug generators, seeders, helpers
│   │   ├── main.py          # FastAPI application entrypoint with CORS
│   │   └── seed_cli.py      # Database seed command runner
│   ├── alembic/             # Database migration versions
│   ├── tests/               # Pytest test suite (26 passing tests)
│   ├── Dockerfile           # Production Docker container
│   ├── render.yaml          # Render.com infrastructure specification
│   ├── Procfile             # Process manager for Railway / Heroku
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment template
├── frontend/
│   ├── public/              # Static assets, robots.txt, sitemap.xml
│   ├── src/
│   │   ├── api/             # API clients (articles, categories, auth, media, stats)
│   │   ├── app/             # Router & QueryClient providers
│   │   ├── components/      # UI components (News cards, Hero, Ticker, Markdown, SEO, Modals)
│   │   ├── context/         # AuthContext with token persistence
│   │   ├── pages/           # Public reader pages & Admin CMS pages
│   │   ├── styles/          # Editorial design system CSS
│   │   └── types/           # TypeScript data interfaces
│   ├── vercel.json          # Vercel SPA routing configuration
│   ├── package.json
│   └── vite.config.ts
├── nirbhid_news_fullstack_development_spec.md
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Python 3.11+
- Node.js 18+ and npm
- PostgreSQL connection (or Supabase PostgreSQL URI)

---

### 1. Backend Setup

```bash
cd backend
python -m venv venv

# Windows:
.\venv\Scripts\activate
# Linux / macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
```

#### Configure `.env`
```env
APP_ENV=development
SECRET_KEY=your_secure_random_secret_key
DATABASE_URL=postgresql+psycopg://postgres:your_password@db.your_project.supabase.co:5432/postgres
SUPABASE_URL=https://your_project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_STORAGE_BUCKET=news-media
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

#### Run Database Migrations & Initial Seeder
```bash
# Run Alembic migrations
alembic upgrade head

# Seed initial categories & default admin user
python app/seed_cli.py
```

#### Start FastAPI Server
```bash
uvicorn app.main:app --reload --port 8000
```
- Interactive Swagger UI: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/api/v1/health`

#### Run Backend Tests
```bash
pytest -v
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

#### Configure `.env`
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

#### Start Vite Development Server
```bash
npm run dev
```
- Open reader website: `http://localhost:5173`
- Open CMS Admin login: `http://localhost:5173/admin/login`

#### Default Admin Credentials
- **Email:** `admin@nirbhidnews.com`
- **Password:** `admin12345`

---

## 🌐 Public Reader Features

- **Breaking News Ticker:** Real-time polling with direct article links and marquee animations.
- **Hero Featured Section:** Top featured story lead with background gradient legibility overlay and secondary stories stack.
- **Categorized Feeds:** Dedicated sections for Maharashtra, Mumbai Metro, Politics, Crime, Sports, Business, etc.
- **Article Reader (`/news/:slug`):** Formatted Markdown content with headings, blockquotes, images, author byline, reading time estimate, and related articles.
- **Social Sharing:** 1-click sharing to WhatsApp, X (Twitter), Facebook, Telegram, and URL clipboard copy.
- **Category Browsing (`/category/:slug`):** Paginated responsive grid with category headers and descriptions.
- **Search (`/search`):** Real-time keyword query with category filter dropdown and popular Marathi topic shortcuts.
- **SEO & Social Cards:** Dynamic Open Graph metadata (`og:title`, `og:image`, `og:description`), Twitter Cards, `sitemap.xml`, and `robots.txt`.

---

## 🛠️ Administrative CMS Features

- **Dashboard:** Real-time metrics for total articles, published stories, drafts, categories, and media storage consumption.
- **Article CMS (`/admin/articles`):** Full CRUD, auto-slug generator, rich Markdown editor with live preview, thumbnail attachment, breaking news toggle, and featured flags.
- **Draft Privacy:** Draft and archived articles are strictly quarantined from public APIs (`404 Not Found`).
- **Category Manager (`/admin/categories`):** Add, edit, and toggle categories with auto-slugs and relational deletion protection.
- **Media Library (`/admin/media`):** Drag-and-drop image uploads directly into Supabase Storage with instant public URL copying.

---

## 🚢 Production Deployment Guide

### Deploying Frontend to Vercel

1. Push your repository to GitHub: `https://github.com/RahulNirbhidnews/Nirbhidnews`.
2. Log in to [Vercel](https://vercel.com) and import the repository.
3. Set **Root Directory** to `frontend`.
4. Configure the Environment Variable:
   - `VITE_API_BASE_URL`: `https://your-backend-api.onrender.com/api/v1`
5. Click **Deploy**. Vercel will automatically use `frontend/vercel.json` for client-side routing.

---

### Deploying Backend to Render.com

1. Log in to [Render](https://render.com) and create a **New Web Service**.
2. Connect the GitHub repository.
3. Set:
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt && alembic upgrade head`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add Environment Variables:
   - `APP_ENV`: `production`
   - `SECRET_KEY`: `<Generate a random 64-character secret>`
   - `DATABASE_URL`: `postgresql+psycopg://postgres:<password>@db.<supabase_id>.supabase.co:5432/postgres`
   - `SUPABASE_URL`: `https://<supabase_id>.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: `<Your Supabase service_role secret key>`
   - `SUPABASE_STORAGE_BUCKET`: `news-media`
   - `CORS_ORIGINS`: `https://nirbhidnews.com,https://<your-vercel-app>.vercel.app`
   - `ACCESS_TOKEN_EXPIRE_MINUTES`: `1440`
5. Click **Deploy Web Service**.

---

## 🔒 Security Audit Checklist

- [x] Passwords hashed using bcrypt with salt.
- [x] JWT tokens with configurable expiration and cryptographically signed headers.
- [x] Supabase service-role key stored exclusively on the backend (never exposed to React SPA).
- [x] Strict draft privacy enforced on all public reader endpoints.
- [x] File upload validation (MIME types: `image/jpeg`, `image/png`, `image/webp`, max size: 5 MB).
- [x] CORS origin validation for production web domains.
- [x] Parameterized ORM queries preventing SQL injection.

---

## 📜 License & Copyright

© 2026 Nirbhid News (निर्भीड न्यूज). Truth Unfiltered • निष्पक्ष आणि निर्भीड पत्रकारिता. All Rights Reserved.
