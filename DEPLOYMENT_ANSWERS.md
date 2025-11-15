# Deployment Configuration Answers

This document provides answers to the deployment configuration questions for the Great White Hope e-commerce platform.

## 🎯 TL;DR - Quick Answers

| Question | Answer |
|----------|--------|
| **What environment variable does the React frontend use to connect to the backend?** | `VITE_API_URL` |
| **Where is it used?** | `apps/frontend/src/lib/api.ts`, `apps/frontend/src/pages/AdminLogin.tsx`, `apps/frontend/vite.config.ts` |
| **What is the Railway backend URL?** | Find it in: Railway Dashboard → Your Project → Backend Service → Settings → Domains <br> Format: `https://[project-name].up.railway.app` or `https://[project-name]-production.up.railway.app` |
| **How to set VITE_API_URL in Vercel?** | Vercel Dashboard → Project → Settings → Environment Variables → Add `VITE_API_URL` with your Railway backend URL |
| **Backend health check URL** | `https://your-railway-url.up.railway.app/health` (should return `{"status":"ok"}`) |

---

## Question 1: Frontend Environment Variable Name

**Answer:** `VITE_API_URL`

### Details:

The React frontend (built with Vite) uses the environment variable **`VITE_API_URL`** to connect to the backend API.

### Where it's used:

1. **Primary API Configuration** (`apps/frontend/src/lib/api.ts`):
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
   ```

2. **Admin Login** (`apps/frontend/src/pages/AdminLogin.tsx`):
   ```typescript
   const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/v1/auth/login`, {
   ```

3. **Vite Development Proxy** (`apps/frontend/vite.config.ts`):
   ```typescript
   proxy: {
     '/api': {
       target: process.env.VITE_API_URL || 'http://localhost:4000',
       changeOrigin: true,
     },
   }
   ```

### How to set it:

#### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-railway-backend-url.up.railway.app`
   - **Environment:** Production, Preview, Development (select as needed)
4. Redeploy your frontend

#### For Local Development:
1. Create a `.env.local` file in the root directory (or `apps/frontend/.env.local`)
2. Add the line:
   ```
   VITE_API_URL=http://localhost:4000
   ```
   Or point to your Railway backend:
   ```
   VITE_API_URL=https://your-railway-backend-url.up.railway.app
   ```

### Important Notes:
- All environment variables in Vite **must** start with `VITE_` prefix to be exposed to the client-side code
- The default fallback value is `http://localhost:4000` for local development
- The variable should point to the base URL of your backend (without `/api/v1` - this is appended in the code)

---

## Question 2: Railway Backend Public URL

**Answer:** You need to find this in your Railway dashboard. The URL format will be:

```
https://[your-project-name]-production.up.railway.app
```

or

```
https://[your-service-name].railway.app
```

### How to Find Your Railway Backend URL:

#### Method 1: Railway Dashboard (Recommended)
1. Log in to [Railway](https://railway.app)
2. Select your project (e.g., "Great White Hope" or similar)
3. Click on your backend service
4. Look for the **"Deployments"** or **"Settings"** tab
5. Find the **"Public Domain"** or **"Public URL"** section
6. Copy the URL (it will look like: `https://great-white-hope-production.up.railway.app`)

#### Method 2: Railway Service Settings
1. In your Railway project dashboard
2. Click on the backend service
3. Go to **Settings** → **Domains**
4. You'll see the automatically generated domain
5. You can also add a custom domain here if desired

#### Method 3: Railway CLI (if installed)
```bash
railway status
```
This will show the deployment URL

### Default Railway URL Patterns:

Railway typically generates URLs in one of these formats:
- `https://[project-name]-production.up.railway.app`
- `https://[service-name]-production-[random-id].up.railway.app`
- Custom domain: `https://api.yourdomain.com` (if you've configured one)

### After Finding Your URL:

Once you have your Railway backend URL, you need to:

1. **Update Vercel Environment Variables:**
   - Set `VITE_API_URL` to your Railway URL (see Question 1)

2. **Update Railway Backend CORS Settings:**
   - In Railway, set the `CORS_ORIGIN` environment variable to your Vercel frontend URL
   - Example: `CORS_ORIGIN=https://great-white-hope.vercel.app`

3. **Test the Connection:**
   - Visit: `https://your-railway-url.up.railway.app/health`
   - You should see: `{"status":"ok"}` or similar health check response

### Verification Steps:

1. **Test Backend Health Check:**
   ```bash
   curl https://your-railway-url.up.railway.app/health
   ```
   Expected response:
   ```json
   {"status":"ok"}
   ```

2. **Test API Endpoint:**
   ```bash
   curl https://your-railway-url.up.railway.app/api/v1/products
   ```

3. **Verify Frontend Connection:**
   - Open your Vercel-deployed frontend
   - Open browser Developer Tools (F12)
   - Go to the Network tab
   - Navigate around the site
   - Check that API calls are going to your Railway URL

---

## Quick Reference

| Item | Value |
|------|-------|
| **Frontend Env Variable** | `VITE_API_URL` |
| **Railway URL Format** | `https://[project-name].up.railway.app` |
| **Find Railway URL** | Railway Dashboard → Project → Service → Domains |
| **Health Check Path** | `/health` |
| **API Base Path** | `/api/v1` |

---

## Troubleshooting

### If frontend can't connect to backend:

1. **Check CORS settings** in Railway:
   - Ensure `CORS_ORIGIN` includes your Vercel URL

2. **Verify VITE_API_URL** in Vercel:
   - Check it doesn't have trailing slash
   - Check it's the complete Railway URL
   - Redeploy after changing environment variables

3. **Check Railway deployment status:**
   - Ensure backend is deployed and running
   - Check Railway logs for errors

4. **Browser Console Errors:**
   - Look for CORS errors
   - Look for 404 errors (wrong URL)
   - Look for connection refused (backend down)

---

## Additional Resources

- **Railway Documentation:** [docs/RAILWAY_DEPLOYMENT.md](./docs/RAILWAY_DEPLOYMENT.md)
- **Vercel Documentation:** [docs/VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md)
- **Complete Deployment Guide:** [docs/README.deploy.md](./docs/README.deploy.md)
- **Deployment Checklist:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

**Last Updated:** November 15, 2024
**Status:** ✅ Ready for Production Deployment
