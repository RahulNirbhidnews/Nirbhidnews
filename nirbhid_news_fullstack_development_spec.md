# Nirbhid News — Full-Stack Development Specification

**Version:** 1.0  
**Architecture:** React + Vite + TypeScript + FastAPI + Supabase PostgreSQL + Supabase Storage  
**Repository:** GitHub  
**Goal:** Production-ready MVP digital news website with public reader experience and private admin CMS.

---

## 1. SOURCE OF TRUTH

This specification is the engineering source of truth.

### Coding-agent rules

1. Build the project in phases. **Do not attempt everything in one run.**
2. Inspect existing code before modifying it.
3. After each phase, run tests, type checks/linting, builds, and fix errors.
4. Never hardcode secrets or commit `.env` files.
5. Use environment variables for configuration.
6. Use Supabase PostgreSQL as the primary database.
7. Use Supabase Storage for uploaded media.
8. Use React + Vite for the frontend.
9. Use FastAPI/Python for the backend.
10. Keep the architecture modular and simple.
11. Do not add Redis, Kafka, Elasticsearch, microservices, Docker orchestration, or other unnecessary infrastructure.
12. Do not implement future features unless explicitly requested.

---

# 2. PRODUCT

Nirbhid News is a digital news channel website.

### Public users can

- View homepage.
- View latest news.
- View featured/top news.
- View breaking news.
- Browse categories.
- Open individual articles.
- Search news.
- Share articles.
- Read World news.
- Use mobile/tablet/desktop layouts.
- View About, Contact, Privacy Policy, Terms, and Disclaimer pages.

### Admin can

- Log in securely.
- View dashboard.
- Create articles.
- Edit articles.
- Delete/archive articles.
- Save drafts.
- Publish articles.
- Upload images.
- Select categories.
- Set author/reporter.
- Mark articles featured/breaking.
- Manage categories.

---

# 3. ARCHITECTURE

```text
Readers
   |
   v
React + Vite Frontend
   |
   | HTTPS REST API
   v
FastAPI Backend
   |
   +--------------------+
   |                    |
   v                    v
Supabase PostgreSQL   Supabase Storage
(database)            (images/files)
```

Deployment:

```text
Client Domain
     |
     v
Vercel
  React
     |
     v
FastAPI Hosting
     |
     +--> Supabase PostgreSQL
     +--> Supabase Storage
```

---

# 4. TECHNOLOGY STACK

## Frontend

- React
- Vite
- TypeScript
- React Router
- TanStack Query
- Axios or fetch
- CSS/Tailwind
- React Hook Form where useful
- Zod where useful

Recommended baseline:

```text
React
Vite
TypeScript
React Router
TanStack Query
Axios
```

## Backend

- Python 3.11+
- FastAPI
- Pydantic v2
- SQLAlchemy 2.x
- Alembic
- psycopg
- JWT authentication
- Argon2/bcrypt-compatible password hashing
- python-multipart
- pytest
- httpx

---

# 5. DATABASE

Use **Supabase PostgreSQL**.

Use SQLAlchemy + Alembic for application schema management.

Never manually alter production schema without a migration.

## users

```text
id UUID PRIMARY KEY
email VARCHAR UNIQUE NOT NULL
password_hash TEXT NOT NULL
full_name VARCHAR NULL
role VARCHAR NOT NULL DEFAULT 'admin'
is_active BOOLEAN NOT NULL DEFAULT TRUE
created_at TIMESTAMPTZ NOT NULL
updated_at TIMESTAMPTZ NOT NULL
```

Roles:

```text
admin
editor
```

MVP may use only `admin`, but keep the model extensible.

## categories

```text
id UUID PRIMARY KEY
name VARCHAR UNIQUE NOT NULL
slug VARCHAR UNIQUE NOT NULL
description TEXT NULL
is_active BOOLEAN NOT NULL DEFAULT TRUE
created_at TIMESTAMPTZ NOT NULL
updated_at TIMESTAMPTZ NOT NULL
```

Initial suggested categories:

```text
Maharashtra
Mumbai
Thane
Politics
Crime
Business
Sports
Entertainment
Technology
Education
Health
World
Other
```

Categories must remain configurable.

## articles

