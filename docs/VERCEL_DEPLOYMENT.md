# Vercel Deployment Guide - Frontend

## Step-by-Step Vercel Setup

### 1. **Import Project from GitHub**

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account
4. Find and select `great-white-hope` repository
5. Click "Import"

---

### 2. **Configure Project Settings**

#### **Root Directory**
- **Set to**: `apps/frontend`
- This tells Vercel where the frontend code is located

#### **Framework Preset**
- **Should auto-detect**: Vite
- **If not**: Manually select "Vite"

#### **Build Command**
- **Default**: `npm run build`
- **Vercel will use**: `cd ../.. && npm install && npm run build:frontend`
- **Or manually set to**: `npm run build`

#### **Output Directory**
- **Set to**: `dist`
- This is where Vite outputs the built files

#### **Install Command**
- **Default**: `npm install`
- **Keep as is**

---

### 3. **Environment Variables**

Click "Environment Variables" and add these:

```
VITE_API_URL=https://your-railway-backend.up.railway.app/api
VITE_APP_TITLE=Great White Hope
VITE_APP_LOGO=/logo.svg
```

**Important**: 
- `VITE_API_URL` should point to your Railway backend URL (you'll get this after deploying backend)
- All variables starting with `VITE_` are exposed to the frontend (safe to use)
- Variables without `VITE_` prefix are NOT available in frontend

---

### 4. **Root Directory Configuration (CRITICAL)**

Since your project is a monorepo with `apps/frontend`:

**Option A: Using vercel.json (Recommended)**

Create `vercel.json` in the root of your repository:

```json
{
  "buildCommand": "npm run build:frontend",
  "outputDirectory": "apps/frontend/dist",
  "env": {
    "VITE_API_URL": "@vite_api_url"
  }
}
```

**Option B: Manual Configuration in Vercel Dashboard**

1. Go to Project Settings
2. Build & Development Settings
3. **Build Command**: `npm run build:frontend`
4. **Output Directory**: `apps/frontend/dist`
5. **Install Command**: `npm install`

---

### 5. **Deploy**

1. Click "Deploy"
2. Wait for build to complete (should take 2-3 minutes)
3. You'll get a URL like: `https://great-white-hope.vercel.app`

---

## ✅ Vercel Deployment Checklist

- [ ] Repository imported from GitHub
- [ ] Root directory set to `apps/frontend`
- [ ] Framework preset is Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variables added
- [ ] vercel.json created (if using monorepo)
- [ ] Deploy button clicked
- [ ] Build completed successfully
- [ ] Site is live and accessible

---

## 🔧 Troubleshooting Vercel Deployment

### **Build Fails with "Cannot find module"**
- **Cause**: Vercel can't find the correct root directory
- **Fix**: Ensure `apps/frontend` is set as root directory in settings

### **Build Fails with "npm ERR!"**
- **Cause**: Dependencies not installed correctly
- **Fix**: Check that `npm install` runs in root directory first

### **Blank Page After Deploy**
- **Cause**: API URL not configured
- **Fix**: Add `VITE_API_URL` environment variable pointing to Railway backend

### **CORS Errors in Console**
- **Cause**: Frontend can't reach backend API
- **Fix**: Check that `VITE_API_URL` matches your Railway backend URL

### **Images/Videos Not Loading**
- **Cause**: Placeholder URLs not accessible
- **Fix**: Replace placeholder URLs with real image/video URLs

---

## 📊 Vercel Build Output

Expected build output:
```
✓ 1483 modules transformed
✓ built in 4.66s
dist/index.html                   0.59 kB
dist/assets/index-BMh_F7iw.css    1.28 kB
dist/assets/index-C1k4LlYe.js   603.85 kB
```

---

## 🚀 After Deployment

1. **Test the site**: Visit your Vercel URL
2. **Check console**: Open browser DevTools → Console (should be no errors)
3. **Test navigation**: Click through all pages
4. **Test categories**: Visit `/flower`, `/concentrates`, etc.
5. **Test cart**: Add products to cart
6. **Connect backend**: Once Railway is deployed, update `VITE_API_URL`

---

## 📝 Environment Variables Reference

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | `https://your-railway-backend.up.railway.app/api` | Yes |
| `VITE_APP_TITLE` | `Great White Hope` | No |
| `VITE_APP_LOGO` | `/logo.svg` | No |

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev/guide/
- **React Docs**: https://react.dev

---

**Status**: Ready for deployment
**Estimated Deploy Time**: 2-3 minutes
**Cost**: FREE tier available
