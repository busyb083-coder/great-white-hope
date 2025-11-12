# 🚀 DEPLOY NOW - Quick Reference Card

## ✅ Status: READY TO DEPLOY

**Total Time**: 15 minutes  
**Cost**: ~$6/month  
**Difficulty**: Easy

---

## Step 1: Frontend (Vercel) - 5 minutes

1. Go to: https://vercel.com/new
2. Click: **"Import Git Repository"**
3. Select: `great-white-hope`
4. Set **Root Directory**: `apps/frontend`
5. Click: **"Deploy"**
6. Add environment variable:
   ```
   VITE_API_URL=(your Railway URL - add this after Step 2)
   ```

✅ **Done!** Frontend URL: `https://great-white-hope.vercel.app`

---

## Step 2: Backend (Railway) - 10 minutes

1. Go to: https://railway.app
2. Click: **"New Project"**
3. Select: **"Deploy from GitHub repo"**
4. Choose: `great-white-hope`
5. Set **Root Directory**: `apps/backend`
6. Click: **"Add Service" → "PostgreSQL"**
7. Add environment variables from `.env.example`
8. Click: **"Deploy"**
9. Open **Railway Shell** and run:
   ```bash
   npm run migrate
   npm run seed
   ```

✅ **Done!** Backend URL: `https://great-white-hope.railway.app`

---

## Step 3: Connect (2 minutes)

1. Copy your Railway backend URL
2. Go to Vercel → Settings → Environment Variables
3. Update `VITE_API_URL` to your Railway URL
4. Redeploy

✅ **Done!** Your app is LIVE! 🎉

---

## 🧪 Verify Deployment

### Check Backend
```bash
curl https://your-backend.railway.app/health
# Should return: {"status":"ok",...}
```

### Check Frontend
Open: `https://your-frontend.vercel.app`
- ✅ Homepage loads
- ✅ Shop page shows products
- ✅ Admin panel accessible

---

## 📚 Need More Help?

- **Quick Guide**: `/docs/DEPLOYMENT_QUICK_START.md`
- **Full Guide**: `/docs/README.deploy.md`
- **Checklist**: `/DEPLOYMENT_CHECKLIST.md`
- **Status**: `/DEPLOYMENT_STATUS.md`

---

## 🎯 You're Ready!

Everything is configured and ready. Just follow the 3 steps above to deploy your app!
