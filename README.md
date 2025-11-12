# 🌊 Great White Hope - Premium THCA Hemp E-Commerce Platform

> **Portable. Production-Ready. Fully Documented.**

A cutting-edge, fully portable e-commerce platform for premium THCA hemp products. Deploy locally with Docker, to Vercel (frontend) + Railway (backend), or any cloud provider.

**Status**: 🚀 Production-Ready | 📦 Fully Portable | 🔒 Enterprise Security | 📊 Admin Panel Included

---

## 🎯 Quick Start (5 minutes)

### Prerequisites
- **Docker** & **Docker Compose** (for local dev)
- **Node.js 18+** & **npm/pnpm** (for direct dev)
- **Git**

### Option 1: Docker (Recommended)

```bash
# Clone repository
git clone https://github.com/busyb083-coder/great-white-hope.git
cd great-white-hope

# Copy environment template
cp .env.example .env.local

# Start all services (Postgres, MinIO, MailHog, Backend, Frontend)
npm run docker:up

# Run migrations and seed data
npm run migrate
npm run seed

# Open browser
# Frontend: http://localhost:3000
# Admin: http://localhost:3000/admin
# Backend API: http://localhost:4000
# MinIO Console: http://localhost:9001
# MailHog: http://localhost:8025
```

### Option 2: Local Development (without Docker)

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your database and service URLs

# Run migrations
npm run migrate

# Seed demo data
npm run seed

# Start dev servers
npm run dev
```

---

## 📁 Project Structure

```
great-white-hope/
├── apps/
│   ├── frontend/              # React + Vite (Vercel-ready)
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── backend/               # Express + Node (Railway-ready)
│       ├── src/
│       ├── migrations/
│       ├── seeds/
│       ├── package.json
│       └── Dockerfile
├── packages/
│   ├── shared/                # Shared utilities
│   └── types/                 # Shared TypeScript types
├── scripts/                   # Utility scripts
├── docs/                      # Documentation
├── docker-compose.yml         # Local dev environment
├── .env.example               # Environment template
├── package.json               # Monorepo root
└── README.md                  # This file
```

---

## 🚀 Deployment

### Deploy Frontend to Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Create Vercel project
# - Go to https://vercel.com/new
# - Select this GitHub repository
# - Set root directory: apps/frontend
# - Set environment variables (from .env.example)
# - Deploy!
```

### Deploy Backend to Railway

```bash
# 1. Create Railway project
# - Go to https://railway.app
# - Create new project
# - Add PostgreSQL database
# - Add GitHub repository

# 2. Configure environment
# - Set all variables from .env.example
# - Set DATABASE_URL to Railway Postgres connection
# - Set S3_ENDPOINT to your S3 service

# 3. Deploy
# - Railway auto-deploys on git push
```

---

## 📚 Documentation

- **[README.dev.md](./docs/README.dev.md)** - Local development guide
- **[README.deploy.md](./docs/README.deploy.md)** - Production deployment guide
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture & adapter pattern
- **[ADMIN_GUIDE.md](./docs/ADMIN_GUIDE.md)** - Admin panel features & usage
- **[API.md](./docs/API.md)** - Backend API documentation
- **[BACKUP_RESTORE.md](./docs/BACKUP_RESTORE.md)** - Database backup & restore procedures

---

## ✨ Features

### 🛍️ E-Commerce
- **100+ Products** across 4 categories (Concentrates, Flower, Miscellaneous, Collaborators)
- **Dynamic Catalog** with filtering, search, and favorites
- **Shopping Cart** with promo code support
- **Secure Checkout** with 8 payment processors

### 🔐 Admin Panel
- **Drag-and-drop Page Builder** with reusable content blocks
- **Media Library** with upload, crop, transform, and bulk operations
- **Content Versioning** with rollback capability
- **RBAC** (Admin, Editor, Viewer roles)
- **Export/Import** for content portability
- **Audit Log** for compliance tracking

### 💳 Payment Processing
- **Stripe** - Credit/debit cards, Apple Pay, Google Pay
- **PayPal** - PayPal accounts and credit cards
- **Green Financial** - Cannabis-friendly banking
- **CryptoMass** - Credit/debit to cryptocurrency conversion
- **WooCommerce** - Existing WooCommerce integration
- **Adapter Pattern** - Easy to add new processors
- **Webhook Handling** - Real-time payment updates
- **Refund Processing** - Full refund support