```text
id UUID PRIMARY KEY
title VARCHAR NOT NULL
slug VARCHAR UNIQUE NOT NULL
excerpt TEXT NULL
content TEXT NOT NULL
featured_image_url TEXT NULL
featured_image_path TEXT NULL
category_id UUID REFERENCES categories(id)
author_id UUID REFERENCES users(id) NULL
author_name VARCHAR NULL
status VARCHAR NOT NULL DEFAULT 'draft'
is_featured BOOLEAN NOT NULL DEFAULT FALSE
is_breaking BOOLEAN NOT NULL DEFAULT FALSE
published_at TIMESTAMPTZ NULL
created_at TIMESTAMPTZ NOT NULL
updated_at TIMESTAMPTZ NOT NULL
```

Statuses:

```text
draft
published
archived
```

Rules:

- Drafts must never appear in public APIs.
- Published articles must have `published_at`.
- Archived articles remain stored but are excluded from normal public feeds.

## media

```text
id UUID PRIMARY KEY
file_name VARCHAR NOT NULL
storage_path TEXT NOT NULL
public_url TEXT NOT NULL
mime_type VARCHAR NOT NULL
file_size BIGINT NOT NULL
uploaded_by UUID REFERENCES users(id)
created_at TIMESTAMPTZ NOT NULL
```

Store image binaries in Supabase Storage, not PostgreSQL.

---

# 6. RELATIONSHIPS

```text
users 1 ---- many articles
users 1 ---- many media
categories 1 ---- many articles
```

Add indexes for:

```text
articles.slug
articles.status
articles.published_at
articles.category_id
articles.is_featured
articles.is_breaking
categories.slug
categories.is_active
```

Use PostgreSQL search/full-text indexing if required after basic search is working.

---

# 7. SUPABASE STORAGE

Bucket:

```text
news-media
```

Suggested path:

```text
articles/YYYY/MM/<generated-unique-name>
```

Requirements:

- Generate safe unique filenames.
- Do not trust client filenames.
- Validate MIME type.
- Validate extension.
- Validate file size.
- Recommended max: 5 MB.
- Initial allowed types:

```text
image/jpeg
image/png
image/webp
```

---

# 8. AUTHENTICATION

Admin authentication must use JWT-based authentication.

Flow:

```text
POST /api/v1/auth/login
       |
       v
Validate credentials
       |
       v
JWT access token
       |
       v
React protected routes
       |
       v
Authorization: Bearer <token>
```

Requirements:

- Hash passwords.
- Never store plaintext passwords.
- JWT secret in environment variables.
- Token expiry required.
- Inactive accounts cannot log in.
- Protected endpoints require authentication.
- Admin operations require authorization.
- Do not expose password hashes.

---

# 9. API BASE

All APIs use:

```text
/api/v1
```

## Authentication

```text
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

Login request:

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

Login response:

```json
{
  "access_token": "...",
  "token_type": "bearer",
  "user": {
    "id": "...",
    "email": "...",
    "full_name": "...",
    "role": "admin"
  }
}
```

---

# 10. PUBLIC ARTICLE API

```text
GET /api/v1/articles
GET /api/v1/articles/{slug}
GET /api/v1/articles/featured
GET /api/v1/articles/breaking
```

`GET /articles` supports:

```text
page
limit
category
search
featured
breaking
```

Only published articles are public.

Example:

```text
GET /api/v1/articles?page=1&limit=12&category=world
```

---

# 11. PUBLIC CATEGORY API

```text
GET /api/v1/categories
GET /api/v1/categories/{slug}/articles
```

Only active categories should be publicly returned.

---

# 12. ADMIN ARTICLE API

Protected endpoints:

```text
POST   /api/v1/admin/articles
GET    /api/v1/admin/articles
GET    /api/v1/admin/articles/{id}
PUT    /api/v1/admin/articles/{id}
DELETE /api/v1/admin/articles/{id}
PATCH  /api/v1/admin/articles/{id}/publish
PATCH  /api/v1/admin/articles/{id}/archive
```

Admin list supports:

```text
status
category
search
page
limit
```

---

# 13. ADMIN CATEGORY API

```text
POST   /api/v1/admin/categories
GET    /api/v1/admin/categories
PUT    /api/v1/admin/categories/{id}
DELETE /api/v1/admin/categories/{id}
```

Do not delete a category in a way that leaves invalid article relationships.

Either prevent deletion or safely reassign articles.

---

# 14. MEDIA API

```text
POST /api/v1/admin/media/upload
```

Requirements:

- authentication;
- upload validation;
- safe filename/path;
- storage upload;
- metadata record;
- useful response;
- graceful failure.

---

# 15. PAGINATION

All article/category lists must be paginated.

Preferred response:

```json
{
  "items": [],
  "page": 1,
  "limit": 12,
  "total": 100,
  "total_pages": 9
}
```

Never return an unlimited article dataset.

---

# 16. SEARCH

Public search should cover:

- title;
- excerpt;
- content.

Example:

```text
GET /api/v1/articles?search=mumbai
```

Admin search may include drafts.

Start with PostgreSQL search. Optimize only if actual performance requires it.

---

# 17. ERROR HANDLING

Use consistent HTTP status codes:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
500 Internal Server Error
```

