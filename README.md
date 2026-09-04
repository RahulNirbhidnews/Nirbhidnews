# Nirbhid News — Truth Unfiltered (निर्भीड न्यूज)

A production-ready digital news channel platform featuring a reader web experience and a private administrative CMS.

## Architecture

- **Frontend:** React 18, Vite, TypeScript, React Router, TanStack Query, Axios
- **Backend:** Python 3.11+, FastAPI, SQLAlchemy 2.x, Alembic, Pydantic v2, JWT Auth
- **Database:** Supabase PostgreSQL
- **Media Storage:** Supabase Storage (`news-media` bucket)
- **Repository:** [https://github.com/RahulNirbhidnews/Nirbhidnews](https://github.com/RahulNirbhidnews/Nirbhidnews)

---

## Directory Structure

```
nirbhid-news/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # REST endpoints (health, articles, categories, admin, auth, media)
│   │   ├── core/            # Config, security, settings, auth dependencies
│   │   ├── db/              # SQLAlchemy Base and Session management
│   │   ├── models/          # User, Category, Article, Media database models
│   │   ├── schemas/         # Pydantic schemas for request/response validation
│   │   ├── utils/           # Slug generators, seeders, helpers
│   │   ├── main.py          # FastAPI application entrypoint with CORS
│   │   └── seed_cli.py      # Database seed command runner
│   ├── alembic/             # Database migration versions and configuration
│   ├── tests/               # Pytest suite for API endpoints, models, and migrations
│   ├── alembic.ini          # Alembic configuration file
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variable template
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios client and API services
│   │   ├── app/             # Router & React Query providers
│   │   ├── components/      # UI, Navbar, Footer, News cards, Editors
│   │   ├── pages/           # Public reader pages and Admin CMS views
│   │   ├── styles/          # Editorial design system CSS
│   │   ├── types/           # TypeScript data interfaces
│   │   ├── App.tsx          # Root application component
│   │   └── main.tsx         # Frontend entrypoint
│   ├── public/              # Static assets
│   ├── package.json         # Node package configuration
│   ├── tsconfig.json        # TypeScript configuration
│   └── vite.config.ts       # Vite bundler configuration
├── nirbhid_news_fullstack_development_spec.md # Engineering specification & roadmap
├── .gitignore
└── README.md
```

---

## Quick Start (Local Development)

### 1. Backend Setup

```bash
cd backend
python -m venv venv

# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
```

#### Run Database Migrations & Seeding
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
- API Swagger Docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/api/v1/health`

#### Run Backend Tests
```bash
pytest
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
- Web Application: `http://localhost:5173`

#### Build for Production
```bash
npm run build
```

---

## Implemented Database Models (Phase 1)

1. **`users`**: UUID PK, email, bcrypt password hash, full_name, role (`admin`, `editor`), is_active, timestamps.
2. **`categories`**: UUID PK, name, unique indexed slug, description, is_active, timestamps.
3. **`articles`**: UUID PK, title, unique indexed slug, excerpt, content, category FK, author FK, status (`draft`, `published`, `archived`), is_featured, is_breaking, published_at, timestamps.
4. **`media`**: UUID PK, file_name, storage_path, public_url, mime_type, file_size, uploaded_by FK, created_at.

---

## Next Development Phases

- **Phase 2:** JWT Authentication & Protected Admin CMS Routes
- **Phase 3:** Category CMS (Full Admin Management)
- **Phase 4:** Article CMS (Drafts, Publishing, Breaking News, Editor)
- **Phase 5:** Media Upload & Supabase Storage Integration
- **Phase 6:** Public News Website & Editorial Feeds
- **Phase 7:** Search, Filtering & Social Sharing (WhatsApp, Facebook, X)
- **Phase 8:** SEO, Meta Tags & Accessibility
- **Phase 9:** CMS Polish & Real-Time Stats
- **Phase 10:** Production Security & Release Testing
- **Phase 11:** Production Deployment