### 🔐 Security & Compliance
- **JWT Authentication** with refresh tokens
- **OAuth Support** (Google, GitHub)
- **RBAC** (Role-Based Access Control)
- **Farm Bill Compliance** notices
- **OWASP Security** best practices
- **Sentry Integration** for error tracking

### 📊 Observability
- **Health Check Endpoints** (/health, /readiness)
- **Structured Logging** (JSON format)
- **Sentry Integration** for error tracking
- **Performance Monitoring**

### 🐳 DevOps Ready
- **Docker & Docker Compose** for local development
- **GitHub Actions** CI/CD pipeline
- **Database Migrations** with rollback support
- **Seed Scripts** for demo data
- **Backup & Restore** scripts

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite 5** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **TanStack Query** - Data fetching

### Backend
- **Express 4** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM & migrations
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Zod** - Validation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Local orchestration
- **GitHub Actions** - CI/CD
- **Railway** - Hosting (backend)
- **Vercel** - Hosting (frontend)

---

## 📋 Environment Variables

See [.env.example](./.env.example) for complete list. Key variables:

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Storage (S3-compatible)
S3_ENDPOINT=http://localhost:9000
S3_BUCKET=great-white-hope
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin

# Email
SMTP_HOST=localhost
SMTP_PORT=1025

# Auth
JWT_SECRET=your-secret-key-min-32-chars

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:4000
```

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Check coverage
npm run test:coverage
```

---

## 📝 Scripts

```bash
# Development
npm run dev              # Start all services
npm run dev:frontend     # Frontend only
npm run dev:backend      # Backend only

# Building
npm run build            # Build all
npm run build:frontend   # Frontend only
npm run build:backend    # Backend only

# Database
npm run migrate          # Run migrations
npm run migrate:create   # Create new migration
npm run seed             # Seed demo data

# Docker
npm run docker:up        # Start Docker services
npm run docker:down      # Stop Docker services
npm run docker:logs      # View logs

# Code quality
npm run lint             # Lint all
npm run format           # Format all
npm run type-check       # TypeScript check
```

---

## 🔄 Workflow

### Local Development
```bash
# 1. Clone and setup
git clone https://github.com/busyb083-coder/great-white-hope.git
cd great-white-hope
cp .env.example .env.local
npm install

# 2. Start services
npm run docker:up
npm run migrate
npm run seed

# 3. Start dev servers
npm run dev

# 4. Make changes
# - Edit files in apps/frontend or apps/backend
# - Changes hot-reload automatically

# 5. Test
npm run test

# 6. Commit and push
git add .
git commit -m "feat: add new feature"
git push origin main
```

### Production Deployment
```bash
# 1. Push to GitHub
git push origin main

# 2. Vercel auto-deploys frontend
# 3. Railway auto-deploys backend
# 4. Monitor at https://vercel.com and https://railway.app
```

---

## 🐛 Troubleshooting

### Docker services won't start
```bash
# Check logs
npm run docker:logs

# Rebuild containers
docker-compose down -v
npm run docker:up
```

### Database connection error
```bash
# Verify DATABASE_URL in .env.local
# Check postgres is running: docker ps | grep postgres
# Reset database: npm run migrate:reset
```

### Port already in use
```bash
# Change ports in docker-compose.yml or .env.local
# Or kill existing process: lsof -i :3000
```

See [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) for more.

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/busyb083-coder/great-white-hope/issues)
- **Discussions**: [GitHub Discussions](https://github.com/busyb083-coder/great-white-hope/discussions)
- **Email**: support@greatwhitehope.com

---

## 📄 License

Proprietary - All rights reserved © 2024 Great White Hope

---

## 🙏 Acknowledgments

Built with ❤️ for the cannabis community.

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Express](https://expressjs.com)
- [Prisma](https://www.prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Docker](https://www.docker.com)

---

## 🔗 Links

- **GitHub**: https://github.com/busyb083-coder/great-white-hope
- **Frontend Demo**: https://great-white-hope.vercel.app (when deployed)
- **API Docs**: http://localhost:4000/api/docs (local)

---

**Ready to deploy? Start with `npm run docker:up` or see [README.deploy.md](./docs/README.deploy.md) for production.**
