# Local Development Guide

Complete guide to setting up and developing Great White Hope locally.

---

## 🚀 Quick Start (5 minutes)

### Prerequisites

- Node.js 18+ (https://nodejs.org)
- Docker & Docker Compose (https://www.docker.com/products/docker-desktop)
- Git (https://git-scm.com)

### Steps

```bash
# 1. Clone repository
git clone https://github.com/busyb083-coder/great-white-hope.git
cd great-white-hope

# 2. Copy environment template
cp .env.example .env.local

# 3. Start Docker services (Postgres, MinIO, MailHog, Redis)
npm run docker:up

# 4. Wait for services to be healthy (about 30 seconds)
sleep 30

# 5. Install dependencies
npm install

# 6. Run database migrations
npm run migrate

# 7. Seed demo data
npm run seed

# 8. Start development servers
npm run dev
```

**Open browser:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- MinIO Console: http://localhost:9001 (user: minioadmin, pass: minioadmin)
- MailHog: http://localhost:8025

---

## 📁 Project Structure

```
great-white-hope/
├── apps/
│   ├── frontend/          # React + Vite
│   └── backend/           # Express + Prisma
├── packages/
│   ├── shared/            # Shared utilities
│   └── types/             # Shared TypeScript types
├── docker-compose.yml     # Local services
├── .env.example           # Environment template
└── package.json           # Monorepo root
```

---

## 🛠️ Development Workflow

### Start Development

```bash
# Start all services (Docker + dev servers)
npm run docker:up
npm run dev
```

### Frontend Development

```bash
# Start only frontend
cd apps/frontend
npm run dev

# Build frontend
npm run build

# Preview build
npm run preview
```

### Backend Development

```bash
# Start only backend
cd apps/backend
npm run dev

# Build backend
npm run build

# Run tests
npm run test
```

### Database Changes

```bash
# Create new migration
npm run migrate:create

# Run pending migrations
npm run migrate

# Reset database (WARNING: deletes all data)
npm run migrate:reset

# Seed demo data
npm run seed
```

---

## 🗄️ Database

### Access PostgreSQL

```bash
# Connect to database
docker exec -it gwh-postgres psql -U postgres -d great_white_hope

# List tables
\dt

# Exit
\q
```

### View Data

```bash
# Users
SELECT * FROM "User";

# Products
SELECT * FROM "Product";

# Orders
SELECT * FROM "Order";
```

---

## 📦 Docker Services

### Manage Services

```bash
# Start all services
npm run docker:up

# Stop all services
npm run docker:down

# View logs
npm run docker:logs

# Restart specific service
docker-compose restart postgres
docker-compose restart minio
docker-compose restart mailhog
```

### Service Details

| Service | Port | URL | Credentials |
|---------|------|-----|-------------|
| PostgreSQL | 5432 | localhost:5432 | user: postgres, pass: postgres |
| MinIO (S3) | 9000/9001 | http://localhost:9001 | user: minioadmin, pass: minioadmin |
| MailHog | 1025/8025 | http://localhost:8025 | - |
| Redis | 6379 | localhost:6379 | - |
| Backend | 4000 | http://localhost:4000 | - |
| Frontend | 3000 | http://localhost:3000 | - |

---

## 🔐 Authentication

### Create Admin User

```bash
# Via seed script
npm run seed

# Manually via database
docker exec -it gwh-postgres psql -U postgres -d great_white_hope << EOF
INSERT INTO "User" (email, password, name, role) VALUES (
  'admin@example.com',
  'hashed_password_here',
  'Admin User',
  'ADMIN'
);
EOF
```

### Login

1. Go to http://localhost:3000/admin
2. Email: admin@example.com
3. Password: (set during seeding)

---

## 💾 Environment Variables

### Required for Development

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/great_white_hope

# Storage
S3_ENDPOINT=http://localhost:9000
S3_BUCKET=great-white-hope
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin

# Email
SMTP_HOST=localhost
SMTP_PORT=1025

# Auth
JWT_SECRET=dev-secret-key-change-in-production

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:4000
```

### Optional for Development

```env
# Monitoring
SENTRY_DSN=  # Leave empty for local dev

# Payment Processors
STRIPE_SECRET_KEY=sk_test_...
PAYPAL_CLIENT_ID=...
GREEN_FINANCIAL_API_KEY=...
CRYPTOMASS_API_KEY=...
```

---

## 🧪 Testing

### Run Tests

```bash
# All tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

### Test Admin Panel

1. Go to http://localhost:3000/admin
2. Login with admin credentials
3. Test product CRUD
4. Test media upload
5. Test content publishing

### Test Payment Processors

1. Go to http://localhost:3000/checkout
2. Select each payment processor
3. Verify payment form appears
4. Test with test credentials

---

## 📝 Code Quality

### Lint Code

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

### Type Check

```bash
npm run type-check
```

---

## 🐛 Debugging

### Backend Debugging

```bash
# Enable debug logs
LOG_LEVEL=debug npm run dev

# Use VS Code debugger
# Add breakpoints and press F5
```

### Frontend Debugging

```bash
# React DevTools browser extension
# Open browser DevTools (F12)
# Check Console for errors
```

### Database Debugging

```bash
# View all queries
docker logs gwh-postgres

# Connect to database
docker exec -it gwh-postgres psql -U postgres -d great_white_hope
```

---

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3000
lsof -i :4000

# Kill process
kill -9 <PID>

# Or change port in docker-compose.yml
```

### Database Connection Error

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Check logs
docker logs gwh-postgres

# Restart database
docker-compose restart postgres
```

### Docker Services Won't Start

```bash
# Check Docker is running
docker ps

# Rebuild containers
docker-compose down -v
npm run docker:up

# Check logs
docker-compose logs
```

### Dependencies Not Installed

```bash
# Clear node_modules
rm -rf node_modules apps/*/node_modules

# Reinstall
npm install

# Clear pnpm cache
pnpm store prune
```

---

## 📚 API Development

### Create New Endpoint

1. **Define route** in `apps/backend/src/routes/`
2. **Add handler** with proper error handling
3. **Add validation** with Zod
4. **Test with curl or Postman**

Example:

```typescript
// apps/backend/src/routes/products.ts
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await db.product.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    res.json(product);
  } catch (err) {
    next(err);
  }
});
```

### Test Endpoint

```bash
curl http://localhost:4000/api/v1/products/1
```

---

## 🎨 Frontend Development

### Add New Page

1. Create component in `apps/frontend/src/pages/`
2. Add route in `apps/frontend/src/App.tsx`
3. Add navigation link

Example:

```typescript
// apps/frontend/src/pages/NewPage.tsx
export default function NewPage() {
  return <div>New Page</div>;
}

// apps/frontend/src/App.tsx
<Route path="/new" element={<NewPage />} />
```

### Use API

```typescript
import { useEffect, useState } from 'react';
import api from '../api/client';

export default function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/api/v1/products')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
```

---

## 📦 Adding Dependencies

```bash
# Add to frontend
cd apps/frontend
npm install package-name

# Add to backend
cd apps/backend
npm install package-name

# Add to root (monorepo)
npm install -w . package-name
```

---

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
# ...

# Commit
git add .
git commit -m "feat: add my feature"

# Push
git push origin feature/my-feature

# Create Pull Request on GitHub
```

---

## 📊 Useful Commands

```bash
# View all available commands
npm run

# Check TypeScript errors
npm run type-check

# Format all code
npm run format

# Lint all code
npm run lint

# View Docker logs
npm run docker:logs

# Stop all services
npm run docker:down
```

---

## 🎯 Next Steps

1. Explore the codebase
2. Make a small change to frontend
3. Test the change locally
4. Create a new product via admin panel
5. View product on shop page
6. Test checkout flow

**Happy coding!** 🚀
