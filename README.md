# Task Management App

A full-stack task management app with RESTful API and responsive UI.

## Features

- CRUD operations for tasks
- Filter by status and priority
- Search by title/description
- Sort by date, priority
- Pagination (10 items per page)
- Form validation (client + server)
- Dark mode toggle (persists preference)
- Export all tasks to CSV
- Responsive design (mobile + desktop)

## Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| Backend | Express.js | Simple, flexible Node.js framework |
| Database | SQLite | Zero-config, no external server needed |
| Query Builder | Knex.js | Clean SQL abstraction without ORM overhead |
| Frontend | Next.js 14 | React with built-in routing |
| Styling | Tailwind CSS | Rapid UI development |
| Testing | Jest + Supertest | Standard API testing tools |

## Setup

### Option 1: Docker (Recommended)

```bash
docker-compose up --build
# Frontend: http://localhost:3000
# Backend:  http://localhost:3001
```

### Option 2: Manual

```bash
# Backend
cd backend && npm install && npm run seed && npm start
# Runs on http://localhost:3001

# Frontend (new terminal)
cd frontend && npm install && npm run dev
# Runs on http://localhost:3000

# Tests
cd backend && npm test
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | List tasks (supports filters, pagination) |
| GET | /api/tasks/:id | Get single task |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

### Query Parameters (GET /api/tasks)

| Param | Example | Description |
|-------|---------|-------------|
| status | `?status=pending` | Filter by status |
| priority | `?priority=high` | Filter by priority |
| search | `?search=report` | Search title/description |
| sort | `?sort=due_date` | Sort field |
| order | `?order=asc` | Sort direction |
| page | `?page=2` | Page number |
| limit | `?limit=10` | Items per page |

### Task Schema

```json
{
  "title": "string (required, max 100)",
  "description": "string (optional, max 500)",
  "status": "pending | in-progress | completed",
  "priority": "low | medium | high",
  "due_date": "YYYY-MM-DD (optional)"
}
```

## Database Schema

| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary key |
| title | VARCHAR(255) | Required |
| description | TEXT | Optional |
| status | VARCHAR(255) | Default: pending |
| priority | VARCHAR(255) | Default: medium |
| due_date | VARCHAR(255) | Optional |
| created_at | DATETIME | Auto-set |
| updated_at | DATETIME | Auto-updated |

## Known Limitations

- No authentication (tasks are shared)
- No real-time updates
- SQLite not suitable for high concurrency
- No task categories or file attachments

## Time Spent

| Task | Time |
|------|------|
| Backend setup + CRUD | 2 hrs |
| Frontend UI | 2 hrs |
| Pagination + Validation | 1 hr |
| Testing + Docs | 1 hr |
| Bonus (dark mode, export) | 0.5 hr |
| **Total** | **6.5 hrs** |