Do not expose stack traces, SQL errors, secrets, or internal implementation details.

---

# 18. BACKEND STRUCTURE

```text
backend/
├── app/
│   ├── main.py
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── dependencies.py
│   ├── db/
│   │   ├── session.py
│   │   └── base.py
│   ├── models/
│   │   ├── user.py
│   │   ├── category.py
│   │   ├── article.py
│   │   └── media.py
│   ├── schemas/
│   │   ├── auth.py
│   │   ├── user.py
│   │   ├── category.py
│   │   ├── article.py
│   │   └── media.py
│   ├── api/
│   │   └── v1/
│   │       ├── auth.py
│   │       ├── articles.py
│   │       ├── categories.py
│   │       ├── admin_articles.py
│   │       ├── admin_categories.py
│   │       └── media.py
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── article_service.py
│   │   ├── category_service.py
│   │   └── media_service.py
│   └── utils/
│       ├── slug.py
│       └── pagination.py
├── alembic/
├── tests/
├── alembic.ini
├── requirements.txt
├── .env.example
└── README.md
```

Keep routers, services, schemas, and models separated.

---

# 19. FRONTEND ROUTES

Public:

```text
/
/news/:slug
/category/:slug
/search
/about
/contact
/privacy-policy
/terms
/disclaimer
```

World can be represented by:

```text
/category/world
```

Admin:

```text
/admin/login
/admin
/admin/articles
/admin/articles/new
/admin/articles/:id/edit
/admin/categories
```

---

# 20. HOME PAGE

Sections:

1. Header/logo
2. Navigation
3. Breaking news
4. Featured/top news
5. Latest news
6. Category sections
7. World news
8. Advertisement placeholders
9. Footer

Keep layout editorial and readable.

---

# 21. ARTICLE PAGE

Display:

- headline;
- category;
- author/reporter;
- publication date;
- featured image;
- article content;
- sharing controls;
- related articles.

Sharing:

```text
WhatsApp
Facebook
X
Copy Link
```

Use frontend-generated share URLs.

---

# 22. ADMIN DASHBOARD

Display basic:

```text
Total articles
Published
Drafts
Categories
```

Also show recent articles.

Do not build complex analytics in MVP.

---

# 23. ARTICLE EDITOR

Fields:

```text
Title
Slug
Excerpt
Content
Category
Author
Featured Image
Featured
Breaking
Status
Publish Date
```

Generate slug from title.

Example:

```text
Mumbai Metro Expansion Announced
```

becomes:

```text
mumbai-metro-expansion-announced
```

Allow manual editing and enforce uniqueness.

If rich HTML editing is introduced, sanitize HTML before storing/rendering.

---

# 24. FRONTEND STRUCTURE

```text
frontend/
├── src/
│   ├── app/
│   │   ├── router.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── news/
│   │   ├── navigation/
│   │   ├── forms/
│   │   └── common/
│   ├── pages/
│   │   ├── public/
│   │   └── admin/
│   ├── api/
│   │   ├── client.ts
│   │   ├── articles.ts
│   │   ├── categories.ts
│   │   ├── auth.ts
│   │   └── media.ts
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   ├── styles/
│   └── main.tsx
├── public/
├── .env.example
├── package.json
└── README.md
```

---

# 25. RESPONSIVE DESIGN

