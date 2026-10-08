# Train Ticket Management Portal

React + Vite + Supabase.

Features: route cards with prices and train illustrations, search, sorting
(date, price, from, to), date quick-filters (today / tomorrow / day after +
calendar picker), booking form with live price preview, and booking history
with search and sorting.

## Run locally
```bash
npm install
npm run dev
```

## Setup
1. Open `src/supabase.js` and put in your Supabase URL and publishable key.
2. Run `supabase-setup.sql` in the Supabase SQL Editor
   (existing table? just run: `alter table bookings add column total_price int;`).

## Photos
Add real train photos to `public/images/` (see `ADD-PHOTOS-HERE.txt` for the file names).

## Deploy (Vercel)
Push to GitHub, import the repo in Vercel (Vite preset). `vercel.json`
already handles page refreshes on client-side routes.
