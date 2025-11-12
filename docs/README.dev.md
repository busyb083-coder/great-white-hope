# Local Development Guide

## Prerequisites

- **Node.js** 18+ (https://nodejs.org)
- **Docker** & **Docker Compose** (https://www.docker.com/products/docker-desktop)
- **Git** (https://git-scm.com)
- **pnpm** or **npm** (comes with Node.js)

## Quick Start (5 minutes)

### 1. Clone Repository

```bash
git clone https://github.com/busyb083-coder/great-white-hope.git
cd great-white-hope
```

### 2. Copy Environment File

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration.

### 3. Start Docker Services

```bash
npm run docker:up
```

This starts:
- PostgreSQL database
- MinIO (S3-compatible storage)
- MailHog (email testing)
- Redis (caching/sessions)

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Migrations

```bash
npm run migrate
```

### 6. Seed Demo Data

```bash
npm run seed
```

This creates 25 demo products across 4 categories.

### 7. Start Development Servers

```bash
npm run dev
```

This starts both frontend and backend in development mode with hot-reload.

### 8. Open in Browser

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **MinIO Console**: http://localhost:9001 (minioadmin / minioadmin)
- **MailHog**: http://localhost:8025
- **Admin Panel**: http://localhost:3000/admin

---

## Development Workflow

### Making Changes

1. **Frontend Changes**
   - Edit files in `apps/frontend/src/`
   - Changes hot-reload automatically
   - Check console for TypeScript errors

2. **Backend Changes**
   - Edit files in `apps/backend/src/`
   - Changes hot-reload automatically
   - API restarts automatically

3. **Database Schema Changes**
   - Edit `apps/backend/prisma/schema.prisma`
   - Run `npm run migrate:create` to create migration
   - Run `npm run migrate` to apply migration

### Testing

```bash
# Run all tests
npm run test

# Run specific test suite
cd apps/frontend && npm run test
cd apps/backend && npm run test

# Watch mode
npm run test:watch
```

### Code Quality

```bash
# Lint all code
npm run lint

# Format all code
npm run format

# Type check
npm run type-check
```

---

## Docker Services

### PostgreSQL

- **Host**: localhost
- **Port**: 5432
- **User**: postgres
- **Password**: postgres
- **Database**: great_white_hope

Connect with:
```bash
psql postgresql://postgres:postgres@localhost:5432/great_white_hope
```

### MinIO (S3-Compatible Storage)

- **Console**: http://localhost:9001
- **Access Key**: minioadmin
- **Secret Key**: minioadmin
- **Bucket**: great-white-hope
- **Region**: us-east-1

### MailHog (Email Testing)

- **Web Interface**: http://localhost:8025
- **SMTP**: localhost:1025

All emails sent during development appear in MailHog.

### Redis

- **Host**: localhost
- **Port**: 6379
- **No authentication**

---

## Troubleshooting

### Docker Services Won't Start

```bash
# Check if Docker is running
docker ps

# Check logs
npm run docker:logs

# Restart services
npm run docker:down
npm run docker:up
```

### Database Connection Error

```bash
# Verify PostgreSQL is running
docker ps | grep postgres

# Check connection string in .env.local
# Should be: postgresql://postgres:postgres@localhost:5432/great_white_hope

# Reset database
npm run migrate:reset
npm run seed
```

### Frontend Shows API Errors

```bash
# Check backend is running
curl http://localhost:4000/health

# Check VITE_API_URL in .env.local
# Should be: http://localhost:4000

# Check CORS configuration in backend
```

### Port Already in Use

```bash
# Change ports in docker-compose.yml or .env.local
# Or kill existing process:
lsof -i :3000  # Find process on port 3000
kill -9 <PID>  # Kill process
```

### Node Modules Issues

```bash
# Clear and reinstall
rm -rf node_modules
npm install

# Or with pnpm
pnpm install
```

---

## Project Structure

```
apps/
├── frontend/              # React + Vite
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── api/          # API client
│   │   └── App.tsx       # Main app
│   └── package.json
│
└── backend/              # Express + Node
    ├── src/
    │   ├── routes/       # API routes
    │   ├── middleware/   # Express middleware
    │   ├── adapters/     # Payment adapters
    │   └── index.ts      # Server entry
    ├── prisma/
    │   └── schema.prisma # Database schema
    └── package.json
```

---

## Common Tasks

### Add a New Page

1. Create `apps/frontend/src/pages/NewPage.tsx`
2. Add route in `apps/frontend/src/App.tsx`
3. Import and use in navigation

### Add a New API Endpoint

1. Create route in `apps/backend/src/routes/`
2. Export from `apps/backend/src/index.ts`
3. Call from frontend using API client

### Add a New Database Table

1. Add table to `apps/backend/prisma/schema.prisma`
2. Run `npm run migrate:create` (creates migration file)
3. Run `npm run migrate` (applies migration)
4. Add query helpers in `apps/backend/src/db.ts`

### Configure Payment Processor

1. Get API keys from payment processor
2. Add to `.env.local`
3. Configure in `apps/backend/src/adapters/`
4. Test in checkout flow

---

## Performance Tips

### Frontend

- Use React DevTools to check for unnecessary renders
- Use Lighthouse to check performance scores
- Optimize images (use next-gen formats)
- Code-split large components with React.lazy

### Backend

- Use database indexes for frequently queried fields
- Cache responses with Redis
- Use pagination for large datasets
- Monitor with Sentry

---

## Debugging

### Frontend Debugging

```bash
# Open DevTools
F12 or Cmd+Option+I

# Check console for errors
# Check Network tab for API calls
# Use React DevTools extension
```

### Backend Debugging

```bash
# Check logs in terminal
# Use VS Code debugger (launch.json config)
# Add console.log statements
# Use Sentry for production errors
```

### Database Debugging

```bash
# Connect to database
psql postgresql://postgres:postgres@localhost:5432/great_white_hope

# List tables
\dt

# Query data
SELECT * FROM products;

# Check migrations
SELECT * FROM _prisma_migrations;
```

---

## Next Steps

- Read [README.deploy.md](./README.deploy.md) for production deployment
- Read [PAYMENT_SETUP.md](./PAYMENT_SETUP.md) for payment processor setup
- Check [API.md](./API.md) for API documentation

---

**Happy developing! 🚀**