Must work on:

- mobile;
- tablet;
- laptop;
- desktop.

Requirements:

- mobile navigation;
- touch-friendly controls;
- readable article typography;
- responsive images;
- no horizontal overflow;
- responsive news cards;
- usable admin UI on smaller screens.

Do not merely shrink desktop UI.

---

# 26. SEO

Implement:

- meaningful title tags;
- meta descriptions;
- canonical URLs;
- Open Graph metadata;
- Twitter/X card metadata;
- semantic HTML;
- descriptive image alt text;
- `robots.txt`;
- `sitemap.xml`.

Because this is a React SPA, do not claim it has the same SEO behavior as SSR/SSG. If SEO becomes a major requirement, SSR/SSG migration can be considered later.

---

# 27. ACCESSIBILITY

Implement:

- semantic headings;
- form labels;
- keyboard navigation;
- focus states;
- alt text;
- accessible menus;
- adequate contrast;
- correct button/link elements.

---

# 28. SECURITY

Backend:

- password hashing;
- JWT verification;
- authorization;
- input validation;
- CORS;
- safe uploads;
- login rate limiting where practical;
- secure error handling;
- parameterized/ORM queries.

Production CORS must use configured frontend origins, not unrestricted wildcard access when authentication is involved.

Never expose the Supabase service-role key to React.

---

# 29. ENVIRONMENT VARIABLES

Backend `.env.example`:

```text
APP_ENV=development
SECRET_KEY=
DATABASE_URL=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_STORAGE_BUCKET=news-media
CORS_ORIGINS=http://localhost:5173
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Frontend `.env.example`:

```text
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Never expose:

```text
DATABASE_PASSWORD
SECRET_KEY
SUPABASE_SERVICE_ROLE_KEY
```

to frontend code.

---

# 30. PERFORMANCE

Implement:

- pagination;
- lazy image loading;
- responsive image sizing;
- TanStack Query caching;
- no unnecessary API calls;
- loading states;
- error states;
- empty states.

Do not add Redis or other caching infrastructure initially.

---

# 31. TESTING

Backend pytest coverage should include:

- valid login;
- invalid login;
- inactive user;
- unauthenticated protected endpoint;
- article creation;
- article update;
- article deletion;
- draft exclusion from public API;
- published article visibility;
- category CRUD;
- search;
- pagination;
- upload validation.

Frontend should test critical flows/components where practical.

---

# 32. API DOCUMENTATION

Keep FastAPI OpenAPI documentation clean:

```text
/docs
/redoc
```

Document request/response schemas and important endpoint behavior.

---

# 33. LOGGING

Log useful operational events and errors.

Never log:

- passwords;
- JWT secrets;
- service-role keys;
- sensitive tokens.

---

# 34. GIT

Recommended:

```text
main
feature/*
```

Example commits:

```text
feat: add article model
feat: implement admin article API
feat: add article editor
fix: hide drafts from public API
```

Keep commits focused.

---

# 35. PROJECT README

Document:

- project purpose;
- architecture;
- prerequisites;
- local setup;
- environment variables;
- database migration;
- backend startup;
- frontend startup;
- testing;
- deployment;
- troubleshooting.

---

# 36. DEVELOPMENT PHASES

## PHASE 0 — FOUNDATION

Build only:

- Git repository structure;
- React/Vite/TypeScript;
- FastAPI;
- local environment;
- `.env.example`;
- CORS;
- `/health`;
- README;
- `.gitignore`;
- basic lint/type configuration.

### Done when

Both frontend and backend run locally.

---

## PHASE 1 — DATABASE FOUNDATION

Build:

- Supabase PostgreSQL connection;
- SQLAlchemy;
- Alembic;
- users;
- categories;
- articles;
- media;
- relationships;
- indexes;
- initial migration;
- seed mechanism.

### Done when

A clean database can be migrated successfully and all four tables exist.

**STOP HERE after the first coding-agent run.**

---

## PHASE 2 — AUTHENTICATION

Implement:

- password hashing;
- JWT;
- login;
- `/auth/me`;
- auth dependencies;
- role checks;
- inactive user handling;
- frontend login;
- protected admin routes;
- logout.

### Done when

Only authenticated admins can access CMS pages/APIs.

