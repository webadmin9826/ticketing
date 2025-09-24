# Ticketing (Vercel)

Static HTML + Serverless API (MongoDB).

## Deploy
1. Push this folder to a new GitHub repo.
2. In Vercel: New Project -> Import the repo.
3. Set Environment Variables in Project Settings:
   - `MONGODB_URI` = your Atlas connection string
   - `DB_NAME` = `ticketingDB` (or any name)
4. Deploy. Open `/index.html` and `/admin.html`.

## Local Dev
```bash
npm i -g vercel
vercel dev
# open http://localhost:3000/index.html
```
