# QuantiX'26 – React hackathon site + Neon registration backend

Stack: React 18 + Vite (frontend), Vercel serverless function `api/register.js`, Neon Postgres.

## Setup
1. **Neon** – create a project at https://neon.tech, open the SQL Editor, run `schema.sql`.
2. Install and configure:
   ```
   npm install
   cp .env.example .env.local      # paste your Neon DATABASE_URL
   ```
3. **Run locally with the API**: `npx vercel dev` → http://localhost:3000
   (`npm run dev` runs the UI only; form submissions need `vercel dev`.)
4. **Deploy**: push to GitHub → import in Vercel (Vite is auto-detected) →
   add env var `DATABASE_URL` → deploy.

## Project layout
```
api/register.js              serverless endpoint (validation + Neon insert)
src/App.jsx                  page composition
src/components/              Navbar, Hero, Sections, RegistrationForm, Footer
src/style.css, form.css      styles
schema.sql                   run once in Neon
```

View registrations: `SELECT * FROM registrations ORDER BY created_at DESC;`

TODO: replace "Update Event Date" in `src/components/Sections.jsx`.
