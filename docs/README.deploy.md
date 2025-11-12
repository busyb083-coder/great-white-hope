# Production Deployment Guide

Deploy your Great White Hope e-commerce platform to Vercel (frontend) + Railway (backend) in under 30 minutes.

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. **GitHub Account** - Repository must be on GitHub
2. **Vercel Account** - Free tier available at https://vercel.com
3. **Railway Account** - Free tier available at https://railway.app
4. **Domain Name** (optional) - For custom domain
5. **Environment Variables** - All values from `.env.example`

---

## 🚀 Step 1: Deploy Backend to Railway

### 1.1 Create Railway Project

1. Go to https://railway.app
2. Click "Create New Project"
3. Select "Deploy from GitHub"
4. Authorize Railway to access your GitHub account
5. Select the `great-white-hope` repository
6. Select `apps/backend` as the root directory

### 1.2 Add PostgreSQL Database

1. In Railway dashboard, click "Add Service"
2. Select "PostgreSQL"
3. Railway will auto-generate `DATABASE_URL`

### 1.3 Configure Environment Variables

In Railway dashboard, go to "Variables" and add:

```env
NODE_ENV=production
LOG_LEVEL=info
PORT=4000

FRONTEND_URL=https://your-frontend-domain.vercel.app
BACKEND_URL=https://your-backend-domain.railway.app

JWT_SECRET=your-very-long-random-secret-key-min-32-chars
REFRESH_TOKEN_SECRET=your-refresh-token-secret-min-32-chars

# S3 Storage (use Railway's built-in or AWS)
S3_ENDPOINT=https://s3.amazonaws.com
S3_REGION=us-east-1
S3_BUCKET=your-bucket-name
S3_ACCESS_KEY=your-aws-access-key
S3_SECRET_KEY=your-aws-secret-key
S3_PUBLIC_URL=https://your-bucket-name.s3.amazonaws.com

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SMTP_FROM=noreply@yoursite.com
SMTP_TLS=true

# Payment Processors
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-secret
PAYPAL_MODE=live

# Green Financial
GREEN_FINANCIAL_API_KEY=your-api-key
GREEN_FINANCIAL_API_URL=https://api.greenfinancial.com

# CryptoMass
CRYPTOMASS_API_KEY=your-api-key
CRYPTOMASS_API_URL=https://api.cryptomass.com

# Monitoring
SENTRY_DSN=your-sentry-dsn
SENTRY_ENVIRONMENT=production
SENTRY_TRACES_SAMPLE_RATE=0.1

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 1.4 Deploy

1. Railway auto-deploys on git push
2. Monitor deployment in Railway dashboard
3. Once deployed, note the backend URL (e.g., `https://great-white-hope-prod.railway.app`)

### 1.5 Run Migrations

After first deployment:

1. In Railway dashboard, go to "Shell"
2. Run:
   ```bash
   npm run migrate
   npm run seed
   ```

---

## 🚀 Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Project

1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Paste your GitHub repository URL
4. Vercel will auto-detect it's a monorepo
5. Set "Root Directory" to `apps/frontend`
6. Click "Deploy"

### 2.2 Configure Environment Variables

In Vercel dashboard, go to "Settings" → "Environment Variables":

```env
VITE_API_URL=https://your-backend-domain.railway.app
VITE_APP_NAME=Great White Hope
```

### 2.3 Configure Build Settings

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2.4 Deploy

1. Vercel auto-deploys on git push
2. Monitor deployment in Vercel dashboard
3. Once deployed, note the frontend URL (e.g., `https://great-white-hope.vercel.app`)

### 2.5 Update Backend FRONTEND_URL

1. Go back to Railway dashboard
2. Update `FRONTEND_URL` environment variable to your Vercel URL
3. Redeploy backend

---

## 🌐 Step 3: Configure Custom Domain (Optional)

### Frontend (Vercel)

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `app.example.com`)
4. Follow DNS configuration instructions
5. Update `FRONTEND_URL` in Railway backend config

### Backend (Railway)

