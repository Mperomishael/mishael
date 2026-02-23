# Vercel Deployment Guide

## Step-by-Step Deployment

### 1. Prepare Your Project

```bash
# Navigate to app directory
cd app

# Install dependencies
npm install

# Test locally first
npm run dev
```

### 2. Create Vercel Account
- Go to https://vercel.com
- Sign up with GitHub
- Authorize Vercel to access your repositories

### 3. Deploy to Vercel

#### Option A: Via Git (Recommended)
```bash
# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

Then:
- Go to https://vercel.com/dashboard
- Click "New Project"
- Select your repository
- Click "Import"
- Continue to step 4 (Environment Variables)

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel

# Follow the prompts
```

### 4. Add Environment Variables in Vercel

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add these variables:

```
VITE_RESEND_API_KEY=re_MenSLZEK_59dufN5BfjoLHEiMVt46HJGi

VITE_FIREBASE_API_KEY=AIzaSyAwMt3l5FKjabNDpu8ybVwaAdKi2DqdYQw

VITE_FIREBASE_AUTH_DOMAIN=mishael-port-folio.firebaseapp.com

VITE_FIREBASE_PROJECT_ID=mishael-port-folio

VITE_FIREBASE_STORAGE_BUCKET=mishael-port-folio.firebasestorage.app

VITE_FIREBASE_MESSAGING_SENDER_ID=90852999870

VITE_FIREBASE_APP_ID=1:90852999870:web:1664dcba497c022effd4ef

VITE_FIREBASE_MEASUREMENT_ID=G-W9F0GG8Y6R
```

3. Click "Save"
4. Redeploy from the "Deployments" tab

### 5. Configure Build Settings

In Vercel Dashboard:
- **Root Directory:** `app`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

These are usually auto-detected, but verify they're correct.

### 6. Verify Deployment

After deployment completes:

1. Click the deployment URL
2. Test these features:
   - Homepage loads
   - Portfolio sections display
   - Contact form works
   - Newsletter signup in footer
   - Admin login at `/admin`

### 7. Custom Domain (Optional)

1. In Vercel Dashboard → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions from your domain registrar

## Environment Variables Reference

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_RESEND_API_KEY` | Your Resend API key | Yes |
| `VITE_FIREBASE_API_KEY` | Firebase API key | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase measurement ID | No |

## Troubleshooting

### Build Fails
- Check Node version: `node --version` (should be 18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build` locally first

### Environment Variables Not Working
- Verify all variables are in Vercel Settings
- Redeploy after adding variables
- Check that variable names match exactly (including VITE_ prefix)

### Admin Panel Not Loading
- Verify Firebase credentials are correct
- Check browser console for errors (F12)
- Ensure authorized emails are set up in Firebase

### Email Not Sending
- Verify Resend API key is correct
- Check Resend dashboard for API usage
- Ensure email domain is configured in Resend

## Monitoring

After deployment, monitor:

1. **Vercel Analytics**
   - Dashboard → **Analytics**
   - Track page views, response times

2. **Firebase Console**
   - Check authentication logs
   - Monitor Firestore usage
   - Review Storage access

3. **Resend Dashboard**
   - Monitor email deliverability
   - Check bounce rates
   - Review API usage

## Rollback

If something breaks:

```bash
# In Vercel Dashboard:
# 1. Go to "Deployments"
# 2. Find the previous working deployment
# 3. Click the menu (...)
# 4. Select "Promote to Production"
```

Or via CLI:
```bash
vercel rollback
```

## Performance Tips

1. **Enable Caching**
   - Vercel automatically caches static assets
   - Immutable assets get long cache headers

2. **Monitor Build Time**
   - Keep under 45 seconds for faster deploys
   - Optimize dependencies if needed

3. **Use Preview Deployments**
   - Push to a branch to create preview deployment
   - Test before merging to main

## Support

If you encounter issues:
1. Check Vercel docs: https://vercel.com/docs
2. Check deployment logs in Vercel dashboard
3. Review browser console for errors
4. Test locally with `npm run dev` first