---

## PHASE 3 — CATEGORY CMS

Implement category CRUD.

Frontend:

```text
/admin/categories
```

Features:

- list;
- create;
- edit;
- delete;
- active/inactive.

### Done when

Admin can completely manage categories.

---

## PHASE 4 — ARTICLE CMS

Implement:

- article CRUD;
- drafts;
- publish;
- archive;
- featured;
- breaking;
- pagination;
- filtering;
- search.

Frontend:

```text
/admin/articles
/admin/articles/new
/admin/articles/:id/edit
```

### Done when

Client can create, edit, draft, publish, archive, and manage news.

---

## PHASE 5 — MEDIA

Implement:

- Supabase Storage bucket;
- secure upload;
- file validation;
- media metadata;
- image preview;
- article image attachment.

### Done when

Admin can upload and attach news images.

---

## PHASE 6 — PUBLIC WEBSITE

Build:

- homepage;
- header/navigation;
- breaking news;
- featured news;
- latest news;
- categories;
- article cards;
- article detail page;
- footer;
- static pages;
- advertisement placeholders.

### Done when

A reader can browse and read the complete news website.

---

## PHASE 7 — SEARCH, FILTERING & SHARING

Implement:

- search;
- category filtering;
- pagination;
- related articles;
- WhatsApp share;
- Facebook share;
- X share;
- copy link.

### Done when

Readers can find and share articles.

---

## PHASE 8 — SEO & ACCESSIBILITY

Implement:

- metadata;
- canonical URLs;
- Open Graph;
- X cards;
- sitemap;
- robots;
- semantic HTML;
- accessibility improvements.

### Done when

SEO/accessibility checklist passes.

---

## PHASE 9 — CMS POLISH

Add:

- dashboard statistics;
- recent articles;
- toast notifications;
- confirmation dialogs;
- better loading states;
- better empty/error states;
- responsive admin UI;
- form validation.

---

## PHASE 10 — SECURITY & RELEASE TESTING

Perform:

- complete backend tests;
- authorization tests;
- draft privacy tests;
- upload tests;
- invalid input tests;
- CORS review;
- secret review;
- production build;
- dependency review;
- debug-code removal.

---

## PHASE 11 — DEPLOYMENT

### Frontend

Deploy React frontend to Vercel or another appropriate static frontend host.

### Backend

Deploy FastAPI to a suitable Python host such as Render, Railway, Fly.io, or another currently suitable provider.

### Database

Supabase PostgreSQL.

### Storage

Supabase Storage.

Configure production environment variables and CORS.

---

# 37. DOMAIN / OWNERSHIP

The client's domain and infrastructure accounts should be owned by the client.

Recommended:

```text
Client Nirbhid News Gmail
        |
        +-- Domain registrar
        +-- GitHub
        +-- Supabase
        +-- Vercel
```

Developer should receive collaborator/developer access where possible.

Do not make the project dependent on the developer's personal accounts.

---

# 38. WORLD NEWS

The World category is part of the MVP.

Initially, world news can be manually published through the CMS.

Automatic news aggregation is **not required**.

If a news API is added later, verify:

- commercial-use rights;
- attribution;
- quotas;
- caching rules;
- redistribution rights;
- full-content licensing.

Never automatically republish full third-party articles without appropriate rights.

---

# 39. MULTILINGUAL SUPPORT

Do not implement automatic translation in MVP unless specifically requested.

Keep the architecture extensible for:

```text
English
Marathi
Hindi
```

Automatic translation is a future feature and may require external paid services.

---

# 40. E-PAPER

If explicitly included in the MVP, keep it simple:

- admin uploads PDF;
- PDF stored in Supabase Storage;
- public page displays/downloads it.

Advanced e-paper functionality is future scope.

---

# 41. ADVERTISEMENTS

Create reusable placeholder components for:

```text
Homepage top
Homepage sections
Article page
Sidebar
Footer
```

Do not integrate complicated ad networks in MVP unless explicitly requested.

---

# 42. FUTURE PAID FEATURES

Do not implement now:

- reporter accounts;
- editor workflows;
- scheduled publishing;
- automatic social publishing;
- Facebook/Instagram/Telegram/X APIs;
- WhatsApp Business API;
- YouTube/video platform;
- push notifications;
- newsletters;
- advanced analytics;
- automatic translation;
- advanced e-paper;
- advanced ad management;
- mobile app;
- AI writing/summarization;
- recommendation engine.

