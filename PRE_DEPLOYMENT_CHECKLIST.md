# Pre-Deployment Checklist

## Local Testing (Do This First!)

### Code Quality
- [ ] Run `npm run build` - must complete without errors
- [ ] Run `npm run dev` - starts without errors
- [ ] No TypeScript errors in console
- [ ] All imports are correct

### Features Testing
- [ ] Homepage loads all sections
- [ ] Portfolio sections (Web Dev, Brand, AI) display correctly
- [ ] Contact form appears
- [ ] Newsletter signup in footer works
- [ ] Admin link visible in navbar
- [ ] Footer displays new contact info:
  - Email: empiredigitalsworldwide@gmail.com
  - Phone: +2348142656848
  - WhatsApp: +2347086757575

### Admin Panel Testing
- [ ] Navigate to `/admin`
- [ ] Login page displays
- [ ] Can login with: empiredigitalsworldwide@gmail.com
- [ ] Dashboard loads with all 4 tabs (Web, Brand, AI, Email)
- [ ] Can see improved dashboard with stats
- [ ] Logout works

### Email Features Testing
- [ ] Newsletter signup form works (check browser console)
- [ ] Admin email tab loads without errors
- [ ] Can view subscribers list (if any)

## Environment Setup

### .env.local Verification
- [ ] `.env.local` file exists in `/app` folder
- [ ] Contains all required variables:
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

### Firebase Setup
- [ ] Firebase project created: https://console.firebase.google.com
- [ ] Project ID: `mishael-port-folio`
- [ ] Authentication enabled
- [ ] Two admin emails added to auth allowed list:
  - empiredigitalsworldwide@gmail.com
  - letstalk2mishael@gmail.com
- [ ] Firestore database created (if using database features)
- [ ] Storage bucket configured (for image uploads)

### Resend Setup
- [ ] Resend account created: https://resend.com
- [ ] API key: `re_MenSLZEK_59dufN5BfjoLHEiMVt46HJGi`
- [ ] Verified email domain in Resend (for sending emails)

### GitHub Repository
- [ ] Repository connected to GitHub
- [ ] Main branch is up to date
- [ ] No uncommitted changes
- [ ] `.env.local` is in `.gitignore` (not committed)

## Vercel Preparation

### Project Settings
- [ ] Go to https://vercel.com/dashboard
- [ ] Create new project
- [ ] Connect GitHub repository
- [ ] Select repository: `Mperomishael/mishael`
- [ ] Root directory: `app` (important!)
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`

### Environment Variables (In Vercel)
Before deploying, add these in Vercel Settings → Environment Variables:

- [ ] `VITE_RESEND_API_KEY`
- [ ] `VITE_FIREBASE_API_KEY`
- [ ] `VITE_FIREBASE_AUTH_DOMAIN`
- [ ] `VITE_FIREBASE_PROJECT_ID`
- [ ] `VITE_FIREBASE_STORAGE_BUCKET`
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `VITE_FIREBASE_APP_ID`
- [ ] `VITE_FIREBASE_MEASUREMENT_ID`

## Contact Information Verification

### Updated Information
- [ ] Phone: +2348142656848 (updated in Contact.tsx and Footer.tsx)
- [ ] WhatsApp: +2347086757575 (new WhatsApp button added)
- [ ] Email: empiredigitalsworldwide@gmail.com (updated in Contact.tsx and Footer.tsx)

### Testing Contact Links
- [ ] Email link opens mail client
- [ ] Phone link creates dial prompt
- [ ] WhatsApp link opens WhatsApp

## Final Pre-Deployment

### Code Cleanup
- [ ] No `console.log()` statements (except in production logging)
- [ ] No commented-out code
- [ ] No TODO comments
- [ ] All imports used

### Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test on mobile (responsive)
- [ ] Test on tablet
- [ ] No console errors

### Performance
- [ ] Lighthouse score > 80 (optional but good)
- [ ] Images optimized
- [ ] No broken links
- [ ] All animations smooth

## Deployment Steps

### Before Clicking Deploy
```bash
# Final check
cd app
npm install
npm run build

# Should complete without errors
```

### Deploy to Vercel
1. [ ] Push changes to GitHub (main branch)
2. [ ] Go to Vercel dashboard
3. [ ] Click "Deploy" button
4. [ ] Wait for build to complete (5-10 minutes)
5. [ ] Verify deployment succeeded

### Post-Deployment Testing
- [ ] Visit deployed URL
- [ ] All pages load
- [ ] Contact info correct
- [ ] Admin panel accessible at `/admin`
- [ ] Newsletter signup works
- [ ] No console errors on live site

## Monitoring

### After Going Live
- [ ] Check Vercel analytics dashboard
- [ ] Monitor Firebase usage
- [ ] Check Resend email delivery
- [ ] Monitor for errors in Vercel logs

### Daily Checks (First Week)
- [ ] No spike in error rates
- [ ] Admin panel working
- [ ] Emails sending (if used)
- [ ] No performance issues

## Rollback Plan

If something breaks after deployment:
1. [ ] Note the issue
2. [ ] Go to Vercel → Deployments
3. [ ] Find previous working deployment
4. [ ] Click ... menu → "Promote to Production"

Or from CLI:
```bash
vercel rollback
```

## Success Criteria

✅ Deployment is complete when:
- Website is live at Vercel URL
- All pages load without errors
- Admin panel works with your credentials
- Contact info shows new phone number and WhatsApp
- Newsletter signup functions
- No console errors
- Images load properly
- Responsive design works on all devices

---

**Ready to Deploy?**

If all boxes are checked, you're ready to deploy! Follow the steps in `VERCEL_DEPLOYMENT.md` for detailed deployment instructions.

Good luck! 🚀
