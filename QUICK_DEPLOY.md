# Quick Deployment Guide

This guide will help you deploy the Great White Hope platform in under 15 minutes.

---

## ✅ Prerequisites Checklist

Before starting, ensure you have:

- [ ] GitHub account with this repository
- [ ] Vercel account (free tier: https://vercel.com)
- [ ] Railway account (free tier: https://railway.app)
- [ ] All environment variables ready (see `.env.example`)

---

## 🚀 Step 1: Deploy Backend to Railway (5 minutes)

### 1.1 Create Project
1. Go to https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select `great-white-hope` repository
4. Railway will start deploying automatically

### 1.2 Add PostgreSQL
1. Click "+ New" → "Database" → "PostgreSQL"
2. Railway auto-creates `DATABASE_URL` environment variable

### 1.3 Configure Settings (Important!)
1. Go to Settings → Environment
2. Add these variables:
   ```
   NODE_ENV=production
   JWT_SECRET=<generate-random-32-chars>
   FRONTEND_URL=https://your-site.vercel.app
   PORT=4000
   ```

### 1.4 Verify Deployment
1. Wait for build to complete (2-3 minutes)
2. Railway provides a URL: `https://your-app.railway.app`
3. Test: `curl https://your-app.railway.app/health`
4. Expected response: `{"status":"healthy",...}`

---

## 🌐 Step 2: Deploy Frontend to Vercel (5 minutes)

### 2.1 Create Project
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel auto-detects settings from `vercel.json`

### 2.2 Configure Settings
The `vercel.json` at the root already configures:
- ✅ Build Command: `cd apps/frontend && npm run build`
- ✅ Output Directory: `apps/frontend/dist`
- ✅ Install Command: `npm install`

### 2.3 Add Environment Variable
1. Go to Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
   (Use the Railway URL from Step 1.4)

### 2.4 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Vercel provides URL: `https://your-site.vercel.app`
4. Open in browser to verify

---

## 🔄 Step 3: Connect Frontend & Backend (2 minutes)

### 3.1 Update Railway Backend
1. Go to Railway → Your Backend → Variables
2. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://your-site.vercel.app
   ```
3. Railway auto-redeploys

### 3.2 Test Integration
1. Open your Vercel URL
2. Try navigating to different pages
3. Check browser console (F12) - should have no errors

---

## ✅ Deployment Complete!

Your platform is now live:

- **Frontend**: https://your-site.vercel.app
- **Backend**: https://your-backend.railway.app
- **Admin Panel**: https://your-site.vercel.app/admin

---

## 🔧 Troubleshooting

### Backend Build Fails
**Issue**: "Prisma schema not found"  
**Fix**: Already fixed in this repository! The schema is in the correct location.

**Issue**: "DATABASE_URL not set"  
**Fix**: Make sure PostgreSQL is added in Railway and environment variable is set.

### Frontend Shows Blank Page
**Issue**: Can't connect to backend  
**Fix**: Check `VITE_API_URL` in Vercel matches your Railway backend URL.

### CORS Errors
**Issue**: "CORS policy blocked"  
**Fix**: Update `FRONTEND_URL` in Railway to match your Vercel URL.

### Migrations Don't Run
**Issue**: Database tables not created  
**Fix**: Already fixed! Railway config now runs migrations on deploy.

---

## 📊 Monitoring

After deployment, monitor your apps:

### Railway (Backend)
- Logs: Railway Dashboard → Logs tab
- Metrics: Railway Dashboard → Metrics tab
- Health: `https://your-backend.railway.app/health`

### Vercel (Frontend)
- Deployments: Vercel Dashboard → Deployments
- Analytics: Vercel Dashboard → Analytics
- Logs: Vercel Dashboard → Functions → Logs

---

## 💰 Costs

| Service | Free Tier | Paid |
|---------|-----------|------|
| Vercel | Unlimited | $20/month (Pro) |
| Railway | $5 credit/month | ~$5-20/month |
| **Total** | **~$0-5/month** | **~$25-40/month** |

---

## 📚 Next Steps

1. **Add Your Products**: Use admin panel at `/admin`
2. **Configure Payment Processors**: See [PAYMENT_SETUP.md](./PAYMENT_SETUP.md)
3. **Custom Domain**: Add in Vercel settings
4. **Email Service**: Configure SendGrid or AWS SES
5. **Monitoring**: Set up Sentry for error tracking

---

## 📖 More Documentation

- [DEPLOYMENT_FIXES.md](./DEPLOYMENT_FIXES.md) - What we fixed
- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Detailed Vercel guide
- [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) - Detailed Railway guide
- [README.deploy.md](./README.deploy.md) - Complete deployment guide

---

**Questions?** Check the troubleshooting section or open an issue on GitHub.

**Success?** You're live! 🎉 Start customizing your store.
