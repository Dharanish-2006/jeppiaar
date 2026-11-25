# QuantiX'26 – Hackathon site + Neon registration backend

Static site (index.html, style.css, form.css, script.js) with a Vercel serverless
function (`api/register.js`) that stores registrations in Neon Postgres.

## Setup
1. **Neon**: create a project at https://neon.tech, open the SQL Editor and run `schema.sql`.
2. Copy the connection string from the Neon dashboard.
3. **Local dev**
   ```
   npm install
   cp .env.example .env.local     # paste your DATABASE_URL
   npx vercel dev
   ```
   Open http://localhost:3000
4. **Deploy**: push to GitHub, import in Vercel, add env var `DATABASE_URL`
   (Settings → Environment Variables), then deploy.

## View registrations
`SELECT * FROM registrations ORDER BY created_at DESC;` in the Neon SQL Editor.

## To do
- Update the event date in `index.html` (Details section, "Update Event Date").
