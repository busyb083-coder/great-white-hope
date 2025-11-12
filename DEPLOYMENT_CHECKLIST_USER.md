# ✅ Deployment Readiness Checklist

Use this checklist to verify your deployment is ready to go!

---

## Before You Deploy

### ✅ Code & Build
- [x] Repository cloned and dependencies installed
- [x] Frontend builds successfully (`npm run build:frontend`)
- [x] Backend builds successfully (`npm run build:backend`)
- [x] No critical build errors

### ✅ Deployment Configurations
- [x] Vercel configuration exists (`apps/frontend/vercel.json`)
- [x] Railway configuration exists (`apps/backend/railway.json`)
- [x] Dockerfiles present for both apps
- [x] Environment variable template exists (`.env.example`)

### ✅ Documentation
- [x] Deployment guide available (`DEPLOY_NOW.md`)
- [x] Full deployment documentation (`docs/README.deploy.md`)
- [x] Deployment status report (`DEPLOYMENT_STATUS.md`)

---

## Your Pre-Deployment Tasks

### Account Setup
- [ ] Create Vercel account at https://vercel.com/signup
- [ ] Create Railway account at https://railway.app/login
- [ ] Prepare payment method for Railway (~$6/month)

### Environment Variables
- [ ] Review `.env.example` file
- [ ] Prepare production values for:
  - [ ] `JWT_SECRET` (generate a secure 32+ character string)
  - [ ] `FRONTEND_URL` (will be your Vercel URL)
  - [ ] `BACKEND_URL` (will be your Railway URL)
  - [ ] Payment processor keys (if applicable)
  - [ ] Email service credentials (if applicable)
  - [ ] S3 credentials (if applicable)

### Optional Preparation
- [ ] Choose a custom domain name (optional)
- [ ] Set up Stripe account for payments (optional)
- [ ] Set up PayPal account for payments (optional)
- [ ] Create Sentry account for error tracking (optional)

---

## Deployment Process

### Step 1: Deploy Frontend to Vercel (5 minutes)
- [ ] Go to https://vercel.com/new
- [ ] Import the `great-white-hope` repository
- [ ] Set root directory to `apps/frontend`
- [ ] Add environment variable: `VITE_API_URL` (temporary, update after Step 2)
- [ ] Click Deploy
- [ ] Wait for deployment to complete
- [ ] Note your Vercel URL (e.g., `https://great-white-hope.vercel.app`)

### Step 2: Deploy Backend to Railway (10 minutes)
- [ ] Go to https://railway.app
- [ ] Create new project from GitHub repo: `great-white-hope`
- [ ] Set root directory to `apps/backend`
- [ ] Add PostgreSQL database service
- [ ] Add all required environment variables from `.env.example`
- [ ] Set `FRONTEND_URL` to your Vercel URL from Step 1
- [ ] Click Deploy
- [ ] Wait for deployment to complete
- [ ] Open Railway Shell
- [ ] Run migrations: `npm run migrate`
- [ ] Seed database: `npm run seed`
- [ ] Note your Railway URL (e.g., `https://great-white-hope.railway.app`)

### Step 3: Connect Frontend to Backend (2 minutes)
- [ ] Go back to Vercel dashboard
- [ ] Navigate to Settings → Environment Variables
- [ ] Update `VITE_API_URL` to your Railway URL from Step 2
- [ ] Trigger redeploy in Vercel

---

## Post-Deployment Verification

### Backend Health Check
- [ ] Visit `https://your-backend.railway.app/health`
- [ ] Should return: `{"status":"ok","timestamp":"...","uptime":...}`

### Frontend Check
- [ ] Visit `https://your-frontend.vercel.app`
- [ ] Homepage loads without errors
- [ ] Navigate to Shop page
- [ ] Verify products load (if database was seeded)
- [ ] Check browser console for errors (F12)

### Integration Check
- [ ] Frontend can communicate with backend
- [ ] Admin panel is accessible
- [ ] No CORS errors in browser console

---

## Optional Post-Deployment

### Custom Domain
- [ ] Add custom domain in Vercel (Settings → Domains)
- [ ] Add custom domain in Railway (Settings → Domain)
- [ ] Update DNS records
- [ ] Update environment variables with new domain URLs

### Payment Processors
- [ ] Configure Stripe webhook: `https://your-backend/api/v1/webhooks/stripe`
- [ ] Configure PayPal webhook: `https://your-backend/api/v1/webhooks/paypal`
- [ ] Test payment flows in test mode

### Monitoring
- [ ] Create Sentry account
- [ ] Add Sentry DSN to environment variables
- [ ] Test error tracking

### Performance
- [ ] Run Lighthouse audit on frontend
- [ ] Check backend response times
- [ ] Review Railway metrics

---

## Troubleshooting

If you encounter issues, check these documents:
- `DEPLOYMENT_STATUS.md` - Full deployment status
- `docs/README.deploy.md` - Comprehensive deployment guide
- `docs/DEPLOYMENT_QUICK_START.md` - Quick troubleshooting

Common issues:
- **Frontend shows blank page**: Check `VITE_API_URL` environment variable
- **API 500 errors**: Verify `DATABASE_URL` in Railway
- **CORS errors**: Update `FRONTEND_URL` in Railway backend config
- **Build fails**: Verify root directory is set correctly

---

## Summary

**Total Time**: ~15-20 minutes  
**Total Cost**: ~$6/month (Vercel free + Railway $5-15)  
**Difficulty**: Easy (just follow the steps)

**Status**: Everything is ready! Just follow the steps above to deploy.

---

**Questions?** 
- See `ISSUE_RESOLUTION.md` for detailed answers
- Check `DEPLOY_NOW.md` for quick reference
- Review `DEPLOYMENT_STATUS.md` for full status report
