# GDG on Campus SOA ITER — Deployment Guide

This website is built with vanilla HTML, CSS, JavaScript, and CDN assets. It requires **zero build steps** and is 100% production-ready for instant static deployment.

---

## Option 1: Vercel (Recommended — 30 Seconds)

### Method A: Drag & Drop (No CLI or Git needed)
1. Go to [vercel.com](https://vercel.com/) and sign in.
2. Go to **Dashboard** -> **Add New...** -> **Project**.
3. Drag and drop this folder (`GDG`) directly into the upload area.
4. Click **Deploy**. Your site will be live instantly with a free `.vercel.app` URL and custom domain support!

### Method B: Vercel CLI
Run in terminal:
```bash
npx vercel
```
Follow the prompts (accept defaults). For production:
```bash
npx vercel --prod
```

---

## Option 2: Netlify (Drag & Drop — 30 Seconds)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop this entire `GDG` folder into the drop zone.
3. Your site is deployed immediately with a free `.netlify.app` link.
4. Clean `/team` URL routing is already preconfigured via the included `_redirects` file.

---

## Option 3: GitHub Pages

1. Create a new GitHub repository (e.g. `gdg-soa-iter`).
2. Push all files from this folder to the repository:
   ```bash
   git init
   git add .
   git commit -m "Final production release: GDG on Campus ITER"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In GitHub, go to **Settings** -> **Pages**.
4. Under **Branch**, select `main` and root (`/`), then click **Save**.
5. Your site is live at `https://<your-username>.github.io/<repo-name>/`.

---

## Option 4: Cloudflare Pages

1. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) and select **Workers & Pages**.
2. Click **Create Application** -> **Pages** -> **Upload assets**.
3. Select this folder and click **Deploy site**.

---

## Included Production Files
- `index.html`: Main home page with 16:9 media, live countdown HUD, interactive terminal, events, tracks, and team preview.
- `team.html`: Complete directory featuring all 44 leads and contributors across domains.
- `assets/css/styles.css`: Complete responsive design tokens, glassmorphism, DevGlow theme engine, and animations.
- `assets/js/main.js`: Interactive logic (Theme switch, terminal emulator, audio HUD, filters, modals, counters).
- `assets/images/`: Optimized event banners, logos, and gallery assets.
- `vercel.json`: Pre-configured clean URL routing for Vercel.
- `_redirects`: Pre-configured clean URL routing for Netlify & Cloudflare Pages.
- `server.ps1`: Local development testing server (`powershell -ExecutionPolicy Bypass -File server.ps1`).
