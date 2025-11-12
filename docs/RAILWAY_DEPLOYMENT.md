# Railway Deployment Guide - Backend

## Step-by-Step Railway Setup

### 1. **Create Railway Account**

1. Go to https://railway.app
2. Sign up with GitHub (recommended)
3. Create a new project

---

### 2. **Import Project from GitHub**

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Connect your GitHub account (if not already connected)
4. Select `great-white-hope` repository
5. Click "Deploy"

---

### 3. **Configure Backend Service**

#### **Root Directory**
- **Set to**: `apps/backend`
- This tells Railway where the backend code is located

#### **Build Command**
- **Default**: `npm run build`
- **Railway will use**: `npm install && npm run build`

#### **Start Command**
- **Set to**: `node dist/index.js`
- This starts your Express server

#### **Port**
- **Set to**: `3001`
- This is the port your backend listens on

---

### 4. **Environment Variables (CRITICAL)**

Click "Variables" and add these:

```
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:password@host:5432/great_white_hope
JWT_SECRET=your-super-secret-jwt-key-change-this
CORS_ORIGIN=https://your-vercel-frontend.vercel.app
API_BASE_URL=https://your-railway-backend.up.railway.app
```

**Detailed Environment Variables**:

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_ENV` | `production` | Required for production |
| `PORT` | `3001` | Backend port |
| `DATABASE_URL` | PostgreSQL connection string | See section below |
| `JWT_SECRET` | Random 32+ character string | Change this! Use strong password |
| `CORS_ORIGIN` | Your Vercel frontend URL | Allow frontend to call API |
| `API_BASE_URL` | Your Railway backend URL | For internal API references |

---

### 5. **Database Setup (PostgreSQL)**

Railway provides PostgreSQL. Here's how to set it up:

#### **Option A: Use Railway's Built-in PostgreSQL (Recommended)**

1. In Railway dashboard, click "New"
2. Select "Database"
3. Choose "PostgreSQL"
4. Railway will automatically create a PostgreSQL instance
5. Copy the connection string from the PostgreSQL plugin
6. Paste into `DATABASE_URL` environment variable

#### **Option B: Use External PostgreSQL**

If you have an existing PostgreSQL database:

1. Get your connection string: `postgresql://user:password@host:5432/database`
2. Add to environment variables as `DATABASE_URL`

---

### 6. **Payment Processor Environment Variables**

Add these for payment processing:

```
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
GREEN_FINANCIAL_API_KEY=your_green_financial_key
CRYPTOMASS_API_KEY=your_cryptomass_key
```

**Get these from**:
- **Stripe**: https://dashboard.stripe.com/apikeys
- **PayPal**: https://developer.paypal.com/dashboard
- **Green Financial**: Contact support
- **CryptoMass**: https://cryptomass.io/settings

---

### 7. **Deploy**

1. Click "Deploy"
2. Wait for build to complete (should take 3-5 minutes)
3. You'll get a URL like: `https://great-white-hope-production.up.railway.app`

---

## ✅ Railway Deployment Checklist

- [ ] GitHub account connected to Railway
- [ ] Repository imported
- [ ] Root directory set to `apps/backend`
- [ ] Build command: `npm run build`
- [ ] Start command: `node dist/index.js`
- [ ] PORT set to 3001
- [ ] NODE_ENV set to production
- [ ] DATABASE_URL configured
- [ ] JWT_SECRET set to strong random value
- [ ] CORS_ORIGIN set to Vercel frontend URL
- [ ] Payment processor keys added
- [ ] Deploy button clicked
- [ ] Build completed successfully
- [ ] API is live and accessible

---

## 🔧 Troubleshooting Railway Deployment

### **Build Fails with "Cannot find module"**
- **Cause**: Dependencies not installed
- **Fix**: Check that `npm install` is in build command

### **Build Fails with "npm ERR!"**
- **Cause**: Missing environment variables
- **Fix**: Add all required environment variables

### **API Returns 500 Error**
- **Cause**: Database connection failed
- **Fix**: Check `DATABASE_URL` is correct and database is accessible

### **CORS Errors from Frontend**
- **Cause**: `CORS_ORIGIN` not set correctly
- **Fix**: Set `CORS_ORIGIN` to your Vercel frontend URL

### **Payment Processing Fails**
- **Cause**: Missing payment processor keys
- **Fix**: Add all payment processor environment variables

### **Port Already in Use**
- **Cause**: PORT environment variable conflict
- **Fix**: Ensure PORT is set to 3001

---

## 📊 Railway Build Output

Expected build output:
```
Building Docker image...
✓ Build successful
✓ Deployment successful
✓ Server running on port 3001
```

---

## 🚀 After Deployment

1. **Test the API**: Visit `https://your-railway-url/api/health`
2. **Should return**: `{"status":"ok"}`
3. **Check logs**: In Railway dashboard → Logs tab
4. **Connect frontend**: Update `VITE_API_URL` in Vercel with Railway URL
5. **Test endpoints**: Try creating a product, user, order, etc.

---

## 📝 Full Environment Variables Reference

```bash
# Server
NODE_ENV=production
PORT=3001
API_BASE_URL=https://your-railway-backend.up.railway.app

# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Security
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
CORS_ORIGIN=https://your-vercel-frontend.vercel.app

# Payment Processors
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xxx
GREEN_FINANCIAL_API_KEY=xxx
CRYPTOMASS_API_KEY=xxx

# Monitoring (Optional)
SENTRY_DSN=https://xxx@sentry.io/xxx
LOG_LEVEL=info
```

---

## 🔗 Useful Links

- **Railway Dashboard**: https://railway.app/dashboard
- **Railway Docs**: https://docs.railway.app
- **Express Docs**: https://expressjs.com
- **Prisma Docs**: https://www.prisma.io/docs

---

## 💰 Railway Pricing

- **Free tier**: $5/month credit (includes PostgreSQL)
- **Typical cost**: $5-15/month for small-medium traffic
- **Scaling**: Pay-as-you-go beyond free tier

---

**Status**: Ready for deployment
**Estimated Deploy Time**: 3-5 minutes
**Cost**: ~$5-15/month