The current architecture should make these possible later.

---

# 43. ACCEPTANCE CHECKLIST

## Public

- [ ] Homepage
- [ ] Latest news
- [ ] Featured news
- [ ] Breaking news
- [ ] Categories
- [ ] Article pages
- [ ] Search
- [ ] Sharing
- [ ] World category
- [ ] Static pages
- [ ] Responsive design
- [ ] Basic SEO

## Admin

- [ ] Login
- [ ] Protected routes
- [ ] Dashboard
- [ ] Category CRUD
- [ ] Article CRUD
- [ ] Drafts
- [ ] Publishing
- [ ] Featured
- [ ] Breaking
- [ ] Image uploads
- [ ] Logout

## Backend

- [ ] API versioning
- [ ] Validation
- [ ] Authentication
- [ ] Authorization
- [ ] Pagination
- [ ] Search
- [ ] Error handling
- [ ] Tests
- [ ] Database migrations
- [ ] OpenAPI docs

## Security

- [ ] Secrets are environment variables
- [ ] Service-role key never reaches frontend
- [ ] Passwords are hashed
- [ ] Drafts are private
- [ ] CORS is configured
- [ ] Upload validation exists
- [ ] Production debug disabled

---

# 44. CODING-AGENT EXECUTION PROTOCOL

For every phase:

```text
READ SPEC
   ↓
CHECK CURRENT REPOSITORY
   ↓
IDENTIFY PHASE
   ↓
PLAN CHANGES
   ↓
IMPLEMENT
   ↓
RUN LINTER / TYPE CHECK
   ↓
RUN TESTS
   ↓
RUN BUILD
   ↓
RUN APPLICATION
   ↓
VERIFY
   ↓
FIX ERRORS
   ↓
UPDATE DOCUMENTATION
   ↓
COMMIT
   ↓
STOP / REPORT PHASE STATUS
```

Do not silently move to the next major phase.

At the end of every phase, report:

```text
Completed:
Files changed:
Database changes:
Endpoints added:
Tests:
Build status:
Known issues:
Next recommended phase:
```

---

# 45. FIRST CODING-AGENT PROMPT

When starting development, provide this specification to the coding agent and instruct it:

> Read the entire `nirbhid_news_fullstack_development_spec.md` before changing anything.
>
> For this first implementation run, execute **ONLY Phase 0 and Phase 1**.
>
> First inspect the repository and determine whether any existing project files need to be preserved.
>
> Then initialize:
>
> - React + Vite + TypeScript frontend
> - FastAPI backend
> - Git repository structure
> - environment templates
> - README
> - CORS
> - `/health`
> - SQLAlchemy
> - Alembic
> - Supabase PostgreSQL connection
>
> Create the initial database models and migration for:
>
> - users
> - categories
> - articles
> - media
>
> Include proper UUID primary keys, relationships, timestamps, statuses, constraints, and indexes specified in the document.
>
> Add a safe seed mechanism for an initial admin user and initial categories without hardcoding production credentials.
>
> Add basic backend tests and verify that the migration works from a clean database.
>
> Verify the frontend development server and production build.
>
> Do NOT implement authentication, article CMS, public pages, image upload UI, social sharing, news APIs, translation, deployment, AI, or future features yet.
>
> At the end, provide a concise implementation report listing files changed, database tables, migration status, tests run, build status, known issues, and the exact next phase.
>
> Do not claim a task is complete unless it was actually tested.

---

# 46. FINAL PRINCIPLE

This is an MVP digital news platform, not an enterprise media infrastructure.

Prefer:

```text
Simple
Secure
Reliable
Maintainable
Low-cost
Modular
```

Avoid unnecessary complexity.

The correct development order is:

```text
Foundation
   ↓
Database
   ↓
Authentication
   ↓
Category CMS
   ↓
Article CMS
   ↓
Media
   ↓
Public Website
   ↓
Search & Sharing
   ↓
SEO & Accessibility
   ↓
Testing & Security
   ↓
Deployment
```

Build the foundation correctly before adding visual polish or advanced features.