1. In Railway dashboard, go to "Settings" → "Domain"
2. Click "Add Domain"
3. Enter your domain (e.g., `api.example.com`)
4. Follow DNS configuration instructions
5. Update `BACKEND_URL` in Vercel frontend config

---

## 🔒 Step 4: Configure Payment Processors

### Stripe

1. Get API keys from https://dashboard.stripe.com
2. Add to Railway environment variables
3. Configure webhook endpoint: `https://your-backend-domain/api/v1/webhooks/stripe`

### PayPal

1. Get credentials from https://developer.paypal.com
2. Add to Railway environment variables
3. Configure webhook endpoint: `https://your-backend-domain/api/v1/webhooks/paypal`

### Green Financial

1. Contact Green Financial for API credentials
2. Add to Railway environment variables
3. Configure webhook endpoint: `https://your-backend-domain/api/v1/webhooks/green-financial`

### CryptoMass

1. Get API key from CryptoMass dashboard
2. Add to Railway environment variables
3. Configure webhook endpoint: `https://your-backend-domain/api/v1/webhooks/cryptomass`

---

## 📊 Step 5: Set Up Monitoring

### Sentry (Error Tracking)

1. Create account at https://sentry.io
2. Create new project for Node.js
3. Copy DSN and add to Railway environment variables
4. Create new project for React
5. Copy DSN and add to Vercel environment variables

### Database Backups

Railway automatically backs up PostgreSQL. To access:

1. In Railway dashboard, go to PostgreSQL service
2. Click "Backups"
3. Download backup as needed

---

## 🧪 Step 6: Verify Deployment

### Test Backend

```bash
curl https://your-backend-domain/health
# Should return: { "status": "ok", "timestamp": "...", "uptime": ... }
```

### Test Frontend

1. Open https://your-frontend-domain in browser
2. Navigate to Shop page
3. Verify products load
4. Test Admin panel

### Test Payment Processors

1. Go to Checkout page
2. Verify all payment methods appear
3. Test payment flow (use test credentials)

---

## 🔄 Continuous Deployment

Both Vercel and Railway auto-deploy on git push:

1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically deploys frontend
4. Railway automatically deploys backend
5. Monitor deployments in respective dashboards

---

## 🚨 Troubleshooting

### Backend won't start

```bash
# Check logs in Railway dashboard
# Verify DATABASE_URL is set
# Verify migrations ran: npm run migrate
```

### Frontend shows API errors

```bash
# Check VITE_API_URL is correct
# Verify backend is running
# Check CORS configuration in backend
```

### Database connection error

```bash
# Verify DATABASE_URL in Railway
# Check PostgreSQL service is running
# Verify network connectivity
```

### Payment processor errors

```bash
# Verify API keys are correct
# Check webhook endpoints are configured
# Test with test credentials first
```

---

## 📈 Scaling

### When you need more resources:

**Frontend (Vercel)**:
- Auto-scales with traffic
- Upgrade plan if needed at https://vercel.com/pricing

**Backend (Railway)**:
- Upgrade plan at https://railway.app/pricing
- Add more vCPUs/RAM as needed

**Database (Railway PostgreSQL)**:
- Upgrade plan for more storage/connections
- Enable automatic backups

---

## 🔐 Security Checklist

- [ ] All environment variables set in production
- [ ] JWT_SECRET is long and random (min 32 chars)
- [ ] Database user has least-privilege permissions
- [ ] CORS configured to allow only your domain
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] Sentry DSN configured for error tracking
- [ ] Payment processor webhooks verified
- [ ] Backups configured and tested
- [ ] SSL certificates auto-renewed

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Stripe Docs**: https://stripe.com/docs
- **PayPal Docs**: https://developer.paypal.com/docs
- **Sentry Docs**: https://docs.sentry.io

---

## 🎯 Next Steps

1. Deploy backend to Railway
2. Deploy frontend to Vercel
3. Configure custom domain (optional)
4. Set up payment processors
5. Configure monitoring with Sentry
6. Test all features in production
7. Set up automated backups
8. Monitor performance and errors

**Deployment complete! Your app is now live.** 🚀
